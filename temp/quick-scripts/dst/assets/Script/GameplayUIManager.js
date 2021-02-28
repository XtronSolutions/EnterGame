
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
var DamageDecisionResult = 0;
var GamePlayReferenceManager = null;
var businessDetailNodes = [];
var SenderDamagingID = "";
var businessTakeOverNodes = [];
var businessDamagingNodes = [];
var oneQuestionNodes = [];
var selectPlayerProfitNodes = [];
var selectedPlayerTakeOver = [];
var selectedPlayerDamaging = [];
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
var TotalPayDay = 0;
var BankRuptedCard = false; // var CompletionWindowTime = 500;//8000
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
}); //-------------------------------------------class for SelectPlayerGeneric-------------------------//

var SelectPlayerGeneric = cc.Class({
  name: "SelectPlayerGeneric",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    PlayerDetailLabel: {
      displayName: "PlayerDetailLabel",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    DetailsPrefab: {
      displayName: "DetailsPrefab",
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
}); //-------------------------------------------class for SelectBusinessGeneric-------------------------//

var SelectBusinessGeneric = cc.Class({
  name: "SelectBusinessGeneric",
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
    BusinessPrefab: {
      displayName: "BusinessPrefab",
      type: cc.Prefab,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of BusinessPrefab of Sell node"
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
}); //-------------------------------------------class for DamagingInformationDecisionSetup-------------------------//

var DamagingInformationDecisionSetup = cc.Class({
  name: "DamagingInformationDecisionSetup",
  properties: {
    MainScreen: {
      displayName: "MainScreen",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    DiceResultScreen: {
      displayName: "DiceResultScreen",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    BusinessSelectScreen: {
      displayName: "BusinessSelectScreen",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    DamageBusinessSelect: {
      "default": {},
      type: SelectBusinessGeneric,
      serializable: true
    },
    DiceResultLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for BuyHalfBusinessSetupUI-------------------------//

var BuyHalfBusinessSetupUI = cc.Class({
  name: "BuyHalfBusinessSetupUI",
  properties: {
    MainScreen: {
      displayName: "MainScreen",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    TitleLabel: {
      displayName: "TitleLabel",
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
    SelectPlayerTakeOverSetup: {
      "default": {},
      type: SelectPlayerGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class"
    },
    SelectPlayerDamagingSetup: {
      "default": {},
      type: SelectPlayerGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class"
    },
    DecisionDamagingSetup: {
      "default": {},
      type: DamagingInformationDecisionSetup,
      serializable: true,
      tooltip: "reference of DamagingInformationDecisionSetup class"
    },
    SelectBusinessTakeOver: {
      "default": {},
      type: SelectBusinessGeneric,
      serializable: true,
      tooltip: "reference of SelectBusinessGeneric class"
    },
    BuyHalfBusinessUISetup: {
      "default": {},
      type: BuyHalfBusinessSetupUI,
      serializable: true,
      tooltip: "reference of BuyHalfBusinessSetupUI class"
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
    SelectPlayerTakeOverScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SelectPlayerTakeOver screen"
    },
    SelectPlayerDamagingScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SelectPlayerDamaging screen"
    },
    SelectBusinessTakeOverScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SelectBusinessTakeOver screen"
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
    businessTakeOverNodes = [];
    businessDamagingNodes = [];
    DamageDecisionResult = 0;
    oneQuestionNodes = [];
    SenderDamagingID = "";
    selectPlayerProfitNodes = [];
    selectedPlayerTakeOver = [];
    selectedPlayerDamaging = [];
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
    BankRuptedCard = false;
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
  ProcessBankrupt: function ProcessBankrupt(_showText, _txt, _time) {
    var _this7 = this;

    if (_showText === void 0) {
      _showText = true;
    }

    if (_showText) {
      this.ShowToast(_txt, _time, false);
    }

    setTimeout(function () {
      _this7.Exit_SelectPlayerGeneric();

      _this7.ExitScreen__BusinessGenric();

      _this7.ToggleDiceResultScreen_DamageDecision(false);

      _this7.ToggleMainScreen_DamageDecision(false);

      _this7.ExitLoanScreen_PayDay();

      _this7.TogglePayDayScreen_PayDay(false);

      _this7.Exit___InsufficientBalance();

      _this7.ToggleScreen_BuyHalfBusiness(false);

      cc.systemEvent.emit("ShowCard", "", false);
      HomeBasedPaymentCompleted = false;
      BrickMortarPaymentCompleted = false;
      LoanPayed = false;
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
      GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false, false);
      GamePlayReferenceManager.Instance.Get_GameManager().Bankrupt_TurnDecision();
    }, _time + 10);
  },
  StartNewGame_PayDay: function StartNewGame_PayDay() {
    //if bankrupted you can start new game
    var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

    if (mode == 2) {
      if (BankRuptedCard) {
        BankRuptedCard = false;
        this.ToggleDiceResultScreen_DamageDecision(false);
        this.ToggleMainScreen_DamageDecision(false);
        this.Exit___InsufficientBalance();
        this.Exit_SelectPlayerGeneric();
        this.ExitScreen__BusinessGenric();
        this.ExitLoanScreen_PayDay();
        var _sendingData = {
          ID: SenderDamagingID,
          Cash: DamageDecisionResult,
          IsDiceRolled: true,
          IsBankRupted: true
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(25, _sendingData);
        var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
        var playerData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

        for (var index = 0; index < playerData.length; index++) {
          if (playerData[index].PlayerUID == _myActor.PlayerUID) {
            playerData[index].CardFunctionality.BankruptedNextTurn = true;
            GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", playerData[index]);
            break;
          }
        }

        this.ShowToast("You will lose all progress and start new game from the start next turn.", 3000, false);
      } else {
        this.ProcessBankrupt(true, "You will lose all progress and start new game from the start.", 3000);
      }
    } else if (mode == 1) {
      this.ProcessBankrupt(true, "You will lose all progress and start new game from the start.", 3000);
    }
  },
  StartNewGame_BankRupted: function StartNewGame_BankRupted(_txt) {
    //if bankrupted you can start new game
    var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();
    this.ProcessBankrupt(true, _txt, 3000);
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
  SetBusinessUI_SellBusinessUISetup: function SetBusinessUI_SellBusinessUISetup(_sellAmount) {
    if (_sellAmount === void 0) {
      _sellAmount = 0;
    }

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

      if (_sellAmount != 0) {
        node.getComponent("BusinessDetail").SetSellingAmount(_sellAmount);
      }

      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) {
        node.getComponent("BusinessDetail").SetBusinessMode(1);
        node.getComponent("BusinessDetail").SetMode("Home Based");
      } else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) {
        node.getComponent("BusinessDetail").SetBusinessMode(2);
        node.getComponent("BusinessDetail").SetMode("Brick & Mortar");
      }

      node.getComponent("BusinessDetail").SetBalance(_tempData.NoOfBusiness[index].LoanAmount);
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
  EnableSellScreen__SellBusinessUISetup: function EnableSellScreen__SellBusinessUISetup(_isTurnover, _sellAmount) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    if (_sellAmount === void 0) {
      _sellAmount = 0;
    }

    if (_isTurnover) {
      this.SellBusinessSetupUI.ExitButton.active = false;
      this.SellBusinessSetupUI.TurnOverExitButton.active = true;
    } else {
      this.SellBusinessSetupUI.ExitButton.active = true;
      this.SellBusinessSetupUI.TurnOverExitButton.active = false;
    }

    this.ToggleSellBusinessScreen_SellBusinessUISetup(true);
    this.SetBusinessUI_SellBusinessUISetup(_sellAmount);
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
  //#region Select Player to Take over business
  ToggleScreen_SelectPlayerTakeOver: function ToggleScreen_SelectPlayerTakeOver(_state) {
    this.SelectPlayerTakeOverScreen.active = _state;
  },
  SetUpSpaceScreen_SelectPlayerTakeOver: function SetUpSpaceScreen_SelectPlayerTakeOver(_myData, _actorsData, _isTurnOver, _modeIndex, _buyHalfBusiness) {
    if (_modeIndex === void 0) {
      _modeIndex = 0;
    }

    if (_buyHalfBusiness === void 0) {
      _buyHalfBusiness = false;
    }

    this.SelectPlayerTakeOverSetup.TitleLabel.string = "SELECT PLAYER";
    this.SelectPlayerTakeOverSetup.CashLabel.string = "$" + _myData.Cash;
    this.SelectPlayerTakeOverSetup.PlayerNameLabel.string = _myData.PlayerName;
    this.SelectPlayerTakeOverSetup.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;
    var _mainData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    if (_modeIndex == 2) {
      for (var index = 0; index < _actorsData.length; index++) {
        if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) {
          //check if player is spectate or not, dont add any spectates
          if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
            var node = cc.instantiate(this.SelectPlayerTakeOverSetup.DetailsPrefab);
            node.parent = this.SelectPlayerTakeOverSetup.ScrollContent;
            node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
            node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);

            if (_buyHalfBusiness) {
              node.getComponent("PlayerDetails").setBuyHalf(true);
            }

            for (var k = 0; k < _mainData.length; k++) {
              if (_mainData[k].PlayerUID == _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
                node.getComponent("PlayerDetails").setPlayerIndex(k);
                break;
              }
            }

            selectedPlayerTakeOver.push(node);
          }
        }
      }
    } else if (_modeIndex == 1) {
      //for bot
      for (var _index4 = 0; _index4 < _actorsData.length; _index4++) {
        if (_myData.PlayerUID != _actorsData[_index4].PlayerUID) {
          var node = cc.instantiate(this.SelectPlayerTakeOverSetup.DetailsPrefab);
          node.parent = this.SelectPlayerTakeOverSetup.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[_index4].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[_index4].PlayerUID);
          selectedPlayerTakeOver.push(node);
        }
      }
    }

    if (_isTurnOver) {
      this.SelectPlayerTakeOverSetup.ExitButton.active = false;
      this.SelectPlayerTakeOverSetup.TurnOverExitButton.active = true;
    } else {
      this.SelectPlayerTakeOverSetup.ExitButton.active = true;
      this.SelectPlayerTakeOverSetup.TurnOverExitButton.active = false;
    }
  },
  ResetSpaceScreen_SelectPlayerTakeOver: function ResetSpaceScreen_SelectPlayerTakeOver() {
    for (var index = 0; index < selectedPlayerTakeOver.length; index++) {
      selectedPlayerTakeOver[index].destroy();
    }

    selectedPlayerTakeOver = [];
  },
  Exit_SelectPlayerGeneric: function Exit_SelectPlayerGeneric() {
    this.ResetSpaceScreen_SelectPlayerDamaging();
    this.ResetSpaceScreen_SelectPlayerTakeOver();
    this.ToggleScreen_SelectPlayerTakeOver(false);
    this.ToggleScreen_SelectPlayerDamaging(false);
  },
  ExitAlongTurnOver_SelectPlayerGeneric: function ExitAlongTurnOver_SelectPlayerGeneric() {
    this.ResetSpaceScreen_SelectPlayerDamaging();
    this.ResetSpaceScreen_SelectPlayerTakeOver();
    this.ToggleScreen_SelectPlayerTakeOver(false);
    this.ToggleScreen_SelectPlayerDamaging(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  //
  //#region Select Business to take over
  ToggleScreen_BusinessTakeOver: function ToggleScreen_BusinessTakeOver(_state) {
    this.SelectBusinessTakeOverScreen.active = _state;
  },
  SetBusinessUI_BusinessTakeOver: function SetBusinessUI_BusinessTakeOver(_playerData, _OtherPlayerIndex, _buyHalfBusiness) {
    if (_OtherPlayerIndex === void 0) {
      _OtherPlayerIndex = 0;
    }

    if (_buyHalfBusiness === void 0) {
      _buyHalfBusiness = false;
    }

    this.Reset_BusinessTakeOver();

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = _playerData;
    console.log(_tempData);
    this.SelectBusinessTakeOver.TitleLabel.string = "BUSINESS";
    this.SelectBusinessTakeOver.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.SelectBusinessTakeOver.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;
    this.SelectBusinessTakeOver.BusinessCountLabel.string = "No of Businesses : " + _playerData.NoOfBusiness.length;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.SelectBusinessTakeOver.BusinessPrefab);
      node.parent = this.SelectBusinessTakeOver.ScrollContentNode;
      node.getComponent("BusinessDetail").CheckReferences();
      node.getComponent("BusinessDetail").SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent("BusinessDetail").SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent("BusinessDetail").SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent("BusinessDetail").SetBusinessIndex(index);
      node.getComponent("BusinessDetail").SetPlayerObject(_playerData);
      node.getComponent("BusinessDetail").SetPlayerIndex(_OtherPlayerIndex);

      if (_buyHalfBusiness) {
        node.getComponent("BusinessDetail").setHalfBusiness(true);
      }

      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) {
        node.getComponent("BusinessDetail").SetBusinessMode(1);
        node.getComponent("BusinessDetail").SetMode("Home Based");
      } else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) {
        node.getComponent("BusinessDetail").SetBusinessMode(2);
        node.getComponent("BusinessDetail").SetMode("Brick & Mortar");
      }

      node.getComponent("BusinessDetail").SetBalance(_tempData.NoOfBusiness[index].LoanAmount);
      node.getComponent("BusinessDetail").SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);
      businessTakeOverNodes.push(node);
    }
  },
  Reset_BusinessTakeOver: function Reset_BusinessTakeOver() {
    for (var index = 0; index < businessTakeOverNodes.length; index++) {
      businessTakeOverNodes[index].destroy();
    }

    businessTakeOverNodes = [];
  },
  EnableScreen__BusinessTakeOver: function EnableScreen__BusinessTakeOver(_isTurnover, _playerData, _playerIndex, _buyHalfBusiness) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    if (_playerData === void 0) {
      _playerData = null;
    }

    if (_playerIndex === void 0) {
      _playerIndex = 0;
    }

    if (_buyHalfBusiness === void 0) {
      _buyHalfBusiness = false;
    }

    if (_isTurnover) {
      this.SelectBusinessTakeOver.ExitButton.active = false;
      this.SelectBusinessTakeOver.TurnOverExitButton.active = true;
    } else {
      this.SelectBusinessTakeOver.ExitButton.active = true;
      this.SelectBusinessTakeOver.TurnOverExitButton.active = false;
    }

    this.ToggleScreen_BusinessTakeOver(true);
    this.SetBusinessUI_BusinessTakeOver(_playerData, _playerIndex, _buyHalfBusiness);
  },
  ExitScreen__BusinessGenric: function ExitScreen__BusinessGenric() {
    this.Reset__DamageDecision();
    this.Reset_BusinessTakeOver();
    this.ToggleBusinessScreen_DamageDecision();
    this.ToggleScreen_BusinessTakeOver(false);
  },
  ExitScreenAlongTurnOver__BusinessGenric: function ExitScreenAlongTurnOver__BusinessGenric() {
    this.Reset__DamageDecision();
    this.Reset_BusinessTakeOver();
    this.ToggleScreen_BusinessTakeOver(false);
    this.ToggleBusinessScreen_DamageDecision();
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  //#region Select Player whome you have received damaging information and want to give them choice
  ToggleScreen_SelectPlayerDamaging: function ToggleScreen_SelectPlayerDamaging(_state) {
    this.SelectPlayerDamagingScreen.active = _state;
  },
  SetUpSpaceScreen_SelectPlayerDamaging: function SetUpSpaceScreen_SelectPlayerDamaging(_myData, _actorsData, _isTurnOver, _modeIndex) {
    if (_modeIndex === void 0) {
      _modeIndex = 0;
    }

    this.SelectPlayerDamagingSetup.TitleLabel.string = "SELECT PLAYER";
    this.SelectPlayerDamagingSetup.CashLabel.string = "$" + _myData.Cash;
    this.SelectPlayerDamagingSetup.PlayerNameLabel.string = _myData.PlayerName;
    this.SelectPlayerDamagingSetup.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;
    var _mainData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    if (_modeIndex == 2) {
      for (var index = 0; index < _actorsData.length; index++) {
        if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) {
          //check if player is spectate or not, dont add any spectates
          if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
            var node = cc.instantiate(this.SelectPlayerDamagingSetup.DetailsPrefab);
            node.parent = this.SelectPlayerDamagingSetup.ScrollContent;
            node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
            node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);

            for (var k = 0; k < _mainData.length; k++) {
              if (_mainData[k].PlayerUID == _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
                node.getComponent("PlayerDetails").setPlayerIndex(k);
                break;
              }
            }

            selectedPlayerDamaging.push(node);
          }
        }
      }
    } else if (_modeIndex == 1) {
      //for bot
      for (var _index5 = 0; _index5 < _actorsData.length; _index5++) {
        if (_myData.PlayerUID != _actorsData[_index5].PlayerUID) {
          var node = cc.instantiate(this.SelectPlayerDamagingSetup.DetailsPrefab);
          node.parent = this.SelectPlayerDamagingSetup.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[_index5].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[_index5].PlayerUID);
          selectedPlayerDamaging.push(node);
        }
      }
    }

    if (_isTurnOver) {
      this.SelectPlayerDamagingSetup.ExitButton.active = false;
      this.SelectPlayerDamagingSetup.TurnOverExitButton.active = true;
    } else {
      this.SelectPlayerDamagingSetup.ExitButton.active = true;
      this.SelectPlayerDamagingSetup.TurnOverExitButton.active = false;
    }
  },
  ResetSpaceScreen_SelectPlayerDamaging: function ResetSpaceScreen_SelectPlayerDamaging() {
    for (var index = 0; index < selectedPlayerDamaging.length; index++) {
      selectedPlayerDamaging[index].destroy();
    }

    selectedPlayerDamaging = [];
  },
  //#endregion
  //#region Damaging information card decison setup
  ToggleMainScreen_DamageDecision: function ToggleMainScreen_DamageDecision(_state) {
    this.DecisionDamagingSetup.MainScreen.active = _state;
  },
  ToggleDiceResultScreen_DamageDecision: function ToggleDiceResultScreen_DamageDecision(_state) {
    this.DecisionDamagingSetup.DiceResultScreen.active = _state;
  },
  ToggleBusinessScreen_DamageDecision: function ToggleBusinessScreen_DamageDecision(_state) {
    this.DecisionDamagingSetup.BusinessSelectScreen.active = _state;
  },
  SetBusinessUI_DamageDecision: function SetBusinessUI_DamageDecision(_playerData, _OtherPlayerIndex) {
    if (_OtherPlayerIndex === void 0) {
      _OtherPlayerIndex = 0;
    }

    this.Reset__DamageDecision();

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = _playerData;
    console.log(_tempData);
    this.DecisionDamagingSetup.DamageBusinessSelect.TitleLabel.string = "BUSINESS";
    this.DecisionDamagingSetup.DamageBusinessSelect.CashLabel.string = _playerData.Cash;
    this.DecisionDamagingSetup.DamageBusinessSelect.PlayerNameLabel.string = _playerData.PlayerName;
    this.DecisionDamagingSetup.DamageBusinessSelect.BusinessCountLabel.string = "No of Businesses : " + _playerData.NoOfBusiness.length;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.DecisionDamagingSetup.DamageBusinessSelect.BusinessPrefab);
      node.parent = this.DecisionDamagingSetup.DamageBusinessSelect.ScrollContentNode;
      node.getComponent("BusinessDetail").CheckReferences();
      node.getComponent("BusinessDetail").SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent("BusinessDetail").SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent("BusinessDetail").SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent("BusinessDetail").SetBusinessIndex(index);
      node.getComponent("BusinessDetail").SetPlayerObject(_playerData);
      node.getComponent("BusinessDetail").SetPlayerIndex(_OtherPlayerIndex);

      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) {
        node.getComponent("BusinessDetail").SetBusinessMode(1);
        node.getComponent("BusinessDetail").SetMode("Home Based");
      } else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) {
        node.getComponent("BusinessDetail").SetBusinessMode(2);
        node.getComponent("BusinessDetail").SetMode("Brick & Mortar");
      }

      node.getComponent("BusinessDetail").SetBalance(_tempData.NoOfBusiness[index].LoanAmount);
      node.getComponent("BusinessDetail").SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);
      businessDamagingNodes.push(node);
    }
  },
  Reset__DamageDecision: function Reset__DamageDecision() {
    for (var index = 0; index < businessDamagingNodes.length; index++) {
      businessDamagingNodes[index].destroy();
    }

    businessDamagingNodes = [];
  },
  EnableBusinessScreen_DamageDecision: function EnableBusinessScreen_DamageDecision(_isTurnover, _playerData, _playerIndex, _noButton) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    if (_playerData === void 0) {
      _playerData = null;
    }

    if (_playerIndex === void 0) {
      _playerIndex = 0;
    }

    if (_noButton === void 0) {
      _noButton = false;
    }

    if (_noButton == false) {
      if (_isTurnover) {
        this.DecisionDamagingSetup.DamageBusinessSelect.ExitButton.active = false;
        this.DecisionDamagingSetup.DamageBusinessSelect.TurnOverExitButton.active = true;
      } else {
        this.DecisionDamagingSetup.DamageBusinessSelect.ExitButton.active = true;
        this.DecisionDamagingSetup.DamageBusinessSelect.TurnOverExitButton.active = false;
      }
    }

    this.ToggleBusinessScreen_DamageDecision(true);
    this.SetBusinessUI_DamageDecision(_playerData, _playerIndex);
  },
  SetMesageText_DamageDecision: function SetMesageText_DamageDecision(_txt) {
    this.DecisionDamagingSetup.DiceResultLabel.string = _txt;
  },
  EnableDiceResult_DamageDecision: function EnableDiceResult_DamageDecision() {
    this.ToggleDiceResultScreen_DamageDecision(true);

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _diceResult = _manager.RollTwoDices();

    var _fineMultiplier = 3000;
    DamageDecisionResult = _diceResult * _fineMultiplier;

    var _text = "\n" + "Dice Result : " + _diceResult + "\n" + "\n" + "Amount : " + _diceResult + " * " + _fineMultiplier + " = " + DamageDecisionResult;

    this.SetMesageText_DamageDecision(_text);
  },
  SetSenderID_DamageDecision: function SetSenderID_DamageDecision(ID) {
    SenderDamagingID = ID;
  },
  ReceiveEvent_DamageDecision: function ReceiveEvent_DamageDecision(_data) {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
      var _reciverID = _data.ID;
      var _cashReceived = _data.Cash;
      var _isDiceRolled = _data.IsDiceRolled;
      var _isBankrupted = _data.IsBankRupted;
      var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      if (_myActor.PlayerUID == _reciverID) {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(false);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().Exit_SelectPlayerGeneric();

        if (_isDiceRolled) {
          if (!_isBankrupted) {
            _manager.PlayerGameInfo[_manager.GetTurnNumber()].Cash += _cashReceived;
            this.ShowToast("You have received cash of $" + _cashReceived + ", total cash becomes $" + _manager.PlayerGameInfo[_manager.GetTurnNumber()].Cash);

            _manager.completeCardTurn();
          } else if (_isBankrupted) {
            this.ShowToast("other player has been bankrupted, turn will change now.");

            _manager.completeCardTurn();
          }
        } else {
          this.ShowToast("You have been given ownership to one of the business of other player.");

          _manager.completeCardTurn();
        }
      }
    }
  },
  PayAmount_DamageDecision: function PayAmount_DamageDecision() {
    var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
      if (_manager.PlayerGameInfo[index].PlayerUID == _myActor.PlayerUID) {
        if (_manager.PlayerGameInfo[index].Cash >= DamageDecisionResult) {
          _manager.PlayerGameInfo[index].Cash -= DamageDecisionResult;
          this.ToggleDiceResultScreen_DamageDecision(false);
          this.ToggleMainScreen_DamageDecision(false);
          BankRuptedCard = false;
          this.ShowToast("You have successfully paid off amount $" + DamageDecisionResult + " , remaining cash $" + _manager.PlayerGameInfo[index].Cash);
          var _sendingData = {
            ID: SenderDamagingID,
            Cash: DamageDecisionResult,
            IsDiceRolled: true,
            IsBankRupted: false
          };
          GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(25, _sendingData);
        } else {
          BankRuptedCard = true;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
        }

        break;
      }
    }
  },
  SelectBusinessForHalfOwnership_DamagingDecision: function SelectBusinessForHalfOwnership_DamagingDecision(_playerData, _businessIndex, _selectedPlayerIndex) {
    if (_selectedPlayerIndex === void 0) {
      _selectedPlayerIndex = 0;
    }

    this.ExitScreen__BusinessGenric();

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playersData = _manager.PlayerGameInfo;

    var _myDataIndex = _manager.GetMyIndex();

    var _turn = _manager.GetTurnNumber();

    _playersData[_myDataIndex].NoOfBusiness[_businessIndex].IsPartnership = true;
    _playersData[_myDataIndex].NoOfBusiness[_businessIndex].PartnerID = SenderDamagingID;
    _playersData[_myDataIndex].NoOfBusiness[_businessIndex].PartnerName = _playersData[_turn].PlayerName;
    GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", _playersData[_myDataIndex]);
    this.ToggleDiceResultScreen_DamageDecision(false);
    this.ToggleMainScreen_DamageDecision(false);
    this.ShowToast("You have successfully given ownership of one of your business to other player.");
    var _sendingData = {
      ID: SenderDamagingID,
      Cash: DamageDecisionResult,
      IsDiceRolled: false,
      IsBankRupted: false
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(25, _sendingData);
  },
  GivePartnerShip_DamageDecision: function GivePartnerShip_DamageDecision() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playersData = _manager.PlayerGameInfo;

    var _myDataIndex = _manager.GetMyIndex();

    var _businessLength = _playersData[_myDataIndex].NoOfBusiness.length;
    var _businessCounter = 0;

    for (var index = 0; index < _playersData[_myDataIndex].NoOfBusiness.length; index++) {
      if (_playersData[_myDataIndex].NoOfBusiness[index].IsPartnership) {
        _businessCounter++;
      }
    }

    if (_businessCounter >= _businessLength) {
      this.ShowToast("All of your existing businesses are with partnership with someone, you cannot select this option.");
    } else {
      this.EnableBusinessScreen_DamageDecision(false, _playersData[_myDataIndex], _myDataIndex, true);
    }
  },
  //#endregion
  //#region Buy Half business
  ToggleScreen_BuyHalfBusiness: function ToggleScreen_BuyHalfBusiness(_state) {
    this.BuyHalfBusinessUISetup.MainScreen.active = _state;
  },
  SetTitleText_BuyHalfBusiness: function SetTitleText_BuyHalfBusiness(_txt) {
    this.BuyHalfBusinessUISetup.TitleLabel.string = _txt;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkRhbWFnZURlY2lzaW9uUmVzdWx0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiYnVzaW5lc3NEZXRhaWxOb2RlcyIsIlNlbmRlckRhbWFnaW5nSUQiLCJidXNpbmVzc1Rha2VPdmVyTm9kZXMiLCJidXNpbmVzc0RhbWFnaW5nTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwic2VsZWN0UGxheWVyUHJvZml0Tm9kZXMiLCJzZWxlY3RlZFBsYXllclRha2VPdmVyIiwic2VsZWN0ZWRQbGF5ZXJEYW1hZ2luZyIsImJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyIsImJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMiLCJQYXJ0bmVyU2hpcERhdGEiLCJQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQiLCJDYW5jZWxsZWRJRCIsIlN0YXJ0R2FtZUNhc2giLCJTZWxlY3RlZEJ1c2luZXNzUGF5RGF5IiwiSE1BbW91bnQiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwiU2VsZWN0ZWRCdXNpbmVzc0luZGV4IiwiVHVybk92ZXJGb3JJbnZlc3QiLCJCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkiLCJHaXZlbkNhc2hCdXNpbmVzcyIsIlN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIlByZXZpb3VzQ2FzaCIsIlRpbWVvdXRSZWYiLCJDb21wbGV0aW9uV2luZG93VGltZSIsIkxvbmdNZXNzYWdlVGltZSIsIlNob3J0TWVzc2FnZVRpbWUiLCJnbG9iYWxUdXJuVGltZXIiLCJQYXlEYXlJbmZvIiwiSW52ZXN0U2VsbEluZm8iLCJUaW1lclRpbWVvdXQiLCJEb3VibGVEYXlCdXNpbmVzc0hCIiwiRG91YmxlRGF5QnVzaW5lc3NCTSIsIkdpdmVQcm9maXRVc2VySUQiLCJUb3RhbFBheURheSIsIkJhbmtSdXB0ZWRDYXJkIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsIkFkZEJ1dHRvbk5vZGUiLCJBZGRDYXNoU2NyZWVuIiwiQWRkQ2FzaExhYmVsIiwiQWRkQ2FzaEVkaXRCb3giLCJjdG9yIiwiQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwic3RyaW5nIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIk1hcmtldGluZ0VkaXRCb3giLCJHb2xkRWRpdEJveCIsIlN0b2NrRWRpdEJveCIsIkNhc2hBbW91bnRMYWJlbCIsIkV4cGFuZEJ1c2luZXNzTm9kZSIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiUHJlZmFiIiwiVGltZXJUZXh0IiwiQmxvY2tlck5vZGUiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIlBhc3NlZFBheURheUNvdW50TGFiZWwiLCJIb21lQmFzZWRCdG4iLCJCTUJ0biIsIkxvYW5CdG4iLCJNYWluUGFuZWxOb2RlIiwiUmVzdWx0UGFuZWxOb2RlIiwiTG9hblJlc3VsdFBhbmVsTm9kZSIsIlJlc3VsdFNjcmVlblRpdGxlTGFiZWwiLCJUb3RhbEJ1c2luZXNzTGFiZWwiLCJUb3RhbEFtb3VudExhYmVsIiwiU2tpcExvYW5CdXR0b24iLCJMb2FuRm90dGVyTGFiZWwiLCJJbnZlc3RVSSIsIkJ1eU9yU2VsbFVJIiwiT25lUXVlc3Rpb25VSSIsIlBsYXllckRldGFpbExhYmVsIiwiRGV0YWlsc1ByZWZhYiIsIlNjcm9sbENvbnRlbnQiLCJXYWl0aW5nU2NyZWVuIiwiV2FpdGluZ1NjcmVlbkxhYmVsIiwiRGVjaXNpb25UaXRsZUxhYmVsIiwiRGVjaXNpb25DYXNoTGFiZWwiLCJEZWNpc2lvblBsYXllck5hbWVMYWJlbCIsIkRlY2lzaW9uUXVlc3Rpb25MYWJlbCIsIlBhcnRuZXJzaGlwVUkiLCJXYWl0aW5nU3RhdHVzU2NyZWVuIiwiTWFpblNjcmVlbiIsIlRpdGxlTmFtZSIsIlBsYXllck5hbWUiLCJQbGF5ZXJDYXNoIiwiUGFydG5lclNoaXBQcmVmYWIiLCJEZWNpc2lvblNjcmVlbiIsIkRlY2lzaW9uUGxheWVyTmFtZSIsIkRlY2lzaW9uUGxheWVyQ2FzaCIsIkRlY2lzaW9uRGVzY3JpcHRpb24iLCJSZXN1bHRVSSIsIlJlc3VsdFNjcmVlbiIsIlN0YXR1c0xhYmVsIiwiQm9keUxhYmVsIiwiQnVzaW5lc3NQYXlEYXlTZXR1cFVJIiwiVGl0bGVDb250ZW50TGFiZWwiLCJCdXNpbmVzc1ByZWZhYiIsIlNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUkiLCJTZWxlY3RQbGF5ZXJHZW5lcmljIiwiU2VsZWN0QnVzaW5lc3NHZW5lcmljIiwiRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXAiLCJEaWNlUmVzdWx0U2NyZWVuIiwiQnVzaW5lc3NTZWxlY3RTY3JlZW4iLCJEYW1hZ2VCdXNpbmVzc1NlbGVjdCIsIkJ1eUhhbGZCdXNpbmVzc1NldHVwVUkiLCJQbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllckJ1c2luZXNzRGF0YUludGFuY2UiLCJSZXF1aXJlZENhc2giLCJJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCIsIlRlbXBNYXJrZXRpbmdBbW91bnQiLCJUZW1wSGlyaW5nTGF3eWVyIiwiR29sZENhc2hBbW91bnQiLCJFbnRlckJ1eVNlbGxBbW91bnQiLCJTdG9ja0J1c2luZXNzTmFtZSIsIkRpY2VSZXN1bHQiLCJPbmNlT3JTaGFyZSIsIkxvY2F0aW9uTmFtZSIsIkhCRGljZUNvdW50ZXIiLCJCTURpY2VDb3VudGVyIiwiTmV4dEhhbGZQYXlEYXkiLCJIb21lQmFzZWRQYXltZW50Q29tcGxldGVkIiwiQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkIiwiTG9hblBheWVkIiwiVG90YWxQYXlEYXlBbW91bnQiLCJEb3VibGVQYXlEYXkiLCJHYW1lcGxheVVJTWFuYWdlciIsIkNvbXBvbmVudCIsIkJ1c2luZXNzU2V0dXBEYXRhIiwiSW52ZXN0U2VsbFNldHVwVUkiLCJQYXlEYXlTZXR1cFVJIiwiU2VsbEJ1c2luZXNzU2V0dXBVSSIsIkludmVzdFNldHVwVUkiLCJCdXlPclNlbGxTZXR1cFVJIiwiT25lUXVlc3Rpb25TZXR1cFVJIiwiUGFydG5lcnNoaXBTZXR1cFVJIiwiUmVzdWx0U2V0dXBVSSIsIkJ1c2luZXNzUGF5RGF5VUlTZXR1cCIsIlNlbGVjdFBsYXllckZvclByb2ZpdFVJIiwiU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cCIsIlNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXAiLCJEZWNpc2lvbkRhbWFnaW5nU2V0dXAiLCJTZWxlY3RCdXNpbmVzc1Rha2VPdmVyIiwiQnV5SGFsZkJ1c2luZXNzVUlTZXR1cCIsIlBvcFVwVUkiLCJQb3BVcFVJTGFiZWwiLCJQb3BVcFVJQnV0dG9uIiwiR2FtZXBsYXlVSVNjcmVlbiIsIkludmVzdFNlbGxTY3JlZW4iLCJQYXlEYXlTY3JlZW4iLCJTZWxsQnVzaW5lc3NTY3JlZW4iLCJJbnZlc3RTY3JlZW4iLCJCdXlPclNlbGxTY3JlZW4iLCJCdXNpbmVzc0RvdWJsZVBheVNjcmVlbiIsIk9uZVF1ZXN0aW9uU3BhY2VTY3JlZW4iLCJPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0U2NyZWVuIiwiU2VsZWN0UGxheWVyVGFrZU92ZXJTY3JlZW4iLCJTZWxlY3RQbGF5ZXJEYW1hZ2luZ1NjcmVlbiIsIlNlbGVjdEJ1c2luZXNzVGFrZU92ZXJTY3JlZW4iLCJJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIiwiVGVtcERpY2VUZXh0IiwiTGVhdmVSb29tQnV0dG9uIiwiQXZhdGFyU3ByaXRlcyIsIlNwcml0ZUZyYW1lIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRUdXJuVmFyaWFibGUiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3luY0RhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJvbkxvYWQiLCJJc0JvdFR1cm4iLCJQYXlEYXlDb3VudCIsIkRvdWJsZVBheURheUNvdW50IiwiSXNCYW5rcnVwdGVkIiwiQmFua3J1cHRlZEFtb3VudCIsIkFkZENhc2hBbW91bnQiLCJUaW1lciIsIlRpbWVyU3RhcnRlZCIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiX3N0YXRlIiwiYWN0aXZlIiwiRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSIsIkluc3RhbmNlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiRGlzY29ubmVjdFBob3RvbiIsInNldFRpbWVvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJUb2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAiLCJFbmFibGVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiT25DYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfdmFsIiwiT25DbGlja0RvbmVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfZ2FtZWNhc2giLCJwYXJzZUludCIsIl9hbW91bnQiLCJ1bmRlZmluZWQiLCJDYXNoIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwiVXBkYXRlVXNlckRhdGEiLCJTaG93VG9hc3QiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJpc0ZpcnN0VGltZSIsImluc2lkZUdhbWUiLCJtb2RlSW5kZXgiLCJfaXNCYW5rcnVwdGVkIiwiX0JhbmtydXB0QW1vdW50IiwiX2lzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfR2l2ZW5DYXNoIiwiX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIkluaXRfQnVzaW5lc3NTZXR1cCIsIlBsYXllckRhdGEiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIkJ1c2luZXNzSW5mbyIsIkJ1c2luZXNzVHlwZSIsIkVudW1CdXNpbmVzc1R5cGUiLCJSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsImxlbmd0aCIsInVzZXJJRCIsIlBsYXllclVJRCIsIk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAiLCJBdmF0YXJJRCIsImF2YXRhcklkIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJpc05hTiIsIk9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uIiwiT25CdXNpbmVzc05hbWVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NOYW1lIiwiY2hpbGRyZW4iLCJPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJIb21lQmFzZWQiLCJPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsImJyaWNrQW5kbW9ydGFyIiwiYW1vdW50IiwiQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiTm9PZkJ1c2luZXNzIiwiTG9hblRha2VuIiwiTWF0aCIsImFicyIsImdldENvbXBvbmVudCIsIk9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsImV2ZW50IiwiT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCIsImkiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXAiLCJPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIlB1c2hEYXRhRm9yUGxheWVyTGVmdCIsIl9kYXRhIiwiX21vZGUiLCJHZXRTZWxlY3RlZE1vZGUiLCJfcGxheWVyRGF0YUludGFuY2UiLCJQbGF5ZXJJRCIsIkhvbWVCYXNlZEFtb3VudCIsIklzQWN0aXZlIiwiX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UiLCJwdXNoIiwiUmFpc2VFdmVudCIsIl9JRCIsIl9wbGF5ZXJMZWZ0IiwiX2lzU3BlY3RhdGUiLCJQaG90b25BY3RvciIsImdldEN1c3RvbVByb3BlcnR5IiwiTWF4UGxheWVycyIsIkdldFJlYWxBY3RvcnMiLCJhY3Rvck5yIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJTdGFydFR1cm4iLCJQdXJjaGFzZUJ1c2luZXNzIiwiX2J1c2luZXNzTmFtZSIsIl9pc0hvbWVCYXNlZCIsIlN0YXJ0R2FtZSIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiRXhpdF9CdXNpbmVzc1NldHVwIiwiY29tcGxldGVDYXJkVHVybiIsIkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwIiwiSXNCYW5rcnVwdCIsIkJhbmtydXB0QW1vdW50IiwiR2V0VHVybk51bWJlciIsIkRhdGEiLCJiYW5rcnVwdGVkIiwidHVybiIsIlBsYXllckRhdGFNYWluIiwiU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCIsImVycm9yIiwiU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJQYXlBbW91bnRUb1BsYXlHYW1lIiwiSXNCb3QiLCJpc2FjdGl2ZSIsIl9hY3RpdmUiLCJjbGVhclRpbWVvdXQiLCJVcGRhdGVUaW1lciIsIlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIkNoZWNrTWFya2V0aW5nQW1vdW50U2hhcmVfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfbWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkhhc01hcmtldGluZ0NvbXBhbnkiLCJSYWlzZUV2ZW50Rm9yTWFya2V0aW5nU2hhcmUiLCJfYW1udCIsIl9pZCIsIl9tc2ciLCJJRCIsIm1zZyIsIk9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uIiwibWFya2V0aW5nQW1vdW50IiwiTWFya2V0aW5nQW1vdW50IiwiT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIkxhd3llclN0YXR1cyIsIm9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJnZW5lcmF0ZWRMZW5ndGgiLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCIsIlJvbGxUd29EaWNlcyIsIkFzc2lnbkRhdGFfSW52ZXN0U2VsbCIsIk9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJfaXNUdXJuT3ZlciIsIlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCIsIlJvbGxPbmVEaWNlIiwiT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR29sZENvdW50IiwiT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlN0b2NrQ291bnQiLCJPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJFbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwIiwiT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiUm9sbERpY2UiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJ2YWx1ZSIsIlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAiLCJfdGVtcERhdGEiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXROYW1lIiwiU2V0VHlwZSIsIlNldEJ1c2luZXNzSW5kZXgiLCJfdG90YWxMb2NhdGlvbnMiLCJMb2NhdGlvbnNOYW1lIiwiU2V0QnVzaW5lc3NNb2RlIiwiU2V0TW9kZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJfYWxsTG9jYXRpb25zQW1vdW50IiwiX2ZpbmFsQW1vdW50IiwiU2V0QmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIklzUGFydG5lcnNoaXAiLCJUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbiIsIlNldFBhcnRuZXJOYW1lIiwiUGFydG5lck5hbWUiLCJFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJFeGl0X1BhcnRuZXJTaGlwU2V0dXAiLCJkZXN0cm95IiwiUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAiLCJfYWN0b3IiLCJfdHVybiIsIlR1cm4iLCJfcGxheWVyRGF0YSIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJTZWxlY3RlZEJ1c2luc2Vzc0luZGV4IiwiX2J1c2luZXNzVmFsdWUiLCJCdXNWYWx1ZSIsIl9wYXlBbW91bnQiLCJfYnVzaW5lc3NNb2RlIiwiQ2hlY2tTcGVjdGF0ZSIsIkFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWxsQWN0b3JzIiwiUm9vbUFjdG9ycyIsIm15SW5kZXgiLCJHZXRNeUluZGV4IiwiUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJDYW5jZWxPZmZlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2lzQWNjZXB0ZWQiLCJfcGF5bWVudCIsIl9pc0NhbmNlbGxlZCIsIl91SUQiLCJfbWFpbkRhdGEiLCJBY2NlcHRlZCIsIkNhc2hQYXltZW50IiwiQ2FuY2VsbGVkIiwiQnVzaW5lc3NJbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWNjZXB0ZWQiLCJfY2FzaCIsIl9jYW5jZWxsZWQiLCJfdWlkIiwiUGFydG5lcklEIiwiaW5jbHVkZXMiLCJSZXNldEdvbGRJbnB1dCIsIm9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsIiwiVXBkYXRlRGF0YV9JbnZlc3RTZWxsIiwiX3RpdGxlIiwiX2RpY2VSZXN1bHQiLCJfcHJpY2VUaXRsZSIsIl9wcmljZVZhbHVlIiwiX2J1eU9yU2VsbFRpdGxlIiwiX3RvdGFsQW1vdW50VGl0bGUiLCJfdG90YWxBbW91bnRWYWx1ZSIsIl9idXR0b25OYW1lIiwiQXBwbHlCdXR0b25fSW52ZXN0U2VsbCIsIl9Ub3RhbEFtb3VudCIsIlJhaXNlRXZlbnRUb1N5bmNJbmZvIiwiRXhpdEJ1dHRvbl9JbnZlc3RTZWxsIiwiVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSIsIlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSIsIlVwZGF0ZUJ1dHRvbnNfUGF5RGF5IiwibG9hblRha2VuIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwiR2V0TG9hbkFtb3VudF9QYXlEYXkiLCJfbG9hbiIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiX2lzRG91YmxlUGF5RGF5IiwiX3NraXBITSIsIl9za2lwQk0iLCJfaXNCb3QiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9oTUFtb3VudCIsIl9ibUFtb3VudCIsIl9ibUxvY2F0aW9uIiwiUGF5ZGF5Q291bnRlciIsIkRvdWJsZVBheUNvdW50ZXIiLCJfaGFsZlBheWRheSIsIkNhbkdpdmVQcm9maXRPblBheURheSIsIlVzZXJJREZvclByb2ZpdFBheURheSIsIlJlY2VpdmVEb3VibGVQYXlEYXkiLCJfcmVzIiwiX3RpbWUiLCJVcGRhdGVDYXNoX1BheURheSIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGF5RGF5Q29tcGxldGVkIiwiT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RvdWJsZVBheURheSIsIl9kaWNlIiwiX2Ftb3VudFRvQmVTZW5kIiwiX2Ftb3VudFRvQmVBZGp1c3RlZCIsIl9tdWx0aXBsaWVyIiwiX3BheWRheW11bHRpcGxpZXIiLCJkb3VibGVQYXlEYXlBZGRlZCIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfbG9jYXRpb25zIiwiX0VzdGltYXRlTG9hbiIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlByb2Nlc3NCYW5rcnVwdCIsIl9zaG93VGV4dCIsIl90eHQiLCJFeGl0X1NlbGVjdFBsYXllckdlbmVyaWMiLCJFeGl0U2NyZWVuX19CdXNpbmVzc0dlbnJpYyIsIlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24iLCJUb2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uIiwiVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyIsImVtaXQiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU3RhcnROZXdHYW1lX1BheURheSIsIm1vZGUiLCJfc2VuZGluZ0RhdGEiLCJJc0RpY2VSb2xsZWQiLCJJc0JhbmtSdXB0ZWQiLCJfbXlBY3RvciIsInBsYXllckRhdGEiLCJCYW5rcnVwdGVkTmV4dFR1cm4iLCJTdGFydE5ld0dhbWVfQmFua1J1cHRlZCIsIlNob3dJbmZvIiwiaW5mbyIsIlJhaXNlRXZlbnRGb3JDb21wbGV0aW9uIiwiVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4iLCJOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyIiwiVG9nZ2xlSGFsZlBheU5leHRUdXJuIiwiY2FsbFVwb25DYXJkIiwiVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJfc2VsbEFtb3VudCIsIlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRTZWxsaW5nQW1vdW50IiwiVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uIiwiU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJBbW91bnQiLCJTZWxlY3RCdXNpbmVzc2ZvclBheURheSIsIl9pc1R1cm5vdmVyIiwiRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJIiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSIsIlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2hvd1F1ZXN0aW9uVG9hc3QiLCJTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9teURhdGEiLCJfYWN0b3JzRGF0YSIsIl9tb2RlSW5kZXgiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJzZXRQbGF5ZXJOYW1lIiwic2V0UGxheWVyVUlEIiwiUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0X09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIkVkaXRUaXRsZV9CdXNpbmVzc1BheURheVVJU2V0dXAiLCJfbWFpblRpdGxlIiwiX3RpbGVDb250ZW50IiwiRXhpdFNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAiLCJDbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIkV4aXRTY3JlZW5fQWxvbmdUdXJuT3Zlcl9CdXNpbmVzc1BheURheVVJU2V0dXAiLCJQcm9jZXNzQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiX2J1c2luZXNzVHlwZSIsIkVuYWJsZVNlbGV0aXZlRG91YmxlUGF5RGF5X0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIl9pc0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJFeGl0X1NlbGVjdFBsYXllckZvclByb2ZpdCIsIkV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlciIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIiLCJfYnV5SGFsZkJ1c2luZXNzIiwic2V0QnV5SGFsZiIsImsiLCJzZXRQbGF5ZXJJbmRleCIsIlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nIiwiVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nIiwiRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyR2VuZXJpYyIsIlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1Rha2VPdmVyIiwiU2V0QnVzaW5lc3NVSV9CdXNpbmVzc1Rha2VPdmVyIiwiX090aGVyUGxheWVySW5kZXgiLCJSZXNldF9CdXNpbmVzc1Rha2VPdmVyIiwiU2V0UGxheWVyT2JqZWN0IiwiU2V0UGxheWVySW5kZXgiLCJzZXRIYWxmQnVzaW5lc3MiLCJFbmFibGVTY3JlZW5fX0J1c2luZXNzVGFrZU92ZXIiLCJSZXNldF9fRGFtYWdlRGVjaXNpb24iLCJUb2dnbGVCdXNpbmVzc1NjcmVlbl9EYW1hZ2VEZWNpc2lvbiIsIkV4aXRTY3JlZW5BbG9uZ1R1cm5PdmVyX19CdXNpbmVzc0dlbnJpYyIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmciLCJTZXRCdXNpbmVzc1VJX0RhbWFnZURlY2lzaW9uIiwiRW5hYmxlQnVzaW5lc3NTY3JlZW5fRGFtYWdlRGVjaXNpb24iLCJfbm9CdXR0b24iLCJTZXRNZXNhZ2VUZXh0X0RhbWFnZURlY2lzaW9uIiwiRW5hYmxlRGljZVJlc3VsdF9EYW1hZ2VEZWNpc2lvbiIsIl9maW5lTXVsdGlwbGllciIsIl90ZXh0IiwiU2V0U2VuZGVySURfRGFtYWdlRGVjaXNpb24iLCJSZWNlaXZlRXZlbnRfRGFtYWdlRGVjaXNpb24iLCJfcmVjaXZlcklEIiwiX2Nhc2hSZWNlaXZlZCIsIl9pc0RpY2VSb2xsZWQiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJQYXlBbW91bnRfRGFtYWdlRGVjaXNpb24iLCJTZWxlY3RCdXNpbmVzc0ZvckhhbGZPd25lcnNoaXBfRGFtYWdpbmdEZWNpc2lvbiIsIl9zZWxlY3RlZFBsYXllckluZGV4IiwiX3BsYXllcnNEYXRhIiwiX215RGF0YUluZGV4IiwiR2l2ZVBhcnRuZXJTaGlwX0RhbWFnZURlY2lzaW9uIiwiX2J1c2luZXNzTGVuZ3RoIiwiX2J1c2luZXNzQ291bnRlciIsIlNldFRpdGxlVGV4dF9CdXlIYWxmQnVzaW5lc3MiLCJtZXNzYWdlIiwidGltZSIsIl9oYXNidXR0b24iLCJTZWxmVG9hc3QiLCJDb21wbGV0ZVRvYXN0IiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9zdGF0dXMiLCJSZXN0YXJ0VGhlR2FtZSIsIlJlc3RhcnRHYW1lIiwiX2RhdGFJbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLG9CQUFvQixHQUFHLENBQTNCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxFQUExQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBQ0EsSUFBSUMscUJBQXFCLEdBQUcsRUFBNUI7QUFDQSxJQUFJQyxxQkFBcUIsR0FBRyxFQUE1QjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBQ0EsSUFBSUMsdUJBQXVCLEdBQUcsRUFBOUI7QUFDQSxJQUFJQyxzQkFBc0IsR0FBRyxFQUE3QjtBQUNBLElBQUlDLHNCQUFzQixHQUFHLEVBQTdCO0FBQ0EsSUFBSUMsOEJBQThCLEdBQUcsRUFBckM7QUFDQSxJQUFJQyx5QkFBeUIsR0FBRyxFQUFoQztBQUNBLElBQUlDLGVBQWUsR0FBRyxJQUF0QjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLEtBQS9CO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEtBQXBCO0FBQ0EsSUFBSUMsc0JBQXNCLEdBQUcsS0FBN0I7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLElBQUlDLFFBQVEsR0FBRyxDQUFmO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsSUFBSUMscUJBQXFCLEdBQUcsQ0FBNUI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxLQUF4QjtBQUNBLElBQUlDLDhCQUE4QixHQUFHLEtBQXJDO0FBQ0EsSUFBSUMsaUJBQWlC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MEUsRUFBMUUsRUFBOEVULEtBQTlFO0FBQ0Q7QUFDRjtBQUNGO0FBeC9GOEIsQ0FBVCxDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIERhbWFnZURlY2lzaW9uUmVzdWx0ID0gMDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbnZhciBTZW5kZXJEYW1hZ2luZ0lEID0gXCJcIjtcclxudmFyIGJ1c2luZXNzVGFrZU92ZXJOb2RlcyA9IFtdO1xyXG52YXIgYnVzaW5lc3NEYW1hZ2luZ05vZGVzID0gW107XHJcbnZhciBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbnZhciBzZWxlY3RQbGF5ZXJQcm9maXROb2RlcyA9IFtdO1xyXG52YXIgc2VsZWN0ZWRQbGF5ZXJUYWtlT3ZlciA9IFtdO1xyXG52YXIgc2VsZWN0ZWRQbGF5ZXJEYW1hZ2luZyA9IFtdO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbnZhciBidXNpbmVzc0RldGFpbFBheURheU5vZGVzID0gW107XHJcbnZhciBQYXJ0bmVyU2hpcERhdGEgPSBudWxsO1xyXG52YXIgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBDYW5jZWxsZWRJRCA9IFtdO1xyXG52YXIgU3RhcnRHYW1lQ2FzaCA9IDIwMDAwO1xyXG52YXIgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IGZhbHNlO1xyXG52YXIgSE1BbW91bnQgPSAwO1xyXG52YXIgQk1BbW91bnQgPSAwO1xyXG52YXIgQk1Mb2NhdGlvbnMgPSAwO1xyXG52YXIgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMDtcclxudmFyIFR1cm5PdmVyRm9ySW52ZXN0ID0gZmFsc2U7XHJcbnZhciBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxudmFyIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxudmFyIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG52YXIgUHJldmlvdXNDYXNoID0gMDtcclxudmFyIFRpbWVvdXRSZWY7XHJcbnZhciBDb21wbGV0aW9uV2luZG93VGltZSA9IDgwMDA7XHJcbnZhciBMb25nTWVzc2FnZVRpbWUgPSA1MDAwO1xyXG52YXIgU2hvcnRNZXNzYWdlVGltZSA9IDI1MDA7XHJcbnZhciBnbG9iYWxUdXJuVGltZXIgPSAzMDtcclxudmFyIFBheURheUluZm8gPSBcIlwiO1xyXG52YXIgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG52YXIgVGltZXJUaW1lb3V0O1xyXG52YXIgRG91YmxlRGF5QnVzaW5lc3NIQiA9IDA7XHJcbnZhciBEb3VibGVEYXlCdXNpbmVzc0JNID0gMDtcclxudmFyIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG52YXIgVG90YWxQYXlEYXkgPSAwO1xyXG52YXIgQmFua1J1cHRlZENhcmQgPSBmYWxzZTtcclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG4vLyB2YXIgU2hvcnRNZXNzYWdlVGltZSA9IDUwOy8vMjUwMFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgYW1vdW50IG9mIGxvYW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIExvYW5BbW91bnRFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBUZW5UaG91c2FuZDogMTAwMDAsXHJcbiAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gIEZvcnR5VGhvdXNhbmQ6IDQwMDAwLFxyXG4gIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gIE90aGVyOiA2LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBjYXNoXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgYnVzaW5lc3MgdHlwZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhck5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIixcclxuICAgIH0sXHJcbiAgICBUaW1lck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHRpbWVyIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5TZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IExvYW5BbW91bnRFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgYWxsIGxhYmVscyBvZiBhbW91bnRzIGluIGxvYW4gVUlcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkIENhc2ggYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaFNjcmVlbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaCBsYWJlbCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZENhc2ggZWRpdEJveCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHVybkRlY2lzaW9uU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlR1cm5EZWNpc2lvblNldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFya2V0aW5nRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgbWFya2V0aW5nIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBHb2xkRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBnb2xkIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTdG9ja0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IHN0b2NrIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byBjYXNoIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4cG5hZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyVGV4dDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclRleHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGxhYmVsIG9mIHRpbWVyIHRleHQgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgICBCbG9ja2VyTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCbG9ja2VyTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBub2RlIG9mIGJsb2NrZXIgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdG9ja0ludmVzdDogMSxcclxuICBHb2xkSW52ZXN0OiAyLFxyXG4gIFN0b2NrU2VsbDogMyxcclxuICBHb2xkU2VsbDogNCxcclxuICBPdGhlcjogNSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RTZWxsVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZSBSZXN1bHQgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIHZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1eU9yU2VsbFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXlPclNlbGwgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXR0b25OYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV0dG9uTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgYnV0dG9uIG5hbWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFN0YXRlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkludmVzdFN0YXRlXCIsXHJcbiAgICAgIHR5cGU6IEludmVzdEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IEludmVzdEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEFtb3VudEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50RWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsbEJ1c2luZXNzVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2VsbFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGF5RGF5VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWROdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxvY2F0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhc3NlZFBheURheUNvdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFBhc3NlZFBheURheUNvdW50TGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTUJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhckJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIE1haW5QYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBNYWluUGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0UGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5SZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuUmVzdWx0UGFuZWxOb2RlIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTY3JlZW5UaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFNjcmVlblRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRTY3JlZW5UaXRsZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2VSZXN1bHQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQnVzaW5lc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEJ1c2luZXNzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNraXBMb2FuQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBMb2FuQnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNraXBMb2FuQnV0dG9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuRm90dGVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkZvdHRlckxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuRm90dGVyTGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlPclNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgT25lUXVlc3Rpb25VSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgT25lUXVlc3Rpb25VSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk9uZVF1ZXN0aW9uVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJEZXRhaWxMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJEZXRhaWxMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERldGFpbHNQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGV0YWlsc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBEZXRhaWxzUHJlZmFiIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIFNjcm9sbENvbnRlbnQgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBub2RlIFdhaXRpbmdTY3JlZW4gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW5MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU2NyZWVuTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbkxhYmVsIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIHF1ZXN0aW9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUmVzdWx0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJlc3VsdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUmVzdWx0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBSZXN1bHRTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0U2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RhdHVzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQm9keUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJvZHlMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzUGF5RGF5U2V0dXBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NQYXlEYXlTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NQYXlEYXlTZXR1cFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlQ29udGVudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlQ29udGVudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckRldGFpbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckRldGFpbExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIERldGFpbHNQcmVmYWIgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgU2Nyb2xsQ29udGVudCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsZWN0UGxheWVyR2VuZXJpYy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsZWN0UGxheWVyR2VuZXJpYyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNlbGVjdFBsYXllckdlbmVyaWNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckRldGFpbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckRldGFpbExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsZWN0QnVzaW5lc3NHZW5lcmljLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZWxlY3RCdXNpbmVzc0dlbmVyaWMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxlY3RCdXNpbmVzc0dlbmVyaWNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERhbWFnaW5nSW5mb3JtYXRpb25EZWNpc2lvblNldHVwID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXBcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYWluU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZWxlY3RTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NTZWxlY3RTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEYW1hZ2VCdXNpbmVzc1NlbGVjdDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0QnVzaW5lc3NHZW5lcmljLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eUhhbGZCdXNpbmVzc1NldHVwVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1eUhhbGZCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlIYWxmQnVzaW5lc3NTZXR1cFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBHYW1lcGxheVVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YUludGFuY2U7XHJcbnZhciBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlO1xyXG52YXIgUmVxdWlyZWRDYXNoO1xyXG52YXIgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuLy90dXJuIGRlY2lzaW9uc1xyXG52YXIgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbnZhciBUZW1wSGlyaW5nTGF3eWVyO1xyXG5cclxuLy9idXlvcnNlbGxcclxudmFyIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxudmFyIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbnZhciBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbnZhciBEaWNlUmVzdWx0O1xyXG52YXIgT25jZU9yU2hhcmU7XHJcbnZhciBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG5cclxudmFyIEhCRGljZUNvdW50ZXIgPSAwO1xyXG52YXIgQk1EaWNlQ291bnRlciA9IDA7XHJcbnZhciBOZXh0SGFsZlBheURheSA9IGZhbHNlO1xyXG5cclxudmFyIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgTG9hblBheWVkID0gZmFsc2U7XHJcbnZhciBUb3RhbFBheURheUFtb3VudCA9IDA7XHJcbnZhciBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuXHJcbnZhciBHYW1lcGxheVVJTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVwbGF5VUlNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEJ1c2luZXNzU2V0dXBEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEJ1c2luZXNzU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXNpbmVzc1NldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBUdXJuRGVjaXNpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFR1cm5EZWNpc2lvblNldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgVHVybkRlY2lzaW9uU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEludmVzdFNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFBheURheVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGxCdXNpbmVzc1NldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGxCdXNpbmVzc1VJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGxCdXNpbmVzc1VJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogSW52ZXN0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBCdXlPclNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXlPclNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogT25lUXVlc3Rpb25VSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBPbmVRdWVzdGlvblVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lcnNoaXBTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBQYXJ0bmVyc2hpcFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFBhcnRuZXJzaGlwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBSZXN1bHRVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBSZXN1bHRVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzUGF5RGF5VUlTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQnVzaW5lc3NQYXlEYXlTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1c2luZXNzUGF5RGF5U2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdFBsYXllckZvclByb2ZpdFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcblxyXG4gICAgU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0UGxheWVyR2VuZXJpYyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxlY3RQbGF5ZXJHZW5lcmljIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXA6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGVjdFBsYXllckdlbmVyaWMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsZWN0UGxheWVyR2VuZXJpYyBjbGFzc1wiLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvbkRhbWFnaW5nU2V0dXA6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IERhbWFnaW5nSW5mb3JtYXRpb25EZWNpc2lvblNldHVwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIERhbWFnaW5nSW5mb3JtYXRpb25EZWNpc2lvblNldHVwIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGVjdEJ1c2luZXNzVGFrZU92ZXI6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGVjdEJ1c2luZXNzR2VuZXJpYyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxlY3RCdXNpbmVzc0dlbmVyaWMgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBCdXlIYWxmQnVzaW5lc3NVSVNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBCdXlIYWxmQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1eUhhbGZCdXNpbmVzc1NldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlCdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NEb3VibGVQYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXNpbmVzc0RvdWJsZVBheSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNwYWNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25TcGFjZSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25EZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxlY3RQbGF5ZXJGb3JQcm9maXQgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0UGxheWVyVGFrZU92ZXJTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxlY3RQbGF5ZXJUYWtlT3ZlciBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RQbGF5ZXJEYW1hZ2luZ1NjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGVjdFBsYXllckRhbWFnaW5nIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdEJ1c2luZXNzVGFrZU92ZXJTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxlY3RCdXNpbmVzc1Rha2VPdmVyIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFRlbXBEaWNlVGV4dDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgZGljZVwiLFxyXG4gICAgfSxcclxuICAgIExlYXZlUm9vbUJ1dHRvbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQXZhdGFyU3ByaXRlczoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZXNldHMgdGhpcyBjbGFzcyBnbG9iYWwgdmFyaWFibGVzIGFuZCBvdGhlciBuZWNlc3NhcnkgZGF0YSBvbkxvYWRcclxuICAgKiovXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NIQiA9IDA7XHJcbiAgICBEb3VibGVEYXlCdXNpbmVzc0JNID0gMDtcclxuICAgIE5leHRIYWxmUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBHYW1lTWFuYWdlciA9IG51bGw7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG4gICAgYnVzaW5lc3NUYWtlT3Zlck5vZGVzID0gW107XHJcbiAgICBidXNpbmVzc0RhbWFnaW5nTm9kZXMgPSBbXTtcclxuICAgIERhbWFnZURlY2lzaW9uUmVzdWx0ID0gMDtcclxuICAgIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxuICAgIFNlbmRlckRhbWFnaW5nSUQgPSBcIlwiO1xyXG4gICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMgPSBbXTtcclxuICAgIHNlbGVjdGVkUGxheWVyVGFrZU92ZXIgPSBbXTtcclxuICAgIHNlbGVjdGVkUGxheWVyRGFtYWdpbmcgPSBbXTtcclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgQ2FuY2VsbGVkSUQgPSBbXTtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxuICAgIEhNQW1vdW50ID0gMDtcclxuICAgIEJNQW1vdW50ID0gMDtcclxuICAgIEJNTG9jYXRpb25zID0gMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbiAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgIFByZXZpb3VzQ2FzaCA9IDA7XHJcbiAgICBUaW1lb3V0UmVmID0gbnVsbDtcclxuICAgIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG4gICAgQmFua1J1cHRlZENhcmQgPSBmYWxzZTtcclxuICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbiAgICAvL3R1cm4gZGVjaXNpb25zXHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4gICAgLy9idXlvcnNlbGxcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgICBEaWNlUmVzdWx0ID0gMDtcclxuICAgIE9uY2VPclNoYXJlO1xyXG4gICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbiAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBUb3RhbFBheURheSA9IDA7XHJcbiAgICBIQkRpY2VDb3VudGVyID0gMDtcclxuICAgIEJNRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgUGF5RGF5SW5mbyA9IFwiXCI7XHJcbiAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZXNldHMgdHVybiB2YXJpYWJsZXMgZm9yIGdvbGRpbnZlc3QvZ29sZHNvbGQvc3Rva2NpbnZlc3Qvc3RvY2tzb2xkXHJcbiAgICoqL1xyXG4gIFJlc2V0VHVyblZhcmlhYmxlKCkge1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZXMgb2YgY2xhc3MvZXMgbmVlZGVkLlxyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAoIUdhbWVNYW5hZ2VyIHx8IEdhbWVNYW5hZ2VyID09IG51bGwpIEdhbWVNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gdGhpcyBub2RlIGdldHMgYWN0aXZlXHJcbiAgICoqL1xyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gdGhpcyBub2RlIGdldHMgZGVhY3RpdmVcclxuICAgKiovXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIHRoZSBjbGFzcyBpcyBsb2FkZWRcclxuICAgKiovXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcblxyXG4gICAgLy9kZWNsYXJpbmcgbG9jYWwgdmFyaWFibGVzXHJcbiAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Hb2xkU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja0ludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBmYWxzZTtcclxuICAgIHRoaXMuUGF5RGF5Q291bnQgPSAwO1xyXG4gICAgdGhpcy5Eb3VibGVQYXlEYXlDb3VudCA9IDA7XHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gMDtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgIHRoaXMuVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICBUaW1lclRpbWVvdXQgPSBudWxsO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoZmFsc2UpO1xyXG4gIH0sXHJcbiAgLy8jcmVnaW9uIFNwZWN0YXRlIFVJIFNldHVwXHJcbiAgSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAvLyBjb25zb2xlLnRyYWNlKFwiY2xvc2VkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRcIik7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5MZWF2ZVJvb21CdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIE9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbCh0cnVlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSwgNTAwKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnVzaW5lc3NTZXR1cCB3aXRoIGxvYW5cclxuICAvL0J1c2luZXNzIHNldHVwIHVpLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChfc3RhdGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgdGhpcy5Ub2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaDtcclxuICB9LFxyXG5cclxuICBPbkNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKF92YWwpIHtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgT25DbGlja0RvbmVDYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwKGZhbHNlKTtcclxuICAgIHZhciBfZ2FtZWNhc2ggPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCk7XHJcbiAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KHRoaXMuQWRkQ2FzaEFtb3VudCk7XHJcbiAgICBpZiAodGhpcy5BZGRDYXNoQW1vdW50ICE9IG51bGwgJiYgdGhpcy5BZGRDYXNoQW1vdW50ICE9IFwiXCIgJiYgdGhpcy5BZGRDYXNoQW1vdW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAoX2Ftb3VudCA8PSBfZ2FtZWNhc2gpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaC50b1N0cmluZygpO1xyXG4gICAgICAgIF9nYW1lY2FzaCAtPSBfYW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX2dhbWVjYXNoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVXBkYXRlVXNlckRhdGEoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gsIC0xLCAtMSk7XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiQ2FzaCAkXCIgKyB0aGlzLkFkZENhc2hBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZC5cIik7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG8gbm90IGhhdmUgZW5vdWdoIGluIGdhbWUgY2FzaC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSA9IGZhbHNlLCBtb2RlSW5kZXggPSAwLCBfaXNCYW5rcnVwdGVkID0gZmFsc2UsIF9CYW5rcnVwdEFtb3VudCA9IDAsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIC8vY2FsbGVkIGZpcnN0IHRpbWUgZm9ybSBHYW1lTWFuYWdlciBvbmxvYWQgZnVuY3Rpb25cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gX2lzQ2FyZEZ1bmN0aW9uYWxpdHk7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IF9HaXZlbkNhc2g7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoO1xyXG5cclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gX2lzQmFua3J1cHRlZDtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IF9CYW5rcnVwdEFtb3VudDtcclxuXHJcbiAgICBpZiAoX2lzQmFua3J1cHRlZCkgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG5cclxuICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lLCBtb2RlSW5kZXgsIF9pc0JhbmtydXB0ZWQpO1xyXG4gIH0sXHJcbiAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUgPSBmYWxzZSwgbW9kZUluZGV4ID0gMCwgX2lzQmFua3J1cHRlZCA9IGZhbHNlKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXJkRnVuY3Rpb25hbGl0eSA9IG5ldyBHYW1lTWFuYWdlci5DYXJkRGF0YUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoaXNGaXJzdFRpbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBTdGFydEdhbWVDYXNoO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAoKTtcclxuXHJcbiAgICBpZiAoaW5zaWRlR2FtZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IGluZGV4O1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgaWYgKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgICAgICBpZiAoU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gMDtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIFByZXZpb3VzQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IEdpdmVuQ2FzaEJ1c2luZXNzO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZSk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmF2YXRhcklkKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBHZXRPYmpfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuQnVzaW5lc3NTZXR1cERhdGE7XHJcbiAgfSxcclxuICBPbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKG5hbWUpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJVSUQgPSBVSUQ7XHJcbiAgfSxcclxuICBPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgaWYgKGlzTmFOKFVJRCkgfHwgVUlEID09IHVuZGVmaW5lZCkgVUlEID0gMDtcclxuXHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5BdmF0YXJJRCA9IFVJRDtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc05hbWVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUkgPSBcIlwiO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBcIlwiO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmU7XHJcbiAgfSxcclxuICBPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQ7XHJcbiAgfSxcclxuICBPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IGFtb3VudDtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBhbW91bnQ7XHJcbiAgfSxcclxuICBDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbHJlYWR5IHRha2VuIGxvYW4gb2YgJFwiICsgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG8gbm90IG5lZWQgbG9hbiwgeW91IGhhdmUgZW5vdWdoIGNhc2ggdG8gYnV5IGN1cnJlbnQgc2VsZWN0ZWQgYnVzaW5lc3MuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgUmVxdWlyZWRDYXNoID0gTWF0aC5hYnMocGFyc2VJbnQoUGxheWVyRGF0YUludGFuY2UuQ2FzaCkgLSBhbW91bnQpO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIiRcIiArIFJlcXVpcmVkQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXBcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCg1MDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpIHtcclxuICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGJ1c2luZXNzIGJldHdlZW4gSG9tZSBCYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuICBIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaW5kZXggPT0gaSkgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5PdGhlcjtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDApO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlblRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMSk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGVudHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDIpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRoaXJ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMyk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uRm9ydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDQpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZpZnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg1KTtcclxuICB9LFxyXG4gIE9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPT0gTG9hbkFtb3VudEVudW0uT3RoZXIpIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IFJlcXVpcmVkQ2FzaDtcclxuICAgIGVsc2UgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gcGFyc2VJbnQodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50KTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IHRydWU7XHJcbiAgICB0aGlzLk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICsgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICB9LFxyXG5cclxuICBQdXNoRGF0YUZvclBsYXllckxlZnQoX2RhdGEpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IDIwMDAwO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuUGxheWVySUQgPSBfZGF0YS51c2VySUQ7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lID0gX2RhdGEubmFtZTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkF2YXRhcklEID0gMDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA9IDE7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQ2FyZEZ1bmN0aW9uYWxpdHkgPSBuZXcgR2FtZU1hbmFnZXIuQ2FyZERhdGFGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPSBcIlNhbG9vblwiO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPSBcIkV2YSBCZWF1dHlcIjtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMSwgX3BsYXllckRhdGFJbnRhbmNlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIFN5bmNEYXRhOiBmdW5jdGlvbiAoX2RhdGEsIF9JRCwgX3BsYXllckxlZnQgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9pc1NwZWN0YXRlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdO1xyXG5cclxuICAgIGlmIChfaXNTcGVjdGF0ZSkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFJlYWxBY3RvcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9wbGF5ZXJMZWZ0KSB7XHJcbiAgICAgIGlmIChfSUQgIT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmFjdG9yTnIpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoID49IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycykge1xyXG4gICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCB0cnVlLCB0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFB1cmNoYXNlQnVzaW5lc3M6IGZ1bmN0aW9uIChfYW1vdW50LCBfYnVzaW5lc3NOYW1lLCBfaXNIb21lQmFzZWQpIHtcclxuICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIDwgX2Ftb3VudCAmJiAhU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiICsgX2J1c2luZXNzTmFtZSArIFwiIGJ1c2luZXNzLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9pc0hvbWVCYXNlZCkge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPCAzKSB7XHJcbiAgICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJSZXZlcnRpbmcgYmFjayBsb2FuIGFtb3VudC5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Jc0JhbmtydXB0ID0gdHJ1ZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQmFua3J1cHRBbW91bnQgPSB0aGlzLkJhbmtydXB0ZWRBbW91bnQ7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAvL3NldHRpbmcgcGxheWVyIGN1cnJlbnQgZGF0YSBpbiBjdXN0b20gcHJvcGVydGllcyB3aGVuIGhpcy9oZXIgdHVybiBvdmVyc1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IGJhbmtydXB0ZWQ6IHRydWUsIHR1cm46IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCksIFBsYXllckRhdGFNYWluOiBQbGF5ZXJEYXRhSW50YW5jZSB9IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg5LCBfZGF0YSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIEFJXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICAgIH0sIDE2MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwibm8gbW9kZSBzZWxlY3RlZFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUGF5QW1vdW50VG9QbGF5R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9PSBcIlwiKSB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIHR5cGUuXCIpO1xyXG4gICAgZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPT0gXCJcIikgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyBuYW1lLlwiKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lIHx8IFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBhIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgaG9tZWJhc3NlZFxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCwgXCJob21lXCIsIHRydWUpO1xyXG4gICAgICBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcyg1MDAwMCwgXCJicmljayBhbmQgbW9ydGFyXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlN0YXJ0R2FtZSA9PSB0cnVlIHx8IHRoaXMuSXNCYW5rcnVwdGVkID09IHRydWUpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgaWYgKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwICE9IC0xKSB7XHJcbiAgICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcnRpbnRpbmcgYWxsIHZhbHVlcyB0byBjb25zb2xlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG5hbWU6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgSUQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIklzIHBsYXllciBib3Q6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLklzQm90KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gb2YgYnVzaW5lc3Mgb2YgcGxheWVyIChzZWUgYmVsb3cpOiBcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNhc2g6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkNhc2gpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgdGFrZW4gbG9hbjogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hblRha2VuKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW4gbG9hbiBhbW91bnQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBpc2FjdGl2ZTtcclxuXHJcbiAgICB2YXIgX2FjdGl2ZSA9IGlzYWN0aXZlO1xyXG5cclxuICAgIGlmIChfYWN0aXZlKSB7XHJcbiAgICAgIF9hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkJsb2NrZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlRpbWVyID0gZ2xvYmFsVHVyblRpbWVyO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5UaW1lclRleHQuc3RyaW5nID0gdGhpcy5UaW1lciArIFwiIHNlY29uZHMgYXJlIGxlZnQgdG8gY2hvb3NlIGFib3ZlIG9wdGlvbnMgZXhjZXB0ICdSb2xsIFRoZSBEaWNlJ1wiO1xyXG4gICAgICBjbGVhclRpbWVvdXQoVGltZXJUaW1lb3V0KTtcclxuICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVyVGltZW91dCk7XHJcbiAgICAgIHRoaXMuVGltZXIgPSAwO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVGltZXIoKSB7XHJcbiAgICBpZiAodGhpcy5UaW1lciA+IDApIHtcclxuICAgICAgdGhpcy5UaW1lciA9IHRoaXMuVGltZXIgLSAxO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IHRoaXMuVGltZXIgKyBcIiBzZWNvbmRzIGFyZSBsZWZ0IHRvIGNob29zZSBhYm92ZSBvcHRpb25zIGV4Y2VwdCAnUm9sbCBUaGUgRGljZSdcIjtcclxuICAgICAgVGltZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lclRpbWVvdXQpO1xyXG4gICAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlRpbWVyVGV4dC5zdHJpbmcgPSBcIlRpbWVyIGlzIG92ZXIsIHlvdSBjYW4gc2VsZWN0IG9ubHkgJ1JvbGwgVGhlIERpY2UnIG5vdy5cIjtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkJsb2NrZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5DYXNoQW1vdW50TGFiZWwuc3RyaW5nID0gXCIkIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLkNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBDaGVja01hcmtldGluZ0Ftb3VudFNoYXJlX0NhcmRGdW5jdGlvbmFsaXR5KF9hbW91bnQgPSAwKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuSGFzTWFya2V0aW5nQ29tcGFueSkge1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudEZvck1hcmtldGluZ1NoYXJlKF9hbW91bnQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQsIFwiWW91IGhhdmUgcmVjZWl2ZWQgbWFya2V0IHNoYXJlIG9mICRcIiArIF9hbW91bnQgKyBcIiBmcm9tIHlvdXIgbWFya2V0aW5nIGNvbXBhbnlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yTWFya2V0aW5nU2hhcmUoX2FtbnQsIF9pZCwgX21zZykge1xyXG4gICAgdmFyIF9kYXRhID0geyBhbW91bnQ6IF9hbW50LCBJRDogX2lkLCBtc2c6IF9tc2cgfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjIsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gXCJcIiB8fCBUZW1wTWFya2V0aW5nQW1vdW50ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB0aGlzLm1hcmtldGluZ0Ftb3VudCA9IHBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuXHJcbiAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdGhpcy5tYXJrZXRpbmdBbW91bnQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCArIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgKyBcIiAsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKyBcIi5cIixcclxuICAgICAgICAgIExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tNYXJrZXRpbmdBbW91bnRTaGFyZV9DYXJkRnVuY3Rpb25hbGl0eSh0aGlzLm1hcmtldGluZ0Ftb3VudCk7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gaWYgcGxheWVyIGhhcyBtb3JlIHRoYW4gNTAwMCRcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cykge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gNTAwMCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgVGVtcEhpcmluZ0xhd3llciA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coVGVtcEhpcmluZ0xhd3llcik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSA1MDAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICsgXCIuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSkge1xyXG4gICAgTG9jYXRpb25OYW1lID0gX25hbWU7XHJcbiAgfSxcclxuICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQgPSBudWxsLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICAvL2lmIHBsYXllciBoYXMgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBoZSBjb3VsZCBleHBhbmQgaXRcclxuICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzXCIpO1xyXG5cclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuXHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB2YXIgZ2VuZXJhdGVkTGVuZ3RoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5LCBHaXZlbkNhc2hCdXNpbmVzcywgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKTtcclxuXHJcbiAgICBpZiAoZ2VuZXJhdGVkTGVuZ3RoID09IDApIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBubyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIHRvIGV4cGFuZC5cIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxNjAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzcyBleGl0IGNhbGxlZFwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgIHRoaXMuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZEludmVzdGVkKSB7XHJcbiAgICAgIHRoaXMuR29sZEludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRJbnZlc3Q7XHJcbiAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcIkludmVzdCBJbiBHT0xEXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIEJVWVwiLCBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiQlVZXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblN0b2NrQnVzaW5lc3NOYW1lQ2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGV2ZW50ID0gbnVsbCwgX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgVHVybk92ZXJGb3JJbnZlc3QgPSBfaXNUdXJuT3ZlcjtcclxuXHJcbiAgICBjb25zb2xlLmVycm9yKF9pc1R1cm5PdmVyKTtcclxuXHJcbiAgICBpZiAoVHVybk92ZXJGb3JJbnZlc3QpIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJGcmllbmQncyBCdXNpbmVzc1wiO1xyXG5cclxuICAgIGlmICghdGhpcy5TdG9ja0ludmVzdGVkIHx8IFR1cm5PdmVyRm9ySW52ZXN0KSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoU3RvY2tCdXNpbmVzc05hbWUgPT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYSBidXNpbmVzcyBuYW1lIHRvIGludmVzdC5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0O1xyXG5cclxuICAgICAgICBpZiAoIVR1cm5PdmVyRm9ySW52ZXN0KSBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIGVsc2UgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG5cclxuICAgICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcIkludmVzdCBpbiBTdG9ja1wiLCBEaWNlUmVzdWx0LCBcIkVhY2ggU2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvc2hhcmVcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBCVVlcIiwgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIkJVWVwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLkdvbGRTb2xkKSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ID4gMCkge1xyXG4gICAgICAgIHRoaXMuR29sZFNvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uR29sZFNlbGw7XHJcbiAgICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcIlNlbGwgR09MRFwiLCBEaWNlUmVzdWx0LCBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBTRUxMXCIsIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiU0VMTFwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IEdPTEQgb3VuY2VzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuU3RvY2tTb2xkKSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLlN0b2NrU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja1NlbGw7XHJcbiAgICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcIlNlbGwgU1RPQ0tcIiwgRGljZVJlc3VsdCwgXCJFYWNoIHNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gU0VMTFwiLCBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIlNFTExcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBzaGFyZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImdvIGludG8gcGFydG5lciBzaGlwXCIpO1xyXG4gICAgLy8gdGhpcy5TaG93VG9hc3QoXCJ3b3JrIGluIHByb2dyZXNzLCBjb21pbmcgc29vbi4uLlwiKTtcclxuICAgIC8vIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gIH0sXHJcblxyXG4gIE9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJyb2xsIHRoZSBkaWNlXCIpO1xyXG4gICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxEaWNlKCk7XHJcbiAgfSxcclxuXHJcbiAgUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIC8vdGhpcy5UZW1wRGljZVRleHQuc3RyaW5nPXZhbHVlO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXJ0bmVyc2hpcCBzZXR1cFxyXG4gIFRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuTWFpblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuV2FpdGluZ1N0YXR1c1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgQ2FuY2VsbGVkSUQgPSBbXTtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBsYXllck5hbWUuc3RyaW5nID0gX3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJDYXNoLnN0cmluZyA9IFwiJFwiICsgX3RlbXBEYXRhLkNhc2g7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGFydG5lclNoaXBQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgdmFyIF90b3RhbExvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgICAgdmFyIF9hbGxMb2NhdGlvbnNBbW91bnQgPSBfdG90YWxMb2NhdGlvbnMgKiAyNTAwMDtcclxuICAgICAgICB2YXIgX2ZpbmFsQW1vdW50ID0gNTAwMDAgKyBfYWxsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLklzUGFydG5lcnNoaXAgPT0gdHJ1ZSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUGFydG5lck5hbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShcIm5vbmVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cChfbXNnKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25QbGF5ZXJDYXNoLnN0cmluZyA9IFwiJFwiICsgX3RlbXBEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvbkRlc2NyaXB0aW9uLnN0cmluZyA9IF9tc2c7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBSZXNldF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cChfZGF0YSkge1xyXG4gICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gdHJ1ZTtcclxuICAgIFBhcnRuZXJTaGlwRGF0YSA9IF9kYXRhO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIF9idXNpbmVzc01vZGUgPSBcIkhvbWUgQmFzZWRcIjtcclxuICAgIGVsc2UgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMikgX2J1c2luZXNzTW9kZSA9IFwiQnJpY2sgJiBNb3J0YXJcIjtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9tc2cgPVxyXG4gICAgICAgIFwieW91IGhhdmUgcmVjZWl2ZWQgcGFydG5lcnNoaXAgb2ZmZXIgYnkgXCIgK1xyXG4gICAgICAgIF9wbGF5ZXJEYXRhLlBsYXllck5hbWUgK1xyXG4gICAgICAgIFwiICwgZm9sbG93aW5nIGFyZSB0aGUgZGV0YWlscyBvZiBidXNpbmVzczogXCIgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgTmFtZTogXCIgK1xyXG4gICAgICAgIF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc05hbWUgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgTW9kZTogXCIgK1xyXG4gICAgICAgIF9idXNpbmVzc01vZGUgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgVmFsdWU6ICRcIiArXHJcbiAgICAgICAgX2J1c2luZXNzVmFsdWUgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQ2FzaCBQYXltZW50OiAkXCIgK1xyXG4gICAgICAgIF9wYXlBbW91bnQgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiaWYgb2ZmZXIgaXMgYWNjZXB0ZWQgeW91IHdpbGwgcmVjZWl2ZSA1MCUgc2hhcmUgb2YgdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzIGFuZCB3aWxsIHJlY2VpdmUgcHJvZml0L2xvc2Ugb24gdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzLlwiO1xyXG5cclxuICAgICAgdGhpcy5FbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfYWxsQWN0b3JzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2RhdGEgPSBQYXJ0bmVyU2hpcERhdGE7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggPj0gX3BheUFtb3VudCkge1xyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggLT0gX3BheUFtb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCh0cnVlLCBfcGF5QW1vdW50LCBmYWxzZSwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlELCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcImNvbmdyYXR1bGF0aW9ucyEgeW91IGhhdmUgc3RhcnRlZCBidXNpbmVzcyBwYXJ0bmVyc2hpcFwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIk5vdCBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiT2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgb3RoZXIgcGxheWVyLlwiKTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDYW5jZWxPZmZlcl9QYXJ0bmVyc2hpcFNldHVwKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChmYWxzZSwgMCwgdHJ1ZSwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlELCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKF9pc0FjY2VwdGVkID0gZmFsc2UsIF9wYXltZW50ID0gMCwgX2lzQ2FuY2VsbGVkID0gZmFsc2UsIF91SUQgPSBcIlwiLCBfZGF0YSA9IG51bGwsIF9idXNpbmVzc0luZGV4ID0gMCkge1xyXG4gICAgdmFyIF9tYWluRGF0YSA9IHsgRGF0YTogeyBBY2NlcHRlZDogX2lzQWNjZXB0ZWQsIENhc2hQYXltZW50OiBfcGF5bWVudCwgQ2FuY2VsbGVkOiBfaXNDYW5jZWxsZWQsIFBsYXllcklEOiBfdUlELCBQbGF5ZXJEYXRhOiBfZGF0YSwgQnVzaW5lc3NJbmRleDogX2J1c2luZXNzSW5kZXggfSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMiwgX21haW5EYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB2YXIgX2FjY2VwdGVkID0gX2RhdGEuRGF0YS5BY2NlcHRlZDtcclxuICAgICAgdmFyIF9jYXNoID0gX2RhdGEuRGF0YS5DYXNoUGF5bWVudDtcclxuICAgICAgdmFyIF9jYW5jZWxsZWQgPSBfZGF0YS5EYXRhLkNhbmNlbGxlZDtcclxuICAgICAgdmFyIF91aWQgPSBfZGF0YS5EYXRhLlBsYXllcklEO1xyXG4gICAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuQnVzaW5lc3NJbmRleDtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYW5zd2VyIHJlY2VpdmVkXCIpO1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfY2FzaDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwID0gdHJ1ZTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVySUQgPSBfdWlkO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJOYW1lID0gX3BsYXllckRhdGEuUGxheWVyTmFtZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgYWNjZXB0ZWRcIik7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgXCIgKyBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICsgXCIsIGNhc2ggJFwiICsgX2Nhc2ggKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGFjY291bnQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBpZiAoQ2FuY2VsbGVkSUQuaW5jbHVkZXMoX3VpZCkgPT0gZmFsc2UpIENhbmNlbGxlZElELnB1c2goX3VpZCk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coQ2FuY2VsbGVkSUQpO1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmxlbmd0aCA9PSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXJ0bmVyc2hpcCBvZmZlciBoYXMgYmVlbiBjYW5jZWxsZWQgYnkgYWxsIG90aGVyIHVzZXJzLlwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIHJlamVjdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiT2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgb3RoZXIgcGxheWVyLlwiKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEludmVzdCBhbmQgc2VsbCBtb2RkdWxlXHJcblxyXG4gIFJlc2V0R29sZElucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkdvbGRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlN0b2NrRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIG9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsKF9hbW91bnQpIHtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IF9hbW91bnQ7XHJcblxyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIipcIiArIEVudGVyQnV5U2VsbEFtb3VudCArIFwiPVwiICsgX2Ftb3VudCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgIHRoaXMuUmVzZXRHb2xkSW5wdXQoKTtcclxuICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9JbnZlc3RTZWxsKF90aXRsZSwgX2RpY2VSZXN1bHQsIF9wcmljZVRpdGxlLCBfcHJpY2VWYWx1ZSwgX2J1eU9yU2VsbFRpdGxlLCBfdG90YWxBbW91bnRUaXRsZSwgX3RvdGFsQW1vdW50VmFsdWUsIF9idXR0b25OYW1lLCBfc3RhdGUpIHtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZVJlc3VsdDtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VUaXRsZUxhYmVsLnN0cmluZyA9IF9wcmljZVRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVZhbHVlTGFiZWwuc3RyaW5nID0gX3ByaWNlVmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1eU9yU2VsbFRpdGxlTGFiZWwuc3RyaW5nID0gX2J1eU9yU2VsbFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFRpdGxlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV0dG9uTmFtZUxhYmVsLnN0cmluZyA9IF9idXR0b25OYW1lO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZURhdGFfSW52ZXN0U2VsbChfdG90YWxBbW91bnRWYWx1ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgfSxcclxuXHJcbiAgQXBwbHlCdXR0b25fSW52ZXN0U2VsbCgpIHtcclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIEludmVzdFNlbGxJbmZvID0gXCJcIjtcclxuXHJcbiAgICAgIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uR29sZEludmVzdCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgIGlmIChfVG90YWxBbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgKz0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIiArIF9hbW91bnQgKyBcIiBvdW5jZXMgb2YgR09MRFwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJCdXlpbmcgR09MRDpcIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBPbmNlT3JTaGFyZSAvIDEwMDAgKyBcIlxcblwiICsgXCJQZXIgT3VuY2UgcHJpY2U6ICRcIiArIE9uY2VPclNoYXJlICsgXCJcXG5cIiArIFwiUHVyY2hhc2VkIE91bmNlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3IgT3VuY2VzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uR29sZFNlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgaWYgKF9hbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50KSB7XHJcbiAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgLT0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTEQgZm9yICAkXCIgKyBfVG90YWxBbW91bnQsIExvbmdNZXNzYWdlVGltZSk7XHJcblxyXG4gICAgICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIlNlbGxpbmcgR09MRDpcIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBPbmNlT3JTaGFyZSAvIDEwMDAgKyBcIlxcblwiICsgXCJQZXIgT3VuY2UgcHJpY2U6ICRcIiArIE9uY2VPclNoYXJlICsgXCJcXG5cIiArIFwiU29sZCBPdW5jZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIE91bmNlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBHT0xEIG91bmNlcywgeW91IG93biBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCArIFwiIG9mIEdPTEQgb3VuY2VzXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja0ludmVzdCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgIGlmIChfVG90YWxBbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICAvL2NhbiBhZGQgbXVsdGlwbGUgc3RvY2tzIHdpdGggYnVzaW5lc3MgbmFtZSBpbiBvYmplY3QgaWYgcmVxdWlyZWRcclxuXHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgc2hhcmVzIG9mIGJ1c2luZXNzIFwiICsgU3RvY2tCdXNpbmVzc05hbWUsIExvbmdNZXNzYWdlVGltZSk7XHJcblxyXG4gICAgICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIkJ1eWluZyBTVE9DSzpcIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBPbmNlT3JTaGFyZSAvIDEwMDAgKyBcIlxcblwiICsgXCJQZXIgc2hhcmUgcHJpY2U6ICRcIiArIE9uY2VPclNoYXJlICsgXCJcXG5cIiArIFwiUHVyY2hhc2VkIHNoYXJlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3Igc2hhcmVzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG5cclxuICAgICAgICBpZiAoX2Ftb3VudCA8PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50KSB7XHJcbiAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50IC09IF9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIiArIF9hbW91bnQgKyBcIiBzaGFyZXMgb2Ygc3RvY2sgZm9yICAkXCIgKyBfVG90YWxBbW91bnQsIExvbmdNZXNzYWdlVGltZSk7XHJcblxyXG4gICAgICAgICAgSW52ZXN0U2VsbEluZm8gPSBcIlNlbGxpbmcgU1RPQ0s6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIHNoYXJlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlNvbGQgc2hhcmVzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBzaGFyZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggc3RvY2tzIHNoYXJlcywgeW91IG93biBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgKyBcIiBvZiBzdG9jayBzaGFyZXNcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBheWRheSBvciBEb3VibGUgcGF5IERheVxyXG4gIFRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pIHtcclxuICAgIGlmIChITUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEJNQW1vdW50ID09IDApIHtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbG9hblRha2VuKSB7XHJcbiAgICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2V0TG9hbkFtb3VudF9QYXlEYXkoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB2YXIgX2xvYW4gPSAwO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfbG9hbjtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX1BheURheShfdGl0bGUsIF9pc0RvdWJsZVBheURheSA9IGZhbHNlLCBfc2tpcEhNID0gZmFsc2UsIF9za2lwQk0gPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UsIF9mb3JTZWxlY3RlZEJ1c2luZXNzID0gZmFsc2UsIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwLCBfaE1BbW91bnQgPSAwLCBfYm1BbW91bnQgPSAwLCBfYm1Mb2NhdGlvbiA9IDAsIFBheWRheUNvdW50ZXIgPSAxLCBEb3VibGVQYXlDb3VudGVyID0gMCwgX2hhbGZQYXlkYXkgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICBUb3RhbFBheURheSA9IDA7XHJcblxyXG4gICAgR2l2ZVByb2ZpdFVzZXJJRCA9IFwiXCI7XHJcbiAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYW5HaXZlUHJvZml0T25QYXlEYXkpIHtcclxuICAgICAgR2l2ZVByb2ZpdFVzZXJJRCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVXNlcklERm9yUHJvZml0UGF5RGF5O1xyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhbkdpdmVQcm9maXRPblBheURheSA9IGZhbHNlO1xyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlVzZXJJREZvclByb2ZpdFBheURheSA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coR2l2ZVByb2ZpdFVzZXJJRCk7XHJcbiAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlVzZXJJREZvclByb2ZpdFBheURheSk7XHJcblxyXG4gICAgaWYgKEdpdmVQcm9maXRVc2VySUQgIT0gXCJcIikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgd2hvbGUgcHJvZml0IHdpbGwgYmUgdHJhbnNmZXJyZWQgdG8gb3RoZXIgcGxheWVyIHRoaXMgdHVybi5cIiwgMTIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgSEJEaWNlQ291bnRlciA9IDA7XHJcbiAgICBCTURpY2VDb3VudGVyID0gMDtcclxuICAgIE5leHRIYWxmUGF5RGF5ID0gX2hhbGZQYXlkYXk7XHJcbiAgICAvLyAgIGlmIChEb3VibGVQYXlDb3VudGVyID09IDApIERvdWJsZVBheUNvdW50ZXIgPSAxO1xyXG5cclxuICAgIC8vICBpZiAoRG91YmxlUGF5RGF5KSBEb3VibGVQYXlDb3VudGVyID0gRG91YmxlUGF5Q291bnRlciAqIDI7XHJcblxyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NIQiA9IDA7XHJcbiAgICBEb3VibGVEYXlCdXNpbmVzc0JNID0gMDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlJlY2VpdmVEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgIERvdWJsZURheUJ1c2luZXNzSEIrKztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlJlY2VpdmVEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgIERvdWJsZURheUJ1c2luZXNzQk0rKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoRG91YmxlRGF5QnVzaW5lc3NIQiA+IDAgfHwgRG91YmxlRGF5QnVzaW5lc3NCTSA+IDApIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBcIiArIChEb3VibGVEYXlCdXNpbmVzc0hCICsgRG91YmxlRGF5QnVzaW5lc3NCTSkgKyBcIiBidXNpbmVzcy9lcy5cIiwgMTIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9yZXMgPSBQYXlkYXlDb3VudGVyICsgRG91YmxlUGF5Q291bnRlcjtcclxuICAgIFBheURheUluZm8gPSBcIlBheURheSBSZXN1bHQgd2l0aCBtdWx0aXBsaWVyOiBcIiArIF9yZXM7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuUGF5RGF5Q291bnQgPSBQYXlkYXlDb3VudGVyO1xyXG4gICAgdGhpcy5Eb3VibGVQYXlEYXlDb3VudCA9IERvdWJsZVBheUNvdW50ZXI7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfaXNEb3VibGVQYXlEYXk7XHJcbiAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB2YXIgX3RpbWUgPSAxODAwO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IF9mb3JTZWxlY3RlZEJ1c2luZXNzO1xyXG4gICAgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX1NlbGVjdGVkQnVzaW5lc3NJbmRleDtcclxuICAgIEhNQW1vdW50ID0gX2hNQW1vdW50O1xyXG4gICAgQk1BbW91bnQgPSBfYm1BbW91bnQ7XHJcbiAgICBCTUxvY2F0aW9ucyA9IF9ibUxvY2F0aW9uO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBpZiAoX2lzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKE5leHRIYWxmUGF5RGF5KSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgd2lsbCByZWNlaXZlIGhhbGYgcHJvZml0cyB0aGlzIHBheWRheS5cIiwgX3RpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIiwgX3RpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwSE0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKF9za2lwQk0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9QYXlEYXkoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcblxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIEhNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9hblRha2VuID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIGxvYW5UYWtlbiA9IF9sb2FuVGFrZW47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZE51bWJlckxhYmVsLnN0cmluZyA9IEhNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTGFiZWwuc3RyaW5nID0gQk1BbW91bnQ7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMb2NhdGlvbkxhYmVsLnN0cmluZyA9IEJNTG9jYXRpb25zO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlBhc3NlZFBheURheUNvdW50TGFiZWwuc3RyaW5nID0gdGhpcy5QYXlEYXlDb3VudDtcclxuXHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIGxvYW4gd2FzIHNraXBwZWQgcHJldmlvdXNseVxyXG4gICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSB7XHJcbiAgICAgIHZhciBfbG9hbiA9IHRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJFwiICsgX2xvYW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkZvdHRlckxhYmVsLnN0cmluZyA9IFwiKnBheSAkNTAwMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgMCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgQk1BbW91bnQsIGxvYW5UYWtlbik7XHJcblxyXG4gICAgaWYgKF9za2lwQk0gfHwgX3NraXBITSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCBfdGltZSArIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgdGhpcy5PbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgdGhpcy5PbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICBpZiAoIUhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQpIHtcclxuICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX2RvdWJsZVBheURheSA9IERvdWJsZVBheURheTtcclxuICAgICAgdmFyIF9oYWxmUGF5ZGF5ID0gTmV4dEhhbGZQYXlEYXk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9kb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcztcclxuXHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcbiAgICAgIHZhciBfcGF5ZGF5bXVsdGlwbGllciA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgICBpZiAoX2hhbGZQYXlkYXkpIF9tdWx0aXBsaWVyID0gX211bHRpcGxpZXIgLyAyO1xyXG5cclxuICAgICAgLy9wYXJ0bmVyc2hpcCBjb2RlXHJcbiAgICAgIGlmIChfZG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuRG91YmxlUGF5RGF5Q291bnQgIT0gMCkge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgKj0gMiAqIHRoaXMuRG91YmxlUGF5RGF5Q291bnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyICo9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZG91YmxlUGF5RGF5QWRkZWQgPSBfbXVsdGlwbGllciAqIF9wYXlkYXltdWx0aXBsaWVyICogRG91YmxlRGF5QnVzaW5lc3NIQiAqIF9kaWNlICogMTAwMDtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbXVsdGlwbGllciAqIF9kaWNlICogMTAwMCArIGRvdWJsZVBheURheUFkZGVkO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IF9wYXltZW50IC8gMjtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW2luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbXVsdGlwbGllciAqIF9kaWNlICogMTAwMCArIGRvdWJsZVBheURheUFkZGVkO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYW1vdW50VG9CZUFkanVzdGVkID4gMCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH1cclxuICAgICAgLy9wYXJ0bmVyc2hpcCBjb2RlXHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIFRvdGFsUGF5RGF5QW1vdW50ID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIEhNQW1vdW50ICogX2RpY2UgKiAxMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG4gICAgICBlbHNlIFRvdGFsUGF5RGF5QW1vdW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbXVsdGlwbGllciAqIChITUFtb3VudCAqIF9kaWNlKSAqIDEwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IEhNQW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIEhNQW1vdW50ICsgXCIqXCIgKyBcIjEwMDAqXCIgKyBfbXVsdGlwbGllciArIFwiKS1cIiArIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBcIitcIiArIGRvdWJsZVBheURheUFkZGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIFBheURheUluZm8gKz0gXCJcXG5cIiArIFwiXFxuXCIgKyBcIkhvbWUgQmFzZWQgQnVzaW5lc3M6IFwiICsgSE1BbW91bnQgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBfZGljZSArIFwiXFxuXCIgKyBcIkFtb3VudCBSZWNlaXZlZDogJFwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIFRvdGFsUGF5RGF5ICs9IFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIGlmICghQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcbiAgICAgIHZhciBfcGF5ZGF5bXVsdGlwbGllciA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcbiAgICAgIHZhciBfaGFsZlBheWRheSA9IE5leHRIYWxmUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudCA9IEJNQW1vdW50ICsgQk1Mb2NhdGlvbnM7XHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcztcclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICAgIGlmIChfaGFsZlBheWRheSkgX211bHRpcGxpZXIgPSBfbXVsdGlwbGllciAvIDI7XHJcblxyXG4gICAgICBpZiAoX2RvdWJsZVBheURheSkge1xyXG4gICAgICAgIGlmICh0aGlzLkRvdWJsZVBheURheUNvdW50ICE9IDApIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyICo9IDIgKiB0aGlzLkRvdWJsZVBheURheUNvdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGRvdWJsZVBheURheUFkZGVkID0gX3BheWRheW11bHRpcGxpZXIgKiBfbXVsdGlwbGllciAqIERvdWJsZURheUJ1c2luZXNzQk0gKiBfZGljZSAqIDIwMDA7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfbG9jYXRpb25zID0gX3RlbXBEYXRhW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfbG9jYXRpb25zID0gX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICB2YXIgX3BheW1lbnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9sb2NhdGlvbnMgKiBfbXVsdGlwbGllciAqIF9kaWNlICogMjAwMCArIGRvdWJsZVBheURheUFkZGVkO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYW1vdW50VG9CZUFkanVzdGVkID4gMCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgVG90YWxQYXlEYXlBbW91bnQgPSBfbXVsdGlwbGllciAqIF9wYXlkYXltdWx0aXBsaWVyICogX2Ftb3VudCAqIF9kaWNlICogMjAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgZWxzZSBUb3RhbFBheURheUFtb3VudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiAoX2Ftb3VudCAqIF9kaWNlKSAqIDIwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IF9hbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBfYW1vdW50ICsgXCIqXCIgKyBcIjIwMDApLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiK1wiICsgZG91YmxlUGF5RGF5QWRkZWQgKyBcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBfYW1vdW50ICsgXCIqXCIgKyBcIjIwMDAqXCIgKyBfbXVsdGlwbGllciArIFwiKS1cIiArIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBcIitcIiArIGRvdWJsZVBheURheUFkZGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIFBheURheUluZm8gKz0gXCJcXG5cIiArIFwiXFxuXCIgKyBcIkJyaWNrICYgTW9ydGFyIEJ1c2luZXNzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJEaWNlIFJvbGxlZDogXCIgKyBfZGljZSArIFwiXFxuXCIgKyBcIkFtb3VudCBSZWNlaXZlZDogJFwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIFRvdGFsUGF5RGF5ICs9IFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVQYXltZW50X1BheURheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUxvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX0VzdGltYXRlTG9hbiA9IDA7XHJcblxyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpXHJcbiAgICAgICAgLy9pZiBwbGF5ZXIgaGFkIHNraXBwcGVkIGxvYW4gcHJldmlvdXNseSBjYWxsIGFsbCBhbW91bnQgZHVlXHJcbiAgICAgICAgX0VzdGltYXRlTG9hbiA9IHRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgZWxzZSBfRXN0aW1hdGVMb2FuID0gNTAwMDtcclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9Fc3RpbWF0ZUxvYW4pIHtcclxuICAgICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gX0VzdGltYXRlTG9hbjtcclxuXHJcbiAgICAgICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9QYXlEYXkoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIm91dCBvZiBtb25leVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQYXltZW50X1BheURheSgpIHtcclxuICAgIC8vYWxsXHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIkFtb3VudCAkXCIgKyBUb3RhbFBheURheUFtb3VudCArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkFtb3VudCAkXCIgKyBUb3RhbFBheURheUFtb3VudCArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNraXBMb2FuT25lVGltZV9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHNraXBwZWQgdGhlIGxvYW4gcGF5bWVudCwgYmFuayB3aWxsIGNhbGwgdXBvbiBjb21wbGV0ZSBsb2FuIGFtb3VudCBvbiBuZXh0IHBheWRheVwiKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQgPSB0cnVlO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBTZWxsQnVzaW5lc3NfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNhc2hfUGF5RGF5KF9hbW91bnQpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIEV4aXRMb2FuU2NyZWVuX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFByb2Nlc3NCYW5rcnVwdChfc2hvd1RleHQgPSB0cnVlLCBfdHh0LCBfdGltZSkge1xyXG4gICAgaWYgKF9zaG93VGV4dCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChfdHh0LCBfdGltZSwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuRXhpdF9TZWxlY3RQbGF5ZXJHZW5lcmljKCk7XHJcbiAgICAgIHRoaXMuRXhpdFNjcmVlbl9fQnVzaW5lc3NHZW5yaWMoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVEaWNlUmVzdWx0U2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXlIYWxmQnVzaW5lc3MoZmFsc2UpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU2hvd0NhcmRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgX3RpbWUgKyAxMCk7XHJcbiAgfSxcclxuICBTdGFydE5ld0dhbWVfUGF5RGF5KCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIGlmIChtb2RlID09IDIpIHtcclxuICAgICAgaWYgKEJhbmtSdXB0ZWRDYXJkKSB7XHJcbiAgICAgICAgQmFua1J1cHRlZENhcmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTWFpblNjcmVlbl9EYW1hZ2VEZWNpc2lvbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICAgIHRoaXMuRXhpdF9TZWxlY3RQbGF5ZXJHZW5lcmljKCk7XHJcbiAgICAgICAgdGhpcy5FeGl0U2NyZWVuX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgICAgIHRoaXMuRXhpdExvYW5TY3JlZW5fUGF5RGF5KCk7XHJcbiAgICAgICAgdmFyIF9zZW5kaW5nRGF0YSA9IHsgSUQ6IFNlbmRlckRhbWFnaW5nSUQsIENhc2g6IERhbWFnZURlY2lzaW9uUmVzdWx0LCBJc0RpY2VSb2xsZWQ6IHRydWUsIElzQmFua1J1cHRlZDogdHJ1ZSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjUsIF9zZW5kaW5nRGF0YSk7XHJcblxyXG4gICAgICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIHZhciBwbGF5ZXJEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGxheWVyRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChwbGF5ZXJEYXRhW2luZGV4XS5QbGF5ZXJVSUQgPT0gX215QWN0b3IuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHBsYXllckRhdGFbaW5kZXhdLkNhcmRGdW5jdGlvbmFsaXR5LkJhbmtydXB0ZWROZXh0VHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHBsYXllckRhdGFbaW5kZXhdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSB3aWxsIGxvc2UgYWxsIHByb2dyZXNzIGFuZCBzdGFydCBuZXcgZ2FtZSBmcm9tIHRoZSBzdGFydCBuZXh0IHR1cm4uXCIsIDMwMDAsIGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlByb2Nlc3NCYW5rcnVwdCh0cnVlLCBcIllvdSB3aWxsIGxvc2UgYWxsIHByb2dyZXNzIGFuZCBzdGFydCBuZXcgZ2FtZSBmcm9tIHRoZSBzdGFydC5cIiwgMzAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobW9kZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc0JhbmtydXB0KHRydWUsIFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0LlwiLCAzMDAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydE5ld0dhbWVfQmFua1J1cHRlZChfdHh0KSB7XHJcbiAgICAvL2lmIGJhbmtydXB0ZWQgeW91IGNhbiBzdGFydCBuZXcgZ2FtZVxyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgdGhpcy5Qcm9jZXNzQmFua3J1cHQodHJ1ZSwgX3R4dCwgMzAwMCk7XHJcbiAgfSxcclxuXHJcbiAgU2hvd0luZm8oX2RhdGEpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KF9kYXRhLmluZm8sIDIwMDAsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIFBheURheUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChIb21lQmFzZWRQYXltZW50Q29tcGxldGVkICYmIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCAmJiBMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBheWRheSBkb25lXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKEdpdmVQcm9maXRVc2VySUQgIT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91ciB3aG9sZSBQYXlkYXkgYW1vdW50ICRcIiArIFRvdGFsUGF5RGF5ICsgXCIgd2lsbCBiZSB0cmFuc2ZlcnJlZCB0byBvdGhlciBwbGF5ZXIgbm93LlwiLCAyMjAwKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUGF5RGF5O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKFRvdGFsUGF5RGF5LCBHaXZlUHJvZml0VXNlcklEKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDb21wbGV0aW9uKCk7XHJcbiAgICAgICAgfSwgMzIwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ29tcGxldGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudEZvckNvbXBsZXRpb24oKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKGZhbHNlKTtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlUGF5RGF5KGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuXHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheUNvdW50ZXIgPiAwKSB7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyLS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlSGFsZlBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICBfbWFuYWdlci5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9tYW5hZ2VyLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKFBheURheUluZm8pO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxsICYgbWFuaXB1bGF0ZSBCdXNpbmVzcyBVSVxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cChfc2VsbEFtb3VudCA9IDApIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTExcIjtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAoX3NlbGxBbW91bnQgIT0gMCkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0U2VsbGluZ0Ftb3VudChfc2VsbEFtb3VudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIGVsc2Ugbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVU0lORVNTXCI7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgLy8gaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICAvLyBlbHNlXHJcbiAgICAgIC8vICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlLCBfc2VsbEFtb3VudCA9IDApIHtcclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cChfc2VsbEFtb3VudCk7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzVHVybm92ZXIgPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9pc0JvdCkgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuXHJcbiAgICB0aGlzLlNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKF9pc0JvdCk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IFVJXHJcbiAgVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIklOVkVTVFwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnV5T1JTZWxsIFVJXHJcbiAgVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVWSBPUiBTRUxMXCI7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBPbmUgUXVlc3Rpb24gc2V0dXAgVWlcclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TcGFjZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5XYWl0aW5nU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTaG93UXVlc3Rpb25Ub2FzdChfbXNnKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5XYWl0aW5nU2NyZWVuTGFiZWwuc3RyaW5nID0gX21zZztcclxuICB9LFxyXG5cclxuICBTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLCBfYWN0b3JzRGF0YSwgX2lzVHVybk92ZXIsIF9tb2RlSW5kZXggPSAwKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb25lUXVlc3Rpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgb25lUXVlc3Rpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX21zZykge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nID0gX21zZztcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU2VsZWN0IEJ1c2luZXNzIGZvciBkb3VibGUgcGF5ZGF5IHNldHVwXHJcbiAgVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NEb3VibGVQYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVkaXRUaXRsZV9CdXNpbmVzc1BheURheVVJU2V0dXAoX21haW5UaXRsZSwgX3RpbGVDb250ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5UaXRsZU5hbWUuc3RyaW5nID0gX21haW5UaXRsZTtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlRpdGxlQ29udGVudExhYmVsLnN0cmluZyA9IF90aWxlQ29udGVudDtcclxuICB9LFxyXG5cclxuICBFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpIHtcclxuICAgIHRoaXMuQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNjcmVlbl9BbG9uZ1R1cm5PdmVyX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpIHtcclxuICAgIHRoaXMuQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIENsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMgPSBbXTtcclxuICB9LFxyXG4gIFByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoX3RlbXBEYXRhLCBfYnVzaW5lc3NUeXBlKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gX2J1c2luZXNzVHlwZSkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgdmFyIF90b3RhbExvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgICAgdmFyIF9hbGxMb2NhdGlvbnNBbW91bnQgPSBfdG90YWxMb2NhdGlvbnMgKiAyNTAwMDtcclxuICAgICAgICAgIHZhciBfZmluYWxBbW91bnQgPSA1MDAwMCArIF9hbGxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUGFydG5lck5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShcIm5vbmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXNpbmVzc0RldGFpbFBheURheU5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVTZWxldGl2ZURvdWJsZVBheURheV9CdXNpbmVzc1BheURheVVJU2V0dXAoX2lzSG9tZUJhc2VkID0gZmFsc2UsIF9pc0JyaWNrQW5kTW9ydGFyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cChcIkJVU0lORVNTXCIsIFwiKlNlbGVjdCBhIGJ1c2luZXNzIHRvIHJlY2VpdmUgZG91YmxlIHBheWRheSBwcm9maXRzIHRocm91Z2ggb3V0IGdhbWUgb24gdGhhdCBidXNpbmVzcy5cIik7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGlmIChfaXNCcmlja0FuZE1vcnRhcikge1xyXG4gICAgICB0aGlzLlByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoX3RlbXBEYXRhLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzSG9tZUJhc2VkKSB7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfdGVtcERhdGEsIDEpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxlY3QgUGxheWVyIGZvciBwcm9maXRcclxuICBUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTEVDVCBQTEFZRVJcIjtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBzZWxlY3RQbGF5ZXJQcm9maXROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RQbGF5ZXJQcm9maXROb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfU2VsZWN0UGxheWVyRm9yUHJvZml0KCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGVjdCBQbGF5ZXIgdG8gVGFrZSBvdmVyIGJ1c2luZXNzXHJcbiAgVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcihfbXlEYXRhLCBfYWN0b3JzRGF0YSwgX2lzVHVybk92ZXIsIF9tb2RlSW5kZXggPSAwLCBfYnV5SGFsZkJ1c2luZXNzID0gZmFsc2UpIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMRUNUIFBMQVlFUlwiO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIHZhciBfbWFpbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgaWYgKF9tb2RlSW5kZXggPT0gMikge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGlzIHNwZWN0YXRlIG9yIG5vdCwgZG9udCBhZGQgYW55IHNwZWN0YXRlc1xyXG4gICAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfYnV5SGFsZkJ1c2luZXNzKSB7XHJcbiAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldEJ1eUhhbGYodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgX21haW5EYXRhLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKF9tYWluRGF0YVtrXS5QbGF5ZXJVSUQgPT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVySW5kZXgoayk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUGxheWVyVGFrZU92ZXIucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGVJbmRleCA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBzZWxlY3RlZFBsYXllclRha2VPdmVyLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2VsZWN0ZWRQbGF5ZXJUYWtlT3Zlci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgc2VsZWN0ZWRQbGF5ZXJUYWtlT3ZlcltpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0ZWRQbGF5ZXJUYWtlT3ZlciA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfU2VsZWN0UGxheWVyR2VuZXJpYygpIHtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZygpO1xyXG4gICAgdGhpcy5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcihmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyR2VuZXJpYygpIHtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZygpO1xyXG4gICAgdGhpcy5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcihmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcbiAgLy9cclxuICAvLyNyZWdpb24gU2VsZWN0IEJ1c2luZXNzIHRvIHRha2Ugb3ZlclxyXG4gIFRvZ2dsZVNjcmVlbl9CdXNpbmVzc1Rha2VPdmVyKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxlY3RCdXNpbmVzc1Rha2VPdmVyU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1VJX0J1c2luZXNzVGFrZU92ZXIoX3BsYXllckRhdGEsIF9PdGhlclBsYXllckluZGV4ID0gMCwgX2J1eUhhbGZCdXNpbmVzcyA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0X0J1c2luZXNzVGFrZU92ZXIoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9wbGF5ZXJEYXRhO1xyXG4gICAgY29uc29sZS5sb2coX3RlbXBEYXRhKTtcclxuXHJcbiAgICB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVU0lORVNTXCI7XHJcbiAgICB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxlY3RCdXNpbmVzc1Rha2VPdmVyLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RCdXNpbmVzc1Rha2VPdmVyLkJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuU2Nyb2xsQ29udGVudE5vZGU7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBsYXllck9iamVjdChfcGxheWVyRGF0YSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGxheWVySW5kZXgoX090aGVyUGxheWVySW5kZXgpO1xyXG5cclxuICAgICAgaWYgKF9idXlIYWxmQnVzaW5lc3MpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLnNldEhhbGZCdXNpbmVzcyh0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgYnVzaW5lc3NUYWtlT3Zlck5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRfQnVzaW5lc3NUYWtlT3ZlcigpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc1Rha2VPdmVyTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzVGFrZU92ZXJOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1c2luZXNzVGFrZU92ZXJOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNjcmVlbl9fQnVzaW5lc3NUYWtlT3ZlcihfaXNUdXJub3ZlciA9IGZhbHNlLCBfcGxheWVyRGF0YSA9IG51bGwsIF9wbGF5ZXJJbmRleCA9IDAsIF9idXlIYWxmQnVzaW5lc3MgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NUYWtlT3Zlcih0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9CdXNpbmVzc1Rha2VPdmVyKF9wbGF5ZXJEYXRhLCBfcGxheWVySW5kZXgsIF9idXlIYWxmQnVzaW5lc3MpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTY3JlZW5fX0J1c2luZXNzR2VucmljKCkge1xyXG4gICAgdGhpcy5SZXNldF9fRGFtYWdlRGVjaXNpb24oKTtcclxuICAgIHRoaXMuUmVzZXRfQnVzaW5lc3NUYWtlT3ZlcigpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXNpbmVzc1NjcmVlbl9EYW1hZ2VEZWNpc2lvbigpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NUYWtlT3ZlcihmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNjcmVlbkFsb25nVHVybk92ZXJfX0J1c2luZXNzR2VucmljKCkge1xyXG4gICAgdGhpcy5SZXNldF9fRGFtYWdlRGVjaXNpb24oKTtcclxuICAgIHRoaXMuUmVzZXRfQnVzaW5lc3NUYWtlT3ZlcigpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NUYWtlT3ZlcihmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxlY3QgUGxheWVyIHdob21lIHlvdSBoYXZlIHJlY2VpdmVkIGRhbWFnaW5nIGluZm9ybWF0aW9uIGFuZCB3YW50IHRvIGdpdmUgdGhlbSBjaG9pY2VcclxuICBUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmcoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckRhbWFnaW5nU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nKF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMRUNUIFBMQVlFUlwiO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIHZhciBfbWFpbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgaWYgKF9tb2RlSW5kZXggPT0gMikge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGlzIHNwZWN0YXRlIG9yIG5vdCwgZG9udCBhZGQgYW55IHNwZWN0YXRlc1xyXG4gICAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXAuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgX21haW5EYXRhLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKF9tYWluRGF0YVtrXS5QbGF5ZXJVSUQgPT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVySW5kZXgoayk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZWN0ZWRQbGF5ZXJEYW1hZ2luZy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXAuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIHNlbGVjdGVkUGxheWVyRGFtYWdpbmcucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZygpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzZWxlY3RlZFBsYXllckRhbWFnaW5nLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBzZWxlY3RlZFBsYXllckRhbWFnaW5nW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RlZFBsYXllckRhbWFnaW5nID0gW107XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBEYW1hZ2luZyBpbmZvcm1hdGlvbiBjYXJkIGRlY2lzb24gc2V0dXBcclxuICBUb2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuTWFpblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlRGljZVJlc3VsdFNjcmVlbl9EYW1hZ2VEZWNpc2lvbihfc3RhdGUpIHtcclxuICAgIHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRpY2VSZXN1bHRTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuQnVzaW5lc3NTZWxlY3RTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfRGFtYWdlRGVjaXNpb24oX3BsYXllckRhdGEsIF9PdGhlclBsYXllckluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5SZXNldF9fRGFtYWdlRGVjaXNpb24oKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9wbGF5ZXJEYXRhO1xyXG4gICAgY29uc29sZS5sb2coX3RlbXBEYXRhKTtcclxuXHJcbiAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5EYW1hZ2VCdXNpbmVzc1NlbGVjdC5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVTSU5FU1NcIjtcclxuICAgIHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LkNhc2hMYWJlbC5zdHJpbmcgPSBfcGxheWVyRGF0YS5DYXNoO1xyXG4gICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5EYW1hZ2VCdXNpbmVzc1NlbGVjdC5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nID0gXCJObyBvZiBCdXNpbmVzc2VzIDogXCIgKyBfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LkJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5EYW1hZ2VCdXNpbmVzc1NlbGVjdC5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGxheWVyT2JqZWN0KF9wbGF5ZXJEYXRhKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQbGF5ZXJJbmRleChfT3RoZXJQbGF5ZXJJbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBidXNpbmVzc0RhbWFnaW5nTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldF9fRGFtYWdlRGVjaXNpb24oKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEYW1hZ2luZ05vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RhbWFnaW5nTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBidXNpbmVzc0RhbWFnaW5nTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFbmFibGVCdXNpbmVzc1NjcmVlbl9EYW1hZ2VEZWNpc2lvbihfaXNUdXJub3ZlciA9IGZhbHNlLCBfcGxheWVyRGF0YSA9IG51bGwsIF9wbGF5ZXJJbmRleCA9IDAsIF9ub0J1dHRvbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX25vQnV0dG9uID09IGZhbHNlKSB7XHJcbiAgICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICAgIHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5Ub2dnbGVCdXNpbmVzc1NjcmVlbl9EYW1hZ2VEZWNpc2lvbih0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9EYW1hZ2VEZWNpc2lvbihfcGxheWVyRGF0YSwgX3BsYXllckluZGV4KTtcclxuICB9LFxyXG5cclxuICBTZXRNZXNhZ2VUZXh0X0RhbWFnZURlY2lzaW9uKF90eHQpIHtcclxuICAgIHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfdHh0O1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZURpY2VSZXN1bHRfRGFtYWdlRGVjaXNpb24oKSB7XHJcbiAgICB0aGlzLlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24odHJ1ZSk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgIHZhciBfZmluZU11bHRpcGxpZXIgPSAzMDAwO1xyXG4gICAgRGFtYWdlRGVjaXNpb25SZXN1bHQgPSBfZGljZVJlc3VsdCAqIF9maW5lTXVsdGlwbGllcjtcclxuXHJcbiAgICB2YXIgX3RleHQgPSBcIlxcblwiICsgXCJEaWNlIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50IDogXCIgKyBfZGljZVJlc3VsdCArIFwiICogXCIgKyBfZmluZU11bHRpcGxpZXIgKyBcIiA9IFwiICsgRGFtYWdlRGVjaXNpb25SZXN1bHQ7XHJcbiAgICB0aGlzLlNldE1lc2FnZVRleHRfRGFtYWdlRGVjaXNpb24oX3RleHQpO1xyXG4gIH0sXHJcblxyXG4gIFNldFNlbmRlcklEX0RhbWFnZURlY2lzaW9uKElEKSB7XHJcbiAgICBTZW5kZXJEYW1hZ2luZ0lEID0gSUQ7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X0RhbWFnZURlY2lzaW9uKF9kYXRhKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX3JlY2l2ZXJJRCA9IF9kYXRhLklEO1xyXG4gICAgICB2YXIgX2Nhc2hSZWNlaXZlZCA9IF9kYXRhLkNhc2g7XHJcbiAgICAgIHZhciBfaXNEaWNlUm9sbGVkID0gX2RhdGEuSXNEaWNlUm9sbGVkO1xyXG4gICAgICB2YXIgX2lzQmFua3J1cHRlZCA9IF9kYXRhLklzQmFua1J1cHRlZDtcclxuXHJcbiAgICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICBpZiAoX215QWN0b3IuUGxheWVyVUlEID09IF9yZWNpdmVySUQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdF9TZWxlY3RQbGF5ZXJHZW5lcmljKCk7XHJcbiAgICAgICAgaWYgKF9pc0RpY2VSb2xsZWQpIHtcclxuICAgICAgICAgIGlmICghX2lzQmFua3J1cHRlZCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCldLkNhc2ggKz0gX2Nhc2hSZWNlaXZlZDtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSByZWNlaXZlZCBjYXNoIG9mICRcIiArIF9jYXNoUmVjZWl2ZWQgKyBcIiwgdG90YWwgY2FzaCBiZWNvbWVzICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKV0uQ2FzaCk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX2lzQmFua3J1cHRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIm90aGVyIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkLCB0dXJuIHdpbGwgY2hhbmdlIG5vdy5cIik7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBiZWVuIGdpdmVuIG93bmVyc2hpcCB0byBvbmUgb2YgdGhlIGJ1c2luZXNzIG9mIG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgICBfbWFuYWdlci5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUGF5QW1vdW50X0RhbWFnZURlY2lzaW9uKCkge1xyXG4gICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBfbXlBY3Rvci5QbGF5ZXJVSUQpIHtcclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggPj0gRGFtYWdlRGVjaXNpb25SZXN1bHQpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoIC09IERhbWFnZURlY2lzaW9uUmVzdWx0O1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVEaWNlUmVzdWx0U2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlTWFpblNjcmVlbl9EYW1hZ2VEZWNpc2lvbihmYWxzZSk7XHJcbiAgICAgICAgICBCYW5rUnVwdGVkQ2FyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBvZmYgYW1vdW50ICRcIiArIERhbWFnZURlY2lzaW9uUmVzdWx0ICsgXCIgLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCk7XHJcblxyXG4gICAgICAgICAgdmFyIF9zZW5kaW5nRGF0YSA9IHsgSUQ6IFNlbmRlckRhbWFnaW5nSUQsIENhc2g6IERhbWFnZURlY2lzaW9uUmVzdWx0LCBJc0RpY2VSb2xsZWQ6IHRydWUsIElzQmFua1J1cHRlZDogZmFsc2UgfTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjUsIF9zZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEJhbmtSdXB0ZWRDYXJkID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VsZWN0QnVzaW5lc3NGb3JIYWxmT3duZXJzaGlwX0RhbWFnaW5nRGVjaXNpb24oX3BsYXllckRhdGEsIF9idXNpbmVzc0luZGV4LCBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IDApIHtcclxuICAgIHRoaXMuRXhpdFNjcmVlbl9fQnVzaW5lc3NHZW5yaWMoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVyc0RhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mbztcclxuICAgIHZhciBfbXlEYXRhSW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgICB2YXIgX3R1cm4gPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgX3BsYXllcnNEYXRhW19teURhdGFJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwID0gdHJ1ZTtcclxuICAgIF9wbGF5ZXJzRGF0YVtfbXlEYXRhSW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gU2VuZGVyRGFtYWdpbmdJRDtcclxuICAgIF9wbGF5ZXJzRGF0YVtfbXlEYXRhSW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lck5hbWUgPSBfcGxheWVyc0RhdGFbX3R1cm5dLlBsYXllck5hbWU7XHJcblxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX3BsYXllcnNEYXRhW19teURhdGFJbmRleF0pO1xyXG5cclxuICAgIHRoaXMuVG9nZ2xlRGljZVJlc3VsdFNjcmVlbl9EYW1hZ2VEZWNpc2lvbihmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZU1haW5TY3JlZW5fRGFtYWdlRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZ2l2ZW4gb3duZXJzaGlwIG9mIG9uZSBvZiB5b3VyIGJ1c2luZXNzIHRvIG90aGVyIHBsYXllci5cIik7XHJcbiAgICB2YXIgX3NlbmRpbmdEYXRhID0geyBJRDogU2VuZGVyRGFtYWdpbmdJRCwgQ2FzaDogRGFtYWdlRGVjaXNpb25SZXN1bHQsIElzRGljZVJvbGxlZDogZmFsc2UsIElzQmFua1J1cHRlZDogZmFsc2UgfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjUsIF9zZW5kaW5nRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgR2l2ZVBhcnRuZXJTaGlwX0RhbWFnZURlY2lzaW9uKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJzRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvO1xyXG4gICAgdmFyIF9teURhdGFJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIHZhciBfYnVzaW5lc3NMZW5ndGggPSBfcGxheWVyc0RhdGFbX215RGF0YUluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG4gICAgdmFyIF9idXNpbmVzc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfcGxheWVyc0RhdGFbX215RGF0YUluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfcGxheWVyc0RhdGFbX215RGF0YUluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICBfYnVzaW5lc3NDb3VudGVyKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2J1c2luZXNzQ291bnRlciA+PSBfYnVzaW5lc3NMZW5ndGgpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJBbGwgb2YgeW91ciBleGlzdGluZyBidXNpbmVzc2VzIGFyZSB3aXRoIHBhcnRuZXJzaGlwIHdpdGggc29tZW9uZSwgeW91IGNhbm5vdCBzZWxlY3QgdGhpcyBvcHRpb24uXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5FbmFibGVCdXNpbmVzc1NjcmVlbl9EYW1hZ2VEZWNpc2lvbihmYWxzZSwgX3BsYXllcnNEYXRhW19teURhdGFJbmRleF0sIF9teURhdGFJbmRleCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXkgSGFsZiBidXNpbmVzc1xyXG4gIFRvZ2dsZVNjcmVlbl9CdXlIYWxmQnVzaW5lc3MoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1eUhhbGZCdXNpbmVzc1VJU2V0dXAuTWFpblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VGl0bGVUZXh0X0J1eUhhbGZCdXNpbmVzcyhfdHh0KSB7XHJcbiAgICB0aGlzLkJ1eUhhbGZCdXNpbmVzc1VJU2V0dXAuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdHh0O1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIFNob3dUb2FzdDogZnVuY3Rpb24gKG1lc3NhZ2UsIHRpbWUgPSBTaG9ydE1lc3NhZ2VUaW1lLCBfaGFzYnV0dG9uID0gdHJ1ZSkge1xyXG4gICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlBvcFVwVUlMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xyXG4gICAgdmFyIFNlbGZUb2FzdCA9IHRoaXM7XHJcbiAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKG1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3QgbW9kZSBvbmx5XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoID4gMCAmJiBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0uSXNCb3QpIHtcclxuICAgICAgICAvLyBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgIC8vICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICAgICAgLy8gICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuQ29tcGxldGVUb2FzdCgpO1xyXG4gICAgICAgIC8vICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUb2FzdCgpO1xyXG4gICAgICAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENvbXBsZXRlVG9hc3QoKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiY29tcGxldGUgdG9hc3QgY2FsbGVkXCIpO1xyXG4gICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gIH0sXHJcblxyXG4gIFNob3dSZXN1bHRTY3JlZW46IGZ1bmN0aW9uIChfc3RhdHVzLCBfZGF0YSkge1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLlJlc3VsdFNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLlN0YXR1c0xhYmVsLnN0cmluZyA9IF9zdGF0dXM7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuQm9keUxhYmVsLnN0cmluZyA9IF9kYXRhO1xyXG4gIH0sXHJcblxyXG4gIFJlc3RhcnRUaGVHYW1lKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRUb1N5bmNJbmZvKF9kYXRhSW5mbykge1xyXG4gICAgdmFyIF9tb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuXHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgdmFyIF9kYXRhID0geyBpbmZvOiBfZGF0YUluZm8gfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNSwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfbW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICB2YXIgX2RhdGEgPSB7IGluZm86IF9kYXRhSW5mbyB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTUsIF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG4iXX0=