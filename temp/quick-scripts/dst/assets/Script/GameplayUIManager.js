
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
var StartGameCash = 100000;
var SelectedBusinessPayDay = false;
var HMAmount = 0;
var BMAmount = 0;
var BMLocations = 0;
var SelectedBusinessIndex = 0;
var TurnOverForInvest = false;
var BusinessSetupCardFunctionality = false;
var GivenCashBusiness = 0;
var StartAnyBusinessWithoutCash = false;
var PreviousCash = 0; //-------------------------------------------enumeration for amount of loan-------------------------//

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
    BusinessManipulationPrefab: {
      displayName: "BusinessManipulationPrefab",
      type: cc.Prefab,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of BusinessManipulationPrefab of Sell node"
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
  StartNewBusiness_BusinessSetup: function StartNewBusiness_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted, _BankruptAmount, _isCardFunctionality, _GivenCash, _StartAnyBusinessWithoutCash) {
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

    if (_isCardFunctionality === void 0) {
      _isCardFunctionality = false;
    }

    if (_GivenCash === void 0) {
      _GivenCash = 0;
    }

    if (_StartAnyBusinessWithoutCash === void 0) {
      _StartAnyBusinessWithoutCash = false;
    }

    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;
    BusinessSetupCardFunctionality = _isCardFunctionality;
    GivenCashBusiness = _GivenCash;
    StartAnyBusinessWithoutCash = _StartAnyBusinessWithoutCash;
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

          if (BusinessSetupCardFunctionality) {
            if (StartAnyBusinessWithoutCash) {
              PreviousCash = PlayerDataIntance.Cash;
              PlayerDataIntance.Cash = 0;
              this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerName);
              this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID);
              this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
            } else {
              PreviousCash = PlayerDataIntance.Cash;
              PlayerDataIntance.Cash = GivenCashBusiness;
              this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerName);
              this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID);
              this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
            }
          } else {
            this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerName);
            this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID);
            this.OnChangeCash_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].Cash);
          }
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

    if (!BusinessSetupCardFunctionality) {
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
    } else {
      this.ShowToast("You cannot take loan for current business setup");
    }
  },
  OnLoanButtonClicked_BusinessSetup: function OnLoanButtonClicked_BusinessSetup(event) {
    if (!BusinessSetupCardFunctionality) {
      if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.brickAndmortar) {
        this.CalculateLoan_BusinessSetup(50000);
      } else if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.HomeBased) {
        this.CalculateLoan_BusinessSetup(10000);
      } else {
        this.ShowToast("please select business between Home Based and brick & mortar.");
      }
    } else {
      this.ShowToast("You cannot take loan for current business setup");
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
    if (PlayerDataIntance.Cash < _amount && !StartAnyBusinessWithoutCash) {
      this.ShowToast("You have not enough cash to buy this " + _businessName + " business.");
    } else {
      if (_isHomeBased) {
        if (PlayerDataIntance.HomeBasedAmount < 3) {
          if (!StartAnyBusinessWithoutCash) {
            PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
            this.BusinessSetupData.PlayerCashUI.string = "$" + PlayerDataIntance.Cash;
          }

          this.StartGame = true;
          PlayerDataIntance.HomeBasedAmount++;
        } else {
          this.StartGame = false;
          this.ShowToast("You cannot own more than three Home based businesses");
        }
      } else {
        if (!StartAnyBusinessWithoutCash) {
          PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
          this.BusinessSetupData.PlayerCashUI.string = "$" + PlayerDataIntance.Cash;
        }

        this.StartGame = true;
        PlayerDataIntance.BrickAndMortarAmount++;
      }
    }
  },
  Exit_BusinessSetup: function Exit_BusinessSetup() {
    if (!BusinessSetupCardFunctionality) {
      this.BusinessSetupNode.active = false;

      if (PlayerBusinessDataIntance.LoanTaken) {
        PlayerBusinessDataIntance.LoanTaken = false;
        PlayerDataIntance.Cash = PlayerDataIntance.Cash - PlayerBusinessDataIntance.LoanAmount;
        PlayerBusinessDataIntance.LoanAmount = 0;
        this.ShowToast("Reverting back loan amount.", 500);
      }
    } else {
      PlayerDataIntance.Cash = PreviousCash;
      this.BusinessSetupNode.active = false;
      InsideGameBusinessSetup = -1;
      BusinessSetupCardFunctionality = false;
      GivenCashBusiness = 0;
      StartAnyBusinessWithoutCash = false;
      GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
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
    if (!BusinessSetupCardFunctionality) {
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[InsideGameBusinessSetup] = PlayerDataIntance;
      this.BusinessSetupNode.active = false;
      InsideGameBusinessSetup = -1;
      this.ToggleDecision_TurnDecision(true);
    } else {
      PlayerDataIntance.Cash = PreviousCash;
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[InsideGameBusinessSetup] = PlayerDataIntance;
      this.BusinessSetupNode.active = false;
      InsideGameBusinessSetup = -1;
      BusinessSetupCardFunctionality = false;
      GivenCashBusiness = 0;
      StartAnyBusinessWithoutCash = false;
      GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
    }
  },
  PayAmountToPlayGame: function PayAmountToPlayGame() {
    this.StartGame = false;
    if (PlayerBusinessDataIntance.BusinessTypeDescription == "") this.ShowToast("please write a business type.");else if (PlayerBusinessDataIntance.BusinessName == "") this.ShowToast("please write a business name.");else {
      if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.HomeBased) //if selected business is homebassed
        this.PurchaseBusiness(10000, "home", true);else if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.brickAndmortar) //if selected business is brick and mortar
        this.PurchaseBusiness(50000, "brick and mortar", false);

      if (this.StartGame == true || this.IsBankrupted == true) {
        PlayerDataIntance.NoOfBusiness.push(PlayerBusinessDataIntance);

        if (InsideGameBusinessSetup != -1) {
          //if start new business has not been called from inside game
          this.StartNewSetup_DuringGame_BusinessSetup();
        } //if start new business has been called at start of game as initial setup
        else {
            this.InitialSetup_BusinessSetup();
          } //prtinting all values to console


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
  OnExpandButtonClicked_TurnDecision: function OnExpandButtonClicked_TurnDecision(event, _isCardFunctionality, _GivenCash, _StartAnyBusinessWithoutCash) {
    var _this2 = this;

    if (event === void 0) {
      event = null;
    }

    if (_isCardFunctionality === void 0) {
      _isCardFunctionality = false;
    }

    if (_GivenCash === void 0) {
      _GivenCash = 0;
    }

    if (_StartAnyBusinessWithoutCash === void 0) {
      _StartAnyBusinessWithoutCash = false;
    }

    //if player has brick and mortar business he could expand it
    console.log("expand business");
    BusinessSetupCardFunctionality = _isCardFunctionality;
    GivenCashBusiness = _GivenCash;
    StartAnyBusinessWithoutCash = _StartAnyBusinessWithoutCash;
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = true;
    var generatedLength = GamePlayReferenceManager.Instance.Get_GameManager().GenerateExpandBusiness_Prefabs_TurnDecision(BusinessSetupCardFunctionality, GivenCashBusiness, StartAnyBusinessWithoutCash);

    if (generatedLength == 0) {
      this.ShowToast("You have no brick and mortar business to expand.", 1550);
      setTimeout(function () {
        _this2.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
      }, 1600);
    }
  },
  OnExpandButtonExitClicked_TurnDecision: function OnExpandButtonExitClicked_TurnDecision() {
    if (!BusinessSetupCardFunctionality) {
      this.UpdateCash_TurnDecision();
      this.CheckReferences();
      LocationName = "";
      console.log("expand business exit called");
      GamePlayReferenceManager.Instance.Get_GameManager().DestroyGeneratedNodes();
      this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
    } else {
      this.CheckReferences();
      LocationName = "";
      console.log("expand business exit called");
      GamePlayReferenceManager.Instance.Get_GameManager().DestroyGeneratedNodes();
      this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
      BusinessSetupCardFunctionality = false;
      GivenCashBusiness = 0;
      StartAnyBusinessWithoutCash = false;
      GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
    }
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
  OnStockDiceClicked_TurnDecision: function OnStockDiceClicked_TurnDecision(event, _isTurnOver) {
    if (event === void 0) {
      event = null;
    }

    if (_isTurnOver === void 0) {
      _isTurnOver = false;
    }

    TurnOverForInvest = _isTurnOver;
    console.error(_isTurnOver);
    if (TurnOverForInvest) StockBusinessName = "Friend's Business";

    if (!this.StockInvested || TurnOverForInvest) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (StockBusinessName == "") {
        this.ResetStockBusinessNameInput();
        this.ShowToast("Please enter a business name to invest.");
      } else {
        this.StockInvested = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.StockInvest;
        if (!TurnOverForInvest) DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();else DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollOneDice();
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
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash -= _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount += _amount;
          this.ShowToast("You have successfully bought " + _amount + " ounces of GOLD", 1400);
          setTimeout(function () {
            _this3.ExitButton_InvestSell();
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

          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash += _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount -= _amount;
          this.ShowToast("You have successfully sold " + _amount + " ounces of GOLD for  $" + _TotalAmount, 1400);
          setTimeout(function () {
            _this3.ExitButton_InvestSell();
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
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash -= _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount += _amount; //can add multiple stocks with business name in object if required

          this.ShowToast("You have successfully bought " + _amount + " shares of business " + StockBusinessName, 1400);
          setTimeout(function () {
            _this3.ExitButton_InvestSell();
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

          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash += _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount -= _amount;
          this.ShowToast("You have successfully sold " + _amount + " shares of stock for  $" + _TotalAmount, 1400);
          setTimeout(function () {
            _this3.ExitButton_InvestSell();
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

    if (TurnOverForInvest) {
      GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
      TurnOverForInvest = false;
    }
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
  AssignData_PayDay: function AssignData_PayDay(_title, _isDoublePayDay, _skipHM, _skipBM, _isBot, _forSelectedBusiness, _SelectedBusinessIndex, _hMAmount, _bmAmount, _bmLocation) {
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

    if (_forSelectedBusiness === void 0) {
      _forSelectedBusiness = false;
    }

    if (_SelectedBusinessIndex === void 0) {
      _SelectedBusinessIndex = 0;
    }

    if (_hMAmount === void 0) {
      _hMAmount = 0;
    }

    if (_bmAmount === void 0) {
      _bmAmount = 0;
    }

    if (_bmLocation === void 0) {
      _bmLocation = 0;
    }

    this.IsBotTurn = _isBot;
    DoublePayDay = _isDoublePayDay;
    this.TogglePayDayScreen_PayDay(true);
    this.PayDaySetupUI.TitleLabel.string = _title;
    var _time = 1800;
    SelectedBusinessPayDay = _forSelectedBusiness;
    SelectedBusinessIndex = _SelectedBusinessIndex;
    HMAmount = _hMAmount;
    BMAmount = _bmAmount;
    BMLocations = _bmLocation;

    if (!SelectedBusinessPayDay) {
      if (_isBot == false) {
        //check skip payday variables
        if (_skipHM && _skipBM) this.ShowToast("your payday on home based and brick & mortar businessess will be skipped.", _time);else if (_skipHM) this.ShowToast("your payday on home based businessess will be skipped.", _time);else if (_skipBM) this.ShowToast("your payday on brick & mortar businessess will be skipped.", _time);
      } else {
        //check skip payday variables
        if (_skipHM && _skipBM) console.log("your payday on home based and brick & mortar businessess will be skipped.");else if (_skipHM) console.log("your payday on home based businessess will be skipped.");else if (_skipBM) console.log("your payday on brick & mortar businessess will be skipped.");
      }
    }

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);

    if (!SelectedBusinessPayDay) {
      HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;
      BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
      BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;
    }

    var _loanTaken = false;
    var _businessIndex = 0;

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    var loanTaken = false;

    if (!SelectedBusinessPayDay) {
      loanTaken = _loanTaken;
    }

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
      var _doublePayDay = DoublePayDay;

      if (!SelectedBusinessPayDay) {
        if (!_doublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      } else {
        _doublePayDay = false;
        this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";
      }

      HomeBasedPaymentCompleted = true;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = false;

      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (!SelectedBusinessPayDay) {
        HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;
      }

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollOneDice();

      var _tempData = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness;
      var _amountToBeSend = 0;
      var _amountToBeAdjusted = 0;
      var _multiplier = 1; //partnership code

      if (_doublePayDay) _multiplier = 2;

      if (!SelectedBusinessPayDay) {
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
      } else {
        if (_tempData[SelectedBusinessIndex].BusinessType == 1) {
          if (_tempData[SelectedBusinessIndex].IsPartnership) {
            var _payment = _multiplier * _dice * 1000;

            _amountToBeSend = _payment / 2;

            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[SelectedBusinessIndex].PartnerID);

            _amountToBeAdjusted += _amountToBeSend;
          }
        }
      }

      if (_amountToBeAdjusted > 0) {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", 2000);
      } //partnership code


      if (!_doublePayDay) TotalPayDayAmount = HMAmount * _dice * 1000 - _amountToBeAdjusted;else TotalPayDayAmount = 2 * (HMAmount * _dice) * 1000 - _amountToBeAdjusted;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;
      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _dice + "*" + HMAmount + "*" + "1000)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _dice + "*" + HMAmount + "*" + "1000*2)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;

      if (this.IsBotTurn) {
        this.ReceivePayment_PayDay();
      }
    }
  },
  OnBMPaymentClicked_PayDay: function OnBMPaymentClicked_PayDay() {
    //brick and mortar
    if (!BrickMortarPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);
      var _doublePayDay = DoublePayDay;

      if (!SelectedBusinessPayDay) {
        if (!_doublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      } else {
        _doublePayDay = false;
        this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";
      }

      BrickMortarPaymentCompleted = true;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = false;

      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (!SelectedBusinessPayDay) {
        BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
        BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;
      }

      var _amount = BMAmount + BMLocations;

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();

      var _tempData = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness;
      var _amountToBeSend = 0;
      var _amountToBeAdjusted = 0;
      var _multiplier = 1;
      if (_doublePayDay) _multiplier = 2;

      if (!SelectedBusinessPayDay) {
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
      } else {
        if (_tempData[SelectedBusinessIndex].BusinessType == 2) {
          if (_tempData[SelectedBusinessIndex].IsPartnership) {
            var _locations = _tempData[SelectedBusinessIndex].LocationsName.length + 1;

            var _payment = _locations * _multiplier * _dice * 2000;

            _amountToBeSend = _payment / 2;

            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[SelectedBusinessIndex].PartnerID);

            _amountToBeAdjusted += _amountToBeSend;
          }
        }
      }

      if (_amountToBeAdjusted > 0) {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", 2000);
      }

      if (!_doublePayDay) TotalPayDayAmount = _amount * _dice * 2000 - _amountToBeAdjusted;else TotalPayDayAmount = 2 * (_amount * _dice) * 2000 - _amountToBeAdjusted;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;
      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _dice + "*" + _amount + "*" + "2000)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _dice + "*" + _amount + "*" + "2000*2)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;

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

      if (!SelectedBusinessPayDay) {
        GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
        GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
        GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
        GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false, false);
        GamePlayReferenceManager.Instance.Get_GameManager().callUponCard();
      } else {
        GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
      }
    }
  },
  //#endregion
  //#region Sell & manipulate Business UI
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
  SetBusinessUI_BusinessManipulationUISetup: function SetBusinessUI_BusinessManipulationUISetup(_isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    this.Reset_SellBusinessUISetup();

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = _manager.PlayerGameInfo[_playerIndex];

    if (!_isBot) {
      this.SellBusinessSetupUI.TitleLabel.string = "BUSINESS";
      this.SellBusinessSetupUI.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
      this.SellBusinessSetupUI.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;
      this.SellBusinessSetupUI.BusinessCountLabel.string = "No of Businesses : " + _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length;
    }

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.SellBusinessSetupUI.BusinessManipulationPrefab);
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

      if (_isBot) {
        node.getComponent("BusinessDetail").SelectBusinessforPayDay();
        break;
      } // if (_tempData.NoOfBusiness[index].LocationsName.length == 0)
      //   node.getComponent("BusinessDetail").ToggleSellLocationButton(false);
      // else
      //   node.getComponent("BusinessDetail").ToggleSellLocationButton(true);


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
  EnableManipilationScreen__BusinessManipulationUISetup: function EnableManipilationScreen__BusinessManipulationUISetup(_isTurnover, _isBot) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    if (_isBot === void 0) {
      _isBot = false;
    }

    if (_isTurnover) {
      this.SellBusinessSetupUI.ExitButton.active = false;
      this.SellBusinessSetupUI.TurnOverExitButton.active = true;
    } else {
      this.SellBusinessSetupUI.ExitButton.active = true;
      this.SellBusinessSetupUI.TurnOverExitButton.active = false;
    }

    if (!_isBot) this.ToggleSellBusinessScreen_SellBusinessUISetup(true);
    this.SetBusinessUI_BusinessManipulationUISetup(_isBot);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJMb2FuQW1vdW50RW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJUZW5UaG91c2FuZCIsIlRlbnR5VGhvdXNhbmQiLCJUaGlydHlUaG91c2FuZCIsIkZvcnR5VGhvdXNhbmQiLCJGaWZ0eVRob3VzYW5kIiwiT3RoZXIiLCJCdXNpbmVzc1NldHVwVUkiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZVVJIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUGxheWVyQ2FzaFVJIiwiQnVzaW5lc3NUeXBlVGV4dFVJIiwiVGV4dCIsIkJ1c2luZXNzTmFtZVRleHRVSSIsIkJ1c2luZXNzVHlwZUxhYmVsIiwiRWRpdEJveCIsIkJ1c2luZXNzTmFtZUxhYmVsIiwiSG9tZUJhc2VkTm9kZVVJIiwiTm9kZSIsIkJyaWNrQW5kTW9ydGFyTm9kZVVJIiwiVGltZXJVSSIsIlRpbWVyTm9kZSIsIkJ1c2luZXNzU2V0dXBOb2RlIiwiTG9hblNldHVwTm9kZSIsIkxvYW5BbW91bnQiLCJMb2FuQW1vdW50TGFiZWwiLCJXYWl0aW5nU3RhdHVzTm9kZSIsIkV4aXRCdXR0b25Ob2RlIiwiY3RvciIsIkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cCIsInN0cmluZyIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJNYXJrZXRpbmdFZGl0Qm94IiwiR29sZEVkaXRCb3giLCJTdG9ja0VkaXRCb3giLCJDYXNoQW1vdW50TGFiZWwiLCJFeHBhbmRCdXNpbmVzc05vZGUiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIlByZWZhYiIsIkludmVzdEVudW0iLCJTdG9ja0ludmVzdCIsIkdvbGRJbnZlc3QiLCJTdG9ja1NlbGwiLCJHb2xkU2VsbCIsIkludmVzdFNlbGxVSSIsIlRpdGxlTGFiZWwiLCJEaWNlUmVzdWx0TGFiZWwiLCJQcmljZVRpdGxlTGFiZWwiLCJQcmljZVZhbHVlTGFiZWwiLCJCdXlPclNlbGxUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRWYWx1ZUxhYmVsIiwiQnV0dG9uTmFtZUxhYmVsIiwiSW52ZXN0U3RhdGUiLCJBbW91bnRFZGl0Qm94IiwiU2VsbEJ1c2luZXNzVUkiLCJDYXNoTGFiZWwiLCJQbGF5ZXJOYW1lTGFiZWwiLCJCdXNpbmVzc0NvdW50TGFiZWwiLCJTY3JvbGxDb250ZW50Tm9kZSIsIkJ1c2luZXNzU2VsbFByZWZhYiIsIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIiwiRXhpdEJ1dHRvbiIsIlR1cm5PdmVyRXhpdEJ1dHRvbiIsIlBheURheVVJIiwiSG9tZUJhc2VkTnVtYmVyTGFiZWwiLCJCTU51bWJlckxhYmVsIiwiQk1OdW1iZXJMb2NhdGlvbkxhYmVsIiwiSG9tZUJhc2VkQnRuIiwiQk1CdG4iLCJMb2FuQnRuIiwiTWFpblBhbmVsTm9kZSIsIlJlc3VsdFBhbmVsTm9kZSIsIkxvYW5SZXN1bHRQYW5lbE5vZGUiLCJSZXN1bHRTY3JlZW5UaXRsZUxhYmVsIiwiVG90YWxCdXNpbmVzc0xhYmVsIiwiVG90YWxBbW91bnRMYWJlbCIsIlNraXBMb2FuQnV0dG9uIiwiTG9hbkZvdHRlckxhYmVsIiwiSW52ZXN0VUkiLCJCdXlPclNlbGxVSSIsIk9uZVF1ZXN0aW9uVUkiLCJQbGF5ZXJEZXRhaWxMYWJlbCIsIkRldGFpbHNQcmVmYWIiLCJTY3JvbGxDb250ZW50IiwiV2FpdGluZ1NjcmVlbiIsIkRlY2lzaW9uVGl0bGVMYWJlbCIsIkRlY2lzaW9uQ2FzaExhYmVsIiwiRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwiLCJEZWNpc2lvblF1ZXN0aW9uTGFiZWwiLCJQYXJ0bmVyc2hpcFVJIiwiV2FpdGluZ1N0YXR1c1NjcmVlbiIsIk1haW5TY3JlZW4iLCJUaXRsZU5hbWUiLCJQbGF5ZXJOYW1lIiwiUGxheWVyQ2FzaCIsIlBhcnRuZXJTaGlwUHJlZmFiIiwiRGVjaXNpb25TY3JlZW4iLCJEZWNpc2lvblBsYXllck5hbWUiLCJEZWNpc2lvblBsYXllckNhc2giLCJEZWNpc2lvbkRlc2NyaXB0aW9uIiwiUGxheWVyRGF0YUludGFuY2UiLCJQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlIiwiUmVxdWlyZWRDYXNoIiwiSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAiLCJUZW1wTWFya2V0aW5nQW1vdW50IiwiVGVtcEhpcmluZ0xhd3llciIsIkdvbGRDYXNoQW1vdW50IiwiRW50ZXJCdXlTZWxsQW1vdW50IiwiU3RvY2tCdXNpbmVzc05hbWUiLCJEaWNlUmVzdWx0IiwiT25jZU9yU2hhcmUiLCJMb2NhdGlvbk5hbWUiLCJIb21lQmFzZWRQYXltZW50Q29tcGxldGVkIiwiQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkIiwiTG9hblBheWVkIiwiVG90YWxQYXlEYXlBbW91bnQiLCJEb3VibGVQYXlEYXkiLCJHYW1lcGxheVVJTWFuYWdlciIsIkNvbXBvbmVudCIsIkJ1c2luZXNzU2V0dXBEYXRhIiwiSW52ZXN0U2VsbFNldHVwVUkiLCJQYXlEYXlTZXR1cFVJIiwiU2VsbEJ1c2luZXNzU2V0dXBVSSIsIkludmVzdFNldHVwVUkiLCJCdXlPclNlbGxTZXR1cFVJIiwiT25lUXVlc3Rpb25TZXR1cFVJIiwiUGFydG5lcnNoaXBTZXR1cFVJIiwiUG9wVXBVSSIsIlBvcFVwVUlMYWJlbCIsIkdhbWVwbGF5VUlTY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiT25lUXVlc3Rpb25TcGFjZVNjcmVlbiIsIk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4iLCJJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIiwiVGVtcERpY2VUZXh0IiwiTGVhdmVSb29tQnV0dG9uIiwib25Mb2FkIiwiQ2hlY2tSZWZlcmVuY2VzIiwiR29sZEludmVzdGVkIiwiR29sZFNvbGQiLCJTdG9ja0ludmVzdGVkIiwiU3RvY2tTb2xkIiwiSXNCb3RUdXJuIiwiSXNCYW5rcnVwdGVkIiwiQmFua3J1cHRlZEFtb3VudCIsIlJlc2V0VHVyblZhcmlhYmxlIiwicmVxdWlyZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlN5bmNEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJfc3RhdGUiLCJhY3RpdmUiLCJFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsImlzRmlyc3RUaW1lIiwiaW5zaWRlR2FtZSIsIm1vZGVJbmRleCIsIl9pc0JhbmtydXB0ZWQiLCJfQmFua3J1cHRBbW91bnQiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkJ1c2luZXNzSW5mbyIsIkNhc2giLCJSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsImxlbmd0aCIsIlN0dWRlbnREYXRhIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsIk9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uIiwiT25CdXNpbmVzc05hbWVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NOYW1lIiwiY2hpbGRyZW4iLCJCdXNpbmVzc1R5cGUiLCJFbnVtQnVzaW5lc3NUeXBlIiwibm9uZSIsIk9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsIkhvbWVCYXNlZCIsIk9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiYnJpY2tBbmRtb3J0YXIiLCJhbW91bnQiLCJDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAiLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJOb09mQnVzaW5lc3MiLCJMb2FuVGFrZW4iLCJTaG93VG9hc3QiLCJNYXRoIiwiYWJzIiwicGFyc2VJbnQiLCJnZXRDb21wb25lbnQiLCJPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAiLCJldmVudCIsIk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAiLCJIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAiLCJpIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wMV9CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wMl9CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wNF9CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wNl9CdXNpbmVzc1NldHVwIiwiT25UYWtlbkxvYW5DbGlja2VkX0J1c2luZXNzU2V0dXAiLCJfZGF0YSIsIl9JRCIsIlBob3RvbkFjdG9yIiwiYWN0b3JOciIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiTWF4UGxheWVycyIsImdldFBob3RvblJlZiIsIm15Um9vbSIsInNldEN1c3RvbVByb3BlcnR5IiwiU3RhcnRUdXJuIiwiUHVyY2hhc2VCdXNpbmVzcyIsIl9hbW91bnQiLCJfYnVzaW5lc3NOYW1lIiwiX2lzSG9tZUJhc2VkIiwiSG9tZUJhc2VkQW1vdW50IiwiU3RhcnRHYW1lIiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJFeGl0X0J1c2luZXNzU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIkdldFR1cm5OdW1iZXIiLCJSYWlzZUV2ZW50IiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIl9pc1R1cm5PdmVyIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiUm9sbE9uZURpY2UiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAiLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiUmVzZXRfUGFydG5lclNoaXBTZXR1cCIsIl9tYW5hZ2VyIiwiX3RlbXBEYXRhIiwibm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0TmFtZSIsIlNldFR5cGUiLCJTZXRCdXNpbmVzc0luZGV4IiwiX3RvdGFsTG9jYXRpb25zIiwiTG9jYXRpb25zTmFtZSIsIlNldEJ1c2luZXNzTW9kZSIsIlNldE1vZGUiLCJTZXRCdXNpbmVzc1ZhbHVlIiwiU2V0RmluYWxCdXNpbmVzc1ZhbHVlIiwiX2FsbExvY2F0aW9uc0Ftb3VudCIsIl9maW5hbEFtb3VudCIsIlNldEJhbGFuY2UiLCJTZXRMb2NhdGlvbnMiLCJJc1BhcnRuZXJzaGlwIiwiVG9nZ2xlUGFydG5lclNoaXBCdXR0b24iLCJTZXRQYXJ0bmVyTmFtZSIsIlBhcnRuZXJOYW1lIiwiRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwIiwiX21zZyIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkV4aXRfUGFydG5lclNoaXBTZXR1cCIsImRlc3Ryb3kiLCJSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cCIsIl9hY3RvciIsIl90dXJuIiwiVHVybiIsIl9wbGF5ZXJEYXRhIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJfYnVzaW5lc3NWYWx1ZSIsIkJ1c1ZhbHVlIiwiX3BheUFtb3VudCIsIl9idXNpbmVzc01vZGUiLCJDaGVja1NwZWN0YXRlIiwiQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hbGxBY3RvcnMiLCJSb29tQWN0b3JzIiwibXlJbmRleCIsIkdldE15SW5kZXgiLCJSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIkNhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfaXNBY2NlcHRlZCIsIl9wYXltZW50IiwiX2lzQ2FuY2VsbGVkIiwiX3VJRCIsIl9tYWluRGF0YSIsIkFjY2VwdGVkIiwiQ2FzaFBheW1lbnQiLCJDYW5jZWxsZWQiLCJQbGF5ZXJJRCIsIkJ1c2luZXNzSW5kZXgiLCJSZWNlaXZlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2FjY2VwdGVkIiwiX2Nhc2giLCJfY2FuY2VsbGVkIiwiX3VpZCIsIlBhcnRuZXJJRCIsImluY2x1ZGVzIiwiUmVzZXRHb2xkSW5wdXQiLCJvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbCIsIlVwZGF0ZURhdGFfSW52ZXN0U2VsbCIsIl90aXRsZSIsIl9kaWNlUmVzdWx0IiwiX3ByaWNlVGl0bGUiLCJfcHJpY2VWYWx1ZSIsIl9idXlPclNlbGxUaXRsZSIsIl90b3RhbEFtb3VudFRpdGxlIiwiX3RvdGFsQW1vdW50VmFsdWUiLCJfYnV0dG9uTmFtZSIsIkFwcGx5QnV0dG9uX0ludmVzdFNlbGwiLCJfVG90YWxBbW91bnQiLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX2hNQW1vdW50IiwiX2JtQW1vdW50IiwiX2JtTG9jYXRpb24iLCJfdGltZSIsIlVwZGF0ZUNhc2hfUGF5RGF5IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQYXlEYXlDb21wbGV0ZWQiLCJPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfZG91YmxlUGF5RGF5IiwiX2RpY2UiLCJfYW1vdW50VG9CZVNlbmQiLCJfYW1vdW50VG9CZUFkanVzdGVkIiwiX211bHRpcGxpZXIiLCJTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiUmVjZWl2ZVBheW1lbnRfUGF5RGF5IiwiX2xvY2F0aW9ucyIsIl9Fc3RpbWF0ZUxvYW4iLCJTa2lwTG9hbk9uZVRpbWVfUGF5RGF5IiwiU2VsbEJ1c2luZXNzX1BheURheSIsIkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0TG9hblNjcmVlbl9QYXlEYXkiLCJTdGFydE5ld0dhbWVfUGF5RGF5IiwiZW1pdCIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJUb2dnbGVQYXlEYXkiLCJCYW5rcnVwdF9UdXJuRGVjaXNpb24iLCJjYWxsVXBvbkNhcmQiLCJUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJBbW91bnQiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJTZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5IiwiX2lzVHVybm92ZXIiLCJFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIlNldEludmVzdFVJX0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJIiwiVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9teURhdGEiLCJfYWN0b3JzRGF0YSIsIl9tb2RlSW5kZXgiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJzZXRQbGF5ZXJOYW1lIiwic2V0UGxheWVyVUlEIiwiUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0X09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3F1ZXN0aW9uIiwibWVzc2FnZSIsInRpbWUiLCJTZWxmVG9hc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxFQUExQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBQ0EsSUFBSUMsOEJBQThCLEdBQUcsRUFBckM7QUFDQSxJQUFJQyxlQUFlLEdBQUcsSUFBdEI7QUFDQSxJQUFJQyx3QkFBd0IsR0FBRyxLQUEvQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxNQUFwQjtBQUNBLElBQUlDLHNCQUFzQixHQUFHLEtBQTdCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLElBQUlDLFdBQVcsR0FBRyxDQUFsQjtBQUNBLElBQUlDLHFCQUFxQixHQUFHLENBQTVCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsS0FBeEI7QUFDQSxJQUFJQyw4QkFBOEIsR0FBRyxLQUFyQztBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQXhCO0FBQ0EsSUFBSUMsMkJBQTJCLEdBQUcsS0FBbEM7QUFDQSxJQUFJQyxZQUFZLEdBQUcsQ0FBbkIsRUFDQTs7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEcUI7QUFFM0JDLEVBQUFBLFdBQVcsRUFBRSxLQUZjO0FBRzNCQyxFQUFBQSxhQUFhLEVBQUUsS0FIWTtBQUkz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QUFJWCxPQUFPLEdBQUcvZSx3QkFBd0IsQ0FBQ21NLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOER5RSxXQUE5RCxHQUNYcUcsZ0JBRFcsQ0FDTUMsaUJBRHBCO0FBRUEsU0FBS3hOLGtCQUFMLENBQXdCeEMsa0JBQXhCLENBQTJDekQsTUFBM0MsR0FBb0QsY0FBcEQ7QUFDQSxTQUFLaUcsa0JBQUwsQ0FBd0J2QyxpQkFBeEIsQ0FBMEMxRCxNQUExQyxHQUFtRCxNQUFNcWIsT0FBTyxDQUFDcFIsSUFBakU7QUFDQSxTQUFLaEUsa0JBQUwsQ0FBd0J0Qyx1QkFBeEIsQ0FBZ0QzRCxNQUFoRCxHQUF5RHFiLE9BQU8sQ0FBQ3BYLFVBQWpFO0FBQ0EsU0FBS2dDLGtCQUFMLENBQXdCckMscUJBQXhCLENBQThDNUQsTUFBOUMsR0FDRSx5QkFDQWdjLFNBREEsR0FFQSxJQUZBLEdBR0EsSUFIQSxHQUlBLHVFQUxGO0FBTUQsR0FocEU4QjtBQWlwRS9CO0FBRUFoUSxFQUFBQSxTQUFTLEVBQUUsbUJBQVVpUSxPQUFWLEVBQW1CQyxJQUFuQixFQUFnQztBQUFBLFFBQWJBLElBQWE7QUFBYkEsTUFBQUEsSUFBYSxHQUFOLElBQU07QUFBQTs7QUFDekMsU0FBSy9WLE9BQUwsQ0FBYWdDLE1BQWIsR0FBc0IsSUFBdEI7QUFDQSxTQUFLL0IsWUFBTCxDQUFrQnBHLE1BQWxCLEdBQTJCaWMsT0FBM0I7QUFDQSxRQUFJRSxTQUFTLEdBQUcsSUFBaEI7QUFDQXRULElBQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ3JCc1QsTUFBQUEsU0FBUyxDQUFDaFcsT0FBVixDQUFrQmdDLE1BQWxCLEdBQTJCLEtBQTNCO0FBQ0QsS0FGUyxFQUVQK1QsSUFGTyxDQUFWO0FBR0Q7QUExcEU4QixDQUFULENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxudmFyIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxudmFyIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG52YXIgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxudmFyIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgQ2FuY2VsbGVkSUQgPSBbXTtcclxudmFyIFN0YXJ0R2FtZUNhc2ggPSAxMDAwMDA7XHJcbnZhciBTZWxlY3RlZEJ1c2luZXNzUGF5RGF5ID0gZmFsc2U7XHJcbnZhciBITUFtb3VudCA9IDA7XHJcbnZhciBCTUFtb3VudCA9IDA7XHJcbnZhciBCTUxvY2F0aW9ucyA9IDA7XHJcbnZhciBTZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwO1xyXG52YXIgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxudmFyIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG52YXIgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG52YXIgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbnZhciBQcmV2aW91c0Nhc2ggPSAwO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgYW1vdW50IG9mIGxvYW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIExvYW5BbW91bnRFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBUZW5UaG91c2FuZDogMTAwMDAsXHJcbiAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gIEZvcnR5VGhvdXNhbmQ6IDQwMDAwLFxyXG4gIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gIE90aGVyOiA2LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBjYXNoXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgYnVzaW5lc3MgdHlwZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhck5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIixcclxuICAgIH0sXHJcbiAgICBUaW1lck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHRpbWVyIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5TZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IExvYW5BbW91bnRFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgYWxsIGxhYmVscyBvZiBhbW91bnRzIGluIGxvYW4gVUlcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUdXJuRGVjaXNpb25TZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIG1hcmtldGluZyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG5cclxuICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmcgPSBuYW1lO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdG9ja0ludmVzdDogMSxcclxuICBHb2xkSW52ZXN0OiAyLFxyXG4gIFN0b2NrU2VsbDogMyxcclxuICBHb2xkU2VsbDogNCxcclxuICBPdGhlcjogNSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0U2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJJbnZlc3RTZWxsVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2UgUmVzdWx0IG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVmFsdWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVZhbHVlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSB2YWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXlPclNlbGxUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXlPclNlbGwgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBWYWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV0dG9uTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGJ1dHRvbiBuYW1lIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTdGF0ZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbnZlc3RTdGF0ZVwiLFxyXG4gICAgICB0eXBlOiBJbnZlc3RFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBJbnZlc3RFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBbW91bnRFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxsQnVzaW5lc3NVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsbEJ1c2luZXNzVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxsQnVzaW5lc3NVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZWxsUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2VsbFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc1NlbGxQcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGF5RGF5VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWROdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxvY2F0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRCdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBNYWluUGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5UaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0U2NyZWVuVGl0bGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEJ1c2luZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTG9hbkJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkZvdHRlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1eU9yU2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBPbmVRdWVzdGlvblVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBPbmVRdWVzdGlvblVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiT25lUXVlc3Rpb25VSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgcXVlc3Rpb24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xOyAvLy0xIG1lYW5zIG5ldyBidXNpbmVzcyBpcyBub3QgaW5zdGFudGlhbHRlZCBmcm9tIGluc2lkZSBnYW1lICwgaWYgaXQgaGFzIGFueSBvdGhlciB2YWx1ZSBpdCBtZWFucyBpdHMgYmVlbiBpbnN0YW50aWF0ZWQgZnJvbSBpbnNpZGUgZ2FtZSBhbmQgaXRzIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggb2YgcGxheWVyXHJcblxyXG4vL3R1cm4gZGVjaXNpb25zXHJcbnZhciBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxudmFyIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4vL2J1eW9yc2VsbFxyXG52YXIgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxudmFyIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxudmFyIERpY2VSZXN1bHQ7XHJcbnZhciBPbmNlT3JTaGFyZTtcclxudmFyIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBMb2FuUGF5ZWQgPSBmYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50ID0gMDtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxudmFyIEdhbWVwbGF5VUlNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiR2FtZXBsYXlVSU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1c2luZXNzU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBUdXJuRGVjaXNpb25TZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsbEJ1c2luZXNzVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsbEJ1c2luZXNzVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBJbnZlc3RVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEJ1eU9yU2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1eU9yU2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBPbmVRdWVzdGlvblVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIE9uZVF1ZXN0aW9uVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyc2hpcFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFBhcnRuZXJzaGlwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUGFydG5lcnNoaXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TcGFjZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsXHJcbiAgICB9LFxyXG4gICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAvL2xvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gMDtcclxuICB9LFxyXG5cclxuICBSZXNldFR1cm5WYXJpYWJsZSgpIHtcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlciA9PSBudWxsKVxyXG4gICAgICBHYW1lTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKF9zdGF0ZSlcclxuICB7XHJcbiAgICB0aGlzLkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlKClcclxuICB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKGZhbHNlKTtcclxuICB9LFxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gIEluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJTcGxhc2hcIik7XHJcbiAgICB9LCA1MDApO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXNpbmVzc1NldHVwIHdpdGggbG9hblxyXG4gIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFxyXG4gICAgaXNGaXJzdFRpbWUsXHJcbiAgICBpbnNpZGVHYW1lID0gZmFsc2UsXHJcbiAgICBtb2RlSW5kZXggPSAwLFxyXG4gICAgX2lzQmFua3J1cHRlZCA9IGZhbHNlLFxyXG4gICAgX0JhbmtydXB0QW1vdW50ID0gMCxcclxuICAgIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsXHJcbiAgICBfR2l2ZW5DYXNoID0gMCxcclxuICAgIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g9ZmFsc2VcclxuICApIHtcclxuICAgIC8vY2FsbGVkIGZpcnN0IHRpbWUgZm9ybSBHYW1lTWFuYWdlciBvbmxvYWQgZnVuY3Rpb25cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gX0dpdmVuQ2FzaDtcclxuICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoO1xyXG4gICAgXHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IF9pc0JhbmtydXB0ZWQ7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSBfQmFua3J1cHRBbW91bnQ7XHJcblxyXG4gICAgaWYgKF9pc0JhbmtydXB0ZWQpIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuXHJcbiAgICB0aGlzLkluaXRfQnVzaW5lc3NTZXR1cChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSwgbW9kZUluZGV4LCBfaXNCYW5rcnVwdGVkKTtcclxuICB9LFxyXG4gIEluaXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFxyXG4gICAgaXNGaXJzdFRpbWUsXHJcbiAgICBpbnNpZGVHYW1lID0gZmFsc2UsXHJcbiAgICBtb2RlSW5kZXggPSAwLFxyXG4gICAgX2lzQmFua3J1cHRlZCA9IGZhbHNlLFxyXG4gICkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuXHJcbiAgICBpZiAoaXNGaXJzdFRpbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFN0YXJ0R2FtZUNhc2g7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5SZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgaWYgKGluc2lkZUdhbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDtpbmRleCA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IGluZGV4O1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgaWYgKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgICAgICBpZiAoU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gMDtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIFByZXZpb3VzQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IEdpdmVuQ2FzaEJ1c2luZXNzO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWUpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEdldE9ial9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5CdXNpbmVzc1NldHVwRGF0YTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAobmFtZSk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllclVJRCA9IFVJRDtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc05hbWVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBcIlwiO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLm5vbmU7XHJcbiAgfSxcclxuICBPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICB9LFxyXG4gIE9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcjtcclxuICB9LFxyXG4gIE9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBcIiRcIiArIGFtb3VudDtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBhbW91bnQ7XHJcbiAgfSxcclxuICBDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbHJlYWR5IHRha2VuIGxvYW4gb2YgJFwiICtQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIFJlcXVpcmVkQ2FzaCA9IE1hdGguYWJzKHBhcnNlSW50KFBsYXllckRhdGFJbnRhbmNlLkNhc2gpIC0gYW1vdW50KTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgY2MuTGFiZWxcclxuICAgICAgICAgICkuc3RyaW5nID0gXCIkXCIgKyBSZXF1aXJlZENhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoNTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBidXNpbmVzcyBiZXR3ZWVuIEhvbWUgQmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfWVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuICBIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaW5kZXggPT0gaSlcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLk90aGVyO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMCk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGVuVGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgxKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW50eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMik7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGhpcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgzKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5Gb3J0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNCk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uRmlmdHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDUpO1xyXG4gIH0sXHJcbiAgT25UYWtlbkxvYW5DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9PSBMb2FuQW1vdW50RW51bS5PdGhlcilcclxuICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gUmVxdWlyZWRDYXNoO1xyXG4gICAgZWxzZVxyXG4gICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBwYXJzZUludChcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRcclxuICAgICAgKTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IHRydWU7XHJcbiAgICB0aGlzLk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPVxyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICsgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICB9LFxyXG5cclxuICBTeW5jRGF0YTogZnVuY3Rpb24gKF9kYXRhLCBfSUQpIHtcclxuICAgIGlmIChfSUQgIT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuYWN0b3JOcilcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goX2RhdGEpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGggPj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMpIHtcclxuICAgICAgLy9zZXR0aW5nIHJvb20gcHJvcGVydHkgdG8gZGVjbGFyZSBpbml0aWFsIHNldHVwIGhhcyBiZWVuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKClcclxuICAgICAgICAuZ2V0UGhvdG9uUmVmKClcclxuICAgICAgICAubXlSb29tKClcclxuICAgICAgICAuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKClcclxuICAgICAgICAuZ2V0UGhvdG9uUmVmKClcclxuICAgICAgICAubXlSb29tKClcclxuICAgICAgICAuc2V0Q3VzdG9tUHJvcGVydHkoXHJcbiAgICAgICAgICBcIlBsYXllckdhbWVJbmZvXCIsXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8sXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQdXJjaGFzZUJ1c2luZXNzOiBmdW5jdGlvbiAoX2Ftb3VudCwgX2J1c2luZXNzTmFtZSwgX2lzSG9tZUJhc2VkKSB7XHJcbiAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA8IF9hbW91bnQgJiYgIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vdCBlbm91Z2ggY2FzaCB0byBidXkgdGhpcyBcIiArIF9idXNpbmVzc05hbWUgKyBcIiBidXNpbmVzcy5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2lzSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA8IDMpIHtcclxuXHJcbiAgICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPVxyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUmV2ZXJ0aW5nIGJhY2sgbG9hbiBhbW91bnQuXCIsIDUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZVxyXG4gICAge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUHJldmlvdXNDYXNoO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9tb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuSXNCYW5rcnVwdCA9IHRydWU7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJhbmtydXB0QW1vdW50ID0gdGhpcy5CYW5rcnVwdGVkQW1vdW50O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgLy9zZXR0aW5nIHBsYXllciBjdXJyZW50IGRhdGEgaW4gY3VzdG9tIHByb3BlcnRpZXMgd2hlbiBoaXMvaGVyIHR1cm4gb3ZlcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgUGxheWVyRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMSxQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIF9kYXRhID0ge0RhdGE6IHtiYW5rcnVwdGVkOiB0cnVlLHR1cm46IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCksUGxheWVyRGF0YU1haW46IFBsYXllckRhdGFJbnRhbmNlLH0sfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDksIF9kYXRhKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgQUlcclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcbiAgICAgICAgfSwgMTYwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJubyBtb2RlIHNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUHJldmlvdXNDYXNoO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdID0gUGxheWVyRGF0YUludGFuY2U7ICBcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUGF5QW1vdW50VG9QbGF5R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9PSBcIlwiKVxyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIHR5cGUuXCIpO1xyXG4gICAgZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPT0gXCJcIilcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyBuYW1lLlwiKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBob21lYmFzc2VkXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDEwMDAwLCBcImhvbWVcIiwgdHJ1ZSk7XHJcbiAgICAgIGVsc2UgaWYgKFxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcilcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGJyaWNrIGFuZCBtb3J0YXJcclxuICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoNTAwMDAsIFwiYnJpY2sgYW5kIG1vcnRhclwiLCBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5TdGFydEdhbWUgPT0gdHJ1ZSB8fCB0aGlzLklzQmFua3J1cHRlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLnB1c2goUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICAgIGlmIChJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCAhPSAtMSkge1xyXG4gICAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIG5vdCBiZWVuIGNhbGxlZCBmcm9tIGluc2lkZSBnYW1lXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBiZWVuIGNhbGxlZCBhdCBzdGFydCBvZiBnYW1lIGFzIGluaXRpYWwgc2V0dXBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHJ0aW50aW5nIGFsbCB2YWx1ZXMgdG8gY29uc29sZVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7aSsrKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBuYW1lOiBcIiArR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgSUQ6IFwiICtHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXMgcGxheWVyIGJvdDogXCIgK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Jc0JvdCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIG9mIGJ1c2luZXNzIG9mIHBsYXllciAoc2VlIGJlbG93KTogXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjYXNoOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5DYXNoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIHRha2VuIGxvYW46IFwiICtHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hblRha2VuKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW4gbG9hbiBhbW91bnQ6IFwiICtHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFR1cm5EZWNpc2lvblNldHVwVUlcclxuICAvL1R1cm5EZWNpc2lvblNldHVwVUkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGlzYWN0aXZlKSB7XHJcbiAgICB0aGlzLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IGlzYWN0aXZlO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQ2FzaEFtb3VudExhYmVsLnN0cmluZyA9XHJcbiAgICAgIFwiJCBcIiArXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXHJcbiAgICAgIF0uQ2FzaDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoVGVtcE1hcmtldGluZ0Ftb3VudCA9PSBcIlwiIHx8IFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHRoaXMubWFya2V0aW5nQW1vdW50ID0gcGFyc2VJbnQoVGVtcE1hcmtldGluZ0Ftb3VudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy9pZiBwbGF5ZXIgZW50ZXJlZCBhbW91bnQgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIGNhc2ggaGUgb3duc1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5DYXNoID49IHRoaXMubWFya2V0aW5nQW1vdW50XHJcbiAgICAgICkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA9XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoIC0gdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5NYXJrZXRpbmdBbW91bnQgPVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uTWFya2V0aW5nQW1vdW50ICsgdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcInlvdSBzdWNjZXNzZnVsbHkgbWFya2V0ZWQgYW1vdW50IG9mICRcIiArXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5NYXJrZXRpbmdBbW91bnQgK1xyXG4gICAgICAgICAgICBcIiAsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5DYXNoICtcclxuICAgICAgICAgICAgXCIuXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIik7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBpZiBwbGF5ZXIgaGFzIG1vcmUgdGhhbiA1MDAwJFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgXS5MYXd5ZXJTdGF0dXNcclxuICAgICkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA+PSA1MDAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uTGF3eWVyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBUZW1wSGlyaW5nTGF3eWVyID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhUZW1wSGlyaW5nTGF3eWVyKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCAtIDUwMDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcInlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llciwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggK1xyXG4gICAgICAgICAgICBcIi5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSkge1xyXG4gICAgTG9jYXRpb25OYW1lID0gX25hbWU7XHJcbiAgfSxcclxuICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQ9bnVsbCxfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLF9HaXZlbkNhc2ggPSAwLF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g9ZmFsc2UpIHtcclxuICAgIC8vaWYgcGxheWVyIGhhcyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGhlIGNvdWxkIGV4cGFuZCBpdFxyXG4gICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3NcIik7XHJcbiAgICBcclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuXHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB2YXIgZ2VuZXJhdGVkTGVuZ3RoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5LEdpdmVuQ2FzaEJ1c2luZXNzLFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcblxyXG4gICAgaWYgKGdlbmVyYXRlZExlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm8gYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyB0byBleHBhbmQuXCIsIDE1NTApO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9LCAxNjAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgIHRoaXMuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZEludmVzdGVkKSB7XHJcbiAgICAgIHRoaXMuR29sZEludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRJbnZlc3Q7XHJcbiAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICBcIkludmVzdCBJbiBHT0xEXCIsXHJcbiAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsXHJcbiAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgXCJCVVlcIixcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsIDgwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChldmVudD1udWxsLF9pc1R1cm5PdmVyPWZhbHNlKSB7XHJcbiAgICBUdXJuT3ZlckZvckludmVzdCA9IF9pc1R1cm5PdmVyO1xyXG5cclxuICAgIGNvbnNvbGUuZXJyb3IoX2lzVHVybk92ZXIpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdClcclxuICAgICAgU3RvY2tCdXNpbmVzc05hbWUgPSBcIkZyaWVuZCdzIEJ1c2luZXNzXCI7XHJcbiAgICAgIFxyXG4gICAgaWYgKCF0aGlzLlN0b2NrSW52ZXN0ZWQgfHwgVHVybk92ZXJGb3JJbnZlc3QpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChTdG9ja0J1c2luZXNzTmFtZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhIGJ1c2luZXNzIG5hbWUgdG8gaW52ZXN0LlwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tJbnZlc3Q7XHJcblxyXG4gICAgICAgIGlmKCFUdXJuT3ZlckZvckludmVzdClcclxuICAgICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgXCJJbnZlc3QgaW4gU3RvY2tcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggU2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsXHJcbiAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIiowPTBcIixcclxuICAgICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsIDgwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZFNvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkdvbGRDb3VudCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgXCJTZWxsIEdPTERcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIixcclxuICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgR09MRCBvdW5jZXMsIHBsZWFzZSBidXkgdGhlbS5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsIDgwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uU3RvY2tDb3VudCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIlNlbGwgU1RPQ0tcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggc2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsXHJcbiAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IHNoYXJlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLCA4MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgIC8vIHRoaXMuU2hvd1RvYXN0KFwid29yayBpbiBwcm9ncmVzcywgY29taW5nIHNvb24uLi5cIik7XHJcbiAgICAvLyB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsRGljZSgpO1xyXG4gIH0sXHJcblxyXG4gIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvL3RoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGFydG5lcnNoaXAgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLldhaXRpbmdTdGF0dXNTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJOYW1lLnN0cmluZyA9X3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJDYXNoLnN0cmluZyA9XCIkXCIrX3RlbXBEYXRhLkNhc2g7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGFydG5lclNoaXBQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgdmFyIF90b3RhbExvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgICAgdmFyIF9hbGxMb2NhdGlvbnNBbW91bnQgPSBfdG90YWxMb2NhdGlvbnMgKiAyNTAwMDtcclxuICAgICAgICB2YXIgX2ZpbmFsQW1vdW50ID0gNTAwMDAgKyBfYWxsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLklzUGFydG5lcnNoaXAgPT0gdHJ1ZSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUGFydG5lck5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShcIm5vbmVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICBcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZykge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZS5zdHJpbmcgPV90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25QbGF5ZXJDYXNoLnN0cmluZyA9XCIkXCIrX3RlbXBEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvbkRlc2NyaXB0aW9uLnN0cmluZyA9IF9tc2c7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICB9LFxyXG4gIFxyXG4gIFJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKVxyXG4gIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpXHJcbiAge1xyXG4gICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gdHJ1ZTtcclxuICAgIFBhcnRuZXJTaGlwRGF0YSA9IF9kYXRhO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpXHJcbiAgICAgIF9idXNpbmVzc01vZGUgPSBcIkhvbWUgQmFzZWRcIjtcclxuICAgIGVsc2UgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMilcclxuICAgICAgX2J1c2luZXNzTW9kZSA9IFwiQnJpY2sgJiBNb3J0YXJcIjtcclxuICAgICAgXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgIHZhciBfbXNnID0gXCJ5b3UgaGF2ZSByZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBieSBcIiArIF9wbGF5ZXJEYXRhLlBsYXllck5hbWUgKyBcIiAsIGZvbGxvd2luZyBhcmUgdGhlIGRldGFpbHMgb2YgYnVzaW5lc3M6IFwiICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgTmFtZTogXCIgKyBfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NOYW1lICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBNb2RlOiBcIiArIF9idXNpbmVzc01vZGUgKyBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIFZhbHVlOiAkXCIgKyBfYnVzaW5lc3NWYWx1ZSArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQ2FzaCBQYXltZW50OiAkXCIgKyBfcGF5QW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiaWYgb2ZmZXIgaXMgYWNjZXB0ZWQgeW91IHdpbGwgcmVjZWl2ZSA1MCUgc2hhcmUgb2YgdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzIGFuZCB3aWxsIHJlY2VpdmUgcHJvZml0L2xvc2Ugb24gdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzLlwiO1xyXG4gICAgXHJcbiAgICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwKClcclxuICB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgXHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggPj0gX3BheUFtb3VudCkge1xyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggLT0gX3BheUFtb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCh0cnVlLCBfcGF5QW1vdW50LCBmYWxzZSwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlELCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcImNvbmdyYXR1bGF0aW9ucyEgeW91IGhhdmUgc3RhcnRlZCBidXNpbmVzcyBwYXJ0bmVyc2hpcFwiLDE4MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiTm90IGVub3VnaCBjYXNoLlwiLCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpXHJcbiAge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKGZhbHNlLCAwLCB0cnVlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIiwxMjAwKTtcclxuICAgIH0gZWxzZVxyXG4gICAge1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIsMTIwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2lzQWNjZXB0ZWQ9ZmFsc2UsX3BheW1lbnQ9MCxfaXNDYW5jZWxsZWQ9ZmFsc2UsX3VJRD1cIlwiLF9kYXRhPW51bGwsX2J1c2luZXNzSW5kZXg9MClcclxuICB7XHJcbiAgICB2YXIgX21haW5EYXRhID0geyBEYXRhOiB7IEFjY2VwdGVkOiBfaXNBY2NlcHRlZCwgQ2FzaFBheW1lbnQ6X3BheW1lbnQsQ2FuY2VsbGVkOl9pc0NhbmNlbGxlZCxQbGF5ZXJJRDpfdUlELFBsYXllckRhdGE6X2RhdGEsQnVzaW5lc3NJbmRleDpfYnVzaW5lc3NJbmRleH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTIsIF9tYWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfZGF0YSlcclxuICB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB2YXIgX2FjY2VwdGVkID0gX2RhdGEuRGF0YS5BY2NlcHRlZDtcclxuICAgICAgdmFyIF9jYXNoID0gX2RhdGEuRGF0YS5DYXNoUGF5bWVudDtcclxuICAgICAgdmFyIF9jYW5jZWxsZWQgPSBfZGF0YS5EYXRhLkNhbmNlbGxlZDtcclxuICAgICAgdmFyIF91aWQgPSBfZGF0YS5EYXRhLlBsYXllcklEO1xyXG4gICAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuQnVzaW5lc3NJbmRleDtcclxuICAgIFxyXG4gICAgICBjb25zb2xlLmxvZyhcImFuc3dlciByZWNlaXZlZFwiKTtcclxuICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Nhc2g7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCA9IHRydWU7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3VpZDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIGFjY2VwdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiLCBjYXNoICRcIiArIF9jYXNoICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBhY2NvdW50LlwiLCAyODAwKTtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5pbmNsdWRlcyhfdWlkKSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICBDYW5jZWxsZWRJRC5wdXNoKF91aWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgY29uc29sZS5sb2coQ2FuY2VsbGVkSUQpO1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmxlbmd0aCA9PSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXJ0bmVyc2hpcCBvZmZlciBoYXMgYmVlbiBjYW5jZWxsZWQgYnkgYWxsIG90aGVyIHVzZXJzLlwiLCAyODAwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIHJlamVjdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiT2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgb3RoZXIgcGxheWVyLlwiLCAxODAwKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEludmVzdCBhbmQgc2VsbCBtb2RkdWxlXHJcblxyXG4gIFJlc2V0R29sZElucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkdvbGRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlN0b2NrRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIG9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsKF9hbW91bnQpIHtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IF9hbW91bnQ7XHJcblxyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgT25jZU9yU2hhcmUgKyBcIipcIiArIEVudGVyQnV5U2VsbEFtb3VudCArIFwiPVwiICsgX2Ftb3VudFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB0aGlzLlJlc2V0R29sZElucHV0KCk7XHJcbiAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgIF90aXRsZSxcclxuICAgIF9kaWNlUmVzdWx0LFxyXG4gICAgX3ByaWNlVGl0bGUsXHJcbiAgICBfcHJpY2VWYWx1ZSxcclxuICAgIF9idXlPclNlbGxUaXRsZSxcclxuICAgIF90b3RhbEFtb3VudFRpdGxlLFxyXG4gICAgX3RvdGFsQW1vdW50VmFsdWUsXHJcbiAgICBfYnV0dG9uTmFtZSxcclxuICAgIF9zdGF0ZVxyXG4gICkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IF90aXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlUmVzdWx0O1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVRpdGxlTGFiZWwuc3RyaW5nID0gX3ByaWNlVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVmFsdWVMYWJlbC5zdHJpbmcgPSBfcHJpY2VWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV5T3JTZWxsVGl0bGVMYWJlbC5zdHJpbmcgPSBfYnV5T3JTZWxsVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VGl0bGVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXR0b25OYW1lTGFiZWwuc3RyaW5nID0gX2J1dHRvbk5hbWU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlRGF0YV9JbnZlc3RTZWxsKF90b3RhbEFtb3VudFZhbHVlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICB9LFxyXG5cclxuICBBcHBseUJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uR29sZEludmVzdCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgIGlmIChfVG90YWxBbW91bnQgPD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09X1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleCBdLkdvbGRDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIiArIF9hbW91bnQgKyBcIiBvdW5jZXMgb2YgR09MRFwiLFxyXG4gICAgICAgICAgICAxNDAwXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIGlmIChfYW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50KSB7XHJcbiAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAgKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50IC09IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgb3VuY2VzIG9mIEdPTEQgZm9yICAkXCIgK1xyXG4gICAgICAgICAgICAgIF9Ub3RhbEFtb3VudCxcclxuICAgICAgICAgICAgMTQwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwieW91IGRvbid0IGhhdmUgZW5vdWdoIEdPTEQgb3VuY2VzLCB5b3Ugb3duIFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgb2YgR09MRCBvdW5jZXNcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEFtb3VudCA8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgLy9jYW4gYWRkIG11bHRpcGxlIHN0b2NrcyB3aXRoIGJ1c2luZXNzIG5hbWUgaW4gb2JqZWN0IGlmIHJlcXVpcmVkXHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgc2hhcmVzIG9mIGJ1c2luZXNzIFwiICtcclxuICAgICAgICAgICAgICBTdG9ja0J1c2luZXNzTmFtZSxcclxuICAgICAgICAgICAgMTQwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja1NlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcblxyXG4gICAgICAgIGlmIChfYW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCAtPSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICtcclxuICAgICAgICAgICAgICBfYW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBzaGFyZXMgb2Ygc3RvY2sgZm9yICAkXCIgK1xyXG4gICAgICAgICAgICAgIF9Ub3RhbEFtb3VudCxcclxuICAgICAgICAgICAgMTQwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwieW91IGRvbid0IGhhdmUgZW5vdWdoIHN0b2NrcyBzaGFyZXMsIHlvdSBvd24gXCIgK1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKVxyXG4gICAgICAgICAgICAgICAgLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgb2Ygc3RvY2sgc2hhcmVzXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdClcclxuICAgIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTsgXHJcbiAgICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gZmFsc2U7IFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXlkYXkgb3IgRG91YmxlIHBheSBEYXlcclxuICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKSB7XHJcbiAgICBpZiAoSE1BbW91bnQgPT0gMCkge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoXHJcbiAgICAgICAgY2MuQnV0dG9uXHJcbiAgICAgICkuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgIGNjLkJ1dHRvblxyXG4gICAgICApLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEJNQW1vdW50ID09IDApIHtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbG9hblRha2VuKSB7XHJcbiAgICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2V0TG9hbkFtb3VudF9QYXlEYXkoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB2YXIgX2xvYW4gPSAwO1xyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICAgIGluZGV4KytcclxuICAgICkge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuID1cclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xvYW47XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLF9pc0RvdWJsZVBheURheSA9IGZhbHNlLF9za2lwSE0gPSBmYWxzZSxfc2tpcEJNID0gZmFsc2UsX2lzQm90ID0gZmFsc2UsX2ZvclNlbGVjdGVkQnVzaW5lc3M9ZmFsc2UsX1NlbGVjdGVkQnVzaW5lc3NJbmRleD0wLF9oTUFtb3VudD0wLF9ibUFtb3VudD0wLF9ibUxvY2F0aW9uPTApIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgRG91YmxlUGF5RGF5ID0gX2lzRG91YmxlUGF5RGF5O1xyXG4gICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdmFyIF90aW1lID0gMTgwMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBfZm9yU2VsZWN0ZWRCdXNpbmVzcztcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9TZWxlY3RlZEJ1c2luZXNzSW5kZXg7XHJcbiAgICBITUFtb3VudD1faE1BbW91bnQ7XHJcbiAgICBCTUFtb3VudD1fYm1BbW91bnQ7XHJcbiAgICBCTUxvY2F0aW9ucyA9IF9ibUxvY2F0aW9uO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBpZiAoX2lzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKVxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKVxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwQk0pXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIFxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDtpbmRleCA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtpbmRleCsrKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBsb2FuVGFrZW4gPSBfbG9hblRha2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZyA9IEJNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmcgPSBCTUxvY2F0aW9ucztcclxuXHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIGxvYW4gd2FzIHNraXBwZWQgcHJldmlvdXNseVxyXG4gICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSB7XHJcbiAgICAgIHZhciBfbG9hbiA9IHRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJFwiICsgX2xvYW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkZvdHRlckxhYmVsLnN0cmluZyA9IFwiKnBheSAkNTAwMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgMCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgQk1BbW91bnQsIGxvYW5UYWtlbik7XHJcblxyXG4gICAgaWYgKF9za2lwQk0gfHwgX3NraXBITSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCBfdGltZSArIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICB0aGlzLk9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgaWYgKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX2RvdWJsZVBheURheSA9IERvdWJsZVBheURheTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGlmICghX2RvdWJsZVBheURheSlcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG5cclxuICAgICAgLy9wYXJ0bmVyc2hpcCBjb2RlXHJcbiAgICAgIGlmIChfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIF9tdWx0aXBsaWVyID0gMjtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gKF9wYXltZW50IC8gMik7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9tdWx0aXBsaWVyICogX2RpY2UgKiAxMDAwO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSAoX3BheW1lbnQgLyAyKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9hbW91bnRUb0JlQWRqdXN0ZWQ+MClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIDIwMDApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gSE1BbW91bnQgKiBfZGljZSAqIDEwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gMiAqIChITUFtb3VudCAqIF9kaWNlKSAqIDEwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuXHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCktXCIrX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIisgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKjIpLVwiK19hbW91bnRUb0JlQWRqdXN0ZWQrXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICB9IGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIF9kb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfYW1vdW50ID0gQk1BbW91bnQgKyBCTUxvY2F0aW9ucztcclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG5cclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICAgIGlmIChfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIF9tdWx0aXBsaWVyID0gMjtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGFbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDA7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gKF9wYXltZW50IC8gMik7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfbG9jYXRpb25zID0gX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDA7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IChfcGF5bWVudCAvIDIpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZD4wKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgMjAwMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSlcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IF9hbW91bnQgKiBfZGljZSAqIDIwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gMiAqIChfYW1vdW50ICogX2RpY2UpICogMjAwMC1fYW1vdW50VG9CZUFkanVzdGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBfYW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9XCIoXCIrX2RpY2UgKyBcIipcIiArIF9hbW91bnQgKyBcIipcIiArIFwiMjAwMCktXCIgK19hbW91bnRUb0JlQWRqdXN0ZWQrXCI9XCIrIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKjIpLVwiK19hbW91bnRUb0JlQWRqdXN0ZWQrXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIGlmICghTG9hblBheWVkKSB7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBfRXN0aW1hdGVMb2FuID0gMDtcclxuXHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkvL2lmIHBsYXllciBoYWQgc2tpcHBwZWQgbG9hbiBwcmV2aW91c2x5IGNhbGwgYWxsIGFtb3VudCBkdWVcclxuICAgICAgICBfRXN0aW1hdGVMb2FuID0gdGhpcy5HZXRMb2FuQW1vdW50X1BheURheSgpO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgX0VzdGltYXRlTG9hbiA9IDUwMDA7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfRXN0aW1hdGVMb2FuKSB7XHJcbiAgICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gX0VzdGltYXRlTG9hbjtcclxuXHJcbiAgICAgICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7aW5kZXggPEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7aW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIF9Fc3RpbWF0ZUxvYW47XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9QYXlEYXkoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuU2tpcExvYW5CdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwib3V0IG9mIG1vbmV5XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCkge1xyXG4gICAgLy9hbGxcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvWyBfcGxheWVySW5kZXhdLkNhc2ggKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9QYXlEYXkoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgIFwiQW1vdW50ICRcIiArXHJcbiAgICAgICAgICBUb3RhbFBheURheUFtb3VudCArXHJcbiAgICAgICAgICBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkNhc2gsXHJcbiAgICAgICAgMTUwMFxyXG4gICAgICApO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgMTU1MCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBcIkFtb3VudCAkXCIgK1xyXG4gICAgICAgICAgVG90YWxQYXlEYXlBbW91bnQgK1xyXG4gICAgICAgICAgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIiArXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTa2lwTG9hbk9uZVRpbWVfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgIFwiWW91IGhhdmUgc2tpcHBlZCB0aGUgbG9hbiBwYXltZW50LCBiYW5rIHdpbGwgY2FsbCB1cG9uIGNvbXBsZXRlIGxvYW4gYW1vdW50IG9uIG5leHQgcGF5ZGF5XCIsXHJcbiAgICAgIDIwMDBcclxuICAgICk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1BheURheShfYW1vdW50KSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBFeGl0TG9hblNjcmVlbl9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBTdGFydE5ld0dhbWVfUGF5RGF5KCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICBcIllvdSB3aWxsIGxvc2UgYWxsIHByb2dyZXNzIGFuZCBzdGFydCBuZXcgZ2FtZSBmcm9tIHRoZSBzdGFydC5cIixcclxuICAgICAgMzAwMFxyXG4gICAgKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLkV4aXRMb2FuU2NyZWVuX1BheURheSgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICB0aGlzLkV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlKCk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJTaG93Q2FyZFwiLCBcIlwiLCBmYWxzZSk7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5CYW5rcnVwdF9UdXJuRGVjaXNpb24oKTtcclxuICAgIH0sIDMwMTApO1xyXG4gIH0sXHJcblxyXG4gIFBheURheUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChIb21lQmFzZWRQYXltZW50Q29tcGxldGVkICYmIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCAmJiBMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBheWRheSBkb25lXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxsICYgbWFuaXB1bGF0ZSBCdXNpbmVzcyBVSVxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTExcIjtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPVwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICtfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzU2VsbFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICBlbHNlIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKHRydWUpO1xyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc0JvdD1mYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIGlmICghX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVTSU5FU1NcIjtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF9pc0JvdClcclxuICAgICAge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2VsZWN0QnVzaW5lc3Nmb3JQYXlEYXkoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAvLyBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIC8vIGVsc2VcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIFJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZU1hbmlwaWxhdGlvblNjcmVlbl9fQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc1R1cm5vdmVyID0gZmFsc2UsX2lzQm90PWZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIV9pc0JvdClcclxuICAgICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgIFxyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNCb3QpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEludmVzdCBVSVxyXG4gIFRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gIH0sXHJcbiAgU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcikge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJJTlZFU1RcIjtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID1cclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1eU9SU2VsbCBVSVxyXG4gIFRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXlPclNlbGxTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gIH0sXHJcbiAgU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcikge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJCVVkgT1IgU0VMTFwiO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gT25lIFF1ZXN0aW9uIHNldHVwIFVpXHJcbiAgVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU3BhY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuV2FpdGluZ1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoXHJcbiAgICBfbXlEYXRhLFxyXG4gICAgX2FjdG9yc0RhdGEsXHJcbiAgICBfaXNUdXJuT3ZlcixcclxuICAgIF9tb2RlSW5kZXggPSAwXHJcbiAgKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nID1cclxuICAgICAgXCJObyBvZiBQbGF5ZXJzOiBcIiArXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgaWYgKF9tb2RlSW5kZXggPT0gMikge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIF9teURhdGEuUGxheWVyVUlEICE9XHJcbiAgICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRFxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgICAgLnNldFBsYXllck5hbWUoXHJcbiAgICAgICAgICAgICAgICBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgICAgLnNldFBsYXllclVJRChcclxuICAgICAgICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGVJbmRleCA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgIC5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIilcclxuICAgICAgICAgICAgLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBvbmVRdWVzdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBvbmVRdWVzdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfcXVlc3Rpb24pIHtcclxuICAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpXHJcbiAgICAgIC5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvbkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUXVlc3Rpb25MYWJlbC5zdHJpbmcgPVxyXG4gICAgICBcIlBsYXllciBoYXMgYXNrZWQgaWYgXCIgK1xyXG4gICAgICBfcXVlc3Rpb24gK1xyXG4gICAgICBcIlxcblwiICtcclxuICAgICAgXCJcXG5cIiArXHJcbiAgICAgIFwiKmVpdGhlciBhbnN3ZXIgcXVlc3Rpb24gb3IgcGF5ICQ1MDAwIHRvIHBsYXllciB3aG9zZSBhc2tpbmcgcXVlc3Rpb24uXCI7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgU2hvd1RvYXN0OiBmdW5jdGlvbiAobWVzc2FnZSwgdGltZSA9IDIyNTApIHtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Qb3BVcFVJTGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSwgdGltZSk7XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==