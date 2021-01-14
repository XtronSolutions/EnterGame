
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
var BigBusinessData = null; //-------------------------------------------Spaces Data-------------------------//

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
  CompleteTurnWithToast: function CompleteTurnWithToast(_msg, _time) {
    var _this3 = this;

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    if (this.IsBotTurn) {
      console.log(_msg);

      var _delay = this.getRandom(2500, 3500);

      setTimeout(function () {
        _this3.ShowCardInfo("", false);

        _manager.ResetCardDisplay();

        _manager.RaiseEventTurnComplete();
      }, _delay);
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_msg, _time);
      this.ShowCardInfo("", false);
      setTimeout(function () {
        _this3.ShowCardInfo("", false);

        _manager.ResetCardDisplay();

        _manager.RaiseEventTurnComplete();
      }, _time + 1000);
    }
  },
  BigBusinessCardFunctionality: function BigBusinessCardFunctionality(_id, _hasTwoScreens, _type) {
    var _this4 = this;

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
        BigBusinessData = null;

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _result = this.CheckLoan();

        var IsLoanTaken = _result.x;
        var _businessIndex = _result.y;

        if (IsLoanTaken == 1) //means user has taken loan
          {
            _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount - 20000;

            if (_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount <= 0) {
              _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = 0;
              _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanTaken = false;
            }

            this.CompleteTurnWithToast("Loan amount of $20000 has been payed off.", 1800);
          } else {
          this.CompleteTurnWithToast("You have not taken any loan, turn will skip now.", 1800);
        }

        break;

      case "2":
        //hire lawyer
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        BigBusinessData = null;

        if (_manager.PlayerGameInfo[_playerIndex].LawyerStatus) {
          this.CompleteTurnWithToast("You have already hired laywer, turn will skip now.", 1800);
        } else {
          _manager.PlayerGameInfo[_playerIndex].LawyerStatus = true;
          this.CompleteTurnWithToast("You have successfully hired a lawyer.", 1800);
        }

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
            _this4.ShowCardInfo("", false);
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
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Not enough cash.");
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
    var _this5 = this;

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
          console.log(_this5.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          WildCardData = null;

          _manager.ToggleDoublePayNextTurn(true);

          _this5.CompleteTurnWithToast("You will receive double profits on next payday.", 2400);

          break;

        case "2":
          //Roll 1 die, multiply result by $5,000 and receive your advance from the Bank.
          console.log(_this5.WildCards[Index].Description);
          WildCardData = null;

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var DiceResult = _manager.RollOneDice();

          var CashMulitplier = 5000;
          var TotalResult = DiceResult * CashMulitplier;
          _manager.PlayerGameInfo[_playerIndex].Cash += TotalResult;

          _this5.CompleteTurnWithToast("Dice Result: " + DiceResult + "\n" + "\n" + "Total: " + DiceResult + " * " + CashMulitplier + " = " + TotalResult + "\n" + "\n" + "\n" + "Amount $" + TotalResult + " has been added into your cash.", 4000);

          break;

        case "3":
          //You go to an Estate Auction and buy a painting that turns out to be valuable. You can sell it now, roll both dice, multiply result by $10,000 and receive profits from the Bank.
          console.log(_this5.WildCards[Index].Description);
          WildCardData = null;

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var DiceResult = _manager.RollTwoDices();

          var CashMulitplier = 10000;
          var TotalResult = DiceResult * CashMulitplier;
          _manager.PlayerGameInfo[_playerIndex].Cash += TotalResult;

          _this5.CompleteTurnWithToast("Dice Result: " + DiceResult + "\n" + "\n" + "Total: " + DiceResult + " * " + CashMulitplier + " = " + TotalResult + "\n" + "\n" + "Amount $" + TotalResult + " has been added into your cash.", 5200);

          break;

        case "4":
          //Your business is audited by the IRS and you have not been keeping very good records of the income and expenses for your business. They fine you $30,000. If you have a lawyer, your fine is $15,000.
          console.log(_this5.WildCards[Index].Description);

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

            if (!_this5.IsBotTurn) {
              _this5.ShowCardInfo("\n" + "Lawyer Hired : " + _lawyerStatus + "\n" + "\n" + "Total fine $" + _fine, true);

              _this5.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";

              _this5.ToggleButtons(_this5.isOwner, true, _this5.IsBotTurn);
            } else {
              _this5.CardFuntionalityButton();
            }
          } else {
            _fine = WildCardData.Data.result;

            if (_manager.PlayerGameInfo[_playerIndex].Cash >= _fine) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= _fine;
              _manager.PlayerGameInfo[_playerIndex].LawyerStatus = false;

              _this5.CompleteTurnWithToast("Fees $" + _fine + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 2800);

              WildCardData = null;
            } else {
              console.log("not enough cash");

              if (!_this5.IsBotTurn) {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
              } else {
                console.log("its bot and has no cash,skipping");
                WildCardData = null;

                _this5.CompleteTurnWithToast("", 1200);
              }
            }
          }

          break;

        case "5":
          //You can become a vendor at a local Jazz Festival for a vending fee of $20,000. If you accept, pay the Bank $20,000 and roll two die; multiply the result by $5,000 and receive your vending income from the Bank.
          console.log(_this5.WildCards[Index].Description);

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

                if (!_this5.IsBotTurn) {
                  _this5.ShowCardInfo("\n" + "Dice Result: " + _diceResult + "\n" + "\n" + "Total Amount : " + _diceResult + " * " + _multiplier + " = $" + _result, true);

                  _this5.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Receive Amount";

                  _this5.ToggleButtons(_this5.isOwner, true, _this5.IsBotTurn);
                } else {
                  _this5.CardFuntionalityButton();
                }
              } else {
                WildCardData = null;

                _this5.CompleteTurnWithToast("you don't have enough cash.", 2400);
              }
            } else if (_type == 1) {
              WildCardData = null;

              _this5.CompleteTurnWithToast("skipping turn now.", 1800);
            }
          } else {
            _diceResult = WildCardData.Data.Dice;
            _result = WildCardData.Data.result;
            _manager.PlayerGameInfo[_playerIndex].Cash += _result;
            WildCardData = null;

            _this5.CompleteTurnWithToast("Cash amount $" + _result + " has been successfully added.", 3000);
          }

          break;

        case "6":
          console.log(_this5.WildCards[Index].Description);
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
            _this5.CompleteTurnWithToast("your outstanding loan has been payed off.", 3200);
          } else {
            _manager.PlayerGameInfo[_playerIndex].Cash += 50000;

            _this5.CompleteTurnWithToast("you had no loan, amount $50000 has been added to your cash", 3200);
          }

          console.log(_this5.WildCards[Index].Description);
          break;

        case "8":
          console.log(_this5.WildCards[Index].Description);
          break;

        case "9":
          console.log(_this5.WildCards[Index].Description);
          break;

        case "10":
          console.log(_this5.WildCards[Index].Description);
          break;

        case "11":
          // receive double your business profits on all of your businesses.
          console.log(_this5.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          WildCardData = null;

          _manager.ToggleDoublePayNextTurn(true);

          _this5.CompleteTurnWithToast("You will receive double profits on next payday.", 2400);

          break;

        case "12":
          console.log(_this5.WildCards[Index].Description);
          break;

        case "13":
          console.log(_this5.WildCards[Index].Description);
          break;

        case "14":
          console.log(_this5.WildCards[Index].Description);
          break;

        case "15":
          console.log(_this5.WildCards[Index].Description);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiTG9zc2VzRGF0YSIsIk1hcmtldGluZ0RhdGEiLCJXaWxkQ2FyZERhdGEiLCJCaWdCdXNpbmVzc0RhdGEiLCJFbnVtU3BhY2VUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIldpbGRDYXJkIiwiQmlnQnVzaW5lc3MiLCJNYXJrZXRpbmciLCJJbnZlc3QiLCJMb3NzZXMiLCJQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJPbmVRdWVzdGlvbiIsIlNlbGwiLCJCdXlPclNlbGwiLCJHb0JhY2tTcGFjZXMiLCJDYXJkRGF0YSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJJRCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIlRleHQiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRGVzY3JpcHRpb24iLCJIYXNCdXR0b24iLCJIYXNUd29CdXR0b25zIiwiSGFzVGhyZWVCdXR0b25zIiwiQnV0dG9uTmFtZSIsIlNlY29uZEJ1dHRvbk5hbWUiLCJUaGlyZEJ1dHRvbk5hbWUiLCJjdG9yIiwiQ2FyZFVJIiwiVG9hc3ROb2RlIiwiTm9kZSIsIlRvYXN0TGFiZWwiLCJMYWJlbCIsIkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvbkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlIiwiSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlIiwiRGVja3NEYXRhIiwiQ29tcG9uZW50IiwiTWFpblVJIiwiV2lsZENhcmRzIiwiU3BhY2VzVHlwZSIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsIlNlbGVjdGVkQ2FyZEluZGV4IiwiQ2FyZFNlbGVjdGVkIiwiSXNCb3RUdXJuIiwiaXNPd25lciIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlNob3dDYXJkSW5mbyIsIm9uRGlzYWJsZSIsIm9mZiIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiX2lzQm90IiwiX2hhc1R3b0J1dHRvbiIsImFjdGl2ZSIsInNldFRpbWVvdXQiLCJFeGl0Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCIsIl9yYW5kb21WYWx1ZSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50Iiwic3RyaW5nIiwiQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbiIsIkdlbmVyYXRlUmFuZG9tTWFya2V0aW5nQ2FyZCIsIkdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZCIsIkdlbmVyYXRlUmFuZG9tV2lsZENhcmQiLCJTcGFjZUludmVzdCIsIl9pbmRleCIsIkNvbXBsZXRlVHVybldpdGhUb2FzdCIsIlNwYWNlUGF5RGF5IiwiUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlRG91YmxlUGF5RGF5IiwiRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlT25lUXVlc3Rpb24iLCJTcGFjZVNlbGwiLCJTcGFjZUJ1eU9yU2VsbCIsIlNwYWNlR29CYWNrU3BhY2VzIiwibWVzc2FnZSIsIl9zdGF0ZSIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUmVzZXRDYXJkRGlzcGxheSIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJUd29CdXR0b25zRnVuY3Rpb25hbGl0eSIsImV2ZW50IiwiX3R5cGUiLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkiLCJHb0JhY2tGdW5jdGlvbmFsaXR5IiwiQ2hlY2tMb2FuIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiX21hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsIk5vT2ZCdXNpbmVzcyIsImxlbmd0aCIsIkxvYW5UYWtlbiIsInZhbCIsIlJlc3VsdCIsInYyIiwiX21zZyIsIl90aW1lIiwiY29uc29sZSIsImxvZyIsIl9kZWxheSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlNob3dUb2FzdCIsIl9pZCIsIl9oYXNUd29TY3JlZW5zIiwiSW5kZXgiLCJwYXJzZUludCIsIl9yZXN1bHQiLCJJc0xvYW5UYWtlbiIsIngiLCJ5IiwiTG9hbkFtb3VudCIsIkxhd3llclN0YXR1cyIsIkVuYWJsZU1hbmlwaWxhdGlvblNjcmVlbl9fQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIl9kaWNlUmVzdWx0IiwiX211bHRpcGxpZXIiLCJSb2xsVHdvRGljZXMiLCJEYXRhIiwicmVzdWx0IiwiRGljZSIsIkNhc2giLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJUb2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSIsIkNhc2hHaXZlbiIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsIk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJDYXNoQ29zdCIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiX2Ftb3VudCIsIm1vZGUiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiTWFya2V0aW5nQW1vdW50Iiwicm91bmQiLCJfYWN0b3JzQXJyYXkiLCJnZXRQaG90b25SZWYiLCJteVJvb21BY3RvcnNBcnJheSIsIl9kYXRhIiwiY3VzdG9tUHJvcGVydGllcyIsIlBsYXllclNlc3Npb25EYXRhIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJEaWNlMVJlc3VsdCIsIkRpY2UyUmVzdWx0IiwiVG90YWxSZXN1bHQiLCJfbG9zZUFtb3VudCIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9tYXJrZXRpbmdBbW91bnQiLCJfbGF3eWVyU3RhdHVzIiwiX2J1c2luZXNzQW1vdW50IiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJfaGFzTWFya2V0aW5nQW1vdW50IiwiX3RvdGFsQW1vdW50IiwiX21hcmtldEFtb3VudCIsIl9pbmNyZWFzZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJiaWxsIiwiaXNFdmVuIiwiUm9sbE9uZURpY2UiLCJJc0V2ZW4iLCJfcHJvZml0IiwiR2V0TWFya2V0aW5nTW9uZXkiLCJEaWNlUmVzdWx0IiwiQ2FzaE11bGl0cGxpZXIiLCJfaGlyZWRMYXd5ZXIiLCJsYXd5ZXIiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiaG9tZUJhc2VkQnVzaW5lc3MiLCJicmlja0FuZE1vcnRhckJ1c2luZXNzIiwiaG9tZU11bHRpcGxpZXIiLCJicmlja011bGlwbGllciIsInRvdGFsQW1vdW50IiwiX2NvdXJ0U2V0dGxlbWVudEZlZXMiLCJUeXBlIiwiVG90YWxBbW91bnQiLCJ0ZW1wVHlwZSIsIl9idXNpbmVzc1R5cGUiLCJCdXNpbmVzc1R5cGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIl9maW5lIiwiX2ZlZXMiLCJfbG9hblJlc2V0IiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbiIsIkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsVUFBVSxH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QUFBLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EcUgsbUNBQXBELENBQXdGLElBQXhGO0FBQ0EsU0FBSzlKLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFDSCxHQXRvRG9CO0FBd29EckJtRCxFQUFBQSxpQkF4b0RxQiwrQkF5b0RyQjtBQUNJaEgsSUFBQUEsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ21DLHFCQUFsQyxHQUEwRG9GLHFDQUExRCxDQUFnRyxJQUFoRztBQUNBLFNBQUsvSixZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0gsR0E1b0RvQjtBQThvRHJCcUQsRUFBQUEsc0JBOW9EcUIsb0NBK29EckI7QUFDSWxILElBQUFBLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NtQyxxQkFBbEMsR0FBMERxRixnQ0FBMUQsQ0FBMkYsSUFBM0Y7QUFDQSxTQUFLaEssWUFBTCxDQUFrQixFQUFsQixFQUFxQixLQUFyQjtBQUNILEdBbHBEb0I7QUFvcERyQnVELEVBQUFBLG1CQXBwRHFCLGlDQXFwRHJCO0FBQ0lwSCxJQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRHdILCtCQUFwRDtBQUNBLFNBQUtqSyxZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0g7QUF4cERvQixDQUFULENBQWhCO0FBMHBEQWtLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFnQmpMLFNBQWhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBMb3NzZXNEYXRhID0gbnVsbDtcclxudmFyIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG52YXIgV2lsZENhcmREYXRhID0gbnVsbDtcclxudmFyIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNwYWNlcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtU3BhY2VUeXBlID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBXaWxkQ2FyZDogMSxcclxuICAgIEJpZ0J1c2luZXNzOiAyLFxyXG4gICAgTWFya2V0aW5nOiAzLFxyXG4gICAgSW52ZXN0OiA0LFxyXG4gICAgTG9zc2VzOjUsXHJcbiAgICBQYXlEYXk6IDYsXHJcbiAgICBEb3VibGVQYXlEYXk6IDcsXHJcbiAgICBPbmVRdWVzdGlvbjogOCxcclxuICAgIFNlbGw6IDksXHJcbiAgICBCdXlPclNlbGw6IDEwLFxyXG4gICAgR29CYWNrU3BhY2VzOjExLFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGNhcmQgZGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkNhcmREYXRhXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgSUQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSURcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJJZCBvZiB0aGUgY2FyZFwifSxcclxuICAgICAgICBEZXNjcmlwdGlvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJEZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcImRlc2NyaXB0aW9uIG9mIHRoZSBjYXJkXCJ9LFxyXG4gICAgICAgIEhhc0J1dHRvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJIYXNCdXR0b25cIixcclxuICAgICAgICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJpZiB0aGlzIGNhcmQgc2hvdWxkIGhhdmUgaW50ZXJhY3Rpb24gYnV0dG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhhc1R3b0J1dHRvbnM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSGFzVHdvQnV0dG9uc1wiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLmJvb2xlYW4sXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSB0d28gaW50ZXJhY3Rpb24gYnV0dG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhhc1RocmVlQnV0dG9uczpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJIYXNUaHJlZUJ1dHRvbnNcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiaWYgdGhpcyBjYXJkIHNob3VsZCBoYXZlIHRocmVlIGludGVyYWN0aW9uIGJ1dHRvblwifSxcclxuICAgICAgICBCdXR0b25OYW1lOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFNlY29uZEJ1dHRvbk5hbWU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU2Vjb25kQnV0dG9uTmFtZVwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiU2Vjb25kIGJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFRoaXJkQnV0dG9uTmFtZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTZWNvbmRCdXR0b25OYW1lXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiU2Vjb25kIGJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCJ9LFxyXG4gfSxcclxuXHJcbiBjdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxuIH1cclxuXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgY2FyZCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZFVJPWNjLkNsYXNzKHtcclxuICAgbmFtZTpcIkNhcmRVSVwiLFxyXG4gICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICBUb2FzdE5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0Tm9kZVwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwibm9kZSByZWZlcmVuY2UgZm9yIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgICBUb2FzdExhYmVsOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJUb2FzdExhYmVsXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwibGFiZWwgcmVmZXJlbmNlIGZvciB0b2FzdCBub2RlXCJ9LFxyXG4gICAgICBCdXR0b25Ob2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJ9LFxyXG4gICAgICAgIEludGVyYWN0aW9uQnV0dG9uTm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSW50ZXJhY3Rpb25CdXR0b25cIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaW50ZXJhY3Rpb24gQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwiXHJcbiAgICAgICB9LFxyXG4gICAgICAgSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZVwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJ0d28gaW50ZXJhY3Rpb24gQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwiXHJcbiAgICAgICB9LFxyXG4gICAgICAgSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJJbnRlcmFjdGlvblRocmVlQnV0dG9uc05vZGVcIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcInRocmVlIGludGVyYWN0aW9uIEJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIn0sXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG5cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBkZWNrcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEZWNrc0RhdGEgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIkRlY2tzRGF0YVwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIE1haW5VSTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5VSVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBDYXJkVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJVSSBvZiBkZWNrc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBCaWdCdXNpbmVzczpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkJpZ0J1c2luZXNzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIGNhcmRzIGRhdGEgZm9yIGJpZyBidXNpbmVzc1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTWFya2V0aW5nOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIGNhcmRzIGRhdGEgZm9yIG1hcmtldGluZ1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTG9zc2VzOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTG9zc2VzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIGNhcmRzIGRhdGEgZm9yIGxvc3Nlc1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgV2lsZENhcmRzOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiV2lsZENhcmRzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIGNhcmRzIGRhdGEgZm9yIFdpbGRDYXJkc1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3BhY2VzVHlwZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IEVudW1TcGFjZVR5cGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IEVudW1TcGFjZVR5cGUuTm9uZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInN0YXRlcyBtYWNoaW5lcyBieSB0eXBlIG9mIGNhcmQgb3Igc3BhY2VzIG9uIGJvYXJkXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gLTE7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy90aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkoXCIxXCIpO1xyXG4gICAgICAgIC8vZm9yIHRlc3RpbmdcclxuICAgICAgICAvLyB0aGlzLkNvdW50ZXI9MDtcclxuICAgICAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiU2hvd0NhcmRcIiwgdGhpcy5TaG93Q2FyZEluZm8sIHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlNob3dDYXJkXCIsIHRoaXMuU2hvd0NhcmRJbmZvLCB0aGlzKTtcclxuICAgICAgfSxcclxuICAgIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgICAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRvbTogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgX2hhc0J1dHRvbiA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSxfaGFzVHdvQnV0dG9uPWZhbHNlKSB7XHJcbiAgICAgICAgaWYgKF9pc093bmVyICYmIF9oYXNCdXR0b24pIHtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2hhc1R3b0J1dHRvbilcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSBmYWxzZTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF9pc093bmVyICYmICFfaGFzQnV0dG9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5FeGl0Q2FyZEluZm8oKTtcclxuICAgICAgICAgICAgICAgIH0sIDMyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZChfaXNPd25lciwgX3JhbmRvbVZhbHVlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5CaWdCdXNpbmVzcztcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLlNlY29uZEJ1dHRvbk5hbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbiwgX2lzQm90LHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucyk7XHJcblxyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLk1hcmtldGluZztcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiAgICBcclxuICAgICAgICBpZiAodGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucylcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLlNlY29uZEJ1dHRvbk5hbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QsdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucyk7XHJcblxyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkxvc3NlcztcclxuICAgICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuICAgICBcclxuICAgICAgICBpZiAodGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucylcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLlNlY29uZEJ1dHRvbk5hbWU7XHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sIF9pc0JvdCx0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKTtcclxuXHJcbiAgICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tV2lsZENhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuV2lsZENhcmQ7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG4gXHJcbiAgICAgICAgaWYgKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbiwgX2lzQm90LHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VJbnZlc3QoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkludmVzdDtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gaW52ZXN0IG9uZSBtb3JlIHRpbWUgaW4gR29sZCBvciBzdG9ja3MgdGhpcyB0dXJuLlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcblxyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZVBheURheShfaXNPd25lciwgX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gUGF5RGF5IHNwYWNlLlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLlBheURheUZ1bmN0aW9uYWxpdHkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCBmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlRG91YmxlUGF5RGF5KF9pc093bmVyLCBfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBEb3VibGVQYXlEYXkgc3BhY2UuXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VPbmVRdWVzdGlvbihfaXNPd25lciwgX2luZGV4LCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuT25lUXVlc3Rpb247XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGFzayBvbmUgcXVlc3Rpb24gdG8gYW55IG90aGVyIHBsYXllciwgaWYgcGxheWVyIGlzIHVuYWJsZSB0byBhbnN3ZXIgdGhleSB3aWxsIHBheSB5b3Ugc29tZSBjYXNoIGFtb3VudC5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0cnVlLCBfaXNCb3QpO1xyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZVNlbGwoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLlNlbGw7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIHNlbGwgYW55IG9uZSBvZiB5b3VyIGJ1c2luZXNzIG9yIGNhbiBza2lwIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRXhlY3V0ZVwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VCdXlPclNlbGwoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkJ1eU9yU2VsbDtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gQnV5IG9yIHNlbGwgR29sZCBvciBzdG9ja3Mgb25lIG1vcmUgdGltZSBpbiB0aGlzIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRXhlY3V0ZVwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VHb0JhY2tTcGFjZXMoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkdvQmFja1NwYWNlcztcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcInlvdSB3aWxsIGhhdmUgdG8gZ28gYmFjayAzIHNwYWNlcy5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0cnVlLCBfaXNCb3QpO1xyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2hvd0NhcmRJbmZvOiBmdW5jdGlvbiAobWVzc2FnZSwgX3N0YXRlKSB7XHJcbiAgICAgICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLlRvYXN0TGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRXhpdENhcmRJbmZvKCkge1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVzZXRDYXJkRGlzcGxheSgpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIC8vZm9yIHRlc3RpbmdcclxuICAgICAgICAvLyB0aGlzLkNvdW50ZXIrKztcclxuICAgICAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIFR3b0J1dHRvbnNGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24obnVsbCwxKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbihldmVudD1udWxsLF90eXBlPTApIHtcclxuICAgICAgICBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3MpIHtcclxuICAgICAgICAgICAgaWYgKEJpZ0J1c2luZXNzRGF0YSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLHRydWUsX3R5cGUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsZmFsc2UsX3R5cGUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuTG9zc2VzKSB7XHJcbiAgICAgICAgICAgIGlmKExvc3Nlc0RhdGE9PW51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsZmFsc2UsX3R5cGUpOyAgICAgXHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5NYXJrZXRpbmcpIHtcclxuICAgICAgICAgICAgaWYoTWFya2V0aW5nRGF0YT09bnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsIHRydWUsIF90eXBlKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5NYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgZmFsc2UsIF90eXBlKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLldpbGRDYXJkKSB7XHJcbiAgICAgICAgICAgIGlmKFdpbGRDYXJkRGF0YT09bnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuV2lsZENhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuV2lsZENhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCBmYWxzZSwgX3R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5TZWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuSW52ZXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0RnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5CdXlPclNlbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5CdXlPclNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuT25lUXVlc3Rpb25GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkdvQmFja1NwYWNlcykge1xyXG4gICAgICAgICAgICB0aGlzLkdvQmFja0Z1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrTG9hbigpIHtcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB2YWwgPSAtMTtcclxuICAgICAgICB2YWwgPSBfbG9hblRha2VuID09IHRydWUgPyAxIDogMDtcclxuICAgICAgICB2YXIgUmVzdWx0ID0gY2MudjIodmFsLCBfYnVzaW5lc3NJbmRleClcclxuICAgICAgICByZXR1cm4gUmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBDb21wbGV0ZVR1cm5XaXRoVG9hc3QoX21zZywgX3RpbWUpIHtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfbXNnKTtcclxuICAgICAgICAgICAgdmFyIF9kZWxheSA9IHRoaXMuZ2V0UmFuZG9tKDI1MDAsIDM1MDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSwgKF9kZWxheSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChfbXNnLCBfdGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUmVzZXRDYXJkRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9LCAoX3RpbWUgKyAxMDAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KF9pZCwgX2hhc1R3b1NjcmVlbnMgPSBmYWxzZSxfdHlwZT0wKSB7XHJcbiAgICAgICAgdmFyIEluZGV4ID0gcGFyc2VJbnQoX2lkKTtcclxuICAgICAgICBJbmRleCA9IEluZGV4IC0gMTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgICAgY2FzZSBcIjFcIjovL3JlY2VpdmUgMjAwMDAkIGdpZnQgdG8gcGF5b2ZmIGxvYW5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcmVzdWx0ID0gdGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBJc0xvYW5UYWtlbiA9IF9yZXN1bHQueDtcclxuICAgICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9yZXN1bHQueTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoSXNMb2FuVGFrZW4gPT0gMSkgLy9tZWFucyB1c2VyIGhhcyB0YWtlbiBsb2FuXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIDIwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJMb2FuIGFtb3VudCBvZiAkMjAwMDAgaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiLCAxODAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbm90IHRha2VuIGFueSBsb2FuLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsIDE4MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOi8vaGlyZSBsYXd5ZXJcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgQmlnQnVzaW5lc3NEYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgaGlyZWQgbGF5d2VyLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsIDE4MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLlwiLCAxODAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjNcIjovL1lvdSBkbyBhIFRyYWRlIFNob3cgZm9yIG9uZSBvZiB5b3VyIGJ1c2luZXNzZXMgYW5kIGdldCBzb21lIG5ldyBjbGllbnRzLiBDaG9vc2Ugb25lIG9mIHlvdXIgYnVzaW5lc3NlcyBhbmQgcm9sbCBhIFBheURheSByb2xsIHJpZ2h0IG5vdy5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVNYW5pcGlsYXRpb25TY3JlZW5fX0J1c2luZXNzTWFuaXB1bGF0aW9uVUlTZXR1cCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyNDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZU1hbmlwaWxhdGlvblNjcmVlbl9fQnVzaW5lc3NNYW5pcHVsYXRpb25VSVNldHVwKHRydWUsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjRcIjovL0EgZnJpZW5kIGdpdmVzIHlvdSBhIHN1Z2dlc3Rpb24gb24gYSBzdG9jayB0byBidXkuIFBsYWNlIHlvdXIgaW52ZXN0bWVudCBhbW91bnQgb24gdGhlIHRhYmxlIGFuZCByb2xsLiBUaGUgcmVzdWx0LCBtdWx0aXBsaWVkIGJ5ICQxLDAwMCwgaXMgdGhlIGFtb3VudCBvZiBlYWNoIHNoYXJlIG9mIHN0b2NrLiBZb3UgY2FuIGJ1eSB0aGlzIHN0b2NrIG5vdyBpZiB5b3Ugd291bGQgbGlrZS5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uKG51bGwsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI1XCI6Ly9Zb3UgcmVzZXJ2ZSBhIHByaXZhdGUgWWFjaHQgZm9yIGEgd2VlayBsb25nIHZhY2F0aW9uLiBSb2xsIGJvdGggZGllLCBtdWx0aXBseSB0aGUgcmVzdWx0IGJ5ICQzLDAwMC4gUGF5IHRoZSBCYW5rIHlvdXIgdmFjYXRpb24gY29zdCBhbmQgbG9zZSB5b3VyIG5leHQgdHVybiBiYXNraW5nIGluIHlvdXIgcHJpdmF0ZSBzdW4uXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfZGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHZhciBfbXVsdGlwbGllciA9IDMwMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3Jlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBfcmVzdWx0ID0gX211bHRpcGxpZXIgKiBfZGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfcmVzdWx0LCBEaWNlOiBfZGljZVJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIENvc3QgQ2FsY3VsYXRlZCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIiAqIFwiICsgX211bHRpcGxpZXIgKyBcIiA9ICRcIiArIF9yZXN1bHQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IEJpZ0J1c2luZXNzRGF0YS5EYXRhLkRpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdCA9IEJpZ0J1c2luZXNzRGF0YS5EYXRhLnJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfcmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJDb3N0ICRcIitfcmVzdWx0K1wiIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBwYWlkLCB5b3Ugd2lsbCBhbHNvIGxvc2UgeW91ciBuZXh0IHR1cm4sIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI2XCI6Ly9Zb3VyIHBhcmVudHMgZ2l2ZSB5b3UgJDIwLDAwMCB0b3dhcmRzIHN0YXJ0aW5nIGEgbmV3IGJ1c2luZXNzIG9yIGludmVzdGluZyBpbiB5b3VyIGN1cnJlbnQgYnVzaW5lc3MuIENob29zZSB3aGljaCBhbmQgcGxheSBhY2NvcmRpbmcgdG8gdGhlIGdhbWUgcnVsZXMuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBDYXNoR2l2ZW4gPSAyMDAwMDtcclxuICAgICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdHlwZSA9PSAwKS8vc3RhcnQgbmV3IGJ1c2luZXNzXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsIHRydWUsIDAsIGZhbHNlLCAwLCB0cnVlLCBDYXNoR2l2ZW4sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpLy9pbnZlc3QgaW4gZXhpc3RpbmcgYnVzaW5lc3NcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24obnVsbCwgdHJ1ZSxDYXNoR2l2ZW4sZmFsc2UpOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIGJvdCwgc28gc2tpcHBpbmcgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiN1wiOi8vWW91IGluaGVyaXQgYSBidXNpbmVzcyBmcm9tIHlvdXIgRmF0aGVyLiBEZWNpZGUgdGhlIHR5cGUgb2YgYnVzaW5lc3MgaXQgaXMsIHdoYXQgdGhlIG5hbWUgb2YgdGhlIGJ1c2luZXNzIGlzLCB3aGV0aGVyIGl0IGlzIGEgaG9tZS1iYXNlZCBvciBicmljayAmIG1vcnRhciBidXNpbmVzcyBhbmQgaW5jbHVkZSBpdCBpbnRvIHlvdXIgZ2FtZSBwbGF5LiBQYXkgYSAkMjAsMDAwIHRyYW5zZmVyIGZlZS4gSWYgeW91IGRvIG5vdCBoYXZlICQyMCwwMDAgaW4gY2FzaCwgeW91IGNhbm5vdCBoYXZlIHRoZSBidXNpbmVzcy5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIENhc2hDb3N0ID0gMjAwMDA7XHJcbiAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3R5cGUgPT0gMCkvL3BheSBhbW91bnRcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gQ2FzaENvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBDYXNoQ29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsIHRydWUsIDAsIGZhbHNlLCAwLCB0cnVlLCAwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKS8vc2tpcFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJTa2lwcGluZy4uLlwiLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIGJvdCwgc28gc2tpcHBpbmcgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiOFwiOi8vZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXkgZGF5XHJcbiAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsIDE4MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiOVwiOi8vWW91IGJ1eSBhIHRlbGV2aXNpb24gc3RhdGlvbiBhbmQgY29udmluY2UgZXZlcnkgcGxheWVyIGluIHRoZSBnYW1lIHRvIG1hcmtldCBvbiB5b3VyIHN0YXRpb24gb25lIHRpbWUuIFlvdSByZWNlaXZlIDUwJSBvZiBhbGwgdGhlIG1hcmtldGluZyBkb2xsYXJzIGN1cnJlbnRseSBvbiB0aGUgYm9hcmQuIFJvdW5kIHRvIHRoZSBuZWFyZXN0ICQxLDAwMCBpZiBuZWVkZWQuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBCaWdCdXNpbmVzc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYW1vdW50ID0gX2Ftb3VudCArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX2Ftb3VudCA9IF9hbW91bnQgLyAyO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2YWx1ZTogXCIgKyBfYW1vdW50KTtcclxuICAgICAgICAgICAgICAgIF9hbW91bnQgPSBNYXRoLnJvdW5kKF9hbW91bnQgLyAxMDAwKSAqIDEwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSb3VuZGVkIHZhbHVlOiBcIiArIF9hbW91bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtb2RlPT0yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hY3RvcnNBcnJheSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kYXRhID0gX2FjdG9yc0FycmF5W2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZGF0YS5NYXJrZXRpbmdBbW91bnQgPSBNYXRoLnJvdW5kKF9kYXRhLk1hcmtldGluZ0Ftb3VudC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfYWN0b3JzQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50ID1NYXRoLnJvdW5kKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5NYXJrZXRpbmdBbW91bnQvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNhc2ggYW1vdW50ICRcIitfYW1vdW50K1wiIGhhcyBzdWNjZXNzZnVsbHkgYWRkZWQsIGNhc2ggYmFsYW5jZSBiZWNvbWVzICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsNDAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxMFwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxMVwiOi8vcm9sbCBkaWNlIHR3aWNlLCBpZiByZXN1bHQgaXMgPjE5IHRoZW4gdGFrZSBhbGwgbW9uZXkgaW5zaWRlIG1hcmtldGluZy5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIERpY2UxUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgRGljZTJSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSBEaWNlMVJlc3VsdCArIERpY2UyUmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChUb3RhbFJlc3VsdCA+PSAxOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfYW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hbW91bnQgPSBfYW1vdW50ICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRGljZSAxIFJlc3VsdDogXCIgKyBEaWNlMVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJEaWNlIDIgUmVzdWx0OiBcIiArIERpY2UyUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIiArIFRvdGFsUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFtb3VudCAkXCIgKyBfYW1vdW50ICsgXCIgaGFzIHN1Y2Nlc3NmdWxseSBhZGRlZCBpbiB5b3VyIGNhc2ggZnJvbSBtYXJrZXRpbmcgYW1vdW50IG9uIHRhYmxlLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgNDAwMCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZT09Mikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2FjdG9yc0FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kYXRhID0gX2FjdG9yc0FycmF5W2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2RhdGEuTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRGljZSAxIFJlc3VsdDogXCIgKyBEaWNlMVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJEaWNlIDIgUmVzdWx0OiBcIiArIERpY2UyUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIiArIFRvdGFsUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIllvdSByYW4gb3V0IG9mIGx1Y2ssIHR1cm4gd2lsbCBza2lwIG5vd1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgNDAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KF9pZCwgX2hhc1R3b1NjcmVlbnMgPSBmYWxzZSxfdHlwZT0wKSB7XHJcbiAgICAgICAgdmFyIEluZGV4ID0gcGFyc2VJbnQoX2lkKTtcclxuICAgICAgICBJbmRleCA9IEluZGV4IC0gMTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgICAgY2FzZSBcIjFcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIyXCI6Ly9Zb3UgcHV0IGFuIGFkIG9uIEZhY2Vib29rIGZvciB5b3VyIGJ1c2luZXNzLiBSb2xsIHRoZSBkaWNlOiAxIC0gSWYgeW91IHJvbGwgYSA2IG9yIGxvd2VyLCB5b3UgbG9zZSBhbGwgb2YgdGhlIG1vbmV5IGluIHlvdXIgbWFya2V0aW5nIGFjY291bnQgMiAtIElmIHlvdSByb2xsIGEgNyBvciBoaWdoZXIsIHlvdXIgYWQgbmV0cyB5b3UgODAwJSBvZiB0aGUgdG90YWwgbW9uZXkgY3VycmVudGx5IGluIHlvdXIgbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFya2V0aW5nQW1vdW50ID1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBfZGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHZhciBfbXVsdGlwbGllciA9IDgwMDtcclxuICAgICAgICAgICAgICAgIGlmIChfbWFya2V0aW5nQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfZGljZVJlc3VsdCB9IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGljZVJlc3VsdCA8PSA2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIGRpY2UgcmVzdWx0IGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBzaXgsIHNvIHlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgY3VycmVudCBtYXJrZXRpbmcgYW1vdW50LlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkRvbmVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoX2RpY2VSZXN1bHQgPj0gNylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBkaWNlIHJlc3VsdCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gc2V2ZW4sIHNvIHlvdSB3aWxsIGdldCA4MDAlIHByb2ZpdCBvbiBjdXJyZW50IG1hcmtldGluZyBhbW91bnQuXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUmVjZWl2ZSBBbW91bnRcIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IE1hcmtldGluZ0RhdGEuRGF0YS5yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfZGljZVJlc3VsdCA8PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX2xvc2VBbW91bnQsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYgKF9kaWNlUmVzdWx0ID49IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVzdWx0ID0gKF9tYXJrZXRpbmdBbW91bnQgKiBfbXVsdGlwbGllciAvIDEwMCkgKyBfbWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBwcm9maXQgb2YgJFwiICsgX3Jlc3VsdCtcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LlwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjNcIjovL1lvdXIgYWQgY29udGFpbnMgZmFsc2UgY2xhaW1zIGFuZCByZXN1bHQgaW4gYSBnb3Zlcm5tZW50IGludmVzdGlnYXRpb24uIFlvdSBsb3NlIHlvdXIgZW50aXJlIE1hcmtldGluZyBBY2NvdW50LCBwbHVzIHBheSBsYXd5ZXIgZmVlcyBvZiAkMywwMDAgcGVyIGJ1c2luZXNzIHRvIHRoZSBiYW5rLiBJZiB5b3UgaGF2ZSBhIGxhd3llciwgeW91IGRvIG5vdCBoYXZlIHRvIHBheSB0aGUgZXh0cmEgJDMsMDAwIGluIGZlZXMsIHBlciBidXNpbmVzcy5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFya2V0aW5nQW1vdW50ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2xhd3llclN0YXR1cyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9idXNpbmVzc0Ftb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50ICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBfaGFzTWFya2V0aW5nQW1vdW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgX211bHRpcGxpZXIgPSAzMDAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIF90b3RhbEFtb3VudCA9IF9tdWx0aXBsaWVyICogX2J1c2luZXNzQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfbWFya2V0aW5nQW1vdW50ID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2hhc01hcmtldGluZ0Ftb3VudCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgX3RvdGFsQW1vdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF90b3RhbEFtb3VudCB9IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJNYXJrZXRpbmcgQW1vdW50IDogJFwiICsgX21hcmtldGluZ0Ftb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJMYXd5ZXIgSGlyZWQgOiBcIiArIF9sYXd5ZXJTdGF0dXMgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgTnVtYmVyIG9mIGJ1c2luZXNzIDogXCIgKyBfYnVzaW5lc3NBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRmVlcyA6IFwiK19idXNpbmVzc0Ftb3VudCtcIiAqIFwiK19tdWx0aXBsaWVyK1wiID0gJFwiK190b3RhbEFtb3VudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJEb25lXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RvdGFsQW1vdW50ID0gTWFya2V0aW5nRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgaGlyZWQgbGF3eWVyLCB5b3Ugb25seSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIrX21hcmtldGluZ0Ftb3VudCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX3RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGF2ZSBub3QgaGlyZWQgYW55IGxhd3llciwgYmlsbCAkXCIgKyBfdG90YWxBbW91bnQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQgYWxvbmcgd2l0aCBtYXJrZXRpbmcgYW1vdW50LCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjRcIjovL1lvdXIgTWFya2V0aW5nIEFjY291bnQgdHJpcGxlcywgYnV0IHlvdSBtdXN0IGxlYXZlIGl0IGluIHRoZSBhY2NvdW50LlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hcmtldEFtb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMztcclxuICAgICAgICAgICAgICAgIHZhciBfaW5jcmVhc2VBbW91bnQgPSBfbWFuYWdlci5NdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2luY3JlYXNlQW1vdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTWFya2V0aW5nIEFtb3VudDogJFwiICsgX21hcmtldEFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbDogXCIgKyBfbWFya2V0QW1vdW50ICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyICsgXCIgPSBcIiArIF9pbmNyZWFzZUFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieW91ciBtYXJrZXRpbmcgYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIHRvICRcIiArIF9pbmNyZWFzZUFtb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIDM2MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiNVwiOi8vWW91IGhpcmUgYSBNYXJrZXRpbmcgRmlybSB0byBtYXJrZXQgeW91ciBidXNpbmVzcyBidXQgaXQgeWllbGRzIG5vIHJlc3VsdHMuIFlvdSBsb3NlIHlvdXIgZW50aXJlIG1hcmtldGluZyBhY2NvdW50IHRvIHRoZSBCYW5rLiBQbHVzIHBheSAkNSwwMDAgZm9yIHRoZWlyIHNlcnZpY2VzLlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJpbGwgPSA1MDAwO1xyXG4gICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBiaWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gYmlsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJGZWVzICRcIiArIGJpbGwgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQgYWxvbmcgd2l0aCBtYXJrZXRpbmcgYW1vdW50LCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjZcIjovL1lvdSBiZWdpbiBhIG5ldyBtYXJrZXRpbmcgY2FtcGFpZ24uIFJvbGwgMSBkaWUuIElmIGl0IGlzIGFuIGV2ZW4gbnVtYmVyLCB5b3VyIGNhbXBhaWduIGlzIHN1Y2Nlc3NmdWwgYW5kIHlvdSByZWNlaXZlIGFsbCBvZiB0aGUgbW9uZXkgaW4geW91ciBtYXJrZXRpbmcgYWNjb3VudCBiYWNrIHBsdXMgNTAwJS4gSWYgaXQgaXMgYW4gb2RkIG51bWJlciB5b3UgbG9zZSBhbGwgb2YgdGhlIG1vbmV5IGluIHlvdXIgbWFya2V0aW5nIGFjY291bnQuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hcmtldGluZ0Ftb3VudCA9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgX211bHRpcGxpZXIgPSA1MDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNFdmVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9tYXJrZXRpbmdBbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsT25lRGljZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgJSAyID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRXZlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9kaWNlUmVzdWx0LElzRXZlbjppc0V2ZW4gfSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgJTI9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRXZlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIGRpY2UgcmVzdWx0IGlzIG9kZCwgc28geW91IHdpbGwgbG9zZSBhbGwgeW91ciBjdXJyZW50IG1hcmtldGluZyBhbW91bnQuXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRG9uZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChfZGljZVJlc3VsdCAlMj09MClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFdmVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGwgUmVzdWx0IDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgZGljZSByZXN1bHQgaXMgZXZlbiwgc28geW91IHdpbGwgZ2V0IDUwMCUgcHJvZml0IG9uIGN1cnJlbnQgbWFya2V0aW5nIGFtb3VudC5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJSZWNlaXZlIEFtb3VudFwiOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kaWNlUmVzdWx0ID0gTWFya2V0aW5nRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBpc0V2ZW4gPSBNYXJrZXRpbmdEYXRhLkRhdGEuSXNFdmVuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRXZlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChpc0V2ZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVzdWx0ID0gKF9tYXJrZXRpbmdBbW91bnQgKiBfbXVsdGlwbGllciAvIDEwMCkgKyBfbWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX3Jlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgcHJvZml0IG9mICRcIiArIF9yZXN1bHQrXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudC5cIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiOFwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI5XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTBcIjovL1JlY2VpdmUgYWxsIG9mIHlvdXIgTWFya2V0aW5nIEJ1ZGdldCBiYWNrLCBwbHVzIDcwMCUgcHJvZml0LlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hcmtldEFtb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wcm9maXQgPSA3MDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudCA9IF9tYW5hZ2VyLkdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfYW1vdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTWFya2V0aW5nIEFtb3VudDogJFwiICsgX21hcmtldEFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbDogXCIgKyBfbWFya2V0QW1vdW50ICsgXCIgKyAoXCIgKyBfbWFya2V0QW1vdW50ICsgXCIqXCIgKyBfcHJvZml0ICsgXCIgKS8xMDBcIiArIFwiID0gXCIgKyBfYW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ5b3VyIGNhc2ggYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIGJ5ICRcIiArIF9hbW91bnQgKyBcIiwgdG90YWwgY2FzaCBiZWNvbWVzICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIDQwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTFcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTRcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyMTAwKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDIxMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBMb3NzZXNDYXJkRnVuY3Rpb25hbGl0eShfaWQsIF9oYXNUd29TY3JlZW5zID0gZmFsc2UsX3R5cGU9MClcclxuICAgIHtcclxuICAgICAgdmFyIEluZGV4PXBhcnNlSW50KF9pZCk7XHJcbiAgICAgIEluZGV4PUluZGV4LTE7XHJcblxyXG4gICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgY2FzZSBcIjFcIjovL2xvc2UgbmV4dCB0dXJuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcE5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgbG9zZSB5b3VyIG5leHQgdHVybi5cIiwyNDAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMlwiOiAvL1JvbGwgMiBkaWNlLCBtdWx0aXBseSBieSAkNSwwMDAgYW5kIHBheSBpdCB0byB0aGUgQmFuay4gSWYgeW91IGhhdmUgYSBsYXd5ZXIgeW91IGxvc2UgNTAlIG9mIHRoZSB0b3RhbCBiaWxsIGN1cnJlbnRseSBvd2VkLlxyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgIHZhciBfaGlyZWRMYXd5ZXI7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgICAgIENhc2hNdWxpdHBsaWVyID0gNTAwMDtcclxuICAgICAgICAgICAgICAgICAgIFRvdGFsUmVzdWx0ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgX2hpcmVkTGF3eWVyID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IFRvdGFsUmVzdWx0LCBsYXd5ZXI6IF9oaXJlZExhd3llciB9IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGwgUmVzdWx0IDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIEJpbGwgQ2FsY3VsYXRlZCA6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gJFwiICsgVG90YWxSZXN1bHQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgX2hpcmVkTGF3eWVyID0gTG9zc2VzRGF0YS5EYXRhLmxhd3llcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX2hpcmVkTGF3eWVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3RhbFJlc3VsdCA9IFRvdGFsUmVzdWx0IC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IFRvdGFsUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9oaXJlZExhd3llcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBoaXJlZCBsYXd5ZXIsIGhhbGYgYmlsbCAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhdmUgbm90IGhpcmVkIGFueSBsYXd5ZXIsIGJpbGwgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6Ly9sb3NlIGFsbCB5b3VyIGJ1c2luZXNzIHByb2ZpdHMgb24gbmV4dCBQYXkgRGF5LlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3Ugd2lsbCBsb3NlIGFsbCB5b3VyIGJ1c2luZXNzIHByb2ZpdHMgb24gbmV4dCBQYXkgRGF5LlwiLDI0MDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI0XCI6Ly9ZZWFybHkgYnVzaW5lc3MgaW5zdXJhbmNlIHByZW1pdW0gaXMgZHVlLiBQYXkgJDIsMDAwIHRvIHRoZSBCYW5rIGZvciBlYWNoIEhvbWUtQmFzZWQgYnVzaW5lc3MsICQ1LDAwMCBmb3IgZWFjaCBCcmljayAmIE1vcnRhciBidXNpbmVzcy5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIGhvbWVCYXNlZEJ1c2luZXNzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICAgICAgIHZhciBicmlja0FuZE1vcnRhckJ1c2luZXNzID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgdmFyIGhvbWVNdWx0aXBsaWVyID0gMjAwMDtcclxuICAgICAgICAgICAgICAgdmFyIGJyaWNrTXVsaXBsaWVyID0gNTAwMDtcclxuICAgICAgICAgICAgICAgdmFyIHRvdGFsQW1vdW50ID0gKGhvbWVCYXNlZEJ1c2luZXNzICogaG9tZU11bHRpcGxpZXIpICsgKGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgKiBicmlja011bGlwbGllcik7XHJcbiAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IHRvdGFsQW1vdW50IH0gfTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJIb21lIEJhc2VkIEFtb3VudCA6IFwiICsgaG9tZUJhc2VkQnVzaW5lc3MrXCIgKiAkXCIraG9tZU11bHRpcGxpZXIrXCIgPSAkXCIrIChob21lQmFzZWRCdXNpbmVzcypob21lTXVsdGlwbGllcikrIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJCcmljayAmIE1vcnRhciBBbW91bnQgOiBcIiArIGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgKyBcIiAqICRcIiArIGJyaWNrTXVsaXBsaWVyICsgXCIgPSAkXCIgKyAoYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyAqIGJyaWNrTXVsaXBsaWVyKSArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBBbW91bnQgOiBcIisoaG9tZUJhc2VkQnVzaW5lc3MqaG9tZU11bHRpcGxpZXIpK1wiICsgXCIrKGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgKiBicmlja011bGlwbGllcikrXCIgPSAkXCIrdG90YWxBbW91bnQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gdG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgdG90YWxBbW91bnQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBtb25leSwgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI1XCI6Ly9Zb3VyIGVtcGxveWVlIGNsYWltcyB5b3Ugc2V4dWFsbHkgaGFyYXNzZWQgdGhlbSwgYnV0IHlvdSBkaWQgbm90LiBZb3UgY2FuIGVpdGhlcjsgIDEgLSBTZXR0bGUgb3V0IG9mIGNvdXJ0IGFuZCBwYXkgdGhlbSAkNTAsMDAwLiAyIC0gVGFrZSB5b3VyIGNoYW5jZXMgaW4gY291cnQuIFJvbGwgMiBkaWNlIGFuZCBwYXkgJDEwLDAwMCB0aW1lcyB0aGUgbnVtYmVyIHJvbGxlZC5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9jb3VydFNldHRsZW1lbnRGZWVzID0gNTAwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBEaWNlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXIgPSAxMDAwMDtcclxuICAgICAgICAgICAgICAgdmFyIHRvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX3R5cGUgPT0gMCkgeyAvL2ZpcnN0IGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX2NvdXJ0U2V0dGxlbWVudEZlZXMsIFR5cGU6IF90eXBlIH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlBheWFibGUgYW1vdW50IDogJFwiICsgX2NvdXJ0U2V0dGxlbWVudEZlZXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpIHsgLy8ybmQgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB0b3RhbEFtb3VudCA9IERpY2VSZXN1bHQgKiBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogRGljZVJlc3VsdCwgVG90YWxBbW91bnQ6IHRvdGFsQW1vdW50LCBUeXBlOiBfdHlwZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJlc3VsdCA6IFwiICsgRGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQW1vdW50IDogXCIgKyBEaWNlUmVzdWx0ICsgXCIgKiBcIiArIENhc2hNdWxpdHBsaWVyICsgXCIgPSAkXCIgKyB0b3RhbEFtb3VudCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfSBlbHNlIHsgXHJcbiAgICAgICAgICAgICAgICAgICB2YXIgdGVtcFR5cGUgPSBMb3NzZXNEYXRhLkRhdGEuVHlwZTtcclxuICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wVHlwZSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIF9jb3VydFNldHRsZW1lbnRGZWVzID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX2NvdXJ0U2V0dGxlbWVudEZlZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX2NvdXJ0U2V0dGxlbWVudEZlZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgX2NvdXJ0U2V0dGxlbWVudEZlZXMgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRlbXBUeXBlID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgRGljZVJlc3VsdCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdG90YWxBbW91bnQgPSBMb3NzZXNEYXRhLkRhdGEuVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0b3RhbEFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gdG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIHRvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjZcIjovLyBJZiBCdXNpbmVzcyAjMSBpcyBIb21lIEJhc2VkLCBwYXkgYSAkNSwwMDAgSW5zdXJhbmNlIERlZHVjdGlibGU7IGlmIEJyaWNrICYgTW9ydGFyICQxMCwwMDAgZGVkdWN0aWJsZS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NUeXBlPXBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICAgICBpZihfYnVzaW5lc3NUeXBlPT0xKSAvLyBmaXJzdCBidXNpbmVzcyB3YXMgaG9tZSBiYXNlZFxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gNTAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJDUwMDAgaW5zdXJhbmNlIG9uIHlvdXIgZmlyc3QgaG9tZSBiYXNlZCBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZSBpZiAoX2J1c2luZXNzVHlwZT09MikgLy9maXJzdCBidXNpb25lc3Mgd2FzIGJyaWNrICYgbW9ydGFyXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PTEwMDAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLT0xMDAwMDtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQxMDAwMCBpbnN1cmFuY2Ugb24geW91ciBmaXJzdCBicmljayAmIG1vcnRhciBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCw0MjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjovL2xvc2UgeW91ciBuZXh0IFBheSBEYXkgZm9yIGFsbCBvZiB5b3VyIGhvbWUtYmFzZWQgYnVzaW5lc3Nlcy5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3Ugd2lsbCBsb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXCIsMjQwMCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOi8vWW91IGFyZSBmaW5lZCA1MCUgb2YgeW91ciBjdXJyZW50IGxpcXVpZCBjYXNoLiBJZiB5b3UgaGF2ZSBhIGxhd3llciwgeW91ciBmaW5lIGlzIHJlZHVjZWQgdG8gMjAlIG9mIHlvdXIgY3VycmVudCBsaXF1aWQgY2FzaC5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgICB2YXIgX2hpcmVkTGF3eWVyO1xyXG5cclxuICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICBfaGlyZWRMYXd5ZXIgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuXHJcbiAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogVG90YWxSZXN1bHQsIGxhd3llcjogX2hpcmVkTGF3eWVyIH0gfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIlRvdGFsIENhc2ggOiAkXCIgKyBUb3RhbFJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI1MCUgb2YgVG90YWwgQ2FzaCA6ICRcIiArIChUb3RhbFJlc3VsdCAvIDIpLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coTG9zc2VzRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICBUb3RhbFJlc3VsdCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICBfaGlyZWRMYXd5ZXIgPSBMb3NzZXNEYXRhLkRhdGEubGF3eWVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIGlmIChfaGlyZWRMYXd5ZXIpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFRvdGFsUmVzdWx0ID0gKFRvdGFsUmVzdWx0ICogMjApIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICBUb3RhbFJlc3VsdCA9IChUb3RhbFJlc3VsdCAqIDUwKSAvIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gVG90YWxSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2hpcmVkTGF3eWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIGhpcmVkIGxhd3llciwgcmVkdWNlZCBmaW5lICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGF2ZSBub3QgaGlyZWQgYW55IGxhd3llciwgZmluZSAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBubyBtb25leSwgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjovL0EgY3VzdG9tZXIgaXMgaW5qdXJlZCBhdCBvbmUgb2YgeW91ciBidXNpbmVzcyBsb2NhdGlvbnMuIFlvdSBjYW4gZWl0aGVyOyAxIC0gU2V0dGxlIG91dCBvZiBjb3VydCBhbmQgcGF5IHRoZW0gJDI1LDAwMCAsIDIgLSBUYWtlIHlvdXIgY2hhbmNlcyBpbiBjb3VydC4gUm9sbCAyIGRpY2UgYW5kIHBheSAkNSwwMDAgdGltZXMgdGhlIG51bWJlciByb2xsZWQuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX2NvdXJ0U2V0dGxlbWVudEZlZXMgPSAyNTAwMDtcclxuICAgICAgICAgICAgICAgdmFyIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgIHZhciBDYXNoTXVsaXRwbGllciA9IDUwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciB0b3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgICAgaWYgKF90eXBlID09IDApIHsgLy9maXJzdCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9jb3VydFNldHRsZW1lbnRGZWVzLCBUeXBlOiBfdHlwZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJQYXlhYmxlIGFtb3VudCA6ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKSB7IC8vMm5kIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdG90YWxBbW91bnQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IERpY2VSZXN1bHQsIFRvdGFsQW1vdW50OiB0b3RhbEFtb3VudCwgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIEFtb3VudCA6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gJFwiICsgdG90YWxBbW91bnQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0gZWxzZSB7IFxyXG4gICAgICAgICAgICAgICAgICAgdmFyIHRlbXBUeXBlID0gTG9zc2VzRGF0YS5EYXRhLlR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAodGVtcFR5cGUgPT0gMClcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBfY291cnRTZXR0bGVtZW50RmVlcyA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9jb3VydFNldHRsZW1lbnRGZWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9jb3VydFNldHRsZW1lbnRGZWVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wVHlwZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gTG9zc2VzRGF0YS5EYXRhLlRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IHRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyB0b3RhbEFtb3VudCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6Ly9Zb3VyIGNvbXB1dGVyIGhhcyBiZWVuIGhhY2tlZCEgWW91IGNhdGNoIGl0IGluIHRpbWUsIGJ1dCB5b3UgbXVzdCBidXkgbW9yZSBzZWN1cml0eSBmb3IgeW91ciBidXNpbmVzcyByZWNvcmRzLiBQYXkgJDIwLDAwMCB0byB0aGUgQmFuay5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIGJpbGwgPSAyMDAwMDtcclxuICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBiaWxsKSB7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gYmlsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIGJpbGwgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE0XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBXaWxkQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLF90eXBlPTApXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9kb3VibGVzIHlvdXIgaW5jb21lIG9uIHRoZSBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMjQwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjovL1JvbGwgMSBkaWUsIG11bHRpcGx5IHJlc3VsdCBieSAkNSwwMDAgYW5kIHJlY2VpdmUgeW91ciBhZHZhbmNlIGZyb20gdGhlIEJhbmsuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBEaWNlUmVzdWx0PV9tYW5hZ2VyLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXI9NTAwMDtcclxuICAgICAgICAgICAgIHZhciBUb3RhbFJlc3VsdD1EaWNlUmVzdWx0KkNhc2hNdWxpdHBsaWVyO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9VG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgUmVzdWx0OiBcIitEaWNlUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK0RpY2VSZXN1bHQrXCIgKiBcIitDYXNoTXVsaXRwbGllcitcIiA9IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJBbW91bnQgJFwiK1RvdGFsUmVzdWx0K1wiIGhhcyBiZWVuIGFkZGVkIGludG8geW91ciBjYXNoLlwiXHJcbiAgICAgICAgICAgICAgICAsNDAwMCk7XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6Ly9Zb3UgZ28gdG8gYW4gRXN0YXRlIEF1Y3Rpb24gYW5kIGJ1eSBhIHBhaW50aW5nIHRoYXQgdHVybnMgb3V0IHRvIGJlIHZhbHVhYmxlLiBZb3UgY2FuIHNlbGwgaXQgbm93LCByb2xsIGJvdGggZGljZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQxMCwwMDAgYW5kIHJlY2VpdmUgcHJvZml0cyBmcm9tIHRoZSBCYW5rLlxyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyPTEwMDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ9RGljZVJlc3VsdCpDYXNoTXVsaXRwbGllcjtcclxuICBcclxuICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz1Ub3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIrRGljZVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK0RpY2VSZXN1bHQrXCIgKiBcIitDYXNoTXVsaXRwbGllcitcIiA9IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICAgXCJBbW91bnQgJFwiK1RvdGFsUmVzdWx0K1wiIGhhcyBiZWVuIGFkZGVkIGludG8geW91ciBjYXNoLlwiXHJcbiAgICAgICAgICAgICAgICAgICw1MjAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOi8vWW91ciBidXNpbmVzcyBpcyBhdWRpdGVkIGJ5IHRoZSBJUlMgYW5kIHlvdSBoYXZlIG5vdCBiZWVuIGtlZXBpbmcgdmVyeSBnb29kIHJlY29yZHMgb2YgdGhlIGluY29tZSBhbmQgZXhwZW5zZXMgZm9yIHlvdXIgYnVzaW5lc3MuIFRoZXkgZmluZSB5b3UgJDMwLDAwMC4gSWYgeW91IGhhdmUgYSBsYXd5ZXIsIHlvdXIgZmluZSBpcyAkMTUsMDAwLlxyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX2ZpbmUgPSAzMDAwMDtcclxuICAgICAgICAgICAgICAgdmFyIF9sYXd5ZXJTdGF0dXMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKVxyXG4gICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX2ZpbmUgPSBfZmluZSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfZmluZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiTGF3eWVyIEhpcmVkIDogXCIgKyBfbGF3eWVyU3RhdHVzICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgZmluZSAkXCIrX2ZpbmUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIF9maW5lID0gV2lsZENhcmREYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfZmluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfZmluZTtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRmVlcyAkXCIgKyBfZmluZSArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgMjgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOi8vWW91IGNhbiBiZWNvbWUgYSB2ZW5kb3IgYXQgYSBsb2NhbCBKYXp6IEZlc3RpdmFsIGZvciBhIHZlbmRpbmcgZmVlIG9mICQyMCwwMDAuIElmIHlvdSBhY2NlcHQsIHBheSB0aGUgQmFuayAkMjAsMDAwIGFuZCByb2xsIHR3byBkaWU7IG11bHRpcGx5IHRoZSByZXN1bHQgYnkgJDUsMDAwIGFuZCByZWNlaXZlIHlvdXIgdmVuZGluZyBpbmNvbWUgZnJvbSB0aGUgQmFuay5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9mZWVzID0gMjAwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBfbXVsdGlwbGllciA9IDUwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBfZGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgdmFyIF9yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIGlmIChfdHlwZSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHQgPSBfZGljZVJlc3VsdCAqIF9tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9yZXN1bHQsIERpY2U6IF9kaWNlUmVzdWx0IH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9mZWVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9mZWVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0OiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBBbW91bnQgOiBcIitfZGljZVJlc3VsdCtcIiAqIFwiK19tdWx0aXBsaWVyK1wiID0gJFwiK19yZXN1bHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlJlY2VpdmUgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIiwyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwic2tpcHBpbmcgdHVybiBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IFdpbGRDYXJkRGF0YS5EYXRhLkRpY2U7XHJcbiAgICAgICAgICAgICAgICAgICBfcmVzdWx0ID0gV2lsZENhcmREYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNhc2ggYW1vdW50ICRcIitfcmVzdWx0K1wiIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBhZGRlZC5cIiwzMDAwKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOi8vcGF5IG9mZiB5b3VyIGxvYW4gZm9yIHlvdXIgQnJpY2sgJiBNb3J0YXIgQnVzaW5lc3MuIElmIHlvdSBoYXZlIG5vIGxvYW4gb3V0c3RhbmRpbmcsIHJlY2VpdmUgJDUwLDAwMC5cclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgdmFyIF9sb2FuUmVzZXQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3R5cGU9cGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZihfdHlwZT09MiAmJiBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hblJlc2V0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKF9sb2FuUmVzZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91ciBvdXRzdGFuZGluZyBsb2FuIGhhcyBiZWVuIHBheWVkIG9mZi5cIiwzMjAwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz01MDAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBubyBsb2FuLCBhbW91bnQgJDUwMDAwIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaFwiLDMyMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTBcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6Ly8gcmVjZWl2ZSBkb3VibGUgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIGFsbCBvZiB5b3VyIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwyNDAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgSW52ZXN0RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBQYXlEYXlGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIERvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25GdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGxGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBHb0JhY2tGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxufSk7XHJcbm1vZHVsZS5leHBvcnRzPSBEZWNrc0RhdGE7XHJcbiJdfQ==