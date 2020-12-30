
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
  StartNewBusiness_BusinessSetup: function StartNewBusiness_BusinessSetup(isFirstTime, insideGame, modeIndex) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    if (modeIndex === void 0) {
      modeIndex = 0;
    }

    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;
    this.Init_BusinessSetup(isFirstTime, insideGame, modeIndex);
  },
  Init_BusinessSetup: function Init_BusinessSetup(isFirstTime, insideGame, modeIndex) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    if (modeIndex === void 0) {
      modeIndex = 0;
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

    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(PlayerDataIntance);

    if (_mode == 2) //for real players
      {
        //setting player current data in custom properties when his/her turn overs
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", PlayerDataIntance);
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(1, PlayerDataIntance);
        this.BusinessSetupData.WaitingStatusNode.active = true;
      } else if (_mode == 1) //for AI
      {
        this.BusinessSetupData.WaitingStatusNode.active = true;
        setTimeout(function () {
          _this.BusinessSetupData.WaitingStatusNode.active = false;
          _this.BusinessSetupNode.active = false;
          _this.GameplayUIScreen.active = true;
          GamePlayReferenceManager.Instance.Get_GameManager().StartTurn();
        }, 1600);
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

      if (this.StartGame == true) {
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
      if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) _EstimateLoan = this.GetLoanAmount_PayDay();else _EstimateLoan = 5000;

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
        this.PayDayCompleted();
      } else {
        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = false;else this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = true;
        this.PayDaySetupUI.LoanResultPanelNode.active = true;
      }
    }
  },
  ReceivePayment_PayDay: function ReceivePayment_PayDay() //all
  {
    var _this5 = this;

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + TotalPayDayAmount;

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
  ExitLoanScreen_PayDay: function ExitLoanScreen_PayDay() {
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
  },
  PayDayCompleted: function PayDayCompleted() {
    if (HomeBasedPaymentCompleted && BrickMortarPaymentCompleted && LoanPayed) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      console.log("all payday done");
      this.TogglePayDayScreen_PayDay(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false, false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().callUponCard();
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
  ///#region One Question setup Ui
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJFeGl0QnV0dG9uIiwiVHVybk92ZXJFeGl0QnV0dG9uIiwiUGF5RGF5VUkiLCJIb21lQmFzZWROdW1iZXJMYWJlbCIsIkJNTnVtYmVyTGFiZWwiLCJCTU51bWJlckxvY2F0aW9uTGFiZWwiLCJIb21lQmFzZWRCdG4iLCJCTUJ0biIsIkxvYW5CdG4iLCJNYWluUGFuZWxOb2RlIiwiUmVzdWx0UGFuZWxOb2RlIiwiTG9hblJlc3VsdFBhbmVsTm9kZSIsIlJlc3VsdFNjcmVlblRpdGxlTGFiZWwiLCJUb3RhbEJ1c2luZXNzTGFiZWwiLCJUb3RhbEFtb3VudExhYmVsIiwiU2tpcExvYW5CdXR0b24iLCJMb2FuRm90dGVyTGFiZWwiLCJJbnZlc3RVSSIsIkJ1eU9yU2VsbFVJIiwiT25lUXVlc3Rpb25VSSIsIlBsYXllckRldGFpbExhYmVsIiwiRGV0YWlsc1ByZWZhYiIsIlNjcm9sbENvbnRlbnQiLCJXYWl0aW5nU2NyZWVuIiwiRGVjaXNpb25UaXRsZUxhYmVsIiwiRGVjaXNpb25DYXNoTGFiZWwiLCJEZWNpc2lvblBsYXllck5hbWVMYWJlbCIsIkRlY2lzaW9uUXVlc3Rpb25MYWJlbCIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCIsIkJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCIsIkxvYW5QYXllZCIsIlRvdGFsUGF5RGF5QW1vdW50IiwiRG91YmxlUGF5RGF5IiwiR2FtZXBsYXlVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJCdXNpbmVzc1NldHVwRGF0YSIsIkludmVzdFNlbGxTZXR1cFVJIiwiUGF5RGF5U2V0dXBVSSIsIlNlbGxCdXNpbmVzc1NldHVwVUkiLCJJbnZlc3RTZXR1cFVJIiwiQnV5T3JTZWxsU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2V0dXBVSSIsIlBvcFVwVUkiLCJHYW1lcGxheVVJU2NyZWVuIiwiRGVjaXNpb25TY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiT25lUXVlc3Rpb25TcGFjZVNjcmVlbiIsIk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJJc0JvdFR1cm4iLCJSZXNldFR1cm5WYXJpYWJsZSIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiYWN0aXZlIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIl9zdGF0ZSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsImlzRmlyc3RUaW1lIiwiaW5zaWRlR2FtZSIsIm1vZGVJbmRleCIsIkluaXRfQnVzaW5lc3NTZXR1cCIsIlBsYXllckRhdGEiLCJCdXNpbmVzc0luZm8iLCJDYXNoIiwiUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCIsImluZGV4IiwiUGxheWVyR2FtZUluZm8iLCJsZW5ndGgiLCJTdHVkZW50RGF0YSIsInVzZXJJRCIsIlBsYXllclVJRCIsIk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwiUGxheWVyTmFtZSIsIk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cCIsIkdldE9ial9CdXNpbmVzc1NldHVwIiwiVUlEIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIkJ1c2luZXNzVHlwZSIsIkVudW1CdXNpbmVzc1R5cGUiLCJub25lIiwiT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiSG9tZUJhc2VkIiwiT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJicmlja0FuZG1vcnRhciIsImFtb3VudCIsIkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCIsIl9sb2FuVGFrZW4iLCJfYnVzaW5lc3NJbmRleCIsIk5vT2ZCdXNpbmVzcyIsIkxvYW5UYWtlbiIsIlNob3dUb2FzdCIsIk1hdGgiLCJhYnMiLCJwYXJzZUludCIsImdldENvbXBvbmVudCIsIk9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsImV2ZW50IiwiT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCIsImkiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXAiLCJPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIl9kYXRhIiwiX0lEIiwiUGhvdG9uQWN0b3IiLCJhY3Rvck5yIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJNYXhQbGF5ZXJzIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJTdGFydFR1cm4iLCJQdXJjaGFzZUJ1c2luZXNzIiwiX2Ftb3VudCIsIl9idXNpbmVzc05hbWUiLCJfaXNIb21lQmFzZWQiLCJIb21lQmFzZWRBbW91bnQiLCJTdGFydEdhbWUiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIkV4aXRfQnVzaW5lc3NTZXR1cCIsIkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwIiwiX21vZGUiLCJHZXRTZWxlY3RlZE1vZGUiLCJSYWlzZUV2ZW50IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJHZXRUdXJuTnVtYmVyIiwiT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uIiwiX3BsYXllckluZGV4IiwibWFya2V0aW5nQW1vdW50IiwiTWFya2V0aW5nQW1vdW50IiwiT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIkxhd3llclN0YXR1cyIsIm9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJnZW5lcmF0ZWRMZW5ndGgiLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCIsIlJvbGxUd29EaWNlcyIsIkFzc2lnbkRhdGFfSW52ZXN0U2VsbCIsIk9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJvbGxEaWNlIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwidmFsdWUiLCJSZXNldEdvbGRJbnB1dCIsIm9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsIiwiVXBkYXRlRGF0YV9JbnZlc3RTZWxsIiwiX3RpdGxlIiwiX2RpY2VSZXN1bHQiLCJfcHJpY2VUaXRsZSIsIl9wcmljZVZhbHVlIiwiX2J1eU9yU2VsbFRpdGxlIiwiX3RvdGFsQW1vdW50VGl0bGUiLCJfdG90YWxBbW91bnRWYWx1ZSIsIl9idXR0b25OYW1lIiwiQXBwbHlCdXR0b25fSW52ZXN0U2VsbCIsIl9Ub3RhbEFtb3VudCIsIkV4aXRCdXR0b25fSW52ZXN0U2VsbCIsIlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkiLCJUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkiLCJVcGRhdGVCdXR0b25zX1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9tYW5hZ2VyIiwiX2xvYW4iLCJBc3NpZ25EYXRhX1BheURheSIsIl9pc0RvdWJsZVBheURheSIsIl9za2lwSE0iLCJfc2tpcEJNIiwiX2lzQm90IiwiX3RpbWUiLCJCTUxvY2F0aW9ucyIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGF5RGF5Q29tcGxldGVkIiwiT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RpY2UiLCJSb2xsT25lRGljZSIsIlJlY2VpdmVQYXltZW50X1BheURheSIsIl9Fc3RpbWF0ZUxvYW4iLCJTa2lwTG9hbk9uZVRpbWVfUGF5RGF5IiwiU2VsbEJ1c2luZXNzX1BheURheSIsIkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0TG9hblNjcmVlbl9QYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiY2FsbFVwb25DYXJkIiwiVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwIiwiX3RlbXBEYXRhIiwibm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0TmFtZSIsIlNldFR5cGUiLCJTZXRCdXNpbmVzc0luZGV4IiwiU2V0QnVzaW5lc3NNb2RlIiwiU2V0TW9kZSIsIlNldEJhbGFuY2UiLCJBbW91bnQiLCJTZXRMb2NhdGlvbnMiLCJMb2NhdGlvbnNOYW1lIiwiVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uIiwiZGVzdHJveSIsIl9pc1R1cm5vdmVyIiwiRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIlNldEludmVzdFVJX0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJIiwiVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9teURhdGEiLCJfYWN0b3JzRGF0YSIsIl9pc1R1cm5PdmVyIiwiX21vZGVJbmRleCIsImN1c3RvbVByb3BlcnRpZXMiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsInNldFBsYXllck5hbWUiLCJzZXRQbGF5ZXJVSUQiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRfT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfcXVlc3Rpb24iLCJtZXNzYWdlIiwidGltZSIsIlNlbGZUb2FzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxXQUFXLEdBQUcsSUFBbEI7QUFDQSxJQUFJQyx3QkFBd0IsR0FBQyxJQUE3QjtBQUNBLElBQUlDLG1CQUFtQixHQUFDLEVBQXhCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUMsRUFBckIsRUFDQTs7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3pCQyxFQUFB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NUIsT0FBTCxDQUFhc0UsUUFBYixDQUFzQixDQUF0QixFQUF5QkEsUUFBekIsQ0FBa0MsQ0FBbEMsRUFBcUNrQixZQUFyQyxDQUFrRHJOLEVBQUUsQ0FBQ2dCLEtBQXJELEVBQTREdUIsTUFBNUQsR0FBbUVpVyxPQUFuRTtBQUNBLFFBQUlFLFNBQVMsR0FBQyxJQUFkO0FBQ0F4TyxJQUFBQSxVQUFVLENBQUMsWUFBVTtBQUFHd08sTUFBQUEsU0FBUyxDQUFDN1EsT0FBVixDQUFrQjRCLE1BQWxCLEdBQXlCLEtBQXpCO0FBQWlDLEtBQS9DLEVBQWlEZ1AsSUFBakQsQ0FBVjtBQUNIO0FBempEMEIsQ0FBVCxDQUF0QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxOb2Rlcz1bXTtcclxudmFyIG9uZVF1ZXN0aW9uTm9kZXM9W107XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBhbW91bnQgb2YgbG9hbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTG9hbkFtb3VudEVudW0gPSBjYy5FbnVtKHtcclxuICAgIE5vbmU6MCxcclxuICAgIFRlblRob3VzYW5kOiAxMDAwMCwgICAgICAgICAgICAgICAgICBcclxuICAgIFRlbnR5VGhvdXNhbmQ6IDIwMDAwLFxyXG4gICAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gICAgRm9ydHlUaG91c2FuZDogNDAwMDAsXHJcbiAgICBGaWZ0eVRob3VzYW5kOiA1MDAwMCxcclxuICAgIE90aGVyOjZcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NTZXR1cFVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lVUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsfSxcclxuICAgIFBsYXllckNhc2hVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyQ2FzaFVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIGNhc2hcIix9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgIHRvb2x0aXA6XCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgdHlwZVwiLH0sXHJcbiAgICBCdXNpbmVzc05hbWVUZXh0VUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgdG9vbHRpcDpcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsfSxcclxuICAgIEJ1c2luZXNzVHlwZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1R5cGVMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIGZvciBidXNpbmVzcyB0eXBlIGVkaXRib3hcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJyZWZlcmVjZSBmb3IgYnVzaW5lc3MgbmFtZSBlZGl0Ym94XCIsfSxcclxuICAgIEhvbWVCYXNlZE5vZGVVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIix9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJOb2RlVUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrQW5kTW9ydGFyTm9kZVVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3NcIix9LFxyXG4gICAgVGltZXJVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGltZXJVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbGFiZWwgZm9yIHRpbWVyXCIsfSxcclxuICAgIFRpbWVyTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGltZXJOb2RlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSBmb3IgdGltZXIgbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwifSwgXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NTZXR1cE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnVzaW5lc3Mgc2V0dXBcIix9LFxyXG4gICAgTG9hblNldHVwTm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsfSxcclxuICAgIExvYW5BbW91bnQ6XHJcbiAgICB7XHJcbiAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgdHlwZTogTG9hbkFtb3VudEVudW0sXHJcbiAgICAgICAgZGVmYXVsdDogTG9hbkFtb3VudEVudW0uTm9uZSxcclxuICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgdG9vbHRpcDpcImxvYW4gYW1vdW50IHRha2VuIGJ5IHBsYXllciAoc3RhdGUgbWFjaGluZSlcIn0sIFxyXG4gICAgTG9hbkFtb3VudExhYmVsOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBhbGwgbGFiZWxzIG9mIGFtb3VudHMgaW4gbG9hbiBVSVwifSwgXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiV2FpdGluZ1N0YXR1c05vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwifSwgXHJcbiAgICBFeGl0QnV0dG9uTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvbk5vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBleGl0IGJ1dHRvbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCJ9LCBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yLy9cclxuICAgIH0sXHJcblxyXG4gICAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZz1uYW1lO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlR1cm5EZWNpc2lvblNldHVwVUlcIixcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYXJrZXRpbmdFZGl0Qm94OlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJNYXJrZXRpbmdFZGl0Qm94XCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgbWFya2V0aW5nIG5vZGVcIix9LFxyXG4gICAgR29sZEVkaXRCb3g6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkdvbGRFZGl0Qm94XCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IGdvbGQgbm9kZVwiLH0sIFxyXG4gICAgU3RvY2tFZGl0Qm94OlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTdG9ja0VkaXRCb3hcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3Qgc3RvY2sgbm9kZVwiLH0sXHJcbiAgICBDYXNoQW1vdW50TGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhc2hcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhwYW5kQnVzaW5lc3NOb2RlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSBmb3IgZXhwbmFkIGJ1c2luZXNzIG5vZGVcIn0sIFxyXG4gICAgRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIn0sICAgXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhwYW5kQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwifSwgICAgICAgICAgICAgXHJcbn0sXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7Ly9jb25zdHJ1Y3RvclxyXG4gICAgfSxcclxuXHJcbiAgICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nPW5hbWU7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBpbnZlc3RtZW50L2J1eSBhbmQgc2VsbC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0RW51bSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgU3RvY2tJbnZlc3Q6IDEsICAgICAgICAgICAgICAgICAgXHJcbiAgICBHb2xkSW52ZXN0OiAyLFxyXG4gICAgU3RvY2tTZWxsOiAzLFxyXG4gICAgR29sZFNlbGw6IDQsXHJcbiAgICBPdGhlcjo1XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0U2VsbFVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJJbnZlc3RTZWxsVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlIFJlc3VsdCBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgUHJpY2VUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQcmljZVRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgUHJpY2VWYWx1ZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQcmljZVZhbHVlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSB2YWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgQnV5T3JTZWxsVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnV5T3JTZWxsVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1eU9yU2VsbCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgVG90YWxBbW91bnRUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEFtb3VudFZhbHVlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBWYWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgQnV0dG9uTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXR0b25OYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBidXR0b24gbmFtZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgIEludmVzdFN0YXRlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJJbnZlc3RTdGF0ZVwiLFxyXG4gICAgICAgdHlwZTogSW52ZXN0RW51bSxcclxuICAgICAgIGRlZmF1bHQ6IEludmVzdEVudW0uTm9uZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZX0sXHJcbiAgICAgQW1vdW50RWRpdEJveDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQW1vdW50RWRpdEJveFwiLFxyXG4gICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWV9LFxyXG4gICAgICAgICAgXHJcbn0sXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7Ly9jb25zdHJ1Y3RvclxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJTZWxsQnVzaW5lc3NVSVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFNlbGwgbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwifSwgICBcclxuICAgIFBsYXllck5hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBTZWxsIG5vZGVcIn0sIFxyXG4gICAgQnVzaW5lc3NDb3VudExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwifSwgIFxyXG4gICAgU2Nyb2xsQ29udGVudE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwifSwgIFxyXG4gICAgQnVzaW5lc3NTZWxsUHJlZmFiOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwifSwgICAgXHJcbiAgICAgRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIn0sICBcclxuICAgICBUdXJuT3ZlckV4aXRCdXR0b246XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwifSwgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBheURheVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXlEYXlVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUGF5RGF5VUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwifSxcclxuICAgIEhvbWVCYXNlZE51bWJlckxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJIb21lQmFzZWROdW1iZXJcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZE51bWJlciBub2RlXCJ9LFxyXG4gICAgIEJNTnVtYmVyTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrTW9ydGFyTnVtYmVyXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhck51bWJlciBub2RlXCJ9LFxyXG4gICAgIEJNTnVtYmVyTG9jYXRpb25MYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIn0sXHJcbiAgICBIb21lQmFzZWRCdG46XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkhvbWVCYXNlZEJ0blwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWRCdG4gbm9kZVwifSxcclxuICAgIEJNQnRuOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja01vcnRhckJ0blwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckJ0biBub2RlXCJ9LFxyXG4gICAgTG9hbkJ0bjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hbkJ0blwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIn0sXHJcbiAgICBNYWluUGFuZWxOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJNYWluUGFuZWxOb2RlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIE1haW5QYW5lbCBub2RlXCJ9LFxyXG4gICAgUmVzdWx0UGFuZWxOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJSZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0UGFuZWwgbm9kZVwifSxcclxuICAgIExvYW5SZXN1bHRQYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCJ9LFxyXG4gICAgIFJlc3VsdFNjcmVlblRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlJlc3VsdFNjcmVlblRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRTY3JlZW5UaXRsZSBub2RlXCJ9LFxyXG4gICAgIERpY2VSZXN1bHRMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRGljZVJlc3VsdFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZVJlc3VsdCBub2RlXCJ9LFxyXG4gICBUb3RhbEJ1c2luZXNzTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsQnVzaW5lc3NMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxCdXNpbmVzcyBub2RlXCJ9LFxyXG4gICAgVG90YWxBbW91bnRMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxBbW91bnRMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgbm9kZVwifSxcclxuICAgIFNraXBMb2FuQnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCJ9LFxyXG4gICBMb2FuRm90dGVyTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIn0sXHJcbiAgICAgICAgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0VUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkludmVzdFVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgSW52ZXN0IG5vZGVcIn0sICAgXHJcbiAgICBDYXNoTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhc2hMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBJbnZlc3Qgbm9kZVwifSwgICBcclxuICAgIFBsYXllck5hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwifSwgXHJcbiAgICAgRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwifSwgIFxyXG4gICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIn0sICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkJ1eU9yU2VsbFVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgQnV5T3JTZWxsIG5vZGVcIn0sICAgXHJcbiAgICBDYXNoTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhc2hMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwifSwgICBcclxuICAgIFBsYXllck5hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBCdXlPclNlbGwgbm9kZVwifSwgXHJcbiAgICAgRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwifSwgIFxyXG4gICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIn0sICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBPbmVRdWVzdGlvblVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBPbmVRdWVzdGlvblVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJPbmVRdWVzdGlvblVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sICAgXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgXHJcbiAgICAgRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgXHJcbiAgICAgVHVybk92ZXJFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LFxyXG4gICBQbGF5ZXJEZXRhaWxMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sIFxyXG4gICAgRGV0YWlsc1ByZWZhYjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRGV0YWlsc1ByZWZhYlwiLFxyXG4gICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBEZXRhaWxzUHJlZmFiIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sICBcclxuICAgIFNjcm9sbENvbnRlbnQ6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIFNjcm9sbENvbnRlbnQgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgXHJcbiAgICBXYWl0aW5nU2NyZWVuOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJXYWl0aW5nU2NyZWVuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbiBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkRlY2lzaW9uVGl0bGVMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgICBcclxuICAgIERlY2lzaW9uQ2FzaExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEZWNpc2lvbkNhc2hMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgIFxyXG4gICAgRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgICBcclxuICAgIERlY2lzaW9uUXVlc3Rpb25MYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRGVjaXNpb25RdWVzdGlvbkxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgcXVlc3Rpb24gb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBHYW1lcGxheVVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YUludGFuY2U7XHJcbnZhciBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlO1xyXG52YXIgUmVxdWlyZWRDYXNoO1xyXG52YXIgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXA9LTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbi8vdHVybiBkZWNpc2lvbnNcclxudmFyIFRlbXBNYXJrZXRpbmdBbW91bnQ9XCJcIjtcclxudmFyIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4vL2J1eW9yc2VsbFxyXG52YXIgR29sZENhc2hBbW91bnQ9XCJcIjtcclxudmFyIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG52YXIgU3RvY2tCdXNpbmVzc05hbWU9XCJcIjtcclxudmFyIERpY2VSZXN1bHQ7XHJcbnZhciBPbmNlT3JTaGFyZTtcclxudmFyIExvY2F0aW9uTmFtZT1cIlwiO1xyXG5cclxudmFyIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQ9ZmFsc2U7XHJcbnZhciBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQ9ZmFsc2U7XHJcbnZhciBMb2FuUGF5ZWQ9ZmFsc2U7XHJcbnZhciBUb3RhbFBheURheUFtb3VudD0wO1xyXG52YXIgRG91YmxlUGF5RGF5PWZhbHNlO1xyXG5cclxudmFyIEdhbWVwbGF5VUlNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJHYW1lcGxheVVJTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIEJ1c2luZXNzU2V0dXBEYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEJ1c2luZXNzU2V0dXBVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIEJ1c2luZXNzU2V0dXBVSSBjbGFzc1wifSxcclxuICAgICAgICBUdXJuRGVjaXNpb25TZXR1cFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFR1cm5EZWNpc2lvblNldHVwVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBUdXJuRGVjaXNpb25TZXR1cFVJIGNsYXNzXCJ9LFxyXG4gICAgICAgIEludmVzdFNlbGxTZXR1cFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEludmVzdFNlbGxVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLH0sICBcclxuICAgICAgICBQYXlEYXlTZXR1cFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFBheURheVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsfSwgIFxyXG4gICAgICAgIFNlbGxCdXNpbmVzc1NldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDp7fSwgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBTZWxsQnVzaW5lc3NVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIFNlbGxCdXNpbmVzc1VJIGNsYXNzXCIsfSwgIFxyXG4gICAgICAgIEludmVzdFNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDp7fSwgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBJbnZlc3RVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIEludmVzdFVJIGNsYXNzXCIsfSwgICAgXHJcbiAgICAgICAgQnV5T3JTZWxsU2V0dXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Ont9LCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEJ1eU9yU2VsbFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgQnV5T3JTZWxsVUkgY2xhc3NcIix9LCAgICAgICBcclxuICAgICAgICBPbmVRdWVzdGlvblNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDp7fSwgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBPbmVRdWVzdGlvblVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgT25lUXVlc3Rpb25VSSBjbGFzc1wiLH0sICAgICAgIFxyXG4gICAgICAgIFBvcFVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIix9LCAgIFxyXG4gICAgICAgIEJ1c2luZXNzU2V0dXBOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIix9LCAgXHJcbiAgICAgICAgR2FtZXBsYXlVSVNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsfSwgICBcclxuICAgICAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgRGVjaXNpb24gc2NyZWVuXCIsfSwgICAgXHJcbiAgICAgICAgSW52ZXN0U2VsbFNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIix9LCAgICBcclxuICAgICAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIFBheURheSBzY3JlZW5cIix9LCAgICBcclxuICAgICAgICBTZWxsQnVzaW5lc3NTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGxCdXNpbmVzcyBzY3JlZW5cIix9LCAgXHJcbiAgICAgICAgSW52ZXN0U2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3Qgc2NyZWVuXCIsfSwgIFxyXG4gICAgICAgIEJ1eU9yU2VsbFNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgQnV5T3JTZWxsIHNjcmVlblwiLH0sICBcclxuICAgICAgICBPbmVRdWVzdGlvblNwYWNlU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvblNwYWNlIHNjcmVlblwiLH0sICBcclxuICAgICAgICBPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvbkRlY2lzaW9uIHNjcmVlblwiLH0sICBcclxuICAgICAgICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJsYWJlbCByZWZlcmVuY2UgZm9yIGRpY2VcIix9LCAgIFxyXG4gICAgICAgICBMZWF2ZVJvb21CdXR0b246IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAgb25Mb2FkICgpIHtcclxuICAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTsgXHJcblxyXG4gICAgICAgICAvL2xvY2FsIHZhcmlhYmxlc1xyXG4gICAgICAgICB0aGlzLkdvbGRJbnZlc3RlZD1mYWxzZTtcclxuICAgICAgICAgdGhpcy5Hb2xkU29sZD1mYWxzZTtcclxuICAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLlN0b2NrU29sZD1mYWxzZTtcclxuICAgICAgICAgdGhpcy5Jc0JvdFR1cm49ZmFsc2U7XHJcblxyXG4gICAgIH0sXHJcblxyXG4gICAgIFJlc2V0VHVyblZhcmlhYmxlKClcclxuICAgICB7XHJcbiAgICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZD1mYWxzZTtcclxuICAgICAgICB0aGlzLlN0b2NrSW52ZXN0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQ9ZmFsc2U7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG5cclxuICAgICAgICBpZighR2FtZU1hbmFnZXIgfHwgR2FtZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkIFxyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdTeW5jRGF0YScsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoJ1N5bmNEYXRhJywgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgLy8jcmVnaW9uIFNwZWN0YXRlIFVJIFNldHVwXHJcbiAgICBJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb21CdXR0b24uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIlNwbGFzaFwiKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gQnVzaW5lc3NTZXR1cCB3aXRoIGxvYW5cclxuICAgIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsaW5zaWRlR2FtZT1mYWxzZSxtb2RlSW5kZXg9MCkgeyAvL2NhbGxlZCBmaXJzdCB0aW1lIGZvcm0gR2FtZU1hbmFnZXIgb25sb2FkIGZ1bmN0aW9uXHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLGluc2lkZUdhbWUsbW9kZUluZGV4KTtcclxuICAgIH0sXHJcbiAgICBJbml0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSxpbnNpZGVHYW1lPWZhbHNlLG1vZGVJbmRleD0wKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2U9bmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlPW5ldyBHYW1lTWFuYWdlci5CdXNpbmVzc0luZm8oKTtcclxuICAgICAgIFxyXG4gICAgICAgIGlmKGlzRmlyc3RUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPTIwMDAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5SZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgICAgIGlmKGluc2lkZUdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD1pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoKTsgIFxyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXA9LTE7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpOyBcclxuICAgICAgICB9IFxyXG4gICAgfSwgXHJcbiAgICBHZXRPYmpfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gICAgfSxcclxuICAgIE9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKG5hbWUpO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWU9bmFtZTtcclxuICAgIH0sXHJcbiAgICBPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEPVVJRDtcclxuICAgIH0sXHJcbiAgICBPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUk9bmFtZTtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uPW5hbWU7XHJcbiAgICAgICBcclxuICAgIH0sXHJcbiAgICBPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUk9bmFtZTtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZT1uYW1lO1xyXG4gICAgfSxcclxuICAgIFJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZUxhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lTGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVUZXh0VUk9XCJcIjtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVST1cIlwiO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUubm9uZTtcclxuICAgIH0sXHJcbiAgICBPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICAgIH0sXHJcbiAgICBPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPXRydWU7XHJcblxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXI7XHJcbiAgICB9LFxyXG4gICAgT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oYW1vdW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZz1cIiRcIithbW91bnQ7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1hbW91bnQ7XHJcbiAgICB9LFxyXG4gICAgQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGFtb3VudClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9MDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmKFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICBfYnVzaW5lc3NJbmRleD1pbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoX2xvYW5UYWtlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgYWxyZWFkeSB0YWtlbiBsb2FuIG9mICRcIitQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID49YW1vdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBSZXF1aXJlZENhc2g9TWF0aC5hYnMocGFyc2VJbnQoUGxheWVyRGF0YUludGFuY2UuQ2FzaCktYW1vdW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFswXS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIiRcIitSZXF1aXJlZENhc2g7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIE9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT09R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDUwMDAwKTtcclxuICAgICAgICB9ZWxzZSBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT09R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCgxMDAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHNlbGVjdCBidXNpbmVzcyBiZXR3ZWVuIEhvbWUgQmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyLiBcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZT1mYWxzZTsgIFxyXG4gICAgfSxcclxuICAgIEhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihpbmRleClcclxuICAgIHtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsLmxlbmd0aDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihpbmRleD09aSlcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMCk7XHJcblxyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uVGVuVGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMSk7XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5UZW50eVRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDIpO1xyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uVGhpcnR5VGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMyk7XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5Gb3J0eVRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDQpO1xyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uRmlmdHlUaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg1KTtcclxuICAgIH0sXHJcbiAgICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9PUxvYW5BbW91bnRFbnVtLk90aGVyKVxyXG4gICAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ9UmVxdWlyZWRDYXNoO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50PXBhcnNlSW50KHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCk7XHJcblxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgdGhpcy5PbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1QbGF5ZXJEYXRhSW50YW5jZS5DYXNoK1BsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpXHJcbiAgICB9LFxyXG5cclxuICAgIFN5bmNEYXRhOmZ1bmN0aW9uKF9kYXRhLF9JRClcclxuICAgIHtcclxuICAgICAgICBpZihfSUQhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5hY3Rvck5yKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChfZGF0YSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg+PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vc2V0dGluZyByb29tIHByb3BlcnR5IHRvIGRlY2xhcmUgaW5pdGlhbCBzZXR1cCBoYXMgYmVlblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsdHJ1ZSx0cnVlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBQdXJjaGFzZUJ1c2luZXNzOmZ1bmN0aW9uKF9hbW91bnQsX2J1c2luZXNzTmFtZSxfaXNIb21lQmFzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUGxheWVyRGF0YUludGFuY2UuQ2FzaDxfYW1vdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vdCBlbm91Z2ggY2FzaCB0byBidXkgdGhpcyBcIitfYnVzaW5lc3NOYW1lK1wiIGJ1c2luZXNzLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfaXNIb21lQmFzZWQpXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIGlmKFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudDwzKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPVBsYXllckRhdGFJbnRhbmNlLkNhc2gtX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nPVwiJFwiK1BsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRHYW1lPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFydEdhbWU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPVBsYXllckRhdGFJbnRhbmNlLkNhc2gtX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmc9XCIkXCIrUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0R2FtZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaC1QbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIlJldmVydGluZyBiYWNrIGxvYW4gYW1vdW50LlwiLDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tb2RlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICBpZihfbW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vc2V0dGluZyBwbGF5ZXIgY3VycmVudCBkYXRhIGluIGN1c3RvbSBwcm9wZXJ0aWVzIHdoZW4gaGlzL2hlciB0dXJuIG92ZXJzXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfbW9kZT09MSkvL2ZvciBBSVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuICAgICAgICAgICAgfSwgMTYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJubyBtb2RlIHNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF09UGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXA9LTE7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFBheUFtb3VudFRvUGxheUdhbWU6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lPWZhbHNlO1xyXG5cclxuICAgICAgICBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uPT1cIlwiKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIHR5cGUuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWU9PVwiXCIpXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKSAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGhvbWViYXNzZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCxcImhvbWVcIix0cnVlKTtcclxuICAgICAgICAgICAgZWxzZSBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT09R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcikgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBicmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoNTAwMDAsXCJicmljayBhbmQgbW9ydGFyXCIsZmFsc2UpO1xyXG5cclxuICAgICAgICBpZih0aGlzLlN0YXJ0R2FtZT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgaWYoSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAhPS0xKSAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICAgICAgZWxzZSAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgYmVlbiBjYWxsZWQgYXQgc3RhcnQgb2YgZ2FtZSBhcyBpbml0aWFsIHNldHVwXHJcbiAgICAgICAgICAgICAgICB0aGlzLkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgICAgICAgICAvL3BydGludGluZyBhbGwgdmFsdWVzIHRvIGNvbnNvbGVcclxuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO2krKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbmFtZTogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgSUQ6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJcyBwbGF5ZXIgYm90OiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uSXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyBvZiBidXNpbmVzcyBvZiBwbGF5ZXIgKHNlZSBiZWxvdyk6IFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY2FzaDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkNhc2gpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgdGFrZW4gbG9hbjogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5UYWtlbik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2VuIGxvYW4gYW1vdW50OiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgICAvL1R1cm5EZWNpc2lvblNldHVwVUkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoaXNhY3RpdmUpIHtcclxuICAgICAgICB0aGlzLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZT1pc2FjdGl2ZTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQ2FzaEFtb3VudExhYmVsLnN0cmluZz1cIiQgXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLkNhc2g7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudD1hbW91bnQ7XHJcbiAgICB9LCBcclxuXHJcbiAgICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKFRlbXBNYXJrZXRpbmdBbW91bnQ9PVwiXCIgfHwgVGVtcE1hcmtldGluZ0Ftb3VudD09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXRpbmdBbW91bnQ9cGFyc2VJbnQoVGVtcE1hcmtldGluZ0Ftb3VudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9pZiBwbGF5ZXIgZW50ZXJlZCBhbW91bnQgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIGNhc2ggaGUgb3duc1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj0gdGhpcy5tYXJrZXRpbmdBbW91bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC0gdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50K3RoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50K1wiICwgcmVtYWluaW5nIGNhc2ggaXMgJFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIE9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBpZiBwbGF5ZXIgaGFzIG1vcmUgdGhhbiA1MDAwJFxyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PTUwMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM9dHJ1ZTtcclxuICAgICAgICAgICAgVGVtcEhpcmluZ0xhd3llcj10cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wSGlyaW5nTGF3eWVyKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLTUwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLCByZW1haW5pbmcgY2FzaCBpcyAkXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtcIi5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJzb3JyeSwgeW91IGRvbnQgaGF2ZSBlbm91Z2ggbW9uZXkgdG8gaGlyZSBhIGxhd3llci5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSlcclxuICAgIHtcclxuICAgICAgICBMb2NhdGlvbk5hbWU9X25hbWU7XHJcbiAgICB9LFxyXG4gICAgT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhcyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGhlIGNvdWxkIGV4cGFuZCBpdFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdmFyIGdlbmVyYXRlZExlbmd0aD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICBpZihnZW5lcmF0ZWRMZW5ndGg9PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgdG8gZXhwYW5kLlwiLDE1MDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxNjAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgTG9jYXRpb25OYW1lPVwiXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgICAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSx0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICAgICAgR29sZENhc2hBbW91bnQ9YW1vdW50O1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuR29sZEludmVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPUludmVzdEVudW0uR29sZEludmVzdDtcclxuICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgIE9uY2VPclNoYXJlPShEaWNlUmVzdWx0KjEwMDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICAgICAgICBcIkludmVzdCBJbiBHT0xEXCIsXHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIi9vdW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIiw4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sIFxyXG5cclxuICAgIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBTdG9ja0J1c2luZXNzTmFtZT1uYW1lO1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZighdGhpcy5TdG9ja0ludmVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBpZihTdG9ja0J1c2luZXNzTmFtZT09XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLlN0b2NrSW52ZXN0O1xyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgICAgICAgICAgICBcIkludmVzdCBpbiBTdG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiL3NoYXJlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBCVVlcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIqMD0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJCVVlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuR29sZFNvbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdvbGRTb2xkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgICAgICAgICAgICBcIlNlbGwgR09MRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIvb3VuY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLlN0b2NrU29sZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b2NrU29sZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9SW52ZXN0RW51bS5TdG9ja1NlbGw7XHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlPShEaWNlUmVzdWx0KjEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiU2VsbCBTVE9DS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFYWNoIHNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiL3NoYXJlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBzaGFyZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIndvcmsgaW4gcHJvZ3Jlc3MsIGNvbWluZyBzb29uLi4uXCIpO1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyb2xsIHRoZSBkaWNlXCIpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbERpY2UoKTtcclxuICAgIH0sIFxyXG5cclxuICAgIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgLy90aGlzLlRlbXBEaWNlVGV4dC5zdHJpbmc9dmFsdWU7XHJcbiAgICB9LCBcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gSW52ZXN0IGFuZCBzZWxsIG1vZGR1bGVcclxuXHJcbiAgICBSZXNldEdvbGRJbnB1dCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkdvbGRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgIEdvbGRDYXNoQW1vdW50PVwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlN0b2NrRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICBTdG9ja0J1c2luZXNzTmFtZT1cIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbChfYW1vdW50KVxyXG4gICAge1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1fYW1vdW50O1xyXG5cclxuICAgICAgICBpZihFbnRlckJ1eVNlbGxBbW91bnQ9PVwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgIHZhciBfYW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlK1wiKlwiK0VudGVyQnV5U2VsbEFtb3VudCtcIj1cIitfYW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIHRoaXMuUmVzZXRHb2xkSW5wdXQoKTtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBBc3NpZ25EYXRhX0ludmVzdFNlbGwoX3RpdGxlLF9kaWNlUmVzdWx0LF9wcmljZVRpdGxlLF9wcmljZVZhbHVlLF9idXlPclNlbGxUaXRsZSxfdG90YWxBbW91bnRUaXRsZSxfdG90YWxBbW91bnRWYWx1ZSxfYnV0dG9uTmFtZSxfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1fdGl0bGU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlUmVzdWx0O1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VUaXRsZUxhYmVsLnN0cmluZz1fcHJpY2VUaXRsZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVmFsdWVMYWJlbC5zdHJpbmc9X3ByaWNlVmFsdWU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXlPclNlbGxUaXRsZUxhYmVsLnN0cmluZz1fYnV5T3JTZWxsVGl0bGU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFRpdGxlTGFiZWwuc3RyaW5nPV90b3RhbEFtb3VudFRpdGxlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZz1fdG90YWxBbW91bnRWYWx1ZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1dHRvbk5hbWVMYWJlbC5zdHJpbmc9X2J1dHRvbk5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZURhdGFfSW52ZXN0U2VsbChfdG90YWxBbW91bnRWYWx1ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmc9X3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIEFwcGx5QnV0dG9uX0ludmVzdFNlbGwoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEVudGVyQnV5U2VsbEFtb3VudD09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9PUludmVzdEVudW0uR29sZEludmVzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBfVG90YWxBbW91bnQ9T25jZU9yU2hhcmUqX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgIGlmKF9Ub3RhbEFtb3VudDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLV9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCtfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIitfYW1vdW50K1wiIG91bmNlcyBvZiBHT0xEXCIsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqMD0wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9PUludmVzdEVudW0uR29sZFNlbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICBpZihfYW1vdW50PD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudC1fYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIrX2Ftb3VudCtcIiBvdW5jZXMgb2YgR09MRCBmb3IgICRcIitfVG90YWxBbW91bnQsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqMD0wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBHT0xEIG91bmNlcywgeW91IG93biBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQrXCIgb2YgR09MRCBvdW5jZXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPT1JbnZlc3RFbnVtLlN0b2NrSW52ZXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD1wYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgaWYoX1RvdGFsQW1vdW50PD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQrX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAvL2NhbiBhZGQgbXVsdGlwbGUgc3RvY2tzIHdpdGggYnVzaW5lc3MgbmFtZSBpbiBvYmplY3QgaWYgcmVxdWlyZWRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiK19hbW91bnQrXCIgc2hhcmVzIG9mIGJ1c2luZXNzIFwiK1N0b2NrQnVzaW5lc3NOYW1lLDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqMD0wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9PUludmVzdEVudW0uU3RvY2tTZWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD1wYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihfYW1vdW50PD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfVG90YWxBbW91bnQ9T25jZU9yU2hhcmUqX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoK19Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50LV9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIrX2Ftb3VudCtcIiBzaGFyZXMgb2Ygc3RvY2sgZm9yICAkXCIrX1RvdGFsQW1vdW50LDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqMD0wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBzdG9ja3Mgc2hhcmVzLCB5b3Ugb3duIFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQrXCIgb2Ygc3RvY2sgc2hhcmVzXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0QnV0dG9uX0ludmVzdFNlbGwoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIFBheWRheSBvciBEb3VibGUgcGF5IERheVxyXG4gICAgVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LEJNQW1vdW50LGxvYW5UYWtlbilcclxuICAgIHtcclxuICAgICAgICBpZihITUFtb3VudD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPXRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihCTUFtb3VudD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFsb2FuVGFrZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2FuUGF5ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2FuUGF5ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgR2V0TG9hbkFtb3VudF9QYXlEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB2YXIgX2xvYW49MDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9sb2FuPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9sb2FuO1xyXG4gICAgfSxcclxuXHJcbiAgICBBc3NpZ25EYXRhX1BheURheShfdGl0bGUsX2lzRG91YmxlUGF5RGF5PWZhbHNlLF9za2lwSE09ZmFsc2UsX3NraXBCTT1mYWxzZSxfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm49X2lzQm90O1xyXG4gICAgICAgIERvdWJsZVBheURheT1faXNEb3VibGVQYXlEYXk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1fdGl0bGU7XHJcblxyXG4gICAgICAgIHZhciBfdGltZT0xODAwO1xyXG5cclxuICAgICAgICBpZihfaXNCb3Q9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICAgICAgaWYoX3NraXBITSAmJiBfc2tpcEJNKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsX3RpbWUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKF9za2lwSE0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLF90aW1lKTtcclxuICAgICAgICAgICAgZWxzZSBpZihfc2tpcEJNKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsX3RpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgICAgICBpZihfc2tpcEhNICYmIF9za2lwQk0pXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NraXBITSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKF9za2lwQk0pXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBITUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgdmFyIEJNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUxvY2F0aW9ucz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9MDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICBfYnVzaW5lc3NJbmRleD1pbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvYW5UYWtlbj1fbG9hblRha2VuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmc9SE1BbW91bnQ7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTGFiZWwuc3RyaW5nPUJNQW1vdW50O1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxvY2F0aW9uTGFiZWwuc3RyaW5nPUJNTG9jYXRpb25zO1xyXG5cclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfbG9hbj10aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nPVwiKnBheSAkXCIrX2xvYW47XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nPVwiKnBheSAkNTAwMFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZihfc2tpcEhNICYmIF9za2lwQk0pXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwwLGxvYW5UYWtlbik7XHJcbiAgICAgICAgZWxzZSBpZihfc2tpcEhNKVxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsQk1BbW91bnQsbG9hblRha2VuKTtcclxuICAgICAgICBlbHNlIGlmKF9za2lwQk0pXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsMCxsb2FuVGFrZW4pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCxCTUFtb3VudCxsb2FuVGFrZW4pO1xyXG5cclxuICAgICAgICBpZihfc2tpcEJNIHx8IF9za2lwSE0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgIH0sIChfdGltZSsyMDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKF9pc0JvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5PbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgICAgICBpZighRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nPVwiUGF5RGF5XCI7XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nPVwiRG91YmxlUGF5RGF5XCI7XHJcblxyXG4gICAgICAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgIHZhciBITUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICAgdmFyIF9kaWNlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsT25lRGljZSgpO1xyXG5cclxuICAgICAgICAgICBpZighRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgVG90YWxQYXlEYXlBbW91bnQ9KEhNQW1vdW50Kl9kaWNlKSoxMDAwO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PTIqKEhNQW1vdW50Kl9kaWNlKSoxMDAwO1xyXG5cclxuXHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmc9X2RpY2U7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmc9SE1BbW91bnQ7XHJcblxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrSE1BbW91bnQrXCIqXCIrXCIxMDAwPVwiK1RvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZz1fZGljZStcIipcIitITUFtb3VudCtcIipcIitcIjEwMDAqMj1cIitUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuSXNCb3RUdXJuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlY2VpdmVQYXltZW50X1BheURheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIlBheURheVwiO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgIHZhciBfYW1vdW50PUJNQW1vdW50K0JNTG9jYXRpb25zO1xyXG4gICAgICAgICAgIHZhciBfZGljZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PShfYW1vdW50Kl9kaWNlKSoyMDAwO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PTIqKF9hbW91bnQqX2RpY2UpKjIwMDA7XHJcblxyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nPV9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrX2Ftb3VudCtcIipcIitcIjIwMDA9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK19hbW91bnQrXCIqXCIrXCIyMDAwKjI9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLklzQm90VHVybilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCkgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUxvYW5QYXllZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHZhciAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7ICAgXHJcbiAgICAgICAgICAgIHZhciBfRXN0aW1hdGVMb2FuPTA7XHJcblxyXG4gICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgICAgICAgIF9Fc3RpbWF0ZUxvYW49dGhpcy5HZXRMb2FuQW1vdW50X1BheURheSgpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBfRXN0aW1hdGVMb2FuPTUwMDA7XHJcblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj1fRXN0aW1hdGVMb2FuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2FuUGF5ZWQ9dHJ1ZTsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtX0VzdGltYXRlTG9hbjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9idXNpbmVzc0luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQtX0VzdGltYXRlTG9hbjtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDw9MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudD1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuU2tpcExvYW5CdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVQYXltZW50X1BheURheSgpIC8vYWxsXHJcbiAgICB7XHJcbiAgICAgICAgdmFyICBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMuSXNCb3RUdXJuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJBbW91bnQgJFwiK1RvdGFsUGF5RGF5QW1vdW50K1wiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwxNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICAgICAgICB9LCAxNTUwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbW91bnQgJFwiK1RvdGFsUGF5RGF5QW1vdW50K1wiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNraXBMb2FuT25lVGltZV9QYXlEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc2tpcHBlZCB0aGUgbG9hbiBwYXltZW50LCBiYW5rIHdpbGwgY2FsbCB1cG9uIGNvbXBsZXRlIGxvYW4gYW1vdW50IG9uIG5leHQgcGF5ZGF5XCIsMjAwMCk7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgTG9hblBheWVkPXRydWU7IFxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICAgIExvYW5QYXllZD10cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsQnVzaW5lc3NfUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdExvYW5TY3JlZW5fUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIFBheURheUNvbXBsZXRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCAmJiBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgJiYgTG9hblBheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBwYXlkYXkgZG9uZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBTZWxsIEJ1c2luZXNzIFVJXHJcbiAgICBUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YT1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmc9XCJTRUxMXCI7XHJcbiAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZz1cIk5vIG9mIEJ1c2luZXNzZXMgOiBcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBpZihfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aD09MClcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxufSxcclxuXHJcbiAgICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNUdXJub3ZlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgfSwgIFxyXG4gICAgXHJcbiAgICBFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LCBcclxuICAgICAgICBcclxuXHJcbiAgXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIEludmVzdCBVSVxyXG4gICAgVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIEVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgICB9LFxyXG4gICAgU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nPVwiSU5WRVNUXCI7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICAgICAgaWYoX2lzVHVybm92ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICAgIFRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1eU9yU2VsbFNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gICAgfSxcclxuICAgIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1cIkJVWSBPUiBTRUxMXCI7XHJcbiAgICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICAgICAgaWYoX2lzVHVybm92ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8vI3JlZ2lvbiBPbmUgUXVlc3Rpb24gc2V0dXAgVWlcclxuICAgIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuV2FpdGluZ1NjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLF9hY3RvcnNEYXRhLF9pc1R1cm5PdmVyLF9tb2RlSW5kZXg9MClcclxuICAgIHtcclxuICAgICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1cIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9XCIkXCIrX215RGF0YS5DYXNoO1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmc9X215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZz1cIk5vIG9mIFBsYXllcnM6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmKF9tb2RlSW5kZXg9PTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKSAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9teURhdGEuUGxheWVyVUlEIT1fYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfbW9kZUluZGV4PT0xKS8vZm9yIGJvdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9teURhdGEuUGxheWVyVUlEIT1fYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIikuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihfaXNUdXJuT3ZlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9uZVF1ZXN0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTsgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH0sXHJcbiAgICBcclxuXHJcbiAgICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfcXVlc3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25UaXRsZUxhYmVsLnN0cmluZz1cIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uQ2FzaExhYmVsLnN0cmluZz1cIiRcIitfbXlEYXRhLkNhc2g7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9teURhdGEuUGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nPVwiUGxheWVyIGhhcyBhc2tlZCBpZiBcIitfcXVlc3Rpb24rXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgIFwiKmVpdGhlciBhbnN3ZXIgcXVlc3Rpb24gb3IgcGF5ICQ1MDAwIHRvIHBsYXllciB3aG9zZSBhc2tpbmcgcXVlc3Rpb24uXCI7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBTaG93VG9hc3Q6ZnVuY3Rpb24obWVzc2FnZSx0aW1lPTIyNTApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSS5jaGlsZHJlblsyXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1tZXNzYWdlO1xyXG4gICAgICAgIHZhciBTZWxmVG9hc3Q9dGhpcztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmU9ZmFsc2U7IH0sIHRpbWUpO1xyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=