
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
  CheckMarketingAmountShare_CardFunctionality: function CheckMarketingAmountShare_CardFunctionality(_amount) {
    if (_amount === void 0) {
      _amount = 0;
    }

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
      if (_manager.PlayerGameInfo[index].CardFunctionality.HasMarketingCompany) {
        this.RaiseEventForMarketingShare(_amount, _manager.PlayerGameInfo[index].PlayerUID, "You have received market share of $" + _amount + " from your marketing company");
      }
    }
  },
  RaiseEventForMarketingShare: function RaiseEventForMarketingShare(_amnt, _id, _msg) {
    var _data = {
      amount: _amnt,
      ID: _id,
      msg: _msg
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(22, _data);
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
        this.UpdateCash_TurnDecision();
        this.CheckMarketingAmountShare_CardFunctionality(this.marketingAmount); //reseting marketing label and its holding variable

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

        if (BusinessSetupCardFunctionality) {
          _this3.CheckReferences();

          LocationName = "";
          console.log("expand business exit called");
          GamePlayReferenceManager.Instance.Get_GameManager().DestroyGeneratedNodes();
          _this3.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
          BusinessSetupCardFunctionality = false;
          GivenCashBusiness = 0;
          StartAnyBusinessWithoutCash = false;
          GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
        }
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

    console.log(GiveProfitUserID);
    console.log(_manager.PlayerGameInfo[_playerIndex].UserIDForProfitPayDay);

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
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = _manager.GetTurnNumber();

    if (!SelectedBusinessPayDay) {
      _manager.ToggleSkipPayDay_Whole(false);

      _manager.ToggleSkipPayDay_HomeBased(false);

      _manager.ToggleSkipPayDay_BrickAndMortar(false);

      _manager.TogglePayDay(false, false);

      _manager.ToggleDoublePayNextTurn(false);

      if (_manager.PlayerGameInfo[_playerIndex].CardFunctionality.NextTurnHalfPayDayCounter > 0) {
        _manager.PlayerGameInfo[_playerIndex].CardFunctionality.NextTurnHalfPayDayCounter--;
      } else {
        _manager.ToggleHalfPayNextTurn(false);
      }

      _manager.callUponCard();
    } else {
      _manager.completeCardTurn();
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

    this.ToggleWaitingScreen_OneQuestionSetupUI(false);
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
  //#region Select Business for double payday setup
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwic2VsZWN0UGxheWVyUHJvZml0Tm9kZXMiLCJidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMiLCJidXNpbmVzc0RldGFpbFBheURheU5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiZ2xvYmFsVHVyblRpbWVyIiwiUGF5RGF5SW5mbyIsIkludmVzdFNlbGxJbmZvIiwiVGltZXJUaW1lb3V0IiwiRG91YmxlRGF5QnVzaW5lc3NIQiIsIkRvdWJsZURheUJ1c2luZXNzQk0iLCJHaXZlUHJvZml0VXNlcklEIiwiVG90YWxQYXlEYXkiLCJMb2FuQW1vdW50RW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJUZW5UaG91c2FuZCIsIlRlbnR5VGhvdXNhbmQiLCJUaGlydHlUaG91c2FuZCIsIkZvcnR5VGhvdXNhbmQiLCJGaWZ0eVRob3VzYW5kIiwiT3RoZXIiLCJCdXNpbmVzc1NldHVwVUkiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZVVJIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUGxheWVyQ2FzaFVJIiwiQnVzaW5lc3NUeXBlVGV4dFVJIiwiVGV4dCIsIkJ1c2luZXNzTmFtZVRleHRVSSIsIkJ1c2luZXNzVHlwZUxhYmVsIiwiRWRpdEJveCIsIkJ1c2luZXNzTmFtZUxhYmVsIiwiSG9tZUJhc2VkTm9kZVVJIiwiTm9kZSIsIkJyaWNrQW5kTW9ydGFyTm9kZVVJIiwiVGltZXJVSSIsIlRpbWVyTm9kZSIsIkJ1c2luZXNzU2V0dXBOb2RlIiwiTG9hblNldHVwTm9kZSIsIkxvYW5BbW91bnQiLCJMb2FuQW1vdW50TGFiZWwiLCJXYWl0aW5nU3RhdHVzTm9kZSIsIkV4aXRCdXR0b25Ob2RlIiwiQWRkQnV0dG9uTm9kZSIsIkFkZENhc2hTY3JlZW4iLCJBZGRDYXNoTGFiZWwiLCJBZGRDYXNoRWRpdEJveCIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJUaW1lclRleHQiLCJCbG9ja2VyTm9kZSIsIkludmVzdEVudW0iLCJTdG9ja0ludmVzdCIsIkdvbGRJbnZlc3QiLCJTdG9ja1NlbGwiLCJHb2xkU2VsbCIsIkludmVzdFNlbGxVSSIsIlRpdGxlTGFiZWwiLCJEaWNlUmVzdWx0TGFiZWwiLCJQcmljZVRpdGxlTGFiZWwiLCJQcmljZVZhbHVlTGFiZWwiLCJCdXlPclNlbGxUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRWYWx1ZUxhYmVsIiwiQnV0dG9uTmFtZUxhYmVsIiwiSW52ZXN0U3RhdGUiLCJBbW91bnRFZGl0Qm94IiwiU2VsbEJ1c2luZXNzVUkiLCJDYXNoTGFiZWwiLCJQbGF5ZXJOYW1lTGFiZWwiLCJCdXNpbmVzc0NvdW50TGFiZWwiLCJTY3JvbGxDb250ZW50Tm9kZSIsIkJ1c2luZXNzU2VsbFByZWZhYiIsIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIiwiRXhpdEJ1dHRvbiIsIlR1cm5PdmVyRXhpdEJ1dHRvbiIsIlBheURheVVJIiwiSG9tZUJhc2VkTnVtYmVyTGFiZWwiLCJCTU51bWJlckxhYmVsIiwiQk1OdW1iZXJMb2NhdGlvbkxhYmVsIiwiUGFzc2VkUGF5RGF5Q291bnRMYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJPbmVRdWVzdGlvblVJIiwiUGxheWVyRGV0YWlsTGFiZWwiLCJEZXRhaWxzUHJlZmFiIiwiU2Nyb2xsQ29udGVudCIsIldhaXRpbmdTY3JlZW4iLCJXYWl0aW5nU2NyZWVuTGFiZWwiLCJEZWNpc2lvblRpdGxlTGFiZWwiLCJEZWNpc2lvbkNhc2hMYWJlbCIsIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsIiwiRGVjaXNpb25RdWVzdGlvbkxhYmVsIiwiUGFydG5lcnNoaXBVSSIsIldhaXRpbmdTdGF0dXNTY3JlZW4iLCJNYWluU2NyZWVuIiwiVGl0bGVOYW1lIiwiUGxheWVyTmFtZSIsIlBsYXllckNhc2giLCJQYXJ0bmVyU2hpcFByZWZhYiIsIkRlY2lzaW9uU2NyZWVuIiwiRGVjaXNpb25QbGF5ZXJOYW1lIiwiRGVjaXNpb25QbGF5ZXJDYXNoIiwiRGVjaXNpb25EZXNjcmlwdGlvbiIsIlJlc3VsdFVJIiwiUmVzdWx0U2NyZWVuIiwiU3RhdHVzTGFiZWwiLCJCb2R5TGFiZWwiLCJCdXNpbmVzc1BheURheVNldHVwVUkiLCJUaXRsZUNvbnRlbnRMYWJlbCIsIkJ1c2luZXNzUHJlZmFiIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSSIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSEJEaWNlQ291bnRlciIsIkJNRGljZUNvdW50ZXIiLCJOZXh0SGFsZlBheURheSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJPbmVRdWVzdGlvblNldHVwVUkiLCJQYXJ0bmVyc2hpcFNldHVwVUkiLCJSZXN1bHRTZXR1cFVJIiwiQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0VUkiLCJQb3BVcFVJIiwiUG9wVXBVSUxhYmVsIiwiUG9wVXBVSUJ1dHRvbiIsIkdhbWVwbGF5VUlTY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiQnVzaW5lc3NEb3VibGVQYXlTY3JlZW4iLCJPbmVRdWVzdGlvblNwYWNlU2NyZWVuIiwiT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbiIsIlNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbiIsIkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJBdmF0YXJTcHJpdGVzIiwiU3ByaXRlRnJhbWUiLCJSZXNldEFsbERhdGEiLCJSZXNldFR1cm5WYXJpYWJsZSIsIkdvbGRJbnZlc3RlZCIsIkdvbGRTb2xkIiwiU3RvY2tJbnZlc3RlZCIsIlN0b2NrU29sZCIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsIklzQm90VHVybiIsIlBheURheUNvdW50IiwiRG91YmxlUGF5RGF5Q291bnQiLCJJc0JhbmtydXB0ZWQiLCJCYW5rcnVwdGVkQW1vdW50IiwiQWRkQ2FzaEFtb3VudCIsIlRpbWVyIiwiVGltZXJTdGFydGVkIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJfc3RhdGUiLCJhY3RpdmUiLCJFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsIlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cCIsIkVuYWJsZUNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIlN0dWRlbnREYXRhIiwiZ2FtZUNhc2giLCJPbkNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIl92YWwiLCJPbkNsaWNrRG9uZUNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIl9nYW1lY2FzaCIsInBhcnNlSW50IiwiX2Ftb3VudCIsInVuZGVmaW5lZCIsIkNhc2giLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJVcGRhdGVVc2VyRGF0YSIsIlNob3dUb2FzdCIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsImlzRmlyc3RUaW1lIiwiaW5zaWRlR2FtZSIsIm1vZGVJbmRleCIsIl9pc0JhbmtydXB0ZWQiLCJfQmFua3J1cHRBbW91bnQiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiQnVzaW5lc3NJbmZvIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwibGVuZ3RoIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cCIsIkF2YXRhcklEIiwiYXZhdGFySWQiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsImlzTmFOIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIk9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsIkhvbWVCYXNlZCIsIk9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiYnJpY2tBbmRtb3J0YXIiLCJhbW91bnQiLCJDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAiLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJOb09mQnVzaW5lc3MiLCJMb2FuVGFrZW4iLCJNYXRoIiwiYWJzIiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiUHVzaERhdGFGb3JQbGF5ZXJMZWZ0IiwiX2RhdGEiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIl9wbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllcklEIiwiSG9tZUJhc2VkQW1vdW50IiwiSXNBY3RpdmUiLCJfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsInB1c2giLCJSYWlzZUV2ZW50IiwiX0lEIiwiX3BsYXllckxlZnQiLCJfaXNTcGVjdGF0ZSIsIlBob3RvbkFjdG9yIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJNYXhQbGF5ZXJzIiwiR2V0UmVhbEFjdG9ycyIsImFjdG9yTnIiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYnVzaW5lc3NOYW1lIiwiX2lzSG9tZUJhc2VkIiwiU3RhcnRHYW1lIiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJFeGl0X0J1c2luZXNzU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJHZXRUdXJuTnVtYmVyIiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiX2FjdGl2ZSIsImNsZWFyVGltZW91dCIsIlVwZGF0ZVRpbWVyIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiQ2hlY2tNYXJrZXRpbmdBbW91bnRTaGFyZV9DYXJkRnVuY3Rpb25hbGl0eSIsIl9tYW5hZ2VyIiwiX3BsYXllckluZGV4IiwiSGFzTWFya2V0aW5nQ29tcGFueSIsIlJhaXNlRXZlbnRGb3JNYXJrZXRpbmdTaGFyZSIsIl9hbW50IiwiX2lkIiwiX21zZyIsIklEIiwibXNnIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIl9pc1R1cm5PdmVyIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiUm9sbE9uZURpY2UiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAiLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiUmVzZXRfUGFydG5lclNoaXBTZXR1cCIsIl90ZW1wRGF0YSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldE5hbWUiLCJTZXRUeXBlIiwiU2V0QnVzaW5lc3NJbmRleCIsIl90b3RhbExvY2F0aW9ucyIsIkxvY2F0aW9uc05hbWUiLCJTZXRCdXNpbmVzc01vZGUiLCJTZXRNb2RlIiwiU2V0QnVzaW5lc3NWYWx1ZSIsIlNldEZpbmFsQnVzaW5lc3NWYWx1ZSIsIl9hbGxMb2NhdGlvbnNBbW91bnQiLCJfZmluYWxBbW91bnQiLCJTZXRCYWxhbmNlIiwiU2V0TG9jYXRpb25zIiwiSXNQYXJ0bmVyc2hpcCIsIlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uIiwiU2V0UGFydG5lck5hbWUiLCJQYXJ0bmVyTmFtZSIsIkVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cCIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkV4aXRfUGFydG5lclNoaXBTZXR1cCIsImRlc3Ryb3kiLCJSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cCIsIl9hY3RvciIsIl90dXJuIiwiVHVybiIsIl9wbGF5ZXJEYXRhIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJfYnVzaW5lc3NWYWx1ZSIsIkJ1c1ZhbHVlIiwiX3BheUFtb3VudCIsIl9idXNpbmVzc01vZGUiLCJDaGVja1NwZWN0YXRlIiwiQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hbGxBY3RvcnMiLCJSb29tQWN0b3JzIiwibXlJbmRleCIsIkdldE15SW5kZXgiLCJSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIkNhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfaXNBY2NlcHRlZCIsIl9wYXltZW50IiwiX2lzQ2FuY2VsbGVkIiwiX3VJRCIsIl9tYWluRGF0YSIsIkFjY2VwdGVkIiwiQ2FzaFBheW1lbnQiLCJDYW5jZWxsZWQiLCJCdXNpbmVzc0luZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hY2NlcHRlZCIsIl9jYXNoIiwiX2NhbmNlbGxlZCIsIl91aWQiLCJQYXJ0bmVySUQiLCJpbmNsdWRlcyIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiUmFpc2VFdmVudFRvU3luY0luZm8iLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX2hNQW1vdW50IiwiX2JtQW1vdW50IiwiX2JtTG9jYXRpb24iLCJQYXlkYXlDb3VudGVyIiwiRG91YmxlUGF5Q291bnRlciIsIl9oYWxmUGF5ZGF5IiwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5IiwiVXNlcklERm9yUHJvZml0UGF5RGF5IiwiUmVjZWl2ZURvdWJsZVBheURheSIsIl9yZXMiLCJfdGltZSIsIlVwZGF0ZUNhc2hfUGF5RGF5IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQYXlEYXlDb21wbGV0ZWQiLCJPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfZG91YmxlUGF5RGF5IiwiX2RpY2UiLCJfYW1vdW50VG9CZVNlbmQiLCJfYW1vdW50VG9CZUFkanVzdGVkIiwiX211bHRpcGxpZXIiLCJfcGF5ZGF5bXVsdGlwbGllciIsImRvdWJsZVBheURheUFkZGVkIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIlJlY2VpdmVQYXltZW50X1BheURheSIsIl9sb2NhdGlvbnMiLCJfRXN0aW1hdGVMb2FuIiwiU2tpcExvYW5PbmVUaW1lX1BheURheSIsIlNlbGxCdXNpbmVzc19QYXlEYXkiLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdExvYW5TY3JlZW5fUGF5RGF5IiwiU3RhcnROZXdHYW1lX1BheURheSIsImVtaXQiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2hvd0luZm8iLCJpbmZvIiwiUmFpc2VFdmVudEZvckNvbXBsZXRpb24iLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIk5leHRUdXJuSGFsZlBheURheUNvdW50ZXIiLCJUb2dnbGVIYWxmUGF5TmV4dFR1cm4iLCJjYWxsVXBvbkNhcmQiLCJUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJBbW91bnQiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJTZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5IiwiX2lzVHVybm92ZXIiLCJFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIlNldEludmVzdFVJX0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJIiwiVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTaG93UXVlc3Rpb25Ub2FzdCIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX215RGF0YSIsIl9hY3RvcnNEYXRhIiwiX21vZGVJbmRleCIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsInNldFBsYXllck5hbWUiLCJzZXRQbGF5ZXJVSUQiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRfT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIl9tYWluVGl0bGUiLCJfdGlsZUNvbnRlbnQiLCJFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIkNsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiRXhpdFNjcmVlbl9BbG9uZ1R1cm5PdmVyX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIlByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAiLCJfYnVzaW5lc3NUeXBlIiwiRW5hYmxlU2VsZXRpdmVEb3VibGVQYXlEYXlfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiX2lzQnJpY2tBbmRNb3J0YXIiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIkV4aXRfU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyRm9yUHJvZml0IiwibWVzc2FnZSIsInRpbWUiLCJfaGFzYnV0dG9uIiwiU2VsZlRvYXN0IiwibW9kZSIsIkNvbXBsZXRlVG9hc3QiLCJTaG93UmVzdWx0U2NyZWVuIiwiX3N0YXR1cyIsIlJlc3RhcnRUaGVHYW1lIiwiUmVzdGFydEdhbWUiLCJfZGF0YUluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsd0JBQXdCLEdB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QzlCLFFBQUl2UyxLQUFLLEdBQUc5VSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOEQ0RixlQUE5RCxFQUFaOztBQUVBLFFBQUlELEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ2Q7QUFDQSxVQUFJRCxLQUFLLEdBQUc7QUFBRW1PLFFBQUFBLElBQUksRUFBRXFFO0FBQVIsT0FBWjtBQUNBcm5CLE1BQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NRLDBCQUFsQyxHQUErRDRGLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFVCxLQUE5RTtBQUNELEtBSkQsTUFJTyxJQUFJQyxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNyQjtBQUNBLFVBQUksS0FBSzVHLFNBQVQsRUFBb0I7QUFDbEIsWUFBSTJHLEtBQUssR0FBRztBQUFFbU8sVUFBQUEsSUFBSSxFQUFFcUU7QUFBUixTQUFaO0FBQ0FybkIsUUFBQUEsd0JBQXdCLENBQUNrUCxRQUF6QixDQUFrQ1EsMEJBQWxDLEdBQStENEYsVUFBL0QsQ0FBMEUsRUFBMUUsRUFBOEVULEtBQTlFO0FBQ0Q7QUFDRjtBQUNGO0FBLzlFOEIsQ0FBVCxDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbnZhciBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbnZhciBzZWxlY3RQbGF5ZXJQcm9maXROb2RlcyA9IFtdO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbnZhciBidXNpbmVzc0RldGFpbFBheURheU5vZGVzID0gW107XHJcbnZhciBQYXJ0bmVyU2hpcERhdGEgPSBudWxsO1xyXG52YXIgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBDYW5jZWxsZWRJRCA9IFtdO1xyXG52YXIgU3RhcnRHYW1lQ2FzaCA9IDIwMDAwO1xyXG52YXIgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IGZhbHNlO1xyXG52YXIgSE1BbW91bnQgPSAwO1xyXG52YXIgQk1BbW91bnQgPSAwO1xyXG52YXIgQk1Mb2NhdGlvbnMgPSAwO1xyXG52YXIgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMDtcclxudmFyIFR1cm5PdmVyRm9ySW52ZXN0ID0gZmFsc2U7XHJcbnZhciBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxudmFyIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxudmFyIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG52YXIgUHJldmlvdXNDYXNoID0gMDtcclxudmFyIFRpbWVvdXRSZWY7XHJcbnZhciBDb21wbGV0aW9uV2luZG93VGltZSA9IDgwMDA7XHJcbnZhciBMb25nTWVzc2FnZVRpbWUgPSA1MDAwO1xyXG52YXIgU2hvcnRNZXNzYWdlVGltZSA9IDI1MDA7XHJcbnZhciBnbG9iYWxUdXJuVGltZXIgPSAzMDtcclxudmFyIFBheURheUluZm8gPSBcIlwiO1xyXG52YXIgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG52YXIgVGltZXJUaW1lb3V0O1xyXG52YXIgRG91YmxlRGF5QnVzaW5lc3NIQiA9IDA7XHJcbnZhciBEb3VibGVEYXlCdXNpbmVzc0JNID0gMDtcclxudmFyIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG52YXIgVG90YWxQYXlEYXkgPSAwO1xyXG4vLyB2YXIgQ29tcGxldGlvbldpbmRvd1RpbWUgPSA1MDA7Ly84MDAwXHJcbi8vIHZhciBMb25nTWVzc2FnZVRpbWUgPSAyNTA7Ly81MDAwXHJcbi8vIHZhciBTaG9ydE1lc3NhZ2VUaW1lID0gNTA7Ly8yNTAwXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBhbW91bnQgb2YgbG9hbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTG9hbkFtb3VudEVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFRlblRob3VzYW5kOiAxMDAwMCxcclxuICBUZW50eVRob3VzYW5kOiAyMDAwMCxcclxuICBUaGlydHlUaG91c2FuZDogMzAwMDAsXHJcbiAgRm9ydHlUaG91c2FuZDogNDAwMDAsXHJcbiAgRmlmdHlUaG91c2FuZDogNTAwMDAsXHJcbiAgT3RoZXI6IDYsXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1c2luZXNzU2V0dXBVSVwiLFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIG5hbWVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDYXNoVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIGNhc2hcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVUZXh0VUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgIHRvb2x0aXA6IFwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIHR5cGVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWVUZXh0VUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgIHRvb2x0aXA6IFwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIG5hbWVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBidXNpbmVzcyB0eXBlIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc05hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlY2UgZm9yIGJ1c2luZXNzIG5hbWUgZWRpdGJveFwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZE5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWROb2RlVUlcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIEJyaWNrQW5kTW9ydGFyTm9kZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrQW5kTW9ydGFyTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBUaW1lclVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIGxhYmVsIGZvciB0aW1lclwiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lck5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgdGltZXIgbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2V0dXBOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblNldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuU2V0dXBOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGxvYW4gc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgdHlwZTogTG9hbkFtb3VudEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IExvYW5BbW91bnRFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsb2FuIGFtb3VudCB0YWtlbiBieSBwbGF5ZXIgKHN0YXRlIG1hY2hpbmUpXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBhbGwgbGFiZWxzIG9mIGFtb3VudHMgaW4gbG9hbiBVSVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTdGF0dXNOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTdGF0dXNOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHdhaXRpbmcgc3RhdHVzIHNjcmVlbiBvbiBpbml0aWFsIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgZXhpdCBidXR0b24gbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZEJ1dHRvbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRkQnV0dG9uTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBBZGQgQ2FzaCBidXR0b24gbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRkQ2FzaFNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBBZGRDYXNoU2NyZWVuIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRkQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBBZGRDYXNoIGxhYmVsIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRkQ2FzaEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaCBlZGl0Qm94IGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3Rvci8vXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBUdXJuRGVjaXNpb25TZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVHVybkRlY2lzaW9uU2V0dXBVSVwiLFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYXJrZXRpbmdFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0VkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBtYXJrZXRpbmcgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEdvbGRFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdvbGRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IGdvbGQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFN0b2NrRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0VkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3Qgc3RvY2sgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hBbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIGNhc2ggbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc05vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgZXhwbmFkIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGNvbnRlbnQgbm9kZSBvZiBzY3JvbGwgdmlldyBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgcHJlZmFiIG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJUZXh0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyVGV4dFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgbGFiZWwgb2YgdGltZXIgdGV4dCBmb3IgdHVybiBkZWNpc2lvblwiLFxyXG4gICAgfSxcclxuICAgIEJsb2NrZXJOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJsb2NrZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIG5vZGUgb2YgYmxvY2tlciBmb3IgdHVybiBkZWNpc2lvblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG5cclxuICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmcgPSBuYW1lO1xyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgaW52ZXN0bWVudC9idXkgYW5kIHNlbGwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdEVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFN0b2NrSW52ZXN0OiAxLFxyXG4gIEdvbGRJbnZlc3Q6IDIsXHJcbiAgU3RvY2tTZWxsOiAzLFxyXG4gIEdvbGRTZWxsOiA0LFxyXG4gIE90aGVyOiA1LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0U2VsbFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0U2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlIFJlc3VsdCBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgdmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV5T3JTZWxsVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1eU9yU2VsbCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgVmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1dHRvbk5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXR0b25OYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBidXR0b24gbmFtZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U3RhdGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW52ZXN0U3RhdGVcIixcclxuICAgICAgdHlwZTogSW52ZXN0RW51bSxcclxuICAgICAgZGVmYXVsdDogSW52ZXN0RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQW1vdW50RWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxsQnVzaW5lc3NVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsbEJ1c2luZXNzVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxsQnVzaW5lc3NVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZWxsUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2VsbFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc1NlbGxQcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXlEYXlVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGF5RGF5VUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQYXlEYXlVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgUGF5RGF5IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROdW1iZXJMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWROdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZE51bWJlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1OdW1iZXJMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhck51bWJlclwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJOdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTG9jYXRpb25MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhckxvY2F0aW9uc1wiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJMb2NhdGlvbnMgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBhc3NlZFBheURheUNvdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFzc2VkUGF5RGF5Q291bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUGFzc2VkUGF5RGF5Q291bnRMYWJlbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkQnRuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZEJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWRCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNQnRuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQnRuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5CdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluUGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIE1haW5QYW5lbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRQYW5lbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblJlc3VsdFBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5SZXN1bHRQYW5lbE5vZGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFNjcmVlblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0U2NyZWVuVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFNjcmVlblRpdGxlIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZVJlc3VsdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxCdXNpbmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQnVzaW5lc3NMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxCdXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcExvYW5CdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcExvYW5CdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2tpcExvYW5CdXR0b24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5Gb3R0ZXJMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuRm90dGVyTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5Gb3R0ZXJMYWJlbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1eU9yU2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBPbmVRdWVzdGlvblVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBPbmVRdWVzdGlvblVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiT25lUXVlc3Rpb25VSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckRldGFpbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckRldGFpbExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIERldGFpbHNQcmVmYWIgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgU2Nyb2xsQ29udGVudCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgV2FpdGluZ1NjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgV2FpdGluZ1NjcmVlbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuTGFiZWwgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblRpdGxlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvbkNhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblF1ZXN0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25RdWVzdGlvbkxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgcXVlc3Rpb24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBhcnRuZXJzaGlwVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBhcnRuZXJzaGlwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQYXJ0bmVyc2hpcFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgV2FpdGluZ1N0YXR1c1NjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIHdhaXRpbmcgc2NyZWVuIG5vZGUgb2YgcGFydG5lcnNoaXAgdWlcIixcclxuICAgIH0sXHJcbiAgICBNYWluU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZU5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyU2hpcFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVyU2hpcFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25QbGF5ZXJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvbkRlc2NyaXB0aW9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uRGVzY3JpcHRpb25cIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBSZXN1bHRVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUmVzdWx0VUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJSZXN1bHRVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFJlc3VsdFNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTdGF0dXNMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdGF0dXNMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCb2R5TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQm9keUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NQYXlEYXlTZXR1cFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1BheURheVNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1BheURheVNldHVwVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVGl0bGVDb250ZW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVDb250ZW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBHYW1lcGxheVVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YUludGFuY2U7XHJcbnZhciBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlO1xyXG52YXIgUmVxdWlyZWRDYXNoO1xyXG52YXIgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuLy90dXJuIGRlY2lzaW9uc1xyXG52YXIgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbnZhciBUZW1wSGlyaW5nTGF3eWVyO1xyXG5cclxuLy9idXlvcnNlbGxcclxudmFyIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxudmFyIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbnZhciBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbnZhciBEaWNlUmVzdWx0O1xyXG52YXIgT25jZU9yU2hhcmU7XHJcbnZhciBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG5cclxudmFyIEhCRGljZUNvdW50ZXIgPSAwO1xyXG52YXIgQk1EaWNlQ291bnRlciA9IDA7XHJcbnZhciBOZXh0SGFsZlBheURheSA9IGZhbHNlO1xyXG5cclxudmFyIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgTG9hblBheWVkID0gZmFsc2U7XHJcbnZhciBUb3RhbFBheURheUFtb3VudCA9IDA7XHJcbnZhciBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuXHJcbnZhciBHYW1lcGxheVVJTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVwbGF5VUlNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEJ1c2luZXNzU2V0dXBEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEJ1c2luZXNzU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXNpbmVzc1NldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBUdXJuRGVjaXNpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFR1cm5EZWNpc2lvblNldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgVHVybkRlY2lzaW9uU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEludmVzdFNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFBheURheVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGxCdXNpbmVzc1NldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGxCdXNpbmVzc1VJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGxCdXNpbmVzc1VJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogSW52ZXN0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBCdXlPclNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXlPclNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogT25lUXVlc3Rpb25VSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBPbmVRdWVzdGlvblVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lcnNoaXBTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBQYXJ0bmVyc2hpcFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFBhcnRuZXJzaGlwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBSZXN1bHRVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBSZXN1bHRVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzUGF5RGF5VUlTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQnVzaW5lc3NQYXlEYXlTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1c2luZXNzUGF5RGF5U2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdFBsYXllckZvclByb2ZpdFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcblxyXG4gICAgUG9wVXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsYWJlbCByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgYnVzaW5lc3Mgc2V0dXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgR2FtZXBsYXlVSVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGdhbWVwbGF5IHVpIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2VsbFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCAmIHNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgUGF5RGF5IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlbGxCdXNpbmVzc1NjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGxCdXNpbmVzcyBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3Qgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgQnV5T3JTZWxsIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzRG91YmxlUGF5U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgQnVzaW5lc3NEb3VibGVQYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TcGFjZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0UGxheWVyRm9yUHJvZml0U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsZWN0UGxheWVyRm9yUHJvZml0IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFRlbXBEaWNlVGV4dDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgZGljZVwiLFxyXG4gICAgfSxcclxuICAgIExlYXZlUm9vbUJ1dHRvbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQXZhdGFyU3ByaXRlczoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZXNldHMgdGhpcyBjbGFzcyBnbG9iYWwgdmFyaWFibGVzIGFuZCBvdGhlciBuZWNlc3NhcnkgZGF0YSBvbkxvYWRcclxuICAgKiovXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NIQiA9IDA7XHJcbiAgICBEb3VibGVEYXlCdXNpbmVzc0JNID0gMDtcclxuICAgIE5leHRIYWxmUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBHYW1lTWFuYWdlciA9IG51bGw7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG4gICAgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG4gICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMgPSBbXTtcclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgQ2FuY2VsbGVkSUQgPSBbXTtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxuICAgIEhNQW1vdW50ID0gMDtcclxuICAgIEJNQW1vdW50ID0gMDtcclxuICAgIEJNTG9jYXRpb25zID0gMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbiAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgIFByZXZpb3VzQ2FzaCA9IDA7XHJcbiAgICBUaW1lb3V0UmVmID0gbnVsbDtcclxuICAgIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG4gICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuICAgIC8vdHVybiBkZWNpc2lvbnNcclxuICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbiAgICAvL2J1eW9yc2VsbFxyXG4gICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxuICAgIERpY2VSZXN1bHQgPSAwO1xyXG4gICAgT25jZU9yU2hhcmU7XHJcbiAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG5cclxuICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICBUb3RhbFBheURheUFtb3VudCA9IDA7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFRvdGFsUGF5RGF5ID0gMDtcclxuICAgIEhCRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgQk1EaWNlQ291bnRlciA9IDA7XHJcbiAgICBQYXlEYXlJbmZvID0gXCJcIjtcclxuICAgIEludmVzdFNlbGxJbmZvID0gXCJcIjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFJlc2V0cyB0dXJuIHZhcmlhYmxlcyBmb3IgZ29sZGludmVzdC9nb2xkc29sZC9zdG9rY2ludmVzdC9zdG9ja3NvbGRcclxuICAgKiovXHJcbiAgUmVzZXRUdXJuVmFyaWFibGUoKSB7XHJcbiAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Hb2xkU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja0ludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrU29sZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2hlY2sgcmVmZXJlbmNlcyBvZiBjbGFzcy9lcyBuZWVkZWQuXHJcbiAgICoqL1xyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG5cclxuICAgIGlmICghR2FtZU1hbmFnZXIgfHwgR2FtZU1hbmFnZXIgPT0gbnVsbCkgR2FtZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiB0aGlzIG5vZGUgZ2V0cyBhY3RpdmVcclxuICAgKiovXHJcbiAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWRcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiU3luY0RhdGFcIiwgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiB0aGlzIG5vZGUgZ2V0cyBkZWFjdGl2ZVxyXG4gICAqKi9cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgdGhlIGNsYXNzIGlzIGxvYWRlZFxyXG4gICAqKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAvL2RlY2xhcmluZyBsb2NhbCB2YXJpYWJsZXNcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb3VudCA9IDA7XHJcbiAgICB0aGlzLkRvdWJsZVBheURheUNvdW50ID0gMDtcclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSAwO1xyXG4gICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIHRoaXMuVGltZXIgPSAwO1xyXG4gICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIFRpbWVyVGltZW91dCA9IG51bGw7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZShmYWxzZSk7XHJcbiAgfSxcclxuICAvLyNyZWdpb24gU3BlY3RhdGUgVUkgU2V0dXBcclxuICBJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIC8vIGNvbnNvbGUudHJhY2UoXCJjbG9zZWRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZFwiKTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkxlYXZlUm9vbUJ1dHRvbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKHRydWUpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbk1lbnVcIik7XHJcbiAgICB9LCA1MDApO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXNpbmVzc1NldHVwIHdpdGggbG9hblxyXG4gIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVDYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICB0aGlzLlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoO1xyXG4gIH0sXHJcblxyXG4gIE9uQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoX3ZhbCkge1xyXG4gICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gX3ZhbDtcclxuICB9LFxyXG5cclxuICBPbkNsaWNrRG9uZUNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAoZmFsc2UpO1xyXG4gICAgdmFyIF9nYW1lY2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQodGhpcy5BZGRDYXNoQW1vdW50KTtcclxuICAgIGlmICh0aGlzLkFkZENhc2hBbW91bnQgIT0gbnVsbCAmJiB0aGlzLkFkZENhc2hBbW91bnQgIT0gXCJcIiAmJiB0aGlzLkFkZENhc2hBbW91bnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChfYW1vdW50IDw9IF9nYW1lY2FzaCkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICBjb25zb2xlLmxvZyhQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgX2dhbWVjYXNoIC09IF9hbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBfZ2FtZWNhc2gudG9TdHJpbmcoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCwgLTEsIC0xKTtcclxuXHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJDYXNoICRcIiArIHRoaXMuQWRkQ2FzaEFtb3VudCArIFwiIGhhcyBiZWVuIGFkZGVkLlwiKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkbyBub3QgaGF2ZSBlbm91Z2ggaW4gZ2FtZSBjYXNoLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lID0gZmFsc2UsIG1vZGVJbmRleCA9IDAsIF9pc0JhbmtydXB0ZWQgPSBmYWxzZSwgX0JhbmtydXB0QW1vdW50ID0gMCwgX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgLy9jYWxsZWQgZmlyc3QgdGltZSBmb3JtIEdhbWVNYW5hZ2VyIG9ubG9hZCBmdW5jdGlvblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBfaXNDYXJkRnVuY3Rpb25hbGl0eTtcclxuICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gX0dpdmVuQ2FzaDtcclxuICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g7XHJcblxyXG4gICAgdGhpcy5Jc0JhbmtydXB0ZWQgPSBfaXNCYW5rcnVwdGVkO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gX0JhbmtydXB0QW1vdW50O1xyXG5cclxuICAgIGlmIChfaXNCYW5rcnVwdGVkKSB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5Jbml0X0J1c2luZXNzU2V0dXAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUsIG1vZGVJbmRleCwgX2lzQmFua3J1cHRlZCk7XHJcbiAgfSxcclxuICBJbml0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSA9IGZhbHNlLCBtb2RlSW5kZXggPSAwLCBfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhcmRGdW5jdGlvbmFsaXR5ID0gbmV3IEdhbWVNYW5hZ2VyLkNhcmREYXRhRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChpc0ZpcnN0VGltZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFN0YXJ0R2FtZUNhc2g7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgIGlmIChpbnNpZGVHYW1lKSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gaW5kZXg7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICBpZiAoQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICAgIGlmIChTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgICAgICBQcmV2aW91c0Nhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSAwO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gR2l2ZW5DYXNoQnVzaW5lc3M7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuYXZhdGFySWQpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEdldE9ial9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5CdXNpbmVzc1NldHVwRGF0YTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAobmFtZSk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllclVJRCA9IFVJRDtcclxuICB9LFxyXG4gIE9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgICBpZiAoaXNOYU4oVUlEKSB8fCBVSUQgPT0gdW5kZWZpbmVkKSBVSUQgPSAwO1xyXG5cclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkF2YXRhcklEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IFwiXCI7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuICB9LFxyXG4gIE9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICB9LFxyXG4gIE9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXI7XHJcbiAgfSxcclxuICBPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gYW1vdW50O1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IGFtb3VudDtcclxuICB9LFxyXG4gIENhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgdGFrZW4gbG9hbiBvZiAkXCIgKyBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkbyBub3QgbmVlZCBsb2FuLCB5b3UgaGF2ZSBlbm91Z2ggY2FzaCB0byBidXkgY3VycmVudCBzZWxlY3RlZCBidXNpbmVzcy5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBSZXF1aXJlZENhc2ggPSBNYXRoLmFicyhwYXJzZUludChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKSAtIGFtb3VudCk7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFswXS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiJFwiICsgUmVxdWlyZWRDYXNoO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IHRha2UgbG9hbiBmb3IgY3VycmVudCBidXNpbmVzcyBzZXR1cFwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcikge1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDUwMDAwKTtcclxuICAgICAgfSBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZCkge1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDEwMDAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBzZWxlY3QgYnVzaW5lc3MgYmV0d2VlbiBIb21lIEJhc2VkIGFuZCBicmljayAmIG1vcnRhci5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXBcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG4gIEhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpbmRleCA9PSBpKSB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLk90aGVyO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMCk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGVuVGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgxKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW50eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMik7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGhpcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgzKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5Gb3J0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNCk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uRmlmdHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDUpO1xyXG4gIH0sXHJcbiAgT25UYWtlbkxvYW5DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9PSBMb2FuQW1vdW50RW51bS5PdGhlcikgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gUmVxdWlyZWRDYXNoO1xyXG4gICAgZWxzZSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBwYXJzZUludCh0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQpO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gdHJ1ZTtcclxuICAgIHRoaXMuT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggKyBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gIH0sXHJcblxyXG4gIFB1c2hEYXRhRm9yUGxheWVyTGVmdChfZGF0YSkge1xyXG4gICAgdmFyIF9tb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gMjAwMDA7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJJRCA9IF9kYXRhLnVzZXJJRDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBfZGF0YS5uYW1lO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQXZhdGFySUQgPSAwO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50ID0gMTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5DYXJkRnVuY3Rpb25hbGl0eSA9IG5ldyBHYW1lTWFuYWdlci5DYXJkRGF0YUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9IFwiU2Fsb29uXCI7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9IFwiRXZhIEJlYXV0eVwiO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLnB1c2goX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLCBfcGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgU3luY0RhdGE6IGZ1bmN0aW9uIChfZGF0YSwgX0lELCBfcGxheWVyTGVmdCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2lzU3BlY3RhdGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl07XHJcblxyXG4gICAgaWYgKF9pc1NwZWN0YXRlKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0UmVhbEFjdG9ycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX3BsYXllckxlZnQpIHtcclxuICAgICAgaWYgKF9JRCAhPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuYWN0b3JOcikgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goX2RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGggPj0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzKSB7XHJcbiAgICAgIC8vc2V0dGluZyByb29tIHByb3BlcnR5IHRvIGRlY2xhcmUgaW5pdGlhbCBzZXR1cCBoYXMgYmVlblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsIHRydWUsIHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLCB0cnVlKTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUHVyY2hhc2VCdXNpbmVzczogZnVuY3Rpb24gKF9hbW91bnQsIF9idXNpbmVzc05hbWUsIF9pc0hvbWVCYXNlZCkge1xyXG4gICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPCBfYW1vdW50ICYmICFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBub3QgZW5vdWdoIGNhc2ggdG8gYnV5IHRoaXMgXCIgKyBfYnVzaW5lc3NOYW1lICsgXCIgYnVzaW5lc3MuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2lzSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA8IDMpIHtcclxuICAgICAgICAgIGlmICghU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gXCIkXCIgKyBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuU3RhcnRHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IG93biBtb3JlIHRoYW4gdGhyZWUgSG9tZSBiYXNlZCBidXNpbmVzc2VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gXCIkXCIgKyBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQnJpY2tBbmRNb3J0YXJBbW91bnQrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbikge1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIlJldmVydGluZyBiYWNrIGxvYW4gYW1vdW50LlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5CYW5rcnVwdEFtb3VudCA9IHRoaXMuQmFua3J1cHRlZEFtb3VudDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vc2V0dGluZyBwbGF5ZXIgY3VycmVudCBkYXRhIGluIGN1c3RvbSBwcm9wZXJ0aWVzIHdoZW4gaGlzL2hlciB0dXJuIG92ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgYmFua3J1cHRlZDogdHJ1ZSwgdHVybjogR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKSwgUGxheWVyRGF0YU1haW46IFBsYXllckRhdGFJbnRhbmNlIH0gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDksIF9kYXRhKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgQUlcclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcbiAgICAgICAgfSwgMTYwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJubyBtb2RlIHNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQYXlBbW91bnRUb1BsYXlHYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlN0YXJ0R2FtZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID09IFwiXCIpIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgdHlwZS5cIik7XHJcbiAgICBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9PSBcIlwiKSB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIG5hbWUuXCIpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmUgfHwgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGEgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBob21lYmFzc2VkXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDEwMDAwLCBcImhvbWVcIiwgdHJ1ZSk7XHJcbiAgICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBicmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDUwMDAwLCBcImJyaWNrIGFuZCBtb3J0YXJcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuU3RhcnRHYW1lID09IHRydWUgfHwgdGhpcy5Jc0JhbmtydXB0ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgICBpZiAoSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgIT0gLTEpIHtcclxuICAgICAgICAgIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBub3QgYmVlbiBjYWxsZWQgZnJvbSBpbnNpZGUgZ2FtZVxyXG4gICAgICAgICAgdGhpcy5TdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgYmVlbiBjYWxsZWQgYXQgc3RhcnQgb2YgZ2FtZSBhcyBpbml0aWFsIHNldHVwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BydGludGluZyBhbGwgdmFsdWVzIHRvIGNvbnNvbGVcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbmFtZTogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBJRDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXMgcGxheWVyIGJvdDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uSXNCb3QpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJubyBvZiBidXNpbmVzcyBvZiBwbGF5ZXIgKHNlZSBiZWxvdyk6IFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY2FzaDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uQ2FzaCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciB0YWtlbiBsb2FuOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuVGFrZW4pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ0YWtlbiBsb2FuIGFtb3VudDogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFR1cm5EZWNpc2lvblNldHVwVUlcclxuICAvL1R1cm5EZWNpc2lvblNldHVwVUkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGlzYWN0aXZlKSB7XHJcbiAgICB0aGlzLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IGlzYWN0aXZlO1xyXG5cclxuICAgIHZhciBfYWN0aXZlID0gaXNhY3RpdmU7XHJcblxyXG4gICAgaWYgKF9hY3RpdmUpIHtcclxuICAgICAgX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQmxvY2tlck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVGltZXIgPSBnbG9iYWxUdXJuVGltZXI7XHJcbiAgICAgIHRoaXMuVGltZXJTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlRpbWVyVGV4dC5zdHJpbmcgPSB0aGlzLlRpbWVyICsgXCIgc2Vjb25kcyBhcmUgbGVmdCB0byBjaG9vc2UgYWJvdmUgb3B0aW9ucyBleGNlcHQgJ1JvbGwgVGhlIERpY2UnXCI7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lclRpbWVvdXQpO1xyXG4gICAgICB0aGlzLlVwZGF0ZVRpbWVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhclRpbWVvdXQoVGltZXJUaW1lb3V0KTtcclxuICAgICAgdGhpcy5UaW1lciA9IDA7XHJcbiAgICAgIHRoaXMuVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5UaW1lclRleHQuc3RyaW5nID0gXCJcIjtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkJsb2NrZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVUaW1lcigpIHtcclxuICAgIGlmICh0aGlzLlRpbWVyID4gMCkge1xyXG4gICAgICB0aGlzLlRpbWVyID0gdGhpcy5UaW1lciAtIDE7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5UaW1lclRleHQuc3RyaW5nID0gdGhpcy5UaW1lciArIFwiIHNlY29uZHMgYXJlIGxlZnQgdG8gY2hvb3NlIGFib3ZlIG9wdGlvbnMgZXhjZXB0ICdSb2xsIFRoZSBEaWNlJ1wiO1xyXG4gICAgICBUaW1lclRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlVwZGF0ZVRpbWVyKCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVyVGltZW91dCk7XHJcbiAgICAgIHRoaXMuVGltZXIgPSAwO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IFwiVGltZXIgaXMgb3ZlciwgeW91IGNhbiBzZWxlY3Qgb25seSAnUm9sbCBUaGUgRGljZScgbm93LlwiO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQmxvY2tlck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkNhc2hBbW91bnRMYWJlbC5zdHJpbmcgPSBcIiQgXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0uQ2FzaDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIENoZWNrTWFya2V0aW5nQW1vdW50U2hhcmVfQ2FyZEZ1bmN0aW9uYWxpdHkoX2Ftb3VudCA9IDApIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5IYXNNYXJrZXRpbmdDb21wYW55KSB7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yTWFya2V0aW5nU2hhcmUoX2Ftb3VudCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCwgXCJZb3UgaGF2ZSByZWNlaXZlZCBtYXJrZXQgc2hhcmUgb2YgJFwiICsgX2Ftb3VudCArIFwiIGZyb20geW91ciBtYXJrZXRpbmcgY29tcGFueVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRGb3JNYXJrZXRpbmdTaGFyZShfYW1udCwgX2lkLCBfbXNnKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IGFtb3VudDogX2FtbnQsIElEOiBfaWQsIG1zZzogX21zZyB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIE9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoVGVtcE1hcmtldGluZ0Ftb3VudCA9PSBcIlwiIHx8IFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHRoaXMubWFya2V0aW5nQW1vdW50ID0gcGFyc2VJbnQoVGVtcE1hcmtldGluZ0Ftb3VudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG5cclxuICAgICAgLy9pZiBwbGF5ZXIgZW50ZXJlZCBhbW91bnQgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIGNhc2ggaGUgb3duc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0aGlzLm1hcmtldGluZ0Ftb3VudCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ICsgdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcInlvdSBzdWNjZXNzZnVsbHkgbWFya2V0ZWQgYW1vdW50IG9mICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCArIFwiICwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFwiLlwiLFxyXG4gICAgICAgICAgTG9uZ01lc3NhZ2VUaW1lXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgdGhpcy5DaGVja01hcmtldGluZ0Ftb3VudFNoYXJlX0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMubWFya2V0aW5nQW1vdW50KTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIik7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBpZiBwbGF5ZXIgaGFzIG1vcmUgdGhhbiA1MDAwJFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgYWxyZWFkeSBoaXJlZCBhIGxhd3llci5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBUZW1wSGlyaW5nTGF3eWVyID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhUZW1wSGlyaW5nTGF3eWVyKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIDUwMDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKyBcIi5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJzb3JyeSwgeW91IGRvbnQgaGF2ZSBlbm91Z2ggbW9uZXkgdG8gaGlyZSBhIGxhd3llci5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKF9uYW1lKSB7XHJcbiAgICBMb2NhdGlvbk5hbWUgPSBfbmFtZTtcclxuICB9LFxyXG4gIE9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChldmVudCA9IG51bGwsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIC8vaWYgcGxheWVyIGhhcyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGhlIGNvdWxkIGV4cGFuZCBpdFxyXG4gICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3NcIik7XHJcblxyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gX2lzQ2FyZEZ1bmN0aW9uYWxpdHk7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IF9HaXZlbkNhc2g7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoO1xyXG5cclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHZhciBnZW5lcmF0ZWRMZW5ndGggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbihCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHksIEdpdmVuQ2FzaEJ1c2luZXNzLCBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG5cclxuICAgIGlmIChnZW5lcmF0ZWRMZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgdG8gZXhwYW5kLlwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzcyBleGl0IGNhbGxlZFwiKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDE2MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzcyBleGl0IGNhbGxlZFwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgbmV3IGJ1c2luZXNzXCIpO1xyXG4gICAgdGhpcy5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBPbkdvbGREaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkSW52ZXN0ZWQpIHtcclxuICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uR29sZEludmVzdDtcclxuICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiSW52ZXN0IEluIEdPTERcIiwgRGljZVJlc3VsdCwgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJCVVlcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICBPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQgPSBudWxsLCBfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICBUdXJuT3ZlckZvckludmVzdCA9IF9pc1R1cm5PdmVyO1xyXG5cclxuICAgIGNvbnNvbGUuZXJyb3IoX2lzVHVybk92ZXIpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdCkgU3RvY2tCdXNpbmVzc05hbWUgPSBcIkZyaWVuZCdzIEJ1c2luZXNzXCI7XHJcblxyXG4gICAgaWYgKCF0aGlzLlN0b2NrSW52ZXN0ZWQgfHwgVHVybk92ZXJGb3JJbnZlc3QpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChTdG9ja0J1c2luZXNzTmFtZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhIGJ1c2luZXNzIG5hbWUgdG8gaW52ZXN0LlwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tJbnZlc3Q7XHJcblxyXG4gICAgICAgIGlmICghVHVybk92ZXJGb3JJbnZlc3QpIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgZWxzZSBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcblxyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiSW52ZXN0IGluIFN0b2NrXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBTaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIEJVWVwiLCBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiQlVZXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZFNvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiU2VsbCBHT0xEXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIFNFTExcIiwgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJTRUxMXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgR09MRCBvdW5jZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5TdG9ja1NvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ID4gMCkge1xyXG4gICAgICAgIHRoaXMuU3RvY2tTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLlN0b2NrU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFwiU2VsbCBTVE9DS1wiLCBEaWNlUmVzdWx0LCBcIkVhY2ggc2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvc2hhcmVcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBTRUxMXCIsIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiU0VMTFwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IHNoYXJlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZ28gaW50byBwYXJ0bmVyIHNoaXBcIik7XHJcbiAgICAvLyB0aGlzLlNob3dUb2FzdChcIndvcmsgaW4gcHJvZ3Jlc3MsIGNvbWluZyBzb29uLi4uXCIpO1xyXG4gICAgLy8gdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdGhpcy5FbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgfSxcclxuXHJcbiAgT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInJvbGwgdGhlIGRpY2VcIik7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbihmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbERpY2UoKTtcclxuICB9LFxyXG5cclxuICBQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgLy90aGlzLlRlbXBEaWNlVGV4dC5zdHJpbmc9dmFsdWU7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBhcnRuZXJzaGlwIHNldHVwXHJcbiAgVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5NYWluU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5XYWl0aW5nU3RhdHVzU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICBDYW5jZWxsZWRJRCA9IFtdO1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyTmFtZS5zdHJpbmcgPSBfdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBsYXllckNhc2guc3RyaW5nID0gXCIkXCIgKyBfdGVtcERhdGEuQ2FzaDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QYXJ0bmVyU2hpcFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICB2YXIgX3RvdGFsTG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgICB2YXIgX2FsbExvY2F0aW9uc0Ftb3VudCA9IF90b3RhbExvY2F0aW9ucyAqIDI1MDAwO1xyXG4gICAgICAgIHZhciBfZmluYWxBbW91bnQgPSA1MDAwMCArIF9hbGxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5QYXJ0bmVyTmFtZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbih0cnVlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKFwibm9uZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWUuc3RyaW5nID0gX3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllckNhc2guc3RyaW5nID0gXCIkXCIgKyBfdGVtcERhdGEuQ2FzaDtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uRGVzY3JpcHRpb24uc3RyaW5nID0gX21zZztcclxuICB9LFxyXG5cclxuICBFeGl0X1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKSB7XHJcbiAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gX2RhdGE7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkgX2J1c2luZXNzTW9kZSA9IFwiSG9tZSBCYXNlZFwiO1xyXG4gICAgZWxzZSBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSBfYnVzaW5lc3NNb2RlID0gXCJCcmljayAmIE1vcnRhclwiO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX21zZyA9XHJcbiAgICAgICAgXCJ5b3UgaGF2ZSByZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBieSBcIiArXHJcbiAgICAgICAgX3BsYXllckRhdGEuUGxheWVyTmFtZSArXHJcbiAgICAgICAgXCIgLCBmb2xsb3dpbmcgYXJlIHRoZSBkZXRhaWxzIG9mIGJ1c2luZXNzOiBcIiArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBOYW1lOiBcIiArXHJcbiAgICAgICAgX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzTmFtZSArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBNb2RlOiBcIiArXHJcbiAgICAgICAgX2J1c2luZXNzTW9kZSArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBWYWx1ZTogJFwiICtcclxuICAgICAgICBfYnVzaW5lc3NWYWx1ZSArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJDYXNoIFBheW1lbnQ6ICRcIiArXHJcbiAgICAgICAgX3BheUFtb3VudCArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgXCJpZiBvZmZlciBpcyBhY2NlcHRlZCB5b3Ugd2lsbCByZWNlaXZlIDUwJSBzaGFyZSBvZiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MgYW5kIHdpbGwgcmVjZWl2ZSBwcm9maXQvbG9zZSBvbiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MuXCI7XHJcblxyXG4gICAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cChfbXNnKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIHZhciBteUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgIGlmIChQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCA+PSBfcGF5QW1vdW50KSB7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCAtPSBfcGF5QW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKHRydWUsIF9wYXlBbW91bnQsIGZhbHNlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiY29uZ3JhdHVsYXRpb25zISB5b3UgaGF2ZSBzdGFydGVkIGJ1c2luZXNzIHBhcnRuZXJzaGlwXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiTm90IGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2RhdGEgPSBQYXJ0bmVyU2hpcERhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBteUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG4gICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlEKTtcclxuICAgIGlmIChQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKGZhbHNlLCAwLCB0cnVlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2lzQWNjZXB0ZWQgPSBmYWxzZSwgX3BheW1lbnQgPSAwLCBfaXNDYW5jZWxsZWQgPSBmYWxzZSwgX3VJRCA9IFwiXCIsIF9kYXRhID0gbnVsbCwgX2J1c2luZXNzSW5kZXggPSAwKSB7XHJcbiAgICB2YXIgX21haW5EYXRhID0geyBEYXRhOiB7IEFjY2VwdGVkOiBfaXNBY2NlcHRlZCwgQ2FzaFBheW1lbnQ6IF9wYXltZW50LCBDYW5jZWxsZWQ6IF9pc0NhbmNlbGxlZCwgUGxheWVySUQ6IF91SUQsIFBsYXllckRhdGE6IF9kYXRhLCBCdXNpbmVzc0luZGV4OiBfYnVzaW5lc3NJbmRleCB9IH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEyLCBfbWFpbkRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHZhciBfYWNjZXB0ZWQgPSBfZGF0YS5EYXRhLkFjY2VwdGVkO1xyXG4gICAgICB2YXIgX2Nhc2ggPSBfZGF0YS5EYXRhLkNhc2hQYXltZW50O1xyXG4gICAgICB2YXIgX2NhbmNlbGxlZCA9IF9kYXRhLkRhdGEuQ2FuY2VsbGVkO1xyXG4gICAgICB2YXIgX3VpZCA9IF9kYXRhLkRhdGEuUGxheWVySUQ7XHJcbiAgICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5CdXNpbmVzc0luZGV4O1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJhbnN3ZXIgcmVjZWl2ZWRcIik7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIGlmIChfYWNjZXB0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9jYXNoO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXAgPSB0cnVlO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCA9IF91aWQ7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lck5hbWUgPSBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XSk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciBhY2NlcHRlZFwiKTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXJ0bmVyc2hpcCBvZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBcIiArIF9wbGF5ZXJEYXRhLlBsYXllck5hbWUgKyBcIiwgY2FzaCAkXCIgKyBfY2FzaCArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgYWNjb3VudC5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5pbmNsdWRlcyhfdWlkKSA9PSBmYWxzZSkgQ2FuY2VsbGVkSUQucHVzaChfdWlkKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhDYW5jZWxsZWRJRCk7XHJcbiAgICAgICAgICBpZiAoQ2FuY2VsbGVkSUQubGVuZ3RoID09IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGNhbmNlbGxlZCBieSBhbGwgb3RoZXIgdXNlcnMuXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgcmVqZWN0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfYWNjZXB0ZWQpIHtcclxuICAgICAgICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IGFuZCBzZWxsIG1vZGR1bGVcclxuXHJcbiAgUmVzZXRHb2xkSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuR29sZEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuU3RvY2tFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgb25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwoX2Ftb3VudCkge1xyXG4gICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gX2Ftb3VudDtcclxuXHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKlwiICsgRW50ZXJCdXlTZWxsQW1vdW50ICsgXCI9XCIgKyBfYW1vdW50KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgdGhpcy5SZXNldEdvbGRJbnB1dCgpO1xyXG4gICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX0ludmVzdFNlbGwoX3RpdGxlLCBfZGljZVJlc3VsdCwgX3ByaWNlVGl0bGUsIF9wcmljZVZhbHVlLCBfYnV5T3JTZWxsVGl0bGUsIF90b3RhbEFtb3VudFRpdGxlLCBfdG90YWxBbW91bnRWYWx1ZSwgX2J1dHRvbk5hbWUsIF9zdGF0ZSkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IF90aXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlUmVzdWx0O1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVRpdGxlTGFiZWwuc3RyaW5nID0gX3ByaWNlVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVmFsdWVMYWJlbC5zdHJpbmcgPSBfcHJpY2VWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV5T3JTZWxsVGl0bGVMYWJlbC5zdHJpbmcgPSBfYnV5T3JTZWxsVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VGl0bGVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXR0b25OYW1lTGFiZWwuc3RyaW5nID0gX2J1dHRvbk5hbWU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlRGF0YV9JbnZlc3RTZWxsKF90b3RhbEFtb3VudFZhbHVlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICB9LFxyXG5cclxuICBBcHBseUJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG5cclxuICAgICAgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEFtb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcblxyXG4gICAgICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIkJ1eWluZyBHT0xEOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBPdW5jZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJQdXJjaGFzZWQgT3VuY2VzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBPdW5jZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICBpZiAoX2Ftb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQpIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCAtPSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIiArIF9hbW91bnQgKyBcIiBvdW5jZXMgb2YgR09MRCBmb3IgICRcIiArIF9Ub3RhbEFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiU2VsbGluZyBHT0xEOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBPdW5jZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJTb2xkIE91bmNlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3IgT3VuY2VzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIEdPTEQgb3VuY2VzLCB5b3Ugb3duIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ICsgXCIgb2YgR09MRCBvdW5jZXNcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEFtb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgKz0gX2Ftb3VudDtcclxuICAgICAgICAgIC8vY2FuIGFkZCBtdWx0aXBsZSBzdG9ja3Mgd2l0aCBidXNpbmVzcyBuYW1lIGluIG9iamVjdCBpZiByZXF1aXJlZFxyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIiArIF9hbW91bnQgKyBcIiBzaGFyZXMgb2YgYnVzaW5lc3MgXCIgKyBTdG9ja0J1c2luZXNzTmFtZSwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiQnV5aW5nIFNUT0NLOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBzaGFyZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJQdXJjaGFzZWQgc2hhcmVzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBzaGFyZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja1NlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcblxyXG4gICAgICAgIGlmIChfYW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQpIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgLT0gX2Ftb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICsgX2Ftb3VudCArIFwiIHNoYXJlcyBvZiBzdG9jayBmb3IgICRcIiArIF9Ub3RhbEFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiU2VsbGluZyBTVE9DSzpcIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBPbmNlT3JTaGFyZSAvIDEwMDAgKyBcIlxcblwiICsgXCJQZXIgc2hhcmUgcHJpY2U6ICRcIiArIE9uY2VPclNoYXJlICsgXCJcXG5cIiArIFwiU29sZCBzaGFyZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIHNoYXJlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBzdG9ja3Mgc2hhcmVzLCB5b3Ugb3duIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArIFwiIG9mIHN0b2NrIHNoYXJlc1wiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRCdXR0b25fSW52ZXN0U2VsbCgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuXHJcbiAgICBpZiAoVHVybk92ZXJGb3JJbnZlc3QpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGF5ZGF5IG9yIERvdWJsZSBwYXkgRGF5XHJcbiAgVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgQk1BbW91bnQsIGxvYW5UYWtlbikge1xyXG4gICAgaWYgKEhNQW1vdW50ID09IDApIHtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQk1BbW91bnQgPT0gMCkge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsb2FuVGFrZW4pIHtcclxuICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRMb2FuQW1vdW50X1BheURheSgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHZhciBfbG9hbiA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW4gPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9sb2FuO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsIF9za2lwSE0gPSBmYWxzZSwgX3NraXBCTSA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSwgX2ZvclNlbGVjdGVkQnVzaW5lc3MgPSBmYWxzZSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDAsIF9oTUFtb3VudCA9IDAsIF9ibUFtb3VudCA9IDAsIF9ibUxvY2F0aW9uID0gMCwgUGF5ZGF5Q291bnRlciA9IDEsIERvdWJsZVBheUNvdW50ZXIgPSAwLCBfaGFsZlBheWRheSA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIFRvdGFsUGF5RGF5ID0gMDtcclxuXHJcbiAgICBHaXZlUHJvZml0VXNlcklEID0gXCJcIjtcclxuICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhbkdpdmVQcm9maXRPblBheURheSkge1xyXG4gICAgICBHaXZlUHJvZml0VXNlcklEID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXk7XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVXNlcklERm9yUHJvZml0UGF5RGF5ID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhHaXZlUHJvZml0VXNlcklEKTtcclxuICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVXNlcklERm9yUHJvZml0UGF5RGF5KTtcclxuXHJcbiAgICBpZiAoR2l2ZVByb2ZpdFVzZXJJRCAhPSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciB3aG9sZSBwcm9maXQgd2lsbCBiZSB0cmFuc2ZlcnJlZCB0byBvdGhlciBwbGF5ZXIgdGhpcyB0dXJuLlwiLCAxMjAwKTtcclxuICAgIH1cclxuXHJcbiAgICBIQkRpY2VDb3VudGVyID0gMDtcclxuICAgIEJNRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgTmV4dEhhbGZQYXlEYXkgPSBfaGFsZlBheWRheTtcclxuICAgIC8vICAgaWYgKERvdWJsZVBheUNvdW50ZXIgPT0gMCkgRG91YmxlUGF5Q291bnRlciA9IDE7XHJcblxyXG4gICAgLy8gIGlmIChEb3VibGVQYXlEYXkpIERvdWJsZVBheUNvdW50ZXIgPSBEb3VibGVQYXlDb3VudGVyICogMjtcclxuXHJcbiAgICBEb3VibGVEYXlCdXNpbmVzc0hCID0gMDtcclxuICAgIERvdWJsZURheUJ1c2luZXNzQk0gPSAwO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUmVjZWl2ZURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgRG91YmxlRGF5QnVzaW5lc3NIQisrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUmVjZWl2ZURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgRG91YmxlRGF5QnVzaW5lc3NCTSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChEb3VibGVEYXlCdXNpbmVzc0hCID4gMCB8fCBEb3VibGVEYXlCdXNpbmVzc0JNID4gMCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIFwiICsgKERvdWJsZURheUJ1c2luZXNzSEIgKyBEb3VibGVEYXlCdXNpbmVzc0JNKSArIFwiIGJ1c2luZXNzL2VzLlwiLCAxMjAwKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3JlcyA9IFBheWRheUNvdW50ZXIgKyBEb3VibGVQYXlDb3VudGVyO1xyXG4gICAgUGF5RGF5SW5mbyA9IFwiUGF5RGF5IFJlc3VsdCB3aXRoIG11bHRpcGxpZXI6IFwiICsgX3JlcztcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5QYXlEYXlDb3VudCA9IFBheWRheUNvdW50ZXI7XHJcbiAgICB0aGlzLkRvdWJsZVBheURheUNvdW50ID0gRG91YmxlUGF5Q291bnRlcjtcclxuICAgIERvdWJsZVBheURheSA9IF9pc0RvdWJsZVBheURheTtcclxuICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSh0cnVlKTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IF90aXRsZTtcclxuICAgIHZhciBfdGltZSA9IDE4MDA7XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzUGF5RGF5ID0gX2ZvclNlbGVjdGVkQnVzaW5lc3M7XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4O1xyXG4gICAgSE1BbW91bnQgPSBfaE1BbW91bnQ7XHJcbiAgICBCTUFtb3VudCA9IF9ibUFtb3VudDtcclxuICAgIEJNTG9jYXRpb25zID0gX2JtTG9jYXRpb247XHJcblxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoTmV4dEhhbGZQYXlEYXkpIHtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciB3aWxsIHJlY2VpdmUgaGFsZiBwcm9maXRzIHRoaXMgcGF5ZGF5LlwiLCBfdGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBITSkgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSkgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2FuVGFrZW4gPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgbG9hblRha2VuID0gX2xvYW5UYWtlbjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkTnVtYmVyTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMYWJlbC5zdHJpbmcgPSBCTUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxvY2F0aW9uTGFiZWwuc3RyaW5nID0gQk1Mb2NhdGlvbnM7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuUGFzc2VkUGF5RGF5Q291bnRMYWJlbC5zdHJpbmcgPSB0aGlzLlBheURheUNvdW50O1xyXG5cclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIC8vY2hlY2sgaWYgbG9hbiB3YXMgc2tpcHBlZCBwcmV2aW91c2x5XHJcbiAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHtcclxuICAgICAgdmFyIF9sb2FuID0gdGhpcy5HZXRMb2FuQW1vdW50X1BheURheSgpO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkZvdHRlckxhYmVsLnN0cmluZyA9IFwiKnBheSAkXCIgKyBfbG9hbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICQ1MDAwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwgMCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwSE0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwgQk1BbW91bnQsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIGlmIChfc2tpcEJNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuXHJcbiAgICBpZiAoX3NraXBCTSB8fCBfc2tpcEhNKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0sIF90aW1lICsgMjAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgICB0aGlzLk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgICB0aGlzLk9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIGlmICghSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG4gICAgICB2YXIgX2hhbGZQYXlkYXkgPSBOZXh0SGFsZlBheURheTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEhNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG5cclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuICAgICAgdmFyIF9wYXlkYXltdWx0aXBsaWVyID0gdGhpcy5QYXlEYXlDb3VudDtcclxuXHJcbiAgICAgIGlmIChfaGFsZlBheWRheSkgX211bHRpcGxpZXIgPSBfbXVsdGlwbGllciAvIDI7XHJcblxyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5Eb3VibGVQYXlEYXlDb3VudCAhPSAwKSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyICogdGhpcy5Eb3VibGVQYXlEYXlDb3VudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgKj0gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkb3VibGVQYXlEYXlBZGRlZCA9IF9tdWx0aXBsaWVyICogX3BheWRheW11bHRpcGxpZXIgKiBEb3VibGVEYXlCdXNpbmVzc0hCICogX2RpY2UgKiAxMDAwO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAxMDAwICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAxMDAwICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IF9wYXltZW50IC8gMjtcclxuICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9hbW91bnRUb0JlQWRqdXN0ZWQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfVxyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgVG90YWxQYXlEYXlBbW91bnQgPSBfbXVsdGlwbGllciAqIF9wYXlkYXltdWx0aXBsaWVyICogSE1BbW91bnQgKiBfZGljZSAqIDEwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgIGVsc2UgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogKEhNQW1vdW50ICogX2RpY2UpICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuXHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKS1cIiArIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBcIitcIiArIGRvdWJsZVBheURheUFkZGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCpcIiArIF9tdWx0aXBsaWVyICsgXCIpLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiK1wiICsgZG91YmxlUGF5RGF5QWRkZWQgKyBcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgUGF5RGF5SW5mbyArPSBcIlxcblwiICsgXCJcXG5cIiArIFwiSG9tZSBCYXNlZCBCdXNpbmVzczogXCIgKyBITUFtb3VudCArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIF9kaWNlICsgXCJcXG5cIiArIFwiQW1vdW50IFJlY2VpdmVkOiAkXCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgVG90YWxQYXlEYXkgKz0gVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVQYXltZW50X1BheURheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQpIHtcclxuICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX2RvdWJsZVBheURheSA9IERvdWJsZVBheURheTtcclxuICAgICAgdmFyIF9wYXlkYXltdWx0aXBsaWVyID0gdGhpcy5QYXlEYXlDb3VudDtcclxuICAgICAgdmFyIF9oYWxmUGF5ZGF5ID0gTmV4dEhhbGZQYXlEYXk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9kb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfYW1vdW50ID0gQk1BbW91bnQgKyBCTUxvY2F0aW9ucztcclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG5cclxuICAgICAgaWYgKF9oYWxmUGF5ZGF5KSBfbXVsdGlwbGllciA9IF9tdWx0aXBsaWVyIC8gMjtcclxuXHJcbiAgICAgIGlmIChfZG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuRG91YmxlUGF5RGF5Q291bnQgIT0gMCkge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgKj0gMiAqIHRoaXMuRG91YmxlUGF5RGF5Q291bnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyICo9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZG91YmxlUGF5RGF5QWRkZWQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogRG91YmxlRGF5QnVzaW5lc3NCTSAqIF9kaWNlICogMjAwMDtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGFbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9sb2NhdGlvbnMgKiBfbXVsdGlwbGllciAqIF9kaWNlICogMjAwMCArIGRvdWJsZVBheURheUFkZGVkO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IF9wYXltZW50IC8gMjtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW2luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IF9wYXltZW50IC8gMjtcclxuICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9hbW91bnRUb0JlQWRqdXN0ZWQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSBUb3RhbFBheURheUFtb3VudCA9IF9tdWx0aXBsaWVyICogX3BheWRheW11bHRpcGxpZXIgKiBfYW1vdW50ICogX2RpY2UgKiAyMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG4gICAgICBlbHNlIFRvdGFsUGF5RGF5QW1vdW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbXVsdGlwbGllciAqIChfYW1vdW50ICogX2RpY2UpICogMjAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuXHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nID0gX2Ftb3VudDtcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIF9hbW91bnQgKyBcIipcIiArIFwiMjAwMCktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIF9hbW91bnQgKyBcIipcIiArIFwiMjAwMCpcIiArIF9tdWx0aXBsaWVyICsgXCIpLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiK1wiICsgZG91YmxlUGF5RGF5QWRkZWQgKyBcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgUGF5RGF5SW5mbyArPSBcIlxcblwiICsgXCJcXG5cIiArIFwiQnJpY2sgJiBNb3J0YXIgQnVzaW5lc3M6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIF9kaWNlICsgXCJcXG5cIiArIFwiQW1vdW50IFJlY2VpdmVkOiAkXCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgVG90YWxQYXlEYXkgKz0gVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIGlmICghTG9hblBheWVkKSB7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBfRXN0aW1hdGVMb2FuID0gMDtcclxuXHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAvL2lmIHBsYXllciBoYWQgc2tpcHBwZWQgbG9hbiBwcmV2aW91c2x5IGNhbGwgYWxsIGFtb3VudCBkdWVcclxuICAgICAgICBfRXN0aW1hdGVMb2FuID0gdGhpcy5HZXRMb2FuQW1vdW50X1BheURheSgpO1xyXG4gICAgICBlbHNlIF9Fc3RpbWF0ZUxvYW4gPSA1MDAwO1xyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX0VzdGltYXRlTG9hbikge1xyXG4gICAgICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IC0gX0VzdGltYXRlTG9hbjtcclxuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSB0aGlzLlBheURheVNldHVwVUkuU2tpcExvYW5CdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuU2tpcExvYW5CdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwib3V0IG9mIG1vbmV5XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCkge1xyXG4gICAgLy9hbGxcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9QYXlEYXkoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiQW1vdW50ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50ICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQW1vdW50ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50ICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2tpcExvYW5PbmVUaW1lX1BheURheSgpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc2tpcHBlZCB0aGUgbG9hbiBwYXltZW50LCBiYW5rIHdpbGwgY2FsbCB1cG9uIGNvbXBsZXRlIGxvYW4gYW1vdW50IG9uIG5leHQgcGF5ZGF5XCIpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIFNlbGxCdXNpbmVzc19QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9QYXlEYXkoX2Ftb3VudCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9hbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgRXhpdExvYW5TY3JlZW5fUGF5RGF5KCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdHYW1lX1BheURheSgpIHtcclxuICAgIC8vaWYgYmFua3J1cHRlZCB5b3UgY2FuIHN0YXJ0IG5ldyBnYW1lXHJcbiAgICB0aGlzLlNob3dUb2FzdChcIllvdSB3aWxsIGxvc2UgYWxsIHByb2dyZXNzIGFuZCBzdGFydCBuZXcgZ2FtZSBmcm9tIHRoZSBzdGFydC5cIiwgMzAwMCwgZmFsc2UpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuRXhpdExvYW5TY3JlZW5fUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIHRoaXMuRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UoKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlNob3dDYXJkXCIsIFwiXCIsIGZhbHNlKTtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5CYW5rcnVwdF9UdXJuRGVjaXNpb24oKTtcclxuICAgIH0sIDMwMTApO1xyXG4gIH0sXHJcblxyXG4gIFNob3dJbmZvKF9kYXRhKSB7XHJcbiAgICB0aGlzLlNob3dUb2FzdChfZGF0YS5pbmZvLCAyMDAwLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBQYXlEYXlDb21wbGV0ZWQoKSB7XHJcbiAgICBpZiAoSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCAmJiBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgJiYgTG9hblBheWVkKSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFsbCBwYXlkYXkgZG9uZVwiKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuXHJcbiAgICAgIGlmIChHaXZlUHJvZml0VXNlcklEICE9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdXIgd2hvbGUgUGF5ZGF5IGFtb3VudCAkXCIgKyBUb3RhbFBheURheSArIFwiIHdpbGwgYmUgdHJhbnNmZXJyZWQgdG8gb3RoZXIgcGxheWVyIG5vdy5cIiwgMjIwMCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBUb3RhbFBheURheTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihUb3RhbFBheURheSwgR2l2ZVByb2ZpdFVzZXJJRCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ29tcGxldGlvbigpO1xyXG4gICAgICAgIH0sIDMyMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNvbXBsZXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRGb3JDb21wbGV0aW9uKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcbiAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIF9tYW5hZ2VyLlRvZ2dsZVBheURheShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyID4gMCkge1xyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlci0tO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZUhhbGZQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgICAgX21hbmFnZXIuY2FsbFVwb25DYXJkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfbWFuYWdlci5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhQYXlEYXlJbmZvKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU2VsbCAmIG1hbmlwdWxhdGUgQnVzaW5lc3MgVUlcclxuICBUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcblxyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJTRUxMXCI7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NTZWxsUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuU2Nyb2xsQ29udGVudE5vZGU7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPT0gMCkgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICBlbHNlIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKHRydWUpO1xyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcblxyXG4gICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJCVVNJTkVTU1wiO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nID0gXCJObyBvZiBCdXNpbmVzc2VzIDogXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuU2Nyb2xsQ29udGVudE5vZGU7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZWxlY3RCdXNpbmVzc2ZvclBheURheSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAvLyAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKGZhbHNlKTtcclxuICAgICAgLy8gZWxzZVxyXG4gICAgICAvLyAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKHRydWUpO1xyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzVHVybm92ZXIgPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9pc0JvdCkgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuXHJcbiAgICB0aGlzLlNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc0JvdCk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IFVJXHJcbiAgVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIklOVkVTVFwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnV5T1JTZWxsIFVJXHJcbiAgVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVWSBPUiBTRUxMXCI7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBPbmUgUXVlc3Rpb24gc2V0dXAgVWlcclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TcGFjZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5XYWl0aW5nU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTaG93UXVlc3Rpb25Ub2FzdChfbXNnKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5XYWl0aW5nU2NyZWVuTGFiZWwuc3RyaW5nID0gX21zZztcclxuICB9LFxyXG5cclxuICBTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLCBfYWN0b3JzRGF0YSwgX2lzVHVybk92ZXIsIF9tb2RlSW5kZXggPSAwKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb25lUXVlc3Rpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgb25lUXVlc3Rpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX21zZykge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nID0gX21zZztcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU2VsZWN0IEJ1c2luZXNzIGZvciBkb3VibGUgcGF5ZGF5IHNldHVwXHJcbiAgVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NEb3VibGVQYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVkaXRUaXRsZV9CdXNpbmVzc1BheURheVVJU2V0dXAoX21haW5UaXRsZSwgX3RpbGVDb250ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5UaXRsZU5hbWUuc3RyaW5nID0gX21haW5UaXRsZTtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlRpdGxlQ29udGVudExhYmVsLnN0cmluZyA9IF90aWxlQ29udGVudDtcclxuICB9LFxyXG5cclxuICBFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpIHtcclxuICAgIHRoaXMuQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNjcmVlbl9BbG9uZ1R1cm5PdmVyX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpIHtcclxuICAgIHRoaXMuQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIENsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMgPSBbXTtcclxuICB9LFxyXG4gIFByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoX3RlbXBEYXRhLCBfYnVzaW5lc3NUeXBlKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gX2J1c2luZXNzVHlwZSkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgdmFyIF90b3RhbExvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgICAgdmFyIF9hbGxMb2NhdGlvbnNBbW91bnQgPSBfdG90YWxMb2NhdGlvbnMgKiAyNTAwMDtcclxuICAgICAgICAgIHZhciBfZmluYWxBbW91bnQgPSA1MDAwMCArIF9hbGxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUGFydG5lck5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShcIm5vbmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXNpbmVzc0RldGFpbFBheURheU5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVTZWxldGl2ZURvdWJsZVBheURheV9CdXNpbmVzc1BheURheVVJU2V0dXAoX2lzSG9tZUJhc2VkID0gZmFsc2UsIF9pc0JyaWNrQW5kTW9ydGFyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cChcIkJVU0lORVNTXCIsIFwiKlNlbGVjdCBhIGJ1c2luZXNzIHRvIHJlY2VpdmUgZG91YmxlIHBheWRheSBwcm9maXRzIHRocm91Z2ggb3V0IGdhbWUgb24gdGhhdCBidXNpbmVzcy5cIik7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGlmIChfaXNCcmlja0FuZE1vcnRhcikge1xyXG4gICAgICB0aGlzLlByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoX3RlbXBEYXRhLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzSG9tZUJhc2VkKSB7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfdGVtcERhdGEsIDEpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxlY3QgUGxheWVyIGZvciBwcm9maXRcclxuICBUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTEVDVCBQTEFZRVJcIjtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBzZWxlY3RQbGF5ZXJQcm9maXROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RQbGF5ZXJQcm9maXROb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfU2VsZWN0UGxheWVyRm9yUHJvZml0KCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgU2hvd1RvYXN0OiBmdW5jdGlvbiAobWVzc2FnZSwgdGltZSA9IFNob3J0TWVzc2FnZVRpbWUsIF9oYXNidXR0b24gPSB0cnVlKSB7XHJcbiAgICB0aGlzLlBvcFVwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUG9wVXBVSUxhYmVsLnN0cmluZyA9IG1lc3NhZ2U7XHJcbiAgICB2YXIgU2VsZlRvYXN0ID0gdGhpcztcclxuICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuXHJcbiAgICBpZiAobW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdCBtb2RlIG9ubHlcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGggPiAwICYmIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXS5Jc0JvdCkge1xyXG4gICAgICAgIC8vIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgLy8gICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAvLyAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgLy8gICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUb2FzdCgpO1xyXG4gICAgICAgICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICAgICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ29tcGxldGVUb2FzdCgpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0b2FzdCBjYWxsZWRcIik7XHJcbiAgICB0aGlzLlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgfSxcclxuXHJcbiAgU2hvd1Jlc3VsdFNjcmVlbjogZnVuY3Rpb24gKF9zdGF0dXMsIF9kYXRhKSB7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuUmVzdWx0U2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuU3RhdHVzTGFiZWwuc3RyaW5nID0gX3N0YXR1cztcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5Cb2R5TGFiZWwuc3RyaW5nID0gX2RhdGE7XHJcbiAgfSxcclxuXHJcbiAgUmVzdGFydFRoZUdhbWUoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc3RhcnRHYW1lKCk7XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudFRvU3luY0luZm8oX2RhdGFJbmZvKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICB2YXIgX2RhdGEgPSB7IGluZm86IF9kYXRhSW5mbyB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE1LCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IHsgaW5mbzogX2RhdGFJbmZvIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNSwgX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==