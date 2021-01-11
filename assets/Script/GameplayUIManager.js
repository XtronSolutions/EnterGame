var GameManager = null;
var GamePlayReferenceManager = null;
var businessDetailNodes = [];
var oneQuestionNodes = [];
var businessDetailPartnershipNodes = [];
var PartnerShipData = null;
var PartnerShipOfferReceived = false;
var CancelledID = [];
var StartGameCash = 100000;
//-------------------------------------------enumeration for amount of loan-------------------------//
var LoanAmountEnum = cc.Enum({
  None: 0,
  TenThousand: 10000,
  TentyThousand: 20000,
  ThirtyThousand: 30000,
  FortyThousand: 40000,
  FiftyThousand: 50000,
  Other: 6,
});
//-------------------------------------------class for Business Setup UI-------------------------//
var BusinessSetupUI = cc.Class({
  name: "BusinessSetupUI",

  properties: {
    PlayerNameUI: {
      displayName: "PlayerNameUI",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label for player name",
    },
    PlayerCashUI: {
      displayName: "PlayerCashUI",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label for player cash",
    },
    BusinessTypeTextUI: {
      displayName: "BusinessTypeTextUI",
      type: cc.Text,
      default: "",
      serializable: false,
      tooltip: "var to store text for business type",
    },
    BusinessNameTextUI: {
      displayName: "BusinessTypeTextUI",
      type: cc.Text,
      default: "",
      serializable: false,
      tooltip: "var to store text for business name",
    },
    BusinessTypeLabel: {
      displayName: "BusinessTypeLabel",
      type: cc.EditBox,
      default: null,
      serializable: true,
      tooltip: "reference for business type editbox",
    },
    BusinessNameLabel: {
      displayName: "BusinessNameLabel",
      type: cc.EditBox,
      default: null,
      serializable: true,
      tooltip: "referece for business name editbox",
    },
    HomeBasedNodeUI: {
      displayName: "HomeBasedNodeUI",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference of the node for home based business",
    },
    BrickAndMortarNodeUI: {
      displayName: "BrickAndMortarNodeUI",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference of the node for brick and mortar business",
    },
    TimerUI: {
      displayName: "TimerUI",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference of the label for timer",
    },
    TimerNode: {
      displayName: "TimerNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "Reference for timer node in business setup",
    },
    BusinessSetupNode: {
      displayName: "BusinessSetupNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference of the node for business setup",
    },
    LoanSetupNode: {
      displayName: "LoanSetupNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference of the node for loan setup",
    },
    LoanAmount: {
      displayName: "LoanAmount",
      type: LoanAmountEnum,
      default: LoanAmountEnum.None,
      serializable: true,
      tooltip: "loan amount taken by player (state machine)",
    },
    LoanAmountLabel: {
      displayName: "LoanAmountLabel",
      type: [cc.Node],
      default: [],
      serializable: true,
      tooltip: "Reference for all labels of amounts in loan UI",
    },
    WaitingStatusNode: {
      displayName: "WaitingStatusNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "Reference for waiting status screen on initial business setup",
    },
    ExitButtonNode: {
      displayName: "ExitButtonNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "Reference for exit button node in business setup",
    },
  },
  ctor: function () {
    //constructor//
  },

  ChangeName_BusinessSetup: function (name) {
    this.PlayerNameUI.string = name;
  },
});

//-------------------------------------------class for Business Setup UI-------------------------//
var TurnDecisionSetupUI = cc.Class({
  name: "TurnDecisionSetupUI",

  properties: {
    MarketingEditBox: {
      displayName: "MarketingEditBox",
      type: cc.EditBox,
      default: null,
      serializable: true,
      tooltip: "UI reference to the editbox of marketing node",
    },
    GoldEditBox: {
      displayName: "GoldEditBox",
      type: cc.EditBox,
      default: null,
      serializable: true,
      tooltip: "UI reference to the editbox of invest gold node",
    },
    StockEditBox: {
      displayName: "StockEditBox",
      type: cc.EditBox,
      default: null,
      serializable: true,
      tooltip: "UI reference to the editbox of invest stock node",
    },
    CashAmountLabel: {
      displayName: "Cash",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to cash node",
    },
    ExpandBusinessNode: {
      displayName: "ExpandBusinessNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "Reference for expnad business node",
    },
    ExpandBusinessScrollContent: {
      displayName: "ExpandBusinessScrollContent",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip:
        "Reference for content node of scroll view of expand business node",
    },
    ExpandBusinessPrefab: {
      displayName: "ExpandBusinessPrefab",
      type: cc.Prefab,
      default: null,
      serializable: true,
      tooltip: "Reference for prefab of expand business node",
    },
  },
  ctor: function () {
    //constructor
  },

  ChangeName_BusinessSetup: function (name) {
    this.PlayerNameUI.string = name;
  },
});

//-------------------------------------------enumeration for investment/buy and sell-------------------------//
var InvestEnum = cc.Enum({
  None: 0,
  StockInvest: 1,
  GoldInvest: 2,
  StockSell: 3,
  GoldSell: 4,
  Other: 5,
});

//-------------------------------------------class for InvestSellUI-------------------------//
var InvestSellUI = cc.Class({
  name: "InvestSellUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of title of invest&sell node",
    },
    DiceResultLabel: {
      displayName: "DiceResult",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of Dice Result of invest&sell node",
    },
    PriceTitleLabel: {
      displayName: "PriceTitle",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of Price Title of invest&sell node",
    },
    PriceValueLabel: {
      displayName: "PriceValue",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of Price value of invest&sell node",
    },
    BuyOrSellTitleLabel: {
      displayName: "BuyOrSellTitle",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip:
        "UI reference to the label of BuyOrSell Title of invest&sell node",
    },
    TotalAmountTitleLabel: {
      displayName: "TotalAmountTitle",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip:
        "UI reference to the label of TotalAmount Title of invest&sell node",
    },
    TotalAmountValueLabel: {
      displayName: "TotalAmountValue",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip:
        "UI reference to the label of TotalAmount Value of invest&sell node",
    },
    ButtonNameLabel: {
      displayName: "ButtonName",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of button name of invest&sell node",
    },
    InvestState: {
      displayName: "InvestState",
      type: InvestEnum,
      default: InvestEnum.None,
      serializable: true,
    },
    AmountEditBox: {
      displayName: "AmountEditBox",
      type: cc.EditBox,
      default: null,
      serializable: true,
    },
  },
  ctor: function () {
    //constructor
  },
});

//-------------------------------------------class for SellBusinessUI-------------------------//
var SellBusinessUI = cc.Class({
  name: "SellBusinessUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of title of Sell node",
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of cash of Sell node",
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of player name of Sell node",
    },
    BusinessCountLabel: {
      displayName: "BusinessCount",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of BusinessCount of Sell node",
    },
    ScrollContentNode: {
      displayName: "ScrollContentNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of ScrollContentNode of Sell node",
    },
    BusinessSellPrefab: {
      displayName: "BusinessSellPrefab",
      type: cc.Prefab,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab of BusinessSellPrefab of Sell node",
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of Sell node",
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab of TurnOverExitButton of Sell node",
    },
  },
  ctor: function () {
    //constructor
  },
});

//-------------------------------------------class for PayDayUI-------------------------//
var PayDayUI = cc.Class({
  name: "PayDayUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of title of PayDay node",
    },
    CashLabel: {
      displayName: "Cash",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of cash of PayDay node",
    },
    HomeBasedNumberLabel: {
      displayName: "HomeBasedNumber",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of HomeBasedNumber node",
    },
    BMNumberLabel: {
      displayName: "BrickMortarNumber",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of BrickMortarNumber node",
    },
    BMNumberLocationLabel: {
      displayName: "BrickMortarLocations",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of BrickMortarLocations node",
    },
    HomeBasedBtn: {
      displayName: "HomeBasedBtn",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of HomeBasedBtn node",
    },
    BMBtn: {
      displayName: "BrickMortarBtn",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of BrickMortarBtn node",
    },
    LoanBtn: {
      displayName: "LoanBtn",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of LoanBtn node",
    },
    MainPanelNode: {
      displayName: "MainPanelNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of MainPanel node",
    },
    ResultPanelNode: {
      displayName: "ResultPanelNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of ResultPanel node",
    },
    LoanResultPanelNode: {
      displayName: "LoanResultPanelNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of LoanResultPanelNode node",
    },
    ResultScreenTitleLabel: {
      displayName: "ResultScreenTitle",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of ResultScreenTitle node",
    },
    DiceResultLabel: {
      displayName: "DiceResult",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of DiceResult node",
    },
    TotalBusinessLabel: {
      displayName: "TotalBusinessLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of TotalBusiness node",
    },
    TotalAmountLabel: {
      displayName: "TotalAmountLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of TotalAmount node",
    },
    SkipLoanButton: {
      displayName: "SkipLoanButton",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of SkipLoanButton node",
    },
    LoanFotterLabel: {
      displayName: "LoanFotterLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of LoanFotterLabel node",
    },
  },
  ctor: function () {
    //constructor
  },
});

