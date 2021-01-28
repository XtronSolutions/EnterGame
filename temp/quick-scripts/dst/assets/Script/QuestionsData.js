
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/QuestionsData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '498c0jnHfZLyZ8L7/Gkx8I7', 'QuestionsData');
// Script/QuestionsData.js

"use strict";

//-------------------------------------------class for Questions-------------------------//
var Questions = cc.Class({
  name: "Questions",
  properties: {
    Question: {
      displayName: "Question",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Text for the questions"
    },
    Option1: {
      displayName: "Option1",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Text for the OptionA"
    },
    Option2: {
      displayName: "Option2",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Text for the OptionB"
    },
    Option3: {
      displayName: "Option3",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Text for the OptionC"
    },
    Option4: {
      displayName: "Option4",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Text for the OptionD"
    },
    CorrectOption: {
      displayName: "CorrectOption",
      type: cc.Integer,
      "default": 0,
      serializable: true,
      tooltip: "number for the CorrectOption"
    }
  },
  ctor: function ctor() {//constructor
  }
});
var QuestionsData = cc.Class({
  name: "QuestionsData",
  "extends": cc.Component,
  properties: {
    VocabularyQuestions: {
      "default": [],
      type: [Questions],
      serializable: true,
      tooltip: "Questions Related to Vocabulary"
    },
    EstablishmentQuestions: {
      "default": [],
      type: [Questions],
      serializable: true,
      tooltip: "Questions Related to Establishing a business"
    }
  },
  //
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxRdWVzdGlvbnNEYXRhLmpzIl0sIm5hbWVzIjpbIlF1ZXN0aW9ucyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlF1ZXN0aW9uIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiVGV4dCIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJPcHRpb24xIiwiT3B0aW9uMiIsIk9wdGlvbjMiLCJPcHRpb240IiwiQ29ycmVjdE9wdGlvbiIsIkludGVnZXIiLCJjdG9yIiwiUXVlc3Rpb25zRGF0YSIsIkNvbXBvbmVudCIsIlZvY2FidWxhcnlRdWVzdGlvbnMiLCJFc3RhYmxpc2htZW50UXVlc3Rpb25zIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3ZCQyxFQUFBQSxJQUFJLEVBQUUsV0FEaUI7QUFFdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxRQUFRLEVBQUU7QUFDUkMsTUFBQUEsV0FBVyxFQUFFLFVBREw7QUFFUkMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLElBRkQ7QUFHUixpQkFBUyxFQUhEO0FBSVJDLE1BQUFBLFlBQVksRUFBRSxJQUpOO0FBS1JDLE1BQUFBLE9BQU8sRUFBRTtBQUxELEtBREE7QUFRVkMsSUFBQUEsT0FBTyxFQUFFO0FBQ1BMLE1BQUFBLFdBQVcsRUFBRSxTQUROO0FBRVBDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxJQUZGO0FBR1AsaUJBQVMsRUFIRjtBQUlQQyxNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQVJDO0FBZVZFLElBQUFBLE9BQU8sRUFBRTtBQUNQTixNQUFBQSxXQUFXLEVBQUUsU0FETjtBQUVQQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sSUFGRjtBQUdQLGlCQUFTLEVBSEY7QUFJUEMsTUFBQUEsWUFBWSxFQUFFLElBSlA7QUFLUEMsTUFBQUEsT0FBTyxFQUFFO0FBTEYsS0FmQztBQXNCVkcsSUFBQUEsT0FBTyxFQUFFO0FBQ1BQLE1BQUFBLFdBQVcsRUFBRSxTQUROO0FBRVBDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxJQUZGO0FBR1AsaUJBQVMsRUFIRjtBQUlQQyxNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQXRCQztBQTZCVkksSUFBQUEsT0FBTyxFQUFFO0FBQ1BSLE1BQUFBLFdBQVcsRUFBRSxTQUROO0FBRVBDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxJQUZGO0FBR1AsaUJBQVMsRUFIRjtBQUlQQyxNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQTdCQztBQXFDVkssSUFBQUEsYUFBYSxFQUFFO0FBQ2JULE1BQUFBLFdBQVcsRUFBRSxlQURBO0FBRWJDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDZSxPQUZJO0FBR2IsaUJBQVMsQ0FISTtBQUliUCxNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFBQSxPQUFPLEVBQUU7QUFMSTtBQXJDTCxHQUZXO0FBZ0R2Qk8sRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQ2hCO0FBQ0Q7QUFsRHNCLENBQVQsQ0FBaEI7QUFxREEsSUFBSUMsYUFBYSxHQUFHakIsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDM0JDLEVBQUFBLElBQUksRUFBRSxlQURxQjtBQUUzQixhQUFTRixFQUFFLENBQUNrQixTQUZlO0FBSTNCZixFQUFBQSxVQUFVLEVBQUU7QUFDVmdCLElBQUFBLG1CQUFtQixFQUFFO0FBQ25CLGlCQUFTLEVBRFU7QUFFbkJiLE1BQUFBLElBQUksRUFBRSxDQUFDUCxTQUFELENBRmE7QUFHbkJTLE1BQUFBLFlBQVksRUFBRSxJQUhLO0FBSW5CQyxNQUFBQSxPQUFPLEVBQUU7QUFKVSxLQURYO0FBT1ZXLElBQUFBLHNCQUFzQixFQUFFO0FBQ3RCLGlCQUFTLEVBRGE7QUFFdEJkLE1BQUFBLElBQUksRUFBRSxDQUFDUCxTQUFELENBRmdCO0FBR3RCUyxNQUFBQSxZQUFZLEVBQUUsSUFIUTtBQUl0QkMsTUFBQUEsT0FBTyxFQUFFO0FBSmE7QUFQZCxHQUplO0FBa0IzQjtBQUNBO0FBRUE7QUFFQVksRUFBQUEsS0F2QjJCLG1CQXVCbkIsQ0FBRSxDQXZCaUIsQ0F5QjNCOztBQXpCMkIsQ0FBVCxDQUFwQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFF1ZXN0aW9ucy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUXVlc3Rpb25zID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUXVlc3Rpb25zXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUXVlc3Rpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUXVlc3Rpb25cIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlRleHQgZm9yIHRoZSBxdWVzdGlvbnNcIixcclxuICAgIH0sXHJcbiAgICBPcHRpb24xOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk9wdGlvbjFcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlRleHQgZm9yIHRoZSBPcHRpb25BXCIsXHJcbiAgICB9LFxyXG4gICAgT3B0aW9uMjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJPcHRpb24yXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJUZXh0IGZvciB0aGUgT3B0aW9uQlwiLFxyXG4gICAgfSxcclxuICAgIE9wdGlvbjM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiT3B0aW9uM1wiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVGV4dCBmb3IgdGhlIE9wdGlvbkNcIixcclxuICAgIH0sXHJcbiAgICBPcHRpb240OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk9wdGlvbjRcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlRleHQgZm9yIHRoZSBPcHRpb25EXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIENvcnJlY3RPcHRpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ29ycmVjdE9wdGlvblwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIGZvciB0aGUgQ29ycmVjdE9wdGlvblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG52YXIgUXVlc3Rpb25zRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlF1ZXN0aW9uc0RhdGFcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFZvY2FidWxhcnlRdWVzdGlvbnM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtRdWVzdGlvbnNdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUXVlc3Rpb25zIFJlbGF0ZWQgdG8gVm9jYWJ1bGFyeVwiLFxyXG4gICAgfSxcclxuICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtRdWVzdGlvbnNdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUXVlc3Rpb25zIFJlbGF0ZWQgdG8gRXN0YWJsaXNoaW5nIGEgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICAvL1xyXG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gIHN0YXJ0KCkge30sXHJcblxyXG4gIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19