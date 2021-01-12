
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

    this.IsBotTurn = _isBot;
    this.SpacesType = EnumSpaceType.BigBusiness;
    this.isOwner = _isOwner;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.BigBusiness[this.SelectedCardIndex].ID;
    if (this.BigBusiness[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.BigBusiness[this.SelectedCardIndex].ButtonName;
    this.ShowCardInfo(this.BigBusiness[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.BigBusiness[this.SelectedCardIndex].HasButton, _isBot);

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
    this.ShowCardInfo(this.Marketing[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.Marketing[this.SelectedCardIndex].HasButton, _isBot);

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
      this.BigBusinessCardFunctionality(this.CardSelected);
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

        if (_manager.PlayerGameInfo[_playerIndex].LawyerStatus) {
          this.CompleteTurnWithToast("You have already hired laywer, turn will skip now.", 1800);
        } else {
          _manager.PlayerGameInfo[_playerIndex].LawyerStatus = true;
          this.CompleteTurnWithToast("You have successfully hired a lawyer.", 1800);
        }

        break;

      case "3":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "4":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "5":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "6":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "7":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "8":
        //double pay day on next pay day
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleDoublePayNextTurn(true);

        this.CompleteTurnWithToast("You will receive double profits on next payday.", 1800);
        break;

      case "9":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "10":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "11":
        //roll dice twice, if result is >19 then take all money inside marketing.
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var Dice1Result = _manager.RollTwoDices();

        var Dice2Result = _manager.RollTwoDices(); //  var Dice1Result=12;
        //  var Dice2Result=12;


        var TotalResult = Dice1Result + Dice2Result;

        if (TotalResult >= 19) {
          var _mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

          var _amount = 0;

          for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
            _amount = _amount + _manager.PlayerGameInfo[index].MarketingAmount;
          }

          _manager.PlayerGameInfo[_playerIndex].Cash += _amount;
          this.CompleteTurnWithToast("Dice 1 Result: " + Dice1Result + "\n" + "\n" + "Dice 2 Result: " + Dice2Result + "\n" + "\n" + "Total: " + TotalResult + "\n" + "\n" + "\n" + "Amount $" + _amount + " has successfully added in your cash from marketing amount on table.", 4000);

          if (_mode == 2) {
            var _actorsArray = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

            for (var _index2 = 0; _index2 < _actorsArray.length; _index2++) {
              _actorsArray[_index2].customProperties.PlayerSessionData.MarketingAmount = 0;
            }
          }
        } else {
          this.CompleteTurnWithToast("Dice 1 Result: " + Dice1Result + "\n" + "\n" + "Dice 2 Result: " + Dice2Result + "\n" + "\n" + "Total: " + TotalResult + "\n" + "\n" + "\n" + "You ran out of luck, turn will skip now", 4000);
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
    var _this4 = this;

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
          console.log(_this4.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          WildCardData = null;

          _manager.ToggleDoublePayNextTurn(true);

          _this4.CompleteTurnWithToast("You will receive double profits on next payday.", 2400);

          break;

        case "2":
          //Roll 1 die, multiply result by $5,000 and receive your advance from the Bank.
          console.log(_this4.WildCards[Index].Description);
          WildCardData = null;

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var DiceResult = _manager.RollOneDice();

          var CashMulitplier = 5000;
          var TotalResult = DiceResult * CashMulitplier;
          _manager.PlayerGameInfo[_playerIndex].Cash += TotalResult;

          _this4.CompleteTurnWithToast("Dice Result: " + DiceResult + "\n" + "\n" + "Total: " + DiceResult + " * " + CashMulitplier + " = " + TotalResult + "\n" + "\n" + "\n" + "Amount $" + TotalResult + " has been added into your cash.", 4000);

          break;

        case "3":
          //You go to an Estate Auction and buy a painting that turns out to be valuable. You can sell it now, roll both dice, multiply result by $10,000 and receive profits from the Bank.
          console.log(_this4.WildCards[Index].Description);
          WildCardData = null;

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

          var DiceResult = _manager.RollTwoDices();

          var CashMulitplier = 10000;
          var TotalResult = DiceResult * CashMulitplier;
          _manager.PlayerGameInfo[_playerIndex].Cash += TotalResult;

          _this4.CompleteTurnWithToast("Dice Result: " + DiceResult + "\n" + "\n" + "Total: " + DiceResult + " * " + CashMulitplier + " = " + TotalResult + "\n" + "\n" + "Amount $" + TotalResult + " has been added into your cash.", 5200);

          break;

        case "4":
          //Your business is audited by the IRS and you have not been keeping very good records of the income and expenses for your business. They fine you $30,000. If you have a lawyer, your fine is $15,000.
          console.log(_this4.WildCards[Index].Description);

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

            if (!_this4.IsBotTurn) {
              _this4.ShowCardInfo("\n" + "Lawyer Hired : " + _lawyerStatus + "\n" + "\n" + "Total fine $" + _fine, true);

              _this4.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Pay Amount";

              _this4.ToggleButtons(_this4.isOwner, true, _this4.IsBotTurn);
            } else {
              _this4.CardFuntionalityButton();
            }
          } else {
            _fine = WildCardData.Data.result;

            if (_manager.PlayerGameInfo[_playerIndex].Cash >= _fine) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= _fine;
              _manager.PlayerGameInfo[_playerIndex].LawyerStatus = false;

              _this4.CompleteTurnWithToast("Fees $" + _fine + " was successfully paid, remaining cash $" + _manager.PlayerGameInfo[_playerIndex].Cash, 2800);

              WildCardData = null;
            } else {
              console.log("not enough cash");

              if (!_this4.IsBotTurn) {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
              } else {
                console.log("its bot and has no cash,skipping");
                WildCardData = null;

                _this4.CompleteTurnWithToast("", 1200);
              }
            }
          }

          break;

        case "5":
          //You can become a vendor at a local Jazz Festival for a vending fee of $20,000. If you accept, pay the Bank $20,000 and roll two die; multiply the result by $5,000 and receive your vending income from the Bank.
          console.log(_this4.WildCards[Index].Description);

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

                if (!_this4.IsBotTurn) {
                  _this4.ShowCardInfo("\n" + "Dice Result: " + _diceResult + "\n" + "\n" + "Total Amount : " + _diceResult + " * " + _multiplier + " = $" + _result, true);

                  _this4.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "Receive Amount";

                  _this4.ToggleButtons(_this4.isOwner, true, _this4.IsBotTurn);
                } else {
                  _this4.CardFuntionalityButton();
                }
              } else {
                WildCardData = null;

                _this4.CompleteTurnWithToast("you don't have enough cash.", 2400);
              }
            } else if (_type == 1) {
              WildCardData = null;

              _this4.CompleteTurnWithToast("skipping turn now.", 1800);
            }
          } else {
            _diceResult = WildCardData.Data.Dice;
            _result = WildCardData.Data.result;
            _manager.PlayerGameInfo[_playerIndex].Cash += _result;
            WildCardData = null;

            _this4.CompleteTurnWithToast("Cash amount $" + _result + " has been successfully added.", 3000);
          }

          break;

        case "6":
          console.log(_this4.WildCards[Index].Description);
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
            _this4.CompleteTurnWithToast("your outstanding loan has been payed off.", 3200);
          } else {
            _manager.PlayerGameInfo[_playerIndex].Cash += 50000;

            _this4.CompleteTurnWithToast("you had no loan, amount $50000 has been added to your cash", 3200);
          }

          console.log(_this4.WildCards[Index].Description);
          break;

        case "8":
          console.log(_this4.WildCards[Index].Description);
          break;

        case "9":
          console.log(_this4.WildCards[Index].Description);
          break;

        case "10":
          console.log(_this4.WildCards[Index].Description);
          break;

        case "11":
          // receive double your business profits on all of your businesses.
          console.log(_this4.WildCards[Index].Description);

          var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

          WildCardData = null;

          _manager.ToggleDoublePayNextTurn(true);

          _this4.CompleteTurnWithToast("You will receive double profits on next payday.", 2400);

          break;

        case "12":
          console.log(_this4.WildCards[Index].Description);
          break;

        case "13":
          console.log(_this4.WildCards[Index].Description);
          break;

        case "14":
          console.log(_this4.WildCards[Index].Description);
          break;

        case "15":
          console.log(_this4.WildCards[Index].Description);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiTG9zc2VzRGF0YSIsIk1hcmtldGluZ0RhdGEiLCJXaWxkQ2FyZERhdGEiLCJCaWdCdXNpbmVzc0RhdGEiLCJFbnVtU3BhY2VUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIldpbGRDYXJkIiwiQmlnQnVzaW5lc3MiLCJNYXJrZXRpbmciLCJJbnZlc3QiLCJMb3NzZXMiLCJQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJPbmVRdWVzdGlvbiIsIlNlbGwiLCJCdXlPclNlbGwiLCJHb0JhY2tTcGFjZXMiLCJDYXJkRGF0YSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJJRCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIlRleHQiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRGVzY3JpcHRpb24iLCJIYXNCdXR0b24iLCJIYXNUd29CdXR0b25zIiwiSGFzVGhyZWVCdXR0b25zIiwiQnV0dG9uTmFtZSIsIlNlY29uZEJ1dHRvbk5hbWUiLCJUaGlyZEJ1dHRvbk5hbWUiLCJjdG9yIiwiQ2FyZFVJIiwiVG9hc3ROb2RlIiwiTm9kZSIsIlRvYXN0TGFiZWwiLCJMYWJlbCIsIkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvbkJ1dHRvbk5vZGUiLCJJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlIiwiSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlIiwiRGVja3NEYXRhIiwiQ29tcG9uZW50IiwiTWFpblVJIiwiV2lsZENhcmRzIiwiU3BhY2VzVHlwZSIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsIlNlbGVjdGVkQ2FyZEluZGV4IiwiQ2FyZFNlbGVjdGVkIiwiSXNCb3RUdXJuIiwiaXNPd25lciIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlNob3dDYXJkSW5mbyIsIm9uRGlzYWJsZSIsIm9mZiIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiX2lzQm90IiwiX2hhc1R3b0J1dHRvbiIsImFjdGl2ZSIsInNldFRpbWVvdXQiLCJFeGl0Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCIsIl9yYW5kb21WYWx1ZSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50Iiwic3RyaW5nIiwiQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbiIsIkdlbmVyYXRlUmFuZG9tTWFya2V0aW5nQ2FyZCIsIkdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZCIsIkdlbmVyYXRlUmFuZG9tV2lsZENhcmQiLCJTcGFjZUludmVzdCIsIl9pbmRleCIsIkNvbXBsZXRlVHVybldpdGhUb2FzdCIsIlNwYWNlUGF5RGF5IiwiUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlRG91YmxlUGF5RGF5IiwiRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSIsIlNwYWNlT25lUXVlc3Rpb24iLCJTcGFjZVNlbGwiLCJTcGFjZUJ1eU9yU2VsbCIsIlNwYWNlR29CYWNrU3BhY2VzIiwibWVzc2FnZSIsIl9zdGF0ZSIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUmVzZXRDYXJkRGlzcGxheSIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJUd29CdXR0b25zRnVuY3Rpb25hbGl0eSIsImV2ZW50IiwiX3R5cGUiLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkiLCJHb0JhY2tGdW5jdGlvbmFsaXR5IiwiQ2hlY2tMb2FuIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiX21hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiaW5kZXgiLCJQbGF5ZXJHYW1lSW5mbyIsIk5vT2ZCdXNpbmVzcyIsImxlbmd0aCIsIkxvYW5UYWtlbiIsInZhbCIsIlJlc3VsdCIsInYyIiwiX21zZyIsIl90aW1lIiwiY29uc29sZSIsImxvZyIsIl9kZWxheSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlNob3dUb2FzdCIsIl9pZCIsIl9oYXNUd29TY3JlZW5zIiwiSW5kZXgiLCJwYXJzZUludCIsIl9yZXN1bHQiLCJJc0xvYW5UYWtlbiIsIngiLCJ5IiwiTG9hbkFtb3VudCIsIkxhd3llclN0YXR1cyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiRGljZTFSZXN1bHQiLCJSb2xsVHdvRGljZXMiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX21vZGUiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiX2Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkNhc2giLCJfYWN0b3JzQXJyYXkiLCJnZXRQaG90b25SZWYiLCJteVJvb21BY3RvcnNBcnJheSIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9sb3NlQW1vdW50IiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX21hcmtldGluZ0Ftb3VudCIsIl9kaWNlUmVzdWx0IiwiX211bHRpcGxpZXIiLCJEYXRhIiwicmVzdWx0IiwiX2xhd3llclN0YXR1cyIsIl9idXNpbmVzc0Ftb3VudCIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiX2hhc01hcmtldGluZ0Ftb3VudCIsIl90b3RhbEFtb3VudCIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiX21hcmtldEFtb3VudCIsIl9pbmNyZWFzZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJiaWxsIiwiaXNFdmVuIiwiUm9sbE9uZURpY2UiLCJJc0V2ZW4iLCJfcHJvZml0IiwiR2V0TWFya2V0aW5nTW9uZXkiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJEaWNlUmVzdWx0IiwiQ2FzaE11bGl0cGxpZXIiLCJfaGlyZWRMYXd5ZXIiLCJsYXd5ZXIiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiaG9tZUJhc2VkQnVzaW5lc3MiLCJicmlja0FuZE1vcnRhckJ1c2luZXNzIiwiaG9tZU11bHRpcGxpZXIiLCJicmlja011bGlwbGllciIsInRvdGFsQW1vdW50IiwiX2NvdXJ0U2V0dGxlbWVudEZlZXMiLCJUeXBlIiwiVG90YWxBbW91bnQiLCJ0ZW1wVHlwZSIsIl9idXNpbmVzc1R5cGUiLCJCdXNpbmVzc1R5cGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIl9maW5lIiwiX2ZlZXMiLCJEaWNlIiwiX2xvYW5SZXNldCIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3QjtBQUNBLElBQUlDLFVBQVUsR0FBRyxJQUFqQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxJQUFwQjtBQUNBLElBQUlDLFlBQVksR0FBRyxJQUFuQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxJQUF0QixFQUNBOztBQUNBLElBQUlDLGFBQWEsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDeEJDLEVBQUFBLElBQUksRUFBQyxDQURtQjtBQUV4QkMsRUFBQUEsUUFBUSxFQUFFLENBRmM7QUFHeEJDLEVBQUFBLFdBQVcsRUFBRSxDQUhXO0FBSXhCQyxFQUFBQSxTQUFTLEVBQUUsQ0FKYTtBQUt4QkMsRUFBQUEsTUFBTSxFQUFFLENBTGdCO0FBTXhCQyxFQUFBQSxNQUFNLEVBQUMsQ0FOaUI7QUFPeEJDLEVBQUFBLE1BQU0sRUFBRSxDQVBnQjtBQVF4QkMsRUFBQUEsWUFBWSxFQUFFLENBUlU7QUFTeEJDLEVBQUFBLFdBQVcsRUFBRSxDQVRXO0FBVXhCQyxFQUFBQSxJQUFJLEVBQUUsQ0FWa0I7QUFXeEJDLEVBQUFBLFNBQVMsRUFBRSxFQVhhO0FBWXhCQyxFQUFBQSxZQUFZLEVBQUM7QUFaVyxDQUFSLENBQXBCLEVBY0E7O0FBQ0EsSUFBSUMsUUFBUSxHQUFDZCxFQUFFLENBQUNlLEtBQUgsQ0FBUztBQUNsQkMsRUFBQUEsSUFBSSxFQUFDLFVBRGE7QUFFbEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxFQUFFLEVBQ0Y7QUFDR0MsTUFBQUEsV0FBVyxFQUFDLElBRGY7QUFFR0MsTUFBQUEsSUFBSSxFQUFFcEIsRUFBRSxDQUFDcUIsSUFGWjtBQUdHLGlCQUFTLEVBSFo7QUFJR0MsTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0dDLE1BQUFBLE9BQU8sRUFBQztBQUxYLEtBRlE7QUFRUkMsSUFBQUEsV0FBVyxFQUNYO0FBQ0dMLE1BQUFBLFdBQVcsRUFBQyxhQURmO0FBRUdDLE1BQUFBLElBQUksRUFBRXBCLEVBQUUsQ0FBQ3FCLElBRlo7QUFHRyxpQkFBUyxFQUhaO0FBSUdDLE1BQUFBLFlBQVksRUFBRSxJQUpqQjtBQUtHQyxNQUFBQSxPQUFPLEVBQUM7QUFMWCxLQVRRO0FBZVJFLElBQUFBLFNBQVMsRUFDVDtBQUNHTixNQUFBQSxXQUFXLEVBQUMsV0FEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUVwQixFQUFFLFdBRlg7QUFHRyxpQkFBUyxLQUhaO0FBSUdzQixNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FoQlE7QUF1QlJHLElBQUFBLGFBQWEsRUFDYjtBQUNHUCxNQUFBQSxXQUFXLEVBQUMsZUFEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUVwQixFQUFFLFdBRlg7QUFHRyxpQkFBUyxLQUhaO0FBSUdzQixNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0F4QlE7QUErQlJJLElBQUFBLGVBQWUsRUFDZjtBQUNHUixNQUFBQSxXQUFXLEVBQUMsaUJBRGY7QUFFR0MsTUFBQUEsSUFBSSxFQUFFcEIsRUFBRSxXQUZYO0FBR0csaUJBQVMsS0FIWjtBQUlHc0IsTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0dDLE1BQUFBLE9BQU8sRUFBQztBQUxYLEtBaENRO0FBc0NSSyxJQUFBQSxVQUFVLEVBQ1Y7QUFDR1QsTUFBQUEsV0FBVyxFQUFDLFlBRGY7QUFFR0MsTUFBQUEsSUFBSSxFQUFFcEIsRUFBRSxDQUFDcUIsSUFGWjtBQUdHLGlCQUFTLEVBSFo7QUFJR0MsTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBdkNRO0FBOENSTSxJQUFBQSxnQkFBZ0IsRUFDaEI7QUFDR1YsTUFBQUEsV0FBVyxFQUFDLGtCQURmO0FBRUdDLE1BQUFBLElBQUksRUFBRXBCLEVBQUUsQ0FBQ3FCLElBRlo7QUFHRyxpQkFBUyxFQUhaO0FBSUdDLE1BQUFBLFlBQVksRUFBRSxJQUpqQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQS9DUTtBQXNEUk8sSUFBQUEsZUFBZSxFQUNmO0FBQ0dYLE1BQUFBLFdBQVcsRUFBQyxrQkFEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUVwQixFQUFFLENBQUNxQixJQUZaO0FBR0csaUJBQVMsRUFIWjtBQUlHQyxNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLR0MsTUFBQUEsT0FBTyxFQUFDO0FBTFg7QUF2RFEsR0FGTTtBQWlFckJRLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUFFO0FBQ25CO0FBbEVvQixDQUFULENBQWIsRUFzRUE7O0FBQ0EsSUFBSUMsTUFBTSxHQUFDaEMsRUFBRSxDQUFDZSxLQUFILENBQVM7QUFDakJDLEVBQUFBLElBQUksRUFBQyxRQURZO0FBRWpCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUmdCLElBQUFBLFNBQVMsRUFDVDtBQUNHZCxNQUFBQSxXQUFXLEVBQUMsV0FEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUVwQixFQUFFLENBQUNrQyxJQUZaO0FBR0csaUJBQVMsSUFIWjtBQUlHWixNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLR0MsTUFBQUEsT0FBTyxFQUFDO0FBTFgsS0FGUTtBQVFSWSxJQUFBQSxVQUFVLEVBQ1Y7QUFDR2hCLE1BQUFBLFdBQVcsRUFBQyxZQURmO0FBRUdDLE1BQUFBLElBQUksRUFBRXBCLEVBQUUsQ0FBQ29DLEtBRlo7QUFHRyxpQkFBUyxJQUhaO0FBSUdkLE1BQUFBLFlBQVksRUFBRSxJQUpqQjtBQUtHQyxNQUFBQSxPQUFPLEVBQUM7QUFMWCxLQVRRO0FBZVRjLElBQUFBLFVBQVUsRUFDVDtBQUNHbEIsTUFBQUEsV0FBVyxFQUFDLFlBRGY7QUFFR0MsTUFBQUEsSUFBSSxFQUFFcEIsRUFBRSxDQUFDa0MsSUFGWjtBQUdHLGlCQUFTLElBSFo7QUFJR1osTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0dDLE1BQUFBLE9BQU8sRUFBQztBQUxYLEtBaEJRO0FBc0JQZSxJQUFBQSxxQkFBcUIsRUFDdEI7QUFDR25CLE1BQUFBLFdBQVcsRUFBQyxtQkFEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUVwQixFQUFFLENBQUNrQyxJQUZaO0FBR0csaUJBQVMsSUFIWjtBQUlHWixNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0F2QlE7QUE4QlJnQixJQUFBQSx5QkFBeUIsRUFDekI7QUFDR3BCLE1BQUFBLFdBQVcsRUFBQywyQkFEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUVwQixFQUFFLENBQUNrQyxJQUZaO0FBR0csaUJBQVMsSUFIWjtBQUlHWixNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0EvQlE7QUFzQ1JpQixJQUFBQSwyQkFBMkIsRUFDM0I7QUFDR3JCLE1BQUFBLFdBQVcsRUFBQyw2QkFEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUVwQixFQUFFLENBQUNrQyxJQUZaO0FBR0csaUJBQVMsSUFIWjtBQUlHWixNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLR0MsTUFBQUEsT0FBTyxFQUFDO0FBTFg7QUF2Q1EsR0FGSztBQWlEcEJRLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUFFO0FBQ25CO0FBbERtQixDQUFULENBQVgsRUFxREE7O0FBQ0EsSUFBSVUsU0FBUyxHQUFHekMsRUFBRSxDQUFDZSxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxXQURlO0FBRXJCLGFBQVNoQixFQUFFLENBQUMwQyxTQUZTO0FBR3JCekIsRUFBQUEsVUFBVSxFQUFFO0FBQ1IwQixJQUFBQSxNQUFNLEVBQ047QUFDSXhCLE1BQUFBLFdBQVcsRUFBRSxRQURqQjtBQUVJLGlCQUFTLElBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFFWSxNQUhWO0FBSUlWLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQUZRO0FBU1JuQixJQUFBQSxXQUFXLEVBQ1g7QUFDSWUsTUFBQUEsV0FBVyxFQUFFLGFBRGpCO0FBRUlDLE1BQUFBLElBQUksRUFBRSxDQUFDTixRQUFELENBRlY7QUFHSSxpQkFBUyxFQUhiO0FBSUlRLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQVZRO0FBaUJSbEIsSUFBQUEsU0FBUyxFQUNUO0FBQ0ljLE1BQUFBLFdBQVcsRUFBRSxXQURqQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ04sUUFBRCxDQUZWO0FBR0ksaUJBQVMsRUFIYjtBQUlJUSxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FsQlE7QUF5QlJoQixJQUFBQSxNQUFNLEVBQ047QUFDSVksTUFBQUEsV0FBVyxFQUFFLFFBRGpCO0FBRUlDLE1BQUFBLElBQUksRUFBRSxDQUFDTixRQUFELENBRlY7QUFHSSxpQkFBUyxFQUhiO0FBSUlRLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQTFCUTtBQWlDUnFCLElBQUFBLFNBQVMsRUFDVDtBQUNJekIsTUFBQUEsV0FBVyxFQUFFLFdBRGpCO0FBRUlDLE1BQUFBLElBQUksRUFBRSxDQUFDTixRQUFELENBRlY7QUFHSSxpQkFBUyxFQUhiO0FBSUlRLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQWxDUTtBQXlDUnNCLElBQUFBLFVBQVUsRUFDVjtBQUNJekIsTUFBQUEsSUFBSSxFQUFFckIsYUFEVjtBQUVJLGlCQUFTQSxhQUFhLENBQUNHLElBRjNCO0FBR0lvQixNQUFBQSxZQUFZLEVBQUUsSUFIbEI7QUFJSUMsTUFBQUEsT0FBTyxFQUFFO0FBSmI7QUExQ1EsR0FIUztBQXFEckJ1QixFQUFBQSxNQXJEcUIsb0JBcURaO0FBQ0wsU0FBS0MsZUFBTDtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLENBQUMsQ0FBMUI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLENBQUMsQ0FBckI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEtBQWYsQ0FMSyxDQU9MO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsR0FoRW9CO0FBa0VyQkMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCO0FBQ0FwRCxJQUFBQSxFQUFFLENBQUNxRCxXQUFILENBQWVDLEVBQWYsQ0FBa0IsVUFBbEIsRUFBOEIsS0FBS0MsWUFBbkMsRUFBaUQsSUFBakQ7QUFDRCxHQXJFa0I7QUF1RW5CQyxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDckJ4RCxJQUFBQSxFQUFFLENBQUNxRCxXQUFILENBQWVJLEdBQWYsQ0FBbUIsVUFBbkIsRUFBK0IsS0FBS0YsWUFBcEMsRUFBa0QsSUFBbEQ7QUFDRCxHQXpFa0I7QUEwRXJCUixFQUFBQSxlQTFFcUIsNkJBMEVIO0FBQ2QsUUFBSSxDQUFDckQsd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFJLElBQTdELEVBQ0lBLHdCQUF3QixHQUFHZ0UsT0FBTyxDQUFDLDBCQUFELENBQWxDO0FBQ1AsR0E3RW9CO0FBK0VyQkMsRUFBQUEsU0FBUyxFQUFFLG1CQUFVQyxHQUFWLEVBQWVDLEdBQWYsRUFBb0I7QUFDM0IsV0FBT0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQkgsR0FBRyxHQUFHRCxHQUF2QixDQUFYLElBQTBDQSxHQUFqRCxDQUQyQixDQUMyQjtBQUN6RCxHQWpGb0I7QUFtRnJCSyxFQUFBQSxhQW5GcUIseUJBbUZQQyxRQW5GTyxFQW1GR0MsVUFuRkgsRUFtRnVCQyxNQW5GdkIsRUFtRnNDQyxhQW5GdEMsRUFtRjJEO0FBQUE7O0FBQUEsUUFBeERGLFVBQXdEO0FBQXhEQSxNQUFBQSxVQUF3RCxHQUEzQyxLQUEyQztBQUFBOztBQUFBLFFBQXBDQyxNQUFvQztBQUFwQ0EsTUFBQUEsTUFBb0MsR0FBM0IsS0FBMkI7QUFBQTs7QUFBQSxRQUFyQkMsYUFBcUI7QUFBckJBLE1BQUFBLGFBQXFCLEdBQVAsS0FBTztBQUFBOztBQUM1RSxRQUFJSCxRQUFRLElBQUlDLFVBQWhCLEVBQTRCO0FBQ3hCLFdBQUt4QixNQUFMLENBQVlOLFVBQVosQ0FBdUJpQyxNQUF2QixHQUFnQyxLQUFoQztBQUNBLFdBQUszQixNQUFMLENBQVlMLHFCQUFaLENBQWtDZ0MsTUFBbEMsR0FBMkMsSUFBM0M7QUFFQSxVQUFJRCxhQUFKLEVBQ0ksS0FBSzFCLE1BQUwsQ0FBWUoseUJBQVosQ0FBc0MrQixNQUF0QyxHQUErQyxJQUEvQyxDQURKLEtBR0ksS0FBSzNCLE1BQUwsQ0FBWUoseUJBQVosQ0FBc0MrQixNQUF0QyxHQUErQyxLQUEvQztBQUNQLEtBUkQsTUFTSyxJQUFJSixRQUFRLElBQUksQ0FBQ0MsVUFBakIsRUFBNkI7QUFDOUIsV0FBS3hCLE1BQUwsQ0FBWU4sVUFBWixDQUF1QmlDLE1BQXZCLEdBQWdDLElBQWhDO0FBQ0EsV0FBSzNCLE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NnQyxNQUFsQyxHQUEyQyxLQUEzQztBQUNBLFdBQUszQixNQUFMLENBQVlKLHlCQUFaLENBQXNDK0IsTUFBdEMsR0FBK0MsS0FBL0M7QUFDSCxLQUpJLE1BS0E7QUFDRCxXQUFLM0IsTUFBTCxDQUFZTCxxQkFBWixDQUFrQ2dDLE1BQWxDLEdBQTJDLEtBQTNDO0FBQ0EsV0FBSzNCLE1BQUwsQ0FBWU4sVUFBWixDQUF1QmlDLE1BQXZCLEdBQWdDLEtBQWhDO0FBQ0EsV0FBSzNCLE1BQUwsQ0FBWUoseUJBQVosQ0FBc0MrQixNQUF0QyxHQUErQyxLQUEvQzs7QUFFQSxVQUFJRixNQUFNLElBQUksS0FBZCxFQUFxQjtBQUNqQkcsUUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixVQUFBLEtBQUksQ0FBQ0MsWUFBTDtBQUNILFNBRlMsRUFFUCxJQUZPLENBQVY7QUFHSDtBQUNKO0FBQ0osR0E3R29CO0FBZ0hyQkMsRUFBQUEsNkJBaEhxQix5Q0FnSFNQLFFBaEhULEVBZ0htQlEsWUFoSG5CLEVBZ0hpQ04sTUFoSGpDLEVBZ0hpRDtBQUFBLFFBQWhCQSxNQUFnQjtBQUFoQkEsTUFBQUEsTUFBZ0IsR0FBUCxLQUFPO0FBQUE7O0FBQ2xFLFNBQUtsQixTQUFMLEdBQWlCa0IsTUFBakI7QUFDQSxTQUFLdkIsVUFBTCxHQUFrQjlDLGFBQWEsQ0FBQ0ssV0FBaEM7QUFDQSxTQUFLK0MsT0FBTCxHQUFlZSxRQUFmO0FBQ0EsU0FBS2xCLGlCQUFMLEdBQXlCMEIsWUFBekI7QUFDQSxTQUFLekIsWUFBTCxHQUFvQixLQUFLN0MsV0FBTCxDQUFpQixLQUFLNEMsaUJBQXRCLEVBQXlDOUIsRUFBN0Q7QUFFQSxRQUFJLEtBQUtkLFdBQUwsQ0FBaUIsS0FBSzRDLGlCQUF0QixFQUF5Q3ZCLFNBQTdDLEVBQ0ksS0FBS2tCLE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixLQUFLekUsV0FBTCxDQUFpQixLQUFLNEMsaUJBQXRCLEVBQXlDcEIsVUFBbkk7QUFFSixTQUFLMkIsWUFBTCxDQUFrQixLQUFLbkQsV0FBTCxDQUFpQixLQUFLNEMsaUJBQXRCLEVBQXlDeEIsV0FBM0QsRUFBd0UsSUFBeEU7QUFDQSxTQUFLeUMsYUFBTCxDQUFtQkMsUUFBbkIsRUFBNkIsS0FBSzlELFdBQUwsQ0FBaUIsS0FBSzRDLGlCQUF0QixFQUF5Q3ZCLFNBQXRFLEVBQWlGMkMsTUFBakY7O0FBRUEsUUFBSUEsTUFBSixFQUFZO0FBQ1IsV0FBS1Usc0JBQUw7QUFDSDtBQUNKLEdBaElvQjtBQWtJckJDLEVBQUFBLDJCQWxJcUIsdUNBa0lPYixRQWxJUCxFQWtJaUJRLFlBbElqQixFQWtJK0JOLE1BbEkvQixFQWtJK0M7QUFBQSxRQUFoQkEsTUFBZ0I7QUFBaEJBLE1BQUFBLE1BQWdCLEdBQVAsS0FBTztBQUFBOztBQUNoRXhFLElBQUFBLGFBQWEsR0FBRyxJQUFoQjtBQUNBLFNBQUtzRCxTQUFMLEdBQWlCa0IsTUFBakI7QUFDQSxTQUFLdkIsVUFBTCxHQUFrQjlDLGFBQWEsQ0FBQ00sU0FBaEM7QUFDQSxTQUFLOEMsT0FBTCxHQUFlZSxRQUFmO0FBQ0EsU0FBS2xCLGlCQUFMLEdBQXlCMEIsWUFBekI7QUFDQSxTQUFLekIsWUFBTCxHQUFvQixLQUFLNUMsU0FBTCxDQUFlLEtBQUsyQyxpQkFBcEIsRUFBdUM5QixFQUEzRDtBQUVBLFFBQUksS0FBS2IsU0FBTCxDQUFlLEtBQUsyQyxpQkFBcEIsRUFBdUN2QixTQUEzQyxFQUNJLEtBQUtrQixNQUFMLENBQVlMLHFCQUFaLENBQWtDcUMsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOENBLFFBQTlDLENBQXVELENBQXZELEVBQTBEQyxZQUExRCxDQUF1RTVFLEVBQUUsQ0FBQ29DLEtBQTFFLEVBQWlGeUMsTUFBakYsR0FBMEYsS0FBS3hFLFNBQUwsQ0FBZSxLQUFLMkMsaUJBQXBCLEVBQXVDcEIsVUFBakk7QUFFSixTQUFLMkIsWUFBTCxDQUFrQixLQUFLbEQsU0FBTCxDQUFlLEtBQUsyQyxpQkFBcEIsRUFBdUN4QixXQUF6RCxFQUFzRSxJQUF0RTtBQUNBLFNBQUt5QyxhQUFMLENBQW1CQyxRQUFuQixFQUE2QixLQUFLN0QsU0FBTCxDQUFlLEtBQUsyQyxpQkFBcEIsRUFBdUN2QixTQUFwRSxFQUErRTJDLE1BQS9FOztBQUVBLFFBQUlBLE1BQUosRUFBWTtBQUNSLFdBQUtVLHNCQUFMO0FBQ0g7QUFDSixHQW5Kb0I7QUFxSnJCRSxFQUFBQSx3QkFySnFCLG9DQXFKSWQsUUFySkosRUFxSmNRLFlBckpkLEVBcUo0Qk4sTUFySjVCLEVBcUo0QztBQUFBLFFBQWhCQSxNQUFnQjtBQUFoQkEsTUFBQUEsTUFBZ0IsR0FBUCxLQUFPO0FBQUE7O0FBQzdEekUsSUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQSxTQUFLdUQsU0FBTCxHQUFpQmtCLE1BQWpCO0FBQ0EsU0FBS2pCLE9BQUwsR0FBZWUsUUFBZjtBQUNBLFNBQUtyQixVQUFMLEdBQWtCOUMsYUFBYSxDQUFDUSxNQUFoQztBQUNBLFNBQUt5QyxpQkFBTCxHQUF5QjBCLFlBQXpCO0FBQ0EsU0FBS3pCLFlBQUwsR0FBb0IsS0FBSzFDLE1BQUwsQ0FBWSxLQUFLeUMsaUJBQWpCLEVBQW9DOUIsRUFBeEQ7QUFFQSxTQUFLcUMsWUFBTCxDQUFrQixLQUFLaEQsTUFBTCxDQUFZLEtBQUt5QyxpQkFBakIsRUFBb0N4QixXQUF0RCxFQUFtRSxJQUFuRTtBQUVBLFFBQUksS0FBS2pCLE1BQUwsQ0FBWSxLQUFLeUMsaUJBQWpCLEVBQW9DdkIsU0FBeEMsRUFDSSxLQUFLa0IsTUFBTCxDQUFZTCxxQkFBWixDQUFrQ3FDLFFBQWxDLENBQTJDLENBQTNDLEVBQThDQSxRQUE5QyxDQUF1RCxDQUF2RCxFQUEwREMsWUFBMUQsQ0FBdUU1RSxFQUFFLENBQUNvQyxLQUExRSxFQUFpRnlDLE1BQWpGLEdBQTBGLEtBQUt0RSxNQUFMLENBQVksS0FBS3lDLGlCQUFqQixFQUFvQ3BCLFVBQTlIO0FBRUosUUFBSSxLQUFLckIsTUFBTCxDQUFZLEtBQUt5QyxpQkFBakIsRUFBb0N0QixhQUF4QyxFQUNJLEtBQUtpQixNQUFMLENBQVlKLHlCQUFaLENBQXNDb0MsUUFBdEMsQ0FBK0MsQ0FBL0MsRUFBa0RBLFFBQWxELENBQTJELENBQTNELEVBQThEQyxZQUE5RCxDQUEyRTVFLEVBQUUsQ0FBQ29DLEtBQTlFLEVBQXFGeUMsTUFBckYsR0FBOEYsS0FBS3RFLE1BQUwsQ0FBWSxLQUFLeUMsaUJBQWpCLEVBQW9DbkIsZ0JBQWxJO0FBRUosU0FBS29DLGFBQUwsQ0FBbUJDLFFBQW5CLEVBQTZCLEtBQUszRCxNQUFMLENBQVksS0FBS3lDLGlCQUFqQixFQUFvQ3ZCLFNBQWpFLEVBQTRFMkMsTUFBNUUsRUFBbUYsS0FBSzdELE1BQUwsQ0FBWSxLQUFLeUMsaUJBQWpCLEVBQW9DdEIsYUFBdkg7O0FBRUEsUUFBSTBDLE1BQUosRUFBWTtBQUNSLFdBQUtVLHNCQUFMO0FBQ0g7QUFDSixHQTFLb0I7QUE0S3JCRyxFQUFBQSxzQkE1S3FCLGtDQTRLRWYsUUE1S0YsRUE0S1lRLFlBNUtaLEVBNEswQk4sTUE1SzFCLEVBNEswQztBQUFBLFFBQWhCQSxNQUFnQjtBQUFoQkEsTUFBQUEsTUFBZ0IsR0FBUCxLQUFPO0FBQUE7O0FBQzNEdkUsSUFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQSxTQUFLcUQsU0FBTCxHQUFpQmtCLE1BQWpCO0FBQ0EsU0FBS3ZCLFVBQUwsR0FBa0I5QyxhQUFhLENBQUNJLFFBQWhDO0FBQ0EsU0FBSzZDLGlCQUFMLEdBQXlCMEIsWUFBekI7QUFDQSxTQUFLdkIsT0FBTCxHQUFlZSxRQUFmO0FBQ0EsU0FBS2pCLFlBQUwsR0FBb0IsS0FBS0wsU0FBTCxDQUFlLEtBQUtJLGlCQUFwQixFQUF1QzlCLEVBQTNEO0FBRUEsUUFBSSxLQUFLMEIsU0FBTCxDQUFlLEtBQUtJLGlCQUFwQixFQUF1Q3ZCLFNBQTNDLEVBQ0ksS0FBS2tCLE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixLQUFLakMsU0FBTCxDQUFlLEtBQUtJLGlCQUFwQixFQUF1Q3BCLFVBQWpJO0FBRUosUUFBSSxLQUFLZ0IsU0FBTCxDQUFlLEtBQUtJLGlCQUFwQixFQUF1Q3RCLGFBQTNDLEVBQ0ksS0FBS2lCLE1BQUwsQ0FBWUoseUJBQVosQ0FBc0NvQyxRQUF0QyxDQUErQyxDQUEvQyxFQUFrREEsUUFBbEQsQ0FBMkQsQ0FBM0QsRUFBOERDLFlBQTlELENBQTJFNUUsRUFBRSxDQUFDb0MsS0FBOUUsRUFBcUZ5QyxNQUFyRixHQUE4RixLQUFLakMsU0FBTCxDQUFlLEtBQUtJLGlCQUFwQixFQUF1Q25CLGdCQUFySTtBQUVKLFNBQUswQixZQUFMLENBQWtCLEtBQUtYLFNBQUwsQ0FBZSxLQUFLSSxpQkFBcEIsRUFBdUN4QixXQUF6RCxFQUFzRSxJQUF0RTtBQUNBLFNBQUt5QyxhQUFMLENBQW1CQyxRQUFuQixFQUE2QixLQUFLdEIsU0FBTCxDQUFlLEtBQUtJLGlCQUFwQixFQUF1Q3ZCLFNBQXBFLEVBQStFMkMsTUFBL0UsRUFBc0YsS0FBS3hCLFNBQUwsQ0FBZSxLQUFLSSxpQkFBcEIsRUFBdUN0QixhQUE3SDs7QUFFQSxRQUFJMEMsTUFBSixFQUFZO0FBQ1IsV0FBS1Usc0JBQUw7QUFDSDtBQUNKLEdBaE1vQjtBQWtNckJJLEVBQUFBLFdBbE1xQix1QkFrTVRoQixRQWxNUyxFQWtNQ2lCLE1BbE1ELEVBa01TZixNQWxNVCxFQWtNeUI7QUFBQSxRQUFoQkEsTUFBZ0I7QUFBaEJBLE1BQUFBLE1BQWdCLEdBQVAsS0FBTztBQUFBOztBQUMxQyxTQUFLbEIsU0FBTCxHQUFpQmtCLE1BQWpCO0FBQ0EsU0FBS2pCLE9BQUwsR0FBZWUsUUFBZjtBQUNBLFNBQUtyQixVQUFMLEdBQWtCOUMsYUFBYSxDQUFDTyxNQUFoQztBQUNBLFNBQUtpRCxZQUFMLENBQWtCLDJEQUFsQixFQUErRSxJQUEvRTtBQUNBLFNBQUtaLE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixTQUExRjtBQUNBLFNBQUtaLGFBQUwsQ0FBbUJDLFFBQW5CLEVBQTZCLElBQTdCLEVBQW1DRSxNQUFuQzs7QUFFQSxRQUFJQSxNQUFKLEVBQVk7QUFDUixXQUFLZ0IscUJBQUwsQ0FBMkIsS0FBM0IsRUFBa0MsSUFBbEM7QUFDSDtBQUNKLEdBN01vQjtBQStNckJDLEVBQUFBLFdBL01xQix1QkErTVRuQixRQS9NUyxFQStNQ2lCLE1BL01ELEVBK01TO0FBQzFCLFNBQUs1QixZQUFMLENBQWtCLGtDQUFsQixFQUFzRCxJQUF0RDtBQUNBLFNBQUsrQixtQkFBTDtBQUVBLFNBQUtyQixhQUFMLENBQW1CQyxRQUFuQixFQUE2QixLQUE3QjtBQUNILEdBcE5vQjtBQXNOckJxQixFQUFBQSxpQkF0TnFCLDZCQXNOSHJCLFFBdE5HLEVBc05PaUIsTUF0TlAsRUFzTmU7QUFDaEMsU0FBSzVCLFlBQUwsQ0FBa0Isd0NBQWxCLEVBQTRELElBQTVEO0FBQ0EsU0FBS2lDLHlCQUFMO0FBRUEsU0FBS3ZCLGFBQUwsQ0FBbUJDLFFBQW5CLEVBQTZCLEtBQTdCO0FBQ0gsR0EzTm9CO0FBNk5yQnVCLEVBQUFBLGdCQTdOcUIsNEJBNk5KdkIsUUE3TkksRUE2Tk1pQixNQTdOTixFQTZOY2YsTUE3TmQsRUE2TjhCO0FBQUEsUUFBaEJBLE1BQWdCO0FBQWhCQSxNQUFBQSxNQUFnQixHQUFQLEtBQU87QUFBQTs7QUFDL0MsU0FBS2xCLFNBQUwsR0FBaUJrQixNQUFqQjtBQUNBLFNBQUtqQixPQUFMLEdBQWVlLFFBQWY7QUFDQSxTQUFLckIsVUFBTCxHQUFrQjlDLGFBQWEsQ0FBQ1csV0FBaEM7QUFDQSxTQUFLNkMsWUFBTCxDQUFrQixpSEFBbEIsRUFBcUksSUFBckk7QUFDQSxTQUFLWixNQUFMLENBQVlMLHFCQUFaLENBQWtDcUMsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOENBLFFBQTlDLENBQXVELENBQXZELEVBQTBEQyxZQUExRCxDQUF1RTVFLEVBQUUsQ0FBQ29DLEtBQTFFLEVBQWlGeUMsTUFBakYsR0FBMEYsU0FBMUY7QUFDQSxTQUFLWixhQUFMLENBQW1CQyxRQUFuQixFQUE2QixJQUE3QixFQUFtQ0UsTUFBbkM7O0FBQ0EsUUFBSUEsTUFBSixFQUFZO0FBQ1IsV0FBS2dCLHFCQUFMLENBQTJCLEtBQTNCLEVBQWtDLElBQWxDO0FBQ0g7QUFDSixHQXZPb0I7QUF5T3JCTSxFQUFBQSxTQXpPcUIscUJBeU9YeEIsUUF6T1csRUF5T0RpQixNQXpPQyxFQXlPT2YsTUF6T1AsRUF5T3VCO0FBQUEsUUFBaEJBLE1BQWdCO0FBQWhCQSxNQUFBQSxNQUFnQixHQUFQLEtBQU87QUFBQTs7QUFDeEMsU0FBS2xCLFNBQUwsR0FBaUJrQixNQUFqQjtBQUNBLFNBQUtqQixPQUFMLEdBQWVlLFFBQWY7QUFDQSxTQUFLckIsVUFBTCxHQUFrQjlDLGFBQWEsQ0FBQ1ksSUFBaEM7QUFDQSxTQUFLNEMsWUFBTCxDQUFrQix5REFBbEIsRUFBNkUsSUFBN0U7QUFDQSxTQUFLWixNQUFMLENBQVlMLHFCQUFaLENBQWtDcUMsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOENBLFFBQTlDLENBQXVELENBQXZELEVBQTBEQyxZQUExRCxDQUF1RTVFLEVBQUUsQ0FBQ29DLEtBQTFFLEVBQWlGeUMsTUFBakYsR0FBMEYsU0FBMUY7QUFDQSxTQUFLWixhQUFMLENBQW1CQyxRQUFuQixFQUE2QixJQUE3QixFQUFtQ0UsTUFBbkM7O0FBQ0EsUUFBSUEsTUFBSixFQUFZO0FBQ1IsV0FBS2dCLHFCQUFMLENBQTJCLEtBQTNCLEVBQWtDLElBQWxDO0FBQ0g7QUFDSixHQW5Qb0I7QUFxUHJCTyxFQUFBQSxjQXJQcUIsMEJBcVBOekIsUUFyUE0sRUFxUElpQixNQXJQSixFQXFQWWYsTUFyUFosRUFxUDRCO0FBQUEsUUFBaEJBLE1BQWdCO0FBQWhCQSxNQUFBQSxNQUFnQixHQUFQLEtBQU87QUFBQTs7QUFDN0MsU0FBS2xCLFNBQUwsR0FBaUJrQixNQUFqQjtBQUNBLFNBQUtqQixPQUFMLEdBQWVlLFFBQWY7QUFDQSxTQUFLckIsVUFBTCxHQUFrQjlDLGFBQWEsQ0FBQ2EsU0FBaEM7QUFDQSxTQUFLMkMsWUFBTCxDQUFrQixnRUFBbEIsRUFBb0YsSUFBcEY7QUFDQSxTQUFLWixNQUFMLENBQVlMLHFCQUFaLENBQWtDcUMsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOENBLFFBQTlDLENBQXVELENBQXZELEVBQTBEQyxZQUExRCxDQUF1RTVFLEVBQUUsQ0FBQ29DLEtBQTFFLEVBQWlGeUMsTUFBakYsR0FBMEYsU0FBMUY7QUFDQSxTQUFLWixhQUFMLENBQW1CQyxRQUFuQixFQUE2QixJQUE3QixFQUFtQ0UsTUFBbkM7O0FBQ0EsUUFBSUEsTUFBSixFQUFZO0FBQ1IsV0FBS2dCLHFCQUFMLENBQTJCLEtBQTNCLEVBQWtDLElBQWxDO0FBQ0g7QUFDSixHQS9Qb0I7QUFpUXJCUSxFQUFBQSxpQkFqUXFCLDZCQWlRSDFCLFFBalFHLEVBaVFPaUIsTUFqUVAsRUFpUWVmLE1BalFmLEVBaVErQjtBQUFBOztBQUFBLFFBQWhCQSxNQUFnQjtBQUFoQkEsTUFBQUEsTUFBZ0IsR0FBUCxLQUFPO0FBQUE7O0FBQ2hELFNBQUtsQixTQUFMLEdBQWlCa0IsTUFBakI7QUFDQSxTQUFLakIsT0FBTCxHQUFlZSxRQUFmO0FBQ0EsU0FBS3JCLFVBQUwsR0FBa0I5QyxhQUFhLENBQUNjLFlBQWhDO0FBQ0EsU0FBSzBDLFlBQUwsQ0FBa0Isb0NBQWxCLEVBQXdELElBQXhEO0FBQ0EsU0FBS1osTUFBTCxDQUFZTCxxQkFBWixDQUFrQ3FDLFFBQWxDLENBQTJDLENBQTNDLEVBQThDQSxRQUE5QyxDQUF1RCxDQUF2RCxFQUEwREMsWUFBMUQsQ0FBdUU1RSxFQUFFLENBQUNvQyxLQUExRSxFQUFpRnlDLE1BQWpGLEdBQTBGLFNBQTFGO0FBQ0EsU0FBS1osYUFBTCxDQUFtQkMsUUFBbkIsRUFBNkIsSUFBN0IsRUFBbUNFLE1BQW5DOztBQUNBLFFBQUlBLE1BQUosRUFBWTtBQUNSRyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFFBQUEsTUFBSSxDQUFDTyxzQkFBTDtBQUNILE9BRlMsRUFFUCxJQUZPLENBQVY7QUFJSDtBQUNKLEdBOVFvQjtBQWdSckJ2QixFQUFBQSxZQUFZLEVBQUUsc0JBQVVzQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUNyQyxRQUFJQSxNQUFKLEVBQVk7QUFDUixXQUFLbkQsTUFBTCxDQUFZVixTQUFaLENBQXNCcUMsTUFBdEIsR0FBK0IsSUFBL0I7QUFDQSxXQUFLM0IsTUFBTCxDQUFZUixVQUFaLENBQXVCMEMsTUFBdkIsR0FBZ0NnQixPQUFoQztBQUNILEtBSEQsTUFHTztBQUNILFdBQUtsRCxNQUFMLENBQVlSLFVBQVosQ0FBdUIwQyxNQUF2QixHQUFnQyxFQUFoQztBQUNBLFdBQUtsQyxNQUFMLENBQVlWLFNBQVosQ0FBc0JxQyxNQUF0QixHQUErQixLQUEvQjtBQUNIO0FBQ0osR0F4Um9CO0FBMFJyQkUsRUFBQUEsWUExUnFCLDBCQTBSTjtBQUNYLFNBQUtqQixZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEtBQXRCO0FBQ0E3RCxJQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvREMsZ0JBQXBEO0FBQ0F2RyxJQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvREUsc0JBQXBELEdBSFcsQ0FLWDtBQUNBO0FBQ0E7QUFDSCxHQWxTb0I7QUFvU3JCQyxFQUFBQSx1QkFwU3FCLHFDQXFTckI7QUFDSSxTQUFLckIsc0JBQUwsQ0FBNEIsSUFBNUIsRUFBaUMsQ0FBakM7QUFDSCxHQXZTb0I7QUF5U3JCQSxFQUFBQSxzQkF6U3FCLGtDQXlTRXNCLEtBelNGLEVBeVNhQyxLQXpTYixFQXlTc0I7QUFBQSxRQUFwQkQsS0FBb0I7QUFBcEJBLE1BQUFBLEtBQW9CLEdBQWQsSUFBYztBQUFBOztBQUFBLFFBQVRDLEtBQVM7QUFBVEEsTUFBQUEsS0FBUyxHQUFILENBQUc7QUFBQTs7QUFDdkMsUUFBSSxLQUFLeEQsVUFBTCxJQUFtQjlDLGFBQWEsQ0FBQ0ssV0FBckMsRUFBa0Q7QUFDOUMsV0FBS2tHLDRCQUFMLENBQWtDLEtBQUtyRCxZQUF2QztBQUNILEtBRkQsTUFFTyxJQUFJLEtBQUtKLFVBQUwsSUFBbUI5QyxhQUFhLENBQUNRLE1BQXJDLEVBQTZDO0FBQ2hELFVBQUdaLFVBQVUsSUFBRSxJQUFmLEVBQ0ksS0FBSzRHLHVCQUFMLENBQTZCLEtBQUt0RCxZQUFsQyxFQUFnRCxJQUFoRCxFQUFzRG9ELEtBQXRELEVBREosS0FHSSxLQUFLRSx1QkFBTCxDQUE2QixLQUFLdEQsWUFBbEMsRUFBK0MsS0FBL0MsRUFBcURvRCxLQUFyRDtBQUNQLEtBTE0sTUFNRixJQUFJLEtBQUt4RCxVQUFMLElBQW1COUMsYUFBYSxDQUFDTSxTQUFyQyxFQUFnRDtBQUNqRCxVQUFHVCxhQUFhLElBQUUsSUFBbEIsRUFDSSxLQUFLNEcsMEJBQUwsQ0FBZ0MsS0FBS3ZELFlBQXJDLEVBQW1ELElBQW5ELEVBQXlEb0QsS0FBekQsRUFESixLQUdJLEtBQUtHLDBCQUFMLENBQWdDLEtBQUt2RCxZQUFyQyxFQUFtRCxLQUFuRCxFQUEwRG9ELEtBQTFEO0FBQ1AsS0FMSSxNQU1BLElBQUksS0FBS3hELFVBQUwsSUFBbUI5QyxhQUFhLENBQUNJLFFBQXJDLEVBQStDO0FBQ2hELFVBQUdOLFlBQVksSUFBRSxJQUFqQixFQUNJLEtBQUs0RyxxQkFBTCxDQUEyQixLQUFLeEQsWUFBaEMsRUFBOEMsSUFBOUMsRUFBb0RvRCxLQUFwRCxFQURKLEtBR0ksS0FBS0kscUJBQUwsQ0FBMkIsS0FBS3hELFlBQWhDLEVBQThDLEtBQTlDLEVBQXFEb0QsS0FBckQ7QUFDUCxLQUxJLE1BTUEsSUFBSSxLQUFLeEQsVUFBTCxJQUFtQjlDLGFBQWEsQ0FBQ1ksSUFBckMsRUFBMkM7QUFDNUMsV0FBSytGLGlCQUFMO0FBQ0gsS0FGSSxNQUdBLElBQUksS0FBSzdELFVBQUwsSUFBbUI5QyxhQUFhLENBQUNPLE1BQXJDLEVBQTZDO0FBQzlDLFdBQUtxRyxtQkFBTDtBQUNILEtBRkksTUFHQSxJQUFJLEtBQUs5RCxVQUFMLElBQW1COUMsYUFBYSxDQUFDYSxTQUFyQyxFQUFnRDtBQUNqRCxXQUFLZ0csc0JBQUw7QUFDSCxLQUZJLE1BR0EsSUFBSSxLQUFLL0QsVUFBTCxJQUFtQjlDLGFBQWEsQ0FBQ1csV0FBckMsRUFBa0Q7QUFDbkQsV0FBS21HLHdCQUFMO0FBQ0gsS0FGSSxNQUdBLElBQUksS0FBS2hFLFVBQUwsSUFBbUI5QyxhQUFhLENBQUNjLFlBQXJDLEVBQW1EO0FBQ3BELFdBQUtpRyxtQkFBTDtBQUNIO0FBQ0osR0E3VW9CO0FBK1VyQkMsRUFBQUEsU0EvVXFCLHVCQStVVDtBQUNSLFFBQUlDLFVBQVUsR0FBRyxLQUFqQjtBQUNBLFFBQUlDLGNBQWMsR0FBRyxDQUFyQjs7QUFFQSxRQUFJQyxRQUFRLEdBQUd4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFmOztBQUNBLFFBQUltQixZQUFZLEdBQUd6SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRG9CLGFBQXBELEVBQW5COztBQUVBLFNBQUssSUFBSUMsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdILFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NJLFlBQXRDLENBQW1EQyxNQUEvRSxFQUF1RkgsS0FBSyxFQUE1RixFQUFnRztBQUU1RixVQUFJSCxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtREYsS0FBbkQsRUFBMERJLFNBQTlELEVBQXlFO0FBQ3JFVCxRQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBQyxRQUFBQSxjQUFjLEdBQUdJLEtBQWpCO0FBQ0E7QUFDSDtBQUNKOztBQUVELFFBQUlLLEdBQUcsR0FBRyxDQUFDLENBQVg7QUFDQUEsSUFBQUEsR0FBRyxHQUFHVixVQUFVLElBQUksSUFBZCxHQUFxQixDQUFyQixHQUF5QixDQUEvQjtBQUNBLFFBQUlXLE1BQU0sR0FBRzNILEVBQUUsQ0FBQzRILEVBQUgsQ0FBTUYsR0FBTixFQUFXVCxjQUFYLENBQWI7QUFDQSxXQUFPVSxNQUFQO0FBQ0gsR0FuV29CO0FBcVdyQnZDLEVBQUFBLHFCQXJXcUIsaUNBcVdDeUMsSUFyV0QsRUFxV09DLEtBcldQLEVBcVdjO0FBQUE7O0FBQy9CLFFBQUlaLFFBQVEsR0FBR3hILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWY7O0FBRUEsUUFBSSxLQUFLOUMsU0FBVCxFQUFvQjtBQUNoQjZFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSCxJQUFaOztBQUNBLFVBQUlJLE1BQU0sR0FBRyxLQUFLdEUsU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckIsQ0FBYjs7QUFDQVksTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixRQUFBLE1BQUksQ0FBQ2hCLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsS0FBdEI7O0FBQ0EyRCxRQUFBQSxRQUFRLENBQUNqQixnQkFBVDs7QUFDQWlCLFFBQUFBLFFBQVEsQ0FBQ2hCLHNCQUFUO0FBQ0gsT0FKUyxFQUlOK0IsTUFKTSxDQUFWO0FBS0gsS0FSRCxNQVNLO0FBQ0R2SSxNQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDbUMscUJBQWxDLEdBQTBEQyxTQUExRCxDQUFvRU4sSUFBcEUsRUFBMEVDLEtBQTFFO0FBQ0EsV0FBS3ZFLFlBQUwsQ0FBa0IsRUFBbEIsRUFBc0IsS0FBdEI7QUFFQWdCLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsUUFBQSxNQUFJLENBQUNoQixZQUFMLENBQWtCLEVBQWxCLEVBQXNCLEtBQXRCOztBQUNBMkQsUUFBQUEsUUFBUSxDQUFDakIsZ0JBQVQ7O0FBQ0FpQixRQUFBQSxRQUFRLENBQUNoQixzQkFBVDtBQUNILE9BSlMsRUFJTjRCLEtBQUssR0FBRyxJQUpGLENBQVY7QUFLSDtBQUNKLEdBM1hvQjtBQTZYckJ4QixFQUFBQSw0QkE3WHFCLHdDQTZYUThCLEdBN1hSLEVBNlhhQyxjQTdYYixFQTZYb0NoQyxLQTdYcEMsRUE2WDZDO0FBQUEsUUFBaENnQyxjQUFnQztBQUFoQ0EsTUFBQUEsY0FBZ0MsR0FBZixLQUFlO0FBQUE7O0FBQUEsUUFBVGhDLEtBQVM7QUFBVEEsTUFBQUEsS0FBUyxHQUFILENBQUc7QUFBQTs7QUFDOUQsUUFBSWlDLEtBQUssR0FBR0MsUUFBUSxDQUFDSCxHQUFELENBQXBCO0FBQ0FFLElBQUFBLEtBQUssR0FBR0EsS0FBSyxHQUFHLENBQWhCOztBQUVBLFlBQVFGLEdBQVI7QUFDSSxXQUFLLEdBQUw7QUFBUztBQUNMTCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLNUgsV0FBTCxDQUFpQmtJLEtBQWpCLEVBQXdCOUcsV0FBcEM7O0FBQ0EsWUFBSTBGLFFBQVEsR0FBR3hILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWY7O0FBQ0EsWUFBSW1CLFlBQVksR0FBR3pILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9Eb0IsYUFBcEQsRUFBbkI7O0FBQ0EsWUFBSW9CLE9BQU8sR0FBRyxLQUFLekIsU0FBTCxFQUFkOztBQUNBLFlBQUkwQixXQUFXLEdBQUdELE9BQU8sQ0FBQ0UsQ0FBMUI7QUFDQSxZQUFJekIsY0FBYyxHQUFHdUIsT0FBTyxDQUFDRyxDQUE3Qjs7QUFFQSxZQUFJRixXQUFXLElBQUksQ0FBbkIsRUFBc0I7QUFDdEI7QUFDSXZCLFlBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NJLFlBQXRDLENBQW1ETixjQUFuRCxFQUFtRTJCLFVBQW5FLEdBQWdGMUIsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ0ksWUFBdEMsQ0FBbUROLGNBQW5ELEVBQW1FMkIsVUFBbkUsR0FBZ0YsS0FBaEs7O0FBQ0EsZ0JBQUkxQixRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtRE4sY0FBbkQsRUFBbUUyQixVQUFuRSxJQUFpRixDQUFyRixFQUF3RjtBQUNwRjFCLGNBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NJLFlBQXRDLENBQW1ETixjQUFuRCxFQUFtRTJCLFVBQW5FLEdBQWdGLENBQWhGO0FBQ0ExQixjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtRE4sY0FBbkQsRUFBbUVRLFNBQW5FLEdBQStFLEtBQS9FO0FBQ0g7O0FBRUQsaUJBQUtyQyxxQkFBTCxDQUEyQiwyQ0FBM0IsRUFBd0UsSUFBeEU7QUFDSCxXQVRELE1BVUs7QUFDRCxlQUFLQSxxQkFBTCxDQUEyQixrREFBM0IsRUFBK0UsSUFBL0U7QUFDSDs7QUFFRDs7QUFDSixXQUFLLEdBQUw7QUFBVTtBQUNOMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzVILFdBQUwsQ0FBaUJrSSxLQUFqQixFQUF3QjlHLFdBQXBDOztBQUNBLFlBQUkwRixRQUFRLEdBQUd4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFmOztBQUNBLFlBQUltQixZQUFZLEdBQUd6SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRG9CLGFBQXBELEVBQW5COztBQUVBLFlBQUlGLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0MwQixZQUExQyxFQUF3RDtBQUNwRCxlQUFLekQscUJBQUwsQ0FBMkIsb0RBQTNCLEVBQWlGLElBQWpGO0FBQ0gsU0FGRCxNQUdLO0FBQ0Q4QixVQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDMEIsWUFBdEMsR0FBcUQsSUFBckQ7QUFDQSxlQUFLekQscUJBQUwsQ0FBMkIsdUNBQTNCLEVBQW9FLElBQXBFO0FBQ0g7O0FBRUQ7O0FBQ0osV0FBSyxHQUFMO0FBQ0kyQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLNUgsV0FBTCxDQUFpQmtJLEtBQWpCLEVBQXdCOUcsV0FBcEM7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFDSXVHLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1SCxXQUFMLENBQWlCa0ksS0FBakIsRUFBd0I5RyxXQUFwQztBQUNBOztBQUNKLFdBQUssR0FBTDtBQUNJdUcsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzVILFdBQUwsQ0FBaUJrSSxLQUFqQixFQUF3QjlHLFdBQXBDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0l1RyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLNUgsV0FBTCxDQUFpQmtJLEtBQWpCLEVBQXdCOUcsV0FBcEM7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFDSXVHLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1SCxXQUFMLENBQWlCa0ksS0FBakIsRUFBd0I5RyxXQUFwQztBQUNBOztBQUNKLFdBQUssR0FBTDtBQUFTO0FBQ0x1RyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLNUgsV0FBTCxDQUFpQmtJLEtBQWpCLEVBQXdCOUcsV0FBcEM7O0FBQ0EsWUFBSTBGLFFBQVEsR0FBR3hILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWY7O0FBQ0EsWUFBSW1CLFlBQVksR0FBR3pILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9Eb0IsYUFBcEQsRUFBbkI7O0FBRUFGLFFBQUFBLFFBQVEsQ0FBQzRCLHVCQUFULENBQWlDLElBQWpDOztBQUNBLGFBQUsxRCxxQkFBTCxDQUEyQixpREFBM0IsRUFBOEUsSUFBOUU7QUFFQTs7QUFDSixXQUFLLEdBQUw7QUFDSTJDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1SCxXQUFMLENBQWlCa0ksS0FBakIsRUFBd0I5RyxXQUFwQztBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJdUcsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzVILFdBQUwsQ0FBaUJrSSxLQUFqQixFQUF3QjlHLFdBQXBDO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQVU7QUFDTnVHLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1SCxXQUFMLENBQWlCa0ksS0FBakIsRUFBd0I5RyxXQUFwQzs7QUFDQSxZQUFJMEYsUUFBUSxHQUFHeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBZjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFHekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFuQjs7QUFFQSxZQUFJMkIsV0FBVyxHQUFHN0IsUUFBUSxDQUFDOEIsWUFBVCxFQUFsQjs7QUFDQSxZQUFJQyxXQUFXLEdBQUcvQixRQUFRLENBQUM4QixZQUFULEVBQWxCLENBTkosQ0FRSTtBQUNBOzs7QUFFQSxZQUFJRSxXQUFXLEdBQUdILFdBQVcsR0FBR0UsV0FBaEM7O0FBRUEsWUFBSUMsV0FBVyxJQUFJLEVBQW5CLEVBQXVCO0FBQ25CLGNBQUlDLEtBQUssR0FBR3pKLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NxRCx5QkFBbEMsR0FBOERDLGVBQTlELEVBQVo7O0FBQ0EsY0FBSUMsT0FBTyxHQUFHLENBQWQ7O0FBQ0EsZUFBSyxJQUFJakMsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdILFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkUsTUFBcEQsRUFBNERILEtBQUssRUFBakUsRUFBcUU7QUFDakVpQyxZQUFBQSxPQUFPLEdBQUdBLE9BQU8sR0FBR3BDLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkQsS0FBeEIsRUFBK0JrQyxlQUFuRDtBQUNIOztBQUVEckMsVUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQThDRixPQUE5QztBQUNBLGVBQUtsRSxxQkFBTCxDQUEyQixvQkFBb0IyRCxXQUFwQixHQUFrQyxJQUFsQyxHQUF5QyxJQUF6QyxHQUN2QixpQkFEdUIsR0FDSEUsV0FERyxHQUNXLElBRFgsR0FDa0IsSUFEbEIsR0FFdkIsU0FGdUIsR0FFWEMsV0FGVyxHQUVHLElBRkgsR0FFVSxJQUZWLEdBRWlCLElBRmpCLEdBR3ZCLFVBSHVCLEdBR1ZJLE9BSFUsR0FHQSxzRUFIM0IsRUFJTSxJQUpOOztBQU9BLGNBQUlILEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ1osZ0JBQUlNLFlBQVksR0FBRy9KLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NxRCx5QkFBbEMsR0FBOERNLFlBQTlELEdBQTZFQyxpQkFBN0UsRUFBbkI7O0FBRUEsaUJBQUssSUFBSXRDLE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHb0MsWUFBWSxDQUFDakMsTUFBekMsRUFBaURILE9BQUssRUFBdEQsRUFBMEQ7QUFDdERvQyxjQUFBQSxZQUFZLENBQUNwQyxPQUFELENBQVosQ0FBb0J1QyxnQkFBcEIsQ0FBcUNDLGlCQUFyQyxDQUF1RE4sZUFBdkQsR0FBeUUsQ0FBekU7QUFDSDtBQUNKO0FBQ0osU0F0QkQsTUF1Qks7QUFDRCxlQUFLbkUscUJBQUwsQ0FBMkIsb0JBQW9CMkQsV0FBcEIsR0FBa0MsSUFBbEMsR0FBeUMsSUFBekMsR0FDdkIsaUJBRHVCLEdBQ0hFLFdBREcsR0FDVyxJQURYLEdBQ2tCLElBRGxCLEdBRXZCLFNBRnVCLEdBRVhDLFdBRlcsR0FFRyxJQUZILEdBRVUsSUFGVixHQUVpQixJQUZqQixHQUd2Qix5Q0FISixFQUlNLElBSk47QUFLSDs7QUFFRDs7QUFDSixXQUFLLElBQUw7QUFDSW5CLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1SCxXQUFMLENBQWlCa0ksS0FBakIsRUFBd0I5RyxXQUFwQztBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJdUcsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzVILFdBQUwsQ0FBaUJrSSxLQUFqQixFQUF3QjlHLFdBQXBDO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0l1RyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLNUgsV0FBTCxDQUFpQmtJLEtBQWpCLEVBQXdCOUcsV0FBcEM7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSXVHLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1SCxXQUFMLENBQWlCa0ksS0FBakIsRUFBd0I5RyxXQUFwQztBQUNBOztBQUNKO0FBQ0k7QUE5SFI7QUFpSUgsR0FsZ0JvQjtBQW9nQnJCZ0YsRUFBQUEsMEJBcGdCcUIsc0NBb2dCTTRCLEdBcGdCTixFQW9nQldDLGNBcGdCWCxFQW9nQmtDaEMsS0FwZ0JsQyxFQW9nQjJDO0FBQUEsUUFBaENnQyxjQUFnQztBQUFoQ0EsTUFBQUEsY0FBZ0MsR0FBZixLQUFlO0FBQUE7O0FBQUEsUUFBVGhDLEtBQVM7QUFBVEEsTUFBQUEsS0FBUyxHQUFILENBQUc7QUFBQTs7QUFDNUQsUUFBSWlDLEtBQUssR0FBR0MsUUFBUSxDQUFDSCxHQUFELENBQXBCO0FBQ0FFLElBQUFBLEtBQUssR0FBR0EsS0FBSyxHQUFHLENBQWhCOztBQUVBLFlBQVFGLEdBQVI7QUFDSSxXQUFLLEdBQUw7QUFBUztBQUNMTCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLM0gsU0FBTCxDQUFlaUksS0FBZixFQUFzQjlHLFdBQWxDOztBQUNBLFlBQUkwRixRQUFRLEdBQUd4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFmOztBQUNBLFlBQUk4RCxXQUFXLEdBQUc1QyxRQUFRLENBQUM2QyxxQkFBVCxFQUFsQjs7QUFDQW5LLFFBQUFBLGFBQWEsR0FBRyxJQUFoQjtBQUNBLFlBQUlrSyxXQUFXLEdBQUcsQ0FBbEIsRUFDSSxLQUFLMUUscUJBQUwsQ0FBMkIsNkNBQTZDMEUsV0FBeEUsRUFBcUYsSUFBckYsRUFESixLQUdJLEtBQUsxRSxxQkFBTCxDQUEyQixxQ0FBM0IsRUFBa0UsSUFBbEU7QUFDSjs7QUFDSixXQUFLLEdBQUw7QUFBUztBQUNMMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzNILFNBQUwsQ0FBZWlJLEtBQWYsRUFBc0I5RyxXQUFsQzs7QUFDQSxZQUFJMEYsUUFBUSxHQUFHeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBZjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFHekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFuQjs7QUFDQSxZQUFJNEMsZ0JBQWdCLEdBQUU5QyxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDb0MsZUFBNUQ7O0FBQ0EsWUFBSVUsV0FBSjs7QUFDQSxZQUFJQyxXQUFXLEdBQUcsR0FBbEI7O0FBQ0EsWUFBSUYsZ0JBQWdCLElBQUksQ0FBeEIsRUFBMkI7QUFDdkIsZUFBSzVFLHFCQUFMLENBQTJCLHFDQUEzQixFQUFrRSxJQUFsRTtBQUNBO0FBQ0g7O0FBRUQsWUFBSWlELGNBQUosRUFBb0I7QUFDaEI0QixVQUFBQSxXQUFXLEdBQUcvQyxRQUFRLENBQUM4QixZQUFULEVBQWQ7QUFFQXBKLFVBQUFBLGFBQWEsR0FBRztBQUFFdUssWUFBQUEsSUFBSSxFQUFFO0FBQUVDLGNBQUFBLE1BQU0sRUFBRUg7QUFBVjtBQUFSLFdBQWhCOztBQUVBLGNBQUksQ0FBQyxLQUFLL0csU0FBVixFQUFxQjtBQUVqQixnQkFBSStHLFdBQVcsSUFBSSxDQUFuQixFQUNBO0FBQ0ksbUJBQUsxRyxZQUFMLENBQWtCLE9BQU8sSUFBUCxHQUFjLHFCQUFkLEdBQXNDMEcsV0FBdEMsR0FBb0QsSUFBcEQsR0FBMkQsSUFBM0QsR0FDbEIscUdBREEsRUFDdUcsSUFEdkc7QUFHQSxtQkFBS3RILE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixNQUExRjtBQUVILGFBUEQsTUFRSyxJQUFJb0YsV0FBVyxJQUFJLENBQW5CLEVBQ0w7QUFDSSxtQkFBSzFHLFlBQUwsQ0FBa0IsT0FBTyxJQUFQLEdBQWMscUJBQWQsR0FBc0MwRyxXQUF0QyxHQUFvRCxJQUFwRCxHQUEyRCxJQUEzRCxHQUNsQiwrR0FEQSxFQUNpSCxJQURqSDtBQUdBLG1CQUFLdEgsTUFBTCxDQUFZTCxxQkFBWixDQUFrQ3FDLFFBQWxDLENBQTJDLENBQTNDLEVBQThDQSxRQUE5QyxDQUF1RCxDQUF2RCxFQUEwREMsWUFBMUQsQ0FBdUU1RSxFQUFFLENBQUNvQyxLQUExRSxFQUFpRnlDLE1BQWpGLEdBQTBGLGdCQUExRjtBQUNIOztBQUVELGlCQUFLWixhQUFMLENBQW1CLEtBQUtkLE9BQXhCLEVBQWlDLElBQWpDLEVBQXVDLEtBQUtELFNBQTVDO0FBQ0gsV0FuQkQsTUFvQkE7QUFDSSxpQkFBSzRCLHNCQUFMO0FBQ0g7QUFDSixTQTVCRCxNQThCQTtBQUNJbUYsVUFBQUEsV0FBVyxHQUFHckssYUFBYSxDQUFDdUssSUFBZCxDQUFtQkMsTUFBakM7O0FBRUEsY0FBSUgsV0FBVyxJQUFJLENBQW5CLEVBQXNCO0FBQ2xCLGdCQUFJSCxXQUFXLEdBQUc1QyxRQUFRLENBQUM2QyxxQkFBVCxFQUFsQjs7QUFFQSxnQkFBSUQsV0FBVyxHQUFHLENBQWxCLEVBQ0ksS0FBSzFFLHFCQUFMLENBQTJCLDZDQUE2QzBFLFdBQXhFLEVBQXFGLElBQXJGLEVBREosS0FHSSxLQUFLMUUscUJBQUwsQ0FBMkIscUNBQTNCLEVBQWtFLElBQWxFO0FBRUp4RixZQUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFDSCxXQVRELE1BU00sSUFBSXFLLFdBQVcsSUFBSSxDQUFuQixFQUFzQjtBQUV4QixnQkFBSXpCLE9BQU8sR0FBSXdCLGdCQUFnQixHQUFHRSxXQUFuQixHQUFpQyxHQUFsQyxHQUF5Q0YsZ0JBQXZEOztBQUNBOUMsWUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ29DLGVBQXRDLEdBQXdELENBQXhEO0FBQ0FyQyxZQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOENoQixPQUE5QztBQUVBLGlCQUFLcEQscUJBQUwsQ0FBMkIsc0JBQXNCb0QsT0FBdEIsR0FBOEIsc0NBQXpELEVBQWlHLElBQWpHO0FBQ0E1SSxZQUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFDSDtBQUVKOztBQUNEOztBQUNKLFdBQUssR0FBTDtBQUFTO0FBQ0xtSSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLM0gsU0FBTCxDQUFlaUksS0FBZixFQUFzQjlHLFdBQWxDOztBQUNBLFlBQUkwRixRQUFRLEdBQUd4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFmOztBQUNBLFlBQUltQixZQUFZLEdBQUd6SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRG9CLGFBQXBELEVBQW5COztBQUNBLFlBQUk0QyxnQkFBZ0IsR0FBRzlDLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NvQyxlQUE3RDtBQUNBLFlBQUljLGFBQWEsR0FBR25ELFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0MwQixZQUExRDs7QUFDQSxZQUFJeUIsZUFBZSxHQUFHcEQsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ29ELGVBQXRDLEdBQXdEckQsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FELG9CQUFwSDs7QUFDQSxZQUFJQyxtQkFBbUIsR0FBRyxLQUExQjtBQUNBLFlBQUlQLFdBQVcsR0FBRyxJQUFsQjs7QUFDQSxZQUFJUSxZQUFZLEdBQUdSLFdBQVcsR0FBR0ksZUFBakM7O0FBQ0EsWUFBSWpDLGNBQUosRUFDQTtBQUNJLGNBQUkyQixnQkFBZ0IsR0FBRyxDQUF2QixFQUNJUyxtQkFBbUIsR0FBRyxJQUF0QjtBQUVKLGNBQUlKLGFBQUosRUFDS0ssWUFBWSxHQUFHLENBQWY7QUFFTDlLLFVBQUFBLGFBQWEsR0FBRztBQUFFdUssWUFBQUEsSUFBSSxFQUFFO0FBQUVDLGNBQUFBLE1BQU0sRUFBRU07QUFBVjtBQUFSLFdBQWhCOztBQUVBLGNBQUksQ0FBQyxLQUFLeEgsU0FBVixFQUFxQjtBQUNqQixpQkFBS0ssWUFBTCxDQUFrQix5QkFBeUJ5RyxnQkFBekIsR0FBNEMsSUFBNUMsR0FBbUQsSUFBbkQsR0FDbEIsaUJBRGtCLEdBQ0VLLGFBREYsR0FDa0IsSUFEbEIsR0FDeUIsSUFEekIsR0FFbEIsNkJBRmtCLEdBRWNDLGVBRmQsR0FFZ0MsSUFGaEMsR0FFdUMsSUFGdkMsR0FHbEIsU0FIa0IsR0FHUkEsZUFIUSxHQUdRLEtBSFIsR0FHY0osV0FIZCxHQUcwQixNQUgxQixHQUdpQ1EsWUFIbkQsRUFHaUUsSUFIakU7QUFLQSxpQkFBSy9ILE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixNQUExRjtBQUVBLGlCQUFLWixhQUFMLENBQW1CLEtBQUtkLE9BQXhCLEVBQWlDLElBQWpDLEVBQXVDLEtBQUtELFNBQTVDO0FBQ0gsV0FURCxNQVVBO0FBQ0ksaUJBQUs0QixzQkFBTDtBQUNIO0FBQ0osU0F2QkQsTUF5QkE7QUFDSTRGLFVBQUFBLFlBQVksR0FBRzlLLGFBQWEsQ0FBQ3VLLElBQWQsQ0FBbUJDLE1BQWxDO0FBQ0FsRCxVQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDb0MsZUFBdEMsR0FBd0QsQ0FBeEQ7O0FBRUEsY0FBSXJDLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q2tCLFlBQWxELEVBQWdFO0FBQzVELGdCQUFJTCxhQUFKLEVBQW1CO0FBQ2ZuRCxjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDMEIsWUFBdEMsR0FBcUQsS0FBckQ7QUFDQSxtQkFBS3pELHFCQUFMLENBQTJCLG1FQUFpRTRFLGdCQUE1RixFQUE4RyxJQUE5RztBQUNBcEssY0FBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0gsYUFKRCxNQUlPO0FBQ0ZzSCxjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOENrQixZQUE5QztBQUNELG1CQUFLdEYscUJBQUwsQ0FBMkIsMENBQTBDc0YsWUFBMUMsR0FBeUQsc0VBQXpELEdBQWdJeEQsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQWpNLEVBQXVNLElBQXZNO0FBQ0M1SixjQUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFDSjtBQUNBLFdBVkwsTUFVVztBQUNIbUksWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7O0FBQ0EsZ0JBQUksQ0FBQyxLQUFLOUUsU0FBVixFQUFxQjtBQUNqQnhELGNBQUFBLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NtQyxxQkFBbEMsR0FBMER5QyxnQ0FBMUQsQ0FBMkYsSUFBM0Y7QUFDSCxhQUZELE1BR0E7QUFDSTVDLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaO0FBQ0FwSSxjQUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFDQSxtQkFBS3dGLHFCQUFMLENBQTJCLEVBQTNCLEVBQStCLElBQS9CO0FBQ0g7QUFDUjtBQUNKOztBQUNEOztBQUNKLFdBQUssR0FBTDtBQUFTO0FBQ0wyQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLM0gsU0FBTCxDQUFlaUksS0FBZixFQUFzQjlHLFdBQWxDO0FBQ0E1QixRQUFBQSxhQUFhLEdBQUcsSUFBaEI7O0FBQ0EsWUFBSXNILFFBQVEsR0FBR3hILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWY7O0FBQ0EsWUFBSW1CLFlBQVksR0FBR3pILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9Eb0IsYUFBcEQsRUFBbkI7O0FBQ0EsWUFBSXdELGFBQWEsR0FBRzFELFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NvQyxlQUExRDtBQUNBLFlBQUlXLFdBQVcsR0FBRyxDQUFsQjs7QUFDQSxZQUFJVyxlQUFlLEdBQUczRCxRQUFRLENBQUM0RCxzQkFBVCxDQUFnQ1osV0FBaEMsQ0FBdEI7O0FBRUEsWUFBSVcsZUFBZSxHQUFHLENBQXRCLEVBQXlCO0FBQ3JCLGVBQUt6RixxQkFBTCxDQUEyQix3QkFBd0J3RixhQUF4QixHQUF3QyxJQUF4QyxHQUErQyxJQUEvQyxHQUN2QixTQUR1QixHQUNYQSxhQURXLEdBQ0ssS0FETCxHQUNhVixXQURiLEdBQzJCLEtBRDNCLEdBQ21DVyxlQURuQyxHQUNxRCxJQURyRCxHQUM0RCxJQUQ1RCxHQUNtRSxJQURuRSxHQUV2QiwwREFGdUIsR0FFc0NBLGVBRmpFLEVBR00sSUFITjtBQUlILFNBTEQsTUFNSztBQUNELGVBQUt6RixxQkFBTCxDQUEyQixxQ0FBM0IsRUFBa0UsSUFBbEU7QUFDSDs7QUFDRDs7QUFDSixXQUFLLEdBQUw7QUFBUztBQUNMMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzNILFNBQUwsQ0FBZWlJLEtBQWYsRUFBc0I5RyxXQUFsQzs7QUFDQSxZQUFJMEYsUUFBUSxHQUFHeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBZjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFHekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFuQjs7QUFDQSxZQUFJMkQsSUFBSSxHQUFHLElBQVg7QUFDQW5MLFFBQUFBLGFBQWEsR0FBRyxJQUFoQjs7QUFFQSxZQUFJc0gsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQThDdUIsSUFBbEQsRUFBd0Q7QUFDaEQsY0FBSWpCLFdBQVcsR0FBRzVDLFFBQVEsQ0FBQzZDLHFCQUFULEVBQWxCOztBQUNBN0MsVUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQThDdUIsSUFBOUM7QUFDQSxlQUFLM0YscUJBQUwsQ0FBMkIsV0FBVzJGLElBQVgsR0FBa0Isc0VBQWxCLEdBQXlGN0QsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQTFKLEVBQWdLLElBQWhLO0FBQ0E1SixVQUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFDSCxTQUxMLE1BS1c7QUFDSG1JLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaOztBQUNBLGNBQUksQ0FBQyxLQUFLOUUsU0FBVixFQUFxQjtBQUNqQnhELFlBQUFBLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NtQyxxQkFBbEMsR0FBMER5QyxnQ0FBMUQsQ0FBMkYsSUFBM0Y7QUFDSCxXQUZELE1BR0E7QUFDSTVDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaO0FBQ0FwSSxZQUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFDQSxpQkFBS3dGLHFCQUFMLENBQTJCLEVBQTNCLEVBQStCLElBQS9CO0FBQ0g7QUFDUjs7QUFDRDs7QUFDSixXQUFLLEdBQUw7QUFBUztBQUNMMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzNILFNBQUwsQ0FBZWlJLEtBQWYsRUFBc0I5RyxXQUFsQzs7QUFDQSxZQUFJMEYsUUFBUSxHQUFHeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBZjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFHekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFuQjs7QUFDQSxZQUFJNEMsZ0JBQWdCLEdBQUU5QyxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDb0MsZUFBNUQ7O0FBQ0EsWUFBSVUsV0FBSjs7QUFDQSxZQUFJQyxXQUFXLEdBQUcsR0FBbEI7QUFDQSxZQUFJYyxNQUFNLEdBQUcsS0FBYjs7QUFFQSxZQUFJaEIsZ0JBQWdCLElBQUksQ0FBeEIsRUFBMkI7QUFDdkIsZUFBSzVFLHFCQUFMLENBQTJCLHFDQUEzQixFQUFrRSxJQUFsRTtBQUNBO0FBQ0g7O0FBRUQsWUFBSWlELGNBQUosRUFBb0I7QUFDaEI0QixVQUFBQSxXQUFXLEdBQUcvQyxRQUFRLENBQUMrRCxXQUFULEVBQWQ7QUFFQSxjQUFJaEIsV0FBVyxHQUFHLENBQWQsSUFBbUIsQ0FBdkIsRUFDSWUsTUFBTSxHQUFHLElBQVQ7QUFFSnBMLFVBQUFBLGFBQWEsR0FBRztBQUFFdUssWUFBQUEsSUFBSSxFQUFFO0FBQUVDLGNBQUFBLE1BQU0sRUFBRUgsV0FBVjtBQUFzQmlCLGNBQUFBLE1BQU0sRUFBQ0Y7QUFBN0I7QUFBUixXQUFoQjs7QUFFQSxjQUFJLENBQUMsS0FBSzlILFNBQVYsRUFBcUI7QUFFakIsZ0JBQUkrRyxXQUFXLEdBQUUsQ0FBYixJQUFnQixDQUFwQixFQUNBO0FBQ0llLGNBQUFBLE1BQU0sR0FBRyxLQUFUO0FBQ0EsbUJBQUt6SCxZQUFMLENBQWtCLE9BQU8scUJBQVAsR0FBK0IwRyxXQUEvQixHQUE2QyxJQUE3QyxHQUFvRCxJQUFwRCxHQUNsQiwrRUFEQSxFQUNpRixJQURqRjtBQUdBLG1CQUFLdEgsTUFBTCxDQUFZTCxxQkFBWixDQUFrQ3FDLFFBQWxDLENBQTJDLENBQTNDLEVBQThDQSxRQUE5QyxDQUF1RCxDQUF2RCxFQUEwREMsWUFBMUQsQ0FBdUU1RSxFQUFFLENBQUNvQyxLQUExRSxFQUFpRnlDLE1BQWpGLEdBQTBGLE1BQTFGO0FBRUgsYUFSRCxNQVNLLElBQUlvRixXQUFXLEdBQUUsQ0FBYixJQUFnQixDQUFwQixFQUNMO0FBQ0llLGNBQUFBLE1BQU0sR0FBRyxJQUFUO0FBQ0EsbUJBQUt6SCxZQUFMLENBQWtCLE9BQU8sSUFBUCxHQUFjLHFCQUFkLEdBQXNDMEcsV0FBdEMsR0FBb0QsSUFBcEQsR0FBMkQsSUFBM0QsR0FDbEIscUZBREEsRUFDdUYsSUFEdkY7QUFHQSxtQkFBS3RILE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixnQkFBMUY7QUFDSDs7QUFFRCxpQkFBS1osYUFBTCxDQUFtQixLQUFLZCxPQUF4QixFQUFpQyxJQUFqQyxFQUF1QyxLQUFLRCxTQUE1QztBQUNILFdBckJELE1Bc0JBO0FBQ0ksaUJBQUs0QixzQkFBTDtBQUNIO0FBQ0osU0FqQ0QsTUFtQ0E7QUFDSW1GLFVBQUFBLFdBQVcsR0FBR3JLLGFBQWEsQ0FBQ3VLLElBQWQsQ0FBbUJDLE1BQWpDO0FBQ0FZLFVBQUFBLE1BQU0sR0FBR3BMLGFBQWEsQ0FBQ3VLLElBQWQsQ0FBbUJlLE1BQTVCOztBQUVBLGNBQUksQ0FBQ0YsTUFBTCxFQUFhO0FBQ1QsZ0JBQUlsQixXQUFXLEdBQUc1QyxRQUFRLENBQUM2QyxxQkFBVCxFQUFsQjs7QUFFQSxnQkFBSUQsV0FBVyxHQUFHLENBQWxCLEVBQ0ksS0FBSzFFLHFCQUFMLENBQTJCLDZDQUE2QzBFLFdBQXhFLEVBQXFGLElBQXJGLEVBREosS0FHSSxLQUFLMUUscUJBQUwsQ0FBMkIscUNBQTNCLEVBQWtFLElBQWxFO0FBRUp4RixZQUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFDSCxXQVRELE1BU00sSUFBSW9MLE1BQUosRUFBWTtBQUVkLGdCQUFJeEMsT0FBTyxHQUFJd0IsZ0JBQWdCLEdBQUdFLFdBQW5CLEdBQWlDLEdBQWxDLEdBQXlDRixnQkFBdkQ7O0FBRUE5QyxZQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDb0MsZUFBdEMsR0FBd0QsQ0FBeEQ7QUFDQXJDLFlBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q2hCLE9BQTlDO0FBRUEsaUJBQUtwRCxxQkFBTCxDQUEyQixzQkFBc0JvRCxPQUF0QixHQUE4QixzQ0FBekQsRUFBaUcsSUFBakc7QUFDQTVJLFlBQUFBLGFBQWEsR0FBRyxJQUFoQjtBQUNIO0FBQ0o7O0FBQ0Q7O0FBQ0osV0FBSyxHQUFMO0FBQ0ltSSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLM0gsU0FBTCxDQUFlaUksS0FBZixFQUFzQjlHLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQVM7QUFDTHVHLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUszSCxTQUFMLENBQWVpSSxLQUFmLEVBQXNCOUcsV0FBbEM7QUFDQTVCLFFBQUFBLGFBQWEsR0FBRyxJQUFoQjs7QUFDQSxZQUFJc0gsUUFBUSxHQUFHeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBZjs7QUFDQSxZQUFJOEQsV0FBVyxHQUFHNUMsUUFBUSxDQUFDNkMscUJBQVQsRUFBbEI7O0FBRUEsWUFBSUQsV0FBVyxHQUFHLENBQWxCLEVBQ0ksS0FBSzFFLHFCQUFMLENBQTJCLDZDQUE2QzBFLFdBQXhFLEVBQXFGLElBQXJGLEVBREosS0FHSSxLQUFLMUUscUJBQUwsQ0FBMkIscUNBQTNCLEVBQWtFLElBQWxFO0FBQ0o7O0FBQ0osV0FBSyxHQUFMO0FBQVM7QUFDTDJDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUszSCxTQUFMLENBQWVpSSxLQUFmLEVBQXNCOUcsV0FBbEM7O0FBQ0EsWUFBSTBGLFFBQVEsR0FBR3hILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWY7O0FBQ0EsWUFBSThELFdBQVcsR0FBRzVDLFFBQVEsQ0FBQzZDLHFCQUFULEVBQWxCOztBQUNBbkssUUFBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0EsWUFBSWtLLFdBQVcsR0FBRyxDQUFsQixFQUNJLEtBQUsxRSxxQkFBTCxDQUEyQiw2Q0FBNkMwRSxXQUF4RSxFQUFxRixJQUFyRixFQURKLEtBR0ksS0FBSzFFLHFCQUFMLENBQTJCLHFDQUEzQixFQUFrRSxJQUFsRTtBQUNKOztBQUNKLFdBQUssSUFBTDtBQUFVO0FBQ04yQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLM0gsU0FBTCxDQUFlaUksS0FBZixFQUFzQjlHLFdBQWxDO0FBQ0E1QixRQUFBQSxhQUFhLEdBQUcsSUFBaEI7O0FBQ0EsWUFBSXNILFFBQVEsR0FBR3hILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWY7O0FBQ0EsWUFBSW1CLFlBQVksR0FBR3pILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9Eb0IsYUFBcEQsRUFBbkI7O0FBQ0EsWUFBSXdELGFBQWEsR0FBRzFELFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NvQyxlQUExRDtBQUNBLFlBQUk0QixPQUFPLEdBQUcsR0FBZDs7QUFDQSxZQUFJN0IsT0FBTyxHQUFHcEMsUUFBUSxDQUFDa0UsaUJBQVQsQ0FBMkJELE9BQTNCLENBQWQ7O0FBRUEsWUFBSTdCLE9BQU8sR0FBRyxDQUFkLEVBQWlCO0FBQ2IsZUFBS2xFLHFCQUFMLENBQTJCLHdCQUF3QndGLGFBQXhCLEdBQXdDLElBQXhDLEdBQStDLElBQS9DLEdBQ3ZCLFNBRHVCLEdBQ1hBLGFBRFcsR0FDSyxNQURMLEdBQ2NBLGFBRGQsR0FDOEIsR0FEOUIsR0FDb0NPLE9BRHBDLEdBQzhDLFFBRDlDLEdBQ3lELEtBRHpELEdBQ2lFN0IsT0FEakUsR0FDMkUsSUFEM0UsR0FDa0YsSUFEbEYsR0FDeUYsSUFEekYsR0FFdkIscURBRnVCLEdBRWlDQSxPQUZqQyxHQUUyQyx3QkFGM0MsR0FFc0VwQyxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFGdkksRUFHTSxJQUhOO0FBSUgsU0FMRCxNQU1LO0FBQ0QsZUFBS3BFLHFCQUFMLENBQTJCLHFDQUEzQixFQUFrRSxJQUFsRTtBQUNIOztBQUNEOztBQUNKLFdBQUssSUFBTDtBQUNJMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzNILFNBQUwsQ0FBZWlJLEtBQWYsRUFBc0I5RyxXQUFsQztBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJdUcsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzNILFNBQUwsQ0FBZWlJLEtBQWYsRUFBc0I5RyxXQUFsQztBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJdUcsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzNILFNBQUwsQ0FBZWlJLEtBQWYsRUFBc0I5RyxXQUFsQztBQUNBOztBQUNKLFdBQUssSUFBTDtBQUFVO0FBQ051RyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLM0gsU0FBTCxDQUFlaUksS0FBZixFQUFzQjlHLFdBQWxDOztBQUNBLFlBQUkwRixRQUFRLEdBQUd4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFmOztBQUNBLFlBQUk4RCxXQUFXLEdBQUc1QyxRQUFRLENBQUM2QyxxQkFBVCxFQUFsQjs7QUFDQW5LLFFBQUFBLGFBQWEsR0FBRyxJQUFoQjtBQUNBLFlBQUlrSyxXQUFXLEdBQUcsQ0FBbEIsRUFDSSxLQUFLMUUscUJBQUwsQ0FBMkIsNkNBQTZDMEUsV0FBeEUsRUFBcUYsSUFBckYsRUFESixLQUdJLEtBQUsxRSxxQkFBTCxDQUEyQixxQ0FBM0IsRUFBa0UsSUFBbEU7QUFDSjs7QUFDSixXQUFLLElBQUw7QUFDSTJDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUszSCxTQUFMLENBQWVpSSxLQUFmLEVBQXNCOUcsV0FBbEM7QUFDQTs7QUFDSjtBQUNJO0FBbFVSO0FBcVVILEdBNzBCb0I7QUErMEJyQitFLEVBQUFBLHVCQS8wQnFCLG1DQSswQkc2QixHQS8wQkgsRUErMEJRQyxjQS8wQlIsRUErMEIrQmhDLEtBLzBCL0IsRUFnMUJyQjtBQUFBLFFBRDZCZ0MsY0FDN0I7QUFENkJBLE1BQUFBLGNBQzdCLEdBRDhDLEtBQzlDO0FBQUE7O0FBQUEsUUFEb0RoQyxLQUNwRDtBQURvREEsTUFBQUEsS0FDcEQsR0FEMEQsQ0FDMUQ7QUFBQTs7QUFDRSxRQUFJaUMsS0FBSyxHQUFDQyxRQUFRLENBQUNILEdBQUQsQ0FBbEI7QUFDQUUsSUFBQUEsS0FBSyxHQUFDQSxLQUFLLEdBQUMsQ0FBWjs7QUFFQyxZQUFRRixHQUFSO0FBQ0UsV0FBSyxHQUFMO0FBQVM7QUFDTEwsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3pILE1BQUwsQ0FBWStILEtBQVosRUFBbUI5RyxXQUEvQjs7QUFDQSxZQUFJMEYsUUFBUSxHQUFDeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFDekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFqQjs7QUFDRUYsUUFBQUEsUUFBUSxDQUFDbUUsa0JBQVQsQ0FBNEIsSUFBNUI7O0FBQ0ExTCxRQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNGLGFBQUt5RixxQkFBTCxDQUEyQiwrQkFBM0IsRUFBMkQsSUFBM0Q7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFBVTtBQUNKMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3pILE1BQUwsQ0FBWStILEtBQVosRUFBbUI5RyxXQUEvQjs7QUFDQSxZQUFJMEYsUUFBUSxHQUFHeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBZjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFHekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFuQjs7QUFDQSxZQUFJa0UsVUFBSjtBQUNBLFlBQUlDLGNBQUo7QUFDQSxZQUFJckMsV0FBSjs7QUFDQSxZQUFJc0MsWUFBSjs7QUFFQSxZQUFJbkQsY0FBSixFQUFvQjtBQUNoQmlELFVBQUFBLFVBQVUsR0FBR3BFLFFBQVEsQ0FBQzhCLFlBQVQsRUFBYjtBQUNBdUMsVUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0FyQyxVQUFBQSxXQUFXLEdBQUdvQyxVQUFVLEdBQUdDLGNBQTNCO0FBQ0FDLFVBQUFBLFlBQVksR0FBR3RFLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0MwQixZQUFyRDtBQUVBbEosVUFBQUEsVUFBVSxHQUFHO0FBQUV3SyxZQUFBQSxJQUFJLEVBQUU7QUFBRUMsY0FBQUEsTUFBTSxFQUFFbEIsV0FBVjtBQUF1QnVDLGNBQUFBLE1BQU0sRUFBRUQ7QUFBL0I7QUFBUixXQUFiOztBQUVBLGNBQUksQ0FBQyxLQUFLdEksU0FBVixFQUFxQjtBQUNqQixpQkFBS0ssWUFBTCxDQUFrQixPQUFPLElBQVAsR0FBYyxxQkFBZCxHQUFzQytILFVBQXRDLEdBQW1ELElBQW5ELEdBQTBELElBQTFELEdBQ2QsMEJBRGMsR0FDZUEsVUFEZixHQUM0QixLQUQ1QixHQUNvQ0MsY0FEcEMsR0FDcUQsTUFEckQsR0FDOERyQyxXQURoRixFQUM2RixJQUQ3RjtBQUdBLGlCQUFLdkcsTUFBTCxDQUFZTCxxQkFBWixDQUFrQ3FDLFFBQWxDLENBQTJDLENBQTNDLEVBQThDQSxRQUE5QyxDQUF1RCxDQUF2RCxFQUEwREMsWUFBMUQsQ0FBdUU1RSxFQUFFLENBQUNvQyxLQUExRSxFQUFpRnlDLE1BQWpGLEdBQTBGLFlBQTFGO0FBQ0EsaUJBQUtaLGFBQUwsQ0FBbUIsS0FBS2QsT0FBeEIsRUFBaUMsSUFBakMsRUFBdUMsS0FBS0QsU0FBNUM7QUFDSCxXQU5ELE1BT0E7QUFDSSxpQkFBSzRCLHNCQUFMO0FBQ0g7QUFDSixTQWxCRCxNQW1CSztBQUNEaUQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlySSxVQUFaO0FBQ0F1SixVQUFBQSxXQUFXLEdBQUd2SixVQUFVLENBQUN3SyxJQUFYLENBQWdCQyxNQUE5QjtBQUNBb0IsVUFBQUEsWUFBWSxHQUFHN0wsVUFBVSxDQUFDd0ssSUFBWCxDQUFnQnNCLE1BQS9CO0FBRUEsY0FBSUQsWUFBSixFQUNLdEMsV0FBVyxHQUFHQSxXQUFXLEdBQUcsQ0FBNUI7O0FBRUwsY0FBSWhDLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q04sV0FBbEQsRUFBK0Q7QUFDM0QsZ0JBQUlzQyxZQUFKLEVBQWtCO0FBQ2R0RSxjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOENOLFdBQTlDO0FBQ0FoQyxjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDMEIsWUFBdEMsR0FBcUQsS0FBckQ7QUFDQSxtQkFBS3pELHFCQUFMLENBQTJCLHNDQUFzQzhELFdBQXRDLEdBQW9ELDBDQUFwRCxHQUErRmhDLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUFoSyxFQUFzSyxJQUF0SztBQUNBN0osY0FBQUEsVUFBVSxHQUFHLElBQWI7QUFDSCxhQUxELE1BS087QUFDRnVILGNBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q04sV0FBOUM7QUFDRCxtQkFBSzlELHFCQUFMLENBQTJCLDBDQUEwQzhELFdBQTFDLEdBQXdELDBDQUF4RCxHQUFtR2hDLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUFwSyxFQUEwSyxJQUExSztBQUNBN0osY0FBQUEsVUFBVSxHQUFHLElBQWI7QUFDSDtBQUNKLFdBWEQsTUFXTztBQUNIb0ksWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7O0FBQ0EsZ0JBQUksQ0FBQyxLQUFLOUUsU0FBVixFQUFxQjtBQUNqQnhELGNBQUFBLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NtQyxxQkFBbEMsR0FBMER5QyxnQ0FBMUQsQ0FBMkYsSUFBM0Y7QUFDSCxhQUZELE1BR0E7QUFDSTVDLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaO0FBQ0FySSxjQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBLG1CQUFLeUYscUJBQUwsQ0FBMkIsRUFBM0IsRUFBK0IsSUFBL0I7QUFDSDtBQUNKO0FBQ0o7O0FBQ0g7O0FBQ0osV0FBSyxHQUFMO0FBQVM7QUFDTDJDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUt6SCxNQUFMLENBQVkrSCxLQUFaLEVBQW1COUcsV0FBL0I7O0FBQ0EsWUFBSTBGLFFBQVEsR0FBQ3hILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWI7O0FBQ0EsWUFBSW1CLFlBQVksR0FBQ3pILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9Eb0IsYUFBcEQsRUFBakI7O0FBQ0N6SCxRQUFBQSxVQUFVLEdBQUcsSUFBYjs7QUFDRHVILFFBQUFBLFFBQVEsQ0FBQ3dFLHNCQUFULENBQWdDLElBQWhDOztBQUNBLGFBQUt0RyxxQkFBTCxDQUEyQiwwREFBM0IsRUFBc0YsSUFBdEY7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFBUztBQUNIMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3pILE1BQUwsQ0FBWStILEtBQVosRUFBbUI5RyxXQUEvQjs7QUFDQSxZQUFJMEYsUUFBUSxHQUFHeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBZjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFHekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFuQjs7QUFDQSxZQUFJdUUsaUJBQWlCLEdBQUd6RSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDb0QsZUFBOUQ7QUFDQSxZQUFJcUIsc0JBQXNCLEdBQUcxRSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUQsb0JBQW5FO0FBQ0EsWUFBSXFCLGNBQWMsR0FBRyxJQUFyQjtBQUNBLFlBQUlDLGNBQWMsR0FBRyxJQUFyQjtBQUNBLFlBQUlDLFdBQVcsR0FBSUosaUJBQWlCLEdBQUdFLGNBQXJCLEdBQXdDRCxzQkFBc0IsR0FBR0UsY0FBbkY7O0FBQ0EsWUFBSXpELGNBQUosRUFBb0I7QUFDbkIxSSxVQUFBQSxVQUFVLEdBQUc7QUFBRXdLLFlBQUFBLElBQUksRUFBRTtBQUFFQyxjQUFBQSxNQUFNLEVBQUUyQjtBQUFWO0FBQVIsV0FBYjs7QUFDQSxjQUFJLENBQUMsS0FBSzdJLFNBQVYsRUFBcUI7QUFDakIsaUJBQUtLLFlBQUwsQ0FBa0IsT0FBTyxzQkFBUCxHQUFnQ29JLGlCQUFoQyxHQUFrRCxNQUFsRCxHQUF5REUsY0FBekQsR0FBd0UsTUFBeEUsR0FBaUZGLGlCQUFpQixHQUFDRSxjQUFuRyxHQUFvSCxJQUFwSCxHQUEySCxJQUEzSCxHQUNkLDBCQURjLEdBQ2VELHNCQURmLEdBQ3dDLE1BRHhDLEdBQ2lERSxjQURqRCxHQUNrRSxNQURsRSxHQUM0RUYsc0JBQXNCLEdBQUdFLGNBRHJHLEdBQ3VILElBRHZILEdBQzhILElBRDlILEdBRWQsaUJBRmMsR0FFS0gsaUJBQWlCLEdBQUNFLGNBRnZCLEdBRXVDLEtBRnZDLEdBRThDRCxzQkFBc0IsR0FBR0UsY0FGdkUsR0FFdUYsTUFGdkYsR0FFOEZDLFdBRmhILEVBRTZILElBRjdIO0FBSUEsaUJBQUtwSixNQUFMLENBQVlMLHFCQUFaLENBQWtDcUMsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOENBLFFBQTlDLENBQXVELENBQXZELEVBQTBEQyxZQUExRCxDQUF1RTVFLEVBQUUsQ0FBQ29DLEtBQTFFLEVBQWlGeUMsTUFBakYsR0FBMEYsWUFBMUY7QUFDQSxpQkFBS1osYUFBTCxDQUFtQixLQUFLZCxPQUF4QixFQUFpQyxJQUFqQyxFQUF1QyxLQUFLRCxTQUE1QztBQUNILFdBUEQsTUFRQTtBQUNJLGlCQUFLNEIsc0JBQUw7QUFDSDtBQUNELFNBYkQsTUFlQTtBQUNJaUgsVUFBQUEsV0FBVyxHQUFHcE0sVUFBVSxDQUFDd0ssSUFBWCxDQUFnQkMsTUFBOUI7O0FBQ0EsY0FBSWxELFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q3VDLFdBQWxELEVBQStEO0FBQzlEN0UsWUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQThDdUMsV0FBOUM7QUFDQSxpQkFBSzNHLHFCQUFMLENBQTJCLG1CQUFtQjJHLFdBQW5CLEdBQWlDLDBDQUFqQyxHQUE0RTdFLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUE3SSxFQUFtSixJQUFuSjtBQUNBN0osWUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDSCxXQUpFLE1BSUk7QUFDSG9JLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaOztBQUNBLGdCQUFJLENBQUMsS0FBSzlFLFNBQVYsRUFBcUI7QUFDakJ4RCxjQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDbUMscUJBQWxDLEdBQTBEeUMsZ0NBQTFELENBQTJGLElBQTNGO0FBQ0gsYUFGRCxNQUdBO0FBQ0loTCxjQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBb0ksY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0NBQVo7QUFDQSxtQkFBSzVDLHFCQUFMLENBQTJCLEVBQTNCLEVBQStCLElBQS9CO0FBQ0g7QUFDSjtBQUNEOztBQUNIOztBQUNKLFdBQUssR0FBTDtBQUFTO0FBQ0gyQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLekgsTUFBTCxDQUFZK0gsS0FBWixFQUFtQjlHLFdBQS9COztBQUNBLFlBQUkwRixRQUFRLEdBQUd4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFmOztBQUNBLFlBQUltQixZQUFZLEdBQUd6SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRG9CLGFBQXBELEVBQW5COztBQUNBLFlBQUk0RSxvQkFBb0IsR0FBRyxLQUEzQjtBQUNBLFlBQUlWLFVBQUo7QUFDQSxZQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQSxZQUFJUSxXQUFKOztBQUVBLFlBQUkxRCxjQUFKLEVBQW9CO0FBQ2hCLGNBQUloQyxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUFFO0FBRWQxRyxZQUFBQSxVQUFVLEdBQUc7QUFBRXdLLGNBQUFBLElBQUksRUFBRTtBQUFFQyxnQkFBQUEsTUFBTSxFQUFFNEIsb0JBQVY7QUFBZ0NDLGdCQUFBQSxJQUFJLEVBQUU1RjtBQUF0QztBQUFSLGFBQWI7O0FBQ0EsZ0JBQUksQ0FBQyxLQUFLbkQsU0FBVixFQUFxQjtBQUNqQixtQkFBS0ssWUFBTCxDQUFrQixPQUFPLG9CQUFQLEdBQThCeUksb0JBQWhELEVBQXNFLElBQXRFO0FBRUEsbUJBQUtySixNQUFMLENBQVlMLHFCQUFaLENBQWtDcUMsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOENBLFFBQTlDLENBQXVELENBQXZELEVBQTBEQyxZQUExRCxDQUF1RTVFLEVBQUUsQ0FBQ29DLEtBQTFFLEVBQWlGeUMsTUFBakYsR0FBMEYsWUFBMUY7QUFDQSxtQkFBS1osYUFBTCxDQUFtQixLQUFLZCxPQUF4QixFQUFpQyxJQUFqQyxFQUF1QyxLQUFLRCxTQUE1QztBQUNILGFBTEQsTUFLTztBQUNILG1CQUFLNEIsc0JBQUw7QUFDSDtBQUNKLFdBWEQsTUFXTyxJQUFJdUIsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFBRTtBQUVyQmlGLFlBQUFBLFVBQVUsR0FBR3BFLFFBQVEsQ0FBQzhCLFlBQVQsRUFBYjtBQUNBK0MsWUFBQUEsV0FBVyxHQUFHVCxVQUFVLEdBQUdDLGNBQTNCO0FBQ0E1TCxZQUFBQSxVQUFVLEdBQUc7QUFBRXdLLGNBQUFBLElBQUksRUFBRTtBQUFFQyxnQkFBQUEsTUFBTSxFQUFFa0IsVUFBVjtBQUFzQlksZ0JBQUFBLFdBQVcsRUFBRUgsV0FBbkM7QUFBZ0RFLGdCQUFBQSxJQUFJLEVBQUU1RjtBQUF0RDtBQUFSLGFBQWI7O0FBQ0EsZ0JBQUksQ0FBQyxLQUFLbkQsU0FBVixFQUFxQjtBQUNqQixtQkFBS0ssWUFBTCxDQUFrQixPQUFPLGdCQUFQLEdBQTBCK0gsVUFBMUIsR0FBdUMsSUFBdkMsR0FBOEMsSUFBOUMsR0FDZCxpQkFEYyxHQUNNQSxVQUROLEdBQ21CLEtBRG5CLEdBQzJCQyxjQUQzQixHQUM0QyxNQUQ1QyxHQUNxRFEsV0FEdkUsRUFDb0YsSUFEcEY7QUFHQSxtQkFBS3BKLE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixZQUExRjtBQUNBLG1CQUFLWixhQUFMLENBQW1CLEtBQUtkLE9BQXhCLEVBQWlDLElBQWpDLEVBQXVDLEtBQUtELFNBQTVDO0FBQ0gsYUFORCxNQU1PO0FBQ0gsbUJBQUs0QixzQkFBTDtBQUNIO0FBQ0o7QUFDSixTQTNCRCxNQTJCTztBQUNILGNBQUlxSCxRQUFRLEdBQUd4TSxVQUFVLENBQUN3SyxJQUFYLENBQWdCOEIsSUFBL0I7O0FBQ0EsY0FBSUUsUUFBUSxJQUFJLENBQWhCLEVBQ0E7QUFDSUgsWUFBQUEsb0JBQW9CLEdBQUdyTSxVQUFVLENBQUN3SyxJQUFYLENBQWdCQyxNQUF2Qzs7QUFDSyxnQkFBSWxELFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q3dDLG9CQUFsRCxFQUF3RTtBQUNwRTlFLGNBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q3dDLG9CQUE5QztBQUNBLG1CQUFLNUcscUJBQUwsQ0FBMkIsbUJBQW1CNEcsb0JBQW5CLEdBQTBDLDBDQUExQyxHQUFxRjlFLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0SixFQUE0SixJQUE1SjtBQUNBN0osY0FBQUEsVUFBVSxHQUFHLElBQWI7QUFDSCxhQUpELE1BSU87QUFDSG9JLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaOztBQUNBLGtCQUFJLENBQUMsS0FBSzlFLFNBQVYsRUFBcUI7QUFDakJ4RCxnQkFBQUEsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ21DLHFCQUFsQyxHQUEwRHlDLGdDQUExRCxDQUEyRixJQUEzRjtBQUNILGVBRkQsTUFHQTtBQUNJaEwsZ0JBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0FvSSxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUNBQVo7QUFDQSxxQkFBSzVDLHFCQUFMLENBQTJCLEVBQTNCLEVBQStCLElBQS9CO0FBQ0g7QUFDSjtBQUNULFdBbEJELE1Ba0JPLElBQUkrRyxRQUFRLElBQUksQ0FBaEIsRUFDUDtBQUNJYixZQUFBQSxVQUFVLEdBQUczTCxVQUFVLENBQUN3SyxJQUFYLENBQWdCQyxNQUE3QjtBQUNBMkIsWUFBQUEsV0FBVyxHQUFHcE0sVUFBVSxDQUFDd0ssSUFBWCxDQUFnQitCLFdBQTlCOztBQUNBLGdCQUFJaEYsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQThDdUMsV0FBbEQsRUFBK0Q7QUFDOUQ3RSxjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOEN1QyxXQUE5QztBQUNBLG1CQUFLM0cscUJBQUwsQ0FBMkIsbUJBQW1CMkcsV0FBbkIsR0FBaUMsMENBQWpDLEdBQTRFN0UsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQTdJLEVBQW1KLElBQW5KO0FBQ0E3SixjQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNILGFBSkUsTUFJSTtBQUNIb0ksY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7O0FBQ0Esa0JBQUksQ0FBQyxLQUFLOUUsU0FBVixFQUFxQjtBQUNqQnhELGdCQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDbUMscUJBQWxDLEdBQTBEeUMsZ0NBQTFELENBQTJGLElBQTNGO0FBQ0gsZUFGRCxNQUdBO0FBQ0k1QyxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUNBQVo7QUFDQXJJLGdCQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBLHFCQUFLeUYscUJBQUwsQ0FBMkIsRUFBM0IsRUFBK0IsSUFBL0I7QUFDSDtBQUNKO0FBQ0Q7QUFDSjs7QUFDSDs7QUFDSixXQUFLLEdBQUw7QUFBUztBQUNMMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3pILE1BQUwsQ0FBWStILEtBQVosRUFBbUI5RyxXQUEvQjs7QUFDQSxZQUFJMEYsUUFBUSxHQUFDeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFDekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFqQjs7QUFFQSxZQUFJZ0YsYUFBYSxHQUFDN0QsUUFBUSxDQUFDckIsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ0ksWUFBdEMsQ0FBbUQsQ0FBbkQsRUFBc0Q4RSxZQUF2RCxDQUExQjs7QUFDQSxZQUFHRCxhQUFhLElBQUUsQ0FBbEIsRUFBcUI7QUFDckI7QUFDSSxnQkFBSWxGLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4QyxJQUFsRCxFQUF3RDtBQUNwRHRDLGNBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4QyxJQUE5QztBQUNBLG1CQUFLcEUscUJBQUwsQ0FBMkIscUZBQXFGOEIsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRKLEVBQTRKLElBQTVKO0FBQ0gsYUFIRCxNQUlLO0FBQ0Qsa0JBQUksQ0FBQyxLQUFLdEcsU0FBVixFQUFxQjtBQUNqQnhELGdCQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDbUMscUJBQWxDLEdBQTBEeUMsZ0NBQTFELENBQTJGLElBQTNGO0FBQ0gsZUFGRCxNQUVPO0FBQ0hoTCxnQkFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQW9JLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQ0FBWjtBQUNBLHFCQUFLNUMscUJBQUwsQ0FBMkIsRUFBM0IsRUFBK0IsSUFBL0I7QUFDSDtBQUNKO0FBQ0osV0FmRCxNQWdCSyxJQUFJZ0gsYUFBYSxJQUFFLENBQW5CLEVBQXNCO0FBQzNCO0FBQ0csZ0JBQUdsRixRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBNEMsS0FBL0MsRUFDQTtBQUNHdEMsY0FBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQTRDLEtBQTVDO0FBQ0EsbUJBQUtwRSxxQkFBTCxDQUEyQiwwRkFBd0Y4QixRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBekosRUFBOEosSUFBOUo7QUFDRixhQUpELE1BTUE7QUFDSSxrQkFBSSxDQUFDLEtBQUt0RyxTQUFWLEVBQXFCO0FBQ2pCeEQsZ0JBQUFBLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NtQyxxQkFBbEMsR0FBMER5QyxnQ0FBMUQsQ0FBMkYsSUFBM0Y7QUFDSCxlQUZELE1BR0E7QUFDSWhMLGdCQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBb0ksZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFDQUFaO0FBQ0EscUJBQUs1QyxxQkFBTCxDQUEyQixFQUEzQixFQUErQixJQUEvQjtBQUNIO0FBQ0o7QUFDSDs7QUFDRDs7QUFDSixXQUFLLEdBQUw7QUFBUztBQUNMMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3pILE1BQUwsQ0FBWStILEtBQVosRUFBbUI5RyxXQUEvQjs7QUFDQSxZQUFJMEYsUUFBUSxHQUFDeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFDekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFqQjs7QUFDRXpILFFBQUFBLFVBQVUsR0FBRyxJQUFiOztBQUNGdUgsUUFBQUEsUUFBUSxDQUFDb0YsMEJBQVQsQ0FBb0MsSUFBcEM7O0FBQ0EsYUFBS2xILHFCQUFMLENBQTJCLHdFQUEzQixFQUFvRyxJQUFwRztBQUVBOztBQUNKLFdBQUssR0FBTDtBQUFTO0FBQ0gyQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLekgsTUFBTCxDQUFZK0gsS0FBWixFQUFtQjlHLFdBQS9COztBQUNBLFlBQUkwRixRQUFRLEdBQUd4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFmOztBQUNBLFlBQUltQixZQUFZLEdBQUd6SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRG9CLGFBQXBELEVBQW5COztBQUNBLFlBQUk4QixXQUFKOztBQUNBLFlBQUlzQyxZQUFKOztBQUVBLFlBQUluRCxjQUFKLEVBQW9CO0FBQ2ZhLFVBQUFBLFdBQVcsR0FBR2hDLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUFwRDtBQUNEZ0MsVUFBQUEsWUFBWSxHQUFHdEUsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQzBCLFlBQXJEO0FBRUFsSixVQUFBQSxVQUFVLEdBQUc7QUFBRXdLLFlBQUFBLElBQUksRUFBRTtBQUFFQyxjQUFBQSxNQUFNLEVBQUVsQixXQUFWO0FBQXVCdUMsY0FBQUEsTUFBTSxFQUFFRDtBQUEvQjtBQUFSLFdBQWI7O0FBRUEsY0FBSSxDQUFDLEtBQUt0SSxTQUFWLEVBQXFCO0FBQ2pCLGlCQUFLSyxZQUFMLENBQWtCLE9BQU8sSUFBUCxHQUFjLGdCQUFkLEdBQWlDMkYsV0FBakMsR0FBK0MsSUFBL0MsR0FBc0QsSUFBdEQsR0FDZCx1QkFEYyxHQUNhQSxXQUFXLEdBQUcsQ0FEN0MsRUFDaUQsSUFEakQ7QUFHQSxpQkFBS3ZHLE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixZQUExRjtBQUNBLGlCQUFLWixhQUFMLENBQW1CLEtBQUtkLE9BQXhCLEVBQWlDLElBQWpDLEVBQXVDLEtBQUtELFNBQTVDO0FBQ0gsV0FORCxNQU9BO0FBQ0ksaUJBQUs0QixzQkFBTDtBQUNIO0FBQ0osU0FoQkQsTUFrQks7QUFDRGlELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZckksVUFBWjtBQUNBdUosVUFBQUEsV0FBVyxHQUFHdkosVUFBVSxDQUFDd0ssSUFBWCxDQUFnQkMsTUFBOUI7QUFDQW9CLFVBQUFBLFlBQVksR0FBRzdMLFVBQVUsQ0FBQ3dLLElBQVgsQ0FBZ0JzQixNQUEvQjtBQUVBLGNBQUlELFlBQUosRUFDSXRDLFdBQVcsR0FBSUEsV0FBVyxHQUFHLEVBQWYsR0FBcUIsR0FBbkMsQ0FESixLQUdJQSxXQUFXLEdBQUlBLFdBQVcsR0FBRyxFQUFmLEdBQXFCLEdBQW5DOztBQUVKLGNBQUloQyxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOENOLFdBQWxELEVBQStEO0FBQzNELGdCQUFJc0MsWUFBSixFQUFrQjtBQUNkdEUsY0FBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQThDTixXQUE5QztBQUNBaEMsY0FBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQzBCLFlBQXRDLEdBQXFELEtBQXJEO0FBQ0EsbUJBQUt6RCxxQkFBTCxDQUEyQix5Q0FBeUM4RCxXQUF6QyxHQUF1RCwwQ0FBdkQsR0FBa0doQyxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBbkssRUFBeUssSUFBeks7QUFDQTdKLGNBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0gsYUFMRCxNQUtPO0FBQ0Z1SCxjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOENOLFdBQTlDO0FBQ0QsbUJBQUs5RCxxQkFBTCxDQUEyQiwwQ0FBMEM4RCxXQUExQyxHQUF3RCwwQ0FBeEQsR0FBbUdoQyxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBcEssRUFBMEssSUFBMUs7QUFDQTdKLGNBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0g7QUFDSixXQVhELE1BV087QUFDSG9JLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaOztBQUNBLGdCQUFJLENBQUMsS0FBSzlFLFNBQVYsRUFBcUI7QUFDakJ4RCxjQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDbUMscUJBQWxDLEdBQTBEeUMsZ0NBQTFELENBQTJGLElBQTNGO0FBQ0gsYUFGRCxNQUdBO0FBQ0k1QyxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx1Q0FBWjtBQUNDLG1CQUFLNUMscUJBQUwsQ0FBMkIsRUFBM0IsRUFBK0IsR0FBL0I7QUFDQXpGLGNBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0o7QUFDSjtBQUNKOztBQUNIOztBQUNKLFdBQUssR0FBTDtBQUFTO0FBQ0xvSSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLekgsTUFBTCxDQUFZK0gsS0FBWixFQUFtQjlHLFdBQS9COztBQUNFLFlBQUkwRixRQUFRLEdBQUd4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFmOztBQUNBLFlBQUltQixZQUFZLEdBQUd6SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRG9CLGFBQXBELEVBQW5COztBQUNBLFlBQUk0RSxvQkFBb0IsR0FBRyxLQUEzQjtBQUNBLFlBQUlWLFVBQUo7QUFDQSxZQUFJQyxjQUFjLEdBQUcsSUFBckI7QUFDQSxZQUFJUSxXQUFKOztBQUVBLFlBQUkxRCxjQUFKLEVBQW9CO0FBQ2hCLGNBQUloQyxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUFFO0FBRWQxRyxZQUFBQSxVQUFVLEdBQUc7QUFBRXdLLGNBQUFBLElBQUksRUFBRTtBQUFFQyxnQkFBQUEsTUFBTSxFQUFFNEIsb0JBQVY7QUFBZ0NDLGdCQUFBQSxJQUFJLEVBQUU1RjtBQUF0QztBQUFSLGFBQWI7O0FBQ0EsZ0JBQUksQ0FBQyxLQUFLbkQsU0FBVixFQUFxQjtBQUNqQixtQkFBS0ssWUFBTCxDQUFrQixPQUFPLG9CQUFQLEdBQThCeUksb0JBQWhELEVBQXNFLElBQXRFO0FBRUEsbUJBQUtySixNQUFMLENBQVlMLHFCQUFaLENBQWtDcUMsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOENBLFFBQTlDLENBQXVELENBQXZELEVBQTBEQyxZQUExRCxDQUF1RTVFLEVBQUUsQ0FBQ29DLEtBQTFFLEVBQWlGeUMsTUFBakYsR0FBMEYsWUFBMUY7QUFDQSxtQkFBS1osYUFBTCxDQUFtQixLQUFLZCxPQUF4QixFQUFpQyxJQUFqQyxFQUF1QyxLQUFLRCxTQUE1QztBQUNILGFBTEQsTUFLTztBQUNILG1CQUFLNEIsc0JBQUw7QUFDSDtBQUNKLFdBWEQsTUFXTyxJQUFJdUIsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFBRTtBQUVyQmlGLFlBQUFBLFVBQVUsR0FBR3BFLFFBQVEsQ0FBQzhCLFlBQVQsRUFBYjtBQUNBK0MsWUFBQUEsV0FBVyxHQUFHVCxVQUFVLEdBQUdDLGNBQTNCO0FBQ0E1TCxZQUFBQSxVQUFVLEdBQUc7QUFBRXdLLGNBQUFBLElBQUksRUFBRTtBQUFFQyxnQkFBQUEsTUFBTSxFQUFFa0IsVUFBVjtBQUFzQlksZ0JBQUFBLFdBQVcsRUFBRUgsV0FBbkM7QUFBZ0RFLGdCQUFBQSxJQUFJLEVBQUU1RjtBQUF0RDtBQUFSLGFBQWI7O0FBQ0EsZ0JBQUksQ0FBQyxLQUFLbkQsU0FBVixFQUFxQjtBQUNqQixtQkFBS0ssWUFBTCxDQUFrQixPQUFPLGdCQUFQLEdBQTBCK0gsVUFBMUIsR0FBdUMsSUFBdkMsR0FBOEMsSUFBOUMsR0FDZCxpQkFEYyxHQUNNQSxVQUROLEdBQ21CLEtBRG5CLEdBQzJCQyxjQUQzQixHQUM0QyxNQUQ1QyxHQUNxRFEsV0FEdkUsRUFDb0YsSUFEcEY7QUFHQSxtQkFBS3BKLE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixZQUExRjtBQUNBLG1CQUFLWixhQUFMLENBQW1CLEtBQUtkLE9BQXhCLEVBQWlDLElBQWpDLEVBQXVDLEtBQUtELFNBQTVDO0FBQ0gsYUFORCxNQU1PO0FBQ0gsbUJBQUs0QixzQkFBTDtBQUNIO0FBQ0o7QUFDSixTQTNCRCxNQTJCTztBQUNILGNBQUlxSCxRQUFRLEdBQUd4TSxVQUFVLENBQUN3SyxJQUFYLENBQWdCOEIsSUFBL0I7O0FBQ0EsY0FBSUUsUUFBUSxJQUFJLENBQWhCLEVBQ0E7QUFDSUgsWUFBQUEsb0JBQW9CLEdBQUdyTSxVQUFVLENBQUN3SyxJQUFYLENBQWdCQyxNQUF2Qzs7QUFDSyxnQkFBSWxELFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q3dDLG9CQUFsRCxFQUF3RTtBQUNwRTlFLGNBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q3dDLG9CQUE5QztBQUNBLG1CQUFLNUcscUJBQUwsQ0FBMkIsbUJBQW1CNEcsb0JBQW5CLEdBQTBDLDBDQUExQyxHQUFxRjlFLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0SixFQUE0SixJQUE1SjtBQUNBN0osY0FBQUEsVUFBVSxHQUFHLElBQWI7QUFDSCxhQUpELE1BSU87QUFDSG9JLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaOztBQUNBLGtCQUFJLENBQUMsS0FBSzlFLFNBQVYsRUFBcUI7QUFDakJ4RCxnQkFBQUEsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ21DLHFCQUFsQyxHQUEwRHlDLGdDQUExRCxDQUEyRixJQUEzRjtBQUNILGVBRkQsTUFHQTtBQUNJaEwsZ0JBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0FvSSxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUNBQVo7QUFDQSxxQkFBSzVDLHFCQUFMLENBQTJCLEVBQTNCLEVBQStCLElBQS9CO0FBQ0g7QUFDSjtBQUNULFdBbEJELE1Ba0JPLElBQUkrRyxRQUFRLElBQUksQ0FBaEIsRUFDUDtBQUNJYixZQUFBQSxVQUFVLEdBQUczTCxVQUFVLENBQUN3SyxJQUFYLENBQWdCQyxNQUE3QjtBQUNBMkIsWUFBQUEsV0FBVyxHQUFHcE0sVUFBVSxDQUFDd0ssSUFBWCxDQUFnQitCLFdBQTlCOztBQUNBLGdCQUFJaEYsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQThDdUMsV0FBbEQsRUFBK0Q7QUFDOUQ3RSxjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOEN1QyxXQUE5QztBQUNBLG1CQUFLM0cscUJBQUwsQ0FBMkIsbUJBQW1CMkcsV0FBbkIsR0FBaUMsMENBQWpDLEdBQTRFN0UsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQTdJLEVBQW1KLElBQW5KO0FBQ0E3SixjQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNILGFBSkUsTUFJSTtBQUNIb0ksY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7O0FBQ0Esa0JBQUksQ0FBQyxLQUFLOUUsU0FBVixFQUFxQjtBQUNqQnhELGdCQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDbUMscUJBQWxDLEdBQTBEeUMsZ0NBQTFELENBQTJGLElBQTNGO0FBQ0gsZUFGRCxNQUdBO0FBQ0k1QyxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUNBQVo7QUFDQXJJLGdCQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBLHFCQUFLeUYscUJBQUwsQ0FBMkIsRUFBM0IsRUFBK0IsSUFBL0I7QUFDSDtBQUNKO0FBQ0Q7QUFDSjs7QUFDRDs7QUFDTixXQUFLLElBQUw7QUFBVTtBQUNKMkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3pILE1BQUwsQ0FBWStILEtBQVosRUFBbUI5RyxXQUEvQjs7QUFDQSxZQUFJMEYsUUFBUSxHQUFHeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBZjs7QUFDQSxZQUFJbUIsWUFBWSxHQUFHekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFuQjs7QUFDQSxZQUFJMkQsSUFBSSxHQUFHLEtBQVg7O0FBQ0EsWUFBSTdELFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4Q3VCLElBQWxELEVBQXdEO0FBQ3ZEN0QsVUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQThDdUIsSUFBOUM7QUFDQSxlQUFLM0YscUJBQUwsQ0FBMkIsbUJBQW1CMkYsSUFBbkIsR0FBMEIsMENBQTFCLEdBQXFFN0QsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRJLEVBQTRJLElBQTVJO0FBQ0E3SixVQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNILFNBSkUsTUFJSTtBQUNIb0ksVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7O0FBQ0EsY0FBSSxDQUFDLEtBQUs5RSxTQUFWLEVBQXFCO0FBQ2pCeEQsWUFBQUEsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ21DLHFCQUFsQyxHQUEwRHlDLGdDQUExRCxDQUEyRixJQUEzRjtBQUNILFdBRkQsTUFHQTtBQUNJNUMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUNBQVo7QUFDQXJJLFlBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsaUJBQUt5RixxQkFBTCxDQUEyQixFQUEzQixFQUErQixJQUEvQjtBQUNIO0FBQ0o7O0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0kyQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLekgsTUFBTCxDQUFZK0gsS0FBWixFQUFtQjlHLFdBQS9CO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0l1RyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLekgsTUFBTCxDQUFZK0gsS0FBWixFQUFtQjlHLFdBQS9CO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0l1RyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLekgsTUFBTCxDQUFZK0gsS0FBWixFQUFtQjlHLFdBQS9CO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0l1RyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLekgsTUFBTCxDQUFZK0gsS0FBWixFQUFtQjlHLFdBQS9CO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0l1RyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLekgsTUFBTCxDQUFZK0gsS0FBWixFQUFtQjlHLFdBQS9CO0FBQ0E7O0FBQ0g7QUFDRztBQXZhTjtBQTBhRixHQTl2Q29CO0FBZ3dDckJpRixFQUFBQSxxQkFod0NxQixpQ0Fnd0NDMkIsR0Fod0NELEVBZ3dDTUMsY0Fod0NOLEVBZ3dDNkJoQyxLQWh3QzdCO0FBQUE7O0FBQUEsUUFnd0NNZ0MsY0Fod0NOO0FBZ3dDTUEsTUFBQUEsY0Fod0NOLEdBZ3dDdUIsS0Fod0N2QjtBQUFBOztBQUFBLFFBZ3dDNkJoQyxLQWh3QzdCO0FBZ3dDNkJBLE1BQUFBLEtBaHdDN0IsR0Fnd0NtQyxDQWh3Q25DO0FBQUE7O0FBQUEsNEJBaXdDckI7QUFDRSxVQUFJaUMsS0FBSyxHQUFDQyxRQUFRLENBQUNILEdBQUQsQ0FBbEI7QUFDQUUsTUFBQUEsS0FBSyxHQUFDQSxLQUFLLEdBQUMsQ0FBWjs7QUFFQyxjQUFRRixHQUFSO0FBQ0UsYUFBSyxHQUFMO0FBQVM7QUFDTEwsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBSSxDQUFDcEYsU0FBTCxDQUFlMEYsS0FBZixFQUFzQjlHLFdBQWxDOztBQUNBLGNBQUkwRixRQUFRLEdBQUN4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFiOztBQUNDbkcsVUFBQUEsWUFBWSxHQUFHLElBQWY7O0FBQ0RxSCxVQUFBQSxRQUFRLENBQUM0Qix1QkFBVCxDQUFpQyxJQUFqQzs7QUFDQSxVQUFBLE1BQUksQ0FBQzFELHFCQUFMLENBQTJCLGlEQUEzQixFQUE2RSxJQUE3RTs7QUFDQTs7QUFDSixhQUFLLEdBQUw7QUFBUztBQUNMMkMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBSSxDQUFDcEYsU0FBTCxDQUFlMEYsS0FBZixFQUFzQjlHLFdBQWxDO0FBQ0EzQixVQUFBQSxZQUFZLEdBQUcsSUFBZjs7QUFDQSxjQUFJcUgsUUFBUSxHQUFDeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxjQUFJbUIsWUFBWSxHQUFDekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFqQjs7QUFFQSxjQUFJa0UsVUFBVSxHQUFDcEUsUUFBUSxDQUFDK0QsV0FBVCxFQUFmOztBQUNBLGNBQUlNLGNBQWMsR0FBQyxJQUFuQjtBQUNBLGNBQUlyQyxXQUFXLEdBQUNvQyxVQUFVLEdBQUNDLGNBQTNCO0FBRUFyRSxVQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBNENOLFdBQTVDOztBQUNBLFVBQUEsTUFBSSxDQUFDOUQscUJBQUwsQ0FBMkIsa0JBQWdCa0csVUFBaEIsR0FBMkIsSUFBM0IsR0FBZ0MsSUFBaEMsR0FDeEIsU0FEd0IsR0FDZEEsVUFEYyxHQUNILEtBREcsR0FDR0MsY0FESCxHQUNrQixLQURsQixHQUN3QnJDLFdBRHhCLEdBQ29DLElBRHBDLEdBQ3lDLElBRHpDLEdBQzhDLElBRDlDLEdBRXhCLFVBRndCLEdBRWJBLFdBRmEsR0FFRCxpQ0FGMUIsRUFHSSxJQUhKOztBQUtBOztBQUNKLGFBQUssR0FBTDtBQUFTO0FBQ0huQixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFJLENBQUNwRixTQUFMLENBQWUwRixLQUFmLEVBQXNCOUcsV0FBbEM7QUFDQTNCLFVBQUFBLFlBQVksR0FBRyxJQUFmOztBQUNBLGNBQUlxSCxRQUFRLEdBQUN4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFiOztBQUNBLGNBQUltQixZQUFZLEdBQUN6SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRG9CLGFBQXBELEVBQWpCOztBQUVBLGNBQUlrRSxVQUFVLEdBQUNwRSxRQUFRLENBQUM4QixZQUFULEVBQWY7O0FBQ0EsY0FBSXVDLGNBQWMsR0FBQyxLQUFuQjtBQUNBLGNBQUlyQyxXQUFXLEdBQUNvQyxVQUFVLEdBQUNDLGNBQTNCO0FBRUFyRSxVQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBNENOLFdBQTVDOztBQUNBLFVBQUEsTUFBSSxDQUFDOUQscUJBQUwsQ0FBMkIsa0JBQWdCa0csVUFBaEIsR0FBMkIsSUFBM0IsR0FBZ0MsSUFBaEMsR0FDeEIsU0FEd0IsR0FDZEEsVUFEYyxHQUNILEtBREcsR0FDR0MsY0FESCxHQUNrQixLQURsQixHQUN3QnJDLFdBRHhCLEdBQ29DLElBRHBDLEdBQ3lDLElBRHpDLEdBRXhCLFVBRndCLEdBRWJBLFdBRmEsR0FFRCxpQ0FGMUIsRUFHSSxJQUhKOztBQUlGOztBQUNKLGFBQUssR0FBTDtBQUFTO0FBQ0huQixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFJLENBQUNwRixTQUFMLENBQWUwRixLQUFmLEVBQXNCOUcsV0FBbEM7O0FBQ0EsY0FBSTBGLFFBQVEsR0FBR3hILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWY7O0FBQ0EsY0FBSW1CLFlBQVksR0FBR3pILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9Eb0IsYUFBcEQsRUFBbkI7O0FBQ0EsY0FBSW1GLEtBQUssR0FBRyxLQUFaO0FBQ0EsY0FBSWxDLGFBQWEsR0FBR25ELFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0MwQixZQUExRDs7QUFDQSxjQUFJUixjQUFKLEVBQ0E7QUFFSSxnQkFBSWdDLGFBQUosRUFDSWtDLEtBQUssR0FBR0EsS0FBSyxHQUFHLENBQWhCO0FBRUoxTSxZQUFBQSxZQUFZLEdBQUc7QUFBRXNLLGNBQUFBLElBQUksRUFBRTtBQUFFQyxnQkFBQUEsTUFBTSxFQUFFbUM7QUFBVjtBQUFSLGFBQWY7O0FBRUEsZ0JBQUksQ0FBQyxNQUFJLENBQUNySixTQUFWLEVBQXFCO0FBRXBCLGNBQUEsTUFBSSxDQUFDSyxZQUFMLENBQWtCLE9BQU8saUJBQVAsR0FBMkI4RyxhQUEzQixHQUEyQyxJQUEzQyxHQUFrRCxJQUFsRCxHQUNsQixjQURrQixHQUNIa0MsS0FEZixFQUNzQixJQUR0Qjs7QUFHQSxjQUFBLE1BQUksQ0FBQzVKLE1BQUwsQ0FBWUwscUJBQVosQ0FBa0NxQyxRQUFsQyxDQUEyQyxDQUEzQyxFQUE4Q0EsUUFBOUMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBQTFELENBQXVFNUUsRUFBRSxDQUFDb0MsS0FBMUUsRUFBaUZ5QyxNQUFqRixHQUEwRixZQUExRjs7QUFDQSxjQUFBLE1BQUksQ0FBQ1osYUFBTCxDQUFtQixNQUFJLENBQUNkLE9BQXhCLEVBQWlDLElBQWpDLEVBQXVDLE1BQUksQ0FBQ0QsU0FBNUM7QUFDQyxhQVBGLE1BUUM7QUFDSSxjQUFBLE1BQUksQ0FBQzRCLHNCQUFMO0FBQ0g7QUFDTCxXQW5CRCxNQXFCQTtBQUNJeUgsWUFBQUEsS0FBSyxHQUFHMU0sWUFBWSxDQUFDc0ssSUFBYixDQUFrQkMsTUFBMUI7O0FBQ0EsZ0JBQUlsRCxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOEMrQyxLQUFsRCxFQUF5RDtBQUN4RHJGLGNBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NxQyxJQUF0QyxJQUE4QytDLEtBQTlDO0FBQ0FyRixjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDMEIsWUFBdEMsR0FBcUQsS0FBckQ7O0FBQ0EsY0FBQSxNQUFJLENBQUN6RCxxQkFBTCxDQUEyQixXQUFXbUgsS0FBWCxHQUFtQiwwQ0FBbkIsR0FBOERyRixRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBL0gsRUFBcUksSUFBckk7O0FBQ0EzSixjQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNDLGFBTEYsTUFLUTtBQUNQa0ksY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7O0FBQ0Esa0JBQUksQ0FBQyxNQUFJLENBQUM5RSxTQUFWLEVBQXFCO0FBQ2pCeEQsZ0JBQUFBLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NtQyxxQkFBbEMsR0FBMER5QyxnQ0FBMUQsQ0FBMkYsSUFBM0Y7QUFDSCxlQUZELE1BR0E7QUFDSTVDLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQ0FBWjtBQUNBbkksZ0JBQUFBLFlBQVksR0FBRyxJQUFmOztBQUNBLGdCQUFBLE1BQUksQ0FBQ3VGLHFCQUFMLENBQTJCLEVBQTNCLEVBQStCLElBQS9CO0FBQ0g7QUFDQTtBQUNKOztBQUNKOztBQUNKLGFBQUssR0FBTDtBQUFTO0FBQ0gyQyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFJLENBQUNwRixTQUFMLENBQWUwRixLQUFmLEVBQXNCOUcsV0FBbEM7O0FBQ0EsY0FBSTBGLFFBQVEsR0FBR3hILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWY7O0FBQ0EsY0FBSW1CLFlBQVksR0FBR3pILHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9Eb0IsYUFBcEQsRUFBbkI7O0FBQ0EsY0FBSW9GLEtBQUssR0FBRyxLQUFaO0FBQ0EsY0FBSXRDLFdBQVcsR0FBRyxJQUFsQjs7QUFDQSxjQUFJRCxXQUFKOztBQUNBLGNBQUl6QixPQUFKOztBQUVBLGNBQUlILGNBQUosRUFDQTtBQUNJLGdCQUFJaEMsS0FBSyxJQUFJLENBQWIsRUFDQTtBQUNLNEQsY0FBQUEsV0FBVyxHQUFHL0MsUUFBUSxDQUFDOEIsWUFBVCxFQUFkO0FBQ0RSLGNBQUFBLE9BQU8sR0FBR3lCLFdBQVcsR0FBR0MsV0FBeEI7QUFFQXJLLGNBQUFBLFlBQVksR0FBRztBQUFFc0ssZ0JBQUFBLElBQUksRUFBRTtBQUFFQyxrQkFBQUEsTUFBTSxFQUFFNUIsT0FBVjtBQUFtQmlFLGtCQUFBQSxJQUFJLEVBQUV4QztBQUF6QjtBQUFSLGVBQWY7O0FBRUEsa0JBQUkvQyxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOENnRCxLQUFsRCxFQUNBO0FBQ0l0RixnQkFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQThDZ0QsS0FBOUM7O0FBRUEsb0JBQUksQ0FBQyxNQUFJLENBQUN0SixTQUFWLEVBQXFCO0FBRXBCLGtCQUFBLE1BQUksQ0FBQ0ssWUFBTCxDQUFrQixPQUFPLGVBQVAsR0FBeUIwRyxXQUF6QixHQUF1QyxJQUF2QyxHQUE4QyxJQUE5QyxHQUNsQixpQkFEa0IsR0FDQUEsV0FEQSxHQUNZLEtBRFosR0FDa0JDLFdBRGxCLEdBQzhCLE1BRDlCLEdBQ3FDMUIsT0FEdkQsRUFDZ0UsSUFEaEU7O0FBR0Esa0JBQUEsTUFBSSxDQUFDN0YsTUFBTCxDQUFZTCxxQkFBWixDQUFrQ3FDLFFBQWxDLENBQTJDLENBQTNDLEVBQThDQSxRQUE5QyxDQUF1RCxDQUF2RCxFQUEwREMsWUFBMUQsQ0FBdUU1RSxFQUFFLENBQUNvQyxLQUExRSxFQUFpRnlDLE1BQWpGLEdBQTBGLGdCQUExRjs7QUFDQSxrQkFBQSxNQUFJLENBQUNaLGFBQUwsQ0FBbUIsTUFBSSxDQUFDZCxPQUF4QixFQUFpQyxJQUFqQyxFQUF1QyxNQUFJLENBQUNELFNBQTVDO0FBQ0MsaUJBUEYsTUFRQztBQUNJLGtCQUFBLE1BQUksQ0FBQzRCLHNCQUFMO0FBQ0g7QUFDTCxlQWZELE1BZ0JBO0FBQ0tqRixnQkFBQUEsWUFBWSxHQUFHLElBQWY7O0FBQ0EsZ0JBQUEsTUFBSSxDQUFDdUYscUJBQUwsQ0FBMkIsNkJBQTNCLEVBQXlELElBQXpEO0FBQ0o7QUFDSixhQTNCRCxNQTJCTyxJQUFJaUIsS0FBSyxJQUFJLENBQWIsRUFDUDtBQUNLeEcsY0FBQUEsWUFBWSxHQUFHLElBQWY7O0FBQ0EsY0FBQSxNQUFJLENBQUN1RixxQkFBTCxDQUEyQixvQkFBM0IsRUFBZ0QsSUFBaEQ7QUFDSjtBQUNKLFdBbENELE1BbUNBO0FBQ0k2RSxZQUFBQSxXQUFXLEdBQUdwSyxZQUFZLENBQUNzSyxJQUFiLENBQWtCc0MsSUFBaEM7QUFDQWpFLFlBQUFBLE9BQU8sR0FBRzNJLFlBQVksQ0FBQ3NLLElBQWIsQ0FBa0JDLE1BQTVCO0FBQ0FsRCxZQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsSUFBdEMsSUFBOENoQixPQUE5QztBQUNDM0ksWUFBQUEsWUFBWSxHQUFHLElBQWY7O0FBQ0EsWUFBQSxNQUFJLENBQUN1RixxQkFBTCxDQUEyQixrQkFBZ0JvRCxPQUFoQixHQUF3QiwrQkFBbkQsRUFBbUYsSUFBbkY7QUFDQTs7QUFDUDs7QUFDSixhQUFLLEdBQUw7QUFDSVQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBSSxDQUFDcEYsU0FBTCxDQUFlMEYsS0FBZixFQUFzQjlHLFdBQWxDO0FBQ0E7O0FBQ0osYUFBSyxHQUFMO0FBQVM7QUFDTCxjQUFJMEYsUUFBUSxHQUFDeEgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxjQUFJbUIsWUFBWSxHQUFDekgsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RvQixhQUFwRCxFQUFqQjs7QUFDQXZILFVBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0EsY0FBSTZNLFVBQVUsR0FBQyxLQUFmOztBQUNBLGVBQUssSUFBSXJGLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHSCxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtREMsTUFBL0UsRUFBdUZILEtBQUssRUFBNUYsRUFBZ0c7QUFDN0YsZ0JBQUloQixLQUFLLEdBQUNrQyxRQUFRLENBQUNyQixRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtREYsS0FBbkQsRUFBMERnRixZQUEzRCxDQUFsQjs7QUFDQSxnQkFBR2hHLEtBQUssSUFBRSxDQUFQLElBQVlhLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NJLFlBQXRDLENBQW1ERixLQUFuRCxFQUEwREksU0FBekUsRUFDQTtBQUNJUCxjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtREYsS0FBbkQsRUFBMERJLFNBQTFELEdBQW9FLEtBQXBFO0FBQ0FQLGNBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NJLFlBQXRDLENBQW1ERixLQUFuRCxFQUEwRHVCLFVBQTFELEdBQXFFLENBQXJFO0FBQ0E4RCxjQUFBQSxVQUFVLEdBQUMsSUFBWDtBQUNBO0FBQ0g7QUFDSjs7QUFFRCxjQUFHQSxVQUFILEVBQ0E7QUFDSSxZQUFBLE1BQUksQ0FBQ3RILHFCQUFMLENBQTJCLDJDQUEzQixFQUF1RSxJQUF2RTtBQUNILFdBSEQsTUFJQTtBQUNJOEIsWUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3FDLElBQXRDLElBQTRDLEtBQTVDOztBQUNBLFlBQUEsTUFBSSxDQUFDcEUscUJBQUwsQ0FBMkIsNERBQTNCLEVBQXdGLElBQXhGO0FBQ0g7O0FBRUEyQyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFJLENBQUNwRixTQUFMLENBQWUwRixLQUFmLEVBQXNCOUcsV0FBbEM7QUFDQTs7QUFDSixhQUFLLEdBQUw7QUFDSXVHLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQUksQ0FBQ3BGLFNBQUwsQ0FBZTBGLEtBQWYsRUFBc0I5RyxXQUFsQztBQUNBOztBQUNKLGFBQUssR0FBTDtBQUNJdUcsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBSSxDQUFDcEYsU0FBTCxDQUFlMEYsS0FBZixFQUFzQjlHLFdBQWxDO0FBQ0E7O0FBQ0osYUFBSyxJQUFMO0FBQ0l1RyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFJLENBQUNwRixTQUFMLENBQWUwRixLQUFmLEVBQXNCOUcsV0FBbEM7QUFDQTs7QUFDSixhQUFLLElBQUw7QUFBVTtBQUNOdUcsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBSSxDQUFDcEYsU0FBTCxDQUFlMEYsS0FBZixFQUFzQjlHLFdBQWxDOztBQUNBLGNBQUkwRixRQUFRLEdBQUN4SCx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFiOztBQUNBbkcsVUFBQUEsWUFBWSxHQUFHLElBQWY7O0FBQ0FxSCxVQUFBQSxRQUFRLENBQUM0Qix1QkFBVCxDQUFpQyxJQUFqQzs7QUFDQSxVQUFBLE1BQUksQ0FBQzFELHFCQUFMLENBQTJCLGlEQUEzQixFQUE2RSxJQUE3RTs7QUFDQTs7QUFDSixhQUFLLElBQUw7QUFDSTJDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQUksQ0FBQ3BGLFNBQUwsQ0FBZTBGLEtBQWYsRUFBc0I5RyxXQUFsQztBQUNBOztBQUNKLGFBQUssSUFBTDtBQUNJdUcsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBSSxDQUFDcEYsU0FBTCxDQUFlMEYsS0FBZixFQUFzQjlHLFdBQWxDO0FBQ0E7O0FBQ0osYUFBSyxJQUFMO0FBQ0l1RyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFJLENBQUNwRixTQUFMLENBQWUwRixLQUFmLEVBQXNCOUcsV0FBbEM7QUFDQTs7QUFDSixhQUFLLElBQUw7QUFDSXVHLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQUksQ0FBQ3BGLFNBQUwsQ0FBZTBGLEtBQWYsRUFBc0I5RyxXQUFsQztBQUNBOztBQUNIO0FBQ0c7QUF2TU47QUEwTUYsS0EvOENvQjtBQUFBO0FBaTlDckJtRixFQUFBQSxtQkFqOUNxQixpQ0FrOUNyQjtBQUNJakgsSUFBQUEsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ21DLHFCQUFsQyxHQUEwRHlFLDBCQUExRCxDQUFxRixJQUFyRjtBQUNBLFNBQUtwSixZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0gsR0FyOUNvQjtBQXM5Q3JCK0IsRUFBQUEsbUJBdDlDcUIsaUNBdTlDckIsQ0FFQyxDQXo5Q29CO0FBMDlDckJFLEVBQUFBLHlCQTE5Q3FCLHVDQTI5Q3JCLENBRUMsQ0E3OUNvQjtBQTg5Q3JCcUIsRUFBQUEsd0JBOTlDcUIsc0NBKzlDckI7QUFDSW5ILElBQUFBLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9ENEcsbUNBQXBELENBQXdGLElBQXhGO0FBQ0EsU0FBS3JKLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFDSCxHQWwrQ29CO0FBbStDckJtRCxFQUFBQSxpQkFuK0NxQiwrQkFvK0NyQjtBQUNJaEgsSUFBQUEsd0JBQXdCLENBQUNxRyxRQUF6QixDQUFrQ21DLHFCQUFsQyxHQUEwRDJFLHFDQUExRCxDQUFnRyxJQUFoRztBQUNBLFNBQUt0SixZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0gsR0F2K0NvQjtBQXcrQ3JCcUQsRUFBQUEsc0JBeCtDcUIsb0NBeStDckI7QUFDSWxILElBQUFBLHdCQUF3QixDQUFDcUcsUUFBekIsQ0FBa0NtQyxxQkFBbEMsR0FBMEQ0RSxnQ0FBMUQsQ0FBMkYsSUFBM0Y7QUFDQSxTQUFLdkosWUFBTCxDQUFrQixFQUFsQixFQUFxQixLQUFyQjtBQUNILEdBNStDb0I7QUE2K0NyQnVELEVBQUFBLG1CQTcrQ3FCLGlDQTgrQ3JCO0FBQ0lwSCxJQUFBQSx3QkFBd0IsQ0FBQ3FHLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRCtHLCtCQUFwRDtBQUNBLFNBQUt4SixZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0g7QUFqL0NvQixDQUFULENBQWhCO0FBbS9DQXlKLE1BQU0sQ0FBQ0MsT0FBUCxHQUFnQnhLLFNBQWhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBMb3NzZXNEYXRhID0gbnVsbDtcclxudmFyIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG52YXIgV2lsZENhcmREYXRhID0gbnVsbDtcclxudmFyIEJpZ0J1c2luZXNzRGF0YSA9IG51bGw7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNwYWNlcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtU3BhY2VUeXBlID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBXaWxkQ2FyZDogMSxcclxuICAgIEJpZ0J1c2luZXNzOiAyLFxyXG4gICAgTWFya2V0aW5nOiAzLFxyXG4gICAgSW52ZXN0OiA0LFxyXG4gICAgTG9zc2VzOjUsXHJcbiAgICBQYXlEYXk6IDYsXHJcbiAgICBEb3VibGVQYXlEYXk6IDcsXHJcbiAgICBPbmVRdWVzdGlvbjogOCxcclxuICAgIFNlbGw6IDksXHJcbiAgICBCdXlPclNlbGw6IDEwLFxyXG4gICAgR29CYWNrU3BhY2VzOjExLFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGNhcmQgZGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkNhcmREYXRhXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgSUQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSURcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJJZCBvZiB0aGUgY2FyZFwifSxcclxuICAgICAgICBEZXNjcmlwdGlvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJEZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcImRlc2NyaXB0aW9uIG9mIHRoZSBjYXJkXCJ9LFxyXG4gICAgICAgIEhhc0J1dHRvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJIYXNCdXR0b25cIixcclxuICAgICAgICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJpZiB0aGlzIGNhcmQgc2hvdWxkIGhhdmUgaW50ZXJhY3Rpb24gYnV0dG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhhc1R3b0J1dHRvbnM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSGFzVHdvQnV0dG9uc1wiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLmJvb2xlYW4sXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSB0d28gaW50ZXJhY3Rpb24gYnV0dG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhhc1RocmVlQnV0dG9uczpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJIYXNUaHJlZUJ1dHRvbnNcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiaWYgdGhpcyBjYXJkIHNob3VsZCBoYXZlIHRocmVlIGludGVyYWN0aW9uIGJ1dHRvblwifSxcclxuICAgICAgICBCdXR0b25OYW1lOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFNlY29uZEJ1dHRvbk5hbWU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU2Vjb25kQnV0dG9uTmFtZVwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiU2Vjb25kIGJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFRoaXJkQnV0dG9uTmFtZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTZWNvbmRCdXR0b25OYW1lXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiU2Vjb25kIGJ1dHRvbiBuYW1lIHRvIHNob3cgb24gc2NyZWVuXCJ9LFxyXG4gfSxcclxuXHJcbiBjdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxuIH1cclxuXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGNhcmQgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmRVST1jYy5DbGFzcyh7XHJcbiAgIG5hbWU6XCJDYXJkVUlcIixcclxuICAgcHJvcGVydGllczoge1xyXG4gICAgICAgVG9hc3ROb2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJUb2FzdE5vZGVcIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcIm5vZGUgcmVmZXJlbmNlIGZvciB0b2FzdCBub2RlXCJ9LFxyXG4gICAgICAgVG9hc3RMYWJlbDpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG9hc3RMYWJlbFwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcImxhYmVsIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwifSxcclxuICAgICAgQnV0dG9uTm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwiQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwifSxcclxuICAgICAgICBJbnRlcmFjdGlvbkJ1dHRvbk5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIkludGVyYWN0aW9uQnV0dG9uXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImludGVyYWN0aW9uIEJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIlxyXG4gICAgICAgfSxcclxuICAgICAgIEludGVyYWN0aW9uVHdvQnV0dG9uc05vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGVcIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwidHdvIGludGVyYWN0aW9uIEJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIlxyXG4gICAgICAgfSxcclxuICAgICAgIEludGVyYWN0aW9uVGhyZWVCdXR0b25zTm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSW50ZXJhY3Rpb25UaHJlZUJ1dHRvbnNOb2RlXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJ0aHJlZSBpbnRlcmFjdGlvbiBCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJ9LFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxuXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgZGVja3MgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGVja3NEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJEZWNrc0RhdGFcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBNYWluVUk6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJNYWluVUlcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogQ2FyZFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiVUkgb2YgZGVja3NcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQmlnQnVzaW5lc3M6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJCaWdCdXNpbmVzc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBiaWcgYnVzaW5lc3NcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1hcmtldGluZzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBtYXJrZXRpbmdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIExvc3NlczpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkxvc3Nlc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBsb3NzZXNcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFdpbGRDYXJkczpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIldpbGRDYXJkc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBjYXJkcyBkYXRhIGZvciBXaWxkQ2FyZHNcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFNwYWNlc1R5cGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBFbnVtU3BhY2VUeXBlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBFbnVtU3BhY2VUeXBlLk5vbmUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJzdGF0ZXMgbWFjaGluZXMgYnkgdHlwZSBvZiBjYXJkIG9yIHNwYWNlcyBvbiBib2FyZFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KFwiMVwiKTtcclxuICAgICAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAgICAgLy8gdGhpcy5Db3VudGVyPTA7XHJcbiAgICAgICAgLy8gdGhpcy5HZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCh0aGlzLkNvdW50ZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWRcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlNob3dDYXJkXCIsIHRoaXMuU2hvd0NhcmRJbmZvLCB0aGlzKTtcclxuICAgICAgfSxcclxuICAgIFxyXG4gICAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJTaG93Q2FyZFwiLCB0aGlzLlNob3dDYXJkSW5mbywgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICAgICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIF9oYXNCdXR0b24gPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UsX2hhc1R3b0J1dHRvbj1mYWxzZSkge1xyXG4gICAgICAgIGlmIChfaXNPd25lciAmJiBfaGFzQnV0dG9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9oYXNUd29CdXR0b24pXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuYWN0aXZlID0gZmFsc2U7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfaXNPd25lciAmJiAhX2hhc0J1dHRvbikge1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRXhpdENhcmRJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5CaWdCdXNpbmVzcztcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sIF9pc0JvdCk7XHJcblxyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLk1hcmtldGluZztcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiAgICBcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sIF9pc0JvdCk7XHJcblxyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkxvc3NlcztcclxuICAgICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuICAgICBcclxuICAgICAgICBpZiAodGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucylcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLlNlY29uZEJ1dHRvbk5hbWU7XHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sIF9pc0JvdCx0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNUd29CdXR0b25zKTtcclxuXHJcbiAgICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tV2lsZENhcmQoX2lzT3duZXIsIF9yYW5kb21WYWx1ZSwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuV2lsZENhcmQ7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG4gXHJcbiAgICAgICAgaWYgKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbiwgX2lzQm90LHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpO1xyXG5cclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VJbnZlc3QoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkludmVzdDtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gaW52ZXN0IG9uZSBtb3JlIHRpbWUgaW4gR29sZCBvciBzdG9ja3MgdGhpcyB0dXJuLlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcblxyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZVBheURheShfaXNPd25lciwgX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gUGF5RGF5IHNwYWNlLlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLlBheURheUZ1bmN0aW9uYWxpdHkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCBmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlRG91YmxlUGF5RGF5KF9pc093bmVyLCBfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBEb3VibGVQYXlEYXkgc3BhY2UuXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VPbmVRdWVzdGlvbihfaXNPd25lciwgX2luZGV4LCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuT25lUXVlc3Rpb247XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGFzayBvbmUgcXVlc3Rpb24gdG8gYW55IG90aGVyIHBsYXllciwgaWYgcGxheWVyIGlzIHVuYWJsZSB0byBhbnN3ZXIgdGhleSB3aWxsIHBheSB5b3Ugc29tZSBjYXNoIGFtb3VudC5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0cnVlLCBfaXNCb3QpO1xyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZVNlbGwoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLlNlbGw7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIHNlbGwgYW55IG9uZSBvZiB5b3VyIGJ1c2luZXNzIG9yIGNhbiBza2lwIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRXhlY3V0ZVwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VCdXlPclNlbGwoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkJ1eU9yU2VsbDtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gQnV5IG9yIHNlbGwgR29sZCBvciBzdG9ja3Mgb25lIG1vcmUgdGltZSBpbiB0aGlzIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRXhlY3V0ZVwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsIDIxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VHb0JhY2tTcGFjZXMoX2lzT3duZXIsIF9pbmRleCwgX2lzQm90ID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgICAgICB0aGlzLmlzT3duZXIgPSBfaXNPd25lcjtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGUgPSBFbnVtU3BhY2VUeXBlLkdvQmFja1NwYWNlcztcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcInlvdSB3aWxsIGhhdmUgdG8gZ28gYmFjayAzIHNwYWNlcy5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0cnVlLCBfaXNCb3QpO1xyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2hvd0NhcmRJbmZvOiBmdW5jdGlvbiAobWVzc2FnZSwgX3N0YXRlKSB7XHJcbiAgICAgICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmcgPSBtZXNzYWdlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLlRvYXN0TGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRXhpdENhcmRJbmZvKCkge1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVzZXRDYXJkRGlzcGxheSgpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIC8vZm9yIHRlc3RpbmdcclxuICAgICAgICAvLyB0aGlzLkNvdW50ZXIrKztcclxuICAgICAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIFR3b0J1dHRvbnNGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24obnVsbCwxKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbihldmVudD1udWxsLF90eXBlPTApIHtcclxuICAgICAgICBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkxvc3Nlcykge1xyXG4gICAgICAgICAgICBpZihMb3NzZXNEYXRhPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgdHJ1ZSwgX3R5cGUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLGZhbHNlLF90eXBlKTsgICAgIFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuTWFya2V0aW5nKSB7XHJcbiAgICAgICAgICAgIGlmKE1hcmtldGluZ0RhdGE9PW51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkLCB0cnVlLCBfdHlwZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQsIGZhbHNlLCBfdHlwZSk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5XaWxkQ2FyZCkge1xyXG4gICAgICAgICAgICBpZihXaWxkQ2FyZERhdGE9PW51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLldpbGRDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgdHJ1ZSwgX3R5cGUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLldpbGRDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCwgZmFsc2UsIF90eXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuU2VsbCkge1xyXG4gICAgICAgICAgICB0aGlzLlNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkludmVzdCkge1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuQnV5T3JTZWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5PbmVRdWVzdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLk9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5Hb0JhY2tTcGFjZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5Hb0JhY2tGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja0xvYW4oKSB7XHJcbiAgICAgICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdmFsID0gLTE7XHJcbiAgICAgICAgdmFsID0gX2xvYW5UYWtlbiA9PSB0cnVlID8gMSA6IDA7XHJcbiAgICAgICAgdmFyIFJlc3VsdCA9IGNjLnYyKHZhbCwgX2J1c2luZXNzSW5kZXgpXHJcbiAgICAgICAgcmV0dXJuIFJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgQ29tcGxldGVUdXJuV2l0aFRvYXN0KF9tc2csIF90aW1lKSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX21zZyk7XHJcbiAgICAgICAgICAgIHZhciBfZGVsYXkgPSB0aGlzLmdldFJhbmRvbSgyNTAwLCAzNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5SZXNldENhcmREaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0sIChfZGVsYXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX21zZywgX3RpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSwgKF90aW1lICsgMTAwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShfaWQsIF9oYXNUd29TY3JlZW5zID0gZmFsc2UsX3R5cGU9MCkge1xyXG4gICAgICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICAgICAgSW5kZXggPSBJbmRleCAtIDE7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxXCI6Ly9yZWNlaXZlIDIwMDAwJCBnaWZ0IHRvIHBheW9mZiBsb2FuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcmVzdWx0ID0gdGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBJc0xvYW5UYWtlbiA9IF9yZXN1bHQueDtcclxuICAgICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9yZXN1bHQueTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoSXNMb2FuVGFrZW4gPT0gMSkgLy9tZWFucyB1c2VyIGhhcyB0YWtlbiBsb2FuXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIDIwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJMb2FuIGFtb3VudCBvZiAkMjAwMDAgaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiLCAxODAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbm90IHRha2VuIGFueSBsb2FuLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsIDE4MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOiAvL2hpcmUgbGF3eWVyXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgaGlyZWQgbGF5d2VyLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsIDE4MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLlwiLCAxODAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjZcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI4XCI6Ly9kb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheSBkYXlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLCAxODAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTBcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTFcIjovL3JvbGwgZGljZSB0d2ljZSwgaWYgcmVzdWx0IGlzID4xOSB0aGVuIHRha2UgYWxsIG1vbmV5IGluc2lkZSBtYXJrZXRpbmcuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIERpY2UxUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgRGljZTJSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgdmFyIERpY2UxUmVzdWx0PTEyO1xyXG4gICAgICAgICAgICAgICAgLy8gIHZhciBEaWNlMlJlc3VsdD0xMjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSBEaWNlMVJlc3VsdCArIERpY2UyUmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChUb3RhbFJlc3VsdCA+PSAxOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Ftb3VudCA9IF9hbW91bnQgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIiArIERpY2UxUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiICsgRGljZTJSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFtb3VudCAkXCIgKyBfYW1vdW50ICsgXCIgaGFzIHN1Y2Nlc3NmdWxseSBhZGRlZCBpbiB5b3VyIGNhc2ggZnJvbSBtYXJrZXRpbmcgYW1vdW50IG9uIHRhYmxlLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgNDAwMCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2FjdG9yc0FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIiArIERpY2UxUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiICsgRGljZTJSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIllvdSByYW4gb3V0IG9mIGx1Y2ssIHR1cm4gd2lsbCBza2lwIG5vd1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgNDAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eShfaWQsIF9oYXNUd29TY3JlZW5zID0gZmFsc2UsX3R5cGU9MCkge1xyXG4gICAgICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICAgICAgSW5kZXggPSBJbmRleCAtIDE7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxXCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOi8vWW91IHB1dCBhbiBhZCBvbiBGYWNlYm9vayBmb3IgeW91ciBidXNpbmVzcy4gUm9sbCB0aGUgZGljZTogMSAtIElmIHlvdSByb2xsIGEgNiBvciBsb3dlciwgeW91IGxvc2UgYWxsIG9mIHRoZSBtb25leSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50IDIgLSBJZiB5b3Ugcm9sbCBhIDcgb3IgaGlnaGVyLCB5b3VyIGFkIG5ldHMgeW91IDgwMCUgb2YgdGhlIHRvdGFsIG1vbmV5IGN1cnJlbnRseSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hcmtldGluZ0Ftb3VudCA9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgX211bHRpcGxpZXIgPSA4MDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoX21hcmtldGluZ0Ftb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX2RpY2VSZXN1bHQgfSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgPD0gNilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBkaWNlIHJlc3VsdCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gc2l4LCBzbyB5b3Ugd2lsbCBsb3NlIGFsbCB5b3VyIGN1cnJlbnQgbWFya2V0aW5nIGFtb3VudC5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJEb25lXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF9kaWNlUmVzdWx0ID49IDcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJEaWNlIFJvbGwgUmVzdWx0IDogXCIgKyBfZGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgZGljZSByZXN1bHQgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHNldmVuLCBzbyB5b3Ugd2lsbCBnZXQgODAwJSBwcm9maXQgb24gY3VycmVudCBtYXJrZXRpbmcgYW1vdW50LlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlJlY2VpdmUgQW1vdW50XCI7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RpY2VSZXN1bHQgPSBNYXJrZXRpbmdEYXRhLkRhdGEucmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2RpY2VSZXN1bHQgPD0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChfZGljZVJlc3VsdCA+PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3Jlc3VsdCA9IChfbWFya2V0aW5nQW1vdW50ICogX211bHRpcGxpZXIgLyAxMDApICsgX21hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX3Jlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgcHJvZml0IG9mICRcIiArIF9yZXN1bHQrXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudC5cIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIzXCI6Ly9Zb3VyIGFkIGNvbnRhaW5zIGZhbHNlIGNsYWltcyBhbmQgcmVzdWx0IGluIGEgZ292ZXJubWVudCBpbnZlc3RpZ2F0aW9uLiBZb3UgbG9zZSB5b3VyIGVudGlyZSBNYXJrZXRpbmcgQWNjb3VudCwgcGx1cyBwYXkgbGF3eWVyIGZlZXMgb2YgJDMsMDAwIHBlciBidXNpbmVzcyB0byB0aGUgYmFuay4gSWYgeW91IGhhdmUgYSBsYXd5ZXIsIHlvdSBkbyBub3QgaGF2ZSB0byBwYXkgdGhlIGV4dHJhICQzLDAwMCBpbiBmZWVzLCBwZXIgYnVzaW5lc3MuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hcmtldGluZ0Ftb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sYXd5ZXJTdGF0dXMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuICAgICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudCArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2hhc01hcmtldGluZ0Ftb3VudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMzAwMDtcclxuICAgICAgICAgICAgICAgIHZhciBfdG90YWxBbW91bnQgPSBfbXVsdGlwbGllciAqIF9idXNpbmVzc0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX21hcmtldGluZ0Ftb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oYXNNYXJrZXRpbmdBbW91bnQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2xhd3llclN0YXR1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgIF90b3RhbEFtb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfdG90YWxBbW91bnQgfSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiTWFya2V0aW5nIEFtb3VudCA6ICRcIiArIF9tYXJrZXRpbmdBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiTGF3eWVyIEhpcmVkIDogXCIgKyBfbGF3eWVyU3RhdHVzICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIE51bWJlciBvZiBidXNpbmVzcyA6IFwiICsgX2J1c2luZXNzQW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkZlZXMgOiBcIitfYnVzaW5lc3NBbW91bnQrXCIgKiBcIitfbXVsdGlwbGllcitcIiA9ICRcIitfdG90YWxBbW91bnQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRG9uZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF90b3RhbEFtb3VudCA9IE1hcmtldGluZ0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX3RvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbGF3eWVyU3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIGhpcmVkIGxhd3llciwgeW91IG9ubHkgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19tYXJrZXRpbmdBbW91bnQsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF90b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhdmUgbm90IGhpcmVkIGFueSBsYXd5ZXIsIGJpbGwgJFwiICsgX3RvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkIGFsb25nIHdpdGggbWFya2V0aW5nIGFtb3VudCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI0XCI6Ly9Zb3VyIE1hcmtldGluZyBBY2NvdW50IHRyaXBsZXMsIGJ1dCB5b3UgbXVzdCBsZWF2ZSBpdCBpbiB0aGUgYWNjb3VudC5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBfbXVsdGlwbGllciA9IDM7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2luY3JlYXNlQW1vdW50ID0gX21hbmFnZXIuTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9pbmNyZWFzZUFtb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIiArIF9tYXJrZXRBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiICsgX21hcmtldEFtb3VudCArIFwiICogXCIgKyBfbXVsdGlwbGllciArIFwiID0gXCIgKyBfaW5jcmVhc2VBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInlvdXIgbWFya2V0aW5nIGFtb3VudCBoYXMgYmVlbiBzdWNlc3NmdWxseSBpbmNyZWFzZSB0byAkXCIgKyBfaW5jcmVhc2VBbW91bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCAzNjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjVcIjovL1lvdSBoaXJlIGEgTWFya2V0aW5nIEZpcm0gdG8gbWFya2V0IHlvdXIgYnVzaW5lc3MgYnV0IGl0IHlpZWxkcyBubyByZXN1bHRzLiBZb3UgbG9zZSB5b3VyIGVudGlyZSBtYXJrZXRpbmcgYWNjb3VudCB0byB0aGUgQmFuay4gUGx1cyBwYXkgJDUsMDAwIGZvciB0aGVpciBzZXJ2aWNlcy5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBiaWxsID0gNTAwMDtcclxuICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gYmlsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQgPSBfbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IGJpbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRmVlcyAkXCIgKyBiaWxsICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkIGFsb25nIHdpdGggbWFya2V0aW5nIGFtb3VudCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBjYXNoLHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI2XCI6Ly9Zb3UgYmVnaW4gYSBuZXcgbWFya2V0aW5nIGNhbXBhaWduLiBSb2xsIDEgZGllLiBJZiBpdCBpcyBhbiBldmVuIG51bWJlciwgeW91ciBjYW1wYWlnbiBpcyBzdWNjZXNzZnVsIGFuZCB5b3UgcmVjZWl2ZSBhbGwgb2YgdGhlIG1vbmV5IGluIHlvdXIgbWFya2V0aW5nIGFjY291bnQgYmFjayBwbHVzIDUwMCUuIElmIGl0IGlzIGFuIG9kZCBudW1iZXIgeW91IGxvc2UgYWxsIG9mIHRoZSBtb25leSBpbiB5b3VyIG1hcmtldGluZyBhY2NvdW50LlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYXJrZXRpbmdBbW91bnQgPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9kaWNlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gNTAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzRXZlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfbWFya2V0aW5nQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWNlUmVzdWx0ICUgMiA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0V2ZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE1hcmtldGluZ0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfZGljZVJlc3VsdCxJc0V2ZW46aXNFdmVuIH0gfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWNlUmVzdWx0ICUyPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0V2ZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBkaWNlIHJlc3VsdCBpcyBvZGQsIHNvIHlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgY3VycmVudCBtYXJrZXRpbmcgYW1vdW50LlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkRvbmVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoX2RpY2VSZXN1bHQgJTI9PTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRXZlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgX2RpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIGRpY2UgcmVzdWx0IGlzIGV2ZW4sIHNvIHlvdSB3aWxsIGdldCA1MDAlIHByb2ZpdCBvbiBjdXJyZW50IG1hcmtldGluZyBhbW91bnQuXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUmVjZWl2ZSBBbW91bnRcIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IE1hcmtldGluZ0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFdmVuID0gTWFya2V0aW5nRGF0YS5EYXRhLklzRXZlbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0V2ZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoaXNFdmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3Jlc3VsdCA9IChfbWFya2V0aW5nQW1vdW50ICogX211bHRpcGxpZXIgLyAxMDApICsgX21hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIHByb2ZpdCBvZiAkXCIgKyBfcmVzdWx0K1wiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQuXCIsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjdcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjhcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyNDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiOVwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG4gICAgICAgICAgICAgICAgTWFya2V0aW5nRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2xvc2VBbW91bnQgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiICsgX2xvc2VBbW91bnQsIDI0MDApO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjEwXCI6Ly9SZWNlaXZlIGFsbCBvZiB5b3VyIE1hcmtldGluZyBCdWRnZXQgYmFjaywgcGx1cyA3MDAlIHByb2ZpdC5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBfcHJvZml0ID0gNzAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQgPSBfbWFuYWdlci5HZXRNYXJrZXRpbmdNb25leShfcHJvZml0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2Ftb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIiArIF9tYXJrZXRBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiICsgX21hcmtldEFtb3VudCArIFwiICsgKFwiICsgX21hcmtldEFtb3VudCArIFwiKlwiICsgX3Byb2ZpdCArIFwiICkvMTAwXCIgKyBcIiA9IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieW91ciBjYXNoIGFtb3VudCBoYXMgYmVlbiBzdWNlc3NmdWxseSBpbmNyZWFzZSBieSAkXCIgKyBfYW1vdW50ICsgXCIsIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCA0MDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjExXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjE0XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXRpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyMTAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIExvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KF9pZCwgX2hhc1R3b1NjcmVlbnMgPSBmYWxzZSxfdHlwZT0wKVxyXG4gICAge1xyXG4gICAgICB2YXIgSW5kZXg9cGFyc2VJbnQoX2lkKTtcclxuICAgICAgSW5kZXg9SW5kZXgtMTtcclxuXHJcbiAgICAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICAgICBjYXNlIFwiMVwiOi8vbG9zZSBuZXh0IHR1cm5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwTmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCBsb3NlIHlvdXIgbmV4dCB0dXJuLlwiLDI0MDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6IC8vUm9sbCAyIGRpY2UsIG11bHRpcGx5IGJ5ICQ1LDAwMCBhbmQgcGF5IGl0IHRvIHRoZSBCYW5rLiBJZiB5b3UgaGF2ZSBhIGxhd3llciB5b3UgbG9zZSA1MCUgb2YgdGhlIHRvdGFsIGJpbGwgY3VycmVudGx5IG93ZWQuXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBEaWNlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgICAgICAgIHZhciBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgdmFyIF9oaXJlZExhd3llcjtcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgICAgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgQ2FzaE11bGl0cGxpZXIgPSA1MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgICAgICAgICAgICBfaGlyZWRMYXd5ZXIgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuXHJcbiAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogVG90YWxSZXN1bHQsIGxhd3llcjogX2hpcmVkTGF3eWVyIH0gfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiXFxuXCIgKyBcIkRpY2UgUm9sbCBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQmlsbCBDYWxjdWxhdGVkIDogXCIgKyBEaWNlUmVzdWx0ICsgXCIgKiBcIiArIENhc2hNdWxpdHBsaWVyICsgXCIgPSAkXCIgKyBUb3RhbFJlc3VsdCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coTG9zc2VzRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICBUb3RhbFJlc3VsdCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICBfaGlyZWRMYXd5ZXIgPSBMb3NzZXNEYXRhLkRhdGEubGF3eWVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIGlmIChfaGlyZWRMYXd5ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvdGFsUmVzdWx0ID0gVG90YWxSZXN1bHQgLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gVG90YWxSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2hpcmVkTGF3eWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIGhpcmVkIGxhd3llciwgaGFsZiBiaWxsICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGF2ZSBub3QgaGlyZWQgYW55IGxhd3llciwgYmlsbCAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyBib3QgYW5kIGhhcyBubyBjYXNoLHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjNcIjovL2xvc2UgYWxsIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBuZXh0IFBheSBEYXkuXCIsMjQwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjovL1llYXJseSBidXNpbmVzcyBpbnN1cmFuY2UgcHJlbWl1bSBpcyBkdWUuIFBheSAkMiwwMDAgdG8gdGhlIEJhbmsgZm9yIGVhY2ggSG9tZS1CYXNlZCBidXNpbmVzcywgJDUsMDAwIGZvciBlYWNoIEJyaWNrICYgTW9ydGFyIGJ1c2luZXNzLlxyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgaG9tZUJhc2VkQnVzaW5lc3MgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgdmFyIGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgICAgICAgICB2YXIgaG9tZU11bHRpcGxpZXIgPSAyMDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgYnJpY2tNdWxpcGxpZXIgPSA1MDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgdG90YWxBbW91bnQgPSAoaG9tZUJhc2VkQnVzaW5lc3MgKiBob21lTXVsdGlwbGllcikgKyAoYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyAqIGJyaWNrTXVsaXBsaWVyKTtcclxuICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogdG90YWxBbW91bnQgfSB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkhvbWUgQmFzZWQgQW1vdW50IDogXCIgKyBob21lQmFzZWRCdXNpbmVzcytcIiAqICRcIitob21lTXVsdGlwbGllcitcIiA9ICRcIisgKGhvbWVCYXNlZEJ1c2luZXNzKmhvbWVNdWx0aXBsaWVyKSsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkJyaWNrICYgTW9ydGFyIEFtb3VudCA6IFwiICsgYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyArIFwiICogJFwiICsgYnJpY2tNdWxpcGxpZXIgKyBcIiA9ICRcIiArIChicmlja0FuZE1vcnRhckJ1c2luZXNzICogYnJpY2tNdWxpcGxpZXIpICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIEFtb3VudCA6IFwiKyhob21lQmFzZWRCdXNpbmVzcypob21lTXVsdGlwbGllcikrXCIgKyBcIisoYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyAqIGJyaWNrTXVsaXBsaWVyKStcIiA9ICRcIit0b3RhbEFtb3VudCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgdG90YWxBbW91bnQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0b3RhbEFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSB0b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyB0b3RhbEFtb3VudCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIG1vbmV5LCBza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjVcIjovL1lvdXIgZW1wbG95ZWUgY2xhaW1zIHlvdSBzZXh1YWxseSBoYXJhc3NlZCB0aGVtLCBidXQgeW91IGRpZCBub3QuIFlvdSBjYW4gZWl0aGVyOyAgMSAtIFNldHRsZSBvdXQgb2YgY291cnQgYW5kIHBheSB0aGVtICQ1MCwwMDAuIDIgLSBUYWtlIHlvdXIgY2hhbmNlcyBpbiBjb3VydC4gUm9sbCAyIGRpY2UgYW5kIHBheSAkMTAsMDAwIHRpbWVzIHRoZSBudW1iZXIgcm9sbGVkLlxyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX2NvdXJ0U2V0dGxlbWVudEZlZXMgPSA1MDAwMDtcclxuICAgICAgICAgICAgICAgdmFyIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgIHZhciBDYXNoTXVsaXRwbGllciA9IDEwMDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgdG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgICAgICAgICAgIGlmIChfdHlwZSA9PSAwKSB7IC8vZmlyc3QgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfY291cnRTZXR0bGVtZW50RmVlcywgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiUGF5YWJsZSBhbW91bnQgOiAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMSkgeyAvLzJuZCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBEaWNlUmVzdWx0LCBUb3RhbEFtb3VudDogdG90YWxBbW91bnQsIFR5cGU6IF90eXBlIH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBBbW91bnQgOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9ICRcIiArIHRvdGFsQW1vdW50LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9IGVsc2UgeyBcclxuICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wVHlwZSA9IExvc3Nlc0RhdGEuRGF0YS5UeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgaWYgKHRlbXBUeXBlID09IDApXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgX2NvdXJ0U2V0dGxlbWVudEZlZXMgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfY291cnRTZXR0bGVtZW50RmVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfY291cnRTZXR0bGVtZW50RmVlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcyArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVtcFR5cGUgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSB0b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgdG90YWxBbW91bnQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOi8vIElmIEJ1c2luZXNzICMxIGlzIEhvbWUgQmFzZWQsIHBheSBhICQ1LDAwMCBJbnN1cmFuY2UgRGVkdWN0aWJsZTsgaWYgQnJpY2sgJiBNb3J0YXIgJDEwLDAwMCBkZWR1Y3RpYmxlLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgdmFyIF9idXNpbmVzc1R5cGU9cGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlKTtcclxuICAgICAgICAgICAgIGlmKF9idXNpbmVzc1R5cGU9PTEpIC8vIGZpcnN0IGJ1c2luZXNzIHdhcyBob21lIGJhc2VkXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSA1MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBwYXllZCAkNTAwMCBpbnN1cmFuY2Ugb24geW91ciBmaXJzdCBob21lIGJhc2VkIGJ1c2luZXNzLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlIGlmIChfYnVzaW5lc3NUeXBlPT0yKSAvL2ZpcnN0IGJ1c2lvbmVzcyB3YXMgYnJpY2sgJiBtb3J0YXJcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD49MTAwMDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtPTEwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJDEwMDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzLCByZW1haW5pbmcgY2FzaCBpcyAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDQyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOi8vbG9zZSB5b3VyIG5leHQgUGF5IERheSBmb3IgYWxsIG9mIHlvdXIgaG9tZS1iYXNlZCBidXNpbmVzc2VzLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSB3aWxsIGxvc2UgeW91ciBuZXh0IFBheSBEYXkgZm9yIGFsbCBvZiB5b3VyIGhvbWUtYmFzZWQgYnVzaW5lc3Nlcy5cIiwyNDAwKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI4XCI6Ly9Zb3UgYXJlIGZpbmVkIDUwJSBvZiB5b3VyIGN1cnJlbnQgbGlxdWlkIGNhc2guIElmIHlvdSBoYXZlIGEgbGF3eWVyLCB5b3VyIGZpbmUgaXMgcmVkdWNlZCB0byAyMCUgb2YgeW91ciBjdXJyZW50IGxpcXVpZCBjYXNoLlxyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgIHZhciBfaGlyZWRMYXd5ZXI7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBUb3RhbFJlc3VsdCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgIF9oaXJlZExhd3llciA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBUb3RhbFJlc3VsdCwgbGF3eWVyOiBfaGlyZWRMYXd5ZXIgfSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiVG90YWwgQ2FzaCA6ICRcIiArIFRvdGFsUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcIjUwJSBvZiBUb3RhbCBDYXNoIDogJFwiICsgKFRvdGFsUmVzdWx0IC8gMiksIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhMb3NzZXNEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgIFRvdGFsUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgIF9oaXJlZExhd3llciA9IExvc3Nlc0RhdGEuRGF0YS5sYXd5ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9oaXJlZExhd3llcikgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSAoVG90YWxSZXN1bHQgKiAyMCkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgIFRvdGFsUmVzdWx0ID0gKFRvdGFsUmVzdWx0ICogNTApIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBUb3RhbFJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChfaGlyZWRMYXd5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgaGlyZWQgbGF3eWVyLCByZWR1Y2VkIGZpbmUgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYXZlIG5vdCBoaXJlZCBhbnkgbGF3eWVyLCBmaW5lICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vIG1vbmV5LCBza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOi8vQSBjdXN0b21lciBpcyBpbmp1cmVkIGF0IG9uZSBvZiB5b3VyIGJ1c2luZXNzIGxvY2F0aW9ucy4gWW91IGNhbiBlaXRoZXI7IDEgLSBTZXR0bGUgb3V0IG9mIGNvdXJ0IGFuZCBwYXkgdGhlbSAkMjUsMDAwICwgMiAtIFRha2UgeW91ciBjaGFuY2VzIGluIGNvdXJ0LiBSb2xsIDIgZGljZSBhbmQgcGF5ICQ1LDAwMCB0aW1lcyB0aGUgbnVtYmVyIHJvbGxlZC5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfY291cnRTZXR0bGVtZW50RmVlcyA9IDI1MDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gNTAwMDtcclxuICAgICAgICAgICAgICAgdmFyIHRvdGFsQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX3R5cGUgPT0gMCkgeyAvL2ZpcnN0IGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogX2NvdXJ0U2V0dGxlbWVudEZlZXMsIFR5cGU6IF90eXBlIH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlBheWFibGUgYW1vdW50IDogJFwiICsgX2NvdXJ0U2V0dGxlbWVudEZlZXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpIHsgLy8ybmQgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB0b3RhbEFtb3VudCA9IERpY2VSZXN1bHQgKiBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0geyBEYXRhOiB7IHJlc3VsdDogRGljZVJlc3VsdCwgVG90YWxBbW91bnQ6IHRvdGFsQW1vdW50LCBUeXBlOiBfdHlwZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJEaWNlIFJlc3VsdCA6IFwiICsgRGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQW1vdW50IDogXCIgKyBEaWNlUmVzdWx0ICsgXCIgKiBcIiArIENhc2hNdWxpdHBsaWVyICsgXCIgPSAkXCIgKyB0b3RhbEFtb3VudCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfSBlbHNlIHsgXHJcbiAgICAgICAgICAgICAgICAgICB2YXIgdGVtcFR5cGUgPSBMb3NzZXNEYXRhLkRhdGEuVHlwZTtcclxuICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wVHlwZSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIF9jb3VydFNldHRsZW1lbnRGZWVzID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX2NvdXJ0U2V0dGxlbWVudEZlZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gX2NvdXJ0U2V0dGxlbWVudEZlZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgX2NvdXJ0U2V0dGxlbWVudEZlZXMgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRlbXBUeXBlID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgRGljZVJlc3VsdCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdG90YWxBbW91bnQgPSBMb3NzZXNEYXRhLkRhdGEuVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSB0b3RhbEFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gdG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIHRvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTBcIjovL1lvdXIgY29tcHV0ZXIgaGFzIGJlZW4gaGFja2VkISBZb3UgY2F0Y2ggaXQgaW4gdGltZSwgYnV0IHlvdSBtdXN0IGJ1eSBtb3JlIHNlY3VyaXR5IGZvciB5b3VyIGJ1c2luZXNzIHJlY29yZHMuIFBheSAkMjAsMDAwIHRvIHRoZSBCYW5rLlxyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgYmlsbCA9IDIwMDAwO1xyXG4gICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IGJpbGwpIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBiaWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgYmlsbCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTFcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBXaWxkQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLF90eXBlPTApXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9kb3VibGVzIHlvdXIgaW5jb21lIG9uIHRoZSBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMjQwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjovL1JvbGwgMSBkaWUsIG11bHRpcGx5IHJlc3VsdCBieSAkNSwwMDAgYW5kIHJlY2VpdmUgeW91ciBhZHZhbmNlIGZyb20gdGhlIEJhbmsuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBEaWNlUmVzdWx0PV9tYW5hZ2VyLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXI9NTAwMDtcclxuICAgICAgICAgICAgIHZhciBUb3RhbFJlc3VsdD1EaWNlUmVzdWx0KkNhc2hNdWxpdHBsaWVyO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9VG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgUmVzdWx0OiBcIitEaWNlUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK0RpY2VSZXN1bHQrXCIgKiBcIitDYXNoTXVsaXRwbGllcitcIiA9IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJBbW91bnQgJFwiK1RvdGFsUmVzdWx0K1wiIGhhcyBiZWVuIGFkZGVkIGludG8geW91ciBjYXNoLlwiXHJcbiAgICAgICAgICAgICAgICAsNDAwMCk7XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6Ly9Zb3UgZ28gdG8gYW4gRXN0YXRlIEF1Y3Rpb24gYW5kIGJ1eSBhIHBhaW50aW5nIHRoYXQgdHVybnMgb3V0IHRvIGJlIHZhbHVhYmxlLiBZb3UgY2FuIHNlbGwgaXQgbm93LCByb2xsIGJvdGggZGljZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQxMCwwMDAgYW5kIHJlY2VpdmUgcHJvZml0cyBmcm9tIHRoZSBCYW5rLlxyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyPTEwMDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ9RGljZVJlc3VsdCpDYXNoTXVsaXRwbGllcjtcclxuICBcclxuICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz1Ub3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIrRGljZVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK0RpY2VSZXN1bHQrXCIgKiBcIitDYXNoTXVsaXRwbGllcitcIiA9IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICAgXCJBbW91bnQgJFwiK1RvdGFsUmVzdWx0K1wiIGhhcyBiZWVuIGFkZGVkIGludG8geW91ciBjYXNoLlwiXHJcbiAgICAgICAgICAgICAgICAgICw1MjAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOi8vWW91ciBidXNpbmVzcyBpcyBhdWRpdGVkIGJ5IHRoZSBJUlMgYW5kIHlvdSBoYXZlIG5vdCBiZWVuIGtlZXBpbmcgdmVyeSBnb29kIHJlY29yZHMgb2YgdGhlIGluY29tZSBhbmQgZXhwZW5zZXMgZm9yIHlvdXIgYnVzaW5lc3MuIFRoZXkgZmluZSB5b3UgJDMwLDAwMC4gSWYgeW91IGhhdmUgYSBsYXd5ZXIsIHlvdXIgZmluZSBpcyAkMTUsMDAwLlxyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX2ZpbmUgPSAzMDAwMDtcclxuICAgICAgICAgICAgICAgdmFyIF9sYXd5ZXJTdGF0dXMgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cztcclxuICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKVxyXG4gICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9sYXd5ZXJTdGF0dXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX2ZpbmUgPSBfZmluZSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfZmluZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiTGF3eWVyIEhpcmVkIDogXCIgKyBfbGF3eWVyU3RhdHVzICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgZmluZSAkXCIrX2ZpbmUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIF9maW5lID0gV2lsZENhcmREYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfZmluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfZmluZTtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRmVlcyAkXCIgKyBfZmluZSArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgMjgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gY2FzaCxza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOi8vWW91IGNhbiBiZWNvbWUgYSB2ZW5kb3IgYXQgYSBsb2NhbCBKYXp6IEZlc3RpdmFsIGZvciBhIHZlbmRpbmcgZmVlIG9mICQyMCwwMDAuIElmIHlvdSBhY2NlcHQsIHBheSB0aGUgQmFuayAkMjAsMDAwIGFuZCByb2xsIHR3byBkaWU7IG11bHRpcGx5IHRoZSByZXN1bHQgYnkgJDUsMDAwIGFuZCByZWNlaXZlIHlvdXIgdmVuZGluZyBpbmNvbWUgZnJvbSB0aGUgQmFuay5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9mZWVzID0gMjAwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBfbXVsdGlwbGllciA9IDUwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBfZGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgdmFyIF9yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIGlmIChfdHlwZSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHQgPSBfZGljZVJlc3VsdCAqIF9tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9yZXN1bHQsIERpY2U6IF9kaWNlUmVzdWx0IH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9mZWVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9mZWVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0OiBcIiArIF9kaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBBbW91bnQgOiBcIitfZGljZVJlc3VsdCtcIiAqIFwiK19tdWx0aXBsaWVyK1wiID0gJFwiK19yZXN1bHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlJlY2VpdmUgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIiwyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwic2tpcHBpbmcgdHVybiBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBfZGljZVJlc3VsdCA9IFdpbGRDYXJkRGF0YS5EYXRhLkRpY2U7XHJcbiAgICAgICAgICAgICAgICAgICBfcmVzdWx0ID0gV2lsZENhcmREYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgV2lsZENhcmREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkNhc2ggYW1vdW50ICRcIitfcmVzdWx0K1wiIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBhZGRlZC5cIiwzMDAwKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOi8vcGF5IG9mZiB5b3VyIGxvYW4gZm9yIHlvdXIgQnJpY2sgJiBNb3J0YXIgQnVzaW5lc3MuIElmIHlvdSBoYXZlIG5vIGxvYW4gb3V0c3RhbmRpbmcsIHJlY2VpdmUgJDUwLDAwMC5cclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBXaWxkQ2FyZERhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgdmFyIF9sb2FuUmVzZXQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3R5cGU9cGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZihfdHlwZT09MiAmJiBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hblJlc2V0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKF9sb2FuUmVzZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91ciBvdXRzdGFuZGluZyBsb2FuIGhhcyBiZWVuIHBheWVkIG9mZi5cIiwzMjAwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz01MDAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBubyBsb2FuLCBhbW91bnQgJDUwMDAwIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaFwiLDMyMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTBcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6Ly8gcmVjZWl2ZSBkb3VibGUgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIGFsbCBvZiB5b3VyIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIFdpbGRDYXJkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwyNDAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEludmVzdEZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBQYXlEYXlGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuXHJcbiAgICB9LFxyXG4gICAgRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFNlbGxGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgR29CYWNrRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cz0gRGVja3NEYXRhO1xyXG4iXX0=