//-------------------------------------------class for InvestUI-------------------------//
var InvestUI = cc.Class({
  name: "InvestUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of title of Invest node",
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of cash of Invest node",
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of player name of Invest node",
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of Invest node",
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip:
        "UI reference to the prefab of TurnOverExitButton of Invest node",
    },
  },
  ctor: function () {
    //constructor
  },
});

//-------------------------------------------class for BuyOrSellUI-------------------------//
var BuyOrSellUI = cc.Class({
  name: "BuyOrSellUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of title of BuyOrSell node",
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of cash of BuyOrSell node",
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of player name of BuyOrSell node",
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of BuyOrSell node",
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip:
        "UI reference to the prefab of TurnOverExitButton of BuyOrSell node",
    },
  },
  ctor: function () {
    //constructor
  },
});

//-------------------------------------------class for OneQuestionUI-------------------------//
var OneQuestionUI = cc.Class({
  name: "OneQuestionUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of title of OneQuestion node",
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of cash of OneQuestion node",
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of player name of OneQuestion node",
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of OneQuestion node",
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip:
        "UI reference to the prefab of TurnOverExitButton of OneQuestion node",
    },
    PlayerDetailLabel: {
      displayName: "PlayerDetailLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of player name of OneQuestion node",
    },
    DetailsPrefab: {
      displayName: "DetailsPrefab",
      type: cc.Prefab,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab DetailsPrefab of OneQuestion node",
    },
    ScrollContent: {
      displayName: "ScrollContent",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab ScrollContent of OneQuestion node",
    },
    WaitingScreen: {
      displayName: "WaitingScreen",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference to the node WaitingScreen of OneQuestion node",
    },
    DecisionTitleLabel: {
      displayName: "DecisionTitleLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of title of OneQuestion node",
    },
    DecisionCashLabel: {
      displayName: "DecisionCashLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of cash of OneQuestion node",
    },
    DecisionPlayerNameLabel: {
      displayName: "DecisionPlayerNameLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of player name of OneQuestion node",
    },
    DecisionQuestionLabel: {
      displayName: "DecisionQuestionLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip:
        "UI reference to the label of player question of OneQuestion node",
    },
  },
  ctor: function () {
    //constructor
  },
});

//-------------------------------------------class for PartnershipUI-------------------------//
var PartnershipUI = cc.Class({
  name: "PartnershipUI",
  properties: {
    WaitingStatusScreen: {
      displayName: "WaitingStatusScreen",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "UI reference of the waiting screen node of partnership ui",
    },
    MainScreen: {
      displayName: "MainScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },
    TitleName: {
      displayName: "TitleName",
      type: cc.Label,
      default: null,
      serializable: true,
    },
    PlayerName: {
      displayName: "PlayerName",
      type: cc.Label,
      default: null,
      serializable: true,
    },
    PlayerCash: {
      displayName: "PlayerCash",
      type: cc.Label,
      default: null,
      serializable: true,
    },
    PartnerShipPrefab: {
      displayName: "PartnerShipPrefab",
      type: cc.Prefab,
      default: null,
      serializable: true,
    },
    ScrollContent: {
      displayName: "ScrollContent",
      type: cc.Node,
      default: null,
      serializable: true,
    },

    DecisionScreen: {
      displayName: "DecisionScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },

    DecisionPlayerName: {
      displayName: "DecisionPlayerName",
      type: cc.Label,
      default: null,
      serializable: true,
    },

    DecisionPlayerCash: {
      displayName: "DecisionPlayerCash",
      type: cc.Label,
      default: null,
      serializable: true,
    },

    DecisionDescription: {
      displayName: "DecisionDescription",
      type: cc.Label,
      default: null,
      serializable: true,
    },
  },
  ctor: function () {
    //constructor
  },
});

//-------------------------------------------class for GameplayUIManager-------------------------//
var PlayerDataIntance;
var PlayerBusinessDataIntance;
var RequiredCash;
var InsideGameBusinessSetup = -1; //-1 means new business is not instantialted from inside game , if it has any other value it means its been instantiated from inside game and its value represents index of player

//turn decisions
var TempMarketingAmount = "";
var TempHiringLawyer;

//buyorsell
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
  extends: cc.Component,
  properties: {
    BusinessSetupData: {
      default: null,
      type: BusinessSetupUI,
      serializable: true,
      tooltip: "reference of BusinessSetupUI class",
    },
    TurnDecisionSetupUI: {
      default: null,
      type: TurnDecisionSetupUI,
      serializable: true,
      tooltip: "reference of TurnDecisionSetupUI class",
    },
    InvestSellSetupUI: {
      default: null,
      type: InvestSellUI,
      serializable: true,
      tooltip: "reference of InvestSellUI class",
    },
    PayDaySetupUI: {
      default: null,
      type: PayDayUI,
      serializable: true,
      tooltip: "reference of InvestSellUI class",
    },
    SellBusinessSetupUI: {
      default: {},
      type: SellBusinessUI,
      serializable: true,
      tooltip: "reference of SellBusinessUI class",
    },
    InvestSetupUI: {
      default: {},
      type: InvestUI,
      serializable: true,
      tooltip: "reference of InvestUI class",
    },
    BuyOrSellSetupUI: {
      default: {},
      type: BuyOrSellUI,
      serializable: true,
      tooltip: "reference of BuyOrSellUI class",
    },
    OneQuestionSetupUI: {
      default: {},
      type: OneQuestionUI,
      serializable: true,
      tooltip: "reference of OneQuestionUI class",
    },
    PartnershipSetupUI: {
      default: {},
      type: PartnershipUI,
      serializable: true,
      tooltip: "reference of PartnershipUI class",
    },
    PopUpUI: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for pop up screen",
    },
    PopUpUILabel: {
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "label reference for pop up screen",
    },
    BusinessSetupNode: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for business setup screen",
    },
    GameplayUIScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for gameplay ui screen",
    },
    DecisionScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for Decision screen",
    },
    InvestSellScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for Invest & sell screen",
    },
    PayDayScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for PayDay screen",
    },
    SellBusinessScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SellBusiness screen",
    },
    InvestScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for Invest screen",
    },
    BuyOrSellScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for BuyOrSell screen",
    },
    OneQuestionSpaceScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for OneQuestionSpace screen",
    },
    OneQuestionDecisionScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for OneQuestionDecision screen",
    },
    InsufficientBalanceScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for InsufficientBalanceScreen screen",
    },
    TempDiceText: {
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "label reference for dice",
    },
    LeaveRoomButton: {
      default: null,
      type: cc.Node,
      serializable: true,
    },
  },

  onLoad() {
    this.CheckReferences();

    //local variables
    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
    this.IsBotTurn = false;
    this.IsBankrupted = false;
    this.BankruptedAmount = 0;
  },

  ResetTurnVariable() {
    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
  },

  CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null)
      GamePlayReferenceManager = require("GamePlayReferenceManager");

    if (!GameManager || GameManager == null)
      GameManager = require("GameManager");
  },

  onEnable: function () {
    //events subscription to be called
    cc.systemEvent.on("SyncData", this.SyncData, this);
  },

  onDisable: function () {
    cc.systemEvent.off("SyncData", this.SyncData, this);
  },

  ToggleScreen_InsufficientBalance(_state)
  {
    this.InsufficientBalanceScreen.active = _state;
  },

  Exit___InsufficientBalance()
  {
    this.ToggleScreen_InsufficientBalance(false);
  },
  //#region Spectate UI Setup
  InitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = true;
  },

  CloseInitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = false;
  },

  ToggleLeaveRoomButton_SpectateModeUI(_state) {
    this.LeaveRoomButton.active = _state;
  },

  OnLeaveButtonClicked_SpectateModeUI() {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(
      true
    );
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    setTimeout(() => {
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
  StartNewBusiness_BusinessSetup: function (
    isFirstTime,
    insideGame = false,
    modeIndex = 0,
    _isBankrupted = false,
    _BankruptAmount = 0
  ) {
    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;

    this.IsBankrupted = _isBankrupted;
    this.BankruptedAmount = _BankruptAmount;

    if (_isBankrupted) this.ResetTurnVariable();

    this.Init_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted);
  },
  Init_BusinessSetup: function (
    isFirstTime,
    insideGame = false,
    modeIndex = 0,
    _isBankrupted = false
  ) {
    PlayerDataIntance = new GameManager.PlayerData();
    PlayerBusinessDataIntance = new GameManager.BusinessInfo();

    if (isFirstTime) {
      this.BusinessSetupData.ExitButtonNode.active = false;
      this.BusinessSetupData.TimerNode.active = true;
      PlayerDataIntance.Cash = StartGameCash;
    }

    this.ResetButtonStates_BusinessSetup();

    if (insideGame) {
      this.BusinessSetupData.ExitButtonNode.active = true;
      this.BusinessSetupData.TimerNode.active = false;

      for (
        let index = 0;
        index <
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo
          .length;
        index++
      ) {
        if (
          GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData
            .userID ==
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            index
          ].PlayerUID
        ) {
          InsideGameBusinessSetup = index;
          PlayerDataIntance = GamePlayReferenceManager.Instance.Get_GameManager()
            .PlayerGameInfo[index];
          this.OnChangeName_BusinessSetup(
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              index
            ].PlayerName
          );
          this.OnChangeUID_BusinessSetup(
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              index
            ].PlayerUID
          );
          this.OnChangeCash_BusinessSetup(
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              index
            ].Cash
          );
        }
      }
    } else {
      InsideGameBusinessSetup = -1;
      this.OnChangeName_BusinessSetup(
        GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name
      );
      this.OnChangeUID_BusinessSetup(
        GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID
      );
      this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
    }
  },
  GetObj_BusinessSetup: function () {
    return this.BusinessSetupData;
  },
  OnChangeName_BusinessSetup: function (name) {
    this.BusinessSetupData.ChangeName_BusinessSetup(name);
    PlayerDataIntance.PlayerName = name;
  },
  OnChangeUID_BusinessSetup: function (UID) {
    PlayerDataIntance.PlayerUID = UID;
  },
  OnBusinessTypeTextChanged_BusinessSetup: function (name) {
    this.BusinessSetupData.BusinessTypeTextUI = name;
    PlayerBusinessDataIntance.BusinessTypeDescription = name;
  },
  OnBusinessNameTextChanged_BusinessSetup: function (name) {
    this.BusinessSetupData.BusinessNameTextUI = name;
    PlayerBusinessDataIntance.BusinessName = name;
  },
  ResetButtonStates_BusinessSetup: function () {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[1].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[1].active = false;
    this.BusinessSetupData.BusinessTypeLabel.string = "";
    this.BusinessSetupData.BusinessNameLabel.string = "";
    this.BusinessSetupData.BusinessNameTextUI = "";
    this.BusinessSetupData.BusinessTypeTextUI = "";
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.none;
  },
  OnHomeBasedSelected_BusinessSetup: function () {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[1].active = true;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[1].active = false;

    PlayerBusinessDataIntance.BusinessType =
      GameManager.EnumBusinessType.HomeBased;
  },
  OnBrickMortarSelected_BusinessSetup: function () {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[1].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[1].active = true;

    PlayerBusinessDataIntance.BusinessType =
      GameManager.EnumBusinessType.brickAndmortar;
  },
  OnChangeCash_BusinessSetup: function (amount) {
    this.BusinessSetupData.PlayerCashUI.string = "$" + amount;
    PlayerDataIntance.Cash = amount;
  },
  CalculateLoan_BusinessSetup: function (amount) {
    var _loanTaken = false;
    var _businessIndex = 0;

    for (
      let index = 0;
      index < PlayerDataIntance.NoOfBusiness.length;
      index++
    ) {
      if (PlayerDataIntance.NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    if (_loanTaken) {
      this.ShowToast(
        "You have already taken loan of $" +
          PlayerDataIntance.NoOfBusiness[_businessIndex].LoanAmount
      );
    } else {
      if (PlayerDataIntance.Cash >= amount) {
        this.ShowToast(
          "You do not need loan, you have enough cash to buy current selected business."
        );
      } else {
        this.BusinessSetupData.LoanSetupNode.active = true;
        RequiredCash = Math.abs(parseInt(PlayerDataIntance.Cash) - amount);
        this.BusinessSetupData.LoanAmountLabel[0].children[1].children[0].getComponent(
          cc.Label
        ).string = "$" + RequiredCash;
      }
    }
  },
  OnLoanButtonClicked_BusinessSetup: function (event) {
    if (
      PlayerBusinessDataIntance.BusinessType ==
      GameManager.EnumBusinessType.brickAndmortar
    ) {
      this.CalculateLoan_BusinessSetup(50000);
    } else if (
      PlayerBusinessDataIntance.BusinessType ==
      GameManager.EnumBusinessType.HomeBased
    ) {
      this.CalculateLoan_BusinessSetup(10000);
    } else {
      this.ShowToast(
        "please select business between Home Based and brick & mortar. "
      );
    }
  },
  OnLoanBackButtonClicked_BusinessSetup: function (event) {
    this.BusinessSetupData.LoanSetupNode.active = false;
  },
  HighLightLoanSelection_BusinessSetup: function (index) {
    for (var i = 0; i < this.BusinessSetupData.LoanAmountLabel.length; i++) {
      if (index == i)
        this.BusinessSetupData.LoanAmountLabel[i].children[0].active = true;
      else this.BusinessSetupData.LoanAmountLabel[i].children[0].active = false;
    }
  },
  OnLoanAmountChoosed_01_BusinessSetup: function (event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.Other;
    this.HighLightLoanSelection_BusinessSetup(0);
  },
  OnLoanAmountChoosed_02_BusinessSetup: function (event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.TenThousand;
    this.HighLightLoanSelection_BusinessSetup(1);
  },
  OnLoanAmountChoosed_03_BusinessSetup: function (event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.TentyThousand;
    this.HighLightLoanSelection_BusinessSetup(2);
  },
  OnLoanAmountChoosed_04_BusinessSetup: function (event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.ThirtyThousand;
    this.HighLightLoanSelection_BusinessSetup(3);
  },
  OnLoanAmountChoosed_05_BusinessSetup: function (event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.FortyThousand;
    this.HighLightLoanSelection_BusinessSetup(4);
  },
  OnLoanAmountChoosed_06_BusinessSetup: function (event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.FiftyThousand;
    this.HighLightLoanSelection_BusinessSetup(5);
  },
  OnTakenLoanClicked_BusinessSetup: function (event) {
    if (this.BusinessSetupData.LoanAmount == LoanAmountEnum.Other)
      PlayerBusinessDataIntance.LoanAmount = RequiredCash;
    else
      PlayerBusinessDataIntance.LoanAmount = parseInt(
        this.BusinessSetupData.LoanAmount
      );

    PlayerBusinessDataIntance.LoanTaken = true;
    this.OnLoanBackButtonClicked_BusinessSetup();
    PlayerDataIntance.Cash =
      PlayerDataIntance.Cash + PlayerBusinessDataIntance.LoanAmount;
    this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
  },

  SyncData: function (_data, _ID) {
    if (
      _ID !=
      GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor()
        .actorNr
    )
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(
        _data
      );

    console.log(
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo
    );

    if (
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo
        .length >=
      GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers
    ) {
      //setting room property to declare initial setup has been
      GamePlayReferenceManager.Instance.Get_MultiplayerController()
        .getPhotonRef()
        .myRoom()
        .setCustomProperty("InitialSetup", true, true);
      GamePlayReferenceManager.Instance.Get_MultiplayerController()
        .getPhotonRef()
        .myRoom()
        .setCustomProperty(
          "PlayerGameInfo",
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo,
          true
        );
      this.BusinessSetupData.WaitingStatusNode.active = false;
      this.BusinessSetupNode.active = false;
      this.GameplayUIScreen.active = true;

      GamePlayReferenceManager.Instance.Get_GameManager().StartTurn();

      console.log(
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo
      );
    }
  },

  PurchaseBusiness: function (_amount, _businessName, _isHomeBased) {
    if (PlayerDataIntance.Cash < _amount) {
      this.ShowToast(
        "You have not enough cash to buy this " + _businessName + " business."
      );
    } else {
      if (_isHomeBased) {
        if (PlayerDataIntance.HomeBasedAmount < 3) {
          PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
          this.BusinessSetupData.PlayerCashUI.string =
            "$" + PlayerDataIntance.Cash;
          this.StartGame = true;
          PlayerDataIntance.HomeBasedAmount++;
        } else {
          this.StartGame = false;
          this.ShowToast(
            "You cannot own more than three Home based businesses"
          );
        }
      } else {
        PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
        this.BusinessSetupData.PlayerCashUI.string =
          "$" + PlayerDataIntance.Cash;
        this.StartGame = true;
        PlayerDataIntance.BrickAndMortarAmount++;
      }
    }
  },

  Exit_BusinessSetup: function () {
    this.BusinessSetupNode.active = false;

    if (PlayerBusinessDataIntance.LoanTaken) {
      PlayerBusinessDataIntance.LoanTaken = false;
      PlayerDataIntance.Cash =
        PlayerDataIntance.Cash - PlayerBusinessDataIntance.LoanAmount;
      PlayerBusinessDataIntance.LoanAmount = 0;
      this.ShowToast("Reverting back loan amount.", 500);
    }
  },

  InitialSetup_BusinessSetup: function () {
    var _mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

    if (this.IsBankrupted) {
      PlayerDataIntance.IsBankrupt = true;
      PlayerDataIntance.BankruptAmount = this.BankruptedAmount;
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
        GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber()
      ] = PlayerDataIntance;
    } else {
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(
        PlayerDataIntance
      );
    }

    if (_mode == 2) {
      //for real players
      //setting player current data in custom properties when his/her turn overs
      GamePlayReferenceManager.Instance.Get_MultiplayerController()
        .PhotonActor()
        .setCustomProperty("PlayerSessionData", PlayerDataIntance);

      if (!this.IsBankrupted) {
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(
          1,
          PlayerDataIntance
        );
        this.BusinessSetupData.WaitingStatusNode.active = true;
      } else {
        this.BusinessSetupData.WaitingStatusNode.active = false;
        this.BusinessSetupNode.active = false;
        this.GameplayUIScreen.active = true;

        var _data = {
          Data: {
            bankrupted: true,
            turn: GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber(),
            PlayerDataMain: PlayerDataIntance,
          },
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(
          9,
          _data
        );

        GamePlayReferenceManager.Instance.Get_GameManager().StartTurnAfterBankrupt();
      }
    } else if (_mode == 1) {
      //for AI
      if (!this.IsBankrupted) {
        this.BusinessSetupData.WaitingStatusNode.active = true;
        setTimeout(() => {
          this.BusinessSetupData.WaitingStatusNode.active = false;
          this.BusinessSetupNode.active = false;
          this.GameplayUIScreen.active = true;
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

  StartNewSetup_DuringGame_BusinessSetup: function () {
    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
      InsideGameBusinessSetup
    ] = PlayerDataIntance;
    this.BusinessSetupNode.active = false;
    InsideGameBusinessSetup = -1;
    this.ToggleDecision_TurnDecision(true);
  },

  PayAmountToPlayGame: function () {
    this.StartGame = false;

    if (PlayerBusinessDataIntance.BusinessTypeDescription == "")
      this.ShowToast("please write a business type.");
    else if (PlayerBusinessDataIntance.BusinessName == "")
      this.ShowToast("please write a business name.");
    else {
      if (
        PlayerBusinessDataIntance.BusinessType ==
        GameManager.EnumBusinessType.HomeBased
      )
        //if selected business is homebassed
        this.PurchaseBusiness(10000, "home", true);
      else if (
        PlayerBusinessDataIntance.BusinessType ==
        GameManager.EnumBusinessType.brickAndmortar
      )
        //if selected business is brick and mortar
        this.PurchaseBusiness(50000, "brick and mortar", false);

      if (this.StartGame == true || this.IsBankrupted == true) {
        PlayerDataIntance.NoOfBusiness.push(PlayerBusinessDataIntance);

        if (InsideGameBusinessSetup != -1)
          //if start new business has not been called from inside game
          this.StartNewSetup_DuringGame_BusinessSetup();
        //if start new business has been called at start of game as initial setup
        else this.InitialSetup_BusinessSetup();

        //prtinting all values to console
        for (
          var i = 0;
          i <
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo
            .length;
          i++
        ) {
          console.log(
            "player name: " +
              GamePlayReferenceManager.Instance.Get_GameManager()
                .PlayerGameInfo[i].PlayerName
          );
          console.log(
            "player ID: " +
              GamePlayReferenceManager.Instance.Get_GameManager()
                .PlayerGameInfo[i].PlayerUID
          );
          console.log(
            "Is player bot: " +
              GamePlayReferenceManager.Instance.Get_GameManager()
                .PlayerGameInfo[i].IsBot
          );
          console.log("no of business of player (see below): ");
          console.log(
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              i
            ].NoOfBusiness
          );
          console.log(
            "player cash: " +
              GamePlayReferenceManager.Instance.Get_GameManager()
                .PlayerGameInfo[i].Cash
          );
          console.log(
            "player taken loan: " +
              GamePlayReferenceManager.Instance.Get_GameManager()
                .PlayerGameInfo[i].LoanTaken
          );
          console.log(
            "taken loan amount: " +
              GamePlayReferenceManager.Instance.Get_GameManager()
                .PlayerGameInfo[i].LoanAmount
          );
        }
      }
    }
  },
  //#endregion

  //#region TurnDecisionSetupUI
  //TurnDecisionSetupUI//------------------------
  ToggleDecision_TurnDecision: function (isactive) {
    this.DecisionScreen.active = isactive;
    this.UpdateCash_TurnDecision();
  },

  UpdateCash_TurnDecision: function () {
    this.TurnDecisionSetupUI.CashAmountLabel.string =
      "$ " +
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
        GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber()
      ].Cash;
  },

  OnMarketingAmountChanged_TurnDecision: function (amount) {
    //console.log(amount);
    TempMarketingAmount = amount;
  },

  OnMarketingAmountSelected_TurnDecision: function () {
    if (TempMarketingAmount == "" || TempMarketingAmount == null) {
      this.ShowToast("Please enter an amount.");
    } else {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      this.marketingAmount = parseInt(TempMarketingAmount);
      console.log(
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
          _playerIndex
        ].Cash
      );

      //if player entered amount is greater than total cash he owns
      if (
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
          _playerIndex
        ].Cash >= this.marketingAmount
      ) {
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
          _playerIndex
        ].Cash =
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash - this.marketingAmount;
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
          _playerIndex
        ].MarketingAmount =
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].MarketingAmount + this.marketingAmount;
        this.ShowToast(
          "you successfully marketed amount of $" +
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].MarketingAmount +
            " , remaining cash is $" +
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].Cash +
            "."
        );
        this.UpdateCash_TurnDecision();

        //reseting marketing label and its holding variable
        this.TurnDecisionSetupUI.MarketingEditBox.string = "";
        TempMarketingAmount = "";
      } else {
        this.ShowToast("you don't have enough money.");

        //reseting marketing label and its holding variable
        this.TurnDecisionSetupUI.MarketingEditBox.string = "";
        TempMarketingAmount = "";
      }
    }
  },

  OnHiringLawyerButtonClicked_TurnDecision: function () {
    // if player has more than 5000$
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    if (
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
        _playerIndex
      ].LawyerStatus
    ) {
      this.ShowToast("you have already hired a lawyer.");
    } else {
      if (
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
          _playerIndex
        ].Cash >= 5000
      ) {
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
          _playerIndex
        ].LawyerStatus = true;
        TempHiringLawyer = true;
        console.log(TempHiringLawyer);
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
          _playerIndex
        ].Cash =
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash - 5000;
        this.ShowToast(
          "you have successfully hired a lawyer, remaining cash is $" +
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].Cash +
            "."
        );
        this.UpdateCash_TurnDecision();
      } else {
        this.ShowToast("sorry, you dont have enough money to hire a lawyer.");
      }
    }
  },

  onLocationNameChanged_ExpandBusiness_TurnDecision(_name) {
    LocationName = _name;
  },
  OnExpandButtonClicked_TurnDecision: function () {
    //if player has brick and mortar business he could expand it
    console.log("expand business");
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = true;
    var generatedLength = GamePlayReferenceManager.Instance.Get_GameManager().GenerateExpandBusiness_Prefabs_TurnDecision();

    if (generatedLength == 0) {
      this.ShowToast("You have no brick and mortar business to expand.", 1500);
      setTimeout(() => {
        this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
      }, 1600);
    }
  },

  OnExpandButtonExitClicked_TurnDecision: function () {
    this.UpdateCash_TurnDecision();
    this.CheckReferences();
    LocationName = "";
    console.log("expand business exit called");
    GamePlayReferenceManager.Instance.Get_GameManager().DestroyGeneratedNodes();
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
  },

  OnNewBusinessButtonClicked_TurnDecision: function () {
    console.log("starting new business");
    this.StartNewBusiness_BusinessSetup(false, true);
  },

  OnGoldAmountChanged_TurnDecision: function (amount) {
    //console.log(amount);
    GoldCashAmount = amount;
  },

  OnGoldDiceClicked_TurnDecision: function () {
    if (!this.GoldInvested) {
      this.GoldInvested = true;
      EnterBuySellAmount = "";
      this.ToggleInvestSellScreen_InvestSell(true);
      this.InvestSellSetupUI.InvestState = InvestEnum.GoldInvest;
      DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
      OnceOrShare = DiceResult * 1000;

      this.AssignData_InvestSell(
        "Invest In GOLD",
        DiceResult,
        "Each Ounce of GOLD price is:",
        OnceOrShare + "/ounce",
        "Enter the number of ounce of GOLD you want to BUY",
        "Total Buying Amount:",
        OnceOrShare + "*0=0",
        "BUY",
        this.InvestSellSetupUI.InvestState
      );
    } else {
      this.ShowToast("You can invest in gold one time during turn.", 800);
    }
  },

  OnStockBusinessNameChanged_TurnDecision: function (name) {
    StockBusinessName = name;
  },

  OnStockDiceClicked_TurnDecision: function () {
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

        this.AssignData_InvestSell(
          "Invest in Stock",
          DiceResult,
          "Each Share of stock price is:",
          OnceOrShare + "/share",
          "Enter the number of shares of stock you want to BUY",
          "Total Buying Amount:",
          OnceOrShare + "*0=0",
          "BUY",
          this.InvestSellSetupUI.InvestState
        );
      }
    } else {
      this.ShowToast("You can invest in stocks one time during turn.", 800);
    }
  },

  OnSellGoldClicked_TurnDecision: function () {
    if (!this.GoldSold) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      if (
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
          _playerIndex
        ].GoldCount > 0
      ) {
        this.GoldSold = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.GoldSell;
        DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        OnceOrShare = DiceResult * 1000;

        this.AssignData_InvestSell(
          "Sell GOLD",
          DiceResult,
          "Each Ounce of GOLD price is:",
          OnceOrShare + "/ounce",
          "Enter the number of ounce of GOLD you want to SELL",
          "Total Selling Amount:",
          OnceOrShare + "*0=0",
          "SELL",
          this.InvestSellSetupUI.InvestState
        );
      } else {
        this.ShowToast(
          "you have not purchased any GOLD ounces, please buy them."
        );
      }
    } else {
      this.ShowToast("You can sell gold one time during turn.", 800);
    }
  },

  OnSellStockClicked_TurnDecision: function () {
    if (!this.StockSold) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      if (
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
          _playerIndex
        ].StockCount > 0
      ) {
        this.StockSold = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.StockSell;
        DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        OnceOrShare = DiceResult * 1000;

        this.AssignData_InvestSell(
          "Sell STOCK",
          DiceResult,
          "Each share of stock price is:",
          OnceOrShare + "/share",
          "Enter the number of shares of stock you want to SELL",
          "Total Selling Amount:",
          OnceOrShare + "*0=0",
          "SELL",
          this.InvestSellSetupUI.InvestState
        );
      } else {
        this.ShowToast("you have not purchased any shares, please buy them.");
      }
    } else {
      this.ShowToast("You can sell stocks one time during turn.", 800);
    }
  },

  OnPartnershipClicked_TurnDecision: function () {
    console.log("go into partner ship");
    // this.ShowToast("work in progress, coming soon...");
    // var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    this.EnablePartnership_PartnerShipSetup();
  },

  OnRollDiceClicked_TurnDecision: function () {
    console.log("roll the dice");
    this.ToggleDecision_TurnDecision(false);
    GamePlayReferenceManager.Instance.Get_GameManager().RollDice();
  },

  PrintDiceValue_TurnDecision: function (value) {
    //this.TempDiceText.string=value;
  },
  //#endregion

  //#region Partnership setup
  ToggleScreen_PartnerShipSetup(_state) {
    this.PartnershipSetupUI.MainScreen.active = _state;
  },

  ToggleWaitingScreen_PartnerShipSetup(_state) {
    this.PartnershipSetupUI.WaitingStatusScreen.active = _state;
  },

  ToggleDecisionScreen_PartnerShipSetup(_state) {
    this.PartnershipSetupUI.DecisionScreen.active = _state;
  },

  EnablePartnership_PartnerShipSetup() {
    CancelledID = [];
    this.Reset_PartnerShipSetup();
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = _manager.GetTurnNumber();
    var _tempData = _manager.PlayerGameInfo[_playerIndex];
    this.ToggleScreen_PartnerShipSetup(true);
    this.PartnershipSetupUI.PlayerName.string =_tempData.PlayerName;
    this.PartnershipSetupUI.PlayerCash.string ="$"+_tempData.Cash;

    for (let index = 0; index < _tempData.NoOfBusiness.length; index++) {
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
      }
      else {
        node.getComponent("BusinessDetail").TogglePartnerShipButton(true);
        node.getComponent("BusinessDetail").SetPartnerName("none");
      }

      businessDetailPartnershipNodes.push(node);
      
    }
  },

  EnablePartnershipDecision_PartnerShipSetup(_msg) {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = _manager.GetTurnNumber();
    var _tempData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    this.ToggleDecisionScreen_PartnerShipSetup(true);
    this.PartnershipSetupUI.DecisionPlayerName.string =_tempData.PlayerName;
    this.PartnershipSetupUI.DecisionPlayerCash.string ="$"+_tempData.Cash;
    this.PartnershipSetupUI.DecisionDescription.string = _msg;
  },

  Exit_PartnerShipSetup() {
    this.Reset_PartnerShipSetup();
    this.ToggleScreen_PartnerShipSetup(false);
  },
  
  Reset_PartnerShipSetup()
  {
    for (let index = 0; index < businessDetailPartnershipNodes.length; index++) {
      businessDetailPartnershipNodes[index].destroy();
    }
    businessDetailPartnershipNodes = [];
  },

  ReceiveEvent_PartnershipSetup(_data)
  {
    PartnerShipOfferReceived = true;
    PartnerShipData = _data;
    var _actor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
    var _turn = _data.Data.Turn;
    var _playerData = _data.Data.PlayerData;
    var _SelectedBusinessIndex = _data.Data.SelectedBusinsessIndex;
    var _businessValue = _data.Data.BusValue;
    var _payAmount = _businessValue / 2;
    var _businessMode = "";

    if (_playerData.NoOfBusiness[_SelectedBusinessIndex].BusinessType == 1)
      _businessMode = "Home Based";
    else if (_playerData.NoOfBusiness[_SelectedBusinessIndex].BusinessType == 2)
      _businessMode = "Brick & Mortar";
      
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false)
    {
      var _msg = "you have received partnership offer by " + _playerData.PlayerName + " , following are the details of business: " + "\n" + "\n" +
        "Business Name: " + _playerData.NoOfBusiness[_SelectedBusinessIndex].BusinessName + "\n" +
        "Business Mode: " + _businessMode + "\n" +
        "Business Value: $" + _businessValue + "\n" +
        "Cash Payment: $" + _payAmount + "\n" + "\n" +
        "if offer is accepted you will receive 50% share of that particular business and will receive profit/lose on that particular business.";
    
      this.EnablePartnershipDecision_PartnerShipSetup(_msg);
    }

  },

  AcceptOffer_PartnershipSetup()
  {
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
        this.ShowToast("congratulations! you have started business partnership",1800);
      } else {
        this.ShowToast("Not enough cash.", 500);
      }
    } else
    {
      this.ShowToast("Offer has been accepted by other player.");
      this.ToggleDecisionScreen_PartnerShipSetup(false);
      }
  },

  CancelOffer_PartnershipSetup()
  {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _data = PartnerShipData;
    var _SelectedBusinessIndex = _data.Data.SelectedBusinsessIndex;
    var myIndex = _manager.GetMyIndex();
    console.log(_manager.PlayerGameInfo[myIndex].PlayerUID);
    if (PartnerShipOfferReceived == true) {
        this.RaiseEventDecisionAnswer_PartnershipSetup(false, 0, true, _manager.PlayerGameInfo[myIndex].PlayerUID, _manager.PlayerGameInfo[myIndex], _SelectedBusinessIndex);
        this.ToggleDecisionScreen_PartnerShipSetup(false);
        this.ShowToast("you have cancelled the offer.",1200);
    } else
    {
      this.ToggleDecisionScreen_PartnerShipSetup(false);
      this.ShowToast("you have cancelled the offer.",1200);
    }
  },

  RaiseEventDecisionAnswer_PartnershipSetup(_isAccepted=false,_payment=0,_isCancelled=false,_uID="",_data=null,_businessIndex=0)
  {
    var _mainData = { Data: { Accepted: _isAccepted, CashPayment:_payment,Cancelled:_isCancelled,PlayerID:_uID,PlayerData:_data,BusinessIndex:_businessIndex} };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(12, _mainData);
  },

  ReceiveEventDecisionAnswer_PartnershipSetup(_data)
  {
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
      if(_manager.PlayerGameInfo[_playerIndex].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
      {
        if (_accepted) {
          this.ToggleScreen_PartnerShipSetup(false);
          this.ToggleWaitingScreen_PartnerShipSetup(false);
          _manager.PlayerGameInfo[_playerIndex].Cash += _cash;
          _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].IsPartnership = true;
          _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].PartnerID = _uid;
          _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].PartnerName = _playerData.PlayerName;
          GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", _manager.PlayerGameInfo[_playerIndex]);

          console.log("offer accepted");
          this.ShowToast("your partnership offer has been accepted by " + _playerData.PlayerName + ", cash $" + _cash + " has been added to your account.", 2800);
          this.UpdateCash_TurnDecision();
        } else if (_cancelled) {
          if (CancelledID.includes(_uid) == false)
              CancelledID.push(_uid);
        
          console.log(CancelledID);
          if (CancelledID.length == _manager.PlayerGameInfo.length - 1) {
            this.ToggleScreen_PartnerShipSetup(false);
            this.ToggleWaitingScreen_PartnerShipSetup(false);
            this.ShowToast("your partnership offer has been cancelled by all other users.", 2800);
          }

          console.log("offer rejected");
        }
      } else {
        if (_accepted) {
          PartnerShipOfferReceived = false;
          this.ShowToast("Offer has been accepted by other player.", 1800);
          this.ToggleDecisionScreen_PartnerShipSetup(false);
        } else if (_cancelled) {
        }
      }
    }
  },
  //#endregion

  //#region Invest and sell moddule

  ResetGoldInput() {
    this.TurnDecisionSetupUI.GoldEditBox.string = "";
    GoldCashAmount = "";
  },

  ResetStockBusinessNameInput() {
    this.TurnDecisionSetupUI.StockEditBox.string = "";
    StockBusinessName = "";
  },

  onAmountChanged_InvestSell(_amount) {
    EnterBuySellAmount = _amount;

    if (EnterBuySellAmount == "") {
      this.UpdateData_InvestSell(OnceOrShare + "*0=0");
    } else {
      var _amount = parseInt(EnterBuySellAmount);
      var _amount = OnceOrShare * _amount;
      this.UpdateData_InvestSell(
        OnceOrShare + "*" + EnterBuySellAmount + "=" + _amount
      );
    }
  },

  ToggleInvestSellScreen_InvestSell(_state) {
    this.InvestSellScreen.active = _state;
    this.UpdateCash_TurnDecision();
    this.ResetGoldInput();
    this.ResetStockBusinessNameInput();
  },

  AssignData_InvestSell(
    _title,
    _diceResult,
    _priceTitle,
    _priceValue,
    _buyOrSellTitle,
    _totalAmountTitle,
    _totalAmountValue,
    _buttonName,
    _state
  ) {
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

  UpdateData_InvestSell(_totalAmountValue) {
    this.InvestSellSetupUI.TotalAmountValueLabel.string = _totalAmountValue;
  },

  ApplyButton_InvestSell() {
    if (EnterBuySellAmount == "") {
      this.ShowToast("Please enter an amount.");
    } else {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (this.InvestSellSetupUI.InvestState == InvestEnum.GoldInvest) {
        var _amount = parseInt(EnterBuySellAmount);
        var _TotalAmount = OnceOrShare * _amount;
        if (
          _TotalAmount <=
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash
        ) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash =
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].Cash - _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].GoldCount =
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].GoldCount + _amount;
          this.ShowToast(
            "You have successfully bought " + _amount + " ounces of GOLD",
            1400
          );
          setTimeout(() => {
            this.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("You don't have enough cash.");
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.GoldSell) {
        var _amount = parseInt(EnterBuySellAmount);
        if (
          _amount <=
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].GoldCount
        ) {
          var _TotalAmount = OnceOrShare * _amount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash =
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].Cash + _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].GoldCount =
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].GoldCount - _amount;
          this.ShowToast(
            "You have successfully sold " +
              _amount +
              " ounces of GOLD for  $" +
              _TotalAmount,
            1400
          );
          setTimeout(() => {
            this.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast(
            "you don't have enough GOLD ounces, you own " +
              GamePlayReferenceManager.Instance.Get_GameManager()
                .PlayerGameInfo[_playerIndex].GoldCount +
              " of GOLD ounces"
          );
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.StockInvest) {
        var _amount = parseInt(EnterBuySellAmount);
        var _TotalAmount = OnceOrShare * _amount;
        if (
          _TotalAmount <=
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash
        ) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash =
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].Cash - _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].StockCount =
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].StockCount + _amount;
          //can add multiple stocks with business name in object if required

          this.ShowToast(
            "You have successfully bought " +
              _amount +
              " shares of business " +
              StockBusinessName,
            1400
          );
          setTimeout(() => {
            this.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("You don't have enough cash.");
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.StockSell) {
        var _amount = parseInt(EnterBuySellAmount);

        if (
          _amount <=
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].StockCount
        ) {
          var _TotalAmount = OnceOrShare * _amount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash =
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].Cash + _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].StockCount =
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
              _playerIndex
            ].StockCount - _amount;

          this.ShowToast(
            "You have successfully sold " +
              _amount +
              " shares of stock for  $" +
              _TotalAmount,
            1400
          );
          setTimeout(() => {
            this.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast(
            "you don't have enough stocks shares, you own " +
              GamePlayReferenceManager.Instance.Get_GameManager()
                .PlayerGameInfo[_playerIndex].StockCount +
              " of stock shares"
          );
        }
      }
    }
  },

  ExitButton_InvestSell() {
    this.ToggleInvestSellScreen_InvestSell(false);
  },
  //#endregion

  //#region Payday or Double pay Day
  TogglePayDayScreen_PayDay(_state) {
    this.PayDayScreen.active = _state;
  },

  ToggleResultPanelScreen_PayDay(_state) {
    this.PayDaySetupUI.ResultPanelNode.active = _state;
  },

  UpdateButtons_PayDay(HMAmount, BMAmount, loanTaken) {
    if (HMAmount == 0) {
      HomeBasedPaymentCompleted = true;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(
        cc.Button
      ).interactable = false;
    } else {
      HomeBasedPaymentCompleted = false;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(
        cc.Button
      ).interactable = true;
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

  GetLoanAmount_PayDay() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _loan = 0;
    for (
      let index = 0;
      index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length;
      index++
    ) {
      if (_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loan =
          _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount;
        break;
      }
    }
    return _loan;
  },

  AssignData_PayDay(_title,_isDoublePayDay = false,_skipHM = false,_skipBM = false,_isBot = false) {
    this.IsBotTurn = _isBot;
    DoublePayDay = _isDoublePayDay;
    this.TogglePayDayScreen_PayDay(true);
    this.PayDaySetupUI.TitleLabel.string = _title;
    var _time = 1800;

    if (_isBot == false) {
      //check skip payday variables
      if (_skipHM && _skipBM)
        this.ShowToast("your payday on home based and brick & mortar businessess will be skipped.",_time);
      else if (_skipHM)
        this.ShowToast("your payday on home based businessess will be skipped.",_time);
      else if (_skipBM)
        this.ShowToast("your payday on brick & mortar businessess will be skipped.",_time);
    } else {
      //check skip payday variables
      if (_skipHM && _skipBM)
        console.log("your payday on home based and brick & mortar businessess will be skipped.");
      else if (_skipHM)
        console.log("your payday on home based businessess will be skipped.");
      else if (_skipBM)
        console.log("your payday on brick & mortar businessess will be skipped.");
    }

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    this.UpdateCash_PayDay(
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash
    );

    var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;
    var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
    var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

    var _loanTaken = false;
    var _businessIndex = 0;

    for (let index = 0;index <GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length;index++) {
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
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    //check if loan was skipped previously
    if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) {
      var _loan = this.GetLoanAmount_PayDay();
      this.PayDaySetupUI.LoanFotterLabel.string = "*pay $" + _loan;
    } else {
      this.PayDaySetupUI.LoanFotterLabel.string = "*pay $5000";
    }

    //check skip payday variables
    if (_skipHM && _skipBM) this.UpdateButtons_PayDay(0, 0, loanTaken);
    else if (_skipHM) this.UpdateButtons_PayDay(0, BMAmount, loanTaken);
    else if (_skipBM) this.UpdateButtons_PayDay(HMAmount, 0, loanTaken);
    else this.UpdateButtons_PayDay(HMAmount, BMAmount, loanTaken);

    if (_skipBM || _skipHM) {
      setTimeout(() => {
        this.PayDayCompleted();
      }, _time + 200);
    }

    if (_isBot) {
      this.OnHomeBasedPaymentClicked_PayDay();
      this.OnBMPaymentClicked_PayDay();
      this.OnLoanPaymentClicked_PayDay();
    }
  },

  OnHomeBasedPaymentClicked_PayDay() {
    if (!HomeBasedPaymentCompleted) {
        this.ToggleResultPanelScreen_PayDay(true);

      if (!DoublePayDay)
        this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";
      else
        this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";

      HomeBasedPaymentCompleted = true;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = false;

      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;
      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollOneDice();
      var _tempData = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness;

      var _amountToBeSend = 0;
      var _amountToBeAdjusted = 0;
      var _multiplier = 1;

      //partnership code
      if (DoublePayDay)
        _multiplier = 2;

      for (let index = 0; index < _tempData.length; index++) {
        if (_tempData[index].BusinessType == 1)
        {
          if (_tempData[index].IsPartnership)
          {
            var _payment =_multiplier* _dice * 1000;
            _amountToBeSend = (_payment / 2);
            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[index].PartnerID);
            _amountToBeAdjusted += _amountToBeSend;
          }  
        }
      }

      if (_amountToBeAdjusted>0)
      {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", 2000);
      }
      //partnership code

      if (!DoublePayDay)
        TotalPayDayAmount = HMAmount * _dice * 1000-_amountToBeAdjusted;
      else
        TotalPayDayAmount = 2 * (HMAmount * _dice) * 1000-_amountToBeAdjusted;

      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;

      if (!DoublePayDay)
        this.PayDaySetupUI.TotalAmountLabel.string ="("+_dice + "*" + HMAmount + "*" + "1000)-"+_amountToBeAdjusted+"="+ TotalPayDayAmount;
      else
        this.PayDaySetupUI.TotalAmountLabel.string ="("+_dice + "*" + HMAmount + "*" + "1000*2)-"+_amountToBeAdjusted+"=" + TotalPayDayAmount;

      if (this.IsBotTurn) {
        this.ReceivePayment_PayDay();
      }
    }
  },

  OnBMPaymentClicked_PayDay() {
    //brick and mortar
    if (!BrickMortarPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);

      if (!DoublePayDay)
        this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";
      else
        this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";

      BrickMortarPaymentCompleted = true;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = false;
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
      var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

      var _amount = BMAmount + BMLocations;
      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();

      var _tempData = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness;

      var _amountToBeSend = 0;
      var _amountToBeAdjusted = 0;
      var _multiplier = 1;

      if (DoublePayDay)
        _multiplier = 2;

      for (let index = 0; index < _tempData.length; index++) {
        if (_tempData[index].BusinessType == 2)
        {
          if (_tempData[index].IsPartnership)
          {
            var _locations = _tempData[index].LocationsName.length + 1;
            var _payment =_locations*_multiplier* _dice * 2000;
            _amountToBeSend = (_payment / 2);
            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[index].PartnerID);
            _amountToBeAdjusted += _amountToBeSend;
          }  
        }
      }

      if (_amountToBeAdjusted>0)
      {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", 2000);
      }

      if (!DoublePayDay)
        TotalPayDayAmount = _amount * _dice * 2000-_amountToBeAdjusted;
      else
        TotalPayDayAmount = 2 * (_amount * _dice) * 2000-_amountToBeAdjusted;

      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;

      if (!DoublePayDay)
        this.PayDaySetupUI.TotalAmountLabel.string ="("+_dice + "*" + _amount + "*" + "2000)-" +_amountToBeAdjusted+"="+ TotalPayDayAmount;
      else
        this.PayDaySetupUI.TotalAmountLabel.string ="("+_dice + "*" + _amount + "*" + "2000*2)-"+_amountToBeAdjusted+"=" + TotalPayDayAmount;

      if (this.IsBotTurn) {
        this.ReceivePayment_PayDay();
      }
    }
  },

  OnLoanPaymentClicked_PayDay() {
    //brick and mortar
    if (!LoanPayed) {
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      var _EstimateLoan = 0;

      if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment)//if player had skippped loan previously call all amount due
        _EstimateLoan = this.GetLoanAmount_PayDay();
      else
        _EstimateLoan = 5000;

      if (
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= _EstimateLoan) {
        LoanPayed = true;
        this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash =GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _EstimateLoan;

        var _loanTaken = false;
        var _businessIndex = 0;

        for (let index = 0;index <GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length;index++) {
          if (
            GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
            _loanTaken = true;
            _businessIndex = index;
            break;
          }
        }

        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount =GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount - _EstimateLoan;
        
        if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount <= 0) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = 0;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanTaken = false;
        }

        if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment)
          _manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment = false;

        this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
        this.PayDayCompleted();
      }
      else {
        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment)
          this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = false;
        else
          this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = true;

        this.PayDaySetupUI.LoanResultPanelNode.active = true;
        console.error("out of money");
      }
    }
  },

  ReceivePayment_PayDay() {
    //all
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash =GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[ _playerIndex].Cash + TotalPayDayAmount;
    this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
    if (!this.IsBotTurn) {
      this.ShowToast(
        "Amount $" +
          TotalPayDayAmount +
          " has been added to your cash amount, Total Cash has become $" +
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash,
        1500
      );
      setTimeout(() => {
        this.ToggleResultPanelScreen_PayDay(false);
        this.PayDayCompleted();
      }, 1550);
    } else {
      console.log(
        "Amount $" +
          TotalPayDayAmount +
          " has been added to your cash amount, Total Cash has become $" +
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[
            _playerIndex
          ].Cash
      );
      this.ToggleResultPanelScreen_PayDay(false);
      this.PayDayCompleted();
    }
  },

  SkipLoanOneTime_PayDay() {
    this.ShowToast(
      "You have skipped the loan payment, bank will call upon complete loan amount on next payday",
      2000
    );
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    _manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment = true;
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
    LoanPayed = true;
    this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;
    this.PayDayCompleted();
    LoanPayed = true;
  },

  SellBusiness_PayDay() {
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
    this.EnableSellScreen__SellBusinessUISetup(false);
  },

  UpdateCash_PayDay(_amount) {
    this.PayDaySetupUI.CashLabel.string = "$" + _amount;
  },

  ExitLoanScreen_PayDay() {
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
  },

  StartNewGame_PayDay() {
    //if bankrupted you can start new game
    this.ShowToast(
      "You will lose all progress and start new game from the start.",
      3000
    );
    setTimeout(() => {
      this.ExitLoanScreen_PayDay();
      this.TogglePayDayScreen_PayDay(false);
      this.Exit___InsufficientBalance();
      cc.systemEvent.emit("ShowCard", "", false);
      HomeBasedPaymentCompleted = false;
      BrickMortarPaymentCompleted = false;
      LoanPayed = false;
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
      GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false,false);
      GamePlayReferenceManager.Instance.Get_GameManager().Bankrupt_TurnDecision();
    }, 3010);
  },

  PayDayCompleted() {
    if (HomeBasedPaymentCompleted && BrickMortarPaymentCompleted && LoanPayed) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      console.log("all payday done");
      this.TogglePayDayScreen_PayDay(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(
        false
      );
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(
        false
      );
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(
        false
      );
      GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(
        false,
        false
      );
      GamePlayReferenceManager.Instance.Get_GameManager().callUponCard();
    }
  },
  //#endregion

  //#region Sell Business UI
  ToggleSellBusinessScreen_SellBusinessUISetup(_state) {
    this.SellBusinessScreen.active = _state;
  },

  SetBusinessUI_SellBusinessUISetup() {
    this.Reset_SellBusinessUISetup();
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    var _tempData = _manager.PlayerGameInfo[_playerIndex];

    this.SellBusinessSetupUI.TitleLabel.string = "SELL";
    this.SellBusinessSetupUI.CashLabel.string =_manager.PlayerGameInfo[_playerIndex].Cash;
    this.SellBusinessSetupUI.PlayerNameLabel.string =_manager.PlayerGameInfo[_playerIndex].PlayerName;
    this.SellBusinessSetupUI.BusinessCountLabel.string ="No of Businesses : " +_manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length;

    for (let index = 0; index < _tempData.NoOfBusiness.length; index++) {
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

      if (_tempData.NoOfBusiness[index].LocationsName.length == 0)
        node.getComponent("BusinessDetail").ToggleSellLocationButton(false);
      else node.getComponent("BusinessDetail").ToggleSellLocationButton(true);

      businessDetailNodes.push(node);
    }
  },

  Reset_SellBusinessUISetup() {
    for (let index = 0; index < businessDetailNodes.length; index++) {
      businessDetailNodes[index].destroy();
    }

    businessDetailNodes = [];
  },

  EnableSellScreen__SellBusinessUISetup(_isTurnover = false) {
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

  ExitSellScreen__SellBusinessUISetup() {
    this.Reset_SellBusinessUISetup();
    this.ToggleSellBusinessScreen_SellBusinessUISetup(false);
  },

  ExitSellScreenAlongTurnOver__SellBusinessUISetup() {
    this.Reset_SellBusinessUISetup();
    this.ToggleSellBusinessScreen_SellBusinessUISetup(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },

  //#endregion

  //#region Invest UI
  ToggleInvestScreen_InvestSetupUI(_state) {
    this.InvestScreen.active = _state;
  },

  EnableInvest_InvestSetupUI(_isTurnover = false) {
    this.ResetTurnVariable();
    this.ToggleInvestScreen_InvestSetupUI(true);
    this.SetInvestUI_InvestSetupUI(_isTurnover);
  },
  SetInvestUI_InvestSetupUI(_isTurnover) {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    this.InvestSetupUI.TitleLabel.string = "INVEST";
    this.InvestSetupUI.CashLabel.string =
      _manager.PlayerGameInfo[_playerIndex].Cash;
    this.InvestSetupUI.PlayerNameLabel.string =
      _manager.PlayerGameInfo[_playerIndex].PlayerName;

    if (_isTurnover) {
      this.InvestSetupUI.ExitButton.active = false;
      this.InvestSetupUI.TurnOverExitButton.active = true;
    } else {
      this.InvestSetupUI.ExitButton.active = true;
      this.InvestSetupUI.TurnOverExitButton.active = false;
    }
  },

  ExitInvest_InvestSetupUI() {
    this.ToggleInvestScreen_InvestSetupUI(false);
  },

  ExitInvestAlongTurnOver_InvestSetupUI() {
    this.ToggleInvestScreen_InvestSetupUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion

  //#region BuyORSell UI
  ToggleBuyOrSellScreen_BuyOrSellSetupUI(_state) {
    this.BuyOrSellScreen.active = _state;
  },

  EnableBuyOrSell_BuyOrSellSetupUI(_isTurnover = false) {
    this.ResetTurnVariable();
    this.ToggleBuyOrSellScreen_BuyOrSellSetupUI(true);
    this.SetBuyOrSellUI_BuyOrSellSetupUI(_isTurnover);
  },
  SetBuyOrSellUI_BuyOrSellSetupUI(_isTurnover) {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    this.BuyOrSellSetupUI.TitleLabel.string = "BUY OR SELL";
    this.BuyOrSellSetupUI.CashLabel.string =
      _manager.PlayerGameInfo[_playerIndex].Cash;
    this.BuyOrSellSetupUI.PlayerNameLabel.string =
      _manager.PlayerGameInfo[_playerIndex].PlayerName;

    if (_isTurnover) {
      this.BuyOrSellSetupUI.ExitButton.active = false;
      this.BuyOrSellSetupUI.TurnOverExitButton.active = true;
    } else {
      this.BuyOrSellSetupUI.ExitButton.active = true;
      this.BuyOrSellSetupUI.TurnOverExitButton.active = false;
    }
  },

  ExitSellOrBuy_BuyOrSellSetupUI() {
    this.ToggleBuyOrSellScreen_BuyOrSellSetupUI(false);
  },

  ExitSellOrBuyAlongTurnOver_BuyOrSellSetupUI() {
    this.ToggleBuyOrSellScreen_BuyOrSellSetupUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion

  //#region One Question setup Ui
  ToggleDecisionScreen_OneQuestionSetupUI(_state) {
    this.OneQuestionDecisionScreen.active = _state;
  },

  ToggleSpaceScreen_OneQuestionSetupUI(_state) {
    this.OneQuestionSpaceScreen.active = _state;
  },

  ToggleWaitingScreen_OneQuestionSetupUI(_state) {
    this.OneQuestionSetupUI.WaitingScreen.active = _state;
  },

  SetUpSpaceScreen_OneQuestionSetupUI(
    _myData,
    _actorsData,
    _isTurnOver,
    _modeIndex = 0
  ) {
    this.OneQuestionSetupUI.TitleLabel.string = "ONE QUESTION";
    this.OneQuestionSetupUI.CashLabel.string = "$" + _myData.Cash;
    this.OneQuestionSetupUI.PlayerNameLabel.string = _myData.PlayerName;
    this.OneQuestionSetupUI.PlayerDetailLabel.string =
      "No of Players: " +
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;

    if (_modeIndex == 2) {
      for (let index = 0; index < _actorsData.length; index++) {
        if (
          _actorsData[index].customProperties.RoomEssentials.IsSpectate == false
        ) {
          //check if player is spectate or not, dont add any spectates
          if (
            _myData.PlayerUID !=
            _actorsData[index].customProperties.PlayerSessionData.PlayerUID
          ) {
            var node = cc.instantiate(this.OneQuestionSetupUI.DetailsPrefab);
            node.parent = this.OneQuestionSetupUI.ScrollContent;
            node
              .getComponent("PlayerDetails")
              .setPlayerName(
                _actorsData[index].customProperties.PlayerSessionData.PlayerName
              );
            node
              .getComponent("PlayerDetails")
              .setPlayerUID(
                _actorsData[index].customProperties.PlayerSessionData.PlayerUID
              );
            oneQuestionNodes.push(node);
          }
        }
      }
    } else if (_modeIndex == 1) {
      //for bot
      for (let index = 0; index < _actorsData.length; index++) {
        if (_myData.PlayerUID != _actorsData[index].PlayerUID) {
          var node = cc.instantiate(this.OneQuestionSetupUI.DetailsPrefab);
          node.parent = this.OneQuestionSetupUI.ScrollContent;
          node
            .getComponent("PlayerDetails")
            .setPlayerName(_actorsData[index].PlayerName);
          node
            .getComponent("PlayerDetails")
            .setPlayerUID(_actorsData[index].PlayerUID);
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

  ResetSpaceScreen_OneQuestionSetupUI() {
    for (let index = 0; index < oneQuestionNodes.length; index++) {
      oneQuestionNodes[index].destroy();
    }
    oneQuestionNodes = [];
  },

  Exit_OneQuestionSetupUI() {
    this.ToggleSpaceScreen_OneQuestionSetupUI(false);
  },

  ExitAlongTurnOver_OneQuestionSetupUI() {
    this.ToggleSpaceScreen_OneQuestionSetupUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },

  SetUpDecisionScreen_OneQuestionSetupUI(_question) {
    var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor()
      .customProperties.PlayerSessionData;
    this.OneQuestionSetupUI.DecisionTitleLabel.string = "ONE QUESTION";
    this.OneQuestionSetupUI.DecisionCashLabel.string = "$" + _myData.Cash;
    this.OneQuestionSetupUI.DecisionPlayerNameLabel.string = _myData.PlayerName;
    this.OneQuestionSetupUI.DecisionQuestionLabel.string =
      "Player has asked if " +
      _question +
      "\n" +
      "\n" +
      "*either answer question or pay $5000 to player whose asking question.";
  },
  //#endregion

  ShowToast: function (message, time = 2250) {
    this.PopUpUI.active = true;
    this.PopUpUILabel.string = message;
    var SelfToast = this;
    setTimeout(function () {
      SelfToast.PopUpUI.active = false;
    }, time);
  },
});
