
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
var ShortMessageTime = 2500;
var globalTurnTimer = 30;
var PayDayInfo = "";
var InvestSellInfo = "";
var TimerTimeout; // var CompletionWindowTime = 500;//8000
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
    },
    AddButtonNode: {
      displayName: "AddButtonNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for Add Cash button node in business setup"
    },
    AddCashScreen: {
      displayName: "AddCashScreen",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for AddCashScreen node in business setup"
    },
    AddCashLabel: {
      displayName: "AddCashLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "Reference for AddCash label in business setup"
    },
    AddCashEditBox: {
      displayName: "AddCashEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "Reference for AddCash editBox in business setup"
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
    },
    TimerText: {
      displayName: "TimerText",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "Reference for label of timer text for turn decision"
    },
    BlockerNode: {
      displayName: "BlockerNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for node of blocker for turn decision"
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
    WaitingScreenLabel: {
      displayName: "WaitingScreenLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the node WaitingScreenLabel of OneQuestion node"
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
var HBDiceCounter = 0;
var BMDiceCounter = 0;
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
    },
    AvatarSprites: {
      "default": [],
      type: cc.SpriteFrame,
      serializable: true
    }
  },

  /**
    @summary Resets this class global variables and other necessary data onLoad
   **/
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
    HBDiceCounter = 0;
    BMDiceCounter = 0;
    PayDayInfo = "";
    InvestSellInfo = "";
  },

  /**
    @summary Resets turn variables for goldinvest/goldsold/stokcinvest/stocksold
   **/
  ResetTurnVariable: function ResetTurnVariable() {
    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
  },

  /**
    @summary check references of class/es needed.
   **/
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
    if (!GameManager || GameManager == null) GameManager = require("GameManager");
  },

  /**
    @summary called when this node gets active
   **/
  onEnable: function onEnable() {
    //events subscription to be called
    cc.systemEvent.on("SyncData", this.SyncData, this);
  },

  /**
    @summary called when this node gets deactive
   **/
  onDisable: function onDisable() {
    cc.systemEvent.off("SyncData", this.SyncData, this);
  },

  /**
    @summary called when instance of the class is loaded
   **/
  onLoad: function onLoad() {
    this.ResetAllData();
    this.CheckReferences(); //declaring local variables

    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
    this.IsBotTurn = false;
    this.PayDayCount = 0;
    this.DoublePayDayCount = 0;
    this.IsBankrupted = false;
    this.BankruptedAmount = 0;
    this.AddCashAmount = "";
    this.Timer = 0;
    this.TimerStarted = false;
    TimerTimeout = null;
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
    this.BusinessSetupData.WaitingStatusNode.active = false; // console.trace("closedddddddddddddddddddddddddddddddddddd");
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
  ToggleCashAddScreen_BusinessSetup: function ToggleCashAddScreen_BusinessSetup(_state) {
    this.BusinessSetupData.AddCashScreen.active = _state;
  },
  EnableCashAdd_BusinessSetup: function EnableCashAdd_BusinessSetup() {
    this.BusinessSetupData.AddCashEditBox.string = "";
    this.AddCashAmount = "";
    this.ToggleCashAddScreen_BusinessSetup(true);
    this.BusinessSetupData.AddCashLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash;
  },
  OnCashAdd_BusinessSetup: function OnCashAdd_BusinessSetup(_val) {
    this.AddCashAmount = _val;
  },
  OnClickDoneCashAdd_BusinessSetup: function OnClickDoneCashAdd_BusinessSetup() {
    this.ToggleCashAddScreen_BusinessSetup(false);

    var _gamecash = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash);

    var _amount = parseInt(this.AddCashAmount);

    if (this.AddCashAmount != null && this.AddCashAmount != "" && this.AddCashAmount != undefined) {
      if (_amount <= _gamecash) {
        PlayerDataIntance.Cash += _amount;
        console.log(PlayerDataIntance.Cash);
        this.BusinessSetupData.PlayerCashUI.string = PlayerDataIntance.Cash.toString();
        _gamecash -= _amount;
        GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash = _gamecash.toString();
        GamePlayReferenceManager.Instance.Get_ServerBackend().UpdateUserData(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash, -1, -1);
        this.ShowToast("Cash $" + this.AddCashAmount + " has been added.");
        this.BusinessSetupData.AddCashEditBox.string = "";
        this.AddCashAmount = "";
      } else {
        this.ShowToast("you do not have enough in game cash.");
      }
    }
  },
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
    this.BusinessSetupData.AddButtonNode.active = false;

    if (isFirstTime) {
      this.BusinessSetupData.ExitButtonNode.active = false;
      this.BusinessSetupData.TimerNode.active = false;
      PlayerDataIntance.Cash = StartGameCash;
      this.BusinessSetupData.AddButtonNode.active = true;
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
              this.OnChangAvatarID_BusinessSetup(parseInt(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].AvatarID));
            } else {
              PreviousCash = PlayerDataIntance.Cash;
              PlayerDataIntance.Cash = GivenCashBusiness;
              this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerName);
              this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID);
              this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
              this.OnChangAvatarID_BusinessSetup(parseInt(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].AvatarID));
            }
          } else {
            this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerName);
            this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID);
            this.OnChangeCash_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].Cash);
            this.OnChangAvatarID_BusinessSetup(parseInt(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].AvatarID));
          }
        }
      }
    } else {
      InsideGameBusinessSetup = -1;
      this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name);
      this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);
      this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
      this.OnChangAvatarID_BusinessSetup(parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.avatarId));
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
  OnChangAvatarID_BusinessSetup: function OnChangAvatarID_BusinessSetup(UID) {
    if (isNaN(UID) || UID == undefined) UID = 0;
    PlayerDataIntance.AvatarID = UID;
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
    this.BusinessSetupData.PlayerCashUI.string = amount;
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
  PushDataForPlayerLeft: function PushDataForPlayerLeft(_data) {
    var _mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

    if (_mode == 2) {
      _playerDataIntance = new GameManager.PlayerData();
      _playerDataIntance.Cash = 20000;
      _playerDataIntance.PlayerID = _data.userID;
      _playerDataIntance.PlayerName = _data.name;
      _playerDataIntance.AvatarID = 0;
      _playerDataIntance.HomeBasedAmount = 1;
      _playerDataIntance.IsActive = false;
      _playerDataIntance.CardFunctionality = new GameManager.CardDataFunctionality();
      _playerBusinessDataIntance = new GameManager.BusinessInfo();
      _playerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.HomeBased;
      _playerBusinessDataIntance.BusinessTypeDescription = "Saloon";
      _playerBusinessDataIntance.BusinessName = "Eva Beauty";

      _playerDataIntance.NoOfBusiness.push(_playerBusinessDataIntance);

      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(1, _playerDataIntance);
    }
  },
  SyncData: function SyncData(_data, _ID, _playerLeft) {
    if (_playerLeft === void 0) {
      _playerLeft = false;
    }

    var _isSpectate = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().getCustomProperty("RoomEssentials")["IsSpectate"];

    if (_isSpectate) {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetRealActors();
    }

    if (!_playerLeft) {
      if (_ID != GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().actorNr) GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(_data);
    } // console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo);


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

    if (isactive) {
      this.TurnDecisionSetupUI.BlockerNode.active = false;
      this.Timer = globalTurnTimer;
      this.TimerStarted = true;
      this.TurnDecisionSetupUI.TimerText.string = this.Timer + " seconds are left to choose above options except 'Roll The Dice'";
      this.UpdateTimer();
    } else {
      clearTimeout(TimerTimeout);
      this.Timer = 0;
      this.TimerStarted = false;
      this.TurnDecisionSetupUI.TimerText.string = "";
      this.TurnDecisionSetupUI.BlockerNode.active = false;
    }

    this.UpdateCash_TurnDecision();
  },
  UpdateTimer: function UpdateTimer() {
    var _this2 = this;

    if (this.Timer > 0) {
      this.Timer--;
      this.TurnDecisionSetupUI.TimerText.string = this.Timer + " seconds are left to choose above options except 'Roll The Dice'";
      TimerTimeout = setTimeout(function () {
        _this2.UpdateTimer();
      }, 1000);
    } else {
      this.Timer = 0;
      this.TimerStarted = false;
      this.TurnDecisionSetupUI.TimerText.string = "Timer is over, you can select only 'Roll The Dice' now.";
      this.TurnDecisionSetupUI.BlockerNode.active = true;
    }
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
    var _this3 = this;

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
        _this3.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
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
    var _this4 = this;

    if (EnterBuySellAmount == "") {
      this.ShowToast("Please enter an amount.");
    } else {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      InvestSellInfo = "";

      if (this.InvestSellSetupUI.InvestState == InvestEnum.GoldInvest) {
        var _amount = parseInt(EnterBuySellAmount);

        var _TotalAmount = OnceOrShare * _amount;

        if (_TotalAmount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash -= _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount += _amount;
          this.ShowToast("You have successfully bought " + _amount + " ounces of GOLD", LongMessageTime);
          InvestSellInfo = "Buying GOLD:" + "\n" + "\n" + "Dice Rolled: " + OnceOrShare / 1000 + "\n" + "Per Ounce price: $" + OnceOrShare + "\n" + "Purchased Ounces: " + _amount + "\n" + "Total Payment for Ounces: $" + _TotalAmount;
          this.RaiseEventToSyncInfo(InvestSellInfo);
          setTimeout(function () {
            _this4.ExitButton_InvestSell();
          }, 200);
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
          InvestSellInfo = "Selling GOLD:" + "\n" + "\n" + "Dice Rolled: " + OnceOrShare / 1000 + "\n" + "Per Ounce price: $" + OnceOrShare + "\n" + "Sold Ounces: " + _amount + "\n" + "Total Payment for Ounces: $" + _TotalAmount;
          this.RaiseEventToSyncInfo(InvestSellInfo);
          setTimeout(function () {
            _this4.ExitButton_InvestSell();
          }, 200);
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
          InvestSellInfo = "Buying STOCK:" + "\n" + "\n" + "Dice Rolled: " + OnceOrShare / 1000 + "\n" + "Per share price: $" + OnceOrShare + "\n" + "Purchased shares: " + _amount + "\n" + "Total Payment for shares: $" + _TotalAmount;
          this.RaiseEventToSyncInfo(InvestSellInfo);
          setTimeout(function () {
            _this4.ExitButton_InvestSell();
          }, 200);
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
          InvestSellInfo = "Selling STOCK:" + "\n" + "\n" + "Dice Rolled: " + OnceOrShare / 1000 + "\n" + "Per share price: $" + OnceOrShare + "\n" + "Sold shares: " + _amount + "\n" + "Total Payment for shares: $" + _TotalAmount;
          this.RaiseEventToSyncInfo(InvestSellInfo);
          setTimeout(function () {
            _this4.ExitButton_InvestSell();
          }, 200);
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
  AssignData_PayDay: function AssignData_PayDay(_title, _isDoublePayDay, _skipHM, _skipBM, _isBot, _forSelectedBusiness, _SelectedBusinessIndex, _hMAmount, _bmAmount, _bmLocation, PaydayCounter, DoublePayCounter) {
    var _this5 = this;

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

    if (DoublePayCounter === void 0) {
      DoublePayCounter = 0;
    }

    HBDiceCounter = 0;
    BMDiceCounter = 0; //   if (DoublePayCounter == 0) DoublePayCounter = 1;
    //  if (DoublePayDay) DoublePayCounter = DoublePayCounter * 2;

    var _res = PaydayCounter + DoublePayCounter;

    PayDayInfo = "PayDay Result with multiplier: " + _res;
    this.IsBotTurn = _isBot;
    this.PayDayCount = PaydayCounter;
    this.DoublePayDayCount = DoublePayCounter;
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
        _this5.PayDayCompleted();
      }, _time + 200);
    }

    if (_isBot) {
      setTimeout(function () {
        _this5.OnHomeBasedPaymentClicked_PayDay();

        _this5.OnBMPaymentClicked_PayDay();

        _this5.OnLoanPaymentClicked_PayDay();
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

      if (_doublePayDay) {
        if (this.DoublePayDayCount != 0) {
          _multiplier = 2 * this.DoublePayDayCount;
        } else {
          _multiplier = 2;
        }
      }

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


      if (!_doublePayDay) TotalPayDayAmount = _paydaymultiplier * HMAmount * _dice * 1000 - _amountToBeAdjusted;else TotalPayDayAmount = _paydaymultiplier * _multiplier * (HMAmount * _dice) * 1000 - _amountToBeAdjusted;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;
      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + HMAmount + "*" + "1000)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + HMAmount + "*" + "1000*" + _multiplier + ")-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;
      PayDayInfo += "\n" + "\n" + "Home Based Business: " + HMAmount + "\n" + "Dice Rolled: " + _dice + "\n" + "Amount Received: $" + TotalPayDayAmount;

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

      if (_doublePayDay) {
        if (this.DoublePayDayCount != 0) {
          _multiplier = 2 * this.DoublePayDayCount;
        } else {
          _multiplier = 2;
        }
      }

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

      if (!_doublePayDay) TotalPayDayAmount = _paydaymultiplier * _amount * _dice * 2000 - _amountToBeAdjusted;else TotalPayDayAmount = _paydaymultiplier * _multiplier * (_amount * _dice) * 2000 - _amountToBeAdjusted;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;
      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + _amount + "*" + "2000)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + _amount + "*" + "2000*" + _multiplier + ")-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;
      PayDayInfo += "\n" + "\n" + "Brick & Mortar Business: " + _amount + "\n" + "Dice Rolled: " + _dice + "\n" + "Amount Received: $" + TotalPayDayAmount;

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
    var _this6 = this;

    //all
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + TotalPayDayAmount;
    this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);

    if (!this.IsBotTurn) {
      this.ShowToast("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
      setTimeout(function () {
        _this6.ToggleResultPanelScreen_PayDay(false);

        _this6.PayDayCompleted();
      }, 100);
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
    var _this7 = this;

    //if bankrupted you can start new game
    this.ShowToast("You will lose all progress and start new game from the start.", 3000, false);
    setTimeout(function () {
      _this7.ExitLoanScreen_PayDay();

      _this7.TogglePayDayScreen_PayDay(false);

      _this7.Exit___InsufficientBalance();

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
  ShowInfo: function ShowInfo(_data) {
    this.ShowToast(_data.info, 2000, true);
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

      this.RaiseEventToSyncInfo(PayDayInfo);
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
  ShowQuestionToast: function ShowQuestionToast(_msg) {
    this.OneQuestionSetupUI.WaitingScreenLabel.string = _msg;
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
  SetUpDecisionScreen_OneQuestionSetupUI: function SetUpDecisionScreen_OneQuestionSetupUI(_msg) {
    var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    this.OneQuestionSetupUI.DecisionTitleLabel.string = "ONE QUESTION";
    this.OneQuestionSetupUI.DecisionCashLabel.string = "$" + _myData.Cash;
    this.OneQuestionSetupUI.DecisionPlayerNameLabel.string = _myData.PlayerName;
    this.OneQuestionSetupUI.DecisionQuestionLabel.string = _msg;
  },
  //#endregion
  ShowToast: function ShowToast(message, time, _hasbutton) {
    var _this8 = this;

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

    if (mode == 1) {
      //for bot mode only
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length > 0 && GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber()].IsBot) {
        // if (_hasbutton) {
        //   this.PopUpUIButton.active = true;
        //   clearTimeout(TimeoutRef);
        //   TimeoutRef = setTimeout(() => {
        //     this.CompleteToast();
        //   }, CompletionWindowTime);
        // }
        // else {
        this.PopUpUIButton.active = false;
        setTimeout(function () {
          SelfToast.PopUpUI.active = false;
        }, time); // }
      } else {
        if (_hasbutton) {
          this.PopUpUIButton.active = true;
          clearTimeout(TimeoutRef);
          TimeoutRef = setTimeout(function () {
            _this8.CompleteToast();
          }, CompletionWindowTime);
        } else {
          this.PopUpUIButton.active = false;
          setTimeout(function () {
            SelfToast.PopUpUI.active = false;
          }, time);
        }
      }
    } //for real players
    else {
        if (_hasbutton) {
          this.PopUpUIButton.active = true;
          clearTimeout(TimeoutRef);
          TimeoutRef = setTimeout(function () {
            _this8.CompleteToast();
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
  },
  RaiseEventToSyncInfo: function RaiseEventToSyncInfo(_dataInfo) {
    var _mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

    if (_mode == 2) {
      //for real players
      var _data = {
        info: _dataInfo
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(15, _data);
    } else if (_mode == 1) {
      //for bot
      if (this.IsBotTurn) {
        var _data = {
          info: _dataInfo
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(15, _data);
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiZ2xvYmFsVHVyblRpbWVyIiwiUGF5RGF5SW5mbyIsIkludmVzdFNlbGxJbmZvIiwiVGltZXJUaW1lb3V0IiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsIkFkZEJ1dHRvbk5vZGUiLCJBZGRDYXNoU2NyZWVuIiwiQWRkQ2FzaExhYmVsIiwiQWRkQ2FzaEVkaXRCb3giLCJjdG9yIiwiQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwic3RyaW5nIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIk1hcmtldGluZ0VkaXRCb3giLCJHb2xkRWRpdEJveCIsIlN0b2NrRWRpdEJveCIsIkNhc2hBbW91bnRMYWJlbCIsIkV4cGFuZEJ1c2luZXNzTm9kZSIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiUHJlZmFiIiwiVGltZXJUZXh0IiwiQmxvY2tlck5vZGUiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIlBhc3NlZFBheURheUNvdW50TGFiZWwiLCJIb21lQmFzZWRCdG4iLCJCTUJ0biIsIkxvYW5CdG4iLCJNYWluUGFuZWxOb2RlIiwiUmVzdWx0UGFuZWxOb2RlIiwiTG9hblJlc3VsdFBhbmVsTm9kZSIsIlJlc3VsdFNjcmVlblRpdGxlTGFiZWwiLCJUb3RhbEJ1c2luZXNzTGFiZWwiLCJUb3RhbEFtb3VudExhYmVsIiwiU2tpcExvYW5CdXR0b24iLCJMb2FuRm90dGVyTGFiZWwiLCJJbnZlc3RVSSIsIkJ1eU9yU2VsbFVJIiwiT25lUXVlc3Rpb25VSSIsIlBsYXllckRldGFpbExhYmVsIiwiRGV0YWlsc1ByZWZhYiIsIlNjcm9sbENvbnRlbnQiLCJXYWl0aW5nU2NyZWVuIiwiV2FpdGluZ1NjcmVlbkxhYmVsIiwiRGVjaXNpb25UaXRsZUxhYmVsIiwiRGVjaXNpb25DYXNoTGFiZWwiLCJEZWNpc2lvblBsYXllck5hbWVMYWJlbCIsIkRlY2lzaW9uUXVlc3Rpb25MYWJlbCIsIlBhcnRuZXJzaGlwVUkiLCJXYWl0aW5nU3RhdHVzU2NyZWVuIiwiTWFpblNjcmVlbiIsIlRpdGxlTmFtZSIsIlBsYXllck5hbWUiLCJQbGF5ZXJDYXNoIiwiUGFydG5lclNoaXBQcmVmYWIiLCJEZWNpc2lvblNjcmVlbiIsIkRlY2lzaW9uUGxheWVyTmFtZSIsIkRlY2lzaW9uUGxheWVyQ2FzaCIsIkRlY2lzaW9uRGVzY3JpcHRpb24iLCJSZXN1bHRVSSIsIlJlc3VsdFNjcmVlbiIsIlN0YXR1c0xhYmVsIiwiQm9keUxhYmVsIiwiUGxheWVyRGF0YUludGFuY2UiLCJQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlIiwiUmVxdWlyZWRDYXNoIiwiSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAiLCJUZW1wTWFya2V0aW5nQW1vdW50IiwiVGVtcEhpcmluZ0xhd3llciIsIkdvbGRDYXNoQW1vdW50IiwiRW50ZXJCdXlTZWxsQW1vdW50IiwiU3RvY2tCdXNpbmVzc05hbWUiLCJEaWNlUmVzdWx0IiwiT25jZU9yU2hhcmUiLCJMb2NhdGlvbk5hbWUiLCJIQkRpY2VDb3VudGVyIiwiQk1EaWNlQ291bnRlciIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJPbmVRdWVzdGlvblNldHVwVUkiLCJQYXJ0bmVyc2hpcFNldHVwVUkiLCJSZXN1bHRTZXR1cFVJIiwiUG9wVXBVSSIsIlBvcFVwVUlMYWJlbCIsIlBvcFVwVUlCdXR0b24iLCJHYW1lcGxheVVJU2NyZWVuIiwiSW52ZXN0U2VsbFNjcmVlbiIsIlBheURheVNjcmVlbiIsIlNlbGxCdXNpbmVzc1NjcmVlbiIsIkludmVzdFNjcmVlbiIsIkJ1eU9yU2VsbFNjcmVlbiIsIk9uZVF1ZXN0aW9uU3BhY2VTY3JlZW4iLCJPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuIiwiSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbiIsIlRlbXBEaWNlVGV4dCIsIkxlYXZlUm9vbUJ1dHRvbiIsIkF2YXRhclNwcml0ZXMiLCJTcHJpdGVGcmFtZSIsIlJlc2V0QWxsRGF0YSIsIlJlc2V0VHVyblZhcmlhYmxlIiwiR29sZEludmVzdGVkIiwiR29sZFNvbGQiLCJTdG9ja0ludmVzdGVkIiwiU3RvY2tTb2xkIiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlN5bmNEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwib25Mb2FkIiwiSXNCb3RUdXJuIiwiUGF5RGF5Q291bnQiLCJEb3VibGVQYXlEYXlDb3VudCIsIklzQmFua3J1cHRlZCIsIkJhbmtydXB0ZWRBbW91bnQiLCJBZGRDYXNoQW1vdW50IiwiVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJUb2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSIsIl9zdGF0ZSIsImFjdGl2ZSIsIkV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkiLCJJbnN0YW5jZSIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVMZWF2ZVJvb21fQm9vbCIsIkRpc2Nvbm5lY3RQaG90b24iLCJzZXRUaW1lb3V0IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwIiwiRW5hYmxlQ2FzaEFkZF9CdXNpbmVzc1NldHVwIiwiU3R1ZGVudERhdGEiLCJnYW1lQ2FzaCIsIk9uQ2FzaEFkZF9CdXNpbmVzc1NldHVwIiwiX3ZhbCIsIk9uQ2xpY2tEb25lQ2FzaEFkZF9CdXNpbmVzc1NldHVwIiwiX2dhbWVjYXNoIiwicGFyc2VJbnQiLCJfYW1vdW50IiwidW5kZWZpbmVkIiwiQ2FzaCIsImNvbnNvbGUiLCJsb2ciLCJ0b1N0cmluZyIsIlVwZGF0ZVVzZXJEYXRhIiwiU2hvd1RvYXN0IiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiaXNGaXJzdFRpbWUiLCJpbnNpZGVHYW1lIiwibW9kZUluZGV4IiwiX2lzQmFua3J1cHRlZCIsIl9CYW5rcnVwdEFtb3VudCIsIl9pc0NhcmRGdW5jdGlvbmFsaXR5IiwiX0dpdmVuQ2FzaCIsIl9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJJbml0X0J1c2luZXNzU2V0dXAiLCJQbGF5ZXJEYXRhIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHkiLCJCdXNpbmVzc0luZm8iLCJCdXNpbmVzc1R5cGUiLCJFbnVtQnVzaW5lc3NUeXBlIiwiUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCIsImluZGV4IiwiUGxheWVyR2FtZUluZm8iLCJsZW5ndGgiLCJ1c2VySUQiLCJQbGF5ZXJVSUQiLCJPbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwIiwiQXZhdGFySUQiLCJhdmF0YXJJZCIsIkdldE9ial9CdXNpbmVzc1NldHVwIiwiVUlEIiwiaXNOYU4iLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiSG9tZUJhc2VkIiwiT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJicmlja0FuZG1vcnRhciIsImFtb3VudCIsIkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCIsIl9sb2FuVGFrZW4iLCJfYnVzaW5lc3NJbmRleCIsIk5vT2ZCdXNpbmVzcyIsIkxvYW5UYWtlbiIsIk1hdGgiLCJhYnMiLCJnZXRDb21wb25lbnQiLCJPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAiLCJldmVudCIsIk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAiLCJIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAiLCJpIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wMV9CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wMl9CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wNF9CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwIiwiT25Mb2FuQW1vdW50Q2hvb3NlZF8wNl9CdXNpbmVzc1NldHVwIiwiT25UYWtlbkxvYW5DbGlja2VkX0J1c2luZXNzU2V0dXAiLCJQdXNoRGF0YUZvclBsYXllckxlZnQiLCJfZGF0YSIsIl9tb2RlIiwiR2V0U2VsZWN0ZWRNb2RlIiwiX3BsYXllckRhdGFJbnRhbmNlIiwiUGxheWVySUQiLCJIb21lQmFzZWRBbW91bnQiLCJJc0FjdGl2ZSIsIl9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlIiwicHVzaCIsIlJhaXNlRXZlbnQiLCJfSUQiLCJfcGxheWVyTGVmdCIsIl9pc1NwZWN0YXRlIiwiUGhvdG9uQWN0b3IiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIk1heFBsYXllcnMiLCJHZXRSZWFsQWN0b3JzIiwiYWN0b3JOciIsImdldFBob3RvblJlZiIsIm15Um9vbSIsInNldEN1c3RvbVByb3BlcnR5IiwiU3RhcnRUdXJuIiwiUHVyY2hhc2VCdXNpbmVzcyIsIl9idXNpbmVzc05hbWUiLCJfaXNIb21lQmFzZWQiLCJTdGFydEdhbWUiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIkV4aXRfQnVzaW5lc3NTZXR1cCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIkdldFR1cm5OdW1iZXIiLCJEYXRhIiwiYmFua3J1cHRlZCIsInR1cm4iLCJQbGF5ZXJEYXRhTWFpbiIsIlN0YXJ0VHVybkFmdGVyQmFua3J1cHQiLCJlcnJvciIsIlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUGF5QW1vdW50VG9QbGF5R2FtZSIsIklzQm90IiwiaXNhY3RpdmUiLCJVcGRhdGVUaW1lciIsImNsZWFyVGltZW91dCIsIlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uIiwiX3BsYXllckluZGV4IiwibWFya2V0aW5nQW1vdW50IiwiTWFya2V0aW5nQW1vdW50IiwiT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIkxhd3llclN0YXR1cyIsIm9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJnZW5lcmF0ZWRMZW5ndGgiLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCIsIlJvbGxUd29EaWNlcyIsIkFzc2lnbkRhdGFfSW52ZXN0U2VsbCIsIk9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJfaXNUdXJuT3ZlciIsIlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCIsIlJvbGxPbmVEaWNlIiwiT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR29sZENvdW50IiwiT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlN0b2NrQ291bnQiLCJPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJFbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwIiwiT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiUm9sbERpY2UiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJ2YWx1ZSIsIlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAiLCJfbWFuYWdlciIsIl90ZW1wRGF0YSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldE5hbWUiLCJTZXRUeXBlIiwiU2V0QnVzaW5lc3NJbmRleCIsIl90b3RhbExvY2F0aW9ucyIsIkxvY2F0aW9uc05hbWUiLCJTZXRCdXNpbmVzc01vZGUiLCJTZXRNb2RlIiwiU2V0QnVzaW5lc3NWYWx1ZSIsIlNldEZpbmFsQnVzaW5lc3NWYWx1ZSIsIl9hbGxMb2NhdGlvbnNBbW91bnQiLCJfZmluYWxBbW91bnQiLCJTZXRCYWxhbmNlIiwiU2V0TG9jYXRpb25zIiwiSXNQYXJ0bmVyc2hpcCIsIlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uIiwiU2V0UGFydG5lck5hbWUiLCJQYXJ0bmVyTmFtZSIsIkVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cCIsIl9tc2ciLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJFeGl0X1BhcnRuZXJTaGlwU2V0dXAiLCJkZXN0cm95IiwiUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAiLCJfYWN0b3IiLCJfdHVybiIsIlR1cm4iLCJfcGxheWVyRGF0YSIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJTZWxlY3RlZEJ1c2luc2Vzc0luZGV4IiwiX2J1c2luZXNzVmFsdWUiLCJCdXNWYWx1ZSIsIl9wYXlBbW91bnQiLCJfYnVzaW5lc3NNb2RlIiwiQ2hlY2tTcGVjdGF0ZSIsIkFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWxsQWN0b3JzIiwiUm9vbUFjdG9ycyIsIm15SW5kZXgiLCJHZXRNeUluZGV4IiwiUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJDYW5jZWxPZmZlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2lzQWNjZXB0ZWQiLCJfcGF5bWVudCIsIl9pc0NhbmNlbGxlZCIsIl91SUQiLCJfbWFpbkRhdGEiLCJBY2NlcHRlZCIsIkNhc2hQYXltZW50IiwiQ2FuY2VsbGVkIiwiQnVzaW5lc3NJbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWNjZXB0ZWQiLCJfY2FzaCIsIl9jYW5jZWxsZWQiLCJfdWlkIiwiUGFydG5lcklEIiwiaW5jbHVkZXMiLCJSZXNldEdvbGRJbnB1dCIsIm9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsIiwiVXBkYXRlRGF0YV9JbnZlc3RTZWxsIiwiX3RpdGxlIiwiX2RpY2VSZXN1bHQiLCJfcHJpY2VUaXRsZSIsIl9wcmljZVZhbHVlIiwiX2J1eU9yU2VsbFRpdGxlIiwiX3RvdGFsQW1vdW50VGl0bGUiLCJfdG90YWxBbW91bnRWYWx1ZSIsIl9idXR0b25OYW1lIiwiQXBwbHlCdXR0b25fSW52ZXN0U2VsbCIsIl9Ub3RhbEFtb3VudCIsIlJhaXNlRXZlbnRUb1N5bmNJbmZvIiwiRXhpdEJ1dHRvbl9JbnZlc3RTZWxsIiwiVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSIsIlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSIsIlVwZGF0ZUJ1dHRvbnNfUGF5RGF5IiwibG9hblRha2VuIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwiR2V0TG9hbkFtb3VudF9QYXlEYXkiLCJfbG9hbiIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiX2lzRG91YmxlUGF5RGF5IiwiX3NraXBITSIsIl9za2lwQk0iLCJfaXNCb3QiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9oTUFtb3VudCIsIl9ibUFtb3VudCIsIl9ibUxvY2F0aW9uIiwiUGF5ZGF5Q291bnRlciIsIkRvdWJsZVBheUNvdW50ZXIiLCJfcmVzIiwiX3RpbWUiLCJVcGRhdGVDYXNoX1BheURheSIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGF5RGF5Q29tcGxldGVkIiwiT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RvdWJsZVBheURheSIsIl9kaWNlIiwiX2Ftb3VudFRvQmVTZW5kIiwiX2Ftb3VudFRvQmVBZGp1c3RlZCIsIl9tdWx0aXBsaWVyIiwiX3BheWRheW11bHRpcGxpZXIiLCJTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiUmVjZWl2ZVBheW1lbnRfUGF5RGF5IiwiX2xvY2F0aW9ucyIsIl9Fc3RpbWF0ZUxvYW4iLCJTa2lwTG9hbk9uZVRpbWVfUGF5RGF5IiwiU2VsbEJ1c2luZXNzX1BheURheSIsIkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0TG9hblNjcmVlbl9QYXlEYXkiLCJTdGFydE5ld0dhbWVfUGF5RGF5IiwiZW1pdCIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJUb2dnbGVQYXlEYXkiLCJCYW5rcnVwdF9UdXJuRGVjaXNpb24iLCJTaG93SW5mbyIsImluZm8iLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsImNhbGxVcG9uQ2FyZCIsIlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwIiwiU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwIiwiUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkFtb3VudCIsIlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbiIsIlNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwIiwiU2VsZWN0QnVzaW5lc3Nmb3JQYXlEYXkiLCJfaXNUdXJub3ZlciIsIkVuYWJsZU1hbmlwaWxhdGlvblNjcmVlbl9fQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkiLCJUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwiU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNob3dRdWVzdGlvblRvYXN0IiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfbXlEYXRhIiwiX2FjdG9yc0RhdGEiLCJfbW9kZUluZGV4IiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIm1lc3NhZ2UiLCJ0aW1lIiwiX2hhc2J1dHRvbiIsIlNlbGZUb2FzdCIsIm1vZGUiLCJDb21wbGV0ZVRvYXN0IiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9zdGF0dXMiLCJSZXN0YXJ0VGhlR2FtZSIsIlJlc3RhcnRHYW1lIiwiX2RhdGFJbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtBQUNBLElBQUlDLDhCQUE4QixHQUFHLEVBQXJDO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLElBQXRCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsS0FBL0I7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxzQkFBc0IsR0FBRyxLQUE3QjtBQUNBLElBQUlDLFFBQVEsR0FBRyxDQUFmO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxX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ZXIgPSBudWxsO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxudmFyIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxudmFyIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG52YXIgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxudmFyIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgQ2FuY2VsbGVkSUQgPSBbXTtcclxudmFyIFN0YXJ0R2FtZUNhc2ggPSAyMDAwMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxudmFyIEhNQW1vdW50ID0gMDtcclxudmFyIEJNQW1vdW50ID0gMDtcclxudmFyIEJNTG9jYXRpb25zID0gMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbnZhciBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG52YXIgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbnZhciBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxudmFyIFByZXZpb3VzQ2FzaCA9IDA7XHJcbnZhciBUaW1lb3V0UmVmO1xyXG52YXIgQ29tcGxldGlvbldpbmRvd1RpbWUgPSA4MDAwO1xyXG52YXIgTG9uZ01lc3NhZ2VUaW1lID0gNTAwMDtcclxudmFyIFNob3J0TWVzc2FnZVRpbWUgPSAyNTAwO1xyXG52YXIgZ2xvYmFsVHVyblRpbWVyID0gMzA7XHJcbnZhciBQYXlEYXlJbmZvID0gXCJcIjtcclxudmFyIEludmVzdFNlbGxJbmZvID0gXCJcIjtcclxudmFyIFRpbWVyVGltZW91dDtcclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG4vLyB2YXIgU2hvcnRNZXNzYWdlVGltZSA9IDUwOy8vMjUwMFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgYW1vdW50IG9mIGxvYW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIExvYW5BbW91bnRFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBUZW5UaG91c2FuZDogMTAwMDAsXHJcbiAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gIEZvcnR5VGhvdXNhbmQ6IDQwMDAwLFxyXG4gIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gIE90aGVyOiA2LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBjYXNoXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgYnVzaW5lc3MgdHlwZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhck5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIixcclxuICAgIH0sXHJcbiAgICBUaW1lck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHRpbWVyIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5TZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IExvYW5BbW91bnRFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgYWxsIGxhYmVscyBvZiBhbW91bnRzIGluIGxvYW4gVUlcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkIENhc2ggYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaFNjcmVlbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaCBsYWJlbCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZENhc2ggZWRpdEJveCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHVybkRlY2lzaW9uU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlR1cm5EZWNpc2lvblNldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFya2V0aW5nRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgbWFya2V0aW5nIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBHb2xkRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBnb2xkIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTdG9ja0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IHN0b2NrIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byBjYXNoIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4cG5hZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyVGV4dDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclRleHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGxhYmVsIG9mIHRpbWVyIHRleHQgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgICBCbG9ja2VyTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCbG9ja2VyTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBub2RlIG9mIGJsb2NrZXIgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdG9ja0ludmVzdDogMSxcclxuICBHb2xkSW52ZXN0OiAyLFxyXG4gIFN0b2NrU2VsbDogMyxcclxuICBHb2xkU2VsbDogNCxcclxuICBPdGhlcjogNSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RTZWxsVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZSBSZXN1bHQgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIHZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1eU9yU2VsbFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXlPclNlbGwgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXR0b25OYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV0dG9uTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgYnV0dG9uIG5hbWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFN0YXRlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkludmVzdFN0YXRlXCIsXHJcbiAgICAgIHR5cGU6IEludmVzdEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IEludmVzdEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEFtb3VudEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50RWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsbEJ1c2luZXNzVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2VsbFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGF5RGF5VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWROdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxvY2F0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhc3NlZFBheURheUNvdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFBhc3NlZFBheURheUNvdW50TGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTUJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhckJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIE1haW5QYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBNYWluUGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0UGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5SZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuUmVzdWx0UGFuZWxOb2RlIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTY3JlZW5UaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFNjcmVlblRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRTY3JlZW5UaXRsZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2VSZXN1bHQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQnVzaW5lc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEJ1c2luZXNzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNraXBMb2FuQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBMb2FuQnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNraXBMb2FuQnV0dG9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuRm90dGVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkZvdHRlckxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuRm90dGVyTGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlPclNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgT25lUXVlc3Rpb25VSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgT25lUXVlc3Rpb25VSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk9uZVF1ZXN0aW9uVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJEZXRhaWxMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJEZXRhaWxMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERldGFpbHNQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGV0YWlsc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBEZXRhaWxzUHJlZmFiIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIFNjcm9sbENvbnRlbnQgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBub2RlIFdhaXRpbmdTY3JlZW4gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW5MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU2NyZWVuTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbkxhYmVsIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIHF1ZXN0aW9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUmVzdWx0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJlc3VsdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUmVzdWx0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBSZXN1bHRTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0U2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RhdHVzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQm9keUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJvZHlMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xOyAvLy0xIG1lYW5zIG5ldyBidXNpbmVzcyBpcyBub3QgaW5zdGFudGlhbHRlZCBmcm9tIGluc2lkZSBnYW1lICwgaWYgaXQgaGFzIGFueSBvdGhlciB2YWx1ZSBpdCBtZWFucyBpdHMgYmVlbiBpbnN0YW50aWF0ZWQgZnJvbSBpbnNpZGUgZ2FtZSBhbmQgaXRzIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggb2YgcGxheWVyXHJcblxyXG4vL3R1cm4gZGVjaXNpb25zXHJcbnZhciBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxudmFyIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4vL2J1eW9yc2VsbFxyXG52YXIgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxudmFyIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxudmFyIERpY2VSZXN1bHQ7XHJcbnZhciBPbmNlT3JTaGFyZTtcclxudmFyIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG52YXIgSEJEaWNlQ291bnRlciA9IDA7XHJcbnZhciBCTURpY2VDb3VudGVyID0gMDtcclxuXHJcbnZhciBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIExvYW5QYXllZCA9IGZhbHNlO1xyXG52YXIgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG52YXIgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lcGxheVVJTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBCdXNpbmVzc1NldHVwRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBCdXNpbmVzc1NldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybkRlY2lzaW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBUdXJuRGVjaXNpb25TZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBJbnZlc3RTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQYXlEYXlVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxsQnVzaW5lc3NVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxsQnVzaW5lc3NVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEludmVzdFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQnV5T3JTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnV5T3JTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IE9uZVF1ZXN0aW9uVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgT25lUXVlc3Rpb25VSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJzaGlwU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUGFydG5lcnNoaXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBQYXJ0bmVyc2hpcFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUmVzdWx0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUmVzdWx0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlCdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TcGFjZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsXHJcbiAgICB9LFxyXG4gICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBdmF0YXJTcHJpdGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFJlc2V0cyB0aGlzIGNsYXNzIGdsb2JhbCB2YXJpYWJsZXMgYW5kIG90aGVyIG5lY2Vzc2FyeSBkYXRhIG9uTG9hZFxyXG4gICAqKi9cclxuICBSZXNldEFsbERhdGEoKSB7XHJcbiAgICBHYW1lTWFuYWdlciA9IG51bGw7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG4gICAgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgICBQYXJ0bmVyU2hpcERhdGEgPSBudWxsO1xyXG4gICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICBDYW5jZWxsZWRJRCA9IFtdO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IGZhbHNlO1xyXG4gICAgSE1BbW91bnQgPSAwO1xyXG4gICAgQk1BbW91bnQgPSAwO1xyXG4gICAgQk1Mb2NhdGlvbnMgPSAwO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMDtcclxuICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gZmFsc2U7XHJcbiAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgUHJldmlvdXNDYXNoID0gMDtcclxuICAgIFRpbWVvdXRSZWYgPSBudWxsO1xyXG5cclxuICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbiAgICAvL3R1cm4gZGVjaXNpb25zXHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4gICAgLy9idXlvcnNlbGxcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgICBEaWNlUmVzdWx0ID0gMDtcclxuICAgIE9uY2VPclNoYXJlO1xyXG4gICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbiAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG4gICAgSEJEaWNlQ291bnRlciA9IDA7XHJcbiAgICBCTURpY2VDb3VudGVyID0gMDtcclxuICAgIFBheURheUluZm8gPSBcIlwiO1xyXG4gICAgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVzZXRzIHR1cm4gdmFyaWFibGVzIGZvciBnb2xkaW52ZXN0L2dvbGRzb2xkL3N0b2tjaW52ZXN0L3N0b2Nrc29sZFxyXG4gICAqKi9cclxuICBSZXNldFR1cm5WYXJpYWJsZSgpIHtcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjaGVjayByZWZlcmVuY2VzIG9mIGNsYXNzL2VzIG5lZWRlZC5cclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlciA9PSBudWxsKSBHYW1lTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHRoaXMgbm9kZSBnZXRzIGFjdGl2ZVxyXG4gICAqKi9cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHRoaXMgbm9kZSBnZXRzIGRlYWN0aXZlXHJcbiAgICoqL1xyXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiU3luY0RhdGFcIiwgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGUgY2xhc3MgaXMgbG9hZGVkXHJcbiAgICoqL1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuUmVzZXRBbGxEYXRhKCk7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG5cclxuICAgIC8vZGVjbGFyaW5nIGxvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gMDtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5Q291bnQgPSAwO1xyXG4gICAgdGhpcy5Jc0JhbmtydXB0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IDA7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgdGhpcy5UaW1lciA9IDA7XHJcbiAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgVGltZXJUaW1lb3V0ID0gbnVsbDtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKGZhbHNlKTtcclxuICB9LFxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gIEluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgLy8gY29uc29sZS50cmFjZShcImNsb3NlZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkXCIpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgIH0sIDUwMCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1c2luZXNzU2V0dXAgd2l0aCBsb2FuXHJcbiAgLy9CdXNpbmVzcyBzZXR1cCB1aS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIHRoaXMuVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwKHRydWUpO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25DYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChfdmFsKSB7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIE9uQ2xpY2tEb25lQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cChmYWxzZSk7XHJcbiAgICB2YXIgX2dhbWVjYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgdmFyIF9hbW91bnQgPSBwYXJzZUludCh0aGlzLkFkZENhc2hBbW91bnQpO1xyXG4gICAgaWYgKHRoaXMuQWRkQ2FzaEFtb3VudCAhPSBudWxsICYmIHRoaXMuQWRkQ2FzaEFtb3VudCAhPSBcIlwiICYmIHRoaXMuQWRkQ2FzaEFtb3VudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKF9hbW91bnQgPD0gX2dhbWVjYXNoKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2gudG9TdHJpbmcoKTtcclxuICAgICAgICBfZ2FtZWNhc2ggLT0gX2Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF9nYW1lY2FzaC50b1N0cmluZygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoLCAtMSwgLTEpO1xyXG5cclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIkNhc2ggJFwiICsgdGhpcy5BZGRDYXNoQW1vdW50ICsgXCIgaGFzIGJlZW4gYWRkZWQuXCIpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvIG5vdCBoYXZlIGVub3VnaCBpbiBnYW1lIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUgPSBmYWxzZSwgbW9kZUluZGV4ID0gMCwgX2lzQmFua3J1cHRlZCA9IGZhbHNlLCBfQmFua3J1cHRBbW91bnQgPSAwLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICAvL2NhbGxlZCBmaXJzdCB0aW1lIGZvcm0gR2FtZU1hbmFnZXIgb25sb2FkIGZ1bmN0aW9uXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuXHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IF9pc0JhbmtydXB0ZWQ7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSBfQmFua3J1cHRBbW91bnQ7XHJcblxyXG4gICAgaWYgKF9pc0JhbmtydXB0ZWQpIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuXHJcbiAgICB0aGlzLkluaXRfQnVzaW5lc3NTZXR1cChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSwgbW9kZUluZGV4LCBfaXNCYW5rcnVwdGVkKTtcclxuICB9LFxyXG4gIEluaXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lID0gZmFsc2UsIG1vZGVJbmRleCA9IDAsIF9pc0JhbmtydXB0ZWQgPSBmYWxzZSkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FyZEZ1bmN0aW9uYWxpdHkgPSBuZXcgR2FtZU1hbmFnZXIuQ2FyZERhdGFGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmU7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZEJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGlzRmlyc3RUaW1lKSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gU3RhcnRHYW1lQ2FzaDtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5SZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgaWYgKGluc2lkZUdhbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSBpbmRleDtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgICAgIGlmIChCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICAgICAgaWYgKFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICAgIFByZXZpb3VzQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IDA7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBQcmV2aW91c0Nhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBHaXZlbkNhc2hCdXNpbmVzcztcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWUpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5hdmF0YXJJZCkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgR2V0T2JqX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChuYW1lKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgIGlmIChpc05hTihVSUQpIHx8IFVJRCA9PSB1bmRlZmluZWQpIFVJRCA9IDA7XHJcblxyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQXZhdGFySUQgPSBVSUQ7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIFJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gXCJcIjtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lO1xyXG4gIH0sXHJcbiAgT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gIH0sXHJcbiAgT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcjtcclxuICB9LFxyXG4gIE9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBhbW91bnQ7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gYW1vdW50O1xyXG4gIH0sXHJcbiAgQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2xvYW5UYWtlbikge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgYWxyZWFkeSB0YWtlbiBsb2FuIG9mICRcIiArIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIFJlcXVpcmVkQ2FzaCA9IE1hdGguYWJzKHBhcnNlSW50KFBsYXllckRhdGFJbnRhbmNlLkNhc2gpIC0gYW1vdW50KTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIkXCIgKyBSZXF1aXJlZENhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoNTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBidXNpbmVzcyBiZXR3ZWVuIEhvbWUgQmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IHRha2UgbG9hbiBmb3IgY3VycmVudCBidXNpbmVzcyBzZXR1cFwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGluZGV4ID09IGkpIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgfSxcclxuICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID09IExvYW5BbW91bnRFbnVtLk90aGVyKSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBSZXF1aXJlZENhc2g7XHJcbiAgICBlbHNlIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IHBhcnNlSW50KHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCk7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgdGhpcy5PbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCArIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgfSxcclxuXHJcbiAgUHVzaERhdGFGb3JQbGF5ZXJMZWZ0KF9kYXRhKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkNhc2ggPSAyMDAwMDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLlBsYXllcklEID0gX2RhdGEudXNlcklEO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZSA9IF9kYXRhLm5hbWU7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5BdmF0YXJJRCA9IDA7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPSAxO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkNhcmRGdW5jdGlvbmFsaXR5ID0gbmV3IEdhbWVNYW5hZ2VyLkNhcmREYXRhRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQ7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID0gXCJTYWxvb25cIjtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID0gXCJFdmEgQmVhdXR5XCI7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsIF9wbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBTeW5jRGF0YTogZnVuY3Rpb24gKF9kYXRhLCBfSUQsIF9wbGF5ZXJMZWZ0ID0gZmFsc2UpIHtcclxuICAgIHZhciBfaXNTcGVjdGF0ZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXTtcclxuXHJcbiAgICBpZiAoX2lzU3BlY3RhdGUpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFfcGxheWVyTGVmdCkge1xyXG4gICAgICBpZiAoX0lEICE9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5hY3Rvck5yKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChfZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMpIHtcclxuICAgICAgLy9zZXR0aW5nIHJvb20gcHJvcGVydHkgdG8gZGVjbGFyZSBpbml0aWFsIHNldHVwIGhhcyBiZWVuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8sIHRydWUpO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQdXJjaGFzZUJ1c2luZXNzOiBmdW5jdGlvbiAoX2Ftb3VudCwgX2J1c2luZXNzTmFtZSwgX2lzSG9tZUJhc2VkKSB7XHJcbiAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA8IF9hbW91bnQgJiYgIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vdCBlbm91Z2ggY2FzaCB0byBidXkgdGhpcyBcIiArIF9idXNpbmVzc05hbWUgKyBcIiBidXNpbmVzcy5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChfaXNIb21lQmFzZWQpIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50IDwgMykge1xyXG4gICAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBfYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50Kys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBIb21lIGJhc2VkIGJ1c2luZXNzZXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lID0gdHJ1ZTtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ccmlja0FuZE1vcnRhckFtb3VudCsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuKSB7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUmV2ZXJ0aW5nIGJhY2sgbG9hbiBhbW91bnQuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUHJldmlvdXNDYXNoO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9tb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuSXNCYW5rcnVwdCA9IHRydWU7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJhbmtydXB0QW1vdW50ID0gdGhpcy5CYW5rcnVwdGVkQW1vdW50O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgLy9zZXR0aW5nIHBsYXllciBjdXJyZW50IGRhdGEgaW4gY3VzdG9tIHByb3BlcnRpZXMgd2hlbiBoaXMvaGVyIHR1cm4gb3ZlcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgUGxheWVyRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMSwgUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBiYW5rcnVwdGVkOiB0cnVlLCB0dXJuOiBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpLCBQbGF5ZXJEYXRhTWFpbjogUGxheWVyRGF0YUludGFuY2UgfSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoOSwgX2RhdGEpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBBSVxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuICAgICAgICB9LCAxNjAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIm5vIG1vZGUgc2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUHJldmlvdXNDYXNoO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFBheUFtb3VudFRvUGxheUdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPT0gXCJcIikgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyB0eXBlLlwiKTtcclxuICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID09IFwiXCIpIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZSB8fCBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBzZWxlY3QgYSBidXNpbmVzc1wiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZClcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGhvbWViYXNzZWRcclxuICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoMTAwMDAsIFwiaG9tZVwiLCB0cnVlKTtcclxuICAgICAgZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcilcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGJyaWNrIGFuZCBtb3J0YXJcclxuICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoNTAwMDAsIFwiYnJpY2sgYW5kIG1vcnRhclwiLCBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5TdGFydEdhbWUgPT0gdHJ1ZSB8fCB0aGlzLklzQmFua3J1cHRlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLnB1c2goUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICAgIGlmIChJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCAhPSAtMSkge1xyXG4gICAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIG5vdCBiZWVuIGNhbGxlZCBmcm9tIGluc2lkZSBnYW1lXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBiZWVuIGNhbGxlZCBhdCBzdGFydCBvZiBnYW1lIGFzIGluaXRpYWwgc2V0dXBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHJ0aW50aW5nIGFsbCB2YWx1ZXMgdG8gY29uc29sZVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBuYW1lOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIElEOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJJcyBwbGF5ZXIgYm90OiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Jc0JvdCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIG9mIGJ1c2luZXNzIG9mIHBsYXllciAoc2VlIGJlbG93KTogXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjYXNoOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5DYXNoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIHRha2VuIGxvYW46IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5UYWtlbik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2VuIGxvYW4gYW1vdW50OiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuQW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gVHVybkRlY2lzaW9uU2V0dXBVSVxyXG4gIC8vVHVybkRlY2lzaW9uU2V0dXBVSS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoaXNhY3RpdmUpIHtcclxuICAgIHRoaXMuRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gaXNhY3RpdmU7XHJcblxyXG4gICAgaWYgKGlzYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UaW1lciA9IGdsb2JhbFR1cm5UaW1lcjtcclxuICAgICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IHRoaXMuVGltZXIgKyBcIiBzZWNvbmRzIGFyZSBsZWZ0IHRvIGNob29zZSBhYm92ZSBvcHRpb25zIGV4Y2VwdCAnUm9sbCBUaGUgRGljZSdcIjtcclxuICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVyVGltZW91dCk7XHJcbiAgICAgIHRoaXMuVGltZXIgPSAwO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVGltZXIoKSB7XHJcbiAgICBpZiAodGhpcy5UaW1lciA+IDApIHtcclxuICAgICAgdGhpcy5UaW1lci0tO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IHRoaXMuVGltZXIgKyBcIiBzZWNvbmRzIGFyZSBsZWZ0IHRvIGNob29zZSBhYm92ZSBvcHRpb25zIGV4Y2VwdCAnUm9sbCBUaGUgRGljZSdcIjtcclxuICAgICAgVGltZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVGltZXIgPSAwO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IFwiVGltZXIgaXMgb3ZlciwgeW91IGNhbiBzZWxlY3Qgb25seSAnUm9sbCBUaGUgRGljZScgbm93LlwiO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQmxvY2tlck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkNhc2hBbW91bnRMYWJlbC5zdHJpbmcgPSBcIiQgXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0uQ2FzaDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoVGVtcE1hcmtldGluZ0Ftb3VudCA9PSBcIlwiIHx8IFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHRoaXMubWFya2V0aW5nQW1vdW50ID0gcGFyc2VJbnQoVGVtcE1hcmtldGluZ0Ftb3VudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG5cclxuICAgICAgLy9pZiBwbGF5ZXIgZW50ZXJlZCBhbW91bnQgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIGNhc2ggaGUgb3duc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0aGlzLm1hcmtldGluZ0Ftb3VudCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ICsgdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcInlvdSBzdWNjZXNzZnVsbHkgbWFya2V0ZWQgYW1vdW50IG9mICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCArIFwiICwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFwiLlwiLFxyXG4gICAgICAgICAgTG9uZ01lc3NhZ2VUaW1lXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gaWYgcGxheWVyIGhhcyBtb3JlIHRoYW4gNTAwMCRcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cykge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gNTAwMCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgVGVtcEhpcmluZ0xhd3llciA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coVGVtcEhpcmluZ0xhd3llcik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSA1MDAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICsgXCIuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSkge1xyXG4gICAgTG9jYXRpb25OYW1lID0gX25hbWU7XHJcbiAgfSxcclxuICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQgPSBudWxsLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICAvL2lmIHBsYXllciBoYXMgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBoZSBjb3VsZCBleHBhbmQgaXRcclxuICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzXCIpO1xyXG5cclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuXHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB2YXIgZ2VuZXJhdGVkTGVuZ3RoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5LCBHaXZlbkNhc2hCdXNpbmVzcywgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKTtcclxuXHJcbiAgICBpZiAoZ2VuZXJhdGVkTGVuZ3RoID09IDApIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBubyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIHRvIGV4cGFuZC5cIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH0sIDE2MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzcyBleGl0IGNhbGxlZFwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgbmV3IGJ1c2luZXNzXCIpO1xyXG4gICAgdGhpcy5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBPbkdvbGREaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkSW52ZXN0ZWQpIHtcclxuICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uR29sZEludmVzdDtcclxuICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiSW52ZXN0IEluIEdPTERcIiwgRGljZVJlc3VsdCwgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJCVVlcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICBPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQgPSBudWxsLCBfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICBUdXJuT3ZlckZvckludmVzdCA9IF9pc1R1cm5PdmVyO1xyXG5cclxuICAgIGNvbnNvbGUuZXJyb3IoX2lzVHVybk92ZXIpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdCkgU3RvY2tCdXNpbmVzc05hbWUgPSBcIkZyaWVuZCdzIEJ1c2luZXNzXCI7XHJcblxyXG4gICAgaWYgKCF0aGlzLlN0b2NrSW52ZXN0ZWQgfHwgVHVybk92ZXJGb3JJbnZlc3QpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChTdG9ja0J1c2luZXNzTmFtZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhIGJ1c2luZXNzIG5hbWUgdG8gaW52ZXN0LlwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tJbnZlc3Q7XHJcblxyXG4gICAgICAgIGlmICghVHVybk92ZXJGb3JJbnZlc3QpIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgZWxzZSBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcblxyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiSW52ZXN0IGluIFN0b2NrXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBTaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIEJVWVwiLCBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiQlVZXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZFNvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiU2VsbCBHT0xEXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIFNFTExcIiwgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJTRUxMXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgR09MRCBvdW5jZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5TdG9ja1NvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ID4gMCkge1xyXG4gICAgICAgIHRoaXMuU3RvY2tTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLlN0b2NrU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiU2VsbCBTVE9DS1wiLCBEaWNlUmVzdWx0LCBcIkVhY2ggc2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvc2hhcmVcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBTRUxMXCIsIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiU0VMTFwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IHNoYXJlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZ28gaW50byBwYXJ0bmVyIHNoaXBcIik7XHJcbiAgICAvLyB0aGlzLlNob3dUb2FzdChcIndvcmsgaW4gcHJvZ3Jlc3MsIGNvbWluZyBzb29uLi4uXCIpO1xyXG4gICAgLy8gdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdGhpcy5FbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgfSxcclxuXHJcbiAgT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInJvbGwgdGhlIGRpY2VcIik7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbihmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbERpY2UoKTtcclxuICB9LFxyXG5cclxuICBQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgLy90aGlzLlRlbXBEaWNlVGV4dC5zdHJpbmc9dmFsdWU7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBhcnRuZXJzaGlwIHNldHVwXHJcbiAgVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5NYWluU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5XYWl0aW5nU3RhdHVzU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICBDYW5jZWxsZWRJRCA9IFtdO1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyTmFtZS5zdHJpbmcgPSBfdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBsYXllckNhc2guc3RyaW5nID0gXCIkXCIgKyBfdGVtcERhdGEuQ2FzaDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QYXJ0bmVyU2hpcFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICB2YXIgX3RvdGFsTG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgICB2YXIgX2FsbExvY2F0aW9uc0Ftb3VudCA9IF90b3RhbExvY2F0aW9ucyAqIDI1MDAwO1xyXG4gICAgICAgIHZhciBfZmluYWxBbW91bnQgPSA1MDAwMCArIF9hbGxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5QYXJ0bmVyTmFtZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbih0cnVlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKFwibm9uZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWUuc3RyaW5nID0gX3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllckNhc2guc3RyaW5nID0gXCIkXCIgKyBfdGVtcERhdGEuQ2FzaDtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uRGVzY3JpcHRpb24uc3RyaW5nID0gX21zZztcclxuICB9LFxyXG5cclxuICBFeGl0X1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKSB7XHJcbiAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gX2RhdGE7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkgX2J1c2luZXNzTW9kZSA9IFwiSG9tZSBCYXNlZFwiO1xyXG4gICAgZWxzZSBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSBfYnVzaW5lc3NNb2RlID0gXCJCcmljayAmIE1vcnRhclwiO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX21zZyA9XHJcbiAgICAgICAgXCJ5b3UgaGF2ZSByZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBieSBcIiArXHJcbiAgICAgICAgX3BsYXllckRhdGEuUGxheWVyTmFtZSArXHJcbiAgICAgICAgXCIgLCBmb2xsb3dpbmcgYXJlIHRoZSBkZXRhaWxzIG9mIGJ1c2luZXNzOiBcIiArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBOYW1lOiBcIiArXHJcbiAgICAgICAgX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzTmFtZSArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBNb2RlOiBcIiArXHJcbiAgICAgICAgX2J1c2luZXNzTW9kZSArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBWYWx1ZTogJFwiICtcclxuICAgICAgICBfYnVzaW5lc3NWYWx1ZSArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJDYXNoIFBheW1lbnQ6ICRcIiArXHJcbiAgICAgICAgX3BheUFtb3VudCArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJpZiBvZmZlciBpcyBhY2NlcHRlZCB5b3Ugd2lsbCByZWNlaXZlIDUwJSBzaGFyZSBvZiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MgYW5kIHdpbGwgcmVjZWl2ZSBwcm9maXQvbG9zZSBvbiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MuXCI7XHJcblxyXG4gICAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cChfbXNnKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIHZhciBteUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgIGlmIChQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCA+PSBfcGF5QW1vdW50KSB7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCAtPSBfcGF5QW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKHRydWUsIF9wYXlBbW91bnQsIGZhbHNlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiY29uZ3JhdHVsYXRpb25zISB5b3UgaGF2ZSBzdGFydGVkIGJ1c2luZXNzIHBhcnRuZXJzaGlwXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiTm90IGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2RhdGEgPSBQYXJ0bmVyU2hpcERhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBteUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG4gICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlEKTtcclxuICAgIGlmIChQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKGZhbHNlLCAwLCB0cnVlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2lzQWNjZXB0ZWQgPSBmYWxzZSwgX3BheW1lbnQgPSAwLCBfaXNDYW5jZWxsZWQgPSBmYWxzZSwgX3VJRCA9IFwiXCIsIF9kYXRhID0gbnVsbCwgX2J1c2luZXNzSW5kZXggPSAwKSB7XHJcbiAgICB2YXIgX21haW5EYXRhID0geyBEYXRhOiB7IEFjY2VwdGVkOiBfaXNBY2NlcHRlZCwgQ2FzaFBheW1lbnQ6IF9wYXltZW50LCBDYW5jZWxsZWQ6IF9pc0NhbmNlbGxlZCwgUGxheWVySUQ6IF91SUQsIFBsYXllckRhdGE6IF9kYXRhLCBCdXNpbmVzc0luZGV4OiBfYnVzaW5lc3NJbmRleCB9IH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEyLCBfbWFpbkRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHZhciBfYWNjZXB0ZWQgPSBfZGF0YS5EYXRhLkFjY2VwdGVkO1xyXG4gICAgICB2YXIgX2Nhc2ggPSBfZGF0YS5EYXRhLkNhc2hQYXltZW50O1xyXG4gICAgICB2YXIgX2NhbmNlbGxlZCA9IF9kYXRhLkRhdGEuQ2FuY2VsbGVkO1xyXG4gICAgICB2YXIgX3VpZCA9IF9kYXRhLkRhdGEuUGxheWVySUQ7XHJcbiAgICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5CdXNpbmVzc0luZGV4O1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJhbnN3ZXIgcmVjZWl2ZWRcIik7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIGlmIChfYWNjZXB0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9jYXNoO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXAgPSB0cnVlO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCA9IF91aWQ7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lck5hbWUgPSBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XSk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciBhY2NlcHRlZFwiKTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXJ0bmVyc2hpcCBvZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBcIiArIF9wbGF5ZXJEYXRhLlBsYXllck5hbWUgKyBcIiwgY2FzaCAkXCIgKyBfY2FzaCArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgYWNjb3VudC5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5pbmNsdWRlcyhfdWlkKSA9PSBmYWxzZSkgQ2FuY2VsbGVkSUQucHVzaChfdWlkKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhDYW5jZWxsZWRJRCk7XHJcbiAgICAgICAgICBpZiAoQ2FuY2VsbGVkSUQubGVuZ3RoID09IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGNhbmNlbGxlZCBieSBhbGwgb3RoZXIgdXNlcnMuXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgcmVqZWN0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfYWNjZXB0ZWQpIHtcclxuICAgICAgICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IGFuZCBzZWxsIG1vZGR1bGVcclxuXHJcbiAgUmVzZXRHb2xkSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuR29sZEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuU3RvY2tFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgb25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwoX2Ftb3VudCkge1xyXG4gICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gX2Ftb3VudDtcclxuXHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKlwiICsgRW50ZXJCdXlTZWxsQW1vdW50ICsgXCI9XCIgKyBfYW1vdW50KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgdGhpcy5SZXNldEdvbGRJbnB1dCgpO1xyXG4gICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX0ludmVzdFNlbGwoX3RpdGxlLCBfZGljZVJlc3VsdCwgX3ByaWNlVGl0bGUsIF9wcmljZVZhbHVlLCBfYnV5T3JTZWxsVGl0bGUsIF90b3RhbEFtb3VudFRpdGxlLCBfdG90YWxBbW91bnRWYWx1ZSwgX2J1dHRvbk5hbWUsIF9zdGF0ZSkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IF90aXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlUmVzdWx0O1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVRpdGxlTGFiZWwuc3RyaW5nID0gX3ByaWNlVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVmFsdWVMYWJlbC5zdHJpbmcgPSBfcHJpY2VWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV5T3JTZWxsVGl0bGVMYWJlbC5zdHJpbmcgPSBfYnV5T3JTZWxsVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VGl0bGVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXR0b25OYW1lTGFiZWwuc3RyaW5nID0gX2J1dHRvbk5hbWU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlRGF0YV9JbnZlc3RTZWxsKF90b3RhbEFtb3VudFZhbHVlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICB9LFxyXG5cclxuICBBcHBseUJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG5cclxuICAgICAgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEFtb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcblxyXG4gICAgICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIkJ1eWluZyBHT0xEOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBPdW5jZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJQdXJjaGFzZWQgT3VuY2VzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBPdW5jZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICBpZiAoX2Ftb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQpIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCAtPSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIiArIF9hbW91bnQgKyBcIiBvdW5jZXMgb2YgR09MRCBmb3IgICRcIiArIF9Ub3RhbEFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiU2VsbGluZyBHT0xEOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBPdW5jZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJTb2xkIE91bmNlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3IgT3VuY2VzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIEdPTEQgb3VuY2VzLCB5b3Ugb3duIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ICsgXCIgb2YgR09MRCBvdW5jZXNcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEFtb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgKz0gX2Ftb3VudDtcclxuICAgICAgICAgIC8vY2FuIGFkZCBtdWx0aXBsZSBzdG9ja3Mgd2l0aCBidXNpbmVzcyBuYW1lIGluIG9iamVjdCBpZiByZXF1aXJlZFxyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIiArIF9hbW91bnQgKyBcIiBzaGFyZXMgb2YgYnVzaW5lc3MgXCIgKyBTdG9ja0J1c2luZXNzTmFtZSwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiQnV5aW5nIFNUT0NLOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBzaGFyZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJQdXJjaGFzZWQgc2hhcmVzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBzaGFyZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja1NlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcblxyXG4gICAgICAgIGlmIChfYW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQpIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgLT0gX2Ftb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICsgX2Ftb3VudCArIFwiIHNoYXJlcyBvZiBzdG9jayBmb3IgICRcIiArIF9Ub3RhbEFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiU2VsbGluZyBTVE9DSzpcIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBPbmNlT3JTaGFyZSAvIDEwMDAgKyBcIlxcblwiICsgXCJQZXIgc2hhcmUgcHJpY2U6ICRcIiArIE9uY2VPclNoYXJlICsgXCJcXG5cIiArIFwiU29sZCBzaGFyZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIHNoYXJlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBzdG9ja3Mgc2hhcmVzLCB5b3Ugb3duIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArIFwiIG9mIHN0b2NrIHNoYXJlc1wiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRCdXR0b25fSW52ZXN0U2VsbCgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuXHJcbiAgICBpZiAoVHVybk92ZXJGb3JJbnZlc3QpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGF5ZGF5IG9yIERvdWJsZSBwYXkgRGF5XHJcbiAgVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgQk1BbW91bnQsIGxvYW5UYWtlbikge1xyXG4gICAgaWYgKEhNQW1vdW50ID09IDApIHtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQk1BbW91bnQgPT0gMCkge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsb2FuVGFrZW4pIHtcclxuICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRMb2FuQW1vdW50X1BheURheSgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHZhciBfbG9hbiA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW4gPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9sb2FuO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsIF9za2lwSE0gPSBmYWxzZSwgX3NraXBCTSA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSwgX2ZvclNlbGVjdGVkQnVzaW5lc3MgPSBmYWxzZSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDAsIF9oTUFtb3VudCA9IDAsIF9ibUFtb3VudCA9IDAsIF9ibUxvY2F0aW9uID0gMCwgUGF5ZGF5Q291bnRlciA9IDEsIERvdWJsZVBheUNvdW50ZXIgPSAwKSB7XHJcbiAgICBIQkRpY2VDb3VudGVyID0gMDtcclxuICAgIEJNRGljZUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIC8vICAgaWYgKERvdWJsZVBheUNvdW50ZXIgPT0gMCkgRG91YmxlUGF5Q291bnRlciA9IDE7XHJcblxyXG4gICAgLy8gIGlmIChEb3VibGVQYXlEYXkpIERvdWJsZVBheUNvdW50ZXIgPSBEb3VibGVQYXlDb3VudGVyICogMjtcclxuXHJcbiAgICB2YXIgX3JlcyA9IFBheWRheUNvdW50ZXIgKyBEb3VibGVQYXlDb3VudGVyO1xyXG4gICAgUGF5RGF5SW5mbyA9IFwiUGF5RGF5IFJlc3VsdCB3aXRoIG11bHRpcGxpZXI6IFwiICsgX3JlcztcclxuXHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuUGF5RGF5Q291bnQgPSBQYXlkYXlDb3VudGVyO1xyXG4gICAgdGhpcy5Eb3VibGVQYXlEYXlDb3VudCA9IERvdWJsZVBheUNvdW50ZXI7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfaXNEb3VibGVQYXlEYXk7XHJcbiAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB2YXIgX3RpbWUgPSAxODAwO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IF9mb3JTZWxlY3RlZEJ1c2luZXNzO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX1NlbGVjdGVkQnVzaW5lc3NJbmRleDtcclxuICAgIEhNQW1vdW50ID0gX2hNQW1vdW50O1xyXG4gICAgQk1BbW91bnQgPSBfYm1BbW91bnQ7XHJcbiAgICBCTUxvY2F0aW9ucyA9IF9ibUxvY2F0aW9uO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBpZiAoX2lzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwQk0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2FuVGFrZW4gPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgbG9hblRha2VuID0gX2xvYW5UYWtlbjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkTnVtYmVyTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMYWJlbC5zdHJpbmcgPSBCTUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxvY2F0aW9uTGFiZWwuc3RyaW5nID0gQk1Mb2NhdGlvbnM7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuUGFzc2VkUGF5RGF5Q291bnRMYWJlbC5zdHJpbmcgPSB0aGlzLlBheURheUNvdW50O1xyXG5cclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIC8vY2hlY2sgaWYgbG9hbiB3YXMgc2tpcHBlZCBwcmV2aW91c2x5XHJcbiAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHtcclxuICAgICAgdmFyIF9sb2FuID0gdGhpcy5HZXRMb2FuQW1vdW50X1BheURheSgpO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkZvdHRlckxhYmVsLnN0cmluZyA9IFwiKnBheSAkXCIgKyBfbG9hbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICQ1MDAwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwgMCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwSE0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwgQk1BbW91bnQsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIGlmIChfc2tpcEJNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuXHJcbiAgICBpZiAoX3NraXBCTSB8fCBfc2tpcEhNKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0sIF90aW1lICsgMjAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgICB0aGlzLk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgICB0aGlzLk9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIGlmICghSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5Eb3VibGVQYXlEYXlDb3VudCAhPSAwKSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciA9IDIgKiB0aGlzLkRvdWJsZVBheURheUNvdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAxMDAwO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYW1vdW50VG9CZUFkanVzdGVkID4gMCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH1cclxuICAgICAgLy9wYXJ0bmVyc2hpcCBjb2RlXHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIFRvdGFsUGF5RGF5QW1vdW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBITUFtb3VudCAqIF9kaWNlICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcbiAgICAgIGVsc2UgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogKEhNQW1vdW50ICogX2RpY2UpICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IEhNQW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCpcIiArIF9tdWx0aXBsaWVyICsgXCIpLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJIb21lIEJhc2VkIEJ1c2luZXNzOiBcIiArIEhNQW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIGlmICghQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcbiAgICAgIHZhciBfcGF5ZGF5bXVsdGlwbGllciA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9kb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfYW1vdW50ID0gQk1BbW91bnQgKyBCTUxvY2F0aW9ucztcclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG5cclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICAgIGlmIChfZG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuRG91YmxlUGF5RGF5Q291bnQgIT0gMCkge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgPSAyICogdGhpcy5Eb3VibGVQYXlEYXlDb3VudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IF9wYXltZW50IC8gMjtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW2luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYW1vdW50VG9CZUFkanVzdGVkID4gMCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9hbW91bnQgKiBfZGljZSAqIDIwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkO1xyXG4gICAgICBlbHNlIFRvdGFsUGF5RGF5QW1vdW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbXVsdGlwbGllciAqIChfYW1vdW50ICogX2RpY2UpICogMjAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IF9hbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBfYW1vdW50ICsgXCIqXCIgKyBcIjIwMDApLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIF9hbW91bnQgKyBcIipcIiArIFwiMjAwMCpcIiArIF9tdWx0aXBsaWVyICsgXCIpLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJCcmljayAmIE1vcnRhciBCdXNpbmVzczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2UgX0VzdGltYXRlTG9hbiA9IDUwMDA7XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfRXN0aW1hdGVMb2FuKSB7XHJcbiAgICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlUGF5bWVudF9QYXlEYXkoKSB7XHJcbiAgICAvL2FsbFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTa2lwTG9hbk9uZVRpbWVfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBza2lwcGVkIHRoZSBsb2FuIHBheW1lbnQsIGJhbmsgd2lsbCBjYWxsIHVwb24gY29tcGxldGUgbG9hbiBhbW91bnQgb24gbmV4dCBwYXlkYXlcIik7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1BheURheShfYW1vdW50KSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBFeGl0TG9hblNjcmVlbl9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBTdGFydE5ld0dhbWVfUGF5RGF5KCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0LlwiLCAzMDAwLCBmYWxzZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU2hvd0NhcmRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgMzAxMCk7XHJcbiAgfSxcclxuXHJcbiAgU2hvd0luZm8oX2RhdGEpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KF9kYXRhLmluZm8sIDIwMDAsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIFBheURheUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChIb21lQmFzZWRQYXltZW50Q29tcGxldGVkICYmIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCAmJiBMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBheWRheSBkb25lXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKFBheURheUluZm8pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxsICYgbWFuaXB1bGF0ZSBCdXNpbmVzcyBVSVxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTExcIjtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIGVsc2Ugbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVU0lORVNTXCI7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICAvLyBlbHNlXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX2lzQm90KSB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG5cclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90KTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgVUlcclxuICBUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiSU5WRVNUXCI7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICBUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVZIE9SIFNFTExcIjtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzZXR1cCBVaVxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNob3dRdWVzdGlvblRvYXN0KF9tc2cpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW5MYWJlbC5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb25lUXVlc3Rpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgb25lUXVlc3Rpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX21zZykge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nID0gX21zZztcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtZXNzYWdlLCB0aW1lID0gU2hvcnRNZXNzYWdlVGltZSwgX2hhc2J1dHRvbiA9IHRydWUpIHtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Qb3BVcFVJTGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90IG1vZGUgb25seVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+IDAgJiYgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLklzQm90KSB7XHJcbiAgICAgICAgLy8gaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICAvLyAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIC8vICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICAvLyAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDb21wbGV0ZVRvYXN0KCkge1xyXG4gICAgY29uc29sZS5lcnJvcihcImNvbXBsZXRlIHRvYXN0IGNhbGxlZFwiKTtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICB9LFxyXG5cclxuICBTaG93UmVzdWx0U2NyZWVuOiBmdW5jdGlvbiAoX3N0YXR1cywgX2RhdGEpIHtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5SZXN1bHRTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBfc3RhdHVzO1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLkJvZHlMYWJlbC5zdHJpbmcgPSBfZGF0YTtcclxuICB9LFxyXG5cclxuICBSZXN0YXJ0VGhlR2FtZSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jSW5mbyhfZGF0YUluZm8pIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIHZhciBfZGF0YSA9IHsgaW5mbzogX2RhdGFJbmZvIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTUsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX21vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBpbmZvOiBfZGF0YUluZm8gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE1LCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuIl19