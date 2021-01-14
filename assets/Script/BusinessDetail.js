var GamePlayReferenceManager = null;
var BusinessDetail = cc.Class({
  name: "BusinessDetail",
  extends: cc.Component,

  properties: {
    BusinessName: {
      default: null,
      type: cc.Label,
      serializable: true,
    },

    BusinessType: {
      default: null,
      type: cc.Label,
      serializable: true,
    },

    BusinessModeLabel: {
      default: null,
      type: cc.Label,
      serializable: true,
    },

    BusinessBalance: {
      default: null,
      type: cc.Label,
      serializable: true,
    },

    BusinessLocations: {
      default: null,
      type: cc.Label,
      serializable: true,
    },

    CanSell: {
      default: false,
      type: cc.Boolean,
      serializable: true,
    },

    SellBusinessBtnNode: {
      default: null,
      type: cc.Node,
      serializable: true,
    },

    SellLocationBtnNode: {
      default: null,
      type: cc.Node,
      serializable: true,
    },

    BusinessMode: {
      default: -1,
      type: cc.Integer,
      serializable: true,
    },

    BusinessIndex: {
      default: -1,
      type: cc.Integer,
      serializable: true,
    },

    CanUndergoPartnership: {
      default: false,
      type: cc.Boolean,
      serializable: true,
    },

    PartnerNameLabel: {
      default: null,
      type: cc.Label,
      serializable: true,
    },

    BusinessValueLabel: {
      default: null,
      type: cc.Label,
      serializable: true,
    },

    PartnerShipBtnNode: {
      default: null,
      type: cc.Node,
      serializable: true,
    },

    FinalBusinessValue: {
      default: -1,
      type: cc.Integer,
      serializable: true,
    },

    SelectBusinessForPayDayRoll: {
      default: false,
      type: cc.Boolean,
      serializable: true,
    },

    SelectBusinessButtonNode: {
      default: null,
      type: cc.Node,
      serializable: true,
    },
  },

  CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null)
      GamePlayReferenceManager = require("GamePlayReferenceManager");
  },

  SetSelectBusinessForPayDayRoll(_state)
  {
    this.SelectBusinessForPayDayRoll = _state;
  },

  SetBusinessMode(_val) {
    this.BusinessMode = _val;
  },

  SetBusinessIndex(_val) {
    this.BusinessIndex = _val;
  },

  SetName(_name) {
    this.BusinessName.string = _name;
  },

  SetType(_type) {
    this.BusinessType.string = _type;
  },

  SetMode(_mode) {
    this.BusinessModeLabel.string = _mode;
  },

  SetBalance(_balance) {
    this.BusinessBalance.string = _balance;
  },

  SetLocations(_locations) {
    this.BusinessLocations.string = _locations;
  },

  SetPartnerName(_name) {
    this.PartnerNameLabel.string = _name;
  },

  SetBusinessValue(_value) {
    this.BusinessValueLabel.string = _value;
  },

  SetFinalBusinessValue(_value) {
    this.FinalBusinessValue = _value;
  },

  ToggleSellBusinessButton(_state) {
    if (this.CanSell) {
      this.SellBusinessBtnNode.getComponent(cc.Button).interactable = _state;
    }
  },

  ToggleSellLocationButton(_state) {
    if (this.CanSell) {
      this.SellLocationBtnNode.getComponent(cc.Button).interactable = _state;
    }
  },

  TogglePartnerShipButton(_state) {
    this.PartnerShipBtnNode.getComponent(cc.Button).interactable = _state;
  },

  SellLocation() {
    if (this.BusinessMode == 1) {
      //home based
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
          var _amount =
            75000 - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

          _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
          _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;

          _tempData.Cash += _amount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            "You have successfully sold one of your location, $" +
              _amount +
              " added to your cash after paying loan",
            2000
          );
          setTimeout(() => {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        } else {
          _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.pop();
          _tempData.Cash += 75000;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            "You have successfully sold one of your location, $75000 added to your cash",
            2000
          );
          setTimeout(() => {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        }
      }
    }
  },

  SellBusiness() {
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
          var _amount =HomeBasedAmount -_tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

          var _loanAmount =_tempData.NoOfBusiness[this.BusinessIndex].LoanAmount -HomeBasedAmount;

          if (_loanAmount <= 0) {
            //means payed all loan
            _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
            _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;
          } else {
            _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount -= HomeBasedAmount;
          }

          if (_amount <= 0)
             _amount = 0;
          
          _tempData.Cash += _amount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business, $" +_amount +" added to your cash after paying loan",2000);
          setTimeout(() => {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        } else {
          var HomeBasedAmount = 10000;
          _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);
          _tempData.Cash += HomeBasedAmount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            "You have successfully sold your business, $10000 added to your cash",
            2000
          );
          setTimeout(() => {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        }
      } else if (this.BusinessMode == 2) {
        //brick and mortar
        if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) {
          //if there is some loan on selected business
          var MortarAmount = 75000;
          var _locations =
            _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;

          if (_locations > 0)
            //if business have location muliplye each location with amount
            MortarAmount += _locations * MortarAmount;

          var _amount =
            MortarAmount -
            _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;
          var _loanAmount =
            _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount -
            MortarAmount;

          if (_loanAmount <= 0) {
            //means payed all loan
            _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
            _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;
          } else {
            _tempData.NoOfBusiness[
              this.BusinessIndex
            ].LoanAmount -= HomeBasedAmount;
          }

          if (_amount <= 0) _amount = 0;

          _tempData.Cash += _amount;
          _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            "You have successfully sold your business along with any locations, $" +
              _amount +
              " added to your cash after paying loan",
            2000
          );
          setTimeout(() => {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        } else {
          var MortarAmount = 75000;
          var _locations =
            _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;

          if (_locations > 0)
            //if business have location muliplye each location with amount
            MortarAmount += _locations * MortarAmount;

          _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);
          _tempData.Cash += MortarAmount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            "You have successfully sold your business, $" +
              MortarAmount +
              " added to your cash",
            2000
          );
          setTimeout(() => {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
          }, 2050);
        }
      }
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
        "Cannot sell, you need atleast one business to continue playing game.",
        2000
      );
    }
  },

  GetIntoPartnerShip()
  {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2)//real players
    {
      console.log("Sending offer");
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
      var _tempData = _manager.PlayerGameInfo[_playerIndex];
      if (_tempData.NoOfBusiness.length > 0) {
        console.log("has some business");
        var _data = { Data: { Turn: _manager.GetTurnNumber(), PlayerData: _tempData, SelectedBusinsessIndex: this.BusinessIndex, BusValue: this.FinalBusinessValue } };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(11, _data);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(true);
      }
    } else
    {
      console.log("game being played by bot");
    }
  },

  SelectBusinessforPayDay()
  {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();
    var _tempData = _manager.PlayerGameInfo[_playerIndex];
    if (this.BusinessMode == 1) {

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreen__SellBusinessUISetup();

      if (_manager.PlayerGameInfo[_playerIndex].IsBot)
        _manager.ProcessPayDay_TurnDecision(false, true, true,this.BusinessIndex, 1, 0, 0);
      else
        _manager.ProcessPayDay_TurnDecision(false, false, true,this.BusinessIndex, 1, 0, 0);
      
    } else if (this.BusinessMode == 2) {

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitSellScreen__SellBusinessUISetup();

      var _locations = _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;
      if (_manager.PlayerGameInfo[_playerIndex].IsBot)
        _manager.ProcessPayDay_TurnDecision(false, true, true,this.BusinessIndex, 0, 1, _locations);
      else
        _manager.ProcessPayDay_TurnDecision(false, false, true,this.BusinessIndex, 0, 1, _locations);
    }
  },
});
