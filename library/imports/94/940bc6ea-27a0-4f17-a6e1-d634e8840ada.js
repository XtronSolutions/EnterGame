"use strict";
cc._RF.push(module, '940bcbqJ6BPF6bh1jTohAra', 'ExpandBusinessHandler');
// Script/ExpandBusinessHandler.js

"use strict";

var GamePlayReferenceManager = null;
var ExpandBusinessHandler = cc.Class({
  name: "ExpandBusinessHandler",
  "extends": cc.Component,
  properties: {
    BusinessIndex: {
      "default": -1,
      type: cc.integer,
      serializable: true
    },
    NameLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    LocationEditBox: {
      "default": null,
      type: cc.EditBox,
      serializable: true
    }
  },
  // LIFE-CYCLE CALLBACKS:
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  onLoad: function onLoad() {
    this.LocationText = "";
    this.CheckReferences();
  },
  onLocationTextChanged: function onLocationTextChanged(txt) {
    this.LocationText = txt;
  },
  SetName: function SetName(name) {
    this.NameLabel.string = name;
  },
  SetBusinessIndex: function SetBusinessIndex(_index) {
    this.BusinessIndex = _index;
  },
  ResetEditBox: function ResetEditBox() {
    this.LocationEditBox.string = "";
  },
  OnExpandButtonClicked: function OnExpandButtonClicked() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) this.CheckReferences();

    if (this.LocationText == "") {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("please enter new location name for this business.", 2000);
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().onLocationNameChanged_ExpandBusiness_TurnDecision(this.LocationText);
      GamePlayReferenceManager.Instance.Get_GameManager().ExpandBusiness_TurnDecision(25000, this.BusinessIndex, this.LocationText);
    }
  } // update (dt) {},

});

cc._RF.pop();