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
  SeeProfileData: function SeeProfileData() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      //only for real players
      GamePlayReferenceManager.Instance.Get_GameManager().SyncDataToPlayerGameInfo(0);
    }

    this.PlayerInfoScreen.active = true;
    this.CheckReferences();
    businessDetailNodes = [];
    var _tempData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[this.PlayerIndex];
    this.PlayerInfoMainUI.PlayerName.string = _tempData.PlayerName;
    this.PlayerInfoMainUI.PlayerCash.string = _tempData.Cash;
    this.PlayerInfoMainUI.PlayerMarketingAmount.string = _tempData.MarketingAmount;
    if (_tempData.LawyerStatus) this.PlayerInfoMainUI.LawyerLabel.string = "YES";else this.PlayerInfoMainUI.LawyerLabel.string = "NO";
    this.PlayerInfoMainUI.PartnershipStatusLabel.string = "N/A";
    this.PlayerInfoMainUI.GoldBalanceLabel.string = _tempData.GoldCount;
    this.PlayerInfoMainUI.StockBalanceLabel.string = _tempData.StockCount; //this.PlayerInfoMainUI.StockBalanceLabel.string=_tempData.NoOfStocks.length;

    this.PlayerInfoMainUI.BusinessNumberLabel.string = "No of Businesses : " + _tempData.NoOfBusiness.length;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.PlayerInfoMainUI.BusinessDetailPrefab);
      node.parent = this.PlayerInfoMainUI.BusinessDetailContent;
      node.getComponent('BusinessDetail').SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) node.getComponent('BusinessDetail').SetMode("Home Based");else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) node.getComponent('BusinessDetail').SetMode("Brick & Mortar");
      node.getComponent('BusinessDetail').SetBalance(_tempData.NoOfBusiness[index].Amount);
      node.getComponent('BusinessDetail').SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);
      businessDetailNodes.push(node);
    }
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