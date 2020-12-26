
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
    this.SpacesType = EnumSpaceType.Invest;
    this.ShowCardInfo("You can invest one more time in Gold or stocks this turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
    this.ToggleButtons(_isOwner, true);
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
    this.SpacesType = EnumSpaceType.Sell;
    this.ShowCardInfo("You can sell any one of your business or can skip turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
    this.ToggleButtons(_isOwner, true);
  },
  SpaceBuyOrSell: function SpaceBuyOrSell(_isOwner, _index) {
    this.SpacesType = EnumSpaceType.BuyOrSell;
    this.ShowCardInfo("You can Buy or sell Gold or stocks one more time in this turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
    this.ToggleButtons(_isOwner, true);
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
  InvestFunctionality: function InvestFunctionality() {
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableInvest_InvestSetupUI(true);
    this.ShowCardInfo("", false);
  },
  PayDayFunctionality: function PayDayFunctionality() {},
  DoublePayDayFunctionality: function DoublePayDayFunctionality() {},
  OneQuestionFunctionality: function OneQuestionFunctionality() {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiRW51bVNwYWNlVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJXaWxkQ2FyZCIsIkJpZ0J1c2luZXNzIiwiTWFya2V0aW5nIiwiSW52ZXN0IiwiTG9zc2VzIiwiUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiT25lUXVlc3Rpb24iLCJTZWxsIiwiQnV5T3JTZWxsIiwiR29CYWNrU3BhY2VzIiwiQ2FyZERhdGEiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiSUQiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJUZXh0Iiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkRlc2NyaXB0aW9uIiwiSGFzQnV0dG9uIiwiQnV0dG9uTmFtZSIsImN0b3IiLCJDYXJkVUkiLCJUb2FzdE5vZGUiLCJOb2RlIiwiVG9hc3RMYWJlbCIsIkxhYmVsIiwiQnV0dG9uTm9kZSIsIkludGVyYWN0aW9uQnV0dG9uTm9kZSIsIkRlY2tzRGF0YSIsIkNvbXBvbmVudCIsIk1haW5VSSIsIldpbGRDYXJkcyIsIlNwYWNlc1R5cGUiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTZWxlY3RlZENhcmRJbmRleCIsIkNhcmRTZWxlY3RlZCIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiYWN0aXZlIiwic2V0VGltZW91dCIsIkV4aXRDYXJkSW5mbyIsIkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkIiwiX3JhbmRvbVZhbHVlIiwiY2hpbGRyZW4iLCJnZXRDb21wb25lbnQiLCJzdHJpbmciLCJTaG93Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQiLCJHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQiLCJHZW5lcmF0ZVJhbmRvbVdpbGRDYXJkIiwiU3BhY2VJbnZlc3QiLCJfaW5kZXgiLCJTcGFjZVBheURheSIsIlBheURheUZ1bmN0aW9uYWxpdHkiLCJTcGFjZURvdWJsZVBheURheSIsIkRvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkiLCJTcGFjZU9uZVF1ZXN0aW9uIiwiT25lUXVlc3Rpb25GdW5jdGlvbmFsaXR5IiwiU3BhY2VTZWxsIiwiU3BhY2VCdXlPclNlbGwiLCJTcGFjZUdvQmFja1NwYWNlcyIsIkdvQmFja0Z1bmN0aW9uYWxpdHkiLCJtZXNzYWdlIiwiX3N0YXRlIiwiSW5zdGFuY2UiLCJHZXRfR2FtZU1hbmFnZXIiLCJSZXNldENhcmREaXNwbGF5IiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIkNhcmRGdW50aW9uYWxpdHlCdXR0b24iLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJDaGVja0xvYW4iLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJfbWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkdldFR1cm5OdW1iZXIiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwiTm9PZkJ1c2luZXNzIiwibGVuZ3RoIiwiTG9hblRha2VuIiwidmFsIiwiUmVzdWx0IiwidjIiLCJDb21wbGV0ZVR1cm5XaXRoVG9hc3QiLCJfbXNnIiwiX3RpbWUiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJfaWQiLCJJbmRleCIsInBhcnNlSW50IiwiY29uc29sZSIsImxvZyIsIl9yZXN1bHQiLCJJc0xvYW5UYWtlbiIsIngiLCJ5IiwiTG9hbkFtb3VudCIsIkxhd3llclN0YXR1cyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiRGljZTFSZXN1bHQiLCJSb2xsVHdvRGljZXMiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX2Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkNhc2giLCJfYWN0b3JzQXJyYXkiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tQWN0b3JzQXJyYXkiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJfbG9zZUFtb3VudCIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9tYXJrZXRBbW91bnQiLCJfbXVsdGlwbGllciIsIl9pbmNyZWFzZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiR2V0TWFya2V0aW5nTW9uZXkiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiX2J1c2luZXNzVHlwZSIsIkJ1c2luZXNzVHlwZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiRGljZVJlc3VsdCIsIlJvbGxPbmVEaWNlIiwiQ2FzaE11bGl0cGxpZXIiLCJfbG9hblJlc2V0IiwiX3R5cGUiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0IsRUFDQTs7QUFDQSxJQUFJQyxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUMsQ0FEbUI7QUFFeEJDLEVBQUFBLFFBQVEsRUFBRSxDQUZjO0FBR3hCQyxFQUFBQSxXQUFXLEVBQUUsQ0FIVztBQUl4QkMsRUFBQUEsU0FBUyxFQUFFLENBSmE7QUFLeEJDLEVBQUFBLE1BQU0sRUFBRSxDQUxnQjtBQU14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ZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNwYWNlcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtU3BhY2VUeXBlID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBXaWxkQ2FyZDogMSxcclxuICAgIEJpZ0J1c2luZXNzOiAyLFxyXG4gICAgTWFya2V0aW5nOiAzLFxyXG4gICAgSW52ZXN0OiA0LFxyXG4gICAgTG9zc2VzOjUsXHJcbiAgICBQYXlEYXk6IDYsXHJcbiAgICBEb3VibGVQYXlEYXk6IDcsXHJcbiAgICBPbmVRdWVzdGlvbjogOCxcclxuICAgIFNlbGw6IDksXHJcbiAgICBCdXlPclNlbGw6IDEwLFxyXG4gICAgR29CYWNrU3BhY2VzOjExLFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGNhcmQgZGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkNhcmREYXRhXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgSUQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSURcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJJZCBvZiB0aGUgY2FyZFwifSxcclxuICAgICAgICBEZXNjcmlwdGlvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJEZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcImRlc2NyaXB0aW9uIG9mIHRoZSBjYXJkXCJ9LFxyXG4gICAgICAgIEhhc0J1dHRvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJIYXNCdXR0b25cIixcclxuICAgICAgICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiaWYgdGhpcyBjYXJkIHNob3VsZCBoYXZlIGludGVyYWN0aW9uIGJ1dHRvblwifSxcclxuICAgICAgICBCdXR0b25OYW1lOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwifSxcclxuIH0sXHJcblxyXG4gY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbiB9XHJcblxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkVUk9Y2MuQ2xhc3Moe1xyXG4gICBuYW1lOlwiQ2FyZFVJXCIsXHJcbiAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIFRvYXN0Tm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG9hc3ROb2RlXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJub2RlIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwifSxcclxuICAgICAgIFRvYXN0TGFiZWw6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0TGFiZWxcIixcclxuICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJsYWJlbCByZWZlcmVuY2UgZm9yIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgIEJ1dHRvbk5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIkV4aXRCdXR0b25cIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcIkJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIn0sXHJcbiAgICAgICAgSW50ZXJhY3Rpb25CdXR0b25Ob2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJJbnRlcmFjdGlvbkJ1dHRvblwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwiaW50ZXJhY3Rpb24gQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwifSxcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcblxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGRlY2tzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERlY2tzRGF0YT1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiRGVja3NEYXRhXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgIE1haW5VSTpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIk1haW5VSVwiLFxyXG4gICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICB0eXBlOiBDYXJkVUksXHJcbiAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgdG9vbHRpcDpcIlVJIG9mIGRlY2tzXCJ9LFxyXG4gICAgICBCaWdCdXNpbmVzczpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIkJpZ0J1c2luZXNzXCIsXHJcbiAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJhbGwgY2FyZHMgZGF0YSBmb3IgYmlnIGJ1c2luZXNzXCIsfSxcclxuICAgICAgTWFya2V0aW5nOlxyXG4gICAgICB7XHJcbiAgICAgICAgIGRpc3BsYXlOYW1lOlwiTWFya2V0aW5nXCIsXHJcbiAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJhbGwgY2FyZHMgZGF0YSBmb3IgbWFya2V0aW5nXCIsfSxcclxuICAgICAgIExvc3NlczpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIkxvc3Nlc1wiLFxyXG4gICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICB0b29sdGlwOlwiYWxsIGNhcmRzIGRhdGEgZm9yIGxvc3Nlc1wiLH0sXHJcbiAgICAgICBXaWxkQ2FyZHM6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJXaWxkQ2FyZHNcIixcclxuICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgdG9vbHRpcDpcImFsbCBjYXJkcyBkYXRhIGZvciBXaWxkQ2FyZHNcIix9LFxyXG4gICAgICAgIFNwYWNlc1R5cGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBFbnVtU3BhY2VUeXBlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBFbnVtU3BhY2VUeXBlLk5vbmUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInN0YXRlcyBtYWNoaW5lcyBieSB0eXBlIG9mIGNhcmQgb3Igc3BhY2VzIG9uIGJvYXJkXCIsfSwgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9LTE7XHJcbiAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkPS0xO1xyXG5cclxuICAgICAgLy90aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkoXCIxXCIpO1xyXG4gICAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAgIC8vIHRoaXMuQ291bnRlcj0wO1xyXG4gICAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmFuZG9tOmZ1bmN0aW9uKG1pbixtYXgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsX2hhc0J1dHRvbj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNPd25lciAmJiBfaGFzQnV0dG9uKVxyXG4gICAgICB7XHJcbiAgICAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSAgaWYoX2lzT3duZXIgJiYgIV9oYXNCdXR0b24pXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICB0aGlzLkV4aXRDYXJkSW5mbygpO1xyXG4gICAgICAgfSwgMjUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3M7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5NYXJrZXRpbmc7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICBpZih0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiAgICBcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sdHJ1ZSk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5Mb3NzZXM7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbix0cnVlKTtcclxuXHJcbiAgICAgIGlmKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuICAgICBcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tV2lsZENhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5XaWxkQ2FyZDtcclxuICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleD0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD10aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuIFxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbix0cnVlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlSW52ZXN0KF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuSW52ZXN0O1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gaW52ZXN0IG9uZSBtb3JlIHRpbWUgaW4gR29sZCBvciBzdG9ja3MgdGhpcyB0dXJuLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJBQ0NFUFRcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZVBheURheShfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIFBheURheSBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5QYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZURvdWJsZVBheURheShfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIERvdWJsZVBheURheSBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5Eb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZU9uZVF1ZXN0aW9uKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gT25lIFF1ZXN0aW9uIHNwYWNlLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VTZWxsKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuU2VsbDtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIHNlbGwgYW55IG9uZSBvZiB5b3VyIGJ1c2luZXNzIG9yIGNhbiBza2lwIHR1cm4uXCIsdHJ1ZSk7XHJcbiAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIkFDQ0VQVFwiO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlQnV5T3JTZWxsKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5CdXlPclNlbGw7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIEJ1eSBvciBzZWxsIEdvbGQgb3Igc3RvY2tzIG9uZSBtb3JlIHRpbWUgaW4gdGhpcyB0dXJuLlwiLHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIkFDQ0VQVFwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VHb0JhY2tTcGFjZXMoX2lzT3duZXIsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBHbyBCYWNrIHNwYWNlLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLkdvQmFja0Z1bmN0aW9uYWxpdHkoKTtcclxuXHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcixmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNob3dDYXJkSW5mbzpmdW5jdGlvbihtZXNzYWdlLF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgaWYoX3N0YXRlKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuVG9hc3ROb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLlRvYXN0TGFiZWwuc3RyaW5nPW1lc3NhZ2U7XHJcbiAgICAgIH1lbHNlXHJcbiAgICAgIHtcclxuICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3ROb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0Q2FyZEluZm8oKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlc2V0Q2FyZERpc3BsYXkoKTsgIFxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpOyAgIFxyXG5cclxuICAgICAgLy9mb3IgdGVzdGluZ1xyXG4gICAgICAvLyB0aGlzLkNvdW50ZXIrKztcclxuICAgICAgLy8gdGhpcy5HZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCh0aGlzLkNvdW50ZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBDYXJkRnVudGlvbmFsaXR5QnV0dG9uKClcclxuICAgIHtcclxuICAgICAgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLkJpZ0J1c2luZXNzKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgfWVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLkxvc3NlcylcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLk1hcmtldGluZylcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLldpbGRDYXJkKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5XaWxkQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLlNlbGwpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLlNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuSW52ZXN0KVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuQnV5T3JTZWxsKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5CdXlPclNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tMb2FuKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9MDtcclxuXHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB2YWw9LTE7XHJcbiAgICAgICAgdmFsPV9sb2FuVGFrZW49PXRydWU/MTowO1xyXG4gICAgICAgIHZhciBSZXN1bHQ9Y2MudjIodmFsLCBfYnVzaW5lc3NJbmRleClcclxuICAgICAgICByZXR1cm4gUmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBDb21wbGV0ZVR1cm5XaXRoVG9hc3QoX21zZyxfdGltZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX21zZyxfdGltZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTsgIFxyXG4gICAgICAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7ICAgXHJcbiAgICAgICAgIH0sIChfdGltZSsxMDApKTtcclxuICAgIH0sXHJcblxyXG4gICAgQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9yZWNlaXZlIDIwMDAwJCBnaWZ0IHRvIHBheW9mZiBsb2FuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9yZXN1bHQ9dGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICAgICAgIHZhciBJc0xvYW5UYWtlbj1fcmVzdWx0Lng7XHJcbiAgICAgICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9X3Jlc3VsdC55O1xyXG5cclxuICAgICAgICAgICAgIGlmKElzTG9hblRha2VuPT0xKSAvL21lYW5zIHVzZXIgaGFzIHRha2VuIGxvYW5cclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50LTIwMDAwO1xyXG4gICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ8PTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTG9hbiBhbW91bnQgb2YgJDIwMDAwIGhhcyBiZWVuIHBheWVkIG9mZi5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbm90IHRha2VuIGFueSBsb2FuLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6IC8vaGlyZSBsYXd5ZXJcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgaGlyZWQgbGF5d2VyLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOi8vZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXkgZGF5XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLDE4MDApO1xyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOi8vcm9sbCBkaWNlIHR3aWNlLCBpZiByZXN1bHQgaXMgPjE5IHRoZW4gdGFrZSBhbGwgbW9uZXkgaW5zaWRlIG1hcmtldGluZy5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBEaWNlMVJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgIHZhciBEaWNlMlJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICB2YXIgRGljZTFSZXN1bHQ9MTI7XHJcbiAgICAgICAgICAgIC8vICB2YXIgRGljZTJSZXN1bHQ9MTI7XHJcblxyXG4gICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0PURpY2UxUmVzdWx0K0RpY2UyUmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgIGlmKFRvdGFsUmVzdWx0Pj0xOSlcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBfYW1vdW50PV9hbW91bnQrX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9X2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgMSBSZXN1bHQ6IFwiK0RpY2UxUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiK0RpY2UyUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIkFtb3VudCAkXCIrX2Ftb3VudCtcIiBoYXMgc3VjY2Vzc2Z1bGx5IGFkZGVkIGluIHlvdXIgY2FzaCBmcm9tIG1hcmtldGluZyBhbW91bnQgb24gdGFibGUuXCJcclxuICAgICAgICAgICAgICAgICAsNDAwMCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICB2YXIgX2FjdG9yc0FycmF5PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIitEaWNlMVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiK0RpY2UyUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJZb3UgcmFuIG91dCBvZiBsdWNrLCB0dXJuIHdpbGwgc2tpcCBub3dcIlxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG4gICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkKVxyXG4gICAge1xyXG4gICAgICB2YXIgSW5kZXg9cGFyc2VJbnQoX2lkKTtcclxuICAgICAgSW5kZXg9SW5kZXgtMTtcclxuXHJcbiAgICAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICAgICBjYXNlIFwiMVwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQ9X21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2xvc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19sb3NlQW1vdW50LDIxMDApO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI0XCI6Ly9Zb3VyIE1hcmtldGluZyBBY2NvdW50IHRyaXBsZXMsIGJ1dCB5b3UgbXVzdCBsZWF2ZSBpdCBpbiB0aGUgYWNjb3VudC5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICB2YXIgX211bHRpcGxpZXI9MztcclxuICAgICAgICAgICAgIHZhciBfaW5jcmVhc2VBbW91bnQ9X21hbmFnZXIuTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcik7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2luY3JlYXNlQW1vdW50PjApXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIitfbWFya2V0QW1vdW50K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK19tYXJrZXRBbW91bnQrXCIgKiBcIitfbXVsdGlwbGllcitcIiA9IFwiK19pbmNyZWFzZUFtb3VudCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwieW91ciBtYXJrZXRpbmcgYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIHRvICRcIitfaW5jcmVhc2VBbW91bnRcclxuICAgICAgICAgICAgICAgICwzMTAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQ9X21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2xvc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19sb3NlQW1vdW50LDIxMDApO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI5XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudD1fbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbG9zZUFtb3VudD4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIrX2xvc2VBbW91bnQsMjEwMCk7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6Ly9SZWNlaXZlIGFsbCBvZiB5b3VyIE1hcmtldGluZyBCdWRnZXQgYmFjaywgcGx1cyA3MDAlIHByb2ZpdC5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICB2YXIgX3Byb2ZpdD03MDA7XHJcbiAgICAgICAgICAgICB2YXIgX2Ftb3VudD1fbWFuYWdlci5HZXRNYXJrZXRpbmdNb25leShfcHJvZml0KTtcclxuXHJcbiAgICAgICAgICAgICBpZihfYW1vdW50PjApXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIitfbWFya2V0QW1vdW50K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK19tYXJrZXRBbW91bnQrXCIgKyAoXCIrX21hcmtldEFtb3VudCtcIipcIitfcHJvZml0K1wiICkvMTAwXCIrXCIgPSBcIitfYW1vdW50K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJ5b3VyIGNhc2ggYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIGJ5ICRcIitfYW1vdW50K1wiLCB0b3RhbCBjYXNoIGJlY29tZXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaFxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTFcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50PV9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9sb3NlQW1vdW50PjApXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIitfbG9zZUFtb3VudCwyMTAwKTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIExvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KF9pZClcclxuICAgIHtcclxuICAgICAgdmFyIEluZGV4PXBhcnNlSW50KF9pZCk7XHJcbiAgICAgIEluZGV4PUluZGV4LTE7XHJcblxyXG4gICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgY2FzZSBcIjFcIjovL2xvc2UgbmV4dCB0dXJuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgbG9zZSB5b3VyIG5leHQgdHVybi5cIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOi8vbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBuZXh0IFBheSBEYXkuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjZcIjovLyBJZiBCdXNpbmVzcyAjMSBpcyBIb21lIEJhc2VkLCBwYXkgYSAkNSwwMDAgSW5zdXJhbmNlIERlZHVjdGlibGU7IGlmIEJyaWNrICYgTW9ydGFyICQxMCwwMDAgZGVkdWN0aWJsZS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NUeXBlPXBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICAgICBpZihfYnVzaW5lc3NUeXBlPT0xKSAvLyBmaXJzdCBidXNpbmVzcyB3YXMgaG9tZSBiYXNlZFxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD49NTAwMClcclxuICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLT01MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQ1MDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGhvbWUgYmFzZWQgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZSBpZiAoX2J1c2luZXNzVHlwZT09MikgLy9maXJzdCBidXNpb25lc3Mgd2FzIGJyaWNrICYgbW9ydGFyXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PTEwMDAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLT0xMDAwMDtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQxMDAwMCBpbnN1cmFuY2Ugb24geW91ciBmaXJzdCBicmljayAmIG1vcnRhciBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwyMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI3XCI6Ly9sb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCh0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSB5b3VyIG5leHQgUGF5IERheSBmb3IgYWxsIG9mIHlvdXIgaG9tZS1iYXNlZCBidXNpbmVzc2VzLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFdpbGRDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9kb3VibGVzIHlvdXIgaW5jb21lIG9uIHRoZSBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwxODAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMlwiOi8vUm9sbCAxIGRpZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIGFkdmFuY2UgZnJvbSB0aGUgQmFuay5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdD1fbWFuYWdlci5Sb2xsT25lRGljZSgpO1xyXG4gICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyPTUwMDA7XHJcbiAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ9RGljZVJlc3VsdCpDYXNoTXVsaXRwbGllcjtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grPVRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIrRGljZVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitEaWNlUmVzdWx0K1wiICogXCIrQ2FzaE11bGl0cGxpZXIrXCIgPSBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiQW1vdW50ICRcIitUb3RhbFJlc3VsdCtcIiBoYXMgYmVlbiBhZGRlZCBpbnRvIHlvdXIgY2FzaC5cIlxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOi8vcGF5IG9mZiB5b3VyIGxvYW4gZm9yIHlvdXIgQnJpY2sgJiBNb3J0YXIgQnVzaW5lc3MuIElmIHlvdSBoYXZlIG5vIGxvYW4gb3V0c3RhbmRpbmcsIHJlY2VpdmUgJDUwLDAwMC5cclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBfbG9hblJlc2V0PWZhbHNlO1xyXG4gICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90eXBlPXBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoX3R5cGU9PTIgJiYgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYW5SZXNldD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihfbG9hblJlc2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdXIgb3V0c3RhbmRpbmcgbG9hbiBoYXMgYmVlbiBwYXllZCBvZmYuXCIsMjgwMCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9NTAwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgbm8gbG9hbiwgYW1vdW50ICQ1MDAwMCBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2hcIiwyODAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOi8vIHJlY2VpdmUgZG91YmxlIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBhbGwgb2YgeW91ciBidXNpbmVzc2VzLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBJbnZlc3RGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgUGF5RGF5RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxuICAgIERvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbiAgICBTZWxsRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIEdvQmFja0Z1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cz0gRGVja3NEYXRhO1xyXG4iXX0=