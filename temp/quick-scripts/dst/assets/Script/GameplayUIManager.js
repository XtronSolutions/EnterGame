
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
var GamePlayReferenceManager = null; //-------------------------------------------enumeration for amount of loan-------------------------//

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
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.CheckReferences();
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
  start: function start() {},
  //#region Spectate UI Setup
  InitialScreen_SpectateMode: function InitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = true;
  },
  ToggleLeaveRoomButton_SpectateModeUI: function ToggleLeaveRoomButton_SpectateModeUI(_state) {
    this.LeaveRoomButton.active = _state;
  },
  OnLeaveButtonClicked_SpectateModeUI: function OnLeaveButtonClicked_SpectateModeUI() {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(true);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    setTimeout(function () {
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
      PlayerDataIntance.Cash = 100000;
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
    if (GoldCashAmount == "") {
      this.ResetGoldInput();
      this.ShowToast("Please enter cash amount to invest in GOLD.");
    } else {
      EnterBuySellAmount = "";
      this.ToggleInvestSellScreen_InvestSell(true);
      this.InvestSellSetupUI.InvestState = InvestEnum.GoldInvest;
      DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
      OnceOrShare = DiceResult * 1000;
      this.AssignData_InvestSell("Invest In GOLD", DiceResult, "Each Ounce of GOLD price is:", OnceOrShare + "/ounce", "Enter the number of ounce of GOLD you want to BUY", "Total Buying Amount:", OnceOrShare + "*0=0", "BUY", this.InvestSellSetupUI.InvestState);
    }
  },
  OnStockBusinessNameChanged_TurnDecision: function OnStockBusinessNameChanged_TurnDecision(name) {
    StockBusinessName = name;
  },
  OnStockDiceClicked_TurnDecision: function OnStockDiceClicked_TurnDecision() {
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    if (StockBusinessName == "") {
      this.ResetStockBusinessNameInput();
      this.ShowToast("Please enter a business name to invest.");
    } else {
      EnterBuySellAmount = "";
      this.ToggleInvestSellScreen_InvestSell(true);
      this.InvestSellSetupUI.InvestState = InvestEnum.StockInvest;
      DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
      OnceOrShare = DiceResult * 1000;
      this.AssignData_InvestSell("Invest in Stock", DiceResult, "Each Share of stock price is:", OnceOrShare + "/share", "Enter the number of shares of stock you want to BUY", "Total Buying Amount:", OnceOrShare + "*0=0", "BUY", this.InvestSellSetupUI.InvestState);
    }
  },
  OnSellGoldClicked_TurnDecision: function OnSellGoldClicked_TurnDecision() {
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount > 0) {
      EnterBuySellAmount = "";
      this.ToggleInvestSellScreen_InvestSell(true);
      this.InvestSellSetupUI.InvestState = InvestEnum.GoldSell;
      DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
      OnceOrShare = DiceResult * 1000;
      this.AssignData_InvestSell("Sell GOLD", DiceResult, "Each Ounce of GOLD price is:", OnceOrShare + "/ounce", "Enter the number of ounce of GOLD you want to SELL", "Total Selling Amount:", OnceOrShare + "*0=0", "SELL", this.InvestSellSetupUI.InvestState);
    } else {
      this.ShowToast("you have not purchased any GOLD ounces, please buy them.");
    }
  },
  OnSellStockClicked_TurnDecision: function OnSellStockClicked_TurnDecision() {
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount > 0) {
      EnterBuySellAmount = "";
      this.ToggleInvestSellScreen_InvestSell(true);
      this.InvestSellSetupUI.InvestState = InvestEnum.StockSell;
      DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
      OnceOrShare = DiceResult * 1000;
      this.AssignData_InvestSell("Sell STOCK", DiceResult, "Each share of stock price is:", OnceOrShare + "/share", "Enter the number of shares of stock you want to SELL", "Total Selling Amount:", OnceOrShare + "*0=0", "SELL", this.InvestSellSetupUI.InvestState);
    } else {
      this.ShowToast("you have not purchased any shares, please buy them.");
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
  PrintDiceValue_TurnDecision: function PrintDiceValue_TurnDecision(value) {
    this.TempDiceText.string = value;
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
    this.PayDaySetupUI.BMNumberLocationLabel.string = BMLocations; //check skip payday variables

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
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      LoanPayed = true;
      this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= 5000) {
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - 5000;
        var _loanTaken = false;
        var _businessIndex = 0;

        for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
          if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
            _loanTaken = true;
            _businessIndex = index;
            break;
          }
        }

        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount - 5000;

        if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount <= 0) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = 0;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanTaken = false;
        }
      }

      this.PayDayCompleted();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIkxvYW5BbW91bnRFbnVtIiwiY2MiLCJFbnVtIiwiTm9uZSIsIlRlblRob3VzYW5kIiwiVGVudHlUaG91c2FuZCIsIlRoaXJ0eVRob3VzYW5kIiwiRm9ydHlUaG91c2FuZCIsIkZpZnR5VGhvdXNhbmQiLCJPdGhlciIsIkJ1c2luZXNzU2V0dXBVSSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJQbGF5ZXJOYW1lVUkiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJQbGF5ZXJDYXNoVUkiLCJCdXNpbmVzc1R5cGVUZXh0VUkiLCJUZXh0IiwiQnVzaW5lc3NOYW1lVGV4dFVJIiwiQnVzaW5lc3NUeXBlTGFiZWwiLCJFZGl0Qm94IiwiQnVzaW5lc3NOYW1lTGFiZWwiLCJIb21lQmFzZWROb2RlVUkiLCJOb2RlIiwiQnJpY2tBbmRNb3J0YXJOb2RlVUkiLCJUaW1lclVJIiwiVGltZXJOb2RlIiwiQnVzaW5lc3NTZXR1cE5vZGUiLCJMb2FuU2V0dXBOb2RlIiwiTG9hbkFtb3VudCIsIkxvYW5BbW91bnRMYWJlbCIsIldhaXRpbmdTdGF0dXNOb2RlIiwiRXhpdEJ1dHRvbk5vZGUiLCJjdG9yIiwiQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwic3RyaW5nIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIk1hcmtldGluZ0VkaXRCb3giLCJHb2xkRWRpdEJveCIsIlN0b2NrRWRpdEJveCIsIkNhc2hBbW91bnRMYWJlbCIsIkV4cGFuZEJ1c2luZXNzTm9kZSIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiUHJlZmFiIiwiSW52ZXN0RW51bSIsIlN0b2NrSW52ZXN0IiwiR29sZEludmVzdCIsIlN0b2NrU2VsbCIsIkdvbGRTZWxsIiwiSW52ZXN0U2VsbFVJIiwiVGl0bGVMYWJlbCIsIkRpY2VSZXN1bHRMYWJlbCIsIlByaWNlVGl0bGVMYWJlbCIsIlByaWNlVmFsdWVMYWJlbCIsIkJ1eU9yU2VsbFRpdGxlTGFiZWwiLCJUb3RhbEFtb3VudFRpdGxlTGFiZWwiLCJUb3RhbEFtb3VudFZhbHVlTGFiZWwiLCJCdXR0b25OYW1lTGFiZWwiLCJJbnZlc3RTdGF0ZSIsIkFtb3VudEVkaXRCb3giLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJSZXN1bHRTY3JlZW5UaXRsZUxhYmVsIiwiVG90YWxCdXNpbmVzc0xhYmVsIiwiVG90YWxBbW91bnRMYWJlbCIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCIsIkJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCIsIkxvYW5QYXllZCIsIlRvdGFsUGF5RGF5QW1vdW50IiwiRG91YmxlUGF5RGF5IiwiR2FtZXBsYXlVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJCdXNpbmVzc1NldHVwRGF0YSIsIkludmVzdFNlbGxTZXR1cFVJIiwiUGF5RGF5U2V0dXBVSSIsIlBvcFVwVUkiLCJHYW1lcGxheVVJU2NyZWVuIiwiRGVjaXNpb25TY3JlZW4iLCJJbnZlc3RTZWxsU2NyZWVuIiwiUGF5RGF5U2NyZWVuIiwiVGVtcERpY2VUZXh0IiwiTGVhdmVSb29tQnV0dG9uIiwib25Mb2FkIiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlN5bmNEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwic3RhcnQiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsImFjdGl2ZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIl9zdGF0ZSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiaXNGaXJzdFRpbWUiLCJpbnNpZGVHYW1lIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkJ1c2luZXNzSW5mbyIsIkNhc2giLCJSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwIiwiaW5kZXgiLCJHZXRfR2FtZU1hbmFnZXIiLCJQbGF5ZXJHYW1lSW5mbyIsImxlbmd0aCIsIlN0dWRlbnREYXRhIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJQbGF5ZXJOYW1lIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIm5vbmUiLCJPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJIb21lQmFzZWQiLCJPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsImJyaWNrQW5kbW9ydGFyIiwiYW1vdW50IiwiQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiTm9PZkJ1c2luZXNzIiwiTG9hblRha2VuIiwiU2hvd1RvYXN0IiwiTWF0aCIsImFicyIsInBhcnNlSW50IiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiX2RhdGEiLCJfSUQiLCJQaG90b25BY3RvciIsImFjdG9yTnIiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYW1vdW50IiwiX2J1c2luZXNzTmFtZSIsIl9pc0hvbWVCYXNlZCIsIkhvbWVCYXNlZEFtb3VudCIsIlN0YXJ0R2FtZSIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiRXhpdF9CdXNpbmVzc1NldHVwIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJSYWlzZUV2ZW50IiwiU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJQYXlBbW91bnRUb1BsYXlHYW1lIiwiSXNCb3QiLCJpc2FjdGl2ZSIsIlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uIiwiR2V0VHVybk51bWJlciIsIk9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbiIsIl9wbGF5ZXJJbmRleCIsIm1hcmtldGluZ0Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIk9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJMYXd5ZXJTdGF0dXMiLCJvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiZ2VuZXJhdGVkTGVuZ3RoIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGREaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSZXNldEdvbGRJbnB1dCIsIlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCIsIlJvbGxUd29EaWNlcyIsIkFzc2lnbkRhdGFfSW52ZXN0U2VsbCIsIk9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbiIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQiLCJPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHb2xkQ291bnQiLCJPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uIiwiU3RvY2tDb3VudCIsIk9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJvbGxEaWNlIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwidmFsdWUiLCJvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbCIsIlVwZGF0ZURhdGFfSW52ZXN0U2VsbCIsIl90aXRsZSIsIl9kaWNlUmVzdWx0IiwiX3ByaWNlVGl0bGUiLCJfcHJpY2VWYWx1ZSIsIl9idXlPclNlbGxUaXRsZSIsIl90b3RhbEFtb3VudFRpdGxlIiwiX3RvdGFsQW1vdW50VmFsdWUiLCJfYnV0dG9uTmFtZSIsIkFwcGx5QnV0dG9uX0ludmVzdFNlbGwiLCJfVG90YWxBbW91bnQiLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJITUFtb3VudCIsIkJNQW1vdW50IiwibG9hblRha2VuIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl90aW1lIiwiQk1Mb2NhdGlvbnMiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIlBheURheUNvbXBsZXRlZCIsIk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RpY2UiLCJSb2xsT25lRGljZSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiY2FsbFVwb25DYXJkIiwibWVzc2FnZSIsInRpbWUiLCJTZWxmVG9hc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUMsSUFBN0IsRUFDQTs7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUMsQ0FEb0I7QUFFekJDLEVBQUFBLFdBQVcsRUFBRSxLQUZZO0FBR3pCQyxFQUFBQSxhQUFhLEVBQUUsS0FIVTtBQUl6QkMsRUFBQUEsY0FBYyxFQUFFLEtBSlM7QUFLekJDLEVBQUFBLGFBQWEsRUFBRSxLQUxVO0FBTXpCQyxFQUFBQSxhQUFhLEVBQUUsS0FOVTtBQU96QkMsRUFBQUEsS0FBSyxFQUFDO0FBUG1CLENBQVIsQ0FBckIsRUFTQTs7QUFDQSxJQUFJQyxlQUFlLEdBQUNULEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUMsaUJBRG9CO0FBR3pCQyxFQUFBQSxVQUFVLEVBQUU7QUFDWkMsSUFBQUEsWUFBWSxFQUNaO0FBQ0dDLE1BQUFBLFdBQVcsRUFBQyxjQURmO0FBRUdDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGWjtBQUdHLGlCQUFTLElBSFo7QUFJR0MsTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0dDLE1BQUFBLE9BQU8sRUFBQztBQUxYLEtBRlk7QUFRWkMsSUFBQUEsWUFBWSxFQUNaO0FBQ0dMLE1BQUFBLFdBQVcsRUFBQyxj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OUssRUFBRSxDQUFDZ0IsS0FBckQsRUFBNER1QixNQUE1RCxHQUFtRTBQLE9BQW5FO0FBQ0EsUUFBSUUsU0FBUyxHQUFDLElBQWQ7QUFDQXRLLElBQUFBLFVBQVUsQ0FBQyxZQUFVO0FBQUdzSyxNQUFBQSxTQUFTLENBQUNoTSxPQUFWLENBQWtCa0IsTUFBbEIsR0FBeUIsS0FBekI7QUFBaUMsS0FBL0MsRUFBaUQ2SyxJQUFqRCxDQUFWO0FBQ0g7QUF0a0MwQixDQUFULENBQXRCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBhbW91bnQgb2YgbG9hbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTG9hbkFtb3VudEVudW0gPSBjYy5FbnVtKHtcclxuICAgIE5vbmU6MCxcclxuICAgIFRlblRob3VzYW5kOiAxMDAwMCwgICAgICAgICAgICAgICAgICBcclxuICAgIFRlbnR5VGhvdXNhbmQ6IDIwMDAwLFxyXG4gICAgVGhpcnR5VGhvdXNhbmQ6IDMwMDAwLFxyXG4gICAgRm9ydHlUaG91c2FuZDogNDAwMDAsXHJcbiAgICBGaWZ0eVRob3VzYW5kOiA1MDAwMCxcclxuICAgIE90aGVyOjZcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NTZXR1cFVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJCdXNpbmVzc1NldHVwVUlcIixcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lVUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllck5hbWVVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgZm9yIHBsYXllciBuYW1lXCIsfSxcclxuICAgIFBsYXllckNhc2hVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyQ2FzaFVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIGNhc2hcIix9LFxyXG4gICAgQnVzaW5lc3NUeXBlVGV4dFVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgIHRvb2x0aXA6XCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgdHlwZVwiLH0sXHJcbiAgICBCdXNpbmVzc05hbWVUZXh0VUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgdG9vbHRpcDpcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyBuYW1lXCIsfSxcclxuICAgIEJ1c2luZXNzVHlwZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1R5cGVMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIGZvciBidXNpbmVzcyB0eXBlIGVkaXRib3hcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzTmFtZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJyZWZlcmVjZSBmb3IgYnVzaW5lc3MgbmFtZSBlZGl0Ym94XCIsfSxcclxuICAgIEhvbWVCYXNlZE5vZGVVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkTm9kZVVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3NcIix9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJOb2RlVUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrQW5kTW9ydGFyTm9kZVVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3NcIix9LFxyXG4gICAgVGltZXJVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGltZXJVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbGFiZWwgZm9yIHRpbWVyXCIsfSxcclxuICAgIFRpbWVyTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGltZXJOb2RlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSBmb3IgdGltZXIgbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwifSwgXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NTZXR1cE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnVzaW5lc3Mgc2V0dXBcIix9LFxyXG4gICAgTG9hblNldHVwTm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblNldHVwTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBsb2FuIHNldHVwXCIsfSxcclxuICAgIExvYW5BbW91bnQ6XHJcbiAgICB7XHJcbiAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgdHlwZTogTG9hbkFtb3VudEVudW0sXHJcbiAgICAgICAgZGVmYXVsdDogTG9hbkFtb3VudEVudW0uTm9uZSxcclxuICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgdG9vbHRpcDpcImxvYW4gYW1vdW50IHRha2VuIGJ5IHBsYXllciAoc3RhdGUgbWFjaGluZSlcIn0sIFxyXG4gICAgTG9hbkFtb3VudExhYmVsOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50TGFiZWxcIixcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBhbGwgbGFiZWxzIG9mIGFtb3VudHMgaW4gbG9hbiBVSVwifSwgXHJcbiAgICBXYWl0aW5nU3RhdHVzTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiV2FpdGluZ1N0YXR1c05vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciB3YWl0aW5nIHN0YXR1cyBzY3JlZW4gb24gaW5pdGlhbCBidXNpbmVzcyBzZXR1cFwifSwgXHJcbiAgICBFeGl0QnV0dG9uTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvbk5vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBleGl0IGJ1dHRvbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCJ9LCBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yLy9cclxuICAgIH0sXHJcblxyXG4gICAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZz1uYW1lO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlR1cm5EZWNpc2lvblNldHVwVUlcIixcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBNYXJrZXRpbmdFZGl0Qm94OlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJNYXJrZXRpbmdFZGl0Qm94XCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgbWFya2V0aW5nIG5vZGVcIix9LFxyXG4gICAgR29sZEVkaXRCb3g6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkdvbGRFZGl0Qm94XCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IGdvbGQgbm9kZVwiLH0sIFxyXG4gICAgU3RvY2tFZGl0Qm94OlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTdG9ja0VkaXRCb3hcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3Qgc3RvY2sgbm9kZVwiLH0sXHJcbiAgICBDYXNoQW1vdW50TGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhc2hcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzTm9kZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhwYW5kQnVzaW5lc3NOb2RlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSBmb3IgZXhwbmFkIGJ1c2luZXNzIG5vZGVcIn0sIFxyXG4gICAgRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIn0sICAgXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhwYW5kQnVzaW5lc3NQcmVmYWJcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwifSwgICAgICAgICAgICAgXHJcbn0sXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7Ly9jb25zdHJ1Y3RvclxyXG4gICAgfSxcclxuXHJcbiAgICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nPW5hbWU7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBpbnZlc3RtZW50L2J1eSBhbmQgc2VsbC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0RW51bSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgU3RvY2tJbnZlc3Q6IDEsICAgICAgICAgICAgICAgICAgXHJcbiAgICBHb2xkSW52ZXN0OiAyLFxyXG4gICAgU3RvY2tTZWxsOiAzLFxyXG4gICAgR29sZFNlbGw6IDQsXHJcbiAgICBPdGhlcjo1XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFNlbGxVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0U2VsbFVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJJbnZlc3RTZWxsVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlIFJlc3VsdCBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgUHJpY2VUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQcmljZVRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgUHJpY2VWYWx1ZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQcmljZVZhbHVlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSB2YWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgQnV5T3JTZWxsVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnV5T3JTZWxsVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1eU9yU2VsbCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgVG90YWxBbW91bnRUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgVG90YWxBbW91bnRWYWx1ZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEFtb3VudFZhbHVlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBWYWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgQnV0dG9uTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXR0b25OYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBidXR0b24gbmFtZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCJ9LFxyXG4gICAgIEludmVzdFN0YXRlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJJbnZlc3RTdGF0ZVwiLFxyXG4gICAgICAgdHlwZTogSW52ZXN0RW51bSxcclxuICAgICAgIGRlZmF1bHQ6IEludmVzdEVudW0uTm9uZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZX0sXHJcbiAgICAgQW1vdW50RWRpdEJveDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQW1vdW50RWRpdEJveFwiLFxyXG4gICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWV9LFxyXG4gICAgICAgICAgXHJcbn0sXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7Ly9jb25zdHJ1Y3RvclxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQYXlEYXlVSVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFBheURheSBub2RlXCJ9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkhvbWVCYXNlZE51bWJlclwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkTnVtYmVyIG5vZGVcIn0sXHJcbiAgICAgQk1OdW1iZXJMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIn0sXHJcbiAgICAgQk1OdW1iZXJMb2NhdGlvbkxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja01vcnRhckxvY2F0aW9uc1wiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJMb2NhdGlvbnMgbm9kZVwifSxcclxuICAgIEhvbWVCYXNlZEJ0bjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCJ9LFxyXG4gICAgQk1CdG46XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrTW9ydGFyQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyQnRuIG5vZGVcIn0sXHJcbiAgICBMb2FuQnRuOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwifSxcclxuICAgIE1haW5QYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIn0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRQYW5lbCBub2RlXCJ9LFxyXG4gICAgIFJlc3VsdFNjcmVlblRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlJlc3VsdFNjcmVlblRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRTY3JlZW5UaXRsZSBub2RlXCJ9LFxyXG4gICAgIERpY2VSZXN1bHRMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiRGljZVJlc3VsdFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZVJlc3VsdCBub2RlXCJ9LFxyXG4gICBUb3RhbEJ1c2luZXNzTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsQnVzaW5lc3NMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxCdXNpbmVzcyBub2RlXCJ9LFxyXG4gICAgVG90YWxBbW91bnRMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxBbW91bnRMYWJlbFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgbm9kZVwifSxcclxuICAgICAgICAgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD0tMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuLy90dXJuIGRlY2lzaW9uc1xyXG52YXIgVGVtcE1hcmtldGluZ0Ftb3VudD1cIlwiO1xyXG52YXIgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbi8vYnV5b3JzZWxsXHJcbnZhciBHb2xkQ2FzaEFtb3VudD1cIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbnZhciBTdG9ja0J1c2luZXNzTmFtZT1cIlwiO1xyXG52YXIgRGljZVJlc3VsdDtcclxudmFyIE9uY2VPclNoYXJlO1xyXG52YXIgTG9jYXRpb25OYW1lPVwiXCI7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxudmFyIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxudmFyIExvYW5QYXllZD1mYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50PTA7XHJcbnZhciBEb3VibGVQYXlEYXk9ZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkdhbWVwbGF5VUlNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCJ9LFxyXG4gICAgICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIn0sXHJcbiAgICAgICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsfSwgIFxyXG4gICAgICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIix9LCAgICAgXHJcbiAgICAgICAgUG9wVXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgcG9wIHVwIHNjcmVlblwiLH0sICAgXHJcbiAgICAgICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHNldHVwIHNjcmVlblwiLH0sICBcclxuICAgICAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBnYW1lcGxheSB1aSBzY3JlZW5cIix9LCAgIFxyXG4gICAgICAgIERlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIix9LCAgICBcclxuICAgICAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3QgJiBzZWxsIHNjcmVlblwiLH0sICAgIFxyXG4gICAgICAgIFBheURheVNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgUGF5RGF5IHNjcmVlblwiLH0sICAgIFxyXG4gICAgICAgICBUZW1wRGljZVRleHQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcImxhYmVsIHJlZmVyZW5jZSBmb3IgZGljZVwiLH0sICAgXHJcbiAgICAgICAgIExlYXZlUm9vbUJ1dHRvbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSwgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpOyBcclxuICAgICB9LFxyXG5cclxuICAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcblxyXG4gICAgICAgIGlmKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXI9cmVxdWlyZSgnR2FtZU1hbmFnZXInKTtcclxuICAgICB9LFxyXG5cclxuICAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWQgXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ1N5bmNEYXRhJywgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignU3luY0RhdGEnLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICAgICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIFNwZWN0YXRlIFVJIFNldHVwXHJcbiAgICBJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxlYXZlUm9vbUJ1dHRvbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbCh0cnVlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3BsYXNoXCIpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBCdXNpbmVzc1NldHVwIHdpdGggbG9hblxyXG4gICAgLy9CdXNpbmVzcyBzZXR1cCB1aS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChpc0ZpcnN0VGltZSxpbnNpZGVHYW1lPWZhbHNlKSB7IC8vY2FsbGVkIGZpcnN0IHRpbWUgZm9ybSBHYW1lTWFuYWdlciBvbmxvYWQgZnVuY3Rpb25cclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5Jbml0X0J1c2luZXNzU2V0dXAoaXNGaXJzdFRpbWUsaW5zaWRlR2FtZSk7XHJcbiAgICB9LFxyXG4gICAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsaW5zaWRlR2FtZT1mYWxzZSkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlPW5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZT1uZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcbiAgICAgICBcclxuICAgICAgICBpZihpc0ZpcnN0VGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD0xMDAwMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAoKTtcclxuXHJcbiAgICAgICAgaWYoaW5zaWRlR2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwPWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gpOyAgXHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD0tMTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7IFxyXG4gICAgICAgIH0gXHJcbiAgICB9LCBcclxuICAgIEdldE9ial9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQnVzaW5lc3NTZXR1cERhdGE7XHJcbiAgICB9LFxyXG4gICAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAobmFtZSk7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZT1uYW1lO1xyXG4gICAgfSxcclxuICAgIE9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJVSUQ9VUlEO1xyXG4gICAgfSxcclxuICAgIE9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVST1uYW1lO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb249bmFtZTtcclxuICAgICAgIFxyXG4gICAgfSxcclxuICAgIE9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVST1uYW1lO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lPW5hbWU7XHJcbiAgICB9LFxyXG4gICAgUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlTGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVST1cIlwiO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJPVwiXCI7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5ub25lO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWQ7XHJcbiAgICB9LFxyXG4gICAgT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJyaWNrQW5kTW9ydGFyTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmFjdGl2ZT10cnVlO1xyXG5cclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyO1xyXG4gICAgfSxcclxuICAgIE9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGFtb3VudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmc9XCIkXCIrYW1vdW50O1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9YW1vdW50O1xyXG4gICAgfSxcclxuICAgIENhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihhbW91bnQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9sb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4PTA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZihQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKF9sb2FuVGFrZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgdGFrZW4gbG9hbiBvZiAkXCIrUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA+PWFtb3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkbyBub3QgbmVlZCBsb2FuLCB5b3UgaGF2ZSBlbm91Z2ggY2FzaCB0byBidXkgY3VycmVudCBzZWxlY3RlZCBidXNpbmVzcy5cIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVxdWlyZWRDYXNoPU1hdGguYWJzKHBhcnNlSW50KFBsYXllckRhdGFJbnRhbmNlLkNhc2gpLWFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCIkXCIrUmVxdWlyZWRDYXNoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCg1MDAwMCk7XHJcbiAgICAgICAgfWVsc2UgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBzZWxlY3QgYnVzaW5lc3MgYmV0d2VlbiBIb21lIEJhc2VkIGFuZCBicmljayAmIG1vcnRhci4gXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIE9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmU9ZmFsc2U7ICBcclxuICAgIH0sXHJcbiAgICBIaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbC5sZW5ndGg7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoaW5kZXg9PWkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLk90aGVyO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDApO1xyXG5cclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzAyX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLlRlblRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uVGVudHlUaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzA0X0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLlRoaXJ0eVRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gICAgfSxcclxuICAgIE9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihldmVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQ9TG9hbkFtb3VudEVudW0uRm9ydHlUaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzA2X0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLkZpZnR5VGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgICB9LFxyXG4gICAgT25UYWtlbkxvYW5DbGlja2VkX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PT1Mb2FuQW1vdW50RW51bS5PdGhlcilcclxuICAgICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50PVJlcXVpcmVkQ2FzaDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudD1wYXJzZUludCh0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQpO1xyXG5cclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgIHRoaXMuT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaCtQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YTpmdW5jdGlvbihfZGF0YSxfSUQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX0lEIT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuYWN0b3JOcilcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goX2RhdGEpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG5cclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoPj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLHRydWUsdHJ1ZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyx0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlPXRydWU7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUHVyY2hhc2VCdXNpbmVzczpmdW5jdGlvbihfYW1vdW50LF9idXNpbmVzc05hbWUsX2lzSG9tZUJhc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGlmKFBsYXllckRhdGFJbnRhbmNlLkNhc2g8X2Ftb3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBub3QgZW5vdWdoIGNhc2ggdG8gYnV5IHRoaXMgXCIrX2J1c2luZXNzTmFtZStcIiBidXNpbmVzcy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoX2lzSG9tZUJhc2VkKVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBpZihQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQ8MylcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1QbGF5ZXJEYXRhSW50YW5jZS5DYXNoLV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZz1cIiRcIitQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0R2FtZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRHYW1lPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBIb21lIGJhc2VkIGJ1c2luZXNzZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1QbGF5ZXJEYXRhSW50YW5jZS5DYXNoLV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nPVwiJFwiK1BsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFydEdhbWU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ccmlja0FuZE1vcnRhckFtb3VudCsrO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0X0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAvL3NldHRpbmcgcGxheWVyIGN1cnJlbnQgZGF0YSBpbiBjdXN0b20gcHJvcGVydGllcyB3aGVuIGhpcy9oZXIgdHVybiBvdmVyc1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIFBsYXllckRhdGFJbnRhbmNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEsUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBdPVBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwPS0xO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBQYXlBbW91bnRUb1BsYXlHYW1lOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZT1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbj09XCJcIilcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyB0eXBlLlwiKTtcclxuICAgICAgICBlbHNlIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lPT1cIlwiKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIG5hbWUuXCIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZCkgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBob21lYmFzc2VkXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoMTAwMDAsXCJob21lXCIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXIpIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDUwMDAwLFwiYnJpY2sgYW5kIG1vcnRhclwiLGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5TdGFydEdhbWU9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwIT0tMSkgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIG5vdCBiZWVuIGNhbGxlZCBmcm9tIGluc2lkZSBnYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgICAgIGVsc2UgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgICAgICAgICAgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgICAgICAgICAgLy9wcnRpbnRpbmcgYWxsIHZhbHVlcyB0byBjb25zb2xlXHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG5hbWU6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIElEOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXMgcGxheWVyIGJvdDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLklzQm90KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gb2YgYnVzaW5lc3Mgb2YgcGxheWVyIChzZWUgYmVsb3cpOiBcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNhc2g6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5DYXNoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIHRha2VuIGxvYW46IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuVGFrZW4pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YWtlbiBsb2FuIGFtb3VudDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24gVHVybkRlY2lzaW9uU2V0dXBVSVxyXG4gICAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGlzYWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmU9aXNhY3RpdmU7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbjpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkNhc2hBbW91bnRMYWJlbC5zdHJpbmc9XCIkIFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXS5DYXNoO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQ9YW1vdW50O1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZihUZW1wTWFya2V0aW5nQW1vdW50PT1cIlwiIHx8IFRlbXBNYXJrZXRpbmdBbW91bnQ9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2V0aW5nQW1vdW50PXBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD49IHRoaXMubWFya2V0aW5nQW1vdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCt0aGlzLm1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IHN1Y2Nlc3NmdWxseSBtYXJrZXRlZCBhbW91bnQgb2YgJFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCtcIiAsIHJlbWFpbmluZyBjYXNoIGlzICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoK1wiLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudD1cIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBcclxuXHJcbiAgICBPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gaWYgcGxheWVyIGhhcyBtb3JlIHRoYW4gNTAwMCRcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBhbHJlYWR5IGhpcmVkIGEgbGF3eWVyLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj01MDAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzPXRydWU7XHJcbiAgICAgICAgICAgIFRlbXBIaXJpbmdMYXd5ZXI9dHJ1ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coVGVtcEhpcmluZ0xhd3llcik7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC01MDAwO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llciwgcmVtYWluaW5nIGNhc2ggaXMgJFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grXCIuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIG9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oX25hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgTG9jYXRpb25OYW1lPV9uYW1lO1xyXG4gICAgfSxcclxuICAgIE9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2lmIHBsYXllciBoYXMgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBoZSBjb3VsZCBleHBhbmQgaXRcclxuICAgICAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzc1wiKTtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHZhciBnZW5lcmF0ZWRMZW5ndGg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgaWYoZ2VuZXJhdGVkTGVuZ3RoPT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBubyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIHRvIGV4cGFuZC5cIiwxNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfSwgMTYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIExvY2F0aW9uTmFtZT1cIlwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzIGV4aXQgY2FsbGVkXCIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydGluZyBuZXcgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgdGhpcy5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgICAgIEdvbGRDYXNoQW1vdW50PWFtb3VudDtcclxuICAgIH0sIFxyXG5cclxuICAgIE9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKEdvbGRDYXNoQW1vdW50PT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXNldEdvbGRJbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBjYXNoIGFtb3VudCB0byBpbnZlc3QgaW4gR09MRC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLkdvbGRJbnZlc3Q7XHJcbiAgICAgICAgICAgIERpY2VSZXN1bHQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgICAgICAgXCJJbnZlc3QgSW4gR09MRFwiLFxyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgICAgICAgIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIvb3VuY2VcIixcclxuICAgICAgICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIqMD0wXCIsXHJcbiAgICAgICAgICAgICAgICBcIkJVWVwiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBTdG9ja0J1c2luZXNzTmFtZT1uYW1lO1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBpZihTdG9ja0J1c2luZXNzTmFtZT09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9SW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgIE9uY2VPclNoYXJlPShEaWNlUmVzdWx0KjEwMDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICAgICAgICBcIkludmVzdCBpbiBTdG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgICAgICAgIFwiRWFjaCBTaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIixcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiL3NoYXJlXCIsXHJcbiAgICAgICAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIqMD0wXCIsXHJcbiAgICAgICAgICAgICAgICBcIkJVWVwiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIE9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgICAgICBEaWNlUmVzdWx0PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgT25jZU9yU2hhcmU9KERpY2VSZXN1bHQqMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgICAgICAgIFwiU2VsbCBHT0xEXCIsXHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIi9vdW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiKjA9MFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgR09MRCBvdW5jZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9SW52ZXN0RW51bS5TdG9ja1NlbGw7XHJcbiAgICAgICAgICAgIERpY2VSZXN1bHQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgICAgICAgXCJTZWxsIFNUT0NLXCIsXHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgXCJFYWNoIHNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIvc2hhcmVcIixcclxuICAgICAgICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gU0VMTFwiLFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiKjA9MFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgc2hhcmVzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ28gaW50byBwYXJ0bmVyIHNoaXBcIik7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ3b3JrIGluIHByb2dyZXNzLCBjb21pbmcgc29vbi4uLlwiKTtcclxuICAgIH0sIFxyXG5cclxuICAgIE9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbihmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxEaWNlKCk7XHJcbiAgICB9LCBcclxuXHJcbiAgICBQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICAgIH0sIFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuXHJcbiAgICAvLyNyZWdpb24gSW52ZXN0IGFuZCBzZWxsIG1vZGR1bGVcclxuXHJcbiAgICBSZXNldEdvbGRJbnB1dCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkdvbGRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgIEdvbGRDYXNoQW1vdW50PVwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlN0b2NrRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICBTdG9ja0J1c2luZXNzTmFtZT1cIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbChfYW1vdW50KVxyXG4gICAge1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1fYW1vdW50O1xyXG5cclxuICAgICAgICBpZihFbnRlckJ1eVNlbGxBbW91bnQ9PVwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgIHZhciBfYW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlK1wiKlwiK0VudGVyQnV5U2VsbEFtb3VudCtcIj1cIitfYW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIHRoaXMuUmVzZXRHb2xkSW5wdXQoKTtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBBc3NpZ25EYXRhX0ludmVzdFNlbGwoX3RpdGxlLF9kaWNlUmVzdWx0LF9wcmljZVRpdGxlLF9wcmljZVZhbHVlLF9idXlPclNlbGxUaXRsZSxfdG90YWxBbW91bnRUaXRsZSxfdG90YWxBbW91bnRWYWx1ZSxfYnV0dG9uTmFtZSxfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1fdGl0bGU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlUmVzdWx0O1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VUaXRsZUxhYmVsLnN0cmluZz1fcHJpY2VUaXRsZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVmFsdWVMYWJlbC5zdHJpbmc9X3ByaWNlVmFsdWU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXlPclNlbGxUaXRsZUxhYmVsLnN0cmluZz1fYnV5T3JTZWxsVGl0bGU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFRpdGxlTGFiZWwuc3RyaW5nPV90b3RhbEFtb3VudFRpdGxlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZz1fdG90YWxBbW91bnRWYWx1ZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1dHRvbk5hbWVMYWJlbC5zdHJpbmc9X2J1dHRvbk5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZURhdGFfSW52ZXN0U2VsbChfdG90YWxBbW91bnRWYWx1ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmc9X3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIEFwcGx5QnV0dG9uX0ludmVzdFNlbGwoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEVudGVyQnV5U2VsbEFtb3VudD09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9PUludmVzdEVudW0uR29sZEludmVzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBfVG90YWxBbW91bnQ9T25jZU9yU2hhcmUqX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgIGlmKF9Ub3RhbEFtb3VudDw9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLV9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCtfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIitfYW1vdW50K1wiIG91bmNlcyBvZiBHT0xEXCIsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqMD0wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9PUludmVzdEVudW0uR29sZFNlbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICBpZihfYW1vdW50PD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudC1fYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIrX2Ftb3VudCtcIiBvdW5jZXMgb2YgR09MRCBmb3IgICRcIitfVG90YWxBbW91bnQsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqMD0wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBHT0xEIG91bmNlcywgeW91IG93biBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQrXCIgb2YgR09MRCBvdW5jZXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPT1JbnZlc3RFbnVtLlN0b2NrSW52ZXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD1wYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgaWYoX1RvdGFsQW1vdW50PD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQrX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAvL2NhbiBhZGQgbXVsdGlwbGUgc3RvY2tzIHdpdGggYnVzaW5lc3MgbmFtZSBpbiBvYmplY3QgaWYgcmVxdWlyZWRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiK19hbW91bnQrXCIgc2hhcmVzIG9mIGJ1c2luZXNzIFwiK1N0b2NrQnVzaW5lc3NOYW1lLDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqMD0wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9PUludmVzdEVudW0uU3RvY2tTZWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD1wYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihfYW1vdW50PD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfVG90YWxBbW91bnQ9T25jZU9yU2hhcmUqX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoK19Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50LV9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIrX2Ftb3VudCtcIiBzaGFyZXMgb2Ygc3RvY2sgZm9yICAkXCIrX1RvdGFsQW1vdW50LDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqMD0wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudD1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBzdG9ja3Mgc2hhcmVzLCB5b3Ugb3duIFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQrXCIgb2Ygc3RvY2sgc2hhcmVzXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0QnV0dG9uX0ludmVzdFNlbGwoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgXHJcbiAgIFxyXG4gICAgLy8jcmVnaW9uIFBheWRheSBvciBEb3VibGUgcGF5IERheVxyXG4gICAgVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LEJNQW1vdW50LGxvYW5UYWtlbilcclxuICAgIHtcclxuICAgICAgICBpZihITUFtb3VudD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPXRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihCTUFtb3VudD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFsb2FuVGFrZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2FuUGF5ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2FuUGF5ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLF9pc0RvdWJsZVBheURheT1mYWxzZSxfc2tpcEhNPWZhbHNlLF9za2lwQk09ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5PV9pc0RvdWJsZVBheURheTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nPV90aXRsZTtcclxuXHJcbiAgICAgICAgdmFyIF90aW1lPTE4MDA7XHJcblxyXG4gICAgICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICAgICAgaWYoX3NraXBITSAmJiBfc2tpcEJNKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZihfc2tpcEhNKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLF90aW1lKTtcclxuICAgICAgICBlbHNlIGlmKF9za2lwQk0pXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLF90aW1lKTtcclxuXHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB2YXIgSE1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIF9sb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4PTA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsb2FuVGFrZW49X2xvYW5UYWtlbjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkTnVtYmVyTGFiZWwuc3RyaW5nPUhNQW1vdW50O1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZz1CTUFtb3VudDtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMb2NhdGlvbkxhYmVsLnN0cmluZz1CTUxvY2F0aW9ucztcclxuXHJcbiAgICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgICBpZihfc2tpcEhNICYmIF9za2lwQk0pXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCwwLGxvYW5UYWtlbik7XHJcbiAgICAgICAgZWxzZSBpZihfc2tpcEhNKVxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsQk1BbW91bnQsbG9hblRha2VuKTtcclxuICAgICAgICBlbHNlIGlmKF9za2lwQk0pXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsMCxsb2FuVGFrZW4pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCxCTUFtb3VudCxsb2FuVGFrZW4pO1xyXG5cclxuICAgICAgICBpZihfc2tpcEJNIHx8IF9za2lwSE0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgIH0sIChfdGltZSsyMDApKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICBpZighSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmc9XCJQYXlEYXlcIjtcclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmc9XCJEb3VibGVQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG5cclxuICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgdmFyIEhNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICB2YXIgX2RpY2U9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcblxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICBUb3RhbFBheURheUFtb3VudD0oSE1BbW91bnQqX2RpY2UpKjEwMDA7XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgVG90YWxQYXlEYXlBbW91bnQ9MiooSE1BbW91bnQqX2RpY2UpKjEwMDA7XHJcblxyXG5cclxuICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZz1fZGljZTtcclxuICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZz1ITUFtb3VudDtcclxuXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZz1fZGljZStcIipcIitITUFtb3VudCtcIipcIitcIjEwMDA9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK0hNQW1vdW50K1wiKlwiK1wiMTAwMCoyPVwiK1RvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAge1xyXG4gICAgICAgIGlmKCFCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmc9XCJQYXlEYXlcIjtcclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmc9XCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcblxyXG4gICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgdmFyIEJNTG9jYXRpb25zPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICB2YXIgX2Ftb3VudD1CTUFtb3VudCtCTUxvY2F0aW9ucztcclxuICAgICAgICAgICB2YXIgX2RpY2U9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICBUb3RhbFBheURheUFtb3VudD0oX2Ftb3VudCpfZGljZSkqMjAwMDtcclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBUb3RhbFBheURheUFtb3VudD0yKihfYW1vdW50Kl9kaWNlKSoyMDAwO1xyXG5cclxuICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZz1fZGljZTtcclxuICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZz1fYW1vdW50O1xyXG5cclxuICAgICAgICAgICBpZighRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK19hbW91bnQrXCIqXCIrXCIyMDAwPVwiK1RvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZz1fZGljZStcIipcIitfYW1vdW50K1wiKlwiK1wiMjAwMCoyPVwiK1RvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCkgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUxvYW5QYXllZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIExvYW5QYXllZD10cnVlOyBcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj01MDAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtNTAwMDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9idXNpbmVzc0luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQtNTAwMDtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDw9MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCkgLy9hbGxcclxuICAgIHtcclxuICAgICAgICB2YXIgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIkFtb3VudCAkXCIrVG90YWxQYXlEYXlBbW91bnQrXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDE1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgfSwgMTU1MCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFBheURheUNvbXBsZXRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCAmJiBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgJiYgTG9hblBheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBwYXlkYXkgZG9uZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBTaG93VG9hc3Q6ZnVuY3Rpb24obWVzc2FnZSx0aW1lPTIyNTApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSS5jaGlsZHJlblsyXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1tZXNzYWdlO1xyXG4gICAgICAgIHZhciBTZWxmVG9hc3Q9dGhpcztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmU9ZmFsc2U7IH0sIHRpbWUpO1xyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=