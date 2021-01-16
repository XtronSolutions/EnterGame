
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
var PreviousCash = 0;
var TimeoutRef;
var CompletionWindowTime = 8000;
var LongMessageTime = 5000;
var ShortMessageTime = 2500; //-------------------------------------------enumeration for amount of loan-------------------------//

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
    PopUpUIButton: {
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
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.None;

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
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.None;
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
        this.ShowToast("You have already taken loan of $" + PlayerDataIntance.NoOfBusiness[_businessIndex].LoanAmount, LongMessageTime);
      } else {
        if (PlayerDataIntance.Cash >= amount) {
          this.ShowToast("You do not need loan, you have enough cash to buy current selected business.", LongMessageTime);
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
      this.ShowToast("You have not enough cash to buy this " + _businessName + " business.", LongMessageTime);
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
        this.ShowToast("Reverting back loan amount.");
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
      if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.None || PlayerBusinessDataIntance.BusinessType == undefined) {
        this.ShowToast("please select a business");
        return;
      }

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
        this.ShowToast("you successfully marketed amount of $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount + " , remaining cash is $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + ".", LongMessageTime);
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
        this.ShowToast("you have successfully hired a lawyer, remaining cash is $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + ".", LongMessageTime);
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
      this.ShowToast("You have no brick and mortar business to expand.");
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
      this.ShowToast("You can invest in gold one time during turn.");
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
      this.ShowToast("You can invest in stocks one time during turn.");
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
      this.ShowToast("You can sell gold one time during turn.");
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
      this.ShowToast("You can sell stocks one time during turn.");
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
        this.ShowToast("congratulations! you have started business partnership");
      } else {
        this.ShowToast("Not enough cash.");
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
      this.ShowToast("you have cancelled the offer.");
    } else {
      this.ToggleDecisionScreen_PartnerShipSetup(false);
      this.ShowToast("you have cancelled the offer.");
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
          this.ShowToast("your partnership offer has been accepted by " + _playerData.PlayerName + ", cash $" + _cash + " has been added to your account.", LongMessageTime);
          this.UpdateCash_TurnDecision();
        } else if (_cancelled) {
          if (CancelledID.includes(_uid) == false) CancelledID.push(_uid);
          console.log(CancelledID);

          if (CancelledID.length == _manager.PlayerGameInfo.length - 1) {
            this.ToggleScreen_PartnerShipSetup(false);
            this.ToggleWaitingScreen_PartnerShipSetup(false);
            this.ShowToast("your partnership offer has been cancelled by all other users.");
          }

          console.log("offer rejected");
        }
      } else {
        if (_accepted) {
          PartnerShipOfferReceived = false;
          this.ShowToast("Offer has been accepted by other player.");
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
          this.ShowToast("You have successfully bought " + _amount + " ounces of GOLD", LongMessageTime);
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
          this.ShowToast("You have successfully sold " + _amount + " ounces of GOLD for  $" + _TotalAmount, LongMessageTime);
          setTimeout(function () {
            _this3.ExitButton_InvestSell();
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("you don't have enough GOLD ounces, you own " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount + " of GOLD ounces", LongMessageTime);
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.StockInvest) {
        var _amount = parseInt(EnterBuySellAmount);

        var _TotalAmount = OnceOrShare * _amount;

        if (_TotalAmount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash -= _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount += _amount; //can add multiple stocks with business name in object if required

          this.ShowToast("You have successfully bought " + _amount + " shares of business " + StockBusinessName, LongMessageTime);
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
          this.ShowToast("You have successfully sold " + _amount + " shares of stock for  $" + _TotalAmount, LongMessageTime);
          setTimeout(function () {
            _this3.ExitButton_InvestSell();
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("you don't have enough stocks shares, you own " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount + " of stock shares", LongMessageTime);
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
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", LongMessageTime);
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
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", LongMessageTime);
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
      this.ShowToast("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
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
    this.ShowToast("You have skipped the loan payment, bank will call upon complete loan amount on next payday");

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
    this.ShowToast("You will lose all progress and start new game from the start.");
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
  ShowToast: function ShowToast(message, time, _hasbutton) {
    var _this7 = this;

    if (time === void 0) {
      time = ShortMessageTime;
    }

    if (_hasbutton === void 0) {
      _hasbutton = true;
    }

    this.PopUpUI.active = true;
    this.PopUpUILabel.string = message;
    var SelfToast = this;
    var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

    if (mode == 1) //for bot mode only
      {
        if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length > 0 && GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber()].IsBot) {
          this.PopUpUIButton.active = false;
          setTimeout(function () {
            SelfToast.PopUpUI.active = false;
          }, time);
        } else {
          if (_hasbutton) {
            this.PopUpUIButton.active = true;
            clearTimeout(TimeoutRef);
            TimeoutRef = setTimeout(function () {
              _this7.CompleteToast();
            }, CompletionWindowTime);
          } else {
            this.PopUpUIButton.active = false;
            setTimeout(function () {
              SelfToast.PopUpUI.active = false;
            }, time);
          }
        }
      } else //for real players
      {
        if (_hasbutton) {
          this.PopUpUIButton.active = true;
          clearTimeout(TimeoutRef);
          TimeoutRef = setTimeout(function () {
            _this7.CompleteToast();
          }, CompletionWindowTime);
        } else {
          this.PopUpUIButton.active = false;
          setTimeout(function () {
            SelfToast.PopUpUI.active = false;
          }, time);
        }
      }
  },
  CompleteToast: function CompleteToast() {
    console.error("complete toast called");
    this.PopUpUI.active = false;
    clearTimeout(TimeoutRef);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJPbmVRdWVzdGlvblVJIiwiUGxheWVyRGV0YWlsTGFiZWwiLCJEZXRhaWxzUHJlZmFiIiwiU2Nyb2xsQ29udGVudCIsIldhaXRpbmdTY3JlZW4iLCJEZWNpc2lvblRpdGxlTGFiZWwiLCJEZWNpc2lvbkNhc2hMYWJlbCIsIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsIiwiRGVjaXNpb25RdWVzdGlvbkxhYmVsIiwiUGFydG5lcnNoaXBVSSIsIldhaXRpbmdTdGF0dXNTY3JlZW4iLCJNYWluU2NyZWVuIiwiVGl0bGVOYW1lIiwiUGxheWVyTmFtZSIsIlBsYXllckNhc2giLCJQYXJ0bmVyU2hpcFByZWZhYiIsIkRlY2lzaW9uU2NyZWVuIiwiRGVjaXNpb25QbGF5ZXJOYW1lIiwiRGVjaXNpb25QbGF5ZXJDYXNoIiwiRGVjaXNpb25EZXNjcmlwdGlvbiIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCIsIkJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCIsIkxvYW5QYXllZCIsIlRvdGFsUGF5RGF5QW1vdW50IiwiRG91YmxlUGF5RGF5IiwiR2FtZXBsYXlVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJCdXNpbmVzc1NldHVwRGF0YSIsIkludmVzdFNlbGxTZXR1cFVJIiwiUGF5RGF5U2V0dXBVSSIsIlNlbGxCdXNpbmVzc1NldHVwVUkiLCJJbnZlc3RTZXR1cFVJIiwiQnV5T3JTZWxsU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2V0dXBVSSIsIlBhcnRuZXJzaGlwU2V0dXBVSSIsIlBvcFVwVUkiLCJQb3BVcFVJTGFiZWwiLCJQb3BVcFVJQnV0dG9uIiwiR2FtZXBsYXlVSVNjcmVlbiIsIkludmVzdFNlbGxTY3JlZW4iLCJQYXlEYXlTY3JlZW4iLCJTZWxsQnVzaW5lc3NTY3JlZW4iLCJJbnZlc3RTY3JlZW4iLCJCdXlPclNlbGxTY3JlZW4iLCJPbmVRdWVzdGlvblNwYWNlU2NyZWVuIiwiT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbiIsIkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJJc0JvdFR1cm4iLCJJc0JhbmtydXB0ZWQiLCJCYW5rcnVwdGVkQW1vdW50IiwiUmVzZXRUdXJuVmFyaWFibGUiLCJyZXF1aXJlIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3luY0RhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJUb2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSIsIl9zdGF0ZSIsImFjdGl2ZSIsIkV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkiLCJJbnN0YW5jZSIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVMZWF2ZVJvb21fQm9vbCIsIkRpc2Nvbm5lY3RQaG90b24iLCJzZXRUaW1lb3V0IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiaXNGaXJzdFRpbWUiLCJpbnNpZGVHYW1lIiwibW9kZUluZGV4IiwiX2lzQmFua3J1cHRlZCIsIl9CYW5rcnVwdEFtb3VudCIsIl9pc0NhcmRGdW5jdGlvbmFsaXR5IiwiX0dpdmVuQ2FzaCIsIl9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJJbml0X0J1c2luZXNzU2V0dXAiLCJQbGF5ZXJEYXRhIiwiQnVzaW5lc3NJbmZvIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIkNhc2giLCJSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsImxlbmd0aCIsIlN0dWRlbnREYXRhIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsIk9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uIiwiT25CdXNpbmVzc05hbWVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NOYW1lIiwiY2hpbGRyZW4iLCJPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJIb21lQmFzZWQiLCJPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsImJyaWNrQW5kbW9ydGFyIiwiYW1vdW50IiwiQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiTm9PZkJ1c2luZXNzIiwiTG9hblRha2VuIiwiU2hvd1RvYXN0IiwiTWF0aCIsImFicyIsInBhcnNlSW50IiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiX2RhdGEiLCJfSUQiLCJQaG90b25BY3RvciIsImFjdG9yTnIiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYW1vdW50IiwiX2J1c2luZXNzTmFtZSIsIl9pc0hvbWVCYXNlZCIsIkhvbWVCYXNlZEFtb3VudCIsIlN0YXJ0R2FtZSIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiRXhpdF9CdXNpbmVzc1NldHVwIiwiY29tcGxldGVDYXJkVHVybiIsIkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwIiwiX21vZGUiLCJHZXRTZWxlY3RlZE1vZGUiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJHZXRUdXJuTnVtYmVyIiwiUmFpc2VFdmVudCIsIkRhdGEiLCJiYW5rcnVwdGVkIiwidHVybiIsIlBsYXllckRhdGFNYWluIiwiU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCIsImVycm9yIiwiU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJQYXlBbW91bnRUb1BsYXlHYW1lIiwidW5kZWZpbmVkIiwiSXNCb3QiLCJpc2FjdGl2ZSIsIlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uIiwiX3BsYXllckluZGV4IiwibWFya2V0aW5nQW1vdW50IiwiTWFya2V0aW5nQW1vdW50IiwiT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIkxhd3llclN0YXR1cyIsIm9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJnZW5lcmF0ZWRMZW5ndGgiLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCIsIlJvbGxUd29EaWNlcyIsIkFzc2lnbkRhdGFfSW52ZXN0U2VsbCIsIk9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJfaXNUdXJuT3ZlciIsIlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCIsIlJvbGxPbmVEaWNlIiwiT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR29sZENvdW50IiwiT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlN0b2NrQ291bnQiLCJPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJFbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwIiwiT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiUm9sbERpY2UiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJ2YWx1ZSIsIlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAiLCJfbWFuYWdlciIsIl90ZW1wRGF0YSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldE5hbWUiLCJTZXRUeXBlIiwiU2V0QnVzaW5lc3NJbmRleCIsIl90b3RhbExvY2F0aW9ucyIsIkxvY2F0aW9uc05hbWUiLCJTZXRCdXNpbmVzc01vZGUiLCJTZXRNb2RlIiwiU2V0QnVzaW5lc3NWYWx1ZSIsIlNldEZpbmFsQnVzaW5lc3NWYWx1ZSIsIl9hbGxMb2NhdGlvbnNBbW91bnQiLCJfZmluYWxBbW91bnQiLCJTZXRCYWxhbmNlIiwiU2V0TG9jYXRpb25zIiwiSXNQYXJ0bmVyc2hpcCIsIlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uIiwiU2V0UGFydG5lck5hbWUiLCJQYXJ0bmVyTmFtZSIsIkVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cCIsIl9tc2ciLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJFeGl0X1BhcnRuZXJTaGlwU2V0dXAiLCJkZXN0cm95IiwiUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAiLCJfYWN0b3IiLCJfdHVybiIsIlR1cm4iLCJfcGxheWVyRGF0YSIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJTZWxlY3RlZEJ1c2luc2Vzc0luZGV4IiwiX2J1c2luZXNzVmFsdWUiLCJCdXNWYWx1ZSIsIl9wYXlBbW91bnQiLCJfYnVzaW5lc3NNb2RlIiwiQ2hlY2tTcGVjdGF0ZSIsIkFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWxsQWN0b3JzIiwiUm9vbUFjdG9ycyIsIm15SW5kZXgiLCJHZXRNeUluZGV4IiwiUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJDYW5jZWxPZmZlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2lzQWNjZXB0ZWQiLCJfcGF5bWVudCIsIl9pc0NhbmNlbGxlZCIsIl91SUQiLCJfbWFpbkRhdGEiLCJBY2NlcHRlZCIsIkNhc2hQYXltZW50IiwiQ2FuY2VsbGVkIiwiUGxheWVySUQiLCJCdXNpbmVzc0luZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hY2NlcHRlZCIsIl9jYXNoIiwiX2NhbmNlbGxlZCIsIl91aWQiLCJQYXJ0bmVySUQiLCJpbmNsdWRlcyIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiRXhpdEJ1dHRvbl9JbnZlc3RTZWxsIiwiVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSIsIlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSIsIlVwZGF0ZUJ1dHRvbnNfUGF5RGF5IiwibG9hblRha2VuIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwiR2V0TG9hbkFtb3VudF9QYXlEYXkiLCJfbG9hbiIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiX2lzRG91YmxlUGF5RGF5IiwiX3NraXBITSIsIl9za2lwQk0iLCJfaXNCb3QiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9oTUFtb3VudCIsIl9ibUFtb3VudCIsIl9ibUxvY2F0aW9uIiwiX3RpbWUiLCJVcGRhdGVDYXNoX1BheURheSIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGF5RGF5Q29tcGxldGVkIiwiT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RvdWJsZVBheURheSIsIl9kaWNlIiwiX2Ftb3VudFRvQmVTZW5kIiwiX2Ftb3VudFRvQmVBZGp1c3RlZCIsIl9tdWx0aXBsaWVyIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIlJlY2VpdmVQYXltZW50X1BheURheSIsIl9sb2NhdGlvbnMiLCJfRXN0aW1hdGVMb2FuIiwiU2tpcExvYW5PbmVUaW1lX1BheURheSIsIlNlbGxCdXNpbmVzc19QYXlEYXkiLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdExvYW5TY3JlZW5fUGF5RGF5IiwiU3RhcnROZXdHYW1lX1BheURheSIsImVtaXQiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiY2FsbFVwb25DYXJkIiwiVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwIiwiQW1vdW50IiwiVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uIiwiU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJTZWxlY3RCdXNpbmVzc2ZvclBheURheSIsIl9pc1R1cm5vdmVyIiwiRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJIiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSIsIlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfbXlEYXRhIiwiX2FjdG9yc0RhdGEiLCJfbW9kZUluZGV4IiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9xdWVzdGlvbiIsIm1lc3NhZ2UiLCJ0aW1lIiwiX2hhc2J1dHRvbiIsIlNlbGZUb2FzdCIsIm1vZGUiLCJjbGVhclRpbWVvdXQiLCJDb21wbGV0ZVRvYXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtBQUNBLElBQUlDLDhCQUE4QixHQUFHLEVBQXJDO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLElBQXRCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsS0FBL0I7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsTUFBcEI7QUFDQSxJQUFJQyxzQkFBc0IsR0FBRyxLQUE3QjtBQUNBLElBQUlDLFFBQVEsR0FBRyxDQUFmO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxJQUFJQyxxQkFBcUIsR0FBRyxDQUE1QjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLEtBQXhCO0FBQ0EsSUFBSUMsOEJBQThCLEdBQUcsS0FBckM7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUF4QjtBQUNBLElBQUlDLDJCQUEyQixHQUFHLEtBQWxDO0FBQ0EsSUFBSUMsWUFBWSxHQUFH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QUFDbmYsVUFBRCxDQUFaO0FBQ0Q7QUFudEU4QixDQUFULENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxudmFyIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxudmFyIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG52YXIgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxudmFyIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgQ2FuY2VsbGVkSUQgPSBbXTtcclxudmFyIFN0YXJ0R2FtZUNhc2ggPSAxMDAwMDA7XHJcbnZhciBTZWxlY3RlZEJ1c2luZXNzUGF5RGF5ID0gZmFsc2U7XHJcbnZhciBITUFtb3VudCA9IDA7XHJcbnZhciBCTUFtb3VudCA9IDA7XHJcbnZhciBCTUxvY2F0aW9ucyA9IDA7XHJcbnZhciBTZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwO1xyXG52YXIgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxudmFyIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG52YXIgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG52YXIgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbnZhciBQcmV2aW91c0Nhc2ggPSAwO1xyXG52YXIgVGltZW91dFJlZjtcclxudmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gODAwMDtcclxudmFyIExvbmdNZXNzYWdlVGltZSA9IDUwMDA7XHJcbnZhciBTaG9ydE1lc3NhZ2VUaW1lID0gMjUwMDtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGFtb3VudCBvZiBsb2FuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBMb2FuQW1vdW50RW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgVGVuVGhvdXNhbmQ6IDEwMDAwLFxyXG4gIFRlbnR5VGhvdXNhbmQ6IDIwMDAwLFxyXG4gIFRoaXJ0eVRob3VzYW5kOiAzMDAwMCxcclxuICBGb3J0eVRob3VzYW5kOiA0MDAwMCxcclxuICBGaWZ0eVRob3VzYW5kOiA1MDAwMCxcclxuICBPdGhlcjogNixcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NTZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgbmFtZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2hVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgY2FzaFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZVRleHRVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgdG9vbHRpcDogXCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgdHlwZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZVRleHRVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgdG9vbHRpcDogXCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgbmFtZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHR5cGUgZWRpdGJveFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVjZSBmb3IgYnVzaW5lc3MgbmFtZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTm9kZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZE5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBob21lIGJhc2VkIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJOb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tBbmRNb3J0YXJOb2RlVUlcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbGFiZWwgZm9yIHRpbWVyXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB0aW1lciBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NTZXR1cE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBMb2FuU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5TZXR1cE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgbG9hbiBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBMb2FuQW1vdW50RW51bSxcclxuICAgICAgZGVmYXVsdDogTG9hbkFtb3VudEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxvYW4gYW1vdW50IHRha2VuIGJ5IHBsYXllciAoc3RhdGUgbWFjaGluZSlcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGFsbCBsYWJlbHMgb2YgYW1vdW50cyBpbiBsb2FuIFVJXCIsXHJcbiAgICB9LFxyXG4gICAgV2FpdGluZ1N0YXR1c05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c05vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3Igd2FpdGluZyBzdGF0dXMgc2NyZWVuIG9uIGluaXRpYWwgYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleGl0IGJ1dHRvbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yLy9cclxuICB9LFxyXG5cclxuICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmcgPSBuYW1lO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBUdXJuRGVjaXNpb25TZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVHVybkRlY2lzaW9uU2V0dXBVSVwiLFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYXJrZXRpbmdFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0VkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBtYXJrZXRpbmcgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEdvbGRFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdvbGRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IGdvbGQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFN0b2NrRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0VkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3Qgc3RvY2sgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hBbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIGNhc2ggbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc05vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgZXhwbmFkIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlJlZmVyZW5jZSBmb3IgY29udGVudCBub2RlIG9mIHNjcm9sbCB2aWV3IG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBwcmVmYWIgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBpbnZlc3RtZW50L2J1eSBhbmQgc2VsbC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0RW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgU3RvY2tJbnZlc3Q6IDEsXHJcbiAgR29sZEludmVzdDogMixcclxuICBTdG9ja1NlbGw6IDMsXHJcbiAgR29sZFNlbGw6IDQsXHJcbiAgT3RoZXI6IDUsXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0U2VsbFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0U2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlIFJlc3VsdCBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgdmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV5T3JTZWxsVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnV5T3JTZWxsIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgVmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1dHRvbk5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXR0b25OYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBidXR0b24gbmFtZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U3RhdGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW52ZXN0U3RhdGVcIixcclxuICAgICAgdHlwZTogSW52ZXN0RW51bSxcclxuICAgICAgZGVmYXVsdDogSW52ZXN0RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQW1vdW50RWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsbEJ1c2luZXNzVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2VsbFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBheURheVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXlEYXlVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBheURheVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgUGF5RGF5IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZE51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZE51bWJlclwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhck51bWJlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1OdW1iZXJMb2NhdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTG9jYXRpb25zXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckxvY2F0aW9ucyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkQnRuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZEJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWRCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNQnRuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQnRuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5CdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluUGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIE1haW5QYW5lbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRQYW5lbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblJlc3VsdFBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5SZXN1bHRQYW5lbE5vZGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFNjcmVlblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0U2NyZWVuVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFNjcmVlblRpdGxlIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZVJlc3VsdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxCdXNpbmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQnVzaW5lc3NMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxCdXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcExvYW5CdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcExvYW5CdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2tpcExvYW5CdXR0b24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5Gb3R0ZXJMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuRm90dGVyTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5Gb3R0ZXJMYWJlbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlPclNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgT25lUXVlc3Rpb25VSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgT25lUXVlc3Rpb25VSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk9uZVF1ZXN0aW9uVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckRldGFpbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckRldGFpbExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIERldGFpbHNQcmVmYWIgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgU2Nyb2xsQ29udGVudCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgV2FpdGluZ1NjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25UaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uVGl0bGVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUXVlc3Rpb25MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblF1ZXN0aW9uTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIHF1ZXN0aW9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGFydG5lcnNoaXBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGFydG5lcnNoaXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBhcnRuZXJzaGlwVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBXYWl0aW5nU3RhdHVzU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTdGF0dXNTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgd2FpdGluZyBzY3JlZW4gbm9kZSBvZiBwYXJ0bmVyc2hpcCB1aVwiLFxyXG4gICAgfSxcclxuICAgIE1haW5TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVGl0bGVOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJTaGlwUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJTaGlwUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25QbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uRGVzY3JpcHRpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25EZXNjcmlwdGlvblwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBHYW1lcGxheVVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YUludGFuY2U7XHJcbnZhciBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlO1xyXG52YXIgUmVxdWlyZWRDYXNoO1xyXG52YXIgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuLy90dXJuIGRlY2lzaW9uc1xyXG52YXIgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbnZhciBUZW1wSGlyaW5nTGF3eWVyO1xyXG5cclxuLy9idXlvcnNlbGxcclxudmFyIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxudmFyIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbnZhciBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbnZhciBEaWNlUmVzdWx0O1xyXG52YXIgT25jZU9yU2hhcmU7XHJcbnZhciBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG5cclxudmFyIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgTG9hblBheWVkID0gZmFsc2U7XHJcbnZhciBUb3RhbFBheURheUFtb3VudCA9IDA7XHJcbnZhciBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuXHJcbnZhciBHYW1lcGxheVVJTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVwbGF5VUlNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEJ1c2luZXNzU2V0dXBEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEJ1c2luZXNzU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXNpbmVzc1NldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBUdXJuRGVjaXNpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFR1cm5EZWNpc2lvblNldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgVHVybkRlY2lzaW9uU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEludmVzdFNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFBheURheVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGxCdXNpbmVzc1NldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGxCdXNpbmVzc1VJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGxCdXNpbmVzc1VJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogSW52ZXN0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBCdXlPclNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXlPclNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogT25lUXVlc3Rpb25VSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBPbmVRdWVzdGlvblVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lcnNoaXBTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBQYXJ0bmVyc2hpcFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFBhcnRuZXJzaGlwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlCdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TcGFjZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsXHJcbiAgICB9LFxyXG4gICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAvL2xvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gMDtcclxuICB9LFxyXG5cclxuICBSZXNldFR1cm5WYXJpYWJsZSgpIHtcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlciA9PSBudWxsKVxyXG4gICAgICBHYW1lTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKF9zdGF0ZSlcclxuICB7XHJcbiAgICB0aGlzLkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlKClcclxuICB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKGZhbHNlKTtcclxuICB9LFxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gIEluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJTcGxhc2hcIik7XHJcbiAgICB9LCA1MDApO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXNpbmVzc1NldHVwIHdpdGggbG9hblxyXG4gIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFxyXG4gICAgaXNGaXJzdFRpbWUsXHJcbiAgICBpbnNpZGVHYW1lID0gZmFsc2UsXHJcbiAgICBtb2RlSW5kZXggPSAwLFxyXG4gICAgX2lzQmFua3J1cHRlZCA9IGZhbHNlLFxyXG4gICAgX0JhbmtydXB0QW1vdW50ID0gMCxcclxuICAgIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsXHJcbiAgICBfR2l2ZW5DYXNoID0gMCxcclxuICAgIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g9ZmFsc2VcclxuICApIHtcclxuICAgIC8vY2FsbGVkIGZpcnN0IHRpbWUgZm9ybSBHYW1lTWFuYWdlciBvbmxvYWQgZnVuY3Rpb25cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gX0dpdmVuQ2FzaDtcclxuICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoO1xyXG4gICAgXHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IF9pc0JhbmtydXB0ZWQ7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSBfQmFua3J1cHRBbW91bnQ7XHJcblxyXG4gICAgaWYgKF9pc0JhbmtydXB0ZWQpIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuXHJcbiAgICB0aGlzLkluaXRfQnVzaW5lc3NTZXR1cChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSwgbW9kZUluZGV4LCBfaXNCYW5rcnVwdGVkKTtcclxuICB9LFxyXG4gIEluaXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFxyXG4gICAgaXNGaXJzdFRpbWUsXHJcbiAgICBpbnNpZGVHYW1lID0gZmFsc2UsXHJcbiAgICBtb2RlSW5kZXggPSAwLFxyXG4gICAgX2lzQmFua3J1cHRlZCA9IGZhbHNlLFxyXG4gICkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lO1xyXG5cclxuICAgIGlmIChpc0ZpcnN0VGltZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gU3RhcnRHYW1lQ2FzaDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAoKTtcclxuXHJcbiAgICBpZiAoaW5zaWRlR2FtZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwO2luZGV4IDxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO2luZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gaW5kZXg7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICBpZiAoQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICAgIGlmIChTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgICAgICBQcmV2aW91c0Nhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSAwO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gR2l2ZW5DYXNoQnVzaW5lc3M7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZSk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgR2V0T2JqX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChuYW1lKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IFwiXCI7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuICB9LFxyXG4gIE9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gIH0sXHJcbiAgT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgYW1vdW50O1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IGFtb3VudDtcclxuICB9LFxyXG4gIENhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgdGFrZW4gbG9hbiBvZiAkXCIgK1BsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCxMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiLExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgUmVxdWlyZWRDYXNoID0gTWF0aC5hYnMocGFyc2VJbnQoUGxheWVyRGF0YUludGFuY2UuQ2FzaCkgLSBhbW91bnQpO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgICBjYy5MYWJlbFxyXG4gICAgICAgICAgKS5zdHJpbmcgPSBcIiRcIiArIFJlcXVpcmVkQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXBcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCg1MDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGJ1c2luZXNzIGJldHdlZW4gSG9tZSBCYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXBcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG4gIEhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpbmRleCA9PSBpKVxyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgfSxcclxuICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID09IExvYW5BbW91bnRFbnVtLk90aGVyKVxyXG4gICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBSZXF1aXJlZENhc2g7XHJcbiAgICBlbHNlXHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IHBhcnNlSW50KFxyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudFxyXG4gICAgICApO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gdHJ1ZTtcclxuICAgIHRoaXMuT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggKyBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNEYXRhOiBmdW5jdGlvbiAoX2RhdGEsIF9JRCkge1xyXG4gICAgaWYgKF9JRCAhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5hY3Rvck5yKVxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChfZGF0YSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycykge1xyXG4gICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5nZXRQaG90b25SZWYoKVxyXG4gICAgICAgIC5teVJvb20oKVxyXG4gICAgICAgIC5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCB0cnVlLCB0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5nZXRQaG90b25SZWYoKVxyXG4gICAgICAgIC5teVJvb20oKVxyXG4gICAgICAgIC5zZXRDdXN0b21Qcm9wZXJ0eShcclxuICAgICAgICAgIFwiUGxheWVyR2FtZUluZm9cIixcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFB1cmNoYXNlQnVzaW5lc3M6IGZ1bmN0aW9uIChfYW1vdW50LCBfYnVzaW5lc3NOYW1lLCBfaXNIb21lQmFzZWQpIHtcclxuICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIDwgX2Ftb3VudCAmJiAhU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiICsgX2J1c2luZXNzTmFtZSArIFwiIGJ1c2luZXNzLlwiLExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2lzSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA8IDMpIHtcclxuXHJcbiAgICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPVxyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUmV2ZXJ0aW5nIGJhY2sgbG9hbiBhbW91bnQuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2VcclxuICAgIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5CYW5rcnVwdEFtb3VudCA9IHRoaXMuQmFua3J1cHRlZEFtb3VudDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vc2V0dGluZyBwbGF5ZXIgY3VycmVudCBkYXRhIGluIGN1c3RvbSBwcm9wZXJ0aWVzIHdoZW4gaGlzL2hlciB0dXJuIG92ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfZGF0YSA9IHtEYXRhOiB7YmFua3J1cHRlZDogdHJ1ZSx0dXJuOiBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpLFBsYXllckRhdGFNYWluOiBQbGF5ZXJEYXRhSW50YW5jZSx9LH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg5LCBfZGF0YSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIEFJXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICAgIH0sIDE2MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwibm8gbW9kZSBzZWxlY3RlZFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlOyAgXHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFBheUFtb3VudFRvUGxheUdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPT0gXCJcIilcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyB0eXBlLlwiKTtcclxuICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID09IFwiXCIpXHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmUgfHwgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PXVuZGVmaW5lZClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBhIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgaG9tZWJhc3NlZFxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCwgXCJob21lXCIsIHRydWUpO1xyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBicmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDUwMDAwLCBcImJyaWNrIGFuZCBtb3J0YXJcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuU3RhcnRHYW1lID09IHRydWUgfHwgdGhpcy5Jc0JhbmtydXB0ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgICBpZiAoSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgIT0gLTEpIHtcclxuICAgICAgICAgIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBub3QgYmVlbiBjYWxsZWQgZnJvbSBpbnNpZGUgZ2FtZVxyXG4gICAgICAgICAgdGhpcy5TdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgYmVlbiBjYWxsZWQgYXQgc3RhcnQgb2YgZ2FtZSBhcyBpbml0aWFsIHNldHVwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BydGludGluZyBhbGwgdmFsdWVzIHRvIGNvbnNvbGVcclxuICAgICAgICBmb3IgKHZhciBpID0gMDtpIDxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO2krKykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbmFtZTogXCIgK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIElEOiBcIiArR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIklzIHBsYXllciBib3Q6IFwiICtHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uSXNCb3QpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJubyBvZiBidXNpbmVzcyBvZiBwbGF5ZXIgKHNlZSBiZWxvdyk6IFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY2FzaDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uQ2FzaCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciB0YWtlbiBsb2FuOiBcIiArR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5UYWtlbik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2VuIGxvYW4gYW1vdW50OiBcIiArR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBpc2FjdGl2ZTtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkNhc2hBbW91bnRMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBcIiQgXCIgK1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKVxyXG4gICAgICBdLkNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gXCJcIiB8fCBUZW1wTWFya2V0aW5nQW1vdW50ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB0aGlzLm1hcmtldGluZ0Ftb3VudCA9IHBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2hcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA+PSB0aGlzLm1hcmtldGluZ0Ftb3VudFxyXG4gICAgICApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCAtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uTWFya2V0aW5nQW1vdW50ID1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLk1hcmtldGluZ0Ftb3VudCArIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uTWFya2V0aW5nQW1vdW50ICtcclxuICAgICAgICAgICAgXCIgLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uQ2FzaCArXHJcbiAgICAgICAgICAgIFwiLlwiLExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGlmIHBsYXllciBoYXMgbW9yZSB0aGFuIDUwMDAkXHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIGlmIChcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICBdLkxhd3llclN0YXR1c1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgYWxyZWFkeSBoaXJlZCBhIGxhd3llci5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5DYXNoID49IDUwMDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5MYXd5ZXJTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIFRlbXBIaXJpbmdMYXd5ZXIgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFRlbXBIaXJpbmdMYXd5ZXIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA9XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoIC0gNTAwMDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uQ2FzaCArXHJcbiAgICAgICAgICAgIFwiLlwiLExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSkge1xyXG4gICAgTG9jYXRpb25OYW1lID0gX25hbWU7XHJcbiAgfSxcclxuICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQ9bnVsbCxfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLF9HaXZlbkNhc2ggPSAwLF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g9ZmFsc2UpIHtcclxuICAgIC8vaWYgcGxheWVyIGhhcyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGhlIGNvdWxkIGV4cGFuZCBpdFxyXG4gICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3NcIik7XHJcbiAgICBcclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuXHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB2YXIgZ2VuZXJhdGVkTGVuZ3RoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5LEdpdmVuQ2FzaEJ1c2luZXNzLFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcblxyXG4gICAgaWYgKGdlbmVyYXRlZExlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm8gYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyB0byBleHBhbmQuXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9LCAxNjAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgIHRoaXMuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZEludmVzdGVkKSB7XHJcbiAgICAgIHRoaXMuR29sZEludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRJbnZlc3Q7XHJcbiAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICBcIkludmVzdCBJbiBHT0xEXCIsXHJcbiAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsXHJcbiAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgXCJCVVlcIixcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICBPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQ9bnVsbCxfaXNUdXJuT3Zlcj1mYWxzZSkge1xyXG4gICAgVHVybk92ZXJGb3JJbnZlc3QgPSBfaXNUdXJuT3ZlcjtcclxuXHJcbiAgICBjb25zb2xlLmVycm9yKF9pc1R1cm5PdmVyKTtcclxuXHJcbiAgICBpZiAoVHVybk92ZXJGb3JJbnZlc3QpXHJcbiAgICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJGcmllbmQncyBCdXNpbmVzc1wiO1xyXG4gICAgICBcclxuICAgIGlmICghdGhpcy5TdG9ja0ludmVzdGVkIHx8IFR1cm5PdmVyRm9ySW52ZXN0KSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoU3RvY2tCdXNpbmVzc05hbWUgPT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYSBidXNpbmVzcyBuYW1lIHRvIGludmVzdC5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0O1xyXG5cclxuICAgICAgICBpZighVHVybk92ZXJGb3JJbnZlc3QpXHJcbiAgICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuICAgICAgICBcclxuICAgICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgIFwiSW52ZXN0IGluIFN0b2NrXCIsXHJcbiAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLFxyXG4gICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBCVVlcIixcclxuICAgICAgICAgIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgICBcIkJVWVwiLFxyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uR29sZENvdW50ID4gMFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLkdvbGRTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIlNlbGwgR09MRFwiLFxyXG4gICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLFxyXG4gICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLFxyXG4gICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uU3RvY2tDb3VudCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIlNlbGwgU1RPQ0tcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggc2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsXHJcbiAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IHNoYXJlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZ28gaW50byBwYXJ0bmVyIHNoaXBcIik7XHJcbiAgICAvLyB0aGlzLlNob3dUb2FzdChcIndvcmsgaW4gcHJvZ3Jlc3MsIGNvbWluZyBzb29uLi4uXCIpO1xyXG4gICAgLy8gdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdGhpcy5FbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgfSxcclxuXHJcbiAgT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInJvbGwgdGhlIGRpY2VcIik7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbihmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbERpY2UoKTtcclxuICB9LFxyXG5cclxuICBQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgLy90aGlzLlRlbXBEaWNlVGV4dC5zdHJpbmc9dmFsdWU7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBhcnRuZXJzaGlwIHNldHVwXHJcbiAgVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5NYWluU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5XYWl0aW5nU3RhdHVzU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICBDYW5jZWxsZWRJRCA9IFtdO1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyTmFtZS5zdHJpbmcgPV90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyQ2FzaC5zdHJpbmcgPVwiJFwiK190ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBhcnRuZXJTaGlwUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIHZhciBfdG90YWxMb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgIHZhciBfYWxsTG9jYXRpb25zQW1vdW50ID0gX3RvdGFsTG9jYXRpb25zICogMjUwMDA7XHJcbiAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlBhcnRuZXJOYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoXCJub25lXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWUuc3RyaW5nID1fdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyQ2FzaC5zdHJpbmcgPVwiJFwiK190ZW1wRGF0YS5DYXNoO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25EZXNjcmlwdGlvbi5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuICBcclxuICBSZXNldF9QYXJ0bmVyU2hpcFNldHVwKClcclxuICB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKVxyXG4gIHtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IHRydWU7XHJcbiAgICBQYXJ0bmVyU2hpcERhdGEgPSBfZGF0YTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKVxyXG4gICAgICBfYnVzaW5lc3NNb2RlID0gXCJIb21lIEJhc2VkXCI7XHJcbiAgICBlbHNlIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpXHJcbiAgICAgIF9idXNpbmVzc01vZGUgPSBcIkJyaWNrICYgTW9ydGFyXCI7XHJcbiAgICAgIFxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICB2YXIgX21zZyA9IFwieW91IGhhdmUgcmVjZWl2ZWQgcGFydG5lcnNoaXAgb2ZmZXIgYnkgXCIgKyBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICsgXCIgLCBmb2xsb3dpbmcgYXJlIHRoZSBkZXRhaWxzIG9mIGJ1c2luZXNzOiBcIiArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE5hbWU6IFwiICsgX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzTmFtZSArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgTW9kZTogXCIgKyBfYnVzaW5lc3NNb2RlICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBWYWx1ZTogJFwiICsgX2J1c2luZXNzVmFsdWUgKyBcIlxcblwiICtcclxuICAgICAgICBcIkNhc2ggUGF5bWVudDogJFwiICsgX3BheUFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICBcImlmIG9mZmVyIGlzIGFjY2VwdGVkIHlvdSB3aWxsIHJlY2VpdmUgNTAlIHNoYXJlIG9mIHRoYXQgcGFydGljdWxhciBidXNpbmVzcyBhbmQgd2lsbCByZWNlaXZlIHByb2ZpdC9sb3NlIG9uIHRoYXQgcGFydGljdWxhciBidXNpbmVzcy5cIjtcclxuICAgIFxyXG4gICAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cChfbXNnKTtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpXHJcbiAge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIHZhciBteUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG4gIFxyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoID49IF9wYXlBbW91bnQpIHtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoIC09IF9wYXlBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAodHJ1ZSwgX3BheUFtb3VudCwgZmFsc2UsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJjb25ncmF0dWxhdGlvbnMhIHlvdSBoYXZlIHN0YXJ0ZWQgYnVzaW5lc3MgcGFydG5lcnNoaXBcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpXHJcbiAge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKGZhbHNlLCAwLCB0cnVlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIik7XHJcbiAgICB9IGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfaXNBY2NlcHRlZD1mYWxzZSxfcGF5bWVudD0wLF9pc0NhbmNlbGxlZD1mYWxzZSxfdUlEPVwiXCIsX2RhdGE9bnVsbCxfYnVzaW5lc3NJbmRleD0wKVxyXG4gIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSB7IERhdGE6IHsgQWNjZXB0ZWQ6IF9pc0FjY2VwdGVkLCBDYXNoUGF5bWVudDpfcGF5bWVudCxDYW5jZWxsZWQ6X2lzQ2FuY2VsbGVkLFBsYXllcklEOl91SUQsUGxheWVyRGF0YTpfZGF0YSxCdXNpbmVzc0luZGV4Ol9idXNpbmVzc0luZGV4fSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMiwgX21haW5EYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKVxyXG4gIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHZhciBfYWNjZXB0ZWQgPSBfZGF0YS5EYXRhLkFjY2VwdGVkO1xyXG4gICAgICB2YXIgX2Nhc2ggPSBfZGF0YS5EYXRhLkNhc2hQYXltZW50O1xyXG4gICAgICB2YXIgX2NhbmNlbGxlZCA9IF9kYXRhLkRhdGEuQ2FuY2VsbGVkO1xyXG4gICAgICB2YXIgX3VpZCA9IF9kYXRhLkRhdGEuUGxheWVySUQ7XHJcbiAgICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5CdXNpbmVzc0luZGV4O1xyXG4gICAgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYW5zd2VyIHJlY2VpdmVkXCIpO1xyXG4gICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfY2FzaDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwID0gdHJ1ZTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVySUQgPSBfdWlkO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJOYW1lID0gX3BsYXllckRhdGEuUGxheWVyTmFtZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgYWNjZXB0ZWRcIik7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgXCIgKyBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICsgXCIsIGNhc2ggJFwiICsgX2Nhc2ggKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGFjY291bnQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBpZiAoQ2FuY2VsbGVkSUQuaW5jbHVkZXMoX3VpZCkgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgQ2FuY2VsbGVkSUQucHVzaChfdWlkKTtcclxuICAgICAgICBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKENhbmNlbGxlZElEKTtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5sZW5ndGggPT0gX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gY2FuY2VsbGVkIGJ5IGFsbCBvdGhlciB1c2Vycy5cIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciByZWplY3RlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICBSZXNldEdvbGRJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5Hb2xkRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5TdG9ja0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbChfYW1vdW50KSB7XHJcbiAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBfYW1vdW50O1xyXG5cclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgdmFyIF9hbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgIE9uY2VPclNoYXJlICsgXCIqXCIgKyBFbnRlckJ1eVNlbGxBbW91bnQgKyBcIj1cIiArIF9hbW91bnRcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgdGhpcy5SZXNldEdvbGRJbnB1dCgpO1xyXG4gICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICBfdGl0bGUsXHJcbiAgICBfZGljZVJlc3VsdCxcclxuICAgIF9wcmljZVRpdGxlLFxyXG4gICAgX3ByaWNlVmFsdWUsXHJcbiAgICBfYnV5T3JTZWxsVGl0bGUsXHJcbiAgICBfdG90YWxBbW91bnRUaXRsZSxcclxuICAgIF90b3RhbEFtb3VudFZhbHVlLFxyXG4gICAgX2J1dHRvbk5hbWUsXHJcbiAgICBfc3RhdGVcclxuICApIHtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZVJlc3VsdDtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VUaXRsZUxhYmVsLnN0cmluZyA9IF9wcmljZVRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVZhbHVlTGFiZWwuc3RyaW5nID0gX3ByaWNlVmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1eU9yU2VsbFRpdGxlTGFiZWwuc3RyaW5nID0gX2J1eU9yU2VsbFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFRpdGxlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV0dG9uTmFtZUxhYmVsLnN0cmluZyA9IF9idXR0b25OYW1lO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZURhdGFfSW52ZXN0U2VsbChfdG90YWxBbW91bnRWYWx1ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgfSxcclxuXHJcbiAgQXBwbHlCdXR0b25fSW52ZXN0U2VsbCgpIHtcclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPV9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXggXS5Hb2xkQ291bnQgKz0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTERcIixcclxuICAgICAgICAgICAgTG9uZ01lc3NhZ2VUaW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIGlmIChfYW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50KSB7XHJcbiAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAgKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50IC09IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgb3VuY2VzIG9mIEdPTEQgZm9yICAkXCIgK1xyXG4gICAgICAgICAgICAgIF9Ub3RhbEFtb3VudCxcclxuICAgICAgICAgICAgICBMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcInlvdSBkb24ndCBoYXZlIGVub3VnaCBHT0xEIG91bmNlcywgeW91IG93biBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgK1xyXG4gICAgICAgICAgICAgIFwiIG9mIEdPTEQgb3VuY2VzXCIsTG9uZ01lc3NhZ2VUaW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICAvL2NhbiBhZGQgbXVsdGlwbGUgc3RvY2tzIHdpdGggYnVzaW5lc3MgbmFtZSBpbiBvYmplY3QgaWYgcmVxdWlyZWRcclxuXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICtcclxuICAgICAgICAgICAgICBfYW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBzaGFyZXMgb2YgYnVzaW5lc3MgXCIgK1xyXG4gICAgICAgICAgICAgIFN0b2NrQnVzaW5lc3NOYW1lLFxyXG4gICAgICAgICAgICAgIExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja1NlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcblxyXG4gICAgICAgIGlmIChfYW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCAtPSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICtcclxuICAgICAgICAgICAgICBfYW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBzaGFyZXMgb2Ygc3RvY2sgZm9yICAkXCIgK1xyXG4gICAgICAgICAgICAgIF9Ub3RhbEFtb3VudCxcclxuICAgICAgICAgICAgICBMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcInlvdSBkb24ndCBoYXZlIGVub3VnaCBzdG9ja3Mgc2hhcmVzLCB5b3Ugb3duIFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgK1xyXG4gICAgICAgICAgICAgIFwiIG9mIHN0b2NrIHNoYXJlc1wiLExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KVxyXG4gICAge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpOyBcclxuICAgICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTsgXHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBheWRheSBvciBEb3VibGUgcGF5IERheVxyXG4gIFRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pIHtcclxuICAgIGlmIChITUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChcclxuICAgICAgICBjYy5CdXR0b25cclxuICAgICAgKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoXHJcbiAgICAgICAgY2MuQnV0dG9uXHJcbiAgICAgICkuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQk1BbW91bnQgPT0gMCkge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsb2FuVGFrZW4pIHtcclxuICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRMb2FuQW1vdW50X1BheURheSgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHZhciBfbG9hbiA9IDA7XHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgICAgaW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW4gPVxyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfbG9hbjtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX1BheURheShfdGl0bGUsX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsX3NraXBITSA9IGZhbHNlLF9za2lwQk0gPSBmYWxzZSxfaXNCb3QgPSBmYWxzZSxfZm9yU2VsZWN0ZWRCdXNpbmVzcz1mYWxzZSxfU2VsZWN0ZWRCdXNpbmVzc0luZGV4PTAsX2hNQW1vdW50PTAsX2JtQW1vdW50PTAsX2JtTG9jYXRpb249MCkge1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfaXNEb3VibGVQYXlEYXk7XHJcbiAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB2YXIgX3RpbWUgPSAxODAwO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IF9mb3JTZWxlY3RlZEJ1c2luZXNzO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX1NlbGVjdGVkQnVzaW5lc3NJbmRleDtcclxuICAgIEhNQW1vdW50PV9oTUFtb3VudDtcclxuICAgIEJNQW1vdW50PV9ibUFtb3VudDtcclxuICAgIEJNTG9jYXRpb25zID0gX2JtTG9jYXRpb247XHJcblxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSlcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgIEhNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwO2luZGV4IDxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO2luZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIGxvYW5UYWtlbiA9IF9sb2FuVGFrZW47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZE51bWJlckxhYmVsLnN0cmluZyA9IEhNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTGFiZWwuc3RyaW5nID0gQk1BbW91bnQ7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMb2NhdGlvbkxhYmVsLnN0cmluZyA9IEJNTG9jYXRpb25zO1xyXG5cclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIC8vY2hlY2sgaWYgbG9hbiB3YXMgc2tpcHBlZCBwcmV2aW91c2x5XHJcbiAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHtcclxuICAgICAgdmFyIF9sb2FuID0gdGhpcy5HZXRMb2FuQW1vdW50X1BheURheSgpO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkZvdHRlckxhYmVsLnN0cmluZyA9IFwiKnBheSAkXCIgKyBfbG9hbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICQ1MDAwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwgMCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwSE0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwgQk1BbW91bnQsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIGlmIChfc2tpcEJNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuXHJcbiAgICBpZiAoX3NraXBCTSB8fCBfc2tpcEhNKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0sIF90aW1lICsgMjAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5PbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICBpZiAoIUhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQpIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICB9IGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIF9kb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcztcclxuXHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgX211bHRpcGxpZXIgPSAyO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfbXVsdGlwbGllciAqIF9kaWNlICogMTAwMDtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSAoX3BheW1lbnQgLyAyKTtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW2luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDA7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IChfcGF5bWVudCAvIDIpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZD4wKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfVxyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSlcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IEhNQW1vdW50ICogX2RpY2UgKiAxMDAwLV9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IDIgKiAoSE1BbW91bnQgKiBfZGljZSkgKiAxMDAwLV9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IEhNQW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9XCIoXCIrX2RpY2UgKyBcIipcIiArIEhNQW1vdW50ICsgXCIqXCIgKyBcIjEwMDApLVwiK19hbW91bnRUb0JlQWRqdXN0ZWQrXCI9XCIrIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCoyKS1cIitfYW1vdW50VG9CZUFkanVzdGVkK1wiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVQYXltZW50X1BheURheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQpIHtcclxuICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX2RvdWJsZVBheURheSA9IERvdWJsZVBheURheTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGlmICghX2RvdWJsZVBheURheSlcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBcclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudCA9IEJNQW1vdW50ICsgQk1Mb2NhdGlvbnM7XHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcztcclxuXHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICBpZiAoX2RvdWJsZVBheURheSlcclxuICAgICAgICBfbXVsdGlwbGllciA9IDI7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfbG9jYXRpb25zID0gX3RlbXBEYXRhW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IChfcGF5bWVudCAvIDIpO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSAoX3BheW1lbnQgLyAyKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9hbW91bnRUb0JlQWRqdXN0ZWQ+MClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSlcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IF9hbW91bnQgKiBfZGljZSAqIDIwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gMiAqIChfYW1vdW50ICogX2RpY2UpICogMjAwMC1fYW1vdW50VG9CZUFkanVzdGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBfYW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9XCIoXCIrX2RpY2UgKyBcIipcIiArIF9hbW91bnQgKyBcIipcIiArIFwiMjAwMCktXCIgK19hbW91bnRUb0JlQWRqdXN0ZWQrXCI9XCIrIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKjIpLVwiK19hbW91bnRUb0JlQWRqdXN0ZWQrXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIGlmICghTG9hblBheWVkKSB7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBfRXN0aW1hdGVMb2FuID0gMDtcclxuXHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkvL2lmIHBsYXllciBoYWQgc2tpcHBwZWQgbG9hbiBwcmV2aW91c2x5IGNhbGwgYWxsIGFtb3VudCBkdWVcclxuICAgICAgICBfRXN0aW1hdGVMb2FuID0gdGhpcy5HZXRMb2FuQW1vdW50X1BheURheSgpO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgX0VzdGltYXRlTG9hbiA9IDUwMDA7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfRXN0aW1hdGVMb2FuKSB7XHJcbiAgICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gX0VzdGltYXRlTG9hbjtcclxuXHJcbiAgICAgICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7aW5kZXggPEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7aW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIF9Fc3RpbWF0ZUxvYW47XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9QYXlEYXkoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuU2tpcExvYW5CdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwib3V0IG9mIG1vbmV5XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCkge1xyXG4gICAgLy9hbGxcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvWyBfcGxheWVySW5kZXhdLkNhc2ggKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9QYXlEYXkoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgIFwiQW1vdW50ICRcIiArXHJcbiAgICAgICAgICBUb3RhbFBheURheUFtb3VudCArXHJcbiAgICAgICAgICBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkNhc2hcclxuICAgICAgKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0sIDE1NTApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgXCJBbW91bnQgJFwiICtcclxuICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ICtcclxuICAgICAgICAgIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgK1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2tpcExvYW5PbmVUaW1lX1BheURheSgpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICBcIllvdSBoYXZlIHNraXBwZWQgdGhlIGxvYW4gcGF5bWVudCwgYmFuayB3aWxsIGNhbGwgdXBvbiBjb21wbGV0ZSBsb2FuIGFtb3VudCBvbiBuZXh0IHBheWRheVwiXHJcbiAgICApO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIFNlbGxCdXNpbmVzc19QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9QYXlEYXkoX2Ftb3VudCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9hbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgRXhpdExvYW5TY3JlZW5fUGF5RGF5KCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdHYW1lX1BheURheSgpIHtcclxuICAgIC8vaWYgYmFua3J1cHRlZCB5b3UgY2FuIHN0YXJ0IG5ldyBnYW1lXHJcbiAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgXCJZb3Ugd2lsbCBsb3NlIGFsbCBwcm9ncmVzcyBhbmQgc3RhcnQgbmV3IGdhbWUgZnJvbSB0aGUgc3RhcnQuXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuRXhpdExvYW5TY3JlZW5fUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIHRoaXMuRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UoKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlNob3dDYXJkXCIsIFwiXCIsIGZhbHNlKTtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgMzAxMCk7XHJcbiAgfSxcclxuXHJcbiAgUGF5RGF5Q29tcGxldGVkKCkge1xyXG4gICAgaWYgKEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgJiYgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkICYmIExvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgY29uc29sZS5sb2coXCJhbGwgcGF5ZGF5IGRvbmVcIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVBheURheShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGwgJiBtYW5pcHVsYXRlIEJ1c2luZXNzIFVJXHJcbiAgVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMTFwiO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9XCJObyBvZiBCdXNpbmVzc2VzIDogXCIgK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NTZWxsUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuU2Nyb2xsQ29udGVudE5vZGU7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIGVsc2Ugbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90PWZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcblxyXG4gICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJCVVNJTkVTU1wiO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nID0gXCJObyBvZiBCdXNpbmVzc2VzIDogXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuU2Nyb2xsQ29udGVudE5vZGU7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX2lzQm90KVxyXG4gICAgICB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZWxlY3RCdXNpbmVzc2ZvclBheURheSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAvLyAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKGZhbHNlKTtcclxuICAgICAgLy8gZWxzZVxyXG4gICAgICAvLyAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKHRydWUpO1xyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzVHVybm92ZXIgPSBmYWxzZSxfaXNCb3Q9ZmFsc2UpIHtcclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZighX2lzQm90KVxyXG4gICAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgXHJcbiAgICB0aGlzLlNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc0JvdCk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IFVJXHJcbiAgVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIklOVkVTVFwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnV5T1JTZWxsIFVJXHJcbiAgVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVWSBPUiBTRUxMXCI7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID1cclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBPbmUgUXVlc3Rpb24gc2V0dXAgVWlcclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TcGFjZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5XYWl0aW5nU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShcclxuICAgIF9teURhdGEsXHJcbiAgICBfYWN0b3JzRGF0YSxcclxuICAgIF9pc1R1cm5PdmVyLFxyXG4gICAgX21vZGVJbmRleCA9IDBcclxuICApIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBcIk5vIG9mIFBsYXllcnM6IFwiICtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgX215RGF0YS5QbGF5ZXJVSUQgIT1cclxuICAgICAgICAgICAgX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgICAgLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIilcclxuICAgICAgICAgICAgICAuc2V0UGxheWVyTmFtZShcclxuICAgICAgICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWVcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgICAgLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIilcclxuICAgICAgICAgICAgICAuc2V0UGxheWVyVUlEKFxyXG4gICAgICAgICAgICAgICAgX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIilcclxuICAgICAgICAgICAgLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKVxyXG4gICAgICAgICAgICAuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9uZVF1ZXN0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIG9uZVF1ZXN0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFeGl0X09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9xdWVzdGlvbikge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKClcclxuICAgICAgLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25RdWVzdGlvbkxhYmVsLnN0cmluZyA9XHJcbiAgICAgIFwiUGxheWVyIGhhcyBhc2tlZCBpZiBcIiArXHJcbiAgICAgIF9xdWVzdGlvbiArXHJcbiAgICAgIFwiXFxuXCIgK1xyXG4gICAgICBcIlxcblwiICtcclxuICAgICAgXCIqZWl0aGVyIGFuc3dlciBxdWVzdGlvbiBvciBwYXkgJDUwMDAgdG8gcGxheWVyIHdob3NlIGFza2luZyBxdWVzdGlvbi5cIjtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtZXNzYWdlLCB0aW1lID0gU2hvcnRNZXNzYWdlVGltZSxfaGFzYnV0dG9uPXRydWUpIHtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Qb3BVcFVJTGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgXHJcbiAgICBpZiAobW9kZSA9PSAxKSAvL2ZvciBib3QgbW9kZSBvbmx5XHJcbiAgICB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoPjAgJiYgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLklzQm90KVxyXG4gICAgICB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUb2FzdCgpO1xyXG4gICAgICAgICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgIHtcclxuICAgICAgaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICAgICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ29tcGxldGVUb2FzdCgpXHJcbiAge1xyXG4gICAgY29uc29sZS5lcnJvcihcImNvbXBsZXRlIHRvYXN0IGNhbGxlZFwiKTtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICB9LFxyXG59KTtcclxuIl19