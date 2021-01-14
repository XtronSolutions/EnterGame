
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
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) //real players
      {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCdXNpbmVzc0RldGFpbC5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJCdXNpbmVzc0RldGFpbCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkJ1c2luZXNzTmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsIkJ1c2luZXNzVHlwZSIsIkJ1c2luZXNzTW9kZUxhYmVsIiwiQnVzaW5lc3NCYWxhbmNlIiwiQnVzaW5lc3NMb2NhdGlvbnMiLCJDYW5TZWxsIiwiQm9vbGVhbiIsIlNlbGxCdXNpbmVzc0J0bk5vZGUiLCJOb2RlIiwiU2VsbExvY2F0aW9uQnRuTm9kZSIsIkJ1c2luZXNzTW9kZSIsIkludGVnZXIiLCJCdXNpbmVzc0luZGV4IiwiQ2FuVW5kZXJnb1BhcnRuZXJzaGlwIiwiUGFydG5lck5hbWVMYWJlbCIsIkJ1c2luZXNzVmFsdWVMYWJlbCIsIlBhcnRuZXJTaGlwQnRuTm9kZSIsIkZpbmFsQnVzaW5lc3NWYWx1ZSIsIlNlbGVjdEJ1c2luZXNzRm9yUGF5RGF5Um9sbCIsIlNlbGVjdEJ1c2luZXNzQnV0dG9uTm9kZSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJTZXRTZWxlY3RCdXNpbmVzc0ZvclBheURheVJvbGwiLCJfc3RhdGUiLCJTZXRCdXNpbmVzc01vZGUiLCJfdmFsIiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldE5hbWUiLCJfbmFtZSIsInN0cmluZyIsIlNldFR5cGUiLCJfdHlwZSIsIlNldE1vZGUiLCJfbW9kZSIsIlNldEJhbGFuY2UiLCJfYmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIl9sb2NhdGlvbnMiLCJTZXRQYXJ0bmVyTmFtZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJfdmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJUb2dnbGVTZWxsQnVzaW5lc3NCdXR0b24iLCJnZXRDb21wb25lbnQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJUb2dnbGVTZWxsTG9jYXRpb25CdXR0b24iLCJUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbiIsIlNlbGxMb2NhdGlvbiIsIl9tYW5hZ2VyIiwiSW5zdGFuY2UiLCJHZXRfR2FtZU1hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiX3RlbXBEYXRhIiwiUGxheWVyR2FtZUluZm8iLCJOb09mQnVzaW5lc3MiLCJMb2NhdGlvbnNOYW1lIiwibGVuZ3RoIiwiTG9hblRha2VuIiwicG9wIiwiX2Ftb3VudCIsIkxvYW5BbW91bnQiLCJDYXNoIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU2hvd1RvYXN0Iiwic2V0VGltZW91dCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNlbGxCdXNpbmVzcyIsIkhvbWVCYXNlZEFtb3VudCIsInNwbGljZSIsIl9sb2FuQW1vdW50IiwiTW9ydGFyQW1vdW50IiwiR2V0SW50b1BhcnRuZXJTaGlwIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsImNvbnNvbGUiLCJsb2ciLCJfZGF0YSIsIkRhdGEiLCJUdXJuIiwiUGxheWVyRGF0YSIsIlNlbGVjdGVkQnVzaW5zZXNzSW5kZXgiLCJCdXNWYWx1ZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlNlbGVjdEJ1c2luZXNzZm9yUGF5RGF5IiwiRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJJc0JvdCIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM1QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURzQjtBQUU1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LEtBR0VxQyxRQUFRLENBQUN5QywwQkFBVCxDQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxFQUFrRCxJQUFsRCxFQUF1RCxLQUFLOUUsYUFBNUQsRUFBMkUsQ0FBM0UsRUFBOEUsQ0FBOUUsRUFBaUYsQ0FBakY7QUFFSCxLQVRELE1BU08sSUFBSSxLQUFLRixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBRWpDcEIsTUFBQUEsd0JBQXdCLENBQUM0RCxRQUF6QixDQUFrQ2MscUJBQWxDLEdBQTBEd0IsbUNBQTFEO0FBRUEsVUFBSW5ELFVBQVUsR0FBR2lCLFNBQVMsQ0FBQ0UsWUFBVixDQUF1QixLQUFLNUMsYUFBNUIsRUFBMkM2QyxhQUEzQyxDQUF5REMsTUFBMUU7QUFDQSxVQUFJVCxRQUFRLENBQUNNLGNBQVQsQ0FBd0JILFlBQXhCLEVBQXNDcUMsS0FBMUMsRUFDRXhDLFFBQVEsQ0FBQ3lDLDBCQUFULENBQW9DLEtBQXBDLEVBQTJDLElBQTNDLEVBQWlELElBQWpELEVBQXNELEtBQUs5RSxhQUEzRCxFQUEwRSxDQUExRSxFQUE2RSxDQUE3RSxFQUFnRnlCLFVBQWhGLEVBREYsS0FHRVksUUFBUSxDQUFDeUMsMEJBQVQsQ0FBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsSUFBbEQsRUFBdUQsS0FBSzlFLGFBQTVELEVBQTJFLENBQTNFLEVBQThFLENBQTlFLEVBQWlGeUIsVUFBakY7QUFDSDtBQUNGO0FBNVgyQixDQUFULENBQXJCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIEJ1c2luZXNzRGV0YWlsID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NEZXRhaWxcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc1R5cGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NNb2RlTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NCYWxhbmNlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEJ1c2luZXNzTG9jYXRpb25zOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIENhblNlbGw6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgU2VsbEJ1c2luZXNzQnRuTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGxMb2NhdGlvbkJ0bk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc01vZGU6IHtcclxuICAgICAgZGVmYXVsdDogLTEsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgQnVzaW5lc3NJbmRleDoge1xyXG4gICAgICBkZWZhdWx0OiAtMSxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBDYW5VbmRlcmdvUGFydG5lcnNoaXA6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgUGFydG5lck5hbWVMYWJlbDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXNpbmVzc1ZhbHVlTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgUGFydG5lclNoaXBCdG5Ob2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRmluYWxCdXNpbmVzc1ZhbHVlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IC0xLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGVjdEJ1c2luZXNzRm9yUGF5RGF5Um9sbDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxlY3RCdXNpbmVzc0J1dHRvbk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbClcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBTZXRTZWxlY3RCdXNpbmVzc0ZvclBheURheVJvbGwoX3N0YXRlKVxyXG4gIHtcclxuICAgIHRoaXMuU2VsZWN0QnVzaW5lc3NGb3JQYXlEYXlSb2xsID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzTW9kZShfdmFsKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzTW9kZSA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NJbmRleChfdmFsKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzSW5kZXggPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFNldE5hbWUoX25hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NOYW1lLnN0cmluZyA9IF9uYW1lO1xyXG4gIH0sXHJcblxyXG4gIFNldFR5cGUoX3R5cGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NUeXBlLnN0cmluZyA9IF90eXBlO1xyXG4gIH0sXHJcblxyXG4gIFNldE1vZGUoX21vZGUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NNb2RlTGFiZWwuc3RyaW5nID0gX21vZGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QmFsYW5jZShfYmFsYW5jZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc0JhbGFuY2Uuc3RyaW5nID0gX2JhbGFuY2U7XHJcbiAgfSxcclxuXHJcbiAgU2V0TG9jYXRpb25zKF9sb2NhdGlvbnMpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NMb2NhdGlvbnMuc3RyaW5nID0gX2xvY2F0aW9ucztcclxuICB9LFxyXG5cclxuICBTZXRQYXJ0bmVyTmFtZShfbmFtZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyTmFtZUxhYmVsLnN0cmluZyA9IF9uYW1lO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVmFsdWUoX3ZhbHVlKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzVmFsdWVMYWJlbC5zdHJpbmcgPSBfdmFsdWU7XHJcbiAgfSxcclxuXHJcbiAgU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF92YWx1ZSkge1xyXG4gICAgdGhpcy5GaW5hbEJ1c2luZXNzVmFsdWUgPSBfdmFsdWU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2VsbEJ1c2luZXNzQnV0dG9uKF9zdGF0ZSkge1xyXG4gICAgaWYgKHRoaXMuQ2FuU2VsbCkge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc0J0bk5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gX3N0YXRlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihfc3RhdGUpIHtcclxuICAgIGlmICh0aGlzLkNhblNlbGwpIHtcclxuICAgICAgdGhpcy5TZWxsTG9jYXRpb25CdG5Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IF9zdGF0ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbihfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lclNoaXBCdG5Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZWxsTG9jYXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc01vZGUgPT0gMSkge1xyXG4gICAgICAvL2hvbWUgYmFzZWRcclxuICAgICAgLy90aGVyZSBpcyBub3QgZ29pbmcgdG8gYmUgYW55IGxvY2F0aW9uIGZvciBob21lIGJhc2VkXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDIpIHtcclxuICAgICAgLy9CcmljayBhbmQgbW9ydGFyXHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGhhcyBhbnkgbG9jYXRpb24gYXQgYWxsXHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vaWYgdGhlcmUgaXMgc29tZSBsb2FuIG9uIHNlbGVjdGVkIGJ1c2luZXNzXHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5wb3AoKTtcclxuICAgICAgICAgIHZhciBfYW1vdW50ID1cclxuICAgICAgICAgICAgNzUwMDAgLSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgX3RlbXBEYXRhLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgb25lIG9mIHlvdXIgbG9jYXRpb24sICRcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgYWRkZWQgdG8geW91ciBjYXNoIGFmdGVyIHBheWluZyBsb2FuXCIsXHJcbiAgICAgICAgICAgIDIwMDBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLnBvcCgpO1xyXG4gICAgICAgICAgX3RlbXBEYXRhLkNhc2ggKz0gNzUwMDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIG9uZSBvZiB5b3VyIGxvY2F0aW9uLCAkNzUwMDAgYWRkZWQgdG8geW91ciBjYXNoXCIsXHJcbiAgICAgICAgICAgIDIwMDBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VsbEJ1c2luZXNzKCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy9ob21lIGJhc2VkXHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vaWYgdGhlcmUgaXMgc29tZSBsb2FuIG9uIHNlbGVjdGVkIGJ1c2luZXNzXHJcbiAgICAgICAgICB2YXIgSG9tZUJhc2VkQW1vdW50ID0gMTAwMDA7XHJcbiAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLnNwbGljZSh0aGlzLkJ1c2luZXNzSW5kZXgsIDEpO1xyXG4gICAgICAgICAgdmFyIF9hbW91bnQgPUhvbWVCYXNlZEFtb3VudCAtX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIF9sb2FuQW1vdW50ID1fdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtSG9tZUJhc2VkQW1vdW50O1xyXG5cclxuICAgICAgICAgIGlmIChfbG9hbkFtb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIC8vbWVhbnMgcGF5ZWQgYWxsIGxvYW5cclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCAtPSBIb21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKF9hbW91bnQgPD0gMClcclxuICAgICAgICAgICAgIF9hbW91bnQgPSAwO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBfdGVtcERhdGEuQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIHlvdXIgYnVzaW5lc3MsICRcIiArX2Ftb3VudCArXCIgYWRkZWQgdG8geW91ciBjYXNoIGFmdGVyIHBheWluZyBsb2FuXCIsMjAwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBIb21lQmFzZWRBbW91bnQgPSAxMDAwMDtcclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3Muc3BsaWNlKHRoaXMuQnVzaW5lc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICBfdGVtcERhdGEuQ2FzaCArPSBIb21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIHlvdXIgYnVzaW5lc3MsICQxMDAwMCBhZGRlZCB0byB5b3VyIGNhc2hcIixcclxuICAgICAgICAgICAgMjAwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICB9LCAyMDUwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5CdXNpbmVzc01vZGUgPT0gMikge1xyXG4gICAgICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvL2lmIHRoZXJlIGlzIHNvbWUgbG9hbiBvbiBzZWxlY3RlZCBidXNpbmVzc1xyXG4gICAgICAgICAgdmFyIE1vcnRhckFtb3VudCA9IDc1MDAwO1xyXG4gICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPVxyXG4gICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgaWYgKF9sb2NhdGlvbnMgPiAwKVxyXG4gICAgICAgICAgICAvL2lmIGJ1c2luZXNzIGhhdmUgbG9jYXRpb24gbXVsaXBseWUgZWFjaCBsb2NhdGlvbiB3aXRoIGFtb3VudFxyXG4gICAgICAgICAgICBNb3J0YXJBbW91bnQgKz0gX2xvY2F0aW9ucyAqIE1vcnRhckFtb3VudDtcclxuXHJcbiAgICAgICAgICB2YXIgX2Ftb3VudCA9XHJcbiAgICAgICAgICAgIE1vcnRhckFtb3VudCAtXHJcbiAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgdmFyIF9sb2FuQW1vdW50ID1cclxuICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLVxyXG4gICAgICAgICAgICBNb3J0YXJBbW91bnQ7XHJcblxyXG4gICAgICAgICAgaWYgKF9sb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgICAgLy9tZWFucyBwYXllZCBhbGwgbG9hblxyXG4gICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbXHJcbiAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc0luZGV4XHJcbiAgICAgICAgICAgIF0uTG9hbkFtb3VudCAtPSBIb21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKF9hbW91bnQgPD0gMCkgX2Ftb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgX3RlbXBEYXRhLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3Muc3BsaWNlKHRoaXMuQnVzaW5lc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIHlvdXIgYnVzaW5lc3MgYWxvbmcgd2l0aCBhbnkgbG9jYXRpb25zLCAkXCIgK1xyXG4gICAgICAgICAgICAgIF9hbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiIGFkZGVkIHRvIHlvdXIgY2FzaCBhZnRlciBwYXlpbmcgbG9hblwiLFxyXG4gICAgICAgICAgICAyMDAwXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgTW9ydGFyQW1vdW50ID0gNzUwMDA7XHJcbiAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9XHJcbiAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICBpZiAoX2xvY2F0aW9ucyA+IDApXHJcbiAgICAgICAgICAgIC8vaWYgYnVzaW5lc3MgaGF2ZSBsb2NhdGlvbiBtdWxpcGx5ZSBlYWNoIGxvY2F0aW9uIHdpdGggYW1vdW50XHJcbiAgICAgICAgICAgIE1vcnRhckFtb3VudCArPSBfbG9jYXRpb25zICogTW9ydGFyQW1vdW50O1xyXG5cclxuICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3Muc3BsaWNlKHRoaXMuQnVzaW5lc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICBfdGVtcERhdGEuQ2FzaCArPSBNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIHlvdXIgYnVzaW5lc3MsICRcIiArXHJcbiAgICAgICAgICAgICAgTW9ydGFyQW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBhZGRlZCB0byB5b3VyIGNhc2hcIixcclxuICAgICAgICAgICAgMjAwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgICB9LCAyMDUwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgXCJDYW5ub3Qgc2VsbCwgeW91IG5lZWQgYXRsZWFzdCBvbmUgYnVzaW5lc3MgdG8gY29udGludWUgcGxheWluZyBnYW1lLlwiLFxyXG4gICAgICAgIDIwMDBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRJbnRvUGFydG5lclNoaXAoKVxyXG4gIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpLy9yZWFsIHBsYXllcnNcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2coXCJTZW5kaW5nIG9mZmVyXCIpO1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFzIHNvbWUgYnVzaW5lc3NcIik7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IFR1cm46IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKSwgUGxheWVyRGF0YTogX3RlbXBEYXRhLCBTZWxlY3RlZEJ1c2luc2Vzc0luZGV4OiB0aGlzLkJ1c2luZXNzSW5kZXgsIEJ1c1ZhbHVlOiB0aGlzLkZpbmFsQnVzaW5lc3NWYWx1ZSB9IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMSwgX2RhdGEpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZVxyXG4gICAge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImdhbWUgYmVpbmcgcGxheWVkIGJ5IGJvdFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RCdXNpbmVzc2ZvclBheURheSgpXHJcbiAge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIGlmICh0aGlzLkJ1c2luZXNzTW9kZSA9PSAxKSB7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuXHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLklzQm90KVxyXG4gICAgICAgIF9tYW5hZ2VyLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLCB0cnVlLCB0cnVlLHRoaXMuQnVzaW5lc3NJbmRleCwgMSwgMCwgMCk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBfbWFuYWdlci5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgZmFsc2UsIHRydWUsdGhpcy5CdXNpbmVzc0luZGV4LCAxLCAwLCAwKTtcclxuICAgICAgXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuQnVzaW5lc3NNb2RlID09IDIpIHtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG5cclxuICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLklzQm90KVxyXG4gICAgICAgIF9tYW5hZ2VyLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLCB0cnVlLCB0cnVlLHRoaXMuQnVzaW5lc3NJbmRleCwgMCwgMSwgX2xvY2F0aW9ucyk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBfbWFuYWdlci5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgZmFsc2UsIHRydWUsdGhpcy5CdXNpbmVzc0luZGV4LCAwLCAxLCBfbG9jYXRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuIl19