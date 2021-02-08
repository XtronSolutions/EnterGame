
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiTG9zc2VzRGF0YSIsIk1hcmtldGluZ0RhdGEiLCJXaWxkQ2FyZERhdGEiLCJCaWdCdXNpbmVzc0RhdGEiLCJUaW1lb3V0UmVmIiwiQ29tcGxldGlvbldpbmRvd1RpbWUiLCJMb25nTWVzc2FnZVRpbWUiLCJFbnVtU3BhY2VUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIldpbGRDYXJkIiwiQmlnQnVzaW5lc3MiLCJNYXJrZXRpbmciLCJJbnZlc3QiLCJMb3NzZXMiLCJQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJPbmVRdWVzdGlvbiIsIlNlbGwiLCJCdXlPclNlbGwiLCJHb0JhY2tTcGFjZXMiLCJDYXJkRGF0YSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJJRCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIlRleHQiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRGVzY3JpcHRpb24iLCJIYXNCdXR0b24iLCJIYXNUd29CdXR0b25zIiwiSGFzVGhyZWVCdXR0b25zIiwiQnV0dG9uTmFtZSIsIlNlY29uZEJ1dHRvbk5hbWUiLCJUaGlyZEJ1dHRvbk5hbWUiLCJjdG9yIiwiQ2FyZFVJIiwiVG9hc3ROb2RlIiwiTm9kZSIsIlRvYXN0TGFiZWwiLCJMYWJlbCIsIkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvbkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlIiwiSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlIiwiQ29tcGxldGlvblRvYXN0Tm9kZSIsIkNvbXBsZXRpb25Ub2FzdExhYmVsIiwiRGVja3NEYXRhIiwiQ29tcG9uZW50IiwiTWFpblVJIiwiV2lsZENhcmRzIiwiU3BhY2VzVHlwZSIsIlJlc2V0QWxsRGF0YSIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsIlNlbGVjdGVkQ2FyZEluZGV4IiwiQ2FyZFNlbGVjdGVkIiwiSXNCb3RUdXJuIiwiaXNPd25lciIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlNob3dDYXJkSW5mbyIsIm9uRGlzYWJsZSIsIm9mZiIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiX2lzQm90IiwiX2hhc1R3b0J1dHRvbiIsImFjdGl2ZSIsInNldFRpbWVvdXQiLCJFeGl0Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCIsIl9yYW5kb21WYWx1ZSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50Iiwic3RyaW5nIiwiQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbiIsIkdlbmVyYXRlUmFuZG9tTWFya2V0aW5nQ2FyZCIsIkdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZCIsIkdlbmVyYXRlUmFuZG9tV2lsZENhcmQiLCJTcGFjZUludmVzdCIsIl9pbmRleCIsIkNvbXBsZXRlVHVybldpdGhUb2FzdCIsIlNwYWNlUGF5RGF5IiwiUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlRG91YmxlUGF5RGF5IiwiRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlT25lUXVlc3Rpb24iLCJTcGFjZVNlbGwiLCJTcGFjZUJ1eU9yU2VsbCIsIlNwYWNlR29CYWNrU3BhY2VzIiwibWVzc2FnZSIsIl9zdGF0ZSIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUmVzZXRDYXJkRGlzcGxheSIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJUd29CdXR0b25zRnVuY3Rpb25hbGl0eSIsImV2ZW50IiwiX3R5cGUiLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkiLCJHb0JhY2tGdW5jdGlvbmFsaXR5IiwiQ2hlY2tMb2FuIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiX21hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsIk5vT2ZCdXNpbmVzcyIsImxlbmd0aCIsIkxvYW5UYWtlbiIsInZhbCIsIlJlc3VsdCIsInYyIiwiRG9uZUJ1dHRvbkNsaWNrZWQiLCJjbGVhclRpbWVvdXQiLCJDb21wbGV0aW9uV2luZG93IiwiY29uc29sZSIsImVycm9yIiwiX21zZyIsIl90aW1lIiwiX2NoYW5nZVR1cm4iLCJsb2ciLCJfZGVsYXkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJBc3NpZ25TZWNvbmRTY3JlZW5EYXRhIiwiX0xhYmVsUmVmIiwiX2J1dHRvbk5hbWUiLCJfaWQiLCJfaGFzVHdvU2NyZWVucyIsIkluZGV4IiwicGFyc2VJbnQiLCJfcmVzdWx0IiwiSXNMb2FuVGFrZW4iLCJ4IiwieSIsIkxvYW5BbW91bnQiLCJfY2FyZEluZm8iLCJMYXd5ZXJTdGF0dXMiLCJFbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCIsIk9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJfZGljZVJlc3VsdCIsIl9tdWx0aXBsaWVyIiwiUm9sbFR3b0RpY2VzIiwiRGF0YSIsInJlc3VsdCIsIkRpY2UiLCJDYXNoIiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UiLCJDYXNoR2l2ZW4iLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiQ2FzaENvc3QiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIl9hbW91bnQiLCJtb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsIk1hcmtldGluZ0Ftb3VudCIsInJvdW5kIiwiX2FjdG9yc0FycmF5IiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tQWN0b3JzQXJyYXkiLCJfZGF0YSIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsInNldEN1c3RvbVByb3BlcnR5IiwiRGljZTFSZXN1bHQiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX2xvc2VBbW91bnQiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbWFya2V0aW5nQW1vdW50IiwiX2xhd3llclN0YXR1cyIsIl9idXNpbmVzc0Ftb3VudCIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiX2hhc01hcmtldGluZ0Ftb3VudCIsIl90b3RhbEFtb3VudCIsIl9tYXJrZXRBbW91bnQiLCJfaW5jcmVhc2VBbW91bnQiLCJNdWx0aXBseU1hcmtldGluZ01vbmV5IiwiYmlsbCIsImlzRXZlbiIsIlJvbGxPbmVEaWNlIiwiSXNFdmVuIiwiX3Byb2ZpdCIsIkdldE1hcmtldGluZ01vbmV5IiwiRGljZVJlc3VsdCIsIkNhc2hNdWxpdHBsaWVyIiwiX2hpcmVkTGF3eWVyIiwibGF3eWVyIiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsImhvbWVCYXNlZEJ1c2luZXNzIiwiYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyIsImhvbWVNdWx0aXBsaWVyIiwiYnJpY2tNdWxpcGxpZXIiLCJ0b3RhbEFtb3VudCIsIl9jb3VydFNldHRsZW1lbnRGZWVzIiwiVHlwZSIsIlRvdGFsQW1vdW50IiwidGVtcFR5cGUiLCJfYnVzaW5lc3NUeXBlIiwiQnVzaW5lc3NUeXBlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJfVG90YWxCTSIsIl9Ub3RhbEJNTG9jYXRpb25zIiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJUb3RhbCIsIl9Ub3RhbEhCIiwiQ2FzaE11bGl0cGxpZXIxIiwiQ2FzaE11bGl0cGxpZXIyIiwiX2ZpbmUiLCJGaW5lIiwiVG9nZ2xlSGFsZlBheU5leHRUdXJuIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyIiwiX2ZlZXMiLCJfbG9hblJlc2V0IiwiQk1CdXNpbmVzcyIsIkVuYWJsZVNlbGV0aXZlRG91YmxlUGF5RGF5X0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIlNlbGVjdFBsYXllclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBRyxJQUEvQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxJQUFqQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxJQUFwQjtBQUNBLElBQUlDLFlBQVksR0FBRyxJQUFuQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxJQUF0QjtBQUNBLElBQUlDLFVBQUo7QUFDQSxJQUFJQyxvQkFBb0IsR0FBRyxJQUEzQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxJQUF0QixFQUVBO0FBQ0E7QUFFQTs7QUFDQSxJQUFJQyxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzFCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEb0I7QUFFMUJDLEVBQUFBLFFBQVEsRUFBRSxDQUZnQjtBQUcxQkMsRUFBQUEsV0FBVyxFQUFFLENBSGE7QUFJMUJDLEVBQUFBLFNBQVMsRUFBRSxDQUplO0FBSzFCQyxFQUFBQSxN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LENBQWtCLEVBQWxCLEVBQXNCLEtBQXRCO0FBQ0QsR0FweURzQjtBQXN5RHZCK0IsRUFBQUEsbUJBdHlEdUIsaUNBc3lERCxDQUFFLENBdHlERDtBQXd5RHZCRSxFQUFBQSx5QkF4eUR1Qix1Q0F3eURLLENBQUUsQ0F4eURQO0FBMHlEdkJxQixFQUFBQSx3QkExeUR1QixzQ0EweURJO0FBQ3pCekgsSUFBQUEsd0JBQXdCLENBQUMyRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0Q0SSxtQ0FBcEQsQ0FBd0YsSUFBeEY7QUFDQSxTQUFLckwsWUFBTCxDQUFrQixFQUFsQixFQUFzQixLQUF0QjtBQUNELEdBN3lEc0I7QUEreUR2Qm1ELEVBQUFBLGlCQS95RHVCLCtCQSt5REg7QUFDbEJ0SCxJQUFBQSx3QkFBd0IsQ0FBQzJHLFFBQXpCLENBQWtDd0MscUJBQWxDLEdBQTBEc0cscUNBQTFELENBQWdHLElBQWhHO0FBQ0EsU0FBS3RMLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsS0FBdEI7QUFDRCxHQWx6RHNCO0FBb3pEdkJxRCxFQUFBQSxzQkFwekR1QixvQ0FvekRFO0FBQ3ZCeEgsSUFBQUEsd0JBQXdCLENBQUMyRyxRQUF6QixDQUFrQ3dDLHFCQUFsQyxHQUEwRHVHLGdDQUExRCxDQUEyRixJQUEzRjtBQUNBLFNBQUt2TCxZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEtBQXRCO0FBQ0QsR0F2ekRzQjtBQXl6RHZCdUQsRUFBQUEsbUJBenpEdUIsaUNBeXpERDtBQUNwQjFILElBQUFBLHdCQUF3QixDQUFDMkcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EK0ksK0JBQXBEO0FBQ0EsU0FBS3hMLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsS0FBdEI7QUFDRDtBQTV6RHNCLENBQVQsQ0FBaEI7QUE4ekRBeUwsTUFBTSxDQUFDQyxPQUFQLEdBQWlCek0sU0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgTG9zc2VzRGF0YSA9IG51bGw7XHJcbnZhciBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxudmFyIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbnZhciBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG52YXIgVGltZW91dFJlZjtcclxudmFyIENvbXBsZXRpb25XaW5kb3dUaW1lID0gODAwMDtcclxudmFyIExvbmdNZXNzYWdlVGltZSA9IDUwMDA7XHJcblxyXG4vLyB2YXIgQ29tcGxldGlvbldpbmRvd1RpbWUgPSA1MDA7Ly84MDAwXHJcbi8vIHZhciBMb25nTWVzc2FnZVRpbWUgPSAyNTA7Ly81MDAwXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TcGFjZXMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bVNwYWNlVHlwZSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgV2lsZENhcmQ6IDEsXHJcbiAgQmlnQnVzaW5lc3M6IDIsXHJcbiAgTWFya2V0aW5nOiAzLFxyXG4gIEludmVzdDogNCxcclxuICBMb3NzZXM6IDUsXHJcbiAgUGF5RGF5OiA2LFxyXG4gIERvdWJsZVBheURheTogNyxcclxuICBPbmVRdWVzdGlvbjogOCxcclxuICBTZWxsOiA5LFxyXG4gIEJ1eU9yU2VsbDogMTAsXHJcbiAgR29CYWNrU3BhY2VzOiAxMSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQ2FyZERhdGFcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJRFwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiSWQgb2YgdGhlIGNhcmRcIixcclxuICAgIH0sXHJcbiAgICBEZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZXNjcmlwdGlvblwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiZGVzY3JpcHRpb24gb2YgdGhlIGNhcmRcIixcclxuICAgIH0sXHJcbiAgICBIYXNCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSGFzQnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLmJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWYgdGhpcyBjYXJkIHNob3VsZCBoYXZlIGludGVyYWN0aW9uIGJ1dHRvblwiLFxyXG4gICAgfSxcclxuICAgIEhhc1R3b0J1dHRvbnM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSGFzVHdvQnV0dG9uc1wiLFxyXG4gICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSB0d28gaW50ZXJhY3Rpb24gYnV0dG9uXCIsXHJcbiAgICB9LFxyXG4gICAgSGFzVGhyZWVCdXR0b25zOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhhc1RocmVlQnV0dG9uc1wiLFxyXG4gICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSB0aHJlZSBpbnRlcmFjdGlvbiBidXR0b25cIixcclxuICAgIH0sXHJcbiAgICBCdXR0b25OYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2Vjb25kQnV0dG9uTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTZWNvbmRCdXR0b25OYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJTZWNvbmQgYnV0dG9uIG5hbWUgdG8gc2hvdyBvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBUaGlyZEJ1dHRvbk5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Vjb25kQnV0dG9uTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiU2Vjb25kIGJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGNhcmQgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmRVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkNhcmRVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRvYXN0Tm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb2FzdE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5vZGUgcmVmZXJlbmNlIGZvciB0b2FzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG9hc3RMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb2FzdExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciB0b2FzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSW50ZXJhY3Rpb25CdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkludGVyYWN0aW9uQnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpbnRlcmFjdGlvbiBCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJ0d28gaW50ZXJhY3Rpb24gQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludGVyYWN0aW9uVGhyZWVCdXR0b25zTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbnRlcmFjdGlvblRocmVlQnV0dG9uc05vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInRocmVlIGludGVyYWN0aW9uIEJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDb21wbGV0aW9uVG9hc3ROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNvbXBsZXRpb25Ub2FzdE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5vZGUgcmVmZXJlbmNlIGZvciBjb21wbGVpb24gdG9hc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENvbXBsZXRpb25Ub2FzdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNvbXBsZXRpb25Ub2FzdExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBjb21wbGVpb24gdG9hc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBkZWNrcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEZWNrc0RhdGEgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJEZWNrc0RhdGFcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFpblVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5VSVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBDYXJkVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSBvZiBkZWNrc1wiLFxyXG4gICAgfSxcclxuICAgIEJpZ0J1c2luZXNzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJpZ0J1c2luZXNzXCIsXHJcbiAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIGNhcmRzIGRhdGEgZm9yIGJpZyBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIE1hcmtldGluZzoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdcIixcclxuICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgY2FyZHMgZGF0YSBmb3IgbWFya2V0aW5nXCIsXHJcbiAgICB9LFxyXG4gICAgTG9zc2VzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvc3Nlc1wiLFxyXG4gICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBsb3NzZXNcIixcclxuICAgIH0sXHJcbiAgICBXaWxkQ2FyZHM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2lsZENhcmRzXCIsXHJcbiAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIGNhcmRzIGRhdGEgZm9yIFdpbGRDYXJkc1wiLFxyXG4gICAgfSxcclxuICAgIFNwYWNlc1R5cGU6IHtcclxuICAgICAgdHlwZTogRW51bVNwYWNlVHlwZSxcclxuICAgICAgZGVmYXVsdDogRW51bVNwYWNlVHlwZS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwic3RhdGVzIG1hY2hpbmVzIGJ5IHR5cGUgb2YgY2FyZCBvciBzcGFjZXMgb24gYm9hcmRcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgIFRpbWVvdXRSZWYgPSBudWxsO1xyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gLTE7XHJcbiAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IC0xO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBmYWxzZTtcclxuICAgIHRoaXMuaXNPd25lciA9IGZhbHNlO1xyXG5cclxuICAgIC8vdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KFwiMVwiKTtcclxuICAgIC8vZm9yIHRlc3RpbmdcclxuICAgIC8vIHRoaXMuQ291bnRlcj0wO1xyXG4gICAgLy8gdGhpcy5HZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCh0aGlzLkNvdW50ZXIpO1xyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlNob3dDYXJkXCIsIHRoaXMuU2hvd0NhcmRJbmZvLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlNob3dDYXJkXCIsIHRoaXMuU2hvd0NhcmRJbmZvLCB0aGlzKTtcclxuICB9LFxyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIGdldFJhbmRvbTogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIF9oYXNCdXR0b24gPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UsIF9oYXNUd29CdXR0b24gPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc093bmVyICYmIF9oYXNCdXR0b24pIHtcclxuICAgICAgdGhpcy5NYWluVUkuQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICBpZiAoX2hhc1R3b0J1dHRvbikgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKF9pc093bmVyICYmICFfaGFzQnV0dG9uKSB7XHJcbiAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5FeGl0Q2FyZEluZm8oKTtcclxuICAgICAgICB9LCAzMjAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkJpZ0J1c2luZXNzO1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgdGhpcy5DYXJkU2VsZWN0ZWQgPSB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgIGlmICh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbikgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLlNlY29uZEJ1dHRvbk5hbWU7XHJcblxyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbiwgdHJ1ZSk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QsIHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucyk7XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLk1hcmtldGluZztcclxuICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgaWYgKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbikgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucykgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLlNlY29uZEJ1dHRvbk5hbWU7XHJcblxyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sIF9pc0JvdCwgdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucyk7XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuTG9zc2VzO1xyXG4gICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sIHRydWUpO1xyXG5cclxuICAgIGlmICh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG5cclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QsIHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2VuZXJhdGVSYW5kb21XaWxkQ2FyZChfaXNPd25lciwgX3JhbmRvbVZhbHVlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5XaWxkQ2FyZDtcclxuICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXggPSBfcmFuZG9tVmFsdWU7XHJcbiAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgaWYgKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbikgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucykgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLlNlY29uZEJ1dHRvbk5hbWU7XHJcblxyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sIF9pc0JvdCwgdGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucyk7XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTcGFjZUludmVzdChfaXNPd25lciwgX2luZGV4LCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuSW52ZXN0O1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGludmVzdCBvbmUgbW9yZSB0aW1lIGluIEdvbGQgb3Igc3RvY2tzIHRoaXMgdHVybi5cIiwgdHJ1ZSk7XHJcbiAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuXHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNwYWNlUGF5RGF5KF9pc093bmVyLCBfaW5kZXgpIHtcclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIFBheURheSBzcGFjZS5cIiwgdHJ1ZSk7XHJcbiAgICB0aGlzLlBheURheUZ1bmN0aW9uYWxpdHkoKTtcclxuXHJcbiAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBTcGFjZURvdWJsZVBheURheShfaXNPd25lciwgX2luZGV4KSB7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBEb3VibGVQYXlEYXkgc3BhY2UuXCIsIHRydWUpO1xyXG4gICAgdGhpcy5Eb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCBmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgU3BhY2VPbmVRdWVzdGlvbihfaXNPd25lciwgX2luZGV4LCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuT25lUXVlc3Rpb247XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gYXNrIG9uZSBxdWVzdGlvbiB0byBhbnkgb3RoZXIgcGxheWVyLCBpZiBwbGF5ZXIgaXMgdW5hYmxlIHRvIGFuc3dlciB0aGV5IHdpbGwgcGF5IHlvdSBzb21lIGNhc2ggYW1vdW50LlwiLCB0cnVlKTtcclxuICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRXhlY3V0ZVwiO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0cnVlLCBfaXNCb3QpO1xyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIm1zZ1wiLCAyMTAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTcGFjZVNlbGwoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLlNlbGw7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gc2VsbCBhbnkgb25lIG9mIHlvdXIgYnVzaW5lc3Mgb3IgY2FuIHNraXAgdHVybi5cIiwgdHJ1ZSk7XHJcbiAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3BhY2VCdXlPclNlbGwoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkJ1eU9yU2VsbDtcclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBCdXkgb3Igc2VsbCBHb2xkIG9yIHN0b2NrcyBvbmUgbW9yZSB0aW1lIGluIHRoaXMgdHVybi5cIiwgdHJ1ZSk7XHJcbiAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3BhY2VHb0JhY2tTcGFjZXMoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkdvQmFja1NwYWNlcztcclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwieW91IHdpbGwgaGF2ZSB0byBnbyBiYWNrIDMgc3BhY2VzLlwiLCB0cnVlKTtcclxuICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRXhlY3V0ZVwiO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0cnVlLCBfaXNCb3QpO1xyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2hvd0NhcmRJbmZvOiBmdW5jdGlvbiAobWVzc2FnZSwgX3N0YXRlKSB7XHJcbiAgICBpZiAoX3N0YXRlKSB7XHJcbiAgICAgIHRoaXMuTWFpblVJLlRvYXN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLk1haW5VSS5Ub2FzdExhYmVsLnN0cmluZyA9IG1lc3NhZ2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLk1haW5VSS5Ub2FzdExhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgIHRoaXMuTWFpblVJLlRvYXN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0Q2FyZEluZm8oKSB7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVzZXRDYXJkRGlzcGxheSgpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuXHJcbiAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAvLyB0aGlzLkNvdW50ZXIrKztcclxuICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICB9LFxyXG5cclxuICBUd29CdXR0b25zRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbihudWxsLCAxKTtcclxuICB9LFxyXG5cclxuICBDYXJkRnVudGlvbmFsaXR5QnV0dG9uKGV2ZW50ID0gbnVsbCwgX3R5cGUgPSAwKSB7XHJcbiAgICBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3MpIHtcclxuICAgICAgaWYgKEJpZ0J1c2luZXNzRGF0YSA9PSBudWxsKSB0aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsIHRydWUsIF90eXBlKTtcclxuICAgICAgZWxzZSB0aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsIGZhbHNlLCBfdHlwZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkxvc3Nlcykge1xyXG4gICAgICBpZiAoTG9zc2VzRGF0YSA9PSBudWxsKSB0aGlzLkxvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgIGVsc2UgdGhpcy5Mb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgZmFsc2UsIF90eXBlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuTWFya2V0aW5nKSB7XHJcbiAgICAgIGlmIChNYXJrZXRpbmdEYXRhID09IG51bGwpIHRoaXMuTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsIHRydWUsIF90eXBlKTtcclxuICAgICAgZWxzZSB0aGlzLk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCBmYWxzZSwgX3R5cGUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5XaWxkQ2FyZCkge1xyXG4gICAgICBpZiAoV2lsZENhcmREYXRhID09IG51bGwpIHRoaXMuV2lsZENhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgIGVsc2UgdGhpcy5XaWxkQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsIGZhbHNlLCBfdHlwZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLlNlbGwpIHtcclxuICAgICAgdGhpcy5TZWxsRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5JbnZlc3QpIHtcclxuICAgICAgdGhpcy5JbnZlc3RGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkJ1eU9yU2VsbCkge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuT25lUXVlc3Rpb24pIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuR29CYWNrU3BhY2VzKSB7XHJcbiAgICAgIHRoaXMuR29CYWNrRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENoZWNrTG9hbigpIHtcclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHZhbCA9IC0xO1xyXG4gICAgdmFsID0gX2xvYW5UYWtlbiA9PSB0cnVlID8gMSA6IDA7XHJcbiAgICB2YXIgUmVzdWx0ID0gY2MudjIodmFsLCBfYnVzaW5lc3NJbmRleCk7XHJcbiAgICByZXR1cm4gUmVzdWx0O1xyXG4gIH0sXHJcblxyXG4gIERvbmVCdXR0b25DbGlja2VkKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgIGNsZWFyVGltZW91dChUaW1lb3V0UmVmKTtcclxuICAgIHRoaXMuQ29tcGxldGlvbldpbmRvdyhcIlwiLCBmYWxzZSwgdGhpcy5pc093bmVyLCBmYWxzZSk7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiZG9uZSBjbGlja2VkXCIpO1xyXG4gIH0sXHJcblxyXG4gIENvbXBsZXRpb25XaW5kb3cobWVzc2FnZSwgX3N0YXRlLCBfaXNPd25lciwgX2lzQm90KSB7XHJcbiAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICBpZiAoX3N0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuQ29tcGxldGlvblRvYXN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdExhYmVsLnN0cmluZyA9IG1lc3NhZ2U7XHJcblxyXG4gICAgICAgIGlmIChfaXNPd25lcikge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRSZWYpO1xyXG4gICAgICAgICAgVGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkRvbmVCdXR0b25DbGlja2VkKCk7XHJcbiAgICAgICAgICB9LCBDb21wbGV0aW9uV2luZG93VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkNvbXBsZXRpb25Ub2FzdExhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuQ29tcGxldGlvblRvYXN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5NYWluVUkuQ29tcGxldGlvblRvYXN0TGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgdGhpcy5NYWluVUkuQ29tcGxldGlvblRvYXN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDb21wbGV0ZVR1cm5XaXRoVG9hc3QoX21zZywgX3RpbWUsIF9jaGFuZ2VUdXJuID0gdHJ1ZSkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICB0aGlzLkNvbXBsZXRpb25XaW5kb3coXCJcIiwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgY29uc29sZS5sb2coX21zZyk7XHJcbiAgICAgIHZhciBfZGVsYXkgPSB0aGlzLmdldFJhbmRvbShMb25nTWVzc2FnZVRpbWUsIExvbmdNZXNzYWdlVGltZSArIDIwMDApO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgX21hbmFnZXIuUmVzZXRDYXJkRGlzcGxheSgpO1xyXG4gICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgfSwgX2RlbGF5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChfbXNnICE9IFwiXCIgJiYgIV9jaGFuZ2VUdXJuKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChfbXNnLCBMb25nTWVzc2FnZVRpbWUsIHRoaXMuaXNPd25lcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgIGlmIChfY2hhbmdlVHVybikge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT3duZXIpIHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGlvbldpbmRvdyhfbXNnLCB0cnVlLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgfSwgTG9uZ01lc3NhZ2VUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBc3NpZ25TZWNvbmRTY3JlZW5EYXRhKF9pc0JvdCwgX2lzT3duZXIsIF9oYXNCdXR0b24sIF9tc2csIF9MYWJlbFJlZiwgX2J1dHRvbk5hbWUpIHtcclxuICAgIGlmICghX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKF9tc2csIHRydWUpO1xyXG5cclxuICAgICAgX0xhYmVsUmVmLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gX2J1dHRvbk5hbWU7XHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgX2hhc0J1dHRvbiwgX2lzQm90KTtcclxuXHJcbiAgICAgIGlmIChfaXNPd25lcikge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5Eb25lQnV0dG9uQ2xpY2tlZCgpO1xyXG4gICAgICAgIH0sIDE1MDAwKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShfaWQsIF9oYXNUd29TY3JlZW5zID0gZmFsc2UsIF90eXBlID0gMCkge1xyXG4gICAgdmFyIEluZGV4ID0gcGFyc2VJbnQoX2lkKTtcclxuICAgIEluZGV4ID0gSW5kZXggLSAxO1xyXG5cclxuICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgIGNhc2UgXCIxXCI6IC8vcmVjZWl2ZSAyMDAwMCQgZ2lmdCB0byBwYXlvZmYgbG9hblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9yZXN1bHQgPSB0aGlzLkNoZWNrTG9hbigpO1xyXG4gICAgICAgIHZhciBJc0xvYW5UYWtlbiA9IF9yZXN1bHQueDtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSBfcmVzdWx0Lnk7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKElzTG9hblRha2VuID09IDEpIHtcclxuICAgICAgICAgIC8vbWVhbnMgdXNlciBoYXMgdGFrZW4gbG9hblxyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIDIwMDAwO1xyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBfY2FyZEluZm8gPSBcIkxvYW4gYW1vdW50IG9mICQyMDAwMCBoYXMgYmVlbiBwYXllZCBvZmYuXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9jYXJkSW5mbyA9IFwiWW91IGhhdmUgbm90IHRha2VuIGFueSBsb2FuLCB0dXJuIHdpbGwgc2tpcCBub3cuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChfY2FyZEluZm8sIDUwMDAsIHRydWUpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjJcIjogLy9oaXJlIGxhd3llclxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9jYXJkSW5mbyA9IFwiXCI7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzKSB7XHJcbiAgICAgICAgICBfY2FyZEluZm8gPSBcIllvdSBoYXZlIGFscmVhZHkgaGlyZWQgbGF5d2VyLCB0dXJuIHdpbGwgc2tpcCBub3cuXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgIF9jYXJkSW5mbyA9IFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoX2NhcmRJbmZvLCA1MDAwLCB0cnVlKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIzXCI6IC8vWW91IGRvIGEgVHJhZGUgU2hvdyBmb3Igb25lIG9mIHlvdXIgYnVzaW5lc3NlcyBhbmQgZ2V0IHNvbWUgbmV3IGNsaWVudHMuIENob29zZSBvbmUgb2YgeW91ciBidXNpbmVzc2VzIGFuZCByb2xsIGEgUGF5RGF5IHJvbGwgcmlnaHQgbm93LlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgIH0sIDI0MDApO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCh0cnVlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI0XCI6IC8vQSBmcmllbmQgZ2l2ZXMgeW91IGEgc3VnZ2VzdGlvbiBvbiBhIHN0b2NrIHRvIGJ1eS4gUGxhY2UgeW91ciBpbnZlc3RtZW50IGFtb3VudCBvbiB0aGUgdGFibGUgYW5kIHJvbGwuIFRoZSByZXN1bHQsIG11bHRpcGxpZWQgYnkgJDEsMDAwLCBpcyB0aGUgYW1vdW50IG9mIGVhY2ggc2hhcmUgb2Ygc3RvY2suIFlvdSBjYW4gYnV5IHRoaXMgc3RvY2sgbm93IGlmIHlvdSB3b3VsZCBsaWtlLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uKG51bGwsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI1XCI6IC8vWW91IHJlc2VydmUgYSBwcml2YXRlIFlhY2h0IGZvciBhIHdlZWsgbG9uZyB2YWNhdGlvbi4gUm9sbCBib3RoIGRpZSwgbXVsdGlwbHkgdGhlIHJlc3VsdCBieSAkMywwMDAuIFBheSB0aGUgQmFuayB5b3VyIHZhY2F0aW9uIGNvc3QgYW5kIGxvc2UgeW91ciBuZXh0IHR1cm4gYmFza2luZyBpbiB5b3VyIHByaXZhdGUgc3VuLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9kaWNlUmVzdWx0O1xyXG4gICAgICAgIHZhciBfbXVsdGlwbGllciA9IDMwMDA7XHJcbiAgICAgICAgdmFyIF9yZXN1bHQ7XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIF9yZXN1bHQgPSBfbXVsdGlwbGllciAqIF9kaWNlUmVzdWx0O1xyXG4gICAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX3Jlc3VsdCwgRGljZTogX2RpY2VSZXN1bHQgfSB9O1xyXG5cclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgQ29zdCBDYWxjdWxhdGVkIDogXCIgKyBfZGljZVJlc3VsdCArIFwiICogXCIgKyBfbXVsdGlwbGllciArIFwiID0gJFwiICsgX3Jlc3VsdCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gQmlnQnVzaW5lc3NEYXRhLkRhdGEuRGljZTtcclxuICAgICAgICAgIF9yZXN1bHQgPSBCaWdCdXNpbmVzc0RhdGEuRGF0YS5yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfcmVzdWx0KSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfcmVzdWx0O1xyXG4gICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwTmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiQ29zdCAkXCIgKyBfcmVzdWx0ICsgXCIgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IHBhaWQsIHlvdSB3aWxsIGFsc28gbG9zZSB5b3VyIG5leHQgdHVybiwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjZcIjogLy9Zb3VyIHBhcmVudHMgZ2l2ZSB5b3UgJDIwLDAwMCB0b3dhcmRzIHN0YXJ0aW5nIGEgbmV3IGJ1c2luZXNzIG9yIGludmVzdGluZyBpbiB5b3VyIGN1cnJlbnQgYnVzaW5lc3MuIENob29zZSB3aGljaCBhbmQgcGxheSBhY2NvcmRpbmcgdG8gdGhlIGdhbWUgcnVsZXMuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgQ2FzaEdpdmVuID0gMjAwMDA7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgaWYgKF90eXBlID09IDApIHtcclxuICAgICAgICAgICAgLy9zdGFydCBuZXcgYnVzaW5lc3NcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLCB0cnVlLCAwLCBmYWxzZSwgMCwgdHJ1ZSwgQ2FzaEdpdmVuLCBmYWxzZSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgLy9pbnZlc3QgaW4gZXhpc3RpbmcgYnVzaW5lc3NcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbihudWxsLCB0cnVlLCBDYXNoR2l2ZW4sIGZhbHNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJpcyBib3QsIHNvIHNraXBwaW5nIHR1cm5cIik7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI3XCI6IC8vWW91IGluaGVyaXQgYSBidXNpbmVzcyBmcm9tIHlvdXIgRmF0aGVyLiBEZWNpZGUgdGhlIHR5cGUgb2YgYnVzaW5lc3MgaXQgaXMsIHdoYXQgdGhlIG5hbWUgb2YgdGhlIGJ1c2luZXNzIGlzLCB3aGV0aGVyIGl0IGlzIGEgaG9tZS1iYXNlZCBvciBicmljayAmIG1vcnRhciBidXNpbmVzcyBhbmQgaW5jbHVkZSBpdCBpbnRvIHlvdXIgZ2FtZSBwbGF5LiBQYXkgYSAkMjAsMDAwIHRyYW5zZmVyIGZlZS4gSWYgeW91IGRvIG5vdCBoYXZlICQyMCwwMDAgaW4gY2FzaCwgeW91IGNhbm5vdCBoYXZlIHRoZSBidXNpbmVzcy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBDYXNoQ29zdCA9IDIwMDAwO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgIGlmIChfdHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vcGF5IGFtb3VudFxyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IENhc2hDb3N0KSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IENhc2hDb3N0O1xyXG4gICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLCB0cnVlLCAwLCBmYWxzZSwgMCwgdHJ1ZSwgMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIk5vdCBlbm91Z2ggY2FzaC5cIiwgMzAwLCB0aGlzLmlzT3duZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgLy9za2lwXHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiU2tpcHBpbmcuLi5cIiwgMTQwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXMgYm90LCBzbyBza2lwcGluZyB0dXJuXCIpO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiOFwiOiAvL2RvdWJsZSBwYXkgZGF5IG9uIG5leHQgcGF5IGRheVxyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLCAxODAwKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI5XCI6IC8vWW91IGJ1eSBhIHRlbGV2aXNpb24gc3RhdGlvbiBhbmQgY29udmluY2UgZXZlcnkgcGxheWVyIGluIHRoZSBnYW1lIHRvIG1hcmtldCBvbiB5b3VyIHN0YXRpb24gb25lIHRpbWUuIFlvdSByZWNlaXZlIDUwJSBvZiBhbGwgdGhlIG1hcmtldGluZyBkb2xsYXJzIGN1cnJlbnRseSBvbiB0aGUgYm9hcmQuIFJvdW5kIHRvIHRoZSBuZWFyZXN0ICQxLDAwMCBpZiBuZWVkZWQuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gMDtcclxuICAgICAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIF9hbW91bnQgPSBfYW1vdW50ICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9hbW91bnQgPSBfYW1vdW50IC8gMjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZhbHVlOiBcIiArIF9hbW91bnQpO1xyXG4gICAgICAgIF9hbW91bnQgPSBNYXRoLnJvdW5kKF9hbW91bnQgLyAxMDAwKSAqIDEwMDA7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUm91bmRlZCB2YWx1ZTogXCIgKyBfYW1vdW50KTtcclxuXHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcblxyXG4gICAgICAgIGlmIChtb2RlID09IDIpIHtcclxuICAgICAgICAgIHZhciBfYWN0b3JzQXJyYXkgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgX2RhdGEgPSBfYWN0b3JzQXJyYXlbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgIF9kYXRhLk1hcmtldGluZ0Ftb3VudCA9IE1hdGgucm91bmQoX2RhdGEuTWFya2V0aW5nQW1vdW50IC8gMik7XHJcbiAgICAgICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfZGF0YSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coX2FjdG9yc0FycmF5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50ID0gTWF0aC5yb3VuZChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50IC8gMik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNhc2ggYW1vdW50ICRcIiArIF9hbW91bnQgKyBcIiBoYXMgc3VjY2Vzc2Z1bGx5IGFkZGVkLCBjYXNoIGJhbGFuY2UgYmVjb21lcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQwMDApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTFcIjogLy9yb2xsIGRpY2UgdHdpY2UsIGlmIHJlc3VsdCBpcyA+MTkgdGhlbiB0YWtlIGFsbCBtb25leSBpbnNpZGUgbWFya2V0aW5nLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgICAgIHZhciBEaWNlMVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIHZhciBEaWNlMlJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSBEaWNlMVJlc3VsdCArIERpY2UyUmVzdWx0O1xyXG5cclxuICAgICAgICBpZiAoVG90YWxSZXN1bHQgPj0gMTkpIHtcclxuICAgICAgICAgIHZhciBfYW1vdW50ID0gMDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgX2Ftb3VudCA9IF9hbW91bnQgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIiArIERpY2UxUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgMiBSZXN1bHQ6IFwiICsgRGljZTJSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWw6IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50ICRcIiArIF9hbW91bnQgKyBcIiBoYXMgc3VjY2Vzc2Z1bGx5IGFkZGVkIGluIHlvdXIgY2FzaCBmcm9tIG1hcmtldGluZyBhbW91bnQgb24gdGFibGUuXCIsIDQwMDApO1xyXG5cclxuICAgICAgICAgIGlmIChtb2RlID09IDIpIHtcclxuICAgICAgICAgICAgdmFyIF9hY3RvcnNBcnJheSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICAgICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICBfZGF0YSA9IF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICAgICAgICBfZGF0YS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgMSBSZXN1bHQ6IFwiICsgRGljZTFSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSAyIFJlc3VsdDogXCIgKyBEaWNlMlJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbDogXCIgKyBUb3RhbFJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJZb3UgcmFuIG91dCBvZiBsdWNrLCB0dXJuIHdpbGwgc2tpcCBub3dcIiwgNDAwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KF9pZCwgX2hhc1R3b1NjcmVlbnMgPSBmYWxzZSwgX3R5cGUgPSAwKSB7XHJcbiAgICB2YXIgSW5kZXggPSBwYXJzZUludChfaWQpO1xyXG4gICAgSW5kZXggPSBJbmRleCAtIDE7XHJcblxyXG4gICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgY2FzZSBcIjFcIjogLy9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcbiAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMCkgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMlwiOiAvL1lvdSBwdXQgYW4gYWQgb24gRmFjZWJvb2sgZm9yIHlvdXIgYnVzaW5lc3MuIFJvbGwgdGhlIGRpY2U6IDEgLSBJZiB5b3Ugcm9sbCBhIDYgb3IgbG93ZXIsIHlvdSBsb3NlIGFsbCBvZiB0aGUgbW9uZXkgaW4geW91ciBtYXJrZXRpbmcgYWNjb3VudCAyIC0gSWYgeW91IHJvbGwgYSA3IG9yIGhpZ2hlciwgeW91ciBhZCBuZXRzIHlvdSA4MDAlIG9mIHRoZSB0b3RhbCBtb25leSBjdXJyZW50bHkgaW4geW91ciBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfbWFya2V0aW5nQW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdmFyIF9kaWNlUmVzdWx0O1xyXG4gICAgICAgIHZhciBfbXVsdGlwbGllciA9IDgwMDtcclxuICAgICAgICBpZiAoX21hcmtldGluZ0Ftb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBfZGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfZGljZVJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgPD0gNikge1xyXG4gICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGwgUmVzdWx0IDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBkaWNlIHJlc3VsdCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gc2l4LCBzbyB5b3Ugd2lsbCBsb3NlIGFsbCB5b3VyIGN1cnJlbnQgbWFya2V0aW5nIGFtb3VudC5cIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRG9uZVwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF9kaWNlUmVzdWx0ID49IDcpIHtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgZGljZSByZXN1bHQgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHNldmVuLCBzbyB5b3Ugd2lsbCBnZXQgODAwJSBwcm9maXQgb24gY3VycmVudCBtYXJrZXRpbmcgYW1vdW50LlwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJSZWNlaXZlIEFtb3VudFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX2RpY2VSZXN1bHQgPSBNYXJrZXRpbmdEYXRhLkRhdGEucmVzdWx0O1xyXG5cclxuICAgICAgICAgIGlmIChfZGljZVJlc3VsdCA8PSA2KSB7XHJcbiAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMCkgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuXHJcbiAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfZGljZVJlc3VsdCA+PSA3KSB7XHJcbiAgICAgICAgICAgIHZhciBfcmVzdWx0ID0gKF9tYXJrZXRpbmdBbW91bnQgKiBfbXVsdGlwbGllcikgLyAxMDAgKyBfbWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBwcm9maXQgb2YgJFwiICsgX3Jlc3VsdCArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQuXCIsIDI0MDApO1xyXG4gICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIzXCI6IC8vWW91ciBhZCBjb250YWlucyBmYWxzZSBjbGFpbXMgYW5kIHJlc3VsdCBpbiBhIGdvdmVybm1lbnQgaW52ZXN0aWdhdGlvbi4gWW91IGxvc2UgeW91ciBlbnRpcmUgTWFya2V0aW5nIEFjY291bnQsIHBsdXMgcGF5IGxhd3llciBmZWVzIG9mICQzLDAwMCBwZXIgYnVzaW5lc3MgdG8gdGhlIGJhbmsuIElmIHlvdSBoYXZlIGEgbGF3eWVyLCB5b3UgZG8gbm90IGhhdmUgdG8gcGF5IHRoZSBleHRyYSAkMywwMDAgaW4gZmVlcywgcGVyIGJ1c2luZXNzLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfbWFya2V0aW5nQW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdmFyIF9sYXd5ZXJTdGF0dXMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuICAgICAgICB2YXIgX2J1c2luZXNzQW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBfaGFzTWFya2V0aW5nQW1vdW50ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMzAwMDtcclxuICAgICAgICB2YXIgX3RvdGFsQW1vdW50ID0gX211bHRpcGxpZXIgKiBfYnVzaW5lc3NBbW91bnQ7XHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBpZiAoX21hcmtldGluZ0Ftb3VudCA+IDApIF9oYXNNYXJrZXRpbmdBbW91bnQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKSBfdG90YWxBbW91bnQgPSAwO1xyXG5cclxuICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfdG90YWxBbW91bnQgfSB9O1xyXG5cclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJNYXJrZXRpbmcgQW1vdW50IDogJFwiICsgX21hcmtldGluZ0Ftb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJMYXd5ZXIgSGlyZWQgOiBcIiArIF9sYXd5ZXJTdGF0dXMgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgTnVtYmVyIG9mIGJ1c2luZXNzIDogXCIgKyBfYnVzaW5lc3NBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRmVlcyA6IFwiICsgX2J1c2luZXNzQW1vdW50ICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyICsgXCIgPSAkXCIgKyBfdG90YWxBbW91bnQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJEb25lXCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX3RvdGFsQW1vdW50ID0gTWFya2V0aW5nRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuXHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF90b3RhbEFtb3VudCkge1xyXG4gICAgICAgICAgICBpZiAoX2xhd3llclN0YXR1cykge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIGhpcmVkIGxhd3llciwgeW91IG9ubHkgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX21hcmtldGluZ0Ftb3VudCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF90b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYXZlIG5vdCBoaXJlZCBhbnkgbGF3eWVyLCBiaWxsICRcIiArIF90b3RhbEFtb3VudCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCBhbG9uZyB3aXRoIG1hcmtldGluZyBhbW91bnQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI0XCI6IC8vWW91ciBNYXJrZXRpbmcgQWNjb3VudCB0cmlwbGVzLCBidXQgeW91IG11c3QgbGVhdmUgaXQgaW4gdGhlIGFjY291bnQuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB2YXIgX211bHRpcGxpZXIgPSAzO1xyXG4gICAgICAgIHZhciBfaW5jcmVhc2VBbW91bnQgPSBfbWFuYWdlci5NdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKTtcclxuXHJcbiAgICAgICAgaWYgKF9pbmNyZWFzZUFtb3VudCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTWFya2V0aW5nIEFtb3VudDogJFwiICsgX21hcmtldEFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbDogXCIgKyBfbWFya2V0QW1vdW50ICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyICsgXCIgPSBcIiArIF9pbmNyZWFzZUFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwieW91ciBtYXJrZXRpbmcgYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIHRvICRcIiArIF9pbmNyZWFzZUFtb3VudCwgMzYwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNVwiOiAvL1lvdSBoaXJlIGEgTWFya2V0aW5nIEZpcm0gdG8gbWFya2V0IHlvdXIgYnVzaW5lc3MgYnV0IGl0IHlpZWxkcyBubyByZXN1bHRzLiBZb3UgbG9zZSB5b3VyIGVudGlyZSBtYXJrZXRpbmcgYWNjb3VudCB0byB0aGUgQmFuay4gUGx1cyBwYXkgJDUsMDAwIGZvciB0aGVpciBzZXJ2aWNlcy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgYmlsbCA9IDUwMDA7XHJcbiAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gYmlsbCkge1xyXG4gICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gYmlsbDtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRmVlcyAkXCIgKyBiaWxsICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkIGFsb25nIHdpdGggbWFya2V0aW5nIGFtb3VudCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjZcIjogLy9Zb3UgYmVnaW4gYSBuZXcgbWFya2V0aW5nIGNhbXBhaWduLiBSb2xsIDEgZGllLiBJZiBpdCBpcyBhbiBldmVuIG51bWJlciwgeW91ciBjYW1wYWlnbiBpcyBzdWNjZXNzZnVsIGFuZCB5b3UgcmVjZWl2ZSBhbGwgb2YgdGhlIG1vbmV5IGluIHlvdXIgbWFya2V0aW5nIGFjY291bnQgYmFjayBwbHVzIDUwMCUuIElmIGl0IGlzIGFuIG9kZCBudW1iZXIgeW91IGxvc2UgYWxsIG9mIHRoZSBtb25leSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50LlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfbWFya2V0aW5nQW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdmFyIF9kaWNlUmVzdWx0O1xyXG4gICAgICAgIHZhciBfbXVsdGlwbGllciA9IDUwMDtcclxuICAgICAgICB2YXIgaXNFdmVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChfbWFya2V0aW5nQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgJSAyID09IDApIGlzRXZlbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgTWFya2V0aW5nRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9kaWNlUmVzdWx0LCBJc0V2ZW46IGlzRXZlbiB9IH07XHJcblxyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgJSAyID09IDEpIHtcclxuICAgICAgICAgICAgICBpc0V2ZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJvbGwgUmVzdWx0IDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBkaWNlIHJlc3VsdCBpcyBvZGQsIHNvIHlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgY3VycmVudCBtYXJrZXRpbmcgYW1vdW50LlwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJEb25lXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX2RpY2VSZXN1bHQgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICBpc0V2ZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGwgUmVzdWx0IDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBkaWNlIHJlc3VsdCBpcyBldmVuLCBzbyB5b3Ugd2lsbCBnZXQgNTAwJSBwcm9maXQgb24gY3VycmVudCBtYXJrZXRpbmcgYW1vdW50LlwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJSZWNlaXZlIEFtb3VudFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX2RpY2VSZXN1bHQgPSBNYXJrZXRpbmdEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgaXNFdmVuID0gTWFya2V0aW5nRGF0YS5EYXRhLklzRXZlbjtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzRXZlbikge1xyXG4gICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX2xvc2VBbW91bnQsIDI0MDApO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcblxyXG4gICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNFdmVuKSB7XHJcbiAgICAgICAgICAgIHZhciBfcmVzdWx0ID0gKF9tYXJrZXRpbmdBbW91bnQgKiBfbXVsdGlwbGllcikgLyAxMDAgKyBfbWFya2V0aW5nQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX3Jlc3VsdDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgcHJvZml0IG9mICRcIiArIF9yZXN1bHQgKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LlwiLCAyNDAwKTtcclxuICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI4XCI6IC8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICBlbHNlIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI5XCI6IC8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG4gICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX2xvc2VBbW91bnQsIDI0MDApO1xyXG4gICAgICAgIGVsc2UgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEwXCI6IC8vUmVjZWl2ZSBhbGwgb2YgeW91ciBNYXJrZXRpbmcgQnVkZ2V0IGJhY2ssIHBsdXMgNzAwJSBwcm9maXQuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICB2YXIgX3Byb2ZpdCA9IDcwMDtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IF9tYW5hZ2VyLkdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpO1xyXG5cclxuICAgICAgICBpZiAoX2Ftb3VudCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFxyXG4gICAgICAgICAgICBcIk1hcmtldGluZyBBbW91bnQ6ICRcIiArXHJcbiAgICAgICAgICAgICAgX21hcmtldEFtb3VudCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJUb3RhbDogXCIgK1xyXG4gICAgICAgICAgICAgIF9tYXJrZXRBbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiICsgKFwiICtcclxuICAgICAgICAgICAgICBfbWFya2V0QW1vdW50ICtcclxuICAgICAgICAgICAgICBcIipcIiArXHJcbiAgICAgICAgICAgICAgX3Byb2ZpdCArXHJcbiAgICAgICAgICAgICAgXCIgKS8xMDBcIiArXHJcbiAgICAgICAgICAgICAgXCIgPSBcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJ5b3VyIGNhc2ggYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIGJ5ICRcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIsIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIgK1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCxcclxuICAgICAgICAgICAgNDAwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMVwiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxNFwiOiAvL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKSB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyMTAwKTtcclxuICAgICAgICBlbHNlIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjEwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLCBfdHlwZSA9IDApIHtcclxuICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICBJbmRleCA9IEluZGV4IC0gMTtcclxuXHJcbiAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICBjYXNlIFwiMVwiOiAvL2xvc2UgbmV4dCB0dXJuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcE5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgbG9zZSB5b3VyIG5leHQgdHVybi5cIiwgMjQwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIyXCI6IC8vUm9sbCAyIGRpY2UsIG11bHRpcGx5IGJ5ICQ1LDAwMCBhbmQgcGF5IGl0IHRvIHRoZSBCYW5rLiBJZiB5b3UgaGF2ZSBhIGxhd3llciB5b3UgbG9zZSA1MCUgb2YgdGhlIHRvdGFsIGJpbGwgY3VycmVudGx5IG93ZWQuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgIHZhciBUb3RhbFJlc3VsdDtcclxuICAgICAgICB2YXIgX2hpcmVkTGF3eWVyO1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIERpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIENhc2hNdWxpdHBsaWVyID0gNTAwMDtcclxuICAgICAgICAgIFRvdGFsUmVzdWx0ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgICAgX2hpcmVkTGF3eWVyID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM7XHJcblxyXG4gICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IFRvdGFsUmVzdWx0LCBsYXd5ZXI6IF9oaXJlZExhd3llciB9IH07XHJcblxyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgRGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBCaWxsIENhbGN1bGF0ZWQgOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9ICRcIiArIFRvdGFsUmVzdWx0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coTG9zc2VzRGF0YSk7XHJcbiAgICAgICAgICBUb3RhbFJlc3VsdCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBfaGlyZWRMYXd5ZXIgPSBMb3NzZXNEYXRhLkRhdGEubGF3eWVyO1xyXG5cclxuICAgICAgICAgIGlmIChfaGlyZWRMYXd5ZXIpIFRvdGFsUmVzdWx0ID0gVG90YWxSZXN1bHQgLyAyO1xyXG5cclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gVG90YWxSZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKF9oaXJlZExhd3llcikge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBoaXJlZCBsYXd5ZXIsIGhhbGYgYmlsbCAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGF2ZSBub3QgaGlyZWQgYW55IGxhd3llciwgYmlsbCAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjNcIjogLy9sb3NlIGFsbCB5b3VyIGJ1c2luZXNzIHByb2ZpdHMgb24gbmV4dCBQYXkgRGF5LlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3Ugd2lsbCBsb3NlIGFsbCB5b3VyIGJ1c2luZXNzIHByb2ZpdHMgb24gbmV4dCBQYXkgRGF5LlwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjRcIjogLy9ZZWFybHkgYnVzaW5lc3MgaW5zdXJhbmNlIHByZW1pdW0gaXMgZHVlLiBQYXkgJDIsMDAwIHRvIHRoZSBCYW5rIGZvciBlYWNoIEhvbWUtQmFzZWQgYnVzaW5lc3MsICQ1LDAwMCBmb3IgZWFjaCBCcmljayAmIE1vcnRhciBidXNpbmVzcy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgaG9tZUJhc2VkQnVzaW5lc3MgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICB2YXIgYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgdmFyIGhvbWVNdWx0aXBsaWVyID0gMjAwMDtcclxuICAgICAgICB2YXIgYnJpY2tNdWxpcGxpZXIgPSA1MDAwO1xyXG4gICAgICAgIHZhciB0b3RhbEFtb3VudCA9IGhvbWVCYXNlZEJ1c2luZXNzICogaG9tZU11bHRpcGxpZXIgKyBicmlja0FuZE1vcnRhckJ1c2luZXNzICogYnJpY2tNdWxpcGxpZXI7XHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogdG90YWxBbW91bnQgfSB9O1xyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBBbW91bnQgOiBcIiArXHJcbiAgICAgICAgICAgICAgICBob21lQmFzZWRCdXNpbmVzcyArXHJcbiAgICAgICAgICAgICAgICBcIiAqICRcIiArXHJcbiAgICAgICAgICAgICAgICBob21lTXVsdGlwbGllciArXHJcbiAgICAgICAgICAgICAgICBcIiA9ICRcIiArXHJcbiAgICAgICAgICAgICAgICBob21lQmFzZWRCdXNpbmVzcyAqIGhvbWVNdWx0aXBsaWVyICtcclxuICAgICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIkJyaWNrICYgTW9ydGFyIEFtb3VudCA6IFwiICtcclxuICAgICAgICAgICAgICAgIGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgK1xyXG4gICAgICAgICAgICAgICAgXCIgKiAkXCIgK1xyXG4gICAgICAgICAgICAgICAgYnJpY2tNdWxpcGxpZXIgK1xyXG4gICAgICAgICAgICAgICAgXCIgPSAkXCIgK1xyXG4gICAgICAgICAgICAgICAgYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyAqIGJyaWNrTXVsaXBsaWVyICtcclxuICAgICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsIEFtb3VudCA6IFwiICtcclxuICAgICAgICAgICAgICAgIGhvbWVCYXNlZEJ1c2luZXNzICogaG9tZU11bHRpcGxpZXIgK1xyXG4gICAgICAgICAgICAgICAgXCIgKyBcIiArXHJcbiAgICAgICAgICAgICAgICBicmlja0FuZE1vcnRhckJ1c2luZXNzICogYnJpY2tNdWxpcGxpZXIgK1xyXG4gICAgICAgICAgICAgICAgXCIgPSAkXCIgK1xyXG4gICAgICAgICAgICAgICAgdG90YWxBbW91bnQsXHJcbiAgICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSB0b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgdG90YWxBbW91bnQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gbW9uZXksIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNVwiOiAvL1lvdXIgZW1wbG95ZWUgY2xhaW1zIHlvdSBzZXh1YWxseSBoYXJhc3NlZCB0aGVtLCBidXQgeW91IGRpZCBub3QuIFlvdSBjYW4gZWl0aGVyOyAgMSAtIFNldHRsZSBvdXQgb2YgY291cnQgYW5kIHBheSB0aGVtICQ1MCwwMDAuIDIgLSBUYWtlIHlvdXIgY2hhbmNlcyBpbiBjb3VydC4gUm9sbCAyIGRpY2UgYW5kIHBheSAkMTAsMDAwIHRpbWVzIHRoZSBudW1iZXIgcm9sbGVkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfY291cnRTZXR0bGVtZW50RmVlcyA9IDUwMDAwO1xyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0O1xyXG4gICAgICAgIHZhciBDYXNoTXVsaXRwbGllciA9IDEwMDAwO1xyXG4gICAgICAgIHZhciB0b3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBpZiAoX3R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAvL2ZpcnN0IGJ1dHRvblxyXG5cclxuICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9jb3VydFNldHRsZW1lbnRGZWVzLCBUeXBlOiBfdHlwZSB9IH07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJQYXlhYmxlIGFtb3VudCA6ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgLy8ybmQgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogRGljZVJlc3VsdCwgVG90YWxBbW91bnQ6IHRvdGFsQW1vdW50LCBUeXBlOiBfdHlwZSB9IH07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJlc3VsdCA6IFwiICsgRGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBBbW91bnQgOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9ICRcIiArIHRvdGFsQW1vdW50LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciB0ZW1wVHlwZSA9IExvc3Nlc0RhdGEuRGF0YS5UeXBlO1xyXG4gICAgICAgICAgaWYgKHRlbXBUeXBlID09IDApIHtcclxuICAgICAgICAgICAgX2NvdXJ0U2V0dGxlbWVudEZlZXMgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9jb3VydFNldHRsZW1lbnRGZWVzKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9jb3VydFNldHRsZW1lbnRGZWVzO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRlbXBUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgRGljZVJlc3VsdCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gTG9zc2VzRGF0YS5EYXRhLlRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IHRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIHRvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNlwiOiAvLyBJZiBCdXNpbmVzcyAjMSBpcyBIb21lIEJhc2VkLCBwYXkgYSAkNSwwMDAgSW5zdXJhbmNlIERlZHVjdGlibGU7IGlmIEJyaWNrICYgTW9ydGFyICQxMCwwMDAgZGVkdWN0aWJsZS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgdmFyIF9idXNpbmVzc1R5cGUgPSBwYXJzZUludChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUpO1xyXG4gICAgICAgIGlmIChfYnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgIC8vIGZpcnN0IGJ1c2luZXNzIHdhcyBob21lIGJhc2VkXHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQ1MDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGhvbWUgYmFzZWQgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKF9idXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgICAgLy9maXJzdCBidXNpb25lc3Mgd2FzIGJyaWNrICYgbW9ydGFyXHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IDEwMDAwKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSAxMDAwMDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJDEwMDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiN1wiOiAvL2xvc2UgeW91ciBuZXh0IFBheSBEYXkgZm9yIGFsbCBvZiB5b3VyIGhvbWUtYmFzZWQgYnVzaW5lc3Nlcy5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCh0cnVlKTtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSB3aWxsIGxvc2UgeW91ciBuZXh0IFBheSBEYXkgZm9yIGFsbCBvZiB5b3VyIGhvbWUtYmFzZWQgYnVzaW5lc3Nlcy5cIiwgMjQwMCk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiOFwiOiAvL1lvdSBhcmUgZmluZWQgNTAlIG9mIHlvdXIgY3VycmVudCBsaXF1aWQgY2FzaC4gSWYgeW91IGhhdmUgYSBsYXd5ZXIsIHlvdXIgZmluZSBpcyByZWR1Y2VkIHRvIDIwJSBvZiB5b3VyIGN1cnJlbnQgbGlxdWlkIGNhc2guXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIFRvdGFsUmVzdWx0O1xyXG4gICAgICAgIHZhciBfaGlyZWRMYXd5ZXI7XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgVG90YWxSZXN1bHQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgICBfaGlyZWRMYXd5ZXIgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuXHJcbiAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogVG90YWxSZXN1bHQsIGxhd3llcjogX2hpcmVkTGF3eWVyIH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBDYXNoIDogJFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiNTAlIG9mIFRvdGFsIENhc2ggOiAkXCIgKyBUb3RhbFJlc3VsdCAvIDIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhMb3NzZXNEYXRhKTtcclxuICAgICAgICAgIFRvdGFsUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgIF9oaXJlZExhd3llciA9IExvc3Nlc0RhdGEuRGF0YS5sYXd5ZXI7XHJcblxyXG4gICAgICAgICAgaWYgKF9oaXJlZExhd3llcikgVG90YWxSZXN1bHQgPSAoVG90YWxSZXN1bHQgKiAyMCkgLyAxMDA7XHJcbiAgICAgICAgICBlbHNlIFRvdGFsUmVzdWx0ID0gKFRvdGFsUmVzdWx0ICogNTApIC8gMTAwO1xyXG5cclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gVG90YWxSZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKF9oaXJlZExhd3llcikge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBoaXJlZCBsYXd5ZXIsIHJlZHVjZWQgZmluZSAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGF2ZSBub3QgaGlyZWQgYW55IGxhd3llciwgZmluZSAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm8gbW9uZXksIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDgwMCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCI5XCI6IC8vQSBjdXN0b21lciBpcyBpbmp1cmVkIGF0IG9uZSBvZiB5b3VyIGJ1c2luZXNzIGxvY2F0aW9ucy4gWW91IGNhbiBlaXRoZXI7IDEgLSBTZXR0bGUgb3V0IG9mIGNvdXJ0IGFuZCBwYXkgdGhlbSAkMjUsMDAwICwgMiAtIFRha2UgeW91ciBjaGFuY2VzIGluIGNvdXJ0LiBSb2xsIDIgZGljZSBhbmQgcGF5ICQ1LDAwMCB0aW1lcyB0aGUgbnVtYmVyIHJvbGxlZC5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX2NvdXJ0U2V0dGxlbWVudEZlZXMgPSAyNTAwMDtcclxuICAgICAgICB2YXIgRGljZVJlc3VsdDtcclxuICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXIgPSA1MDAwO1xyXG4gICAgICAgIHZhciB0b3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBpZiAoX3R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAvL2ZpcnN0IGJ1dHRvblxyXG5cclxuICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9jb3VydFNldHRsZW1lbnRGZWVzLCBUeXBlOiBfdHlwZSB9IH07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJQYXlhYmxlIGFtb3VudCA6ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgLy8ybmQgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogRGljZVJlc3VsdCwgVG90YWxBbW91bnQ6IHRvdGFsQW1vdW50LCBUeXBlOiBfdHlwZSB9IH07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJlc3VsdCA6IFwiICsgRGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBBbW91bnQgOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9ICRcIiArIHRvdGFsQW1vdW50LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciB0ZW1wVHlwZSA9IExvc3Nlc0RhdGEuRGF0YS5UeXBlO1xyXG4gICAgICAgICAgaWYgKHRlbXBUeXBlID09IDApIHtcclxuICAgICAgICAgICAgX2NvdXJ0U2V0dGxlbWVudEZlZXMgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9jb3VydFNldHRsZW1lbnRGZWVzKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9jb3VydFNldHRsZW1lbnRGZWVzO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRlbXBUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgRGljZVJlc3VsdCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gTG9zc2VzRGF0YS5EYXRhLlRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IHRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIHRvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTBcIjogLy9Zb3VyIGNvbXB1dGVyIGhhcyBiZWVuIGhhY2tlZCEgWW91IGNhdGNoIGl0IGluIHRpbWUsIGJ1dCB5b3UgbXVzdCBidXkgbW9yZSBzZWN1cml0eSBmb3IgeW91ciBidXNpbmVzcyByZWNvcmRzLiBQYXkgJDIwLDAwMCB0byB0aGUgQmFuay5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgYmlsbCA9IDIwMDAwO1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gYmlsbCkge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IGJpbGw7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyBiaWxsICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTFcIjogLy9Nb2xkIGlzIGRpc2NvdmVyZWQgaW4gYWxsIHRoZSBidWlsZGluZ3Mgb2YgeW91ciBCcmljayAmIE1vcnRhciBidXNpbmVzc2VzLiBSb2xsIDIgZGllIGFuZCBtdWx0aXBseSBieSAkMiwwMDAuIFBheSB0aGF0IGFtb3VudCB0byBjbGVhbiB0aGUgYnVpbGRpbmcgb2YgRUFDSCBvZiB5b3VyIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEJNID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgX1RvdGFsQk1Mb2NhdGlvbnMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0O1xyXG4gICAgICAgIHZhciBDYXNoTXVsaXRwbGllciA9IDIwMDA7XHJcbiAgICAgICAgdmFyIHRvdGFsQW1vdW50O1xyXG4gICAgICAgIGlmIChfVG90YWxCTSA8PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkbyBub3Qgb3duIGFueSBCcmljayAmIE1vcnRhciBidXNpbmVzcywgU2tpcHBpbmcgdHVybi5cIiwgMjgwMCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIERpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIHRvdGFsQW1vdW50ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyBEaWNlOiBEaWNlUmVzdWx0LCBUb3RhbDogdG90YWxBbW91bnQgfSB9O1xyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJlc3VsdCA6IFwiICsgRGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBCcmljayAmIE1vcnRhciBCdXNpbmVzcyAod2l0aCBMb2NhdGlvbnMpIDogXCIgKyAoX1RvdGFsQk0gKyBfVG90YWxCTUxvY2F0aW9ucykgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiUGF5YWJsZSBhbW91bnQgOiBcIiArIERpY2VSZXN1bHQgKyBcIipcIiArIENhc2hNdWxpdHBsaWVyICsgXCI9JFwiICsgdG90YWxBbW91bnQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBEaWNlUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLkRpY2U7XHJcbiAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5Ub3RhbDtcclxuXHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSB0b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJFwiICsgdG90YWxBbW91bnQgKyBcIiB0byBjbGVhbiBtb2xkIG9uIHRoZSBidWlsZGluZyBvZiBFQUNIIG9mIHlvdXIgQnJpY2sgJiBNb3J0YXIgYnVzaW5lc3NlcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEyXCI6IC8vSXQgaXMgTWFyY2ggMTV0aCBhbmQgYnVzaW5lc3MgVGF4IFJldHVybnMgYXJlIGR1ZS4gUm9sbCB0aGUgZGljZSBmb3IgZWFjaCBvZiB5b3VyIGJ1c2luZXNzZXM7IDEgLSBGb3IgZWFjaCBob21lLWJhc2VkIGJ1c2luZXNzLCBwYXkgJDEsMDAwIHRpbWVzIHRoZSBhbW91bnRzIHJvbGxlZCAyIC0gRm9yIGVhY2ggYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3MsIHBheSAkMywwMDAgdGltZXMgdGhlIGFtb3VudHMgcm9sbGVkXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9Ub3RhbEJNID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgX1RvdGFsQk1Mb2NhdGlvbnMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIHZhciBfVG90YWxIQiA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0O1xyXG4gICAgICAgIHZhciBDYXNoTXVsaXRwbGllcjEgPSAxMDAwO1xyXG4gICAgICAgIHZhciBDYXNoTXVsaXRwbGllcjIgPSAzMDAwO1xyXG4gICAgICAgIHZhciB0b3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbE9uZURpY2UoKTtcclxuICAgICAgICAgIHRvdGFsQW1vdW50ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyMSAqIF9Ub3RhbEhCICsgRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyMiAqIChfVG90YWxCTSArIF9Ub3RhbEJNTG9jYXRpb25zKTtcclxuICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgRGljZTogRGljZVJlc3VsdCwgVG90YWw6IHRvdGFsQW1vdW50IH0gfTtcclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXHJcbiAgICAgICAgICAgICAgXCJEaWNlIFJlc3VsdCA6IFwiICtcclxuICAgICAgICAgICAgICAgIERpY2VSZXN1bHQgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQnJpY2sgJiBNb3J0YXIgQnVzaW5lc3MgKHdpdGggTG9jYXRpb25zKSA6IFwiICtcclxuICAgICAgICAgICAgICAgIChfVG90YWxCTSArIF9Ub3RhbEJNTG9jYXRpb25zKSArXHJcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBIb21lIEJhc2VkIEJ1c2luZXNzIDogXCIgK1xyXG4gICAgICAgICAgICAgICAgX1RvdGFsSEIgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiUGF5YWJsZSBhbW91bnQgOiBcIiArXHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ICtcclxuICAgICAgICAgICAgICAgIFwiKlwiICtcclxuICAgICAgICAgICAgICAgIENhc2hNdWxpdHBsaWVyMSArXHJcbiAgICAgICAgICAgICAgICBcIipcIiArXHJcbiAgICAgICAgICAgICAgICBfVG90YWxIQiArXHJcbiAgICAgICAgICAgICAgICBcIitcIiArXHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ICtcclxuICAgICAgICAgICAgICAgIFwiKlwiICtcclxuICAgICAgICAgICAgICAgIENhc2hNdWxpdHBsaWVyMiArXHJcbiAgICAgICAgICAgICAgICBcIipcIiArXHJcbiAgICAgICAgICAgICAgICAoX1RvdGFsQk0gKyBfVG90YWxCTUxvY2F0aW9ucykgK1xyXG4gICAgICAgICAgICAgICAgXCI9JFwiICtcclxuICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgRGljZVJlc3VsdCA9IExvc3Nlc0RhdGEuRGF0YS5EaWNlO1xyXG4gICAgICAgICAgdG90YWxBbW91bnQgPSBMb3NzZXNEYXRhLkRhdGEuVG90YWw7XHJcblxyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0b3RhbEFtb3VudCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gdG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICRcIiArIHRvdGFsQW1vdW50ICsgXCIgdGF4IG9uIHlvdXIgYnVzaW5lc3NlcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEzXCI6IC8vWW91IG1ha2UgYSBidXNpbmVzcyBkZWFsIHdpdGggYSBmcmllbmQgYW5kIHNvb24gYWZ0ZXIsIHRoZXkgYXJlIGFycmVzdGVkIGZvciBmcmF1ZC4gWW91IGFyZSBpbnZlc3RpZ2F0ZWQgYXMgd2VsbCBhbmQgeW91ciBicmFuZCB0YWtlcyBhIGhpdC4gSWYgeW91IGhhdmUgYSBsYXd5ZXIsIHBheSAkMTUsMDAwIGluIGxlZ2FsIGZlZXMuIElmIHlvdSBkbyBub3QgaGF2ZSBhIGxhd3llciwgcGF5ICQ0MCwwMDAgaW4gY291cnQgZmVlcyBwbHVzIGxvb3NlIGhhbGYgeW91ciBpbmNvbWUgb24gdGhlIG5leHQgcGF5ZGF5XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9sYXd5ZXJTdGF0dXMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuICAgICAgICB2YXIgX2ZpbmUgPSA0MDAwMDtcclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIF9maW5lID0gMTUwMDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IEZpbmU6IF9maW5lIH0gfTtcclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiTGF3eWVyIFN0YXR1cyA6IFwiICsgX2xhd3llclN0YXR1cyArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJQYXlhYmxlIGFtb3VudCA6ICRcIiArIF9maW5lLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX2ZpbmUgPSBMb3NzZXNEYXRhLkRhdGEuRmluZTtcclxuICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX2ZpbmUpIHtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9maW5lO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICRcIiArIF9maW5lICsgXCIgZmluZSwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVIYWxmUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJFwiICsgX2ZpbmUgKyBcIiBmaW5lLCB5b3Ugd2lsbCBhbHNvIGxvc2UgaGFsZiBwcm9maXQgb24gbmV4dCBwYXlkYXksIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjE0XCI6IC8vWW91IGhhdmUgbm90IGJlZW4gdGFraW5nIGNhcmUgb2YgeW91ciBoZWFsdGggYW5kIHlvdSBiZWNvbWUgdG9vIGlsbCB0byB3b3JrLiBZb3UgbG9zZSBoYWxmIG9mIHlvdXIgaW5jb21lIG9uIHlvdXIgbmV4dCBQYXlkYXkuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgX21hbmFnZXIuVG9nZ2xlSGFsZlBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBoYWxmIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsIDI0MDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTVcIjogLy9Zb3UgbWFrZSBhIGNvbW1lbnQgb24gU29jaWFsIE1lZGlhIHRoYXQgaXMgZ29pbmcgdmlyYWwgaW4gYSBiYWQgd2F5LiBBbGwgb2YgeW91ciBidXNpbmVzc2VzIHN1ZmZlciBiZWNhdXNlIG9mIGl0LiBZb3UgbG9zZSBoYWxmIHlvdXIgaW5jb21lIG9uIHRoZSBuZXh0IHR3byBQYXlkYXlzLiBJZiB5b3UgaGF2ZSBhIGxhd3llciwgbG9zZSBoYWxmIHlvdXIgaW5jb21lIG9uIG9ubHkgb25lIFBheWRheVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBfbGF3eWVyU3RhdHVzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM7XHJcbiAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZUhhbGZQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBoYWxmIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsIDI0MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlciA9IDE7XHJcbiAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVIYWxmUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgaGFsZiBwcm9maXRzIG9uIG5leHQgdHdvIHBheWRheXMuXCIsIDI0MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBXaWxkQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLCBfdHlwZSA9IDApIHtcclxuICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICBJbmRleCA9IEluZGV4IC0gMTtcclxuXHJcbiAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICBjYXNlIFwiMVwiOiAvL2RvdWJsZXMgeW91ciBpbmNvbWUgb24gdGhlIG5leHQgUGF5IERheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwgMjQwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIyXCI6IC8vUm9sbCAxIGRpZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIGFkdmFuY2UgZnJvbSB0aGUgQmFuay5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB2YXIgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gNTAwMDtcclxuICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcblxyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgUmVzdWx0OiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWw6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gXCIgKyBUb3RhbFJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50ICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgaGFzIGJlZW4gYWRkZWQgaW50byB5b3VyIGNhc2guXCIsIDQwMDApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjNcIjogLy9Zb3UgZ28gdG8gYW4gRXN0YXRlIEF1Y3Rpb24gYW5kIGJ1eSBhIHBhaW50aW5nIHRoYXQgdHVybnMgb3V0IHRvIGJlIHZhbHVhYmxlLiBZb3UgY2FuIHNlbGwgaXQgbm93LCByb2xsIGJvdGggZGljZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQxMCwwMDAgYW5kIHJlY2VpdmUgcHJvZml0cyBmcm9tIHRoZSBCYW5rLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gMTAwMDA7XHJcbiAgICAgICAgdmFyIFRvdGFsUmVzdWx0ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG5cclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50ICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgaGFzIGJlZW4gYWRkZWQgaW50byB5b3VyIGNhc2guXCIsIDUyMDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNFwiOiAvL1lvdXIgYnVzaW5lc3MgaXMgYXVkaXRlZCBieSB0aGUgSVJTIGFuZCB5b3UgaGF2ZSBub3QgYmVlbiBrZWVwaW5nIHZlcnkgZ29vZCByZWNvcmRzIG9mIHRoZSBpbmNvbWUgYW5kIGV4cGVuc2VzIGZvciB5b3VyIGJ1c2luZXNzLiBUaGV5IGZpbmUgeW91ICQzMCwwMDAuIElmIHlvdSBoYXZlIGEgbGF3eWVyLCB5b3VyIGZpbmUgaXMgJDE1LDAwMC5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICB2YXIgX2ZpbmUgPSAzMDAwMDtcclxuICAgICAgICB2YXIgX2xhd3llclN0YXR1cyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpIF9maW5lID0gX2ZpbmUgLyAyO1xyXG5cclxuICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9maW5lIH0gfTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkxhd3llciBIaXJlZCA6IFwiICsgX2xhd3llclN0YXR1cyArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBmaW5lICRcIiArIF9maW5lLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX2ZpbmUgPSBXaWxkQ2FyZERhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9maW5lKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfZmluZTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJGZWVzICRcIiArIF9maW5lICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDI4MDApO1xyXG4gICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNVwiOiAvL1lvdSBjYW4gYmVjb21lIGEgdmVuZG9yIGF0IGEgbG9jYWwgSmF6eiBGZXN0aXZhbCBmb3IgYSB2ZW5kaW5nIGZlZSBvZiAkMjAsMDAwLiBJZiB5b3UgYWNjZXB0LCBwYXkgdGhlIEJhbmsgJDIwLDAwMCBhbmQgcm9sbCB0d28gZGllOyBtdWx0aXBseSB0aGUgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIHZlbmRpbmcgaW5jb21lIGZyb20gdGhlIEJhbmsuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF9mZWVzID0gMjAwMDA7XHJcbiAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gNTAwMDtcclxuICAgICAgICB2YXIgX2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgdmFyIF9yZXN1bHQ7XHJcblxyXG4gICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgaWYgKF90eXBlID09IDApIHtcclxuICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgX3Jlc3VsdCA9IF9kaWNlUmVzdWx0ICogX211bHRpcGxpZXI7XHJcblxyXG4gICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfcmVzdWx0LCBEaWNlOiBfZGljZVJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9mZWVzKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9mZWVzO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJlc3VsdDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBBbW91bnQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyICsgXCIgPSAkXCIgKyBfcmVzdWx0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlJlY2VpdmUgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIsIDI0MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJza2lwcGluZyB0dXJuIG5vdy5cIiwgMTgwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF9kaWNlUmVzdWx0ID0gV2lsZENhcmREYXRhLkRhdGEuRGljZTtcclxuICAgICAgICAgIF9yZXN1bHQgPSBXaWxkQ2FyZERhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX3Jlc3VsdDtcclxuICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNhc2ggYW1vdW50ICRcIiArIF9yZXN1bHQgKyBcIiBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgYWRkZWQuXCIsIDMwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjZcIjogLy9BbiB1bnNhdGlzZmllZCBjdXN0b21lciB0YWtlcyB0byBzb2NpYWwgbWVkaWEgYW5kIHNtZWFy4oCZcyB5b3VyIG5hbWUuIEl0IGFmZmVjdHMgeW91ciBCcmFuZCBhbmQgeW91ciBidXNpbmVzcyBiZWZvcmUgeW91IGNhbiBnZXQgYSBoYW5kbGUgb24gaXQuIFlvdSBsb3NlIGhhbGYgeW91ciBpbmNvbWUgb24geW91ciBuZXh0IFBheURheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIF9tYW5hZ2VyLlRvZ2dsZUhhbGZQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgaGFsZiBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLCAyNDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjdcIjogLy9wYXkgb2ZmIHlvdXIgbG9hbiBmb3IgeW91ciBCcmljayAmIE1vcnRhciBCdXNpbmVzcy4gSWYgeW91IGhhdmUgbm8gbG9hbiBvdXRzdGFuZGluZywgcmVjZWl2ZSAkNTAsMDAwLlxyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBfbG9hblJlc2V0ID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgdmFyIF90eXBlID0gcGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICBpZiAoX3R5cGUgPT0gMiAmJiBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgICBfbG9hblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX2xvYW5SZXNldCkge1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3VyIG91dHN0YW5kaW5nIGxvYW4gaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiLCAzMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IDUwMDAwO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIG5vIGxvYW4sIGFtb3VudCAkNTAwMDAgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoXCIsIDMyMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjhcIjogLy9Zb3UgYXJlIHN1ZWQgZm9yIFRyYWRlbWFyayBJbmZyaW5nZW1lbnQgKGNvcHlpbmcgc29tZW9uZSBlbHNl4oCZcyBwcm9kdWN0KSwgYW5kIHlvdSBsb3NlLiBJZiB5b3UgaGF2ZSBhIGxhd3llciByb2xsIDIgZGllLCBtdWx0aXBseSBieSAkMSwwMDAgYW5kIHBheSB0byB0aGUgQmFuay4gSWYgeW91IGRvIG5vdCBoYXZlIGEgTGF3eWVyLCByb2xsIHR3byBkaWUgYW5kIG11bHRpcGx5IGJ5ICQzLDAwMCBhbmQgcGF5IHRvIHRoZSBCYW5rLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICB2YXIgX2xhd3llclN0YXR1cyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG4gICAgICAgIHZhciBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgdmFyIF9maW5lID0gMzAwMDtcclxuICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKSBfZmluZSA9IDEwMDA7XHJcblxyXG4gICAgICAgICAgVG90YWxSZXN1bHQgPSBfZmluZSAqIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgICBXaWxkQ2FyZERhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBUb3RhbFJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJMYXd5ZXIgSGlyZWQgOiBcIiArIF9sYXd5ZXJTdGF0dXMgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgZmluZSAkXCIgKyBUb3RhbFJlc3VsdCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIFRvdGFsUmVzdWx0ID0gV2lsZENhcmREYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBUb3RhbFJlc3VsdCkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRmVlcyAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCAyODAwKTtcclxuICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjlcIjogLy9UaGUgQ2l0eSBpcyBhZGRpbmcgYSBidXMgbGluZSB0aGF0IHJ1bnMgaW4gZnJvbnQgb2YgeW91ciBidXNpbmVzcy4gSWYgeW91IG93biBhIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzLCBmb3IgdGhlIHJlc3Qgb2YgdGhlIGdhbWUsIHlvdSByZWNlaXZlIGRvdWJsZSB5b3VyIGluY29tZSBmb3Igb25lIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIHZhciBCTUJ1c2luZXNzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICBpZiAoQk1CdXNpbmVzcyA8PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkbyBub3QgaGF2ZSBhbnkgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcywgc2tpcHBpbmcgdHVybi5cIiwgMzIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlU2VsZXRpdmVEb3VibGVQYXlEYXlfQnVzaW5lc3NQYXlEYXlVSVNldHVwKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIjEwXCI6IC8vWW91IHN1ZSBhIGNvbXBhbnkgZm9yIERlZmFtYXRpb24gKGx5aW5nIG9uIHlvdSkgYW5kIHdpbi4gQ2hvb3NlIGEgcGxheWVyIGFuZCByZWNlaXZlIGFsbCBvZiB0aGVpciBwcm9maXRzIG9uIHRoZWlyIG5leHQgUGF5IERheS5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5TZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTFcIjogLy8gcmVjZWl2ZSBkb3VibGUgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIGFsbCBvZiB5b3VyIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsIDI0MDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEludmVzdEZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgUGF5RGF5RnVuY3Rpb25hbGl0eSgpIHt9LFxyXG5cclxuICBEb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KCkge30sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5PbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbih0cnVlKTtcclxuICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBTZWxsRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgR29CYWNrRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Hb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgfSxcclxufSk7XHJcbm1vZHVsZS5leHBvcnRzID0gRGVja3NEYXRhO1xyXG4iXX0=