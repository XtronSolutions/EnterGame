"use strict";
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