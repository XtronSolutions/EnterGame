"use strict";
cc._RF.push(module, 'fb8a5ZUBJFFQJtaaJU+yKsK', 'BusinessDetail');
// Script/BusinessDetail.js

"use strict";

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
    BusinessMode: {
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
    }
  },
  SetName: function SetName(_name) {
    this.BusinessName.string = _name;
  },
  SetType: function SetType(_type) {
    this.BusinessType.string = _type;
  },
  SetMode: function SetMode(_mode) {
    this.BusinessMode.string = _mode;
  },
  SetBalance: function SetBalance(_balance) {
    this.BusinessBalance.string = _balance;
  },
  SetLocations: function SetLocations(_locations) {
    this.BusinessLocations.string = _locations;
  }
});

cc._RF.pop();