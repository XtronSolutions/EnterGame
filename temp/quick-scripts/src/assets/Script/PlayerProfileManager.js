"use strict";
cc._RF.push(module, '5bf9bM1le5IzIRIaU5nMgXr', 'PlayerProfileManager');
// Script/PlayerProfileManager.js

"use strict";

var businessDetailNodes = [];
var PlayerInfoUI = cc.Class({
  name: "PlayerInfoUI",
  properties: {
    PlayerName: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player name label of info player UI"
    },
    PlayerCash: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player cash label of info player UI"
    },
    PlayerMarketingAmount: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player marketing amount label of info player UI"
    },
    LawyerLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player lawyer status label of info player UI"
    },
    GoldBalanceLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player gold balance label of info player UI"
    },
    StockBalanceLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player stock balance label of info player UI"
    },
    LoanBalanceLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player loan balance label of info player UI"
    },
    PartnershipStatusLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player partnership status label of info player UI"
    },
    BusinessNumberLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player business number label of info player UI"
    },
    BusinessDetailContent: {
      "default": null,
      type: cc.Node,
      serializable: true,
      toolTip: "Reference of the content of scroll view of business detail node of info player UI"
    },
    BusinessDetailPrefab: {
      "default": null,
      type: cc.Prefab,
      serializable: true,
      toolTip: "Reference of the business detail prefab of info player UI"
    },
    CashLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    MarketingLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    GoldLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    StocksLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    }
  }
});
var GamePlayReferenceManager = null;

var GameManager = require('GameManager');

var PlayerProfileManager = cc.Class({
  name: "PlayerProfileManager",
  "extends": cc.Component,
  properties: {
    BGHighlight: {
      "default": null,
      type: cc.Node,
      serializable: true,
      toolTip: "Reference of the node of player's BG highlight Node"
    },
    PlayerAvatarSprite: {
      "default": null,
      type: cc.Sprite,
      serializable: true,
      toolTip: "Reference of the sprite of player's avatar"
    },
    PlayerNameLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the label of player's name"
    },
    PlayerTurnHighlighterNode: {
      "default": null,
      type: cc.Node,
      serializable: true,
      toolTip: "Reference of the node of player's highlighter"
    },
    AvatarSpriteFrames: {
      "default": [],
      type: [cc.SpriteFrame],
      serializable: true,
      toolTip: "Reference of the array of sprites of player's avatar"
    },
    PlayerIndex: {
      "default": -1,
      type: cc.integer,
      serializable: true
    },
    PlayerInfoScreen: {
      "default": null,
      type: cc.Node,
      serializable: true
    },
    PlayerInfoMainUI: {
      "default": null,
      type: PlayerInfoUI,
      serializable: true,
      tooltip: "all player's UI data"
    },
    DiceRollScreen: {
      "default": null,
      type: cc.Node,
      serializable: true
    },
    PlayerInfo: {
      "default": null,
      type: GameManager.PlayerData,
      serializable: true,
      tooltip: "all player's data"
    }
  },
  onLoad: function onLoad() {
    GamePlayReferenceManager = null;
    this.CheckReferences();
  },
  //
  start: function start() {},
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  SetName: function SetName(_name) {
    this.PlayerNameLabel.string = _name;
  },
  SetAvatar: function SetAvatar(_index) {
    this.PlayerAvatarSprite.spriteFrame = this.AvatarSpriteFrames[_index];
  },
  ToggleBGHighlighter: function ToggleBGHighlighter(_state) {
    this.BGHighlight.active = _state;
  },
  ToggleTextighlighter: function ToggleTextighlighter(_state) {
    this.PlayerTurnHighlighterNode.active = _state;
  },
  RefreshData: function RefreshData(_cash, _marketing, _gold, _stocks) {
    this.CheckReferences();

    if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length > 0 && this.PlayerIndex < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length) {
      this.PlayerInfoMainUI.CashLabel.string = "Cash: $" + _cash;
      this.PlayerInfoMainUI.MarketingLabel.string = "Marketing: $" + _marketing;
      this.PlayerInfoMainUI.GoldLabel.string = "Gold: " + _gold;
      this.PlayerInfoMainUI.StocksLabel.string = "Stocks: " + _stocks;
    }
  },
  RefreshDataAutomatically: function RefreshDataAutomatically() {
    this.CheckReferences();

    if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length > 0 && this.PlayerIndex < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length) {
      var _tempData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[this.PlayerIndex];
      this.PlayerInfoMainUI.CashLabel.string = "Cash: $" + _tempData.Cash;
      this.PlayerInfoMainUI.MarketingLabel.string = "Marketing: $" + _tempData.MarketingAmount;
      this.PlayerInfoMainUI.GoldLabel.string = "Gold: " + _tempData.GoldCount;
      this.PlayerInfoMainUI.StocksLabel.string = "Stocks: " + _tempData.StockCount;
    }
  },
  SeeProfileData: function SeeProfileData() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      //only for real players
      GamePlayReferenceManager.Instance.Get_GameManager().SyncDataToPlayerGameInfo(0);
    }

    var _amount = 0;
    this.PlayerInfoScreen.active = true;
    this.CheckReferences();
    businessDetailNodes = [];
    var _tempData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[this.PlayerIndex];
    this.PlayerInfoMainUI.PlayerName.string = _tempData.PlayerName;
    this.PlayerInfoMainUI.PlayerCash.string = _tempData.Cash;
    this.PlayerInfoMainUI.PlayerMarketingAmount.string = _tempData.MarketingAmount;
    if (_tempData.LawyerStatus) this.PlayerInfoMainUI.LawyerLabel.string = "YES";else this.PlayerInfoMainUI.LawyerLabel.string = "NO"; //this.PlayerInfoMainUI.PartnershipStatusLabel.string="N/A";

    this.PlayerInfoMainUI.GoldBalanceLabel.string = _tempData.GoldCount;
    this.PlayerInfoMainUI.StockBalanceLabel.string = _tempData.StockCount;
    this.RefreshData(_tempData.Cash, _tempData.MarketingAmount, _tempData.GoldCount, _tempData.StockCount); //this.PlayerInfoMainUI.StockBalanceLabel.string=_tempData.NoOfStocks.length;

    this.PlayerInfoMainUI.BusinessNumberLabel.string = "No of Businesses : " + _tempData.NoOfBusiness.length;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.PlayerInfoMainUI.BusinessDetailPrefab);
      node.parent = this.PlayerInfoMainUI.BusinessDetailContent;
      node.getComponent('BusinessDetail').SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) node.getComponent('BusinessDetail').SetMode("Home Based");else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) node.getComponent('BusinessDetail').SetMode("Brick & Mortar");

      if (_tempData.NoOfBusiness[index].LoanTaken) {
        node.getComponent('BusinessDetail').SetBalance(_tempData.NoOfBusiness[index].LoanAmount);
        _amount = _tempData.NoOfBusiness[index].LoanAmount;
      }

      node.getComponent('BusinessDetail').SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);
      businessDetailNodes.push(node);
    }

    this.PlayerInfoMainUI.LoanBalanceLabel.string = _amount;
  },
  ExitProfileData: function ExitProfileData() {
    for (var index = 0; index < businessDetailNodes.length; index++) {
      businessDetailNodes[index].destroy();
    }

    businessDetailNodes = [];
    this.PlayerInfoScreen.active = false;
  }
});

cc._RF.pop();