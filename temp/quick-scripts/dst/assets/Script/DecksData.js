
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
var LongMessageTime = 5000; //-------------------------------------------Spaces Data-------------------------//

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
  onLoad: function onLoad() {
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
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
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

        if (IsLoanTaken == 1) //means user has taken loan
          {
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
          if (_type == 0) //start new business
            {
              this.ShowCardInfo("", false);
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(false, true, 0, false, 0, true, CashGiven, false);
            } else if (_type == 1) //invest in existing business
            {
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
          if (_type == 0) //pay amount
            {
              if (_manager.PlayerGameInfo[_playerIndex].Cash >= CashCost) {
                _manager.PlayerGameInfo[_playerIndex].Cash -= CashCost;
                this.ShowCardInfo("", false);
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(false, true, 0, false, 0, true, 0, true);
              } else {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Not enough cash.", 300, this.isOwner);
              }
            } else if (_type == 1) //skip
            {
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

        if (_businessType == 1) // first business was home based
          {
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
          } else if (_businessType == 2) //first busioness was brick & mortar
          {
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
          console.log(_this7.WildCards[Index].Description);
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
          console.log(_this7.WildCards[Index].Description);
          break;

        case "9":
          console.log(_this7.WildCards[Index].Description);
          break;

        case "10":
          console.log(_this7.WildCards[Index].Description);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiTG9zc2VzRGF0YSIsIk1hcmtldGluZ0RhdGEiLCJXaWxkQ2FyZERhdGEiLCJCaWdCdXNpbmVzc0RhdGEiLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJFbnVtU3BhY2VUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIldpbGRDYXJkIiwiQmlnQnVzaW5lc3MiLCJNYXJrZXRpbmciLCJJbnZlc3QiLCJMb3NzZXMiLCJQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJPbmVRdWVzdGlvbiIsIlNlbGwiLCJCdXlPclNlbGwiLCJHb0JhY2tTcGFjZXMiLCJDYXJkRGF0YSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJJRCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIlRleHQiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRGVzY3JpcHRpb24iLCJIYXNCdXR0b24iLCJIYXNUd29CdXR0b25zIiwiSGFzVGhyZWVCdXR0b25zIiwiQnV0dG9uTmFtZSIsIlNlY29uZEJ1dHRvbk5hbWUiLCJUaGlyZEJ1dHRvbk5hbWUiLCJjdG9yIiwiQ2FyZFVJIiwiVG9hc3ROb2RlIiwiTm9kZSIsIlRvYXN0TGFiZWwiLCJMYWJlbCIsIkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvbkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlIiwiSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlIiwiQ29tcGxldGlvblRvYXN0Tm9kZSIsIkNvbXBsZXRpb25Ub2FzdExhYmVsIiwiRGVja3NEYXRhIiwiQ29tcG9uZW50IiwiTWFpblVJIiwiV2lsZENhcmRzIiwiU3BhY2VzVHlwZSIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsIlNlbGVjdGVkQ2FyZEluZGV4IiwiQ2FyZFNlbGVjdGVkIiwiSXNCb3RUdXJuIiwiaXNPd25lciIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlNob3dDYXJkSW5mbyIsIm9uRGlzYWJsZSIsIm9mZiIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiX2lzQm90IiwiX2hhc1R3b0J1dHRvbiIsImFjdGl2ZSIsInNldFRpbWVvdXQiLCJFeGl0Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCIsIl9yYW5kb21WYWx1ZSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50Iiwic3RyaW5nIiwiQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbiIsIkdlbmVyYXRlUmFuZG9tTWFya2V0aW5nQ2FyZCIsIkdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZCIsIkdlbmVyYXRlUmFuZG9tV2lsZENhcmQiLCJTcGFjZUludmVzdCIsIl9pbmRleCIsIkNvbXBsZXRlVHVybldpdGhUb2FzdCIsIlNwYWNlUGF5RGF5IiwiUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlRG91YmxlUGF5RGF5IiwiRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlT25lUXVlc3Rpb24iLCJTcGFjZVNlbGwiLCJTcGFjZUJ1eU9yU2VsbCIsIlNwYWNlR29CYWNrU3BhY2VzIiwibWVzc2FnZSIsIl9zdGF0ZSIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUmVzZXRDYXJkRGlzcGxheSIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJUd29CdXR0b25zRnVuY3Rpb25hbGl0eSIsImV2ZW50IiwiX3R5cGUiLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkiLCJHb0JhY2tGdW5jdGlvbmFsaXR5IiwiQ2hlY2tMb2FuIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiX21hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsIk5vT2ZCdXNpbmVzcyIsImxlbmd0aCIsIkxvYW5UYWtlbiIsInZhbCIsIlJlc3VsdCIsInYyIiwiRG9uZUJ1dHRvbkNsaWNrZWQiLCJjbGVhclRpbWVvdXQiLCJDb21wbGV0aW9uV2luZG93IiwiY29uc29sZSIsImVycm9yIiwiX21zZyIsIl90aW1lIiwiX2NoYW5nZVR1cm4iLCJsb2ciLCJfZGVsYXkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJBc3NpZ25TZWNvbmRTY3JlZW5EYXRhIiwiX0xhYmVsUmVmIiwiX2J1dHRvbk5hbWUiLCJfaWQiLCJfaGFzVHdvU2NyZWVucyIsIkluZGV4IiwicGFyc2VJbnQiLCJfcmVzdWx0IiwiSXNMb2FuVGFrZW4iLCJ4IiwieSIsIkxvYW5BbW91bnQiLCJfY2FyZEluZm8iLCJMYXd5ZXJTdGF0dXMiLCJFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJfZGljZVJlc3VsdCIsIl9tdWx0aXBsaWVyIiwiUm9sbFR3b0RpY2VzIiwiRGF0YSIsInJlc3VsdCIsIkRpY2UiLCJDYXNoIiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJDYXNoR2l2ZW4iLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiQ2FzaENvc3QiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIl9hbW91bnQiLCJtb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsIk1hcmtldGluZ0Ftb3VudCIsInJvdW5kIiwiX2FjdG9yc0FycmF5IiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tQWN0b3JzQXJyYXkiLCJfZGF0YSIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsInNldEN1c3RvbVByb3BlcnR5IiwiRGljZTFSZXN1bHQiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX2xvc2VBbW91bnQiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbWFya2V0aW5nQW1vdW50IiwiX2xhd3llclN0YXR1cyIsIl9idXNpbmVzc0Ftb3VudCIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiX2hhc01hcmtldGluZ0Ftb3VudCIsIl90b3RhbEFtb3VudCIsIl9tYXJrZXRBbW91bnQiLCJfaW5jcmVhc2VBbW91bnQiLCJNdWx0aXBseU1hcmtldGluZ01vbmV5IiwiYmlsbCIsImlzRXZlbiIsIlJvbGxPbmVEaWNlIiwiSXNFdmVuIiwiX3Byb2ZpdCIsIkdldE1hcmtldGluZ01vbmV5IiwiRGljZVJlc3VsdCIsIkNhc2hNdWxpdHBsaWVyIiwiX2hpcmVkTGF3eWVyIiwibGF3eWVyIiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsImhvbWVCYXNlZEJ1c2luZXNzIiwiYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyIsImhvbWVNdWx0aXBsaWVyIiwiYnJpY2tNdWxpcGxpZXIiLCJ0b3RhbEFtb3VudCIsIl9jb3VydFNldHRsZW1lbnRGZWVzIiwiVHlwZSIsIlRvdGFsQW1vdW50IiwidGVtcFR5cGUiLCJfYnVzaW5lc3NUeXBlIiwiQnVzaW5lc3NUeXBlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJfZmluZSIsIl9mZWVzIiwiX2xvYW5SZXNldCIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3QjtBQUNBLElBQUlDLFVBQVUsR0FBRyxJQUFqQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxJQUFwQjtBQUNBLElBQUlDLFlBQVksR0FBRyxJQUFuQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxJQUF0QjtBQUNBLElBQUlDLFVBQUo7QUFDQSxJQUFJQyxvQkFBb0IsR0FBRyxJQUEzQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxJQUF0QixFQUVBOztBQUNBLElBQUlDLGFBQWEsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDeEJDLEVBQUFBLElBQUksRUFBQyxDQURtQjtBQUV4QkMsRUFBQUEsUUFBUSxFQUFFLENBRmM7QUFHeEJDLEVBQUFBLFdBQVcsRUFBRSxDQUhXO0FBSXhCQyxFQUFBQSxTQUFTLEVBQUUsQ0FKYTtBQUt4QkMsRUFBQUEsTUFBTSxFQUFFLENBTGdCO0FBTXhCQyxFQUFBQSxNQUFNLEVBQUMsQ0FOaUI7QUFPeEJDLEVBQUFBLE1BQU0sRUFBRSxDQVBnQjtBQVF4QkMsRUFBQUEsWUFBWSxFQUFFLENBUlU7QUFTeEJDLEVBQUFBLFdBQVcsRUFBRSxDQVRXO0FBVXhCQyxFQUFBQSxJQUFJLEVBQUUsQ0FWa0I7QUFXeEJDLEVBQUFBLFNBQVMsRUFBRSxFQVhhO0FBWXhCQyxFQUFBQSxZQUFZLEVBQUM7QUFaVyxDQUFSLENBQXBCLEVBY0E7O0FBQ0EsSUFBSUMsUUFBUSxHQUFDZCxFQUFFLENBQUNlLEtBQUgsQ0FBUztBQUNsQkMsRUFBQUEsSUFBSSxFQUFDLFVBRGE7QUFFbEJDLEVBQUFBLFVBQVUsRUFB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Q0MsZUFBbEMsR0FBb0Q4SCxtQ0FBcEQsQ0FBd0YsSUFBeEY7QUFDQSxTQUFLdkssWUFBTCxDQUFrQixFQUFsQixFQUFxQixLQUFyQjtBQUNILEdBOXNEb0I7QUFndERyQm1ELEVBQUFBLGlCQWh0RHFCLCtCQWl0RHJCO0FBQ0lySCxJQUFBQSx3QkFBd0IsQ0FBQzBHLFFBQXpCLENBQWtDd0MscUJBQWxDLEdBQTBEd0YscUNBQTFELENBQWdHLElBQWhHO0FBQ0EsU0FBS3hLLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFDSCxHQXB0RG9CO0FBc3REckJxRCxFQUFBQSxzQkF0dERxQixvQ0F1dERyQjtBQUNJdkgsSUFBQUEsd0JBQXdCLENBQUMwRyxRQUF6QixDQUFrQ3dDLHFCQUFsQyxHQUEwRHlGLGdDQUExRCxDQUEyRixJQUEzRjtBQUNBLFNBQUt6SyxZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0gsR0ExdERvQjtBQTR0RHJCdUQsRUFBQUEsbUJBNXREcUIsaUNBNnREckI7QUFDSXpILElBQUFBLHdCQUF3QixDQUFDMEcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EaUksK0JBQXBEO0FBQ0EsU0FBSzFLLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFDSDtBQWh1RG9CLENBQVQsQ0FBaEI7QUFrdURBMkssTUFBTSxDQUFDQyxPQUFQLEdBQWdCMUwsU0FBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIExvc3Nlc0RhdGEgPSBudWxsO1xyXG52YXIgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbnZhciBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG52YXIgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxudmFyIFRpbWVvdXRSZWY7XHJcbnZhciBDb21wbGV0aW9uV2luZG93VGltZSA9IDgwMDA7XHJcbnZhciBMb25nTWVzc2FnZVRpbWUgPSA1MDAwO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tU3BhY2VzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1TcGFjZVR5cGUgPSBjYy5FbnVtKHtcclxuICAgIE5vbmU6MCxcclxuICAgIFdpbGRDYXJkOiAxLFxyXG4gICAgQmlnQnVzaW5lc3M6IDIsXHJcbiAgICBNYXJrZXRpbmc6IDMsXHJcbiAgICBJbnZlc3Q6IDQsXHJcbiAgICBMb3NzZXM6NSxcclxuICAgIFBheURheTogNixcclxuICAgIERvdWJsZVBheURheTogNyxcclxuICAgIE9uZVF1ZXN0aW9uOiA4LFxyXG4gICAgU2VsbDogOSxcclxuICAgIEJ1eU9yU2VsbDogMTAsXHJcbiAgICBHb0JhY2tTcGFjZXM6MTEsXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgY2FyZCBkYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YT1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiQ2FyZERhdGFcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBJRDpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJJRFwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcIklkIG9mIHRoZSBjYXJkXCJ9LFxyXG4gICAgICAgIERlc2NyaXB0aW9uOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiZGVzY3JpcHRpb24gb2YgdGhlIGNhcmRcIn0sXHJcbiAgICAgICAgSGFzQnV0dG9uOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkhhc0J1dHRvblwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLmJvb2xlYW4sXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSBpbnRlcmFjdGlvbiBidXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSGFzVHdvQnV0dG9uczpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJIYXNUd29CdXR0b25zXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiaWYgdGhpcyBjYXJkIHNob3VsZCBoYXZlIHR3byBpbnRlcmFjdGlvbiBidXR0b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSGFzVGhyZWVCdXR0b25zOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkhhc1RocmVlQnV0dG9uc1wiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLmJvb2xlYW4sXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJpZiB0aGlzIGNhcmQgc2hvdWxkIGhhdmUgdGhyZWUgaW50ZXJhY3Rpb24gYnV0dG9uXCJ9LFxyXG4gICAgICAgIEJ1dHRvbk5hbWU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQnV0dG9uTmFtZVwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYnV0dG9uIG5hbWUgdG8gc2hvdyBvbiBzY3JlZW5cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU2Vjb25kQnV0dG9uTmFtZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTZWNvbmRCdXR0b25OYW1lXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJTZWNvbmQgYnV0dG9uIG5hbWUgdG8gc2hvdyBvbiBzY3JlZW5cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVGhpcmRCdXR0b25OYW1lOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlNlY29uZEJ1dHRvbk5hbWVcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJTZWNvbmQgYnV0dG9uIG5hbWUgdG8gc2hvdyBvbiBzY3JlZW5cIn0sXHJcbiB9LFxyXG5cclxuIGN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG4gfVxyXG5cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkVUk9Y2MuQ2xhc3Moe1xyXG4gICBuYW1lOlwiQ2FyZFVJXCIsXHJcbiAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIFRvYXN0Tm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG9hc3ROb2RlXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJub2RlIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwifSxcclxuICAgICAgIFRvYXN0TGFiZWw6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0TGFiZWxcIixcclxuICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJsYWJlbCByZWZlcmVuY2UgZm9yIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgIEJ1dHRvbk5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIkV4aXRCdXR0b25cIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcIkJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIn0sXHJcbiAgICAgICAgSW50ZXJhY3Rpb25CdXR0b25Ob2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJJbnRlcmFjdGlvbkJ1dHRvblwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlcmFjdGlvbiBCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJcclxuICAgICAgIH0sXHJcbiAgICAgICBJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcInR3byBpbnRlcmFjdGlvbiBCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJcclxuICAgICAgIH0sXHJcbiAgICAgICBJbnRlcmFjdGlvblRocmVlQnV0dG9uc05vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIkludGVyYWN0aW9uVGhyZWVCdXR0b25zTm9kZVwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJ0aHJlZSBpbnRlcmFjdGlvbiBCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJcclxuICAgICAgIH0sXHJcbiAgICAgICBDb21wbGV0aW9uVG9hc3ROb2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJDb21wbGV0aW9uVG9hc3ROb2RlXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJub2RlIHJlZmVyZW5jZSBmb3IgY29tcGxlaW9uIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgICBDb21wbGV0aW9uVG9hc3RMYWJlbDpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQ29tcGxldGlvblRvYXN0TGFiZWxcIixcclxuICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJsYWJlbCByZWZlcmVuY2UgZm9yIGNvbXBsZWlvbiB0b2FzdCBub2RlXCJ9LFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxuXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgZGVja3MgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGVja3NEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJEZWNrc0RhdGFcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBNYWluVUk6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJNYWluVUlcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogQ2FyZFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiVUkgb2YgZGVja3NcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQmlnQnVzaW5lc3M6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJCaWdCdXNpbmVzc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBiaWcgYnVzaW5lc3NcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1hcmtldGluZzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBtYXJrZXRpbmdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIExvc3NlczpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkxvc3Nlc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBsb3NzZXNcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFdpbGRDYXJkczpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIldpbGRDYXJkc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBXaWxkQ2FyZHNcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFNwYWNlc1R5cGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBFbnVtU3BhY2VUeXBlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBFbnVtU3BhY2VUeXBlLk5vbmUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJzdGF0ZXMgbWFjaGluZXMgYnkgdHlwZSBvZiBjYXJkIG9yIHNwYWNlcyBvbiBib2FyZFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KFwiMVwiKTtcclxuICAgICAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAgICAgLy8gdGhpcy5Db3VudGVyPTA7XHJcbiAgICAgICAgLy8gdGhpcy5HZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCh0aGlzLkNvdW50ZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWRcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlNob3dDYXJkXCIsIHRoaXMuU2hvd0NhcmRJbmZvLCB0aGlzKTtcclxuICAgICAgfSxcclxuICAgIFxyXG4gICAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJTaG93Q2FyZFwiLCB0aGlzLlNob3dDYXJkSW5mbywgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICAgICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIF9oYXNCdXR0b24gPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UsX2hhc1R3b0J1dHRvbj1mYWxzZSkge1xyXG4gICAgICAgIGlmIChfaXNPd25lciAmJiBfaGFzQnV0dG9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9oYXNUd29CdXR0b24pXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuYWN0aXZlID0gZmFsc2U7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfaXNPd25lciAmJiAhX2hhc0J1dHRvbikge1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRXhpdENhcmRJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3M7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKVxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sIF9pc0JvdCx0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5NYXJrZXRpbmc7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbiwgX2lzQm90LHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5Mb3NzZXM7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG4gICAgIFxyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QsdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucyk7XHJcblxyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbVdpbGRDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLldpbGRDYXJkO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXggPSBfcmFuZG9tVmFsdWU7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQgPSB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuIFxyXG4gICAgICAgIGlmICh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKVxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uU2Vjb25kQnV0dG9uTmFtZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sIF9pc0JvdCx0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKTtcclxuXHJcbiAgICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlSW52ZXN0KF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5JbnZlc3Q7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGludmVzdCBvbmUgbW9yZSB0aW1lIGluIEdvbGQgb3Igc3RvY2tzIHRoaXMgdHVybi5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0cnVlLCBfaXNCb3QpO1xyXG5cclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VQYXlEYXkoX2lzT3duZXIsIF9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIFBheURheSBzcGFjZS5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZURvdWJsZVBheURheShfaXNPd25lciwgX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gRG91YmxlUGF5RGF5IHNwYWNlLlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLkRvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCBmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlT25lUXVlc3Rpb24oX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBhc2sgb25lIHF1ZXN0aW9uIHRvIGFueSBvdGhlciBwbGF5ZXIsIGlmIHBsYXllciBpcyB1bmFibGUgdG8gYW5zd2VyIHRoZXkgd2lsbCBwYXkgeW91IHNvbWUgY2FzaCBhbW91bnQuXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRXhlY3V0ZVwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VTZWxsKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5TZWxsO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBzZWxsIGFueSBvbmUgb2YgeW91ciBidXNpbmVzcyBvciBjYW4gc2tpcCB0dXJuLlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcbiAgICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIm1zZ1wiLCAyMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlQnV5T3JTZWxsKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5CdXlPclNlbGw7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIEJ1eSBvciBzZWxsIEdvbGQgb3Igc3RvY2tzIG9uZSBtb3JlIHRpbWUgaW4gdGhpcyB0dXJuLlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcbiAgICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIm1zZ1wiLCAyMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlR29CYWNrU3BhY2VzKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5Hb0JhY2tTcGFjZXM7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJ5b3Ugd2lsbCBoYXZlIHRvIGdvIGJhY2sgMyBzcGFjZXMuXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRXhlY3V0ZVwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNob3dDYXJkSW5mbzogZnVuY3Rpb24gKG1lc3NhZ2UsIF9zdGF0ZSkge1xyXG4gICAgICAgIGlmIChfc3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLlRvYXN0TGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdExhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLlRvYXN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRDYXJkSW5mbygpIHtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG5cclxuICAgICAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAgICAgLy8gdGhpcy5Db3VudGVyKys7XHJcbiAgICAgICAgLy8gdGhpcy5HZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCh0aGlzLkNvdW50ZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBUd29CdXR0b25zRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKG51bGwsMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIENhcmRGdW50aW9uYWxpdHlCdXR0b24oZXZlbnQ9bnVsbCxfdHlwZT0wKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkJpZ0J1c2luZXNzKSB7XHJcbiAgICAgICAgICAgIGlmIChCaWdCdXNpbmVzc0RhdGEgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCx0cnVlLF90eXBlKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLGZhbHNlLF90eXBlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkxvc3Nlcykge1xyXG4gICAgICAgICAgICBpZihMb3NzZXNEYXRhPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgdHJ1ZSwgX3R5cGUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLGZhbHNlLF90eXBlKTsgICAgIFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuTWFya2V0aW5nKSB7XHJcbiAgICAgICAgICAgIGlmKE1hcmtldGluZ0RhdGE9PW51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsIGZhbHNlLCBfdHlwZSk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5XaWxkQ2FyZCkge1xyXG4gICAgICAgICAgICBpZihXaWxkQ2FyZERhdGE9PW51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLldpbGRDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgdHJ1ZSwgX3R5cGUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLldpbGRDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgZmFsc2UsIF90eXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuU2VsbCkge1xyXG4gICAgICAgICAgICB0aGlzLlNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkludmVzdCkge1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuQnV5T3JTZWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5PbmVRdWVzdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLk9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5Hb0JhY2tTcGFjZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5Hb0JhY2tGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja0xvYW4oKSB7XHJcbiAgICAgICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdmFsID0gLTE7XHJcbiAgICAgICAgdmFsID0gX2xvYW5UYWtlbiA9PSB0cnVlID8gMSA6IDA7XHJcbiAgICAgICAgdmFyIFJlc3VsdCA9IGNjLnYyKHZhbCwgX2J1c2luZXNzSW5kZXgpXHJcbiAgICAgICAgcmV0dXJuIFJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgRG9uZUJ1dHRvbkNsaWNrZWQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgICAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgIHRoaXMuQ29tcGxldGlvbldpbmRvdyhcIlwiLCBmYWxzZSwgdGhpcy5pc093bmVyLCBmYWxzZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImRvbmUgY2xpY2tlZFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ29tcGxldGlvbldpbmRvdyhtZXNzYWdlLF9zdGF0ZSxfaXNPd25lcixfaXNCb3QpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgICAgICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuQ29tcGxldGlvblRvYXN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuQ29tcGxldGlvblRvYXN0TGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2lzT3duZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoVGltZW91dFJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkRvbmVCdXR0b25DbGlja2VkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKENvbXBsZXRpb25XaW5kb3dUaW1lKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5Db21wbGV0aW9uVG9hc3RMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuQ29tcGxldGlvblRvYXN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7IFxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5Db21wbGV0aW9uVG9hc3RMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5Db21wbGV0aW9uVG9hc3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQ29tcGxldGVUdXJuV2l0aFRvYXN0KF9tc2csIF90aW1lLF9jaGFuZ2VUdXJuPXRydWUpIHtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRpb25XaW5kb3coXCJcIiwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX21zZyk7XHJcbiAgICAgICAgICAgIHZhciBfZGVsYXkgPSB0aGlzLmdldFJhbmRvbShMb25nTWVzc2FnZVRpbWUsIExvbmdNZXNzYWdlVGltZSsyMDAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5SZXNldENhcmREaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0sIChfZGVsYXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChfbXNnICE9IFwiXCIgJiYgIV9jaGFuZ2VUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChfbXNnLCBMb25nTWVzc2FnZVRpbWUsIHRoaXMuaXNPd25lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfY2hhbmdlVHVybikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPd25lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGlvbldpbmRvdyhfbXNnLCB0cnVlLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5SZXNldENhcmREaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAoTG9uZ01lc3NhZ2VUaW1lKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnblNlY29uZFNjcmVlbkRhdGEoX2lzQm90LF9pc093bmVyLF9oYXNCdXR0b24sX21zZyxfTGFiZWxSZWYsX2J1dHRvbk5hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oX21zZywgdHJ1ZSk7XHJcbiAgICAgXHJcbiAgICAgICAgICAgIF9MYWJlbFJlZi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IF9idXR0b25OYW1lO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIF9oYXNCdXR0b24sIF9pc0JvdCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2lzT3duZXIpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRG9uZUJ1dHRvbkNsaWNrZWQoKTtcclxuICAgICAgICAgICAgICAgIH0sICgxNTAwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShfaWQsIF9oYXNUd29TY3JlZW5zID0gZmFsc2UsX3R5cGU9MCkge1xyXG4gICAgICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICAgICAgSW5kZXggPSBJbmRleCAtIDE7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxXCI6Ly9yZWNlaXZlIDIwMDAwJCBnaWZ0IHRvIHBheW9mZiBsb2FuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcmVzdWx0ID0gdGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBJc0xvYW5UYWtlbiA9IF9yZXN1bHQueDtcclxuICAgICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9yZXN1bHQueTtcclxuICAgICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgXHJcbiAgICAgICAgICAgICAgICBpZiAoSXNMb2FuVGFrZW4gPT0gMSkgLy9tZWFucyB1c2VyIGhhcyB0YWtlbiBsb2FuXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IC0gMjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NhcmRJbmZvID0gXCJMb2FuIGFtb3VudCBvZiAkMjAwMDAgaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NhcmRJbmZvID0gXCJZb3UgaGF2ZSBub3QgdGFrZW4gYW55IGxvYW4sIHR1cm4gd2lsbCBza2lwIG5vdy5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoX2NhcmRJbmZvLCA1MDAwLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjJcIjovL2hpcmUgbGF3eWVyXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfY2FyZEluZm8gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jYXJkSW5mbyA9IFwiWW91IGhhdmUgYWxyZWFkeSBoaXJlZCBsYXl3ZXIsIHR1cm4gd2lsbCBza2lwIG5vdy5cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NhcmRJbmZvID0gXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChfY2FyZEluZm8sIDUwMDAsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjNcIjovL1lvdSBkbyBhIFRyYWRlIFNob3cgZm9yIG9uZSBvZiB5b3VyIGJ1c2luZXNzZXMgYW5kIGdldCBzb21lIG5ldyBjbGllbnRzLiBDaG9vc2Ugb25lIG9mIHlvdXIgYnVzaW5lc3NlcyBhbmQgcm9sbCBhIFBheURheSByb2xsIHJpZ2h0IG5vdy5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyNDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZU1hbmlwaWxhdGlvblNjcmVlbl9fQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKHRydWUsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjRcIjovL0EgZnJpZW5kIGdpdmVzIHlvdSBhIHN1Z2dlc3Rpb24gb24gYSBzdG9jayB0byBidXkuIFBsYWNlIHlvdXIgaW52ZXN0bWVudCBhbW91bnQgb24gdGhlIHRhYmxlIGFuZCByb2xsLiBUaGUgcmVzdWx0LCBtdWx0aXBsaWVkIGJ5ICQxLDAwMCwgaXMgdGhlIGFtb3VudCBvZiBlYWNoIHNoYXJlIG9mIHN0b2NrLiBZb3UgY2FuIGJ1eSB0aGlzIHN0b2NrIG5vdyBpZiB5b3Ugd291bGQgbGlrZS5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uKG51bGwsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI1XCI6Ly9Zb3UgcmVzZXJ2ZSBhIHByaXZhdGUgWWFjaHQgZm9yIGEgd2VlayBsb25nIHZhY2F0aW9uLiBSb2xsIGJvdGggZGllLCBtdWx0aXBseSB0aGUgcmVzdWx0IGJ5ICQzLDAwMC4gUGF5IHRoZSBCYW5rIHlvdXIgdmFjYXRpb24gY29zdCBhbmQgbG9zZSB5b3VyIG5leHQgdHVybiBiYXNraW5nIGluIHlvdXIgcHJpdmF0ZSBzdW4uXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfZGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHZhciBfbXVsdGlwbGllciA9IDMwMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3Jlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBfcmVzdWx0ID0gX211bHRpcGxpZXIgKiBfZGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfcmVzdWx0LCBEaWNlOiBfZGljZVJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIENvc3QgQ2FsY3VsYXRlZCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIiAqIFwiICsgX211bHRpcGxpZXIgKyBcIiA9ICRcIiArIF9yZXN1bHQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IEJpZ0J1c2luZXNzRGF0YS5EYXRhLkRpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdCA9IEJpZ0J1c2luZXNzRGF0YS5EYXRhLnJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfcmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJDb3N0ICRcIitfcmVzdWx0K1wiIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBwYWlkLCB5b3Ugd2lsbCBhbHNvIGxvc2UgeW91ciBuZXh0IHR1cm4sIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI2XCI6Ly9Zb3VyIHBhcmVudHMgZ2l2ZSB5b3UgJDIwLDAwMCB0b3dhcmRzIHN0YXJ0aW5nIGEgbmV3IGJ1c2luZXNzIG9yIGludmVzdGluZyBpbiB5b3VyIGN1cnJlbnQgYnVzaW5lc3MuIENob29zZSB3aGljaCBhbmQgcGxheSBhY2NvcmRpbmcgdG8gdGhlIGdhbWUgcnVsZXMuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBDYXNoR2l2ZW4gPSAyMDAwMDtcclxuICAgICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdHlwZSA9PSAwKS8vc3RhcnQgbmV3IGJ1c2luZXNzXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsIHRydWUsIDAsIGZhbHNlLCAwLCB0cnVlLCBDYXNoR2l2ZW4sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpLy9pbnZlc3QgaW4gZXhpc3RpbmcgYnVzaW5lc3NcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24obnVsbCwgdHJ1ZSxDYXNoR2l2ZW4sZmFsc2UpOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIGJvdCwgc28gc2tpcHBpbmcgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiN1wiOi8vWW91IGluaGVyaXQgYSBidXNpbmVzcyBmcm9tIHlvdXIgRmF0aGVyLiBEZWNpZGUgdGhlIHR5cGUgb2YgYnVzaW5lc3MgaXQgaXMsIHdoYXQgdGhlIG5hbWUgb2YgdGhlIGJ1c2luZXNzIGlzLCB3aGV0aGVyIGl0IGlzIGEgaG9tZS1iYXNlZCBvciBicmljayAmIG1vcnRhciBidXNpbmVzcyBhbmQgaW5jbHVkZSBpdCBpbnRvIHlvdXIgZ2FtZSBwbGF5LiBQYXkgYSAkMjAsMDAwIHRyYW5zZmVyIGZlZS4gSWYgeW91IGRvIG5vdCBoYXZlICQyMCwwMDAgaW4gY2FzaCwgeW91IGNhbm5vdCBoYXZlIHRoZSBidXNpbmVzcy5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIENhc2hDb3N0ID0gMjAwMDA7XHJcbiAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3R5cGUgPT0gMCkvL3BheSBhbW91bnRcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gQ2FzaENvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBDYXNoQ29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsIHRydWUsIDAsIGZhbHNlLCAwLCB0cnVlLCAwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIsIDMwMCwgdGhpcy5pc093bmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMSkvL3NraXBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiU2tpcHBpbmcuLi5cIiwgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpcyBib3QsIHNvIHNraXBwaW5nIHR1cm5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjhcIjovL2RvdWJsZSBwYXkgZGF5IG9uIG5leHQgcGF5IGRheVxyXG4gICAgICAgICAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLCAxODAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjlcIjovL1lvdSBidXkgYSB0ZWxldmlzaW9uIHN0YXRpb24gYW5kIGNvbnZpbmNlIGV2ZXJ5IHBsYXllciBpbiB0aGUgZ2FtZSB0byBtYXJrZXQgb24geW91ciBzdGF0aW9uIG9uZSB0aW1lLiBZb3UgcmVjZWl2ZSA1MCUgb2YgYWxsIHRoZSBtYXJrZXRpbmcgZG9sbGFycyBjdXJyZW50bHkgb24gdGhlIGJvYXJkLiBSb3VuZCB0byB0aGUgbmVhcmVzdCAkMSwwMDAgaWYgbmVlZGVkLlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Ftb3VudCA9IF9hbW91bnQgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9hbW91bnQgPSBfYW1vdW50IC8gMjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmFsdWU6IFwiICsgX2Ftb3VudCk7XHJcbiAgICAgICAgICAgICAgICBfYW1vdW50ID0gTWF0aC5yb3VuZChfYW1vdW50IC8gMTAwMCkgKiAxMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm91bmRlZCB2YWx1ZTogXCIgKyBfYW1vdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZT09Mikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfYWN0b3JzQXJyYXkgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2RhdGEuTWFya2V0aW5nQW1vdW50ID0gTWF0aC5yb3VuZChfZGF0YS5NYXJrZXRpbmdBbW91bnQvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coX2FjdG9yc0FycmF5KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9TWF0aC5yb3VuZChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50LyAyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJDYXNoIGFtb3VudCAkXCIrX2Ftb3VudCtcIiBoYXMgc3VjY2Vzc2Z1bGx5IGFkZGVkLCBjYXNoIGJhbGFuY2UgYmVjb21lcyAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDQwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTBcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTFcIjovL3JvbGwgZGljZSB0d2ljZSwgaWYgcmVzdWx0IGlzID4xOSB0aGVuIHRha2UgYWxsIG1vbmV5IGluc2lkZSBtYXJrZXRpbmcuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBEaWNlMVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIERpY2UyUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0ID0gRGljZTFSZXN1bHQgKyBEaWNlMlJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoVG90YWxSZXN1bHQgPj0gMTkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYW1vdW50ID0gX2Ftb3VudCArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgMSBSZXN1bHQ6IFwiICsgRGljZTFSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRGljZSAyIFJlc3VsdDogXCIgKyBEaWNlMlJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbDogXCIgKyBUb3RhbFJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBbW91bnQgJFwiICsgX2Ftb3VudCArIFwiIGhhcyBzdWNjZXNzZnVsbHkgYWRkZWQgaW4geW91ciBjYXNoIGZyb20gbWFya2V0aW5nIGFtb3VudCBvbiB0YWJsZS5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIDQwMDApO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGU9PTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hY3RvcnNBcnJheSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kYXRhLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgMSBSZXN1bHQ6IFwiICsgRGljZTFSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRGljZSAyIFJlc3VsdDogXCIgKyBEaWNlMlJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbDogXCIgKyBUb3RhbFJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJZb3UgcmFuIG91dCBvZiBsdWNrLCB0dXJuIHdpbGwgc2tpcCBub3dcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIDQwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eShfaWQsIF9oYXNUd29TY3JlZW5zID0gZmFsc2UsX3R5cGU9MCkge1xyXG4gICAgICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICAgICAgSW5kZXggPSBJbmRleCAtIDE7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxXCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOi8vWW91IHB1dCBhbiBhZCBvbiBGYWNlYm9vayBmb3IgeW91ciBidXNpbmVzcy4gUm9sbCB0aGUgZGljZTogMSAtIElmIHlvdSByb2xsIGEgNiBvciBsb3dlciwgeW91IGxvc2UgYWxsIG9mIHRoZSBtb25leSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50IDIgLSBJZiB5b3Ugcm9sbCBhIDcgb3IgaGlnaGVyLCB5b3VyIGFkIG5ldHMgeW91IDgwMCUgb2YgdGhlIHRvdGFsIG1vbmV5IGN1cnJlbnRseSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hcmtldGluZ0Ftb3VudCA9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgX211bHRpcGxpZXIgPSA4MDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoX21hcmtldGluZ0Ftb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX2RpY2VSZXN1bHQgfSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgPD0gNilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBkaWNlIHJlc3VsdCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gc2l4LCBzbyB5b3Ugd2lsbCBsb3NlIGFsbCB5b3VyIGN1cnJlbnQgbWFya2V0aW5nIGFtb3VudC5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJEb25lXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF9kaWNlUmVzdWx0ID49IDcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGwgUmVzdWx0IDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgZGljZSByZXN1bHQgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHNldmVuLCBzbyB5b3Ugd2lsbCBnZXQgODAwJSBwcm9maXQgb24gY3VycmVudCBtYXJrZXRpbmcgYW1vdW50LlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlJlY2VpdmUgQW1vdW50XCI7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBNYXJrZXRpbmdEYXRhLkRhdGEucmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgPD0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChfZGljZVJlc3VsdCA+PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3Jlc3VsdCA9IChfbWFya2V0aW5nQW1vdW50ICogX211bHRpcGxpZXIgLyAxMDApICsgX21hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX3Jlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgcHJvZml0IG9mICRcIiArIF9yZXN1bHQrXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudC5cIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIzXCI6Ly9Zb3VyIGFkIGNvbnRhaW5zIGZhbHNlIGNsYWltcyBhbmQgcmVzdWx0IGluIGEgZ292ZXJubWVudCBpbnZlc3RpZ2F0aW9uLiBZb3UgbG9zZSB5b3VyIGVudGlyZSBNYXJrZXRpbmcgQWNjb3VudCwgcGx1cyBwYXkgbGF3eWVyIGZlZXMgb2YgJDMsMDAwIHBlciBidXNpbmVzcyB0byB0aGUgYmFuay4gSWYgeW91IGhhdmUgYSBsYXd5ZXIsIHlvdSBkbyBub3QgaGF2ZSB0byBwYXkgdGhlIGV4dHJhICQzLDAwMCBpbiBmZWVzLCBwZXIgYnVzaW5lc3MuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hcmtldGluZ0Ftb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sYXd5ZXJTdGF0dXMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuICAgICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudCArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2hhc01hcmtldGluZ0Ftb3VudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMzAwMDtcclxuICAgICAgICAgICAgICAgIHZhciBfdG90YWxBbW91bnQgPSBfbXVsdGlwbGllciAqIF9idXNpbmVzc0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX21hcmtldGluZ0Ftb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oYXNNYXJrZXRpbmdBbW91bnQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2xhd3llclN0YXR1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgIF90b3RhbEFtb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfdG90YWxBbW91bnQgfSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiTWFya2V0aW5nIEFtb3VudCA6ICRcIiArIF9tYXJrZXRpbmdBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiTGF3eWVyIEhpcmVkIDogXCIgKyBfbGF3eWVyU3RhdHVzICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIE51bWJlciBvZiBidXNpbmVzcyA6IFwiICsgX2J1c2luZXNzQW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkZlZXMgOiBcIitfYnVzaW5lc3NBbW91bnQrXCIgKiBcIitfbXVsdGlwbGllcitcIiA9ICRcIitfdG90YWxBbW91bnQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRG9uZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF90b3RhbEFtb3VudCA9IE1hcmtldGluZ0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX3RvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIGhpcmVkIGxhd3llciwgeW91IG9ubHkgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19tYXJrZXRpbmdBbW91bnQsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF90b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhdmUgbm90IGhpcmVkIGFueSBsYXd5ZXIsIGJpbGwgJFwiICsgX3RvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkIGFsb25nIHdpdGggbWFya2V0aW5nIGFtb3VudCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI0XCI6Ly9Zb3VyIE1hcmtldGluZyBBY2NvdW50IHRyaXBsZXMsIGJ1dCB5b3UgbXVzdCBsZWF2ZSBpdCBpbiB0aGUgYWNjb3VudC5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBfbXVsdGlwbGllciA9IDM7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2luY3JlYXNlQW1vdW50ID0gX21hbmFnZXIuTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9pbmNyZWFzZUFtb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIiArIF9tYXJrZXRBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiICsgX21hcmtldEFtb3VudCArIFwiICogXCIgKyBfbXVsdGlwbGllciArIFwiID0gXCIgKyBfaW5jcmVhc2VBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInlvdXIgbWFya2V0aW5nIGFtb3VudCBoYXMgYmVlbiBzdWNlc3NmdWxseSBpbmNyZWFzZSB0byAkXCIgKyBfaW5jcmVhc2VBbW91bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCAzNjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjVcIjovL1lvdSBoaXJlIGEgTWFya2V0aW5nIEZpcm0gdG8gbWFya2V0IHlvdXIgYnVzaW5lc3MgYnV0IGl0IHlpZWxkcyBubyByZXN1bHRzLiBZb3UgbG9zZSB5b3VyIGVudGlyZSBtYXJrZXRpbmcgYWNjb3VudCB0byB0aGUgQmFuay4gUGx1cyBwYXkgJDUsMDAwIGZvciB0aGVpciBzZXJ2aWNlcy5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBiaWxsID0gNTAwMDtcclxuICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gYmlsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IGJpbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRmVlcyAkXCIgKyBiaWxsICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkIGFsb25nIHdpdGggbWFya2V0aW5nIGFtb3VudCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBjYXNoLHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI2XCI6Ly9Zb3UgYmVnaW4gYSBuZXcgbWFya2V0aW5nIGNhbXBhaWduLiBSb2xsIDEgZGllLiBJZiBpdCBpcyBhbiBldmVuIG51bWJlciwgeW91ciBjYW1wYWlnbiBpcyBzdWNjZXNzZnVsIGFuZCB5b3UgcmVjZWl2ZSBhbGwgb2YgdGhlIG1vbmV5IGluIHlvdXIgbWFya2V0aW5nIGFjY291bnQgYmFjayBwbHVzIDUwMCUuIElmIGl0IGlzIGFuIG9kZCBudW1iZXIgeW91IGxvc2UgYWxsIG9mIHRoZSBtb25leSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50LlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYXJrZXRpbmdBbW91bnQgPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9kaWNlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gNTAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzRXZlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfbWFya2V0aW5nQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWNlUmVzdWx0ICUgMiA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0V2ZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfZGljZVJlc3VsdCxJc0V2ZW46aXNFdmVuIH0gfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWNlUmVzdWx0ICUyPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0V2ZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBkaWNlIHJlc3VsdCBpcyBvZGQsIHNvIHlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgY3VycmVudCBtYXJrZXRpbmcgYW1vdW50LlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkRvbmVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoX2RpY2VSZXN1bHQgJTI9PTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRXZlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIGRpY2UgcmVzdWx0IGlzIGV2ZW4sIHNvIHlvdSB3aWxsIGdldCA1MDAlIHByb2ZpdCBvbiBjdXJyZW50IG1hcmtldGluZyBhbW91bnQuXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUmVjZWl2ZSBBbW91bnRcIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IE1hcmtldGluZ0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFdmVuID0gTWFya2V0aW5nRGF0YS5EYXRhLklzRXZlbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0V2ZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoaXNFdmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3Jlc3VsdCA9IChfbWFya2V0aW5nQW1vdW50ICogX211bHRpcGxpZXIgLyAxMDApICsgX21hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIHByb2ZpdCBvZiAkXCIgKyBfcmVzdWx0K1wiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQuXCIsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjdcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjhcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiOVwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG4gICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX2xvc2VBbW91bnQsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjEwXCI6Ly9SZWNlaXZlIGFsbCBvZiB5b3VyIE1hcmtldGluZyBCdWRnZXQgYmFjaywgcGx1cyA3MDAlIHByb2ZpdC5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBfcHJvZml0ID0gNzAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQgPSBfbWFuYWdlci5HZXRNYXJrZXRpbmdNb25leShfcHJvZml0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2Ftb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIiArIF9tYXJrZXRBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiICsgX21hcmtldEFtb3VudCArIFwiICsgKFwiICsgX21hcmtldEFtb3VudCArIFwiKlwiICsgX3Byb2ZpdCArIFwiICkvMTAwXCIgKyBcIiA9IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieW91ciBjYXNoIGFtb3VudCBoYXMgYmVlbiBzdWNlc3NmdWxseSBpbmNyZWFzZSBieSAkXCIgKyBfYW1vdW50ICsgXCIsIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCA0MDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjExXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjE0XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyMTAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLF90eXBlPTApXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9sb3NlIG5leHQgdHVyblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIGxvc2UgeW91ciBuZXh0IHR1cm4uXCIsMjQwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjogLy9Sb2xsIDIgZGljZSwgbXVsdGlwbHkgYnkgJDUsMDAwIGFuZCBwYXkgaXQgdG8gdGhlIEJhbmsuIElmIHlvdSBoYXZlIGEgbGF3eWVyIHlvdSBsb3NlIDUwJSBvZiB0aGUgdG90YWwgYmlsbCBjdXJyZW50bHkgb3dlZC5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgIHZhciBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgICB2YXIgX2hpcmVkTGF3eWVyO1xyXG5cclxuICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICBDYXNoTXVsaXRwbGllciA9IDUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICBUb3RhbFJlc3VsdCA9IERpY2VSZXN1bHQgKiBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICAgICAgICAgICAgIF9oaXJlZExhd3llciA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBUb3RhbFJlc3VsdCwgbGF3eWVyOiBfaGlyZWRMYXd5ZXIgfSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgRGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBCaWxsIENhbGN1bGF0ZWQgOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9ICRcIiArIFRvdGFsUmVzdWx0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhMb3NzZXNEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgIFRvdGFsUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgIF9oaXJlZExhd3llciA9IExvc3Nlc0RhdGEuRGF0YS5sYXd5ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9oaXJlZExhd3llcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSBUb3RhbFJlc3VsdCAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBUb3RhbFJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChfaGlyZWRMYXd5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgaGlyZWQgbGF3eWVyLCBoYWxmIGJpbGwgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYXZlIG5vdCBoaXJlZCBhbnkgbGF3eWVyLCBiaWxsICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOi8vbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9XaG9sZSh0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cIiwyNDAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOi8vWWVhcmx5IGJ1c2luZXNzIGluc3VyYW5jZSBwcmVtaXVtIGlzIGR1ZS4gUGF5ICQyLDAwMCB0byB0aGUgQmFuayBmb3IgZWFjaCBIb21lLUJhc2VkIGJ1c2luZXNzLCAkNSwwMDAgZm9yIGVhY2ggQnJpY2sgJiBNb3J0YXIgYnVzaW5lc3MuXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBob21lQmFzZWRCdXNpbmVzcyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgICAgICB2YXIgYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgIHZhciBob21lTXVsdGlwbGllciA9IDIwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBicmlja011bGlwbGllciA9IDUwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciB0b3RhbEFtb3VudCA9IChob21lQmFzZWRCdXNpbmVzcyAqIGhvbWVNdWx0aXBsaWVyKSArIChicmlja0FuZE1vcnRhckJ1c2luZXNzICogYnJpY2tNdWxpcGxpZXIpO1xyXG4gICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiB0b3RhbEFtb3VudCB9IH07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiSG9tZSBCYXNlZCBBbW91bnQgOiBcIiArIGhvbWVCYXNlZEJ1c2luZXNzK1wiICogJFwiK2hvbWVNdWx0aXBsaWVyK1wiID0gJFwiKyAoaG9tZUJhc2VkQnVzaW5lc3MqaG9tZU11bHRpcGxpZXIpKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQnJpY2sgJiBNb3J0YXIgQW1vdW50IDogXCIgKyBicmlja0FuZE1vcnRhckJ1c2luZXNzICsgXCIgKiAkXCIgKyBicmlja011bGlwbGllciArIFwiID0gJFwiICsgKGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgKiBicmlja011bGlwbGllcikgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQW1vdW50IDogXCIrKGhvbWVCYXNlZEJ1c2luZXNzKmhvbWVNdWx0aXBsaWVyKStcIiArIFwiKyhicmlja0FuZE1vcnRhckJ1c2luZXNzICogYnJpY2tNdWxpcGxpZXIpK1wiID0gJFwiK3RvdGFsQW1vdW50LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IHRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIHRvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gbW9uZXksIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOi8vWW91ciBlbXBsb3llZSBjbGFpbXMgeW91IHNleHVhbGx5IGhhcmFzc2VkIHRoZW0sIGJ1dCB5b3UgZGlkIG5vdC4gWW91IGNhbiBlaXRoZXI7ICAxIC0gU2V0dGxlIG91dCBvZiBjb3VydCBhbmQgcGF5IHRoZW0gJDUwLDAwMC4gMiAtIFRha2UgeW91ciBjaGFuY2VzIGluIGNvdXJ0LiBSb2xsIDIgZGljZSBhbmQgcGF5ICQxMCwwMDAgdGltZXMgdGhlIG51bWJlciByb2xsZWQuXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfY291cnRTZXR0bGVtZW50RmVlcyA9IDUwMDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gMTAwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciB0b3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgICAgaWYgKF90eXBlID09IDApIHsgLy9maXJzdCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9jb3VydFNldHRsZW1lbnRGZWVzLCBUeXBlOiBfdHlwZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJQYXlhYmxlIGFtb3VudCA6ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKSB7IC8vMm5kIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdG90YWxBbW91bnQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IERpY2VSZXN1bHQsIFRvdGFsQW1vdW50OiB0b3RhbEFtb3VudCwgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIEFtb3VudCA6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gJFwiICsgdG90YWxBbW91bnQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0gZWxzZSB7IFxyXG4gICAgICAgICAgICAgICAgICAgdmFyIHRlbXBUeXBlID0gTG9zc2VzRGF0YS5EYXRhLlR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAodGVtcFR5cGUgPT0gMClcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBfY291cnRTZXR0bGVtZW50RmVlcyA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9jb3VydFNldHRsZW1lbnRGZWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9jb3VydFNldHRsZW1lbnRGZWVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wVHlwZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gTG9zc2VzRGF0YS5EYXRhLlRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IHRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyB0b3RhbEFtb3VudCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6Ly8gSWYgQnVzaW5lc3MgIzEgaXMgSG9tZSBCYXNlZCwgcGF5IGEgJDUsMDAwIEluc3VyYW5jZSBEZWR1Y3RpYmxlOyBpZiBCcmljayAmIE1vcnRhciAkMTAsMDAwIGRlZHVjdGlibGUuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICB2YXIgX2J1c2luZXNzVHlwZT1wYXJzZUludChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUpO1xyXG4gICAgICAgICAgICAgaWYoX2J1c2luZXNzVHlwZT09MSkgLy8gZmlyc3QgYnVzaW5lc3Mgd2FzIGhvbWUgYmFzZWRcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQ1MDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGhvbWUgYmFzZWQgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2UgaWYgKF9idXNpbmVzc1R5cGU9PTIpIC8vZmlyc3QgYnVzaW9uZXNzIHdhcyBicmljayAmIG1vcnRhclxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj0xMDAwMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC09MTAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBwYXllZCAkMTAwMDAgaW5zdXJhbmNlIG9uIHlvdXIgZmlyc3QgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsNDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI3XCI6Ly9sb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCh0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSB5b3VyIG5leHQgUGF5IERheSBmb3IgYWxsIG9mIHlvdXIgaG9tZS1iYXNlZCBidXNpbmVzc2VzLlwiLDI0MDApO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjovL1lvdSBhcmUgZmluZWQgNTAlIG9mIHlvdXIgY3VycmVudCBsaXF1aWQgY2FzaC4gSWYgeW91IGhhdmUgYSBsYXd5ZXIsIHlvdXIgZmluZSBpcyByZWR1Y2VkIHRvIDIwJSBvZiB5b3VyIGN1cnJlbnQgbGlxdWlkIGNhc2guXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgdmFyIF9oaXJlZExhd3llcjtcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgICAgIFRvdGFsUmVzdWx0ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgX2hpcmVkTGF3eWVyID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IFRvdGFsUmVzdWx0LCBsYXd5ZXI6IF9oaXJlZExhd3llciB9IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBDYXNoIDogJFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiNTAlIG9mIFRvdGFsIENhc2ggOiAkXCIgKyAoVG90YWxSZXN1bHQgLyAyKSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgX2hpcmVkTGF3eWVyID0gTG9zc2VzRGF0YS5EYXRhLmxhd3llcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX2hpcmVkTGF3eWVyKSBcclxuICAgICAgICAgICAgICAgICAgICAgICBUb3RhbFJlc3VsdCA9IChUb3RhbFJlc3VsdCAqIDIwKSAvIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSAoVG90YWxSZXN1bHQgKiA1MCkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IFRvdGFsUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9oaXJlZExhd3llcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBoaXJlZCBsYXd5ZXIsIHJlZHVjZWQgZmluZSAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhdmUgbm90IGhpcmVkIGFueSBsYXd5ZXIsIGZpbmUgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm8gbW9uZXksIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI5XCI6Ly9BIGN1c3RvbWVyIGlzIGluanVyZWQgYXQgb25lIG9mIHlvdXIgYnVzaW5lc3MgbG9jYXRpb25zLiBZb3UgY2FuIGVpdGhlcjsgMSAtIFNldHRsZSBvdXQgb2YgY291cnQgYW5kIHBheSB0aGVtICQyNSwwMDAgLCAyIC0gVGFrZSB5b3VyIGNoYW5jZXMgaW4gY291cnQuIFJvbGwgMiBkaWNlIGFuZCBwYXkgJDUsMDAwIHRpbWVzIHRoZSBudW1iZXIgcm9sbGVkLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9jb3VydFNldHRsZW1lbnRGZWVzID0gMjUwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBEaWNlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXIgPSA1MDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgdG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgICAgICAgICAgIGlmIChfdHlwZSA9PSAwKSB7IC8vZmlyc3QgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfY291cnRTZXR0bGVtZW50RmVlcywgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiUGF5YWJsZSBhbW91bnQgOiAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMSkgeyAvLzJuZCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBEaWNlUmVzdWx0LCBUb3RhbEFtb3VudDogdG90YWxBbW91bnQsIFR5cGU6IF90eXBlIH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBBbW91bnQgOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9ICRcIiArIHRvdGFsQW1vdW50LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9IGVsc2UgeyBcclxuICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wVHlwZSA9IExvc3Nlc0RhdGEuRGF0YS5UeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgaWYgKHRlbXBUeXBlID09IDApXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgX2NvdXJ0U2V0dGxlbWVudEZlZXMgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfY291cnRTZXR0bGVtZW50RmVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfY291cnRTZXR0bGVtZW50RmVlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcyArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVtcFR5cGUgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSB0b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgdG90YWxBbW91bnQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMFwiOi8vWW91ciBjb21wdXRlciBoYXMgYmVlbiBoYWNrZWQhIFlvdSBjYXRjaCBpdCBpbiB0aW1lLCBidXQgeW91IG11c3QgYnV5IG1vcmUgc2VjdXJpdHkgZm9yIHlvdXIgYnVzaW5lc3MgcmVjb3Jkcy4gUGF5ICQyMCwwMDAgdG8gdGhlIEJhbmsuXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBiaWxsID0gMjAwMDA7XHJcbiAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gYmlsbCkge1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IGJpbGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyBiaWxsICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgV2lsZENhcmRGdW5jdGlvbmFsaXR5KF9pZCwgX2hhc1R3b1NjcmVlbnMgPSBmYWxzZSxfdHlwZT0wKVxyXG4gICAge1xyXG4gICAgICB2YXIgSW5kZXg9cGFyc2VJbnQoX2lkKTtcclxuICAgICAgSW5kZXg9SW5kZXgtMTtcclxuXHJcbiAgICAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICAgICBjYXNlIFwiMVwiOi8vZG91YmxlcyB5b3VyIGluY29tZSBvbiB0aGUgbmV4dCBQYXkgRGF5LlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLDI0MDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6Ly9Sb2xsIDEgZGllLCBtdWx0aXBseSByZXN1bHQgYnkgJDUsMDAwIGFuZCByZWNlaXZlIHlvdXIgYWR2YW5jZSBmcm9tIHRoZSBCYW5rLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdD1fbWFuYWdlci5Sb2xsT25lRGljZSgpO1xyXG4gICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyPTUwMDA7XHJcbiAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ9RGljZVJlc3VsdCpDYXNoTXVsaXRwbGllcjtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grPVRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIrRGljZVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitEaWNlUmVzdWx0K1wiICogXCIrQ2FzaE11bGl0cGxpZXIrXCIgPSBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiQW1vdW50ICRcIitUb3RhbFJlc3VsdCtcIiBoYXMgYmVlbiBhZGRlZCBpbnRvIHlvdXIgY2FzaC5cIlxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOi8vWW91IGdvIHRvIGFuIEVzdGF0ZSBBdWN0aW9uIGFuZCBidXkgYSBwYWludGluZyB0aGF0IHR1cm5zIG91dCB0byBiZSB2YWx1YWJsZS4gWW91IGNhbiBzZWxsIGl0IG5vdywgcm9sbCBib3RoIGRpY2UsIG11bHRpcGx5IHJlc3VsdCBieSAkMTAsMDAwIGFuZCByZWNlaXZlIHByb2ZpdHMgZnJvbSB0aGUgQmFuay5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgdmFyIERpY2VSZXN1bHQ9X21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBDYXNoTXVsaXRwbGllcj0xMDAwMDtcclxuICAgICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0PURpY2VSZXN1bHQqQ2FzaE11bGl0cGxpZXI7XHJcbiAgXHJcbiAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9VG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRGljZSBSZXN1bHQ6IFwiK0RpY2VSZXN1bHQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitEaWNlUmVzdWx0K1wiICogXCIrQ2FzaE11bGl0cGxpZXIrXCIgPSBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICAgIFwiQW1vdW50ICRcIitUb3RhbFJlc3VsdCtcIiBoYXMgYmVlbiBhZGRlZCBpbnRvIHlvdXIgY2FzaC5cIlxyXG4gICAgICAgICAgICAgICAgICAsNTIwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjovL1lvdXIgYnVzaW5lc3MgaXMgYXVkaXRlZCBieSB0aGUgSVJTIGFuZCB5b3UgaGF2ZSBub3QgYmVlbiBrZWVwaW5nIHZlcnkgZ29vZCByZWNvcmRzIG9mIHRoZSBpbmNvbWUgYW5kIGV4cGVuc2VzIGZvciB5b3VyIGJ1c2luZXNzLiBUaGV5IGZpbmUgeW91ICQzMCwwMDAuIElmIHlvdSBoYXZlIGEgbGF3eWVyLCB5b3VyIGZpbmUgaXMgJDE1LDAwMC5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9maW5lID0gMzAwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBfbGF3eWVyU3RhdHVzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM7XHJcbiAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucylcclxuICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgIF9maW5lID0gX2ZpbmUgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX2ZpbmUgfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkxhd3llciBIaXJlZCA6IFwiICsgX2xhd3llclN0YXR1cyArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIGZpbmUgJFwiK19maW5lLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBfZmluZSA9IFdpbGRDYXJkRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX2ZpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX2ZpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkZlZXMgJFwiICsgX2ZpbmUgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDI4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjVcIjovL1lvdSBjYW4gYmVjb21lIGEgdmVuZG9yIGF0IGEgbG9jYWwgSmF6eiBGZXN0aXZhbCBmb3IgYSB2ZW5kaW5nIGZlZSBvZiAkMjAsMDAwLiBJZiB5b3UgYWNjZXB0LCBwYXkgdGhlIEJhbmsgJDIwLDAwMCBhbmQgcm9sbCB0d28gZGllOyBtdWx0aXBseSB0aGUgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIHZlbmRpbmcgaW5jb21lIGZyb20gdGhlIEJhbmsuXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfZmVlcyA9IDIwMDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgX211bHRpcGxpZXIgPSA1MDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgX2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgIHZhciBfcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX3R5cGUgPT0gMClcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0ID0gX2RpY2VSZXN1bHQgKiBfbXVsdGlwbGllcjtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfcmVzdWx0LCBEaWNlOiBfZGljZVJlc3VsdCB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfZmVlcylcclxuICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfZmVlcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJlc3VsdDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQW1vdW50IDogXCIrX2RpY2VSZXN1bHQrXCIgKiBcIitfbXVsdGlwbGllcitcIiA9ICRcIitfcmVzdWx0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJSZWNlaXZlIEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIsMjQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInNraXBwaW5nIHR1cm4gbm93LlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBXaWxkQ2FyZERhdGEuRGF0YS5EaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgX3Jlc3VsdCA9IFdpbGRDYXJkRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJDYXNoIGFtb3VudCAkXCIrX3Jlc3VsdCtcIiBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgYWRkZWQuXCIsMzAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjZcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjovL3BheSBvZmYgeW91ciBsb2FuIGZvciB5b3VyIEJyaWNrICYgTW9ydGFyIEJ1c2luZXNzLiBJZiB5b3UgaGF2ZSBubyBsb2FuIG91dHN0YW5kaW5nLCByZWNlaXZlICQ1MCwwMDAuXHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgIHZhciBfbG9hblJlc2V0PWZhbHNlO1xyXG4gICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90eXBlPXBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoX3R5cGU9PTIgJiYgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYW5SZXNldD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihfbG9hblJlc2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdXIgb3V0c3RhbmRpbmcgbG9hbiBoYXMgYmVlbiBwYXllZCBvZmYuXCIsMzIwMCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9NTAwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgbm8gbG9hbiwgYW1vdW50ICQ1MDAwMCBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2hcIiwzMjAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOi8vIHJlY2VpdmUgZG91YmxlIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBhbGwgb2YgeW91ciBidXNpbmVzc2VzLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMjQwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEludmVzdEZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgUGF5RGF5RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBEb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgR29CYWNrRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cz0gRGVja3NEYXRhO1xyXG4iXX0=