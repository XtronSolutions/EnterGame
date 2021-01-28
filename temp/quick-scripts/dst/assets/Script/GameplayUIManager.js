
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiUGF5RGF5SW5mbyIsIkludmVzdFNlbGxJbmZvIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsIkFkZEJ1dHRvbk5vZGUiLCJBZGRDYXNoU2NyZWVuIiwiQWRkQ2FzaExhYmVsIiwiQWRkQ2FzaEVkaXRCb3giLCJjdG9yIiwiQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwic3RyaW5nIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIk1hcmtldGluZ0VkaXRCb3giLCJHb2xkRWRpdEJveCIsIlN0b2NrRWRpdEJveCIsIkNhc2hBbW91bnRMYWJlbCIsIkV4cGFuZEJ1c2luZXNzTm9kZSIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiUHJlZmFiIiwiSW52ZXN0RW51bSIsIlN0b2NrSW52ZXN0IiwiR29sZEludmVzdCIsIlN0b2NrU2VsbCIsIkdvbGRTZWxsIiwiSW52ZXN0U2VsbFVJIiwiVGl0bGVMYWJlbCIsIkRpY2VSZXN1bHRMYWJlbCIsIlByaWNlVGl0bGVMYWJlbCIsIlByaWNlVmFsdWVMYWJlbCIsIkJ1eU9yU2VsbFRpdGxlTGFiZWwiLCJUb3RhbEFtb3VudFRpdGxlTGFiZWwiLCJUb3RhbEFtb3VudFZhbHVlTGFiZWwiLCJCdXR0b25OYW1lTGFiZWwiLCJJbnZlc3RTdGF0ZSIsIkFtb3VudEVkaXRCb3giLCJTZWxsQnVzaW5lc3NVSSIsIkNhc2hMYWJlbCIsIlBsYXllck5hbWVMYWJlbCIsIkJ1c2luZXNzQ291bnRMYWJlbCIsIlNjcm9sbENvbnRlbnROb2RlIiwiQnVzaW5lc3NTZWxsUHJlZmFiIiwiQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIiLCJFeGl0QnV0dG9uIiwiVHVybk92ZXJFeGl0QnV0dG9uIiwiUGF5RGF5VUkiLCJIb21lQmFzZWROdW1iZXJMYWJlbCIsIkJNTnVtYmVyTGFiZWwiLCJCTU51bWJlckxvY2F0aW9uTGFiZWwiLCJQYXNzZWRQYXlEYXlDb3VudExhYmVsIiwiSG9tZUJhc2VkQnRuIiwiQk1CdG4iLCJMb2FuQnRuIiwiTWFpblBhbmVsTm9kZSIsIlJlc3VsdFBhbmVsTm9kZSIsIkxvYW5SZXN1bHRQYW5lbE5vZGUiLCJSZXN1bHRTY3JlZW5UaXRsZUxhYmVsIiwiVG90YWxCdXNpbmVzc0xhYmVsIiwiVG90YWxBbW91bnRMYWJlbCIsIlNraXBMb2FuQnV0dG9uIiwiTG9hbkZvdHRlckxhYmVsIiwiSW52ZXN0VUkiLCJCdXlPclNlbGxVSSIsIk9uZVF1ZXN0aW9uVUkiLCJQbGF5ZXJEZXRhaWxMYWJlbCIsIkRldGFpbHNQcmVmYWIiLCJTY3JvbGxDb250ZW50IiwiV2FpdGluZ1NjcmVlbiIsIldhaXRpbmdTY3JlZW5MYWJlbCIsIkRlY2lzaW9uVGl0bGVMYWJlbCIsIkRlY2lzaW9uQ2FzaExhYmVsIiwiRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwiLCJEZWNpc2lvblF1ZXN0aW9uTGFiZWwiLCJQYXJ0bmVyc2hpcFVJIiwiV2FpdGluZ1N0YXR1c1NjcmVlbiIsIk1haW5TY3JlZW4iLCJUaXRsZU5hbWUiLCJQbGF5ZXJOYW1lIiwiUGxheWVyQ2FzaCIsIlBhcnRuZXJTaGlwUHJlZmFiIiwiRGVjaXNpb25TY3JlZW4iLCJEZWNpc2lvblBsYXllck5hbWUiLCJEZWNpc2lvblBsYXllckNhc2giLCJEZWNpc2lvbkRlc2NyaXB0aW9uIiwiUmVzdWx0VUkiLCJSZXN1bHRTY3JlZW4iLCJTdGF0dXNMYWJlbCIsIkJvZHlMYWJlbCIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCIsIkJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCIsIkxvYW5QYXllZCIsIlRvdGFsUGF5RGF5QW1vdW50IiwiRG91YmxlUGF5RGF5IiwiR2FtZXBsYXlVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJCdXNpbmVzc1NldHVwRGF0YSIsIkludmVzdFNlbGxTZXR1cFVJIiwiUGF5RGF5U2V0dXBVSSIsIlNlbGxCdXNpbmVzc1NldHVwVUkiLCJJbnZlc3RTZXR1cFVJIiwiQnV5T3JTZWxsU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2V0dXBVSSIsIlBhcnRuZXJzaGlwU2V0dXBVSSIsIlJlc3VsdFNldHVwVUkiLCJQb3BVcFVJIiwiUG9wVXBVSUxhYmVsIiwiUG9wVXBVSUJ1dHRvbiIsIkdhbWVwbGF5VUlTY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiT25lUXVlc3Rpb25TcGFjZVNjcmVlbiIsIk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4iLCJJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIiwiVGVtcERpY2VUZXh0IiwiTGVhdmVSb29tQnV0dG9uIiwiQXZhdGFyU3ByaXRlcyIsIlNwcml0ZUZyYW1lIiwiUmVzZXRBbGxEYXRhIiwiSEJEaWNlQ291bnRlciIsIkJNRGljZUNvdW50ZXIiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJJc0JvdFR1cm4iLCJQYXlEYXlDb3VudCIsIkRvdWJsZVBheURheUNvdW50IiwiSXNCYW5rcnVwdGVkIiwiQmFua3J1cHRlZEFtb3VudCIsIkFkZENhc2hBbW91bnQiLCJSZXNldFR1cm5WYXJpYWJsZSIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiX3N0YXRlIiwiYWN0aXZlIiwiRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJjb25zb2xlIiwidHJhY2UiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSIsIkluc3RhbmNlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiRGlzY29ubmVjdFBob3RvbiIsInNldFRpbWVvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJUb2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAiLCJFbmFibGVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiT25DYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfdmFsIiwiT25DbGlja0RvbmVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfZ2FtZWNhc2giLCJwYXJzZUludCIsIl9hbW91bnQiLCJ1bmRlZmluZWQiLCJDYXNoIiwibG9nIiwidG9TdHJpbmciLCJVcGRhdGVVc2VyRGF0YSIsIlNob3dUb2FzdCIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsImlzRmlyc3RUaW1lIiwiaW5zaWRlR2FtZSIsIm1vZGVJbmRleCIsIl9pc0JhbmtydXB0ZWQiLCJfQmFua3J1cHRBbW91bnQiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiQnVzaW5lc3NJbmZvIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwibGVuZ3RoIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cCIsIkF2YXRhcklEIiwiYXZhdGFySWQiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsImlzTmFOIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIk9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsIkhvbWVCYXNlZCIsIk9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiYnJpY2tBbmRtb3J0YXIiLCJhbW91bnQiLCJDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAiLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJOb09mQnVzaW5lc3MiLCJMb2FuVGFrZW4iLCJNYXRoIiwiYWJzIiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiUHVzaERhdGFGb3JQbGF5ZXJMZWZ0IiwiX2RhdGEiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIl9wbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllcklEIiwiSG9tZUJhc2VkQW1vdW50IiwiSXNBY3RpdmUiLCJfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsInB1c2giLCJSYWlzZUV2ZW50IiwiX0lEIiwiX3BsYXllckxlZnQiLCJfaXNTcGVjdGF0ZSIsIlBob3RvbkFjdG9yIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJNYXhQbGF5ZXJzIiwiR2V0UmVhbEFjdG9ycyIsImFjdG9yTnIiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYnVzaW5lc3NOYW1lIiwiX2lzSG9tZUJhc2VkIiwiU3RhcnRHYW1lIiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJFeGl0X0J1c2luZXNzU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJHZXRUdXJuTnVtYmVyIiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIl9pc1R1cm5PdmVyIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiUm9sbE9uZURpY2UiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAiLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiUmVzZXRfUGFydG5lclNoaXBTZXR1cCIsIl9tYW5hZ2VyIiwiX3RlbXBEYXRhIiwibm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0TmFtZSIsIlNldFR5cGUiLCJTZXRCdXNpbmVzc0luZGV4IiwiX3RvdGFsTG9jYXRpb25zIiwiTG9jYXRpb25zTmFtZSIsIlNldEJ1c2luZXNzTW9kZSIsIlNldE1vZGUiLCJTZXRCdXNpbmVzc1ZhbHVlIiwiU2V0RmluYWxCdXNpbmVzc1ZhbHVlIiwiX2FsbExvY2F0aW9uc0Ftb3VudCIsIl9maW5hbEFtb3VudCIsIlNldEJhbGFuY2UiLCJTZXRMb2NhdGlvbnMiLCJJc1BhcnRuZXJzaGlwIiwiVG9nZ2xlUGFydG5lclNoaXBCdXR0b24iLCJTZXRQYXJ0bmVyTmFtZSIsIlBhcnRuZXJOYW1lIiwiRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwIiwiX21zZyIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkV4aXRfUGFydG5lclNoaXBTZXR1cCIsImRlc3Ryb3kiLCJSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cCIsIl9hY3RvciIsIl90dXJuIiwiVHVybiIsIl9wbGF5ZXJEYXRhIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJfYnVzaW5lc3NWYWx1ZSIsIkJ1c1ZhbHVlIiwiX3BheUFtb3VudCIsIl9idXNpbmVzc01vZGUiLCJDaGVja1NwZWN0YXRlIiwiQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hbGxBY3RvcnMiLCJSb29tQWN0b3JzIiwibXlJbmRleCIsIkdldE15SW5kZXgiLCJSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIkNhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfaXNBY2NlcHRlZCIsIl9wYXltZW50IiwiX2lzQ2FuY2VsbGVkIiwiX3VJRCIsIl9tYWluRGF0YSIsIkFjY2VwdGVkIiwiQ2FzaFBheW1lbnQiLCJDYW5jZWxsZWQiLCJCdXNpbmVzc0luZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hY2NlcHRlZCIsIl9jYXNoIiwiX2NhbmNlbGxlZCIsIl91aWQiLCJQYXJ0bmVySUQiLCJpbmNsdWRlcyIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiUmFpc2VFdmVudFRvU3luY0luZm8iLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX2hNQW1vdW50IiwiX2JtQW1vdW50IiwiX2JtTG9jYXRpb24iLCJQYXlkYXlDb3VudGVyIiwiRG91YmxlUGF5Q291bnRlciIsIl9yZXMiLCJfdGltZSIsIlVwZGF0ZUNhc2hfUGF5RGF5IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQYXlEYXlDb21wbGV0ZWQiLCJPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfZG91YmxlUGF5RGF5IiwiX2RpY2UiLCJfYW1vdW50VG9CZVNlbmQiLCJfYW1vdW50VG9CZUFkanVzdGVkIiwiX211bHRpcGxpZXIiLCJfcGF5ZGF5bXVsdGlwbGllciIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfbG9jYXRpb25zIiwiX0VzdGltYXRlTG9hbiIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlN0YXJ0TmV3R2FtZV9QYXlEYXkiLCJlbWl0IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlRvZ2dsZVBheURheSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlNob3dJbmZvIiwiaW5mbyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiY2FsbFVwb25DYXJkIiwiVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwIiwiQW1vdW50IiwiVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uIiwiU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJTZWxlY3RCdXNpbmVzc2ZvclBheURheSIsIl9pc1R1cm5vdmVyIiwiRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJIiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSIsIlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2hvd1F1ZXN0aW9uVG9hc3QiLCJTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9teURhdGEiLCJfYWN0b3JzRGF0YSIsIl9tb2RlSW5kZXgiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJzZXRQbGF5ZXJOYW1lIiwic2V0UGxheWVyVUlEIiwiUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0X09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwibWVzc2FnZSIsInRpbWUiLCJfaGFzYnV0dG9uIiwiU2VsZlRvYXN0IiwibW9kZSIsImNsZWFyVGltZW91dCIsIkNvbXBsZXRlVG9hc3QiLCJTaG93UmVzdWx0U2NyZWVuIiwiX3N0YXR1cyIsIlJlc3RhcnRUaGVHYW1lIiwiUmVzdGFydEdhbWUiLCJfZGF0YUluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxFQUExQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBQ0EsSUFBSUMsOEJBQThCLEdBQUcsRUFBckM7QUFDQSxJQUFJQyxlQUFlLEdBQUcsSUFBdEI7QUFDQSxJQUFJQyx3QkFBd0IsR0FBRyxLQUEvQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxLQUFwQjtBQUNBLElBQUlDLHNCQUFzQixHQUFHLEtBQTdCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLElBQUlDLFdBQVcsR0FBRyxDQUFsQjtBQUNBLElBQUlDLHFCQUFxQixHQUFHLENBQTVCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsS0FBeEI7QUFDQSxJQUFJQyw4QkFB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LEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ3JCO0FBQ0EsVUFBSSxLQUFLbkgsU0FBVCxFQUFvQjtBQUNsQixZQUFJa0gsS0FBSyxHQUFHO0FBQUVvTixVQUFBQSxJQUFJLEVBQUVtRDtBQUFSLFNBQVo7QUFDQWhrQixRQUFBQSx3QkFBd0IsQ0FBQytOLFFBQXpCLENBQWtDUSwwQkFBbEMsR0FBK0QyRixVQUEvRCxDQUEwRSxFQUExRSxFQUE4RVQsS0FBOUU7QUFDRDtBQUNGO0FBQ0Y7QUF6b0U4QixDQUFULENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxudmFyIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxudmFyIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG52YXIgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxudmFyIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgQ2FuY2VsbGVkSUQgPSBbXTtcclxudmFyIFN0YXJ0R2FtZUNhc2ggPSAyMDAwMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxudmFyIEhNQW1vdW50ID0gMDtcclxudmFyIEJNQW1vdW50ID0gMDtcclxudmFyIEJNTG9jYXRpb25zID0gMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbnZhciBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG52YXIgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbnZhciBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxudmFyIFByZXZpb3VzQ2FzaCA9IDA7XHJcbnZhciBUaW1lb3V0UmVmO1xyXG52YXIgQ29tcGxldGlvbldpbmRvd1RpbWUgPSA4MDAwO1xyXG52YXIgTG9uZ01lc3NhZ2VUaW1lID0gNTAwMDtcclxudmFyIFNob3J0TWVzc2FnZVRpbWUgPSAyNTAwO1xyXG5cclxudmFyIFBheURheUluZm8gPSBcIlwiO1xyXG52YXIgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG5cclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG4vLyB2YXIgU2hvcnRNZXNzYWdlVGltZSA9IDUwOy8vMjUwMFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgYW1vdW50IG9mIGxvYW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIExvYW5BbW91bnRFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBUZW5UaG91c2FuZDogMTAwMDAsXHJcbiAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gIEZvcnR5VGhvdXNhbmQ6IDQwMDAwLFxyXG4gIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gIE90aGVyOiA2LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBjYXNoXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgYnVzaW5lc3MgdHlwZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhck5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIixcclxuICAgIH0sXHJcbiAgICBUaW1lck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHRpbWVyIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5TZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IExvYW5BbW91bnRFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgYWxsIGxhYmVscyBvZiBhbW91bnRzIGluIGxvYW4gVUlcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkIENhc2ggYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaFNjcmVlbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaCBsYWJlbCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZENhc2ggZWRpdEJveCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUdXJuRGVjaXNpb25TZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIG1hcmtldGluZyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgY29udGVudCBub2RlIG9mIHNjcm9sbCB2aWV3IG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBwcmVmYWIgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBpbnZlc3RtZW50L2J1eSBhbmQgc2VsbC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0RW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgU3RvY2tJbnZlc3Q6IDEsXHJcbiAgR29sZEludmVzdDogMixcclxuICBTdG9ja1NlbGw6IDMsXHJcbiAgR29sZFNlbGw6IDQsXHJcbiAgT3RoZXI6IDUsXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0U2VsbFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0U2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlIFJlc3VsdCBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgdmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV5T3JTZWxsVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1eU9yU2VsbCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgVmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1dHRvbk5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXR0b25OYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBidXR0b24gbmFtZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U3RhdGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW52ZXN0U3RhdGVcIixcclxuICAgICAgdHlwZTogSW52ZXN0RW51bSxcclxuICAgICAgZGVmYXVsdDogSW52ZXN0RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQW1vdW50RWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsbEJ1c2luZXNzVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2VsbFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBheURheVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXlEYXlVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBheURheVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgUGF5RGF5IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZE51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZE51bWJlclwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhck51bWJlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1OdW1iZXJMb2NhdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTG9jYXRpb25zXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckxvY2F0aW9ucyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGFzc2VkUGF5RGF5Q291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXNzZWRQYXlEYXlDb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQYXNzZWRQYXlEYXlDb3VudExhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRCdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBNYWluUGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5UaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0U2NyZWVuVGl0bGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEJ1c2luZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTG9hbkJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkZvdHRlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlPclNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIE9uZVF1ZXN0aW9uVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE9uZVF1ZXN0aW9uVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJPbmVRdWVzdGlvblVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1NjcmVlbkxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBub2RlIFdhaXRpbmdTY3JlZW5MYWJlbCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25UaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uVGl0bGVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUXVlc3Rpb25MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblF1ZXN0aW9uTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBxdWVzdGlvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBhcnRuZXJzaGlwVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBhcnRuZXJzaGlwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQYXJ0bmVyc2hpcFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgV2FpdGluZ1N0YXR1c1NjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIHdhaXRpbmcgc2NyZWVuIG5vZGUgb2YgcGFydG5lcnNoaXAgdWlcIixcclxuICAgIH0sXHJcbiAgICBNYWluU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZU5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyU2hpcFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVyU2hpcFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25QbGF5ZXJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvbkRlc2NyaXB0aW9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uRGVzY3JpcHRpb25cIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUmVzdWx0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJlc3VsdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUmVzdWx0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBSZXN1bHRTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0U2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RhdHVzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQm9keUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJvZHlMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBHYW1lcGxheVVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YUludGFuY2U7XHJcbnZhciBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlO1xyXG52YXIgUmVxdWlyZWRDYXNoO1xyXG52YXIgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuLy90dXJuIGRlY2lzaW9uc1xyXG52YXIgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbnZhciBUZW1wSGlyaW5nTGF3eWVyO1xyXG5cclxuLy9idXlvcnNlbGxcclxudmFyIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxudmFyIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbnZhciBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbnZhciBEaWNlUmVzdWx0O1xyXG52YXIgT25jZU9yU2hhcmU7XHJcbnZhciBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG5cclxudmFyIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgTG9hblBheWVkID0gZmFsc2U7XHJcbnZhciBUb3RhbFBheURheUFtb3VudCA9IDA7XHJcbnZhciBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuXHJcbnZhciBHYW1lcGxheVVJTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVwbGF5VUlNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEJ1c2luZXNzU2V0dXBEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEJ1c2luZXNzU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXNpbmVzc1NldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBUdXJuRGVjaXNpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFR1cm5EZWNpc2lvblNldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgVHVybkRlY2lzaW9uU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEludmVzdFNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFBheURheVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGxCdXNpbmVzc1NldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGxCdXNpbmVzc1VJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGxCdXNpbmVzc1VJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogSW52ZXN0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBCdXlPclNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXlPclNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogT25lUXVlc3Rpb25VSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBPbmVRdWVzdGlvblVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lcnNoaXBTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBQYXJ0bmVyc2hpcFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFBhcnRuZXJzaGlwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBSZXN1bHRVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBSZXN1bHRVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSUJ1dHRvbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHNldHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEdhbWVwbGF5VUlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBnYW1lcGxheSB1aSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIERlY2lzaW9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3QgJiBzZWxsIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFBheURheSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxsQnVzaW5lc3Mgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEJ1eU9yU2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNwYWNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25TcGFjZSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25EZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBUZW1wRGljZVRleHQ6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsYWJlbCByZWZlcmVuY2UgZm9yIGRpY2VcIixcclxuICAgIH0sXHJcbiAgICBMZWF2ZVJvb21CdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEF2YXRhclNwcml0ZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsRGF0YSgpIHtcclxuICAgIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxuICAgIFBhcnRuZXJTaGlwRGF0YSA9IG51bGw7XHJcbiAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBITUFtb3VudCA9IDA7XHJcbiAgICBCTUFtb3VudCA9IDA7XHJcbiAgICBCTUxvY2F0aW9ucyA9IDA7XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwO1xyXG4gICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0Nhc2ggPSAwO1xyXG4gICAgVGltZW91dFJlZiA9IG51bGw7XHJcblxyXG4gICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuICAgIC8vdHVybiBkZWNpc2lvbnNcclxuICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbiAgICAvL2J1eW9yc2VsbFxyXG4gICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxuICAgIERpY2VSZXN1bHQgPSAwO1xyXG4gICAgT25jZU9yU2hhcmU7XHJcbiAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG5cclxuICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICBUb3RhbFBheURheUFtb3VudCA9IDA7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuXHJcbiAgICBIQkRpY2VDb3VudGVyID0gMDtcclxuICAgIEJNRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgUGF5RGF5SW5mbyA9IFwiXCI7XHJcbiAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcblxyXG4gICAgLy9sb2NhbCB2YXJpYWJsZXNcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb3VudCA9IDA7XHJcbiAgICB0aGlzLkRvdWJsZVBheURheUNvdW50ID0gMDtcclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSAwO1xyXG4gICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBSZXNldFR1cm5WYXJpYWJsZSgpIHtcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlciA9PSBudWxsKSBHYW1lTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoZmFsc2UpO1xyXG4gIH0sXHJcbiAgLy8jcmVnaW9uIFNwZWN0YXRlIFVJIFNldHVwXHJcbiAgSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLnRyYWNlKFwiY2xvc2VkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRcIik7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5MZWF2ZVJvb21CdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIE9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbCh0cnVlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSwgNTAwKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnVzaW5lc3NTZXR1cCB3aXRoIGxvYW5cclxuICAvL0J1c2luZXNzIHNldHVwIHVpLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChfc3RhdGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgdGhpcy5Ub2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaDtcclxuICB9LFxyXG5cclxuICBPbkNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKF92YWwpIHtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgT25DbGlja0RvbmVDYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwKGZhbHNlKTtcclxuICAgIHZhciBfZ2FtZWNhc2ggPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCk7XHJcbiAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KHRoaXMuQWRkQ2FzaEFtb3VudCk7XHJcbiAgICBpZiAodGhpcy5BZGRDYXNoQW1vdW50ICE9IG51bGwgJiYgdGhpcy5BZGRDYXNoQW1vdW50ICE9IFwiXCIgJiYgdGhpcy5BZGRDYXNoQW1vdW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAoX2Ftb3VudCA8PSBfZ2FtZWNhc2gpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaC50b1N0cmluZygpO1xyXG4gICAgICAgIF9nYW1lY2FzaCAtPSBfYW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX2dhbWVjYXNoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVXBkYXRlVXNlckRhdGEoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gsIC0xLCAtMSk7XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiQ2FzaCAkXCIgKyB0aGlzLkFkZENhc2hBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZC5cIik7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG8gbm90IGhhdmUgZW5vdWdoIGluIGdhbWUgY2FzaC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSA9IGZhbHNlLCBtb2RlSW5kZXggPSAwLCBfaXNCYW5rcnVwdGVkID0gZmFsc2UsIF9CYW5rcnVwdEFtb3VudCA9IDAsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIC8vY2FsbGVkIGZpcnN0IHRpbWUgZm9ybSBHYW1lTWFuYWdlciBvbmxvYWQgZnVuY3Rpb25cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gX2lzQ2FyZEZ1bmN0aW9uYWxpdHk7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IF9HaXZlbkNhc2g7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoO1xyXG5cclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gX2lzQmFua3J1cHRlZDtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IF9CYW5rcnVwdEFtb3VudDtcclxuXHJcbiAgICBpZiAoX2lzQmFua3J1cHRlZCkgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG5cclxuICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lLCBtb2RlSW5kZXgsIF9pc0JhbmtydXB0ZWQpO1xyXG4gIH0sXHJcbiAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUgPSBmYWxzZSwgbW9kZUluZGV4ID0gMCwgX2lzQmFua3J1cHRlZCA9IGZhbHNlKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXJkRnVuY3Rpb25hbGl0eSA9IG5ldyBHYW1lTWFuYWdlci5DYXJkRGF0YUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoaXNGaXJzdFRpbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFN0YXJ0R2FtZUNhc2g7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgIGlmIChpbnNpZGVHYW1lKSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gaW5kZXg7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICBpZiAoQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICAgIGlmIChTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgICAgICBQcmV2aW91c0Nhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSAwO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gR2l2ZW5DYXNoQnVzaW5lc3M7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuYXZhdGFySWQpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEdldE9ial9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5CdXNpbmVzc1NldHVwRGF0YTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAobmFtZSk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllclVJRCA9IFVJRDtcclxuICB9LFxyXG4gIE9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgICBpZiAoaXNOYU4oVUlEKSB8fCBVSUQgPT0gdW5kZWZpbmVkKSBVSUQgPSAwO1xyXG5cclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkF2YXRhcklEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IFwiXCI7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuICB9LFxyXG4gIE9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICB9LFxyXG4gIE9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXI7XHJcbiAgfSxcclxuICBPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gYW1vdW50O1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IGFtb3VudDtcclxuICB9LFxyXG4gIENhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgdGFrZW4gbG9hbiBvZiAkXCIgKyBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkbyBub3QgbmVlZCBsb2FuLCB5b3UgaGF2ZSBlbm91Z2ggY2FzaCB0byBidXkgY3VycmVudCBzZWxlY3RlZCBidXNpbmVzcy5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBSZXF1aXJlZENhc2ggPSBNYXRoLmFicyhwYXJzZUludChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKSAtIGFtb3VudCk7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFswXS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiJFwiICsgUmVxdWlyZWRDYXNoO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IHRha2UgbG9hbiBmb3IgY3VycmVudCBidXNpbmVzcyBzZXR1cFwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcikge1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDUwMDAwKTtcclxuICAgICAgfSBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZCkge1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDEwMDAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBzZWxlY3QgYnVzaW5lc3MgYmV0d2VlbiBIb21lIEJhc2VkIGFuZCBicmljayAmIG1vcnRhci5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXBcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG4gIEhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpbmRleCA9PSBpKSB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLk90aGVyO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMCk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGVuVGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgxKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW50eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMik7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGhpcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgzKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5Gb3J0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNCk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uRmlmdHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDUpO1xyXG4gIH0sXHJcbiAgT25UYWtlbkxvYW5DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9PSBMb2FuQW1vdW50RW51bS5PdGhlcikgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gUmVxdWlyZWRDYXNoO1xyXG4gICAgZWxzZSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBwYXJzZUludCh0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQpO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gdHJ1ZTtcclxuICAgIHRoaXMuT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggKyBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gIH0sXHJcblxyXG4gIFB1c2hEYXRhRm9yUGxheWVyTGVmdChfZGF0YSkge1xyXG4gICAgdmFyIF9tb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gMjAwMDA7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJJRCA9IF9kYXRhLnVzZXJJRDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBfZGF0YS5uYW1lO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQXZhdGFySUQgPSAwO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50ID0gMTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5DYXJkRnVuY3Rpb25hbGl0eSA9IG5ldyBHYW1lTWFuYWdlci5DYXJkRGF0YUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9IFwiU2Fsb29uXCI7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9IFwiRXZhIEJlYXV0eVwiO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLnB1c2goX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLCBfcGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgU3luY0RhdGE6IGZ1bmN0aW9uIChfZGF0YSwgX0lELCBfcGxheWVyTGVmdCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2lzU3BlY3RhdGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl07XHJcblxyXG4gICAgaWYgKF9pc1NwZWN0YXRlKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0UmVhbEFjdG9ycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX3BsYXllckxlZnQpIHtcclxuICAgICAgaWYgKF9JRCAhPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuYWN0b3JOcikgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goX2RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGggPj0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzKSB7XHJcbiAgICAgIC8vc2V0dGluZyByb29tIHByb3BlcnR5IHRvIGRlY2xhcmUgaW5pdGlhbCBzZXR1cCBoYXMgYmVlblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsIHRydWUsIHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLCB0cnVlKTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFB1cmNoYXNlQnVzaW5lc3M6IGZ1bmN0aW9uIChfYW1vdW50LCBfYnVzaW5lc3NOYW1lLCBfaXNIb21lQmFzZWQpIHtcclxuICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIDwgX2Ftb3VudCAmJiAhU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiICsgX2J1c2luZXNzTmFtZSArIFwiIGJ1c2luZXNzLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9pc0hvbWVCYXNlZCkge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPCAzKSB7XHJcbiAgICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJSZXZlcnRpbmcgYmFjayBsb2FuIGFtb3VudC5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Jc0JhbmtydXB0ID0gdHJ1ZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQmFua3J1cHRBbW91bnQgPSB0aGlzLkJhbmtydXB0ZWRBbW91bnQ7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAvL3NldHRpbmcgcGxheWVyIGN1cnJlbnQgZGF0YSBpbiBjdXN0b20gcHJvcGVydGllcyB3aGVuIGhpcy9oZXIgdHVybiBvdmVyc1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IGJhbmtydXB0ZWQ6IHRydWUsIHR1cm46IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCksIFBsYXllckRhdGFNYWluOiBQbGF5ZXJEYXRhSW50YW5jZSB9IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg5LCBfZGF0YSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIEFJXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICAgIH0sIDE2MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwibm8gbW9kZSBzZWxlY3RlZFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUGF5QW1vdW50VG9QbGF5R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9PSBcIlwiKSB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIHR5cGUuXCIpO1xyXG4gICAgZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPT0gXCJcIikgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyBuYW1lLlwiKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lIHx8IFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBhIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgaG9tZWJhc3NlZFxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCwgXCJob21lXCIsIHRydWUpO1xyXG4gICAgICBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcyg1MDAwMCwgXCJicmljayBhbmQgbW9ydGFyXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlN0YXJ0R2FtZSA9PSB0cnVlIHx8IHRoaXMuSXNCYW5rcnVwdGVkID09IHRydWUpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgaWYgKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwICE9IC0xKSB7XHJcbiAgICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcnRpbnRpbmcgYWxsIHZhbHVlcyB0byBjb25zb2xlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG5hbWU6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgSUQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIklzIHBsYXllciBib3Q6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLklzQm90KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gb2YgYnVzaW5lc3Mgb2YgcGxheWVyIChzZWUgYmVsb3cpOiBcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNhc2g6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkNhc2gpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgdGFrZW4gbG9hbjogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hblRha2VuKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW4gbG9hbiBhbW91bnQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBpc2FjdGl2ZTtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkNhc2hBbW91bnRMYWJlbC5zdHJpbmcgPSBcIiQgXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0uQ2FzaDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoVGVtcE1hcmtldGluZ0Ftb3VudCA9PSBcIlwiIHx8IFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHRoaXMubWFya2V0aW5nQW1vdW50ID0gcGFyc2VJbnQoVGVtcE1hcmtldGluZ0Ftb3VudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG5cclxuICAgICAgLy9pZiBwbGF5ZXIgZW50ZXJlZCBhbW91bnQgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIGNhc2ggaGUgb3duc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0aGlzLm1hcmtldGluZ0Ftb3VudCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ICsgdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcInlvdSBzdWNjZXNzZnVsbHkgbWFya2V0ZWQgYW1vdW50IG9mICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCArIFwiICwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFwiLlwiLFxyXG4gICAgICAgICAgTG9uZ01lc3NhZ2VUaW1lXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gaWYgcGxheWVyIGhhcyBtb3JlIHRoYW4gNTAwMCRcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cykge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gNTAwMCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgVGVtcEhpcmluZ0xhd3llciA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coVGVtcEhpcmluZ0xhd3llcik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSA1MDAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICsgXCIuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSkge1xyXG4gICAgTG9jYXRpb25OYW1lID0gX25hbWU7XHJcbiAgfSxcclxuICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQgPSBudWxsLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICAvL2lmIHBsYXllciBoYXMgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBoZSBjb3VsZCBleHBhbmQgaXRcclxuICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzXCIpO1xyXG5cclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuXHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB2YXIgZ2VuZXJhdGVkTGVuZ3RoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5LCBHaXZlbkNhc2hCdXNpbmVzcywgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKTtcclxuXHJcbiAgICBpZiAoZ2VuZXJhdGVkTGVuZ3RoID09IDApIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBubyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIHRvIGV4cGFuZC5cIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH0sIDE2MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzcyBleGl0IGNhbGxlZFwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgbmV3IGJ1c2luZXNzXCIpO1xyXG4gICAgdGhpcy5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBPbkdvbGREaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkSW52ZXN0ZWQpIHtcclxuICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uR29sZEludmVzdDtcclxuICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiSW52ZXN0IEluIEdPTERcIiwgRGljZVJlc3VsdCwgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJCVVlcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICBPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQgPSBudWxsLCBfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICBUdXJuT3ZlckZvckludmVzdCA9IF9pc1R1cm5PdmVyO1xyXG5cclxuICAgIGNvbnNvbGUuZXJyb3IoX2lzVHVybk92ZXIpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdCkgU3RvY2tCdXNpbmVzc05hbWUgPSBcIkZyaWVuZCdzIEJ1c2luZXNzXCI7XHJcblxyXG4gICAgaWYgKCF0aGlzLlN0b2NrSW52ZXN0ZWQgfHwgVHVybk92ZXJGb3JJbnZlc3QpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChTdG9ja0J1c2luZXNzTmFtZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhIGJ1c2luZXNzIG5hbWUgdG8gaW52ZXN0LlwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tJbnZlc3Q7XHJcblxyXG4gICAgICAgIGlmICghVHVybk92ZXJGb3JJbnZlc3QpIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgZWxzZSBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcblxyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiSW52ZXN0IGluIFN0b2NrXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBTaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIEJVWVwiLCBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiQlVZXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZFNvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiU2VsbCBHT0xEXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIFNFTExcIiwgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJTRUxMXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgR09MRCBvdW5jZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5TdG9ja1NvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ID4gMCkge1xyXG4gICAgICAgIHRoaXMuU3RvY2tTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLlN0b2NrU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiU2VsbCBTVE9DS1wiLCBEaWNlUmVzdWx0LCBcIkVhY2ggc2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvc2hhcmVcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBTRUxMXCIsIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiU0VMTFwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IHNoYXJlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZ28gaW50byBwYXJ0bmVyIHNoaXBcIik7XHJcbiAgICAvLyB0aGlzLlNob3dUb2FzdChcIndvcmsgaW4gcHJvZ3Jlc3MsIGNvbWluZyBzb29uLi4uXCIpO1xyXG4gICAgLy8gdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdGhpcy5FbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgfSxcclxuXHJcbiAgT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInJvbGwgdGhlIGRpY2VcIik7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbihmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbERpY2UoKTtcclxuICB9LFxyXG5cclxuICBQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgLy90aGlzLlRlbXBEaWNlVGV4dC5zdHJpbmc9dmFsdWU7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBhcnRuZXJzaGlwIHNldHVwXHJcbiAgVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5NYWluU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5XYWl0aW5nU3RhdHVzU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICBDYW5jZWxsZWRJRCA9IFtdO1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyTmFtZS5zdHJpbmcgPSBfdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBsYXllckNhc2guc3RyaW5nID0gXCIkXCIgKyBfdGVtcERhdGEuQ2FzaDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QYXJ0bmVyU2hpcFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICB2YXIgX3RvdGFsTG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgICB2YXIgX2FsbExvY2F0aW9uc0Ftb3VudCA9IF90b3RhbExvY2F0aW9ucyAqIDI1MDAwO1xyXG4gICAgICAgIHZhciBfZmluYWxBbW91bnQgPSA1MDAwMCArIF9hbGxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5QYXJ0bmVyTmFtZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbih0cnVlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKFwibm9uZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWUuc3RyaW5nID0gX3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllckNhc2guc3RyaW5nID0gXCIkXCIgKyBfdGVtcERhdGEuQ2FzaDtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uRGVzY3JpcHRpb24uc3RyaW5nID0gX21zZztcclxuICB9LFxyXG5cclxuICBFeGl0X1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKSB7XHJcbiAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gX2RhdGE7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkgX2J1c2luZXNzTW9kZSA9IFwiSG9tZSBCYXNlZFwiO1xyXG4gICAgZWxzZSBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSBfYnVzaW5lc3NNb2RlID0gXCJCcmljayAmIE1vcnRhclwiO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX21zZyA9XHJcbiAgICAgICAgXCJ5b3UgaGF2ZSByZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBieSBcIiArXHJcbiAgICAgICAgX3BsYXllckRhdGEuUGxheWVyTmFtZSArXHJcbiAgICAgICAgXCIgLCBmb2xsb3dpbmcgYXJlIHRoZSBkZXRhaWxzIG9mIGJ1c2luZXNzOiBcIiArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBOYW1lOiBcIiArXHJcbiAgICAgICAgX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzTmFtZSArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBNb2RlOiBcIiArXHJcbiAgICAgICAgX2J1c2luZXNzTW9kZSArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBWYWx1ZTogJFwiICtcclxuICAgICAgICBfYnVzaW5lc3NWYWx1ZSArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJDYXNoIFBheW1lbnQ6ICRcIiArXHJcbiAgICAgICAgX3BheUFtb3VudCArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJpZiBvZmZlciBpcyBhY2NlcHRlZCB5b3Ugd2lsbCByZWNlaXZlIDUwJSBzaGFyZSBvZiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MgYW5kIHdpbGwgcmVjZWl2ZSBwcm9maXQvbG9zZSBvbiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MuXCI7XHJcblxyXG4gICAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cChfbXNnKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIHZhciBteUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgIGlmIChQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCA+PSBfcGF5QW1vdW50KSB7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCAtPSBfcGF5QW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKHRydWUsIF9wYXlBbW91bnQsIGZhbHNlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiY29uZ3JhdHVsYXRpb25zISB5b3UgaGF2ZSBzdGFydGVkIGJ1c2luZXNzIHBhcnRuZXJzaGlwXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiTm90IGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2RhdGEgPSBQYXJ0bmVyU2hpcERhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBteUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG4gICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlEKTtcclxuICAgIGlmIChQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKGZhbHNlLCAwLCB0cnVlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2lzQWNjZXB0ZWQgPSBmYWxzZSwgX3BheW1lbnQgPSAwLCBfaXNDYW5jZWxsZWQgPSBmYWxzZSwgX3VJRCA9IFwiXCIsIF9kYXRhID0gbnVsbCwgX2J1c2luZXNzSW5kZXggPSAwKSB7XHJcbiAgICB2YXIgX21haW5EYXRhID0geyBEYXRhOiB7IEFjY2VwdGVkOiBfaXNBY2NlcHRlZCwgQ2FzaFBheW1lbnQ6IF9wYXltZW50LCBDYW5jZWxsZWQ6IF9pc0NhbmNlbGxlZCwgUGxheWVySUQ6IF91SUQsIFBsYXllckRhdGE6IF9kYXRhLCBCdXNpbmVzc0luZGV4OiBfYnVzaW5lc3NJbmRleCB9IH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEyLCBfbWFpbkRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHZhciBfYWNjZXB0ZWQgPSBfZGF0YS5EYXRhLkFjY2VwdGVkO1xyXG4gICAgICB2YXIgX2Nhc2ggPSBfZGF0YS5EYXRhLkNhc2hQYXltZW50O1xyXG4gICAgICB2YXIgX2NhbmNlbGxlZCA9IF9kYXRhLkRhdGEuQ2FuY2VsbGVkO1xyXG4gICAgICB2YXIgX3VpZCA9IF9kYXRhLkRhdGEuUGxheWVySUQ7XHJcbiAgICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5CdXNpbmVzc0luZGV4O1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJhbnN3ZXIgcmVjZWl2ZWRcIik7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIGlmIChfYWNjZXB0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9jYXNoO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXAgPSB0cnVlO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCA9IF91aWQ7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lck5hbWUgPSBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XSk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciBhY2NlcHRlZFwiKTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXJ0bmVyc2hpcCBvZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBcIiArIF9wbGF5ZXJEYXRhLlBsYXllck5hbWUgKyBcIiwgY2FzaCAkXCIgKyBfY2FzaCArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgYWNjb3VudC5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5pbmNsdWRlcyhfdWlkKSA9PSBmYWxzZSkgQ2FuY2VsbGVkSUQucHVzaChfdWlkKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhDYW5jZWxsZWRJRCk7XHJcbiAgICAgICAgICBpZiAoQ2FuY2VsbGVkSUQubGVuZ3RoID09IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGNhbmNlbGxlZCBieSBhbGwgb3RoZXIgdXNlcnMuXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgcmVqZWN0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfYWNjZXB0ZWQpIHtcclxuICAgICAgICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IGFuZCBzZWxsIG1vZGR1bGVcclxuXHJcbiAgUmVzZXRHb2xkSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuR29sZEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuU3RvY2tFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgb25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwoX2Ftb3VudCkge1xyXG4gICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gX2Ftb3VudDtcclxuXHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKlwiICsgRW50ZXJCdXlTZWxsQW1vdW50ICsgXCI9XCIgKyBfYW1vdW50KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgdGhpcy5SZXNldEdvbGRJbnB1dCgpO1xyXG4gICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX0ludmVzdFNlbGwoX3RpdGxlLCBfZGljZVJlc3VsdCwgX3ByaWNlVGl0bGUsIF9wcmljZVZhbHVlLCBfYnV5T3JTZWxsVGl0bGUsIF90b3RhbEFtb3VudFRpdGxlLCBfdG90YWxBbW91bnRWYWx1ZSwgX2J1dHRvbk5hbWUsIF9zdGF0ZSkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IF90aXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlUmVzdWx0O1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVRpdGxlTGFiZWwuc3RyaW5nID0gX3ByaWNlVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVmFsdWVMYWJlbC5zdHJpbmcgPSBfcHJpY2VWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV5T3JTZWxsVGl0bGVMYWJlbC5zdHJpbmcgPSBfYnV5T3JTZWxsVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VGl0bGVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXR0b25OYW1lTGFiZWwuc3RyaW5nID0gX2J1dHRvbk5hbWU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlRGF0YV9JbnZlc3RTZWxsKF90b3RhbEFtb3VudFZhbHVlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICB9LFxyXG5cclxuICBBcHBseUJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG5cclxuICAgICAgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEFtb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcblxyXG4gICAgICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIkJ1eWluZyBHT0xEOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBPdW5jZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJQdXJjaGFzZWQgT3VuY2VzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBPdW5jZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICBpZiAoX2Ftb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQpIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCAtPSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIiArIF9hbW91bnQgKyBcIiBvdW5jZXMgb2YgR09MRCBmb3IgICRcIiArIF9Ub3RhbEFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiU2VsbGluZyBHT0xEOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBPdW5jZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJTb2xkIE91bmNlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3IgT3VuY2VzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIEdPTEQgb3VuY2VzLCB5b3Ugb3duIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ICsgXCIgb2YgR09MRCBvdW5jZXNcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEFtb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgKz0gX2Ftb3VudDtcclxuICAgICAgICAgIC8vY2FuIGFkZCBtdWx0aXBsZSBzdG9ja3Mgd2l0aCBidXNpbmVzcyBuYW1lIGluIG9iamVjdCBpZiByZXF1aXJlZFxyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIiArIF9hbW91bnQgKyBcIiBzaGFyZXMgb2YgYnVzaW5lc3MgXCIgKyBTdG9ja0J1c2luZXNzTmFtZSwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiQnV5aW5nIFNUT0NLOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBzaGFyZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJQdXJjaGFzZWQgc2hhcmVzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBzaGFyZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja1NlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcblxyXG4gICAgICAgIGlmIChfYW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQpIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgLT0gX2Ftb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICsgX2Ftb3VudCArIFwiIHNoYXJlcyBvZiBzdG9jayBmb3IgICRcIiArIF9Ub3RhbEFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiU2VsbGluZyBTVE9DSzpcIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBPbmNlT3JTaGFyZSAvIDEwMDAgKyBcIlxcblwiICsgXCJQZXIgc2hhcmUgcHJpY2U6ICRcIiArIE9uY2VPclNoYXJlICsgXCJcXG5cIiArIFwiU29sZCBzaGFyZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIHNoYXJlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBzdG9ja3Mgc2hhcmVzLCB5b3Ugb3duIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArIFwiIG9mIHN0b2NrIHNoYXJlc1wiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRCdXR0b25fSW52ZXN0U2VsbCgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuXHJcbiAgICBpZiAoVHVybk92ZXJGb3JJbnZlc3QpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGF5ZGF5IG9yIERvdWJsZSBwYXkgRGF5XHJcbiAgVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgQk1BbW91bnQsIGxvYW5UYWtlbikge1xyXG4gICAgaWYgKEhNQW1vdW50ID09IDApIHtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQk1BbW91bnQgPT0gMCkge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsb2FuVGFrZW4pIHtcclxuICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRMb2FuQW1vdW50X1BheURheSgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHZhciBfbG9hbiA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW4gPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9sb2FuO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsIF9za2lwSE0gPSBmYWxzZSwgX3NraXBCTSA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSwgX2ZvclNlbGVjdGVkQnVzaW5lc3MgPSBmYWxzZSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDAsIF9oTUFtb3VudCA9IDAsIF9ibUFtb3VudCA9IDAsIF9ibUxvY2F0aW9uID0gMCwgUGF5ZGF5Q291bnRlciA9IDEsIERvdWJsZVBheUNvdW50ZXIgPSAwKSB7XHJcbiAgICBIQkRpY2VDb3VudGVyID0gMDtcclxuICAgIEJNRGljZUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIC8vICAgaWYgKERvdWJsZVBheUNvdW50ZXIgPT0gMCkgRG91YmxlUGF5Q291bnRlciA9IDE7XHJcblxyXG4gICAgLy8gIGlmIChEb3VibGVQYXlEYXkpIERvdWJsZVBheUNvdW50ZXIgPSBEb3VibGVQYXlDb3VudGVyICogMjtcclxuXHJcbiAgICB2YXIgX3JlcyA9IFBheWRheUNvdW50ZXIgKyBEb3VibGVQYXlDb3VudGVyO1xyXG4gICAgUGF5RGF5SW5mbyA9IFwiUGF5RGF5IFJlc3VsdCB3aXRoIG11bHRpcGxpZXI6IFwiICsgX3JlcztcclxuXHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuUGF5RGF5Q291bnQgPSBQYXlkYXlDb3VudGVyO1xyXG4gICAgdGhpcy5Eb3VibGVQYXlEYXlDb3VudCA9IERvdWJsZVBheUNvdW50ZXI7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfaXNEb3VibGVQYXlEYXk7XHJcbiAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB2YXIgX3RpbWUgPSAxODAwO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IF9mb3JTZWxlY3RlZEJ1c2luZXNzO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX1NlbGVjdGVkQnVzaW5lc3NJbmRleDtcclxuICAgIEhNQW1vdW50ID0gX2hNQW1vdW50O1xyXG4gICAgQk1BbW91bnQgPSBfYm1BbW91bnQ7XHJcbiAgICBCTUxvY2F0aW9ucyA9IF9ibUxvY2F0aW9uO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBpZiAoX2lzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwQk0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2FuVGFrZW4gPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgbG9hblRha2VuID0gX2xvYW5UYWtlbjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkTnVtYmVyTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMYWJlbC5zdHJpbmcgPSBCTUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxvY2F0aW9uTGFiZWwuc3RyaW5nID0gQk1Mb2NhdGlvbnM7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuUGFzc2VkUGF5RGF5Q291bnRMYWJlbC5zdHJpbmcgPSB0aGlzLlBheURheUNvdW50O1xyXG5cclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIC8vY2hlY2sgaWYgbG9hbiB3YXMgc2tpcHBlZCBwcmV2aW91c2x5XHJcbiAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHtcclxuICAgICAgdmFyIF9sb2FuID0gdGhpcy5HZXRMb2FuQW1vdW50X1BheURheSgpO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkZvdHRlckxhYmVsLnN0cmluZyA9IFwiKnBheSAkXCIgKyBfbG9hbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICQ1MDAwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwgMCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwSE0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwgQk1BbW91bnQsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIGlmIChfc2tpcEJNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuXHJcbiAgICBpZiAoX3NraXBCTSB8fCBfc2tpcEhNKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0sIF90aW1lICsgMjAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgICB0aGlzLk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgICB0aGlzLk9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIGlmICghSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5Eb3VibGVQYXlEYXlDb3VudCAhPSAwKSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciA9IDIgKiB0aGlzLkRvdWJsZVBheURheUNvdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAxMDAwO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYW1vdW50VG9CZUFkanVzdGVkID4gMCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH1cclxuICAgICAgLy9wYXJ0bmVyc2hpcCBjb2RlXHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIFRvdGFsUGF5RGF5QW1vdW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBITUFtb3VudCAqIF9kaWNlICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcbiAgICAgIGVsc2UgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogKEhNQW1vdW50ICogX2RpY2UpICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IEhNQW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCpcIiArIF9tdWx0aXBsaWVyICsgXCIpLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJIb21lIEJhc2VkIEJ1c2luZXNzOiBcIiArIEhNQW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIGlmICghQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcbiAgICAgIHZhciBfcGF5ZGF5bXVsdGlwbGllciA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9kb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfYW1vdW50ID0gQk1BbW91bnQgKyBCTUxvY2F0aW9ucztcclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG5cclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICAgIGlmIChfZG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuRG91YmxlUGF5RGF5Q291bnQgIT0gMCkge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgPSAyICogdGhpcy5Eb3VibGVQYXlEYXlDb3VudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IF9wYXltZW50IC8gMjtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW2luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYW1vdW50VG9CZUFkanVzdGVkID4gMCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9hbW91bnQgKiBfZGljZSAqIDIwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkO1xyXG4gICAgICBlbHNlIFRvdGFsUGF5RGF5QW1vdW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbXVsdGlwbGllciAqIChfYW1vdW50ICogX2RpY2UpICogMjAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IF9hbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBfYW1vdW50ICsgXCIqXCIgKyBcIjIwMDApLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIF9hbW91bnQgKyBcIipcIiArIFwiMjAwMCpcIiArIF9tdWx0aXBsaWVyICsgXCIpLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJCcmljayAmIE1vcnRhciBCdXNpbmVzczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2UgX0VzdGltYXRlTG9hbiA9IDUwMDA7XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfRXN0aW1hdGVMb2FuKSB7XHJcbiAgICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlUGF5bWVudF9QYXlEYXkoKSB7XHJcbiAgICAvL2FsbFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTa2lwTG9hbk9uZVRpbWVfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBza2lwcGVkIHRoZSBsb2FuIHBheW1lbnQsIGJhbmsgd2lsbCBjYWxsIHVwb24gY29tcGxldGUgbG9hbiBhbW91bnQgb24gbmV4dCBwYXlkYXlcIik7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1BheURheShfYW1vdW50KSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBFeGl0TG9hblNjcmVlbl9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBTdGFydE5ld0dhbWVfUGF5RGF5KCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0LlwiLCAzMDAwLCBmYWxzZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU2hvd0NhcmRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgMzAxMCk7XHJcbiAgfSxcclxuXHJcbiAgU2hvd0luZm8oX2RhdGEpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KF9kYXRhLmluZm8sIDIwMDAsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIFBheURheUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChIb21lQmFzZWRQYXltZW50Q29tcGxldGVkICYmIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCAmJiBMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBheWRheSBkb25lXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKFBheURheUluZm8pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxsICYgbWFuaXB1bGF0ZSBCdXNpbmVzcyBVSVxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTExcIjtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIGVsc2Ugbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVU0lORVNTXCI7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICAvLyBlbHNlXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX2lzQm90KSB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG5cclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90KTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgVUlcclxuICBUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiSU5WRVNUXCI7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICBUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVZIE9SIFNFTExcIjtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzZXR1cCBVaVxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNob3dRdWVzdGlvblRvYXN0KF9tc2cpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW5MYWJlbC5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb25lUXVlc3Rpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgb25lUXVlc3Rpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX21zZykge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nID0gX21zZztcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtZXNzYWdlLCB0aW1lID0gU2hvcnRNZXNzYWdlVGltZSwgX2hhc2J1dHRvbiA9IHRydWUpIHtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Qb3BVcFVJTGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90IG1vZGUgb25seVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+IDAgJiYgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLklzQm90KSB7XHJcbiAgICAgICAgLy8gaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICAvLyAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIC8vICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICAvLyAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDb21wbGV0ZVRvYXN0KCkge1xyXG4gICAgY29uc29sZS5lcnJvcihcImNvbXBsZXRlIHRvYXN0IGNhbGxlZFwiKTtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICB9LFxyXG5cclxuICBTaG93UmVzdWx0U2NyZWVuOiBmdW5jdGlvbiAoX3N0YXR1cywgX2RhdGEpIHtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5SZXN1bHRTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBfc3RhdHVzO1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLkJvZHlMYWJlbC5zdHJpbmcgPSBfZGF0YTtcclxuICB9LFxyXG5cclxuICBSZXN0YXJ0VGhlR2FtZSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jSW5mbyhfZGF0YUluZm8pIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIHZhciBfZGF0YSA9IHsgaW5mbzogX2RhdGFJbmZvIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTUsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX21vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBpbmZvOiBfZGF0YUluZm8gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE1LCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuIl19