
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
var LaonPartnershipArray = [];
var CompareDiceArray = [];
var TelevisionAdTimeout = null;
var SenderADPPlayer = null;
var VoteTimeout = null;
var VotesUpArray = [];
var VotesDownArray = [];
var SellAllBusinessArray = [];
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
var LaonPartnership = false;
var StartAnyBusinessWithoutCash = false;
var PreviousCash = 0;
var RemainingCash = 0;
var LoanSelectedPlayerData = null;
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
}); //-------------------------------------------class for CompitatorUISetup-------------------------//

var CompitatorUISetup = cc.Class({
  name: "CompitatorUISetup",
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
    },
    CompEditBox1: {
      displayName: "CompEditBox1",
      type: cc.EditBox,
      "default": null,
      serializable: true
    },
    CompEditBox2: {
      displayName: "CompEditBox2",
      type: cc.EditBox,
      "default": null,
      serializable: true
    },
    CompEditBox3: {
      displayName: "CompEditBox3",
      type: cc.EditBox,
      "default": null,
      serializable: true
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for TelevisionADUISetup-------------------------//

var TelevisionADUISetup = cc.Class({
  name: "TelevisionADUISetup",
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
    },
    MainEditBox: {
      displayName: "MainEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true
    },
    DecisionScreen: {
      displayName: "DecisionScreen",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    DecisionScreenText: {
      displayName: "DecisionScreenText",
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
    LoanPartnershipSetup: {
      "default": {},
      type: SelectPlayerGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class"
    },
    CompareDiceSetup: {
      "default": {},
      type: SelectPlayerGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class"
    },
    SellAllBusinessSetup: {
      "default": {},
      type: SelectBusinessGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class"
    },
    CompitatorSetupUI: {
      "default": {},
      type: CompitatorUISetup,
      serializable: true,
      tooltip: "reference of CompitatorUISetup class"
    },
    TelevisionADSetupUI: {
      "default": {},
      type: TelevisionADUISetup,
      serializable: true,
      tooltip: "reference of TelevisionADUISetup class"
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
    LoanPartnershipScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for LoanPartnership screen"
    },
    CompareDiceScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for CompareDice screen"
    },
    CompareDiceDecision1Screen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for CompareDice screen"
    },
    CompareDiceDecision2Screen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for CompareDice screen"
    },
    CompareDiceDecision2Text: {
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "Node reference for CompareDice label"
    },
    CompareDiceDecision2Button: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for CompareDice button"
    },
    SellAllBusinessScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SellAllBusiness screen"
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
    TelevisionAdTimeout = null;
    SenderADPPlayer = null;
    VoteTimeout = null;
    VotesUpArray = [];
    VotesDownArray = [];
    NextHalfPayDay = false;
    LaonPartnership = false;
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
    LaonPartnershipArray = [];
    CompareDiceArray = [];
    SellAllBusinessArray = [];
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
    RemainingCash = 0;
    LoanSelectedPlayerData = null;
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
  StartNewBusiness_BusinessSetup: function StartNewBusiness_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted, _BankruptAmount, _isCardFunctionality, _GivenCash, _StartAnyBusinessWithoutCash, _loanPartnership, _OtherplayerData) {
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

    if (_loanPartnership === void 0) {
      _loanPartnership = false;
    }

    if (_OtherplayerData === void 0) {
      _OtherplayerData = null;
    }

    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;
    BusinessSetupCardFunctionality = _isCardFunctionality;
    GivenCashBusiness = _GivenCash;
    StartAnyBusinessWithoutCash = _StartAnyBusinessWithoutCash;
    LaonPartnership = _loanPartnership;
    LoanSelectedPlayerData = _OtherplayerData;
    this.IsBankrupted = _isBankrupted;
    this.BankruptedAmount = _BankruptAmount;
    if (_isBankrupted) this.ResetTurnVariable();
    this.Init_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted, _loanPartnership);
  },
  Init_BusinessSetup: function Init_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted, _loanPartnership) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    if (modeIndex === void 0) {
      modeIndex = 0;
    }

    if (_isBankrupted === void 0) {
      _isBankrupted = false;
    }

    if (_loanPartnership === void 0) {
      _loanPartnership = false;
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
      this.ShowToast("You cannot take loan for current business setup or loan already taken.");
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
    PlayerDataIntance.LoanTaken = true;
    PlayerDataIntance.LoanAmount = PlayerBusinessDataIntance.LoanAmount;
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
            RemainingCash = PlayerDataIntance.Cash;
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
          RemainingCash = PlayerDataIntance.Cash;
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
      RemainingCash = 0;
      LoanSelectedPlayerData = null;
      LaonPartnership = false;
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
      if (LaonPartnership) {
        PlayerDataIntance.Cash = PreviousCash + RemainingCash;
      } else {
        PlayerDataIntance.Cash = PreviousCash;
      }

      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[InsideGameBusinessSetup] = PlayerDataIntance;
      this.BusinessSetupNode.active = false;
      InsideGameBusinessSetup = -1;
      BusinessSetupCardFunctionality = false;
      GivenCashBusiness = 0;
      StartAnyBusinessWithoutCash = false;
      LaonPartnership = false;
      RemainingCash = 0;
      LoanSelectedPlayerData = null;
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
        if (LaonPartnership) {
          PlayerBusinessDataIntance.LoanTaken = true;
          PlayerBusinessDataIntance.LoanAmount = 50000;
          PlayerDataIntance.LoanAmount = 50000;
          PlayerDataIntance.LoanTaken = true;
          PlayerBusinessDataIntance.IsPartnership = true;
          PlayerBusinessDataIntance.PartnerID = LoanSelectedPlayerData.PlayerUID;
          PlayerBusinessDataIntance.PartnerName = LoanSelectedPlayerData.PlayerName;
          var info = "You have been selected by player " + PlayerDataIntance.PlayerName + " to go into partnership in their business named " + PlayerBusinessDataIntance.BusinessName;
          this.RaiseEventToSyncInfo(info, LoanSelectedPlayerData.PlayerUID);
        }

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
          RemainingCash = 0;
          LoanSelectedPlayerData = null;
          LaonPartnership = false;
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
      RemainingCash = 0;
      LoanSelectedPlayerData = null;
      LaonPartnership = false;
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

      _this7.ToggleDecsion02Screen_CompareDice(false);

      _this7.ToggleDecsion01Screen_CompareDice(false);

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
        this.ToggleDecsion02Screen_CompareDice(false);
        this.ToggleDecsion01Screen_CompareDice(false);
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
    console.error("reecieved id: " + _data.PlayerUID);

    if (_data.PlayerUID == "") {
      this.ShowToast(_data.info, 2000, true);
    } else {
      var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

      if (mode == 2) //real players
        {
          var _myUID = GamePlayReferenceManager.Instance.Get_GameManager().GetMyPlayerUID();

          if (_myUID == _data.PlayerUID) {
            this.ShowToast(_data.info, 3000, true);
          } else {
            console.error("nothing");
          }
        }
    }
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
  //#region (generic player) Select Player to Take over business
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
    this.ResetSpaceScreen_LoanPartnership();
    this.ResetSpaceScreen_SelectPlayerTakeOver();
    this.ResetSpaceScreen_CompareDice();
    this.ToggleScreen_SelectPlayerTakeOver(false);
    this.ToggleScreen_SelectPlayerDamaging(false);
    this.ToggleScreen_LoanPartnership(false);
    this.ToggleScreen_CompareDice(false);
  },
  ExitAlongTurnOver_SelectPlayerGeneric: function ExitAlongTurnOver_SelectPlayerGeneric() {
    this.ResetSpaceScreen_SelectPlayerDamaging();
    this.ResetSpaceScreen_LoanPartnership();
    this.ResetSpaceScreen_SelectPlayerTakeOver();
    this.ResetSpaceScreen_CompareDice();
    this.ToggleScreen_SelectPlayerTakeOver(false);
    this.ToggleScreen_SelectPlayerDamaging(false);
    this.ToggleScreen_LoanPartnership(false);
    this.ToggleScreen_CompareDice(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  //#region (generic business) Select Business to take over
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
    this.ToggleBusinessScreen_DamageDecision(false);
    this.ToggleScreen_BusinessTakeOver(false);
    this.ToggleScreen_SellAllBusiness(false);
    this.ResetSpaceScreen_SellAllBusiness();
  },
  ExitScreenAlongTurnOver__BusinessGenric: function ExitScreenAlongTurnOver__BusinessGenric() {
    this.Reset__DamageDecision();
    this.Reset_BusinessTakeOver();
    this.ToggleScreen_BusinessTakeOver(false);
    this.ToggleScreen_SellAllBusiness(false);
    this.ToggleBusinessScreen_DamageDecision(false);
    this.ResetSpaceScreen_SellAllBusiness();
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
  SetBankruptedVar: function SetBankruptedVar(_val) {
    BankRuptedCard = _val;
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
  //#region Taking loan for partnership
  ToggleScreen_LoanPartnership: function ToggleScreen_LoanPartnership(_state) {
    this.LoanPartnershipScreen.active = _state;
  },
  SetUpSpaceScreen_LoanPartnership: function SetUpSpaceScreen_LoanPartnership(_myData, _actorsData, _isTurnOver, _modeIndex) {
    if (_modeIndex === void 0) {
      _modeIndex = 0;
    }

    console.error(_actorsData);
    this.LoanPartnershipSetup.TitleLabel.string = "SELECT PLAYER";
    this.LoanPartnershipSetup.CashLabel.string = "$" + _myData.Cash;
    this.LoanPartnershipSetup.PlayerNameLabel.string = _myData.PlayerName;
    this.LoanPartnershipSetup.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;
    var _mainData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    if (_modeIndex == 2) {
      for (var index = 0; index < _actorsData.length; index++) {
        if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) {
          //check if player is spectate or not, dont add any spectates
          if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
            var node = cc.instantiate(this.LoanPartnershipSetup.DetailsPrefab);
            node.parent = this.LoanPartnershipSetup.ScrollContent;
            node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
            node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);

            for (var k = 0; k < _mainData.length; k++) {
              if (_mainData[k].PlayerUID == _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
                node.getComponent("PlayerDetails").setPlayerIndex(k);
                break;
              }
            }

            LaonPartnershipArray.push(node);
          }
        }
      }
    } else if (_modeIndex == 1) {
      //for bot
      console.error(_actorsData);
      console.error(_myData);

      for (var _index6 = 0; _index6 < _actorsData.length; _index6++) {
        if (_myData.PlayerUID != _actorsData[_index6].PlayerUID) {
          var node = cc.instantiate(this.LoanPartnershipSetup.DetailsPrefab);
          node.parent = this.LoanPartnershipSetup.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[_index6].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[_index6].PlayerUID);
          LaonPartnershipArray.push(node);
        }
      }
    }

    if (_isTurnOver) {
      this.LoanPartnershipSetup.ExitButton.active = false;
      this.LoanPartnershipSetup.TurnOverExitButton.active = true;
    } else {
      this.LoanPartnershipSetup.ExitButton.active = true;
      this.LoanPartnershipSetup.TurnOverExitButton.active = false;
    }
  },
  ResetSpaceScreen_LoanPartnership: function ResetSpaceScreen_LoanPartnership() {
    for (var index = 0; index < LaonPartnershipArray.length; index++) {
      LaonPartnershipArray[index].destroy();
    }

    LaonPartnershipArray = [];
  },
  //#endregion
  //#region Sell all business except one
  ToggleScreen_SellAllBusiness: function ToggleScreen_SellAllBusiness(_state) {
    this.SellAllBusinessScreen.active = _state;
  },
  EnableScreen__SellAllBusiness: function EnableScreen__SellAllBusiness(_isTurnover, _playerData, _playerIndex) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    if (_playerData === void 0) {
      _playerData = null;
    }

    if (_playerIndex === void 0) {
      _playerIndex = 0;
    }

    if (_isTurnover) {
      this.SellAllBusinessSetup.ExitButton.active = false;
      this.SellAllBusinessSetup.TurnOverExitButton.active = true;
    } else {
      this.SellAllBusinessSetup.ExitButton.active = true;
      this.SellAllBusinessSetup.TurnOverExitButton.active = false;
    }

    this.ToggleScreen_SellAllBusiness(true);
    this.SetBusinessUI_SellAllBusiness(_playerData, _playerIndex);
  },
  SetBusinessUI_SellAllBusiness: function SetBusinessUI_SellAllBusiness(_playerData, _OtherPlayerIndex) {
    if (_OtherPlayerIndex === void 0) {
      _OtherPlayerIndex = 0;
    }

    this.ResetSpaceScreen_SellAllBusiness();

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = _playerData;
    console.log(_tempData);
    this.SellAllBusinessSetup.TitleLabel.string = "BUSINESS";
    this.SellAllBusinessSetup.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.SellAllBusinessSetup.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;
    this.SellAllBusinessSetup.BusinessCountLabel.string = "No of Businesses : " + _playerData.NoOfBusiness.length;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.SellAllBusinessSetup.BusinessPrefab);
      node.parent = this.SellAllBusinessSetup.ScrollContentNode;
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
      SellAllBusinessArray.push(node);
    }
  },
  ResetSpaceScreen_SellAllBusiness: function ResetSpaceScreen_SellAllBusiness() {
    for (var index = 0; index < SellAllBusinessArray.length; index++) {
      SellAllBusinessArray[index].destroy();
    }

    SellAllBusinessArray = [];
  },
  //#endregion
  //#region Select Player to compare dice roll
  ToggleScreen_CompareDice: function ToggleScreen_CompareDice(_state) {
    this.CompareDiceScreen.active = _state;
  },
  SetUpSpaceScreen_CompareDice: function SetUpSpaceScreen_CompareDice(_myData, _actorsData, _isTurnOver, _modeIndex) {
    if (_modeIndex === void 0) {
      _modeIndex = 0;
    }

    console.error(_actorsData);
    this.CompareDiceSetup.TitleLabel.string = "SELECT PLAYER";
    this.CompareDiceSetup.CashLabel.string = "$" + _myData.Cash;
    this.CompareDiceSetup.PlayerNameLabel.string = _myData.PlayerName;
    this.CompareDiceSetup.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;
    var _mainData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    if (_modeIndex == 2) {
      for (var index = 0; index < _actorsData.length; index++) {
        if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) {
          //check if player is spectate or not, dont add any spectates
          if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
            var node = cc.instantiate(this.CompareDiceSetup.DetailsPrefab);
            node.parent = this.CompareDiceSetup.ScrollContent;
            node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
            node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);

            for (var k = 0; k < _mainData.length; k++) {
              if (_mainData[k].PlayerUID == _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
                node.getComponent("PlayerDetails").setPlayerIndex(k);
                break;
              }
            }

            CompareDiceArray.push(node);
          }
        }
      }
    } else if (_modeIndex == 1) {
      //for bot
      console.error(_actorsData);
      console.error(_myData);

      for (var _index7 = 0; _index7 < _actorsData.length; _index7++) {
        if (_myData.PlayerUID != _actorsData[_index7].PlayerUID) {
          var node = cc.instantiate(this.CompareDiceSetup.DetailsPrefab);
          node.parent = this.CompareDiceSetup.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[_index7].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[_index7].PlayerUID);
          CompareDiceArray.push(node);
        }
      }
    }

    if (_isTurnOver) {
      this.CompareDiceSetup.ExitButton.active = false;
      this.CompareDiceSetup.TurnOverExitButton.active = true;
    } else {
      this.CompareDiceSetup.ExitButton.active = true;
      this.CompareDiceSetup.TurnOverExitButton.active = false;
    }
  },
  ResetSpaceScreen_CompareDice: function ResetSpaceScreen_CompareDice() {
    for (var index = 0; index < CompareDiceArray.length; index++) {
      CompareDiceArray[index].destroy();
    }

    CompareDiceArray = [];
  },
  ToggleDecsion01Screen_CompareDice: function ToggleDecsion01Screen_CompareDice(_state) {
    this.CompareDiceDecision1Screen.active = _state;
  },
  ToggleDecsion02Screen_CompareDice: function ToggleDecsion02Screen_CompareDice(_state) {
    this.CompareDiceDecision2Screen.active = _state;
  },
  ChangeTitle_Decsion02Screen_CompareDice: function ChangeTitle_Decsion02Screen_CompareDice(_msg) {
    this.CompareDiceDecision2Text.string = _msg;
  },
  ToggleDecsion02ScreenButton_CompareDice: function ToggleDecsion02ScreenButton_CompareDice(_state) {
    this.CompareDiceDecision2Button.active = _state;
  },
  //#endregion
  //#region Naming game compitators
  ToggleScreen_CompitatorUI: function ToggleScreen_CompitatorUI(_state) {
    this.CompitatorSetupUI.MainScreen.active = _state;
    this.CompitatorSetupUI.CompEditBox1.string = "";
    this.CompitatorSetupUI.CompEditBox2.string = "";
    this.CompitatorSetupUI.CompEditBox3.string = "";
  },
  ChangeTitle_CompitatorUI: function ChangeTitle_CompitatorUI(_msg) {
    this.CompitatorSetupUI.TitleLabel.string = _msg;
  },
  OnDoneClicked_CompitatorUI: function OnDoneClicked_CompitatorUI() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var text1 = this.CompitatorSetupUI.CompEditBox1.string;
    var text2 = this.CompitatorSetupUI.CompEditBox2.string;
    var text3 = this.CompitatorSetupUI.CompEditBox3.string;

    var _playerIndex = _manager.GetTurnNumber();

    var _marketingAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
    var TextArray = [text1, text2, text3];
    var _checkCounter = 0;
    var _tempCounter = 0;

    for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
      if (_manager.PlayerGameInfo[index].IsActive && _playerIndex != index) _checkCounter++;
    }

    for (var _index8 = 0; _index8 < _manager.PlayerGameInfo.length; _index8++) {
      for (var j = 0; j < TextArray.length; j++) {
        if (TextArray[j].toLowerCase() == _manager.PlayerGameInfo[_index8].PlayerName.toLowerCase()) {
          _tempCounter++;
          break;
        }
      }
    }

    if (_tempCounter >= _checkCounter && _tempCounter != 0 && _checkCounter != 0) {
      console.log("You freakin won");
      var profit = _marketingAmount + _marketingAmount * 5;
      _manager.PlayerGameInfo[_playerIndex].MarketingAmount = 0;
      _manager.PlayerGameInfo[_playerIndex].Cash += profit;
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You were successful and received 500% profit on your marketing amount, your cash becomes $" + _manager.PlayerGameInfo[_playerIndex].Cash);
    } else {
      _manager.PlayerGameInfo[_playerIndex].MarketingAmount = 0;
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have failed and have lost your marketing amount.");
    }

    this.ExitAlongTurnOver_CompitatorUI();
  },
  ExitAlongTurnOver_CompitatorUI: function ExitAlongTurnOver_CompitatorUI() {
    this.ToggleScreen_CompitatorUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  //#region Creating Ad description for everyone to vote
  ToggleScreen_TelevisionADSetup: function ToggleScreen_TelevisionADSetup(_state) {
    this.TelevisionADSetupUI.MainScreen.active = _state;
    this.TelevisionADSetupUI.MainEditBox.string = "";
  },
  ToggleDecisionScreen_TelevisionADSetup: function ToggleDecisionScreen_TelevisionADSetup(_state) {
    this.TelevisionADSetupUI.DecisionScreen.active = _state;
  },
  ChangeDecisionScreenText_TelevisionADSetup: function ChangeDecisionScreenText_TelevisionADSetup(_txt) {
    this.TelevisionADSetupUI.DecisionScreenText.string = _txt;
  },
  OnDoneClicked_TelevisionADSetup: function OnDoneClicked_TelevisionADSetup() {
    var _this9 = this;

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = _manager.GetTurnNumber();

    var text1 = this.TelevisionADSetupUI.MainEditBox.string;
    var _marketingAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
    clearTimeout(TelevisionAdTimeout);

    if (text1 == "") {
      this.ShowToast("Please enter description for your commercial.");
    } else {
      var _sentdata = {
        Player: _manager.PlayerGameInfo[_playerIndex],
        Description: text1
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(29, _sentdata);
      VotesUpArray = [];
      VotesDownArray = [];
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(true);
      TelevisionAdTimeout = setTimeout(function () {
        _this9.FailedScreen_TelevisionADSetup();
      }, 25000);
    }
  },
  FailedScreen_TelevisionADSetup: function FailedScreen_TelevisionADSetup() {
    clearTimeout(TelevisionAdTimeout);

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = _manager.GetTurnNumber();

    this.ShowToast("Either time has been passed for voting or you have failed to leave positive impression on others, you have lost your marketing account.");
    _manager.PlayerGameInfo[_playerIndex].MarketingAmount = 0;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(false);
    this.ExitAlongTurnOver_TelevisionADSetup();
  },
  SuccessScreen_TelevisionADSetup: function SuccessScreen_TelevisionADSetup() {
    clearTimeout(TelevisionAdTimeout);

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = _manager.GetTurnNumber();

    var _marketingAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
    var profit = _marketingAmount + _marketingAmount * 6;
    _manager.PlayerGameInfo[_playerIndex].MarketingAmount = 0;
    _manager.PlayerGameInfo[_playerIndex].Cash += profit;
    this.ShowToast("You have succeed putting positive impression, you have received 600% profit of your marketing amount, your cash becomes $" + _manager.PlayerGameInfo[_playerIndex].Cash);
    _manager.PlayerGameInfo[_playerIndex].MarketingAmount = 0;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(false);
    this.ExitAlongTurnOver_TelevisionADSetup();
  },
  ExitAlongTurnOver_TelevisionADSetup: function ExitAlongTurnOver_TelevisionADSetup() {
    this.ToggleScreen_TelevisionADSetup(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  ReceiveEvent_TelevisionADSetup: function ReceiveEvent_TelevisionADSetup(_data) {
    var _this10 = this;

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
      clearTimeout(VoteTimeout);
      var _senderPlayerData = _data.Player;
      var _des = _data.Description;
      SenderADPPlayer = _senderPlayerData;
      this.ToggleDecisionScreen_TelevisionADSetup(true);
      this.ChangeDecisionScreenText_TelevisionADSetup(_des);
      VoteTimeout = setTimeout(function () {
        _this10.ToggleDecisionScreen_TelevisionADSetup(false);
      }, 24000);
    }
  },
  VoteUpDecision_TelevisionADSetup: function VoteUpDecision_TelevisionADSetup() {
    clearTimeout(VoteTimeout);
    var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    this.ToggleDecisionScreen_TelevisionADSetup(false);
    var _sentdata = {
      SenderID: _myActor.PlayerUID,
      ReciverID: SenderADPPlayer.PlayerUID,
      VoteUp: true
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(30, _sentdata);
  },
  VoteDownDecision_TelevisionADSetup: function VoteDownDecision_TelevisionADSetup() {
    clearTimeout(VoteTimeout);
    var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    this.ToggleDecisionScreen_TelevisionADSetup(false);
    var _sentdata = {
      SenderID: _myActor.PlayerUID,
      ReciverID: SenderADPPlayer.PlayerUID,
      VoteUp: false
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(30, _sentdata);
  },
  ReceiveEvent_VoteTelevisionADSetup: function ReceiveEvent_VoteTelevisionADSetup(_data) {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
      var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
      var _myID = _data.ReciverID;
      var _otherID = _data.SenderID;
      var _voteUp = _data.VoteUp;

      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = _manager.GetTurnNumber();

      var _totalPlayer = 0;

      if (_myActor.PlayerUID == _myID) {
        if (_voteUp) VotesUpArray.push(_otherID);else VotesDownArray.push(_otherID);

        for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
          if (_manager.PlayerGameInfo[index].IsActive && index != _playerIndex) _totalPlayer++;
        }

        var _RecievedVotes = VotesUpArray.length + VotesDownArray.length;

        console.log(_RecievedVotes);
        console.log(VotesUpArray);
        console.log(VotesDownArray);
        console.log(_totalPlayer);

        if (_RecievedVotes >= _totalPlayer) {
          if (VotesUpArray.length > VotesDownArray.length) this.SuccessScreen_TelevisionADSetup();else this.FailedScreen_TelevisionADSetup();
        }
      }
    }
  },
  //#endregion
  ShowToast: function ShowToast(message, time, _hasbutton) {
    var _this11 = this;

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
            _this11.CompleteToast();
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
            _this11.CompleteToast();
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
  RaiseEventToSyncInfo: function RaiseEventToSyncInfo(_dataInfo, _toPlayerUID) {
    if (_toPlayerUID === void 0) {
      _toPlayerUID = "";
    }

    var _mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

    if (_mode == 2) {
      //for real players
      var _data = {
        info: _dataInfo,
        PlayerUID: _toPlayerUID
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(15, _data);
    } else if (_mode == 1) {
      //for bot
      if (this.IsBotTurn) {
        var _data = {
          info: _dataInfo,
          PlayerUID: _toPlayerUID
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkRhbWFnZURlY2lzaW9uUmVzdWx0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiYnVzaW5lc3NEZXRhaWxOb2RlcyIsIlNlbmRlckRhbWFnaW5nSUQiLCJidXNpbmVzc1Rha2VPdmVyTm9kZXMiLCJidXNpbmVzc0RhbWFnaW5nTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwic2VsZWN0UGxheWVyUHJvZml0Tm9kZXMiLCJzZWxlY3RlZFBsYXllclRha2VPdmVyIiwic2VsZWN0ZWRQbGF5ZXJEYW1hZ2luZyIsIkxhb25QYXJ0bmVyc2hpcEFycmF5IiwiQ29tcGFyZURpY2VBcnJheSIsIlRlbGV2aXNpb25BZFRpbWVvdXQiLCJTZW5kZXJBRFBQbGF5ZXIiLCJWb3RlVGltZW91dCIsIlZvdGVzVXBBcnJheSIsIlZvdGVzRG93bkFycmF5IiwiU2VsbEFsbEJ1c2luZXNzQXJyYXkiLCJidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMiLCJidXNpbmVzc0RldGFpbFBheURheU5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJMYW9uUGFydG5lcnNoaXAiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJSZW1haW5pbmdDYXNoIiwiTG9hblNlbGVjdGVkUGxheWVyRGF0YSIsIlRpbWVvdXRSZWYiLCJDb21wbGV0aW9uV2luZG93VGltZSIsIkxvbmdNZXNzYWdlVGltZSIsIlNob3J0TWVzc2FnZVRpbWUiLCJnbG9iYWxUdXJuVGltZXIiLCJQYXlEYXlJbmZvIiwiSW52ZXN0U2VsbEluZm8iLCJUaW1lclRpbWVvdXQiLCJEb3VibGVEYXlCdXNpbmVzc0hCIiwiRG91YmxlRGF5QnVzaW5lc3NCTSIsIkdpdmVQcm9maXRVc2VySUQiLCJUb3RhbFBheURheSIsIkJhbmtSdXB0ZWRDYXJkIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsIkFkZEJ1dHRvbk5vZGUiLCJBZGRDYXNoU2NyZWVuIiwiQWRkQ2FzaExhYmVsIiwiQWRkQ2FzaEVkaXRCb3giLCJjdG9yIiwiQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwic3RyaW5nIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIk1hcmtldGluZ0VkaXRCb3giLCJHb2xkRWRpdEJveCIsIlN0b2NrRWRpdEJveCIsIkNhc2hBbW91bnRMYWJlbCIsIkV4cGFuZEJ1c2luZXNzTm9kZSIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiUHJlZmFiIiwiVGltZXJUZXh0IiwiQmxvY2tlck5vZGUiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIlBhc3NlZFBheURheUNvdW50TGFiZWwiLCJIb21lQmFzZWRCdG4iLCJCTUJ0biIsIkxvYW5CdG4iLCJNYWluUGFuZWxOb2RlIiwiUmVzdWx0UGFuZWxOb2RlIiwiTG9hblJlc3VsdFBhbmVsTm9kZSIsIlJlc3VsdFNjcmVlblRpdGxlTGFiZWwiLCJUb3RhbEJ1c2luZXNzTGFiZWwiLCJUb3RhbEFtb3VudExhYmVsIiwiU2tpcExvYW5CdXR0b24iLCJMb2FuRm90dGVyTGFiZWwiLCJJbnZlc3RVSSIsIkJ1eU9yU2VsbFVJIiwiT25lUXVlc3Rpb25VSSIsIlBsYXllckRldGFpbExhYmVsIiwiRGV0YWlsc1ByZWZhYiIsIlNjcm9sbENvbnRlbnQiLCJXYWl0aW5nU2NyZWVuIiwiV2FpdGluZ1NjcmVlbkxhYmVsIiwiRGVjaXNpb25UaXRsZUxhYmVsIiwiRGVjaXNpb25DYXNoTGFiZWwiLCJEZWNpc2lvblBsYXllck5hbWVMYWJlbCIsIkRlY2lzaW9uUXVlc3Rpb25MYWJlbCIsIlBhcnRuZXJzaGlwVUkiLCJXYWl0aW5nU3RhdHVzU2NyZWVuIiwiTWFpblNjcmVlbiIsIlRpdGxlTmFtZSIsIlBsYXllck5hbWUiLCJQbGF5ZXJDYXNoIiwiUGFydG5lclNoaXBQcmVmYWIiLCJEZWNpc2lvblNjcmVlbiIsIkRlY2lzaW9uUGxheWVyTmFtZSIsIkRlY2lzaW9uUGxheWVyQ2FzaCIsIkRlY2lzaW9uRGVzY3JpcHRpb24iLCJSZXN1bHRVSSIsIlJlc3VsdFNjcmVlbiIsIlN0YXR1c0xhYmVsIiwiQm9keUxhYmVsIiwiQnVzaW5lc3NQYXlEYXlTZXR1cFVJIiwiVGl0bGVDb250ZW50TGFiZWwiLCJCdXNpbmVzc1ByZWZhYiIsIlNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUkiLCJTZWxlY3RQbGF5ZXJHZW5lcmljIiwiU2VsZWN0QnVzaW5lc3NHZW5lcmljIiwiRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXAiLCJEaWNlUmVzdWx0U2NyZWVuIiwiQnVzaW5lc3NTZWxlY3RTY3JlZW4iLCJEYW1hZ2VCdXNpbmVzc1NlbGVjdCIsIkJ1eUhhbGZCdXNpbmVzc1NldHVwVUkiLCJDb21waXRhdG9yVUlTZXR1cCIsIkNvbXBFZGl0Qm94MSIsIkNvbXBFZGl0Qm94MiIsIkNvbXBFZGl0Qm94MyIsIlRlbGV2aXNpb25BRFVJU2V0dXAiLCJNYWluRWRpdEJveCIsIkRlY2lzaW9uU2NyZWVuVGV4dCIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSEJEaWNlQ291bnRlciIsIkJNRGljZUNvdW50ZXIiLCJOZXh0SGFsZlBheURheSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJPbmVRdWVzdGlvblNldHVwVUkiLCJQYXJ0bmVyc2hpcFNldHVwVUkiLCJSZXN1bHRTZXR1cFVJIiwiQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0VUkiLCJTZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwIiwiU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cCIsIkRlY2lzaW9uRGFtYWdpbmdTZXR1cCIsIlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIiLCJCdXlIYWxmQnVzaW5lc3NVSVNldHVwIiwiTG9hblBhcnRuZXJzaGlwU2V0dXAiLCJDb21wYXJlRGljZVNldHVwIiwiU2VsbEFsbEJ1c2luZXNzU2V0dXAiLCJDb21waXRhdG9yU2V0dXBVSSIsIlRlbGV2aXNpb25BRFNldHVwVUkiLCJQb3BVcFVJIiwiUG9wVXBVSUxhYmVsIiwiUG9wVXBVSUJ1dHRvbiIsIkdhbWVwbGF5VUlTY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiQnVzaW5lc3NEb3VibGVQYXlTY3JlZW4iLCJPbmVRdWVzdGlvblNwYWNlU2NyZWVuIiwiT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbiIsIlNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbiIsIlNlbGVjdFBsYXllclRha2VPdmVyU2NyZWVuIiwiU2VsZWN0UGxheWVyRGFtYWdpbmdTY3JlZW4iLCJMb2FuUGFydG5lcnNoaXBTY3JlZW4iLCJDb21wYXJlRGljZVNjcmVlbiIsIkNvbXBhcmVEaWNlRGVjaXNpb24xU2NyZWVuIiwiQ29tcGFyZURpY2VEZWNpc2lvbjJTY3JlZW4iLCJDb21wYXJlRGljZURlY2lzaW9uMlRleHQiLCJDb21wYXJlRGljZURlY2lzaW9uMkJ1dHRvbiIsIlNlbGxBbGxCdXNpbmVzc1NjcmVlbiIsIlNlbGVjdEJ1c2luZXNzVGFrZU92ZXJTY3JlZW4iLCJJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIiwiVGVtcERpY2VUZXh0IiwiTGVhdmVSb29tQnV0dG9uIiwiQXZhdGFyU3ByaXRlcyIsIlNwcml0ZUZyYW1lIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRUdXJuVmFyaWFibGUiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3luY0RhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJvbkxvYWQiLCJJc0JvdFR1cm4iLCJQYXlEYXlDb3VudCIsIkRvdWJsZVBheURheUNvdW50IiwiSXNCYW5rcnVwdGVkIiwiQmFua3J1cHRlZEFtb3VudCIsIkFkZENhc2hBbW91bnQiLCJUaW1lciIsIlRpbWVyU3RhcnRlZCIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiX3N0YXRlIiwiYWN0aXZlIiwiRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSIsIkluc3RhbmNlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiRGlzY29ubmVjdFBob3RvbiIsInNldFRpbWVvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJUb2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAiLCJFbmFibGVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiT25DYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfdmFsIiwiT25DbGlja0RvbmVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfZ2FtZWNhc2giLCJwYXJzZUludCIsIl9hbW91bnQiLCJ1bmRlZmluZWQiLCJDYXNoIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwiVXBkYXRlVXNlckRhdGEiLCJTaG93VG9hc3QiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJpc0ZpcnN0VGltZSIsImluc2lkZUdhbWUiLCJtb2RlSW5kZXgiLCJfaXNCYW5rcnVwdGVkIiwiX0JhbmtydXB0QW1vdW50IiwiX2lzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfR2l2ZW5DYXNoIiwiX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIl9sb2FuUGFydG5lcnNoaXAiLCJfT3RoZXJwbGF5ZXJEYXRhIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiQnVzaW5lc3NJbmZvIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwibGVuZ3RoIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cCIsIkF2YXRhcklEIiwiYXZhdGFySWQiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsImlzTmFOIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIk9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsIkhvbWVCYXNlZCIsIk9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiYnJpY2tBbmRtb3J0YXIiLCJhbW91bnQiLCJDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAiLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJOb09mQnVzaW5lc3MiLCJMb2FuVGFrZW4iLCJNYXRoIiwiYWJzIiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiUHVzaERhdGFGb3JQbGF5ZXJMZWZ0IiwiX2RhdGEiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIl9wbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllcklEIiwiSG9tZUJhc2VkQW1vdW50IiwiSXNBY3RpdmUiLCJfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsInB1c2giLCJSYWlzZUV2ZW50IiwiX0lEIiwiX3BsYXllckxlZnQiLCJfaXNTcGVjdGF0ZSIsIlBob3RvbkFjdG9yIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJNYXhQbGF5ZXJzIiwiR2V0UmVhbEFjdG9ycyIsImFjdG9yTnIiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYnVzaW5lc3NOYW1lIiwiX2lzSG9tZUJhc2VkIiwiU3RhcnRHYW1lIiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJFeGl0X0J1c2luZXNzU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJHZXRUdXJuTnVtYmVyIiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc1BhcnRuZXJzaGlwIiwiUGFydG5lcklEIiwiUGFydG5lck5hbWUiLCJpbmZvIiwiUmFpc2VFdmVudFRvU3luY0luZm8iLCJJc0JvdCIsImlzYWN0aXZlIiwiX2FjdGl2ZSIsImNsZWFyVGltZW91dCIsIlVwZGF0ZVRpbWVyIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiQ2hlY2tNYXJrZXRpbmdBbW91bnRTaGFyZV9DYXJkRnVuY3Rpb25hbGl0eSIsIl9tYW5hZ2VyIiwiX3BsYXllckluZGV4IiwiSGFzTWFya2V0aW5nQ29tcGFueSIsIlJhaXNlRXZlbnRGb3JNYXJrZXRpbmdTaGFyZSIsIl9hbW50IiwiX2lkIiwiX21zZyIsIklEIiwibXNnIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIl9pc1R1cm5PdmVyIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiUm9sbE9uZURpY2UiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAiLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiUmVzZXRfUGFydG5lclNoaXBTZXR1cCIsIl90ZW1wRGF0YSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldE5hbWUiLCJTZXRUeXBlIiwiU2V0QnVzaW5lc3NJbmRleCIsIl90b3RhbExvY2F0aW9ucyIsIkxvY2F0aW9uc05hbWUiLCJTZXRCdXNpbmVzc01vZGUiLCJTZXRNb2RlIiwiU2V0QnVzaW5lc3NWYWx1ZSIsIlNldEZpbmFsQnVzaW5lc3NWYWx1ZSIsIl9hbGxMb2NhdGlvbnNBbW91bnQiLCJfZmluYWxBbW91bnQiLCJTZXRCYWxhbmNlIiwiU2V0TG9jYXRpb25zIiwiVG9nZ2xlUGFydG5lclNoaXBCdXR0b24iLCJTZXRQYXJ0bmVyTmFtZSIsIkVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cCIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkV4aXRfUGFydG5lclNoaXBTZXR1cCIsImRlc3Ryb3kiLCJSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cCIsIl9hY3RvciIsIl90dXJuIiwiVHVybiIsIl9wbGF5ZXJEYXRhIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJfYnVzaW5lc3NWYWx1ZSIsIkJ1c1ZhbHVlIiwiX3BheUFtb3VudCIsIl9idXNpbmVzc01vZGUiLCJDaGVja1NwZWN0YXRlIiwiQWNjZXB0T2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hbGxBY3RvcnMiLCJSb29tQWN0b3JzIiwibXlJbmRleCIsIkdldE15SW5kZXgiLCJSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIkNhbmNlbE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfaXNBY2NlcHRlZCIsIl9wYXltZW50IiwiX2lzQ2FuY2VsbGVkIiwiX3VJRCIsIl9tYWluRGF0YSIsIkFjY2VwdGVkIiwiQ2FzaFBheW1lbnQiLCJDYW5jZWxsZWQiLCJCdXNpbmVzc0luZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9hY2NlcHRlZCIsIl9jYXNoIiwiX2NhbmNlbGxlZCIsIl91aWQiLCJpbmNsdWRlcyIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiRXhpdEJ1dHRvbl9JbnZlc3RTZWxsIiwiVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSIsIlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSIsIlVwZGF0ZUJ1dHRvbnNfUGF5RGF5IiwibG9hblRha2VuIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwiR2V0TG9hbkFtb3VudF9QYXlEYXkiLCJfbG9hbiIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiX2lzRG91YmxlUGF5RGF5IiwiX3NraXBITSIsIl9za2lwQk0iLCJfaXNCb3QiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9oTUFtb3VudCIsIl9ibUFtb3VudCIsIl9ibUxvY2F0aW9uIiwiUGF5ZGF5Q291bnRlciIsIkRvdWJsZVBheUNvdW50ZXIiLCJfaGFsZlBheWRheSIsIkNhbkdpdmVQcm9maXRPblBheURheSIsIlVzZXJJREZvclByb2ZpdFBheURheSIsIlJlY2VpdmVEb3VibGVQYXlEYXkiLCJfcmVzIiwiX3RpbWUiLCJVcGRhdGVDYXNoX1BheURheSIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGF5RGF5Q29tcGxldGVkIiwiT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RvdWJsZVBheURheSIsIl9kaWNlIiwiX2Ftb3VudFRvQmVTZW5kIiwiX2Ftb3VudFRvQmVBZGp1c3RlZCIsIl9tdWx0aXBsaWVyIiwiX3BheWRheW11bHRpcGxpZXIiLCJkb3VibGVQYXlEYXlBZGRlZCIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfbG9jYXRpb25zIiwiX0VzdGltYXRlTG9hbiIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlByb2Nlc3NCYW5rcnVwdCIsIl9zaG93VGV4dCIsIl90eHQiLCJFeGl0X1NlbGVjdFBsYXllckdlbmVyaWMiLCJFeGl0U2NyZWVuX19CdXNpbmVzc0dlbnJpYyIsIlRvZ2dsZURlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZSIsIlRvZ2dsZURlY3Npb24wMVNjcmVlbl9Db21wYXJlRGljZSIsIlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24iLCJUb2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uIiwiVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyIsImVtaXQiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU3RhcnROZXdHYW1lX1BheURheSIsIm1vZGUiLCJfc2VuZGluZ0RhdGEiLCJJc0RpY2VSb2xsZWQiLCJJc0JhbmtSdXB0ZWQiLCJfbXlBY3RvciIsInBsYXllckRhdGEiLCJCYW5rcnVwdGVkTmV4dFR1cm4iLCJTdGFydE5ld0dhbWVfQmFua1J1cHRlZCIsIlNob3dJbmZvIiwiX215VUlEIiwiR2V0TXlQbGF5ZXJVSUQiLCJSYWlzZUV2ZW50Rm9yQ29tcGxldGlvbiIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlciIsIlRvZ2dsZUhhbGZQYXlOZXh0VHVybiIsImNhbGxVcG9uQ2FyZCIsIlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwIiwiU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwIiwiX3NlbGxBbW91bnQiLCJSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwIiwiU2V0U2VsbGluZ0Ftb3VudCIsIlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbiIsIlNldEJ1c2luZXNzVUlfQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwIiwiQW1vdW50IiwiU2VsZWN0QnVzaW5lc3Nmb3JQYXlEYXkiLCJfaXNUdXJub3ZlciIsIkVuYWJsZU1hbmlwaWxhdGlvblNjcmVlbl9fQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkiLCJUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwiU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNob3dRdWVzdGlvblRvYXN0IiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfbXlEYXRhIiwiX2FjdG9yc0RhdGEiLCJfbW9kZUluZGV4IiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAiLCJFZGl0VGl0bGVfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiX21haW5UaXRsZSIsIl90aWxlQ29udGVudCIsIkV4aXRTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAiLCJFeGl0U2NyZWVuX0Fsb25nVHVybk92ZXJfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIl9idXNpbmVzc1R5cGUiLCJFbmFibGVTZWxldGl2ZURvdWJsZVBheURheV9CdXNpbmVzc1BheURheVVJU2V0dXAiLCJfaXNCcmlja0FuZE1vcnRhciIsIlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJTZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiRXhpdF9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIiLCJTZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyIiwiX2J1eUhhbGZCdXNpbmVzcyIsInNldEJ1eUhhbGYiLCJrIiwic2V0UGxheWVySW5kZXgiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyIiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyIsIlJlc2V0U3BhY2VTY3JlZW5fTG9hblBhcnRuZXJzaGlwIiwiUmVzZXRTcGFjZVNjcmVlbl9Db21wYXJlRGljZSIsIlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyIsIlRvZ2dsZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAiLCJUb2dnbGVTY3JlZW5fQ29tcGFyZURpY2UiLCJFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJHZW5lcmljIiwiVG9nZ2xlU2NyZWVuX0J1c2luZXNzVGFrZU92ZXIiLCJTZXRCdXNpbmVzc1VJX0J1c2luZXNzVGFrZU92ZXIiLCJfT3RoZXJQbGF5ZXJJbmRleCIsIlJlc2V0X0J1c2luZXNzVGFrZU92ZXIiLCJTZXRQbGF5ZXJPYmplY3QiLCJTZXRQbGF5ZXJJbmRleCIsInNldEhhbGZCdXNpbmVzcyIsIkVuYWJsZVNjcmVlbl9fQnVzaW5lc3NUYWtlT3ZlciIsIlJlc2V0X19EYW1hZ2VEZWNpc2lvbiIsIlRvZ2dsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uIiwiVG9nZ2xlU2NyZWVuX1NlbGxBbGxCdXNpbmVzcyIsIlJlc2V0U3BhY2VTY3JlZW5fU2VsbEFsbEJ1c2luZXNzIiwiRXhpdFNjcmVlbkFsb25nVHVybk92ZXJfX0J1c2luZXNzR2VucmljIiwiU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyIsIlNldEJ1c2luZXNzVUlfRGFtYWdlRGVjaXNpb24iLCJFbmFibGVCdXNpbmVzc1NjcmVlbl9EYW1hZ2VEZWNpc2lvbiIsIl9ub0J1dHRvbiIsIlNldE1lc2FnZVRleHRfRGFtYWdlRGVjaXNpb24iLCJFbmFibGVEaWNlUmVzdWx0X0RhbWFnZURlY2lzaW9uIiwiX2ZpbmVNdWx0aXBsaWVyIiwiX3RleHQiLCJTZXRTZW5kZXJJRF9EYW1hZ2VEZWNpc2lvbiIsIlJlY2VpdmVFdmVudF9EYW1hZ2VEZWNpc2lvbiIsIl9yZWNpdmVySUQiLCJfY2FzaFJlY2VpdmVkIiwiX2lzRGljZVJvbGxlZCIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlBheUFtb3VudF9EYW1hZ2VEZWNpc2lvbiIsIlNldEJhbmtydXB0ZWRWYXIiLCJTZWxlY3RCdXNpbmVzc0ZvckhhbGZPd25lcnNoaXBfRGFtYWdpbmdEZWNpc2lvbiIsIl9zZWxlY3RlZFBsYXllckluZGV4IiwiX3BsYXllcnNEYXRhIiwiX215RGF0YUluZGV4IiwiR2l2ZVBhcnRuZXJTaGlwX0RhbWFnZURlY2lzaW9uIiwiX2J1c2luZXNzTGVuZ3RoIiwiX2J1c2luZXNzQ291bnRlciIsIlNldFRpdGxlVGV4dF9CdXlIYWxmQnVzaW5lc3MiLCJTZXRVcFNwYWNlU2NyZWVuX0xvYW5QYXJ0bmVyc2hpcCIsIkVuYWJsZVNjcmVlbl9fU2VsbEFsbEJ1c2luZXNzIiwiU2V0QnVzaW5lc3NVSV9TZWxsQWxsQnVzaW5lc3MiLCJTZXRVcFNwYWNlU2NyZWVuX0NvbXBhcmVEaWNlIiwiQ2hhbmdlVGl0bGVfRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlIiwiVG9nZ2xlRGVjc2lvbjAyU2NyZWVuQnV0dG9uX0NvbXBhcmVEaWNlIiwiVG9nZ2xlU2NyZWVuX0NvbXBpdGF0b3JVSSIsIkNoYW5nZVRpdGxlX0NvbXBpdGF0b3JVSSIsIk9uRG9uZUNsaWNrZWRfQ29tcGl0YXRvclVJIiwidGV4dDEiLCJ0ZXh0MiIsInRleHQzIiwiX21hcmtldGluZ0Ftb3VudCIsIlRleHRBcnJheSIsIl9jaGVja0NvdW50ZXIiLCJfdGVtcENvdW50ZXIiLCJqIiwidG9Mb3dlckNhc2UiLCJwcm9maXQiLCJFeGl0QWxvbmdUdXJuT3Zlcl9Db21waXRhdG9yVUkiLCJUb2dnbGVTY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9UZWxldmlzaW9uQURTZXR1cCIsIkNoYW5nZURlY2lzaW9uU2NyZWVuVGV4dF9UZWxldmlzaW9uQURTZXR1cCIsIk9uRG9uZUNsaWNrZWRfVGVsZXZpc2lvbkFEU2V0dXAiLCJfc2VudGRhdGEiLCJQbGF5ZXIiLCJEZXNjcmlwdGlvbiIsIkZhaWxlZFNjcmVlbl9UZWxldmlzaW9uQURTZXR1cCIsIkV4aXRBbG9uZ1R1cm5PdmVyX1RlbGV2aXNpb25BRFNldHVwIiwiU3VjY2Vzc1NjcmVlbl9UZWxldmlzaW9uQURTZXR1cCIsIlJlY2VpdmVFdmVudF9UZWxldmlzaW9uQURTZXR1cCIsIl9zZW5kZXJQbGF5ZXJEYXRhIiwiX2RlcyIsIlZvdGVVcERlY2lzaW9uX1RlbGV2aXNpb25BRFNldHVwIiwiU2VuZGVySUQiLCJSZWNpdmVySUQiLCJWb3RlVXAiLCJWb3RlRG93bkRlY2lzaW9uX1RlbGV2aXNpb25BRFNldHVwIiwiUmVjZWl2ZUV2ZW50X1ZvdGVUZWxldmlzaW9uQURTZXR1cCIsIl9teUlEIiwiX290aGVySUQiLCJfdm90ZVVwIiwiX3RvdGFsUGxheWVyIiwiX1JlY2lldmVkVm90ZXMiLCJtZXNzYWdlIiwidGltZSIsIl9oYXNidXR0b24iLCJTZWxmVG9hc3QiLCJDb21wbGV0ZVRvYXN0IiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9zdGF0dXMiLCJSZXN0YXJ0VGhlR2FtZSIsIlJlc3RhcnRHYW1lIiwiX2RhdGFJbmZvIiwiX3RvUGxheWVyVUlEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLG9CQUFvQixHQUFHLENBQTNCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxFQUExQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBQ0EsSUFBSUMscUJBQXFCLEdBQUcsRUFBNUI7QUFDQSxJQUFJQyxxQkFBcUIsR0FBRyxFQUE1QjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBQ0EsSUFBSUMsdUJBQXVCLEdBQUcsRUFBOUI7QUFDQSxJQUFJQyxzQkFBc0IsR0FBRyxFQUE3QjtBQUNBLElBQUlDLHNCQUFzQixHQUFHLEVBQTdCO0FBQ0EsSUFBSUMsb0JBQW9CLEdBQUMsRUFBekI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBQyxFQUFyQjtBQUNBLElBQUlDLG1CQUFtQixHQUFDLElBQXhCO0FBQ0EsSUFBSUMsZUFBZSxHQUFDLElBQXBCO0FBQ0EsSUFBSUMsV0FBVyxHQUFDLElBQWhCO0FBQ0EsSUFBSUMsWUFBWSxHQUFDLEVBQWpCO0FBQ0EsSUFBSUMsY0FBYyxHQUFDLEVBQW5CO0FBQ0Es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Q29udGVudCI6WyJ2YXIgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgRGFtYWdlRGVjaXNpb25SZXN1bHQgPSAwO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxudmFyIFNlbmRlckRhbWFnaW5nSUQgPSBcIlwiO1xyXG52YXIgYnVzaW5lc3NUYWtlT3Zlck5vZGVzID0gW107XHJcbnZhciBidXNpbmVzc0RhbWFnaW5nTm9kZXMgPSBbXTtcclxudmFyIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxudmFyIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzID0gW107XHJcbnZhciBzZWxlY3RlZFBsYXllclRha2VPdmVyID0gW107XHJcbnZhciBzZWxlY3RlZFBsYXllckRhbWFnaW5nID0gW107XHJcbnZhciBMYW9uUGFydG5lcnNoaXBBcnJheT1bXTtcclxudmFyIENvbXBhcmVEaWNlQXJyYXk9W107XHJcbnZhciBUZWxldmlzaW9uQWRUaW1lb3V0PW51bGw7XHJcbnZhciBTZW5kZXJBRFBQbGF5ZXI9bnVsbDtcclxudmFyIFZvdGVUaW1lb3V0PW51bGw7XHJcbnZhciBWb3Rlc1VwQXJyYXk9W107XHJcbnZhciBWb3Rlc0Rvd25BcnJheT1bXTtcclxudmFyIFNlbGxBbGxCdXNpbmVzc0FycmF5PVtdO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbnZhciBidXNpbmVzc0RldGFpbFBheURheU5vZGVzID0gW107XHJcbnZhciBQYXJ0bmVyU2hpcERhdGEgPSBudWxsO1xyXG52YXIgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBDYW5jZWxsZWRJRCA9IFtdO1xyXG52YXIgU3RhcnRHYW1lQ2FzaCA9IDIwMDAwO1xyXG52YXIgU2VsZWN0ZWRCdXNpbmVzc1BheURheSA9IGZhbHNlO1xyXG52YXIgSE1BbW91bnQgPSAwO1xyXG52YXIgQk1BbW91bnQgPSAwO1xyXG52YXIgQk1Mb2NhdGlvbnMgPSAwO1xyXG52YXIgU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMDtcclxudmFyIFR1cm5PdmVyRm9ySW52ZXN0ID0gZmFsc2U7XHJcbnZhciBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxudmFyIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxudmFyIExhb25QYXJ0bmVyc2hpcCA9IGZhbHNlO1xyXG52YXIgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbnZhciBQcmV2aW91c0Nhc2ggPSAwO1xyXG52YXIgUmVtYWluaW5nQ2FzaD0wO1xyXG52YXIgTG9hblNlbGVjdGVkUGxheWVyRGF0YT1udWxsO1xyXG52YXIgVGltZW91dFJlZjtcclxudmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gODAwMDtcclxudmFyIExvbmdNZXNzYWdlVGltZSA9IDUwMDA7XHJcbnZhciBTaG9ydE1lc3NhZ2VUaW1lID0gMjUwMDtcclxudmFyIGdsb2JhbFR1cm5UaW1lciA9IDMwO1xyXG52YXIgUGF5RGF5SW5mbyA9IFwiXCI7XHJcbnZhciBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcbnZhciBUaW1lclRpbWVvdXQ7XHJcbnZhciBEb3VibGVEYXlCdXNpbmVzc0hCID0gMDtcclxudmFyIERvdWJsZURheUJ1c2luZXNzQk0gPSAwO1xyXG52YXIgR2l2ZVByb2ZpdFVzZXJJRCA9IFwiXCI7XHJcbnZhciBUb3RhbFBheURheSA9IDA7XHJcbnZhciBCYW5rUnVwdGVkQ2FyZCA9IGZhbHNlO1xyXG4vLyB2YXIgQ29tcGxldGlvbldpbmRvd1RpbWUgPSA1MDA7Ly84MDAwXHJcbi8vIHZhciBMb25nTWVzc2FnZVRpbWUgPSAyNTA7Ly81MDAwXHJcbi8vIHZhciBTaG9ydE1lc3NhZ2VUaW1lID0gNTA7Ly8yNTAwXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBhbW91bnQgb2YgbG9hbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTG9hbkFtb3VudEVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFRlblRob3VzYW5kOiAxMDAwMCxcclxuICBUZW50eVRob3VzYW5kOiAyMDAwMCxcclxuICBUaGlydHlUaG91c2FuZDogMzAwMDAsXHJcbiAgRm9ydHlUaG91c2FuZDogNDAwMDAsXHJcbiAgRmlmdHlUaG91c2FuZDogNTAwMDAsXHJcbiAgT3RoZXI6IDYsXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1c2luZXNzU2V0dXBVSVwiLFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIG5hbWVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDYXNoVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIGNhc2hcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVUZXh0VUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgIHRvb2x0aXA6IFwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIHR5cGVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWVUZXh0VUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgIHRvb2x0aXA6IFwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIG5hbWVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBidXNpbmVzcyB0eXBlIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc05hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlY2UgZm9yIGJ1c2luZXNzIG5hbWUgZWRpdGJveFwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZE5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWROb2RlVUlcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIEJyaWNrQW5kTW9ydGFyTm9kZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrQW5kTW9ydGFyTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBUaW1lclVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIGxhYmVsIGZvciB0aW1lclwiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lck5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgdGltZXIgbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2V0dXBOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblNldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuU2V0dXBOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGxvYW4gc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgdHlwZTogTG9hbkFtb3VudEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IExvYW5BbW91bnRFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsb2FuIGFtb3VudCB0YWtlbiBieSBwbGF5ZXIgKHN0YXRlIG1hY2hpbmUpXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBhbGwgbGFiZWxzIG9mIGFtb3VudHMgaW4gbG9hbiBVSVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTdGF0dXNOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTdGF0dXNOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHdhaXRpbmcgc3RhdHVzIHNjcmVlbiBvbiBpbml0aWFsIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgZXhpdCBidXR0b24gbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZEJ1dHRvbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRkQnV0dG9uTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBBZGQgQ2FzaCBidXR0b24gbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRkQ2FzaFNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBBZGRDYXNoU2NyZWVuIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRkQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBBZGRDYXNoIGxhYmVsIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRkQ2FzaEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaCBlZGl0Qm94IGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3Rvci8vXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBUdXJuRGVjaXNpb25TZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVHVybkRlY2lzaW9uU2V0dXBVSVwiLFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYXJrZXRpbmdFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0VkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBtYXJrZXRpbmcgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEdvbGRFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdvbGRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IGdvbGQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFN0b2NrRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0VkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3Qgc3RvY2sgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hBbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIGNhc2ggbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc05vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgZXhwbmFkIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGNvbnRlbnQgbm9kZSBvZiBzY3JvbGwgdmlldyBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgcHJlZmFiIG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJUZXh0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyVGV4dFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgbGFiZWwgb2YgdGltZXIgdGV4dCBmb3IgdHVybiBkZWNpc2lvblwiLFxyXG4gICAgfSxcclxuICAgIEJsb2NrZXJOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJsb2NrZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIG5vZGUgb2YgYmxvY2tlciBmb3IgdHVybiBkZWNpc2lvblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG5cclxuICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmcgPSBuYW1lO1xyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgaW52ZXN0bWVudC9idXkgYW5kIHNlbGwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdEVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFN0b2NrSW52ZXN0OiAxLFxyXG4gIEdvbGRJbnZlc3Q6IDIsXHJcbiAgU3RvY2tTZWxsOiAzLFxyXG4gIEdvbGRTZWxsOiA0LFxyXG4gIE90aGVyOiA1LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0U2VsbFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0U2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlIFJlc3VsdCBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgdmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV5T3JTZWxsVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1eU9yU2VsbCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgVmFsdWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1dHRvbk5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXR0b25OYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBidXR0b24gbmFtZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U3RhdGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW52ZXN0U3RhdGVcIixcclxuICAgICAgdHlwZTogSW52ZXN0RW51bSxcclxuICAgICAgZGVmYXVsdDogSW52ZXN0RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQW1vdW50RWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxsQnVzaW5lc3NVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsbEJ1c2luZXNzVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxsQnVzaW5lc3NVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZWxsUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2VsbFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc1NlbGxQcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXlEYXlVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGF5RGF5VUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQYXlEYXlVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgUGF5RGF5IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROdW1iZXJMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWROdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZE51bWJlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1OdW1iZXJMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhck51bWJlclwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJOdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTG9jYXRpb25MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhckxvY2F0aW9uc1wiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJMb2NhdGlvbnMgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBhc3NlZFBheURheUNvdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFzc2VkUGF5RGF5Q291bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUGFzc2VkUGF5RGF5Q291bnRMYWJlbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkQnRuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZEJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWRCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNQnRuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrTW9ydGFyQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQnRuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5CdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluUGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIE1haW5QYW5lbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRQYW5lbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblJlc3VsdFBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5SZXN1bHRQYW5lbE5vZGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFNjcmVlblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0U2NyZWVuVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFNjcmVlblRpdGxlIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZVJlc3VsdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxCdXNpbmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQnVzaW5lc3NMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxCdXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcExvYW5CdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcExvYW5CdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2tpcExvYW5CdXR0b24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5Gb3R0ZXJMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuRm90dGVyTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5Gb3R0ZXJMYWJlbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1eU9yU2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBPbmVRdWVzdGlvblVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBPbmVRdWVzdGlvblVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiT25lUXVlc3Rpb25VSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckRldGFpbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckRldGFpbExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIERldGFpbHNQcmVmYWIgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgU2Nyb2xsQ29udGVudCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgV2FpdGluZ1NjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgV2FpdGluZ1NjcmVlbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuTGFiZWwgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblRpdGxlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvbkNhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblF1ZXN0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25RdWVzdGlvbkxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgcXVlc3Rpb24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBhcnRuZXJzaGlwVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBhcnRuZXJzaGlwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQYXJ0bmVyc2hpcFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgV2FpdGluZ1N0YXR1c1NjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIHdhaXRpbmcgc2NyZWVuIG5vZGUgb2YgcGFydG5lcnNoaXAgdWlcIixcclxuICAgIH0sXHJcbiAgICBNYWluU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZU5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyU2hpcFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVyU2hpcFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25QbGF5ZXJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvbkRlc2NyaXB0aW9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uRGVzY3JpcHRpb25cIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBSZXN1bHRVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUmVzdWx0VUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJSZXN1bHRVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFJlc3VsdFNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTdGF0dXNMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdGF0dXNMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCb2R5TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQm9keUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NQYXlEYXlTZXR1cFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1BheURheVNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1BheURheVNldHVwVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVGl0bGVDb250ZW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVDb250ZW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxlY3RQbGF5ZXJHZW5lcmljLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZWxlY3RQbGF5ZXJHZW5lcmljID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsZWN0UGxheWVyR2VuZXJpY1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxlY3RCdXNpbmVzc0dlbmVyaWMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGVjdEJ1c2luZXNzR2VuZXJpYyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNlbGVjdEJ1c2luZXNzR2VuZXJpY1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NQcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NNYW5pcHVsYXRpb25QcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBEYW1hZ2luZ0luZm9ybWF0aW9uRGVjaXNpb25TZXR1cC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXAgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJEYW1hZ2luZ0luZm9ybWF0aW9uRGVjaXNpb25TZXR1cFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1haW5TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdFNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0U2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NlbGVjdFNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGVjdFNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERhbWFnZUJ1c2luZXNzU2VsZWN0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxlY3RCdXNpbmVzc0dlbmVyaWMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnV5SGFsZkJ1c2luZXNzU2V0dXBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5SGFsZkJ1c2luZXNzU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1eUhhbGZCdXNpbmVzc1NldHVwVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYWluU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIENvbXBpdGF0b3JVSVNldHVwLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDb21waXRhdG9yVUlTZXR1cCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkNvbXBpdGF0b3JVSVNldHVwXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQ29tcEVkaXRCb3gxOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNvbXBFZGl0Qm94MVwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBFZGl0Qm94Mjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb21wRWRpdEJveDJcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBDb21wRWRpdEJveDM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ29tcEVkaXRCb3gzXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBUZWxldmlzaW9uQURVSVNldHVwLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBUZWxldmlzaW9uQURVSVNldHVwID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVGVsZXZpc2lvbkFEVUlTZXR1cFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1haW5TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIE1haW5FZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5FZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblNjcmVlblRleHQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5UZXh0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xOyAvLy0xIG1lYW5zIG5ldyBidXNpbmVzcyBpcyBub3QgaW5zdGFudGlhbHRlZCBmcm9tIGluc2lkZSBnYW1lICwgaWYgaXQgaGFzIGFueSBvdGhlciB2YWx1ZSBpdCBtZWFucyBpdHMgYmVlbiBpbnN0YW50aWF0ZWQgZnJvbSBpbnNpZGUgZ2FtZSBhbmQgaXRzIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggb2YgcGxheWVyXHJcblxyXG4vL3R1cm4gZGVjaXNpb25zXHJcbnZhciBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxudmFyIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4vL2J1eW9yc2VsbFxyXG52YXIgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxudmFyIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxudmFyIERpY2VSZXN1bHQ7XHJcbnZhciBPbmNlT3JTaGFyZTtcclxudmFyIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG52YXIgSEJEaWNlQ291bnRlciA9IDA7XHJcbnZhciBCTURpY2VDb3VudGVyID0gMDtcclxudmFyIE5leHRIYWxmUGF5RGF5ID0gZmFsc2U7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBMb2FuUGF5ZWQgPSBmYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50ID0gMDtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxudmFyIEdhbWVwbGF5VUlNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiR2FtZXBsYXlVSU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1c2luZXNzU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBUdXJuRGVjaXNpb25TZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsbEJ1c2luZXNzVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsbEJ1c2luZXNzVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBJbnZlc3RVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEJ1eU9yU2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1eU9yU2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBPbmVRdWVzdGlvblVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIE9uZVF1ZXN0aW9uVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyc2hpcFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFBhcnRuZXJzaGlwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUGFydG5lcnNoaXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFJlc3VsdFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFJlc3VsdFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NQYXlEYXlVSVNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBCdXNpbmVzc1BheURheVNldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NQYXlEYXlTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0UGxheWVyRm9yUHJvZml0VUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxlY3RQbGF5ZXJHZW5lcmljLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGVjdFBsYXllckdlbmVyaWMgY2xhc3NcIixcclxuICAgIH0sXHJcblxyXG4gICAgU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0UGxheWVyR2VuZXJpYyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxlY3RQbGF5ZXJHZW5lcmljIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uRGFtYWdpbmdTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXAgY2xhc3NcIixcclxuICAgIH0sXHJcblxyXG4gICAgU2VsZWN0QnVzaW5lc3NUYWtlT3Zlcjoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0QnVzaW5lc3NHZW5lcmljLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGVjdEJ1c2luZXNzR2VuZXJpYyBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1eUhhbGZCdXNpbmVzc1VJU2V0dXA6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEJ1eUhhbGZCdXNpbmVzc1NldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnV5SGFsZkJ1c2luZXNzU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIExvYW5QYXJ0bmVyc2hpcFNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxlY3RQbGF5ZXJHZW5lcmljLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGVjdFBsYXllckdlbmVyaWMgY2xhc3NcIixcclxuICAgIH0sXHJcblxyXG4gICAgQ29tcGFyZURpY2VTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0UGxheWVyR2VuZXJpYyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxlY3RQbGF5ZXJHZW5lcmljIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGxBbGxCdXNpbmVzc1NldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxlY3RCdXNpbmVzc0dlbmVyaWMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsZWN0UGxheWVyR2VuZXJpYyBjbGFzc1wiLFxyXG4gICAgfSxcclxuXHJcbiAgICBDb21waXRhdG9yU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQ29tcGl0YXRvclVJU2V0dXAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQ29tcGl0YXRvclVJU2V0dXAgY2xhc3NcIixcclxuICAgIH0sXHJcblxyXG4gICAgVGVsZXZpc2lvbkFEU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogVGVsZXZpc2lvbkFEVUlTZXR1cCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBUZWxldmlzaW9uQURVSVNldHVwIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBQb3BVcFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUlCdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NEb3VibGVQYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXNpbmVzc0RvdWJsZVBheSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNwYWNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25TcGFjZSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25EZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxlY3RQbGF5ZXJGb3JQcm9maXQgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0UGxheWVyVGFrZU92ZXJTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxlY3RQbGF5ZXJUYWtlT3ZlciBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RQbGF5ZXJEYW1hZ2luZ1NjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGVjdFBsYXllckRhbWFnaW5nIHNjcmVlblwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBMb2FuUGFydG5lcnNoaXBTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBMb2FuUGFydG5lcnNoaXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBhcmVEaWNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgQ29tcGFyZURpY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBhcmVEaWNlRGVjaXNpb24xU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgQ29tcGFyZURpY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBhcmVEaWNlRGVjaXNpb24yU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgQ29tcGFyZURpY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBhcmVEaWNlRGVjaXNpb24yVGV4dDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBDb21wYXJlRGljZSBsYWJlbFwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBDb21wYXJlRGljZURlY2lzaW9uMkJ1dHRvbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIENvbXBhcmVEaWNlIGJ1dHRvblwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsQWxsQnVzaW5lc3NTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxsQWxsQnVzaW5lc3Mgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0QnVzaW5lc3NUYWtlT3ZlclNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGVjdEJ1c2luZXNzVGFrZU92ZXIgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsXHJcbiAgICB9LFxyXG4gICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBdmF0YXJTcHJpdGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFJlc2V0cyB0aGlzIGNsYXNzIGdsb2JhbCB2YXJpYWJsZXMgYW5kIG90aGVyIG5lY2Vzc2FyeSBkYXRhIG9uTG9hZFxyXG4gICAqKi9cclxuICBSZXNldEFsbERhdGEoKSB7XHJcbiAgICBEb3VibGVEYXlCdXNpbmVzc0hCID0gMDtcclxuICAgIERvdWJsZURheUJ1c2luZXNzQk0gPSAwO1xyXG4gICAgVGVsZXZpc2lvbkFkVGltZW91dD1udWxsO1xyXG4gICAgU2VuZGVyQURQUGxheWVyPW51bGw7XHJcbiAgICBWb3RlVGltZW91dD1udWxsO1xyXG4gICAgVm90ZXNVcEFycmF5PVtdO1xyXG4gICAgVm90ZXNEb3duQXJyYXk9W107XHJcbiAgICBOZXh0SGFsZlBheURheSA9IGZhbHNlO1xyXG4gICAgTGFvblBhcnRuZXJzaGlwPWZhbHNlO1xyXG4gICAgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICAgIGJ1c2luZXNzVGFrZU92ZXJOb2RlcyA9IFtdO1xyXG4gICAgYnVzaW5lc3NEYW1hZ2luZ05vZGVzID0gW107XHJcbiAgICBEYW1hZ2VEZWNpc2lvblJlc3VsdCA9IDA7XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgICBTZW5kZXJEYW1hZ2luZ0lEID0gXCJcIjtcclxuICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzID0gW107XHJcbiAgICBzZWxlY3RlZFBsYXllclRha2VPdmVyID0gW107XHJcbiAgICBzZWxlY3RlZFBsYXllckRhbWFnaW5nID0gW107XHJcbiAgICBMYW9uUGFydG5lcnNoaXBBcnJheT1bXTtcclxuICAgIENvbXBhcmVEaWNlQXJyYXk9W107XHJcbiAgICBTZWxsQWxsQnVzaW5lc3NBcnJheT1bXTtcclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgQ2FuY2VsbGVkSUQgPSBbXTtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxuICAgIEhNQW1vdW50ID0gMDtcclxuICAgIEJNQW1vdW50ID0gMDtcclxuICAgIEJNTG9jYXRpb25zID0gMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbiAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgIFByZXZpb3VzQ2FzaCA9IDA7XHJcbiAgICBSZW1haW5pbmdDYXNoPTA7XHJcbiAgICBMb2FuU2VsZWN0ZWRQbGF5ZXJEYXRhPW51bGw7XHJcbiAgICBUaW1lb3V0UmVmID0gbnVsbDtcclxuICAgIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG4gICAgQmFua1J1cHRlZENhcmQgPSBmYWxzZTtcclxuICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbiAgICAvL3R1cm4gZGVjaXNpb25zXHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4gICAgLy9idXlvcnNlbGxcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgICBEaWNlUmVzdWx0ID0gMDtcclxuICAgIE9uY2VPclNoYXJlO1xyXG4gICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbiAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBUb3RhbFBheURheSA9IDA7XHJcbiAgICBIQkRpY2VDb3VudGVyID0gMDtcclxuICAgIEJNRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgUGF5RGF5SW5mbyA9IFwiXCI7XHJcbiAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZXNldHMgdHVybiB2YXJpYWJsZXMgZm9yIGdvbGRpbnZlc3QvZ29sZHNvbGQvc3Rva2NpbnZlc3Qvc3RvY2tzb2xkXHJcbiAgICoqL1xyXG4gIFJlc2V0VHVyblZhcmlhYmxlKCkge1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZXMgb2YgY2xhc3MvZXMgbmVlZGVkLlxyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAoIUdhbWVNYW5hZ2VyIHx8IEdhbWVNYW5hZ2VyID09IG51bGwpIEdhbWVNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gdGhpcyBub2RlIGdldHMgYWN0aXZlXHJcbiAgICoqL1xyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gdGhpcyBub2RlIGdldHMgZGVhY3RpdmVcclxuICAgKiovXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIHRoZSBjbGFzcyBpcyBsb2FkZWRcclxuICAgKiovXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcblxyXG4gICAgLy9kZWNsYXJpbmcgbG9jYWwgdmFyaWFibGVzXHJcbiAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Hb2xkU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja0ludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBmYWxzZTtcclxuICAgIHRoaXMuUGF5RGF5Q291bnQgPSAwO1xyXG4gICAgdGhpcy5Eb3VibGVQYXlEYXlDb3VudCA9IDA7XHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gMDtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgIHRoaXMuVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICBUaW1lclRpbWVvdXQgPSBudWxsO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gIEluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgLy8gY29uc29sZS50cmFjZShcImNsb3NlZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkXCIpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgIH0sIDUwMCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1c2luZXNzU2V0dXAgd2l0aCBsb2FuXHJcbiAgLy9CdXNpbmVzcyBzZXR1cCB1aS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIHRoaXMuVG9nZ2xlQ2FzaEFkZFNjcmVlbl9CdXNpbmVzc1NldHVwKHRydWUpO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25DYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChfdmFsKSB7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIE9uQ2xpY2tEb25lQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cChmYWxzZSk7XHJcbiAgICB2YXIgX2dhbWVjYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgdmFyIF9hbW91bnQgPSBwYXJzZUludCh0aGlzLkFkZENhc2hBbW91bnQpO1xyXG4gICAgaWYgKHRoaXMuQWRkQ2FzaEFtb3VudCAhPSBudWxsICYmIHRoaXMuQWRkQ2FzaEFtb3VudCAhPSBcIlwiICYmIHRoaXMuQWRkQ2FzaEFtb3VudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKF9hbW91bnQgPD0gX2dhbWVjYXNoKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2gudG9TdHJpbmcoKTtcclxuICAgICAgICBfZ2FtZWNhc2ggLT0gX2Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF9nYW1lY2FzaC50b1N0cmluZygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoLCAtMSwgLTEpO1xyXG5cclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIkNhc2ggJFwiICsgdGhpcy5BZGRDYXNoQW1vdW50ICsgXCIgaGFzIGJlZW4gYWRkZWQuXCIpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvIG5vdCBoYXZlIGVub3VnaCBpbiBnYW1lIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUgPSBmYWxzZSwgbW9kZUluZGV4ID0gMCwgX2lzQmFua3J1cHRlZCA9IGZhbHNlLCBfQmFua3J1cHRBbW91bnQgPSAwLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlLF9sb2FuUGFydG5lcnNoaXA9ZmFsc2UsX090aGVycGxheWVyRGF0YT1udWxsKSB7XHJcbiAgICAvL2NhbGxlZCBmaXJzdCB0aW1lIGZvcm0gR2FtZU1hbmFnZXIgb25sb2FkIGZ1bmN0aW9uXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuICAgIExhb25QYXJ0bmVyc2hpcD1fbG9hblBhcnRuZXJzaGlwO1xyXG4gICAgTG9hblNlbGVjdGVkUGxheWVyRGF0YT1fT3RoZXJwbGF5ZXJEYXRhO1xyXG5cclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gX2lzQmFua3J1cHRlZDtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IF9CYW5rcnVwdEFtb3VudDtcclxuXHJcbiAgICBpZiAoX2lzQmFua3J1cHRlZCkgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG5cclxuICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lLCBtb2RlSW5kZXgsIF9pc0JhbmtydXB0ZWQsX2xvYW5QYXJ0bmVyc2hpcCk7XHJcbiAgfSxcclxuICBJbml0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSA9IGZhbHNlLCBtb2RlSW5kZXggPSAwLCBfaXNCYW5rcnVwdGVkID0gZmFsc2UsX2xvYW5QYXJ0bmVyc2hpcD1mYWxzZSkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FyZEZ1bmN0aW9uYWxpdHkgPSBuZXcgR2FtZU1hbmFnZXIuQ2FyZERhdGFGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmU7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZEJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGlzRmlyc3RUaW1lKSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gU3RhcnRHYW1lQ2FzaDtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5SZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgaWYgKGluc2lkZUdhbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSBpbmRleDtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgICAgIGlmIChCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICAgICAgaWYgKFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICAgIFByZXZpb3VzQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IDA7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBQcmV2aW91c0Nhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBHaXZlbkNhc2hCdXNpbmVzcztcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWUpO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5hdmF0YXJJZCkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgR2V0T2JqX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChuYW1lKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgIGlmIChpc05hTihVSUQpIHx8IFVJRCA9PSB1bmRlZmluZWQpIFVJRCA9IDA7XHJcblxyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQXZhdGFySUQgPSBVSUQ7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIFJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gXCJcIjtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lO1xyXG4gIH0sXHJcbiAgT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gIH0sXHJcbiAgT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcjtcclxuICB9LFxyXG4gIE9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBhbW91bnQ7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gYW1vdW50O1xyXG4gIH0sXHJcbiAgQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2xvYW5UYWtlbikge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgYWxyZWFkeSB0YWtlbiBsb2FuIG9mICRcIiArIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIFJlcXVpcmVkQ2FzaCA9IE1hdGguYWJzKHBhcnNlSW50KFBsYXllckRhdGFJbnRhbmNlLkNhc2gpIC0gYW1vdW50KTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIkXCIgKyBSZXF1aXJlZENhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3QgdGFrZSBsb2FuIGZvciBjdXJyZW50IGJ1c2luZXNzIHNldHVwXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoNTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBidXNpbmVzcyBiZXR3ZWVuIEhvbWUgQmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IHRha2UgbG9hbiBmb3IgY3VycmVudCBidXNpbmVzcyBzZXR1cCBvciBsb2FuIGFscmVhZHkgdGFrZW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuICBIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaW5kZXggPT0gaSkgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5PdGhlcjtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDApO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlblRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMSk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGVudHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDIpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRoaXJ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMyk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uRm9ydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDQpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZpZnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg1KTtcclxuICB9LFxyXG4gIE9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPT0gTG9hbkFtb3VudEVudW0uT3RoZXIpIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IFJlcXVpcmVkQ2FzaDtcclxuICAgIGVsc2UgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gcGFyc2VJbnQodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50KTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IHRydWU7XHJcblxyXG4gICAgUGxheWVyRGF0YUludGFuY2UuTG9hblRha2VuPXRydWU7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5Mb2FuQW1vdW50PVBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuXHJcbiAgICB0aGlzLk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoICsgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICB9LFxyXG5cclxuICBQdXNoRGF0YUZvclBsYXllckxlZnQoX2RhdGEpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IDIwMDAwO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuUGxheWVySUQgPSBfZGF0YS51c2VySUQ7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lID0gX2RhdGEubmFtZTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkF2YXRhcklEID0gMDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA9IDE7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuQ2FyZEZ1bmN0aW9uYWxpdHkgPSBuZXcgR2FtZU1hbmFnZXIuQ2FyZERhdGFGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPSBcIlNhbG9vblwiO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPSBcIkV2YSBCZWF1dHlcIjtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMSwgX3BsYXllckRhdGFJbnRhbmNlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIFN5bmNEYXRhOiBmdW5jdGlvbiAoX2RhdGEsIF9JRCwgX3BsYXllckxlZnQgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9pc1NwZWN0YXRlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdO1xyXG5cclxuICAgIGlmIChfaXNTcGVjdGF0ZSkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFJlYWxBY3RvcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9wbGF5ZXJMZWZ0KSB7XHJcbiAgICAgIGlmIChfSUQgIT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmFjdG9yTnIpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoID49IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycykge1xyXG4gICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCB0cnVlLCB0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFB1cmNoYXNlQnVzaW5lc3M6IGZ1bmN0aW9uIChfYW1vdW50LCBfYnVzaW5lc3NOYW1lLCBfaXNIb21lQmFzZWQpIHtcclxuICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIDwgX2Ftb3VudCAmJiAhU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiICsgX2J1c2luZXNzTmFtZSArIFwiIGJ1c2luZXNzLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9pc0hvbWVCYXNlZCkge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPCAzKSB7XHJcbiAgICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICAgIFJlbWFpbmluZ0Nhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gXCIkXCIgKyBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuU3RhcnRHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IG93biBtb3JlIHRoYW4gdGhyZWUgSG9tZSBiYXNlZCBidXNpbmVzc2VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBfYW1vdW50O1xyXG4gICAgICAgICAgUmVtYWluaW5nQ2FzaD1QbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gXCIkXCIgKyBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQnJpY2tBbmRNb3J0YXJBbW91bnQrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbikge1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIlJldmVydGluZyBiYWNrIGxvYW4gYW1vdW50LlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIFJlbWFpbmluZ0Nhc2g9MDtcclxuICAgICAgTG9hblNlbGVjdGVkUGxheWVyRGF0YT1udWxsO1xyXG4gICAgICBMYW9uUGFydG5lcnNoaXA9ZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5CYW5rcnVwdEFtb3VudCA9IHRoaXMuQmFua3J1cHRlZEFtb3VudDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vc2V0dGluZyBwbGF5ZXIgY3VycmVudCBkYXRhIGluIGN1c3RvbSBwcm9wZXJ0aWVzIHdoZW4gaGlzL2hlciB0dXJuIG92ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgYmFua3J1cHRlZDogdHJ1ZSwgdHVybjogR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKSwgUGxheWVyRGF0YU1haW46IFBsYXllckRhdGFJbnRhbmNlIH0gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDksIF9kYXRhKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgQUlcclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcbiAgICAgICAgfSwgMTYwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJubyBtb2RlIHNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIGlmKExhb25QYXJ0bmVyc2hpcClcclxuICAgICAge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9UHJldmlvdXNDYXNoK1JlbWFpbmluZ0Nhc2g7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFByZXZpb3VzQ2FzaDtcclxuICAgICAgfVxyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgTGFvblBhcnRuZXJzaGlwPWZhbHNlO1xyXG4gICAgICBSZW1haW5pbmdDYXNoPTA7XHJcbiAgICAgIExvYW5TZWxlY3RlZFBsYXllckRhdGE9bnVsbDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQYXlBbW91bnRUb1BsYXlHYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlN0YXJ0R2FtZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID09IFwiXCIpIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgdHlwZS5cIik7XHJcbiAgICBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9PSBcIlwiKSB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIG5hbWUuXCIpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLk5vbmUgfHwgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGEgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBob21lYmFzc2VkXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDEwMDAwLCBcImhvbWVcIiwgdHJ1ZSk7XHJcbiAgICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBicmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDUwMDAwLCBcImJyaWNrIGFuZCBtb3J0YXJcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuU3RhcnRHYW1lID09IHRydWUgfHwgdGhpcy5Jc0JhbmtydXB0ZWQgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICBpZihMYW9uUGFydG5lcnNoaXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudD01MDAwMDtcclxuXHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Mb2FuQW1vdW50PTUwMDAwO1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuTG9hblRha2VuPXRydWU7XHJcblxyXG4gICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Jc1BhcnRuZXJzaGlwID0gdHJ1ZTtcclxuICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuUGFydG5lcklEID0gTG9hblNlbGVjdGVkUGxheWVyRGF0YS5QbGF5ZXJVSUQ7XHJcbiAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLlBhcnRuZXJOYW1lID0gTG9hblNlbGVjdGVkUGxheWVyRGF0YS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgICAgICAgIHZhciBpbmZvPVwiWW91IGhhdmUgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXIgXCIrUGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZStcIiB0byBnbyBpbnRvIHBhcnRuZXJzaGlwIGluIHRoZWlyIGJ1c2luZXNzIG5hbWVkIFwiK1BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lO1xyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhpbmZvLExvYW5TZWxlY3RlZFBsYXllckRhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLnB1c2goUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICAgIGlmIChJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCAhPSAtMSkge1xyXG4gICAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIG5vdCBiZWVuIGNhbGxlZCBmcm9tIGluc2lkZSBnYW1lXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBiZWVuIGNhbGxlZCBhdCBzdGFydCBvZiBnYW1lIGFzIGluaXRpYWwgc2V0dXBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHJ0aW50aW5nIGFsbCB2YWx1ZXMgdG8gY29uc29sZVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBuYW1lOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIElEOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJJcyBwbGF5ZXIgYm90OiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Jc0JvdCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIG9mIGJ1c2luZXNzIG9mIHBsYXllciAoc2VlIGJlbG93KTogXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjYXNoOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5DYXNoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIHRha2VuIGxvYW46IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5UYWtlbik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2VuIGxvYW4gYW1vdW50OiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuQW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gVHVybkRlY2lzaW9uU2V0dXBVSVxyXG4gIC8vVHVybkRlY2lzaW9uU2V0dXBVSS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoaXNhY3RpdmUpIHtcclxuICAgIHRoaXMuRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gaXNhY3RpdmU7XHJcblxyXG4gICAgdmFyIF9hY3RpdmUgPSBpc2FjdGl2ZTtcclxuXHJcbiAgICBpZiAoX2FjdGl2ZSkge1xyXG4gICAgICBfYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UaW1lciA9IGdsb2JhbFR1cm5UaW1lcjtcclxuICAgICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IHRoaXMuVGltZXIgKyBcIiBzZWNvbmRzIGFyZSBsZWZ0IHRvIGNob29zZSBhYm92ZSBvcHRpb25zIGV4Y2VwdCAnUm9sbCBUaGUgRGljZSdcIjtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVyVGltZW91dCk7XHJcbiAgICAgIHRoaXMuVXBkYXRlVGltZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lclRpbWVvdXQpO1xyXG4gICAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlRpbWVyVGV4dC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQmxvY2tlck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVRpbWVyKCkge1xyXG4gICAgaWYgKHRoaXMuVGltZXIgPiAwKSB7XHJcbiAgICAgIHRoaXMuVGltZXIgPSB0aGlzLlRpbWVyIC0gMTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlRpbWVyVGV4dC5zdHJpbmcgPSB0aGlzLlRpbWVyICsgXCIgc2Vjb25kcyBhcmUgbGVmdCB0byBjaG9vc2UgYWJvdmUgb3B0aW9ucyBleGNlcHQgJ1JvbGwgVGhlIERpY2UnXCI7XHJcbiAgICAgIFRpbWVyVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlVGltZXIoKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhclRpbWVvdXQoVGltZXJUaW1lb3V0KTtcclxuICAgICAgdGhpcy5UaW1lciA9IDA7XHJcbiAgICAgIHRoaXMuVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5UaW1lclRleHQuc3RyaW5nID0gXCJUaW1lciBpcyBvdmVyLCB5b3UgY2FuIHNlbGVjdCBvbmx5ICdSb2xsIFRoZSBEaWNlJyBub3cuXCI7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQ2FzaEFtb3VudExhYmVsLnN0cmluZyA9IFwiJCBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXS5DYXNoO1xyXG4gIH0sXHJcblxyXG4gIE9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tNYXJrZXRpbmdBbW91bnRTaGFyZV9DYXJkRnVuY3Rpb25hbGl0eShfYW1vdW50ID0gMCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhcmRGdW5jdGlvbmFsaXR5Lkhhc01hcmtldGluZ0NvbXBhbnkpIHtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JNYXJrZXRpbmdTaGFyZShfYW1vdW50LCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlELCBcIllvdSBoYXZlIHJlY2VpdmVkIG1hcmtldCBzaGFyZSBvZiAkXCIgKyBfYW1vdW50ICsgXCIgZnJvbSB5b3VyIG1hcmtldGluZyBjb21wYW55XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudEZvck1hcmtldGluZ1NoYXJlKF9hbW50LCBfaWQsIF9tc2cpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgYW1vdW50OiBfYW1udCwgSUQ6IF9pZCwgbXNnOiBfbXNnIH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIyLCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChUZW1wTWFya2V0aW5nQW1vdW50ID09IFwiXCIgfHwgVGVtcE1hcmtldGluZ0Ftb3VudCA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdGhpcy5tYXJrZXRpbmdBbW91bnQgPSBwYXJzZUludChUZW1wTWFya2V0aW5nQW1vdW50KTtcclxuICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcblxyXG4gICAgICAvL2lmIHBsYXllciBlbnRlcmVkIGFtb3VudCBpcyBncmVhdGVyIHRoYW4gdG90YWwgY2FzaCBoZSBvd25zXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRoaXMubWFya2V0aW5nQW1vdW50KSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSB0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgKyB0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IHN1Y2Nlc3NmdWxseSBtYXJrZXRlZCBhbW91bnQgb2YgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ICsgXCIgLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICsgXCIuXCIsXHJcbiAgICAgICAgICBMb25nTWVzc2FnZVRpbWVcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB0aGlzLkNoZWNrTWFya2V0aW5nQW1vdW50U2hhcmVfQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5tYXJrZXRpbmdBbW91bnQpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGlmIHBsYXllciBoYXMgbW9yZSB0aGFuIDUwMDAkXHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBhbHJlYWR5IGhpcmVkIGEgbGF3eWVyLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIFRlbXBIaXJpbmdMYXd5ZXIgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFRlbXBIaXJpbmdMYXd5ZXIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC0gNTAwMDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llciwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFwiLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInNvcnJ5LCB5b3UgZG9udCBoYXZlIGVub3VnaCBtb25leSB0byBoaXJlIGEgbGF3eWVyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oX25hbWUpIHtcclxuICAgIExvY2F0aW9uTmFtZSA9IF9uYW1lO1xyXG4gIH0sXHJcbiAgT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGV2ZW50ID0gbnVsbCwgX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgLy9pZiBwbGF5ZXIgaGFzIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgaGUgY291bGQgZXhwYW5kIGl0XHJcbiAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzc1wiKTtcclxuXHJcbiAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBfaXNDYXJkRnVuY3Rpb25hbGl0eTtcclxuICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gX0dpdmVuQ2FzaDtcclxuICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g7XHJcblxyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdmFyIGdlbmVyYXRlZExlbmd0aCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSwgR2l2ZW5DYXNoQnVzaW5lc3MsIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcblxyXG4gICAgaWYgKGdlbmVyYXRlZExlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm8gYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyB0byBleHBhbmQuXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSAwO1xyXG4gICAgICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgICAgICBSZW1haW5pbmdDYXNoPTA7XHJcbiAgICAgICAgICBMb2FuU2VsZWN0ZWRQbGF5ZXJEYXRhPW51bGw7XHJcbiAgICAgICAgICBMYW9uUGFydG5lcnNoaXA9ZmFsc2U7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTYwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBSZW1haW5pbmdDYXNoPTA7XHJcbiAgICAgIExvYW5TZWxlY3RlZFBsYXllckRhdGE9bnVsbDtcclxuICAgICAgTGFvblBhcnRuZXJzaGlwPWZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJzdGFydGluZyBuZXcgYnVzaW5lc3NcIik7XHJcbiAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLkdvbGRJbnZlc3RlZCkge1xyXG4gICAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0O1xyXG4gICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJJbnZlc3QgSW4gR09MRFwiLCBEaWNlUmVzdWx0LCBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBCVVlcIiwgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIkJVWVwiLCB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChldmVudCA9IG51bGwsIF9pc1R1cm5PdmVyID0gZmFsc2UpIHtcclxuICAgIFR1cm5PdmVyRm9ySW52ZXN0ID0gX2lzVHVybk92ZXI7XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihfaXNUdXJuT3Zlcik7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KSBTdG9ja0J1c2luZXNzTmFtZSA9IFwiRnJpZW5kJ3MgQnVzaW5lc3NcIjtcclxuXHJcbiAgICBpZiAoIXRoaXMuU3RvY2tJbnZlc3RlZCB8fCBUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFN0b2NrQnVzaW5lc3NOYW1lID09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuXHJcbiAgICAgICAgaWYgKCFUdXJuT3ZlckZvckludmVzdCkgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBlbHNlIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJJbnZlc3QgaW4gU3RvY2tcIiwgRGljZVJlc3VsdCwgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gQlVZXCIsIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJCVVlcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLkdvbGRTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIEdPTERcIiwgRGljZVJlc3VsdCwgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLCBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIlNFTExcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIFNUT0NLXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBzaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIiwgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJTRUxMXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgc2hhcmVzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgIC8vIHRoaXMuU2hvd1RvYXN0KFwid29yayBpbiBwcm9ncmVzcywgY29taW5nIHNvb24uLi5cIik7XHJcbiAgICAvLyB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsRGljZSgpO1xyXG4gIH0sXHJcblxyXG4gIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvL3RoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGFydG5lcnNoaXAgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLldhaXRpbmdTdGF0dXNTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBhcnRuZXJTaGlwUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIHZhciBfdG90YWxMb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgIHZhciBfYWxsTG9jYXRpb25zQW1vdW50ID0gX3RvdGFsTG9jYXRpb25zICogMjUwMDA7XHJcbiAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlBhcnRuZXJOYW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoXCJub25lXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZykge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZS5zdHJpbmcgPSBfdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25EZXNjcmlwdGlvbi5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpIHtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IHRydWU7XHJcbiAgICBQYXJ0bmVyU2hpcERhdGEgPSBfZGF0YTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSBfYnVzaW5lc3NNb2RlID0gXCJIb21lIEJhc2VkXCI7XHJcbiAgICBlbHNlIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIF9idXNpbmVzc01vZGUgPSBcIkJyaWNrICYgTW9ydGFyXCI7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbXNnID1cclxuICAgICAgICBcInlvdSBoYXZlIHJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGJ5IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICtcclxuICAgICAgICBcIiAsIGZvbGxvd2luZyBhcmUgdGhlIGRldGFpbHMgb2YgYnVzaW5lc3M6IFwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE5hbWU6IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NOYW1lICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE1vZGU6IFwiICtcclxuICAgICAgICBfYnVzaW5lc3NNb2RlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIFZhbHVlOiAkXCIgK1xyXG4gICAgICAgIF9idXNpbmVzc1ZhbHVlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkNhc2ggUGF5bWVudDogJFwiICtcclxuICAgICAgICBfcGF5QW1vdW50ICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcImlmIG9mZmVyIGlzIGFjY2VwdGVkIHlvdSB3aWxsIHJlY2VpdmUgNTAlIHNoYXJlIG9mIHRoYXQgcGFydGljdWxhciBidXNpbmVzcyBhbmQgd2lsbCByZWNlaXZlIHByb2ZpdC9sb3NlIG9uIHRoYXQgcGFydGljdWxhciBidXNpbmVzcy5cIjtcclxuXHJcbiAgICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoID49IF9wYXlBbW91bnQpIHtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoIC09IF9wYXlBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAodHJ1ZSwgX3BheUFtb3VudCwgZmFsc2UsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJjb25ncmF0dWxhdGlvbnMhIHlvdSBoYXZlIHN0YXJ0ZWQgYnVzaW5lc3MgcGFydG5lcnNoaXBcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoZmFsc2UsIDAsIHRydWUsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfaXNBY2NlcHRlZCA9IGZhbHNlLCBfcGF5bWVudCA9IDAsIF9pc0NhbmNlbGxlZCA9IGZhbHNlLCBfdUlEID0gXCJcIiwgX2RhdGEgPSBudWxsLCBfYnVzaW5lc3NJbmRleCA9IDApIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSB7IERhdGE6IHsgQWNjZXB0ZWQ6IF9pc0FjY2VwdGVkLCBDYXNoUGF5bWVudDogX3BheW1lbnQsIENhbmNlbGxlZDogX2lzQ2FuY2VsbGVkLCBQbGF5ZXJJRDogX3VJRCwgUGxheWVyRGF0YTogX2RhdGEsIEJ1c2luZXNzSW5kZXg6IF9idXNpbmVzc0luZGV4IH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTIsIF9tYWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfZGF0YSkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdmFyIF9hY2NlcHRlZCA9IF9kYXRhLkRhdGEuQWNjZXB0ZWQ7XHJcbiAgICAgIHZhciBfY2FzaCA9IF9kYXRhLkRhdGEuQ2FzaFBheW1lbnQ7XHJcbiAgICAgIHZhciBfY2FuY2VsbGVkID0gX2RhdGEuRGF0YS5DYW5jZWxsZWQ7XHJcbiAgICAgIHZhciBfdWlkID0gX2RhdGEuRGF0YS5QbGF5ZXJJRDtcclxuICAgICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLkJ1c2luZXNzSW5kZXg7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcImFuc3dlciByZWNlaXZlZFwiKTtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Nhc2g7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCA9IHRydWU7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3VpZDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIGFjY2VwdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiLCBjYXNoICRcIiArIF9jYXNoICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBhY2NvdW50LlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmluY2x1ZGVzKF91aWQpID09IGZhbHNlKSBDYW5jZWxsZWRJRC5wdXNoKF91aWQpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKENhbmNlbGxlZElEKTtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5sZW5ndGggPT0gX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gY2FuY2VsbGVkIGJ5IGFsbCBvdGhlciB1c2Vycy5cIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciByZWplY3RlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICBSZXNldEdvbGRJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5Hb2xkRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5TdG9ja0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbChfYW1vdW50KSB7XHJcbiAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBfYW1vdW50O1xyXG5cclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgdmFyIF9hbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqXCIgKyBFbnRlckJ1eVNlbGxBbW91bnQgKyBcIj1cIiArIF9hbW91bnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB0aGlzLlJlc2V0R29sZElucHV0KCk7XHJcbiAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChfdGl0bGUsIF9kaWNlUmVzdWx0LCBfcHJpY2VUaXRsZSwgX3ByaWNlVmFsdWUsIF9idXlPclNlbGxUaXRsZSwgX3RvdGFsQW1vdW50VGl0bGUsIF90b3RhbEFtb3VudFZhbHVlLCBfYnV0dG9uTmFtZSwgX3N0YXRlKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2VSZXN1bHQ7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVGl0bGVMYWJlbC5zdHJpbmcgPSBfcHJpY2VUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZyA9IF9wcmljZVZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXlPclNlbGxUaXRsZUxhYmVsLnN0cmluZyA9IF9idXlPclNlbGxUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRUaXRsZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1dHRvbk5hbWVMYWJlbC5zdHJpbmcgPSBfYnV0dG9uTmFtZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVEYXRhX0ludmVzdFNlbGwoX3RvdGFsQW1vdW50VmFsdWUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIEFwcGx5QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcblxyXG4gICAgICBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTERcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiQnV5aW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBPdW5jZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIE91bmNlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIGlmIChfYW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50IC09IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlNvbGQgT3VuY2VzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBPdW5jZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggR09MRCBvdW5jZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgKyBcIiBvZiBHT0xEIG91bmNlc1wiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgLy9jYW4gYWRkIG11bHRpcGxlIHN0b2NrcyB3aXRoIGJ1c2luZXNzIG5hbWUgaW4gb2JqZWN0IGlmIHJlcXVpcmVkXHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIHNoYXJlcyBvZiBidXNpbmVzcyBcIiArIFN0b2NrQnVzaW5lc3NOYW1lLCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJCdXlpbmcgU1RPQ0s6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIHNoYXJlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBzaGFyZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIHNoYXJlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuXHJcbiAgICAgICAgaWYgKF9hbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCAtPSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgKyBfYW1vdW50ICsgXCIgc2hhcmVzIG9mIHN0b2NrIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIFNUT0NLOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBzaGFyZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJTb2xkIHNoYXJlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3Igc2hhcmVzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIHN0b2NrcyBzaGFyZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICsgXCIgb2Ygc3RvY2sgc2hhcmVzXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXlkYXkgb3IgRG91YmxlIHBheSBEYXlcclxuICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKSB7XHJcbiAgICBpZiAoSE1BbW91bnQgPT0gMCkge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChCTUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWxvYW5UYWtlbikge1xyXG4gICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdldExvYW5BbW91bnRfUGF5RGF5KCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdmFyIF9sb2FuID0gMDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hbiA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xvYW47XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXkgPSBmYWxzZSwgX3NraXBITSA9IGZhbHNlLCBfc2tpcEJNID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgX2hNQW1vdW50ID0gMCwgX2JtQW1vdW50ID0gMCwgX2JtTG9jYXRpb24gPSAwLCBQYXlkYXlDb3VudGVyID0gMSwgRG91YmxlUGF5Q291bnRlciA9IDAsIF9oYWxmUGF5ZGF5ID0gZmFsc2UpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgVG90YWxQYXlEYXkgPSAwO1xyXG5cclxuICAgIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG4gICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5KSB7XHJcbiAgICAgIEdpdmVQcm9maXRVc2VySUQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlVzZXJJREZvclByb2ZpdFBheURheTtcclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYW5HaXZlUHJvZml0T25QYXlEYXkgPSBmYWxzZTtcclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKEdpdmVQcm9maXRVc2VySUQpO1xyXG4gICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkpO1xyXG5cclxuICAgIGlmIChHaXZlUHJvZml0VXNlcklEICE9IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdob2xlIHByb2ZpdCB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIG90aGVyIHBsYXllciB0aGlzIHR1cm4uXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIEhCRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgQk1EaWNlQ291bnRlciA9IDA7XHJcbiAgICBOZXh0SGFsZlBheURheSA9IF9oYWxmUGF5ZGF5O1xyXG4gICAgLy8gICBpZiAoRG91YmxlUGF5Q291bnRlciA9PSAwKSBEb3VibGVQYXlDb3VudGVyID0gMTtcclxuXHJcbiAgICAvLyAgaWYgKERvdWJsZVBheURheSkgRG91YmxlUGF5Q291bnRlciA9IERvdWJsZVBheUNvdW50ZXIgKiAyO1xyXG5cclxuICAgIERvdWJsZURheUJ1c2luZXNzSEIgPSAwO1xyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NCTSA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0hCKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0JNKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKERvdWJsZURheUJ1c2luZXNzSEIgPiAwIHx8IERvdWJsZURheUJ1c2luZXNzQk0gPiAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gXCIgKyAoRG91YmxlRGF5QnVzaW5lc3NIQiArIERvdWJsZURheUJ1c2luZXNzQk0pICsgXCIgYnVzaW5lc3MvZXMuXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcmVzID0gUGF5ZGF5Q291bnRlciArIERvdWJsZVBheUNvdW50ZXI7XHJcbiAgICBQYXlEYXlJbmZvID0gXCJQYXlEYXkgUmVzdWx0IHdpdGggbXVsdGlwbGllcjogXCIgKyBfcmVzO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gUGF5ZGF5Q291bnRlcjtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5Q291bnQgPSBEb3VibGVQYXlDb3VudGVyO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gX2lzRG91YmxlUGF5RGF5O1xyXG4gICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdmFyIF90aW1lID0gMTgwMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBfZm9yU2VsZWN0ZWRCdXNpbmVzcztcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9TZWxlY3RlZEJ1c2luZXNzSW5kZXg7XHJcbiAgICBITUFtb3VudCA9IF9oTUFtb3VudDtcclxuICAgIEJNQW1vdW50ID0gX2JtQW1vdW50O1xyXG4gICAgQk1Mb2NhdGlvbnMgPSBfYm1Mb2NhdGlvbjtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChOZXh0SGFsZlBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdpbGwgcmVjZWl2ZSBoYWxmIHByb2ZpdHMgdGhpcyBwYXlkYXkuXCIsIF90aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvYW5UYWtlbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBsb2FuVGFrZW4gPSBfbG9hblRha2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZyA9IEJNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmcgPSBCTUxvY2F0aW9ucztcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5QYXNzZWRQYXlEYXlDb3VudExhYmVsLnN0cmluZyA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICB2YXIgX2xvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICRcIiArIF9sb2FuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJDUwMDBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG5cclxuICAgIGlmIChfc2tpcEJNIHx8IF9za2lwSE0pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgX3RpbWUgKyAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5PbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgaWYgKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcbiAgICAgIHZhciBfaGFsZlBheWRheSA9IE5leHRIYWxmUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG5cclxuICAgICAgaWYgKF9oYWxmUGF5ZGF5KSBfbXVsdGlwbGllciA9IF9tdWx0aXBsaWVyIC8gMjtcclxuXHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG4gICAgICBpZiAoX2RvdWJsZVBheURheSkge1xyXG4gICAgICAgIGlmICh0aGlzLkRvdWJsZVBheURheUNvdW50ICE9IDApIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyICo9IDIgKiB0aGlzLkRvdWJsZVBheURheUNvdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGRvdWJsZVBheURheUFkZGVkID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIERvdWJsZURheUJ1c2luZXNzSEIgKiBfZGljZSAqIDEwMDA7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSBUb3RhbFBheURheUFtb3VudCA9IF9tdWx0aXBsaWVyICogX3BheWRheW11bHRpcGxpZXIgKiBITUFtb3VudCAqIF9kaWNlICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgZWxzZSBUb3RhbFBheURheUFtb3VudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiAoSE1BbW91bnQgKiBfZGljZSkgKiAxMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIEhNQW1vdW50ICsgXCIqXCIgKyBcIjEwMDApLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiK1wiICsgZG91YmxlUGF5RGF5QWRkZWQgKyBcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJIb21lIEJhc2VkIEJ1c2luZXNzOiBcIiArIEhNQW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG4gICAgICB2YXIgX2hhbGZQYXlkYXkgPSBOZXh0SGFsZlBheURheTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9hbW91bnQgPSBCTUFtb3VudCArIEJNTG9jYXRpb25zO1xyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICBpZiAoX2hhbGZQYXlkYXkpIF9tdWx0aXBsaWVyID0gX211bHRpcGxpZXIgLyAyO1xyXG5cclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5Eb3VibGVQYXlEYXlDb3VudCAhPSAwKSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyICogdGhpcy5Eb3VibGVQYXlEYXlDb3VudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgKj0gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkb3VibGVQYXlEYXlBZGRlZCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBEb3VibGVEYXlCdXNpbmVzc0JNICogX2RpY2UgKiAyMDAwO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIFRvdGFsUGF5RGF5QW1vdW50ID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIF9hbW91bnQgKiBfZGljZSAqIDIwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgIGVsc2UgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogKF9hbW91bnQgKiBfZGljZSkgKiAyMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBfYW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKS1cIiArIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBcIitcIiArIGRvdWJsZVBheURheUFkZGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJCcmljayAmIE1vcnRhciBCdXNpbmVzczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2UgX0VzdGltYXRlTG9hbiA9IDUwMDA7XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfRXN0aW1hdGVMb2FuKSB7XHJcbiAgICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlUGF5bWVudF9QYXlEYXkoKSB7XHJcbiAgICAvL2FsbFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJBbW91bnQgJFwiICsgVG90YWxQYXlEYXlBbW91bnQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTa2lwTG9hbk9uZVRpbWVfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBza2lwcGVkIHRoZSBsb2FuIHBheW1lbnQsIGJhbmsgd2lsbCBjYWxsIHVwb24gY29tcGxldGUgbG9hbiBhbW91bnQgb24gbmV4dCBwYXlkYXlcIik7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1BheURheShfYW1vdW50KSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBFeGl0TG9hblNjcmVlbl9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBQcm9jZXNzQmFua3J1cHQoX3Nob3dUZXh0ID0gdHJ1ZSwgX3R4dCwgX3RpbWUpIHtcclxuICAgIGlmIChfc2hvd1RleHQpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoX3R4dCwgX3RpbWUsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLkV4aXRfU2VsZWN0UGxheWVyR2VuZXJpYygpO1xyXG4gICAgICB0aGlzLkV4aXRTY3JlZW5fX0J1c2luZXNzR2VucmljKCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlKGZhbHNlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNzaW9uMDFTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICB0aGlzLlRvZ2dsZU1haW5TY3JlZW5fRGFtYWdlRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICB0aGlzLkV4aXRMb2FuU2NyZWVuX1BheURheSgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICB0aGlzLkV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlKCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyhmYWxzZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJTaG93Q2FyZFwiLCBcIlwiLCBmYWxzZSk7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVBheURheShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQmFua3J1cHRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB9LCBfdGltZSArIDEwKTtcclxuICB9LFxyXG4gIFN0YXJ0TmV3R2FtZV9QYXlEYXkoKSB7XHJcbiAgICAvL2lmIGJhbmtydXB0ZWQgeW91IGNhbiBzdGFydCBuZXcgZ2FtZVxyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgaWYgKG1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoQmFua1J1cHRlZENhcmQpIHtcclxuICAgICAgICBCYW5rUnVwdGVkQ2FyZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGljZVJlc3VsdFNjcmVlbl9EYW1hZ2VEZWNpc2lvbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgICB0aGlzLkV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5FeGl0X1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNzaW9uMDFTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuRXhpdFNjcmVlbl9fQnVzaW5lc3NHZW5yaWMoKTtcclxuICAgICAgICB0aGlzLkV4aXRMb2FuU2NyZWVuX1BheURheSgpO1xyXG4gICAgICAgIHZhciBfc2VuZGluZ0RhdGEgPSB7IElEOiBTZW5kZXJEYW1hZ2luZ0lELCBDYXNoOiBEYW1hZ2VEZWNpc2lvblJlc3VsdCwgSXNEaWNlUm9sbGVkOiB0cnVlLCBJc0JhbmtSdXB0ZWQ6IHRydWUgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDI1LCBfc2VuZGluZ0RhdGEpO1xyXG5cclxuICAgICAgICB2YXIgX215QWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB2YXIgcGxheWVyRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHBsYXllckRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAocGxheWVyRGF0YVtpbmRleF0uUGxheWVyVUlEID09IF9teUFjdG9yLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICBwbGF5ZXJEYXRhW2luZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5CYW5rcnVwdGVkTmV4dFR1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBwbGF5ZXJEYXRhW2luZGV4XSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3Ugd2lsbCBsb3NlIGFsbCBwcm9ncmVzcyBhbmQgc3RhcnQgbmV3IGdhbWUgZnJvbSB0aGUgc3RhcnQgbmV4dCB0dXJuLlwiLCAzMDAwLCBmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qcm9jZXNzQmFua3J1cHQodHJ1ZSwgXCJZb3Ugd2lsbCBsb3NlIGFsbCBwcm9ncmVzcyBhbmQgc3RhcnQgbmV3IGdhbWUgZnJvbSB0aGUgc3RhcnQuXCIsIDMwMDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT0gMSkge1xyXG4gICAgICB0aGlzLlByb2Nlc3NCYW5rcnVwdCh0cnVlLCBcIllvdSB3aWxsIGxvc2UgYWxsIHByb2dyZXNzIGFuZCBzdGFydCBuZXcgZ2FtZSBmcm9tIHRoZSBzdGFydC5cIiwgMzAwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdHYW1lX0JhbmtSdXB0ZWQoX3R4dCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIHRoaXMuUHJvY2Vzc0JhbmtydXB0KHRydWUsIF90eHQsIDMwMDApO1xyXG4gIH0sXHJcblxyXG4gIFNob3dJbmZvKF9kYXRhKSB7XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihcInJlZWNpZXZlZCBpZDogXCIrX2RhdGEuUGxheWVyVUlEKTtcclxuICAgIGlmKF9kYXRhLlBsYXllclVJRD09XCJcIilcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoX2RhdGEuaW5mbywgMjAwMCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgICAgaWYobW9kZT09MikgLy9yZWFsIHBsYXllcnNcclxuICAgICAge1xyXG4gICAgICAgICAgdmFyIF9teVVJRD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0TXlQbGF5ZXJVSUQoKTtcclxuICAgICAgICAgIGlmKF9teVVJRD09X2RhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChfZGF0YS5pbmZvLCAzMDAwLCB0cnVlKTtcclxuICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJub3RoaW5nXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUGF5RGF5Q29tcGxldGVkKCkge1xyXG4gICAgaWYgKEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgJiYgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkICYmIExvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgY29uc29sZS5sb2coXCJhbGwgcGF5ZGF5IGRvbmVcIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoR2l2ZVByb2ZpdFVzZXJJRCAhPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3VyIHdob2xlIFBheWRheSBhbW91bnQgJFwiICsgVG90YWxQYXlEYXkgKyBcIiB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIG90aGVyIHBsYXllciBub3cuXCIsIDIyMDApO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxQYXlEYXk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oVG90YWxQYXlEYXksIEdpdmVQcm9maXRVc2VySUQpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNvbXBsZXRpb24oKTtcclxuICAgICAgICB9LCAzMjAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDb21wbGV0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yQ29tcGxldGlvbigpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlciA+IDApIHtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheUNvdW50ZXItLTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfbWFuYWdlci5Ub2dnbGVIYWxmUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIF9tYW5hZ2VyLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX21hbmFnZXIuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oUGF5RGF5SW5mbyk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGwgJiBtYW5pcHVsYXRlIEJ1c2luZXNzIFVJXHJcbiAgVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKF9zZWxsQW1vdW50ID0gMCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMTFwiO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nID0gXCJObyBvZiBCdXNpbmVzc2VzIDogXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzU2VsbFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChfc2VsbEFtb3VudCAhPSAwKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRTZWxsaW5nQW1vdW50KF9zZWxsQW1vdW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKGZhbHNlKTtcclxuICAgICAgZWxzZSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIGlmICghX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVTSU5FU1NcIjtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2VsZWN0QnVzaW5lc3Nmb3JQYXlEYXkoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAvLyBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIC8vIGVsc2VcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIFJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKF9pc1R1cm5vdmVyID0gZmFsc2UsIF9zZWxsQW1vdW50ID0gMCkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKF9zZWxsQW1vdW50KTtcclxuICB9LFxyXG5cclxuICBFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX2lzQm90KSB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG5cclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90KTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgVUlcclxuICBUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiSU5WRVNUXCI7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICBUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVZIE9SIFNFTExcIjtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzZXR1cCBVaVxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNob3dRdWVzdGlvblRvYXN0KF9tc2cpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW5MYWJlbC5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBvbmVRdWVzdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBvbmVRdWVzdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXNnKSB7XHJcbiAgICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvbkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUXVlc3Rpb25MYWJlbC5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxlY3QgQnVzaW5lc3MgZm9yIGRvdWJsZSBwYXlkYXkgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc0RvdWJsZVBheVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfbWFpblRpdGxlLCBfdGlsZUNvbnRlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlRpdGxlTmFtZS5zdHJpbmcgPSBfbWFpblRpdGxlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuVGl0bGVDb250ZW50TGFiZWwuc3RyaW5nID0gX3RpbGVDb250ZW50O1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKCkge1xyXG4gICAgdGhpcy5DbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2NyZWVuX0Fsb25nVHVybk92ZXJfQnVzaW5lc3NQYXlEYXlVSVNldHVwKCkge1xyXG4gICAgdGhpcy5DbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG4gIH0sXHJcbiAgUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfdGVtcERhdGEsIF9idXNpbmVzc1R5cGUpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSBfYnVzaW5lc3NUeXBlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5CdXNpbmVzc1ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgICB2YXIgX3RvdGFsTG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgICAgICB2YXIgX2FsbExvY2F0aW9uc0Ftb3VudCA9IF90b3RhbExvY2F0aW9ucyAqIDI1MDAwO1xyXG4gICAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5QYXJ0bmVyTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKFwibm9uZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMucHVzaChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNlbGV0aXZlRG91YmxlUGF5RGF5X0J1c2luZXNzUGF5RGF5VUlTZXR1cChfaXNIb21lQmFzZWQgPSBmYWxzZSwgX2lzQnJpY2tBbmRNb3J0YXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5DbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgdGhpcy5FZGl0VGl0bGVfQnVzaW5lc3NQYXlEYXlVSVNldHVwKFwiQlVTSU5FU1NcIiwgXCIqU2VsZWN0IGEgYnVzaW5lc3MgdG8gcmVjZWl2ZSBkb3VibGUgcGF5ZGF5IHByb2ZpdHMgdGhyb3VnaCBvdXQgZ2FtZSBvbiB0aGF0IGJ1c2luZXNzLlwiKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlBsYXllck5hbWUuc3RyaW5nID0gX3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5QbGF5ZXJDYXNoLnN0cmluZyA9IFwiJFwiICsgX3RlbXBEYXRhLkNhc2g7XHJcblxyXG4gICAgaWYgKF9pc0JyaWNrQW5kTW9ydGFyKSB7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfdGVtcERhdGEsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNIb21lQmFzZWQpIHtcclxuICAgICAgdGhpcy5Qcm9jZXNzQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKF90ZW1wRGF0YSwgMSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGVjdCBQbGF5ZXIgZm9yIHByb2ZpdFxyXG4gIFRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMRUNUIFBMQVlFUlwiO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGVJbmRleCA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzZWxlY3RQbGF5ZXJQcm9maXROb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gKGdlbmVyaWMgcGxheWVyKSBTZWxlY3QgUGxheWVyIHRvIFRha2Ugb3ZlciBidXNpbmVzc1xyXG4gIFRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3Zlcihfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCwgX2J1eUhhbGZCdXNpbmVzcyA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTEVDVCBQTEFZRVJcIjtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICB2YXIgX21haW5EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2J1eUhhbGZCdXNpbmVzcykge1xyXG4gICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRCdXlIYWxmKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IF9tYWluRGF0YS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgIGlmIChfbWFpbkRhdGFba10uUGxheWVyVUlEID09IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllckluZGV4KGspO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxlY3RlZFBsYXllclRha2VPdmVyLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgc2VsZWN0ZWRQbGF5ZXJUYWtlT3Zlci5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNlbGVjdGVkUGxheWVyVGFrZU92ZXIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHNlbGVjdGVkUGxheWVyVGFrZU92ZXJbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHNlbGVjdGVkUGxheWVyVGFrZU92ZXIgPSBbXTtcclxuICB9LFxyXG5cclxuICBFeGl0X1NlbGVjdFBsYXllckdlbmVyaWMoKSB7XHJcbiAgICB0aGlzLlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmcoKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcigpO1xyXG4gICAgdGhpcy5SZXNldFNwYWNlU2NyZWVuX0NvbXBhcmVEaWNlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcihmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoZmFsc2UpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckdlbmVyaWMoKSB7XHJcbiAgICB0aGlzLlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmcoKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcigpO1xyXG4gICAgdGhpcy5SZXNldFNwYWNlU2NyZWVuX0NvbXBhcmVEaWNlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcihmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoZmFsc2UpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG4gXHJcbiAgLy8jcmVnaW9uIChnZW5lcmljIGJ1c2luZXNzKSBTZWxlY3QgQnVzaW5lc3MgdG8gdGFrZSBvdmVyXHJcbiAgVG9nZ2xlU2NyZWVuX0J1c2luZXNzVGFrZU92ZXIoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXJTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfQnVzaW5lc3NUYWtlT3ZlcihfcGxheWVyRGF0YSwgX090aGVyUGxheWVySW5kZXggPSAwLCBfYnV5SGFsZkJ1c2luZXNzID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRfQnVzaW5lc3NUYWtlT3ZlcigpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX3BsYXllckRhdGE7XHJcbiAgICBjb25zb2xlLmxvZyhfdGVtcERhdGEpO1xyXG5cclxuICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVTSU5FU1NcIjtcclxuICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5TZWxlY3RCdXNpbmVzc1Rha2VPdmVyLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGxheWVyT2JqZWN0KF9wbGF5ZXJEYXRhKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQbGF5ZXJJbmRleChfT3RoZXJQbGF5ZXJJbmRleCk7XHJcblxyXG4gICAgICBpZiAoX2J1eUhhbGZCdXNpbmVzcykge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuc2V0SGFsZkJ1c2luZXNzKHRydWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBidXNpbmVzc1Rha2VPdmVyTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldF9CdXNpbmVzc1Rha2VPdmVyKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzVGFrZU92ZXJOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NUYWtlT3Zlck5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVzaW5lc3NUYWtlT3Zlck5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2NyZWVuX19CdXNpbmVzc1Rha2VPdmVyKF9pc1R1cm5vdmVyID0gZmFsc2UsIF9wbGF5ZXJEYXRhID0gbnVsbCwgX3BsYXllckluZGV4ID0gMCwgX2J1eUhhbGZCdXNpbmVzcyA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxlY3RCdXNpbmVzc1Rha2VPdmVyLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1Rha2VPdmVyKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX0J1c2luZXNzVGFrZU92ZXIoX3BsYXllckRhdGEsIF9wbGF5ZXJJbmRleCwgX2J1eUhhbGZCdXNpbmVzcyk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNjcmVlbl9fQnVzaW5lc3NHZW5yaWMoKSB7XHJcbiAgICB0aGlzLlJlc2V0X19EYW1hZ2VEZWNpc2lvbigpO1xyXG4gICAgdGhpcy5SZXNldF9CdXNpbmVzc1Rha2VPdmVyKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzVGFrZU92ZXIoZmFsc2UpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fU2VsbEFsbEJ1c2luZXNzKGZhbHNlKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxsQWxsQnVzaW5lc3MoKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2NyZWVuQWxvbmdUdXJuT3Zlcl9fQnVzaW5lc3NHZW5yaWMoKSB7XHJcbiAgICB0aGlzLlJlc2V0X19EYW1hZ2VEZWNpc2lvbigpO1xyXG4gICAgdGhpcy5SZXNldF9CdXNpbmVzc1Rha2VPdmVyKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1Rha2VPdmVyKGZhbHNlKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1NlbGxBbGxCdXNpbmVzcyhmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxsQWxsQnVzaW5lc3MoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGVjdCBQbGF5ZXIgd2hvbWUgeW91IGhhdmUgcmVjZWl2ZWQgZGFtYWdpbmcgaW5mb3JtYXRpb24gYW5kIHdhbnQgdG8gZ2l2ZSB0aGVtIGNob2ljZVxyXG4gIFRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmcoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJTRUxFQ1QgUExBWUVSXCI7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXAuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXAuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nID0gXCJObyBvZiBQbGF5ZXJzOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgdmFyIF9tYWluRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBfbWFpbkRhdGEubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICBpZiAoX21haW5EYXRhW2tdLlBsYXllclVJRCA9PSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJJbmRleChrKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxlY3RlZFBsYXllckRhbWFnaW5nLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgc2VsZWN0ZWRQbGF5ZXJEYW1hZ2luZy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNlbGVjdGVkUGxheWVyRGFtYWdpbmcubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHNlbGVjdGVkUGxheWVyRGFtYWdpbmdbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHNlbGVjdGVkUGxheWVyRGFtYWdpbmcgPSBbXTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIERhbWFnaW5nIGluZm9ybWF0aW9uIGNhcmQgZGVjaXNvbiBzZXR1cFxyXG4gIFRvZ2dsZU1haW5TY3JlZW5fRGFtYWdlRGVjaXNpb24oX3N0YXRlKSB7XHJcbiAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5NYWluU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVEaWNlUmVzdWx0U2NyZWVuX0RhbWFnZURlY2lzaW9uKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGljZVJlc3VsdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlQnVzaW5lc3NTY3JlZW5fRGFtYWdlRGVjaXNpb24oX3N0YXRlKSB7XHJcbiAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5CdXNpbmVzc1NlbGVjdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9EYW1hZ2VEZWNpc2lvbihfcGxheWVyRGF0YSwgX090aGVyUGxheWVySW5kZXggPSAwKSB7XHJcbiAgICB0aGlzLlJlc2V0X19EYW1hZ2VEZWNpc2lvbigpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX3BsYXllckRhdGE7XHJcbiAgICBjb25zb2xlLmxvZyhfdGVtcERhdGEpO1xyXG5cclxuICAgIHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LlRpdGxlTGFiZWwuc3RyaW5nID0gXCJCVVNJTkVTU1wiO1xyXG4gICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuQ2FzaExhYmVsLnN0cmluZyA9IF9wbGF5ZXJEYXRhLkNhc2g7XHJcbiAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5EYW1hZ2VCdXNpbmVzc1NlbGVjdC5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX3BsYXllckRhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQbGF5ZXJPYmplY3QoX3BsYXllckRhdGEpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBsYXllckluZGV4KF9PdGhlclBsYXllckluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGFtYWdpbmdOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0X19EYW1hZ2VEZWNpc2lvbigpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RhbWFnaW5nTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGFtYWdpbmdOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1c2luZXNzRGFtYWdpbmdOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKF9pc1R1cm5vdmVyID0gZmFsc2UsIF9wbGF5ZXJEYXRhID0gbnVsbCwgX3BsYXllckluZGV4ID0gMCwgX25vQnV0dG9uID0gZmFsc2UpIHtcclxuICAgIGlmIChfbm9CdXR0b24gPT0gZmFsc2UpIHtcclxuICAgICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5EYW1hZ2VCdXNpbmVzc1NlbGVjdC5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5EYW1hZ2VCdXNpbmVzc1NlbGVjdC5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX0RhbWFnZURlY2lzaW9uKF9wbGF5ZXJEYXRhLCBfcGxheWVySW5kZXgpO1xyXG4gIH0sXHJcblxyXG4gIFNldE1lc2FnZVRleHRfRGFtYWdlRGVjaXNpb24oX3R4dCkge1xyXG4gICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF90eHQ7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlRGljZVJlc3VsdF9EYW1hZ2VEZWNpc2lvbigpIHtcclxuICAgIHRoaXMuVG9nZ2xlRGljZVJlc3VsdFNjcmVlbl9EYW1hZ2VEZWNpc2lvbih0cnVlKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfZGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgdmFyIF9maW5lTXVsdGlwbGllciA9IDMwMDA7XHJcbiAgICBEYW1hZ2VEZWNpc2lvblJlc3VsdCA9IF9kaWNlUmVzdWx0ICogX2ZpbmVNdWx0aXBsaWVyO1xyXG5cclxuICAgIHZhciBfdGV4dCA9IFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJBbW91bnQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCIgKiBcIiArIF9maW5lTXVsdGlwbGllciArIFwiID0gXCIgKyBEYW1hZ2VEZWNpc2lvblJlc3VsdDtcclxuICAgIHRoaXMuU2V0TWVzYWdlVGV4dF9EYW1hZ2VEZWNpc2lvbihfdGV4dCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0U2VuZGVySURfRGFtYWdlRGVjaXNpb24oSUQpIHtcclxuICAgIFNlbmRlckRhbWFnaW5nSUQgPSBJRDtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfRGFtYWdlRGVjaXNpb24oX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfcmVjaXZlcklEID0gX2RhdGEuSUQ7XHJcbiAgICAgIHZhciBfY2FzaFJlY2VpdmVkID0gX2RhdGEuQ2FzaDtcclxuICAgICAgdmFyIF9pc0RpY2VSb2xsZWQgPSBfZGF0YS5Jc0RpY2VSb2xsZWQ7XHJcbiAgICAgIHZhciBfaXNCYW5rcnVwdGVkID0gX2RhdGEuSXNCYW5rUnVwdGVkO1xyXG5cclxuICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgIGlmIChfbXlBY3Rvci5QbGF5ZXJVSUQgPT0gX3JlY2l2ZXJJRCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0X1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgICBpZiAoX2lzRGljZVJvbGxlZCkge1xyXG4gICAgICAgICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKV0uQ2FzaCArPSBfY2FzaFJlY2VpdmVkO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHJlY2VpdmVkIGNhc2ggb2YgJFwiICsgX2Nhc2hSZWNlaXZlZCArIFwiLCB0b3RhbCBjYXNoIGJlY29tZXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX21hbmFnZXIuR2V0VHVybk51bWJlcigpXS5DYXNoKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWQsIHR1cm4gd2lsbCBjaGFuZ2Ugbm93LlwiKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIGJlZW4gZ2l2ZW4gb3duZXJzaGlwIHRvIG9uZSBvZiB0aGUgYnVzaW5lc3Mgb2Ygb3RoZXIgcGxheWVyLlwiKTtcclxuICAgICAgICAgIF9tYW5hZ2VyLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQYXlBbW91bnRfRGFtYWdlRGVjaXNpb24oKSB7XHJcbiAgICB2YXIgX215QWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IF9teUFjdG9yLlBsYXllclVJRCkge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCA+PSBEYW1hZ2VEZWNpc2lvblJlc3VsdCkge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gRGFtYWdlRGVjaXNpb25SZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgICAgIEJhbmtSdXB0ZWRDYXJkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIG9mZiBhbW91bnQgJFwiICsgRGFtYWdlRGVjaXNpb25SZXN1bHQgKyBcIiAsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTtcclxuXHJcbiAgICAgICAgICB2YXIgX3NlbmRpbmdEYXRhID0geyBJRDogU2VuZGVyRGFtYWdpbmdJRCwgQ2FzaDogRGFtYWdlRGVjaXNpb25SZXN1bHQsIElzRGljZVJvbGxlZDogdHJ1ZSwgSXNCYW5rUnVwdGVkOiBmYWxzZSB9O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyNSwgX3NlbmRpbmdEYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgQmFua1J1cHRlZENhcmQgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRCYW5rcnVwdGVkVmFyKF92YWwpXHJcbiAge1xyXG4gICAgQmFua1J1cHRlZENhcmQ9X3ZhbDtcclxuICB9LFxyXG5cclxuICBTZWxlY3RCdXNpbmVzc0ZvckhhbGZPd25lcnNoaXBfRGFtYWdpbmdEZWNpc2lvbihfcGxheWVyRGF0YSwgX2J1c2luZXNzSW5kZXgsIF9zZWxlY3RlZFBsYXllckluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5FeGl0U2NyZWVuX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJzRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvO1xyXG4gICAgdmFyIF9teURhdGFJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIHZhciBfdHVybiA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICBfcGxheWVyc0RhdGFbX215RGF0YUluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXAgPSB0cnVlO1xyXG4gICAgX3BsYXllcnNEYXRhW19teURhdGFJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVySUQgPSBTZW5kZXJEYW1hZ2luZ0lEO1xyXG4gICAgX3BsYXllcnNEYXRhW19teURhdGFJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJzRGF0YVtfdHVybl0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfcGxheWVyc0RhdGFbX215RGF0YUluZGV4XSk7XHJcblxyXG4gICAgdGhpcy5Ub2dnbGVEaWNlUmVzdWx0U2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgIHRoaXMuVG9nZ2xlTWFpblNjcmVlbl9EYW1hZ2VEZWNpc2lvbihmYWxzZSk7XHJcbiAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBnaXZlbiBvd25lcnNoaXAgb2Ygb25lIG9mIHlvdXIgYnVzaW5lc3MgdG8gb3RoZXIgcGxheWVyLlwiKTtcclxuICAgIHZhciBfc2VuZGluZ0RhdGEgPSB7IElEOiBTZW5kZXJEYW1hZ2luZ0lELCBDYXNoOiBEYW1hZ2VEZWNpc2lvblJlc3VsdCwgSXNEaWNlUm9sbGVkOiBmYWxzZSwgSXNCYW5rUnVwdGVkOiBmYWxzZSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyNSwgX3NlbmRpbmdEYXRhKTtcclxuICB9LFxyXG5cclxuICBHaXZlUGFydG5lclNoaXBfRGFtYWdlRGVjaXNpb24oKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllcnNEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm87XHJcbiAgICB2YXIgX215RGF0YUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG4gICAgdmFyIF9idXNpbmVzc0xlbmd0aCA9IF9wbGF5ZXJzRGF0YVtfbXlEYXRhSW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICB2YXIgX2J1c2luZXNzQ291bnRlciA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9wbGF5ZXJzRGF0YVtfbXlEYXRhSW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9wbGF5ZXJzRGF0YVtfbXlEYXRhSW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgIF9idXNpbmVzc0NvdW50ZXIrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfYnVzaW5lc3NDb3VudGVyID49IF9idXNpbmVzc0xlbmd0aCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIkFsbCBvZiB5b3VyIGV4aXN0aW5nIGJ1c2luZXNzZXMgYXJlIHdpdGggcGFydG5lcnNoaXAgd2l0aCBzb21lb25lLCB5b3UgY2Fubm90IHNlbGVjdCB0aGlzIG9wdGlvbi5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkVuYWJsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlLCBfcGxheWVyc0RhdGFbX215RGF0YUluZGV4XSwgX215RGF0YUluZGV4LCB0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1eSBIYWxmIGJ1c2luZXNzXHJcbiAgVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyhfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5SGFsZkJ1c2luZXNzVUlTZXR1cC5NYWluU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRUaXRsZVRleHRfQnV5SGFsZkJ1c2luZXNzKF90eHQpIHtcclxuICAgIHRoaXMuQnV5SGFsZkJ1c2luZXNzVUlTZXR1cC5UaXRsZUxhYmVsLnN0cmluZyA9IF90eHQ7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFRha2luZyBsb2FuIGZvciBwYXJ0bmVyc2hpcFxyXG4gIFRvZ2dsZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkxvYW5QYXJ0bmVyc2hpcFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgY29uc29sZS5lcnJvcihfYWN0b3JzRGF0YSk7XHJcbiAgICB0aGlzLkxvYW5QYXJ0bmVyc2hpcFNldHVwLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJTRUxFQ1QgUExBWUVSXCI7XHJcbiAgICB0aGlzLkxvYW5QYXJ0bmVyc2hpcFNldHVwLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuTG9hblBhcnRuZXJzaGlwU2V0dXAuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuTG9hblBhcnRuZXJzaGlwU2V0dXAuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nID0gXCJObyBvZiBQbGF5ZXJzOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgdmFyIF9tYWluRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLkxvYW5QYXJ0bmVyc2hpcFNldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IF9tYWluRGF0YS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgIGlmIChfbWFpbkRhdGFba10uUGxheWVyVUlEID09IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllckluZGV4KGspO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExhb25QYXJ0bmVyc2hpcEFycmF5LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoX2FjdG9yc0RhdGEpO1xyXG4gICAgICBjb25zb2xlLmVycm9yKF9teURhdGEpO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIExhb25QYXJ0bmVyc2hpcEFycmF5LnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuTG9hblBhcnRuZXJzaGlwU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuTG9hblBhcnRuZXJzaGlwU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkxvYW5QYXJ0bmVyc2hpcFNldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX0xvYW5QYXJ0bmVyc2hpcCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBMYW9uUGFydG5lcnNoaXBBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgTGFvblBhcnRuZXJzaGlwQXJyYXlbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIExhb25QYXJ0bmVyc2hpcEFycmF5ID0gW107XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuICBcclxuICAvLyNyZWdpb24gU2VsbCBhbGwgYnVzaW5lc3MgZXhjZXB0IG9uZVxyXG5cclxuICBUb2dnbGVTY3JlZW5fU2VsbEFsbEJ1c2luZXNzKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNjcmVlbl9fU2VsbEFsbEJ1c2luZXNzKF9pc1R1cm5vdmVyID0gZmFsc2UsIF9wbGF5ZXJEYXRhID0gbnVsbCwgX3BsYXllckluZGV4ID0gMCkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEFsbEJ1c2luZXNzU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQWxsQnVzaW5lc3NTZXR1cC5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEFsbEJ1c2luZXNzU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxBbGxCdXNpbmVzc1NldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1NlbGxBbGxCdXNpbmVzcyh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQWxsQnVzaW5lc3MoX3BsYXllckRhdGEsIF9wbGF5ZXJJbmRleCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9TZWxsQWxsQnVzaW5lc3MoX3BsYXllckRhdGEsIF9PdGhlclBsYXllckluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5SZXNldFNwYWNlU2NyZWVuX1NlbGxBbGxCdXNpbmVzcygpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX3BsYXllckRhdGE7XHJcbiAgICBjb25zb2xlLmxvZyhfdGVtcERhdGEpO1xyXG5cclxuICAgIHRoaXMuU2VsbEFsbEJ1c2luZXNzU2V0dXAuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVU0lORVNTXCI7XHJcbiAgICB0aGlzLlNlbGxBbGxCdXNpbmVzc1NldHVwLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLlNlbGxBbGxCdXNpbmVzc1NldHVwLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGxBbGxCdXNpbmVzc1NldHVwLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQWxsQnVzaW5lc3NTZXR1cC5CdXNpbmVzc1ByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQWxsQnVzaW5lc3NTZXR1cC5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGxheWVyT2JqZWN0KF9wbGF5ZXJEYXRhKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQbGF5ZXJJbmRleChfT3RoZXJQbGF5ZXJJbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBTZWxsQWxsQnVzaW5lc3NBcnJheS5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3BhY2VTY3JlZW5fU2VsbEFsbEJ1c2luZXNzKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlbGxBbGxCdXNpbmVzc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBTZWxsQWxsQnVzaW5lc3NBcnJheVtpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgU2VsbEFsbEJ1c2luZXNzQXJyYXkgPSBbXTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG4gIFxyXG4gIC8vI3JlZ2lvbiBTZWxlY3QgUGxheWVyIHRvIGNvbXBhcmUgZGljZSByb2xsXHJcbiAgICBUb2dnbGVTY3JlZW5fQ29tcGFyZURpY2UoX3N0YXRlKSB7XHJcbiAgICAgIHRoaXMuQ29tcGFyZURpY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gICAgfSxcclxuICBcclxuICAgIFNldFVwU3BhY2VTY3JlZW5fQ29tcGFyZURpY2UoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKF9hY3RvcnNEYXRhKTtcclxuICAgICAgdGhpcy5Db21wYXJlRGljZVNldHVwLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJTRUxFQ1QgUExBWUVSXCI7XHJcbiAgICAgIHRoaXMuQ29tcGFyZURpY2VTZXR1cC5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICAgIHRoaXMuQ29tcGFyZURpY2VTZXR1cC5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICB0aGlzLkNvbXBhcmVEaWNlU2V0dXAuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nID0gXCJObyBvZiBQbGF5ZXJzOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgXHJcbiAgICAgIHZhciBfbWFpbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm87XHJcbiAgXHJcbiAgICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5Db21wYXJlRGljZVNldHVwLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5Db21wYXJlRGljZVNldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gIFxyXG4gICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgX21haW5EYXRhLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX21haW5EYXRhW2tdLlBsYXllclVJRCA9PSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllckluZGV4KGspO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgQ29tcGFyZURpY2VBcnJheS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gIFxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoX2FjdG9yc0RhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoX215RGF0YSk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkNvbXBhcmVEaWNlU2V0dXAuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5Db21wYXJlRGljZVNldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgQ29tcGFyZURpY2VBcnJheS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIFxyXG4gICAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgICB0aGlzLkNvbXBhcmVEaWNlU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNvbXBhcmVEaWNlU2V0dXAuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Db21wYXJlRGljZVNldHVwLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkNvbXBhcmVEaWNlU2V0dXAuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIFxyXG4gICAgUmVzZXRTcGFjZVNjcmVlbl9Db21wYXJlRGljZSgpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IENvbXBhcmVEaWNlQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgQ29tcGFyZURpY2VBcnJheVtpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICB9XHJcbiAgICAgIENvbXBhcmVEaWNlQXJyYXkgPSBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlRGVjc2lvbjAxU2NyZWVuX0NvbXBhcmVEaWNlKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5Db21wYXJlRGljZURlY2lzaW9uMVNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLkNvbXBhcmVEaWNlRGVjaXNpb24yU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZVRpdGxlX0RlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShfbXNnKVxyXG4gICAge1xyXG4gICAgICB0aGlzLkNvbXBhcmVEaWNlRGVjaXNpb24yVGV4dC5zdHJpbmc9X21zZztcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlRGVjc2lvbjAyU2NyZWVuQnV0dG9uX0NvbXBhcmVEaWNlKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5Db21wYXJlRGljZURlY2lzaW9uMkJ1dHRvbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gTmFtaW5nIGdhbWUgY29tcGl0YXRvcnNcclxuXHJcbiAgVG9nZ2xlU2NyZWVuX0NvbXBpdGF0b3JVSShfc3RhdGUpXHJcbiAge1xyXG4gICAgdGhpcy5Db21waXRhdG9yU2V0dXBVSS5NYWluU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB0aGlzLkNvbXBpdGF0b3JTZXR1cFVJLkNvbXBFZGl0Qm94MS5zdHJpbmc9XCJcIjtcclxuICAgIHRoaXMuQ29tcGl0YXRvclNldHVwVUkuQ29tcEVkaXRCb3gyLnN0cmluZz1cIlwiO1xyXG4gICAgdGhpcy5Db21waXRhdG9yU2V0dXBVSS5Db21wRWRpdEJveDMuc3RyaW5nPVwiXCI7XHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlVGl0bGVfQ29tcGl0YXRvclVJKF9tc2cpXHJcbiAge1xyXG4gICAgdGhpcy5Db21waXRhdG9yU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1fbXNnO1xyXG4gIH0sXHJcblxyXG4gIE9uRG9uZUNsaWNrZWRfQ29tcGl0YXRvclVJKClcclxuICB7XHJcbiAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIHRleHQxPXRoaXMuQ29tcGl0YXRvclNldHVwVUkuQ29tcEVkaXRCb3gxLnN0cmluZztcclxuICAgIHZhciB0ZXh0Mj10aGlzLkNvbXBpdGF0b3JTZXR1cFVJLkNvbXBFZGl0Qm94Mi5zdHJpbmc7XHJcbiAgICB2YXIgdGV4dDM9dGhpcy5Db21waXRhdG9yU2V0dXBVSS5Db21wRWRpdEJveDMuc3RyaW5nO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleD1fbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX21hcmtldGluZ0Ftb3VudD1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuXHJcbiAgICB2YXIgVGV4dEFycmF5PVt0ZXh0MSx0ZXh0Mix0ZXh0M107XHJcblxyXG4gICAgdmFyIF9jaGVja0NvdW50ZXI9MDtcclxuICAgIHZhciBfdGVtcENvdW50ZXI9MDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSAmJiBfcGxheWVySW5kZXghPWluZGV4KVxyXG4gICAgICAgIF9jaGVja0NvdW50ZXIrKztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgVGV4dEFycmF5Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgaWYoVGV4dEFycmF5W2pdLnRvTG93ZXJDYXNlKCk9PV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lLnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgX3RlbXBDb3VudGVyKys7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZihfdGVtcENvdW50ZXI+PV9jaGVja0NvdW50ZXIgJiYgX3RlbXBDb3VudGVyIT0wICYmIF9jaGVja0NvdW50ZXIhPTApXHJcbiAgICB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91IGZyZWFraW4gd29uXCIpO1xyXG4gICAgICB2YXIgcHJvZml0PV9tYXJrZXRpbmdBbW91bnQrKF9tYXJrZXRpbmdBbW91bnQqNSk7XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9cHJvZml0O1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSB3ZXJlIHN1Y2Nlc3NmdWwgYW5kIHJlY2VpdmVkIDUwMCUgcHJvZml0IG9uIHlvdXIgbWFya2V0aW5nIGFtb3VudCwgeW91ciBjYXNoIGJlY29tZXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBmYWlsZWQgYW5kIGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuRXhpdEFsb25nVHVybk92ZXJfQ29tcGl0YXRvclVJKCk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfQ29tcGl0YXRvclVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQ29tcGl0YXRvclVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBDcmVhdGluZyBBZCBkZXNjcmlwdGlvbiBmb3IgZXZlcnlvbmUgdG8gdm90ZVxyXG4gIFRvZ2dsZVNjcmVlbl9UZWxldmlzaW9uQURTZXR1cChfc3RhdGUpXHJcbiAge1xyXG4gICAgdGhpcy5UZWxldmlzaW9uQURTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIHRoaXMuVGVsZXZpc2lvbkFEU2V0dXBVSS5NYWluRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICB9LFxyXG4gIFxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKF9zdGF0ZSlcclxuICB7XHJcbiAgICB0aGlzLlRlbGV2aXNpb25BRFNldHVwVUkuRGVjaXNpb25TY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBDaGFuZ2VEZWNpc2lvblNjcmVlblRleHRfVGVsZXZpc2lvbkFEU2V0dXAoX3R4dClcclxuICB7XHJcbiAgICB0aGlzLlRlbGV2aXNpb25BRFNldHVwVUkuRGVjaXNpb25TY3JlZW5UZXh0LnN0cmluZz1fdHh0O1xyXG4gIH0sXHJcblxyXG4gIE9uRG9uZUNsaWNrZWRfVGVsZXZpc2lvbkFEU2V0dXAoKVxyXG4gIHtcclxuICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4PV9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciB0ZXh0MT10aGlzLlRlbGV2aXNpb25BRFNldHVwVUkuTWFpbkVkaXRCb3guc3RyaW5nO1xyXG4gICAgdmFyIF9tYXJrZXRpbmdBbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICBjbGVhclRpbWVvdXQoVGVsZXZpc2lvbkFkVGltZW91dCk7XHJcblxyXG4gICAgaWYodGV4dDE9PVwiXCIpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGRlc2NyaXB0aW9uIGZvciB5b3VyIGNvbW1lcmNpYWwuXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICB2YXIgX3NlbnRkYXRhID0geyBQbGF5ZXI6IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0sRGVzY3JpcHRpb246dGV4dDF9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDI5LCBfc2VudGRhdGEpOyBcclxuICAgICAgVm90ZXNVcEFycmF5PVtdO1xyXG4gICAgICBWb3Rlc0Rvd25BcnJheT1bXTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcblxyXG4gICAgICBUZWxldmlzaW9uQWRUaW1lb3V0PXNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuRmFpbGVkU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKCk7XHJcbiAgICAgIH0sIDI1MDAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBGYWlsZWRTY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAoKVxyXG4gIHtcclxuICAgIGNsZWFyVGltZW91dChUZWxldmlzaW9uQWRUaW1lb3V0KTtcclxuICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4PV9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHRoaXMuU2hvd1RvYXN0KFwiRWl0aGVyIHRpbWUgaGFzIGJlZW4gcGFzc2VkIGZvciB2b3Rpbmcgb3IgeW91IGhhdmUgZmFpbGVkIHRvIGxlYXZlIHBvc2l0aXZlIGltcHJlc3Npb24gb24gb3RoZXJzLCB5b3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFjY291bnQuXCIpO1xyXG4gICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ9MDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgdGhpcy5FeGl0QWxvbmdUdXJuT3Zlcl9UZWxldmlzaW9uQURTZXR1cCgpO1xyXG5cclxuICB9LFxyXG5cclxuICBTdWNjZXNzU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKClcclxuICB7XHJcbiAgICBjbGVhclRpbWVvdXQoVGVsZXZpc2lvbkFkVGltZW91dCk7XHJcbiAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleD1fbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX21hcmtldGluZ0Ftb3VudD1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuXHJcbiAgICB2YXIgcHJvZml0PV9tYXJrZXRpbmdBbW91bnQrKF9tYXJrZXRpbmdBbW91bnQqNik7XHJcbiAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz1wcm9maXQ7XHJcblxyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZWVkIHB1dHRpbmcgcG9zaXRpdmUgaW1wcmVzc2lvbiwgeW91IGhhdmUgcmVjZWl2ZWQgNjAwJSBwcm9maXQgb2YgeW91ciBtYXJrZXRpbmcgYW1vdW50LCB5b3VyIGNhc2ggYmVjb21lcyAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgIHRoaXMuRXhpdEFsb25nVHVybk92ZXJfVGVsZXZpc2lvbkFEU2V0dXAoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfVGVsZXZpc2lvbkFEU2V0dXAoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9UZWxldmlzaW9uQURTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9UZWxldmlzaW9uQURTZXR1cChfZGF0YSlcclxuICB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgIFxyXG4gICAgICBjbGVhclRpbWVvdXQoVm90ZVRpbWVvdXQpOyAgXHJcbiAgICAgIHZhciBfc2VuZGVyUGxheWVyRGF0YT1fZGF0YS5QbGF5ZXI7XHJcbiAgICAgIHZhciBfZGVzPV9kYXRhLkRlc2NyaXB0aW9uO1xyXG4gICAgICBTZW5kZXJBRFBQbGF5ZXI9X3NlbmRlclBsYXllckRhdGE7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKHRydWUpO1xyXG4gICAgICB0aGlzLkNoYW5nZURlY2lzaW9uU2NyZWVuVGV4dF9UZWxldmlzaW9uQURTZXR1cChfZGVzKTtcclxuXHJcbiAgICAgIFZvdGVUaW1lb3V0PXNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAoZmFsc2UpO1xyXG4gICAgICB9LCAyNDAwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVm90ZVVwRGVjaXNpb25fVGVsZXZpc2lvbkFEU2V0dXAoKVxyXG4gIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFZvdGVUaW1lb3V0KTtcclxuICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAoZmFsc2UpO1xyXG4gICAgICB2YXIgX3NlbnRkYXRhID0geyBTZW5kZXJJRDogX215QWN0b3IuUGxheWVyVUlELFJlY2l2ZXJJRDpTZW5kZXJBRFBQbGF5ZXIuUGxheWVyVUlELFZvdGVVcDp0cnVlfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgzMCwgX3NlbnRkYXRhKTsgXHJcbiAgfSxcclxuXHJcbiAgVm90ZURvd25EZWNpc2lvbl9UZWxldmlzaW9uQURTZXR1cCgpXHJcbiAge1xyXG4gICAgICBjbGVhclRpbWVvdXQoVm90ZVRpbWVvdXQpOyAgXHJcbiAgICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKGZhbHNlKTtcclxuICAgICAgdmFyIF9zZW50ZGF0YSA9IHsgU2VuZGVySUQ6IF9teUFjdG9yLlBsYXllclVJRCxSZWNpdmVySUQ6U2VuZGVyQURQUGxheWVyLlBsYXllclVJRCxWb3RlVXA6ZmFsc2V9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDMwLCBfc2VudGRhdGEpOyBcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfVm90ZVRlbGV2aXNpb25BRFNldHVwKF9kYXRhKVxyXG4gIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX215QWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgdmFyIF9teUlEPV9kYXRhLlJlY2l2ZXJJRDtcclxuICAgICAgdmFyIF9vdGhlcklEPV9kYXRhLlNlbmRlcklEO1xyXG4gICAgICB2YXIgX3ZvdGVVcD1fZGF0YS5Wb3RlVXA7XHJcbiAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXg9X21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX3RvdGFsUGxheWVyPTA7XHJcbiAgICAgIFxyXG4gICAgICBpZihfbXlBY3Rvci5QbGF5ZXJVSUQ9PV9teUlEKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYoX3ZvdGVVcClcclxuICAgICAgICAgIFZvdGVzVXBBcnJheS5wdXNoKF9vdGhlcklEKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICBWb3Rlc0Rvd25BcnJheS5wdXNoKF9vdGhlcklEKTtcclxuXHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXg8X21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgJiYgaW5kZXghPV9wbGF5ZXJJbmRleClcclxuICAgICAgICAgICAgX3RvdGFsUGxheWVyKys7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9SZWNpZXZlZFZvdGVzPVZvdGVzVXBBcnJheS5sZW5ndGgrVm90ZXNEb3duQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhfUmVjaWV2ZWRWb3Rlcyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coVm90ZXNVcEFycmF5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhWb3Rlc0Rvd25BcnJheSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX3RvdGFsUGxheWVyKTtcclxuXHJcbiAgICAgICAgaWYoX1JlY2lldmVkVm90ZXMgPj1fdG90YWxQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYoVm90ZXNVcEFycmF5Lmxlbmd0aD5Wb3Rlc0Rvd25BcnJheS5sZW5ndGgpXHJcbiAgICAgICAgICAgIHRoaXMuU3VjY2Vzc1NjcmVlbl9UZWxldmlzaW9uQURTZXR1cCgpO1xyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLkZhaWxlZFNjcmVlbl9UZWxldmlzaW9uQURTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtZXNzYWdlLCB0aW1lID0gU2hvcnRNZXNzYWdlVGltZSwgX2hhc2J1dHRvbiA9IHRydWUpIHtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Qb3BVcFVJTGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90IG1vZGUgb25seVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+IDAgJiYgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLklzQm90KSB7XHJcbiAgICAgICAgLy8gaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICAvLyAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIC8vICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICAvLyAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDb21wbGV0ZVRvYXN0KCkge1xyXG4gICAgY29uc29sZS5lcnJvcihcImNvbXBsZXRlIHRvYXN0IGNhbGxlZFwiKTtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICB9LFxyXG5cclxuICBTaG93UmVzdWx0U2NyZWVuOiBmdW5jdGlvbiAoX3N0YXR1cywgX2RhdGEpIHtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5SZXN1bHRTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBfc3RhdHVzO1xyXG4gICAgdGhpcy5SZXN1bHRTZXR1cFVJLkJvZHlMYWJlbC5zdHJpbmcgPSBfZGF0YTtcclxuICB9LFxyXG5cclxuICBSZXN0YXJ0VGhlR2FtZSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jSW5mbyhfZGF0YUluZm8sX3RvUGxheWVyVUlEPVwiXCIpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIHZhciBfZGF0YSA9IHsgaW5mbzogX2RhdGFJbmZvLCBQbGF5ZXJVSUQ6X3RvUGxheWVyVUlEIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTUsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX21vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBpbmZvOiBfZGF0YUluZm8sUGxheWVyVUlEOiBfdG9QbGF5ZXJVSUQgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE1LCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuIl19