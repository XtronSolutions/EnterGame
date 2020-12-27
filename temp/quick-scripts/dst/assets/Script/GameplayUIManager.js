
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
  StartNewBusiness_BusinessSetup: function StartNewBusiness_BusinessSetup(isFirstTime, insideGame) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;
    this.Init_BusinessSetup(isFirstTime, insideGame);
  },
  Init_BusinessSetup: function Init_BusinessSetup(isFirstTime, insideGame) {
    if (insideGame === void 0) {
      insideGame = false;
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
    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(PlayerDataIntance); //setting player current data in custom properties when his/her turn overs

    GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", PlayerDataIntance);
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(1, PlayerDataIntance);
    this.BusinessSetupData.WaitingStatusNode.active = true;
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
    var _this = this;

    //if player has brick and mortar business he could expand it
    console.log("expand business");
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = true;
    var generatedLength = GamePlayReferenceManager.Instance.Get_GameManager().GenerateExpandBusiness_Prefabs_TurnDecision();

    if (generatedLength == 0) {
      this.ShowToast("You have no brick and mortar business to expand.", 1500);
      setTimeout(function () {
        _this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
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
    var _this2 = this;

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
            _this2.ToggleInvestSellScreen_InvestSell(false);
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
            _this2.ToggleInvestSellScreen_InvestSell(false);
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
            _this2.ToggleInvestSellScreen_InvestSell(false);
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
            _this2.ToggleInvestSellScreen_InvestSell(false);
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
  AssignData_PayDay: function AssignData_PayDay(_title, _isDoublePayDay, _skipHM, _skipBM) {
    var _this3 = this;

    if (_isDoublePayDay === void 0) {
      _isDoublePayDay = false;
    }

    if (_skipHM === void 0) {
      _skipHM = false;
    }

    if (_skipBM === void 0) {
      _skipBM = false;
    }

    DoublePayDay = _isDoublePayDay;
    this.TogglePayDayScreen_PayDay(true);
    this.PayDaySetupUI.TitleLabel.string = _title;
    var _time = 1800; //check skip payday variables

    if (_skipHM && _skipBM) this.ShowToast("your payday on home based and brick & mortar businessess will be skipped.", _time);else if (_skipHM) this.ShowToast("your payday on home based businessess will be skipped.", _time);else if (_skipBM) this.ShowToast("your payday on brick & mortar businessess will be skipped.", _time);

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
        _this3.PayDayCompleted();
      }, _time + 200);
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
    var _this4 = this;

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + TotalPayDayAmount;
    this.ShowToast("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash, 1500);
    setTimeout(function () {
      _this4.ToggleResultPanelScreen_PayDay(false);

      _this4.PayDayCompleted();
    }, 1550);
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
  SetUpSpaceScreen_OneQuestionSetupUI: function SetUpSpaceScreen_OneQuestionSetupUI(_myData, _actorsData, _isTurnOver) {
    this.OneQuestionSetupUI.TitleLabel.string = "ONE QUESTION";
    this.OneQuestionSetupUI.CashLabel.string = "$" + _myData.Cash;
    this.OneQuestionSetupUI.PlayerNameLabel.string = _myData.PlayerName;
    this.OneQuestionSetupUI.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJFeGl0QnV0dG9uIiwiVHVybk92ZXJFeGl0QnV0dG9uIiwiUGF5RGF5VUkiLCJIb21lQmFzZWROdW1iZXJMYWJlbCIsIkJNTnVtYmVyTGFiZWwiLCJCTU51bWJlckxvY2F0aW9uTGFiZWwiLCJIb21lQmFzZWRCdG4iLCJCTUJ0biIsIkxvYW5CdG4iLCJNYWluUGFuZWxOb2RlIiwiUmVzdWx0UGFuZWxOb2RlIiwiTG9hblJlc3VsdFBhbmVsTm9kZSIsIlJlc3VsdFNjcmVlblRpdGxlTGFiZWwiLCJUb3RhbEJ1c2luZXNzTGFiZWwiLCJUb3RhbEFtb3VudExhYmVsIiwiU2tpcExvYW5CdXR0b24iLCJMb2FuRm90dGVyTGFiZWwiLCJJbnZlc3RVSSIsIkJ1eU9yU2VsbFVJIiwiT25lUXVlc3Rpb25VSSIsIlBsYXllckRldGFpbExhYmVsIiwiRGV0YWlsc1ByZWZhYiIsIlNjcm9sbENvbnRlbnQiLCJXYWl0aW5nU2NyZWVuIiwiRGVjaXNpb25UaXRsZUxhYmVsIiwiRGVjaXNpb25DYXNoTGFiZWwiLCJEZWNpc2lvblBsYXllck5hbWVMYWJlbCIsIkRlY2lzaW9uUXVlc3Rpb25MYWJlbCIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCIsIkJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCIsIkxvYW5QYXllZCIsIlRvdGFsUGF5RGF5QW1vdW50IiwiRG91YmxlUGF5RGF5IiwiR2FtZXBsYXlVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJCdXNpbmVzc1NldHVwRGF0YSIsIkludmVzdFNlbGxTZXR1cFVJIiwiUGF5RGF5U2V0dXBVSSIsIlNlbGxCdXNpbmVzc1NldHVwVUkiLCJJbnZlc3RTZXR1cFVJIiwiQnV5T3JTZWxsU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2V0dXBVSSIsIlBvcFVwVUkiLCJHYW1lcGxheVVJU2NyZWVuIiwiRGVjaXNpb25TY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiU2VsbEJ1c2luZXNzU2NyZWVuIiwiSW52ZXN0U2NyZWVuIiwiQnV5T3JTZWxsU2NyZWVuIiwiT25lUXVlc3Rpb25TcGFjZVNjcmVlbiIsIk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJSZXNldFR1cm5WYXJpYWJsZSIsInJlcXVpcmUiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJTeW5jRGF0YSIsIm9uRGlzYWJsZSIsIm9mZiIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiYWN0aXZlIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIl9zdGF0ZSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsImlzRmlyc3RUaW1lIiwiaW5zaWRlR2FtZSIsIkluaXRfQnVzaW5lc3NTZXR1cCIsIlBsYXllckRhdGEiLCJCdXNpbmVzc0luZm8iLCJDYXNoIiwiUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCIsImluZGV4IiwiUGxheWVyR2FtZUluZm8iLCJsZW5ndGgiLCJTdHVkZW50RGF0YSIsInVzZXJJRCIsIlBsYXllclVJRCIsIk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwiUGxheWVyTmFtZSIsIk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAiLCJPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cCIsIkdldE9ial9CdXNpbmVzc1NldHVwIiwiVUlEIiwiT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc05hbWUiLCJjaGlsZHJlbiIsIkJ1c2luZXNzVHlwZSIsIkVudW1CdXNpbmVzc1R5cGUiLCJub25lIiwiT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwIiwiSG9tZUJhc2VkIiwiT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJicmlja0FuZG1vcnRhciIsImFtb3VudCIsIkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCIsIl9sb2FuVGFrZW4iLCJfYnVzaW5lc3NJbmRleCIsIk5vT2ZCdXNpbmVzcyIsIkxvYW5UYWtlbiIsIlNob3dUb2FzdCIsIk1hdGgiLCJhYnMiLCJwYXJzZUludCIsImdldENvbXBvbmVudCIsIk9uTG9hbkJ1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsImV2ZW50IiwiT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCIsImkiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXAiLCJPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXAiLCJPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCIsIl9kYXRhIiwiX0lEIiwiUGhvdG9uQWN0b3IiLCJhY3Rvck5yIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJNYXhQbGF5ZXJzIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJTdGFydFR1cm4iLCJQdXJjaGFzZUJ1c2luZXNzIiwiX2Ftb3VudCIsIl9idXNpbmVzc05hbWUiLCJfaXNIb21lQmFzZWQiLCJIb21lQmFzZWRBbW91bnQiLCJTdGFydEdhbWUiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIkV4aXRfQnVzaW5lc3NTZXR1cCIsIkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwIiwiUmFpc2VFdmVudCIsIlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUGF5QW1vdW50VG9QbGF5R2FtZSIsIklzQm90IiwiaXNhY3RpdmUiLCJVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbiIsIkdldFR1cm5OdW1iZXIiLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCIsIk9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdvbGRDb3VudCIsIk9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJTdG9ja0NvdW50IiwiT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uIiwiT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiUm9sbERpY2UiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJ2YWx1ZSIsIlJlc2V0R29sZElucHV0Iiwib25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwiLCJVcGRhdGVEYXRhX0ludmVzdFNlbGwiLCJfdGl0bGUiLCJfZGljZVJlc3VsdCIsIl9wcmljZVRpdGxlIiwiX3ByaWNlVmFsdWUiLCJfYnV5T3JTZWxsVGl0bGUiLCJfdG90YWxBbW91bnRUaXRsZSIsIl90b3RhbEFtb3VudFZhbHVlIiwiX2J1dHRvbk5hbWUiLCJBcHBseUJ1dHRvbl9JbnZlc3RTZWxsIiwiX1RvdGFsQW1vdW50IiwiRXhpdEJ1dHRvbl9JbnZlc3RTZWxsIiwiVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSIsIlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSIsIlVwZGF0ZUJ1dHRvbnNfUGF5RGF5IiwiSE1BbW91bnQiLCJCTUFtb3VudCIsImxvYW5UYWtlbiIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsIkdldExvYW5BbW91bnRfUGF5RGF5IiwiX21hbmFnZXIiLCJfbG9hbiIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiX2lzRG91YmxlUGF5RGF5IiwiX3NraXBITSIsIl9za2lwQk0iLCJfdGltZSIsIkJNTG9jYXRpb25zIiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQYXlEYXlDb21wbGV0ZWQiLCJPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSIsIl9kaWNlIiwiUm9sbE9uZURpY2UiLCJPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX0VzdGltYXRlTG9hbiIsIlJlY2VpdmVQYXltZW50X1BheURheSIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJUb2dnbGVQYXlEYXkiLCJjYWxsVXBvbkNhcmQiLCJUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJfdGVtcERhdGEiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXROYW1lIiwiU2V0VHlwZSIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRCdXNpbmVzc01vZGUiLCJTZXRNb2RlIiwiU2V0QmFsYW5jZSIsIkFtb3VudCIsIlNldExvY2F0aW9ucyIsIkxvY2F0aW9uc05hbWUiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJkZXN0cm95IiwiX2lzVHVybm92ZXIiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkiLCJUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwiU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX215RGF0YSIsIl9hY3RvcnNEYXRhIiwiX2lzVHVybk92ZXIiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJzZXRQbGF5ZXJOYW1lIiwic2V0UGxheWVyVUlEIiwiUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0X09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3F1ZXN0aW9uIiwibWVzc2FnZSIsInRpbWUiLCJTZWxmVG9hc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUMsSUFBN0I7QUFDQSxJQUFJQyxtQkFBbUIsR0FBQyxFQUF4QjtBQUNBLElBQUlDLGdCQUFnQixHQUFDLEVBQXJCLEVBQ0E7O0FBQ0EsSUFBSUMsY0FBYyxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN6QkMsRUFBQUEsSUFBSSxFQUFDLENBRG9CO0FBRXpCQyxFQUFBQSxXQUFXLEVBQUUsS0FGWTtBQUd6QkMsRUFBQUEsYUFBYSxFQUFFLEtBSFU7QUFJekJD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Q0FBMEN6RCxNQUExQyxHQUFpRCxNQUFJNFUsT0FBTyxDQUFDcE0sSUFBN0Q7QUFDQSxTQUFLbkQsa0JBQUwsQ0FBd0IzQix1QkFBeEIsQ0FBZ0QxRCxNQUFoRCxHQUF1RDRVLE9BQU8sQ0FBQzNMLFVBQS9EO0FBQ0EsU0FBSzVELGtCQUFMLENBQXdCMUIscUJBQXhCLENBQThDM0QsTUFBOUMsR0FBcUQseUJBQXVCeVYsU0FBdkIsR0FBaUMsSUFBakMsR0FBc0MsSUFBdEMsR0FDckQsdUVBREE7QUFFSCxHQXIrQzBCO0FBcytDM0I7QUFDQWpMLEVBQUFBLFNBQVMsRUFBQyxtQkFBU2tMLE9BQVQsRUFBaUJDLElBQWpCLEVBQ1Y7QUFBQSxRQUQyQkEsSUFDM0I7QUFEMkJBLE1BQUFBLElBQzNCLEdBRGdDLElBQ2hDO0FBQUE7O0FBQ0ksU0FBS3JRLE9BQUwsQ0FBYTJCLE1BQWIsR0FBb0IsSUFBcEI7QUFDQSxTQUFLM0IsT0FBTCxDQUFhb0UsUUFBYixDQUFzQixDQUF0QixFQUF5QkEsUUFBekIsQ0FBa0MsQ0FBbEMsRUFBcUNrQixZQUFyQyxDQUFrRG5OLEVBQUUsQ0FBQ2dCLEtBQXJELEVBQTREdUIsTUFBNUQsR0FBbUUwVixPQUFuRTtBQUNBLFFBQUlFLFNBQVMsR0FBQyxJQUFkO0FBQ0FsTyxJQUFBQSxVQUFVLENBQUMsWUFBVTtBQUFHa08sTUFBQUEsU0FBUyxDQUFDdFEsT0FBVixDQUFrQjJCLE1BQWxCLEdBQXlCLEtBQXpCO0FBQWlDLEtBQS9DLEVBQWlEME8sSUFBakQsQ0FBVjtBQUNIO0FBNytDMEIsQ0FBVCxDQUF0QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxOb2Rlcz1bXTtcclxudmFyIG9uZVF1ZXN0aW9uTm9kZXM9W107XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBhbW91bnQgb2YgbG9hbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTG9hbkFtb3VudEVudW0gPSBjYy5FbnVtKHtcclxuICAgIE5vbmU6MCxcclxuICAgIFRlblRob3VzYW5kOiAxMDAwMCwgICAgICAgICAgICAgICAgICBcclxuICAgIFRlbnR5VGhvdXNhbmQ6IDIwMDAwLFxyXG4gICAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gICAgRm9ydHlUaG91c2FuZDogNDAwMDAsXHJcbiAgICBGaWZ0eVRob3VzYW5kOiA1MDAwMCxcclxuICAgIE90aGVyOjZcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NTZXR1cFVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lVUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsfSxcclxuICAgIFBsYXllckNhc2hVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyQ2FzaFVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIGNhc2hcIix9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgIHRvb2x0aXA6XCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgdHlwZVwiLH0sXHJcbiAgICBCdXNpbmVzc05hbWVUZXh0VUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgdG9vbHRpcDpcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsfSxcclxuICAgIEJ1c2luZXNzVHlwZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1R5cGVMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIGZvciBidXNpbmVzcyB0eXBlIGVkaXRib3hcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJyZWZlcmVjZSBmb3IgYnVzaW5lc3MgbmFtZSBlZGl0Ym94XCIsfSxcclxuICAgIEhvbWVCYXNlZE5vZGVVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIix9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJOb2RlVUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrQW5kTW9ydGFyTm9kZVVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3NcIix9LFxyXG4gICAgVGltZXJVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGltZXJVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbGFiZWwgZm9yIHRpbWVyXCIsfSxcclxuICAgIFRpbWVyTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGltZXJOb2RlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSBmb3IgdGltZXIgbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwifSwgXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NTZXR1cE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnVzaW5lc3Mgc2V0dXBcIix9LFxyXG4gICAgTG9hblNldHVwTm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsfSxcclxuICAgIExvYW5BbW91bnQ6XHJcbiAgICB7XHJcbiAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgdHlwZTogTG9hbkFtb3VudEVudW0sXHJcbiAgICAgICAgZGVmYXVsdDogTG9hbkFtb3VudEVudW0uTm9uZSxcclxuICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgdG9vbHRpcDpcImxvYW4gYW1vdW50IHRha2VuIGJ5IHBsYXllciAoc3RhdGUgbWFjaGluZSlcIn0sIFxyXG4gICAgTG9hbkFtb3VudExhYmVsOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBhbGwgbGFiZWxzIG9mIGFtb3VudHMgaW4gbG9hbiBVSVwifSwgXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiV2FpdGluZ1N0YXR1c05vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwifSwgXHJcbiAgICBFeGl0QnV0dG9uTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvbk5vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBleGl0IGJ1dHRvbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCJ9LCBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yLy9cclxuICAgIH0sXHJcblxyXG4gICAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZz1uYW1lO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlR1cm5EZWNpc2lvblNldHVwVUlcIixcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYXJrZXRpbmdFZGl0Qm94OlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJNYXJrZXRpbmdFZGl0Qm94XCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgbWFya2V0aW5nIG5vZGVcIix9LFxyXG4gICAgR29sZEVkaXRCb3g6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkdvbGRFZGl0Qm94XCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IGdvbGQgbm9kZVwiLH0sIFxyXG4gICAgU3RvY2tFZGl0Qm94OlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTdG9ja0VkaXRCb3hcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3Qgc3RvY2sgbm9kZVwiLH0sXHJcbiAgICBDYXNoQW1vdW50TGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhc2hcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhwYW5kQnVzaW5lc3NOb2RlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSBmb3IgZXhwbmFkIGJ1c2luZXNzIG5vZGVcIn0sIFxyXG4gICAgRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIn0sICAgXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhwYW5kQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwifSwgICAgICAgICAgICAgXHJcbn0sXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7Ly9jb25zdHJ1Y3RvclxyXG4gICAgfSxcclxuXHJcbiAgICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nPW5hbWU7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBpbnZlc3RtZW50L2J1eSBhbmQgc2VsbC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0RW51bSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgU3RvY2tJbnZlc3Q6IDEsICAgICAgICAgICAgICAgICAgXHJcbiAgICBHb2xkSW52ZXN0OiAyLFxyXG4gICAgU3RvY2tTZWxsOiAzLFxyXG4gICAgR29sZFNlbGw6IDQsXHJcbiAgICBPdGhlcjo1XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0U2VsbFVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJJbnZlc3RTZWxsVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlIFJlc3VsdCBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgUHJpY2VUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQcmljZVRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgUHJpY2VWYWx1ZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQcmljZVZhbHVlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSB2YWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgQnV5T3JTZWxsVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnV5T3JTZWxsVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1eU9yU2VsbCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgVG90YWxBbW91bnRUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEFtb3VudFZhbHVlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBWYWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgQnV0dG9uTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXR0b25OYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBidXR0b24gbmFtZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgIEludmVzdFN0YXRlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJJbnZlc3RTdGF0ZVwiLFxyXG4gICAgICAgdHlwZTogSW52ZXN0RW51bSxcclxuICAgICAgIGRlZmF1bHQ6IEludmVzdEVudW0uTm9uZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZX0sXHJcbiAgICAgQW1vdW50RWRpdEJveDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQW1vdW50RWRpdEJveFwiLFxyXG4gICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWV9LFxyXG4gICAgICAgICAgXHJcbn0sXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7Ly9jb25zdHJ1Y3RvclxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VsbEJ1c2luZXNzVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlbGxCdXNpbmVzc1VJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJTZWxsQnVzaW5lc3NVSVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFNlbGwgbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFNlbGwgbm9kZVwifSwgICBcclxuICAgIFBsYXllck5hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBTZWxsIG5vZGVcIn0sIFxyXG4gICAgQnVzaW5lc3NDb3VudExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc0NvdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXNpbmVzc0NvdW50IG9mIFNlbGwgbm9kZVwifSwgIFxyXG4gICAgU2Nyb2xsQ29udGVudE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNjcm9sbENvbnRlbnROb2RlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNjcm9sbENvbnRlbnROb2RlIG9mIFNlbGwgbm9kZVwifSwgIFxyXG4gICAgQnVzaW5lc3NTZWxsUHJlZmFiOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1NlbGxQcmVmYWJcIixcclxuICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgQnVzaW5lc3NTZWxsUHJlZmFiIG9mIFNlbGwgbm9kZVwifSwgICAgXHJcbiAgICAgRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIn0sICBcclxuICAgICBUdXJuT3ZlckV4aXRCdXR0b246XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwifSwgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBheURheVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXlEYXlVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUGF5RGF5VUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwifSxcclxuICAgIEhvbWVCYXNlZE51bWJlckxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJIb21lQmFzZWROdW1iZXJcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZE51bWJlciBub2RlXCJ9LFxyXG4gICAgIEJNTnVtYmVyTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrTW9ydGFyTnVtYmVyXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhck51bWJlciBub2RlXCJ9LFxyXG4gICAgIEJNTnVtYmVyTG9jYXRpb25MYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIn0sXHJcbiAgICBIb21lQmFzZWRCdG46XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkhvbWVCYXNlZEJ0blwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWRCdG4gbm9kZVwifSxcclxuICAgIEJNQnRuOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja01vcnRhckJ0blwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckJ0biBub2RlXCJ9LFxyXG4gICAgTG9hbkJ0bjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hbkJ0blwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIn0sXHJcbiAgICBNYWluUGFuZWxOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJNYWluUGFuZWxOb2RlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIE1haW5QYW5lbCBub2RlXCJ9LFxyXG4gICAgUmVzdWx0UGFuZWxOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJSZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0UGFuZWwgbm9kZVwifSxcclxuICAgIExvYW5SZXN1bHRQYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCJ9LFxyXG4gICAgIFJlc3VsdFNjcmVlblRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlJlc3VsdFNjcmVlblRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRTY3JlZW5UaXRsZSBub2RlXCJ9LFxyXG4gICAgIERpY2VSZXN1bHRMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRGljZVJlc3VsdFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZVJlc3VsdCBub2RlXCJ9LFxyXG4gICBUb3RhbEJ1c2luZXNzTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsQnVzaW5lc3NMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxCdXNpbmVzcyBub2RlXCJ9LFxyXG4gICAgVG90YWxBbW91bnRMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxBbW91bnRMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgbm9kZVwifSxcclxuICAgIFNraXBMb2FuQnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCJ9LFxyXG4gICBMb2FuRm90dGVyTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIn0sXHJcbiAgICAgICAgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0VUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkludmVzdFVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgSW52ZXN0IG5vZGVcIn0sICAgXHJcbiAgICBDYXNoTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhc2hMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBJbnZlc3Qgbm9kZVwifSwgICBcclxuICAgIFBsYXllck5hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwifSwgXHJcbiAgICAgRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwifSwgIFxyXG4gICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIn0sICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXlPclNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnV5T3JTZWxsVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkJ1eU9yU2VsbFVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgQnV5T3JTZWxsIG5vZGVcIn0sICAgXHJcbiAgICBDYXNoTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhc2hMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBCdXlPclNlbGwgbm9kZVwifSwgICBcclxuICAgIFBsYXllck5hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBCdXlPclNlbGwgbm9kZVwifSwgXHJcbiAgICAgRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwifSwgIFxyXG4gICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIn0sICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBPbmVRdWVzdGlvblVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBPbmVRdWVzdGlvblVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJPbmVRdWVzdGlvblVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sICAgXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgXHJcbiAgICAgRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgXHJcbiAgICAgVHVybk92ZXJFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LFxyXG4gICBQbGF5ZXJEZXRhaWxMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sIFxyXG4gICAgRGV0YWlsc1ByZWZhYjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRGV0YWlsc1ByZWZhYlwiLFxyXG4gICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBEZXRhaWxzUHJlZmFiIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIn0sICBcclxuICAgIFNjcm9sbENvbnRlbnQ6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIFNjcm9sbENvbnRlbnQgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgXHJcbiAgICBXYWl0aW5nU2NyZWVuOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJXYWl0aW5nU2NyZWVuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgV2FpdGluZ1NjcmVlbiBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkRlY2lzaW9uVGl0bGVMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgICBcclxuICAgIERlY2lzaW9uQ2FzaExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEZWNpc2lvbkNhc2hMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgIFxyXG4gICAgRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCJ9LCAgICBcclxuICAgIERlY2lzaW9uUXVlc3Rpb25MYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRGVjaXNpb25RdWVzdGlvbkxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgcXVlc3Rpb24gb2YgT25lUXVlc3Rpb24gbm9kZVwifSwgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBHYW1lcGxheVVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YUludGFuY2U7XHJcbnZhciBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlO1xyXG52YXIgUmVxdWlyZWRDYXNoO1xyXG52YXIgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXA9LTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbi8vdHVybiBkZWNpc2lvbnNcclxudmFyIFRlbXBNYXJrZXRpbmdBbW91bnQ9XCJcIjtcclxudmFyIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4vL2J1eW9yc2VsbFxyXG52YXIgR29sZENhc2hBbW91bnQ9XCJcIjtcclxudmFyIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG52YXIgU3RvY2tCdXNpbmVzc05hbWU9XCJcIjtcclxudmFyIERpY2VSZXN1bHQ7XHJcbnZhciBPbmNlT3JTaGFyZTtcclxudmFyIExvY2F0aW9uTmFtZT1cIlwiO1xyXG5cclxudmFyIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQ9ZmFsc2U7XHJcbnZhciBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQ9ZmFsc2U7XHJcbnZhciBMb2FuUGF5ZWQ9ZmFsc2U7XHJcbnZhciBUb3RhbFBheURheUFtb3VudD0wO1xyXG52YXIgRG91YmxlUGF5RGF5PWZhbHNlO1xyXG5cclxudmFyIEdhbWVwbGF5VUlNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJHYW1lcGxheVVJTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIEJ1c2luZXNzU2V0dXBEYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEJ1c2luZXNzU2V0dXBVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIEJ1c2luZXNzU2V0dXBVSSBjbGFzc1wifSxcclxuICAgICAgICBUdXJuRGVjaXNpb25TZXR1cFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFR1cm5EZWNpc2lvblNldHVwVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBUdXJuRGVjaXNpb25TZXR1cFVJIGNsYXNzXCJ9LFxyXG4gICAgICAgIEludmVzdFNlbGxTZXR1cFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEludmVzdFNlbGxVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLH0sICBcclxuICAgICAgICBQYXlEYXlTZXR1cFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFBheURheVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsfSwgIFxyXG4gICAgICAgIFNlbGxCdXNpbmVzc1NldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDp7fSwgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBTZWxsQnVzaW5lc3NVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIFNlbGxCdXNpbmVzc1VJIGNsYXNzXCIsfSwgIFxyXG4gICAgICAgIEludmVzdFNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDp7fSwgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBJbnZlc3RVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIEludmVzdFVJIGNsYXNzXCIsfSwgICAgXHJcbiAgICAgICAgQnV5T3JTZWxsU2V0dXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Ont9LCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEJ1eU9yU2VsbFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgQnV5T3JTZWxsVUkgY2xhc3NcIix9LCAgICAgICBcclxuICAgICAgICBPbmVRdWVzdGlvblNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDp7fSwgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBPbmVRdWVzdGlvblVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgT25lUXVlc3Rpb25VSSBjbGFzc1wiLH0sICAgICAgIFxyXG4gICAgICAgIFBvcFVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIix9LCAgIFxyXG4gICAgICAgIEJ1c2luZXNzU2V0dXBOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIix9LCAgXHJcbiAgICAgICAgR2FtZXBsYXlVSVNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsfSwgICBcclxuICAgICAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgRGVjaXNpb24gc2NyZWVuXCIsfSwgICAgXHJcbiAgICAgICAgSW52ZXN0U2VsbFNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIix9LCAgICBcclxuICAgICAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIFBheURheSBzY3JlZW5cIix9LCAgICBcclxuICAgICAgICBTZWxsQnVzaW5lc3NTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIFNlbGxCdXNpbmVzcyBzY3JlZW5cIix9LCAgXHJcbiAgICAgICAgSW52ZXN0U2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3Qgc2NyZWVuXCIsfSwgIFxyXG4gICAgICAgIEJ1eU9yU2VsbFNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgQnV5T3JTZWxsIHNjcmVlblwiLH0sICBcclxuICAgICAgICBPbmVRdWVzdGlvblNwYWNlU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvblNwYWNlIHNjcmVlblwiLH0sICBcclxuICAgICAgICBPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBPbmVRdWVzdGlvbkRlY2lzaW9uIHNjcmVlblwiLH0sICBcclxuICAgICAgICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJsYWJlbCByZWZlcmVuY2UgZm9yIGRpY2VcIix9LCAgIFxyXG4gICAgICAgICBMZWF2ZVJvb21CdXR0b246IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAgb25Mb2FkICgpIHtcclxuICAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTsgXHJcblxyXG4gICAgICAgICAvL2xvY2FsIHZhcmlhYmxlc1xyXG4gICAgICAgICB0aGlzLkdvbGRJbnZlc3RlZD1mYWxzZTtcclxuICAgICAgICAgdGhpcy5Hb2xkU29sZD1mYWxzZTtcclxuICAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLlN0b2NrU29sZD1mYWxzZTtcclxuXHJcbiAgICAgfSxcclxuXHJcbiAgICAgUmVzZXRUdXJuVmFyaWFibGUoKVxyXG4gICAgIHtcclxuICAgICAgICB0aGlzLkdvbGRJbnZlc3RlZD1mYWxzZTtcclxuICAgICAgICB0aGlzLkdvbGRTb2xkPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZD1mYWxzZTtcclxuICAgICAgICB0aGlzLlN0b2NrU29sZD1mYWxzZTtcclxuICAgICB9LFxyXG5cclxuICAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcblxyXG4gICAgICAgIGlmKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXI9cmVxdWlyZSgnR2FtZU1hbmFnZXInKTtcclxuICAgICB9LFxyXG5cclxuICAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWQgXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ1N5bmNEYXRhJywgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignU3luY0RhdGEnLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gU3BlY3RhdGUgVUkgU2V0dXBcclxuICAgIEluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxlYXZlUm9vbUJ1dHRvbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbCh0cnVlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3BsYXNoXCIpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBCdXNpbmVzc1NldHVwIHdpdGggbG9hblxyXG4gICAgLy9CdXNpbmVzcyBzZXR1cCB1aS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSxpbnNpZGVHYW1lPWZhbHNlKSB7IC8vY2FsbGVkIGZpcnN0IHRpbWUgZm9ybSBHYW1lTWFuYWdlciBvbmxvYWQgZnVuY3Rpb25cclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5Jbml0X0J1c2luZXNzU2V0dXAoaXNGaXJzdFRpbWUsaW5zaWRlR2FtZSk7XHJcbiAgICB9LFxyXG4gICAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsaW5zaWRlR2FtZT1mYWxzZSkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlPW5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZT1uZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcbiAgICAgICBcclxuICAgICAgICBpZihpc0ZpcnN0VGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD0yMDAwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgICAgICBpZihpbnNpZGVHYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXA9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2U9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCk7ICBcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwPS0xO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKTsgXHJcbiAgICAgICAgfSBcclxuICAgIH0sIFxyXG4gICAgR2V0T2JqX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5CdXNpbmVzc1NldHVwRGF0YTtcclxuICAgIH0sXHJcbiAgICBPbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChuYW1lKTtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJOYW1lPW5hbWU7XHJcbiAgICB9LFxyXG4gICAgT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllclVJRD1VSUQ7XHJcbiAgICB9LFxyXG4gICAgT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJPW5hbWU7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbj1uYW1lO1xyXG4gICAgICAgXHJcbiAgICB9LFxyXG4gICAgT25CdXNpbmVzc05hbWVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJPW5hbWU7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWU9bmFtZTtcclxuICAgIH0sXHJcbiAgICBSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZUxhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJPVwiXCI7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUk9XCJcIjtcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLm5vbmU7XHJcbiAgICB9LFxyXG4gICAgT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQ7XHJcbiAgICB9LFxyXG4gICAgT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT10cnVlO1xyXG5cclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyO1xyXG4gICAgfSxcclxuICAgIE9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGFtb3VudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmc9XCIkXCIrYW1vdW50O1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9YW1vdW50O1xyXG4gICAgfSxcclxuICAgIENhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihhbW91bnQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9sb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4PTA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZihQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKF9sb2FuVGFrZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgdGFrZW4gbG9hbiBvZiAkXCIrUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA+PWFtb3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkbyBub3QgbmVlZCBsb2FuLCB5b3UgaGF2ZSBlbm91Z2ggY2FzaCB0byBidXkgY3VycmVudCBzZWxlY3RlZCBidXNpbmVzcy5cIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVxdWlyZWRDYXNoPU1hdGguYWJzKHBhcnNlSW50KFBsYXllckRhdGFJbnRhbmNlLkNhc2gpLWFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCIkXCIrUmVxdWlyZWRDYXNoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCg1MDAwMCk7XHJcbiAgICAgICAgfWVsc2UgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBzZWxlY3QgYnVzaW5lc3MgYmV0d2VlbiBIb21lIEJhc2VkIGFuZCBicmljayAmIG1vcnRhci4gXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIE9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmU9ZmFsc2U7ICBcclxuICAgIH0sXHJcbiAgICBIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbC5sZW5ndGg7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoaW5kZXg9PWkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLk90aGVyO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDApO1xyXG5cclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLlRlblRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uVGVudHlUaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLlRoaXJ0eVRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uRm9ydHlUaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLkZpZnR5VGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgICB9LFxyXG4gICAgT25UYWtlbkxvYW5DbGlja2VkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PT1Mb2FuQW1vdW50RW51bS5PdGhlcilcclxuICAgICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50PVJlcXVpcmVkQ2FzaDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudD1wYXJzZUludCh0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQpO1xyXG5cclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgIHRoaXMuT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaCtQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YTpmdW5jdGlvbihfZGF0YSxfSUQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX0lEIT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuYWN0b3JOcilcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goX2RhdGEpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG5cclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoPj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLHRydWUsdHJ1ZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyx0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlPXRydWU7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUHVyY2hhc2VCdXNpbmVzczpmdW5jdGlvbihfYW1vdW50LF9idXNpbmVzc05hbWUsX2lzSG9tZUJhc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGlmKFBsYXllckRhdGFJbnRhbmNlLkNhc2g8X2Ftb3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBub3QgZW5vdWdoIGNhc2ggdG8gYnV5IHRoaXMgXCIrX2J1c2luZXNzTmFtZStcIiBidXNpbmVzcy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoX2lzSG9tZUJhc2VkKVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBpZihQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQ8MylcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1QbGF5ZXJEYXRhSW50YW5jZS5DYXNoLV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZz1cIiRcIitQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0R2FtZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRHYW1lPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBIb21lIGJhc2VkIGJ1c2luZXNzZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1QbGF5ZXJEYXRhSW50YW5jZS5DYXNoLV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nPVwiJFwiK1BsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFydEdhbWU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ccmlja0FuZE1vcnRhckFtb3VudCsrO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0X0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPVBsYXllckRhdGFJbnRhbmNlLkNhc2gtUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJSZXZlcnRpbmcgYmFjayBsb2FuIGFtb3VudC5cIiw1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy9zZXR0aW5nIHBsYXllciBjdXJyZW50IGRhdGEgaW4gY3VzdG9tIHByb3BlcnRpZXMgd2hlbiBoaXMvaGVyIHR1cm4gb3ZlcnNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxLFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0luc2lkZUdhbWVCdXNpbmVzc1NldHVwXT1QbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD0tMTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgUGF5QW1vdW50VG9QbGF5R2FtZTpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWU9ZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb249PVwiXCIpXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgdHlwZS5cIik7XHJcbiAgICAgICAgZWxzZSBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZT09XCJcIilcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyBuYW1lLlwiKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT09R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQpIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgaG9tZWJhc3NlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDEwMDAwLFwiaG9tZVwiLHRydWUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKSAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGJyaWNrIGFuZCBtb3J0YXJcclxuICAgICAgICAgICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcyg1MDAwMCxcImJyaWNrIGFuZCBtb3J0YXJcIixmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuU3RhcnRHYW1lPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLnB1c2goUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICAgICAgICBpZihJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCE9LTEpIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBub3QgYmVlbiBjYWxsZWQgZnJvbSBpbnNpZGUgZ2FtZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgICAgICBlbHNlICAgIC8vaWYgc3RhcnQgbmV3IGJ1c2luZXNzIGhhcyBiZWVuIGNhbGxlZCBhdCBzdGFydCBvZiBnYW1lIGFzIGluaXRpYWwgc2V0dXBcclxuICAgICAgICAgICAgICAgIHRoaXMuSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAoKTtcclxuXHJcbiAgICAgICAgICAgIC8vcHJ0aW50aW5nIGFsbCB2YWx1ZXMgdG8gY29uc29sZVxyXG4gICAgICAgICAgICBmb3IodmFyIGk9MDtpPEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7aSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBuYW1lOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBJRDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklzIHBsYXllciBib3Q6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Jc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIG9mIGJ1c2luZXNzIG9mIHBsYXllciAoc2VlIGJlbG93KTogXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjYXNoOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uQ2FzaCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciB0YWtlbiBsb2FuOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hblRha2VuKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW4gbG9hbiBhbW91bnQ6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuQW1vdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIFR1cm5EZWNpc2lvblNldHVwVUlcclxuICAgIC8vVHVybkRlY2lzaW9uU2V0dXBVSS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuRGVjaXNpb25TY3JlZW4uYWN0aXZlPWlzYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb246ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5DYXNoQW1vdW50TGFiZWwuc3RyaW5nPVwiJCBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKV0uQ2FzaDtcclxuICAgIH0sXHJcblxyXG4gICAgT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50PWFtb3VudDtcclxuICAgIH0sIFxyXG5cclxuICAgIE9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoVGVtcE1hcmtldGluZ0Ftb3VudD09XCJcIiB8fCBUZW1wTWFya2V0aW5nQW1vdW50PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtldGluZ0Ftb3VudD1wYXJzZUludChUZW1wTWFya2V0aW5nQW1vdW50KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2lmIHBsYXllciBlbnRlcmVkIGFtb3VudCBpcyBncmVhdGVyIHRoYW4gdG90YWwgY2FzaCBoZSBvd25zXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PSB0aGlzLm1hcmtldGluZ0Ftb3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLSB0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQrdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBzdWNjZXNzZnVsbHkgbWFya2V0ZWQgYW1vdW50IG9mICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQrXCIgLCByZW1haW5pbmcgY2FzaCBpcyAkXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtcIi5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudD1cIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIGlmIHBsYXllciBoYXMgbW9yZSB0aGFuIDUwMDAkXHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgYWxyZWFkeSBoaXJlZCBhIGxhd3llci5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD49NTAwMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cz10cnVlO1xyXG4gICAgICAgICAgICBUZW1wSGlyaW5nTGF3eWVyPXRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBIaXJpbmdMYXd5ZXIpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtNTAwMDtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIsIHJlbWFpbmluZyBjYXNoIGlzICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoK1wiLlwiKTtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInNvcnJ5LCB5b3UgZG9udCBoYXZlIGVub3VnaCBtb25leSB0byBoaXJlIGEgbGF3eWVyLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB9LCBcclxuXHJcbiAgICBvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKF9uYW1lKVxyXG4gICAge1xyXG4gICAgICAgIExvY2F0aW9uTmFtZT1fbmFtZTtcclxuICAgIH0sXHJcbiAgICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9pZiBwbGF5ZXIgaGFzIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgaGUgY291bGQgZXhwYW5kIGl0XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB2YXIgZ2VuZXJhdGVkTGVuZ3RoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKCk7XHJcblxyXG4gICAgICAgIGlmKGdlbmVyYXRlZExlbmd0aD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm8gYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyB0byBleHBhbmQuXCIsMTUwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIDE2MDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICBMb2NhdGlvbk5hbWU9XCJcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzcyBleGl0IGNhbGxlZFwiKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgbmV3IGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHRoaXMuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgICAgICBHb2xkQ2FzaEFtb3VudD1hbW91bnQ7XHJcbiAgICB9LCBcclxuXHJcbiAgICBPbkdvbGREaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZighdGhpcy5Hb2xkSW52ZXN0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkdvbGRJbnZlc3RlZD10cnVlO1xyXG4gICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9SW52ZXN0RW51bS5Hb2xkSW52ZXN0O1xyXG4gICAgICAgICAgICBEaWNlUmVzdWx0PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgT25jZU9yU2hhcmU9KERpY2VSZXN1bHQqMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgICAgICAgIFwiSW52ZXN0IEluIEdPTERcIixcclxuICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiL291bmNlXCIsXHJcbiAgICAgICAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBCVVlcIixcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiKjA9MFwiLFxyXG4gICAgICAgICAgICAgICAgXCJCVVlcIixcclxuICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSwgXHJcblxyXG4gICAgT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIFN0b2NrQnVzaW5lc3NOYW1lPW5hbWU7XHJcbiAgICB9LCBcclxuXHJcbiAgICBPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLlN0b2NrSW52ZXN0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIGlmKFN0b2NrQnVzaW5lc3NOYW1lPT1cIlwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYSBidXNpbmVzcyBuYW1lIHRvIGludmVzdC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b2NrSW52ZXN0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPUludmVzdEVudW0uU3RvY2tJbnZlc3Q7XHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlPShEaWNlUmVzdWx0KjEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiSW52ZXN0IGluIFN0b2NrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICBcIkVhY2ggU2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIvc2hhcmVcIixcclxuICAgICAgICAgICAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIkJVWVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBcclxuXHJcbiAgICBPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZighdGhpcy5Hb2xkU29sZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50PjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR29sZFNvbGQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPUludmVzdEVudW0uR29sZFNlbGw7XHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlPShEaWNlUmVzdWx0KjEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiU2VsbCBHT0xEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIi9vdW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiKjA9MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiU0VMTFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IEdPTEQgb3VuY2VzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBcclxuXHJcbiAgICBPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMuU3RvY2tTb2xkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50PjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RvY2tTb2xkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLlN0b2NrU2VsbDtcclxuICAgICAgICAgICAgICAgIERpY2VSZXN1bHQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgT25jZU9yU2hhcmU9KERpY2VSZXN1bHQqMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTZWxsIFNUT0NLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICBcIkVhY2ggc2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIvc2hhcmVcIixcclxuICAgICAgICAgICAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIFNlbGxpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiKjA9MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiU0VMTFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IHNoYXJlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBcclxuXHJcbiAgICBPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdvIGludG8gcGFydG5lciBzaGlwXCIpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwid29yayBpbiBwcm9ncmVzcywgY29taW5nIHNvb24uLi5cIik7XHJcbiAgICB9LCBcclxuXHJcbiAgICBPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJvbGwgdGhlIGRpY2VcIik7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsRGljZSgpO1xyXG4gICAgfSwgXHJcblxyXG4gICAgUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAvL3RoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICAgIH0sIFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICAgIFJlc2V0R29sZElucHV0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuR29sZEVkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgR29sZENhc2hBbW91bnQ9XCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuU3RvY2tFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgIFN0b2NrQnVzaW5lc3NOYW1lPVwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsKF9hbW91bnQpXHJcbiAgICB7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PV9hbW91bnQ7XHJcblxyXG4gICAgICAgIGlmKEVudGVyQnV5U2VsbEFtb3VudD09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlK1wiKjA9MFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQ9T25jZU9yU2hhcmUqX2Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqXCIrRW50ZXJCdXlTZWxsQW1vdW50K1wiPVwiK19hbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgdGhpcy5SZXNldEdvbGRJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChfdGl0bGUsX2RpY2VSZXN1bHQsX3ByaWNlVGl0bGUsX3ByaWNlVmFsdWUsX2J1eU9yU2VsbFRpdGxlLF90b3RhbEFtb3VudFRpdGxlLF90b3RhbEFtb3VudFZhbHVlLF9idXR0b25OYW1lLF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nPV90aXRsZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmc9X2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVRpdGxlTGFiZWwuc3RyaW5nPV9wcmljZVRpdGxlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZz1fcHJpY2VWYWx1ZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1eU9yU2VsbFRpdGxlTGFiZWwuc3RyaW5nPV9idXlPclNlbGxUaXRsZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VGl0bGVMYWJlbC5zdHJpbmc9X3RvdGFsQW1vdW50VGl0bGU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nPV90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV0dG9uTmFtZUxhYmVsLnN0cmluZz1fYnV0dG9uTmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlRGF0YV9JbnZlc3RTZWxsKF90b3RhbEFtb3VudFZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZz1fdG90YWxBbW91bnRWYWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgQXBwbHlCdXR0b25fSW52ZXN0U2VsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoRW50ZXJCdXlTZWxsQW1vdW50PT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5Hb2xkSW52ZXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD1wYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgaWYoX1RvdGFsQW1vdW50PD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50K19hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiK19hbW91bnQrXCIgb3VuY2VzIG9mIEdPTERcIiwxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5Hb2xkU2VsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgICAgIGlmKF9hbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoK19Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50LV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIitfYW1vdW50K1wiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiK19Ub3RhbEFtb3VudCwxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIEdPTEQgb3VuY2VzLCB5b3Ugb3duIFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCtcIiBvZiBHT0xEIG91bmNlc1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9PUludmVzdEVudW0uU3RvY2tJbnZlc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBpZihfVG90YWxBbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC1fVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCtfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2FuIGFkZCBtdWx0aXBsZSBzdG9ja3Mgd2l0aCBidXNpbmVzcyBuYW1lIGluIG9iamVjdCBpZiByZXF1aXJlZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIrX2Ftb3VudCtcIiBzaGFyZXMgb2YgYnVzaW5lc3MgXCIrU3RvY2tCdXNpbmVzc05hbWUsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5TdG9ja1NlbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKF9hbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQtX2Ftb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIitfYW1vdW50K1wiIHNoYXJlcyBvZiBzdG9jayBmb3IgICRcIitfVG90YWxBbW91bnQsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIHN0b2NrcyBzaGFyZXMsIHlvdSBvd24gXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCtcIiBvZiBzdG9jayBzaGFyZXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRCdXR0b25fSW52ZXN0U2VsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gUGF5ZGF5IG9yIERvdWJsZSBwYXkgRGF5XHJcbiAgICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsQk1BbW91bnQsbG9hblRha2VuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEhNQW1vdW50PT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKEJNQW1vdW50PT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIWxvYW5UYWtlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvYW5QYXllZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvYW5QYXllZD1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZXRMb2FuQW1vdW50X1BheURheSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBfbG9hbj0wO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW49X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2xvYW47XHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSxfaXNEb3VibGVQYXlEYXk9ZmFsc2UsX3NraXBITT1mYWxzZSxfc2tpcEJNPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIERvdWJsZVBheURheT1faXNEb3VibGVQYXlEYXk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1fdGl0bGU7XHJcblxyXG4gICAgICAgIHZhciBfdGltZT0xODAwO1xyXG5cclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYoX3NraXBITSlcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZihfc2tpcEJNKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcblxyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgdmFyIEhNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgdmFyIEJNTG9jYXRpb25zPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgIF9idXNpbmVzc0luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbG9hblRha2VuPV9sb2FuVGFrZW47XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZE51bWJlckxhYmVsLnN0cmluZz1ITUFtb3VudDtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMYWJlbC5zdHJpbmc9Qk1BbW91bnQ7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmc9Qk1Mb2NhdGlvbnM7XHJcblxyXG4gICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIGxvYW4gd2FzIHNraXBwZWQgcHJldmlvdXNseVxyXG4gICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9sb2FuPXRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmc9XCIqcGF5ICRcIitfbG9hbjtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmc9XCIqcGF5ICQ1MDAwXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLDAsbG9hblRha2VuKTtcclxuICAgICAgICBlbHNlIGlmKF9za2lwSE0pXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCxCTUFtb3VudCxsb2FuVGFrZW4pO1xyXG4gICAgICAgIGVsc2UgaWYoX3NraXBCTSlcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwwLGxvYW5UYWtlbik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LEJNQW1vdW50LGxvYW5UYWtlbik7XHJcblxyXG4gICAgICAgIGlmKF9za2lwQk0gfHwgX3NraXBITSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgfSwgKF90aW1lKzIwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIlBheURheVwiO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIkRvdWJsZVBheURheVwiO1xyXG5cclxuICAgICAgICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcblxyXG4gICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICB2YXIgSE1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgIHZhciBfZGljZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PShITUFtb3VudCpfZGljZSkqMTAwMDtcclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBUb3RhbFBheURheUFtb3VudD0yKihITUFtb3VudCpfZGljZSkqMTAwMDtcclxuXHJcblxyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nPUhNQW1vdW50O1xyXG5cclxuICAgICAgICAgICBpZighRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK0hNQW1vdW50K1wiKlwiK1wiMTAwMD1cIitUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrSE1BbW91bnQrXCIqXCIrXCIxMDAwKjI9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIlBheURheVwiO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgIHZhciBfYW1vdW50PUJNQW1vdW50K0JNTG9jYXRpb25zO1xyXG4gICAgICAgICAgIHZhciBfZGljZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PShfYW1vdW50Kl9kaWNlKSoyMDAwO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PTIqKF9hbW91bnQqX2RpY2UpKjIwMDA7XHJcblxyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nPV9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrX2Ftb3VudCtcIipcIitcIjIwMDA9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK19hbW91bnQrXCIqXCIrXCIyMDAwKjI9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIHtcclxuICAgICAgICBpZighTG9hblBheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdmFyICBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTsgICBcclxuICAgICAgICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW49MDtcclxuXHJcbiAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgX0VzdGltYXRlTG9hbj10aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF9Fc3RpbWF0ZUxvYW49NTAwMDtcclxuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PV9Fc3RpbWF0ZUxvYW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExvYW5QYXllZD10cnVlOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC1fRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4PTA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudC1fRXN0aW1hdGVMb2FuO1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PD0wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50PWZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCkgLy9hbGxcclxuICAgIHtcclxuICAgICAgICB2YXIgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIkFtb3VudCAkXCIrVG90YWxQYXlEYXlBbW91bnQrXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDE1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgfSwgMTU1MCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNraXBMb2FuT25lVGltZV9QYXlEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc2tpcHBlZCB0aGUgbG9hbiBwYXltZW50LCBiYW5rIHdpbGwgY2FsbCB1cG9uIGNvbXBsZXRlIGxvYW4gYW1vdW50IG9uIG5leHQgcGF5ZGF5XCIsMjAwMCk7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgTG9hblBheWVkPXRydWU7IFxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICAgIExvYW5QYXllZD10cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsQnVzaW5lc3NfUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdExvYW5TY3JlZW5fUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIFBheURheUNvbXBsZXRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCAmJiBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgJiYgTG9hblBheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBwYXlkYXkgZG9uZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBTZWxsIEJ1c2luZXNzIFVJXHJcbiAgICBUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YT1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmc9XCJTRUxMXCI7XHJcbiAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZz1cIk5vIG9mIEJ1c2luZXNzZXMgOiBcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBpZihfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aD09MClcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxufSxcclxuXHJcbiAgICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNUdXJub3ZlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgfSwgIFxyXG4gICAgXHJcbiAgICBFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LCBcclxuICAgICAgICBcclxuXHJcbiAgXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIEludmVzdCBVSVxyXG4gICAgVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIEVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgICB9LFxyXG4gICAgU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nPVwiSU5WRVNUXCI7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICAgICAgaWYoX2lzVHVybm92ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICAgIFRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1eU9yU2VsbFNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gICAgfSxcclxuICAgIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1cIkJVWSBPUiBTRUxMXCI7XHJcbiAgICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICAgICAgaWYoX2lzVHVybm92ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8vI3JlZ2lvbiBPbmUgUXVlc3Rpb24gc2V0dXAgVWlcclxuICAgIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuV2FpdGluZ1NjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLF9hY3RvcnNEYXRhLF9pc1R1cm5PdmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nPVwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuQ2FzaExhYmVsLnN0cmluZz1cIiRcIitfbXlEYXRhLkNhc2g7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZz1fbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nPVwiTm8gb2YgUGxheWVyczogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKSAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfbXlEYXRhLlBsYXllclVJRCE9X2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKS5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKF9pc1R1cm5PdmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9uZVF1ZXN0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTsgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH0sXHJcbiAgICBcclxuXHJcbiAgICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfcXVlc3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25UaXRsZUxhYmVsLnN0cmluZz1cIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uQ2FzaExhYmVsLnN0cmluZz1cIiRcIitfbXlEYXRhLkNhc2g7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9teURhdGEuUGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nPVwiUGxheWVyIGhhcyBhc2tlZCBpZiBcIitfcXVlc3Rpb24rXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgIFwiKmVpdGhlciBhbnN3ZXIgcXVlc3Rpb24gb3IgcGF5ICQ1MDAwIHRvIHBsYXllciB3aG9zZSBhc2tpbmcgcXVlc3Rpb24uXCI7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBTaG93VG9hc3Q6ZnVuY3Rpb24obWVzc2FnZSx0aW1lPTIyNTApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSS5jaGlsZHJlblsyXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1tZXNzYWdlO1xyXG4gICAgICAgIHZhciBTZWxmVG9hc3Q9dGhpcztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmU9ZmFsc2U7IH0sIHRpbWUpO1xyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=