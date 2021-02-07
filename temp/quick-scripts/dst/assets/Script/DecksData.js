
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
        console.log(this.BigBusiness[Index].Description);
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

          for (var _index4 = 0; _index4 < _manager.PlayerGameInfo.length; _index4++) {
            _amount = _amount + _manager.PlayerGameInfo[_index4].MarketingAmount;
          }

          _manager.PlayerGameInfo[_playerIndex].Cash += _amount;
          this.CompleteTurnWithToast("Dice 1 Result: " + Dice1Result + "\n" + "\n" + "Dice 2 Result: " + Dice2Result + "\n" + "\n" + "Total: " + TotalResult + "\n" + "\n" + "Amount $" + _amount + " has successfully added in your cash from marketing amount on table.", 4000);

          if (mode == 2) {
            var _actorsArray = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

            var _data = null;

            for (var _index5 = 0; _index5 < _actorsArray.length; _index5++) {
              _data = _actorsArray[_index5].customProperties.PlayerSessionData;
              _data.MarketingAmount = 0;

              _actorsArray[_index5].setCustomProperty("PlayerSessionData", _data);
            }
          } else {
            for (var _index6 = 0; _index6 < _manager.PlayerGameInfo.length; _index6++) {
              _manager.PlayerGameInfo[_index6].MarketingAmount = 0;
            }
          }
        } else {
          this.CompleteTurnWithToast("Dice 1 Result: " + Dice1Result + "\n" + "\n" + "Dice 2 Result: " + Dice2Result + "\n" + "\n" + "Total: " + TotalResult + "\n" + "\n" + "You ran out of luck, turn will skip now", 4000);
        }

        break;

      case "12":
        console.log(this.BigBusiness[Index].Description);
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
        console.log(this.Marketing[Index].Description);
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
        console.log(this.Marketing[Index].Description);
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
        console.log(this.Losses[Index].Description);
        break;

      case "12":
        console.log(this.Losses[Index].Description);
        break;

      case "13":
        console.log(this.Losses[Index].Description);
        break;

      case "14":
        console.log(this.Losses[Index].Description);
        break;

      case "15":
        console.log(this.Losses[Index].Description);
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
          //Roll 1 die, multiply result by $5,000 and receive your advance from the Bank.
          console.log(_this7.WildCards[Index].Description);
          WildCardData = null;

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var DiceResult = _manager.RollOneDice();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiTG9zc2VzRGF0YSIsIk1hcmtldGluZ0RhdGEiLCJXaWxkQ2FyZERhdGEiLCJCaWdCdXNpbmVzc0RhdGEiLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJFbnVtU3BhY2VUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIldpbGRDYXJkIiwiQmlnQnVzaW5lc3MiLCJNYXJrZXRpbmciLCJJbnZlc3QiLCJMb3NzZXMiLCJQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJPbmVRdWVzdGlvbiIsIlNlbGwiLCJCdXlPclNlbGwiLCJHb0JhY2tTcGFjZXMiLCJDYXJkRGF0YSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJJRCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIlRleHQiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRGVzY3JpcHRpb24iLCJIYXNCdXR0b24iLCJIYXNUd29CdXR0b25zIiwiSGFzVGhyZWVCdXR0b25zIiwiQnV0dG9uTmFtZSIsIlNlY29uZEJ1dHRvbk5hbWUiLCJUaGlyZEJ1dHRvbk5hbWUiLCJjdG9yIiwiQ2FyZFVJIiwiVG9hc3ROb2RlIiwiTm9kZSIsIlRvYXN0TGFiZWwiLCJMYWJlbCIsIkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvbkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlIiwiSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlIiwiQ29tcGxldGlvblRvYXN0Tm9kZSIsIkNvbXBsZXRpb25Ub2FzdExhYmVsIiwiRGVja3NEYXRhIiwiQ29tcG9uZW50IiwiTWFpblVJIiwiV2lsZENhcmRzIiwiU3BhY2VzVHlwZSIsIlJlc2V0QWxsRGF0YSIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsIlNlbGVjdGVkQ2FyZEluZGV4IiwiQ2FyZFNlbGVjdGVkIiwiSXNCb3RUdXJuIiwiaXNPd25lciIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlNob3dDYXJkSW5mbyIsIm9uRGlzYWJsZSIsIm9mZiIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiX2lzQm90IiwiX2hhc1R3b0J1dHRvbiIsImFjdGl2ZSIsInNldFRpbWVvdXQiLCJFeGl0Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCIsIl9yYW5kb21WYWx1ZSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50Iiwic3RyaW5nIiwiQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbiIsIkdlbmVyYXRlUmFuZG9tTWFya2V0aW5nQ2FyZCIsIkdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZCIsIkdlbmVyYXRlUmFuZG9tV2lsZENhcmQiLCJTcGFjZUludmVzdCIsIl9pbmRleCIsIkNvbXBsZXRlVHVybldpdGhUb2FzdCIsIlNwYWNlUGF5RGF5IiwiUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlRG91YmxlUGF5RGF5IiwiRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlT25lUXVlc3Rpb24iLCJTcGFjZVNlbGwiLCJTcGFjZUJ1eU9yU2VsbCIsIlNwYWNlR29CYWNrU3BhY2VzIiwibWVzc2FnZSIsIl9zdGF0ZSIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUmVzZXRDYXJkRGlzcGxheSIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJUd29CdXR0b25zRnVuY3Rpb25hbGl0eSIsImV2ZW50IiwiX3R5cGUiLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkiLCJHb0JhY2tGdW5jdGlvbmFsaXR5IiwiQ2hlY2tMb2FuIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiX21hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsIk5vT2ZCdXNpbmVzcyIsImxlbmd0aCIsIkxvYW5UYWtlbiIsInZhbCIsIlJlc3VsdCIsInYyIiwiRG9uZUJ1dHRvbkNsaWNrZWQiLCJjbGVhclRpbWVvdXQiLCJDb21wbGV0aW9uV2luZG93IiwiY29uc29sZSIsImVycm9yIiwiX21zZyIsIl90aW1lIiwiX2NoYW5nZVR1cm4iLCJsb2ciLCJfZGVsYXkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJBc3NpZ25TZWNvbmRTY3JlZW5EYXRhIiwiX0xhYmVsUmVmIiwiX2J1dHRvbk5hbWUiLCJfaWQiLCJfaGFzVHdvU2NyZWVucyIsIkluZGV4IiwicGFyc2VJbnQiLCJfcmVzdWx0IiwiSXNMb2FuVGFrZW4iLCJ4IiwieSIsIkxvYW5BbW91bnQiLCJfY2FyZEluZm8iLCJMYXd5ZXJTdGF0dXMiLCJFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJfZGljZVJlc3VsdCIsIl9tdWx0aXBsaWVyIiwiUm9sbFR3b0RpY2VzIiwiRGF0YSIsInJlc3VsdCIsIkRpY2UiLCJDYXNoIiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJDYXNoR2l2ZW4iLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiQ2FzaENvc3QiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIl9hbW91bnQiLCJtb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsIk1hcmtldGluZ0Ftb3VudCIsInJvdW5kIiwiX2FjdG9yc0FycmF5IiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tQWN0b3JzQXJyYXkiLCJfZGF0YSIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsInNldEN1c3RvbVByb3BlcnR5IiwiRGljZTFSZXN1bHQiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX2xvc2VBbW91bnQiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbWFya2V0aW5nQW1vdW50IiwiX2xhd3llclN0YXR1cyIsIl9idXNpbmVzc0Ftb3VudCIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiX2hhc01hcmtldGluZ0Ftb3VudCIsIl90b3RhbEFtb3VudCIsIl9tYXJrZXRBbW91bnQiLCJfaW5jcmVhc2VBbW91bnQiLCJNdWx0aXBseU1hcmtldGluZ01vbmV5IiwiYmlsbCIsImlzRXZlbiIsIlJvbGxPbmVEaWNlIiwiSXNFdmVuIiwiX3Byb2ZpdCIsIkdldE1hcmtldGluZ01vbmV5IiwiRGljZVJlc3VsdCIsIkNhc2hNdWxpdHBsaWVyIiwiX2hpcmVkTGF3eWVyIiwibGF3eWVyIiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsImhvbWVCYXNlZEJ1c2luZXNzIiwiYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyIsImhvbWVNdWx0aXBsaWVyIiwiYnJpY2tNdWxpcGxpZXIiLCJ0b3RhbEFtb3VudCIsIl9jb3VydFNldHRsZW1lbnRGZWVzIiwiVHlwZSIsIlRvdGFsQW1vdW50IiwidGVtcFR5cGUiLCJfYnVzaW5lc3NUeXBlIiwiQnVzaW5lc3NUeXBlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJfZmluZSIsIl9mZWVzIiwiVG9nZ2xlSGFsZlBheU5leHRUdXJuIiwiX2xvYW5SZXNldCIsIkJNQnVzaW5lc3MiLCJFbmFibGVTZWxldGl2ZURvdWJsZVBheURheV9CdXNpbmVzc1BheURheVVJU2V0dXAiLCJTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uIiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxVQUFVLEdBQUcsSUFBakI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsSUFBcEI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsSUFBbkI7QUFDQSxJQUFJQyxlQUFlLEdBQUcsSUFBdEI7QUFDQSxJQUFJQyxVQUFKO0FBQ0EsSUFBSUMsb0JBQW9CLEdBQUcsSUFBM0I7QUFDQSxJQUFJQyxlQUFlLEdBQUcsSUFBdEIsRUFFQTtBQUNBO0FBRUE7O0FBQ0EsSUFBSUMsYUFBYSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUMxQkMsRUFBQUEsSUFBSSxFQUFFLENBRG9CO0FBRTFCQyxFQUFBQSxRQUFRLEVBQUUsQ0FGZ0I7QUFHMUJDLEVBQUFBLFdBQVcsRUFBRSxDQUhhO0FBSTFCQyxFQUFBQSxTQUFTLEVBQUUsQ0FKZTtBQUsxQkMsRUFBQUEsTUFBTSxFQUFFLENBTGtCO0FBTTFCQyxFQUFBQSxNQUFNLEVBQUUsQ0FOa0I7QUFPMUJDLEVBQUFBLE1BQU0sRUFBRSxDQVBrQjtBQVExQkMsRUFBQUEsWUFBWSxFQUFFLENBUlk7QUFTMUJDLEVBQUFBLFdBQVcsRUFBRSxDQVRhO0FBVTFCQyxFQUFBQSxJQUFJLEVBQUUsQ0FWb0I7QUFXMUJD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QXhGO0FBQ0EsU0FBSzNLLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsS0FBdEI7QUFDRCxHQXhvRHNCO0FBMG9EdkJtRCxFQUFBQSxpQkExb0R1QiwrQkEwb0RIO0FBQ2xCdEgsSUFBQUEsd0JBQXdCLENBQUMyRyxRQUF6QixDQUFrQ3dDLHFCQUFsQyxHQUEwRDRGLHFDQUExRCxDQUFnRyxJQUFoRztBQUNBLFNBQUs1SyxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEtBQXRCO0FBQ0QsR0E3b0RzQjtBQStvRHZCcUQsRUFBQUEsc0JBL29EdUIsb0NBK29ERTtBQUN2QnhILElBQUFBLHdCQUF3QixDQUFDMkcsUUFBekIsQ0FBa0N3QyxxQkFBbEMsR0FBMEQ2RixnQ0FBMUQsQ0FBMkYsSUFBM0Y7QUFDQSxTQUFLN0ssWUFBTCxDQUFrQixFQUFsQixFQUFzQixLQUF0QjtBQUNELEdBbHBEc0I7QUFvcER2QnVELEVBQUFBLG1CQXBwRHVCLGlDQW9wREQ7QUFDcEIxSCxJQUFBQSx3QkFBd0IsQ0FBQzJHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRHFJLCtCQUFwRDtBQUNBLFNBQUs5SyxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEtBQXRCO0FBQ0Q7QUF2cERzQixDQUFULENBQWhCO0FBeXBEQStLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQi9MLFNBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIExvc3Nlc0RhdGEgPSBudWxsO1xyXG52YXIgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbnZhciBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG52YXIgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxudmFyIFRpbWVvdXRSZWY7XHJcbnZhciBDb21wbGV0aW9uV2luZG93VGltZSA9IDgwMDA7XHJcbnZhciBMb25nTWVzc2FnZVRpbWUgPSA1MDAwO1xyXG5cclxuLy8gdmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gNTAwOy8vODAwMFxyXG4vLyB2YXIgTG9uZ01lc3NhZ2VUaW1lID0gMjUwOy8vNTAwMFxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tU3BhY2VzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1TcGFjZVR5cGUgPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFdpbGRDYXJkOiAxLFxyXG4gIEJpZ0J1c2luZXNzOiAyLFxyXG4gIE1hcmtldGluZzogMyxcclxuICBJbnZlc3Q6IDQsXHJcbiAgTG9zc2VzOiA1LFxyXG4gIFBheURheTogNixcclxuICBEb3VibGVQYXlEYXk6IDcsXHJcbiAgT25lUXVlc3Rpb246IDgsXHJcbiAgU2VsbDogOSxcclxuICBCdXlPclNlbGw6IDEwLFxyXG4gIEdvQmFja1NwYWNlczogMTEsXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgY2FyZCBkYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkNhcmREYXRhXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgSUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklkIG9mIHRoZSBjYXJkXCIsXHJcbiAgICB9LFxyXG4gICAgRGVzY3JpcHRpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVzY3JpcHRpb25cIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImRlc2NyaXB0aW9uIG9mIHRoZSBjYXJkXCIsXHJcbiAgICB9LFxyXG4gICAgSGFzQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhhc0J1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSBpbnRlcmFjdGlvbiBidXR0b25cIixcclxuICAgIH0sXHJcbiAgICBIYXNUd29CdXR0b25zOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhhc1R3b0J1dHRvbnNcIixcclxuICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZiB0aGlzIGNhcmQgc2hvdWxkIGhhdmUgdHdvIGludGVyYWN0aW9uIGJ1dHRvblwiLFxyXG4gICAgfSxcclxuICAgIEhhc1RocmVlQnV0dG9uczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIYXNUaHJlZUJ1dHRvbnNcIixcclxuICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZiB0aGlzIGNhcmQgc2hvdWxkIGhhdmUgdGhyZWUgaW50ZXJhY3Rpb24gYnV0dG9uXCIsXHJcbiAgICB9LFxyXG4gICAgQnV0dG9uTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXR0b25OYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNlY29uZEJ1dHRvbk5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Vjb25kQnV0dG9uTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiU2Vjb25kIGJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGhpcmRCdXR0b25OYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNlY29uZEJ1dHRvbk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlNlY29uZCBidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJDYXJkVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUb2FzdE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG9hc3ROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJub2RlIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvYXN0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG9hc3RMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1dHRvbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludGVyYWN0aW9uQnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbnRlcmFjdGlvbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZXJhY3Rpb24gQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludGVyYWN0aW9uVHdvQnV0dG9uc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwidHdvIGludGVyYWN0aW9uIEJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBJbnRlcmFjdGlvblRocmVlQnV0dG9uc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJ0aHJlZSBpbnRlcmFjdGlvbiBCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ29tcGxldGlvblRvYXN0Tm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb21wbGV0aW9uVG9hc3ROb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJub2RlIHJlZmVyZW5jZSBmb3IgY29tcGxlaW9uIHRvYXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDb21wbGV0aW9uVG9hc3RMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb21wbGV0aW9uVG9hc3RMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxhYmVsIHJlZmVyZW5jZSBmb3IgY29tcGxlaW9uIHRvYXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgZGVja3MgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGVja3NEYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiRGVja3NEYXRhXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1haW5VSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluVUlcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQ2FyZFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgb2YgZGVja3NcIixcclxuICAgIH0sXHJcbiAgICBCaWdCdXNpbmVzczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCaWdCdXNpbmVzc1wiLFxyXG4gICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBiaWcgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBNYXJrZXRpbmc6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nXCIsXHJcbiAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIGNhcmRzIGRhdGEgZm9yIG1hcmtldGluZ1wiLFxyXG4gICAgfSxcclxuICAgIExvc3Nlczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb3NzZXNcIixcclxuICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgY2FyZHMgZGF0YSBmb3IgbG9zc2VzXCIsXHJcbiAgICB9LFxyXG4gICAgV2lsZENhcmRzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldpbGRDYXJkc1wiLFxyXG4gICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBXaWxkQ2FyZHNcIixcclxuICAgIH0sXHJcbiAgICBTcGFjZXNUeXBlOiB7XHJcbiAgICAgIHR5cGU6IEVudW1TcGFjZVR5cGUsXHJcbiAgICAgIGRlZmF1bHQ6IEVudW1TcGFjZVR5cGUuTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInN0YXRlcyBtYWNoaW5lcyBieSB0eXBlIG9mIGNhcmQgb3Igc3BhY2VzIG9uIGJvYXJkXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsRGF0YSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICBUaW1lb3V0UmVmID0gbnVsbDtcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuUmVzZXRBbGxEYXRhKCk7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IC0xO1xyXG4gICAgdGhpcy5DYXJkU2VsZWN0ZWQgPSAtMTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzT3duZXIgPSBmYWxzZTtcclxuXHJcbiAgICAvL3RoaXMuQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShcIjFcIik7XHJcbiAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAvLyB0aGlzLkNvdW50ZXI9MDtcclxuICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTaG93Q2FyZFwiLCB0aGlzLlNob3dDYXJkSW5mbywgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJTaG93Q2FyZFwiLCB0aGlzLlNob3dDYXJkSW5mbywgdGhpcyk7XHJcbiAgfSxcclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBnZXRSYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICB9LFxyXG5cclxuICBUb2dnbGVCdXR0b25zKF9pc093bmVyLCBfaGFzQnV0dG9uID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfaGFzVHdvQnV0dG9uID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNPd25lciAmJiBfaGFzQnV0dG9uKSB7XHJcbiAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKF9oYXNUd29CdXR0b24pIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChfaXNPd25lciAmJiAhX2hhc0J1dHRvbikge1xyXG4gICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5NYWluVUkuQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuRXhpdENhcmRJbmZvKCk7XHJcbiAgICAgICAgfSwgMzIwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZChfaXNPd25lciwgX3JhbmRvbVZhbHVlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5CaWdCdXNpbmVzcztcclxuICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICBpZiAodGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKSB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG5cclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbiwgX2lzQm90LCB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5NYXJrZXRpbmc7XHJcbiAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXggPSBfcmFuZG9tVmFsdWU7XHJcbiAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgIGlmICh0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG5cclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QsIHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkxvc3NlcztcclxuICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXggPSBfcmFuZG9tVmFsdWU7XHJcbiAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuXHJcbiAgICBpZiAodGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKSB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKSB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uU2Vjb25kQnV0dG9uTmFtZTtcclxuXHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbiwgX2lzQm90LCB0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKTtcclxuXHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdlbmVyYXRlUmFuZG9tV2lsZENhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuV2lsZENhcmQ7XHJcbiAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgIGlmICh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG5cclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QsIHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3BhY2VJbnZlc3QoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkludmVzdDtcclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBpbnZlc3Qgb25lIG1vcmUgdGltZSBpbiBHb2xkIG9yIHN0b2NrcyB0aGlzIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIm1zZ1wiLCAyMTAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTcGFjZVBheURheShfaXNPd25lciwgX2luZGV4KSB7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBQYXlEYXkgc3BhY2UuXCIsIHRydWUpO1xyXG4gICAgdGhpcy5QYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCBmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgU3BhY2VEb3VibGVQYXlEYXkoX2lzT3duZXIsIF9pbmRleCkge1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gRG91YmxlUGF5RGF5IHNwYWNlLlwiLCB0cnVlKTtcclxuICAgIHRoaXMuRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFNwYWNlT25lUXVlc3Rpb24oX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uO1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGFzayBvbmUgcXVlc3Rpb24gdG8gYW55IG90aGVyIHBsYXllciwgaWYgcGxheWVyIGlzIHVuYWJsZSB0byBhbnN3ZXIgdGhleSB3aWxsIHBheSB5b3Ugc29tZSBjYXNoIGFtb3VudC5cIiwgdHJ1ZSk7XHJcbiAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3BhY2VTZWxsKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5TZWxsO1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIHNlbGwgYW55IG9uZSBvZiB5b3VyIGJ1c2luZXNzIG9yIGNhbiBza2lwIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNwYWNlQnV5T3JTZWxsKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5CdXlPclNlbGw7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gQnV5IG9yIHNlbGwgR29sZCBvciBzdG9ja3Mgb25lIG1vcmUgdGltZSBpbiB0aGlzIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNwYWNlR29CYWNrU3BhY2VzKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5Hb0JhY2tTcGFjZXM7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcInlvdSB3aWxsIGhhdmUgdG8gZ28gYmFjayAzIHNwYWNlcy5cIiwgdHJ1ZSk7XHJcbiAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNob3dDYXJkSW5mbzogZnVuY3Rpb24gKG1lc3NhZ2UsIF9zdGF0ZSkge1xyXG4gICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdENhcmRJbmZvKCkge1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcblxyXG4gICAgLy9mb3IgdGVzdGluZ1xyXG4gICAgLy8gdGhpcy5Db3VudGVyKys7XHJcbiAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgfSxcclxuXHJcbiAgVHdvQnV0dG9uc0Z1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24obnVsbCwgMSk7XHJcbiAgfSxcclxuXHJcbiAgQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbihldmVudCA9IG51bGwsIF90eXBlID0gMCkge1xyXG4gICAgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkJpZ0J1c2luZXNzKSB7XHJcbiAgICAgIGlmIChCaWdCdXNpbmVzc0RhdGEgPT0gbnVsbCkgdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgIGVsc2UgdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCBmYWxzZSwgX3R5cGUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5Mb3NzZXMpIHtcclxuICAgICAgaWYgKExvc3Nlc0RhdGEgPT0gbnVsbCkgdGhpcy5Mb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgdHJ1ZSwgX3R5cGUpO1xyXG4gICAgICBlbHNlIHRoaXMuTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsIGZhbHNlLCBfdHlwZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLk1hcmtldGluZykge1xyXG4gICAgICBpZiAoTWFya2V0aW5nRGF0YSA9PSBudWxsKSB0aGlzLk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgIGVsc2UgdGhpcy5NYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgZmFsc2UsIF90eXBlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuV2lsZENhcmQpIHtcclxuICAgICAgaWYgKFdpbGRDYXJkRGF0YSA9PSBudWxsKSB0aGlzLldpbGRDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgdHJ1ZSwgX3R5cGUpO1xyXG4gICAgICBlbHNlIHRoaXMuV2lsZENhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCBmYWxzZSwgX3R5cGUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5TZWxsKSB7XHJcbiAgICAgIHRoaXMuU2VsbEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuSW52ZXN0KSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0RnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5CdXlPclNlbGwpIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uKSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkdvQmFja1NwYWNlcykge1xyXG4gICAgICB0aGlzLkdvQmFja0Z1bmN0aW9uYWxpdHkoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja0xvYW4oKSB7XHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciB2YWwgPSAtMTtcclxuICAgIHZhbCA9IF9sb2FuVGFrZW4gPT0gdHJ1ZSA/IDEgOiAwO1xyXG4gICAgdmFyIFJlc3VsdCA9IGNjLnYyKHZhbCwgX2J1c2luZXNzSW5kZXgpO1xyXG4gICAgcmV0dXJuIFJlc3VsdDtcclxuICB9LFxyXG5cclxuICBEb25lQnV0dG9uQ2xpY2tlZCgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICBfbWFuYWdlci5SZXNldENhcmREaXNwbGF5KCk7XHJcbiAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICB0aGlzLkNvbXBsZXRpb25XaW5kb3coXCJcIiwgZmFsc2UsIHRoaXMuaXNPd25lciwgZmFsc2UpO1xyXG4gICAgY29uc29sZS5lcnJvcihcImRvbmUgY2xpY2tlZFwiKTtcclxuICB9LFxyXG5cclxuICBDb21wbGV0aW9uV2luZG93KG1lc3NhZ2UsIF9zdGF0ZSwgX2lzT3duZXIsIF9pc0JvdCkge1xyXG4gICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5Db21wbGV0aW9uVG9hc3RMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xyXG5cclxuICAgICAgICBpZiAoX2lzT3duZXIpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgICAgICAgIFRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Eb25lQnV0dG9uQ2xpY2tlZCgpO1xyXG4gICAgICAgICAgfSwgQ29tcGxldGlvbldpbmRvd1RpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLk1haW5VSS5Db21wbGV0aW9uVG9hc3RMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdExhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ29tcGxldGVUdXJuV2l0aFRvYXN0KF9tc2csIF90aW1lLCBfY2hhbmdlVHVybiA9IHRydWUpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5Db21wbGV0aW9uV2luZG93KFwiXCIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9tc2cpO1xyXG4gICAgICB2YXIgX2RlbGF5ID0gdGhpcy5nZXRSYW5kb20oTG9uZ01lc3NhZ2VUaW1lLCBMb25nTWVzc2FnZVRpbWUgKyAyMDAwKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgICAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICAgIH0sIF9kZWxheSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX21zZyAhPSBcIlwiICYmICFfY2hhbmdlVHVybikge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX21zZywgTG9uZ01lc3NhZ2VUaW1lLCB0aGlzLmlzT3duZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoX2NoYW5nZVR1cm4pIHtcclxuICAgICAgICBpZiAodGhpcy5pc093bmVyKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRpb25XaW5kb3coX21zZywgdHJ1ZSwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5SZXNldENhcmREaXNwbGF5KCk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgIH0sIExvbmdNZXNzYWdlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduU2Vjb25kU2NyZWVuRGF0YShfaXNCb3QsIF9pc093bmVyLCBfaGFzQnV0dG9uLCBfbXNnLCBfTGFiZWxSZWYsIF9idXR0b25OYW1lKSB7XHJcbiAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhfbXNnLCB0cnVlKTtcclxuXHJcbiAgICAgIF9MYWJlbFJlZi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IF9idXR0b25OYW1lO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIF9oYXNCdXR0b24sIF9pc0JvdCk7XHJcblxyXG4gICAgICBpZiAoX2lzT3duZXIpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuRG9uZUJ1dHRvbkNsaWNrZWQoKTtcclxuICAgICAgICB9LCAxNTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLCBfdHlwZSA9IDApIHtcclxuICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICBJbmRleCA9IEluZGV4IC0gMTtcclxuXHJcbiAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICBjYXNlIFwiMVwiOiAvL3JlY2VpdmUgMjAwMDAkIGdpZnQgdG8gcGF5b2ZmIGxvYW5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfcmVzdWx0ID0gdGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICB2YXIgSXNMb2FuVGFrZW4gPSBfcmVzdWx0Lng7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX3Jlc3VsdC55O1xyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChJc0xvYW5UYWtlbiA9PSAxKSB7XHJcbiAgICAgICAgICAvL21lYW5zIHVzZXIgaGFzIHRha2VuIGxvYW5cclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSAyMDAwMDtcclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgX2NhcmRJbmZvID0gXCJMb2FuIGFtb3VudCBvZiAkMjAwMDAgaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfY2FyZEluZm8gPSBcIllvdSBoYXZlIG5vdCB0YWtlbiBhbnkgbG9hbiwgdHVybiB3aWxsIHNraXAgbm93LlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoX2NhcmRJbmZvLCA1MDAwLCB0cnVlKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIyXCI6IC8vaGlyZSBsYXd5ZXJcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfY2FyZEluZm8gPSBcIlwiO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cykge1xyXG4gICAgICAgICAgX2NhcmRJbmZvID0gXCJZb3UgaGF2ZSBhbHJlYWR5IGhpcmVkIGxheXdlciwgdHVybiB3aWxsIHNraXAgbm93LlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICBfY2FyZEluZm8gPSBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llci5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KF9jYXJkSW5mbywgNTAwMCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiM1wiOiAvL1lvdSBkbyBhIFRyYWRlIFNob3cgZm9yIG9uZSBvZiB5b3VyIGJ1c2luZXNzZXMgYW5kIGdldCBzb21lIG5ldyBjbGllbnRzLiBDaG9vc2Ugb25lIG9mIHlvdXIgYnVzaW5lc3NlcyBhbmQgcm9sbCBhIFBheURheSByb2xsIHJpZ2h0IG5vdy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICB9LCAyNDAwKTtcclxuXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlTWFuaXBpbGF0aW9uU2NyZWVuX19CdXNpbmVzc01hbmlwdWxhdGlvblVJU2V0dXAodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNFwiOiAvL0EgZnJpZW5kIGdpdmVzIHlvdSBhIHN1Z2dlc3Rpb24gb24gYSBzdG9jayB0byBidXkuIFBsYWNlIHlvdXIgaW52ZXN0bWVudCBhbW91bnQgb24gdGhlIHRhYmxlIGFuZCByb2xsLiBUaGUgcmVzdWx0LCBtdWx0aXBsaWVkIGJ5ICQxLDAwMCwgaXMgdGhlIGFtb3VudCBvZiBlYWNoIHNoYXJlIG9mIHN0b2NrLiBZb3UgY2FuIGJ1eSB0aGlzIHN0b2NrIG5vdyBpZiB5b3Ugd291bGQgbGlrZS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbihudWxsLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNVwiOiAvL1lvdSByZXNlcnZlIGEgcHJpdmF0ZSBZYWNodCBmb3IgYSB3ZWVrIGxvbmcgdmFjYXRpb24uIFJvbGwgYm90aCBkaWUsIG11bHRpcGx5IHRoZSByZXN1bHQgYnkgJDMsMDAwLiBQYXkgdGhlIEJhbmsgeW91ciB2YWNhdGlvbiBjb3N0IGFuZCBsb3NlIHlvdXIgbmV4dCB0dXJuIGJhc2tpbmcgaW4geW91ciBwcml2YXRlIHN1bi5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfZGljZVJlc3VsdDtcclxuICAgICAgICB2YXIgX211bHRpcGxpZXIgPSAzMDAwO1xyXG4gICAgICAgIHZhciBfcmVzdWx0O1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICBfcmVzdWx0ID0gX211bHRpcGxpZXIgKiBfZGljZVJlc3VsdDtcclxuICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9yZXN1bHQsIERpY2U6IF9kaWNlUmVzdWx0IH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIENvc3QgQ2FsY3VsYXRlZCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIiAqIFwiICsgX211bHRpcGxpZXIgKyBcIiA9ICRcIiArIF9yZXN1bHQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfZGljZVJlc3VsdCA9IEJpZ0J1c2luZXNzRGF0YS5EYXRhLkRpY2U7XHJcbiAgICAgICAgICBfcmVzdWx0ID0gQmlnQnVzaW5lc3NEYXRhLkRhdGEucmVzdWx0O1xyXG5cclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX3Jlc3VsdCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX3Jlc3VsdDtcclxuICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcE5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNvc3QgJFwiICsgX3Jlc3VsdCArIFwiIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBwYWlkLCB5b3Ugd2lsbCBhbHNvIGxvc2UgeW91ciBuZXh0IHR1cm4sIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBjYXNoLHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI2XCI6IC8vWW91ciBwYXJlbnRzIGdpdmUgeW91ICQyMCwwMDAgdG93YXJkcyBzdGFydGluZyBhIG5ldyBidXNpbmVzcyBvciBpbnZlc3RpbmcgaW4geW91ciBjdXJyZW50IGJ1c2luZXNzLiBDaG9vc2Ugd2hpY2ggYW5kIHBsYXkgYWNjb3JkaW5nIHRvIHRoZSBnYW1lIHJ1bGVzLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIENhc2hHaXZlbiA9IDIwMDAwO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgIGlmIChfdHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vc3RhcnQgbmV3IGJ1c2luZXNzXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSwgMCwgZmFsc2UsIDAsIHRydWUsIENhc2hHaXZlbiwgZmFsc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vaW52ZXN0IGluIGV4aXN0aW5nIGJ1c2luZXNzXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24obnVsbCwgdHJ1ZSwgQ2FzaEdpdmVuLCBmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXMgYm90LCBzbyBza2lwcGluZyB0dXJuXCIpO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiN1wiOiAvL1lvdSBpbmhlcml0IGEgYnVzaW5lc3MgZnJvbSB5b3VyIEZhdGhlci4gRGVjaWRlIHRoZSB0eXBlIG9mIGJ1c2luZXNzIGl0IGlzLCB3aGF0IHRoZSBuYW1lIG9mIHRoZSBidXNpbmVzcyBpcywgd2hldGhlciBpdCBpcyBhIGhvbWUtYmFzZWQgb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3MgYW5kIGluY2x1ZGUgaXQgaW50byB5b3VyIGdhbWUgcGxheS4gUGF5IGEgJDIwLDAwMCB0cmFuc2ZlciBmZWUuIElmIHlvdSBkbyBub3QgaGF2ZSAkMjAsMDAwIGluIGNhc2gsIHlvdSBjYW5ub3QgaGF2ZSB0aGUgYnVzaW5lc3MuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgQ2FzaENvc3QgPSAyMDAwMDtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICBpZiAoX3R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAvL3BheSBhbW91bnRcclxuICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBDYXNoQ29zdCkge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBDYXNoQ29zdDtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSwgMCwgZmFsc2UsIDAsIHRydWUsIDAsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIsIDMwMCwgdGhpcy5pc093bmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vc2tpcFxyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlNraXBwaW5nLi4uXCIsIDE0MDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIGJvdCwgc28gc2tpcHBpbmcgdHVyblwiKTtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjhcIjogLy9kb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheSBkYXlcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwgMTgwMCk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiOVwiOiAvL1lvdSBidXkgYSB0ZWxldmlzaW9uIHN0YXRpb24gYW5kIGNvbnZpbmNlIGV2ZXJ5IHBsYXllciBpbiB0aGUgZ2FtZSB0byBtYXJrZXQgb24geW91ciBzdGF0aW9uIG9uZSB0aW1lLiBZb3UgcmVjZWl2ZSA1MCUgb2YgYWxsIHRoZSBtYXJrZXRpbmcgZG9sbGFycyBjdXJyZW50bHkgb24gdGhlIGJvYXJkLiBSb3VuZCB0byB0aGUgbmVhcmVzdCAkMSwwMDAgaWYgbmVlZGVkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBfYW1vdW50ID0gX2Ftb3VudCArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfYW1vdW50ID0gX2Ftb3VudCAvIDI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2YWx1ZTogXCIgKyBfYW1vdW50KTtcclxuICAgICAgICBfYW1vdW50ID0gTWF0aC5yb3VuZChfYW1vdW50IC8gMTAwMCkgKiAxMDAwO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJvdW5kZWQgdmFsdWU6IFwiICsgX2Ftb3VudCk7XHJcblxyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG5cclxuICAgICAgICBpZiAobW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICB2YXIgX2FjdG9yc0FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIF9kYXRhID0gX2FjdG9yc0FycmF5W2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgICAgICBfZGF0YS5NYXJrZXRpbmdBbW91bnQgPSBNYXRoLnJvdW5kKF9kYXRhLk1hcmtldGluZ0Ftb3VudCAvIDIpO1xyXG4gICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX2RhdGEpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKF9hY3RvcnNBcnJheSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IE1hdGgucm91bmQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudCAvIDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJDYXNoIGFtb3VudCAkXCIgKyBfYW1vdW50ICsgXCIgaGFzIHN1Y2Nlc3NmdWxseSBhZGRlZCwgY2FzaCBiYWxhbmNlIGJlY29tZXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MDAwKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMFwiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjExXCI6IC8vcm9sbCBkaWNlIHR3aWNlLCBpZiByZXN1bHQgaXMgPjE5IHRoZW4gdGFrZSBhbGwgbW9uZXkgaW5zaWRlIG1hcmtldGluZy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgICAgICB2YXIgRGljZTFSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICB2YXIgRGljZTJSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgdmFyIFRvdGFsUmVzdWx0ID0gRGljZTFSZXN1bHQgKyBEaWNlMlJlc3VsdDtcclxuXHJcbiAgICAgICAgaWYgKFRvdGFsUmVzdWx0ID49IDE5KSB7XHJcbiAgICAgICAgICB2YXIgX2Ftb3VudCA9IDA7XHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIF9hbW91bnQgPSBfYW1vdW50ICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRGljZSAxIFJlc3VsdDogXCIgKyBEaWNlMVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIDIgUmVzdWx0OiBcIiArIERpY2UyUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsOiBcIiArIFRvdGFsUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkFtb3VudCAkXCIgKyBfYW1vdW50ICsgXCIgaGFzIHN1Y2Nlc3NmdWxseSBhZGRlZCBpbiB5b3VyIGNhc2ggZnJvbSBtYXJrZXRpbmcgYW1vdW50IG9uIHRhYmxlLlwiLCA0MDAwKTtcclxuXHJcbiAgICAgICAgICBpZiAobW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHZhciBfYWN0b3JzQXJyYXkgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgX2RhdGEgPSBfYWN0b3JzQXJyYXlbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgX2RhdGEuTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX2RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIiArIERpY2UxUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgMiBSZXN1bHQ6IFwiICsgRGljZTJSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWw6IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiWW91IHJhbiBvdXQgb2YgbHVjaywgdHVybiB3aWxsIHNraXAgbm93XCIsIDQwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eShfaWQsIF9oYXNUd29TY3JlZW5zID0gZmFsc2UsIF90eXBlID0gMCkge1xyXG4gICAgdmFyIEluZGV4ID0gcGFyc2VJbnQoX2lkKTtcclxuICAgIEluZGV4ID0gSW5kZXggLSAxO1xyXG5cclxuICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgIGNhc2UgXCIxXCI6IC8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG4gICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX2xvc2VBbW91bnQsIDI0MDApO1xyXG4gICAgICAgIGVsc2UgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjJcIjogLy9Zb3UgcHV0IGFuIGFkIG9uIEZhY2Vib29rIGZvciB5b3VyIGJ1c2luZXNzLiBSb2xsIHRoZSBkaWNlOiAxIC0gSWYgeW91IHJvbGwgYSA2IG9yIGxvd2VyLCB5b3UgbG9zZSBhbGwgb2YgdGhlIG1vbmV5IGluIHlvdXIgbWFya2V0aW5nIGFjY291bnQgMiAtIElmIHlvdSByb2xsIGEgNyBvciBoaWdoZXIsIHlvdXIgYWQgbmV0cyB5b3UgODAwJSBvZiB0aGUgdG90YWwgbW9uZXkgY3VycmVudGx5IGluIHlvdXIgbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX21hcmtldGluZ0Ftb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHZhciBfZGljZVJlc3VsdDtcclxuICAgICAgICB2YXIgX211bHRpcGxpZXIgPSA4MDA7XHJcbiAgICAgICAgaWYgKF9tYXJrZXRpbmdBbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgICBNYXJrZXRpbmdEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX2RpY2VSZXN1bHQgfSB9O1xyXG5cclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgaWYgKF9kaWNlUmVzdWx0IDw9IDYpIHtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgZGljZSByZXN1bHQgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHNpeCwgc28geW91IHdpbGwgbG9zZSBhbGwgeW91ciBjdXJyZW50IG1hcmtldGluZyBhbW91bnQuXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkRvbmVcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChfZGljZVJlc3VsdCA+PSA3KSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIGRpY2UgcmVzdWx0IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBzZXZlbiwgc28geW91IHdpbGwgZ2V0IDgwMCUgcHJvZml0IG9uIGN1cnJlbnQgbWFya2V0aW5nIGFtb3VudC5cIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUmVjZWl2ZSBBbW91bnRcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gTWFya2V0aW5nRGF0YS5EYXRhLnJlc3VsdDtcclxuXHJcbiAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgPD0gNikge1xyXG4gICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX2xvc2VBbW91bnQsIDI0MDApO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcblxyXG4gICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX2RpY2VSZXN1bHQgPj0gNykge1xyXG4gICAgICAgICAgICB2YXIgX3Jlc3VsdCA9IChfbWFya2V0aW5nQW1vdW50ICogX211bHRpcGxpZXIpIC8gMTAwICsgX21hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX3Jlc3VsdDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgcHJvZml0IG9mICRcIiArIF9yZXN1bHQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LlwiLCAyNDAwKTtcclxuICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiM1wiOiAvL1lvdXIgYWQgY29udGFpbnMgZmFsc2UgY2xhaW1zIGFuZCByZXN1bHQgaW4gYSBnb3Zlcm5tZW50IGludmVzdGlnYXRpb24uIFlvdSBsb3NlIHlvdXIgZW50aXJlIE1hcmtldGluZyBBY2NvdW50LCBwbHVzIHBheSBsYXd5ZXIgZmVlcyBvZiAkMywwMDAgcGVyIGJ1c2luZXNzIHRvIHRoZSBiYW5rLiBJZiB5b3UgaGF2ZSBhIGxhd3llciwgeW91IGRvIG5vdCBoYXZlIHRvIHBheSB0aGUgZXh0cmEgJDMsMDAwIGluIGZlZXMsIHBlciBidXNpbmVzcy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX21hcmtldGluZ0Ftb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHZhciBfbGF3eWVyU3RhdHVzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0Ftb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50ICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgX2hhc01hcmtldGluZ0Ftb3VudCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfbXVsdGlwbGllciA9IDMwMDA7XHJcbiAgICAgICAgdmFyIF90b3RhbEFtb3VudCA9IF9tdWx0aXBsaWVyICogX2J1c2luZXNzQW1vdW50O1xyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF9tYXJrZXRpbmdBbW91bnQgPiAwKSBfaGFzTWFya2V0aW5nQW1vdW50ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBpZiAoX2xhd3llclN0YXR1cykgX3RvdGFsQW1vdW50ID0gMDtcclxuXHJcbiAgICAgICAgICBNYXJrZXRpbmdEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX3RvdGFsQW1vdW50IH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiTWFya2V0aW5nIEFtb3VudCA6ICRcIiArIF9tYXJrZXRpbmdBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiTGF3eWVyIEhpcmVkIDogXCIgKyBfbGF3eWVyU3RhdHVzICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIE51bWJlciBvZiBidXNpbmVzcyA6IFwiICsgX2J1c2luZXNzQW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkZlZXMgOiBcIiArIF9idXNpbmVzc0Ftb3VudCArIFwiICogXCIgKyBfbXVsdGlwbGllciArIFwiID0gJFwiICsgX3RvdGFsQW1vdW50LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRG9uZVwiO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF90b3RhbEFtb3VudCA9IE1hcmtldGluZ0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBoaXJlZCBsYXd5ZXIsIHlvdSBvbmx5IGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9tYXJrZXRpbmdBbW91bnQsIDQyMDApO1xyXG4gICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfdG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGF2ZSBub3QgaGlyZWQgYW55IGxhd3llciwgYmlsbCAkXCIgKyBfdG90YWxBbW91bnQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQgYWxvbmcgd2l0aCBtYXJrZXRpbmcgYW1vdW50LCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBjYXNoLHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNFwiOiAvL1lvdXIgTWFya2V0aW5nIEFjY291bnQgdHJpcGxlcywgYnV0IHlvdSBtdXN0IGxlYXZlIGl0IGluIHRoZSBhY2NvdW50LlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfbWFya2V0QW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMztcclxuICAgICAgICB2YXIgX2luY3JlYXNlQW1vdW50ID0gX21hbmFnZXIuTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcik7XHJcblxyXG4gICAgICAgIGlmIChfaW5jcmVhc2VBbW91bnQgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIiArIF9tYXJrZXRBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWw6IFwiICsgX21hcmtldEFtb3VudCArIFwiICogXCIgKyBfbXVsdGlwbGllciArIFwiID0gXCIgKyBfaW5jcmVhc2VBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcInlvdXIgbWFya2V0aW5nIGFtb3VudCBoYXMgYmVlbiBzdWNlc3NmdWxseSBpbmNyZWFzZSB0byAkXCIgKyBfaW5jcmVhc2VBbW91bnQsIDM2MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjVcIjogLy9Zb3UgaGlyZSBhIE1hcmtldGluZyBGaXJtIHRvIG1hcmtldCB5b3VyIGJ1c2luZXNzIGJ1dCBpdCB5aWVsZHMgbm8gcmVzdWx0cy4gWW91IGxvc2UgeW91ciBlbnRpcmUgbWFya2V0aW5nIGFjY291bnQgdG8gdGhlIEJhbmsuIFBsdXMgcGF5ICQ1LDAwMCBmb3IgdGhlaXIgc2VydmljZXMuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIGJpbGwgPSA1MDAwO1xyXG4gICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IGJpbGwpIHtcclxuICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IGJpbGw7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkZlZXMgJFwiICsgYmlsbCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCBhbG9uZyB3aXRoIG1hcmtldGluZyBhbW91bnQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI2XCI6IC8vWW91IGJlZ2luIGEgbmV3IG1hcmtldGluZyBjYW1wYWlnbi4gUm9sbCAxIGRpZS4gSWYgaXQgaXMgYW4gZXZlbiBudW1iZXIsIHlvdXIgY2FtcGFpZ24gaXMgc3VjY2Vzc2Z1bCBhbmQgeW91IHJlY2VpdmUgYWxsIG9mIHRoZSBtb25leSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50IGJhY2sgcGx1cyA1MDAlLiBJZiBpdCBpcyBhbiBvZGQgbnVtYmVyIHlvdSBsb3NlIGFsbCBvZiB0aGUgbW9uZXkgaW4geW91ciBtYXJrZXRpbmcgYWNjb3VudC5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX21hcmtldGluZ0Ftb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHZhciBfZGljZVJlc3VsdDtcclxuICAgICAgICB2YXIgX211bHRpcGxpZXIgPSA1MDA7XHJcbiAgICAgICAgdmFyIGlzRXZlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoX21hcmtldGluZ0Ftb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBfZGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxPbmVEaWNlKCk7XHJcblxyXG4gICAgICAgICAgaWYgKF9kaWNlUmVzdWx0ICUgMiA9PSAwKSBpc0V2ZW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfZGljZVJlc3VsdCwgSXNFdmVuOiBpc0V2ZW4gfSB9O1xyXG5cclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgaWYgKF9kaWNlUmVzdWx0ICUgMiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgaXNFdmVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgZGljZSByZXN1bHQgaXMgb2RkLCBzbyB5b3Ugd2lsbCBsb3NlIGFsbCB5b3VyIGN1cnJlbnQgbWFya2V0aW5nIGFtb3VudC5cIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRG9uZVwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF9kaWNlUmVzdWx0ICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgaXNFdmVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgZGljZSByZXN1bHQgaXMgZXZlbiwgc28geW91IHdpbGwgZ2V0IDUwMCUgcHJvZml0IG9uIGN1cnJlbnQgbWFya2V0aW5nIGFtb3VudC5cIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUmVjZWl2ZSBBbW91bnRcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gTWFya2V0aW5nRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgIGlzRXZlbiA9IE1hcmtldGluZ0RhdGEuRGF0YS5Jc0V2ZW47XHJcblxyXG4gICAgICAgICAgaWYgKCFpc0V2ZW4pIHtcclxuICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG5cclxuICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzRXZlbikge1xyXG4gICAgICAgICAgICB2YXIgX3Jlc3VsdCA9IChfbWFya2V0aW5nQW1vdW50ICogX211bHRpcGxpZXIpIC8gMTAwICsgX21hcmtldGluZ0Ftb3VudDtcclxuXHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIHByb2ZpdCBvZiAkXCIgKyBfcmVzdWx0ICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudC5cIiwgMjQwMCk7XHJcbiAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjdcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiOFwiOiAvL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMCkgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiOVwiOiAvL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICBlbHNlIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMFwiOiAvL1JlY2VpdmUgYWxsIG9mIHlvdXIgTWFya2V0aW5nIEJ1ZGdldCBiYWNrLCBwbHVzIDcwMCUgcHJvZml0LlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfbWFya2V0QW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdmFyIF9wcm9maXQgPSA3MDA7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBfbWFuYWdlci5HZXRNYXJrZXRpbmdNb25leShfcHJvZml0KTtcclxuXHJcbiAgICAgICAgaWYgKF9hbW91bnQgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcclxuICAgICAgICAgICAgXCJNYXJrZXRpbmcgQW1vdW50OiAkXCIgK1xyXG4gICAgICAgICAgICAgIF9tYXJrZXRBbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWw6IFwiICtcclxuICAgICAgICAgICAgICBfbWFya2V0QW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiArIChcIiArXHJcbiAgICAgICAgICAgICAgX21hcmtldEFtb3VudCArXHJcbiAgICAgICAgICAgICAgXCIqXCIgK1xyXG4gICAgICAgICAgICAgIF9wcm9maXQgK1xyXG4gICAgICAgICAgICAgIFwiICkvMTAwXCIgK1xyXG4gICAgICAgICAgICAgIFwiID0gXCIgK1xyXG4gICAgICAgICAgICAgIF9hbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwieW91ciBjYXNoIGFtb3VudCBoYXMgYmVlbiBzdWNlc3NmdWxseSBpbmNyZWFzZSBieSAkXCIgK1xyXG4gICAgICAgICAgICAgIF9hbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiLCB0b3RhbCBjYXNoIGJlY29tZXMgJFwiICtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsXHJcbiAgICAgICAgICAgIDQwMDBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTFcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTRcIjogLy9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcbiAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMCkgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjEwMCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDIxMDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIExvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KF9pZCwgX2hhc1R3b1NjcmVlbnMgPSBmYWxzZSwgX3R5cGUgPSAwKSB7XHJcbiAgICB2YXIgSW5kZXggPSBwYXJzZUludChfaWQpO1xyXG4gICAgSW5kZXggPSBJbmRleCAtIDE7XHJcblxyXG4gICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgY2FzZSBcIjFcIjogLy9sb3NlIG5leHQgdHVyblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBOZXh0VHVybih0cnVlKTtcclxuICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIGxvc2UgeW91ciBuZXh0IHR1cm4uXCIsIDI0MDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMlwiOiAvL1JvbGwgMiBkaWNlLCBtdWx0aXBseSBieSAkNSwwMDAgYW5kIHBheSBpdCB0byB0aGUgQmFuay4gSWYgeW91IGhhdmUgYSBsYXd5ZXIgeW91IGxvc2UgNTAlIG9mIHRoZSB0b3RhbCBiaWxsIGN1cnJlbnRseSBvd2VkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0O1xyXG4gICAgICAgIHZhciBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICB2YXIgVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgdmFyIF9oaXJlZExhd3llcjtcclxuXHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICBDYXNoTXVsaXRwbGllciA9IDUwMDA7XHJcbiAgICAgICAgICBUb3RhbFJlc3VsdCA9IERpY2VSZXN1bHQgKiBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICAgIF9oaXJlZExhd3llciA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG5cclxuICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBUb3RhbFJlc3VsdCwgbGF3eWVyOiBfaGlyZWRMYXd5ZXIgfSB9O1xyXG5cclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgQmlsbCBDYWxjdWxhdGVkIDogXCIgKyBEaWNlUmVzdWx0ICsgXCIgKiBcIiArIENhc2hNdWxpdHBsaWVyICsgXCIgPSAkXCIgKyBUb3RhbFJlc3VsdCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0RhdGEpO1xyXG4gICAgICAgICAgVG90YWxSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgX2hpcmVkTGF3eWVyID0gTG9zc2VzRGF0YS5EYXRhLmxhd3llcjtcclxuXHJcbiAgICAgICAgICBpZiAoX2hpcmVkTGF3eWVyKSBUb3RhbFJlc3VsdCA9IFRvdGFsUmVzdWx0IC8gMjtcclxuXHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IFRvdGFsUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChfaGlyZWRMYXd5ZXIpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgaGlyZWQgbGF3eWVyLCBoYWxmIGJpbGwgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhdmUgbm90IGhpcmVkIGFueSBsYXd5ZXIsIGJpbGwgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIzXCI6IC8vbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKHRydWUpO1xyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cIiwgMjQwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI0XCI6IC8vWWVhcmx5IGJ1c2luZXNzIGluc3VyYW5jZSBwcmVtaXVtIGlzIGR1ZS4gUGF5ICQyLDAwMCB0byB0aGUgQmFuayBmb3IgZWFjaCBIb21lLUJhc2VkIGJ1c2luZXNzLCAkNSwwMDAgZm9yIGVhY2ggQnJpY2sgJiBNb3J0YXIgYnVzaW5lc3MuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIGhvbWVCYXNlZEJ1c2luZXNzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgdmFyIGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBob21lTXVsdGlwbGllciA9IDIwMDA7XHJcbiAgICAgICAgdmFyIGJyaWNrTXVsaXBsaWVyID0gNTAwMDtcclxuICAgICAgICB2YXIgdG90YWxBbW91bnQgPSBob21lQmFzZWRCdXNpbmVzcyAqIGhvbWVNdWx0aXBsaWVyICsgYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyAqIGJyaWNrTXVsaXBsaWVyO1xyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IHRvdGFsQW1vdW50IH0gfTtcclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIkhvbWUgQmFzZWQgQW1vdW50IDogXCIgK1xyXG4gICAgICAgICAgICAgICAgaG9tZUJhc2VkQnVzaW5lc3MgK1xyXG4gICAgICAgICAgICAgICAgXCIgKiAkXCIgK1xyXG4gICAgICAgICAgICAgICAgaG9tZU11bHRpcGxpZXIgK1xyXG4gICAgICAgICAgICAgICAgXCIgPSAkXCIgK1xyXG4gICAgICAgICAgICAgICAgaG9tZUJhc2VkQnVzaW5lc3MgKiBob21lTXVsdGlwbGllciArXHJcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJCcmljayAmIE1vcnRhciBBbW91bnQgOiBcIiArXHJcbiAgICAgICAgICAgICAgICBicmlja0FuZE1vcnRhckJ1c2luZXNzICtcclxuICAgICAgICAgICAgICAgIFwiICogJFwiICtcclxuICAgICAgICAgICAgICAgIGJyaWNrTXVsaXBsaWVyICtcclxuICAgICAgICAgICAgICAgIFwiID0gJFwiICtcclxuICAgICAgICAgICAgICAgIGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgKiBicmlja011bGlwbGllciArXHJcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBBbW91bnQgOiBcIiArXHJcbiAgICAgICAgICAgICAgICBob21lQmFzZWRCdXNpbmVzcyAqIGhvbWVNdWx0aXBsaWVyICtcclxuICAgICAgICAgICAgICAgIFwiICsgXCIgK1xyXG4gICAgICAgICAgICAgICAgYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyAqIGJyaWNrTXVsaXBsaWVyICtcclxuICAgICAgICAgICAgICAgIFwiID0gJFwiICtcclxuICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG90YWxBbW91bnQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0b3RhbEFtb3VudCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gdG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIHRvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIG1vbmV5LCBza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjVcIjogLy9Zb3VyIGVtcGxveWVlIGNsYWltcyB5b3Ugc2V4dWFsbHkgaGFyYXNzZWQgdGhlbSwgYnV0IHlvdSBkaWQgbm90LiBZb3UgY2FuIGVpdGhlcjsgIDEgLSBTZXR0bGUgb3V0IG9mIGNvdXJ0IGFuZCBwYXkgdGhlbSAkNTAsMDAwLiAyIC0gVGFrZSB5b3VyIGNoYW5jZXMgaW4gY291cnQuIFJvbGwgMiBkaWNlIGFuZCBwYXkgJDEwLDAwMCB0aW1lcyB0aGUgbnVtYmVyIHJvbGxlZC5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX2NvdXJ0U2V0dGxlbWVudEZlZXMgPSA1MDAwMDtcclxuICAgICAgICB2YXIgRGljZVJlc3VsdDtcclxuICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXIgPSAxMDAwMDtcclxuICAgICAgICB2YXIgdG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF90eXBlID09IDApIHtcclxuICAgICAgICAgICAgLy9maXJzdCBidXR0b25cclxuXHJcbiAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfY291cnRTZXR0bGVtZW50RmVlcywgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiUGF5YWJsZSBhbW91bnQgOiAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vMm5kIGJ1dHRvblxyXG5cclxuICAgICAgICAgICAgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICB0b3RhbEFtb3VudCA9IERpY2VSZXN1bHQgKiBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IERpY2VSZXN1bHQsIFRvdGFsQW1vdW50OiB0b3RhbEFtb3VudCwgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgQW1vdW50IDogXCIgKyBEaWNlUmVzdWx0ICsgXCIgKiBcIiArIENhc2hNdWxpdHBsaWVyICsgXCIgPSAkXCIgKyB0b3RhbEFtb3VudCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgdGVtcFR5cGUgPSBMb3NzZXNEYXRhLkRhdGEuVHlwZTtcclxuICAgICAgICAgIGlmICh0ZW1wVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIF9jb3VydFNldHRsZW1lbnRGZWVzID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfY291cnRTZXR0bGVtZW50RmVlcykge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfY291cnRTZXR0bGVtZW50RmVlcztcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcyArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0ZW1wVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIERpY2VSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0b3RhbEFtb3VudCkge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSB0b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyB0b3RhbEFtb3VudCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjZcIjogLy8gSWYgQnVzaW5lc3MgIzEgaXMgSG9tZSBCYXNlZCwgcGF5IGEgJDUsMDAwIEluc3VyYW5jZSBEZWR1Y3RpYmxlOyBpZiBCcmljayAmIE1vcnRhciAkMTAsMDAwIGRlZHVjdGlibGUuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBfYnVzaW5lc3NUeXBlID0gcGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlKTtcclxuICAgICAgICBpZiAoX2J1c2luZXNzVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAvLyBmaXJzdCBidXNpbmVzcyB3YXMgaG9tZSBiYXNlZFxyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSA1MDAwO1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBwYXllZCAkNTAwMCBpbnN1cmFuY2Ugb24geW91ciBmaXJzdCBob21lIGJhc2VkIGJ1c2luZXNzLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfYnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICAgIC8vZmlyc3QgYnVzaW9uZXNzIHdhcyBicmljayAmIG1vcnRhclxyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSAxMDAwMCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gMTAwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQxMDAwMCBpbnN1cmFuY2Ugb24geW91ciBmaXJzdCBicmljayAmIG1vcnRhciBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjdcIjogLy9sb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3Ugd2lsbCBsb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXCIsIDI0MDApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjhcIjogLy9Zb3UgYXJlIGZpbmVkIDUwJSBvZiB5b3VyIGN1cnJlbnQgbGlxdWlkIGNhc2guIElmIHlvdSBoYXZlIGEgbGF3eWVyLCB5b3VyIGZpbmUgaXMgcmVkdWNlZCB0byAyMCUgb2YgeW91ciBjdXJyZW50IGxpcXVpZCBjYXNoLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBUb3RhbFJlc3VsdDtcclxuICAgICAgICB2YXIgX2hpcmVkTGF3eWVyO1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIFRvdGFsUmVzdWx0ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgICAgX2hpcmVkTGF3eWVyID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM7XHJcblxyXG4gICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IFRvdGFsUmVzdWx0LCBsYXd5ZXI6IF9oaXJlZExhd3llciB9IH07XHJcblxyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgQ2FzaCA6ICRcIiArIFRvdGFsUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIjUwJSBvZiBUb3RhbCBDYXNoIDogJFwiICsgVG90YWxSZXN1bHQgLyAyLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coTG9zc2VzRGF0YSk7XHJcbiAgICAgICAgICBUb3RhbFJlc3VsdCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBfaGlyZWRMYXd5ZXIgPSBMb3NzZXNEYXRhLkRhdGEubGF3eWVyO1xyXG5cclxuICAgICAgICAgIGlmIChfaGlyZWRMYXd5ZXIpIFRvdGFsUmVzdWx0ID0gKFRvdGFsUmVzdWx0ICogMjApIC8gMTAwO1xyXG4gICAgICAgICAgZWxzZSBUb3RhbFJlc3VsdCA9IChUb3RhbFJlc3VsdCAqIDUwKSAvIDEwMDtcclxuXHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IFRvdGFsUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChfaGlyZWRMYXd5ZXIpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgaGlyZWQgbGF3eWVyLCByZWR1Y2VkIGZpbmUgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhdmUgbm90IGhpcmVkIGFueSBsYXd5ZXIsIGZpbmUgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vIG1vbmV5LCBza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCA4MDApO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiOVwiOiAvL0EgY3VzdG9tZXIgaXMgaW5qdXJlZCBhdCBvbmUgb2YgeW91ciBidXNpbmVzcyBsb2NhdGlvbnMuIFlvdSBjYW4gZWl0aGVyOyAxIC0gU2V0dGxlIG91dCBvZiBjb3VydCBhbmQgcGF5IHRoZW0gJDI1LDAwMCAsIDIgLSBUYWtlIHlvdXIgY2hhbmNlcyBpbiBjb3VydC4gUm9sbCAyIGRpY2UgYW5kIHBheSAkNSwwMDAgdGltZXMgdGhlIG51bWJlciByb2xsZWQuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9jb3VydFNldHRsZW1lbnRGZWVzID0gMjUwMDA7XHJcbiAgICAgICAgdmFyIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gNTAwMDtcclxuICAgICAgICB2YXIgdG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF90eXBlID09IDApIHtcclxuICAgICAgICAgICAgLy9maXJzdCBidXR0b25cclxuXHJcbiAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfY291cnRTZXR0bGVtZW50RmVlcywgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiUGF5YWJsZSBhbW91bnQgOiAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vMm5kIGJ1dHRvblxyXG5cclxuICAgICAgICAgICAgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICB0b3RhbEFtb3VudCA9IERpY2VSZXN1bHQgKiBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IERpY2VSZXN1bHQsIFRvdGFsQW1vdW50OiB0b3RhbEFtb3VudCwgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgQW1vdW50IDogXCIgKyBEaWNlUmVzdWx0ICsgXCIgKiBcIiArIENhc2hNdWxpdHBsaWVyICsgXCIgPSAkXCIgKyB0b3RhbEFtb3VudCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgdGVtcFR5cGUgPSBMb3NzZXNEYXRhLkRhdGEuVHlwZTtcclxuICAgICAgICAgIGlmICh0ZW1wVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIF9jb3VydFNldHRsZW1lbnRGZWVzID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfY291cnRTZXR0bGVtZW50RmVlcykge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfY291cnRTZXR0bGVtZW50RmVlcztcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcyArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0ZW1wVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIERpY2VSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0b3RhbEFtb3VudCkge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSB0b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyB0b3RhbEFtb3VudCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEwXCI6IC8vWW91ciBjb21wdXRlciBoYXMgYmVlbiBoYWNrZWQhIFlvdSBjYXRjaCBpdCBpbiB0aW1lLCBidXQgeW91IG11c3QgYnV5IG1vcmUgc2VjdXJpdHkgZm9yIHlvdXIgYnVzaW5lc3MgcmVjb3Jkcy4gUGF5ICQyMCwwMDAgdG8gdGhlIEJhbmsuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIGJpbGwgPSAyMDAwMDtcclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IGJpbGwpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBiaWxsO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgYmlsbCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjExXCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjE0XCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBXaWxkQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLCBfdHlwZSA9IDApIHtcclxuICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICBJbmRleCA9IEluZGV4IC0gMTtcclxuXHJcbiAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICBjYXNlIFwiMVwiOiAvL2RvdWJsZXMgeW91ciBpbmNvbWUgb24gdGhlIG5leHQgUGF5IERheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwgMjQwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIyXCI6IC8vUm9sbCAxIGRpZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIGFkdmFuY2UgZnJvbSB0aGUgQmFuay5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB2YXIgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gNTAwMDtcclxuICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcblxyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgUmVzdWx0OiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWw6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gXCIgKyBUb3RhbFJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50ICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgaGFzIGJlZW4gYWRkZWQgaW50byB5b3VyIGNhc2guXCIsIDQwMDApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjNcIjogLy9Zb3UgZ28gdG8gYW4gRXN0YXRlIEF1Y3Rpb24gYW5kIGJ1eSBhIHBhaW50aW5nIHRoYXQgdHVybnMgb3V0IHRvIGJlIHZhbHVhYmxlLiBZb3UgY2FuIHNlbGwgaXQgbm93LCByb2xsIGJvdGggZGljZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQxMCwwMDAgYW5kIHJlY2VpdmUgcHJvZml0cyBmcm9tIHRoZSBCYW5rLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gMTAwMDA7XHJcbiAgICAgICAgdmFyIFRvdGFsUmVzdWx0ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG5cclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50ICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgaGFzIGJlZW4gYWRkZWQgaW50byB5b3VyIGNhc2guXCIsIDUyMDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNFwiOiAvL1lvdXIgYnVzaW5lc3MgaXMgYXVkaXRlZCBieSB0aGUgSVJTIGFuZCB5b3UgaGF2ZSBub3QgYmVlbiBrZWVwaW5nIHZlcnkgZ29vZCByZWNvcmRzIG9mIHRoZSBpbmNvbWUgYW5kIGV4cGVuc2VzIGZvciB5b3VyIGJ1c2luZXNzLiBUaGV5IGZpbmUgeW91ICQzMCwwMDAuIElmIHlvdSBoYXZlIGEgbGF3eWVyLCB5b3VyIGZpbmUgaXMgJDE1LDAwMC5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX2ZpbmUgPSAzMDAwMDtcclxuICAgICAgICB2YXIgX2xhd3llclN0YXR1cyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpIF9maW5lID0gX2ZpbmUgLyAyO1xyXG5cclxuICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9maW5lIH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkxhd3llciBIaXJlZCA6IFwiICsgX2xhd3llclN0YXR1cyArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBmaW5lICRcIiArIF9maW5lLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX2ZpbmUgPSBXaWxkQ2FyZERhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9maW5lKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfZmluZTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJGZWVzICRcIiArIF9maW5lICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDI4MDApO1xyXG4gICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNVwiOiAvL1lvdSBjYW4gYmVjb21lIGEgdmVuZG9yIGF0IGEgbG9jYWwgSmF6eiBGZXN0aXZhbCBmb3IgYSB2ZW5kaW5nIGZlZSBvZiAkMjAsMDAwLiBJZiB5b3UgYWNjZXB0LCBwYXkgdGhlIEJhbmsgJDIwLDAwMCBhbmQgcm9sbCB0d28gZGllOyBtdWx0aXBseSB0aGUgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIHZlbmRpbmcgaW5jb21lIGZyb20gdGhlIEJhbmsuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9mZWVzID0gMjAwMDA7XHJcbiAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gNTAwMDtcclxuICAgICAgICB2YXIgX2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIF9yZXN1bHQ7XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF90eXBlID09IDApIHtcclxuICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgX3Jlc3VsdCA9IF9kaWNlUmVzdWx0ICogX211bHRpcGxpZXI7XHJcblxyXG4gICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfcmVzdWx0LCBEaWNlOiBfZGljZVJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9mZWVzKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9mZWVzO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJlc3VsdDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBBbW91bnQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyICsgXCIgPSAkXCIgKyBfcmVzdWx0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlJlY2VpdmUgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIsIDI0MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJza2lwcGluZyB0dXJuIG5vdy5cIiwgMTgwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gV2lsZENhcmREYXRhLkRhdGEuRGljZTtcclxuICAgICAgICAgIF9yZXN1bHQgPSBXaWxkQ2FyZERhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX3Jlc3VsdDtcclxuICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNhc2ggYW1vdW50ICRcIiArIF9yZXN1bHQgKyBcIiBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgYWRkZWQuXCIsIDMwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjZcIjogLy9BbiB1bnNhdGlzZmllZCBjdXN0b21lciB0YWtlcyB0byBzb2NpYWwgbWVkaWEgYW5kIHNtZWFy4oCZcyB5b3VyIG5hbWUuIEl0IGFmZmVjdHMgeW91ciBCcmFuZCBhbmQgeW91ciBidXNpbmVzcyBiZWZvcmUgeW91IGNhbiBnZXQgYSBoYW5kbGUgb24gaXQuIFlvdSBsb3NlIGhhbGYgeW91ciBpbmNvbWUgb24geW91ciBuZXh0IFBheURheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZUhhbGZQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgaGFsZiBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjdcIjogLy9wYXkgb2ZmIHlvdXIgbG9hbiBmb3IgeW91ciBCcmljayAmIE1vcnRhciBCdXNpbmVzcy4gSWYgeW91IGhhdmUgbm8gbG9hbiBvdXRzdGFuZGluZywgcmVjZWl2ZSAkNTAsMDAwLlxyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbG9hblJlc2V0ID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgdmFyIF90eXBlID0gcGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICBpZiAoX3R5cGUgPT0gMiAmJiBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgICBfbG9hblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX2xvYW5SZXNldCkge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3VyIG91dHN0YW5kaW5nIGxvYW4gaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiLCAzMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IDUwMDAwO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIG5vIGxvYW4sIGFtb3VudCAkNTAwMDAgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoXCIsIDMyMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjhcIjogLy9Zb3UgYXJlIHN1ZWQgZm9yIFRyYWRlbWFyayBJbmZyaW5nZW1lbnQgKGNvcHlpbmcgc29tZW9uZSBlbHNl4oCZcyBwcm9kdWN0KSwgYW5kIHlvdSBsb3NlLiBJZiB5b3UgaGF2ZSBhIGxhd3llciByb2xsIDIgZGllLCBtdWx0aXBseSBieSAkMSwwMDAgYW5kIHBheSB0byB0aGUgQmFuay4gSWYgeW91IGRvIG5vdCBoYXZlIGEgTGF3eWVyLCByb2xsIHR3byBkaWUgYW5kIG11bHRpcGx5IGJ5ICQzLDAwMCBhbmQgcGF5IHRvIHRoZSBCYW5rLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB2YXIgX2xhd3llclN0YXR1cyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgdmFyIF9maW5lID0gMzAwMDtcclxuICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKSBfZmluZSA9IDEwMDA7XHJcblxyXG4gICAgICAgICAgVG90YWxSZXN1bHQgPSBfZmluZSAqIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgICBXaWxkQ2FyZERhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBUb3RhbFJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJMYXd5ZXIgSGlyZWQgOiBcIiArIF9sYXd5ZXJTdGF0dXMgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgZmluZSAkXCIgKyBUb3RhbFJlc3VsdCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIFRvdGFsUmVzdWx0ID0gV2lsZENhcmREYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBUb3RhbFJlc3VsdCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRmVlcyAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCAyODAwKTtcclxuICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjlcIjogLy9UaGUgQ2l0eSBpcyBhZGRpbmcgYSBidXMgbGluZSB0aGF0IHJ1bnMgaW4gZnJvbnQgb2YgeW91ciBidXNpbmVzcy4gSWYgeW91IG93biBhIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzLCBmb3IgdGhlIHJlc3Qgb2YgdGhlIGdhbWUsIHlvdSByZWNlaXZlIGRvdWJsZSB5b3VyIGluY29tZSBmb3Igb25lIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBCTUJ1c2luZXNzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICBpZiAoQk1CdXNpbmVzcyA8PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkbyBub3QgaGF2ZSBhbnkgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcywgc2tpcHBpbmcgdHVybi5cIiwgMzIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlU2VsZXRpdmVEb3VibGVQYXlEYXlfQnVzaW5lc3NQYXlEYXlVSVNldHVwKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEwXCI6IC8vWW91IHN1ZSBhIGNvbXBhbnkgZm9yIERlZmFtYXRpb24gKGx5aW5nIG9uIHlvdSkgYW5kIHdpbi4gQ2hvb3NlIGEgcGxheWVyIGFuZCByZWNlaXZlIGFsbCBvZiB0aGVpciBwcm9maXRzIG9uIHRoZWlyIG5leHQgUGF5IERheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5TZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTFcIjogLy8gcmVjZWl2ZSBkb3VibGUgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIGFsbCBvZiB5b3VyIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsIDI0MDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEludmVzdEZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgUGF5RGF5RnVuY3Rpb25hbGl0eSgpIHt9LFxyXG5cclxuICBEb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KCkge30sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5PbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbih0cnVlKTtcclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBTZWxsRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgR29CYWNrRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Hb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgfSxcclxufSk7XHJcbm1vZHVsZS5leHBvcnRzID0gRGVja3NEYXRhO1xyXG4iXX0=