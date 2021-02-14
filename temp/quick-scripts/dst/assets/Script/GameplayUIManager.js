
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwic2VsZWN0UGxheWVyUHJvZml0Tm9kZXMiLCJidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMiLCJidXNpbmVzc0RldGFpbFBheURheU5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiZ2xvYmFsVHVyblRpbWVyIiwiUGF5RGF5SW5mbyIsIkludmVzdFNlbGxJbmZvIiwiVGltZXJUaW1lb3V0IiwiRG91YmxlRGF5QnVzaW5lc3NIQiIsIkRvdWJsZURheUJ1c2luZXNzQk0iLCJHaXZlUHJvZml0VXNlcklEIiwiVG90YWxQYXlEYXkiLCJMb2FuQW1vdW50RW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJUZW5UaG91c2FuZCIsIlRlbnR5VGhvdXNhbmQiLCJUaGlydHlUaG91c2FuZCIsIkZvcnR5VGhvdXNhbmQiLCJGaWZ0eVRob3VzYW5kIiwiT3RoZXIiLCJCdXNpbmVzc1NldHVwVUkiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZVVJIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUGxheWVyQ2FzaFVJIiwiQnVzaW5lc3NUeXBlVGV4dFVJIiwiVGV4dCIsIkJ1c2luZXNzTmFtZVRleHRVSSIsIkJ1c2luZXNzVHlwZUxhYmVsIiwiRWRpdEJveCIsIkJ1c2luZXNzTmFtZUxhYmVsIiwiSG9tZUJhc2VkTm9kZVVJIiwiTm9kZSIsIkJyaWNrQW5kTW9ydGFyTm9kZVVJIiwiVGltZXJVSSIsIlRpbWVyTm9kZSIsIkJ1c2luZXNzU2V0dXBOb2RlIiwiTG9hblNldHVwTm9kZSIsIkxvYW5BbW91bnQiLCJMb2FuQW1vdW50TGFiZWwiLCJXYWl0aW5nU3RhdHVzTm9kZSIsIkV4aXRCdXR0b25Ob2RlIiwiQWRkQnV0dG9uTm9kZSIsIkFkZENhc2hTY3JlZW4iLCJBZGRDYXNoTGFiZWwiLCJBZGRDYXNoRWRpdEJveCIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJUaW1lclRleHQiLCJCbG9ja2VyTm9kZSIsIkludmVzdEVudW0iLCJTdG9ja0ludmVzdCIsIkdvbGRJbnZlc3QiLCJTdG9ja1NlbGwiLCJHb2xkU2VsbCIsIkludmVzdFNlbGxVSSIsIlRpdGxlTGFiZWwiLCJEaWNlUmVzdWx0TGFiZWwiLCJQcmljZVRpdGxlTGFiZWwiLCJQcmljZVZhbHVlTGFiZWwiLCJCdXlPclNlbGxUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRWYWx1ZUxhYmVsIiwiQnV0dG9uTmFtZUxhYmVsIiwiSW52ZXN0U3RhdGUiLCJBbW91bnRFZGl0Qm94IiwiU2VsbEJ1c2luZXNzVUkiLCJDYXNoTGFiZWwiLCJQbGF5ZXJOYW1lTGFiZWwiLCJCdXNpbmVzc0NvdW50TGFiZWwiLCJTY3JvbGxDb250ZW50Tm9kZSIsIkJ1c2luZXNzU2VsbFByZWZhYiIsIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIiwiRXhpdEJ1dHRvbiIsIlR1cm5PdmVyRXhpdEJ1dHRvbiIsIlBheURheVVJIiwiSG9tZUJhc2VkTnVtYmVyTGFiZWwiLCJCTU51bWJlckxhYmVsIiwiQk1OdW1iZXJMb2NhdGlvbkxhYmVsIiwiUGFzc2VkUGF5RGF5Q291bnRMYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJPbmVRdWVzdGlvblVJIiwiUGxheWVyRGV0YWlsTGFiZWwiLCJEZXRhaWxzUHJlZmFiIiwiU2Nyb2xsQ29udGVudCIsIldhaXRpbmdTY3JlZW4iLCJXYWl0aW5nU2NyZWVuTGFiZWwiLCJEZWNpc2lvblRpdGxlTGFiZWwiLCJEZWNpc2lvbkNhc2hMYWJlbCIsIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsIiwiRGVjaXNpb25RdWVzdGlvbkxhYmVsIiwiUGFydG5lcnNoaXBVSSIsIldhaXRpbmdTdGF0dXNTY3JlZW4iLCJNYWluU2NyZWVuIiwiVGl0bGVOYW1lIiwiUGxheWVyTmFtZSIsIlBsYXllckNhc2giLCJQYXJ0bmVyU2hpcFByZWZhYiIsIkRlY2lzaW9uU2NyZWVuIiwiRGVjaXNpb25QbGF5ZXJOYW1lIiwiRGVjaXNpb25QbGF5ZXJDYXNoIiwiRGVjaXNpb25EZXNjcmlwdGlvbiIsIlJlc3VsdFVJIiwiUmVzdWx0U2NyZWVuIiwiU3RhdHVzTGFiZWwiLCJCb2R5TGFiZWwiLCJCdXNpbmVzc1BheURheVNldHVwVUkiLCJUaXRsZUNvbnRlbnRMYWJlbCIsIkJ1c2luZXNzUHJlZmFiIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSSIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSEJEaWNlQ291bnRlciIsIkJNRGljZUNvdW50ZXIiLCJOZXh0SGFsZlBheURheSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJPbmVRdWVzdGlvblNldHVwVUkiLCJQYXJ0bmVyc2hpcFNldHVwVUkiLCJSZXN1bHRTZXR1cFVJIiwiQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0VUkiLCJQb3BVcFVJIiwiUG9wVXBVSUxhYmVsIiwiUG9wVXBVSUJ1dHRvbiIsIkdhbWVwbGF5VUlTY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiQnVzaW5lc3NEb3VibGVQYXlTY3JlZW4iLCJPbmVRdWVzdGlvblNwYWNlU2NyZWVuIiwiT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbiIsIlNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbiIsIkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJBdmF0YXJTcHJpdGVzIiwiU3ByaXRlRnJhbWUiLCJSZXNldEFsbERhdGEiLCJSZXNldFR1cm5WYXJpYWJsZSIsIkdvbGRJbnZlc3RlZCIsIkdvbGRTb2xkIiwiU3RvY2tJbnZlc3RlZCIsIlN0b2NrU29sZCIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsIklzQm90VHVybiIsIlBheURheUNvdW50IiwiRG91YmxlUGF5RGF5Q291bnQiLCJJc0JhbmtydXB0ZWQiLCJCYW5rcnVwdGVkQW1vdW50IiwiQWRkQ2FzaEFtb3VudCIsIlRpbWVyIiwiVGltZXJTdGFydGVkIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJfc3RhdGUiLCJhY3RpdmUiLCJFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsIlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cCIsIkVuYWJsZUNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIlN0dWRlbnREYXRhIiwiZ2FtZUNhc2giLCJPbkNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIl92YWwiLCJPbkNsaWNrRG9uZUNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIl9nYW1lY2FzaCIsInBhcnNlSW50IiwiX2Ftb3VudCIsInVuZGVmaW5lZCIsIkNhc2giLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJVcGRhdGVVc2VyRGF0YSIsIlNob3dUb2FzdCIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsImlzRmlyc3RUaW1lIiwiaW5zaWRlR2FtZSIsIm1vZGVJbmRleCIsIl9pc0JhbmtydXB0ZWQiLCJfQmFua3J1cHRBbW91bnQiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiQnVzaW5lc3NJbmZvIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwibGVuZ3RoIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cCIsIkF2YXRhcklEIiwiYXZhdGFySWQiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsImlzTmFOIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIk9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsIkhvbWVCYXNlZCIsIk9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiYnJpY2tBbmRtb3J0YXIiLCJhbW91bnQiLCJDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAiLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJOb09mQnVzaW5lc3MiLCJMb2FuVGFrZW4iLCJNYXRoIiwiYWJzIiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiUHVzaERhdGFGb3JQbGF5ZXJMZWZ0IiwiX2RhdGEiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIl9wbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllcklEIiwiSG9tZUJhc2VkQW1vdW50IiwiSXNBY3RpdmUiLCJfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsInB1c2giLCJSYWlzZUV2ZW50IiwiX0lEIiwiX3BsYXllckxlZnQiLCJfaXNTcGVjdGF0ZSIsIlBob3RvbkFjdG9yIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJNYXhQbGF5ZXJzIiwiR2V0UmVhbEFjdG9ycyIsImFjdG9yTnIiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYnVzaW5lc3NOYW1lIiwiX2lzSG9tZUJhc2VkIiwiU3RhcnRHYW1lIiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJFeGl0X0J1c2luZXNzU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJHZXRUdXJuTnVtYmVyIiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiX2FjdGl2ZSIsImNsZWFyVGltZW91dCIsIlVwZGF0ZVRpbWVyIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIl9pc1R1cm5PdmVyIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiUm9sbE9uZURpY2UiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAiLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiUmVzZXRfUGFydG5lclNoaXBTZXR1cCIsIl9tYW5hZ2VyIiwiX3RlbXBEYXRhIiwibm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0TmFtZSIsIlNldFR5cGUiLCJTZXRCdXNpbmVzc0luZGV4IiwiX3RvdGFsTG9jYXRpb25zIiwiTG9jYXRpb25zTmFtZSIsIlNldEJ1c2luZXNzTW9kZSIsIlNldE1vZGUiLCJTZXRCdXNpbmVzc1ZhbHVlIiwiU2V0RmluYWxCdXNpbmVzc1ZhbHVlIiwiX2FsbExvY2F0aW9uc0Ftb3VudCIsIl9maW5hbEFtb3VudCIsIlNldEJhbGFuY2UiLCJTZXRMb2NhdGlvbnMiLCJJc1BhcnRuZXJzaGlwIiwiVG9nZ2xlUGFydG5lclNoaXBCdXR0b24iLCJTZXRQYXJ0bmVyTmFtZSIsIlBhcnRuZXJOYW1lIiwiRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwIiwiX21zZyIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkV4aXRfUGFydG5lclNoaXBTZXR1cCIsImRlc3Ryb3kiLCJSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cCIsIl9hY3RvciIsIl90dXJuIiwiVHVybiIsIl9wbGF5ZXJEYXRhIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJfYnVzaW5lc3NWYWx1ZSIsIkJ1c1ZhbHVlIiwiX3BheUFtb3VudCIsIl9idXNpbmVzc01vZGUiLCJDaGVja1NwZWN0YXRlIiwiQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hbGxBY3RvcnMiLCJSb29tQWN0b3JzIiwibXlJbmRleCIsIkdldE15SW5kZXgiLCJSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIkNhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfaXNBY2NlcHRlZCIsIl9wYXltZW50IiwiX2lzQ2FuY2VsbGVkIiwiX3VJRCIsIl9tYWluRGF0YSIsIkFjY2VwdGVkIiwiQ2FzaFBheW1lbnQiLCJDYW5jZWxsZWQiLCJCdXNpbmVzc0luZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hY2NlcHRlZCIsIl9jYXNoIiwiX2NhbmNlbGxlZCIsIl91aWQiLCJQYXJ0bmVySUQiLCJpbmNsdWRlcyIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiUmFpc2VFdmVudFRvU3luY0luZm8iLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX2hNQW1vdW50IiwiX2JtQW1vdW50IiwiX2JtTG9jYXRpb24iLCJQYXlkYXlDb3VudGVyIiwiRG91YmxlUGF5Q291bnRlciIsIl9oYWxmUGF5ZGF5IiwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5IiwiVXNlcklERm9yUHJvZml0UGF5RGF5IiwiUmVjZWl2ZURvdWJsZVBheURheSIsIl9yZXMiLCJfdGltZSIsIlVwZGF0ZUNhc2hfUGF5RGF5IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQYXlEYXlDb21wbGV0ZWQiLCJPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfZG91YmxlUGF5RGF5IiwiX2RpY2UiLCJfYW1vdW50VG9CZVNlbmQiLCJfYW1vdW50VG9CZUFkanVzdGVkIiwiX211bHRpcGxpZXIiLCJfcGF5ZGF5bXVsdGlwbGllciIsImRvdWJsZVBheURheUFkZGVkIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIlJlY2VpdmVQYXltZW50X1BheURheSIsIl9sb2NhdGlvbnMiLCJfRXN0aW1hdGVMb2FuIiwiU2tpcExvYW5PbmVUaW1lX1BheURheSIsIlNlbGxCdXNpbmVzc19QYXlEYXkiLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdExvYW5TY3JlZW5fUGF5RGF5IiwiU3RhcnROZXdHYW1lX1BheURheSIsImVtaXQiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2hvd0luZm8iLCJpbmZvIiwiUmFpc2VFdmVudEZvckNvbXBsZXRpb24iLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIk5leHRUdXJuSGFsZlBheURheUNvdW50ZXIiLCJUb2dnbGVIYWxmUGF5TmV4dFR1cm4iLCJjYWxsVXBvbkNhcmQiLCJUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJBbW91bnQiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJTZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5IiwiX2lzVHVybm92ZXIiLCJFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIlNldEludmVzdFVJX0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJIiwiVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTaG93UXVlc3Rpb25Ub2FzdCIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX215RGF0YSIsIl9hY3RvcnNEYXRhIiwiX21vZGVJbmRleCIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsInNldFBsYXllck5hbWUiLCJzZXRQbGF5ZXJVSUQiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRfT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIl9tYWluVGl0bGUiLCJfdGlsZUNvbnRlbnQiLCJFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIkNsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiRXhpdFNjcmVlbl9BbG9uZ1R1cm5PdmVyX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIlByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAiLCJfYnVzaW5lc3NUeXBlIiwiRW5hYmxlU2VsZXRpdmVEb3VibGVQYXlEYXlfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiX2lzQnJpY2tBbmRNb3J0YXIiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIkV4aXRfU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyRm9yUHJvZml0IiwibWVzc2FnZSIsInRpbWUiLCJfaGFzYnV0dG9uIiwiU2VsZlRvYXN0IiwibW9kZSIsIkNvbXBsZXRlVG9hc3QiLCJTaG93UmVzdWx0U2NyZWVuIiwiX3N0YXR1cyIsIlJlc3RhcnRUaGVHYW1lIiwiUmVzdGFydEdhbWUiLCJfZGF0YUluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxFQUExQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBQ0EsSUFBSUMsdUJBQXVCLEdBQUcsRUFBOUI7QUFDQSxJQUFJQyw4QkFBOEIsR0FBRyxFQUFy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O0FBQUU0TixRQUFBQSxJQUFJLEVBQUVxRTtBQUFSLE9BQVo7QUFDQTltQixNQUFBQSx3QkFBd0IsQ0FBQ2tQLFFBQXpCLENBQWtDUSwwQkFBbEMsR0FBK0Q0RixVQUEvRCxDQUEwRSxFQUExRSxFQUE4RVQsS0FBOUU7QUFDRCxLQUpELE1BSU8sSUFBSUMsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDckI7QUFDQSxVQUFJLEtBQUs1RyxTQUFULEVBQW9CO0FBQ2xCLFlBQUkyRyxLQUFLLEdBQUc7QUFBRTROLFVBQUFBLElBQUksRUFBRXFFO0FBQVIsU0FBWjtBQUNBOW1CLFFBQUFBLHdCQUF3QixDQUFDa1AsUUFBekIsQ0FBa0NRLDBCQUFsQyxHQUErRDRGLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFVCxLQUE5RTtBQUNEO0FBQ0Y7QUFDRjtBQTk4RThCLENBQVQsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lTWFuYWdlciA9IG51bGw7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG52YXIgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG52YXIgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMgPSBbXTtcclxudmFyIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG52YXIgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxudmFyIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgQ2FuY2VsbGVkSUQgPSBbXTtcclxudmFyIFN0YXJ0R2FtZUNhc2ggPSAyMDAwMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxudmFyIEhNQW1vdW50ID0gMDtcclxudmFyIEJNQW1vdW50ID0gMDtcclxudmFyIEJNTG9jYXRpb25zID0gMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbnZhciBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG52YXIgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbnZhciBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxudmFyIFByZXZpb3VzQ2FzaCA9IDA7XHJcbnZhciBUaW1lb3V0UmVmO1xyXG52YXIgQ29tcGxldGlvbldpbmRvd1RpbWUgPSA4MDAwO1xyXG52YXIgTG9uZ01lc3NhZ2VUaW1lID0gNTAwMDtcclxudmFyIFNob3J0TWVzc2FnZVRpbWUgPSAyNTAwO1xyXG52YXIgZ2xvYmFsVHVyblRpbWVyID0gMzA7XHJcbnZhciBQYXlEYXlJbmZvID0gXCJcIjtcclxudmFyIEludmVzdFNlbGxJbmZvID0gXCJcIjtcclxudmFyIFRpbWVyVGltZW91dDtcclxudmFyIERvdWJsZURheUJ1c2luZXNzSEIgPSAwO1xyXG52YXIgRG91YmxlRGF5QnVzaW5lc3NCTSA9IDA7XHJcbnZhciBHaXZlUHJvZml0VXNlcklEID0gXCJcIjtcclxudmFyIFRvdGFsUGF5RGF5ID0gMDtcclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG4vLyB2YXIgU2hvcnRNZXNzYWdlVGltZSA9IDUwOy8vMjUwMFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgYW1vdW50IG9mIGxvYW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIExvYW5BbW91bnRFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBUZW5UaG91c2FuZDogMTAwMDAsXHJcbiAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gIEZvcnR5VGhvdXNhbmQ6IDQwMDAwLFxyXG4gIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gIE90aGVyOiA2LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBjYXNoXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgYnVzaW5lc3MgdHlwZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhck5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIixcclxuICAgIH0sXHJcbiAgICBUaW1lck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHRpbWVyIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5TZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IExvYW5BbW91bnRFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgYWxsIGxhYmVscyBvZiBhbW91bnRzIGluIGxvYW4gVUlcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkIENhc2ggYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaFNjcmVlbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaCBsYWJlbCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZENhc2ggZWRpdEJveCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHVybkRlY2lzaW9uU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlR1cm5EZWNpc2lvblNldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFya2V0aW5nRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgbWFya2V0aW5nIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBHb2xkRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBnb2xkIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTdG9ja0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IHN0b2NrIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byBjYXNoIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4cG5hZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyVGV4dDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclRleHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGxhYmVsIG9mIHRpbWVyIHRleHQgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgICBCbG9ja2VyTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCbG9ja2VyTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBub2RlIG9mIGJsb2NrZXIgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdG9ja0ludmVzdDogMSxcclxuICBHb2xkSW52ZXN0OiAyLFxyXG4gIFN0b2NrU2VsbDogMyxcclxuICBHb2xkU2VsbDogNCxcclxuICBPdGhlcjogNSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RTZWxsVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZSBSZXN1bHQgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIHZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1eU9yU2VsbFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXlPclNlbGwgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXR0b25OYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV0dG9uTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgYnV0dG9uIG5hbWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFN0YXRlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkludmVzdFN0YXRlXCIsXHJcbiAgICAgIHR5cGU6IEludmVzdEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IEludmVzdEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEFtb3VudEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50RWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsbEJ1c2luZXNzVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2VsbFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGF5RGF5VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWROdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxvY2F0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhc3NlZFBheURheUNvdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFBhc3NlZFBheURheUNvdW50TGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTUJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhckJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIE1haW5QYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBNYWluUGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0UGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5SZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuUmVzdWx0UGFuZWxOb2RlIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTY3JlZW5UaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFNjcmVlblRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRTY3JlZW5UaXRsZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2VSZXN1bHQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQnVzaW5lc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEJ1c2luZXNzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNraXBMb2FuQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBMb2FuQnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNraXBMb2FuQnV0dG9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuRm90dGVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkZvdHRlckxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuRm90dGVyTGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlPclNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgT25lUXVlc3Rpb25VSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgT25lUXVlc3Rpb25VSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk9uZVF1ZXN0aW9uVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJEZXRhaWxMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJEZXRhaWxMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERldGFpbHNQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGV0YWlsc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBEZXRhaWxzUHJlZmFiIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIFNjcm9sbENvbnRlbnQgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBub2RlIFdhaXRpbmdTY3JlZW4gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW5MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU2NyZWVuTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbkxhYmVsIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIHF1ZXN0aW9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUmVzdWx0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJlc3VsdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUmVzdWx0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBSZXN1bHRTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0U2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RhdHVzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQm9keUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJvZHlMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzUGF5RGF5U2V0dXBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NQYXlEYXlTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NQYXlEYXlTZXR1cFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlQ29udGVudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlQ29udGVudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckRldGFpbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckRldGFpbExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIERldGFpbHNQcmVmYWIgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgU2Nyb2xsQ29udGVudCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgR2FtZXBsYXlVSU1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGFJbnRhbmNlO1xyXG52YXIgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZTtcclxudmFyIFJlcXVpcmVkQ2FzaDtcclxudmFyIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbi8vdHVybiBkZWNpc2lvbnNcclxudmFyIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG52YXIgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbi8vYnV5b3JzZWxsXHJcbnZhciBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbnZhciBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG52YXIgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG52YXIgRGljZVJlc3VsdDtcclxudmFyIE9uY2VPclNoYXJlO1xyXG52YXIgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbnZhciBIQkRpY2VDb3VudGVyID0gMDtcclxudmFyIEJNRGljZUNvdW50ZXIgPSAwO1xyXG52YXIgTmV4dEhhbGZQYXlEYXkgPSBmYWxzZTtcclxuXHJcbnZhciBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIExvYW5QYXllZCA9IGZhbHNlO1xyXG52YXIgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG52YXIgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lcGxheVVJTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBCdXNpbmVzc1NldHVwRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBCdXNpbmVzc1NldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybkRlY2lzaW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBUdXJuRGVjaXNpb25TZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBJbnZlc3RTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQYXlEYXlVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxsQnVzaW5lc3NVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxsQnVzaW5lc3NVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEludmVzdFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQnV5T3JTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnV5T3JTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IE9uZVF1ZXN0aW9uVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgT25lUXVlc3Rpb25VSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJzaGlwU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUGFydG5lcnNoaXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBQYXJ0bmVyc2hpcFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUmVzdWx0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUmVzdWx0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1BheURheVVJU2V0dXA6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEJ1c2luZXNzUGF5RGF5U2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXNpbmVzc1BheURheVNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RQbGF5ZXJGb3JQcm9maXRVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFBvcFVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSUJ1dHRvbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHNldHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEdhbWVwbGF5VUlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBnYW1lcGxheSB1aSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIERlY2lzaW9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3QgJiBzZWxsIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFBheURheSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxsQnVzaW5lc3Mgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEJ1eU9yU2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc0RvdWJsZVBheVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEJ1c2luZXNzRG91YmxlUGF5IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uU3BhY2VTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvblNwYWNlIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvbkRlY2lzaW9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGVjdFBsYXllckZvclByb2ZpdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBUZW1wRGljZVRleHQ6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsYWJlbCByZWZlcmVuY2UgZm9yIGRpY2VcIixcclxuICAgIH0sXHJcbiAgICBMZWF2ZVJvb21CdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEF2YXRhclNwcml0ZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVzZXRzIHRoaXMgY2xhc3MgZ2xvYmFsIHZhcmlhYmxlcyBhbmQgb3RoZXIgbmVjZXNzYXJ5IGRhdGEgb25Mb2FkXHJcbiAgICoqL1xyXG4gIFJlc2V0QWxsRGF0YSgpIHtcclxuICAgIERvdWJsZURheUJ1c2luZXNzSEIgPSAwO1xyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NCTSA9IDA7XHJcbiAgICBOZXh0SGFsZlBheURheSA9IGZhbHNlO1xyXG4gICAgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICAgIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxuICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzID0gW107XHJcbiAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxuICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMgPSBbXTtcclxuICAgIFBhcnRuZXJTaGlwRGF0YSA9IG51bGw7XHJcbiAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBITUFtb3VudCA9IDA7XHJcbiAgICBCTUFtb3VudCA9IDA7XHJcbiAgICBCTUxvY2F0aW9ucyA9IDA7XHJcbiAgICBTZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwO1xyXG4gICAgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0Nhc2ggPSAwO1xyXG4gICAgVGltZW91dFJlZiA9IG51bGw7XHJcbiAgICBHaXZlUHJvZml0VXNlcklEID0gXCJcIjtcclxuICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbiAgICAvL3R1cm4gZGVjaXNpb25zXHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4gICAgLy9idXlvcnNlbGxcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgICBEaWNlUmVzdWx0ID0gMDtcclxuICAgIE9uY2VPclNoYXJlO1xyXG4gICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbiAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBUb3RhbFBheURheSA9IDA7XHJcbiAgICBIQkRpY2VDb3VudGVyID0gMDtcclxuICAgIEJNRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgUGF5RGF5SW5mbyA9IFwiXCI7XHJcbiAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZXNldHMgdHVybiB2YXJpYWJsZXMgZm9yIGdvbGRpbnZlc3QvZ29sZHNvbGQvc3Rva2NpbnZlc3Qvc3RvY2tzb2xkXHJcbiAgICoqL1xyXG4gIFJlc2V0VHVyblZhcmlhYmxlKCkge1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZXMgb2YgY2xhc3MvZXMgbmVlZGVkLlxyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAoIUdhbWVNYW5hZ2VyIHx8IEdhbWVNYW5hZ2VyID09IG51bGwpIEdhbWVNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gdGhpcyBub2RlIGdldHMgYWN0aXZlXHJcbiAgICoqL1xyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gdGhpcyBub2RlIGdldHMgZGVhY3RpdmVcclxuICAgKiovXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIHRoZSBjbGFzcyBpcyBsb2FkZWRcclxuICAgKiovXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcblxyXG4gICAgLy9kZWNsYXJpbmcgbG9jYWwgdmFyaWFibGVzXHJcbiAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Hb2xkU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja0ludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBmYWxzZTtcclxuICAgIHRoaXMuUGF5RGF5Q291bnQgPSAwO1xyXG4gICAgdGhpcy5Eb3VibGVQYXlEYXlDb3VudCA9IDA7XHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gMDtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgIHRoaXMuVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICBUaW1lclRpbWVvdXQgPSBudWxsO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoZmFsc2UpO1xyXG4gIH0sXHJcbiAgLy8jcmVnaW9uIFNwZWN0YXRlIFVJIFNldHVwXHJcbiAgSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAvLyBjb25zb2xlLnRyYWNlKFwiY2xvc2VkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRcIik7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5MZWF2ZVJvb21CdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIE9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbCh0cnVlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSwgNTAwKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnVzaW5lc3NTZXR1cCB3aXRoIGxvYW5cclxuICAvL0J1c2luZXNzIHNldHVwIHVpLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChfc3RhdGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgdGhpcy5Ub2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaDtcclxuICB9LFxyXG5cclxuICBPbkNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKF92YWwpIHtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgT25DbGlja0RvbmVDYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwKGZhbHNlKTtcclxuICAgIHZhciBfZ2FtZWNhc2ggPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCk7XHJcbiAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KHRoaXMuQWRkQ2FzaEFtb3VudCk7XHJcbiAgICBpZiAodGhpcy5BZGRDYXNoQW1vdW50ICE9IG51bGwgJiYgdGhpcy5BZGRDYXNoQW1vdW50ICE9IFwiXCIgJiYgdGhpcy5BZGRDYXNoQW1vdW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAoX2Ftb3VudCA8PSBfZ2FtZWNhc2gpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaC50b1N0cmluZygpO1xyXG4gICAgICAgIF9nYW1lY2FzaCAtPSBfYW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX2dhbWVjYXNoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVXBkYXRlVXNlckRhdGEoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gsIC0xLCAtMSk7XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiQ2FzaCAkXCIgKyB0aGlzLkFkZENhc2hBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZC5cIik7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG8gbm90IGhhdmUgZW5vdWdoIGluIGdhbWUgY2FzaC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSA9IGZhbHNlLCBtb2RlSW5kZXggPSAwLCBfaXNCYW5rcnVwdGVkID0gZmFsc2UsIF9CYW5rcnVwdEFtb3VudCA9IDAsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIC8vY2FsbGVkIGZpcnN0IHRpbWUgZm9ybSBHYW1lTWFuYWdlciBvbmxvYWQgZnVuY3Rpb25cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gX2lzQ2FyZEZ1bmN0aW9uYWxpdHk7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IF9HaXZlbkNhc2g7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoO1xyXG5cclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gX2lzQmFua3J1cHRlZDtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IF9CYW5rcnVwdEFtb3VudDtcclxuXHJcbiAgICBpZiAoX2lzQmFua3J1cHRlZCkgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG5cclxuICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lLCBtb2RlSW5kZXgsIF9pc0JhbmtydXB0ZWQpO1xyXG4gIH0sXHJcbiAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUgPSBmYWxzZSwgbW9kZUluZGV4ID0gMCwgX2lzQmFua3J1cHRlZCA9IGZhbHNlKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXJkRnVuY3Rpb25hbGl0eSA9IG5ldyBHYW1lTWFuYWdlci5DYXJkRGF0YUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoaXNGaXJzdFRpbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBTdGFydEdhbWVDYXNoO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAoKTtcclxuXHJcbiAgICBpZiAoaW5zaWRlR2FtZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IGluZGV4O1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgaWYgKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgICAgICBpZiAoU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gMDtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIFByZXZpb3VzQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IEdpdmVuQ2FzaEJ1c2luZXNzO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZSk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmF2YXRhcklkKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBHZXRPYmpfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuQnVzaW5lc3NTZXR1cERhdGE7XHJcbiAgfSxcclxuICBPbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKG5hbWUpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJVSUQgPSBVSUQ7XHJcbiAgfSxcclxuICBPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgaWYgKGlzTmFOKFVJRCkgfHwgVUlEID09IHVuZGVmaW5lZCkgVUlEID0gMDtcclxuXHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5BdmF0YXJJRCA9IFVJRDtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc05hbWVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBcIlwiO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmU7XHJcbiAgfSxcclxuICBPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQ7XHJcbiAgfSxcclxuICBPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IGFtb3VudDtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBhbW91bnQ7XHJcbiAgfSxcclxuICBDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbHJlYWR5IHRha2VuIGxvYW4gb2YgJFwiICsgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG8gbm90IG5lZWQgbG9hbiwgeW91IGhhdmUgZW5vdWdoIGNhc2ggdG8gYnV5IGN1cnJlbnQgc2VsZWN0ZWQgYnVzaW5lc3MuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgUmVxdWlyZWRDYXNoID0gTWF0aC5hYnMocGFyc2VJbnQoUGxheWVyRGF0YUludGFuY2UuQ2FzaCkgLSBhbW91bnQpO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIiRcIiArIFJlcXVpcmVkQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXBcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCg1MDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGJ1c2luZXNzIGJldHdlZW4gSG9tZSBCYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuICBIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaW5kZXggPT0gaSkgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5PdGhlcjtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDApO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlblRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMSk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGVudHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDIpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRoaXJ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMyk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uRm9ydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDQpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZpZnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg1KTtcclxuICB9LFxyXG4gIE9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPT0gTG9hbkFtb3VudEVudW0uT3RoZXIpIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IFJlcXVpcmVkQ2FzaDtcclxuICAgIGVsc2UgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gcGFyc2VJbnQodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50KTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IHRydWU7XHJcbiAgICB0aGlzLk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICsgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICB9LFxyXG5cclxuICBQdXNoRGF0YUZvclBsYXllckxlZnQoX2RhdGEpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IDIwMDAwO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuUGxheWVySUQgPSBfZGF0YS51c2VySUQ7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lID0gX2RhdGEubmFtZTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkF2YXRhcklEID0gMDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA9IDE7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQ2FyZEZ1bmN0aW9uYWxpdHkgPSBuZXcgR2FtZU1hbmFnZXIuQ2FyZERhdGFGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPSBcIlNhbG9vblwiO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPSBcIkV2YSBCZWF1dHlcIjtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMSwgX3BsYXllckRhdGFJbnRhbmNlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIFN5bmNEYXRhOiBmdW5jdGlvbiAoX2RhdGEsIF9JRCwgX3BsYXllckxlZnQgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9pc1NwZWN0YXRlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdO1xyXG5cclxuICAgIGlmIChfaXNTcGVjdGF0ZSkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFJlYWxBY3RvcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9wbGF5ZXJMZWZ0KSB7XHJcbiAgICAgIGlmIChfSUQgIT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmFjdG9yTnIpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoID49IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycykge1xyXG4gICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCB0cnVlLCB0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFB1cmNoYXNlQnVzaW5lc3M6IGZ1bmN0aW9uIChfYW1vdW50LCBfYnVzaW5lc3NOYW1lLCBfaXNIb21lQmFzZWQpIHtcclxuICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIDwgX2Ftb3VudCAmJiAhU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiICsgX2J1c2luZXNzTmFtZSArIFwiIGJ1c2luZXNzLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9pc0hvbWVCYXNlZCkge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPCAzKSB7XHJcbiAgICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJSZXZlcnRpbmcgYmFjayBsb2FuIGFtb3VudC5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Jc0JhbmtydXB0ID0gdHJ1ZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQmFua3J1cHRBbW91bnQgPSB0aGlzLkJhbmtydXB0ZWRBbW91bnQ7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAvL3NldHRpbmcgcGxheWVyIGN1cnJlbnQgZGF0YSBpbiBjdXN0b20gcHJvcGVydGllcyB3aGVuIGhpcy9oZXIgdHVybiBvdmVyc1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IGJhbmtydXB0ZWQ6IHRydWUsIHR1cm46IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCksIFBsYXllckRhdGFNYWluOiBQbGF5ZXJEYXRhSW50YW5jZSB9IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg5LCBfZGF0YSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIEFJXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICAgIH0sIDE2MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwibm8gbW9kZSBzZWxlY3RlZFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUGF5QW1vdW50VG9QbGF5R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9PSBcIlwiKSB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIHR5cGUuXCIpO1xyXG4gICAgZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPT0gXCJcIikgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyBuYW1lLlwiKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lIHx8IFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBhIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgaG9tZWJhc3NlZFxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCwgXCJob21lXCIsIHRydWUpO1xyXG4gICAgICBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcyg1MDAwMCwgXCJicmljayBhbmQgbW9ydGFyXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlN0YXJ0R2FtZSA9PSB0cnVlIHx8IHRoaXMuSXNCYW5rcnVwdGVkID09IHRydWUpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgaWYgKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwICE9IC0xKSB7XHJcbiAgICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcnRpbnRpbmcgYWxsIHZhbHVlcyB0byBjb25zb2xlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG5hbWU6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgSUQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIklzIHBsYXllciBib3Q6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLklzQm90KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gb2YgYnVzaW5lc3Mgb2YgcGxheWVyIChzZWUgYmVsb3cpOiBcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNhc2g6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkNhc2gpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgdGFrZW4gbG9hbjogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hblRha2VuKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW4gbG9hbiBhbW91bnQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBpc2FjdGl2ZTtcclxuXHJcbiAgICB2YXIgX2FjdGl2ZSA9IGlzYWN0aXZlO1xyXG5cclxuICAgIGlmIChfYWN0aXZlKSB7XHJcbiAgICAgIF9hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkJsb2NrZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlRpbWVyID0gZ2xvYmFsVHVyblRpbWVyO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5UaW1lclRleHQuc3RyaW5nID0gdGhpcy5UaW1lciArIFwiIHNlY29uZHMgYXJlIGxlZnQgdG8gY2hvb3NlIGFib3ZlIG9wdGlvbnMgZXhjZXB0ICdSb2xsIFRoZSBEaWNlJ1wiO1xyXG4gICAgICBjbGVhclRpbWVvdXQoVGltZXJUaW1lb3V0KTtcclxuICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVyVGltZW91dCk7XHJcbiAgICAgIHRoaXMuVGltZXIgPSAwO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVGltZXIoKSB7XHJcbiAgICBpZiAodGhpcy5UaW1lciA+IDApIHtcclxuICAgICAgdGhpcy5UaW1lciA9IHRoaXMuVGltZXIgLSAxO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IHRoaXMuVGltZXIgKyBcIiBzZWNvbmRzIGFyZSBsZWZ0IHRvIGNob29zZSBhYm92ZSBvcHRpb25zIGV4Y2VwdCAnUm9sbCBUaGUgRGljZSdcIjtcclxuICAgICAgVGltZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lclRpbWVvdXQpO1xyXG4gICAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlRpbWVyVGV4dC5zdHJpbmcgPSBcIlRpbWVyIGlzIG92ZXIsIHlvdSBjYW4gc2VsZWN0IG9ubHkgJ1JvbGwgVGhlIERpY2UnIG5vdy5cIjtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkJsb2NrZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5DYXNoQW1vdW50TGFiZWwuc3RyaW5nID0gXCIkIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLkNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gXCJcIiB8fCBUZW1wTWFya2V0aW5nQW1vdW50ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB0aGlzLm1hcmtldGluZ0Ftb3VudCA9IHBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuXHJcbiAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdGhpcy5tYXJrZXRpbmdBbW91bnQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCArIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgKyBcIiAsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKyBcIi5cIixcclxuICAgICAgICAgIExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGlmIHBsYXllciBoYXMgbW9yZSB0aGFuIDUwMDAkXHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBhbHJlYWR5IGhpcmVkIGEgbGF3eWVyLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIFRlbXBIaXJpbmdMYXd5ZXIgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFRlbXBIaXJpbmdMYXd5ZXIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gNTAwMDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llciwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFwiLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInNvcnJ5LCB5b3UgZG9udCBoYXZlIGVub3VnaCBtb25leSB0byBoaXJlIGEgbGF3eWVyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oX25hbWUpIHtcclxuICAgIExvY2F0aW9uTmFtZSA9IF9uYW1lO1xyXG4gIH0sXHJcbiAgT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGV2ZW50ID0gbnVsbCwgX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgLy9pZiBwbGF5ZXIgaGFzIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgaGUgY291bGQgZXhwYW5kIGl0XHJcbiAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzc1wiKTtcclxuXHJcbiAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBfaXNDYXJkRnVuY3Rpb25hbGl0eTtcclxuICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gX0dpdmVuQ2FzaDtcclxuICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g7XHJcblxyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdmFyIGdlbmVyYXRlZExlbmd0aCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSwgR2l2ZW5DYXNoQnVzaW5lc3MsIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcblxyXG4gICAgaWYgKGdlbmVyYXRlZExlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm8gYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyB0byBleHBhbmQuXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTYwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJzdGFydGluZyBuZXcgYnVzaW5lc3NcIik7XHJcbiAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLkdvbGRJbnZlc3RlZCkge1xyXG4gICAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0O1xyXG4gICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJJbnZlc3QgSW4gR09MRFwiLCBEaWNlUmVzdWx0LCBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBCVVlcIiwgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIkJVWVwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChldmVudCA9IG51bGwsIF9pc1R1cm5PdmVyID0gZmFsc2UpIHtcclxuICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gX2lzVHVybk92ZXI7XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihfaXNUdXJuT3Zlcik7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KSBTdG9ja0J1c2luZXNzTmFtZSA9IFwiRnJpZW5kJ3MgQnVzaW5lc3NcIjtcclxuXHJcbiAgICBpZiAoIXRoaXMuU3RvY2tJbnZlc3RlZCB8fCBUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFN0b2NrQnVzaW5lc3NOYW1lID09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuXHJcbiAgICAgICAgaWYgKCFUdXJuT3ZlckZvckludmVzdCkgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBlbHNlIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJJbnZlc3QgaW4gU3RvY2tcIiwgRGljZVJlc3VsdCwgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gQlVZXCIsIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJCVVlcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLkdvbGRTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIEdPTERcIiwgRGljZVJlc3VsdCwgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLCBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIlNFTExcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIFNUT0NLXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBzaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIiwgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJTRUxMXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgc2hhcmVzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgIC8vIHRoaXMuU2hvd1RvYXN0KFwid29yayBpbiBwcm9ncmVzcywgY29taW5nIHNvb24uLi5cIik7XHJcbiAgICAvLyB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsRGljZSgpO1xyXG4gIH0sXHJcblxyXG4gIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvL3RoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGFydG5lcnNoaXAgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLldhaXRpbmdTdGF0dXNTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBhcnRuZXJTaGlwUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIHZhciBfdG90YWxMb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgIHZhciBfYWxsTG9jYXRpb25zQW1vdW50ID0gX3RvdGFsTG9jYXRpb25zICogMjUwMDA7XHJcbiAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlBhcnRuZXJOYW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoXCJub25lXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZykge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZS5zdHJpbmcgPSBfdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25EZXNjcmlwdGlvbi5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpIHtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IHRydWU7XHJcbiAgICBQYXJ0bmVyU2hpcERhdGEgPSBfZGF0YTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSBfYnVzaW5lc3NNb2RlID0gXCJIb21lIEJhc2VkXCI7XHJcbiAgICBlbHNlIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIF9idXNpbmVzc01vZGUgPSBcIkJyaWNrICYgTW9ydGFyXCI7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbXNnID1cclxuICAgICAgICBcInlvdSBoYXZlIHJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGJ5IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICtcclxuICAgICAgICBcIiAsIGZvbGxvd2luZyBhcmUgdGhlIGRldGFpbHMgb2YgYnVzaW5lc3M6IFwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE5hbWU6IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NOYW1lICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE1vZGU6IFwiICtcclxuICAgICAgICBfYnVzaW5lc3NNb2RlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIFZhbHVlOiAkXCIgK1xyXG4gICAgICAgIF9idXNpbmVzc1ZhbHVlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkNhc2ggUGF5bWVudDogJFwiICtcclxuICAgICAgICBfcGF5QW1vdW50ICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcImlmIG9mZmVyIGlzIGFjY2VwdGVkIHlvdSB3aWxsIHJlY2VpdmUgNTAlIHNoYXJlIG9mIHRoYXQgcGFydGljdWxhciBidXNpbmVzcyBhbmQgd2lsbCByZWNlaXZlIHByb2ZpdC9sb3NlIG9uIHRoYXQgcGFydGljdWxhciBidXNpbmVzcy5cIjtcclxuXHJcbiAgICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoID49IF9wYXlBbW91bnQpIHtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoIC09IF9wYXlBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAodHJ1ZSwgX3BheUFtb3VudCwgZmFsc2UsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJjb25ncmF0dWxhdGlvbnMhIHlvdSBoYXZlIHN0YXJ0ZWQgYnVzaW5lc3MgcGFydG5lcnNoaXBcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoZmFsc2UsIDAsIHRydWUsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfaXNBY2NlcHRlZCA9IGZhbHNlLCBfcGF5bWVudCA9IDAsIF9pc0NhbmNlbGxlZCA9IGZhbHNlLCBfdUlEID0gXCJcIiwgX2RhdGEgPSBudWxsLCBfYnVzaW5lc3NJbmRleCA9IDApIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSB7IERhdGE6IHsgQWNjZXB0ZWQ6IF9pc0FjY2VwdGVkLCBDYXNoUGF5bWVudDogX3BheW1lbnQsIENhbmNlbGxlZDogX2lzQ2FuY2VsbGVkLCBQbGF5ZXJJRDogX3VJRCwgUGxheWVyRGF0YTogX2RhdGEsIEJ1c2luZXNzSW5kZXg6IF9idXNpbmVzc0luZGV4IH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTIsIF9tYWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfZGF0YSkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdmFyIF9hY2NlcHRlZCA9IF9kYXRhLkRhdGEuQWNjZXB0ZWQ7XHJcbiAgICAgIHZhciBfY2FzaCA9IF9kYXRhLkRhdGEuQ2FzaFBheW1lbnQ7XHJcbiAgICAgIHZhciBfY2FuY2VsbGVkID0gX2RhdGEuRGF0YS5DYW5jZWxsZWQ7XHJcbiAgICAgIHZhciBfdWlkID0gX2RhdGEuRGF0YS5QbGF5ZXJJRDtcclxuICAgICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLkJ1c2luZXNzSW5kZXg7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcImFuc3dlciByZWNlaXZlZFwiKTtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Nhc2g7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCA9IHRydWU7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3VpZDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIGFjY2VwdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiLCBjYXNoICRcIiArIF9jYXNoICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBhY2NvdW50LlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmluY2x1ZGVzKF91aWQpID09IGZhbHNlKSBDYW5jZWxsZWRJRC5wdXNoKF91aWQpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKENhbmNlbGxlZElEKTtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5sZW5ndGggPT0gX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gY2FuY2VsbGVkIGJ5IGFsbCBvdGhlciB1c2Vycy5cIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciByZWplY3RlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICBSZXNldEdvbGRJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5Hb2xkRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5TdG9ja0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbChfYW1vdW50KSB7XHJcbiAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBfYW1vdW50O1xyXG5cclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgdmFyIF9hbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqXCIgKyBFbnRlckJ1eVNlbGxBbW91bnQgKyBcIj1cIiArIF9hbW91bnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB0aGlzLlJlc2V0R29sZElucHV0KCk7XHJcbiAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChfdGl0bGUsIF9kaWNlUmVzdWx0LCBfcHJpY2VUaXRsZSwgX3ByaWNlVmFsdWUsIF9idXlPclNlbGxUaXRsZSwgX3RvdGFsQW1vdW50VGl0bGUsIF90b3RhbEFtb3VudFZhbHVlLCBfYnV0dG9uTmFtZSwgX3N0YXRlKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2VSZXN1bHQ7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVGl0bGVMYWJlbC5zdHJpbmcgPSBfcHJpY2VUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZyA9IF9wcmljZVZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXlPclNlbGxUaXRsZUxhYmVsLnN0cmluZyA9IF9idXlPclNlbGxUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRUaXRsZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1dHRvbk5hbWVMYWJlbC5zdHJpbmcgPSBfYnV0dG9uTmFtZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVEYXRhX0ludmVzdFNlbGwoX3RvdGFsQW1vdW50VmFsdWUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIEFwcGx5QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcblxyXG4gICAgICBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTERcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiQnV5aW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBPdW5jZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIE91bmNlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIGlmIChfYW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50IC09IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlNvbGQgT3VuY2VzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBPdW5jZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggR09MRCBvdW5jZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgKyBcIiBvZiBHT0xEIG91bmNlc1wiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgLy9jYW4gYWRkIG11bHRpcGxlIHN0b2NrcyB3aXRoIGJ1c2luZXNzIG5hbWUgaW4gb2JqZWN0IGlmIHJlcXVpcmVkXHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIHNoYXJlcyBvZiBidXNpbmVzcyBcIiArIFN0b2NrQnVzaW5lc3NOYW1lLCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJCdXlpbmcgU1RPQ0s6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIHNoYXJlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBzaGFyZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIHNoYXJlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuXHJcbiAgICAgICAgaWYgKF9hbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCAtPSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgKyBfYW1vdW50ICsgXCIgc2hhcmVzIG9mIHN0b2NrIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIFNUT0NLOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBzaGFyZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJTb2xkIHNoYXJlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3Igc2hhcmVzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIHN0b2NrcyBzaGFyZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICsgXCIgb2Ygc3RvY2sgc2hhcmVzXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXlkYXkgb3IgRG91YmxlIHBheSBEYXlcclxuICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKSB7XHJcbiAgICBpZiAoSE1BbW91bnQgPT0gMCkge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChCTUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWxvYW5UYWtlbikge1xyXG4gICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdldExvYW5BbW91bnRfUGF5RGF5KCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdmFyIF9sb2FuID0gMDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hbiA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xvYW47XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXkgPSBmYWxzZSwgX3NraXBITSA9IGZhbHNlLCBfc2tpcEJNID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgX2hNQW1vdW50ID0gMCwgX2JtQW1vdW50ID0gMCwgX2JtTG9jYXRpb24gPSAwLCBQYXlkYXlDb3VudGVyID0gMSwgRG91YmxlUGF5Q291bnRlciA9IDAsIF9oYWxmUGF5ZGF5ID0gZmFsc2UpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgVG90YWxQYXlEYXkgPSAwO1xyXG5cclxuICAgIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG4gICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5KSB7XHJcbiAgICAgIEdpdmVQcm9maXRVc2VySUQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlVzZXJJREZvclByb2ZpdFBheURheTtcclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYW5HaXZlUHJvZml0T25QYXlEYXkgPSBmYWxzZTtcclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKEdpdmVQcm9maXRVc2VySUQpO1xyXG4gICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkpO1xyXG5cclxuICAgIGlmIChHaXZlUHJvZml0VXNlcklEICE9IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdob2xlIHByb2ZpdCB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIG90aGVyIHBsYXllciB0aGlzIHR1cm4uXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIEhCRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgQk1EaWNlQ291bnRlciA9IDA7XHJcbiAgICBOZXh0SGFsZlBheURheSA9IF9oYWxmUGF5ZGF5O1xyXG4gICAgLy8gICBpZiAoRG91YmxlUGF5Q291bnRlciA9PSAwKSBEb3VibGVQYXlDb3VudGVyID0gMTtcclxuXHJcbiAgICAvLyAgaWYgKERvdWJsZVBheURheSkgRG91YmxlUGF5Q291bnRlciA9IERvdWJsZVBheUNvdW50ZXIgKiAyO1xyXG5cclxuICAgIERvdWJsZURheUJ1c2luZXNzSEIgPSAwO1xyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NCTSA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0hCKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0JNKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKERvdWJsZURheUJ1c2luZXNzSEIgPiAwIHx8IERvdWJsZURheUJ1c2luZXNzQk0gPiAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gXCIgKyAoRG91YmxlRGF5QnVzaW5lc3NIQiArIERvdWJsZURheUJ1c2luZXNzQk0pICsgXCIgYnVzaW5lc3MvZXMuXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcmVzID0gUGF5ZGF5Q291bnRlciArIERvdWJsZVBheUNvdW50ZXI7XHJcbiAgICBQYXlEYXlJbmZvID0gXCJQYXlEYXkgUmVzdWx0IHdpdGggbXVsdGlwbGllcjogXCIgKyBfcmVzO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gUGF5ZGF5Q291bnRlcjtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5Q291bnQgPSBEb3VibGVQYXlDb3VudGVyO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gX2lzRG91YmxlUGF5RGF5O1xyXG4gICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdmFyIF90aW1lID0gMTgwMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBfZm9yU2VsZWN0ZWRCdXNpbmVzcztcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9TZWxlY3RlZEJ1c2luZXNzSW5kZXg7XHJcbiAgICBITUFtb3VudCA9IF9oTUFtb3VudDtcclxuICAgIEJNQW1vdW50ID0gX2JtQW1vdW50O1xyXG4gICAgQk1Mb2NhdGlvbnMgPSBfYm1Mb2NhdGlvbjtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChOZXh0SGFsZlBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdpbGwgcmVjZWl2ZSBoYWxmIHByb2ZpdHMgdGhpcyBwYXlkYXkuXCIsIF90aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvYW5UYWtlbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBsb2FuVGFrZW4gPSBfbG9hblRha2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZyA9IEJNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmcgPSBCTUxvY2F0aW9ucztcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5QYXNzZWRQYXlEYXlDb3VudExhYmVsLnN0cmluZyA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICB2YXIgX2xvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICRcIiArIF9sb2FuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJDUwMDBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG5cclxuICAgIGlmIChfc2tpcEJNIHx8IF9za2lwSE0pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgX3RpbWUgKyAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5PbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgaWYgKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcbiAgICAgIHZhciBfaGFsZlBheWRheSA9IE5leHRIYWxmUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG5cclxuICAgICAgaWYgKF9oYWxmUGF5ZGF5KSBfbXVsdGlwbGllciA9IF9tdWx0aXBsaWVyIC8gMjtcclxuXHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG4gICAgICBpZiAoX2RvdWJsZVBheURheSkge1xyXG4gICAgICAgIGlmICh0aGlzLkRvdWJsZVBheURheUNvdW50ICE9IDApIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyICo9IDIgKiB0aGlzLkRvdWJsZVBheURheUNvdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGRvdWJsZVBheURheUFkZGVkID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIERvdWJsZURheUJ1c2luZXNzSEIgKiBfZGljZSAqIDEwMDA7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSBUb3RhbFBheURheUFtb3VudCA9IF9tdWx0aXBsaWVyICogX3BheWRheW11bHRpcGxpZXIgKiBITUFtb3VudCAqIF9kaWNlICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgZWxzZSBUb3RhbFBheURheUFtb3VudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiAoSE1BbW91bnQgKiBfZGljZSkgKiAxMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIEhNQW1vdW50ICsgXCIqXCIgKyBcIjEwMDApLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiK1wiICsgZG91YmxlUGF5RGF5QWRkZWQgKyBcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJIb21lIEJhc2VkIEJ1c2luZXNzOiBcIiArIEhNQW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG4gICAgICB2YXIgX2hhbGZQYXlkYXkgPSBOZXh0SGFsZlBheURheTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9hbW91bnQgPSBCTUFtb3VudCArIEJNTG9jYXRpb25zO1xyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICBpZiAoX2hhbGZQYXlkYXkpIF9tdWx0aXBsaWVyID0gX211bHRpcGxpZXIgLyAyO1xyXG5cclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5Eb3VibGVQYXlEYXlDb3VudCAhPSAwKSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyICogdGhpcy5Eb3VibGVQYXlEYXlDb3VudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgKj0gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkb3VibGVQYXlEYXlBZGRlZCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBEb3VibGVEYXlCdXNpbmVzc0JNICogX2RpY2UgKiAyMDAwO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIFRvdGFsUGF5RGF5QW1vdW50ID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIF9hbW91bnQgKiBfZGljZSAqIDIwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgIGVsc2UgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogKF9hbW91bnQgKiBfZGljZSkgKiAyMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBfYW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKS1cIiArIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBcIitcIiArIGRvdWJsZVBheURheUFkZGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJCcmljayAmIE1vcnRhciBCdXNpbmVzczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2UgX0VzdGltYXRlTG9hbiA9IDUwMDA7XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfRXN0aW1hdGVMb2FuKSB7XHJcbiAgICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlUGF5bWVudF9QYXlEYXkoKSB7XHJcbiAgICAvL2FsbFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTa2lwTG9hbk9uZVRpbWVfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBza2lwcGVkIHRoZSBsb2FuIHBheW1lbnQsIGJhbmsgd2lsbCBjYWxsIHVwb24gY29tcGxldGUgbG9hbiBhbW91bnQgb24gbmV4dCBwYXlkYXlcIik7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1BheURheShfYW1vdW50KSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBFeGl0TG9hblNjcmVlbl9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBTdGFydE5ld0dhbWVfUGF5RGF5KCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0LlwiLCAzMDAwLCBmYWxzZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU2hvd0NhcmRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgMzAxMCk7XHJcbiAgfSxcclxuXHJcbiAgU2hvd0luZm8oX2RhdGEpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KF9kYXRhLmluZm8sIDIwMDAsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIFBheURheUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChIb21lQmFzZWRQYXltZW50Q29tcGxldGVkICYmIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCAmJiBMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBheWRheSBkb25lXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKEdpdmVQcm9maXRVc2VySUQgIT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91ciB3aG9sZSBQYXlkYXkgYW1vdW50ICRcIiArIFRvdGFsUGF5RGF5ICsgXCIgd2lsbCBiZSB0cmFuc2ZlcnJlZCB0byBvdGhlciBwbGF5ZXIgbm93LlwiLCAyMjAwKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUGF5RGF5O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKFRvdGFsUGF5RGF5LCBHaXZlUHJvZml0VXNlcklEKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDb21wbGV0aW9uKCk7XHJcbiAgICAgICAgfSwgMzIwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ29tcGxldGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudEZvckNvbXBsZXRpb24oKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKGZhbHNlKTtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlUGF5RGF5KGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuXHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheUNvdW50ZXIgPiAwKSB7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyLS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlSGFsZlBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICBfbWFuYWdlci5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9tYW5hZ2VyLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKFBheURheUluZm8pO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxsICYgbWFuaXB1bGF0ZSBCdXNpbmVzcyBVSVxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTExcIjtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIGVsc2Ugbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVU0lORVNTXCI7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICAvLyBlbHNlXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX2lzQm90KSB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG5cclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90KTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgVUlcclxuICBUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiSU5WRVNUXCI7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICBUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVZIE9SIFNFTExcIjtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzZXR1cCBVaVxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNob3dRdWVzdGlvblRvYXN0KF9tc2cpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW5MYWJlbC5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBvbmVRdWVzdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBvbmVRdWVzdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXNnKSB7XHJcbiAgICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvbkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUXVlc3Rpb25MYWJlbC5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxlY3QgQnVzaW5lc3MgZm9yIGRvdWJsZSBwYXlkYXkgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc0RvdWJsZVBheVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfbWFpblRpdGxlLCBfdGlsZUNvbnRlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlRpdGxlTmFtZS5zdHJpbmcgPSBfbWFpblRpdGxlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuVGl0bGVDb250ZW50TGFiZWwuc3RyaW5nID0gX3RpbGVDb250ZW50O1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKCkge1xyXG4gICAgdGhpcy5DbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2NyZWVuX0Fsb25nVHVybk92ZXJfQnVzaW5lc3NQYXlEYXlVSVNldHVwKCkge1xyXG4gICAgdGhpcy5DbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG4gIH0sXHJcbiAgUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfdGVtcERhdGEsIF9idXNpbmVzc1R5cGUpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSBfYnVzaW5lc3NUeXBlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5CdXNpbmVzc1ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgICB2YXIgX3RvdGFsTG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgICAgICB2YXIgX2FsbExvY2F0aW9uc0Ftb3VudCA9IF90b3RhbExvY2F0aW9ucyAqIDI1MDAwO1xyXG4gICAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5QYXJ0bmVyTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKFwibm9uZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMucHVzaChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNlbGV0aXZlRG91YmxlUGF5RGF5X0J1c2luZXNzUGF5RGF5VUlTZXR1cChfaXNIb21lQmFzZWQgPSBmYWxzZSwgX2lzQnJpY2tBbmRNb3J0YXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5DbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgdGhpcy5FZGl0VGl0bGVfQnVzaW5lc3NQYXlEYXlVSVNldHVwKFwiQlVTSU5FU1NcIiwgXCIqU2VsZWN0IGEgYnVzaW5lc3MgdG8gcmVjZWl2ZSBkb3VibGUgcGF5ZGF5IHByb2ZpdHMgdGhyb3VnaCBvdXQgZ2FtZSBvbiB0aGF0IGJ1c2luZXNzLlwiKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlBsYXllck5hbWUuc3RyaW5nID0gX3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5QbGF5ZXJDYXNoLnN0cmluZyA9IFwiJFwiICsgX3RlbXBEYXRhLkNhc2g7XHJcblxyXG4gICAgaWYgKF9pc0JyaWNrQW5kTW9ydGFyKSB7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfdGVtcERhdGEsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNIb21lQmFzZWQpIHtcclxuICAgICAgdGhpcy5Qcm9jZXNzQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKF90ZW1wRGF0YSwgMSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGVjdCBQbGF5ZXIgZm9yIHByb2ZpdFxyXG4gIFRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMRUNUIFBMQVlFUlwiO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGVJbmRleCA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzZWxlY3RQbGF5ZXJQcm9maXROb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtZXNzYWdlLCB0aW1lID0gU2hvcnRNZXNzYWdlVGltZSwgX2hhc2J1dHRvbiA9IHRydWUpIHtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Qb3BVcFVJTGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90IG1vZGUgb25seVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+IDAgJiYgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLklzQm90KSB7XHJcbiAgICAgICAgLy8gaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICAvLyAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIC8vICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICAvLyAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDb21wbGV0ZVRvYXN0KCkge1xyXG4gICAgY29uc29sZS5lcnJvcihcImNvbXBsZXRlIHRvYXN0IGNhbGxlZFwiKTtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICB9LFxyXG5cclxuICBTaG93UmVzdWx0U2NyZWVuOiBmdW5jdGlvbiAoX3N0YXR1cywgX2RhdGEpIHtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5SZXN1bHRTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBfc3RhdHVzO1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLkJvZHlMYWJlbC5zdHJpbmcgPSBfZGF0YTtcclxuICB9LFxyXG5cclxuICBSZXN0YXJ0VGhlR2FtZSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jSW5mbyhfZGF0YUluZm8pIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIHZhciBfZGF0YSA9IHsgaW5mbzogX2RhdGFJbmZvIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTUsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX21vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBpbmZvOiBfZGF0YUluZm8gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE1LCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuIl19