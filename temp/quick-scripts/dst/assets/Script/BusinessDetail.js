
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/BusinessDetail.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCdXNpbmVzc0RldGFpbC5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJCdXNpbmVzc0RldGFpbCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkJ1c2luZXNzTmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsIkJ1c2luZXNzVHlwZSIsIkJ1c2luZXNzTW9kZUxhYmVsIiwiQnVzaW5lc3NCYWxhbmNlIiwiQnVzaW5lc3NMb2NhdGlvbnMiLCJDYW5TZWxsIiwiQm9vbGVhbiIsIlNlbGxCdXNpbmVzc0J0bk5vZGUiLCJOb2RlIiwiU2VsbExvY2F0aW9uQnRuTm9kZSIsIkJ1c2luZXNzTW9kZSIsIkludGVnZXIiLCJCdXNpbmVzc0luZGV4IiwiQ2FuVW5kZXJnb1BhcnRuZXJzaGlwIiwiUGFydG5lck5hbWVMYWJlbCIsIkJ1c2luZXNzVmFsdWVMYWJlbCIsIlBhcnRuZXJTaGlwQnRuTm9kZSIsIkZpbmFsQnVzaW5lc3NWYWx1ZSIsIlNlbGVjdEJ1c2luZXNzRm9yUGF5RGF5Um9sbCIsIlNlbGVjdEJ1c2luZXNzQnV0dG9uTm9kZSIsIklzQnVzaW5lc3NUYWtlT3ZlciIsIklzQnVzaW5lc3NEYW1hZ2luZyIsIlNlbGVjdGVkUGxheWVySW5kZXgiLCJCdXlIYWxmQnVzaW5lc3MiLCJTZWxsaW5nQW1vdW50IiwiSXNTZWxsQWxsQnVzaW5lc3MiLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiU2V0U2VsZWN0QnVzaW5lc3NGb3JQYXlEYXlSb2xsIiwiX3N0YXRlIiwiU2V0QnVzaW5lc3NNb2RlIiwiX3ZhbCIsIlNldFBsYXllckluZGV4IiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldFNlbGxpbmdBbW91bnQiLCJzZXRIYWxmQnVzaW5lc3MiLCJfc3RhdCIsIlNldE5hbWUiLCJfbmFtZSIsInN0cmluZyIsIlNldFR5cGUiLCJfdHlwZSIsIlNldE1vZGUiLCJfbW9kZSIsIlNldEJhbGFuY2UiLCJfYmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIl9sb2NhdGlvbnMiLCJTZXRQYXJ0bmVyTmFtZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJfdmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJTZXRQbGF5ZXJPYmplY3QiLCJfb2JqIiwiUGxheWVyRGF0YSIsIlRvZ2dsZVNlbGxCdXNpbmVzc0J1dHRvbiIsImdldENvbXBvbmVudCIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsIlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbiIsIlRvZ2dsZVBhcnRuZXJTaGlwQnV0dG9uIiwiU2VsbExvY2F0aW9uIiwiX21hbmFnZXIiLCJJbnN0YW5jZSIsIkdldF9HYW1lTWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkdldFR1cm5OdW1iZXIiLCJfdGVtcERhdGEiLCJQbGF5ZXJHYW1lSW5mbyIsIk5vT2ZCdXNpbmVzcyIsIkxvY2F0aW9uc05hbWUiLCJsZW5ndGgiLCJMb2FuVGFrZW4iLCJwb3AiLCJMb2NhdGlvbkFtb3VudCIsIl9hbW91bnQiLCJMb2FuQW1vdW50IiwiQ2FzaCIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlNob3dUb2FzdCIsInNldFRpbWVvdXQiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZWxsQnVzaW5lc3MiLCJIb21lQmFzZWRBbW91bnQiLCJzcGxpY2UiLCJfbG9hbkFtb3VudCIsIk1vcnRhckFtb3VudCIsIlNlbGxBbGxFeGNlcHRPbmUiLCJfZGljZSIsIlJvbGxUd29EaWNlcyIsIl9tdWx0aXBsaWVyIiwiX3Jlc3VsdCIsIl90b3RhbEJ1c2luZXNzZXMiLCJfU2VsZWN0ZWRCdXNpbmVzcyIsImluZGV4IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiU2tpcEhNTmV4dFBheWRheSIsIlNraXBCTU5leHRQYXlkYXkiLCJwdXNoIiwiX2luZm8iLCJFeGl0U2NyZWVuQWxvbmdUdXJuT3Zlcl9fQnVzaW5lc3NHZW5yaWMiLCJHZXRJbnRvUGFydG5lclNoaXAiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiY29uc29sZSIsImxvZyIsIl9kYXRhIiwiRGF0YSIsIlR1cm4iLCJTZWxlY3RlZEJ1c2luc2Vzc0luZGV4IiwiQnVzVmFsdWUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUYWtlT3ZlckJ1c2luZXNzIiwiVGFrZU92ZXJCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eSIsIklzUGFydG5lcnNoaXAiLCJCdXlIYWxmQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJEYW1hZ2luZ0luZm9ybWF0aW9uQnVzaW5lc3MiLCJTZWxlY3RCdXNpbmVzc0ZvckhhbGZPd25lcnNoaXBfRGFtYWdpbmdEZWNpc2lvbiIsIlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5IiwiRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJJc0JvdCIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiU2VsZWN0QnVzaW5lc3Nmb3JEb3VibGVQYXlEYXlfVGhyb3VnaG91dEdhbWUiLCJfcmVjZWl2ZURvdWJsZSIsIlJlY2VpdmVEb3VibGVQYXlEYXkiLCJFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIlJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnQiLCJjb21wbGV0ZUNhcmRUdXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM1QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURzQjtB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QUE1QixFQUEyQ3FILG1CQUEzQyxHQUFpRSxJQUFqRTtBQUNBOUQsVUFBQUEsU0FBUyxDQUFDZ0UseUJBQVY7QUFDRDs7QUFFRDdJLFFBQUFBLHdCQUF3QixDQUFDeUUsUUFBekIsQ0FBa0NlLHFCQUFsQyxHQUEwREMsU0FBMUQsQ0FBb0Usb0ZBQXBFLEVBQTBKLElBQTFKO0FBQ0F6RixRQUFBQSx3QkFBd0IsQ0FBQ3lFLFFBQXpCLENBQWtDQyxlQUFsQyxHQUFvRG9FLGdCQUFwRDtBQUNELE9BZkQsTUFlTztBQUNMOUksUUFBQUEsd0JBQXdCLENBQUN5RSxRQUF6QixDQUFrQ2UscUJBQWxDLEdBQTBEQyxTQUExRCxDQUFvRSwrREFBcEUsRUFBcUksSUFBckk7QUFDRDtBQUNGLEtBdkJELE1BdUJPO0FBQ0w0QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaO0FBQ0Q7QUFDRjtBQTVrQjJCLENBQVQsQ0FBckIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgQnVzaW5lc3NEZXRhaWwgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc0RldGFpbFwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgQnVzaW5lc3NOYW1lOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJ1c2luZXNzVHlwZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc01vZGVMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc0JhbGFuY2U6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NMb2NhdGlvbnM6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQ2FuU2VsbDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsQnVzaW5lc3NCdG5Ob2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU2VsbExvY2F0aW9uQnRuTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJ1c2luZXNzTW9kZToge1xyXG4gICAgICBkZWZhdWx0OiAtMSxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc0luZGV4OiB7XHJcbiAgICAgIGRlZmF1bHQ6IC0xLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIENhblVuZGVyZ29QYXJ0bmVyc2hpcDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBQYXJ0bmVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJ1c2luZXNzVmFsdWVMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBQYXJ0bmVyU2hpcEJ0bk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBGaW5hbEJ1c2luZXNzVmFsdWU6IHtcclxuICAgICAgZGVmYXVsdDogLTEsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU2VsZWN0QnVzaW5lc3NGb3JQYXlEYXlSb2xsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGVjdEJ1c2luZXNzQnV0dG9uTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIElzQnVzaW5lc3NUYWtlT3Zlcjoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBJc0J1c2luZXNzRGFtYWdpbmc6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU2VsZWN0ZWRQbGF5ZXJJbmRleDoge1xyXG4gICAgICBkZWZhdWx0OiAtMSxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXlIYWxmQnVzaW5lc3M6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU2VsbGluZ0Ftb3VudDoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIElzU2VsbEFsbEJ1c2luZXNzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIFNldFNlbGVjdEJ1c2luZXNzRm9yUGF5RGF5Um9sbChfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NGb3JQYXlEYXlSb2xsID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzTW9kZShfdmFsKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzTW9kZSA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgU2V0UGxheWVySW5kZXgoX3ZhbCkge1xyXG4gICAgdGhpcy5TZWxlY3RlZFBsYXllckluZGV4ID0gX3ZhbDtcclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc0luZGV4KF92YWwpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NJbmRleCA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgU2V0U2VsbGluZ0Ftb3VudChfdmFsKSB7XHJcbiAgICB0aGlzLlNlbGxpbmdBbW91bnQgPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIHNldEhhbGZCdXNpbmVzcyhfc3RhdCkge1xyXG4gICAgdGhpcy5CdXlIYWxmQnVzaW5lc3MgPSBfc3RhdDtcclxuICB9LFxyXG5cclxuICBTZXROYW1lKF9uYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzTmFtZS5zdHJpbmcgPSBfbmFtZTtcclxuICB9LFxyXG5cclxuICBTZXRUeXBlKF90eXBlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzVHlwZS5zdHJpbmcgPSBfdHlwZTtcclxuICB9LFxyXG5cclxuICBTZXRNb2RlKF9tb2RlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzTW9kZUxhYmVsLnN0cmluZyA9IF9tb2RlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJhbGFuY2UoX2JhbGFuY2UpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NCYWxhbmNlLnN0cmluZyA9IF9iYWxhbmNlO1xyXG4gIH0sXHJcblxyXG4gIFNldExvY2F0aW9ucyhfbG9jYXRpb25zKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzTG9jYXRpb25zLnN0cmluZyA9IF9sb2NhdGlvbnM7XHJcbiAgfSxcclxuXHJcbiAgU2V0UGFydG5lck5hbWUoX25hbWUpIHtcclxuICAgIHRoaXMuUGFydG5lck5hbWVMYWJlbC5zdHJpbmcgPSBfbmFtZTtcclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1ZhbHVlKF92YWx1ZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1ZhbHVlTGFiZWwuc3RyaW5nID0gX3ZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIFNldEZpbmFsQnVzaW5lc3NWYWx1ZShfdmFsdWUpIHtcclxuICAgIHRoaXMuRmluYWxCdXNpbmVzc1ZhbHVlID0gX3ZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIFNldFBsYXllck9iamVjdChfb2JqKSB7XHJcbiAgICB0aGlzLlBsYXllckRhdGEgPSBfb2JqO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc0J1dHRvbihfc3RhdGUpIHtcclxuICAgIGlmICh0aGlzLkNhblNlbGwpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NCdG5Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IF9zdGF0ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24oX3N0YXRlKSB7XHJcbiAgICBpZiAodGhpcy5DYW5TZWxsKSB7XHJcbiAgICAgIHRoaXMuU2VsbExvY2F0aW9uQnRuTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBfc3RhdGU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJTaGlwQnRuTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbExvY2F0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDEpIHtcclxuICAgICAgLy9ob21lIGJhc2VkXHJcbiAgICAgIC8vdGhlcmUgaXMgbm90IGdvaW5nIHRvIGJlIGFueSBsb2NhdGlvbiBmb3IgaG9tZSBiYXNlZFxyXG4gICAgfSBlbHNlIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vQnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBoYXMgYW55IGxvY2F0aW9uIGF0IGFsbFxyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvL2lmIHRoZXJlIGlzIHNvbWUgbG9hbiBvbiBzZWxlY3RlZCBidXNpbmVzc1xyXG4gICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUucG9wKCk7XHJcblxyXG4gICAgICAgICAgdmFyIExvY2F0aW9uQW1vdW50O1xyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsbGluZ0Ftb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIExvY2F0aW9uQW1vdW50ID0gNzUwMDA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMb2NhdGlvbkFtb3VudCA9IHRoaXMuU2VsbGluZ0Ftb3VudDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgX2Ftb3VudCA9IExvY2F0aW9uQW1vdW50IC0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ7XHJcblxyXG4gICAgICAgICAgaWYgKF9hbW91bnQgPCAwKSBfYW1vdW50ID0gMDtcclxuXHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgX3RlbXBEYXRhLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBvbmUgb2YgeW91ciBsb2NhdGlvbiwgJFwiICsgX2Ftb3VudCArIFwiIGFkZGVkIHRvIHlvdXIgY2FzaCBhZnRlciBwYXlpbmcgbG9hblwiLCAyMDAwKTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxsaW5nQW1vdW50ID09IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgICB9LCAyMDUwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUucG9wKCk7XHJcbiAgICAgICAgICB2YXIgTG9jYXRpb25BbW91bnQ7XHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxsaW5nQW1vdW50ID09IDApIHtcclxuICAgICAgICAgICAgTG9jYXRpb25BbW91bnQgPSA3NTAwMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvY2F0aW9uQW1vdW50ID0gdGhpcy5TZWxsaW5nQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgX3RlbXBEYXRhLkNhc2ggKz0gTG9jYXRpb25BbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgb25lIG9mIHlvdXIgbG9jYXRpb24sICRcIiArIExvY2F0aW9uQW1vdW50ICsgXCIgYWRkZWQgdG8geW91ciBjYXNoXCIsIDIwMDApO1xyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsbGluZ0Ftb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy9ob21lIGJhc2VkXHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vaWYgdGhlcmUgaXMgc29tZSBsb2FuIG9uIHNlbGVjdGVkIGJ1c2luZXNzXHJcblxyXG4gICAgICAgICAgdmFyIEhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgIGlmICh0aGlzLlNlbGxpbmdBbW91bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBIb21lQmFzZWRBbW91bnQgPSAxMDAwMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEhvbWVCYXNlZEFtb3VudCA9IHRoaXMuU2VsbGluZ0Ftb3VudDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLnNwbGljZSh0aGlzLkJ1c2luZXNzSW5kZXgsIDEpO1xyXG4gICAgICAgICAgdmFyIF9hbW91bnQgPSBIb21lQmFzZWRBbW91bnQgLSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICB2YXIgX2xvYW5BbW91bnQgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIEhvbWVCYXNlZEFtb3VudDtcclxuXHJcbiAgICAgICAgICBpZiAoX2xvYW5BbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgICAvL21lYW5zIHBheWVkIGFsbCBsb2FuXHJcbiAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLT0gSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChfYW1vdW50IDw9IDApIF9hbW91bnQgPSAwO1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgeW91ciBidXNpbmVzcywgJFwiICsgX2Ftb3VudCArIFwiIGFkZGVkIHRvIHlvdXIgY2FzaCBhZnRlciBwYXlpbmcgbG9hblwiLCAyMDAwKTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxsaW5nQW1vdW50ID09IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgICB9LCAyMDUwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIEhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgIGlmICh0aGlzLlNlbGxpbmdBbW91bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBIb21lQmFzZWRBbW91bnQgPSAxMDAwMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEhvbWVCYXNlZEFtb3VudCA9IHRoaXMuU2VsbGluZ0Ftb3VudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3Muc3BsaWNlKHRoaXMuQnVzaW5lc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICBfdGVtcERhdGEuQ2FzaCArPSBIb21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgeW91ciBidXNpbmVzcywgJFwiICsgSG9tZUJhc2VkQW1vdW50ICsgXCIgYWRkZWQgdG8geW91ciBjYXNoXCIsIDIwMDApO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGxpbmdBbW91bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vaWYgdGhlcmUgaXMgc29tZSBsb2FuIG9uIHNlbGVjdGVkIGJ1c2luZXNzXHJcblxyXG4gICAgICAgICAgdmFyIE1vcnRhckFtb3VudDtcclxuICAgICAgICAgIGlmICh0aGlzLlNlbGxpbmdBbW91bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBNb3J0YXJBbW91bnQgPSA3NTAwMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE1vcnRhckFtb3VudCA9IHRoaXMuU2VsbGluZ0Ftb3VudDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICBpZiAoX2xvY2F0aW9ucyA+IDApXHJcbiAgICAgICAgICAgIC8vaWYgYnVzaW5lc3MgaGF2ZSBsb2NhdGlvbiBtdWxpcGx5ZSBlYWNoIGxvY2F0aW9uIHdpdGggYW1vdW50XHJcbiAgICAgICAgICAgIE1vcnRhckFtb3VudCArPSBfbG9jYXRpb25zICogTW9ydGFyQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBfYW1vdW50ID0gTW9ydGFyQW1vdW50IC0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICB2YXIgX2xvYW5BbW91bnQgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIE1vcnRhckFtb3VudDtcclxuXHJcbiAgICAgICAgICBpZiAoX2xvYW5BbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgICAvL21lYW5zIHBheWVkIGFsbCBsb2FuXHJcbiAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLT0gSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChfYW1vdW50IDw9IDApIF9hbW91bnQgPSAwO1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLnNwbGljZSh0aGlzLkJ1c2luZXNzSW5kZXgsIDEpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIHlvdXIgYnVzaW5lc3MgYWxvbmcgd2l0aCBhbnkgbG9jYXRpb25zLCAkXCIgKyBfYW1vdW50ICsgXCIgYWRkZWQgdG8geW91ciBjYXNoIGFmdGVyIHBheWluZyBsb2FuXCIsIDIwMDApO1xyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsbGluZ0Ftb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxsaW5nQW1vdW50ID09IDApIHtcclxuICAgICAgICAgICAgTW9ydGFyQW1vdW50ID0gNzUwMDA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBNb3J0YXJBbW91bnQgPSB0aGlzLlNlbGxpbmdBbW91bnQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgaWYgKF9sb2NhdGlvbnMgPiAwKVxyXG4gICAgICAgICAgICAvL2lmIGJ1c2luZXNzIGhhdmUgbG9jYXRpb24gbXVsaXBseWUgZWFjaCBsb2NhdGlvbiB3aXRoIGFtb3VudFxyXG4gICAgICAgICAgICBNb3J0YXJBbW91bnQgKz0gX2xvY2F0aW9ucyAqIE1vcnRhckFtb3VudDtcclxuXHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLnNwbGljZSh0aGlzLkJ1c2luZXNzSW5kZXgsIDEpO1xyXG4gICAgICAgICAgX3RlbXBEYXRhLkNhc2ggKz0gTW9ydGFyQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIHlvdXIgYnVzaW5lc3MsICRcIiArIE1vcnRhckFtb3VudCArIFwiIGFkZGVkIHRvIHlvdXIgY2FzaFwiLCAyMDAwKTtcclxuICAgICAgICAgIGlmICh0aGlzLlNlbGxpbmdBbW91bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIkNhbm5vdCBzZWxsLCB5b3UgbmVlZCBhdGxlYXN0IG9uZSBidXNpbmVzcyB0byBjb250aW51ZSBwbGF5aW5nIGdhbWUuXCIsIDIwMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgXHJcbiAgU2VsbEFsbEV4Y2VwdE9uZSgpIHtcclxuICBpZih0aGlzLklzU2VsbEFsbEJ1c2luZXNzKVxyXG4gIHtcclxuICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICAgICAgdmFyIF9kaWNlPV9tYW5hZ2VyLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIHZhciBfbXVsdGlwbGllcj0xMDAwMDtcclxuICAgICAgICB2YXIgX3Jlc3VsdD1fZGljZSpfbXVsdGlwbGllcjtcclxuICAgICAgICB2YXIgX3RvdGFsQnVzaW5lc3Nlcz0wO1xyXG4gICAgICAgIHZhciBfbG9hbkFtb3VudD0wO1xyXG5cclxuICAgICAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3M9X3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmKGluZGV4IT10aGlzLkJ1c2luZXNzSW5kZXgpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIF90b3RhbEJ1c2luZXNzZXMrKztcclxuICAgICAgICAgICAgX3RvdGFsQnVzaW5lc3Nlcz1fdG90YWxCdXNpbmVzc2VzK190ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgIF9sb2FuQW1vdW50PV90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgX3Jlc3VsdCo9X3RvdGFsQnVzaW5lc3NlcztcclxuICAgICAgICBfcmVzdWx0LT1fbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKz1fcmVzdWx0O1xyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzPVtdO1xyXG5cclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudD0wO1xyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ9MDtcclxuICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50PTA7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5PWZhbHNlO1xyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheT1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYoX1NlbGVjdGVkQnVzaW5lc3MuQnVzaW5lc3NUeXBlPT0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50Kz0xO1xyXG4gICAgICAgIH1lbHNlIGlmKF9TZWxlY3RlZEJ1c2luZXNzLkJ1c2luZXNzVHlwZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50Kz0xO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudD1fU2VsZWN0ZWRCdXNpbmVzcy5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MucHVzaChfU2VsZWN0ZWRCdXNpbmVzcyk7XHJcblxyXG4gICAgICAgIGlmKF9sb2FuQW1vdW50IT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgX2luZm89XCJcXG5cIitcIkRpY2UgUmVzdWx0OiBcIitfZGljZStcIlxcblwiK1wiXFxuXCIrXCJUb3RhbCBBbW91bnQ6IFwiK19kaWNlK1wiICogXCIrX211bHRpcGxpZXIrXCIgKiBcIitfdG90YWxCdXNpbmVzc2VzK1wiIC0gXCIrX2xvYW5BbW91bnQrXCIgPSBcIitfcmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1wiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgb2ZmIGJ1c2luZXNzL2VzLCBhbW91bnQgaGFzIGJlZW4gYWRkZWQgYW5kIHlvdXIgdG90YWwgY2FzaCBiZWNvbWVzICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX2luZm8sODAwMCxmYWxzZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNjcmVlbkFsb25nVHVybk92ZXJfX0J1c2luZXNzR2VucmljKCk7XHJcbiAgICAgICAgfSwgODEwMCk7ICBcclxuICB9XHJcbn0sXHJcblxyXG4gIEdldEludG9QYXJ0bmVyU2hpcCgpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpIHtcclxuICAgICAgLy9yZWFsIHBsYXllcnNcclxuICAgICAgY29uc29sZS5sb2coXCJTZW5kaW5nIG9mZmVyXCIpO1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFzIHNvbWUgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IFR1cm46IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKSwgUGxheWVyRGF0YTogX3RlbXBEYXRhLCBTZWxlY3RlZEJ1c2luc2Vzc0luZGV4OiB0aGlzLkJ1c2luZXNzSW5kZXgsIEJ1c1ZhbHVlOiB0aGlzLkZpbmFsQnVzaW5lc3NWYWx1ZSB9IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMSwgX2RhdGEpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBiZWluZyBwbGF5ZWQgYnkgYm90XCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRha2VPdmVyQnVzaW5lc3MoKSB7XHJcbiAgICBpZiAodGhpcy5Jc0J1c2luZXNzVGFrZU92ZXIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCkgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLkJ1eUhhbGZCdXNpbmVzcyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgLy9yZWFsIHBsYXllcnNcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFraW5nIG92ZXIgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckRhdGEpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRha2VPdmVyQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5QbGF5ZXJEYXRhLCB0aGlzLkJ1c2luZXNzSW5kZXgsIHRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnV5aW5nIGhhbGYgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckRhdGEpO1xyXG5cclxuICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXApIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJ1eUhhbGZCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eSh0aGlzLlBsYXllckRhdGEsIHRoaXMuQnVzaW5lc3NJbmRleCwgdGhpcy5TZWxlY3RlZFBsYXllckluZGV4KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTZWxlY3RlZCBwbGF5ZXIncyBCdXNpbmVzcyBpcyBpbiBwYXJ0bmVyc2hpcCB3aXRoIHNvbWUgb3RoZXIgcGxheWVyLlwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIGJlaW5nIHBsYXllZCBieSBib3RcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBEYW1hZ2luZ0luZm9ybWF0aW9uQnVzaW5lc3MoKSB7XHJcbiAgICBpZiAodGhpcy5Jc0J1c2luZXNzRGFtYWdpbmcpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCkgPT0gMikge1xyXG4gICAgICAgIC8vcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJEYXRhKTtcclxuICAgICAgICBpZiAoIXRoaXMuUGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2VsZWN0QnVzaW5lc3NGb3JIYWxmT3duZXJzaGlwX0RhbWFnaW5nRGVjaXNpb24odGhpcy5QbGF5ZXJEYXRhLCB0aGlzLkJ1c2luZXNzSW5kZXgsIHRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTZWxlY3RlZCBCdXNpbmVzcyBpcyBpbiBwYXJ0bmVyc2hpcCB3aXRoIHNvbWUgb3RoZXIgcGxheWVyLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIGJlaW5nIHBsYXllZCBieSBib3RcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RCdXNpbmVzc2ZvclBheURheSgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc01vZGUgPT0gMSkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuXHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLklzQm90KSBfbWFuYWdlci5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdGhpcy5CdXNpbmVzc0luZGV4LCAxLCAwLCAwKTtcclxuICAgICAgZWxzZSBfbWFuYWdlci5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgZmFsc2UsIHRydWUsIHRoaXMuQnVzaW5lc3NJbmRleCwgMSwgMCwgMCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDIpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcblxyXG4gICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNCb3QpIF9tYW5hZ2VyLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLCB0cnVlLCB0cnVlLCB0aGlzLkJ1c2luZXNzSW5kZXgsIDAsIDEsIF9sb2NhdGlvbnMpO1xyXG4gICAgICBlbHNlIF9tYW5hZ2VyLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdGhpcy5CdXNpbmVzc0luZGV4LCAwLCAxLCBfbG9jYXRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RCdXNpbmVzc2ZvckRvdWJsZVBheURheV9UaHJvdWdob3V0R2FtZSgpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcbiAgICAgIHZhciBfcmVjZWl2ZURvdWJsZSA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5O1xyXG4gICAgICBpZiAoIV9yZWNlaXZlRG91YmxlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDEpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgIF90ZW1wRGF0YS5SZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50Kys7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuXHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uUmVjZWl2ZURvdWJsZVBheURheSA9IHRydWU7XHJcbiAgICAgICAgICBfdGVtcERhdGEuUmVjZWl2ZURvdWJsZVBheURheUFtb3VudCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHBheSBkYXkgcHJvZml0cyBhZ2FpbnN0IHNlbGVjdGVkIGJ1c2luZXNzIHRocm91Z2hvdXQgZ2FtZS5cIiwgMzIwMCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91ciBjdXJyZW50IHNsZWN0ZWQgYnVzaW5lc3MgYWxyZWFkeSByZWNlaXZlIGRvdWJsZSBwYXkgZGF5LlwiLCAyODAwKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpdHMgYm90XCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG4iXX0=