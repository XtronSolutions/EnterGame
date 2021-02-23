
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/DecksData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '58172YL+tVMTY9FLVSAy/Ur', 'DecksData');
// Script/DecksData.js

"use strict";

var GamePlayReferenceManager = null;
var LossesData = null;
var MarketingData = null;
var WildCardData = null;
var BigBusinessData = null;
var TimeoutRef;
var CompletionWindowTime = 8000;
var LongMessageTime = 5000; // var CompletionWindowTime = 500;//8000
// var LongMessageTime = 250;//5000
//-------------------------------------------Spaces Data-------------------------//

var EnumSpaceType = cc.Enum({
  None: 0,
  WildCard: 1,
  BigBusiness: 2,
  Marketing: 3,
  Invest: 4,
  Losses: 5,
  PayDay: 6,
  DoublePayDay: 7,
  OneQuestion: 8,
  Sell: 9,
  BuyOrSell: 10,
  GoBackSpaces: 11
}); //-------------------------------------------class for card data-------------------------//

var CardData = cc.Class({
  name: "CardData",
  properties: {
    ID: {
      displayName: "ID",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Id of the card"
    },
    Description: {
      displayName: "Description",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "description of the card"
    },
    HasButton: {
      displayName: "HasButton",
      type: cc["boolean"],
      "default": false,
      serializable: true,
      tooltip: "if this card should have interaction button"
    },
    HasTwoButtons: {
      displayName: "HasTwoButtons",
      type: cc["boolean"],
      "default": false,
      serializable: true,
      tooltip: "if this card should have two interaction button"
    },
    HasThreeButtons: {
      displayName: "HasThreeButtons",
      type: cc["boolean"],
      "default": false,
      serializable: true,
      tooltip: "if this card should have three interaction button"
    },
    ButtonName: {
      displayName: "ButtonName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "button name to show on screen"
    },
    SecondButtonName: {
      displayName: "SecondButtonName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Second button name to show on screen"
    },
    ThirdButtonName: {
      displayName: "SecondButtonName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Second button name to show on screen"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for card UI-------------------------//

var CardUI = cc.Class({
  name: "CardUI",
  properties: {
    ToastNode: {
      displayName: "ToastNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "node reference for toast node"
    },
    ToastLabel: {
      displayName: "ToastLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "label reference for toast node"
    },
    ButtonNode: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Button reference for node"
    },
    InteractionButtonNode: {
      displayName: "InteractionButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "interaction Button reference for node"
    },
    InteractionTwoButtonsNode: {
      displayName: "InteractionTwoButtonsNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "two interaction Button reference for node"
    },
    InteractionThreeButtonsNode: {
      displayName: "InteractionThreeButtonsNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "three interaction Button reference for node"
    },
    CompletionToastNode: {
      displayName: "CompletionToastNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "node reference for compleion toast node"
    },
    CompletionToastLabel: {
      displayName: "CompletionToastLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "label reference for compleion toast node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for decks Data-------------------------//

var DecksData = cc.Class({
  name: "DecksData",
  "extends": cc.Component,
  properties: {
    MainUI: {
      displayName: "MainUI",
      "default": null,
      type: CardUI,
      serializable: true,
      tooltip: "UI of decks"
    },
    BigBusiness: {
      displayName: "BigBusiness",
      type: [CardData],
      "default": [],
      serializable: true,
      tooltip: "all cards data for big business"
    },
    Marketing: {
      displayName: "Marketing",
      type: [CardData],
      "default": [],
      serializable: true,
      tooltip: "all cards data for marketing"
    },
    Losses: {
      displayName: "Losses",
      type: [CardData],
      "default": [],
      serializable: true,
      tooltip: "all cards data for losses"
    },
    WildCards: {
      displayName: "WildCards",
      type: [CardData],
      "default": [],
      serializable: true,
      tooltip: "all cards data for WildCards"
    },
    SpacesType: {
      type: EnumSpaceType,
      "default": EnumSpaceType.None,
      serializable: true,
      tooltip: "states machines by type of card or spaces on board"
    }
  },
  ResetAllData: function ResetAllData() {
    GamePlayReferenceManager = null;
    LossesData = null;
    MarketingData = null;
    WildCardData = null;
    BigBusinessData = null;
    TimeoutRef = null;
  },
  onLoad: function onLoad() {
    this.ResetAllData();
    this.CheckReferences();
    this.SelectedCardIndex = -1;
    this.CardSelected = -1;
    this.IsBotTurn = false;
    this.isOwner = false; //this.BigBusinessCardFunctionality("1");
    //for testing
    // this.Counter=0;
    // this.GenerateRandomBigBusinessCard(this.Counter);
  },
  onEnable: function onEnable() {
    //events subscription to be called
    cc.systemEvent.on("ShowCard", this.ShowCardInfo, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off("ShowCard", this.ShowCardInfo, this);
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },
  ToggleButtons: function ToggleButtons(_isOwner, _hasButton, _isBot, _hasTwoButton) {
    var _this = this;

    if (_hasButton === void 0) {
      _hasButton = false;
    }

    if (_isBot === void 0) {
      _isBot = false;
    }

    if (_hasTwoButton === void 0) {
      _hasTwoButton = false;
    }

    if (_isOwner && _hasButton) {
      this.MainUI.ButtonNode.active = false;
      this.MainUI.InteractionButtonNode.active = true;
      if (_hasTwoButton) this.MainUI.InteractionTwoButtonsNode.active = true;else this.MainUI.InteractionTwoButtonsNode.active = false;
    } else if (_isOwner && !_hasButton) {
      this.MainUI.ButtonNode.active = true;
      this.MainUI.InteractionButtonNode.active = false;
      this.MainUI.InteractionTwoButtonsNode.active = false;
    } else {
      this.MainUI.InteractionButtonNode.active = false;
      this.MainUI.ButtonNode.active = false;
      this.MainUI.InteractionTwoButtonsNode.active = false;

      if (_isBot == false) {
        setTimeout(function () {
          _this.ExitCardInfo();
        }, 3200);
      }
    }
  },
  GenerateRandomBigBusinessCard: function GenerateRandomBigBusinessCard(_isOwner, _randomValue, _isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    BigBusinessData = null;
    this.IsBotTurn = _isBot;
    this.SpacesType = EnumSpaceType.BigBusiness;
    this.isOwner = _isOwner;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.BigBusiness[this.SelectedCardIndex].ID;
    if (this.BigBusiness[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.BigBusiness[this.SelectedCardIndex].ButtonName;
    if (this.BigBusiness[this.SelectedCardIndex].HasTwoButtons) this.MainUI.InteractionTwoButtonsNode.children[0].children[0].getComponent(cc.Label).string = this.BigBusiness[this.SelectedCardIndex].SecondButtonName;
    this.ShowCardInfo(this.BigBusiness[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.BigBusiness[this.SelectedCardIndex].HasButton, _isBot, this.BigBusiness[this.SelectedCardIndex].HasTwoButtons);

    if (_isBot) {
      this.CardFuntionalityButton();
    }
  },
  GenerateRandomMarketingCard: function GenerateRandomMarketingCard(_isOwner, _randomValue, _isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    MarketingData = null;
    this.IsBotTurn = _isBot;
    this.SpacesType = EnumSpaceType.Marketing;
    this.isOwner = _isOwner;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.Marketing[this.SelectedCardIndex].ID;
    if (this.Marketing[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.Marketing[this.SelectedCardIndex].ButtonName;
    if (this.Marketing[this.SelectedCardIndex].HasTwoButtons) this.MainUI.InteractionTwoButtonsNode.children[0].children[0].getComponent(cc.Label).string = this.Marketing[this.SelectedCardIndex].SecondButtonName;
    this.ShowCardInfo(this.Marketing[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.Marketing[this.SelectedCardIndex].HasButton, _isBot, this.Marketing[this.SelectedCardIndex].HasTwoButtons);

    if (_isBot) {
      this.CardFuntionalityButton();
    }
  },
  GenerateRandomLossesCard: function GenerateRandomLossesCard(_isOwner, _randomValue, _isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    LossesData = null;
    this.IsBotTurn = _isBot;
    this.isOwner = _isOwner;
    this.SpacesType = EnumSpaceType.Losses;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.Losses[this.SelectedCardIndex].ID;
    this.ShowCardInfo(this.Losses[this.SelectedCardIndex].Description, true);
    if (this.Losses[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.Losses[this.SelectedCardIndex].ButtonName;
    if (this.Losses[this.SelectedCardIndex].HasTwoButtons) this.MainUI.InteractionTwoButtonsNode.children[0].children[0].getComponent(cc.Label).string = this.Losses[this.SelectedCardIndex].SecondButtonName;
    this.ToggleButtons(_isOwner, this.Losses[this.SelectedCardIndex].HasButton, _isBot, this.Losses[this.SelectedCardIndex].HasTwoButtons);

    if (_isBot) {
      this.CardFuntionalityButton();
    }
  },
  GenerateRandomWildCard: function GenerateRandomWildCard(_isOwner, _randomValue, _isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    WildCardData = null;
    this.IsBotTurn = _isBot;
    this.SpacesType = EnumSpaceType.WildCard;
    this.SelectedCardIndex = _randomValue;
    this.isOwner = _isOwner;
    this.CardSelected = this.WildCards[this.SelectedCardIndex].ID;
    if (this.WildCards[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.WildCards[this.SelectedCardIndex].ButtonName;
    if (this.WildCards[this.SelectedCardIndex].HasTwoButtons) this.MainUI.InteractionTwoButtonsNode.children[0].children[0].getComponent(cc.Label).string = this.WildCards[this.SelectedCardIndex].SecondButtonName;
    this.ShowCardInfo(this.WildCards[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.WildCards[this.SelectedCardIndex].HasButton, _isBot, this.WildCards[this.SelectedCardIndex].HasTwoButtons);

    if (_isBot) {
      this.CardFuntionalityButton();
    }
  },
  SpaceInvest: function SpaceInvest(_isOwner, _index, _isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    this.IsBotTurn = _isBot;
    this.isOwner = _isOwner;
    this.SpacesType = EnumSpaceType.Invest;
    this.ShowCardInfo("You can invest one more time in Gold or stocks this turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Execute";
    this.ToggleButtons(_isOwner, true, _isBot);

    if (_isBot) {
      this.CompleteTurnWithToast("msg", 2100);
    }
  },
  SpacePayDay: function SpacePayDay(_isOwner, _index) {
    this.ShowCardInfo("You have landed on PayDay space.", true);
    this.PayDayFunctionality();
    this.ToggleButtons(_isOwner, false);
  },
  SpaceDoublePayDay: function SpaceDoublePayDay(_isOwner, _index) {
    this.ShowCardInfo("You have landed on DoublePayDay space.", true);
    this.DoublePayDayFunctionality();
    this.ToggleButtons(_isOwner, false);
  },
  SpaceOneQuestion: function SpaceOneQuestion(_isOwner, _index, _isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    this.IsBotTurn = _isBot;
    this.isOwner = _isOwner;
    this.SpacesType = EnumSpaceType.OneQuestion;
    this.ShowCardInfo("You can ask one question to any other player, if player is unable to answer they will pay you some cash amount.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Execute";
    this.ToggleButtons(_isOwner, true, _isBot);

    if (_isBot) {
      this.CompleteTurnWithToast("msg", 2100);
    }
  },
  SpaceSell: function SpaceSell(_isOwner, _index, _isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    this.IsBotTurn = _isBot;
    this.isOwner = _isOwner;
    this.SpacesType = EnumSpaceType.Sell;
    this.ShowCardInfo("You can sell any one of your business or can skip turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Execute";
    this.ToggleButtons(_isOwner, true, _isBot);

    if (_isBot) {
      this.CompleteTurnWithToast("msg", 2100);
    }
  },
  SpaceBuyOrSell: function SpaceBuyOrSell(_isOwner, _index, _isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    this.IsBotTurn = _isBot;
    this.isOwner = _isOwner;
    this.SpacesType = EnumSpaceType.BuyOrSell;
    this.ShowCardInfo("You can Buy or sell Gold or stocks one more time in this turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Execute";
    this.ToggleButtons(_isOwner, true, _isBot);

    if (_isBot) {
      this.CompleteTurnWithToast("msg", 2100);
    }
  },
  SpaceGoBackSpaces: function SpaceGoBackSpaces(_isOwner, _index, _isBot) {
    var _this2 = this;

    if (_isBot === void 0) {
      _isBot = false;
    }

    this.IsBotTurn = _isBot;
    this.isOwner = _isOwner;
    this.SpacesType = EnumSpaceType.GoBackSpaces;
    this.ShowCardInfo("you will have to go back 3 spaces.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Execute";
    this.ToggleButtons(_isOwner, true, _isBot);

    if (_isBot) {
      setTimeout(function () {
        _this2.CardFuntionalityButton();
      }, 1000);
    }
  },
  ShowCardInfo: function ShowCardInfo(message, _state) {
    if (_state) {
      this.MainUI.ToastNode.active = true;
      this.MainUI.ToastLabel.string = message;
    } else {
      this.MainUI.ToastLabel.string = "";
      this.MainUI.ToastNode.active = false;
    }
  },
  ExitCardInfo: function ExitCardInfo() {
    this.ShowCardInfo("", false);
    GamePlayReferenceManager.Instance.Get_GameManager().ResetCardDisplay();
    GamePlayReferenceManager.Instance.Get_GameManager().RaiseEventTurnComplete(); //for testing
    // this.Counter++;
    // this.GenerateRandomBigBusinessCard(this.Counter);
  },
  TwoButtonsFunctionality: function TwoButtonsFunctionality() {
    this.CardFuntionalityButton(null, 1);
  },
  CardFuntionalityButton: function CardFuntionalityButton(event, _type) {
    if (event === void 0) {
      event = null;
    }

    if (_type === void 0) {
      _type = 0;
    }

    if (this.SpacesType == EnumSpaceType.BigBusiness) {
      if (BigBusinessData == null) this.BigBusinessCardFunctionality(this.CardSelected, true, _type);else this.BigBusinessCardFunctionality(this.CardSelected, false, _type);
    } else if (this.SpacesType == EnumSpaceType.Losses) {
      if (LossesData == null) this.LossesCardFunctionality(this.CardSelected, true, _type);else this.LossesCardFunctionality(this.CardSelected, false, _type);
    } else if (this.SpacesType == EnumSpaceType.Marketing) {
      if (MarketingData == null) this.MarketingCardFunctionality(this.CardSelected, true, _type);else this.MarketingCardFunctionality(this.CardSelected, false, _type);
    } else if (this.SpacesType == EnumSpaceType.WildCard) {
      if (WildCardData == null) this.WildCardFunctionality(this.CardSelected, true, _type);else this.WildCardFunctionality(this.CardSelected, false, _type);
    } else if (this.SpacesType == EnumSpaceType.Sell) {
      this.SellFunctionality();
    } else if (this.SpacesType == EnumSpaceType.Invest) {
      this.InvestFunctionality();
    } else if (this.SpacesType == EnumSpaceType.BuyOrSell) {
      this.BuyOrSellFunctionality();
    } else if (this.SpacesType == EnumSpaceType.OneQuestion) {
      this.OneQuestionFunctionality();
    } else if (this.SpacesType == EnumSpaceType.GoBackSpaces) {
      this.GoBackFunctionality();
    }
  },
  CheckLoan: function CheckLoan() {
    var _loanTaken = false;
    var _businessIndex = 0;

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    for (var index = 0; index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    var val = -1;
    val = _loanTaken == true ? 1 : 0;
    var Result = cc.v2(val, _businessIndex);
    return Result;
  },
  DoneButtonClicked: function DoneButtonClicked() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    this.ShowCardInfo("", false);

    _manager.ResetCardDisplay();

    _manager.RaiseEventTurnComplete();

    clearTimeout(TimeoutRef);
    this.CompletionWindow("", false, this.isOwner, false);
    console.error("done clicked");
  },
  CompletionWindow: function CompletionWindow(message, _state, _isOwner, _isBot) {
    var _this3 = this;

    if (!_isBot) {
      if (_state) {
        this.MainUI.CompletionToastNode.active = true;
        this.MainUI.CompletionToastLabel.string = message;

        if (_isOwner) {
          clearTimeout(TimeoutRef);
          TimeoutRef = setTimeout(function () {
            _this3.DoneButtonClicked();
          }, CompletionWindowTime);
        }
      } else {
        this.MainUI.CompletionToastLabel.string = "";
        this.MainUI.CompletionToastNode.active = false;
      }
    } else {
      this.MainUI.CompletionToastLabel.string = "";
      this.MainUI.CompletionToastNode.active = false;
    }
  },
  CompleteTurnWithToast: function CompleteTurnWithToast(_msg, _time, _changeTurn) {
    var _this4 = this;

    if (_changeTurn === void 0) {
      _changeTurn = true;
    }

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    if (this.IsBotTurn) {
      this.CompletionWindow("", false, false, true);
      console.log(_msg);

      var _delay = this.getRandom(LongMessageTime, LongMessageTime + 2000);

      setTimeout(function () {
        _this4.ShowCardInfo("", false);

        _manager.ResetCardDisplay();

        _manager.RaiseEventTurnComplete();
      }, _delay);
    } else {
      if (_msg != "" && !_changeTurn) {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_msg, LongMessageTime, this.isOwner);
      }

      this.ShowCardInfo("", false);

      if (_changeTurn) {
        if (this.isOwner) {
          this.CompletionWindow(_msg, true, true, this.IsBotTurn);
        } else {
          setTimeout(function () {
            _this4.ShowCardInfo("", false);

            _manager.ResetCardDisplay();

            _manager.RaiseEventTurnComplete();
          }, LongMessageTime);
        }
      }
    }
  },
  AssignSecondScreenData: function AssignSecondScreenData(_isBot, _isOwner, _hasButton, _msg, _LabelRef, _buttonName) {
    var _this5 = this;

    if (!_isBot) {
      this.ShowCardInfo(_msg, true);
      _LabelRef.getComponent(cc.Label).string = _buttonName;
      this.ToggleButtons(_isOwner, _hasButton, _isBot);

      if (_isOwner) {
        setTimeout(function () {
          _this5.DoneButtonClicked();
        }, 15000);
      }
    } else {
      this.CardFuntionalityButton();
    }
  },
  BigBusinessCardFunctionality: function BigBusinessCardFunctionality(_id, _hasTwoScreens, _type) {
    var _this6 = this;

    if (_hasTwoScreens === void 0) {
      _hasTwoScreens = false;
    }

    if (_type === void 0) {
      _type = 0;
    }

    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //receive 20000$ gift to payoff loan
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _result = this.CheckLoan();

        var IsLoanTaken = _result.x;
        var _businessIndex = _result.y;
        BigBusinessData = null;

        if (IsLoanTaken == 1) {
          //means user has taken loan
          _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount - 20000;

          if (_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount <= 0) {
            _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = 0;
            _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanTaken = false;
          }

          _cardInfo = "Loan amount of $20000 has been payed off.";
        } else {
          _cardInfo = "You have not taken any loan, turn will skip now.";
        }

        this.CompleteTurnWithToast(_cardInfo, 5000, true);
        break;

      case "2":
        //hire lawyer
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _cardInfo = "";
        BigBusinessData = null;

        if (_manager.PlayerGameInfo[_playerIndex].LawyerStatus) {
          _cardInfo = "You have already hired laywer, turn will skip now.";
        } else {
          _manager.PlayerGameInfo[_playerIndex].LawyerStatus = true;
          _cardInfo = "You have successfully hired a lawyer.";
        }

        this.CompleteTurnWithToast(_cardInfo, 5000, true);
        break;

      case "3":
        //You do a Trade Show for one of your businesses and get some new clients. Choose one of your businesses and roll a PayDay roll right now.
        console.log(this.BigBusiness[Index].Description);
        BigBusinessData = null;

        if (!this.IsBotTurn) {
          this.ShowCardInfo("", false);
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableManipilationScreen__BusinessManipulationUISetup(true);
        } else {
          setTimeout(function () {
            _this6.ShowCardInfo("", false);
          }, 2400);
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableManipilationScreen__BusinessManipulationUISetup(true, true);
        }

        break;

      case "4":
        //A friend gives you a suggestion on a stock to buy. Place your investment amount on the table and roll. The result, multiplied by $1,000, is the amount of each share of stock. You can buy this stock now if you would like.
        console.log(this.BigBusiness[Index].Description);
        BigBusinessData = null;

        if (!this.IsBotTurn) {
          this.ShowCardInfo("", false);
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().OnStockDiceClicked_TurnDecision(null, true);
        } else {
          this.CompleteTurnWithToast("", 1200);
        }

        break;

      case "5":
        //You reserve a private Yacht for a week long vacation. Roll both die, multiply the result by $3,000. Pay the Bank your vacation cost and lose your next turn basking in your private sun.
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _diceResult;

        var _multiplier = 3000;

        var _result;

        if (_hasTwoScreens) {
          _diceResult = _manager.RollTwoDices();
          _result = _multiplier * _diceResult;
          BigBusinessData = {
            Data: {
              result: _result,
              Dice: _diceResult
            }
          };

          if (!this.IsBotTurn) {
            this.ShowCardInfo("\n" + "Dice Roll Result : " + _diceResult + "\n" + "\n" + "Total Cost Calculated : " + _diceResult + " * " + _multiplier + " = $" + _result, true);
            this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          _diceResult = BigBusinessData.Data.Dice;
          _result = BigBusinessData.Data.result;

          if (_manager.PlayerGameInfo[_playerIndex].Cash >= _result) {
            _manager.PlayerGameInfo[_playerIndex].Cash -= _result;

            _manager.ToggleSkipNextTurn(true);

            this.CompleteTurnWithToast("Cost $" + _result + " has been successfully paid, you will also lose your next turn, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
            BigBusinessData = null;
          } else {
            console.log("not enough cash");

            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              console.log("its bot and has no cash,skipping");
              BigBusinessData = null;
              this.CompleteTurnWithToast("", 1200);
            }
          }
        }

        break;

      case "6":
        //Your parents give you $20,000 towards starting a new business or investing in your current business. Choose which and play according to the game rules.
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var CashGiven = 20000;
        BigBusinessData = null;

        if (!this.IsBotTurn) {
          if (_type == 0) {
            //start new business
            this.ShowCardInfo("", false);
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(false, true, 0, false, 0, true, CashGiven, false);
          } else if (_type == 1) {
            //invest in existing business
            this.ShowCardInfo("", false);
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().OnExpandButtonClicked_TurnDecision(null, true, CashGiven, false);
          }
        } else {
          console.log("is bot, so skipping turn");
          this.CompleteTurnWithToast("", 1200);
        }

        break;

      case "7":
        //You inherit a business from your Father. Decide the type of business it is, what the name of the business is, whether it is a home-based or brick & mortar business and include it into your game play. Pay a $20,000 transfer fee. If you do not have $20,000 in cash, you cannot have the business.
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var CashCost = 20000;
        BigBusinessData = null;

        if (!this.IsBotTurn) {
          if (_type == 0) {
            //pay amount
            if (_manager.PlayerGameInfo[_playerIndex].Cash >= CashCost) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= CashCost;
              this.ShowCardInfo("", false);
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(false, true, 0, false, 0, true, 0, true);
            } else {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Not enough cash.", 300, this.isOwner);
            }
          } else if (_type == 1) {
            //skip
            this.CompleteTurnWithToast("Skipping...", 1400);
          }
        } else {
          console.log("is bot, so skipping turn");
          this.CompleteTurnWithToast("", 1200);
        }

        break;

      case "8":
        //double pay day on next pay day
        BigBusinessData = null;
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleDoublePayNextTurn(true);

        this.CompleteTurnWithToast("You will receive double profits on next payday.", 1800);
        break;

      case "9":
        //You buy a television station and convince every player in the game to market on your station one time. You receive 50% of all the marketing dollars currently on the board. Round to the nearest $1,000 if needed.
        console.log(this.BigBusiness[Index].Description);
        BigBusinessData = null;

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _amount = 0;
        var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

        for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
          _amount = _amount + _manager.PlayerGameInfo[index].MarketingAmount;
        }

        _amount = _amount / 2;
        console.log("value: " + _amount);
        _amount = Math.round(_amount / 1000) * 1000;
        console.log("Rounded value: " + _amount);
        _manager.PlayerGameInfo[_playerIndex].Cash += _amount;

        if (mode == 2) {
          var _actorsArray = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

          var _data = null;

          for (var _index2 = 0; _index2 < _actorsArray.length; _index2++) {
            _data = _actorsArray[_index2].customProperties.PlayerSessionData;
            _data.MarketingAmount = Math.round(_data.MarketingAmount / 2);

            _actorsArray[_index2].setCustomProperty("PlayerSessionData", _data);
          }

          console.log(_actorsArray);
        } else {
          for (var _index3 = 0; _index3 < _manager.PlayerGameInfo.length; _index3++) {
            _manager.PlayerGameInfo[_index3].MarketingAmount = Math.round(_manager.PlayerGameInfo[_index3].MarketingAmount / 2);
          }
        }

        this.CompleteTurnWithToast("Cash amount $" + _amount + " has successfully added, cash balance becomes $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4000);
        break;

      case "10":
        //You start an Online University for Entrepreneurs and charge $5,000 per student. Every player in the game must take your class and learn from you. Receive tuition from each player right now.
        console.log(this.BigBusiness[Index].Description);
        BigBusinessData = null;

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _amount = 0;
        var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

        if (mode == 2) {
          //real players
          var _actorsArray = _manager.PlayerGameInfo;

          for (var _index4 = 0; _index4 < _actorsArray.length; _index4++) {
            if (_actorsArray[_index4].IsActive && _index4 != _playerIndex) {
              _amount += 5000;
            }
          }

          var _data = {
            Deduct: 5000
          };
          GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(21, _data);
          _manager.PlayerGameInfo[_playerIndex].Cash += _amount;
          this.CompleteTurnWithToast("Cash amount $" + _amount + " has successfully added, cash balance becomes $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4000);
        } else if (mode == 1) {
          var _actorsArray = _manager.PlayerGameInfo;

          for (var _index5 = 0; _index5 < _actorsArray.length; _index5++) {
            if (_index5 != _playerIndex) {
              if (_actorsArray[_index5].Cash >= 5000) {
                _actorsArray[_index5].Cash -= 5000;
              } else if (_actorsArray[_index5].Cash < 5000) {
                _actorsArray[_index5].Cash = 0;
              }

              _amount += 5000;
            }
          }

          _manager.PlayerGameInfo[_playerIndex].Cash += _amount;
          this.CompleteTurnWithToast("Cash amount $" + _amount + " has successfully added, cash balance becomes $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4000);
        }

        break;

      case "11":
        //roll dice twice, if result is >19 then take all money inside marketing.
        console.log(this.BigBusiness[Index].Description);
        BigBusinessData = null;

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

        var Dice1Result = _manager.RollTwoDices();

        var Dice2Result = _manager.RollTwoDices();

        var TotalResult = Dice1Result + Dice2Result;

        if (TotalResult >= 19) {
          var _amount = 0;

          for (var _index6 = 0; _index6 < _manager.PlayerGameInfo.length; _index6++) {
            _amount = _amount + _manager.PlayerGameInfo[_index6].MarketingAmount;
          }

          _manager.PlayerGameInfo[_playerIndex].Cash += _amount;
          this.CompleteTurnWithToast("Dice 1 Result: " + Dice1Result + "\n" + "\n" + "Dice 2 Result: " + Dice2Result + "\n" + "\n" + "Total: " + TotalResult + "\n" + "\n" + "Amount $" + _amount + " has successfully added in your cash from marketing amount on table.", 4000);

          if (mode == 2) {
            var _actorsArray = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

            var _data = null;

            for (var _index7 = 0; _index7 < _actorsArray.length; _index7++) {
              _data = _actorsArray[_index7].customProperties.PlayerSessionData;
              _data.MarketingAmount = 0;

              _actorsArray[_index7].setCustomProperty("PlayerSessionData", _data);
            }
          } else {
            for (var _index8 = 0; _index8 < _manager.PlayerGameInfo.length; _index8++) {
              _manager.PlayerGameInfo[_index8].MarketingAmount = 0;
            }
          }
        } else {
          this.CompleteTurnWithToast("Dice 1 Result: " + Dice1Result + "\n" + "\n" + "Dice 2 Result: " + Dice2Result + "\n" + "\n" + "Total: " + TotalResult + "\n" + "\n" + "You ran out of luck, turn will skip now", 4000);
        }

        break;

      case "12":
        //You open a Marketing Company. You now collect one dollar for every marketing dollar that is spent or collected in the game (collect from the Bank).
        console.log(this.BigBusiness[Index].Description);
        BigBusinessData = null;

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

        if (mode == 2) {
          _manager.PlayerGameInfo[_playerIndex].CardFunctionality.HasMarketingCompany = true;
          this.CompleteTurnWithToast("From now on, every time a player puts money into a marketing account, you will receive the same amount of money in your account", 4000);
        } else {
          _manager.PlayerGameInfo[_playerIndex].CardFunctionality.HasMarketingCompany = true;
          this.CompleteTurnWithToast("From now on, every time a player puts money into a marketing account, you will receive the same amount of money in your account", 4000);
        }

        break;

      case "13":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "14":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "15":
        console.log(this.BigBusiness[Index].Description);
        break;

      default:
        break;
    }
  },
  MarketingCardFunctionality: function MarketingCardFunctionality(_id, _hasTwoScreens, _type) {
    if (_hasTwoScreens === void 0) {
      _hasTwoScreens = false;
    }

    if (_type === void 0) {
      _type = 0;
    }

    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        MarketingData = null;
        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2400);else this.CompleteTurnWithToast("You don't have any marketing amount", 2400);
        break;

      case "2":
        //You put an ad on Facebook for your business. Roll the dice: 1 - If you roll a 6 or lower, you lose all of the money in your marketing account 2 - If you roll a 7 or higher, your ad nets you 800% of the total money currently in your marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketingAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;

        var _diceResult;

        var _multiplier = 800;

        if (_marketingAmount <= 0) {
          this.CompleteTurnWithToast("You don't have any marketing amount", 2400);
          return;
        }

        if (_hasTwoScreens) {
          _diceResult = _manager.RollTwoDices();
          MarketingData = {
            Data: {
              result: _diceResult
            }
          };

          if (!this.IsBotTurn) {
            if (_diceResult <= 6) {
              this.ShowCardInfo("\n" + "\n" + "Dice Roll Result : " + _diceResult + "\n" + "\n" + "Total dice result is less than or equal to six, so you will lose all your current marketing amount.", true);
              this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Done";
            } else if (_diceResult >= 7) {
              this.ShowCardInfo("\n" + "\n" + "Dice Roll Result : " + _diceResult + "\n" + "\n" + "Total dice result is greater than or equal to seven, so you will get 800% profit on current marketing amount.", true);
              this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Receive Amount";
            }

            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          _diceResult = MarketingData.Data.result;

          if (_diceResult <= 6) {
            var _loseAmount = _manager.LoseAllMarketingMoney();

            if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2400);else this.CompleteTurnWithToast("You don't have any marketing amount", 2400);
            MarketingData = null;
          } else if (_diceResult >= 7) {
            var _result = _marketingAmount * _multiplier / 100 + _marketingAmount;

            _manager.PlayerGameInfo[_playerIndex].MarketingAmount = 0;
            _manager.PlayerGameInfo[_playerIndex].Cash += _result;
            this.CompleteTurnWithToast("Total profit of $" + _result + " has been added to your cash amount.", 2400);
            MarketingData = null;
          }
        }

        break;

      case "3":
        //Your ad contains false claims and result in a government investigation. You lose your entire Marketing Account, plus pay lawyer fees of $3,000 per business to the bank. If you have a lawyer, you do not have to pay the extra $3,000 in fees, per business.
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketingAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
        var _lawyerStatus = _manager.PlayerGameInfo[_playerIndex].LawyerStatus;

        var _businessAmount = _manager.PlayerGameInfo[_playerIndex].HomeBasedAmount + _manager.PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

        var _hasMarketingAmount = false;
        var _multiplier = 3000;

        var _totalAmount = _multiplier * _businessAmount;

        if (_hasTwoScreens) {
          if (_marketingAmount > 0) _hasMarketingAmount = true;
          if (_lawyerStatus) _totalAmount = 0;
          MarketingData = {
            Data: {
              result: _totalAmount
            }
          };

          if (!this.IsBotTurn) {
            this.ShowCardInfo("Marketing Amount : $" + _marketingAmount + "\n" + "\n" + "Lawyer Hired : " + _lawyerStatus + "\n" + "\n" + "Total Number of business : " + _businessAmount + "\n" + "\n" + "Fees : " + _businessAmount + " * " + _multiplier + " = $" + _totalAmount, true);
            this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Done";
            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          _totalAmount = MarketingData.Data.result;
          _manager.PlayerGameInfo[_playerIndex].MarketingAmount = 0;

          if (_manager.PlayerGameInfo[_playerIndex].Cash >= _totalAmount) {
            if (_lawyerStatus) {
              _manager.PlayerGameInfo[_playerIndex].LawyerStatus = false;
              this.CompleteTurnWithToast("you had hired lawyer, you only lost your marketing amount of $" + _marketingAmount, 4200);
              MarketingData = null;
            } else {
              _manager.PlayerGameInfo[_playerIndex].Cash -= _totalAmount;
              this.CompleteTurnWithToast("you have not hired any lawyer, bill $" + _totalAmount + " was successfully paid along with marketing amount, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
              MarketingData = null;
            }
          } else {
            console.log("not enough cash");

            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              console.log("its bot and has no cash,skipping");
              MarketingData = null;
              this.CompleteTurnWithToast("", 1200);
            }
          }
        }

        break;

      case "4":
        //Your Marketing Account triples, but you must leave it in the account.
        console.log(this.Marketing[Index].Description);
        MarketingData = null;

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
        var _multiplier = 3;

        var _increaseAmount = _manager.MultiplyMarketingMoney(_multiplier);

        if (_increaseAmount > 0) {
          this.CompleteTurnWithToast("Marketing Amount: $" + _marketAmount + "\n" + "\n" + "Total: " + _marketAmount + " * " + _multiplier + " = " + _increaseAmount + "\n" + "\n" + "\n" + "your marketing amount has been sucessfully increase to $" + _increaseAmount, 3600);
        } else {
          this.CompleteTurnWithToast("You don't have any marketing amount", 2400);
        }

        break;

      case "5":
        //You hire a Marketing Firm to market your business but it yields no results. You lose your entire marketing account to the Bank. Plus pay $5,000 for their services.
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var bill = 5000;
        MarketingData = null;

        if (_manager.PlayerGameInfo[_playerIndex].Cash >= bill) {
          var _loseAmount = _manager.LoseAllMarketingMoney();

          _manager.PlayerGameInfo[_playerIndex].Cash -= bill;
          this.CompleteTurnWithToast("Fees $" + bill + " was successfully paid along with marketing amount, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
          MarketingData = null;
        } else {
          console.log("not enough cash");

          if (!this.IsBotTurn) {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
          } else {
            console.log("its bot and has no cash,skipping");
            MarketingData = null;
            this.CompleteTurnWithToast("", 1200);
          }
        }

        break;

      case "6":
        //You begin a new marketing campaign. Roll 1 die. If it is an even number, your campaign is successful and you receive all of the money in your marketing account back plus 500%. If it is an odd number you lose all of the money in your marketing account.
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketingAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;

        var _diceResult;

        var _multiplier = 500;
        var isEven = false;

        if (_marketingAmount <= 0) {
          this.CompleteTurnWithToast("You don't have any marketing amount", 2400);
          return;
        }

        if (_hasTwoScreens) {
          _diceResult = _manager.RollOneDice();
          if (_diceResult % 2 == 0) isEven = true;
          MarketingData = {
            Data: {
              result: _diceResult,
              IsEven: isEven
            }
          };

          if (!this.IsBotTurn) {
            if (_diceResult % 2 == 1) {
              isEven = false;
              this.ShowCardInfo("\n" + "Dice Roll Result : " + _diceResult + "\n" + "\n" + "Total dice result is odd, so you will lose all your current marketing amount.", true);
              this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Done";
            } else if (_diceResult % 2 == 0) {
              isEven = true;
              this.ShowCardInfo("\n" + "\n" + "Dice Roll Result : " + _diceResult + "\n" + "\n" + "Total dice result is even, so you will get 500% profit on current marketing amount.", true);
              this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Receive Amount";
            }

            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          _diceResult = MarketingData.Data.result;
          isEven = MarketingData.Data.IsEven;

          if (!isEven) {
            var _loseAmount = _manager.LoseAllMarketingMoney();

            if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2400);else this.CompleteTurnWithToast("You don't have any marketing amount", 2400);
            MarketingData = null;
          } else if (isEven) {
            var _result = _marketingAmount * _multiplier / 100 + _marketingAmount;

            _manager.PlayerGameInfo[_playerIndex].MarketingAmount = 0;
            _manager.PlayerGameInfo[_playerIndex].Cash += _result;
            this.CompleteTurnWithToast("Total profit of $" + _result + " has been added to your cash amount.", 2400);
            MarketingData = null;
          }
        }

        break;

      case "7":
        //Your Social Media ad goes viral! You receive all of your Marketing Budget back, plus $5,000 profit for each business you have.
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
        var _HBAmount = _manager.PlayerGameInfo[_playerIndex].HomeBasedAmount;
        var _BMAmount = _manager.PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
        var _locations = _manager.PlayerGameInfo[_playerIndex].TotalLocationsAmount;

        var _TotalBusinesses = _HBAmount + _BMAmount + _locations;

        var _profit = 5000;

        var _TotalProfit = _TotalBusinesses * _profit + _marketAmount;

        if (_hasTwoScreens) {
          MarketingData = {
            Data: {
              result: _TotalProfit
            }
          };

          if (!this.IsBotTurn) {
            isEven = false;
            this.ShowCardInfo("\n" + "Total Businesses (with locations) : " + _TotalBusinesses + "\n" + "\n" + "Marketing Amount : " + _marketAmount + "\n" + "\n" + "Profit on each Business : " + _TotalBusinesses + " * 5000 + " + _marketAmount + " = " + _TotalProfit, true);
            this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Receive";
            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          //_TotalProfit = MarketingData.Data.result;
          _manager.PlayerGameInfo[_playerIndex].Cash += _TotalProfit;
          _manager.PlayerGameInfo[_playerIndex].MarketingAmount = 0;
          this.CompleteTurnWithToast("Total profit of $" + _TotalProfit + " has been added to your cash amount.", 2400);
          MarketingData = null;
        }

        break;

      case "8":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);
        MarketingData = null;

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2400);else this.CompleteTurnWithToast("You don't have any marketing amount", 2400);
        break;

      case "9":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        MarketingData = null;
        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2400);else this.CompleteTurnWithToast("You don't have any marketing amount", 2400);
        break;

      case "10":
        //Receive all of your Marketing Budget back, plus 700% profit.
        console.log(this.Marketing[Index].Description);
        MarketingData = null;

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
        var _profit = 700;

        var _amount = _manager.GetMarketingMoney(_profit);

        if (_amount > 0) {
          this.CompleteTurnWithToast("Marketing Amount: $" + _marketAmount + "\n" + "\n" + "Total: " + _marketAmount + " + (" + _marketAmount + "*" + _profit + " )/100" + " = " + _amount + "\n" + "\n" + "\n" + "your cash amount has been sucessfully increase by $" + _amount + ", total cash becomes $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4000);
        } else {
          this.CompleteTurnWithToast("You don't have any marketing amount", 2400);
        }

        break;

      case "11":
        //You can hired a media specialist to do your social media marketing for you. They increase your business' reach. You receive double your income on your next Pay Day.
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        MarketingData = null;

        _manager.ToggleDoublePayNextTurn(true);

        this.CompleteTurnWithToast("You will receive double profits on next payday.", 2400);
        break;

      case "12":
        console.log(this.Marketing[Index].Description);
        break;

      case "13":
        console.log(this.Marketing[Index].Description);
        break;

      case "14":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        MarketingData = null;
        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2100);else this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        break;

      case "15":
        console.log(this.Marketing[Index].Description);
        break;

      default:
        break;
    }
  },
  LossesCardFunctionality: function LossesCardFunctionality(_id, _hasTwoScreens, _type) {
    if (_hasTwoScreens === void 0) {
      _hasTwoScreens = false;
    }

    if (_type === void 0) {
      _type = 0;
    }

    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //lose next turn
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleSkipNextTurn(true);

        LossesData = null;
        this.CompleteTurnWithToast("You will lose your next turn.", 2400);
        break;

      case "2":
        //Roll 2 dice, multiply by $5,000 and pay it to the Bank. If you have a lawyer you lose 50% of the total bill currently owed.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var DiceResult;
        var CashMulitplier;
        var TotalResult;

        var _hiredLawyer;

        if (_hasTwoScreens) {
          DiceResult = _manager.RollTwoDices();
          CashMulitplier = 5000;
          TotalResult = DiceResult * CashMulitplier;
          _hiredLawyer = _manager.PlayerGameInfo[_playerIndex].LawyerStatus;
          LossesData = {
            Data: {
              result: TotalResult,
              lawyer: _hiredLawyer
            }
          };

          if (!this.IsBotTurn) {
            this.ShowCardInfo("\n" + "\n" + "Dice Roll Result : " + DiceResult + "\n" + "\n" + "Total Bill Calculated : " + DiceResult + " * " + CashMulitplier + " = $" + TotalResult, true);
            this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          console.log(LossesData);
          TotalResult = LossesData.Data.result;
          _hiredLawyer = LossesData.Data.lawyer;
          if (_hiredLawyer) TotalResult = TotalResult / 2;

          if (_manager.PlayerGameInfo[_playerIndex].Cash >= TotalResult) {
            if (_hiredLawyer) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= TotalResult;
              _manager.PlayerGameInfo[_playerIndex].LawyerStatus = false;
              this.CompleteTurnWithToast("you had hired lawyer, half bill $" + TotalResult + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
              LossesData = null;
            } else {
              _manager.PlayerGameInfo[_playerIndex].Cash -= TotalResult;
              this.CompleteTurnWithToast("you have not hired any lawyer, bill $" + TotalResult + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
              LossesData = null;
            }
          } else {
            console.log("not enough cash");

            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              console.log("its bot and has no cash,skipping");
              LossesData = null;
              this.CompleteTurnWithToast("", 1200);
            }
          }
        }

        break;

      case "3":
        //lose all your business profits on next Pay Day.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        LossesData = null;

        _manager.ToggleSkipPayDay_Whole(true);

        this.CompleteTurnWithToast("you will lose all your business profits on next Pay Day.", 2400);
        break;

      case "4":
        //Yearly business insurance premium is due. Pay $2,000 to the Bank for each Home-Based business, $5,000 for each Brick & Mortar business.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var homeBasedBusiness = _manager.PlayerGameInfo[_playerIndex].HomeBasedAmount;
        var brickAndMortarBusiness = _manager.PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
        var homeMultiplier = 2000;
        var brickMuliplier = 5000;
        var totalAmount = homeBasedBusiness * homeMultiplier + brickAndMortarBusiness * brickMuliplier;

        if (_hasTwoScreens) {
          LossesData = {
            Data: {
              result: totalAmount
            }
          };

          if (!this.IsBotTurn) {
            this.ShowCardInfo("\n" + "Home Based Amount : " + homeBasedBusiness + " * $" + homeMultiplier + " = $" + homeBasedBusiness * homeMultiplier + "\n" + "\n" + "Brick & Mortar Amount : " + brickAndMortarBusiness + " * $" + brickMuliplier + " = $" + brickAndMortarBusiness * brickMuliplier + "\n" + "\n" + "Total Amount : " + homeBasedBusiness * homeMultiplier + " + " + brickAndMortarBusiness * brickMuliplier + " = $" + totalAmount, true);
            this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          totalAmount = LossesData.Data.result;

          if (_manager.PlayerGameInfo[_playerIndex].Cash >= totalAmount) {
            _manager.PlayerGameInfo[_playerIndex].Cash -= totalAmount;
            this.CompleteTurnWithToast("Total amount $" + totalAmount + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
            LossesData = null;
          } else {
            console.log("not enough cash");

            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              LossesData = null;
              console.log("its bot and has no money, skipping");
              this.CompleteTurnWithToast("", 1200);
            }
          }
        }

        break;

      case "5":
        //Your employee claims you sexually harassed them, but you did not. You can either;  1 - Settle out of court and pay them $50,000. 2 - Take your chances in court. Roll 2 dice and pay $10,000 times the number rolled.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _courtSettlementFees = 50000;
        var DiceResult;
        var CashMulitplier = 10000;
        var totalAmount;

        if (_hasTwoScreens) {
          if (_type == 0) {
            //first button
            LossesData = {
              Data: {
                result: _courtSettlementFees,
                Type: _type
              }
            };

            if (!this.IsBotTurn) {
              this.ShowCardInfo("\n" + "Payable amount : $" + _courtSettlementFees, true);
              this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
              this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
            } else {
              this.CardFuntionalityButton();
            }
          } else if (_type == 1) {
            //2nd button
            DiceResult = _manager.RollTwoDices();
            totalAmount = DiceResult * CashMulitplier;
            LossesData = {
              Data: {
                result: DiceResult,
                TotalAmount: totalAmount,
                Type: _type
              }
            };

            if (!this.IsBotTurn) {
              this.ShowCardInfo("\n" + "Dice Result : " + DiceResult + "\n" + "\n" + "Total Amount : " + DiceResult + " * " + CashMulitplier + " = $" + totalAmount, true);
              this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
              this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
            } else {
              this.CardFuntionalityButton();
            }
          }
        } else {
          var tempType = LossesData.Data.Type;

          if (tempType == 0) {
            _courtSettlementFees = LossesData.Data.result;

            if (_manager.PlayerGameInfo[_playerIndex].Cash >= _courtSettlementFees) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= _courtSettlementFees;
              this.CompleteTurnWithToast("Total amount $" + _courtSettlementFees + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
              LossesData = null;
            } else {
              console.log("not enough cash");

              if (!this.IsBotTurn) {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
              } else {
                LossesData = null;
                console.log("it was bot and had not enough money");
                this.CompleteTurnWithToast("", 1200);
              }
            }
          } else if (tempType == 1) {
            DiceResult = LossesData.Data.result;
            totalAmount = LossesData.Data.TotalAmount;

            if (_manager.PlayerGameInfo[_playerIndex].Cash >= totalAmount) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= totalAmount;
              this.CompleteTurnWithToast("Total amount $" + totalAmount + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
              LossesData = null;
            } else {
              console.log("not enough cash");

              if (!this.IsBotTurn) {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
              } else {
                console.log("it was bot and had not enough money");
                LossesData = null;
                this.CompleteTurnWithToast("", 1200);
              }
            }
          }
        }

        break;

      case "6":
        // If Business #1 is Home Based, pay a $5,000 Insurance Deductible; if Brick & Mortar $10,000 deductible.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _businessType = parseInt(_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[0].BusinessType);

        if (_businessType == 1) {
          // first business was home based
          if (_manager.PlayerGameInfo[_playerIndex].Cash >= 5000) {
            _manager.PlayerGameInfo[_playerIndex].Cash -= 5000;
            this.CompleteTurnWithToast("You payed $5000 insurance on your first home based business, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
          } else {
            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              LossesData = null;
              console.log("it was bot and had not enough money");
              this.CompleteTurnWithToast("", 1200);
            }
          }
        } else if (_businessType == 2) {
          //first busioness was brick & mortar
          if (_manager.PlayerGameInfo[_playerIndex].Cash >= 10000) {
            _manager.PlayerGameInfo[_playerIndex].Cash -= 10000;
            this.CompleteTurnWithToast("You payed $10000 insurance on your first brick & mortar business, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
          } else {
            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              LossesData = null;
              console.log("it was bot and had not enough money");
              this.CompleteTurnWithToast("", 1200);
            }
          }
        }

        break;

      case "7":
        //lose your next Pay Day for all of your home-based businesses.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        LossesData = null;

        _manager.ToggleSkipPayDay_HomeBased(true);

        this.CompleteTurnWithToast("you will lose your next Pay Day for all of your home-based businesses.", 2400);
        break;

      case "8":
        //You are fined 50% of your current liquid cash. If you have a lawyer, your fine is reduced to 20% of your current liquid cash.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var TotalResult;

        var _hiredLawyer;

        if (_hasTwoScreens) {
          TotalResult = _manager.PlayerGameInfo[_playerIndex].Cash;
          _hiredLawyer = _manager.PlayerGameInfo[_playerIndex].LawyerStatus;
          LossesData = {
            Data: {
              result: TotalResult,
              lawyer: _hiredLawyer
            }
          };

          if (!this.IsBotTurn) {
            this.ShowCardInfo("\n" + "\n" + "Total Cash : $" + TotalResult + "\n" + "\n" + "50% of Total Cash : $" + TotalResult / 2, true);
            this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          console.log(LossesData);
          TotalResult = LossesData.Data.result;
          _hiredLawyer = LossesData.Data.lawyer;
          if (_hiredLawyer) TotalResult = TotalResult * 20 / 100;else TotalResult = TotalResult * 50 / 100;

          if (_manager.PlayerGameInfo[_playerIndex].Cash >= TotalResult) {
            if (_hiredLawyer) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= TotalResult;
              _manager.PlayerGameInfo[_playerIndex].LawyerStatus = false;
              this.CompleteTurnWithToast("you had hired lawyer, reduced fine $" + TotalResult + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
              LossesData = null;
            } else {
              _manager.PlayerGameInfo[_playerIndex].Cash -= TotalResult;
              this.CompleteTurnWithToast("you have not hired any lawyer, fine $" + TotalResult + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
              LossesData = null;
            }
          } else {
            console.log("not enough cash");

            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              console.log("it was bot and had no money, skipping");
              this.CompleteTurnWithToast("", 800);
              LossesData = null;
            }
          }
        }

        break;

      case "9":
        //A customer is injured at one of your business locations. You can either; 1 - Settle out of court and pay them $25,000 , 2 - Take your chances in court. Roll 2 dice and pay $5,000 times the number rolled.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _courtSettlementFees = 25000;
        var DiceResult;
        var CashMulitplier = 5000;
        var totalAmount;

        if (_hasTwoScreens) {
          if (_type == 0) {
            //first button
            LossesData = {
              Data: {
                result: _courtSettlementFees,
                Type: _type
              }
            };

            if (!this.IsBotTurn) {
              this.ShowCardInfo("\n" + "Payable amount : $" + _courtSettlementFees, true);
              this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
              this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
            } else {
              this.CardFuntionalityButton();
            }
          } else if (_type == 1) {
            //2nd button
            DiceResult = _manager.RollTwoDices();
            totalAmount = DiceResult * CashMulitplier;
            LossesData = {
              Data: {
                result: DiceResult,
                TotalAmount: totalAmount,
                Type: _type
              }
            };

            if (!this.IsBotTurn) {
              this.ShowCardInfo("\n" + "Dice Result : " + DiceResult + "\n" + "\n" + "Total Amount : " + DiceResult + " * " + CashMulitplier + " = $" + totalAmount, true);
              this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
              this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
            } else {
              this.CardFuntionalityButton();
            }
          }
        } else {
          var tempType = LossesData.Data.Type;

          if (tempType == 0) {
            _courtSettlementFees = LossesData.Data.result;

            if (_manager.PlayerGameInfo[_playerIndex].Cash >= _courtSettlementFees) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= _courtSettlementFees;
              this.CompleteTurnWithToast("Total amount $" + _courtSettlementFees + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
              LossesData = null;
            } else {
              console.log("not enough cash");

              if (!this.IsBotTurn) {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
              } else {
                LossesData = null;
                console.log("it was bot and had not enough money");
                this.CompleteTurnWithToast("", 1200);
              }
            }
          } else if (tempType == 1) {
            DiceResult = LossesData.Data.result;
            totalAmount = LossesData.Data.TotalAmount;

            if (_manager.PlayerGameInfo[_playerIndex].Cash >= totalAmount) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= totalAmount;
              this.CompleteTurnWithToast("Total amount $" + totalAmount + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
              LossesData = null;
            } else {
              console.log("not enough cash");

              if (!this.IsBotTurn) {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
              } else {
                console.log("it was bot and had not enough money");
                LossesData = null;
                this.CompleteTurnWithToast("", 1200);
              }
            }
          }
        }

        break;

      case "10":
        //Your computer has been hacked! You catch it in time, but you must buy more security for your business records. Pay $20,000 to the Bank.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var bill = 20000;

        if (_manager.PlayerGameInfo[_playerIndex].Cash >= bill) {
          _manager.PlayerGameInfo[_playerIndex].Cash -= bill;
          this.CompleteTurnWithToast("Total amount $" + bill + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
          LossesData = null;
        } else {
          console.log("not enough cash");

          if (!this.IsBotTurn) {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
          } else {
            console.log("it was bot and had not enough money");
            LossesData = null;
            this.CompleteTurnWithToast("", 1200);
          }
        }

        break;

      case "11":
        //Mold is discovered in all the buildings of your Brick & Mortar businesses. Roll 2 die and multiply by $2,000. Pay that amount to clean the building of EACH of your Brick & Mortar businesses.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _TotalBM = _manager.PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
        var _TotalBMLocations = _manager.PlayerGameInfo[_playerIndex].TotalLocationsAmount;
        var DiceResult;
        var CashMulitplier = 2000;
        var totalAmount;

        if (_TotalBM <= 0) {
          this.CompleteTurnWithToast("You do not own any Brick & Mortar business, Skipping turn.", 2800);
          return;
        }

        if (_hasTwoScreens) {
          DiceResult = _manager.RollTwoDices();
          totalAmount = DiceResult * CashMulitplier;
          LossesData = {
            Data: {
              Dice: DiceResult,
              Total: totalAmount
            }
          };

          if (!this.IsBotTurn) {
            this.ShowCardInfo("\n" + "Dice Result : " + DiceResult + "\n" + "\n" + "Total Brick & Mortar Business (with Locations) : " + (_TotalBM + _TotalBMLocations) + "\n" + "\n" + "Payable amount : " + DiceResult + "*" + CashMulitplier + "=$" + totalAmount, true);
            this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          DiceResult = LossesData.Data.Dice;
          totalAmount = LossesData.Data.Total;

          if (_manager.PlayerGameInfo[_playerIndex].Cash >= totalAmount) {
            _manager.PlayerGameInfo[_playerIndex].Cash -= totalAmount;
            this.CompleteTurnWithToast("You payed $" + totalAmount + " to clean mold on the building of EACH of your Brick & Mortar businesses, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
          } else {
            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              LossesData = null;
              console.log("it was bot and had not enough money");
              this.CompleteTurnWithToast("", 1200);
            }
          }
        }

        break;

      case "12":
        //It is March 15th and business Tax Returns are due. Roll the dice for each of your businesses; 1 - For each home-based business, pay $1,000 times the amounts rolled 2 - For each brick & mortar business, pay $3,000 times the amounts rolled
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _TotalBM = _manager.PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
        var _TotalBMLocations = _manager.PlayerGameInfo[_playerIndex].TotalLocationsAmount;
        var _TotalHB = _manager.PlayerGameInfo[_playerIndex].HomeBasedAmount;
        var DiceResult;
        var CashMulitplier1 = 1000;
        var CashMulitplier2 = 3000;
        var totalAmount;

        if (_hasTwoScreens) {
          DiceResult = _manager.RollOneDice();
          totalAmount = DiceResult * CashMulitplier1 * _TotalHB + DiceResult * CashMulitplier2 * (_TotalBM + _TotalBMLocations);
          LossesData = {
            Data: {
              Dice: DiceResult,
              Total: totalAmount
            }
          };

          if (!this.IsBotTurn) {
            this.ShowCardInfo("Dice Result : " + DiceResult + "\n" + "\n" + "Total Brick & Mortar Business (with Locations) : " + (_TotalBM + _TotalBMLocations) + "\n" + "\n" + "Total Home Based Business : " + _TotalHB + "\n" + "\n" + "Payable amount : " + DiceResult + "*" + CashMulitplier1 + "*" + _TotalHB + "+" + DiceResult + "*" + CashMulitplier2 + "*" + (_TotalBM + _TotalBMLocations) + "=$" + totalAmount, true);
            this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          DiceResult = LossesData.Data.Dice;
          totalAmount = LossesData.Data.Total;

          if (_manager.PlayerGameInfo[_playerIndex].Cash >= totalAmount) {
            _manager.PlayerGameInfo[_playerIndex].Cash -= totalAmount;
            this.CompleteTurnWithToast("You payed $" + totalAmount + " tax on your businesses, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
          } else {
            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              LossesData = null;
              console.log("it was bot and had not enough money");
              this.CompleteTurnWithToast("", 1200);
            }
          }
        }

        break;

      case "13":
        //You make a business deal with a friend and soon after, they are arrested for fraud. You are investigated as well and your brand takes a hit. If you have a lawyer, pay $15,000 in legal fees. If you do not have a lawyer, pay $40,000 in court fees plus loose half your income on the next payday
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _lawyerStatus = _manager.PlayerGameInfo[_playerIndex].LawyerStatus;
        var _fine = 40000;

        if (_hasTwoScreens) {
          if (_lawyerStatus) {
            _fine = 15000;
          }

          LossesData = {
            Data: {
              Fine: _fine
            }
          };

          if (!this.IsBotTurn) {
            this.ShowCardInfo("\n" + "Lawyer Status : " + _lawyerStatus + "\n" + "\n" + "Payable amount : $" + _fine, true);
            this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";
            this.ToggleButtons(this.isOwner, true, this.IsBotTurn);
          } else {
            this.CardFuntionalityButton();
          }
        } else {
          _fine = LossesData.Data.Fine;

          if (_manager.PlayerGameInfo[_playerIndex].Cash >= _fine) {
            _manager.PlayerGameInfo[_playerIndex].Cash -= _fine;

            if (_lawyerStatus) {
              _manager.PlayerGameInfo[_playerIndex].LawyerStatus = false;
              this.CompleteTurnWithToast("You payed $" + _fine + " fine, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
            } else {
              _manager.ToggleHalfPayNextTurn(true);

              this.CompleteTurnWithToast("You payed $" + _fine + " fine, you will also lose half profit on next payday, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4200);
            }
          } else {
            if (!this.IsBotTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
            } else {
              LossesData = null;
              console.log("it was bot and had not enough money");
              this.CompleteTurnWithToast("", 1200);
            }
          }
        }

        break;

      case "14":
        //You have not been taking care of your health and you become too ill to work. You lose half of your income on your next Payday.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        LossesData = null;

        _manager.ToggleHalfPayNextTurn(true);

        this.CompleteTurnWithToast("You will receive half profits on next payday.", 2400);
        break;

      case "15":
        //You make a comment on Social Media that is going viral in a bad way. All of your businesses suffer because of it. You lose half your income on the next two Paydays. If you have a lawyer, lose half your income on only one Payday
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _lawyerStatus = _manager.PlayerGameInfo[_playerIndex].LawyerStatus;

        if (_lawyerStatus) {
          _manager.PlayerGameInfo[_playerIndex].LawyerStatus = false;
          LossesData = null;

          _manager.ToggleHalfPayNextTurn(true);

          this.CompleteTurnWithToast("You will receive half profits on next payday.", 2400);
        } else {
          LossesData = null;
          _manager.PlayerGameInfo[_playerIndex].CardFunctionality.NextTurnHalfPayDayCounter = 1;

          _manager.ToggleHalfPayNextTurn(true);

          this.CompleteTurnWithToast("You will receive half profits on next two paydays.", 2400);
        }

        break;

      default:
        break;
    }
  },
  WildCardFunctionality: function WildCardFunctionality(_id, _hasTwoScreens, _type) {
    var _this7 = this;

    if (_hasTwoScreens === void 0) {
      _hasTwoScreens = false;
    }

    if (_type === void 0) {
      _type = 0;
    }

    return function (_type) {
      var Index = parseInt(_id);
      Index = Index - 1;

      switch (_id) {
        case "1":
          //doubles your income on the next Pay Day.
          console.log(_this7.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          WildCardData = null;

          _manager.ToggleDoublePayNextTurn(true);

          _this7.CompleteTurnWithToast("You will receive double profits on next payday.", 2400);

          break;

        case "2":
          //Roll 2 die, multiply result by $5,000 and receive your advance from the Bank.
          console.log(_this7.WildCards[Index].Description);
          WildCardData = null;

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var DiceResult = _manager.RollTwoDices();

          var CashMulitplier = 5000;
          var TotalResult = DiceResult * CashMulitplier;
          _manager.PlayerGameInfo[_playerIndex].Cash += TotalResult;

          _this7.CompleteTurnWithToast("Dice Result: " + DiceResult + "\n" + "\n" + "Total: " + DiceResult + " * " + CashMulitplier + " = " + TotalResult + "\n" + "\n" + "\n" + "Amount $" + TotalResult + " has been added into your cash.", 4000);

          break;

        case "3":
          //You go to an Estate Auction and buy a painting that turns out to be valuable. You can sell it now, roll both dice, multiply result by $10,000 and receive profits from the Bank.
          console.log(_this7.WildCards[Index].Description);
          WildCardData = null;

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var DiceResult = _manager.RollTwoDices();

          var CashMulitplier = 10000;
          var TotalResult = DiceResult * CashMulitplier;
          _manager.PlayerGameInfo[_playerIndex].Cash += TotalResult;

          _this7.CompleteTurnWithToast("Dice Result: " + DiceResult + "\n" + "\n" + "Total: " + DiceResult + " * " + CashMulitplier + " = " + TotalResult + "\n" + "\n" + "Amount $" + TotalResult + " has been added into your cash.", 5200);

          break;

        case "4":
          //Your business is audited by the IRS and you have not been keeping very good records of the income and expenses for your business. They fine you $30,000. If you have a lawyer, your fine is $15,000.
          console.log(_this7.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var _fine = 30000;
          var _lawyerStatus = _manager.PlayerGameInfo[_playerIndex].LawyerStatus;

          if (_hasTwoScreens) {
            if (_lawyerStatus) _fine = _fine / 2;
            WildCardData = {
              Data: {
                result: _fine
              }
            };

            if (!_this7.IsBotTurn) {
              _this7.ShowCardInfo("\n" + "Lawyer Hired : " + _lawyerStatus + "\n" + "\n" + "Total fine $" + _fine, true);

              _this7.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";

              _this7.ToggleButtons(_this7.isOwner, true, _this7.IsBotTurn);
            } else {
              _this7.CardFuntionalityButton();
            }
          } else {
            _fine = WildCardData.Data.result;

            if (_manager.PlayerGameInfo[_playerIndex].Cash >= _fine) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= _fine;
              _manager.PlayerGameInfo[_playerIndex].LawyerStatus = false;

              _this7.CompleteTurnWithToast("Fees $" + _fine + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 2800);

              WildCardData = null;
            } else {
              console.log("not enough cash");

              if (!_this7.IsBotTurn) {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
              } else {
                console.log("its bot and has no cash,skipping");
                WildCardData = null;

                _this7.CompleteTurnWithToast("", 1200);
              }
            }
          }

          break;

        case "5":
          //You can become a vendor at a local Jazz Festival for a vending fee of $20,000. If you accept, pay the Bank $20,000 and roll two die; multiply the result by $5,000 and receive your vending income from the Bank.
          console.log(_this7.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var _fees = 20000;
          var _multiplier = 5000;

          var _diceResult;

          var _result;

          if (_hasTwoScreens) {
            if (_type == 0) {
              _diceResult = _manager.RollTwoDices();
              _result = _diceResult * _multiplier;
              WildCardData = {
                Data: {
                  result: _result,
                  Dice: _diceResult
                }
              };

              if (_manager.PlayerGameInfo[_playerIndex].Cash >= _fees) {
                _manager.PlayerGameInfo[_playerIndex].Cash -= _fees;

                if (!_this7.IsBotTurn) {
                  _this7.ShowCardInfo("\n" + "Dice Result: " + _diceResult + "\n" + "\n" + "Total Amount : " + _diceResult + " * " + _multiplier + " = $" + _result, true);

                  _this7.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Receive Amount";

                  _this7.ToggleButtons(_this7.isOwner, true, _this7.IsBotTurn);
                } else {
                  _this7.CardFuntionalityButton();
                }
              } else {
                WildCardData = null;

                _this7.CompleteTurnWithToast("you don't have enough cash.", 2400);
              }
            } else if (_type == 1) {
              WildCardData = null;

              _this7.CompleteTurnWithToast("skipping turn now.", 1800);
            }
          } else {
            _diceResult = WildCardData.Data.Dice;
            _result = WildCardData.Data.result;
            _manager.PlayerGameInfo[_playerIndex].Cash += _result;
            WildCardData = null;

            _this7.CompleteTurnWithToast("Cash amount $" + _result + " has been successfully added.", 3000);
          }

          break;

        case "6":
          //An unsatisfied customer takes to social media and smear’s your name. It affects your Brand and your business before you can get a handle on it. You lose half your income on your next PayDay.
          console.log(_this7.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          WildCardData = null;

          _manager.ToggleHalfPayNextTurn(true);

          _this7.CompleteTurnWithToast("You will receive half profits on next payday.", 2400);

          break;

        case "7":
          //pay off your loan for your Brick & Mortar Business. If you have no loan outstanding, receive $50,000.
          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          WildCardData = null;
          var _loanReset = false;

          for (var index = 0; index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
            var _type = parseInt(_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].BusinessType);

            if (_type == 2 && _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
              _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken = false;
              _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount = 0;
              _loanReset = true;
              break;
            }
          }

          if (_loanReset) {
            _this7.CompleteTurnWithToast("your outstanding loan has been payed off.", 3200);
          } else {
            _manager.PlayerGameInfo[_playerIndex].Cash += 50000;

            _this7.CompleteTurnWithToast("you had no loan, amount $50000 has been added to your cash", 3200);
          }

          console.log(_this7.WildCards[Index].Description);
          break;

        case "8":
          //You are sued for Trademark Infringement (copying someone else’s product), and you lose. If you have a lawyer roll 2 die, multiply by $1,000 and pay to the Bank. If you do not have a Lawyer, roll two die and multiply by $3,000 and pay to the Bank.
          console.log(_this7.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var _lawyerStatus = _manager.PlayerGameInfo[_playerIndex].LawyerStatus;

          var DiceResult = _manager.RollTwoDices();

          var _fine = 3000;
          var TotalResult = 0;

          if (_hasTwoScreens) {
            if (_lawyerStatus) _fine = 1000;
            TotalResult = _fine * DiceResult;
            WildCardData = {
              Data: {
                result: TotalResult
              }
            };

            if (!_this7.IsBotTurn) {
              _this7.ShowCardInfo("\n" + "Lawyer Hired : " + _lawyerStatus + "\n" + "\n" + "Dice Result : " + DiceResult + "\n" + "\n" + "Total fine $" + TotalResult, true);

              _this7.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";

              _this7.ToggleButtons(_this7.isOwner, true, _this7.IsBotTurn);
            } else {
              _this7.CardFuntionalityButton();
            }
          } else {
            TotalResult = WildCardData.Data.result;

            if (_manager.PlayerGameInfo[_playerIndex].Cash >= TotalResult) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= TotalResult;
              _manager.PlayerGameInfo[_playerIndex].LawyerStatus = false;

              _this7.CompleteTurnWithToast("Fees $" + TotalResult + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 2800);

              WildCardData = null;
            } else {
              console.log("not enough cash");

              if (!_this7.IsBotTurn) {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
              } else {
                console.log("its bot and has no cash,skipping");
                WildCardData = null;

                _this7.CompleteTurnWithToast("", 1200);
              }
            }
          }

          break;

        case "9":
          //The City is adding a bus line that runs in front of your business. If you own a Brick & Mortar business, for the rest of the game, you receive double your income for one Brick & Mortar business.
          console.log(_this7.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var BMBusiness = _manager.PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

          if (BMBusiness <= 0) {
            _this7.CompleteTurnWithToast("You do not have any brick and mortar business, skipping turn.", 3200);
          } else {
            if (!_this7.IsBotTurn) {
              _this7.ShowCardInfo("", false);

              GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableSeletiveDoublePayDay_BusinessPayDayUISetup(false, true);
            } else {
              console.log("its bot and skipping");
              WildCardData = null;

              _this7.CompleteTurnWithToast("", 1200);
            }
          }

          break;

        case "10":
          //You sue a company for Defamation (lying on you) and win. Choose a player and receive all of their profits on their next Pay Day.
          console.log(_this7.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          if (!_this7.IsBotTurn) {
            _this7.ShowCardInfo("", false);

            _manager.SelectPlayerProfit_Space_CardFunctionality(true);
          } else {
            console.log("its bot and skipping");
            WildCardData = null;

            _this7.CompleteTurnWithToast("", 1200);
          }

          break;

        case "11":
          // receive double your business profits on all of your businesses.
          console.log(_this7.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          WildCardData = null;

          _manager.ToggleDoublePayNextTurn(true);

          _this7.CompleteTurnWithToast("You will receive double profits on next payday.", 2400);

          break;

        case "12":
          console.log(_this7.WildCards[Index].Description);
          break;

        case "13":
          console.log(_this7.WildCards[Index].Description);
          break;

        case "14":
          console.log(_this7.WildCards[Index].Description);
          break;

        case "15":
          console.log(_this7.WildCards[Index].Description);
          break;

        default:
          break;
      }
    }(_type);
  },
  InvestFunctionality: function InvestFunctionality() {
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableInvest_InvestSetupUI(true);
    this.ShowCardInfo("", false);
  },
  PayDayFunctionality: function PayDayFunctionality() {},
  DoublePayDayFunctionality: function DoublePayDayFunctionality() {},
  OneQuestionFunctionality: function OneQuestionFunctionality() {
    GamePlayReferenceManager.Instance.Get_GameManager().OneQuestionScreen_Space_OneQuestion(true);
    this.ShowCardInfo("", false);
  },
  SellFunctionality: function SellFunctionality() {
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableSellScreen__SellBusinessUISetup(true);
    this.ShowCardInfo("", false);
  },
  BuyOrSellFunctionality: function BuyOrSellFunctionality() {
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableBuyOrSell_BuyOrSellSetupUI(true);
    this.ShowCardInfo("", false);
  },
  GoBackFunctionality: function GoBackFunctionality() {
    GamePlayReferenceManager.Instance.Get_GameManager().GoBackSpaces_spaceFunctionality();
    this.ShowCardInfo("", false);
  }
});
module.exports = DecksData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiTG9zc2VzRGF0YSIsIk1hcmtldGluZ0RhdGEiLCJXaWxkQ2FyZERhdGEiLCJCaWdCdXNpbmVzc0RhdGEiLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJFbnVtU3BhY2VUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIldpbGRDYXJkIiwiQmlnQnVzaW5lc3MiLCJNYXJrZXRpbmciLCJJbnZlc3QiLCJMb3NzZXMiLCJQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJPbmVRdWVzdGlvbiIsIlNlbGwiLCJCdXlPclNlbGwiLCJHb0JhY2tTcGFjZXMiLCJDYXJkRGF0YSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJJRCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIlRleHQiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRGVzY3JpcHRpb24iLCJIYXNCdXR0b24iLCJIYXNUd29CdXR0b25zIiwiSGFzVGhyZWVCdXR0b25zIiwiQnV0dG9uTmFtZSIsIlNlY29uZEJ1dHRvbk5hbWUiLCJUaGlyZEJ1dHRvbk5hbWUiLCJjdG9yIiwiQ2FyZFVJIiwiVG9hc3ROb2RlIiwiTm9kZSIsIlRvYXN0TGFiZWwiLCJMYWJlbCIsIkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvbkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlIiwiSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlIiwiQ29tcGxldGlvblRvYXN0Tm9kZSIsIkNvbXBsZXRpb25Ub2FzdExhYmVsIiwiRGVja3NEYXRhIiwiQ29tcG9uZW50IiwiTWFpblVJIiwiV2lsZENhcmRzIiwiU3BhY2VzVHlwZSIsIlJlc2V0QWxsRGF0YSIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsIlNlbGVjdGVkQ2FyZEluZGV4IiwiQ2FyZFNlbGVjdGVkIiwiSXNCb3RUdXJuIiwiaXNPd25lciIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlNob3dDYXJkSW5mbyIsIm9uRGlzYWJsZSIsIm9mZiIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiX2lzQm90IiwiX2hhc1R3b0J1dHRvbiIsImFjdGl2ZSIsInNldFRpbWVvdXQiLCJFeGl0Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCIsIl9yYW5kb21WYWx1ZSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50Iiwic3RyaW5nIiwiQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbiIsIkdlbmVyYXRlUmFuZG9tTWFya2V0aW5nQ2FyZCIsIkdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZCIsIkdlbmVyYXRlUmFuZG9tV2lsZENhcmQiLCJTcGFjZUludmVzdCIsIl9pbmRleCIsIkNvbXBsZXRlVHVybldpdGhUb2FzdCIsIlNwYWNlUGF5RGF5IiwiUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlRG91YmxlUGF5RGF5IiwiRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlT25lUXVlc3Rpb24iLCJTcGFjZVNlbGwiLCJTcGFjZUJ1eU9yU2VsbCIsIlNwYWNlR29CYWNrU3BhY2VzIiwibWVzc2FnZSIsIl9zdGF0ZSIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUmVzZXRDYXJkRGlzcGxheSIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJUd29CdXR0b25zRnVuY3Rpb25hbGl0eSIsImV2ZW50IiwiX3R5cGUiLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkiLCJHb0JhY2tGdW5jdGlvbmFsaXR5IiwiQ2hlY2tMb2FuIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiX21hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsIk5vT2ZCdXNpbmVzcyIsImxlbmd0aCIsIkxvYW5UYWtlbiIsInZhbCIsIlJlc3VsdCIsInYyIiwiRG9uZUJ1dHRvbkNsaWNrZWQiLCJjbGVhclRpbWVvdXQiLCJDb21wbGV0aW9uV2luZG93IiwiY29uc29sZSIsImVycm9yIiwiX21zZyIsIl90aW1lIiwiX2NoYW5nZVR1cm4iLCJsb2ciLCJfZGVsYXkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJBc3NpZ25TZWNvbmRTY3JlZW5EYXRhIiwiX0xhYmVsUmVmIiwiX2J1dHRvbk5hbWUiLCJfaWQiLCJfaGFzVHdvU2NyZWVucyIsIkluZGV4IiwicGFyc2VJbnQiLCJfcmVzdWx0IiwiSXNMb2FuVGFrZW4iLCJ4IiwieSIsIkxvYW5BbW91bnQiLCJfY2FyZEluZm8iLCJMYXd5ZXJTdGF0dXMiLCJFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJfZGljZVJlc3VsdCIsIl9tdWx0aXBsaWVyIiwiUm9sbFR3b0RpY2VzIiwiRGF0YSIsInJlc3VsdCIsIkRpY2UiLCJDYXNoIiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJDYXNoR2l2ZW4iLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiQ2FzaENvc3QiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIl9hbW91bnQiLCJtb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsIk1hcmtldGluZ0Ftb3VudCIsInJvdW5kIiwiX2FjdG9yc0FycmF5IiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tQWN0b3JzQXJyYXkiLCJfZGF0YSIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsInNldEN1c3RvbVByb3BlcnR5IiwiSXNBY3RpdmUiLCJEZWR1Y3QiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJEaWNlMVJlc3VsdCIsIkRpY2UyUmVzdWx0IiwiVG90YWxSZXN1bHQiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkhhc01hcmtldGluZ0NvbXBhbnkiLCJfbG9zZUFtb3VudCIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9tYXJrZXRpbmdBbW91bnQiLCJfbGF3eWVyU3RhdHVzIiwiX2J1c2luZXNzQW1vdW50IiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJfaGFzTWFya2V0aW5nQW1vdW50IiwiX3RvdGFsQW1vdW50IiwiX21hcmtldEFtb3VudCIsIl9pbmNyZWFzZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJiaWxsIiwiaXNFdmVuIiwiUm9sbE9uZURpY2UiLCJJc0V2ZW4iLCJfSEJBbW91bnQiLCJfQk1BbW91bnQiLCJfbG9jYXRpb25zIiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJfVG90YWxCdXNpbmVzc2VzIiwiX3Byb2ZpdCIsIl9Ub3RhbFByb2ZpdCIsIkdldE1hcmtldGluZ01vbmV5IiwiRGljZVJlc3VsdCIsIkNhc2hNdWxpdHBsaWVyIiwiX2hpcmVkTGF3eWVyIiwibGF3eWVyIiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsImhvbWVCYXNlZEJ1c2luZXNzIiwiYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyIsImhvbWVNdWx0aXBsaWVyIiwiYnJpY2tNdWxpcGxpZXIiLCJ0b3RhbEFtb3VudCIsIl9jb3VydFNldHRsZW1lbnRGZWVzIiwiVHlwZSIsIlRvdGFsQW1vdW50IiwidGVtcFR5cGUiLCJfYnVzaW5lc3NUeXBlIiwiQnVzaW5lc3NUeXBlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJfVG90YWxCTSIsIl9Ub3RhbEJNTG9jYXRpb25zIiwiVG90YWwiLCJfVG90YWxIQiIsIkNhc2hNdWxpdHBsaWVyMSIsIkNhc2hNdWxpdHBsaWVyMiIsIl9maW5lIiwiRmluZSIsIlRvZ2dsZUhhbGZQYXlOZXh0VHVybiIsIk5leHRUdXJuSGFsZlBheURheUNvdW50ZXIiLCJfZmVlcyIsIl9sb2FuUmVzZXQiLCJCTUJ1c2luZXNzIiwiRW5hYmxlU2VsZXRpdmVEb3VibGVQYXlEYXlfQnVzaW5lc3NQYXlEYXlVSVNldHVwIiwiU2VsZWN0UGxheWVyUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbiIsIkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLElBQWpCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLElBQXBCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLElBQW5CO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLElBQXRCO0FBQ0EsSUFBSUMsVUFBSjtBQUNBLElBQUlDLG9CQUFvQixHQUFHLElBQTNCO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLElBQXRCLEVBRUE7QUFDQTtBQUVBOztBQUNBLElBQUlDLGFBQWEs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Q0FBMUQsQ0FBMkYsSUFBM0Y7QUFDQSxTQUFLak0sWUFBTCxDQUFrQixFQUFsQixFQUFzQixLQUF0QjtBQUNELEdBMTREc0I7QUE0NER2QnVELEVBQUFBLG1CQTU0RHVCLGlDQTQ0REQ7QUFDcEIxSCxJQUFBQSx3QkFBd0IsQ0FBQzJHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRHlKLCtCQUFwRDtBQUNBLFNBQUtsTSxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEtBQXRCO0FBQ0Q7QUEvNERzQixDQUFULENBQWhCO0FBaTVEQW1NLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5OLFNBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIExvc3Nlc0RhdGEgPSBudWxsO1xyXG52YXIgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbnZhciBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG52YXIgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxudmFyIFRpbWVvdXRSZWY7XHJcbnZhciBDb21wbGV0aW9uV2luZG93VGltZSA9IDgwMDA7XHJcbnZhciBMb25nTWVzc2FnZVRpbWUgPSA1MDAwO1xyXG5cclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tU3BhY2VzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1TcGFjZVR5cGUgPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFdpbGRDYXJkOiAxLFxyXG4gIEJpZ0J1c2luZXNzOiAyLFxyXG4gIE1hcmtldGluZzogMyxcclxuICBJbnZlc3Q6IDQsXHJcbiAgTG9zc2VzOiA1LFxyXG4gIFBheURheTogNixcclxuICBEb3VibGVQYXlEYXk6IDcsXHJcbiAgT25lUXVlc3Rpb246IDgsXHJcbiAgU2VsbDogOSxcclxuICBCdXlPclNlbGw6IDEwLFxyXG4gIEdvQmFja1NwYWNlczogMTEsXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgY2FyZCBkYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkNhcmREYXRhXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgSUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklkIG9mIHRoZSBjYXJkXCIsXHJcbiAgICB9LFxyXG4gICAgRGVzY3JpcHRpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVzY3JpcHRpb25cIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImRlc2NyaXB0aW9uIG9mIHRoZSBjYXJkXCIsXHJcbiAgICB9LFxyXG4gICAgSGFzQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhhc0J1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSBpbnRlcmFjdGlvbiBidXR0b25cIixcclxuICAgIH0sXHJcbiAgICBIYXNUd29CdXR0b25zOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhhc1R3b0J1dHRvbnNcIixcclxuICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZiB0aGlzIGNhcmQgc2hvdWxkIGhhdmUgdHdvIGludGVyYWN0aW9uIGJ1dHRvblwiLFxyXG4gICAgfSxcclxuICAgIEhhc1RocmVlQnV0dG9uczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIYXNUaHJlZUJ1dHRvbnNcIixcclxuICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZiB0aGlzIGNhcmQgc2hvdWxkIGhhdmUgdGhyZWUgaW50ZXJhY3Rpb24gYnV0dG9uXCIsXHJcbiAgICB9LFxyXG4gICAgQnV0dG9uTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXR0b25OYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlY29uZEJ1dHRvbk5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Vjb25kQnV0dG9uTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiU2Vjb25kIGJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGhpcmRCdXR0b25OYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNlY29uZEJ1dHRvbk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlNlY29uZCBidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJDYXJkVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUb2FzdE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG9hc3ROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJub2RlIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvYXN0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG9hc3RMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1dHRvbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludGVyYWN0aW9uQnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbnRlcmFjdGlvbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZXJhY3Rpb24gQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludGVyYWN0aW9uVHdvQnV0dG9uc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwidHdvIGludGVyYWN0aW9uIEJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBJbnRlcmFjdGlvblRocmVlQnV0dG9uc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJ0aHJlZSBpbnRlcmFjdGlvbiBCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ29tcGxldGlvblRvYXN0Tm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb21wbGV0aW9uVG9hc3ROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJub2RlIHJlZmVyZW5jZSBmb3IgY29tcGxlaW9uIHRvYXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDb21wbGV0aW9uVG9hc3RMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb21wbGV0aW9uVG9hc3RMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgY29tcGxlaW9uIHRvYXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgZGVja3MgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGVja3NEYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiRGVja3NEYXRhXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1haW5VSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluVUlcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQ2FyZFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgb2YgZGVja3NcIixcclxuICAgIH0sXHJcbiAgICBCaWdCdXNpbmVzczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCaWdCdXNpbmVzc1wiLFxyXG4gICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBiaWcgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBNYXJrZXRpbmc6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nXCIsXHJcbiAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIGNhcmRzIGRhdGEgZm9yIG1hcmtldGluZ1wiLFxyXG4gICAgfSxcclxuICAgIExvc3Nlczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb3NzZXNcIixcclxuICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgY2FyZHMgZGF0YSBmb3IgbG9zc2VzXCIsXHJcbiAgICB9LFxyXG4gICAgV2lsZENhcmRzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldpbGRDYXJkc1wiLFxyXG4gICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBXaWxkQ2FyZHNcIixcclxuICAgIH0sXHJcbiAgICBTcGFjZXNUeXBlOiB7XHJcbiAgICAgIHR5cGU6IEVudW1TcGFjZVR5cGUsXHJcbiAgICAgIGRlZmF1bHQ6IEVudW1TcGFjZVR5cGUuTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInN0YXRlcyBtYWNoaW5lcyBieSB0eXBlIG9mIGNhcmQgb3Igc3BhY2VzIG9uIGJvYXJkXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsRGF0YSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICBUaW1lb3V0UmVmID0gbnVsbDtcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuUmVzZXRBbGxEYXRhKCk7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IC0xO1xyXG4gICAgdGhpcy5DYXJkU2VsZWN0ZWQgPSAtMTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzT3duZXIgPSBmYWxzZTtcclxuXHJcbiAgICAvL3RoaXMuQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShcIjFcIik7XHJcbiAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAvLyB0aGlzLkNvdW50ZXI9MDtcclxuICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTaG93Q2FyZFwiLCB0aGlzLlNob3dDYXJkSW5mbywgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJTaG93Q2FyZFwiLCB0aGlzLlNob3dDYXJkSW5mbywgdGhpcyk7XHJcbiAgfSxcclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBnZXRSYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICB9LFxyXG5cclxuICBUb2dnbGVCdXR0b25zKF9pc093bmVyLCBfaGFzQnV0dG9uID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfaGFzVHdvQnV0dG9uID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNPd25lciAmJiBfaGFzQnV0dG9uKSB7XHJcbiAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKF9oYXNUd29CdXR0b24pIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChfaXNPd25lciAmJiAhX2hhc0J1dHRvbikge1xyXG4gICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5NYWluVUkuQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuRXhpdENhcmRJbmZvKCk7XHJcbiAgICAgICAgfSwgMzIwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZChfaXNPd25lciwgX3JhbmRvbVZhbHVlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5CaWdCdXNpbmVzcztcclxuICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICBpZiAodGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKSB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG5cclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbiwgX2lzQm90LCB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5NYXJrZXRpbmc7XHJcbiAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXggPSBfcmFuZG9tVmFsdWU7XHJcbiAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgIGlmICh0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG5cclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QsIHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkxvc3NlcztcclxuICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXggPSBfcmFuZG9tVmFsdWU7XHJcbiAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuXHJcbiAgICBpZiAodGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKSB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKSB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uU2Vjb25kQnV0dG9uTmFtZTtcclxuXHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbiwgX2lzQm90LCB0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKTtcclxuXHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdlbmVyYXRlUmFuZG9tV2lsZENhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuV2lsZENhcmQ7XHJcbiAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgIGlmICh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG5cclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QsIHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3BhY2VJbnZlc3QoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkludmVzdDtcclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBpbnZlc3Qgb25lIG1vcmUgdGltZSBpbiBHb2xkIG9yIHN0b2NrcyB0aGlzIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIm1zZ1wiLCAyMTAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTcGFjZVBheURheShfaXNPd25lciwgX2luZGV4KSB7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBQYXlEYXkgc3BhY2UuXCIsIHRydWUpO1xyXG4gICAgdGhpcy5QYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCBmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgU3BhY2VEb3VibGVQYXlEYXkoX2lzT3duZXIsIF9pbmRleCkge1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gRG91YmxlUGF5RGF5IHNwYWNlLlwiLCB0cnVlKTtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFNwYWNlT25lUXVlc3Rpb24oX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uO1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGFzayBvbmUgcXVlc3Rpb24gdG8gYW55IG90aGVyIHBsYXllciwgaWYgcGxheWVyIGlzIHVuYWJsZSB0byBhbnN3ZXIgdGhleSB3aWxsIHBheSB5b3Ugc29tZSBjYXNoIGFtb3VudC5cIiwgdHJ1ZSk7XHJcbiAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3BhY2VTZWxsKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5TZWxsO1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIHNlbGwgYW55IG9uZSBvZiB5b3VyIGJ1c2luZXNzIG9yIGNhbiBza2lwIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNwYWNlQnV5T3JTZWxsKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5CdXlPclNlbGw7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gQnV5IG9yIHNlbGwgR29sZCBvciBzdG9ja3Mgb25lIG1vcmUgdGltZSBpbiB0aGlzIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNwYWNlR29CYWNrU3BhY2VzKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5Hb0JhY2tTcGFjZXM7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcInlvdSB3aWxsIGhhdmUgdG8gZ28gYmFjayAzIHNwYWNlcy5cIiwgdHJ1ZSk7XHJcbiAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNob3dDYXJkSW5mbzogZnVuY3Rpb24gKG1lc3NhZ2UsIF9zdGF0ZSkge1xyXG4gICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdENhcmRJbmZvKCkge1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcblxyXG4gICAgLy9mb3IgdGVzdGluZ1xyXG4gICAgLy8gdGhpcy5Db3VudGVyKys7XHJcbiAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgfSxcclxuXHJcbiAgVHdvQnV0dG9uc0Z1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24obnVsbCwgMSk7XHJcbiAgfSxcclxuXHJcbiAgQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbihldmVudCA9IG51bGwsIF90eXBlID0gMCkge1xyXG4gICAgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkJpZ0J1c2luZXNzKSB7XHJcbiAgICAgIGlmIChCaWdCdXNpbmVzc0RhdGEgPT0gbnVsbCkgdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgIGVsc2UgdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCBmYWxzZSwgX3R5cGUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5Mb3NzZXMpIHtcclxuICAgICAgaWYgKExvc3Nlc0RhdGEgPT0gbnVsbCkgdGhpcy5Mb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgdHJ1ZSwgX3R5cGUpO1xyXG4gICAgICBlbHNlIHRoaXMuTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsIGZhbHNlLCBfdHlwZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLk1hcmtldGluZykge1xyXG4gICAgICBpZiAoTWFya2V0aW5nRGF0YSA9PSBudWxsKSB0aGlzLk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgIGVsc2UgdGhpcy5NYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgZmFsc2UsIF90eXBlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuV2lsZENhcmQpIHtcclxuICAgICAgaWYgKFdpbGRDYXJkRGF0YSA9PSBudWxsKSB0aGlzLldpbGRDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgdHJ1ZSwgX3R5cGUpO1xyXG4gICAgICBlbHNlIHRoaXMuV2lsZENhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCBmYWxzZSwgX3R5cGUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5TZWxsKSB7XHJcbiAgICAgIHRoaXMuU2VsbEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuSW52ZXN0KSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0RnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5CdXlPclNlbGwpIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uKSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkdvQmFja1NwYWNlcykge1xyXG4gICAgICB0aGlzLkdvQmFja0Z1bmN0aW9uYWxpdHkoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja0xvYW4oKSB7XHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciB2YWwgPSAtMTtcclxuICAgIHZhbCA9IF9sb2FuVGFrZW4gPT0gdHJ1ZSA/IDEgOiAwO1xyXG4gICAgdmFyIFJlc3VsdCA9IGNjLnYyKHZhbCwgX2J1c2luZXNzSW5kZXgpO1xyXG4gICAgcmV0dXJuIFJlc3VsdDtcclxuICB9LFxyXG5cclxuICBEb25lQnV0dG9uQ2xpY2tlZCgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICBfbWFuYWdlci5SZXNldENhcmREaXNwbGF5KCk7XHJcbiAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICB0aGlzLkNvbXBsZXRpb25XaW5kb3coXCJcIiwgZmFsc2UsIHRoaXMuaXNPd25lciwgZmFsc2UpO1xyXG4gICAgY29uc29sZS5lcnJvcihcImRvbmUgY2xpY2tlZFwiKTtcclxuICB9LFxyXG5cclxuICBDb21wbGV0aW9uV2luZG93KG1lc3NhZ2UsIF9zdGF0ZSwgX2lzT3duZXIsIF9pc0JvdCkge1xyXG4gICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5Db21wbGV0aW9uVG9hc3RMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xyXG5cclxuICAgICAgICBpZiAoX2lzT3duZXIpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Eb25lQnV0dG9uQ2xpY2tlZCgpO1xyXG4gICAgICAgICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLk1haW5VSS5Db21wbGV0aW9uVG9hc3RMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdExhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ29tcGxldGVUdXJuV2l0aFRvYXN0KF9tc2csIF90aW1lLCBfY2hhbmdlVHVybiA9IHRydWUpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5Db21wbGV0aW9uV2luZG93KFwiXCIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9tc2cpO1xyXG4gICAgICB2YXIgX2RlbGF5ID0gdGhpcy5nZXRSYW5kb20oTG9uZ01lc3NhZ2VUaW1lLCBMb25nTWVzc2FnZVRpbWUgKyAyMDAwKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgICAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICAgIH0sIF9kZWxheSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX21zZyAhPSBcIlwiICYmICFfY2hhbmdlVHVybikge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX21zZywgTG9uZ01lc3NhZ2VUaW1lLCB0aGlzLmlzT3duZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoX2NoYW5nZVR1cm4pIHtcclxuICAgICAgICBpZiAodGhpcy5pc093bmVyKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRpb25XaW5kb3coX21zZywgdHJ1ZSwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5SZXNldENhcmREaXNwbGF5KCk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgIH0sIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduU2Vjb25kU2NyZWVuRGF0YShfaXNCb3QsIF9pc093bmVyLCBfaGFzQnV0dG9uLCBfbXNnLCBfTGFiZWxSZWYsIF9idXR0b25OYW1lKSB7XHJcbiAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhfbXNnLCB0cnVlKTtcclxuXHJcbiAgICAgIF9MYWJlbFJlZi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IF9idXR0b25OYW1lO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIF9oYXNCdXR0b24sIF9pc0JvdCk7XHJcblxyXG4gICAgICBpZiAoX2lzT3duZXIpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuRG9uZUJ1dHRvbkNsaWNrZWQoKTtcclxuICAgICAgICB9LCAxNTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLCBfdHlwZSA9IDApIHtcclxuICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICBJbmRleCA9IEluZGV4IC0gMTtcclxuXHJcbiAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICBjYXNlIFwiMVwiOiAvL3JlY2VpdmUgMjAwMDAkIGdpZnQgdG8gcGF5b2ZmIGxvYW5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfcmVzdWx0ID0gdGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICB2YXIgSXNMb2FuVGFrZW4gPSBfcmVzdWx0Lng7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX3Jlc3VsdC55O1xyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChJc0xvYW5UYWtlbiA9PSAxKSB7XHJcbiAgICAgICAgICAvL21lYW5zIHVzZXIgaGFzIHRha2VuIGxvYW5cclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSAyMDAwMDtcclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgX2NhcmRJbmZvID0gXCJMb2FuIGFtb3VudCBvZiAkMjAwMDAgaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfY2FyZEluZm8gPSBcIllvdSBoYXZlIG5vdCB0YWtlbiBhbnkgbG9hbiwgdHVybiB3aWxsIHNraXAgbm93LlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoX2NhcmRJbmZvLCA1MDAwLCB0cnVlKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIyXCI6IC8vaGlyZSBsYXd5ZXJcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfY2FyZEluZm8gPSBcIlwiO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cykge1xyXG4gICAgICAgICAgX2NhcmRJbmZvID0gXCJZb3UgaGF2ZSBhbHJlYWR5IGhpcmVkIGxheXdlciwgdHVybiB3aWxsIHNraXAgbm93LlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICBfY2FyZEluZm8gPSBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llci5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KF9jYXJkSW5mbywgNTAwMCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiM1wiOiAvL1lvdSBkbyBhIFRyYWRlIFNob3cgZm9yIG9uZSBvZiB5b3VyIGJ1c2luZXNzZXMgYW5kIGdldCBzb21lIG5ldyBjbGllbnRzLiBDaG9vc2Ugb25lIG9mIHlvdXIgYnVzaW5lc3NlcyBhbmQgcm9sbCBhIFBheURheSByb2xsIHJpZ2h0IG5vdy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICB9LCAyNDAwKTtcclxuXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNFwiOiAvL0EgZnJpZW5kIGdpdmVzIHlvdSBhIHN1Z2dlc3Rpb24gb24gYSBzdG9jayB0byBidXkuIFBsYWNlIHlvdXIgaW52ZXN0bWVudCBhbW91bnQgb24gdGhlIHRhYmxlIGFuZCByb2xsLiBUaGUgcmVzdWx0LCBtdWx0aXBsaWVkIGJ5ICQxLDAwMCwgaXMgdGhlIGFtb3VudCBvZiBlYWNoIHNoYXJlIG9mIHN0b2NrLiBZb3UgY2FuIGJ1eSB0aGlzIHN0b2NrIG5vdyBpZiB5b3Ugd291bGQgbGlrZS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbihudWxsLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNVwiOiAvL1lvdSByZXNlcnZlIGEgcHJpdmF0ZSBZYWNodCBmb3IgYSB3ZWVrIGxvbmcgdmFjYXRpb24uIFJvbGwgYm90aCBkaWUsIG11bHRpcGx5IHRoZSByZXN1bHQgYnkgJDMsMDAwLiBQYXkgdGhlIEJhbmsgeW91ciB2YWNhdGlvbiBjb3N0IGFuZCBsb3NlIHlvdXIgbmV4dCB0dXJuIGJhc2tpbmcgaW4geW91ciBwcml2YXRlIHN1bi5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfZGljZVJlc3VsdDtcclxuICAgICAgICB2YXIgX211bHRpcGxpZXIgPSAzMDAwO1xyXG4gICAgICAgIHZhciBfcmVzdWx0O1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICBfcmVzdWx0ID0gX211bHRpcGxpZXIgKiBfZGljZVJlc3VsdDtcclxuICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9yZXN1bHQsIERpY2U6IF9kaWNlUmVzdWx0IH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIENvc3QgQ2FsY3VsYXRlZCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIiAqIFwiICsgX211bHRpcGxpZXIgKyBcIiA9ICRcIiArIF9yZXN1bHQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfZGljZVJlc3VsdCA9IEJpZ0J1c2luZXNzRGF0YS5EYXRhLkRpY2U7XHJcbiAgICAgICAgICBfcmVzdWx0ID0gQmlnQnVzaW5lc3NEYXRhLkRhdGEucmVzdWx0O1xyXG5cclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX3Jlc3VsdCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX3Jlc3VsdDtcclxuICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcE5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNvc3QgJFwiICsgX3Jlc3VsdCArIFwiIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBwYWlkLCB5b3Ugd2lsbCBhbHNvIGxvc2UgeW91ciBuZXh0IHR1cm4sIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBjYXNoLHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI2XCI6IC8vWW91ciBwYXJlbnRzIGdpdmUgeW91ICQyMCwwMDAgdG93YXJkcyBzdGFydGluZyBhIG5ldyBidXNpbmVzcyBvciBpbnZlc3RpbmcgaW4geW91ciBjdXJyZW50IGJ1c2luZXNzLiBDaG9vc2Ugd2hpY2ggYW5kIHBsYXkgYWNjb3JkaW5nIHRvIHRoZSBnYW1lIHJ1bGVzLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIENhc2hHaXZlbiA9IDIwMDAwO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgIGlmIChfdHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vc3RhcnQgbmV3IGJ1c2luZXNzXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSwgMCwgZmFsc2UsIDAsIHRydWUsIENhc2hHaXZlbiwgZmFsc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vaW52ZXN0IGluIGV4aXN0aW5nIGJ1c2luZXNzXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24obnVsbCwgdHJ1ZSwgQ2FzaEdpdmVuLCBmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXMgYm90LCBzbyBza2lwcGluZyB0dXJuXCIpO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiN1wiOiAvL1lvdSBpbmhlcml0IGEgYnVzaW5lc3MgZnJvbSB5b3VyIEZhdGhlci4gRGVjaWRlIHRoZSB0eXBlIG9mIGJ1c2luZXNzIGl0IGlzLCB3aGF0IHRoZSBuYW1lIG9mIHRoZSBidXNpbmVzcyBpcywgd2hldGhlciBpdCBpcyBhIGhvbWUtYmFzZWQgb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3MgYW5kIGluY2x1ZGUgaXQgaW50byB5b3VyIGdhbWUgcGxheS4gUGF5IGEgJDIwLDAwMCB0cmFuc2ZlciBmZWUuIElmIHlvdSBkbyBub3QgaGF2ZSAkMjAsMDAwIGluIGNhc2gsIHlvdSBjYW5ub3QgaGF2ZSB0aGUgYnVzaW5lc3MuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgQ2FzaENvc3QgPSAyMDAwMDtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICBpZiAoX3R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAvL3BheSBhbW91bnRcclxuICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBDYXNoQ29zdCkge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBDYXNoQ29zdDtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSwgMCwgZmFsc2UsIDAsIHRydWUsIDAsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIsIDMwMCwgdGhpcy5pc093bmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vc2tpcFxyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlNraXBwaW5nLi4uXCIsIDE0MDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIGJvdCwgc28gc2tpcHBpbmcgdHVyblwiKTtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjhcIjogLy9kb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheSBkYXlcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwgMTgwMCk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiOVwiOiAvL1lvdSBidXkgYSB0ZWxldmlzaW9uIHN0YXRpb24gYW5kIGNvbnZpbmNlIGV2ZXJ5IHBsYXllciBpbiB0aGUgZ2FtZSB0byBtYXJrZXQgb24geW91ciBzdGF0aW9uIG9uZSB0aW1lLiBZb3UgcmVjZWl2ZSA1MCUgb2YgYWxsIHRoZSBtYXJrZXRpbmcgZG9sbGFycyBjdXJyZW50bHkgb24gdGhlIGJvYXJkLiBSb3VuZCB0byB0aGUgbmVhcmVzdCAkMSwwMDAgaWYgbmVlZGVkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBfYW1vdW50ID0gX2Ftb3VudCArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfYW1vdW50ID0gX2Ftb3VudCAvIDI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2YWx1ZTogXCIgKyBfYW1vdW50KTtcclxuICAgICAgICBfYW1vdW50ID0gTWF0aC5yb3VuZChfYW1vdW50IC8gMTAwMCkgKiAxMDAwO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJvdW5kZWQgdmFsdWU6IFwiICsgX2Ftb3VudCk7XHJcblxyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG5cclxuICAgICAgICBpZiAobW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICB2YXIgX2FjdG9yc0FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIF9kYXRhID0gX2FjdG9yc0FycmF5W2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgICAgICBfZGF0YS5NYXJrZXRpbmdBbW91bnQgPSBNYXRoLnJvdW5kKF9kYXRhLk1hcmtldGluZ0Ftb3VudCAvIDIpO1xyXG4gICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX2RhdGEpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKF9hY3RvcnNBcnJheSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IE1hdGgucm91bmQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudCAvIDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJDYXNoIGFtb3VudCAkXCIgKyBfYW1vdW50ICsgXCIgaGFzIHN1Y2Nlc3NmdWxseSBhZGRlZCwgY2FzaCBiYWxhbmNlIGJlY29tZXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MDAwKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMFwiOiAvL1lvdSBzdGFydCBhbiBPbmxpbmUgVW5pdmVyc2l0eSBmb3IgRW50cmVwcmVuZXVycyBhbmQgY2hhcmdlICQ1LDAwMCBwZXIgc3R1ZGVudC4gRXZlcnkgcGxheWVyIGluIHRoZSBnYW1lIG11c3QgdGFrZSB5b3VyIGNsYXNzIGFuZCBsZWFybiBmcm9tIHlvdS4gUmVjZWl2ZSB0dWl0aW9uIGZyb20gZWFjaCBwbGF5ZXIgcmlnaHQgbm93LlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgICAgICBpZiAobW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL3JlYWwgcGxheWVyc1xyXG5cclxuICAgICAgICAgIHZhciBfYWN0b3JzQXJyYXkgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChfYWN0b3JzQXJyYXlbaW5kZXhdLklzQWN0aXZlICYmIGluZGV4ICE9IF9wbGF5ZXJJbmRleCkge1xyXG4gICAgICAgICAgICAgIF9hbW91bnQgKz0gNTAwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBfZGF0YSA9IHsgRGVkdWN0OiA1MDAwIH07XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIxLCBfZGF0YSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiQ2FzaCBhbW91bnQgJFwiICsgX2Ftb3VudCArIFwiIGhhcyBzdWNjZXNzZnVsbHkgYWRkZWQsIGNhc2ggYmFsYW5jZSBiZWNvbWVzICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDAwMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgICAgIHZhciBfYWN0b3JzQXJyYXkgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSBfcGxheWVySW5kZXgpIHtcclxuICAgICAgICAgICAgICBpZiAoX2FjdG9yc0FycmF5W2luZGV4XS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICAgICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uQ2FzaCAtPSA1MDAwO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoX2FjdG9yc0FycmF5W2luZGV4XS5DYXNoIDwgNTAwMCkge1xyXG4gICAgICAgICAgICAgICAgX2FjdG9yc0FycmF5W2luZGV4XS5DYXNoID0gMDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArPSA1MDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNhc2ggYW1vdW50ICRcIiArIF9hbW91bnQgKyBcIiBoYXMgc3VjY2Vzc2Z1bGx5IGFkZGVkLCBjYXNoIGJhbGFuY2UgYmVjb21lcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjExXCI6IC8vcm9sbCBkaWNlIHR3aWNlLCBpZiByZXN1bHQgaXMgPjE5IHRoZW4gdGFrZSBhbGwgbW9uZXkgaW5zaWRlIG1hcmtldGluZy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgICAgICB2YXIgRGljZTFSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICB2YXIgRGljZTJSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgdmFyIFRvdGFsUmVzdWx0ID0gRGljZTFSZXN1bHQgKyBEaWNlMlJlc3VsdDtcclxuXHJcbiAgICAgICAgaWYgKFRvdGFsUmVzdWx0ID49IDE5KSB7XHJcbiAgICAgICAgICB2YXIgX2Ftb3VudCA9IDA7XHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIF9hbW91bnQgPSBfYW1vdW50ICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRGljZSAxIFJlc3VsdDogXCIgKyBEaWNlMVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIDIgUmVzdWx0OiBcIiArIERpY2UyUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsOiBcIiArIFRvdGFsUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkFtb3VudCAkXCIgKyBfYW1vdW50ICsgXCIgaGFzIHN1Y2Nlc3NmdWxseSBhZGRlZCBpbiB5b3VyIGNhc2ggZnJvbSBtYXJrZXRpbmcgYW1vdW50IG9uIHRhYmxlLlwiLCA0MDAwKTtcclxuXHJcbiAgICAgICAgICBpZiAobW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHZhciBfYWN0b3JzQXJyYXkgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgX2RhdGEgPSBfYWN0b3JzQXJyYXlbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgX2RhdGEuTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX2RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIiArIERpY2UxUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgMiBSZXN1bHQ6IFwiICsgRGljZTJSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWw6IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiWW91IHJhbiBvdXQgb2YgbHVjaywgdHVybiB3aWxsIHNraXAgbm93XCIsIDQwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMlwiOiAvL1lvdSBvcGVuIGEgTWFya2V0aW5nIENvbXBhbnkuIFlvdSBub3cgY29sbGVjdCBvbmUgZG9sbGFyIGZvciBldmVyeSBtYXJrZXRpbmcgZG9sbGFyIHRoYXQgaXMgc3BlbnQgb3IgY29sbGVjdGVkIGluIHRoZSBnYW1lIChjb2xsZWN0IGZyb20gdGhlIEJhbmspLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgaWYgKG1vZGUgPT0gMikge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5IYXNNYXJrZXRpbmdDb21wYW55ID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRnJvbSBub3cgb24sIGV2ZXJ5IHRpbWUgYSBwbGF5ZXIgcHV0cyBtb25leSBpbnRvIGEgbWFya2V0aW5nIGFjY291bnQsIHlvdSB3aWxsIHJlY2VpdmUgdGhlIHNhbWUgYW1vdW50IG9mIG1vbmV5IGluIHlvdXIgYWNjb3VudFwiLCA0MDAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5IYXNNYXJrZXRpbmdDb21wYW55ID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRnJvbSBub3cgb24sIGV2ZXJ5IHRpbWUgYSBwbGF5ZXIgcHV0cyBtb25leSBpbnRvIGEgbWFya2V0aW5nIGFjY291bnQsIHlvdSB3aWxsIHJlY2VpdmUgdGhlIHNhbWUgYW1vdW50IG9mIG1vbmV5IGluIHlvdXIgYWNjb3VudFwiLCA0MDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjE0XCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLCBfdHlwZSA9IDApIHtcclxuICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICBJbmRleCA9IEluZGV4IC0gMTtcclxuXHJcbiAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICBjYXNlIFwiMVwiOiAvL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICBlbHNlIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIyXCI6IC8vWW91IHB1dCBhbiBhZCBvbiBGYWNlYm9vayBmb3IgeW91ciBidXNpbmVzcy4gUm9sbCB0aGUgZGljZTogMSAtIElmIHlvdSByb2xsIGEgNiBvciBsb3dlciwgeW91IGxvc2UgYWxsIG9mIHRoZSBtb25leSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50IDIgLSBJZiB5b3Ugcm9sbCBhIDcgb3IgaGlnaGVyLCB5b3VyIGFkIG5ldHMgeW91IDgwMCUgb2YgdGhlIHRvdGFsIG1vbmV5IGN1cnJlbnRseSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9tYXJrZXRpbmdBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB2YXIgX2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gODAwO1xyXG4gICAgICAgIGlmIChfbWFya2V0aW5nQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICAgICAgTWFya2V0aW5nRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9kaWNlUmVzdWx0IH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIGlmIChfZGljZVJlc3VsdCA8PSA2KSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIGRpY2UgcmVzdWx0IGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBzaXgsIHNvIHlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgY3VycmVudCBtYXJrZXRpbmcgYW1vdW50LlwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJEb25lXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX2RpY2VSZXN1bHQgPj0gNykge1xyXG4gICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGwgUmVzdWx0IDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBkaWNlIHJlc3VsdCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gc2V2ZW4sIHNvIHlvdSB3aWxsIGdldCA4MDAlIHByb2ZpdCBvbiBjdXJyZW50IG1hcmtldGluZyBhbW91bnQuXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlJlY2VpdmUgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfZGljZVJlc3VsdCA9IE1hcmtldGluZ0RhdGEuRGF0YS5yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgaWYgKF9kaWNlUmVzdWx0IDw9IDYpIHtcclxuICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG5cclxuICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9kaWNlUmVzdWx0ID49IDcpIHtcclxuICAgICAgICAgICAgdmFyIF9yZXN1bHQgPSAoX21hcmtldGluZ0Ftb3VudCAqIF9tdWx0aXBsaWVyKSAvIDEwMCArIF9tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIHByb2ZpdCBvZiAkXCIgKyBfcmVzdWx0ICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudC5cIiwgMjQwMCk7XHJcbiAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjNcIjogLy9Zb3VyIGFkIGNvbnRhaW5zIGZhbHNlIGNsYWltcyBhbmQgcmVzdWx0IGluIGEgZ292ZXJubWVudCBpbnZlc3RpZ2F0aW9uLiBZb3UgbG9zZSB5b3VyIGVudGlyZSBNYXJrZXRpbmcgQWNjb3VudCwgcGx1cyBwYXkgbGF3eWVyIGZlZXMgb2YgJDMsMDAwIHBlciBidXNpbmVzcyB0byB0aGUgYmFuay4gSWYgeW91IGhhdmUgYSBsYXd5ZXIsIHlvdSBkbyBub3QgaGF2ZSB0byBwYXkgdGhlIGV4dHJhICQzLDAwMCBpbiBmZWVzLCBwZXIgYnVzaW5lc3MuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9tYXJrZXRpbmdBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB2YXIgX2xhd3llclN0YXR1cyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudCArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgdmFyIF9oYXNNYXJrZXRpbmdBbW91bnQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgX211bHRpcGxpZXIgPSAzMDAwO1xyXG4gICAgICAgIHZhciBfdG90YWxBbW91bnQgPSBfbXVsdGlwbGllciAqIF9idXNpbmVzc0Ftb3VudDtcclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIGlmIChfbWFya2V0aW5nQW1vdW50ID4gMCkgX2hhc01hcmtldGluZ0Ftb3VudCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpIF90b3RhbEFtb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgTWFya2V0aW5nRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF90b3RhbEFtb3VudCB9IH07XHJcblxyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIk1hcmtldGluZyBBbW91bnQgOiAkXCIgKyBfbWFya2V0aW5nQW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkxhd3llciBIaXJlZCA6IFwiICsgX2xhd3llclN0YXR1cyArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBOdW1iZXIgb2YgYnVzaW5lc3MgOiBcIiArIF9idXNpbmVzc0Ftb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJGZWVzIDogXCIgKyBfYnVzaW5lc3NBbW91bnQgKyBcIiAqIFwiICsgX211bHRpcGxpZXIgKyBcIiA9ICRcIiArIF90b3RhbEFtb3VudCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkRvbmVcIjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfdG90YWxBbW91bnQgPSBNYXJrZXRpbmdEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG5cclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX3RvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgaGlyZWQgbGF3eWVyLCB5b3Ugb25seSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbWFya2V0aW5nQW1vdW50LCA0MjAwKTtcclxuICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX3RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhdmUgbm90IGhpcmVkIGFueSBsYXd5ZXIsIGJpbGwgJFwiICsgX3RvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkIGFsb25nIHdpdGggbWFya2V0aW5nIGFtb3VudCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjRcIjogLy9Zb3VyIE1hcmtldGluZyBBY2NvdW50IHRyaXBsZXMsIGJ1dCB5b3UgbXVzdCBsZWF2ZSBpdCBpbiB0aGUgYWNjb3VudC5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX21hcmtldEFtb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHZhciBfbXVsdGlwbGllciA9IDM7XHJcbiAgICAgICAgdmFyIF9pbmNyZWFzZUFtb3VudCA9IF9tYW5hZ2VyLk11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpO1xyXG5cclxuICAgICAgICBpZiAoX2luY3JlYXNlQW1vdW50ID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJNYXJrZXRpbmcgQW1vdW50OiAkXCIgKyBfbWFya2V0QW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsOiBcIiArIF9tYXJrZXRBbW91bnQgKyBcIiAqIFwiICsgX211bHRpcGxpZXIgKyBcIiA9IFwiICsgX2luY3JlYXNlQW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJ5b3VyIG1hcmtldGluZyBhbW91bnQgaGFzIGJlZW4gc3VjZXNzZnVsbHkgaW5jcmVhc2UgdG8gJFwiICsgX2luY3JlYXNlQW1vdW50LCAzNjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI1XCI6IC8vWW91IGhpcmUgYSBNYXJrZXRpbmcgRmlybSB0byBtYXJrZXQgeW91ciBidXNpbmVzcyBidXQgaXQgeWllbGRzIG5vIHJlc3VsdHMuIFlvdSBsb3NlIHlvdXIgZW50aXJlIG1hcmtldGluZyBhY2NvdW50IHRvIHRoZSBCYW5rLiBQbHVzIHBheSAkNSwwMDAgZm9yIHRoZWlyIHNlcnZpY2VzLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBiaWxsID0gNTAwMDtcclxuICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBiaWxsKSB7XHJcbiAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBiaWxsO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJGZWVzICRcIiArIGJpbGwgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQgYWxvbmcgd2l0aCBtYXJrZXRpbmcgYW1vdW50LCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBjYXNoLHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNlwiOiAvL1lvdSBiZWdpbiBhIG5ldyBtYXJrZXRpbmcgY2FtcGFpZ24uIFJvbGwgMSBkaWUuIElmIGl0IGlzIGFuIGV2ZW4gbnVtYmVyLCB5b3VyIGNhbXBhaWduIGlzIHN1Y2Nlc3NmdWwgYW5kIHlvdSByZWNlaXZlIGFsbCBvZiB0aGUgbW9uZXkgaW4geW91ciBtYXJrZXRpbmcgYWNjb3VudCBiYWNrIHBsdXMgNTAwJS4gSWYgaXQgaXMgYW4gb2RkIG51bWJlciB5b3UgbG9zZSBhbGwgb2YgdGhlIG1vbmV5IGluIHlvdXIgbWFya2V0aW5nIGFjY291bnQuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9tYXJrZXRpbmdBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB2YXIgX2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gNTAwO1xyXG4gICAgICAgIHZhciBpc0V2ZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKF9tYXJrZXRpbmdBbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsT25lRGljZSgpO1xyXG5cclxuICAgICAgICAgIGlmIChfZGljZVJlc3VsdCAlIDIgPT0gMCkgaXNFdmVuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBNYXJrZXRpbmdEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX2RpY2VSZXN1bHQsIElzRXZlbjogaXNFdmVuIH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIGlmIChfZGljZVJlc3VsdCAlIDIgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGlzRXZlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIGRpY2UgcmVzdWx0IGlzIG9kZCwgc28geW91IHdpbGwgbG9zZSBhbGwgeW91ciBjdXJyZW50IG1hcmtldGluZyBhbW91bnQuXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkRvbmVcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChfZGljZVJlc3VsdCAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgIGlzRXZlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIGRpY2UgcmVzdWx0IGlzIGV2ZW4sIHNvIHlvdSB3aWxsIGdldCA1MDAlIHByb2ZpdCBvbiBjdXJyZW50IG1hcmtldGluZyBhbW91bnQuXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlJlY2VpdmUgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfZGljZVJlc3VsdCA9IE1hcmtldGluZ0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBpc0V2ZW4gPSBNYXJrZXRpbmdEYXRhLkRhdGEuSXNFdmVuO1xyXG5cclxuICAgICAgICAgIGlmICghaXNFdmVuKSB7XHJcbiAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMCkgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuXHJcbiAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc0V2ZW4pIHtcclxuICAgICAgICAgICAgdmFyIF9yZXN1bHQgPSAoX21hcmtldGluZ0Ftb3VudCAqIF9tdWx0aXBsaWVyKSAvIDEwMCArIF9tYXJrZXRpbmdBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBwcm9maXQgb2YgJFwiICsgX3Jlc3VsdCArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQuXCIsIDI0MDApO1xyXG4gICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI3XCI6IC8vWW91ciBTb2NpYWwgTWVkaWEgYWQgZ29lcyB2aXJhbCEgWW91IHJlY2VpdmUgYWxsIG9mIHlvdXIgTWFya2V0aW5nIEJ1ZGdldCBiYWNrLCBwbHVzICQ1LDAwMCBwcm9maXQgZm9yIGVhY2ggYnVzaW5lc3MgeW91IGhhdmUuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB2YXIgX0hCQW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgdmFyIF9CTUFtb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIHZhciBfVG90YWxCdXNpbmVzc2VzID0gX0hCQW1vdW50ICsgX0JNQW1vdW50ICsgX2xvY2F0aW9ucztcclxuICAgICAgICB2YXIgX3Byb2ZpdCA9IDUwMDA7XHJcbiAgICAgICAgdmFyIF9Ub3RhbFByb2ZpdCA9IF9Ub3RhbEJ1c2luZXNzZXMgKiBfcHJvZml0ICsgX21hcmtldEFtb3VudDtcclxuXHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBNYXJrZXRpbmdEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX1RvdGFsUHJvZml0IH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIGlzRXZlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJUb3RhbCBCdXNpbmVzc2VzICh3aXRoIGxvY2F0aW9ucykgOiBcIiArIF9Ub3RhbEJ1c2luZXNzZXMgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiTWFya2V0aW5nIEFtb3VudCA6IFwiICsgX21hcmtldEFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJQcm9maXQgb24gZWFjaCBCdXNpbmVzcyA6IFwiICsgX1RvdGFsQnVzaW5lc3NlcyArIFwiICogNTAwMCArIFwiICsgX21hcmtldEFtb3VudCArIFwiID0gXCIgKyBfVG90YWxQcm9maXQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJSZWNlaXZlXCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9fVG90YWxQcm9maXQgPSBNYXJrZXRpbmdEYXRhLkRhdGEucmVzdWx0O1xyXG5cclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfVG90YWxQcm9maXQ7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBwcm9maXQgb2YgJFwiICsgX1RvdGFsUHJvZml0ICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudC5cIiwgMjQwMCk7XHJcbiAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI4XCI6IC8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICBlbHNlIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI5XCI6IC8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG4gICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX2xvc2VBbW91bnQsIDI0MDApO1xyXG4gICAgICAgIGVsc2UgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEwXCI6IC8vUmVjZWl2ZSBhbGwgb2YgeW91ciBNYXJrZXRpbmcgQnVkZ2V0IGJhY2ssIHBsdXMgNzAwJSBwcm9maXQuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB2YXIgX3Byb2ZpdCA9IDcwMDtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IF9tYW5hZ2VyLkdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpO1xyXG5cclxuICAgICAgICBpZiAoX2Ftb3VudCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFxyXG4gICAgICAgICAgICBcIk1hcmtldGluZyBBbW91bnQ6ICRcIiArXHJcbiAgICAgICAgICAgICAgX21hcmtldEFtb3VudCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJUb3RhbDogXCIgK1xyXG4gICAgICAgICAgICAgIF9tYXJrZXRBbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiICsgKFwiICtcclxuICAgICAgICAgICAgICBfbWFya2V0QW1vdW50ICtcclxuICAgICAgICAgICAgICBcIipcIiArXHJcbiAgICAgICAgICAgICAgX3Byb2ZpdCArXHJcbiAgICAgICAgICAgICAgXCIgKS8xMDBcIiArXHJcbiAgICAgICAgICAgICAgXCIgPSBcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJ5b3VyIGNhc2ggYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIGJ5ICRcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIsIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIgK1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCxcclxuICAgICAgICAgICAgNDAwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMVwiOiAvL1lvdSBjYW4gaGlyZWQgYSBtZWRpYSBzcGVjaWFsaXN0IHRvIGRvIHlvdXIgc29jaWFsIG1lZGlhIG1hcmtldGluZyBmb3IgeW91LiBUaGV5IGluY3JlYXNlIHlvdXIgYnVzaW5lc3MnIHJlYWNoLiBZb3UgcmVjZWl2ZSBkb3VibGUgeW91ciBpbmNvbWUgb24geW91ciBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjE0XCI6IC8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG4gICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX2xvc2VBbW91bnQsIDIxMDApO1xyXG4gICAgICAgIGVsc2UgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyMTAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBMb3NzZXNDYXJkRnVuY3Rpb25hbGl0eShfaWQsIF9oYXNUd29TY3JlZW5zID0gZmFsc2UsIF90eXBlID0gMCkge1xyXG4gICAgdmFyIEluZGV4ID0gcGFyc2VJbnQoX2lkKTtcclxuICAgIEluZGV4ID0gSW5kZXggLSAxO1xyXG5cclxuICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgIGNhc2UgXCIxXCI6IC8vbG9zZSBuZXh0IHR1cm5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwTmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCBsb3NlIHlvdXIgbmV4dCB0dXJuLlwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjJcIjogLy9Sb2xsIDIgZGljZSwgbXVsdGlwbHkgYnkgJDUsMDAwIGFuZCBwYXkgaXQgdG8gdGhlIEJhbmsuIElmIHlvdSBoYXZlIGEgbGF3eWVyIHlvdSBsb3NlIDUwJSBvZiB0aGUgdG90YWwgYmlsbCBjdXJyZW50bHkgb3dlZC5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgRGljZVJlc3VsdDtcclxuICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgdmFyIFRvdGFsUmVzdWx0O1xyXG4gICAgICAgIHZhciBfaGlyZWRMYXd5ZXI7XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgQ2FzaE11bGl0cGxpZXIgPSA1MDAwO1xyXG4gICAgICAgICAgVG90YWxSZXN1bHQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgICBfaGlyZWRMYXd5ZXIgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuXHJcbiAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogVG90YWxSZXN1bHQsIGxhd3llcjogX2hpcmVkTGF3eWVyIH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGwgUmVzdWx0IDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIEJpbGwgQ2FsY3VsYXRlZCA6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gJFwiICsgVG90YWxSZXN1bHQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhMb3NzZXNEYXRhKTtcclxuICAgICAgICAgIFRvdGFsUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgIF9oaXJlZExhd3llciA9IExvc3Nlc0RhdGEuRGF0YS5sYXd5ZXI7XHJcblxyXG4gICAgICAgICAgaWYgKF9oaXJlZExhd3llcikgVG90YWxSZXN1bHQgPSBUb3RhbFJlc3VsdCAvIDI7XHJcblxyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBUb3RhbFJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAoX2hpcmVkTGF3eWVyKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIGhpcmVkIGxhd3llciwgaGFsZiBiaWxsICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYXZlIG5vdCBoaXJlZCBhbnkgbGF3eWVyLCBiaWxsICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBjYXNoLHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiM1wiOiAvL2xvc2UgYWxsIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9XaG9sZSh0cnVlKTtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBuZXh0IFBheSBEYXkuXCIsIDI0MDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNFwiOiAvL1llYXJseSBidXNpbmVzcyBpbnN1cmFuY2UgcHJlbWl1bSBpcyBkdWUuIFBheSAkMiwwMDAgdG8gdGhlIEJhbmsgZm9yIGVhY2ggSG9tZS1CYXNlZCBidXNpbmVzcywgJDUsMDAwIGZvciBlYWNoIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBob21lQmFzZWRCdXNpbmVzcyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBicmlja0FuZE1vcnRhckJ1c2luZXNzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgaG9tZU11bHRpcGxpZXIgPSAyMDAwO1xyXG4gICAgICAgIHZhciBicmlja011bGlwbGllciA9IDUwMDA7XHJcbiAgICAgICAgdmFyIHRvdGFsQW1vdW50ID0gaG9tZUJhc2VkQnVzaW5lc3MgKiBob21lTXVsdGlwbGllciArIGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgKiBicmlja011bGlwbGllcjtcclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiB0b3RhbEFtb3VudCB9IH07XHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFxyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEFtb3VudCA6IFwiICtcclxuICAgICAgICAgICAgICAgIGhvbWVCYXNlZEJ1c2luZXNzICtcclxuICAgICAgICAgICAgICAgIFwiICogJFwiICtcclxuICAgICAgICAgICAgICAgIGhvbWVNdWx0aXBsaWVyICtcclxuICAgICAgICAgICAgICAgIFwiID0gJFwiICtcclxuICAgICAgICAgICAgICAgIGhvbWVCYXNlZEJ1c2luZXNzICogaG9tZU11bHRpcGxpZXIgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiQnJpY2sgJiBNb3J0YXIgQW1vdW50IDogXCIgK1xyXG4gICAgICAgICAgICAgICAgYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyArXHJcbiAgICAgICAgICAgICAgICBcIiAqICRcIiArXHJcbiAgICAgICAgICAgICAgICBicmlja011bGlwbGllciArXHJcbiAgICAgICAgICAgICAgICBcIiA9ICRcIiArXHJcbiAgICAgICAgICAgICAgICBicmlja0FuZE1vcnRhckJ1c2luZXNzICogYnJpY2tNdWxpcGxpZXIgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQW1vdW50IDogXCIgK1xyXG4gICAgICAgICAgICAgICAgaG9tZUJhc2VkQnVzaW5lc3MgKiBob21lTXVsdGlwbGllciArXHJcbiAgICAgICAgICAgICAgICBcIiArIFwiICtcclxuICAgICAgICAgICAgICAgIGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgKiBicmlja011bGlwbGllciArXHJcbiAgICAgICAgICAgICAgICBcIiA9ICRcIiArXHJcbiAgICAgICAgICAgICAgICB0b3RhbEFtb3VudCxcclxuICAgICAgICAgICAgICB0cnVlXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRvdGFsQW1vdW50ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IHRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyB0b3RhbEFtb3VudCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBtb25leSwgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI1XCI6IC8vWW91ciBlbXBsb3llZSBjbGFpbXMgeW91IHNleHVhbGx5IGhhcmFzc2VkIHRoZW0sIGJ1dCB5b3UgZGlkIG5vdC4gWW91IGNhbiBlaXRoZXI7ICAxIC0gU2V0dGxlIG91dCBvZiBjb3VydCBhbmQgcGF5IHRoZW0gJDUwLDAwMC4gMiAtIFRha2UgeW91ciBjaGFuY2VzIGluIGNvdXJ0LiBSb2xsIDIgZGljZSBhbmQgcGF5ICQxMCwwMDAgdGltZXMgdGhlIG51bWJlciByb2xsZWQuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9jb3VydFNldHRsZW1lbnRGZWVzID0gNTAwMDA7XHJcbiAgICAgICAgdmFyIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gMTAwMDA7XHJcbiAgICAgICAgdmFyIHRvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIGlmIChfdHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vZmlyc3QgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX2NvdXJ0U2V0dGxlbWVudEZlZXMsIFR5cGU6IF90eXBlIH0gfTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlBheWFibGUgYW1vdW50IDogJFwiICsgX2NvdXJ0U2V0dGxlbWVudEZlZXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvLzJuZCBidXR0b25cclxuXHJcbiAgICAgICAgICAgIERpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgdG90YWxBbW91bnQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBEaWNlUmVzdWx0LCBUb3RhbEFtb3VudDogdG90YWxBbW91bnQsIFR5cGU6IF90eXBlIH0gfTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIEFtb3VudCA6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gJFwiICsgdG90YWxBbW91bnQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIHRlbXBUeXBlID0gTG9zc2VzRGF0YS5EYXRhLlR5cGU7XHJcbiAgICAgICAgICBpZiAodGVtcFR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICBfY291cnRTZXR0bGVtZW50RmVlcyA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX2NvdXJ0U2V0dGxlbWVudEZlZXMpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX2NvdXJ0U2V0dGxlbWVudEZlZXM7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgX2NvdXJ0U2V0dGxlbWVudEZlZXMgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGVtcFR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBEaWNlUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgdG90YWxBbW91bnQgPSBMb3NzZXNEYXRhLkRhdGEuVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gdG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgdG90YWxBbW91bnQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI2XCI6IC8vIElmIEJ1c2luZXNzICMxIGlzIEhvbWUgQmFzZWQsIHBheSBhICQ1LDAwMCBJbnN1cmFuY2UgRGVkdWN0aWJsZTsgaWYgQnJpY2sgJiBNb3J0YXIgJDEwLDAwMCBkZWR1Y3RpYmxlLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB2YXIgX2J1c2luZXNzVHlwZSA9IHBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgaWYgKF9idXNpbmVzc1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgLy8gZmlyc3QgYnVzaW5lc3Mgd2FzIGhvbWUgYmFzZWRcclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gNTAwMCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJDUwMDAgaW5zdXJhbmNlIG9uIHlvdXIgZmlyc3QgaG9tZSBiYXNlZCBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX2J1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2ZpcnN0IGJ1c2lvbmVzcyB3YXMgYnJpY2sgJiBtb3J0YXJcclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gMTAwMDApIHtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IDEwMDAwO1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBwYXllZCAkMTAwMDAgaW5zdXJhbmNlIG9uIHlvdXIgZmlyc3QgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI3XCI6IC8vbG9zZSB5b3VyIG5leHQgUGF5IERheSBmb3IgYWxsIG9mIHlvdXIgaG9tZS1iYXNlZCBidXNpbmVzc2VzLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKHRydWUpO1xyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSB5b3VyIG5leHQgUGF5IERheSBmb3IgYWxsIG9mIHlvdXIgaG9tZS1iYXNlZCBidXNpbmVzc2VzLlwiLCAyNDAwKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI4XCI6IC8vWW91IGFyZSBmaW5lZCA1MCUgb2YgeW91ciBjdXJyZW50IGxpcXVpZCBjYXNoLiBJZiB5b3UgaGF2ZSBhIGxhd3llciwgeW91ciBmaW5lIGlzIHJlZHVjZWQgdG8gMjAlIG9mIHlvdXIgY3VycmVudCBsaXF1aWQgY2FzaC5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgdmFyIF9oaXJlZExhd3llcjtcclxuXHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBUb3RhbFJlc3VsdCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICAgIF9oaXJlZExhd3llciA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG5cclxuICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBUb3RhbFJlc3VsdCwgbGF3eWVyOiBfaGlyZWRMYXd5ZXIgfSB9O1xyXG5cclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIENhc2ggOiAkXCIgKyBUb3RhbFJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCI1MCUgb2YgVG90YWwgQ2FzaCA6ICRcIiArIFRvdGFsUmVzdWx0IC8gMiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0RhdGEpO1xyXG4gICAgICAgICAgVG90YWxSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgX2hpcmVkTGF3eWVyID0gTG9zc2VzRGF0YS5EYXRhLmxhd3llcjtcclxuXHJcbiAgICAgICAgICBpZiAoX2hpcmVkTGF3eWVyKSBUb3RhbFJlc3VsdCA9IChUb3RhbFJlc3VsdCAqIDIwKSAvIDEwMDtcclxuICAgICAgICAgIGVsc2UgVG90YWxSZXN1bHQgPSAoVG90YWxSZXN1bHQgKiA1MCkgLyAxMDA7XHJcblxyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBUb3RhbFJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAoX2hpcmVkTGF3eWVyKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIGhpcmVkIGxhd3llciwgcmVkdWNlZCBmaW5lICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYXZlIG5vdCBoaXJlZCBhbnkgbGF3eWVyLCBmaW5lICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBubyBtb25leSwgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgODAwKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjlcIjogLy9BIGN1c3RvbWVyIGlzIGluanVyZWQgYXQgb25lIG9mIHlvdXIgYnVzaW5lc3MgbG9jYXRpb25zLiBZb3UgY2FuIGVpdGhlcjsgMSAtIFNldHRsZSBvdXQgb2YgY291cnQgYW5kIHBheSB0aGVtICQyNSwwMDAgLCAyIC0gVGFrZSB5b3VyIGNoYW5jZXMgaW4gY291cnQuIFJvbGwgMiBkaWNlIGFuZCBwYXkgJDUsMDAwIHRpbWVzIHRoZSBudW1iZXIgcm9sbGVkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfY291cnRTZXR0bGVtZW50RmVlcyA9IDI1MDAwO1xyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0O1xyXG4gICAgICAgIHZhciBDYXNoTXVsaXRwbGllciA9IDUwMDA7XHJcbiAgICAgICAgdmFyIHRvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIGlmIChfdHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vZmlyc3QgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX2NvdXJ0U2V0dGxlbWVudEZlZXMsIFR5cGU6IF90eXBlIH0gfTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlBheWFibGUgYW1vdW50IDogJFwiICsgX2NvdXJ0U2V0dGxlbWVudEZlZXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvLzJuZCBidXR0b25cclxuXHJcbiAgICAgICAgICAgIERpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgdG90YWxBbW91bnQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBEaWNlUmVzdWx0LCBUb3RhbEFtb3VudDogdG90YWxBbW91bnQsIFR5cGU6IF90eXBlIH0gfTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIEFtb3VudCA6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gJFwiICsgdG90YWxBbW91bnQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIHRlbXBUeXBlID0gTG9zc2VzRGF0YS5EYXRhLlR5cGU7XHJcbiAgICAgICAgICBpZiAodGVtcFR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICBfY291cnRTZXR0bGVtZW50RmVlcyA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX2NvdXJ0U2V0dGxlbWVudEZlZXMpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX2NvdXJ0U2V0dGxlbWVudEZlZXM7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgX2NvdXJ0U2V0dGxlbWVudEZlZXMgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGVtcFR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBEaWNlUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgdG90YWxBbW91bnQgPSBMb3NzZXNEYXRhLkRhdGEuVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gdG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgdG90YWxBbW91bnQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMFwiOiAvL1lvdXIgY29tcHV0ZXIgaGFzIGJlZW4gaGFja2VkISBZb3UgY2F0Y2ggaXQgaW4gdGltZSwgYnV0IHlvdSBtdXN0IGJ1eSBtb3JlIHNlY3VyaXR5IGZvciB5b3VyIGJ1c2luZXNzIHJlY29yZHMuIFBheSAkMjAsMDAwIHRvIHRoZSBCYW5rLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBiaWxsID0gMjAwMDA7XHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBiaWxsKSB7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gYmlsbDtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIGJpbGwgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMVwiOiAvL01vbGQgaXMgZGlzY292ZXJlZCBpbiBhbGwgdGhlIGJ1aWxkaW5ncyBvZiB5b3VyIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzZXMuIFJvbGwgMiBkaWUgYW5kIG11bHRpcGx5IGJ5ICQyLDAwMC4gUGF5IHRoYXQgYW1vdW50IHRvIGNsZWFuIHRoZSBidWlsZGluZyBvZiBFQUNIIG9mIHlvdXIgQnJpY2sgJiBNb3J0YXIgYnVzaW5lc3Nlcy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX1RvdGFsQk0gPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBfVG90YWxCTUxvY2F0aW9ucyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgdmFyIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gMjAwMDtcclxuICAgICAgICB2YXIgdG90YWxBbW91bnQ7XHJcbiAgICAgICAgaWYgKF9Ub3RhbEJNIDw9IDApIHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvIG5vdCBvd24gYW55IEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzLCBTa2lwcGluZyB0dXJuLlwiLCAyODAwKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgdG90YWxBbW91bnQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IERpY2U6IERpY2VSZXN1bHQsIFRvdGFsOiB0b3RhbEFtb3VudCB9IH07XHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIEJyaWNrICYgTW9ydGFyIEJ1c2luZXNzICh3aXRoIExvY2F0aW9ucykgOiBcIiArIChfVG90YWxCTSArIF9Ub3RhbEJNTG9jYXRpb25zKSArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJQYXlhYmxlIGFtb3VudCA6IFwiICsgRGljZVJlc3VsdCArIFwiKlwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIj0kXCIgKyB0b3RhbEFtb3VudCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIERpY2VSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEuRGljZTtcclxuICAgICAgICAgIHRvdGFsQW1vdW50ID0gTG9zc2VzRGF0YS5EYXRhLlRvdGFsO1xyXG5cclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IHRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBwYXllZCAkXCIgKyB0b3RhbEFtb3VudCArIFwiIHRvIGNsZWFuIG1vbGQgb24gdGhlIGJ1aWxkaW5nIG9mIEVBQ0ggb2YgeW91ciBCcmljayAmIE1vcnRhciBidXNpbmVzc2VzLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTJcIjogLy9JdCBpcyBNYXJjaCAxNXRoIGFuZCBidXNpbmVzcyBUYXggUmV0dXJucyBhcmUgZHVlLiBSb2xsIHRoZSBkaWNlIGZvciBlYWNoIG9mIHlvdXIgYnVzaW5lc3NlczsgMSAtIEZvciBlYWNoIGhvbWUtYmFzZWQgYnVzaW5lc3MsIHBheSAkMSwwMDAgdGltZXMgdGhlIGFtb3VudHMgcm9sbGVkIDIgLSBGb3IgZWFjaCBicmljayAmIG1vcnRhciBidXNpbmVzcywgcGF5ICQzLDAwMCB0aW1lcyB0aGUgYW1vdW50cyByb2xsZWRcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX1RvdGFsQk0gPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBfVG90YWxCTUxvY2F0aW9ucyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEhCID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgdmFyIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyMSA9IDEwMDA7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyMiA9IDMwMDA7XHJcbiAgICAgICAgdmFyIHRvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIERpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsT25lRGljZSgpO1xyXG4gICAgICAgICAgdG90YWxBbW91bnQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXIxICogX1RvdGFsSEIgKyBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXIyICogKF9Ub3RhbEJNICsgX1RvdGFsQk1Mb2NhdGlvbnMpO1xyXG4gICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyBEaWNlOiBEaWNlUmVzdWx0LCBUb3RhbDogdG90YWxBbW91bnQgfSB9O1xyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcclxuICAgICAgICAgICAgICBcIkRpY2UgUmVzdWx0IDogXCIgK1xyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdCArXHJcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBCcmljayAmIE1vcnRhciBCdXNpbmVzcyAod2l0aCBMb2NhdGlvbnMpIDogXCIgK1xyXG4gICAgICAgICAgICAgICAgKF9Ub3RhbEJNICsgX1RvdGFsQk1Mb2NhdGlvbnMpICtcclxuICAgICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsIEhvbWUgQmFzZWQgQnVzaW5lc3MgOiBcIiArXHJcbiAgICAgICAgICAgICAgICBfVG90YWxIQiArXHJcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJQYXlhYmxlIGFtb3VudCA6IFwiICtcclxuICAgICAgICAgICAgICAgIERpY2VSZXN1bHQgK1xyXG4gICAgICAgICAgICAgICAgXCIqXCIgK1xyXG4gICAgICAgICAgICAgICAgQ2FzaE11bGl0cGxpZXIxICtcclxuICAgICAgICAgICAgICAgIFwiKlwiICtcclxuICAgICAgICAgICAgICAgIF9Ub3RhbEhCICtcclxuICAgICAgICAgICAgICAgIFwiK1wiICtcclxuICAgICAgICAgICAgICAgIERpY2VSZXN1bHQgK1xyXG4gICAgICAgICAgICAgICAgXCIqXCIgK1xyXG4gICAgICAgICAgICAgICAgQ2FzaE11bGl0cGxpZXIyICtcclxuICAgICAgICAgICAgICAgIFwiKlwiICtcclxuICAgICAgICAgICAgICAgIChfVG90YWxCTSArIF9Ub3RhbEJNTG9jYXRpb25zKSArXHJcbiAgICAgICAgICAgICAgICBcIj0kXCIgK1xyXG4gICAgICAgICAgICAgICAgdG90YWxBbW91bnQsXHJcbiAgICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBEaWNlUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLkRpY2U7XHJcbiAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5Ub3RhbDtcclxuXHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSB0b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJFwiICsgdG90YWxBbW91bnQgKyBcIiB0YXggb24geW91ciBidXNpbmVzc2VzLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTNcIjogLy9Zb3UgbWFrZSBhIGJ1c2luZXNzIGRlYWwgd2l0aCBhIGZyaWVuZCBhbmQgc29vbiBhZnRlciwgdGhleSBhcmUgYXJyZXN0ZWQgZm9yIGZyYXVkLiBZb3UgYXJlIGludmVzdGlnYXRlZCBhcyB3ZWxsIGFuZCB5b3VyIGJyYW5kIHRha2VzIGEgaGl0LiBJZiB5b3UgaGF2ZSBhIGxhd3llciwgcGF5ICQxNSwwMDAgaW4gbGVnYWwgZmVlcy4gSWYgeW91IGRvIG5vdCBoYXZlIGEgbGF3eWVyLCBwYXkgJDQwLDAwMCBpbiBjb3VydCBmZWVzIHBsdXMgbG9vc2UgaGFsZiB5b3VyIGluY29tZSBvbiB0aGUgbmV4dCBwYXlkYXlcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX2xhd3llclN0YXR1cyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG4gICAgICAgIHZhciBfZmluZSA9IDQwMDAwO1xyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgICAgICAgX2ZpbmUgPSAxNTAwMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgRmluZTogX2ZpbmUgfSB9O1xyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJMYXd5ZXIgU3RhdHVzIDogXCIgKyBfbGF3eWVyU3RhdHVzICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlBheWFibGUgYW1vdW50IDogJFwiICsgX2ZpbmUsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfZmluZSA9IExvc3Nlc0RhdGEuRGF0YS5GaW5lO1xyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfZmluZSkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX2ZpbmU7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2xhd3llclN0YXR1cykge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJFwiICsgX2ZpbmUgKyBcIiBmaW5lLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZUhhbGZQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBwYXllZCAkXCIgKyBfZmluZSArIFwiIGZpbmUsIHlvdSB3aWxsIGFsc28gbG9zZSBoYWxmIHByb2ZpdCBvbiBuZXh0IHBheWRheSwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTRcIjogLy9Zb3UgaGF2ZSBub3QgYmVlbiB0YWtpbmcgY2FyZSBvZiB5b3VyIGhlYWx0aCBhbmQgeW91IGJlY29tZSB0b28gaWxsIHRvIHdvcmsuIFlvdSBsb3NlIGhhbGYgb2YgeW91ciBpbmNvbWUgb24geW91ciBuZXh0IFBheWRheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICBfbWFuYWdlci5Ub2dnbGVIYWxmUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGhhbGYgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwgMjQwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxNVwiOiAvL1lvdSBtYWtlIGEgY29tbWVudCBvbiBTb2NpYWwgTWVkaWEgdGhhdCBpcyBnb2luZyB2aXJhbCBpbiBhIGJhZCB3YXkuIEFsbCBvZiB5b3VyIGJ1c2luZXNzZXMgc3VmZmVyIGJlY2F1c2Ugb2YgaXQuIFlvdSBsb3NlIGhhbGYgeW91ciBpbmNvbWUgb24gdGhlIG5leHQgdHdvIFBheWRheXMuIElmIHlvdSBoYXZlIGEgbGF3eWVyLCBsb3NlIGhhbGYgeW91ciBpbmNvbWUgb24gb25seSBvbmUgUGF5ZGF5XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9sYXd5ZXJTdGF0dXMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuICAgICAgICBpZiAoX2xhd3llclN0YXR1cykge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgX21hbmFnZXIuVG9nZ2xlSGFsZlBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGhhbGYgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwgMjQwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyID0gMTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZUhhbGZQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBoYWxmIHByb2ZpdHMgb24gbmV4dCB0d28gcGF5ZGF5cy5cIiwgMjQwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFdpbGRDYXJkRnVuY3Rpb25hbGl0eShfaWQsIF9oYXNUd29TY3JlZW5zID0gZmFsc2UsIF90eXBlID0gMCkge1xyXG4gICAgdmFyIEluZGV4ID0gcGFyc2VJbnQoX2lkKTtcclxuICAgIEluZGV4ID0gSW5kZXggLSAxO1xyXG5cclxuICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgIGNhc2UgXCIxXCI6IC8vZG91YmxlcyB5b3VyIGluY29tZSBvbiB0aGUgbmV4dCBQYXkgRGF5LlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjJcIjogLy9Sb2xsIDIgZGllLCBtdWx0aXBseSByZXN1bHQgYnkgJDUsMDAwIGFuZCByZWNlaXZlIHlvdXIgYWR2YW5jZSBmcm9tIHRoZSBCYW5rLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gNTAwMDtcclxuICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcblxyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgUmVzdWx0OiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWw6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gXCIgKyBUb3RhbFJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50ICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgaGFzIGJlZW4gYWRkZWQgaW50byB5b3VyIGNhc2guXCIsIDQwMDApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjNcIjogLy9Zb3UgZ28gdG8gYW4gRXN0YXRlIEF1Y3Rpb24gYW5kIGJ1eSBhIHBhaW50aW5nIHRoYXQgdHVybnMgb3V0IHRvIGJlIHZhbHVhYmxlLiBZb3UgY2FuIHNlbGwgaXQgbm93LCByb2xsIGJvdGggZGljZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQxMCwwMDAgYW5kIHJlY2VpdmUgcHJvZml0cyBmcm9tIHRoZSBCYW5rLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gMTAwMDA7XHJcbiAgICAgICAgdmFyIFRvdGFsUmVzdWx0ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG5cclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50ICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgaGFzIGJlZW4gYWRkZWQgaW50byB5b3VyIGNhc2guXCIsIDUyMDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNFwiOiAvL1lvdXIgYnVzaW5lc3MgaXMgYXVkaXRlZCBieSB0aGUgSVJTIGFuZCB5b3UgaGF2ZSBub3QgYmVlbiBrZWVwaW5nIHZlcnkgZ29vZCByZWNvcmRzIG9mIHRoZSBpbmNvbWUgYW5kIGV4cGVuc2VzIGZvciB5b3VyIGJ1c2luZXNzLiBUaGV5IGZpbmUgeW91ICQzMCwwMDAuIElmIHlvdSBoYXZlIGEgbGF3eWVyLCB5b3VyIGZpbmUgaXMgJDE1LDAwMC5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX2ZpbmUgPSAzMDAwMDtcclxuICAgICAgICB2YXIgX2xhd3llclN0YXR1cyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpIF9maW5lID0gX2ZpbmUgLyAyO1xyXG5cclxuICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9maW5lIH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkxhd3llciBIaXJlZCA6IFwiICsgX2xhd3llclN0YXR1cyArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBmaW5lICRcIiArIF9maW5lLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX2ZpbmUgPSBXaWxkQ2FyZERhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9maW5lKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfZmluZTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJGZWVzICRcIiArIF9maW5lICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDI4MDApO1xyXG4gICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNVwiOiAvL1lvdSBjYW4gYmVjb21lIGEgdmVuZG9yIGF0IGEgbG9jYWwgSmF6eiBGZXN0aXZhbCBmb3IgYSB2ZW5kaW5nIGZlZSBvZiAkMjAsMDAwLiBJZiB5b3UgYWNjZXB0LCBwYXkgdGhlIEJhbmsgJDIwLDAwMCBhbmQgcm9sbCB0d28gZGllOyBtdWx0aXBseSB0aGUgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIHZlbmRpbmcgaW5jb21lIGZyb20gdGhlIEJhbmsuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9mZWVzID0gMjAwMDA7XHJcbiAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gNTAwMDtcclxuICAgICAgICB2YXIgX2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIF9yZXN1bHQ7XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF90eXBlID09IDApIHtcclxuICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgX3Jlc3VsdCA9IF9kaWNlUmVzdWx0ICogX211bHRpcGxpZXI7XHJcblxyXG4gICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfcmVzdWx0LCBEaWNlOiBfZGljZVJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9mZWVzKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9mZWVzO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJlc3VsdDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBBbW91bnQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyICsgXCIgPSAkXCIgKyBfcmVzdWx0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlJlY2VpdmUgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIsIDI0MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJza2lwcGluZyB0dXJuIG5vdy5cIiwgMTgwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gV2lsZENhcmREYXRhLkRhdGEuRGljZTtcclxuICAgICAgICAgIF9yZXN1bHQgPSBXaWxkQ2FyZERhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX3Jlc3VsdDtcclxuICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNhc2ggYW1vdW50ICRcIiArIF9yZXN1bHQgKyBcIiBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgYWRkZWQuXCIsIDMwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjZcIjogLy9BbiB1bnNhdGlzZmllZCBjdXN0b21lciB0YWtlcyB0byBzb2NpYWwgbWVkaWEgYW5kIHNtZWFy4oCZcyB5b3VyIG5hbWUuIEl0IGFmZmVjdHMgeW91ciBCcmFuZCBhbmQgeW91ciBidXNpbmVzcyBiZWZvcmUgeW91IGNhbiBnZXQgYSBoYW5kbGUgb24gaXQuIFlvdSBsb3NlIGhhbGYgeW91ciBpbmNvbWUgb24geW91ciBuZXh0IFBheURheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZUhhbGZQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgaGFsZiBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjdcIjogLy9wYXkgb2ZmIHlvdXIgbG9hbiBmb3IgeW91ciBCcmljayAmIE1vcnRhciBCdXNpbmVzcy4gSWYgeW91IGhhdmUgbm8gbG9hbiBvdXRzdGFuZGluZywgcmVjZWl2ZSAkNTAsMDAwLlxyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbG9hblJlc2V0ID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgdmFyIF90eXBlID0gcGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICBpZiAoX3R5cGUgPT0gMiAmJiBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgICBfbG9hblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX2xvYW5SZXNldCkge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3VyIG91dHN0YW5kaW5nIGxvYW4gaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiLCAzMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IDUwMDAwO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIG5vIGxvYW4sIGFtb3VudCAkNTAwMDAgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoXCIsIDMyMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjhcIjogLy9Zb3UgYXJlIHN1ZWQgZm9yIFRyYWRlbWFyayBJbmZyaW5nZW1lbnQgKGNvcHlpbmcgc29tZW9uZSBlbHNl4oCZcyBwcm9kdWN0KSwgYW5kIHlvdSBsb3NlLiBJZiB5b3UgaGF2ZSBhIGxhd3llciByb2xsIDIgZGllLCBtdWx0aXBseSBieSAkMSwwMDAgYW5kIHBheSB0byB0aGUgQmFuay4gSWYgeW91IGRvIG5vdCBoYXZlIGEgTGF3eWVyLCByb2xsIHR3byBkaWUgYW5kIG11bHRpcGx5IGJ5ICQzLDAwMCBhbmQgcGF5IHRvIHRoZSBCYW5rLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB2YXIgX2xhd3llclN0YXR1cyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgdmFyIF9maW5lID0gMzAwMDtcclxuICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKSBfZmluZSA9IDEwMDA7XHJcblxyXG4gICAgICAgICAgVG90YWxSZXN1bHQgPSBfZmluZSAqIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgICBXaWxkQ2FyZERhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBUb3RhbFJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJMYXd5ZXIgSGlyZWQgOiBcIiArIF9sYXd5ZXJTdGF0dXMgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgZmluZSAkXCIgKyBUb3RhbFJlc3VsdCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIFRvdGFsUmVzdWx0ID0gV2lsZENhcmREYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBUb3RhbFJlc3VsdCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRmVlcyAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCAyODAwKTtcclxuICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjlcIjogLy9UaGUgQ2l0eSBpcyBhZGRpbmcgYSBidXMgbGluZSB0aGF0IHJ1bnMgaW4gZnJvbnQgb2YgeW91ciBidXNpbmVzcy4gSWYgeW91IG93biBhIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzLCBmb3IgdGhlIHJlc3Qgb2YgdGhlIGdhbWUsIHlvdSByZWNlaXZlIGRvdWJsZSB5b3VyIGluY29tZSBmb3Igb25lIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBCTUJ1c2luZXNzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICBpZiAoQk1CdXNpbmVzcyA8PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkbyBub3QgaGF2ZSBhbnkgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcywgc2tpcHBpbmcgdHVybi5cIiwgMzIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlU2VsZXRpdmVEb3VibGVQYXlEYXlfQnVzaW5lc3NQYXlEYXlVSVNldHVwKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEwXCI6IC8vWW91IHN1ZSBhIGNvbXBhbnkgZm9yIERlZmFtYXRpb24gKGx5aW5nIG9uIHlvdSkgYW5kIHdpbi4gQ2hvb3NlIGEgcGxheWVyIGFuZCByZWNlaXZlIGFsbCBvZiB0aGVpciBwcm9maXRzIG9uIHRoZWlyIG5leHQgUGF5IERheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5TZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTFcIjogLy8gcmVjZWl2ZSBkb3VibGUgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIGFsbCBvZiB5b3VyIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsIDI0MDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEludmVzdEZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgUGF5RGF5RnVuY3Rpb25hbGl0eSgpIHt9LFxyXG5cclxuICBEb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KCkge30sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5PbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbih0cnVlKTtcclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBTZWxsRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgR29CYWNrRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Hb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgfSxcclxufSk7XHJcbm1vZHVsZS5leHBvcnRzID0gRGVja3NEYXRhO1xyXG4iXX0=