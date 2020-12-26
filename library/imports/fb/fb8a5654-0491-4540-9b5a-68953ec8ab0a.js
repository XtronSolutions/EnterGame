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
    }
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
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
  SellLocation: function SellLocation() {
    if (this.BusinessMode == 1) //home based
      {//there is not going to be any location for home based
      } else if (this.BusinessMode == 2) //Brick and mortar
      {
        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _tempData = _manager.PlayerGameInfo[_playerIndex];

        if (_tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length > 0) //if selected business has any location at all
          {
            if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) //if there is some loan on selected business
              {
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
      if (this.BusinessMode == 1) //home based
        {
          if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) //if there is some loan on selected business
            {
              var HomeBasedAmount = 10000;

              _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

              var _amount = HomeBasedAmount - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

              var _loanAmount = _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount - HomeBasedAmount;

              if (_loanAmount <= 0) //means payed all loan
                {
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
        } else if (this.BusinessMode == 2) //brick and mortar
        {
          if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) //if there is some loan on selected business
            {
              var MortarAmount = 75000;
              var _locations = _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;
              if (_locations > 0) //if business have location muliplye each location with amount
                MortarAmount += _locations * MortarAmount;

              var _amount = MortarAmount - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

              var _loanAmount = _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount - MortarAmount;

              if (_loanAmount <= 0) //means payed all loan
                {
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
  }
});

cc._RF.pop();