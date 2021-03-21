import DiceController from  "./DiceController";
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
var LaonPartnershipArray=[];
var CompareDiceArray=[];
var TelevisionAdTimeout=null;
var SenderADPPlayer=null;
var VoteTimeout=null;
var VotesUpArray=[];
var VotesDownArray=[];
var SellAllBusinessArray=[];
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
var RemainingCash=0;
var LoanSelectedPlayerData=null;
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
var BankRuptedCard = false;
// var CompletionWindowTime = 500;//8000
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
    AddButtonNode: {
      displayName: "AddButtonNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "Reference for Add Cash button node in business setup",
    },
    AddCashScreen: {
      displayName: "AddCashScreen",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "Reference for AddCashScreen node in business setup",
    },
    AddCashLabel: {
      displayName: "AddCashLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "Reference for AddCash label in business setup",
    },
    AddCashEditBox: {
      displayName: "AddCashEditBox",
      type: cc.EditBox,
      default: null,
      serializable: true,
      tooltip: "Reference for AddCash editBox in business setup",
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
      tooltip: "Reference for content node of scroll view of expand business node",
    },
    ExpandBusinessPrefab: {
      displayName: "ExpandBusinessPrefab",
      type: cc.Prefab,
      default: null,
      serializable: true,
      tooltip: "Reference for prefab of expand business node",
    },
    TimerText: {
      displayName: "TimerText",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "Reference for label of timer text for turn decision",
    },
    BlockerNode: {
      displayName: "BlockerNode",
      type: cc.Node,
      default: null,
      serializable: true,
      tooltip: "Reference for node of blocker for turn decision",
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
      tooltip: "UI reference to the label of BuyOrSell Title of invest&sell node",
    },
    TotalAmountTitleLabel: {
      displayName: "TotalAmountTitle",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of TotalAmount Title of invest&sell node",
    },
    TotalAmountValueLabel: {
      displayName: "TotalAmountValue",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of TotalAmount Value of invest&sell node",
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
    BusinessManipulationPrefab: {
      displayName: "BusinessManipulationPrefab",
      type: cc.Prefab,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab of BusinessManipulationPrefab of Sell node",
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
    PassedPayDayCountLabel: {
      displayName: "PassedPayDayCountLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the label of PassedPayDayCountLabel node",
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
      tooltip: "UI reference to the prefab of TurnOverExitButton of Invest node",
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
      tooltip: "UI reference to the prefab of TurnOverExitButton of BuyOrSell node",
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
      tooltip: "UI reference to the prefab of TurnOverExitButton of OneQuestion node",
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
    WaitingScreenLabel: {
      displayName: "WaitingScreenLabel",
      type: cc.Label,
      default: null,
      serializable: true,
      tooltip: "UI reference to the node WaitingScreenLabel of OneQuestion node",
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
      tooltip: "UI reference to the label of player question of OneQuestion node",
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
//-------------------------------------------class for ResultUI-------------------------//
var ResultUI = cc.Class({
  name: "ResultUI",
  properties: {
    ResultScreen: {
      displayName: "ResultScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },

    StatusLabel: {
      displayName: "StatusLabel",
      type: cc.Label,
      default: null,
      serializable: true,
    },

    BodyLabel: {
      displayName: "BodyLabel",
      type: cc.Label,
      default: null,
      serializable: true,
    },
  },
  ctor: function () {
    //constructor
  },
});
//-------------------------------------------class for BusinessPayDaySetupUI-------------------------//
var BusinessPayDaySetupUI = cc.Class({
  name: "BusinessPayDaySetupUI",
  properties: {
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
    TitleContentLabel: {
      displayName: "TitleContentLabel",
      type: cc.Label,
      default: null,
      serializable: true,
    },
    BusinessPrefab: {
      displayName: "BusinessPrefab",
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
  },
  ctor: function () {
    //constructor
  },
});
//-------------------------------------------class for SelectPlayerForProfitSetupUI-------------------------//
var SelectPlayerForProfitSetupUI = cc.Class({
  name: "SelectPlayerForProfitSetupUI",
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
      tooltip: "UI reference to the prefab of TurnOverExitButton of OneQuestion node",
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
  },
  ctor: function () {
    //constructor
  },
});
//-------------------------------------------class for SelectPlayerGeneric-------------------------//
var SelectPlayerGeneric = cc.Class({
  name: "SelectPlayerGeneric",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      default: null,
      serializable: true,
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      default: null,
      serializable: true,
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      default: null,
      serializable: true,
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      default: null,
      serializable: true,
    },
    PlayerDetailLabel: {
      displayName: "PlayerDetailLabel",
      type: cc.Label,
      default: null,
      serializable: true,
    },
    DetailsPrefab: {
      displayName: "DetailsPrefab",
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
  },
  ctor: function () {
    //constructor
  },
});
//-------------------------------------------class for SelectBusinessGeneric-------------------------//
var SelectBusinessGeneric = cc.Class({
  name: "SelectBusinessGeneric",
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
    BusinessPrefab: {
      displayName: "BusinessPrefab",
      type: cc.Prefab,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab of BusinessPrefab of Sell node",
    },
    BusinessManipulationPrefab: {
      displayName: "BusinessManipulationPrefab",
      type: cc.Prefab,
      default: null,
      serializable: true,
      tooltip: "UI reference to the prefab of BusinessManipulationPrefab of Sell node",
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
//-------------------------------------------class for DamagingInformationDecisionSetup-------------------------//
var DamagingInformationDecisionSetup = cc.Class({
  name: "DamagingInformationDecisionSetup",
  properties: {
    MainScreen: {
      displayName: "MainScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },
    DiceResultScreen: {
      displayName: "DiceResultScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },
    BusinessSelectScreen: {
      displayName: "BusinessSelectScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },

    DamageBusinessSelect: {
      default: {},
      type: SelectBusinessGeneric,
      serializable: true,
    },

    DiceResultLabel: {
      default: null,
      type: cc.Label,
      serializable: true,
    },
  },
  ctor: function () {
    //constructor
  },
});
//-------------------------------------------class for BuyHalfBusinessSetupUI-------------------------//
var BuyHalfBusinessSetupUI = cc.Class({
  name: "BuyHalfBusinessSetupUI",
  properties: {
    MainScreen: {
      displayName: "MainScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },
    TitleLabel: {
      displayName: "TitleLabel",
      type: cc.Label,
      default: null,
      serializable: true,
    },
  },
  ctor: function () {
    //constructor
  },
});
//-------------------------------------------class for CompitatorUISetup-------------------------//
var CompitatorUISetup = cc.Class({
  name: "CompitatorUISetup",
  properties: {
    MainScreen: {
      displayName: "MainScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },
    TitleLabel: {
      displayName: "TitleLabel",
      type: cc.Label,
      default: null,
      serializable: true,
    },

    CompEditBox1: {
      displayName: "CompEditBox1",
      type: cc.EditBox,
      default: null,
      serializable: true,
    },

    CompEditBox2: {
      displayName: "CompEditBox2",
      type: cc.EditBox,
      default: null,
      serializable: true,
    },

    CompEditBox3: {
      displayName: "CompEditBox3",
      type: cc.EditBox,
      default: null,
      serializable: true,
    },
  },
  ctor: function () {
    //constructor
  },
});
//-------------------------------------------class for TelevisionADUISetup-------------------------//
var TelevisionADUISetup = cc.Class({
  name: "TelevisionADUISetup",
  properties: {
    MainScreen: {
      displayName: "MainScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },
    TitleLabel: {
      displayName: "TitleLabel",
      type: cc.Label,
      default: null,
      serializable: true,
    },

    MainEditBox: {
      displayName: "MainEditBox",
      type: cc.EditBox,
      default: null,
      serializable: true,
    },

    DecisionScreen: {
      displayName: "DecisionScreen",
      type: cc.Node,
      default: null,
      serializable: true,
    },

    DecisionScreenText: {
      displayName: "DecisionScreenText",
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
    ResultSetupUI: {
      default: {},
      type: ResultUI,
      serializable: true,
      tooltip: "reference of ResultUI class",
    },
    BusinessPayDayUISetup: {
      default: {},
      type: BusinessPayDaySetupUI,
      serializable: true,
      tooltip: "reference of BusinessPayDaySetupUI class",
    },
    SelectPlayerForProfitUI: {
      default: {},
      type: SelectPlayerForProfitSetupUI,
      serializable: true,
      tooltip: "reference of SelectPlayerForProfitSetupUI class",
    },

    SelectPlayerTakeOverSetup: {
      default: {},
      type: SelectPlayerGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class",
    },

    SelectPlayerDamagingSetup: {
      default: {},
      type: SelectPlayerGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class",
    },

    DecisionDamagingSetup: {
      default: {},
      type: DamagingInformationDecisionSetup,
      serializable: true,
      tooltip: "reference of DamagingInformationDecisionSetup class",
    },

    SelectBusinessTakeOver: {
      default: {},
      type: SelectBusinessGeneric,
      serializable: true,
      tooltip: "reference of SelectBusinessGeneric class",
    },
    BuyHalfBusinessUISetup: {
      default: {},
      type: BuyHalfBusinessSetupUI,
      serializable: true,
      tooltip: "reference of BuyHalfBusinessSetupUI class",
    },
    LoanPartnershipSetup: {
      default: {},
      type: SelectPlayerGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class",
    },

    CompareDiceSetup: {
      default: {},
      type: SelectPlayerGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class",
    },

    SellAllBusinessSetup: {
      default: {},
      type: SelectBusinessGeneric,
      serializable: true,
      tooltip: "reference of SelectPlayerGeneric class",
    },

    CompitatorSetupUI: {
      default: {},
      type: CompitatorUISetup,
      serializable: true,
      tooltip: "reference of CompitatorUISetup class",
    },

    TelevisionADSetupUI: {
      default: {},
      type: TelevisionADUISetup,
      serializable: true,
      tooltip: "reference of TelevisionADUISetup class",
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
    PopUpUIButton: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for pop up screen",
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
    BusinessDoublePayScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for BusinessDoublePay screen",
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
    SelectPlayerForProfitScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SelectPlayerForProfit screen",
    },
    SelectPlayerTakeOverScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SelectPlayerTakeOver screen",
    },
    SelectPlayerDamagingScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SelectPlayerDamaging screen",
    },

    LoanPartnershipScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for LoanPartnership screen",
    },

    CompareDiceScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for CompareDice screen",
    },

    CompareDiceDecision1Screen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for CompareDice screen",
    },

    CompareDiceDecision2Screen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for CompareDice screen",
    },

    CompareDiceDecision2Text: {
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "Node reference for CompareDice label",
    },

    CompareDiceDecision2Button: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for CompareDice button",
    },

    SellAllBusinessScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SellAllBusiness screen",
    },
    SelectBusinessTakeOverScreen: {
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SelectBusinessTakeOver screen",
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

    ExitRoomButton: {
      default: null,
      type: cc.Node,
      serializable: true,
    },
    AvatarSprites: {
      default: [],
      type: cc.SpriteFrame,
      serializable: true,
    },
  },

  statics: {
    Instance: null,
  },

  /**
    @summary Resets this class global variables and other necessary data onLoad
   **/
  ResetAllData() {
    DoubleDayBusinessHB = 0;
    DoubleDayBusinessBM = 0;
    TelevisionAdTimeout=null;
    SenderADPPlayer=null;
    VoteTimeout=null;
    VotesUpArray=[];
    VotesDownArray=[];
    NextHalfPayDay = false;
    LaonPartnership=false;
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
    LaonPartnershipArray=[];
    CompareDiceArray=[];
    SellAllBusinessArray=[];
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
    RemainingCash=0;
    LoanSelectedPlayerData=null;
    TimeoutRef = null;
    GiveProfitUserID = "";
    BankRuptedCard = false;
    InsideGameBusinessSetup = -1; //-1 means new business is not instantialted from inside game , if it has any other value it means its been instantiated from inside game and its value represents index of player

    //turn decisions
    TempMarketingAmount = "";
    TempHiringLawyer;

    //buyorsell
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
  ResetTurnVariable() {
    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
  },

  /**
    @summary check references of class/es needed.
   **/
  CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");

    if (!GameManager || GameManager == null) GameManager = require("GameManager");
  },

  /**
    @summary called when this node gets active
   **/
  onEnable: function () {
    GameplayUIManager.Instance=this;
    //events subscription to be called
    cc.systemEvent.on("SyncData", this.SyncData, this);
  },

  /**
    @summary called when this node gets deactive
   **/
  onDisable: function () {
    cc.systemEvent.off("SyncData", this.SyncData, this);
  },

  /**
    @summary called when instance of the class is loaded
   **/
  onLoad() {
    this.ResetAllData();
    this.CheckReferences();

    //declaring local variables
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

  ToggleScreen_InsufficientBalance(_state) {
    this.InsufficientBalanceScreen.active = _state;
  },

  Exit___InsufficientBalance() {
    this.ToggleScreen_InsufficientBalance(false);
  },

  //#region Spectate UI Setup
  InitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = true;
  },

  CloseInitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = false;
    // console.trace("closedddddddddddddddddddddddddddddddddddd");
  },

  ToggleLeaveRoomButton_SpectateModeUI(_state) {
    this.LeaveRoomButton.active = _state;

    if(_state)
      this.ToggleExitButton(false);
  },

  ToggleExitButton(_state)
  {
    this.ExitRoomButton.active=_state;
  },

  OnLeaveButtonClicked_SpectateModeUI() {
    GameplayUIManager.Instance.setTimeScale(0);
    if(DiceController.Instance)
    {
      DiceController.Instance.ClearAllTimeouts();
    }
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(true);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    setTimeout(() => {
      GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
      GamePlayReferenceManager.Instance.RemovePersistNode();
      clearTimeout();
      cc.director.loadScene("MainMenu",function(){
        GameplayUIManager.Instance.setTimeScale(1);
      });
    }, 1);
  },

  setTimeScale(scale) {
    cc.director.calculateDeltaTime = function(now) {
      if (!now) now = performance.now();
      this._deltaTime = (now - this._lastUpdate) / 1000;
      this._deltaTime *= scale;
      this._lastUpdate = now;
    };
  },

  OnExitButtonClicked()
  {
    GameplayUIManager.Instance.setTimeScale(0);
    if(DiceController.Instance)
    {
      DiceController.Instance.ClearAllTimeouts();
    }
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(true);

    if(GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode()==2)
    {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    }
    setTimeout(() => {
      GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
      GamePlayReferenceManager.Instance.RemovePersistNode();
      clearTimeout();
      cc.director.loadScene("MainMenu",function(){
        GameplayUIManager.Instance.setTimeScale(1);
      });
    }, 1);
  },
  //#endregion

  //#region BusinessSetup with loan
  //Business setup ui//------------------------
  ToggleCashAddScreen_BusinessSetup: function (_state) {
    this.BusinessSetupData.AddCashScreen.active = _state;
  },

  EnableCashAdd_BusinessSetup: function () {
    this.BusinessSetupData.AddCashEditBox.string = "";
    this.AddCashAmount = "";
    this.ToggleCashAddScreen_BusinessSetup(true);
    this.BusinessSetupData.AddCashLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash;
  },

  OnCashAdd_BusinessSetup: function (_val) {
    this.AddCashAmount = _val;
  },

  OnClickDoneCashAdd_BusinessSetup: function () {
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

  StartNewBusiness_BusinessSetup: function (isFirstTime, insideGame = false, modeIndex = 0, _isBankrupted = false, _BankruptAmount = 0, _isCardFunctionality = false, _GivenCash = 0, _StartAnyBusinessWithoutCash = false,_loanPartnership=false,_OtherplayerData=null) {
    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;

    BusinessSetupCardFunctionality = _isCardFunctionality;
    GivenCashBusiness = _GivenCash;
    StartAnyBusinessWithoutCash = _StartAnyBusinessWithoutCash;
    LaonPartnership=_loanPartnership;
    LoanSelectedPlayerData=_OtherplayerData;

    this.IsBankrupted = _isBankrupted;
    this.BankruptedAmount = _BankruptAmount;

    if (_isBankrupted) this.ResetTurnVariable();

    this.Init_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted,_loanPartnership);
  },
  Init_BusinessSetup: function (isFirstTime, insideGame = false, modeIndex = 0, _isBankrupted = false,_loanPartnership=false) {
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

      for (let index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length; index++) {
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
  OnChangAvatarID_BusinessSetup: function (UID) {
    if (isNaN(UID) || UID == undefined) UID = 0;

    PlayerDataIntance.AvatarID = UID;
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
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.None;
  },
  OnHomeBasedSelected_BusinessSetup: function () {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[1].active = true;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[1].active = false;

    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.HomeBased;
  },
  OnBrickMortarSelected_BusinessSetup: function () {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[1].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[1].active = true;

    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.brickAndmortar;
  },
  OnChangeCash_BusinessSetup: function (amount) {
    this.BusinessSetupData.PlayerCashUI.string = amount;
    PlayerDataIntance.Cash = amount;
  },
  CalculateLoan_BusinessSetup: function (amount) {
    var _loanTaken = false;
    var _businessIndex = 0;

    if (!BusinessSetupCardFunctionality) {
      for (let index = 0; index < PlayerDataIntance.NoOfBusiness.length; index++) {
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
  OnLoanButtonClicked_BusinessSetup: function (event) {
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
  OnLoanBackButtonClicked_BusinessSetup: function (event) {
    this.BusinessSetupData.LoanSetupNode.active = false;
  },
  HighLightLoanSelection_BusinessSetup: function (index) {
    for (var i = 0; i < this.BusinessSetupData.LoanAmountLabel.length; i++) {
      if (index == i) this.BusinessSetupData.LoanAmountLabel[i].children[0].active = true;
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
    if (this.BusinessSetupData.LoanAmount == LoanAmountEnum.Other) PlayerBusinessDataIntance.LoanAmount = RequiredCash;
    else PlayerBusinessDataIntance.LoanAmount = parseInt(this.BusinessSetupData.LoanAmount);

    PlayerBusinessDataIntance.LoanTaken = true;

    PlayerDataIntance.LoanTaken=true;
    PlayerDataIntance.LoanAmount=PlayerBusinessDataIntance.LoanAmount;

    this.OnLoanBackButtonClicked_BusinessSetup();
    PlayerDataIntance.Cash = PlayerDataIntance.Cash + PlayerBusinessDataIntance.LoanAmount;
    this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
  },

  PushDataForPlayerLeft(_data) {
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
  SyncData: function (_data, _ID, _playerLeft = false) {
    var _isSpectate = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().getCustomProperty("RoomEssentials")["IsSpectate"];

    if (_isSpectate) {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetRealActors();
    }

    if (!_playerLeft) {
      if (_ID != GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().actorNr) GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(_data);
    }

    // console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo);

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

  PurchaseBusiness: function (_amount, _businessName, _isHomeBased) {
    if (PlayerDataIntance.Cash < _amount && !StartAnyBusinessWithoutCash) {
      this.ShowToast("You have not enough cash to buy this " + _businessName + " business.", LongMessageTime);
    } else {
      if (_isHomeBased) {
        if (PlayerDataIntance.HomeBasedAmount < 3) {
          if (!StartAnyBusinessWithoutCash) {
            PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
            RemainingCash=PlayerDataIntance.Cash;
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
          RemainingCash=PlayerDataIntance.Cash;
          this.BusinessSetupData.PlayerCashUI.string = "$" + PlayerDataIntance.Cash;
        }
        this.StartGame = true;
        PlayerDataIntance.BrickAndMortarAmount++;
      }
    }
  },

  Exit_BusinessSetup: function () {
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
      RemainingCash=0;
      LoanSelectedPlayerData=null;
      LaonPartnership=false;
      GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
    }
  },

  InitialSetup_BusinessSetup: function () {
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

        var _data = { Data: { bankrupted: true, turn: GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber(), PlayerDataMain: PlayerDataIntance } };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(9, _data);
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
      console.log("no mode selected");
    }
  },

  StartNewSetup_DuringGame_BusinessSetup: function () {
    if (!BusinessSetupCardFunctionality) {
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[InsideGameBusinessSetup] = PlayerDataIntance;
      this.BusinessSetupNode.active = false;
      InsideGameBusinessSetup = -1;
      this.ToggleDecision_TurnDecision(true);
    } else {

      if(LaonPartnership)
      {
        PlayerDataIntance.Cash=PreviousCash+RemainingCash;
      }
      else
      {
        PlayerDataIntance.Cash = PreviousCash;
      }

      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[InsideGameBusinessSetup] = PlayerDataIntance;
      this.BusinessSetupNode.active = false;
      InsideGameBusinessSetup = -1;
      BusinessSetupCardFunctionality = false;
      GivenCashBusiness = 0;
      StartAnyBusinessWithoutCash = false;
      LaonPartnership=false;
      RemainingCash=0;
      LoanSelectedPlayerData=null;
      GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
    }
  },

  PayAmountToPlayGame: function () {
    this.StartGame = false;

    if (PlayerBusinessDataIntance.BusinessTypeDescription == "") this.ShowToast("please write a business type.");
    else if (PlayerBusinessDataIntance.BusinessName == "") this.ShowToast("please write a business name.");
    else {
      if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.None || PlayerBusinessDataIntance.BusinessType == undefined) {
        this.ShowToast("please select a business");
        return;
      }

      if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.HomeBased)
        //if selected business is homebassed
        this.PurchaseBusiness(10000, "home", true);
      else if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.brickAndmortar)
        //if selected business is brick and mortar
        this.PurchaseBusiness(50000, "brick and mortar", false);

      if (this.StartGame == true || this.IsBankrupted == true) {

        if(LaonPartnership)
        {
          PlayerBusinessDataIntance.LoanTaken=true;
          PlayerBusinessDataIntance.LoanAmount=50000;

          PlayerDataIntance.LoanAmount=50000;
          PlayerDataIntance.LoanTaken=true;

          PlayerBusinessDataIntance.IsPartnership = true;
          PlayerBusinessDataIntance.PartnerID = LoanSelectedPlayerData.PlayerUID;
          PlayerBusinessDataIntance.PartnerName = LoanSelectedPlayerData.PlayerName;

          var info="You have been selected by player "+PlayerDataIntance.PlayerName+" to go into partnership in their business named "+PlayerBusinessDataIntance.BusinessName;
          this.RaiseEventToSyncInfo(info,LoanSelectedPlayerData.PlayerUID)
        }

        PlayerDataIntance.NoOfBusiness.push(PlayerBusinessDataIntance);

        if (InsideGameBusinessSetup != -1) {
          //if start new business has not been called from inside game
          this.StartNewSetup_DuringGame_BusinessSetup();
        }
        //if start new business has been called at start of game as initial setup
        else {
          this.InitialSetup_BusinessSetup();
        }

        //prtinting all values to console
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
  ToggleDecision_TurnDecision: function (isactive) {
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

  UpdateTimer() {
    if (this.Timer > 0) {
      this.Timer = this.Timer - 1;
      this.TurnDecisionSetupUI.TimerText.string = this.Timer + " seconds are left to choose above options except 'Roll The Dice'";
      TimerTimeout = setTimeout(() => {
        this.UpdateTimer();
      }, 1000);
    } else {
      clearTimeout(TimerTimeout);
      this.Timer = 0;
      this.TimerStarted = false;
      this.TurnDecisionSetupUI.TimerText.string = "Timer is over, you can select only 'Roll The Dice' now.";
      this.TurnDecisionSetupUI.BlockerNode.active = true;
    }
  },

  UpdateCash_TurnDecision: function () {
    this.TurnDecisionSetupUI.CashAmountLabel.string = "$ " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber()].Cash;
  },

  OnMarketingAmountChanged_TurnDecision: function (amount) {
    //console.log(amount);
    TempMarketingAmount = amount;
  },

  CheckMarketingAmountShare_CardFunctionality(_amount = 0) {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    for (let index = 0; index < _manager.PlayerGameInfo.length; index++) {
      if (_manager.PlayerGameInfo[index].CardFunctionality.HasMarketingCompany) {
        this.RaiseEventForMarketingShare(_amount, _manager.PlayerGameInfo[index].PlayerUID, "You have received market share of $" + _amount + " from your marketing company");
      }
    }
  },

  RaiseEventForMarketingShare(_amnt, _id, _msg) {
    var _data = { amount: _amnt, ID: _id, msg: _msg };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(22, _data);
  },

  OnMarketingAmountSelected_TurnDecision: function () {
    if (TempMarketingAmount == "" || TempMarketingAmount == null) {
      this.ShowToast("Please enter an amount.");
    } else {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      this.marketingAmount = parseInt(TempMarketingAmount);
      console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);

      //if player entered amount is greater than total cash he owns
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= this.marketingAmount) {
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - this.marketingAmount;
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount + this.marketingAmount;
        this.ShowToast(
          "you successfully marketed amount of $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount + " , remaining cash is $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + ".",
          LongMessageTime
        );
        this.UpdateCash_TurnDecision();
        this.CheckMarketingAmountShare_CardFunctionality(this.marketingAmount);

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

  onLocationNameChanged_ExpandBusiness_TurnDecision(_name) {
    LocationName = _name;
  },
  OnExpandButtonClicked_TurnDecision: function (event = null, _isCardFunctionality = false, _GivenCash = 0, _StartAnyBusinessWithoutCash = false) {
    //if player has brick and mortar business he could expand it
    console.log("expand business");

    BusinessSetupCardFunctionality = _isCardFunctionality;
    GivenCashBusiness = _GivenCash;
    StartAnyBusinessWithoutCash = _StartAnyBusinessWithoutCash;

    this.TurnDecisionSetupUI.ExpandBusinessNode.active = true;
    var generatedLength = GamePlayReferenceManager.Instance.Get_GameManager().GenerateExpandBusiness_Prefabs_TurnDecision(BusinessSetupCardFunctionality, GivenCashBusiness, StartAnyBusinessWithoutCash);

    if (generatedLength == 0) {
      this.ShowToast("You have no brick and mortar business to expand.");
      setTimeout(() => {
        this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;

        if (BusinessSetupCardFunctionality) {
          this.CheckReferences();
          LocationName = "";
          console.log("expand business exit called");
          GamePlayReferenceManager.Instance.Get_GameManager().DestroyGeneratedNodes();
          this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
          BusinessSetupCardFunctionality = false;
          GivenCashBusiness = 0;
          StartAnyBusinessWithoutCash = false;
          RemainingCash=0;
          LoanSelectedPlayerData=null;
          LaonPartnership=false;
          GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
        }
      }, 1600);
    }
  },

  OnExpandButtonExitClicked_TurnDecision: function () {
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
      RemainingCash=0;
      LoanSelectedPlayerData=null;
      LaonPartnership=false;
      GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
    }
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

      this.AssignData_InvestSell("Invest In GOLD", DiceResult, "Each Ounce of GOLD price is:", OnceOrShare + "/ounce", "Enter the number of ounce of GOLD you want to BUY", "Total Buying Amount:", OnceOrShare + "*0=0", "BUY", this.InvestSellSetupUI.InvestState);
    } else {
      this.ShowToast("You can invest in gold one time during turn.");
    }
  },

  OnStockBusinessNameChanged_TurnDecision: function (name) {
    StockBusinessName = name;
  },

  OnStockDiceClicked_TurnDecision: function (event = null, _isTurnOver = false) {
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

        if (!TurnOverForInvest) DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        else DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollOneDice();

        OnceOrShare = DiceResult * 1000;

        this.AssignData_InvestSell("Invest in Stock", DiceResult, "Each Share of stock price is:", OnceOrShare + "/share", "Enter the number of shares of stock you want to BUY", "Total Buying Amount:", OnceOrShare + "*0=0", "BUY", this.InvestSellSetupUI.InvestState);
      }
    } else {
      this.ShowToast("You can invest in stocks one time during turn.");
    }
  },

  OnSellGoldClicked_TurnDecision: function () {
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

  OnSellStockClicked_TurnDecision: function () {
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
    this.PartnershipSetupUI.PlayerName.string = _tempData.PlayerName;
    this.PartnershipSetupUI.PlayerCash.string = "$" + _tempData.Cash;

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
      } else {
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
    this.PartnershipSetupUI.DecisionPlayerName.string = _tempData.PlayerName;
    this.PartnershipSetupUI.DecisionPlayerCash.string = "$" + _tempData.Cash;
    this.PartnershipSetupUI.DecisionDescription.string = _msg;
  },

  Exit_PartnerShipSetup() {
    this.Reset_PartnerShipSetup();
    this.ToggleScreen_PartnerShipSetup(false);
  },

  Reset_PartnerShipSetup() {
    for (let index = 0; index < businessDetailPartnershipNodes.length; index++) {
      businessDetailPartnershipNodes[index].destroy();
    }
    businessDetailPartnershipNodes = [];
  },

  ReceiveEvent_PartnershipSetup(_data) {
    PartnerShipOfferReceived = true;
    PartnerShipData = _data;
    var _actor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
    var _turn = _data.Data.Turn;
    var _playerData = _data.Data.PlayerData;
    var _SelectedBusinessIndex = _data.Data.SelectedBusinsessIndex;
    var _businessValue = _data.Data.BusValue;
    var _payAmount = _businessValue / 2;
    var _businessMode = "";

    if (_playerData.NoOfBusiness[_SelectedBusinessIndex].BusinessType == 1) _businessMode = "Home Based";
    else if (_playerData.NoOfBusiness[_SelectedBusinessIndex].BusinessType == 2) _businessMode = "Brick & Mortar";

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
      var _msg =
        "you have received partnership offer by " +
        _playerData.PlayerName +
        " , following are the details of business: " +
        "\n" +
        "\n" +
        "Business Name: " +
        _playerData.NoOfBusiness[_SelectedBusinessIndex].BusinessName +
        "\n" +
        "Business Mode: " +
        _businessMode +
        "\n" +
        "Business Value: $" +
        _businessValue +
        "\n" +
        "Cash Payment: $" +
        _payAmount +
        "\n" +
        "\n" +
        "if offer is accepted you will receive 50% share of that particular business and will receive profit/lose on that particular business.";

      this.EnablePartnershipDecision_PartnerShipSetup(_msg);
    }
  },

  AcceptOffer_PartnershipSetup() {
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

  CancelOffer_PartnershipSetup() {
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

  RaiseEventDecisionAnswer_PartnershipSetup(_isAccepted = false, _payment = 0, _isCancelled = false, _uID = "", _data = null, _businessIndex = 0) {
    var _mainData = { Data: { Accepted: _isAccepted, CashPayment: _payment, Cancelled: _isCancelled, PlayerID: _uID, PlayerData: _data, BusinessIndex: _businessIndex } };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(12, _mainData);
  },

  ReceiveEventDecisionAnswer_PartnershipSetup(_data) {
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
      this.UpdateData_InvestSell(OnceOrShare + "*" + EnterBuySellAmount + "=" + _amount);
    }
  },

  ToggleInvestSellScreen_InvestSell(_state) {
    this.InvestSellScreen.active = _state;
    this.UpdateCash_TurnDecision();
    this.ResetGoldInput();
    this.ResetStockBusinessNameInput();
  },

  AssignData_InvestSell(_title, _diceResult, _priceTitle, _priceValue, _buyOrSellTitle, _totalAmountTitle, _totalAmountValue, _buttonName, _state) {
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

          setTimeout(() => {
            this.ExitButton_InvestSell();
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

          setTimeout(() => {
            this.ExitButton_InvestSell();
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
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount += _amount;
          //can add multiple stocks with business name in object if required

          this.ShowToast("You have successfully bought " + _amount + " shares of business " + StockBusinessName, LongMessageTime);

          InvestSellInfo = "Buying STOCK:" + "\n" + "\n" + "Dice Rolled: " + OnceOrShare / 1000 + "\n" + "Per share price: $" + OnceOrShare + "\n" + "Purchased shares: " + _amount + "\n" + "Total Payment for shares: $" + _TotalAmount;

          this.RaiseEventToSyncInfo(InvestSellInfo);

          setTimeout(() => {
            this.ExitButton_InvestSell();
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

          setTimeout(() => {
            this.ExitButton_InvestSell();
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

  ExitButton_InvestSell() {
    this.ToggleInvestSellScreen_InvestSell(false);

    if (TurnOverForInvest) {
      GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
      TurnOverForInvest = false;
    }
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

  GetLoanAmount_PayDay() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _loan = 0;
    for (let index = 0; index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loan = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount;
        break;
      }
    }
    return _loan;
  },

  AssignData_PayDay(_title, _isDoublePayDay = false, _skipHM = false, _skipBM = false, _isBot = false, _forSelectedBusiness = false, _SelectedBusinessIndex = 0, _hMAmount = 0, _bmAmount = 0, _bmLocation = 0, PaydayCounter = 1, DoublePayCounter = 0, _halfPayday = false) {
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
    NextHalfPayDay = _halfPayday;
    //   if (DoublePayCounter == 0) DoublePayCounter = 1;

    //  if (DoublePayDay) DoublePayCounter = DoublePayCounter * 2;

    DoubleDayBusinessHB = 0;
    DoubleDayBusinessBM = 0;
    for (let index = 0; index < _tempData.NoOfBusiness.length; index++) {
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
        }

        //check skip payday variables
        if (_skipHM && _skipBM) this.ShowToast("your payday on home based and brick & mortar businessess will be skipped.", _time);
        else if (_skipHM) this.ShowToast("your payday on home based businessess will be skipped.", _time);
        else if (_skipBM) this.ShowToast("your payday on brick & mortar businessess will be skipped.", _time);
      } else {
        //check skip payday variables
        if (_skipHM && _skipBM) console.log("your payday on home based and brick & mortar businessess will be skipped.");
        else if (_skipHM) console.log("your payday on home based businessess will be skipped.");
        else if (_skipBM) console.log("your payday on brick & mortar businessess will be skipped.");
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

    for (let index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
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
      setTimeout(() => {
        this.OnHomeBasedPaymentClicked_PayDay();
        this.OnBMPaymentClicked_PayDay();
        this.OnLoanPaymentClicked_PayDay();
      }, 0);
    }
  },

  OnHomeBasedPaymentClicked_PayDay() {
    if (!HomeBasedPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);

      var _doublePayDay = DoublePayDay;
      var _halfPayday = NextHalfPayDay;

      if (!SelectedBusinessPayDay) {
        if (!_doublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";
        else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
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

      if (_halfPayday) _multiplier = _multiplier / 2;

      //partnership code
      if (_doublePayDay) {
        if (this.DoublePayDayCount != 0) {
          _multiplier *= 2 * this.DoublePayDayCount;
        } else {
          _multiplier *= 2;
        }
      }

      var doublePayDayAdded = _multiplier * _paydaymultiplier * DoubleDayBusinessHB * _dice * 1000;

      if (!SelectedBusinessPayDay) {
        for (let index = 0; index < _tempData.length; index++) {
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
      }
      //partnership code

      if (!_doublePayDay) TotalPayDayAmount = _multiplier * _paydaymultiplier * HMAmount * _dice * 1000 - _amountToBeAdjusted + doublePayDayAdded;
      else TotalPayDayAmount = _paydaymultiplier * _multiplier * (HMAmount * _dice) * 1000 - _amountToBeAdjusted + doublePayDayAdded;

      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;

      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + HMAmount + "*" + "1000)-" + _amountToBeAdjusted + "+" + doublePayDayAdded + "=" + TotalPayDayAmount;
      else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + HMAmount + "*" + "1000*" + _multiplier + ")-" + _amountToBeAdjusted + "+" + doublePayDayAdded + "=" + TotalPayDayAmount;

      PayDayInfo += "\n" + "\n" + "Home Based Business: " + HMAmount + "\n" + "Dice Rolled: " + _dice + "\n" + "Amount Received: $" + TotalPayDayAmount;
      TotalPayDay += TotalPayDayAmount;

      if (this.IsBotTurn) {
        this.ReceivePayment_PayDay();
      }
    }
  },

  OnBMPaymentClicked_PayDay() {
    //brick and mortar
    if (!BrickMortarPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);

      var _doublePayDay = DoublePayDay;
      var _paydaymultiplier = this.PayDayCount;
      var _halfPayday = NextHalfPayDay;

      if (!SelectedBusinessPayDay) {
        if (!_doublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";
        else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
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
        for (let index = 0; index < _tempData.length; index++) {
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

      if (!_doublePayDay) TotalPayDayAmount = _multiplier * _paydaymultiplier * _amount * _dice * 2000 - _amountToBeAdjusted + doublePayDayAdded;
      else TotalPayDayAmount = _paydaymultiplier * _multiplier * (_amount * _dice) * 2000 - _amountToBeAdjusted + doublePayDayAdded;

      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;

      if (!_doublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + _amount + "*" + "2000)-" + _amountToBeAdjusted + "+" + doublePayDayAdded + "=" + TotalPayDayAmount;
      else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _paydaymultiplier + "*" + _dice + "*" + _amount + "*" + "2000*" + _multiplier + ")-" + _amountToBeAdjusted + "+" + doublePayDayAdded + "=" + TotalPayDayAmount;

      PayDayInfo += "\n" + "\n" + "Brick & Mortar Business: " + _amount + "\n" + "Dice Rolled: " + _dice + "\n" + "Amount Received: $" + TotalPayDayAmount;
      TotalPayDay += TotalPayDayAmount;
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

      if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment)
        //if player had skippped loan previously call all amount due
        _EstimateLoan = this.GetLoanAmount_PayDay();
      else _EstimateLoan = 5000;

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= _EstimateLoan) {
        LoanPayed = true;
        this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _EstimateLoan;

        var _loanTaken = false;
        var _businessIndex = 0;

        for (let index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
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

        if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = false;
        else this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = true;

        this.PayDaySetupUI.LoanResultPanelNode.active = true;
        console.log("out of money");
      }
    }
  },

  ReceivePayment_PayDay() {
    //all
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + TotalPayDayAmount;
    this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
    if (!this.IsBotTurn) {
      this.ShowToast("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
      setTimeout(() => {
        this.ToggleResultPanelScreen_PayDay(false);
        this.PayDayCompleted();
      }, 100);
    } else {
      console.log("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
      this.ToggleResultPanelScreen_PayDay(false);
      this.PayDayCompleted();
    }
  },

  SkipLoanOneTime_PayDay() {
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

  ProcessBankrupt(_showText = true, _txt, _time) {
    if (_showText) {
      this.ShowToast(_txt, _time, false);
    }
    setTimeout(() => {
      this.Exit_SelectPlayerGeneric();
      this.ExitScreen__BusinessGenric();
      this.ToggleDecsion02Screen_CompareDice(false);
      this.ToggleDecsion01Screen_CompareDice(false);
      this.ToggleDiceResultScreen_DamageDecision(false);
      this.ToggleMainScreen_DamageDecision(false);
      this.ExitLoanScreen_PayDay();
      this.TogglePayDayScreen_PayDay(false);
      this.Exit___InsufficientBalance();
      this.ToggleScreen_BuyHalfBusiness(false);
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
  StartNewGame_PayDay() {
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
        var _sendingData = { ID: SenderDamagingID, Cash: DamageDecisionResult, IsDiceRolled: true, IsBankRupted: true };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(25, _sendingData);

        var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
        var playerData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

        for (let index = 0; index < playerData.length; index++) {
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

  StartNewGame_BankRupted(_txt) {
    //if bankrupted you can start new game
    var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();
    this.ProcessBankrupt(true, _txt, 3000);
  },

  ShowInfo(_data) {

    console.log("reecieved id: "+_data.PlayerUID);
    if(_data.PlayerUID=="")
    {
      this.ShowToast(_data.info, 2000, true);
    }
    else
    {
      var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();
      if(mode==2) //real players
      {
          var _myUID=GamePlayReferenceManager.Instance.Get_GameManager().GetMyPlayerUID();
          if(_myUID==_data.PlayerUID)
          {
            this.ShowToast(_data.info, 3000, true);
          }else
          {
            console.log("nothing");
          }
      }
    }
  },

  PayDayCompleted() {
    if (HomeBasedPaymentCompleted && BrickMortarPaymentCompleted && LoanPayed) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      console.log("all payday done");
      this.TogglePayDayScreen_PayDay(false);

      if (GiveProfitUserID != "") {
        this.ShowToast("Your whole Payday amount $" + TotalPayDay + " will be transferred to other player now.", 2200);
        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash -= TotalPayDay;
        GamePlayReferenceManager.Instance.Get_GameManager().SendProfit_Partner_TurnDecision(TotalPayDay, GiveProfitUserID);

        setTimeout(() => {
          this.RaiseEventForCompletion();
        }, 3200);
      } else {
        this.RaiseEventForCompletion();
      }
    }
  },

  RaiseEventForCompletion() {
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
  ToggleSellBusinessScreen_SellBusinessUISetup(_state) {
    this.SellBusinessScreen.active = _state;
  },

  SetBusinessUI_SellBusinessUISetup(_sellAmount = 0) {
    this.Reset_SellBusinessUISetup();
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    var _tempData = _manager.PlayerGameInfo[_playerIndex];

    this.SellBusinessSetupUI.TitleLabel.string = "SELL";
    this.SellBusinessSetupUI.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.SellBusinessSetupUI.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;
    this.SellBusinessSetupUI.BusinessCountLabel.string = "No of Businesses : " + _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length;

    for (let index = 0; index < _tempData.NoOfBusiness.length; index++) {
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

      if (_tempData.NoOfBusiness[index].LocationsName.length == 0) node.getComponent("BusinessDetail").ToggleSellLocationButton(false);
      else node.getComponent("BusinessDetail").ToggleSellLocationButton(true);

      businessDetailNodes.push(node);
    }
  },

  SetBusinessUI_BusinessManipulationUISetup(_isBot = false) {
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

    for (let index = 0; index < _tempData.NoOfBusiness.length; index++) {
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
      }
      // if (_tempData.NoOfBusiness[index].LocationsName.length == 0)
      //   node.getComponent("BusinessDetail").ToggleSellLocationButton(false);
      // else
      //   node.getComponent("BusinessDetail").ToggleSellLocationButton(true);

      businessDetailNodes.push(node);
    }
  },
  Reset_SellBusinessUISetup() {
    for (let index = 0; index < businessDetailNodes.length; index++) {
      businessDetailNodes[index].destroy();
    }

    businessDetailNodes = [];
  },

  EnableSellScreen__SellBusinessUISetup(_isTurnover = false, _sellAmount = 0) {
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

  EnableManipilationScreen__BusinessManipulationUISetup(_isTurnover = false, _isBot = false) {
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

  ShowQuestionToast(_msg) {
    this.OneQuestionSetupUI.WaitingScreenLabel.string = _msg;
  },

  SetUpSpaceScreen_OneQuestionSetupUI(_myData, _actorsData, _isTurnOver, _modeIndex = 0) {
    this.ToggleWaitingScreen_OneQuestionSetupUI(false);
    this.OneQuestionSetupUI.TitleLabel.string = "ONE QUESTION";
    this.OneQuestionSetupUI.CashLabel.string = "$" + _myData.Cash;
    this.OneQuestionSetupUI.PlayerNameLabel.string = _myData.PlayerName;
    this.OneQuestionSetupUI.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;

    if (_modeIndex == 2) {
      for (let index = 0; index < _actorsData.length; index++) {
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
      for (let index = 0; index < _actorsData.length; index++) {
        if (_myData.PlayerUID != _actorsData[index].PlayerUID) {
          var node = cc.instantiate(this.OneQuestionSetupUI.DetailsPrefab);
          node.parent = this.OneQuestionSetupUI.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].PlayerUID);
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

  SetUpDecisionScreen_OneQuestionSetupUI(_msg) {
    var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    this.OneQuestionSetupUI.DecisionTitleLabel.string = "ONE QUESTION";
    this.OneQuestionSetupUI.DecisionCashLabel.string = "$" + _myData.Cash;
    this.OneQuestionSetupUI.DecisionPlayerNameLabel.string = _myData.PlayerName;
    this.OneQuestionSetupUI.DecisionQuestionLabel.string = _msg;
  },
  //#endregion

  //#region Select Business for double payday setup
  ToggleScreen_BusinessPayDayUISetup(_state) {
    this.BusinessDoublePayScreen.active = _state;
  },

  EditTitle_BusinessPayDayUISetup(_mainTitle, _tileContent) {
    this.BusinessPayDayUISetup.TitleName.string = _mainTitle;
    this.BusinessPayDayUISetup.TitleContentLabel.string = _tileContent;
  },

  ExitScreen_BusinessPayDayUISetup() {
    this.ClearBusiness_BusinessPayDayUISetup();
    this.ToggleScreen_BusinessPayDayUISetup(false);
  },

  ExitScreen_AlongTurnOver_BusinessPayDayUISetup() {
    this.ClearBusiness_BusinessPayDayUISetup();
    this.ToggleScreen_BusinessPayDayUISetup(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },

  ClearBusiness_BusinessPayDayUISetup() {
    for (let index = 0; index < businessDetailPayDayNodes.length; index++) {
      businessDetailPayDayNodes[index].destroy();
    }
    businessDetailPayDayNodes = [];
  },
  ProcessBusiness_BusinessPayDayUISetup(_tempData, _businessType) {
    for (let index = 0; index < _tempData.NoOfBusiness.length; index++) {
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

  EnableSeletiveDoublePayDay_BusinessPayDayUISetup(_isHomeBased = false, _isBrickAndMortar = false) {
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
  ToggleScreen_SelectPlayerForProfit(_state) {
    this.SelectPlayerForProfitScreen.active = _state;
  },

  SetUpSpaceScreen_SelectPlayerForProfit(_myData, _actorsData, _isTurnOver, _modeIndex = 0) {
    this.SelectPlayerForProfitUI.TitleLabel.string = "SELECT PLAYER";
    this.SelectPlayerForProfitUI.CashLabel.string = "$" + _myData.Cash;
    this.SelectPlayerForProfitUI.PlayerNameLabel.string = _myData.PlayerName;
    this.SelectPlayerForProfitUI.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;

    if (_modeIndex == 2) {
      for (let index = 0; index < _actorsData.length; index++) {
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
      for (let index = 0; index < _actorsData.length; index++) {
        if (_myData.PlayerUID != _actorsData[index].PlayerUID) {
          var node = cc.instantiate(this.SelectPlayerForProfitUI.DetailsPrefab);
          node.parent = this.SelectPlayerForProfitUI.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].PlayerUID);
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

  ResetSpaceScreen_SelectPlayerForProfit() {
    for (let index = 0; index < selectPlayerProfitNodes.length; index++) {
      selectPlayerProfitNodes[index].destroy();
    }
    selectPlayerProfitNodes = [];
  },

  Exit_SelectPlayerForProfit() {
    this.ToggleScreen_SelectPlayerForProfit(false);
  },

  ExitAlongTurnOver_SelectPlayerForProfit() {
    this.ToggleScreen_SelectPlayerForProfit(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },

  //#endregion

  //#region (generic player) Select Player to Take over business
  ToggleScreen_SelectPlayerTakeOver(_state) {
    this.SelectPlayerTakeOverScreen.active = _state;
  },

  SetUpSpaceScreen_SelectPlayerTakeOver(_myData, _actorsData, _isTurnOver, _modeIndex = 0, _buyHalfBusiness = false) {
    this.SelectPlayerTakeOverSetup.TitleLabel.string = "SELECT PLAYER";
    this.SelectPlayerTakeOverSetup.CashLabel.string = "$" + _myData.Cash;
    this.SelectPlayerTakeOverSetup.PlayerNameLabel.string = _myData.PlayerName;
    this.SelectPlayerTakeOverSetup.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;

    var _mainData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    if (_modeIndex == 2) {
      for (let index = 0; index < _actorsData.length; index++) {
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

            for (let k = 0; k < _mainData.length; k++) {
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
      for (let index = 0; index < _actorsData.length; index++) {
        if (_myData.PlayerUID != _actorsData[index].PlayerUID) {
          var node = cc.instantiate(this.SelectPlayerTakeOverSetup.DetailsPrefab);
          node.parent = this.SelectPlayerTakeOverSetup.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].PlayerUID);
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

  ResetSpaceScreen_SelectPlayerTakeOver() {
    for (let index = 0; index < selectedPlayerTakeOver.length; index++) {
      selectedPlayerTakeOver[index].destroy();
    }
    selectedPlayerTakeOver = [];
  },

  Exit_SelectPlayerGeneric() {
    this.ResetSpaceScreen_SelectPlayerDamaging();
    this.ResetSpaceScreen_LoanPartnership();
    this.ResetSpaceScreen_SelectPlayerTakeOver();
    this.ResetSpaceScreen_CompareDice();
    this.ToggleScreen_SelectPlayerTakeOver(false);
    this.ToggleScreen_SelectPlayerDamaging(false);
    this.ToggleScreen_LoanPartnership(false);
    this.ToggleScreen_CompareDice(false);
  },

  ExitAlongTurnOver_SelectPlayerGeneric() {
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
  ToggleScreen_BusinessTakeOver(_state) {
    this.SelectBusinessTakeOverScreen.active = _state;
  },

  SetBusinessUI_BusinessTakeOver(_playerData, _OtherPlayerIndex = 0, _buyHalfBusiness = false) {
    this.Reset_BusinessTakeOver();
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    var _tempData = _playerData;
    console.log(_tempData);

    this.SelectBusinessTakeOver.TitleLabel.string = "BUSINESS";
    this.SelectBusinessTakeOver.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.SelectBusinessTakeOver.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;
    this.SelectBusinessTakeOver.BusinessCountLabel.string = "No of Businesses : " + _playerData.NoOfBusiness.length;

    for (let index = 0; index < _tempData.NoOfBusiness.length; index++) {
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

  Reset_BusinessTakeOver() {
    for (let index = 0; index < businessTakeOverNodes.length; index++) {
      businessTakeOverNodes[index].destroy();
    }

    businessTakeOverNodes = [];
  },

  EnableScreen__BusinessTakeOver(_isTurnover = false, _playerData = null, _playerIndex = 0, _buyHalfBusiness = false) {
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

  ExitScreen__BusinessGenric() {
    this.Reset__DamageDecision();
    this.Reset_BusinessTakeOver();
    this.ToggleBusinessScreen_DamageDecision(false);
    this.ToggleScreen_BusinessTakeOver(false);
    this.ToggleScreen_SellAllBusiness(false);
    this.ResetSpaceScreen_SellAllBusiness();
  },

  ExitScreenAlongTurnOver__BusinessGenric() {
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
  ToggleScreen_SelectPlayerDamaging(_state) {
    this.SelectPlayerDamagingScreen.active = _state;
  },

  SetUpSpaceScreen_SelectPlayerDamaging(_myData, _actorsData, _isTurnOver, _modeIndex = 0) {
    this.SelectPlayerDamagingSetup.TitleLabel.string = "SELECT PLAYER";
    this.SelectPlayerDamagingSetup.CashLabel.string = "$" + _myData.Cash;
    this.SelectPlayerDamagingSetup.PlayerNameLabel.string = _myData.PlayerName;
    this.SelectPlayerDamagingSetup.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;

    var _mainData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    if (_modeIndex == 2) {
      for (let index = 0; index < _actorsData.length; index++) {
        if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) {
          //check if player is spectate or not, dont add any spectates
          if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
            var node = cc.instantiate(this.SelectPlayerDamagingSetup.DetailsPrefab);
            node.parent = this.SelectPlayerDamagingSetup.ScrollContent;
            node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
            node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);

            for (let k = 0; k < _mainData.length; k++) {
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
      for (let index = 0; index < _actorsData.length; index++) {
        if (_myData.PlayerUID != _actorsData[index].PlayerUID) {
          var node = cc.instantiate(this.SelectPlayerDamagingSetup.DetailsPrefab);
          node.parent = this.SelectPlayerDamagingSetup.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].PlayerUID);
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

  ResetSpaceScreen_SelectPlayerDamaging() {
    for (let index = 0; index < selectedPlayerDamaging.length; index++) {
      selectedPlayerDamaging[index].destroy();
    }
    selectedPlayerDamaging = [];
  },

  //#endregion

  //#region Damaging information card decison setup
  ToggleMainScreen_DamageDecision(_state) {
    this.DecisionDamagingSetup.MainScreen.active = _state;
  },

  ToggleDiceResultScreen_DamageDecision(_state) {
    this.DecisionDamagingSetup.DiceResultScreen.active = _state;
  },

  ToggleBusinessScreen_DamageDecision(_state) {
    this.DecisionDamagingSetup.BusinessSelectScreen.active = _state;
  },

  SetBusinessUI_DamageDecision(_playerData, _OtherPlayerIndex = 0) {
    this.Reset__DamageDecision();
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    var _tempData = _playerData;
    console.log(_tempData);

    this.DecisionDamagingSetup.DamageBusinessSelect.TitleLabel.string = "BUSINESS";
    this.DecisionDamagingSetup.DamageBusinessSelect.CashLabel.string = _playerData.Cash;
    this.DecisionDamagingSetup.DamageBusinessSelect.PlayerNameLabel.string = _playerData.PlayerName;
    this.DecisionDamagingSetup.DamageBusinessSelect.BusinessCountLabel.string = "No of Businesses : " + _playerData.NoOfBusiness.length;

    for (let index = 0; index < _tempData.NoOfBusiness.length; index++) {
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

  Reset__DamageDecision() {
    for (let index = 0; index < businessDamagingNodes.length; index++) {
      businessDamagingNodes[index].destroy();
    }

    businessDamagingNodes = [];
  },

  EnableBusinessScreen_DamageDecision(_isTurnover = false, _playerData = null, _playerIndex = 0, _noButton = false) {
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

  SetMesageText_DamageDecision(_txt) {
    this.DecisionDamagingSetup.DiceResultLabel.string = _txt;
  },

  EnableDiceResult_DamageDecision() {
    this.ToggleDiceResultScreen_DamageDecision(true);
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _diceResult = _manager.RollTwoDices();
    var _fineMultiplier = 3000;
    DamageDecisionResult = _diceResult * _fineMultiplier;

    var _text = "\n" + "Dice Result : " + _diceResult + "\n" + "\n" + "Amount : " + _diceResult + " * " + _fineMultiplier + " = " + DamageDecisionResult;
    this.SetMesageText_DamageDecision(_text);
  },

  SetSenderID_DamageDecision(ID) {
    SenderDamagingID = ID;
  },

  ReceiveEvent_DamageDecision(_data) {
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

  PayAmount_DamageDecision() {
    var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    for (let index = 0; index < _manager.PlayerGameInfo.length; index++) {
      if (_manager.PlayerGameInfo[index].PlayerUID == _myActor.PlayerUID) {
        if (_manager.PlayerGameInfo[index].Cash >= DamageDecisionResult) {
          _manager.PlayerGameInfo[index].Cash -= DamageDecisionResult;
          this.ToggleDiceResultScreen_DamageDecision(false);
          this.ToggleMainScreen_DamageDecision(false);
          BankRuptedCard = false;
          this.ShowToast("You have successfully paid off amount $" + DamageDecisionResult + " , remaining cash $" + _manager.PlayerGameInfo[index].Cash);

          var _sendingData = { ID: SenderDamagingID, Cash: DamageDecisionResult, IsDiceRolled: true, IsBankRupted: false };
          GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(25, _sendingData);
        } else {
          BankRuptedCard = true;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
        }

        break;
      }
    }
  },

  SetBankruptedVar(_val)
  {
    BankRuptedCard=_val;
  },

  SelectBusinessForHalfOwnership_DamagingDecision(_playerData, _businessIndex, _selectedPlayerIndex = 0) {
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
    var _sendingData = { ID: SenderDamagingID, Cash: DamageDecisionResult, IsDiceRolled: false, IsBankRupted: false };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(25, _sendingData);
  },

  GivePartnerShip_DamageDecision() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playersData = _manager.PlayerGameInfo;
    var _myDataIndex = _manager.GetMyIndex();
    var _businessLength = _playersData[_myDataIndex].NoOfBusiness.length;
    var _businessCounter = 0;

    for (let index = 0; index < _playersData[_myDataIndex].NoOfBusiness.length; index++) {
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
  ToggleScreen_BuyHalfBusiness(_state) {
    this.BuyHalfBusinessUISetup.MainScreen.active = _state;
  },

  SetTitleText_BuyHalfBusiness(_txt) {
    this.BuyHalfBusinessUISetup.TitleLabel.string = _txt;
  },
  //#endregion

  //#region Taking loan for partnership
  ToggleScreen_LoanPartnership(_state) {
    this.LoanPartnershipScreen.active = _state;
  },

  SetUpSpaceScreen_LoanPartnership(_myData, _actorsData, _isTurnOver, _modeIndex = 0) {
    console.log(_actorsData);
    this.LoanPartnershipSetup.TitleLabel.string = "SELECT PLAYER";
    this.LoanPartnershipSetup.CashLabel.string = "$" + _myData.Cash;
    this.LoanPartnershipSetup.PlayerNameLabel.string = _myData.PlayerName;
    this.LoanPartnershipSetup.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;

    var _mainData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    if (_modeIndex == 2) {
      for (let index = 0; index < _actorsData.length; index++) {
        if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) {
          //check if player is spectate or not, dont add any spectates
          if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
            var node = cc.instantiate(this.LoanPartnershipSetup.DetailsPrefab);
            node.parent = this.LoanPartnershipSetup.ScrollContent;
            node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
            node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);

            for (let k = 0; k < _mainData.length; k++) {
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
      for (let index = 0; index < _actorsData.length; index++) {
        if (_myData.PlayerUID != _actorsData[index].PlayerUID) {
          var node = cc.instantiate(this.LoanPartnershipSetup.DetailsPrefab);
          node.parent = this.LoanPartnershipSetup.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].PlayerUID);
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

  ResetSpaceScreen_LoanPartnership() {
    for (let index = 0; index < LaonPartnershipArray.length; index++) {
      LaonPartnershipArray[index].destroy();
    }
    LaonPartnershipArray = [];
  },
  //#endregion
  
  //#region Sell all business except one

  ToggleScreen_SellAllBusiness(_state) {
    this.SellAllBusinessScreen.active = _state;
  },

  EnableScreen__SellAllBusiness(_isTurnover = false, _playerData = null, _playerIndex = 0) {
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

  SetBusinessUI_SellAllBusiness(_playerData, _OtherPlayerIndex = 0) {
    this.ResetSpaceScreen_SellAllBusiness();
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    var _tempData = _playerData;
    console.log(_tempData);

    this.SellAllBusinessSetup.TitleLabel.string = "BUSINESS";
    this.SellAllBusinessSetup.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.SellAllBusinessSetup.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;
    this.SellAllBusinessSetup.BusinessCountLabel.string = "No of Businesses : " + _playerData.NoOfBusiness.length;

    for (let index = 0; index < _tempData.NoOfBusiness.length; index++) {
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

  ResetSpaceScreen_SellAllBusiness() {
    for (let index = 0; index < SellAllBusinessArray.length; index++) {
      SellAllBusinessArray[index].destroy();
    }
    SellAllBusinessArray = [];
  },
  //#endregion
  
  //#region Select Player to compare dice roll
    ToggleScreen_CompareDice(_state) {
      this.CompareDiceScreen.active = _state;
    },
  
    SetUpSpaceScreen_CompareDice(_myData, _actorsData, _isTurnOver, _modeIndex = 0) {
      console.log(_actorsData);
      this.CompareDiceSetup.TitleLabel.string = "SELECT PLAYER";
      this.CompareDiceSetup.CashLabel.string = "$" + _myData.Cash;
      this.CompareDiceSetup.PlayerNameLabel.string = _myData.PlayerName;
      this.CompareDiceSetup.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;
  
      var _mainData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;
  
      if (_modeIndex == 2) {
        for (let index = 0; index < _actorsData.length; index++) {
          if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) {
            //check if player is spectate or not, dont add any spectates
            if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
              var node = cc.instantiate(this.CompareDiceSetup.DetailsPrefab);
              node.parent = this.CompareDiceSetup.ScrollContent;
              node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
              node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);
  
              for (let k = 0; k < _mainData.length; k++) {
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
        for (let index = 0; index < _actorsData.length; index++) {
          if (_myData.PlayerUID != _actorsData[index].PlayerUID) {
            var node = cc.instantiate(this.CompareDiceSetup.DetailsPrefab);
            node.parent = this.CompareDiceSetup.ScrollContent;
            node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].PlayerName);
            node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].PlayerUID);
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
  
    ResetSpaceScreen_CompareDice() {
      for (let index = 0; index < CompareDiceArray.length; index++) {
        CompareDiceArray[index].destroy();
      }
      CompareDiceArray = [];
    },

    ToggleDecsion01Screen_CompareDice(_state)
    {
      this.CompareDiceDecision1Screen.active=_state;
    },

    ToggleDecsion02Screen_CompareDice(_state)
    {
      this.CompareDiceDecision2Screen.active=_state;
    },

    ChangeTitle_Decsion02Screen_CompareDice(_msg)
    {
      this.CompareDiceDecision2Text.string=_msg;
    },

    ToggleDecsion02ScreenButton_CompareDice(_state)
    {
      this.CompareDiceDecision2Button.active=_state;
    },
    //#endregion

  //#region Naming game compitators

  ToggleScreen_CompitatorUI(_state)
  {
    this.CompitatorSetupUI.MainScreen.active=_state;
    this.CompitatorSetupUI.CompEditBox1.string="";
    this.CompitatorSetupUI.CompEditBox2.string="";
    this.CompitatorSetupUI.CompEditBox3.string="";
  },

  ChangeTitle_CompitatorUI(_msg)
  {
    this.CompitatorSetupUI.TitleLabel.string=_msg;
  },

  OnDoneClicked_CompitatorUI()
  {
    var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
    var text1=this.CompitatorSetupUI.CompEditBox1.string;
    var text2=this.CompitatorSetupUI.CompEditBox2.string;
    var text3=this.CompitatorSetupUI.CompEditBox3.string;
    var _playerIndex=_manager.GetTurnNumber();
    var _marketingAmount=_manager.PlayerGameInfo[_playerIndex].MarketingAmount;

    var TextArray=[text1,text2,text3];

    var _checkCounter=0;
    var _tempCounter=0;

    for (let index = 0; index < _manager.PlayerGameInfo.length; index++) {
      if(_manager.PlayerGameInfo[index].IsActive && _playerIndex!=index)
        _checkCounter++;
    }

    for (let index = 0; index < _manager.PlayerGameInfo.length; index++) {
      for (let j = 0; j < TextArray.length; j++) {
        if(TextArray[j].toLowerCase()==_manager.PlayerGameInfo[index].PlayerName.toLowerCase())
        {
          _tempCounter++;
          break;
        }
      }
    }

    if(_tempCounter>=_checkCounter && _tempCounter!=0 && _checkCounter!=0)
    {
      console.log("You freakin won");
      var profit=_marketingAmount+(_marketingAmount*5);
      _manager.PlayerGameInfo[_playerIndex].MarketingAmount=0;
      _manager.PlayerGameInfo[_playerIndex].Cash+=profit;

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You were successful and received 500% profit on your marketing amount, your cash becomes $"+_manager.PlayerGameInfo[_playerIndex].Cash);
    }
    else
    {
      _manager.PlayerGameInfo[_playerIndex].MarketingAmount=0;
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have failed and have lost your marketing amount.");
    }

    this.ExitAlongTurnOver_CompitatorUI();
  },

  ExitAlongTurnOver_CompitatorUI() {
    this.ToggleScreen_CompitatorUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },

  //#endregion

  //#region Creating Ad description for everyone to vote
  ToggleScreen_TelevisionADSetup(_state)
  {
    this.TelevisionADSetupUI.MainScreen.active=_state;
    this.TelevisionADSetupUI.MainEditBox.string="";
  },
  
  ToggleDecisionScreen_TelevisionADSetup(_state)
  {
    this.TelevisionADSetupUI.DecisionScreen.active=_state;
  },

  ChangeDecisionScreenText_TelevisionADSetup(_txt)
  {
    this.TelevisionADSetupUI.DecisionScreenText.string=_txt;
  },

  OnDoneClicked_TelevisionADSetup()
  {
    var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex=_manager.GetTurnNumber();
    var text1=this.TelevisionADSetupUI.MainEditBox.string;
    var _marketingAmount=_manager.PlayerGameInfo[_playerIndex].MarketingAmount;
    clearTimeout(TelevisionAdTimeout);

    if(text1=="")
    {
      this.ShowToast("Please enter description for your commercial.");
    }
    else
    {
      var _sentdata = { Player: _manager.PlayerGameInfo[_playerIndex],Description:text1};
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(29, _sentdata); 
      VotesUpArray=[];
      VotesDownArray=[];

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(true);

      TelevisionAdTimeout=setTimeout(() => {
        this.FailedScreen_TelevisionADSetup();
      }, 25000);
    }
  },

  FailedScreen_TelevisionADSetup()
  {
    clearTimeout(TelevisionAdTimeout);
    var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex=_manager.GetTurnNumber();
    this.ShowToast("Either time has been passed for voting or you have failed to leave positive impression on others, you have lost your marketing account.");
    _manager.PlayerGameInfo[_playerIndex].MarketingAmount=0;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(false);
    this.ExitAlongTurnOver_TelevisionADSetup();

  },

  SuccessScreen_TelevisionADSetup()
  {
    clearTimeout(TelevisionAdTimeout);
    var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex=_manager.GetTurnNumber();
    var _marketingAmount=_manager.PlayerGameInfo[_playerIndex].MarketingAmount;

    var profit=_marketingAmount+(_marketingAmount*6);
    _manager.PlayerGameInfo[_playerIndex].MarketingAmount=0;
    _manager.PlayerGameInfo[_playerIndex].Cash+=profit;

    this.ShowToast("You have succeed putting positive impression, you have received 600% profit of your marketing amount, your cash becomes $"+_manager.PlayerGameInfo[_playerIndex].Cash);
    _manager.PlayerGameInfo[_playerIndex].MarketingAmount=0;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(false);
    this.ExitAlongTurnOver_TelevisionADSetup();

  },

  ExitAlongTurnOver_TelevisionADSetup() {
    this.ToggleScreen_TelevisionADSetup(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },

  ReceiveEvent_TelevisionADSetup(_data)
  {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
    
      clearTimeout(VoteTimeout);  
      var _senderPlayerData=_data.Player;
      var _des=_data.Description;
      SenderADPPlayer=_senderPlayerData;

      this.ToggleDecisionScreen_TelevisionADSetup(true);
      this.ChangeDecisionScreenText_TelevisionADSetup(_des);

      VoteTimeout=setTimeout(() => {
        this.ToggleDecisionScreen_TelevisionADSetup(false);
      }, 24000);
    }
  },

  VoteUpDecision_TelevisionADSetup()
  {
      clearTimeout(VoteTimeout);
      var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
      this.ToggleDecisionScreen_TelevisionADSetup(false);
      var _sentdata = { SenderID: _myActor.PlayerUID,ReciverID:SenderADPPlayer.PlayerUID,VoteUp:true};
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(30, _sentdata); 
  },

  VoteDownDecision_TelevisionADSetup()
  {
      clearTimeout(VoteTimeout);  
      var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
      this.ToggleDecisionScreen_TelevisionADSetup(false);
      var _sentdata = { SenderID: _myActor.PlayerUID,ReciverID:SenderADPPlayer.PlayerUID,VoteUp:false};
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(30, _sentdata); 
  },

  ReceiveEvent_VoteTelevisionADSetup(_data)
  {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
      var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
      var _myID=_data.ReciverID;
      var _otherID=_data.SenderID;
      var _voteUp=_data.VoteUp;
      var _manager=GamePlayReferenceManager.Instance.Get_GameManager();
      var _playerIndex=_manager.GetTurnNumber();
      var _totalPlayer=0;
      
      if(_myActor.PlayerUID==_myID)
      {
        if(_voteUp)
          VotesUpArray.push(_otherID);
        else
          VotesDownArray.push(_otherID);


        for (let index = 0; index<_manager.PlayerGameInfo.length; index++) {
          if(_manager.PlayerGameInfo[index].IsActive && index!=_playerIndex)
            _totalPlayer++; 
        }

        var _RecievedVotes=VotesUpArray.length+VotesDownArray.length;

        console.log(_RecievedVotes);
        console.log(VotesUpArray);
        console.log(VotesDownArray);
        console.log(_totalPlayer);

        if(_RecievedVotes >=_totalPlayer)
        {
          if(VotesUpArray.length>VotesDownArray.length)
            this.SuccessScreen_TelevisionADSetup();
          else
            this.FailedScreen_TelevisionADSetup();
        }
      }
    }
  },

  //#endregion

  ShowToast: function (message, time = ShortMessageTime, _hasbutton = true) {
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
        }, time);
        // }
      } else {
        if (_hasbutton) {
          this.PopUpUIButton.active = true;
          clearTimeout(TimeoutRef);
          TimeoutRef = setTimeout(() => {
            this.CompleteToast();
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
        TimeoutRef = setTimeout(() => {
          this.CompleteToast();
        }, CompletionWindowTime);
      } else {
        this.PopUpUIButton.active = false;
        setTimeout(function () {
          SelfToast.PopUpUI.active = false;
        }, time);
      }
    }
  },

  CompleteToast() {
    try {
      console.log("complete toast called");
      if(this.PopUpUI)
        this.PopUpUI.active = false;

      clearTimeout(TimeoutRef);
    } catch (error) {
      
    }
   
  },

  ShowResultScreen: function (_status, _data) {
    this.ResultSetupUI.ResultScreen.active = true;
    this.ResultSetupUI.StatusLabel.string = _status;
    this.ResultSetupUI.BodyLabel.string = _data;
  },

  RestartTheGame() {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
  },

  RaiseEventToSyncInfo(_dataInfo,_toPlayerUID="") {
    var _mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

    if (_mode == 2) {
      //for real players
      var _data = { info: _dataInfo, PlayerUID:_toPlayerUID };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(15, _data);
    } else if (_mode == 1) {
      //for bot
      if (this.IsBotTurn) {
        var _data = { info: _dataInfo,PlayerUID: _toPlayerUID };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(15, _data);
      }
    }
  },
});
