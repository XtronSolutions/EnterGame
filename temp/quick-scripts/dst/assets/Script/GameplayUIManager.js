
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
var oneQuestionNodes = []; //-------------------------------------------enumeration for amount of loan-------------------------//

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
    PopUpUI: {
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
    }
  },
  onLoad: function onLoad() {
    this.CheckReferences(); //local variables

    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
    this.IsBotTurn = false;
    this.IsBankrupted = false;
    this.BankruptedAmount = 0;
  },
  ResetTurnVariable: function ResetTurnVariable() {
    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
    if (!GameManager || GameManager == null) GameManager = require('GameManager');
  },
  onEnable: function onEnable() {
    //events subscription to be called 
    cc.systemEvent.on('SyncData', this.SyncData, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off('SyncData', this.SyncData, this);
  },
  //#region Spectate UI Setup
  InitialScreen_SpectateMode: function InitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = true;
  },
  CloseInitialScreen_SpectateMode: function CloseInitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = false;
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
      cc.director.loadScene("Splash");
    }, 500);
  },
  //#endregion
  //#region BusinessSetup with loan
  //Business setup ui//------------------------
  StartNewBusiness_BusinessSetup: function StartNewBusiness_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted, _BankruptAmount) {
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

    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;
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
    PlayerBusinessDataIntance = new GameManager.BusinessInfo();

    if (isFirstTime) {
      this.BusinessSetupData.ExitButtonNode.active = false;
      this.BusinessSetupData.TimerNode.active = true;
      PlayerDataIntance.Cash = 20000;
    }

    this.ResetButtonStates_BusinessSetup();

    if (insideGame) {
      this.BusinessSetupData.ExitButtonNode.active = true;
      this.BusinessSetupData.TimerNode.active = false;

      for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length; index++) {
        if (GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID == GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID) {
          InsideGameBusinessSetup = index;
          PlayerDataIntance = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index];
          this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerName);
          this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID);
          this.OnChangeCash_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].Cash);
        }
      }
    } else {
      InsideGameBusinessSetup = -1;
      this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name);
      this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);
      this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
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
  OnBusinessTypeTextChanged_BusinessSetup: function OnBusinessTypeTextChanged_BusinessSetup(name) {
    this.BusinessSetupData.BusinessTypeTextUI = name;
    PlayerBusinessDataIntance.BusinessTypeDescription = name;
  },
  OnBusinessNameTextChanged_BusinessSetup: function OnBusinessNameTextChanged_BusinessSetup(name) {
    this.BusinessSetupData.BusinessNameTextUI = name;
    PlayerBusinessDataIntance.BusinessName = name;
  },
  ResetButtonStates_BusinessSetup: function ResetButtonStates_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[0].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[0].active = false;
    this.BusinessSetupData.BusinessTypeLabel.string = "";
    this.BusinessSetupData.BusinessNameLabel.string = "";
    this.BusinessSetupData.BusinessNameTextUI = "";
    this.BusinessSetupData.BusinessTypeTextUI = "";
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.none;
  },
  OnHomeBasedSelected_BusinessSetup: function OnHomeBasedSelected_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[0].active = true;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[0].active = false;
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.HomeBased;
  },
  OnBrickMortarSelected_BusinessSetup: function OnBrickMortarSelected_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[0].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[0].active = true;
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.brickAndmortar;
  },
  OnChangeCash_BusinessSetup: function OnChangeCash_BusinessSetup(amount) {
    this.BusinessSetupData.PlayerCashUI.string = "$" + amount;
    PlayerDataIntance.Cash = amount;
  },
  CalculateLoan_BusinessSetup: function CalculateLoan_BusinessSetup(amount) {
    var _loanTaken = false;
    var _businessIndex = 0;

    for (var index = 0; index < PlayerDataIntance.NoOfBusiness.length; index++) {
      if (PlayerDataIntance.NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    if (_loanTaken) {
      this.ShowToast("You have already taken loan of $" + PlayerDataIntance.NoOfBusiness[_businessIndex].LoanAmount);
    } else {
      if (PlayerDataIntance.Cash >= amount) {
        this.ShowToast("You do not need loan, you have enough cash to buy current selected business.");
      } else {
        this.BusinessSetupData.LoanSetupNode.active = true;
        RequiredCash = Math.abs(parseInt(PlayerDataIntance.Cash) - amount);
        this.BusinessSetupData.LoanAmountLabel[0].children[1].children[0].getComponent(cc.Label).string = "$" + RequiredCash;
      }
    }
  },
  OnLoanButtonClicked_BusinessSetup: function OnLoanButtonClicked_BusinessSetup(event) {
    if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.brickAndmortar) {
      this.CalculateLoan_BusinessSetup(50000);
    } else if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.HomeBased) {
      this.CalculateLoan_BusinessSetup(10000);
    } else {
      this.ShowToast("please select business between Home Based and brick & mortar. ");
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
  SyncData: function SyncData(_data, _ID) {
    if (_ID != GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().actorNr) GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(_data);
    console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo);

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
    if (PlayerDataIntance.Cash < _amount) {
      this.ShowToast("You have not enough cash to buy this " + _businessName + " business.");
    } else {
      if (_isHomeBased) {
        if (PlayerDataIntance.HomeBasedAmount < 3) {
          PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
          this.BusinessSetupData.PlayerCashUI.string = "$" + PlayerDataIntance.Cash;
          this.StartGame = true;
          PlayerDataIntance.HomeBasedAmount++;
        } else {
          this.StartGame = false;
          this.ShowToast("You cannot own more than three Home based businesses");
        }
      } else {
        PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
        this.BusinessSetupData.PlayerCashUI.string = "$" + PlayerDataIntance.Cash;
        this.StartGame = true;
        PlayerDataIntance.BrickAndMortarAmount++;
      }
    }
  },
  Exit_BusinessSetup: function Exit_BusinessSetup() {
    this.BusinessSetupNode.active = false;

    if (PlayerBusinessDataIntance.LoanTaken) {
      PlayerBusinessDataIntance.LoanTaken = false;
      PlayerDataIntance.Cash = PlayerDataIntance.Cash - PlayerBusinessDataIntance.LoanAmount;
      PlayerBusinessDataIntance.LoanAmount = 0;
      this.ShowToast("Reverting back loan amount.", 500);
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

    if (_mode == 2) //for real players
      {
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
      } else if (_mode == 1) //for AI
      {
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
    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[InsideGameBusinessSetup] = PlayerDataIntance;
    this.BusinessSetupNode.active = false;
    InsideGameBusinessSetup = -1;
    this.ToggleDecision_TurnDecision(true);
  },
  PayAmountToPlayGame: function PayAmountToPlayGame() {
    this.StartGame = false;
    if (PlayerBusinessDataIntance.BusinessTypeDescription == "") this.ShowToast("please write a business type.");else if (PlayerBusinessDataIntance.BusinessName == "") this.ShowToast("please write a business name.");else {
      if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.HomeBased) //if selected business is homebassed
        this.PurchaseBusiness(10000, "home", true);else if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.brickAndmortar) //if selected business is brick and mortar
        this.PurchaseBusiness(50000, "brick and mortar", false);

      if (this.StartGame == true || this.IsBankrupted == true) {
        PlayerDataIntance.NoOfBusiness.push(PlayerBusinessDataIntance);
        if (InsideGameBusinessSetup != -1) //if start new business has not been called from inside game
          this.StartNewSetup_DuringGame_BusinessSetup();else //if start new business has been called at start of game as initial setup
          this.InitialSetup_BusinessSetup(); //prtinting all values to console

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
        this.ShowToast("you successfully marketed amount of $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount + " , remaining cash is $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + ".");
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
        this.ShowToast("you have successfully hired a lawyer, remaining cash is $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + ".");
        this.UpdateCash_TurnDecision();
      } else {
        this.ShowToast("sorry, you dont have enough money to hire a lawyer.");
      }
    }
  },
  onLocationNameChanged_ExpandBusiness_TurnDecision: function onLocationNameChanged_ExpandBusiness_TurnDecision(_name) {
    LocationName = _name;
  },
  OnExpandButtonClicked_TurnDecision: function OnExpandButtonClicked_TurnDecision() {
    var _this2 = this;

    //if player has brick and mortar business he could expand it
    console.log("expand business");
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = true;
    var generatedLength = GamePlayReferenceManager.Instance.Get_GameManager().GenerateExpandBusiness_Prefabs_TurnDecision();

    if (generatedLength == 0) {
      this.ShowToast("You have no brick and mortar business to expand.", 1500);
      setTimeout(function () {
        _this2.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
      }, 1600);
    }
  },
  OnExpandButtonExitClicked_TurnDecision: function OnExpandButtonExitClicked_TurnDecision() {
    this.UpdateCash_TurnDecision();
    this.CheckReferences();
    LocationName = "";
    console.log("expand business exit called");
    GamePlayReferenceManager.Instance.Get_GameManager().DestroyGeneratedNodes();
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
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
      this.ShowToast("You can invest in gold one time during turn.", 800);
    }
  },
  OnStockBusinessNameChanged_TurnDecision: function OnStockBusinessNameChanged_TurnDecision(name) {
    StockBusinessName = name;
  },
  OnStockDiceClicked_TurnDecision: function OnStockDiceClicked_TurnDecision() {
    if (!this.StockInvested) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (StockBusinessName == "") {
        this.ResetStockBusinessNameInput();
        this.ShowToast("Please enter a business name to invest.");
      } else {
        this.StockInvested = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.StockInvest;
        DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        OnceOrShare = DiceResult * 1000;
        this.AssignData_InvestSell("Invest in Stock", DiceResult, "Each Share of stock price is:", OnceOrShare + "/share", "Enter the number of shares of stock you want to BUY", "Total Buying Amount:", OnceOrShare + "*0=0", "BUY", this.InvestSellSetupUI.InvestState);
      }
    } else {
      this.ShowToast("You can invest in stocks one time during turn.", 800);
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
      this.ShowToast("You can sell gold one time during turn.", 800);
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
      this.ShowToast("You can sell stocks one time during turn.", 800);
    }
  },
  OnPartnershipClicked_TurnDecision: function OnPartnershipClicked_TurnDecision() {
    console.log("go into partner ship");
    this.ShowToast("work in progress, coming soon...");
  },
  OnRollDiceClicked_TurnDecision: function OnRollDiceClicked_TurnDecision() {
    console.log("roll the dice");
    this.ToggleDecision_TurnDecision(false);
    GamePlayReferenceManager.Instance.Get_GameManager().RollDice();
  },
  PrintDiceValue_TurnDecision: function PrintDiceValue_TurnDecision(value) {//this.TempDiceText.string=value;
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

      if (this.InvestSellSetupUI.InvestState == InvestEnum.GoldInvest) {
        var _amount = parseInt(EnterBuySellAmount);

        var _TotalAmount = OnceOrShare * _amount;

        if (_TotalAmount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount + _amount;
          this.ShowToast("You have successfully bought " + _amount + " ounces of GOLD", 1400);
          setTimeout(function () {
            _this3.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
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

          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount - _amount;
          this.ShowToast("You have successfully sold " + _amount + " ounces of GOLD for  $" + _TotalAmount, 1400);
          setTimeout(function () {
            _this3.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("you don't have enough GOLD ounces, you own " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount + " of GOLD ounces");
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.StockInvest) {
        var _amount = parseInt(EnterBuySellAmount);

        var _TotalAmount = OnceOrShare * _amount;

        if (_TotalAmount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount + _amount; //can add multiple stocks with business name in object if required

          this.ShowToast("You have successfully bought " + _amount + " shares of business " + StockBusinessName, 1400);
          setTimeout(function () {
            _this3.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
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

          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount - _amount;
          this.ShowToast("You have successfully sold " + _amount + " shares of stock for  $" + _TotalAmount, 1400);
          setTimeout(function () {
            _this3.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("you don't have enough stocks shares, you own " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount + " of stock shares");
        }
      }
    }
  },
  ExitButton_InvestSell: function ExitButton_InvestSell() {
    this.ToggleInvestSellScreen_InvestSell(false);
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
  AssignData_PayDay: function AssignData_PayDay(_title, _isDoublePayDay, _skipHM, _skipBM, _isBot) {
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

    this.IsBotTurn = _isBot;
    DoublePayDay = _isDoublePayDay;
    this.TogglePayDayScreen_PayDay(true);
    this.PayDaySetupUI.TitleLabel.string = _title;
    var _time = 1800;

    if (_isBot == false) {
      //check skip payday variables
      if (_skipHM && _skipBM) this.ShowToast("your payday on home based and brick & mortar businessess will be skipped.", _time);else if (_skipHM) this.ShowToast("your payday on home based businessess will be skipped.", _time);else if (_skipBM) this.ShowToast("your payday on brick & mortar businessess will be skipped.", _time);
    } else {
      //check skip payday variables
      if (_skipHM && _skipBM) console.log("your payday on home based and brick & mortar businessess will be skipped.");else if (_skipHM) console.log("your payday on home based businessess will be skipped.");else if (_skipBM) console.log("your payday on brick & mortar businessess will be skipped.");
    }

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);

    var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

    var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

    var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

    var _loanTaken = false;
    var _businessIndex = 0;

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    var loanTaken = _loanTaken;
    this.PayDaySetupUI.HomeBasedNumberLabel.string = HMAmount;
    this.PayDaySetupUI.BMNumberLabel.string = BMAmount;
    this.PayDaySetupUI.BMNumberLocationLabel.string = BMLocations;

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
      this.OnHomeBasedPaymentClicked_PayDay();
      this.OnBMPaymentClicked_PayDay();
      this.OnLoanPaymentClicked_PayDay();
    }
  },
  OnHomeBasedPaymentClicked_PayDay: function OnHomeBasedPaymentClicked_PayDay() {
    if (!HomeBasedPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);
      if (!DoublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      HomeBasedPaymentCompleted = true;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = false;

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollOneDice();

      if (!DoublePayDay) TotalPayDayAmount = HMAmount * _dice * 1000;else TotalPayDayAmount = 2 * (HMAmount * _dice) * 1000;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;
      if (!DoublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + HMAmount + "*" + "1000=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + HMAmount + "*" + "1000*2=" + TotalPayDayAmount;

      if (this.IsBotTurn) {
        this.ReceivePayment_PayDay();
      }
    }
  },
  OnBMPaymentClicked_PayDay: function OnBMPaymentClicked_PayDay() //brick and mortar
  {
    if (!BrickMortarPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);
      if (!DoublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      BrickMortarPaymentCompleted = true;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = false;

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

      var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

      var _amount = BMAmount + BMLocations;

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();

      if (!DoublePayDay) TotalPayDayAmount = _amount * _dice * 2000;else TotalPayDayAmount = 2 * (_amount * _dice) * 2000;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;
      if (!DoublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + _amount + "*" + "2000=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + _amount + "*" + "2000*2=" + TotalPayDayAmount;

      if (this.IsBotTurn) {
        this.ReceivePayment_PayDay();
      }
    }
  },
  OnLoanPaymentClicked_PayDay: function OnLoanPaymentClicked_PayDay() //brick and mortar
  {
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
  ReceivePayment_PayDay: function ReceivePayment_PayDay() //all
  {
    var _this5 = this;

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + TotalPayDayAmount;
    this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);

    if (!this.IsBotTurn) {
      this.ShowToast("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash, 1500);
      setTimeout(function () {
        _this5.ToggleResultPanelScreen_PayDay(false);

        _this5.PayDayCompleted();
      }, 1550);
    } else {
      console.log("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
      this.ToggleResultPanelScreen_PayDay(false);
      this.PayDayCompleted();
    }
  },
  SkipLoanOneTime_PayDay: function SkipLoanOneTime_PayDay() {
    this.ShowToast("You have skipped the loan payment, bank will call upon complete loan amount on next payday", 2000);

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
  StartNewGame_PayDay: function StartNewGame_PayDay() //if bankrupted you can start new game
  {
    var _this6 = this;

    this.ShowToast("You will lose all progress and start new game from the start.", 3000);
    setTimeout(function () {
      _this6.ExitLoanScreen_PayDay();

      _this6.TogglePayDayScreen_PayDay(false);

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
  PayDayCompleted: function PayDayCompleted() {
    if (HomeBasedPaymentCompleted && BrickMortarPaymentCompleted && LoanPayed) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      console.log("all payday done");
      this.TogglePayDayScreen_PayDay(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
      GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false, false);
      GamePlayReferenceManager.Instance.Get_GameManager().callUponCard();
    }
  },
  //#endregion
  //#region Sell Business UI
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
      node.getComponent('BusinessDetail').CheckReferences();
      node.getComponent('BusinessDetail').SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent('BusinessDetail').SetBusinessIndex(index);

      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) {
        node.getComponent('BusinessDetail').SetBusinessMode(1);
        node.getComponent('BusinessDetail').SetMode("Home Based");
      } else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) {
        node.getComponent('BusinessDetail').SetBusinessMode(2);
        node.getComponent('BusinessDetail').SetMode("Brick & Mortar");
      }

      node.getComponent('BusinessDetail').SetBalance(_tempData.NoOfBusiness[index].Amount);
      node.getComponent('BusinessDetail').SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);
      if (_tempData.NoOfBusiness[index].LocationsName.length == 0) node.getComponent('BusinessDetail').ToggleSellLocationButton(false);else node.getComponent('BusinessDetail').ToggleSellLocationButton(true);
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
        if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) //check if player is spectate or not, dont add any spectates
          {
            if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
              var node = cc.instantiate(this.OneQuestionSetupUI.DetailsPrefab);
              node.parent = this.OneQuestionSetupUI.ScrollContent;
              node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
              node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);
              oneQuestionNodes.push(node);
            }
          }
      }
    } else if (_modeIndex == 1) //for bot
      {
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
  ShowToast: function ShowToast(message, time) {
    if (time === void 0) {
      time = 2250;
    }

    this.PopUpUI.active = true;
    this.PopUpUI.children[2].children[1].getComponent(cc.Label).string = message;
    var SelfToast = this;
    setTimeout(function () {
      SelfToast.PopUpUI.active = false;
    }, time);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJFeGl0QnV0dG9uIiwiVHVybk92ZXJFeGl0QnV0dG9uIiwiUGF5RGF5VUkiLCJIb21lQmFzZWROdW1iZXJMYWJlbCIsIkJNTnVtYmVyTGFiZWwiLCJCTU51bWJlckxvY2F0aW9uTGFiZWwiLCJIb21lQmFzZWRCdG4iLCJCTUJ0biIsIkxvYW5CdG4iLCJNYWluUGFuZWxOb2RlIiwiUmVzdWx0UGFuZWxOb2RlIiwiTG9hblJlc3VsdFBhbmVsTm9kZSIsIlJlc3VsdFNjcmVlblRpdGxlTGFiZWwiLCJUb3RhbEJ1c2luZXNzTGFiZWwiLCJUb3RhbEFtb3VudExhYmVsIiwiU2tpcExvYW5CdXR0b24iLCJMb2FuRm90dGVyTGFiZWwiLCJJbnZlc3RVSSIsIkJ1eU9yU2VsbFVJIiwiT25lUXVlc3Rpb25VSSIsIlBsYXllckRldGFpbExhYmVsIiwiRGV0YWlsc1ByZWZhYiIsIlNjcm9sbENvbnRlbnQiLCJXYWl0aW5nU2NyZWVuIiwiRGVjaXNpb25UaXRsZUxhYmVsIiwiRGVjaXNpb25DYXNoTGFiZWwiLCJEZWNpc2lvblBsYXllck5hbWVMYWJlbCIsIkRlY2lzaW9uUXVlc3Rpb25MYWJlbCIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCIsIkJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCIsIkxvYW5QYXllZCIsIlRvdGFsUGF5RGF5QW1vdW50IiwiRG91YmxlUGF5RGF5IiwiR2FtZXBsYXlVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJCdXNpbmVzc1NldHVwRGF0YSIsIkludmVzdFNlbGxTZXR1cFVJIiwiUGF5RGF5U2V0dXBVSSIsIlNlbGxCdXNpbmVzc1NldHVwVUkiLCJJbnZlc3RTZXR1cFVJIiwiQnV5T3JTZWxsU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2V0dXBVSSIsIlBvcFVwVUkiLCJHYW1lcGxheVVJU2NyZWVuIiwiRGVjaXNpb25TY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiT25lUXVlc3Rpb25TcGFjZVNjcmVlbiIsIk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJJc0JvdFR1cm4iLCJJc0JhbmtydXB0ZWQiLCJCYW5rcnVwdGVkQW1vdW50IiwiUmVzZXRUdXJuVmFyaWFibGUiLCJyZXF1aXJlIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3luY0RhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsImFjdGl2ZSIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJfc3RhdGUiLCJPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSIsIkluc3RhbmNlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiRGlzY29ubmVjdFBob3RvbiIsInNldFRpbWVvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJpc0ZpcnN0VGltZSIsImluc2lkZUdhbWUiLCJtb2RlSW5kZXgiLCJfaXNCYW5rcnVwdGVkIiwiX0JhbmtydXB0QW1vdW50IiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkJ1c2luZXNzSW5mbyIsIkNhc2giLCJSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsImxlbmd0aCIsIlN0dWRlbnREYXRhIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJQbGF5ZXJOYW1lIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIm5vbmUiLCJPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJIb21lQmFzZWQiLCJPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsImJyaWNrQW5kbW9ydGFyIiwiYW1vdW50IiwiQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiTm9PZkJ1c2luZXNzIiwiTG9hblRha2VuIiwiU2hvd1RvYXN0IiwiTWF0aCIsImFicyIsInBhcnNlSW50IiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiX2RhdGEiLCJfSUQiLCJQaG90b25BY3RvciIsImFjdG9yTnIiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYW1vdW50IiwiX2J1c2luZXNzTmFtZSIsIl9pc0hvbWVCYXNlZCIsIkhvbWVCYXNlZEFtb3VudCIsIlN0YXJ0R2FtZSIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiRXhpdF9CdXNpbmVzc1NldHVwIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIkdldFR1cm5OdW1iZXIiLCJSYWlzZUV2ZW50IiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCIsIk9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdvbGRDb3VudCIsIk9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJTdG9ja0NvdW50IiwiT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uIiwiT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiUm9sbERpY2UiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJ2YWx1ZSIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiRXhpdEJ1dHRvbl9JbnZlc3RTZWxsIiwiVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSIsIlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSIsIlVwZGF0ZUJ1dHRvbnNfUGF5RGF5IiwiSE1BbW91bnQiLCJCTUFtb3VudCIsImxvYW5UYWtlbiIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsIkdldExvYW5BbW91bnRfUGF5RGF5IiwiX21hbmFnZXIiLCJfbG9hbiIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiX2lzRG91YmxlUGF5RGF5IiwiX3NraXBITSIsIl9za2lwQk0iLCJfaXNCb3QiLCJfdGltZSIsIlVwZGF0ZUNhc2hfUGF5RGF5IiwiQk1Mb2NhdGlvbnMiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBheURheUNvbXBsZXRlZCIsIk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25CTVBheW1lbnRDbGlja2VkX1BheURheSIsIk9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSIsIl9kaWNlIiwiUm9sbE9uZURpY2UiLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfRXN0aW1hdGVMb2FuIiwiU2tpcExvYW5PbmVUaW1lX1BheURheSIsIlNlbGxCdXNpbmVzc19QYXlEYXkiLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdExvYW5TY3JlZW5fUGF5RGF5IiwiU3RhcnROZXdHYW1lX1BheURheSIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJUb2dnbGVQYXlEYXkiLCJCYW5rcnVwdF9UdXJuRGVjaXNpb24iLCJjYWxsVXBvbkNhcmQiLCJUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJfdGVtcERhdGEiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXROYW1lIiwiU2V0VHlwZSIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRCdXNpbmVzc01vZGUiLCJTZXRNb2RlIiwiU2V0QmFsYW5jZSIsIkFtb3VudCIsIlNldExvY2F0aW9ucyIsIkxvY2F0aW9uc05hbWUiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJkZXN0cm95IiwiX2lzVHVybm92ZXIiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkiLCJUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwiU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX215RGF0YSIsIl9hY3RvcnNEYXRhIiwiX2lzVHVybk92ZXIiLCJfbW9kZUluZGV4IiwiY3VzdG9tUHJvcGVydGllcyIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlBsYXllclNlc3Npb25EYXRhIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9xdWVzdGlvbiIs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bEUsa0JBQUwsQ0FBd0IxQixxQkFBeEIsQ0FBOEMzRCxNQUE5QyxHQUFxRCx5QkFBdUI4VyxTQUF2QixHQUFpQyxJQUFqQyxHQUFzQyxJQUF0QyxHQUNyRCx1RUFEQTtBQUVILEdBbm5EMEI7QUFvbkQzQjtBQUVBaE0sRUFBQUEsU0FBUyxFQUFDLG1CQUFTaU0sT0FBVCxFQUFpQkMsSUFBakIsRUFDVjtBQUFBLFFBRDJCQSxJQUMzQjtBQUQyQkEsTUFBQUEsSUFDM0IsR0FEZ0MsSUFDaEM7QUFBQTs7QUFDSSxTQUFLMVIsT0FBTCxDQUFhOEIsTUFBYixHQUFvQixJQUFwQjtBQUNBLFNBQUs5QixPQUFMLENBQWEwRSxRQUFiLENBQXNCLENBQXRCLEVBQXlCQSxRQUF6QixDQUFrQyxDQUFsQyxFQUFxQ2tCLFlBQXJDLENBQWtEek4sRUFBRSxDQUFDZ0IsS0FBckQsRUFBNER1QixNQUE1RCxHQUFtRStXLE9BQW5FO0FBQ0EsUUFBSUUsU0FBUyxHQUFDLElBQWQ7QUFDQXBQLElBQUFBLFVBQVUsQ0FBQyxZQUFVO0FBQUdvUCxNQUFBQSxTQUFTLENBQUMzUixPQUFWLENBQWtCOEIsTUFBbEIsR0FBeUIsS0FBekI7QUFBaUMsS0FBL0MsRUFBaUQ0UCxJQUFqRCxDQUFWO0FBQ0g7QUE1bkQwQixDQUFULENBQXRCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBidXNpbmVzc0RldGFpbE5vZGVzPVtdO1xyXG52YXIgb25lUXVlc3Rpb25Ob2Rlcz1bXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGFtb3VudCBvZiBsb2FuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBMb2FuQW1vdW50RW51bSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgVGVuVGhvdXNhbmQ6IDEwMDAwLCAgICAgICAgICAgICAgICAgIFxyXG4gICAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgICBUaGlydHlUaG91c2FuZDogMzAwMDAsXHJcbiAgICBGb3J0eVRob3VzYW5kOiA0MDAwMCxcclxuICAgIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gICAgT3RoZXI6NlxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkJ1c2luZXNzU2V0dXBVSVwiLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWVVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZVVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIG5hbWVcIix9LFxyXG4gICAgUGxheWVyQ2FzaFVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJDYXNoVUlcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgY2FzaFwiLH0sXHJcbiAgICBCdXNpbmVzc1R5cGVUZXh0VUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgdG9vbHRpcDpcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsfSxcclxuICAgIEJ1c2luZXNzTmFtZVRleHRVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgICB0b29sdGlwOlwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIG5hbWVcIix9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzVHlwZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHR5cGUgZWRpdGJveFwiLH0sXHJcbiAgICBCdXNpbmVzc05hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIix9LFxyXG4gICAgSG9tZUJhc2VkTm9kZVVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJIb21lQmFzZWROb2RlVUlcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc1wiLH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tBbmRNb3J0YXJOb2RlVUlcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc1wiLH0sXHJcbiAgICBUaW1lclVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaW1lclVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIix9LFxyXG4gICAgVGltZXJOb2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUaW1lck5vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciB0aW1lciBub2RlIGluIGJ1c2luZXNzIHNldHVwXCJ9LCBcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLH0sXHJcbiAgICBMb2FuU2V0dXBOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJMb2FuU2V0dXBOb2RlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGxvYW4gc2V0dXBcIix9LFxyXG4gICAgTG9hbkFtb3VudDpcclxuICAgIHtcclxuICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRcIixcclxuICAgICAgICB0eXBlOiBMb2FuQW1vdW50RW51bSxcclxuICAgICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOlwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwifSwgXHJcbiAgICBMb2FuQW1vdW50TGFiZWw6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRMYWJlbFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIGFsbCBsYWJlbHMgb2YgYW1vdW50cyBpbiBsb2FuIFVJXCJ9LCBcclxuICAgIFdhaXRpbmdTdGF0dXNOb2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIHdhaXRpbmcgc3RhdHVzIHNjcmVlbiBvbiBpbml0aWFsIGJ1c2luZXNzIHNldHVwXCJ9LCBcclxuICAgIEV4aXRCdXR0b25Ob2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uTm9kZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIn0sIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3IvL1xyXG4gICAgfSxcclxuXHJcbiAgICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nPW5hbWU7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHVybkRlY2lzaW9uU2V0dXBVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiVHVybkRlY2lzaW9uU2V0dXBVSVwiLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1hcmtldGluZ0VkaXRCb3hcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBtYXJrZXRpbmcgbm9kZVwiLH0sXHJcbiAgICBHb2xkRWRpdEJveDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiR29sZEVkaXRCb3hcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsfSwgXHJcbiAgICBTdG9ja0VkaXRCb3g6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsfSxcclxuICAgIENhc2hBbW91bnRMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byBjYXNoIG5vZGVcIix9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeHBhbmRCdXNpbmVzc05vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwifSwgXHJcbiAgICBFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIGNvbnRlbnQgbm9kZSBvZiBzY3JvbGwgdmlldyBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwifSwgICBcclxuICAgIEV4cGFuZEJ1c2luZXNzUHJlZmFiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSBmb3IgcHJlZmFiIG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCJ9LCAgICAgICAgICAgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmc9bmFtZTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBTdG9ja0ludmVzdDogMSwgICAgICAgICAgICAgICAgICBcclxuICAgIEdvbGRJbnZlc3Q6IDIsXHJcbiAgICBTdG9ja1NlbGw6IDMsXHJcbiAgICBHb2xkU2VsbDogNCxcclxuICAgIE90aGVyOjVcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0U2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RTZWxsVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkludmVzdFNlbGxVSVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkRpY2VSZXN1bHRcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2UgUmVzdWx0IG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBQcmljZVRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlByaWNlVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBQcmljZVZhbHVlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlByaWNlVmFsdWVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIHZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBCdXlPclNlbGxUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXlPclNlbGxUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnV5T3JTZWxsIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBUb3RhbEFtb3VudFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsQW1vdW50VGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBCdXR0b25OYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGJ1dHRvbiBuYW1lIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICAgSW52ZXN0U3RhdGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkludmVzdFN0YXRlXCIsXHJcbiAgICAgICB0eXBlOiBJbnZlc3RFbnVtLFxyXG4gICAgICAgZGVmYXVsdDogSW52ZXN0RW51bS5Ob25lLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlfSxcclxuICAgICBBbW91bnRFZGl0Qm94OlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJBbW91bnRFZGl0Qm94XCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxsQnVzaW5lc3NVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsbEJ1c2luZXNzVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlNlbGxCdXNpbmVzc1VJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgU2VsbCBub2RlXCJ9LCAgIFxyXG4gICAgQ2FzaExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJDYXNoTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCJ9LCAgIFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwifSwgXHJcbiAgICBCdXNpbmVzc0NvdW50TGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCJ9LCAgXHJcbiAgICBTY3JvbGxDb250ZW50Tm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCJ9LCAgXHJcbiAgICBCdXNpbmVzc1NlbGxQcmVmYWI6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzU2VsbFByZWZhYlwiLFxyXG4gICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc1NlbGxQcmVmYWIgb2YgU2VsbCBub2RlXCJ9LCAgICBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwifSwgIFxyXG4gICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCJ9LCAgXHJcbn0sXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7Ly9jb25zdHJ1Y3RvclxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQYXlEYXlVSVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFBheURheSBub2RlXCJ9LFxyXG4gICAgQ2FzaExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJDYXNoXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCJ9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkhvbWVCYXNlZE51bWJlclwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkTnVtYmVyIG5vZGVcIn0sXHJcbiAgICAgQk1OdW1iZXJMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIn0sXHJcbiAgICAgQk1OdW1iZXJMb2NhdGlvbkxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja01vcnRhckxvY2F0aW9uc1wiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJMb2NhdGlvbnMgbm9kZVwifSxcclxuICAgIEhvbWVCYXNlZEJ0bjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCJ9LFxyXG4gICAgQk1CdG46XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrTW9ydGFyQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyQnRuIG5vZGVcIn0sXHJcbiAgICBMb2FuQnRuOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwifSxcclxuICAgIE1haW5QYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIn0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRQYW5lbCBub2RlXCJ9LFxyXG4gICAgTG9hblJlc3VsdFBhbmVsTm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuUmVzdWx0UGFuZWxOb2RlIG5vZGVcIn0sXHJcbiAgICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUmVzdWx0U2NyZWVuVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFNjcmVlblRpdGxlIG5vZGVcIn0sXHJcbiAgICAgRGljZVJlc3VsdExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIn0sXHJcbiAgIFRvdGFsQnVzaW5lc3NMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIn0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEFtb3VudExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBub2RlXCJ9LFxyXG4gICAgU2tpcExvYW5CdXR0b246XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBMb2FuQnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNraXBMb2FuQnV0dG9uIG5vZGVcIn0sXHJcbiAgIExvYW5Gb3R0ZXJMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hbkZvdHRlckxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuRm90dGVyTGFiZWwgbm9kZVwifSxcclxuICAgICAgICAgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiSW52ZXN0VUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEludmVzdCBub2RlXCJ9LCAgIFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEludmVzdCBub2RlXCJ9LCBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCJ9LCAgXHJcbiAgICAgVHVybk92ZXJFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwifSwgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiQnV5T3JTZWxsVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBCdXlPclNlbGwgbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCJ9LCAgIFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCJ9LCBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCJ9LCAgXHJcbiAgICAgVHVybk92ZXJFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwifSwgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIE9uZVF1ZXN0aW9uVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE9uZVF1ZXN0aW9uVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIk9uZVF1ZXN0aW9uVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgIFxyXG4gICAgQ2FzaExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJDYXNoTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgICBcclxuICAgIFBsYXllck5hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sICBcclxuICAgICBUdXJuT3ZlckV4aXRCdXR0b246XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sXHJcbiAgIFBsYXllckRldGFpbExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJEZXRhaWxMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgXHJcbiAgICBEZXRhaWxzUHJlZmFiOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEZXRhaWxzUHJlZmFiXCIsXHJcbiAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIERldGFpbHNQcmVmYWIgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgIFxyXG4gICAgU2Nyb2xsQ29udGVudDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgU2Nyb2xsQ29udGVudCBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCBcclxuICAgIFdhaXRpbmdTY3JlZW46XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIldhaXRpbmdTY3JlZW5cIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sICBcclxuICAgIERlY2lzaW9uVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgIFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkRlY2lzaW9uQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sICAgXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sICAgIFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEZWNpc2lvblF1ZXN0aW9uTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBxdWVzdGlvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD0tMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuLy90dXJuIGRlY2lzaW9uc1xyXG52YXIgVGVtcE1hcmtldGluZ0Ftb3VudD1cIlwiO1xyXG52YXIgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbi8vYnV5b3JzZWxsXHJcbnZhciBHb2xkQ2FzaEFtb3VudD1cIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbnZhciBTdG9ja0J1c2luZXNzTmFtZT1cIlwiO1xyXG52YXIgRGljZVJlc3VsdDtcclxudmFyIE9uY2VPclNoYXJlO1xyXG52YXIgTG9jYXRpb25OYW1lPVwiXCI7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxudmFyIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxudmFyIExvYW5QYXllZD1mYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50PTA7XHJcbnZhciBEb3VibGVQYXlEYXk9ZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkdhbWVwbGF5VUlNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCJ9LFxyXG4gICAgICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIn0sXHJcbiAgICAgICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsfSwgIFxyXG4gICAgICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIix9LCAgXHJcbiAgICAgICAgU2VsbEJ1c2luZXNzU2V0dXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Ont9LCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFNlbGxCdXNpbmVzc1VJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgU2VsbEJ1c2luZXNzVUkgY2xhc3NcIix9LCAgXHJcbiAgICAgICAgSW52ZXN0U2V0dXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Ont9LCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEludmVzdFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgSW52ZXN0VUkgY2xhc3NcIix9LCAgICBcclxuICAgICAgICBCdXlPclNlbGxTZXR1cFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6e30sICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogQnV5T3JTZWxsVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBCdXlPclNlbGxVSSBjbGFzc1wiLH0sICAgICAgIFxyXG4gICAgICAgIE9uZVF1ZXN0aW9uU2V0dXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Ont9LCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IE9uZVF1ZXN0aW9uVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBPbmVRdWVzdGlvblVJIGNsYXNzXCIsfSwgICAgICAgXHJcbiAgICAgICAgUG9wVXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLH0sICAgXHJcbiAgICAgICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHNldHVwIHNjcmVlblwiLH0sICBcclxuICAgICAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBnYW1lcGxheSB1aSBzY3JlZW5cIix9LCAgIFxyXG4gICAgICAgIERlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIix9LCAgICBcclxuICAgICAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3QgJiBzZWxsIHNjcmVlblwiLH0sICAgIFxyXG4gICAgICAgIFBheURheVNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgUGF5RGF5IHNjcmVlblwiLH0sICAgIFxyXG4gICAgICAgIFNlbGxCdXNpbmVzc1NjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLH0sICBcclxuICAgICAgICBJbnZlc3RTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIix9LCAgXHJcbiAgICAgICAgQnV5T3JTZWxsU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsfSwgIFxyXG4gICAgICAgIE9uZVF1ZXN0aW9uU3BhY2VTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsfSwgIFxyXG4gICAgICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsfSwgIFxyXG4gICAgICAgICBUZW1wRGljZVRleHQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcImxhYmVsIHJlZmVyZW5jZSBmb3IgZGljZVwiLH0sICAgXHJcbiAgICAgICAgIExlYXZlUm9vbUJ1dHRvbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSwgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpOyBcclxuXHJcbiAgICAgICAgIC8vbG9jYWwgdmFyaWFibGVzXHJcbiAgICAgICAgIHRoaXMuR29sZEludmVzdGVkPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLkdvbGRTb2xkPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLlN0b2NrSW52ZXN0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgIHRoaXMuU3RvY2tTb2xkPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLklzQm90VHVybj1mYWxzZTtcclxuICAgICAgICAgdGhpcy5Jc0JhbmtydXB0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudD0wO1xyXG5cclxuICAgICB9LFxyXG5cclxuICAgICBSZXNldFR1cm5WYXJpYWJsZSgpXHJcbiAgICAge1xyXG4gICAgICAgIHRoaXMuR29sZEludmVzdGVkPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuR29sZFNvbGQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuU3RvY2tTb2xkPWZhbHNlO1xyXG4gICAgIH0sXHJcblxyXG4gICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuXHJcbiAgICAgICAgaWYoIUdhbWVNYW5hZ2VyIHx8IEdhbWVNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlcj1yZXF1aXJlKCdHYW1lTWFuYWdlcicpO1xyXG4gICAgIH0sXHJcblxyXG4gICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZCBcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbignU3luY0RhdGEnLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICAgICAgfSxcclxuICAgIFxyXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKCdTeW5jRGF0YScsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gICAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gICAgSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIENsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTGVhdmVSb29tQnV0dG9uLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJKClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKHRydWUpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJTcGxhc2hcIik7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIEJ1c2luZXNzU2V0dXAgd2l0aCBsb2FuXHJcbiAgICAvL0J1c2luZXNzIHNldHVwIHVpLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGlzRmlyc3RUaW1lLGluc2lkZUdhbWU9ZmFsc2UsbW9kZUluZGV4PTAsX2lzQmFua3J1cHRlZD1mYWxzZSxfQmFua3J1cHRBbW91bnQ9MCkgeyAvL2NhbGxlZCBmaXJzdCB0aW1lIGZvcm0gR2FtZU1hbmFnZXIgb25sb2FkIGZ1bmN0aW9uXHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT10cnVlO1xyXG5cclxuICAgICAgICB0aGlzLklzQmFua3J1cHRlZD1faXNCYW5rcnVwdGVkO1xyXG4gICAgICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudD1fQmFua3J1cHRBbW91bnQ7XHJcblxyXG4gICAgICAgIGlmKF9pc0JhbmtydXB0ZWQpXHJcbiAgICAgICAgICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5Jbml0X0J1c2luZXNzU2V0dXAoaXNGaXJzdFRpbWUsaW5zaWRlR2FtZSxtb2RlSW5kZXgsX2lzQmFua3J1cHRlZCk7XHJcbiAgICB9LFxyXG4gICAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsaW5zaWRlR2FtZT1mYWxzZSxtb2RlSW5kZXg9MCxfaXNCYW5rcnVwdGVkPWZhbHNlKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2U9bmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlPW5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgICAgIFxyXG4gICAgICAgIGlmKGlzRmlyc3RUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPTIwMDAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5SZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgICAgIGlmKGluc2lkZUdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD1pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTsgIFxyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXA9LTE7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpOyBcclxuICAgICAgICB9IFxyXG4gICAgfSwgXHJcbiAgICBHZXRPYmpfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gICAgfSxcclxuICAgIE9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKG5hbWUpO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWU9bmFtZTtcclxuICAgIH0sXHJcbiAgICBPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEPVVJRDtcclxuICAgIH0sXHJcbiAgICBPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUk9bmFtZTtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uPW5hbWU7XHJcbiAgICAgICBcclxuICAgIH0sXHJcbiAgICBPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUk9bmFtZTtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZT1uYW1lO1xyXG4gICAgfSxcclxuICAgIFJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZUxhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lTGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUk9XCJcIjtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVST1cIlwiO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUubm9uZTtcclxuICAgIH0sXHJcbiAgICBPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICAgIH0sXHJcbiAgICBPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPXRydWU7XHJcblxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXI7XHJcbiAgICB9LFxyXG4gICAgT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oYW1vdW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZz1cIiRcIithbW91bnQ7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1hbW91bnQ7XHJcbiAgICB9LFxyXG4gICAgQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGFtb3VudClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9MDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmKFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICBfYnVzaW5lc3NJbmRleD1pbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoX2xvYW5UYWtlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgYWxyZWFkeSB0YWtlbiBsb2FuIG9mICRcIitQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID49YW1vdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBSZXF1aXJlZENhc2g9TWF0aC5hYnMocGFyc2VJbnQoUGxheWVyRGF0YUludGFuY2UuQ2FzaCktYW1vdW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFswXS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIiRcIitSZXF1aXJlZENhc2g7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIE9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT09R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDUwMDAwKTtcclxuICAgICAgICB9ZWxzZSBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT09R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCgxMDAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBidXNpbmVzcyBiZXR3ZWVuIEhvbWUgQmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyLiBcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZT1mYWxzZTsgIFxyXG4gICAgfSxcclxuICAgIEhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihpbmRleClcclxuICAgIHtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsLmxlbmd0aDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihpbmRleD09aSlcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMCk7XHJcblxyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uVGVuVGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMSk7XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5UZW50eVRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDIpO1xyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uVGhpcnR5VGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMyk7XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5Gb3J0eVRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDQpO1xyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uRmlmdHlUaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg1KTtcclxuICAgIH0sXHJcbiAgICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9PUxvYW5BbW91bnRFbnVtLk90aGVyKVxyXG4gICAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ9UmVxdWlyZWRDYXNoO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50PXBhcnNlSW50KHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCk7XHJcblxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgdGhpcy5PbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1QbGF5ZXJEYXRhSW50YW5jZS5DYXNoK1BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpXHJcbiAgICB9LFxyXG5cclxuICAgIFN5bmNEYXRhOmZ1bmN0aW9uKF9kYXRhLF9JRClcclxuICAgIHtcclxuICAgICAgICBpZihfSUQhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5hY3Rvck5yKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChfZGF0YSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg+PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vc2V0dGluZyByb29tIHByb3BlcnR5IHRvIGRlY2xhcmUgaW5pdGlhbCBzZXR1cCBoYXMgYmVlblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsdHJ1ZSx0cnVlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBQdXJjaGFzZUJ1c2luZXNzOmZ1bmN0aW9uKF9hbW91bnQsX2J1c2luZXNzTmFtZSxfaXNIb21lQmFzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUGxheWVyRGF0YUludGFuY2UuQ2FzaDxfYW1vdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vdCBlbm91Z2ggY2FzaCB0byBidXkgdGhpcyBcIitfYnVzaW5lc3NOYW1lK1wiIGJ1c2luZXNzLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfaXNIb21lQmFzZWQpXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIGlmKFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudDwzKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPVBsYXllckRhdGFJbnRhbmNlLkNhc2gtX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nPVwiJFwiK1BsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRHYW1lPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFydEdhbWU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPVBsYXllckRhdGFJbnRhbmNlLkNhc2gtX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmc9XCIkXCIrUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0R2FtZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaC1QbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIlJldmVydGluZyBiYWNrIGxvYW4gYW1vdW50LlwiLDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tb2RlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuSXNCYW5rcnVwdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuSXNCYW5rcnVwdD10cnVlO1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5CYW5rcnVwdEFtb3VudD10aGlzLkJhbmtydXB0ZWRBbW91bnQ7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXT1QbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgICB9ICAgIFxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKF9tb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9zZXR0aW5nIHBsYXllciBjdXJyZW50IGRhdGEgaW4gY3VzdG9tIHByb3BlcnRpZXMgd2hlbiBoaXMvaGVyIHR1cm4gb3ZlcnNcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIXRoaXMuSXNCYW5rcnVwdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2RhdGE9e0RhdGE6e2JhbmtydXB0ZWQ6dHJ1ZSx0dXJuOkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCksUGxheWVyRGF0YU1haW46UGxheWVyRGF0YUludGFuY2V9fTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoOSxfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfbW9kZT09MSkvL2ZvciBBSVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMuSXNCYW5rcnVwdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuICAgICAgICAgICAgICAgIH0sIDE2MDApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibm8gbW9kZSBzZWxlY3RlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdPVBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwPS0xO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBQYXlBbW91bnRUb1BsYXlHYW1lOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZT1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbj09XCJcIilcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyB0eXBlLlwiKTtcclxuICAgICAgICBlbHNlIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lPT1cIlwiKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIG5hbWUuXCIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZCkgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBob21lYmFzc2VkXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoMTAwMDAsXCJob21lXCIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDUwMDAwLFwiYnJpY2sgYW5kIG1vcnRhclwiLGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5TdGFydEdhbWU9PXRydWUgfHwgdGhpcy5Jc0JhbmtydXB0ZWQ9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwIT0tMSkgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIG5vdCBiZWVuIGNhbGxlZCBmcm9tIGluc2lkZSBnYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgICAgIGVsc2UgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgICAgICAgICAgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgICAgICAgICAgLy9wcnRpbnRpbmcgYWxsIHZhbHVlcyB0byBjb25zb2xlXHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG5hbWU6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIElEOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXMgcGxheWVyIGJvdDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLklzQm90KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gb2YgYnVzaW5lc3Mgb2YgcGxheWVyIChzZWUgYmVsb3cpOiBcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNhc2g6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5DYXNoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIHRha2VuIGxvYW46IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuVGFrZW4pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YWtlbiBsb2FuIGFtb3VudDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24gVHVybkRlY2lzaW9uU2V0dXBVSVxyXG4gICAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGlzYWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmU9aXNhY3RpdmU7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbjpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkNhc2hBbW91bnRMYWJlbC5zdHJpbmc9XCIkIFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXS5DYXNoO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQ9YW1vdW50O1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZihUZW1wTWFya2V0aW5nQW1vdW50PT1cIlwiIHx8IFRlbXBNYXJrZXRpbmdBbW91bnQ9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2V0aW5nQW1vdW50PXBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD49IHRoaXMubWFya2V0aW5nQW1vdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCt0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IHN1Y2Nlc3NmdWxseSBtYXJrZXRlZCBhbW91bnQgb2YgJFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCtcIiAsIHJlbWFpbmluZyBjYXNoIGlzICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoK1wiLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudD1cIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBcclxuXHJcbiAgICBPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gaWYgcGxheWVyIGhhcyBtb3JlIHRoYW4gNTAwMCRcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBhbHJlYWR5IGhpcmVkIGEgbGF3eWVyLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj01MDAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzPXRydWU7XHJcbiAgICAgICAgICAgIFRlbXBIaXJpbmdMYXd5ZXI9dHJ1ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coVGVtcEhpcmluZ0xhd3llcik7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC01MDAwO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llciwgcmVtYWluaW5nIGNhc2ggaXMgJFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grXCIuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIG9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oX25hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgTG9jYXRpb25OYW1lPV9uYW1lO1xyXG4gICAgfSxcclxuICAgIE9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2lmIHBsYXllciBoYXMgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBoZSBjb3VsZCBleHBhbmQgaXRcclxuICAgICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzc1wiKTtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHZhciBnZW5lcmF0ZWRMZW5ndGg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgaWYoZ2VuZXJhdGVkTGVuZ3RoPT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBubyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIHRvIGV4cGFuZC5cIiwxNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfSwgMTYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIExvY2F0aW9uTmFtZT1cIlwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydGluZyBuZXcgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgdGhpcy5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgICAgIEdvbGRDYXNoQW1vdW50PWFtb3VudDtcclxuICAgIH0sIFxyXG5cclxuICAgIE9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLkdvbGRJbnZlc3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuR29sZEludmVzdGVkPXRydWU7XHJcbiAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLkdvbGRJbnZlc3Q7XHJcbiAgICAgICAgICAgIERpY2VSZXN1bHQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgICAgICAgXCJJbnZlc3QgSW4gR09MRFwiLFxyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgICAgICAgIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIvb3VuY2VcIixcclxuICAgICAgICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIqMD0wXCIsXHJcbiAgICAgICAgICAgICAgICBcIkJVWVwiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsODAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LCBcclxuXHJcbiAgICBPblN0b2NrQnVzaW5lc3NOYW1lQ2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgU3RvY2tCdXNpbmVzc05hbWU9bmFtZTtcclxuICAgIH0sIFxyXG5cclxuICAgIE9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuU3RvY2tJbnZlc3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgaWYoU3RvY2tCdXNpbmVzc05hbWU9PVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhIGJ1c2luZXNzIG5hbWUgdG8gaW52ZXN0LlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9SW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuICAgICAgICAgICAgICAgIERpY2VSZXN1bHQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgT25jZU9yU2hhcmU9KERpY2VSZXN1bHQqMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJJbnZlc3QgaW4gU3RvY2tcIixcclxuICAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRWFjaCBTaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIi9zaGFyZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiKjA9MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIiw4MDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIE9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLkdvbGRTb2xkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Hb2xkU29sZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9SW52ZXN0RW51bS5Hb2xkU2VsbDtcclxuICAgICAgICAgICAgICAgIERpY2VSZXN1bHQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgT25jZU9yU2hhcmU9KERpY2VSZXN1bHQqMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTZWxsIEdPTERcIixcclxuICAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiL291bmNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIqMD0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgR09MRCBvdW5jZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIiw4MDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIE9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5TdG9ja1NvbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9ja1NvbGQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPUludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgICAgICAgICAgICBcIlNlbGwgU1RPQ0tcIixcclxuICAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRWFjaCBzaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIi9zaGFyZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gU0VMTFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIqMD0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgc2hhcmVzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIiw4MDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ28gaW50byBwYXJ0bmVyIHNoaXBcIik7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ3b3JrIGluIHByb2dyZXNzLCBjb21pbmcgc29vbi4uLlwiKTtcclxuICAgIH0sIFxyXG5cclxuICAgIE9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbihmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxEaWNlKCk7XHJcbiAgICB9LCBcclxuXHJcbiAgICBQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIC8vdGhpcy5UZW1wRGljZVRleHQuc3RyaW5nPXZhbHVlO1xyXG4gICAgfSwgXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIEludmVzdCBhbmQgc2VsbCBtb2RkdWxlXHJcblxyXG4gICAgUmVzZXRHb2xkSW5wdXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5Hb2xkRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICBHb2xkQ2FzaEFtb3VudD1cIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5TdG9ja0VkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgU3RvY2tCdXNpbmVzc05hbWU9XCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgb25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwoX2Ftb3VudClcclxuICAgIHtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9X2Ftb3VudDtcclxuXHJcbiAgICAgICAgaWYoRW50ZXJCdXlTZWxsQW1vdW50PT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqMD0wXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX2Ftb3VudD1wYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgICAgICB2YXIgX2Ftb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIipcIitFbnRlckJ1eVNlbGxBbW91bnQrXCI9XCIrX2Ftb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB0aGlzLlJlc2V0R29sZElucHV0KCk7XHJcbiAgICAgICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgQXNzaWduRGF0YV9JbnZlc3RTZWxsKF90aXRsZSxfZGljZVJlc3VsdCxfcHJpY2VUaXRsZSxfcHJpY2VWYWx1ZSxfYnV5T3JTZWxsVGl0bGUsX3RvdGFsQW1vdW50VGl0bGUsX3RvdGFsQW1vdW50VmFsdWUsX2J1dHRvbk5hbWUsX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmc9X3RpdGxlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZz1fZGljZVJlc3VsdDtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVGl0bGVMYWJlbC5zdHJpbmc9X3ByaWNlVGl0bGU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVZhbHVlTGFiZWwuc3RyaW5nPV9wcmljZVZhbHVlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV5T3JTZWxsVGl0bGVMYWJlbC5zdHJpbmc9X2J1eU9yU2VsbFRpdGxlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRUaXRsZUxhYmVsLnN0cmluZz1fdG90YWxBbW91bnRUaXRsZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmc9X3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXR0b25OYW1lTGFiZWwuc3RyaW5nPV9idXR0b25OYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVEYXRhX0ludmVzdFNlbGwoX3RvdGFsQW1vdW50VmFsdWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nPV90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBBcHBseUJ1dHRvbl9JbnZlc3RTZWxsKClcclxuICAgIHtcclxuICAgICAgICBpZihFbnRlckJ1eVNlbGxBbW91bnQ9PVwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPT1JbnZlc3RFbnVtLkdvbGRJbnZlc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBpZihfVG90YWxBbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC1fVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQrX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIrX2Ftb3VudCtcIiBvdW5jZXMgb2YgR09MRFwiLDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlK1wiKjA9MFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPT1JbnZlc3RFbnVtLkdvbGRTZWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD1wYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgaWYoX2Ftb3VudDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfVG90YWxBbW91bnQ9T25jZU9yU2hhcmUqX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQtX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiK19hbW91bnQrXCIgb3VuY2VzIG9mIEdPTEQgZm9yICAkXCIrX1RvdGFsQW1vdW50LDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlK1wiKjA9MFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggR09MRCBvdW5jZXMsIHlvdSBvd24gXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50K1wiIG9mIEdPTEQgb3VuY2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5TdG9ja0ludmVzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBfVG90YWxBbW91bnQ9T25jZU9yU2hhcmUqX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgIGlmKF9Ub3RhbEFtb3VudDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLV9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50K19hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYW4gYWRkIG11bHRpcGxlIHN0b2NrcyB3aXRoIGJ1c2luZXNzIG5hbWUgaW4gb2JqZWN0IGlmIHJlcXVpcmVkXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIitfYW1vdW50K1wiIHNoYXJlcyBvZiBidXNpbmVzcyBcIitTdG9ja0J1c2luZXNzTmFtZSwxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlK1wiKjA9MFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPT1JbnZlc3RFbnVtLlN0b2NrU2VsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoX2Ftb3VudDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudC1fYW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiK19hbW91bnQrXCIgc2hhcmVzIG9mIHN0b2NrIGZvciAgJFwiK19Ub3RhbEFtb3VudCwxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlK1wiKjA9MFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggc3RvY2tzIHNoYXJlcywgeW91IG93biBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50K1wiIG9mIHN0b2NrIHNoYXJlc1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRXhpdEJ1dHRvbl9JbnZlc3RTZWxsKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBQYXlkYXkgb3IgRG91YmxlIHBheSBEYXlcclxuICAgIFRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCxCTUFtb3VudCxsb2FuVGFrZW4pXHJcbiAgICB7XHJcbiAgICAgICAgaWYoSE1BbW91bnQ9PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoQk1BbW91bnQ9PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPXRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighbG9hblRha2VuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9hblBheWVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9hblBheWVkPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEdldExvYW5BbW91bnRfUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgdmFyIF9sb2FuPTA7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbG9hbj1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfbG9hbjtcclxuICAgIH0sXHJcblxyXG4gICAgQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLF9pc0RvdWJsZVBheURheT1mYWxzZSxfc2tpcEhNPWZhbHNlLF9za2lwQk09ZmFsc2UsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuPV9pc0JvdDtcclxuICAgICAgICBEb3VibGVQYXlEYXk9X2lzRG91YmxlUGF5RGF5O1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSh0cnVlKTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmc9X3RpdGxlO1xyXG5cclxuICAgICAgICB2YXIgX3RpbWU9MTgwMDtcclxuXHJcbiAgICAgICAgaWYoX2lzQm90PT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgICAgIGlmKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLF90aW1lKTtcclxuICAgICAgICAgICAgZWxzZSBpZihfc2tpcEhNKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NraXBCTSlcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLF90aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICAgICAgaWYoX3NraXBITSAmJiBfc2tpcEJNKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKF9za2lwSE0pXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgICAgICAgZWxzZSBpZihfc2tpcEJNKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHZhciBITUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgdmFyIEJNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUxvY2F0aW9ucz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9MDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICBfYnVzaW5lc3NJbmRleD1pbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvYW5UYWtlbj1fbG9hblRha2VuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmc9SE1BbW91bnQ7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTGFiZWwuc3RyaW5nPUJNQW1vdW50O1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxvY2F0aW9uTGFiZWwuc3RyaW5nPUJNTG9jYXRpb25zO1xyXG5cclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfbG9hbj10aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nPVwiKnBheSAkXCIrX2xvYW47XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nPVwiKnBheSAkNTAwMFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZihfc2tpcEhNICYmIF9za2lwQk0pXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwwLGxvYW5UYWtlbik7XHJcbiAgICAgICAgZWxzZSBpZihfc2tpcEhNKVxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsQk1BbW91bnQsbG9hblRha2VuKTtcclxuICAgICAgICBlbHNlIGlmKF9za2lwQk0pXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsMCxsb2FuVGFrZW4pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCxCTUFtb3VudCxsb2FuVGFrZW4pO1xyXG5cclxuICAgICAgICBpZihfc2tpcEJNIHx8IF9za2lwSE0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgIH0sIChfdGltZSsyMDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKF9pc0JvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5PbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgICAgICBpZighRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nPVwiUGF5RGF5XCI7XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nPVwiRG91YmxlUGF5RGF5XCI7XHJcblxyXG4gICAgICAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgIHZhciBITUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICAgdmFyIF9kaWNlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG5cclxuICAgICAgICAgICBpZighRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgVG90YWxQYXlEYXlBbW91bnQ9KEhNQW1vdW50Kl9kaWNlKSoxMDAwO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PTIqKEhNQW1vdW50Kl9kaWNlKSoxMDAwO1xyXG5cclxuXHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmc9X2RpY2U7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmc9SE1BbW91bnQ7XHJcblxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrSE1BbW91bnQrXCIqXCIrXCIxMDAwPVwiK1RvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZz1fZGljZStcIipcIitITUFtb3VudCtcIipcIitcIjEwMDAqMj1cIitUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuSXNCb3RUdXJuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlY2VpdmVQYXltZW50X1BheURheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIlBheURheVwiO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgIHZhciBfYW1vdW50PUJNQW1vdW50K0JNTG9jYXRpb25zO1xyXG4gICAgICAgICAgIHZhciBfZGljZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PShfYW1vdW50Kl9kaWNlKSoyMDAwO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PTIqKF9hbW91bnQqX2RpY2UpKjIwMDA7XHJcblxyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nPV9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrX2Ftb3VudCtcIipcIitcIjIwMDA9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK19hbW91bnQrXCIqXCIrXCIyMDAwKjI9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLklzQm90VHVybilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCkgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUxvYW5QYXllZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHZhciAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7ICAgXHJcbiAgICAgICAgICAgIHZhciBfRXN0aW1hdGVMb2FuPTA7XHJcblxyXG4gICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkvL2lmIHBsYXllciBoYWQgc2tpcHBwZWQgbG9hbiBwcmV2aW91c2x5IGNhbGwgYWxsIGFtb3VudCBkdWVcclxuICAgICAgICAgICAgICAgIF9Fc3RpbWF0ZUxvYW49dGhpcy5HZXRMb2FuQW1vdW50X1BheURheSgpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBfRXN0aW1hdGVMb2FuPTUwMDA7XHJcblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj1fRXN0aW1hdGVMb2FuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2FuUGF5ZWQ9dHJ1ZTsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtX0VzdGltYXRlTG9hbjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9idXNpbmVzc0luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQtX0VzdGltYXRlTG9hbjtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDw9MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudD1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuU2tpcExvYW5CdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPXRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlPXRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm91dCBvZiBtb25leVwiKTtcclxuICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVQYXltZW50X1BheURheSgpIC8vYWxsXHJcbiAgICB7XHJcbiAgICAgICAgdmFyICBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgICBpZighdGhpcy5Jc0JvdFR1cm4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIkFtb3VudCAkXCIrVG90YWxQYXlEYXlBbW91bnQrXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDE1MDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgIH0sIDE1NTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFtb3VudCAkXCIrVG90YWxQYXlEYXlBbW91bnQrXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2tpcExvYW5PbmVUaW1lX1BheURheSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBza2lwcGVkIHRoZSBsb2FuIHBheW1lbnQsIGJhbmsgd2lsbCBjYWxsIHVwb24gY29tcGxldGUgbG9hbiBhbW91bnQgb24gbmV4dCBwYXlkYXlcIiwyMDAwKTtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudD10cnVlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBMb2FuUGF5ZWQ9dHJ1ZTsgXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgTG9hblBheWVkPXRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGxCdXNpbmVzc19QYXlEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVDYXNoX1BheURheShfYW1vdW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nPVwiJFwiK19hbW91bnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRMb2FuU2NyZWVuX1BheURheSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTdGFydE5ld0dhbWVfUGF5RGF5KCkgLy9pZiBiYW5rcnVwdGVkIHlvdSBjYW4gc3RhcnQgbmV3IGdhbWVcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSB3aWxsIGxvc2UgYWxsIHByb2dyZXNzIGFuZCBzdGFydCBuZXcgZ2FtZSBmcm9tIHRoZSBzdGFydC5cIiwzMDAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPWZhbHNlO1xyXG4gICAgICAgICAgICBMb2FuUGF5ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIH0sIDMwMTApO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBQYXlEYXlDb21wbGV0ZWQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgJiYgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkICYmIExvYW5QYXllZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcGF5ZGF5IGRvbmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIFNlbGwgQnVzaW5lc3MgVUlcclxuICAgIFRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX3RlbXBEYXRhPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcblxyXG4gICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1cIlNFTExcIjtcclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQ2FzaExhYmVsLnN0cmluZz1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nPVwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzU2VsbFByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgaWYocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKT09MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpPT0yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG59LFxyXG5cclxuICAgIFJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBidXNpbmVzc0RldGFpbE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXNpbmVzc0RldGFpbE5vZGVzPVtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKF9pc1R1cm5vdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc1R1cm5vdmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICBFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgICB9LCAgXHJcbiAgICBcclxuICAgIEV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH0sIFxyXG4gICAgICAgIFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBJbnZlc3QgVUlcclxuICAgIFRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkludmVzdFNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gICAgfSxcclxuICAgIFNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1cIklOVkVTVFwiO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZz1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgICAgIGlmKF9pc1R1cm5vdmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gQnV5T1JTZWxsIFVJXHJcbiAgICBUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXlPclNlbGxTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXI9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICAgIH0sXHJcbiAgICBTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmc9XCJCVVkgT1IgU0VMTFwiO1xyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZz1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgICAgIGlmKF9pc1R1cm5vdmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBPbmUgUXVlc3Rpb24gc2V0dXAgVWlcclxuICAgIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuV2FpdGluZ1NjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLF9hY3RvcnNEYXRhLF9pc1R1cm5PdmVyLF9tb2RlSW5kZXg9MClcclxuICAgIHtcclxuICAgICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1cIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9XCIkXCIrX215RGF0YS5DYXNoO1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmc9X215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZz1cIk5vIG9mIFBsYXllcnM6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmKF9tb2RlSW5kZXg9PTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKSAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9teURhdGEuUGxheWVyVUlEIT1fYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfbW9kZUluZGV4PT0xKS8vZm9yIGJvdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9teURhdGEuUGxheWVyVUlEIT1fYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihfaXNUdXJuT3ZlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9uZVF1ZXN0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTsgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH0sXHJcbiAgICBcclxuXHJcbiAgICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfcXVlc3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25UaXRsZUxhYmVsLnN0cmluZz1cIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uQ2FzaExhYmVsLnN0cmluZz1cIiRcIitfbXlEYXRhLkNhc2g7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9teURhdGEuUGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nPVwiUGxheWVyIGhhcyBhc2tlZCBpZiBcIitfcXVlc3Rpb24rXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgIFwiKmVpdGhlciBhbnN3ZXIgcXVlc3Rpb24gb3IgcGF5ICQ1MDAwIHRvIHBsYXllciB3aG9zZSBhc2tpbmcgcXVlc3Rpb24uXCI7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIFNob3dUb2FzdDpmdW5jdGlvbihtZXNzYWdlLHRpbWU9MjI1MClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBvcFVwVUkuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJLmNoaWxkcmVuWzJdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPW1lc3NhZ2U7XHJcbiAgICAgICAgdmFyIFNlbGZUb2FzdD10aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZT1mYWxzZTsgfSwgdGltZSk7XHJcbiAgICB9LFxyXG5cclxufSk7XHJcbiJdfQ==