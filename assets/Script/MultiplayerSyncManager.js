var GamePlayReferenceManager = null;

var MultiplayerSyncManager = cc.Class({
  name: "MultiplayerSyncManager",
  extends: cc.Component,

  properties: {},

  statics: {
    //creating static instance of the class
    Instance: null,
  },

  RemovePersistNode() {
    MultiplayerSyncManager.Instance = null;
    cc.game.removePersistRootNode(this.node);
  },

  onLoad() {
    if (!MultiplayerSyncManager.Instance) {
      cc.game.addPersistRootNode(this.node);
      MultiplayerSyncManager.Instance = this;
    }
    this.CheckReferences();
    this.SelectedMode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();
  },

  CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
  },

  RaiseEvent(_eventCode, _data) {
    if (_eventCode == 1) {
      //sending playerinfo
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendData(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 2) {
      //sending Turn Start Call
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().StartTurn(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 3) {
      //sending Dice Roll Value
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().DiceRollEvent(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 4) {
      //sending userID of player who had completed their turn
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SyncTurnCompletion(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 5) {
      //sending card data (index) so other users can sync them
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendCardData(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 6) {
      //sending call to end the game
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendGameOver(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 7) {
      //sending data for one question space
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendOneQuestionData(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 8) {
      //sending back data for one question space
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendOneQuestionResponseData(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 9) {
      //sending data to reset positions after bankrupt
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendBankruptData(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 10) {
      //sending go back spaces data
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendGoBackSpaceData(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 11) {
      //sending open partnership offer to everyone
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendPartnerShipOfferData(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 12) {
      //sending answer to player who initiated partnership call
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendPartnerShipAnswerData(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 13) {
      //sending profit to respective partner
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendPartnerProfitLoss(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 15) {
      //sending payday information to show
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendInfo(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 16) {
      //sending call to end the game
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendGameOverData(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 17) {
      //sending data of player to get all profit next pay day
      if (this.SelectedMode == 2)
        //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendSelectedPlayerForProfit(_data);
      else if (this.SelectedMode == 1)
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    }
  },

  ReceiveEvent(_eventCode, _senderName, _senderID, _data) {
    if (_eventCode == 1) {
      //receiving playerinfo
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      cc.systemEvent.emit("SyncData", _data, _senderID); //function defined in GameplayUIManager
    } else if (_eventCode == 2) {
      //receiving start Turn
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().TurnHandler(_data);
    } else if (_eventCode == 3) {
      //receiving dice roll data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().syncDiceRoll(_data);
    } else if (_eventCode == 4) {
      //receiving userid of player who has completed turn
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventTurnComplete(_data);
    } else if (_eventCode == 5) {
      //receiving card data (index) so other users can sync them
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventForCard(_data);
    } else if (_eventCode == 6) {
      //receiving game over call
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().SyncGameOver(_data);
    } else if (_eventCode == 7) {
      //receiving one question data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().QuestionPopUp_OtherUser_OneQuestion(_data);
    } else if (_eventCode == 8) {
      //receiving one question response data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventDecision_OneQuestion(_data);
    } else if (_eventCode == 9) {
      //receiving bankrupcy data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveBankruptData(_data);
    } else if (_eventCode == 10) {
      //receiving bankrupcy data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveGoBackSpacesData_spaceFunctionality(_data);
    } else if (_eventCode == 11) {
      //receiving partnership offer data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ReceiveEvent_PartnershipSetup(_data);
    } else if (_eventCode == 12) {
      //receiving partnership answer data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ReceiveEventDecisionAnswer_PartnershipSetup(_data);
    } else if (_eventCode == 13) {
      //receiving partnership answer data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveProfit_Partner_TurnDecision(_data);
    } else if (_eventCode == 15) {
      //receiving payday info
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowInfo(_data);
    } else if (_eventCode == 16) {
      //receiving payday info
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().SyncGameCompleteData(_data);
    } else if (_eventCode == 17) {
      //receiving payday info
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEvent_SelectPlayerForProfit_Space_CardFunctionality(_data);
    }
  },
});
