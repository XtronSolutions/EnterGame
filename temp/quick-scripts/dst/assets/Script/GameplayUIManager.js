
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
var selectPlayerProfitNodes = [];
var businessDetailPartnershipNodes = [];
var businessDetailPayDayNodes = [];
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
var TimerTimeout;
var DoubleDayBusinessHB = 0;
var DoubleDayBusinessBM = 0;
var GiveProfitUserID = "";
var TotalPayDay = 0; // var CompletionWindowTime = 500;//8000
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
}); //-------------------------------------------class for BusinessPayDaySetupUI-------------------------//

var BusinessPayDaySetupUI = cc.Class({
  name: "BusinessPayDaySetupUI",
  properties: {
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
    TitleContentLabel: {
      displayName: "TitleContentLabel",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    BusinessPrefab: {
      displayName: "BusinessPrefab",
      type: cc.Prefab,
      "default": null,
      serializable: true
    },
    ScrollContent: {
      displayName: "ScrollContent",
      type: cc.Node,
      "default": null,
      serializable: true
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for SelectPlayerForProfitSetupUI-------------------------//

var SelectPlayerForProfitSetupUI = cc.Class({
  name: "SelectPlayerForProfitSetupUI",
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
var NextHalfPayDay = false;
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
    BusinessPayDayUISetup: {
      "default": {},
      type: BusinessPayDaySetupUI,
      serializable: true,
      tooltip: "reference of BusinessPayDaySetupUI class"
    },
    SelectPlayerForProfitUI: {
      "default": {},
      type: SelectPlayerForProfitSetupUI,
      serializable: true,
      tooltip: "reference of SelectPlayerForProfitSetupUI class"
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
    BusinessDoublePayScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for BusinessDoublePay screen"
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
    SelectPlayerForProfitScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SelectPlayerForProfit screen"
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
    DoubleDayBusinessHB = 0;
    DoubleDayBusinessBM = 0;
    NextHalfPayDay = false;
    GameManager = null;
    GamePlayReferenceManager = null;
    businessDetailNodes = [];
    oneQuestionNodes = [];
    selectPlayerProfitNodes = [];
    businessDetailPartnershipNodes = [];
    businessDetailPayDayNodes = [];
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
    GiveProfitUserID = "";
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
    TotalPayDay = 0;
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
    var _active = isactive;

    if (_active) {
      _active = false;
      this.TurnDecisionSetupUI.BlockerNode.active = false;
      this.Timer = globalTurnTimer;
      this.TimerStarted = true;
      this.TurnDecisionSetupUI.TimerText.string = this.Timer + " seconds are left to choose above options except 'Roll The Dice'";
      clearTimeout(TimerTimeout);
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
      this.Timer = this.Timer - 1;
      this.TurnDecisionSetupUI.TimerText.string = this.Timer + " seconds are left to choose above options except 'Roll The Dice'";
      TimerTimeout = setTimeout(function () {
        _this2.UpdateTimer();
      }, 1000);
    } else {
      clearTimeout(TimerTimeout);
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
  AssignData_PayDay: function AssignData_PayDay(_title, _isDoublePayDay, _skipHM, _skipBM, _isBot, _forSelectedBusiness, _SelectedBusinessIndex, _hMAmount, _bmAmount, _bmLocation, PaydayCounter, DoublePayCounter, _halfPayday) {
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

    if (_halfPayday === void 0) {
      _halfPayday = false;
    }

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex];

    TotalPayDay = 0;
    GiveProfitUserID = "";

    if (_manager.PlayerGameInfo[_playerIndex].CanGiveProfitOnPayDay) {
      GiveProfitUserID = _manager.PlayerGameInfo[_playerIndex].UserIDForProfitPayDay;
      _manager.PlayerGameInfo[_playerIndex].CanGiveProfitOnPayDay = false;
      _manager.PlayerGameInfo[_playerIndex].UserIDForProfitPayDay = "";
    }

    console.error(GiveProfitUserID);
    console.error(_manager.PlayerGameInfo[_playerIndex].UserIDForProfitPayDay);

    if (GiveProfitUserID != "") {
      this.ShowToast("your whole profit will be transferred to other player this turn.", 1200);
    }

    HBDiceCounter = 0;
    BMDiceCounter = 0;
    NextHalfPayDay = _halfPayday; //   if (DoublePayCounter == 0) DoublePayCounter = 1;
    //  if (DoublePayDay) DoublePayCounter = DoublePayCounter * 2;

    DoubleDayBusinessHB = 0;
    DoubleDayBusinessBM = 0;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) {
        if (_tempData.NoOfBusiness[index].ReceiveDoublePayDay) {
          DoubleDayBusinessHB++;
        }
      } else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) {
        if (_tempData.NoOfBusiness[index].ReceiveDoublePayDay) {
          DoubleDayBusinessBM++;
        }
      }
    }

    if (DoubleDayBusinessHB > 0 || DoubleDayBusinessBM > 0) {
      this.ShowToast("your will receive double profits on " + (DoubleDayBusinessHB + DoubleDayBusinessBM) + " business/es.", 1200);
    }

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
        if (NextHalfPayDay) {
          this.ShowToast("your will receive half profits this payday.", _time);
        } //check skip payday variables


        if (_skipHM && _skipBM) this.ShowToast("your payday on home based and brick & mortar businessess will be skipped.", _time);else if (_skipHM) this.ShowToast("your payday on home based businessess will be skipped.", _time);else if (_skipBM) this.ShowToast("your payday on brick & mortar businessess will be skipped.", _time);
      } else {
        //check skip payday variables
        if (_skipHM && _skipBM) console.log("your payday on home based and brick & mortar businessess will be skipped.");else if (_skipHM) console.log("your payday on home based businessess will be skipped.");else if (_skipBM) console.log("your payday on brick & mortar businessess will be skipped.");
      }
    }

    this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);

    if (!SelectedBusinessPayDay) {
      HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;
      BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
      BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;
    }

    var _loanTaken = false;
    var _businessIndex = 0;

    for (var _index = 0; _index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; _index++) {
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = _index;
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
      var _halfPayday = NextHalfPayDay;

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
      var _paydaymultiplier = this.PayDayCount;
      if (_halfPayday) _multiplier = _multiplier / 2; //partnership code

      if (_doublePayDay) {
        if (this.DoublePayDayCount != 0) {
          _multiplier *= 2 * this.DoublePayDayCount;
        } else {
          _multiplier *= 2;
        }
      }

      var doublePayDayAdded = _multiplier * _paydaymultiplier * DoubleDayBusinessHB * _dice * 1000;

      if (!SelectedBusinessPayDay) {
        for (var index = 0; index < _tempData.length; index++) {
          if (_tempData[index].BusinessType == 1) {
            if (_tempData[index].IsPartnership) {
              var _payment = _paydaymultiplier * _multiplier * _dice * 1000 + doublePayDayAdded;

              _amountToBeSend = _payment / 2;

              _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[index].PartnerID);

              _amountToBeAdjusted += _amountToBeSend;
            }
          }
        }
      } else {
        if (_tempData[SelectedBusinessIndex].BusinessType == 1) {
          if (_tempData[SelectedBusinessIndex].IsPartnership) {
            var _payment = _paydaymultiplier * _multiplier * _dice * 1000 + doublePayDayAdded;

            _amountToBeSend = _payment / 2;

            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[SelectedBusinessIndex].PartnerID);

            _amountToBeAdjusted += _amountToBeSend;
          }
        }
      }

      if (_amountToBeAdjusted > 0) {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", LongMessageTime);
      } //partnership code


      if (!_doublePayDay) TotalPayDayAmount = _multiplier * _paydaymultiplier * HMAmount * _dice * 1000 - _amountToBeAdjusted + doublePayDayAdded;else TotalPayDayAmount = _paydaymultiplier * _multiplier * (HMAmount * _dice) * 1000 - _amountToBeAdjusted + doublePayDayAdded;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;
      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + HMAmount + "*" + "1000)-" + _amountToBeAdjusted + "+" + doublePayDayAdded + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + HMAmount + "*" + "1000*" + _multiplier + ")-" + _amountToBeAdjusted + "+" + doublePayDayAdded + "=" + TotalPayDayAmount;
      PayDayInfo += "\n" + "\n" + "Home Based Business: " + HMAmount + "\n" + "Dice Rolled: " + _dice + "\n" + "Amount Received: $" + TotalPayDayAmount;
      TotalPayDay += TotalPayDayAmount;

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
      var _halfPayday = NextHalfPayDay;

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
      if (_halfPayday) _multiplier = _multiplier / 2;

      if (_doublePayDay) {
        if (this.DoublePayDayCount != 0) {
          _multiplier *= 2 * this.DoublePayDayCount;
        } else {
          _multiplier *= 2;
        }
      }

      var doublePayDayAdded = _paydaymultiplier * _multiplier * DoubleDayBusinessBM * _dice * 2000;

      if (!SelectedBusinessPayDay) {
        for (var index = 0; index < _tempData.length; index++) {
          if (_tempData[index].BusinessType == 2) {
            if (_tempData[index].IsPartnership) {
              var _locations = _tempData[index].LocationsName.length + 1;

              var _payment = _paydaymultiplier * _locations * _multiplier * _dice * 2000 + doublePayDayAdded;

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

            var _payment = _paydaymultiplier * _locations * _multiplier * _dice * 2000 + doublePayDayAdded;

            _amountToBeSend = _payment / 2;

            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[SelectedBusinessIndex].PartnerID);

            _amountToBeAdjusted += _amountToBeSend;
          }
        }
      }

      if (_amountToBeAdjusted > 0) {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", LongMessageTime);
      }

      if (!_doublePayDay) TotalPayDayAmount = _multiplier * _paydaymultiplier * _amount * _dice * 2000 - _amountToBeAdjusted + doublePayDayAdded;else TotalPayDayAmount = _paydaymultiplier * _multiplier * (_amount * _dice) * 2000 - _amountToBeAdjusted + doublePayDayAdded;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;
      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + _amount + "*" + "2000)-" + _amountToBeAdjusted + "+" + doublePayDayAdded + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + _amount + "*" + "2000*" + _multiplier + ")-" + _amountToBeAdjusted + "+" + doublePayDayAdded + "=" + TotalPayDayAmount;
      PayDayInfo += "\n" + "\n" + "Brick & Mortar Business: " + _amount + "\n" + "Dice Rolled: " + _dice + "\n" + "Amount Received: $" + TotalPayDayAmount;
      TotalPayDay += TotalPayDayAmount;

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
    var _this8 = this;

    if (HomeBasedPaymentCompleted && BrickMortarPaymentCompleted && LoanPayed) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      console.log("all payday done");
      this.TogglePayDayScreen_PayDay(false);

      if (GiveProfitUserID != "") {
        this.ShowToast("Your whole Payday amount $" + TotalPayDay + " will be transferred to other player now.", 2200);

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash -= TotalPayDay;
        GamePlayReferenceManager.Instance.Get_GameManager().SendProfit_Partner_TurnDecision(TotalPayDay, GiveProfitUserID);
        setTimeout(function () {
          _this8.RaiseEventForCompletion();
        }, 3200);
      } else {
        this.RaiseEventForCompletion();
      }
    }
  },
  RaiseEventForCompletion: function RaiseEventForCompletion() {
    if (!SelectedBusinessPayDay) {
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
      GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false, false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleDoublePayNextTurn(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleHalfPayNextTurn(false);
      GamePlayReferenceManager.Instance.Get_GameManager().callUponCard();
    } else {
      GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
    }

    this.RaiseEventToSyncInfo(PayDayInfo);
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
      for (var _index2 = 0; _index2 < _actorsData.length; _index2++) {
        if (_myData.PlayerUID != _actorsData[_index2].PlayerUID) {
          var node = cc.instantiate(this.OneQuestionSetupUI.DetailsPrefab);
          node.parent = this.OneQuestionSetupUI.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[_index2].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[_index2].PlayerUID);
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
  //#region Select Business ofr double payday setup
  ToggleScreen_BusinessPayDayUISetup: function ToggleScreen_BusinessPayDayUISetup(_state) {
    this.BusinessDoublePayScreen.active = _state;
  },
  EditTitle_BusinessPayDayUISetup: function EditTitle_BusinessPayDayUISetup(_mainTitle, _tileContent) {
    this.BusinessPayDayUISetup.TitleName.string = _mainTitle;
    this.BusinessPayDayUISetup.TitleContentLabel.string = _tileContent;
  },
  ExitScreen_BusinessPayDayUISetup: function ExitScreen_BusinessPayDayUISetup() {
    this.ClearBusiness_BusinessPayDayUISetup();
    this.ToggleScreen_BusinessPayDayUISetup(false);
  },
  ExitScreen_AlongTurnOver_BusinessPayDayUISetup: function ExitScreen_AlongTurnOver_BusinessPayDayUISetup() {
    this.ClearBusiness_BusinessPayDayUISetup();
    this.ToggleScreen_BusinessPayDayUISetup(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  ClearBusiness_BusinessPayDayUISetup: function ClearBusiness_BusinessPayDayUISetup() {
    for (var index = 0; index < businessDetailPayDayNodes.length; index++) {
      businessDetailPayDayNodes[index].destroy();
    }

    businessDetailPayDayNodes = [];
  },
  ProcessBusiness_BusinessPayDayUISetup: function ProcessBusiness_BusinessPayDayUISetup(_tempData, _businessType) {
    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == _businessType) {
        var node = cc.instantiate(this.BusinessPayDayUISetup.BusinessPrefab);
        node.parent = this.BusinessPayDayUISetup.ScrollContent;
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

        businessDetailPayDayNodes.push(node);
      }
    }
  },
  EnableSeletiveDoublePayDay_BusinessPayDayUISetup: function EnableSeletiveDoublePayDay_BusinessPayDayUISetup(_isHomeBased, _isBrickAndMortar) {
    if (_isHomeBased === void 0) {
      _isHomeBased = false;
    }

    if (_isBrickAndMortar === void 0) {
      _isBrickAndMortar = false;
    }

    this.ClearBusiness_BusinessPayDayUISetup();

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = _manager.GetTurnNumber();

    var _tempData = _manager.PlayerGameInfo[_playerIndex];
    this.EditTitle_BusinessPayDayUISetup("BUSINESS", "*Select a business to receive double payday profits through out game on that business.");
    this.ToggleScreen_BusinessPayDayUISetup(true);
    this.BusinessPayDayUISetup.PlayerName.string = _tempData.PlayerName;
    this.BusinessPayDayUISetup.PlayerCash.string = "$" + _tempData.Cash;

    if (_isBrickAndMortar) {
      this.ProcessBusiness_BusinessPayDayUISetup(_tempData, 2);
    }

    if (_isHomeBased) {
      this.ProcessBusiness_BusinessPayDayUISetup(_tempData, 1);
    }
  },
  //#endregion
  //#region Select Player for profit
  ToggleScreen_SelectPlayerForProfit: function ToggleScreen_SelectPlayerForProfit(_state) {
    this.SelectPlayerForProfitScreen.active = _state;
  },
  SetUpSpaceScreen_SelectPlayerForProfit: function SetUpSpaceScreen_SelectPlayerForProfit(_myData, _actorsData, _isTurnOver, _modeIndex) {
    if (_modeIndex === void 0) {
      _modeIndex = 0;
    }

    this.SelectPlayerForProfitUI.TitleLabel.string = "SELECT PLAYER";
    this.SelectPlayerForProfitUI.CashLabel.string = "$" + _myData.Cash;
    this.SelectPlayerForProfitUI.PlayerNameLabel.string = _myData.PlayerName;
    this.SelectPlayerForProfitUI.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;

    if (_modeIndex == 2) {
      for (var index = 0; index < _actorsData.length; index++) {
        if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) {
          //check if player is spectate or not, dont add any spectates
          if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
            var node = cc.instantiate(this.SelectPlayerForProfitUI.DetailsPrefab);
            node.parent = this.SelectPlayerForProfitUI.ScrollContent;
            node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
            node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);
            selectPlayerProfitNodes.push(node);
          }
        }
      }
    } else if (_modeIndex == 1) {
      //for bot
      for (var _index3 = 0; _index3 < _actorsData.length; _index3++) {
        if (_myData.PlayerUID != _actorsData[_index3].PlayerUID) {
          var node = cc.instantiate(this.SelectPlayerForProfitUI.DetailsPrefab);
          node.parent = this.SelectPlayerForProfitUI.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[_index3].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[_index3].PlayerUID);
          selectPlayerProfitNodes.push(node);
        }
      }
    }

    if (_isTurnOver) {
      this.SelectPlayerForProfitUI.ExitButton.active = false;
      this.SelectPlayerForProfitUI.TurnOverExitButton.active = true;
    } else {
      this.SelectPlayerForProfitUI.ExitButton.active = true;
      this.SelectPlayerForProfitUI.TurnOverExitButton.active = false;
    }
  },
  ResetSpaceScreen_SelectPlayerForProfit: function ResetSpaceScreen_SelectPlayerForProfit() {
    for (var index = 0; index < selectPlayerProfitNodes.length; index++) {
      selectPlayerProfitNodes[index].destroy();
    }

    selectPlayerProfitNodes = [];
  },
  Exit_SelectPlayerForProfit: function Exit_SelectPlayerForProfit() {
    this.ToggleScreen_SelectPlayerForProfit(false);
  },
  ExitAlongTurnOver_SelectPlayerForProfit: function ExitAlongTurnOver_SelectPlayerForProfit() {
    this.ToggleScreen_SelectPlayerForProfit(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  ShowToast: function ShowToast(message, time, _hasbutton) {
    var _this9 = this;

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
            _this9.CompleteToast();
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
            _this9.CompleteToast();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwic2VsZWN0UGxheWVyUHJvZml0Tm9kZXMiLCJidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMiLCJidXNpbmVzc0RldGFpbFBheURheU5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiZ2xvYmFsVHVyblRpbWVyIiwiUGF5RGF5SW5mbyIsIkludmVzdFNlbGxJbmZvIiwiVGltZXJUaW1lb3V0IiwiRG91YmxlRGF5QnVzaW5lc3NIQiIsIkRvdWJsZURheUJ1c2luZXNzQk0iLCJHaXZlUHJvZml0VXNlcklEIiwiVG90YWxQYXlEYXkiLCJMb2FuQW1vdW50RW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJUZW5UaG91c2FuZCIsIlRlbnR5VGhvdXNhbmQiLCJUaGlydHlUaG91c2FuZCIsIkZvcnR5VGhvdXNhbmQiLCJGaWZ0eVRob3VzYW5kIiwiT3RoZXIiLCJCdXNpbmVzc1NldHVwVUkiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZVVJIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUGxheWVyQ2FzaFVJIiwiQnVzaW5lc3NUeXBlVGV4dFVJIiwiVGV4dCIsIkJ1c2luZXNzTmFtZVRleHRVSSIsIkJ1c2luZXNzVHlwZUxhYmVsIiwiRWRpdEJveCIsIkJ1c2luZXNzTmFtZUxhYmVsIiwiSG9tZUJhc2VkTm9kZVVJIiwiTm9kZSIsIkJyaWNrQW5kTW9ydGFyTm9kZVVJIiwiVGltZXJVSSIsIlRpbWVyTm9kZSIsIkJ1c2luZXNzU2V0dXBOb2RlIiwiTG9hblNldHVwTm9kZSIsIkxvYW5BbW91bnQiLCJMb2FuQW1vdW50TGFiZWwiLCJXYWl0aW5nU3RhdHVzTm9kZSIsIkV4aXRCdXR0b25Ob2RlIiwiQWRkQnV0dG9uTm9kZSIsIkFkZENhc2hTY3JlZW4iLCJBZGRDYXNoTGFiZWwiLCJBZGRDYXNoRWRpdEJveCIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJUaW1lclRleHQiLCJCbG9ja2VyTm9kZSIsIkludmVzdEVudW0iLCJTdG9ja0ludmVzdCIsIkdvbGRJbnZlc3QiLCJTdG9ja1NlbGwiLCJHb2xkU2VsbCIsIkludmVzdFNlbGxVSSIsIlRpdGxlTGFiZWwiLCJEaWNlUmVzdWx0TGFiZWwiLCJQcmljZVRpdGxlTGFiZWwiLCJQcmljZVZhbHVlTGFiZWwiLCJCdXlPclNlbGxUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRWYWx1ZUxhYmVsIiwiQnV0dG9uTmFtZUxhYmVsIiwiSW52ZXN0U3RhdGUiLCJBbW91bnRFZGl0Qm94IiwiU2VsbEJ1c2luZXNzVUkiLCJDYXNoTGFiZWwiLCJQbGF5ZXJOYW1lTGFiZWwiLCJCdXNpbmVzc0NvdW50TGFiZWwiLCJTY3JvbGxDb250ZW50Tm9kZSIsIkJ1c2luZXNzU2VsbFByZWZhYiIsIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIiwiRXhpdEJ1dHRvbiIsIlR1cm5PdmVyRXhpdEJ1dHRvbiIsIlBheURheVVJIiwiSG9tZUJhc2VkTnVtYmVyTGFiZWwiLCJCTU51bWJlckxhYmVsIiwiQk1OdW1iZXJMb2NhdGlvbkxhYmVsIiwiUGFzc2VkUGF5RGF5Q291bnRMYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJPbmVRdWVzdGlvblVJIiwiUGxheWVyRGV0YWlsTGFiZWwiLCJEZXRhaWxzUHJlZmFiIiwiU2Nyb2xsQ29udGVudCIsIldhaXRpbmdTY3JlZW4iLCJXYWl0aW5nU2NyZWVuTGFiZWwiLCJEZWNpc2lvblRpdGxlTGFiZWwiLCJEZWNpc2lvbkNhc2hMYWJlbCIsIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsIiwiRGVjaXNpb25RdWVzdGlvbkxhYmVsIiwiUGFydG5lcnNoaXBVSSIsIldhaXRpbmdTdGF0dXNTY3JlZW4iLCJNYWluU2NyZWVuIiwiVGl0bGVOYW1lIiwiUGxheWVyTmFtZSIsIlBsYXllckNhc2giLCJQYXJ0bmVyU2hpcFByZWZhYiIsIkRlY2lzaW9uU2NyZWVuIiwiRGVjaXNpb25QbGF5ZXJOYW1lIiwiRGVjaXNpb25QbGF5ZXJDYXNoIiwiRGVjaXNpb25EZXNjcmlwdGlvbiIsIlJlc3VsdFVJIiwiUmVzdWx0U2NyZWVuIiwiU3RhdHVzTGFiZWwiLCJCb2R5TGFiZWwiLCJCdXNpbmVzc1BheURheVNldHVwVUkiLCJUaXRsZUNvbnRlbnRMYWJlbCIsIkJ1c2luZXNzUHJlZmFiIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSSIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSEJEaWNlQ291bnRlciIsIkJNRGljZUNvdW50ZXIiLCJOZXh0SGFsZlBheURheSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJPbmVRdWVzdGlvblNldHVwVUkiLCJQYXJ0bmVyc2hpcFNldHVwVUkiLCJSZXN1bHRTZXR1cFVJIiwiQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0VUkiLCJQb3BVcFVJIiwiUG9wVXBVSUxhYmVsIiwiUG9wVXBVSUJ1dHRvbiIsIkdhbWVwbGF5VUlTY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiQnVzaW5lc3NEb3VibGVQYXlTY3JlZW4iLCJPbmVRdWVzdGlvblNwYWNlU2NyZWVuIiwiT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbiIsIlNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbiIsIkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJBdmF0YXJTcHJpdGVzIiwiU3ByaXRlRnJhbWUiLCJSZXNldEFsbERhdGEiLCJSZXNldFR1cm5WYXJpYWJsZSIsIkdvbGRJbnZlc3RlZCIsIkdvbGRTb2xkIiwiU3RvY2tJbnZlc3RlZCIsIlN0b2NrU29sZCIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsIklzQm90VHVybiIsIlBheURheUNvdW50IiwiRG91YmxlUGF5RGF5Q291bnQiLCJJc0JhbmtydXB0ZWQiLCJCYW5rcnVwdGVkQW1vdW50IiwiQWRkQ2FzaEFtb3VudCIsIlRpbWVyIiwiVGltZXJTdGFydGVkIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJfc3RhdGUiLCJhY3RpdmUiLCJFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsIlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cCIsIkVuYWJsZUNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIlN0dWRlbnREYXRhIiwiZ2FtZUNhc2giLCJPbkNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIl92YWwiLCJPbkNsaWNrRG9uZUNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIl9nYW1lY2FzaCIsInBhcnNlSW50IiwiX2Ftb3VudCIsInVuZGVmaW5lZCIsIkNhc2giLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJVcGRhdGVVc2VyRGF0YSIsIlNob3dUb2FzdCIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsImlzRmlyc3RUaW1lIiwiaW5zaWRlR2FtZSIsIm1vZGVJbmRleCIsIl9pc0JhbmtydXB0ZWQiLCJfQmFua3J1cHRBbW91bnQiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiQnVzaW5lc3NJbmZvIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwibGVuZ3RoIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cCIsIkF2YXRhcklEIiwiYXZhdGFySWQiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsImlzTmFOIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIk9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsIkhvbWVCYXNlZCIsIk9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiYnJpY2tBbmRtb3J0YXIiLCJhbW91bnQiLCJDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAiLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJOb09mQnVzaW5lc3MiLCJMb2FuVGFrZW4iLCJNYXRoIiwiYWJzIiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiUHVzaERhdGFGb3JQbGF5ZXJMZWZ0IiwiX2RhdGEiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIl9wbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllcklEIiwiSG9tZUJhc2VkQW1vdW50IiwiSXNBY3RpdmUiLCJfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsInB1c2giLCJSYWlzZUV2ZW50IiwiX0lEIiwiX3BsYXllckxlZnQiLCJfaXNTcGVjdGF0ZSIsIlBob3RvbkFjdG9yIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJNYXhQbGF5ZXJzIiwiR2V0UmVhbEFjdG9ycyIsImFjdG9yTnIiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYnVzaW5lc3NOYW1lIiwiX2lzSG9tZUJhc2VkIiwiU3RhcnRHYW1lIiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJFeGl0X0J1c2luZXNzU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJHZXRUdXJuTnVtYmVyIiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiX2FjdGl2ZSIsImNsZWFyVGltZW91dCIsIlVwZGF0ZVRpbWVyIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIl9pc1R1cm5PdmVyIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiUm9sbE9uZURpY2UiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAiLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiUmVzZXRfUGFydG5lclNoaXBTZXR1cCIsIl9tYW5hZ2VyIiwiX3RlbXBEYXRhIiwibm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0TmFtZSIsIlNldFR5cGUiLCJTZXRCdXNpbmVzc0luZGV4IiwiX3RvdGFsTG9jYXRpb25zIiwiTG9jYXRpb25zTmFtZSIsIlNldEJ1c2luZXNzTW9kZSIsIlNldE1vZGUiLCJTZXRCdXNpbmVzc1ZhbHVlIiwiU2V0RmluYWxCdXNpbmVzc1ZhbHVlIiwiX2FsbExvY2F0aW9uc0Ftb3VudCIsIl9maW5hbEFtb3VudCIsIlNldEJhbGFuY2UiLCJTZXRMb2NhdGlvbnMiLCJJc1BhcnRuZXJzaGlwIiwiVG9nZ2xlUGFydG5lclNoaXBCdXR0b24iLCJTZXRQYXJ0bmVyTmFtZSIsIlBhcnRuZXJOYW1lIiwiRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwIiwiX21zZyIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkV4aXRfUGFydG5lclNoaXBTZXR1cCIsImRlc3Ryb3kiLCJSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cCIsIl9hY3RvciIsIl90dXJuIiwiVHVybiIsIl9wbGF5ZXJEYXRhIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJfYnVzaW5lc3NWYWx1ZSIsIkJ1c1ZhbHVlIiwiX3BheUFtb3VudCIsIl9idXNpbmVzc01vZGUiLCJDaGVja1NwZWN0YXRlIiwiQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hbGxBY3RvcnMiLCJSb29tQWN0b3JzIiwibXlJbmRleCIsIkdldE15SW5kZXgiLCJSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIkNhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfaXNBY2NlcHRlZCIsIl9wYXltZW50IiwiX2lzQ2FuY2VsbGVkIiwiX3VJRCIsIl9tYWluRGF0YSIsIkFjY2VwdGVkIiwiQ2FzaFBheW1lbnQiLCJDYW5jZWxsZWQiLCJCdXNpbmVzc0luZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hY2NlcHRlZCIsIl9jYXNoIiwiX2NhbmNlbGxlZCIsIl91aWQiLCJQYXJ0bmVySUQiLCJpbmNsdWRlcyIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiUmFpc2VFdmVudFRvU3luY0luZm8iLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX2hNQW1vdW50IiwiX2JtQW1vdW50IiwiX2JtTG9jYXRpb24iLCJQYXlkYXlDb3VudGVyIiwiRG91YmxlUGF5Q291bnRlciIsIl9oYWxmUGF5ZGF5IiwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5IiwiVXNlcklERm9yUHJvZml0UGF5RGF5IiwiUmVjZWl2ZURvdWJsZVBheURheSIsIl9yZXMiLCJfdGltZSIsIlVwZGF0ZUNhc2hfUGF5RGF5IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQYXlEYXlDb21wbGV0ZWQiLCJPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfZG91YmxlUGF5RGF5IiwiX2RpY2UiLCJfYW1vdW50VG9CZVNlbmQiLCJfYW1vdW50VG9CZUFkanVzdGVkIiwiX211bHRpcGxpZXIiLCJfcGF5ZGF5bXVsdGlwbGllciIsImRvdWJsZVBheURheUFkZGVkIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIlJlY2VpdmVQYXltZW50X1BheURheSIsIl9sb2NhdGlvbnMiLCJfRXN0aW1hdGVMb2FuIiwiU2tpcExvYW5PbmVUaW1lX1BheURheSIsIlNlbGxCdXNpbmVzc19QYXlEYXkiLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdExvYW5TY3JlZW5fUGF5RGF5IiwiU3RhcnROZXdHYW1lX1BheURheSIsImVtaXQiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2hvd0luZm8iLCJpbmZvIiwiUmFpc2VFdmVudEZvckNvbXBsZXRpb24iLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZUhhbGZQYXlOZXh0VHVybiIsImNhbGxVcG9uQ2FyZCIsIlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwIiwiU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwIiwiUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkFtb3VudCIsIlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbiIsIlNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwIiwiU2VsZWN0QnVzaW5lc3Nmb3JQYXlEYXkiLCJfaXNUdXJub3ZlciIsIkVuYWJsZU1hbmlwaWxhdGlvblNjcmVlbl9fQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkiLCJUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwiU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNob3dRdWVzdGlvblRvYXN0IiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfbXlEYXRhIiwiX2FjdG9yc0RhdGEiLCJfbW9kZUluZGV4IiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAiLCJFZGl0VGl0bGVfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiX21haW5UaXRsZSIsIl90aWxlQ29udGVudCIsIkV4aXRTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAiLCJFeGl0U2NyZWVuX0Fsb25nVHVybk92ZXJfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIl9idXNpbmVzc1R5cGUiLCJFbmFibGVTZWxldGl2ZURvdWJsZVBheURheV9CdXNpbmVzc1BheURheVVJU2V0dXAiLCJfaXNCcmlja0FuZE1vcnRhciIsIlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJTZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiRXhpdF9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJtZXNzYWdlIiwidGltZSIsIl9oYXNidXR0b24iLCJTZWxmVG9hc3QiLCJtb2RlIiwiQ29tcGxldGVUb2FzdCIsIlNob3dSZXN1bHRTY3JlZW4iLCJfc3RhdHVzIiwiUmVzdGFydFRoZUdhbWUiLCJSZXN0YXJ0R2FtZSIsIl9kYXRhSW5mbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxXQUFXLEdBQUcsSUFBbEI7QUFDQSxJQUFJQyx3QkFBd0IsR0FBRyxJQUEvQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLEVBQTFCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsRUFBdkI7QUFDQSxJQUFJQyx1QkFBdUIsR0FBRyxFQUE5QjtBQUNBLElBQUlDLDhCQUE4QixHQUFHLEVBQXJDO0FBQ0EsSUFBSUMseUJBQXlCLEdBQUcsRUFBaEM7QUFDQSxJQUFJQyxlQUFlLEdBQUcsSUFBdEI7QUFDQSxJQUFJQyx3QkFBd0IsR0FBRyxLQUEvQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxLQUFwQjtBQUNBLElBQUlDLHNCQUFzQixHQUFHLEtBQTdCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLElBQUlDLFdBQVcsR0FBRyxDQUFsQjtBQUNBLElBQUlDLHFCQUFxQixHQUFHLENBQTVCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsS0FBeEI7QUFDQSxJQUFJQyw4QkFBOEIsR0FBRyxLQUFyQztBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQXhCO0FBQ0EsSUFBSUMsMkJBQTJCLEdBQUcsS0FBbEM7QUFDQSxJQUFJQyxZQUFZLEdBQUcsQ0FBbkI7QUFDQSxJQUFJQyxVQUFKO0FBQ0EsSUFBSUMsb0JBQW9CLEdBQUcsSUFBM0I7QUFDQSxJQUFJQyxlQUFlLEdBQUcsSUFBdEI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxJQUF2QjtBQUNBLElBQUlDLGVBQWUsR0FBRyxFQUF0QjtBQUNBLElBQUlDLFVBQVUsR0FBRyxFQUFqQjtBQUNBLElBQUlDLGNBQWMsR0FBRyxFQUFyQjtBQUNBLElBQUlDLFlBQUo7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxDQUExQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLENBQTFCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsRUFBdkI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEIsRUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEcUI7QUFFM0JDLEVBQUFBLFdBQVcsRUFBRSxLQUZjO0FBRzNCQyxFQUFBQSxhQUFhLEVBQUUsS0FIWTtBQUkzQkMsRUFBQUEsY0FBYyxFQUFFLEtBSlc7QUFLM0JDLEVBQUFBLGFBQWEsRUFBRSxLQUxZO0FBTTNCQyxFQUFBQSxhQUFhLEVBQUUsS0FOWTtBQU8zQkMsRUFBQUEsS0FBSyxFQUFFO0FBUG9CLENBQVIsQ0FBckIsRUFTQTs7QUFDQSxJQUFJQyxlQUFlLEdBQUdULEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQzdCQyxFQUFBQSxJQUFJLEVBQUUsaUJBRHVCO0FBRzdCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1pDLE1BQUFBLFdBQVcsRUFBRSxjQUREO0FBRVpDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGRztBQUdaLGlCQUFTLElBSEc7QUFJWkMsTUFBQUEsWUFBWSxFQUFFLElBSkY7QUFLWkMsTUFBQUEsT0FBTyxFQUFFO0FBTEcsS0FESjtBQVFWQyxJQUFBQSxZQUFZLEVBQUU7QUFDWkwsTUFBQUEsV0FBVyxFQUFFLGNBREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZHO0FBR1osaUJBQVMsSUFIRztBQUlaQyxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQVJKO0FBZVZFLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCTixNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDcUIsSUFGUztBQUdsQixpQkFBUyxFQUhTO0FBSWxCSixNQUFBQSxZQUFZLEVBQUUsS0FKSTtBQUtsQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFMsS0FmVjtBQXNCVkksSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEJSLE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNxQixJQUZTO0FBR2xCLGlCQUFTLEVBSFM7QUFJbEJKLE1BQUFBLFlBQVksRUFBRSxLQUpJO0FBS2xCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUyxLQXRCVjtBQTZCVkssSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJULE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUN3QixPQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJQLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQTdCVDtBQW9DVk8sSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJYLE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUN3QixPQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJQLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQXBDVDtBQTJDVlEsSUFBQUEsZUFBZSxFQUFFO0FBQ2ZaLE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZWLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBM0NQO0FBa0RWVSxJQUFBQSxvQkFBb0IsRUFBRTtBQUNwQmQsTUFBQUEsV0FBVyxFQUFFLHNCQURPO0FBRXBCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRlc7QUFHcEIsaUJBQVMsSUFIVztBQUlwQlYsTUFBQUEsWUFBWSxFQUFFLElBSk07QUFLcEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxXLEtBbERaO0FBeURWVyxJQUFBQSxPQUFPLEVBQUU7QUFDUGYsTUFBQUEsV0FBVyxFQUFFLFNBRE47QUFFUEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZGO0FBR1AsaUJBQVMsSUFIRjtBQUlQQyxNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQXpEQztBQWdFVlksSUFBQUEsU0FBUyxFQUFFO0FBQ1RoQixNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkE7QUFHVCxpQkFBUyxJQUhBO0FBSVRWLE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBaEVEO0FBdUVWYSxJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQmpCLE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJWLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQXZFVDtBQThFVmMsSUFBQUEsYUFBYSxFQUFFO0FBQ2JsQixNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkk7QUFHYixpQkFBUyxJQUhJO0FBSWJWLE1BQUFBLFlBQVksRUFBRSxJQUpEO0FBS2JDLE1BQUFBLE9BQU8sRUFBRTtBQUxJLEtBOUVMO0FBcUZWZSxJQUFBQSxVQUFVLEVBQUU7QUFDVm5CLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWhCLGNBRkk7QUFHVixpQkFBU0EsY0FBYyxDQUFDRyxJQUhkO0FBSVZlLE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBckZGO0FBNEZWZ0IsSUFBQUEsZUFBZSxFQUFFO0FBQ2ZwQixNQUFBQSxXQUFXLEVBQUUsaUJBREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFLENBQUNmLEVBQUUsQ0FBQzJCLElBQUosQ0FGUztBQUdmLGlCQUFTLEVBSE07QUFJZlYsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0E1RlA7QUFtR1ZpQixJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQnJCLE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJWLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQW5HVDtBQTBHVmtCLElBQUFBLGNBQWMsRUFBRTtBQUNkdEIsTUFBQUEsV0FBVyxFQUFFLGdCQURDO0FBRWRDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSztBQUdkLGlCQUFTLElBSEs7QUFJZFYsTUFBQUEsWUFBWSxFQUFFLElBSkE7QUFLZEMsTUFBQUEsT0FBTyxFQUFFO0FBTEssS0ExR047QUFpSFZtQixJQUFBQSxhQUFhLEVBQUU7QUFDYnZCLE1BQUFBLFdBQVcsRUFBRSxlQURBO0FBRWJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSTtBQUdiLGlCQUFTLElBSEk7QUFJYlYsTUFBQUEsWUFBWSxFQUFFLElBSkQ7QUFLYkMsTUFBQUEsT0FBTyxFQUFFO0FBTEksS0FqSEw7QUF3SFZvQixJQUFBQSxhQUFhLEVBQUU7QUFDYnhCLE1BQUFBLFdBQVcsRUFBRSxlQURBO0FBRWJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSTtBQUdiLGlCQUFTLElBSEk7QUFJYlYsTUFBQUEsWUFBWSxFQUFFLElBSkQ7QUFLYkMsTUFBQUEsT0FBTyxFQUFFO0FBTEksS0F4SEw7QUErSFZxQixJQUFBQSxZQUFZLEVBQUU7QUFDWnpCLE1BQUFBLFdBQVcsRUFBRSxjQUREO0FBRVpDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGRztBQUdaLGlCQUFTLElBSEc7QUFJWkMsTUFBQUEsWUFBWSxFQUFFLElBSkY7QUFLWkMsTUFBQUEsT0FBTyxFQUFFO0FBTEcsS0EvSEo7QUFzSVZzQixJQUFBQSxjQUFjLEVBQUU7QUFDZDFCLE1BQUFBLFdBQVcsRUFBRSxnQkFEQztBQUVkQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ3dCLE9BRks7QUFHZCxpQkFBUyxJQUhLO0FBSWRQLE1BQUFBLFlBQVksRUFBRSxJQUpBO0FBS2RDLE1BQUFBLE9BQU8sRUFBRTtBQUxLO0FBdElOLEdBSGlCO0FBaUo3QnVCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNELEdBbko0QjtBQXFKN0JDLEVBQUFBLHdCQUF3QixFQUFFLGtDQUFVL0IsSUFBVixFQUFnQjtBQUN4QyxTQUFLRSxZQUFMLENBQWtCOEIsTUFBbEIsR0FBMkJoQyxJQUEzQjtBQUNEO0FBdko0QixDQUFULENBQXRCLEVBeUpBOztBQUNBLElBQUlpQyxtQkFBbUIsR0FBRzVDLEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQ2pDQyxFQUFBQSxJQUFJLEVBQUUscUJBRDJCO0FBR2pDQyxFQUFBQSxVQUFVLEVBQUU7QUFDVmlDLElBQUFBLGdCQUFnQixFQUFFO0FBQ2hCL0IsTUFBQUEsV0FBVyxFQUFFLGtCQURHO0FBRWhCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ3dCLE9BRk87QUFHaEIsaUJBQVMsSUFITztBQUloQlAsTUFBQUEsWUFBWSxFQUFFLElBSkU7QUFLaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxPLEtBRFI7QUFRVjRCLElBQUFBLFdBQVcsRUFBRTtBQUNYaEMsTUFBQUEsV0FBVyxFQUFFLGFBREY7QUFFWEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUN3QixPQUZFO0FBR1gsaUJBQVMsSUFIRTtBQUlYUCxNQUFBQSxZQUFZLEVBQUUsSUFKSDtBQUtYQyxNQUFBQSxPQUFPLEVBQUU7QUFMRSxLQVJIO0FBZVY2QixJQUFBQSxZQUFZLEVBQUU7QUFDWmpDLE1BQUFBLFdBQVcsRUFBRSxjQUREO0FBRVpDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDd0IsT0FGRztBQUdaLGlCQUFTLElBSEc7QUFJWlAsTUFBQUEsWUFBWSxFQUFFLElBSkY7QUFLWkMsTUFBQUEsT0FBTyxFQUFFO0FBTEcsS0FmSjtBQXNCVjhCLElBQUFBLGVBQWUsRUFBRTtBQUNmbEMsTUFBQUEsV0FBVyxFQUFFLE1BREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZNO0FBR2YsaUJBQVMsSUFITTtBQUlmQyxNQUFBQSxZQUFZLEVBQUUsSUFKQztBQUtmQyxNQUFBQSxPQUFPLEVBQUU7QUFMTSxLQXRCUDtBQTZCVitCLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCbkMsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQlYsTUFBQUEsWUFBWSxFQUFFLElBSkk7QUFLbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxTLEtBN0JWO0FBb0NWZ0MsSUFBQUEsMkJBQTJCLEVBQUU7QUFDM0JwQyxNQUFBQSxXQUFXLEVBQUUsNkJBRGM7QUFFM0JDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGa0I7QUFHM0IsaUJBQVMsSUFIa0I7QUFJM0JWLE1BQUFBLFlBQVksRUFBRSxJQUphO0FBSzNCQyxNQUFBQSxPQUFPLEVBQUU7QUFMa0IsS0FwQ25CO0FBMkNWaUMsSUFBQUEsb0JBQW9CLEVBQUU7QUFDcEJyQyxNQUFBQSxXQUFXLEVBQUUsc0JBRE87QUFFcEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDb0QsTUFGVztBQUdwQixpQkFBUyxJQUhXO0FBSXBCbkMsTUFBQUEsWUFBWSxFQUFFLElBSk07QUFLcEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxXLEtBM0NaO0FBa0RWbUMsSUFBQUEsU0FBUyxFQUFFO0FBQ1R2QyxNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkE7QUFHVCxpQkFBUyxJQUhBO0FBSVRDLE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBbEREO0FBeURWb0MsSUFBQUEsV0FBVyxFQUFFO0FBQ1h4QyxNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkU7QUFHWCxpQkFBUyxJQUhFO0FBSVhWLE1BQUFBLFlBQVksRUFBRSxJQUpIO0FBS1hDLE1BQUFBLE9BQU8sRUFBRTtBQUxFO0FBekRILEdBSHFCO0FBb0VqQ3VCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNELEdBdEVnQztBQXdFakNDLEVBQUFBLHdCQUF3QixFQUFFLGtDQUFVL0IsSUFBVixFQUFnQjtBQUN4QyxTQUFLRSxZQUFMLENBQWtCOEIsTUFBbEIsR0FBMkJoQyxJQUEzQjtBQUNEO0FBMUVnQyxDQUFULENBQTFCLEVBNEVBOztBQUNBLElBQUk0QyxVQUFVLEdBQUd2RCxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLENBRGlCO0FBRXZCc0QsRUFBQUEsV0FBVyxFQUFFLENBRlU7QUFHdkJDLEVBQUFBLFVBQVUsRUFBRSxDQUhXO0FBSXZCQyxFQUFBQSxTQUFTLEVBQUUsQ0FKWTtBQUt2QkMsRUFBQUEsUUFBUSxFQUFFLENBTGE7QUFNdkJuRCxFQUFBQSxLQUFLLEVBQUU7QUFOZ0IsQ0FBUixDQUFqQixFQVFBOztBQUNBLElBQUlvRCxZQUFZLEdBQUc1RCxFQUFFLENBQUNVLEtBQUgsQ0FBUztBQUMxQkMsRUFBQUEsSUFBSSxFQUFFLGNBRG9CO0FBRTFCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVmlELElBQUFBLFVBQVUsRUFBRTtBQUNWL0MsTUFBQUEsV0FBVyxFQUFFLE9BREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWQyxNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQURGO0FBUVY0QyxJQUFBQSxlQUFlLEVBQUU7QUFDZmhELE1BQUFBLFdBQVcsRUFBRSxZQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGTTtBQUdmLGlCQUFTLElBSE07QUFJZkMsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0FSUDtBQWVWNkMsSUFBQUEsZUFBZSxFQUFFO0FBQ2ZqRCxNQUFBQSxXQUFXLEVBQUUsWUFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZDLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBZlA7QUFzQlY4QyxJQUFBQSxlQUFlLEVBQUU7QUFDZmxELE1BQUFBLFdBQVcsRUFBRSxZQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGTTtBQUdmLGlCQUFTLElBSE07QUFJZkMsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0F0QlA7QUE2QlYrQyxJQUFBQSxtQkFBbUIsRUFBRTtBQUNuQm5ELE1BQUFBLFdBQVcsRUFBRSxnQkFETTtBQUVuQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZVO0FBR25CLGlCQUFTLElBSFU7QUFJbkJDLE1BQUFBLFlBQVksRUFBRSxJQUpLO0FBS25CQyxNQUFBQSxPQUFPLEVBQUU7QUFMVSxLQTdCWDtBQW9DVmdELElBQUFBLHFCQUFxQixFQUFFO0FBQ3JCcEQsTUFBQUEsV0FBVyxFQUFFLGtCQURRO0FBRXJCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlk7QUFHckIsaUJBQVMsSUFIWTtBQUlyQkMsTUFBQUEsWUFBWSxFQUFFLElBSk87QUFLckJDLE1BQUFBLE9BQU8sRUFBRTtBQUxZLEtBcENiO0FBMkNWaUQsSUFBQUEscUJBQXFCLEVBQUU7QUFDckJyRCxNQUFBQSxXQUFXLEVBQUUsa0JBRFE7QUFFckJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGWTtBQUdyQixpQkFBUyxJQUhZO0FBSXJCQyxNQUFBQSxZQUFZLEVBQUUsSUFKTztBQUtyQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFksS0EzQ2I7QUFrRFZrRCxJQUFBQSxlQUFlLEVBQUU7QUFDZnRELE1BQUFBLFdBQVcsRUFBRSxZQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGTTtBQUdmLGlCQUFTLElBSE07QUFJZkMsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0FsRFA7QUF5RFZtRCxJQUFBQSxXQUFXLEVBQUU7QUFDWHZELE1BQUFBLFdBQVcsRUFBRSxhQURGO0FBRVhDLE1BQUFBLElBQUksRUFBRXdDLFVBRks7QUFHWCxpQkFBU0EsVUFBVSxDQUFDckQsSUFIVDtBQUlYZSxNQUFBQSxZQUFZLEVBQUU7QUFKSCxLQXpESDtBQStEVnFELElBQUFBLGFBQWEsRUFBRTtBQUNieEQsTUFBQUEsV0FBVyxFQUFFLGVBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUN3QixPQUZJO0FBR2IsaUJBQVMsSUFISTtBQUliUCxNQUFBQSxZQUFZLEVBQUU7QUFKRDtBQS9ETCxHQUZjO0FBd0UxQndCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBMUV5QixDQUFULENBQW5CLEVBNEVBOztBQUNBLElBQUk4QixjQUFjLEdBQUd2RSxFQUFFLENBQUNVLEtBQUgsQ0FBUztBQUM1QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURzQjtBQUU1QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZpRCxJQUFBQSxVQUFVLEVBQUU7QUFDVi9DLE1BQUFBLFdBQVcsRUFBRSxPQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQztBQUdWLGlCQUFTLElBSEM7QUFJVkMsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0FERjtBQVFWc0QsSUFBQUEsU0FBUyxFQUFFO0FBQ1QxRCxNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkE7QUFHVCxpQkFBUyxJQUhBO0FBSVRDLE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBUkQ7QUFlVnVELElBQUFBLGVBQWUsRUFBRTtBQUNmM0QsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGTTtBQUdmLGlCQUFTLElBSE07QUFJZkMsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0FmUDtBQXNCVndELElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCNUQsTUFBQUEsV0FBVyxFQUFFLGVBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGUztBQUdsQixpQkFBUyxJQUhTO0FBSWxCQyxNQUFBQSxZQUFZLEVBQUUsSUFKSTtBQUtsQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFMsS0F0QlY7QUE2QlZ5RCxJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQjdELE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJWLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQTdCVDtBQW9DVjBELElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCOUQsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ29ELE1BRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQm5DLE1BQUFBLFlBQVksRUFBRSxJQUpJO0FBS2xCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUyxLQXBDVjtBQTJDVjJELElBQUFBLDBCQUEwQixFQUFFO0FBQzFCL0QsTUFBQUEsV0FBVyxFQUFFLDRCQURhO0FBRTFCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ29ELE1BRmlCO0FBRzFCLGlCQUFTLElBSGlCO0FBSTFCbkMsTUFBQUEsWUFBWSxFQUFFLElBSlk7QUFLMUJDLE1BQUFBLE9BQU8sRUFBRTtBQUxpQixLQTNDbEI7QUFrRFY0RCxJQUFBQSxVQUFVLEVBQUU7QUFDVmhFLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGQztBQUdWLGlCQUFTLElBSEM7QUFJVlYsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0FsREY7QUF5RFY2RCxJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQmpFLE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZTO0FBR2xCLGlCQUFTLElBSFM7QUFJbEJWLE1BQUFBLFlBQVksRUFBRSxJQUpJO0FBS2xCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUztBQXpEVixHQUZnQjtBQW1FNUJ1QixFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FDaEI7QUFDRDtBQXJFMkIsQ0FBVCxDQUFyQixFQXVFQTs7QUFDQSxJQUFJdUMsUUFBUSxHQUFHaEYsRUFBRSxDQUFDVSxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBRSxVQURnQjtBQUV0QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZpRCxJQUFBQSxVQUFVLEVBQUU7QUFDVi9DLE1BQUFBLFdBQVcsRUFBRSxPQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQztBQUdWLGlCQUFTLElBSEM7QUFJVkMsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0FERjtBQVFWc0QsSUFBQUEsU0FBUyxFQUFFO0FBQ1QxRCxNQUFBQSxXQUFXLEVBQUUsTUFESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkE7QUFHVCxpQkFBUyxJQUhBO0FBSVRDLE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBUkQ7QUFlVitELElBQUFBLG9CQUFvQixFQUFFO0FBQ3BCbkUsTUFBQUEsV0FBVyxFQUFFLGlCQURPO0FBRXBCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlc7QUFHcEIsaUJBQVMsSUFIVztBQUlwQkMsTUFBQUEsWUFBWSxFQUFFLElBSk07QUFLcEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxXLEtBZlo7QUFzQlZnRSxJQUFBQSxhQUFhLEVBQUU7QUFDYnBFLE1BQUFBLFdBQVcsRUFBRSxtQkFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkk7QUFHYixpQkFBUyxJQUhJO0FBSWJDLE1BQUFBLFlBQVksRUFBRSxJQUpEO0FBS2JDLE1BQUFBLE9BQU8sRUFBRTtBQUxJLEtBdEJMO0FBNkJWaUUsSUFBQUEscUJBQXFCLEVBQUU7QUFDckJyRSxNQUFBQSxXQUFXLEVBQUUsc0JBRFE7QUFFckJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGWTtBQUdyQixpQkFBUyxJQUhZO0FBSXJCQyxNQUFBQSxZQUFZLEVBQUUsSUFKTztBQUtyQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFksS0E3QmI7QUFvQ1ZrRSxJQUFBQSxzQkFBc0IsRUFBRTtBQUN0QnRFLE1BQUFBLFdBQVcsRUFBRSx3QkFEUztBQUV0QkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZhO0FBR3RCLGlCQUFTLElBSGE7QUFJdEJDLE1BQUFBLFlBQVksRUFBRSxJQUpRO0FBS3RCQyxNQUFBQSxPQUFPLEVBQUU7QUFMYSxLQXBDZDtBQTJDVm1FLElBQUFBLFlBQVksRUFBRTtBQUNadkUsTUFBQUEsV0FBVyxFQUFFLGNBREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZHO0FBR1osaUJBQVMsSUFIRztBQUlaVixNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQTNDSjtBQWtEVm9FLElBQUFBLEtBQUssRUFBRTtBQUNMeEUsTUFBQUEsV0FBVyxFQUFFLGdCQURSO0FBRUxDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSjtBQUdMLGlCQUFTLElBSEo7QUFJTFYsTUFBQUEsWUFBWSxFQUFFLElBSlQ7QUFLTEMsTUFBQUEsT0FBTyxFQUFFO0FBTEosS0FsREc7QUF5RFZxRSxJQUFBQSxPQUFPLEVBQUU7QUFDUHpFLE1BQUFBLFdBQVcsRUFBRSxTQUROO0FBRVBDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGRjtBQUdQLGlCQUFTLElBSEY7QUFJUFYsTUFBQUEsWUFBWSxFQUFFLElBSlA7QUFLUEMsTUFBQUEsT0FBTyxFQUFFO0FBTEYsS0F6REM7QUFnRVZzRSxJQUFBQSxhQUFhLEVBQUU7QUFDYjFFLE1BQUFBLFdBQVcsRUFBRSxlQURBO0FBRWJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSTtBQUdiLGlCQUFTLElBSEk7QUFJYlYsTUFBQUEsWUFBWSxFQUFFLElBSkQ7QUFLYkMsTUFBQUEsT0FBTyxFQUFFO0FBTEksS0FoRUw7QUF1RVZ1RSxJQUFBQSxlQUFlLEVBQUU7QUFDZjNFLE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZWLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBdkVQO0FBOEVWd0UsSUFBQUEsbUJBQW1CLEVBQUU7QUFDbkI1RSxNQUFBQSxXQUFXLEVBQUUscUJBRE07QUFFbkJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGVTtBQUduQixpQkFBUyxJQUhVO0FBSW5CVixNQUFBQSxZQUFZLEVBQUUsSUFKSztBQUtuQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFUsS0E5RVg7QUFxRlZ5RSxJQUFBQSxzQkFBc0IsRUFBRTtBQUN0QjdFLE1BQUFBLFdBQVcsRUFBRSxtQkFEUztBQUV0QkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZhO0FBR3RCLGlCQUFTLElBSGE7QUFJdEJDLE1BQUFBLFlBQVksRUFBRSxJQUpRO0FBS3RCQyxNQUFBQSxPQUFPLEVBQUU7QUFMYSxLQXJGZDtBQTRGVjRDLElBQUFBLGVBQWUsRUFBRTtBQUNmaEQsTUFBQUEsV0FBVyxFQUFFLFlBREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZNO0FBR2YsaUJBQVMsSUFITTtBQUlmQyxNQUFBQSxZQUFZLEVBQUUsSUFKQztBQUtmQyxNQUFBQSxPQUFPLEVBQUU7QUFMTSxLQTVGUDtBQW1HVjBFLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCOUUsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQkMsTUFBQUEsWUFBWSxFQUFFLElBSkk7QUFLbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxTLEtBbkdWO0FBMEdWMkUsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEIvRSxNQUFBQSxXQUFXLEVBQUUsa0JBREc7QUFFaEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGTztBQUdoQixpQkFBUyxJQUhPO0FBSWhCQyxNQUFBQSxZQUFZLEVBQUUsSUFKRTtBQUtoQkMsTUFBQUEsT0FBTyxFQUFFO0FBTE8sS0ExR1I7QUFpSFY0RSxJQUFBQSxjQUFjLEVBQUU7QUFDZGhGLE1BQUFBLFdBQVcsRUFBRSxnQkFEQztBQUVkQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRks7QUFHZCxpQkFBUyxJQUhLO0FBSWRWLE1BQUFBLFlBQVksRUFBRSxJQUpBO0FBS2RDLE1BQUFBLE9BQU8sRUFBRTtBQUxLLEtBakhOO0FBd0hWNkUsSUFBQUEsZUFBZSxFQUFFO0FBQ2ZqRixNQUFBQSxXQUFXLEVBQUUsaUJBREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZNO0FBR2YsaUJBQVMsSUFITTtBQUlmQyxNQUFBQSxZQUFZLEVBQUUsSUFKQztBQUtmQyxNQUFBQSxPQUFPLEVBQUU7QUFMTTtBQXhIUCxHQUZVO0FBa0l0QnVCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBcElxQixDQUFULENBQWYsRUFzSUE7O0FBQ0EsSUFBSXVELFFBQVEsR0FBR2hHLEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsVUFEZ0I7QUFFdEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWaUQsSUFBQUEsVUFBVSxFQUFFO0FBQ1YvQyxNQUFBQSxXQUFXLEVBQUUsT0FESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZDLE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBREY7QUFRVnNELElBQUFBLFNBQVMsRUFBRTtBQUNUMUQsTUFBQUEsV0FBVyxFQUFFLFdBREo7QUFFVEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZBO0FBR1QsaUJBQVMsSUFIQTtBQUlUQyxNQUFBQSxZQUFZLEVBQUUsSUFKTDtBQUtUQyxNQUFBQSxPQUFPLEVBQUU7QUFMQSxLQVJEO0FBZVZ1RCxJQUFBQSxlQUFlLEVBQUU7QUFDZjNELE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZDLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBZlA7QUFzQlY0RCxJQUFBQSxVQUFVLEVBQUU7QUFDVmhFLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGQztBQUdWLGlCQUFTLElBSEM7QUFJVlYsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0F0QkY7QUE2QlY2RCxJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQmpFLE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZTO0FBR2xCLGlCQUFTLElBSFM7QUFJbEJWLE1BQUFBLFlBQVksRUFBRSxJQUpJO0FBS2xCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUztBQTdCVixHQUZVO0FBdUN0QnVCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBekNxQixDQUFULENBQWYsRUEyQ0E7O0FBQ0EsSUFBSXdELFdBQVcsR0FBR2pHLEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUUsYUFEbUI7QUFFekJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWaUQsSUFBQUEsVUFBVSxFQUFFO0FBQ1YvQyxNQUFBQSxXQUFXLEVBQUUsT0FESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZDLE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBREY7QUFRVnNELElBQUFBLFNBQVMsRUFBRTtBQUNUMUQsTUFBQUEsV0FBVyxFQUFFLFdBREo7QUFFVEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZBO0FBR1QsaUJBQVMsSUFIQTtBQUlUQyxNQUFBQSxZQUFZLEVBQUUsSUFKTDtBQUtUQyxNQUFBQSxPQUFPLEVBQUU7QUFMQSxLQVJEO0FBZVZ1RCxJQUFBQSxlQUFlLEVBQUU7QUFDZjNELE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZDLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBZlA7QUFzQlY0RCxJQUFBQSxVQUFVLEVBQUU7QUFDVmhFLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGQztBQUdWLGlCQUFTLElBSEM7QUFJVlYsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0F0QkY7QUE2QlY2RCxJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQmpFLE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZTO0FBR2xCLGlCQUFTLElBSFM7QUFJbEJWLE1BQUFBLFlBQVksRUFBRSxJQUpJO0FBS2xCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUztBQTdCVixHQUZhO0FBdUN6QnVCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBekN3QixDQUFULENBQWxCLEVBMkNBOztBQUNBLElBQUl5RCxhQUFhLEdBQUdsRyxFQUFFLENBQUNVLEtBQUgsQ0FBUztBQUMzQkMsRUFBQUEsSUFBSSxFQUFFLGVBRHFCO0FBRTNCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVmlELElBQUFBLFVBQVUsRUFBRTtBQUNWL0MsTUFBQUEsV0FBVyxFQUFFLE9BREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWQyxNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQURGO0FBUVZzRCxJQUFBQSxTQUFTLEVBQUU7QUFDVDFELE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVRDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQTtBQUdULGlCQUFTLElBSEE7QUFJVEMsTUFBQUEsWUFBWSxFQUFFLElBSkw7QUFLVEMsTUFBQUEsT0FBTyxFQUFFO0FBTEEsS0FSRDtBQWVWdUQsSUFBQUEsZUFBZSxFQUFFO0FBQ2YzRCxNQUFBQSxXQUFXLEVBQUUsaUJBREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZNO0FBR2YsaUJBQVMsSUFITTtBQUlmQyxNQUFBQSxZQUFZLEVBQUUsSUFKQztBQUtmQyxNQUFBQSxPQUFPLEVBQUU7QUFMTSxLQWZQO0FBc0JWNEQsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZoRSxNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZWLE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBdEJGO0FBNkJWNkQsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEJqRSxNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGUztBQUdsQixpQkFBUyxJQUhTO0FBSWxCVixNQUFBQSxZQUFZLEVBQUUsSUFKSTtBQUtsQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFMsS0E3QlY7QUFvQ1ZpRixJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQnJGLE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJDLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQXBDVDtBQTJDVmtGLElBQUFBLGFBQWEsRUFBRTtBQUNidEYsTUFBQUEsV0FBVyxFQUFFLGVBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNvRCxNQUZJO0FBR2IsaUJBQVMsSUFISTtBQUlibkMsTUFBQUEsWUFBWSxFQUFFLElBSkQ7QUFLYkMsTUFBQUEsT0FBTyxFQUFFO0FBTEksS0EzQ0w7QUFrRFZtRixJQUFBQSxhQUFhLEVBQUU7QUFDYnZGLE1BQUFBLFdBQVcsRUFBRSxlQURBO0FBRWJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSTtBQUdiLGlCQUFTLElBSEk7QUFJYlYsTUFBQUEsWUFBWSxFQUFFLElBSkQ7QUFLYkMsTUFBQUEsT0FBTyxFQUFFO0FBTEksS0FsREw7QUF5RFZvRixJQUFBQSxhQUFhLEVBQUU7QUFDYnhGLE1BQUFBLFdBQVcsRUFBRSxlQURBO0FBRWJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSTtBQUdiLGlCQUFTLElBSEk7QUFJYlYsTUFBQUEsWUFBWSxFQUFFLElBSkQ7QUFLYkMsTUFBQUEsT0FBTyxFQUFFO0FBTEksS0F6REw7QUFnRVZxRixJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQnpGLE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZTO0FBR2xCLGlCQUFTLElBSFM7QUFJbEJDLE1BQUFBLFlBQVksRUFBRSxJQUpJO0FBS2xCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUyxLQWhFVjtBQXVFVnNGLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCMUYsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQkMsTUFBQUEsWUFBWSxFQUFFLElBSkk7QUFLbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxTLEtBdkVWO0FBOEVWdUYsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakIzRixNQUFBQSxXQUFXLEVBQUUsbUJBREk7QUFFakJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGUTtBQUdqQixpQkFBUyxJQUhRO0FBSWpCQyxNQUFBQSxZQUFZLEVBQUUsSUFKRztBQUtqQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFEsS0E5RVQ7QUFxRlZ3RixJQUFBQSx1QkFBdUIsRUFBRTtBQUN2QjVGLE1BQUFBLFdBQVcsRUFBRSx5QkFEVTtBQUV2QkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZjO0FBR3ZCLGlCQUFTLElBSGM7QUFJdkJDLE1BQUFBLFlBQVksRUFBRSxJQUpTO0FBS3ZCQyxNQUFBQSxPQUFPLEVBQUU7QUFMYyxLQXJGZjtBQTRGVnlGLElBQUFBLHFCQUFxQixFQUFFO0FBQ3JCN0YsTUFBQUEsV0FBVyxFQUFFLHVCQURRO0FBRXJCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlk7QUFHckIsaUJBQVMsSUFIWTtBQUlyQkMsTUFBQUEsWUFBWSxFQUFFLElBSk87QUFLckJDLE1BQUFBLE9BQU8sRUFBRTtBQUxZO0FBNUZiLEdBRmU7QUFzRzNCdUIsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQ2hCO0FBQ0Q7QUF4RzBCLENBQVQsQ0FBcEIsRUEwR0E7O0FBQ0EsSUFBSW1FLGFBQWEsR0FBRzVHLEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsZUFEcUI7QUFFM0JDLEVBQUFBLFVBQVUsRUFBRTtBQUNWaUcsSUFBQUEsbUJBQW1CLEVBQUU7QUFDbkIvRixNQUFBQSxXQUFXLEVBQUUscUJBRE07QUFFbkJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGVTtBQUduQixpQkFBUyxJQUhVO0FBSW5CVixNQUFBQSxZQUFZLEVBQUUsSUFKSztBQUtuQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFUsS0FEWDtBQVFWNEYsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZoRyxNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZWLE1BQUFBLFlBQVksRUFBRTtBQUpKLEtBUkY7QUFjVjhGLElBQUFBLFNBQVMsRUFBRTtBQUNUakcsTUFBQUEsV0FBVyxFQUFFLFdBREo7QUFFVEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZBO0FBR1QsaUJBQVMsSUFIQTtBQUlUQyxNQUFBQSxZQUFZLEVBQUU7QUFKTCxLQWREO0FBb0JWK0YsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZsRyxNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZDLE1BQUFBLFlBQVksRUFBRTtBQUpKLEtBcEJGO0FBMEJWZ0csSUFBQUEsVUFBVSxFQUFFO0FBQ1ZuRyxNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZDLE1BQUFBLFlBQVksRUFBRTtBQUpKLEtBMUJGO0FBZ0NWaUcsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJwRyxNQUFBQSxXQUFXLEVBQUUsbUJBREk7QUFFakJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDb0QsTUFGUTtBQUdqQixpQkFBUyxJQUhRO0FBSWpCbkMsTUFBQUEsWUFBWSxFQUFFO0FBSkcsS0FoQ1Q7QUFzQ1ZvRixJQUFBQSxhQUFhLEVBQUU7QUFDYnZGLE1BQUFBLFdBQVcsRUFBRSxlQURBO0FBRWJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSTtBQUdiLGlCQUFTLElBSEk7QUFJYlYsTUFBQUEsWUFBWSxFQUFFO0FBSkQsS0F0Q0w7QUE2Q1ZrRyxJQUFBQSxjQUFjLEVBQUU7QUFDZHJHLE1BQUFBLFdBQVcsRUFBRSxnQkFEQztBQUVkQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRks7QUFHZCxpQkFBUyxJQUhLO0FBSWRWLE1BQUFBLFlBQVksRUFBRTtBQUpBLEtBN0NOO0FBb0RWbUcsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEJ0RyxNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGUztBQUdsQixpQkFBUyxJQUhTO0FBSWxCQyxNQUFBQSxZQUFZLEVBQUU7QUFKSSxLQXBEVjtBQTJEVm9HLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCdkcsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQkMsTUFBQUEsWUFBWSxFQUFFO0FBSkksS0EzRFY7QUFrRVZxRyxJQUFBQSxtQkFBbUIsRUFBRTtBQUNuQnhHLE1BQUFBLFdBQVcsRUFBRSxxQkFETTtBQUVuQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZVO0FBR25CLGlCQUFTLElBSFU7QUFJbkJDLE1BQUFBLFlBQVksRUFBRTtBQUpLO0FBbEVYLEdBRmU7QUEyRTNCd0IsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQ2hCO0FBQ0Q7QUE3RTBCLENBQVQsQ0FBcEIsRUErRUE7O0FBQ0EsSUFBSThFLFFBQVEsR0FBR3ZILEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsVUFEZ0I7QUFFdEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWNEcsSUFBQUEsWUFBWSxFQUFFO0FBQ1oxRyxNQUFBQSxXQUFXLEVBQUUsY0FERDtBQUVaQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkc7QUFHWixpQkFBUyxJQUhHO0FBSVpWLE1BQUFBLFlBQVksRUFBRTtBQUpGLEtBREo7QUFRVndHLElBQUFBLFdBQVcsRUFBRTtBQUNYM0csTUFBQUEsV0FBVyxFQUFFLGFBREY7QUFFWEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZFO0FBR1gsaUJBQVMsSUFIRTtBQUlYQyxNQUFBQSxZQUFZLEVBQUU7QUFKSCxLQVJIO0FBZVZ5RyxJQUFBQSxTQUFTLEVBQUU7QUFDVDVHLE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVRDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQTtBQUdULGlCQUFTLElBSEE7QUFJVEMsTUFBQUEsWUFBWSxFQUFFO0FBSkw7QUFmRCxHQUZVO0FBd0J0QndCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBMUJxQixDQUFULENBQWYsRUE0QkE7O0FBQ0EsSUFBSWtGLHFCQUFxQixHQUFHM0gsRUFBRSxDQUFDVSxLQUFILENBQVM7QUFDbkNDLEVBQUFBLElBQUksRUFBRSx1QkFENkI7QUFFbkNDLEVBQUFBLFVBQVUsRUFBRTtBQUNWbUcsSUFBQUEsU0FBUyxFQUFFO0FBQ1RqRyxNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkE7QUFHVCxpQkFBUyxJQUhBO0FBSVRDLE1BQUFBLFlBQVksRUFBRTtBQUpMLEtBREQ7QUFPVitGLElBQUFBLFVBQVUsRUFBRTtBQUNWbEcsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWQyxNQUFBQSxZQUFZLEVBQUU7QUFKSixLQVBGO0FBYVZnRyxJQUFBQSxVQUFVLEVBQUU7QUFDVm5HLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQztBQUdWLGlCQUFTLElBSEM7QUFJVkMsTUFBQUEsWUFBWSxFQUFFO0FBSkosS0FiRjtBQW1CVjJHLElBQUFBLGlCQUFpQixFQUFFO0FBQ2pCOUcsTUFBQUEsV0FBVyxFQUFFLG1CQURJO0FBRWpCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlE7QUFHakIsaUJBQVMsSUFIUTtBQUlqQkMsTUFBQUEsWUFBWSxFQUFFO0FBSkcsS0FuQlQ7QUF5QlY0RyxJQUFBQSxjQUFjLEVBQUU7QUFDZC9HLE1BQUFBLFdBQVcsRUFBRSxnQkFEQztBQUVkQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ29ELE1BRks7QUFHZCxpQkFBUyxJQUhLO0FBSWRuQyxNQUFBQSxZQUFZLEVBQUU7QUFKQSxLQXpCTjtBQStCVm9GLElBQUFBLGFBQWEsRUFBRTtBQUNidkYsTUFBQUEsV0FBVyxFQUFFLGVBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZJO0FBR2IsaUJBQVMsSUFISTtBQUliVixNQUFBQSxZQUFZLEVBQUU7QUFKRDtBQS9CTCxHQUZ1QjtBQXdDbkN3QixFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FDaEI7QUFDRDtBQTFDa0MsQ0FBVCxDQUE1QixFQTRDQTs7QUFDQSxJQUFJcUYsNEJBQTRCLEdBQUc5SCxFQUFFLENBQUNVLEtBQUgsQ0FBUztBQUMxQ0MsRUFBQUEsSUFBSSxFQUFFLDhCQURvQztBQUUxQ0MsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZpRCxJQUFBQSxVQUFVLEVBQUU7QUFDVi9DLE1BQUFBLFdBQVcsRUFBRSxPQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQztBQUdWLGlCQUFTLElBSEM7QUFJVkMsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0FERjtBQVFWc0QsSUFBQUEsU0FBUyxFQUFFO0FBQ1QxRCxNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkE7QUFHVCxpQkFBUyxJQUhBO0FBSVRDLE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBUkQ7QUFlVnVELElBQUFBLGVBQWUsRUFBRTtBQUNmM0QsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGTTtBQUdmLGlCQUFTLElBSE07QUFJZkMsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0FmUDtBQXNCVjRELElBQUFBLFVBQVUsRUFBRTtBQUNWaEUsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWVixNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQXRCRjtBQTZCVjZELElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCakUsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQlYsTUFBQUEsWUFBWSxFQUFFLElBSkk7QUFLbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxTLEtBN0JWO0FBb0NWaUYsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJyRixNQUFBQSxXQUFXLEVBQUUsbUJBREk7QUFFakJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGUTtBQUdqQixpQkFBUyxJQUhRO0FBSWpCQyxNQUFBQSxZQUFZLEVBQUUsSUFKRztBQUtqQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFEsS0FwQ1Q7QUEyQ1ZrRixJQUFBQSxhQUFhLEVBQUU7QUFDYnRGLE1BQUFBLFdBQVcsRUFBRSxlQURBO0FBRWJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDb0QsTUFGSTtBQUdiLGlCQUFTLElBSEk7QUFJYm5DLE1BQUFBLFlBQVksRUFBRSxJQUpEO0FBS2JDLE1BQUFBLE9BQU8sRUFBRTtBQUxJLEtBM0NMO0FBa0RWbUYsSUFBQUEsYUFBYSxFQUFFO0FBQ2J2RixNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkk7QUFHYixpQkFBUyxJQUhJO0FBSWJWLE1BQUFBLFlBQVksRUFBRSxJQUpEO0FBS2JDLE1BQUFBLE9BQU8sRUFBRTtBQUxJO0FBbERMLEdBRjhCO0FBNEQxQ3VCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBOUR5QyxDQUFULENBQW5DLEVBZ0VBOztBQUNBLElBQUlzRixpQkFBSjtBQUNBLElBQUlDLHlCQUFKO0FBQ0EsSUFBSUMsWUFBSjtBQUNBLElBQUlDLHVCQUF1QixHQUFHLENBQUMsQ0FBL0IsRUFBa0M7QUFFbEM7O0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxnQkFBSixFQUVBOztBQUNBLElBQUlDLGNBQWMsR0FBRyxFQUFyQjtBQUNBLElBQUlDLGtCQUFrQixHQUFHLEVBQXpCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsRUFBeEI7QUFDQSxJQUFJQyxVQUFKO0FBQ0EsSUFBSUMsV0FBSjtBQUNBLElBQUlDLFlBQVksR0FBRyxFQUFuQjtBQUVBLElBQUlDLGFBQWEsR0FBRyxDQUFwQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxDQUFwQjtBQUNBLElBQUlDLGNBQWMsR0FBRyxLQUFyQjtBQUVBLElBQUlDLHlCQUF5QixHQUFHLEtBQWhDO0FBQ0EsSUFBSUMsMkJBQTJCLEdBQUcsS0FBbEM7QUFDQSxJQUFJQyxTQUFTLEdBQUcsS0FBaEI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUF4QjtBQUNBLElBQUlDLFlBQVksR0FBRyxLQUFuQjtBQUVBLElBQUlDLGlCQUFpQixHQUFHbkosRUFBRSxDQUFDVSxLQUFILENBQVM7QUFDL0JDLEVBQUFBLElBQUksRUFBRSxtQkFEeUI7QUFFL0IsYUFBU1gsRUFBRSxDQUFDb0osU0FGbUI7QUFHL0J4SSxFQUFBQSxVQUFVLEVBQUU7QUFDVnlJLElBQUFBLGlCQUFpQixFQUFFO0FBQ2pCLGlCQUFTLElBRFE7QUFFakJ0SSxNQUFBQSxJQUFJLEVBQUVOLGVBRlc7QUFHakJRLE1BQUFBLFlBQVksRUFBRSxJQUhHO0FBSWpCQyxNQUFBQSxPQUFPLEVBQUU7QUFKUSxLQURUO0FBT1YwQixJQUFBQSxtQkFBbUIsRUFBRTtBQUNuQixpQkFBUyxJQURVO0FBRW5CN0IsTUFBQUEsSUFBSSxFQUFFNkIsbUJBRmE7QUFHbkIzQixNQUFBQSxZQUFZLEVBQUUsSUFISztBQUluQkMsTUFBQUEsT0FBTyxFQUFFO0FBSlUsS0FQWDtBQWFWb0ksSUFBQUEsaUJBQWlCLEVBQUU7QUFDakIsaUJBQVMsSUFEUTtBQUVqQnZJLE1BQUFBLElBQUksRUFBRTZDLFlBRlc7QUFHakIzQyxNQUFBQSxZQUFZLEVBQUUsSUFIRztBQUlqQkMsTUFBQUEsT0FBTyxFQUFFO0FBSlEsS0FiVDtBQW1CVnFJLElBQUFBLGFBQWEsRUFBRTtBQUNiLGlCQUFTLElBREk7QUFFYnhJLE1BQUFBLElBQUksRUFBRWlFLFFBRk87QUFHYi9ELE1BQUFBLFlBQVksRUFBRSxJQUhEO0FBSWJDLE1BQUFBLE9BQU8sRUFBRTtBQUpJLEtBbkJMO0FBeUJWc0ksSUFBQUEsbUJBQW1CLEVBQUU7QUFDbkIsaUJBQVMsRUFEVTtBQUVuQnpJLE1BQUFBLElBQUksRUFBRXdELGNBRmE7QUFHbkJ0RCxNQUFBQSxZQUFZLEVBQUUsSUFISztBQUluQkMsTUFBQUEsT0FBTyxFQUFFO0FBSlUsS0F6Qlg7QUErQlZ1SSxJQUFBQSxhQUFhLEVBQUU7QUFDYixpQkFBUyxFQURJO0FBRWIxSSxNQUFBQSxJQUFJLEVBQUVpRixRQUZPO0FBR2IvRSxNQUFBQSxZQUFZLEVBQUUsSUFIRDtBQUliQyxNQUFBQSxPQUFPLEVBQUU7QUFKSSxLQS9CTDtBQXFDVndJLElBQUFBLGdCQUFnQixFQUFFO0FBQ2hCLGlCQUFTLEVBRE87QUFFaEIzSSxNQUFBQSxJQUFJLEVBQUVrRixXQUZVO0FBR2hCaEYsTUFBQUEsWUFBWSxFQUFFLElBSEU7QUFJaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUpPLEtBckNSO0FBMkNWeUksSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEIsaUJBQVMsRUFEUztBQUVsQjVJLE1BQUFBLElBQUksRUFBRW1GLGFBRlk7QUFHbEJqRixNQUFBQSxZQUFZLEVBQUUsSUFISTtBQUlsQkMsTUFBQUEsT0FBTyxFQUFFO0FBSlMsS0EzQ1Y7QUFpRFYwSSxJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQixpQkFBUyxFQURTO0FBRWxCN0ksTUFBQUEsSUFBSSxFQUFFNkYsYUFGWTtBQUdsQjNGLE1BQUFBLFlBQVksRUFBRSxJQUhJO0FBSWxCQyxNQUFBQSxPQUFPLEVBQUU7QUFKUyxLQWpEVjtBQXVEVjJJLElBQUFBLGFBQWEsRUFBRTtBQUNiLGlCQUFTLEVBREk7QUFFYjlJLE1BQUFBLElBQUksRUFBRXdHLFFBRk87QUFHYnRHLE1BQUFBLFlBQVksRUFBRSxJQUhEO0FBSWJDLE1BQUFBLE9BQU8sRUFBRTtBQUpJLEtBdkRMO0FBNkRWNEksSUFBQUEscUJBQXFCLEVBQUU7QUFDckIsaUJBQVMsRUFEWTtBQUVyQi9JLE1BQUFBLElBQUksRUFBRTRHLHFCQUZlO0FBR3JCMUcsTUFBQUEsWUFBWSxFQUFFLElBSE87QUFJckJDLE1BQUFBLE9BQU8sRUFBRTtBQUpZLEtBN0RiO0FBbUVWNkksSUFBQUEsdUJBQXVCLEVBQUU7QUFDdkIsaUJBQVMsRUFEYztBQUV2QmhKLE1BQUFBLElBQUksRUFBRStHLDRCQUZpQjtBQUd2QjdHLE1BQUFBLFlBQVksRUFBRSxJQUhTO0FBSXZCQyxNQUFBQSxPQUFPLEVBQUU7QUFKYyxLQW5FZjtBQTBFVjhJLElBQUFBLE9BQU8sRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUGpKLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGRjtBQUdQVixNQUFBQSxZQUFZLEVBQUUsSUFIUDtBQUlQQyxNQUFBQSxPQUFPLEVBQUU7QUFKRixLQTFFQztBQWdGVitJLElBQUFBLFlBQVksRUFBRTtBQUNaLGlCQUFTLElBREc7QUFFWmxKLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGRztBQUdaQyxNQUFBQSxZQUFZLEVBQUUsSUFIRjtBQUlaQyxNQUFBQSxPQUFPLEVBQUU7QUFKRyxLQWhGSjtBQXNGVmdKLElBQUFBLGFBQWEsRUFBRTtBQUNiLGlCQUFTLElBREk7QUFFYm5KLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSTtBQUdiVixNQUFBQSxZQUFZLEVBQUUsSUFIRDtBQUliQyxNQUFBQSxPQUFPLEVBQUU7QUFKSSxLQXRGTDtBQTRGVmEsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakIsaUJBQVMsSUFEUTtBQUVqQmhCLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGUTtBQUdqQlYsTUFBQUEsWUFBWSxFQUFFLElBSEc7QUFJakJDLE1BQUFBLE9BQU8sRUFBRTtBQUpRLEtBNUZUO0FBa0dWaUosSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEIsaUJBQVMsSUFETztBQUVoQnBKLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGTztBQUdoQlYsTUFBQUEsWUFBWSxFQUFFLElBSEU7QUFJaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUpPLEtBbEdSO0FBd0dWaUcsSUFBQUEsY0FBYyxFQUFFO0FBQ2QsaUJBQVMsSUFESztBQUVkcEcsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZLO0FBR2RWLE1BQUFBLFlBQVksRUFBRSxJQUhBO0FBSWRDLE1BQUFBLE9BQU8sRUFBRTtBQUpLLEtBeEdOO0FBOEdWa0osSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEIsaUJBQVMsSUFETztBQUVoQnJKLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGTztBQUdoQlYsTUFBQUEsWUFBWSxFQUFFLElBSEU7QUFJaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUpPLEtBOUdSO0FBb0hWbUosSUFBQUEsWUFBWSxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVadEosTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZHO0FBR1pWLE1BQUFBLFlBQVksRUFBRSxJQUhGO0FBSVpDLE1BQUFBLE9BQU8sRUFBRTtBQUpHLEtBcEhKO0FBMEhWb0osSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEIsaUJBQVMsSUFEUztBQUVsQnZKLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGUztBQUdsQlYsTUFBQUEsWUFBWSxFQUFFLElBSEk7QUFJbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUpTLEtBMUhWO0FBZ0lWcUosSUFBQUEsWUFBWSxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVaeEosTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZHO0FBR1pWLE1BQUFBLFlBQVksRUFBRSxJQUhGO0FBSVpDLE1BQUFBLE9BQU8sRUFBRTtBQUpHLEtBaElKO0FBc0lWc0osSUFBQUEsZUFBZSxFQUFFO0FBQ2YsaUJBQVMsSUFETTtBQUVmekosTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZNO0FBR2ZWLE1BQUFBLFlBQVksRUFBRSxJQUhDO0FBSWZDLE1BQUFBLE9BQU8sRUFBRTtBQUpNLEtBdElQO0FBNElWdUosSUFBQUEsdUJBQXVCLEVBQUU7QUFDdkIsaUJBQVMsSUFEYztBQUV2QjFKLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGYztBQUd2QlYsTUFBQUEsWUFBWSxFQUFFLElBSFM7QUFJdkJDLE1BQUFBLE9BQU8sRUFBRTtBQUpjLEtBNUlmO0FBa0pWd0osSUFBQUEsc0JBQXNCLEVBQUU7QUFDdEIsaUJBQVMsSUFEYTtBQUV0QjNKLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGYTtBQUd0QlYsTUFBQUEsWUFBWSxFQUFFLElBSFE7QUFJdEJDLE1BQUFBLE9BQU8sRUFBRTtBQUphLEtBbEpkO0FBd0pWeUosSUFBQUEseUJBQXlCLEVBQUU7QUFDekIsaUJBQVMsSUFEZ0I7QUFFekI1SixNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRmdCO0FBR3pCVixNQUFBQSxZQUFZLEVBQUUsSUFIVztBQUl6QkMsTUFBQUEsT0FBTyxFQUFFO0FBSmdCLEtBeEpqQjtBQThKVjBKLElBQUFBLDJCQUEyQixFQUFFO0FBQzNCLGlCQUFTLElBRGtCO0FBRTNCN0osTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZrQjtBQUczQlYsTUFBQUEsWUFBWSxFQUFFLElBSGE7QUFJM0JDLE1BQUFBLE9BQU8sRUFBRTtBQUprQixLQTlKbkI7QUFvS1YySixJQUFBQSx5QkFBeUIsRUFBRTtBQUN6QixpQkFBUyxJQURnQjtBQUV6QjlKLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGZ0I7QUFHekJWLE1BQUFBLFlBQVksRUFBRSxJQUhXO0FBSXpCQyxNQUFBQSxPQUFPLEVBQUU7QUFKZ0IsS0FwS2pCO0FBMEtWNEosSUFBQUEsWUFBWSxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVaL0osTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZHO0FBR1pDLE1BQUFBLFlBQVksRUFBRSxJQUhGO0FBSVpDLE1BQUFBLE9BQU8sRUFBRTtBQUpHLEtBMUtKO0FBZ0xWNkosSUFBQUEsZUFBZSxFQUFFO0FBQ2YsaUJBQVMsSUFETTtBQUVmaEssTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZNO0FBR2ZWLE1BQUFBLFlBQVksRUFBRTtBQUhDLEtBaExQO0FBcUxWK0osSUFBQUEsYUFBYSxFQUFFO0FBQ2IsaUJBQVMsRUFESTtBQUViakssTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNpTCxXQUZJO0FBR2JoSyxNQUFBQSxZQUFZLEVBQUU7QUFIRDtBQXJMTCxHQUhtQjs7QUErTC9COzs7QUFHQWlLLEVBQUFBLFlBbE0rQiwwQkFrTWhCO0FBQ2J2TCxJQUFBQSxtQkFBbUIsR0FBRyxDQUF0QjtBQUNBQyxJQUFBQSxtQkFBbUIsR0FBRyxDQUF0QjtBQUNBaUosSUFBQUEsY0FBYyxHQUFHLEtBQWpCO0FBQ0EvSyxJQUFBQSxXQUFXLEdBQUcsSUFBZDtBQUNBQyxJQUFBQSx3QkFBd0IsR0FBRyxJQUEzQjtBQUNBQyxJQUFBQSxtQkFBbUIsR0FBRyxFQUF0QjtBQUNBQyxJQUFBQSxnQkFBZ0IsR0FBRyxFQUFuQjtBQUNBQyxJQUFBQSx1QkFBdUIsR0FBRyxFQUExQjtBQUNBQyxJQUFBQSw4QkFBOEIsR0FBRyxFQUFqQztBQUNBQyxJQUFBQSx5QkFBeUIsR0FBRyxFQUE1QjtBQUNBQyxJQUFBQSxlQUFlLEdBQUcsSUFBbEI7QUFDQUMsSUFBQUEsd0JBQXdCLEdBQUcsS0FBM0I7QUFDQUMsSUFBQUEsV0FBVyxHQUFHLEVBQWQ7QUFDQUUsSUFBQUEsc0JBQXNCLEdBQUcsS0FBekI7QUFDQUMsSUFBQUEsUUFBUSxHQUFHLENBQVg7QUFDQUMsSUFBQUEsUUFBUSxHQUFHLENBQVg7QUFDQUMsSUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDQUMsSUFBQUEscUJBQXFCLEdBQUcsQ0FBeEI7QUFDQUMsSUFBQUEsaUJBQWlCLEdBQUcsS0FBcEI7QUFDQUMsSUFBQUEsOEJBQThCLEdBQUcsS0FBakM7QUFDQUMsSUFBQUEsaUJBQWlCLEdBQUcsQ0FBcEI7QUFDQUMsSUFBQUEsMkJBQTJCLEdBQUcsS0FBOUI7QUFDQUMsSUFBQUEsWUFBWSxHQUFHLENBQWY7QUFDQUMsSUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQVUsSUFBQUEsZ0JBQWdCLEdBQUcsRUFBbkI7QUFDQXFJLElBQUFBLHVCQUF1QixHQUFHLENBQUMsQ0FBM0IsQ0ExQmEsQ0EwQmlCO0FBRTlCOztBQUNBQyxJQUFBQSxtQkFBbUIsR0FBRyxFQUF0QjtBQUNBQyxJQUFBQSxnQkFBZ0IsQ0E5QkgsQ0FnQ2I7O0FBQ0FDLElBQUFBLGNBQWMsR0FBRyxFQUFqQjtBQUNBQyxJQUFBQSxrQkFBa0IsR0FBRyxFQUFyQjtBQUNBQyxJQUFBQSxpQkFBaUIsR0FBRyxFQUFwQjtBQUNBQyxJQUFBQSxVQUFVLEdBQUcsQ0FBYjtBQUNBQyxJQUFBQSxXQUFXO0FBQ1hDLElBQUFBLFlBQVksR0FBRyxFQUFmO0FBRUFJLElBQUFBLHlCQUF5QixHQUFHLEtBQTVCO0FBQ0FDLElBQUFBLDJCQUEyQixHQUFHLEtBQTlCO0FBQ0FDLElBQUFBLFNBQVMsR0FBRyxLQUFaO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLENBQXBCO0FBQ0FDLElBQUFBLFlBQVksR0FBRyxLQUFmO0FBQ0FwSixJQUFBQSxXQUFXLEdBQUcsQ0FBZDtBQUNBNkksSUFBQUEsYUFBYSxHQUFHLENBQWhCO0FBQ0FDLElBQUFBLGFBQWEsR0FBRyxDQUFoQjtBQUNBcEosSUFBQUEsVUFBVSxHQUFHLEVBQWI7QUFDQUMsSUFBQUEsY0FBYyxHQUFHLEVBQWpCO0FBQ0QsR0FwUDhCOztBQXNQL0I7OztBQUdBMEwsRUFBQUEsaUJBelArQiwrQkF5UFg7QUFDbEIsU0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNELEdBOVA4Qjs7QUFnUS9COzs7QUFHQUMsRUFBQUEsZUFuUStCLDZCQW1RYjtBQUNoQixRQUFJLENBQUN6Tix3QkFBRCxJQUE2QkEsd0JBQXdCLElBQUksSUFBN0QsRUFBbUVBLHdCQUF3QixHQUFHME4sT0FBTyxDQUFDLDBCQUFELENBQWxDO0FBRW5FLFFBQUksQ0FBQzNOLFdBQUQsSUFBZ0JBLFdBQVcsSUFBSSxJQUFuQyxFQUF5Q0EsV0FBVyxHQUFHMk4sT0FBTyxDQUFDLGFBQUQsQ0FBckI7QUFDMUMsR0F2UThCOztBQXlRL0I7OztBQUdBQyxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDcEI7QUFDQTFMLElBQUFBLEVBQUUsQ0FBQzJMLFdBQUgsQ0FBZUMsRUFBZixDQUFrQixVQUFsQixFQUE4QixLQUFLQyxRQUFuQyxFQUE2QyxJQUE3QztBQUNELEdBL1E4Qjs7QUFpUi9COzs7QUFHQUMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ3JCOUwsSUFBQUEsRUFBRSxDQUFDMkwsV0FBSCxDQUFlSSxHQUFmLENBQW1CLFVBQW5CLEVBQStCLEtBQUtGLFFBQXBDLEVBQThDLElBQTlDO0FBQ0QsR0F0UjhCOztBQXdSL0I7OztBQUdBRyxFQUFBQSxNQTNSK0Isb0JBMlJ0QjtBQUNQLFNBQUtkLFlBQUw7QUFDQSxTQUFLTSxlQUFMLEdBRk8sQ0FJUDs7QUFDQSxTQUFLSixZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsU0FBS1UsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QixDQUF6QjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixDQUF4QjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQTlNLElBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0QsR0E3UzhCO0FBK1MvQitNLEVBQUFBLGdDQS9TK0IsNENBK1NFQyxNQS9TRixFQStTVTtBQUN2QyxTQUFLN0IseUJBQUwsQ0FBK0I4QixNQUEvQixHQUF3Q0QsTUFBeEM7QUFDRCxHQWpUOEI7QUFtVC9CRSxFQUFBQSwwQkFuVCtCLHdDQW1URjtBQUMzQixTQUFLSCxnQ0FBTCxDQUFzQyxLQUF0QztBQUNELEdBclQ4QjtBQXNUL0I7QUFDQUksRUFBQUEsMEJBdlQrQix3Q0F1VEY7QUFDM0IsU0FBS3hELGlCQUFMLENBQXVCbEgsaUJBQXZCLENBQXlDd0ssTUFBekMsR0FBa0QsSUFBbEQ7QUFDRCxHQXpUOEI7QUEyVC9CRyxFQUFBQSwrQkEzVCtCLDZDQTJURztBQUNoQyxTQUFLekQsaUJBQUwsQ0FBdUJsSCxpQkFBdkIsQ0FBeUN3SyxNQUF6QyxHQUFrRCxLQUFsRCxDQURnQyxDQUVoQztBQUNELEdBOVQ4QjtBQWdVL0JJLEVBQUFBLG9DQWhVK0IsZ0RBZ1VNTCxNQWhVTixFQWdVYztBQUMzQyxTQUFLM0IsZUFBTCxDQUFxQjRCLE1BQXJCLEdBQThCRCxNQUE5QjtBQUNELEdBbFU4QjtBQW9VL0JNLEVBQUFBLG1DQXBVK0IsaURBb1VPO0FBQ3BDalAsSUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEQyxvQkFBOUQsQ0FBbUYsSUFBbkY7QUFDQXBQLElBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4REUsZ0JBQTlEO0FBQ0FDLElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z0UCxNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvREMsbUJBQXBEO0FBQ0F4UCxNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOERNLGlCQUE5RDtBQUNBelAsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ1EsMEJBQWxDLEdBQStERCxpQkFBL0Q7QUFDQXpQLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NTLGlCQUFsQyxHQUFzREYsaUJBQXREO0FBQ0F6UCxNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDTyxpQkFBbEM7QUFDQXhOLE1BQUFBLEVBQUUsQ0FBQzJOLFFBQUgsQ0FBWUMsU0FBWixDQUFzQixVQUF0QjtBQUNELEtBUFMsRUFPUCxHQVBPLENBQVY7QUFRRCxHQS9VOEI7QUFnVi9CO0FBRUE7QUFDQTtBQUNBQyxFQUFBQSxpQ0FBaUMsRUFBRSwyQ0FBVW5CLE1BQVYsRUFBa0I7QUFDbkQsU0FBS3JELGlCQUFMLENBQXVCL0csYUFBdkIsQ0FBcUNxSyxNQUFyQyxHQUE4Q0QsTUFBOUM7QUFDRCxHQXRWOEI7QUF3Vi9Cb0IsRUFBQUEsMkJBQTJCLEVBQUUsdUNBQVk7QUFDdkMsU0FBS3pFLGlCQUFMLENBQXVCN0csY0FBdkIsQ0FBc0NHLE1BQXRDLEdBQStDLEVBQS9DO0FBQ0EsU0FBSzJKLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxTQUFLdUIsaUNBQUwsQ0FBdUMsSUFBdkM7QUFDQSxTQUFLeEUsaUJBQUwsQ0FBdUI5RyxZQUF2QixDQUFvQ0ksTUFBcEMsR0FBNkM1RSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDUyxpQkFBbEMsR0FBc0RLLFdBQXRELENBQWtFQyxRQUEvRztBQUNELEdBN1Y4QjtBQStWL0JDLEVBQUFBLHVCQUF1QixFQUFFLGlDQUFVQyxJQUFWLEVBQWdCO0FBQ3ZDLFNBQUs1QixhQUFMLEdBQXFCNEIsSUFBckI7QUFDRCxHQWpXOEI7QUFtVy9CQyxFQUFBQSxnQ0FBZ0MsRUFBRSw0Q0FBWTtBQUM1QyxTQUFLTixpQ0FBTCxDQUF1QyxLQUF2Qzs7QUFDQSxRQUFJTyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ3RRLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NTLGlCQUFsQyxHQUFzREssV0FBdEQsQ0FBa0VDLFFBQW5FLENBQXhCOztBQUNBLFFBQUlNLE9BQU8sR0FBR0QsUUFBUSxDQUFDLEtBQUsvQixhQUFOLENBQXRCOztBQUNBLFFBQUksS0FBS0EsYUFBTCxJQUFzQixJQUF0QixJQUE4QixLQUFLQSxhQUFMLElBQXNCLEVBQXBELElBQTBELEtBQUtBLGFBQUwsSUFBc0JpQyxTQUFwRixFQUErRjtBQUM3RixVQUFJRCxPQUFPLElBQUlGLFNBQWYsRUFBMEI7QUFDeEJyRyxRQUFBQSxpQkFBaUIsQ0FBQ3lHLElBQWxCLElBQTBCRixPQUExQjtBQUNBRyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTNHLGlCQUFpQixDQUFDeUcsSUFBOUI7QUFDQSxhQUFLbkYsaUJBQUwsQ0FBdUJsSSxZQUF2QixDQUFvQ3dCLE1BQXBDLEdBQTZDb0YsaUJBQWlCLENBQUN5RyxJQUFsQixDQUF1QkcsUUFBdkIsRUFBN0M7QUFDQVAsUUFBQUEsU0FBUyxJQUFJRSxPQUFiO0FBQ0F2USxRQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDUyxpQkFBbEMsR0FBc0RLLFdBQXRELENBQWtFQyxRQUFsRSxHQUE2RUksU0FBUyxDQUFDTyxRQUFWLEVBQTdFO0FBQ0E1USxRQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDUyxpQkFBbEMsR0FBc0RrQixjQUF0RCxDQUFxRTdRLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NTLGlCQUFsQyxHQUFzREssV0FBdEQsQ0FBa0VDLFFBQXZJLEVBQWlKLENBQUMsQ0FBbEosRUFBcUosQ0FBQyxDQUF0SjtBQUVBLGFBQUthLFNBQUwsQ0FBZSxXQUFXLEtBQUt2QyxhQUFoQixHQUFnQyxrQkFBL0M7QUFDQSxhQUFLakQsaUJBQUwsQ0FBdUI3RyxjQUF2QixDQUFzQ0csTUFBdEMsR0FBK0MsRUFBL0M7QUFDQSxhQUFLMkosYUFBTCxHQUFxQixFQUFyQjtBQUNELE9BWEQsTUFXTztBQUNMLGFBQUt1QyxTQUFMLENBQWUsc0NBQWY7QUFDRDtBQUNGO0FBQ0YsR0F2WDhCO0FBeVgvQkMsRUFBQUEsOEJBQThCLEVBQUUsd0NBQVVDLFdBQVYsRUFBdUJDLFVBQXZCLEVBQTJDQyxTQUEzQyxFQUEwREMsYUFBMUQsRUFBaUZDLGVBQWpGLEVBQXNHQyxvQkFBdEcsRUFBb0lDLFVBQXBJLEVBQW9KQyw0QkFBcEosRUFBMEw7QUFBQSxRQUFuS04sVUFBbUs7QUFBbktBLE1BQUFBLFVBQW1LLEdBQXRKLEtBQXNKO0FBQUE7O0FBQUEsUUFBL0lDLFNBQStJO0FBQS9JQSxNQUFBQSxTQUErSSxHQUFuSSxDQUFtSTtBQUFBOztBQUFBLFFBQWhJQyxhQUFnSTtBQUFoSUEsTUFBQUEsYUFBZ0ksR0FBaEgsS0FBZ0g7QUFBQTs7QUFBQSxRQUF6R0MsZUFBeUc7QUFBekdBLE1BQUFBLGVBQXlHLEdBQXZGLENBQXVGO0FBQUE7O0FBQUEsUUFBcEZDLG9CQUFvRjtBQUFwRkEsTUFBQUEsb0JBQW9GLEdBQTdELEtBQTZEO0FBQUE7O0FBQUEsUUFBdERDLFVBQXNEO0FBQXREQSxNQUFBQSxVQUFzRCxHQUF6QyxDQUF5QztBQUFBOztBQUFBLFFBQXRDQyw0QkFBc0M7QUFBdENBLE1BQUFBLDRCQUFzQyxHQUFQLEtBQU87QUFBQTs7QUFDeE47QUFDQSxTQUFLOUQsZUFBTDtBQUNBLFNBQUt6SixpQkFBTCxDQUF1QjRLLE1BQXZCLEdBQWdDLElBQWhDO0FBRUE1TixJQUFBQSw4QkFBOEIsR0FBR3FRLG9CQUFqQztBQUNBcFEsSUFBQUEsaUJBQWlCLEdBQUdxUSxVQUFwQjtBQUNBcFEsSUFBQUEsMkJBQTJCLEdBQUdxUSw0QkFBOUI7QUFFQSxTQUFLbEQsWUFBTCxHQUFvQjhDLGFBQXBCO0FBQ0EsU0FBSzdDLGdCQUFMLEdBQXdCOEMsZUFBeEI7QUFFQSxRQUFJRCxhQUFKLEVBQW1CLEtBQUsvRCxpQkFBTDtBQUVuQixTQUFLb0Usa0JBQUwsQ0FBd0JSLFdBQXhCLEVBQXFDQyxVQUFyQyxFQUFpREMsU0FBakQsRUFBNERDLGFBQTVEO0FBQ0QsR0F4WThCO0FBeVkvQkssRUFBQUEsa0JBQWtCLEVBQUUsNEJBQVVSLFdBQVYsRUFBdUJDLFVBQXZCLEVBQTJDQyxTQUEzQyxFQUEwREMsYUFBMUQsRUFBaUY7QUFBQSxRQUExREYsVUFBMEQ7QUFBMURBLE1BQUFBLFVBQTBELEdBQTdDLEtBQTZDO0FBQUE7O0FBQUEsUUFBdENDLFNBQXNDO0FBQXRDQSxNQUFBQSxTQUFzQyxHQUExQixDQUEwQjtBQUFBOztBQUFBLFFBQXZCQyxhQUF1QjtBQUF2QkEsTUFBQUEsYUFBdUIsR0FBUCxLQUFPO0FBQUE7O0FBQ25HbkgsSUFBQUEsaUJBQWlCLEdBQUcsSUFBSWpLLFdBQVcsQ0FBQzBSLFVBQWhCLEVBQXBCO0FBQ0F6SCxJQUFBQSxpQkFBaUIsQ0FBQzBILGlCQUFsQixHQUFzQyxJQUFJM1IsV0FBVyxDQUFDNFIscUJBQWhCLEVBQXRDO0FBQ0ExSCxJQUFBQSx5QkFBeUIsR0FBRyxJQUFJbEssV0FBVyxDQUFDNlIsWUFBaEIsRUFBNUI7QUFDQTNILElBQUFBLHlCQUF5QixDQUFDNEgsWUFBMUIsR0FBeUM5UixXQUFXLENBQUMrUixnQkFBWixDQUE2QjNQLElBQXRFO0FBQ0EsU0FBS21KLGlCQUFMLENBQXVCaEgsYUFBdkIsQ0FBcUNzSyxNQUFyQyxHQUE4QyxLQUE5Qzs7QUFFQSxRQUFJb0MsV0FBSixFQUFpQjtBQUNmLFdBQUsxRixpQkFBTCxDQUF1QmpILGNBQXZCLENBQXNDdUssTUFBdEMsR0FBK0MsS0FBL0M7QUFDQSxXQUFLdEQsaUJBQUwsQ0FBdUJ2SCxTQUF2QixDQUFpQzZLLE1BQWpDLEdBQTBDLEtBQTFDO0FBQ0E1RSxNQUFBQSxpQkFBaUIsQ0FBQ3lHLElBQWxCLEdBQXlCaFEsYUFBekI7QUFDQSxXQUFLNkssaUJBQUwsQ0FBdUJoSCxhQUF2QixDQUFxQ3NLLE1BQXJDLEdBQThDLElBQTlDO0FBQ0Q7O0FBRUQsU0FBS21ELCtCQUFMOztBQUVBLFFBQUlkLFVBQUosRUFBZ0I7QUFDZCxXQUFLM0YsaUJBQUwsQ0FBdUJqSCxjQUF2QixDQUFzQ3VLLE1BQXRDLEdBQStDLElBQS9DO0FBQ0EsV0FBS3RELGlCQUFMLENBQXVCdkgsU0FBdkIsQ0FBaUM2SyxNQUFqQyxHQUEwQyxLQUExQzs7QUFFQSxXQUFLLElBQUlvRCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR2hTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVDLE1BQS9GLEVBQXVHRixLQUFLLEVBQTVHLEVBQWdIO0FBQzlHLFlBQUloUyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDUyxpQkFBbEMsR0FBc0RLLFdBQXRELENBQWtFbUMsTUFBbEUsSUFBNEVuUyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FRCxLQUFuRSxFQUEwRUksU0FBMUosRUFBcUs7QUFDbktqSSxVQUFBQSx1QkFBdUIsR0FBRzZILEtBQTFCO0FBQ0FoSSxVQUFBQSxpQkFBaUIsR0FBR2hLLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVELEtBQW5FLENBQXBCOztBQUNBLGNBQUloUiw4QkFBSixFQUFvQztBQUNsQyxnQkFBSUUsMkJBQUosRUFBaUM7QUFDL0JDLGNBQUFBLFlBQVksR0FBRzZJLGlCQUFpQixDQUFDeUcsSUFBakM7QUFDQXpHLGNBQUFBLGlCQUFpQixDQUFDeUcsSUFBbEIsR0FBeUIsQ0FBekI7QUFDQSxtQkFBSzRCLDBCQUFMLENBQWdDclMsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRUQsS0FBbkUsRUFBMEUvSSxVQUExRztBQUNBLG1CQUFLcUoseUJBQUwsQ0FBK0J0Uyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FRCxLQUFuRSxFQUEwRUksU0FBekc7QUFDQSxtQkFBS0csMEJBQUwsQ0FBZ0N2SSxpQkFBaUIsQ0FBQ3lHLElBQWxEO0FBQ0EsbUJBQUsrQiw2QkFBTCxDQUFtQ2xDLFFBQVEsQ0FBQ3RRLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVELEtBQW5FLEVBQTBFUyxRQUEzRSxDQUEzQztBQUNELGFBUEQsTUFPTztBQUNMdFIsY0FBQUEsWUFBWSxHQUFHNkksaUJBQWlCLENBQUN5RyxJQUFqQztBQUNBekcsY0FBQUEsaUJBQWlCLENBQUN5RyxJQUFsQixHQUF5QnhQLGlCQUF6QjtBQUNBLG1CQUFLb1IsMEJBQUwsQ0FBZ0NyUyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FRCxLQUFuRSxFQUEwRS9JLFVBQTFHO0FBQ0EsbUJBQUtxSix5QkFBTCxDQUErQnRTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVELEtBQW5FLEVBQTBFSSxTQUF6RztBQUNBLG1CQUFLRywwQkFBTCxDQUFnQ3ZJLGlCQUFpQixDQUFDeUcsSUFBbEQ7QUFDQSxtQkFBSytCLDZCQUFMLENBQW1DbEMsUUFBUSxDQUFDdFEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRUQsS0FBbkUsRUFBMEVTLFFBQTNFLENBQTNDO0FBQ0Q7QUFDRixXQWhCRCxNQWdCTztBQUNMLGlCQUFLSiwwQkFBTCxDQUFnQ3JTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVELEtBQW5FLEVBQTBFL0ksVUFBMUc7QUFDQSxpQkFBS3FKLHlCQUFMLENBQStCdFMsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRUQsS0FBbkUsRUFBMEVJLFNBQXpHO0FBQ0EsaUJBQUtHLDBCQUFMLENBQWdDdlMsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRUQsS0FBbkUsRUFBMEV2QixJQUExRztBQUNBLGlCQUFLK0IsNkJBQUwsQ0FBbUNsQyxRQUFRLENBQUN0USx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FRCxLQUFuRSxFQUEwRVMsUUFBM0UsQ0FBM0M7QUFDRDtBQUNGO0FBQ0Y7QUFDRixLQWhDRCxNQWdDTztBQUNMdEksTUFBQUEsdUJBQXVCLEdBQUcsQ0FBQyxDQUEzQjtBQUNBLFdBQUtrSSwwQkFBTCxDQUFnQ3JTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NTLGlCQUFsQyxHQUFzREssV0FBdEQsQ0FBa0VwTixJQUFsRztBQUNBLFdBQUswUCx5QkFBTCxDQUErQnRTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NTLGlCQUFsQyxHQUFzREssV0FBdEQsQ0FBa0VtQyxNQUFqRztBQUNBLFdBQUtJLDBCQUFMLENBQWdDdkksaUJBQWlCLENBQUN5RyxJQUFsRDtBQUNBLFdBQUsrQiw2QkFBTCxDQUFtQ2xDLFFBQVEsQ0FBQ3RRLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NTLGlCQUFsQyxHQUFzREssV0FBdEQsQ0FBa0UwQyxRQUFuRSxDQUEzQztBQUNEO0FBQ0YsR0FoYzhCO0FBaWMvQkMsRUFBQUEsb0JBQW9CLEVBQUUsZ0NBQVk7QUFDaEMsV0FBTyxLQUFLckgsaUJBQVo7QUFDRCxHQW5jOEI7QUFvYy9CK0csRUFBQUEsMEJBQTBCLEVBQUUsb0NBQVV6UCxJQUFWLEVBQWdCO0FBQzFDLFNBQUswSSxpQkFBTCxDQUF1QjNHLHdCQUF2QixDQUFnRC9CLElBQWhEO0FBQ0FvSCxJQUFBQSxpQkFBaUIsQ0FBQ2YsVUFBbEIsR0FBK0JyRyxJQUEvQjtBQUNELEdBdmM4QjtBQXdjL0IwUCxFQUFBQSx5QkFBeUIsRUFBRSxtQ0FBVU0sR0FBVixFQUFlO0FBQ3hDNUksSUFBQUEsaUJBQWlCLENBQUNvSSxTQUFsQixHQUE4QlEsR0FBOUI7QUFDRCxHQTFjOEI7QUEyYy9CSixFQUFBQSw2QkFBNkIsRUFBRSx1Q0FBVUksR0FBVixFQUFlO0FBQzVDLFFBQUlDLEtBQUssQ0FBQ0QsR0FBRCxDQUFMLElBQWNBLEdBQUcsSUFBSXBDLFNBQXpCLEVBQW9Db0MsR0FBRyxHQUFHLENBQU47QUFFcEM1SSxJQUFBQSxpQkFBaUIsQ0FBQ3lJLFFBQWxCLEdBQTZCRyxHQUE3QjtBQUNELEdBL2M4QjtBQWdkL0JFLEVBQUFBLHVDQUF1QyxFQUFFLGlEQUFVbFEsSUFBVixFQUFnQjtBQUN2RCxTQUFLMEksaUJBQUwsQ0FBdUJqSSxrQkFBdkIsR0FBNENULElBQTVDO0FBQ0FxSCxJQUFBQSx5QkFBeUIsQ0FBQzhJLHVCQUExQixHQUFvRG5RLElBQXBEO0FBQ0QsR0FuZDhCO0FBb2QvQm9RLEVBQUFBLHVDQUF1QyxFQUFFLGlEQUFVcFEsSUFBVixFQUFnQjtBQUN2RCxTQUFLMEksaUJBQUwsQ0FBdUIvSCxrQkFBdkIsR0FBNENYLElBQTVDO0FBQ0FxSCxJQUFBQSx5QkFBeUIsQ0FBQ2dKLFlBQTFCLEdBQXlDclEsSUFBekM7QUFDRCxHQXZkOEI7QUF3ZC9CbVAsRUFBQUEsK0JBQStCLEVBQUUsMkNBQVk7QUFDM0MsU0FBS3pHLGlCQUFMLENBQXVCM0gsZUFBdkIsQ0FBdUN1UCxRQUF2QyxDQUFnRCxDQUFoRCxFQUFtREEsUUFBbkQsQ0FBNEQsQ0FBNUQsRUFBK0R0RSxNQUEvRCxHQUF3RSxLQUF4RTtBQUNBLFNBQUt0RCxpQkFBTCxDQUF1QnpILG9CQUF2QixDQUE0Q3FQLFFBQTVDLENBQXFELENBQXJELEVBQXdEQSxRQUF4RCxDQUFpRSxDQUFqRSxFQUFvRXRFLE1BQXBFLEdBQTZFLEtBQTdFO0FBQ0EsU0FBS3RELGlCQUFMLENBQXVCOUgsaUJBQXZCLENBQXlDb0IsTUFBekMsR0FBa0QsRUFBbEQ7QUFDQSxTQUFLMEcsaUJBQUwsQ0FBdUI1SCxpQkFBdkIsQ0FBeUNrQixNQUF6QyxHQUFrRCxFQUFsRDtBQUNBLFNBQUswRyxpQkFBTCxDQUF1Qi9ILGtCQUF2QixHQUE0QyxFQUE1QztBQUNBLFNBQUsrSCxpQkFBTCxDQUF1QmpJLGtCQUF2QixHQUE0QyxFQUE1QztBQUNBNEcsSUFBQUEseUJBQXlCLENBQUM0SCxZQUExQixHQUF5QzlSLFdBQVcsQ0FBQytSLGdCQUFaLENBQTZCM1AsSUFBdEU7QUFDRCxHQWhlOEI7QUFpZS9CZ1IsRUFBQUEsaUNBQWlDLEVBQUUsNkNBQVk7QUFDN0MsU0FBSzdILGlCQUFMLENBQXVCM0gsZUFBdkIsQ0FBdUN1UCxRQUF2QyxDQUFnRCxDQUFoRCxFQUFtREEsUUFBbkQsQ0FBNEQsQ0FBNUQsRUFBK0R0RSxNQUEvRCxHQUF3RSxJQUF4RTtBQUNBLFNBQUt0RCxpQkFBTCxDQUF1QnpILG9CQUF2QixDQUE0Q3FQLFFBQTVDLENBQXFELENBQXJELEVBQXdEQSxRQUF4RCxDQUFpRSxDQUFqRSxFQUFvRXRFLE1BQXBFLEdBQTZFLEtBQTdFO0FBRUEzRSxJQUFBQSx5QkFBeUIsQ0FBQzRILFlBQTFCLEdBQXlDOVIsV0FBVyxDQUFDK1IsZ0JBQVosQ0FBNkJzQixTQUF0RTtBQUNELEdBdGU4QjtBQXVlL0JDLEVBQUFBLG1DQUFtQyxFQUFFLCtDQUFZO0FBQy9DLFNBQUsvSCxpQkFBTCxDQUF1QjNILGVBQXZCLENBQXVDdVAsUUFBdkMsQ0FBZ0QsQ0FBaEQsRUFBbURBLFFBQW5ELENBQTRELENBQTVELEVBQStEdEUsTUFBL0QsR0FBd0UsS0FBeEU7QUFDQSxTQUFLdEQsaUJBQUwsQ0FBdUJ6SCxvQkFBdkIsQ0FBNENxUCxRQUE1QyxDQUFxRCxDQUFyRCxFQUF3REEsUUFBeEQsQ0FBaUUsQ0FBakUsRUFBb0V0RSxNQUFwRSxHQUE2RSxJQUE3RTtBQUVBM0UsSUFBQUEseUJBQXlCLENBQUM0SCxZQUExQixHQUF5QzlSLFdBQVcsQ0FBQytSLGdCQUFaLENBQTZCd0IsY0FBdEU7QUFDRCxHQTVlOEI7QUE2ZS9CZixFQUFBQSwwQkFBMEIsRUFBRSxvQ0FBVWdCLE1BQVYsRUFBa0I7QUFDNUMsU0FBS2pJLGlCQUFMLENBQXVCbEksWUFBdkIsQ0FBb0N3QixNQUFwQyxHQUE2QzJPLE1BQTdDO0FBQ0F2SixJQUFBQSxpQkFBaUIsQ0FBQ3lHLElBQWxCLEdBQXlCOEMsTUFBekI7QUFDRCxHQWhmOEI7QUFpZi9CQyxFQUFBQSwyQkFBMkIsRUFBRSxxQ0FBVUQsTUFBVixFQUFrQjtBQUM3QyxRQUFJRSxVQUFVLEdBQUcsS0FBakI7QUFDQSxRQUFJQyxjQUFjLEdBQUcsQ0FBckI7O0FBRUEsUUFBSSxDQUFDMVMsOEJBQUwsRUFBcUM7QUFDbkMsV0FBSyxJQUFJZ1IsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdoSSxpQkFBaUIsQ0FBQzJKLFlBQWxCLENBQStCekIsTUFBM0QsRUFBbUVGLEtBQUssRUFBeEUsRUFBNEU7QUFDMUUsWUFBSWhJLGlCQUFpQixDQUFDMkosWUFBbEIsQ0FBK0IzQixLQUEvQixFQUFzQzRCLFNBQTFDLEVBQXFEO0FBQ25ESCxVQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBQyxVQUFBQSxjQUFjLEdBQUcxQixLQUFqQjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJeUIsVUFBSixFQUFnQjtBQUNkLGFBQUszQyxTQUFMLENBQWUscUNBQXFDOUcsaUJBQWlCLENBQUMySixZQUFsQixDQUErQkQsY0FBL0IsRUFBK0N4UCxVQUFuRyxFQUErRzVDLGVBQS9HO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSTBJLGlCQUFpQixDQUFDeUcsSUFBbEIsSUFBMEI4QyxNQUE5QixFQUFzQztBQUNwQyxlQUFLekMsU0FBTCxDQUFlLDhFQUFmLEVBQStGeFAsZUFBL0Y7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLZ0ssaUJBQUwsQ0FBdUJySCxhQUF2QixDQUFxQzJLLE1BQXJDLEdBQThDLElBQTlDO0FBQ0ExRSxVQUFBQSxZQUFZLEdBQUcySixJQUFJLENBQUNDLEdBQUwsQ0FBU3hELFFBQVEsQ0FBQ3RHLGlCQUFpQixDQUFDeUcsSUFBbkIsQ0FBUixHQUFtQzhDLE1BQTVDLENBQWY7QUFDQSxlQUFLakksaUJBQUwsQ0FBdUJuSCxlQUF2QixDQUF1QyxDQUF2QyxFQUEwQytPLFFBQTFDLENBQW1ELENBQW5ELEVBQXNEQSxRQUF0RCxDQUErRCxDQUEvRCxFQUFrRWEsWUFBbEUsQ0FBK0U5UixFQUFFLENBQUNnQixLQUFsRixFQUF5RjJCLE1BQXpGLEdBQWtHLE1BQU1zRixZQUF4RztBQUNEO0FBQ0Y7QUFDRixLQXBCRCxNQW9CTztBQUNMLFdBQUs0RyxTQUFMLENBQWUsaURBQWY7QUFDRDtBQUNGLEdBNWdCOEI7QUE2Z0IvQmtELEVBQUFBLGlDQUFpQyxFQUFFLDJDQUFVQyxLQUFWLEVBQWlCO0FBQ2xELFFBQUksQ0FBQ2pULDhCQUFMLEVBQXFDO0FBQ25DLFVBQUlpSix5QkFBeUIsQ0FBQzRILFlBQTFCLElBQTBDOVIsV0FBVyxDQUFDK1IsZ0JBQVosQ0FBNkJ3QixjQUEzRSxFQUEyRjtBQUN6RixhQUFLRSwyQkFBTCxDQUFpQyxLQUFqQztBQUNELE9BRkQsTUFFTyxJQUFJdkoseUJBQXlCLENBQUM0SCxZQUExQixJQUEwQzlSLFdBQVcsQ0FBQytSLGdCQUFaLENBQTZCc0IsU0FBM0UsRUFBc0Y7QUFDM0YsYUFBS0ksMkJBQUwsQ0FBaUMsS0FBakM7QUFDRCxPQUZNLE1BRUE7QUFDTCxhQUFLMUMsU0FBTCxDQUFlLCtEQUFmO0FBQ0Q7QUFDRixLQVJELE1BUU87QUFDTCxXQUFLQSxTQUFMLENBQWUsaURBQWY7QUFDRDtBQUNGLEdBemhCOEI7QUEwaEIvQm9ELEVBQUFBLHFDQUFxQyxFQUFFLCtDQUFVRCxLQUFWLEVBQWlCO0FBQ3RELFNBQUszSSxpQkFBTCxDQUF1QnJILGFBQXZCLENBQXFDMkssTUFBckMsR0FBOEMsS0FBOUM7QUFDRCxHQTVoQjhCO0FBNmhCL0J1RixFQUFBQSxvQ0FBb0MsRUFBRSw4Q0FBVW5DLEtBQVYsRUFBaUI7QUFDckQsU0FBSyxJQUFJb0MsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLOUksaUJBQUwsQ0FBdUJuSCxlQUF2QixDQUF1QytOLE1BQTNELEVBQW1Fa0MsQ0FBQyxFQUFwRSxFQUF3RTtBQUN0RSxVQUFJcEMsS0FBSyxJQUFJb0MsQ0FBYixFQUFnQixLQUFLOUksaUJBQUwsQ0FBdUJuSCxlQUF2QixDQUF1Q2lRLENBQXZDLEVBQTBDbEIsUUFBMUMsQ0FBbUQsQ0FBbkQsRUFBc0R0RSxNQUF0RCxHQUErRCxJQUEvRCxDQUFoQixLQUNLLEtBQUt0RCxpQkFBTCxDQUF1Qm5ILGVBQXZCLENBQXVDaVEsQ0FBdkMsRUFBMENsQixRQUExQyxDQUFtRCxDQUFuRCxFQUFzRHRFLE1BQXRELEdBQStELEtBQS9EO0FBQ047QUFDRixHQWxpQjhCO0FBbWlCL0J5RixFQUFBQSxvQ0FBb0MsRUFBRSw4Q0FBVUosS0FBVixFQUFpQjtBQUNyRCxTQUFLM0ksaUJBQUwsQ0FBdUJwSCxVQUF2QixHQUFvQ2xDLGNBQWMsQ0FBQ1MsS0FBbkQ7QUFDQSxTQUFLMFIsb0NBQUwsQ0FBMEMsQ0FBMUM7QUFDRCxHQXRpQjhCO0FBdWlCL0JHLEVBQUFBLG9DQUFvQyxFQUFFLDhDQUFVTCxLQUFWLEVBQWlCO0FBQ3JELFNBQUszSSxpQkFBTCxDQUF1QnBILFVBQXZCLEdBQW9DbEMsY0FBYyxDQUFDSSxXQUFuRDtBQUNBLFNBQUsrUixvQ0FBTCxDQUEwQyxDQUExQztBQUNELEdBMWlCOEI7QUEyaUIvQkksRUFBQUEsb0NBQW9DLEVBQUUsOENBQVVOLEtBQVYsRUFBaUI7QUFDckQsU0FBSzNJLGlCQUFMLENBQXVCcEgsVUFBdkIsR0FBb0NsQyxjQUFjLENBQUNLLGFBQW5EO0FBQ0EsU0FBSzhSLG9DQUFMLENBQTBDLENBQTFDO0FBQ0QsR0E5aUI4QjtBQStpQi9CSyxFQUFBQSxvQ0FBb0MsRUFBRSw4Q0FBVVAsS0FBVixFQUFpQjtBQUNyRCxTQUFLM0ksaUJBQUwsQ0FBdUJwSCxVQUF2QixHQUFvQ2xDLGNBQWMsQ0FBQ00sY0FBbkQ7QUFDQSxTQUFLNlIsb0NBQUwsQ0FBMEMsQ0FBMUM7QUFDRCxHQWxqQjhCO0FBbWpCL0JNLEVBQUFBLG9DQUFvQyxFQUFFLDhDQUFVUixLQUFWLEVBQWlCO0FBQ3JELFNBQUszSSxpQkFBTCxDQUF1QnBILFVBQXZCLEdBQW9DbEMsY0FBYyxDQUFDTyxhQUFuRDtBQUNBLFNBQUs0UixvQ0FBTCxDQUEwQyxDQUExQztBQUNELEdBdGpCOEI7QUF1akIvQk8sRUFBQUEsb0NBQW9DLEVBQUUsOENBQVVULEtBQVYsRUFBaUI7QUFDckQsU0FBSzNJLGlCQUFMLENBQXVCcEgsVUFBdkIsR0FBb0NsQyxjQUFjLENBQUNRLGFBQW5EO0FBQ0EsU0FBSzJSLG9DQUFMLENBQTBDLENBQTFDO0FBQ0QsR0ExakI4QjtBQTJqQi9CUSxFQUFBQSxnQ0FBZ0MsRUFBRSwwQ0FBVVYsS0FBVixFQUFpQjtBQUNqRCxRQUFJLEtBQUszSSxpQkFBTCxDQUF1QnBILFVBQXZCLElBQXFDbEMsY0FBYyxDQUFDUyxLQUF4RCxFQUErRHdILHlCQUF5QixDQUFDL0YsVUFBMUIsR0FBdUNnRyxZQUF2QyxDQUEvRCxLQUNLRCx5QkFBeUIsQ0FBQy9GLFVBQTFCLEdBQXVDb00sUUFBUSxDQUFDLEtBQUtoRixpQkFBTCxDQUF1QnBILFVBQXhCLENBQS9DO0FBRUwrRixJQUFBQSx5QkFBeUIsQ0FBQzJKLFNBQTFCLEdBQXNDLElBQXRDO0FBQ0EsU0FBS00scUNBQUw7QUFDQWxLLElBQUFBLGlCQUFpQixDQUFDeUcsSUFBbEIsR0FBeUJ6RyxpQkFBaUIsQ0FBQ3lHLElBQWxCLEdBQXlCeEcseUJBQXlCLENBQUMvRixVQUE1RTtBQUNBLFNBQUtxTywwQkFBTCxDQUFnQ3ZJLGlCQUFpQixDQUFDeUcsSUFBbEQ7QUFDRCxHQW5rQjhCO0FBcWtCL0JtRSxFQUFBQSxxQkFya0IrQixpQ0Fxa0JUQyxLQXJrQlMsRUFxa0JGO0FBQzNCLFFBQUlDLEtBQUssR0FBRzlVLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RDRGLGVBQTlELEVBQVo7O0FBQ0EsUUFBSUQsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDZEUsTUFBQUEsa0JBQWtCLEdBQUcsSUFBSWpWLFdBQVcsQ0FBQzBSLFVBQWhCLEVBQXJCO0FBQ0F1RCxNQUFBQSxrQkFBa0IsQ0FBQ3ZFLElBQW5CLEdBQTBCLEtBQTFCO0FBQ0F1RSxNQUFBQSxrQkFBa0IsQ0FBQ0MsUUFBbkIsR0FBOEJKLEtBQUssQ0FBQzFDLE1BQXBDO0FBQ0E2QyxNQUFBQSxrQkFBa0IsQ0FBQy9MLFVBQW5CLEdBQWdDNEwsS0FBSyxDQUFDalMsSUFBdEM7QUFDQW9TLE1BQUFBLGtCQUFrQixDQUFDdkMsUUFBbkIsR0FBOEIsQ0FBOUI7QUFDQXVDLE1BQUFBLGtCQUFrQixDQUFDRSxlQUFuQixHQUFxQyxDQUFyQztBQUNBRixNQUFBQSxrQkFBa0IsQ0FBQ0csUUFBbkIsR0FBOEIsS0FBOUI7QUFDQUgsTUFBQUEsa0JBQWtCLENBQUN0RCxpQkFBbkIsR0FBdUMsSUFBSTNSLFdBQVcsQ0FBQzRSLHFCQUFoQixFQUF2QztBQUNBeUQsTUFBQUEsMEJBQTBCLEdBQUcsSUFBSXJWLFdBQVcsQ0FBQzZSLFlBQWhCLEVBQTdCO0FBQ0F3RCxNQUFBQSwwQkFBMEIsQ0FBQ3ZELFlBQTNCLEdBQTBDOVIsV0FBVyxDQUFDK1IsZ0JBQVosQ0FBNkJzQixTQUF2RTtBQUNBZ0MsTUFBQUEsMEJBQTBCLENBQUNyQyx1QkFBM0IsR0FBcUQsUUFBckQ7QUFDQXFDLE1BQUFBLDBCQUEwQixDQUFDbkMsWUFBM0IsR0FBMEMsWUFBMUM7O0FBQ0ErQixNQUFBQSxrQkFBa0IsQ0FBQ3JCLFlBQW5CLENBQWdDMEIsSUFBaEMsQ0FBcUNELDBCQUFyQzs7QUFFQXBWLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NRLDBCQUFsQyxHQUErRDRGLFVBQS9ELENBQTBFLENBQTFFLEVBQTZFTixrQkFBN0U7QUFDRDtBQUNGLEdBeGxCOEI7QUF5bEIvQmxILEVBQUFBLFFBQVEsRUFBRSxrQkFBVStHLEtBQVYsRUFBaUJVLEdBQWpCLEVBQXNCQyxXQUF0QixFQUEyQztBQUFBLFFBQXJCQSxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQ25ELFFBQUlDLFdBQVcsR0FBR3pWLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RHVHLFdBQTlELEdBQTRFQyxpQkFBNUUsQ0FBOEYsZ0JBQTlGLEVBQWdILFlBQWhILENBQWxCOztBQUVBLFFBQUlGLFdBQUosRUFBaUI7QUFDZnpWLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RHlHLFVBQTlELEdBQTJFNVYsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEMEcsYUFBOUQsRUFBM0U7QUFDRDs7QUFFRCxRQUFJLENBQUNMLFdBQUwsRUFBa0I7QUFDaEIsVUFBSUQsR0FBRyxJQUFJdlYsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEdUcsV0FBOUQsR0FBNEVJLE9BQXZGLEVBQWdHOVYsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRW9ELElBQW5FLENBQXdFUixLQUF4RTtBQUNqRyxLQVRrRCxDQVduRDs7O0FBRUEsUUFBSTdVLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVDLE1BQW5FLElBQTZFbFMsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEeUcsVUFBL0ksRUFBMko7QUFDeko7QUFDQTVWLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RDRHLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRkMsaUJBQXRGLENBQXdHLGNBQXhHLEVBQXdILElBQXhILEVBQThILElBQTlIO0FBQ0FqVyxNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOEQ0RyxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxnQkFBeEcsRUFBMEhqVyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQTlLLEVBQThMLElBQTlMO0FBQ0EsV0FBSzNHLGlCQUFMLENBQXVCbEgsaUJBQXZCLENBQXlDd0ssTUFBekMsR0FBa0QsS0FBbEQ7QUFDQSxXQUFLNUssaUJBQUwsQ0FBdUI0SyxNQUF2QixHQUFnQyxLQUFoQztBQUNBLFdBQUt4QyxnQkFBTCxDQUFzQndDLE1BQXRCLEdBQStCLElBQS9CO0FBRUE1TyxNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDJHLFNBQXBEO0FBQ0F4RixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTNRLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBaEU7QUFDRDtBQUNGLEdBam5COEI7QUFtbkIvQmtFLEVBQUFBLGdCQUFnQixFQUFFLDBCQUFVNUYsT0FBVixFQUFtQjZGLGFBQW5CLEVBQWtDQyxZQUFsQyxFQUFnRDtBQUNoRSxRQUFJck0saUJBQWlCLENBQUN5RyxJQUFsQixHQUF5QkYsT0FBekIsSUFBb0MsQ0FBQ3JQLDJCQUF6QyxFQUFzRTtBQUNwRSxXQUFLNFAsU0FBTCxDQUFlLDBDQUEwQ3NGLGFBQTFDLEdBQTBELFlBQXpFLEVBQXVGOVUsZUFBdkY7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFJK1UsWUFBSixFQUFrQjtBQUNoQixZQUFJck0saUJBQWlCLENBQUNrTCxlQUFsQixHQUFvQyxDQUF4QyxFQUEyQztBQUN6QyxjQUFJLENBQUNoVSwyQkFBTCxFQUFrQztBQUNoQzhJLFlBQUFBLGlCQUFpQixDQUFDeUcsSUFBbEIsR0FBeUJ6RyxpQkFBaUIsQ0FBQ3lHLElBQWxCLEdBQXlCRixPQUFsRDtBQUNBLGlCQUFLakYsaUJBQUwsQ0FBdUJsSSxZQUF2QixDQUFvQ3dCLE1BQXBDLEdBQTZDLE1BQU1vRixpQkFBaUIsQ0FBQ3lHLElBQXJFO0FBQ0Q7O0FBRUQsZUFBSzZGLFNBQUwsR0FBaUIsSUFBakI7QUFDQXRNLFVBQUFBLGlCQUFpQixDQUFDa0wsZUFBbEI7QUFDRCxTQVJELE1BUU87QUFDTCxlQUFLb0IsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGVBQUt4RixTQUFMLENBQWUsc0RBQWY7QUFDRDtBQUNGLE9BYkQsTUFhTztBQUNMLFlBQUksQ0FBQzVQLDJCQUFMLEVBQWtDO0FBQ2hDOEksVUFBQUEsaUJBQWlCLENBQUN5RyxJQUFsQixHQUF5QnpHLGlCQUFpQixDQUFDeUcsSUFBbEIsR0FBeUJGLE9BQWxEO0FBQ0EsZUFBS2pGLGlCQUFMLENBQXVCbEksWUFBdkIsQ0FBb0N3QixNQUFwQyxHQUE2QyxNQUFNb0YsaUJBQWlCLENBQUN5RyxJQUFyRTtBQUNEOztBQUNELGFBQUs2RixTQUFMLEdBQWlCLElBQWpCO0FBQ0F0TSxRQUFBQSxpQkFBaUIsQ0FBQ3VNLG9CQUFsQjtBQUNEO0FBQ0Y7QUFDRixHQTdvQjhCO0FBK29CL0JDLEVBQUFBLGtCQUFrQixFQUFFLDhCQUFZO0FBQzlCLFFBQUksQ0FBQ3hWLDhCQUFMLEVBQXFDO0FBQ25DLFdBQUtnRCxpQkFBTCxDQUF1QjRLLE1BQXZCLEdBQWdDLEtBQWhDOztBQUVBLFVBQUkzRSx5QkFBeUIsQ0FBQzJKLFNBQTlCLEVBQXlDO0FBQ3ZDM0osUUFBQUEseUJBQXlCLENBQUMySixTQUExQixHQUFzQyxLQUF0QztBQUNBNUosUUFBQUEsaUJBQWlCLENBQUN5RyxJQUFsQixHQUF5QnpHLGlCQUFpQixDQUFDeUcsSUFBbEIsR0FBeUJ4Ryx5QkFBeUIsQ0FBQy9GLFVBQTVFO0FBQ0ErRixRQUFBQSx5QkFBeUIsQ0FBQy9GLFVBQTFCLEdBQXVDLENBQXZDO0FBQ0EsYUFBSzRNLFNBQUwsQ0FBZSw2QkFBZjtBQUNEO0FBQ0YsS0FURCxNQVNPO0FBQ0w5RyxNQUFBQSxpQkFBaUIsQ0FBQ3lHLElBQWxCLEdBQXlCdFAsWUFBekI7QUFDQSxXQUFLNkMsaUJBQUwsQ0FBdUI0SyxNQUF2QixHQUFnQyxLQUFoQztBQUNBekUsTUFBQUEsdUJBQXVCLEdBQUcsQ0FBQyxDQUEzQjtBQUNBbkosTUFBQUEsOEJBQThCLEdBQUcsS0FBakM7QUFDQUMsTUFBQUEsaUJBQWlCLEdBQUcsQ0FBcEI7QUFDQUMsTUFBQUEsMkJBQTJCLEdBQUcsS0FBOUI7QUFDQWxCLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ea0gsZ0JBQXBEO0FBQ0Q7QUFDRixHQWxxQjhCO0FBb3FCL0JDLEVBQUFBLDBCQUEwQixFQUFFLHNDQUFZO0FBQUE7O0FBQ3RDLFFBQUk1QixLQUFLLEdBQUc5VSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOEQ0RixlQUE5RCxFQUFaOztBQUVBLFFBQUksS0FBSzFHLFlBQVQsRUFBdUI7QUFDckJyRSxNQUFBQSxpQkFBaUIsQ0FBQzJNLFVBQWxCLEdBQStCLElBQS9CO0FBQ0EzTSxNQUFBQSxpQkFBaUIsQ0FBQzRNLGNBQWxCLEdBQW1DLEtBQUt0SSxnQkFBeEM7QUFDQXRPLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVqUyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5FLElBQTBJN00saUJBQTFJO0FBQ0QsS0FKRCxNQUlPO0FBQ0xoSyxNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1Fb0QsSUFBbkUsQ0FBd0VyTCxpQkFBeEU7QUFDRDs7QUFFRCxRQUFJOEssS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDZDtBQUNBO0FBQ0E5VSxNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOER1RyxXQUE5RCxHQUE0RU8saUJBQTVFLENBQThGLG1CQUE5RixFQUFtSGpNLGlCQUFuSDs7QUFFQSxVQUFJLENBQUMsS0FBS3FFLFlBQVYsRUFBd0I7QUFDdEJyTyxRQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDUSwwQkFBbEMsR0FBK0Q0RixVQUEvRCxDQUEwRSxDQUExRSxFQUE2RXRMLGlCQUE3RTtBQUNBLGFBQUtzQixpQkFBTCxDQUF1QmxILGlCQUF2QixDQUF5Q3dLLE1BQXpDLEdBQWtELElBQWxEO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsYUFBS3RELGlCQUFMLENBQXVCbEgsaUJBQXZCLENBQXlDd0ssTUFBekMsR0FBa0QsS0FBbEQ7QUFDQSxhQUFLNUssaUJBQUwsQ0FBdUI0SyxNQUF2QixHQUFnQyxLQUFoQztBQUNBLGFBQUt4QyxnQkFBTCxDQUFzQndDLE1BQXRCLEdBQStCLElBQS9CO0FBRUEsWUFBSWlHLEtBQUssR0FBRztBQUFFaUMsVUFBQUEsSUFBSSxFQUFFO0FBQUVDLFlBQUFBLFVBQVUsRUFBRSxJQUFkO0FBQW9CQyxZQUFBQSxJQUFJLEVBQUVoWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQTFCO0FBQStGSSxZQUFBQSxjQUFjLEVBQUVqTjtBQUEvRztBQUFSLFNBQVo7QUFDQWhLLFFBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NRLDBCQUFsQyxHQUErRDRGLFVBQS9ELENBQTBFLENBQTFFLEVBQTZFVCxLQUE3RTtBQUNBN1UsUUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QySCxzQkFBcEQ7QUFDRDtBQUNGLEtBakJELE1BaUJPLElBQUlwQyxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNyQjtBQUNBLFVBQUksQ0FBQyxLQUFLekcsWUFBVixFQUF3QjtBQUN0QixhQUFLL0MsaUJBQUwsQ0FBdUJsSCxpQkFBdkIsQ0FBeUN3SyxNQUF6QyxHQUFrRCxJQUFsRDtBQUNBVSxRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFVBQUEsS0FBSSxDQUFDaEUsaUJBQUwsQ0FBdUJsSCxpQkFBdkIsQ0FBeUN3SyxNQUF6QyxHQUFrRCxLQUFsRDtBQUNBLFVBQUEsS0FBSSxDQUFDNUssaUJBQUwsQ0FBdUI0SyxNQUF2QixHQUFnQyxLQUFoQztBQUNBLFVBQUEsS0FBSSxDQUFDeEMsZ0JBQUwsQ0FBc0J3QyxNQUF0QixHQUErQixJQUEvQjtBQUNBNU8sVUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QyRyxTQUFwRDtBQUNELFNBTFMsRUFLUCxJQUxPLENBQVY7QUFNRCxPQVJELE1BUU87QUFDTCxhQUFLNUssaUJBQUwsQ0FBdUJsSCxpQkFBdkIsQ0FBeUN3SyxNQUF6QyxHQUFrRCxLQUFsRDtBQUNBLGFBQUs1SyxpQkFBTCxDQUF1QjRLLE1BQXZCLEdBQWdDLEtBQWhDO0FBQ0EsYUFBS3hDLGdCQUFMLENBQXNCd0MsTUFBdEIsR0FBK0IsSUFBL0I7QUFDQTVPLFFBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMkgsc0JBQXBEO0FBQ0Q7QUFDRixLQWhCTSxNQWdCQTtBQUNMeEcsTUFBQUEsT0FBTyxDQUFDeUcsS0FBUixDQUFjLGtCQUFkO0FBQ0Q7QUFDRixHQW50QjhCO0FBcXRCL0JDLEVBQUFBLHNDQUFzQyxFQUFFLGtEQUFZO0FBQ2xELFFBQUksQ0FBQ3BXLDhCQUFMLEVBQXFDO0FBQ25DaEIsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRTlILHVCQUFuRSxJQUE4RkgsaUJBQTlGO0FBQ0EsV0FBS2hHLGlCQUFMLENBQXVCNEssTUFBdkIsR0FBZ0MsS0FBaEM7QUFDQXpFLE1BQUFBLHVCQUF1QixHQUFHLENBQUMsQ0FBM0I7QUFDQSxXQUFLa04sMkJBQUwsQ0FBaUMsSUFBakM7QUFDRCxLQUxELE1BS087QUFDTHJOLE1BQUFBLGlCQUFpQixDQUFDeUcsSUFBbEIsR0FBeUJ0UCxZQUF6QjtBQUNBbkIsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRTlILHVCQUFuRSxJQUE4RkgsaUJBQTlGO0FBQ0EsV0FBS2hHLGlCQUFMLENBQXVCNEssTUFBdkIsR0FBZ0MsS0FBaEM7QUFDQXpFLE1BQUFBLHVCQUF1QixHQUFHLENBQUMsQ0FBM0I7QUFDQW5KLE1BQUFBLDhCQUE4QixHQUFHLEtBQWpDO0FBQ0FDLE1BQUFBLGlCQUFpQixHQUFHLENBQXBCO0FBQ0FDLE1BQUFBLDJCQUEyQixHQUFHLEtBQTlCO0FBQ0FsQixNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRGtILGdCQUFwRDtBQUNEO0FBQ0YsR0FydUI4QjtBQXV1Qi9CYSxFQUFBQSxtQkFBbUIsRUFBRSwrQkFBWTtBQUMvQixTQUFLaEIsU0FBTCxHQUFpQixLQUFqQjtBQUVBLFFBQUlyTSx5QkFBeUIsQ0FBQzhJLHVCQUExQixJQUFxRCxFQUF6RCxFQUE2RCxLQUFLakMsU0FBTCxDQUFlLCtCQUFmLEVBQTdELEtBQ0ssSUFBSTdHLHlCQUF5QixDQUFDZ0osWUFBMUIsSUFBMEMsRUFBOUMsRUFBa0QsS0FBS25DLFNBQUwsQ0FBZSwrQkFBZixFQUFsRCxLQUNBO0FBQ0gsVUFBSTdHLHlCQUF5QixDQUFDNEgsWUFBMUIsSUFBMEM5UixXQUFXLENBQUMrUixnQkFBWixDQUE2QjNQLElBQXZFLElBQStFOEgseUJBQXlCLENBQUM0SCxZQUExQixJQUEwQ3JCLFNBQTdILEVBQXdJO0FBQ3RJLGFBQUtNLFNBQUwsQ0FBZSwwQkFBZjtBQUNBO0FBQ0Q7O0FBRUQsVUFBSTdHLHlCQUF5QixDQUFDNEgsWUFBMUIsSUFBMEM5UixXQUFXLENBQUMrUixnQkFBWixDQUE2QnNCLFNBQTNFLEVBQ0U7QUFDQSxhQUFLK0MsZ0JBQUwsQ0FBc0IsS0FBdEIsRUFBNkIsTUFBN0IsRUFBcUMsSUFBckMsRUFGRixLQUdLLElBQUlsTSx5QkFBeUIsQ0FBQzRILFlBQTFCLElBQTBDOVIsV0FBVyxDQUFDK1IsZ0JBQVosQ0FBNkJ3QixjQUEzRSxFQUNIO0FBQ0EsYUFBSzZDLGdCQUFMLENBQXNCLEtBQXRCLEVBQTZCLGtCQUE3QixFQUFpRCxLQUFqRDs7QUFFRixVQUFJLEtBQUtHLFNBQUwsSUFBa0IsSUFBbEIsSUFBMEIsS0FBS2pJLFlBQUwsSUFBcUIsSUFBbkQsRUFBeUQ7QUFDdkRyRSxRQUFBQSxpQkFBaUIsQ0FBQzJKLFlBQWxCLENBQStCMEIsSUFBL0IsQ0FBb0NwTCx5QkFBcEM7O0FBRUEsWUFBSUUsdUJBQXVCLElBQUksQ0FBQyxDQUFoQyxFQUFtQztBQUNqQztBQUNBLGVBQUtpTixzQ0FBTDtBQUNELFNBSEQsQ0FJQTtBQUpBLGFBS0s7QUFDSCxpQkFBS1YsMEJBQUw7QUFDRCxXQVZzRCxDQVl2RDs7O0FBQ0EsYUFBSyxJQUFJdEMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3BVLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVDLE1BQXZGLEVBQStGa0MsQ0FBQyxFQUFoRyxFQUFvRztBQUNsRzFELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQjNRLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVtQyxDQUFuRSxFQUFzRW5MLFVBQXBHO0FBQ0F5SCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBZ0IzUSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FbUMsQ0FBbkUsRUFBc0VoQyxTQUFsRztBQUNBMUIsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQW9CM1Esd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRW1DLENBQW5FLEVBQXNFbUQsS0FBdEc7QUFDQTdHLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdDQUFaO0FBQ0FELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZM1Esd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRW1DLENBQW5FLEVBQXNFVCxZQUFsRjtBQUNBakQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWtCM1Esd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRW1DLENBQW5FLEVBQXNFM0QsSUFBcEc7QUFDQUMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQXdCM1Esd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRW1DLENBQW5FLEVBQXNFUixTQUExRztBQUNBbEQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQXdCM1Esd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRW1DLENBQW5FLEVBQXNFbFEsVUFBMUc7QUFDRDtBQUNGO0FBQ0Y7QUFDRixHQWx4QjhCO0FBbXhCL0I7QUFFQTtBQUNBO0FBQ0FtVCxFQUFBQSwyQkFBMkIsRUFBRSxxQ0FBVUcsUUFBVixFQUFvQjtBQUMvQyxTQUFLcE8sY0FBTCxDQUFvQndGLE1BQXBCLEdBQTZCNEksUUFBN0I7QUFFQSxRQUFJQyxPQUFPLEdBQUdELFFBQWQ7O0FBRUEsUUFBSUMsT0FBSixFQUFhO0FBQ1hBLE1BQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0EsV0FBSzVTLG1CQUFMLENBQXlCVSxXQUF6QixDQUFxQ3FKLE1BQXJDLEdBQThDLEtBQTlDO0FBQ0EsV0FBS0osS0FBTCxHQUFhaE4sZUFBYjtBQUNBLFdBQUtpTixZQUFMLEdBQW9CLElBQXBCO0FBQ0EsV0FBSzVKLG1CQUFMLENBQXlCUyxTQUF6QixDQUFtQ1YsTUFBbkMsR0FBNEMsS0FBSzRKLEtBQUwsR0FBYSxrRUFBekQ7QUFDQWtKLE1BQUFBLFlBQVksQ0FBQy9WLFlBQUQsQ0FBWjtBQUNBLFdBQUtnVyxXQUFMO0FBQ0QsS0FSRCxNQVFPO0FBQ0xELE1BQUFBLFlBQVksQ0FBQy9WLFlBQUQsQ0FBWjtBQUNBLFdBQUs2TSxLQUFMLEdBQWEsQ0FBYjtBQUNBLFdBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxXQUFLNUosbUJBQUwsQ0FBeUJTLFNBQXpCLENBQW1DVixNQUFuQyxHQUE0QyxFQUE1QztBQUNBLFdBQUtDLG1CQUFMLENBQXlCVSxXQUF6QixDQUFxQ3FKLE1BQXJDLEdBQThDLEtBQTlDO0FBQ0Q7O0FBRUQsU0FBS2dKLHVCQUFMO0FBQ0QsR0E3eUI4QjtBQSt5Qi9CRCxFQUFBQSxXQS95QitCLHlCQSt5QmpCO0FBQUE7O0FBQ1osUUFBSSxLQUFLbkosS0FBTCxHQUFhLENBQWpCLEVBQW9CO0FBQ2xCLFdBQUtBLEtBQUwsR0FBYSxLQUFLQSxLQUFMLEdBQWEsQ0FBMUI7QUFDQSxXQUFLM0osbUJBQUwsQ0FBeUJTLFNBQXpCLENBQW1DVixNQUFuQyxHQUE0QyxLQUFLNEosS0FBTCxHQUFhLGtFQUF6RDtBQUNBN00sTUFBQUEsWUFBWSxHQUFHMk4sVUFBVSxDQUFDLFlBQU07QUFDOUIsUUFBQSxNQUFJLENBQUNxSSxXQUFMO0FBQ0QsT0FGd0IsRUFFdEIsSUFGc0IsQ0FBekI7QUFHRCxLQU5ELE1BTU87QUFDTEQsTUFBQUEsWUFBWSxDQUFDL1YsWUFBRCxDQUFaO0FBQ0EsV0FBSzZNLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFdBQUs1SixtQkFBTCxDQUF5QlMsU0FBekIsQ0FBbUNWLE1BQW5DLEdBQTRDLHlEQUE1QztBQUNBLFdBQUtDLG1CQUFMLENBQXlCVSxXQUF6QixDQUFxQ3FKLE1BQXJDLEdBQThDLElBQTlDO0FBQ0Q7QUFDRixHQTd6QjhCO0FBK3pCL0JnSixFQUFBQSx1QkFBdUIsRUFBRSxtQ0FBWTtBQUNuQyxTQUFLL1MsbUJBQUwsQ0FBeUJJLGVBQXpCLENBQXlDTCxNQUF6QyxHQUFrRCxPQUFPNUUsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRWpTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ec0gsYUFBcEQsRUFBbkUsRUFBd0lwRyxJQUFqTTtBQUNELEdBajBCOEI7QUFtMEIvQm9ILEVBQUFBLHFDQUFxQyxFQUFFLCtDQUFVdEUsTUFBVixFQUFrQjtBQUN2RDtBQUNBbkosSUFBQUEsbUJBQW1CLEdBQUdtSixNQUF0QjtBQUNELEdBdDBCOEI7QUF3MEIvQnVFLEVBQUFBLHNDQUFzQyxFQUFFLGtEQUFZO0FBQ2xELFFBQUkxTixtQkFBbUIsSUFBSSxFQUF2QixJQUE2QkEsbUJBQW1CLElBQUksSUFBeEQsRUFBOEQ7QUFDNUQsV0FBSzBHLFNBQUwsQ0FBZSx5QkFBZjtBQUNELEtBRkQsTUFFTztBQUNMLFVBQUlpSCxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBLFdBQUttQixlQUFMLEdBQXVCMUgsUUFBUSxDQUFDbEcsbUJBQUQsQ0FBL0I7QUFDQXNHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZM1Esd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBN0YsRUFISyxDQUtMOztBQUNBLFVBQUl6USx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ0SCxJQUFqRixJQUF5RixLQUFLdUgsZUFBbEcsRUFBbUg7QUFDakhoWSxRQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ0SCxJQUFqRixHQUF3RnpRLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnRILElBQWpGLEdBQXdGLEtBQUt1SCxlQUFyTDtBQUNBaFksUUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGRSxlQUFqRixHQUFtR2pZLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRkUsZUFBakYsR0FBbUcsS0FBS0QsZUFBM007QUFDQSxhQUFLbEgsU0FBTCxDQUNFLDBDQUEwQzlRLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRkUsZUFBM0gsR0FBNkksd0JBQTdJLEdBQXdLalksd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBelAsR0FBZ1EsR0FEbFEsRUFFRW5QLGVBRkY7QUFJQSxhQUFLc1csdUJBQUwsR0FQaUgsQ0FTakg7O0FBQ0EsYUFBSy9TLG1CQUFMLENBQXlCQyxnQkFBekIsQ0FBMENGLE1BQTFDLEdBQW1ELEVBQW5EO0FBQ0F3RixRQUFBQSxtQkFBbUIsR0FBRyxFQUF0QjtBQUNELE9BWkQsTUFZTztBQUNMLGFBQUswRyxTQUFMLENBQWUsOEJBQWYsRUFESyxDQUdMOztBQUNBLGFBQUtqTSxtQkFBTCxDQUF5QkMsZ0JBQXpCLENBQTBDRixNQUExQyxHQUFtRCxFQUFuRDtBQUNBd0YsUUFBQUEsbUJBQW1CLEdBQUcsRUFBdEI7QUFDRDtBQUNGO0FBQ0YsR0FyMkI4QjtBQXUyQi9COE4sRUFBQUEsd0NBQXdDLEVBQUUsb0RBQVk7QUFDcEQ7QUFDQSxRQUFJSCxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBLFFBQUk3Vyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZJLFlBQXJGLEVBQW1HO0FBQ2pHLFdBQUtySCxTQUFMLENBQWUsa0NBQWY7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFJOVEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBakYsSUFBeUYsSUFBN0YsRUFBbUc7QUFDakd6USxRQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZJLFlBQWpGLEdBQWdHLElBQWhHO0FBQ0E5TixRQUFBQSxnQkFBZ0IsR0FBRyxJQUFuQjtBQUNBcUcsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl0RyxnQkFBWjtBQUNBckssUUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBakYsR0FBd0Z6USx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ0SCxJQUFqRixHQUF3RixJQUFoTDtBQUNBLGFBQUtLLFNBQUwsQ0FBZSw4REFBOEQ5USx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ0SCxJQUEvSSxHQUFzSixHQUFySyxFQUEwS25QLGVBQTFLO0FBQ0EsYUFBS3NXLHVCQUFMO0FBQ0QsT0FQRCxNQU9PO0FBQ0wsYUFBSzlHLFNBQUwsQ0FBZSxxREFBZjtBQUNEO0FBQ0Y7QUFDRixHQXgzQjhCO0FBMDNCL0JzSCxFQUFBQSxpREExM0IrQiw2REEwM0JtQkMsS0ExM0JuQixFQTAzQjBCO0FBQ3ZEMU4sSUFBQUEsWUFBWSxHQUFHME4sS0FBZjtBQUNELEdBNTNCOEI7QUE2M0IvQkMsRUFBQUEsa0NBQWtDLEVBQUUsNENBQVVyRSxLQUFWLEVBQXdCNUMsb0JBQXhCLEVBQXNEQyxVQUF0RCxFQUFzRUMsNEJBQXRFLEVBQTRHO0FBQUE7O0FBQUEsUUFBbEcwQyxLQUFrRztBQUFsR0EsTUFBQUEsS0FBa0csR0FBMUYsSUFBMEY7QUFBQTs7QUFBQSxRQUFwRjVDLG9CQUFvRjtBQUFwRkEsTUFBQUEsb0JBQW9GLEdBQTdELEtBQTZEO0FBQUE7O0FBQUEsUUFBdERDLFVBQXNEO0FBQXREQSxNQUFBQSxVQUFzRCxHQUF6QyxDQUF5QztBQUFBOztBQUFBLFFBQXRDQyw0QkFBc0M7QUFBdENBLE1BQUFBLDRCQUFzQyxHQUFQLEtBQU87QUFBQTs7QUFDOUk7QUFDQWIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7QUFFQTNQLElBQUFBLDhCQUE4QixHQUFHcVEsb0JBQWpDO0FBQ0FwUSxJQUFBQSxpQkFBaUIsR0FBR3FRLFVBQXBCO0FBQ0FwUSxJQUFBQSwyQkFBMkIsR0FBR3FRLDRCQUE5QjtBQUVBLFNBQUsxTSxtQkFBTCxDQUF5Qkssa0JBQXpCLENBQTRDMEosTUFBNUMsR0FBcUQsSUFBckQ7QUFDQSxRQUFJMkosZUFBZSxHQUFHdlksd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RpSiwyQ0FBcEQsQ0FBZ0d4WCw4QkFBaEcsRUFBZ0lDLGlCQUFoSSxFQUFtSkMsMkJBQW5KLENBQXRCOztBQUVBLFFBQUlxWCxlQUFlLElBQUksQ0FBdkIsRUFBMEI7QUFDeEIsV0FBS3pILFNBQUwsQ0FBZSxrREFBZjtBQUNBeEIsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixRQUFBLE1BQUksQ0FBQ3pLLG1CQUFMLENBQXlCSyxrQkFBekIsQ0FBNEMwSixNQUE1QyxHQUFxRCxLQUFyRDtBQUNELE9BRlMsRUFFUCxJQUZPLENBQVY7QUFHRDtBQUNGLEdBOTRCOEI7QUFnNUIvQjZKLEVBQUFBLHNDQUFzQyxFQUFFLGtEQUFZO0FBQ2xELFFBQUksQ0FBQ3pYLDhCQUFMLEVBQXFDO0FBQ25DLFdBQUs0Vyx1QkFBTDtBQUNBLFdBQUtuSyxlQUFMO0FBQ0E5QyxNQUFBQSxZQUFZLEdBQUcsRUFBZjtBQUNBK0YsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNkJBQVo7QUFDQTNRLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUoscUJBQXBEO0FBQ0EsV0FBSzdULG1CQUFMLENBQXlCSyxrQkFBekIsQ0FBNEMwSixNQUE1QyxHQUFxRCxLQUFyRDtBQUNELEtBUEQsTUFPTztBQUNMLFdBQUtuQixlQUFMO0FBQ0E5QyxNQUFBQSxZQUFZLEdBQUcsRUFBZjtBQUNBK0YsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNkJBQVo7QUFDQTNRLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUoscUJBQXBEO0FBQ0EsV0FBSzdULG1CQUFMLENBQXlCSyxrQkFBekIsQ0FBNEMwSixNQUE1QyxHQUFxRCxLQUFyRDtBQUNBNU4sTUFBQUEsOEJBQThCLEdBQUcsS0FBakM7QUFDQUMsTUFBQUEsaUJBQWlCLEdBQUcsQ0FBcEI7QUFDQUMsTUFBQUEsMkJBQTJCLEdBQUcsS0FBOUI7QUFDQWxCLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ea0gsZ0JBQXBEO0FBQ0Q7QUFDRixHQW42QjhCO0FBcTZCL0JrQyxFQUFBQSx1Q0FBdUMsRUFBRSxtREFBWTtBQUNuRGpJLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaO0FBQ0EsU0FBS0ksOEJBQUwsQ0FBb0MsS0FBcEMsRUFBMkMsSUFBM0M7QUFDRCxHQXg2QjhCO0FBMDZCL0I2SCxFQUFBQSxnQ0FBZ0MsRUFBRSwwQ0FBVXJGLE1BQVYsRUFBa0I7QUFDbEQ7QUFDQWpKLElBQUFBLGNBQWMsR0FBR2lKLE1BQWpCO0FBQ0QsR0E3NkI4QjtBQSs2Qi9Cc0YsRUFBQUEsOEJBQThCLEVBQUUsMENBQVk7QUFDMUMsUUFBSSxDQUFDLEtBQUt4TCxZQUFWLEVBQXdCO0FBQ3RCLFdBQUtBLFlBQUwsR0FBb0IsSUFBcEI7QUFDQTlDLE1BQUFBLGtCQUFrQixHQUFHLEVBQXJCO0FBQ0EsV0FBS3VPLGlDQUFMLENBQXVDLElBQXZDO0FBQ0EsV0FBS3ZOLGlCQUFMLENBQXVCakYsV0FBdkIsR0FBcUNkLFVBQVUsQ0FBQ0UsVUFBaEQ7QUFDQStFLE1BQUFBLFVBQVUsR0FBR3pLLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ed0osWUFBcEQsRUFBYjtBQUNBck8sTUFBQUEsV0FBVyxHQUFHRCxVQUFVLEdBQUcsSUFBM0I7QUFFQSxXQUFLdU8scUJBQUwsQ0FBMkIsZ0JBQTNCLEVBQTZDdk8sVUFBN0MsRUFBeUQsOEJBQXpELEVBQXlGQyxXQUFXLEdBQUcsUUFBdkcsRUFBaUgsbURBQWpILEVBQXNLLHNCQUF0SyxFQUE4TEEsV0FBVyxHQUFHLE1BQTVNLEVBQW9OLEtBQXBOLEVBQTJOLEtBQUthLGlCQUFMLENBQXVCakYsV0FBbFA7QUFDRCxLQVRELE1BU087QUFDTCxXQUFLd0ssU0FBTCxDQUFlLDhDQUFmO0FBQ0Q7QUFDRixHQTU3QjhCO0FBODdCL0JtSSxFQUFBQSx1Q0FBdUMsRUFBRSxpREFBVXJXLElBQVYsRUFBZ0I7QUFDdkQ0SCxJQUFBQSxpQkFBaUIsR0FBRzVILElBQXBCO0FBQ0QsR0FoOEI4QjtBQWs4Qi9Cc1csRUFBQUEsK0JBQStCLEVBQUUseUNBQVVqRixLQUFWLEVBQXdCa0YsV0FBeEIsRUFBNkM7QUFBQSxRQUFuQ2xGLEtBQW1DO0FBQW5DQSxNQUFBQSxLQUFtQyxHQUEzQixJQUEyQjtBQUFBOztBQUFBLFFBQXJCa0YsV0FBcUI7QUFBckJBLE1BQUFBLFdBQXFCLEdBQVAsS0FBTztBQUFBOztBQUM1RXBZLElBQUFBLGlCQUFpQixHQUFHb1ksV0FBcEI7QUFFQXpJLElBQUFBLE9BQU8sQ0FBQ3lHLEtBQVIsQ0FBY2dDLFdBQWQ7QUFFQSxRQUFJcFksaUJBQUosRUFBdUJ5SixpQkFBaUIsR0FBRyxtQkFBcEI7O0FBRXZCLFFBQUksQ0FBQyxLQUFLK0MsYUFBTixJQUF1QnhNLGlCQUEzQixFQUE4QztBQUM1QyxVQUFJZ1gsWUFBWSxHQUFHL1gsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RzSCxhQUFwRCxFQUFuQjs7QUFDQSxVQUFJck0saUJBQWlCLElBQUksRUFBekIsRUFBNkI7QUFDM0IsYUFBSzRPLDJCQUFMO0FBQ0EsYUFBS3RJLFNBQUwsQ0FBZSx5Q0FBZjtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUt2RCxhQUFMLEdBQXFCLElBQXJCO0FBQ0FoRCxRQUFBQSxrQkFBa0IsR0FBRyxFQUFyQjtBQUNBLGFBQUt1TyxpQ0FBTCxDQUF1QyxJQUF2QztBQUNBLGFBQUt2TixpQkFBTCxDQUF1QmpGLFdBQXZCLEdBQXFDZCxVQUFVLENBQUNDLFdBQWhEO0FBRUEsWUFBSSxDQUFDMUUsaUJBQUwsRUFBd0IwSixVQUFVLEdBQUd6Syx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHdKLFlBQXBELEVBQWIsQ0FBeEIsS0FDS3RPLFVBQVUsR0FBR3pLLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EOEosV0FBcEQsRUFBYjtBQUVMM08sUUFBQUEsV0FBVyxHQUFHRCxVQUFVLEdBQUcsSUFBM0I7QUFFQSxhQUFLdU8scUJBQUwsQ0FBMkIsaUJBQTNCLEVBQThDdk8sVUFBOUMsRUFBMEQsK0JBQTFELEVBQTJGQyxXQUFXLEdBQUcsUUFBekcsRUFBbUgscURBQW5ILEVBQTBLLHNCQUExSyxFQUFrTUEsV0FBVyxHQUFHLE1BQWhOLEVBQXdOLEtBQXhOLEVBQStOLEtBQUthLGlCQUFMLENBQXVCakYsV0FBdFA7QUFDRDtBQUNGLEtBbEJELE1Ba0JPO0FBQ0wsV0FBS3dLLFNBQUwsQ0FBZSxnREFBZjtBQUNEO0FBQ0YsR0E5OUI4QjtBQWcrQi9Cd0ksRUFBQUEsOEJBQThCLEVBQUUsMENBQVk7QUFDMUMsUUFBSSxDQUFDLEtBQUtoTSxRQUFWLEVBQW9CO0FBQ2xCLFVBQUl5SyxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBLFVBQUk3Vyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ3QixTQUFqRixHQUE2RixDQUFqRyxFQUFvRztBQUNsRyxhQUFLak0sUUFBTCxHQUFnQixJQUFoQjtBQUNBL0MsUUFBQUEsa0JBQWtCLEdBQUcsRUFBckI7QUFDQSxhQUFLdU8saUNBQUwsQ0FBdUMsSUFBdkM7QUFDQSxhQUFLdk4saUJBQUwsQ0FBdUJqRixXQUF2QixHQUFxQ2QsVUFBVSxDQUFDSSxRQUFoRDtBQUNBNkUsUUFBQUEsVUFBVSxHQUFHekssd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R3SixZQUFwRCxFQUFiO0FBQ0FyTyxRQUFBQSxXQUFXLEdBQUdELFVBQVUsR0FBRyxJQUEzQjtBQUVBLGFBQUt1TyxxQkFBTCxDQUEyQixXQUEzQixFQUF3Q3ZPLFVBQXhDLEVBQW9ELDhCQUFwRCxFQUFvRkMsV0FBVyxHQUFHLFFBQWxHLEVBQTRHLG9EQUE1RyxFQUFrSyx1QkFBbEssRUFBMkxBLFdBQVcsR0FBRyxNQUF6TSxFQUFpTixNQUFqTixFQUF5TixLQUFLYSxpQkFBTCxDQUF1QmpGLFdBQWhQO0FBQ0QsT0FURCxNQVNPO0FBQ0wsYUFBS3dLLFNBQUwsQ0FBZSwwREFBZjtBQUNEO0FBQ0YsS0FkRCxNQWNPO0FBQ0wsV0FBS0EsU0FBTCxDQUFlLHlDQUFmO0FBQ0Q7QUFDRixHQWwvQjhCO0FBby9CL0IwSSxFQUFBQSwrQkFBK0IsRUFBRSwyQ0FBWTtBQUMzQyxRQUFJLENBQUMsS0FBS2hNLFNBQVYsRUFBcUI7QUFDbkIsVUFBSXVLLFlBQVksR0FBRy9YLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ec0gsYUFBcEQsRUFBbkI7O0FBQ0EsVUFBSTdXLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRjBCLFVBQWpGLEdBQThGLENBQWxHLEVBQXFHO0FBQ25HLGFBQUtqTSxTQUFMLEdBQWlCLElBQWpCO0FBQ0FqRCxRQUFBQSxrQkFBa0IsR0FBRyxFQUFyQjtBQUNBLGFBQUt1TyxpQ0FBTCxDQUF1QyxJQUF2QztBQUNBLGFBQUt2TixpQkFBTCxDQUF1QmpGLFdBQXZCLEdBQXFDZCxVQUFVLENBQUNHLFNBQWhEO0FBQ0E4RSxRQUFBQSxVQUFVLEdBQUd6Syx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHdKLFlBQXBELEVBQWI7QUFDQXJPLFFBQUFBLFdBQVcsR0FBR0QsVUFBVSxHQUFHLElBQTNCO0FBRUEsYUFBS3VPLHFCQUFMLENBQTJCLFlBQTNCLEVBQXlDdk8sVUFBekMsRUFBcUQsK0JBQXJELEVBQXNGQyxXQUFXLEdBQUcsUUFBcEcsRUFBOEcsc0RBQTlHLEVBQXNLLHVCQUF0SyxFQUErTEEsV0FBVyxHQUFHLE1BQTdNLEVBQXFOLE1BQXJOLEVBQTZOLEtBQUthLGlCQUFMLENBQXVCakYsV0FBcFA7QUFDRCxPQVRELE1BU087QUFDTCxhQUFLd0ssU0FBTCxDQUFlLHFEQUFmO0FBQ0Q7QUFDRixLQWRELE1BY087QUFDTCxXQUFLQSxTQUFMLENBQWUsMkNBQWY7QUFDRDtBQUNGLEdBdGdDOEI7QUF3Z0MvQjRJLEVBQUFBLGlDQUFpQyxFQUFFLDZDQUFZO0FBQzdDaEosSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVosRUFENkMsQ0FFN0M7QUFDQTs7QUFDQSxTQUFLZ0osa0NBQUw7QUFDRCxHQTdnQzhCO0FBK2dDL0JDLEVBQUFBLDhCQUE4QixFQUFFLDBDQUFZO0FBQzFDbEosSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWjtBQUNBLFNBQUswRywyQkFBTCxDQUFpQyxLQUFqQztBQUNBclgsSUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RzSyxRQUFwRDtBQUNELEdBbmhDOEI7QUFxaEMvQkMsRUFBQUEsMkJBQTJCLEVBQUUscUNBQVVDLEtBQVYsRUFBaUIsQ0FDNUM7QUFDRCxHQXZoQzhCO0FBd2hDL0I7QUFFQTtBQUNBQyxFQUFBQSw2QkEzaEMrQix5Q0EyaENEckwsTUEzaENDLEVBMmhDTztBQUNwQyxTQUFLOUMsa0JBQUwsQ0FBd0I5QyxVQUF4QixDQUFtQzZGLE1BQW5DLEdBQTRDRCxNQUE1QztBQUNELEdBN2hDOEI7QUEraEMvQnNMLEVBQUFBLG9DQS9oQytCLGdEQStoQ010TCxNQS9oQ04sRUEraENjO0FBQzNDLFNBQUs5QyxrQkFBTCxDQUF3Qi9DLG1CQUF4QixDQUE0QzhGLE1BQTVDLEdBQXFERCxNQUFyRDtBQUNELEdBamlDOEI7QUFtaUMvQnVMLEVBQUFBLHFDQW5pQytCLGlEQW1pQ092TCxNQW5pQ1AsRUFtaUNlO0FBQzVDLFNBQUs5QyxrQkFBTCxDQUF3QnpDLGNBQXhCLENBQXVDd0YsTUFBdkMsR0FBZ0RELE1BQWhEO0FBQ0QsR0FyaUM4QjtBQXVpQy9CZ0wsRUFBQUEsa0NBdmlDK0IsZ0RBdWlDTTtBQUNuQ25aLElBQUFBLFdBQVcsR0FBRyxFQUFkO0FBQ0EsU0FBSzJaLHNCQUFMOztBQUNBLFFBQUlDLFFBQVEsR0FBR3BhLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsUUFBSXdJLFlBQVksR0FBR3FDLFFBQVEsQ0FBQ3ZELGFBQVQsRUFBbkI7O0FBQ0EsUUFBSXdELFNBQVMsR0FBR0QsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLENBQWhCO0FBQ0EsU0FBS2lDLDZCQUFMLENBQW1DLElBQW5DO0FBQ0EsU0FBS25PLGtCQUFMLENBQXdCNUMsVUFBeEIsQ0FBbUNyRSxNQUFuQyxHQUE0Q3lWLFNBQVMsQ0FBQ3BSLFVBQXREO0FBQ0EsU0FBSzRDLGtCQUFMLENBQXdCM0MsVUFBeEIsQ0FBbUN0RSxNQUFuQyxHQUE0QyxNQUFNeVYsU0FBUyxDQUFDNUosSUFBNUQ7O0FBRUEsU0FBSyxJQUFJdUIsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdxSSxTQUFTLENBQUMxRyxZQUFWLENBQXVCekIsTUFBbkQsRUFBMkRGLEtBQUssRUFBaEUsRUFBb0U7QUFDbEUsVUFBSXNJLElBQUksR0FBR3JZLEVBQUUsQ0FBQ3NZLFdBQUgsQ0FBZSxLQUFLMU8sa0JBQUwsQ0FBd0IxQyxpQkFBdkMsQ0FBWDtBQUNBbVIsTUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBSzNPLGtCQUFMLENBQXdCdkQsYUFBdEM7QUFDQWdTLE1BQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DdEcsZUFBcEM7QUFDQTZNLE1BQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DMEcsT0FBcEMsQ0FBNENKLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QmlCLFlBQTFFO0FBQ0FxSCxNQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQzJHLE9BQXBDLENBQTRDTCxTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJlLHVCQUExRTtBQUNBdUgsTUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0M0RyxnQkFBcEMsQ0FBcUQzSSxLQUFyRDtBQUVBLFVBQUk0SSxlQUFlLEdBQUdQLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QjZJLGFBQTlCLENBQTRDM0ksTUFBbEU7O0FBRUEsVUFBSTVCLFFBQVEsQ0FBQytKLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QkgsWUFBL0IsQ0FBUixJQUF3RCxDQUE1RCxFQUErRDtBQUM3RHlJLFFBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DK0csZUFBcEMsQ0FBb0QsQ0FBcEQ7QUFDQVIsUUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NnSCxPQUFwQyxDQUE0QyxZQUE1QztBQUNBVCxRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ2lILGdCQUFwQyxDQUFxRCxLQUFyRDtBQUNBVixRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ2tILHFCQUFwQyxDQUEwRCxLQUExRDtBQUNELE9BTEQsTUFLTyxJQUFJM0ssUUFBUSxDQUFDK0osU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCSCxZQUEvQixDQUFSLElBQXdELENBQTVELEVBQStEO0FBQ3BFeUksUUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MrRyxlQUFwQyxDQUFvRCxDQUFwRDtBQUNBUixRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ2dILE9BQXBDLENBQTRDLGdCQUE1Qzs7QUFDQSxZQUFJRyxtQkFBbUIsR0FBR04sZUFBZSxHQUFHLEtBQTVDOztBQUNBLFlBQUlPLFlBQVksR0FBRyxRQUFRRCxtQkFBM0I7O0FBQ0FaLFFBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DaUgsZ0JBQXBDLENBQXFERyxZQUFyRDtBQUNBYixRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ2tILHFCQUFwQyxDQUEwREUsWUFBMUQ7QUFDRDs7QUFFRGIsTUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NxSCxVQUFwQyxDQUErQ2YsU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCOU4sVUFBN0U7QUFDQW9XLE1BQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9Dc0gsWUFBcEMsQ0FBaURoQixTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEI2SSxhQUE5QixDQUE0QzNJLE1BQTdGOztBQUVBLFVBQUltSSxTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJzSixhQUE5QixJQUErQyxJQUFuRCxFQUF5RDtBQUN2RGhCLFFBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9Dd0gsdUJBQXBDLENBQTRELEtBQTVEO0FBQ0FqQixRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ3lILGNBQXBDLENBQW1EbkIsU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCeUosV0FBakY7QUFDRCxPQUhELE1BR087QUFDTG5CLFFBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9Dd0gsdUJBQXBDLENBQTRELElBQTVEO0FBQ0FqQixRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ3lILGNBQXBDLENBQW1ELE1BQW5EO0FBQ0Q7O0FBRURwYixNQUFBQSw4QkFBOEIsQ0FBQ2lWLElBQS9CLENBQW9DaUYsSUFBcEM7QUFDRDtBQUNGLEdBdGxDOEI7QUF3bEMvQm9CLEVBQUFBLDBDQXhsQytCLHNEQXdsQ1lDLElBeGxDWixFQXdsQ2tCO0FBQy9DLFFBQUl2QixRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl3SSxZQUFZLEdBQUdxQyxRQUFRLENBQUN2RCxhQUFULEVBQW5COztBQUNBLFFBQUl3RCxTQUFTLEdBQUdyYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOER1RyxXQUE5RCxHQUE0RWtHLGdCQUE1RSxDQUE2RkMsaUJBQTdHO0FBQ0EsU0FBSzNCLHFDQUFMLENBQTJDLElBQTNDO0FBQ0EsU0FBS3JPLGtCQUFMLENBQXdCeEMsa0JBQXhCLENBQTJDekUsTUFBM0MsR0FBb0R5VixTQUFTLENBQUNwUixVQUE5RDtBQUNBLFNBQUs0QyxrQkFBTCxDQUF3QnZDLGtCQUF4QixDQUEyQzFFLE1BQTNDLEdBQW9ELE1BQU15VixTQUFTLENBQUM1SixJQUFwRTtBQUNBLFNBQUs1RSxrQkFBTCxDQUF3QnRDLG1CQUF4QixDQUE0QzNFLE1BQTVDLEdBQXFEK1csSUFBckQ7QUFDRCxHQWhtQzhCO0FBa21DL0JHLEVBQUFBLHFCQWxtQytCLG1DQWttQ1A7QUFDdEIsU0FBSzNCLHNCQUFMO0FBQ0EsU0FBS0gsNkJBQUwsQ0FBbUMsS0FBbkM7QUFDRCxHQXJtQzhCO0FBdW1DL0JHLEVBQUFBLHNCQXZtQytCLG9DQXVtQ047QUFDdkIsU0FBSyxJQUFJbkksS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUc1Uiw4QkFBOEIsQ0FBQzhSLE1BQTNELEVBQW1FRixLQUFLLEVBQXhFLEVBQTRFO0FBQzFFNVIsTUFBQUEsOEJBQThCLENBQUM0UixLQUFELENBQTlCLENBQXNDK0osT0FBdEM7QUFDRDs7QUFDRDNiLElBQUFBLDhCQUE4QixHQUFHLEVBQWpDO0FBQ0QsR0E1bUM4QjtBQThtQy9CNGIsRUFBQUEsNkJBOW1DK0IseUNBOG1DRG5ILEtBOW1DQyxFQThtQ007QUFDbkN0VSxJQUFBQSx3QkFBd0IsR0FBRyxJQUEzQjtBQUNBRCxJQUFBQSxlQUFlLEdBQUd1VSxLQUFsQjs7QUFDQSxRQUFJb0gsTUFBTSxHQUFHamMsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEdUcsV0FBOUQsRUFBYjs7QUFDQSxRQUFJd0csS0FBSyxHQUFHckgsS0FBSyxDQUFDaUMsSUFBTixDQUFXcUYsSUFBdkI7QUFDQSxRQUFJQyxXQUFXLEdBQUd2SCxLQUFLLENBQUNpQyxJQUFOLENBQVdyRixVQUE3QjtBQUNBLFFBQUk0SyxzQkFBc0IsR0FBR3hILEtBQUssQ0FBQ2lDLElBQU4sQ0FBV3dGLHNCQUF4QztBQUNBLFFBQUlDLGNBQWMsR0FBRzFILEtBQUssQ0FBQ2lDLElBQU4sQ0FBVzBGLFFBQWhDOztBQUNBLFFBQUlDLFVBQVUsR0FBR0YsY0FBYyxHQUFHLENBQWxDOztBQUNBLFFBQUlHLGFBQWEsR0FBRyxFQUFwQjtBQUVBLFFBQUlOLFdBQVcsQ0FBQ3pJLFlBQVosQ0FBeUIwSSxzQkFBekIsRUFBaUR4SyxZQUFqRCxJQUFpRSxDQUFyRSxFQUF3RTZLLGFBQWEsR0FBRyxZQUFoQixDQUF4RSxLQUNLLElBQUlOLFdBQVcsQ0FBQ3pJLFlBQVosQ0FBeUIwSSxzQkFBekIsRUFBaUR4SyxZQUFqRCxJQUFpRSxDQUFyRSxFQUF3RTZLLGFBQWEsR0FBRyxnQkFBaEI7O0FBRTdFLFFBQUkxYyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOER3TixhQUE5RCxNQUFpRixLQUFyRixFQUE0RjtBQUMxRixVQUFJaEIsSUFBSSxHQUNOLDRDQUNBUyxXQUFXLENBQUNuVCxVQURaLEdBRUEsNENBRkEsR0FHQSxJQUhBLEdBSUEsSUFKQSxHQUtBLGlCQUxBLEdBTUFtVCxXQUFXLENBQUN6SSxZQUFaLENBQXlCMEksc0JBQXpCLEVBQWlEcEosWUFOakQsR0FPQSxJQVBBLEdBUUEsaUJBUkEsR0FTQXlKLGFBVEEsR0FVQSxJQVZBLEdBV0EsbUJBWEEsR0FZQUgsY0FaQSxHQWFBLElBYkEsR0FjQSxpQkFkQSxHQWVBRSxVQWZBLEdBZ0JBLElBaEJBLEdBaUJBLElBakJBLEdBa0JBLHVJQW5CRjs7QUFxQkEsV0FBS2YsMENBQUwsQ0FBZ0RDLElBQWhEO0FBQ0Q7QUFDRixHQXBwQzhCO0FBc3BDL0JpQixFQUFBQSw0QkF0cEMrQiwwQ0FzcENBO0FBQzdCLFFBQUl4QyxRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUlzTixVQUFVLEdBQUc3Yyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOEQyTixVQUE5RCxFQUFqQjs7QUFDQSxRQUFJYixNQUFNLEdBQUdqYyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOER1RyxXQUE5RCxHQUE0RWtHLGdCQUE1RSxDQUE2RkMsaUJBQTFHO0FBQ0EsUUFBSWhILEtBQUssR0FBR3ZVLGVBQVo7QUFDQSxRQUFJNGIsS0FBSyxHQUFHckgsS0FBSyxDQUFDaUMsSUFBTixDQUFXcUYsSUFBdkI7QUFDQSxRQUFJQyxXQUFXLEdBQUd2SCxLQUFLLENBQUNpQyxJQUFOLENBQVdyRixVQUE3QjtBQUNBLFFBQUk0SyxzQkFBc0IsR0FBR3hILEtBQUssQ0FBQ2lDLElBQU4sQ0FBV3dGLHNCQUF4QztBQUNBLFFBQUlDLGNBQWMsR0FBRzFILEtBQUssQ0FBQ2lDLElBQU4sQ0FBVzBGLFFBQWhDOztBQUNBLFFBQUlDLFVBQVUsR0FBR0YsY0FBYyxHQUFHLENBQWxDOztBQUNBLFFBQUlHLGFBQWEsR0FBRyxFQUFwQjs7QUFFQSxRQUFJSyxPQUFPLEdBQUczQyxRQUFRLENBQUM0QyxVQUFULEVBQWQ7O0FBRUEsUUFBSXpjLHdCQUF3QixJQUFJLElBQWhDLEVBQXNDO0FBQ3BDLFVBQUk2WixRQUFRLENBQUNuSSxjQUFULENBQXdCOEssT0FBeEIsRUFBaUN0TSxJQUFqQyxJQUF5Q2dNLFVBQTdDLEVBQXlEO0FBQ3ZEckMsUUFBQUEsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhLLE9BQXhCLEVBQWlDdE0sSUFBakMsSUFBeUNnTSxVQUF6QztBQUNBemMsUUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEdUcsV0FBOUQsR0FBNEVPLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUhtRSxRQUFRLENBQUNuSSxjQUFULENBQXdCOEssT0FBeEIsQ0FBbkg7QUFDQSxhQUFLRSx5Q0FBTCxDQUErQyxJQUEvQyxFQUFxRFIsVUFBckQsRUFBaUUsS0FBakUsRUFBd0VyQyxRQUFRLENBQUNuSSxjQUFULENBQXdCOEssT0FBeEIsRUFBaUMzSyxTQUF6RyxFQUFvSGdJLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4SyxPQUF4QixDQUFwSCxFQUFzSlYsc0JBQXRKO0FBQ0EsYUFBS25DLHFDQUFMLENBQTJDLEtBQTNDO0FBQ0EsYUFBS3BKLFNBQUwsQ0FBZSx3REFBZjtBQUNELE9BTkQsTUFNTztBQUNMLGFBQUtBLFNBQUwsQ0FBZSxrQkFBZjtBQUNEO0FBQ0YsS0FWRCxNQVVPO0FBQ0wsV0FBS0EsU0FBTCxDQUFlLDBDQUFmO0FBQ0EsV0FBS29KLHFDQUFMLENBQTJDLEtBQTNDO0FBQ0Q7QUFDRixHQWxyQzhCO0FBb3JDL0JnRCxFQUFBQSw0QkFwckMrQiwwQ0FvckNBO0FBQzdCLFFBQUk5QyxRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUlzRixLQUFLLEdBQUd2VSxlQUFaO0FBQ0EsUUFBSStiLHNCQUFzQixHQUFHeEgsS0FBSyxDQUFDaUMsSUFBTixDQUFXd0Ysc0JBQXhDOztBQUNBLFFBQUlTLE9BQU8sR0FBRzNDLFFBQVEsQ0FBQzRDLFVBQVQsRUFBZDs7QUFDQXRNLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZeUosUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhLLE9BQXhCLEVBQWlDM0ssU0FBN0M7O0FBQ0EsUUFBSTdSLHdCQUF3QixJQUFJLElBQWhDLEVBQXNDO0FBQ3BDLFdBQUswYyx5Q0FBTCxDQUErQyxLQUEvQyxFQUFzRCxDQUF0RCxFQUF5RCxJQUF6RCxFQUErRDdDLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4SyxPQUF4QixFQUFpQzNLLFNBQWhHLEVBQTJHZ0ksUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhLLE9BQXhCLENBQTNHLEVBQTZJVixzQkFBN0k7QUFDQSxXQUFLbkMscUNBQUwsQ0FBMkMsS0FBM0M7QUFDQSxXQUFLcEosU0FBTCxDQUFlLCtCQUFmO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsV0FBS29KLHFDQUFMLENBQTJDLEtBQTNDO0FBQ0EsV0FBS3BKLFNBQUwsQ0FBZSwrQkFBZjtBQUNEO0FBQ0YsR0Fsc0M4QjtBQW9zQy9CbU0sRUFBQUEseUNBcHNDK0IscURBb3NDV0UsV0Fwc0NYLEVBb3NDZ0NDLFFBcHNDaEMsRUFvc0M4Q0MsWUFwc0M5QyxFQW9zQ29FQyxJQXBzQ3BFLEVBb3NDK0V6SSxLQXBzQy9FLEVBb3NDNkZuQixjQXBzQzdGLEVBb3NDaUg7QUFBQSxRQUF0R3lKLFdBQXNHO0FBQXRHQSxNQUFBQSxXQUFzRyxHQUF4RixLQUF3RjtBQUFBOztBQUFBLFFBQWpGQyxRQUFpRjtBQUFqRkEsTUFBQUEsUUFBaUYsR0FBdEUsQ0FBc0U7QUFBQTs7QUFBQSxRQUFuRUMsWUFBbUU7QUFBbkVBLE1BQUFBLFlBQW1FLEdBQXBELEtBQW9EO0FBQUE7O0FBQUEsUUFBN0NDLElBQTZDO0FBQTdDQSxNQUFBQSxJQUE2QyxHQUF0QyxFQUFzQztBQUFBOztBQUFBLFFBQWxDekksS0FBa0M7QUFBbENBLE1BQUFBLEtBQWtDLEdBQTFCLElBQTBCO0FBQUE7O0FBQUEsUUFBcEJuQixjQUFvQjtBQUFwQkEsTUFBQUEsY0FBb0IsR0FBSCxDQUFHO0FBQUE7O0FBQzlJLFFBQUk2SixTQUFTLEdBQUc7QUFBRXpHLE1BQUFBLElBQUksRUFBRTtBQUFFMEcsUUFBQUEsUUFBUSxFQUFFTCxXQUFaO0FBQXlCTSxRQUFBQSxXQUFXLEVBQUVMLFFBQXRDO0FBQWdETSxRQUFBQSxTQUFTLEVBQUVMLFlBQTNEO0FBQXlFcEksUUFBQUEsUUFBUSxFQUFFcUksSUFBbkY7QUFBeUY3TCxRQUFBQSxVQUFVLEVBQUVvRCxLQUFyRztBQUE0RzhJLFFBQUFBLGFBQWEsRUFBRWpLO0FBQTNIO0FBQVIsS0FBaEI7QUFDQTFULElBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NRLDBCQUFsQyxHQUErRDRGLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFaUksU0FBOUU7QUFDRCxHQXZzQzhCO0FBeXNDL0JLLEVBQUFBLDJDQXpzQytCLHVEQXlzQ2EvSSxLQXpzQ2IsRUF5c0NvQjtBQUNqRCxRQUFJN1Usd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEd04sYUFBOUQsTUFBaUYsS0FBckYsRUFBNEY7QUFDMUYsVUFBSXZDLFFBQVEsR0FBR3BhLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsVUFBSXdJLFlBQVksR0FBR3FDLFFBQVEsQ0FBQ3ZELGFBQVQsRUFBbkI7O0FBRUFuRyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWtFLEtBQVo7QUFDQSxVQUFJZ0osU0FBUyxHQUFHaEosS0FBSyxDQUFDaUMsSUFBTixDQUFXMEcsUUFBM0I7QUFDQSxVQUFJTSxLQUFLLEdBQUdqSixLQUFLLENBQUNpQyxJQUFOLENBQVcyRyxXQUF2QjtBQUNBLFVBQUlNLFVBQVUsR0FBR2xKLEtBQUssQ0FBQ2lDLElBQU4sQ0FBVzRHLFNBQTVCO0FBQ0EsVUFBSU0sSUFBSSxHQUFHbkosS0FBSyxDQUFDaUMsSUFBTixDQUFXN0IsUUFBdEI7QUFDQSxVQUFJbUgsV0FBVyxHQUFHdkgsS0FBSyxDQUFDaUMsSUFBTixDQUFXckYsVUFBN0I7QUFDQSxVQUFJaUMsY0FBYyxHQUFHbUIsS0FBSyxDQUFDaUMsSUFBTixDQUFXNkcsYUFBaEM7QUFFQWpOLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaOztBQUNBLFVBQUl5SixRQUFRLENBQUNuSSxjQUFULENBQXdCOEYsWUFBeEIsRUFBc0MzRixTQUF0QyxJQUFtRHBTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RHVHLFdBQTlELEdBQTRFa0csZ0JBQTVFLENBQTZGOUUsSUFBN0YsQ0FBa0czRSxNQUF6SixFQUFpSztBQUMvSixZQUFJMEwsU0FBSixFQUFlO0FBQ2IsZUFBSzdELDZCQUFMLENBQW1DLEtBQW5DO0FBQ0EsZUFBS0Msb0NBQUwsQ0FBMEMsS0FBMUM7QUFDQUcsVUFBQUEsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDdEgsSUFBdEMsSUFBOENxTixLQUE5QztBQUNBMUQsVUFBQUEsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDcEUsWUFBdEMsQ0FBbURELGNBQW5ELEVBQW1FNEgsYUFBbkUsR0FBbUYsSUFBbkY7QUFDQWxCLFVBQUFBLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixFQUFzQ3BFLFlBQXRDLENBQW1ERCxjQUFuRCxFQUFtRXVLLFNBQW5FLEdBQStFRCxJQUEvRTtBQUNBNUQsVUFBQUEsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDcEUsWUFBdEMsQ0FBbURELGNBQW5ELEVBQW1FK0gsV0FBbkUsR0FBaUZXLFdBQVcsQ0FBQ25ULFVBQTdGO0FBQ0FqSixVQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOER1RyxXQUE5RCxHQUE0RU8saUJBQTVFLENBQThGLG1CQUE5RixFQUFtSG1FLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixDQUFuSDtBQUVBckgsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVo7QUFDQSxlQUFLRyxTQUFMLENBQWUsaURBQWlEc0wsV0FBVyxDQUFDblQsVUFBN0QsR0FBMEUsVUFBMUUsR0FBdUY2VSxLQUF2RixHQUErRixrQ0FBOUcsRUFBa0p4YyxlQUFsSjtBQUNBLGVBQUtzVyx1QkFBTDtBQUNELFNBWkQsTUFZTyxJQUFJbUcsVUFBSixFQUFnQjtBQUNyQixjQUFJdmQsV0FBVyxDQUFDMGQsUUFBWixDQUFxQkYsSUFBckIsS0FBOEIsS0FBbEMsRUFBeUN4ZCxXQUFXLENBQUM2VSxJQUFaLENBQWlCMkksSUFBakI7QUFFekN0TixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWW5RLFdBQVo7O0FBQ0EsY0FBSUEsV0FBVyxDQUFDMFIsTUFBWixJQUFzQmtJLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0JDLE1BQXhCLEdBQWlDLENBQTNELEVBQThEO0FBQzVELGlCQUFLOEgsNkJBQUwsQ0FBbUMsS0FBbkM7QUFDQSxpQkFBS0Msb0NBQUwsQ0FBMEMsS0FBMUM7QUFDQSxpQkFBS25KLFNBQUwsQ0FBZSwrREFBZjtBQUNEOztBQUVESixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtBQUNEO0FBQ0YsT0F6QkQsTUF5Qk87QUFDTCxZQUFJa04sU0FBSixFQUFlO0FBQ2J0ZCxVQUFBQSx3QkFBd0IsR0FBRyxLQUEzQjtBQUNBLGVBQUt1USxTQUFMLENBQWUsMENBQWY7QUFDQSxlQUFLb0oscUNBQUwsQ0FBMkMsS0FBM0M7QUFDRCxTQUpELE1BSU8sSUFBSTZELFVBQUosRUFBZ0IsQ0FDdEI7QUFDRjtBQUNGO0FBQ0YsR0F6dkM4QjtBQTB2Qy9CO0FBRUE7QUFFQUksRUFBQUEsY0E5dkMrQiw0QkE4dkNkO0FBQ2YsU0FBS3RaLG1CQUFMLENBQXlCRSxXQUF6QixDQUFxQ0gsTUFBckMsR0FBOEMsRUFBOUM7QUFDQTBGLElBQUFBLGNBQWMsR0FBRyxFQUFqQjtBQUNELEdBandDOEI7QUFtd0MvQjhPLEVBQUFBLDJCQW53QytCLHlDQW13Q0Q7QUFDNUIsU0FBS3ZVLG1CQUFMLENBQXlCRyxZQUF6QixDQUFzQ0osTUFBdEMsR0FBK0MsRUFBL0M7QUFDQTRGLElBQUFBLGlCQUFpQixHQUFHLEVBQXBCO0FBQ0QsR0F0d0M4QjtBQXd3Qy9CNFQsRUFBQUEsMEJBeHdDK0Isc0NBd3dDSjdOLE9BeHdDSSxFQXd3Q0s7QUFDbENoRyxJQUFBQSxrQkFBa0IsR0FBR2dHLE9BQXJCOztBQUVBLFFBQUloRyxrQkFBa0IsSUFBSSxFQUExQixFQUE4QjtBQUM1QixXQUFLOFQscUJBQUwsQ0FBMkIzVCxXQUFXLEdBQUcsTUFBekM7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFJNkYsT0FBTyxHQUFHRCxRQUFRLENBQUMvRixrQkFBRCxDQUF0Qjs7QUFDQSxVQUFJZ0csT0FBTyxHQUFHN0YsV0FBVyxHQUFHNkYsT0FBNUI7O0FBQ0EsV0FBSzhOLHFCQUFMLENBQTJCM1QsV0FBVyxHQUFHLEdBQWQsR0FBb0JILGtCQUFwQixHQUF5QyxHQUF6QyxHQUErQ2dHLE9BQTFFO0FBQ0Q7QUFDRixHQWx4QzhCO0FBb3hDL0J1SSxFQUFBQSxpQ0FweEMrQiw2Q0FveENHbkssTUFweENILEVBb3hDVztBQUN4QyxTQUFLdEMsZ0JBQUwsQ0FBc0J1QyxNQUF0QixHQUErQkQsTUFBL0I7QUFDQSxTQUFLaUosdUJBQUw7QUFDQSxTQUFLdUcsY0FBTDtBQUNBLFNBQUsvRSwyQkFBTDtBQUNELEdBenhDOEI7QUEyeEMvQkosRUFBQUEscUJBM3hDK0IsaUNBMnhDVHNGLE1BM3hDUyxFQTJ4Q0RDLFdBM3hDQyxFQTJ4Q1lDLFdBM3hDWixFQTJ4Q3lCQyxXQTN4Q3pCLEVBMnhDc0NDLGVBM3hDdEMsRUEyeEN1REMsaUJBM3hDdkQsRUEyeEMwRUMsaUJBM3hDMUUsRUEyeEM2RkMsV0EzeEM3RixFQTJ4QzBHbFEsTUEzeEMxRyxFQTJ4Q2tIO0FBQy9JLFNBQUtsQixlQUFMO0FBQ0EsU0FBS2xDLGlCQUFMLENBQXVCaEYsYUFBdkIsQ0FBcUMzQixNQUFyQyxHQUE4QyxFQUE5QztBQUNBLFNBQUsyRyxpQkFBTCxDQUF1QnpGLFVBQXZCLENBQWtDbEIsTUFBbEMsR0FBMkMwWixNQUEzQztBQUNBLFNBQUsvUyxpQkFBTCxDQUF1QnhGLGVBQXZCLENBQXVDbkIsTUFBdkMsR0FBZ0QyWixXQUFoRDtBQUNBLFNBQUtoVCxpQkFBTCxDQUF1QnZGLGVBQXZCLENBQXVDcEIsTUFBdkMsR0FBZ0Q0WixXQUFoRDtBQUNBLFNBQUtqVCxpQkFBTCxDQUF1QnRGLGVBQXZCLENBQXVDckIsTUFBdkMsR0FBZ0Q2WixXQUFoRDtBQUNBLFNBQUtsVCxpQkFBTCxDQUF1QnJGLG1CQUF2QixDQUEyQ3RCLE1BQTNDLEdBQW9EOFosZUFBcEQ7QUFDQSxTQUFLblQsaUJBQUwsQ0FBdUJwRixxQkFBdkIsQ0FBNkN2QixNQUE3QyxHQUFzRCtaLGlCQUF0RDtBQUNBLFNBQUtwVCxpQkFBTCxDQUF1Qm5GLHFCQUF2QixDQUE2Q3hCLE1BQTdDLEdBQXNEZ2EsaUJBQXREO0FBQ0EsU0FBS3JULGlCQUFMLENBQXVCbEYsZUFBdkIsQ0FBdUN6QixNQUF2QyxHQUFnRGlhLFdBQWhEO0FBQ0QsR0F0eUM4QjtBQXd5Qy9CUixFQUFBQSxxQkF4eUMrQixpQ0F3eUNUTyxpQkF4eUNTLEVBd3lDVTtBQUN2QyxTQUFLclQsaUJBQUwsQ0FBdUJuRixxQkFBdkIsQ0FBNkN4QixNQUE3QyxHQUFzRGdhLGlCQUF0RDtBQUNELEdBMXlDOEI7QUE0eUMvQkUsRUFBQUEsc0JBNXlDK0Isb0NBNHlDTjtBQUFBOztBQUN2QixRQUFJdlUsa0JBQWtCLElBQUksRUFBMUIsRUFBOEI7QUFDNUIsV0FBS3VHLFNBQUwsQ0FBZSx5QkFBZjtBQUNELEtBRkQsTUFFTztBQUNMLFVBQUlpSCxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBblYsTUFBQUEsY0FBYyxHQUFHLEVBQWpCOztBQUVBLFVBQUksS0FBSzZKLGlCQUFMLENBQXVCakYsV0FBdkIsSUFBc0NkLFVBQVUsQ0FBQ0UsVUFBckQsRUFBaUU7QUFDL0QsWUFBSTZLLE9BQU8sR0FBR0QsUUFBUSxDQUFDL0Ysa0JBQUQsQ0FBdEI7O0FBQ0EsWUFBSXdVLFlBQVksR0FBR3JVLFdBQVcsR0FBRzZGLE9BQWpDOztBQUNBLFlBQUl3TyxZQUFZLElBQUkvZSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ0SCxJQUFyRyxFQUEyRztBQUN6R3pRLFVBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnRILElBQWpGLElBQXlGc08sWUFBekY7QUFDQS9lLFVBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRndCLFNBQWpGLElBQThGaEosT0FBOUY7QUFDQSxlQUFLTyxTQUFMLENBQWUsa0NBQWtDUCxPQUFsQyxHQUE0QyxpQkFBM0QsRUFBOEVqUCxlQUE5RTtBQUVBSSxVQUFBQSxjQUFjLEdBQUcsaUJBQWlCLElBQWpCLEdBQXdCLElBQXhCLEdBQStCLGVBQS9CLEdBQWlEZ0osV0FBVyxHQUFHLElBQS9ELEdBQXNFLElBQXRFLEdBQTZFLG9CQUE3RSxHQUFvR0EsV0FBcEcsR0FBa0gsSUFBbEgsR0FBeUgsb0JBQXpILEdBQWdKNkYsT0FBaEosR0FBMEosSUFBMUosR0FBaUssNkJBQWpLLEdBQWlNd08sWUFBbE47QUFFQSxlQUFLQyxvQkFBTCxDQUEwQnRkLGNBQTFCO0FBRUE0TixVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUEsTUFBSSxDQUFDMlAscUJBQUw7QUFDRCxXQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0QsU0FaRCxNQVlPO0FBQ0wsZUFBS1oscUJBQUwsQ0FBMkIzVCxXQUFXLEdBQUcsTUFBekM7QUFDQUgsVUFBQUEsa0JBQWtCLEdBQUcsRUFBckI7QUFDQSxlQUFLZ0IsaUJBQUwsQ0FBdUJoRixhQUF2QixDQUFxQzNCLE1BQXJDLEdBQThDLEVBQTlDO0FBQ0EsZUFBS2tNLFNBQUwsQ0FBZSw2QkFBZjtBQUNEO0FBQ0YsT0FyQkQsTUFxQk8sSUFBSSxLQUFLdkYsaUJBQUwsQ0FBdUJqRixXQUF2QixJQUFzQ2QsVUFBVSxDQUFDSSxRQUFyRCxFQUErRDtBQUNwRSxZQUFJMkssT0FBTyxHQUFHRCxRQUFRLENBQUMvRixrQkFBRCxDQUF0Qjs7QUFDQSxZQUFJZ0csT0FBTyxJQUFJdlEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGd0IsU0FBaEcsRUFBMkc7QUFDekcsY0FBSXdGLFlBQVksR0FBR3JVLFdBQVcsR0FBRzZGLE9BQWpDOztBQUNBdlEsVUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBakYsSUFBeUZzTyxZQUF6RjtBQUNBL2UsVUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGd0IsU0FBakYsSUFBOEZoSixPQUE5RjtBQUNBLGVBQUtPLFNBQUwsQ0FBZSxnQ0FBZ0NQLE9BQWhDLEdBQTBDLHdCQUExQyxHQUFxRXdPLFlBQXBGLEVBQWtHemQsZUFBbEc7QUFFQUksVUFBQUEsY0FBYyxHQUFHLGtCQUFrQixJQUFsQixHQUF5QixJQUF6QixHQUFnQyxlQUFoQyxHQUFrRGdKLFdBQVcsR0FBRyxJQUFoRSxHQUF1RSxJQUF2RSxHQUE4RSxvQkFBOUUsR0FBcUdBLFdBQXJHLEdBQW1ILElBQW5ILEdBQTBILGVBQTFILEdBQTRJNkYsT0FBNUksR0FBc0osSUFBdEosR0FBNkosNkJBQTdKLEdBQTZMd08sWUFBOU07QUFFQSxlQUFLQyxvQkFBTCxDQUEwQnRkLGNBQTFCO0FBRUE0TixVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUEsTUFBSSxDQUFDMlAscUJBQUw7QUFDRCxXQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0QsU0FiRCxNQWFPO0FBQ0wsZUFBS1oscUJBQUwsQ0FBMkIzVCxXQUFXLEdBQUcsTUFBekM7QUFDQUgsVUFBQUEsa0JBQWtCLEdBQUcsRUFBckI7QUFDQSxlQUFLZ0IsaUJBQUwsQ0FBdUJoRixhQUF2QixDQUFxQzNCLE1BQXJDLEdBQThDLEVBQTlDO0FBQ0EsZUFBS2tNLFNBQUwsQ0FBZSxnREFBZ0Q5USx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ3QixTQUFqSSxHQUE2SSxpQkFBNUosRUFBK0tqWSxlQUEvSztBQUNEO0FBQ0YsT0FyQk0sTUFxQkEsSUFBSSxLQUFLaUssaUJBQUwsQ0FBdUJqRixXQUF2QixJQUFzQ2QsVUFBVSxDQUFDQyxXQUFyRCxFQUFrRTtBQUN2RSxZQUFJOEssT0FBTyxHQUFHRCxRQUFRLENBQUMvRixrQkFBRCxDQUF0Qjs7QUFDQSxZQUFJd1UsWUFBWSxHQUFHclUsV0FBVyxHQUFHNkYsT0FBakM7O0FBQ0EsWUFBSXdPLFlBQVksSUFBSS9lLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnRILElBQXJHLEVBQTJHO0FBQ3pHelEsVUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBakYsSUFBeUZzTyxZQUF6RjtBQUNBL2UsVUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGMEIsVUFBakYsSUFBK0ZsSixPQUEvRixDQUZ5RyxDQUd6Rzs7QUFFQSxlQUFLTyxTQUFMLENBQWUsa0NBQWtDUCxPQUFsQyxHQUE0QyxzQkFBNUMsR0FBcUUvRixpQkFBcEYsRUFBdUdsSixlQUF2RztBQUVBSSxVQUFBQSxjQUFjLEdBQUcsa0JBQWtCLElBQWxCLEdBQXlCLElBQXpCLEdBQWdDLGVBQWhDLEdBQWtEZ0osV0FBVyxHQUFHLElBQWhFLEdBQXVFLElBQXZFLEdBQThFLG9CQUE5RSxHQUFxR0EsV0FBckcsR0FBbUgsSUFBbkgsR0FBMEgsb0JBQTFILEdBQWlKNkYsT0FBakosR0FBMkosSUFBM0osR0FBa0ssNkJBQWxLLEdBQWtNd08sWUFBbk47QUFFQSxlQUFLQyxvQkFBTCxDQUEwQnRkLGNBQTFCO0FBRUE0TixVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUEsTUFBSSxDQUFDMlAscUJBQUw7QUFDRCxXQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0QsU0FkRCxNQWNPO0FBQ0wsZUFBS1oscUJBQUwsQ0FBMkIzVCxXQUFXLEdBQUcsTUFBekM7QUFDQUgsVUFBQUEsa0JBQWtCLEdBQUcsRUFBckI7QUFDQSxlQUFLZ0IsaUJBQUwsQ0FBdUJoRixhQUF2QixDQUFxQzNCLE1BQXJDLEdBQThDLEVBQTlDO0FBQ0EsZUFBS2tNLFNBQUwsQ0FBZSw2QkFBZjtBQUNEO0FBQ0YsT0F2Qk0sTUF1QkEsSUFBSSxLQUFLdkYsaUJBQUwsQ0FBdUJqRixXQUF2QixJQUFzQ2QsVUFBVSxDQUFDRyxTQUFyRCxFQUFnRTtBQUNyRSxZQUFJNEssT0FBTyxHQUFHRCxRQUFRLENBQUMvRixrQkFBRCxDQUF0Qjs7QUFFQSxZQUFJZ0csT0FBTyxJQUFJdlEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGMEIsVUFBaEcsRUFBNEc7QUFDMUcsY0FBSXNGLFlBQVksR0FBR3JVLFdBQVcsR0FBRzZGLE9BQWpDOztBQUNBdlEsVUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBakYsSUFBeUZzTyxZQUF6RjtBQUNBL2UsVUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGMEIsVUFBakYsSUFBK0ZsSixPQUEvRjtBQUVBLGVBQUtPLFNBQUwsQ0FBZSxnQ0FBZ0NQLE9BQWhDLEdBQTBDLHlCQUExQyxHQUFzRXdPLFlBQXJGLEVBQW1HemQsZUFBbkc7QUFFQUksVUFBQUEsY0FBYyxHQUFHLG1CQUFtQixJQUFuQixHQUEwQixJQUExQixHQUFpQyxlQUFqQyxHQUFtRGdKLFdBQVcsR0FBRyxJQUFqRSxHQUF3RSxJQUF4RSxHQUErRSxvQkFBL0UsR0FBc0dBLFdBQXRHLEdBQW9ILElBQXBILEdBQTJILGVBQTNILEdBQTZJNkYsT0FBN0ksR0FBdUosSUFBdkosR0FBOEosNkJBQTlKLEdBQThMd08sWUFBL007QUFFQSxlQUFLQyxvQkFBTCxDQUEwQnRkLGNBQTFCO0FBRUE0TixVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUEsTUFBSSxDQUFDMlAscUJBQUw7QUFDRCxXQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0QsU0FkRCxNQWNPO0FBQ0wsZUFBS1oscUJBQUwsQ0FBMkIzVCxXQUFXLEdBQUcsTUFBekM7QUFDQUgsVUFBQUEsa0JBQWtCLEdBQUcsRUFBckI7QUFDQSxlQUFLZ0IsaUJBQUwsQ0FBdUJoRixhQUF2QixDQUFxQzNCLE1BQXJDLEdBQThDLEVBQTlDO0FBQ0EsZUFBS2tNLFNBQUwsQ0FBZSxrREFBa0Q5USx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUYwQixVQUFuSSxHQUFnSixrQkFBL0osRUFBbUxuWSxlQUFuTDtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEdBNzRDOEI7QUErNEMvQjJkLEVBQUFBLHFCQS80QytCLG1DQSs0Q1A7QUFDdEIsU0FBS25HLGlDQUFMLENBQXVDLEtBQXZDOztBQUVBLFFBQUkvWCxpQkFBSixFQUF1QjtBQUNyQmYsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RrSCxnQkFBcEQ7QUFDQTFWLE1BQUFBLGlCQUFpQixHQUFHLEtBQXBCO0FBQ0Q7QUFDRixHQXQ1QzhCO0FBdTVDL0I7QUFFQTtBQUNBbWUsRUFBQUEseUJBMTVDK0IscUNBMDVDTHZRLE1BMTVDSyxFQTA1Q0c7QUFDaEMsU0FBS3JDLFlBQUwsQ0FBa0JzQyxNQUFsQixHQUEyQkQsTUFBM0I7QUFDRCxHQTU1QzhCO0FBODVDL0J3USxFQUFBQSw4QkE5NUMrQiwwQ0E4NUNBeFEsTUE5NUNBLEVBODVDUTtBQUNyQyxTQUFLbkQsYUFBTCxDQUFtQjlELGVBQW5CLENBQW1Da0gsTUFBbkMsR0FBNENELE1BQTVDO0FBQ0QsR0FoNkM4QjtBQWs2Qy9CeVEsRUFBQUEsb0JBbDZDK0IsZ0NBazZDVnplLFFBbDZDVSxFQWs2Q0FDLFFBbDZDQSxFQWs2Q1V5ZSxTQWw2Q1YsRUFrNkNxQjtBQUNsRCxRQUFJMWUsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ2pCb0ssTUFBQUEseUJBQXlCLEdBQUcsSUFBNUI7QUFDQSxXQUFLUyxhQUFMLENBQW1CbEUsWUFBbkIsQ0FBZ0N5TSxZQUFoQyxDQUE2QzlSLEVBQUUsQ0FBQ3FkLE1BQWhELEVBQXdEQyxZQUF4RCxHQUF1RSxLQUF2RTtBQUNELEtBSEQsTUFHTztBQUNMeFUsTUFBQUEseUJBQXlCLEdBQUcsS0FBNUI7QUFDQSxXQUFLUyxhQUFMLENBQW1CbEUsWUFBbkIsQ0FBZ0N5TSxZQUFoQyxDQUE2QzlSLEVBQUUsQ0FBQ3FkLE1BQWhELEVBQXdEQyxZQUF4RCxHQUF1RSxJQUF2RTtBQUNEOztBQUVELFFBQUkzZSxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDakJvSyxNQUFBQSwyQkFBMkIsR0FBRyxJQUE5QjtBQUNBLFdBQUtRLGFBQUwsQ0FBbUJqRSxLQUFuQixDQUF5QndNLFlBQXpCLENBQXNDOVIsRUFBRSxDQUFDcWQsTUFBekMsRUFBaURDLFlBQWpELEdBQWdFLEtBQWhFO0FBQ0QsS0FIRCxNQUdPO0FBQ0x2VSxNQUFBQSwyQkFBMkIsR0FBRyxLQUE5QjtBQUNBLFdBQUtRLGFBQUwsQ0FBbUJqRSxLQUFuQixDQUF5QndNLFlBQXpCLENBQXNDOVIsRUFBRSxDQUFDcWQsTUFBekMsRUFBaURDLFlBQWpELEdBQWdFLElBQWhFO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDRixTQUFMLEVBQWdCO0FBQ2RwVSxNQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNBLFdBQUtPLGFBQUwsQ0FBbUJoRSxPQUFuQixDQUEyQnVNLFlBQTNCLENBQXdDOVIsRUFBRSxDQUFDcWQsTUFBM0MsRUFBbURDLFlBQW5ELEdBQWtFLEtBQWxFO0FBQ0QsS0FIRCxNQUdPO0FBQ0x0VSxNQUFBQSxTQUFTLEdBQUcsS0FBWjtBQUNBLFdBQUtPLGFBQUwsQ0FBbUJoRSxPQUFuQixDQUEyQnVNLFlBQTNCLENBQXdDOVIsRUFBRSxDQUFDcWQsTUFBM0MsRUFBbURDLFlBQW5ELEdBQWtFLElBQWxFO0FBQ0Q7QUFDRixHQTE3QzhCO0FBNDdDL0JDLEVBQUFBLG9CQTU3QytCLGtDQTQ3Q1I7QUFDckIsUUFBSXBGLFFBQVEsR0FBR3BhLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsUUFBSXdJLFlBQVksR0FBRy9YLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ec0gsYUFBcEQsRUFBbkI7O0FBRUEsUUFBSTRJLEtBQUssR0FBRyxDQUFaOztBQUNBLFNBQUssSUFBSXpOLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHb0ksUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDcEUsWUFBdEMsQ0FBbUR6QixNQUEvRSxFQUF1RkYsS0FBSyxFQUE1RixFQUFnRztBQUM5RixVQUFJb0ksUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDcEUsWUFBdEMsQ0FBbUQzQixLQUFuRCxFQUEwRDRCLFNBQTlELEVBQXlFO0FBQ3ZFNkwsUUFBQUEsS0FBSyxHQUFHckYsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDcEUsWUFBdEMsQ0FBbUQzQixLQUFuRCxFQUEwRDlOLFVBQWxFO0FBQ0E7QUFDRDtBQUNGOztBQUNELFdBQU91YixLQUFQO0FBQ0QsR0F4OEM4QjtBQTA4Qy9CQyxFQUFBQSxpQkExOEMrQiw2QkEwOENicEIsTUExOENhLEVBMDhDTHFCLGVBMThDSyxFQTA4Q29CQyxPQTE4Q3BCLEVBMDhDcUNDLE9BMThDckMsRUEwOENzREMsTUExOEN0RCxFQTA4Q3NFQyxvQkExOEN0RSxFQTA4Q29HMUQsc0JBMThDcEcsRUEwOENnSTJELFNBMThDaEksRUEwOEMrSUMsU0ExOEMvSSxFQTA4QzhKQyxXQTE4QzlKLEVBMDhDK0tDLGFBMThDL0ssRUEwOENrTUMsZ0JBMThDbE0sRUEwOEN3TkMsV0ExOEN4TixFQTA4QzZPO0FBQUE7O0FBQUEsUUFBbFBWLGVBQWtQO0FBQWxQQSxNQUFBQSxlQUFrUCxHQUFoTyxLQUFnTztBQUFBOztBQUFBLFFBQXpOQyxPQUF5TjtBQUF6TkEsTUFBQUEsT0FBeU4sR0FBL00sS0FBK007QUFBQTs7QUFBQSxRQUF4TUMsT0FBd007QUFBeE1BLE1BQUFBLE9BQXdNLEdBQTlMLEtBQThMO0FBQUE7O0FBQUEsUUFBdkxDLE1BQXVMO0FBQXZMQSxNQUFBQSxNQUF1TCxHQUE5SyxLQUE4SztBQUFBOztBQUFBLFFBQXZLQyxvQkFBdUs7QUFBdktBLE1BQUFBLG9CQUF1SyxHQUFoSixLQUFnSjtBQUFBOztBQUFBLFFBQXpJMUQsc0JBQXlJO0FBQXpJQSxNQUFBQSxzQkFBeUksR0FBaEgsQ0FBZ0g7QUFBQTs7QUFBQSxRQUE3RzJELFNBQTZHO0FBQTdHQSxNQUFBQSxTQUE2RyxHQUFqRyxDQUFpRztBQUFBOztBQUFBLFFBQTlGQyxTQUE4RjtBQUE5RkEsTUFBQUEsU0FBOEYsR0FBbEYsQ0FBa0Y7QUFBQTs7QUFBQSxRQUEvRUMsV0FBK0U7QUFBL0VBLE1BQUFBLFdBQStFLEdBQWpFLENBQWlFO0FBQUE7O0FBQUEsUUFBOURDLGFBQThEO0FBQTlEQSxNQUFBQSxhQUE4RCxHQUE5QyxDQUE4QztBQUFBOztBQUFBLFFBQTNDQyxnQkFBMkM7QUFBM0NBLE1BQUFBLGdCQUEyQyxHQUF4QixDQUF3QjtBQUFBOztBQUFBLFFBQXJCQyxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQzFRLFFBQUlqRyxRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl3SSxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBLFFBQUl3RCxTQUFTLEdBQUdyYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsQ0FBaEI7O0FBQ0FoVyxJQUFBQSxXQUFXLEdBQUcsQ0FBZDtBQUVBRCxJQUFBQSxnQkFBZ0IsR0FBRyxFQUFuQjs7QUFDQSxRQUFJc1ksUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDdUkscUJBQTFDLEVBQWlFO0FBQy9EeGUsTUFBQUEsZ0JBQWdCLEdBQUdzWSxRQUFRLENBQUNuSSxjQUFULENBQXdCOEYsWUFBeEIsRUFBc0N3SSxxQkFBekQ7QUFDQW5HLE1BQUFBLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixFQUFzQ3VJLHFCQUF0QyxHQUE4RCxLQUE5RDtBQUNBbEcsTUFBQUEsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDd0kscUJBQXRDLEdBQThELEVBQTlEO0FBQ0Q7O0FBRUQ3UCxJQUFBQSxPQUFPLENBQUN5RyxLQUFSLENBQWNyVixnQkFBZDtBQUNBNE8sSUFBQUEsT0FBTyxDQUFDeUcsS0FBUixDQUFjaUQsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDd0kscUJBQXBEOztBQUVBLFFBQUl6ZSxnQkFBZ0IsSUFBSSxFQUF4QixFQUE0QjtBQUMxQixXQUFLZ1AsU0FBTCxDQUFlLGtFQUFmLEVBQW1GLElBQW5GO0FBQ0Q7O0FBRURsRyxJQUFBQSxhQUFhLEdBQUcsQ0FBaEI7QUFDQUMsSUFBQUEsYUFBYSxHQUFHLENBQWhCO0FBQ0FDLElBQUFBLGNBQWMsR0FBR3VWLFdBQWpCLENBdEIwUSxDQXVCMVE7QUFFQTs7QUFFQXplLElBQUFBLG1CQUFtQixHQUFHLENBQXRCO0FBQ0FDLElBQUFBLG1CQUFtQixHQUFHLENBQXRCOztBQUNBLFNBQUssSUFBSW1RLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHcUksU0FBUyxDQUFDMUcsWUFBVixDQUF1QnpCLE1BQW5ELEVBQTJERixLQUFLLEVBQWhFLEVBQW9FO0FBQ2xFLFVBQUkxQixRQUFRLENBQUMrSixTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJILFlBQS9CLENBQVIsSUFBd0QsQ0FBNUQsRUFBK0Q7QUFDN0QsWUFBSXdJLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QndPLG1CQUFsQyxFQUF1RDtBQUNyRDVlLFVBQUFBLG1CQUFtQjtBQUNwQjtBQUNGLE9BSkQsTUFJTyxJQUFJME8sUUFBUSxDQUFDK0osU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCSCxZQUEvQixDQUFSLElBQXdELENBQTVELEVBQStEO0FBQ3BFLFlBQUl3SSxTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJ3TyxtQkFBbEMsRUFBdUQ7QUFDckQzZSxVQUFBQSxtQkFBbUI7QUFDcEI7QUFDRjtBQUNGOztBQUVELFFBQUlELG1CQUFtQixHQUFHLENBQXRCLElBQTJCQyxtQkFBbUIsR0FBRyxDQUFyRCxFQUF3RDtBQUN0RCxXQUFLaVAsU0FBTCxDQUFlLDBDQUEwQ2xQLG1CQUFtQixHQUFHQyxtQkFBaEUsSUFBdUYsZUFBdEcsRUFBdUgsSUFBdkg7QUFDRDs7QUFFRCxRQUFJNGUsSUFBSSxHQUFHTixhQUFhLEdBQUdDLGdCQUEzQjs7QUFDQTNlLElBQUFBLFVBQVUsR0FBRyxvQ0FBb0NnZixJQUFqRDtBQUNBLFNBQUt2UyxTQUFMLEdBQWlCNFIsTUFBakI7QUFDQSxTQUFLM1IsV0FBTCxHQUFtQmdTLGFBQW5CO0FBQ0EsU0FBSy9SLGlCQUFMLEdBQXlCZ1MsZ0JBQXpCO0FBQ0FqVixJQUFBQSxZQUFZLEdBQUd3VSxlQUFmO0FBQ0EsU0FBS1QseUJBQUwsQ0FBK0IsSUFBL0I7QUFDQSxTQUFLMVQsYUFBTCxDQUFtQjFGLFVBQW5CLENBQThCbEIsTUFBOUIsR0FBdUMwWixNQUF2QztBQUNBLFFBQUlvQyxLQUFLLEdBQUcsSUFBWjtBQUNBaGdCLElBQUFBLHNCQUFzQixHQUFHcWYsb0JBQXpCO0FBQ0FqZixJQUFBQSxxQkFBcUIsR0FBR3ViLHNCQUF4QjtBQUNBMWIsSUFBQUEsUUFBUSxHQUFHcWYsU0FBWDtBQUNBcGYsSUFBQUEsUUFBUSxHQUFHcWYsU0FBWDtBQUNBcGYsSUFBQUEsV0FBVyxHQUFHcWYsV0FBZDs7QUFFQSxRQUFJLENBQUN4ZixzQkFBTCxFQUE2QjtBQUMzQixVQUFJb2YsTUFBTSxJQUFJLEtBQWQsRUFBcUI7QUFDbkIsWUFBSWhWLGNBQUosRUFBb0I7QUFDbEIsZUFBS2dHLFNBQUwsQ0FBZSw2Q0FBZixFQUE4RDRQLEtBQTlEO0FBQ0QsU0FIa0IsQ0FLbkI7OztBQUNBLFlBQUlkLE9BQU8sSUFBSUMsT0FBZixFQUF3QixLQUFLL08sU0FBTCxDQUFlLDJFQUFmLEVBQTRGNFAsS0FBNUYsRUFBeEIsS0FDSyxJQUFJZCxPQUFKLEVBQWEsS0FBSzlPLFNBQUwsQ0FBZSx3REFBZixFQUF5RTRQLEtBQXpFLEVBQWIsS0FDQSxJQUFJYixPQUFKLEVBQWEsS0FBSy9PLFNBQUwsQ0FBZSw0REFBZixFQUE2RTRQLEtBQTdFO0FBQ25CLE9BVEQsTUFTTztBQUNMO0FBQ0EsWUFBSWQsT0FBTyxJQUFJQyxPQUFmLEVBQXdCblAsT0FBTyxDQUFDQyxHQUFSLENBQVksMkVBQVosRUFBeEIsS0FDSyxJQUFJaVAsT0FBSixFQUFhbFAsT0FBTyxDQUFDQyxHQUFSLENBQVksd0RBQVosRUFBYixLQUNBLElBQUlrUCxPQUFKLEVBQWFuUCxPQUFPLENBQUNDLEdBQVIsQ0FBWSw0REFBWjtBQUNuQjtBQUNGOztBQUVELFNBQUtnUSxpQkFBTCxDQUF1QjNnQix3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ0SCxJQUF4Rzs7QUFFQSxRQUFJLENBQUMvUCxzQkFBTCxFQUE2QjtBQUMzQkMsTUFBQUEsUUFBUSxHQUFHWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUY3QyxlQUE1RjtBQUNBdFUsTUFBQUEsUUFBUSxHQUFHWix3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ4QixvQkFBNUY7QUFDQTFWLE1BQUFBLFdBQVcsR0FBR2Isd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGNkksb0JBQS9GO0FBQ0Q7O0FBRUQsUUFBSW5OLFVBQVUsR0FBRyxLQUFqQjtBQUNBLFFBQUlDLGNBQWMsR0FBRyxDQUFyQjs7QUFFQSxTQUFLLElBQUkxQixNQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE1BQUssR0FBR2hTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnBFLFlBQWpGLENBQThGekIsTUFBMUgsRUFBa0lGLE1BQUssRUFBdkksRUFBMkk7QUFDekksVUFBSWhTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnBFLFlBQWpGLENBQThGM0IsTUFBOUYsRUFBcUc0QixTQUF6RyxFQUFvSDtBQUNsSEgsUUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQUMsUUFBQUEsY0FBYyxHQUFHMUIsTUFBakI7QUFDQTtBQUNEO0FBQ0Y7O0FBRUQsUUFBSXFOLFNBQVMsR0FBRyxLQUFoQjs7QUFFQSxRQUFJLENBQUMzZSxzQkFBTCxFQUE2QjtBQUMzQjJlLE1BQUFBLFNBQVMsR0FBRzVMLFVBQVo7QUFDRDs7QUFFRCxTQUFLakksYUFBTCxDQUFtQnRFLG9CQUFuQixDQUF3Q3RDLE1BQXhDLEdBQWlEakUsUUFBakQ7QUFDQSxTQUFLNkssYUFBTCxDQUFtQnJFLGFBQW5CLENBQWlDdkMsTUFBakMsR0FBMENoRSxRQUExQztBQUNBLFNBQUs0SyxhQUFMLENBQW1CcEUscUJBQW5CLENBQXlDeEMsTUFBekMsR0FBa0QvRCxXQUFsRDtBQUNBLFNBQUsySyxhQUFMLENBQW1CbkUsc0JBQW5CLENBQTBDekMsTUFBMUMsR0FBbUQsS0FBS3VKLFdBQXhEOztBQUVBLFFBQUlpTSxRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl3SSxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5CLENBN0cwUSxDQStHMVE7OztBQUNBLFFBQUl1RCxRQUFRLENBQUNuSSxjQUFULENBQXdCOEYsWUFBeEIsRUFBc0M4SSxrQkFBMUMsRUFBOEQ7QUFDNUQsVUFBSXBCLEtBQUssR0FBRyxLQUFLRCxvQkFBTCxFQUFaOztBQUNBLFdBQUtoVSxhQUFMLENBQW1CeEQsZUFBbkIsQ0FBbUNwRCxNQUFuQyxHQUE0QyxXQUFXNmEsS0FBdkQ7QUFDRCxLQUhELE1BR087QUFDTCxXQUFLalUsYUFBTCxDQUFtQnhELGVBQW5CLENBQW1DcEQsTUFBbkMsR0FBNEMsWUFBNUM7QUFDRCxLQXJIeVEsQ0F1SDFROzs7QUFDQSxRQUFJZ2IsT0FBTyxJQUFJQyxPQUFmLEVBQXdCLEtBQUtULG9CQUFMLENBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDQyxTQUFoQyxFQUF4QixLQUNLLElBQUlPLE9BQUosRUFBYSxLQUFLUixvQkFBTCxDQUEwQixDQUExQixFQUE2QnhlLFFBQTdCLEVBQXVDeWUsU0FBdkMsRUFBYixLQUNBLElBQUlRLE9BQUosRUFBYSxLQUFLVCxvQkFBTCxDQUEwQnplLFFBQTFCLEVBQW9DLENBQXBDLEVBQXVDMGUsU0FBdkMsRUFBYixLQUNBLEtBQUtELG9CQUFMLENBQTBCemUsUUFBMUIsRUFBb0NDLFFBQXBDLEVBQThDeWUsU0FBOUM7O0FBRUwsUUFBSVEsT0FBTyxJQUFJRCxPQUFmLEVBQXdCO0FBQ3RCdFEsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixRQUFBLE1BQUksQ0FBQ3dSLGVBQUw7QUFDRCxPQUZTLEVBRVBKLEtBQUssR0FBRyxHQUZELENBQVY7QUFHRDs7QUFFRCxRQUFJWixNQUFKLEVBQVk7QUFDVnhRLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsUUFBQSxNQUFJLENBQUN5UixnQ0FBTDs7QUFDQSxRQUFBLE1BQUksQ0FBQ0MseUJBQUw7O0FBQ0EsUUFBQSxNQUFJLENBQUNDLDJCQUFMO0FBQ0QsT0FKUyxFQUlQLENBSk8sQ0FBVjtBQUtEO0FBQ0YsR0FwbEQ4QjtBQXNsRC9CRixFQUFBQSxnQ0F0bEQrQiw4Q0FzbERJO0FBQ2pDLFFBQUksQ0FBQ2hXLHlCQUFMLEVBQWdDO0FBQzlCLFdBQUtvVSw4QkFBTCxDQUFvQyxJQUFwQztBQUVBLFVBQUkrQixhQUFhLEdBQUcvVixZQUFwQjtBQUNBLFVBQUlrVixXQUFXLEdBQUd2VixjQUFsQjs7QUFFQSxVQUFJLENBQUNwSyxzQkFBTCxFQUE2QjtBQUMzQixZQUFJLENBQUN3Z0IsYUFBTCxFQUFvQixLQUFLMVYsYUFBTCxDQUFtQjVELHNCQUFuQixDQUEwQ2hELE1BQTFDLEdBQW1ELFFBQW5ELENBQXBCLEtBQ0ssS0FBSzRHLGFBQUwsQ0FBbUI1RCxzQkFBbkIsQ0FBMENoRCxNQUExQyxHQUFtRCxjQUFuRDtBQUNOLE9BSEQsTUFHTztBQUNMc2MsUUFBQUEsYUFBYSxHQUFHLEtBQWhCO0FBQ0EsYUFBSzFWLGFBQUwsQ0FBbUI1RCxzQkFBbkIsQ0FBMENoRCxNQUExQyxHQUFtRCxRQUFuRDtBQUNEOztBQUVEbUcsTUFBQUEseUJBQXlCLEdBQUcsSUFBNUI7QUFDQSxXQUFLUyxhQUFMLENBQW1CbEUsWUFBbkIsQ0FBZ0N5TSxZQUFoQyxDQUE2QzlSLEVBQUUsQ0FBQ3FkLE1BQWhELEVBQXdEQyxZQUF4RCxHQUF1RSxLQUF2RTs7QUFFQSxVQUFJbkYsUUFBUSxHQUFHcGEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsRUFBZjs7QUFDQSxVQUFJd0ksWUFBWSxHQUFHL1gsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RzSCxhQUFwRCxFQUFuQjs7QUFFQSxVQUFJLENBQUNuVyxzQkFBTCxFQUE2QjtBQUMzQkMsUUFBQUEsUUFBUSxHQUFHWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUY3QyxlQUE1RjtBQUNEOztBQUVELFVBQUlpTSxLQUFLLEdBQUduaEIsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0Q4SixXQUFwRCxFQUFaOztBQUNBLFVBQUlnQixTQUFTLEdBQUdELFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixFQUFzQ3BFLFlBQXREO0FBRUEsVUFBSXlOLGVBQWUsR0FBRyxDQUF0QjtBQUNBLFVBQUlDLG1CQUFtQixHQUFHLENBQTFCO0FBQ0EsVUFBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsVUFBSUMsaUJBQWlCLEdBQUcsS0FBS3BULFdBQTdCO0FBRUEsVUFBSWtTLFdBQUosRUFBaUJpQixXQUFXLEdBQUdBLFdBQVcsR0FBRyxDQUE1QixDQWhDYSxDQWtDOUI7O0FBQ0EsVUFBSUosYUFBSixFQUFtQjtBQUNqQixZQUFJLEtBQUs5UyxpQkFBTCxJQUEwQixDQUE5QixFQUFpQztBQUMvQmtULFVBQUFBLFdBQVcsSUFBSSxJQUFJLEtBQUtsVCxpQkFBeEI7QUFDRCxTQUZELE1BRU87QUFDTGtULFVBQUFBLFdBQVcsSUFBSSxDQUFmO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJRSxpQkFBaUIsR0FBR0YsV0FBVyxHQUFHQyxpQkFBZCxHQUFrQzNmLG1CQUFsQyxHQUF3RHVmLEtBQXhELEdBQWdFLElBQXhGOztBQUVBLFVBQUksQ0FBQ3pnQixzQkFBTCxFQUE2QjtBQUMzQixhQUFLLElBQUlzUixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3FJLFNBQVMsQ0FBQ25JLE1BQXRDLEVBQThDRixLQUFLLEVBQW5ELEVBQXVEO0FBQ3JELGNBQUlxSSxTQUFTLENBQUNySSxLQUFELENBQVQsQ0FBaUJILFlBQWpCLElBQWlDLENBQXJDLEVBQXdDO0FBQ3RDLGdCQUFJd0ksU0FBUyxDQUFDckksS0FBRCxDQUFULENBQWlCc0osYUFBckIsRUFBb0M7QUFDbEMsa0JBQUk4QixRQUFRLEdBQUdtRSxpQkFBaUIsR0FBR0QsV0FBcEIsR0FBa0NILEtBQWxDLEdBQTBDLElBQTFDLEdBQWlESyxpQkFBaEU7O0FBQ0FKLGNBQUFBLGVBQWUsR0FBR2hFLFFBQVEsR0FBRyxDQUE3Qjs7QUFDQWhELGNBQUFBLFFBQVEsQ0FBQ3FILCtCQUFULENBQXlDTCxlQUF6QyxFQUEwRC9HLFNBQVMsQ0FBQ3JJLEtBQUQsQ0FBVCxDQUFpQmlNLFNBQTNFOztBQUNBb0QsY0FBQUEsbUJBQW1CLElBQUlELGVBQXZCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsT0FYRCxNQVdPO0FBQ0wsWUFBSS9HLFNBQVMsQ0FBQ3ZaLHFCQUFELENBQVQsQ0FBaUMrUSxZQUFqQyxJQUFpRCxDQUFyRCxFQUF3RDtBQUN0RCxjQUFJd0ksU0FBUyxDQUFDdloscUJBQUQsQ0FBVCxDQUFpQ3dhLGFBQXJDLEVBQW9EO0FBQ2xELGdCQUFJOEIsUUFBUSxHQUFHbUUsaUJBQWlCLEdBQUdELFdBQXBCLEdBQWtDSCxLQUFsQyxHQUEwQyxJQUExQyxHQUFpREssaUJBQWhFOztBQUNBSixZQUFBQSxlQUFlLEdBQUdoRSxRQUFRLEdBQUcsQ0FBN0I7O0FBQ0FoRCxZQUFBQSxRQUFRLENBQUNxSCwrQkFBVCxDQUF5Q0wsZUFBekMsRUFBMEQvRyxTQUFTLENBQUN2WixxQkFBRCxDQUFULENBQWlDbWQsU0FBM0Y7O0FBQ0FvRCxZQUFBQSxtQkFBbUIsSUFBSUQsZUFBdkI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsVUFBSUMsbUJBQW1CLEdBQUcsQ0FBMUIsRUFBNkI7QUFDM0IsYUFBS3ZRLFNBQUwsQ0FBZSxxR0FBZixFQUFzSHhQLGVBQXRIO0FBQ0QsT0FyRTZCLENBc0U5Qjs7O0FBRUEsVUFBSSxDQUFDNGYsYUFBTCxFQUFvQmhXLGlCQUFpQixHQUFHb1csV0FBVyxHQUFHQyxpQkFBZCxHQUFrQzVnQixRQUFsQyxHQUE2Q3dnQixLQUE3QyxHQUFxRCxJQUFyRCxHQUE0REUsbUJBQTVELEdBQWtGRyxpQkFBdEcsQ0FBcEIsS0FDS3RXLGlCQUFpQixHQUFHcVcsaUJBQWlCLEdBQUdELFdBQXBCLElBQW1DM2dCLFFBQVEsR0FBR3dnQixLQUE5QyxJQUF1RCxJQUF2RCxHQUE4REUsbUJBQTlELEdBQW9GRyxpQkFBeEc7QUFFTCxXQUFLaFcsYUFBTCxDQUFtQnpGLGVBQW5CLENBQW1DbkIsTUFBbkMsR0FBNEN1YyxLQUE1QztBQUNBLFdBQUszVixhQUFMLENBQW1CM0Qsa0JBQW5CLENBQXNDakQsTUFBdEMsR0FBK0NqRSxRQUEvQztBQUVBLFVBQUksQ0FBQ3VnQixhQUFMLEVBQW9CLEtBQUsxVixhQUFMLENBQW1CMUQsZ0JBQW5CLENBQW9DbEQsTUFBcEMsR0FBNkMsTUFBTTJjLGlCQUFOLEdBQTBCLEdBQTFCLEdBQWdDSixLQUFoQyxHQUF3QyxHQUF4QyxHQUE4Q3hnQixRQUE5QyxHQUF5RCxHQUF6RCxHQUErRCxRQUEvRCxHQUEwRTBnQixtQkFBMUUsR0FBZ0csR0FBaEcsR0FBc0dHLGlCQUF0RyxHQUEwSCxHQUExSCxHQUFnSXRXLGlCQUE3SyxDQUFwQixLQUNLLEtBQUtNLGFBQUwsQ0FBbUIxRCxnQkFBbkIsQ0FBb0NsRCxNQUFwQyxHQUE2QyxNQUFNMmMsaUJBQU4sR0FBMEIsR0FBMUIsR0FBZ0NKLEtBQWhDLEdBQXdDLEdBQXhDLEdBQThDeGdCLFFBQTlDLEdBQXlELEdBQXpELEdBQStELE9BQS9ELEdBQXlFMmdCLFdBQXpFLEdBQXVGLElBQXZGLEdBQThGRCxtQkFBOUYsR0FBb0gsR0FBcEgsR0FBMEhHLGlCQUExSCxHQUE4SSxHQUE5SSxHQUFvSnRXLGlCQUFqTTtBQUVMekosTUFBQUEsVUFBVSxJQUFJLE9BQU8sSUFBUCxHQUFjLHVCQUFkLEdBQXdDZCxRQUF4QyxHQUFtRCxJQUFuRCxHQUEwRCxlQUExRCxHQUE0RXdnQixLQUE1RSxHQUFvRixJQUFwRixHQUEyRixvQkFBM0YsR0FBa0hqVyxpQkFBaEk7QUFDQW5KLE1BQUFBLFdBQVcsSUFBSW1KLGlCQUFmOztBQUVBLFVBQUksS0FBS2dELFNBQVQsRUFBb0I7QUFDbEIsYUFBS3dULHFCQUFMO0FBQ0Q7QUFDRjtBQUNGLEdBL3FEOEI7QUFpckQvQlYsRUFBQUEseUJBanJEK0IsdUNBaXJESDtBQUMxQjtBQUNBLFFBQUksQ0FBQ2hXLDJCQUFMLEVBQWtDO0FBQ2hDLFdBQUttVSw4QkFBTCxDQUFvQyxJQUFwQztBQUVBLFVBQUkrQixhQUFhLEdBQUcvVixZQUFwQjtBQUNBLFVBQUlvVyxpQkFBaUIsR0FBRyxLQUFLcFQsV0FBN0I7QUFDQSxVQUFJa1MsV0FBVyxHQUFHdlYsY0FBbEI7O0FBRUEsVUFBSSxDQUFDcEssc0JBQUwsRUFBNkI7QUFDM0IsWUFBSSxDQUFDd2dCLGFBQUwsRUFBb0IsS0FBSzFWLGFBQUwsQ0FBbUI1RCxzQkFBbkIsQ0FBMENoRCxNQUExQyxHQUFtRCxRQUFuRCxDQUFwQixLQUNLLEtBQUs0RyxhQUFMLENBQW1CNUQsc0JBQW5CLENBQTBDaEQsTUFBMUMsR0FBbUQsY0FBbkQ7QUFDTixPQUhELE1BR087QUFDTHNjLFFBQUFBLGFBQWEsR0FBRyxLQUFoQjtBQUNBLGFBQUsxVixhQUFMLENBQW1CNUQsc0JBQW5CLENBQTBDaEQsTUFBMUMsR0FBbUQsUUFBbkQ7QUFDRDs7QUFFRG9HLE1BQUFBLDJCQUEyQixHQUFHLElBQTlCO0FBQ0EsV0FBS1EsYUFBTCxDQUFtQmpFLEtBQW5CLENBQXlCd00sWUFBekIsQ0FBc0M5UixFQUFFLENBQUNxZCxNQUF6QyxFQUFpREMsWUFBakQsR0FBZ0UsS0FBaEU7O0FBQ0EsVUFBSW5GLFFBQVEsR0FBR3BhLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsVUFBSXdJLFlBQVksR0FBRy9YLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ec0gsYUFBcEQsRUFBbkI7O0FBRUEsVUFBSSxDQUFDblcsc0JBQUwsRUFBNkI7QUFDM0JFLFFBQUFBLFFBQVEsR0FBR1osd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGeEIsb0JBQTVGO0FBQ0ExVixRQUFBQSxXQUFXLEdBQUdiLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRjZJLG9CQUEvRjtBQUNEOztBQUVELFVBQUlyUSxPQUFPLEdBQUczUCxRQUFRLEdBQUdDLFdBQXpCOztBQUNBLFVBQUlzZ0IsS0FBSyxHQUFHbmhCLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ed0osWUFBcEQsRUFBWjs7QUFFQSxVQUFJc0IsU0FBUyxHQUFHRCxRQUFRLENBQUNuSSxjQUFULENBQXdCOEYsWUFBeEIsRUFBc0NwRSxZQUF0RDtBQUNBLFVBQUl5TixlQUFlLEdBQUcsQ0FBdEI7QUFDQSxVQUFJQyxtQkFBbUIsR0FBRyxDQUExQjtBQUNBLFVBQUlDLFdBQVcsR0FBRyxDQUFsQjtBQUVBLFVBQUlqQixXQUFKLEVBQWlCaUIsV0FBVyxHQUFHQSxXQUFXLEdBQUcsQ0FBNUI7O0FBRWpCLFVBQUlKLGFBQUosRUFBbUI7QUFDakIsWUFBSSxLQUFLOVMsaUJBQUwsSUFBMEIsQ0FBOUIsRUFBaUM7QUFDL0JrVCxVQUFBQSxXQUFXLElBQUksSUFBSSxLQUFLbFQsaUJBQXhCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xrVCxVQUFBQSxXQUFXLElBQUksQ0FBZjtBQUNEO0FBQ0Y7O0FBRUQsVUFBSUUsaUJBQWlCLEdBQUdELGlCQUFpQixHQUFHRCxXQUFwQixHQUFrQ3pmLG1CQUFsQyxHQUF3RHNmLEtBQXhELEdBQWdFLElBQXhGOztBQUVBLFVBQUksQ0FBQ3pnQixzQkFBTCxFQUE2QjtBQUMzQixhQUFLLElBQUlzUixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3FJLFNBQVMsQ0FBQ25JLE1BQXRDLEVBQThDRixLQUFLLEVBQW5ELEVBQXVEO0FBQ3JELGNBQUlxSSxTQUFTLENBQUNySSxLQUFELENBQVQsQ0FBaUJILFlBQWpCLElBQWlDLENBQXJDLEVBQXdDO0FBQ3RDLGdCQUFJd0ksU0FBUyxDQUFDckksS0FBRCxDQUFULENBQWlCc0osYUFBckIsRUFBb0M7QUFDbEMsa0JBQUlxRyxVQUFVLEdBQUd0SCxTQUFTLENBQUNySSxLQUFELENBQVQsQ0FBaUI2SSxhQUFqQixDQUErQjNJLE1BQS9CLEdBQXdDLENBQXpEOztBQUNBLGtCQUFJa0wsUUFBUSxHQUFHbUUsaUJBQWlCLEdBQUdJLFVBQXBCLEdBQWlDTCxXQUFqQyxHQUErQ0gsS0FBL0MsR0FBdUQsSUFBdkQsR0FBOERLLGlCQUE3RTs7QUFDQUosY0FBQUEsZUFBZSxHQUFHaEUsUUFBUSxHQUFHLENBQTdCOztBQUNBaEQsY0FBQUEsUUFBUSxDQUFDcUgsK0JBQVQsQ0FBeUNMLGVBQXpDLEVBQTBEL0csU0FBUyxDQUFDckksS0FBRCxDQUFULENBQWlCaU0sU0FBM0U7O0FBQ0FvRCxjQUFBQSxtQkFBbUIsSUFBSUQsZUFBdkI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQVpELE1BWU87QUFDTCxZQUFJL0csU0FBUyxDQUFDdloscUJBQUQsQ0FBVCxDQUFpQytRLFlBQWpDLElBQWlELENBQXJELEVBQXdEO0FBQ3RELGNBQUl3SSxTQUFTLENBQUN2WixxQkFBRCxDQUFULENBQWlDd2EsYUFBckMsRUFBb0Q7QUFDbEQsZ0JBQUlxRyxVQUFVLEdBQUd0SCxTQUFTLENBQUN2WixxQkFBRCxDQUFULENBQWlDK1osYUFBakMsQ0FBK0MzSSxNQUEvQyxHQUF3RCxDQUF6RTs7QUFDQSxnQkFBSWtMLFFBQVEsR0FBR21FLGlCQUFpQixHQUFHSSxVQUFwQixHQUFpQ0wsV0FBakMsR0FBK0NILEtBQS9DLEdBQXVELElBQXZELEdBQThESyxpQkFBN0U7O0FBQ0FKLFlBQUFBLGVBQWUsR0FBR2hFLFFBQVEsR0FBRyxDQUE3Qjs7QUFDQWhELFlBQUFBLFFBQVEsQ0FBQ3FILCtCQUFULENBQXlDTCxlQUF6QyxFQUEwRC9HLFNBQVMsQ0FBQ3ZaLHFCQUFELENBQVQsQ0FBaUNtZCxTQUEzRjs7QUFDQW9ELFlBQUFBLG1CQUFtQixJQUFJRCxlQUF2QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxVQUFJQyxtQkFBbUIsR0FBRyxDQUExQixFQUE2QjtBQUMzQixhQUFLdlEsU0FBTCxDQUFlLHFHQUFmLEVBQXNIeFAsZUFBdEg7QUFDRDs7QUFFRCxVQUFJLENBQUM0ZixhQUFMLEVBQW9CaFcsaUJBQWlCLEdBQUdvVyxXQUFXLEdBQUdDLGlCQUFkLEdBQWtDaFIsT0FBbEMsR0FBNEM0USxLQUE1QyxHQUFvRCxJQUFwRCxHQUEyREUsbUJBQTNELEdBQWlGRyxpQkFBckcsQ0FBcEIsS0FDS3RXLGlCQUFpQixHQUFHcVcsaUJBQWlCLEdBQUdELFdBQXBCLElBQW1DL1EsT0FBTyxHQUFHNFEsS0FBN0MsSUFBc0QsSUFBdEQsR0FBNkRFLG1CQUE3RCxHQUFtRkcsaUJBQXZHO0FBRUwsV0FBS2hXLGFBQUwsQ0FBbUJ6RixlQUFuQixDQUFtQ25CLE1BQW5DLEdBQTRDdWMsS0FBNUM7QUFDQSxXQUFLM1YsYUFBTCxDQUFtQjNELGtCQUFuQixDQUFzQ2pELE1BQXRDLEdBQStDMkwsT0FBL0M7QUFFQSxVQUFJLENBQUMyUSxhQUFMLEVBQW9CLEtBQUsxVixhQUFMLENBQW1CMUQsZ0JBQW5CLENBQW9DbEQsTUFBcEMsR0FBNkMsTUFBTTJjLGlCQUFOLEdBQTBCLEdBQTFCLEdBQWdDSixLQUFoQyxHQUF3QyxHQUF4QyxHQUE4QzVRLE9BQTlDLEdBQXdELEdBQXhELEdBQThELFFBQTlELEdBQXlFOFEsbUJBQXpFLEdBQStGLEdBQS9GLEdBQXFHRyxpQkFBckcsR0FBeUgsR0FBekgsR0FBK0h0VyxpQkFBNUssQ0FBcEIsS0FDSyxLQUFLTSxhQUFMLENBQW1CMUQsZ0JBQW5CLENBQW9DbEQsTUFBcEMsR0FBNkMsTUFBTTJjLGlCQUFOLEdBQTBCLEdBQTFCLEdBQWdDSixLQUFoQyxHQUF3QyxHQUF4QyxHQUE4QzVRLE9BQTlDLEdBQXdELEdBQXhELEdBQThELE9BQTlELEdBQXdFK1EsV0FBeEUsR0FBc0YsSUFBdEYsR0FBNkZELG1CQUE3RixHQUFtSCxHQUFuSCxHQUF5SEcsaUJBQXpILEdBQTZJLEdBQTdJLEdBQW1KdFcsaUJBQWhNO0FBRUx6SixNQUFBQSxVQUFVLElBQUksT0FBTyxJQUFQLEdBQWMsMkJBQWQsR0FBNEM4TyxPQUE1QyxHQUFzRCxJQUF0RCxHQUE2RCxlQUE3RCxHQUErRTRRLEtBQS9FLEdBQXVGLElBQXZGLEdBQThGLG9CQUE5RixHQUFxSGpXLGlCQUFuSTtBQUNBbkosTUFBQUEsV0FBVyxJQUFJbUosaUJBQWY7O0FBQ0EsVUFBSSxLQUFLZ0QsU0FBVCxFQUFvQjtBQUNsQixhQUFLd1QscUJBQUw7QUFDRDtBQUNGO0FBQ0YsR0Ezd0Q4QjtBQTZ3RC9CVCxFQUFBQSwyQkE3d0QrQix5Q0E2d0REO0FBQzVCO0FBQ0EsUUFBSSxDQUFDaFcsU0FBTCxFQUFnQjtBQUNkLFVBQUltUCxRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFVBQUl3SSxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBLFVBQUkrSyxhQUFhLEdBQUcsQ0FBcEI7QUFFQSxVQUFJeEgsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDOEksa0JBQTFDLEVBQ0U7QUFDQWUsUUFBQUEsYUFBYSxHQUFHLEtBQUtwQyxvQkFBTCxFQUFoQixDQUZGLEtBR0tvQyxhQUFhLEdBQUcsSUFBaEI7O0FBRUwsVUFBSTVoQix3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ0SCxJQUFqRixJQUF5Rm1SLGFBQTdGLEVBQTRHO0FBQzFHM1csUUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDQSxhQUFLTyxhQUFMLENBQW1CaEUsT0FBbkIsQ0FBMkJ1TSxZQUEzQixDQUF3QzlSLEVBQUUsQ0FBQ3FkLE1BQTNDLEVBQW1EQyxZQUFuRCxHQUFrRSxLQUFsRTtBQUNBdmYsUUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBakYsR0FBd0Z6USx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ0SCxJQUFqRixHQUF3Rm1SLGFBQWhMO0FBRUEsWUFBSW5PLFVBQVUsR0FBRyxLQUFqQjtBQUNBLFlBQUlDLGNBQWMsR0FBRyxDQUFyQjs7QUFFQSxhQUFLLElBQUkxQixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR2hTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnBFLFlBQWpGLENBQThGekIsTUFBMUgsRUFBa0lGLEtBQUssRUFBdkksRUFBMkk7QUFDekksY0FBSWhTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnBFLFlBQWpGLENBQThGM0IsS0FBOUYsRUFBcUc0QixTQUF6RyxFQUFvSDtBQUNsSEgsWUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQUMsWUFBQUEsY0FBYyxHQUFHMUIsS0FBakI7QUFDQTtBQUNEO0FBQ0Y7O0FBRURoUyxRQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZwRSxZQUFqRixDQUE4RkQsY0FBOUYsRUFBOEd4UCxVQUE5RyxHQUEySGxFLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnBFLFlBQWpGLENBQThGRCxjQUE5RixFQUE4R3hQLFVBQTlHLEdBQTJIMGQsYUFBdFA7O0FBRUEsWUFBSTVoQix3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZwRSxZQUFqRixDQUE4RkQsY0FBOUYsRUFBOEd4UCxVQUE5RyxJQUE0SCxDQUFoSSxFQUFtSTtBQUNqSWxFLFVBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnBFLFlBQWpGLENBQThGRCxjQUE5RixFQUE4R3hQLFVBQTlHLEdBQTJILENBQTNIO0FBQ0FsRSxVQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZwRSxZQUFqRixDQUE4RkQsY0FBOUYsRUFBOEdFLFNBQTlHLEdBQTBILEtBQTFIO0FBQ0Q7O0FBRUQsWUFBSXdHLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixFQUFzQzhJLGtCQUExQyxFQUE4RHpHLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixFQUFzQzhJLGtCQUF0QyxHQUEyRCxLQUEzRDtBQUU5RCxhQUFLRixpQkFBTCxDQUF1QjNnQix3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FOEYsWUFBbkUsRUFBaUZ0SCxJQUF4RztBQUNBLGFBQUtxUSxlQUFMO0FBQ0QsT0EzQkQsTUEyQk87QUFDTCxZQUFJMUcsUUFBUSxHQUFHcGEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsRUFBZjs7QUFDQSxZQUFJd0ksWUFBWSxHQUFHL1gsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RzSCxhQUFwRCxFQUFuQjs7QUFFQSxZQUFJdUQsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDOEksa0JBQTFDLEVBQThELEtBQUtyVixhQUFMLENBQW1CekQsY0FBbkIsQ0FBa0NnTSxZQUFsQyxDQUErQzlSLEVBQUUsQ0FBQ3FkLE1BQWxELEVBQTBEQyxZQUExRCxHQUF5RSxLQUF6RSxDQUE5RCxLQUNLLEtBQUsvVCxhQUFMLENBQW1CekQsY0FBbkIsQ0FBa0NnTSxZQUFsQyxDQUErQzlSLEVBQUUsQ0FBQ3FkLE1BQWxELEVBQTBEQyxZQUExRCxHQUF5RSxJQUF6RTtBQUVMLGFBQUsvVCxhQUFMLENBQW1CN0QsbUJBQW5CLENBQXVDaUgsTUFBdkMsR0FBZ0QsSUFBaEQ7QUFDQThCLFFBQUFBLE9BQU8sQ0FBQ3lHLEtBQVIsQ0FBYyxjQUFkO0FBQ0Q7QUFDRjtBQUNGLEdBL3pEOEI7QUFpMEQvQnVLLEVBQUFBLHFCQWowRCtCLG1DQWkwRFA7QUFBQTs7QUFDdEI7QUFDQSxRQUFJM0osWUFBWSxHQUFHL1gsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RzSCxhQUFwRCxFQUFuQjs7QUFDQTdXLElBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnRILElBQWpGLEdBQXdGelEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBakYsR0FBd0Z2RixpQkFBaEw7QUFDQSxTQUFLeVYsaUJBQUwsQ0FBdUIzZ0Isd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBeEc7O0FBQ0EsUUFBSSxDQUFDLEtBQUt2QyxTQUFWLEVBQXFCO0FBQ25CLFdBQUs0QyxTQUFMLENBQWUsYUFBYTVGLGlCQUFiLEdBQWlDLDhEQUFqQyxHQUFrR2xMLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnRILElBQWxNO0FBQ0FuQixNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFFBQUEsTUFBSSxDQUFDNlAsOEJBQUwsQ0FBb0MsS0FBcEM7O0FBQ0EsUUFBQSxNQUFJLENBQUMyQixlQUFMO0FBQ0QsT0FIUyxFQUdQLEdBSE8sQ0FBVjtBQUlELEtBTkQsTUFNTztBQUNMcFEsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksYUFBYXpGLGlCQUFiLEdBQWlDLDhEQUFqQyxHQUFrR2xMLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUU4RixZQUFuRSxFQUFpRnRILElBQS9MO0FBQ0EsV0FBSzBPLDhCQUFMLENBQW9DLEtBQXBDO0FBQ0EsV0FBSzJCLGVBQUw7QUFDRDtBQUNGLEdBajFEOEI7QUFtMUQvQmUsRUFBQUEsc0JBbjFEK0Isb0NBbTFETjtBQUN2QixTQUFLL1EsU0FBTCxDQUFlLDRGQUFmOztBQUNBLFFBQUlzSixRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl3SSxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBdUQsSUFBQUEsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDOEksa0JBQXRDLEdBQTJELElBQTNEO0FBQ0EsU0FBS3JWLGFBQUwsQ0FBbUI3RCxtQkFBbkIsQ0FBdUNpSCxNQUF2QyxHQUFnRCxLQUFoRDtBQUNBM0QsSUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDQSxTQUFLTyxhQUFMLENBQW1CaEUsT0FBbkIsQ0FBMkJ1TSxZQUEzQixDQUF3QzlSLEVBQUUsQ0FBQ3FkLE1BQTNDLEVBQW1EQyxZQUFuRCxHQUFrRSxLQUFsRTtBQUNBLFNBQUt1QixlQUFMO0FBQ0E3VixJQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNELEdBNzFEOEI7QUErMUQvQjZXLEVBQUFBLG1CQS8xRCtCLGlDQSsxRFQ7QUFDcEIsU0FBS3RXLGFBQUwsQ0FBbUI3RCxtQkFBbkIsQ0FBdUNpSCxNQUF2QyxHQUFnRCxLQUFoRDtBQUNBLFNBQUttVCxxQ0FBTCxDQUEyQyxLQUEzQztBQUNELEdBbDJEOEI7QUFvMkQvQnBCLEVBQUFBLGlCQXAyRCtCLDZCQW8yRGJwUSxPQXAyRGEsRUFvMkRKO0FBQ3pCLFNBQUsvRSxhQUFMLENBQW1CL0UsU0FBbkIsQ0FBNkI3QixNQUE3QixHQUFzQyxNQUFNMkwsT0FBNUM7QUFDRCxHQXQyRDhCO0FBdzJEL0J5UixFQUFBQSxxQkF4MkQrQixtQ0F3MkRQO0FBQ3RCLFNBQUt4VyxhQUFMLENBQW1CN0QsbUJBQW5CLENBQXVDaUgsTUFBdkMsR0FBZ0QsS0FBaEQ7QUFDRCxHQTEyRDhCO0FBNDJEL0JxVCxFQUFBQSxtQkE1MkQrQixpQ0E0MkRUO0FBQUE7O0FBQ3BCO0FBQ0EsU0FBS25SLFNBQUwsQ0FBZSwrREFBZixFQUFnRixJQUFoRixFQUFzRixLQUF0RjtBQUNBeEIsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixNQUFBLE1BQUksQ0FBQzBTLHFCQUFMOztBQUNBLE1BQUEsTUFBSSxDQUFDOUMseUJBQUwsQ0FBK0IsS0FBL0I7O0FBQ0EsTUFBQSxNQUFJLENBQUNyUSwwQkFBTDs7QUFDQTVNLE1BQUFBLEVBQUUsQ0FBQzJMLFdBQUgsQ0FBZXNVLElBQWYsQ0FBb0IsVUFBcEIsRUFBZ0MsRUFBaEMsRUFBb0MsS0FBcEM7QUFDQW5YLE1BQUFBLHlCQUF5QixHQUFHLEtBQTVCO0FBQ0FDLE1BQUFBLDJCQUEyQixHQUFHLEtBQTlCO0FBQ0FDLE1BQUFBLFNBQVMsR0FBRyxLQUFaO0FBQ0FqTCxNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDRTLHNCQUFwRCxDQUEyRSxLQUEzRTtBQUNBbmlCLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9ENlMsMEJBQXBELENBQStFLEtBQS9FO0FBQ0FwaUIsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0Q4UywrQkFBcEQsQ0FBb0YsS0FBcEY7QUFDQXJpQixNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRCtTLFlBQXBELENBQWlFLEtBQWpFLEVBQXdFLEtBQXhFO0FBQ0F0aUIsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RnVCxxQkFBcEQ7QUFDRCxLQWJTLEVBYVAsSUFiTyxDQUFWO0FBY0QsR0E3M0Q4QjtBQSszRC9CQyxFQUFBQSxRQS8zRCtCLG9CQSszRHRCM04sS0EvM0RzQixFQSszRGY7QUFDZCxTQUFLL0QsU0FBTCxDQUFlK0QsS0FBSyxDQUFDNE4sSUFBckIsRUFBMkIsSUFBM0IsRUFBaUMsSUFBakM7QUFDRCxHQWo0RDhCO0FBbTREL0IzQixFQUFBQSxlQW40RCtCLDZCQW00RGI7QUFBQTs7QUFDaEIsUUFBSS9WLHlCQUF5QixJQUFJQywyQkFBN0IsSUFBNERDLFNBQWhFLEVBQTJFO0FBQ3pFLFVBQUk4TSxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBbkcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7QUFDQSxXQUFLdU8seUJBQUwsQ0FBK0IsS0FBL0I7O0FBRUEsVUFBSXBkLGdCQUFnQixJQUFJLEVBQXhCLEVBQTRCO0FBQzFCLGFBQUtnUCxTQUFMLENBQWUsK0JBQStCL08sV0FBL0IsR0FBNkMsMkNBQTVELEVBQXlHLElBQXpHOztBQUNBLFlBQUlnVyxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBN1csUUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRThGLFlBQW5FLEVBQWlGdEgsSUFBakYsSUFBeUYxTyxXQUF6RjtBQUNBL0IsUUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RrUywrQkFBcEQsQ0FBb0YxZixXQUFwRixFQUFpR0QsZ0JBQWpHO0FBRUF3TixRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFVBQUEsTUFBSSxDQUFDb1QsdUJBQUw7QUFDRCxTQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsT0FURCxNQVNPO0FBQ0wsYUFBS0EsdUJBQUw7QUFDRDtBQUNGO0FBQ0YsR0F0NUQ4QjtBQXc1RC9CQSxFQUFBQSx1QkF4NUQrQixxQ0F3NURMO0FBQ3hCLFFBQUksQ0FBQ2hpQixzQkFBTCxFQUE2QjtBQUMzQlYsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0Q0UyxzQkFBcEQsQ0FBMkUsS0FBM0U7QUFDQW5pQixNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDZTLDBCQUFwRCxDQUErRSxLQUEvRTtBQUNBcGlCLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EOFMsK0JBQXBELENBQW9GLEtBQXBGO0FBQ0FyaUIsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QrUyxZQUFwRCxDQUFpRSxLQUFqRSxFQUF3RSxLQUF4RTtBQUNBdGlCLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Eb1QsdUJBQXBELENBQTRFLEtBQTVFO0FBQ0EzaUIsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RxVCxxQkFBcEQsQ0FBMEUsS0FBMUU7QUFDQTVpQixNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNULFlBQXBEO0FBQ0QsS0FSRCxNQVFPO0FBQ0w3aUIsTUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RrSCxnQkFBcEQ7QUFDRDs7QUFFRCxTQUFLdUksb0JBQUwsQ0FBMEJ2ZCxVQUExQjtBQUNELEdBdDZEOEI7QUF1NkQvQjtBQUVBO0FBQ0FxaEIsRUFBQUEsNENBMTZEK0Isd0RBMDZEY25VLE1BMTZEZCxFQTA2RHNCO0FBQ25ELFNBQUtwQyxrQkFBTCxDQUF3QnFDLE1BQXhCLEdBQWlDRCxNQUFqQztBQUNELEdBNTZEOEI7QUE4NkQvQm9VLEVBQUFBLGlDQTk2RCtCLCtDQTg2REs7QUFDbEMsU0FBS0MseUJBQUw7O0FBQ0EsUUFBSTVJLFFBQVEsR0FBR3BhLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsUUFBSXdJLFlBQVksR0FBRy9YLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ec0gsYUFBcEQsRUFBbkI7O0FBQ0EsUUFBSXdELFNBQVMsR0FBR0QsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLENBQWhCO0FBRUEsU0FBS3RNLG1CQUFMLENBQXlCM0YsVUFBekIsQ0FBb0NsQixNQUFwQyxHQUE2QyxNQUE3QztBQUNBLFNBQUs2RyxtQkFBTCxDQUF5QmhGLFNBQXpCLENBQW1DN0IsTUFBbkMsR0FBNEN3VixRQUFRLENBQUNuSSxjQUFULENBQXdCOEYsWUFBeEIsRUFBc0N0SCxJQUFsRjtBQUNBLFNBQUtoRixtQkFBTCxDQUF5Qi9FLGVBQXpCLENBQXlDOUIsTUFBekMsR0FBa0R3VixRQUFRLENBQUNuSSxjQUFULENBQXdCOEYsWUFBeEIsRUFBc0M5TyxVQUF4RjtBQUNBLFNBQUt3QyxtQkFBTCxDQUF5QjlFLGtCQUF6QixDQUE0Qy9CLE1BQTVDLEdBQXFELHdCQUF3QndWLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixFQUFzQ3BFLFlBQXRDLENBQW1EekIsTUFBaEk7O0FBRUEsU0FBSyxJQUFJRixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3FJLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUJ6QixNQUFuRCxFQUEyREYsS0FBSyxFQUFoRSxFQUFvRTtBQUNsRSxVQUFJc0ksSUFBSSxHQUFHclksRUFBRSxDQUFDc1ksV0FBSCxDQUFlLEtBQUs5TyxtQkFBTCxDQUF5QjVFLGtCQUF4QyxDQUFYO0FBQ0F5VCxNQUFBQSxJQUFJLENBQUNFLE1BQUwsR0FBYyxLQUFLL08sbUJBQUwsQ0FBeUI3RSxpQkFBdkM7QUFDQTBULE1BQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DdEcsZUFBcEM7QUFDQTZNLE1BQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DMEcsT0FBcEMsQ0FBNENKLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QmlCLFlBQTFFO0FBQ0FxSCxNQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQzJHLE9BQXBDLENBQTRDTCxTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJlLHVCQUExRTtBQUNBdUgsTUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MyRyxPQUFwQyxDQUE0Q0wsU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCZSx1QkFBMUU7QUFDQXVILE1BQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DNEcsZ0JBQXBDLENBQXFEM0ksS0FBckQ7O0FBRUEsVUFBSTFCLFFBQVEsQ0FBQytKLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QkgsWUFBL0IsQ0FBUixJQUF3RCxDQUE1RCxFQUErRDtBQUM3RHlJLFFBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DK0csZUFBcEMsQ0FBb0QsQ0FBcEQ7QUFDQVIsUUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NnSCxPQUFwQyxDQUE0QyxZQUE1QztBQUNELE9BSEQsTUFHTyxJQUFJekssUUFBUSxDQUFDK0osU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCSCxZQUEvQixDQUFSLElBQXdELENBQTVELEVBQStEO0FBQ3BFeUksUUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MrRyxlQUFwQyxDQUFvRCxDQUFwRDtBQUNBUixRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ2dILE9BQXBDLENBQTRDLGdCQUE1QztBQUNEOztBQUVEVCxNQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ3FILFVBQXBDLENBQStDZixTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJpUixNQUE3RTtBQUNBM0ksTUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NzSCxZQUFwQyxDQUFpRGhCLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QjZJLGFBQTlCLENBQTRDM0ksTUFBN0Y7QUFFQSxVQUFJbUksU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCNkksYUFBOUIsQ0FBNEMzSSxNQUE1QyxJQUFzRCxDQUExRCxFQUE2RG9JLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DbVAsd0JBQXBDLENBQTZELEtBQTdELEVBQTdELEtBQ0s1SSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ21QLHdCQUFwQyxDQUE2RCxJQUE3RDtBQUVMampCLE1BQUFBLG1CQUFtQixDQUFDb1YsSUFBcEIsQ0FBeUJpRixJQUF6QjtBQUNEO0FBQ0YsR0FsOUQ4QjtBQW85RC9CNkksRUFBQUEseUNBcDlEK0IscURBbzlEV3JELE1BcDlEWCxFQW85RDJCO0FBQUEsUUFBaEJBLE1BQWdCO0FBQWhCQSxNQUFBQSxNQUFnQixHQUFQLEtBQU87QUFBQTs7QUFDeEQsU0FBS2tELHlCQUFMOztBQUNBLFFBQUk1SSxRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl3SSxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUNBLFFBQUl3RCxTQUFTLEdBQUdELFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixDQUFoQjs7QUFFQSxRQUFJLENBQUMrSCxNQUFMLEVBQWE7QUFDWCxXQUFLclUsbUJBQUwsQ0FBeUIzRixVQUF6QixDQUFvQ2xCLE1BQXBDLEdBQTZDLFVBQTdDO0FBQ0EsV0FBSzZHLG1CQUFMLENBQXlCaEYsU0FBekIsQ0FBbUM3QixNQUFuQyxHQUE0Q3dWLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixFQUFzQ3RILElBQWxGO0FBQ0EsV0FBS2hGLG1CQUFMLENBQXlCL0UsZUFBekIsQ0FBeUM5QixNQUF6QyxHQUFrRHdWLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixFQUFzQzlPLFVBQXhGO0FBQ0EsV0FBS3dDLG1CQUFMLENBQXlCOUUsa0JBQXpCLENBQTRDL0IsTUFBNUMsR0FBcUQsd0JBQXdCd1YsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDcEUsWUFBdEMsQ0FBbUR6QixNQUFoSTtBQUNEOztBQUVELFNBQUssSUFBSUYsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdxSSxTQUFTLENBQUMxRyxZQUFWLENBQXVCekIsTUFBbkQsRUFBMkRGLEtBQUssRUFBaEUsRUFBb0U7QUFDbEUsVUFBSXNJLElBQUksR0FBR3JZLEVBQUUsQ0FBQ3NZLFdBQUgsQ0FBZSxLQUFLOU8sbUJBQUwsQ0FBeUIzRSwwQkFBeEMsQ0FBWDtBQUNBd1QsTUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBSy9PLG1CQUFMLENBQXlCN0UsaUJBQXZDO0FBQ0EwVCxNQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ3RHLGVBQXBDO0FBQ0E2TSxNQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQzBHLE9BQXBDLENBQTRDSixTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJpQixZQUExRTtBQUNBcUgsTUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MyRyxPQUFwQyxDQUE0Q0wsU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCZSx1QkFBMUU7QUFDQXVILE1BQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DMkcsT0FBcEMsQ0FBNENMLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QmUsdUJBQTFFO0FBQ0F1SCxNQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQzRHLGdCQUFwQyxDQUFxRDNJLEtBQXJEOztBQUVBLFVBQUkxQixRQUFRLENBQUMrSixTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJILFlBQS9CLENBQVIsSUFBd0QsQ0FBNUQsRUFBK0Q7QUFDN0R5SSxRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQytHLGVBQXBDLENBQW9ELENBQXBEO0FBQ0FSLFFBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DZ0gsT0FBcEMsQ0FBNEMsWUFBNUM7QUFDRCxPQUhELE1BR08sSUFBSXpLLFFBQVEsQ0FBQytKLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QkgsWUFBL0IsQ0FBUixJQUF3RCxDQUE1RCxFQUErRDtBQUNwRXlJLFFBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DK0csZUFBcEMsQ0FBb0QsQ0FBcEQ7QUFDQVIsUUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NnSCxPQUFwQyxDQUE0QyxnQkFBNUM7QUFDRDs7QUFFRFQsTUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NxSCxVQUFwQyxDQUErQ2YsU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCaVIsTUFBN0U7QUFDQTNJLE1BQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9Dc0gsWUFBcEMsQ0FBaURoQixTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEI2SSxhQUE5QixDQUE0QzNJLE1BQTdGOztBQUVBLFVBQUk0TixNQUFKLEVBQVk7QUFDVnhGLFFBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DcVAsdUJBQXBDO0FBQ0E7QUFDRCxPQXZCaUUsQ0F3QmxFO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQW5qQixNQUFBQSxtQkFBbUIsQ0FBQ29WLElBQXBCLENBQXlCaUYsSUFBekI7QUFDRDtBQUNGLEdBaGdFOEI7QUFpZ0UvQjBJLEVBQUFBLHlCQWpnRStCLHVDQWlnRUg7QUFDMUIsU0FBSyxJQUFJaFIsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcvUixtQkFBbUIsQ0FBQ2lTLE1BQWhELEVBQXdERixLQUFLLEVBQTdELEVBQWlFO0FBQy9EL1IsTUFBQUEsbUJBQW1CLENBQUMrUixLQUFELENBQW5CLENBQTJCK0osT0FBM0I7QUFDRDs7QUFFRDliLElBQUFBLG1CQUFtQixHQUFHLEVBQXRCO0FBQ0QsR0F2Z0U4QjtBQXlnRS9COGhCLEVBQUFBLHFDQXpnRStCLGlEQXlnRU9zQixXQXpnRVAsRUF5Z0U0QjtBQUFBLFFBQXJCQSxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQ3pELFFBQUlBLFdBQUosRUFBaUI7QUFDZixXQUFLNVgsbUJBQUwsQ0FBeUIxRSxVQUF6QixDQUFvQzZILE1BQXBDLEdBQTZDLEtBQTdDO0FBQ0EsV0FBS25ELG1CQUFMLENBQXlCekUsa0JBQXpCLENBQTRDNEgsTUFBNUMsR0FBcUQsSUFBckQ7QUFDRCxLQUhELE1BR087QUFDTCxXQUFLbkQsbUJBQUwsQ0FBeUIxRSxVQUF6QixDQUFvQzZILE1BQXBDLEdBQTZDLElBQTdDO0FBQ0EsV0FBS25ELG1CQUFMLENBQXlCekUsa0JBQXpCLENBQTRDNEgsTUFBNUMsR0FBcUQsS0FBckQ7QUFDRDs7QUFDRCxTQUFLa1UsNENBQUwsQ0FBa0QsSUFBbEQ7QUFDQSxTQUFLQyxpQ0FBTDtBQUNELEdBbmhFOEI7QUFxaEUvQk8sRUFBQUEscURBcmhFK0IsaUVBcWhFdUJELFdBcmhFdkIsRUFxaEU0Q3ZELE1BcmhFNUMsRUFxaEU0RDtBQUFBLFFBQXJDdUQsV0FBcUM7QUFBckNBLE1BQUFBLFdBQXFDLEdBQXZCLEtBQXVCO0FBQUE7O0FBQUEsUUFBaEJ2RCxNQUFnQjtBQUFoQkEsTUFBQUEsTUFBZ0IsR0FBUCxLQUFPO0FBQUE7O0FBQ3pGLFFBQUl1RCxXQUFKLEVBQWlCO0FBQ2YsV0FBSzVYLG1CQUFMLENBQXlCMUUsVUFBekIsQ0FBb0M2SCxNQUFwQyxHQUE2QyxLQUE3QztBQUNBLFdBQUtuRCxtQkFBTCxDQUF5QnpFLGtCQUF6QixDQUE0QzRILE1BQTVDLEdBQXFELElBQXJEO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsV0FBS25ELG1CQUFMLENBQXlCMUUsVUFBekIsQ0FBb0M2SCxNQUFwQyxHQUE2QyxJQUE3QztBQUNBLFdBQUtuRCxtQkFBTCxDQUF5QnpFLGtCQUF6QixDQUE0QzRILE1BQTVDLEdBQXFELEtBQXJEO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDa1IsTUFBTCxFQUFhLEtBQUtnRCw0Q0FBTCxDQUFrRCxJQUFsRDtBQUViLFNBQUtLLHlDQUFMLENBQStDckQsTUFBL0M7QUFDRCxHQWppRThCO0FBbWlFL0J5RCxFQUFBQSxtQ0FuaUUrQixpREFtaUVPO0FBQ3BDLFNBQUtQLHlCQUFMO0FBQ0EsU0FBS0YsNENBQUwsQ0FBa0QsS0FBbEQ7QUFDRCxHQXRpRThCO0FBd2lFL0JVLEVBQUFBLGdEQXhpRStCLDhEQXdpRW9CO0FBQ2pELFNBQUtSLHlCQUFMO0FBQ0EsU0FBS0YsNENBQUwsQ0FBa0QsS0FBbEQ7QUFDQTlpQixJQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRGtILGdCQUFwRDtBQUNELEdBNWlFOEI7QUE4aUUvQjtBQUVBO0FBQ0FnTixFQUFBQSxnQ0FqakUrQiw0Q0FpakVFOVUsTUFqakVGLEVBaWpFVTtBQUN2QyxTQUFLbkMsWUFBTCxDQUFrQm9DLE1BQWxCLEdBQTJCRCxNQUEzQjtBQUNELEdBbmpFOEI7QUFxakUvQitVLEVBQUFBLDBCQXJqRStCLHNDQXFqRUpMLFdBcmpFSSxFQXFqRWlCO0FBQUEsUUFBckJBLFdBQXFCO0FBQXJCQSxNQUFBQSxXQUFxQixHQUFQLEtBQU87QUFBQTs7QUFDOUMsU0FBS2pXLGlCQUFMO0FBQ0EsU0FBS3FXLGdDQUFMLENBQXNDLElBQXRDO0FBQ0EsU0FBS0UseUJBQUwsQ0FBK0JOLFdBQS9CO0FBQ0QsR0F6akU4QjtBQTBqRS9CTSxFQUFBQSx5QkExakUrQixxQ0EwakVMTixXQTFqRUssRUEwakVRO0FBQ3JDLFFBQUlqSixRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl3SSxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUVBLFNBQUtuTCxhQUFMLENBQW1CNUYsVUFBbkIsQ0FBOEJsQixNQUE5QixHQUF1QyxRQUF2QztBQUNBLFNBQUs4RyxhQUFMLENBQW1CakYsU0FBbkIsQ0FBNkI3QixNQUE3QixHQUFzQ3dWLFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixFQUFzQ3RILElBQTVFO0FBQ0EsU0FBSy9FLGFBQUwsQ0FBbUJoRixlQUFuQixDQUFtQzlCLE1BQW5DLEdBQTRDd1YsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDOU8sVUFBbEY7O0FBRUEsUUFBSW9hLFdBQUosRUFBaUI7QUFDZixXQUFLM1gsYUFBTCxDQUFtQjNFLFVBQW5CLENBQThCNkgsTUFBOUIsR0FBdUMsS0FBdkM7QUFDQSxXQUFLbEQsYUFBTCxDQUFtQjFFLGtCQUFuQixDQUFzQzRILE1BQXRDLEdBQStDLElBQS9DO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsV0FBS2xELGFBQUwsQ0FBbUIzRSxVQUFuQixDQUE4QjZILE1BQTlCLEdBQXVDLElBQXZDO0FBQ0EsV0FBS2xELGFBQUwsQ0FBbUIxRSxrQkFBbkIsQ0FBc0M0SCxNQUF0QyxHQUErQyxLQUEvQztBQUNEO0FBQ0YsR0F6a0U4QjtBQTJrRS9CZ1YsRUFBQUEsd0JBM2tFK0Isc0NBMmtFSjtBQUN6QixTQUFLSCxnQ0FBTCxDQUFzQyxLQUF0QztBQUNELEdBN2tFOEI7QUEra0UvQkksRUFBQUEscUNBL2tFK0IsbURBK2tFUztBQUN0QyxTQUFLSixnQ0FBTCxDQUFzQyxLQUF0QztBQUNBempCLElBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ea0gsZ0JBQXBEO0FBQ0QsR0FsbEU4QjtBQW1sRS9CO0FBRUE7QUFDQXFOLEVBQUFBLHNDQXRsRStCLGtEQXNsRVFuVixNQXRsRVIsRUFzbEVnQjtBQUM3QyxTQUFLbEMsZUFBTCxDQUFxQm1DLE1BQXJCLEdBQThCRCxNQUE5QjtBQUNELEdBeGxFOEI7QUEwbEUvQm9WLEVBQUFBLGdDQTFsRStCLDRDQTBsRUVWLFdBMWxFRixFQTBsRXVCO0FBQUEsUUFBckJBLFdBQXFCO0FBQXJCQSxNQUFBQSxXQUFxQixHQUFQLEtBQU87QUFBQTs7QUFDcEQsU0FBS2pXLGlCQUFMO0FBQ0EsU0FBSzBXLHNDQUFMLENBQTRDLElBQTVDO0FBQ0EsU0FBS0UsK0JBQUwsQ0FBcUNYLFdBQXJDO0FBQ0QsR0E5bEU4QjtBQStsRS9CVyxFQUFBQSwrQkEvbEUrQiwyQ0ErbEVDWCxXQS9sRUQsRUErbEVjO0FBQzNDLFFBQUlqSixRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl3SSxZQUFZLEdBQUcvWCx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5COztBQUVBLFNBQUtsTCxnQkFBTCxDQUFzQjdGLFVBQXRCLENBQWlDbEIsTUFBakMsR0FBMEMsYUFBMUM7QUFDQSxTQUFLK0csZ0JBQUwsQ0FBc0JsRixTQUF0QixDQUFnQzdCLE1BQWhDLEdBQXlDd1YsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDdEgsSUFBL0U7QUFDQSxTQUFLOUUsZ0JBQUwsQ0FBc0JqRixlQUF0QixDQUFzQzlCLE1BQXRDLEdBQStDd1YsUUFBUSxDQUFDbkksY0FBVCxDQUF3QjhGLFlBQXhCLEVBQXNDOU8sVUFBckY7O0FBRUEsUUFBSW9hLFdBQUosRUFBaUI7QUFDZixXQUFLMVgsZ0JBQUwsQ0FBc0I1RSxVQUF0QixDQUFpQzZILE1BQWpDLEdBQTBDLEtBQTFDO0FBQ0EsV0FBS2pELGdCQUFMLENBQXNCM0Usa0JBQXRCLENBQXlDNEgsTUFBekMsR0FBa0QsSUFBbEQ7QUFDRCxLQUhELE1BR087QUFDTCxXQUFLakQsZ0JBQUwsQ0FBc0I1RSxVQUF0QixDQUFpQzZILE1BQWpDLEdBQTBDLElBQTFDO0FBQ0EsV0FBS2pELGdCQUFMLENBQXNCM0Usa0JBQXRCLENBQXlDNEgsTUFBekMsR0FBa0QsS0FBbEQ7QUFDRDtBQUNGLEdBOW1FOEI7QUFnbkUvQnFWLEVBQUFBLDhCQWhuRStCLDRDQWduRUU7QUFDL0IsU0FBS0gsc0NBQUwsQ0FBNEMsS0FBNUM7QUFDRCxHQWxuRThCO0FBb25FL0JJLEVBQUFBLDJDQXBuRStCLHlEQW9uRWU7QUFDNUMsU0FBS0osc0NBQUwsQ0FBNEMsS0FBNUM7QUFDQTlqQixJQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRGtILGdCQUFwRDtBQUNELEdBdm5FOEI7QUF3bkUvQjtBQUVBO0FBQ0EwTixFQUFBQSx1Q0EzbkUrQixtREEybkVTeFYsTUEzbkVULEVBMm5FaUI7QUFDOUMsU0FBSy9CLHlCQUFMLENBQStCZ0MsTUFBL0IsR0FBd0NELE1BQXhDO0FBQ0QsR0E3bkU4QjtBQStuRS9CeVYsRUFBQUEsb0NBL25FK0IsZ0RBK25FTXpWLE1BL25FTixFQStuRWM7QUFDM0MsU0FBS2hDLHNCQUFMLENBQTRCaUMsTUFBNUIsR0FBcUNELE1BQXJDO0FBQ0QsR0Fqb0U4QjtBQW1vRS9CMFYsRUFBQUEsc0NBbm9FK0Isa0RBbW9FUTFWLE1Bbm9FUixFQW1vRWdCO0FBQzdDLFNBQUsvQyxrQkFBTCxDQUF3QnJELGFBQXhCLENBQXNDcUcsTUFBdEMsR0FBK0NELE1BQS9DO0FBQ0QsR0Fyb0U4QjtBQXVvRS9CMlYsRUFBQUEsaUJBdm9FK0IsNkJBdW9FYjNJLElBdm9FYSxFQXVvRVA7QUFDdEIsU0FBSy9QLGtCQUFMLENBQXdCcEQsa0JBQXhCLENBQTJDNUQsTUFBM0MsR0FBb0QrVyxJQUFwRDtBQUNELEdBem9FOEI7QUEyb0UvQjRJLEVBQUFBLG1DQTNvRStCLCtDQTJvRUtDLE9BM29FTCxFQTJvRWNDLFdBM29FZCxFQTJvRTJCdEwsV0Ezb0UzQixFQTJvRXdDdUwsVUEzb0V4QyxFQTJvRXdEO0FBQUEsUUFBaEJBLFVBQWdCO0FBQWhCQSxNQUFBQSxVQUFnQixHQUFILENBQUc7QUFBQTs7QUFDckYsU0FBSzlZLGtCQUFMLENBQXdCOUYsVUFBeEIsQ0FBbUNsQixNQUFuQyxHQUE0QyxjQUE1QztBQUNBLFNBQUtnSCxrQkFBTCxDQUF3Qm5GLFNBQXhCLENBQWtDN0IsTUFBbEMsR0FBMkMsTUFBTTRmLE9BQU8sQ0FBQy9ULElBQXpEO0FBQ0EsU0FBSzdFLGtCQUFMLENBQXdCbEYsZUFBeEIsQ0FBd0M5QixNQUF4QyxHQUFpRDRmLE9BQU8sQ0FBQ3ZiLFVBQXpEO0FBQ0EsU0FBSzJDLGtCQUFMLENBQXdCeEQsaUJBQXhCLENBQTBDeEQsTUFBMUMsR0FBbUQsb0JBQW9CNUUsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QwQyxjQUFwRCxDQUFtRUMsTUFBMUk7O0FBRUEsUUFBSXdTLFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUNuQixXQUFLLElBQUkxUyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3lTLFdBQVcsQ0FBQ3ZTLE1BQXhDLEVBQWdERixLQUFLLEVBQXJELEVBQXlEO0FBQ3ZELFlBQUl5UyxXQUFXLENBQUN6UyxLQUFELENBQVgsQ0FBbUI0SixnQkFBbkIsQ0FBb0MrSSxjQUFwQyxDQUFtREMsVUFBbkQsSUFBaUUsS0FBckUsRUFBNEU7QUFDMUU7QUFDQSxjQUFJSixPQUFPLENBQUNwUyxTQUFSLElBQXFCcVMsV0FBVyxDQUFDelMsS0FBRCxDQUFYLENBQW1CNEosZ0JBQW5CLENBQW9DQyxpQkFBcEMsQ0FBc0R6SixTQUEvRSxFQUEwRjtBQUN4RixnQkFBSWtJLElBQUksR0FBR3JZLEVBQUUsQ0FBQ3NZLFdBQUgsQ0FBZSxLQUFLM08sa0JBQUwsQ0FBd0J2RCxhQUF2QyxDQUFYO0FBQ0FpUyxZQUFBQSxJQUFJLENBQUNFLE1BQUwsR0FBYyxLQUFLNU8sa0JBQUwsQ0FBd0J0RCxhQUF0QztBQUNBZ1MsWUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixlQUFsQixFQUFtQzhRLGFBQW5DLENBQWlESixXQUFXLENBQUN6UyxLQUFELENBQVgsQ0FBbUI0SixnQkFBbkIsQ0FBb0NDLGlCQUFwQyxDQUFzRDVTLFVBQXZHO0FBQ0FxUixZQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGVBQWxCLEVBQW1DK1EsWUFBbkMsQ0FBZ0RMLFdBQVcsQ0FBQ3pTLEtBQUQsQ0FBWCxDQUFtQjRKLGdCQUFuQixDQUFvQ0MsaUJBQXBDLENBQXNEekosU0FBdEc7QUFDQWxTLFlBQUFBLGdCQUFnQixDQUFDbVYsSUFBakIsQ0FBc0JpRixJQUF0QjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEtBYkQsTUFhTyxJQUFJb0ssVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQzFCO0FBQ0EsV0FBSyxJQUFJMVMsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUd5UyxXQUFXLENBQUN2UyxNQUF4QyxFQUFnREYsT0FBSyxFQUFyRCxFQUF5RDtBQUN2RCxZQUFJd1MsT0FBTyxDQUFDcFMsU0FBUixJQUFxQnFTLFdBQVcsQ0FBQ3pTLE9BQUQsQ0FBWCxDQUFtQkksU0FBNUMsRUFBdUQ7QUFDckQsY0FBSWtJLElBQUksR0FBR3JZLEVBQUUsQ0FBQ3NZLFdBQUgsQ0FBZSxLQUFLM08sa0JBQUwsQ0FBd0J2RCxhQUF2QyxDQUFYO0FBQ0FpUyxVQUFBQSxJQUFJLENBQUNFLE1BQUwsR0FBYyxLQUFLNU8sa0JBQUwsQ0FBd0J0RCxhQUF0QztBQUNBZ1MsVUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixlQUFsQixFQUFtQzhRLGFBQW5DLENBQWlESixXQUFXLENBQUN6UyxPQUFELENBQVgsQ0FBbUIvSSxVQUFwRTtBQUNBcVIsVUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixlQUFsQixFQUFtQytRLFlBQW5DLENBQWdETCxXQUFXLENBQUN6UyxPQUFELENBQVgsQ0FBbUJJLFNBQW5FO0FBQ0FsUyxVQUFBQSxnQkFBZ0IsQ0FBQ21WLElBQWpCLENBQXNCaUYsSUFBdEI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsUUFBSW5CLFdBQUosRUFBaUI7QUFDZixXQUFLdk4sa0JBQUwsQ0FBd0I3RSxVQUF4QixDQUFtQzZILE1BQW5DLEdBQTRDLEtBQTVDO0FBQ0EsV0FBS2hELGtCQUFMLENBQXdCNUUsa0JBQXhCLENBQTJDNEgsTUFBM0MsR0FBb0QsSUFBcEQ7QUFDRCxLQUhELE1BR087QUFDTCxXQUFLaEQsa0JBQUwsQ0FBd0I3RSxVQUF4QixDQUFtQzZILE1BQW5DLEdBQTRDLElBQTVDO0FBQ0EsV0FBS2hELGtCQUFMLENBQXdCNUUsa0JBQXhCLENBQTJDNEgsTUFBM0MsR0FBb0QsS0FBcEQ7QUFDRDtBQUNGLEdBbHJFOEI7QUFvckUvQm1XLEVBQUFBLG1DQXByRStCLGlEQW9yRU87QUFDcEMsU0FBSyxJQUFJL1MsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUc5UixnQkFBZ0IsQ0FBQ2dTLE1BQTdDLEVBQXFERixLQUFLLEVBQTFELEVBQThEO0FBQzVEOVIsTUFBQUEsZ0JBQWdCLENBQUM4UixLQUFELENBQWhCLENBQXdCK0osT0FBeEI7QUFDRDs7QUFDRDdiLElBQUFBLGdCQUFnQixHQUFHLEVBQW5CO0FBQ0QsR0F6ckU4QjtBQTJyRS9COGtCLEVBQUFBLHVCQTNyRStCLHFDQTJyRUw7QUFDeEIsU0FBS1osb0NBQUwsQ0FBMEMsS0FBMUM7QUFDRCxHQTdyRThCO0FBK3JFL0JhLEVBQUFBLG9DQS9yRStCLGtEQStyRVE7QUFDckMsU0FBS2Isb0NBQUwsQ0FBMEMsS0FBMUM7QUFDQXBrQixJQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRGtILGdCQUFwRDtBQUNELEdBbHNFOEI7QUFvc0UvQnlPLEVBQUFBLHNDQXBzRStCLGtEQW9zRVF2SixJQXBzRVIsRUFvc0VjO0FBQzNDLFFBQUk2SSxPQUFPLEdBQUd4a0Isd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEdUcsV0FBOUQsR0FBNEVrRyxnQkFBNUUsQ0FBNkZDLGlCQUEzRztBQUNBLFNBQUtqUSxrQkFBTCxDQUF3Qm5ELGtCQUF4QixDQUEyQzdELE1BQTNDLEdBQW9ELGNBQXBEO0FBQ0EsU0FBS2dILGtCQUFMLENBQXdCbEQsaUJBQXhCLENBQTBDOUQsTUFBMUMsR0FBbUQsTUFBTTRmLE9BQU8sQ0FBQy9ULElBQWpFO0FBQ0EsU0FBSzdFLGtCQUFMLENBQXdCakQsdUJBQXhCLENBQWdEL0QsTUFBaEQsR0FBeUQ0ZixPQUFPLENBQUN2YixVQUFqRTtBQUNBLFNBQUsyQyxrQkFBTCxDQUF3QmhELHFCQUF4QixDQUE4Q2hFLE1BQTlDLEdBQXVEK1csSUFBdkQ7QUFDRCxHQTFzRThCO0FBMnNFL0I7QUFFQTtBQUNBd0osRUFBQUEsa0NBOXNFK0IsOENBOHNFSXhXLE1BOXNFSixFQThzRVk7QUFDekMsU0FBS2pDLHVCQUFMLENBQTZCa0MsTUFBN0IsR0FBc0NELE1BQXRDO0FBQ0QsR0FodEU4QjtBQWt0RS9CeVcsRUFBQUEsK0JBbHRFK0IsMkNBa3RFQ0MsVUFsdEVELEVBa3RFYUMsWUFsdEViLEVBa3RFMkI7QUFDeEQsU0FBS3ZaLHFCQUFMLENBQTJCL0MsU0FBM0IsQ0FBcUNwRSxNQUFyQyxHQUE4Q3lnQixVQUE5QztBQUNBLFNBQUt0WixxQkFBTCxDQUEyQmxDLGlCQUEzQixDQUE2Q2pGLE1BQTdDLEdBQXNEMGdCLFlBQXREO0FBQ0QsR0FydEU4QjtBQXV0RS9CQyxFQUFBQSxnQ0F2dEUrQiw4Q0F1dEVJO0FBQ2pDLFNBQUtDLG1DQUFMO0FBQ0EsU0FBS0wsa0NBQUwsQ0FBd0MsS0FBeEM7QUFDRCxHQTF0RThCO0FBNHRFL0JNLEVBQUFBLDhDQTV0RStCLDREQTR0RWtCO0FBQy9DLFNBQUtELG1DQUFMO0FBQ0EsU0FBS0wsa0NBQUwsQ0FBd0MsS0FBeEM7QUFDQW5sQixJQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRGtILGdCQUFwRDtBQUNELEdBaHVFOEI7QUFrdUUvQitPLEVBQUFBLG1DQWx1RStCLGlEQWt1RU87QUFDcEMsU0FBSyxJQUFJeFQsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUczUix5QkFBeUIsQ0FBQzZSLE1BQXRELEVBQThERixLQUFLLEVBQW5FLEVBQXVFO0FBQ3JFM1IsTUFBQUEseUJBQXlCLENBQUMyUixLQUFELENBQXpCLENBQWlDK0osT0FBakM7QUFDRDs7QUFDRDFiLElBQUFBLHlCQUF5QixHQUFHLEVBQTVCO0FBQ0QsR0F2dUU4QjtBQXd1RS9CcWxCLEVBQUFBLHFDQXh1RStCLGlEQXd1RU9yTCxTQXh1RVAsRUF3dUVrQnNMLGFBeHVFbEIsRUF3dUVpQztBQUM5RCxTQUFLLElBQUkzVCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3FJLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUJ6QixNQUFuRCxFQUEyREYsS0FBSyxFQUFoRSxFQUFvRTtBQUNsRSxVQUFJMUIsUUFBUSxDQUFDK0osU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCSCxZQUEvQixDQUFSLElBQXdEOFQsYUFBNUQsRUFBMkU7QUFDekUsWUFBSXJMLElBQUksR0FBR3JZLEVBQUUsQ0FBQ3NZLFdBQUgsQ0FBZSxLQUFLeE8scUJBQUwsQ0FBMkJqQyxjQUExQyxDQUFYO0FBQ0F3USxRQUFBQSxJQUFJLENBQUNFLE1BQUwsR0FBYyxLQUFLek8scUJBQUwsQ0FBMkJ6RCxhQUF6QztBQUNBZ1MsUUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0N0RyxlQUFwQztBQUNBNk0sUUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MwRyxPQUFwQyxDQUE0Q0osU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCaUIsWUFBMUU7QUFDQXFILFFBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DMkcsT0FBcEMsQ0FBNENMLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QmUsdUJBQTFFO0FBQ0F1SCxRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQzRHLGdCQUFwQyxDQUFxRDNJLEtBQXJEO0FBRUEsWUFBSTRJLGVBQWUsR0FBR1AsU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCNkksYUFBOUIsQ0FBNEMzSSxNQUFsRTs7QUFFQSxZQUFJNUIsUUFBUSxDQUFDK0osU0FBUyxDQUFDMUcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCSCxZQUEvQixDQUFSLElBQXdELENBQTVELEVBQStEO0FBQzdEeUksVUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MrRyxlQUFwQyxDQUFvRCxDQUFwRDtBQUNBUixVQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ2dILE9BQXBDLENBQTRDLFlBQTVDO0FBQ0FULFVBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DaUgsZ0JBQXBDLENBQXFELEtBQXJEO0FBQ0FWLFVBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9Da0gscUJBQXBDLENBQTBELEtBQTFEO0FBQ0QsU0FMRCxNQUtPLElBQUkzSyxRQUFRLENBQUMrSixTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJILFlBQS9CLENBQVIsSUFBd0QsQ0FBNUQsRUFBK0Q7QUFDcEV5SSxVQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQytHLGVBQXBDLENBQW9ELENBQXBEO0FBQ0FSLFVBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DZ0gsT0FBcEMsQ0FBNEMsZ0JBQTVDOztBQUNBLGNBQUlHLG1CQUFtQixHQUFHTixlQUFlLEdBQUcsS0FBNUM7O0FBQ0EsY0FBSU8sWUFBWSxHQUFHLFFBQVFELG1CQUEzQjs7QUFDQVosVUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NpSCxnQkFBcEMsQ0FBcURHLFlBQXJEO0FBQ0FiLFVBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9Da0gscUJBQXBDLENBQTBERSxZQUExRDtBQUNEOztBQUVEYixRQUFBQSxJQUFJLENBQUN2RyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQ3FILFVBQXBDLENBQStDZixTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEI5TixVQUE3RTtBQUNBb1csUUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NzSCxZQUFwQyxDQUFpRGhCLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QjZJLGFBQTlCLENBQTRDM0ksTUFBN0Y7O0FBRUEsWUFBSW1JLFNBQVMsQ0FBQzFHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QnNKLGFBQTlCLElBQStDLElBQW5ELEVBQXlEO0FBQ3ZEaEIsVUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0N3SCx1QkFBcEMsQ0FBNEQsS0FBNUQ7QUFDQWpCLFVBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DeUgsY0FBcEMsQ0FBbURuQixTQUFTLENBQUMxRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJ5SixXQUFqRjtBQUNELFNBSEQsTUFHTztBQUNMbkIsVUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0N3SCx1QkFBcEMsQ0FBNEQsSUFBNUQ7QUFDQWpCLFVBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DeUgsY0FBcEMsQ0FBbUQsTUFBbkQ7QUFDRDs7QUFFRG5iLFFBQUFBLHlCQUF5QixDQUFDZ1YsSUFBMUIsQ0FBK0JpRixJQUEvQjtBQUNEO0FBQ0Y7QUFDRixHQWh4RThCO0FBa3hFL0JzTCxFQUFBQSxnREFseEUrQiw0REFreEVrQnZQLFlBbHhFbEIsRUFreEV3Q3dQLGlCQWx4RXhDLEVBa3hFbUU7QUFBQSxRQUFqRHhQLFlBQWlEO0FBQWpEQSxNQUFBQSxZQUFpRCxHQUFsQyxLQUFrQztBQUFBOztBQUFBLFFBQTNCd1AsaUJBQTJCO0FBQTNCQSxNQUFBQSxpQkFBMkIsR0FBUCxLQUFPO0FBQUE7O0FBQ2hHLFNBQUtMLG1DQUFMOztBQUNBLFFBQUlwTCxRQUFRLEdBQUdwYSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl3SSxZQUFZLEdBQUdxQyxRQUFRLENBQUN2RCxhQUFULEVBQW5COztBQUNBLFFBQUl3RCxTQUFTLEdBQUdELFFBQVEsQ0FBQ25JLGNBQVQsQ0FBd0I4RixZQUF4QixDQUFoQjtBQUNBLFNBQUtxTiwrQkFBTCxDQUFxQyxVQUFyQyxFQUFpRCx3RkFBakQ7QUFDQSxTQUFLRCxrQ0FBTCxDQUF3QyxJQUF4QztBQUNBLFNBQUtwWixxQkFBTCxDQUEyQjlDLFVBQTNCLENBQXNDckUsTUFBdEMsR0FBK0N5VixTQUFTLENBQUNwUixVQUF6RDtBQUNBLFNBQUs4QyxxQkFBTCxDQUEyQjdDLFVBQTNCLENBQXNDdEUsTUFBdEMsR0FBK0MsTUFBTXlWLFNBQVMsQ0FBQzVKLElBQS9EOztBQUVBLFFBQUlvVixpQkFBSixFQUF1QjtBQUNyQixXQUFLSCxxQ0FBTCxDQUEyQ3JMLFNBQTNDLEVBQXNELENBQXREO0FBQ0Q7O0FBRUQsUUFBSWhFLFlBQUosRUFBa0I7QUFDaEIsV0FBS3FQLHFDQUFMLENBQTJDckwsU0FBM0MsRUFBc0QsQ0FBdEQ7QUFDRDtBQUNGLEdBbnlFOEI7QUFveUUvQjtBQUVBO0FBQ0F5TCxFQUFBQSxrQ0F2eUUrQiw4Q0F1eUVJblgsTUF2eUVKLEVBdXlFWTtBQUN6QyxTQUFLOUIsMkJBQUwsQ0FBaUMrQixNQUFqQyxHQUEwQ0QsTUFBMUM7QUFDRCxHQXp5RThCO0FBMnlFL0JvWCxFQUFBQSxzQ0EzeUUrQixrREEyeUVRdkIsT0EzeUVSLEVBMnlFaUJDLFdBM3lFakIsRUEyeUU4QnRMLFdBM3lFOUIsRUEyeUUyQ3VMLFVBM3lFM0MsRUEyeUUyRDtBQUFBLFFBQWhCQSxVQUFnQjtBQUFoQkEsTUFBQUEsVUFBZ0IsR0FBSCxDQUFHO0FBQUE7O0FBQ3hGLFNBQUsxWSx1QkFBTCxDQUE2QmxHLFVBQTdCLENBQXdDbEIsTUFBeEMsR0FBaUQsZUFBakQ7QUFDQSxTQUFLb0gsdUJBQUwsQ0FBNkJ2RixTQUE3QixDQUF1QzdCLE1BQXZDLEdBQWdELE1BQU00ZixPQUFPLENBQUMvVCxJQUE5RDtBQUNBLFNBQUt6RSx1QkFBTCxDQUE2QnRGLGVBQTdCLENBQTZDOUIsTUFBN0MsR0FBc0Q0ZixPQUFPLENBQUN2YixVQUE5RDtBQUNBLFNBQUsrQyx1QkFBTCxDQUE2QjVELGlCQUE3QixDQUErQ3hELE1BQS9DLEdBQXdELG9CQUFvQjVFLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVDLE1BQS9JOztBQUVBLFFBQUl3UyxVQUFVLElBQUksQ0FBbEIsRUFBcUI7QUFDbkIsV0FBSyxJQUFJMVMsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd5UyxXQUFXLENBQUN2UyxNQUF4QyxFQUFnREYsS0FBSyxFQUFyRCxFQUF5RDtBQUN2RCxZQUFJeVMsV0FBVyxDQUFDelMsS0FBRCxDQUFYLENBQW1CNEosZ0JBQW5CLENBQW9DK0ksY0FBcEMsQ0FBbURDLFVBQW5ELElBQWlFLEtBQXJFLEVBQTRFO0FBQzFFO0FBQ0EsY0FBSUosT0FBTyxDQUFDcFMsU0FBUixJQUFxQnFTLFdBQVcsQ0FBQ3pTLEtBQUQsQ0FBWCxDQUFtQjRKLGdCQUFuQixDQUFvQ0MsaUJBQXBDLENBQXNEekosU0FBL0UsRUFBMEY7QUFDeEYsZ0JBQUlrSSxJQUFJLEdBQUdyWSxFQUFFLENBQUNzWSxXQUFILENBQWUsS0FBS3ZPLHVCQUFMLENBQTZCM0QsYUFBNUMsQ0FBWDtBQUNBaVMsWUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBS3hPLHVCQUFMLENBQTZCMUQsYUFBM0M7QUFDQWdTLFlBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZUFBbEIsRUFBbUM4USxhQUFuQyxDQUFpREosV0FBVyxDQUFDelMsS0FBRCxDQUFYLENBQW1CNEosZ0JBQW5CLENBQW9DQyxpQkFBcEMsQ0FBc0Q1UyxVQUF2RztBQUNBcVIsWUFBQUEsSUFBSSxDQUFDdkcsWUFBTCxDQUFrQixlQUFsQixFQUFtQytRLFlBQW5DLENBQWdETCxXQUFXLENBQUN6UyxLQUFELENBQVgsQ0FBbUI0SixnQkFBbkIsQ0FBb0NDLGlCQUFwQyxDQUFzRHpKLFNBQXRHO0FBQ0FqUyxZQUFBQSx1QkFBdUIsQ0FBQ2tWLElBQXhCLENBQTZCaUYsSUFBN0I7QUFDRDtBQUNGO0FBQ0Y7QUFDRixLQWJELE1BYU8sSUFBSW9LLFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUMxQjtBQUNBLFdBQUssSUFBSTFTLE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHeVMsV0FBVyxDQUFDdlMsTUFBeEMsRUFBZ0RGLE9BQUssRUFBckQsRUFBeUQ7QUFDdkQsWUFBSXdTLE9BQU8sQ0FBQ3BTLFNBQVIsSUFBcUJxUyxXQUFXLENBQUN6UyxPQUFELENBQVgsQ0FBbUJJLFNBQTVDLEVBQXVEO0FBQ3JELGNBQUlrSSxJQUFJLEdBQUdyWSxFQUFFLENBQUNzWSxXQUFILENBQWUsS0FBS3ZPLHVCQUFMLENBQTZCM0QsYUFBNUMsQ0FBWDtBQUNBaVMsVUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBS3hPLHVCQUFMLENBQTZCMUQsYUFBM0M7QUFDQWdTLFVBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZUFBbEIsRUFBbUM4USxhQUFuQyxDQUFpREosV0FBVyxDQUFDelMsT0FBRCxDQUFYLENBQW1CL0ksVUFBcEU7QUFDQXFSLFVBQUFBLElBQUksQ0FBQ3ZHLFlBQUwsQ0FBa0IsZUFBbEIsRUFBbUMrUSxZQUFuQyxDQUFnREwsV0FBVyxDQUFDelMsT0FBRCxDQUFYLENBQW1CSSxTQUFuRTtBQUNBalMsVUFBQUEsdUJBQXVCLENBQUNrVixJQUF4QixDQUE2QmlGLElBQTdCO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFFBQUluQixXQUFKLEVBQWlCO0FBQ2YsV0FBS25OLHVCQUFMLENBQTZCakYsVUFBN0IsQ0FBd0M2SCxNQUF4QyxHQUFpRCxLQUFqRDtBQUNBLFdBQUs1Qyx1QkFBTCxDQUE2QmhGLGtCQUE3QixDQUFnRDRILE1BQWhELEdBQXlELElBQXpEO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsV0FBSzVDLHVCQUFMLENBQTZCakYsVUFBN0IsQ0FBd0M2SCxNQUF4QyxHQUFpRCxJQUFqRDtBQUNBLFdBQUs1Qyx1QkFBTCxDQUE2QmhGLGtCQUE3QixDQUFnRDRILE1BQWhELEdBQXlELEtBQXpEO0FBQ0Q7QUFDRixHQWwxRThCO0FBbzFFL0JvWCxFQUFBQSxzQ0FwMUUrQixvREFvMUVVO0FBQ3ZDLFNBQUssSUFBSWhVLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHN1IsdUJBQXVCLENBQUMrUixNQUFwRCxFQUE0REYsS0FBSyxFQUFqRSxFQUFxRTtBQUNuRTdSLE1BQUFBLHVCQUF1QixDQUFDNlIsS0FBRCxDQUF2QixDQUErQitKLE9BQS9CO0FBQ0Q7O0FBQ0Q1YixJQUFBQSx1QkFBdUIsR0FBRyxFQUExQjtBQUNELEdBejFFOEI7QUEyMUUvQjhsQixFQUFBQSwwQkEzMUUrQix3Q0EyMUVGO0FBQzNCLFNBQUtILGtDQUFMLENBQXdDLEtBQXhDO0FBQ0QsR0E3MUU4QjtBQSsxRS9CSSxFQUFBQSx1Q0EvMUUrQixxREErMUVXO0FBQ3hDLFNBQUtKLGtDQUFMLENBQXdDLEtBQXhDO0FBQ0E5bEIsSUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RrSCxnQkFBcEQ7QUFDRCxHQWwyRThCO0FBbzJFL0I7QUFFQTNGLEVBQUFBLFNBQVMsRUFBRSxtQkFBVXFWLE9BQVYsRUFBbUJDLElBQW5CLEVBQTRDQyxVQUE1QyxFQUErRDtBQUFBOztBQUFBLFFBQTVDRCxJQUE0QztBQUE1Q0EsTUFBQUEsSUFBNEMsR0FBckM3a0IsZ0JBQXFDO0FBQUE7O0FBQUEsUUFBbkI4a0IsVUFBbUI7QUFBbkJBLE1BQUFBLFVBQW1CLEdBQU4sSUFBTTtBQUFBOztBQUN4RSxTQUFLcGEsT0FBTCxDQUFhMkMsTUFBYixHQUFzQixJQUF0QjtBQUNBLFNBQUsxQyxZQUFMLENBQWtCdEgsTUFBbEIsR0FBMkJ1aEIsT0FBM0I7QUFDQSxRQUFJRyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxRQUFJQyxJQUFJLEdBQUd2bUIsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThENEYsZUFBOUQsRUFBWDs7QUFFQSxRQUFJd1IsSUFBSSxJQUFJLENBQVosRUFBZTtBQUNiO0FBQ0EsVUFBSXZtQix3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDBDLGNBQXBELENBQW1FQyxNQUFuRSxHQUE0RSxDQUE1RSxJQUFpRmxTLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EMEMsY0FBcEQsQ0FBbUVqUyx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHNILGFBQXBELEVBQW5FLEVBQXdJVSxLQUE3TixFQUFvTztBQUNsTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBS3BMLGFBQUwsQ0FBbUJ5QyxNQUFuQixHQUE0QixLQUE1QjtBQUNBVSxRQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNyQmdYLFVBQUFBLFNBQVMsQ0FBQ3JhLE9BQVYsQ0FBa0IyQyxNQUFsQixHQUEyQixLQUEzQjtBQUNELFNBRlMsRUFFUHdYLElBRk8sQ0FBVixDQVZrTyxDQWFsTztBQUNELE9BZEQsTUFjTztBQUNMLFlBQUlDLFVBQUosRUFBZ0I7QUFDZCxlQUFLbGEsYUFBTCxDQUFtQnlDLE1BQW5CLEdBQTRCLElBQTVCO0FBQ0E4SSxVQUFBQSxZQUFZLENBQUN0VyxVQUFELENBQVo7QUFDQUEsVUFBQUEsVUFBVSxHQUFHa08sVUFBVSxDQUFDLFlBQU07QUFDNUIsWUFBQSxNQUFJLENBQUNrWCxhQUFMO0FBQ0QsV0FGc0IsRUFFcEJubEIsb0JBRm9CLENBQXZCO0FBR0QsU0FORCxNQU1PO0FBQ0wsZUFBSzhLLGFBQUwsQ0FBbUJ5QyxNQUFuQixHQUE0QixLQUE1QjtBQUNBVSxVQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNyQmdYLFlBQUFBLFNBQVMsQ0FBQ3JhLE9BQVYsQ0FBa0IyQyxNQUFsQixHQUEyQixLQUEzQjtBQUNELFdBRlMsRUFFUHdYLElBRk8sQ0FBVjtBQUdEO0FBQ0Y7QUFDRixLQTlCRCxDQThCRTtBQTlCRixTQStCSztBQUNILFlBQUlDLFVBQUosRUFBZ0I7QUFDZCxlQUFLbGEsYUFBTCxDQUFtQnlDLE1BQW5CLEdBQTRCLElBQTVCO0FBQ0E4SSxVQUFBQSxZQUFZLENBQUN0VyxVQUFELENBQVo7QUFDQUEsVUFBQUEsVUFBVSxHQUFHa08sVUFBVSxDQUFDLFlBQU07QUFDNUIsWUFBQSxNQUFJLENBQUNrWCxhQUFMO0FBQ0QsV0FGc0IsRUFFcEJubEIsb0JBRm9CLENBQXZCO0FBR0QsU0FORCxNQU1PO0FBQ0wsZUFBSzhLLGFBQUwsQ0FBbUJ5QyxNQUFuQixHQUE0QixLQUE1QjtBQUNBVSxVQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNyQmdYLFlBQUFBLFNBQVMsQ0FBQ3JhLE9BQVYsQ0FBa0IyQyxNQUFsQixHQUEyQixLQUEzQjtBQUNELFdBRlMsRUFFUHdYLElBRk8sQ0FBVjtBQUdEO0FBQ0Y7QUFDRixHQXo1RThCO0FBMjVFL0JJLEVBQUFBLGFBMzVFK0IsMkJBMjVFZjtBQUNkOVYsSUFBQUEsT0FBTyxDQUFDeUcsS0FBUixDQUFjLHVCQUFkO0FBQ0EsU0FBS2xMLE9BQUwsQ0FBYTJDLE1BQWIsR0FBc0IsS0FBdEI7QUFDQThJLElBQUFBLFlBQVksQ0FBQ3RXLFVBQUQsQ0FBWjtBQUNELEdBLzVFOEI7QUFpNkUvQnFsQixFQUFBQSxnQkFBZ0IsRUFBRSwwQkFBVUMsT0FBVixFQUFtQjdSLEtBQW5CLEVBQTBCO0FBQzFDLFNBQUsvSSxhQUFMLENBQW1CckMsWUFBbkIsQ0FBZ0NtRixNQUFoQyxHQUF5QyxJQUF6QztBQUNBLFNBQUs5QyxhQUFMLENBQW1CcEMsV0FBbkIsQ0FBK0I5RSxNQUEvQixHQUF3QzhoQixPQUF4QztBQUNBLFNBQUs1YSxhQUFMLENBQW1CbkMsU0FBbkIsQ0FBNkIvRSxNQUE3QixHQUFzQ2lRLEtBQXRDO0FBQ0QsR0FyNkU4QjtBQXU2RS9COFIsRUFBQUEsY0F2NkUrQiw0QkF1NkVkO0FBQ2YzbUIsSUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEeVgsV0FBOUQ7QUFDRCxHQXo2RThCO0FBMjZFL0I1SCxFQUFBQSxvQkEzNkUrQixnQ0EyNkVWNkgsU0EzNkVVLEVBMjZFQztBQUM5QixRQUFJL1IsS0FBSyxHQUFHOVUsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThENEYsZUFBOUQsRUFBWjs7QUFFQSxRQUFJRCxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNkO0FBQ0EsVUFBSUQsS0FBSyxHQUFHO0FBQUU0TixRQUFBQSxJQUFJLEVBQUVvRTtBQUFSLE9BQVo7QUFDQTdtQixNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDUSwwQkFBbEMsR0FBK0Q0RixVQUEvRCxDQUEwRSxFQUExRSxFQUE4RVQsS0FBOUU7QUFDRCxLQUpELE1BSU8sSUFBSUMsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDckI7QUFDQSxVQUFJLEtBQUs1RyxTQUFULEVBQW9CO0FBQ2xCLFlBQUkyRyxLQUFLLEdBQUc7QUFBRTROLFVBQUFBLElBQUksRUFBRW9FO0FBQVIsU0FBWjtBQUNBN21CLFFBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NRLDBCQUFsQyxHQUErRDRGLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFVCxLQUE5RTtBQUNEO0FBQ0Y7QUFDRjtBQXo3RThCLENBQVQsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lTWFuYWdlciA9IG51bGw7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG52YXIgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG52YXIgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMgPSBbXTtcclxudmFyIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG52YXIgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxudmFyIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgQ2FuY2VsbGVkSUQgPSBbXTtcclxudmFyIFN0YXJ0R2FtZUNhc2ggPSAyMDAwMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxudmFyIEhNQW1vdW50ID0gMDtcclxudmFyIEJNQW1vdW50ID0gMDtcclxudmFyIEJNTG9jYXRpb25zID0gMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbnZhciBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG52YXIgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbnZhciBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxudmFyIFByZXZpb3VzQ2FzaCA9IDA7XHJcbnZhciBUaW1lb3V0UmVmO1xyXG52YXIgQ29tcGxldGlvbldpbmRvd1RpbWUgPSA4MDAwO1xyXG52YXIgTG9uZ01lc3NhZ2VUaW1lID0gNTAwMDtcclxudmFyIFNob3J0TWVzc2FnZVRpbWUgPSAyNTAwO1xyXG52YXIgZ2xvYmFsVHVyblRpbWVyID0gMzA7XHJcbnZhciBQYXlEYXlJbmZvID0gXCJcIjtcclxudmFyIEludmVzdFNlbGxJbmZvID0gXCJcIjtcclxudmFyIFRpbWVyVGltZW91dDtcclxudmFyIERvdWJsZURheUJ1c2luZXNzSEIgPSAwO1xyXG52YXIgRG91YmxlRGF5QnVzaW5lc3NCTSA9IDA7XHJcbnZhciBHaXZlUHJvZml0VXNlcklEID0gXCJcIjtcclxudmFyIFRvdGFsUGF5RGF5ID0gMDtcclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG4vLyB2YXIgU2hvcnRNZXNzYWdlVGltZSA9IDUwOy8vMjUwMFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgYW1vdW50IG9mIGxvYW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIExvYW5BbW91bnRFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBUZW5UaG91c2FuZDogMTAwMDAsXHJcbiAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gIEZvcnR5VGhvdXNhbmQ6IDQwMDAwLFxyXG4gIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gIE90aGVyOiA2LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBjYXNoXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgYnVzaW5lc3MgdHlwZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhck5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIixcclxuICAgIH0sXHJcbiAgICBUaW1lck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHRpbWVyIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5TZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IExvYW5BbW91bnRFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgYWxsIGxhYmVscyBvZiBhbW91bnRzIGluIGxvYW4gVUlcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkIENhc2ggYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaFNjcmVlbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaCBsYWJlbCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZENhc2ggZWRpdEJveCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHVybkRlY2lzaW9uU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlR1cm5EZWNpc2lvblNldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFya2V0aW5nRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgbWFya2V0aW5nIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBHb2xkRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBnb2xkIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTdG9ja0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IHN0b2NrIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byBjYXNoIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4cG5hZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyVGV4dDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclRleHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGxhYmVsIG9mIHRpbWVyIHRleHQgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgICBCbG9ja2VyTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCbG9ja2VyTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBub2RlIG9mIGJsb2NrZXIgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdG9ja0ludmVzdDogMSxcclxuICBHb2xkSW52ZXN0OiAyLFxyXG4gIFN0b2NrU2VsbDogMyxcclxuICBHb2xkU2VsbDogNCxcclxuICBPdGhlcjogNSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RTZWxsVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZSBSZXN1bHQgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIHZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1eU9yU2VsbFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXlPclNlbGwgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXR0b25OYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV0dG9uTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgYnV0dG9uIG5hbWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFN0YXRlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkludmVzdFN0YXRlXCIsXHJcbiAgICAgIHR5cGU6IEludmVzdEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IEludmVzdEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEFtb3VudEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50RWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsbEJ1c2luZXNzVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2VsbFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGF5RGF5VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWROdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxvY2F0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhc3NlZFBheURheUNvdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFBhc3NlZFBheURheUNvdW50TGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTUJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhckJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIE1haW5QYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBNYWluUGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0UGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5SZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuUmVzdWx0UGFuZWxOb2RlIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTY3JlZW5UaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFNjcmVlblRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRTY3JlZW5UaXRsZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2VSZXN1bHQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQnVzaW5lc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEJ1c2luZXNzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNraXBMb2FuQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBMb2FuQnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNraXBMb2FuQnV0dG9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuRm90dGVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkZvdHRlckxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuRm90dGVyTGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlPclNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgT25lUXVlc3Rpb25VSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgT25lUXVlc3Rpb25VSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk9uZVF1ZXN0aW9uVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJEZXRhaWxMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJEZXRhaWxMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERldGFpbHNQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGV0YWlsc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBEZXRhaWxzUHJlZmFiIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIFNjcm9sbENvbnRlbnQgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBub2RlIFdhaXRpbmdTY3JlZW4gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW5MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU2NyZWVuTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbkxhYmVsIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIHF1ZXN0aW9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUmVzdWx0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJlc3VsdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUmVzdWx0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBSZXN1bHRTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0U2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RhdHVzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQm9keUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJvZHlMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzUGF5RGF5U2V0dXBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NQYXlEYXlTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NQYXlEYXlTZXR1cFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlQ29udGVudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlQ29udGVudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckRldGFpbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckRldGFpbExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIERldGFpbHNQcmVmYWIgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgU2Nyb2xsQ29udGVudCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgR2FtZXBsYXlVSU1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGFJbnRhbmNlO1xyXG52YXIgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZTtcclxudmFyIFJlcXVpcmVkQ2FzaDtcclxudmFyIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbi8vdHVybiBkZWNpc2lvbnNcclxudmFyIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG52YXIgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbi8vYnV5b3JzZWxsXHJcbnZhciBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbnZhciBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG52YXIgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG52YXIgRGljZVJlc3VsdDtcclxudmFyIE9uY2VPclNoYXJlO1xyXG52YXIgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbnZhciBIQkRpY2VDb3VudGVyID0gMDtcclxudmFyIEJNRGljZUNvdW50ZXIgPSAwO1xyXG52YXIgTmV4dEhhbGZQYXlEYXkgPSBmYWxzZTtcclxuXHJcbnZhciBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIExvYW5QYXllZCA9IGZhbHNlO1xyXG52YXIgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG52YXIgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lcGxheVVJTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBCdXNpbmVzc1NldHVwRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBCdXNpbmVzc1NldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybkRlY2lzaW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBUdXJuRGVjaXNpb25TZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBJbnZlc3RTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQYXlEYXlVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxsQnVzaW5lc3NVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxsQnVzaW5lc3NVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEludmVzdFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQnV5T3JTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnV5T3JTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IE9uZVF1ZXN0aW9uVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgT25lUXVlc3Rpb25VSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJzaGlwU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUGFydG5lcnNoaXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBQYXJ0bmVyc2hpcFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUmVzdWx0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUmVzdWx0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1BheURheVVJU2V0dXA6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEJ1c2luZXNzUGF5RGF5U2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXNpbmVzc1BheURheVNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RQbGF5ZXJGb3JQcm9maXRVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFBvcFVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSUJ1dHRvbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHNldHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEdhbWVwbGF5VUlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBnYW1lcGxheSB1aSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIERlY2lzaW9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3QgJiBzZWxsIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFBheURheSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxsQnVzaW5lc3Mgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEJ1eU9yU2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc0RvdWJsZVBheVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEJ1c2luZXNzRG91YmxlUGF5IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uU3BhY2VTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvblNwYWNlIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvbkRlY2lzaW9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGVjdFBsYXllckZvclByb2ZpdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBUZW1wRGljZVRleHQ6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsYWJlbCByZWZlcmVuY2UgZm9yIGRpY2VcIixcclxuICAgIH0sXHJcbiAgICBMZWF2ZVJvb21CdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEF2YXRhclNwcml0ZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVzZXRzIHRoaXMgY2xhc3MgZ2xvYmFsIHZhcmlhYmxlcyBhbmQgb3RoZXIgbmVjZXNzYXJ5IGRhdGEgb25Mb2FkXHJcbiAgICoqL1xyXG4gIFJlc2V0QWxsRGF0YSgpIHtcclxuICAgIERvdWJsZURheUJ1c2luZXNzSEIgPSAwO1xyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NCTSA9IDA7XHJcbiAgICBOZXh0SGFsZlBheURheSA9IGZhbHNlO1xyXG4gICAgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICAgIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxuICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzID0gW107XHJcbiAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxuICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMgPSBbXTtcclxuICAgIFBhcnRuZXJTaGlwRGF0YSA9IG51bGw7XHJcbiAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBITUFtb3VudCA9IDA7XHJcbiAgICBCTUFtb3VudCA9IDA7XHJcbiAgICBCTUxvY2F0aW9ucyA9IDA7XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwO1xyXG4gICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0Nhc2ggPSAwO1xyXG4gICAgVGltZW91dFJlZiA9IG51bGw7XHJcbiAgICBHaXZlUHJvZml0VXNlcklEID0gXCJcIjtcclxuICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbiAgICAvL3R1cm4gZGVjaXNpb25zXHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4gICAgLy9idXlvcnNlbGxcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgICBEaWNlUmVzdWx0ID0gMDtcclxuICAgIE9uY2VPclNoYXJlO1xyXG4gICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbiAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBUb3RhbFBheURheSA9IDA7XHJcbiAgICBIQkRpY2VDb3VudGVyID0gMDtcclxuICAgIEJNRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgUGF5RGF5SW5mbyA9IFwiXCI7XHJcbiAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZXNldHMgdHVybiB2YXJpYWJsZXMgZm9yIGdvbGRpbnZlc3QvZ29sZHNvbGQvc3Rva2NpbnZlc3Qvc3RvY2tzb2xkXHJcbiAgICoqL1xyXG4gIFJlc2V0VHVyblZhcmlhYmxlKCkge1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZXMgb2YgY2xhc3MvZXMgbmVlZGVkLlxyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAoIUdhbWVNYW5hZ2VyIHx8IEdhbWVNYW5hZ2VyID09IG51bGwpIEdhbWVNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gdGhpcyBub2RlIGdldHMgYWN0aXZlXHJcbiAgICoqL1xyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gdGhpcyBub2RlIGdldHMgZGVhY3RpdmVcclxuICAgKiovXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIHRoZSBjbGFzcyBpcyBsb2FkZWRcclxuICAgKiovXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcblxyXG4gICAgLy9kZWNsYXJpbmcgbG9jYWwgdmFyaWFibGVzXHJcbiAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Hb2xkU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja0ludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBmYWxzZTtcclxuICAgIHRoaXMuUGF5RGF5Q291bnQgPSAwO1xyXG4gICAgdGhpcy5Eb3VibGVQYXlEYXlDb3VudCA9IDA7XHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gMDtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgIHRoaXMuVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICBUaW1lclRpbWVvdXQgPSBudWxsO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoZmFsc2UpO1xyXG4gIH0sXHJcbiAgLy8jcmVnaW9uIFNwZWN0YXRlIFVJIFNldHVwXHJcbiAgSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAvLyBjb25zb2xlLnRyYWNlKFwiY2xvc2VkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRcIik7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5MZWF2ZVJvb21CdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIE9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbCh0cnVlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSwgNTAwKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnVzaW5lc3NTZXR1cCB3aXRoIGxvYW5cclxuICAvL0J1c2luZXNzIHNldHVwIHVpLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChfc3RhdGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgdGhpcy5Ub2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaDtcclxuICB9LFxyXG5cclxuICBPbkNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKF92YWwpIHtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgT25DbGlja0RvbmVDYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwKGZhbHNlKTtcclxuICAgIHZhciBfZ2FtZWNhc2ggPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCk7XHJcbiAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KHRoaXMuQWRkQ2FzaEFtb3VudCk7XHJcbiAgICBpZiAodGhpcy5BZGRDYXNoQW1vdW50ICE9IG51bGwgJiYgdGhpcy5BZGRDYXNoQW1vdW50ICE9IFwiXCIgJiYgdGhpcy5BZGRDYXNoQW1vdW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAoX2Ftb3VudCA8PSBfZ2FtZWNhc2gpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaC50b1N0cmluZygpO1xyXG4gICAgICAgIF9nYW1lY2FzaCAtPSBfYW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX2dhbWVjYXNoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVXBkYXRlVXNlckRhdGEoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gsIC0xLCAtMSk7XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiQ2FzaCAkXCIgKyB0aGlzLkFkZENhc2hBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZC5cIik7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG8gbm90IGhhdmUgZW5vdWdoIGluIGdhbWUgY2FzaC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSA9IGZhbHNlLCBtb2RlSW5kZXggPSAwLCBfaXNCYW5rcnVwdGVkID0gZmFsc2UsIF9CYW5rcnVwdEFtb3VudCA9IDAsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIC8vY2FsbGVkIGZpcnN0IHRpbWUgZm9ybSBHYW1lTWFuYWdlciBvbmxvYWQgZnVuY3Rpb25cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gX2lzQ2FyZEZ1bmN0aW9uYWxpdHk7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IF9HaXZlbkNhc2g7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoO1xyXG5cclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gX2lzQmFua3J1cHRlZDtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IF9CYW5rcnVwdEFtb3VudDtcclxuXHJcbiAgICBpZiAoX2lzQmFua3J1cHRlZCkgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG5cclxuICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lLCBtb2RlSW5kZXgsIF9pc0JhbmtydXB0ZWQpO1xyXG4gIH0sXHJcbiAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUgPSBmYWxzZSwgbW9kZUluZGV4ID0gMCwgX2lzQmFua3J1cHRlZCA9IGZhbHNlKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXJkRnVuY3Rpb25hbGl0eSA9IG5ldyBHYW1lTWFuYWdlci5DYXJkRGF0YUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoaXNGaXJzdFRpbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBTdGFydEdhbWVDYXNoO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAoKTtcclxuXHJcbiAgICBpZiAoaW5zaWRlR2FtZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IGluZGV4O1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgaWYgKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgICAgICBpZiAoU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gMDtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIFByZXZpb3VzQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IEdpdmVuQ2FzaEJ1c2luZXNzO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZSk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmF2YXRhcklkKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBHZXRPYmpfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuQnVzaW5lc3NTZXR1cERhdGE7XHJcbiAgfSxcclxuICBPbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKG5hbWUpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJVSUQgPSBVSUQ7XHJcbiAgfSxcclxuICBPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgaWYgKGlzTmFOKFVJRCkgfHwgVUlEID09IHVuZGVmaW5lZCkgVUlEID0gMDtcclxuXHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5BdmF0YXJJRCA9IFVJRDtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc05hbWVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBcIlwiO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmU7XHJcbiAgfSxcclxuICBPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQ7XHJcbiAgfSxcclxuICBPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IGFtb3VudDtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBhbW91bnQ7XHJcbiAgfSxcclxuICBDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbHJlYWR5IHRha2VuIGxvYW4gb2YgJFwiICsgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG8gbm90IG5lZWQgbG9hbiwgeW91IGhhdmUgZW5vdWdoIGNhc2ggdG8gYnV5IGN1cnJlbnQgc2VsZWN0ZWQgYnVzaW5lc3MuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgUmVxdWlyZWRDYXNoID0gTWF0aC5hYnMocGFyc2VJbnQoUGxheWVyRGF0YUludGFuY2UuQ2FzaCkgLSBhbW91bnQpO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIiRcIiArIFJlcXVpcmVkQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXBcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCg1MDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGJ1c2luZXNzIGJldHdlZW4gSG9tZSBCYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuICBIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaW5kZXggPT0gaSkgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5PdGhlcjtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDApO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlblRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMSk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGVudHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDIpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRoaXJ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMyk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uRm9ydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDQpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZpZnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg1KTtcclxuICB9LFxyXG4gIE9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPT0gTG9hbkFtb3VudEVudW0uT3RoZXIpIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IFJlcXVpcmVkQ2FzaDtcclxuICAgIGVsc2UgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gcGFyc2VJbnQodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50KTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IHRydWU7XHJcbiAgICB0aGlzLk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICsgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICB9LFxyXG5cclxuICBQdXNoRGF0YUZvclBsYXllckxlZnQoX2RhdGEpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IDIwMDAwO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuUGxheWVySUQgPSBfZGF0YS51c2VySUQ7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lID0gX2RhdGEubmFtZTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkF2YXRhcklEID0gMDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA9IDE7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQ2FyZEZ1bmN0aW9uYWxpdHkgPSBuZXcgR2FtZU1hbmFnZXIuQ2FyZERhdGFGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPSBcIlNhbG9vblwiO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPSBcIkV2YSBCZWF1dHlcIjtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMSwgX3BsYXllckRhdGFJbnRhbmNlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIFN5bmNEYXRhOiBmdW5jdGlvbiAoX2RhdGEsIF9JRCwgX3BsYXllckxlZnQgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9pc1NwZWN0YXRlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdO1xyXG5cclxuICAgIGlmIChfaXNTcGVjdGF0ZSkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFJlYWxBY3RvcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9wbGF5ZXJMZWZ0KSB7XHJcbiAgICAgIGlmIChfSUQgIT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmFjdG9yTnIpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoID49IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycykge1xyXG4gICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCB0cnVlLCB0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFB1cmNoYXNlQnVzaW5lc3M6IGZ1bmN0aW9uIChfYW1vdW50LCBfYnVzaW5lc3NOYW1lLCBfaXNIb21lQmFzZWQpIHtcclxuICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIDwgX2Ftb3VudCAmJiAhU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiICsgX2J1c2luZXNzTmFtZSArIFwiIGJ1c2luZXNzLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9pc0hvbWVCYXNlZCkge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPCAzKSB7XHJcbiAgICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJSZXZlcnRpbmcgYmFjayBsb2FuIGFtb3VudC5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Jc0JhbmtydXB0ID0gdHJ1ZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQmFua3J1cHRBbW91bnQgPSB0aGlzLkJhbmtydXB0ZWRBbW91bnQ7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAvL3NldHRpbmcgcGxheWVyIGN1cnJlbnQgZGF0YSBpbiBjdXN0b20gcHJvcGVydGllcyB3aGVuIGhpcy9oZXIgdHVybiBvdmVyc1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IGJhbmtydXB0ZWQ6IHRydWUsIHR1cm46IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCksIFBsYXllckRhdGFNYWluOiBQbGF5ZXJEYXRhSW50YW5jZSB9IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg5LCBfZGF0YSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIEFJXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICAgIH0sIDE2MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwibm8gbW9kZSBzZWxlY3RlZFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUGF5QW1vdW50VG9QbGF5R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9PSBcIlwiKSB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIHR5cGUuXCIpO1xyXG4gICAgZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPT0gXCJcIikgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyBuYW1lLlwiKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lIHx8IFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBhIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgaG9tZWJhc3NlZFxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCwgXCJob21lXCIsIHRydWUpO1xyXG4gICAgICBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcyg1MDAwMCwgXCJicmljayBhbmQgbW9ydGFyXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlN0YXJ0R2FtZSA9PSB0cnVlIHx8IHRoaXMuSXNCYW5rcnVwdGVkID09IHRydWUpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgaWYgKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwICE9IC0xKSB7XHJcbiAgICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcnRpbnRpbmcgYWxsIHZhbHVlcyB0byBjb25zb2xlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG5hbWU6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgSUQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIklzIHBsYXllciBib3Q6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLklzQm90KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gb2YgYnVzaW5lc3Mgb2YgcGxheWVyIChzZWUgYmVsb3cpOiBcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNhc2g6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkNhc2gpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgdGFrZW4gbG9hbjogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hblRha2VuKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW4gbG9hbiBhbW91bnQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBpc2FjdGl2ZTtcclxuXHJcbiAgICB2YXIgX2FjdGl2ZSA9IGlzYWN0aXZlO1xyXG5cclxuICAgIGlmIChfYWN0aXZlKSB7XHJcbiAgICAgIF9hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkJsb2NrZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlRpbWVyID0gZ2xvYmFsVHVyblRpbWVyO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5UaW1lclRleHQuc3RyaW5nID0gdGhpcy5UaW1lciArIFwiIHNlY29uZHMgYXJlIGxlZnQgdG8gY2hvb3NlIGFib3ZlIG9wdGlvbnMgZXhjZXB0ICdSb2xsIFRoZSBEaWNlJ1wiO1xyXG4gICAgICBjbGVhclRpbWVvdXQoVGltZXJUaW1lb3V0KTtcclxuICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVyVGltZW91dCk7XHJcbiAgICAgIHRoaXMuVGltZXIgPSAwO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVGltZXIoKSB7XHJcbiAgICBpZiAodGhpcy5UaW1lciA+IDApIHtcclxuICAgICAgdGhpcy5UaW1lciA9IHRoaXMuVGltZXIgLSAxO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IHRoaXMuVGltZXIgKyBcIiBzZWNvbmRzIGFyZSBsZWZ0IHRvIGNob29zZSBhYm92ZSBvcHRpb25zIGV4Y2VwdCAnUm9sbCBUaGUgRGljZSdcIjtcclxuICAgICAgVGltZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lclRpbWVvdXQpO1xyXG4gICAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlRpbWVyVGV4dC5zdHJpbmcgPSBcIlRpbWVyIGlzIG92ZXIsIHlvdSBjYW4gc2VsZWN0IG9ubHkgJ1JvbGwgVGhlIERpY2UnIG5vdy5cIjtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkJsb2NrZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5DYXNoQW1vdW50TGFiZWwuc3RyaW5nID0gXCIkIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLkNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gXCJcIiB8fCBUZW1wTWFya2V0aW5nQW1vdW50ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB0aGlzLm1hcmtldGluZ0Ftb3VudCA9IHBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuXHJcbiAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdGhpcy5tYXJrZXRpbmdBbW91bnQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCArIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgKyBcIiAsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKyBcIi5cIixcclxuICAgICAgICAgIExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGlmIHBsYXllciBoYXMgbW9yZSB0aGFuIDUwMDAkXHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBhbHJlYWR5IGhpcmVkIGEgbGF3eWVyLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIFRlbXBIaXJpbmdMYXd5ZXIgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFRlbXBIaXJpbmdMYXd5ZXIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gNTAwMDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llciwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFwiLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInNvcnJ5LCB5b3UgZG9udCBoYXZlIGVub3VnaCBtb25leSB0byBoaXJlIGEgbGF3eWVyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oX25hbWUpIHtcclxuICAgIExvY2F0aW9uTmFtZSA9IF9uYW1lO1xyXG4gIH0sXHJcbiAgT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGV2ZW50ID0gbnVsbCwgX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgLy9pZiBwbGF5ZXIgaGFzIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgaGUgY291bGQgZXhwYW5kIGl0XHJcbiAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzc1wiKTtcclxuXHJcbiAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBfaXNDYXJkRnVuY3Rpb25hbGl0eTtcclxuICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gX0dpdmVuQ2FzaDtcclxuICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g7XHJcblxyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdmFyIGdlbmVyYXRlZExlbmd0aCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSwgR2l2ZW5DYXNoQnVzaW5lc3MsIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcblxyXG4gICAgaWYgKGdlbmVyYXRlZExlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm8gYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyB0byBleHBhbmQuXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9LCAxNjAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzcyBleGl0IGNhbGxlZFwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgIHRoaXMuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZEludmVzdGVkKSB7XHJcbiAgICAgIHRoaXMuR29sZEludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRJbnZlc3Q7XHJcbiAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcIkludmVzdCBJbiBHT0xEXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIEJVWVwiLCBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiQlVZXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblN0b2NrQnVzaW5lc3NOYW1lQ2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGV2ZW50ID0gbnVsbCwgX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgVHVybk92ZXJGb3JJbnZlc3QgPSBfaXNUdXJuT3ZlcjtcclxuXHJcbiAgICBjb25zb2xlLmVycm9yKF9pc1R1cm5PdmVyKTtcclxuXHJcbiAgICBpZiAoVHVybk92ZXJGb3JJbnZlc3QpIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJGcmllbmQncyBCdXNpbmVzc1wiO1xyXG5cclxuICAgIGlmICghdGhpcy5TdG9ja0ludmVzdGVkIHx8IFR1cm5PdmVyRm9ySW52ZXN0KSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoU3RvY2tCdXNpbmVzc05hbWUgPT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYSBidXNpbmVzcyBuYW1lIHRvIGludmVzdC5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0O1xyXG5cclxuICAgICAgICBpZiAoIVR1cm5PdmVyRm9ySW52ZXN0KSBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIGVsc2UgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG5cclxuICAgICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcIkludmVzdCBpbiBTdG9ja1wiLCBEaWNlUmVzdWx0LCBcIkVhY2ggU2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvc2hhcmVcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBCVVlcIiwgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIkJVWVwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLkdvbGRTb2xkKSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ID4gMCkge1xyXG4gICAgICAgIHRoaXMuR29sZFNvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uR29sZFNlbGw7XHJcbiAgICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcIlNlbGwgR09MRFwiLCBEaWNlUmVzdWx0LCBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBTRUxMXCIsIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiU0VMTFwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IEdPTEQgb3VuY2VzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuU3RvY2tTb2xkKSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLlN0b2NrU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja1NlbGw7XHJcbiAgICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcIlNlbGwgU1RPQ0tcIiwgRGljZVJlc3VsdCwgXCJFYWNoIHNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gU0VMTFwiLCBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIlNFTExcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBzaGFyZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImdvIGludG8gcGFydG5lciBzaGlwXCIpO1xyXG4gICAgLy8gdGhpcy5TaG93VG9hc3QoXCJ3b3JrIGluIHByb2dyZXNzLCBjb21pbmcgc29vbi4uLlwiKTtcclxuICAgIC8vIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gIH0sXHJcblxyXG4gIE9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJyb2xsIHRoZSBkaWNlXCIpO1xyXG4gICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxEaWNlKCk7XHJcbiAgfSxcclxuXHJcbiAgUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIC8vdGhpcy5UZW1wRGljZVRleHQuc3RyaW5nPXZhbHVlO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXJ0bmVyc2hpcCBzZXR1cFxyXG4gIFRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuTWFpblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuV2FpdGluZ1N0YXR1c1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgQ2FuY2VsbGVkSUQgPSBbXTtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBsYXllck5hbWUuc3RyaW5nID0gX3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJDYXNoLnN0cmluZyA9IFwiJFwiICsgX3RlbXBEYXRhLkNhc2g7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGFydG5lclNoaXBQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgdmFyIF90b3RhbExvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgICAgdmFyIF9hbGxMb2NhdGlvbnNBbW91bnQgPSBfdG90YWxMb2NhdGlvbnMgKiAyNTAwMDtcclxuICAgICAgICB2YXIgX2ZpbmFsQW1vdW50ID0gNTAwMDAgKyBfYWxsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLklzUGFydG5lcnNoaXAgPT0gdHJ1ZSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUGFydG5lck5hbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShcIm5vbmVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cChfbXNnKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25QbGF5ZXJDYXNoLnN0cmluZyA9IFwiJFwiICsgX3RlbXBEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvbkRlc2NyaXB0aW9uLnN0cmluZyA9IF9tc2c7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBSZXNldF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cChfZGF0YSkge1xyXG4gICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gdHJ1ZTtcclxuICAgIFBhcnRuZXJTaGlwRGF0YSA9IF9kYXRhO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIF9idXNpbmVzc01vZGUgPSBcIkhvbWUgQmFzZWRcIjtcclxuICAgIGVsc2UgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMikgX2J1c2luZXNzTW9kZSA9IFwiQnJpY2sgJiBNb3J0YXJcIjtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9tc2cgPVxyXG4gICAgICAgIFwieW91IGhhdmUgcmVjZWl2ZWQgcGFydG5lcnNoaXAgb2ZmZXIgYnkgXCIgK1xyXG4gICAgICAgIF9wbGF5ZXJEYXRhLlBsYXllck5hbWUgK1xyXG4gICAgICAgIFwiICwgZm9sbG93aW5nIGFyZSB0aGUgZGV0YWlscyBvZiBidXNpbmVzczogXCIgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgTmFtZTogXCIgK1xyXG4gICAgICAgIF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc05hbWUgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgTW9kZTogXCIgK1xyXG4gICAgICAgIF9idXNpbmVzc01vZGUgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgVmFsdWU6ICRcIiArXHJcbiAgICAgICAgX2J1c2luZXNzVmFsdWUgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQ2FzaCBQYXltZW50OiAkXCIgK1xyXG4gICAgICAgIF9wYXlBbW91bnQgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiaWYgb2ZmZXIgaXMgYWNjZXB0ZWQgeW91IHdpbGwgcmVjZWl2ZSA1MCUgc2hhcmUgb2YgdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzIGFuZCB3aWxsIHJlY2VpdmUgcHJvZml0L2xvc2Ugb24gdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzLlwiO1xyXG5cclxuICAgICAgdGhpcy5FbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfYWxsQWN0b3JzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2RhdGEgPSBQYXJ0bmVyU2hpcERhdGE7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggPj0gX3BheUFtb3VudCkge1xyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggLT0gX3BheUFtb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCh0cnVlLCBfcGF5QW1vdW50LCBmYWxzZSwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlELCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcImNvbmdyYXR1bGF0aW9ucyEgeW91IGhhdmUgc3RhcnRlZCBidXNpbmVzcyBwYXJ0bmVyc2hpcFwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIk5vdCBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiT2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgb3RoZXIgcGxheWVyLlwiKTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDYW5jZWxPZmZlcl9QYXJ0bmVyc2hpcFNldHVwKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChmYWxzZSwgMCwgdHJ1ZSwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlELCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKF9pc0FjY2VwdGVkID0gZmFsc2UsIF9wYXltZW50ID0gMCwgX2lzQ2FuY2VsbGVkID0gZmFsc2UsIF91SUQgPSBcIlwiLCBfZGF0YSA9IG51bGwsIF9idXNpbmVzc0luZGV4ID0gMCkge1xyXG4gICAgdmFyIF9tYWluRGF0YSA9IHsgRGF0YTogeyBBY2NlcHRlZDogX2lzQWNjZXB0ZWQsIENhc2hQYXltZW50OiBfcGF5bWVudCwgQ2FuY2VsbGVkOiBfaXNDYW5jZWxsZWQsIFBsYXllcklEOiBfdUlELCBQbGF5ZXJEYXRhOiBfZGF0YSwgQnVzaW5lc3NJbmRleDogX2J1c2luZXNzSW5kZXggfSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMiwgX21haW5EYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB2YXIgX2FjY2VwdGVkID0gX2RhdGEuRGF0YS5BY2NlcHRlZDtcclxuICAgICAgdmFyIF9jYXNoID0gX2RhdGEuRGF0YS5DYXNoUGF5bWVudDtcclxuICAgICAgdmFyIF9jYW5jZWxsZWQgPSBfZGF0YS5EYXRhLkNhbmNlbGxlZDtcclxuICAgICAgdmFyIF91aWQgPSBfZGF0YS5EYXRhLlBsYXllcklEO1xyXG4gICAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuQnVzaW5lc3NJbmRleDtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYW5zd2VyIHJlY2VpdmVkXCIpO1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfY2FzaDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwID0gdHJ1ZTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVySUQgPSBfdWlkO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJOYW1lID0gX3BsYXllckRhdGEuUGxheWVyTmFtZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgYWNjZXB0ZWRcIik7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgXCIgKyBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICsgXCIsIGNhc2ggJFwiICsgX2Nhc2ggKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGFjY291bnQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBpZiAoQ2FuY2VsbGVkSUQuaW5jbHVkZXMoX3VpZCkgPT0gZmFsc2UpIENhbmNlbGxlZElELnB1c2goX3VpZCk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coQ2FuY2VsbGVkSUQpO1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmxlbmd0aCA9PSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXJ0bmVyc2hpcCBvZmZlciBoYXMgYmVlbiBjYW5jZWxsZWQgYnkgYWxsIG90aGVyIHVzZXJzLlwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIHJlamVjdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiT2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgb3RoZXIgcGxheWVyLlwiKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEludmVzdCBhbmQgc2VsbCBtb2RkdWxlXHJcblxyXG4gIFJlc2V0R29sZElucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkdvbGRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlN0b2NrRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIG9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsKF9hbW91bnQpIHtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IF9hbW91bnQ7XHJcblxyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIipcIiArIEVudGVyQnV5U2VsbEFtb3VudCArIFwiPVwiICsgX2Ftb3VudCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgIHRoaXMuUmVzZXRHb2xkSW5wdXQoKTtcclxuICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9JbnZlc3RTZWxsKF90aXRsZSwgX2RpY2VSZXN1bHQsIF9wcmljZVRpdGxlLCBfcHJpY2VWYWx1ZSwgX2J1eU9yU2VsbFRpdGxlLCBfdG90YWxBbW91bnRUaXRsZSwgX3RvdGFsQW1vdW50VmFsdWUsIF9idXR0b25OYW1lLCBfc3RhdGUpIHtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZVJlc3VsdDtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VUaXRsZUxhYmVsLnN0cmluZyA9IF9wcmljZVRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVZhbHVlTGFiZWwuc3RyaW5nID0gX3ByaWNlVmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1eU9yU2VsbFRpdGxlTGFiZWwuc3RyaW5nID0gX2J1eU9yU2VsbFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFRpdGxlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV0dG9uTmFtZUxhYmVsLnN0cmluZyA9IF9idXR0b25OYW1lO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZURhdGFfSW52ZXN0U2VsbChfdG90YWxBbW91bnRWYWx1ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgfSxcclxuXHJcbiAgQXBwbHlCdXR0b25fSW52ZXN0U2VsbCgpIHtcclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIEludmVzdFNlbGxJbmZvID0gXCJcIjtcclxuXHJcbiAgICAgIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uR29sZEludmVzdCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgIGlmIChfVG90YWxBbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgKz0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIiArIF9hbW91bnQgKyBcIiBvdW5jZXMgb2YgR09MRFwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJCdXlpbmcgR09MRDpcIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBPbmNlT3JTaGFyZSAvIDEwMDAgKyBcIlxcblwiICsgXCJQZXIgT3VuY2UgcHJpY2U6ICRcIiArIE9uY2VPclNoYXJlICsgXCJcXG5cIiArIFwiUHVyY2hhc2VkIE91bmNlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3IgT3VuY2VzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uR29sZFNlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgaWYgKF9hbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50KSB7XHJcbiAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgLT0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTEQgZm9yICAkXCIgKyBfVG90YWxBbW91bnQsIExvbmdNZXNzYWdlVGltZSk7XHJcblxyXG4gICAgICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIlNlbGxpbmcgR09MRDpcIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBPbmNlT3JTaGFyZSAvIDEwMDAgKyBcIlxcblwiICsgXCJQZXIgT3VuY2UgcHJpY2U6ICRcIiArIE9uY2VPclNoYXJlICsgXCJcXG5cIiArIFwiU29sZCBPdW5jZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIE91bmNlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBHT0xEIG91bmNlcywgeW91IG93biBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCArIFwiIG9mIEdPTEQgb3VuY2VzXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja0ludmVzdCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgIGlmIChfVG90YWxBbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICAvL2NhbiBhZGQgbXVsdGlwbGUgc3RvY2tzIHdpdGggYnVzaW5lc3MgbmFtZSBpbiBvYmplY3QgaWYgcmVxdWlyZWRcclxuXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgc2hhcmVzIG9mIGJ1c2luZXNzIFwiICsgU3RvY2tCdXNpbmVzc05hbWUsIExvbmdNZXNzYWdlVGltZSk7XHJcblxyXG4gICAgICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIkJ1eWluZyBTVE9DSzpcIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBPbmNlT3JTaGFyZSAvIDEwMDAgKyBcIlxcblwiICsgXCJQZXIgc2hhcmUgcHJpY2U6ICRcIiArIE9uY2VPclNoYXJlICsgXCJcXG5cIiArIFwiUHVyY2hhc2VkIHNoYXJlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3Igc2hhcmVzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG5cclxuICAgICAgICBpZiAoX2Ftb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50KSB7XHJcbiAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50IC09IF9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIiArIF9hbW91bnQgKyBcIiBzaGFyZXMgb2Ygc3RvY2sgZm9yICAkXCIgKyBfVG90YWxBbW91bnQsIExvbmdNZXNzYWdlVGltZSk7XHJcblxyXG4gICAgICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIlNlbGxpbmcgU1RPQ0s6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIHNoYXJlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlNvbGQgc2hhcmVzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBzaGFyZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggc3RvY2tzIHNoYXJlcywgeW91IG93biBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgKyBcIiBvZiBzdG9jayBzaGFyZXNcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBheWRheSBvciBEb3VibGUgcGF5IERheVxyXG4gIFRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pIHtcclxuICAgIGlmIChITUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEJNQW1vdW50ID09IDApIHtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbG9hblRha2VuKSB7XHJcbiAgICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2V0TG9hbkFtb3VudF9QYXlEYXkoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB2YXIgX2xvYW4gPSAwO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfbG9hbjtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX1BheURheShfdGl0bGUsIF9pc0RvdWJsZVBheURheSA9IGZhbHNlLCBfc2tpcEhNID0gZmFsc2UsIF9za2lwQk0gPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UsIF9mb3JTZWxlY3RlZEJ1c2luZXNzID0gZmFsc2UsIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwLCBfaE1BbW91bnQgPSAwLCBfYm1BbW91bnQgPSAwLCBfYm1Mb2NhdGlvbiA9IDAsIFBheWRheUNvdW50ZXIgPSAxLCBEb3VibGVQYXlDb3VudGVyID0gMCwgX2hhbGZQYXlkYXkgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICBUb3RhbFBheURheSA9IDA7XHJcblxyXG4gICAgR2l2ZVByb2ZpdFVzZXJJRCA9IFwiXCI7XHJcbiAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYW5HaXZlUHJvZml0T25QYXlEYXkpIHtcclxuICAgICAgR2l2ZVByb2ZpdFVzZXJJRCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVXNlcklERm9yUHJvZml0UGF5RGF5O1xyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhbkdpdmVQcm9maXRPblBheURheSA9IGZhbHNlO1xyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlVzZXJJREZvclByb2ZpdFBheURheSA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihHaXZlUHJvZml0VXNlcklEKTtcclxuICAgIGNvbnNvbGUuZXJyb3IoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkpO1xyXG5cclxuICAgIGlmIChHaXZlUHJvZml0VXNlcklEICE9IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdob2xlIHByb2ZpdCB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIG90aGVyIHBsYXllciB0aGlzIHR1cm4uXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIEhCRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgQk1EaWNlQ291bnRlciA9IDA7XHJcbiAgICBOZXh0SGFsZlBheURheSA9IF9oYWxmUGF5ZGF5O1xyXG4gICAgLy8gICBpZiAoRG91YmxlUGF5Q291bnRlciA9PSAwKSBEb3VibGVQYXlDb3VudGVyID0gMTtcclxuXHJcbiAgICAvLyAgaWYgKERvdWJsZVBheURheSkgRG91YmxlUGF5Q291bnRlciA9IERvdWJsZVBheUNvdW50ZXIgKiAyO1xyXG5cclxuICAgIERvdWJsZURheUJ1c2luZXNzSEIgPSAwO1xyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NCTSA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0hCKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0JNKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKERvdWJsZURheUJ1c2luZXNzSEIgPiAwIHx8IERvdWJsZURheUJ1c2luZXNzQk0gPiAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gXCIgKyAoRG91YmxlRGF5QnVzaW5lc3NIQiArIERvdWJsZURheUJ1c2luZXNzQk0pICsgXCIgYnVzaW5lc3MvZXMuXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcmVzID0gUGF5ZGF5Q291bnRlciArIERvdWJsZVBheUNvdW50ZXI7XHJcbiAgICBQYXlEYXlJbmZvID0gXCJQYXlEYXkgUmVzdWx0IHdpdGggbXVsdGlwbGllcjogXCIgKyBfcmVzO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gUGF5ZGF5Q291bnRlcjtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5Q291bnQgPSBEb3VibGVQYXlDb3VudGVyO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gX2lzRG91YmxlUGF5RGF5O1xyXG4gICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdmFyIF90aW1lID0gMTgwMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBfZm9yU2VsZWN0ZWRCdXNpbmVzcztcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9TZWxlY3RlZEJ1c2luZXNzSW5kZXg7XHJcbiAgICBITUFtb3VudCA9IF9oTUFtb3VudDtcclxuICAgIEJNQW1vdW50ID0gX2JtQW1vdW50O1xyXG4gICAgQk1Mb2NhdGlvbnMgPSBfYm1Mb2NhdGlvbjtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChOZXh0SGFsZlBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdpbGwgcmVjZWl2ZSBoYWxmIHByb2ZpdHMgdGhpcyBwYXlkYXkuXCIsIF90aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvYW5UYWtlbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBsb2FuVGFrZW4gPSBfbG9hblRha2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZyA9IEJNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmcgPSBCTUxvY2F0aW9ucztcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5QYXNzZWRQYXlEYXlDb3VudExhYmVsLnN0cmluZyA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICB2YXIgX2xvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICRcIiArIF9sb2FuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJDUwMDBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG5cclxuICAgIGlmIChfc2tpcEJNIHx8IF9za2lwSE0pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgX3RpbWUgKyAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5PbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgaWYgKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcbiAgICAgIHZhciBfaGFsZlBheWRheSA9IE5leHRIYWxmUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG5cclxuICAgICAgaWYgKF9oYWxmUGF5ZGF5KSBfbXVsdGlwbGllciA9IF9tdWx0aXBsaWVyIC8gMjtcclxuXHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG4gICAgICBpZiAoX2RvdWJsZVBheURheSkge1xyXG4gICAgICAgIGlmICh0aGlzLkRvdWJsZVBheURheUNvdW50ICE9IDApIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyICo9IDIgKiB0aGlzLkRvdWJsZVBheURheUNvdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGRvdWJsZVBheURheUFkZGVkID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIERvdWJsZURheUJ1c2luZXNzSEIgKiBfZGljZSAqIDEwMDA7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSBUb3RhbFBheURheUFtb3VudCA9IF9tdWx0aXBsaWVyICogX3BheWRheW11bHRpcGxpZXIgKiBITUFtb3VudCAqIF9kaWNlICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgZWxzZSBUb3RhbFBheURheUFtb3VudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiAoSE1BbW91bnQgKiBfZGljZSkgKiAxMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIEhNQW1vdW50ICsgXCIqXCIgKyBcIjEwMDApLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiK1wiICsgZG91YmxlUGF5RGF5QWRkZWQgKyBcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJIb21lIEJhc2VkIEJ1c2luZXNzOiBcIiArIEhNQW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG4gICAgICB2YXIgX2hhbGZQYXlkYXkgPSBOZXh0SGFsZlBheURheTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9hbW91bnQgPSBCTUFtb3VudCArIEJNTG9jYXRpb25zO1xyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICBpZiAoX2hhbGZQYXlkYXkpIF9tdWx0aXBsaWVyID0gX211bHRpcGxpZXIgLyAyO1xyXG5cclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5Eb3VibGVQYXlEYXlDb3VudCAhPSAwKSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyICogdGhpcy5Eb3VibGVQYXlEYXlDb3VudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgKj0gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkb3VibGVQYXlEYXlBZGRlZCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBEb3VibGVEYXlCdXNpbmVzc0JNICogX2RpY2UgKiAyMDAwO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIFRvdGFsUGF5RGF5QW1vdW50ID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIF9hbW91bnQgKiBfZGljZSAqIDIwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgIGVsc2UgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogKF9hbW91bnQgKiBfZGljZSkgKiAyMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBfYW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKS1cIiArIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBcIitcIiArIGRvdWJsZVBheURheUFkZGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJCcmljayAmIE1vcnRhciBCdXNpbmVzczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2UgX0VzdGltYXRlTG9hbiA9IDUwMDA7XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfRXN0aW1hdGVMb2FuKSB7XHJcbiAgICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlUGF5bWVudF9QYXlEYXkoKSB7XHJcbiAgICAvL2FsbFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTa2lwTG9hbk9uZVRpbWVfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBza2lwcGVkIHRoZSBsb2FuIHBheW1lbnQsIGJhbmsgd2lsbCBjYWxsIHVwb24gY29tcGxldGUgbG9hbiBhbW91bnQgb24gbmV4dCBwYXlkYXlcIik7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1BheURheShfYW1vdW50KSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBFeGl0TG9hblNjcmVlbl9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBTdGFydE5ld0dhbWVfUGF5RGF5KCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0LlwiLCAzMDAwLCBmYWxzZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU2hvd0NhcmRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgMzAxMCk7XHJcbiAgfSxcclxuXHJcbiAgU2hvd0luZm8oX2RhdGEpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KF9kYXRhLmluZm8sIDIwMDAsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIFBheURheUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChIb21lQmFzZWRQYXltZW50Q29tcGxldGVkICYmIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCAmJiBMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBheWRheSBkb25lXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKEdpdmVQcm9maXRVc2VySUQgIT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91ciB3aG9sZSBQYXlkYXkgYW1vdW50ICRcIiArIFRvdGFsUGF5RGF5ICsgXCIgd2lsbCBiZSB0cmFuc2ZlcnJlZCB0byBvdGhlciBwbGF5ZXIgbm93LlwiLCAyMjAwKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUGF5RGF5O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKFRvdGFsUGF5RGF5LCBHaXZlUHJvZml0VXNlcklEKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDb21wbGV0aW9uKCk7XHJcbiAgICAgICAgfSwgMzIwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ29tcGxldGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudEZvckNvbXBsZXRpb24oKSB7XHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZUhhbGZQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhQYXlEYXlJbmZvKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU2VsbCAmIG1hbmlwdWxhdGUgQnVzaW5lc3MgVUlcclxuICBUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcblxyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJTRUxMXCI7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NTZWxsUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuU2Nyb2xsQ29udGVudE5vZGU7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPT0gMCkgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICBlbHNlIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKHRydWUpO1xyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcblxyXG4gICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJCVVNJTkVTU1wiO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nID0gXCJObyBvZiBCdXNpbmVzc2VzIDogXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuU2Nyb2xsQ29udGVudE5vZGU7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZWxlY3RCdXNpbmVzc2ZvclBheURheSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAvLyAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKGZhbHNlKTtcclxuICAgICAgLy8gZWxzZVxyXG4gICAgICAvLyAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKHRydWUpO1xyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzVHVybm92ZXIgPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9pc0JvdCkgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuXHJcbiAgICB0aGlzLlNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc0JvdCk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IFVJXHJcbiAgVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIklOVkVTVFwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnV5T1JTZWxsIFVJXHJcbiAgVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVWSBPUiBTRUxMXCI7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBPbmUgUXVlc3Rpb24gc2V0dXAgVWlcclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TcGFjZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5XYWl0aW5nU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTaG93UXVlc3Rpb25Ub2FzdChfbXNnKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5XYWl0aW5nU2NyZWVuTGFiZWwuc3RyaW5nID0gX21zZztcclxuICB9LFxyXG5cclxuICBTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLCBfYWN0b3JzRGF0YSwgX2lzVHVybk92ZXIsIF9tb2RlSW5kZXggPSAwKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nID0gXCJObyBvZiBQbGF5ZXJzOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgaWYgKF9tb2RlSW5kZXggPT0gMikge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGlzIHNwZWN0YXRlIG9yIG5vdCwgZG9udCBhZGQgYW55IHNwZWN0YXRlc1xyXG4gICAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGVJbmRleCA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9uZVF1ZXN0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIG9uZVF1ZXN0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFeGl0X09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9tc2cpIHtcclxuICAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25RdWVzdGlvbkxhYmVsLnN0cmluZyA9IF9tc2c7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGVjdCBCdXNpbmVzcyBvZnIgZG91YmxlIHBheWRheSBzZXR1cFxyXG4gIFRvZ2dsZVNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzRG91YmxlUGF5U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFZGl0VGl0bGVfQnVzaW5lc3NQYXlEYXlVSVNldHVwKF9tYWluVGl0bGUsIF90aWxlQ29udGVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuVGl0bGVOYW1lLnN0cmluZyA9IF9tYWluVGl0bGU7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5UaXRsZUNvbnRlbnRMYWJlbC5zdHJpbmcgPSBfdGlsZUNvbnRlbnQ7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAoKSB7XHJcbiAgICB0aGlzLkNsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTY3JlZW5fQWxvbmdUdXJuT3Zlcl9CdXNpbmVzc1BheURheVVJU2V0dXAoKSB7XHJcbiAgICB0aGlzLkNsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICBDbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbFBheURheU5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbFBheURheU5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBidXNpbmVzc0RldGFpbFBheURheU5vZGVzID0gW107XHJcbiAgfSxcclxuICBQcm9jZXNzQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKF90ZW1wRGF0YSwgX2J1c2luZXNzVHlwZSkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IF9idXNpbmVzc1R5cGUpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLkJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICAgIHZhciBfdG90YWxMb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgICAgIHZhciBfYWxsTG9jYXRpb25zQW1vdW50ID0gX3RvdGFsTG9jYXRpb25zICogMjUwMDA7XHJcbiAgICAgICAgICB2YXIgX2ZpbmFsQW1vdW50ID0gNTAwMDAgKyBfYWxsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLklzUGFydG5lcnNoaXAgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlBhcnRuZXJOYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoXCJub25lXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2VsZXRpdmVEb3VibGVQYXlEYXlfQnVzaW5lc3NQYXlEYXlVSVNldHVwKF9pc0hvbWVCYXNlZCA9IGZhbHNlLCBfaXNCcmlja0FuZE1vcnRhciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLkNsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICB0aGlzLkVkaXRUaXRsZV9CdXNpbmVzc1BheURheVVJU2V0dXAoXCJCVVNJTkVTU1wiLCBcIipTZWxlY3QgYSBidXNpbmVzcyB0byByZWNlaXZlIGRvdWJsZSBwYXlkYXkgcHJvZml0cyB0aHJvdWdoIG91dCBnYW1lIG9uIHRoYXQgYnVzaW5lc3MuXCIpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuUGxheWVyTmFtZS5zdHJpbmcgPSBfdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlBsYXllckNhc2guc3RyaW5nID0gXCIkXCIgKyBfdGVtcERhdGEuQ2FzaDtcclxuXHJcbiAgICBpZiAoX2lzQnJpY2tBbmRNb3J0YXIpIHtcclxuICAgICAgdGhpcy5Qcm9jZXNzQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKF90ZW1wRGF0YSwgMik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc0hvbWVCYXNlZCkge1xyXG4gICAgICB0aGlzLlByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoX3RlbXBEYXRhLCAxKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU2VsZWN0IFBsYXllciBmb3IgcHJvZml0XHJcbiAgVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdChfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdChfbXlEYXRhLCBfYWN0b3JzRGF0YSwgX2lzVHVybk92ZXIsIF9tb2RlSW5kZXggPSAwKSB7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJTRUxFQ1QgUExBWUVSXCI7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nID0gXCJObyBvZiBQbGF5ZXJzOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgaWYgKF9tb2RlSW5kZXggPT0gMikge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGlzIHNwZWN0YXRlIG9yIG5vdCwgZG9udCBhZGQgYW55IHNwZWN0YXRlc1xyXG4gICAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICBzZWxlY3RQbGF5ZXJQcm9maXROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNlbGVjdFBsYXllclByb2ZpdE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBzZWxlY3RQbGF5ZXJQcm9maXROb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFeGl0X1NlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyRm9yUHJvZml0KCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIFNob3dUb2FzdDogZnVuY3Rpb24gKG1lc3NhZ2UsIHRpbWUgPSBTaG9ydE1lc3NhZ2VUaW1lLCBfaGFzYnV0dG9uID0gdHJ1ZSkge1xyXG4gICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlBvcFVwVUlMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xyXG4gICAgdmFyIFNlbGZUb2FzdCA9IHRoaXM7XHJcbiAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKG1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3QgbW9kZSBvbmx5XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoID4gMCAmJiBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0uSXNCb3QpIHtcclxuICAgICAgICAvLyBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgIC8vICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICAgICAgLy8gICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuQ29tcGxldGVUb2FzdCgpO1xyXG4gICAgICAgIC8vICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUb2FzdCgpO1xyXG4gICAgICAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENvbXBsZXRlVG9hc3QoKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiY29tcGxldGUgdG9hc3QgY2FsbGVkXCIpO1xyXG4gICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gIH0sXHJcblxyXG4gIFNob3dSZXN1bHRTY3JlZW46IGZ1bmN0aW9uIChfc3RhdHVzLCBfZGF0YSkge1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLlJlc3VsdFNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLlN0YXR1c0xhYmVsLnN0cmluZyA9IF9zdGF0dXM7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuQm9keUxhYmVsLnN0cmluZyA9IF9kYXRhO1xyXG4gIH0sXHJcblxyXG4gIFJlc3RhcnRUaGVHYW1lKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRUb1N5bmNJbmZvKF9kYXRhSW5mbykge1xyXG4gICAgdmFyIF9tb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuXHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgdmFyIF9kYXRhID0geyBpbmZvOiBfZGF0YUluZm8gfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNSwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfbW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICB2YXIgX2RhdGEgPSB7IGluZm86IF9kYXRhSW5mbyB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTUsIF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG4iXX0=