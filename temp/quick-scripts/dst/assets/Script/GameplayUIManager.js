
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
var PayDayInfo = "";
var InvestSellInfo = ""; // var CompletionWindowTime = 500;//8000
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
    },
    AvatarSprites: {
      "default": [],
      type: cc.SpriteFrame,
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
    HBDiceCounter = 0;
    BMDiceCounter = 0;
    PayDayInfo = "";
    InvestSellInfo = "";
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
    this.DoublePayDayCount = 0;
    this.IsBankrupted = false;
    this.BankruptedAmount = 0;
    this.AddCashAmount = "";
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
    console.trace("closedddddddddddddddddddddddddddddddddddd");
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
      this.BusinessSetupData.TimerNode.active = true;
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
            _this3.ExitButton_InvestSell();
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
            _this3.ExitButton_InvestSell();
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
            _this3.ExitButton_InvestSell();
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
            _this3.ExitButton_InvestSell();
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
    var _this6 = this;

    //if bankrupted you can start new game
    this.ShowToast("You will lose all progress and start new game from the start.", 3000, false);
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
            _this7.CompleteToast();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiUGF5RGF5SW5mbyIsIkludmVzdFNlbGxJbmZvIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsIkFkZEJ1dHRvbk5vZGUiLCJBZGRDYXNoU2NyZWVuIiwiQWRkQ2FzaExhYmVsIiwiQWRkQ2FzaEVkaXRCb3giLCJjdG9yIiwiQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwic3RyaW5nIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIk1hcmtldGluZ0VkaXRCb3giLCJHb2xkRWRpdEJveCIsIlN0b2NrRWRpdEJveCIsIkNhc2hBbW91bnRMYWJlbCIsIkV4cGFuZEJ1c2luZXNzTm9kZSIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiUHJlZmFiIiwiSW52ZXN0RW51bSIsIlN0b2NrSW52ZXN0IiwiR29sZEludmVzdCIsIlN0b2NrU2VsbCIsIkdvbGRTZWxsIiwiSW52ZXN0U2VsbFVJIiwiVGl0bGVMYWJlbCIsIkRpY2VSZXN1bHRMYWJlbCIsIlByaWNlVGl0bGVMYWJlbCIsIlByaWNlVmFsdWVMYWJlbCIsIkJ1eU9yU2VsbFRpdGxlTGFiZWwiLCJUb3RhbEFtb3VudFRpdGxlTGFiZWwiLCJUb3RhbEFtb3VudFZhbHVlTGFiZWwiLCJCdXR0b25OYW1lTGFiZWwiLCJJbnZlc3RTdGF0ZSIsIkFtb3VudEVkaXRCb3giLCJTZWxsQnVzaW5lc3NVSSIsIkNhc2hMYWJlbCIsIlBsYXllck5hbWVMYWJlbCIsIkJ1c2luZXNzQ291bnRMYWJlbCIsIlNjcm9sbENvbnRlbnROb2RlIiwiQnVzaW5lc3NTZWxsUHJlZmFiIiwiQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIiLCJFeGl0QnV0dG9uIiwiVHVybk92ZXJFeGl0QnV0dG9uIiwiUGF5RGF5VUkiLCJIb21lQmFzZWROdW1iZXJMYWJlbCIsIkJNTnVtYmVyTGFiZWwiLCJCTU51bWJlckxvY2F0aW9uTGFiZWwiLCJQYXNzZWRQYXlEYXlDb3VudExhYmVsIiwiSG9tZUJhc2VkQnRuIiwiQk1CdG4iLCJMb2FuQnRuIiwiTWFpblBhbmVsTm9kZSIsIlJlc3VsdFBhbmVsTm9kZSIsIkxvYW5SZXN1bHRQYW5lbE5vZGUiLCJSZXN1bHRTY3JlZW5UaXRsZUxhYmVsIiwiVG90YWxCdXNpbmVzc0xhYmVsIiwiVG90YWxBbW91bnRMYWJlbCIsIlNraXBMb2FuQnV0dG9uIiwiTG9hbkZvdHRlckxhYmVsIiwiSW52ZXN0VUkiLCJCdXlPclNlbGxVSSIsIk9uZVF1ZXN0aW9uVUkiLCJQbGF5ZXJEZXRhaWxMYWJlbCIsIkRldGFpbHNQcmVmYWIiLCJTY3JvbGxDb250ZW50IiwiV2FpdGluZ1NjcmVlbiIsIkRlY2lzaW9uVGl0bGVMYWJlbCIsIkRlY2lzaW9uQ2FzaExhYmVsIiwiRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwiLCJEZWNpc2lvblF1ZXN0aW9uTGFiZWwiLCJQYXJ0bmVyc2hpcFVJIiwiV2FpdGluZ1N0YXR1c1NjcmVlbiIsIk1haW5TY3JlZW4iLCJUaXRsZU5hbWUiLCJQbGF5ZXJOYW1lIiwiUGxheWVyQ2FzaCIsIlBhcnRuZXJTaGlwUHJlZmFiIiwiRGVjaXNpb25TY3JlZW4iLCJEZWNpc2lvblBsYXllck5hbWUiLCJEZWNpc2lvblBsYXllckNhc2giLCJEZWNpc2lvbkRlc2NyaXB0aW9uIiwiUmVzdWx0VUkiLCJSZXN1bHRTY3JlZW4iLCJTdGF0dXNMYWJlbCIsIkJvZHlMYWJlbCIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCIsIkJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCIsIkxvYW5QYXllZCIsIlRvdGFsUGF5RGF5QW1vdW50IiwiRG91YmxlUGF5RGF5IiwiR2FtZXBsYXlVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJCdXNpbmVzc1NldHVwRGF0YSIsIkludmVzdFNlbGxTZXR1cFVJIiwiUGF5RGF5U2V0dXBVSSIsIlNlbGxCdXNpbmVzc1NldHVwVUkiLCJJbnZlc3RTZXR1cFVJIiwiQnV5T3JTZWxsU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2V0dXBVSSIsIlBhcnRuZXJzaGlwU2V0dXBVSSIsIlJlc3VsdFNldHVwVUkiLCJQb3BVcFVJIiwiUG9wVXBVSUxhYmVsIiwiUG9wVXBVSUJ1dHRvbiIsIkdhbWVwbGF5VUlTY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiT25lUXVlc3Rpb25TcGFjZVNjcmVlbiIsIk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4iLCJJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIiwiVGVtcERpY2VUZXh0IiwiTGVhdmVSb29tQnV0dG9uIiwiQXZhdGFyU3ByaXRlcyIsIlNwcml0ZUZyYW1lIiwiUmVzZXRBbGxEYXRhIiwiSEJEaWNlQ291bnRlciIsIkJNRGljZUNvdW50ZXIiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJJc0JvdFR1cm4iLCJQYXlEYXlDb3VudCIsIkRvdWJsZVBheURheUNvdW50IiwiSXNCYW5rcnVwdGVkIiwiQmFua3J1cHRlZEFtb3VudCIsIkFkZENhc2hBbW91bnQiLCJSZXNldFR1cm5WYXJpYWJsZSIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiX3N0YXRlIiwiYWN0aXZlIiwiRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJjb25zb2xlIiwidHJhY2UiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSIsIkluc3RhbmNlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiRGlzY29ubmVjdFBob3RvbiIsInNldFRpbWVvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJUb2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAiLCJFbmFibGVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiT25DYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfdmFsIiwiT25DbGlja0RvbmVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfZ2FtZWNhc2giLCJwYXJzZUludCIsIl9hbW91bnQiLCJ1bmRlZmluZWQiLCJDYXNoIiwibG9nIiwidG9TdHJpbmciLCJVcGRhdGVVc2VyRGF0YSIsIlNob3dUb2FzdCIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsImlzRmlyc3RUaW1lIiwiaW5zaWRlR2FtZSIsIm1vZGVJbmRleCIsIl9pc0JhbmtydXB0ZWQiLCJfQmFua3J1cHRBbW91bnQiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiQnVzaW5lc3NJbmZvIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwibGVuZ3RoIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cCIsIkF2YXRhcklEIiwiYXZhdGFySWQiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsImlzTmFOIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIk9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsIkhvbWVCYXNlZCIsIk9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiYnJpY2tBbmRtb3J0YXIiLCJhbW91bnQiLCJDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAiLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJOb09mQnVzaW5lc3MiLCJMb2FuVGFrZW4iLCJNYXRoIiwiYWJzIiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiUHVzaERhdGFGb3JQbGF5ZXJMZWZ0IiwiX2RhdGEiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIl9wbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllcklEIiwiSG9tZUJhc2VkQW1vdW50IiwiSXNBY3RpdmUiLCJfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsInB1c2giLCJSYWlzZUV2ZW50IiwiX0lEIiwiX3BsYXllckxlZnQiLCJfaXNTcGVjdGF0ZSIsIlBob3RvbkFjdG9yIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJNYXhQbGF5ZXJzIiwiR2V0UmVhbEFjdG9ycyIsImFjdG9yTnIiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYnVzaW5lc3NOYW1lIiwiX2lzSG9tZUJhc2VkIiwiU3RhcnRHYW1lIiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJFeGl0X0J1c2luZXNzU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJHZXRUdXJuTnVtYmVyIiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIl9pc1R1cm5PdmVyIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiUm9sbE9uZURpY2UiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAiLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiUmVzZXRfUGFydG5lclNoaXBTZXR1cCIsIl9tYW5hZ2VyIiwiX3RlbXBEYXRhIiwibm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0TmFtZSIsIlNldFR5cGUiLCJTZXRCdXNpbmVzc0luZGV4IiwiX3RvdGFsTG9jYXRpb25zIiwiTG9jYXRpb25zTmFtZSIsIlNldEJ1c2luZXNzTW9kZSIsIlNldE1vZGUiLCJTZXRCdXNpbmVzc1ZhbHVlIiwiU2V0RmluYWxCdXNpbmVzc1ZhbHVlIiwiX2FsbExvY2F0aW9uc0Ftb3VudCIsIl9maW5hbEFtb3VudCIsIlNldEJhbGFuY2UiLCJTZXRMb2NhdGlvbnMiLCJJc1BhcnRuZXJzaGlwIiwiVG9nZ2xlUGFydG5lclNoaXBCdXR0b24iLCJTZXRQYXJ0bmVyTmFtZSIsIlBhcnRuZXJOYW1lIiwiRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwIiwiX21zZyIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkV4aXRfUGFydG5lclNoaXBTZXR1cCIsImRlc3Ryb3kiLCJSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cCIsIl9hY3RvciIsIl90dXJuIiwiVHVybiIsIl9wbGF5ZXJEYXRhIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJfYnVzaW5lc3NWYWx1ZSIsIkJ1c1ZhbHVlIiwiX3BheUFtb3VudCIsIl9idXNpbmVzc01vZGUiLCJDaGVja1NwZWN0YXRlIiwiQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hbGxBY3RvcnMiLCJSb29tQWN0b3JzIiwibXlJbmRleCIsIkdldE15SW5kZXgiLCJSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIkNhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfaXNBY2NlcHRlZCIsIl9wYXltZW50IiwiX2lzQ2FuY2VsbGVkIiwiX3VJRCIsIl9tYWluRGF0YSIsIkFjY2VwdGVkIiwiQ2FzaFBheW1lbnQiLCJDYW5jZWxsZWQiLCJCdXNpbmVzc0luZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hY2NlcHRlZCIsIl9jYXNoIiwiX2NhbmNlbGxlZCIsIl91aWQiLCJQYXJ0bmVySUQiLCJpbmNsdWRlcyIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiUmFpc2VFdmVudFRvU3luY0luZm8iLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX2hNQW1vdW50IiwiX2JtQW1vdW50IiwiX2JtTG9jYXRpb24iLCJQYXlkYXlDb3VudGVyIiwiRG91YmxlUGF5Q291bnRlciIsIl9yZXMiLCJfdGltZSIsIlVwZGF0ZUNhc2hfUGF5RGF5IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQYXlEYXlDb21wbGV0ZWQiLCJPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfZG91YmxlUGF5RGF5IiwiX2RpY2UiLCJfYW1vdW50VG9CZVNlbmQiLCJfYW1vdW50VG9CZUFkanVzdGVkIiwiX211bHRpcGxpZXIiLCJfcGF5ZGF5bXVsdGlwbGllciIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfbG9jYXRpb25zIiwiX0VzdGltYXRlTG9hbiIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlN0YXJ0TmV3R2FtZV9QYXlEYXkiLCJlbWl0IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlRvZ2dsZVBheURheSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlNob3dJbmZvIiwiaW5mbyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiY2FsbFVwb25DYXJkIiwiVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwIiwiQW1vdW50IiwiVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uIiwiU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJTZWxlY3RCdXNpbmVzc2ZvclBheURheSIsIl9pc1R1cm5vdmVyIiwiRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJIiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSIsIlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfbXlEYXRhIiwiX2FjdG9yc0RhdGEiLCJfbW9kZUluZGV4IiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9xdWVzdGlvbiIsIm1lc3NhZ2UiLCJ0aW1lIiwiX2hhc2J1dHRvbiIsIlNlbGZUb2FzdCIsIm1vZGUiLCJjbGVhclRpbWVvdXQiLCJDb21wbGV0ZVRvYXN0IiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9zdGF0dXMiLCJSZXN0YXJ0VGhlR2FtZSIsIlJlc3RhcnRHYW1lIiwiX2RhdGFJbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtBQUNBLElBQUlDLDhCQUE4QixHQUFHLEVBQXJDO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLElBQXRCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsS0FBL0I7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxzQkFBc0IsR0FBRyxLQUE3QjtBQUNBLElBQUlDLFFBQVEsR0FBRyxDQUFmO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxJQUFJQyxxQkFBcUIsR0FBRyxDQUE1QjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLEtBQXhCO0FBQ0EsSUFBSUMsOEJBQThCLEdBQUcsS0FBckM7QUFDQSxJQUFJQyxpQkFB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PSBudWxsO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxudmFyIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxudmFyIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG52YXIgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxudmFyIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgQ2FuY2VsbGVkSUQgPSBbXTtcclxudmFyIFN0YXJ0R2FtZUNhc2ggPSAyMDAwMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxudmFyIEhNQW1vdW50ID0gMDtcclxudmFyIEJNQW1vdW50ID0gMDtcclxudmFyIEJNTG9jYXRpb25zID0gMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbnZhciBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG52YXIgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbnZhciBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxudmFyIFByZXZpb3VzQ2FzaCA9IDA7XHJcbnZhciBUaW1lb3V0UmVmO1xyXG52YXIgQ29tcGxldGlvbldpbmRvd1RpbWUgPSA4MDAwO1xyXG52YXIgTG9uZ01lc3NhZ2VUaW1lID0gNTAwMDtcclxudmFyIFNob3J0TWVzc2FnZVRpbWUgPSAyNTAwO1xyXG5cclxudmFyIFBheURheUluZm8gPSBcIlwiO1xyXG52YXIgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG5cclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG4vLyB2YXIgU2hvcnRNZXNzYWdlVGltZSA9IDUwOy8vMjUwMFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgYW1vdW50IG9mIGxvYW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIExvYW5BbW91bnRFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBUZW5UaG91c2FuZDogMTAwMDAsXHJcbiAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gIEZvcnR5VGhvdXNhbmQ6IDQwMDAwLFxyXG4gIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gIE90aGVyOiA2LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBjYXNoXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgYnVzaW5lc3MgdHlwZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhck5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIixcclxuICAgIH0sXHJcbiAgICBUaW1lck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHRpbWVyIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5TZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IExvYW5BbW91bnRFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgYWxsIGxhYmVscyBvZiBhbW91bnRzIGluIGxvYW4gVUlcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkIENhc2ggYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaFNjcmVlbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaCBsYWJlbCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZENhc2ggZWRpdEJveCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUdXJuRGVjaXNpb25TZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIG1hcmtldGluZyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgY29udGVudCBub2RlIG9mIHNjcm9sbCB2aWV3IG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBwcmVmYWIgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBpbnZlc3RtZW50L2J1eSBhbmQgc2VsbC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0RW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgU3RvY2tJbnZlc3Q6IDEsXHJcbiAgR29sZEludmVzdDogMixcclxuICBTdG9ja1NlbGw6IDMsXHJcbiAgR29sZFNlbGw6IDQsXHJcbiAgT3RoZXI6IDUsXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0U2VsbFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0U2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlIFJlc3VsdCBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgdmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV5T3JTZWxsVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1eU9yU2VsbCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgVmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1dHRvbk5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXR0b25OYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBidXR0b24gbmFtZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U3RhdGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW52ZXN0U3RhdGVcIixcclxuICAgICAgdHlwZTogSW52ZXN0RW51bSxcclxuICAgICAgZGVmYXVsdDogSW52ZXN0RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQW1vdW50RWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsbEJ1c2luZXNzVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2VsbFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBheURheVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXlEYXlVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBheURheVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgUGF5RGF5IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZE51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZE51bWJlclwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhck51bWJlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1OdW1iZXJMb2NhdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTG9jYXRpb25zXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckxvY2F0aW9ucyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGFzc2VkUGF5RGF5Q291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXNzZWRQYXlEYXlDb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQYXNzZWRQYXlEYXlDb3VudExhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRCdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBNYWluUGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5UaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0U2NyZWVuVGl0bGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEJ1c2luZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTG9hbkJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkZvdHRlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlPclNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIE9uZVF1ZXN0aW9uVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE9uZVF1ZXN0aW9uVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJPbmVRdWVzdGlvblVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIHF1ZXN0aW9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGFydG5lcnNoaXBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGFydG5lcnNoaXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBhcnRuZXJzaGlwVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBXYWl0aW5nU3RhdHVzU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTdGF0dXNTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgd2FpdGluZyBzY3JlZW4gbm9kZSBvZiBwYXJ0bmVyc2hpcCB1aVwiLFxyXG4gICAgfSxcclxuICAgIE1haW5TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVGl0bGVOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJTaGlwUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJTaGlwUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25QbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uRGVzY3JpcHRpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25EZXNjcmlwdGlvblwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBSZXN1bHRVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUmVzdWx0VUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJSZXN1bHRVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFJlc3VsdFNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTdGF0dXNMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdGF0dXNMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCb2R5TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQm9keUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xOyAvLy0xIG1lYW5zIG5ldyBidXNpbmVzcyBpcyBub3QgaW5zdGFudGlhbHRlZCBmcm9tIGluc2lkZSBnYW1lICwgaWYgaXQgaGFzIGFueSBvdGhlciB2YWx1ZSBpdCBtZWFucyBpdHMgYmVlbiBpbnN0YW50aWF0ZWQgZnJvbSBpbnNpZGUgZ2FtZSBhbmQgaXRzIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggb2YgcGxheWVyXHJcblxyXG4vL3R1cm4gZGVjaXNpb25zXHJcbnZhciBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxudmFyIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4vL2J1eW9yc2VsbFxyXG52YXIgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxudmFyIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxudmFyIERpY2VSZXN1bHQ7XHJcbnZhciBPbmNlT3JTaGFyZTtcclxudmFyIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBMb2FuUGF5ZWQgPSBmYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50ID0gMDtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxudmFyIEdhbWVwbGF5VUlNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiR2FtZXBsYXlVSU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1c2luZXNzU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBUdXJuRGVjaXNpb25TZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsbEJ1c2luZXNzVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsbEJ1c2luZXNzVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBJbnZlc3RVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEJ1eU9yU2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1eU9yU2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBPbmVRdWVzdGlvblVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIE9uZVF1ZXN0aW9uVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyc2hpcFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFBhcnRuZXJzaGlwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUGFydG5lcnNoaXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFJlc3VsdFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFJlc3VsdFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsYWJlbCByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgYnVzaW5lc3Mgc2V0dXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgR2FtZXBsYXlVSVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGdhbWVwbGF5IHVpIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2VsbFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCAmIHNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgUGF5RGF5IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlbGxCdXNpbmVzc1NjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGxCdXNpbmVzcyBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3Qgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgQnV5T3JTZWxsIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uU3BhY2VTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvblNwYWNlIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvbkRlY2lzaW9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFRlbXBEaWNlVGV4dDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgZGljZVwiLFxyXG4gICAgfSxcclxuICAgIExlYXZlUm9vbUJ1dHRvbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQXZhdGFyU3ByaXRlczoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICAgIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgQ2FuY2VsbGVkSUQgPSBbXTtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxuICAgIEhNQW1vdW50ID0gMDtcclxuICAgIEJNQW1vdW50ID0gMDtcclxuICAgIEJNTG9jYXRpb25zID0gMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbiAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgIFByZXZpb3VzQ2FzaCA9IDA7XHJcbiAgICBUaW1lb3V0UmVmID0gbnVsbDtcclxuXHJcbiAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xOyAvLy0xIG1lYW5zIG5ldyBidXNpbmVzcyBpcyBub3QgaW5zdGFudGlhbHRlZCBmcm9tIGluc2lkZSBnYW1lICwgaWYgaXQgaGFzIGFueSBvdGhlciB2YWx1ZSBpdCBtZWFucyBpdHMgYmVlbiBpbnN0YW50aWF0ZWQgZnJvbSBpbnNpZGUgZ2FtZSBhbmQgaXRzIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggb2YgcGxheWVyXHJcblxyXG4gICAgLy90dXJuIGRlY2lzaW9uc1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICBUZW1wSGlyaW5nTGF3eWVyO1xyXG5cclxuICAgIC8vYnV5b3JzZWxsXHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG4gICAgRGljZVJlc3VsdCA9IDA7XHJcbiAgICBPbmNlT3JTaGFyZTtcclxuICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG4gICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gMDtcclxuICAgIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxuICAgIEhCRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgQk1EaWNlQ291bnRlciA9IDA7XHJcbiAgICBQYXlEYXlJbmZvID0gXCJcIjtcclxuICAgIEludmVzdFNlbGxJbmZvID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAvL2xvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gMDtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5Q291bnQgPSAwO1xyXG4gICAgdGhpcy5Jc0JhbmtydXB0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IDA7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0VHVyblZhcmlhYmxlKCkge1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAoIUdhbWVNYW5hZ2VyIHx8IEdhbWVNYW5hZ2VyID09IG51bGwpIEdhbWVNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiU3luY0RhdGFcIiwgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZShmYWxzZSk7XHJcbiAgfSxcclxuICAvLyNyZWdpb24gU3BlY3RhdGUgVUkgU2V0dXBcclxuICBJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGNvbnNvbGUudHJhY2UoXCJjbG9zZWRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZFwiKTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkxlYXZlUm9vbUJ1dHRvbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKHRydWUpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbk1lbnVcIik7XHJcbiAgICB9LCA1MDApO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXNpbmVzc1NldHVwIHdpdGggbG9hblxyXG4gIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVDYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICB0aGlzLlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoO1xyXG4gIH0sXHJcblxyXG4gIE9uQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoX3ZhbCkge1xyXG4gICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gX3ZhbDtcclxuICB9LFxyXG5cclxuICBPbkNsaWNrRG9uZUNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAoZmFsc2UpO1xyXG4gICAgdmFyIF9nYW1lY2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQodGhpcy5BZGRDYXNoQW1vdW50KTtcclxuICAgIGlmICh0aGlzLkFkZENhc2hBbW91bnQgIT0gbnVsbCAmJiB0aGlzLkFkZENhc2hBbW91bnQgIT0gXCJcIiAmJiB0aGlzLkFkZENhc2hBbW91bnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChfYW1vdW50IDw9IF9nYW1lY2FzaCkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICBjb25zb2xlLmxvZyhQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgX2dhbWVjYXNoIC09IF9hbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBfZ2FtZWNhc2gudG9TdHJpbmcoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCwgLTEsIC0xKTtcclxuXHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJDYXNoICRcIiArIHRoaXMuQWRkQ2FzaEFtb3VudCArIFwiIGhhcyBiZWVuIGFkZGVkLlwiKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkbyBub3QgaGF2ZSBlbm91Z2ggaW4gZ2FtZSBjYXNoLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lID0gZmFsc2UsIG1vZGVJbmRleCA9IDAsIF9pc0JhbmtydXB0ZWQgPSBmYWxzZSwgX0JhbmtydXB0QW1vdW50ID0gMCwgX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgLy9jYWxsZWQgZmlyc3QgdGltZSBmb3JtIEdhbWVNYW5hZ2VyIG9ubG9hZCBmdW5jdGlvblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBfaXNDYXJkRnVuY3Rpb25hbGl0eTtcclxuICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gX0dpdmVuQ2FzaDtcclxuICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g7XHJcblxyXG4gICAgdGhpcy5Jc0JhbmtydXB0ZWQgPSBfaXNCYW5rcnVwdGVkO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gX0JhbmtydXB0QW1vdW50O1xyXG5cclxuICAgIGlmIChfaXNCYW5rcnVwdGVkKSB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5Jbml0X0J1c2luZXNzU2V0dXAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUsIG1vZGVJbmRleCwgX2lzQmFua3J1cHRlZCk7XHJcbiAgfSxcclxuICBJbml0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSA9IGZhbHNlLCBtb2RlSW5kZXggPSAwLCBfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhcmRGdW5jdGlvbmFsaXR5ID0gbmV3IEdhbWVNYW5hZ2VyLkNhcmREYXRhRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChpc0ZpcnN0VGltZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gU3RhcnRHYW1lQ2FzaDtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5SZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgaWYgKGluc2lkZUdhbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSBpbmRleDtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgICAgIGlmIChCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICAgICAgaWYgKFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICAgIFByZXZpb3VzQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IDA7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBQcmV2aW91c0Nhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBHaXZlbkNhc2hCdXNpbmVzcztcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWUpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5hdmF0YXJJZCkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgR2V0T2JqX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChuYW1lKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgIGlmIChpc05hTihVSUQpIHx8IFVJRCA9PSB1bmRlZmluZWQpIFVJRCA9IDA7XHJcblxyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQXZhdGFySUQgPSBVSUQ7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIFJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gXCJcIjtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lO1xyXG4gIH0sXHJcbiAgT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gIH0sXHJcbiAgT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcjtcclxuICB9LFxyXG4gIE9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBhbW91bnQ7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gYW1vdW50O1xyXG4gIH0sXHJcbiAgQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2xvYW5UYWtlbikge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgYWxyZWFkeSB0YWtlbiBsb2FuIG9mICRcIiArIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIFJlcXVpcmVkQ2FzaCA9IE1hdGguYWJzKHBhcnNlSW50KFBsYXllckRhdGFJbnRhbmNlLkNhc2gpIC0gYW1vdW50KTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIkXCIgKyBSZXF1aXJlZENhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoNTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBidXNpbmVzcyBiZXR3ZWVuIEhvbWUgQmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IHRha2UgbG9hbiBmb3IgY3VycmVudCBidXNpbmVzcyBzZXR1cFwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGluZGV4ID09IGkpIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgfSxcclxuICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID09IExvYW5BbW91bnRFbnVtLk90aGVyKSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBSZXF1aXJlZENhc2g7XHJcbiAgICBlbHNlIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IHBhcnNlSW50KHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCk7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgdGhpcy5PbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCArIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgfSxcclxuXHJcbiAgUHVzaERhdGFGb3JQbGF5ZXJMZWZ0KF9kYXRhKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkNhc2ggPSAyMDAwMDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLlBsYXllcklEID0gX2RhdGEudXNlcklEO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZSA9IF9kYXRhLm5hbWU7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5BdmF0YXJJRCA9IDA7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPSAxO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkNhcmRGdW5jdGlvbmFsaXR5ID0gbmV3IEdhbWVNYW5hZ2VyLkNhcmREYXRhRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQ7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID0gXCJTYWxvb25cIjtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID0gXCJFdmEgQmVhdXR5XCI7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsIF9wbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBTeW5jRGF0YTogZnVuY3Rpb24gKF9kYXRhLCBfSUQsIF9wbGF5ZXJMZWZ0ID0gZmFsc2UpIHtcclxuICAgIHZhciBfaXNTcGVjdGF0ZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXTtcclxuXHJcbiAgICBpZiAoX2lzU3BlY3RhdGUpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFfcGxheWVyTGVmdCkge1xyXG4gICAgICBpZiAoX0lEICE9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5hY3Rvck5yKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChfZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMpIHtcclxuICAgICAgLy9zZXR0aW5nIHJvb20gcHJvcGVydHkgdG8gZGVjbGFyZSBpbml0aWFsIHNldHVwIGhhcyBiZWVuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8sIHRydWUpO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUHVyY2hhc2VCdXNpbmVzczogZnVuY3Rpb24gKF9hbW91bnQsIF9idXNpbmVzc05hbWUsIF9pc0hvbWVCYXNlZCkge1xyXG4gICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPCBfYW1vdW50ICYmICFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBub3QgZW5vdWdoIGNhc2ggdG8gYnV5IHRoaXMgXCIgKyBfYnVzaW5lc3NOYW1lICsgXCIgYnVzaW5lc3MuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2lzSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA8IDMpIHtcclxuICAgICAgICAgIGlmICghU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gXCIkXCIgKyBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuU3RhcnRHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IG93biBtb3JlIHRoYW4gdGhyZWUgSG9tZSBiYXNlZCBidXNpbmVzc2VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gXCIkXCIgKyBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQnJpY2tBbmRNb3J0YXJBbW91bnQrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbikge1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIlJldmVydGluZyBiYWNrIGxvYW4gYW1vdW50LlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5CYW5rcnVwdEFtb3VudCA9IHRoaXMuQmFua3J1cHRlZEFtb3VudDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vc2V0dGluZyBwbGF5ZXIgY3VycmVudCBkYXRhIGluIGN1c3RvbSBwcm9wZXJ0aWVzIHdoZW4gaGlzL2hlciB0dXJuIG92ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgYmFua3J1cHRlZDogdHJ1ZSwgdHVybjogR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKSwgUGxheWVyRGF0YU1haW46IFBsYXllckRhdGFJbnRhbmNlIH0gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDksIF9kYXRhKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgQUlcclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcbiAgICAgICAgfSwgMTYwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJubyBtb2RlIHNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQYXlBbW91bnRUb1BsYXlHYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlN0YXJ0R2FtZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID09IFwiXCIpIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgdHlwZS5cIik7XHJcbiAgICBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9PSBcIlwiKSB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIG5hbWUuXCIpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmUgfHwgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGEgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBob21lYmFzc2VkXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDEwMDAwLCBcImhvbWVcIiwgdHJ1ZSk7XHJcbiAgICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBicmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDUwMDAwLCBcImJyaWNrIGFuZCBtb3J0YXJcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuU3RhcnRHYW1lID09IHRydWUgfHwgdGhpcy5Jc0JhbmtydXB0ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgICBpZiAoSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgIT0gLTEpIHtcclxuICAgICAgICAgIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBub3QgYmVlbiBjYWxsZWQgZnJvbSBpbnNpZGUgZ2FtZVxyXG4gICAgICAgICAgdGhpcy5TdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgYmVlbiBjYWxsZWQgYXQgc3RhcnQgb2YgZ2FtZSBhcyBpbml0aWFsIHNldHVwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BydGludGluZyBhbGwgdmFsdWVzIHRvIGNvbnNvbGVcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbmFtZTogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBJRDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXMgcGxheWVyIGJvdDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uSXNCb3QpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJubyBvZiBidXNpbmVzcyBvZiBwbGF5ZXIgKHNlZSBiZWxvdyk6IFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY2FzaDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uQ2FzaCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciB0YWtlbiBsb2FuOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuVGFrZW4pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ0YWtlbiBsb2FuIGFtb3VudDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFR1cm5EZWNpc2lvblNldHVwVUlcclxuICAvL1R1cm5EZWNpc2lvblNldHVwVUkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGlzYWN0aXZlKSB7XHJcbiAgICB0aGlzLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IGlzYWN0aXZlO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQ2FzaEFtb3VudExhYmVsLnN0cmluZyA9IFwiJCBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXS5DYXNoO1xyXG4gIH0sXHJcblxyXG4gIE9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChUZW1wTWFya2V0aW5nQW1vdW50ID09IFwiXCIgfHwgVGVtcE1hcmtldGluZ0Ftb3VudCA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdGhpcy5tYXJrZXRpbmdBbW91bnQgPSBwYXJzZUludChUZW1wTWFya2V0aW5nQW1vdW50KTtcclxuICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcblxyXG4gICAgICAvL2lmIHBsYXllciBlbnRlcmVkIGFtb3VudCBpcyBncmVhdGVyIHRoYW4gdG90YWwgY2FzaCBoZSBvd25zXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRoaXMubWFya2V0aW5nQW1vdW50KSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSB0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgKyB0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IHN1Y2Nlc3NmdWxseSBtYXJrZXRlZCBhbW91bnQgb2YgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ICsgXCIgLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICsgXCIuXCIsXHJcbiAgICAgICAgICBMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIik7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBpZiBwbGF5ZXIgaGFzIG1vcmUgdGhhbiA1MDAwJFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgYWxyZWFkeSBoaXJlZCBhIGxhd3llci5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBUZW1wSGlyaW5nTGF3eWVyID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhUZW1wSGlyaW5nTGF3eWVyKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIDUwMDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKyBcIi5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJzb3JyeSwgeW91IGRvbnQgaGF2ZSBlbm91Z2ggbW9uZXkgdG8gaGlyZSBhIGxhd3llci5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKF9uYW1lKSB7XHJcbiAgICBMb2NhdGlvbk5hbWUgPSBfbmFtZTtcclxuICB9LFxyXG4gIE9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChldmVudCA9IG51bGwsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIC8vaWYgcGxheWVyIGhhcyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGhlIGNvdWxkIGV4cGFuZCBpdFxyXG4gICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3NcIik7XHJcblxyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gX2lzQ2FyZEZ1bmN0aW9uYWxpdHk7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IF9HaXZlbkNhc2g7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoO1xyXG5cclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHZhciBnZW5lcmF0ZWRMZW5ndGggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbihCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHksIEdpdmVuQ2FzaEJ1c2luZXNzLCBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG5cclxuICAgIGlmIChnZW5lcmF0ZWRMZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgdG8gZXhwYW5kLlwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfSwgMTYwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJzdGFydGluZyBuZXcgYnVzaW5lc3NcIik7XHJcbiAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLkdvbGRJbnZlc3RlZCkge1xyXG4gICAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0O1xyXG4gICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJJbnZlc3QgSW4gR09MRFwiLCBEaWNlUmVzdWx0LCBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBCVVlcIiwgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIkJVWVwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChldmVudCA9IG51bGwsIF9pc1R1cm5PdmVyID0gZmFsc2UpIHtcclxuICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gX2lzVHVybk92ZXI7XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihfaXNUdXJuT3Zlcik7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KSBTdG9ja0J1c2luZXNzTmFtZSA9IFwiRnJpZW5kJ3MgQnVzaW5lc3NcIjtcclxuXHJcbiAgICBpZiAoIXRoaXMuU3RvY2tJbnZlc3RlZCB8fCBUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFN0b2NrQnVzaW5lc3NOYW1lID09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuXHJcbiAgICAgICAgaWYgKCFUdXJuT3ZlckZvckludmVzdCkgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBlbHNlIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJJbnZlc3QgaW4gU3RvY2tcIiwgRGljZVJlc3VsdCwgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gQlVZXCIsIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJCVVlcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLkdvbGRTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIEdPTERcIiwgRGljZVJlc3VsdCwgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLCBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIlNFTExcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIFNUT0NLXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBzaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIiwgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJTRUxMXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgc2hhcmVzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgIC8vIHRoaXMuU2hvd1RvYXN0KFwid29yayBpbiBwcm9ncmVzcywgY29taW5nIHNvb24uLi5cIik7XHJcbiAgICAvLyB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsRGljZSgpO1xyXG4gIH0sXHJcblxyXG4gIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvL3RoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGFydG5lcnNoaXAgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLldhaXRpbmdTdGF0dXNTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBhcnRuZXJTaGlwUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIHZhciBfdG90YWxMb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgIHZhciBfYWxsTG9jYXRpb25zQW1vdW50ID0gX3RvdGFsTG9jYXRpb25zICogMjUwMDA7XHJcbiAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlBhcnRuZXJOYW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoXCJub25lXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZykge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZS5zdHJpbmcgPSBfdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25EZXNjcmlwdGlvbi5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpIHtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IHRydWU7XHJcbiAgICBQYXJ0bmVyU2hpcERhdGEgPSBfZGF0YTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSBfYnVzaW5lc3NNb2RlID0gXCJIb21lIEJhc2VkXCI7XHJcbiAgICBlbHNlIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIF9idXNpbmVzc01vZGUgPSBcIkJyaWNrICYgTW9ydGFyXCI7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbXNnID1cclxuICAgICAgICBcInlvdSBoYXZlIHJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGJ5IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICtcclxuICAgICAgICBcIiAsIGZvbGxvd2luZyBhcmUgdGhlIGRldGFpbHMgb2YgYnVzaW5lc3M6IFwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE5hbWU6IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NOYW1lICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE1vZGU6IFwiICtcclxuICAgICAgICBfYnVzaW5lc3NNb2RlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIFZhbHVlOiAkXCIgK1xyXG4gICAgICAgIF9idXNpbmVzc1ZhbHVlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkNhc2ggUGF5bWVudDogJFwiICtcclxuICAgICAgICBfcGF5QW1vdW50ICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcImlmIG9mZmVyIGlzIGFjY2VwdGVkIHlvdSB3aWxsIHJlY2VpdmUgNTAlIHNoYXJlIG9mIHRoYXQgcGFydGljdWxhciBidXNpbmVzcyBhbmQgd2lsbCByZWNlaXZlIHByb2ZpdC9sb3NlIG9uIHRoYXQgcGFydGljdWxhciBidXNpbmVzcy5cIjtcclxuXHJcbiAgICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoID49IF9wYXlBbW91bnQpIHtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoIC09IF9wYXlBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAodHJ1ZSwgX3BheUFtb3VudCwgZmFsc2UsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJjb25ncmF0dWxhdGlvbnMhIHlvdSBoYXZlIHN0YXJ0ZWQgYnVzaW5lc3MgcGFydG5lcnNoaXBcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoZmFsc2UsIDAsIHRydWUsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfaXNBY2NlcHRlZCA9IGZhbHNlLCBfcGF5bWVudCA9IDAsIF9pc0NhbmNlbGxlZCA9IGZhbHNlLCBfdUlEID0gXCJcIiwgX2RhdGEgPSBudWxsLCBfYnVzaW5lc3NJbmRleCA9IDApIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSB7IERhdGE6IHsgQWNjZXB0ZWQ6IF9pc0FjY2VwdGVkLCBDYXNoUGF5bWVudDogX3BheW1lbnQsIENhbmNlbGxlZDogX2lzQ2FuY2VsbGVkLCBQbGF5ZXJJRDogX3VJRCwgUGxheWVyRGF0YTogX2RhdGEsIEJ1c2luZXNzSW5kZXg6IF9idXNpbmVzc0luZGV4IH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTIsIF9tYWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfZGF0YSkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdmFyIF9hY2NlcHRlZCA9IF9kYXRhLkRhdGEuQWNjZXB0ZWQ7XHJcbiAgICAgIHZhciBfY2FzaCA9IF9kYXRhLkRhdGEuQ2FzaFBheW1lbnQ7XHJcbiAgICAgIHZhciBfY2FuY2VsbGVkID0gX2RhdGEuRGF0YS5DYW5jZWxsZWQ7XHJcbiAgICAgIHZhciBfdWlkID0gX2RhdGEuRGF0YS5QbGF5ZXJJRDtcclxuICAgICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLkJ1c2luZXNzSW5kZXg7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcImFuc3dlciByZWNlaXZlZFwiKTtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Nhc2g7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCA9IHRydWU7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3VpZDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIGFjY2VwdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiLCBjYXNoICRcIiArIF9jYXNoICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBhY2NvdW50LlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmluY2x1ZGVzKF91aWQpID09IGZhbHNlKSBDYW5jZWxsZWRJRC5wdXNoKF91aWQpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKENhbmNlbGxlZElEKTtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5sZW5ndGggPT0gX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gY2FuY2VsbGVkIGJ5IGFsbCBvdGhlciB1c2Vycy5cIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciByZWplY3RlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICBSZXNldEdvbGRJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5Hb2xkRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5TdG9ja0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbChfYW1vdW50KSB7XHJcbiAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBfYW1vdW50O1xyXG5cclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgdmFyIF9hbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqXCIgKyBFbnRlckJ1eVNlbGxBbW91bnQgKyBcIj1cIiArIF9hbW91bnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB0aGlzLlJlc2V0R29sZElucHV0KCk7XHJcbiAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChfdGl0bGUsIF9kaWNlUmVzdWx0LCBfcHJpY2VUaXRsZSwgX3ByaWNlVmFsdWUsIF9idXlPclNlbGxUaXRsZSwgX3RvdGFsQW1vdW50VGl0bGUsIF90b3RhbEFtb3VudFZhbHVlLCBfYnV0dG9uTmFtZSwgX3N0YXRlKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2VSZXN1bHQ7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVGl0bGVMYWJlbC5zdHJpbmcgPSBfcHJpY2VUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZyA9IF9wcmljZVZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXlPclNlbGxUaXRsZUxhYmVsLnN0cmluZyA9IF9idXlPclNlbGxUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRUaXRsZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1dHRvbk5hbWVMYWJlbC5zdHJpbmcgPSBfYnV0dG9uTmFtZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVEYXRhX0ludmVzdFNlbGwoX3RvdGFsQW1vdW50VmFsdWUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIEFwcGx5QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcblxyXG4gICAgICBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTERcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiQnV5aW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBPdW5jZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIE91bmNlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIGlmIChfYW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50IC09IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlNvbGQgT3VuY2VzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBPdW5jZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggR09MRCBvdW5jZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgKyBcIiBvZiBHT0xEIG91bmNlc1wiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgLy9jYW4gYWRkIG11bHRpcGxlIHN0b2NrcyB3aXRoIGJ1c2luZXNzIG5hbWUgaW4gb2JqZWN0IGlmIHJlcXVpcmVkXHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIHNoYXJlcyBvZiBidXNpbmVzcyBcIiArIFN0b2NrQnVzaW5lc3NOYW1lLCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJCdXlpbmcgU1RPQ0s6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIHNoYXJlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBzaGFyZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIHNoYXJlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuXHJcbiAgICAgICAgaWYgKF9hbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCAtPSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgKyBfYW1vdW50ICsgXCIgc2hhcmVzIG9mIHN0b2NrIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIFNUT0NLOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBzaGFyZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJTb2xkIHNoYXJlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3Igc2hhcmVzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIHN0b2NrcyBzaGFyZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICsgXCIgb2Ygc3RvY2sgc2hhcmVzXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXlkYXkgb3IgRG91YmxlIHBheSBEYXlcclxuICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKSB7XHJcbiAgICBpZiAoSE1BbW91bnQgPT0gMCkge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChCTUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWxvYW5UYWtlbikge1xyXG4gICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdldExvYW5BbW91bnRfUGF5RGF5KCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdmFyIF9sb2FuID0gMDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hbiA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xvYW47XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXkgPSBmYWxzZSwgX3NraXBITSA9IGZhbHNlLCBfc2tpcEJNID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgX2hNQW1vdW50ID0gMCwgX2JtQW1vdW50ID0gMCwgX2JtTG9jYXRpb24gPSAwLCBQYXlkYXlDb3VudGVyID0gMSwgRG91YmxlUGF5Q291bnRlciA9IDApIHtcclxuICAgIEhCRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgQk1EaWNlQ291bnRlciA9IDA7XHJcblxyXG4gICAgLy8gICBpZiAoRG91YmxlUGF5Q291bnRlciA9PSAwKSBEb3VibGVQYXlDb3VudGVyID0gMTtcclxuXHJcbiAgICAvLyAgaWYgKERvdWJsZVBheURheSkgRG91YmxlUGF5Q291bnRlciA9IERvdWJsZVBheUNvdW50ZXIgKiAyO1xyXG5cclxuICAgIHZhciBfcmVzID0gUGF5ZGF5Q291bnRlciArIERvdWJsZVBheUNvdW50ZXI7XHJcbiAgICBQYXlEYXlJbmZvID0gXCJQYXlEYXkgUmVzdWx0IHdpdGggbXVsdGlwbGllcjogXCIgKyBfcmVzO1xyXG5cclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5QYXlEYXlDb3VudCA9IFBheWRheUNvdW50ZXI7XHJcbiAgICB0aGlzLkRvdWJsZVBheURheUNvdW50ID0gRG91YmxlUGF5Q291bnRlcjtcclxuICAgIERvdWJsZVBheURheSA9IF9pc0RvdWJsZVBheURheTtcclxuICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSh0cnVlKTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IF90aXRsZTtcclxuICAgIHZhciBfdGltZSA9IDE4MDA7XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzUGF5RGF5ID0gX2ZvclNlbGVjdGVkQnVzaW5lc3M7XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4O1xyXG4gICAgSE1BbW91bnQgPSBfaE1BbW91bnQ7XHJcbiAgICBCTUFtb3VudCA9IF9ibUFtb3VudDtcclxuICAgIEJNTG9jYXRpb25zID0gX2JtTG9jYXRpb247XHJcblxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBITSkgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSkgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvYW5UYWtlbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBsb2FuVGFrZW4gPSBfbG9hblRha2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZyA9IEJNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmcgPSBCTUxvY2F0aW9ucztcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5QYXNzZWRQYXlEYXlDb3VudExhYmVsLnN0cmluZyA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICB2YXIgX2xvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICRcIiArIF9sb2FuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJDUwMDBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG5cclxuICAgIGlmIChfc2tpcEJNIHx8IF9za2lwSE0pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgX3RpbWUgKyAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5PbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgaWYgKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9kb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcztcclxuXHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcbiAgICAgIHZhciBfcGF5ZGF5bXVsdGlwbGllciA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG4gICAgICBpZiAoX2RvdWJsZVBheURheSkge1xyXG4gICAgICAgIGlmICh0aGlzLkRvdWJsZVBheURheUNvdW50ICE9IDApIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyID0gMiAqIHRoaXMuRG91YmxlUGF5RGF5Q291bnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbXVsdGlwbGllciAqIF9kaWNlICogMTAwMDtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDA7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IF9wYXltZW50IC8gMjtcclxuICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9hbW91bnRUb0JlQWRqdXN0ZWQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfVxyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIEhNQW1vdW50ICogX2RpY2UgKiAxMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuICAgICAgZWxzZSBUb3RhbFBheURheUFtb3VudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiAoSE1BbW91bnQgKiBfZGljZSkgKiAxMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuXHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKS1cIiArIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIFBheURheUluZm8gKz0gXCJcXG5cIiArIFwiXFxuXCIgKyBcIkhvbWUgQmFzZWQgQnVzaW5lc3M6IFwiICsgSE1BbW91bnQgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBfZGljZSArIFwiXFxuXCIgKyBcIkFtb3VudCBSZWNlaXZlZDogJFwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVQYXltZW50X1BheURheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQpIHtcclxuICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX2RvdWJsZVBheURheSA9IERvdWJsZVBheURheTtcclxuICAgICAgdmFyIF9wYXlkYXltdWx0aXBsaWVyID0gdGhpcy5QYXlEYXlDb3VudDtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9hbW91bnQgPSBCTUFtb3VudCArIEJNTG9jYXRpb25zO1xyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG5cclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5Eb3VibGVQYXlEYXlDb3VudCAhPSAwKSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciA9IDIgKiB0aGlzLkRvdWJsZVBheURheUNvdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfbG9jYXRpb25zID0gX3RlbXBEYXRhW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDA7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDA7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IF9wYXltZW50IC8gMjtcclxuICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9hbW91bnRUb0JlQWRqdXN0ZWQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSBUb3RhbFBheURheUFtb3VudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2Ftb3VudCAqIF9kaWNlICogMjAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcbiAgICAgIGVsc2UgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogKF9hbW91bnQgKiBfZGljZSkgKiAyMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuXHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nID0gX2Ftb3VudDtcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIF9hbW91bnQgKyBcIipcIiArIFwiMjAwMCktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIFBheURheUluZm8gKz0gXCJcXG5cIiArIFwiXFxuXCIgKyBcIkJyaWNrICYgTW9ydGFyIEJ1c2luZXNzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBfZGljZSArIFwiXFxuXCIgKyBcIkFtb3VudCBSZWNlaXZlZDogJFwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVQYXltZW50X1BheURheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUxvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX0VzdGltYXRlTG9hbiA9IDA7XHJcblxyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpXHJcbiAgICAgICAgLy9pZiBwbGF5ZXIgaGFkIHNraXBwcGVkIGxvYW4gcHJldmlvdXNseSBjYWxsIGFsbCBhbW91bnQgZHVlXHJcbiAgICAgICAgX0VzdGltYXRlTG9hbiA9IHRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgZWxzZSBfRXN0aW1hdGVMb2FuID0gNTAwMDtcclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9Fc3RpbWF0ZUxvYW4pIHtcclxuICAgICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gX0VzdGltYXRlTG9hbjtcclxuXHJcbiAgICAgICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9QYXlEYXkoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIm91dCBvZiBtb25leVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQYXltZW50X1BheURheSgpIHtcclxuICAgIC8vYWxsXHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIkFtb3VudCAkXCIgKyBUb3RhbFBheURheUFtb3VudCArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkFtb3VudCAkXCIgKyBUb3RhbFBheURheUFtb3VudCArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNraXBMb2FuT25lVGltZV9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHNraXBwZWQgdGhlIGxvYW4gcGF5bWVudCwgYmFuayB3aWxsIGNhbGwgdXBvbiBjb21wbGV0ZSBsb2FuIGFtb3VudCBvbiBuZXh0IHBheWRheVwiKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQgPSB0cnVlO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBTZWxsQnVzaW5lc3NfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNhc2hfUGF5RGF5KF9hbW91bnQpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIEV4aXRMb2FuU2NyZWVuX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3R2FtZV9QYXlEYXkoKSB7XHJcbiAgICAvL2lmIGJhbmtydXB0ZWQgeW91IGNhbiBzdGFydCBuZXcgZ2FtZVxyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3Ugd2lsbCBsb3NlIGFsbCBwcm9ncmVzcyBhbmQgc3RhcnQgbmV3IGdhbWUgZnJvbSB0aGUgc3RhcnQuXCIsIDMwMDAsIGZhbHNlKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLkV4aXRMb2FuU2NyZWVuX1BheURheSgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICB0aGlzLkV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlKCk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJTaG93Q2FyZFwiLCBcIlwiLCBmYWxzZSk7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVBheURheShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQmFua3J1cHRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB9LCAzMDEwKTtcclxuICB9LFxyXG5cclxuICBTaG93SW5mbyhfZGF0YSkge1xyXG4gICAgdGhpcy5TaG93VG9hc3QoX2RhdGEuaW5mbywgMjAwMCwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgUGF5RGF5Q29tcGxldGVkKCkge1xyXG4gICAgaWYgKEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgJiYgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkICYmIExvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgY29uc29sZS5sb2coXCJhbGwgcGF5ZGF5IGRvbmVcIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVBheURheShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oUGF5RGF5SW5mbyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGwgJiBtYW5pcHVsYXRlIEJ1c2luZXNzIFVJXHJcbiAgVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMTFwiO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nID0gXCJObyBvZiBCdXNpbmVzc2VzIDogXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzU2VsbFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKGZhbHNlKTtcclxuICAgICAgZWxzZSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIGlmICghX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVTSU5FU1NcIjtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2VsZWN0QnVzaW5lc3Nmb3JQYXlEYXkoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAvLyBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIC8vIGVsc2VcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIFJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZU1hbmlwaWxhdGlvblNjcmVlbl9fQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc1R1cm5vdmVyID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFfaXNCb3QpIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNCb3QpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEludmVzdCBVSVxyXG4gIFRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gIH0sXHJcbiAgU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcikge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJJTlZFU1RcIjtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1eU9SU2VsbCBVSVxyXG4gIFRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXlPclNlbGxTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gIH0sXHJcbiAgU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcikge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJCVVkgT1IgU0VMTFwiO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gT25lIFF1ZXN0aW9uIHNldHVwIFVpXHJcbiAgVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU3BhY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuV2FpdGluZ1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBvbmVRdWVzdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBvbmVRdWVzdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfcXVlc3Rpb24pIHtcclxuICAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25RdWVzdGlvbkxhYmVsLnN0cmluZyA9IFwiUGxheWVyIGhhcyBhc2tlZCBpZiBcIiArIF9xdWVzdGlvbiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCIqZWl0aGVyIGFuc3dlciBxdWVzdGlvbiBvciBwYXkgJDUwMDAgdG8gcGxheWVyIHdob3NlIGFza2luZyBxdWVzdGlvbi5cIjtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtZXNzYWdlLCB0aW1lID0gU2hvcnRNZXNzYWdlVGltZSwgX2hhc2J1dHRvbiA9IHRydWUpIHtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Qb3BVcFVJTGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90IG1vZGUgb25seVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+IDAgJiYgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLklzQm90KSB7XHJcbiAgICAgICAgLy8gaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICAvLyAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIC8vICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICAvLyAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDb21wbGV0ZVRvYXN0KCkge1xyXG4gICAgY29uc29sZS5lcnJvcihcImNvbXBsZXRlIHRvYXN0IGNhbGxlZFwiKTtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICB9LFxyXG5cclxuICBTaG93UmVzdWx0U2NyZWVuOiBmdW5jdGlvbiAoX3N0YXR1cywgX2RhdGEpIHtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5SZXN1bHRTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBfc3RhdHVzO1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLkJvZHlMYWJlbC5zdHJpbmcgPSBfZGF0YTtcclxuICB9LFxyXG5cclxuICBSZXN0YXJ0VGhlR2FtZSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jSW5mbyhfZGF0YUluZm8pIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIHZhciBfZGF0YSA9IHsgaW5mbzogX2RhdGFJbmZvIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTUsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX21vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBpbmZvOiBfZGF0YUluZm8gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE1LCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuIl19