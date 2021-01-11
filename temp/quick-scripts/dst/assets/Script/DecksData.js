
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
var LossesData = null; //-------------------------------------------Spaces Data-------------------------//

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

    this.IsBotTurn = _isBot;
    this.SpacesType = EnumSpaceType.WildCard;
    this.SelectedCardIndex = _randomValue;
    this.isOwner = _isOwner;
    this.CardSelected = this.WildCards[this.SelectedCardIndex].ID;
    if (this.WildCards[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.WildCards[this.SelectedCardIndex].ButtonName;
    this.ShowCardInfo(this.WildCards[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.WildCards[this.SelectedCardIndex].HasButton, _isBot);

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
    } else if (this.SpacesType == EnumSpaceType.Losses && LossesData == null) {
      this.LossesCardFunctionality(this.CardSelected, true, _type);
    } else if (this.SpacesType == EnumSpaceType.Losses && LossesData != null) {
      this.LossesCardFunctionality(this.CardSelected, false, _type);
    } else if (this.SpacesType == EnumSpaceType.Marketing) {
      this.MarketingCardFunctionality(this.CardSelected);
    } else if (this.SpacesType == EnumSpaceType.WildCard) {
      this.WildCardFunctionality(this.CardSelected);
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
  BigBusinessCardFunctionality: function BigBusinessCardFunctionality(_id) {
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
  MarketingCardFunctionality: function MarketingCardFunctionality(_id) {
    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2100);else this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        break;

      case "2":
        console.log(this.Marketing[Index].Description);
        break;

      case "3":
        console.log(this.Marketing[Index].Description);
        break;

      case "4":
        //Your Marketing Account triples, but you must leave it in the account.
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
        var _multiplier = 3;

        var _increaseAmount = _manager.MultiplyMarketingMoney(_multiplier);

        if (_increaseAmount > 0) {
          this.CompleteTurnWithToast("Marketing Amount: $" + _marketAmount + "\n" + "\n" + "Total: " + _marketAmount + " * " + _multiplier + " = " + _increaseAmount + "\n" + "\n" + "\n" + "your marketing amount has been sucessfully increase to $" + _increaseAmount, 3100);
        } else {
          this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        }

        break;

      case "5":
        console.log(this.Marketing[Index].Description);
        break;

      case "6":
        console.log(this.Marketing[Index].Description);
        break;

      case "7":
        console.log(this.Marketing[Index].Description);
        break;

      case "8":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2100);else this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        break;

      case "9":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2100);else this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        break;

      case "10":
        //Receive all of your Marketing Budget back, plus 700% profit.
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
        var _profit = 700;

        var _amount = _manager.GetMarketingMoney(_profit);

        if (_amount > 0) {
          this.CompleteTurnWithToast("Marketing Amount: $" + _marketAmount + "\n" + "\n" + "Total: " + _marketAmount + " + (" + _marketAmount + "*" + _profit + " )/100" + " = " + _amount + "\n" + "\n" + "\n" + "your cash amount has been sucessfully increase by $" + _amount + ", total cash becomes $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4000);
        } else {
          this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
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
  WildCardFunctionality: function WildCardFunctionality(_id) {
    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //doubles your income on the next Pay Day.
        console.log(this.WildCards[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        _manager.ToggleDoublePayNextTurn(true);

        this.CompleteTurnWithToast("You will receive double profits on next payday.", 1800);
        break;

      case "2":
        //Roll 1 die, multiply result by $5,000 and receive your advance from the Bank.
        console.log(this.WildCards[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var DiceResult = _manager.RollOneDice();

        var CashMulitplier = 5000;
        var TotalResult = DiceResult * CashMulitplier;
        _manager.PlayerGameInfo[_playerIndex].Cash += TotalResult;
        this.CompleteTurnWithToast("Dice Result: " + DiceResult + "\n" + "\n" + "Total: " + DiceResult + " * " + CashMulitplier + " = " + TotalResult + "\n" + "\n" + "\n" + "Amount $" + TotalResult + " has been added into your cash.", 4000);
        break;

      case "3":
        console.log(this.WildCards[Index].Description);
        break;

      case "4":
        console.log(this.WildCards[Index].Description);
        break;

      case "5":
        console.log(this.WildCards[Index].Description);
        break;

      case "6":
        console.log(this.WildCards[Index].Description);
        break;

      case "7":
        //pay off your loan for your Brick & Mortar Business. If you have no loan outstanding, receive $50,000.
        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

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
          this.CompleteTurnWithToast("your outstanding loan has been payed off.", 2800);
        } else {
          _manager.PlayerGameInfo[_playerIndex].Cash += 50000;
          this.CompleteTurnWithToast("you had no loan, amount $50000 has been added to your cash", 2800);
        }

        console.log(this.WildCards[Index].Description);
        break;

      case "8":
        console.log(this.WildCards[Index].Description);
        break;

      case "9":
        console.log(this.WildCards[Index].Description);
        break;

      case "10":
        console.log(this.WildCards[Index].Description);
        break;

      case "11":
        // receive double your business profits on all of your businesses.
        console.log(this.WildCards[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        _manager.ToggleDoublePayNextTurn(true);

        this.CompleteTurnWithToast("You will receive double profits on next payday.", 1800);
        break;

      case "12":
        console.log(this.WildCards[Index].Description);
        break;

      case "13":
        console.log(this.WildCards[Index].Description);
        break;

      case "14":
        console.log(this.WildCards[Index].Description);
        break;

      case "15":
        console.log(this.WildCards[Index].Description);
        break;

      default:
        break;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiTG9zc2VzRGF0YSIsIkVudW1TcGFjZVR5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiV2lsZENhcmQiLCJCaWdCdXNpbmVzcyIsIk1hcmtldGluZyIsIkludmVzdCIsIkxvc3NlcyIsIlBheURheSIsIkRvdWJsZVBheURheSIsIk9uZVF1ZXN0aW9uIiwiU2VsbCIsIkJ1eU9yU2VsbCIsIkdvQmFja1NwYWNlcyIsIkNhcmREYXRhIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIklEIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiVGV4dCIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJEZXNjcmlwdGlvbiIsIkhhc0J1dHRvbiIsIkhhc1R3b0J1dHRvbnMiLCJIYXNUaHJlZUJ1dHRvbnMiLCJCdXR0b25OYW1lIiwiU2Vjb25kQnV0dG9uTmFtZSIsIlRoaXJkQnV0dG9uTmFtZSIsImN0b3IiLCJDYXJkVUkiLCJUb2FzdE5vZGUiLCJOb2RlIiwiVG9hc3RMYWJlbCIsIkxhYmVsIiwiQnV0dG9uTm9kZSIsIkludGVyYWN0aW9uQnV0dG9uTm9kZSIsIkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUiLCJJbnRlcmFjdGlvblRocmVlQnV0dG9uc05vZGUiLCJEZWNrc0RhdGEiLCJDb21wb25lbnQiLCJNYWluVUkiLCJXaWxkQ2FyZHMiLCJTcGFjZXNUeXBlIiwib25Mb2FkIiwiQ2hlY2tSZWZlcmVuY2VzIiwiU2VsZWN0ZWRDYXJkSW5kZXgiLCJDYXJkU2VsZWN0ZWQiLCJJc0JvdFR1cm4iLCJpc093bmVyIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU2hvd0NhcmRJbmZvIiwib25EaXNhYmxlIiwib2ZmIiwicmVxdWlyZSIsImdldFJhbmRvbSIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIlRvZ2dsZUJ1dHRvbnMiLCJfaXNPd25lciIsIl9oYXNCdXR0b24iLCJfaXNCb3QiLCJfaGFzVHdvQnV0dG9uIiwiYWN0aXZlIiwic2V0VGltZW91dCIsIkV4aXRDYXJkSW5mbyIsIkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkIiwiX3JhbmRvbVZhbHVlIiwiY2hpbGRyZW4iLCJnZXRDb21wb25lbnQiLCJzdHJpbmciLCJDYXJkRnVudGlvbmFsaXR5QnV0dG9uIiwiR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkIiwiR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkIiwiR2VuZXJhdGVSYW5kb21XaWxkQ2FyZCIsIlNwYWNlSW52ZXN0IiwiX2luZGV4IiwiQ29tcGxldGVUdXJuV2l0aFRvYXN0IiwiU3BhY2VQYXlEYXkiLCJQYXlEYXlGdW5jdGlvbmFsaXR5IiwiU3BhY2VEb3VibGVQYXlEYXkiLCJEb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5IiwiU3BhY2VPbmVRdWVzdGlvbiIsIlNwYWNlU2VsbCIsIlNwYWNlQnV5T3JTZWxsIiwiU3BhY2VHb0JhY2tTcGFjZXMiLCJtZXNzYWdlIiwiX3N0YXRlIiwiSW5zdGFuY2UiLCJHZXRfR2FtZU1hbmFnZXIiLCJSZXNldENhcmREaXNwbGF5IiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlR3b0J1dHRvbnNGdW5jdGlvbmFsaXR5IiwiZXZlbnQiLCJfdHlwZSIsIkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJMb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSIsIk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5IiwiV2lsZENhcmRGdW5jdGlvbmFsaXR5IiwiU2VsbEZ1bmN0aW9uYWxpdHkiLCJJbnZlc3RGdW5jdGlvbmFsaXR5IiwiQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSIsIk9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSIsIkdvQmFja0Z1bmN0aW9uYWxpdHkiLCJDaGVja0xvYW4iLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJfbWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkdldFR1cm5OdW1iZXIiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwiTm9PZkJ1c2luZXNzIiwibGVuZ3RoIiwiTG9hblRha2VuIiwidmFsIiwiUmVzdWx0IiwidjIiLCJfbXNnIiwiX3RpbWUiLCJjb25zb2xlIiwibG9nIiwiX2RlbGF5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwiX2lkIiwiSW5kZXgiLCJwYXJzZUludCIsIl9yZXN1bHQiLCJJc0xvYW5UYWtlbiIsIngiLCJ5IiwiTG9hbkFtb3VudCIsIkxhd3llclN0YXR1cyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiRGljZTFSZXN1bHQiLCJSb2xsVHdvRGljZXMiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX21vZGUiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiX2Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkNhc2giLCJfYWN0b3JzQXJyYXkiLCJnZXRQaG90b25SZWYiLCJteVJvb21BY3RvcnNBcnJheSIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9sb3NlQW1vdW50IiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX21hcmtldEFtb3VudCIsIl9tdWx0aXBsaWVyIiwiX2luY3JlYXNlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9oYXNUd29TY3JlZW5zIiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiRGljZVJlc3VsdCIsIkNhc2hNdWxpdHBsaWVyIiwiX2hpcmVkTGF3eWVyIiwiRGF0YSIsInJlc3VsdCIsImxhd3llciIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsImhvbWVCYXNlZEJ1c2luZXNzIiwiSG9tZUJhc2VkQW1vdW50IiwiYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiaG9tZU11bHRpcGxpZXIiLCJicmlja011bGlwbGllciIsInRvdGFsQW1vdW50IiwiX2NvdXJ0U2V0dGxlbWVudEZlZXMiLCJUeXBlIiwiVG90YWxBbW91bnQiLCJ0ZW1wVHlwZSIsIl9idXNpbmVzc1R5cGUiLCJCdXNpbmVzc1R5cGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsImJpbGwiLCJSb2xsT25lRGljZSIsIl9sb2FuUmVzZXQiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uIiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0I7QUFDQSxJQUFJQyxVQUFVLEdBQUcsSUFBakIsRUFDQTs7QUFDQSxJQUFJQyxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUMsQ0FEbUI7QUFFeEJDLEVBQUFBLFFBQVEsRUFBRSxDQUZjO0FBR3hCQyxFQUFBQSxXQUFXLEVBQUUsQ0FIVztBQUl4QkMsRUFBQUEsU0FBUyxFQUFFLENBSmE7QUFLeEJDLEVBQUFBLE1BQU0sRUFBRSxDQUxnQjtBQU14QkMsRUFBQUEsTUFBTSxFQUFDLENBTmlCO0FBT3hCQyxFQUFBQSxNQUFNLEVBQUUsQ0FQZ0I7QUFReEJDLEVBQUFBLFlBQVksRUFBRSxDQVJVO0FBU3hCQyxFQUFBQSxXQUFXLEVBQUUsQ0FUVztBQVV4QkMsRUFBQUEsSUFBSSxFQUFFLENBVmtCO0FBV3hCQyxFQUFBQSxTQUFTLEVBQUUsRUFYYTtBQVl4QkMsRUFBQUEsWUFBWSxFQUFDO0FBWlcsQ0FBUixDQUFwQixF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O0FBdW9DckIrQixFQUFBQSxtQkF2b0NxQixpQ0F3b0NyQixDQUVDLENBMW9Db0I7QUEyb0NyQkUsRUFBQUEseUJBM29DcUIsdUNBNG9DckIsQ0FFQyxDQTlvQ29CO0FBK29DckJxQixFQUFBQSx3QkEvb0NxQixzQ0FncENyQjtBQUNJaEgsSUFBQUEsd0JBQXdCLENBQUNrRyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RpRyxtQ0FBcEQsQ0FBd0YsSUFBeEY7QUFDQSxTQUFLMUksWUFBTCxDQUFrQixFQUFsQixFQUFxQixLQUFyQjtBQUNILEdBbnBDb0I7QUFvcENyQm1ELEVBQUFBLGlCQXBwQ3FCLCtCQXFwQ3JCO0FBQ0k3RyxJQUFBQSx3QkFBd0IsQ0FBQ2tHLFFBQXpCLENBQWtDbUMscUJBQWxDLEdBQTBEZ0UscUNBQTFELENBQWdHLElBQWhHO0FBQ0EsU0FBSzNJLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFDSCxHQXhwQ29CO0FBeXBDckJxRCxFQUFBQSxzQkF6cENxQixvQ0EwcENyQjtBQUNJL0csSUFBQUEsd0JBQXdCLENBQUNrRyxRQUF6QixDQUFrQ21DLHFCQUFsQyxHQUEwRGlFLGdDQUExRCxDQUEyRixJQUEzRjtBQUNBLFNBQUs1SSxZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0gsR0E3cENvQjtBQThwQ3JCdUQsRUFBQUEsbUJBOXBDcUIsaUNBK3BDckI7QUFDSWpILElBQUFBLHdCQUF3QixDQUFDa0csUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9Eb0csK0JBQXBEO0FBQ0EsU0FBSzdJLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFDSDtBQWxxQ29CLENBQVQsQ0FBaEI7QUFvcUNBOEksTUFBTSxDQUFDQyxPQUFQLEdBQWdCN0osU0FBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TcGFjZXMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bVNwYWNlVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgV2lsZENhcmQ6IDEsXHJcbiAgICBCaWdCdXNpbmVzczogMixcclxuICAgIE1hcmtldGluZzogMyxcclxuICAgIEludmVzdDogNCxcclxuICAgIExvc3Nlczo1LFxyXG4gICAgUGF5RGF5OiA2LFxyXG4gICAgRG91YmxlUGF5RGF5OiA3LFxyXG4gICAgT25lUXVlc3Rpb246IDgsXHJcbiAgICBTZWxsOiA5LFxyXG4gICAgQnV5T3JTZWxsOiAxMCxcclxuICAgIEdvQmFja1NwYWNlczoxMSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJDYXJkRGF0YVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIElEOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIklEXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiSWQgb2YgdGhlIGNhcmRcIn0sXHJcbiAgICAgICAgRGVzY3JpcHRpb246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRGVzY3JpcHRpb25cIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJkZXNjcmlwdGlvbiBvZiB0aGUgY2FyZFwifSxcclxuICAgICAgICBIYXNCdXR0b246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSGFzQnV0dG9uXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiaWYgdGhpcyBjYXJkIHNob3VsZCBoYXZlIGludGVyYWN0aW9uIGJ1dHRvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIYXNUd29CdXR0b25zOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkhhc1R3b0J1dHRvbnNcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJpZiB0aGlzIGNhcmQgc2hvdWxkIGhhdmUgdHdvIGludGVyYWN0aW9uIGJ1dHRvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIYXNUaHJlZUJ1dHRvbnM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSGFzVGhyZWVCdXR0b25zXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSB0aHJlZSBpbnRlcmFjdGlvbiBidXR0b25cIn0sXHJcbiAgICAgICAgQnV0dG9uTmFtZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJCdXR0b25OYW1lXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTZWNvbmRCdXR0b25OYW1lOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlNlY29uZEJ1dHRvbk5hbWVcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlNlY29uZCBidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBUaGlyZEJ1dHRvbk5hbWU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU2Vjb25kQnV0dG9uTmFtZVwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcIlNlY29uZCBidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwifSxcclxuIH0sXHJcblxyXG4gY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbiB9XHJcblxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkVUk9Y2MuQ2xhc3Moe1xyXG4gICBuYW1lOlwiQ2FyZFVJXCIsXHJcbiAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIFRvYXN0Tm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG9hc3ROb2RlXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJub2RlIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwifSxcclxuICAgICAgIFRvYXN0TGFiZWw6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0TGFiZWxcIixcclxuICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJsYWJlbCByZWZlcmVuY2UgZm9yIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgIEJ1dHRvbk5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIkV4aXRCdXR0b25cIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcIkJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIn0sXHJcbiAgICAgICAgSW50ZXJhY3Rpb25CdXR0b25Ob2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJJbnRlcmFjdGlvbkJ1dHRvblwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlcmFjdGlvbiBCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJcclxuICAgICAgIH0sXHJcbiAgICAgICBJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJJbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcInR3byBpbnRlcmFjdGlvbiBCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJcclxuICAgICAgIH0sXHJcbiAgICAgICBJbnRlcmFjdGlvblRocmVlQnV0dG9uc05vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIkludGVyYWN0aW9uVGhyZWVCdXR0b25zTm9kZVwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwidGhyZWUgaW50ZXJhY3Rpb24gQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwifSxcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcblxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGRlY2tzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERlY2tzRGF0YSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiRGVja3NEYXRhXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgTWFpblVJOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblVJXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IENhcmRVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlVJIG9mIGRlY2tzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEJpZ0J1c2luZXNzOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQmlnQnVzaW5lc3NcIixcclxuICAgICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgY2FyZHMgZGF0YSBmb3IgYmlnIGJ1c2luZXNzXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBNYXJrZXRpbmc6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdcIixcclxuICAgICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgY2FyZHMgZGF0YSBmb3IgbWFya2V0aW5nXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBMb3NzZXM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb3NzZXNcIixcclxuICAgICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgY2FyZHMgZGF0YSBmb3IgbG9zc2VzXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBXaWxkQ2FyZHM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJXaWxkQ2FyZHNcIixcclxuICAgICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgY2FyZHMgZGF0YSBmb3IgV2lsZENhcmRzXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTcGFjZXNUeXBlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogRW51bVNwYWNlVHlwZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogRW51bVNwYWNlVHlwZS5Ob25lLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwic3RhdGVzIG1hY2hpbmVzIGJ5IHR5cGUgb2YgY2FyZCBvciBzcGFjZXMgb24gYm9hcmRcIixcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQgPSAtMTtcclxuICAgICAgICB0aGlzLklzQm90VHVybiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNPd25lciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL3RoaXMuQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShcIjFcIik7XHJcbiAgICAgICAgLy9mb3IgdGVzdGluZ1xyXG4gICAgICAgIC8vIHRoaXMuQ291bnRlcj0wO1xyXG4gICAgICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oXCJTaG93Q2FyZFwiLCB0aGlzLlNob3dDYXJkSW5mbywgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiU2hvd0NhcmRcIiwgdGhpcy5TaG93Q2FyZEluZm8sIHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmFuZG9tOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVCdXR0b25zKF9pc093bmVyLCBfaGFzQnV0dG9uID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLF9oYXNUd29CdXR0b249ZmFsc2UpIHtcclxuICAgICAgICBpZiAoX2lzT3duZXIgJiYgX2hhc0J1dHRvbikge1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfaGFzVHdvQnV0dG9uKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25Ud29CdXR0b25zTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvblR3b0J1dHRvbnNOb2RlLmFjdGl2ZSA9IGZhbHNlOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoX2lzT3duZXIgJiYgIV9oYXNCdXR0b24pIHtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2lzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkV4aXRDYXJkSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZChfaXNPd25lciwgX3JhbmRvbVZhbHVlLCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3M7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG5cclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLCB0cnVlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QpO1xyXG5cclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5NYXJrZXRpbmc7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QpO1xyXG5cclxuICAgICAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5Mb3NzZXM7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleCA9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgICB0aGlzLkNhcmRTZWxlY3RlZCA9IHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc1R3b0J1dHRvbnMpXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uVHdvQnV0dG9uc05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5TZWNvbmRCdXR0b25OYW1lO1xyXG4gICAgIFxyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLCBfaXNCb3QsdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzVHdvQnV0dG9ucyk7XHJcblxyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbVdpbGRDYXJkKF9pc093bmVyLCBfcmFuZG9tVmFsdWUsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5XaWxkQ2FyZDtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4ID0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkID0gdGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiBcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sIF9pc0JvdCk7XHJcblxyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUludmVzdChfaXNPd25lciwgX2luZGV4LCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuSW52ZXN0O1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBpbnZlc3Qgb25lIG1vcmUgdGltZSBpbiBHb2xkIG9yIHN0b2NrcyB0aGlzIHR1cm4uXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiRXhlY3V0ZVwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgdHJ1ZSwgX2lzQm90KTtcclxuXHJcbiAgICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIm1zZ1wiLCAyMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlUGF5RGF5KF9pc093bmVyLCBfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBQYXlEYXkgc3BhY2UuXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5RnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VEb3VibGVQYXlEYXkoX2lzT3duZXIsIF9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIERvdWJsZVBheURheSBzcGFjZS5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Eb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lciwgZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZU9uZVF1ZXN0aW9uKF9pc093bmVyLCBfaW5kZXgsIF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICAgICAgdGhpcy5pc093bmVyID0gX2lzT3duZXI7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlID0gRW51bVNwYWNlVHlwZS5PbmVRdWVzdGlvbjtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gYXNrIG9uZSBxdWVzdGlvbiB0byBhbnkgb3RoZXIgcGxheWVyLCBpZiBwbGF5ZXIgaXMgdW5hYmxlIHRvIGFuc3dlciB0aGV5IHdpbGwgcGF5IHlvdSBzb21lIGNhc2ggYW1vdW50LlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcbiAgICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIm1zZ1wiLCAyMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlU2VsbChfaXNPd25lciwgX2luZGV4LCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuU2VsbDtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gc2VsbCBhbnkgb25lIG9mIHlvdXIgYnVzaW5lc3Mgb3IgY2FuIHNraXAgdHVybi5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0cnVlLCBfaXNCb3QpO1xyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUJ1eU9yU2VsbChfaXNPd25lciwgX2luZGV4LCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuQnV5T3JTZWxsO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBCdXkgb3Igc2VsbCBHb2xkIG9yIHN0b2NrcyBvbmUgbW9yZSB0aW1lIGluIHRoaXMgdHVybi5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFeGVjdXRlXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLCB0cnVlLCBfaXNCb3QpO1xyXG4gICAgICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwgMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUdvQmFja1NwYWNlcyhfaXNPd25lciwgX2luZGV4LCBfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuID0gX2lzQm90O1xyXG4gICAgICAgIHRoaXMuaXNPd25lciA9IF9pc093bmVyO1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZSA9IEVudW1TcGFjZVR5cGUuR29CYWNrU3BhY2VzO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwieW91IHdpbGwgaGF2ZSB0byBnbyBiYWNrIDMgc3BhY2VzLlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkV4ZWN1dGVcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsIHRydWUsIF9pc0JvdCk7XHJcbiAgICAgICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTaG93Q2FyZEluZm86IGZ1bmN0aW9uIChtZXNzYWdlLCBfc3RhdGUpIHtcclxuICAgICAgICBpZiAoX3N0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpblVJLlRvYXN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdExhYmVsLnN0cmluZyA9IG1lc3NhZ2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0Q2FyZEluZm8oKSB7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZXNldENhcmREaXNwbGF5KCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgLy9mb3IgdGVzdGluZ1xyXG4gICAgICAgIC8vIHRoaXMuQ291bnRlcisrO1xyXG4gICAgICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgVHdvQnV0dG9uc0Z1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbihudWxsLDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBDYXJkRnVudGlvbmFsaXR5QnV0dG9uKGV2ZW50PW51bGwsX3R5cGU9MCkge1xyXG4gICAgICAgIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5CaWdCdXNpbmVzcykge1xyXG4gICAgICAgICAgICB0aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuTG9zc2VzICYmIExvc3Nlc0RhdGE9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5Mb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCx0cnVlLF90eXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuTG9zc2VzICYmIExvc3Nlc0RhdGEhPW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5Mb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCxmYWxzZSxfdHlwZSk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLk1hcmtldGluZykge1xyXG4gICAgICAgICAgICB0aGlzLk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuV2lsZENhcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5XaWxkQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5TZWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5TcGFjZXNUeXBlID09IEVudW1TcGFjZVR5cGUuSW52ZXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0RnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLlNwYWNlc1R5cGUgPT0gRW51bVNwYWNlVHlwZS5CdXlPclNlbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5CdXlPclNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuT25lUXVlc3Rpb25GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuU3BhY2VzVHlwZSA9PSBFbnVtU3BhY2VUeXBlLkdvQmFja1NwYWNlcykge1xyXG4gICAgICAgICAgICB0aGlzLkdvQmFja0Z1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrTG9hbigpIHtcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB2YWwgPSAtMTtcclxuICAgICAgICB2YWwgPSBfbG9hblRha2VuID09IHRydWUgPyAxIDogMDtcclxuICAgICAgICB2YXIgUmVzdWx0ID0gY2MudjIodmFsLCBfYnVzaW5lc3NJbmRleClcclxuICAgICAgICByZXR1cm4gUmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBDb21wbGV0ZVR1cm5XaXRoVG9hc3QoX21zZywgX3RpbWUpIHtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfbXNnKTtcclxuICAgICAgICAgICAgdmFyIF9kZWxheSA9IHRoaXMuZ2V0UmFuZG9tKDI1MDAsIDM1MDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSwgKF9kZWxheSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChfbXNnLCBfdGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUmVzZXRDYXJkRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9LCAoX3RpbWUgKyAxMDAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KF9pZCkge1xyXG4gICAgICAgIHZhciBJbmRleCA9IHBhcnNlSW50KF9pZCk7XHJcbiAgICAgICAgSW5kZXggPSBJbmRleCAtIDE7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxXCI6Ly9yZWNlaXZlIDIwMDAwJCBnaWZ0IHRvIHBheW9mZiBsb2FuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcmVzdWx0ID0gdGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBJc0xvYW5UYWtlbiA9IF9yZXN1bHQueDtcclxuICAgICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9yZXN1bHQueTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoSXNMb2FuVGFrZW4gPT0gMSkgLy9tZWFucyB1c2VyIGhhcyB0YWtlbiBsb2FuXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIDIwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJMb2FuIGFtb3VudCBvZiAkMjAwMDAgaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiLCAxODAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbm90IHRha2VuIGFueSBsb2FuLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsIDE4MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOiAvL2hpcmUgbGF3eWVyXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgaGlyZWQgbGF5d2VyLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsIDE4MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLlwiLCAxODAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjZcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI4XCI6Ly9kb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheSBkYXlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLCAxODAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTBcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTFcIjovL3JvbGwgZGljZSB0d2ljZSwgaWYgcmVzdWx0IGlzID4xOSB0aGVuIHRha2UgYWxsIG1vbmV5IGluc2lkZSBtYXJrZXRpbmcuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIERpY2UxUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgRGljZTJSZXN1bHQgPSBfbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgdmFyIERpY2UxUmVzdWx0PTEyO1xyXG4gICAgICAgICAgICAgICAgLy8gIHZhciBEaWNlMlJlc3VsdD0xMjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQgPSBEaWNlMVJlc3VsdCArIERpY2UyUmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChUb3RhbFJlc3VsdCA+PSAxOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Ftb3VudCA9IF9hbW91bnQgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIiArIERpY2UxUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiICsgRGljZTJSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFtb3VudCAkXCIgKyBfYW1vdW50ICsgXCIgaGFzIHN1Y2Nlc3NmdWxseSBhZGRlZCBpbiB5b3VyIGNhc2ggZnJvbSBtYXJrZXRpbmcgYW1vdW50IG9uIHRhYmxlLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgNDAwMCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2FjdG9yc0FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIiArIERpY2UxUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiICsgRGljZTJSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIllvdSByYW4gb3V0IG9mIGx1Y2ssIHR1cm4gd2lsbCBza2lwIG5vd1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgNDAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eShfaWQpIHtcclxuICAgICAgICB2YXIgSW5kZXggPSBwYXJzZUludChfaWQpO1xyXG4gICAgICAgIEluZGV4ID0gSW5kZXggLSAxO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICAgICAgICBjYXNlIFwiMVwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyMTAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiNFwiOi8vWW91ciBNYXJrZXRpbmcgQWNjb3VudCB0cmlwbGVzLCBidXQgeW91IG11c3QgbGVhdmUgaXQgaW4gdGhlIGFjY291bnQuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX21hcmtldEFtb3VudCA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMztcclxuICAgICAgICAgICAgICAgIHZhciBfaW5jcmVhc2VBbW91bnQgPSBfbWFuYWdlci5NdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2luY3JlYXNlQW1vdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTWFya2V0aW5nIEFtb3VudDogJFwiICsgX21hcmtldEFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbDogXCIgKyBfbWFya2V0QW1vdW50ICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyICsgXCIgPSBcIiArIF9pbmNyZWFzZUFtb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieW91ciBtYXJrZXRpbmcgYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIHRvICRcIiArIF9pbmNyZWFzZUFtb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIDMxMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiOFwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyMTAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiOVwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudCA9IF9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfbG9zZUFtb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIgKyBfbG9zZUFtb3VudCwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLCAyMTAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTBcIjovL1JlY2VpdmUgYWxsIG9mIHlvdXIgTWFya2V0aW5nIEJ1ZGdldCBiYWNrLCBwbHVzIDcwMCUgcHJvZml0LlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBfcHJvZml0ID0gNzAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQgPSBfbWFuYWdlci5HZXRNYXJrZXRpbmdNb25leShfcHJvZml0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2Ftb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIiArIF9tYXJrZXRBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiICsgX21hcmtldEFtb3VudCArIFwiICsgKFwiICsgX21hcmtldEFtb3VudCArIFwiKlwiICsgX3Byb2ZpdCArIFwiICkvMTAwXCIgKyBcIiA9IFwiICsgX2Ftb3VudCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieW91ciBjYXNoIGFtb3VudCBoYXMgYmVlbiBzdWNlc3NmdWxseSBpbmNyZWFzZSBieSAkXCIgKyBfYW1vdW50ICsgXCIsIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCA0MDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjExXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjE0XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50ID0gX21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9sb3NlQW1vdW50ID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIiArIF9sb3NlQW1vdW50LCAyMTAwKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsIDIxMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkLCBfaGFzVHdvU2NyZWVucyA9IGZhbHNlLF90eXBlPTApXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9sb3NlIG5leHQgdHVyblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIGxvc2UgeW91ciBuZXh0IHR1cm4uXCIsMjQwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjogLy9Sb2xsIDIgZGljZSwgbXVsdGlwbHkgYnkgJDUsMDAwIGFuZCBwYXkgaXQgdG8gdGhlIEJhbmsuIElmIHlvdSBoYXZlIGEgbGF3eWVyIHlvdSBsb3NlIDUwJSBvZiB0aGUgdG90YWwgYmlsbCBjdXJyZW50bHkgb3dlZC5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIERpY2VSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgIHZhciBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgICB2YXIgX2hpcmVkTGF3eWVyO1xyXG5cclxuICAgICAgICAgICAgICAgaWYgKF9oYXNUd29TY3JlZW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICBDYXNoTXVsaXRwbGllciA9IDUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICBUb3RhbFJlc3VsdCA9IERpY2VSZXN1bHQgKiBDYXNoTXVsaXRwbGllcjtcclxuICAgICAgICAgICAgICAgICAgIF9oaXJlZExhd3llciA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBUb3RhbFJlc3VsdCwgbGF3eWVyOiBfaGlyZWRMYXd5ZXIgfSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJcXG5cIiArIFwiRGljZSBSb2xsIFJlc3VsdCA6IFwiICsgRGljZVJlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBCaWxsIENhbGN1bGF0ZWQgOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9ICRcIiArIFRvdGFsUmVzdWx0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhMb3NzZXNEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgIFRvdGFsUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgIF9oaXJlZExhd3llciA9IExvc3Nlc0RhdGEuRGF0YS5sYXd5ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9oaXJlZExhd3llcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSBUb3RhbFJlc3VsdCAvIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBUb3RhbFJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChfaGlyZWRMYXd5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgaGlyZWQgbGF3eWVyLCBoYWxmIGJpbGwgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IFRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYXZlIG5vdCBoaXJlZCBhbnkgbGF3eWVyLCBiaWxsICRcIiArIFRvdGFsUmVzdWx0ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdCBhbmQgaGFzIG5vIGNhc2gsc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOi8vbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9XaG9sZSh0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cIiwyNDAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOi8vWWVhcmx5IGJ1c2luZXNzIGluc3VyYW5jZSBwcmVtaXVtIGlzIGR1ZS4gUGF5ICQyLDAwMCB0byB0aGUgQmFuayBmb3IgZWFjaCBIb21lLUJhc2VkIGJ1c2luZXNzLCAkNSwwMDAgZm9yIGVhY2ggQnJpY2sgJiBNb3J0YXIgYnVzaW5lc3MuXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBob21lQmFzZWRCdXNpbmVzcyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgICAgICB2YXIgYnJpY2tBbmRNb3J0YXJCdXNpbmVzcyA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgIHZhciBob21lTXVsdGlwbGllciA9IDIwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBicmlja011bGlwbGllciA9IDUwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciB0b3RhbEFtb3VudCA9IChob21lQmFzZWRCdXNpbmVzcyAqIGhvbWVNdWx0aXBsaWVyKSArIChicmlja0FuZE1vcnRhckJ1c2luZXNzICogYnJpY2tNdWxpcGxpZXIpO1xyXG4gICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiB0b3RhbEFtb3VudCB9IH07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiSG9tZSBCYXNlZCBBbW91bnQgOiBcIiArIGhvbWVCYXNlZEJ1c2luZXNzK1wiICogJFwiK2hvbWVNdWx0aXBsaWVyK1wiID0gJFwiKyAoaG9tZUJhc2VkQnVzaW5lc3MqaG9tZU11bHRpcGxpZXIpKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQnJpY2sgJiBNb3J0YXIgQW1vdW50IDogXCIgKyBicmlja0FuZE1vcnRhckJ1c2luZXNzICsgXCIgKiAkXCIgKyBicmlja011bGlwbGllciArIFwiID0gJFwiICsgKGJyaWNrQW5kTW9ydGFyQnVzaW5lc3MgKiBicmlja011bGlwbGllcikgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQW1vdW50IDogXCIrKGhvbWVCYXNlZEJ1c2luZXNzKmhvbWVNdWx0aXBsaWVyKStcIiArIFwiKyhicmlja0FuZE1vcnRhckJ1c2luZXNzICogYnJpY2tNdWxpcGxpZXIpK1wiID0gJFwiK3RvdGFsQW1vdW50LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IHRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIHRvdGFsQW1vdW50ICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90IGFuZCBoYXMgbm8gbW9uZXksIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOi8vWW91ciBlbXBsb3llZSBjbGFpbXMgeW91IHNleHVhbGx5IGhhcmFzc2VkIHRoZW0sIGJ1dCB5b3UgZGlkIG5vdC4gWW91IGNhbiBlaXRoZXI7ICAxIC0gU2V0dGxlIG91dCBvZiBjb3VydCBhbmQgcGF5IHRoZW0gJDUwLDAwMC4gMiAtIFRha2UgeW91ciBjaGFuY2VzIGluIGNvdXJ0LiBSb2xsIDIgZGljZSBhbmQgcGF5ICQxMCwwMDAgdGltZXMgdGhlIG51bWJlciByb2xsZWQuXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBfY291cnRTZXR0bGVtZW50RmVlcyA9IDUwMDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyID0gMTAwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciB0b3RhbEFtb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgICAgaWYgKF90eXBlID09IDApIHsgLy9maXJzdCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IF9jb3VydFNldHRsZW1lbnRGZWVzLCBUeXBlOiBfdHlwZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlxcblwiICsgXCJQYXlhYmxlIGFtb3VudCA6ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAxKSB7IC8vMm5kIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ID0gX21hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdG90YWxBbW91bnQgPSBEaWNlUmVzdWx0ICogQ2FzaE11bGl0cGxpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IERpY2VSZXN1bHQsIFRvdGFsQW1vdW50OiB0b3RhbEFtb3VudCwgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIERpY2VSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIEFtb3VudCA6IFwiICsgRGljZVJlc3VsdCArIFwiICogXCIgKyBDYXNoTXVsaXRwbGllciArIFwiID0gJFwiICsgdG90YWxBbW91bnQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJQYXkgQW1vdW50XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0gZWxzZSB7IFxyXG4gICAgICAgICAgICAgICAgICAgdmFyIHRlbXBUeXBlID0gTG9zc2VzRGF0YS5EYXRhLlR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICBpZiAodGVtcFR5cGUgPT0gMClcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBfY291cnRTZXR0bGVtZW50RmVlcyA9IExvc3Nlc0RhdGEuRGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9jb3VydFNldHRsZW1lbnRGZWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IF9jb3VydFNldHRsZW1lbnRGZWVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiVG90YWwgYW1vdW50ICRcIiArIF9jb3VydFNldHRsZW1lbnRGZWVzICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wVHlwZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gTG9zc2VzRGF0YS5EYXRhLlRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gdG90YWxBbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IHRvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyB0b3RhbEFtb3VudCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0IHdhcyBib3QgYW5kIGhhZCBub3QgZW5vdWdoIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6Ly8gSWYgQnVzaW5lc3MgIzEgaXMgSG9tZSBCYXNlZCwgcGF5IGEgJDUsMDAwIEluc3VyYW5jZSBEZWR1Y3RpYmxlOyBpZiBCcmljayAmIE1vcnRhciAkMTAsMDAwIGRlZHVjdGlibGUuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICB2YXIgX2J1c2luZXNzVHlwZT1wYXJzZUludChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUpO1xyXG4gICAgICAgICAgICAgaWYoX2J1c2luZXNzVHlwZT09MSkgLy8gZmlyc3QgYnVzaW5lc3Mgd2FzIGhvbWUgYmFzZWRcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQ1MDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGhvbWUgYmFzZWQgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2UgaWYgKF9idXNpbmVzc1R5cGU9PTIpIC8vZmlyc3QgYnVzaW9uZXNzIHdhcyBicmljayAmIG1vcnRhclxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj0xMDAwMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC09MTAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBwYXllZCAkMTAwMDAgaW5zdXJhbmNlIG9uIHlvdXIgZmlyc3QgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsNDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI3XCI6Ly9sb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCh0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSB5b3VyIG5leHQgUGF5IERheSBmb3IgYWxsIG9mIHlvdXIgaG9tZS1iYXNlZCBidXNpbmVzc2VzLlwiLDI0MDApO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjovL1lvdSBhcmUgZmluZWQgNTAlIG9mIHlvdXIgY3VycmVudCBsaXF1aWQgY2FzaC4gSWYgeW91IGhhdmUgYSBsYXd5ZXIsIHlvdXIgZmluZSBpcyByZWR1Y2VkIHRvIDIwJSBvZiB5b3VyIGN1cnJlbnQgbGlxdWlkIGNhc2guXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBUb3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgICAgdmFyIF9oaXJlZExhd3llcjtcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChfaGFzVHdvU2NyZWVucykge1xyXG4gICAgICAgICAgICAgICAgICAgIFRvdGFsUmVzdWx0ID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgX2hpcmVkTGF3eWVyID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IHsgRGF0YTogeyByZXN1bHQ6IFRvdGFsUmVzdWx0LCBsYXd5ZXI6IF9oaXJlZExhd3llciB9IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIlxcblwiICsgXCJUb3RhbCBDYXNoIDogJFwiICsgVG90YWxSZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiNTAlIG9mIFRvdGFsIENhc2ggOiAkXCIgKyAoVG90YWxSZXN1bHQgLyAyKSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyh0aGlzLmlzT3duZXIsIHRydWUsIHRoaXMuSXNCb3RUdXJuKTtcclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgX2hpcmVkTGF3eWVyID0gTG9zc2VzRGF0YS5EYXRhLmxhd3llcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX2hpcmVkTGF3eWVyKSBcclxuICAgICAgICAgICAgICAgICAgICAgICBUb3RhbFJlc3VsdCA9IChUb3RhbFJlc3VsdCAqIDIwKSAvIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgVG90YWxSZXN1bHQgPSAoVG90YWxSZXN1bHQgKiA1MCkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IFRvdGFsUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9oaXJlZExhd3llcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBoaXJlZCBsYXd5ZXIsIHJlZHVjZWQgZmluZSAkXCIgKyBUb3RhbFJlc3VsdCArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLT0gVG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhdmUgbm90IGhpcmVkIGFueSBsYXd5ZXIsIGZpbmUgJFwiICsgVG90YWxSZXN1bHQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm8gbW9uZXksIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI5XCI6Ly9BIGN1c3RvbWVyIGlzIGluanVyZWQgYXQgb25lIG9mIHlvdXIgYnVzaW5lc3MgbG9jYXRpb25zLiBZb3UgY2FuIGVpdGhlcjsgMSAtIFNldHRsZSBvdXQgb2YgY291cnQgYW5kIHBheSB0aGVtICQyNSwwMDAgLCAyIC0gVGFrZSB5b3VyIGNoYW5jZXMgaW4gY291cnQuIFJvbGwgMiBkaWNlIGFuZCBwYXkgJDUsMDAwIHRpbWVzIHRoZSBudW1iZXIgcm9sbGVkLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9jb3VydFNldHRsZW1lbnRGZWVzID0gMjUwMDA7XHJcbiAgICAgICAgICAgICAgIHZhciBEaWNlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXIgPSA1MDAwO1xyXG4gICAgICAgICAgICAgICB2YXIgdG90YWxBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoX2hhc1R3b1NjcmVlbnMpIHtcclxuICAgICAgICAgICAgICAgICAgIGlmIChfdHlwZSA9PSAwKSB7IC8vZmlyc3QgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBfY291cnRTZXR0bGVtZW50RmVlcywgVHlwZTogX3R5cGUgfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcXG5cIiArIFwiUGF5YWJsZSBhbW91bnQgOiAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlBheSBBbW91bnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKHRoaXMuaXNPd25lciwgdHJ1ZSwgdGhpcy5Jc0JvdFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMSkgeyAvLzJuZCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgRGljZVJlc3VsdCA9IF9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50ID0gRGljZVJlc3VsdCAqIENhc2hNdWxpdHBsaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSB7IERhdGE6IHsgcmVzdWx0OiBEaWNlUmVzdWx0LCBUb3RhbEFtb3VudDogdG90YWxBbW91bnQsIFR5cGU6IF90eXBlIH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBEaWNlUmVzdWx0ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBBbW91bnQgOiBcIiArIERpY2VSZXN1bHQgKyBcIiAqIFwiICsgQ2FzaE11bGl0cGxpZXIgKyBcIiA9ICRcIiArIHRvdGFsQW1vdW50LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUGF5IEFtb3VudFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnModGhpcy5pc093bmVyLCB0cnVlLCB0aGlzLklzQm90VHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9IGVsc2UgeyBcclxuICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wVHlwZSA9IExvc3Nlc0RhdGEuRGF0YS5UeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgaWYgKHRlbXBUeXBlID09IDApXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgX2NvdXJ0U2V0dGxlbWVudEZlZXMgPSBMb3NzZXNEYXRhLkRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA+PSBfY291cnRTZXR0bGVtZW50RmVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSBfY291cnRTZXR0bGVtZW50RmVlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyBfY291cnRTZXR0bGVtZW50RmVlcyArIFwiIHdhcyBzdWNjZXNzZnVsbHkgcGFpZCwgcmVtYWluaW5nIGNhc2ggJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwgNDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGVub3VnaCBjYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9zc2VzRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXQgd2FzIGJvdCBhbmQgaGFkIG5vdCBlbm91Z2ggbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVtcFR5cGUgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBEaWNlUmVzdWx0ID0gTG9zc2VzRGF0YS5EYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICB0b3RhbEFtb3VudCA9IExvc3Nlc0RhdGEuRGF0YS5Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IHRvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtPSB0b3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJUb3RhbCBhbW91bnQgJFwiICsgdG90YWxBbW91bnQgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IHBhaWQsIHJlbWFpbmluZyBjYXNoICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsIDQyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBlbm91Z2ggY2FzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMFwiOi8vWW91ciBjb21wdXRlciBoYXMgYmVlbiBoYWNrZWQhIFlvdSBjYXRjaCBpdCBpbiB0aW1lLCBidXQgeW91IG11c3QgYnV5IG1vcmUgc2VjdXJpdHkgZm9yIHlvdXIgYnVzaW5lc3MgcmVjb3Jkcy4gUGF5ICQyMCwwMDAgdG8gdGhlIEJhbmsuXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgIHZhciBiaWxsID0gMjAwMDA7XHJcbiAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gYmlsbCkge1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoIC09IGJpbGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlRvdGFsIGFtb3VudCAkXCIgKyBiaWxsICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBwYWlkLCByZW1haW5pbmcgY2FzaCAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLCA0MjAwKTtcclxuICAgICAgICAgICAgICAgIExvc3Nlc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgZW5vdWdoIGNhc2hcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdCB3YXMgYm90IGFuZCBoYWQgbm90IGVub3VnaCBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBMb3NzZXNEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIlwiLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFdpbGRDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9kb3VibGVzIHlvdXIgaW5jb21lIG9uIHRoZSBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwxODAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMlwiOi8vUm9sbCAxIGRpZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIGFkdmFuY2UgZnJvbSB0aGUgQmFuay5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdD1fbWFuYWdlci5Sb2xsT25lRGljZSgpO1xyXG4gICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyPTUwMDA7XHJcbiAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ9RGljZVJlc3VsdCpDYXNoTXVsaXRwbGllcjtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grPVRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIrRGljZVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitEaWNlUmVzdWx0K1wiICogXCIrQ2FzaE11bGl0cGxpZXIrXCIgPSBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiQW1vdW50ICRcIitUb3RhbFJlc3VsdCtcIiBoYXMgYmVlbiBhZGRlZCBpbnRvIHlvdXIgY2FzaC5cIlxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOi8vcGF5IG9mZiB5b3VyIGxvYW4gZm9yIHlvdXIgQnJpY2sgJiBNb3J0YXIgQnVzaW5lc3MuIElmIHlvdSBoYXZlIG5vIGxvYW4gb3V0c3RhbmRpbmcsIHJlY2VpdmUgJDUwLDAwMC5cclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBfbG9hblJlc2V0PWZhbHNlO1xyXG4gICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90eXBlPXBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoX3R5cGU9PTIgJiYgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYW5SZXNldD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihfbG9hblJlc2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdXIgb3V0c3RhbmRpbmcgbG9hbiBoYXMgYmVlbiBwYXllZCBvZmYuXCIsMjgwMCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9NTAwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgbm8gbG9hbiwgYW1vdW50ICQ1MDAwMCBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2hcIiwyODAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOi8vIHJlY2VpdmUgZG91YmxlIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBhbGwgb2YgeW91ciBidXNpbmVzc2VzLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBJbnZlc3RGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgUGF5RGF5RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxuICAgIERvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5PbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbih0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBTZWxsRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIEdvQmFja0Z1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Hb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG59KTtcclxubW9kdWxlLmV4cG9ydHM9IERlY2tzRGF0YTtcclxuIl19