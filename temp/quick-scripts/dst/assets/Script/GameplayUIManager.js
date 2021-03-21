
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

var _DiceController = _interopRequireDefault(require("./DiceController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    ExitRoomButton: {
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
  statics: {
    Instance: null
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
    GameplayUIManager.Instance = this; //events subscription to be called

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
    if (_state) this.ToggleExitButton(false);
  },
  ToggleExitButton: function ToggleExitButton(_state) {
    this.ExitRoomButton.active = _state;
  },
  OnLeaveButtonClicked_SpectateModeUI: function OnLeaveButtonClicked_SpectateModeUI() {
    GameplayUIManager.Instance.setTimeScale(0);

    if (_DiceController["default"].Instance) {
      _DiceController["default"].Instance.ClearAllTimeouts();
    }

    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(true);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
      GamePlayReferenceManager.Instance.RemovePersistNode();
      clearTimeout();
      cc.director.loadScene("MainMenu", function () {
        GameplayUIManager.Instance.setTimeScale(1);
      });
    }, 1);
  },
  setTimeScale: function setTimeScale(scale) {
    cc.director.calculateDeltaTime = function (now) {
      if (!now) now = performance.now();
      this._deltaTime = (now - this._lastUpdate) / 1000;
      this._deltaTime *= scale;
      this._lastUpdate = now;
    };
  },
  OnExitButtonClicked: function OnExitButtonClicked() {
    GameplayUIManager.Instance.setTimeScale(0);

    if (_DiceController["default"].Instance) {
      _DiceController["default"].Instance.ClearAllTimeouts();
    }

    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(true);

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    }

    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
      GamePlayReferenceManager.Instance.RemovePersistNode();
      clearTimeout();
      cc.director.loadScene("MainMenu", function () {
        GameplayUIManager.Instance.setTimeScale(1);
      });
    }, 1);
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
      console.log("no mode selected");
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
    console.log(_isTurnOver);
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
        console.log("out of money");
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
    console.log("reecieved id: " + _data.PlayerUID);

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
            console.log("nothing");
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

    console.log(_actorsData);
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
      console.log(_actorsData);
      console.log(_myData);

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

    console.log(_actorsData);
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
      console.log(_actorsData);
      console.log(_myData);

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
    try {
      console.log("complete toast called");
      if (this.PopUpUI) this.PopUpUI.active = false;
      clearTimeout(TimeoutRef);
    } catch (error) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkRhbWFnZURlY2lzaW9uUmVzdWx0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiYnVzaW5lc3NEZXRhaWxOb2RlcyIsIlNlbmRlckRhbWFnaW5nSUQiLCJidXNpbmVzc1Rha2VPdmVyTm9kZXMiLCJidXNpbmVzc0RhbWFnaW5nTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwic2VsZWN0UGxheWVyUHJvZml0Tm9kZXMiLCJzZWxlY3RlZFBsYXllclRha2VPdmVyIiwic2VsZWN0ZWRQbGF5ZXJEYW1hZ2luZyIsIkxhb25QYXJ0bmVyc2hpcEFycmF5IiwiQ29tcGFyZURpY2VBcnJheSIsIlRlbGV2aXNpb25BZFRpbWVvdXQiLCJTZW5kZXJBRFBQbGF5ZXIiLCJWb3RlVGltZW91dCIsIlZvdGVzVXBBcnJheSIsIlZvdGVzRG93bkFycmF5IiwiU2VsbEFsbEJ1c2luZXNzQXJyYXkiLCJidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMiLCJidXNpbmVzc0RldGFpbFBheURheU5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiU2VsZWN0ZWRCdXNpbmVzc1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsIlNlbGVjdGVkQnVzaW5lc3NJbmRleCIsIlR1cm5PdmVyRm9ySW52ZXN0IiwiQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5IiwiR2l2ZW5DYXNoQnVzaW5lc3MiLCJMYW9uUGFydG5lcnNoaXAiLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJQcmV2aW91c0Nhc2giLCJSZW1haW5pbmdDYXNoIiwiTG9hblNlbGVjdGVkUGxheWVyRGF0YSIsIlRpbWVvdXRSZWYiLCJDb21wbGV0aW9uV2luZG93VGltZSIsIkxvbmdNZXNzYWdlVGltZSIsIlNob3J0TWVzc2FnZVRpbWUiLCJnbG9iYWxUdXJuVGltZXIiLCJQYXlEYXlJbmZvIiwiSW52ZXN0U2VsbEluZm8iLCJUaW1lclRpbWVvdXQiLCJEb3VibGVEYXlCdXNpbmVzc0hCIiwiRG91YmxlRGF5QnVzaW5lc3NCTSIsIkdpdmVQcm9maXRVc2VySUQiLCJUb3RhbFBheURheSIsIkJhbmtSdXB0ZWRDYXJkIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsIkFkZEJ1dHRvbk5vZGUiLCJBZGRDYXNoU2NyZWVuIiwiQWRkQ2FzaExhYmVsIiwiQWRkQ2FzaEVkaXRCb3giLCJjdG9yIiwiQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwic3RyaW5nIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIk1hcmtldGluZ0VkaXRCb3giLCJHb2xkRWRpdEJveCIsIlN0b2NrRWRpdEJveCIsIkNhc2hBbW91bnRMYWJlbCIsIkV4cGFuZEJ1c2luZXNzTm9kZSIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiUHJlZmFiIiwiVGltZXJUZXh0IiwiQmxvY2tlck5vZGUiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJCdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIlBhc3NlZFBheURheUNvdW50TGFiZWwiLCJIb21lQmFzZWRCdG4iLCJCTUJ0biIsIkxvYW5CdG4iLCJNYWluUGFuZWxOb2RlIiwiUmVzdWx0UGFuZWxOb2RlIiwiTG9hblJlc3VsdFBhbmVsTm9kZSIsIlJlc3VsdFNjcmVlblRpdGxlTGFiZWwiLCJUb3RhbEJ1c2luZXNzTGFiZWwiLCJUb3RhbEFtb3VudExhYmVsIiwiU2tpcExvYW5CdXR0b24iLCJMb2FuRm90dGVyTGFiZWwiLCJJbnZlc3RVSSIsIkJ1eU9yU2VsbFVJIiwiT25lUXVlc3Rpb25VSSIsIlBsYXllckRldGFpbExhYmVsIiwiRGV0YWlsc1ByZWZhYiIsIlNjcm9sbENvbnRlbnQiLCJXYWl0aW5nU2NyZWVuIiwiV2FpdGluZ1NjcmVlbkxhYmVsIiwiRGVjaXNpb25UaXRsZUxhYmVsIiwiRGVjaXNpb25DYXNoTGFiZWwiLCJEZWNpc2lvblBsYXllck5hbWVMYWJlbCIsIkRlY2lzaW9uUXVlc3Rpb25MYWJlbCIsIlBhcnRuZXJzaGlwVUkiLCJXYWl0aW5nU3RhdHVzU2NyZWVuIiwiTWFpblNjcmVlbiIsIlRpdGxlTmFtZSIsIlBsYXllck5hbWUiLCJQbGF5ZXJDYXNoIiwiUGFydG5lclNoaXBQcmVmYWIiLCJEZWNpc2lvblNjcmVlbiIsIkRlY2lzaW9uUGxheWVyTmFtZSIsIkRlY2lzaW9uUGxheWVyQ2FzaCIsIkRlY2lzaW9uRGVzY3JpcHRpb24iLCJSZXN1bHRVSSIsIlJlc3VsdFNjcmVlbiIsIlN0YXR1c0xhYmVsIiwiQm9keUxhYmVsIiwiQnVzaW5lc3NQYXlEYXlTZXR1cFVJIiwiVGl0bGVDb250ZW50TGFiZWwiLCJCdXNpbmVzc1ByZWZhYiIsIlNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUkiLCJTZWxlY3RQbGF5ZXJHZW5lcmljIiwiU2VsZWN0QnVzaW5lc3NHZW5lcmljIiwiRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXAiLCJEaWNlUmVzdWx0U2NyZWVuIiwiQnVzaW5lc3NTZWxlY3RTY3JlZW4iLCJEYW1hZ2VCdXNpbmVzc1NlbGVjdCIsIkJ1eUhhbGZCdXNpbmVzc1NldHVwVUkiLCJDb21waXRhdG9yVUlTZXR1cCIsIkNvbXBFZGl0Qm94MSIsIkNvbXBFZGl0Qm94MiIsIkNvbXBFZGl0Qm94MyIsIlRlbGV2aXNpb25BRFVJU2V0dXAiLCJNYWluRWRpdEJveCIsIkRlY2lzaW9uU2NyZWVuVGV4dCIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSEJEaWNlQ291bnRlciIsIkJNRGljZUNvdW50ZXIiLCJOZXh0SGFsZlBheURheSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJPbmVRdWVzdGlvblNldHVwVUkiLCJQYXJ0bmVyc2hpcFNldHVwVUkiLCJSZXN1bHRTZXR1cFVJIiwiQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiU2VsZWN0UGxheWVyRm9yUHJvZml0VUkiLCJTZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwIiwiU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cCIsIkRlY2lzaW9uRGFtYWdpbmdTZXR1cCIsIlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIiLCJCdXlIYWxmQnVzaW5lc3NVSVNldHVwIiwiTG9hblBhcnRuZXJzaGlwU2V0dXAiLCJDb21wYXJlRGljZVNldHVwIiwiU2VsbEFsbEJ1c2luZXNzU2V0dXAiLCJDb21waXRhdG9yU2V0dXBVSSIsIlRlbGV2aXNpb25BRFNldHVwVUkiLCJQb3BVcFVJIiwiUG9wVXBVSUxhYmVsIiwiUG9wVXBVSUJ1dHRvbiIsIkdhbWVwbGF5VUlTY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiQnVzaW5lc3NEb3VibGVQYXlTY3JlZW4iLCJPbmVRdWVzdGlvblNwYWNlU2NyZWVuIiwiT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbiIsIlNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbiIsIlNlbGVjdFBsYXllclRha2VPdmVyU2NyZWVuIiwiU2VsZWN0UGxheWVyRGFtYWdpbmdTY3JlZW4iLCJMb2FuUGFydG5lcnNoaXBTY3JlZW4iLCJDb21wYXJlRGljZVNjcmVlbiIsIkNvbXBhcmVEaWNlRGVjaXNpb24xU2NyZWVuIiwiQ29tcGFyZURpY2VEZWNpc2lvbjJTY3JlZW4iLCJDb21wYXJlRGljZURlY2lzaW9uMlRleHQiLCJDb21wYXJlRGljZURlY2lzaW9uMkJ1dHRvbiIsIlNlbGxBbGxCdXNpbmVzc1NjcmVlbiIsIlNlbGVjdEJ1c2luZXNzVGFrZU92ZXJTY3JlZW4iLCJJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIiwiVGVtcERpY2VUZXh0IiwiTGVhdmVSb29tQnV0dG9uIiwiRXhpdFJvb21CdXR0b24iLCJBdmF0YXJTcHJpdGVzIiwiU3ByaXRlRnJhbWUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZXNldEFsbERhdGEiLCJSZXNldFR1cm5WYXJpYWJsZSIsIkdvbGRJbnZlc3RlZCIsIkdvbGRTb2xkIiwiU3RvY2tJbnZlc3RlZCIsIlN0b2NrU29sZCIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsIklzQm90VHVybiIsIlBheURheUNvdW50IiwiRG91YmxlUGF5RGF5Q291bnQiLCJJc0JhbmtydXB0ZWQiLCJCYW5rcnVwdGVkQW1vdW50IiwiQWRkQ2FzaEFtb3VudCIsIlRpbWVyIiwiVGltZXJTdGFydGVkIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJfc3RhdGUiLCJhY3RpdmUiLCJFeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIlRvZ2dsZUV4aXRCdXR0b24iLCJPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSIsInNldFRpbWVTY2FsZSIsIkRpY2VDb250cm9sbGVyIiwiQ2xlYXJBbGxUaW1lb3V0cyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVMZWF2ZVJvb21fQm9vbCIsIkRpc2Nvbm5lY3RQaG90b24iLCJzZXRUaW1lb3V0IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsImNsZWFyVGltZW91dCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwic2NhbGUiLCJjYWxjdWxhdGVEZWx0YVRpbWUiLCJub3ciLCJwZXJmb3JtYW5jZSIsIl9kZWx0YVRpbWUiLCJfbGFzdFVwZGF0ZSIsIk9uRXhpdEJ1dHRvbkNsaWNrZWQiLCJHZXRTZWxlY3RlZE1vZGUiLCJUb2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAiLCJFbmFibGVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiT25DYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfdmFsIiwiT25DbGlja0RvbmVDYXNoQWRkX0J1c2luZXNzU2V0dXAiLCJfZ2FtZWNhc2giLCJwYXJzZUludCIsIl9hbW91bnQiLCJ1bmRlZmluZWQiLCJDYXNoIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwiVXBkYXRlVXNlckRhdGEiLCJTaG93VG9hc3QiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJpc0ZpcnN0VGltZSIsImluc2lkZUdhbWUiLCJtb2RlSW5kZXgiLCJfaXNCYW5rcnVwdGVkIiwiX0JhbmtydXB0QW1vdW50IiwiX2lzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfR2l2ZW5DYXNoIiwiX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIl9sb2FuUGFydG5lcnNoaXAiLCJfT3RoZXJwbGF5ZXJEYXRhIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiQnVzaW5lc3NJbmZvIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwibGVuZ3RoIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cCIsIkF2YXRhcklEIiwiYXZhdGFySWQiLCJHZXRPYmpfQnVzaW5lc3NTZXR1cCIsIlVJRCIsImlzTmFOIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIk9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsIkhvbWVCYXNlZCIsIk9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiYnJpY2tBbmRtb3J0YXIiLCJhbW91bnQiLCJDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAiLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJOb09mQnVzaW5lc3MiLCJMb2FuVGFrZW4iLCJNYXRoIiwiYWJzIiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiUHVzaERhdGFGb3JQbGF5ZXJMZWZ0IiwiX2RhdGEiLCJfbW9kZSIsIl9wbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllcklEIiwiSG9tZUJhc2VkQW1vdW50IiwiSXNBY3RpdmUiLCJfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsInB1c2giLCJSYWlzZUV2ZW50IiwiX0lEIiwiX3BsYXllckxlZnQiLCJfaXNTcGVjdGF0ZSIsIlBob3RvbkFjdG9yIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJNYXhQbGF5ZXJzIiwiR2V0UmVhbEFjdG9ycyIsImFjdG9yTnIiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYnVzaW5lc3NOYW1lIiwiX2lzSG9tZUJhc2VkIiwiU3RhcnRHYW1lIiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJFeGl0X0J1c2luZXNzU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJHZXRUdXJuTnVtYmVyIiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJQYXlBbW91bnRUb1BsYXlHYW1lIiwiSXNQYXJ0bmVyc2hpcCIsIlBhcnRuZXJJRCIsIlBhcnRuZXJOYW1lIiwiaW5mbyIsIlJhaXNlRXZlbnRUb1N5bmNJbmZvIiwiSXNCb3QiLCJpc2FjdGl2ZSIsIl9hY3RpdmUiLCJVcGRhdGVUaW1lciIsIlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIkNoZWNrTWFya2V0aW5nQW1vdW50U2hhcmVfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfbWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkhhc01hcmtldGluZ0NvbXBhbnkiLCJSYWlzZUV2ZW50Rm9yTWFya2V0aW5nU2hhcmUiLCJfYW1udCIsIl9pZCIsIl9tc2ciLCJJRCIsIm1zZyIsIk9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uIiwibWFya2V0aW5nQW1vdW50IiwiTWFya2V0aW5nQW1vdW50IiwiT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIkxhd3llclN0YXR1cyIsIm9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJnZW5lcmF0ZWRMZW5ndGgiLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCIsIlJvbGxUd29EaWNlcyIsIkFzc2lnbkRhdGFfSW52ZXN0U2VsbCIsIk9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJfaXNUdXJuT3ZlciIsIlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCIsIlJvbGxPbmVEaWNlIiwiT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR29sZENvdW50IiwiT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlN0b2NrQ291bnQiLCJPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJFbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwIiwiT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiUm9sbERpY2UiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJ2YWx1ZSIsIlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAiLCJfdGVtcERhdGEiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXROYW1lIiwiU2V0VHlwZSIsIlNldEJ1c2luZXNzSW5kZXgiLCJfdG90YWxMb2NhdGlvbnMiLCJMb2NhdGlvbnNOYW1lIiwiU2V0QnVzaW5lc3NNb2RlIiwiU2V0TW9kZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJfYWxsTG9jYXRpb25zQW1vdW50IiwiX2ZpbmFsQW1vdW50IiwiU2V0QmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uIiwiU2V0UGFydG5lck5hbWUiLCJFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJFeGl0X1BhcnRuZXJTaGlwU2V0dXAiLCJkZXN0cm95IiwiUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAiLCJfYWN0b3IiLCJfdHVybiIsIlR1cm4iLCJfcGxheWVyRGF0YSIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJTZWxlY3RlZEJ1c2luc2Vzc0luZGV4IiwiX2J1c2luZXNzVmFsdWUiLCJCdXNWYWx1ZSIsIl9wYXlBbW91bnQiLCJfYnVzaW5lc3NNb2RlIiwiQ2hlY2tTcGVjdGF0ZSIsIkFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWxsQWN0b3JzIiwiUm9vbUFjdG9ycyIsIm15SW5kZXgiLCJHZXRNeUluZGV4IiwiUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJDYW5jZWxPZmZlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2lzQWNjZXB0ZWQiLCJfcGF5bWVudCIsIl9pc0NhbmNlbGxlZCIsIl91SUQiLCJfbWFpbkRhdGEiLCJBY2NlcHRlZCIsIkNhc2hQYXltZW50IiwiQ2FuY2VsbGVkIiwiQnVzaW5lc3NJbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWNjZXB0ZWQiLCJfY2FzaCIsIl9jYW5jZWxsZWQiLCJfdWlkIiwiaW5jbHVkZXMiLCJSZXNldEdvbGRJbnB1dCIsIm9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsIiwiVXBkYXRlRGF0YV9JbnZlc3RTZWxsIiwiX3RpdGxlIiwiX2RpY2VSZXN1bHQiLCJfcHJpY2VUaXRsZSIsIl9wcmljZVZhbHVlIiwiX2J1eU9yU2VsbFRpdGxlIiwiX3RvdGFsQW1vdW50VGl0bGUiLCJfdG90YWxBbW91bnRWYWx1ZSIsIl9idXR0b25OYW1lIiwiQXBwbHlCdXR0b25fSW52ZXN0U2VsbCIsIl9Ub3RhbEFtb3VudCIsIkV4aXRCdXR0b25fSW52ZXN0U2VsbCIsIlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkiLCJUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkiLCJVcGRhdGVCdXR0b25zX1BheURheSIsImxvYW5UYWtlbiIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsIkdldExvYW5BbW91bnRfUGF5RGF5IiwiX2xvYW4iLCJBc3NpZ25EYXRhX1BheURheSIsIl9pc0RvdWJsZVBheURheSIsIl9za2lwSE0iLCJfc2tpcEJNIiwiX2lzQm90IiwiX2ZvclNlbGVjdGVkQnVzaW5lc3MiLCJfaE1BbW91bnQiLCJfYm1BbW91bnQiLCJfYm1Mb2NhdGlvbiIsIlBheWRheUNvdW50ZXIiLCJEb3VibGVQYXlDb3VudGVyIiwiX2hhbGZQYXlkYXkiLCJDYW5HaXZlUHJvZml0T25QYXlEYXkiLCJVc2VySURGb3JQcm9maXRQYXlEYXkiLCJSZWNlaXZlRG91YmxlUGF5RGF5IiwiX3JlcyIsIl90aW1lIiwiVXBkYXRlQ2FzaF9QYXlEYXkiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBheURheUNvbXBsZXRlZCIsIk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25CTVBheW1lbnRDbGlja2VkX1BheURheSIsIk9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSIsIl9kb3VibGVQYXlEYXkiLCJfZGljZSIsIl9hbW91bnRUb0JlU2VuZCIsIl9hbW91bnRUb0JlQWRqdXN0ZWQiLCJfbXVsdGlwbGllciIsIl9wYXlkYXltdWx0aXBsaWVyIiwiZG91YmxlUGF5RGF5QWRkZWQiLCJTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiUmVjZWl2ZVBheW1lbnRfUGF5RGF5IiwiX2xvY2F0aW9ucyIsIl9Fc3RpbWF0ZUxvYW4iLCJTa2lwTG9hbk9uZVRpbWVfUGF5RGF5IiwiU2VsbEJ1c2luZXNzX1BheURheSIsIkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0TG9hblNjcmVlbl9QYXlEYXkiLCJQcm9jZXNzQmFua3J1cHQiLCJfc2hvd1RleHQiLCJfdHh0IiwiRXhpdF9TZWxlY3RQbGF5ZXJHZW5lcmljIiwiRXhpdFNjcmVlbl9fQnVzaW5lc3NHZW5yaWMiLCJUb2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UiLCJUb2dnbGVEZWNzaW9uMDFTY3JlZW5fQ29tcGFyZURpY2UiLCJUb2dnbGVEaWNlUmVzdWx0U2NyZWVuX0RhbWFnZURlY2lzaW9uIiwiVG9nZ2xlTWFpblNjcmVlbl9EYW1hZ2VEZWNpc2lvbiIsIlRvZ2dsZVNjcmVlbl9CdXlIYWxmQnVzaW5lc3MiLCJlbWl0IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlRvZ2dsZVBheURheSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlN0YXJ0TmV3R2FtZV9QYXlEYXkiLCJtb2RlIiwiX3NlbmRpbmdEYXRhIiwiSXNEaWNlUm9sbGVkIiwiSXNCYW5rUnVwdGVkIiwiX215QWN0b3IiLCJwbGF5ZXJEYXRhIiwiQmFua3J1cHRlZE5leHRUdXJuIiwiU3RhcnROZXdHYW1lX0JhbmtSdXB0ZWQiLCJTaG93SW5mbyIsIl9teVVJRCIsIkdldE15UGxheWVyVUlEIiwiUmFpc2VFdmVudEZvckNvbXBsZXRpb24iLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIk5leHRUdXJuSGFsZlBheURheUNvdW50ZXIiLCJUb2dnbGVIYWxmUGF5TmV4dFR1cm4iLCJjYWxsVXBvbkNhcmQiLCJUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIl9zZWxsQW1vdW50IiwiUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNldFNlbGxpbmdBbW91bnQiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJTZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIkFtb3VudCIsIlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5IiwiX2lzVHVybm92ZXIiLCJFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIlNldEludmVzdFVJX0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJIiwiVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTaG93UXVlc3Rpb25Ub2FzdCIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX215RGF0YSIsIl9hY3RvcnNEYXRhIiwiX21vZGVJbmRleCIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsInNldFBsYXllck5hbWUiLCJzZXRQbGF5ZXJVSUQiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRfT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIl9tYWluVGl0bGUiLCJfdGlsZUNvbnRlbnQiLCJFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIkNsZWFyQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiRXhpdFNjcmVlbl9BbG9uZ1R1cm5PdmVyX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIlByb2Nlc3NCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAiLCJfYnVzaW5lc3NUeXBlIiwiRW5hYmxlU2VsZXRpdmVEb3VibGVQYXlEYXlfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiX2lzQnJpY2tBbmRNb3J0YXIiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIkV4aXRfU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyIiwiU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlciIsIl9idXlIYWxmQnVzaW5lc3MiLCJzZXRCdXlIYWxmIiwiayIsInNldFBsYXllckluZGV4IiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlciIsIlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmciLCJSZXNldFNwYWNlU2NyZWVuX0xvYW5QYXJ0bmVyc2hpcCIsIlJlc2V0U3BhY2VTY3JlZW5fQ29tcGFyZURpY2UiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmciLCJUb2dnbGVTY3JlZW5fTG9hblBhcnRuZXJzaGlwIiwiVG9nZ2xlU2NyZWVuX0NvbXBhcmVEaWNlIiwiRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyR2VuZXJpYyIsIlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1Rha2VPdmVyIiwiU2V0QnVzaW5lc3NVSV9CdXNpbmVzc1Rha2VPdmVyIiwiX090aGVyUGxheWVySW5kZXgiLCJSZXNldF9CdXNpbmVzc1Rha2VPdmVyIiwiU2V0UGxheWVyT2JqZWN0IiwiU2V0UGxheWVySW5kZXgiLCJzZXRIYWxmQnVzaW5lc3MiLCJFbmFibGVTY3JlZW5fX0J1c2luZXNzVGFrZU92ZXIiLCJSZXNldF9fRGFtYWdlRGVjaXNpb24iLCJUb2dnbGVCdXNpbmVzc1NjcmVlbl9EYW1hZ2VEZWNpc2lvbiIsIlRvZ2dsZVNjcmVlbl9TZWxsQWxsQnVzaW5lc3MiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGxBbGxCdXNpbmVzcyIsIkV4aXRTY3JlZW5BbG9uZ1R1cm5PdmVyX19CdXNpbmVzc0dlbnJpYyIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmciLCJTZXRCdXNpbmVzc1VJX0RhbWFnZURlY2lzaW9uIiwiRW5hYmxlQnVzaW5lc3NTY3JlZW5fRGFtYWdlRGVjaXNpb24iLCJfbm9CdXR0b24iLCJTZXRNZXNhZ2VUZXh0X0RhbWFnZURlY2lzaW9uIiwiRW5hYmxlRGljZVJlc3VsdF9EYW1hZ2VEZWNpc2lvbiIsIl9maW5lTXVsdGlwbGllciIsIl90ZXh0IiwiU2V0U2VuZGVySURfRGFtYWdlRGVjaXNpb24iLCJSZWNlaXZlRXZlbnRfRGFtYWdlRGVjaXNpb24iLCJfcmVjaXZlcklEIiwiX2Nhc2hSZWNlaXZlZCIsIl9pc0RpY2VSb2xsZWQiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJQYXlBbW91bnRfRGFtYWdlRGVjaXNpb24iLCJTZXRCYW5rcnVwdGVkVmFyIiwiU2VsZWN0QnVzaW5lc3NGb3JIYWxmT3duZXJzaGlwX0RhbWFnaW5nRGVjaXNpb24iLCJfc2VsZWN0ZWRQbGF5ZXJJbmRleCIsIl9wbGF5ZXJzRGF0YSIsIl9teURhdGFJbmRleCIsIkdpdmVQYXJ0bmVyU2hpcF9EYW1hZ2VEZWNpc2lvbiIsIl9idXNpbmVzc0xlbmd0aCIsIl9idXNpbmVzc0NvdW50ZXIiLCJTZXRUaXRsZVRleHRfQnV5SGFsZkJ1c2luZXNzIiwiU2V0VXBTcGFjZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAiLCJFbmFibGVTY3JlZW5fX1NlbGxBbGxCdXNpbmVzcyIsIlNldEJ1c2luZXNzVUlfU2VsbEFsbEJ1c2luZXNzIiwiU2V0VXBTcGFjZVNjcmVlbl9Db21wYXJlRGljZSIsIkNoYW5nZVRpdGxlX0RlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZSIsIlRvZ2dsZURlY3Npb24wMlNjcmVlbkJ1dHRvbl9Db21wYXJlRGljZSIsIlRvZ2dsZVNjcmVlbl9Db21waXRhdG9yVUkiLCJDaGFuZ2VUaXRsZV9Db21waXRhdG9yVUkiLCJPbkRvbmVDbGlja2VkX0NvbXBpdGF0b3JVSSIsInRleHQxIiwidGV4dDIiLCJ0ZXh0MyIsIl9tYXJrZXRpbmdBbW91bnQiLCJUZXh0QXJyYXkiLCJfY2hlY2tDb3VudGVyIiwiX3RlbXBDb3VudGVyIiwiaiIsInRvTG93ZXJDYXNlIiwicHJvZml0IiwiRXhpdEFsb25nVHVybk92ZXJfQ29tcGl0YXRvclVJIiwiVG9nZ2xlU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAiLCJDaGFuZ2VEZWNpc2lvblNjcmVlblRleHRfVGVsZXZpc2lvbkFEU2V0dXAiLCJPbkRvbmVDbGlja2VkX1RlbGV2aXNpb25BRFNldHVwIiwiX3NlbnRkYXRhIiwiUGxheWVyIiwiRGVzY3JpcHRpb24iLCJGYWlsZWRTY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAiLCJFeGl0QWxvbmdUdXJuT3Zlcl9UZWxldmlzaW9uQURTZXR1cCIsIlN1Y2Nlc3NTY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAiLCJSZWNlaXZlRXZlbnRfVGVsZXZpc2lvbkFEU2V0dXAiLCJfc2VuZGVyUGxheWVyRGF0YSIsIl9kZXMiLCJWb3RlVXBEZWNpc2lvbl9UZWxldmlzaW9uQURTZXR1cCIsIlNlbmRlcklEIiwiUmVjaXZlcklEIiwiVm90ZVVwIiwiVm90ZURvd25EZWNpc2lvbl9UZWxldmlzaW9uQURTZXR1cCIsIlJlY2VpdmVFdmVudF9Wb3RlVGVsZXZpc2lvbkFEU2V0dXAiLCJfbXlJRCIsIl9vdGhlcklEIiwiX3ZvdGVVcCIsIl90b3RhbFBsYXllciIsIl9SZWNpZXZlZFZvdGVzIiwibWVzc2FnZSIsInRpbWUiLCJfaGFzYnV0dG9uIiwiU2VsZlRvYXN0IiwiQ29tcGxldGVUb2FzdCIsImVycm9yIiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9zdGF0dXMiLCJSZXN0YXJ0VGhlR2FtZSIsIlJlc3RhcnRHYW1lIiwiX2RhdGFJbmZvIiwiX3RvUGxheWVyVUlEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0EsSUFBSUEsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsb0JBQW9CLEdBQUcsQ0FBM0I7QUFDQSxJQUFJQyx3QkFBd0IsR0FBRyxJQUEvQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLEVBQTFCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsRUFBdkI7QUFDQSxJQUFJQyxxQkFBcUIsR0FBRyxFQUE1QjtBQUNBLElBQUlDLHFCQUFxQixHQUFHLEVBQTVCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsRUFBdkI7QUFDQSxJQUFJQyx1QkFBdUIsR0FBRyxFQUE5QjtBQUNBLElBQUlDLHNCQUFzQixHQUFHLEVBQTdCO0FBQ0EsSUFBSUMsc0JBQXNCLEdBQUcsRUFB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d1EsUUFBekIsQ0FBa0NvQyx5QkFBbEMsR0FBOERtQixlQUE5RCxFQUFaOztBQUVBLFFBQUltRixLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNkO0FBQ0EsVUFBSUQsS0FBSyxHQUFHO0FBQUUyQyxRQUFBQSxJQUFJLEVBQUUrVyxTQUFSO0FBQW1CbmMsUUFBQUEsU0FBUyxFQUFDb2M7QUFBN0IsT0FBWjtBQUNBNXlCLE1BQUFBLHdCQUF3QixDQUFDd1EsUUFBekIsQ0FBa0MyQywwQkFBbEMsR0FBK0RzRyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RVIsS0FBOUU7QUFDRCxLQUpELE1BSU8sSUFBSUMsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDckI7QUFDQSxVQUFJLEtBQUsxSCxTQUFULEVBQW9CO0FBQ2xCLFlBQUl5SCxLQUFLLEdBQUc7QUFBRTJDLFVBQUFBLElBQUksRUFBRStXLFNBQVI7QUFBa0JuYyxVQUFBQSxTQUFTLEVBQUVvYztBQUE3QixTQUFaO0FBQ0E1eUIsUUFBQUEsd0JBQXdCLENBQUN3USxRQUF6QixDQUFrQzJDLDBCQUFsQyxHQUErRHNHLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFUixLQUE5RTtBQUNEO0FBQ0Y7QUFDRjtBQWxySDhCLENBQVQsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaWNlQ29udHJvbGxlciBmcm9tICBcIi4vRGljZUNvbnRyb2xsZXJcIjtcclxudmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIERhbWFnZURlY2lzaW9uUmVzdWx0ID0gMDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbnZhciBTZW5kZXJEYW1hZ2luZ0lEID0gXCJcIjtcclxudmFyIGJ1c2luZXNzVGFrZU92ZXJOb2RlcyA9IFtdO1xyXG52YXIgYnVzaW5lc3NEYW1hZ2luZ05vZGVzID0gW107XHJcbnZhciBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbnZhciBzZWxlY3RQbGF5ZXJQcm9maXROb2RlcyA9IFtdO1xyXG52YXIgc2VsZWN0ZWRQbGF5ZXJUYWtlT3ZlciA9IFtdO1xyXG52YXIgc2VsZWN0ZWRQbGF5ZXJEYW1hZ2luZyA9IFtdO1xyXG52YXIgTGFvblBhcnRuZXJzaGlwQXJyYXk9W107XHJcbnZhciBDb21wYXJlRGljZUFycmF5PVtdO1xyXG52YXIgVGVsZXZpc2lvbkFkVGltZW91dD1udWxsO1xyXG52YXIgU2VuZGVyQURQUGxheWVyPW51bGw7XHJcbnZhciBWb3RlVGltZW91dD1udWxsO1xyXG52YXIgVm90ZXNVcEFycmF5PVtdO1xyXG52YXIgVm90ZXNEb3duQXJyYXk9W107XHJcbnZhciBTZWxsQWxsQnVzaW5lc3NBcnJheT1bXTtcclxudmFyIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG52YXIgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxudmFyIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgQ2FuY2VsbGVkSUQgPSBbXTtcclxudmFyIFN0YXJ0R2FtZUNhc2ggPSAyMDAwMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxudmFyIEhNQW1vdW50ID0gMDtcclxudmFyIEJNQW1vdW50ID0gMDtcclxudmFyIEJNTG9jYXRpb25zID0gMDtcclxudmFyIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbnZhciBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG52YXIgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbnZhciBMYW9uUGFydG5lcnNoaXAgPSBmYWxzZTtcclxudmFyIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG52YXIgUHJldmlvdXNDYXNoID0gMDtcclxudmFyIFJlbWFpbmluZ0Nhc2g9MDtcclxudmFyIExvYW5TZWxlY3RlZFBsYXllckRhdGE9bnVsbDtcclxudmFyIFRpbWVvdXRSZWY7XHJcbnZhciBDb21wbGV0aW9uV2luZG93VGltZSA9IDgwMDA7XHJcbnZhciBMb25nTWVzc2FnZVRpbWUgPSA1MDAwO1xyXG52YXIgU2hvcnRNZXNzYWdlVGltZSA9IDI1MDA7XHJcbnZhciBnbG9iYWxUdXJuVGltZXIgPSAzMDtcclxudmFyIFBheURheUluZm8gPSBcIlwiO1xyXG52YXIgSW52ZXN0U2VsbEluZm8gPSBcIlwiO1xyXG52YXIgVGltZXJUaW1lb3V0O1xyXG52YXIgRG91YmxlRGF5QnVzaW5lc3NIQiA9IDA7XHJcbnZhciBEb3VibGVEYXlCdXNpbmVzc0JNID0gMDtcclxudmFyIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG52YXIgVG90YWxQYXlEYXkgPSAwO1xyXG52YXIgQmFua1J1cHRlZENhcmQgPSBmYWxzZTtcclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG4vLyB2YXIgU2hvcnRNZXNzYWdlVGltZSA9IDUwOy8vMjUwMFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgYW1vdW50IG9mIGxvYW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIExvYW5BbW91bnRFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBUZW5UaG91c2FuZDogMTAwMDAsXHJcbiAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gIEZvcnR5VGhvdXNhbmQ6IDQwMDAwLFxyXG4gIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gIE90aGVyOiA2LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBjYXNoXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lVGV4dFVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICB0b29sdGlwOiBcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgYnVzaW5lc3MgdHlwZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhck5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIixcclxuICAgIH0sXHJcbiAgICBUaW1lck5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHRpbWVyIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5TZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IExvYW5BbW91bnRFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgYWxsIGxhYmVscyBvZiBhbW91bnRzIGluIGxvYW4gVUlcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25Ob2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkIENhc2ggYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBBZGRDYXNoU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaFNjcmVlbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgQWRkQ2FzaCBsYWJlbCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEFkZENhc2hFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZENhc2hFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIEFkZENhc2ggZWRpdEJveCBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHVybkRlY2lzaW9uU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlR1cm5EZWNpc2lvblNldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFya2V0aW5nRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgbWFya2V0aW5nIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBHb2xkRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBnb2xkIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTdG9ja0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IHN0b2NrIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byBjYXNoIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4cG5hZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyVGV4dDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lclRleHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGxhYmVsIG9mIHRpbWVyIHRleHQgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgICBCbG9ja2VyTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCbG9ja2VyTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBub2RlIG9mIGJsb2NrZXIgZm9yIHR1cm4gZGVjaXNpb25cIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdG9ja0ludmVzdDogMSxcclxuICBHb2xkSW52ZXN0OiAyLFxyXG4gIFN0b2NrU2VsbDogMyxcclxuICBHb2xkU2VsbDogNCxcclxuICBPdGhlcjogNSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RTZWxsVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZSBSZXN1bHQgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIHZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1eU9yU2VsbFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXlPclNlbGwgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXR0b25OYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV0dG9uTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgYnV0dG9uIG5hbWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFN0YXRlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkludmVzdFN0YXRlXCIsXHJcbiAgICAgIHR5cGU6IEludmVzdEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IEludmVzdEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEFtb3VudEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50RWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsbEJ1c2luZXNzVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2VsbFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGF5RGF5VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWROdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxvY2F0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhc3NlZFBheURheUNvdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFBhc3NlZFBheURheUNvdW50TGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTUJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhckJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIE1haW5QYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBNYWluUGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0UGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5SZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuUmVzdWx0UGFuZWxOb2RlIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTY3JlZW5UaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFNjcmVlblRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRTY3JlZW5UaXRsZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2VSZXN1bHQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQnVzaW5lc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEJ1c2luZXNzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNraXBMb2FuQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBMb2FuQnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNraXBMb2FuQnV0dG9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuRm90dGVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkZvdHRlckxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuRm90dGVyTGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlPclNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgT25lUXVlc3Rpb25VSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgT25lUXVlc3Rpb25VSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk9uZVF1ZXN0aW9uVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJEZXRhaWxMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJEZXRhaWxMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERldGFpbHNQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGV0YWlsc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBEZXRhaWxzUHJlZmFiIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIFNjcm9sbENvbnRlbnQgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBub2RlIFdhaXRpbmdTY3JlZW4gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW5MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU2NyZWVuTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbkxhYmVsIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIHF1ZXN0aW9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUmVzdWx0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJlc3VsdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUmVzdWx0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBSZXN1bHRTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0U2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RhdHVzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQm9keUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJvZHlMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzUGF5RGF5U2V0dXBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NQYXlEYXlTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NQYXlEYXlTZXR1cFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlQ29udGVudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlQ29udGVudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VsZWN0UGxheWVyRm9yUHJvZml0U2V0dXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckRldGFpbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckRldGFpbExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIERldGFpbHNQcmVmYWIgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgU2Nyb2xsQ29udGVudCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsZWN0UGxheWVyR2VuZXJpYy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsZWN0UGxheWVyR2VuZXJpYyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNlbGVjdFBsYXllckdlbmVyaWNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckRldGFpbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckRldGFpbExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgRGV0YWlsc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsZWN0QnVzaW5lc3NHZW5lcmljLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZWxlY3RCdXNpbmVzc0dlbmVyaWMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxlY3RCdXNpbmVzc0dlbmVyaWNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzQ291bnRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbENvbnRlbnROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzTWFuaXB1bGF0aW9uUHJlZmFiIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERhbWFnaW5nSW5mb3JtYXRpb25EZWNpc2lvblNldHVwID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiRGFtYWdpbmdJbmZvcm1hdGlvbkRlY2lzaW9uU2V0dXBcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYWluU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZWxlY3RTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NTZWxlY3RTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEYW1hZ2VCdXNpbmVzc1NlbGVjdDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0QnVzaW5lc3NHZW5lcmljLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eUhhbGZCdXNpbmVzc1NldHVwVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1eUhhbGZCdXNpbmVzc1NldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXlIYWxmQnVzaW5lc3NTZXR1cFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBDb21waXRhdG9yVUlTZXR1cC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ29tcGl0YXRvclVJU2V0dXAgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJDb21waXRhdG9yVUlTZXR1cFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1haW5TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBFZGl0Qm94MToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb21wRWRpdEJveDFcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBDb21wRWRpdEJveDI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ29tcEVkaXRCb3gyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQ29tcEVkaXRCb3gzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNvbXBFZGl0Qm94M1wiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVGVsZXZpc2lvbkFEVUlTZXR1cC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVGVsZXZpc2lvbkFEVUlTZXR1cCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlRlbGV2aXNpb25BRFVJU2V0dXBcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYWluU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBNYWluRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW5UZXh0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uU2NyZWVuVGV4dFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBHYW1lcGxheVVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YUludGFuY2U7XHJcbnZhciBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlO1xyXG52YXIgUmVxdWlyZWRDYXNoO1xyXG52YXIgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuLy90dXJuIGRlY2lzaW9uc1xyXG52YXIgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbnZhciBUZW1wSGlyaW5nTGF3eWVyO1xyXG5cclxuLy9idXlvcnNlbGxcclxudmFyIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxudmFyIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbnZhciBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbnZhciBEaWNlUmVzdWx0O1xyXG52YXIgT25jZU9yU2hhcmU7XHJcbnZhciBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG5cclxudmFyIEhCRGljZUNvdW50ZXIgPSAwO1xyXG52YXIgQk1EaWNlQ291bnRlciA9IDA7XHJcbnZhciBOZXh0SGFsZlBheURheSA9IGZhbHNlO1xyXG5cclxudmFyIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgTG9hblBheWVkID0gZmFsc2U7XHJcbnZhciBUb3RhbFBheURheUFtb3VudCA9IDA7XHJcbnZhciBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuXHJcbnZhciBHYW1lcGxheVVJTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVwbGF5VUlNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEJ1c2luZXNzU2V0dXBEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEJ1c2luZXNzU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXNpbmVzc1NldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBUdXJuRGVjaXNpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFR1cm5EZWNpc2lvblNldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgVHVybkRlY2lzaW9uU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEludmVzdFNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFBheURheVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGxCdXNpbmVzc1NldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGxCdXNpbmVzc1VJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGxCdXNpbmVzc1VJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogSW52ZXN0VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0VUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBCdXlPclNlbGxVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBCdXlPclNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogT25lUXVlc3Rpb25VSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBPbmVRdWVzdGlvblVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lcnNoaXBTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBQYXJ0bmVyc2hpcFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFBhcnRuZXJzaGlwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBSZXN1bHRVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBSZXN1bHRVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzUGF5RGF5VUlTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQnVzaW5lc3NQYXlEYXlTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1c2luZXNzUGF5RGF5U2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdFBsYXllckZvclByb2ZpdFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxlY3RQbGF5ZXJGb3JQcm9maXRTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGVjdFBsYXllckZvclByb2ZpdFNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcblxyXG4gICAgU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0UGxheWVyR2VuZXJpYyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxlY3RQbGF5ZXJHZW5lcmljIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXA6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGVjdFBsYXllckdlbmVyaWMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsZWN0UGxheWVyR2VuZXJpYyBjbGFzc1wiLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvbkRhbWFnaW5nU2V0dXA6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IERhbWFnaW5nSW5mb3JtYXRpb25EZWNpc2lvblNldHVwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIERhbWFnaW5nSW5mb3JtYXRpb25EZWNpc2lvblNldHVwIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGVjdEJ1c2luZXNzVGFrZU92ZXI6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGVjdEJ1c2luZXNzR2VuZXJpYyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxlY3RCdXNpbmVzc0dlbmVyaWMgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBCdXlIYWxmQnVzaW5lc3NVSVNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBCdXlIYWxmQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1eUhhbGZCdXNpbmVzc1NldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBMb2FuUGFydG5lcnNoaXBTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0UGxheWVyR2VuZXJpYyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxlY3RQbGF5ZXJHZW5lcmljIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBhcmVEaWNlU2V0dXA6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFNlbGVjdFBsYXllckdlbmVyaWMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsZWN0UGxheWVyR2VuZXJpYyBjbGFzc1wiLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsQWxsQnVzaW5lc3NTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsZWN0QnVzaW5lc3NHZW5lcmljLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFNlbGVjdFBsYXllckdlbmVyaWMgY2xhc3NcIixcclxuICAgIH0sXHJcblxyXG4gICAgQ29tcGl0YXRvclNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IENvbXBpdGF0b3JVSVNldHVwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIENvbXBpdGF0b3JVSVNldHVwIGNsYXNzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFRlbGV2aXNpb25BRFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFRlbGV2aXNpb25BRFVJU2V0dXAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgVGVsZXZpc2lvbkFEVUlTZXR1cCBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgUG9wVXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsYWJlbCByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgYnVzaW5lc3Mgc2V0dXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgR2FtZXBsYXlVSVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGdhbWVwbGF5IHVpIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2VsbFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCAmIHNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgUGF5RGF5IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlbGxCdXNpbmVzc1NjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGxCdXNpbmVzcyBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3Qgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgQnV5T3JTZWxsIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzRG91YmxlUGF5U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgQnVzaW5lc3NEb3VibGVQYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TcGFjZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0UGxheWVyRm9yUHJvZml0U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsZWN0UGxheWVyRm9yUHJvZml0IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdFBsYXllclRha2VPdmVyU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsZWN0UGxheWVyVGFrZU92ZXIgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0UGxheWVyRGFtYWdpbmdTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxlY3RQbGF5ZXJEYW1hZ2luZyBzY3JlZW5cIixcclxuICAgIH0sXHJcblxyXG4gICAgTG9hblBhcnRuZXJzaGlwU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgTG9hblBhcnRuZXJzaGlwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBDb21wYXJlRGljZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIENvbXBhcmVEaWNlIHNjcmVlblwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBDb21wYXJlRGljZURlY2lzaW9uMVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIENvbXBhcmVEaWNlIHNjcmVlblwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBDb21wYXJlRGljZURlY2lzaW9uMlNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIENvbXBhcmVEaWNlIHNjcmVlblwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBDb21wYXJlRGljZURlY2lzaW9uMlRleHQ6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgQ29tcGFyZURpY2UgbGFiZWxcIixcclxuICAgIH0sXHJcblxyXG4gICAgQ29tcGFyZURpY2VEZWNpc2lvbjJCdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBDb21wYXJlRGljZSBidXR0b25cIixcclxuICAgIH0sXHJcblxyXG4gICAgU2VsbEFsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEFsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdEJ1c2luZXNzVGFrZU92ZXJTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxlY3RCdXNpbmVzc1Rha2VPdmVyIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEluc3VmZmljaWVudEJhbGFuY2VTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFRlbXBEaWNlVGV4dDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgZGljZVwiLFxyXG4gICAgfSxcclxuICAgIExlYXZlUm9vbUJ1dHRvbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBdmF0YXJTcHJpdGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFJlc2V0cyB0aGlzIGNsYXNzIGdsb2JhbCB2YXJpYWJsZXMgYW5kIG90aGVyIG5lY2Vzc2FyeSBkYXRhIG9uTG9hZFxyXG4gICAqKi9cclxuICBSZXNldEFsbERhdGEoKSB7XHJcbiAgICBEb3VibGVEYXlCdXNpbmVzc0hCID0gMDtcclxuICAgIERvdWJsZURheUJ1c2luZXNzQk0gPSAwO1xyXG4gICAgVGVsZXZpc2lvbkFkVGltZW91dD1udWxsO1xyXG4gICAgU2VuZGVyQURQUGxheWVyPW51bGw7XHJcbiAgICBWb3RlVGltZW91dD1udWxsO1xyXG4gICAgVm90ZXNVcEFycmF5PVtdO1xyXG4gICAgVm90ZXNEb3duQXJyYXk9W107XHJcbiAgICBOZXh0SGFsZlBheURheSA9IGZhbHNlO1xyXG4gICAgTGFvblBhcnRuZXJzaGlwPWZhbHNlO1xyXG4gICAgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICAgIGJ1c2luZXNzVGFrZU92ZXJOb2RlcyA9IFtdO1xyXG4gICAgYnVzaW5lc3NEYW1hZ2luZ05vZGVzID0gW107XHJcbiAgICBEYW1hZ2VEZWNpc2lvblJlc3VsdCA9IDA7XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgICBTZW5kZXJEYW1hZ2luZ0lEID0gXCJcIjtcclxuICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzID0gW107XHJcbiAgICBzZWxlY3RlZFBsYXllclRha2VPdmVyID0gW107XHJcbiAgICBzZWxlY3RlZFBsYXllckRhbWFnaW5nID0gW107XHJcbiAgICBMYW9uUGFydG5lcnNoaXBBcnJheT1bXTtcclxuICAgIENvbXBhcmVEaWNlQXJyYXk9W107XHJcbiAgICBTZWxsQWxsQnVzaW5lc3NBcnJheT1bXTtcclxuICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2RlcyA9IFtdO1xyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gbnVsbDtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgQ2FuY2VsbGVkSUQgPSBbXTtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBmYWxzZTtcclxuICAgIEhNQW1vdW50ID0gMDtcclxuICAgIEJNQW1vdW50ID0gMDtcclxuICAgIEJNTG9jYXRpb25zID0gMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDA7XHJcbiAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgIFByZXZpb3VzQ2FzaCA9IDA7XHJcbiAgICBSZW1haW5pbmdDYXNoPTA7XHJcbiAgICBMb2FuU2VsZWN0ZWRQbGF5ZXJEYXRhPW51bGw7XHJcbiAgICBUaW1lb3V0UmVmID0gbnVsbDtcclxuICAgIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG4gICAgQmFua1J1cHRlZENhcmQgPSBmYWxzZTtcclxuICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbiAgICAvL3R1cm4gZGVjaXNpb25zXHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4gICAgLy9idXlvcnNlbGxcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgICBEaWNlUmVzdWx0ID0gMDtcclxuICAgIE9uY2VPclNoYXJlO1xyXG4gICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbiAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBUb3RhbFBheURheSA9IDA7XHJcbiAgICBIQkRpY2VDb3VudGVyID0gMDtcclxuICAgIEJNRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgUGF5RGF5SW5mbyA9IFwiXCI7XHJcbiAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZXNldHMgdHVybiB2YXJpYWJsZXMgZm9yIGdvbGRpbnZlc3QvZ29sZHNvbGQvc3Rva2NpbnZlc3Qvc3RvY2tzb2xkXHJcbiAgICoqL1xyXG4gIFJlc2V0VHVyblZhcmlhYmxlKCkge1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZXMgb2YgY2xhc3MvZXMgbmVlZGVkLlxyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAoIUdhbWVNYW5hZ2VyIHx8IEdhbWVNYW5hZ2VyID09IG51bGwpIEdhbWVNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gdGhpcyBub2RlIGdldHMgYWN0aXZlXHJcbiAgICoqL1xyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBHYW1lcGxheVVJTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHRoaXMgbm9kZSBnZXRzIGRlYWN0aXZlXHJcbiAgICoqL1xyXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiU3luY0RhdGFcIiwgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGUgY2xhc3MgaXMgbG9hZGVkXHJcbiAgICoqL1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuUmVzZXRBbGxEYXRhKCk7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG5cclxuICAgIC8vZGVjbGFyaW5nIGxvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gMDtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5Q291bnQgPSAwO1xyXG4gICAgdGhpcy5Jc0JhbmtydXB0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IDA7XHJcbiAgICB0aGlzLkFkZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gICAgdGhpcy5UaW1lciA9IDA7XHJcbiAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgVGltZXJUaW1lb3V0ID0gbnVsbDtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gU3BlY3RhdGUgVUkgU2V0dXBcclxuICBJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIC8vIGNvbnNvbGUudHJhY2UoXCJjbG9zZWRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZFwiKTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkxlYXZlUm9vbUJ1dHRvbi5hY3RpdmUgPSBfc3RhdGU7XHJcblxyXG4gICAgaWYoX3N0YXRlKVxyXG4gICAgICB0aGlzLlRvZ2dsZUV4aXRCdXR0b24oZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUV4aXRCdXR0b24oX3N0YXRlKVxyXG4gIHtcclxuICAgIHRoaXMuRXhpdFJvb21CdXR0b24uYWN0aXZlPV9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpIHtcclxuICAgIEdhbWVwbGF5VUlNYW5hZ2VyLkluc3RhbmNlLnNldFRpbWVTY2FsZSgwKTtcclxuICAgIGlmKERpY2VDb250cm9sbGVyLkluc3RhbmNlKVxyXG4gICAge1xyXG4gICAgICBEaWNlQ29udHJvbGxlci5JbnN0YW5jZS5DbGVhckFsbFRpbWVvdXRzKCk7XHJcbiAgICB9XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKHRydWUpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgY2xlYXJUaW1lb3V0KCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICBHYW1lcGxheVVJTWFuYWdlci5JbnN0YW5jZS5zZXRUaW1lU2NhbGUoMSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMSk7XHJcbiAgfSxcclxuXHJcbiAgc2V0VGltZVNjYWxlKHNjYWxlKSB7XHJcbiAgICBjYy5kaXJlY3Rvci5jYWxjdWxhdGVEZWx0YVRpbWUgPSBmdW5jdGlvbihub3cpIHtcclxuICAgICAgaWYgKCFub3cpIG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICB0aGlzLl9kZWx0YVRpbWUgPSAobm93IC0gdGhpcy5fbGFzdFVwZGF0ZSkgLyAxMDAwO1xyXG4gICAgICB0aGlzLl9kZWx0YVRpbWUgKj0gc2NhbGU7XHJcbiAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSBub3c7XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIE9uRXhpdEJ1dHRvbkNsaWNrZWQoKVxyXG4gIHtcclxuICAgIEdhbWVwbGF5VUlNYW5hZ2VyLkluc3RhbmNlLnNldFRpbWVTY2FsZSgwKTtcclxuICAgIGlmKERpY2VDb250cm9sbGVyLkluc3RhbmNlKVxyXG4gICAge1xyXG4gICAgICBEaWNlQ29udHJvbGxlci5JbnN0YW5jZS5DbGVhckFsbFRpbWVvdXRzKCk7XHJcbiAgICB9XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKHRydWUpO1xyXG5cclxuICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk9PTIpXHJcbiAgICB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgfVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNsZWFyVGltZW91dCgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgR2FtZXBsYXlVSU1hbmFnZXIuSW5zdGFuY2Uuc2V0VGltZVNjYWxlKDEpO1xyXG4gICAgICB9KTtcclxuICAgIH0sIDEpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXNpbmVzc1NldHVwIHdpdGggbG9hblxyXG4gIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRDYXNoU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVDYXNoQWRkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQWRkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgICB0aGlzLlRvZ2dsZUNhc2hBZGRTY3JlZW5fQnVzaW5lc3NTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQ2FzaExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoO1xyXG4gIH0sXHJcblxyXG4gIE9uQ2FzaEFkZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoX3ZhbCkge1xyXG4gICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gX3ZhbDtcclxuICB9LFxyXG5cclxuICBPbkNsaWNrRG9uZUNhc2hBZGRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVDYXNoQWRkU2NyZWVuX0J1c2luZXNzU2V0dXAoZmFsc2UpO1xyXG4gICAgdmFyIF9nYW1lY2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQodGhpcy5BZGRDYXNoQW1vdW50KTtcclxuICAgIGlmICh0aGlzLkFkZENhc2hBbW91bnQgIT0gbnVsbCAmJiB0aGlzLkFkZENhc2hBbW91bnQgIT0gXCJcIiAmJiB0aGlzLkFkZENhc2hBbW91bnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChfYW1vdW50IDw9IF9nYW1lY2FzaCkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICBjb25zb2xlLmxvZyhQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgX2dhbWVjYXNoIC09IF9hbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBfZ2FtZWNhc2gudG9TdHJpbmcoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCwgLTEsIC0xKTtcclxuXHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJDYXNoICRcIiArIHRoaXMuQWRkQ2FzaEFtb3VudCArIFwiIGhhcyBiZWVuIGFkZGVkLlwiKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkFkZENhc2hFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5BZGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkbyBub3QgaGF2ZSBlbm91Z2ggaW4gZ2FtZSBjYXNoLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lID0gZmFsc2UsIG1vZGVJbmRleCA9IDAsIF9pc0JhbmtydXB0ZWQgPSBmYWxzZSwgX0JhbmtydXB0QW1vdW50ID0gMCwgX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSxfbG9hblBhcnRuZXJzaGlwPWZhbHNlLF9PdGhlcnBsYXllckRhdGE9bnVsbCkge1xyXG4gICAgLy9jYWxsZWQgZmlyc3QgdGltZSBmb3JtIEdhbWVNYW5hZ2VyIG9ubG9hZCBmdW5jdGlvblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkgPSBfaXNDYXJkRnVuY3Rpb25hbGl0eTtcclxuICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gX0dpdmVuQ2FzaDtcclxuICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g7XHJcbiAgICBMYW9uUGFydG5lcnNoaXA9X2xvYW5QYXJ0bmVyc2hpcDtcclxuICAgIExvYW5TZWxlY3RlZFBsYXllckRhdGE9X090aGVycGxheWVyRGF0YTtcclxuXHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IF9pc0JhbmtydXB0ZWQ7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSBfQmFua3J1cHRBbW91bnQ7XHJcblxyXG4gICAgaWYgKF9pc0JhbmtydXB0ZWQpIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuXHJcbiAgICB0aGlzLkluaXRfQnVzaW5lc3NTZXR1cChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSwgbW9kZUluZGV4LCBfaXNCYW5rcnVwdGVkLF9sb2FuUGFydG5lcnNoaXApO1xyXG4gIH0sXHJcbiAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUgPSBmYWxzZSwgbW9kZUluZGV4ID0gMCwgX2lzQmFua3J1cHRlZCA9IGZhbHNlLF9sb2FuUGFydG5lcnNoaXA9ZmFsc2UpIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhcmRGdW5jdGlvbmFsaXR5ID0gbmV3IEdhbWVNYW5hZ2VyLkNhcmREYXRhRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ob25lO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5BZGRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChpc0ZpcnN0VGltZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFN0YXJ0R2FtZUNhc2g7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQWRkQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgIGlmIChpbnNpZGVHYW1lKSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gaW5kZXg7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICBpZiAoQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICAgIGlmIChTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgICAgICBQcmV2aW91c0Nhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSAwO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nQXZhdGFySURfQnVzaW5lc3NTZXR1cChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgUHJldmlvdXNDYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gR2l2ZW5DYXNoQnVzaW5lc3M7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTtcclxuICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ0F2YXRhcklEX0J1c2luZXNzU2V0dXAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuYXZhdGFySWQpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEdldE9ial9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5CdXNpbmVzc1NldHVwRGF0YTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAobmFtZSk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllclVJRCA9IFVJRDtcclxuICB9LFxyXG4gIE9uQ2hhbmdBdmF0YXJJRF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgICBpZiAoaXNOYU4oVUlEKSB8fCBVSUQgPT0gdW5kZWZpbmVkKSBVSUQgPSAwO1xyXG5cclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkF2YXRhcklEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IFwiXCI7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZTtcclxuICB9LFxyXG4gIE9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICB9LFxyXG4gIE9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXI7XHJcbiAgfSxcclxuICBPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gYW1vdW50O1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IGFtb3VudDtcclxuICB9LFxyXG4gIENhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgdGFrZW4gbG9hbiBvZiAkXCIgKyBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkbyBub3QgbmVlZCBsb2FuLCB5b3UgaGF2ZSBlbm91Z2ggY2FzaCB0byBidXkgY3VycmVudCBzZWxlY3RlZCBidXNpbmVzcy5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBSZXF1aXJlZENhc2ggPSBNYXRoLmFicyhwYXJzZUludChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKSAtIGFtb3VudCk7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFswXS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiJFwiICsgUmVxdWlyZWRDYXNoO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IHRha2UgbG9hbiBmb3IgY3VycmVudCBidXNpbmVzcyBzZXR1cFwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAoIUJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcikge1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDUwMDAwKTtcclxuICAgICAgfSBlbHNlIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZCkge1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDEwMDAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBzZWxlY3QgYnVzaW5lc3MgYmV0d2VlbiBIb21lIEJhc2VkIGFuZCBicmljayAmIG1vcnRhci5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCB0YWtlIGxvYW4gZm9yIGN1cnJlbnQgYnVzaW5lc3Mgc2V0dXAgb3IgbG9hbiBhbHJlYWR5IHRha2VuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGluZGV4ID09IGkpIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgfSxcclxuICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID09IExvYW5BbW91bnRFbnVtLk90aGVyKSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBSZXF1aXJlZENhc2g7XHJcbiAgICBlbHNlIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IHBhcnNlSW50KHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCk7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4gPSB0cnVlO1xyXG5cclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkxvYW5UYWtlbj10cnVlO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuTG9hbkFtb3VudD1QbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcblxyXG4gICAgdGhpcy5PbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCArIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgfSxcclxuXHJcbiAgUHVzaERhdGFGb3JQbGF5ZXJMZWZ0KF9kYXRhKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgaWYgKF9tb2RlID09IDIpIHtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkNhc2ggPSAyMDAwMDtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLlBsYXllcklEID0gX2RhdGEudXNlcklEO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZSA9IF9kYXRhLm5hbWU7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5BdmF0YXJJRCA9IDA7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPSAxO1xyXG4gICAgICBfcGxheWVyRGF0YUludGFuY2UuSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgX3BsYXllckRhdGFJbnRhbmNlLkNhcmRGdW5jdGlvbmFsaXR5ID0gbmV3IEdhbWVNYW5hZ2VyLkNhcmREYXRhRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICBfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQ7XHJcbiAgICAgIF9wbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID0gXCJTYWxvb25cIjtcclxuICAgICAgX3BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID0gXCJFdmEgQmVhdXR5XCI7XHJcbiAgICAgIF9wbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChfcGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsIF9wbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBTeW5jRGF0YTogZnVuY3Rpb24gKF9kYXRhLCBfSUQsIF9wbGF5ZXJMZWZ0ID0gZmFsc2UpIHtcclxuICAgIHZhciBfaXNTcGVjdGF0ZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXTtcclxuXHJcbiAgICBpZiAoX2lzU3BlY3RhdGUpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFfcGxheWVyTGVmdCkge1xyXG4gICAgICBpZiAoX0lEICE9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5hY3Rvck5yKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChfZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMpIHtcclxuICAgICAgLy9zZXR0aW5nIHJvb20gcHJvcGVydHkgdG8gZGVjbGFyZSBpbml0aWFsIHNldHVwIGhhcyBiZWVuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8sIHRydWUpO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQdXJjaGFzZUJ1c2luZXNzOiBmdW5jdGlvbiAoX2Ftb3VudCwgX2J1c2luZXNzTmFtZSwgX2lzSG9tZUJhc2VkKSB7XHJcbiAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA8IF9hbW91bnQgJiYgIVN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vdCBlbm91Z2ggY2FzaCB0byBidXkgdGhpcyBcIiArIF9idXNpbmVzc05hbWUgKyBcIiBidXNpbmVzcy5cIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChfaXNIb21lQmFzZWQpIHtcclxuICAgICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50IDwgMykge1xyXG4gICAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBfYW1vdW50O1xyXG4gICAgICAgICAgICBSZW1haW5pbmdDYXNoPVBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpIHtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgIFJlbWFpbmluZ0Nhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9IFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJSZXZlcnRpbmcgYmFjayBsb2FuIGFtb3VudC5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQcmV2aW91c0Nhc2g7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBSZW1haW5pbmdDYXNoPTA7XHJcbiAgICAgIExvYW5TZWxlY3RlZFBsYXllckRhdGE9bnVsbDtcclxuICAgICAgTGFvblBhcnRuZXJzaGlwPWZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Jc0JhbmtydXB0ID0gdHJ1ZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQmFua3J1cHRBbW91bnQgPSB0aGlzLkJhbmtydXB0ZWRBbW91bnQ7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAvL3NldHRpbmcgcGxheWVyIGN1cnJlbnQgZGF0YSBpbiBjdXN0b20gcHJvcGVydGllcyB3aGVuIGhpcy9oZXIgdHVybiBvdmVyc1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IGJhbmtydXB0ZWQ6IHRydWUsIHR1cm46IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCksIFBsYXllckRhdGFNYWluOiBQbGF5ZXJEYXRhSW50YW5jZSB9IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg5LCBfZGF0YSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIEFJXHJcbiAgICAgIGlmICghdGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG4gICAgICAgIH0sIDE2MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIG1vZGUgc2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgaWYoTGFvblBhcnRuZXJzaGlwKVxyXG4gICAgICB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1QcmV2aW91c0Nhc2grUmVtYWluaW5nQ2FzaDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUHJldmlvdXNDYXNoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgIFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlO1xyXG4gICAgICBMYW9uUGFydG5lcnNoaXA9ZmFsc2U7XHJcbiAgICAgIFJlbWFpbmluZ0Nhc2g9MDtcclxuICAgICAgTG9hblNlbGVjdGVkUGxheWVyRGF0YT1udWxsO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFBheUFtb3VudFRvUGxheUdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPT0gXCJcIikgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyB0eXBlLlwiKTtcclxuICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID09IFwiXCIpIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuTm9uZSB8fCBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBzZWxlY3QgYSBidXNpbmVzc1wiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PSBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZClcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGhvbWViYXNzZWRcclxuICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoMTAwMDAsIFwiaG9tZVwiLCB0cnVlKTtcclxuICAgICAgZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcilcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGJyaWNrIGFuZCBtb3J0YXJcclxuICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoNTAwMDAsIFwiYnJpY2sgYW5kIG1vcnRhclwiLCBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5TdGFydEdhbWUgPT0gdHJ1ZSB8fCB0aGlzLklzQmFua3J1cHRlZCA9PSB0cnVlKSB7XHJcblxyXG4gICAgICAgIGlmKExhb25QYXJ0bmVyc2hpcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50PTUwMDAwO1xyXG5cclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkxvYW5BbW91bnQ9NTAwMDA7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Mb2FuVGFrZW49dHJ1ZTtcclxuXHJcbiAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLklzUGFydG5lcnNoaXAgPSB0cnVlO1xyXG4gICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5QYXJ0bmVySUQgPSBMb2FuU2VsZWN0ZWRQbGF5ZXJEYXRhLlBsYXllclVJRDtcclxuICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuUGFydG5lck5hbWUgPSBMb2FuU2VsZWN0ZWRQbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcblxyXG4gICAgICAgICAgdmFyIGluZm89XCJZb3UgaGF2ZSBiZWVuIHNlbGVjdGVkIGJ5IHBsYXllciBcIitQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lK1wiIHRvIGdvIGludG8gcGFydG5lcnNoaXAgaW4gdGhlaXIgYnVzaW5lc3MgbmFtZWQgXCIrUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWU7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKGluZm8sTG9hblNlbGVjdGVkUGxheWVyRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgaWYgKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwICE9IC0xKSB7XHJcbiAgICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcnRpbnRpbmcgYWxsIHZhbHVlcyB0byBjb25zb2xlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG5hbWU6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgSUQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIklzIHBsYXllciBib3Q6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLklzQm90KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gb2YgYnVzaW5lc3Mgb2YgcGxheWVyIChzZWUgYmVsb3cpOiBcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNhc2g6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkNhc2gpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgdGFrZW4gbG9hbjogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hblRha2VuKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW4gbG9hbiBhbW91bnQ6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBpc2FjdGl2ZTtcclxuXHJcbiAgICB2YXIgX2FjdGl2ZSA9IGlzYWN0aXZlO1xyXG5cclxuICAgIGlmIChfYWN0aXZlKSB7XHJcbiAgICAgIF9hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkJsb2NrZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlRpbWVyID0gZ2xvYmFsVHVyblRpbWVyO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5UaW1lclRleHQuc3RyaW5nID0gdGhpcy5UaW1lciArIFwiIHNlY29uZHMgYXJlIGxlZnQgdG8gY2hvb3NlIGFib3ZlIG9wdGlvbnMgZXhjZXB0ICdSb2xsIFRoZSBEaWNlJ1wiO1xyXG4gICAgICBjbGVhclRpbWVvdXQoVGltZXJUaW1lb3V0KTtcclxuICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVyVGltZW91dCk7XHJcbiAgICAgIHRoaXMuVGltZXIgPSAwO1xyXG4gICAgICB0aGlzLlRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5CbG9ja2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVGltZXIoKSB7XHJcbiAgICBpZiAodGhpcy5UaW1lciA+IDApIHtcclxuICAgICAgdGhpcy5UaW1lciA9IHRoaXMuVGltZXIgLSAxO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuVGltZXJUZXh0LnN0cmluZyA9IHRoaXMuVGltZXIgKyBcIiBzZWNvbmRzIGFyZSBsZWZ0IHRvIGNob29zZSBhYm92ZSBvcHRpb25zIGV4Y2VwdCAnUm9sbCBUaGUgRGljZSdcIjtcclxuICAgICAgVGltZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVUaW1lcigpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lclRpbWVvdXQpO1xyXG4gICAgICB0aGlzLlRpbWVyID0gMDtcclxuICAgICAgdGhpcy5UaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlRpbWVyVGV4dC5zdHJpbmcgPSBcIlRpbWVyIGlzIG92ZXIsIHlvdSBjYW4gc2VsZWN0IG9ubHkgJ1JvbGwgVGhlIERpY2UnIG5vdy5cIjtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkJsb2NrZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5DYXNoQW1vdW50TGFiZWwuc3RyaW5nID0gXCIkIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLkNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBDaGVja01hcmtldGluZ0Ftb3VudFNoYXJlX0NhcmRGdW5jdGlvbmFsaXR5KF9hbW91bnQgPSAwKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuSGFzTWFya2V0aW5nQ29tcGFueSkge1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudEZvck1hcmtldGluZ1NoYXJlKF9hbW91bnQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQsIFwiWW91IGhhdmUgcmVjZWl2ZWQgbWFya2V0IHNoYXJlIG9mICRcIiArIF9hbW91bnQgKyBcIiBmcm9tIHlvdXIgbWFya2V0aW5nIGNvbXBhbnlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yTWFya2V0aW5nU2hhcmUoX2FtbnQsIF9pZCwgX21zZykge1xyXG4gICAgdmFyIF9kYXRhID0geyBhbW91bnQ6IF9hbW50LCBJRDogX2lkLCBtc2c6IF9tc2cgfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjIsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gXCJcIiB8fCBUZW1wTWFya2V0aW5nQW1vdW50ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB0aGlzLm1hcmtldGluZ0Ftb3VudCA9IHBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuXHJcbiAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdGhpcy5tYXJrZXRpbmdBbW91bnQpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCArIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgKyBcIiAsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKyBcIi5cIixcclxuICAgICAgICAgIExvbmdNZXNzYWdlVGltZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tNYXJrZXRpbmdBbW91bnRTaGFyZV9DYXJkRnVuY3Rpb25hbGl0eSh0aGlzLm1hcmtldGluZ0Ftb3VudCk7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gaWYgcGxheWVyIGhhcyBtb3JlIHRoYW4gNTAwMCRcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cykge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gNTAwMCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgVGVtcEhpcmluZ0xhd3llciA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coVGVtcEhpcmluZ0xhd3llcik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSA1MDAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICsgXCIuXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSkge1xyXG4gICAgTG9jYXRpb25OYW1lID0gX25hbWU7XHJcbiAgfSxcclxuICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoZXZlbnQgPSBudWxsLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICAvL2lmIHBsYXllciBoYXMgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBoZSBjb3VsZCBleHBhbmQgaXRcclxuICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzXCIpO1xyXG5cclxuICAgIEJ1c2luZXNzU2V0dXBDYXJkRnVuY3Rpb25hbGl0eSA9IF9pc0NhcmRGdW5jdGlvbmFsaXR5O1xyXG4gICAgR2l2ZW5DYXNoQnVzaW5lc3MgPSBfR2l2ZW5DYXNoO1xyXG4gICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaDtcclxuXHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB2YXIgZ2VuZXJhdGVkTGVuZ3RoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5LCBHaXZlbkNhc2hCdXNpbmVzcywgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKTtcclxuXHJcbiAgICBpZiAoZ2VuZXJhdGVkTGVuZ3RoID09IDApIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBubyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIHRvIGV4cGFuZC5cIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgICBHaXZlbkNhc2hCdXNpbmVzcyA9IDA7XHJcbiAgICAgICAgICBTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZTtcclxuICAgICAgICAgIFJlbWFpbmluZ0Nhc2g9MDtcclxuICAgICAgICAgIExvYW5TZWxlY3RlZFBsYXllckRhdGE9bnVsbDtcclxuICAgICAgICAgIExhb25QYXJ0bmVyc2hpcD1mYWxzZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxNjAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFCdXNpbmVzc1NldHVwQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzcyBleGl0IGNhbGxlZFwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgQnVzaW5lc3NTZXR1cENhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgICAgIEdpdmVuQ2FzaEJ1c2luZXNzID0gMDtcclxuICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2U7XHJcbiAgICAgIFJlbWFpbmluZ0Nhc2g9MDtcclxuICAgICAgTG9hblNlbGVjdGVkUGxheWVyRGF0YT1udWxsO1xyXG4gICAgICBMYW9uUGFydG5lcnNoaXA9ZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgIHRoaXMuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZEludmVzdGVkKSB7XHJcbiAgICAgIHRoaXMuR29sZEludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRJbnZlc3Q7XHJcbiAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcIkludmVzdCBJbiBHT0xEXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIEJVWVwiLCBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsIFwiQlVZXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblN0b2NrQnVzaW5lc3NOYW1lQ2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGV2ZW50ID0gbnVsbCwgX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgVHVybk92ZXJGb3JJbnZlc3QgPSBfaXNUdXJuT3ZlcjtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhfaXNUdXJuT3Zlcik7XHJcblxyXG4gICAgaWYgKFR1cm5PdmVyRm9ySW52ZXN0KSBTdG9ja0J1c2luZXNzTmFtZSA9IFwiRnJpZW5kJ3MgQnVzaW5lc3NcIjtcclxuXHJcbiAgICBpZiAoIXRoaXMuU3RvY2tJbnZlc3RlZCB8fCBUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFN0b2NrQnVzaW5lc3NOYW1lID09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuXHJcbiAgICAgICAgaWYgKCFUdXJuT3ZlckZvckludmVzdCkgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBlbHNlIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJJbnZlc3QgaW4gU3RvY2tcIiwgRGljZVJlc3VsdCwgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLCBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gQlVZXCIsIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJCVVlcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLkdvbGRTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIEdPTERcIiwgRGljZVJlc3VsdCwgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIiwgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLCBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLCBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLCBcIlNFTExcIiwgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXCJTZWxsIFNUT0NLXCIsIERpY2VSZXN1bHQsIFwiRWFjaCBzaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIiwgT25jZU9yU2hhcmUgKyBcIi9zaGFyZVwiLCBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIiwgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIiwgT25jZU9yU2hhcmUgKyBcIiowPTBcIiwgXCJTRUxMXCIsIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgc2hhcmVzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgIC8vIHRoaXMuU2hvd1RvYXN0KFwid29yayBpbiBwcm9ncmVzcywgY29taW5nIHNvb24uLi5cIik7XHJcbiAgICAvLyB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsRGljZSgpO1xyXG4gIH0sXHJcblxyXG4gIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvL3RoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGFydG5lcnNoaXAgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLldhaXRpbmdTdGF0dXNTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJOYW1lLnN0cmluZyA9IF90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBhcnRuZXJTaGlwUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIHZhciBfdG90YWxMb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgIHZhciBfYWxsTG9jYXRpb25zQW1vdW50ID0gX3RvdGFsTG9jYXRpb25zICogMjUwMDA7XHJcbiAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLlBhcnRuZXJOYW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoXCJub25lXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZykge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZS5zdHJpbmcgPSBfdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyQ2FzaC5zdHJpbmcgPSBcIiRcIiArIF90ZW1wRGF0YS5DYXNoO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25EZXNjcmlwdGlvbi5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpIHtcclxuICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IHRydWU7XHJcbiAgICBQYXJ0bmVyU2hpcERhdGEgPSBfZGF0YTtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKSBfYnVzaW5lc3NNb2RlID0gXCJIb21lIEJhc2VkXCI7XHJcbiAgICBlbHNlIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIF9idXNpbmVzc01vZGUgPSBcIkJyaWNrICYgTW9ydGFyXCI7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbXNnID1cclxuICAgICAgICBcInlvdSBoYXZlIHJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGJ5IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICtcclxuICAgICAgICBcIiAsIGZvbGxvd2luZyBhcmUgdGhlIGRldGFpbHMgb2YgYnVzaW5lc3M6IFwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE5hbWU6IFwiICtcclxuICAgICAgICBfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NOYW1lICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE1vZGU6IFwiICtcclxuICAgICAgICBfYnVzaW5lc3NNb2RlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIFZhbHVlOiAkXCIgK1xyXG4gICAgICAgIF9idXNpbmVzc1ZhbHVlICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIkNhc2ggUGF5bWVudDogJFwiICtcclxuICAgICAgICBfcGF5QW1vdW50ICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcIlxcblwiICtcclxuICAgICAgICBcImlmIG9mZmVyIGlzIGFjY2VwdGVkIHlvdSB3aWxsIHJlY2VpdmUgNTAlIHNoYXJlIG9mIHRoYXQgcGFydGljdWxhciBidXNpbmVzcyBhbmQgd2lsbCByZWNlaXZlIHByb2ZpdC9sb3NlIG9uIHRoYXQgcGFydGljdWxhciBidXNpbmVzcy5cIjtcclxuXHJcbiAgICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoID49IF9wYXlBbW91bnQpIHtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5DYXNoIC09IF9wYXlBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAodHJ1ZSwgX3BheUFtb3VudCwgZmFsc2UsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJjb25ncmF0dWxhdGlvbnMhIHlvdSBoYXZlIHN0YXJ0ZWQgYnVzaW5lc3MgcGFydG5lcnNoaXBcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfZGF0YSA9IFBhcnRuZXJTaGlwRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgaWYgKFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoZmFsc2UsIDAsIHRydWUsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfaXNBY2NlcHRlZCA9IGZhbHNlLCBfcGF5bWVudCA9IDAsIF9pc0NhbmNlbGxlZCA9IGZhbHNlLCBfdUlEID0gXCJcIiwgX2RhdGEgPSBudWxsLCBfYnVzaW5lc3NJbmRleCA9IDApIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSB7IERhdGE6IHsgQWNjZXB0ZWQ6IF9pc0FjY2VwdGVkLCBDYXNoUGF5bWVudDogX3BheW1lbnQsIENhbmNlbGxlZDogX2lzQ2FuY2VsbGVkLCBQbGF5ZXJJRDogX3VJRCwgUGxheWVyRGF0YTogX2RhdGEsIEJ1c2luZXNzSW5kZXg6IF9idXNpbmVzc0luZGV4IH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTIsIF9tYWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfZGF0YSkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdmFyIF9hY2NlcHRlZCA9IF9kYXRhLkRhdGEuQWNjZXB0ZWQ7XHJcbiAgICAgIHZhciBfY2FzaCA9IF9kYXRhLkRhdGEuQ2FzaFBheW1lbnQ7XHJcbiAgICAgIHZhciBfY2FuY2VsbGVkID0gX2RhdGEuRGF0YS5DYW5jZWxsZWQ7XHJcbiAgICAgIHZhciBfdWlkID0gX2RhdGEuRGF0YS5QbGF5ZXJJRDtcclxuICAgICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLkJ1c2luZXNzSW5kZXg7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcImFuc3dlciByZWNlaXZlZFwiKTtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Nhc2g7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCA9IHRydWU7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3VpZDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIGFjY2VwdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiLCBjYXNoICRcIiArIF9jYXNoICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBhY2NvdW50LlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmluY2x1ZGVzKF91aWQpID09IGZhbHNlKSBDYW5jZWxsZWRJRC5wdXNoKF91aWQpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKENhbmNlbGxlZElEKTtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5sZW5ndGggPT0gX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gY2FuY2VsbGVkIGJ5IGFsbCBvdGhlciB1c2Vycy5cIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJvZmZlciByZWplY3RlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICBSZXNldEdvbGRJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5Hb2xkRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpIHtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5TdG9ja0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbChfYW1vdW50KSB7XHJcbiAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBfYW1vdW50O1xyXG5cclxuICAgIGlmIChFbnRlckJ1eVNlbGxBbW91bnQgPT0gXCJcIikge1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgdmFyIF9hbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqXCIgKyBFbnRlckJ1eVNlbGxBbW91bnQgKyBcIj1cIiArIF9hbW91bnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB0aGlzLlJlc2V0R29sZElucHV0KCk7XHJcbiAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChfdGl0bGUsIF9kaWNlUmVzdWx0LCBfcHJpY2VUaXRsZSwgX3ByaWNlVmFsdWUsIF9idXlPclNlbGxUaXRsZSwgX3RvdGFsQW1vdW50VGl0bGUsIF90b3RhbEFtb3VudFZhbHVlLCBfYnV0dG9uTmFtZSwgX3N0YXRlKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2VSZXN1bHQ7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVGl0bGVMYWJlbC5zdHJpbmcgPSBfcHJpY2VUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZyA9IF9wcmljZVZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXlPclNlbGxUaXRsZUxhYmVsLnN0cmluZyA9IF9idXlPclNlbGxUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRUaXRsZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1dHRvbk5hbWVMYWJlbC5zdHJpbmcgPSBfYnV0dG9uTmFtZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVEYXRhX0ludmVzdFNlbGwoX3RvdGFsQW1vdW50VmFsdWUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIEFwcGx5QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiXCI7XHJcblxyXG4gICAgICBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50ICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTERcIiwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuXHJcbiAgICAgICAgICBJbnZlc3RTZWxsSW5mbyA9IFwiQnV5aW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBPdW5jZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIE91bmNlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIGlmIChfYW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50IC09IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIEdPTEQ6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIE91bmNlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlNvbGQgT3VuY2VzOiBcIiArIF9hbW91bnQgKyBcIlxcblwiICsgXCJUb3RhbCBQYXltZW50IGZvciBPdW5jZXM6ICRcIiArIF9Ub3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNJbmZvKEludmVzdFNlbGxJbmZvKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0QnV0dG9uX0ludmVzdFNlbGwoKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggR09MRCBvdW5jZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgKyBcIiBvZiBHT0xEIG91bmNlc1wiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uU3RvY2tJbnZlc3QpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICBpZiAoX1RvdGFsQW1vdW50IDw9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgLy9jYW4gYWRkIG11bHRpcGxlIHN0b2NrcyB3aXRoIGJ1c2luZXNzIG5hbWUgaW4gb2JqZWN0IGlmIHJlcXVpcmVkXHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIHNoYXJlcyBvZiBidXNpbmVzcyBcIiArIFN0b2NrQnVzaW5lc3NOYW1lLCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJCdXlpbmcgU1RPQ0s6XCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgT25jZU9yU2hhcmUgLyAxMDAwICsgXCJcXG5cIiArIFwiUGVyIHNoYXJlIHByaWNlOiAkXCIgKyBPbmNlT3JTaGFyZSArIFwiXFxuXCIgKyBcIlB1cmNoYXNlZCBzaGFyZXM6IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlRvdGFsIFBheW1lbnQgZm9yIHNoYXJlczogJFwiICsgX1RvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oSW52ZXN0U2VsbEluZm8pO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRCdXR0b25fSW52ZXN0U2VsbCgpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuXHJcbiAgICAgICAgaWYgKF9hbW91bnQgPD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCAtPSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgKyBfYW1vdW50ICsgXCIgc2hhcmVzIG9mIHN0b2NrIGZvciAgJFwiICsgX1RvdGFsQW1vdW50LCBMb25nTWVzc2FnZVRpbWUpO1xyXG5cclxuICAgICAgICAgIEludmVzdFNlbGxJbmZvID0gXCJTZWxsaW5nIFNUT0NLOlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbGVkOiBcIiArIE9uY2VPclNoYXJlIC8gMTAwMCArIFwiXFxuXCIgKyBcIlBlciBzaGFyZSBwcmljZTogJFwiICsgT25jZU9yU2hhcmUgKyBcIlxcblwiICsgXCJTb2xkIHNoYXJlczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiVG90YWwgUGF5bWVudCBmb3Igc2hhcmVzOiAkXCIgKyBfVG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jSW5mbyhJbnZlc3RTZWxsSW5mbyk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIHN0b2NrcyBzaGFyZXMsIHlvdSBvd24gXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICsgXCIgb2Ygc3RvY2sgc2hhcmVzXCIsIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG5cclxuICAgIGlmIChUdXJuT3ZlckZvckludmVzdCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICBUdXJuT3ZlckZvckludmVzdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXlkYXkgb3IgRG91YmxlIHBheSBEYXlcclxuICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LCBCTUFtb3VudCwgbG9hblRha2VuKSB7XHJcbiAgICBpZiAoSE1BbW91bnQgPT0gMCkge1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChCTUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWxvYW5UYWtlbikge1xyXG4gICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdldExvYW5BbW91bnRfUGF5RGF5KCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdmFyIF9sb2FuID0gMDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hbiA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xvYW47XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXkgPSBmYWxzZSwgX3NraXBITSA9IGZhbHNlLCBfc2tpcEJNID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgX2hNQW1vdW50ID0gMCwgX2JtQW1vdW50ID0gMCwgX2JtTG9jYXRpb24gPSAwLCBQYXlkYXlDb3VudGVyID0gMSwgRG91YmxlUGF5Q291bnRlciA9IDAsIF9oYWxmUGF5ZGF5ID0gZmFsc2UpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgVG90YWxQYXlEYXkgPSAwO1xyXG5cclxuICAgIEdpdmVQcm9maXRVc2VySUQgPSBcIlwiO1xyXG4gICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5KSB7XHJcbiAgICAgIEdpdmVQcm9maXRVc2VySUQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlVzZXJJREZvclByb2ZpdFBheURheTtcclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYW5HaXZlUHJvZml0T25QYXlEYXkgPSBmYWxzZTtcclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKEdpdmVQcm9maXRVc2VySUQpO1xyXG4gICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkpO1xyXG5cclxuICAgIGlmIChHaXZlUHJvZml0VXNlcklEICE9IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdob2xlIHByb2ZpdCB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIG90aGVyIHBsYXllciB0aGlzIHR1cm4uXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIEhCRGljZUNvdW50ZXIgPSAwO1xyXG4gICAgQk1EaWNlQ291bnRlciA9IDA7XHJcbiAgICBOZXh0SGFsZlBheURheSA9IF9oYWxmUGF5ZGF5O1xyXG4gICAgLy8gICBpZiAoRG91YmxlUGF5Q291bnRlciA9PSAwKSBEb3VibGVQYXlDb3VudGVyID0gMTtcclxuXHJcbiAgICAvLyAgaWYgKERvdWJsZVBheURheSkgRG91YmxlUGF5Q291bnRlciA9IERvdWJsZVBheUNvdW50ZXIgKiAyO1xyXG5cclxuICAgIERvdWJsZURheUJ1c2luZXNzSEIgPSAwO1xyXG4gICAgRG91YmxlRGF5QnVzaW5lc3NCTSA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0hCKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICBEb3VibGVEYXlCdXNpbmVzc0JNKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKERvdWJsZURheUJ1c2luZXNzSEIgPiAwIHx8IERvdWJsZURheUJ1c2luZXNzQk0gPiAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gXCIgKyAoRG91YmxlRGF5QnVzaW5lc3NIQiArIERvdWJsZURheUJ1c2luZXNzQk0pICsgXCIgYnVzaW5lc3MvZXMuXCIsIDEyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcmVzID0gUGF5ZGF5Q291bnRlciArIERvdWJsZVBheUNvdW50ZXI7XHJcbiAgICBQYXlEYXlJbmZvID0gXCJQYXlEYXkgUmVzdWx0IHdpdGggbXVsdGlwbGllcjogXCIgKyBfcmVzO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLlBheURheUNvdW50ID0gUGF5ZGF5Q291bnRlcjtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5Q291bnQgPSBEb3VibGVQYXlDb3VudGVyO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gX2lzRG91YmxlUGF5RGF5O1xyXG4gICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdmFyIF90aW1lID0gMTgwMDtcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NQYXlEYXkgPSBfZm9yU2VsZWN0ZWRCdXNpbmVzcztcclxuICAgIFNlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9TZWxlY3RlZEJ1c2luZXNzSW5kZXg7XHJcbiAgICBITUFtb3VudCA9IF9oTUFtb3VudDtcclxuICAgIEJNQW1vdW50ID0gX2JtQW1vdW50O1xyXG4gICAgQk1Mb2NhdGlvbnMgPSBfYm1Mb2NhdGlvbjtcclxuXHJcbiAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChOZXh0SGFsZlBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHdpbGwgcmVjZWl2ZSBoYWxmIHByb2ZpdHMgdGhpcyBwYXlkYXkuXCIsIF90aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLCBfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsIF90aW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmIChfc2tpcEhNICYmIF9za2lwQk0pIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEhNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICBlbHNlIGlmIChfc2tpcEJNKSBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvYW5UYWtlbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICBsb2FuVGFrZW4gPSBfbG9hblRha2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZyA9IEJNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmcgPSBCTUxvY2F0aW9ucztcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5QYXNzZWRQYXlEYXlDb3VudExhYmVsLnN0cmluZyA9IHRoaXMuUGF5RGF5Q291bnQ7XHJcblxyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICB2YXIgX2xvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICRcIiArIF9sb2FuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJDUwMDBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG5cclxuICAgIGlmIChfc2tpcEJNIHx8IF9za2lwSE0pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgX3RpbWUgKyAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5PbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICAgIHRoaXMuT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgaWYgKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9kb3VibGVQYXlEYXkgPSBEb3VibGVQYXlEYXk7XHJcbiAgICAgIHZhciBfaGFsZlBheWRheSA9IE5leHRIYWxmUGF5RGF5O1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICAgIGVsc2UgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfZG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVTZW5kID0gMDtcclxuICAgICAgdmFyIF9hbW91bnRUb0JlQWRqdXN0ZWQgPSAwO1xyXG4gICAgICB2YXIgX211bHRpcGxpZXIgPSAxO1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG5cclxuICAgICAgaWYgKF9oYWxmUGF5ZGF5KSBfbXVsdGlwbGllciA9IF9tdWx0aXBsaWVyIC8gMjtcclxuXHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG4gICAgICBpZiAoX2RvdWJsZVBheURheSkge1xyXG4gICAgICAgIGlmICh0aGlzLkRvdWJsZVBheURheUNvdW50ICE9IDApIHtcclxuICAgICAgICAgIF9tdWx0aXBsaWVyICo9IDIgKiB0aGlzLkRvdWJsZVBheURheUNvdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGRvdWJsZVBheURheUFkZGVkID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIERvdWJsZURheUJ1c2luZXNzSEIgKiBfZGljZSAqIDEwMDA7XHJcblxyXG4gICAgICBpZiAoIVNlbGVjdGVkQnVzaW5lc3NQYXlEYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSBfcGF5bWVudCAvIDI7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBfZGljZSAqIDEwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSBUb3RhbFBheURheUFtb3VudCA9IF9tdWx0aXBsaWVyICogX3BheWRheW11bHRpcGxpZXIgKiBITUFtb3VudCAqIF9kaWNlICogMTAwMCAtIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgZWxzZSBUb3RhbFBheURheUFtb3VudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiAoSE1BbW91bnQgKiBfZGljZSkgKiAxMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuXHJcbiAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID0gXCIoXCIgKyBfcGF5ZGF5bXVsdGlwbGllciArIFwiKlwiICsgX2RpY2UgKyBcIipcIiArIEhNQW1vdW50ICsgXCIqXCIgKyBcIjEwMDApLVwiICsgX2Ftb3VudFRvQmVBZGp1c3RlZCArIFwiK1wiICsgZG91YmxlUGF5RGF5QWRkZWQgKyBcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9IFwiKFwiICsgX3BheWRheW11bHRpcGxpZXIgKyBcIipcIiArIF9kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJIb21lIEJhc2VkIEJ1c2luZXNzOiBcIiArIEhNQW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfZG91YmxlUGF5RGF5ID0gRG91YmxlUGF5RGF5O1xyXG4gICAgICB2YXIgX3BheWRheW11bHRpcGxpZXIgPSB0aGlzLlBheURheUNvdW50O1xyXG4gICAgICB2YXIgX2hhbGZQYXlkYXkgPSBOZXh0SGFsZlBheURheTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIGlmICghX2RvdWJsZVBheURheSkgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2RvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICghU2VsZWN0ZWRCdXNpbmVzc1BheURheSkge1xyXG4gICAgICAgIEJNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIF9hbW91bnQgPSBCTUFtb3VudCArIEJNTG9jYXRpb25zO1xyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3M7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICBpZiAoX2hhbGZQYXlkYXkpIF9tdWx0aXBsaWVyID0gX211bHRpcGxpZXIgLyAyO1xyXG5cclxuICAgICAgaWYgKF9kb3VibGVQYXlEYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5Eb3VibGVQYXlEYXlDb3VudCAhPSAwKSB7XHJcbiAgICAgICAgICBfbXVsdGlwbGllciAqPSAyICogdGhpcy5Eb3VibGVQYXlEYXlDb3VudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX211bHRpcGxpZXIgKj0gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkb3VibGVQYXlEYXlBZGRlZCA9IF9wYXlkYXltdWx0aXBsaWVyICogX211bHRpcGxpZXIgKiBEb3VibGVEYXlCdXNpbmVzc0JNICogX2RpY2UgKiAyMDAwO1xyXG5cclxuICAgICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgIHZhciBfcGF5bWVudCA9IF9wYXlkYXltdWx0aXBsaWVyICogX2xvY2F0aW9ucyAqIF9tdWx0aXBsaWVyICogX2RpY2UgKiAyMDAwICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtTZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID0gX3BheWRheW11bHRpcGxpZXIgKiBfbG9jYXRpb25zICogX211bHRpcGxpZXIgKiBfZGljZSAqIDIwMDAgKyBkb3VibGVQYXlEYXlBZGRlZDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gX3BheW1lbnQgLyAyO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZCA+IDApIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCBMb25nTWVzc2FnZVRpbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIV9kb3VibGVQYXlEYXkpIFRvdGFsUGF5RGF5QW1vdW50ID0gX211bHRpcGxpZXIgKiBfcGF5ZGF5bXVsdGlwbGllciAqIF9hbW91bnQgKiBfZGljZSAqIDIwMDAgLSBfYW1vdW50VG9CZUFkanVzdGVkICsgZG91YmxlUGF5RGF5QWRkZWQ7XHJcbiAgICAgIGVsc2UgVG90YWxQYXlEYXlBbW91bnQgPSBfcGF5ZGF5bXVsdGlwbGllciAqIF9tdWx0aXBsaWVyICogKF9hbW91bnQgKiBfZGljZSkgKiAyMDAwIC0gX2Ftb3VudFRvQmVBZGp1c3RlZCArIGRvdWJsZVBheURheUFkZGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBfYW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFfZG91YmxlUGF5RGF5KSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKS1cIiArIF9hbW91bnRUb0JlQWRqdXN0ZWQgKyBcIitcIiArIGRvdWJsZVBheURheUFkZGVkICsgXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZSB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPSBcIihcIiArIF9wYXlkYXltdWx0aXBsaWVyICsgXCIqXCIgKyBfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKlwiICsgX211bHRpcGxpZXIgKyBcIiktXCIgKyBfYW1vdW50VG9CZUFkanVzdGVkICsgXCIrXCIgKyBkb3VibGVQYXlEYXlBZGRlZCArIFwiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBQYXlEYXlJbmZvICs9IFwiXFxuXCIgKyBcIlxcblwiICsgXCJCcmljayAmIE1vcnRhciBCdXNpbmVzczogXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiRGljZSBSb2xsZWQ6IFwiICsgX2RpY2UgKyBcIlxcblwiICsgXCJBbW91bnQgUmVjZWl2ZWQ6ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICBUb3RhbFBheURheSArPSBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2UgX0VzdGltYXRlTG9hbiA9IDUwMDA7XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfRXN0aW1hdGVMb2FuKSB7XHJcbiAgICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBlbHNlIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib3V0IG9mIG1vbmV5XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCkge1xyXG4gICAgLy9hbGxcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9QYXlEYXkoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiQW1vdW50ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50ICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQW1vdW50ICRcIiArIFRvdGFsUGF5RGF5QW1vdW50ICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2tpcExvYW5PbmVUaW1lX1BheURheSgpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc2tpcHBlZCB0aGUgbG9hbiBwYXltZW50LCBiYW5rIHdpbGwgY2FsbCB1cG9uIGNvbXBsZXRlIGxvYW4gYW1vdW50IG9uIG5leHQgcGF5ZGF5XCIpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIFNlbGxCdXNpbmVzc19QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9QYXlEYXkoX2Ftb3VudCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9hbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgRXhpdExvYW5TY3JlZW5fUGF5RGF5KCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc0JhbmtydXB0KF9zaG93VGV4dCA9IHRydWUsIF90eHQsIF90aW1lKSB7XHJcbiAgICBpZiAoX3Nob3dUZXh0KSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KF90eHQsIF90aW1lLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5FeGl0X1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgdGhpcy5FeGl0U2NyZWVuX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShmYWxzZSk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjc2lvbjAxU2NyZWVuX0NvbXBhcmVEaWNlKGZhbHNlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVEaWNlUmVzdWx0U2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXlIYWxmQnVzaW5lc3MoZmFsc2UpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU2hvd0NhcmRcIiwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgX3RpbWUgKyAxMCk7XHJcbiAgfSxcclxuICBTdGFydE5ld0dhbWVfUGF5RGF5KCkge1xyXG4gICAgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIGlmIChtb2RlID09IDIpIHtcclxuICAgICAgaWYgKEJhbmtSdXB0ZWRDYXJkKSB7XHJcbiAgICAgICAgQmFua1J1cHRlZENhcmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTWFpblNjcmVlbl9EYW1hZ2VEZWNpc2lvbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5FeGl0X19fSW5zdWZmaWNpZW50QmFsYW5jZSgpO1xyXG4gICAgICAgIHRoaXMuRXhpdF9TZWxlY3RQbGF5ZXJHZW5lcmljKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjc2lvbjAxU2NyZWVuX0NvbXBhcmVEaWNlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLkV4aXRTY3JlZW5fX0J1c2luZXNzR2VucmljKCk7XHJcbiAgICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgICB2YXIgX3NlbmRpbmdEYXRhID0geyBJRDogU2VuZGVyRGFtYWdpbmdJRCwgQ2FzaDogRGFtYWdlRGVjaXNpb25SZXN1bHQsIElzRGljZVJvbGxlZDogdHJ1ZSwgSXNCYW5rUnVwdGVkOiB0cnVlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyNSwgX3NlbmRpbmdEYXRhKTtcclxuXHJcbiAgICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdmFyIHBsYXllckRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwbGF5ZXJEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKHBsYXllckRhdGFbaW5kZXhdLlBsYXllclVJRCA9PSBfbXlBY3Rvci5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgcGxheWVyRGF0YVtpbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuQmFua3J1cHRlZE5leHRUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgcGxheWVyRGF0YVtpbmRleF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0IG5leHQgdHVybi5cIiwgMzAwMCwgZmFsc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUHJvY2Vzc0JhbmtydXB0KHRydWUsIFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0LlwiLCAzMDAwKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgdGhpcy5Qcm9jZXNzQmFua3J1cHQodHJ1ZSwgXCJZb3Ugd2lsbCBsb3NlIGFsbCBwcm9ncmVzcyBhbmQgc3RhcnQgbmV3IGdhbWUgZnJvbSB0aGUgc3RhcnQuXCIsIDMwMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3R2FtZV9CYW5rUnVwdGVkKF90eHQpIHtcclxuICAgIC8vaWYgYmFua3J1cHRlZCB5b3UgY2FuIHN0YXJ0IG5ldyBnYW1lXHJcbiAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICB0aGlzLlByb2Nlc3NCYW5rcnVwdCh0cnVlLCBfdHh0LCAzMDAwKTtcclxuICB9LFxyXG5cclxuICBTaG93SW5mbyhfZGF0YSkge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwicmVlY2lldmVkIGlkOiBcIitfZGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgaWYoX2RhdGEuUGxheWVyVUlEPT1cIlwiKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChfZGF0YS5pbmZvLCAyMDAwLCB0cnVlKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgICBpZihtb2RlPT0yKSAvL3JlYWwgcGxheWVyc1xyXG4gICAgICB7XHJcbiAgICAgICAgICB2YXIgX215VUlEPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRNeVBsYXllclVJRCgpO1xyXG4gICAgICAgICAgaWYoX215VUlEPT1fZGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KF9kYXRhLmluZm8sIDMwMDAsIHRydWUpO1xyXG4gICAgICAgICAgfWVsc2VcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3RoaW5nXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUGF5RGF5Q29tcGxldGVkKCkge1xyXG4gICAgaWYgKEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgJiYgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkICYmIExvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgY29uc29sZS5sb2coXCJhbGwgcGF5ZGF5IGRvbmVcIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoR2l2ZVByb2ZpdFVzZXJJRCAhPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3VyIHdob2xlIFBheWRheSBhbW91bnQgJFwiICsgVG90YWxQYXlEYXkgKyBcIiB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIG90aGVyIHBsYXllciBub3cuXCIsIDIyMDApO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxQYXlEYXk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oVG90YWxQYXlEYXksIEdpdmVQcm9maXRVc2VySUQpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNvbXBsZXRpb24oKTtcclxuICAgICAgICB9LCAzMjAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDb21wbGV0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yQ29tcGxldGlvbigpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgaWYgKCFTZWxlY3RlZEJ1c2luZXNzUGF5RGF5KSB7XHJcbiAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICBfbWFuYWdlci5Ub2dnbGVQYXlEYXkoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlciA+IDApIHtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheUNvdW50ZXItLTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBfbWFuYWdlci5Ub2dnbGVIYWxmUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIF9tYW5hZ2VyLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX21hbmFnZXIuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0luZm8oUGF5RGF5SW5mbyk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGwgJiBtYW5pcHVsYXRlIEJ1c2luZXNzIFVJXHJcbiAgVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKF9zZWxsQW1vdW50ID0gMCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMTFwiO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nID0gXCJObyBvZiBCdXNpbmVzc2VzIDogXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzU2VsbFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChfc2VsbEFtb3VudCAhPSAwKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRTZWxsaW5nQW1vdW50KF9zZWxsQW1vdW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKGZhbHNlKTtcclxuICAgICAgZWxzZSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1VJX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIGlmICghX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVTSU5FU1NcIjtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc01hbmlwdWxhdGlvblByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2VsZWN0QnVzaW5lc3Nmb3JQYXlEYXkoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAvLyBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIC8vIGVsc2VcclxuICAgICAgLy8gICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIFJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKF9pc1R1cm5vdmVyID0gZmFsc2UsIF9zZWxsQW1vdW50ID0gMCkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKF9zZWxsQW1vdW50KTtcclxuICB9LFxyXG5cclxuICBFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX2lzQm90KSB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG5cclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAoX2lzQm90KTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgVUlcclxuICBUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiSU5WRVNUXCI7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICBUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVZIE9SIFNFTExcIjtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzZXR1cCBVaVxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNob3dRdWVzdGlvblRvYXN0KF9tc2cpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW5MYWJlbC5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsIF9hY3RvcnNEYXRhLCBfaXNUdXJuT3ZlciwgX21vZGVJbmRleCA9IDApIHtcclxuICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBvbmVRdWVzdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBvbmVRdWVzdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXNnKSB7XHJcbiAgICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvbkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUXVlc3Rpb25MYWJlbC5zdHJpbmcgPSBfbXNnO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxlY3QgQnVzaW5lc3MgZm9yIGRvdWJsZSBwYXlkYXkgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc0RvdWJsZVBheVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRWRpdFRpdGxlX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfbWFpblRpdGxlLCBfdGlsZUNvbnRlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlRpdGxlTmFtZS5zdHJpbmcgPSBfbWFpblRpdGxlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1BheURheVVJU2V0dXAuVGl0bGVDb250ZW50TGFiZWwuc3RyaW5nID0gX3RpbGVDb250ZW50O1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKCkge1xyXG4gICAgdGhpcy5DbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2NyZWVuX0Fsb25nVHVybk92ZXJfQnVzaW5lc3NQYXlEYXlVSVNldHVwKCkge1xyXG4gICAgdGhpcy5DbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJCdXNpbmVzc19CdXNpbmVzc1BheURheVVJU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXlEYXlOb2RlcyA9IFtdO1xyXG4gIH0sXHJcbiAgUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfdGVtcERhdGEsIF9idXNpbmVzc1R5cGUpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSBfYnVzaW5lc3NUeXBlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5CdXNpbmVzc1ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgICB2YXIgX3RvdGFsTG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgICAgICB2YXIgX2FsbExvY2F0aW9uc0Ftb3VudCA9IF90b3RhbExvY2F0aW9ucyAqIDI1MDAwO1xyXG4gICAgICAgICAgdmFyIF9maW5hbEFtb3VudCA9IDUwMDAwICsgX2FsbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwID09IHRydWUpIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5QYXJ0bmVyTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKFwibm9uZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1c2luZXNzRGV0YWlsUGF5RGF5Tm9kZXMucHVzaChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNlbGV0aXZlRG91YmxlUGF5RGF5X0J1c2luZXNzUGF5RGF5VUlTZXR1cChfaXNIb21lQmFzZWQgPSBmYWxzZSwgX2lzQnJpY2tBbmRNb3J0YXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5DbGVhckJ1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgdGhpcy5FZGl0VGl0bGVfQnVzaW5lc3NQYXlEYXlVSVNldHVwKFwiQlVTSU5FU1NcIiwgXCIqU2VsZWN0IGEgYnVzaW5lc3MgdG8gcmVjZWl2ZSBkb3VibGUgcGF5ZGF5IHByb2ZpdHMgdGhyb3VnaCBvdXQgZ2FtZSBvbiB0aGF0IGJ1c2luZXNzLlwiKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuQnVzaW5lc3NQYXlEYXlVSVNldHVwLlBsYXllck5hbWUuc3RyaW5nID0gX3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLkJ1c2luZXNzUGF5RGF5VUlTZXR1cC5QbGF5ZXJDYXNoLnN0cmluZyA9IFwiJFwiICsgX3RlbXBEYXRhLkNhc2g7XHJcblxyXG4gICAgaWYgKF9pc0JyaWNrQW5kTW9ydGFyKSB7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc0J1c2luZXNzX0J1c2luZXNzUGF5RGF5VUlTZXR1cChfdGVtcERhdGEsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNIb21lQmFzZWQpIHtcclxuICAgICAgdGhpcy5Qcm9jZXNzQnVzaW5lc3NfQnVzaW5lc3NQYXlEYXlVSVNldHVwKF90ZW1wRGF0YSwgMSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGVjdCBQbGF5ZXIgZm9yIHByb2ZpdFxyXG4gIFRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMRUNUIFBMQVlFUlwiO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGVJbmRleCA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJGb3JQcm9maXRVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyRm9yUHJvZml0VUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckZvclByb2ZpdFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzZWxlY3RQbGF5ZXJQcm9maXROb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgc2VsZWN0UGxheWVyUHJvZml0Tm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHNlbGVjdFBsYXllclByb2ZpdE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gKGdlbmVyaWMgcGxheWVyKSBTZWxlY3QgUGxheWVyIHRvIFRha2Ugb3ZlciBidXNpbmVzc1xyXG4gIFRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3Zlcihfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCwgX2J1eUhhbGZCdXNpbmVzcyA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTEVDVCBQTEFZRVJcIjtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIFBsYXllcnM6IFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICB2YXIgX21haW5EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2J1eUhhbGZCdXNpbmVzcykge1xyXG4gICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRCdXlIYWxmKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IF9tYWluRGF0YS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgIGlmIChfbWFpbkRhdGFba10uUGxheWVyVUlEID09IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllckluZGV4KGspO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxlY3RlZFBsYXllclRha2VPdmVyLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyVGFrZU92ZXJTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgc2VsZWN0ZWRQbGF5ZXJUYWtlT3Zlci5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllclRha2VPdmVyU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJUYWtlT3ZlclNldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNlbGVjdGVkUGxheWVyVGFrZU92ZXIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHNlbGVjdGVkUGxheWVyVGFrZU92ZXJbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHNlbGVjdGVkUGxheWVyVGFrZU92ZXIgPSBbXTtcclxuICB9LFxyXG5cclxuICBFeGl0X1NlbGVjdFBsYXllckdlbmVyaWMoKSB7XHJcbiAgICB0aGlzLlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmcoKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcigpO1xyXG4gICAgdGhpcy5SZXNldFNwYWNlU2NyZWVuX0NvbXBhcmVEaWNlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcihmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoZmFsc2UpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckdlbmVyaWMoKSB7XHJcbiAgICB0aGlzLlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmcoKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcigpO1xyXG4gICAgdGhpcy5SZXNldFNwYWNlU2NyZWVuX0NvbXBhcmVEaWNlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcihmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoZmFsc2UpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG4gXHJcbiAgLy8jcmVnaW9uIChnZW5lcmljIGJ1c2luZXNzKSBTZWxlY3QgQnVzaW5lc3MgdG8gdGFrZSBvdmVyXHJcbiAgVG9nZ2xlU2NyZWVuX0J1c2luZXNzVGFrZU92ZXIoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXJTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfQnVzaW5lc3NUYWtlT3ZlcihfcGxheWVyRGF0YSwgX090aGVyUGxheWVySW5kZXggPSAwLCBfYnV5SGFsZkJ1c2luZXNzID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRfQnVzaW5lc3NUYWtlT3ZlcigpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX3BsYXllckRhdGE7XHJcbiAgICBjb25zb2xlLmxvZyhfdGVtcERhdGEpO1xyXG5cclxuICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVTSU5FU1NcIjtcclxuICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5DYXNoTGFiZWwuc3RyaW5nID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5TZWxlY3RCdXNpbmVzc1Rha2VPdmVyLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9IFwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICsgX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGVjdEJ1c2luZXNzVGFrZU92ZXIuQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGxheWVyT2JqZWN0KF9wbGF5ZXJEYXRhKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQbGF5ZXJJbmRleChfT3RoZXJQbGF5ZXJJbmRleCk7XHJcblxyXG4gICAgICBpZiAoX2J1eUhhbGZCdXNpbmVzcykge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuc2V0SGFsZkJ1c2luZXNzKHRydWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBidXNpbmVzc1Rha2VPdmVyTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldF9CdXNpbmVzc1Rha2VPdmVyKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzVGFrZU92ZXJOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NUYWtlT3Zlck5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVzaW5lc3NUYWtlT3Zlck5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2NyZWVuX19CdXNpbmVzc1Rha2VPdmVyKF9pc1R1cm5vdmVyID0gZmFsc2UsIF9wbGF5ZXJEYXRhID0gbnVsbCwgX3BsYXllckluZGV4ID0gMCwgX2J1eUhhbGZCdXNpbmVzcyA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxlY3RCdXNpbmVzc1Rha2VPdmVyLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NUYWtlT3Zlci5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1Rha2VPdmVyKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX0J1c2luZXNzVGFrZU92ZXIoX3BsYXllckRhdGEsIF9wbGF5ZXJJbmRleCwgX2J1eUhhbGZCdXNpbmVzcyk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNjcmVlbl9fQnVzaW5lc3NHZW5yaWMoKSB7XHJcbiAgICB0aGlzLlJlc2V0X19EYW1hZ2VEZWNpc2lvbigpO1xyXG4gICAgdGhpcy5SZXNldF9CdXNpbmVzc1Rha2VPdmVyKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0J1c2luZXNzVGFrZU92ZXIoZmFsc2UpO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fU2VsbEFsbEJ1c2luZXNzKGZhbHNlKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxsQWxsQnVzaW5lc3MoKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2NyZWVuQWxvbmdUdXJuT3Zlcl9fQnVzaW5lc3NHZW5yaWMoKSB7XHJcbiAgICB0aGlzLlJlc2V0X19EYW1hZ2VEZWNpc2lvbigpO1xyXG4gICAgdGhpcy5SZXNldF9CdXNpbmVzc1Rha2VPdmVyKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9CdXNpbmVzc1Rha2VPdmVyKGZhbHNlKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1NlbGxBbGxCdXNpbmVzcyhmYWxzZSk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgIHRoaXMuUmVzZXRTcGFjZVNjcmVlbl9TZWxsQWxsQnVzaW5lc3MoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGVjdCBQbGF5ZXIgd2hvbWUgeW91IGhhdmUgcmVjZWl2ZWQgZGFtYWdpbmcgaW5mb3JtYXRpb24gYW5kIHdhbnQgdG8gZ2l2ZSB0aGVtIGNob2ljZVxyXG4gIFRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmcoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJTRUxFQ1QgUExBWUVSXCI7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXAuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXAuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nID0gXCJObyBvZiBQbGF5ZXJzOiBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgdmFyIF9tYWluRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBfbWFpbkRhdGEubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICBpZiAoX21haW5EYXRhW2tdLlBsYXllclVJRCA9PSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJJbmRleChrKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxlY3RlZFBsYXllckRhbWFnaW5nLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsZWN0UGxheWVyRGFtYWdpbmdTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgc2VsZWN0ZWRQbGF5ZXJEYW1hZ2luZy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckRhbWFnaW5nU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJEYW1hZ2luZ1NldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNlbGVjdGVkUGxheWVyRGFtYWdpbmcubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHNlbGVjdGVkUGxheWVyRGFtYWdpbmdbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHNlbGVjdGVkUGxheWVyRGFtYWdpbmcgPSBbXTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIERhbWFnaW5nIGluZm9ybWF0aW9uIGNhcmQgZGVjaXNvbiBzZXR1cFxyXG4gIFRvZ2dsZU1haW5TY3JlZW5fRGFtYWdlRGVjaXNpb24oX3N0YXRlKSB7XHJcbiAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5NYWluU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVEaWNlUmVzdWx0U2NyZWVuX0RhbWFnZURlY2lzaW9uKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGljZVJlc3VsdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlQnVzaW5lc3NTY3JlZW5fRGFtYWdlRGVjaXNpb24oX3N0YXRlKSB7XHJcbiAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5CdXNpbmVzc1NlbGVjdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9EYW1hZ2VEZWNpc2lvbihfcGxheWVyRGF0YSwgX090aGVyUGxheWVySW5kZXggPSAwKSB7XHJcbiAgICB0aGlzLlJlc2V0X19EYW1hZ2VEZWNpc2lvbigpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX3BsYXllckRhdGE7XHJcbiAgICBjb25zb2xlLmxvZyhfdGVtcERhdGEpO1xyXG5cclxuICAgIHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LlRpdGxlTGFiZWwuc3RyaW5nID0gXCJCVVNJTkVTU1wiO1xyXG4gICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuQ2FzaExhYmVsLnN0cmluZyA9IF9wbGF5ZXJEYXRhLkNhc2g7XHJcbiAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5EYW1hZ2VCdXNpbmVzc1NlbGVjdC5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX3BsYXllckRhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuRGVjaXNpb25EYW1hZ2luZ1NldHVwLkRhbWFnZUJ1c2luZXNzU2VsZWN0LlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQbGF5ZXJPYmplY3QoX3BsYXllckRhdGEpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBsYXllckluZGV4KF9PdGhlclBsYXllckluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGFtYWdpbmdOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0X19EYW1hZ2VEZWNpc2lvbigpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RhbWFnaW5nTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGFtYWdpbmdOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1c2luZXNzRGFtYWdpbmdOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKF9pc1R1cm5vdmVyID0gZmFsc2UsIF9wbGF5ZXJEYXRhID0gbnVsbCwgX3BsYXllckluZGV4ID0gMCwgX25vQnV0dG9uID0gZmFsc2UpIHtcclxuICAgIGlmIChfbm9CdXR0b24gPT0gZmFsc2UpIHtcclxuICAgICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5EYW1hZ2VCdXNpbmVzc1NlbGVjdC5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkRlY2lzaW9uRGFtYWdpbmdTZXR1cC5EYW1hZ2VCdXNpbmVzc1NlbGVjdC5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGFtYWdlQnVzaW5lc3NTZWxlY3QuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX0RhbWFnZURlY2lzaW9uKF9wbGF5ZXJEYXRhLCBfcGxheWVySW5kZXgpO1xyXG4gIH0sXHJcblxyXG4gIFNldE1lc2FnZVRleHRfRGFtYWdlRGVjaXNpb24oX3R4dCkge1xyXG4gICAgdGhpcy5EZWNpc2lvbkRhbWFnaW5nU2V0dXAuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF90eHQ7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlRGljZVJlc3VsdF9EYW1hZ2VEZWNpc2lvbigpIHtcclxuICAgIHRoaXMuVG9nZ2xlRGljZVJlc3VsdFNjcmVlbl9EYW1hZ2VEZWNpc2lvbih0cnVlKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfZGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgdmFyIF9maW5lTXVsdGlwbGllciA9IDMwMDA7XHJcbiAgICBEYW1hZ2VEZWNpc2lvblJlc3VsdCA9IF9kaWNlUmVzdWx0ICogX2ZpbmVNdWx0aXBsaWVyO1xyXG5cclxuICAgIHZhciBfdGV4dCA9IFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJBbW91bnQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCIgKiBcIiArIF9maW5lTXVsdGlwbGllciArIFwiID0gXCIgKyBEYW1hZ2VEZWNpc2lvblJlc3VsdDtcclxuICAgIHRoaXMuU2V0TWVzYWdlVGV4dF9EYW1hZ2VEZWNpc2lvbihfdGV4dCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0U2VuZGVySURfRGFtYWdlRGVjaXNpb24oSUQpIHtcclxuICAgIFNlbmRlckRhbWFnaW5nSUQgPSBJRDtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfRGFtYWdlRGVjaXNpb24oX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfcmVjaXZlcklEID0gX2RhdGEuSUQ7XHJcbiAgICAgIHZhciBfY2FzaFJlY2VpdmVkID0gX2RhdGEuQ2FzaDtcclxuICAgICAgdmFyIF9pc0RpY2VSb2xsZWQgPSBfZGF0YS5Jc0RpY2VSb2xsZWQ7XHJcbiAgICAgIHZhciBfaXNCYW5rcnVwdGVkID0gX2RhdGEuSXNCYW5rUnVwdGVkO1xyXG5cclxuICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgIGlmIChfbXlBY3Rvci5QbGF5ZXJVSUQgPT0gX3JlY2l2ZXJJRCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0X1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgICBpZiAoX2lzRGljZVJvbGxlZCkge1xyXG4gICAgICAgICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKV0uQ2FzaCArPSBfY2FzaFJlY2VpdmVkO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHJlY2VpdmVkIGNhc2ggb2YgJFwiICsgX2Nhc2hSZWNlaXZlZCArIFwiLCB0b3RhbCBjYXNoIGJlY29tZXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX21hbmFnZXIuR2V0VHVybk51bWJlcigpXS5DYXNoKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWQsIHR1cm4gd2lsbCBjaGFuZ2Ugbm93LlwiKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIGJlZW4gZ2l2ZW4gb3duZXJzaGlwIHRvIG9uZSBvZiB0aGUgYnVzaW5lc3Mgb2Ygb3RoZXIgcGxheWVyLlwiKTtcclxuICAgICAgICAgIF9tYW5hZ2VyLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQYXlBbW91bnRfRGFtYWdlRGVjaXNpb24oKSB7XHJcbiAgICB2YXIgX215QWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IF9teUFjdG9yLlBsYXllclVJRCkge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCA+PSBEYW1hZ2VEZWNpc2lvblJlc3VsdCkge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gRGFtYWdlRGVjaXNpb25SZXN1bHQ7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgICAgIEJhbmtSdXB0ZWRDYXJkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIG9mZiBhbW91bnQgJFwiICsgRGFtYWdlRGVjaXNpb25SZXN1bHQgKyBcIiAsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTtcclxuXHJcbiAgICAgICAgICB2YXIgX3NlbmRpbmdEYXRhID0geyBJRDogU2VuZGVyRGFtYWdpbmdJRCwgQ2FzaDogRGFtYWdlRGVjaXNpb25SZXN1bHQsIElzRGljZVJvbGxlZDogdHJ1ZSwgSXNCYW5rUnVwdGVkOiBmYWxzZSB9O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyNSwgX3NlbmRpbmdEYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgQmFua1J1cHRlZENhcmQgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRCYW5rcnVwdGVkVmFyKF92YWwpXHJcbiAge1xyXG4gICAgQmFua1J1cHRlZENhcmQ9X3ZhbDtcclxuICB9LFxyXG5cclxuICBTZWxlY3RCdXNpbmVzc0ZvckhhbGZPd25lcnNoaXBfRGFtYWdpbmdEZWNpc2lvbihfcGxheWVyRGF0YSwgX2J1c2luZXNzSW5kZXgsIF9zZWxlY3RlZFBsYXllckluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5FeGl0U2NyZWVuX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJzRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvO1xyXG4gICAgdmFyIF9teURhdGFJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIHZhciBfdHVybiA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICBfcGxheWVyc0RhdGFbX215RGF0YUluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXAgPSB0cnVlO1xyXG4gICAgX3BsYXllcnNEYXRhW19teURhdGFJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVySUQgPSBTZW5kZXJEYW1hZ2luZ0lEO1xyXG4gICAgX3BsYXllcnNEYXRhW19teURhdGFJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJzRGF0YVtfdHVybl0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfcGxheWVyc0RhdGFbX215RGF0YUluZGV4XSk7XHJcblxyXG4gICAgdGhpcy5Ub2dnbGVEaWNlUmVzdWx0U2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlKTtcclxuICAgIHRoaXMuVG9nZ2xlTWFpblNjcmVlbl9EYW1hZ2VEZWNpc2lvbihmYWxzZSk7XHJcbiAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBnaXZlbiBvd25lcnNoaXAgb2Ygb25lIG9mIHlvdXIgYnVzaW5lc3MgdG8gb3RoZXIgcGxheWVyLlwiKTtcclxuICAgIHZhciBfc2VuZGluZ0RhdGEgPSB7IElEOiBTZW5kZXJEYW1hZ2luZ0lELCBDYXNoOiBEYW1hZ2VEZWNpc2lvblJlc3VsdCwgSXNEaWNlUm9sbGVkOiBmYWxzZSwgSXNCYW5rUnVwdGVkOiBmYWxzZSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyNSwgX3NlbmRpbmdEYXRhKTtcclxuICB9LFxyXG5cclxuICBHaXZlUGFydG5lclNoaXBfRGFtYWdlRGVjaXNpb24oKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllcnNEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm87XHJcbiAgICB2YXIgX215RGF0YUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG4gICAgdmFyIF9idXNpbmVzc0xlbmd0aCA9IF9wbGF5ZXJzRGF0YVtfbXlEYXRhSW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICB2YXIgX2J1c2luZXNzQ291bnRlciA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9wbGF5ZXJzRGF0YVtfbXlEYXRhSW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9wbGF5ZXJzRGF0YVtfbXlEYXRhSW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgIF9idXNpbmVzc0NvdW50ZXIrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfYnVzaW5lc3NDb3VudGVyID49IF9idXNpbmVzc0xlbmd0aCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIkFsbCBvZiB5b3VyIGV4aXN0aW5nIGJ1c2luZXNzZXMgYXJlIHdpdGggcGFydG5lcnNoaXAgd2l0aCBzb21lb25lLCB5b3UgY2Fubm90IHNlbGVjdCB0aGlzIG9wdGlvbi5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkVuYWJsZUJ1c2luZXNzU2NyZWVuX0RhbWFnZURlY2lzaW9uKGZhbHNlLCBfcGxheWVyc0RhdGFbX215RGF0YUluZGV4XSwgX215RGF0YUluZGV4LCB0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1eSBIYWxmIGJ1c2luZXNzXHJcbiAgVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyhfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5SGFsZkJ1c2luZXNzVUlTZXR1cC5NYWluU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRUaXRsZVRleHRfQnV5SGFsZkJ1c2luZXNzKF90eHQpIHtcclxuICAgIHRoaXMuQnV5SGFsZkJ1c2luZXNzVUlTZXR1cC5UaXRsZUxhYmVsLnN0cmluZyA9IF90eHQ7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFRha2luZyBsb2FuIGZvciBwYXJ0bmVyc2hpcFxyXG4gIFRvZ2dsZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkxvYW5QYXJ0bmVyc2hpcFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9Mb2FuUGFydG5lcnNoaXAoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgY29uc29sZS5sb2coX2FjdG9yc0RhdGEpO1xyXG4gICAgdGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMRUNUIFBMQVlFUlwiO1xyXG4gICAgdGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLkxvYW5QYXJ0bmVyc2hpcFNldHVwLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLkxvYW5QYXJ0bmVyc2hpcFNldHVwLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIHZhciBfbWFpbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgaWYgKF9tb2RlSW5kZXggPT0gMikge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGlzIHNwZWN0YXRlIG9yIG5vdCwgZG9udCBhZGQgYW55IHNwZWN0YXRlc1xyXG4gICAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuTG9hblBhcnRuZXJzaGlwU2V0dXAuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBfbWFpbkRhdGEubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICBpZiAoX21haW5EYXRhW2tdLlBsYXllclVJRCA9PSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJJbmRleChrKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBMYW9uUGFydG5lcnNoaXBBcnJheS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfYWN0b3JzRGF0YSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9teURhdGEpO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIExhb25QYXJ0bmVyc2hpcEFycmF5LnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuTG9hblBhcnRuZXJzaGlwU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5Mb2FuUGFydG5lcnNoaXBTZXR1cC5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuTG9hblBhcnRuZXJzaGlwU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkxvYW5QYXJ0bmVyc2hpcFNldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX0xvYW5QYXJ0bmVyc2hpcCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBMYW9uUGFydG5lcnNoaXBBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgTGFvblBhcnRuZXJzaGlwQXJyYXlbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIExhb25QYXJ0bmVyc2hpcEFycmF5ID0gW107XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuICBcclxuICAvLyNyZWdpb24gU2VsbCBhbGwgYnVzaW5lc3MgZXhjZXB0IG9uZVxyXG5cclxuICBUb2dnbGVTY3JlZW5fU2VsbEFsbEJ1c2luZXNzKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNjcmVlbl9fU2VsbEFsbEJ1c2luZXNzKF9pc1R1cm5vdmVyID0gZmFsc2UsIF9wbGF5ZXJEYXRhID0gbnVsbCwgX3BsYXllckluZGV4ID0gMCkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEFsbEJ1c2luZXNzU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQWxsQnVzaW5lc3NTZXR1cC5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEFsbEJ1c2luZXNzU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxBbGxCdXNpbmVzc1NldHVwLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1NlbGxBbGxCdXNpbmVzcyh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQWxsQnVzaW5lc3MoX3BsYXllckRhdGEsIF9wbGF5ZXJJbmRleCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9TZWxsQWxsQnVzaW5lc3MoX3BsYXllckRhdGEsIF9PdGhlclBsYXllckluZGV4ID0gMCkge1xyXG4gICAgdGhpcy5SZXNldFNwYWNlU2NyZWVuX1NlbGxBbGxCdXNpbmVzcygpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX3BsYXllckRhdGE7XHJcbiAgICBjb25zb2xlLmxvZyhfdGVtcERhdGEpO1xyXG5cclxuICAgIHRoaXMuU2VsbEFsbEJ1c2luZXNzU2V0dXAuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVU0lORVNTXCI7XHJcbiAgICB0aGlzLlNlbGxBbGxCdXNpbmVzc1NldHVwLkNhc2hMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLlNlbGxBbGxCdXNpbmVzc1NldHVwLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGxBbGxCdXNpbmVzc1NldHVwLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPSBcIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArIF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQWxsQnVzaW5lc3NTZXR1cC5CdXNpbmVzc1ByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQWxsQnVzaW5lc3NTZXR1cC5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGxheWVyT2JqZWN0KF9wbGF5ZXJEYXRhKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQbGF5ZXJJbmRleChfT3RoZXJQbGF5ZXJJbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBTZWxsQWxsQnVzaW5lc3NBcnJheS5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3BhY2VTY3JlZW5fU2VsbEFsbEJ1c2luZXNzKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlbGxBbGxCdXNpbmVzc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBTZWxsQWxsQnVzaW5lc3NBcnJheVtpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgU2VsbEFsbEJ1c2luZXNzQXJyYXkgPSBbXTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG4gIFxyXG4gIC8vI3JlZ2lvbiBTZWxlY3QgUGxheWVyIHRvIGNvbXBhcmUgZGljZSByb2xsXHJcbiAgICBUb2dnbGVTY3JlZW5fQ29tcGFyZURpY2UoX3N0YXRlKSB7XHJcbiAgICAgIHRoaXMuQ29tcGFyZURpY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gICAgfSxcclxuICBcclxuICAgIFNldFVwU3BhY2VTY3JlZW5fQ29tcGFyZURpY2UoX215RGF0YSwgX2FjdG9yc0RhdGEsIF9pc1R1cm5PdmVyLCBfbW9kZUluZGV4ID0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhfYWN0b3JzRGF0YSk7XHJcbiAgICAgIHRoaXMuQ29tcGFyZURpY2VTZXR1cC5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMRUNUIFBMQVlFUlwiO1xyXG4gICAgICB0aGlzLkNvbXBhcmVEaWNlU2V0dXAuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgICB0aGlzLkNvbXBhcmVEaWNlU2V0dXAuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgICAgdGhpcy5Db21wYXJlRGljZVNldHVwLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9IFwiTm8gb2YgUGxheWVyczogXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gIFxyXG4gICAgICB2YXIgX21haW5EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG4gIFxyXG4gICAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuQ29tcGFyZURpY2VTZXR1cC5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuQ29tcGFyZURpY2VTZXR1cC5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICBcclxuICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IF9tYWluRGF0YS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9tYWluRGF0YVtrXS5QbGF5ZXJVSUQgPT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJJbmRleChrKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIENvbXBhcmVEaWNlQXJyYXkucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgICAvL2ZvciBib3RcclxuICBcclxuICAgICAgICBjb25zb2xlLmxvZyhfYWN0b3JzRGF0YSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX215RGF0YSk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkNvbXBhcmVEaWNlU2V0dXAuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5Db21wYXJlRGljZVNldHVwLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgQ29tcGFyZURpY2VBcnJheS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIFxyXG4gICAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgICB0aGlzLkNvbXBhcmVEaWNlU2V0dXAuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNvbXBhcmVEaWNlU2V0dXAuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Db21wYXJlRGljZVNldHVwLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkNvbXBhcmVEaWNlU2V0dXAuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIFxyXG4gICAgUmVzZXRTcGFjZVNjcmVlbl9Db21wYXJlRGljZSgpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IENvbXBhcmVEaWNlQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgQ29tcGFyZURpY2VBcnJheVtpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICB9XHJcbiAgICAgIENvbXBhcmVEaWNlQXJyYXkgPSBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlRGVjc2lvbjAxU2NyZWVuX0NvbXBhcmVEaWNlKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5Db21wYXJlRGljZURlY2lzaW9uMVNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLkNvbXBhcmVEaWNlRGVjaXNpb24yU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZVRpdGxlX0RlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShfbXNnKVxyXG4gICAge1xyXG4gICAgICB0aGlzLkNvbXBhcmVEaWNlRGVjaXNpb24yVGV4dC5zdHJpbmc9X21zZztcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlRGVjc2lvbjAyU2NyZWVuQnV0dG9uX0NvbXBhcmVEaWNlKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5Db21wYXJlRGljZURlY2lzaW9uMkJ1dHRvbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gTmFtaW5nIGdhbWUgY29tcGl0YXRvcnNcclxuXHJcbiAgVG9nZ2xlU2NyZWVuX0NvbXBpdGF0b3JVSShfc3RhdGUpXHJcbiAge1xyXG4gICAgdGhpcy5Db21waXRhdG9yU2V0dXBVSS5NYWluU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB0aGlzLkNvbXBpdGF0b3JTZXR1cFVJLkNvbXBFZGl0Qm94MS5zdHJpbmc9XCJcIjtcclxuICAgIHRoaXMuQ29tcGl0YXRvclNldHVwVUkuQ29tcEVkaXRCb3gyLnN0cmluZz1cIlwiO1xyXG4gICAgdGhpcy5Db21waXRhdG9yU2V0dXBVSS5Db21wRWRpdEJveDMuc3RyaW5nPVwiXCI7XHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlVGl0bGVfQ29tcGl0YXRvclVJKF9tc2cpXHJcbiAge1xyXG4gICAgdGhpcy5Db21waXRhdG9yU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1fbXNnO1xyXG4gIH0sXHJcblxyXG4gIE9uRG9uZUNsaWNrZWRfQ29tcGl0YXRvclVJKClcclxuICB7XHJcbiAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIHRleHQxPXRoaXMuQ29tcGl0YXRvclNldHVwVUkuQ29tcEVkaXRCb3gxLnN0cmluZztcclxuICAgIHZhciB0ZXh0Mj10aGlzLkNvbXBpdGF0b3JTZXR1cFVJLkNvbXBFZGl0Qm94Mi5zdHJpbmc7XHJcbiAgICB2YXIgdGV4dDM9dGhpcy5Db21waXRhdG9yU2V0dXBVSS5Db21wRWRpdEJveDMuc3RyaW5nO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleD1fbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX21hcmtldGluZ0Ftb3VudD1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuXHJcbiAgICB2YXIgVGV4dEFycmF5PVt0ZXh0MSx0ZXh0Mix0ZXh0M107XHJcblxyXG4gICAgdmFyIF9jaGVja0NvdW50ZXI9MDtcclxuICAgIHZhciBfdGVtcENvdW50ZXI9MDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSAmJiBfcGxheWVySW5kZXghPWluZGV4KVxyXG4gICAgICAgIF9jaGVja0NvdW50ZXIrKztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgVGV4dEFycmF5Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgaWYoVGV4dEFycmF5W2pdLnRvTG93ZXJDYXNlKCk9PV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lLnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgX3RlbXBDb3VudGVyKys7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZihfdGVtcENvdW50ZXI+PV9jaGVja0NvdW50ZXIgJiYgX3RlbXBDb3VudGVyIT0wICYmIF9jaGVja0NvdW50ZXIhPTApXHJcbiAgICB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91IGZyZWFraW4gd29uXCIpO1xyXG4gICAgICB2YXIgcHJvZml0PV9tYXJrZXRpbmdBbW91bnQrKF9tYXJrZXRpbmdBbW91bnQqNSk7XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9cHJvZml0O1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSB3ZXJlIHN1Y2Nlc3NmdWwgYW5kIHJlY2VpdmVkIDUwMCUgcHJvZml0IG9uIHlvdXIgbWFya2V0aW5nIGFtb3VudCwgeW91ciBjYXNoIGJlY29tZXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBmYWlsZWQgYW5kIGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuRXhpdEFsb25nVHVybk92ZXJfQ29tcGl0YXRvclVJKCk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfQ29tcGl0YXRvclVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fQ29tcGl0YXRvclVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBDcmVhdGluZyBBZCBkZXNjcmlwdGlvbiBmb3IgZXZlcnlvbmUgdG8gdm90ZVxyXG4gIFRvZ2dsZVNjcmVlbl9UZWxldmlzaW9uQURTZXR1cChfc3RhdGUpXHJcbiAge1xyXG4gICAgdGhpcy5UZWxldmlzaW9uQURTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIHRoaXMuVGVsZXZpc2lvbkFEU2V0dXBVSS5NYWluRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICB9LFxyXG4gIFxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKF9zdGF0ZSlcclxuICB7XHJcbiAgICB0aGlzLlRlbGV2aXNpb25BRFNldHVwVUkuRGVjaXNpb25TY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBDaGFuZ2VEZWNpc2lvblNjcmVlblRleHRfVGVsZXZpc2lvbkFEU2V0dXAoX3R4dClcclxuICB7XHJcbiAgICB0aGlzLlRlbGV2aXNpb25BRFNldHVwVUkuRGVjaXNpb25TY3JlZW5UZXh0LnN0cmluZz1fdHh0O1xyXG4gIH0sXHJcblxyXG4gIE9uRG9uZUNsaWNrZWRfVGVsZXZpc2lvbkFEU2V0dXAoKVxyXG4gIHtcclxuICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4PV9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciB0ZXh0MT10aGlzLlRlbGV2aXNpb25BRFNldHVwVUkuTWFpbkVkaXRCb3guc3RyaW5nO1xyXG4gICAgdmFyIF9tYXJrZXRpbmdBbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICBjbGVhclRpbWVvdXQoVGVsZXZpc2lvbkFkVGltZW91dCk7XHJcblxyXG4gICAgaWYodGV4dDE9PVwiXCIpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGRlc2NyaXB0aW9uIGZvciB5b3VyIGNvbW1lcmNpYWwuXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICB2YXIgX3NlbnRkYXRhID0geyBQbGF5ZXI6IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0sRGVzY3JpcHRpb246dGV4dDF9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDI5LCBfc2VudGRhdGEpOyBcclxuICAgICAgVm90ZXNVcEFycmF5PVtdO1xyXG4gICAgICBWb3Rlc0Rvd25BcnJheT1bXTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcblxyXG4gICAgICBUZWxldmlzaW9uQWRUaW1lb3V0PXNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuRmFpbGVkU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKCk7XHJcbiAgICAgIH0sIDI1MDAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBGYWlsZWRTY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAoKVxyXG4gIHtcclxuICAgIGNsZWFyVGltZW91dChUZWxldmlzaW9uQWRUaW1lb3V0KTtcclxuICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4PV9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHRoaXMuU2hvd1RvYXN0KFwiRWl0aGVyIHRpbWUgaGFzIGJlZW4gcGFzc2VkIGZvciB2b3Rpbmcgb3IgeW91IGhhdmUgZmFpbGVkIHRvIGxlYXZlIHBvc2l0aXZlIGltcHJlc3Npb24gb24gb3RoZXJzLCB5b3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFjY291bnQuXCIpO1xyXG4gICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ9MDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgdGhpcy5FeGl0QWxvbmdUdXJuT3Zlcl9UZWxldmlzaW9uQURTZXR1cCgpO1xyXG5cclxuICB9LFxyXG5cclxuICBTdWNjZXNzU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKClcclxuICB7XHJcbiAgICBjbGVhclRpbWVvdXQoVGVsZXZpc2lvbkFkVGltZW91dCk7XHJcbiAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleD1fbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX21hcmtldGluZ0Ftb3VudD1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuXHJcbiAgICB2YXIgcHJvZml0PV9tYXJrZXRpbmdBbW91bnQrKF9tYXJrZXRpbmdBbW91bnQqNik7XHJcbiAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz1wcm9maXQ7XHJcblxyXG4gICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZWVkIHB1dHRpbmcgcG9zaXRpdmUgaW1wcmVzc2lvbiwgeW91IGhhdmUgcmVjZWl2ZWQgNjAwJSBwcm9maXQgb2YgeW91ciBtYXJrZXRpbmcgYW1vdW50LCB5b3VyIGNhc2ggYmVjb21lcyAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgIHRoaXMuRXhpdEFsb25nVHVybk92ZXJfVGVsZXZpc2lvbkFEU2V0dXAoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfVGVsZXZpc2lvbkFEU2V0dXAoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9UZWxldmlzaW9uQURTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9UZWxldmlzaW9uQURTZXR1cChfZGF0YSlcclxuICB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgIFxyXG4gICAgICBjbGVhclRpbWVvdXQoVm90ZVRpbWVvdXQpOyAgXHJcbiAgICAgIHZhciBfc2VuZGVyUGxheWVyRGF0YT1fZGF0YS5QbGF5ZXI7XHJcbiAgICAgIHZhciBfZGVzPV9kYXRhLkRlc2NyaXB0aW9uO1xyXG4gICAgICBTZW5kZXJBRFBQbGF5ZXI9X3NlbmRlclBsYXllckRhdGE7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKHRydWUpO1xyXG4gICAgICB0aGlzLkNoYW5nZURlY2lzaW9uU2NyZWVuVGV4dF9UZWxldmlzaW9uQURTZXR1cChfZGVzKTtcclxuXHJcbiAgICAgIFZvdGVUaW1lb3V0PXNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAoZmFsc2UpO1xyXG4gICAgICB9LCAyNDAwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVm90ZVVwRGVjaXNpb25fVGVsZXZpc2lvbkFEU2V0dXAoKVxyXG4gIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFZvdGVUaW1lb3V0KTtcclxuICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fVGVsZXZpc2lvbkFEU2V0dXAoZmFsc2UpO1xyXG4gICAgICB2YXIgX3NlbnRkYXRhID0geyBTZW5kZXJJRDogX215QWN0b3IuUGxheWVyVUlELFJlY2l2ZXJJRDpTZW5kZXJBRFBQbGF5ZXIuUGxheWVyVUlELFZvdGVVcDp0cnVlfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgzMCwgX3NlbnRkYXRhKTsgXHJcbiAgfSxcclxuXHJcbiAgVm90ZURvd25EZWNpc2lvbl9UZWxldmlzaW9uQURTZXR1cCgpXHJcbiAge1xyXG4gICAgICBjbGVhclRpbWVvdXQoVm90ZVRpbWVvdXQpOyAgXHJcbiAgICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1RlbGV2aXNpb25BRFNldHVwKGZhbHNlKTtcclxuICAgICAgdmFyIF9zZW50ZGF0YSA9IHsgU2VuZGVySUQ6IF9teUFjdG9yLlBsYXllclVJRCxSZWNpdmVySUQ6U2VuZGVyQURQUGxheWVyLlBsYXllclVJRCxWb3RlVXA6ZmFsc2V9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDMwLCBfc2VudGRhdGEpOyBcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfVm90ZVRlbGV2aXNpb25BRFNldHVwKF9kYXRhKVxyXG4gIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX215QWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgdmFyIF9teUlEPV9kYXRhLlJlY2l2ZXJJRDtcclxuICAgICAgdmFyIF9vdGhlcklEPV9kYXRhLlNlbmRlcklEO1xyXG4gICAgICB2YXIgX3ZvdGVVcD1fZGF0YS5Wb3RlVXA7XHJcbiAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXg9X21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX3RvdGFsUGxheWVyPTA7XHJcbiAgICAgIFxyXG4gICAgICBpZihfbXlBY3Rvci5QbGF5ZXJVSUQ9PV9teUlEKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYoX3ZvdGVVcClcclxuICAgICAgICAgIFZvdGVzVXBBcnJheS5wdXNoKF9vdGhlcklEKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICBWb3Rlc0Rvd25BcnJheS5wdXNoKF9vdGhlcklEKTtcclxuXHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXg8X21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgJiYgaW5kZXghPV9wbGF5ZXJJbmRleClcclxuICAgICAgICAgICAgX3RvdGFsUGxheWVyKys7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9SZWNpZXZlZFZvdGVzPVZvdGVzVXBBcnJheS5sZW5ndGgrVm90ZXNEb3duQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhfUmVjaWV2ZWRWb3Rlcyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coVm90ZXNVcEFycmF5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhWb3Rlc0Rvd25BcnJheSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX3RvdGFsUGxheWVyKTtcclxuXHJcbiAgICAgICAgaWYoX1JlY2lldmVkVm90ZXMgPj1fdG90YWxQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYoVm90ZXNVcEFycmF5Lmxlbmd0aD5Wb3Rlc0Rvd25BcnJheS5sZW5ndGgpXHJcbiAgICAgICAgICAgIHRoaXMuU3VjY2Vzc1NjcmVlbl9UZWxldmlzaW9uQURTZXR1cCgpO1xyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLkZhaWxlZFNjcmVlbl9UZWxldmlzaW9uQURTZXR1cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtZXNzYWdlLCB0aW1lID0gU2hvcnRNZXNzYWdlVGltZSwgX2hhc2J1dHRvbiA9IHRydWUpIHtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Qb3BVcFVJTGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90IG1vZGUgb25seVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aCA+IDAgJiYgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLklzQm90KSB7XHJcbiAgICAgICAgLy8gaWYgKF9oYXNidXR0b24pIHtcclxuICAgICAgICAvLyAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIC8vICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICAvLyAgIH0sIENvbXBsZXRpb25XaW5kb3dUaW1lKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfaGFzYnV0dG9uKSB7XHJcbiAgICAgICAgICB0aGlzLlBvcFVwVUlCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVRvYXN0KCk7XHJcbiAgICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoX2hhc2J1dHRvbikge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSUJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICBUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVG9hc3QoKTtcclxuICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDb21wbGV0ZVRvYXN0KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZSB0b2FzdCBjYWxsZWRcIik7XHJcbiAgICAgIGlmKHRoaXMuUG9wVXBVSSlcclxuICAgICAgICB0aGlzLlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBcclxuICAgIH1cclxuICAgXHJcbiAgfSxcclxuXHJcbiAgU2hvd1Jlc3VsdFNjcmVlbjogZnVuY3Rpb24gKF9zdGF0dXMsIF9kYXRhKSB7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuUmVzdWx0U2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlJlc3VsdFNldHVwVUkuU3RhdHVzTGFiZWwuc3RyaW5nID0gX3N0YXR1cztcclxuICAgIHRoaXMuUmVzdWx0U2V0dXBVSS5Cb2R5TGFiZWwuc3RyaW5nID0gX2RhdGE7XHJcbiAgfSxcclxuXHJcbiAgUmVzdGFydFRoZUdhbWUoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc3RhcnRHYW1lKCk7XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudFRvU3luY0luZm8oX2RhdGFJbmZvLF90b1BsYXllclVJRD1cIlwiKSB7XHJcbiAgICB2YXIgX21vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICB2YXIgX2RhdGEgPSB7IGluZm86IF9kYXRhSW5mbywgUGxheWVyVUlEOl90b1BsYXllclVJRCB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE1LCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IHsgaW5mbzogX2RhdGFJbmZvLFBsYXllclVJRDogX3RvUGxheWVyVUlEIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNSwgX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==