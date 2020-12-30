
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

var GamePlayReferenceManager = null; //-------------------------------------------Spaces Data-------------------------//

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
    ButtonName: {
      displayName: "ButtonName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "button name to show on screen"
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
    this.IsBotTurn = false; //this.BigBusinessCardFunctionality("1");
    //for testing
    // this.Counter=0;
    // this.GenerateRandomBigBusinessCard(this.Counter);
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },
  ToggleButtons: function ToggleButtons(_isOwner, _hasButton, _isBot) {
    var _this = this;

    if (_hasButton === void 0) {
      _hasButton = false;
    }

    if (_isBot === void 0) {
      _isBot = false;
    }

    if (_isOwner && _hasButton) {
      this.MainUI.ButtonNode.active = false;
      this.MainUI.InteractionButtonNode.active = true;
    } else if (_isOwner && !_hasButton) {
      this.MainUI.ButtonNode.active = true;
      this.MainUI.InteractionButtonNode.active = false;
    } else {
      this.MainUI.InteractionButtonNode.active = false;
      this.MainUI.ButtonNode.active = false;

      if (_isBot == false) {
        setTimeout(function () {
          _this.ExitCardInfo();
        }, 2500);
      }
    }
  },
  GenerateRandomBigBusinessCard: function GenerateRandomBigBusinessCard(_isOwner, _randomValue, _isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    this.IsBotTurn = _isBot;
    this.SpacesType = EnumSpaceType.BigBusiness;
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

    this.IsBotTurn = _isBot;
    this.SpacesType = EnumSpaceType.Losses;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.Losses[this.SelectedCardIndex].ID;
    this.ShowCardInfo(this.Losses[this.SelectedCardIndex].Description, true);
    if (this.Losses[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.Losses[this.SelectedCardIndex].ButtonName;
    this.ToggleButtons(_isOwner, this.Losses[this.SelectedCardIndex].HasButton, _isBot);

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
    this.SpacesType = EnumSpaceType.Invest;
    this.ShowCardInfo("You can invest one more time in Gold or stocks this turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
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
    this.SpacesType = EnumSpaceType.OneQuestion;
    this.ShowCardInfo("You can ask one question to any other player, if player is unable to answer they will pay you some cash amount.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
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
    this.SpacesType = EnumSpaceType.Sell;
    this.ShowCardInfo("You can sell any one of your business or can skip turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
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
    this.SpacesType = EnumSpaceType.BuyOrSell;
    this.ShowCardInfo("You can Buy or sell Gold or stocks one more time in this turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
    this.ToggleButtons(_isOwner, true, _isBot);

    if (_isBot) {
      this.CompleteTurnWithToast("msg", 2100);
    }
  },
  SpaceGoBackSpaces: function SpaceGoBackSpaces(_isOwner, _index) {
    this.ShowCardInfo("You have landed on Go Back space.", true);
    this.GoBackFunctionality();
    this.ToggleButtons(_isOwner, false);
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
  CardFuntionalityButton: function CardFuntionalityButton() {
    if (this.SpacesType == EnumSpaceType.BigBusiness) {
      this.BigBusinessCardFunctionality(this.CardSelected);
    } else if (this.SpacesType == EnumSpaceType.Losses) {
      this.LossesCardFunctionality(this.CardSelected);
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
    var _this2 = this;

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    if (this.IsBotTurn) {
      console.log(_msg);

      var _delay = this.getRandom(1500, 2500);

      setTimeout(function () {
        _this2.ShowCardInfo("", false);

        _manager.ResetCardDisplay();

        _manager.RaiseEventTurnComplete();
      }, _delay);
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_msg, _time);
      this.ShowCardInfo("", false);
      setTimeout(function () {
        _this2.ShowCardInfo("", false);

        _manager.ResetCardDisplay();

        _manager.RaiseEventTurnComplete();
      }, _time + 100);
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
  LossesCardFunctionality: function LossesCardFunctionality(_id) {
    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //lose next turn
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleSkipNextTurn(true);

        this.CompleteTurnWithToast("You will lose your next turn.", 2100);
        break;

      case "2":
        console.log(this.Losses[Index].Description);
        break;

      case "3":
        //lose all your business profits on next Pay Day.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleSkipPayDay_Whole(true);

        this.CompleteTurnWithToast("you will lose all your business profits on next Pay Day.", 2100);
        break;

      case "4":
        console.log(this.Losses[Index].Description);
        break;

      case "5":
        console.log(this.Losses[Index].Description);
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
              this.CompleteTurnWithToast("You payed $5000 insurance on your first home based business, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 2100);
            } else {
              this.CompleteTurnWithToast("you don't have enough money.", 1800);
            }
          } else if (_businessType == 2) //first busioness was brick & mortar
          {
            if (_manager.PlayerGameInfo[_playerIndex].Cash >= 10000) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= 10000;
              this.CompleteTurnWithToast("You payed $10000 insurance on your first brick & mortar business, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 2100);
            } else {
              this.CompleteTurnWithToast("you don't have enough money.", 1800);
            }
          }

        break;

      case "7":
        //lose your next Pay Day for all of your home-based businesses.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleSkipPayDay_HomeBased(true);

        this.CompleteTurnWithToast("you will lose your next Pay Day for all of your home-based businesses.", 2100);
        break;

      case "8":
        console.log(this.Losses[Index].Description);
        break;

      case "9":
        console.log(this.Losses[Index].Description);
        break;

      case "10":
        console.log(this.Losses[Index].Description);
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
  GoBackFunctionality: function GoBackFunctionality() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiRW51bVNwYWNlVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJXaWxkQ2FyZCIsIkJpZ0J1c2luZXNzIiwiTWFya2V0aW5nIiwiSW52ZXN0IiwiTG9zc2VzIiwiUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiT25lUXVlc3Rpb24iLCJTZWxsIiwiQnV5T3JTZWxsIiwiR29CYWNrU3BhY2VzIiwiQ2FyZERhdGEiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiSUQiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJUZXh0Iiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkRlc2NyaXB0aW9uIiwiSGFzQnV0dG9uIiwiQnV0dG9uTmFtZSIsImN0b3IiLCJDYXJkVUkiLCJUb2FzdE5vZGUiLCJOb2RlIiwiVG9hc3RMYWJlbCIsIkxhYmVsIiwiQnV0dG9uTm9kZSIsIkludGVyYWN0aW9uQnV0dG9uTm9kZSIsIkRlY2tzRGF0YSIsIkNvbXBvbmVudCIsIk1haW5VSSIsIldpbGRDYXJkcyIsIlNwYWNlc1R5cGUiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTZWxlY3RlZENhcmRJbmRleCIsIkNhcmRTZWxlY3RlZCIsIklzQm90VHVybiIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiX2lzQm90IiwiYWN0aXZlIiwic2V0VGltZW91dCIsIkV4aXRDYXJkSW5mbyIsIkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkIiwiX3JhbmRvbVZhbHVlIiwiY2hpbGRyZW4iLCJnZXRDb21wb25lbnQiLCJzdHJpbmciLCJTaG93Q2FyZEluZm8iLCJDYXJkRnVudGlvbmFsaXR5QnV0dG9uIiwiR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkIiwiR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkIiwiR2VuZXJhdGVSYW5kb21XaWxkQ2FyZCIsIlNwYWNlSW52ZXN0IiwiX2luZGV4IiwiQ29tcGxldGVUdXJuV2l0aFRvYXN0IiwiU3BhY2VQYXlEYXkiLCJQYXlEYXlGdW5jdGlvbmFsaXR5IiwiU3BhY2VEb3VibGVQYXlEYXkiLCJEb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5IiwiU3BhY2VPbmVRdWVzdGlvbiIsIlNwYWNlU2VsbCIsIlNwYWNlQnV5T3JTZWxsIiwiU3BhY2VHb0JhY2tTcGFjZXMiLCJHb0JhY2tGdW5jdGlvbmFsaXR5IiwibWVzc2FnZSIsIl9zdGF0ZSIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUmVzZXRDYXJkRGlzcGxheSIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkiLCJDaGVja0xvYW4iLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJfbWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkdldFR1cm5OdW1iZXIiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwiTm9PZkJ1c2luZXNzIiwibGVuZ3RoIiwiTG9hblRha2VuIiwidmFsIiwiUmVzdWx0IiwidjIiLCJfbXNnIiwiX3RpbWUiLCJjb25zb2xlIiwibG9nIiwiX2RlbGF5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwiX2lkIiwiSW5kZXgiLCJwYXJzZUludCIsIl9yZXN1bHQiLCJJc0xvYW5UYWtlbiIsIngiLCJ5IiwiTG9hbkFtb3VudCIsIkxhd3llclN0YXR1cyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiRGljZTFSZXN1bHQiLCJSb2xsVHdvRGljZXMiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX21vZGUiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiX2Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkNhc2giLCJfYWN0b3JzQXJyYXkiLCJnZXRQaG90b25SZWYiLCJteVJvb21BY3RvcnNBcnJheSIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9sb3NlQW1vdW50IiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX21hcmtldEFtb3VudCIsIl9tdWx0aXBsaWVyIiwiX2luY3JlYXNlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJHZXRNYXJrZXRpbmdNb25leSIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJfYnVzaW5lc3NUeXBlIiwiQnVzaW5lc3NUeXBlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJEaWNlUmVzdWx0IiwiUm9sbE9uZURpY2UiLCJDYXNoTXVsaXRwbGllciIsIl9sb2FuUmVzZXQiLCJfdHlwZSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCLEVBQ0E7O0FBQ0EsSUFBSUMsYUFBYSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN4QkMsRUFBQUEsSUFBSSxFQUFDLENBRG1CO0FBRXhCQyxFQUFBQSxRQUFRLEVBQUUs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d0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0Q0RSxtQ0FBcEQsQ0FBd0YsSUFBeEY7QUFDQSxTQUFLaEcsWUFBTCxDQUFrQixFQUFsQixFQUFxQixLQUFyQjtBQUNILEdBMzBCa0I7QUE0MEJuQjJCLEVBQUFBLGlCQTUwQm1CLCtCQTYwQm5CO0FBQ0k3RixJQUFBQSx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDK0IscUJBQWxDLEdBQTBEK0MscUNBQTFELENBQWdHLElBQWhHO0FBQ0EsU0FBS2pHLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFDSCxHQWgxQmtCO0FBaTFCbkI2QixFQUFBQSxzQkFqMUJtQixvQ0FrMUJuQjtBQUNJL0YsSUFBQUEsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQytCLHFCQUFsQyxHQUEwRGdELGdDQUExRCxDQUEyRixJQUEzRjtBQUNBLFNBQUtsRyxZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0gsR0FyMUJrQjtBQXMxQm5CZ0IsRUFBQUEsbUJBdDFCbUIsaUNBdTFCbkIsQ0FFQztBQXoxQmtCLENBQVQsQ0FBZDtBQTIxQkFtRixNQUFNLENBQUNDLE9BQVAsR0FBZ0JqSSxTQUFoQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TcGFjZXMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bVNwYWNlVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgV2lsZENhcmQ6IDEsXHJcbiAgICBCaWdCdXNpbmVzczogMixcclxuICAgIE1hcmtldGluZzogMyxcclxuICAgIEludmVzdDogNCxcclxuICAgIExvc3Nlczo1LFxyXG4gICAgUGF5RGF5OiA2LFxyXG4gICAgRG91YmxlUGF5RGF5OiA3LFxyXG4gICAgT25lUXVlc3Rpb246IDgsXHJcbiAgICBTZWxsOiA5LFxyXG4gICAgQnV5T3JTZWxsOiAxMCxcclxuICAgIEdvQmFja1NwYWNlczoxMSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJDYXJkRGF0YVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIElEOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIklEXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiSWQgb2YgdGhlIGNhcmRcIn0sXHJcbiAgICAgICAgRGVzY3JpcHRpb246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRGVzY3JpcHRpb25cIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJkZXNjcmlwdGlvbiBvZiB0aGUgY2FyZFwifSxcclxuICAgICAgICBIYXNCdXR0b246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSGFzQnV0dG9uXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSBpbnRlcmFjdGlvbiBidXR0b25cIn0sXHJcbiAgICAgICAgQnV0dG9uTmFtZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJCdXR0b25OYW1lXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiYnV0dG9uIG5hbWUgdG8gc2hvdyBvbiBzY3JlZW5cIn0sXHJcbiB9LFxyXG5cclxuIGN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG4gfVxyXG5cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgY2FyZCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZFVJPWNjLkNsYXNzKHtcclxuICAgbmFtZTpcIkNhcmRVSVwiLFxyXG4gICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICBUb2FzdE5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0Tm9kZVwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwibm9kZSByZWZlcmVuY2UgZm9yIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgICBUb2FzdExhYmVsOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJUb2FzdExhYmVsXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwibGFiZWwgcmVmZXJlbmNlIGZvciB0b2FzdCBub2RlXCJ9LFxyXG4gICAgICBCdXR0b25Ob2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJ9LFxyXG4gICAgICAgIEludGVyYWN0aW9uQnV0dG9uTm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSW50ZXJhY3Rpb25CdXR0b25cIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcImludGVyYWN0aW9uIEJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIn0sXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG5cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBkZWNrcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEZWNrc0RhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkRlY2tzRGF0YVwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICBNYWluVUk6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJNYWluVUlcIixcclxuICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgdHlwZTogQ2FyZFVJLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJVSSBvZiBkZWNrc1wifSxcclxuICAgICAgQmlnQnVzaW5lc3M6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJCaWdCdXNpbmVzc1wiLFxyXG4gICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICB0b29sdGlwOlwiYWxsIGNhcmRzIGRhdGEgZm9yIGJpZyBidXNpbmVzc1wiLH0sXHJcbiAgICAgIE1hcmtldGluZzpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIk1hcmtldGluZ1wiLFxyXG4gICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICB0b29sdGlwOlwiYWxsIGNhcmRzIGRhdGEgZm9yIG1hcmtldGluZ1wiLH0sXHJcbiAgICAgICBMb3NzZXM6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJMb3NzZXNcIixcclxuICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgdG9vbHRpcDpcImFsbCBjYXJkcyBkYXRhIGZvciBsb3NzZXNcIix9LFxyXG4gICAgICAgV2lsZENhcmRzOlxyXG4gICAgICB7XHJcbiAgICAgICAgIGRpc3BsYXlOYW1lOlwiV2lsZENhcmRzXCIsXHJcbiAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJhbGwgY2FyZHMgZGF0YSBmb3IgV2lsZENhcmRzXCIsfSxcclxuICAgICAgICBTcGFjZXNUeXBlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogRW51bVNwYWNlVHlwZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogRW51bVNwYWNlVHlwZS5Ob25lLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJzdGF0ZXMgbWFjaGluZXMgYnkgdHlwZSBvZiBjYXJkIG9yIHNwYWNlcyBvbiBib2FyZFwiLH0sIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4PS0xO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD0tMTtcclxuICAgICAgdGhpcy5Jc0JvdFR1cm49ZmFsc2U7XHJcblxyXG4gICAgICAvL3RoaXMuQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShcIjFcIik7XHJcbiAgICAgIC8vZm9yIHRlc3RpbmdcclxuICAgICAgLy8gdGhpcy5Db3VudGVyPTA7XHJcbiAgICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb206ZnVuY3Rpb24obWluLG1heClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlQnV0dG9ucyhfaXNPd25lcixfaGFzQnV0dG9uPWZhbHNlLF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNPd25lciAmJiBfaGFzQnV0dG9uKVxyXG4gICAgICB7XHJcbiAgICAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSAgaWYoX2lzT3duZXIgJiYgIV9oYXNCdXR0b24pXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYoX2lzQm90PT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRDYXJkSW5mbygpO1xyXG4gICAgICAgICAgICB9LCAyNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSxfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuSXNCb3RUdXJuPV9pc0JvdDtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3M7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sX2lzQm90KTtcclxuXHJcbiAgICAgIGlmKF9pc0JvdClcclxuICAgICAge1xyXG4gICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSxfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuSXNCb3RUdXJuPV9pc0JvdDtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuTWFya2V0aW5nO1xyXG4gICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4PSBfcmFuZG9tVmFsdWU7XHJcbiAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkPXRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgaWYodGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG4gICAgXHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLF9pc0JvdCk7XHJcblxyXG4gICAgICBpZihfaXNCb3QpXHJcbiAgICAgIHtcclxuICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZChfaXNPd25lcixfcmFuZG9tVmFsdWUsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLklzQm90VHVybj1faXNCb3Q7XHJcbiAgICAgIHRoaXMuU3BhY2VzVHlwZT1FbnVtU3BhY2VUeXBlLkxvc3NlcztcclxuICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleD0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD10aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG5cclxuICAgICAgaWYodGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG4gICAgIFxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLF9pc0JvdCk7XHJcblxyXG4gICAgICBpZihfaXNCb3QpXHJcbiAgICAgIHtcclxuICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tV2lsZENhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlLF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5Jc0JvdFR1cm49X2lzQm90O1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5XaWxkQ2FyZDtcclxuICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleD0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD10aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuIFxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbix0cnVlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbixfaXNCb3QpO1xyXG5cclxuICAgICAgaWYoX2lzQm90KVxyXG4gICAgICB7XHJcbiAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUludmVzdChfaXNPd25lcixfaW5kZXgsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLklzQm90VHVybj1faXNCb3Q7XHJcbiAgICAgIHRoaXMuU3BhY2VzVHlwZT1FbnVtU3BhY2VUeXBlLkludmVzdDtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGludmVzdCBvbmUgbW9yZSB0aW1lIGluIEdvbGQgb3Igc3RvY2tzIHRoaXMgdHVybi5cIix0cnVlKTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiQUNDRVBUXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0cnVlLF9pc0JvdCk7XHJcblxyXG4gICAgICBpZihfaXNCb3QpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIm1zZ1wiLDIxMDApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlUGF5RGF5KF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gUGF5RGF5IHNwYWNlLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLlBheURheUZ1bmN0aW9uYWxpdHkoKTtcclxuXHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcixmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlRG91YmxlUGF5RGF5KF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gRG91YmxlUGF5RGF5IHNwYWNlLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLkRvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkoKTtcclxuXHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcixmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlT25lUXVlc3Rpb24oX2lzT3duZXIsX2luZGV4LF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLklzQm90VHVybj1faXNCb3Q7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuT25lUXVlc3Rpb247XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGFzayBvbmUgcXVlc3Rpb24gdG8gYW55IG90aGVyIHBsYXllciwgaWYgcGxheWVyIGlzIHVuYWJsZSB0byBhbnN3ZXIgdGhleSB3aWxsIHBheSB5b3Ugc29tZSBjYXNoIGFtb3VudC5cIix0cnVlKTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJBQ0NFUFRcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdHJ1ZSxfaXNCb3QpO1xyXG4gICAgICAgIGlmKF9pc0JvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZVNlbGwoX2lzT3duZXIsX2luZGV4LF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5Jc0JvdFR1cm49X2lzQm90O1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5TZWxsO1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gc2VsbCBhbnkgb25lIG9mIHlvdXIgYnVzaW5lc3Mgb3IgY2FuIHNraXAgdHVybi5cIix0cnVlKTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiQUNDRVBUXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0cnVlLF9pc0JvdCk7XHJcbiAgICAgIGlmKF9pc0JvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUJ1eU9yU2VsbChfaXNPd25lcixfaW5kZXgsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuPV9pc0JvdDtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5CdXlPclNlbGw7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIEJ1eSBvciBzZWxsIEdvbGQgb3Igc3RvY2tzIG9uZSBtb3JlIHRpbWUgaW4gdGhpcyB0dXJuLlwiLHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIkFDQ0VQVFwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0cnVlLF9pc0JvdCk7XHJcbiAgICAgICAgaWYoX2lzQm90KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwyMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlR29CYWNrU3BhY2VzKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gR28gQmFjayBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5Hb0JhY2tGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTaG93Q2FyZEluZm86ZnVuY3Rpb24obWVzc2FnZSxfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgIGlmKF9zdGF0ZSlcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuTWFpblVJLlRvYXN0Tm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdExhYmVsLnN0cmluZz1tZXNzYWdlO1xyXG4gICAgICB9ZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgIHRoaXMuTWFpblVJLlRvYXN0TGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgIHRoaXMuTWFpblVJLlRvYXN0Tm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRXhpdENhcmRJbmZvKClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZXNldENhcmREaXNwbGF5KCk7ICBcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTsgICBcclxuXHJcbiAgICAgIC8vZm9yIHRlc3RpbmdcclxuICAgICAgLy8gdGhpcy5Db3VudGVyKys7XHJcbiAgICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpXHJcbiAgICB7XHJcbiAgICAgIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5CaWdCdXNpbmVzcylcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCk7XHJcbiAgICAgIH1lbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5Mb3NzZXMpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLkxvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5NYXJrZXRpbmcpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5XaWxkQ2FyZClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuV2lsZENhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5TZWxsKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5TZWxsRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLkludmVzdClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0RnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLkJ1eU9yU2VsbClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja0xvYW4oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICBfYnVzaW5lc3NJbmRleD1pbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHZhbD0tMTtcclxuICAgICAgICB2YWw9X2xvYW5UYWtlbj09dHJ1ZT8xOjA7XHJcbiAgICAgICAgdmFyIFJlc3VsdD1jYy52Mih2YWwsIF9idXNpbmVzc0luZGV4KVxyXG4gICAgICAgIHJldHVybiBSZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBsZXRlVHVybldpdGhUb2FzdChfbXNnLF90aW1lKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuSXNCb3RUdXJuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX21zZyk7XHJcbiAgICAgICAgICAgIHZhciBfZGVsYXk9dGhpcy5nZXRSYW5kb20oMTUwMCwyNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5SZXNldENhcmREaXNwbGF5KCk7ICBcclxuICAgICAgICAgICAgX21hbmFnZXIuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpOyAgIFxyXG4gICAgICAgICAgICB9LCAoX2RlbGF5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX21zZyxfdGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5SZXNldENhcmREaXNwbGF5KCk7ICBcclxuICAgICAgICAgICAgX21hbmFnZXIuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpOyAgIFxyXG4gICAgICAgICAgICB9LCAoX3RpbWUrMTAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KF9pZClcclxuICAgIHtcclxuICAgICAgdmFyIEluZGV4PXBhcnNlSW50KF9pZCk7XHJcbiAgICAgIEluZGV4PUluZGV4LTE7XHJcblxyXG4gICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgY2FzZSBcIjFcIjovL3JlY2VpdmUgMjAwMDAkIGdpZnQgdG8gcGF5b2ZmIGxvYW5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3Jlc3VsdD10aGlzLkNoZWNrTG9hbigpO1xyXG4gICAgICAgICAgICAgdmFyIElzTG9hblRha2VuPV9yZXN1bHQueDtcclxuICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD1fcmVzdWx0Lnk7XHJcblxyXG4gICAgICAgICAgICAgaWYoSXNMb2FuVGFrZW49PTEpIC8vbWVhbnMgdXNlciBoYXMgdGFrZW4gbG9hblxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQtMjAwMDA7XHJcbiAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDw9MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJMb2FuIGFtb3VudCBvZiAkMjAwMDAgaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBub3QgdGFrZW4gYW55IGxvYW4sIHR1cm4gd2lsbCBza2lwIG5vdy5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjogLy9oaXJlIGxhd3llclxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cylcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgYWxyZWFkeSBoaXJlZCBsYXl3ZXIsIHR1cm4gd2lsbCBza2lwIG5vdy5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llci5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjZcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI4XCI6Ly9kb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheSBkYXlcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMTgwMCk7XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI5XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6Ly9yb2xsIGRpY2UgdHdpY2UsIGlmIHJlc3VsdCBpcyA+MTkgdGhlbiB0YWtlIGFsbCBtb25leSBpbnNpZGUgbWFya2V0aW5nLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgdmFyIERpY2UxUmVzdWx0PV9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgdmFyIERpY2UyUmVzdWx0PV9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgICAgICAgLy8gIHZhciBEaWNlMVJlc3VsdD0xMjtcclxuICAgICAgICAgICAgLy8gIHZhciBEaWNlMlJlc3VsdD0xMjtcclxuXHJcbiAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ9RGljZTFSZXN1bHQrRGljZTJSZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgaWYoVG90YWxSZXN1bHQ+PTE5KVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9tb2RlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgdmFyIF9hbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2Ftb3VudD1fYW1vdW50K19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grPV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIitEaWNlMVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICAgXCJEaWNlIDIgUmVzdWx0OiBcIitEaWNlMlJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICAgXCJUb3RhbDogXCIrVG90YWxSZXN1bHQrXCJcXG5cIitcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICAgXCJBbW91bnQgJFwiK19hbW91bnQrXCIgaGFzIHN1Y2Nlc3NmdWxseSBhZGRlZCBpbiB5b3VyIGNhc2ggZnJvbSBtYXJrZXRpbmcgYW1vdW50IG9uIHRhYmxlLlwiXHJcbiAgICAgICAgICAgICAgICAgLDQwMDApO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgaWYoX21vZGU9PTIpXHJcbiAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfYWN0b3JzQXJyYXk9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRGljZSAxIFJlc3VsdDogXCIrRGljZTFSZXN1bHQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJEaWNlIDIgUmVzdWx0OiBcIitEaWNlMlJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiWW91IHJhbiBvdXQgb2YgbHVjaywgdHVybiB3aWxsIHNraXAgbm93XCJcclxuICAgICAgICAgICAgICAgICw0MDAwKTtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE0XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIE1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KF9pZClcclxuICAgIHtcclxuICAgICAgdmFyIEluZGV4PXBhcnNlSW50KF9pZCk7XHJcbiAgICAgIEluZGV4PUluZGV4LTE7XHJcblxyXG4gICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgY2FzZSBcIjFcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50PV9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9sb3NlQW1vdW50PjApXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIitfbG9zZUFtb3VudCwyMTAwKTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOi8vWW91ciBNYXJrZXRpbmcgQWNjb3VudCB0cmlwbGVzLCBidXQgeW91IG11c3QgbGVhdmUgaXQgaW4gdGhlIGFjY291bnQuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbWFya2V0QW1vdW50PV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgdmFyIF9tdWx0aXBsaWVyPTM7XHJcbiAgICAgICAgICAgICB2YXIgX2luY3JlYXNlQW1vdW50PV9tYW5hZ2VyLk11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9pbmNyZWFzZUFtb3VudD4wKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJNYXJrZXRpbmcgQW1vdW50OiAkXCIrX21hcmtldEFtb3VudCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitfbWFya2V0QW1vdW50K1wiICogXCIrX211bHRpcGxpZXIrXCIgPSBcIitfaW5jcmVhc2VBbW91bnQrXCJcXG5cIitcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcInlvdXIgbWFya2V0aW5nIGFtb3VudCBoYXMgYmVlbiBzdWNlc3NmdWxseSBpbmNyZWFzZSB0byAkXCIrX2luY3JlYXNlQW1vdW50XHJcbiAgICAgICAgICAgICAgICAsMzEwMCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjZcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50PV9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9sb3NlQW1vdW50PjApXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIitfbG9zZUFtb3VudCwyMTAwKTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQ9X21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2xvc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19sb3NlQW1vdW50LDIxMDApO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMFwiOi8vUmVjZWl2ZSBhbGwgb2YgeW91ciBNYXJrZXRpbmcgQnVkZ2V0IGJhY2ssIHBsdXMgNzAwJSBwcm9maXQuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbWFya2V0QW1vdW50PV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgdmFyIF9wcm9maXQ9NzAwO1xyXG4gICAgICAgICAgICAgdmFyIF9hbW91bnQ9X21hbmFnZXIuR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2Ftb3VudD4wKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJNYXJrZXRpbmcgQW1vdW50OiAkXCIrX21hcmtldEFtb3VudCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitfbWFya2V0QW1vdW50K1wiICsgKFwiK19tYXJrZXRBbW91bnQrXCIqXCIrX3Byb2ZpdCtcIiApLzEwMFwiK1wiID0gXCIrX2Ftb3VudCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwieW91ciBjYXNoIGFtb3VudCBoYXMgYmVlbiBzdWNlc3NmdWxseSBpbmNyZWFzZSBieSAkXCIrX2Ftb3VudCtcIiwgdG90YWwgY2FzaCBiZWNvbWVzICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2hcclxuICAgICAgICAgICAgICAgICw0MDAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE0XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudD1fbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbG9zZUFtb3VudD4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIrX2xvc2VBbW91bnQsMjEwMCk7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBMb3NzZXNDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9sb3NlIG5leHQgdHVyblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwTmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIGxvc2UgeW91ciBuZXh0IHR1cm4uXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjNcIjovL2xvc2UgYWxsIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3Ugd2lsbCBsb3NlIGFsbCB5b3VyIGJ1c2luZXNzIHByb2ZpdHMgb24gbmV4dCBQYXkgRGF5LlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI0XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6Ly8gSWYgQnVzaW5lc3MgIzEgaXMgSG9tZSBCYXNlZCwgcGF5IGEgJDUsMDAwIEluc3VyYW5jZSBEZWR1Y3RpYmxlOyBpZiBCcmljayAmIE1vcnRhciAkMTAsMDAwIGRlZHVjdGlibGUuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICB2YXIgX2J1c2luZXNzVHlwZT1wYXJzZUludChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUpO1xyXG4gICAgICAgICAgICAgaWYoX2J1c2luZXNzVHlwZT09MSkgLy8gZmlyc3QgYnVzaW5lc3Mgd2FzIGhvbWUgYmFzZWRcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PTUwMDApXHJcbiAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC09NTAwMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBwYXllZCAkNTAwMCBpbnN1cmFuY2Ugb24geW91ciBmaXJzdCBob21lIGJhc2VkIGJ1c2luZXNzLCByZW1haW5pbmcgY2FzaCBpcyAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2UgaWYgKF9idXNpbmVzc1R5cGU9PTIpIC8vZmlyc3QgYnVzaW9uZXNzIHdhcyBicmljayAmIG1vcnRhclxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj0xMDAwMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC09MTAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBwYXllZCAkMTAwMDAgaW5zdXJhbmNlIG9uIHlvdXIgZmlyc3QgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIiwxODAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOi8vbG9zZSB5b3VyIG5leHQgUGF5IERheSBmb3IgYWxsIG9mIHlvdXIgaG9tZS1iYXNlZCBidXNpbmVzc2VzLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSB3aWxsIGxvc2UgeW91ciBuZXh0IFBheSBEYXkgZm9yIGFsbCBvZiB5b3VyIGhvbWUtYmFzZWQgYnVzaW5lc3Nlcy5cIiwyMTAwKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI4XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI5XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTFcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBXaWxkQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkKVxyXG4gICAge1xyXG4gICAgICB2YXIgSW5kZXg9cGFyc2VJbnQoX2lkKTtcclxuICAgICAgSW5kZXg9SW5kZXgtMTtcclxuXHJcbiAgICAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICAgICBjYXNlIFwiMVwiOi8vZG91YmxlcyB5b3VyIGluY29tZSBvbiB0aGUgbmV4dCBQYXkgRGF5LlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjovL1JvbGwgMSBkaWUsIG11bHRpcGx5IHJlc3VsdCBieSAkNSwwMDAgYW5kIHJlY2VpdmUgeW91ciBhZHZhbmNlIGZyb20gdGhlIEJhbmsuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgdmFyIERpY2VSZXN1bHQ9X21hbmFnZXIuUm9sbE9uZURpY2UoKTtcclxuICAgICAgICAgICAgIHZhciBDYXNoTXVsaXRwbGllcj01MDAwO1xyXG4gICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0PURpY2VSZXN1bHQqQ2FzaE11bGl0cGxpZXI7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz1Ub3RhbFJlc3VsdDtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRGljZSBSZXN1bHQ6IFwiK0RpY2VSZXN1bHQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbDogXCIrRGljZVJlc3VsdCtcIiAqIFwiK0Nhc2hNdWxpdHBsaWVyK1wiID0gXCIrVG90YWxSZXN1bHQrXCJcXG5cIitcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkFtb3VudCAkXCIrVG90YWxSZXN1bHQrXCIgaGFzIGJlZW4gYWRkZWQgaW50byB5b3VyIGNhc2guXCJcclxuICAgICAgICAgICAgICAgICw0MDAwKTtcclxuXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjZcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjovL3BheSBvZmYgeW91ciBsb2FuIGZvciB5b3VyIEJyaWNrICYgTW9ydGFyIEJ1c2luZXNzLiBJZiB5b3UgaGF2ZSBubyBsb2FuIG91dHN0YW5kaW5nLCByZWNlaXZlICQ1MCwwMDAuXHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB2YXIgX2xvYW5SZXNldD1mYWxzZTtcclxuICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdHlwZT1wYXJzZUludChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmKF90eXBlPT0yICYmIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIF9sb2FuUmVzZXQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoX2xvYW5SZXNldClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3VyIG91dHN0YW5kaW5nIGxvYW4gaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiLDI4MDApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grPTUwMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgaGFkIG5vIGxvYW4sIGFtb3VudCAkNTAwMDAgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoXCIsMjgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI4XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI5XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTFcIjovLyByZWNlaXZlIGRvdWJsZSB5b3VyIGJ1c2luZXNzIHByb2ZpdHMgb24gYWxsIG9mIHlvdXIgYnVzaW5lc3Nlcy5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE0XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgSW52ZXN0RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFBheURheUZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbiAgICBEb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25GdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgU2VsbEZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBHb0JhY2tGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuXHJcbiAgICB9LFxyXG59KTtcclxubW9kdWxlLmV4cG9ydHM9IERlY2tzRGF0YTtcclxuIl19