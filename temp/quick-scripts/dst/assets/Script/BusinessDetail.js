
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCdXNpbmVzc0RldGFpbC5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJCdXNpbmVzc0RldGFpbCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkJ1c2luZXNzTmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsIkJ1c2luZXNzVHlwZSIsIkJ1c2luZXNzTW9kZUxhYmVsIiwiQnVzaW5lc3NCYWxhbmNlIiwiQnVzaW5lc3NMb2NhdGlvbnMiLCJDYW5TZWxsIiwiQm9vbGVhbiIsIlNlbGxCdXNpbmVzc0J0bk5vZGUiLCJOb2RlIiwiU2VsbExvY2F0aW9uQnRuTm9kZSIsIkJ1c2luZXNzTW9kZSIsIkludGVnZXIiLCJCdXNpbmVzc0luZGV4IiwiQ2FuVW5kZXJnb1BhcnRuZXJzaGlwIiwiUGFydG5lck5hbWVMYWJlbCIsIkJ1c2luZXNzVmFsdWVMYWJlbCIsIlBhcnRuZXJTaGlwQnRuTm9kZSIsIkZpbmFsQnVzaW5lc3NWYWx1ZSIsIlNlbGVjdEJ1c2luZXNzRm9yUGF5RGF5Um9sbCIsIlNlbGVjdEJ1c2luZXNzQnV0dG9uTm9kZSIsIklzQnVzaW5lc3NUYWtlT3ZlciIsIklzQnVzaW5lc3NEYW1hZ2luZyIsIlNlbGVjdGVkUGxheWVySW5kZXgiLCJCdXlIYWxmQnVzaW5lc3MiLCJTZWxsaW5nQW1vdW50IiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIlNldFNlbGVjdEJ1c2luZXNzRm9yUGF5RGF5Um9sbCIsIl9zdGF0ZSIsIlNldEJ1c2luZXNzTW9kZSIsIl92YWwiLCJTZXRQbGF5ZXJJbmRleCIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRTZWxsaW5nQW1vdW50Iiwic2V0SGFsZkJ1c2luZXNzIiwiX3N0YXQiLCJTZXROYW1lIiwiX25hbWUiLCJzdHJpbmciLCJTZXRUeXBlIiwiX3R5cGUiLCJTZXRNb2RlIiwiX21vZGUiLCJTZXRCYWxhbmNlIiwiX2JhbGFuY2UiLCJTZXRMb2NhdGlvbnMiLCJfbG9jYXRpb25zIiwiU2V0UGFydG5lck5hbWUiLCJTZXRCdXNpbmVzc1ZhbHVlIiwiX3ZhbHVlIiwiU2V0RmluYWxCdXNpbmVzc1ZhbHVlIiwiU2V0UGxheWVyT2JqZWN0IiwiX29iaiIsIlBsYXllckRhdGEiLCJUb2dnbGVTZWxsQnVzaW5lc3NCdXR0b24iLCJnZXRDb21wb25lbnQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbiIsIlNlbGxMb2NhdGlvbiIsIl9tYW5hZ2VyIiwiSW5zdGFuY2UiLCJHZXRfR2FtZU1hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiX3RlbXBEYXRhIiwiUGxheWVyR2FtZUluZm8iLCJOb09mQnVzaW5lc3MiLCJMb2NhdGlvbnNOYW1lIiwibGVuZ3RoIiwiTG9hblRha2VuIiwicG9wIiwiTG9jYXRpb25BbW91bnQiLCJfYW1vdW50IiwiTG9hbkFtb3VudCIsIkNhc2giLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJzZXRUaW1lb3V0IiwiU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiU2VsbEJ1c2luZXNzIiwiSG9tZUJhc2VkQW1vdW50Iiwic3BsaWNlIiwiX2xvYW5BbW91bnQiLCJNb3J0YXJBbW91bnQiLCJHZXRJbnRvUGFydG5lclNoaXAiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiY29uc29sZSIsImxvZyIsIl9kYXRhIiwiRGF0YSIsIlR1cm4iLCJTZWxlY3RlZEJ1c2luc2Vzc0luZGV4IiwiQnVzVmFsdWUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJUYWtlT3ZlckJ1c2luZXNzIiwiVGFrZU92ZXJCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eSIsIklzUGFydG5lcnNoaXAiLCJCdXlIYWxmQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJEYW1hZ2luZ0luZm9ybWF0aW9uQnVzaW5lc3MiLCJTZWxlY3RCdXNpbmVzc0ZvckhhbGZPd25lcnNoaXBfRGFtYWdpbmdEZWNpc2lvbiIsIlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5IiwiRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJJc0JvdCIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiU2VsZWN0QnVzaW5lc3Nmb3JEb3VibGVQYXlEYXlfVGhyb3VnaG91dEdhbWUiLCJfcmVjZWl2ZURvdWJsZSIsIlJlY2VpdmVEb3VibGVQYXlEYXkiLCJFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIlJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnQiLCJjb21wbGV0ZUNhcmRUdXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM1QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURzQjtBQUU1QixhQUFTRixFQUFFLENBQUNHLFNBRmdCO0FBSTVCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVaQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGRztBQUdaQyxNQUFBQSxZQUFZLEVBQUU7QUFIRixLQURKO0FBT1ZDLElBQUFBLFlBQVksRUFBRTtBQUNaLGlCQUFTLElBREc7QUFFWkgsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBRkc7QUFHWkMsTUFBQUEsWUFBWSxFQUFFO0FBSEYsS0FQSjtBQWFWRSxJQUFBQSxpQkFBaUIsRUFBRTtB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cEUsRUFBcUksSUFBckk7QUFDRDtBQUNGLEtBdkJELE1BdUJPO0FBQ0xZLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVo7QUFDRDtBQUNGO0FBcGdCMkIsQ0FBVCxDQUFyQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBCdXNpbmVzc0RldGFpbCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1c2luZXNzRGV0YWlsXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBCdXNpbmVzc05hbWU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NUeXBlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJ1c2luZXNzTW9kZUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJ1c2luZXNzQmFsYW5jZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc0xvY2F0aW9uczoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBDYW5TZWxsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGxCdXNpbmVzc0J0bk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsTG9jYXRpb25CdG5Ob2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NNb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IC0xLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJ1c2luZXNzSW5kZXg6IHtcclxuICAgICAgZGVmYXVsdDogLTEsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQ2FuVW5kZXJnb1BhcnRuZXJzaGlwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFBhcnRuZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFBhcnRuZXJTaGlwQnRuTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEZpbmFsQnVzaW5lc3NWYWx1ZToge1xyXG4gICAgICBkZWZhdWx0OiAtMSxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxlY3RCdXNpbmVzc0ZvclBheURheVJvbGw6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU2VsZWN0QnVzaW5lc3NCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgSXNCdXNpbmVzc1Rha2VPdmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIElzQnVzaW5lc3NEYW1hZ2luZzoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxlY3RlZFBsYXllckluZGV4OiB7XHJcbiAgICAgIGRlZmF1bHQ6IC0xLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJ1eUhhbGZCdXNpbmVzczoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsaW5nQW1vdW50OiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgU2V0U2VsZWN0QnVzaW5lc3NGb3JQYXlEYXlSb2xsKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxlY3RCdXNpbmVzc0ZvclBheURheVJvbGwgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NNb2RlKF92YWwpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NNb2RlID0gX3ZhbDtcclxuICB9LFxyXG5cclxuICBTZXRQbGF5ZXJJbmRleChfdmFsKSB7XHJcbiAgICB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXggPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzSW5kZXgoX3ZhbCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc0luZGV4ID0gX3ZhbDtcclxuICB9LFxyXG5cclxuICBTZXRTZWxsaW5nQW1vdW50KF92YWwpIHtcclxuICAgIHRoaXMuU2VsbGluZ0Ftb3VudCA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgc2V0SGFsZkJ1c2luZXNzKF9zdGF0KSB7XHJcbiAgICB0aGlzLkJ1eUhhbGZCdXNpbmVzcyA9IF9zdGF0O1xyXG4gIH0sXHJcblxyXG4gIFNldE5hbWUoX25hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NOYW1lLnN0cmluZyA9IF9uYW1lO1xyXG4gIH0sXHJcblxyXG4gIFNldFR5cGUoX3R5cGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NUeXBlLnN0cmluZyA9IF90eXBlO1xyXG4gIH0sXHJcblxyXG4gIFNldE1vZGUoX21vZGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NNb2RlTGFiZWwuc3RyaW5nID0gX21vZGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QmFsYW5jZShfYmFsYW5jZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc0JhbGFuY2Uuc3RyaW5nID0gX2JhbGFuY2U7XHJcbiAgfSxcclxuXHJcbiAgU2V0TG9jYXRpb25zKF9sb2NhdGlvbnMpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NMb2NhdGlvbnMuc3RyaW5nID0gX2xvY2F0aW9ucztcclxuICB9LFxyXG5cclxuICBTZXRQYXJ0bmVyTmFtZShfbmFtZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyTmFtZUxhYmVsLnN0cmluZyA9IF9uYW1lO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVmFsdWUoX3ZhbHVlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzVmFsdWVMYWJlbC5zdHJpbmcgPSBfdmFsdWU7XHJcbiAgfSxcclxuXHJcbiAgU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF92YWx1ZSkge1xyXG4gICAgdGhpcy5GaW5hbEJ1c2luZXNzVmFsdWUgPSBfdmFsdWU7XHJcbiAgfSxcclxuXHJcbiAgU2V0UGxheWVyT2JqZWN0KF9vYmopIHtcclxuICAgIHRoaXMuUGxheWVyRGF0YSA9IF9vYmo7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2VsbEJ1c2luZXNzQnV0dG9uKF9zdGF0ZSkge1xyXG4gICAgaWYgKHRoaXMuQ2FuU2VsbCkge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc0J0bk5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gX3N0YXRlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihfc3RhdGUpIHtcclxuICAgIGlmICh0aGlzLkNhblNlbGwpIHtcclxuICAgICAgdGhpcy5TZWxsTG9jYXRpb25CdG5Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IF9zdGF0ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbihfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lclNoaXBCdG5Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZWxsTG9jYXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc01vZGUgPT0gMSkge1xyXG4gICAgICAvL2hvbWUgYmFzZWRcclxuICAgICAgLy90aGVyZSBpcyBub3QgZ29pbmcgdG8gYmUgYW55IGxvY2F0aW9uIGZvciBob21lIGJhc2VkXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDIpIHtcclxuICAgICAgLy9CcmljayBhbmQgbW9ydGFyXHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGhhcyBhbnkgbG9jYXRpb24gYXQgYWxsXHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vaWYgdGhlcmUgaXMgc29tZSBsb2FuIG9uIHNlbGVjdGVkIGJ1c2luZXNzXHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5wb3AoKTtcclxuXHJcbiAgICAgICAgICB2YXIgTG9jYXRpb25BbW91bnQ7XHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxsaW5nQW1vdW50ID09IDApIHtcclxuICAgICAgICAgICAgTG9jYXRpb25BbW91bnQgPSA3NTAwMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvY2F0aW9uQW1vdW50ID0gdGhpcy5TZWxsaW5nQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBfYW1vdW50ID0gTG9jYXRpb25BbW91bnQgLSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICBpZiAoX2Ftb3VudCA8IDApIF9hbW91bnQgPSAwO1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICBfdGVtcERhdGEuQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIG9uZSBvZiB5b3VyIGxvY2F0aW9uLCAkXCIgKyBfYW1vdW50ICsgXCIgYWRkZWQgdG8geW91ciBjYXNoIGFmdGVyIHBheWluZyBsb2FuXCIsIDIwMDApO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGxpbmdBbW91bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5wb3AoKTtcclxuICAgICAgICAgIHZhciBMb2NhdGlvbkFtb3VudDtcclxuICAgICAgICAgIGlmICh0aGlzLlNlbGxpbmdBbW91bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBMb2NhdGlvbkFtb3VudCA9IDc1MDAwO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTG9jYXRpb25BbW91bnQgPSB0aGlzLlNlbGxpbmdBbW91bnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBfdGVtcERhdGEuQ2FzaCArPSBMb2NhdGlvbkFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBvbmUgb2YgeW91ciBsb2NhdGlvbiwgJFwiICsgTG9jYXRpb25BbW91bnQgKyBcIiBhZGRlZCB0byB5b3VyIGNhc2hcIiwgMjAwMCk7XHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxsaW5nQW1vdW50ID09IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgICB9LCAyMDUwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxsQnVzaW5lc3MoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDEpIHtcclxuICAgICAgICAvL2hvbWUgYmFzZWRcclxuICAgICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgLy9pZiB0aGVyZSBpcyBzb21lIGxvYW4gb24gc2VsZWN0ZWQgYnVzaW5lc3NcclxuXHJcbiAgICAgICAgICB2YXIgSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsbGluZ0Ftb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEhvbWVCYXNlZEFtb3VudCA9IDEwMDAwO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgSG9tZUJhc2VkQW1vdW50ID0gdGhpcy5TZWxsaW5nQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3Muc3BsaWNlKHRoaXMuQnVzaW5lc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICB2YXIgX2Ftb3VudCA9IEhvbWVCYXNlZEFtb3VudCAtIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBfbG9hbkFtb3VudCA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IC0gSG9tZUJhc2VkQW1vdW50O1xyXG5cclxuICAgICAgICAgIGlmIChfbG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIC8vbWVhbnMgcGF5ZWQgYWxsIGxvYW5cclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtPSBIb21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKF9hbW91bnQgPD0gMCkgX2Ftb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgX3RlbXBEYXRhLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCB5b3VyIGJ1c2luZXNzLCAkXCIgKyBfYW1vdW50ICsgXCIgYWRkZWQgdG8geW91ciBjYXNoIGFmdGVyIHBheWluZyBsb2FuXCIsIDIwMDApO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGxpbmdBbW91bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsbGluZ0Ftb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEhvbWVCYXNlZEFtb3VudCA9IDEwMDAwO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgSG9tZUJhc2VkQW1vdW50ID0gdGhpcy5TZWxsaW5nQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5zcGxpY2UodGhpcy5CdXNpbmVzc0luZGV4LCAxKTtcclxuICAgICAgICAgIF90ZW1wRGF0YS5DYXNoICs9IEhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCB5b3VyIGJ1c2luZXNzLCAkXCIgKyBIb21lQmFzZWRBbW91bnQgKyBcIiBhZGRlZCB0byB5b3VyIGNhc2hcIiwgMjAwMCk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsbGluZ0Ftb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDIpIHtcclxuICAgICAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgLy9pZiB0aGVyZSBpcyBzb21lIGxvYW4gb24gc2VsZWN0ZWQgYnVzaW5lc3NcclxuXHJcbiAgICAgICAgICB2YXIgTW9ydGFyQW1vdW50O1xyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsbGluZ0Ftb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIE1vcnRhckFtb3VudCA9IDc1MDAwO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTW9ydGFyQW1vdW50ID0gdGhpcy5TZWxsaW5nQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBfbG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgICAgIGlmIChfbG9jYXRpb25zID4gMClcclxuICAgICAgICAgICAgLy9pZiBidXNpbmVzcyBoYXZlIGxvY2F0aW9uIG11bGlwbHllIGVhY2ggbG9jYXRpb24gd2l0aCBhbW91bnRcclxuICAgICAgICAgICAgTW9ydGFyQW1vdW50ICs9IF9sb2NhdGlvbnMgKiBNb3J0YXJBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIF9hbW91bnQgPSBNb3J0YXJBbW91bnQgLSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgIHZhciBfbG9hbkFtb3VudCA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IC0gTW9ydGFyQW1vdW50O1xyXG5cclxuICAgICAgICAgIGlmIChfbG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIC8vbWVhbnMgcGF5ZWQgYWxsIGxvYW5cclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtPSBIb21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKF9hbW91bnQgPD0gMCkgX2Ftb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgX3RlbXBEYXRhLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3Muc3BsaWNlKHRoaXMuQnVzaW5lc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgeW91ciBidXNpbmVzcyBhbG9uZyB3aXRoIGFueSBsb2NhdGlvbnMsICRcIiArIF9hbW91bnQgKyBcIiBhZGRlZCB0byB5b3VyIGNhc2ggYWZ0ZXIgcGF5aW5nIGxvYW5cIiwgMjAwMCk7XHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxsaW5nQW1vdW50ID09IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgICB9LCAyMDUwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIE1vcnRhckFtb3VudDtcclxuICAgICAgICAgIGlmICh0aGlzLlNlbGxpbmdBbW91bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBNb3J0YXJBbW91bnQgPSA3NTAwMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE1vcnRhckFtb3VudCA9IHRoaXMuU2VsbGluZ0Ftb3VudDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICBpZiAoX2xvY2F0aW9ucyA+IDApXHJcbiAgICAgICAgICAgIC8vaWYgYnVzaW5lc3MgaGF2ZSBsb2NhdGlvbiBtdWxpcGx5ZSBlYWNoIGxvY2F0aW9uIHdpdGggYW1vdW50XHJcbiAgICAgICAgICAgIE1vcnRhckFtb3VudCArPSBfbG9jYXRpb25zICogTW9ydGFyQW1vdW50O1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3Muc3BsaWNlKHRoaXMuQnVzaW5lc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICBfdGVtcERhdGEuQ2FzaCArPSBNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgeW91ciBidXNpbmVzcywgJFwiICsgTW9ydGFyQW1vdW50ICsgXCIgYWRkZWQgdG8geW91ciBjYXNoXCIsIDIwMDApO1xyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsbGluZ0Ftb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiQ2Fubm90IHNlbGwsIHlvdSBuZWVkIGF0bGVhc3Qgb25lIGJ1c2luZXNzIHRvIGNvbnRpbnVlIHBsYXlpbmcgZ2FtZS5cIiwgMjAwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2V0SW50b1BhcnRuZXJTaGlwKCkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCkgPT0gMikge1xyXG4gICAgICAvL3JlYWwgcGxheWVyc1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgb2ZmZXJcIik7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoYXMgc29tZSBidXNpbmVzc1wiKTtcclxuICAgICAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgVHVybjogX21hbmFnZXIuR2V0VHVybk51bWJlcigpLCBQbGF5ZXJEYXRhOiBfdGVtcERhdGEsIFNlbGVjdGVkQnVzaW5zZXNzSW5kZXg6IHRoaXMuQnVzaW5lc3NJbmRleCwgQnVzVmFsdWU6IHRoaXMuRmluYWxCdXNpbmVzc1ZhbHVlIH0gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDExLCBfZGF0YSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJnYW1lIGJlaW5nIHBsYXllZCBieSBib3RcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBUYWtlT3ZlckJ1c2luZXNzKCkge1xyXG4gICAgaWYgKHRoaXMuSXNCdXNpbmVzc1Rha2VPdmVyKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5CdXlIYWxmQnVzaW5lc3MgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIC8vcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2luZyBvdmVyIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJEYXRhKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5UYWtlT3ZlckJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuUGxheWVyRGF0YSwgdGhpcy5CdXNpbmVzc0luZGV4LCB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImJ1eWluZyBoYWxmIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJEYXRhKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5CdXlIYWxmQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5QbGF5ZXJEYXRhLCB0aGlzLkJ1c2luZXNzSW5kZXgsIHRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2VsZWN0ZWQgcGxheWVyJ3MgQnVzaW5lc3MgaXMgaW4gcGFydG5lcnNoaXAgd2l0aCBzb21lIG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBiZWluZyBwbGF5ZWQgYnkgYm90XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRGFtYWdpbmdJbmZvcm1hdGlvbkJ1c2luZXNzKCkge1xyXG4gICAgaWYgKHRoaXMuSXNCdXNpbmVzc0RhbWFnaW5nKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpIHtcclxuICAgICAgICAvL3JlYWwgcGxheWVyc1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyRGF0YSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLlBsYXllckRhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNlbGVjdEJ1c2luZXNzRm9ySGFsZk93bmVyc2hpcF9EYW1hZ2luZ0RlY2lzaW9uKHRoaXMuUGxheWVyRGF0YSwgdGhpcy5CdXNpbmVzc0luZGV4LCB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2VsZWN0ZWQgQnVzaW5lc3MgaXMgaW4gcGFydG5lcnNoaXAgd2l0aCBzb21lIG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBiZWluZyBwbGF5ZWQgYnkgYm90XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VsZWN0QnVzaW5lc3Nmb3JQYXlEYXkoKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDEpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcblxyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Jc0JvdCkgX21hbmFnZXIuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsIHRydWUsIHRydWUsIHRoaXMuQnVzaW5lc3NJbmRleCwgMSwgMCwgMCk7XHJcbiAgICAgIGVsc2UgX21hbmFnZXIuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLkJ1c2luZXNzSW5kZXgsIDEsIDAsIDApO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAyKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG5cclxuICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLklzQm90KSBfbWFuYWdlci5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdGhpcy5CdXNpbmVzc0luZGV4LCAwLCAxLCBfbG9jYXRpb25zKTtcclxuICAgICAgZWxzZSBfbWFuYWdlci5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgZmFsc2UsIHRydWUsIHRoaXMuQnVzaW5lc3NJbmRleCwgMCwgMSwgX2xvY2F0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VsZWN0QnVzaW5lc3Nmb3JEb3VibGVQYXlEYXlfVGhyb3VnaG91dEdhbWUoKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKSA9PSAyKSB7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgICB2YXIgX3JlY2VpdmVEb3VibGUgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uUmVjZWl2ZURvdWJsZVBheURheTtcclxuICAgICAgaWYgKCFfcmVjZWl2ZURvdWJsZSkge1xyXG4gICAgICAgIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNjcmVlbl9CdXNpbmVzc1BheURheVVJU2V0dXAoKTtcclxuXHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uUmVjZWl2ZURvdWJsZVBheURheSA9IHRydWU7XHJcbiAgICAgICAgICBfdGVtcERhdGEuUmVjZWl2ZURvdWJsZVBheURheUFtb3VudCsrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5CdXNpbmVzc01vZGUgPT0gMikge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKCk7XHJcblxyXG4gICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLlJlY2VpdmVEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgX3RlbXBEYXRhLlJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwYXkgZGF5IHByb2ZpdHMgYWdhaW5zdCBzZWxlY3RlZCBidXNpbmVzcyB0aHJvdWdob3V0IGdhbWUuXCIsIDMyMDApO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdXIgY3VycmVudCBzbGVjdGVkIGJ1c2luZXNzIGFscmVhZHkgcmVjZWl2ZSBkb3VibGUgcGF5IGRheS5cIiwgMjgwMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGJvdFwiKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuIl19