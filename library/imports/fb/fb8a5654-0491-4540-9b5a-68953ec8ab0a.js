"use strict";
cc._RF.push(module, 'fb8a5ZUBJFFQJtaaJU+yKsK', 'BusinessDetail');
// Script/BusinessDetail.js

"use strict";

var GamePlayReferenceManager = null;
var BusinessDetail = cc.Class({
  name: "BusinessDetail",
  "extends": cc.Component,
  properties: {
    BusinessName: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    BusinessType: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    BusinessModeLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    BusinessBalance: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    BusinessLocations: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    CanSell: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    SellBusinessBtnNode: {
      "default": null,
      type: cc.Node,
      serializable: true
    },
    SellLocationBtnNode: {
      "default": null,
      type: cc.Node,
      serializable: true
    },
    BusinessMode: {
      "default": -1,
      type: cc.Integer,
      serializable: true
    },
    BusinessIndex: {
      "default": -1,
      type: cc.Integer,
      serializable: true
    },
    CanUndergoPartnership: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    PartnerNameLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    BusinessValueLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    PartnerShipBtnNode: {
      "default": null,
      type: cc.Node,
      serializable: true
    },
    FinalBusinessValue: {
      "default": -1,
      type: cc.Integer,
      serializable: true
    },
    SelectBusinessForPayDayRoll: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    SelectBusinessButtonNode: {
      "default": null,
      type: cc.Node,
      serializable: true
    },
    IsBusinessTakeOver: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    IsBusinessDamaging: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    SelectedPlayerIndex: {
      "default": -1,
      type: cc.Integer,
      serializable: true
    },
    BuyHalfBusiness: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    SellingAmount: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    },
    IsSellAllBusiness: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    }
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
  },
  SetSelectBusinessForPayDayRoll: function SetSelectBusinessForPayDayRoll(_state) {
    this.SelectBusinessForPayDayRoll = _state;
  },
  SetBusinessMode: function SetBusinessMode(_val) {
    this.BusinessMode = _val;
  },
  SetPlayerIndex: function SetPlayerIndex(_val) {
    this.SelectedPlayerIndex = _val;
  },
  SetBusinessIndex: function SetBusinessIndex(_val) {
    this.BusinessIndex = _val;
  },
  SetSellingAmount: function SetSellingAmount(_val) {
    this.SellingAmount = _val;
  },
  setHalfBusiness: function setHalfBusiness(_stat) {
    this.BuyHalfBusiness = _stat;
  },
  SetName: function SetName(_name) {
    this.BusinessName.string = _name;
  },
  SetType: function SetType(_type) {
    this.BusinessType.string = _type;
  },
  SetMode: function SetMode(_mode) {
    this.BusinessModeLabel.string = _mode;
  },
  SetBalance: function SetBalance(_balance) {
    this.BusinessBalance.string = _balance;
  },
  SetLocations: function SetLocations(_locations) {
    this.BusinessLocations.string = _locations;
  },
  SetPartnerName: function SetPartnerName(_name) {
    this.PartnerNameLabel.string = _name;
  },
  SetBusinessValue: function SetBusinessValue(_value) {
    this.BusinessValueLabel.string = _value;
  },
  SetFinalBusinessValue: function SetFinalBusinessValue(_value) {
    this.FinalBusinessValue = _value;
  },
  SetPlayerObject: function SetPlayerObject(_obj) {
    this.PlayerData = _obj;
  },
  ToggleSellBusinessButton: function ToggleSellBusinessButton(_state) {
    if (this.CanSell) {
      this.SellBusinessBtnNode.getComponent(cc.Button).interactable = _state;
    }
  },
  ToggleSellLocationButton: function ToggleSellLocationButton(_state) {
    if (this.CanSell) {
      this.SellLocationBtnNode.getComponent(cc.Button).interactable = _state;
    }
  },
  TogglePartnerShipButton: function TogglePartnerShipButton(_state) {
    this.PartnerShipBtnNode.getComponent(cc.Button).interactable = _state;
  },
  SellLocation: function SellLocation() {
    if (this.BusinessMode == 1) {//home based
      //there is not going to be any location for home based
    } else if (this.BusinessMode == 2) {
      //Brick and mortar
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var _tempData = _manager.PlayerGameInfo[_playerIndex];

      if (_tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length > 0) {
        //if selected business has any location at all
        if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) {
          //if there is some loan on selected business
          _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.pop();

          var LocationAmount;

          if (this.SellingAmount == 0) {
            LocationAmount = 75000;
          } else {
            LocationAmount = this.SellingAmount;
          }

          var _amount = LocationAmount - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

          if (_amount < 0) _amount = 0;
          _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
          _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;
          _tempData.Cash += _amount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold one of your location, $" + _amount + " added to your cash after paying loan", 2000);

          if (this.SellingAmount == 0) {
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
            }, 2050);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreenAlongTurnOver__SellBusinessUISetup();
          }
        } else {
          _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.pop();

          var LocationAmount;

          if (this.SellingAmount == 0) {
            LocationAmount = 75000;
          } else {
            LocationAmount = this.SellingAmount;
          }

          _tempData.Cash += LocationAmount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold one of your location, $" + LocationAmount + " added to your cash", 2000);

          if (this.SellingAmount == 0) {
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
            }, 2050);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreenAlongTurnOver__SellBusinessUISetup();
          }
        }
      }
    }
  },
  SellBusiness: function SellBusiness() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = _manager.PlayerGameInfo[_playerIndex];

    if (_tempData.NoOfBusiness.length > 1) {
      if (this.BusinessMode == 1) {
        //home based
        if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) {
          //if there is some loan on selected business
          var HomeBasedAmount;

          if (this.SellingAmount == 0) {
            HomeBasedAmount = 10000;
          } else {
            HomeBasedAmount = this.SellingAmount;
          }

          _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

          var _amount = HomeBasedAmount - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

          var _loanAmount = _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount - HomeBasedAmount;

          if (_loanAmount <= 0) {
            //means payed all loan
            _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
            _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;
          } else {
            _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount -= HomeBasedAmount;
          }

          if (_amount <= 0) _amount = 0;
          _tempData.Cash += _amount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business, $" + _amount + " added to your cash after paying loan", 2000);

          if (this.SellingAmount == 0) {
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
            }, 2050);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreenAlongTurnOver__SellBusinessUISetup();
          }
        } else {
          var HomeBasedAmount;

          if (this.SellingAmount == 0) {
            HomeBasedAmount = 10000;
          } else {
            HomeBasedAmount = this.SellingAmount;
          }

          _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

          _tempData.Cash += HomeBasedAmount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business, $" + HomeBasedAmount + " added to your cash", 2000);

          if (this.SellingAmount == 0) {
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
            }, 2050);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreenAlongTurnOver__SellBusinessUISetup();
          }
        }
      } else if (this.BusinessMode == 2) {
        //brick and mortar
        if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) {
          //if there is some loan on selected business
          var MortarAmount;

          if (this.SellingAmount == 0) {
            MortarAmount = 75000;
          } else {
            MortarAmount = this.SellingAmount;
          }

          var _locations = _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;
          if (_locations > 0) //if business have location muliplye each location with amount
            MortarAmount += _locations * MortarAmount;

          var _amount = MortarAmount - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

          var _loanAmount = _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount - MortarAmount;

          if (_loanAmount <= 0) {
            //means payed all loan
            _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
            _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;
          } else {
            _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount -= HomeBasedAmount;
          }

          if (_amount <= 0) _amount = 0;
          _tempData.Cash += _amount;

          _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business along with any locations, $" + _amount + " added to your cash after paying loan", 2000);

          if (this.SellingAmount == 0) {
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
            }, 2050);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreenAlongTurnOver__SellBusinessUISetup();
          }
        } else {
          var MortarAmount;

          if (this.SellingAmount == 0) {
            MortarAmount = 75000;
          } else {
            MortarAmount = this.SellingAmount;
          }

          var _locations = _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;
          if (_locations > 0) //if business have location muliplye each location with amount
            MortarAmount += _locations * MortarAmount;

          _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

          _tempData.Cash += MortarAmount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business, $" + MortarAmount + " added to your cash", 2000);

          if (this.SellingAmount == 0) {
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
            }, 2050);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreenAlongTurnOver__SellBusinessUISetup();
          }
        }
      }
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Cannot sell, you need atleast one business to continue playing game.", 2000);
    }
  },
  SellAllExceptOne: function SellAllExceptOne() {
    if (this.IsSellAllBusiness) {
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var _tempData = _manager.PlayerGameInfo[_playerIndex];

      var _dice = _manager.RollTwoDices();

      var _multiplier = 10000;

      var _result = _dice * _multiplier;

      var _totalBusinesses = 0;
      var _loanAmount = 0;
      var _SelectedBusiness = _tempData.NoOfBusiness[this.BusinessIndex];

      for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
        if (index != this.BusinessIndex) {
          _totalBusinesses++;
          _totalBusinesses = _totalBusinesses + _tempData.NoOfBusiness[index].LocationsName.length;
          if (_tempData.NoOfBusiness[index].LoanTaken) _loanAmount = _tempData.NoOfBusiness[index].LoanAmount;
        }
      }

      _result *= _totalBusinesses;
      _result -= _loanAmount;
      _manager.PlayerGameInfo[_playerIndex].Cash += _result;
      _manager.PlayerGameInfo[_playerIndex].NoOfBusiness = [];
      _manager.PlayerGameInfo[_playerIndex].HomeBasedAmount = 0;
      _manager.PlayerGameInfo[_playerIndex].BrickAndMortarAmount = 0;
      _manager.PlayerGameInfo[_playerIndex].TotalLocationsAmount = 0;
      _manager.PlayerGameInfo[_playerIndex].CardFunctionality.SkipHMNextPayday = false;
      _manager.PlayerGameInfo[_playerIndex].CardFunctionality.SkipBMNextPayday = false;

      if (_SelectedBusiness.BusinessType == 1) {
        _manager.PlayerGameInfo[_playerIndex].HomeBasedAmount += 1;
      } else if (_SelectedBusiness.BusinessType == 2) {
        _manager.PlayerGameInfo[_playerIndex].BrickAndMortarAmount += 1;
        _manager.PlayerGameInfo[_playerIndex].TotalLocationsAmount = _SelectedBusiness.LocationsName.length;
      }

      _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.push(_SelectedBusiness);

      if (_loanAmount != 0) {
        _manager.PlayerGameInfo[_playerIndex].LoanTaken = false;
        _manager.PlayerGameInfo[_playerIndex].LoanAmount = 0;
      }

      var _info = "\n" + "Dice Result: " + _dice + "\n" + "\n" + "Total Amount: " + _dice + " * " + _multiplier + " * " + _totalBusinesses + " - " + _loanAmount + " = " + _result + "\n" + "\n" + "\n" + "You have successfully sold off business/es, amount has been added and your total cash becomes $" + _manager.PlayerGameInfo[_playerIndex].Cash;

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_info, 8000, false);
      setTimeout(function () {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitScreenAlongTurnOver__BusinessGenric();
      }, 8100);
    }
  },
  GetIntoPartnerShip: function GetIntoPartnerShip() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      //real players
      console.log("Sending offer");

      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var _tempData = _manager.PlayerGameInfo[_playerIndex];

      if (_tempData.NoOfBusiness.length > 0) {
        console.log("has some business");
        var _data = {
          Data: {
            Turn: _manager.GetTurnNumber(),
            PlayerData: _tempData,
            SelectedBusinsessIndex: this.BusinessIndex,
            BusValue: this.FinalBusinessValue
          }
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(11, _data);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(true);
      }
    } else {
      console.log("game being played by bot");
    }
  },
  TakeOverBusiness: function TakeOverBusiness() {
    if (this.IsBusinessTakeOver) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
        if (this.BuyHalfBusiness == false) {
          //real players
          console.log("taking over business");
          console.log(this.PlayerData);
          GamePlayReferenceManager.Instance.Get_GameManager().TakeOverBusiness_CardFunctionality(this.PlayerData, this.BusinessIndex, this.SelectedPlayerIndex);
        } else {
          console.log("buying half business");
          console.log(this.PlayerData);

          if (!this.PlayerData.NoOfBusiness[this.BusinessIndex].IsPartnership) {
            GamePlayReferenceManager.Instance.Get_GameManager().BuyHalfBusiness_CardFunctionality(this.PlayerData, this.BusinessIndex, this.SelectedPlayerIndex);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Selected player's Business is in partnership with some other player.");
          }
        }
      } else {
        console.log("game being played by bot");
      }
    }
  },
  DamagingInformationBusiness: function DamagingInformationBusiness() {
    if (this.IsBusinessDamaging) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
        //real players
        console.log(this.PlayerData);

        if (!this.PlayerData.NoOfBusiness[this.BusinessIndex].IsPartnership) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().SelectBusinessForHalfOwnership_DamagingDecision(this.PlayerData, this.BusinessIndex, this.SelectedPlayerIndex);
        } else {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Selected Business is in partnership with some other player.");
        }
      } else {
        console.log("game being played by bot");
      }
    }
  },
  SelectBusinessforPayDay: function SelectBusinessforPayDay() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = _manager.PlayerGameInfo[_playerIndex];

    if (this.BusinessMode == 1) {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreen__SellBusinessUISetup();
      if (_manager.PlayerGameInfo[_playerIndex].IsBot) _manager.ProcessPayDay_TurnDecision(false, true, true, this.BusinessIndex, 1, 0, 0);else _manager.ProcessPayDay_TurnDecision(false, false, true, this.BusinessIndex, 1, 0, 0);
    } else if (this.BusinessMode == 2) {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreen__SellBusinessUISetup();
      var _locations = _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;
      if (_manager.PlayerGameInfo[_playerIndex].IsBot) _manager.ProcessPayDay_TurnDecision(false, true, true, this.BusinessIndex, 0, 1, _locations);else _manager.ProcessPayDay_TurnDecision(false, false, true, this.BusinessIndex, 0, 1, _locations);
    }
  },
  SelectBusinessforDoublePayDay_ThroughoutGame: function SelectBusinessforDoublePayDay_ThroughoutGame() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var _tempData = _manager.PlayerGameInfo[_playerIndex];
      var _receiveDouble = _tempData.NoOfBusiness[this.BusinessIndex].ReceiveDoublePayDay;

      if (!_receiveDouble) {
        if (this.BusinessMode == 1) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitScreen_BusinessPayDayUISetup();
          _tempData.NoOfBusiness[this.BusinessIndex].ReceiveDoublePayDay = true;
          _tempData.ReceiveDoublePayDayAmount++;
        } else if (this.BusinessMode == 2) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitScreen_BusinessPayDayUISetup();
          _tempData.NoOfBusiness[this.BusinessIndex].ReceiveDoublePayDay = true;
          _tempData.ReceiveDoublePayDayAmount++;
        }

        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You will receive double pay day profits against selected business throughout game.", 3200);
        GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Your current slected business already receive double pay day.", 2800);
      }
    } else {
      console.log("its bot");
    }
  }
});

cc._RF.pop();