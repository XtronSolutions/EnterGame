
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
var StartGameCash = 20000;
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
    PassedPayDayCountLabel: {
      displayName: "PassedPayDayCountLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of PassedPayDayCountLabel node"
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
    this.PayDayCount = 0;
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
  AssignData_PayDay: function AssignData_PayDay(_title, _isDoublePayDay, _skipHM, _skipBM, _isBot, _forSelectedBusiness, _SelectedBusinessIndex, _hMAmount, _bmAmount, _bmLocation, PaydayCounter) {
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

    if (PaydayCounter === void 0) {
      PaydayCounter = 1;
    }

    this.IsBotTurn = _isBot;
    this.PayDayCount = PaydayCounter;
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
    this.PayDaySetupUI.PassedPayDayCountLabel.string = this.PayDayCount;

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
      var _multiplier = 1;
      var _paydaymultiplier = this.PayDayCount; //partnership code

      if (_doublePayDay) _multiplier = 2;

      if (!SelectedBusinessPayDay) {
        for (var index = 0; index < _tempData.length; index++) {
          if (_tempData[index].BusinessType == 1) {
            if (_tempData[index].IsPartnership) {
              var _payment = _paydaymultiplier * _multiplier * _dice * 1000;

              _amountToBeSend = _payment / 2;

              _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[index].PartnerID);

              _amountToBeAdjusted += _amountToBeSend;
            }
          }
        }
      } else {
        if (_tempData[SelectedBusinessIndex].BusinessType == 1) {
          if (_tempData[SelectedBusinessIndex].IsPartnership) {
            var _payment = _paydaymultiplier * _multiplier * _dice * 1000;

            _amountToBeSend = _payment / 2;

            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[SelectedBusinessIndex].PartnerID);

            _amountToBeAdjusted += _amountToBeSend;
          }
        }
      }

      if (_amountToBeAdjusted > 0) {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", LongMessageTime);
      } //partnership code


      if (!_doublePayDay) TotalPayDayAmount = _paydaymultiplier * HMAmount * _dice * 1000 - _amountToBeAdjusted;else TotalPayDayAmount = _paydaymultiplier * 2 * (HMAmount * _dice) * 1000 - _amountToBeAdjusted;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;
      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + HMAmount + "*" + "1000)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + HMAmount + "*" + "1000*2)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;

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
      var _paydaymultiplier = this.PayDayCount;

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

              var _payment = _paydaymultiplier * _locations * _multiplier * _dice * 2000;

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

            var _payment = _paydaymultiplier * _locations * _multiplier * _dice * 2000;

            _amountToBeSend = _payment / 2;

            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[SelectedBusinessIndex].PartnerID);

            _amountToBeAdjusted += _amountToBeSend;
          }
        }
      }

      if (_amountToBeAdjusted > 0) {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", LongMessageTime);
      }

      if (!_doublePayDay) TotalPayDayAmount = _paydaymultiplier * _amount * _dice * 2000 - _amountToBeAdjusted;else TotalPayDayAmount = _paydaymultiplier * 2 * (_amount * _dice) * 2000 - _amountToBeAdjusted;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;
      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + _amount + "*" + "2000)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + _amount + "*" + "2000*2)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;

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
      }, 500);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIlBhc3NlZFBheURheUNvdW50TGFiZWwiLCJIb21lQmFzZWRCdG4iLCJCTUJ0biIsIkxvYW5CdG4iLCJNYWluUGFuZWxOb2RlIiwiUmVzdWx0UGFuZWxOb2RlIiwiTG9hblJlc3VsdFBhbmVsTm9kZSIsIlJlc3VsdFNjcmVlblRpdGxlTGFiZWwiLCJUb3RhbEJ1c2luZXNzTGFiZWwiLCJUb3RhbEFtb3VudExhYmVsIiwiU2tpcExvYW5CdXR0b24iLCJMb2FuRm90dGVyTGFiZWwiLCJJbnZlc3RVSSIsIkJ1eU9yU2VsbFVJIiwiT25lUXVlc3Rpb25VSSIsIlBsYXllckRldGFpbExhYmVsIiwiRGV0YWlsc1ByZWZhYiIsIlNjcm9sbENvbnRlbnQiLCJXYWl0aW5nU2NyZWVuIiwiRGVjaXNpb25UaXRsZUxhYmVsIiwiRGVjaXNpb25DYXNoTGFiZWwiLCJEZWNpc2lvblBsYXllck5hbWVMYWJlbCIsIkRlY2lzaW9uUXVlc3Rpb25MYWJlbCIsIlBhcnRuZXJzaGlwVUkiLCJXYWl0aW5nU3RhdHVzU2NyZWVuIiwiTWFpblNjcmVlbiIsIlRpdGxlTmFtZSIsIlBsYXllck5hbWUiLCJQbGF5ZXJDYXNoIiwiUGFydG5lclNoaXBQcmVmYWIiLCJEZWNpc2lvblNjcmVlbiIsIkRlY2lzaW9uUGxheWVyTmFtZSIsIkRlY2lzaW9uUGxheWVyQ2FzaCIsIkRlY2lzaW9uRGVzY3JpcHRpb24iLCJSZXN1bHRVSSIsIlJlc3VsdFNjcmVlbiIsIlN0YXR1c0xhYmVsIiwiQm9keUxhYmVsIiwiUGxheWVyRGF0YUludGFuY2UiLCJQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlIiwiUmVxdWlyZWRDYXNoIiwiSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAiLCJUZW1wTWFya2V0aW5nQW1vdW50IiwiVGVtcEhpcmluZ0xhd3llciIsIkdvbGRDYXNoQW1vdW50IiwiRW50ZXJCdXlTZWxsQW1vdW50IiwiU3RvY2tCdXNpbmVzc05hbWUiLCJEaWNlUmVzdWx0IiwiT25jZU9yU2hhcmUiLCJMb2NhdGlvbk5hbWUiLCJIb21lQmFzZWRQYXltZW50Q29tcGxldGVkIiwiQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkIiwiTG9hblBheWVkIiwiVG90YWxQYXlEYXlBbW91bnQiLCJEb3VibGVQYXlEYXkiLCJHYW1lcGxheVVJTWFuYWdlciIsIkNvbXBvbmVudCIsIkJ1c2luZXNzU2V0dXBEYXRhIiwiSW52ZXN0U2VsbFNldHVwVUkiLCJQYXlEYXlTZXR1cFVJIiwiU2VsbEJ1c2luZXNzU2V0dXBVSSIsIkludmVzdFNldHVwVUkiLCJCdXlPclNlbGxTZXR1cFVJIiwiT25lUXVlc3Rpb25TZXR1cFVJIiwiUGFydG5lcnNoaXBTZXR1cFVJIiwiUmVzdWx0U2V0dXBVSSIsIlBvcFVwVUkiLCJQb3BVcFVJTGFiZWwiLCJQb3BVcFVJQnV0dG9uIiwiR2FtZXBsYXlVSVNjcmVlbiIsIkludmVzdFNlbGxTY3JlZW4iLCJQYXlEYXlTY3JlZW4iLCJTZWxsQnVzaW5lc3NTY3JlZW4iLCJJbnZlc3RTY3JlZW4iLCJCdXlPclNlbGxTY3JlZW4iLCJPbmVRdWVzdGlvblNwYWNlU2NyZWVuIiwiT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbiIsIkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJSZXNldEFsbERhdGEiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJJc0JvdFR1cm4iLCJQYXlEYXlDb3VudCIsIklzQmFua3J1cHRlZCIsIkJhbmtydXB0ZWRBbW91bnQiLCJSZXNldFR1cm5WYXJpYWJsZSIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiX3N0YXRlIiwiYWN0aXZlIiwiRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSIsIkluc3RhbmNlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiRGlzY29ubmVjdFBob3RvbiIsInNldFRpbWVvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJpc0ZpcnN0VGltZSIsImluc2lkZUdhbWUiLCJtb2RlSW5kZXgiLCJfaXNCYW5rcnVwdGVkIiwiX0JhbmtydXB0QW1vdW50IiwiX2lzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfR2l2ZW5DYXNoIiwiX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIkluaXRfQnVzaW5lc3NTZXR1cCIsIlBsYXllckRhdGEiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIkJ1c2luZXNzSW5mbyIsIkJ1c2luZXNzVHlwZSIsIkVudW1CdXNpbmVzc1R5cGUiLCJDYXNoIiwiUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCIsImluZGV4IiwiUGxheWVyR2FtZUluZm8iLCJsZW5ndGgiLCJTdHVkZW50RGF0YSIsInVzZXJJRCIsIlBsYXllclVJRCIsIk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiSG9tZUJhc2VkIiwiT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJicmlja0FuZG1vcnRhciIsImFtb3VudCIsIkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCIsIl9sb2FuVGFrZW4iLCJfYnVzaW5lc3NJbmRleCIsIk5vT2ZCdXNpbmVzcyIsIkxvYW5UYWtlbiIsIlNob3dUb2FzdCIsIk1hdGgiLCJhYnMiLCJwYXJzZUludCIsImdldENvbXBvbmVudCIsIk9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsImV2ZW50IiwiT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCIsImkiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXAiLCJPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIl9kYXRhIiwiX0lEIiwiUGhvdG9uQWN0b3IiLCJhY3Rvck5yIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJNYXhQbGF5ZXJzIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJTdGFydFR1cm4iLCJQdXJjaGFzZUJ1c2luZXNzIiwiX2Ftb3VudCIsIl9idXNpbmVzc05hbWUiLCJfaXNIb21lQmFzZWQiLCJIb21lQmFzZWRBbW91bnQiLCJTdGFydEdhbWUiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIkV4aXRfQnVzaW5lc3NTZXR1cCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCIsIl9tb2RlIiwiR2V0U2VsZWN0ZWRNb2RlIiwiSXNCYW5rcnVwdCIsIkJhbmtydXB0QW1vdW50IiwiR2V0VHVybk51bWJlciIsIlJhaXNlRXZlbnQiLCJEYXRhIiwiYmFua3J1cHRlZCIsInR1cm4iLCJQbGF5ZXJEYXRhTWFpbiIsIlN0YXJ0VHVybkFmdGVyQmFua3J1cHQiLCJlcnJvciIsIlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUGF5QW1vdW50VG9QbGF5R2FtZSIsInVuZGVmaW5lZCIsIklzQm90IiwiaXNhY3RpdmUiLCJVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbiIsIk9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbiIsIl9wbGF5ZXJJbmRleCIsIm1hcmtldGluZ0Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIk9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJMYXd5ZXJTdGF0dXMiLCJvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiZ2VuZXJhdGVkTGVuZ3RoIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGREaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwiLCJSb2xsVHdvRGljZXMiLCJBc3NpZ25EYXRhX0ludmVzdFNlbGwiLCJPblN0b2NrQnVzaW5lc3NOYW1lQ2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiX2lzVHVybk92ZXIiLCJSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQiLCJSb2xsT25lRGljZSIsIk9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdvbGRDb3VudCIsIk9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJTdG9ja0NvdW50IiwiT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCIsIk9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJvbGxEaWNlIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwidmFsdWUiLCJUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJSZXNldF9QYXJ0bmVyU2hpcFNldHVwIiwiX21hbmFnZXIiLCJfdGVtcERhdGEiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXROYW1lIiwiU2V0VHlwZSIsIlNldEJ1c2luZXNzSW5kZXgiLCJfdG90YWxMb2NhdGlvbnMiLCJMb2NhdGlvbnNOYW1lIiwiU2V0QnVzaW5lc3NNb2RlIiwiU2V0TW9kZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJfYWxsTG9jYXRpb25zQW1vdW50IiwiX2ZpbmFsQW1vdW50IiwiU2V0QmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIklzUGFydG5lcnNoaXAiLCJUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbiIsIlNldFBhcnRuZXJOYW1lIiwiUGFydG5lck5hbWUiLCJFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAiLCJfbXNnIiwiY3VzdG9tUHJvcGVydGllcyIsIlBsYXllclNlc3Npb25EYXRhIiwiRXhpdF9QYXJ0bmVyU2hpcFNldHVwIiwiZGVzdHJveSIsIlJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwIiwiX2FjdG9yIiwiX3R1cm4iLCJUdXJuIiwiX3BsYXllckRhdGEiLCJfU2VsZWN0ZWRCdXNpbmVzc0luZGV4IiwiU2VsZWN0ZWRCdXNpbnNlc3NJbmRleCIsIl9idXNpbmVzc1ZhbHVlIiwiQnVzVmFsdWUiLCJfcGF5QW1vdW50IiwiX2J1c2luZXNzTW9kZSIsIkNoZWNrU3BlY3RhdGUiLCJBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2FsbEFjdG9ycyIsIlJvb21BY3RvcnMiLCJteUluZGV4IiwiR2V0TXlJbmRleCIsIlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwIiwiQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9pc0FjY2VwdGVkIiwiX3BheW1lbnQiLCJfaXNDYW5jZWxsZWQiLCJfdUlEIiwiX21haW5EYXRhIiwiQWNjZXB0ZWQiLCJDYXNoUGF5bWVudCIsIkNhbmNlbGxlZCIsIlBsYXllcklEIiwiQnVzaW5lc3NJbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWNjZXB0ZWQiLCJfY2FzaCIsIl9jYW5jZWxsZWQiLCJfdWlkIiwiUGFydG5lcklEIiwiaW5jbHVkZXMiLCJSZXNldEdvbGRJbnB1dCIsIm9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsIiwiVXBkYXRlRGF0YV9JbnZlc3RTZWxsIiwiX3RpdGxlIiwiX2RpY2VSZXN1bHQiLCJfcHJpY2VUaXRsZSIsIl9wcmljZVZhbHVlIiwiX2J1eU9yU2VsbFRpdGxlIiwiX3RvdGFsQW1vdW50VGl0bGUiLCJfdG90YWxBbW91bnRWYWx1ZSIsIl9idXR0b25OYW1lIiwiQXBwbHlCdXR0b25fSW52ZXN0U2VsbCIsIl9Ub3RhbEFtb3VudCIsIkV4aXRCdXR0b25fSW52ZXN0U2VsbCIsIlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkiLCJUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkiLCJVcGRhdGVCdXR0b25zX1BheURheSIsImxvYW5UYWtlbiIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsIkdldExvYW5BbW91bnRfUGF5RGF5IiwiX2xvYW4iLCJBc3NpZ25EYXRhX1BheURheSIsIl9pc0RvdWJsZVBheURheSIsIl9za2lwSE0iLCJfc2tpcEJNIiwiX2lzQm90IiwiX2ZvclNlbGVjdGVkQnVzaW5lc3MiLCJfaE1BbW91bnQiLCJfYm1BbW91bnQiLCJfYm1Mb2NhdGlvbiIsIlBheWRheUNvdW50ZXIiLCJfdGltZSIsIlVwZGF0ZUNhc2hfUGF5RGF5IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQYXlEYXlDb21wbGV0ZWQiLCJPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfZG91YmxlUGF5RGF5IiwiX2RpY2UiLCJfYW1vdW50VG9CZVNlbmQiLCJfYW1vdW50VG9CZUFkanVzdGVkIiwiX211bHRpcGxpZXIiLCJfcGF5ZGF5bXVsdGlwbGllciIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfbG9jYXRpb25zIiwiX0VzdGltYXRlTG9hbiIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlN0YXJ0TmV3R2FtZV9QYXlEYXkiLCJlbWl0IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlRvZ2dsZVBheURheSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiY2FsbFVwb25DYXJkIiwiVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwIiwiQW1vdW50IiwiVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uIiwiU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJTZWxlY3RCdXNpbmVzc2ZvclBheURheSIsIl9pc1R1cm5vdmVyIiwiRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJIiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSIsIlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfbXlEYXRhIiwiX2FjdG9yc0RhdGEiLCJfbW9kZUluZGV4IiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9xdWVzdGlvbiIsIm1lc3NhZ2UiLCJ0aW1lIiwiX2hhc2J1dHRvbiIsIlNlbGZUb2FzdCIsIm1vZGUiLCJjbGVhclRpbWVvdXQiLCJDb21wbGV0ZVRvYXN0IiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9zdGF0dXMiLCJSZXN0YXJ0VGhlR2FtZSIsIlJlc3RhcnRHYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtBQUNBLElBQUlDLDhCQUE4QixHQUFHLEVBQXJDO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLElBQXRCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsS0FBL0I7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxh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bUJpQyxNQUFuQixHQUE0QixLQUE1QjtBQUNBVSxVQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNyQjRULFlBQUFBLFNBQVMsQ0FBQ3pXLE9BQVYsQ0FBa0JtQyxNQUFsQixHQUEyQixLQUEzQjtBQUNELFdBRlMsRUFFUG9VLElBRk8sQ0FBVjtBQUdEO0FBQ0Y7QUFDRixHQXR3RThCO0FBd3dFL0JLLEVBQUFBLGFBeHdFK0IsMkJBeXdFL0I7QUFDRXJQLElBQUFBLE9BQU8sQ0FBQzRCLEtBQVIsQ0FBYyx1QkFBZDtBQUNBLFNBQUtuSixPQUFMLENBQWFtQyxNQUFiLEdBQXNCLEtBQXRCO0FBQ0F3VSxJQUFBQSxZQUFZLENBQUNoZ0IsVUFBRCxDQUFaO0FBQ0QsR0E3d0U4QjtBQSt3RS9Ca2dCLEVBQUFBLGdCQUFnQixFQUFFLDBCQUFVQyxPQUFWLEVBQWtCNVAsS0FBbEIsRUFBeUI7QUFDekMsU0FBS25ILGFBQUwsQ0FBbUI5QixZQUFuQixDQUFnQ2tFLE1BQWhDLEdBQXlDLElBQXpDO0FBQ0EsU0FBS3BDLGFBQUwsQ0FBbUI3QixXQUFuQixDQUErQjNFLE1BQS9CLEdBQXdDdWQsT0FBeEM7QUFDQSxTQUFLL1csYUFBTCxDQUFtQjVCLFNBQW5CLENBQTZCNUUsTUFBN0IsR0FBc0MyTixLQUF0QztBQUNELEdBbnhFOEI7QUFxeEUvQjZQLEVBQUFBLGNBcnhFK0IsNEJBc3hFL0I7QUFDRXRoQixJQUFBQSx3QkFBd0IsQ0FBQ2dOLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOERzVSxXQUE5RDtBQUNEO0FBeHhFOEIsQ0FBVCxDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbnZhciBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbnZhciBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxudmFyIFBhcnRuZXJTaGlwRGF0YSA9IG51bGw7XHJcbnZhciBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxudmFyIENhbmNlbGxlZElEID0gW107XHJcbnZhciBTdGFydEdhbWVDYXNoID0gMjAwMDA7XHJcbnZhciBTZWxlY3RlZEJ1c2luZXNzUGF5RGF5ID0gZmFsc2U7XHJcbnZhciBITUFtb3VudCA9IDA7XHJcbnZhciBCTUFtb3VudCA9IDA7XHJcbnZhciBCTUxvY2F0aW9ucyA9IDA7XHJcbnZhciBTZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwO1xyXG52YXIgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxudmFyIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG52YXIgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG52YXIgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbnZhciBQcmV2aW91c0Nhc2ggPSAwO1xyXG52YXIgVGltZW91dFJlZjtcclxudmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gODAwMDtcclxudmFyIExvbmdNZXNzYWdlVGltZSA9IDUwMDA7XHJcbnZhciBTaG9ydE1lc3NhZ2VUaW1lID0gMjUwMDtcclxuXHJcbi8vIHZhciBDb21wbGV0aW9uV2luZG93VGltZSA9IDUwMDsvLzgwMDBcclxuLy8gdmFyIExvbmdNZXNzYWdlVGltZSA9IDI1MDsvLzUwMDBcclxuLy8gdmFyIFNob3J0TWVzc2FnZVRpbWUgPSA1MDsvLzI1MDBcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGFtb3VudCBvZiBsb2FuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBMb2FuQW1vdW50RW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgVGVuVGhvdXNhbmQ6IDEwMDAwLFxyXG4gIFRlbnR5VGhvdXNhbmQ6IDIwMDAwLFxyXG4gIFRoaXJ0eVRob3VzYW5kOiAzMDAwMCxcclxuICBGb3J0eVRob3VzYW5kOiA0MDAwMCxcclxuICBGaWZ0eVRob3VzYW5kOiA1MDAwMCxcclxuICBPdGhlcjogNixcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NTZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgbmFtZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2hVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgY2FzaFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZVRleHRVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgdG9vbHRpcDogXCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgdHlwZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZVRleHRVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgdG9vbHRpcDogXCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgbmFtZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHR5cGUgZWRpdGJveFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVjZSBmb3IgYnVzaW5lc3MgbmFtZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTm9kZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZE5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBob21lIGJhc2VkIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJOb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tBbmRNb3J0YXJOb2RlVUlcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbGFiZWwgZm9yIHRpbWVyXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB0aW1lciBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NTZXR1cE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBMb2FuU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5TZXR1cE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgbG9hbiBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBMb2FuQW1vdW50RW51bSxcclxuICAgICAgZGVmYXVsdDogTG9hbkFtb3VudEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxvYW4gYW1vdW50IHRha2VuIGJ5IHBsYXllciAoc3RhdGUgbWFjaGluZSlcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGFsbCBsYWJlbHMgb2YgYW1vdW50cyBpbiBsb2FuIFVJXCIsXHJcbiAgICB9LFxyXG4gICAgV2FpdGluZ1N0YXR1c05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c05vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3Igd2FpdGluZyBzdGF0dXMgc2NyZWVuIG9uIGluaXRpYWwgYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleGl0IGJ1dHRvbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yLy9cclxuICB9LFxyXG5cclxuICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmcgPSBuYW1lO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBUdXJuRGVjaXNpb25TZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVHVybkRlY2lzaW9uU2V0dXBVSVwiLFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYXJrZXRpbmdFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0VkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBtYXJrZXRpbmcgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEdvbGRFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdvbGRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IGdvbGQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFN0b2NrRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0VkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3Qgc3RvY2sgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hBbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIGNhc2ggbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc05vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgZXhwbmFkIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlJlZmVyZW5jZSBmb3IgY29udGVudCBub2RlIG9mIHNjcm9sbCB2aWV3IG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBwcmVmYWIgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBpbnZlc3RtZW50L2J1eSBhbmQgc2VsbC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0RW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgU3RvY2tJbnZlc3Q6IDEsXHJcbiAgR29sZEludmVzdDogMixcclxuICBTdG9ja1NlbGw6IDMsXHJcbiAgR29sZFNlbGw6IDQsXHJcbiAgT3RoZXI6IDUsXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0U2VsbFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0U2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlIFJlc3VsdCBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgdmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV5T3JTZWxsVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnV5T3JTZWxsIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgVmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1dHRvbk5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXR0b25OYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBidXR0b24gbmFtZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U3RhdGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW52ZXN0U3RhdGVcIixcclxuICAgICAgdHlwZTogSW52ZXN0RW51bSxcclxuICAgICAgZGVmYXVsdDogSW52ZXN0RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQW1vdW50RWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsbEJ1c2luZXNzVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2VsbFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBheURheVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXlEYXlVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBheURheVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgUGF5RGF5IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZE51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZE51bWJlclwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhck51bWJlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1OdW1iZXJMb2NhdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTG9jYXRpb25zXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckxvY2F0aW9ucyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGFzc2VkUGF5RGF5Q291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXNzZWRQYXlEYXlDb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQYXNzZWRQYXlEYXlDb3VudExhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRCdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBNYWluUGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5UaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0U2NyZWVuVGl0bGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEJ1c2luZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTG9hbkJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkZvdHRlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1eU9yU2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBPbmVRdWVzdGlvblVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBPbmVRdWVzdGlvblVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiT25lUXVlc3Rpb25VSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgcXVlc3Rpb24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFJlc3VsdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSZXN1bHRVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlJlc3VsdFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUmVzdWx0U2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXR1c0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0YXR1c0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJvZHlMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCb2R5TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgR2FtZXBsYXlVSU1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGFJbnRhbmNlO1xyXG52YXIgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZTtcclxudmFyIFJlcXVpcmVkQ2FzaDtcclxudmFyIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbi8vdHVybiBkZWNpc2lvbnNcclxudmFyIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG52YXIgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbi8vYnV5b3JzZWxsXHJcbnZhciBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbnZhciBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG52YXIgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG52YXIgRGljZVJlc3VsdDtcclxudmFyIE9uY2VPclNoYXJlO1xyXG52YXIgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbnZhciBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIExvYW5QYXllZCA9IGZhbHNlO1xyXG52YXIgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG52YXIgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lcGxheVVJTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBCdXNpbmVzc1NldHVwRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBCdXNpbmVzc1NldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybkRlY2lzaW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBUdXJuRGVjaXNpb25TZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBJbnZlc3RTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQYXlEYXlVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxsQnVzaW5lc3NVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxsQnVzaW5lc3NVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEludmVzdFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQnV5T3JTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnV5T3JTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IE9uZVF1ZXN0aW9uVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgT25lUXVlc3Rpb25VSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJzaGlwU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUGFydG5lcnNoaXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBQYXJ0bmVyc2hpcFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUmVzdWx0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUmVzdWx0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlCdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TcGFjZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsXHJcbiAgICB9LFxyXG4gICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKClcclxuICB7XHJcbiAgICAgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICAgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG4gICAgIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxuICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxuICAgICBQYXJ0bmVyU2hpcERhdGEgPSBudWxsO1xyXG4gICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICAgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IGZhbHNlO1xyXG4gICAgIEhNQW1vdW50ID0gMDtcclxuICAgICBCTUFtb3VudCA9IDA7XHJcbiAgICAgQk1Mb2NhdGlvbnMgPSAwO1xyXG4gICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbiAgICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxuICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgUHJldmlvdXNDYXNoID0gMDtcclxuICAgICBUaW1lb3V0UmVmPW51bGw7XHJcblxyXG4gICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbiAgICAgLy90dXJuIGRlY2lzaW9uc1xyXG4gICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgIFRlbXBIaXJpbmdMYXd5ZXI7XHJcbiAgICAgXHJcbiAgICAgLy9idXlvcnNlbGxcclxuICAgICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgIERpY2VSZXN1bHQ9MDtcclxuICAgICAgT25jZU9yU2hhcmU7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG4gICAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAvL2xvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gMDtcclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSAwO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0VHVyblZhcmlhYmxlKCkge1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbClcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAoIUdhbWVNYW5hZ2VyIHx8IEdhbWVNYW5hZ2VyID09IG51bGwpXHJcbiAgICAgIEdhbWVNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiU3luY0RhdGFcIiwgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoX3N0YXRlKVxyXG4gIHtcclxuICAgIHRoaXMuSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UoKVxyXG4gIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoZmFsc2UpO1xyXG4gIH0sXHJcbiAgLy8jcmVnaW9uIFNwZWN0YXRlIFVJIFNldHVwXHJcbiAgSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5MZWF2ZVJvb21CdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIE9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChcclxuICAgICAgdHJ1ZVxyXG4gICAgKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSwgNTAwKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnVzaW5lc3NTZXR1cCB3aXRoIGxvYW5cclxuICAvL0J1c2luZXNzIHNldHVwIHVpLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChcclxuICAgIGlzRmlyc3RUaW1lLFxyXG4gICAgaW5zaWRlR2FtZSA9IGZhbHNlLFxyXG4gICAgbW9kZUluZGV4ID0gMCxcclxuICAgIF9pc0JhbmtydXB0ZWQgPSBmYWxzZSxcclxuICAgIF9CYW5rcnVwdEFtb3VudCA9IDAsXHJcbiAgICBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLFxyXG4gICAgX0dpdmVuQ2FzaCA9IDAsXHJcbiAgICBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoPWZhbHNlXHJcbiAgKSB7XHJcbiAgICAvL2NhbGxlZCBmaXJzdCB0aW1lIGZvcm0gR2FtZU1hbmFnZXIgb25sb2FkIGZ1bmN0aW9uXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBfaXNDYXJkRnVuY3Rpb25hbGl0eTtcclxuICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IF9HaXZlbkNhc2g7XHJcbiAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuICAgIFxyXG4gICAgdGhpcy5Jc0JhbmtydXB0ZWQgPSBfaXNCYW5rcnVwdGVkO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gX0JhbmtydXB0QW1vdW50O1xyXG5cclxuICAgIGlmIChfaXNCYW5rcnVwdGVkKSB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5Jbml0X0J1c2luZXNzU2V0dXAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUsIG1vZGVJbmRleCwgX2lzQmFua3J1cHRlZCk7XHJcbiAgfSxcclxuICBJbml0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChcclxuICAgIGlzRmlyc3RUaW1lLFxyXG4gICAgaW5zaWRlR2FtZSA9IGZhbHNlLFxyXG4gICAgbW9kZUluZGV4ID0gMCxcclxuICAgIF9pc0JhbmtydXB0ZWQgPSBmYWxzZSxcclxuICApIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhcmRGdW5jdGlvbmFsaXR5ID0gbmV3IEdhbWVNYW5hZ2VyLkNhcmREYXRhRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lO1xyXG5cclxuICAgIGlmIChpc0ZpcnN0VGltZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gU3RhcnRHYW1lQ2FzaDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAoKTtcclxuXHJcbiAgICBpZiAoaW5zaWRlR2FtZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwO2luZGV4IDxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO2luZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gaW5kZXg7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICBpZiAoQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICAgIGlmIChTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgICAgICBQcmV2aW91c0Nhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSAwO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gR2l2ZW5DYXNoQnVzaW5lc3M7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZSk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgR2V0T2JqX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChuYW1lKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IFwiXCI7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuICB9LFxyXG4gIE9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gIH0sXHJcbiAgT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgYW1vdW50O1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IGFtb3VudDtcclxuICB9LFxyXG4gIENhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgdGFrZW4gbG9hbiBvZiAkXCIgK1BsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCxMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiLExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgUmVxdWlyZWRDYXNoID0gTWF0aC5hYnMocGFyc2VJbnQoUGxheWVyRGF0YUludGFuY2UuQ2FzaCkgLSBhbW91bnQpO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgICBjYy5MYWJlbFxyXG4gICAgICAgICAgKS5zdHJpbmcgPSBcIiRcIiArIFJlcXVpcmVkQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXBcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCg1MDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGJ1c2luZXNzIGJldHdlZW4gSG9tZSBCYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXBcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG4gIEhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpbmRleCA9PSBpKVxyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgfSxcclxuICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID09IExvYW5BbW91bnRFbnVtLk90aGVyKVxyXG4gICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBSZXF1aXJlZENhc2g7XHJcbiAgICBlbHNlXHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IHBhcnNlSW50KFxyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudFxyXG4gICAgICApO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gdHJ1ZTtcclxuICAgIHRoaXMuT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggKyBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNEYXRhOiBmdW5jdGlvbiAoX2RhdGEsIF9JRCkge1xyXG4gICAgaWYgKF9JRCAhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5hY3Rvck5yKVxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChfZGF0YSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycykge1xyXG4gICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5nZXRQaG90b25SZWYoKVxyXG4gICAgICAgIC5teVJvb20oKVxyXG4gICAgICAgIC5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCB0cnVlLCB0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5nZXRQaG90b25SZWYoKVxyXG4gICAgICAgIC5teVJvb20oKVxyXG4gICAgICAgIC5zZXRDdXN0b21Qcm9wZXJ0eShcclxuICAgICAgICAgIFwiUGxheWVyR2FtZUluZm9cIixcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFB1cmNoYXNlQnVzaW5lc3M6IGZ1bmN0aW9uIChfYW1vdW50LCBfYnVzaW5lc3NOYW1lLCBfaXNIb21lQmFzZWQpIHtcclxuICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIDwgX2Ftb3VudCAmJiAhU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiICsgX2J1c2luZXNzTmFtZSArIFwiIGJ1c2luZXNzLlwiLExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2lzSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA8IDMpIHtcclxuXHJcbiAgICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPVxyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUmV2ZXJ0aW5nIGJhY2sgbG9hbiBhbW91bnQuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2VcclxuICAgIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5CYW5rcnVwdEFtb3VudCA9IHRoaXMuQmFua3J1cHRlZEFtb3VudDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vc2V0dGluZyBwbGF5ZXIgY3VycmVudCBkYXRhIGluIGN1c3RvbSBwcm9wZXJ0aWVzIHdoZW4gaGlzL2hlciB0dXJuIG92ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfZGF0YSA9IHtEYXRhOiB7YmFua3J1cHRlZDogdHJ1ZSx0dXJuOiBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpLFBsYXllckRhdGFNYWluOiBQbGF5ZXJEYXRhSW50YW5jZSx9LH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg5LCBfZGF0YSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIEFJXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICAgIH0sIDE2MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwibm8gbW9kZSBzZWxlY3RlZFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlOyAgXHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFBheUFtb3VudFRvUGxheUdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPT0gXCJcIilcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyB0eXBlLlwiKTtcclxuICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID09IFwiXCIpXHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmUgfHwgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PXVuZGVmaW5lZClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBhIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgaG9tZWJhc3NlZFxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCwgXCJob21lXCIsIHRydWUpO1xyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBicmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDUwMDAwLCBcImJyaWNrIGFuZCBtb3J0YXJcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuU3RhcnRHYW1lID09IHRydWUgfHwgdGhpcy5Jc0JhbmtydXB0ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgICBpZiAoSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgIT0gLTEpIHtcclxuICAgICAgICAgIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBub3QgYmVlbiBjYWxsZWQgZnJvbSBpbnNpZGUgZ2FtZVxyXG4gICAgICAgICAgdGhpcy5TdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgYmVlbiBjYWxsZWQgYXQgc3RhcnQgb2YgZ2FtZSBhcyBpbml0aWFsIHNldHVwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BydGludGluZyBhbGwgdmFsdWVzIHRvIGNvbnNvbGVcclxuICAgICAgICBmb3IgKHZhciBpID0gMDtpIDxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO2krKykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbmFtZTogXCIgK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIElEOiBcIiArR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIklzIHBsYXllciBib3Q6IFwiICtHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uSXNCb3QpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJubyBvZiBidXNpbmVzcyBvZiBwbGF5ZXIgKHNlZSBiZWxvdyk6IFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY2FzaDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uQ2FzaCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciB0YWtlbiBsb2FuOiBcIiArR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5UYWtlbik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2VuIGxvYW4gYW1vdW50OiBcIiArR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBpc2FjdGl2ZTtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkNhc2hBbW91bnRMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBcIiQgXCIgK1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKVxyXG4gICAgICBdLkNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gXCJcIiB8fCBUZW1wTWFya2V0aW5nQW1vdW50ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB0aGlzLm1hcmtldGluZ0Ftb3VudCA9IHBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2hcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA+PSB0aGlzLm1hcmtldGluZ0Ftb3VudFxyXG4gICAgICApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCAtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uTWFya2V0aW5nQW1vdW50ID1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLk1hcmtldGluZ0Ftb3VudCArIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uTWFya2V0aW5nQW1vdW50ICtcclxuICAgICAgICAgICAgXCIgLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uQ2FzaCArXHJcbiAgICAgICAgICAgIFwiLlwiLExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGlmIHBsYXllciBoYXMgbW9yZSB0aGFuIDUwMDAkXHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIGlmIChcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICBdLkxhd3llclN0YXR1c1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgYWxyZWFkeSBoaXJlZCBhIGxhd3llci5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5DYXNoID49IDUwMDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5MYXd5ZXJTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIFRlbXBIaXJpbmdMYXd5ZXIgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFRlbXBIaXJpbmdMYXd5ZXIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA9XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoIC0gNTAwMDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uQ2FzaCArXHJcbiAgICAgICAgICAgIFwiLlwiLExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSkge1xyXG4gICAgTG9jYXRpb25OYW1lID0gX25hbWU7XHJcbiAgfSxcclxuICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQ9bnVsbCxfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLF9HaXZlbkNhc2ggPSAwLF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g9ZmFsc2UpIHtcclxuICAgIC8vaWYgcGxheWVyIGhhcyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGhlIGNvdWxkIGV4cGFuZCBpdFxyXG4gICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3NcIik7XHJcbiAgICBcclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuXHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB2YXIgZ2VuZXJhdGVkTGVuZ3RoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5LEdpdmVuQ2FzaEJ1c2luZXNzLFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcblxyXG4gICAgaWYgKGdlbmVyYXRlZExlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm8gYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyB0byBleHBhbmQuXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9LCAxNjAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgIHRoaXMuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZEludmVzdGVkKSB7XHJcbiAgICAgIHRoaXMuR29sZEludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRJbnZlc3Q7XHJcbiAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICBcIkludmVzdCBJbiBHT0xEXCIsXHJcbiAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsXHJcbiAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgXCJCVVlcIixcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICBPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQ9bnVsbCxfaXNUdXJuT3Zlcj1mYWxzZSkge1xyXG4gICAgVHVybk92ZXJGb3JJbnZlc3QgPSBfaXNUdXJuT3ZlcjtcclxuXHJcbiAgICBjb25zb2xlLmVycm9yKF9pc1R1cm5PdmVyKTtcclxuXHJcbiAgICBpZiAoVHVybk92ZXJGb3JJbnZlc3QpXHJcbiAgICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJGcmllbmQncyBCdXNpbmVzc1wiO1xyXG4gICAgICBcclxuICAgIGlmICghdGhpcy5TdG9ja0ludmVzdGVkIHx8IFR1cm5PdmVyRm9ySW52ZXN0KSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoU3RvY2tCdXNpbmVzc05hbWUgPT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYSBidXNpbmVzcyBuYW1lIHRvIGludmVzdC5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0O1xyXG5cclxuICAgICAgICBpZighVHVybk92ZXJGb3JJbnZlc3QpXHJcbiAgICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuICAgICAgICBcclxuICAgICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgIFwiSW52ZXN0IGluIFN0b2NrXCIsXHJcbiAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLFxyXG4gICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBCVVlcIixcclxuICAgICAgICAgIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgICBcIkJVWVwiLFxyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uR29sZENvdW50ID4gMFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLkdvbGRTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIlNlbGwgR09MRFwiLFxyXG4gICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLFxyXG4gICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLFxyXG4gICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uU3RvY2tDb3VudCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIlNlbGwgU1RPQ0tcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggc2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsXHJcbiAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IHNoYXJlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZ28gaW50byBwYXJ0bmVyIHNoaXBcIik7XHJcbiAgICAvLyB0aGlzLlNob3dUb2FzdChcIndvcmsgaW4gcHJvZ3Jlc3MsIGNvbWluZyBzb29uLi4uXCIpO1xyXG4gICAgLy8gdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdGhpcy5FbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgfSxcclxuXHJcbiAgT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInJvbGwgdGhlIGRpY2VcIik7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbihmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbERpY2UoKTtcclxuICB9LFxyXG5cclxuICBQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgLy90aGlzLlRlbXBEaWNlVGV4dC5zdHJpbmc9dmFsdWU7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBhcnRuZXJzaGlwIHNldHVwXHJcbiAgVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5NYWluU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5XYWl0aW5nU3RhdHVzU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICBDYW5jZWxsZWRJRCA9IFtdO1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyTmFtZS5zdHJpbmcgPV90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyQ2FzaC5zdHJpbmcgPVwiJFwiK190ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBhcnRuZXJTaGlwUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIHZhciBfdG90YWxMb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgIHZhciBfYWxsTG9jYXRpb25zQW1vdW50ID0gX3RvdGFsTG9jYXRpb25zICogMjUwMDA7XHJcbiAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlBhcnRuZXJOYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoXCJub25lXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWUuc3RyaW5nID1fdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyQ2FzaC5zdHJpbmcgPVwiJFwiK190ZW1wRGF0YS5DYXNoO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25EZXNjcmlwdGlvbi5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuICBcclxuICBSZXNldF9QYXJ0bmVyU2hpcFNldHVwKClcclxuICB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKVxyXG4gIHtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IHRydWU7XHJcbiAgICBQYXJ0bmVyU2hpcERhdGEgPSBfZGF0YTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKVxyXG4gICAgICBfYnVzaW5lc3NNb2RlID0gXCJIb21lIEJhc2VkXCI7XHJcbiAgICBlbHNlIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpXHJcbiAgICAgIF9idXNpbmVzc01vZGUgPSBcIkJyaWNrICYgTW9ydGFyXCI7XHJcbiAgICAgIFxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICB2YXIgX21zZyA9IFwieW91IGhhdmUgcmVjZWl2ZWQgcGFydG5lcnNoaXAgb2ZmZXIgYnkgXCIgKyBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICsgXCIgLCBmb2xsb3dpbmcgYXJlIHRoZSBkZXRhaWxzIG9mIGJ1c2luZXNzOiBcIiArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE5hbWU6IFwiICsgX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzTmFtZSArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgTW9kZTogXCIgKyBfYnVzaW5lc3NNb2RlICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBWYWx1ZTogJFwiICsgX2J1c2luZXNzVmFsdWUgKyBcIlxcblwiICtcclxuICAgICAgICBcIkNhc2ggUGF5bWVudDogJFwiICsgX3BheUFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICBcImlmIG9mZmVyIGlzIGFjY2VwdGVkIHlvdSB3aWxsIHJlY2VpdmUgNTAlIHNoYXJlIG9mIHRoYXQgcGFydGljdWxhciBidXNpbmVzcyBhbmQgd2lsbCByZWNlaXZlIHByb2ZpdC9sb3NlIG9uIHRoYXQgcGFydGljdWxhciBidXNpbmVzcy5cIjtcclxuICAgIFxyXG4gICAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cChfbXNnKTtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpXHJcbiAge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIHZhciBteUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG4gIFxyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoID49IF9wYXlBbW91bnQpIHtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoIC09IF9wYXlBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAodHJ1ZSwgX3BheUFtb3VudCwgZmFsc2UsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJjb25ncmF0dWxhdGlvbnMhIHlvdSBoYXZlIHN0YXJ0ZWQgYnVzaW5lc3MgcGFydG5lcnNoaXBcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpXHJcbiAge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKGZhbHNlLCAwLCB0cnVlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIik7XHJcbiAgICB9IGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfaXNBY2NlcHRlZD1mYWxzZSxfcGF5bWVudD0wLF9pc0NhbmNlbGxlZD1mYWxzZSxfdUlEPVwiXCIsX2RhdGE9bnVsbCxfYnVzaW5lc3NJbmRleD0wKVxyXG4gIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSB7IERhdGE6IHsgQWNjZXB0ZWQ6IF9pc0FjY2VwdGVkLCBDYXNoUGF5bWVudDpfcGF5bWVudCxDYW5jZWxsZWQ6X2lzQ2FuY2VsbGVkLFBsYXllcklEOl91SUQsUGxheWVyRGF0YTpfZGF0YSxCdXNpbmVzc0luZGV4Ol9idXNpbmVzc0luZGV4fSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMiwgX21haW5EYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKVxyXG4gIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHZhciBfYWNjZXB0ZWQgPSBfZGF0YS5EYXRhLkFjY2VwdGVkO1xyXG4gICAgICB2YXIgX2Nhc2ggPSBfZGF0YS5EYXRhLkNhc2hQYXltZW50O1xyXG4gICAgICB2YXIgX2NhbmNlbGxlZCA9IF9kYXRhLkRhdGEuQ2FuY2VsbGVkO1xyXG4gICAgICB2YXIgX3VpZCA9IF9kYXRhLkRhdGEuUGxheWVySUQ7XHJcbiAgICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5CdXNpbmVzc0luZGV4O1xyXG4gICAgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYW5zd2VyIHJlY2VpdmVkXCIpO1xyXG4gICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfY2FzaDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwID0gdHJ1ZTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVySUQgPSBfdWlkO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJOYW1lID0gX3BsYXllckRhdGEuUGxheWVyTmFtZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgYWNjZXB0ZWRcIik7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgXCIgKyBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICsgXCIsIGNhc2ggJFwiICsgX2Nhc2ggKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGFjY291bnQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBpZiAoQ2FuY2VsbGVkSUQuaW5jbHVkZXMoX3VpZCkgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgQ2FuY2VsbGVkSUQucHVzaChfdWlkKTtcclxuICAgICAgICBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKENhbmNlbGxlZElEKTtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5sZW5ndGggPT0gX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gY2FuY2VsbGVkIGJ5IGFsbCBvdGhlciB1c2Vycy5cIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciByZWplY3RlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICBSZXNldEdvbGRJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5Hb2xkRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5TdG9ja0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbChfYW1vdW50KSB7XHJcbiAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBfYW1vdW50O1xyXG5cclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgdmFyIF9hbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgIE9uY2VPclNoYXJlICsgXCIqXCIgKyBFbnRlckJ1eVNlbGxBbW91bnQgKyBcIj1cIiArIF9hbW91bnRcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgdGhpcy5SZXNldEdvbGRJbnB1dCgpO1xyXG4gICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICBfdGl0bGUsXHJcbiAgICBfZGljZVJlc3VsdCxcclxuICAgIF9wcmljZVRpdGxlLFxyXG4gICAgX3ByaWNlVmFsdWUsXHJcbiAgICBfYnV5T3JTZWxsVGl0bGUsXHJcbiAgICBfdG90YWxBbW91bnRUaXRsZSxcclxuICAgIF90b3RhbEFtb3VudFZhbHVlLFxyXG4gICAgX2J1dHRvbk5hbWUsXHJcbiAgICBfc3RhdGVcclxuICApIHtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZVJlc3VsdDtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VUaXRsZUxhYmVsLnN0cmluZyA9IF9wcmljZVRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVZhbHVlTGFiZWwuc3RyaW5nID0gX3ByaWNlVmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1eU9yU2VsbFRpdGxlTGFiZWwuc3RyaW5nID0gX2J1eU9yU2VsbFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFRpdGxlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV0dG9uTmFtZUxhYmVsLnN0cmluZyA9IF9idXR0b25OYW1lO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZURhdGFfSW52ZXN0U2VsbChfdG90YWxBbW91bnRWYWx1ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgfSxcclxuXHJcbiAgQXBwbHlCdXR0b25fSW52ZXN0U2VsbCgpIHtcclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPV9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXggXS5Hb2xkQ291bnQgKz0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTERcIixcclxuICAgICAgICAgICAgTG9uZ01lc3NhZ2VUaW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIGlmIChfYW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50KSB7XHJcbiAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAgKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50IC09IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgb3VuY2VzIG9mIEdPTEQgZm9yICAkXCIgK1xyXG4gICAgICAgICAgICAgIF9Ub3RhbEFtb3VudCxcclxuICAgICAgICAgICAgICBMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcInlvdSBkb24ndCBoYXZlIGVub3VnaCBHT0xEIG91bmNlcywgeW91IG93biBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgK1xyXG4gICAgICAgICAgICAgIFwiIG9mIEdPTEQgb3VuY2VzXCIsTG9uZ01lc3NhZ2VUaW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICAvL2NhbiBhZGQgbXVsdGlwbGUgc3RvY2tzIHdpdGggYnVzaW5lc3MgbmFtZSBpbiBvYmplY3QgaWYgcmVxdWlyZWRcclxuXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICtcclxuICAgICAgICAgICAgICBfYW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBzaGFyZXMgb2YgYnVzaW5lc3MgXCIgK1xyXG4gICAgICAgICAgICAgIFN0b2NrQnVzaW5lc3NOYW1lLFxyXG4gICAgICAgICAgICAgIExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja1NlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcblxyXG4gICAgICAgIGlmIChfYW1vdW50IDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCAtPSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICtcclxuICAgICAgICAgICAgICBfYW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBzaGFyZXMgb2Ygc3RvY2sgZm9yICAkXCIgK1xyXG4gICAgICAgICAgICAgIF9Ub3RhbEFtb3VudCxcclxuICAgICAgICAgICAgICBMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcInlvdSBkb24ndCBoYXZlIGVub3VnaCBzdG9ja3Mgc2hhcmVzLCB5b3Ugb3duIFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgK1xyXG4gICAgICAgICAgICAgIFwiIG9mIHN0b2NrIHNoYXJlc1wiLExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KVxyXG4gICAge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpOyBcclxuICAgICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTsgXHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBheWRheSBvciBEb3VibGUgcGF5IERheVxyXG4gIFRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pIHtcclxuICAgIGlmIChITUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChcclxuICAgICAgICBjYy5CdXR0b25cclxuICAgICAgKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoXHJcbiAgICAgICAgY2MuQnV0dG9uXHJcbiAgICAgICkuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQk1BbW91bnQgPT0gMCkge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsb2FuVGFrZW4pIHtcclxuICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRMb2FuQW1vdW50X1BheURheSgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHZhciBfbG9hbiA9IDA7XHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgICAgaW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW4gPVxyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfbG9hbjtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX1BheURheShfdGl0bGUsX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsX3NraXBITSA9IGZhbHNlLF9za2lwQk0gPSBmYWxzZSxfaXNCb3QgPSBmYWxzZSxfZm9yU2VsZWN0ZWRCdXNpbmVzcz1mYWxzZSxfU2VsZWN0ZWRCdXNpbmVzc0luZGV4PTAsX2hNQW1vdW50PTAsX2JtQW1vdW50PTAsX2JtTG9jYXRpb249MCxQYXlkYXlDb3VudGVyPTEpIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5QYXlEYXlDb3VudCA9IFBheWRheUNvdW50ZXI7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfaXNEb3VibGVQYXlEYXk7XHJcbiAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB2YXIgX3RpbWUgPSAxODAwO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IF9mb3JTZWxlY3RlZEJ1c2luZXNzO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX1NlbGVjdGVkQnVzaW5lc3NJbmRleDtcclxuICAgIEhNQW1vdW50PV9oTUFtb3VudDtcclxuICAgIEJNQW1vdW50PV9ibUFtb3VudDtcclxuICAgIEJNTG9jYXRpb25zID0gX2JtTG9jYXRpb247XHJcblxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSlcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgIEhNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwO2luZGV4IDxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO2luZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIGxvYW5UYWtlbiA9IF9sb2FuVGFrZW47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZE51bWJlckxhYmVsLnN0cmluZyA9IEhNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTGFiZWwuc3RyaW5nID0gQk1BbW91bnQ7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMb2NhdGlvbkxhYmVsLnN0cmluZyA9IEJNTG9jYXRpb25zO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlBhc3NlZFBheURheUNvdW50TGFiZWwuc3RyaW5nID0gdGhpcy5QYXlEYXlDb3VudDtcclxuXHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIGxvYW4gd2FzIHNraXBwZWQgcHJldmlvdXNseVxyXG4gICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSB7XHJcbiAgICAgIHZhciBfbG9hbiA9IHRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJFwiICsgX2xvYW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkZvdHRlckxhYmVsLnN0cmluZyA9IFwiKnBheSAkNTAwMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgMCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgQk1BbW91bnQsIGxvYW5UYWtlbik7XHJcblxyXG4gICAgaWYgKF9za2lwQk0gfHwgX3NraXBITSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCBfdGltZSArIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgdGhpcy5PbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgdGhpcy5PbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTsgIFxyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIGlmICghSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBpZiAoIV9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEhNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG5cclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuICAgICAgdmFyIF9wYXlkYXltdWx0aXBsaWVyID0gdGhpcy5QYXlEYXlDb3VudDtcclxuICAgICAgLy9wYXJ0bmVyc2hpcCBjb2RlXHJcbiAgICAgIGlmIChfZG91YmxlUGF5RGF5KVxyXG4gICAgICAgIF9tdWx0aXBsaWVyID0gMjtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF9wYXltZW50ID1fcGF5ZGF5bXVsdGlwbGllciogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gKF9wYXltZW50IC8gMik7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyKl9tdWx0aXBsaWVyICogX2RpY2UgKiAxMDAwO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSAoX3BheW1lbnQgLyAyKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9hbW91bnRUb0JlQWRqdXN0ZWQ+MClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH1cclxuICAgICAgLy9wYXJ0bmVyc2hpcCBjb2RlXHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllcipITUFtb3VudCAqIF9kaWNlICogMTAwMC1fYW1vdW50VG9CZUFkanVzdGVkO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllcioyICogKEhNQW1vdW50ICogX2RpY2UpICogMTAwMC1fYW1vdW50VG9CZUFkanVzdGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSlcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19wYXlkYXltdWx0aXBsaWVyK1wiKlwiK19kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKS1cIitfYW1vdW50VG9CZUFkanVzdGVkK1wiPVwiKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9XCIoXCIrX3BheWRheW11bHRpcGxpZXIrXCIqXCIrX2RpY2UgKyBcIipcIiArIEhNQW1vdW50ICsgXCIqXCIgKyBcIjEwMDAqMiktXCIrX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIGlmICghQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcbiAgICAgIHZhciBfcGF5ZGF5bXVsdGlwbGllciA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBpZiAoIV9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9hbW91bnQgPSBCTUFtb3VudCArIEJNTG9jYXRpb25zO1xyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG5cclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgX211bHRpcGxpZXIgPSAyO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyKl9sb2NhdGlvbnMgKiBfbXVsdGlwbGllciAqIF9kaWNlICogMjAwMDtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSAoX3BheW1lbnQgLyAyKTtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW2luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyKl9sb2NhdGlvbnMgKiBfbXVsdGlwbGllciAqIF9kaWNlICogMjAwMDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gKF9wYXltZW50IC8gMik7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYW1vdW50VG9CZUFkanVzdGVkPjApXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpXHJcbiAgICAgICAgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllcipfYW1vdW50ICogX2RpY2UgKiAyMDAwLV9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IF9wYXlkYXltdWx0aXBsaWVyKjIgKiAoX2Ftb3VudCAqIF9kaWNlKSAqIDIwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuXHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nID0gX2Ftb3VudDtcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSlcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19wYXlkYXltdWx0aXBsaWVyK1wiKlwiK19kaWNlICsgXCIqXCIgKyBfYW1vdW50ICsgXCIqXCIgKyBcIjIwMDApLVwiICtfYW1vdW50VG9CZUFkanVzdGVkK1wiPVwiKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9XCIoXCIrX3BheWRheW11bHRpcGxpZXIrXCIqXCIrX2RpY2UgKyBcIipcIiArIF9hbW91bnQgKyBcIipcIiArIFwiMjAwMCoyKS1cIitfYW1vdW50VG9CZUFkanVzdGVkK1wiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVQYXltZW50X1BheURheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUxvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX0VzdGltYXRlTG9hbiA9IDA7XHJcblxyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpLy9pZiBwbGF5ZXIgaGFkIHNraXBwcGVkIGxvYW4gcHJldmlvdXNseSBjYWxsIGFsbCBhbW91bnQgZHVlXHJcbiAgICAgICAgX0VzdGltYXRlTG9hbiA9IHRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSA1MDAwO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX0VzdGltYXRlTG9hbikge1xyXG4gICAgICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwO2luZGV4IDxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO2luZGV4KyspIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSBfRXN0aW1hdGVMb2FuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpXHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuU2tpcExvYW5CdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIm91dCBvZiBtb25leVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQYXltZW50X1BheURheSgpIHtcclxuICAgIC8vYWxsXHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1sgX3BsYXllckluZGV4XS5DYXNoICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICBcIkFtb3VudCAkXCIgK1xyXG4gICAgICAgICAgVG90YWxQYXlEYXlBbW91bnQgK1xyXG4gICAgICAgICAgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIiArXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoXHJcbiAgICAgICk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCA1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgXCJBbW91bnQgJFwiICtcclxuICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ICtcclxuICAgICAgICAgIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgK1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2tpcExvYW5PbmVUaW1lX1BheURheSgpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICBcIllvdSBoYXZlIHNraXBwZWQgdGhlIGxvYW4gcGF5bWVudCwgYmFuayB3aWxsIGNhbGwgdXBvbiBjb21wbGV0ZSBsb2FuIGFtb3VudCBvbiBuZXh0IHBheWRheVwiXHJcbiAgICApO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIFNlbGxCdXNpbmVzc19QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9QYXlEYXkoX2Ftb3VudCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9hbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgRXhpdExvYW5TY3JlZW5fUGF5RGF5KCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdHYW1lX1BheURheSgpIHtcclxuICAgIC8vaWYgYmFua3J1cHRlZCB5b3UgY2FuIHN0YXJ0IG5ldyBnYW1lXHJcbiAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgXCJZb3Ugd2lsbCBsb3NlIGFsbCBwcm9ncmVzcyBhbmQgc3RhcnQgbmV3IGdhbWUgZnJvbSB0aGUgc3RhcnQuXCIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuRXhpdExvYW5TY3JlZW5fUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIHRoaXMuRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UoKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlNob3dDYXJkXCIsIFwiXCIsIGZhbHNlKTtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgMzAxMCk7XHJcbiAgfSxcclxuXHJcbiAgUGF5RGF5Q29tcGxldGVkKCkge1xyXG4gICAgaWYgKEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgJiYgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkICYmIExvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgY29uc29sZS5sb2coXCJhbGwgcGF5ZGF5IGRvbmVcIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVBheURheShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU2VsbCAmIG1hbmlwdWxhdGUgQnVzaW5lc3MgVUlcclxuICBUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcblxyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJTRUxMXCI7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nID1cIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKGZhbHNlKTtcclxuICAgICAgZWxzZSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNCb3Q9ZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVU0lORVNTXCI7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfaXNCb3QpXHJcbiAgICAgIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICAvLyBlbHNlXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlLF9pc0JvdD1mYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCFfaXNCb3QpXHJcbiAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICBcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90KTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgVUlcclxuICBUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiSU5WRVNUXCI7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID1cclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICBUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVZIE9SIFNFTExcIjtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID1cclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzZXR1cCBVaVxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKFxyXG4gICAgX215RGF0YSxcclxuICAgIF9hY3RvcnNEYXRhLFxyXG4gICAgX2lzVHVybk92ZXIsXHJcbiAgICBfbW9kZUluZGV4ID0gMFxyXG4gICkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9XHJcbiAgICAgIFwiTm8gb2YgUGxheWVyczogXCIgK1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2VcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGlzIHNwZWN0YXRlIG9yIG5vdCwgZG9udCBhZGQgYW55IHNwZWN0YXRlc1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBfbXlEYXRhLlBsYXllclVJRCAhPVxyXG4gICAgICAgICAgICBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSURcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKVxyXG4gICAgICAgICAgICAgIC5zZXRQbGF5ZXJOYW1lKFxyXG4gICAgICAgICAgICAgICAgX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKVxyXG4gICAgICAgICAgICAgIC5zZXRQbGF5ZXJVSUQoXHJcbiAgICAgICAgICAgICAgICBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSURcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKVxyXG4gICAgICAgICAgICAuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgIC5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb25lUXVlc3Rpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgb25lUXVlc3Rpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3F1ZXN0aW9uKSB7XHJcbiAgICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKVxyXG4gICAgICAuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nID1cclxuICAgICAgXCJQbGF5ZXIgaGFzIGFza2VkIGlmIFwiICtcclxuICAgICAgX3F1ZXN0aW9uICtcclxuICAgICAgXCJcXG5cIiArXHJcbiAgICAgIFwiXFxuXCIgK1xyXG4gICAgICBcIiplaXRoZXIgYW5zd2VyIHF1ZXN0aW9uIG9yIHBheSAkNTAwMCB0byBwbGF5ZXIgd2hvc2UgYXNraW5nIHF1ZXN0aW9uLlwiO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIFNob3dUb2FzdDogZnVuY3Rpb24gKG1lc3NhZ2UsIHRpbWUgPSBTaG9ydE1lc3NhZ2VUaW1lLF9oYXNidXR0b249dHJ1ZSkge1xyXG4gICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlBvcFVwVUlMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xyXG4gICAgdmFyIFNlbGZUb2FzdCA9IHRoaXM7XHJcbiAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICBcclxuICAgIGlmIChtb2RlID09IDEpIC8vZm9yIGJvdCBtb2RlIG9ubHlcclxuICAgIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg+MCAmJiBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0uSXNCb3QpXHJcbiAgICAgIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAge1xyXG4gICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDb21wbGV0ZVRvYXN0KClcclxuICB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiY29tcGxldGUgdG9hc3QgY2FsbGVkXCIpO1xyXG4gICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gIH0sXHJcblxyXG4gIFNob3dSZXN1bHRTY3JlZW46IGZ1bmN0aW9uIChfc3RhdHVzLF9kYXRhKSB7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuUmVzdWx0U2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuU3RhdHVzTGFiZWwuc3RyaW5nID0gX3N0YXR1cztcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5Cb2R5TGFiZWwuc3RyaW5nID0gX2RhdGE7XHJcbiAgfSxcclxuXHJcbiAgUmVzdGFydFRoZUdhbWUoKVxyXG4gIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICB9LFxyXG59KTtcclxuIl19