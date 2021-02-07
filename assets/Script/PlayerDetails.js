var GamePlayReferenceManager = null;
var QuestionsData = null;
var PlayerDetails = cc.Class({
  name: "PlayerDetails",
  extends: cc.Component,

  properties: {
    PlayerNameLabel: {
      default: null,
      type: cc.Label,
      serializable: true,
    },
    IsOneQuestion: {
      default: false,
      type: cc.Boolean,
      serializable: true,
      toolTip: "Is current node can be selected as one question functionality",
    },
    IsPlayerSelectProfit: {
      default: false,
      type: cc.Boolean,
      serializable: true,
    },
    SelectedPlayerIndex: {
      default: 0,
      type: cc.Integer,
      serializable: true,
    },
    SelectedPlayerUserID: {
      default: "",
      type: cc.Text,
      serializable: true,
    },
    QuestionID: {
      default: 0,
      type: cc.Integer,
      serializable: true,
    },
    QuestionNode: {
      default: null,
      type: cc.Node,
      serializable: true,
    },
  },

  onEnable() {
    this.CheckReferences();

    if (this.IsOneQuestion) {
      this.VocQuestion = false;
      this.EstQuestion = false;
      this.ToastMessage = "";
      if (this.QuestionNode) {
        this.QuestionRef = null;
        // console.log(this.QuestionRef);
      }
    }
  },

  CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
    // if (!QuestionsData || QuestionsData == null) QuestionsData = require("QuestionsData");
  },

  //#region One Question space funtionality
  setPlayerIndex(_index) {
    this.SelectedPlayerIndex = _index;
  },

  setPlayerName(_name) {
    this.PlayerNameLabel.string = _name;
  },

  setPlayerUID(_uID) {
    this.SelectedPlayerUserID = _uID;
  },

  RaiseEventOneQuestion() {
    this.QuestionRef = GamePlayReferenceManager.Instance.Get_QuestionsData();
    var _Qdata;
    if (this.VocQuestion) {
      console.log("voc");
      _Qdata = this.QuestionRef.VocabularyQuestions[this.QuestionID];
    } else if (this.EstQuestion) {
      console.log("est");
      _Qdata = this.QuestionRef.EstablishmentQuestions[this.QuestionID];
    }

    console.log(_Qdata);

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      this.ToastMessage = "You have asked following question:" + "\n" + _Qdata.Question + "\n" + "A. " + _Qdata.Option1 + "\n" + "B. " + _Qdata.Option2 + "\n" + "C. " + _Qdata.Option3 + "\n" + "D. " + _Qdata.Option4 + "\n" + "\n" + "waiting for player to answer....";
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowQuestionToast(this.ToastMessage);

      var _data = { Question: this.QuestionID, UserID: this.SelectedPlayerUserID, UserIndex: this.SelectedPlayerIndex, IsVoc: this.VocQuestion };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(7, _data);

      //wait for other player
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);
    } else {
      console.log("no sending question to bot");
    }
  },

  RaiseEventSelectPlayerForProfit() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      this.ToastMessage = "You will receive next all payday profits of player " + this.PlayerNameLabel.string;
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(this.ToastMessage, 3200);

      var _gameplayManager = GamePlayReferenceManager.Instance.Get_GameManager();
      var _playerIndex = _gameplayManager.GetTurnNumber();
      var _iD = _gameplayManager.PlayerGameInfo[_playerIndex].PlayerUID;
      var _name = _gameplayManager.PlayerGameInfo[_playerIndex].PlayerName;

      var _data = { OwnPlayerID: _iD, UserID: this.SelectedPlayerUserID, UserIndex: this.SelectedPlayerIndex, UserName: _name };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(17, _data);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitAlongTurnOver_SelectPlayerForProfit();
    } else {
      console.log("no selecting player for profit with bot");
    }
  },

  AskVocabularyQuestion() {
    if (this.IsOneQuestion) {
      this.QuestionID = this.getRandom(0, 12);
      this.VocQuestion = true;
      this.EstQuestion = false;
      this.RaiseEventOneQuestion();
    }
  },

  SelectPlayerForProfit() {
    if (this.IsPlayerSelectProfit) {
      this.RaiseEventSelectPlayerForProfit();
    }
  },

  AskEstablishmentQuestion() {
    if (this.IsOneQuestion) {
      this.QuestionID = this.getRandom(0, 12);
      this.VocQuestion = false;
      this.EstQuestion = true;
      this.RaiseEventOneQuestion();
    }
  },

  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },

  //   SkippedLoan() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 1;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },

  //   TakenLoan() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 2;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },

  //   IsBankrupt() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 3;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },

  //   IsTurnSkip() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 4;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },

  //   IsDoublePayDay() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 5;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },
  // LIFE-CYCLE CALLBACKS:

  // start () {

  // },

  // update (dt) {},
});
