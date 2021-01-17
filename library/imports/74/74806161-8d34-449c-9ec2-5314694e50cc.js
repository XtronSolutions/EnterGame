"use strict";
cc._RF.push(module, '74806FhjTREnJ7CUxRpTlDM', 'SpacesManager');
// Script/SpacesManager.js

"use strict";

var _SpaceDescription;

//-------------------------------------------Spaces Data-------------------------//
var EnumSpaceType = cc.Enum({
  None: 0,
  WildCard: 1,
  BigBusiness: 2,
  Marketing: 3,
  Invest: 4,
  Losses: 5,
  PayDay: 6,
  DoublePayDay: 7,
  OneQuestion: 8,
  Sell: 9,
  BuyOrSell: 10,
  GoBackSpaces: 11,
  Finish: 12
});
var allSpaces = ["None", "Wild Card", "Big Business", "Marketing", "Invest", "Losses", "Pay Day", "Double Pay Day", "One Question", "Sell", "Buy Or Sell", "Go Back 3 Spaces"]; //-------------------------------------------class Spaces Data-------------------------//

var SpaceData = cc.Class({
  name: "SpaceData",
  properties: {
    Name: "Data",
    SpacesType: {
      type: EnumSpaceType,
      "default": EnumSpaceType.None,
      serializable: true,
      tooltip: "states machines by type of spaces on board"
    },
    SpaceDescription: (_SpaceDescription = {
      type: "Description"
    }, _SpaceDescription["type"] = cc.Text, _SpaceDescription["default"] = "", _SpaceDescription.serializable = true, _SpaceDescription.tooltip = "Description of spaces", _SpaceDescription),
    ReferenceLocation: {
      displayName: "SpaceObject",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Background image associated by the space"
    },
    CanHaveBG: {
      displayName: "ISBG",
      "default": false,
      type: cc["boolean"],
      serializable: true,
      tooltip: "if space could have background"
    },
    BGColor: {
      displayName: "BGColor",
      "default": cc.Color.WHITE,
      type: cc.Color,
      serializable: true,
      tooltip: "Color of the background"
    },
    isFinal: {
      displayName: "isFinal",
      "default": false,
      type: cc["boolean"],
      serializable: true,
      tooltip: "if space is final one"
    }
  },
  ctor: function ctor() {}
}); //-------------------------------------------Class for Spaces Manager-------------------------//

var SpacesManager = cc.Class({
  name: "SpacesManager",
  "extends": cc.Component,
  properties: {
    Data: {
      "default": [],
      type: [SpaceData],
      serializable: true
    }
  },
  ctor: function ctor() {},
  onLoad: function onLoad() {
    this.CreateSpacesPool();
  },
  start: function start() {},
  CreateSpacesPool: function CreateSpacesPool() {
    for (var i = 0; i < this.Data.length; i++) {
      if (this.Data[i].ReferenceLocation.childrenCount > 0) {
        if (!this.Data[i].isFinal) {
          this.Data[i].ReferenceLocation.active = true;
          this.Data[i].ReferenceLocation.getComponent('SpaceHandler').InitializeData(this.Data[i]);
          this.Data[i].ReferenceLocation.children[0].active = true;

          if (this.Data[i].CanHaveBG) {
            this.Data[i].ReferenceLocation.children[0].children[0].active = true;
            this.Data[i].ReferenceLocation.children[0].children[0].color = this.Data[i].BGColor;
          } else {
            this.Data[i].ReferenceLocation.children[0].children[0].active = false;
          }

          this.Data[i].ReferenceLocation.children[0].children[1].getComponent(cc.Label).string = allSpaces[parseInt(this.Data[i].SpacesType)];
        } else {
          this.Data[i].ReferenceLocation.active = true;
          this.Data[i].ReferenceLocation.getComponent('SpaceHandler').InitializeData(this.Data[i]);
          this.Data[i].ReferenceLocation.children[0].active = false;
        }
      }
    }
  }
}); //module.exports= SpaceData;

module.exports = SpacesManager;

cc._RF.pop();