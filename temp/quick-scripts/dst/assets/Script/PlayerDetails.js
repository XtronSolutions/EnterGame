
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/PlayerDetails.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df154D/jRROcIFVB+J2MR4e', 'PlayerDetails');
// Script/PlayerDetails.js

"use strict";

var GamePlayReferenceManager = null;
var QuestionsData = null;
var PlayerDetails = cc.Class({
  name: "PlayerDetails",
  "extends": cc.Component,
  properties: {
    PlayerNameLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    IsOneQuestion: {
      "default": false,
      type: cc.Boolean,
      serializable: true,
      toolTip: "Is current node can be selected as one question functionality"
    },
    SelectedPlayerIndex: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    },
    SelectedPlayerUserID: {
      "default": "",
      type: cc.Text,
      serializable: true
    },
    QuestionID: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    },
    QuestionNode: {
      "default": null,
      type: cc.Node,
      serializable: true
    }
  },
  onEnable: function onEnable() {
    this.CheckReferences();

    if (this.IsOneQuestion) {
      this.VocQuestion = false;
      this.EstQuestion = false;
      this.ToastMessage = "";

      if (this.QuestionNode) {
        this.QuestionRef = null; // console.log(this.QuestionRef);
      }
    }
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager"); // if (!QuestionsData || QuestionsData == null) QuestionsData = require("QuestionsData");
  },
  //#region One Question space funtionality
  setPlayerIndex: function setPlayerIndex(_index) {
    this.SelectedPlayerIndex = _index;
  },
  setPlayerName: function setPlayerName(_name) {
    this.PlayerNameLabel.string = _name;
  },
  setPlayerUID: function setPlayerUID(_uID) {
    this.SelectedPlayerUserID = _uID;
  },
  RaiseEventOneQuestion: function RaiseEventOneQuestion() {
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
      var _data = {
        Question: this.QuestionID,
        UserID: this.SelectedPlayerUserID,
        UserIndex: this.SelectedPlayerIndex,
        IsVoc: this.VocQuestion
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(7, _data); //wait for other player

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);
    } else {
      console.log("no sending question to bot");
    }
  },
  AskVocabularyQuestion: function AskVocabularyQuestion() {
    if (this.IsOneQuestion) {
      this.QuestionID = this.getRandom(0, 12);
      this.VocQuestion = true;
      this.EstQuestion = false;
      this.RaiseEventOneQuestion();
    }
  },
  AskEstablishmentQuestion: function AskEstablishmentQuestion() {
    if (this.IsOneQuestion) {
      this.QuestionID = this.getRandom(0, 12);
      this.VocQuestion = false;
      this.EstQuestion = true;
      this.RaiseEventOneQuestion();
    }
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  } //   SkippedLoan() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJEZXRhaWxzLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlF1ZXN0aW9uc0RhdGEiLCJQbGF5ZXJEZXRhaWxzIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwiSXNPbmVRdWVzdGlvbiIsIkJvb2xlYW4iLCJ0b29sVGlwIiwiU2VsZWN0ZWRQbGF5ZXJJbmRleCIsIkludGVnZXIiLCJTZWxlY3RlZFBsYXllclVzZXJJRCIsIlRleHQiLCJRdWVzdGlvbklEIiwiUXVlc3Rpb25Ob2RlIiwiTm9kZSIsIm9uRW5hYmxlIiwiQ2hlY2tSZWZlcmVuY2VzIiwiVm9jUXVlc3Rpb24iLCJFc3RRdWVzdGlvbiIsIlRvYXN0TWVzc2FnZSIsIlF1ZXN0aW9uUmVmIiwicmVxdWlyZSIsInNldFBsYXllckluZGV4IiwiX2luZGV4Iiwic2V0UGxheWVyTmFtZSIsIl9uYW1lIiwic3RyaW5nIiwic2V0UGxheWVyVUlEIiwiX3VJRCIsIlJhaXNlRXZlbnRPbmVRdWVzdGlvbiIsIkluc3RhbmNlIiwiR2V0X1F1ZXN0aW9uc0RhdGEiLCJfUWRhdGEiLCJjb25zb2xlIiwibG9nIiwiVm9jYWJ1bGFyeVF1ZXN0aW9ucyIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiUXVlc3Rpb24iLCJPcHRpb24xIiwiT3B0aW9uMiIsIk9wdGlvbjMiLCJPcHRpb240IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTaG93UXVlc3Rpb25Ub2FzdCIsIl9kYXRhIiwiVXNlcklEIiwiVXNlckluZGV4IiwiSXNWb2MiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJBc2tWb2NhYnVsYXJ5UXVlc3Rpb24iLCJnZXRSYW5kb20iLCJBc2tFc3RhYmxpc2htZW50UXVlc3Rpb24iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxhQUFhLEdBQUcsSUFBcEI7QUFDQSxJQUFJQyxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsZUFEcUI7QUFFM0IsYUFBU0YsRUFBRSxDQUFDRyxTQUZlO0FBSTNCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsZUFBZSxFQUFFO0FBQ2YsaUJBQVMsSUFETTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGTTtBQUdmQyxNQUFBQSxZQUFZLEVBQUU7QUFIQyxLQURQO0FBTVZDLElBQUFBLGFBQWEsRUFBRTtBQUNiLGlCQUFTLEtBREk7QUFFYkgsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNVLE9BRkk7QUFHYkYsTUFBQUEsWUFBWSxFQUFFLElBSEQ7QUFJYkcsTUFBQUEsT0FBTyxFQUFFO0FBSkksS0FOTDtBQVlWQyxJQUFBQSxtQkFBbUIsRUFBRTtBQUNuQixpQkFBUyxDQURVO0FBRW5CTixNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ2EsT0FGVTtBQUduQkwsTUFBQUEsWUFBWSxFQUFFO0FBSEssS0FaWDtBQWlCVk0sSUFBQUEsb0JBQW9CLEVBQUU7QUFDcEIsaUJBQVMsRUFEVztBQUVwQlIsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNlLElBRlc7QUFHcEJQLE1BQUFBLFlBQVksRUFBRTtBQUhNLEtBakJaO0FBc0JWUSxJQUFBQSxVQUFVLEVBQUU7QUFDVixpQkFBUyxDQURDO0FBRVZWLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDYSxPQUZDO0FBR1ZMLE1BQUFBLFlBQVksRUFB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QUNFLE1BQUwsTUFBaUJILEdBQUcsR0FBR0QsR0FBdkIsQ0FBWCxJQUEwQ0EsR0FBakQsQ0FENkIsQ0FDeUI7QUFDdkQsR0F0SDBCLENBd0gzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTs7QUFoSzJCLENBQVQsQ0FBcEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgUXVlc3Rpb25zRGF0YSA9IG51bGw7XHJcbnZhciBQbGF5ZXJEZXRhaWxzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGxheWVyRGV0YWlsc1wiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNPbmVRdWVzdGlvbjoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sVGlwOiBcIklzIGN1cnJlbnQgbm9kZSBjYW4gYmUgc2VsZWN0ZWQgYXMgb25lIHF1ZXN0aW9uIGZ1bmN0aW9uYWxpdHlcIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RlZFBsYXllckluZGV4OiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBTZWxlY3RlZFBsYXllclVzZXJJRDoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUXVlc3Rpb25JRDoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUXVlc3Rpb25Ob2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgb25FbmFibGUoKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG5cclxuICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAgICAgdGhpcy5Wb2NRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkVzdFF1ZXN0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVG9hc3RNZXNzYWdlID0gXCJcIjtcclxuICAgICAgaWYgKHRoaXMuUXVlc3Rpb25Ob2RlKSB7XHJcbiAgICAgICAgdGhpcy5RdWVzdGlvblJlZiA9IG51bGw7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5RdWVzdGlvblJlZik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICAgIC8vIGlmICghUXVlc3Rpb25zRGF0YSB8fCBRdWVzdGlvbnNEYXRhID09IG51bGwpIFF1ZXN0aW9uc0RhdGEgPSByZXF1aXJlKFwiUXVlc3Rpb25zRGF0YVwiKTtcclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gT25lIFF1ZXN0aW9uIHNwYWNlIGZ1bnRpb25hbGl0eVxyXG4gIHNldFBsYXllckluZGV4KF9pbmRleCkge1xyXG4gICAgdGhpcy5TZWxlY3RlZFBsYXllckluZGV4ID0gX2luZGV4O1xyXG4gIH0sXHJcblxyXG4gIHNldFBsYXllck5hbWUoX25hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9uYW1lO1xyXG4gIH0sXHJcblxyXG4gIHNldFBsYXllclVJRChfdUlEKSB7XHJcbiAgICB0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklEID0gX3VJRDtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50T25lUXVlc3Rpb24oKSB7XHJcbiAgICB0aGlzLlF1ZXN0aW9uUmVmID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9RdWVzdGlvbnNEYXRhKCk7XHJcbiAgICB2YXIgX1FkYXRhO1xyXG4gICAgaWYgKHRoaXMuVm9jUXVlc3Rpb24pIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ2b2NcIik7XHJcbiAgICAgIF9RZGF0YSA9IHRoaXMuUXVlc3Rpb25SZWYuVm9jYWJ1bGFyeVF1ZXN0aW9uc1t0aGlzLlF1ZXN0aW9uSURdO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLkVzdFF1ZXN0aW9uKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXN0XCIpO1xyXG4gICAgICBfUWRhdGEgPSB0aGlzLlF1ZXN0aW9uUmVmLkVzdGFibGlzaG1lbnRRdWVzdGlvbnNbdGhpcy5RdWVzdGlvbklEXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhfUWRhdGEpO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpIHtcclxuICAgICAgdGhpcy5Ub2FzdE1lc3NhZ2UgPSBcIllvdSBoYXZlIGFza2VkIGZvbGxvd2luZyBxdWVzdGlvbjpcIiArIFwiXFxuXCIgKyBfUWRhdGEuUXVlc3Rpb24gKyBcIlxcblwiICsgXCJBLiBcIiArIF9RZGF0YS5PcHRpb24xICsgXCJcXG5cIiArIFwiQi4gXCIgKyBfUWRhdGEuT3B0aW9uMiArIFwiXFxuXCIgKyBcIkMuIFwiICsgX1FkYXRhLk9wdGlvbjMgKyBcIlxcblwiICsgXCJELiBcIiArIF9RZGF0YS5PcHRpb240ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIndhaXRpbmcgZm9yIHBsYXllciB0byBhbnN3ZXIuLi4uXCI7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dRdWVzdGlvblRvYXN0KHRoaXMuVG9hc3RNZXNzYWdlKTtcclxuXHJcbiAgICAgIHZhciBfZGF0YSA9IHsgUXVlc3Rpb246IHRoaXMuUXVlc3Rpb25JRCwgVXNlcklEOiB0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklELCBVc2VySW5kZXg6IHRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleCwgSXNWb2M6IHRoaXMuVm9jUXVlc3Rpb24gfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg3LCBfZGF0YSk7XHJcblxyXG4gICAgICAvL3dhaXQgZm9yIG90aGVyIHBsYXllclxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIHNlbmRpbmcgcXVlc3Rpb24gdG8gYm90XCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFza1ZvY2FidWxhcnlRdWVzdGlvbigpIHtcclxuICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAgICAgdGhpcy5RdWVzdGlvbklEID0gdGhpcy5nZXRSYW5kb20oMCwgMTIpO1xyXG4gICAgICB0aGlzLlZvY1F1ZXN0aW9uID0gdHJ1ZTtcclxuICAgICAgdGhpcy5Fc3RRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFza0VzdGFibGlzaG1lbnRRdWVzdGlvbigpIHtcclxuICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAgICAgdGhpcy5RdWVzdGlvbklEID0gdGhpcy5nZXRSYW5kb20oMCwgMTIpO1xyXG4gICAgICB0aGlzLlZvY1F1ZXN0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuRXN0UXVlc3Rpb24gPSB0cnVlO1xyXG4gICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldFJhbmRvbTogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gIH0sXHJcblxyXG4gIC8vICAgU2tpcHBlZExvYW4oKSB7XHJcbiAgLy8gICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAvLyAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSAxO1xyXG4gIC8vICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0sXHJcblxyXG4gIC8vICAgVGFrZW5Mb2FuKCkge1xyXG4gIC8vICAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgLy8gICAgICAgdGhpcy5RdWVzdGlvbklEID0gMjtcclxuICAvLyAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9LFxyXG5cclxuICAvLyAgIElzQmFua3J1cHQoKSB7XHJcbiAgLy8gICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAvLyAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSAzO1xyXG4gIC8vICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0sXHJcblxyXG4gIC8vICAgSXNUdXJuU2tpcCgpIHtcclxuICAvLyAgICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gIC8vICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IDQ7XHJcbiAgLy8gICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSxcclxuXHJcbiAgLy8gICBJc0RvdWJsZVBheURheSgpIHtcclxuICAvLyAgICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gIC8vICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IDU7XHJcbiAgLy8gICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSxcclxuICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgLy8gc3RhcnQgKCkge1xyXG5cclxuICAvLyB9LFxyXG5cclxuICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==