//-------------------------------------------class for Questions-------------------------//
var Questions = cc.Class({
  name: "Questions",
  properties: {
    Question: {
      displayName: "Question",
      type: cc.Text,
      default: "",
      serializable: true,
      tooltip: "Text for the questions",
    },
    Option1: {
      displayName: "Option1",
      type: cc.Text,
      default: "",
      serializable: true,
      tooltip: "Text for the OptionA",
    },
    Option2: {
      displayName: "Option2",
      type: cc.Text,
      default: "",
      serializable: true,
      tooltip: "Text for the OptionB",
    },
    Option3: {
      displayName: "Option3",
      type: cc.Text,
      default: "",
      serializable: true,
      tooltip: "Text for the OptionC",
    },
    Option4: {
      displayName: "Option4",
      type: cc.Text,
      default: "",
      serializable: true,
      tooltip: "Text for the OptionD",
    },

    CorrectOption: {
      displayName: "CorrectOption",
      type: cc.Integer,
      default: 0,
      serializable: true,
      tooltip: "number for the CorrectOption",
    },
  },

  ctor: function () {
    //constructor
  },
});

var QuestionsData = cc.Class({
  name: "QuestionsData",
  extends: cc.Component,

  properties: {
    VocabularyQuestions: {
      default: [],
      type: [Questions],
      serializable: true,
      tooltip: "Questions Related to Vocabulary",
    },
    EstablishmentQuestions: {
      default: [],
      type: [Questions],
      serializable: true,
      tooltip: "Questions Related to Establishing a business",
    },
  },
  //
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  // update (dt) {},
});
