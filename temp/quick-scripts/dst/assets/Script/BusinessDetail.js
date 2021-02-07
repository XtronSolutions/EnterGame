
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
  SetBusinessIndex: function SetBusinessIndex(_val) {
    this.BusinessIndex = _val;
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

          var _amount = 75000 - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

          _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
          _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;
          _tempData.Cash += _amount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold one of your location, $" + _amount + " added to your cash after paying loan", 2000);
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        } else {
          _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.pop();

          _tempData.Cash += 75000;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold one of your location, $75000 added to your cash", 2000);
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
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
          var HomeBasedAmount = 10000;

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
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        } else {
          var HomeBasedAmount = 10000;

          _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

          _tempData.Cash += HomeBasedAmount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business, $10000 added to your cash", 2000);
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        }
      } else if (this.BusinessMode == 2) {
        //brick and mortar
        if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) {
          //if there is some loan on selected business
          var MortarAmount = 75000;
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
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        } else {
          var MortarAmount = 75000;
          var _locations = _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;
          if (_locations > 0) //if business have location muliplye each location with amount
            MortarAmount += _locations * MortarAmount;

          _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

          _tempData.Cash += MortarAmount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business, $" + MortarAmount + " added to your cash", 2000);
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCdXNpbmVzc0RldGFpbC5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJCdXNpbmVzc0RldGFpbCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkJ1c2luZXNzTmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsIkJ1c2luZXNzVHlwZSIsIkJ1c2luZXNzTW9kZUxhYmVsIiwiQnVzaW5lc3NCYWxhbmNlIiwiQnVzaW5lc3NMb2NhdGlvbnMiLCJDYW5TZWxsIiwiQm9vbGVhbiIsIlNlbGxCdXNpbmVzc0J0bk5vZGUiLCJOb2RlIiwiU2VsbExvY2F0aW9uQnRuTm9kZSIsIkJ1c2luZXNzTW9kZSIsIkludGVnZXIiLCJCdXNpbmVzc0luZGV4IiwiQ2FuVW5kZXJnb1BhcnRuZXJzaGlwIiwiUGFydG5lck5hbWVMYWJlbCIsIkJ1c2luZXNzVmFsdWVMYWJlbCIsIlBhcnRuZXJTaGlwQnRuTm9kZSIsIkZpbmFsQnVzaW5lc3NWYWx1ZSIsIlNlbGVjdEJ1c2luZXNzRm9yUGF5RGF5Um9sbCIsIlNlbGVjdEJ1c2luZXNzQnV0dG9uTm9kZSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJTZXRTZWxlY3RCdXNpbmVzc0ZvclBheURheVJvbGwiLCJfc3RhdGUiLCJTZXRCdXNpbmVzc01vZGUiLCJfdmFsIiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldE5hbWUiLCJfbmFtZSIsInN0cmluZyIsIlNldFR5cGUiLCJfdHlwZSIsIlNldE1vZGUiLCJfbW9kZSIsIlNldEJhbGFuY2UiLCJfYmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIl9sb2NhdGlvbnMiLCJTZXRQYXJ0bmVyTmFtZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJfdmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJUb2dnbGVTZWxsQnVzaW5lc3NCdXR0b24iLCJnZXRDb21wb25lbnQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbiIsIlNlbGxMb2NhdGlvbiIsIl9tYW5hZ2VyIiwiSW5zdGFuY2UiLCJHZXRfR2FtZU1hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiX3RlbXBEYXRhIiwiUGxheWVyR2FtZUluZm8iLCJOb09mQnVzaW5lc3MiLCJMb2NhdGlvbnNOYW1lIiwibGVuZ3RoIiwiTG9hblRha2VuIiwicG9wIiwiX2Ftb3VudCIsIkxvYW5BbW91bnQiLCJDYXNoIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU2hvd1RvYXN0Iiwic2V0VGltZW91dCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNlbGxCdXNpbmVzcyIsIkhvbWVCYXNlZEFtb3VudCIsInNwbGljZSIsIl9sb2FuQW1vdW50IiwiTW9ydGFyQW1vdW50IiwiR2V0SW50b1BhcnRuZXJTaGlwIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsImNvbnNvbGUiLCJsb2ciLCJfZGF0YSIsIkRhdGEiLCJUdXJuIiwiUGxheWVyRGF0YSIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJCdXNWYWx1ZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5IiwiRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJJc0JvdCIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiU2VsZWN0QnVzaW5lc3Nmb3JEb3VibGVQYXlEYXlfVGhyb3VnaG91dEdhbWUiLCJfcmVjZWl2ZURvdWJsZSIsIlJlY2VpdmVEb3VibGVQYXlEYXkiLCJFeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCIsIlJlY2VpdmVEb3VibGVQ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LENBQWtDQyxlQUFsQyxHQUFvRDZDLGdCQUFwRDtBQUNELE9BZkQsTUFlTztBQUNMMUcsUUFBQUEsd0JBQXdCLENBQUM0RCxRQUF6QixDQUFrQ2MscUJBQWxDLEdBQTBEQyxTQUExRCxDQUFvRSwrREFBcEUsRUFBcUksSUFBckk7QUFDRDtBQUNGLEtBdkJELE1BdUJPO0FBQ0xXLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVo7QUFDRDtBQUNGO0FBM1cyQixDQUFULENBQXJCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIEJ1c2luZXNzRGV0YWlsID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NEZXRhaWxcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc1R5cGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NNb2RlTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NCYWxhbmNlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJ1c2luZXNzTG9jYXRpb25zOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIENhblNlbGw6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU2VsbEJ1c2luZXNzQnRuTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGxMb2NhdGlvbkJ0bk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc01vZGU6IHtcclxuICAgICAgZGVmYXVsdDogLTEsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NJbmRleDoge1xyXG4gICAgICBkZWZhdWx0OiAtMSxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBDYW5VbmRlcmdvUGFydG5lcnNoaXA6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgUGFydG5lck5hbWVMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc1ZhbHVlTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgUGFydG5lclNoaXBCdG5Ob2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRmluYWxCdXNpbmVzc1ZhbHVlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IC0xLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGVjdEJ1c2luZXNzRm9yUGF5RGF5Um9sbDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxlY3RCdXNpbmVzc0J1dHRvbk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBTZXRTZWxlY3RCdXNpbmVzc0ZvclBheURheVJvbGwoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGVjdEJ1c2luZXNzRm9yUGF5RGF5Um9sbCA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc01vZGUoX3ZhbCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc01vZGUgPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzSW5kZXgoX3ZhbCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc0luZGV4ID0gX3ZhbDtcclxuICB9LFxyXG5cclxuICBTZXROYW1lKF9uYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzTmFtZS5zdHJpbmcgPSBfbmFtZTtcclxuICB9LFxyXG5cclxuICBTZXRUeXBlKF90eXBlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzVHlwZS5zdHJpbmcgPSBfdHlwZTtcclxuICB9LFxyXG5cclxuICBTZXRNb2RlKF9tb2RlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzTW9kZUxhYmVsLnN0cmluZyA9IF9tb2RlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJhbGFuY2UoX2JhbGFuY2UpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NCYWxhbmNlLnN0cmluZyA9IF9iYWxhbmNlO1xyXG4gIH0sXHJcblxyXG4gIFNldExvY2F0aW9ucyhfbG9jYXRpb25zKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzTG9jYXRpb25zLnN0cmluZyA9IF9sb2NhdGlvbnM7XHJcbiAgfSxcclxuXHJcbiAgU2V0UGFydG5lck5hbWUoX25hbWUpIHtcclxuICAgIHRoaXMuUGFydG5lck5hbWVMYWJlbC5zdHJpbmcgPSBfbmFtZTtcclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1ZhbHVlKF92YWx1ZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1ZhbHVlTGFiZWwuc3RyaW5nID0gX3ZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIFNldEZpbmFsQnVzaW5lc3NWYWx1ZShfdmFsdWUpIHtcclxuICAgIHRoaXMuRmluYWxCdXNpbmVzc1ZhbHVlID0gX3ZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc0J1dHRvbihfc3RhdGUpIHtcclxuICAgIGlmICh0aGlzLkNhblNlbGwpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NCdG5Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IF9zdGF0ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24oX3N0YXRlKSB7XHJcbiAgICBpZiAodGhpcy5DYW5TZWxsKSB7XHJcbiAgICAgIHRoaXMuU2VsbExvY2F0aW9uQnRuTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBfc3RhdGU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJTaGlwQnRuTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2VsbExvY2F0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDEpIHtcclxuICAgICAgLy9ob21lIGJhc2VkXHJcbiAgICAgIC8vdGhlcmUgaXMgbm90IGdvaW5nIHRvIGJlIGFueSBsb2NhdGlvbiBmb3IgaG9tZSBiYXNlZFxyXG4gICAgfSBlbHNlIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vQnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBoYXMgYW55IGxvY2F0aW9uIGF0IGFsbFxyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvL2lmIHRoZXJlIGlzIHNvbWUgbG9hbiBvbiBzZWxlY3RlZCBidXNpbmVzc1xyXG4gICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUucG9wKCk7XHJcbiAgICAgICAgICB2YXIgX2Ftb3VudCA9IDc1MDAwIC0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ7XHJcblxyXG4gICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgb25lIG9mIHlvdXIgbG9jYXRpb24sICRcIiArIF9hbW91bnQgKyBcIiBhZGRlZCB0byB5b3VyIGNhc2ggYWZ0ZXIgcGF5aW5nIGxvYW5cIiwgMjAwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLnBvcCgpO1xyXG4gICAgICAgICAgX3RlbXBEYXRhLkNhc2ggKz0gNzUwMDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgb25lIG9mIHlvdXIgbG9jYXRpb24sICQ3NTAwMCBhZGRlZCB0byB5b3VyIGNhc2hcIiwgMjAwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy9ob21lIGJhc2VkXHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vaWYgdGhlcmUgaXMgc29tZSBsb2FuIG9uIHNlbGVjdGVkIGJ1c2luZXNzXHJcbiAgICAgICAgICB2YXIgSG9tZUJhc2VkQW1vdW50ID0gMTAwMDA7XHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLnNwbGljZSh0aGlzLkJ1c2luZXNzSW5kZXgsIDEpO1xyXG4gICAgICAgICAgdmFyIF9hbW91bnQgPSBIb21lQmFzZWRBbW91bnQgLSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICB2YXIgX2xvYW5BbW91bnQgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIEhvbWVCYXNlZEFtb3VudDtcclxuXHJcbiAgICAgICAgICBpZiAoX2xvYW5BbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgICAvL21lYW5zIHBheWVkIGFsbCBsb2FuXHJcbiAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLT0gSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChfYW1vdW50IDw9IDApIF9hbW91bnQgPSAwO1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgeW91ciBidXNpbmVzcywgJFwiICsgX2Ftb3VudCArIFwiIGFkZGVkIHRvIHlvdXIgY2FzaCBhZnRlciBwYXlpbmcgbG9hblwiLCAyMDAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICB9LCAyMDUwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIEhvbWVCYXNlZEFtb3VudCA9IDEwMDAwO1xyXG4gICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5zcGxpY2UodGhpcy5CdXNpbmVzc0luZGV4LCAxKTtcclxuICAgICAgICAgIF90ZW1wRGF0YS5DYXNoICs9IEhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCB5b3VyIGJ1c2luZXNzLCAkMTAwMDAgYWRkZWQgdG8geW91ciBjYXNoXCIsIDIwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vaWYgdGhlcmUgaXMgc29tZSBsb2FuIG9uIHNlbGVjdGVkIGJ1c2luZXNzXHJcbiAgICAgICAgICB2YXIgTW9ydGFyQW1vdW50ID0gNzUwMDA7XHJcbiAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICBpZiAoX2xvY2F0aW9ucyA+IDApXHJcbiAgICAgICAgICAgIC8vaWYgYnVzaW5lc3MgaGF2ZSBsb2NhdGlvbiBtdWxpcGx5ZSBlYWNoIGxvY2F0aW9uIHdpdGggYW1vdW50XHJcbiAgICAgICAgICAgIE1vcnRhckFtb3VudCArPSBfbG9jYXRpb25zICogTW9ydGFyQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBfYW1vdW50ID0gTW9ydGFyQW1vdW50IC0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICB2YXIgX2xvYW5BbW91bnQgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtIE1vcnRhckFtb3VudDtcclxuXHJcbiAgICAgICAgICBpZiAoX2xvYW5BbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgICAvL21lYW5zIHBheWVkIGFsbCBsb2FuXHJcbiAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLT0gSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChfYW1vdW50IDw9IDApIF9hbW91bnQgPSAwO1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLnNwbGljZSh0aGlzLkJ1c2luZXNzSW5kZXgsIDEpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIHlvdXIgYnVzaW5lc3MgYWxvbmcgd2l0aCBhbnkgbG9jYXRpb25zLCAkXCIgKyBfYW1vdW50ICsgXCIgYWRkZWQgdG8geW91ciBjYXNoIGFmdGVyIHBheWluZyBsb2FuXCIsIDIwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgTW9ydGFyQW1vdW50ID0gNzUwMDA7XHJcbiAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICBpZiAoX2xvY2F0aW9ucyA+IDApXHJcbiAgICAgICAgICAgIC8vaWYgYnVzaW5lc3MgaGF2ZSBsb2NhdGlvbiBtdWxpcGx5ZSBlYWNoIGxvY2F0aW9uIHdpdGggYW1vdW50XHJcbiAgICAgICAgICAgIE1vcnRhckFtb3VudCArPSBfbG9jYXRpb25zICogTW9ydGFyQW1vdW50O1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3Muc3BsaWNlKHRoaXMuQnVzaW5lc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICBfdGVtcERhdGEuQ2FzaCArPSBNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgeW91ciBidXNpbmVzcywgJFwiICsgTW9ydGFyQW1vdW50ICsgXCIgYWRkZWQgdG8geW91ciBjYXNoXCIsIDIwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIkNhbm5vdCBzZWxsLCB5b3UgbmVlZCBhdGxlYXN0IG9uZSBidXNpbmVzcyB0byBjb250aW51ZSBwbGF5aW5nIGdhbWUuXCIsIDIwMDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdldEludG9QYXJ0bmVyU2hpcCgpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpIHtcclxuICAgICAgLy9yZWFsIHBsYXllcnNcclxuICAgICAgY29uc29sZS5sb2coXCJTZW5kaW5nIG9mZmVyXCIpO1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFzIHNvbWUgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IFR1cm46IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKSwgUGxheWVyRGF0YTogX3RlbXBEYXRhLCBTZWxlY3RlZEJ1c2luc2Vzc0luZGV4OiB0aGlzLkJ1c2luZXNzSW5kZXgsIEJ1c1ZhbHVlOiB0aGlzLkZpbmFsQnVzaW5lc3NWYWx1ZSB9IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMSwgX2RhdGEpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBiZWluZyBwbGF5ZWQgYnkgYm90XCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5KCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAxKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNCb3QpIF9tYW5hZ2VyLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLCB0cnVlLCB0cnVlLCB0aGlzLkJ1c2luZXNzSW5kZXgsIDEsIDAsIDApO1xyXG4gICAgICBlbHNlIF9tYW5hZ2VyLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdGhpcy5CdXNpbmVzc0luZGV4LCAxLCAwLCAwKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5CdXNpbmVzc01vZGUgPT0gMikge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuXHJcbiAgICAgIHZhciBfbG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Jc0JvdCkgX21hbmFnZXIuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsIHRydWUsIHRydWUsIHRoaXMuQnVzaW5lc3NJbmRleCwgMCwgMSwgX2xvY2F0aW9ucyk7XHJcbiAgICAgIGVsc2UgX21hbmFnZXIuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLkJ1c2luZXNzSW5kZXgsIDAsIDEsIF9sb2NhdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdEJ1c2luZXNzZm9yRG91YmxlUGF5RGF5X1Rocm91Z2hvdXRHYW1lKCkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCkgPT0gMikge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgICAgdmFyIF9yZWNlaXZlRG91YmxlID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLlJlY2VpdmVEb3VibGVQYXlEYXk7XHJcbiAgICAgIGlmICghX3JlY2VpdmVEb3VibGUpIHtcclxuICAgICAgICBpZiAodGhpcy5CdXNpbmVzc01vZGUgPT0gMSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTY3JlZW5fQnVzaW5lc3NQYXlEYXlVSVNldHVwKCk7XHJcblxyXG4gICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLlJlY2VpdmVEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgX3RlbXBEYXRhLlJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnQrKztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDIpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2NyZWVuX0J1c2luZXNzUGF5RGF5VUlTZXR1cCgpO1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5SZWNlaXZlRG91YmxlUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgIF90ZW1wRGF0YS5SZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcGF5IGRheSBwcm9maXRzIGFnYWluc3Qgc2VsZWN0ZWQgYnVzaW5lc3MgdGhyb3VnaG91dCBnYW1lLlwiLCAzMjAwKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3VyIGN1cnJlbnQgc2xlY3RlZCBidXNpbmVzcyBhbHJlYWR5IHJlY2VpdmUgZG91YmxlIHBheSBkYXkuXCIsIDI4MDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIml0cyBib3RcIik7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==