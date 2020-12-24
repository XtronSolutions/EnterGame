
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
    this.CardSelected = -1; //this.BigBusinessCardFunctionality("1");
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
  ToggleButtons: function ToggleButtons(_isOwner, _hasButton) {
    var _this = this;

    if (_hasButton === void 0) {
      _hasButton = false;
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
      setTimeout(function () {
        _this.ExitCardInfo();
      }, 2500);
    }
  },
  GenerateRandomBigBusinessCard: function GenerateRandomBigBusinessCard(_isOwner, _randomValue) {
    this.SpacesType = EnumSpaceType.BigBusiness;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.BigBusiness[this.SelectedCardIndex].ID;
    if (this.BigBusiness[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.BigBusiness[this.SelectedCardIndex].ButtonName;
    this.ShowCardInfo(this.BigBusiness[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.BigBusiness[this.SelectedCardIndex].HasButton);
  },
  GenerateRandomMarketingCard: function GenerateRandomMarketingCard(_isOwner, _randomValue) {
    this.SpacesType = EnumSpaceType.Marketing;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.Marketing[this.SelectedCardIndex].ID;
    if (this.Marketing[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.Marketing[this.SelectedCardIndex].ButtonName;
    this.ShowCardInfo(this.Marketing[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.Marketing[this.SelectedCardIndex].HasButton);
  },
  GenerateRandomLossesCard: function GenerateRandomLossesCard(_isOwner, _randomValue) {
    this.SpacesType = EnumSpaceType.Losses;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.Losses[this.SelectedCardIndex].ID;
    this.ShowCardInfo(this.Losses[this.SelectedCardIndex].Description, true);
    if (this.Losses[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.Losses[this.SelectedCardIndex].ButtonName;
    this.ToggleButtons(_isOwner, this.Losses[this.SelectedCardIndex].HasButton);
  },
  GenerateRandomWildCard: function GenerateRandomWildCard(_isOwner, _randomValue) {
    this.SpacesType = EnumSpaceType.WildCard;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.WildCards[this.SelectedCardIndex].ID;
    if (this.WildCards[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.WildCards[this.SelectedCardIndex].ButtonName;
    this.ShowCardInfo(this.WildCards[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.WildCards[this.SelectedCardIndex].HasButton);
  },
  SpaceInvest: function SpaceInvest(_isOwner, _index) {
    this.ShowCardInfo("You have landed on investment space.", true);
    this.InvestFunctionality();
    this.ToggleButtons(_isOwner, false);
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
  SpaceOneQuestion: function SpaceOneQuestion(_isOwner, _index) {
    this.ShowCardInfo("You have landed on One Question space.", true);
    this.OneQuestionFunctionality();
    this.ToggleButtons(_isOwner, false);
  },
  SpaceSell: function SpaceSell(_isOwner, _index) {
    this.ShowCardInfo("You have landed on Sell space.", true);
    this.SellFunctionality();
    this.ToggleButtons(_isOwner, false);
  },
  SpaceBuyOrSell: function SpaceBuyOrSell(_isOwner, _index) {
    this.ShowCardInfo("You have landed on Buy or Sell space.", true);
    this.BuyOrSellFunctionality();
    this.ToggleButtons(_isOwner, false);
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
    } //for testing
    // this.Counter++;
    // this.GenerateRandomBigBusinessCard(this.Counter);

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

    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_msg, _time);
    this.ShowCardInfo("", false);
    setTimeout(function () {
      _this2.ShowCardInfo("", false);

      _manager.ResetCardDisplay();

      _manager.RaiseEventTurnComplete();
    }, _time + 100);
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
          var _amount = 0;

          for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
            _amount = _amount + _manager.PlayerGameInfo[index].MarketingAmount;
          }

          _manager.PlayerGameInfo[_playerIndex].Cash += _amount;
          this.CompleteTurnWithToast("Dice 1 Result: " + Dice1Result + "\n" + "\n" + "Dice 2 Result: " + Dice2Result + "\n" + "\n" + "Total: " + TotalResult + "\n" + "\n" + "\n" + "Amount $" + _amount + " has successfully added in your cash from marketing amount on table.", 4000);

          var _actorsArray = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

          for (var _index2 = 0; _index2 < _actorsArray.length; _index2++) {
            _actorsArray[_index2].customProperties.PlayerSessionData.MarketingAmount = 0;
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
  InvestFunctionality: function InvestFunctionality() {},
  PayDayFunctionality: function PayDayFunctionality() {},
  DoublePayDayFunctionality: function DoublePayDayFunctionality() {},
  OneQuestionFunctionality: function OneQuestionFunctionality() {},
  SellFunctionality: function SellFunctionality() {},
  BuyOrSellFunctionality: function BuyOrSellFunctionality() {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiRW51bVNwYWNlVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJXaWxkQ2FyZCIsIkJpZ0J1c2luZXNzIiwiTWFya2V0aW5nIiwiSW52ZXN0IiwiTG9zc2VzIiwiUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiT25lUXVlc3Rpb24iLCJTZWxsIiwiQnV5T3JTZWxsIiwiR29CYWNrU3BhY2VzIiwiQ2FyZERhdGEiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiSUQiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJUZXh0Iiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkRlc2NyaXB0aW9uIiwiSGFzQnV0dG9uIiwiQnV0dG9uTmFtZSIsImN0b3IiLCJDYXJkVUkiLCJUb2FzdE5vZGUiLCJOb2RlIiwiVG9hc3RMYWJlbCIsIkxhYmVsIiwiQnV0dG9uTm9kZSIsIkludGVyYWN0aW9uQnV0dG9uTm9kZSIsIkRlY2tzRGF0YSIsIkNvbXBvbmVudCIsIk1haW5VSSIsIldpbGRDYXJkcyIsIlNwYWNlc1R5cGUiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTZWxlY3RlZENhcmRJbmRleCIsIkNhcmRTZWxlY3RlZCIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiYWN0aXZlIiwic2V0VGltZW91dCIsIkV4aXRDYXJkSW5mbyIsIkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkIiwiX3JhbmRvbVZhbHVlIiwiY2hpbGRyZW4iLCJnZXRDb21wb25lbnQiLCJzdHJpbmciLCJTaG93Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQiLCJHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQiLCJHZW5lcmF0ZVJhbmRvbVdpbGRDYXJkIiwiU3BhY2VJbnZlc3QiLCJfaW5kZXgiLCJJbnZlc3RGdW5jdGlvbmFsaXR5IiwiU3BhY2VQYXlEYXkiLCJQYXlEYXlGdW5jdGlvbmFsaXR5IiwiU3BhY2VEb3VibGVQYXlEYXkiLCJEb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5IiwiU3BhY2VPbmVRdWVzdGlvbiIsIk9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSIsIlNwYWNlU2VsbCIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiU3BhY2VCdXlPclNlbGwiLCJCdXlPclNlbGxGdW5jdGlvbmFsaXR5IiwiU3BhY2VHb0JhY2tTcGFjZXMiLCJHb0JhY2tGdW5jdGlvbmFsaXR5IiwibWVzc2FnZSIsIl9zdGF0ZSIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUmVzZXRDYXJkRGlzcGxheSIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJDYXJkRnVudGlvbmFsaXR5QnV0dG9uIiwiQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eSIsIkxvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5IiwiTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkiLCJXaWxkQ2FyZEZ1bmN0aW9uYWxpdHkiLCJDaGVja0xvYW4iLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJfbWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkdldFR1cm5OdW1iZXIiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwiTm9PZkJ1c2luZXNzIiwibGVuZ3RoIiwiTG9hblRha2VuIiwidmFsIiwiUmVzdWx0IiwidjIiLCJDb21wbGV0ZVR1cm5XaXRoVG9hc3QiLCJfbXNnIiwiX3RpbWUiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJfaWQiLCJJbmRleCIsInBhcnNlSW50IiwiY29uc29sZSIsImxvZyIsIl9yZXN1bHQiLCJJc0xvYW5UYWtlbiIsIngiLCJ5IiwiTG9hbkFtb3VudCIsIkxhd3llclN0YXR1cyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiRGljZTFSZXN1bHQiLCJSb2xsVHdvRGljZXMiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX2Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkNhc2giLCJfYWN0b3JzQXJyYXkiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tQWN0b3JzQXJyYXkiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJfbG9zZUFtb3VudCIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9tYXJrZXRBbW91bnQiLCJfbXVsdGlwbGllciIsIl9pbmNyZWFzZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiR2V0TWFya2V0aW5nTW9uZXkiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiX2J1c2luZXNzVHlwZSIsIkJ1c2luZXNzVHlwZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiRGljZVJlc3VsdCIsIlJvbGxPbmVEaWNlIiwiQ2FzaE11bGl0cGxpZXIiLCJfbG9hblJlc2V0IiwiX3R5cGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCLEVBQ0E7O0FBQ0EsSUFBSUMsYUFBYSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN4QkMsRUFBQUEsSUFBSSxFQUFDLENBRG1CO0FBRXhCQyxFQUFBQSxRQUFRLEVBQUUsQ0FGYztBQUd4QkMsRUFBQUEsV0FBVyxFQUFFLENBSFc7QUFJeEJDLEVBQUFBLFNBQVMsRUFBRSxDQUphO0FBS3hCQyxFQUFBQSxNQUFNLEVBQUUsQ0FMZ0I7QUFNeEJDLEVBQUFBLE1BQU0sRUFBQyxDQU5pQjtBQU94QkMsRUFBQUEsTUFBTSxFQUFFLENBUGdCO0FBUXhCQyxFQUFBQSxZQUFZLEVBQUUsQ0FSVTtBQVN4QkMsRUFBQUEsV0FBVyxFQUFFLENBVFc7QUFVeEJDLEVBQUFBLElBQUksRUFBRSxDQVZrQjtBQVd4QkMsRUFBQUEsU0FBUyxFQUFFLEVBWGE7QUFZeEJDLEVBQUFBLFlBQVksRUFBQztBQVpXLENBQVIsQ0FBcEIsRUFjQTs7QUFDQSxJQUFJQyxRQUFRLEdBQUNkLEVBQUUsQ0FBQ2UsS0FBSCxDQUFTO0FBQ2xCQyxFQUFBQSxJQUFJLEVBQUMsVUFEYTtBQUVsQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEVBQUUsRUFDRjtBQUNHQyxNQUFBQSxXQUFXLEVBQUMsSUFEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUVwQixFQUFFLENBQUNxQixJQUZaO0FBR0csaUJBQVMsRUFIWjtBQUlHQyxNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLR0MsTUFBQUEsT0FBTyxFQUFDO0FBTFgsS0FGUTtBQVFSQyxJQUFBQSxXQUFXLEVBQ1g7QUFDR0wsTUFBQUEsV0FBVyxFQUFDLGFBRGY7QUFFR0MsTUFBQUEsSUFBSSxFQUFFcEIsRUFBRSxDQUFDcUIsSUFGWjtBQUdHLGlCQUFTLEVBSFo7QUFJR0MsTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0dDLE1BQUFBLE9BQU8sRUFBQztBQUxYLEtBVFE7QUFlUkUsSUFBQUEsU0FBUyxFQUNUO0FBQ0dOLE1BQUFBLFdBQVcsRUFBQyxXQURmO0FBRUdDLE1BQUFBLElBQUksRUFBRXBCLEVBQUUsV0FGWDtBQUdHLGlCQUFTLEtBSFo7QUFJR3NCLE1BQUFBLFlBQVksRUFBRSxJQUpqQjtBQUtHQyxNQUFBQSxPQUFPLEVBQUM7QUFMWCxLQWhCUTtBQXNCUkcsSUFBQUEsVUFBVSxFQUNWO0FBQ0dQLE1BQUFBLFdBQVcsRUFBQyxZQURmO0FBRUdDLE1BQUFBLElBQUksRUFBRXBCLEVBQUUsQ0FBQ3FCLElBRlo7QUFHRyxpQkFBUyxFQUhaO0FBSUdDLE1BQUFBLFlBQVksRUFBRSxJQUpqQjtBQUtHQyxNQUFBQSxPQUFPLEVBQUM7QUFMWDtBQXZCUSxHQUZNO0FBaUNyQkksRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQUU7QUFDbkI7QUFsQ29CLENBQVQsQ0FBYixFQXNDQTs7QUFDQSxJQUFJQyxNQUFNLEdBQUM1QixFQUFFLENBQUNlLEtBQUgsQ0FBUztBQUNqQkMsRUFBQUEsSUFBSSxFQUFDLFFBRFk7QUFFakJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSWSxJQUFBQSxTQUFTLEVBQ1Q7QUFDR1YsTUFBQUEsV0FBVyxFQUFDLFdBRGY7QUFFR0MsTUFBQUEsSUFBSSxFQUFFcEIsRUFBRSxDQUFDOEIsSUFGWjtBQUdHLGlCQUFTLElBSFo7QUFJR1IsTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0dDLE1BQUFBLE9BQU8sRUFBQztBQUxYLEtBRlE7QUFRUlEsSUFBQUEsVUFBVSxFQUNWO0FBQ0daLE1BQUFBLFdBQVcsRUFBQyxZQURmO0FBRUdDLE1BQUFBLElBQUksRUFBRXBCLEVBQUUsQ0FBQ2dDLEtBRlo7QUFHRyxpQkFBUyxJQUhaO0FBSUdWLE1BQUFBLFlBQVksRUFBRSxJQUpqQjtBQUtHQyxNQUFBQSxPQUFPLEVBQUM7QUFMWCxLQVRRO0FBZVRVLElBQUFBLFVBQVUsRUFDVDtBQUNHZCxNQUFBQSxXQUFXLEVBQUMsWUFEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUVwQixFQUFFLENBQUM4QixJQUZaO0FBR0csaUJBQVMsSUFIWjtBQUlHUixNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLR0MsTUFBQUEsT0FBTyxFQUFDO0FBTFgsS0FoQlE7QUFzQlBXLElBQUFBLHFCQUFxQixFQUN0QjtBQUNHZixNQUFBQSxXQUFXLEVBQUMsbUJBRGY7QUFFR0MsTUFBQUEsSUFBSSxFQUFFcEIsRUFBRSxDQUFDOEIsSUFGWjtBQUdHLGlCQUFTLElBSFo7QUFJR1IsTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0dDLE1BQUFBLE9BQU8sRUFBQztBQUxYO0FBdkJRLEdBRks7QUFpQ3BCSSxFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FBRTtBQUNuQjtBQWxDbUIsQ0FBVCxDQUFYLEVBcUNBOztBQUNBLElBQUlRLFNBQVMsR0FBQ25DLEVBQUUsQ0FBQ2UsS0FBSCxDQUFTO0FBQ25CQyxFQUFBQSxJQUFJLEVBQUMsV0FEYztBQUVuQixhQUFTaEIsRUFBRSxDQUFDb0MsU0FGTztBQUduQm5CLEVBQUFBLFVBQVUsRUFBRTtBQUNWb0IsSUFBQUEsTUFBTSxFQUNOO0FBQ0dsQixNQUFBQSxXQUFXLEVBQUMsUUFEZjtBQUVHLGlCQUFTLElBRlo7QUFHR0MsTUFBQUEsSUFBSSxFQUFFUSxNQUhUO0FBSUdOLE1BQUFBLFlBQVksRUFBRSxJQUpqQjtBQUtHQyxNQUFBQSxPQUFPLEVBQUM7QUFMWCxLQUZVO0FBUVZuQixJQUFBQSxXQUFXLEVBQ1g7QUFDR2UsTUFBQUEsV0FBVyxFQUFDLGFBRGY7QUFFR0MsTUFBQUEsSUFBSSxFQUFFLENBQUNOLFFBQUQsQ0FGVDtBQUdHLGlCQUFTLEVBSFo7QUFJR1EsTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0dDLE1BQUFBLE9BQU8sRUFBQztBQUxYLEtBVFU7QUFlVmxCLElBQUFBLFNBQVMsRUFDVDtBQUNHYyxNQUFBQSxXQUFXLEVBQUMsV0FEZjtBQUVHQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ04sUUFBRCxDQUZUO0FBR0csaUJBQVMsRUFIWjtBQUlHUSxNQUFBQSxZQUFZLEVBQUUsSUFKakI7QUFLR0MsTUFBQUEsT0FBTyxFQUFDO0FBTFgsS0FoQlU7QUFzQlRoQixJQUFBQSxNQUFNLEVBQ1A7QUFDR1ksTUFBQUEsV0FBVyxFQUFDLFFBRGY7QUFFR0MsTUFBQUEsSUFBSSxFQUFFLENBQUNOLFFBQUQsQ0FGVDtBQUdHLGlCQUFTLEVBSFo7QUFJR1EsTUFBQUEsWUFBWSxFQUFFLElBSmpCO0FBS0dDLE1BQUFBLE9BQU8sRUFBQztBQUxYLEtBdkJVO0FBNkJUZSxJQUFBQSxTQUFTLEVBQ1Y7QUFDR25CLE1BQUFBLFdBQVcsRUFBQyxXQURmO0FBRUdDLE1BQUFBLElBQUksRUFBRSxDQUFDTixRQUFELENBRlQ7QUFHRyxpQkFBUyxFQUhaO0FBSUdRLE1BQUFBLFlBQVksRUFBRSxJQUpqQjtBQUtHQyxNQUFBQSxPQUFPLEVBQUM7QUFMWCxLQTlCVTtBQW9DUmdCLElBQUFBLFVBQVUsRUFDVjtBQUNJbkIsTUFBQUEsSUFBSSxFQUFFckIsYUFEVjtBQUVJLGlCQUFTQSxhQUFhLENBQUNHLElBRjNCO0FBR0lvQixNQUFBQSxZQUFZLEVBQUUsSUFIbEI7QUFJSUMsTUFBQUEsT0FBTyxFQUFDO0FBSlo7QUFyQ1EsR0FITztBQStDbkJpQixFQUFBQSxNQS9DbUIsb0JBZ0RuQjtBQUNFLFNBQUtDLGVBQUw7QUFDQSxTQUFLQyxpQkFBTCxHQUF1QixDQUFDLENBQXhCO0FBQ0EsU0FBS0MsWUFBTCxHQUFrQixDQUFDLENBQW5CLENBSEYsQ0FLRTtBQUNBO0FBQ0E7QUFDQTtBQUNELEdBekRrQjtBQTJEbkJGLEVBQUFBLGVBM0RtQiw2QkE0RG5CO0FBQ0ksUUFBRyxDQUFDM0Msd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0lBLHdCQUF3QixHQUFDOEMsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ1AsR0EvRGtCO0FBaUVuQkMsRUFBQUEsU0FBUyxFQUFDLG1CQUFTQyxHQUFULEVBQWFDLEdBQWIsRUFDVjtBQUNJLFdBQU9DLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUJILEdBQUcsR0FBR0QsR0FBdkIsQ0FBWCxJQUEyQ0EsR0FBbEQsQ0FESixDQUMyRDtBQUMxRCxHQXBFa0I7QUFzRW5CSyxFQUFBQSxhQXRFbUIseUJBc0VMQyxRQXRFSyxFQXNFSUMsVUF0RUosRUF1RW5CO0FBQUE7O0FBQUEsUUFEdUJBLFVBQ3ZCO0FBRHVCQSxNQUFBQSxVQUN2QixHQURrQyxLQUNsQztBQUFBOztBQUNJLFFBQUdELFFBQVEsSUFBSUMsVUFBZixFQUNGO0FBQ0csV0FBS2hCLE1BQUwsQ0FBWUosVUFBWixDQUF1QnFCLE1BQXZCLEdBQThCLEtBQTlCO0FBQ0EsV0FBS2pCLE1BQUwsQ0FBWUgscUJBQVosQ0FBa0NvQixNQUFsQyxHQUF5QyxJQUF6QztBQUNGLEtBSkMsTUFLSSxJQUFHRixRQUFRLElBQUksQ0FBQ0MsVUFBaEIsRUFDTjtBQUNFLFdBQUtoQixNQUFMLENBQVlKLFVBQVosQ0FBdUJxQixNQUF2QixHQUE4QixJQUE5QjtBQUNBLFdBQUtqQixNQUFMLENBQVlILHFCQUFaLENBQWtDb0IsTUFBbEMsR0FBeUMsS0FBekM7QUFDRCxLQUpLLE1BTU47QUFDRSxXQUFLakIsTUFBTCxDQUFZSCxxQkFBWixDQUFrQ29CLE1BQWxDLEdBQXlDLEtBQXpDO0FBQ0EsV0FBS2pCLE1BQUwsQ0FBWUosVUFBWixDQUF1QnFCLE1BQXZCLEdBQThCLEtBQTlCO0FBQ0FDLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2QsUUFBQSxLQUFJLENBQUNDLFlBQUw7QUFDSCxPQUZVLEVBRVIsSUFGUSxDQUFWO0FBR0Q7QUFDRixHQTFGa0I7QUE2Rm5CQyxFQUFBQSw2QkE3Rm1CLHlDQTZGV0wsUUE3RlgsRUE2Rm9CTSxZQTdGcEIsRUE4Rm5CO0FBQ0UsU0FBS25CLFVBQUwsR0FBZ0J4QyxhQUFhLENBQUNLLFdBQTlCO0FBQ0EsU0FBS3NDLGlCQUFMLEdBQXdCZ0IsWUFBeEI7QUFDQSxTQUFLZixZQUFMLEdBQWtCLEtBQUt2QyxXQUFMLENBQWlCLEtBQUtzQyxpQkFBdEIsRUFBeUN4QixFQUEzRDtBQUVBLFFBQUcsS0FBS2QsV0FBTCxDQUFpQixLQUFLc0MsaUJBQXRCLEVBQXlDakIsU0FBNUMsRUFDRSxLQUFLWSxNQUFMLENBQVlILHFCQUFaLENBQWtDeUIsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOENBLFFBQTlDLENBQXVELENBQXZELEVBQTBEQyxZQUExRCxDQUF1RTVELEVBQUUsQ0FBQ2dDLEtBQTFFLEVBQWlGNkIsTUFBakYsR0FBd0YsS0FBS3pELFdBQUwsQ0FBaUIsS0FBS3NDLGlCQUF0QixFQUF5Q2hCLFVBQWpJO0FBRUYsU0FBS29DLFlBQUwsQ0FBa0IsS0FBSzFELFdBQUwsQ0FBaUIsS0FBS3NDLGlCQUF0QixFQUF5Q2xCLFdBQTNELEVBQXVFLElBQXZFO0FBQ0EsU0FBSzJCLGFBQUwsQ0FBbUJDLFFBQW5CLEVBQTRCLEtBQUtoRCxXQUFMLENBQWlCLEtBQUtzQyxpQkFBdEIsRUFBeUNqQixTQUFyRTtBQUNELEdBeEdrQjtBQTBHbkJzQyxFQUFBQSwyQkExR21CLHVDQTBHU1gsUUExR1QsRUEwR2tCTSxZQTFHbEIsRUEyR25CO0FBQ0UsU0FBS25CLFVBQUwsR0FBZ0J4QyxhQUFhLENBQUNNLFNBQTlCO0FBQ0EsU0FBS3FDLGlCQUFMLEdBQXdCZ0IsWUFBeEI7QUFDQSxTQUFLZixZQUFMLEdBQWtCLEtBQUt0QyxTQUFMLENBQWUsS0FBS3FDLGlCQUFwQixFQUF1Q3hCLEVBQXpEO0FBRUEsUUFBRyxLQUFLYixTQUFMLENBQWUsS0FBS3FDLGlCQUFwQixFQUF1Q2pCLFNBQTFDLEVBQ0UsS0FBS1ksTUFBTCxDQUFZSCxxQkFBWixDQUFrQ3lCLFFBQWxDLENBQTJDLENBQTNDLEVBQThDQSxRQUE5QyxDQUF1RCxDQUF2RCxFQUEwREMsWUFBMUQsQ0FBdUU1RCxFQUFFLENBQUNnQyxLQUExRSxFQUFpRjZCLE1BQWpGLEdBQXdGLEtBQUt4RCxTQUFMLENBQWUsS0FBS3FDLGlCQUFwQixFQUF1Q2hCLFVBQS9IO0FBRUYsU0FBS29DLFlBQUwsQ0FBa0IsS0FBS3pELFNBQUwsQ0FBZSxLQUFLcUMsaUJBQXBCLEVBQXVDbEIsV0FBekQsRUFBcUUsSUFBckU7QUFDQSxTQUFLMkIsYUFBTCxDQUFtQkMsUUFBbkIsRUFBNEIsS0FBSy9DLFNBQUwsQ0FBZSxLQUFLcUMsaUJBQXBCLEVBQXVDakIsU0FBbkU7QUFDRCxHQXJIa0I7QUF1SG5CdUMsRUFBQUEsd0JBdkhtQixvQ0F1SE1aLFFBdkhOLEVBdUhlTSxZQXZIZixFQXdIbkI7QUFDRSxTQUFLbkIsVUFBTCxHQUFnQnhDLGFBQWEsQ0FBQ1EsTUFBOUI7QUFDQSxTQUFLbUMsaUJBQUwsR0FBd0JnQixZQUF4QjtBQUNBLFNBQUtmLFlBQUwsR0FBa0IsS0FBS3BDLE1BQUwsQ0FBWSxLQUFLbUMsaUJBQWpCLEVBQW9DeEIsRUFBdEQ7QUFFQSxTQUFLNEMsWUFBTCxDQUFrQixLQUFLdkQsTUFBTCxDQUFZLEtBQUttQyxpQkFBakIsRUFBb0NsQixXQUF0RCxFQUFrRSxJQUFsRTtBQUVBLFFBQUcsS0FBS2pCLE1BQUwsQ0FBWSxLQUFLbUMsaUJBQWpCLEVBQW9DakIsU0FBdkMsRUFDRSxLQUFLWSxNQUFMLENBQVlILHFCQUFaLENBQWtDeUIsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOENBLFFBQTlDLENBQXVELENBQXZELEVBQTBEQyxZQUExRCxDQUF1RTVELEVBQUUsQ0FBQ2dDLEtBQTFFLEVBQWlGNkIsTUFBakYsR0FBd0YsS0FBS3RELE1BQUwsQ0FBWSxLQUFLbUMsaUJBQWpCLEVBQW9DaEIsVUFBNUg7QUFFRixTQUFLeUIsYUFBTCxDQUFtQkMsUUFBbkIsRUFBNEIsS0FBSzdDLE1BQUwsQ0FBWSxLQUFLbUMsaUJBQWpCLEVBQW9DakIsU0FBaEU7QUFDRCxHQW5Ja0I7QUFxSW5Cd0MsRUFBQUEsc0JBckltQixrQ0FxSUliLFFBcklKLEVBcUlhTSxZQXJJYixFQXNJbkI7QUFDRSxTQUFLbkIsVUFBTCxHQUFnQnhDLGFBQWEsQ0FBQ0ksUUFBOUI7QUFDQSxTQUFLdUMsaUJBQUwsR0FBd0JnQixZQUF4QjtBQUNBLFNBQUtmLFlBQUwsR0FBa0IsS0FBS0wsU0FBTCxDQUFlLEtBQUtJLGlCQUFwQixFQUF1Q3hCLEVBQXpEO0FBRUEsUUFBRyxLQUFLb0IsU0FBTCxDQUFlLEtBQUtJLGlCQUFwQixFQUF1Q2pCLFNBQTFDLEVBQ0UsS0FBS1ksTUFBTCxDQUFZSCxxQkFBWixDQUFrQ3lCLFFBQWxDLENBQTJDLENBQTNDLEVBQThDQSxRQUE5QyxDQUF1RCxDQUF2RCxFQUEwREMsWUFBMUQsQ0FBdUU1RCxFQUFFLENBQUNnQyxLQUExRSxFQUFpRjZCLE1BQWpGLEdBQXdGLEtBQUt2QixTQUFMLENBQWUsS0FBS0ksaUJBQXBCLEVBQXVDaEIsVUFBL0g7QUFFRixTQUFLb0MsWUFBTCxDQUFrQixLQUFLeEIsU0FBTCxDQUFlLEtBQUtJLGlCQUFwQixFQUF1Q2xCLFdBQXpELEVBQXFFLElBQXJFO0FBQ0EsU0FBSzJCLGFBQUwsQ0FBbUJDLFFBQW5CLEVBQTRCLEtBQUtkLFNBQUwsQ0FBZSxLQUFLSSxpQkFBcEIsRUFBdUNqQixTQUFuRTtBQUNELEdBaEprQjtBQWtKbkJ5QyxFQUFBQSxXQWxKbUIsdUJBa0pQZCxRQWxKTyxFQWtKRWUsTUFsSkYsRUFtSm5CO0FBQ0UsU0FBS0wsWUFBTCxDQUFrQixzQ0FBbEIsRUFBeUQsSUFBekQ7QUFDQSxTQUFLTSxtQkFBTDtBQUVBLFNBQUtqQixhQUFMLENBQW1CQyxRQUFuQixFQUE0QixLQUE1QjtBQUNELEdBeEprQjtBQTBKbkJpQixFQUFBQSxXQTFKbUIsdUJBMEpQakIsUUExSk8sRUEwSkVlLE1BMUpGLEVBMkpuQjtBQUNFLFNBQUtMLFlBQUwsQ0FBa0Isa0NBQWxCLEVBQXFELElBQXJEO0FBQ0EsU0FBS1EsbUJBQUw7QUFFQSxTQUFLbkIsYUFBTCxDQUFtQkMsUUFBbkIsRUFBNEIsS0FBNUI7QUFDRCxHQWhLa0I7QUFrS25CbUIsRUFBQUEsaUJBbEttQiw2QkFrS0RuQixRQWxLQyxFQWtLUWUsTUFsS1IsRUFtS25CO0FBQ0UsU0FBS0wsWUFBTCxDQUFrQix3Q0FBbEIsRUFBMkQsSUFBM0Q7QUFDQSxTQUFLVSx5QkFBTDtBQUVBLFNBQUtyQixhQUFMLENBQW1CQyxRQUFuQixFQUE0QixLQUE1QjtBQUNELEdBeEtrQjtBQTBLbkJxQixFQUFBQSxnQkExS21CLDRCQTBLRnJCLFFBMUtFLEVBMEtPZSxNQTFLUCxFQTJLbkI7QUFDRSxTQUFLTCxZQUFMLENBQWtCLHdDQUFsQixFQUEyRCxJQUEzRDtBQUNBLFNBQUtZLHdCQUFMO0FBRUEsU0FBS3ZCLGFBQUwsQ0FBbUJDLFFBQW5CLEVBQTRCLEtBQTVCO0FBQ0QsR0FoTGtCO0FBa0xuQnVCLEVBQUFBLFNBbExtQixxQkFrTFR2QixRQWxMUyxFQWtMQWUsTUFsTEEsRUFtTG5CO0FBQ0UsU0FBS0wsWUFBTCxDQUFrQixnQ0FBbEIsRUFBbUQsSUFBbkQ7QUFDQSxTQUFLYyxpQkFBTDtBQUVBLFNBQUt6QixhQUFMLENBQW1CQyxRQUFuQixFQUE0QixLQUE1QjtBQUNELEdBeExrQjtBQTBMbkJ5QixFQUFBQSxjQTFMbUIsMEJBMExKekIsUUExTEksRUEwTEtlLE1BMUxMLEVBMkxuQjtBQUNFLFNBQUtMLFlBQUwsQ0FBa0IsdUNBQWxCLEVBQTBELElBQTFEO0FBQ0EsU0FBS2dCLHNCQUFMO0FBRUEsU0FBSzNCLGFBQUwsQ0FBbUJDLFFBQW5CLEVBQTRCLEtBQTVCO0FBQ0QsR0FoTWtCO0FBa01uQjJCLEVBQUFBLGlCQWxNbUIsNkJBa01EM0IsUUFsTUMsRUFrTVFlLE1BbE1SLEVBbU1uQjtBQUNFLFNBQUtMLFlBQUwsQ0FBa0IsbUNBQWxCLEVBQXNELElBQXREO0FBQ0EsU0FBS2tCLG1CQUFMO0FBRUEsU0FBSzdCLGFBQUwsQ0FBbUJDLFFBQW5CLEVBQTRCLEtBQTVCO0FBQ0QsR0F4TWtCO0FBME1uQlUsRUFBQUEsWUFBWSxFQUFDLHNCQUFTbUIsT0FBVCxFQUFpQkMsTUFBakIsRUFDYjtBQUNFLFFBQUdBLE1BQUgsRUFDQTtBQUNFLFdBQUs3QyxNQUFMLENBQVlSLFNBQVosQ0FBc0J5QixNQUF0QixHQUE2QixJQUE3QjtBQUNBLFdBQUtqQixNQUFMLENBQVlOLFVBQVosQ0FBdUI4QixNQUF2QixHQUE4Qm9CLE9BQTlCO0FBQ0QsS0FKRCxNQUtBO0FBQ0csV0FBSzVDLE1BQUwsQ0FBWU4sVUFBWixDQUF1QjhCLE1BQXZCLEdBQThCLEVBQTlCO0FBQ0EsV0FBS3hCLE1BQUwsQ0FBWVIsU0FBWixDQUFzQnlCLE1BQXRCLEdBQTZCLEtBQTdCO0FBQ0Y7QUFDRixHQXJOa0I7QUF1Tm5CRSxFQUFBQSxZQXZObUIsMEJBd05uQjtBQUNFLFNBQUtNLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFDQWhFLElBQUFBLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EQyxnQkFBcEQ7QUFDQXZGLElBQUFBLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9ERSxzQkFBcEQsR0FIRixDQUtFO0FBQ0E7QUFDQTtBQUNELEdBaE9rQjtBQWtPbkJDLEVBQUFBLHNCQWxPbUIsb0NBbU9uQjtBQUNFLFFBQUcsS0FBS2hELFVBQUwsSUFBaUJ4QyxhQUFhLENBQUNLLFdBQWxDLEVBQ0E7QUFDRSxXQUFLb0YsNEJBQUwsQ0FBa0MsS0FBSzdDLFlBQXZDO0FBQ0QsS0FIRCxNQUdNLElBQUcsS0FBS0osVUFBTCxJQUFpQnhDLGFBQWEsQ0FBQ1EsTUFBbEMsRUFDTjtBQUNFLFdBQUtrRix1QkFBTCxDQUE2QixLQUFLOUMsWUFBbEM7QUFDRCxLQUhLLE1BSUQsSUFBRyxLQUFLSixVQUFMLElBQWlCeEMsYUFBYSxDQUFDTSxTQUFsQyxFQUNMO0FBQ0UsV0FBS3FGLDBCQUFMLENBQWdDLEtBQUsvQyxZQUFyQztBQUNELEtBSEksTUFJQSxJQUFHLEtBQUtKLFVBQUwsSUFBaUJ4QyxhQUFhLENBQUNJLFFBQWxDLEVBQ0w7QUFDRSxXQUFLd0YscUJBQUwsQ0FBMkIsS0FBS2hELFlBQWhDO0FBQ0QsS0FmSCxDQWlCRTtBQUNBO0FBQ0E7O0FBQ0QsR0F2UGtCO0FBeVBuQmlELEVBQUFBLFNBelBtQix1QkEwUG5CO0FBQ0ksUUFBSUMsVUFBVSxHQUFDLEtBQWY7QUFDQSxRQUFJQyxjQUFjLEdBQUMsQ0FBbkI7O0FBRUEsUUFBSUMsUUFBUSxHQUFDakcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxRQUFJWSxZQUFZLEdBQUNsRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRGEsYUFBcEQsRUFBakI7O0FBRUEsU0FBSyxJQUFJQyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR0gsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ0ksWUFBdEMsQ0FBbURDLE1BQS9FLEVBQXVGSCxLQUFLLEVBQTVGLEVBQWdHO0FBRTVGLFVBQUdILFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NJLFlBQXRDLENBQW1ERixLQUFuRCxFQUEwREksU0FBN0QsRUFDQTtBQUNJVCxRQUFBQSxVQUFVLEdBQUMsSUFBWDtBQUNBQyxRQUFBQSxjQUFjLEdBQUNJLEtBQWY7QUFDQTtBQUNIO0FBQ0o7O0FBRUQsUUFBSUssR0FBRyxHQUFDLENBQUMsQ0FBVDtBQUNBQSxJQUFBQSxHQUFHLEdBQUNWLFVBQVUsSUFBRSxJQUFaLEdBQWlCLENBQWpCLEdBQW1CLENBQXZCO0FBQ0EsUUFBSVcsTUFBTSxHQUFDeEcsRUFBRSxDQUFDeUcsRUFBSCxDQUFNRixHQUFOLEVBQVdULGNBQVgsQ0FBWDtBQUNBLFdBQU9VLE1BQVA7QUFDSCxHQS9Ra0I7QUFpUm5CRSxFQUFBQSxxQkFqUm1CLGlDQWlSR0MsSUFqUkgsRUFpUlFDLEtBalJSLEVBa1JuQjtBQUFBOztBQUNJLFFBQUliLFFBQVEsR0FBQ2pHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWI7O0FBQ0F0RixJQUFBQSx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEQyxTQUExRCxDQUFvRUgsSUFBcEUsRUFBeUVDLEtBQXpFO0FBQ0EsU0FBSzlDLFlBQUwsQ0FBa0IsRUFBbEIsRUFBcUIsS0FBckI7QUFFQVAsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixNQUFBLE1BQUksQ0FBQ08sWUFBTCxDQUFrQixFQUFsQixFQUFxQixLQUFyQjs7QUFDRGlDLE1BQUFBLFFBQVEsQ0FBQ1YsZ0JBQVQ7O0FBQ0FVLE1BQUFBLFFBQVEsQ0FBQ1Qsc0JBQVQ7QUFDQyxLQUpRLEVBSUxzQixLQUFLLEdBQUMsR0FKRCxDQUFWO0FBS0gsR0E1UmtCO0FBOFJuQnBCLEVBQUFBLDRCQTlSbUIsd0NBOFJVdUIsR0E5UlYsRUErUm5CO0FBQ0UsUUFBSUMsS0FBSyxHQUFDQyxRQUFRLENBQUNGLEdBQUQsQ0FBbEI7QUFDQUMsSUFBQUEsS0FBSyxHQUFDQSxLQUFLLEdBQUMsQ0FBWjs7QUFFQyxZQUFRRCxHQUFSO0FBQ0UsV0FBSyxHQUFMO0FBQVM7QUFDTEcsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSy9HLFdBQUwsQ0FBaUI0RyxLQUFqQixFQUF3QnhGLFdBQXBDOztBQUNBLFlBQUl1RSxRQUFRLEdBQUNqRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFiOztBQUNBLFlBQUlZLFlBQVksR0FBQ2xHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EYSxhQUFwRCxFQUFqQjs7QUFDQSxZQUFJbUIsT0FBTyxHQUFDLEtBQUt4QixTQUFMLEVBQVo7O0FBQ0EsWUFBSXlCLFdBQVcsR0FBQ0QsT0FBTyxDQUFDRSxDQUF4QjtBQUNBLFlBQUl4QixjQUFjLEdBQUNzQixPQUFPLENBQUNHLENBQTNCOztBQUVBLFlBQUdGLFdBQVcsSUFBRSxDQUFoQixFQUFtQjtBQUNuQjtBQUNHdEIsWUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ0ksWUFBdEMsQ0FBbUROLGNBQW5ELEVBQW1FMEIsVUFBbkUsR0FBOEV6QixRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtRE4sY0FBbkQsRUFBbUUwQixVQUFuRSxHQUE4RSxLQUE1Sjs7QUFDQSxnQkFBR3pCLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NJLFlBQXRDLENBQW1ETixjQUFuRCxFQUFtRTBCLFVBQW5FLElBQStFLENBQWxGLEVBQ0E7QUFDSXpCLGNBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NJLFlBQXRDLENBQW1ETixjQUFuRCxFQUFtRTBCLFVBQW5FLEdBQThFLENBQTlFO0FBQ0F6QixjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtRE4sY0FBbkQsRUFBbUVRLFNBQW5FLEdBQTZFLEtBQTdFO0FBQ0g7O0FBRUQsaUJBQUtJLHFCQUFMLENBQTJCLDJDQUEzQixFQUF1RSxJQUF2RTtBQUNGLFdBVkQsTUFZQTtBQUNHLGVBQUtBLHFCQUFMLENBQTJCLGtEQUEzQixFQUE4RSxJQUE5RTtBQUNGOztBQUVEOztBQUNKLFdBQUssR0FBTDtBQUFVO0FBQ05RLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUsvRyxXQUFMLENBQWlCNEcsS0FBakIsRUFBd0J4RixXQUFwQzs7QUFDQSxZQUFJdUUsUUFBUSxHQUFDakcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxZQUFJWSxZQUFZLEdBQUNsRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRGEsYUFBcEQsRUFBakI7O0FBRUEsWUFBR0YsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3lCLFlBQXpDLEVBQ0E7QUFDRyxlQUFLZixxQkFBTCxDQUEyQixvREFBM0IsRUFBZ0YsSUFBaEY7QUFDRixTQUhELE1BS0E7QUFDR1gsVUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ3lCLFlBQXRDLEdBQW1ELElBQW5EO0FBQ0EsZUFBS2YscUJBQUwsQ0FBMkIsdUNBQTNCLEVBQW1FLElBQW5FO0FBQ0Y7O0FBRUQ7O0FBQ0osV0FBSyxHQUFMO0FBQ0lRLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUsvRyxXQUFMLENBQWlCNEcsS0FBakIsRUFBd0J4RixXQUFwQztBQUNBOztBQUNKLFdBQUssR0FBTDtBQUNJMEYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSy9HLFdBQUwsQ0FBaUI0RyxLQUFqQixFQUF3QnhGLFdBQXBDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLL0csV0FBTCxDQUFpQjRHLEtBQWpCLEVBQXdCeEYsV0FBcEM7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUsvRyxXQUFMLENBQWlCNEcsS0FBakIsRUFBd0J4RixXQUFwQztBQUNBOztBQUNKLFdBQUssR0FBTDtBQUNJMEYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSy9HLFdBQUwsQ0FBaUI0RyxLQUFqQixFQUF3QnhGLFdBQXBDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQVM7QUFDTDBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUsvRyxXQUFMLENBQWlCNEcsS0FBakIsRUFBd0J4RixXQUFwQzs7QUFDQSxZQUFJdUUsUUFBUSxHQUFDakcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxZQUFJWSxZQUFZLEdBQUNsRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRGEsYUFBcEQsRUFBakI7O0FBRUFGLFFBQUFBLFFBQVEsQ0FBQzJCLHVCQUFULENBQWlDLElBQWpDOztBQUNBLGFBQUtoQixxQkFBTCxDQUEyQixpREFBM0IsRUFBNkUsSUFBN0U7QUFFQTs7QUFDSixXQUFLLEdBQUw7QUFDSVEsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSy9HLFdBQUwsQ0FBaUI0RyxLQUFqQixFQUF3QnhGLFdBQXBDO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLL0csV0FBTCxDQUFpQjRHLEtBQWpCLEVBQXdCeEYsV0FBcEM7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFBVTtBQUNOMEYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSy9HLFdBQUwsQ0FBaUI0RyxLQUFqQixFQUF3QnhGLFdBQXBDOztBQUNBLFlBQUl1RSxRQUFRLEdBQUNqRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFiOztBQUNBLFlBQUlZLFlBQVksR0FBQ2xHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EYSxhQUFwRCxFQUFqQjs7QUFFQSxZQUFJMEIsV0FBVyxHQUFDNUIsUUFBUSxDQUFDNkIsWUFBVCxFQUFoQjs7QUFDQSxZQUFJQyxXQUFXLEdBQUM5QixRQUFRLENBQUM2QixZQUFULEVBQWhCLENBTkosQ0FRRztBQUNBOzs7QUFFQyxZQUFJRSxXQUFXLEdBQUNILFdBQVcsR0FBQ0UsV0FBNUI7O0FBRUEsWUFBR0MsV0FBVyxJQUFFLEVBQWhCLEVBQ0E7QUFDSSxjQUFJQyxPQUFPLEdBQUMsQ0FBWjs7QUFDQSxlQUFLLElBQUk3QixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR0gsUUFBUSxDQUFDSSxjQUFULENBQXdCRSxNQUFwRCxFQUE0REgsS0FBSyxFQUFqRSxFQUFxRTtBQUNsRTZCLFlBQUFBLE9BQU8sR0FBQ0EsT0FBTyxHQUFDaEMsUUFBUSxDQUFDSSxjQUFULENBQXdCRCxLQUF4QixFQUErQjhCLGVBQS9DO0FBQ0Y7O0FBRURqQyxVQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDaUMsSUFBdEMsSUFBNENGLE9BQTVDO0FBQ0EsZUFBS3JCLHFCQUFMLENBQTJCLG9CQUFrQmlCLFdBQWxCLEdBQThCLElBQTlCLEdBQW1DLElBQW5DLEdBQzNCLGlCQUQyQixHQUNURSxXQURTLEdBQ0csSUFESCxHQUNRLElBRFIsR0FFM0IsU0FGMkIsR0FFakJDLFdBRmlCLEdBRUwsSUFGSyxHQUVBLElBRkEsR0FFSyxJQUZMLEdBRzNCLFVBSDJCLEdBR2hCQyxPQUhnQixHQUdSLHNFQUhuQixFQUlDLElBSkQ7O0FBT0EsY0FBSUcsWUFBWSxHQUFDcEksd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ2dELHlCQUFsQyxHQUE4REMsWUFBOUQsR0FBNkVDLGlCQUE3RSxFQUFqQjs7QUFFQSxlQUFLLElBQUluQyxPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBR2dDLFlBQVksQ0FBQzdCLE1BQXpDLEVBQWlESCxPQUFLLEVBQXRELEVBQTBEO0FBQ3ZEZ0MsWUFBQUEsWUFBWSxDQUFDaEMsT0FBRCxDQUFaLENBQW9Cb0MsZ0JBQXBCLENBQXFDQyxpQkFBckMsQ0FBdURQLGVBQXZELEdBQXVFLENBQXZFO0FBQ0Y7QUFDSixTQXBCRCxNQXNCQTtBQUNHLGVBQUt0QixxQkFBTCxDQUEyQixvQkFBa0JpQixXQUFsQixHQUE4QixJQUE5QixHQUFtQyxJQUFuQyxHQUMzQixpQkFEMkIsR0FDVEUsV0FEUyxHQUNHLElBREgsR0FDUSxJQURSLEdBRTNCLFNBRjJCLEdBRWpCQyxXQUZpQixHQUVMLElBRkssR0FFQSxJQUZBLEdBRUssSUFGTCxHQUczQix5Q0FIQSxFQUlDLElBSkQ7QUFLRjs7QUFFRDs7QUFDSixXQUFLLElBQUw7QUFDSVosUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSy9HLFdBQUwsQ0FBaUI0RyxLQUFqQixFQUF3QnhGLFdBQXBDO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLL0csV0FBTCxDQUFpQjRHLEtBQWpCLEVBQXdCeEYsV0FBcEM7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUsvRyxXQUFMLENBQWlCNEcsS0FBakIsRUFBd0J4RixXQUFwQztBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJMEYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSy9HLFdBQUwsQ0FBaUI0RyxLQUFqQixFQUF3QnhGLFdBQXBDO0FBQ0E7O0FBQ0g7QUFDRztBQWpJTjtBQW9JRixHQXZha0I7QUF5YW5Ca0UsRUFBQUEsMEJBemFtQixzQ0F5YVFxQixHQXphUixFQTBhbkI7QUFDRSxRQUFJQyxLQUFLLEdBQUNDLFFBQVEsQ0FBQ0YsR0FBRCxDQUFsQjtBQUNBQyxJQUFBQSxLQUFLLEdBQUNBLEtBQUssR0FBQyxDQUFaOztBQUVDLFlBQVFELEdBQVI7QUFDRSxXQUFLLEdBQUw7QUFBUztBQUNMRyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLOUcsU0FBTCxDQUFlMkcsS0FBZixFQUFzQnhGLFdBQWxDOztBQUNBLFlBQUl1RSxRQUFRLEdBQUNqRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFiOztBQUNBLFlBQUlvRCxXQUFXLEdBQUN6QyxRQUFRLENBQUMwQyxxQkFBVCxFQUFoQjs7QUFFQSxZQUFHRCxXQUFXLEdBQUMsQ0FBZixFQUNHLEtBQUs5QixxQkFBTCxDQUEyQiw2Q0FBMkM4QixXQUF0RSxFQUFrRixJQUFsRixFQURILEtBR0csS0FBSzlCLHFCQUFMLENBQTJCLHFDQUEzQixFQUFpRSxJQUFqRTtBQUNIOztBQUNKLFdBQUssR0FBTDtBQUNJUSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLOUcsU0FBTCxDQUFlMkcsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLOUcsU0FBTCxDQUFlMkcsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQVM7QUFDTDBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs5RyxTQUFMLENBQWUyRyxLQUFmLEVBQXNCeEYsV0FBbEM7O0FBQ0EsWUFBSXVFLFFBQVEsR0FBQ2pHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWI7O0FBQ0EsWUFBSVksWUFBWSxHQUFDbEcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RhLGFBQXBELEVBQWpCOztBQUNBLFlBQUl5QyxhQUFhLEdBQUMzQyxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDZ0MsZUFBeEQ7QUFDQSxZQUFJVyxXQUFXLEdBQUMsQ0FBaEI7O0FBQ0EsWUFBSUMsZUFBZSxHQUFDN0MsUUFBUSxDQUFDOEMsc0JBQVQsQ0FBZ0NGLFdBQWhDLENBQXBCOztBQUVBLFlBQUdDLGVBQWUsR0FBQyxDQUFuQixFQUNBO0FBQ0csZUFBS2xDLHFCQUFMLENBQTJCLHdCQUFzQmdDLGFBQXRCLEdBQW9DLElBQXBDLEdBQXlDLElBQXpDLEdBQzNCLFNBRDJCLEdBQ2pCQSxhQURpQixHQUNILEtBREcsR0FDR0MsV0FESCxHQUNlLEtBRGYsR0FDcUJDLGVBRHJCLEdBQ3FDLElBRHJDLEdBQzBDLElBRDFDLEdBQytDLElBRC9DLEdBRTNCLDBEQUYyQixHQUVnQ0EsZUFGM0QsRUFHQyxJQUhEO0FBSUYsU0FORCxNQVFBO0FBQ0csZUFBS2xDLHFCQUFMLENBQTJCLHFDQUEzQixFQUFpRSxJQUFqRTtBQUNGOztBQUNEOztBQUNKLFdBQUssR0FBTDtBQUNJUSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLOUcsU0FBTCxDQUFlMkcsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLOUcsU0FBTCxDQUFlMkcsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLOUcsU0FBTCxDQUFlMkcsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQVM7QUFDTDBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs5RyxTQUFMLENBQWUyRyxLQUFmLEVBQXNCeEYsV0FBbEM7O0FBQ0EsWUFBSXVFLFFBQVEsR0FBQ2pHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWI7O0FBQ0EsWUFBSW9ELFdBQVcsR0FBQ3pDLFFBQVEsQ0FBQzBDLHFCQUFULEVBQWhCOztBQUVBLFlBQUdELFdBQVcsR0FBQyxDQUFmLEVBQ0csS0FBSzlCLHFCQUFMLENBQTJCLDZDQUEyQzhCLFdBQXRFLEVBQWtGLElBQWxGLEVBREgsS0FHRyxLQUFLOUIscUJBQUwsQ0FBMkIscUNBQTNCLEVBQWlFLElBQWpFO0FBQ0g7O0FBQ0osV0FBSyxHQUFMO0FBQVM7QUFDTFEsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzlHLFNBQUwsQ0FBZTJHLEtBQWYsRUFBc0J4RixXQUFsQzs7QUFDQSxZQUFJdUUsUUFBUSxHQUFDakcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxZQUFJb0QsV0FBVyxHQUFDekMsUUFBUSxDQUFDMEMscUJBQVQsRUFBaEI7O0FBRUEsWUFBR0QsV0FBVyxHQUFDLENBQWYsRUFDRyxLQUFLOUIscUJBQUwsQ0FBMkIsNkNBQTJDOEIsV0FBdEUsRUFBa0YsSUFBbEYsRUFESCxLQUdHLEtBQUs5QixxQkFBTCxDQUEyQixxQ0FBM0IsRUFBaUUsSUFBakU7QUFDSDs7QUFDSixXQUFLLElBQUw7QUFBVTtBQUNOUSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLOUcsU0FBTCxDQUFlMkcsS0FBZixFQUFzQnhGLFdBQWxDOztBQUNBLFlBQUl1RSxRQUFRLEdBQUNqRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFiOztBQUNBLFlBQUlZLFlBQVksR0FBQ2xHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EYSxhQUFwRCxFQUFqQjs7QUFDQSxZQUFJeUMsYUFBYSxHQUFDM0MsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ2dDLGVBQXhEO0FBQ0EsWUFBSWMsT0FBTyxHQUFDLEdBQVo7O0FBQ0EsWUFBSWYsT0FBTyxHQUFDaEMsUUFBUSxDQUFDZ0QsaUJBQVQsQ0FBMkJELE9BQTNCLENBQVo7O0FBRUEsWUFBR2YsT0FBTyxHQUFDLENBQVgsRUFDQTtBQUNHLGVBQUtyQixxQkFBTCxDQUEyQix3QkFBc0JnQyxhQUF0QixHQUFvQyxJQUFwQyxHQUF5QyxJQUF6QyxHQUMzQixTQUQyQixHQUNqQkEsYUFEaUIsR0FDSCxNQURHLEdBQ0lBLGFBREosR0FDa0IsR0FEbEIsR0FDc0JJLE9BRHRCLEdBQzhCLFFBRDlCLEdBQ3VDLEtBRHZDLEdBQzZDZixPQUQ3QyxHQUNxRCxJQURyRCxHQUMwRCxJQUQxRCxHQUMrRCxJQUQvRCxHQUUzQixxREFGMkIsR0FFMkJBLE9BRjNCLEdBRW1DLHdCQUZuQyxHQUU0RGhDLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NpQyxJQUY3SCxFQUdDLElBSEQ7QUFJRixTQU5ELE1BUUE7QUFDTyxlQUFLdkIscUJBQUwsQ0FBMkIscUNBQTNCLEVBQWlFLElBQWpFO0FBQ047O0FBQ0Q7O0FBQ0osV0FBSyxJQUFMO0FBQ0lRLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs5RyxTQUFMLENBQWUyRyxLQUFmLEVBQXNCeEYsV0FBbEM7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs5RyxTQUFMLENBQWUyRyxLQUFmLEVBQXNCeEYsV0FBbEM7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs5RyxTQUFMLENBQWUyRyxLQUFmLEVBQXNCeEYsV0FBbEM7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFBVTtBQUNOMEYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzlHLFNBQUwsQ0FBZTJHLEtBQWYsRUFBc0J4RixXQUFsQzs7QUFDQSxZQUFJdUUsUUFBUSxHQUFDakcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxZQUFJb0QsV0FBVyxHQUFDekMsUUFBUSxDQUFDMEMscUJBQVQsRUFBaEI7O0FBRUEsWUFBR0QsV0FBVyxHQUFDLENBQWYsRUFDRyxLQUFLOUIscUJBQUwsQ0FBMkIsNkNBQTJDOEIsV0FBdEUsRUFBa0YsSUFBbEYsRUFESCxLQUdHLEtBQUs5QixxQkFBTCxDQUEyQixxQ0FBM0IsRUFBaUUsSUFBakU7QUFDSDs7QUFDSixXQUFLLElBQUw7QUFDSVEsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzlHLFNBQUwsQ0FBZTJHLEtBQWYsRUFBc0J4RixXQUFsQztBQUNBOztBQUNIO0FBQ0c7QUE3R047QUFnSEYsR0E5aEJrQjtBQWdpQm5CaUUsRUFBQUEsdUJBaGlCbUIsbUNBZ2lCS3NCLEdBaGlCTCxFQWlpQm5CO0FBQ0UsUUFBSUMsS0FBSyxHQUFDQyxRQUFRLENBQUNGLEdBQUQsQ0FBbEI7QUFDQUMsSUFBQUEsS0FBSyxHQUFDQSxLQUFLLEdBQUMsQ0FBWjs7QUFFQyxZQUFRRCxHQUFSO0FBQ0UsV0FBSyxHQUFMO0FBQVM7QUFDTEcsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzVHLE1BQUwsQ0FBWXlHLEtBQVosRUFBbUJ4RixXQUEvQjs7QUFDQSxZQUFJdUUsUUFBUSxHQUFDakcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxZQUFJWSxZQUFZLEdBQUNsRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRGEsYUFBcEQsRUFBakI7O0FBQ0FGLFFBQUFBLFFBQVEsQ0FBQ2lELGtCQUFULENBQTRCLElBQTVCOztBQUNBLGFBQUt0QyxxQkFBTCxDQUEyQiwrQkFBM0IsRUFBMkQsSUFBM0Q7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFDSVEsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzVHLE1BQUwsQ0FBWXlHLEtBQVosRUFBbUJ4RixXQUEvQjtBQUNBOztBQUNKLFdBQUssR0FBTDtBQUFTO0FBQ0wwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLNUcsTUFBTCxDQUFZeUcsS0FBWixFQUFtQnhGLFdBQS9COztBQUNBLFlBQUl1RSxRQUFRLEdBQUNqRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFiOztBQUNBLFlBQUlZLFlBQVksR0FBQ2xHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EYSxhQUFwRCxFQUFqQjs7QUFFQUYsUUFBQUEsUUFBUSxDQUFDa0Qsc0JBQVQsQ0FBZ0MsSUFBaEM7O0FBQ0EsYUFBS3ZDLHFCQUFMLENBQTJCLDBEQUEzQixFQUFzRixJQUF0RjtBQUNBOztBQUNKLFdBQUssR0FBTDtBQUNJUSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLNUcsTUFBTCxDQUFZeUcsS0FBWixFQUFtQnhGLFdBQS9CO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLNUcsTUFBTCxDQUFZeUcsS0FBWixFQUFtQnhGLFdBQS9CO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQVM7QUFDTDBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7O0FBQ0EsWUFBSXVFLFFBQVEsR0FBQ2pHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWI7O0FBQ0EsWUFBSVksWUFBWSxHQUFDbEcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RhLGFBQXBELEVBQWpCOztBQUVBLFlBQUlpRCxhQUFhLEdBQUNqQyxRQUFRLENBQUNsQixRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtRCxDQUFuRCxFQUFzRCtDLFlBQXZELENBQTFCOztBQUNBLFlBQUdELGFBQWEsSUFBRSxDQUFsQixFQUFxQjtBQUNyQjtBQUNJLGdCQUFHbkQsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ2lDLElBQXRDLElBQTRDLElBQS9DLEVBQ0E7QUFDR2xDLGNBQUFBLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NpQyxJQUF0QyxJQUE0QyxJQUE1QztBQUNBLG1CQUFLdkIscUJBQUwsQ0FBMkIscUZBQW1GWCxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDaUMsSUFBcEosRUFBeUosSUFBeko7QUFDRixhQUpELE1BTUE7QUFDRyxtQkFBS3ZCLHFCQUFMLENBQTJCLDhCQUEzQixFQUEwRCxJQUExRDtBQUNGO0FBQ0osV0FYRCxNQVlLLElBQUl3QyxhQUFhLElBQUUsQ0FBbkIsRUFBc0I7QUFDM0I7QUFDRyxnQkFBR25ELFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NpQyxJQUF0QyxJQUE0QyxLQUEvQyxFQUNBO0FBQ0dsQyxjQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDaUMsSUFBdEMsSUFBNEMsS0FBNUM7QUFDQSxtQkFBS3ZCLHFCQUFMLENBQTJCLDBGQUF3RlgsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ2lDLElBQXpKLEVBQThKLElBQTlKO0FBQ0YsYUFKRCxNQU1BO0FBQ0csbUJBQUt2QixxQkFBTCxDQUEyQiw4QkFBM0IsRUFBMEQsSUFBMUQ7QUFDRjtBQUNIOztBQUNEOztBQUNKLFdBQUssR0FBTDtBQUFTO0FBQ0xRLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7O0FBQ0EsWUFBSXVFLFFBQVEsR0FBQ2pHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWI7O0FBQ0EsWUFBSVksWUFBWSxHQUFDbEcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RhLGFBQXBELEVBQWpCOztBQUVBRixRQUFBQSxRQUFRLENBQUNxRCwwQkFBVCxDQUFvQyxJQUFwQzs7QUFDQSxhQUFLMUMscUJBQUwsQ0FBMkIsd0VBQTNCLEVBQW9HLElBQXBHO0FBRUE7O0FBQ0osV0FBSyxHQUFMO0FBQ0lRLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs1RyxNQUFMLENBQVl5RyxLQUFaLEVBQW1CeEYsV0FBL0I7QUFDQTs7QUFDSDtBQUNHO0FBMUZOO0FBNkZGLEdBbG9Ca0I7QUFvb0JuQm1FLEVBQUFBLHFCQXBvQm1CLGlDQW9vQkdvQixHQXBvQkgsRUFxb0JuQjtBQUNFLFFBQUlDLEtBQUssR0FBQ0MsUUFBUSxDQUFDRixHQUFELENBQWxCO0FBQ0FDLElBQUFBLEtBQUssR0FBQ0EsS0FBSyxHQUFDLENBQVo7O0FBRUMsWUFBUUQsR0FBUjtBQUNFLFdBQUssR0FBTDtBQUFTO0FBQ0xHLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs3RSxTQUFMLENBQWUwRSxLQUFmLEVBQXNCeEYsV0FBbEM7O0FBQ0EsWUFBSXVFLFFBQVEsR0FBQ2pHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWI7O0FBRUFXLFFBQUFBLFFBQVEsQ0FBQzJCLHVCQUFULENBQWlDLElBQWpDOztBQUNBLGFBQUtoQixxQkFBTCxDQUEyQixpREFBM0IsRUFBNkUsSUFBN0U7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFBUztBQUNMUSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLN0UsU0FBTCxDQUFlMEUsS0FBZixFQUFzQnhGLFdBQWxDOztBQUNBLFlBQUl1RSxRQUFRLEdBQUNqRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxFQUFiOztBQUNBLFlBQUlZLFlBQVksR0FBQ2xHLHdCQUF3QixDQUFDcUYsUUFBekIsQ0FBa0NDLGVBQWxDLEdBQW9EYSxhQUFwRCxFQUFqQjs7QUFFQSxZQUFJb0QsVUFBVSxHQUFDdEQsUUFBUSxDQUFDdUQsV0FBVCxFQUFmOztBQUNBLFlBQUlDLGNBQWMsR0FBQyxJQUFuQjtBQUNBLFlBQUl6QixXQUFXLEdBQUN1QixVQUFVLEdBQUNFLGNBQTNCO0FBRUF4RCxRQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDaUMsSUFBdEMsSUFBNENILFdBQTVDO0FBQ0EsYUFBS3BCLHFCQUFMLENBQTJCLGtCQUFnQjJDLFVBQWhCLEdBQTJCLElBQTNCLEdBQWdDLElBQWhDLEdBQ3hCLFNBRHdCLEdBQ2RBLFVBRGMsR0FDSCxLQURHLEdBQ0dFLGNBREgsR0FDa0IsS0FEbEIsR0FDd0J6QixXQUR4QixHQUNvQyxJQURwQyxHQUN5QyxJQUR6QyxHQUM4QyxJQUQ5QyxHQUV4QixVQUZ3QixHQUViQSxXQUZhLEdBRUQsaUNBRjFCLEVBR0ksSUFISjtBQUtBOztBQUNKLFdBQUssR0FBTDtBQUNJWixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLN0UsU0FBTCxDQUFlMEUsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLN0UsU0FBTCxDQUFlMEUsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLN0UsU0FBTCxDQUFlMEUsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLN0UsU0FBTCxDQUFlMEUsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQVM7QUFDTCxZQUFJdUUsUUFBUSxHQUFDakcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFDQSxZQUFJWSxZQUFZLEdBQUNsRyx3QkFBd0IsQ0FBQ3FGLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRGEsYUFBcEQsRUFBakI7O0FBRUEsWUFBSXVELFVBQVUsR0FBQyxLQUFmOztBQUNBLGFBQUssSUFBSXRELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHSCxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtREMsTUFBL0UsRUFBdUZILEtBQUssRUFBNUYsRUFBZ0c7QUFDN0YsY0FBSXVELEtBQUssR0FBQ3hDLFFBQVEsQ0FBQ2xCLFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QkgsWUFBeEIsRUFBc0NJLFlBQXRDLENBQW1ERixLQUFuRCxFQUEwRGlELFlBQTNELENBQWxCOztBQUNBLGNBQUdNLEtBQUssSUFBRSxDQUFQLElBQVkxRCxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtREYsS0FBbkQsRUFBMERJLFNBQXpFLEVBQ0E7QUFDSVAsWUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCSCxZQUF4QixFQUFzQ0ksWUFBdEMsQ0FBbURGLEtBQW5ELEVBQTBESSxTQUExRCxHQUFvRSxLQUFwRTtBQUNBUCxZQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDSSxZQUF0QyxDQUFtREYsS0FBbkQsRUFBMERzQixVQUExRCxHQUFxRSxDQUFyRTtBQUNBZ0MsWUFBQUEsVUFBVSxHQUFDLElBQVg7QUFDQTtBQUNIO0FBQ0o7O0FBRUQsWUFBR0EsVUFBSCxFQUNBO0FBQ0ksZUFBSzlDLHFCQUFMLENBQTJCLDJDQUEzQixFQUF1RSxJQUF2RTtBQUNILFNBSEQsTUFJQTtBQUNJWCxVQUFBQSxRQUFRLENBQUNJLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDaUMsSUFBdEMsSUFBNEMsS0FBNUM7QUFDQSxlQUFLdkIscUJBQUwsQ0FBMkIsNERBQTNCLEVBQXdGLElBQXhGO0FBQ0g7O0FBRUFRLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs3RSxTQUFMLENBQWUwRSxLQUFmLEVBQXNCeEYsV0FBbEM7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs3RSxTQUFMLENBQWUwRSxLQUFmLEVBQXNCeEYsV0FBbEM7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs3RSxTQUFMLENBQWUwRSxLQUFmLEVBQXNCeEYsV0FBbEM7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFDSTBGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs3RSxTQUFMLENBQWUwRSxLQUFmLEVBQXNCeEYsV0FBbEM7QUFDQTs7QUFDSixXQUFLLElBQUw7QUFBVTtBQUNOMEYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzdFLFNBQUwsQ0FBZTBFLEtBQWYsRUFBc0J4RixXQUFsQzs7QUFDQSxZQUFJdUUsUUFBUSxHQUFDakcsd0JBQXdCLENBQUNxRixRQUF6QixDQUFrQ0MsZUFBbEMsRUFBYjs7QUFFQVcsUUFBQUEsUUFBUSxDQUFDMkIsdUJBQVQsQ0FBaUMsSUFBakM7O0FBQ0EsYUFBS2hCLHFCQUFMLENBQTJCLGlEQUEzQixFQUE2RSxJQUE3RTtBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJUSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLN0UsU0FBTCxDQUFlMEUsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLN0UsU0FBTCxDQUFlMEUsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLN0UsU0FBTCxDQUFlMEUsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0osV0FBSyxJQUFMO0FBQ0kwRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLN0UsU0FBTCxDQUFlMEUsS0FBZixFQUFzQnhGLFdBQWxDO0FBQ0E7O0FBQ0g7QUFDRztBQTVGTjtBQStGRixHQXh1QmtCO0FBMHVCbkI0QyxFQUFBQSxtQkExdUJtQixpQ0EydUJuQixDQUVDLENBN3VCa0I7QUE4dUJuQkUsRUFBQUEsbUJBOXVCbUIsaUNBK3VCbkIsQ0FFQyxDQWp2QmtCO0FBa3ZCbkJFLEVBQUFBLHlCQWx2Qm1CLHVDQW12Qm5CLENBRUMsQ0FydkJrQjtBQXN2Qm5CRSxFQUFBQSx3QkF0dkJtQixzQ0F1dkJuQixDQUVDLENBenZCa0I7QUEwdkJuQkUsRUFBQUEsaUJBMXZCbUIsK0JBMnZCbkIsQ0FFQyxDQTd2QmtCO0FBOHZCbkJFLEVBQUFBLHNCQTl2Qm1CLG9DQSt2Qm5CLENBRUMsQ0Fqd0JrQjtBQWt3Qm5CRSxFQUFBQSxtQkFsd0JtQixpQ0Ftd0JuQixDQUVDO0FBcndCa0IsQ0FBVCxDQUFkO0FBdXdCQTBFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFnQnhILFNBQWhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNwYWNlcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtU3BhY2VUeXBlID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBXaWxkQ2FyZDogMSxcclxuICAgIEJpZ0J1c2luZXNzOiAyLFxyXG4gICAgTWFya2V0aW5nOiAzLFxyXG4gICAgSW52ZXN0OiA0LFxyXG4gICAgTG9zc2VzOjUsXHJcbiAgICBQYXlEYXk6IDYsXHJcbiAgICBEb3VibGVQYXlEYXk6IDcsXHJcbiAgICBPbmVRdWVzdGlvbjogOCxcclxuICAgIFNlbGw6IDksXHJcbiAgICBCdXlPclNlbGw6IDEwLFxyXG4gICAgR29CYWNrU3BhY2VzOjExLFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGNhcmQgZGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkNhcmREYXRhXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgSUQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSURcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJJZCBvZiB0aGUgY2FyZFwifSxcclxuICAgICAgICBEZXNjcmlwdGlvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJEZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcImRlc2NyaXB0aW9uIG9mIHRoZSBjYXJkXCJ9LFxyXG4gICAgICAgIEhhc0J1dHRvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJIYXNCdXR0b25cIixcclxuICAgICAgICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiaWYgdGhpcyBjYXJkIHNob3VsZCBoYXZlIGludGVyYWN0aW9uIGJ1dHRvblwifSxcclxuICAgICAgICBCdXR0b25OYW1lOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwifSxcclxuIH0sXHJcblxyXG4gY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbiB9XHJcblxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkVUk9Y2MuQ2xhc3Moe1xyXG4gICBuYW1lOlwiQ2FyZFVJXCIsXHJcbiAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIFRvYXN0Tm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG9hc3ROb2RlXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJub2RlIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwifSxcclxuICAgICAgIFRvYXN0TGFiZWw6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0TGFiZWxcIixcclxuICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJsYWJlbCByZWZlcmVuY2UgZm9yIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgIEJ1dHRvbk5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIkV4aXRCdXR0b25cIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcIkJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIn0sXHJcbiAgICAgICAgSW50ZXJhY3Rpb25CdXR0b25Ob2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJJbnRlcmFjdGlvbkJ1dHRvblwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwiaW50ZXJhY3Rpb24gQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwifSxcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcblxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGRlY2tzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERlY2tzRGF0YT1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiRGVja3NEYXRhXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgIE1haW5VSTpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIk1haW5VSVwiLFxyXG4gICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICB0eXBlOiBDYXJkVUksXHJcbiAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgdG9vbHRpcDpcIlVJIG9mIGRlY2tzXCJ9LFxyXG4gICAgICBCaWdCdXNpbmVzczpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIkJpZ0J1c2luZXNzXCIsXHJcbiAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJhbGwgY2FyZHMgZGF0YSBmb3IgYmlnIGJ1c2luZXNzXCIsfSxcclxuICAgICAgTWFya2V0aW5nOlxyXG4gICAgICB7XHJcbiAgICAgICAgIGRpc3BsYXlOYW1lOlwiTWFya2V0aW5nXCIsXHJcbiAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJhbGwgY2FyZHMgZGF0YSBmb3IgbWFya2V0aW5nXCIsfSxcclxuICAgICAgIExvc3NlczpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIkxvc3Nlc1wiLFxyXG4gICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICB0b29sdGlwOlwiYWxsIGNhcmRzIGRhdGEgZm9yIGxvc3Nlc1wiLH0sXHJcbiAgICAgICBXaWxkQ2FyZHM6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJXaWxkQ2FyZHNcIixcclxuICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgdG9vbHRpcDpcImFsbCBjYXJkcyBkYXRhIGZvciBXaWxkQ2FyZHNcIix9LFxyXG4gICAgICAgIFNwYWNlc1R5cGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBFbnVtU3BhY2VUeXBlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBFbnVtU3BhY2VUeXBlLk5vbmUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInN0YXRlcyBtYWNoaW5lcyBieSB0eXBlIG9mIGNhcmQgb3Igc3BhY2VzIG9uIGJvYXJkXCIsfSwgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9LTE7XHJcbiAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkPS0xO1xyXG5cclxuICAgICAgLy90aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkoXCIxXCIpO1xyXG4gICAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAgIC8vIHRoaXMuQ291bnRlcj0wO1xyXG4gICAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmFuZG9tOmZ1bmN0aW9uKG1pbixtYXgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsX2hhc0J1dHRvbj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNPd25lciAmJiBfaGFzQnV0dG9uKVxyXG4gICAgICB7XHJcbiAgICAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSAgaWYoX2lzT3duZXIgJiYgIV9oYXNCdXR0b24pXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICB0aGlzLkV4aXRDYXJkSW5mbygpO1xyXG4gICAgICAgfSwgMjUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3M7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5NYXJrZXRpbmc7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICBpZih0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiAgICBcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sdHJ1ZSk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5Mb3NzZXM7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbix0cnVlKTtcclxuXHJcbiAgICAgIGlmKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuICAgICBcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tV2lsZENhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5XaWxkQ2FyZDtcclxuICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleD0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD10aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuIFxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbix0cnVlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlSW52ZXN0KF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gaW52ZXN0bWVudCBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5JbnZlc3RGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZVBheURheShfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIFBheURheSBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5QYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZURvdWJsZVBheURheShfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIERvdWJsZVBheURheSBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5Eb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZU9uZVF1ZXN0aW9uKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gT25lIFF1ZXN0aW9uIHNwYWNlLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VTZWxsKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gU2VsbCBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5TZWxsRnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VCdXlPclNlbGwoX2lzT3duZXIsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBCdXkgb3IgU2VsbCBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUdvQmFja1NwYWNlcyhfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIEdvIEJhY2sgc3BhY2UuXCIsdHJ1ZSk7XHJcbiAgICAgIHRoaXMuR29CYWNrRnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU2hvd0NhcmRJbmZvOmZ1bmN0aW9uKG1lc3NhZ2UsX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICBpZihfc3RhdGUpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmc9bWVzc2FnZTtcclxuICAgICAgfWVsc2VcclxuICAgICAge1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdExhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdE5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRDYXJkSW5mbygpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVzZXRDYXJkRGlzcGxheSgpOyAgXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7ICAgXHJcblxyXG4gICAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAgIC8vIHRoaXMuQ291bnRlcisrO1xyXG4gICAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIENhcmRGdW50aW9uYWxpdHlCdXR0b24oKVxyXG4gICAge1xyXG4gICAgICBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3MpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICB9ZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuTG9zc2VzKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5Mb3NzZXNDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuTWFya2V0aW5nKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuV2lsZENhcmQpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLldpbGRDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC8vZm9yIHRlc3RpbmdcclxuICAgICAgLy8gdGhpcy5Db3VudGVyKys7XHJcbiAgICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tMb2FuKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9MDtcclxuXHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB2YWw9LTE7XHJcbiAgICAgICAgdmFsPV9sb2FuVGFrZW49PXRydWU/MTowO1xyXG4gICAgICAgIHZhciBSZXN1bHQ9Y2MudjIodmFsLCBfYnVzaW5lc3NJbmRleClcclxuICAgICAgICByZXR1cm4gUmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBDb21wbGV0ZVR1cm5XaXRoVG9hc3QoX21zZyxfdGltZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX21zZyxfdGltZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTsgIFxyXG4gICAgICAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7ICAgXHJcbiAgICAgICAgIH0sIChfdGltZSsxMDApKTtcclxuICAgIH0sXHJcblxyXG4gICAgQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9yZWNlaXZlIDIwMDAwJCBnaWZ0IHRvIHBheW9mZiBsb2FuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9yZXN1bHQ9dGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICAgICAgIHZhciBJc0xvYW5UYWtlbj1fcmVzdWx0Lng7XHJcbiAgICAgICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9X3Jlc3VsdC55O1xyXG5cclxuICAgICAgICAgICAgIGlmKElzTG9hblRha2VuPT0xKSAvL21lYW5zIHVzZXIgaGFzIHRha2VuIGxvYW5cclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50LTIwMDAwO1xyXG4gICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ8PTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTG9hbiBhbW91bnQgb2YgJDIwMDAwIGhhcyBiZWVuIHBheWVkIG9mZi5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbm90IHRha2VuIGFueSBsb2FuLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6IC8vaGlyZSBsYXd5ZXJcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgaGlyZWQgbGF5d2VyLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOi8vZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXkgZGF5XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLDE4MDApO1xyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOi8vcm9sbCBkaWNlIHR3aWNlLCBpZiByZXN1bHQgaXMgPjE5IHRoZW4gdGFrZSBhbGwgbW9uZXkgaW5zaWRlIG1hcmtldGluZy5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBEaWNlMVJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgIHZhciBEaWNlMlJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICB2YXIgRGljZTFSZXN1bHQ9MTI7XHJcbiAgICAgICAgICAgIC8vICB2YXIgRGljZTJSZXN1bHQ9MTI7XHJcblxyXG4gICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0PURpY2UxUmVzdWx0K0RpY2UyUmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgIGlmKFRvdGFsUmVzdWx0Pj0xOSlcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBfYW1vdW50PV9hbW91bnQrX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9X2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgMSBSZXN1bHQ6IFwiK0RpY2UxUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiK0RpY2UyUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIkFtb3VudCAkXCIrX2Ftb3VudCtcIiBoYXMgc3VjY2Vzc2Z1bGx5IGFkZGVkIGluIHlvdXIgY2FzaCBmcm9tIG1hcmtldGluZyBhbW91bnQgb24gdGFibGUuXCJcclxuICAgICAgICAgICAgICAgICAsNDAwMCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICB2YXIgX2FjdG9yc0FycmF5PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIitEaWNlMVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiK0RpY2UyUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJZb3UgcmFuIG91dCBvZiBsdWNrLCB0dXJuIHdpbGwgc2tpcCBub3dcIlxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG4gICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkKVxyXG4gICAge1xyXG4gICAgICB2YXIgSW5kZXg9cGFyc2VJbnQoX2lkKTtcclxuICAgICAgSW5kZXg9SW5kZXgtMTtcclxuXHJcbiAgICAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICAgICBjYXNlIFwiMVwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQ9X21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2xvc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19sb3NlQW1vdW50LDIxMDApO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI0XCI6Ly9Zb3VyIE1hcmtldGluZyBBY2NvdW50IHRyaXBsZXMsIGJ1dCB5b3UgbXVzdCBsZWF2ZSBpdCBpbiB0aGUgYWNjb3VudC5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICB2YXIgX211bHRpcGxpZXI9MztcclxuICAgICAgICAgICAgIHZhciBfaW5jcmVhc2VBbW91bnQ9X21hbmFnZXIuTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcik7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2luY3JlYXNlQW1vdW50PjApXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIitfbWFya2V0QW1vdW50K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK19tYXJrZXRBbW91bnQrXCIgKiBcIitfbXVsdGlwbGllcitcIiA9IFwiK19pbmNyZWFzZUFtb3VudCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwieW91ciBtYXJrZXRpbmcgYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIHRvICRcIitfaW5jcmVhc2VBbW91bnRcclxuICAgICAgICAgICAgICAgICwzMTAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQ9X21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2xvc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19sb3NlQW1vdW50LDIxMDApO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI5XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudD1fbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbG9zZUFtb3VudD4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIrX2xvc2VBbW91bnQsMjEwMCk7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6Ly9SZWNlaXZlIGFsbCBvZiB5b3VyIE1hcmtldGluZyBCdWRnZXQgYmFjaywgcGx1cyA3MDAlIHByb2ZpdC5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICB2YXIgX3Byb2ZpdD03MDA7XHJcbiAgICAgICAgICAgICB2YXIgX2Ftb3VudD1fbWFuYWdlci5HZXRNYXJrZXRpbmdNb25leShfcHJvZml0KTtcclxuXHJcbiAgICAgICAgICAgICBpZihfYW1vdW50PjApXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIitfbWFya2V0QW1vdW50K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK19tYXJrZXRBbW91bnQrXCIgKyAoXCIrX21hcmtldEFtb3VudCtcIipcIitfcHJvZml0K1wiICkvMTAwXCIrXCIgPSBcIitfYW1vdW50K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJ5b3VyIGNhc2ggYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIGJ5ICRcIitfYW1vdW50K1wiLCB0b3RhbCBjYXNoIGJlY29tZXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaFxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTFcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50PV9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9sb3NlQW1vdW50PjApXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIitfbG9zZUFtb3VudCwyMTAwKTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIExvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KF9pZClcclxuICAgIHtcclxuICAgICAgdmFyIEluZGV4PXBhcnNlSW50KF9pZCk7XHJcbiAgICAgIEluZGV4PUluZGV4LTE7XHJcblxyXG4gICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgY2FzZSBcIjFcIjovL2xvc2UgbmV4dCB0dXJuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgbG9zZSB5b3VyIG5leHQgdHVybi5cIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOi8vbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBuZXh0IFBheSBEYXkuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjZcIjovLyBJZiBCdXNpbmVzcyAjMSBpcyBIb21lIEJhc2VkLCBwYXkgYSAkNSwwMDAgSW5zdXJhbmNlIERlZHVjdGlibGU7IGlmIEJyaWNrICYgTW9ydGFyICQxMCwwMDAgZGVkdWN0aWJsZS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NUeXBlPXBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICAgICBpZihfYnVzaW5lc3NUeXBlPT0xKSAvLyBmaXJzdCBidXNpbmVzcyB3YXMgaG9tZSBiYXNlZFxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD49NTAwMClcclxuICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLT01MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQ1MDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGhvbWUgYmFzZWQgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZSBpZiAoX2J1c2luZXNzVHlwZT09MikgLy9maXJzdCBidXNpb25lc3Mgd2FzIGJyaWNrICYgbW9ydGFyXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PTEwMDAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLT0xMDAwMDtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQxMDAwMCBpbnN1cmFuY2Ugb24geW91ciBmaXJzdCBicmljayAmIG1vcnRhciBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwyMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI3XCI6Ly9sb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCh0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSB5b3VyIG5leHQgUGF5IERheSBmb3IgYWxsIG9mIHlvdXIgaG9tZS1iYXNlZCBidXNpbmVzc2VzLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFdpbGRDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9kb3VibGVzIHlvdXIgaW5jb21lIG9uIHRoZSBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwxODAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMlwiOi8vUm9sbCAxIGRpZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIGFkdmFuY2UgZnJvbSB0aGUgQmFuay5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdD1fbWFuYWdlci5Sb2xsT25lRGljZSgpO1xyXG4gICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyPTUwMDA7XHJcbiAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ9RGljZVJlc3VsdCpDYXNoTXVsaXRwbGllcjtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grPVRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIrRGljZVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitEaWNlUmVzdWx0K1wiICogXCIrQ2FzaE11bGl0cGxpZXIrXCIgPSBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiQW1vdW50ICRcIitUb3RhbFJlc3VsdCtcIiBoYXMgYmVlbiBhZGRlZCBpbnRvIHlvdXIgY2FzaC5cIlxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOi8vcGF5IG9mZiB5b3VyIGxvYW4gZm9yIHlvdXIgQnJpY2sgJiBNb3J0YXIgQnVzaW5lc3MuIElmIHlvdSBoYXZlIG5vIGxvYW4gb3V0c3RhbmRpbmcsIHJlY2VpdmUgJDUwLDAwMC5cclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBfbG9hblJlc2V0PWZhbHNlO1xyXG4gICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90eXBlPXBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoX3R5cGU9PTIgJiYgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYW5SZXNldD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihfbG9hblJlc2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdXIgb3V0c3RhbmRpbmcgbG9hbiBoYXMgYmVlbiBwYXllZCBvZmYuXCIsMjgwMCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9NTAwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgbm8gbG9hbiwgYW1vdW50ICQ1MDAwMCBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2hcIiwyODAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOi8vIHJlY2VpdmUgZG91YmxlIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBhbGwgb2YgeW91ciBidXNpbmVzc2VzLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBJbnZlc3RGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxuICAgIERvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbiAgICBTZWxsRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbiAgICBHb0JhY2tGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuXHJcbiAgICB9LFxyXG59KTtcclxubW9kdWxlLmV4cG9ydHM9IERlY2tzRGF0YTtcclxuIl19