"use strict";
cc._RF.push(module, '3ada7cQqWNBH59Y618eJyEZ', 'GamePlayReferenceManager');
// Script/GamePlayReferenceManager.js

"use strict";

//-------------------------------------------class for GamePlayReferenceManager-------------------------//
var GamePlayReferenceManager = cc.Class({
  name: "GamePlayReferenceManager",
  "extends": cc.Component,
  properties: {
    GameMangerRef: {
      displayName: "GameMangerRef",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference to store node for game manager"
    },
    SpaceManagerRef: {
      displayName: "SpaceManagerRef",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference to store node for Space Manager"
    },
    GameplayUIManagerRef: {
      displayName: "GameplayUIManagerRef",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference to store node for gameplay ui Manager"
    },
    UIManagerRef: {
      displayName: "UIManagerRef",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference to store node for ui Manager"
    },
    MultiplayerControllerRef: {
      displayName: "MultiplayerControllerRef",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference to node of multiplayer controller"
    },
    MultiplayerSyncManagerRef: {
      displayName: "MultiplayerSyncManagerRef",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference to node of MultiplayerSyncManager"
    },
    ServerBackendRef: {
      displayName: "ServerBackendRef",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference to node of ServerBackend"
    },
    DecksDataRef: {
      displayName: "DecksDataRef",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference to node of DecksData"
    },
    QuestionsDataRef: {
      displayName: "QuestionsDataRef",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference to node of QuestionsData"
    }
  },
  statics: {
    //creating static instance of the class
    Instance: null
  },
  RemovePersistNode: function RemovePersistNode() {
    GamePlayReferenceManager.Instance = null;
    cc.game.removePersistRootNode(this.node);
  },
  onLoad: function onLoad() {
    //making class singleton
    if (!GamePlayReferenceManager.Instance) {
      cc.game.addPersistRootNode(this.node);
      GamePlayReferenceManager.Instance = this;
    } // console.log(this.Get_MultiplayerController());
    // console.log(this.Get_UIManager());
    // console.log(this.Get_GameManager());
    // console.log(this.Get_GameplayUIManager());
    // console.log(this.Get_SpaceManager());
    // console.log(this.Get_MultiplayerSyncManager());
    // console.log(this.Get_ServerBackend());

  },
  Get_GameManager: function Get_GameManager() {
    if (this.GameMangerRef == undefined || this.GameMangerRef == null) this.GameMangerRef = cc.find("Managers/GameManager");
    if (this.GameMangerRef != undefined && this.GameMangerRef != null) return this.GameMangerRef = this.GameMangerRef.getComponent("GameManager");else return null;
  },
  Get_SpaceManager: function Get_SpaceManager() {
    if (this.SpaceManagerRef == undefined || this.SpaceManagerRef == null) this.SpaceManagerRef = cc.find("Canvas/UI/GamePath/Spaces");
    if (this.SpaceManagerRef != undefined && this.SpaceManagerRef != null) return this.SpaceManagerRef = this.SpaceManagerRef.getComponent("SpacesManager");else return null;
  },
  Get_GameplayUIManager: function Get_GameplayUIManager() {
    if (this.GameplayUIManagerRef == undefined || this.GameplayUIManagerRef == null) this.GameplayUIManagerRef = cc.find("Managers/GameplayUIManager");
    if (this.GameplayUIManagerRef != undefined && this.GameplayUIManagerRef != null) return this.GameplayUIManagerRef = this.GameplayUIManagerRef.getComponent("GameplayUIManager");else return null;
  },
  Get_UIManager: function Get_UIManager() {
    if (this.UIManagerRef == undefined || this.UIManagerRef == null) this.UIManagerRef = cc.find("UIManager");
    if (this.UIManagerRef != undefined && this.UIManagerRef != null) return this.UIManagerRef = this.UIManagerRef.getComponent("UIManager");else return null;
  },
  Get_MultiplayerController: function Get_MultiplayerController() {
    if (this.MultiplayerControllerRef == undefined || this.MultiplayerControllerRef == null) this.MultiplayerControllerRef = cc.find("PhotonManager");
    if (this.MultiplayerControllerRef != undefined && this.MultiplayerControllerRef != null) return this.MultiplayerControllerRef = this.MultiplayerControllerRef.getComponent("MultiplayerController");else return null;
  },
  Get_MultiplayerSyncManager: function Get_MultiplayerSyncManager() {
    if (this.MultiplayerSyncManagerRef == undefined || this.MultiplayerSyncManagerRef == null) this.MultiplayerSyncManagerRef = cc.find("MultiplayerSyncManager");
    if (this.MultiplayerSyncManagerRef != undefined && this.MultiplayerSyncManagerRef != null) return this.MultiplayerSyncManagerRef = this.MultiplayerSyncManagerRef.getComponent("MultiplayerSyncManager");else return null;
  },
  Get_ServerBackend: function Get_ServerBackend() {
    if (this.ServerBackendRef == undefined || this.ServerBackendRef == null) this.ServerBackendRef = cc.find("ServerManager");
    if (this.ServerBackendRef != undefined && this.ServerBackendRef != null) return this.ServerBackendRef = this.ServerBackendRef.getComponent("ServerBackend");else return null;
  },
  Get_DecksData: function Get_DecksData() {
    if (this.DecksDataRef == undefined || this.DecksDataRef == null) this.DecksDataRef = cc.find("Managers/DecksManager");
    if (this.DecksDataRef != undefined && this.DecksDataRef != null) return this.DecksDataRef = this.DecksDataRef.getComponent("DecksData");else return null;
  },
  Get_QuestionsData: function Get_QuestionsData() {
    if (this.QuestionsDataRef == undefined || this.QuestionsDataRef == null) this.QuestionsDataRef = cc.find("Managers/RandomQuestionsData");
    if (this.QuestionsDataRef != undefined && this.QuestionsDataRef != null) return this.QuestionsDataRef = this.QuestionsDataRef.getComponent("QuestionsData");else return null;
  }
});
module.exports = GamePlayReferenceManager;

cc._RF.pop();