
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
    this.SpacesType = EnumSpaceType.OneQuestion;
    this.ShowCardInfo("You can ask one question to any other player, if player is unable to answer they will pay you some cash amount.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
    this.ToggleButtons(_isOwner, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiRW51bVNwYWNlVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJXaWxkQ2FyZCIsIkJpZ0J1c2luZXNzIiwiTWFya2V0aW5nIiwiSW52ZXN0IiwiTG9zc2VzIiwiUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiT25lUXVlc3Rpb24iLCJTZWxsIiwiQnV5T3JTZWxsIiwiR29CYWNrU3BhY2VzIiwiQ2FyZERhdGEiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiSUQiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJUZXh0Iiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkRlc2NyaXB0aW9uIiwiSGFzQnV0dG9uIiwiQnV0dG9uTmFtZSIsImN0b3IiLCJDYXJkVUkiLCJUb2FzdE5vZGUiLCJOb2RlIiwiVG9hc3RMYWJlbCIsIkxhYmVsIiwiQnV0dG9uTm9kZSIsIkludGVyYWN0aW9uQnV0dG9uTm9kZSIsIkRlY2tzRGF0YSIsIkNvbXBvbmVudCIsIk1haW5VSSIsIldpbGRDYXJkcyIsIlNwYWNlc1R5cGUiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTZWxlY3RlZENhcmRJbmRleCIsIkNhcmRTZWxlY3RlZCIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiYWN0aXZlIiwic2V0VGltZW91dCIsIkV4aXRDYXJkSW5mbyIsIkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkIiwiX3JhbmRvbVZhbHVlIiwiY2hpbGRyZW4iLCJnZXRDb21wb25lbnQiLCJzdHJpbmciLCJTaG93Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQiLCJHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQiLCJHZW5lcmF0ZVJhbmRvbVdpbGRDYXJkIiwiU3BhY2VJbnZlc3QiLCJfaW5kZXgiLCJTcGFjZVBheURheSIsIlBheURheUZ1bmN0aW9uYWxpdHkiLCJTcGFjZURvdWJsZVBheURheSIsIkRvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkiLCJTcGFjZU9uZVF1ZXN0aW9uIiwiU3BhY2VTZWxsIiwiU3BhY2VCdXlPclNlbGwiLCJTcGFjZUdvQmFja1NwYWNlcyIsIkdvQmFja0Z1bmN0aW9uYWxpdHkiLCJtZXNzYWdlIiwiX3N0YXRlIiwiSW5zdGFuY2UiLCJHZXRfR2FtZU1hbmFnZXIiLCJSZXNldENhcmREaXNwbGF5IiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIkNhcmRGdW50aW9uYWxpdHlCdXR0b24iLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkiLCJDaGVja0xvYW4iLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJfbWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkdldFR1cm5OdW1iZXIiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwiTm9PZkJ1c2luZXNzIiwibGVuZ3RoIiwiTG9hblRha2VuIiwidmFsIiwiUmVzdWx0IiwidjIiLCJDb21wbGV0ZVR1cm5XaXRoVG9hc3QiLCJfbXNnIiwiX3RpbWUiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJfaWQiLCJJbmRleCIsInBhcnNlSW50IiwiY29uc29sZSIsImxvZyIsIl9yZXN1bHQiLCJJc0xvYW5UYWtlbiIsIngiLCJ5IiwiTG9hbkFtb3VudCIsIkxhd3llclN0YXR1cyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiRGljZTFSZXN1bHQiLCJSb2xsVHdvRGljZXMiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX2Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkNhc2giLCJfYWN0b3JzQXJyYXkiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tQWN0b3JzQXJyYXkiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJfbG9zZUFtb3VudCIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9tYXJrZXRBbW91bnQiLCJfbXVsdGlwbGllciIsIl9pbmNyZWFzZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiR2V0TWFya2V0aW5nTW9uZXkiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiX2J1c2luZXNzVHlwZSIsIkJ1c2luZXNzVHlwZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiRGljZVJlc3VsdCIsIlJvbGxPbmVEaWNlIiwiQ2FzaE11bGl0cGxpZXIiLCJfbG9hblJlc2V0IiwiX3R5cGUiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uIiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3QixFQUNBOztBQUNBLElBQUlDLGFBQWEsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDeEJDLEVBQUFBLElBQUksRUFBQyxDQURtQjtBQUV4QkMsRUFBQUEsUUFBUSxFQUFFLENBRmM7QUFHeEJDLEVBQUFBLFdBQVcsRUFBRSxDQUhXO0FBSXhCQyxFQUFBQSxTQUFTLEVBQUUs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QUNpRixRQUF6QixDQUFrQzhCLHFCQUFsQyxHQUEwRCtDLHFDQUExRCxDQUFnRyxJQUFoRztBQUNBLFNBQUs5RixZQUFMLENBQWtCLEVBQWxCLEVBQXFCLEtBQXJCO0FBQ0gsR0E1d0JrQjtBQTZ3Qm5CNEIsRUFBQUEsc0JBN3dCbUIsb0NBOHdCbkI7QUFDSTVGLElBQUFBLHdCQUF3QixDQUFDaUYsUUFBekIsQ0FBa0M4QixxQkFBbEMsR0FBMERnRCxnQ0FBMUQsQ0FBMkYsSUFBM0Y7QUFDQSxTQUFLL0YsWUFBTCxDQUFrQixFQUFsQixFQUFxQixLQUFyQjtBQUNILEdBanhCa0I7QUFreEJuQmMsRUFBQUEsbUJBbHhCbUIsaUNBbXhCbkIsQ0FFQztBQXJ4QmtCLENBQVQsQ0FBZDtBQXV4QkFrRixNQUFNLENBQUNDLE9BQVAsR0FBZ0I1SCxTQUFoQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TcGFjZXMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bVNwYWNlVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgV2lsZENhcmQ6IDEsXHJcbiAgICBCaWdCdXNpbmVzczogMixcclxuICAgIE1hcmtldGluZzogMyxcclxuICAgIEludmVzdDogNCxcclxuICAgIExvc3Nlczo1LFxyXG4gICAgUGF5RGF5OiA2LFxyXG4gICAgRG91YmxlUGF5RGF5OiA3LFxyXG4gICAgT25lUXVlc3Rpb246IDgsXHJcbiAgICBTZWxsOiA5LFxyXG4gICAgQnV5T3JTZWxsOiAxMCxcclxuICAgIEdvQmFja1NwYWNlczoxMSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJDYXJkRGF0YVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIElEOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIklEXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiSWQgb2YgdGhlIGNhcmRcIn0sXHJcbiAgICAgICAgRGVzY3JpcHRpb246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRGVzY3JpcHRpb25cIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJkZXNjcmlwdGlvbiBvZiB0aGUgY2FyZFwifSxcclxuICAgICAgICBIYXNCdXR0b246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSGFzQnV0dG9uXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcImlmIHRoaXMgY2FyZCBzaG91bGQgaGF2ZSBpbnRlcmFjdGlvbiBidXR0b25cIn0sXHJcbiAgICAgICAgQnV0dG9uTmFtZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJCdXR0b25OYW1lXCIsXHJcbiAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiYnV0dG9uIG5hbWUgdG8gc2hvdyBvbiBzY3JlZW5cIn0sXHJcbiB9LFxyXG5cclxuIGN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG4gfVxyXG5cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgY2FyZCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZFVJPWNjLkNsYXNzKHtcclxuICAgbmFtZTpcIkNhcmRVSVwiLFxyXG4gICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICBUb2FzdE5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0Tm9kZVwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwibm9kZSByZWZlcmVuY2UgZm9yIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgICBUb2FzdExhYmVsOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJUb2FzdExhYmVsXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwibGFiZWwgcmVmZXJlbmNlIGZvciB0b2FzdCBub2RlXCJ9LFxyXG4gICAgICBCdXR0b25Ob2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJCdXR0b24gcmVmZXJlbmNlIGZvciBub2RlXCJ9LFxyXG4gICAgICAgIEludGVyYWN0aW9uQnV0dG9uTm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSW50ZXJhY3Rpb25CdXR0b25cIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcImludGVyYWN0aW9uIEJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIn0sXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG5cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBkZWNrcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEZWNrc0RhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkRlY2tzRGF0YVwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICBNYWluVUk6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJNYWluVUlcIixcclxuICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgdHlwZTogQ2FyZFVJLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJVSSBvZiBkZWNrc1wifSxcclxuICAgICAgQmlnQnVzaW5lc3M6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJCaWdCdXNpbmVzc1wiLFxyXG4gICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICB0b29sdGlwOlwiYWxsIGNhcmRzIGRhdGEgZm9yIGJpZyBidXNpbmVzc1wiLH0sXHJcbiAgICAgIE1hcmtldGluZzpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIk1hcmtldGluZ1wiLFxyXG4gICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICB0b29sdGlwOlwiYWxsIGNhcmRzIGRhdGEgZm9yIG1hcmtldGluZ1wiLH0sXHJcbiAgICAgICBMb3NzZXM6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJMb3NzZXNcIixcclxuICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgdG9vbHRpcDpcImFsbCBjYXJkcyBkYXRhIGZvciBsb3NzZXNcIix9LFxyXG4gICAgICAgV2lsZENhcmRzOlxyXG4gICAgICB7XHJcbiAgICAgICAgIGRpc3BsYXlOYW1lOlwiV2lsZENhcmRzXCIsXHJcbiAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJhbGwgY2FyZHMgZGF0YSBmb3IgV2lsZENhcmRzXCIsfSxcclxuICAgICAgICBTcGFjZXNUeXBlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogRW51bVNwYWNlVHlwZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogRW51bVNwYWNlVHlwZS5Ob25lLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJzdGF0ZXMgbWFjaGluZXMgYnkgdHlwZSBvZiBjYXJkIG9yIHNwYWNlcyBvbiBib2FyZFwiLH0sIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4PS0xO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD0tMTtcclxuXHJcbiAgICAgIC8vdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KFwiMVwiKTtcclxuICAgICAgLy9mb3IgdGVzdGluZ1xyXG4gICAgICAvLyB0aGlzLkNvdW50ZXI9MDtcclxuICAgICAgLy8gdGhpcy5HZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCh0aGlzLkNvdW50ZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRvbTpmdW5jdGlvbihtaW4sbWF4KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVCdXR0b25zKF9pc093bmVyLF9oYXNCdXR0b249ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX2lzT3duZXIgJiYgX2hhc0J1dHRvbilcclxuICAgICAge1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgIGlmKF9pc093bmVyICYmICFfaGFzQnV0dG9uKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuQnV0dG9uTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuQnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgdGhpcy5FeGl0Q2FyZEluZm8oKTtcclxuICAgICAgIH0sIDI1MDApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZChfaXNPd25lcixfcmFuZG9tVmFsdWUpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU3BhY2VzVHlwZT1FbnVtU3BhY2VUeXBlLkJpZ0J1c2luZXNzO1xyXG4gICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4PSBfcmFuZG9tVmFsdWU7XHJcbiAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkPXRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICBpZih0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG5cclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbix0cnVlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKTtcclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuTWFya2V0aW5nO1xyXG4gICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4PSBfcmFuZG9tVmFsdWU7XHJcbiAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkPXRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgaWYodGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5CdXR0b25OYW1lO1xyXG4gICAgXHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKHRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKTtcclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuTG9zc2VzO1xyXG4gICAgICB0aGlzLlNlbGVjdGVkQ2FyZEluZGV4PSBfcmFuZG9tVmFsdWU7XHJcbiAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkPXRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLklEO1xyXG5cclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sdHJ1ZSk7XHJcblxyXG4gICAgICBpZih0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiAgICAgXHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbVdpbGRDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuV2lsZENhcmQ7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICBpZih0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiBcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sdHJ1ZSk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUludmVzdChfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU3BhY2VzVHlwZT1FbnVtU3BhY2VUeXBlLkludmVzdDtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGludmVzdCBvbmUgbW9yZSB0aW1lIGluIEdvbGQgb3Igc3RvY2tzIHRoaXMgdHVybi5cIix0cnVlKTtcclxuICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiQUNDRVBUXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VQYXlEYXkoX2lzT3duZXIsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBQYXlEYXkgc3BhY2UuXCIsdHJ1ZSk7XHJcbiAgICAgIHRoaXMuUGF5RGF5RnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VEb3VibGVQYXlEYXkoX2lzT3duZXIsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBEb3VibGVQYXlEYXkgc3BhY2UuXCIsdHJ1ZSk7XHJcbiAgICAgIHRoaXMuRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VPbmVRdWVzdGlvbihfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuT25lUXVlc3Rpb247XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIGFzayBvbmUgcXVlc3Rpb24gdG8gYW55IG90aGVyIHBsYXllciwgaWYgcGxheWVyIGlzIHVuYWJsZSB0byBhbnN3ZXIgdGhleSB3aWxsIHBheSB5b3Ugc29tZSBjYXNoIGFtb3VudC5cIix0cnVlKTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJBQ0NFUFRcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlU2VsbChfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU3BhY2VzVHlwZT1FbnVtU3BhY2VUeXBlLlNlbGw7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBzZWxsIGFueSBvbmUgb2YgeW91ciBidXNpbmVzcyBvciBjYW4gc2tpcCB0dXJuLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJBQ0NFUFRcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZUJ1eU9yU2VsbChfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuQnV5T3JTZWxsO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGNhbiBCdXkgb3Igc2VsbCBHb2xkIG9yIHN0b2NrcyBvbmUgbW9yZSB0aW1lIGluIHRoaXMgdHVybi5cIix0cnVlKTtcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJBQ0NFUFRcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlR29CYWNrU3BhY2VzKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gR28gQmFjayBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5Hb0JhY2tGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTaG93Q2FyZEluZm86ZnVuY3Rpb24obWVzc2FnZSxfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgIGlmKF9zdGF0ZSlcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuTWFpblVJLlRvYXN0Tm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5Ub2FzdExhYmVsLnN0cmluZz1tZXNzYWdlO1xyXG4gICAgICB9ZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgIHRoaXMuTWFpblVJLlRvYXN0TGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgIHRoaXMuTWFpblVJLlRvYXN0Tm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRXhpdENhcmRJbmZvKClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZXNldENhcmREaXNwbGF5KCk7ICBcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTsgICBcclxuXHJcbiAgICAgIC8vZm9yIHRlc3RpbmdcclxuICAgICAgLy8gdGhpcy5Db3VudGVyKys7XHJcbiAgICAgIC8vIHRoaXMuR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQodGhpcy5Db3VudGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2FyZEZ1bnRpb25hbGl0eUJ1dHRvbigpXHJcbiAgICB7XHJcbiAgICAgIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5CaWdCdXNpbmVzcylcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eSh0aGlzLkNhcmRTZWxlY3RlZCk7XHJcbiAgICAgIH1lbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5Mb3NzZXMpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLkxvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5NYXJrZXRpbmcpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLk1hcmtldGluZ0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5XaWxkQ2FyZClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuV2lsZENhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuU3BhY2VzVHlwZT09RW51bVNwYWNlVHlwZS5TZWxsKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5TZWxsRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLkludmVzdClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0RnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLkJ1eU9yU2VsbClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLk9uZVF1ZXN0aW9uKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5PbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja0xvYW4oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICBfYnVzaW5lc3NJbmRleD1pbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHZhbD0tMTtcclxuICAgICAgICB2YWw9X2xvYW5UYWtlbj09dHJ1ZT8xOjA7XHJcbiAgICAgICAgdmFyIFJlc3VsdD1jYy52Mih2YWwsIF9idXNpbmVzc0luZGV4KVxyXG4gICAgICAgIHJldHVybiBSZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBsZXRlVHVybldpdGhUb2FzdChfbXNnLF90aW1lKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChfbXNnLF90aW1lKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgICAgICAgX21hbmFnZXIuUmVzZXRDYXJkRGlzcGxheSgpOyAgXHJcbiAgICAgICAgIF9tYW5hZ2VyLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTsgICBcclxuICAgICAgICAgfSwgKF90aW1lKzEwMCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KF9pZClcclxuICAgIHtcclxuICAgICAgdmFyIEluZGV4PXBhcnNlSW50KF9pZCk7XHJcbiAgICAgIEluZGV4PUluZGV4LTE7XHJcblxyXG4gICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgY2FzZSBcIjFcIjovL3JlY2VpdmUgMjAwMDAkIGdpZnQgdG8gcGF5b2ZmIGxvYW5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3Jlc3VsdD10aGlzLkNoZWNrTG9hbigpO1xyXG4gICAgICAgICAgICAgdmFyIElzTG9hblRha2VuPV9yZXN1bHQueDtcclxuICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD1fcmVzdWx0Lnk7XHJcblxyXG4gICAgICAgICAgICAgaWYoSXNMb2FuVGFrZW49PTEpIC8vbWVhbnMgdXNlciBoYXMgdGFrZW4gbG9hblxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQtMjAwMDA7XHJcbiAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDw9MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJMb2FuIGFtb3VudCBvZiAkMjAwMDAgaGFzIGJlZW4gcGF5ZWQgb2ZmLlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBub3QgdGFrZW4gYW55IGxvYW4sIHR1cm4gd2lsbCBza2lwIG5vdy5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjogLy9oaXJlIGxhd3llclxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cylcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgYWxyZWFkeSBoaXJlZCBsYXl3ZXIsIHR1cm4gd2lsbCBza2lwIG5vdy5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTGF3eWVyU3RhdHVzPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llci5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjZcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI4XCI6Ly9kb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheSBkYXlcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMTgwMCk7XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI5XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6Ly9yb2xsIGRpY2UgdHdpY2UsIGlmIHJlc3VsdCBpcyA+MTkgdGhlbiB0YWtlIGFsbCBtb25leSBpbnNpZGUgbWFya2V0aW5nLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgdmFyIERpY2UxUmVzdWx0PV9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgdmFyIERpY2UyUmVzdWx0PV9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgICAgICAgLy8gIHZhciBEaWNlMVJlc3VsdD0xMjtcclxuICAgICAgICAgICAgLy8gIHZhciBEaWNlMlJlc3VsdD0xMjtcclxuXHJcbiAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ9RGljZTFSZXN1bHQrRGljZTJSZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgaWYoVG90YWxSZXN1bHQ+PTE5KVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9hbW91bnQ9X2Ftb3VudCtfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz1fYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiRGljZSAxIFJlc3VsdDogXCIrRGljZTFSZXN1bHQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgIFwiRGljZSAyIFJlc3VsdDogXCIrRGljZTJSZXN1bHQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgIFwiQW1vdW50ICRcIitfYW1vdW50K1wiIGhhcyBzdWNjZXNzZnVsbHkgYWRkZWQgaW4geW91ciBjYXNoIGZyb20gbWFya2V0aW5nIGFtb3VudCBvbiB0YWJsZS5cIlxyXG4gICAgICAgICAgICAgICAgICw0MDAwKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgIHZhciBfYWN0b3JzQXJyYXk9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5NYXJrZXRpbmdBbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgMSBSZXN1bHQ6IFwiK0RpY2UxUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiRGljZSAyIFJlc3VsdDogXCIrRGljZTJSZXN1bHQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbDogXCIrVG90YWxSZXN1bHQrXCJcXG5cIitcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIllvdSByYW4gb3V0IG9mIGx1Y2ssIHR1cm4gd2lsbCBza2lwIG5vd1wiXHJcbiAgICAgICAgICAgICAgICAsNDAwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudD1fbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbG9zZUFtb3VudD4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIrX2xvc2VBbW91bnQsMjEwMCk7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjovL1lvdXIgTWFya2V0aW5nIEFjY291bnQgdHJpcGxlcywgYnV0IHlvdSBtdXN0IGxlYXZlIGl0IGluIHRoZSBhY2NvdW50LlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX21hcmtldEFtb3VudD1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgIHZhciBfbXVsdGlwbGllcj0zO1xyXG4gICAgICAgICAgICAgdmFyIF9pbmNyZWFzZUFtb3VudD1fbWFuYWdlci5NdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfaW5jcmVhc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTWFya2V0aW5nIEFtb3VudDogJFwiK19tYXJrZXRBbW91bnQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbDogXCIrX21hcmtldEFtb3VudCtcIiAqIFwiK19tdWx0aXBsaWVyK1wiID0gXCIrX2luY3JlYXNlQW1vdW50K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJ5b3VyIG1hcmtldGluZyBhbW91bnQgaGFzIGJlZW4gc3VjZXNzZnVsbHkgaW5jcmVhc2UgdG8gJFwiK19pbmNyZWFzZUFtb3VudFxyXG4gICAgICAgICAgICAgICAgLDMxMDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI3XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI4XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudD1fbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbG9zZUFtb3VudD4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIrX2xvc2VBbW91bnQsMjEwMCk7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50PV9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9sb3NlQW1vdW50PjApXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIitfbG9zZUFtb3VudCwyMTAwKTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTBcIjovL1JlY2VpdmUgYWxsIG9mIHlvdXIgTWFya2V0aW5nIEJ1ZGdldCBiYWNrLCBwbHVzIDcwMCUgcHJvZml0LlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX21hcmtldEFtb3VudD1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgIHZhciBfcHJvZml0PTcwMDtcclxuICAgICAgICAgICAgIHZhciBfYW1vdW50PV9tYW5hZ2VyLkdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9hbW91bnQ+MClcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTWFya2V0aW5nIEFtb3VudDogJFwiK19tYXJrZXRBbW91bnQrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbDogXCIrX21hcmtldEFtb3VudCtcIiArIChcIitfbWFya2V0QW1vdW50K1wiKlwiK19wcm9maXQrXCIgKS8xMDBcIitcIiA9IFwiK19hbW91bnQrXCJcXG5cIitcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcInlvdXIgY2FzaCBhbW91bnQgaGFzIGJlZW4gc3VjZXNzZnVsbHkgaW5jcmVhc2UgYnkgJFwiK19hbW91bnQrXCIsIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoXHJcbiAgICAgICAgICAgICAgICAsNDAwMCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQ9X21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2xvc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19sb3NlQW1vdW50LDIxMDApO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkKVxyXG4gICAge1xyXG4gICAgICB2YXIgSW5kZXg9cGFyc2VJbnQoX2lkKTtcclxuICAgICAgSW5kZXg9SW5kZXgtMTtcclxuXHJcbiAgICAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICAgICBjYXNlIFwiMVwiOi8vbG9zZSBuZXh0IHR1cm5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcE5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCBsb3NlIHlvdXIgbmV4dCB0dXJuLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6Ly9sb3NlIGFsbCB5b3VyIGJ1c2luZXNzIHByb2ZpdHMgb24gbmV4dCBQYXkgRGF5LlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlU2tpcFBheURheV9XaG9sZSh0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOi8vIElmIEJ1c2luZXNzICMxIGlzIEhvbWUgQmFzZWQsIHBheSBhICQ1LDAwMCBJbnN1cmFuY2UgRGVkdWN0aWJsZTsgaWYgQnJpY2sgJiBNb3J0YXIgJDEwLDAwMCBkZWR1Y3RpYmxlLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgdmFyIF9idXNpbmVzc1R5cGU9cGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlKTtcclxuICAgICAgICAgICAgIGlmKF9idXNpbmVzc1R5cGU9PTEpIC8vIGZpcnN0IGJ1c2luZXNzIHdhcyBob21lIGJhc2VkXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj01MDAwKVxyXG4gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtPTUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJDUwMDAgaW5zdXJhbmNlIG9uIHlvdXIgZmlyc3QgaG9tZSBiYXNlZCBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwyMTAwKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIiwxODAwKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlIGlmIChfYnVzaW5lc3NUeXBlPT0yKSAvL2ZpcnN0IGJ1c2lvbmVzcyB3YXMgYnJpY2sgJiBtb3J0YXJcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD49MTAwMDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtPTEwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgcGF5ZWQgJDEwMDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzLCByZW1haW5pbmcgY2FzaCBpcyAkXCIrX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjovL2xvc2UgeW91ciBuZXh0IFBheSBEYXkgZm9yIGFsbCBvZiB5b3VyIGhvbWUtYmFzZWQgYnVzaW5lc3Nlcy5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3Ugd2lsbCBsb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTBcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE0XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgV2lsZENhcmRGdW5jdGlvbmFsaXR5KF9pZClcclxuICAgIHtcclxuICAgICAgdmFyIEluZGV4PXBhcnNlSW50KF9pZCk7XHJcbiAgICAgIEluZGV4PUluZGV4LTE7XHJcblxyXG4gICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgY2FzZSBcIjFcIjovL2RvdWJsZXMgeW91ciBpbmNvbWUgb24gdGhlIG5leHQgUGF5IERheS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6Ly9Sb2xsIDEgZGllLCBtdWx0aXBseSByZXN1bHQgYnkgJDUsMDAwIGFuZCByZWNlaXZlIHlvdXIgYWR2YW5jZSBmcm9tIHRoZSBCYW5rLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBEaWNlUmVzdWx0PV9tYW5hZ2VyLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgICAgICAgICB2YXIgQ2FzaE11bGl0cGxpZXI9NTAwMDtcclxuICAgICAgICAgICAgIHZhciBUb3RhbFJlc3VsdD1EaWNlUmVzdWx0KkNhc2hNdWxpdHBsaWVyO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9VG90YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgUmVzdWx0OiBcIitEaWNlUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK0RpY2VSZXN1bHQrXCIgKiBcIitDYXNoTXVsaXRwbGllcitcIiA9IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJBbW91bnQgJFwiK1RvdGFsUmVzdWx0K1wiIGhhcyBiZWVuIGFkZGVkIGludG8geW91ciBjYXNoLlwiXHJcbiAgICAgICAgICAgICAgICAsNDAwMCk7XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI0XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI3XCI6Ly9wYXkgb2ZmIHlvdXIgbG9hbiBmb3IgeW91ciBCcmljayAmIE1vcnRhciBCdXNpbmVzcy4gSWYgeW91IGhhdmUgbm8gbG9hbiBvdXRzdGFuZGluZywgcmVjZWl2ZSAkNTAsMDAwLlxyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgdmFyIF9sb2FuUmVzZXQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3R5cGU9cGFyc2VJbnQoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZihfdHlwZT09MiAmJiBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hblJlc2V0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKF9sb2FuUmVzZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91ciBvdXRzdGFuZGluZyBsb2FuIGhhcyBiZWVuIHBheWVkIG9mZi5cIiwyODAwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz01MDAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGhhZCBubyBsb2FuLCBhbW91bnQgJDUwMDAwIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaFwiLDI4MDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTBcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjExXCI6Ly8gcmVjZWl2ZSBkb3VibGUgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIGFsbCBvZiB5b3VyIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwxODAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEludmVzdEZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBQYXlEYXlGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuXHJcbiAgICB9LFxyXG4gICAgRG91YmxlUGF5RGF5RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxuICAgIE9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFNlbGxGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgR29CYWNrRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxufSk7XHJcbm1vZHVsZS5leHBvcnRzPSBEZWNrc0RhdGE7XHJcbiJdfQ==