
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

      var _delay = this.getRandom(1500, 2500);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiRW51bVNwYWNlVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJXaWxkQ2FyZCIsIkJpZ0J1c2luZXNzIiwiTWFya2V0aW5nIiwiSW52ZXN0IiwiTG9zc2VzIiwiUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiT25lUXVlc3Rpb24iLCJTZWxsIiwiQnV5T3JTZWxsIiwiR29CYWNrU3BhY2VzIiwiQ2FyZERhdGEiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiSUQiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJUZXh0Iiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkRlc2NyaXB0aW9uIiwiSGFzQnV0dG9uIiwiQnV0dG9uTmFtZSIsImN0b3IiLCJDYXJkVUkiLCJUb2FzdE5vZGUiLCJOb2RlIiwiVG9hc3RMYWJlbCIsIkxhYmVsIiwiQnV0dG9uTm9kZSIsIkludGVyYWN0aW9uQnV0dG9uTm9kZSIsIkRlY2tzRGF0YSIsIkNvbXBvbmVudCIsIk1haW5VSSIsIldpbGRDYXJkcyIsIlNwYWNlc1R5cGUiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTZWxlY3RlZENhcmRJbmRleCIsIkNhcmRTZWxlY3RlZCIsIklzQm90VHVybiIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiX2lzQm90IiwiYWN0aXZlIiwic2V0VGltZW91dCIsIkV4aXRDYXJkSW5mbyIsIkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkIiwiX3JhbmRvbVZhbHVlIiwiY2hpbGRyZW4iLCJnZXRDb21wb25lbnQiLCJzdHJpbmciLCJTaG93Q2FyZEluZm8iLCJDYXJkRnVudGlvbmFsaXR5QnV0dG9uIiwiR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkIiwiR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkIiwiR2VuZXJhdGVSYW5kb21XaWxkQ2FyZCIsIlNwYWNlSW52ZXN0IiwiX2luZGV4IiwiQ29tcGxldGVUdXJuV2l0aFRvYXN0IiwiU3BhY2VQYXlEYXkiLCJQYXlEYXlGdW5jdGlvbmFsaXR5IiwiU3BhY2VEb3VibGVQYXlEYXkiLCJEb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5IiwiU3BhY2VPbmVRdWVzdGlvbiIsIlNwYWNlU2VsbCIsIlNwYWNlQnV5T3JTZWxsIiwiU3BhY2VHb0JhY2tTcGFjZXMiLCJtZXNzYWdlIiwiX3N0YXRlIiwiSW5zdGFuY2UiLCJHZXRfR2FtZU1hbmFnZXIiLCJSZXNldENhcmREaXNwbGF5IiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJMb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSIsIk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5IiwiV2lsZENhcmRGdW5jdGlvbmFsaXR5IiwiU2VsbEZ1bmN0aW9uYWxpdHkiLCJJbnZlc3RGdW5jdGlvbmFsaXR5IiwiQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSIsIk9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSIsIkdvQmFja0Z1bmN0aW9uYWxpdHkiLCJDaGVja0xvYW4iLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJfbWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkdldFR1cm5OdW1iZXIiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwiTm9PZkJ1c2luZXNzIiwibGVuZ3RoIiwiTG9hblRha2VuIiwidmFsIiwiUmVzdWx0IiwidjIiLCJfbXNnIiwiX3RpbWUiLCJjb25zb2xlIiwibG9nIiwiX2RlbGF5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwiX2lkIiwiSW5kZXgiLCJwYXJzZUludCIsIl9yZXN1bHQiLCJJc0xvYW5UYWtlbiIsIngiLCJ5IiwiTG9hbkFtb3VudCIsIkxhd3llclN0YXR1cyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiRGljZTFSZXN1bHQiLCJSb2xsVHdvRGljZXMiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX21vZGUiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiX2Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkNhc2giLCJfYWN0b3JzQXJyYXkiLCJnZXRQaG90b25SZWYiLCJteVJvb21BY3RvcnNBcnJheSIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9sb3NlQW1vdW50IiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX21hcmtldEFtb3VudCIsIl9tdWx0aXBsaWVyIiwiX2luY3JlYXNlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJHZXRNYXJrZXRpbmdNb25leSIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJfYnVzaW5lc3NUeXBlIiwiQnVzaW5lc3NUeXBlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJEaWNlUmVzdWx0IiwiUm9sbE9uZURpY2UiLCJDYXNoTXVsaXRwbGllciIsIl9sb2FuUmVzZXQiLCJfdHlwZSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3QixFQUNBOztBQUNBLElBQUlDLGFBQWEsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDeEJDLEVBQUFBLElBQUks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RixJQUEzRjtBQUNBLFNBQUtsRyxZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0gsR0FqMkJrQjtBQWsyQm5COEIsRUFBQUEsbUJBbDJCbUIsaUNBbTJCbkI7QUFDSWhHLElBQUFBLHdCQUF3QixDQUFDb0YsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EZ0YsK0JBQXBEO0FBQ0EsU0FBS25HLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFDSDtBQXQyQmtCLENBQVQsQ0FBZDtBQXcyQkFvRyxNQUFNLENBQUNDLE9BQVAsR0FBZ0JsSSxTQUFoQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TcGFjZXMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bVNwYWNlVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgV2lsZENhcmQ6IDEsXHJcbiAgICBCaWdCdXNpbmVzczogMixcclxuICAgIE1hcmtldGluZzogMyxcclxuICAgIEludmVzdDogNCxcclxuICAgIExvc3Nlczo1LFxyXG4gICAgUGF5RGF5OiA2LFxyXG4gICAgRG91YmxlUGF5RGF5OiA3LFxyXG4gICAgT25lUXVlc3Rpb246IDgsXHJcbiAgICBTZWxsOiA5LFxyXG4gICAgQnV5T3JTZWxsOiAxMCxcclxuICAgIEdvQmFja1NwYWNlczoxMSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJDYXJkRGF0YVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIElEOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIklEXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiSWQgb2YgdGhlIGNhcmRcIn0sXHJcbiAgICAgICAgRGVzY3JpcHRpb246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRGVzY3JpcHRpb25cIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJkZXNjcmlwdGlvbiBvZiB0aGUgY2FyZFwifSxcclxuICAgICAgICBIYXNCdXR0b246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSGFzQnV0dG9uXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSBpbnRlcmFjdGlvbiBidXR0b25cIn0sXHJcbiAgICAgICAgQnV0dG9uTmFtZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJCdXR0b25OYW1lXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiYnV0dG9uIG5hbWUgdG8gc2hvdyBvbiBzY3JlZW5cIn0sXHJcbiB9LFxyXG5cclxuIGN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG4gfVxyXG5cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgY2FyZCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZFVJPWNjLkNsYXNzKHtcclxuICAgbmFtZTpcIkNhcmRVSVwiLFxyXG4gICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICBUb2FzdE5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0Tm9kZVwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwibm9kZSByZWZlcmVuY2UgZm9yIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgICBUb2FzdExhYmVsOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJUb2FzdExhYmVsXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwibGFiZWwgcmVmZXJlbmNlIGZvciB0b2FzdCBub2RlXCJ9LFxyXG4gICAgICBCdXR0b25Ob2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJ9LFxyXG4gICAgICAgIEludGVyYWN0aW9uQnV0dG9uTm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSW50ZXJhY3Rpb25CdXR0b25cIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcImludGVyYWN0aW9uIEJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIn0sXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG5cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBkZWNrcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEZWNrc0RhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkRlY2tzRGF0YVwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICBNYWluVUk6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJNYWluVUlcIixcclxuICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgdHlwZTogQ2FyZFVJLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJVSSBvZiBkZWNrc1wifSxcclxuICAgICAgQmlnQnVzaW5lc3M6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJCaWdCdXNpbmVzc1wiLFxyXG4gICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICB0b29sdGlwOlwiYWxsIGNhcmRzIGRhdGEgZm9yIGJpZyBidXNpbmVzc1wiLH0sXHJcbiAgICAgIE1hcmtldGluZzpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIk1hcmtldGluZ1wiLFxyXG4gICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICB0b29sdGlwOlwiYWxsIGNhcmRzIGRhdGEgZm9yIG1hcmtldGluZ1wiLH0sXHJcbiAgICAgICBMb3NzZXM6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJMb3NzZXNcIixcclxuICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgdG9vbHRpcDpcImFsbCBjYXJkcyBkYXRhIGZvciBsb3NzZXNcIix9LFxyXG4gICAgICAgV2lsZENhcmRzOlxyXG4gICAgICB7XHJcbiAgICAgICAgIGRpc3BsYXlOYW1lOlwiV2lsZENhcmRzXCIsXHJcbiAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJhbGwgY2FyZHMgZGF0YSBmb3IgV2lsZENhcmRzXCIsfSxcclxuICAgICAgICBTcGFjZXNUeXBlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogRW51bVNwYWNlVHlwZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogRW51bVNwYWNlVHlwZS5Ob25lLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJzdGF0ZXMgbWFjaGluZXMgYnkgdHlwZSBvZiBjYXJkIG9yIHNwYWNlcyBvbiBib2FyZFwiLH0sIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4PS0xO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD0tMTtcclxuICAgICAgdGhpcy5Jc0JvdFR1cm49ZmFsc2U7XHJcblxyXG4gICAgICAvL3RoaXMuQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShcIjFcIik7XHJcbiAgICAgIC8vZm9yIHRlc3RpbmdcclxuICAgICAgLy8gdGhpcy5Db3VudGVyPTA7XHJcbiAgICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb206ZnVuY3Rpb24obWluLG1heClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlQnV0dG9ucyhfaXNPd25lcixfaGFzQnV0dG9uPWZhbHNlLF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNPd25lciAmJiBfaGFzQnV0dG9uKVxyXG4gICAgICB7XHJcbiAgICAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSAgaWYoX2lzT3duZXIgJiYgIV9oYXNCdXR0b24pXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYoX2lzQm90PT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkV4aXRDYXJkSW5mbygpO1xyXG4gICAgICAgICAgICB9LCAyNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSxfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuSXNCb3RUdXJuPV9pc0JvdDtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3M7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24sX2lzQm90KTtcclxuXHJcbiAgICAgIGlmKF9pc0JvdClcclxuICAgICAge1xyXG4gICAgICAgICAgdGhpcy5DYXJkRnVudGlvbmFsaXR5QnV0dG9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSxfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuSXNCb3RUdXJuPV9pc0JvdDtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuTWFya2V0aW5nO1xyXG4gICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4PSBfcmFuZG9tVmFsdWU7XHJcbiAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkPXRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgaWYodGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG4gICAgXHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLF9pc0JvdCk7XHJcblxyXG4gICAgICBpZihfaXNCb3QpXHJcbiAgICAgIHtcclxuICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZChfaXNPd25lcixfcmFuZG9tVmFsdWUsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLklzQm90VHVybj1faXNCb3Q7XHJcbiAgICAgIHRoaXMuU3BhY2VzVHlwZT1FbnVtU3BhY2VUeXBlLkxvc3NlcztcclxuICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleD0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD10aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG5cclxuICAgICAgaWYodGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG4gICAgIFxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uLF9pc0JvdCk7XHJcblxyXG4gICAgICBpZihfaXNCb3QpXHJcbiAgICAgIHtcclxuICAgICAgICAgIHRoaXMuQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tV2lsZENhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlLF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5Jc0JvdFR1cm49X2lzQm90O1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5XaWxkQ2FyZDtcclxuICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleD0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD10aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuIFxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbix0cnVlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbixfaXNCb3QpO1xyXG5cclxuICAgICAgaWYoX2lzQm90KVxyXG4gICAgICB7XHJcbiAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUludmVzdChfaXNPd25lcixfaW5kZXgsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLklzQm90VHVybj1faXNCb3Q7XHJcbiAgICAgIHRoaXMuU3BhY2VzVHlwZT1FbnVtU3BhY2VUeXBlLkludmVzdDtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGludmVzdCBvbmUgbW9yZSB0aW1lIGluIEdvbGQgb3Igc3RvY2tzIHRoaXMgdHVybi5cIix0cnVlKTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiRXhlY3V0ZVwiO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdHJ1ZSxfaXNCb3QpO1xyXG5cclxuICAgICAgaWYoX2lzQm90KVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwyMTAwKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZVBheURheShfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIFBheURheSBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5QYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZURvdWJsZVBheURheShfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIERvdWJsZVBheURheSBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5Eb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZU9uZVF1ZXN0aW9uKF9pc093bmVyLF9pbmRleCxfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Jc0JvdFR1cm49X2lzQm90O1xyXG4gICAgICAgIHRoaXMuU3BhY2VzVHlwZT1FbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBhc2sgb25lIHF1ZXN0aW9uIHRvIGFueSBvdGhlciBwbGF5ZXIsIGlmIHBsYXllciBpcyB1bmFibGUgdG8gYW5zd2VyIHRoZXkgd2lsbCBwYXkgeW91IHNvbWUgY2FzaCBhbW91bnQuXCIsdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiRXhlY3V0ZVwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0cnVlLF9pc0JvdCk7XHJcbiAgICAgICAgaWYoX2lzQm90KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJtc2dcIiwyMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlU2VsbChfaXNPd25lcixfaW5kZXgsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLklzQm90VHVybj1faXNCb3Q7XHJcbiAgICAgIHRoaXMuU3BhY2VzVHlwZT1FbnVtU3BhY2VUeXBlLlNlbGw7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBzZWxsIGFueSBvbmUgb2YgeW91ciBidXNpbmVzcyBvciBjYW4gc2tpcCB0dXJuLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJFeGVjdXRlXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0cnVlLF9pc0JvdCk7XHJcbiAgICAgIGlmKF9pc0JvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUJ1eU9yU2VsbChfaXNPd25lcixfaW5kZXgsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuPV9pc0JvdDtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5CdXlPclNlbGw7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIEJ1eSBvciBzZWxsIEdvbGQgb3Igc3RvY2tzIG9uZSBtb3JlIHRpbWUgaW4gdGhpcyB0dXJuLlwiLHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIkV4ZWN1dGVcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdHJ1ZSxfaXNCb3QpO1xyXG4gICAgICAgIGlmKF9pc0JvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwibXNnXCIsMjEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUdvQmFja1NwYWNlcyhfaXNPd25lcixfaW5kZXgsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSXNCb3RUdXJuPV9pc0JvdDtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5Hb0JhY2tTcGFjZXM7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJ5b3Ugd2lsbCBoYXZlIHRvIGdvIGJhY2sgMyBzcGFjZXMuXCIsdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiRXhlY3V0ZVwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0cnVlLF9pc0JvdCk7XHJcbiAgICAgICAgaWYoX2lzQm90KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhcmRGdW50aW9uYWxpdHlCdXR0b24oKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2hvd0NhcmRJbmZvOmZ1bmN0aW9uKG1lc3NhZ2UsX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICBpZihfc3RhdGUpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmc9bWVzc2FnZTtcclxuICAgICAgfWVsc2VcclxuICAgICAge1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdExhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRDYXJkSW5mbygpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVzZXRDYXJkRGlzcGxheSgpOyAgXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7ICAgXHJcblxyXG4gICAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAgIC8vIHRoaXMuQ291bnRlcisrO1xyXG4gICAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIENhcmRGdW50aW9uYWxpdHlCdXR0b24oKVxyXG4gICAge1xyXG4gICAgICBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3MpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICB9ZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuTG9zc2VzKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5Mb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuTWFya2V0aW5nKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuV2lsZENhcmQpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLldpbGRDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuU2VsbClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuU2VsbEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5JbnZlc3QpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLkludmVzdEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5CdXlPclNlbGwpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5PbmVRdWVzdGlvbilcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuT25lUXVlc3Rpb25GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuR29CYWNrU3BhY2VzKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5Hb0JhY2tGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tMb2FuKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9MDtcclxuXHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB2YWw9LTE7XHJcbiAgICAgICAgdmFsPV9sb2FuVGFrZW49PXRydWU/MTowO1xyXG4gICAgICAgIHZhciBSZXN1bHQ9Y2MudjIodmFsLCBfYnVzaW5lc3NJbmRleClcclxuICAgICAgICByZXR1cm4gUmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBDb21wbGV0ZVR1cm5XaXRoVG9hc3QoX21zZyxfdGltZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgICAgICBpZih0aGlzLklzQm90VHVybilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF9tc2cpO1xyXG4gICAgICAgICAgICB2YXIgX2RlbGF5PXRoaXMuZ2V0UmFuZG9tKDE1MDAsMjUwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUmVzZXRDYXJkRGlzcGxheSgpOyAgXHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTsgICBcclxuICAgICAgICAgICAgfSwgKF9kZWxheSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KF9tc2csX3RpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUmVzZXRDYXJkRGlzcGxheSgpOyAgXHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTsgICBcclxuICAgICAgICAgICAgfSwgKF90aW1lKzEwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9yZWNlaXZlIDIwMDAwJCBnaWZ0IHRvIHBheW9mZiBsb2FuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9yZXN1bHQ9dGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICAgICAgIHZhciBJc0xvYW5UYWtlbj1fcmVzdWx0Lng7XHJcbiAgICAgICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9X3Jlc3VsdC55O1xyXG5cclxuICAgICAgICAgICAgIGlmKElzTG9hblRha2VuPT0xKSAvL21lYW5zIHVzZXIgaGFzIHRha2VuIGxvYW5cclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50LTIwMDAwO1xyXG4gICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ8PTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTG9hbiBhbW91bnQgb2YgJDIwMDAwIGhhcyBiZWVuIHBheWVkIG9mZi5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbm90IHRha2VuIGFueSBsb2FuLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6IC8vaGlyZSBsYXd5ZXJcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgaGlyZWQgbGF5d2VyLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOi8vZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXkgZGF5XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLDE4MDApO1xyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOi8vcm9sbCBkaWNlIHR3aWNlLCBpZiByZXN1bHQgaXMgPjE5IHRoZW4gdGFrZSBhbGwgbW9uZXkgaW5zaWRlIG1hcmtldGluZy5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBEaWNlMVJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgIHZhciBEaWNlMlJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICB2YXIgRGljZTFSZXN1bHQ9MTI7XHJcbiAgICAgICAgICAgIC8vICB2YXIgRGljZTJSZXN1bHQ9MTI7XHJcblxyXG4gICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0PURpY2UxUmVzdWx0K0RpY2UyUmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgIGlmKFRvdGFsUmVzdWx0Pj0xOSlcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfbW9kZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9hbW91bnQ9X2Ftb3VudCtfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz1fYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRGljZSAxIFJlc3VsdDogXCIrRGljZTFSZXN1bHQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgIFwiRGljZSAyIFJlc3VsdDogXCIrRGljZTJSZXN1bHQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgIFwiQW1vdW50ICRcIitfYW1vdW50K1wiIGhhcyBzdWNjZXNzZnVsbHkgYWRkZWQgaW4geW91ciBjYXNoIGZyb20gbWFya2V0aW5nIGFtb3VudCBvbiB0YWJsZS5cIlxyXG4gICAgICAgICAgICAgICAgICw0MDAwKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgIGlmKF9tb2RlPT0yKVxyXG4gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2FjdG9yc0FycmF5PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2FjdG9yc0FycmF5W2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgMSBSZXN1bHQ6IFwiK0RpY2UxUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiRGljZSAyIFJlc3VsdDogXCIrRGljZTJSZXN1bHQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbDogXCIrVG90YWxSZXN1bHQrXCJcXG5cIitcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIllvdSByYW4gb3V0IG9mIGx1Y2ssIHR1cm4gd2lsbCBza2lwIG5vd1wiXHJcbiAgICAgICAgICAgICAgICAsNDAwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudD1fbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbG9zZUFtb3VudD4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIrX2xvc2VBbW91bnQsMjEwMCk7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjovL1lvdXIgTWFya2V0aW5nIEFjY291bnQgdHJpcGxlcywgYnV0IHlvdSBtdXN0IGxlYXZlIGl0IGluIHRoZSBhY2NvdW50LlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX21hcmtldEFtb3VudD1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgIHZhciBfbXVsdGlwbGllcj0zO1xyXG4gICAgICAgICAgICAgdmFyIF9pbmNyZWFzZUFtb3VudD1fbWFuYWdlci5NdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfaW5jcmVhc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTWFya2V0aW5nIEFtb3VudDogJFwiK19tYXJrZXRBbW91bnQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbDogXCIrX21hcmtldEFtb3VudCtcIiAqIFwiK19tdWx0aXBsaWVyK1wiID0gXCIrX2luY3JlYXNlQW1vdW50K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJ5b3VyIG1hcmtldGluZyBhbW91bnQgaGFzIGJlZW4gc3VjZXNzZnVsbHkgaW5jcmVhc2UgdG8gJFwiK19pbmNyZWFzZUFtb3VudFxyXG4gICAgICAgICAgICAgICAgLDMxMDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI3XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI4XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudD1fbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbG9zZUFtb3VudD4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIrX2xvc2VBbW91bnQsMjEwMCk7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50PV9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9sb3NlQW1vdW50PjApXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIitfbG9zZUFtb3VudCwyMTAwKTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTBcIjovL1JlY2VpdmUgYWxsIG9mIHlvdXIgTWFya2V0aW5nIEJ1ZGdldCBiYWNrLCBwbHVzIDcwMCUgcHJvZml0LlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX21hcmtldEFtb3VudD1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgIHZhciBfcHJvZml0PTcwMDtcclxuICAgICAgICAgICAgIHZhciBfYW1vdW50PV9tYW5hZ2VyLkdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9hbW91bnQ+MClcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTWFya2V0aW5nIEFtb3VudDogJFwiK19tYXJrZXRBbW91bnQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbDogXCIrX21hcmtldEFtb3VudCtcIiArIChcIitfbWFya2V0QW1vdW50K1wiKlwiK19wcm9maXQrXCIgKS8xMDBcIitcIiA9IFwiK19hbW91bnQrXCJcXG5cIitcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcInlvdXIgY2FzaCBhbW91bnQgaGFzIGJlZW4gc3VjZXNzZnVsbHkgaW5jcmVhc2UgYnkgJFwiK19hbW91bnQrXCIsIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoXHJcbiAgICAgICAgICAgICAgICAsNDAwMCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQ9X21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2xvc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19sb3NlQW1vdW50LDIxMDApO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkKVxyXG4gICAge1xyXG4gICAgICB2YXIgSW5kZXg9cGFyc2VJbnQoX2lkKTtcclxuICAgICAgSW5kZXg9SW5kZXgtMTtcclxuXHJcbiAgICAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICAgICBjYXNlIFwiMVwiOi8vbG9zZSBuZXh0IHR1cm5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcE5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCBsb3NlIHlvdXIgbmV4dCB0dXJuLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6Ly9sb3NlIGFsbCB5b3VyIGJ1c2luZXNzIHByb2ZpdHMgb24gbmV4dCBQYXkgRGF5LlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9XaG9sZSh0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOi8vIElmIEJ1c2luZXNzICMxIGlzIEhvbWUgQmFzZWQsIHBheSBhICQ1LDAwMCBJbnN1cmFuY2UgRGVkdWN0aWJsZTsgaWYgQnJpY2sgJiBNb3J0YXIgJDEwLDAwMCBkZWR1Y3RpYmxlLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgdmFyIF9idXNpbmVzc1R5cGU9cGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlKTtcclxuICAgICAgICAgICAgIGlmKF9idXNpbmVzc1R5cGU9PTEpIC8vIGZpcnN0IGJ1c2luZXNzIHdhcyBob21lIGJhc2VkXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj01MDAwKVxyXG4gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtPTUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJDUwMDAgaW5zdXJhbmNlIG9uIHlvdXIgZmlyc3QgaG9tZSBiYXNlZCBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwyMTAwKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIiwxODAwKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlIGlmIChfYnVzaW5lc3NUeXBlPT0yKSAvL2ZpcnN0IGJ1c2lvbmVzcyB3YXMgYnJpY2sgJiBtb3J0YXJcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD49MTAwMDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtPTEwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJDEwMDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzLCByZW1haW5pbmcgY2FzaCBpcyAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjovL2xvc2UgeW91ciBuZXh0IFBheSBEYXkgZm9yIGFsbCBvZiB5b3VyIGhvbWUtYmFzZWQgYnVzaW5lc3Nlcy5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3Ugd2lsbCBsb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTBcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE0XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgV2lsZENhcmRGdW5jdGlvbmFsaXR5KF9pZClcclxuICAgIHtcclxuICAgICAgdmFyIEluZGV4PXBhcnNlSW50KF9pZCk7XHJcbiAgICAgIEluZGV4PUluZGV4LTE7XHJcblxyXG4gICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgY2FzZSBcIjFcIjovL2RvdWJsZXMgeW91ciBpbmNvbWUgb24gdGhlIG5leHQgUGF5IERheS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6Ly9Sb2xsIDEgZGllLCBtdWx0aXBseSByZXN1bHQgYnkgJDUsMDAwIGFuZCByZWNlaXZlIHlvdXIgYWR2YW5jZSBmcm9tIHRoZSBCYW5rLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBEaWNlUmVzdWx0PV9tYW5hZ2VyLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXI9NTAwMDtcclxuICAgICAgICAgICAgIHZhciBUb3RhbFJlc3VsdD1EaWNlUmVzdWx0KkNhc2hNdWxpdHBsaWVyO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9VG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgUmVzdWx0OiBcIitEaWNlUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK0RpY2VSZXN1bHQrXCIgKiBcIitDYXNoTXVsaXRwbGllcitcIiA9IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJBbW91bnQgJFwiK1RvdGFsUmVzdWx0K1wiIGhhcyBiZWVuIGFkZGVkIGludG8geW91ciBjYXNoLlwiXHJcbiAgICAgICAgICAgICAgICAsNDAwMCk7XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI0XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI3XCI6Ly9wYXkgb2ZmIHlvdXIgbG9hbiBmb3IgeW91ciBCcmljayAmIE1vcnRhciBCdXNpbmVzcy4gSWYgeW91IGhhdmUgbm8gbG9hbiBvdXRzdGFuZGluZywgcmVjZWl2ZSAkNTAsMDAwLlxyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgdmFyIF9sb2FuUmVzZXQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3R5cGU9cGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZihfdHlwZT09MiAmJiBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hblJlc2V0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKF9sb2FuUmVzZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91ciBvdXRzdGFuZGluZyBsb2FuIGhhcyBiZWVuIHBheWVkIG9mZi5cIiwyODAwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz01MDAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBubyBsb2FuLCBhbW91bnQgJDUwMDAwIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaFwiLDI4MDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTBcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6Ly8gcmVjZWl2ZSBkb3VibGUgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIGFsbCBvZiB5b3VyIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwxODAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEludmVzdEZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBQYXlEYXlGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuXHJcbiAgICB9LFxyXG4gICAgRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFNlbGxGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgR29CYWNrRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cz0gRGVja3NEYXRhO1xyXG4iXX0=