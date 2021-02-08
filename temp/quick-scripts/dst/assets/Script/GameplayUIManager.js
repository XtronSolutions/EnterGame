
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwic2VsZWN0UGxheWVyUHJvZml0Tm9kZXMiLCJidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMiLCJidXNpbmVzc0RldGFpbFBheURheU5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJTaG9ydE1lc3NhZ2VUaW1lIiwiZ2xvYmFsVHVyblRpbWVyIiwiUGF5RGF5SW5mbyIsIkludmVzdFNlbGxJbmZvIiwiVGltZXJUaW1lb3V0IiwiRG91YmxlRGF5QnVzaW5lc3NIQiIsIkRvdWJsZURheUJ1c2luZXNzQk0iLCJHaXZlUHJvZml0VXNlcklEIiwiVG90YWxQYXlEYXkiLCJMb2FuQW1vdW50RW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJUZW5UaG91c2FuZCIsIlRlbnR5VGhvdXNhbmQiLCJUaGlydHlUaG91c2FuZCIsIkZvcnR5VGhvdXNhbmQiLCJGaWZ0eVRob3VzYW5kIiwiT3RoZXIiLCJCdXNpbmVzc1NldHVwVUkiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZVVJIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUGxheWVyQ2FzaFVJIiwiQnVzaW5lc3NUeXBlVGV4dFVJIiwiVGV4dCIsIkJ1c2luZXNzTmFtZVRleHRVSSIsIkJ1c2luZXNzVHlwZUxhYmVsIiwiRWRpdEJveCIsIkJ1c2luZXNzTmFtZUxhYmVsIiwiSG9tZUJhc2VkTm9kZVVJIiwiTm9kZSIsIkJyaWNrQW5kTW9ydGFyTm9kZVVJIiwiVGltZXJVSSIsIlRpbWVyTm9kZSIsIkJ1c2luZXNzU2V0dXBOb2RlIiwiTG9hblNldHVwTm9kZSIsIkxvYW5BbW91bnQiLCJMb2FuQW1vdW50TGFiZWwiLCJXYWl0aW5nU3RhdHVzTm9kZSIsIkV4aXRCdXR0b25Ob2RlIiwiQWRkQnV0dG9uTm9kZSIsIkFkZENhc2hTY3JlZW4iLCJBZGRDYXNoTGFiZWwiLCJBZGRDYXNoRWRpdEJveCIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJUaW1lclRleHQiLCJCbG9ja2VyTm9kZSIsIkludmVzdEVudW0iLCJTdG9ja0ludmVzdCIsIkdvbGRJbnZlc3QiLCJTdG9ja1NlbGwiLCJHb2xkU2VsbCIsIkludmVzdFNlbGxVSSIsIlRpdGxlTGFiZWwiLCJEaWNlUmVzdWx0TGFiZWwiLCJQcmljZVRpdGxlTGFiZWwiLCJQcmljZVZhbHVlTGFiZWwiLCJCdXlPclNlbGxUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRWYWx1ZUxhYmVsIiwiQnV0dG9uTmFtZUxhYmVsIiwiSW52ZXN0U3RhdGUiLCJBbW91bnRFZGl0Qm94IiwiU2VsbEJ1c2luZXNzVUkiLCJDYXNoTGFiZWwiLCJQbGF5ZXJOYW1lTGFiZWwiLCJCdXNpbmVzc0NvdW50TGFiZWwiLCJTY3JvbGxDb250ZW50Tm9kZSIsIkJ1c2luZXNzU2VsbFByZWZhYiIsIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIiwiRXhpdEJ1dHRvbiIsIlR1cm5PdmVyRXhpdEJ1dHRvbiIsIlBheURheVVJIiwiSG9tZUJhc2VkTnVtYmVyTGFiZWwiLCJCTU51bWJlckxhYmVsIiwiQk1OdW1iZXJMb2NhdGlvbkxhYmVsIiwiUGFzc2VkUGF5RGF5Q291bnRMYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJPbmVRdWVzdGlvblVJIiwiUGxheWVyRGV0YWlsTGFiZWwiLCJEZXRhaWxzUHJlZmFiIiwiU2Nyb2xsQ29udGVudCIsIldhaXRpbmdTY3JlZW4iLCJXYWl0aW5nU2NyZWVuTGFiZWwiLCJEZWNpc2lvblRpdGxlTGFiZWwiLCJEZWNpc2lvbkNhc2hMYWJlbCIsIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsIiwiRGVjaXNpb25RdWVzdGlvbkxhYmVsIiwiUGFydG5lcnNoaXBVSSIsIldhaXRpbmdTdGF0dXNTY3JlZW4iLCJNYWluU2NyZWVuIiwiVGl0bGVOYW1lIiwiUGxheWVyTmFtZSIsIlBsYXllckNhc2giLCJQYXJ0bmVyU2hpcFByZWZhYiIsIkRlY2lzaW9uU2NyZWVuIiwiRGVjaXNpb25QbGF5ZXJOYW1lIiwiRGVjaXNpb25QbGF5ZXJDYXNoIiwiRGVjaXNpb25EZXNjcmlwdGlvbiIsIlJlc3VsdFVJIiwiUmVzdWx0U2NyZWVuIiwiU3RhdHVzTGFiZWwiLCJCb2R5TGFiZWwiLCJCdXNpbmVzc1BheURheVNldHVwVUkiLCJUaXRsZUNvbnRlbnRMYWJlbCIsIkJ1c2luZXNzUHJlZmFiIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSSIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSEJEaWNlQ291bnRlciIsIkJNRGljZUNvdW50ZXIiLCJOZXh0SGFsZlBheURheSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJPbmVRdWVzdGlvblNldHVwVUkiLCJQYXJ0bmVyc2hpcFNldHVwVUkiLCJSZXN1bHRTZXR1cFVJIiwiQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0VUkiLCJQb3BVcFVJIiwiUG9wVXBVSUxhYmVsIiwiUG9wVXBVSUJ1dHRvbiIsIkdhbWVwbGF5VUlTY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiQnVzaW5lc3NEb3VibGVQYXlTY3JlZW4iLCJPbmVRdWVzdGlvblNwYWNlU2NyZWVuIiwiT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbiIsIlNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbiIsIkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJBdmF0YXJTcHJpdGVzIiwiU3ByaXRlRnJhbWUiLCJSZXNldEFsbERhdGEiLCJSZXNldFR1cm5WYXJpYWJsZSIsIkdvbGRJbnZlc3RlZCIsIkdvbGRTb2xkIiwiU3RvY2tJbnZlc3RlZCIsIlN0b2NrU29sZCIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsIklzQm90VHVybiIsIlBheURheUNvdW50IiwiRG91YmxlUGF5RGF5Q291bnQiLCJJc0JhbmtydXB0ZWQiLCJCYW5rcnVwdGVkQW1vdW50IiwiQWRkQ2FzaEFtb3VudCIsIlRpbWVyIiwiVGltZXJTdGFydGVkIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJfc3RhdGUiLCJhY3RpdmUiLCJFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsIlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cCIsIkVuYWJsZUNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIlN0dWRlbnREYXRhIiwiZ2FtZUNhc2giLCJPbkNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIl92YWwiLCJPbkNsaWNrRG9uZUNhc2hBZGRfQnVzaW5lc3NTZXR1cCIsIl9nYW1lY2FzaCIsInBhcnNlSW50IiwiX2Ftb3VudCIsInVuZGVmaW5lZCIsIkNhc2giLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJVcGRhdGVVc2VyRGF0YSIsIlNob3dUb2FzdCIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsImlzRmlyc3RUaW1lIiwiaW5zaWRlR2FtZSIsIm1vZGVJbmRleCIsIl9pc0JhbmtydXB0ZWQiLCJfQmFua3J1cHRBbW91bnQiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiQnVzaW5lc3NJbmZvIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwibGVuZ3RoIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cCIsIkF2YXRhcklEIiwiYXZhdGFySWQiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsImlzTmFOIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIk9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsIkhvbWVCYXNlZCIsIk9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiYnJpY2tBbmRtb3J0YXIiLCJhbW91bnQiLCJDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAiLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJOb09mQnVzaW5lc3MiLCJMb2FuVGFrZW4iLCJNYXRoIiwiYWJzIiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiUHVzaERhdGFGb3JQbGF5ZXJMZWZ0IiwiX2RhdGEiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIl9wbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllcklEIiwiSG9tZUJhc2VkQW1vdW50IiwiSXNBY3RpdmUiLCJfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsInB1c2giLCJSYWlzZUV2ZW50IiwiX0lEIiwiX3BsYXllckxlZnQiLCJfaXNTcGVjdGF0ZSIsIlBob3RvbkFjdG9yIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJNYXhQbGF5ZXJzIiwiR2V0UmVhbEFjdG9ycyIsImFjdG9yTnIiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYnVzaW5lc3NOYW1lIiwiX2lzSG9tZUJhc2VkIiwiU3RhcnRHYW1lIiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJFeGl0X0J1c2luZXNzU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJHZXRUdXJuTnVtYmVyIiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiX2FjdGl2ZSIsImNsZWFyVGltZW91dCIsIlVwZGF0ZVRpbWVyIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIl9pc1R1cm5PdmVyIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiUm9sbE9uZURpY2UiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAiLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiUmVzZXRfUGFydG5lclNoaXBTZXR1cCIsIl9tYW5hZ2VyIiwiX3RlbXBEYXRhIiwibm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0TmFtZSIsIlNldFR5cGUiLCJTZXRCdXNpbmVzc0luZGV4IiwiX3RvdGFsTG9jYXRpb25zIiwiTG9jYXRpb25zTmFtZSIsIlNldEJ1c2luZXNzTW9kZSIsIlNldE1vZGUiLCJTZXRCdXNpbmVzc1ZhbHVlIiwiU2V0RmluYWxCdXNpbmVzc1ZhbHVlIiwiX2FsbExvY2F0aW9uc0Ftb3VudCIsIl9maW5hbEFtb3VudCIsIlNldEJhbGFuY2UiLCJTZXRMb2NhdGlvbnMiLCJJc1BhcnRuZXJzaGlwIiwiVG9nZ2xlUGFydG5lclNoaXBCdXR0b24iLCJTZXRQYXJ0bmVyTmFtZSIsIlBhcnRuZXJOYW1lIiwiRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwIiwiX21zZyIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkV4aXRfUGFydG5lclNoaXBTZXR1cCIsImRlc3Ryb3kiLCJSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cCIsIl9hY3RvciIsIl90dXJuIiwiVHVybiIsIl9wbGF5ZXJEYXRhIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJfYnVzaW5lc3NWYWx1ZSIsIkJ1c1ZhbHVlIiwiX3BheUFtb3VudCIsIl9idXNpbmVzc01vZGUiLCJDaGVja1NwZWN0YXRlIiwiQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hbGxBY3RvcnMiLCJSb29tQWN0b3JzIiwibXlJbmRleCIsIkdldE15SW5kZXgiLCJSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIkNhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfaXNBY2NlcHRlZCIsIl9wYXltZW50IiwiX2lzQ2FuY2VsbGVkIiwiX3VJRCIsIl9tYWluRGF0YSIsIkFjY2VwdGVkIiwiQ2FzaFBheW1lbnQiLCJDYW5jZWxsZWQiLCJCdXNpbmVzc0luZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hY2NlcHRlZCIsIl9jYXNoIiwiX2NhbmNlbGxlZCIsIl91aWQiLCJQYXJ0bmVySUQiLCJpbmNsdWRlcyIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiUmFpc2VFdmVudFRvU3luY0luZm8iLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX2hNQW1vdW50IiwiX2JtQW1vdW50IiwiX2JtTG9jYXRpb24iLCJQYXlkYXlDb3VudGVyIiwiRG91YmxlUGF5Q291bnRlciIsIl9oYWxmUGF5ZGF5IiwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5IiwiVXNlcklERm9yUHJvZml0UGF5RGF5IiwiUmVjZWl2ZURvdWJsZVBheURheSIsIl9yZXMiLCJfdGltZSIsIlVwZGF0ZUNhc2hfUGF5RGF5IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQYXlEYXlDb21wbGV0ZWQiLCJPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfZG91YmxlUGF5RGF5IiwiX2RpY2UiLCJfYW1vdW50VG9CZVNlbmQiLCJfYW1vdW50VG9CZUFkanVzdGVkIiwiX211bHRpcGxpZXIiLCJfcGF5ZGF5bXVsdGlwbGllciIsImRvdWJsZVBheURheUFkZGVkIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIlJlY2VpdmVQYXltZW50X1BheURheSIsIl9sb2NhdGlvbnMiLCJfRXN0aW1hdGVMb2FuIiwiU2tpcExvYW5PbmVUaW1lX1BheURheSIsIlNlbGxCdXNpbmVzc19QYXlEYXkiLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdExvYW5TY3JlZW5fUGF5RGF5IiwiU3RhcnROZXdHYW1lX1BheURheSIsImVtaXQiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2hvd0luZm8iLCJpbmZvIiwiUmFpc2VFdmVudEZvckNvbXBsZXRpb24iLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIk5leHRUdXJuSGFsZlBheURheUNvdW50ZXIiLCJUb2dnbGVIYWxmUGF5TmV4dFR1cm4iLCJjYWxsVXBvbkNhcmQiLCJUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJBbW91bnQiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJTZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5IiwiX2lzVHVybm92ZXIiLCJFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIlNldEludmVzdFVJX0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJIiwiVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTaG93UXVlc3Rpb25Ub2FzdCIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX215RGF0YSIsIl9hY3RvcnNEYXRhIiwiX21vZGVJbmRleCIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsInNldFBsYXllck5hbWUiLCJzZXRQbGF5ZXJVSUQiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRfT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIl9tYWluVGl0bGUiLCJfdGlsZUNvbnRlbnQiLCJFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIkNsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiRXhpdFNjcmVlbl9BbG9uZ1R1cm5PdmVyX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIlByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAiLCJfYnVzaW5lc3NUeXBlIiwiRW5hYmxlU2VsZXRpdmVEb3VibGVQYXlEYXlfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiX2lzQnJpY2tBbmRNb3J0YXIiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIkV4aXRfU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyRm9yUHJvZml0IiwibWVzc2FnZSIsInRpbWUiLCJfaGFzYnV0dG9uIiwiU2VsZlRvYXN0IiwibW9kZSIsIkNvbXBsZXRlVG9hc3QiLCJTaG93UmVzdWx0U2NyZWVuIiwiX3N0YXR1cyIsIlJlc3RhcnRUaGVHYW1lIiwiUmVzdGFydEdhbWUiLCJfZGF0YUluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxFQUExQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBQ0EsSUFBSUMsdUJBQXVCLEdBQUcsRUFBOUI7QUFDQSxJQUFJQyw4QkFBOEIsR0FBRyxFQUFy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O1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxudmFyIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxudmFyIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzID0gW107XHJcbnZhciBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxudmFyIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMgPSBbXTtcclxudmFyIFBhcnRuZXJTaGlwRGF0YSA9IG51bGw7XHJcbnZhciBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxudmFyIENhbmNlbGxlZElEID0gW107XHJcbnZhciBTdGFydEdhbWVDYXNoID0gMjAwMDA7XHJcbnZhciBTZWxlY3RlZEJ1c2luZXNzUGF5RGF5ID0gZmFsc2U7XHJcbnZhciBITUFtb3VudCA9IDA7XHJcbnZhciBCTUFtb3VudCA9IDA7XHJcbnZhciBCTUxvY2F0aW9ucyA9IDA7XHJcbnZhciBTZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwO1xyXG52YXIgVHVybk92ZXJGb3JJbnZlc3QgPSBmYWxzZTtcclxudmFyIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG52YXIgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG52YXIgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbnZhciBQcmV2aW91c0Nhc2ggPSAwO1xyXG52YXIgVGltZW91dFJlZjtcclxudmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gODAwMDtcclxudmFyIExvbmdNZXNzYWdlVGltZSA9IDUwMDA7XHJcbnZhciBTaG9ydE1lc3NhZ2VUaW1lID0gMjUwMDtcclxudmFyIGdsb2JhbFR1cm5UaW1lciA9IDMwO1xyXG52YXIgUGF5RGF5SW5mbyA9IFwiXCI7XHJcbnZhciBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcbnZhciBUaW1lclRpbWVvdXQ7XHJcbnZhciBEb3VibGVEYXlCdXNpbmVzc0hCID0gMDtcclxudmFyIERvdWJsZURheUJ1c2luZXNzQk0gPSAwO1xyXG52YXIgR2l2ZVByb2ZpdFVzZXJJRCA9IFwiXCI7XHJcbnZhciBUb3RhbFBheURheSA9IDA7XHJcbi8vIHZhciBDb21wbGV0aW9uV2luZG93VGltZSA9IDUwMDsvLzgwMDBcclxuLy8gdmFyIExvbmdNZXNzYWdlVGltZSA9IDI1MDsvLzUwMDBcclxuLy8gdmFyIFNob3J0TWVzc2FnZVRpbWUgPSA1MDsvLzI1MDBcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGFtb3VudCBvZiBsb2FuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBMb2FuQW1vdW50RW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgVGVuVGhvdXNhbmQ6IDEwMDAwLFxyXG4gIFRlbnR5VGhvdXNhbmQ6IDIwMDAwLFxyXG4gIFRoaXJ0eVRob3VzYW5kOiAzMDAwMCxcclxuICBGb3J0eVRob3VzYW5kOiA0MDAwMCxcclxuICBGaWZ0eVRob3VzYW5kOiA1MDAwMCxcclxuICBPdGhlcjogNixcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NTZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgbmFtZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2hVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgY2FzaFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZVRleHRVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgdG9vbHRpcDogXCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgdHlwZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZVRleHRVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgdG9vbHRpcDogXCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgbmFtZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHR5cGUgZWRpdGJveFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVjZSBmb3IgYnVzaW5lc3MgbmFtZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTm9kZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZE5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBob21lIGJhc2VkIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJOb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tBbmRNb3J0YXJOb2RlVUlcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbGFiZWwgZm9yIHRpbWVyXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB0aW1lciBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NTZXR1cE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBMb2FuU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5TZXR1cE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgbG9hbiBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBMb2FuQW1vdW50RW51bSxcclxuICAgICAgZGVmYXVsdDogTG9hbkFtb3VudEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxvYW4gYW1vdW50IHRha2VuIGJ5IHBsYXllciAoc3RhdGUgbWFjaGluZSlcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGFsbCBsYWJlbHMgb2YgYW1vdW50cyBpbiBsb2FuIFVJXCIsXHJcbiAgICB9LFxyXG4gICAgV2FpdGluZ1N0YXR1c05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c05vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3Igd2FpdGluZyBzdGF0dXMgc2NyZWVuIG9uIGluaXRpYWwgYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleGl0IGJ1dHRvbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBZGRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZCBDYXNoIGJ1dHRvbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaFNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBZGRDYXNoU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZENhc2hTY3JlZW4gbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBZGRDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZENhc2ggbGFiZWwgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBZGRDYXNoRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBBZGRDYXNoIGVkaXRCb3ggaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yLy9cclxuICB9LFxyXG5cclxuICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmcgPSBuYW1lO1xyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUdXJuRGVjaXNpb25TZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIG1hcmtldGluZyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgY29udGVudCBub2RlIG9mIHNjcm9sbCB2aWV3IG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBwcmVmYWIgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUaW1lclRleHQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJUZXh0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBsYWJlbCBvZiB0aW1lciB0ZXh0IGZvciB0dXJuIGRlY2lzaW9uXCIsXHJcbiAgICB9LFxyXG4gICAgQmxvY2tlck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQmxvY2tlck5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3Igbm9kZSBvZiBibG9ja2VyIGZvciB0dXJuIGRlY2lzaW9uXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBpbnZlc3RtZW50L2J1eSBhbmQgc2VsbC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0RW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgU3RvY2tJbnZlc3Q6IDEsXHJcbiAgR29sZEludmVzdDogMixcclxuICBTdG9ja1NlbGw6IDMsXHJcbiAgR29sZFNlbGw6IDQsXHJcbiAgT3RoZXI6IDUsXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0U2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJJbnZlc3RTZWxsVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2UgUmVzdWx0IG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVmFsdWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVZhbHVlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSB2YWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXlPclNlbGxUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnV5T3JTZWxsIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VmFsdWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFZhbHVlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBWYWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV0dG9uTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGJ1dHRvbiBuYW1lIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTdGF0ZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbnZlc3RTdGF0ZVwiLFxyXG4gICAgICB0eXBlOiBJbnZlc3RFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBJbnZlc3RFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBbW91bnRFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNlbGxCdXNpbmVzc1VJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZWxsQnVzaW5lc3NVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNlbGxCdXNpbmVzc1VJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc0NvdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NDb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnVzaW5lc3NDb3VudCBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50Tm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50Tm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTY3JvbGxDb250ZW50Tm9kZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NlbGxQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NTZWxsUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzU2VsbFByZWZhYiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBheURheVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXlEYXlVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBheURheVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgUGF5RGF5IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZE51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZE51bWJlclwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhck51bWJlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1OdW1iZXJMb2NhdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyTG9jYXRpb25zXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckxvY2F0aW9ucyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGFzc2VkUGF5RGF5Q291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXNzZWRQYXlEYXlDb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQYXNzZWRQYXlEYXlDb3VudExhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRCdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBNYWluUGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5UaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0U2NyZWVuVGl0bGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEJ1c2luZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTG9hbkJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkZvdHRlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0VUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJJbnZlc3RVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnV5T3JTZWxsVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1eU9yU2VsbFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnV5T3JTZWxsVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIE9uZVF1ZXN0aW9uVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE9uZVF1ZXN0aW9uVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJPbmVRdWVzdGlvblVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1NjcmVlbkxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBub2RlIFdhaXRpbmdTY3JlZW5MYWJlbCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25UaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uVGl0bGVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUXVlc3Rpb25MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblF1ZXN0aW9uTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBxdWVzdGlvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGFydG5lcnNoaXBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGFydG5lcnNoaXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBhcnRuZXJzaGlwVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBXYWl0aW5nU3RhdHVzU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTdGF0dXNTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgd2FpdGluZyBzY3JlZW4gbm9kZSBvZiBwYXJ0bmVyc2hpcCB1aVwiLFxyXG4gICAgfSxcclxuICAgIE1haW5TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVGl0bGVOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJTaGlwUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJTaGlwUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25QbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uRGVzY3JpcHRpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25EZXNjcmlwdGlvblwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFJlc3VsdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSZXN1bHRVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlJlc3VsdFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUmVzdWx0U2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXR1c0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0YXR1c0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJvZHlMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCb2R5TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc1BheURheVNldHVwVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzUGF5RGF5U2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1c2luZXNzUGF5RGF5U2V0dXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZU5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZUNvbnRlbnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZUNvbnRlbnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJEZXRhaWxMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJEZXRhaWxMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERldGFpbHNQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGV0YWlsc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBEZXRhaWxzUHJlZmFiIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIFNjcm9sbENvbnRlbnQgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xOyAvLy0xIG1lYW5zIG5ldyBidXNpbmVzcyBpcyBub3QgaW5zdGFudGlhbHRlZCBmcm9tIGluc2lkZSBnYW1lICwgaWYgaXQgaGFzIGFueSBvdGhlciB2YWx1ZSBpdCBtZWFucyBpdHMgYmVlbiBpbnN0YW50aWF0ZWQgZnJvbSBpbnNpZGUgZ2FtZSBhbmQgaXRzIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggb2YgcGxheWVyXHJcblxyXG4vL3R1cm4gZGVjaXNpb25zXHJcbnZhciBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxudmFyIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4vL2J1eW9yc2VsbFxyXG52YXIgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxudmFyIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxudmFyIERpY2VSZXN1bHQ7XHJcbnZhciBPbmNlT3JTaGFyZTtcclxudmFyIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG52YXIgSEJEaWNlQ291bnRlciA9IDA7XHJcbnZhciBCTURpY2VDb3VudGVyID0gMDtcclxudmFyIE5leHRIYWxmUGF5RGF5ID0gZmFsc2U7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBMb2FuUGF5ZWQgPSBmYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50ID0gMDtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxudmFyIEdhbWVwbGF5VUlNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiR2FtZXBsYXlVSU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1c2luZXNzU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBUdXJuRGVjaXNpb25TZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsbEJ1c2luZXNzVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsbEJ1c2luZXNzVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBJbnZlc3RVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEJ1eU9yU2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1eU9yU2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBPbmVRdWVzdGlvblVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIE9uZVF1ZXN0aW9uVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyc2hpcFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFBhcnRuZXJzaGlwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUGFydG5lcnNoaXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFJlc3VsdFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFJlc3VsdFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NQYXlEYXlVSVNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBCdXNpbmVzc1BheURheVNldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NQYXlEYXlTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0UGxheWVyRm9yUHJvZml0VUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuXHJcbiAgICBQb3BVcFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlCdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NEb3VibGVQYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXNpbmVzc0RvdWJsZVBheSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNwYWNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25TcGFjZSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25EZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxlY3RQbGF5ZXJGb3JQcm9maXQgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsXHJcbiAgICB9LFxyXG4gICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBdmF0YXJTcHJpdGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFJlc2V0cyB0aGlzIGNsYXNzIGdsb2JhbCB2YXJpYWJsZXMgYW5kIG90aGVyIG5lY2Vzc2FyeSBkYXRhIG9uTG9hZFxyXG4gICAqKi9cclxuICBSZXNldEFsbERhdGEoKSB7XHJcbiAgICBEb3VibGVEYXlCdXNpbmVzc0hCID0gMDtcclxuICAgIERvdWJsZURheUJ1c2luZXNzQk0gPSAwO1xyXG4gICAgTmV4dEhhbGZQYXlEYXkgPSBmYWxzZTtcclxuICAgIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgICBzZWxlY3RQbGF5ZXJQcm9maXROb2RlcyA9IFtdO1xyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgICBidXNpbmVzc0RldGFpbFBheURheU5vZGVzID0gW107XHJcbiAgICBQYXJ0bmVyU2hpcERhdGEgPSBudWxsO1xyXG4gICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICBDYW5jZWxsZWRJRCA9IFtdO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IGZhbHNlO1xyXG4gICAgSE1BbW91bnQgPSAwO1xyXG4gICAgQk1BbW91bnQgPSAwO1xyXG4gICAgQk1Mb2NhdGlvbnMgPSAwO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMDtcclxuICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gZmFsc2U7XHJcbiAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgUHJldmlvdXNDYXNoID0gMDtcclxuICAgIFRpbWVvdXRSZWYgPSBudWxsO1xyXG4gICAgR2l2ZVByb2ZpdFVzZXJJRCA9IFwiXCI7XHJcbiAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xOyAvLy0xIG1lYW5zIG5ldyBidXNpbmVzcyBpcyBub3QgaW5zdGFudGlhbHRlZCBmcm9tIGluc2lkZSBnYW1lICwgaWYgaXQgaGFzIGFueSBvdGhlciB2YWx1ZSBpdCBtZWFucyBpdHMgYmVlbiBpbnN0YW50aWF0ZWQgZnJvbSBpbnNpZGUgZ2FtZSBhbmQgaXRzIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggb2YgcGxheWVyXHJcblxyXG4gICAgLy90dXJuIGRlY2lzaW9uc1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICBUZW1wSGlyaW5nTGF3eWVyO1xyXG5cclxuICAgIC8vYnV5b3JzZWxsXHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG4gICAgRGljZVJlc3VsdCA9IDA7XHJcbiAgICBPbmNlT3JTaGFyZTtcclxuICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG4gICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gMDtcclxuICAgIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgVG90YWxQYXlEYXkgPSAwO1xyXG4gICAgSEJEaWNlQ291bnRlciA9IDA7XHJcbiAgICBCTURpY2VDb3VudGVyID0gMDtcclxuICAgIFBheURheUluZm8gPSBcIlwiO1xyXG4gICAgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVzZXRzIHR1cm4gdmFyaWFibGVzIGZvciBnb2xkaW52ZXN0L2dvbGRzb2xkL3N0b2tjaW52ZXN0L3N0b2Nrc29sZFxyXG4gICAqKi9cclxuICBSZXNldFR1cm5WYXJpYWJsZSgpIHtcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjaGVjayByZWZlcmVuY2VzIG9mIGNsYXNzL2VzIG5lZWRlZC5cclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlciA9PSBudWxsKSBHYW1lTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHRoaXMgbm9kZSBnZXRzIGFjdGl2ZVxyXG4gICAqKi9cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHRoaXMgbm9kZSBnZXRzIGRlYWN0aXZlXHJcbiAgICoqL1xyXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiU3luY0RhdGFcIiwgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGUgY2xhc3MgaXMgbG9hZGVkXHJcbiAgICoqL1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuUmVzZXRBbGxEYXRhKCk7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG5cclxuICAgIC8vZGVjbGFyaW5nIGxvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gMDtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5Q291bnQgPSAwO1xyXG4gICAgdGhpcy5Jc0JhbmtydXB0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IDA7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgdGhpcy5UaW1lciA9IDA7XHJcbiAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgVGltZXJUaW1lb3V0ID0gbnVsbDtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKGZhbHNlKTtcclxuICB9LFxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gIEluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgLy8gY29uc29sZS50cmFjZShcImNsb3NlZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkXCIpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgIH0sIDUwMCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1c2luZXNzU2V0dXAgd2l0aCBsb2FuXHJcbiAgLy9CdXNpbmVzcyBzZXR1cCB1aS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIHRoaXMuVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwKHRydWUpO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25DYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChfdmFsKSB7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIE9uQ2xpY2tEb25lQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cChmYWxzZSk7XHJcbiAgICB2YXIgX2dhbWVjYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgdmFyIF9hbW91bnQgPSBwYXJzZUludCh0aGlzLkFkZENhc2hBbW91bnQpO1xyXG4gICAgaWYgKHRoaXMuQWRkQ2FzaEFtb3VudCAhPSBudWxsICYmIHRoaXMuQWRkQ2FzaEFtb3VudCAhPSBcIlwiICYmIHRoaXMuQWRkQ2FzaEFtb3VudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKF9hbW91bnQgPD0gX2dhbWVjYXNoKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2gudG9TdHJpbmcoKTtcclxuICAgICAgICBfZ2FtZWNhc2ggLT0gX2Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF9nYW1lY2FzaC50b1N0cmluZygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoLCAtMSwgLTEpO1xyXG5cclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIkNhc2ggJFwiICsgdGhpcy5BZGRDYXNoQW1vdW50ICsgXCIgaGFzIGJlZW4gYWRkZWQuXCIpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvIG5vdCBoYXZlIGVub3VnaCBpbiBnYW1lIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUgPSBmYWxzZSwgbW9kZUluZGV4ID0gMCwgX2lzQmFua3J1cHRlZCA9IGZhbHNlLCBfQmFua3J1cHRBbW91bnQgPSAwLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICAvL2NhbGxlZCBmaXJzdCB0aW1lIGZvcm0gR2FtZU1hbmFnZXIgb25sb2FkIGZ1bmN0aW9uXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuXHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IF9pc0JhbmtydXB0ZWQ7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSBfQmFua3J1cHRBbW91bnQ7XHJcblxyXG4gICAgaWYgKF9pc0JhbmtydXB0ZWQpIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuXHJcbiAgICB0aGlzLkluaXRfQnVzaW5lc3NTZXR1cChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSwgbW9kZUluZGV4LCBfaXNCYW5rcnVwdGVkKTtcclxuICB9LFxyXG4gIEluaXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lID0gZmFsc2UsIG1vZGVJbmRleCA9IDAsIF9pc0JhbmtydXB0ZWQgPSBmYWxzZSkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FyZEZ1bmN0aW9uYWxpdHkgPSBuZXcgR2FtZU1hbmFnZXIuQ2FyZERhdGFGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmU7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZEJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGlzRmlyc3RUaW1lKSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gU3RhcnRHYW1lQ2FzaDtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5SZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgaWYgKGluc2lkZUdhbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSBpbmRleDtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgICAgIGlmIChCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICAgICAgaWYgKFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICAgIFByZXZpb3VzQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IDA7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBQcmV2aW91c0Nhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBHaXZlbkNhc2hCdXNpbmVzcztcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWUpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5hdmF0YXJJZCkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgR2V0T2JqX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChuYW1lKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgIGlmIChpc05hTihVSUQpIHx8IFVJRCA9PSB1bmRlZmluZWQpIFVJRCA9IDA7XHJcblxyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQXZhdGFySUQgPSBVSUQ7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIFJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gXCJcIjtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lO1xyXG4gIH0sXHJcbiAgT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gIH0sXHJcbiAgT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcjtcclxuICB9LFxyXG4gIE9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBhbW91bnQ7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gYW1vdW50O1xyXG4gIH0sXHJcbiAgQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2xvYW5UYWtlbikge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgYWxyZWFkeSB0YWtlbiBsb2FuIG9mICRcIiArIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIFJlcXVpcmVkQ2FzaCA9IE1hdGguYWJzKHBhcnNlSW50KFBsYXllckRhdGFJbnRhbmNlLkNhc2gpIC0gYW1vdW50KTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIkXCIgKyBSZXF1aXJlZENhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoNTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBidXNpbmVzcyBiZXR3ZWVuIEhvbWUgQmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IHRha2UgbG9hbiBmb3IgY3VycmVudCBidXNpbmVzcyBzZXR1cFwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGluZGV4ID09IGkpIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgfSxcclxuICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID09IExvYW5BbW91bnRFbnVtLk90aGVyKSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBSZXF1aXJlZENhc2g7XHJcbiAgICBlbHNlIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IHBhcnNlSW50KHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCk7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgdGhpcy5PbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCArIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgfSxcclxuXHJcbiAgUHVzaERhdGFGb3JQbGF5ZXJMZWZ0KF9kYXRhKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkNhc2ggPSAyMDAwMDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLlBsYXllcklEID0gX2RhdGEudXNlcklEO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZSA9IF9kYXRhLm5hbWU7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5BdmF0YXJJRCA9IDA7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPSAxO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkNhcmRGdW5jdGlvbmFsaXR5ID0gbmV3IEdhbWVNYW5hZ2VyLkNhcmREYXRhRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQ7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID0gXCJTYWxvb25cIjtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID0gXCJFdmEgQmVhdXR5XCI7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsIF9wbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBTeW5jRGF0YTogZnVuY3Rpb24gKF9kYXRhLCBfSUQsIF9wbGF5ZXJMZWZ0ID0gZmFsc2UpIHtcclxuICAgIHZhciBfaXNTcGVjdGF0ZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXTtcclxuXHJcbiAgICBpZiAoX2lzU3BlY3RhdGUpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFfcGxheWVyTGVmdCkge1xyXG4gICAgICBpZiAoX0lEICE9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5hY3Rvck5yKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChfZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMpIHtcclxuICAgICAgLy9zZXR0aW5nIHJvb20gcHJvcGVydHkgdG8gZGVjbGFyZSBpbml0aWFsIHNldHVwIGhhcyBiZWVuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8sIHRydWUpO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQdXJjaGFzZUJ1c2luZXNzOiBmdW5jdGlvbiAoX2Ftb3VudCwgX2J1c2luZXNzTmFtZSwgX2lzSG9tZUJhc2VkKSB7XHJcbiAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA8IF9hbW91bnQgJiYgIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vdCBlbm91Z2ggY2FzaCB0byBidXkgdGhpcyBcIiArIF9idXNpbmVzc05hbWUgKyBcIiBidXNpbmVzcy5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChfaXNIb21lQmFzZWQpIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50IDwgMykge1xyXG4gICAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBfYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50Kys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBIb21lIGJhc2VkIGJ1c2luZXNzZXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lID0gdHJ1ZTtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ccmlja0FuZE1vcnRhckFtb3VudCsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuKSB7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUmV2ZXJ0aW5nIGJhY2sgbG9hbiBhbW91bnQuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUHJldmlvdXNDYXNoO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9tb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuSXNCYW5rcnVwdCA9IHRydWU7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJhbmtydXB0QW1vdW50ID0gdGhpcy5CYW5rcnVwdGVkQW1vdW50O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgLy9zZXR0aW5nIHBsYXllciBjdXJyZW50IGRhdGEgaW4gY3VzdG9tIHByb3BlcnRpZXMgd2hlbiBoaXMvaGVyIHR1cm4gb3ZlcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgUGxheWVyRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMSwgUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBiYW5rcnVwdGVkOiB0cnVlLCB0dXJuOiBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpLCBQbGF5ZXJEYXRhTWFpbjogUGxheWVyRGF0YUludGFuY2UgfSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoOSwgX2RhdGEpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBBSVxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuICAgICAgICB9LCAxNjAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIm5vIG1vZGUgc2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUHJldmlvdXNDYXNoO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFBheUFtb3VudFRvUGxheUdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPT0gXCJcIikgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyB0eXBlLlwiKTtcclxuICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID09IFwiXCIpIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZSB8fCBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBzZWxlY3QgYSBidXNpbmVzc1wiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZClcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGhvbWViYXNzZWRcclxuICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoMTAwMDAsIFwiaG9tZVwiLCB0cnVlKTtcclxuICAgICAgZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcilcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGJyaWNrIGFuZCBtb3J0YXJcclxuICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoNTAwMDAsIFwiYnJpY2sgYW5kIG1vcnRhclwiLCBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5TdGFydEdhbWUgPT0gdHJ1ZSB8fCB0aGlzLklzQmFua3J1cHRlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLnB1c2goUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICAgIGlmIChJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCAhPSAtMSkge1xyXG4gICAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIG5vdCBiZWVuIGNhbGxlZCBmcm9tIGluc2lkZSBnYW1lXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBiZWVuIGNhbGxlZCBhdCBzdGFydCBvZiBnYW1lIGFzIGluaXRpYWwgc2V0dXBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHJ0aW50aW5nIGFsbCB2YWx1ZXMgdG8gY29uc29sZVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBuYW1lOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIElEOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJJcyBwbGF5ZXIgYm90OiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Jc0JvdCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIG9mIGJ1c2luZXNzIG9mIHBsYXllciAoc2VlIGJlbG93KTogXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjYXNoOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5DYXNoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIHRha2VuIGxvYW46IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5UYWtlbik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2VuIGxvYW4gYW1vdW50OiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuQW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gVHVybkRlY2lzaW9uU2V0dXBVSVxyXG4gIC8vVHVybkRlY2lzaW9uU2V0dXBVSS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoaXNhY3RpdmUpIHtcclxuICAgIHRoaXMuRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gaXNhY3RpdmU7XHJcblxyXG4gICAgdmFyIF9hY3RpdmUgPSBpc2FjdGl2ZTtcclxuXHJcbiAgICBpZiAoX2FjdGl2ZSkge1xyXG4gICAgICBfYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UaW1lciA9IGdsb2JhbFR1cm5UaW1lcjtcclxuICAgICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IHRoaXMuVGltZXIgKyBcIiBzZWNvbmRzIGFyZSBsZWZ0IHRvIGNob29zZSBhYm92ZSBvcHRpb25zIGV4Y2VwdCAnUm9sbCBUaGUgRGljZSdcIjtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVyVGltZW91dCk7XHJcbiAgICAgIHRoaXMuVXBkYXRlVGltZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lclRpbWVvdXQpO1xyXG4gICAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlRpbWVyVGV4dC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQmxvY2tlck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVRpbWVyKCkge1xyXG4gICAgaWYgKHRoaXMuVGltZXIgPiAwKSB7XHJcbiAgICAgIHRoaXMuVGltZXIgPSB0aGlzLlRpbWVyIC0gMTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlRpbWVyVGV4dC5zdHJpbmcgPSB0aGlzLlRpbWVyICsgXCIgc2Vjb25kcyBhcmUgbGVmdCB0byBjaG9vc2UgYWJvdmUgb3B0aW9ucyBleGNlcHQgJ1JvbGwgVGhlIERpY2UnXCI7XHJcbiAgICAgIFRpbWVyVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlVGltZXIoKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhclRpbWVvdXQoVGltZXJUaW1lb3V0KTtcclxuICAgICAgdGhpcy5UaW1lciA9IDA7XHJcbiAgICAgIHRoaXMuVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5UaW1lclRleHQuc3RyaW5nID0gXCJUaW1lciBpcyBvdmVyLCB5b3UgY2FuIHNlbGVjdCBvbmx5ICdSb2xsIFRoZSBEaWNlJyBub3cuXCI7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQ2FzaEFtb3VudExhYmVsLnN0cmluZyA9IFwiJCBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXS5DYXNoO1xyXG4gIH0sXHJcblxyXG4gIE9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChUZW1wTWFya2V0aW5nQW1vdW50ID09IFwiXCIgfHwgVGVtcE1hcmtldGluZ0Ftb3VudCA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdGhpcy5tYXJrZXRpbmdBbW91bnQgPSBwYXJzZUludChUZW1wTWFya2V0aW5nQW1vdW50KTtcclxuICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcblxyXG4gICAgICAvL2lmIHBsYXllciBlbnRlcmVkIGFtb3VudCBpcyBncmVhdGVyIHRoYW4gdG90YWwgY2FzaCBoZSBvd25zXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRoaXMubWFya2V0aW5nQW1vdW50KSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSB0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgKyB0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IHN1Y2Nlc3NmdWxseSBtYXJrZXRlZCBhbW91bnQgb2YgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ICsgXCIgLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICsgXCIuXCIsXHJcbiAgICAgICAgICBMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIik7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBpZiBwbGF5ZXIgaGFzIG1vcmUgdGhhbiA1MDAwJFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgYWxyZWFkeSBoaXJlZCBhIGxhd3llci5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBUZW1wSGlyaW5nTGF3eWVyID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhUZW1wSGlyaW5nTGF3eWVyKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIDUwMDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKyBcIi5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJzb3JyeSwgeW91IGRvbnQgaGF2ZSBlbm91Z2ggbW9uZXkgdG8gaGlyZSBhIGxhd3llci5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKF9uYW1lKSB7XHJcbiAgICBMb2NhdGlvbk5hbWUgPSBfbmFtZTtcclxuICB9LFxyXG4gIE9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChldmVudCA9IG51bGwsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIC8vaWYgcGxheWVyIGhhcyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGhlIGNvdWxkIGV4cGFuZCBpdFxyXG4gICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3NcIik7XHJcblxyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gX2lzQ2FyZEZ1bmN0aW9uYWxpdHk7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IF9HaXZlbkNhc2g7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoO1xyXG5cclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHZhciBnZW5lcmF0ZWRMZW5ndGggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbihCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHksIEdpdmVuQ2FzaEJ1c2luZXNzLCBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG5cclxuICAgIGlmIChnZW5lcmF0ZWRMZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgdG8gZXhwYW5kLlwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfSwgMTYwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJzdGFydGluZyBuZXcgYnVzaW5lc3NcIik7XHJcbiAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLkdvbGRJbnZlc3RlZCkge1xyXG4gICAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0O1xyXG4gICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJJbnZlc3QgSW4gR09MRFwiLCBEaWNlUmVzdWx0LCBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBCVVlcIiwgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIkJVWVwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChldmVudCA9IG51bGwsIF9pc1R1cm5PdmVyID0gZmFsc2UpIHtcclxuICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gX2lzVHVybk92ZXI7XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihfaXNUdXJuT3Zlcik7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KSBTdG9ja0J1c2luZXNzTmFtZSA9IFwiRnJpZW5kJ3MgQnVzaW5lc3NcIjtcclxuXHJcbiAgICBpZiAoIXRoaXMuU3RvY2tJbnZlc3RlZCB8fCBUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFN0b2NrQnVzaW5lc3NOYW1lID09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuXHJcbiAgICAgICAgaWYgKCFUdXJuT3ZlckZvckludmVzdCkgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBlbHNlIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJJbnZlc3QgaW4gU3RvY2tcIiwgRGljZVJlc3VsdCwgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gQlVZXCIsIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJCVVlcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLkdvbGRTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIEdPTERcIiwgRGljZVJlc3VsdCwgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLCBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIlNFTExcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIFNUT0NLXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBzaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIiwgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJTRUxMXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgc2hhcmVzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgIC8vIHRoaXMuU2hvd1RvYXN0KFwid29yayBpbiBwcm9ncmVzcywgY29taW5nIHNvb24uLi5cIik7XHJcbiAgICAvLyB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsRGljZSgpO1xyXG4gIH0sXHJcblxyXG4gIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvL3RoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGFydG5lcnNoaXAgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLldhaXRpbmdTdGF0dXNTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBhcnRuZXJTaGlwUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIHZhciBfdG90YWxMb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgIHZhciBfYWxsTG9jYXRpb25zQW1vdW50ID0gX3RvdGFsTG9jYXRpb25zICogMjUwMDA7XHJcbiAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlBhcnRuZXJOYW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoXCJub25lXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZykge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZS5zdHJpbmcgPSBfdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25EZXNjcmlwdGlvbi5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpIHtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IHRydWU7XHJcbiAgICBQYXJ0bmVyU2hpcERhdGEgPSBfZGF0YTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSBfYnVzaW5lc3NNb2RlID0gXCJIb21lIEJhc2VkXCI7XHJcbiAgICBlbHNlIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIF9idXNpbmVzc01vZGUgPSBcIkJyaWNrICYgTW9ydGFyXCI7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbXNnID1cclxuICAgICAgICBcInlvdSBoYXZlIHJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGJ5IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICtcclxuICAgICAgICBcIiAsIGZvbGxvd2luZyBhcmUgdGhlIGRldGFpbHMgb2YgYnVzaW5lc3M6IFwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE5hbWU6IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NOYW1lICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE1vZGU6IFwiICtcclxuICAgICAgICBfYnVzaW5lc3NNb2RlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIFZhbHVlOiAkXCIgK1xyXG4gICAgICAgIF9idXNpbmVzc1ZhbHVlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkNhc2ggUGF5bWVudDogJFwiICtcclxuICAgICAgICBfcGF5QW1vdW50ICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcImlmIG9mZmVyIGlzIGFjY2VwdGVkIHlvdSB3aWxsIHJlY2VpdmUgNTAlIHNoYXJlIG9mIHRoYXQgcGFydGljdWxhciBidXNpbmVzcyBhbmQgd2lsbCByZWNlaXZlIHByb2ZpdC9sb3NlIG9uIHRoYXQgcGFydGljdWxhciBidXNpbmVzcy5cIjtcclxuXHJcbiAgICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoID49IF9wYXlBbW91bnQpIHtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoIC09IF9wYXlBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAodHJ1ZSwgX3BheUFtb3VudCwgZmFsc2UsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJjb25ncmF0dWxhdGlvbnMhIHlvdSBoYXZlIHN0YXJ0ZWQgYnVzaW5lc3MgcGFydG5lcnNoaXBcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoZmFsc2UsIDAsIHRydWUsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfaXNBY2NlcHRlZCA9IGZhbHNlLCBfcGF5bWVudCA9IDAsIF9pc0NhbmNlbGxlZCA9IGZhbHNlLCBfdUlEID0gXCJcIiwgX2RhdGEgPSBudWxsLCBfYnVzaW5lc3NJbmRleCA9IDApIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSB7IERhdGE6IHsgQWNjZXB0ZWQ6IF9pc0FjY2VwdGVkLCBDYXNoUGF5bWVudDogX3BheW1lbnQsIENhbmNlbGxlZDogX2lzQ2FuY2VsbGVkLCBQbGF5ZXJJRDogX3VJRCwgUGxheWVyRGF0YTogX2RhdGEsIEJ1c2luZXNzSW5kZXg6IF9idXNpbmVzc0luZGV4IH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTIsIF9tYWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfZGF0YSkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdmFyIF9hY2NlcHRlZCA9IF9kYXRhLkRhdGEuQWNjZXB0ZWQ7XHJcbiAgICAgIHZhciBfY2FzaCA9IF9kYXRhLkRhdGEuQ2FzaFBheW1lbnQ7XHJcbiAgICAgIHZhciBfY2FuY2VsbGVkID0gX2RhdGEuRGF0YS5DYW5jZWxsZWQ7XHJcbiAgICAgIHZhciBfdWlkID0gX2RhdGEuRGF0YS5QbGF5ZXJJRDtcclxuICAgICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLkJ1c2luZXNzSW5kZXg7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcImFuc3dlciByZWNlaXZlZFwiKTtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Nhc2g7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCA9IHRydWU7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3VpZDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIGFjY2VwdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiLCBjYXNoICRcIiArIF9jYXNoICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBhY2NvdW50LlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmluY2x1ZGVzKF91aWQpID09IGZhbHNlKSBDYW5jZWxsZWRJRC5wdXNoKF91aWQpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKENhbmNlbGxlZElEKTtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5sZW5ndGggPT0gX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gY2FuY2VsbGVkIGJ5IGFsbCBvdGhlciB1c2Vycy5cIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciByZWplY3RlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICBSZXNldEdvbGRJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5Hb2xkRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5TdG9ja0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbChfYW1vdW50KSB7XHJcbiAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBfYW1vdW50O1xyXG5cclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgdmFyIF9hbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqXCIgKyBFbnRlckJ1eVNlbGxBbW91bnQgKyBcIj1cIiArIF9hbW91bnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB0aGlzLlJlc2V0R29sZElucHV0KCk7XHJcbiAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChfdGl0bGUsIF9kaWNlUmVzdWx0LCBfcHJpY2VUaXRsZSwgX3ByaWNlVmFsdWUsIF9idXlPclNlbGxUaXRsZSwgX3RvdGFsQW1vdW50VGl0bGUsIF90b3RhbEFtb3VudFZhbHVlLCBfYnV0dG9uTmFtZSwgX3N0YXRlKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2VSZXN1bHQ7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVGl0bGVMYWJlbC5zdHJpbmcgPSBfcHJpY2VUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZyA9IF9wcmljZVZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXlPclNlbGxUaXRsZUxhYmVsLnN0cmluZyA9IF9idXlPclNlbGxUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRUaXRsZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1dHRvbk5hbWVMYWJlbC5zdHJpbmcgPSBfYnV0dG9uTmFtZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVEYXRhX0ludmVzdFNlbGwoX3RvdGFsQW1vdW50VmFsdWUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIEFwcGx5QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcblxyXG4gICAgICBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTERcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiQnV5aW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBPdW5jZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIE91bmNlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIGlmIChfYW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50IC09IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlNvbGQgT3VuY2VzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBPdW5jZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggR09MRCBvdW5jZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgKyBcIiBvZiBHT0xEIG91bmNlc1wiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgLy9jYW4gYWRkIG11bHRpcGxlIHN0b2NrcyB3aXRoIGJ1c2luZXNzIG5hbWUgaW4gb2JqZWN0IGlmIHJlcXVpcmVkXHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIHNoYXJlcyBvZiBidXNpbmVzcyBcIiArIFN0b2NrQnVzaW5lc3NOYW1lLCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJCdXlpbmcgU1RPQ0s6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIHNoYXJlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBzaGFyZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIHNoYXJlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuXHJcbiAgICAgICAgaWYgKF9hbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCAtPSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgKyBfYW1vdW50ICsgXCIgc2hhcmVzIG9mIHN0b2NrIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIFNUT0NLOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBzaGFyZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJTb2xkIHNoYXJlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3Igc2hhcmVzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIHN0b2NrcyBzaGFyZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICsgXCIgb2Ygc3RvY2sgc2hhcmVzXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXlkYXkgb3IgRG91YmxlIHBheSBEYXlcclxuICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKSB7XHJcbiAgICBpZiAoSE1BbW91bnQgPT0gMCkge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChCTUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWxvYW5UYWtlbikge1xyXG4gICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdldExvYW5BbW91bnRfUGF5RGF5KCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdmFyIF9sb2FuID0gMDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hbiA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xvYW47XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXkgPSBmYWxzZSwgX3NraXBITSA9IGZhbHNlLCBfc2tpcEJNID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgX2hNQW1vdW50ID0gMCwgX2JtQW1vdW50ID0gMCwgX2JtTG9jYXRpb24gPSAwLCBQYXlkYXlDb3VudGVyID0gMSwgRG91YmxlUGF5Q291bnRlciA9IDAsIF9oYWxmUGF5ZGF5ID0gZmFsc2UpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgVG90YWxQYXlEYXkgPSAwO1xyXG5cclxuICAgIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG4gICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5KSB7XHJcbiAgICAgIEdpdmVQcm9maXRVc2VySUQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlVzZXJJREZvclByb2ZpdFBheURheTtcclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYW5HaXZlUHJvZml0T25QYXlEYXkgPSBmYWxzZTtcclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKEdpdmVQcm9maXRVc2VySUQpO1xyXG4gICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkpO1xyXG5cclxuICAgIGlmIChHaXZlUHJvZml0VXNlcklEICE9IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdob2xlIHByb2ZpdCB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIG90aGVyIHBsYXllciB0aGlzIHR1cm4uXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIEhCRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgQk1EaWNlQ291bnRlciA9IDA7XHJcbiAgICBOZXh0SGFsZlBheURheSA9IF9oYWxmUGF5ZGF5O1xyXG4gICAgLy8gICBpZiAoRG91YmxlUGF5Q291bnRlciA9PSAwKSBEb3VibGVQYXlDb3VudGVyID0gMTtcclxuXHJcbiAgICAvLyAgaWYgKERvdWJsZVBheURheSkgRG91YmxlUGF5Q291bnRlciA9IERvdWJsZVBheUNvdW50ZXIgKiAyO1xyXG5cclxuICAgIERvdWJsZURheUJ1c2luZXNzSEIgPSAwO1xyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NCTSA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0hCKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0JNKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKERvdWJsZURheUJ1c2luZXNzSEIgPiAwIHx8IERvdWJsZURheUJ1c2luZXNzQk0gPiAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gXCIgKyAoRG91YmxlRGF5QnVzaW5lc3NIQiArIERvdWJsZURheUJ1c2luZXNzQk0pICsgXCIgYnVzaW5lc3MvZXMuXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcmVzID0gUGF5ZGF5Q291bnRlciArIERvdWJsZVBheUNvdW50ZXI7XHJcbiAgICBQYXlEYXlJbmZvID0gXCJQYXlEYXkgUmVzdWx0IHdpdGggbXVsdGlwbGllcjogXCIgKyBfcmVzO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gUGF5ZGF5Q291bnRlcjtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5Q291bnQgPSBEb3VibGVQYXlDb3VudGVyO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gX2lzRG91YmxlUGF5RGF5O1xyXG4gICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdmFyIF90aW1lID0gMTgwMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBfZm9yU2VsZWN0ZWRCdXNpbmVzcztcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9TZWxlY3RlZEJ1c2luZXNzSW5kZXg7XHJcbiAgICBITUFtb3VudCA9IF9oTUFtb3VudDtcclxuICAgIEJNQW1vdW50ID0gX2JtQW1vdW50O1xyXG4gICAgQk1Mb2NhdGlvbnMgPSBfYm1Mb2NhdGlvbjtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChOZXh0SGFsZlBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdpbGwgcmVjZWl2ZSBoYWxmIHByb2ZpdHMgdGhpcyBwYXlkYXkuXCIsIF90aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvYW5UYWtlbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBsb2FuVGFrZW4gPSBfbG9hblRha2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZyA9IEJNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmcgPSBCTUxvY2F0aW9ucztcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5QYXNzZWRQYXlEYXlDb3VudExhYmVsLnN0cmluZyA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICB2YXIgX2xvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICRcIiArIF9sb2FuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJDUwMDBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG5cclxuICAgIGlmIChfc2tpcEJNIHx8IF9za2lwSE0pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgX3RpbWUgKyAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5PbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgaWYgKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcbiAgICAgIHZhciBfaGFsZlBheWRheSA9IE5leHRIYWxmUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG5cclxuICAgICAgaWYgKF9oYWxmUGF5ZGF5KSBfbXVsdGlwbGllciA9IF9tdWx0aXBsaWVyIC8gMjtcclxuXHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG4gICAgICBpZiAoX2RvdWJsZVBheURheSkge1xyXG4gICAgICAgIGlmICh0aGlzLkRvdWJsZVBheURheUNvdW50ICE9IDApIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyICo9IDIgKiB0aGlzLkRvdWJsZVBheURheUNvdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGRvdWJsZVBheURheUFkZGVkID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIERvdWJsZURheUJ1c2luZXNzSEIgKiBfZGljZSAqIDEwMDA7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSBUb3RhbFBheURheUFtb3VudCA9IF9tdWx0aXBsaWVyICogX3BheWRheW11bHRpcGxpZXIgKiBITUFtb3VudCAqIF9kaWNlICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgZWxzZSBUb3RhbFBheURheUFtb3VudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiAoSE1BbW91bnQgKiBfZGljZSkgKiAxMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIEhNQW1vdW50ICsgXCIqXCIgKyBcIjEwMDApLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiK1wiICsgZG91YmxlUGF5RGF5QWRkZWQgKyBcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJIb21lIEJhc2VkIEJ1c2luZXNzOiBcIiArIEhNQW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG4gICAgICB2YXIgX2hhbGZQYXlkYXkgPSBOZXh0SGFsZlBheURheTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9hbW91bnQgPSBCTUFtb3VudCArIEJNTG9jYXRpb25zO1xyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICBpZiAoX2hhbGZQYXlkYXkpIF9tdWx0aXBsaWVyID0gX211bHRpcGxpZXIgLyAyO1xyXG5cclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5Eb3VibGVQYXlEYXlDb3VudCAhPSAwKSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyICogdGhpcy5Eb3VibGVQYXlEYXlDb3VudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgKj0gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkb3VibGVQYXlEYXlBZGRlZCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBEb3VibGVEYXlCdXNpbmVzc0JNICogX2RpY2UgKiAyMDAwO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIFRvdGFsUGF5RGF5QW1vdW50ID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIF9hbW91bnQgKiBfZGljZSAqIDIwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgIGVsc2UgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogKF9hbW91bnQgKiBfZGljZSkgKiAyMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBfYW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKS1cIiArIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBcIitcIiArIGRvdWJsZVBheURheUFkZGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJCcmljayAmIE1vcnRhciBCdXNpbmVzczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2UgX0VzdGltYXRlTG9hbiA9IDUwMDA7XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfRXN0aW1hdGVMb2FuKSB7XHJcbiAgICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlUGF5bWVudF9QYXlEYXkoKSB7XHJcbiAgICAvL2FsbFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTa2lwTG9hbk9uZVRpbWVfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBza2lwcGVkIHRoZSBsb2FuIHBheW1lbnQsIGJhbmsgd2lsbCBjYWxsIHVwb24gY29tcGxldGUgbG9hbiBhbW91bnQgb24gbmV4dCBwYXlkYXlcIik7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1BheURheShfYW1vdW50KSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBFeGl0TG9hblNjcmVlbl9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBTdGFydE5ld0dhbWVfUGF5RGF5KCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0LlwiLCAzMDAwLCBmYWxzZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU2hvd0NhcmRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgMzAxMCk7XHJcbiAgfSxcclxuXHJcbiAgU2hvd0luZm8oX2RhdGEpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KF9kYXRhLmluZm8sIDIwMDAsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIFBheURheUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChIb21lQmFzZWRQYXltZW50Q29tcGxldGVkICYmIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCAmJiBMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBheWRheSBkb25lXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKEdpdmVQcm9maXRVc2VySUQgIT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91ciB3aG9sZSBQYXlkYXkgYW1vdW50ICRcIiArIFRvdGFsUGF5RGF5ICsgXCIgd2lsbCBiZSB0cmFuc2ZlcnJlZCB0byBvdGhlciBwbGF5ZXIgbm93LlwiLCAyMjAwKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUGF5RGF5O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKFRvdGFsUGF5RGF5LCBHaXZlUHJvZml0VXNlcklEKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDb21wbGV0aW9uKCk7XHJcbiAgICAgICAgfSwgMzIwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ29tcGxldGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudEZvckNvbXBsZXRpb24oKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKGZhbHNlKTtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlUGF5RGF5KGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuXHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheUNvdW50ZXIgPiAwKSB7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyLS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlSGFsZlBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICBfbWFuYWdlci5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9tYW5hZ2VyLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKFBheURheUluZm8pO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxsICYgbWFuaXB1bGF0ZSBCdXNpbmVzcyBVSVxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTExcIjtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIGVsc2Ugbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVU0lORVNTXCI7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICAvLyBlbHNlXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX2lzQm90KSB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG5cclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90KTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgVUlcclxuICBUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiSU5WRVNUXCI7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICBUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVZIE9SIFNFTExcIjtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzZXR1cCBVaVxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNob3dRdWVzdGlvblRvYXN0KF9tc2cpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW5MYWJlbC5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb25lUXVlc3Rpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgb25lUXVlc3Rpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX21zZykge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nID0gX21zZztcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU2VsZWN0IEJ1c2luZXNzIG9mciBkb3VibGUgcGF5ZGF5IHNldHVwXHJcbiAgVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NEb3VibGVQYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVkaXRUaXRsZV9CdXNpbmVzc1BheURheVVJU2V0dXAoX21haW5UaXRsZSwgX3RpbGVDb250ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5UaXRsZU5hbWUuc3RyaW5nID0gX21haW5UaXRsZTtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlRpdGxlQ29udGVudExhYmVsLnN0cmluZyA9IF90aWxlQ29udGVudDtcclxuICB9LFxyXG5cclxuICBFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpIHtcclxuICAgIHRoaXMuQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNjcmVlbl9BbG9uZ1R1cm5PdmVyX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpIHtcclxuICAgIHRoaXMuQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIENsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMgPSBbXTtcclxuICB9LFxyXG4gIFByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoX3RlbXBEYXRhLCBfYnVzaW5lc3NUeXBlKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gX2J1c2luZXNzVHlwZSkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgdmFyIF90b3RhbExvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgICAgdmFyIF9hbGxMb2NhdGlvbnNBbW91bnQgPSBfdG90YWxMb2NhdGlvbnMgKiAyNTAwMDtcclxuICAgICAgICAgIHZhciBfZmluYWxBbW91bnQgPSA1MDAwMCArIF9hbGxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUGFydG5lck5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShcIm5vbmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXNpbmVzc0RldGFpbFBheURheU5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVTZWxldGl2ZURvdWJsZVBheURheV9CdXNpbmVzc1BheURheVVJU2V0dXAoX2lzSG9tZUJhc2VkID0gZmFsc2UsIF9pc0JyaWNrQW5kTW9ydGFyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cChcIkJVU0lORVNTXCIsIFwiKlNlbGVjdCBhIGJ1c2luZXNzIHRvIHJlY2VpdmUgZG91YmxlIHBheWRheSBwcm9maXRzIHRocm91Z2ggb3V0IGdhbWUgb24gdGhhdCBidXNpbmVzcy5cIik7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGlmIChfaXNCcmlja0FuZE1vcnRhcikge1xyXG4gICAgICB0aGlzLlByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoX3RlbXBEYXRhLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzSG9tZUJhc2VkKSB7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfdGVtcERhdGEsIDEpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxlY3QgUGxheWVyIGZvciBwcm9maXRcclxuICBUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTEVDVCBQTEFZRVJcIjtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBzZWxlY3RQbGF5ZXJQcm9maXROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RQbGF5ZXJQcm9maXROb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfU2VsZWN0UGxheWVyRm9yUHJvZml0KCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgU2hvd1RvYXN0OiBmdW5jdGlvbiAobWVzc2FnZSwgdGltZSA9IFNob3J0TWVzc2FnZVRpbWUsIF9oYXNidXR0b24gPSB0cnVlKSB7XHJcbiAgICB0aGlzLlBvcFVwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUG9wVXBVSUxhYmVsLnN0cmluZyA9IG1lc3NhZ2U7XHJcbiAgICB2YXIgU2VsZlRvYXN0ID0gdGhpcztcclxuICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuXHJcbiAgICBpZiAobW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdCBtb2RlIG9ubHlcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGggPiAwICYmIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXS5Jc0JvdCkge1xyXG4gICAgICAgIC8vIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgLy8gICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAvLyAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgLy8gICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUb2FzdCgpO1xyXG4gICAgICAgICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICAgICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ29tcGxldGVUb2FzdCgpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0b2FzdCBjYWxsZWRcIik7XHJcbiAgICB0aGlzLlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgfSxcclxuXHJcbiAgU2hvd1Jlc3VsdFNjcmVlbjogZnVuY3Rpb24gKF9zdGF0dXMsIF9kYXRhKSB7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuUmVzdWx0U2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuU3RhdHVzTGFiZWwuc3RyaW5nID0gX3N0YXR1cztcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5Cb2R5TGFiZWwuc3RyaW5nID0gX2RhdGE7XHJcbiAgfSxcclxuXHJcbiAgUmVzdGFydFRoZUdhbWUoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc3RhcnRHYW1lKCk7XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudFRvU3luY0luZm8oX2RhdGFJbmZvKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICB2YXIgX2RhdGEgPSB7IGluZm86IF9kYXRhSW5mbyB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE1LCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IHsgaW5mbzogX2RhdGFJbmZvIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNSwgX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==