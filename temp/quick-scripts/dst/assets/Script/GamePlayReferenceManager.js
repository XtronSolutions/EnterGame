
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GamePlayReferenceManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiR2FtZU1hbmdlclJlZiIsImRpc3BsYXlOYW1lIiwidHlwZSIsIk5vZGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiU3BhY2VNYW5hZ2VyUmVmIiwiR2FtZXBsYXlVSU1hbmFnZXJSZWYiLCJVSU1hbmFnZXJSZWYiLCJNdWx0aXBsYXllckNvbnRyb2xsZXJSZWYiLCJNdWx0aXBsYXllclN5bmNNYW5hZ2VyUmVmIiwiU2VydmVyQmFja2VuZFJlZiIsIkRlY2tzRGF0YVJlZiIsIlF1ZXN0aW9uc0RhdGFSZWYiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiR2V0X0dhbWVNYW5hZ2VyIiwidW5kZWZpbmVkIiwiZmluZCIsImdldENvbXBvbmVudCIsIkdldF9TcGFjZU1hbmFnZXIiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJHZXRfVUlNYW5hZ2VyIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJHZXRfRGVja3NEYXRhIiwiR2V0X1F1ZXN0aW9uc0RhdGEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsd0JBQXdCLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RDQyxFQUFBQSxJQUFJLEVBQUUsMEJBRGdDO0FBRXRDLGFBQVNGLEVBQUUsQ0FBQ0csU0FGMEI7QUFJdENDLEVBQUFBLFVBQVUsRUFBRTtB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RCxFQUFpRSxPQUFRLEtBQUtBLFlBQUwsR0FBb0IsS0FBS0EsWUFBTCxDQUFrQmEsWUFBbEIsQ0FBK0IsV0FBL0IsQ0FBNUIsQ0FBakUsS0FDSyxPQUFPLElBQVA7QUFDTixHQXZKcUM7QUF5SnRDUSxFQUFBQSxpQkFBaUIsRUFBRSw2QkFBWTtBQUM3QixRQUFJLEtBQUtwQixnQkFBTCxJQUF5QlUsU0FBekIsSUFBc0MsS0FBS1YsZ0JBQUwsSUFBeUIsSUFBbkUsRUFBeUUsS0FBS0EsZ0JBQUwsR0FBd0JsQixFQUFFLENBQUM2QixJQUFILENBQVEsOEJBQVIsQ0FBeEI7QUFFekUsUUFBSSxLQUFLWCxnQkFBTCxJQUF5QlUsU0FBekIsSUFBc0MsS0FBS1YsZ0JBQUwsSUFBeUIsSUFBbkUsRUFBeUUsT0FBUSxLQUFLQSxnQkFBTCxHQUF3QixLQUFLQSxnQkFBTCxDQUFzQlksWUFBdEIsQ0FBbUMsZUFBbkMsQ0FBaEMsQ0FBekUsS0FDSyxPQUFPLElBQVA7QUFDTjtBQTlKcUMsQ0FBVCxDQUEvQjtBQWdLQVMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekMsd0JBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEdhbWVNYW5nZXJSZWY6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR2FtZU1hbmdlclJlZlwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHN0b3JlIG5vZGUgZm9yIGdhbWUgbWFuYWdlclwiLFxyXG4gICAgfSxcclxuICAgIFNwYWNlTWFuYWdlclJlZjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTcGFjZU1hbmFnZXJSZWZcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byBzdG9yZSBub2RlIGZvciBTcGFjZSBNYW5hZ2VyXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIEdhbWVwbGF5VUlNYW5hZ2VyUmVmOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdhbWVwbGF5VUlNYW5hZ2VyUmVmXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gc3RvcmUgbm9kZSBmb3IgZ2FtZXBsYXkgdWkgTWFuYWdlclwiLFxyXG4gICAgfSxcclxuICAgIFVJTWFuYWdlclJlZjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJVSU1hbmFnZXJSZWZcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byBzdG9yZSBub2RlIGZvciB1aSBNYW5hZ2VyXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlclJlZjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNdWx0aXBsYXllckNvbnRyb2xsZXJSZWZcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byBub2RlIG9mIG11bHRpcGxheWVyIGNvbnRyb2xsZXJcIixcclxuICAgIH0sXHJcbiAgICBNdWx0aXBsYXllclN5bmNNYW5hZ2VyUmVmOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk11bHRpcGxheWVyU3luY01hbmFnZXJSZWZcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byBub2RlIG9mIE11bHRpcGxheWVyU3luY01hbmFnZXJcIixcclxuICAgIH0sXHJcbiAgICBTZXJ2ZXJCYWNrZW5kUmVmOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNlcnZlckJhY2tlbmRSZWZcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byBub2RlIG9mIFNlcnZlckJhY2tlbmRcIixcclxuICAgIH0sXHJcbiAgICBEZWNrc0RhdGFSZWY6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVja3NEYXRhUmVmXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gbm9kZSBvZiBEZWNrc0RhdGFcIixcclxuICAgIH0sXHJcbiAgICBRdWVzdGlvbnNEYXRhUmVmOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlF1ZXN0aW9uc0RhdGFSZWZcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byBub2RlIG9mIFF1ZXN0aW9uc0RhdGFcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlID0gbnVsbDtcclxuICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy9tYWtpbmcgY2xhc3Mgc2luZ2xldG9uXHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZSkge1xyXG4gICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuR2V0X1VJTWFuYWdlcigpKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuR2V0X0dhbWVNYW5hZ2VyKCkpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLkdldF9TcGFjZU1hbmFnZXIoKSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5HZXRfU2VydmVyQmFja2VuZCgpKTtcclxuICB9LFxyXG5cclxuICBHZXRfR2FtZU1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLkdhbWVNYW5nZXJSZWYgPT0gdW5kZWZpbmVkIHx8IHRoaXMuR2FtZU1hbmdlclJlZiA9PSBudWxsKSB0aGlzLkdhbWVNYW5nZXJSZWYgPSBjYy5maW5kKFwiTWFuYWdlcnMvR2FtZU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKHRoaXMuR2FtZU1hbmdlclJlZiAhPSB1bmRlZmluZWQgJiYgdGhpcy5HYW1lTWFuZ2VyUmVmICE9IG51bGwpIHJldHVybiAodGhpcy5HYW1lTWFuZ2VyUmVmID0gdGhpcy5HYW1lTWFuZ2VyUmVmLmdldENvbXBvbmVudChcIkdhbWVNYW5hZ2VyXCIpKTtcclxuICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuXHJcbiAgR2V0X1NwYWNlTWFuYWdlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuU3BhY2VNYW5hZ2VyUmVmID09IHVuZGVmaW5lZCB8fCB0aGlzLlNwYWNlTWFuYWdlclJlZiA9PSBudWxsKSB0aGlzLlNwYWNlTWFuYWdlclJlZiA9IGNjLmZpbmQoXCJDYW52YXMvVUkvR2FtZVBhdGgvU3BhY2VzXCIpO1xyXG5cclxuICAgIGlmICh0aGlzLlNwYWNlTWFuYWdlclJlZiAhPSB1bmRlZmluZWQgJiYgdGhpcy5TcGFjZU1hbmFnZXJSZWYgIT0gbnVsbCkgcmV0dXJuICh0aGlzLlNwYWNlTWFuYWdlclJlZiA9IHRoaXMuU3BhY2VNYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIlNwYWNlc01hbmFnZXJcIikpO1xyXG4gICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICB9LFxyXG5cclxuICBHZXRfR2FtZXBsYXlVSU1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLkdhbWVwbGF5VUlNYW5hZ2VyUmVmID09IHVuZGVmaW5lZCB8fCB0aGlzLkdhbWVwbGF5VUlNYW5hZ2VyUmVmID09IG51bGwpIHRoaXMuR2FtZXBsYXlVSU1hbmFnZXJSZWYgPSBjYy5maW5kKFwiTWFuYWdlcnMvR2FtZXBsYXlVSU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKHRoaXMuR2FtZXBsYXlVSU1hbmFnZXJSZWYgIT0gdW5kZWZpbmVkICYmIHRoaXMuR2FtZXBsYXlVSU1hbmFnZXJSZWYgIT0gbnVsbCkgcmV0dXJuICh0aGlzLkdhbWVwbGF5VUlNYW5hZ2VyUmVmID0gdGhpcy5HYW1lcGxheVVJTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJHYW1lcGxheVVJTWFuYWdlclwiKSk7XHJcbiAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gIH0sXHJcblxyXG4gIEdldF9VSU1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLlVJTWFuYWdlclJlZiA9PSB1bmRlZmluZWQgfHwgdGhpcy5VSU1hbmFnZXJSZWYgPT0gbnVsbCkgdGhpcy5VSU1hbmFnZXJSZWYgPSBjYy5maW5kKFwiVUlNYW5hZ2VyXCIpO1xyXG5cclxuICAgIGlmICh0aGlzLlVJTWFuYWdlclJlZiAhPSB1bmRlZmluZWQgJiYgdGhpcy5VSU1hbmFnZXJSZWYgIT0gbnVsbCkgcmV0dXJuICh0aGlzLlVJTWFuYWdlclJlZiA9IHRoaXMuVUlNYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIlVJTWFuYWdlclwiKSk7XHJcbiAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gIH0sXHJcblxyXG4gIEdldF9NdWx0aXBsYXllckNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLk11bHRpcGxheWVyQ29udHJvbGxlclJlZiA9PSB1bmRlZmluZWQgfHwgdGhpcy5NdWx0aXBsYXllckNvbnRyb2xsZXJSZWYgPT0gbnVsbCkgdGhpcy5NdWx0aXBsYXllckNvbnRyb2xsZXJSZWYgPSBjYy5maW5kKFwiUGhvdG9uTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAodGhpcy5NdWx0aXBsYXllckNvbnRyb2xsZXJSZWYgIT0gdW5kZWZpbmVkICYmIHRoaXMuTXVsdGlwbGF5ZXJDb250cm9sbGVyUmVmICE9IG51bGwpIHJldHVybiAodGhpcy5NdWx0aXBsYXllckNvbnRyb2xsZXJSZWYgPSB0aGlzLk11bHRpcGxheWVyQ29udHJvbGxlclJlZi5nZXRDb21wb25lbnQoXCJNdWx0aXBsYXllckNvbnRyb2xsZXJcIikpO1xyXG4gICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICB9LFxyXG5cclxuICBHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclJlZiA9PSB1bmRlZmluZWQgfHwgdGhpcy5NdWx0aXBsYXllclN5bmNNYW5hZ2VyUmVmID09IG51bGwpIHRoaXMuTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclJlZiA9IGNjLmZpbmQoXCJNdWx0aXBsYXllclN5bmNNYW5hZ2VyXCIpO1xyXG5cclxuICAgIGlmICh0aGlzLk11bHRpcGxheWVyU3luY01hbmFnZXJSZWYgIT0gdW5kZWZpbmVkICYmIHRoaXMuTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclJlZiAhPSBudWxsKSByZXR1cm4gKHRoaXMuTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclJlZiA9IHRoaXMuTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJNdWx0aXBsYXllclN5bmNNYW5hZ2VyXCIpKTtcclxuICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuXHJcbiAgR2V0X1NlcnZlckJhY2tlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLlNlcnZlckJhY2tlbmRSZWYgPT0gdW5kZWZpbmVkIHx8IHRoaXMuU2VydmVyQmFja2VuZFJlZiA9PSBudWxsKSB0aGlzLlNlcnZlckJhY2tlbmRSZWYgPSBjYy5maW5kKFwiU2VydmVyTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAodGhpcy5TZXJ2ZXJCYWNrZW5kUmVmICE9IHVuZGVmaW5lZCAmJiB0aGlzLlNlcnZlckJhY2tlbmRSZWYgIT0gbnVsbCkgcmV0dXJuICh0aGlzLlNlcnZlckJhY2tlbmRSZWYgPSB0aGlzLlNlcnZlckJhY2tlbmRSZWYuZ2V0Q29tcG9uZW50KFwiU2VydmVyQmFja2VuZFwiKSk7XHJcbiAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gIH0sXHJcblxyXG4gIEdldF9EZWNrc0RhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLkRlY2tzRGF0YVJlZiA9PSB1bmRlZmluZWQgfHwgdGhpcy5EZWNrc0RhdGFSZWYgPT0gbnVsbCkgdGhpcy5EZWNrc0RhdGFSZWYgPSBjYy5maW5kKFwiTWFuYWdlcnMvRGVja3NNYW5hZ2VyXCIpO1xyXG5cclxuICAgIGlmICh0aGlzLkRlY2tzRGF0YVJlZiAhPSB1bmRlZmluZWQgJiYgdGhpcy5EZWNrc0RhdGFSZWYgIT0gbnVsbCkgcmV0dXJuICh0aGlzLkRlY2tzRGF0YVJlZiA9IHRoaXMuRGVja3NEYXRhUmVmLmdldENvbXBvbmVudChcIkRlY2tzRGF0YVwiKSk7XHJcbiAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gIH0sXHJcblxyXG4gIEdldF9RdWVzdGlvbnNEYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5RdWVzdGlvbnNEYXRhUmVmID09IHVuZGVmaW5lZCB8fCB0aGlzLlF1ZXN0aW9uc0RhdGFSZWYgPT0gbnVsbCkgdGhpcy5RdWVzdGlvbnNEYXRhUmVmID0gY2MuZmluZChcIk1hbmFnZXJzL1JhbmRvbVF1ZXN0aW9uc0RhdGFcIik7XHJcblxyXG4gICAgaWYgKHRoaXMuUXVlc3Rpb25zRGF0YVJlZiAhPSB1bmRlZmluZWQgJiYgdGhpcy5RdWVzdGlvbnNEYXRhUmVmICE9IG51bGwpIHJldHVybiAodGhpcy5RdWVzdGlvbnNEYXRhUmVmID0gdGhpcy5RdWVzdGlvbnNEYXRhUmVmLmdldENvbXBvbmVudChcIlF1ZXN0aW9uc0RhdGFcIikpO1xyXG4gICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICB9LFxyXG59KTtcclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI7XHJcbiJdfQ==