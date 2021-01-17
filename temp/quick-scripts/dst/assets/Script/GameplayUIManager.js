
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
var ShortMessageTime = 2500; // var CompletionWindowTime = 500;//8000
// var LongMessageTime = 250;//5000
// var ShortMessageTime = 50;//2500
//-------------------------------------------enumeration for amount of loan-------------------------//

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
}); //-------------------------------------------class for ResultUI-------------------------//

var ResultUI = cc.Class({
  name: "ResultUI",
  properties: {
    ResultScreen: {
      displayName: "ResultScreen",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    StatusLabel: {
      displayName: "StatusLabel",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    BodyLabel: {
      displayName: "BodyLabel",
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
    ResultSetupUI: {
      "default": {},
      type: ResultUI,
      serializable: true,
      tooltip: "reference of ResultUI class"
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
  ResetAllData: function ResetAllData() {
    GameManager = null;
    GamePlayReferenceManager = null;
    businessDetailNodes = [];
    oneQuestionNodes = [];
    businessDetailPartnershipNodes = [];
    PartnerShipData = null;
    PartnerShipOfferReceived = false;
    CancelledID = [];
    SelectedBusinessPayDay = false;
    HMAmount = 0;
    BMAmount = 0;
    BMLocations = 0;
    SelectedBusinessIndex = 0;
    TurnOverForInvest = false;
    BusinessSetupCardFunctionality = false;
    GivenCashBusiness = 0;
    StartAnyBusinessWithoutCash = false;
    PreviousCash = 0;
    TimeoutRef = null;
    InsideGameBusinessSetup = -1; //-1 means new business is not instantialted from inside game , if it has any other value it means its been instantiated from inside game and its value represents index of player
    //turn decisions

    TempMarketingAmount = "";
    TempHiringLawyer; //buyorsell

    GoldCashAmount = "";
    EnterBuySellAmount = "";
    StockBusinessName = "";
    DiceResult = 0;
    OnceOrShare;
    LocationName = "";
    HomeBasedPaymentCompleted = false;
    BrickMortarPaymentCompleted = false;
    LoanPayed = false;
    TotalPayDayAmount = 0;
    DoublePayDay = false;
  },
  onLoad: function onLoad() {
    this.ResetAllData();
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
      cc.director.loadScene("MainMenu");
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
    PlayerDataIntance.CardFunctionality = new GameManager.CardDataFunctionality();
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
      setTimeout(function () {
        _this4.OnHomeBasedPaymentClicked_PayDay();

        _this4.OnBMPaymentClicked_PayDay();

        _this4.OnLoanPaymentClicked_PayDay();
      }, 0);
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
        GamePlayReferenceManager.Instance.Get_GameManager().ToggleDoublePayNextTurn(false);
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
  },
  ShowResultScreen: function ShowResultScreen(_status, _data) {
    this.ResultSetupUI.ResultScreen.active = true;
    this.ResultSetupUI.StatusLabel.string = _status;
    this.ResultSetupUI.BodyLabel.string = _data;
  },
  RestartTheGame: function RestartTheGame() {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJPbmVRdWVzdGlvblVJIiwiUGxheWVyRGV0YWlsTGFiZWwiLCJEZXRhaWxzUHJlZmFiIiwiU2Nyb2xsQ29udGVudCIsIldhaXRpbmdTY3JlZW4iLCJEZWNpc2lvblRpdGxlTGFiZWwiLCJEZWNpc2lvbkNhc2hMYWJlbCIsIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsIiwiRGVjaXNpb25RdWVzdGlvbkxhYmVsIiwiUGFydG5lcnNoaXBVSSIsIldhaXRpbmdTdGF0dXNTY3JlZW4iLCJNYWluU2NyZWVuIiwiVGl0bGVOYW1lIiwiUGxheWVyTmFtZSIsIlBsYXllckNhc2giLCJQYXJ0bmVyU2hpcFByZWZhYiIsIkRlY2lzaW9uU2NyZWVuIiwiRGVjaXNpb25QbGF5ZXJOYW1lIiwiRGVjaXNpb25QbGF5ZXJDYXNoIiwiRGVjaXNpb25EZXNjcmlwdGlvbiIsIlJlc3VsdFVJIiwiUmVzdWx0U2NyZWVuIiwiU3RhdHVzTGFiZWwiLCJCb2R5TGFiZWwiLCJQbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllckJ1c2luZXNzRGF0YUludGFuY2UiLCJSZXF1aXJlZENhc2giLCJJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCIsIlRlbXBNYXJrZXRpbmdBbW91bnQiLCJUZW1wSGlyaW5nTGF3eWVyIiwiR29sZENhc2hBbW91bnQiLCJFbnRlckJ1eVNlbGxBbW91bnQiLCJTdG9ja0J1c2luZXNzTmFtZSIsIkRpY2VSZXN1bHQiLCJPbmNlT3JTaGFyZSIsIkxvY2F0aW9uTmFtZSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJPbmVRdWVzdGlvblNldHVwVUkiLCJQYXJ0bmVyc2hpcFNldHVwVUkiLCJSZXN1bHRTZXR1cFVJIiwiUG9wVXBVSSIsIlBvcFVwVUlMYWJlbCIsIlBvcFVwVUlCdXR0b24iLCJHYW1lcGxheVVJU2NyZWVuIiwiSW52ZXN0U2VsbFNjcmVlbiIsIlBheURheVNjcmVlbiIsIlNlbGxCdXNpbmVzc1NjcmVlbiIsIkludmVzdFNjcmVlbiIsIkJ1eU9yU2VsbFNjcmVlbiIsIk9uZVF1ZXN0aW9uU3BhY2VTY3JlZW4iLCJPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuIiwiSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbiIsIlRlbXBEaWNlVGV4dCIsIkxlYXZlUm9vbUJ1dHRvbiIsIlJlc2V0QWxsRGF0YSIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdvbGRJbnZlc3RlZCIsIkdvbGRTb2xkIiwiU3RvY2tJbnZlc3RlZCIsIlN0b2NrU29sZCIsIklzQm90VHVybiIsIklzQmFua3J1cHRlZCIsIkJhbmtydXB0ZWRBbW91bnQiLCJSZXNldFR1cm5WYXJpYWJsZSIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiX3N0YXRlIiwiYWN0aXZlIiwiRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSIsIkluc3RhbmNlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiRGlzY29ubmVjdFBob3RvbiIsInNldFRpbWVvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJpc0ZpcnN0VGltZSIsImluc2lkZUdhbWUiLCJtb2RlSW5kZXgiLCJfaXNCYW5rcnVwdGVkIiwiX0JhbmtydXB0QW1vdW50IiwiX2lzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfR2l2ZW5DYXNoIiwiX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIkluaXRfQnVzaW5lc3NTZXR1cCIsIlBsYXllckRhdGEiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIkJ1c2luZXNzSW5mbyIsIkJ1c2luZXNzVHlwZSIsIkVudW1CdXNpbmVzc1R5cGUiLCJDYXNoIiwiUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCIsImluZGV4IiwiUGxheWVyR2FtZUluZm8iLCJsZW5ndGgiLCJTdHVkZW50RGF0YSIsInVzZXJJRCIsIlBsYXllclVJRCIsIk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiSG9tZUJhc2VkIiwiT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJicmlja0FuZG1vcnRhciIsImFtb3VudCIsIkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCIsIl9sb2FuVGFrZW4iLCJfYnVzaW5lc3NJbmRleCIsIk5vT2ZCdXNpbmVzcyIsIkxvYW5UYWtlbiIsIlNob3dUb2FzdCIsIk1hdGgiLCJhYnMiLCJwYXJzZUludCIsImdldENvbXBvbmVudCIsIk9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsImV2ZW50IiwiT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCIsImkiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXAiLCJPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIl9kYXRhIiwiX0lEIiwiUGhvdG9uQWN0b3IiLCJhY3Rvck5yIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJNYXhQbGF5ZXJzIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJTdGFydFR1cm4iLCJQdXJjaGFzZUJ1c2luZXNzIiwiX2Ftb3VudCIsIl9idXNpbmVzc05hbWUiLCJfaXNIb21lQmFzZWQiLCJIb21lQmFzZWRBbW91bnQiLCJTdGFydEdhbWUiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIkV4aXRfQnVzaW5lc3NTZXR1cCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCIsIl9tb2RlIiwiR2V0U2VsZWN0ZWRNb2RlIiwiSXNCYW5rcnVwdCIsIkJhbmtydXB0QW1vdW50IiwiR2V0VHVybk51bWJlciIsIlJhaXNlRXZlbnQiLCJEYXRhIiwiYmFua3J1cHRlZCIsInR1cm4iLCJQbGF5ZXJEYXRhTWFpbiIsIlN0YXJ0VHVybkFmdGVyQmFua3J1cHQiLCJlcnJvciIsIlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUGF5QW1vdW50VG9QbGF5R2FtZSIsInVuZGVmaW5lZCIsIklzQm90IiwiaXNhY3RpdmUiLCJVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbiIsIk9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbiIsIl9wbGF5ZXJJbmRleCIsIm1hcmtldGluZ0Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIk9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJMYXd5ZXJTdGF0dXMiLCJvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiZ2VuZXJhdGVkTGVuZ3RoIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGREaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwiLCJSb2xsVHdvRGljZXMiLCJBc3NpZ25EYXRhX0ludmVzdFNlbGwiLCJPblN0b2NrQnVzaW5lc3NOYW1lQ2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiX2lzVHVybk92ZXIiLCJSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQiLCJSb2xsT25lRGljZSIsIk9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdvbGRDb3VudCIsIk9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJTdG9ja0NvdW50IiwiT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCIsIk9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJvbGxEaWNlIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwidmFsdWUiLCJUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJSZXNldF9QYXJ0bmVyU2hpcFNldHVwIiwiX21hbmFnZXIiLCJfdGVtcERhdGEiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXROYW1lIiwiU2V0VHlwZSIsIlNldEJ1c2luZXNzSW5kZXgiLCJfdG90YWxMb2NhdGlvbnMiLCJMb2NhdGlvbnNOYW1lIiwiU2V0QnVzaW5lc3NNb2RlIiwiU2V0TW9kZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJfYWxsTG9jYXRpb25zQW1vdW50IiwiX2ZpbmFsQW1vdW50IiwiU2V0QmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIklzUGFydG5lcnNoaXAiLCJUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbiIsIlNldFBhcnRuZXJOYW1lIiwiUGFydG5lck5hbWUiLCJFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAiLCJfbXNnIiwiY3VzdG9tUHJvcGVydGllcyIsIlBsYXllclNlc3Npb25EYXRhIiwiRXhpdF9QYXJ0bmVyU2hpcFNldHVwIiwiZGVzdHJveSIsIlJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwIiwiX2FjdG9yIiwiX3R1cm4iLCJUdXJuIiwiX3BsYXllckRhdGEiLCJfU2VsZWN0ZWRCdXNpbmVzc0luZGV4IiwiU2VsZWN0ZWRCdXNpbnNlc3NJbmRleCIsIl9idXNpbmVzc1ZhbHVlIiwiQnVzVmFsdWUiLCJfcGF5QW1vdW50IiwiX2J1c2luZXNzTW9kZSIsIkNoZWNrU3BlY3RhdGUiLCJBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2FsbEFjdG9ycyIsIlJvb21BY3RvcnMiLCJteUluZGV4IiwiR2V0TXlJbmRleCIsIlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwIiwiQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9pc0FjY2VwdGVkIiwiX3BheW1lbnQiLCJfaXNDYW5jZWxsZWQiLCJfdUlEIiwiX21haW5EYXRhIiwiQWNjZXB0ZWQiLCJDYXNoUGF5bWVudCIsIkNhbmNlbGxlZCIsIlBsYXllcklEIiwiQnVzaW5lc3NJbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWNjZXB0ZWQiLCJfY2FzaCIsIl9jYW5jZWxsZWQiLCJfdWlkIiwiUGFydG5lcklEIiwiaW5jbHVkZXMiLCJSZXNldEdvbGRJbnB1dCIsIm9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsIiwiVXBkYXRlRGF0YV9JbnZlc3RTZWxsIiwiX3RpdGxlIiwiX2RpY2VSZXN1bHQiLCJfcHJpY2VUaXRsZSIsIl9wcmljZVZhbHVlIiwiX2J1eU9yU2VsbFRpdGxlIiwiX3RvdGFsQW1vdW50VGl0bGUiLCJfdG90YWxBbW91bnRWYWx1ZSIsIl9idXR0b25OYW1lIiwiQXBwbHlCdXR0b25fSW52ZXN0U2VsbCIsIl9Ub3RhbEFtb3VudCIsIkV4aXRCdXR0b25fSW52ZXN0U2VsbCIsIlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkiLCJUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkiLCJVcGRhdGVCdXR0b25zX1BheURheSIsImxvYW5UYWtlbiIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsIkdldExvYW5BbW91bnRfUGF5RGF5IiwiX2xvYW4iLCJBc3NpZ25EYXRhX1BheURheSIsIl9pc0RvdWJsZVBheURheSIsIl9za2lwSE0iLCJfc2tpcEJNIiwiX2lzQm90IiwiX2ZvclNlbGVjdGVkQnVzaW5lc3MiLCJfaE1BbW91bnQiLCJfYm1BbW91bnQiLCJfYm1Mb2NhdGlvbiIsIl90aW1lIiwiVXBkYXRlQ2FzaF9QYXlEYXkiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBheURheUNvbXBsZXRlZCIsIk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25CTVBheW1lbnRDbGlja2VkX1BheURheSIsIk9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSIsIl9kb3VibGVQYXlEYXkiLCJfZGljZSIsIl9hbW91bnRUb0JlU2VuZCIsIl9hbW91bnRUb0JlQWRqdXN0ZWQiLCJfbXVsdGlwbGllciIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfbG9jYXRpb25zIiwiX0VzdGltYXRlTG9hbiIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlN0YXJ0TmV3R2FtZV9QYXlEYXkiLCJlbWl0IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlRvZ2dsZVBheURheSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiY2FsbFVwb25DYXJkIiwiVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwIiwiQW1vdW50IiwiVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uIiwiU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJTZWxlY3RCdXNpbmVzc2ZvclBheURheSIsIl9pc1R1cm5vdmVyIiwiRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJIiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSIsIlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfbXlEYXRhIiwiX2FjdG9yc0RhdGEiLCJfbW9kZUluZGV4IiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9xdWVzdGlvbiIsIm1lc3NhZ2UiLCJ0aW1lIiwiX2hhc2J1dHRvbiIsIlNlbGZUb2FzdCIsIm1vZGUiLCJjbGVhclRpbWVvdXQiLCJDb21wbGV0ZVRvYXN0IiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9zdGF0dXMiLCJSZXN0YXJ0VGhlR2FtZSIsIlJlc3RhcnRHYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtBQUNBLElBQUlDLDhCQUE4QixHQUFHLEVBQXJDO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLElBQXRCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsS0FBL0I7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsTUFBcEI7QUFDQSxJQUFJQyxzQkFBc0IsR0FBRyxLQUE3QjtBQUNBLElBQUlDLFFBQVEsR0FBRyxDQUFmO0FBQ0Es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R0FBR2dNLFVBQVUsQ0FBQyxZQUFNO0FBQzVCLFlBQUEsTUFBSSxDQUFDNlQsYUFBTDtBQUNELFdBRnNCLEVBRXBCNWYsb0JBRm9CLENBQXZCO0FBR0QsU0FORCxNQU9LO0FBQ0gsZUFBS3FKLGFBQUwsQ0FBbUJnQyxNQUFuQixHQUE0QixLQUE1QjtBQUNBVSxVQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNyQjBULFlBQUFBLFNBQVMsQ0FBQ3RXLE9BQVYsQ0FBa0JrQyxNQUFsQixHQUEyQixLQUEzQjtBQUNELFdBRlMsRUFFUGtVLElBRk8sQ0FBVjtBQUdEO0FBQ0Y7QUFDRixHQWx3RThCO0FBb3dFL0JLLEVBQUFBLGFBcHdFK0IsMkJBcXdFL0I7QUFDRW5QLElBQUFBLE9BQU8sQ0FBQzRCLEtBQVIsQ0FBYyx1QkFBZDtBQUNBLFNBQUtsSixPQUFMLENBQWFrQyxNQUFiLEdBQXNCLEtBQXRCO0FBQ0FzVSxJQUFBQSxZQUFZLENBQUM1ZixVQUFELENBQVo7QUFDRCxHQXp3RThCO0FBMndFL0I4ZixFQUFBQSxnQkFBZ0IsRUFBRSwwQkFBVUMsT0FBVixFQUFrQjFQLEtBQWxCLEVBQXlCO0FBQ3pDLFNBQUtsSCxhQUFMLENBQW1COUIsWUFBbkIsQ0FBZ0NpRSxNQUFoQyxHQUF5QyxJQUF6QztBQUNBLFNBQUtuQyxhQUFMLENBQW1CN0IsV0FBbkIsQ0FBK0IxRSxNQUEvQixHQUF3Q21kLE9BQXhDO0FBQ0EsU0FBSzVXLGFBQUwsQ0FBbUI1QixTQUFuQixDQUE2QjNFLE1BQTdCLEdBQXNDeU4sS0FBdEM7QUFDRCxHQS93RThCO0FBaXhFL0IyUCxFQUFBQSxjQWp4RStCLDRCQWt4RS9CO0FBQ0VsaEIsSUFBQUEsd0JBQXdCLENBQUM4TSxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEb1UsV0FBOUQ7QUFDRDtBQXB4RThCLENBQVQsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lTWFuYWdlciA9IG51bGw7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG52YXIgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbnZhciBQYXJ0bmVyU2hpcERhdGEgPSBudWxsO1xyXG52YXIgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBDYW5jZWxsZWRJRCA9IFtdO1xyXG52YXIgU3RhcnRHYW1lQ2FzaCA9IDEwMDAwMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxudmFyIEhNQW1vdW50ID0gMDtcclxudmFyIEJNQW1vdW50ID0gMDtcclxudmFyIEJNTG9jYXRpb25zID0gMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbnZhciBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG52YXIgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbnZhciBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxudmFyIFByZXZpb3VzQ2FzaCA9IDA7XHJcbnZhciBUaW1lb3V0UmVmO1xyXG52YXIgQ29tcGxldGlvbldpbmRvd1RpbWUgPSA4MDAwO1xyXG52YXIgTG9uZ01lc3NhZ2VUaW1lID0gNTAwMDtcclxudmFyIFNob3J0TWVzc2FnZVRpbWUgPSAyNTAwO1xyXG5cclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG4vLyB2YXIgU2hvcnRNZXNzYWdlVGltZSA9IDUwOy8vMjUwMFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgYW1vdW50IG9mIGxvYW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIExvYW5BbW91bnRFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBUZW5UaG91c2FuZDogMTAwMDAsXHJcbiAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gIEZvcnR5VGhvdXNhbmQ6IDQwMDAwLFxyXG4gIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gIE90aGVyOiA2LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBjYXNoXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgYnVzaW5lc3MgdHlwZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhck5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIixcclxuICAgIH0sXHJcbiAgICBUaW1lck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHRpbWVyIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5TZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IExvYW5BbW91bnRFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgYWxsIGxhYmVscyBvZiBhbW91bnRzIGluIGxvYW4gVUlcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUdXJuRGVjaXNpb25TZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIG1hcmtldGluZyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG5cclxuICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmcgPSBuYW1lO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdG9ja0ludmVzdDogMSxcclxuICBHb2xkSW52ZXN0OiAyLFxyXG4gIFN0b2NrU2VsbDogMyxcclxuICBHb2xkU2VsbDogNCxcclxuICBPdGhlcjogNSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0U2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJJbnZlc3RTZWxsVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2UgUmVzdWx0IG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVmFsdWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVZhbHVlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSB2YWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXlPclNlbGxUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXlPclNlbGwgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBWYWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV0dG9uTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGJ1dHRvbiBuYW1lIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTdGF0ZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbnZlc3RTdGF0ZVwiLFxyXG4gICAgICB0eXBlOiBJbnZlc3RFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBJbnZlc3RFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBbW91bnRFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxsQnVzaW5lc3NVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsbEJ1c2luZXNzVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxsQnVzaW5lc3NVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZWxsUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2VsbFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc1NlbGxQcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGF5RGF5VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWROdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxvY2F0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRCdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBNYWluUGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5UaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0U2NyZWVuVGl0bGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEJ1c2luZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTG9hbkJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkZvdHRlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1eU9yU2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBPbmVRdWVzdGlvblVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBPbmVRdWVzdGlvblVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiT25lUXVlc3Rpb25VSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgcXVlc3Rpb24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFJlc3VsdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSZXN1bHRVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlJlc3VsdFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUmVzdWx0U2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXR1c0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0YXR1c0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJvZHlMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCb2R5TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgR2FtZXBsYXlVSU1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGFJbnRhbmNlO1xyXG52YXIgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZTtcclxudmFyIFJlcXVpcmVkQ2FzaDtcclxudmFyIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbi8vdHVybiBkZWNpc2lvbnNcclxudmFyIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG52YXIgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbi8vYnV5b3JzZWxsXHJcbnZhciBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbnZhciBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG52YXIgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG52YXIgRGljZVJlc3VsdDtcclxudmFyIE9uY2VPclNoYXJlO1xyXG52YXIgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbnZhciBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIExvYW5QYXllZCA9IGZhbHNlO1xyXG52YXIgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG52YXIgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lcGxheVVJTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBCdXNpbmVzc1NldHVwRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBCdXNpbmVzc1NldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybkRlY2lzaW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBUdXJuRGVjaXNpb25TZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBJbnZlc3RTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQYXlEYXlVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxsQnVzaW5lc3NVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxsQnVzaW5lc3NVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEludmVzdFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQnV5T3JTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnV5T3JTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IE9uZVF1ZXN0aW9uVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgT25lUXVlc3Rpb25VSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJzaGlwU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUGFydG5lcnNoaXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBQYXJ0bmVyc2hpcFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUmVzdWx0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUmVzdWx0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlCdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TcGFjZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsXHJcbiAgICB9LFxyXG4gICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKClcclxuICB7XHJcbiAgICAgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICAgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG4gICAgIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxuICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxuICAgICBQYXJ0bmVyU2hpcERhdGEgPSBudWxsO1xyXG4gICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICAgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IGZhbHNlO1xyXG4gICAgIEhNQW1vdW50ID0gMDtcclxuICAgICBCTUFtb3VudCA9IDA7XHJcbiAgICAgQk1Mb2NhdGlvbnMgPSAwO1xyXG4gICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbiAgICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxuICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgUHJldmlvdXNDYXNoID0gMDtcclxuICAgICBUaW1lb3V0UmVmPW51bGw7XHJcblxyXG4gICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbiAgICAgLy90dXJuIGRlY2lzaW9uc1xyXG4gICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgIFRlbXBIaXJpbmdMYXd5ZXI7XHJcbiAgICAgXHJcbiAgICAgLy9idXlvcnNlbGxcclxuICAgICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgIERpY2VSZXN1bHQ9MDtcclxuICAgICAgT25jZU9yU2hhcmU7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG4gICAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAvL2xvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gMDtcclxuICB9LFxyXG5cclxuICBSZXNldFR1cm5WYXJpYWJsZSgpIHtcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlciA9PSBudWxsKVxyXG4gICAgICBHYW1lTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKF9zdGF0ZSlcclxuICB7XHJcbiAgICB0aGlzLkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlKClcclxuICB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKGZhbHNlKTtcclxuICB9LFxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gIEluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgIH0sIDUwMCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1c2luZXNzU2V0dXAgd2l0aCBsb2FuXHJcbiAgLy9CdXNpbmVzcyBzZXR1cCB1aS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoXHJcbiAgICBpc0ZpcnN0VGltZSxcclxuICAgIGluc2lkZUdhbWUgPSBmYWxzZSxcclxuICAgIG1vZGVJbmRleCA9IDAsXHJcbiAgICBfaXNCYW5rcnVwdGVkID0gZmFsc2UsXHJcbiAgICBfQmFua3J1cHRBbW91bnQgPSAwLFxyXG4gICAgX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSxcclxuICAgIF9HaXZlbkNhc2ggPSAwLFxyXG4gICAgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaD1mYWxzZVxyXG4gICkge1xyXG4gICAgLy9jYWxsZWQgZmlyc3QgdGltZSBmb3JtIEdhbWVNYW5hZ2VyIG9ubG9hZCBmdW5jdGlvblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gX2lzQ2FyZEZ1bmN0aW9uYWxpdHk7XHJcbiAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g7XHJcbiAgICBcclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gX2lzQmFua3J1cHRlZDtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IF9CYW5rcnVwdEFtb3VudDtcclxuXHJcbiAgICBpZiAoX2lzQmFua3J1cHRlZCkgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG5cclxuICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lLCBtb2RlSW5kZXgsIF9pc0JhbmtydXB0ZWQpO1xyXG4gIH0sXHJcbiAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoXHJcbiAgICBpc0ZpcnN0VGltZSxcclxuICAgIGluc2lkZUdhbWUgPSBmYWxzZSxcclxuICAgIG1vZGVJbmRleCA9IDAsXHJcbiAgICBfaXNCYW5rcnVwdGVkID0gZmFsc2UsXHJcbiAgKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXJkRnVuY3Rpb25hbGl0eSA9IG5ldyBHYW1lTWFuYWdlci5DYXJkRGF0YUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuXHJcbiAgICBpZiAoaXNGaXJzdFRpbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFN0YXJ0R2FtZUNhc2g7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5SZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgaWYgKGluc2lkZUdhbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDtpbmRleCA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IGluZGV4O1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgaWYgKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgICAgICBpZiAoU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gMDtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIFByZXZpb3VzQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IEdpdmVuQ2FzaEJ1c2luZXNzO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWUpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEdldE9ial9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5CdXNpbmVzc1NldHVwRGF0YTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAobmFtZSk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllclVJRCA9IFVJRDtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc05hbWVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBcIlwiO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmU7XHJcbiAgfSxcclxuICBPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICB9LFxyXG4gIE9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcjtcclxuICB9LFxyXG4gIE9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBcIiRcIiArIGFtb3VudDtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBhbW91bnQ7XHJcbiAgfSxcclxuICBDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbHJlYWR5IHRha2VuIGxvYW4gb2YgJFwiICtQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQsTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBkbyBub3QgbmVlZCBsb2FuLCB5b3UgaGF2ZSBlbm91Z2ggY2FzaCB0byBidXkgY3VycmVudCBzZWxlY3RlZCBidXNpbmVzcy5cIixMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIFJlcXVpcmVkQ2FzaCA9IE1hdGguYWJzKHBhcnNlSW50KFBsYXllckRhdGFJbnRhbmNlLkNhc2gpIC0gYW1vdW50KTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgY2MuTGFiZWxcclxuICAgICAgICAgICkuc3RyaW5nID0gXCIkXCIgKyBSZXF1aXJlZENhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoNTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBidXNpbmVzcyBiZXR3ZWVuIEhvbWUgQmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfWVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuICBIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaW5kZXggPT0gaSlcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLk90aGVyO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMCk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGVuVGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgxKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW50eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMik7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGhpcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgzKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5Gb3J0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNCk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uRmlmdHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDUpO1xyXG4gIH0sXHJcbiAgT25UYWtlbkxvYW5DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9PSBMb2FuQW1vdW50RW51bS5PdGhlcilcclxuICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gUmVxdWlyZWRDYXNoO1xyXG4gICAgZWxzZVxyXG4gICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBwYXJzZUludChcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRcclxuICAgICAgKTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IHRydWU7XHJcbiAgICB0aGlzLk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPVxyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICsgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICB9LFxyXG5cclxuICBTeW5jRGF0YTogZnVuY3Rpb24gKF9kYXRhLCBfSUQpIHtcclxuICAgIGlmIChfSUQgIT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuYWN0b3JOcilcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goX2RhdGEpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGggPj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMpIHtcclxuICAgICAgLy9zZXR0aW5nIHJvb20gcHJvcGVydHkgdG8gZGVjbGFyZSBpbml0aWFsIHNldHVwIGhhcyBiZWVuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKClcclxuICAgICAgICAuZ2V0UGhvdG9uUmVmKClcclxuICAgICAgICAubXlSb29tKClcclxuICAgICAgICAuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKClcclxuICAgICAgICAuZ2V0UGhvdG9uUmVmKClcclxuICAgICAgICAubXlSb29tKClcclxuICAgICAgICAuc2V0Q3VzdG9tUHJvcGVydHkoXHJcbiAgICAgICAgICBcIlBsYXllckdhbWVJbmZvXCIsXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8sXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQdXJjaGFzZUJ1c2luZXNzOiBmdW5jdGlvbiAoX2Ftb3VudCwgX2J1c2luZXNzTmFtZSwgX2lzSG9tZUJhc2VkKSB7XHJcbiAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA8IF9hbW91bnQgJiYgIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vdCBlbm91Z2ggY2FzaCB0byBidXkgdGhpcyBcIiArIF9idXNpbmVzc05hbWUgKyBcIiBidXNpbmVzcy5cIixMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9pc0hvbWVCYXNlZCkge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPCAzKSB7XHJcblxyXG4gICAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBfYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50Kys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBIb21lIGJhc2VkIGJ1c2luZXNzZXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lID0gdHJ1ZTtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ccmlja0FuZE1vcnRhckFtb3VudCsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZighQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KVxyXG4gICAge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuKSB7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID1cclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIlJldmVydGluZyBiYWNrIGxvYW4gYW1vdW50LlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlXHJcbiAgICB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Jc0JhbmtydXB0ID0gdHJ1ZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQmFua3J1cHRBbW91bnQgPSB0aGlzLkJhbmtydXB0ZWRBbW91bnQ7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAvL3NldHRpbmcgcGxheWVyIGN1cnJlbnQgZGF0YSBpbiBjdXN0b20gcHJvcGVydGllcyB3aGVuIGhpcy9oZXIgdHVybiBvdmVyc1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2RhdGEgPSB7RGF0YToge2JhbmtydXB0ZWQ6IHRydWUsdHVybjogR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKSxQbGF5ZXJEYXRhTWFpbjogUGxheWVyRGF0YUludGFuY2UsfSx9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoOSwgX2RhdGEpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBBSVxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuICAgICAgICB9LCAxNjAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIm5vIG1vZGUgc2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF0gPSBQbGF5ZXJEYXRhSW50YW5jZTsgIFxyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQYXlBbW91bnRUb1BsYXlHYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlN0YXJ0R2FtZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID09IFwiXCIpXHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgdHlwZS5cIik7XHJcbiAgICBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9PSBcIlwiKVxyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIG5hbWUuXCIpO1xyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lIHx8IFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPT11bmRlZmluZWQpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBzZWxlY3QgYSBidXNpbmVzc1wiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZClcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGhvbWViYXNzZWRcclxuICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoMTAwMDAsIFwiaG9tZVwiLCB0cnVlKTtcclxuICAgICAgZWxzZSBpZiAoXHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcyg1MDAwMCwgXCJicmljayBhbmQgbW9ydGFyXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlN0YXJ0R2FtZSA9PSB0cnVlIHx8IHRoaXMuSXNCYW5rcnVwdGVkID09IHRydWUpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgaWYgKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwICE9IC0xKSB7XHJcbiAgICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcnRpbnRpbmcgYWxsIHZhbHVlcyB0byBjb25zb2xlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtpKyspIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG5hbWU6IFwiICtHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBJRDogXCIgK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJJcyBwbGF5ZXIgYm90OiBcIiArR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLklzQm90KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gb2YgYnVzaW5lc3Mgb2YgcGxheWVyIChzZWUgYmVsb3cpOiBcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNhc2g6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkNhc2gpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgdGFrZW4gbG9hbjogXCIgK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuVGFrZW4pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ0YWtlbiBsb2FuIGFtb3VudDogXCIgK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuQW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gVHVybkRlY2lzaW9uU2V0dXBVSVxyXG4gIC8vVHVybkRlY2lzaW9uU2V0dXBVSS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoaXNhY3RpdmUpIHtcclxuICAgIHRoaXMuRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gaXNhY3RpdmU7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5DYXNoQW1vdW50TGFiZWwuc3RyaW5nID1cclxuICAgICAgXCIkIFwiICtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKClcclxuICAgICAgXS5DYXNoO1xyXG4gIH0sXHJcblxyXG4gIE9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChUZW1wTWFya2V0aW5nQW1vdW50ID09IFwiXCIgfHwgVGVtcE1hcmtldGluZ0Ftb3VudCA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdGhpcy5tYXJrZXRpbmdBbW91bnQgPSBwYXJzZUludChUZW1wTWFya2V0aW5nQW1vdW50KTtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5DYXNoXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvL2lmIHBsYXllciBlbnRlcmVkIGFtb3VudCBpcyBncmVhdGVyIHRoYW4gdG90YWwgY2FzaCBoZSBvd25zXHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPj0gdGhpcy5tYXJrZXRpbmdBbW91bnRcclxuICAgICAgKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5DYXNoID1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkNhc2ggLSB0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLk1hcmtldGluZ0Ftb3VudCA9XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5NYXJrZXRpbmdBbW91bnQgKyB0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IHN1Y2Nlc3NmdWxseSBtYXJrZXRlZCBhbW91bnQgb2YgJFwiICtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLk1hcmtldGluZ0Ftb3VudCArXHJcbiAgICAgICAgICAgIFwiICwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggK1xyXG4gICAgICAgICAgICBcIi5cIixMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIik7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBpZiBwbGF5ZXIgaGFzIG1vcmUgdGhhbiA1MDAwJFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgXS5MYXd5ZXJTdGF0dXNcclxuICAgICkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA+PSA1MDAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uTGF3eWVyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBUZW1wSGlyaW5nTGF3eWVyID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhUZW1wSGlyaW5nTGF3eWVyKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCAtIDUwMDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcInlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llciwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggK1xyXG4gICAgICAgICAgICBcIi5cIixMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInNvcnJ5LCB5b3UgZG9udCBoYXZlIGVub3VnaCBtb25leSB0byBoaXJlIGEgbGF3eWVyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oX25hbWUpIHtcclxuICAgIExvY2F0aW9uTmFtZSA9IF9uYW1lO1xyXG4gIH0sXHJcbiAgT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGV2ZW50PW51bGwsX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSxfR2l2ZW5DYXNoID0gMCxfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoPWZhbHNlKSB7XHJcbiAgICAvL2lmIHBsYXllciBoYXMgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBoZSBjb3VsZCBleHBhbmQgaXRcclxuICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzXCIpO1xyXG4gICAgXHJcbiAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBfaXNDYXJkRnVuY3Rpb25hbGl0eTtcclxuICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gX0dpdmVuQ2FzaDtcclxuICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g7XHJcblxyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdmFyIGdlbmVyYXRlZExlbmd0aCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSxHaXZlbkNhc2hCdXNpbmVzcyxTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG5cclxuICAgIGlmIChnZW5lcmF0ZWRMZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgdG8gZXhwYW5kLlwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfSwgMTYwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KVxyXG4gICAge1xyXG4gICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJzdGFydGluZyBuZXcgYnVzaW5lc3NcIik7XHJcbiAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLkdvbGRJbnZlc3RlZCkge1xyXG4gICAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0O1xyXG4gICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgXCJJbnZlc3QgSW4gR09MRFwiLFxyXG4gICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLFxyXG4gICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIixcclxuICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblN0b2NrQnVzaW5lc3NOYW1lQ2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGV2ZW50PW51bGwsX2lzVHVybk92ZXI9ZmFsc2UpIHtcclxuICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gX2lzVHVybk92ZXI7XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihfaXNUdXJuT3Zlcik7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KVxyXG4gICAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiRnJpZW5kJ3MgQnVzaW5lc3NcIjtcclxuICAgICAgXHJcbiAgICBpZiAoIXRoaXMuU3RvY2tJbnZlc3RlZCB8fCBUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFN0b2NrQnVzaW5lc3NOYW1lID09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuXHJcbiAgICAgICAgaWYoIVR1cm5PdmVyRm9ySW52ZXN0KVxyXG4gICAgICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIkludmVzdCBpbiBTdG9ja1wiLFxyXG4gICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgIFwiRWFjaCBTaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIvc2hhcmVcIixcclxuICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgICBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJCVVlcIixcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZFNvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkdvbGRDb3VudCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgXCJTZWxsIEdPTERcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIixcclxuICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgR09MRCBvdW5jZXMsIHBsZWFzZSBidXkgdGhlbS5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5TdG9ja1NvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLlN0b2NrQ291bnQgPiAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuU3RvY2tTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLlN0b2NrU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgXCJTZWxsIFNUT0NLXCIsXHJcbiAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgXCJFYWNoIHNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLFxyXG4gICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBTRUxMXCIsXHJcbiAgICAgICAgICBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIiowPTBcIixcclxuICAgICAgICAgIFwiU0VMTFwiLFxyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBzaGFyZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImdvIGludG8gcGFydG5lciBzaGlwXCIpO1xyXG4gICAgLy8gdGhpcy5TaG93VG9hc3QoXCJ3b3JrIGluIHByb2dyZXNzLCBjb21pbmcgc29vbi4uLlwiKTtcclxuICAgIC8vIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gIH0sXHJcblxyXG4gIE9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJyb2xsIHRoZSBkaWNlXCIpO1xyXG4gICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxEaWNlKCk7XHJcbiAgfSxcclxuXHJcbiAgUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIC8vdGhpcy5UZW1wRGljZVRleHQuc3RyaW5nPXZhbHVlO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXJ0bmVyc2hpcCBzZXR1cFxyXG4gIFRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuTWFpblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuV2FpdGluZ1N0YXR1c1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgQ2FuY2VsbGVkSUQgPSBbXTtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBsYXllck5hbWUuc3RyaW5nID1fdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBsYXllckNhc2guc3RyaW5nID1cIiRcIitfdGVtcERhdGEuQ2FzaDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QYXJ0bmVyU2hpcFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICB2YXIgX3RvdGFsTG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgICB2YXIgX2FsbExvY2F0aW9uc0Ftb3VudCA9IF90b3RhbExvY2F0aW9ucyAqIDI1MDAwO1xyXG4gICAgICAgIHZhciBfZmluYWxBbW91bnQgPSA1MDAwMCArIF9hbGxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5QYXJ0bmVyTmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbih0cnVlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKFwibm9uZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cChfbXNnKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lLnN0cmluZyA9X3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllckNhc2guc3RyaW5nID1cIiRcIitfdGVtcERhdGEuQ2FzaDtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uRGVzY3JpcHRpb24uc3RyaW5nID0gX21zZztcclxuICB9LFxyXG5cclxuICBFeGl0X1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcbiAgXHJcbiAgUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpXHJcbiAge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cChfZGF0YSlcclxuICB7XHJcbiAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gX2RhdGE7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSlcclxuICAgICAgX2J1c2luZXNzTW9kZSA9IFwiSG9tZSBCYXNlZFwiO1xyXG4gICAgZWxzZSBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKVxyXG4gICAgICBfYnVzaW5lc3NNb2RlID0gXCJCcmljayAmIE1vcnRhclwiO1xyXG4gICAgICBcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgdmFyIF9tc2cgPSBcInlvdSBoYXZlIHJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiICwgZm9sbG93aW5nIGFyZSB0aGUgZGV0YWlscyBvZiBidXNpbmVzczogXCIgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBOYW1lOiBcIiArIF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc05hbWUgKyBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE1vZGU6IFwiICsgX2J1c2luZXNzTW9kZSArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgVmFsdWU6ICRcIiArIF9idXNpbmVzc1ZhbHVlICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJDYXNoIFBheW1lbnQ6ICRcIiArIF9wYXlBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJpZiBvZmZlciBpcyBhY2NlcHRlZCB5b3Ugd2lsbCByZWNlaXZlIDUwJSBzaGFyZSBvZiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MgYW5kIHdpbGwgcmVjZWl2ZSBwcm9maXQvbG9zZSBvbiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MuXCI7XHJcbiAgICBcclxuICAgICAgdGhpcy5FbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZyk7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIEFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKVxyXG4gIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfYWxsQWN0b3JzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2RhdGEgPSBQYXJ0bmVyU2hpcERhdGE7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICBcclxuICAgIGlmIChQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCA+PSBfcGF5QW1vdW50KSB7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCAtPSBfcGF5QW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKHRydWUsIF9wYXlBbW91bnQsIGZhbHNlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiY29uZ3JhdHVsYXRpb25zISB5b3UgaGF2ZSBzdGFydGVkIGJ1c2luZXNzIHBhcnRuZXJzaGlwXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiTm90IGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiT2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgb3RoZXIgcGxheWVyLlwiKTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgfVxyXG4gIH0sXHJcblxyXG4gIENhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKVxyXG4gIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChmYWxzZSwgMCwgdHJ1ZSwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlELCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIpO1xyXG4gICAgfSBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2lzQWNjZXB0ZWQ9ZmFsc2UsX3BheW1lbnQ9MCxfaXNDYW5jZWxsZWQ9ZmFsc2UsX3VJRD1cIlwiLF9kYXRhPW51bGwsX2J1c2luZXNzSW5kZXg9MClcclxuICB7XHJcbiAgICB2YXIgX21haW5EYXRhID0geyBEYXRhOiB7IEFjY2VwdGVkOiBfaXNBY2NlcHRlZCwgQ2FzaFBheW1lbnQ6X3BheW1lbnQsQ2FuY2VsbGVkOl9pc0NhbmNlbGxlZCxQbGF5ZXJJRDpfdUlELFBsYXllckRhdGE6X2RhdGEsQnVzaW5lc3NJbmRleDpfYnVzaW5lc3NJbmRleH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTIsIF9tYWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfZGF0YSlcclxuICB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB2YXIgX2FjY2VwdGVkID0gX2RhdGEuRGF0YS5BY2NlcHRlZDtcclxuICAgICAgdmFyIF9jYXNoID0gX2RhdGEuRGF0YS5DYXNoUGF5bWVudDtcclxuICAgICAgdmFyIF9jYW5jZWxsZWQgPSBfZGF0YS5EYXRhLkNhbmNlbGxlZDtcclxuICAgICAgdmFyIF91aWQgPSBfZGF0YS5EYXRhLlBsYXllcklEO1xyXG4gICAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuQnVzaW5lc3NJbmRleDtcclxuICAgIFxyXG4gICAgICBjb25zb2xlLmxvZyhcImFuc3dlciByZWNlaXZlZFwiKTtcclxuICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Nhc2g7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCA9IHRydWU7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3VpZDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIGFjY2VwdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiLCBjYXNoICRcIiArIF9jYXNoICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBhY2NvdW50LlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmluY2x1ZGVzKF91aWQpID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgIENhbmNlbGxlZElELnB1c2goX3VpZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhDYW5jZWxsZWRJRCk7XHJcbiAgICAgICAgICBpZiAoQ2FuY2VsbGVkSUQubGVuZ3RoID09IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGNhbmNlbGxlZCBieSBhbGwgb3RoZXIgdXNlcnMuXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgcmVqZWN0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfYWNjZXB0ZWQpIHtcclxuICAgICAgICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IGFuZCBzZWxsIG1vZGR1bGVcclxuXHJcbiAgUmVzZXRHb2xkSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuR29sZEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuU3RvY2tFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgb25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwoX2Ftb3VudCkge1xyXG4gICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gX2Ftb3VudDtcclxuXHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICBPbmNlT3JTaGFyZSArIFwiKlwiICsgRW50ZXJCdXlTZWxsQW1vdW50ICsgXCI9XCIgKyBfYW1vdW50XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgIHRoaXMuUmVzZXRHb2xkSW5wdXQoKTtcclxuICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgX3RpdGxlLFxyXG4gICAgX2RpY2VSZXN1bHQsXHJcbiAgICBfcHJpY2VUaXRsZSxcclxuICAgIF9wcmljZVZhbHVlLFxyXG4gICAgX2J1eU9yU2VsbFRpdGxlLFxyXG4gICAgX3RvdGFsQW1vdW50VGl0bGUsXHJcbiAgICBfdG90YWxBbW91bnRWYWx1ZSxcclxuICAgIF9idXR0b25OYW1lLFxyXG4gICAgX3N0YXRlXHJcbiAgKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2VSZXN1bHQ7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVGl0bGVMYWJlbC5zdHJpbmcgPSBfcHJpY2VUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZyA9IF9wcmljZVZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXlPclNlbGxUaXRsZUxhYmVsLnN0cmluZyA9IF9idXlPclNlbGxUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRUaXRsZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1dHRvbk5hbWVMYWJlbC5zdHJpbmcgPSBfYnV0dG9uTmFtZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVEYXRhX0ludmVzdFNlbGwoX3RvdGFsQW1vdW50VmFsdWUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIEFwcGx5QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEFtb3VudCA8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT1fVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4IF0uR29sZENvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEXCIsXHJcbiAgICAgICAgICAgIExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICBpZiAoX2Ftb3VudCA8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggICs9IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCAtPSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgK1xyXG4gICAgICAgICAgICAgIF9hbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiICtcclxuICAgICAgICAgICAgICBfVG90YWxBbW91bnQsXHJcbiAgICAgICAgICAgICAgTG9uZ01lc3NhZ2VUaW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggR09MRCBvdW5jZXMsIHlvdSBvd24gXCIgK1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKVxyXG4gICAgICAgICAgICAgICAgLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ICtcclxuICAgICAgICAgICAgICBcIiBvZiBHT0xEIG91bmNlc1wiLExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEFtb3VudCA8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgLy9jYW4gYWRkIG11bHRpcGxlIHN0b2NrcyB3aXRoIGJ1c2luZXNzIG5hbWUgaW4gb2JqZWN0IGlmIHJlcXVpcmVkXHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgc2hhcmVzIG9mIGJ1c2luZXNzIFwiICtcclxuICAgICAgICAgICAgICBTdG9ja0J1c2luZXNzTmFtZSxcclxuICAgICAgICAgICAgICBMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG5cclxuICAgICAgICBpZiAoX2Ftb3VudCA8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQpIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgLT0gX2Ftb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgc2hhcmVzIG9mIHN0b2NrIGZvciAgJFwiICtcclxuICAgICAgICAgICAgICBfVG90YWxBbW91bnQsXHJcbiAgICAgICAgICAgICAgTG9uZ01lc3NhZ2VUaW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggc3RvY2tzIHNoYXJlcywgeW91IG93biBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICtcclxuICAgICAgICAgICAgICBcIiBvZiBzdG9jayBzaGFyZXNcIixMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdClcclxuICAgIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTsgXHJcbiAgICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gZmFsc2U7IFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXlkYXkgb3IgRG91YmxlIHBheSBEYXlcclxuICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKSB7XHJcbiAgICBpZiAoSE1BbW91bnQgPT0gMCkge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoXHJcbiAgICAgICAgY2MuQnV0dG9uXHJcbiAgICAgICkuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgIGNjLkJ1dHRvblxyXG4gICAgICApLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEJNQW1vdW50ID09IDApIHtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbG9hblRha2VuKSB7XHJcbiAgICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2V0TG9hbkFtb3VudF9QYXlEYXkoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB2YXIgX2xvYW4gPSAwO1xyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICAgIGluZGV4KytcclxuICAgICkge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuID1cclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xvYW47XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLF9pc0RvdWJsZVBheURheSA9IGZhbHNlLF9za2lwSE0gPSBmYWxzZSxfc2tpcEJNID0gZmFsc2UsX2lzQm90ID0gZmFsc2UsX2ZvclNlbGVjdGVkQnVzaW5lc3M9ZmFsc2UsX1NlbGVjdGVkQnVzaW5lc3NJbmRleD0wLF9oTUFtb3VudD0wLF9ibUFtb3VudD0wLF9ibUxvY2F0aW9uPTApIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgRG91YmxlUGF5RGF5ID0gX2lzRG91YmxlUGF5RGF5O1xyXG4gICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdmFyIF90aW1lID0gMTgwMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBfZm9yU2VsZWN0ZWRCdXNpbmVzcztcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9TZWxlY3RlZEJ1c2luZXNzSW5kZXg7XHJcbiAgICBITUFtb3VudD1faE1BbW91bnQ7XHJcbiAgICBCTUFtb3VudD1fYm1BbW91bnQ7XHJcbiAgICBCTUxvY2F0aW9ucyA9IF9ibUxvY2F0aW9uO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBpZiAoX2lzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKVxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKVxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwQk0pXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIFxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDtpbmRleCA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtpbmRleCsrKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBsb2FuVGFrZW4gPSBfbG9hblRha2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZyA9IEJNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmcgPSBCTUxvY2F0aW9ucztcclxuXHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIGxvYW4gd2FzIHNraXBwZWQgcHJldmlvdXNseVxyXG4gICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSB7XHJcbiAgICAgIHZhciBfbG9hbiA9IHRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJFwiICsgX2xvYW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkZvdHRlckxhYmVsLnN0cmluZyA9IFwiKnBheSAkNTAwMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgMCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgQk1BbW91bnQsIGxvYW5UYWtlbik7XHJcblxyXG4gICAgaWYgKF9za2lwQk0gfHwgX3NraXBITSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCBfdGltZSArIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgdGhpcy5PbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgdGhpcy5PbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTsgIFxyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIGlmICghSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBpZiAoIV9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEhNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG5cclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG4gICAgICBpZiAoX2RvdWJsZVBheURheSlcclxuICAgICAgICBfbXVsdGlwbGllciA9IDI7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9tdWx0aXBsaWVyICogX2RpY2UgKiAxMDAwO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IChfcGF5bWVudCAvIDIpO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfbXVsdGlwbGllciAqIF9kaWNlICogMTAwMDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gKF9wYXltZW50IC8gMik7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYW1vdW50VG9CZUFkanVzdGVkPjApXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gSE1BbW91bnQgKiBfZGljZSAqIDEwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gMiAqIChITUFtb3VudCAqIF9kaWNlKSAqIDEwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuXHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCktXCIrX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIisgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKjIpLVwiK19hbW91bnRUb0JlQWRqdXN0ZWQrXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICB9IGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIF9kb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfYW1vdW50ID0gQk1BbW91bnQgKyBCTUxvY2F0aW9ucztcclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG5cclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICAgIGlmIChfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIF9tdWx0aXBsaWVyID0gMjtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGFbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDA7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gKF9wYXltZW50IC8gMik7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfbG9jYXRpb25zID0gX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDA7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IChfcGF5bWVudCAvIDIpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZD4wKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gX2Ftb3VudCAqIF9kaWNlICogMjAwMC1fYW1vdW50VG9CZUFkanVzdGVkO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgVG90YWxQYXlEYXlBbW91bnQgPSAyICogKF9hbW91bnQgKiBfZGljZSkgKiAyMDAwLV9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IF9hbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKS1cIiArX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIisgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19kaWNlICsgXCIqXCIgKyBfYW1vdW50ICsgXCIqXCIgKyBcIjIwMDAqMiktXCIrX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KS8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBfRXN0aW1hdGVMb2FuID0gNTAwMDtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9Fc3RpbWF0ZUxvYW4pIHtcclxuICAgICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDtpbmRleCA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IC0gX0VzdGltYXRlTG9hbjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlUGF5bWVudF9QYXlEYXkoKSB7XHJcbiAgICAvL2FsbFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bIF9wbGF5ZXJJbmRleF0uQ2FzaCArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgXCJBbW91bnQgJFwiICtcclxuICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ICtcclxuICAgICAgICAgIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgK1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaFxyXG4gICAgICApO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgMTU1MCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBcIkFtb3VudCAkXCIgK1xyXG4gICAgICAgICAgVG90YWxQYXlEYXlBbW91bnQgK1xyXG4gICAgICAgICAgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIiArXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTa2lwTG9hbk9uZVRpbWVfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgIFwiWW91IGhhdmUgc2tpcHBlZCB0aGUgbG9hbiBwYXltZW50LCBiYW5rIHdpbGwgY2FsbCB1cG9uIGNvbXBsZXRlIGxvYW4gYW1vdW50IG9uIG5leHQgcGF5ZGF5XCJcclxuICAgICk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1BheURheShfYW1vdW50KSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBFeGl0TG9hblNjcmVlbl9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBTdGFydE5ld0dhbWVfUGF5RGF5KCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICBcIllvdSB3aWxsIGxvc2UgYWxsIHByb2dyZXNzIGFuZCBzdGFydCBuZXcgZ2FtZSBmcm9tIHRoZSBzdGFydC5cIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU2hvd0NhcmRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQmFua3J1cHRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB9LCAzMDEwKTtcclxuICB9LFxyXG5cclxuICBQYXlEYXlDb21wbGV0ZWQoKSB7XHJcbiAgICBpZiAoSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCAmJiBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgJiYgTG9hblBheWVkKSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFsbCBwYXlkYXkgZG9uZVwiKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxsICYgbWFuaXB1bGF0ZSBCdXNpbmVzcyBVSVxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTExcIjtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPVwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICtfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzU2VsbFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICBlbHNlIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKHRydWUpO1xyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc0JvdD1mYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIGlmICghX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVTSU5FU1NcIjtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF9pc0JvdClcclxuICAgICAge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2VsZWN0QnVzaW5lc3Nmb3JQYXlEYXkoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAvLyBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIC8vIGVsc2VcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIFJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZU1hbmlwaWxhdGlvblNjcmVlbl9fQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc1R1cm5vdmVyID0gZmFsc2UsX2lzQm90PWZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIV9pc0JvdClcclxuICAgICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgIFxyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNCb3QpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEludmVzdCBVSVxyXG4gIFRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gIH0sXHJcbiAgU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcikge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJJTlZFU1RcIjtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID1cclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1eU9SU2VsbCBVSVxyXG4gIFRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXlPclNlbGxTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gIH0sXHJcbiAgU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcikge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJCVVkgT1IgU0VMTFwiO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gT25lIFF1ZXN0aW9uIHNldHVwIFVpXHJcbiAgVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU3BhY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuV2FpdGluZ1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoXHJcbiAgICBfbXlEYXRhLFxyXG4gICAgX2FjdG9yc0RhdGEsXHJcbiAgICBfaXNUdXJuT3ZlcixcclxuICAgIF9tb2RlSW5kZXggPSAwXHJcbiAgKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nID1cclxuICAgICAgXCJObyBvZiBQbGF5ZXJzOiBcIiArXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgaWYgKF9tb2RlSW5kZXggPT0gMikge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIF9teURhdGEuUGxheWVyVUlEICE9XHJcbiAgICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRFxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgICAgLnNldFBsYXllck5hbWUoXHJcbiAgICAgICAgICAgICAgICBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgICAgLnNldFBsYXllclVJRChcclxuICAgICAgICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGVJbmRleCA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgIC5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIilcclxuICAgICAgICAgICAgLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBvbmVRdWVzdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBvbmVRdWVzdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfcXVlc3Rpb24pIHtcclxuICAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpXHJcbiAgICAgIC5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvbkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUXVlc3Rpb25MYWJlbC5zdHJpbmcgPVxyXG4gICAgICBcIlBsYXllciBoYXMgYXNrZWQgaWYgXCIgK1xyXG4gICAgICBfcXVlc3Rpb24gK1xyXG4gICAgICBcIlxcblwiICtcclxuICAgICAgXCJcXG5cIiArXHJcbiAgICAgIFwiKmVpdGhlciBhbnN3ZXIgcXVlc3Rpb24gb3IgcGF5ICQ1MDAwIHRvIHBsYXllciB3aG9zZSBhc2tpbmcgcXVlc3Rpb24uXCI7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgU2hvd1RvYXN0OiBmdW5jdGlvbiAobWVzc2FnZSwgdGltZSA9IFNob3J0TWVzc2FnZVRpbWUsX2hhc2J1dHRvbj10cnVlKSB7XHJcbiAgICB0aGlzLlBvcFVwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUG9wVXBVSUxhYmVsLnN0cmluZyA9IG1lc3NhZ2U7XHJcbiAgICB2YXIgU2VsZlRvYXN0ID0gdGhpcztcclxuICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIFxyXG4gICAgaWYgKG1vZGUgPT0gMSkgLy9mb3IgYm90IG1vZGUgb25seVxyXG4gICAge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aD4wICYmIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXS5Jc0JvdClcclxuICAgICAge1xyXG4gICAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICB7XHJcbiAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUb2FzdCgpO1xyXG4gICAgICAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENvbXBsZXRlVG9hc3QoKVxyXG4gIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0b2FzdCBjYWxsZWRcIik7XHJcbiAgICB0aGlzLlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgfSxcclxuXHJcbiAgU2hvd1Jlc3VsdFNjcmVlbjogZnVuY3Rpb24gKF9zdGF0dXMsX2RhdGEpIHtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5SZXN1bHRTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBfc3RhdHVzO1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLkJvZHlMYWJlbC5zdHJpbmcgPSBfZGF0YTtcclxuICB9LFxyXG5cclxuICBSZXN0YXJ0VGhlR2FtZSgpXHJcbiAge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gIH0sXHJcbn0pO1xyXG4iXX0=