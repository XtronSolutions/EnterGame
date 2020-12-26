
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/BusinessDetail');
require('./assets/Script/DecksData');
require('./assets/Script/ExpandBusinessHandler');
require('./assets/Script/GameManager');
require('./assets/Script/GamePlayReferenceManager');
require('./assets/Script/GameplayUIManager');
require('./assets/Script/MultiplayerController');
require('./assets/Script/MultiplayerSyncManager');
require('./assets/Script/PlayerProfileManager');
require('./assets/Script/RoomListHandler');
require('./assets/Script/ServerBackend');
require('./assets/Script/SpaceHandler');
require('./assets/Script/SpacesManager');
require('./assets/Script/TweenManager');
require('./assets/Script/UIManager');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ServerBackend.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1954fdhi6FAgJgMHdTT1rgt', 'ServerBackend');
// Script/ServerBackend.js

"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//-------------------------------------------enumeration for type of business-------------------------//
var ResponseTypeEnum = cc.Enum({
  None: 0,
  Successful: 1,
  UserNotFound: 2,
  InvalidEmailPassword: 3,
  WentWrong: 4
}); //-------------------------------------------class for Student Data-------------------------//

var Student = cc.Class({
  name: "Student",
  properties: {
    name: "",
    dOB: "",
    gradeLevel: "",
    emailAddress: "",
    teacherName: "",
    facebookPage: "",
    gamesWon: 0,
    testsTaken: 0,
    testingAverage: 0,
    gameCash: 0,
    AccessToken: "",
    UpdatedAt: 0,
    userID: ""
  },
  //Deafault and Parametrized constructor
  ctor: function ctor(_name, _dob, _gradeLevel, _emailAddress, _teacherName, _facebookPage, _gamesWon, _testsTaken, _testingAverage, _gameCash) {
    if (_name === void 0) {
      _name = "none";
    }

    if (_dob === void 0) {
      _dob = "none";
    }

    if (_gradeLevel === void 0) {
      _gradeLevel = "none";
    }

    if (_emailAddress === void 0) {
      _emailAddress = "none";
    }

    if (_teacherName === void 0) {
      _teacherName = "none";
    }

    if (_facebookPage === void 0) {
      _facebookPage = "none";
    }

    if (_gamesWon === void 0) {
      _gamesWon = 0;
    }

    if (_testsTaken === void 0) {
      _testsTaken = 0;
    }

    if (_testingAverage === void 0) {
      _testingAverage = 0;
    }

    if (_gameCash === void 0) {
      _gameCash = 0;
    }

    this.name = _name;
    this.dOB = _dob;
    this.gradeLevel = _gradeLevel;
    this.emailAddress = _emailAddress;
    this.teacherName = _teacherName;
    this.facebookPage = _facebookPage;
    this.gamesWon = _gamesWon;
    this.testsTaken = _testsTaken;
    this.testingAverage = _testingAverage;
    this.gameCash = _gameCash;
  }
}); //-------------------------------------------class for Teacher Data-------------------------////

var Teacher = cc.Class({
  name: "Teacher",
  properties: {
    name: "",
    school: "",
    classTaught: 0,
    emailAddress: "",
    contactNumber: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _school, _classTaught, _emailAddress, _contactNumber) {
    if (_name === void 0) {
      _name = "none";
    }

    if (_school === void 0) {
      _school = "none";
    }

    if (_classTaught === void 0) {
      _classTaught = 0;
    }

    if (_emailAddress === void 0) {
      _emailAddress = "none";
    }

    if (_contactNumber === void 0) {
      _contactNumber = "none";
    }

    this.name = _name;
    this.school = _school;
    this.classTaught = _classTaught;
    this.emailAddress = _emailAddress;
    this.contactNumber = _contactNumber;
  }
}); //-------------------------------------------class for Program Ambassadors Data-------------------------////

var ProgramAmbassadors = cc.Class({
  name: "ProgramAmbassadors",
  properties: {
    name: "",
    emailAddress: "",
    contactNumber: "",
    address: ""
  },
  //Deafult and Parametrized constructor
  ctor: function ctor(_name, _emailAddress, _contactNumber, _address) {
    if (_name === void 0) {
      _name = "none";
    }

    if (_emailAddress === void 0) {
      _emailAddress = "none";
    }

    if (_contactNumber === void 0) {
      _contactNumber = "none";
    }

    if (_address === void 0) {
      _address = "none";
    }

    this.name = _name;
    this.emailAddress = _emailAddress;
    this.contactNumber = _contactNumber;
    this.address = _address;
  }
}); //-------------------------------------------class for School Administrators Data-------------------------////

var SchoolAdministrators = cc.Class({
  name: "SchoolAdministrators",
  properties: {
    name: "",
    schoolName: "",
    contactNumber: "",
    emailAddress: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _schoolName, _emailAddress, _contactNumber) {
    if (_name === void 0) {
      _name = "none";
    }

    if (_schoolName === void 0) {
      _schoolName = "none";
    }

    if (_emailAddress === void 0) {
      _emailAddress = "none";
    }

    if (_contactNumber === void 0) {
      _contactNumber = "none";
    }

    this.name = _name;
    this.schoolName = _schoolName;
    this.contactNumber = _contactNumber;
    this.emailAddress = _emailAddress;
  }
}); //-------------------------------------------class for Program Directors Data-------------------------////

var ProgramDirectors = cc.Class({
  name: "ProgramDirectors",
  properties: {
    name: "",
    emailAddress: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _emailAddress) {
    if (_name === void 0) {
      _name = "none";
    }

    if (_emailAddress === void 0) {
      _emailAddress = "none";
    }

    this.name = _name;
    this.emailAddress = _emailAddress;
  }
}); //-------------------------------------------class for ServerBackend-------------------------//

var ServerBackend = cc.Class({
  name: "ServerBackend",
  "extends": cc.Component,
  properties: {
    StudentData: {
      "default": null,
      type: Student,
      serializable: true,
      tooltip: "current logged in student data"
    },
    ResponseType: {
      displayName: "Response",
      type: ResponseTypeEnum,
      "default": ResponseTypeEnum.None,
      serializable: true,
      tooltip: "ResponseType catogory for api's"
    }
  },
  statics: {
    //creating static instance of the class
    Instance: null
  },
  RemovePersistNode: function RemovePersistNode() {
    ServerBackend.Instance = null;
    cc.game.removePersistRootNode(this.node);
  },
  onLoad: function onLoad() {
    if (!ServerBackend.Instance) {
      ServerBackend.Instance = this;
      cc.game.addPersistRootNode(this.node);
      this.StudentData = new Student();
      console.error("creating instance " + this.node.name);
    } //private variables


    this.getUserAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/getUser";
    this.loginUserAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/loginUser"; // this.GetUserData("xtrondev@gmail.com","Student");
  },
  GetUserData: function GetUserData(_email, _role) {
    var payload = new UserPayload(_email, _role);
    this.CallRESTAPI(this.getUserAPI, "POST", payload, 1);
  },
  LoginUser: function LoginUser(_email, _password, _role) {
    var payload = new UserLoginPayload(_email, _password, _role);
    this.CallRESTAPI(this.loginUserAPI, "POST", payload, 2);
  },
  Fetch: function Fetch(_url, _method, _requestBody) {
    if (_method == "GET") {
      return fetch(_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        method: _method
      });
    } else {
      return fetch(_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        method: _method,
        body: JSON.stringify(_requestBody)
      });
    }
  },
  CallRESTAPI: function CallRESTAPI(_url, _method, _requestBody, _type) {
    Fetch_Promise(_url, _method, _requestBody);

    function Fetch_Promise(_x, _x2, _x3) {
      return _Fetch_Promise.apply(this, arguments);
    } //#region Commented
    // fetch(
    //     _url, 
    //     {
    //         headers: { "Content-Type": "application/json; charset=utf-8" },
    //         method: _method,
    //         body: JSON.stringify(_requestBody)
    //     }
    //   )
    //   .then(response=>{
    //       response.json().then(data=>{
    //         //console.log(data);
    //         //return data; 
    //     }); 
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    //#endregion


    function _Fetch_Promise() {
      _Fetch_Promise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_url, _method, _requestBody) {
        var Response, TempData, MainData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return ServerBackend.Instance.Fetch(_url, _method, _requestBody);

              case 3:
                Response = _context.sent;
                _context.next = 6;
                return Response.json();

              case 6:
                TempData = _context.sent;

                if (_type == 1) //getting user data
                  {
                    MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
                    console.log(TempData);

                    if (MainData.message.includes("SUCCESS")) {
                      console.log("got data successfully");
                      console.log(MainData);

                      if (MainData.data.roleType.includes("Student")) {
                        ServerBackend.Instance.AssignStudentData(MainData, false); //cc.systemEvent.emit("AssignProfileData");
                      } else if (MainData.data.roleType.includes("Teacher")) {}
                    }
                  } else if (_type == 2) //login user
                  {
                    MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
                    console.log(TempData);

                    if (MainData.message.includes("sucessfully")) {
                      console.log("user logged in successfully");
                      console.log(MainData);

                      if (MainData.data.roleType.includes("Student")) {
                        ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                        ServerBackend.Instance.AssignStudentData(MainData, true);
                        cc.systemEvent.emit("AssignProfileData");
                      } else if (MainData.data.roleType.includes("Teacher")) {}
                    } else if (MainData.message.includes("wrong") || MainData.message.includes("characters")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.InvalidEmailPassword;
                      cc.systemEvent.emit("AssignProfileData");
                    } else if (MainData.message.includes("Data not Found!")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.UserNotFound;
                      cc.systemEvent.emit("AssignProfileData");
                    }
                  }

                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                if (_type == 2) //login user error
                  {
                    ServerBackend.Instance.ResponseType = ResponseTypeEnum.WentWrong;
                    cc.systemEvent.emit("AssignProfileData");
                  }

                console.error(_context.t0);

              case 14:
                _context.prev = 14;
                return _context.finish(14);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10, 14, 16]]);
      }));
      return _Fetch_Promise.apply(this, arguments);
    }
  },
  AssignStudentData: function AssignStudentData(DataResponse, isLoggedIn) {
    this.StudentData.name = DataResponse.data.name;
    this.StudentData.dOB = DataResponse.data.doB;
    this.StudentData.gradeLevel = DataResponse.data.gradeLevel;
    this.StudentData.emailAddress = DataResponse.data.SK;
    this.StudentData.teacherName = DataResponse.data.teacherName;
    this.StudentData.facebookPage = DataResponse.data.fbPage;
    this.StudentData.gamesWon = DataResponse.data.gamesWon;
    this.StudentData.testsTaken = DataResponse.data.testTaken;
    this.StudentData.testingAverage = DataResponse.data.testingAverage;
    this.StudentData.gameCash = DataResponse.data.inGameCash;
    this.StudentData.userID = DataResponse.data.userID;

    if (isLoggedIn) {
      this.StudentData.AccessToken = DataResponse.data.userToken;
      this.StudentData.UpdatedAt = DataResponse.data.updatedAt;
    }

    console.log(this.StudentData);
  },
  start: function start() {}
}); //-------------------------------------------class for sending payload to receive data-------------------------//

var UserPayload = cc.Class({
  name: "UserPayload",
  properties: {
    email: "",
    role: ""
  },
  //Deafault and Parametrized constructor
  ctor: function ctor(_email, _role) {
    if (_email === void 0) {
      _email = 'none';
    }

    if (_role === void 0) {
      _role = "none";
    }

    this.email = _email;
    this.role = _role;
  }
}); //-------------------------------------------class for User Data-------------------------//

var Data = cc.Class({
  name: "Data",
  properties: {
    inGameCash: "",
    LSK: "",
    userToken: "",
    classTaught: "",
    contactNumber: "",
    schoolName: "",
    gamesWon: "",
    createdAt: 0,
    isDeleted: false,
    TableName: "",
    gradeLevel: "",
    name: "",
    roleType: "",
    password: "",
    fbPage: "",
    updatedAt: 0,
    teacherName: "",
    doB: "",
    SK: "",
    testTaken: "",
    PK: "",
    testingAverage: "",
    userID: ""
  }
}); //-------------------------------------------root class of response received when getting user api is hit-------------------------//

var UserDataResponse = cc.Class({
  name: "UserDataResponse",
  properties: {
    statusCode: "",
    message: "",
    data: Data
  },
  //Deafault and Parametrized constructor
  ctor: function ctor(_statusCode, _message, _data) {
    if (_statusCode === void 0) {
      _statusCode = "none";
    }

    if (_message === void 0) {
      _message = "none";
    }

    if (_data === void 0) {
      _data = null;
    }

    this.statusCode = _statusCode;
    this.message = _message;
    this.data = _data;
  }
}); //-------------------------------------------class for sending payload to login user-------------------------------//

var UserLoginPayload = cc.Class({
  name: "UserLoginPayload",
  properties: {
    email: "",
    password: "",
    role: ""
  },
  //Deafault and Parametrized constructor
  ctor: function ctor(_email, _password, _role) {
    if (_email === void 0) {
      _email = 'none';
    }

    if (_password === void 0) {
      _password = "none";
    }

    if (_role === void 0) {
      _role = "none";
    }

    this.email = _email;
    this.password = _password;
    this.role = _role;
  }
});
module.exports = ServerBackend;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlVHlwZUVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiU3VjY2Vzc2Z1bCIsIlVzZXJOb3RGb3VuZCIsIkludmFsaWRFbWFpbFBhc3N3b3JkIiwiV2VudFdyb25nIiwiU3R1ZGVudCIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJkT0IiLCJncmFkZUxldmVsIiwiZW1haWxBZGRyZXNzIiwidGVhY2hlck5hbWUiLCJmYWNlYm9va1BhZ2UiLCJnYW1lc1dvbiIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiQWNjZXNzVG9rZW4iLCJVcGRhdGVkQXQiLCJ1c2VySUQiLCJjdG9yIiwiX25hbWUiLCJfZG9iIiwiX2dyYWRlTGV2ZWwiLCJfZW1haWxBZGRyZXNzIiwiX3RlYWNoZXJOYW1lIiwiX2ZhY2Vib29rUGFnZSIsIl9nYW1lc1dvbiIsIl90ZXN0c1Rha2VuIiwiX3Rlc3RpbmdBdmVyYWdlIiwiX2dhbWVDYXNoIiwiVGVhY2hlciIsInNjaG9vbCIsImNsYXNzVGF1Z2h0IiwiY29udGFjdE51bWJlciIsIl9zY2hvb2wiLCJfY2xhc3NUYXVnaHQiLCJfY29udGFjdE51bWJlciIsIlByb2dyYW1BbWJhc3NhZG9ycyIsImFkZHJlc3MiLCJfYWRkcmVzcyIsIlNjaG9vbEFkbWluaXN0cmF0b3JzIiwic2Nob29sTmFtZSIsIl9zY2hvb2xOYW1lIiwiUHJvZ3JhbURpcmVjdG9ycyIsIlNlcnZlckJhY2tlbmQiLCJDb21wb25lbnQiLCJTdHVkZW50RGF0YSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUmVzcG9uc2VUeXBlIiwiZGlzcGxheU5hbWUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiY29uc29sZSIsImVycm9yIiwiZ2V0VXNlckFQSSIsImxvZ2luVXNlckFQSSIsIkdldFVzZXJEYXRhIiwiX2VtYWlsIiwiX3JvbGUiLCJwYXlsb2FkIiwiVXNlclBheWxvYWQiLCJDYWxsUkVTVEFQSSIsIkxvZ2luVXNlciIsIl9wYXNzd29yZCIsIlVzZXJMb2dpblBheWxvYWQiLCJGZXRjaCIsIl91cmwiLCJfbWV0aG9kIiwiX3JlcXVlc3RCb2R5IiwiZmV0Y2giLCJoZWFkZXJzIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJfdHlwZSIsIkZldGNoX1Byb21pc2UiLCJSZXNwb25zZSIsImpzb24iLCJUZW1wRGF0YSIsIk1haW5EYXRhIiwiVXNlckRhdGFSZXNwb25zZSIsInN0YXR1c0NvZGUiLCJtZXNzYWdlIiwiZGF0YSIsImxvZyIsImluY2x1ZGVzIiwicm9sZVR5cGUiLCJBc3NpZ25TdHVkZW50RGF0YSIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIkRhdGFSZXNwb25zZSIsImlzTG9nZ2VkSW4iLCJkb0IiLCJTSyIsImZiUGFnZSIsInRlc3RUYWtlbiIsImluR2FtZUNhc2giLCJ1c2VyVG9rZW4iLCJ1cGRhdGVkQXQiLCJzdGFydCIsImVtYWlsIiwicm9sZSIsIkRhdGEiLCJMU0siLCJjcmVhdGVkQXQiLCJpc0RlbGV0ZWQiLCJUYWJsZU5hbWUiLCJwYXNzd29yZCIsIlBLIiwiX3N0YXR1c0NvZGUiLCJfbWVzc2FnZSIsIl9kYXRhIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxnQkFBZ0IsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDM0JDLEVBQUFBLElBQUksRUFBQyxDQURzQjtBQUUzQkMsRUFBQUEsVUFBVSxFQUFFLENBRmU7QUFHM0JDLEVBQUFBLFlBQVksRUFBRSxDQUhhO0FBSTNCQyxFQUFBQSxvQkFBb0IsRUFBRSxDQUpLO0FBSzNCQyxFQUFBQSxTQUFTLEVB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Ly0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUmVzcG9uc2VUeXBlRW51bSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgU3VjY2Vzc2Z1bDogMSwgICAgICAgICAgIFxyXG4gICAgVXNlck5vdEZvdW5kOiAyLFxyXG4gICAgSW52YWxpZEVtYWlsUGFzc3dvcmQ6IDMsXHJcbiAgICBXZW50V3Jvbmc6NCAgICAgICAgICAgICAgXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3R1ZGVudCBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdHVkZW50ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlN0dWRlbnRcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIGRPQjogXCJcIixcclxuICAgICAgICBncmFkZUxldmVsOiBcIlwiLFxyXG4gICAgICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgICAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgICAgICBmYWNlYm9va1BhZ2U6IFwiXCIsXHJcbiAgICAgICAgZ2FtZXNXb246IDAsXHJcbiAgICAgICAgdGVzdHNUYWtlbjogMCxcclxuICAgICAgICB0ZXN0aW5nQXZlcmFnZTogMCxcclxuICAgICAgICBnYW1lQ2FzaDogMCxcclxuICAgICAgICBBY2Nlc3NUb2tlbjpcIlwiLFxyXG4gICAgICAgIFVwZGF0ZWRBdDowLFxyXG4gICAgICAgIHVzZXJJRDpcIlwiXHJcbiAgICB9LFxyXG4vL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICAgIGN0b3I6IGZ1bmN0aW9uXHJcbiAgICAgICAgKFxyXG4gICAgICAgICAgICBfbmFtZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfZG9iID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9ncmFkZUxldmVsID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX3RlYWNoZXJOYW1lID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9mYWNlYm9va1BhZ2UgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2dhbWVzV29uID0gMCxcclxuICAgICAgICAgICAgX3Rlc3RzVGFrZW4gPSAwLFxyXG4gICAgICAgICAgICBfdGVzdGluZ0F2ZXJhZ2UgPSAwLFxyXG4gICAgICAgICAgICBfZ2FtZUNhc2ggPSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICAgICAgdGhpcy5kT0IgPSBfZG9iO1xyXG4gICAgICAgIHRoaXMuZ3JhZGVMZXZlbCA9IF9ncmFkZUxldmVsO1xyXG4gICAgICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLnRlYWNoZXJOYW1lID0gX3RlYWNoZXJOYW1lO1xyXG4gICAgICAgIHRoaXMuZmFjZWJvb2tQYWdlID0gX2ZhY2Vib29rUGFnZTtcclxuICAgICAgICB0aGlzLmdhbWVzV29uID0gX2dhbWVzV29uO1xyXG4gICAgICAgIHRoaXMudGVzdHNUYWtlbiA9IF90ZXN0c1Rha2VuO1xyXG4gICAgICAgIHRoaXMudGVzdGluZ0F2ZXJhZ2UgPSBfdGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICAgICAgdGhpcy5nYW1lQ2FzaCA9IF9nYW1lQ2FzaDtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFRlYWNoZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBUZWFjaGVyID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJUZWFjaGVyXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBzY2hvb2w6IFwiXCIsXHJcbiAgICAgICAgY2xhc3NUYXVnaHQ6IDAsXHJcbiAgICAgICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICB9LFxyXG4gICAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICAgIGN0b3I6IGZ1bmN0aW9uXHJcbiAgICAgICAgKF9uYW1lID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9zY2hvb2wgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2NsYXNzVGF1Z2h0ID0gMCxcclxuICAgICAgICAgICAgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfY29udGFjdE51bWJlciA9IFwibm9uZVwiXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICAgICAgdGhpcy5zY2hvb2wgPSBfc2Nob29sO1xyXG4gICAgICAgIHRoaXMuY2xhc3NUYXVnaHQgPSBfY2xhc3NUYXVnaHQ7XHJcbiAgICAgICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIEFtYmFzc2Fkb3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgUHJvZ3JhbUFtYmFzc2Fkb3JzID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJQcm9ncmFtQW1iYXNzYWRvcnNcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgICAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgICAgIGFkZHJlc3M6IFwiXCIsXHJcbiAgICB9LFxyXG4gICAgLy9EZWFmdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICAgIGN0b3I6IGZ1bmN0aW9uXHJcbiAgICAgICAgKF9uYW1lID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2NvbnRhY3ROdW1iZXIgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2FkZHJlc3MgPSBcIm5vbmVcIlxyXG4gICAgICAgICkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgICAgICB0aGlzLmFkZHJlc3MgPSBfYWRkcmVzcztcclxuICAgIH1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2Nob29sIEFkbWluaXN0cmF0b3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgU2Nob29sQWRtaW5pc3RyYXRvcnMgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlNjaG9vbEFkbWluaXN0cmF0b3JzXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBzY2hvb2xOYW1lOiBcIlwiLFxyXG4gICAgICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICAgICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgfSxcclxuICAgIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChfbmFtZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfc2Nob29sTmFtZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9jb250YWN0TnVtYmVyID0gXCJub25lXCJcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgICAgICB0aGlzLnNjaG9vbE5hbWUgPSBfc2Nob29sTmFtZTtcclxuICAgICAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgICAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2dyYW0gRGlyZWN0b3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgUHJvZ3JhbURpcmVjdG9ycyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiUHJvZ3JhbURpcmVjdG9yc1wiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgfSxcclxuICAgIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChfbmFtZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfZW1haWxBZGRyZXNzID0gXCJub25lXCJcclxuICAgICAgICApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICAgICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZXJ2ZXJCYWNrZW5kLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZXJ2ZXJCYWNrZW5kPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJTZXJ2ZXJCYWNrZW5kXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgU3R1ZGVudERhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFN0dWRlbnQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBzdHVkZW50IGRhdGFcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgUmVzcG9uc2VUeXBlOntcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJSZXNwb25zZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBSZXNwb25zZVR5cGVFbnVtLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBSZXNwb25zZVR5cGVFbnVtLk5vbmUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlc3BvbnNlVHlwZSBjYXRvZ29yeSBmb3IgYXBpJ3NcIix9LCBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgICBJbnN0YW5jZTogbnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2U9bnVsbDtcclxuICAgICAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYoIVNlcnZlckJhY2tlbmQuSW5zdGFuY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3R1ZGVudERhdGE9bmV3IFN0dWRlbnQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNyZWF0aW5nIGluc3RhbmNlIFwiK3RoaXMubm9kZS5uYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSB2YXJpYWJsZXNcclxuICAgICAgICB0aGlzLmdldFVzZXJBUEk9XCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2dldFVzZXJcIjtcclxuICAgICAgICB0aGlzLmxvZ2luVXNlckFQST1cImh0dHBzOi8vaWEzbnFrcDZ0aC5leGVjdXRlLWFwaS51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9kZXYvbG9naW5Vc2VyXCI7XHJcblxyXG4gICAgICAgLy8gdGhpcy5HZXRVc2VyRGF0YShcInh0cm9uZGV2QGdtYWlsLmNvbVwiLFwiU3R1ZGVudFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgR2V0VXNlckRhdGEoX2VtYWlsLF9yb2xlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBwYXlsb2FkPW5ldyBVc2VyUGF5bG9hZChfZW1haWwsX3JvbGUpO1xyXG4gICAgICAgIHRoaXMuQ2FsbFJFU1RBUEkoIHRoaXMuZ2V0VXNlckFQSSxcIlBPU1RcIixwYXlsb2FkLDEpOyAgICBcclxuICAgIH0sXHJcblxyXG4gICAgTG9naW5Vc2VyKF9lbWFpbCxfcGFzc3dvcmQsX3JvbGUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHBheWxvYWQ9bmV3IFVzZXJMb2dpblBheWxvYWQoX2VtYWlsLF9wYXNzd29yZCxfcm9sZSk7XHJcbiAgICAgICAgdGhpcy5DYWxsUkVTVEFQSSggdGhpcy5sb2dpblVzZXJBUEksXCJQT1NUXCIscGF5bG9hZCwyKTsgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIEZldGNoKF91cmwsX21ldGhvZCxfcmVxdWVzdEJvZHkpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX21ldGhvZD09XCJHRVRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChcclxuICAgICAgICAgICAgICAgIF91cmwsIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKFxyXG4gICAgICAgICAgICAgICAgX3VybCwgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBDYWxsUkVTVEFQSShfdXJsLF9tZXRob2QsX3JlcXVlc3RCb2R5LF90eXBlKSB7XHJcbiAgICAgICAgRmV0Y2hfUHJvbWlzZShfdXJsLF9tZXRob2QsX3JlcXVlc3RCb2R5KTtcclxuICAgICAgICBhc3luYyBmdW5jdGlvbiBGZXRjaF9Qcm9taXNlKF91cmwsX21ldGhvZCxfcmVxdWVzdEJvZHkpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBSZXNwb25zZT1hd2FpdCBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkZldGNoKF91cmwsX21ldGhvZCxfcmVxdWVzdEJvZHkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIFRlbXBEYXRhPWF3YWl0IFJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoX3R5cGU9PTEpIC8vZ2V0dGluZyB1c2VyIGRhdGFcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgTWFpbkRhdGE9bmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSxUZW1wRGF0YS5tZXNzYWdlLFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiU1VDQ0VTU1wiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IGRhdGEgc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhNYWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihfdHlwZT09MikgLy9sb2dpbiB1c2VyXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIE1haW5EYXRhPW5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsVGVtcERhdGEubWVzc2FnZSxUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcInN1Y2Vzc2Z1bGx5XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlPVJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduU3R1ZGVudERhdGEoTWFpbkRhdGEsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiVGVhY2hlclwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSAgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIndyb25nXCIpIHx8TWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcImNoYXJhY3RlcnNcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIkRhdGEgbm90IEZvdW5kIVwiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlPVJlc3BvbnNlVHlwZUVudW0uVXNlck5vdEZvdW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfdHlwZT09MikgLy9sb2dpbiB1c2VyIGVycm9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGU9UmVzcG9uc2VUeXBlRW51bS5XZW50V3Jvbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAvLyAgY29uc29sZS5sb2coJ1dlIGRvIGNsZWFudXAgaGVyZScpO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNyZWdpb24gQ29tbWVudGVkXHJcbiAgICAgICAgLy8gZmV0Y2goXHJcbiAgICAgICAgLy8gICAgIF91cmwsIFxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgLy8gICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgIClcclxuICAgICAgICAvLyAgIC50aGVuKHJlc3BvbnNlPT57XHJcbiAgICAgICAgLy8gICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vcmV0dXJuIGRhdGE7IFxyXG4gICAgICAgIC8vICAgICB9KTsgXHJcbiAgICAgICAgLy8gICB9KVxyXG4gICAgICAgIC8vICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIC8vICAgfSk7XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnblN0dWRlbnREYXRhKERhdGFSZXNwb25zZSxpc0xvZ2dlZEluKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEubmFtZT1EYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEuZE9CPURhdGFSZXNwb25zZS5kYXRhLmRvQjtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmdyYWRlTGV2ZWw9RGF0YVJlc3BvbnNlLmRhdGEuZ3JhZGVMZXZlbDtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmVtYWlsQWRkcmVzcz1EYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLnRlYWNoZXJOYW1lPURhdGFSZXNwb25zZS5kYXRhLnRlYWNoZXJOYW1lO1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEuZmFjZWJvb2tQYWdlPURhdGFSZXNwb25zZS5kYXRhLmZiUGFnZTtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVzV29uPURhdGFSZXNwb25zZS5kYXRhLmdhbWVzV29uO1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEudGVzdHNUYWtlbj1EYXRhUmVzcG9uc2UuZGF0YS50ZXN0VGFrZW47XHJcbiAgICAgICAgdGhpcy5TdHVkZW50RGF0YS50ZXN0aW5nQXZlcmFnZT1EYXRhUmVzcG9uc2UuZGF0YS50ZXN0aW5nQXZlcmFnZTtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVDYXNoPURhdGFSZXNwb25zZS5kYXRhLmluR2FtZUNhc2g7XHJcbiAgICAgICAgdGhpcy5TdHVkZW50RGF0YS51c2VySUQ9RGF0YVJlc3BvbnNlLmRhdGEudXNlcklEO1xyXG5cclxuICAgICAgICBpZihpc0xvZ2dlZEluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TdHVkZW50RGF0YS5BY2Nlc3NUb2tlbj1EYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgICAgICAgIHRoaXMuU3R1ZGVudERhdGEuVXBkYXRlZEF0PURhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlN0dWRlbnREYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge30sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHNlbmRpbmcgcGF5bG9hZCB0byByZWNlaXZlIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJQYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlVzZXJQYXlsb2FkXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgICAgcm9sZTogXCJcIixcclxuICAgIH0sXHJcbi8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gICAgY3RvcjogZnVuY3Rpb25cclxuICAgICAgICAoXHJcbiAgICAgICAgICAgIF9lbWFpbD0gJ25vbmUnLFxyXG4gICAgICAgICAgICBfcm9sZT0gXCJub25lXCJcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgICAgIHRoaXMucm9sZSA9IF9yb2xlOyAgXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVc2VyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERhdGEgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiRGF0YVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGluR2FtZUNhc2g6IFwiXCIsXHJcbiAgICAgICAgTFNLOiBcIlwiLFxyXG4gICAgICAgIHVzZXJUb2tlbjpcIlwiLFxyXG4gICAgICAgIGNsYXNzVGF1Z2h0OlwiXCIsXHJcbiAgICAgICAgY29udGFjdE51bWJlcjpcIlwiLFxyXG4gICAgICAgIHNjaG9vbE5hbWU6XCJcIixcclxuICAgICAgICBnYW1lc1dvbjpcIlwiLFxyXG4gICAgICAgIGNyZWF0ZWRBdDowLFxyXG4gICAgICAgIGlzRGVsZXRlZDpmYWxzZSxcclxuICAgICAgICBUYWJsZU5hbWU6XCJcIixcclxuICAgICAgICBncmFkZUxldmVsOlwiXCIsXHJcbiAgICAgICAgbmFtZTpcIlwiLFxyXG4gICAgICAgIHJvbGVUeXBlOlwiXCIsXHJcbiAgICAgICAgcGFzc3dvcmQ6XCJcIixcclxuICAgICAgICBmYlBhZ2U6XCJcIixcclxuICAgICAgICB1cGRhdGVkQXQ6MCxcclxuICAgICAgICB0ZWFjaGVyTmFtZTpcIlwiLFxyXG4gICAgICAgIGRvQjpcIlwiLFxyXG4gICAgICAgIFNLOlwiXCIsXHJcbiAgICAgICAgdGVzdFRha2VuOlwiXCIsXHJcbiAgICAgICAgUEs6XCJcIixcclxuICAgICAgICB0ZXN0aW5nQXZlcmFnZTpcIlwiLFxyXG4gICAgICAgIHVzZXJJRDpcIlwiXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXJvb3QgY2xhc3Mgb2YgcmVzcG9uc2UgcmVjZWl2ZWQgd2hlbiBnZXR0aW5nIHVzZXIgYXBpIGlzIGhpdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckRhdGFSZXNwb25zZSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJVc2VyRGF0YVJlc3BvbnNlXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogXCJcIixcclxuICAgICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICAgIGRhdGE6RGF0YVxyXG4gICAgfSxcclxuLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChcclxuICAgICAgICAgICAgX3N0YXR1c0NvZGU9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfbWVzc2FnZT0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9kYXRhPW51bGxcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLnN0YXR1c0NvZGUgPSBfc3RhdHVzQ29kZTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBfbWVzc2FnZTtcclxuICAgICAgICB0aGlzLmRhdGE9X2RhdGE7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBzZW5kaW5nIHBheWxvYWQgdG8gbG9naW4gdXNlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckxvZ2luUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJVc2VyTG9naW5QYXlsb2FkXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgICAgcGFzc3dvcmQ6XCJcIixcclxuICAgICAgICByb2xlOiBcIlwiLFxyXG4gICAgfSxcclxuLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChcclxuICAgICAgICAgICAgX2VtYWlsPSAnbm9uZScsXHJcbiAgICAgICAgICAgIF9wYXNzd29yZD1cIm5vbmVcIixcclxuICAgICAgICAgICAgX3JvbGU9IFwibm9uZVwiXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gX3Bhc3N3b3JkO1xyXG4gICAgICAgIHRoaXMucm9sZSA9IF9yb2xlOyAgXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzPSBTZXJ2ZXJCYWNrZW5kO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/UIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a9f82II+PtD3bbDNSBZacU7', 'UIManager');
// Script/UIManager.js

"use strict";

var _TweenManager = _interopRequireDefault(require("TweenManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GamePlayReferenceManager = null;
var TweenRef;
var TotalRoom = []; //-------------------------------------------class for Profile UI-------------------------//

var ProfileUI = cc.Class({
  name: "ProfileUI",
  properties: {
    NameLabel: {
      displayName: "Name",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to name label of profile"
    },
    EmailAddressLabel: {
      displayName: "EmailAddress",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference for email address label of profile "
    },
    DOBLabel: {
      displayName: "DOB",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to DOB label of profile"
    },
    GradeLevelLabel: {
      displayName: "GradeLevel",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Grade Level label of profile"
    },
    TeacherNameLabel: {
      displayName: "TeacherName",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Teacher Name label of profile"
    },
    GamesWonLabel: {
      displayName: "GamesWon",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to games won label of profile"
    },
    FBPageLabel: {
      displayName: "FBPage",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to facebook page label of profile"
    },
    TestTakenLabel: {
      displayName: "TestTaken",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to test taken label of profile"
    },
    TestingAvgLabel: {
      displayName: "TestingAverage",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Testing Average label of profile"
    },
    CashLabel: {
      displayName: "Cash",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to cash label of profile"
    },
    StatusNode: {
      displayName: "StatusScreen",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to Status Screen of profile"
    },
    PlayButtonNode: {
      displayName: "PlayButton",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to play button of profile"
    },
    StatusLabel: {
      displayName: "StatusText",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Status label of profile"
    },
    PlayerCountInput: {
      displayName: "PlayerCountInput",
      "default": null,
      type: cc.EditBox,
      serializable: true,
      tooltip: "reference to PlayerCountInput of profile"
    }
  }
}); //-------------------------------------------class for SpectateUI-------------------------//

var SpectateUI = cc.Class({
  name: "SpectateUI",
  properties: {
    RoomScreenNode: {
      displayName: "RoomScreen",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Reference to the node of room screen"
    },
    ScrollBarContent: {
      displayName: "ScrollBarContent",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Reference to the node of ScrollBarContent of room screen"
    },
    ProfileScreenNode: {
      displayName: "ProfileScreen",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Reference to the node of profile screen"
    },
    RoomPrefab: {
      displayName: "RoomPrefab",
      "default": null,
      type: cc.Prefab,
      serializable: true,
      tooltip: "Reference to the prefab of Room on room screen"
    }
  }
}); //-------------------------------------------class for UIManager-------------------------//

var UIManager = cc.Class({
  name: "UIManager",
  "extends": cc.Component,
  properties: {
    UIProfile: {
      displayName: "UIProfile",
      "default": null,
      type: ProfileUI,
      serializable: true,
      tooltip: "reference to ProfileUI class intance"
    },
    ScreenNodes: {
      displayName: "ScreenNodes",
      "default": [],
      type: [cc.Node],
      serializable: true,
      tooltip: "reference to login screen node"
    },
    TweenManagerRef: {
      displayName: "TweenManagerRef",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for Tween Manager Script "
    },
    Logo: {
      displayName: "LogoNode",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the logo node"
    },
    ToastNode: {
      displayName: "ToastNode",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the toast node"
    },
    LoadingNode: {
      displayName: "LoadingNode",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the Loading Node"
    },
    ReferenceManagerRef: {
      displayName: "ReferenceManagerRef",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the reference manager node"
    },
    UISpectate: {
      displayName: "UISpectate",
      "default": null,
      type: SpectateUI,
      serializable: true,
      tooltip: "reference to SpectateUI class intance"
    }
  },
  statics: {
    //creating static instance of the class
    Instance: null
  },
  onEnable: function onEnable() {
    //events subscription to be called 
    cc.systemEvent.on('AssignProfileData', this.AssignProfileData, this);
    cc.systemEvent.on('UpdateStatusWindow', this.UpdateStatusWindow, this);
    cc.systemEvent.on('ChangePanelScreen', this.ChangePanelScreen, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off('AssignProfileData', this.AssignProfileData, this);
    cc.systemEvent.off('UpdateStatusWindow', this.UpdateStatusWindow, this);
    cc.systemEvent.off('ChangePanelScreen', this.ChangePanelScreen, this);
  },
  onLoad: function onLoad() {
    this.ReferenceManagerRef = this.ReferenceManagerRef.getComponent("GamePlayReferenceManager");
    UIManager.Instance = this;
    TotalRoom = []; //Private Variables

    this.EmailText = "";
    this.PasswordText = "";
    this.nodeCounter = 0;
    this.StatusText = "";
    this.TotalPlayers = "";
    this.ResetPlayerCountInput();
    this.GetTweenManagerReference();
    this.SlideInLoginComponents();
    this.RepeatLogoAnimation();
    this.CheckReferences();
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  start: function start() {},
  ChangePanelScreen: function ChangePanelScreen(isNext, changeScreen, sceneName) {
    var _this = this;

    TweenRef.FadeNodeInOut(this.ScreenNodes[this.nodeCounter], 0.55, 255, 0, "quadInOut");

    if (changeScreen == false) {
      if (isNext == true) {
        if (this.nodeCounter < this.ScreenNodes.length) this.nodeCounter = this.nodeCounter + 1;
      } else {
        if (this.nodeCounter > 0) this.nodeCounter = this.nodeCounter - 1;
      }

      setTimeout(function () {
        _this.ManipulateNodes(_this.nodeCounter);
      }, 600);
    } else {
      setTimeout(function () {
        cc.director.loadScene(sceneName);
      }, 600);
    }
  },
  ManipulateNodes: function ManipulateNodes(counter) {
    for (var index = 0; index < this.ScreenNodes.length; index++) {
      if (counter == index) {
        this.ScreenNodes[index].active = true;
        console.log("seting it true");
        TweenRef.FadeNodeInOut(this.ScreenNodes[index], 1.5, 0, 255, "quadInOut");
      } else {
        this.ScreenNodes[index].active = false;
      }
    }
  },
  SlideInLoginComponents: function SlideInLoginComponents() {
    TweenRef.LoginScreenTween(this.ScreenNodes[this.nodeCounter].children[1], -1000);
  },
  RepeatLogoAnimation: function RepeatLogoAnimation() {
    TweenRef.RepeatTweenScale(this.Logo, 1.1, 1, 0.8);
  },
  GetTweenManagerReference: function GetTweenManagerReference() {
    TweenRef = this.TweenManagerRef.getComponent("TweenManager");
  },
  ResetPlayerCountInput: function ResetPlayerCountInput() {
    this.UIProfile.PlayerCountInput.string = "";
    this.TotalPlayers = "";
  },
  OnplayerNumberChanged: function OnplayerNumberChanged(_number) {
    this.TotalPlayers = _number;
  },
  PlayGame: function PlayGame() {
    if (this.TotalPlayers == "") {
      this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.", 3500);
    } else {
      var _players = parseInt(this.TotalPlayers);

      if (_players >= 2 && _players <= 6) {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleShowRoom_Bool(false);
        this.UIProfile.StatusNode.active = true; //this.UIProfile.PlayButtonNode.active=false;

        this.UIProfile.StatusLabel.string = "";
        GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = _players;

        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isConnectedToMaster() || GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isInLobby()) {
          cc.systemEvent.emit("UpdateStatusWindow", "waiting for other players...");
          GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinRandomRoom();
        } else {
          GamePlayReferenceManager.Instance.Get_MultiplayerController().RequestConnection();
        }
      } else {
        this.ResetPlayerCountInput();
        this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.", 3500);
      }
    }
  },
  UpdateStatusWindow: function UpdateStatusWindow(msg) {
    this.StatusText = this.StatusText + msg + "\n";
    this.UIProfile.StatusLabel.string = this.StatusText;
  },
  ExitConnecting: function ExitConnecting() {
    this.UIProfile.StatusNode.active = false;
    this.UIProfile.PlayButtonNode.active = true;
    this.UIProfile.StatusLabel.string = "";
    this.EmailText = "";
    this.PasswordText = "";
    this.StatusText = "";
    this.TotalPlayers = "";
    this.ResetPlayerCountInput();
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
  },
  ToggleLoadingNode: function ToggleLoadingNode(state) {
    this.LoadingNode.active = state;
  },
  LoginUser: function LoginUser() {
    if (this.EmailText != "" && this.PasswordText != "") {
      this.ToggleLoadingNode(true);
      var anim = this.LoadingNode.children[0].children[1].getComponent(cc.Animation);
      anim.play('loading');
      GamePlayReferenceManager.Instance.Get_ServerBackend().LoginUser(this.EmailText, this.PasswordText, "Student");
    } else {
      this.ToggleLoadingNode(false);
      this.ShowToast("Email or password invalid or empty.");
    }
  },
  SetEmailText: function SetEmailText(text) {
    this.EmailText = text;
  },
  SetPasswordText: function SetPasswordText(text) {
    this.PasswordText = text;
  },
  AssignProfileData: function AssignProfileData() {
    if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 1) //means successful
      {
        this.ChangePanelScreen(true, false, "");
        console.log(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        this.UIProfile.NameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        this.UIProfile.EmailAddressLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.emailAddress;
        this.UIProfile.DOBLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.dOB;
        this.UIProfile.GradeLevelLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gradeLevel;
        this.UIProfile.TeacherNameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.teacherName;
        this.UIProfile.GamesWonLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gamesWon;
        this.UIProfile.FBPageLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.facebookPage;
        this.UIProfile.TestTakenLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.testsTaken;
        this.UIProfile.TestingAvgLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.testingAverage;
        this.UIProfile.CashLabel.string = "$ " + GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash;
        this.ToggleLoadingNode(false);
      } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 2) //user not found
      {
        this.ToggleLoadingNode(false);
        this.ShowToast("no user registered with entered email.");
      } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 3) //pass/email invalid
      {
        this.ToggleLoadingNode(false);
        this.ShowToast("user email or password is wrong");
      } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 4) //something went wrong
      {
        this.ToggleLoadingNode(false);
        this.ShowToast("something went wrong please try again.");
      }
  },
  //#region Spectate Ui Work
  ToggleRoomScreen_SpectateUI: function ToggleRoomScreen_SpectateUI(_state) {
    if (_state) this.UIProfile.StatusNode.active = false;
    this.UISpectate.RoomScreenNode.active = _state;
  },
  ToggleProfileScreen_SpectateUI: function ToggleProfileScreen_SpectateUI(_state) {
    this.UISpectate.ProfileScreenNode.active = _state;
  },
  ShowAvailableRooms_SpectateUI: function ShowAvailableRooms_SpectateUI() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isConnectedToMaster() || GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isInLobby()) {
      this.ToggleProfileScreen_SpectateUI(false);
      this.ToggleRoomScreen_SpectateUI(true);
    } else {
      this.UIProfile.StatusNode.active = true;
      this.UIProfile.StatusLabel.string = "";
      GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleShowRoom_Bool(true);
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RequestConnection();
    }
  },
  UpdateRoomsList_SpectateUI: function UpdateRoomsList_SpectateUI(_name, _players) {
    var node = cc.instantiate(this.UISpectate.RoomPrefab);
    node.parent = this.UISpectate.ScrollBarContent;
    node.getComponent('RoomListHandler').SetRoomName(_name);
    node.getComponent('RoomListHandler').SetPlayerCount(_players);
    TotalRoom.push(node);
  },
  ResetRoomList: function ResetRoomList() {
    for (var index = 0; index < TotalRoom.length; index++) {
      TotalRoom[index].destroy();
    }

    TotalRoom = [];
  },
  Exit_SpectateUI: function Exit_SpectateUI() {
    this.ToggleProfileScreen_SpectateUI(true);
    this.ToggleRoomScreen_SpectateUI(false);
    this.ExitConnecting();
  },
  //#endregion
  ShowToast: function ShowToast(msg, _time) {
    if (_time === void 0) {
      _time = 2000;
    }

    this.ToastNode.active = true;
    this.ToastNode.children[0].children[0].getComponent(cc.Label).string = msg;
    var SelfToast = this;
    setTimeout(function () {
      SelfToast.ToastNode.active = false;
    }, _time);
  }
});
module.exports = UIManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJQcm9maWxlVUkiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJOYW1lTGFiZWwiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJFbWFpbEFkZHJlc3NMYWJlbCIsIkRPQkxhYmVsIiwiR3JhZGVMZXZlbExhYmVsIiwiVGVhY2hlck5hbWVMYWJlbCIsIkdhbWVzV29uTGFiZWwiLCJGQlBhZ2VMYWJlbCIsIlRlc3RUYWtlbkxhYmVsIiwiVGVzdGluZ0F2Z0xhYmVsIiwiQ2FzaExhYmVsIiwiU3RhdHVzTm9kZSIsIk5vZGUiLCJQbGF5QnV0dG9uTm9kZSIsIlN0YXR1c0xhYmVsIiwiUGxheWVyQ291bnRJbnB1dCIsIkVkaXRCb3giLCJTcGVjdGF0ZVVJIiwiUm9vbVNjcmVlbk5vZGUiLCJTY3JvbGxCYXJDb250ZW50IiwiUHJvZmlsZVNjcmVlbk5vZGUiLCJSb29tUHJlZmFiIiwiUHJlZmFiIiwiVUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiVUlQcm9maWxlIiwiU2NyZWVuTm9kZXMiLCJUd2Vlbk1hbmFnZXJSZWYiLCJMb2dvIiwiVG9hc3ROb2RlIiwiTG9hZGluZ05vZGUiLCJSZWZlcmVuY2VNYW5hZ2VyUmVmIiwiVUlTcGVjdGF0ZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIkFzc2lnblByb2ZpbGVEYXRhIiwiVXBkYXRlU3RhdHVzV2luZG93IiwiQ2hhbmdlUGFuZWxTY3JlZW4iLCJvbkRpc2FibGUiLCJvZmYiLCJvbkxvYWQiLCJnZXRDb21wb25lbnQiLCJFbWFpbFRleHQiLCJQYXNzd29yZFRleHQiLCJub2RlQ291bnRlciIsIlN0YXR1c1RleHQiLCJUb3RhbFBsYXllcnMiLCJSZXNldFBsYXllckNvdW50SW5wdXQiLCJHZXRUd2Vlbk1hbmFnZXJSZWZlcmVuY2UiLCJTbGlkZUluTG9naW5Db21wb25lbnRzIiwiUmVwZWF0TG9nb0FuaW1hdGlvbiIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJzdGFydCIsImlzTmV4dCIsImNoYW5nZVNjcmVlbiIsInNjZW5lTmFtZSIsIkZhZGVOb2RlSW5PdXQiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiTWFuaXB1bGF0ZU5vZGVzIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJjb3VudGVyIiwiaW5kZXgiLCJhY3RpdmUiLCJjb25zb2xlIiwibG9nIiwiTG9naW5TY3JlZW5Ud2VlbiIsImNoaWxkcmVuIiwiUmVwZWF0VHdlZW5TY2FsZSIsInN0cmluZyIsIk9ucGxheWVyTnVtYmVyQ2hhbmdlZCIsIl9udW1iZXIiLCJQbGF5R2FtZSIsIlNob3dUb2FzdCIsIl9wbGF5ZXJzIiwicGFyc2VJbnQiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlU2hvd1Jvb21fQm9vbCIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5IiwiZW1pdCIsIkpvaW5SYW5kb21Sb29tIiwiUmVxdWVzdENvbm5lY3Rpb24iLCJtc2ciLCJFeGl0Q29ubmVjdGluZyIsIkRpc2Nvbm5lY3RQaG90b24iLCJUb2dnbGVMb2FkaW5nTm9kZSIsInN0YXRlIiwiTG9naW5Vc2VyIiwiYW5pbSIsIkFuaW1hdGlvbiIsInBsYXkiLCJHZXRfU2VydmVyQmFja2VuZCIsIlNldEVtYWlsVGV4dCIsInRleHQiLCJTZXRQYXNzd29yZFRleHQiLCJSZXNwb25zZVR5cGUiLCJTdHVkZW50RGF0YSIsImVtYWlsQWRkcmVzcyIsImRPQiIsImdyYWRlTGV2ZWwiLCJ0ZWFjaGVyTmFtZSIsImdhbWVzV29uIiwiZmFjZWJvb2tQYWdlIiwidGVzdHNUYWtlbiIsInRlc3RpbmdBdmVyYWdlIiwiZ2FtZUNhc2giLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJfc3RhdGUiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJTaG93QXZhaWxhYmxlUm9vbXNfU3BlY3RhdGVVSSIsIlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJIiwiX25hbWUiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXRSb29tTmFtZSIsIlNldFBsYXllckNvdW50IiwicHVzaCIsIlJlc2V0Um9vbUxpc3QiLCJkZXN0cm95IiwiRXhpdF9TcGVjdGF0ZVVJIiwiX3RpbWUiLCJTZWxmVG9hc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0EsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0I7QUFDQSxJQUFJQyxRQUFKO0FBQ0EsSUFBSUMsU0FBUyxHQUFDLEVBQWQsRUFDQTs7QUFDQSxJQUFJQyxTQUFTLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ25CQyxFQUFBQSxJQUFJLEVBQUMsV0FEYztBQUVuQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRTtBQUNQQyxNQUFBQSxXQUFXLEVBQUMsTUFETDtBQUVQLGlCQUFTLElBRkY7QUFHUEMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBSEY7QUFJUEMsTUFBQUEsWUFBWSxFQUFFLElBSlA7QUFLUEMsTUFBQUEsT0FBTyxFQUFFO0FBTEYsS0FESDtBQU9QQyxJQUFBQSxpQkFBaUIsRUFBRTtBQUNoQkwsTUFBQUEsV0FBVyxFQUFDLGNBREk7QUFFaEIsaUJBQVMsSUFGTztBQUdoQkMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBSE87QUFJaEJDLE1BQUFBLFlBQVksRUFBRSxJQUpFO0FBS2hCQyxNQUFBQSxPQUFPLEVBQUU7QUFMTyxLQVBaO0FBYVBFLElBQUFBLFFBQVEsRUFBRTtBQUNQTixNQUFBQSxXQUFXLEVBQUMsS0FETDtBQUVQLGlCQUFTLElBRkY7QUFH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QUFNLENBQUNDLE9BQVAsR0FBZ0I3RyxTQUFoQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFR3ZWVlbiBmcm9tICdUd2Vlbk1hbmFnZXInO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBUd2VlblJlZjtcclxudmFyIFRvdGFsUm9vbT1bXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFByb2ZpbGVVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUHJvZmlsZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLCB9LFxyXG4gICAgICAgICBET0JMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkRPQlwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBET0IgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEdyYWRlTGV2ZWxMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdyYWRlTGV2ZWxcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gR3JhZGUgTGV2ZWwgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFRlYWNoZXJOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUZWFjaGVyTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZWFjaGVyIE5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEdhbWVzV29uTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJHYW1lc1dvblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBnYW1lcyB3b24gbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEZCUGFnZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRkJQYWdlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGZhY2Vib29rIHBhZ2UgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFRlc3RUYWtlbkxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGVzdFRha2VuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIHRlc3QgdGFrZW4gbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFRlc3RpbmdBdmdMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRlc3RpbmdBdmVyYWdlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlc3RpbmcgQXZlcmFnZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJDYXNoXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGNhc2ggbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgU3RhdHVzTm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlN0YXR1c1NjcmVlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFN0YXR1cyBTY3JlZW4gb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgUGxheUJ1dHRvbk5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQbGF5QnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gcGxheSBidXR0b24gb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTdGF0dXNUZXh0XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFN0YXR1cyBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICBQbGF5ZXJDb3VudElucHV0OiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyQ291bnRJbnB1dFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFBsYXllckNvdW50SW5wdXQgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTcGVjdGF0ZVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTcGVjdGF0ZVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJTcGVjdGF0ZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgUm9vbVNjcmVlbk5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJSb29tU2NyZWVuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2Ygcm9vbSBzY3JlZW5cIix9LFxyXG4gICAgICAgIFNjcm9sbEJhckNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTY3JvbGxCYXJDb250ZW50XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2YgU2Nyb2xsQmFyQ29udGVudCBvZiByb29tIHNjcmVlblwiLH0sXHJcbiAgICAgICAgUHJvZmlsZVNjcmVlbk5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQcm9maWxlU2NyZWVuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2YgcHJvZmlsZSBzY3JlZW5cIix9LFxyXG4gICAgICAgIFJvb21QcmVmYWI6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJSb29tUHJlZmFiXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFJvb20gb24gcm9vbSBzY3JlZW5cIix9LFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVSU1hbmFnZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlVJTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHsgXHJcbiAgICAgICAgVUlQcm9maWxlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVUlQcm9maWxlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFByb2ZpbGVVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLH0sICBcclxuICAgICAgICBTY3JlZW5Ob2Rlczoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlNjcmVlbk5vZGVzXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbG9naW4gc2NyZWVuIG5vZGVcIix9LFxyXG4gICAgICAgICBUd2Vlbk1hbmFnZXJSZWY6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUd2Vlbk1hbmFnZXJSZWZcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgVHdlZW4gTWFuYWdlciBTY3JpcHQgXCIsIH0sXHJcbiAgICAgICAgIExvZ286IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2dvTm9kZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgbG9nbyBub2RlXCIsfSxcclxuICAgICAgICAgVG9hc3ROb2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG9hc3ROb2RlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSB0b2FzdCBub2RlXCIsfSxcclxuICAgICAgICAgTG9hZGluZ05vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FkaW5nTm9kZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgTG9hZGluZyBOb2RlXCIsfSwgICBcclxuICAgICAgICBSZWZlcmVuY2VNYW5hZ2VyUmVmOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUmVmZXJlbmNlTWFuYWdlclJlZlwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgcmVmZXJlbmNlIG1hbmFnZXIgbm9kZVwiLH0sICBcclxuICAgICAgICBVSVNwZWN0YXRlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVUlTcGVjdGF0ZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBTcGVjdGF0ZVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNwZWN0YXRlVUkgY2xhc3MgaW50YW5jZVwiLH0sICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHsgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZCBcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbignQXNzaWduUHJvZmlsZURhdGEnLCB0aGlzLkFzc2lnblByb2ZpbGVEYXRhLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbignVXBkYXRlU3RhdHVzV2luZG93JywgdGhpcy5VcGRhdGVTdGF0dXNXaW5kb3csIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdDaGFuZ2VQYW5lbFNjcmVlbicsIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4sIHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoJ0Fzc2lnblByb2ZpbGVEYXRhJywgdGhpcy5Bc3NpZ25Qcm9maWxlRGF0YSwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKCdVcGRhdGVTdGF0dXNXaW5kb3cnLCB0aGlzLlVwZGF0ZVN0YXR1c1dpbmRvdywgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKCdDaGFuZ2VQYW5lbFNjcmVlbicsIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4sIHRoaXMpO1xyXG4gICAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5SZWZlcmVuY2VNYW5hZ2VyUmVmPXRoaXMuUmVmZXJlbmNlTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgICAgIFVJTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIFRvdGFsUm9vbT1bXTtcclxuICAgICAgICAvL1ByaXZhdGUgVmFyaWFibGVzXHJcbiAgICAgICAgdGhpcy5FbWFpbFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlBhc3N3b3JkVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMubm9kZUNvdW50ZXI9MDtcclxuICAgICAgICB0aGlzLlN0YXR1c1RleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1cIlwiO1xyXG4gICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlKCk7XHJcbiAgICAgICAgdGhpcy5TbGlkZUluTG9naW5Db21wb25lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5SZXBlYXRMb2dvQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZVBhbmVsU2NyZWVuOiBmdW5jdGlvbiAoaXNOZXh0LGNoYW5nZVNjcmVlbixzY2VuZU5hbWUpIHtcclxuICAgICAgICBUd2VlblJlZi5GYWRlTm9kZUluT3V0KHRoaXMuU2NyZWVuTm9kZXNbdGhpcy5ub2RlQ291bnRlcl0sMC41NSwyNTUsMCxcInF1YWRJbk91dFwiKTtcclxuXHJcbiAgICBpZihjaGFuZ2VTY3JlZW49PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGlzTmV4dD09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZUNvdW50ZXI8dGhpcy5TY3JlZW5Ob2Rlcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVDb3VudGVyPXRoaXMubm9kZUNvdW50ZXIrMTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlQ291bnRlcj4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlQ291bnRlcj10aGlzLm5vZGVDb3VudGVyLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge3RoaXMuTWFuaXB1bGF0ZU5vZGVzKHRoaXMubm9kZUNvdW50ZXIpO30sIDYwMCk7XHJcbiAgICB9ZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLmRpcmVjdG9yLmxvYWRTY2VuZShzY2VuZU5hbWUpO30sIDYwMCk7XHJcbiAgICB9fSxcclxuXHJcbiAgICBNYW5pcHVsYXRlTm9kZXM6IGZ1bmN0aW9uIChjb3VudGVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuU2NyZWVuTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKGNvdW50ZXI9PWluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjcmVlbk5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0aW5nIGl0IHRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBUd2VlblJlZi5GYWRlTm9kZUluT3V0KHRoaXMuU2NyZWVuTm9kZXNbaW5kZXhdLDEuNSwwLDI1NSxcInF1YWRJbk91dFwiKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjcmVlbk5vZGVzW2luZGV4XS5hY3RpdmU9ZmFsc2U7IFxyXG4gICAgICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTbGlkZUluTG9naW5Db21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVHdlZW5SZWYuTG9naW5TY3JlZW5Ud2Vlbih0aGlzLlNjcmVlbk5vZGVzW3RoaXMubm9kZUNvdW50ZXJdLmNoaWxkcmVuWzFdLC0xMDAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVwZWF0TG9nb0FuaW1hdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFR3ZWVuUmVmLlJlcGVhdFR3ZWVuU2NhbGUodGhpcy5Mb2dvLDEuMSwxLDAuOCk7XHJcbiAgICB9LFxyXG5cclxuICAgIEdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFR3ZWVuUmVmPXRoaXMuVHdlZW5NYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIlR3ZWVuTWFuYWdlclwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRQbGF5ZXJDb3VudElucHV0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5QbGF5ZXJDb3VudElucHV0LnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuVG90YWxQbGF5ZXJzPVwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIE9ucGxheWVyTnVtYmVyQ2hhbmdlZChfbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG90YWxQbGF5ZXJzPV9udW1iZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIFBsYXlHYW1lOmZ1bmN0aW9uKClcclxuICAgIHsgIFxyXG4gICAgICAgIGlmKHRoaXMuVG90YWxQbGF5ZXJzPT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2UgZW50ZXIgcGxheWVyIGFtb3VudCBmb3IgbXVsdGlwbGF5ZXIgZnJvbSAyLTYsIG1ha2Ugc3VyZSB0byBoYXZlIHNhbWUgYW1vdW50IG9uIGRpZmZlcmVudCBjb25uZWN0aW5nIGRldmljZXMgaWYgeW91IHdhbnQgdG8gY29ubmVjdCB0aGVtLlwiLDM1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllcnM9cGFyc2VJbnQodGhpcy5Ub3RhbFBsYXllcnMpO1xyXG4gICAgICAgICAgICBpZihfcGxheWVycz49MiAmJiBfcGxheWVyczw9NilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPV9wbGF5ZXJzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLmlzSW5Mb2JieSgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcIndhaXRpbmcgZm9yIG90aGVyIHBsYXllcnMuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVxdWVzdENvbm5lY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBlbnRlciBwbGF5ZXIgYW1vdW50IGZvciBtdWx0aXBsYXllciBmcm9tIDItNiwgbWFrZSBzdXJlIHRvIGhhdmUgc2FtZSBhbW91bnQgb24gZGlmZmVyZW50IGNvbm5lY3RpbmcgZGV2aWNlcyBpZiB5b3Ugd2FudCB0byBjb25uZWN0IHRoZW0uXCIsMzUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZVN0YXR1c1dpbmRvdzpmdW5jdGlvbihtc2cpXHJcbiAgICB7ICBcclxuICAgICAgICB0aGlzLlN0YXR1c1RleHQ9dGhpcy5TdGF0dXNUZXh0K21zZytcIlxcblwiO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz10aGlzLlN0YXR1c1RleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRDb25uZWN0aW5nOmZ1bmN0aW9uKClcclxuICAgIHsgIFxyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuRW1haWxUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5QYXNzd29yZFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlN0YXR1c1RleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1cIlwiO1xyXG4gICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUxvYWRpbmdOb2RlKHN0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTG9hZGluZ05vZGUuYWN0aXZlPXN0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBMb2dpblVzZXI6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuRW1haWxUZXh0IT1cIlwiICYmIHRoaXMuUGFzc3dvcmRUZXh0IT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgdmFyIGFuaW0gPSB0aGlzLkxvYWRpbmdOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICBhbmltLnBsYXkoJ2xvYWRpbmcnKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTG9naW5Vc2VyKHRoaXMuRW1haWxUZXh0LHRoaXMuUGFzc3dvcmRUZXh0LFwiU3R1ZGVudFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiRW1haWwgb3IgcGFzc3dvcmQgaW52YWxpZCBvciBlbXB0eS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTZXRFbWFpbFRleHQ6ZnVuY3Rpb24odGV4dClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkVtYWlsVGV4dD10ZXh0O1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRQYXNzd29yZFRleHQ6ZnVuY3Rpb24odGV4dClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhc3N3b3JkVGV4dD10ZXh0O1xyXG4gICAgfSxcclxuXHJcbiAgICBBc3NpZ25Qcm9maWxlRGF0YTpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MSkgLy9tZWFucyBzdWNjZXNzZnVsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuKHRydWUsZmFsc2UsXCJcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmc9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuRE9CTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmRPQjtcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuR3JhZGVMZXZlbExhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5ncmFkZUxldmVsO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZWFjaGVyTmFtZUxhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS50ZWFjaGVyTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuR2FtZXNXb25MYWJlbC5zdHJpbmc9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb247XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLkZCUGFnZUxhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5mYWNlYm9va1BhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlRlc3RUYWtlbkxhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS50ZXN0c1Rha2VuO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZXN0aW5nQXZnTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnRlc3RpbmdBdmVyYWdlO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTGFiZWwuc3RyaW5nPVwiJCBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSk9PTIpIC8vdXNlciBub3QgZm91bmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIm5vIHVzZXIgcmVnaXN0ZXJlZCB3aXRoIGVudGVyZWQgZW1haWwuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSk9PTMpIC8vcGFzcy9lbWFpbCBpbnZhbGlkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ1c2VyIGVtYWlsIG9yIHBhc3N3b3JkIGlzIHdyb25nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSk9PTQpIC8vc29tZXRoaW5nIHdlbnQgd3JvbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInNvbWV0aGluZyB3ZW50IHdyb25nIHBsZWFzZSB0cnkgYWdhaW4uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVaSBXb3JrXHJcbiAgICBUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9zdGF0ZSlcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuVUlTcGVjdGF0ZS5Sb29tU2NyZWVuTm9kZS5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUlTcGVjdGF0ZS5Qcm9maWxlU2NyZWVuTm9kZS5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTaG93QXZhaWxhYmxlUm9vbXNfU3BlY3RhdGVVSSgpXHJcbiAgICB7XHJcbiAgICAgXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0luTG9iYnkoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVxdWVzdENvbm5lY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKF9uYW1lLF9wbGF5ZXJzKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5VSVNwZWN0YXRlLlJvb21QcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5VSVNwZWN0YXRlLlNjcm9sbEJhckNvbnRlbnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1Jvb21MaXN0SGFuZGxlcicpLlNldFJvb21OYW1lKF9uYW1lKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudCgnUm9vbUxpc3RIYW5kbGVyJykuU2V0UGxheWVyQ291bnQoX3BsYXllcnMpO1xyXG4gICAgICAgIFRvdGFsUm9vbS5wdXNoKG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldFJvb21MaXN0KClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVG90YWxSb29tLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBUb3RhbFJvb21baW5kZXhdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRvdGFsUm9vbT1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdF9TcGVjdGF0ZVVJKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5FeGl0Q29ubmVjdGluZygpO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIFNob3dUb2FzdDpmdW5jdGlvbihtc2csX3RpbWU9MjAwMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvYXN0Tm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLlRvYXN0Tm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1tc2c7XHJcbiAgICAgICAgdmFyIFNlbGZUb2FzdD10aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgIFNlbGZUb2FzdC5Ub2FzdE5vZGUuYWN0aXZlPWZhbHNlOyB9LCBfdGltZSk7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzPSBVSU1hbmFnZXI7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ExpandBusinessHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxFeHBhbmRCdXNpbmVzc0hhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiQnVzaW5lc3NJbmRleCIsInR5cGUiLCJpbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiTmFtZUxhYmVsIiwiTGFiZWwiLCJMb2NhdGlvbkVkaXRCb3giLCJFZGl0Qm94IiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIm9uTG9hZCIsIkxvY2F0aW9uVGV4dCIsIm9uTG9jYXRpb25UZXh0Q2hhbmdlZCIsInR4dCIsIlNldE5hbWUiLCJzdHJpbmciLCJTZXRCdXNpbmVzc0luZGV4IiwiX2luZGV4IiwiUmVzZXRFZGl0Qm94IiwiT25FeHBhbmRCdXR0b25DbGlja2VkIiwiSW5zdGFuY2UiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiR2V0X0dhbWVNYW5hZ2VyIiwiRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMscUJBQXFCLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQy9CQyxFQUFBQSxJQUFJLEVBQUMsdUJBRDBCO0FBRS9CLGFBQVNGLEVBQUUsQ0FBQ0csU0FGbUI7QUFJL0JDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxhQUFhLEVBQUU7QUFDWCxpQkFBUyxDQUFDLENBREM7QUFFWEMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLE9BRkU7QUFHWEMsTUFBQUEsWUFBWSxFQUFFO0FBSEgsS0FEUDtBQU9SQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBILE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDVSxLQUZGO0FBR1BGLE1BQUFBLFlBQVksRUFBRTtBQUhQLEtBUEg7QUFhUkcsSUFBQUEsZUFBZSxFQUFFO0FBQ2IsaUJBQVMsSUFESTtBQUViTCxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ1ksT0FGSTtBQUdiSixNQUFBQSxZQUFZLEVBQUU7QUFIRDtBQWJULEdBSm1CO0FBd0IvQjtBQUVBSyxFQUFBQSxlQTFCK0IsNkJBMkI5QjtBQUNHLFFBQUcsQ0FBQ2Ysd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0FBLHdCQUF3QixHQUFDZ0IsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ0YsR0E5QjZCO0FBK0IvQkMsRUFBQUEsTUEvQitCLG9CQStCckI7QUFDTixTQUFLQyxZQUFMLEdBQWtCLEVBQWxCO0FBQ0EsU0FBS0gsZUFBTDtBQUNILEdBbEM4QjtBQW9DL0JJLEVBQUFBLHFCQXBDK0IsaUNBb0NUQyxHQXBDUyxFQXFDL0I7QUFDSSxTQUFLRixZQUFMLEdBQWtCRSxHQUFsQjtBQUNILEdBdkM4QjtBQXlDL0JDLEVBQUFBLE9BekMrQixtQkF5Q3ZCakIsSUF6Q3VCLEVBMEMvQjtBQUNJLFNBQUtPLFNBQUwsQ0FBZVcsTUFBZixHQUFzQmxCLElBQXRCO0FBQ0gsR0E1QzhCO0FBOEMvQm1CLEVBQUFBLGdCQTlDK0IsNEJBOENkQyxNQTlDYyxFQStDL0I7QUFDSSxTQUFLakIsYUFBTCxHQUFtQmlCLE1BQW5CO0FBQ0gsR0FqRDhCO0FBbUQvQkMsRUFBQUEsWUFuRCtCLDBCQW9EL0I7QUFDSSxTQUFLWixlQUFMLENBQXFCUyxNQUFyQixHQUE0QixFQUE1QjtBQUNILEdBdEQ4QjtBQXdEL0JJLEVBQUFBLHFCQXhEK0IsbUNBeUQvQjtBQUNJLFFBQUcsQ0FBQzFCLHdCQUFELElBQTZCQSx3QkFBd0IsSUFBRSxJQUExRCxFQUNJLEtBQUtlLGVBQUw7O0FBRUosUUFBRyxLQUFLRyxZQUFMLElBQW1CLEVBQXRCLEVBQ0E7QUFDSWxCLE1BQUFBLHdCQUF3QixDQUFDMkIsUUFBekIsQ0FBa0NDLHFCQUFsQyxHQUEwREMsU0FBMUQsQ0FBb0UsbURBQXBFLEVBQXdILElBQXhIO0FBQ0gsS0FIRCxNQUtBO0FBQ0k3QixNQUFBQSx3QkFBd0IsQ0FBQzJCLFFBQXpCLENBQWtDQyxxQkFBbEMsR0FBMERFLGlEQUExRCxDQUE0RyxLQUFLWixZQUFqSDtBQUNBbEIsTUFBQUEsd0JBQXdCLENBQUMyQixRQUF6QixDQUFrQ0ksZUFBbEMsR0FBb0RDLDJCQUFwRCxDQUFnRixLQUFoRixFQUFzRixLQUFLekIsYUFBM0YsRUFBeUcsS0FBS1csWUFBOUc7QUFDSDtBQUNKLEdBdEU4QixDQXdFL0I7O0FBeEUrQixDQUFULENBQTFCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBFeHBhbmRCdXNpbmVzc0hhbmRsZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBCdXNpbmVzc0luZGV4OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IC0xLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5pbnRlZ2VyLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCwgXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBMb2NhdGlvbkVkaXRCb3g6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCwgXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5Mb2NhdGlvblRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvY2F0aW9uVGV4dENoYW5nZWQodHh0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTG9jYXRpb25UZXh0PXR4dDtcclxuICAgIH0sXHJcblxyXG4gICAgU2V0TmFtZShuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTmFtZUxhYmVsLnN0cmluZz1uYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRCdXNpbmVzc0luZGV4KF9pbmRleClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzSW5kZXg9X2luZGV4O1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldEVkaXRCb3goKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTG9jYXRpb25FZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG5cclxuICAgICAgICBpZih0aGlzLkxvY2F0aW9uVGV4dD09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGVhc2UgZW50ZXIgbmV3IGxvY2F0aW9uIG5hbWUgZm9yIHRoaXMgYnVzaW5lc3MuXCIsMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5vbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKHRoaXMuTG9jYXRpb25UZXh0KTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbigyNTAwMCx0aGlzLkJ1c2luZXNzSW5kZXgsdGhpcy5Mb2NhdGlvblRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/MultiplayerSyncManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b24e1h7gENJfpQ8MTfHBgb9', 'MultiplayerSyncManager');
// Script/MultiplayerSyncManager.js

"use strict";

var GamePlayReferenceManager = null;
var MultiplayerSyncManager = cc.Class({
  name: "MultiplayerSyncManager",
  "extends": cc.Component,
  properties: {},
  statics: {
    //creating static instance of the class
    Instance: null
  },
  RemovePersistNode: function RemovePersistNode() {
    MultiplayerSyncManager.Instance = null;
    cc.game.removePersistRootNode(this.node);
  },
  onLoad: function onLoad() {
    if (!MultiplayerSyncManager.Instance) {
      cc.game.addPersistRootNode(this.node);
      MultiplayerSyncManager.Instance = this;
    }

    this.CheckReferences();
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  RaiseEvent: function RaiseEvent(_eventCode, _data) {
    if (_eventCode == 1) //sending playerinfo 
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendData(_data);
      } else if (_eventCode == 2) //sending Turn Start Call
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().StartTurn(_data);
      } else if (_eventCode == 3) //sending Dice Roll Value
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().DiceRollEvent(_data);
      } else if (_eventCode == 4) //sending userID of player who had completed their turn
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SyncTurnCompletion(_data);
      } else if (_eventCode == 5) //sending card data (index) so other users can sync them
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendCardData(_data);
      } else if (_eventCode == 6) //sending call to end the game
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendGameOver(_data);
      }
  },
  ReceiveEvent: function ReceiveEvent(_eventCode, _senderName, _senderID, _data) {
    if (_eventCode == 1) //receiving playerinfo
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        cc.systemEvent.emit("SyncData", _data, _senderID); //function defined in GameplayUIManager
      } else if (_eventCode == 2) //receiving start Turn
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().TurnHandler(_data);
      } else if (_eventCode == 3) //receiving dice roll data
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().syncDiceRoll(_data);
      } else if (_eventCode == 4) //receiving userid of player who has completed turn
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventTurnComplete(_data);
      } else if (_eventCode == 5) //receiving card data (index) so other users can sync them
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventForCard(_data);
      } else if (_eventCode == 6) //receiving game over call
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().SyncGameOver(_data);
      }
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllclN5bmNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIk11bHRpcGxheWVyU3luY01hbmFnZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIlJhaXNlRXZlbnQiLCJfZXZlbnRDb2RlIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiU2VuZERhdGEiLCJTdGFydFR1cm4iLCJEaWNlUm9sbEV2ZW50IiwiU3luY1R1cm5Db21wbGV0aW9uIiwiU2VuZENhcmREYXRhIiwiU2VuZEdhbWVPdmVyIiwiUmVjZWl2ZUV2ZW50IiwiX3NlbmRlck5hbWUiLCJfc2VuZGVySUQiLCJjb25zb2xlIiwibG9nIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiR2V0X0dhbWVNYW5hZ2VyIiwiVHVybkhhbmRsZXIiLCJzeW5jRGljZVJvbGwiLCJSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiU3luY0dhbWVPdmVyIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0I7QUFFQSxJQUFJQyxzQkFBc0IsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaENDLEVBQUFBLElBQUksRUFBQyx3QkFEMkI7QUFFaEMsYUFBU0YsRUFBRSxDQUFDRyxTQUZvQjtBQUloQ0MsRUFBQUEsVUFBVSxFQUFFLEVBSm9CO0FBUWhDQyxFQUFBQSxPQUFPLEVBQUU7QUFBRTtBQUNQQyxJQUFBQSxRQUFRLEVB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RVIsQ0F0RytCLENBd0doQzs7QUF4R2dDLENBQVQsQ0FBM0IiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxuXHJcbnZhciBNdWx0aXBsYXllclN5bmNNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJNdWx0aXBsYXllclN5bmNNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgICBJbnN0YW5jZTogbnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2U9bnVsbDtcclxuICAgICAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICBpZighTXVsdGlwbGF5ZXJTeW5jTWFuYWdlci5JbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJhaXNlRXZlbnQgKF9ldmVudENvZGUsX2RhdGEpIHsgIFxyXG4gICAgICAgIGlmKF9ldmVudENvZGU9PTEpIC8vc2VuZGluZyBwbGF5ZXJpbmZvIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kRGF0YShfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09MikgLy9zZW5kaW5nIFR1cm4gU3RhcnQgQ2FsbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TdGFydFR1cm4oX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTMpIC8vc2VuZGluZyBEaWNlIFJvbGwgVmFsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGljZVJvbGxFdmVudChfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NCkgLy9zZW5kaW5nIHVzZXJJRCBvZiBwbGF5ZXIgd2hvIGhhZCBjb21wbGV0ZWQgdGhlaXIgdHVyblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TeW5jVHVybkNvbXBsZXRpb24oX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTUpIC8vc2VuZGluZyBjYXJkIGRhdGEgKGluZGV4KSBzbyBvdGhlciB1c2VycyBjYW4gc3luYyB0aGVtXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRDYXJkRGF0YShfZGF0YSk7XHJcbiAgICAgICAgfWVsc2UgaWYoX2V2ZW50Q29kZT09NikgLy9zZW5kaW5nIGNhbGwgdG8gZW5kIHRoZSBnYW1lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRHYW1lT3ZlcihfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlRXZlbnQgKF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKSB7XHJcbiAgICAgICAgaWYoX2V2ZW50Q29kZT09MSkgLy9yZWNlaXZpbmcgcGxheWVyaW5mb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIrX3NlbmRlck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIrX3NlbmRlcklEKTtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlN5bmNEYXRhXCIsX2RhdGEsX3NlbmRlcklEKTsgLy9mdW5jdGlvbiBkZWZpbmVkIGluIEdhbWVwbGF5VUlNYW5hZ2VyXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTIpIC8vcmVjZWl2aW5nIHN0YXJ0IFR1cm5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5UdXJuSGFuZGxlcihfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09MykgLy9yZWNlaXZpbmcgZGljZSByb2xsIGRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5zeW5jRGljZVJvbGwoX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTQpIC8vcmVjZWl2aW5nIHVzZXJpZCBvZiBwbGF5ZXIgd2hvIGhhcyBjb21wbGV0ZWQgdHVyblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIrX3NlbmRlck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIrX3NlbmRlcklEKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NSkgLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIrX3NlbmRlck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIrX3NlbmRlcklEKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTYpIC8vcmVjZWl2aW5nIGdhbWUgb3ZlciBjYWxsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIitfc2VuZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIitfc2VuZGVySUQpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3luY0dhbWVPdmVyKF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

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
    }

    console.log(this.Get_MultiplayerController());
    console.log(this.Get_UIManager());
    console.log(this.Get_GameManager());
    console.log(this.Get_GameplayUIManager());
    console.log(this.Get_SpaceManager());
    console.log(this.Get_MultiplayerSyncManager());
    console.log(this.Get_ServerBackend());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiR2FtZU1hbmdlclJlZiIsImRpc3BsYXlOYW1lIiwidHlwZSIsIk5vZGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiU3BhY2VNYW5hZ2VyUmVmIiwiR2FtZXBsYXlVSU1hbmFnZXJSZWYiLCJVSU1hbmFnZXJSZWYiLCJNdWx0aXBsYXllckNvbnRyb2xsZXJSZWYiLCJNdWx0aXBsYXllclN5bmNNYW5hZ2VyUmVmIiwiU2VydmVyQmFja2VuZFJlZiIsIkRlY2tzRGF0YVJlZiIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiZ2FtZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJvbkxvYWQiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJjb25zb2xlIiwibG9nIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9VSU1hbmFnZXIiLCJHZXRfR2FtZU1hbmFnZXIiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJHZXRfU3BhY2VNYW5hZ2VyIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsInVuZGVmaW5lZCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJHZXRfRGVja3NEYXRhIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLHdCQUF3QixHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNsQ0MsRUFBQUEsSUFBSSxFQUFDLDBCQUQ2QjtBQUVsQyxhQUFTRixFQUFFLENBQUNHLFNBRnNCO0FBSWxDQyxFQUFBQSxVQUFVLEVBQUU7QUFDWkMsSUFBQUEsYUFBYSxFQUNiO0FB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Q29DLElBQUgsQ0FBUSx1QkFBUixDQUFsQjtBQUVBLFFBQUcsS0FBS25CLFlBQUwsSUFBb0JrQixTQUFwQixJQUFpQyxLQUFLbEIsWUFBTCxJQUFtQixJQUF2RCxFQUNHLE9BQU8sS0FBS0EsWUFBTCxHQUFrQixLQUFLQSxZQUFMLENBQWtCb0IsWUFBbEIsQ0FBK0IsV0FBL0IsQ0FBekIsQ0FESCxLQUdHLE9BQU8sSUFBUDtBQUNSO0FBMUtrQyxDQUFULENBQTdCO0FBNktBRSxNQUFNLENBQUNDLE9BQVAsR0FBZ0J6Qyx3QkFBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgR2FtZU1hbmdlclJlZjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiR2FtZU1hbmdlclJlZlwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIHRvIHN0b3JlIG5vZGUgZm9yIGdhbWUgbWFuYWdlclwiLH0sXHJcbiAgICBTcGFjZU1hbmFnZXJSZWY6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNwYWNlTWFuYWdlclJlZlwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIHRvIHN0b3JlIG5vZGUgZm9yIFNwYWNlIE1hbmFnZXJcIix9LFxyXG5cclxuICAgICBHYW1lcGxheVVJTWFuYWdlclJlZjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiR2FtZXBsYXlVSU1hbmFnZXJSZWZcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSB0byBzdG9yZSBub2RlIGZvciBnYW1lcGxheSB1aSBNYW5hZ2VyXCIsfSxcclxuICAgICBVSU1hbmFnZXJSZWY6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlVJTWFuYWdlclJlZlwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIHRvIHN0b3JlIG5vZGUgZm9yIHVpIE1hbmFnZXJcIix9LFxyXG4gICAgICBcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyUmVmOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJNdWx0aXBsYXllckNvbnRyb2xsZXJSZWZcIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSB0byBub2RlIG9mIG11bHRpcGxheWVyIGNvbnRyb2xsZXJcIix9LFxyXG4gICAgICBNdWx0aXBsYXllclN5bmNNYW5hZ2VyUmVmOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJNdWx0aXBsYXllclN5bmNNYW5hZ2VyUmVmXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgdG8gbm9kZSBvZiBNdWx0aXBsYXllclN5bmNNYW5hZ2VyXCIsfSxcclxuICAgICAgU2VydmVyQmFja2VuZFJlZjpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU2VydmVyQmFja2VuZFJlZlwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIHRvIG5vZGUgb2YgU2VydmVyQmFja2VuZFwiLH0sXHJcbiAgICAgIERlY2tzRGF0YVJlZjpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRGVja3NEYXRhUmVmXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgdG8gbm9kZSBvZiBEZWNrc0RhdGFcIix9LFxyXG4gICB9LFxyXG5cclxuICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuICBSZW1vdmVQZXJzaXN0Tm9kZSgpXHJcbiAge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2U9bnVsbDtcclxuICAgICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICB9LFxyXG5cclxuICAgICAgb25Mb2FkKClcclxuICAgICAge1xyXG4gICAgICAgICAvL21ha2luZyBjbGFzcyBzaW5nbGV0b25cclxuICAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpKTtcclxuICAgICAgICAgY29uc29sZS5sb2codGhpcy5HZXRfVUlNYW5hZ2VyKCkpO1xyXG4gICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkdldF9HYW1lTWFuYWdlcigpKTtcclxuICAgICAgICAgY29uc29sZS5sb2codGhpcy5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKSk7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuR2V0X1NwYWNlTWFuYWdlcigpKTtcclxuICAgICAgICAgY29uc29sZS5sb2codGhpcy5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpKTtcclxuICAgICAgICAgY29uc29sZS5sb2codGhpcy5HZXRfU2VydmVyQmFja2VuZCgpKTtcclxuICAgICAgfSxcclxuXHJcbiAgICBHZXRfR2FtZU1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYodGhpcy5HYW1lTWFuZ2VyUmVmPT0gdW5kZWZpbmVkIHx8dGhpcy5HYW1lTWFuZ2VyUmVmPT1udWxsKVxyXG4gICAgICAgICB0aGlzLkdhbWVNYW5nZXJSZWY9Y2MuZmluZChcIk1hbmFnZXJzL0dhbWVNYW5hZ2VyXCIpO1xyXG5cclxuICAgICAgaWYodGhpcy5HYW1lTWFuZ2VyUmVmIT0gdW5kZWZpbmVkICYmIHRoaXMuR2FtZU1hbmdlclJlZiE9bnVsbClcclxuICAgICAgICAgcmV0dXJuIHRoaXMuR2FtZU1hbmdlclJlZj10aGlzLkdhbWVNYW5nZXJSZWYuZ2V0Q29tcG9uZW50KFwiR2FtZU1hbmFnZXJcIik7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIEdldF9TcGFjZU1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYodGhpcy5TcGFjZU1hbmFnZXJSZWY9PSB1bmRlZmluZWQgfHx0aGlzLlNwYWNlTWFuYWdlclJlZj09bnVsbClcclxuICAgICAgICAgdGhpcy5TcGFjZU1hbmFnZXJSZWY9Y2MuZmluZChcIkNhbnZhcy9VSS9HYW1lUGF0aC9TcGFjZXNcIik7XHJcblxyXG4gICAgICBpZih0aGlzLlNwYWNlTWFuYWdlclJlZiE9IHVuZGVmaW5lZCAmJiB0aGlzLlNwYWNlTWFuYWdlclJlZiE9bnVsbClcclxuICAgICAgICAgcmV0dXJuIHRoaXMuU3BhY2VNYW5hZ2VyUmVmPXRoaXMuU3BhY2VNYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIlNwYWNlc01hbmFnZXJcIik7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgIH0sXHJcblxyXG4gICBHZXRfR2FtZXBsYXlVSU1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYodGhpcy5HYW1lcGxheVVJTWFuYWdlclJlZj09IHVuZGVmaW5lZCB8fHRoaXMuR2FtZXBsYXlVSU1hbmFnZXJSZWY9PW51bGwpXHJcbiAgICAgICAgIHRoaXMuR2FtZXBsYXlVSU1hbmFnZXJSZWY9Y2MuZmluZChcIk1hbmFnZXJzL0dhbWVwbGF5VUlNYW5hZ2VyXCIpO1xyXG5cclxuICAgICAgaWYodGhpcy5HYW1lcGxheVVJTWFuYWdlclJlZiE9IHVuZGVmaW5lZCAmJiB0aGlzLkdhbWVwbGF5VUlNYW5hZ2VyUmVmIT1udWxsKVxyXG4gICAgICAgICByZXR1cm4gdGhpcy5HYW1lcGxheVVJTWFuYWdlclJlZj10aGlzLkdhbWVwbGF5VUlNYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIkdhbWVwbGF5VUlNYW5hZ2VyXCIpO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICB9LFxyXG5cclxuICAgR2V0X1VJTWFuYWdlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZih0aGlzLlVJTWFuYWdlclJlZj09IHVuZGVmaW5lZCB8fHRoaXMuVUlNYW5hZ2VyUmVmPT1udWxsKVxyXG4gICAgICAgICB0aGlzLlVJTWFuYWdlclJlZj1jYy5maW5kKFwiVUlNYW5hZ2VyXCIpO1xyXG5cclxuICAgICAgaWYodGhpcy5VSU1hbmFnZXJSZWYhPSB1bmRlZmluZWQgJiYgdGhpcy5VSU1hbmFnZXJSZWYhPW51bGwpXHJcbiAgICAgICAgIHJldHVybiB0aGlzLlVJTWFuYWdlclJlZj10aGlzLlVJTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJVSU1hbmFnZXJcIik7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgIH0sXHJcblxyXG4gICBHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmKHRoaXMuTXVsdGlwbGF5ZXJDb250cm9sbGVyUmVmPT0gdW5kZWZpbmVkIHx8dGhpcy5NdWx0aXBsYXllckNvbnRyb2xsZXJSZWY9PW51bGwpXHJcbiAgICAgICAgIHRoaXMuTXVsdGlwbGF5ZXJDb250cm9sbGVyUmVmPWNjLmZpbmQoXCJQaG90b25NYW5hZ2VyXCIpO1xyXG5cclxuICAgICAgICAgaWYodGhpcy5NdWx0aXBsYXllckNvbnRyb2xsZXJSZWYhPSB1bmRlZmluZWQgJiYgdGhpcy5NdWx0aXBsYXllckNvbnRyb2xsZXJSZWYhPW51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk11bHRpcGxheWVyQ29udHJvbGxlclJlZj10aGlzLk11bHRpcGxheWVyQ29udHJvbGxlclJlZi5nZXRDb21wb25lbnQoXCJNdWx0aXBsYXllckNvbnRyb2xsZXJcIik7XHJcbiAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgIH0sXHJcblxyXG4gICBHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZih0aGlzLk11bHRpcGxheWVyU3luY01hbmFnZXJSZWY9PSB1bmRlZmluZWQgfHx0aGlzLk11bHRpcGxheWVyU3luY01hbmFnZXJSZWY9PW51bGwpXHJcbiAgICAgICAgIHRoaXMuTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclJlZj1jYy5maW5kKFwiTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclwiKTtcclxuXHJcbiAgICAgICAgIGlmKHRoaXMuTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclJlZiE9IHVuZGVmaW5lZCAmJiB0aGlzLk11bHRpcGxheWVyU3luY01hbmFnZXJSZWYhPW51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk11bHRpcGxheWVyU3luY01hbmFnZXJSZWY9dGhpcy5NdWx0aXBsYXllclN5bmNNYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIk11bHRpcGxheWVyU3luY01hbmFnZXJcIik7XHJcbiAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgIH0sXHJcblxyXG4gICBHZXRfU2VydmVyQmFja2VuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZih0aGlzLlNlcnZlckJhY2tlbmRSZWY9PSB1bmRlZmluZWQgfHx0aGlzLlNlcnZlckJhY2tlbmRSZWY9PW51bGwpXHJcbiAgICAgICAgIHRoaXMuU2VydmVyQmFja2VuZFJlZj1jYy5maW5kKFwiU2VydmVyTWFuYWdlclwiKTtcclxuXHJcbiAgICAgICAgIGlmKHRoaXMuU2VydmVyQmFja2VuZFJlZiE9IHVuZGVmaW5lZCAmJiB0aGlzLlNlcnZlckJhY2tlbmRSZWYhPW51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlNlcnZlckJhY2tlbmRSZWY9dGhpcy5TZXJ2ZXJCYWNrZW5kUmVmLmdldENvbXBvbmVudChcIlNlcnZlckJhY2tlbmRcIik7XHJcbiAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgIH0sXHJcblxyXG4gICBHZXRfRGVja3NEYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmKHRoaXMuRGVja3NEYXRhUmVmPT0gdW5kZWZpbmVkIHx8dGhpcy5EZWNrc0RhdGFSZWY9PW51bGwpXHJcbiAgICAgICAgIHRoaXMuRGVja3NEYXRhUmVmPWNjLmZpbmQoXCJNYW5hZ2Vycy9EZWNrc01hbmFnZXJcIik7XHJcblxyXG4gICAgICAgICBpZih0aGlzLkRlY2tzRGF0YVJlZiE9IHVuZGVmaW5lZCAmJiB0aGlzLkRlY2tzRGF0YVJlZiE9bnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuRGVja3NEYXRhUmVmPXRoaXMuRGVja3NEYXRhUmVmLmdldENvbXBvbmVudChcIkRlY2tzRGF0YVwiKTtcclxuICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgfSxcclxuXHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyOyJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/MultiplayerController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5cea0jqhyxPXpiAtmjtC7+U', 'MultiplayerController');
// Script/MultiplayerController.js

"use strict";

//Global Variables
var PhotonRef;
var stateText = "";
var GamePlayReferenceManager = null;
var ShowRoom = false; //---------------------------------------class data related to RoomProperty------------------------------------------------//

var RoomProperty = cc.Class({
  name: "RoomProperty",
  properties: {
    Player: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    },
    InitialSetup: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    PlayerGameInfo: {
      "default": "",
      type: cc.Text,
      serializable: true
    },
    TurnNumber: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    }
  }
}); //---------------------------------------class data related to App_Info------------------------------------------------//

var App_Info = cc.Class({
  name: "App_Info",
  properties: {
    AppID: {
      "default": "",
      type: cc.Text,
      serializable: true,
      tooltip: "App id form photon dashboard"
    },
    AppVersion: {
      "default": "",
      type: cc.Text,
      serializable: true,
      tooltip: "App version for photon"
    },
    Wss: {
      displayName: "IsSecure",
      "default": false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "If photon should use secure and reliable protocols"
    },
    MasterServer: {
      "default": "",
      type: cc.Text,
      serializable: true,
      tooltip: "master server for photon to connect"
    },
    FbAppID: {
      "default": "",
      type: cc.Text,
      serializable: true,
      tooltip: "FB app id used for FB autherization"
    }
  }
}); //---------------------------------------class data related to MultiplayerController----------------------------------//

var MultiplayerController = cc.Class({
  name: "MultiplayerController",
  "extends": cc.Component,
  properties: {
    PhotonAppInfo: {
      "default": null,
      type: App_Info,
      serializable: true
    },
    MaxPlayers: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    },
    MaxSpectators: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    }
  },
  statics: {
    //creating static instance of the class
    Instance: null
  },
  //this function is called when instance of this class is created
  onLoad: function onLoad() {
    this.Init_MultiplayerController();
  },

  /**
  @summary Initialize some essentails data for multiplayer controller class
  @method Init_MultiplayerController
  @param none
  @returns no return
  **/
  Init_MultiplayerController: function Init_MultiplayerController() {
    if (!MultiplayerController.Instance) {
      cc.game.addPersistRootNode(this.node);
      this.InitializePhoton();
      console.log(AppInfo);
      PhotonRef = new DemoLoadBalancing();
      MultiplayerController.Instance = this;
    }

    this.LeaveRoom = false;
    this.RoomName = "";
    this.Message = "";
    ShowRoom = false;
    this.JoinedRoom = false;
    this.CheckReferences();
  },

  /**
  @summary check reference to some variables and classes
  @method CheckReferences
  @param none
  @returns no return
  **/
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },

  /**
  @summary remove persist node when want to restart scene
  @method RemovePersistNode
  @param none
  @returns no return
  **/
  RemovePersistNode: function RemovePersistNode() {
    MultiplayerController.Instance = null;
    cc.game.removePersistRootNode(this.node);
  },

  /**
  @summary function to get name of current opened scene
  @method getSceneName
  @param none
  @returns {string} sceneName
  **/
  getSceneName: function getSceneName() {
    var sceneName;
    var _sceneInfos = cc.game._sceneInfos;

    for (var i = 0; i < _sceneInfos.length; i++) {
      if (_sceneInfos[i].uuid == cc.director._scene._id) {
        sceneName = _sceneInfos[i].url;
        sceneName = sceneName.substring(sceneName.lastIndexOf('/') + 1).match(/[^\.]+/)[0];
      }
    }

    return sceneName;
  },

  /**
  @summary function to set "ShowRoom" bool value
  @method ToggleShowRoom_Bool
  @param {boolean} _state
  @returns no return
  **/
  ToggleShowRoom_Bool: function ToggleShowRoom_Bool(_state) {
    ShowRoom = _state;
  },

  /**
  @summary function to set "LeaveRoom" bool value
  @method ToggleLeaveRoom_Bool
  @param {boolean} _state
  @returns no return
  **/
  ToggleLeaveRoom_Bool: function ToggleLeaveRoom_Bool(_state) {
    this.LeaveRoom = _state;
  },

  /**
  @summary returns Photon "PhotonRef" instance created by multiplayer class
  @method getPhotonRef
  @param none
  @returns {object} PhotonRef
  **/
  getPhotonRef: function getPhotonRef() {
    return PhotonRef;
  },

  /**
  @summary returns myActor instance created by photon
  @method PhotonActor
  @param none
  @returns {object} Actor
  **/
  PhotonActor: function PhotonActor() {
    return PhotonRef.myActor();
  },

  /**
  @summary returns myRoomActorsArray created by photon
  @method RoomActors
  @param none
  @returns {object} Actor
  **/
  RoomActors: function RoomActors() {
    return PhotonRef.myRoomActorsArray();
  },

  /**
  @summary returns isSpectate variable from custom property of current actor
  @method CheckSpectate
  @param none
  @returns {boolean} isSpectate
  **/
  CheckSpectate: function CheckSpectate() {
    return PhotonRef.myActor().customProperties.RoomEssentials.IsSpectate;
  },

  /**
  @summary Initialize photon with appid,app version, Wss etc
  @method InitializePhoton
  @param none
  @returns no return
  **/
  InitializePhoton: function InitializePhoton() {
    AppInfo.AppId = this.PhotonAppInfo.AppID;
    AppInfo.AppVersion = this.PhotonAppInfo.AppVersion;
    AppInfo.Wss = this.PhotonAppInfo.Wss;
    AppInfo.MasterServer = this.PhotonAppInfo.MasterServer;
    AppInfo.FbAppId = this.PhotonAppInfo.FbAppID;
  },

  /**
   @summary send connection request to photon
   @method RequestConnection
   @param none
   @returns no return
  **/
  RequestConnection: function RequestConnection() {
    if (PhotonRef.state == 5 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true) console.log("already connected");else PhotonRef.start();
  },

  /**
  @summary Disconnect from photon
  @method DisconnectPhoton
  @param none
  @returns no return
  **/
  DisconnectPhoton: function DisconnectPhoton() {
    if (PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.isJoinedToRoom() == true) {
      PhotonRef.disconnect();
      this.JoinedRoom = false; //PhotonRef.leaveRoom();

      this.ResetState();
    } else {
      console.log("not inside any room or lobby or connected to photon");
    }
  },

  /**
  @summary reseting few values
  @method ResetState
  @param none
  @returns no return
  **/
  ResetState: function ResetState() {
    this.LeaveRoom = false;
    this.JoinedRoom = false;
    ShowRoom = false;
    stateText = "";
  },

  /**
  @summary called when room name got input from game
  @method OnRoomNameChange
  @param {string} name
  @returns no return
  **/
  OnRoomNameChange: function OnRoomNameChange(name) {
    this.RoomName = name;
  },

  /**
  @summary called when message window got input from game
  @method OnMessageChange
  @param {string} msg
  @returns no return
  **/
  OnMessageChange: function OnMessageChange(msg) {
    this.Message = msg;
  },

  /**
  @summary update custom room properties
  @method UpdateRoomCustomProperites
  @returns no return
  **/
  UpdateRoomCustomProperites: function UpdateRoomCustomProperites(_playerUpdate, _playerValue, _initialSetupUpdate, _initialSetupValue, _playerGameInfoUpdate, _playerGameInfoValue, _turnNumberUpdate, _turnNumbervalue) {
    if (_playerUpdate === void 0) {
      _playerUpdate = false;
    }

    if (_playerValue === void 0) {
      _playerValue = 0;
    }

    if (_initialSetupUpdate === void 0) {
      _initialSetupUpdate = false;
    }

    if (_initialSetupValue === void 0) {
      _initialSetupValue = false;
    }

    if (_playerGameInfoUpdate === void 0) {
      _playerGameInfoUpdate = false;
    }

    if (_playerGameInfoValue === void 0) {
      _playerGameInfoValue = null;
    }

    if (_turnNumberUpdate === void 0) {
      _turnNumberUpdate = false;
    }

    if (_turnNumbervalue === void 0) {
      _turnNumbervalue = 0;
    }

    if (_playerUpdate) PhotonRef.myRoom().setCustomProperty("Player", _playerValue, true);
    if (_initialSetupUpdate) PhotonRef.myRoom().setCustomProperty("InitialSetup", _initialSetupValue, true);
    if (_playerGameInfoUpdate) PhotonRef.myRoom().setCustomProperty("PlayerGameInfo", _playerGameInfoValue, true);
    if (_turnNumberUpdate) PhotonRef.myRoom().setCustomProperty("TurnNumber", _turnNumbervalue, true);
  },

  /**
  @summary create room request
  @method CreateRoom
  @param none
  @returns no return
  **/
  CreateRoom: function CreateRoom() {
    if (PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.state == 8) {
      if (PhotonRef.isJoinedToRoom() == false) {
        var _data = new RoomProperty();

        _data.Player = 0;
        var roomOptions = {
          "isVisible": true,
          "isOpen": true,
          "maxPlayers": this.MaxPlayers + this.MaxSpectators,
          "customGameProperties": _data
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(false);
        PhotonRef.myActor().name = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        PhotonRef.myActor().setCustomProperty("Data", GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        PhotonRef.myActor().setCustomProperty("PlayerSessionData", {});
        PhotonRef.myActor().setCustomProperty("RoomEssentials", {
          IsSpectate: false
        });
        PhotonRef.setUserId(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);
        var RoomID = Math.floor(Math.random() * Date.now());
        PhotonRef.createRoom("Room_" + RoomID, roomOptions);
      } else {
        console.log("already joined the room");
      }
    } else {
      console.log("you are not connected or connection is dropped, please connect to photon again.");
    }
  },

  /**
  @summary join room request by name
  @method JoinRoom
  @param {string} _roomName
  @returns no return
  **/
  JoinRoom: function JoinRoom(_roomName) {
    if (PhotonRef.state == 5 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.state == 8) {
      if (PhotonRef.isJoinedToRoom() == false || PhotonRef.state != 8) {
        var roomOptions = {
          "isVisible": true,
          "isOpen": false,
          "maxPlayers": this.MaxPlayers + this.MaxSpectators //"customGameProperties":{"RoomEssentials": {IsSpectate:true}}

        };
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(false);
        PhotonRef.myActor().name = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        PhotonRef.myActor().setCustomProperty("Data", GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        PhotonRef.myActor().setCustomProperty("PlayerSessionData", {});
        PhotonRef.myActor().setCustomProperty("RoomEssentials", {
          IsSpectate: true
        });
        PhotonRef.setUserId(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);
        PhotonRef.joinRoom(_roomName, roomOptions);
      } else {
        console.log("already joined the room");
      }
    } else {
      console.log("you are not connected or connection is dropped, please connect to photon again.");
    }
  },

  /**
  @summary join random room
  @method JoinRandomRoom
  @param none
  @returns no return
  **/
  JoinRandomRoom: function JoinRandomRoom() {
    if (PhotonRef.state == 5 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.state == 8) {
      if (PhotonRef.isJoinedToRoom() == false || PhotonRef.state != 8) {
        var _data = new RoomProperty();

        _data.Player = 0;
        var roomOptions = {
          //"expectedMaxPlayers":this.MaxPlayers+MaxSpectators,
          "expectedCustomRoomProperties": _data
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(false);
        PhotonRef.myActor().name = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        PhotonRef.myActor().setCustomProperty("Data", GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        PhotonRef.myActor().setCustomProperty("PlayerSessionData", {});
        PhotonRef.myActor().setCustomProperty("RoomEssentials", {
          IsSpectate: false
        });
        PhotonRef.setUserId(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);
        PhotonRef.joinRandomRoom(roomOptions);
      } else {
        console.log("already joined the room");
      }
    } else {
      console.log("you are not connected or connection is dropped, please connect to photon again.");
    }
  },

  /**
  @summary Send card index over network
  @method SendCardData
  @param {Object} _data
  @returns no return
  **/
  SendCardData: function SendCardData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending card data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(5, {
          CardData: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
   @summary Send game over call
   @method SendGameOver
   @param {Object} _data
   @returns no return
  **/
  SendGameOver: function SendGameOver(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending game over call");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(6, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
  @summary Send Player Data over network
  @method SendData
  @param {Object} _data
  @returns no return
  **/
  SendData: function SendData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending player data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(1, {
          PlayerInfo: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary send dice data
    @method DiceRollEvent
    @param {Object} _data
    @returns no return
   **/
  DiceRollEvent: function DiceRollEvent(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending dice count");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(3, {
          DiceCount: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary send user id of player to all other who had completed their turn
    @method SyncTurnCompletion
    @param {Object} _data
    @returns no return
   **/
  SyncTurnCompletion: function SyncTurnCompletion(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending turn completion data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(4, {
          UID: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
  @summary Start Turn for initial turn
  @method StartTurn
  @param {Object} _data
  @returns no return
  **/
  StartTurn: function StartTurn(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("Starting Turn");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(2, {
          TurnNumber: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
  @summary Show toast message on the console
  @method ShowToast
  @param {string} message message to be shown 
  @returns no return
  **/
  ShowToast: function ShowToast(msg) {
    console.log("toast message: " + msg);
  },

  /**
  @summary Receive event from photon raise on 
  @method CallRecieveEvent
  @returns no return
  **/
  CallRecieveEvent: function CallRecieveEvent(_eventCode, _senderName, _senderID, _data) {
    var _this = this;

    var InstanceNull = true; //to check if instance is null in case class instance is not loaded and its receives callback

    if (GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager() == null) {
      InstanceNull = true;
      setTimeout(function () {
        _this.CallRecieveEvent(_eventCode, _senderName, _senderID, _data);
      }, 50);
    } else {
      InstanceNull = false;
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().ReceiveEvent(_eventCode, _senderName, _senderID, _data);
    }
  },
  RestartGame: function RestartGame() {
    MultiplayerController.Instance.JoinedRoom = false;
    MultiplayerController.Instance.ResetState();
    MultiplayerController.Instance.DisconnectPhoton();
    GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
    GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
    GamePlayReferenceManager.Instance.RemovePersistNode();
    cc.director.loadScene("Splash");
  },
  //called every frame
  update: function update(dt) {
    /**
        @summary function called by photon whenever there is some change in connection state
        @method onStateChange
        @param {object} state
        @returns no return
    **/
    PhotonRef.onStateChange = function (state) {
      //#region Connection States
      //state 1 : connectingToNameServer
      //State 2 : ConnectedToNameServer
      //State 3 : ConnectingToMasterServer
      //State 4 : ConnectedToMasterServer
      //State 5:  JoinedLobby
      //State 6 : ConnectingToGameserver
      //State 7 : ConnectedToGameserver
      //State 8 : Joined
      //State 10: Disconnected 
      //#endregion
      var LBC = Photon.LoadBalancing.LoadBalancingClient;
      console.log("StateCode: " + state + " " + LBC.StateToName(state));
      if (state == 1) cc.systemEvent.emit("UpdateStatusWindow", "connecting to server...");else if (state == 4) cc.systemEvent.emit("UpdateStatusWindow", "connected to server");else if (state == 5) //has joined lobby
        {
          if (ShowRoom == false) {
            cc.systemEvent.emit("UpdateStatusWindow", "waiting for other players...");
            MultiplayerController.Instance.JoinRandomRoom();
          } else if (ShowRoom == true) {
            cc.systemEvent.emit("UpdateStatusWindow", "showing rooms list...");
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_UIManager().ToggleProfileScreen_SpectateUI(false);
              GamePlayReferenceManager.Instance.Get_UIManager().ToggleRoomScreen_SpectateUI(true);
            }, 1000);
          }
        }
    };
    /**
        @summary function called by photon whenever its logger receives debug
        @method debug
        @param {object} mess
        @returns no return
    **/


    PhotonRef.logger.debug = function (mess) {
      console.log(mess);
    };
    /**
        @summary function called by photon whenever its logger receives info
        @method info
        @param {object} mess
        @param {object} param
        @returns no return
    **/


    PhotonRef.logger.info = function (mess, param) {
      console.log(mess + param);
      stateText += mess + " " + param + "\n";
    };
    /**
        @summary function called by photon whenever its logger receives warn
        @method warn
        @param {object} mess
        @param {object} param1
        @param {object} param2
        @param {object} param3
        @returns no return
    **/


    PhotonRef.logger.warn = function (mess, param1, param2, param3) {
      console.log(mess + " " + param1 + " " + param2 + " " + param3);

      if (param1 == 225) //no room found
        {
          console.log("no random room was found, creating one");
          MultiplayerController.Instance.CreateRoom();
        }

      if (param1 == 226) //room does not exists or is full
        {
          GamePlayReferenceManager.Instance.Get_UIManager().ToggleLoadingNode(false);
          GamePlayReferenceManager.Instance.Get_UIManager().ShowToast("Room is full, please select any other room to spectate.");
        }
    };
    /**
       @summary function called by photon whenever its logger receives error
       @method error
       @param {object} mess
       @param {object} param
       @returns no return
    **/


    PhotonRef.logger.error = function (mess, param) {
      console.log(mess);
    };
    /**
      @summary function called by photon whenever its logger receives exception
      @method exception
      @param {object} mess
      @returns no return
    **/


    PhotonRef.logger.exception = function (mess) {
      console.log(mess);
    };
    /**
       @summary function called by photon whenever its logger receives some format
       @method format
       @param {object} mess
       @returns no return
    **/


    PhotonRef.logger.format = function (mess) {
      console.log(mess);
    };
    /**
       @summary function called by photon whenever player joins lobby
       @method onRoomList
       @param {object} rooms
       @returns no return
    **/


    PhotonRef.onRoomList = function (rooms) {
      stateText += "\n" + "Rooms List:" + "\n";

      if (rooms.length == 0) {
        stateText += "No rooms in lobby." + "\n";
      } else {
        GamePlayReferenceManager.Instance.Get_UIManager().ResetRoomList();

        for (var i = 0; i < rooms.length; ++i) {
          GamePlayReferenceManager.Instance.Get_UIManager().UpdateRoomsList_SpectateUI(rooms[i].name, rooms[i].playerCount);
          console.log("Room name: " + rooms[i].name);
          stateText += "Room: " + rooms[i].name + "\n";
        }
      }
    };
    /**
        @summary function called by photon whenever there is change in rooms list (room added,updated,removed etc)
        @method onRoomListUpdate
        @param {object} rooms
        @param {object} roomsUpdated
        @param {object} roomsAdded
        @param {object} roomsRemoved
        @returns no return
    **/


    PhotonRef.onRoomListUpdate = function (rooms, roomsUpdated, roomsAdded, roomsRemoved) {
      GamePlayReferenceManager.Instance.Get_UIManager().ResetRoomList();

      for (var i = 0; i < rooms.length; ++i) {
        GamePlayReferenceManager.Instance.Get_UIManager().UpdateRoomsList_SpectateUI(rooms[i].name, rooms[i].playerCount);
        console.log("Room name: " + rooms[i].name);
        stateText += "Room: " + rooms[i].name + "\n";
      }

      console.log("Rooms List updated: " + roomsUpdated.length + " updated, " + roomsAdded.length + " added, " + roomsRemoved.length + " removed");
    };
    /**
        @summary function called locally by photon when even player joins room
        @method onJoinRoom
        @returns no return
    **/


    PhotonRef.onJoinRoom = function () {
      //#region Logs for game
      console.log("Game " + this.myRoom().name + " joined");
      console.log(PhotonRef.myActor());
      console.log(PhotonRef.myRoom());
      console.log(PhotonRef.myRoomActorsArray());
      console.log(PhotonRef.myRoomActorsArray().length);
      console.log(PhotonRef.myRoomActorsArray()[0].loadBalancingClient.userId);
      console.log(PhotonRef.myRoom()._customProperties);
      console.log(PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"]); //#endregion

      if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == true) //check if player who joined is spectate
        {
          MultiplayerController.Instance.JoinedRoom = true;
          setTimeout(function () {
            cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
          }, 1000); //function in UIManager
        }
    };
    /**
        @summary function called remotely by photon when even player joins room
        @method onActorJoin
        @param {object} actor
        @returns no return
    **/


    PhotonRef.onActorJoin = function (actor) {
      if (PhotonRef.myRoomActorCount() == MultiplayerController.Instance.MaxPlayers) //when max player required to start game has been added
        {
          console.log("all required players joined, starting the game..");
          cc.systemEvent.emit("UpdateStatusWindow", "players found");
          cc.systemEvent.emit("UpdateStatusWindow", "starting game...");
          MultiplayerController.Instance.JoinedRoom = true;
          setTimeout(function () {
            cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
          }, 1000); //function in ui manager

          MultiplayerController.Instance.UpdateRoomCustomProperites(true, PhotonRef.myRoomActorCount(), false, false, false, null, false, 0); //PhotonRef.myRoom().setCustomProperty("Player",PhotonRef.myRoomActorCount(),true);  
        }

      console.log("actor " + actor.actorNr + " joined");
      console.error("Total Players: " + PhotonRef.myRoomActorCount());
      console.log(PhotonRef.myRoom());
    },
    /**
        @summary function called remotely by photon when even player leaves a room
        @method onActorLeave
        @param {object} actor
        @returns no return
    **/
    PhotonRef.onActorLeave = function (actor) {
      if (MultiplayerController.Instance.JoinedRoom == true) {
        if (!actor.customProperties.PlayerSessionData.GameOver) {
          if (!MultiplayerController.Instance.LeaveRoom) {
            if (actor.customProperties.RoomEssentials.IsSpectate) {
              console.log("spectator left, so dont mind, cont game");
              console.log("actor " + actor.actorNr + " left");
              GamePlayReferenceManager.Instance.Get_GameManager().CheckTurnOnSpectateLeave_SpectateManager();
            } else {
              console.log("actor " + actor.actorNr + " left");
              MultiplayerController.Instance.JoinedRoom = false;
              MultiplayerController.Instance.ResetState();
              MultiplayerController.Instance.DisconnectPhoton();

              if (MultiplayerController.Instance.getSceneName() == "GamePlay") //if scene is gameplay let player finish game forcefully
                {
                  GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("other player " + actor.name + " has left", 2000);
                  setTimeout(function () {
                    GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
                    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
                    GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
                    GamePlayReferenceManager.Instance.RemovePersistNode();
                    cc.director.loadScene("Splash");
                  }, 2100);
                }
            }
          }
        }
      }
    };
    /**
        @summary function called by photon when even player own properties got changed
        @method onActorPropertiesChange
        @param {object} actor
        @returns no return
    **/

    PhotonRef.onActorPropertiesChange = function (actor) {};
    /**
        @summary function called by photon when even player room properties got changed
        @method onMyRoomPropertiesChange
        @param {object} actor
        @returns no return
    **/


    PhotonRef.onMyRoomPropertiesChange = function () {};
    /**
       @summary function called by photon to handle errors
       @method onError
       @param {object} errorCode
        @param {object} errorMsg
       @returns no return
    **/


    PhotonRef.onError = function (errorCode, errorMsg) {
      console.log("Error " + errorCode + ": " + errorMsg);
    };
    /**
        @summary function called by photon whenever an event is received with some data
        @method onEvent
        @param {object} code
        @param {object} content
        @param {object} actorNr
        @returns no return
    **/


    PhotonRef.onEvent = function (code, content, actorNr) {
      MultiplayerController.Instance.CheckReferences();

      switch (code) {
        case 1:
          //receving playerdata info
          console.log("received player data");
          var PlayerInfoData = content.PlayerInfo;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(1, senderName, senderID, PlayerInfoData);
          break;

        case 2:
          //start turn raise event
          console.log("received start turn event");
          var _Turn = content.TurnNumber;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(2, senderName, senderID, _Turn);
          break;

        case 3:
          // dice count
          console.log("received dice count");
          var _dice = content.DiceCount;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(3, senderName, senderID, _dice);
          break;

        case 4:
          //receing user id of player who has completed turn
          console.log("received player turn completed");
          var _ID = content.UID;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(4, senderName, senderID, _ID);
          break;

        case 5:
          //receiving card data (index) so other users can sync them
          console.log("received card data");
          var _card = content.CardData;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(5, senderName, senderID, _card);
          break;

        case 6:
          //receive game over data
          console.log("received game over call");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(6, senderName, senderID, _data);
          break;

        default:
      }
    };
  }
});
module.exports = MultiplayerController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJSb29tUHJvcGVydHkiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJQbGF5ZXIiLCJ0eXBlIiwiSW50ZWdlciIsInNlcmlhbGl6YWJsZSIsIkluaXRpYWxTZXR1cCIsIkJvb2xlYW4iLCJQbGF5ZXJHYW1lSW5mbyIsIlRleHQiLCJUdXJuTnVtYmVyIiwiQXBwX0luZm8iLCJBcHBJRCIsInRvb2x0aXAiLCJBcHBWZXJzaW9uIiwiV3NzIiwiZGlzcGxheU5hbWUiLCJNYXN0ZXJTZXJ2ZXIiLCJGYkFwcElEIiwiTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiQ29tcG9uZW50IiwiUGhvdG9uQXBwSW5mbyIsIk1heFBsYXllcnMiLCJNYXhTcGVjdGF0b3JzIiwic3RhdGljcyIsIkluc3RhbmNlIiwib25Mb2FkIiwiSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIkluaXRpYWxpemVQaG90b24iLCJjb25zb2xlIiwibG9nIiwiQXBwSW5mbyIsIkRlbW9Mb2FkQmFsYW5jaW5nIiwiTGVhdmVSb29tIiwiUm9vbU5hbWUiLCJNZXNzYWdlIiwiSm9pbmVkUm9vbSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lTmFtZSIsInNjZW5lTmFtZSIsIl9zY2VuZUluZm9zIiwiaSIsImxlbmd0aCIsInV1aWQiLCJkaXJlY3RvciIsIl9zY2VuZSIsIl9pZCIsInVybCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWF0Y2giLCJUb2dnbGVTaG93Um9vbV9Cb29sIiwiX3N0YXRlIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJQaG90b25BY3RvciIsIm15QWN0b3IiLCJSb29tQWN0b3JzIiwibXlSb29tQWN0b3JzQXJyYXkiLCJDaGVja1NwZWN0YXRlIiwiY3VzdG9tUHJvcGVydGllcyIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIkFwcElkIiwiRmJBcHBJZCIsIlJlcXVlc3RDb25uZWN0aW9uIiwic3RhdGUiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5Iiwic3RhcnQiLCJEaXNjb25uZWN0UGhvdG9uIiwiaXNKb2luZWRUb1Jvb20iLCJkaXNjb25uZWN0IiwiUmVzZXRTdGF0ZSIsIk9uUm9vbU5hbWVDaGFuZ2UiLCJPbk1lc3NhZ2VDaGFuZ2UiLCJtc2ciLCJVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyIsIl9wbGF5ZXJVcGRhdGUiLCJfcGxheWVyVmFsdWUiLCJfaW5pdGlhbFNldHVwVXBkYXRlIiwiX2luaXRpYWxTZXR1cFZhbHVlIiwiX3BsYXllckdhbWVJbmZvVXBkYXRlIiwiX3BsYXllckdhbWVJbmZvVmFsdWUiLCJfdHVybk51bWJlclVwZGF0ZSIsIl90dXJuTnVtYmVydmFsdWUiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNyZWF0ZVJvb20iLCJfZGF0YSIsInJvb21PcHRpb25zIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJzZXRVc2VySWQiLCJ1c2VySUQiLCJSb29tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEYXRlIiwibm93IiwiY3JlYXRlUm9vbSIsIkpvaW5Sb29tIiwiX3Jvb21OYW1lIiwiam9pblJvb20iLCJKb2luUmFuZG9tUm9vbSIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmREYXRhIiwiUGxheWVySW5mbyIsIkRpY2VSb2xsRXZlbnQiLCJEaWNlQ291bnQiLCJTeW5jVHVybkNvbXBsZXRpb24iLCJVSUQiLCJTdGFydFR1cm4iLCJTaG93VG9hc3QiLCJDYWxsUmVjaWV2ZUV2ZW50IiwiX2V2ZW50Q29kZSIsIl9zZW5kZXJOYW1lIiwiX3NlbmRlcklEIiwiSW5zdGFuY2VOdWxsIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJzZXRUaW1lb3V0IiwiUmVjZWl2ZUV2ZW50IiwiUmVzdGFydEdhbWUiLCJsb2FkU2NlbmUiLCJ1cGRhdGUiLCJkdCIsIm9uU3RhdGVDaGFuZ2UiLCJMQkMiLCJMb2FkQmFsYW5jaW5nQ2xpZW50IiwiU3RhdGVUb05hbWUiLCJzeXN0ZW1FdmVudCIsImVtaXQiLCJHZXRfVUlNYW5hZ2VyIiwiVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJIiwiVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJIiwibG9nZ2VyIiwiZGVidWciLCJtZXNzIiwiaW5mbyIsInBhcmFtIiwid2FybiIsInBhcmFtMSIsInBhcmFtMiIsInBhcmFtMyIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwiZXhjZXB0aW9uIiwiZm9ybWF0Iiwib25Sb29tTGlzdCIsInJvb21zIiwiUmVzZXRSb29tTGlzdCIsIlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJIiwicGxheWVyQ291bnQiLCJvblJvb21MaXN0VXBkYXRlIiwicm9vbXNVcGRhdGVkIiwicm9vbXNBZGRlZCIsInJvb21zUmVtb3ZlZCIsIm9uSm9pblJvb20iLCJsb2FkQmFsYW5jaW5nQ2xpZW50IiwidXNlcklkIiwiX2N1c3RvbVByb3BlcnRpZXMiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIm9uQWN0b3JKb2luIiwiYWN0b3IiLCJteVJvb21BY3RvckNvdW50Iiwib25BY3RvckxlYXZlIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJHYW1lT3ZlciIsIkdldF9HYW1lTWFuYWdlciIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJvbkFjdG9yUHJvcGVydGllc0NoYW5nZSIsIm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSIsIm9uRXJyb3IiLCJlcnJvckNvZGUiLCJlcnJvck1zZyIsIm9uRXZlbnQiLCJjb2RlIiwiY29udGVudCIsIlBsYXllckluZm9EYXRhIiwiX1R1cm4iLCJfZGljZSIsIl9JRCIsIl9jYXJkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLFNBQUo7QUFDQSxJQUFJQyxTQUFTLEdBQUMsRUFBZDtBQUNBLElBQUlDLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsUUFBUSxHQUFDLEtBQWIsRUFFQTs7QUFDQSxJQUFJQyxZQUFZLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUMsY0FEaUI7QUFFdEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxDQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxPQUZMO0FBR0pDLE1BQUFBLFlBQVksRUFBRTtBQUhWLEtBREE7QUFNUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsS0FEQztBQUVWSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsT0FGQztBQUdWRixNQUFBQSxZQUFZLEVBQUU7QUFISixLQU5OO0FBV1JHLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLEVBREc7QUFFWkwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNXLElBRkc7QUFHWkosTUFBQUEsWUFBWSxFQUFFO0FBSEYsS0FYUjtBQWdCUkssSUFBQUEsVUFBVSxF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S0EzREQ7QUE0REY7QUFqN0I2QixDQUFULENBQTFCO0FBcTdCQWlILE1BQU0sQ0FBQ0MsT0FBUCxHQUFlOUwscUJBQWYiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcmlhYmxlc1xyXG52YXIgUGhvdG9uUmVmO1xyXG52YXIgc3RhdGVUZXh0PVwiXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFNob3dSb29tPWZhbHNlO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gUm9vbVByb3BlcnR5LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvb21Qcm9wZXJ0eT1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUm9vbVByb3BlcnR5XCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGxheWVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSW5pdGlhbFNldHVwOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVHVybk51bWJlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gQXBwX0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXBwX0luZm89Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkFwcF9JbmZvXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQXBwSUQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJBcHAgaWQgZm9ybSBwaG90b24gZGFzaGJvYXJkXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEFwcFZlcnNpb246IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJBcHAgdmVyc2lvbiBmb3IgcGhvdG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFdzczoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIklzU2VjdXJlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIklmIHBob3RvbiBzaG91bGQgdXNlIHNlY3VyZSBhbmQgcmVsaWFibGUgcHJvdG9jb2xzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1hc3RlclNlcnZlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIm1hc3RlciBzZXJ2ZXIgZm9yIHBob3RvbiB0byBjb25uZWN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEZiQXBwSUQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJGQiBhcHAgaWQgdXNlZCBmb3IgRkIgYXV0aGVyaXphdGlvblwiXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBNdWx0aXBsYXllckNvbnRyb2xsZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE11bHRpcGxheWVyQ29udHJvbGxlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiTXVsdGlwbGF5ZXJDb250cm9sbGVyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGhvdG9uQXBwSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEFwcF9JbmZvLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBNYXhQbGF5ZXJzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sIFxyXG4gICAgICAgIE1heFNwZWN0YXRvcnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSwgXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHsgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5Jbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgc29tZSBlc3NlbnRhaWxzIGRhdGEgZm9yIG11bHRpcGxheWVyIGNvbnRyb2xsZXIgY2xhc3NcclxuICAgIEBtZXRob2QgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXJcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLkluaXRpYWxpemVQaG90b24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coQXBwSW5mbyk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZiA9IG5ldyBEZW1vTG9hZEJhbGFuY2luZygpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuTGVhdmVSb29tPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9XCJcIjtcclxuICAgICAgICB0aGlzLk1lc3NhZ2U9XCJcIjtcclxuICAgICAgICBTaG93Um9vbT1mYWxzZTtcclxuICAgICAgICB0aGlzLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjaGVjayByZWZlcmVuY2UgdG8gc29tZSB2YXJpYWJsZXMgYW5kIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJlbW92ZSBwZXJzaXN0IG5vZGUgd2hlbiB3YW50IHRvIHJlc3RhcnQgc2NlbmVcclxuICAgIEBtZXRob2QgUmVtb3ZlUGVyc2lzdE5vZGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZT1udWxsO1xyXG4gICAgICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gZ2V0IG5hbWUgb2YgY3VycmVudCBvcGVuZWQgc2NlbmVcclxuICAgIEBtZXRob2QgZ2V0U2NlbmVOYW1lXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge3N0cmluZ30gc2NlbmVOYW1lXHJcbiAgICAqKi8gXHJcbiAgICBnZXRTY2VuZU5hbWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY2VuZU5hbWU7XHJcbiAgICAgICAgdmFyIF9zY2VuZUluZm9zID0gY2MuZ2FtZS5fc2NlbmVJbmZvcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9zY2VuZUluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKF9zY2VuZUluZm9zW2ldLnV1aWQgPT0gY2MuZGlyZWN0b3IuX3NjZW5lLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gX3NjZW5lSW5mb3NbaV0udXJsO1xyXG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gc2NlbmVOYW1lLnN1YnN0cmluZyhzY2VuZU5hbWUubGFzdEluZGV4T2YoJy8nKSsxKS5tYXRjaCgvW15cXC5dKy8pWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjZW5lTmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJTaG93Um9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlU2hvd1Jvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovIFxyXG4gICAgVG9nZ2xlU2hvd1Jvb21fQm9vbChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgU2hvd1Jvb209X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIkxlYXZlUm9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlTGVhdmVSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqLyBcclxuICAgIFRvZ2dsZUxlYXZlUm9vbV9Cb29sKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxlYXZlUm9vbT1fc3RhdGU7XHJcbiAgICB9LFxyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIFBob3RvbiBcIlBob3RvblJlZlwiIGluc3RhbmNlIGNyZWF0ZWQgYnkgbXVsdGlwbGF5ZXIgY2xhc3NcclxuICAgIEBtZXRob2QgZ2V0UGhvdG9uUmVmXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gUGhvdG9uUmVmXHJcbiAgICAqKi8gXHJcbiAgICBnZXRQaG90b25SZWYoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQaG90b25SZWY7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteUFjdG9yIGluc3RhbmNlIGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFBob3RvbkFjdG9yXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqLyBcclxuICAgIFBob3RvbkFjdG9yKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15Um9vbUFjdG9yc0FycmF5IGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJvb21BY3RvcnNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovIFxyXG4gICAgUm9vbUFjdG9ycygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgaXNTcGVjdGF0ZSB2YXJpYWJsZSBmcm9tIGN1c3RvbSBwcm9wZXJ0eSBvZiBjdXJyZW50IGFjdG9yXHJcbiAgICBAbWV0aG9kIENoZWNrU3BlY3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gaXNTcGVjdGF0ZVxyXG4gICAgKiovIFxyXG4gICAgQ2hlY2tTcGVjdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBwaG90b24gd2l0aCBhcHBpZCxhcHAgdmVyc2lvbiwgV3NzIGV0Y1xyXG4gICAgQG1ldGhvZCBJbml0aWFsaXplUGhvdG9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRpYWxpemVQaG90b24oKVxyXG4gICAge1xyXG4gICAgICAgIEFwcEluZm8uQXBwSWQ9dGhpcy5QaG90b25BcHBJbmZvLkFwcElEO1xyXG4gICAgICAgIEFwcEluZm8uQXBwVmVyc2lvbj10aGlzLlBob3RvbkFwcEluZm8uQXBwVmVyc2lvbjtcclxuICAgICAgICBBcHBJbmZvLldzcz10aGlzLlBob3RvbkFwcEluZm8uV3NzO1xyXG4gICAgICAgIEFwcEluZm8uTWFzdGVyU2VydmVyPXRoaXMuUGhvdG9uQXBwSW5mby5NYXN0ZXJTZXJ2ZXI7XHJcbiAgICAgICAgQXBwSW5mby5GYkFwcElkPXRoaXMuUGhvdG9uQXBwSW5mby5GYkFwcElEOyAgXHJcbiAgICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGNvbm5lY3Rpb24gcmVxdWVzdCB0byBwaG90b25cclxuICAgIEBtZXRob2QgUmVxdWVzdENvbm5lY3Rpb25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVxdWVzdENvbm5lY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGNvbm5lY3RlZFwiKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5zdGFydCgpOyAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBEaXNjb25uZWN0IGZyb20gcGhvdG9uXHJcbiAgICBAbWV0aG9kIERpc2Nvbm5lY3RQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRGlzY29ubmVjdFBob3RvbiAoKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSAgfHxQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgUGhvdG9uUmVmLmRpc2Nvbm5lY3QoKTsgICBcclxuICAgICAgICB0aGlzLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgLy9QaG90b25SZWYubGVhdmVSb29tKCk7XHJcbiAgICAgICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGluc2lkZSBhbnkgcm9vbSBvciBsb2JieSBvciBjb25uZWN0ZWQgdG8gcGhvdG9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXNldGluZyBmZXcgdmFsdWVzXHJcbiAgICBAbWV0aG9kIFJlc2V0U3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVzZXRTdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb209ZmFsc2U7ICAgIFxyXG4gICAgICAgIHRoaXMuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICBTaG93Um9vbT1mYWxzZTtcclxuICAgICAgICBzdGF0ZVRleHQ9XCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiByb29tIG5hbWUgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPblJvb21OYW1lQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIE9uUm9vbU5hbWVDaGFuZ2UobmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJvb21OYW1lPW5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gbWVzc2FnZSB3aW5kb3cgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPbk1lc3NhZ2VDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtc2dcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBPbk1lc3NhZ2VDaGFuZ2UobXNnKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTWVzc2FnZT1tc2c7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgdXBkYXRlIGN1c3RvbSByb29tIHByb3BlcnRpZXNcclxuICAgIEBtZXRob2QgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXNcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyhfcGxheWVyVXBkYXRlPWZhbHNlLF9wbGF5ZXJWYWx1ZT0wLF9pbml0aWFsU2V0dXBVcGRhdGU9ZmFsc2UsX2luaXRpYWxTZXR1cFZhbHVlPWZhbHNlLF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZT1mYWxzZSxfcGxheWVyR2FtZUluZm9WYWx1ZT1udWxsLF90dXJuTnVtYmVyVXBkYXRlPWZhbHNlLF90dXJuTnVtYmVydmFsdWU9MClcclxuICAgIHtcclxuICAgICAgICBpZihfcGxheWVyVXBkYXRlKVxyXG4gICAgICAgICAgICBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIixfcGxheWVyVmFsdWUsdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmKF9pbml0aWFsU2V0dXBVcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLF9pbml0aWFsU2V0dXBWYWx1ZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfcGxheWVyR2FtZUluZm9VcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsX3BsYXllckdhbWVJbmZvVmFsdWUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoX3R1cm5OdW1iZXJVcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIixfdHVybk51bWJlcnZhbHVlLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNyZWF0ZSByb29tIHJlcXVlc3RcclxuICAgIEBtZXRob2QgQ3JlYXRlUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDcmVhdGVSb29tICgpIHtcclxuICAgICAgICBpZihQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8UGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlIHx8IFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT1mYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YT1uZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEuUGxheWVyPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCJpc1Zpc2libGVcIjp0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgIFwiaXNPcGVuXCI6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgIFwibWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycyt0aGlzLk1heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6X2RhdGFcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWU9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwge0lzU3BlY3RhdGU6ZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFJvb21JRD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLmNyZWF0ZVJvb20oXCJSb29tX1wiK1Jvb21JRCxyb29tT3B0aW9ucyk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJvb20gcmVxdWVzdCBieSBuYW1lXHJcbiAgICBAbWV0aG9kIEpvaW5Sb29tXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gX3Jvb21OYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSm9pblJvb20gKF9yb29tTmFtZSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT1mYWxzZSB8fCBQaG90b25SZWYuc3RhdGUhPTgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaXNWaXNpYmxlXCI6dHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpc09wZW5cIjpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrdGhpcy5NYXhTcGVjdGF0b3JzXHJcbiAgICAgICAgICAgICAgICAgICAgLy9cImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6e1wiUm9vbUVzc2VudGlhbHNcIjoge0lzU3BlY3RhdGU6dHJ1ZX19XHJcbiAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHtJc1NwZWN0YXRlOnRydWV9KTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLmpvaW5Sb29tKF9yb29tTmFtZSxyb29tT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcmFuZG9tIHJvb21cclxuICAgIEBtZXRob2QgSm9pblJhbmRvbVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIEpvaW5SYW5kb21Sb29tICgpIHtcclxuICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgIHtcclxuICAgICAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09ZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlIT04KVxyXG4gICAgICAgIHsgIFxyXG4gICAgICAgICAgICB2YXIgX2RhdGE9bmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgICAgICBfZGF0YS5QbGF5ZXI9MDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgLy9cImV4cGVjdGVkTWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycytNYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgICAgICAgXCJleHBlY3RlZEN1c3RvbVJvb21Qcm9wZXJ0aWVzXCI6X2RhdGFcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7SXNTcGVjdGF0ZTpmYWxzZX0pO1xyXG4gICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgICAgICBQaG90b25SZWYuam9pblJhbmRvbVJvb20ocm9vbU9wdGlvbnMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICB9XHJcbiAgICAgICAgXHJcbn0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBjYXJkIGluZGV4IG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kQ2FyZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kQ2FyZERhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgY2FyZCBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDUsIHsgQ2FyZERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGdhbWUgb3ZlciBjYWxsXHJcbiAgICBAbWV0aG9kIFNlbmRHYW1lT3ZlclxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRHYW1lT3ZlciAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgY2FsbFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCg2LCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBQbGF5ZXIgRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwbGF5ZXIgZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxLCB7IFBsYXllckluZm86IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgZGljZSBkYXRhXHJcbiAgICBAbWV0aG9kIERpY2VSb2xsRXZlbnRcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBEaWNlUm9sbEV2ZW50IChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRpY2UgY291bnRcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoMywgeyBEaWNlQ291bnQ6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgdXNlciBpZCBvZiBwbGF5ZXIgdG8gYWxsIG90aGVyIHdobyBoYWQgY29tcGxldGVkIHRoZWlyIHR1cm5cclxuICAgIEBtZXRob2QgU3luY1R1cm5Db21wbGV0aW9uXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTeW5jVHVybkNvbXBsZXRpb24gKF9kYXRhKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgdHVybiBjb21wbGV0aW9uIGRhdGFcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoNCwgeyBVSUQ6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTdGFydCBUdXJuIGZvciBpbml0aWFsIHR1cm5cclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTdGFydFR1cm4gKF9kYXRhKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIFR1cm5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoMiwgeyBUdXJuTnVtYmVyOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICBcclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IFNob3cgdG9hc3QgbWVzc2FnZSBvbiB0aGUgY29uc29sZVxyXG4gICAgQG1ldGhvZCBTaG93VG9hc3RcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgc2hvd24gXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU2hvd1RvYXN0OmZ1bmN0aW9uKG1zZylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRvYXN0IG1lc3NhZ2U6IFwiK21zZyk7XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IFJlY2VpdmUgZXZlbnQgZnJvbSBwaG90b24gcmFpc2Ugb24gXHJcbiAgICBAbWV0aG9kIENhbGxSZWNpZXZlRXZlbnRcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDYWxsUmVjaWV2ZUV2ZW50OmZ1bmN0aW9uKF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBJbnN0YW5jZU51bGw9dHJ1ZTtcclxuXHJcbiAgICAgICAgLy90byBjaGVjayBpZiBpbnN0YW5jZSBpcyBudWxsIGluIGNhc2UgY2xhc3MgaW5zdGFuY2UgaXMgbm90IGxvYWRlZCBhbmQgaXRzIHJlY2VpdmVzIGNhbGxiYWNrXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCk9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnN0YW5jZU51bGw9dHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbGxSZWNpZXZlRXZlbnQoX2V2ZW50Q29kZSxfc2VuZGVyTmFtZSxfc2VuZGVySUQsX2RhdGEpO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluc3RhbmNlTnVsbD1mYWxzZTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJlc3RhcnRHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3BsYXNoXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAvL2NhbGxlZCBldmVyeSBmcmFtZVxyXG4gICAgdXBkYXRlIChkdCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBzb21lIGNoYW5nZSBpbiBjb25uZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25TdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vblN0YXRlQ2hhbmdlPWZ1bmN0aW9uKHN0YXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8jcmVnaW9uIENvbm5lY3Rpb24gU3RhdGVzXHJcbiAgICAgICAgICAgIC8vc3RhdGUgMSA6IGNvbm5lY3RpbmdUb05hbWVTZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSAyIDogQ29ubmVjdGVkVG9OYW1lU2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgMyA6IENvbm5lY3RpbmdUb01hc3RlclNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDQgOiBDb25uZWN0ZWRUb01hc3RlclNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDU6ICBKb2luZWRMb2JieVxyXG4gICAgICAgICAgICAvL1N0YXRlIDYgOiBDb25uZWN0aW5nVG9HYW1lc2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgNyA6IENvbm5lY3RlZFRvR2FtZXNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDggOiBKb2luZWRcclxuICAgICAgICAgICAgLy9TdGF0ZSAxMDogRGlzY29ubmVjdGVkIFxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIHZhciBMQkMgPSBQaG90b24uTG9hZEJhbGFuY2luZy5Mb2FkQmFsYW5jaW5nQ2xpZW50O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXRlQ29kZTogXCIrc3RhdGUrXCIgXCIrTEJDLlN0YXRlVG9OYW1lKHN0YXRlKSk7XHJcblxyXG4gICAgICAgICAgICBpZihzdGF0ZT09MSlcclxuICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcImNvbm5lY3RpbmcgdG8gc2VydmVyLi4uXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHN0YXRlPT00KVxyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwiY29ubmVjdGVkIHRvIHNlcnZlclwiKTtcclxuICAgICAgICAgICAgZWxzZSBpZihzdGF0ZT09NSkgLy9oYXMgam9pbmVkIGxvYmJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKFNob3dSb29tPT1mYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJ3YWl0aW5nIGZvciBvdGhlciBwbGF5ZXJzLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihTaG93Um9vbT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzaG93aW5nIHJvb21zIGxpc3QuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZGVidWdcclxuICAgICAgICAgICAgQG1ldGhvZCBkZWJ1Z1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5kZWJ1Zz1mdW5jdGlvbihtZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGluZm9cclxuICAgICAgICAgICAgQG1ldGhvZCBpbmZvXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5pbmZvID0gZnVuY3Rpb24gKG1lc3MscGFyYW0pIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzK3BhcmFtKTtcclxuICAgICAgICAgICBzdGF0ZVRleHQrPSBtZXNzK1wiIFwiK3BhcmFtK1wiXFxuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHdhcm5cclxuICAgICAgICAgICAgQG1ldGhvZCB3YXJuXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTFcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMlxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYubG9nZ2VyLndhcm4gPSBmdW5jdGlvbiAobWVzcyxwYXJhbTEscGFyYW0yLHBhcmFtMykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzK1wiIFwiK3BhcmFtMStcIiBcIitwYXJhbTIrXCIgXCIrcGFyYW0zKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhcmFtMT09MjI1KSAvL25vIHJvb20gZm91bmRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyByYW5kb20gcm9vbSB3YXMgZm91bmQsIGNyZWF0aW5nIG9uZVwiKTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DcmVhdGVSb29tKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHBhcmFtMT09MjI2KSAvL3Jvb20gZG9lcyBub3QgZXhpc3RzIG9yIGlzIGZ1bGxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIlJvb20gaXMgZnVsbCwgcGxlYXNlIHNlbGVjdCBhbnkgb3RoZXIgcm9vbSB0byBzcGVjdGF0ZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBlcnJvclxyXG4gICAgICAgICAgICBAbWV0aG9kIGVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5sb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAobWVzcyxwYXJhbSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5leGNlcHRpb24gPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBzb21lIGZvcm1hdFxyXG4gICAgICAgICAgICBAbWV0aG9kIGZvcm1hdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5sb2dnZXIuZm9ybWF0ID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHBsYXllciBqb2lucyBsb2JieVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLm9uUm9vbUxpc3QgPSBmdW5jdGlvbiAocm9vbXMpIHtcclxuICAgICAgICAgICAgc3RhdGVUZXh0Kz1cIlxcblwiK1wiUm9vbXMgTGlzdDpcIitcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgaWYocm9vbXMubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiTm8gcm9vbXMgaW4gbG9iYnkuXCIrXCJcXG5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUscm9vbXNbaV0ucGxheWVyQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIityb29tc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiUm9vbTogXCIrcm9vbXNbaV0ubmFtZStcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBjaGFuZ2UgaW4gcm9vbXMgbGlzdCAocm9vbSBhZGRlZCx1cGRhdGVkLHJlbW92ZWQgZXRjKVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RVcGRhdGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1VwZGF0ZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zQWRkZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zUmVtb3ZlZFxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uUm9vbUxpc3RVcGRhdGUgPSBmdW5jdGlvbiAocm9vbXMsIHJvb21zVXBkYXRlZCwgcm9vbXNBZGRlZCwgcm9vbXNSZW1vdmVkKSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSxyb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJvb20gbmFtZTogXCIrcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiUm9vbTogXCIrcm9vbXNbaV0ubmFtZStcIlxcblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbXMgTGlzdCB1cGRhdGVkOiBcIiArIHJvb21zVXBkYXRlZC5sZW5ndGggKyBcIiB1cGRhdGVkLCBcIiArIHJvb21zQWRkZWQubGVuZ3RoICsgXCIgYWRkZWQsIFwiICsgcm9vbXNSZW1vdmVkLmxlbmd0aCArIFwiIHJlbW92ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGxvY2FsbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uSm9pblJvb21cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkpvaW5Sb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gTG9ncyBmb3IgZ2FtZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgXCIgKyB0aGlzLm15Um9vbSgpLm5hbWUgKyBcIiBqb2luZWRcIik7ICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15QWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KClbMF0ubG9hZEJhbGFuY2luZ0NsaWVudC51c2VySWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkuX2N1c3RvbVByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdKTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgIGlmKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl09PXRydWUpIC8vY2hlY2sgaWYgcGxheWVyIHdobyBqb2luZWQgaXMgc3BlY3RhdGVcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLHRydWUsdHJ1ZSxcIkdhbWVQbGF5XCIpO30sIDEwMDApOyAvL2Z1bmN0aW9uIGluIFVJTWFuYWdlclxyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JKb2luXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uQWN0b3JKb2luID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCk9PU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzKSAvL3doZW4gbWF4IHBsYXllciByZXF1aXJlZCB0byBzdGFydCBnYW1lIGhhcyBiZWVuIGFkZGVkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHJlcXVpcmVkIHBsYXllcnMgam9pbmVkLCBzdGFydGluZyB0aGUgZ2FtZS4uXCIpXHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJwbGF5ZXJzIGZvdW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIix0cnVlLHRydWUsXCJHYW1lUGxheVwiKTt9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXModHJ1ZSxQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLGZhbHNlLGZhbHNlLGZhbHNlLG51bGwsZmFsc2UsMCk7XHJcbiAgICAgICAgICAgICAgICAvL1Bob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksdHJ1ZSk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBqb2luZWRcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUb3RhbCBQbGF5ZXJzOiBcIitQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBsZWF2ZXMgYSByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckxlYXZlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uQWN0b3JMZWF2ZSA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgICAgICBpZihNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT09dHJ1ZSlcclxuICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIWFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZighTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkxlYXZlUm9vbSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWN0YXRvciBsZWZ0LCBzbyBkb250IG1pbmQsIGNvbnQgZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5nZXRTY2VuZU5hbWUoKT09XCJHYW1lUGxheVwiKSAvL2lmIHNjZW5lIGlzIGdhbWVwbGF5IGxldCBwbGF5ZXIgZmluaXNoIGdhbWUgZm9yY2VmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIFwiK2FjdG9yLm5hbWUrXCIgaGFzIGxlZnRcIiwyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3BsYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIG93biBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvclByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25BY3RvclByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIHJvb20gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uTXlSb29tUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbk15Um9vbVByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHRvIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvckNvZGVcclxuICAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1zZ1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JDb2RlLCBlcnJvck1zZykge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnJvckNvZGUgKyBcIjogXCIgKyBlcnJvck1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBhbiBldmVudCBpcyByZWNlaXZlZCB3aXRoIHNvbWUgZGF0YVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXZlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvZGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvbnRlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yTnJcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkV2ZW50ID0gZnVuY3Rpb24gKGNvZGUsIGNvbnRlbnQsIGFjdG9yTnIpIHtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTovL3JlY2V2aW5nIHBsYXllcmRhdGEgaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgUGxheWVySW5mb0RhdGEgPSBjb250ZW50LlBsYXllckluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMSxzZW5kZXJOYW1lLHNlbmRlcklELFBsYXllckluZm9EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiAvL3N0YXJ0IHR1cm4gcmFpc2UgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHN0YXJ0IHR1cm4gZXZlbnRcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX1R1cm4gPSBjb250ZW50LlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMixzZW5kZXJOYW1lLHNlbmRlcklELF9UdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzogLy8gZGljZSBjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGljZSBjb3VudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGljZSA9IGNvbnRlbnQuRGljZUNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDMsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGljZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiAvL3JlY2VpbmcgdXNlciBpZCBvZiBwbGF5ZXIgd2hvIGhhcyBjb21wbGV0ZWQgdHVyblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIHR1cm4gY29tcGxldGVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9JRCA9IGNvbnRlbnQuVUlEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDQsc2VuZGVyTmFtZSxzZW5kZXJJRCxfSUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FyZCBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9jYXJkID0gY29udGVudC5DYXJkRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDUsc2VuZGVyTmFtZSxzZW5kZXJJRCxfY2FyZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OiAvL3JlY2VpdmUgZ2FtZSBvdmVyIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBjYWxsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNixzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICBcclxuICAgICB9LFxyXG4gICAgIFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzPU11bHRpcGxheWVyQ29udHJvbGxlcjsiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/PlayerProfileManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5bf9bM1le5IzIRIaU5nMgXr', 'PlayerProfileManager');
// Script/PlayerProfileManager.js

"use strict";

var businessDetailNodes = [];
var PlayerInfoUI = cc.Class({
  name: "PlayerInfoUI",
  properties: {
    PlayerName: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player name label of info player UI"
    },
    PlayerCash: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player cash label of info player UI"
    },
    PlayerMarketingAmount: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player marketing amount label of info player UI"
    },
    LawyerLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player lawyer status label of info player UI"
    },
    GoldBalanceLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player gold balance label of info player UI"
    },
    StockBalanceLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player stock balance label of info player UI"
    },
    PartnershipStatusLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player partnership status label of info player UI"
    },
    BusinessNumberLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the player business number label of info player UI"
    },
    BusinessDetailContent: {
      "default": null,
      type: cc.Node,
      serializable: true,
      toolTip: "Reference of the content of scroll view of business detail node of info player UI"
    },
    BusinessDetailPrefab: {
      "default": null,
      type: cc.Prefab,
      serializable: true,
      toolTip: "Reference of the business detail prefab of info player UI"
    }
  }
});
var GamePlayReferenceManager = null;

var GameManager = require('GameManager');

var PlayerProfileManager = cc.Class({
  name: "PlayerProfileManager",
  "extends": cc.Component,
  properties: {
    BGHighlight: {
      "default": null,
      type: cc.Node,
      serializable: true,
      toolTip: "Reference of the node of player's BG highlight Node"
    },
    PlayerAvatarSprite: {
      "default": null,
      type: cc.Sprite,
      serializable: true,
      toolTip: "Reference of the sprite of player's avatar"
    },
    PlayerNameLabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      toolTip: "Reference of the label of player's name"
    },
    PlayerTurnHighlighterNode: {
      "default": null,
      type: cc.Node,
      serializable: true,
      toolTip: "Reference of the node of player's highlighter"
    },
    AvatarSpriteFrames: {
      "default": [],
      type: [cc.SpriteFrame],
      serializable: true,
      toolTip: "Reference of the array of sprites of player's avatar"
    },
    PlayerIndex: {
      "default": -1,
      type: cc.integer,
      serializable: true
    },
    PlayerInfoScreen: {
      "default": null,
      type: cc.Node,
      serializable: true
    },
    PlayerInfoMainUI: {
      "default": null,
      type: PlayerInfoUI,
      serializable: true,
      tooltip: "all player's UI data"
    },
    PlayerInfo: {
      "default": null,
      type: GameManager.PlayerData,
      serializable: true,
      tooltip: "all player's data"
    }
  },
  onLoad: function onLoad() {
    this.CheckReferences();
  },
  //
  start: function start() {},
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  SetName: function SetName(_name) {
    this.PlayerNameLabel.string = _name;
  },
  SetAvatar: function SetAvatar(_index) {
    this.PlayerAvatarSprite.spriteFrame = this.AvatarSpriteFrames[_index];
  },
  ToggleBGHighlighter: function ToggleBGHighlighter(_state) {
    this.BGHighlight.active = _state;
  },
  ToggleTextighlighter: function ToggleTextighlighter(_state) {
    this.PlayerTurnHighlighterNode.active = _state;
  },
  SeeProfileData: function SeeProfileData() {
    this.PlayerInfoScreen.active = true;
    this.CheckReferences();
    businessDetailNodes = [];
    var _tempData = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[this.PlayerIndex];
    this.PlayerInfoMainUI.PlayerName.string = _tempData.PlayerName;
    this.PlayerInfoMainUI.PlayerCash.string = _tempData.Cash;
    this.PlayerInfoMainUI.PlayerMarketingAmount.string = _tempData.MarketingAmount;
    if (_tempData.LawyerStatus) this.PlayerInfoMainUI.LawyerLabel.string = "YES";else this.PlayerInfoMainUI.LawyerLabel.string = "NO";
    this.PlayerInfoMainUI.PartnershipStatusLabel.string = "N/A";
    this.PlayerInfoMainUI.GoldBalanceLabel.string = _tempData.GoldCount;
    this.PlayerInfoMainUI.StockBalanceLabel.string = _tempData.StockCount; //this.PlayerInfoMainUI.StockBalanceLabel.string=_tempData.NoOfStocks.length;

    this.PlayerInfoMainUI.BusinessNumberLabel.string = "No of Businesses : " + _tempData.NoOfBusiness.length;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.PlayerInfoMainUI.BusinessDetailPrefab);
      node.parent = this.PlayerInfoMainUI.BusinessDetailContent;
      node.getComponent('BusinessDetail').SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) node.getComponent('BusinessDetail').SetMode("Home Based");else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) node.getComponent('BusinessDetail').SetMode("Brick & Mortar");
      node.getComponent('BusinessDetail').SetBalance(_tempData.NoOfBusiness[index].Amount);
      node.getComponent('BusinessDetail').SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);
      businessDetailNodes.push(node);
    }
  },
  ExitProfileData: function ExitProfileData() {
    for (var index = 0; index < businessDetailNodes.length; index++) {
      businessDetailNodes[index].destroy();
    }

    businessDetailNodes = [];
    this.PlayerInfoScreen.active = false;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJQcm9maWxlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJidXNpbmVzc0RldGFpbE5vZGVzIiwiUGxheWVySW5mb1VJIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsInRvb2xUaXAiLCJQbGF5ZXJDYXNoIiwiUGxheWVyTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyTGFiZWwiLCJHb2xkQmFsYW5jZUxhYmVsIiwiU3RvY2tCYWxhbmNlTGFiZWwiLCJQYXJ0bmVyc2hpcFN0YXR1c0xhYmVsIiwiQnVzaW5lc3NOdW1iZXJMYWJlbCIsIkJ1c2luZXNzRGV0YWlsQ29udGVudCIsIk5vZGUiLCJCdXNpbmVzc0RldGFpbFByZWZhYiIsIlByZWZhYiIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIkdhbWVNYW5hZ2VyIiwicmVxdWlyZSIsIlBsYXllclByb2ZpbGVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQkdIaWdobGlnaHQiLCJQbGF5ZXJBdmF0YXJTcHJpdGUiLCJTcHJpdGUiLCJQbGF5ZXJOYW1lTGFiZWwiLCJQbGF5ZXJUdXJuSGlnaGxpZ2h0ZXJOb2RlIiwiQXZhdGFyU3ByaXRlRnJhbWVzIiwiU3ByaXRlRnJhbWUiLCJQbGF5ZXJJbmRleCIsImludGVnZXIiLCJQbGF5ZXJJbmZvU2NyZWVuIiwiUGxheWVySW5mb01haW5VSSIsInRvb2x0aXAiLCJQbGF5ZXJJbmZvIiwiUGxheWVyRGF0YSIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsInN0YXJ0IiwiU2V0TmFtZSIsIl9uYW1lIiwic3RyaW5nIiwiU2V0QXZhdGFyIiwiX2luZGV4Iiwic3ByaXRlRnJhbWUiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiX3N0YXRlIiwiYWN0aXZlIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJTZWVQcm9maWxlRGF0YSIsIl90ZW1wRGF0YSIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUGxheWVyR2FtZUluZm8iLCJDYXNoIiwiTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyU3RhdHVzIiwiR29sZENvdW50IiwiU3RvY2tDb3VudCIsIk5vT2ZCdXNpbmVzcyIsImxlbmd0aCIsImluZGV4Iiwibm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiZ2V0Q29tcG9uZW50IiwiQnVzaW5lc3NOYW1lIiwiU2V0VHlwZSIsIkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uIiwicGFyc2VJbnQiLCJCdXNpbmVzc1R5cGUiLCJTZXRNb2RlIiwiU2V0QmFsYW5jZSIsIkFtb3VudCIsIlNldExvY2F0aW9ucyIsIkxvY2F0aW9uc05hbWUiLCJwdXNoIiwiRXhpdFByb2ZpbGVEYXRhIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxtQkFBbUIsR0FBQyxFQUF4QjtBQUNBLElBQUlDLFlBQVksR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBQyxjQURpQjtBQUV0QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLEtBRkQ7QUFHUkMsTUFBQUEsWUFBWSxFQUFFLElBSE47QUFJUkMsTUFBQUEsT0FBTyxFQUFDO0FBSkEsS0FESjtBQU1SQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJKLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxLQUZEO0FBR1JDLE1BQUFBLFlBQVksRUFBRSxJQUhOO0FBSVJDLE1BQUFBLE9BQU8sRUFBQztBQUpBLEtBTko7QUFXUkUsSUFBQUEscUJBQXFCLEVBQUU7QUFDbkIsaUJBQVMsSUFEVTtBQUVuQkwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLEtBRlU7QUFHbkJDLE1BQUFBLFlBQVksRUFBRSxJQUhLO0FBSW5C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TUFBdEIsR0FBNkIsS0FBN0I7QUFDSDtBQXhJNkIsQ0FBVCxDQUF6QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBidXNpbmVzc0RldGFpbE5vZGVzPVtdO1xyXG52YXIgUGxheWVySW5mb1VJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQbGF5ZXJJbmZvVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sVGlwOlwiUmVmZXJlbmNlIG9mIHRoZSBwbGF5ZXIgbmFtZSBsYWJlbCBvZiBpbmZvIHBsYXllciBVSVwifSxcclxuICAgICAgICBQbGF5ZXJDYXNoOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sVGlwOlwiUmVmZXJlbmNlIG9mIHRoZSBwbGF5ZXIgY2FzaCBsYWJlbCBvZiBpbmZvIHBsYXllciBVSVwifSxcclxuICAgICAgICBQbGF5ZXJNYXJrZXRpbmdBbW91bnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsIFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2xUaXA6XCJSZWZlcmVuY2Ugb2YgdGhlIHBsYXllciBtYXJrZXRpbmcgYW1vdW50IGxhYmVsIG9mIGluZm8gcGxheWVyIFVJXCJ9LFxyXG4gICAgICAgIExhd3llckxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sVGlwOlwiUmVmZXJlbmNlIG9mIHRoZSBwbGF5ZXIgbGF3eWVyIHN0YXR1cyBsYWJlbCBvZiBpbmZvIHBsYXllciBVSVwifSxcclxuICAgICAgICBHb2xkQmFsYW5jZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sVGlwOlwiUmVmZXJlbmNlIG9mIHRoZSBwbGF5ZXIgZ29sZCBiYWxhbmNlIGxhYmVsIG9mIGluZm8gcGxheWVyIFVJXCJ9LFxyXG4gICAgICAgIFN0b2NrQmFsYW5jZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sVGlwOlwiUmVmZXJlbmNlIG9mIHRoZSBwbGF5ZXIgc3RvY2sgYmFsYW5jZSBsYWJlbCBvZiBpbmZvIHBsYXllciBVSVwifSxcclxuICAgICAgICBQYXJ0bmVyc2hpcFN0YXR1c0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sVGlwOlwiUmVmZXJlbmNlIG9mIHRoZSBwbGF5ZXIgcGFydG5lcnNoaXAgc3RhdHVzIGxhYmVsIG9mIGluZm8gcGxheWVyIFVJXCJ9LFxyXG4gICAgICAgIEJ1c2luZXNzTnVtYmVyTGFiZWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsIFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2xUaXA6XCJSZWZlcmVuY2Ugb2YgdGhlIHBsYXllciBidXNpbmVzcyBudW1iZXIgbGFiZWwgb2YgaW5mbyBwbGF5ZXIgVUlcIn0sXHJcbiAgICAgICAgQnVzaW5lc3NEZXRhaWxDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsIFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2xUaXA6XCJSZWZlcmVuY2Ugb2YgdGhlIGNvbnRlbnQgb2Ygc2Nyb2xsIHZpZXcgb2YgYnVzaW5lc3MgZGV0YWlsIG5vZGUgb2YgaW5mbyBwbGF5ZXIgVUlcIn0sXHJcbiAgICAgICAgQnVzaW5lc3NEZXRhaWxQcmVmYWI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sVGlwOlwiUmVmZXJlbmNlIG9mIHRoZSBidXNpbmVzcyBkZXRhaWwgcHJlZmFiIG9mIGluZm8gcGxheWVyIFVJXCJ9LFxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG5cclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgR2FtZU1hbmFnZXI9cmVxdWlyZSgnR2FtZU1hbmFnZXInKTtcclxudmFyIFBsYXllclByb2ZpbGVNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBCR0hpZ2hsaWdodDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sVGlwOlwiUmVmZXJlbmNlIG9mIHRoZSBub2RlIG9mIHBsYXllcidzIEJHIGhpZ2hsaWdodCBOb2RlXCJ9LFxyXG4gICAgICAgIFBsYXllckF2YXRhclNwcml0ZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsIFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2xUaXA6XCJSZWZlcmVuY2Ugb2YgdGhlIHNwcml0ZSBvZiBwbGF5ZXIncyBhdmF0YXJcIn0sXHJcbiAgICAgICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sVGlwOlwiUmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBvZiBwbGF5ZXIncyBuYW1lXCJ9LFxyXG4gICAgICAgIFBsYXllclR1cm5IaWdobGlnaHRlck5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSwgXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbFRpcDpcIlJlZmVyZW5jZSBvZiB0aGUgbm9kZSBvZiBwbGF5ZXIncyBoaWdobGlnaHRlclwifSxcclxuICAgICAgICBBdmF0YXJTcHJpdGVGcmFtZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2xUaXA6XCJSZWZlcmVuY2Ugb2YgdGhlIGFycmF5IG9mIHNwcml0ZXMgb2YgcGxheWVyJ3MgYXZhdGFyXCJ9LFxyXG4gICAgICAgIFBsYXllckluZGV4OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IC0xLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5pbnRlZ2VyLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlfSxcclxuICAgICAgICBQbGF5ZXJJbmZvU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsIFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWV9LFxyXG4gICAgICAgICBQbGF5ZXJJbmZvTWFpblVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBQbGF5ZXJJbmZvVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgcGxheWVyJ3MgVUkgZGF0YVwifSxcclxuICAgICAgICBQbGF5ZXJJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIHBsYXllcidzIGRhdGFcIn0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcbiAgICAvL1xyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgIH0sXHJcblxyXG4gICAgU2V0TmFtZShfbmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllck5hbWVMYWJlbC5zdHJpbmc9X25hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldEF2YXRhcihfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJBdmF0YXJTcHJpdGUuc3ByaXRlRnJhbWU9dGhpcy5BdmF0YXJTcHJpdGVGcmFtZXNbX2luZGV4XTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlQkdIaWdobGlnaHRlcihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CR0hpZ2hsaWdodC5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVUZXh0aWdobGlnaHRlcihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJUdXJuSGlnaGxpZ2h0ZXJOb2RlLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlZVByb2ZpbGVEYXRhKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllckluZm9TY3JlZW4uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICBidXNpbmVzc0RldGFpbE5vZGVzPVtdO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW3RoaXMuUGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckluZm9NYWluVUkuUGxheWVyTmFtZS5zdHJpbmc9X3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJJbmZvTWFpblVJLlBsYXllckNhc2guc3RyaW5nPV90ZW1wRGF0YS5DYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVySW5mb01haW5VSS5QbGF5ZXJNYXJrZXRpbmdBbW91bnQuc3RyaW5nPV90ZW1wRGF0YS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoX3RlbXBEYXRhLkxhd3llclN0YXR1cylcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJJbmZvTWFpblVJLkxhd3llckxhYmVsLnN0cmluZz1cIllFU1wiO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJJbmZvTWFpblVJLkxhd3llckxhYmVsLnN0cmluZz1cIk5PXCI7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVySW5mb01haW5VSS5QYXJ0bmVyc2hpcFN0YXR1c0xhYmVsLnN0cmluZz1cIk4vQVwiO1xyXG4gICAgICAgIHRoaXMuUGxheWVySW5mb01haW5VSS5Hb2xkQmFsYW5jZUxhYmVsLnN0cmluZz1fdGVtcERhdGEuR29sZENvdW50O1xyXG4gICAgICAgIHRoaXMuUGxheWVySW5mb01haW5VSS5TdG9ja0JhbGFuY2VMYWJlbC5zdHJpbmc9X3RlbXBEYXRhLlN0b2NrQ291bnQ7XHJcbiAgICAgICAgLy90aGlzLlBsYXllckluZm9NYWluVUkuU3RvY2tCYWxhbmNlTGFiZWwuc3RyaW5nPV90ZW1wRGF0YS5Ob09mU3RvY2tzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLlBsYXllckluZm9NYWluVUkuQnVzaW5lc3NOdW1iZXJMYWJlbC5zdHJpbmc9XCJObyBvZiBCdXNpbmVzc2VzIDogXCIrX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlBsYXllckluZm9NYWluVUkuQnVzaW5lc3NEZXRhaWxQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlBsYXllckluZm9NYWluVUkuQnVzaW5lc3NEZXRhaWxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpPT0yKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5BbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRQcm9maWxlRGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcz1bXTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLlBsYXllckluZm9TY3JlZW4uYWN0aXZlPWZhbHNlO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/RoomListHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '761a5iRiZJM2qPCdr3cL3GO', 'RoomListHandler');
// Script/RoomListHandler.js

"use strict";

var GamePlayReferenceManager = null;
var RoomListHandler = cc.Class({
  name: "RoomListHandler",
  "extends": cc.Component,
  properties: {
    NameLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    PlayersLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    RoomName: {
      "default": "",
      type: cc.Text,
      serializable: true
    }
  },
  onEnable: function onEnable() {
    this.RoomName = "";
    this.CheckReferences();
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  SetRoomName: function SetRoomName(_name) {
    this.RoomName = _name;
    console.log(this.RoomName);
    this.NameLabel.string = _name;
  },
  SetPlayerCount: function SetPlayerCount(_count) {
    this.PlayersLabel.string = "Players:" + _count;
  },
  SpectateRoom: function SpectateRoom() {
    GamePlayReferenceManager.Instance.Get_UIManager().ToggleLoadingNode(true);
    this.CheckReferences();
    this.RoomName = this.NameLabel.string;
    console.log(this.NameLabel.string);
    console.log(this.RoomName);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinRoom(this.RoomName);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxSb29tTGlzdEhhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiUm9vbUxpc3RIYW5kbGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiTmFtZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwiUGxheWVyc0xhYmVsIiwiUm9vbU5hbWUiLCJUZXh0Iiwib25FbmFibGUiLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiU2V0Um9vbU5hbWUiLCJfbmFtZSIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmciLCJTZXRQbGF5ZXJDb3VudCIsIl9jb3VudCIsIlNwZWN0YXRlUm9vbSIsIkluc3RhbmNlIiwiR2V0X1VJTWFuYWdlciIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkpvaW5Sb29tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsZUFBZSxHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN6QkMsRUFBQUEsSUFBSSxFQUFDLGlCQURvQjtBQUV6QixhQUFTRixFQUFFLENBQUNHLFNBRmE7QUFJekJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxLQUZGO0FBR1BDLE1BQUFBLFlBQVksRUFBRTtBQUhQLEtBREg7QUFLUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWSCxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGQztBQUdWQyxNQUFBQSxZQUFZLEVBQUU7QUFISixLQUxOO0FBU1JFLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLEVBREg7QUFFTkosTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNXLElBRkg7QUFHTkgsTUFBQUEsWUFBWSxFQUFFO0FBSFI7QUFURixHQUphO0FBbUJ6QkksRUFBQUEsUUFuQnlCLHNCQW9CekI7QUFDSSxTQUFLRixRQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtHLGVBQUw7QUFDSCxHQXZCd0I7QUF5QnpCQSxFQUFBQSxlQXpCeUIsNkJBMEJ6QjtBQUNHLFFBQUcsQ0FBQ2Ysd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0tBLHdCQUF3QixHQUFDZ0IsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ1AsR0E3QndCO0FBK0J6QkMsRUFBQUEsV0EvQnlCLHVCQStCYkMsS0EvQmEsRUFnQ3pCO0FBQ0ksU0FBS04sUUFBTCxHQUFjTSxLQUFkO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtSLFFBQWpCO0FBQ0EsU0FBS0wsU0FBTCxDQUFlYyxNQUFmLEdBQXNCSCxLQUF0QjtBQUNILEdBcEN3QjtBQXNDekJJLEVBQUFBLGNBdEN5QiwwQkFzQ1ZDLE1BdENVLEVBdUN6QjtBQUNJLFNBQUtaLFlBQUwsQ0FBa0JVLE1BQWxCLEdBQXlCLGFBQVdFLE1BQXBDO0FBQ0gsR0F6Q3dCO0FBMkN6QkMsRUFBQUEsWUEzQ3lCLDBCQTRDekI7QUFDSXhCLElBQUFBLHdCQUF3QixDQUFDeUIsUUFBekIsQ0FBa0NDLGFBQWxDLEdBQWtEQyxpQkFBbEQsQ0FBb0UsSUFBcEU7QUFDQSxTQUFLWixlQUFMO0FBQ0EsU0FBS0gsUUFBTCxHQUFjLEtBQUtMLFNBQUwsQ0FBZWMsTUFBN0I7QUFDQUYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS2IsU0FBTCxDQUFlYyxNQUEzQjtBQUNBRixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLUixRQUFqQjtBQUNBWixJQUFBQSx3QkFBd0IsQ0FBQ3lCLFFBQXpCLENBQWtDRyx5QkFBbEMsR0FBOERDLFFBQTlELENBQXVFLEtBQUtqQixRQUE1RTtBQUNIO0FBbkR3QixDQUFULENBQXBCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBSb29tTGlzdEhhbmRsZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlJvb21MaXN0SGFuZGxlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgICAgIFBsYXllcnNMYWJlbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgICAgUm9vbU5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJvb21OYW1lPVwiXCI7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldFJvb21OYW1lKF9uYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9X25hbWU7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Sb29tTmFtZSk7XHJcbiAgICAgICAgdGhpcy5OYW1lTGFiZWwuc3RyaW5nPV9uYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRQbGF5ZXJDb3VudChfY291bnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJzTGFiZWwuc3RyaW5nPVwiUGxheWVyczpcIitfY291bnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwZWN0YXRlUm9vbSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVMb2FkaW5nTm9kZSh0cnVlKTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9dGhpcy5OYW1lTGFiZWwuc3RyaW5nO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTmFtZUxhYmVsLnN0cmluZyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Sb29tTmFtZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luUm9vbSh0aGlzLlJvb21OYW1lKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/SpacesManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
  GoBackSpaces: 11
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
      }
    }
  }
}); //module.exports= SpaceData;

module.exports = SpacesManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTcGFjZXNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkVudW1TcGFjZVR5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiV2lsZENhcmQiLCJCaWdCdXNpbmVzcyIsIk1hcmtldGluZyIsIkludmVzdCIsIkxvc3NlcyIsIlBheURheSIsIkRvdWJsZVBheURheSIsIk9uZVF1ZXN0aW9uIiwiU2VsbCIsIkJ1eU9yU2VsbCIsIkdvQmFja1NwYWNlcyIsImFsbFNwYWNlcyIsIlNwYWNlRGF0YSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJOYW1lIiwiU3BhY2VzVHlwZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiU3BhY2VEZXNjcmlwdGlvbiIsIlRleHQiLCJSZWZlcmVuY2VMb2NhdGlvbiIsImRpc3BsYXlOYW1lIiwiTm9kZSIsIkNhbkhhdmVCRyIsIkJHQ29sb3IiLCJDb2xvciIsIldISVRFIiwiY3RvciIsIlNwYWNlc01hbmFnZXIiLCJDb21wb25lbnQiLCJEYXRhIiwib25Mb2FkIiwiQ3JlYXRlU3BhY2VzUG9vbCIsInN0YXJ0IiwiaSIsImxlbmd0aCIsImNoaWxkcmVuQ291bnQiLCJhY3RpdmUiLCJnZXRDb21wb25lbnQiLCJJbml0aWFsaXplRGF0YSIsImNoaWxkcmVuIiwiY29sb3IiLCJMYWJlbCIsInN0cmluZyIsInBhcnNlSW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsYUFBYSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN4QkMsRUFBQUEsSUFBSSxFQUFDLENBRG1CO0FBRXhCQyxFQUFBQSxRQUFRLEVBQUUsQ0FGYztBQUd4QkMsRUFBQUEsV0FBVyxFQUFFLENBSFc7QUFJeEJDLEVBQUFBLFNBQVMsRUFBRSxDQUphO0FBS3hCQyxFQUFBQSxNQUFNLEVBQUUsQ0FMZ0I7QUFNeEJDLEVBQUFBLE1BQU0sRUFBQyxDQU5pQjtBQU94QkMsRUFBQUEsTUFBTSxFQUFFLENBUGdCO0FBUXhCQyxFQUFBQSxZQUFZLEVBQUUsQ0FSVTtBQVN4QkMsRUFBQUEsV0FBVyxFQUFFLENBVFc7QUFVeEJDLEVBQUFBLElBQUksRUFBRSxDQVZrQjtBQVd4QkMsRUFBQUEsU0FBUyxFQUFFLEVBWGE7QUFZeEJDLEVBQUFBLFlBQVksRUFBQztBQVpXLENBQVIsQ0FBcEI7QUFlQSxJQUFJQyxTQUFTLEdBQUMsQ0FBQyxNQUFELEVBQVEsV0FBUixFQUFvQixjQUFwQixFQUFtQyxXQUFuQyxFQUErQyxRQUEvQyxFQUF3RCxRQUF4RCxFQUFpRSxTQUFqRSxFQUEyRSxnQkFBM0UsRUFBNEYsY0FBNUYsRUFBMkcsTUFBM0csRUFBa0gsYUFBbEgsRUFBZ0ksa0JBQWhJLENBQWQsRUFDQTs7QUFDQSxJQUFJQyxTQUFTLEdBQUdmLEVBQUUsQ0FBQ2dCLEtBQUgsQ0FBUztBQUNoQkMsRUFBQUEsSUFBSSxFQUFFLFdBRFU7QUFFckJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUUsTUFERTtBQUVSQyxJQUFBQSxVQUFVLEVBQ1Y7QUFDSUMsTUFBQUEsSUFBSSxFQUFFdEIsYUFEVjtBQUVJLGlCQUFTQSxhQUFhLENBQUNHLElBRjNCO0FBR0lvQixNQUFBQSxZQUFZLEVBQUUsSUFIbEI7QUFJSUMsTUFBQUEsT0FBTyxFQUFDO0FBSlosS0FIUTtBQVFSQyxJQUFBQSxnQkFBZ0I7QUFFWkgsTUFBQUEsSUFBSSxFQUFFO0FBRk0sbUNBR05yQixFQUFFLENBQUN5QixJQUhHLGlDQUlILEVBSkcsb0JBS1pILFlBTFksR0FLRSxJQUxGLG9CQU1aQyxPQU5ZLEdBTUgsdUJBTkcsb0JBUlI7QUFlUkcsSUFBQUEsaUJBQWlCLEVBQ2pCO0FBQ0lDLE1BQUFBLFdBQVcsRUFBQyxhQURoQjtBQUVJLGlCQUFTLElBRmI7QUFHSU4sTUFBQUEsSUFBSSxFQUFFckIsRUFBRSxDQUFDNEIsSUFIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FoQlE7QUFzQlJNLElBQUFBLFNBQVMsRUFDVDtBQUNJRixNQUFBQSxXQUFXLEVBQUUsTUFEakI7QUFFSSxpQkFBUyxLQUZiO0FBR0lOLE1BQUFBLElBQUksRUFBRXJCLEVBQUUsV0FIWjtBQUlJc0IsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBdkJRO0FBNkJSTyxJQUFBQSxPQUFPLEVBQ1A7QUFDSUgsTUFBQUEsV0FBVyxFQUFFLFNBRGpCO0FBRUksaUJBQVMzQixFQUFFLENBQUMrQixLQUFILENBQVNDLEtBRnRCO0FBR0lYLE1BQUFBLElBQUksRUFBRXJCLEVBQUUsQ0FBQytCLEtBSGI7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiO0FBOUJRLEdBRlM7QUF3Q3JCVSxFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FFakI7QUExQ29CLENBQVQsQ0FBaEIsRUE2Q0E7O0FBQ0EsSUFBSUMsYUFBYSxHQUFDbEMsRUFBRSxDQUFDZ0IsS0FBSCxDQUFTO0FBQ3ZCQyxFQUFBQSxJQUFJLEVBQUUsZUFEaUI7QUFFdkIsYUFBU2pCLEVBQUUsQ0FBQ21DLFNBRlc7QUFHdkJqQixFQUFBQSxVQUFVLEVBQUU7QUFDUmtCLElBQUFBLElBQUksRUFBRTtBQUNGLGlCQUFTLEVBRFA7QUFFRmYsTUFBQUEsSUFBSSxFQUFFLENBQUNOLFNBQUQsQ0FGSjtBQUdGTyxNQUFBQSxZQUFZLEVBQUU7QUFIWjtBQURFLEdBSFc7QUFZdkJXLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNqQixDQWJzQjtBQWV2QkksRUFBQUEsTUFmdUIsb0JBZWQ7QUFDTCxTQUFLQyxnQkFBTDtBQUNILEdBakJzQjtBQW1CdkJDLEVBQUFBLEtBbkJ1QixtQkFtQmQsQ0FFUixDQXJCc0I7QUF1QnZCRCxFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBWTtBQUM1QixTQUFJLElBQUlFLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQyxLQUFLSixJQUFMLENBQVVLLE1BQXhCLEVBQStCRCxDQUFDLEVBQWhDLEVBQ0E7QUFDRSxVQUFHLEtBQUtKLElBQUwsQ0FBVUksQ0FBVixFQUFhZCxpQkFBYixDQUErQmdCLGFBQS9CLEdBQTZDLENBQWhELEVBQ0E7QUFFRSxhQUFLTixJQUFMLENBQVVJLENBQVYsRUFBYWQsaUJBQWIsQ0FBK0JpQixNQUEvQixHQUFzQyxJQUF0QztBQUNBLGFBQUtQLElBQUwsQ0FBVUksQ0FBVixFQUFhZCxpQkFBYixDQUErQmtCLFlBQS9CLENBQTRDLGNBQTVDLEVBQTREQyxjQUE1RCxDQUEyRSxLQUFLVCxJQUFMLENBQVVJLENBQVYsQ0FBM0U7QUFDQSxhQUFLSixJQUFMLENBQVVJLENBQVYsRUFBYWQsaUJBQWIsQ0FBK0JvQixRQUEvQixDQUF3QyxDQUF4QyxFQUEyQ0gsTUFBM0MsR0FBa0QsSUFBbEQ7O0FBRUUsWUFBRyxLQUFLUCxJQUFMLENBQVVJLENBQVYsRUFBYVgsU0FBaEIsRUFDQTtBQUNJLGVBQUtPLElBQUwsQ0FBVUksQ0FBVixFQUFhZCxpQkFBYixDQUErQm9CLFFBQS9CLENBQXdDLENBQXhDLEVBQTJDQSxRQUEzQyxDQUFvRCxDQUFwRCxFQUF1REgsTUFBdkQsR0FBOEQsSUFBOUQ7QUFDQSxlQUFLUCxJQUFMLENBQVVJLENBQVYsRUFBYWQsaUJBQWIsQ0FBK0JvQixRQUEvQixDQUF3QyxDQUF4QyxFQUEyQ0EsUUFBM0MsQ0FBb0QsQ0FBcEQsRUFBdURDLEtBQXZELEdBQTZELEtBQUtYLElBQUwsQ0FBVUksQ0FBVixFQUFhVixPQUExRTtBQUNILFNBSkQsTUFNQTtBQUNJLGVBQUtNLElBQUwsQ0FBVUksQ0FBVixFQUFhZCxpQkFBYixDQUErQm9CLFFBQS9CLENBQXdDLENBQXhDLEVBQTJDQSxRQUEzQyxDQUFvRCxDQUFwRCxFQUF1REgsTUFBdkQsR0FBOEQsS0FBOUQ7QUFDSDs7QUFFRCxhQUFLUCxJQUFMLENBQVVJLENBQVYsRUFBYWQsaUJBQWIsQ0FBK0JvQixRQUEvQixDQUF3QyxDQUF4QyxFQUEyQ0EsUUFBM0MsQ0FBb0QsQ0FBcEQsRUFBdURGLFlBQXZELENBQW9FNUMsRUFBRSxDQUFDZ0QsS0FBdkUsRUFBOEVDLE1BQTlFLEdBQXFGbkMsU0FBUyxDQUFDb0MsUUFBUSxDQUFDLEtBQUtkLElBQUwsQ0FBVUksQ0FBVixFQUFhcEIsVUFBZCxDQUFULENBQTlGO0FBQ0g7QUFDRjtBQUNGO0FBOUNzQixDQUFULENBQWxCLEVBZ0RBOztBQUNBK0IsTUFBTSxDQUFDQyxPQUFQLEdBQWdCbEIsYUFBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNwYWNlcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtU3BhY2VUeXBlID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBXaWxkQ2FyZDogMSxcclxuICAgIEJpZ0J1c2luZXNzOiAyLFxyXG4gICAgTWFya2V0aW5nOiAzLFxyXG4gICAgSW52ZXN0OiA0LFxyXG4gICAgTG9zc2VzOjUsXHJcbiAgICBQYXlEYXk6IDYsXHJcbiAgICBEb3VibGVQYXlEYXk6IDcsXHJcbiAgICBPbmVRdWVzdGlvbjogOCxcclxuICAgIFNlbGw6IDksXHJcbiAgICBCdXlPclNlbGw6IDEwLFxyXG4gICAgR29CYWNrU3BhY2VzOjExLFxyXG59KTtcclxuXHJcbnZhciBhbGxTcGFjZXM9W1wiTm9uZVwiLFwiV2lsZCBDYXJkXCIsXCJCaWcgQnVzaW5lc3NcIixcIk1hcmtldGluZ1wiLFwiSW52ZXN0XCIsXCJMb3NzZXNcIixcIlBheSBEYXlcIixcIkRvdWJsZSBQYXkgRGF5XCIsXCJPbmUgUXVlc3Rpb25cIixcIlNlbGxcIixcIkJ1eSBPciBTZWxsXCIsXCJHbyBCYWNrIDMgU3BhY2VzXCJdO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBTcGFjZXMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3BhY2VEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgICAgICBuYW1lOiBcIlNwYWNlRGF0YVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIE5hbWU6IFwiRGF0YVwiLFxyXG4gICAgICAgIFNwYWNlc1R5cGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBFbnVtU3BhY2VUeXBlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBFbnVtU3BhY2VUeXBlLk5vbmUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInN0YXRlcyBtYWNoaW5lcyBieSB0eXBlIG9mIHNwYWNlcyBvbiBib2FyZFwiLH0sIFxyXG4gICAgICAgIFNwYWNlRGVzY3JpcHRpb246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJEZXNjcmlwdGlvbiBvZiBzcGFjZXNcIix9LFxyXG4gICAgICAgIFJlZmVyZW5jZUxvY2F0aW9uOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTcGFjZU9iamVjdFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiQmFja2dyb3VuZCBpbWFnZSBhc3NvY2lhdGVkIGJ5IHRoZSBzcGFjZVwiLH0sXHJcbiAgICAgICAgQ2FuSGF2ZUJHOlxyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklTQkdcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLmJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJpZiBzcGFjZSBjb3VsZCBoYXZlIGJhY2tncm91bmRcIix9LFxyXG4gICAgICAgIEJHQ29sb3I6XHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQkdDb2xvclwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBjYy5Db2xvci5XSElURSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQ29sb3IsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJDb2xvciBvZiB0aGUgYmFja2dyb3VuZFwiLH0sXHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNsYXNzIGZvciBTcGFjZXMgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3BhY2VzTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlNwYWNlc01hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1NwYWNlRGF0YV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5DcmVhdGVTcGFjZXNQb29sKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIENyZWF0ZVNwYWNlc1Bvb2w6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLkRhdGEubGVuZ3RoO2krKylcclxuICAgICAge1xyXG4gICAgICAgIGlmKHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlbkNvdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgdGhpcy5EYXRhW2ldLlJlZmVyZW5jZUxvY2F0aW9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgdGhpcy5EYXRhW2ldLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuSW5pdGlhbGl6ZURhdGEodGhpcy5EYXRhW2ldKTtcclxuICAgICAgICAgIHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuRGF0YVtpXS5DYW5IYXZlQkcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jb2xvcj10aGlzLkRhdGFbaV0uQkdDb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLkRhdGFbaV0uUmVmZXJlbmNlTG9jYXRpb24uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9YWxsU3BhY2VzW3BhcnNlSW50KHRoaXMuRGF0YVtpXS5TcGFjZXNUeXBlKV1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzPSBTcGFjZURhdGE7XHJcbm1vZHVsZS5leHBvcnRzPSBTcGFjZXNNYW5hZ2VyO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/SpaceHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f79fWXVqRNRb/WmZ+i4SUE', 'SpaceHandler');
// Script/SpaceHandler.js

"use strict";

var GamePlayReferenceManager = null;

var SpacesManager = require('SpacesManager'); //-------------------------------------------class for SpaceHandler-------------------------//


var SpaceHandler = cc.Class({
  name: "SpaceHandler",
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.CheckReferences();
    this.SpaceData = null; // SpaceData=new 
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  InitializeData: function InitializeData(_data) {
    this.SpaceData = _data; //console.log(this.SpaceData);
  },
  OnLandedOnSpace: function OnLandedOnSpace(_isOwner, _randomValue) {
    if (_isOwner === void 0) {
      _isOwner = false;
    }

    if (_randomValue === void 0) {
      _randomValue = 0;
    }

    console.log(this.SpaceData);

    switch (this.SpaceData.SpacesType) {
      case 0:
        //None
        console.error("landed on none"); //GamePlayReferenceManager.Instance.Get_DecksData().SpaceInvest(_isOwner,this.SpaceData.SpacesType);

        break;

      case 1:
        //WildCard
        console.log("WildCard");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomWildCard(_isOwner, _randomValue);
        break;

      case 2:
        //BigBusiness
        console.log("BigBusiness");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomBigBusinessCard(_isOwner, _randomValue);
        break;

      case 3:
        //Marketing
        console.log("Marketing");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomMarketingCard(_isOwner, _randomValue);
        break;

      case 4:
        //Invest
        console.log("Invest");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceInvest(_isOwner, this.SpaceData.SpacesType);
        break;

      case 5:
        //Losses
        console.log("Losses");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomLossesCard(_isOwner, _randomValue);
        break;

      case 6:
        //Payday
        console.log("Payday");
        GamePlayReferenceManager.Instance.Get_DecksData().SpacePayDay(_isOwner, this.SpaceData.SpacesType);
        break;

      case 7:
        //DoublePayDay
        console.log("DoublePayDay");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceDoublePayDay(_isOwner, this.SpaceData.SpacesType);
        break;

      case 8:
        //OneQuestion
        console.log("OneQuestion");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceOneQuestion(_isOwner, this.SpaceData.SpacesType);
        break;

      case 9:
        //Sell
        console.log("Sell");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceSell(_isOwner, this.SpaceData.SpacesType);
        break;

      case 10:
        //BuyOrSell
        console.log("BuyOrSell");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceBuyOrSell(_isOwner, this.SpaceData.SpacesType);
        break;

      case 11:
        //GoBackSpaces
        console.log("GoBackSpaces");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceGoBackSpaces(_isOwner, this.SpaceData.SpacesType);
        break;

      default:
        break;
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTcGFjZUhhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU3BhY2VzTWFuYWdlciIsInJlcXVpcmUiLCJTcGFjZUhhbmRsZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTcGFjZURhdGEiLCJJbml0aWFsaXplRGF0YSIsIl9kYXRhIiwiT25MYW5kZWRPblNwYWNlIiwiX2lzT3duZXIiLCJfcmFuZG9tVmFsdWUiLCJjb25zb2xlIiwibG9nIiwiU3BhY2VzVHlwZSIsImVycm9yIiwiSW5zdGFuY2UiLCJHZXRfRGVja3NEYXRhIiwiR2VuZXJhdGVSYW5kb21XaWxkQ2FyZCIsIkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkIiwiR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkIiwiU3BhY2VJbnZlc3QiLCJHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQiLCJTcGFjZVBheURheSIsIlNwYWNlRG91YmxlUGF5RGF5IiwiU3BhY2VPbmVRdWVzdGlvbiIsIlNwYWNlU2VsbCIsIlNwYWNlQnV5T3JTZWxsIiwiU3BhY2VHb0JhY2tTcGFjZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0I7O0FBQ0EsSUFBSUMsYUFBYSxHQUFDQyxPQUFPLENBQUMsZUFBRCxDQUF6QixFQUNBOzs7QUFFQSxJQUFJQyxZQUFZLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsY0FEZ0I7QUFFdEIsYUFBU0YsRUFBRSxDQUFDRyxTQUZVO0FBSXRCQyxFQUFBQSxVQUFVLEVBQUUsRUFKVTtBQU90QkMsRUFBQUEsTUFQc0Isb0JBUXRCO0FBQ0ksU0FBS0MsZUFBTDtBQUNBLFNBQUtDLFNBQUwsR0FBZSxJQUFmLENBRkosQ0FHRztB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QTNGO0FBQ0E7O0FBQ0osV0FBSyxDQUFMO0FBQU87QUFDSEYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBbEIsUUFBQUEsd0JBQXdCLENBQUNxQixRQUF6QixDQUFrQ0MsYUFBbEMsR0FBa0RTLFNBQWxELENBQTREaEIsUUFBNUQsRUFBcUUsS0FBS0osU0FBTCxDQUFlUSxVQUFwRjtBQUNBOztBQUNKLFdBQUssRUFBTDtBQUFRO0FBQ0pGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVo7QUFDQWxCLFFBQUFBLHdCQUF3QixDQUFDcUIsUUFBekIsQ0FBa0NDLGFBQWxDLEdBQWtEVSxjQUFsRCxDQUFpRWpCLFFBQWpFLEVBQTBFLEtBQUtKLFNBQUwsQ0FBZVEsVUFBekY7QUFDQTs7QUFDSixXQUFLLEVBQUw7QUFBUTtBQUNKRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0FsQixRQUFBQSx3QkFBd0IsQ0FBQ3FCLFFBQXpCLENBQWtDQyxhQUFsQyxHQUFrRFcsaUJBQWxELENBQW9FbEIsUUFBcEUsRUFBNkUsS0FBS0osU0FBTCxDQUFlUSxVQUE1RjtBQUNBOztBQUNKO0FBQ0k7QUFsRFI7QUFxREg7QUFuRnFCLENBQVQsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFNwYWNlc01hbmFnZXI9cmVxdWlyZSgnU3BhY2VzTWFuYWdlcicpO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3BhY2VIYW5kbGVyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG52YXIgU3BhY2VIYW5kbGVyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiU3BhY2VIYW5kbGVyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgdGhpcy5TcGFjZURhdGE9bnVsbDtcclxuICAgICAgIC8vIFNwYWNlRGF0YT1uZXcgXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIEluaXRpYWxpemVEYXRhKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3BhY2VEYXRhPV9kYXRhO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5TcGFjZURhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkxhbmRlZE9uU3BhY2UoX2lzT3duZXI9ZmFsc2UsX3JhbmRvbVZhbHVlPTApXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5TcGFjZURhdGEpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6Ly9Ob25lXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibGFuZGVkIG9uIG5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VJbnZlc3QoX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOi8vV2lsZENhcmRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2lsZENhcmRcIik7ICAgIFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5HZW5lcmF0ZVJhbmRvbVdpbGRDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOi8vQmlnQnVzaW5lc3NcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmlnQnVzaW5lc3NcIik7ICAgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOi8vTWFya2V0aW5nXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcmtldGluZ1wiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLkdlbmVyYXRlUmFuZG9tTWFya2V0aW5nQ2FyZChfaXNPd25lcixfcmFuZG9tVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDovL0ludmVzdFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbnZlc3RcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZUludmVzdChfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6Ly9Mb3NzZXNcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9zc2VzXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2Oi8vUGF5ZGF5XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBheWRheVwiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLlNwYWNlUGF5RGF5KF9pc093bmVyLHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzovL0RvdWJsZVBheURheVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb3VibGVQYXlEYXlcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZURvdWJsZVBheURheShfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDg6Ly9PbmVRdWVzdGlvblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPbmVRdWVzdGlvblwiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLlNwYWNlT25lUXVlc3Rpb24oX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA5Oi8vU2VsbFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxsXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VTZWxsKF9pc093bmVyLHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6Ly9CdXlPclNlbGxcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnV5T3JTZWxsXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VCdXlPclNlbGwoX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMTovL0dvQmFja1NwYWNlc1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb0JhY2tTcGFjZXNcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZUdvQmFja1NwYWNlcyhfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/BusinessDetail.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb8a5ZUBJFFQJtaaJU+yKsK', 'BusinessDetail');
// Script/BusinessDetail.js

"use strict";

var GamePlayReferenceManager = null;
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
    BusinessModeLabel: {
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
    },
    CanSell: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    SellBusinessBtnNode: {
      "default": null,
      type: cc.Node,
      serializable: true
    },
    SellLocationBtnNode: {
      "default": null,
      type: cc.Node,
      serializable: true
    },
    BusinessMode: {
      "default": -1,
      type: cc.Integer,
      serializable: true
    },
    BusinessIndex: {
      "default": -1,
      type: cc.Integer,
      serializable: true
    }
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  SetBusinessMode: function SetBusinessMode(_val) {
    this.BusinessMode = _val;
  },
  SetBusinessIndex: function SetBusinessIndex(_val) {
    this.BusinessIndex = _val;
  },
  SetName: function SetName(_name) {
    this.BusinessName.string = _name;
  },
  SetType: function SetType(_type) {
    this.BusinessType.string = _type;
  },
  SetMode: function SetMode(_mode) {
    this.BusinessModeLabel.string = _mode;
  },
  SetBalance: function SetBalance(_balance) {
    this.BusinessBalance.string = _balance;
  },
  SetLocations: function SetLocations(_locations) {
    this.BusinessLocations.string = _locations;
  },
  ToggleSellBusinessButton: function ToggleSellBusinessButton(_state) {
    if (this.CanSell) {
      this.SellBusinessBtnNode.getComponent(cc.Button).interactable = _state;
    }
  },
  ToggleSellLocationButton: function ToggleSellLocationButton(_state) {
    if (this.CanSell) {
      this.SellLocationBtnNode.getComponent(cc.Button).interactable = _state;
    }
  },
  SellLocation: function SellLocation() {
    if (this.BusinessMode == 1) //home based
      {//there is not going to be any location for home based
      } else if (this.BusinessMode == 2) //Brick and mortar
      {
        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _tempData = _manager.PlayerGameInfo[_playerIndex];

        if (_tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length > 0) //if selected business has any location at all
          {
            if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) //if there is some loan on selected business
              {
                _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.pop();

                var _amount = 75000 - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

                _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
                _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;
                _tempData.Cash += _amount;
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold one of your location, $" + _amount + " added to your cash after paying loan", 2000);
                setTimeout(function () {
                  GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
                }, 2050);
              } else {
              _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.pop();

              _tempData.Cash += 75000;
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold one of your location, $75000 added to your cash", 2000);
              setTimeout(function () {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
              }, 2050);
            }
          }
      }
  },
  SellBusiness: function SellBusiness() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = _manager.PlayerGameInfo[_playerIndex];

    if (_tempData.NoOfBusiness.length > 1) {
      if (this.BusinessMode == 1) //home based
        {
          if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) //if there is some loan on selected business
            {
              var HomeBasedAmount = 10000;

              _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

              var _amount = HomeBasedAmount - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

              var _loanAmount = _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount - HomeBasedAmount;

              if (_loanAmount <= 0) //means payed all loan
                {
                  _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
                  _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;
                } else {
                _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount -= HomeBasedAmount;
              }

              if (_amount <= 0) _amount = 0;
              _tempData.Cash += _amount;
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business, $" + _amount + " added to your cash after paying loan", 2000);
              setTimeout(function () {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
              }, 2050);
            } else {
            var HomeBasedAmount = 10000;

            _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

            _tempData.Cash += HomeBasedAmount;
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business, $10000 added to your cash", 2000);
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
            }, 2050);
          }
        } else if (this.BusinessMode == 2) //brick and mortar
        {
          if (_tempData.NoOfBusiness[this.BusinessIndex].LoanTaken) //if there is some loan on selected business
            {
              var MortarAmount = 75000;
              var _locations = _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;
              if (_locations > 0) //if business have location muliplye each location with amount
                MortarAmount += _locations * MortarAmount;

              var _amount = MortarAmount - _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount;

              var _loanAmount = _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount - MortarAmount;

              if (_loanAmount <= 0) //means payed all loan
                {
                  _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount = 0;
                  _tempData.NoOfBusiness[this.BusinessIndex].LoanTaken = false;
                } else {
                _tempData.NoOfBusiness[this.BusinessIndex].LoanAmount -= HomeBasedAmount;
              }

              if (_amount <= 0) _amount = 0;
              _tempData.Cash += _amount;

              _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business along with any locations, $" + _amount + " added to your cash after paying loan", 2000);
              setTimeout(function () {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
              }, 2050);
            } else {
            var MortarAmount = 75000;
            var _locations = _tempData.NoOfBusiness[this.BusinessIndex].LocationsName.length;
            if (_locations > 0) //if business have location muliplye each location with amount
              MortarAmount += _locations * MortarAmount;

            _tempData.NoOfBusiness.splice(this.BusinessIndex, 1);

            _tempData.Cash += MortarAmount;
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully sold your business, $" + MortarAmount + " added to your cash", 2000);
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBusinessUI_SellBusinessUISetup();
            }, 2050);
          }
        }
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Cannot sell, you need atleast one business to continue playing game.", 2000);
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCdXNpbmVzc0RldGFpbC5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJCdXNpbmVzc0RldGFpbCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkJ1c2luZXNzTmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsIkJ1c2luZXNzVHlwZSIsIkJ1c2luZXNzTW9kZUxhYmVsIiwiQnVzaW5lc3NCYWxhbmNlIiwiQnVzaW5lc3NMb2NhdGlvbnMiLCJDYW5TZWxsIiwiQm9vbGVhbiIsIlNlbGxCdXNpbmVzc0J0bk5vZGUiLCJOb2RlIiwiU2VsbExvY2F0aW9uQnRuTm9kZSIsIkJ1c2luZXNzTW9kZSIsIkludGVnZXIiLCJCdXNpbmVzc0luZGV4IiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIlNldEJ1c2luZXNzTW9kZSIsIl92YWwiLCJTZXRCdXNpbmVzc0luZGV4IiwiU2V0TmFtZSIsIl9uYW1lIiwic3RyaW5nIiwiU2V0VHlwZSIsIl90eXBlIiwiU2V0TW9kZSIsIl9tb2RlIiwiU2V0QmFsYW5jZSIsIl9iYWxhbmNlIiwiU2V0TG9jYXRpb25zIiwiX2xvY2F0aW9ucyIsIlRvZ2dsZVNlbGxCdXNpbmVzc0J1dHRvbiIsIl9zdGF0ZSIsImdldENvbXBvbmVudCIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsIlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbiIsIlNlbGxMb2NhdGlvbiIsIl9tYW5hZ2VyIiwiSW5zdGFuY2UiLCJHZXRfR2FtZU1hbmFnZXIiLCJfcGxheWVySW5kZXgiLCJHZXRUdXJuTnVtYmVyIiwiX3RlbXBEYXRhIiwiUGxheWVyR2FtZUluZm8iLCJOb09mQnVzaW5lc3MiLCJMb2NhdGlvbnNOYW1lIiwibGVuZ3RoIiwiTG9hblRha2VuIiwicG9wIiwiX2Ftb3VudCIsIkxvYW5BbW91bnQiLCJDYXNoIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU2hvd1RvYXN0Iiwic2V0VGltZW91dCIsIlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIlNlbGxCdXNpbmVzcyIsIkhvbWVCYXNlZEFtb3VudCIsInNwbGljZSIsIl9sb2FuQW1vdW50IiwiTW9ydGFyQW1vdW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsY0FBYyxHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN4QkMsRUFBQUEsSUFBSSxFQUFDLGdCQURtQjtBQUV4QixhQUFTRixFQUFFLENBQUNHLFNBRlk7QUFJeEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxLQUZDO0FBR1ZDLE1BQUFBLFlBQVksRUFBRTtBQUhKLEtBRE47QUFPUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWSCxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGQztBQUdWQyxNQUFBQSxZQUFZLEVBQUU7QUFISixLQVBOO0FBYVJFLElBQUFBLGlCQUFpQixFQUFFO0FBQ2YsaUJBQVMsSUFETTtBQUVmSixNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGTTtBQUdmQyxNQUFBQSxZQUFZLEVBQUU7QUFIQyxLQWJYO0FBbUJSRyxJQUFBQSxlQUFlLEVBQUU7QUFDYixpQkFBUyxJQURJO0FBRWJMLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxLQUZJO0FBR2JDLE1BQUFBLFlBQVksRUFBRTtBQUhELEtBbkJUO0FBeUJSSSxJQUFBQSxpQkFBaUIsRUFBRTtBQUNmLGlCQUFTLElBRE07QUFFZk4sTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBRk07QUFHZkMsTUFBQUEsWUFBWSxFQUFFO0FBSEMsS0F6Qlg7QUErQlJLLElBQUFBLE9BQU8sRUFBRTtBQUNMLGlCQUFTLEtBREo7QUFFTFAsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNjLE9BRko7QUFHTE4sTUFBQUEsWUFBWSxFQUFFO0FBSFQsS0EvQkQ7QUFxQ1JPLElBQUFBLG1CQUFtQixFQUFFO0FBQ2pCLGlCQUFTLElBRFE7QUFFakJULE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDZ0IsSUFGUTtBQUdqQlIsTUFBQUEsWUFBWSxFQUFFO0FBSEcsS0FyQ2I7QUEyQ1JTLElBQUFBLG1CQUFtQixFQUFFO0FBQ2pCLGlCQUFTLElBRFE7QUFFakJYLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDZ0IsSUFGUTtBQUdqQlIsTUFBQUEsWUFBWSxFQUFFO0FBSEcsS0EzQ2I7QUFpRFJVLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLENBQUMsQ0FEQTtBQUVWWixNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ21CLE9BRkM7QUFHVlgsTUFBQUEsWUFBWSxFQUFFO0FBSEosS0FqRE47QUF1RFJZLElBQUFBLGFBQWEsRUFBRTtBQUNYLGlCQUFTLENBQUMsQ0FEQztBQUVYZCxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ21CLE9BRkU7QUFHWFgsTUFBQUEsWUFBWSxFQUFFO0FBSEg7QUF2RFAsR0FKWTtBQW1FeEJhLEVBQUFBLGVBbkV3Qiw2QkFvRXZCO0FBQ0csUUFBRyxDQUFDdkIsd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0FBLHdCQUF3QixHQUFDd0IsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ0YsR0F2RXNCO0FBeUV4QkMsRUFBQUEsZUF6RXdCLDJCQXlFUkMsSUF6RVEsRUEwRXhCO0FBQ0ksU0FBS04sWUFBTCxHQUFrQk0sSUFBbEI7QUFDSCxHQTVFdUI7QUE4RXhCQyxFQUFBQSxnQkE5RXdCLDRCQThFUEQsSUE5RU8sRUErRXhCO0FBQ0ksU0FBS0osYUFBTCxHQUFtQkksSUFBbkI7QUFDSCxHQWpGdUI7QUFtRnhCRSxFQUFBQSxPQW5Gd0IsbUJBbUZoQkMsS0FuRmdCLEVBb0Z4QjtBQUNJLFNBQUt0QixZQUFMLENBQWtCdUIsTUFBbEIsR0FBeUJELEtBQXpCO0FBQ0gsR0F0RnVCO0FBd0Z4QkUsRUFBQUEsT0F4RndCLG1CQXdGaEJDLEtBeEZnQixFQXlGeEI7QUFDSSxTQUFLckIsWUFBTCxDQUFrQm1CLE1BQWxCLEdBQXlCRSxLQUF6QjtBQUNILEdBM0Z1QjtBQTZGeEJDLEVBQUFBLE9BN0Z3QixtQkE2RmhCQyxLQTdGZ0IsRUE4RnhCO0FBQ0ksU0FBS3RCLGlCQUFMLENBQXVCa0IsTUFBdkIsR0FBOEJJLEtBQTlCO0FBQ0gsR0FoR3VCO0FBa0d4QkMsRUFBQUEsVUFsR3dCLHNCQWtHYkMsUUFsR2EsRUFtR3hCO0FBQ0ksU0FBS3ZCLGVBQUwsQ0FBcUJpQixNQUFyQixHQUE0Qk0sUUFBNUI7QUFDSCxHQXJHdUI7QUF1R3hCQyxFQUFBQSxZQXZHd0Isd0JBdUdYQyxVQXZHVyxFQXdHeEI7QUFDSSxTQUFLeEIsaUJBQUwsQ0FBdUJnQixNQUF2QixHQUE4QlEsVUFBOUI7QUFDSCxHQTFHdUI7QUE0R3hCQyxFQUFBQSx3QkE1R3dCLG9DQTRHQ0MsTUE1R0QsRUE2R3hCO0FBQ0ksUUFBRyxLQUFLekIsT0FBUixFQUNBO0FBQ0ksV0FBS0UsbUJBQUwsQ0FBeUJ3QixZQUF6QixDQUFzQ3ZDLEVBQUUsQ0FBQ3dDLE1BQXpDLEVBQWlEQyxZQUFqRCxHQUE4REgsTUFBOUQ7QUFDSDtBQUVKLEdBbkh1QjtBQXFIeEJJLEVBQUFBLHdCQXJId0Isb0NBcUhDSixNQXJIRCxFQXNIeEI7QUFDSSxRQUFHLEtBQUt6QixPQUFSLEVBQ0E7QUFDSSxXQUFLSSxtQkFBTCxDQUF5QnNCLFlBQXpCLENBQXNDdkMsRUFBRSxDQUFDd0MsTUFBekMsRUFBaURDLFlBQWpELEdBQThESCxNQUE5RDtBQUNIO0FBQ0osR0EzSHVCO0FBNkh4QkssRUFBQUEsWUE3SHdCLDBCQThIeEI7QUFFSSxRQUFHLEtBQUt6QixZQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQ3pCLE9BQ0k7QUFDSCxPQUhELE1BSUssSUFBRyxLQUFLQSxZQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQzlCO0FBQ0ksWUFBSTBCLFFBQVEsR0FBQzlDLHdCQUF3QixDQUFDK0MsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWI7O0FBQ0EsWUFBSUMsWUFBWSxHQUFDakQsd0JBQXdCLENBQUMrQyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RFLGFBQXBELEVBQWpCOztBQUNBLFlBQUlDLFNBQVMsR0FBQ0wsUUFBUSxDQUFDTSxjQUFULENBQXdCSCxZQUF4QixDQUFkOztBQUVBLFlBQUdFLFNBQVMsQ0FBQ0UsWUFBVixDQUF1QixLQUFLL0IsYUFBNUIsRUFBMkNnQyxhQUEzQyxDQUF5REMsTUFBekQsR0FBZ0UsQ0FBbkUsRUFBc0U7QUFDdEU7QUFDSSxnQkFBR0osU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ2tDLFNBQTlDLEVBQXlEO0FBQ3pEO0FBQ0lMLGdCQUFBQSxTQUFTLENBQUNFLFlBQVYsQ0FBdUIsS0FBSy9CLGFBQTVCLEVBQTJDZ0MsYUFBM0MsQ0FBeURHLEdBQXpEOztBQUNBLG9CQUFJQyxPQUFPLEdBQUMsUUFBTVAsU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ3FDLFVBQTdEOztBQUdBUixnQkFBQUEsU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ3FDLFVBQTNDLEdBQXNELENBQXREO0FBQ0FSLGdCQUFBQSxTQUFTLENBQUNFLFlBQVYsQ0FBdUIsS0FBSy9CLGFBQTVCLEVBQTJDa0MsU0FBM0MsR0FBcUQsS0FBckQ7QUFFQUwsZ0JBQUFBLFNBQVMsQ0FBQ1MsSUFBVixJQUFnQkYsT0FBaEI7QUFDQTFELGdCQUFBQSx3QkFBd0IsQ0FBQytDLFFBQXpCLENBQWtDYyxxQkFBbEMsR0FBMERDLFNBQTFELENBQW9FLHVEQUFxREosT0FBckQsR0FBNkQsdUNBQWpJLEVBQXlLLElBQXpLO0FBQ0FLLGdCQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiL0Qsa0JBQUFBLHdCQUF3QixDQUFDK0MsUUFBekIsQ0FBa0NjLHFCQUFsQyxHQUEwREcsaUNBQTFEO0FBQ0gsaUJBRlMsRUFFUCxJQUZPLENBQVY7QUFHSCxlQWRELE1BZUE7QUFDSWIsY0FBQUEsU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ2dDLGFBQTNDLENBQXlERyxHQUF6RDs7QUFDQU4sY0FBQUEsU0FBUyxDQUFDUyxJQUFWLElBQWdCLEtBQWhCO0FBQ0E1RCxjQUFBQSx3QkFBd0IsQ0FBQytDLFFBQXpCLENBQWtDYyxxQkFBbEMsR0FBMERDLFNBQTFELENBQW9FLDRFQUFwRSxFQUFpSixJQUFqSjtBQUNBQyxjQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiL0QsZ0JBQUFBLHdCQUF3QixDQUFDK0MsUUFBekIsQ0FBa0NjLHFCQUFsQyxHQUEwREcsaUNBQTFEO0FBQ0gsZUFGUyxFQUVQLElBRk8sQ0FBVjtBQUdIO0FBQ0o7QUFDSjtBQUVKLEdBdEt1QjtBQXdLeEJDLEVBQUFBLFlBeEt3QiwwQkF5S3hCO0FBQ0ksUUFBSW5CLFFBQVEsR0FBQzlDLHdCQUF3QixDQUFDK0MsUUFBekIsQ0FBa0NDLGVBQWxDLEVBQWI7O0FBQ0EsUUFBSUMsWUFBWSxHQUFDakQsd0JBQXdCLENBQUMrQyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RFLGFBQXBELEVBQWpCOztBQUNBLFFBQUlDLFNBQVMsR0FBQ0wsUUFBUSxDQUFDTSxjQUFULENBQXdCSCxZQUF4QixDQUFkOztBQUVBLFFBQUdFLFNBQVMsQ0FBQ0UsWUFBVixDQUF1QkUsTUFBdkIsR0FBOEIsQ0FBakMsRUFDQTtBQUNBLFVBQUcsS0FBS25DLFlBQUwsSUFBbUIsQ0FBdEIsRUFBeUI7QUFDekI7QUFDSSxjQUFHK0IsU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ2tDLFNBQTlDLEVBQXlEO0FBQ3pEO0FBQ0ksa0JBQUlVLGVBQWUsR0FBQyxLQUFwQjs7QUFDQWYsY0FBQUEsU0FBUyxDQUFDRSxZQUFWLENBQXVCYyxNQUF2QixDQUE4QixLQUFLN0MsYUFBbkMsRUFBa0QsQ0FBbEQ7O0FBQ0Esa0JBQUlvQyxPQUFPLEdBQUNRLGVBQWUsR0FBQ2YsU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ3FDLFVBQXZFOztBQUVBLGtCQUFJUyxXQUFXLEdBQUNqQixTQUFTLENBQUNFLFlBQVYsQ0FBdUIsS0FBSy9CLGFBQTVCLEVBQTJDcUMsVUFBM0MsR0FBc0RPLGVBQXRFOztBQUdBLGtCQUFHRSxXQUFXLElBQUUsQ0FBaEIsRUFBbUI7QUFDbkI7QUFDSWpCLGtCQUFBQSxTQUFTLENBQUNFLFlBQVYsQ0FBdUIsS0FBSy9CLGFBQTVCLEVBQTJDcUMsVUFBM0MsR0FBc0QsQ0FBdEQ7QUFDQVIsa0JBQUFBLFNBQVMsQ0FBQ0UsWUFBVixDQUF1QixLQUFLL0IsYUFBNUIsRUFBMkNrQyxTQUEzQyxHQUFxRCxLQUFyRDtBQUNILGlCQUpELE1BS0E7QUFDSUwsZ0JBQUFBLFNBQVMsQ0FBQ0UsWUFBVixDQUF1QixLQUFLL0IsYUFBNUIsRUFBMkNxQyxVQUEzQyxJQUF1RE8sZUFBdkQ7QUFDSDs7QUFFRCxrQkFBR1IsT0FBTyxJQUFFLENBQVosRUFDSUEsT0FBTyxHQUFDLENBQVI7QUFFSlAsY0FBQUEsU0FBUyxDQUFDUyxJQUFWLElBQWdCRixPQUFoQjtBQUNBMUQsY0FBQUEsd0JBQXdCLENBQUMrQyxRQUF6QixDQUFrQ2MscUJBQWxDLEdBQTBEQyxTQUExRCxDQUFvRSxnREFBOENKLE9BQTlDLEdBQXNELHVDQUExSCxFQUFrSyxJQUFsSztBQUNBSyxjQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiL0QsZ0JBQUFBLHdCQUF3QixDQUFDK0MsUUFBekIsQ0FBa0NjLHFCQUFsQyxHQUEwREcsaUNBQTFEO0FBQ0gsZUFGUyxFQUVQLElBRk8sQ0FBVjtBQUdILGFBMUJELE1BMkJBO0FBQ0ksZ0JBQUlFLGVBQWUsR0FBQyxLQUFwQjs7QUFDQWYsWUFBQUEsU0FBUyxDQUFDRSxZQUFWLENBQXVCYyxNQUF2QixDQUE4QixLQUFLN0MsYUFBbkMsRUFBa0QsQ0FBbEQ7O0FBQ0E2QixZQUFBQSxTQUFTLENBQUNTLElBQVYsSUFBZ0JNLGVBQWhCO0FBQ0FsRSxZQUFBQSx3QkFBd0IsQ0FBQytDLFFBQXpCLENBQWtDYyxxQkFBbEMsR0FBMERDLFNBQTFELENBQW9FLHFFQUFwRSxFQUEwSSxJQUExSTtBQUNBQyxZQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiL0QsY0FBQUEsd0JBQXdCLENBQUMrQyxRQUF6QixDQUFrQ2MscUJBQWxDLEdBQTBERyxpQ0FBMUQ7QUFDSCxhQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0g7QUFFSixTQXZDRCxNQXVDTSxJQUFHLEtBQUs1QyxZQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQy9CO0FBQ0ksY0FBRytCLFNBQVMsQ0FBQ0UsWUFBVixDQUF1QixLQUFLL0IsYUFBNUIsRUFBMkNrQyxTQUE5QyxFQUF5RDtBQUN6RDtBQUNJLGtCQUFJYSxZQUFZLEdBQUMsS0FBakI7QUFDQSxrQkFBSS9CLFVBQVUsR0FBQ2EsU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ2dDLGFBQTNDLENBQXlEQyxNQUF4RTtBQUVBLGtCQUFHakIsVUFBVSxHQUFDLENBQWQsRUFBZ0I7QUFDWitCLGdCQUFBQSxZQUFZLElBQUcvQixVQUFVLEdBQUMrQixZQUExQjs7QUFFSixrQkFBSVgsT0FBTyxHQUFDVyxZQUFZLEdBQUNsQixTQUFTLENBQUNFLFlBQVYsQ0FBdUIsS0FBSy9CLGFBQTVCLEVBQTJDcUMsVUFBcEU7O0FBQ0Esa0JBQUlTLFdBQVcsR0FBQ2pCLFNBQVMsQ0FBQ0UsWUFBVixDQUF1QixLQUFLL0IsYUFBNUIsRUFBMkNxQyxVQUEzQyxHQUFzRFUsWUFBdEU7O0FBR0Esa0JBQUdELFdBQVcsSUFBRSxDQUFoQixFQUFtQjtBQUNuQjtBQUNJakIsa0JBQUFBLFNBQVMsQ0FBQ0UsWUFBVixDQUF1QixLQUFLL0IsYUFBNUIsRUFBMkNxQyxVQUEzQyxHQUFzRCxDQUF0RDtBQUNBUixrQkFBQUEsU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ2tDLFNBQTNDLEdBQXFELEtBQXJEO0FBQ0gsaUJBSkQsTUFLQTtBQUNJTCxnQkFBQUEsU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ3FDLFVBQTNDLElBQXVETyxlQUF2RDtBQUNIOztBQUVELGtCQUFHUixPQUFPLElBQUUsQ0FBWixFQUNJQSxPQUFPLEdBQUMsQ0FBUjtBQUVKUCxjQUFBQSxTQUFTLENBQUNTLElBQVYsSUFBZ0JGLE9BQWhCOztBQUNBUCxjQUFBQSxTQUFTLENBQUNFLFlBQVYsQ0FBdUJjLE1BQXZCLENBQThCLEtBQUs3QyxhQUFuQyxFQUFrRCxDQUFsRDs7QUFDQXRCLGNBQUFBLHdCQUF3QixDQUFDK0MsUUFBekIsQ0FBa0NjLHFCQUFsQyxHQUEwREMsU0FBMUQsQ0FBb0UseUVBQXVFSixPQUF2RSxHQUErRSx1Q0FBbkosRUFBMkwsSUFBM0w7QUFDQUssY0FBQUEsVUFBVSxDQUFDLFlBQU07QUFDYi9ELGdCQUFBQSx3QkFBd0IsQ0FBQytDLFFBQXpCLENBQWtDYyxxQkFBbEMsR0FBMERHLGlDQUExRDtBQUNILGVBRlMsRUFFUCxJQUZPLENBQVY7QUFHSCxhQTlCRCxNQStCQTtBQUNJLGdCQUFJSyxZQUFZLEdBQUMsS0FBakI7QUFDQSxnQkFBSS9CLFVBQVUsR0FBQ2EsU0FBUyxDQUFDRSxZQUFWLENBQXVCLEtBQUsvQixhQUE1QixFQUEyQ2dDLGFBQTNDLENBQXlEQyxNQUF4RTtBQUVBLGdCQUFHakIsVUFBVSxHQUFDLENBQWQsRUFBZ0I7QUFDWitCLGNBQUFBLFlBQVksSUFBRy9CLFVBQVUsR0FBQytCLFlBQTFCOztBQUVKbEIsWUFBQUEsU0FBUyxDQUFDRSxZQUFWLENBQXVCYyxNQUF2QixDQUE4QixLQUFLN0MsYUFBbkMsRUFBa0QsQ0FBbEQ7O0FBQ0E2QixZQUFBQSxTQUFTLENBQUNTLElBQVYsSUFBZ0JTLFlBQWhCO0FBQ0FyRSxZQUFBQSx3QkFBd0IsQ0FBQytDLFFBQXpCLENBQWtDYyxxQkFBbEMsR0FBMERDLFNBQTFELENBQW9FLGdEQUE4Q08sWUFBOUMsR0FBMkQscUJBQS9ILEVBQXFKLElBQXJKO0FBQ0FOLFlBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IvRCxjQUFBQSx3QkFBd0IsQ0FBQytDLFFBQXpCLENBQWtDYyxxQkFBbEMsR0FBMERHLGlDQUExRDtBQUNILGFBRlMsRUFFUCxJQUZPLENBQVY7QUFHSDtBQUNKO0FBQ0osS0F6RkcsTUEyRko7QUFDSWhFLE1BQUFBLHdCQUF3QixDQUFDK0MsUUFBekIsQ0FBa0NjLHFCQUFsQyxHQUEwREMsU0FBMUQsQ0FBb0Usc0VBQXBFLEVBQTJJLElBQTNJO0FBQ0g7QUFFQTtBQTdRdUIsQ0FBVCxDQUFuQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgQnVzaW5lc3NEZXRhaWw9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkJ1c2luZXNzRGV0YWlsXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQnVzaW5lc3NUeXBlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCdXNpbmVzc01vZGVMYWJlbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQnVzaW5lc3NCYWxhbmNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCdXNpbmVzc0xvY2F0aW9uczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQ2FuU2VsbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgU2VsbEJ1c2luZXNzQnRuTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBTZWxsTG9jYXRpb25CdG5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJ1c2luZXNzTW9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAtMSwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQnVzaW5lc3NJbmRleDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAtMSwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICBTZXRCdXNpbmVzc01vZGUoX3ZhbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzTW9kZT1fdmFsO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRCdXNpbmVzc0luZGV4KF92YWwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc0luZGV4PV92YWw7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldE5hbWUoX25hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc05hbWUuc3RyaW5nPV9uYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRUeXBlKF90eXBlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NUeXBlLnN0cmluZz1fdHlwZTtcclxuICAgIH0sXHJcblxyXG4gICAgU2V0TW9kZShfbW9kZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzTW9kZUxhYmVsLnN0cmluZz1fbW9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgU2V0QmFsYW5jZShfYmFsYW5jZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzQmFsYW5jZS5zdHJpbmc9X2JhbGFuY2U7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldExvY2F0aW9ucyhfbG9jYXRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NMb2NhdGlvbnMuc3RyaW5nPV9sb2NhdGlvbnM7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNlbGxCdXNpbmVzc0J1dHRvbihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5DYW5TZWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NCdG5Ob2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1fc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkNhblNlbGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNlbGxMb2NhdGlvbkJ0bk5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPV9zdGF0ZTsgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsTG9jYXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuQnVzaW5lc3NNb2RlPT0xKSAvL2hvbWUgYmFzZWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdGhlcmUgaXMgbm90IGdvaW5nIHRvIGJlIGFueSBsb2NhdGlvbiBmb3IgaG9tZSBiYXNlZFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuQnVzaW5lc3NNb2RlPT0yKSAvL0JyaWNrIGFuZCBtb3J0YXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgdmFyIF90ZW1wRGF0YT1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgaWYoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoPjApIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaGFzIGFueSBsb2NhdGlvbiBhdCBhbGxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbikgLy9pZiB0aGVyZSBpcyBzb21lIGxvYW4gb24gc2VsZWN0ZWQgYnVzaW5lc3NcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD03NTAwMC1fdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbj1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RlbXBEYXRhLkNhc2grPV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIG9uZSBvZiB5b3VyIGxvY2F0aW9uLCAkXCIrX2Ftb3VudCtcIiBhZGRlZCB0byB5b3VyIGNhc2ggYWZ0ZXIgcGF5aW5nIGxvYW5cIiwyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9jYXRpb25zTmFtZS5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGVtcERhdGEuQ2FzaCs9NzUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIG9uZSBvZiB5b3VyIGxvY2F0aW9uLCAkNzUwMDAgYWRkZWQgdG8geW91ciBjYXNoXCIsMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyMDUwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFNlbGxCdXNpbmVzcygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YT1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgICBpZihfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aD4xKVxyXG4gICAgICAgIHtcclxuICAgICAgICBpZih0aGlzLkJ1c2luZXNzTW9kZT09MSkgLy9ob21lIGJhc2VkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hblRha2VuKSAvL2lmIHRoZXJlIGlzIHNvbWUgbG9hbiBvbiBzZWxlY3RlZCBidXNpbmVzc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgSG9tZUJhc2VkQW1vdW50PTEwMDAwO1xyXG4gICAgICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5zcGxpY2UodGhpcy5CdXNpbmVzc0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PUhvbWVCYXNlZEFtb3VudC1fdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2xvYW5BbW91bnQ9X3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQtSG9tZUJhc2VkQW1vdW50O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZihfbG9hbkFtb3VudDw9MCkgLy9tZWFucyBwYXllZCBhbGwgbG9hblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQtPUhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihfYW1vdW50PD0wKVxyXG4gICAgICAgICAgICAgICAgICAgIF9hbW91bnQ9MDtcclxuXHJcbiAgICAgICAgICAgICAgICBfdGVtcERhdGEuQ2FzaCs9X2Ftb3VudDtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCB5b3VyIGJ1c2luZXNzLCAkXCIrX2Ftb3VudCtcIiBhZGRlZCB0byB5b3VyIGNhc2ggYWZ0ZXIgcGF5aW5nIGxvYW5cIiwyMDAwKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgSG9tZUJhc2VkQW1vdW50PTEwMDAwO1xyXG4gICAgICAgICAgICAgICAgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5zcGxpY2UodGhpcy5CdXNpbmVzc0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIF90ZW1wRGF0YS5DYXNoKz1Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgeW91ciBidXNpbmVzcywgJDEwMDAwIGFkZGVkIHRvIHlvdXIgY2FzaFwiLDIwMDApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5CdXNpbmVzc01vZGU9PTIpIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvYW5UYWtlbikgLy9pZiB0aGVyZSBpcyBzb21lIGxvYW4gb24gc2VsZWN0ZWQgYnVzaW5lc3NcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIE1vcnRhckFtb3VudD03NTAwMDtcclxuICAgICAgICAgICAgICAgIHZhciBfbG9jYXRpb25zPV90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihfbG9jYXRpb25zPjApLy9pZiBidXNpbmVzcyBoYXZlIGxvY2F0aW9uIG11bGlwbHllIGVhY2ggbG9jYXRpb24gd2l0aCBhbW91bnRcclxuICAgICAgICAgICAgICAgICAgICBNb3J0YXJBbW91bnQrPShfbG9jYXRpb25zKk1vcnRhckFtb3VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQ9TW9ydGFyQW1vdW50LV90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sb2FuQW1vdW50PV90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50LU1vcnRhckFtb3VudDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoX2xvYW5BbW91bnQ8PTApIC8vbWVhbnMgcGF5ZWQgYWxsIGxvYW5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzW3RoaXMuQnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbdGhpcy5CdXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50LT1Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoX2Ftb3VudDw9MClcclxuICAgICAgICAgICAgICAgICAgICBfYW1vdW50PTA7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RlbXBEYXRhLkNhc2grPV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLnNwbGljZSh0aGlzLkJ1c2luZXNzSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIHlvdXIgYnVzaW5lc3MgYWxvbmcgd2l0aCBhbnkgbG9jYXRpb25zLCAkXCIrX2Ftb3VudCtcIiBhZGRlZCB0byB5b3VyIGNhc2ggYWZ0ZXIgcGF5aW5nIGxvYW5cIiwyMDAwKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgICAgICAgICAgICAgIH0sIDIwNTApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgTW9ydGFyQW1vdW50PTc1MDAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnM9X3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1t0aGlzLkJ1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKF9sb2NhdGlvbnM+MCkvL2lmIGJ1c2luZXNzIGhhdmUgbG9jYXRpb24gbXVsaXBseWUgZWFjaCBsb2NhdGlvbiB3aXRoIGFtb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIE1vcnRhckFtb3VudCs9KF9sb2NhdGlvbnMqTW9ydGFyQW1vdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLnNwbGljZSh0aGlzLkJ1c2luZXNzSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgX3RlbXBEYXRhLkNhc2grPU1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCB5b3VyIGJ1c2luZXNzLCAkXCIrTW9ydGFyQW1vdW50K1wiIGFkZGVkIHRvIHlvdXIgY2FzaFwiLDIwMDApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjA1MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIkNhbm5vdCBzZWxsLCB5b3UgbmVlZCBhdGxlYXN0IG9uZSBidXNpbmVzcyB0byBjb250aW51ZSBwbGF5aW5nIGdhbWUuXCIsMjAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/TweenManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c8c61Prvh5FGpdWomk15G11', 'TweenManager');
// Script/TweenManager.js

"use strict";

//-------------------------------------------class for Tween Manager-------------------------//
var TweenClass = cc.Class({
  name: "TweenManager",
  "extends": cc.Component,
  properties: {
    isSplashTween: {
      displayName: "SplashTween",
      "default": false,
      type: cc["boolean"],
      serializable: true,
      tooltip: "Boolean to identify if this tween is related to splash screen"
    },
    isGamplayTween: {
      displayName: "GamplayTween",
      "default": false,
      type: cc["boolean"],
      serializable: true,
      tooltip: "Boolean to identify if this tween is related to Gamplay screen"
    },
    isLoginTween: {
      displayName: "LoginTween",
      "default": false,
      type: cc["boolean"],
      serializable: true,
      tooltip: "Boolean to identify if this tween is related to Login screen"
    }
  },
  start: function start() {},
  onLoad: function onLoad() {
    if (this.isSplashTween == true) this.TweenSplash(this.node);else if (this.isGamplayTween == true || this.isLoginTween == true) this.FadeNodeInOut(this.node, 1.5, 0, 255, "quadInOut");
  },
  TweenSplash: function TweenSplash(Node) {
    Node.opacity = 0;
    cc.tween(Node).to(1.5, {
      opacity: 255
    }, {
      easing: "quadInOut"
    }).to(0.9, {
      opacity: 0
    }, {
      easing: "quadInOut"
    }).call(function () {
      cc.director.loadScene("MainMenu");
    }).start();
  },
  LoginScreenTween: function LoginScreenTween(Node, FromPos) {
    Node.setPosition(0, FromPos);
    cc.tween(Node).to(1, {
      position: cc.v2(0, 0)
    }, {
      easing: "quadInOut"
    }).call(function () {}).start();
  },
  RepeatTweenScale: function RepeatTweenScale(Node, FromScale, ToScale, time) {
    cc.tween(Node).repeatForever(cc.tween().to(time, {
      scale: FromScale
    }, {
      easing: 'quadInOut'
    }).to(time, {
      scale: ToScale
    }, {
      easing: 'quadInOut'
    }).call(function () {})).start();
  },
  FadeNodeInOut: function FadeNodeInOut(Node, time, InitialOp, FinalOp, EaseType) {
    Node.opacity = InitialOp;
    cc.tween(Node).to(time, {
      opacity: FinalOp
    }, {
      easing: EaseType
    }).call(function () {}).start();
  }
});
module.exports = TweenClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxUd2Vlbk1hbmFnZXIuanMiXSwibmFtZXMiOlsiVHdlZW5DbGFzcyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImlzU3BsYXNoVHdlZW4iLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiaXNHYW1wbGF5VHdlZW4iLCJpc0xvZ2luVHdlZW4iLCJzdGFydCIsIm9uTG9hZCIsIlR3ZWVuU3BsYXNoIiwibm9kZSIsIkZhZGVOb2RlSW5PdXQiLCJOb2RlIiwib3BhY2l0eSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJMb2dpblNjcmVlblR3ZWVuIiwiRnJvbVBvcyIsInNldFBvc2l0aW9uIiwicG9zaXRpb24iLCJ2MiIsIlJlcGVhdFR3ZWVuU2NhbGUiLCJGcm9tU2NhbGUiLCJUb1NjYWxlIiwidGltZSIsInJlcGVhdEZvcmV2ZXIiLCJzY2FsZSIsIkluaXRpYWxPcCIsIkZpbmFsT3AiLCJFYXNlVHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxVQUFVLEdBQUVDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3JCQyxFQUFBQSxJQUFJLEVBQUUsY0FEZTtBQUVyQixhQUFTRixFQUFFLENBQUNHLFNBRlM7QUFJckJDLEVBQUFBLFVBQVUsRUFBRTtBQUNQQyxJQUFBQSxhQUFhLEVBQUU7QUFDWkMsTUFBQUEsV0FBVyxFQUFDLGFBREE7QUFFWixpQkFBUyxLQUZHO0FBR1pDLE1BQUFBLElBQUksRUFBRVAsRUFBRSxXQUhJO0FBSVpRLE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBRFI7QUFPUEMsSUFBQUEsY0FBYyxFQUFFO0FBQ2JKLE1BQUFBLFdBQVcsRUFBQyxjQURDO0FBRWIsaUJBQVMs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OEJDLE9BQTlCLEVBQXNDQyxRQUF0QyxFQUFnRDtBQUMzRHJCLElBQUFBLElBQUksQ0FBQ0MsT0FBTCxHQUFha0IsU0FBYjtBQUNBcEMsSUFBQUEsRUFBRSxDQUFDbUIsS0FBSCxDQUFTRixJQUFULEVBQ0NHLEVBREQsQ0FDSWEsSUFESixFQUNVO0FBQUNmLE1BQUFBLE9BQU8sRUFBRW1CO0FBQVYsS0FEVixFQUM2QjtBQUFDaEIsTUFBQUEsTUFBTSxFQUFDaUI7QUFBUixLQUQ3QixFQUVDaEIsSUFGRCxDQUVNLFlBQU0sQ0FBRyxDQUZmLEVBR0NWLEtBSEQ7QUFJSDtBQXBFb0IsQ0FBVCxDQUFoQjtBQXNFQTJCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFnQnpDLFVBQWhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVHdlZW4gTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHdlZW5DbGFzcz0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJUd2Vlbk1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgIGlzU3BsYXNoVHdlZW46IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTcGxhc2hUd2VlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIkJvb2xlYW4gdG8gaWRlbnRpZnkgaWYgdGhpcyB0d2VlbiBpcyByZWxhdGVkIHRvIHNwbGFzaCBzY3JlZW5cIix9LFxyXG4gICAgICAgICBpc0dhbXBsYXlUd2Vlbjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdhbXBsYXlUd2VlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIkJvb2xlYW4gdG8gaWRlbnRpZnkgaWYgdGhpcyB0d2VlbiBpcyByZWxhdGVkIHRvIEdhbXBsYXkgc2NyZWVuXCIsfSxcclxuICAgICAgICAgaXNMb2dpblR3ZWVuOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9naW5Ud2VlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIkJvb2xlYW4gdG8gaWRlbnRpZnkgaWYgdGhpcyB0d2VlbiBpcyByZWxhdGVkIHRvIExvZ2luIHNjcmVlblwiLH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge30sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaXNTcGxhc2hUd2Vlbj09dHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5Ud2VlblNwbGFzaCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGVsc2UgaWYodGhpcy5pc0dhbXBsYXlUd2Vlbj09dHJ1ZSB8fCB0aGlzLmlzTG9naW5Ud2Vlbj09dHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5GYWRlTm9kZUluT3V0KHRoaXMubm9kZSwxLjUsMCwyNTUsXCJxdWFkSW5PdXRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuU3BsYXNoOiBmdW5jdGlvbiAoTm9kZSkge1xyXG4gICAgICAgIE5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgICAgLnRvKDEuNSwge29wYWNpdHk6IDI1NX0se2Vhc2luZzpcInF1YWRJbk91dFwifSlcclxuICAgICAgICAudG8oMC45LCB7b3BhY2l0eTogMH0se2Vhc2luZzpcInF1YWRJbk91dFwifSlcclxuICAgICAgICAuY2FsbCgoKSA9PiB7Y2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbk1lbnVcIik7fSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgTG9naW5TY3JlZW5Ud2VlbjogZnVuY3Rpb24gKE5vZGUsRnJvbVBvcykge1xyXG4gICAgICAgIE5vZGUuc2V0UG9zaXRpb24oMCwgRnJvbVBvcyk7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgICAudG8oMSwgeyBwb3NpdGlvbjogY2MudjIoMCwgMCl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlcGVhdFR3ZWVuU2NhbGU6IGZ1bmN0aW9uIChOb2RlLEZyb21TY2FsZSxUb1NjYWxlLHRpbWUpIHtcclxuICAgICAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAgIC5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICBjYy50d2VlbigpXHJcbiAgICAgICAgICAgIC50byh0aW1lLCB7IHNjYWxlOiBGcm9tU2NhbGUgfSwgeyBlYXNpbmc6ICdxdWFkSW5PdXQnfSlcclxuICAgICAgICAgICAgLnRvKHRpbWUsIHsgc2NhbGU6IFRvU2NhbGUgfSwgeyBlYXNpbmc6ICdxdWFkSW5PdXQnfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBGYWRlTm9kZUluT3V0OiBmdW5jdGlvbiAoTm9kZSx0aW1lLEluaXRpYWxPcCxGaW5hbE9wLEVhc2VUeXBlKSB7XHJcbiAgICAgICAgTm9kZS5vcGFjaXR5PUluaXRpYWxPcDtcclxuICAgICAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAgIC50byh0aW1lLCB7b3BhY2l0eTogRmluYWxPcH0se2Vhc2luZzpFYXNlVHlwZX0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4geyB9KSAgICAgIFxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxufSk7XHJcbm1vZHVsZS5leHBvcnRzPSBUd2VlbkNsYXNzO1xyXG5cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/DecksData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '58172YL+tVMTY9FLVSAy/Ur', 'DecksData');
// Script/DecksData.js

"use strict";

var GamePlayReferenceManager = null; //-------------------------------------------Spaces Data-------------------------//

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
  GoBackSpaces: 11
}); //-------------------------------------------class for card data-------------------------//

var CardData = cc.Class({
  name: "CardData",
  properties: {
    ID: {
      displayName: "ID",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Id of the card"
    },
    Description: {
      displayName: "Description",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "description of the card"
    },
    HasButton: {
      displayName: "HasButton",
      type: cc["boolean"],
      "default": false,
      serializable: true,
      tooltip: "if this card should have interaction button"
    },
    ButtonName: {
      displayName: "ButtonName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "button name to show on screen"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for card UI-------------------------//

var CardUI = cc.Class({
  name: "CardUI",
  properties: {
    ToastNode: {
      displayName: "ToastNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "node reference for toast node"
    },
    ToastLabel: {
      displayName: "ToastLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "label reference for toast node"
    },
    ButtonNode: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Button reference for node"
    },
    InteractionButtonNode: {
      displayName: "InteractionButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "interaction Button reference for node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for decks Data-------------------------//

var DecksData = cc.Class({
  name: "DecksData",
  "extends": cc.Component,
  properties: {
    MainUI: {
      displayName: "MainUI",
      "default": null,
      type: CardUI,
      serializable: true,
      tooltip: "UI of decks"
    },
    BigBusiness: {
      displayName: "BigBusiness",
      type: [CardData],
      "default": [],
      serializable: true,
      tooltip: "all cards data for big business"
    },
    Marketing: {
      displayName: "Marketing",
      type: [CardData],
      "default": [],
      serializable: true,
      tooltip: "all cards data for marketing"
    },
    Losses: {
      displayName: "Losses",
      type: [CardData],
      "default": [],
      serializable: true,
      tooltip: "all cards data for losses"
    },
    WildCards: {
      displayName: "WildCards",
      type: [CardData],
      "default": [],
      serializable: true,
      tooltip: "all cards data for WildCards"
    },
    SpacesType: {
      type: EnumSpaceType,
      "default": EnumSpaceType.None,
      serializable: true,
      tooltip: "states machines by type of card or spaces on board"
    }
  },
  onLoad: function onLoad() {
    this.CheckReferences();
    this.SelectedCardIndex = -1;
    this.CardSelected = -1; //this.BigBusinessCardFunctionality("1");
    //for testing
    // this.Counter=0;
    // this.GenerateRandomBigBusinessCard(this.Counter);
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },
  ToggleButtons: function ToggleButtons(_isOwner, _hasButton) {
    var _this = this;

    if (_hasButton === void 0) {
      _hasButton = false;
    }

    if (_isOwner && _hasButton) {
      this.MainUI.ButtonNode.active = false;
      this.MainUI.InteractionButtonNode.active = true;
    } else if (_isOwner && !_hasButton) {
      this.MainUI.ButtonNode.active = true;
      this.MainUI.InteractionButtonNode.active = false;
    } else {
      this.MainUI.InteractionButtonNode.active = false;
      this.MainUI.ButtonNode.active = false;
      setTimeout(function () {
        _this.ExitCardInfo();
      }, 2500);
    }
  },
  GenerateRandomBigBusinessCard: function GenerateRandomBigBusinessCard(_isOwner, _randomValue) {
    this.SpacesType = EnumSpaceType.BigBusiness;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.BigBusiness[this.SelectedCardIndex].ID;
    if (this.BigBusiness[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.BigBusiness[this.SelectedCardIndex].ButtonName;
    this.ShowCardInfo(this.BigBusiness[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.BigBusiness[this.SelectedCardIndex].HasButton);
  },
  GenerateRandomMarketingCard: function GenerateRandomMarketingCard(_isOwner, _randomValue) {
    this.SpacesType = EnumSpaceType.Marketing;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.Marketing[this.SelectedCardIndex].ID;
    if (this.Marketing[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.Marketing[this.SelectedCardIndex].ButtonName;
    this.ShowCardInfo(this.Marketing[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.Marketing[this.SelectedCardIndex].HasButton);
  },
  GenerateRandomLossesCard: function GenerateRandomLossesCard(_isOwner, _randomValue) {
    this.SpacesType = EnumSpaceType.Losses;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.Losses[this.SelectedCardIndex].ID;
    this.ShowCardInfo(this.Losses[this.SelectedCardIndex].Description, true);
    if (this.Losses[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.Losses[this.SelectedCardIndex].ButtonName;
    this.ToggleButtons(_isOwner, this.Losses[this.SelectedCardIndex].HasButton);
  },
  GenerateRandomWildCard: function GenerateRandomWildCard(_isOwner, _randomValue) {
    this.SpacesType = EnumSpaceType.WildCard;
    this.SelectedCardIndex = _randomValue;
    this.CardSelected = this.WildCards[this.SelectedCardIndex].ID;
    if (this.WildCards[this.SelectedCardIndex].HasButton) this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = this.WildCards[this.SelectedCardIndex].ButtonName;
    this.ShowCardInfo(this.WildCards[this.SelectedCardIndex].Description, true);
    this.ToggleButtons(_isOwner, this.WildCards[this.SelectedCardIndex].HasButton);
  },
  SpaceInvest: function SpaceInvest(_isOwner, _index) {
    this.SpacesType = EnumSpaceType.Invest;
    this.ShowCardInfo("You can invest one more time in Gold or stocks this turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
    this.ToggleButtons(_isOwner, true);
  },
  SpacePayDay: function SpacePayDay(_isOwner, _index) {
    this.ShowCardInfo("You have landed on PayDay space.", true);
    this.PayDayFunctionality();
    this.ToggleButtons(_isOwner, false);
  },
  SpaceDoublePayDay: function SpaceDoublePayDay(_isOwner, _index) {
    this.ShowCardInfo("You have landed on DoublePayDay space.", true);
    this.DoublePayDayFunctionality();
    this.ToggleButtons(_isOwner, false);
  },
  SpaceOneQuestion: function SpaceOneQuestion(_isOwner, _index) {
    this.ShowCardInfo("You have landed on One Question space.", true);
    this.OneQuestionFunctionality();
    this.ToggleButtons(_isOwner, false);
  },
  SpaceSell: function SpaceSell(_isOwner, _index) {
    this.SpacesType = EnumSpaceType.Sell;
    this.ShowCardInfo("You can sell any one of your business or can skip turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
    this.ToggleButtons(_isOwner, true);
  },
  SpaceBuyOrSell: function SpaceBuyOrSell(_isOwner, _index) {
    this.SpacesType = EnumSpaceType.BuyOrSell;
    this.ShowCardInfo("You can Buy or sell Gold or stocks one more time in this turn.", true);
    this.MainUI.InteractionButtonNode.children[0].children[0].getComponent(cc.Label).string = "ACCEPT";
    this.ToggleButtons(_isOwner, true);
  },
  SpaceGoBackSpaces: function SpaceGoBackSpaces(_isOwner, _index) {
    this.ShowCardInfo("You have landed on Go Back space.", true);
    this.GoBackFunctionality();
    this.ToggleButtons(_isOwner, false);
  },
  ShowCardInfo: function ShowCardInfo(message, _state) {
    if (_state) {
      this.MainUI.ToastNode.active = true;
      this.MainUI.ToastLabel.string = message;
    } else {
      this.MainUI.ToastLabel.string = "";
      this.MainUI.ToastNode.active = false;
    }
  },
  ExitCardInfo: function ExitCardInfo() {
    this.ShowCardInfo("", false);
    GamePlayReferenceManager.Instance.Get_GameManager().ResetCardDisplay();
    GamePlayReferenceManager.Instance.Get_GameManager().RaiseEventTurnComplete(); //for testing
    // this.Counter++;
    // this.GenerateRandomBigBusinessCard(this.Counter);
  },
  CardFuntionalityButton: function CardFuntionalityButton() {
    if (this.SpacesType == EnumSpaceType.BigBusiness) {
      this.BigBusinessCardFunctionality(this.CardSelected);
    } else if (this.SpacesType == EnumSpaceType.Losses) {
      this.LossesCardFunctionality(this.CardSelected);
    } else if (this.SpacesType == EnumSpaceType.Marketing) {
      this.MarketingCardFunctionality(this.CardSelected);
    } else if (this.SpacesType == EnumSpaceType.WildCard) {
      this.WildCardFunctionality(this.CardSelected);
    } else if (this.SpacesType == EnumSpaceType.Sell) {
      this.SellFunctionality();
    } else if (this.SpacesType == EnumSpaceType.Invest) {
      this.InvestFunctionality();
    } else if (this.SpacesType == EnumSpaceType.BuyOrSell) {
      this.BuyOrSellFunctionality();
    }
  },
  CheckLoan: function CheckLoan() {
    var _loanTaken = false;
    var _businessIndex = 0;

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    for (var index = 0; index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    var val = -1;
    val = _loanTaken == true ? 1 : 0;
    var Result = cc.v2(val, _businessIndex);
    return Result;
  },
  CompleteTurnWithToast: function CompleteTurnWithToast(_msg, _time) {
    var _this2 = this;

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_msg, _time);
    this.ShowCardInfo("", false);
    setTimeout(function () {
      _this2.ShowCardInfo("", false);

      _manager.ResetCardDisplay();

      _manager.RaiseEventTurnComplete();
    }, _time + 100);
  },
  BigBusinessCardFunctionality: function BigBusinessCardFunctionality(_id) {
    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //receive 20000$ gift to payoff loan
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _result = this.CheckLoan();

        var IsLoanTaken = _result.x;
        var _businessIndex = _result.y;

        if (IsLoanTaken == 1) //means user has taken loan
          {
            _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount - 20000;

            if (_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount <= 0) {
              _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = 0;
              _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanTaken = false;
            }

            this.CompleteTurnWithToast("Loan amount of $20000 has been payed off.", 1800);
          } else {
          this.CompleteTurnWithToast("You have not taken any loan, turn will skip now.", 1800);
        }

        break;

      case "2":
        //hire lawyer
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        if (_manager.PlayerGameInfo[_playerIndex].LawyerStatus) {
          this.CompleteTurnWithToast("You have already hired laywer, turn will skip now.", 1800);
        } else {
          _manager.PlayerGameInfo[_playerIndex].LawyerStatus = true;
          this.CompleteTurnWithToast("You have successfully hired a lawyer.", 1800);
        }

        break;

      case "3":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "4":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "5":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "6":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "7":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "8":
        //double pay day on next pay day
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleDoublePayNextTurn(true);

        this.CompleteTurnWithToast("You will receive double profits on next payday.", 1800);
        break;

      case "9":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "10":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "11":
        //roll dice twice, if result is >19 then take all money inside marketing.
        console.log(this.BigBusiness[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var Dice1Result = _manager.RollTwoDices();

        var Dice2Result = _manager.RollTwoDices(); //  var Dice1Result=12;
        //  var Dice2Result=12;


        var TotalResult = Dice1Result + Dice2Result;

        if (TotalResult >= 19) {
          var _amount = 0;

          for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
            _amount = _amount + _manager.PlayerGameInfo[index].MarketingAmount;
          }

          _manager.PlayerGameInfo[_playerIndex].Cash += _amount;
          this.CompleteTurnWithToast("Dice 1 Result: " + Dice1Result + "\n" + "\n" + "Dice 2 Result: " + Dice2Result + "\n" + "\n" + "Total: " + TotalResult + "\n" + "\n" + "\n" + "Amount $" + _amount + " has successfully added in your cash from marketing amount on table.", 4000);

          var _actorsArray = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

          for (var _index2 = 0; _index2 < _actorsArray.length; _index2++) {
            _actorsArray[_index2].customProperties.PlayerSessionData.MarketingAmount = 0;
          }
        } else {
          this.CompleteTurnWithToast("Dice 1 Result: " + Dice1Result + "\n" + "\n" + "Dice 2 Result: " + Dice2Result + "\n" + "\n" + "Total: " + TotalResult + "\n" + "\n" + "\n" + "You ran out of luck, turn will skip now", 4000);
        }

        break;

      case "12":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "13":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "14":
        console.log(this.BigBusiness[Index].Description);
        break;

      case "15":
        console.log(this.BigBusiness[Index].Description);
        break;

      default:
        break;
    }
  },
  MarketingCardFunctionality: function MarketingCardFunctionality(_id) {
    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2100);else this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        break;

      case "2":
        console.log(this.Marketing[Index].Description);
        break;

      case "3":
        console.log(this.Marketing[Index].Description);
        break;

      case "4":
        //Your Marketing Account triples, but you must leave it in the account.
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
        var _multiplier = 3;

        var _increaseAmount = _manager.MultiplyMarketingMoney(_multiplier);

        if (_increaseAmount > 0) {
          this.CompleteTurnWithToast("Marketing Amount: $" + _marketAmount + "\n" + "\n" + "Total: " + _marketAmount + " * " + _multiplier + " = " + _increaseAmount + "\n" + "\n" + "\n" + "your marketing amount has been sucessfully increase to $" + _increaseAmount, 3100);
        } else {
          this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        }

        break;

      case "5":
        console.log(this.Marketing[Index].Description);
        break;

      case "6":
        console.log(this.Marketing[Index].Description);
        break;

      case "7":
        console.log(this.Marketing[Index].Description);
        break;

      case "8":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2100);else this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        break;

      case "9":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2100);else this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        break;

      case "10":
        //Receive all of your Marketing Budget back, plus 700% profit.
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _marketAmount = _manager.PlayerGameInfo[_playerIndex].MarketingAmount;
        var _profit = 700;

        var _amount = _manager.GetMarketingMoney(_profit);

        if (_amount > 0) {
          this.CompleteTurnWithToast("Marketing Amount: $" + _marketAmount + "\n" + "\n" + "Total: " + _marketAmount + " + (" + _marketAmount + "*" + _profit + " )/100" + " = " + _amount + "\n" + "\n" + "\n" + "your cash amount has been sucessfully increase by $" + _amount + ", total cash becomes $" + _manager.PlayerGameInfo[_playerIndex].Cash, 4000);
        } else {
          this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        }

        break;

      case "11":
        console.log(this.Marketing[Index].Description);
        break;

      case "12":
        console.log(this.Marketing[Index].Description);
        break;

      case "13":
        console.log(this.Marketing[Index].Description);
        break;

      case "14":
        //lose all your money in marketing account
        console.log(this.Marketing[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _loseAmount = _manager.LoseAllMarketingMoney();

        if (_loseAmount > 0) this.CompleteTurnWithToast("You have lost your marketing amount of $" + _loseAmount, 2100);else this.CompleteTurnWithToast("You don't have any marketing amount", 2100);
        break;

      case "15":
        console.log(this.Marketing[Index].Description);
        break;

      default:
        break;
    }
  },
  LossesCardFunctionality: function LossesCardFunctionality(_id) {
    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //lose next turn
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleSkipNextTurn(true);

        this.CompleteTurnWithToast("You will lose your next turn.", 2100);
        break;

      case "2":
        console.log(this.Losses[Index].Description);
        break;

      case "3":
        //lose all your business profits on next Pay Day.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleSkipPayDay_Whole(true);

        this.CompleteTurnWithToast("you will lose all your business profits on next Pay Day.", 2100);
        break;

      case "4":
        console.log(this.Losses[Index].Description);
        break;

      case "5":
        console.log(this.Losses[Index].Description);
        break;

      case "6":
        // If Business #1 is Home Based, pay a $5,000 Insurance Deductible; if Brick & Mortar $10,000 deductible.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _businessType = parseInt(_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[0].BusinessType);

        if (_businessType == 1) // first business was home based
          {
            if (_manager.PlayerGameInfo[_playerIndex].Cash >= 5000) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= 5000;
              this.CompleteTurnWithToast("You payed $5000 insurance on your first home based business, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 2100);
            } else {
              this.CompleteTurnWithToast("you don't have enough money.", 1800);
            }
          } else if (_businessType == 2) //first busioness was brick & mortar
          {
            if (_manager.PlayerGameInfo[_playerIndex].Cash >= 10000) {
              _manager.PlayerGameInfo[_playerIndex].Cash -= 10000;
              this.CompleteTurnWithToast("You payed $10000 insurance on your first brick & mortar business, remaining cash is $" + _manager.PlayerGameInfo[_playerIndex].Cash, 2100);
            } else {
              this.CompleteTurnWithToast("you don't have enough money.", 1800);
            }
          }

        break;

      case "7":
        //lose your next Pay Day for all of your home-based businesses.
        console.log(this.Losses[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        _manager.ToggleSkipPayDay_HomeBased(true);

        this.CompleteTurnWithToast("you will lose your next Pay Day for all of your home-based businesses.", 2100);
        break;

      case "8":
        console.log(this.Losses[Index].Description);
        break;

      case "9":
        console.log(this.Losses[Index].Description);
        break;

      case "10":
        console.log(this.Losses[Index].Description);
        break;

      case "11":
        console.log(this.Losses[Index].Description);
        break;

      case "12":
        console.log(this.Losses[Index].Description);
        break;

      case "13":
        console.log(this.Losses[Index].Description);
        break;

      case "14":
        console.log(this.Losses[Index].Description);
        break;

      case "15":
        console.log(this.Losses[Index].Description);
        break;

      default:
        break;
    }
  },
  WildCardFunctionality: function WildCardFunctionality(_id) {
    var Index = parseInt(_id);
    Index = Index - 1;

    switch (_id) {
      case "1":
        //doubles your income on the next Pay Day.
        console.log(this.WildCards[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        _manager.ToggleDoublePayNextTurn(true);

        this.CompleteTurnWithToast("You will receive double profits on next payday.", 1800);
        break;

      case "2":
        //Roll 1 die, multiply result by $5,000 and receive your advance from the Bank.
        console.log(this.WildCards[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var DiceResult = _manager.RollOneDice();

        var CashMulitplier = 5000;
        var TotalResult = DiceResult * CashMulitplier;
        _manager.PlayerGameInfo[_playerIndex].Cash += TotalResult;
        this.CompleteTurnWithToast("Dice Result: " + DiceResult + "\n" + "\n" + "Total: " + DiceResult + " * " + CashMulitplier + " = " + TotalResult + "\n" + "\n" + "\n" + "Amount $" + TotalResult + " has been added into your cash.", 4000);
        break;

      case "3":
        console.log(this.WildCards[Index].Description);
        break;

      case "4":
        console.log(this.WildCards[Index].Description);
        break;

      case "5":
        console.log(this.WildCards[Index].Description);
        break;

      case "6":
        console.log(this.WildCards[Index].Description);
        break;

      case "7":
        //pay off your loan for your Brick & Mortar Business. If you have no loan outstanding, receive $50,000.
        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        var _loanReset = false;

        for (var index = 0; index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
          var _type = parseInt(_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].BusinessType);

          if (_type == 2 && _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
            _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken = false;
            _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount = 0;
            _loanReset = true;
            break;
          }
        }

        if (_loanReset) {
          this.CompleteTurnWithToast("your outstanding loan has been payed off.", 2800);
        } else {
          _manager.PlayerGameInfo[_playerIndex].Cash += 50000;
          this.CompleteTurnWithToast("you had no loan, amount $50000 has been added to your cash", 2800);
        }

        console.log(this.WildCards[Index].Description);
        break;

      case "8":
        console.log(this.WildCards[Index].Description);
        break;

      case "9":
        console.log(this.WildCards[Index].Description);
        break;

      case "10":
        console.log(this.WildCards[Index].Description);
        break;

      case "11":
        // receive double your business profits on all of your businesses.
        console.log(this.WildCards[Index].Description);

        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        _manager.ToggleDoublePayNextTurn(true);

        this.CompleteTurnWithToast("You will receive double profits on next payday.", 1800);
        break;

      case "12":
        console.log(this.WildCards[Index].Description);
        break;

      case "13":
        console.log(this.WildCards[Index].Description);
        break;

      case "14":
        console.log(this.WildCards[Index].Description);
        break;

      case "15":
        console.log(this.WildCards[Index].Description);
        break;

      default:
        break;
    }
  },
  InvestFunctionality: function InvestFunctionality() {
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableInvest_InvestSetupUI(true);
    this.ShowCardInfo("", false);
  },
  PayDayFunctionality: function PayDayFunctionality() {},
  DoublePayDayFunctionality: function DoublePayDayFunctionality() {},
  OneQuestionFunctionality: function OneQuestionFunctionality() {},
  SellFunctionality: function SellFunctionality() {
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableSellScreen__SellBusinessUISetup(true);
    this.ShowCardInfo("", false);
  },
  BuyOrSellFunctionality: function BuyOrSellFunctionality() {
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableBuyOrSell_BuyOrSellSetupUI(true);
    this.ShowCardInfo("", false);
  },
  GoBackFunctionality: function GoBackFunctionality() {}
});
module.exports = DecksData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEZWNrc0RhdGEuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiRW51bVNwYWNlVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJXaWxkQ2FyZCIsIkJpZ0J1c2luZXNzIiwiTWFya2V0aW5nIiwiSW52ZXN0IiwiTG9zc2VzIiwiUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiT25lUXVlc3Rpb24iLCJTZWxsIiwiQnV5T3JTZWxsIiwiR29CYWNrU3BhY2VzIiwiQ2FyZERhdGEiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiSUQiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJUZXh0Iiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkRlc2NyaXB0aW9uIiwiSGFzQnV0dG9uIiwiQnV0dG9uTmFtZSIsImN0b3IiLCJDYXJkVUkiLCJUb2FzdE5vZGUiLCJOb2RlIiwiVG9hc3RMYWJlbCIsIkxhYmVsIiwiQnV0dG9uTm9kZSIsIkludGVyYWN0aW9uQnV0dG9uTm9kZSIsIkRlY2tzRGF0YSIsIkNvbXBvbmVudCIsIk1haW5VSSIsIldpbGRDYXJkcyIsIlNwYWNlc1R5cGUiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTZWxlY3RlZENhcmRJbmRleCIsIkNhcmRTZWxlY3RlZCIsInJlcXVpcmUiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJUb2dnbGVCdXR0b25zIiwiX2lzT3duZXIiLCJfaGFzQnV0dG9uIiwiYWN0aXZlIiwic2V0VGltZW91dCIsIkV4aXRDYXJkSW5mbyIsIkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkIiwiX3JhbmRvbVZhbHVlIiwiY2hpbGRyZW4iLCJnZXRDb21wb25lbnQiLCJzdHJpbmciLCJTaG93Q2FyZEluZm8iLCJHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQiLCJHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQiLCJHZW5lcmF0ZVJhbmRvbVdpbGRDYXJkIiwiU3BhY2VJbnZlc3QiLCJfaW5kZXgiLCJTcGFjZVBheURheSIsIlBheURheUZ1bmN0aW9uYWxpdHkiLCJTcGFjZURvdWJsZVBheURheSIsIkRvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkiLCJTcGFjZU9uZVF1ZXN0aW9uIiwiT25lUXVlc3Rpb25GdW5jdGlvbmFsaXR5IiwiU3BhY2VTZWxsIiwiU3BhY2VCdXlPclNlbGwiLCJTcGFjZUdvQmFja1NwYWNlcyIsIkdvQmFja0Z1bmN0aW9uYWxpdHkiLCJtZXNzYWdlIiwiX3N0YXRlIiwiSW5zdGFuY2UiLCJHZXRfR2FtZU1hbmFnZXIiLCJSZXNldENhcmREaXNwbGF5IiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIkNhcmRGdW50aW9uYWxpdHlCdXR0b24iLCJCaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5IiwiTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJNYXJrZXRpbmdDYXJkRnVuY3Rpb25hbGl0eSIsIldpbGRDYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGxGdW5jdGlvbmFsaXR5IiwiSW52ZXN0RnVuY3Rpb25hbGl0eSIsIkJ1eU9yU2VsbEZ1bmN0aW9uYWxpdHkiLCJDaGVja0xvYW4iLCJfbG9hblRha2VuIiwiX2J1c2luZXNzSW5kZXgiLCJfbWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkdldFR1cm5OdW1iZXIiLCJpbmRleCIsIlBsYXllckdhbWVJbmZvIiwiTm9PZkJ1c2luZXNzIiwibGVuZ3RoIiwiTG9hblRha2VuIiwidmFsIiwiUmVzdWx0IiwidjIiLCJDb21wbGV0ZVR1cm5XaXRoVG9hc3QiLCJfbXNnIiwiX3RpbWUiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJfaWQiLCJJbmRleCIsInBhcnNlSW50IiwiY29uc29sZSIsImxvZyIsIl9yZXN1bHQiLCJJc0xvYW5UYWtlbiIsIngiLCJ5IiwiTG9hbkFtb3VudCIsIkxhd3llclN0YXR1cyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiRGljZTFSZXN1bHQiLCJSb2xsVHdvRGljZXMiLCJEaWNlMlJlc3VsdCIsIlRvdGFsUmVzdWx0IiwiX2Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkNhc2giLCJfYWN0b3JzQXJyYXkiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tQWN0b3JzQXJyYXkiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJfbG9zZUFtb3VudCIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9tYXJrZXRBbW91bnQiLCJfbXVsdGlwbGllciIsIl9pbmNyZWFzZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiR2V0TWFya2V0aW5nTW9uZXkiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiX2J1c2luZXNzVHlwZSIsIkJ1c2luZXNzVHlwZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiRGljZVJlc3VsdCIsIlJvbGxPbmVEaWNlIiwiQ2FzaE11bGl0cGxpZXIiLCJfbG9hblJlc2V0IiwiX3R5cGUiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0IsRUFDQTs7QUFDQSxJQUFJQyxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUMsQ0FEbUI7QUFFeEJDLEVBQUFBLFFBQVEsRUFBRSxDQUZjO0FBR3hCQyxFQUFBQSxXQUFXLEVBQUUsQ0FIVztBQUl4QkMsRUFBQUEsU0FBUyxFQUFFLENBSmE7QUFLeEJDLEVBQUFBLE1BQU0sRUFBRSxDQUxnQjtBQU14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ZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNwYWNlcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtU3BhY2VUeXBlID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBXaWxkQ2FyZDogMSxcclxuICAgIEJpZ0J1c2luZXNzOiAyLFxyXG4gICAgTWFya2V0aW5nOiAzLFxyXG4gICAgSW52ZXN0OiA0LFxyXG4gICAgTG9zc2VzOjUsXHJcbiAgICBQYXlEYXk6IDYsXHJcbiAgICBEb3VibGVQYXlEYXk6IDcsXHJcbiAgICBPbmVRdWVzdGlvbjogOCxcclxuICAgIFNlbGw6IDksXHJcbiAgICBCdXlPclNlbGw6IDEwLFxyXG4gICAgR29CYWNrU3BhY2VzOjExLFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGNhcmQgZGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkNhcmREYXRhXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgSUQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSURcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJJZCBvZiB0aGUgY2FyZFwifSxcclxuICAgICAgICBEZXNjcmlwdGlvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJEZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDpcImRlc2NyaXB0aW9uIG9mIHRoZSBjYXJkXCJ9LFxyXG4gICAgICAgIEhhc0J1dHRvbjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6XCJIYXNCdXR0b25cIixcclxuICAgICAgICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOlwiaWYgdGhpcyBjYXJkIHNob3VsZCBoYXZlIGludGVyYWN0aW9uIGJ1dHRvblwifSxcclxuICAgICAgICBCdXR0b25OYW1lOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6XCJidXR0b24gbmFtZSB0byBzaG93IG9uIHNjcmVlblwifSxcclxuIH0sXHJcblxyXG4gY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbiB9XHJcblxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBjYXJkIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkVUk9Y2MuQ2xhc3Moe1xyXG4gICBuYW1lOlwiQ2FyZFVJXCIsXHJcbiAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIFRvYXN0Tm9kZTpcclxuICAgICAgIHtcclxuICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG9hc3ROb2RlXCIsXHJcbiAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJub2RlIHJlZmVyZW5jZSBmb3IgdG9hc3Qgbm9kZVwifSxcclxuICAgICAgIFRvYXN0TGFiZWw6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0TGFiZWxcIixcclxuICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHRvb2x0aXA6XCJsYWJlbCByZWZlcmVuY2UgZm9yIHRvYXN0IG5vZGVcIn0sXHJcbiAgICAgIEJ1dHRvbk5vZGU6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICBkaXNwbGF5TmFtZTpcIkV4aXRCdXR0b25cIixcclxuICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgdG9vbHRpcDpcIkJ1dHRvbiByZWZlcmVuY2UgZm9yIG5vZGVcIn0sXHJcbiAgICAgICAgSW50ZXJhY3Rpb25CdXR0b25Ob2RlOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgZGlzcGxheU5hbWU6XCJJbnRlcmFjdGlvbkJ1dHRvblwiLFxyXG4gICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICB0b29sdGlwOlwiaW50ZXJhY3Rpb24gQnV0dG9uIHJlZmVyZW5jZSBmb3Igbm9kZVwifSxcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcblxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGRlY2tzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERlY2tzRGF0YT1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiRGVja3NEYXRhXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgIE1haW5VSTpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIk1haW5VSVwiLFxyXG4gICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICB0eXBlOiBDYXJkVUksXHJcbiAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgdG9vbHRpcDpcIlVJIG9mIGRlY2tzXCJ9LFxyXG4gICAgICBCaWdCdXNpbmVzczpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIkJpZ0J1c2luZXNzXCIsXHJcbiAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJhbGwgY2FyZHMgZGF0YSBmb3IgYmlnIGJ1c2luZXNzXCIsfSxcclxuICAgICAgTWFya2V0aW5nOlxyXG4gICAgICB7XHJcbiAgICAgICAgIGRpc3BsYXlOYW1lOlwiTWFya2V0aW5nXCIsXHJcbiAgICAgICAgIHR5cGU6IFtDYXJkRGF0YV0sXHJcbiAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgIHRvb2x0aXA6XCJhbGwgY2FyZHMgZGF0YSBmb3IgbWFya2V0aW5nXCIsfSxcclxuICAgICAgIExvc3NlczpcclxuICAgICAge1xyXG4gICAgICAgICBkaXNwbGF5TmFtZTpcIkxvc3Nlc1wiLFxyXG4gICAgICAgICB0eXBlOiBbQ2FyZERhdGFdLFxyXG4gICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICB0b29sdGlwOlwiYWxsIGNhcmRzIGRhdGEgZm9yIGxvc3Nlc1wiLH0sXHJcbiAgICAgICBXaWxkQ2FyZHM6XHJcbiAgICAgIHtcclxuICAgICAgICAgZGlzcGxheU5hbWU6XCJXaWxkQ2FyZHNcIixcclxuICAgICAgICAgdHlwZTogW0NhcmREYXRhXSxcclxuICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgdG9vbHRpcDpcImFsbCBjYXJkcyBkYXRhIGZvciBXaWxkQ2FyZHNcIix9LFxyXG4gICAgICAgIFNwYWNlc1R5cGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBFbnVtU3BhY2VUeXBlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBFbnVtU3BhY2VUeXBlLk5vbmUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInN0YXRlcyBtYWNoaW5lcyBieSB0eXBlIG9mIGNhcmQgb3Igc3BhY2VzIG9uIGJvYXJkXCIsfSwgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9LTE7XHJcbiAgICAgIHRoaXMuQ2FyZFNlbGVjdGVkPS0xO1xyXG5cclxuICAgICAgLy90aGlzLkJpZ0J1c2luZXNzQ2FyZEZ1bmN0aW9uYWxpdHkoXCIxXCIpO1xyXG4gICAgICAvL2ZvciB0ZXN0aW5nXHJcbiAgICAgIC8vIHRoaXMuQ291bnRlcj0wO1xyXG4gICAgICAvLyB0aGlzLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKHRoaXMuQ291bnRlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmFuZG9tOmZ1bmN0aW9uKG1pbixtYXgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsX2hhc0J1dHRvbj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNPd25lciAmJiBfaGFzQnV0dG9uKVxyXG4gICAgICB7XHJcbiAgICAgICAgIHRoaXMuTWFpblVJLkJ1dHRvbk5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSAgaWYoX2lzT3duZXIgJiYgIV9oYXNCdXR0b24pXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLk1haW5VSS5CdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICB0aGlzLkV4aXRDYXJkSW5mbygpO1xyXG4gICAgICAgfSwgMjUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuQmlnQnVzaW5lc3M7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuQmlnQnVzaW5lc3NbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSGFzQnV0dG9uKVxyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkJpZ0J1c2luZXNzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkRlc2NyaXB0aW9uLHRydWUpO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdGhpcy5CaWdCdXNpbmVzc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5NYXJrZXRpbmc7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICBpZih0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pXHJcbiAgICAgICAgdGhpcy5NYWluVUkuSW50ZXJhY3Rpb25CdXR0b25Ob2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRoaXMuTWFya2V0aW5nW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkJ1dHRvbk5hbWU7XHJcbiAgICBcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8odGhpcy5NYXJrZXRpbmdbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uRGVzY3JpcHRpb24sdHJ1ZSk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0aGlzLk1hcmtldGluZ1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5IYXNCdXR0b24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5Mb3NzZXM7XHJcbiAgICAgIHRoaXMuU2VsZWN0ZWRDYXJkSW5kZXg9IF9yYW5kb21WYWx1ZTtcclxuICAgICAgdGhpcy5DYXJkU2VsZWN0ZWQ9dGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uSUQ7XHJcblxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLkxvc3Nlc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbix0cnVlKTtcclxuXHJcbiAgICAgIGlmKHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5Mb3NzZXNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuICAgICBcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRoaXMuTG9zc2VzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlUmFuZG9tV2lsZENhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5XaWxkQ2FyZDtcclxuICAgICAgdGhpcy5TZWxlY3RlZENhcmRJbmRleD0gX3JhbmRvbVZhbHVlO1xyXG4gICAgICB0aGlzLkNhcmRTZWxlY3RlZD10aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5JRDtcclxuXHJcbiAgICAgIGlmKHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbilcclxuICAgICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5XaWxkQ2FyZHNbdGhpcy5TZWxlY3RlZENhcmRJbmRleF0uQnV0dG9uTmFtZTtcclxuIFxyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyh0aGlzLldpbGRDYXJkc1t0aGlzLlNlbGVjdGVkQ2FyZEluZGV4XS5EZXNjcmlwdGlvbix0cnVlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRoaXMuV2lsZENhcmRzW3RoaXMuU2VsZWN0ZWRDYXJkSW5kZXhdLkhhc0J1dHRvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlSW52ZXN0KF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuSW52ZXN0O1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBjYW4gaW52ZXN0IG9uZSBtb3JlIHRpbWUgaW4gR29sZCBvciBzdG9ja3MgdGhpcyB0dXJuLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLk1haW5VSS5JbnRlcmFjdGlvbkJ1dHRvbk5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJBQ0NFUFRcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZVBheURheShfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIFBheURheSBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5QYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZURvdWJsZVBheURheShfaXNPd25lcixfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiWW91IGhhdmUgbGFuZGVkIG9uIERvdWJsZVBheURheSBzcGFjZS5cIix0cnVlKTtcclxuICAgICAgdGhpcy5Eb3VibGVQYXlEYXlGdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGFjZU9uZVF1ZXN0aW9uKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgaGF2ZSBsYW5kZWQgb24gT25lIFF1ZXN0aW9uIHNwYWNlLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uRnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGVCdXR0b25zKF9pc093bmVyLGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VTZWxsKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgdGhpcy5TcGFjZXNUeXBlPUVudW1TcGFjZVR5cGUuU2VsbDtcclxuICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIHNlbGwgYW55IG9uZSBvZiB5b3VyIGJ1c2luZXNzIG9yIGNhbiBza2lwIHR1cm4uXCIsdHJ1ZSk7XHJcbiAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIkFDQ0VQVFwiO1xyXG4gICAgICB0aGlzLlRvZ2dsZUJ1dHRvbnMoX2lzT3duZXIsdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwYWNlQnV5T3JTZWxsKF9pc093bmVyLF9pbmRleClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNwYWNlc1R5cGU9RW51bVNwYWNlVHlwZS5CdXlPclNlbGw7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJZb3UgY2FuIEJ1eSBvciBzZWxsIEdvbGQgb3Igc3RvY2tzIG9uZSBtb3JlIHRpbWUgaW4gdGhpcyB0dXJuLlwiLHRydWUpO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLkludGVyYWN0aW9uQnV0dG9uTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIkFDQ0VQVFwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcix0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgU3BhY2VHb0JhY2tTcGFjZXMoX2lzT3duZXIsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIllvdSBoYXZlIGxhbmRlZCBvbiBHbyBCYWNrIHNwYWNlLlwiLHRydWUpO1xyXG4gICAgICB0aGlzLkdvQmFja0Z1bmN0aW9uYWxpdHkoKTtcclxuXHJcbiAgICAgIHRoaXMuVG9nZ2xlQnV0dG9ucyhfaXNPd25lcixmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNob3dDYXJkSW5mbzpmdW5jdGlvbihtZXNzYWdlLF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgaWYoX3N0YXRlKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5NYWluVUkuVG9hc3ROb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuTWFpblVJLlRvYXN0TGFiZWwuc3RyaW5nPW1lc3NhZ2U7XHJcbiAgICAgIH1lbHNlXHJcbiAgICAgIHtcclxuICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3RMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgdGhpcy5NYWluVUkuVG9hc3ROb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0Q2FyZEluZm8oKVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNob3dDYXJkSW5mbyhcIlwiLGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlc2V0Q2FyZERpc3BsYXkoKTsgIFxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpOyAgIFxyXG5cclxuICAgICAgLy9mb3IgdGVzdGluZ1xyXG4gICAgICAvLyB0aGlzLkNvdW50ZXIrKztcclxuICAgICAgLy8gdGhpcy5HZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZCh0aGlzLkNvdW50ZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBDYXJkRnVudGlvbmFsaXR5QnV0dG9uKClcclxuICAgIHtcclxuICAgICAgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLkJpZ0J1c2luZXNzKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5CaWdCdXNpbmVzc0NhcmRGdW5jdGlvbmFsaXR5KHRoaXMuQ2FyZFNlbGVjdGVkKTtcclxuICAgICAgfWVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLkxvc3NlcylcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuTG9zc2VzQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLk1hcmtldGluZylcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLldpbGRDYXJkKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5XaWxkQ2FyZEZ1bmN0aW9uYWxpdHkodGhpcy5DYXJkU2VsZWN0ZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5TcGFjZXNUeXBlPT1FbnVtU3BhY2VUeXBlLlNlbGwpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLlNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuSW52ZXN0KVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLlNwYWNlc1R5cGU9PUVudW1TcGFjZVR5cGUuQnV5T3JTZWxsKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5CdXlPclNlbGxGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tMb2FuKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9MDtcclxuXHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB2YWw9LTE7XHJcbiAgICAgICAgdmFsPV9sb2FuVGFrZW49PXRydWU/MTowO1xyXG4gICAgICAgIHZhciBSZXN1bHQ9Y2MudjIodmFsLCBfYnVzaW5lc3NJbmRleClcclxuICAgICAgICByZXR1cm4gUmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBDb21wbGV0ZVR1cm5XaXRoVG9hc3QoX21zZyxfdGltZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX21zZyxfdGltZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICAgICAgIF9tYW5hZ2VyLlJlc2V0Q2FyZERpc3BsYXkoKTsgIFxyXG4gICAgICAgICBfbWFuYWdlci5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7ICAgXHJcbiAgICAgICAgIH0sIChfdGltZSsxMDApKTtcclxuICAgIH0sXHJcblxyXG4gICAgQmlnQnVzaW5lc3NDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9yZWNlaXZlIDIwMDAwJCBnaWZ0IHRvIHBheW9mZiBsb2FuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9yZXN1bHQ9dGhpcy5DaGVja0xvYW4oKTtcclxuICAgICAgICAgICAgIHZhciBJc0xvYW5UYWtlbj1fcmVzdWx0Lng7XHJcbiAgICAgICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXg9X3Jlc3VsdC55O1xyXG5cclxuICAgICAgICAgICAgIGlmKElzTG9hblRha2VuPT0xKSAvL21lYW5zIHVzZXIgaGFzIHRha2VuIGxvYW5cclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50LTIwMDAwO1xyXG4gICAgICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ8PTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiTG9hbiBhbW91bnQgb2YgJDIwMDAwIGhhcyBiZWVuIHBheWVkIG9mZi5cIiwxODAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbm90IHRha2VuIGFueSBsb2FuLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6IC8vaGlyZSBsYXd5ZXJcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGFscmVhZHkgaGlyZWQgbGF5d2VyLCB0dXJuIHdpbGwgc2tpcCBub3cuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkxhd3llclN0YXR1cz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI2XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjdcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOi8vZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXkgZGF5XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkJpZ0J1c2luZXNzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKHRydWUpO1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3Ugd2lsbCByZWNlaXZlIGRvdWJsZSBwcm9maXRzIG9uIG5leHQgcGF5ZGF5LlwiLDE4MDApO1xyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5CaWdCdXNpbmVzc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOi8vcm9sbCBkaWNlIHR3aWNlLCBpZiByZXN1bHQgaXMgPjE5IHRoZW4gdGFrZSBhbGwgbW9uZXkgaW5zaWRlIG1hcmtldGluZy5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBEaWNlMVJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgIHZhciBEaWNlMlJlc3VsdD1fbWFuYWdlci5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICB2YXIgRGljZTFSZXN1bHQ9MTI7XHJcbiAgICAgICAgICAgIC8vICB2YXIgRGljZTJSZXN1bHQ9MTI7XHJcblxyXG4gICAgICAgICAgICAgdmFyIFRvdGFsUmVzdWx0PURpY2UxUmVzdWx0K0RpY2UyUmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgIGlmKFRvdGFsUmVzdWx0Pj0xOSlcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBfYW1vdW50PV9hbW91bnQrX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9X2Ftb3VudDtcclxuICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIkRpY2UgMSBSZXN1bHQ6IFwiK0RpY2UxUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiK0RpY2UyUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIkFtb3VudCAkXCIrX2Ftb3VudCtcIiBoYXMgc3VjY2Vzc2Z1bGx5IGFkZGVkIGluIHlvdXIgY2FzaCBmcm9tIG1hcmtldGluZyBhbW91bnQgb24gdGFibGUuXCJcclxuICAgICAgICAgICAgICAgICAsNDAwMCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICB2YXIgX2FjdG9yc0FycmF5PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIDEgUmVzdWx0OiBcIitEaWNlMVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkRpY2UgMiBSZXN1bHQ6IFwiK0RpY2UyUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK1RvdGFsUmVzdWx0K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJZb3UgcmFuIG91dCBvZiBsdWNrLCB0dXJuIHdpbGwgc2tpcCBub3dcIlxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG4gICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTNcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQmlnQnVzaW5lc3NbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgTWFya2V0aW5nQ2FyZEZ1bmN0aW9uYWxpdHkoX2lkKVxyXG4gICAge1xyXG4gICAgICB2YXIgSW5kZXg9cGFyc2VJbnQoX2lkKTtcclxuICAgICAgSW5kZXg9SW5kZXgtMTtcclxuXHJcbiAgICAgICBzd2l0Y2ggKF9pZCkge1xyXG4gICAgICAgICBjYXNlIFwiMVwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQ9X21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2xvc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19sb3NlQW1vdW50LDIxMDApO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI0XCI6Ly9Zb3VyIE1hcmtldGluZyBBY2NvdW50IHRyaXBsZXMsIGJ1dCB5b3UgbXVzdCBsZWF2ZSBpdCBpbiB0aGUgYWNjb3VudC5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICB2YXIgX211bHRpcGxpZXI9MztcclxuICAgICAgICAgICAgIHZhciBfaW5jcmVhc2VBbW91bnQ9X21hbmFnZXIuTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcik7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2luY3JlYXNlQW1vdW50PjApXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIitfbWFya2V0QW1vdW50K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK19tYXJrZXRBbW91bnQrXCIgKiBcIitfbXVsdGlwbGllcitcIiA9IFwiK19pbmNyZWFzZUFtb3VudCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwieW91ciBtYXJrZXRpbmcgYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIHRvICRcIitfaW5jcmVhc2VBbW91bnRcclxuICAgICAgICAgICAgICAgICwzMTAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiOFwiOi8vbG9zZSBhbGwgeW91ciBtb25leSBpbiBtYXJrZXRpbmcgYWNjb3VudFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX2xvc2VBbW91bnQ9X21hbmFnZXIuTG9zZUFsbE1hcmtldGluZ01vbmV5KCk7XHJcblxyXG4gICAgICAgICAgICAgaWYoX2xvc2VBbW91bnQ+MClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGhhdmUgbG9zdCB5b3VyIG1hcmtldGluZyBhbW91bnQgb2YgJFwiK19sb3NlQW1vdW50LDIxMDApO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBhbnkgbWFya2V0aW5nIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI5XCI6Ly9sb3NlIGFsbCB5b3VyIG1vbmV5IGluIG1hcmtldGluZyBhY2NvdW50XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfbG9zZUFtb3VudD1fbWFuYWdlci5Mb3NlQWxsTWFya2V0aW5nTW9uZXkoKTtcclxuXHJcbiAgICAgICAgICAgICBpZihfbG9zZUFtb3VudD4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJZb3UgaGF2ZSBsb3N0IHlvdXIgbWFya2V0aW5nIGFtb3VudCBvZiAkXCIrX2xvc2VBbW91bnQsMjEwMCk7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBkb24ndCBoYXZlIGFueSBtYXJrZXRpbmcgYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6Ly9SZWNlaXZlIGFsbCBvZiB5b3VyIE1hcmtldGluZyBCdWRnZXQgYmFjaywgcGx1cyA3MDAlIHByb2ZpdC5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9tYXJrZXRBbW91bnQ9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICB2YXIgX3Byb2ZpdD03MDA7XHJcbiAgICAgICAgICAgICB2YXIgX2Ftb3VudD1fbWFuYWdlci5HZXRNYXJrZXRpbmdNb25leShfcHJvZml0KTtcclxuXHJcbiAgICAgICAgICAgICBpZihfYW1vdW50PjApXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIk1hcmtldGluZyBBbW91bnQ6ICRcIitfbWFya2V0QW1vdW50K1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiVG90YWw6IFwiK19tYXJrZXRBbW91bnQrXCIgKyAoXCIrX21hcmtldEFtb3VudCtcIipcIitfcHJvZml0K1wiICkvMTAwXCIrXCIgPSBcIitfYW1vdW50K1wiXFxuXCIrXCJcXG5cIitcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJ5b3VyIGNhc2ggYW1vdW50IGhhcyBiZWVuIHN1Y2Vzc2Z1bGx5IGluY3JlYXNlIGJ5ICRcIitfYW1vdW50K1wiLCB0b3RhbCBjYXNoIGJlY29tZXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaFxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTFcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1hcmtldGluZ1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5NYXJrZXRpbmdbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjovL2xvc2UgYWxsIHlvdXIgbW9uZXkgaW4gbWFya2V0aW5nIGFjY291bnRcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9sb3NlQW1vdW50PV9tYW5hZ2VyLkxvc2VBbGxNYXJrZXRpbmdNb25leSgpO1xyXG5cclxuICAgICAgICAgICAgIGlmKF9sb3NlQW1vdW50PjApXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSBoYXZlIGxvc3QgeW91ciBtYXJrZXRpbmcgYW1vdW50IG9mICRcIitfbG9zZUFtb3VudCwyMTAwKTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IGRvbid0IGhhdmUgYW55IG1hcmtldGluZyBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFya2V0aW5nW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIExvc3Nlc0NhcmRGdW5jdGlvbmFsaXR5KF9pZClcclxuICAgIHtcclxuICAgICAgdmFyIEluZGV4PXBhcnNlSW50KF9pZCk7XHJcbiAgICAgIEluZGV4PUluZGV4LTE7XHJcblxyXG4gICAgICAgc3dpdGNoIChfaWQpIHtcclxuICAgICAgICAgY2FzZSBcIjFcIjovL2xvc2UgbmV4dCB0dXJuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgbG9zZSB5b3VyIG5leHQgdHVybi5cIiwyMTAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOi8vbG9zZSBhbGwgeW91ciBidXNpbmVzcyBwcm9maXRzIG9uIG5leHQgUGF5IERheS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIF9tYW5hZ2VyLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSB3aWxsIGxvc2UgYWxsIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBuZXh0IFBheSBEYXkuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjZcIjovLyBJZiBCdXNpbmVzcyAjMSBpcyBIb21lIEJhc2VkLCBwYXkgYSAkNSwwMDAgSW5zdXJhbmNlIERlZHVjdGlibGU7IGlmIEJyaWNrICYgTW9ydGFyICQxMCwwMDAgZGVkdWN0aWJsZS5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgIHZhciBfYnVzaW5lc3NUeXBlPXBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZSk7XHJcbiAgICAgICAgICAgICBpZihfYnVzaW5lc3NUeXBlPT0xKSAvLyBmaXJzdCBidXNpbmVzcyB3YXMgaG9tZSBiYXNlZFxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD49NTAwMClcclxuICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLT01MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQ1MDAwIGluc3VyYW5jZSBvbiB5b3VyIGZpcnN0IGhvbWUgYmFzZWQgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoIGlzICRcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZSBpZiAoX2J1c2luZXNzVHlwZT09MikgLy9maXJzdCBidXNpb25lc3Mgd2FzIGJyaWNrICYgbW9ydGFyXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PTEwMDAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLT0xMDAwMDtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHBheWVkICQxMDAwMCBpbnN1cmFuY2Ugb24geW91ciBmaXJzdCBicmljayAmIG1vcnRhciBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggaXMgJFwiK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCwyMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIG1vbmV5LlwiLDE4MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCI3XCI6Ly9sb3NlIHlvdXIgbmV4dCBQYXkgRGF5IGZvciBhbGwgb2YgeW91ciBob21lLWJhc2VkIGJ1c2luZXNzZXMuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCh0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwieW91IHdpbGwgbG9zZSB5b3VyIG5leHQgUGF5IERheSBmb3IgYWxsIG9mIHlvdXIgaG9tZS1iYXNlZCBidXNpbmVzc2VzLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTJcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEzXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkxvc3Nlc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5Mb3NzZXNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTVcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9zc2VzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFdpbGRDYXJkRnVuY3Rpb25hbGl0eShfaWQpXHJcbiAgICB7XHJcbiAgICAgIHZhciBJbmRleD1wYXJzZUludChfaWQpO1xyXG4gICAgICBJbmRleD1JbmRleC0xO1xyXG5cclxuICAgICAgIHN3aXRjaCAoX2lkKSB7XHJcbiAgICAgICAgIGNhc2UgXCIxXCI6Ly9kb3VibGVzIHlvdXIgaW5jb21lIG9uIHRoZSBuZXh0IFBheSBEYXkuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybih0cnVlKTtcclxuICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVUdXJuV2l0aFRvYXN0KFwiWW91IHdpbGwgcmVjZWl2ZSBkb3VibGUgcHJvZml0cyBvbiBuZXh0IHBheWRheS5cIiwxODAwKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMlwiOi8vUm9sbCAxIGRpZSwgbXVsdGlwbHkgcmVzdWx0IGJ5ICQ1LDAwMCBhbmQgcmVjZWl2ZSB5b3VyIGFkdmFuY2UgZnJvbSB0aGUgQmFuay5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB2YXIgRGljZVJlc3VsdD1fbWFuYWdlci5Sb2xsT25lRGljZSgpO1xyXG4gICAgICAgICAgICAgdmFyIENhc2hNdWxpdHBsaWVyPTUwMDA7XHJcbiAgICAgICAgICAgICB2YXIgVG90YWxSZXN1bHQ9RGljZVJlc3VsdCpDYXNoTXVsaXRwbGllcjtcclxuXHJcbiAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grPVRvdGFsUmVzdWx0O1xyXG4gICAgICAgICAgICAgdGhpcy5Db21wbGV0ZVR1cm5XaXRoVG9hc3QoXCJEaWNlIFJlc3VsdDogXCIrRGljZVJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsOiBcIitEaWNlUmVzdWx0K1wiICogXCIrQ2FzaE11bGl0cGxpZXIrXCIgPSBcIitUb3RhbFJlc3VsdCtcIlxcblwiK1wiXFxuXCIrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiQW1vdW50ICRcIitUb3RhbFJlc3VsdCtcIiBoYXMgYmVlbiBhZGRlZCBpbnRvIHlvdXIgY2FzaC5cIlxyXG4gICAgICAgICAgICAgICAgLDQwMDApO1xyXG5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNVwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiNlwiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiN1wiOi8vcGF5IG9mZiB5b3VyIGxvYW4gZm9yIHlvdXIgQnJpY2sgJiBNb3J0YXIgQnVzaW5lc3MuIElmIHlvdSBoYXZlIG5vIGxvYW4gb3V0c3RhbmRpbmcsIHJlY2VpdmUgJDUwLDAwMC5cclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBfbG9hblJlc2V0PWZhbHNlO1xyXG4gICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90eXBlPXBhcnNlSW50KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoX3R5cGU9PTIgJiYgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYW5SZXNldD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihfbG9hblJlc2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdXIgb3V0c3RhbmRpbmcgbG9hbiBoYXMgYmVlbiBwYXllZCBvZmYuXCIsMjgwMCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCs9NTAwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcInlvdSBoYWQgbm8gbG9hbiwgYW1vdW50ICQ1MDAwMCBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2hcIiwyODAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjhcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjlcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEwXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxMVwiOi8vIHJlY2VpdmUgZG91YmxlIHlvdXIgYnVzaW5lc3MgcHJvZml0cyBvbiBhbGwgb2YgeW91ciBidXNpbmVzc2VzLlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgX21hbmFnZXIuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4odHJ1ZSk7XHJcbiAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlVHVybldpdGhUb2FzdChcIllvdSB3aWxsIHJlY2VpdmUgZG91YmxlIHByb2ZpdHMgb24gbmV4dCBwYXlkYXkuXCIsMTgwMCk7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjEyXCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgXCIxM1wiOlxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5XaWxkQ2FyZHNbSW5kZXhdLkRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuV2lsZENhcmRzW0luZGV4XS5EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBcIjE1XCI6XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLldpbGRDYXJkc1tJbmRleF0uRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBJbnZlc3RGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgUGF5RGF5RnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcblxyXG4gICAgfSxcclxuICAgIERvdWJsZVBheURheUZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvbkZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbiAgICBTZWxsRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyZEluZm8oXCJcIixmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NhcmRJbmZvKFwiXCIsZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIEdvQmFja0Z1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cz0gRGVja3NEYXRhO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72485pNAFJIIpZ225FqWNsJ', 'GameManager');
// Script/GameManager.js

"use strict";

//#region superclasses and enumerations
//-------------------------------------------enumeration for type of business-------------------------//
var EnumBusinessType = cc.Enum({
  None: 0,
  HomeBased: 1,
  //a business that you operate out of your home
  brickAndmortar: 2 //a store front business

}); //-------------------------------------------class for BusinessInfo-------------------------//

var BusinessInfo = cc.Class({
  name: "BusinessInfo",
  properties: {
    Name: "BusinessData",
    BusinessType: {
      displayName: "Mode",
      type: EnumBusinessType,
      "default": EnumBusinessType.None,
      serializable: true,
      tooltip: "Business catogory for players"
    },
    BusinessTypeDescription: {
      displayName: "Type",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Type (by name) of business player is opening"
    },
    BusinessName: {
      displayName: "Name",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Name of the business player is opening"
    },
    Amount: {
      displayName: "Amount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "balance of business"
    },
    IsPartnership: {
      displayName: "IsPartnership",
      "default": false,
      typw: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has done partnership with someone with current business"
    },
    PartnerID: {
      displayName: "PartnerID",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "ID of the partner with whom player has formed partnership"
    },
    LocationsName: {
      displayName: "LocationsName",
      type: [cc.Text],
      "default": [],
      serializable: true,
      tooltip: "if player owns brick and mortar he/she can expand to new location"
    },
    LoanTaken: {
      displayName: "LoanTaken",
      type: cc.Boolean,
      "default": false,
      serializable: true
    },
    LoanAmount: {
      displayName: "LoanAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for CardData-------------------------//

var CardDataFunctionality = cc.Class({
  name: "CardDataFunctionality",
  properties: {
    NextTurnDoublePay: {
      displayName: "NextTurnDoublePay",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if its going to be double pay day on next payday for current player"
    },
    SkipNextTurn: {
      displayName: "SkipNextTurn",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if turn is going to skipped on next turn for current player"
    },
    SkipNextPayday: {
      displayName: "SkipNextPayday",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if payday is going to skipped on next payday for current player"
    },
    SkipHMNextPayday: {
      displayName: "SkipHMNextPayday",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if payday for home based buisiness is going to skipped on next payday for current player"
    },
    SkipBMNextPayday: {
      displayName: "SkipBMNextPayday",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if payday for bricka and mmortar buisiness is going to skipped on next payday for current player"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for StockInfo-------------------------//

var StockInfo = cc.Class({
  name: "StockInfo",
  properties: {
    Name: "StockData",
    BusinessName: {
      displayName: "BusinessName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "name of the business in which stocks will be held"
    },
    ShareAmount: {
      displayName: "ShareAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true,
      tooltip: "Share amount of the stock"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for  Player Data-------------------------//

var PlayerData = cc.Class({
  name: "PlayerData",
  properties: {
    PlayerName: {
      displayName: "PlayerName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "name of the player"
    },
    PlayerUID: {
      displayName: "PlayerUID",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "ID of the player"
    },
    AvatarID: {
      displayName: "AvatarID",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "id reference for player avatar selection"
    },
    IsBot: {
      displayName: "IsBot",
      "default": false,
      typw: cc.Boolean,
      serializable: true,
      tooltip: "Check if current player is bot"
    },
    NoOfBusiness: {
      displayName: "Business",
      type: [BusinessInfo],
      "default": [],
      serializable: true,
      tooltip: "Number of business a player can own"
    },
    CardFunctionality: {
      displayName: "CardFunctionality",
      type: CardDataFunctionality,
      "default": {},
      serializable: true,
      tooltip: "card functionality stored by player"
    },
    HomeBasedAmount: {
      displayName: "HomeBasedAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true,
      tooltip: "number of home based business a player owns"
    },
    BrickAndMortarAmount: {
      displayName: "BrickAndMortarAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true,
      tooltip: "number of brick and mortar business a player owns"
    },
    TotalLocationsAmount: {
      displayName: "TotalLocationsAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true,
      tooltip: "number of locations of all brick and mortar businessess"
    },
    NoOfStocks: {
      displayName: "Stocks",
      type: [StockInfo],
      "default": [],
      serializable: true,
      tooltip: "Number of stock a player owns"
    },
    Cash: {
      displayName: "PlayerCash",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "Amount of cash player owns"
    },
    GoldCount: {
      displayName: "GoldCount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "count of gold a player owns"
    },
    StockCount: {
      displayName: "StockCount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "count of stocks a player owns"
    },
    LoanTaken: {
      displayName: "LoanTaken",
      "default": false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has taken loan from bank or not"
    },
    LoanAmount: {
      displayName: "LoanAmount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "Amount of loan taken from the bank"
    },
    MarketingAmount: {
      displayName: "MarketingAmount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "marketing amount a player owns"
    },
    LawyerStatus: {
      displayName: "LawyerStatus",
      "default": false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has hired a lawyer or not"
    },
    IsBankrupt: {
      displayName: "IsBankrupt",
      "default": false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has been Bankrupted or not"
    },
    SkippedLoanPayment: {
      displayName: "SkippedLoanPayment",
      "default": false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has skipped loan payment"
    },
    PlayerRollCounter: {
      displayName: "PlayerRollCounter",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "integer to store roll countor for player"
    },
    InitialCounterAssigned: {
      displayName: "InitialCounterAssigned",
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    isGameFinished: {
      displayName: "isGameFinished",
      type: cc.Boolean,
      "default": false,
      serializable: true
    },
    TotalScore: {
      displayName: "TotalScore",
      type: cc.Integer,
      "default": 0,
      serializable: true
    },
    GameOver: {
      displayName: "GameOver",
      type: cc.Boolean,
      "default": false,
      serializable: true
    }
  },
  ctor: function ctor() {//constructor
  }
}); //#endregion
//#region Game Manager Class
//-------------------------------------------(main class) class for Game Manager-------------------------//

var RollCounter = 0;
var DiceTemp = 0;
var DiceRoll = 0;
var IsTweening = false;
var GamePlayReferenceManager = null;
var TurnCheckArray = [];
var BusinessLocationNodes = [];
var PassedPayDay = false;
var DoublePayDay = false; //cards functionality

var _nextTurnDoublePay = false;
var _skipNextTurn = false;
var _skipNextPayday = false; //skip whole pay day

var _skipHMNextPayday = false; //skip pay day for home based businessess only

var _skipBMNextPayday = false; //skip pay day for brick & mortar businessess only

var CardEventReceived = false;
var TurnInProgress = false;
var isGameOver = false;
var GameManager = cc.Class({
  name: "GameManager",
  "extends": cc.Component,
  properties: {
    PlayerGameInfo: {
      "default": [],
      type: [PlayerData],
      serializable: true,
      tooltip: "all player's data"
    },
    PlayerNode: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for player"
    },
    CameraNode: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for camera"
    },
    AllPlayerUI: {
      "default": [],
      type: [cc.Node],
      serializable: true,
      tooltip: "Node reference of ui of all players"
    },
    AllPlayerNodes: {
      "default": [],
      type: [cc.Node],
      serializable: true,
      tooltip: "Node reference of node of all players inside gameplay"
    },
    StartLocationNodes: {
      "default": [],
      type: [cc.Node],
      serializable: true,
      tooltip: "Node reference of attay of locations"
    }
  },
  statics: {
    PlayerData: PlayerData,
    BusinessInfo: BusinessInfo,
    EnumBusinessType: EnumBusinessType,
    Instance: null
  },
  //#region All Functions of GameManager

  /**
  @summary called when instance of class is created
  @method onLoad
  @param {string} none
  @returns {boolean} no return
  **/
  onLoad: function onLoad() {
    GameManager.Instance = this;
    this.TurnNumber = 0;
    this.TurnCompleted = false;
    TurnCheckArray = [];
    this.CheckReferences();
    this.Init_GameManager();
    this.RandomCardIndex = 0;
    this.CardCounter = 0;
    this.CardDisplayed = false;
    CardEventReceived = false;
  },

  /**
  @summary called to assign reference of required classes
  @method CheckReferences
  @param {string} none
  @returns {boolean} no return
  **/
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },

  /**
  @summary initial gamemanager essetials
  @method Init_GameManager
  @param {string} none
  @returns {boolean} no return
  **/
  Init_GameManager: function Init_GameManager() {
    this.Camera = this.CameraNode.getComponent(cc.Camera);
    this.isCameraZooming = false;
    this.PlayerGameInfo = [];
    RollCounter = 0;
    DiceTemp = 0;
    DiceRoll = 0; //if joined player is spectate

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == true) {
      console.log("status of initial business setp: " + GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup")); //if inital setup has been done and game is under way

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup") == true) {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
        var AllData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("PlayerGameInfo");
        this.PlayerGameInfo = AllData;
        console.log(this.PlayerGameInfo);
        this.SyncDataToPlayerGameInfo(0);
        this.SyncAllData_SpectateManager();
        this.TurnNumber = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("TurnNumber");
        this.UpdateGameUI(true, this.TurnNumber);
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().InitialScreen_SpectateMode();
      }
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true);
    }
  },
  //#region public functions to get data (accessible from other classes)
  GetTurnNumber: function GetTurnNumber() {
    return this.TurnNumber;
  },
  //#endregion
  //#region SpectateMode Code
  SyncAllData_SpectateManager: function SyncAllData_SpectateManager() {
    this.AssignPlayerGameUI();

    for (var index = 0; index < this.PlayerGameInfo.length; index++) {
      var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.y);

      this.AllPlayerNodes[index].setPosition(_toPos.x, _toPos.y);
    }

    console.log("synced playernodes");

    for (var _index2 = 0; _index2 < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; _index2++) {
      this.AllPlayerNodes[_index2].active = true;
    }
  },
  CheckTurnOnSpectateLeave_SpectateManager: function CheckTurnOnSpectateLeave_SpectateManager() {
    var TotalConnectedPlayers = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorCount();

    if (TurnCheckArray.length == TotalConnectedPlayers) {
      TurnCheckArray = [];
      this.TurnCompleted = true;

      if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
        this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter;
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
        this.ChangeTurn();
        console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
        console.log("Change Turn is called by: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
      }
    }
  },
  //#endregion
  //#region functions related to Turn Mechanism and card mechanism

  /**
   @summary raised event on all connected clients to let others know a what card has been selected by player
   @method RaiseEventForCard
   @param {string} none
   @returns {boolean} no return
  **/
  RaiseEventForCard: function RaiseEventForCard(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(5, _data);
  },
  DisplayCardOnOthers: function DisplayCardOnOthers() {
    var _this = this;

    console.error(CardEventReceived);

    if (CardEventReceived == true) {
      console.error(this.CardCounter);
      CardEventReceived = false;

      if (!this.CardDisplayed) {
        this.CardDisplayed = true;
        GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.CardCounter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false, this.RandomCardIndex);
      }
    } else {
      setTimeout(function () {
        //check after every 0.5 seconds
        _this.DisplayCardOnOthers();
      }, 500);
    }
  },
  ResetCardDisplay: function ResetCardDisplay() {
    this.CardDisplayed = false;
  },
  ReceiveEventForCard: function ReceiveEventForCard(_data) {
    this.CheckReferences();
    console.log(_data);
    var RandomCard = _data.randomCard;
    var counter = _data.counter;
    this.RandomCardIndex = RandomCard;
    this.CardCounter = counter;
    console.error(CardEventReceived);

    if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
      GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(true, RandomCard);
    } else {
      CardEventReceived = true; // if(IsTweening==false && this.CardDisplayed==false)
      // {
      //     GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false,RandomCard);
      //     this.CardDisplayed=true;
      // }
    }

    console.error(CardEventReceived);
  },

  /**
   @summary raised event on all connected clients to let others know a particular player has complete their move
   @method RaiseEventTurnComplete
   @param {string} none
   @returns {boolean} no return
  **/
  RaiseEventTurnComplete: function RaiseEventTurnComplete() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(4, GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID);
    }
  },
  SyncAllData: function SyncAllData() {
    if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
    }
  },

  /**
    @summary called on all players to validate if move is completed on all connected clients
    @method ReceiveEventTurnComplete
    @param {string} none
    @returns {boolean} no return
   **/
  ReceiveEventTurnComplete: function ReceiveEventTurnComplete(_uid) {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
      console.log(TurnCheckArray.length);
      if (TurnCheckArray.length == 0) TurnCheckArray.push(_uid);
      var ArrayLength = TurnCheckArray.length;
      var IDFound = false;

      for (var index = 0; index < ArrayLength; index++) {
        if (TurnCheckArray[index] == _uid) IDFound = true;
      }

      if (!IDFound) {
        TurnCheckArray.push(_uid);
      }

      console.log(TurnCheckArray);
      console.log(TurnCheckArray.length); // var TotalConnectedPlayers=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorCount();

      var TotalConnectedPlayers = this.PlayerGameInfo.length;

      if (TurnCheckArray.length == TotalConnectedPlayers) {
        TurnCheckArray = [];
        this.TurnCompleted = true;

        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter; //this.SyncAllData();

          this.ChangeTurn();
          console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
          console.log("Change Turn is called by: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
        }
      }
    }
  },

  /**
   @summary called when dice animation is played on all players
   @method ChangeTurn
   @param {string} none
   @returns {boolean} no return
  **/
  ChangeTurn: function ChangeTurn() {
    this.SyncAllData();
    if (this.TurnNumber < this.PlayerGameInfo.length - 1) this.TurnNumber = this.TurnNumber + 1;else this.TurnNumber = 0;
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(2, this.TurnNumber);
  },

  /**
  @summary called from raise on event (from function "StartTurn" and "ChangeTurn" of this same class) to handle turn
  @method TurnHandler
  @param {string} none
  @returns {boolean} no return
  **/
  TurnHandler: function TurnHandler(_turn) {
    var _this2 = this;

    var _playerMatched = false;
    _skipNextTurn = false;

    if (IsTweening) //check if animation of turn being played on other players 
      {
        setTimeout(function () {
          _this2.TurnHandler(_turn);
        }, 800);
      } else {
      this.TurnNumber = _turn;

      if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
        this.ToggleTurnProgress(true);
        _playerMatched = true;
        _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;

        if (!_skipNextTurn) {
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
          }, 1000);
          console.log("its your turn " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
        }
      } else {
        this.ToggleTurnProgress(false);
      }

      this.UpdateGameUI(true, this.TurnNumber);
      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber", this.TurnNumber, true);
      console.log("Turn Of: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
      console.log(this.AllPlayerUI[this.TurnNumber].getComponent('PlayerProfileManager').PlayerInfo);
      console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
      console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors());
      this.SyncDataToPlayerGameInfo(0); //force sync spectator after completion of each turn

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) this.SyncAllData_SpectateManager(); //skip this turn as skip turn has been called before

      if (_playerMatched && _skipNextTurn) {
        IsTweening = false;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping current turn", 1200);
        this.ToggleSkipNextTurn(false);
        this.ChangeTurn();
        this.ToggleTurnProgress(false);
      }

      if (_playerMatched && this.PlayerGameInfo[this.TurnNumber].isGameFinished) {
        IsTweening = false;
        this.ChangeTurn();
        this.ToggleTurnProgress(false);
      }
    }
  },
  SyncDataToPlayerGameInfo: function SyncDataToPlayerGameInfo(_ind) {
    var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
    var MyData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
    var _counter = _ind;
    console.log(this.PlayerGameInfo[_counter].PlayerUID);
    console.log(MyData.customProperties.PlayerSessionData.PlayerUID);

    if (this.PlayerGameInfo[_counter].PlayerUID != MyData.customProperties.PlayerSessionData.PlayerUID) //dont update my own data
      {
        for (var index = 0; index < MainSessionData.length; index++) {
          if (this.PlayerGameInfo[_counter].PlayerUID == MainSessionData[index].customProperties.PlayerSessionData.PlayerUID) {
            this.PlayerGameInfo[_counter] = MainSessionData[index].customProperties.PlayerSessionData;

            if (_counter < this.PlayerGameInfo.length - 1) {
              _counter++;
              console.log("adding counter: " + _counter);
              this.SyncDataToPlayerGameInfo(_counter);
            } else {
              console.log(this.PlayerGameInfo);
            }
          }
        }
      } else {
      if (_counter < this.PlayerGameInfo.length - 1) {
        _counter++;
        console.log("adding counter: " + _counter);
        this.SyncDataToPlayerGameInfo(_counter);
      } else {
        console.log(this.PlayerGameInfo);
      }
    }
  },

  /**
  @summary called when all players have done their initial setup and first turn starts
  @method StartTurn
  @param {string} none
  @returns {boolean} no return
  **/
  StartTurn: function StartTurn() {
    this.AssignPlayerGameUI();
    this.EnablePlayerNodes();
    this.TurnNumber = 0; //reseting the turn number on start of the game
    //sending initial turn number over the network to start turn simultanously on all connected player's devices

    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(2, this.TurnNumber);
  },
  //#endregion
  //#region Function for gameplay

  /**
  @summary called to assign player UI (name/icons/number of players that to be active etc)
  @method AssignPlayerGameUI
  @param {string} none
  @returns {boolean} no return
  **/
  AssignPlayerGameUI: function AssignPlayerGameUI() {
    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
      this.AllPlayerUI[index].active = true;
      this.AllPlayerUI[index].getComponent('PlayerProfileManager').PlayerInfo = this.PlayerGameInfo[index];
      this.AllPlayerUI[index].getComponent('PlayerProfileManager').SetName(this.PlayerGameInfo[index].PlayerName);
    }
  },
  UpdateGameUI: function UpdateGameUI(_toggleHighlight, _index) {
    if (_toggleHighlight) {
      this.AllPlayerUI[_index].getComponent('PlayerProfileManager').PlayerInfo = this.PlayerGameInfo[_index];

      for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
        if (_index == index) {
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleBGHighlighter(true);
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleTextighlighter(true);
        } else {
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleBGHighlighter(false);
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleTextighlighter(false);
        }
      }
    }
  },

  /**
  @summary called to enbale respective players nodes inside gamaplay
  @method EnablePlayerNodes
  @param {string} none
  @returns {boolean} no return
  **/
  EnablePlayerNodes: function EnablePlayerNodes() {
    for (var index = 0; index < this.PlayerGameInfo.length; index++) {
      if (this.PlayerGameInfo[index].HomeBasedAmount == 1) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[0].position.x, this.StartLocationNodes[0].position.y);else if (this.PlayerGameInfo[index].BrickAndMortarAmount == 1) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[1].position.x, this.StartLocationNodes[1].position.y);
    }

    for (var _index3 = 0; _index3 < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; _index3++) {
      this.AllPlayerNodes[_index3].active = true;
    }
  },
  SetFollowCameraProperties: function SetFollowCameraProperties() {
    var targetPos = this.AllPlayerNodes[this.TurnNumber].convertToWorldSpaceAR(cc.Vec2(0, 120));
    this.CameraNode.position = this.CameraNode.parent.convertToNodeSpaceAR(targetPos);
    var ratio = targetPos.y / cc.winSize.height;
    this.Camera.zoomRatio = 2;
  },
  lateUpdate: function lateUpdate() {
    if (this.isCameraZooming) this.SetFollowCameraProperties();
  },
  syncDiceRoll: function syncDiceRoll(_roll) {
    IsTweening = true;
    this.CardDisplayed = false;

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray().length; index++) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.Data.userID == this.PlayerGameInfo[this.TurnNumber].PlayerUID) {
        console.log("player matched:" + this.PlayerGameInfo[this.TurnNumber].PlayerName);
        this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.PlayerSessionData.PlayerRollCounter;
      }
    }

    if (this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter == 0 && !this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned) {
      if (this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[0].BusinessType == 1) {
        RollCounter = 0;
        this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned = true;
        console.error(RollCounter);
      } else {
        this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned = true;
        RollCounter = 13;
        console.error(RollCounter);
      }
    } else {
      if (this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter == 12) this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter + 21;else this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter + 1;
      RollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter;
      console.error(RollCounter - 1);
    }

    DiceRoll = _roll;
    DiceTemp = 0;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(DiceRoll);
    var targetPos = this.AllPlayerNodes[this.TurnNumber].convertToWorldSpaceAR(cc.Vec2(0, 120));

    var _pos = this.CameraNode.parent.convertToNodeSpaceAR(targetPos);

    this.TweenCamera(_pos, true, 0.4);
  },
  TempCheckSpace: function TempCheckSpace(_rolling) {
    var tempcounter = 0;
    var tempcounter2 = 0;

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray().length; index++) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.Data.userID == this.PlayerGameInfo[this.TurnNumber].PlayerUID) {
        //console.log("player matched:"+this.PlayerGameInfo[this.TurnNumber].PlayerName);
        tempcounter2 = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.PlayerSessionData.PlayerRollCounter;
      }
    } // console.error(tempcounter2+" "+_roll);
    // if((tempcounter2+_roll)<33)
    // {
    //     if(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[0].BusinessType==1)
    //     {
    //         tempcounter=0+_roll-1;
    //         console.error(tempcounter);
    //     }
    //     else
    //     {
    //         tempcounter=13+_roll-1;
    //         console.error(tempcounter);
    //     }
    // }
    // else
    // {
    //     console.error(tempcounter2+" "+_roll);
    //     tempcounter=tempcounter2+_roll;
    // }


    if (tempcounter2 - 1 < 0) {
      console.error("starting from oblivion");
      tempcounter = tempcounter2 + _rolling - 1;
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);
      console.error("to be: " + dicetobe);
    } else {
      tempcounter = tempcounter2 + _rolling;
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);
      console.error("to be: " + dicetobe);
    }
  },
  RollDice: function RollDice() {
    var Dice1 = this.getRandom(1, 7);
    var Dice2 = this.getRandom(1, 7); // var Dice1=this.getRandom(8,25);
    // var Dice2=this.getRandom(8,25);

    DiceRoll = Dice1 + Dice2; //DiceRoll=23;
    //this.TempCheckSpace(DiceRoll);

    console.log("dice number: " + DiceRoll);
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(3, DiceRoll);
  },
  RollOneDice: function RollOneDice() {
    var Dice1 = this.getRandom(1, 7);
    return Dice1;
  },
  RollTwoDices: function RollTwoDices() {
    var Dice1 = this.getRandom(1, 7);
    var Dice2 = this.getRandom(1, 7);
    return Dice1 + Dice2;
  },
  callUponCard: function callUponCard() {
    var _spaceID = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);

    if (_spaceID != 6 && _spaceID != 7) //6 means payday and 7 means double payday, 9 menas sell space
      {
        var RandomCard = this.getRandom(0, 15); //for testing only

        if (_spaceID == 2) //landed on some big buseinss
          {
            var valueIndex = [0, 1, 7, 10];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index];
          } else if (_spaceID == 5) //landed on some losses cards
          {
            var valueIndex = [0, 5, 6, 2];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index];
          } else if (_spaceID == 3) //landed on some marketing cards
          {
            var valueIndex = [0, 7, 3, 8, 13, 9];
            var index = this.getRandom(0, 6);
            RandomCard = valueIndex[index];
          } else if (_spaceID == 1) //landed on some marketing cards
          {
            var valueIndex = [0, 1, 6, 10];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index];
          }

        IsTweening = false;

        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          var SendingData = {
            "randomCard": RandomCard,
            "counter": RollCounter
          };
          this.RaiseEventForCard(SendingData);
        } else {
          this.DisplayCardOnOthers();
        }
      } else {
      IsTweening = false;
      console.log("landed on pay day or double pay day and work is done so changing turn");
      this.RaiseEventTurnComplete();
    }
  },
  completeCardTurn: function completeCardTurn() {
    IsTweening = false;
    console.log("landed on pay day or double pay day and work is done so changing turn");
    this.RaiseEventTurnComplete();
  },
  CallGameComplete: function CallGameComplete() {
    if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
      var _playerIndex = this.TurnNumber;

      if (this.PlayerGameInfo[_playerIndex].isGameFinished == false) {
        this.PlayerGameInfo[_playerIndex].isGameFinished = true;
        var _cash = this.PlayerGameInfo[this.TurnNumber].Cash;

        var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

        var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

        var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

        var loanAmount = 0;

        for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
          if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
            loanAmount += GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount;
          }
        }

        var BMCash = (BMAmount + BMLocations) * 150000;
        var HMCash = 0;
        if (HMAmount == 1) HMCash = 60000;else if (HMAmount == 2) HMCash = 25000 + 60000;else if (HMAmount == 3) HMCash = 25000 + 25000 + 60000;
        var TotalAssets = _cash + BMCash + HMCash - loanAmount;
        this.PlayerGameInfo[this.TurnNumber].TotalScore = TotalAssets;
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
      }
    }
  },
  RaiseEventForGameComplete: function RaiseEventForGameComplete(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(6, _data);
  },
  SyncGameOver: function SyncGameOver(_UID) {
    var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
    var MyData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
    console.log(_UID);
    console.log(MyData.customProperties.PlayerSessionData.PlayerUID);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData.GameOver = true;

    if (MyData.customProperties.PlayerSessionData.PlayerUID == _UID) {
      //you won
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' + "Congrats! your cash is highest, you have won the game." + "\n" + '\n' + "\n" + "Game will be restarted automatcally after 15 seconds", 15000);
    } else {
      //you lose
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' + "unfortunately you have lost the game." + "\n" + '\n' + "\n" + "Game will be restarted automatcally after 15 seconds", 15000);
    }

    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
    }, 15060);
  },
  StartDiceRoll: function StartDiceRoll() {
    if (RollCounter >= GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
      console.log("Gameover");
      isGameOver = true;
      this.ZoomCameraOut();

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        this.CallGameComplete();
        var playercompleted = 0;
        var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();

        for (var index = 0; index < MainSessionData.length; index++) {
          if (MainSessionData[index].customProperties.PlayerSessionData.isGameFinished) {
            playercompleted++;
          }
        }

        if (playercompleted == this.PlayerGameInfo.length) {
          var max = 0;
          var SelectedInd = 0;
          var SessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();

          for (var _index4 = 0; _index4 < SessionData.length; _index4++) {
            var _value = SessionData[_index4].customProperties.PlayerSessionData.TotalScore;

            if (_value > max) {
              SelectedInd = _index4;
              max = _value;
            }
          }

          console.log("game won by player id: " + SessionData[SelectedInd].customProperties.PlayerSessionData.PlayerUID);
          this.RaiseEventForGameComplete(SessionData[SelectedInd].customProperties.PlayerSessionData.PlayerUID); //game completed on all systems
        } else {
          IsTweening = false;
          this.ChangeTurn();
        }
      }
    } else {
      DiceTemp = DiceTemp + 1;

      var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);

      this.TweenPlayer(this.AllPlayerNodes[this.TurnNumber], _toPos);
    }
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },
  TweenCamera: function TweenCamera(_pos, isZoom, time) {
    var _this3 = this;

    cc.tween(this.CameraNode).to(time, {
      position: cc.v2(_pos.x, _pos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (isZoom) _this3.ZoomCameraIn();else _this3.ZoomCameraOut();
    }).start();
  },
  ZoomCameraIn: function ZoomCameraIn() {
    var _this4 = this;

    setTimeout(function () {
      if (_this4.Camera.zoomRatio < 2) {
        _this4.Camera.zoomRatio = _this4.Camera.zoomRatio + 0.03;

        _this4.ZoomCameraIn();
      } else {
        _this4.Camera.zoomRatio = 2;
        _this4.isCameraZooming = true;

        _this4.StartDiceRoll();
      }
    }, 10);
  },
  CheckPayDayConditions: function CheckPayDayConditions() {
    if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
    if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) DoublePayDay = true;
    _nextTurnDoublePay = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnDoublePay;

    if (PassedPayDay && !DoublePayDay && !_nextTurnDoublePay) {
      this.ToggleDoublePayNextTurn(false);
      this.TogglePayDay(false, false);
      this.ProcessPayDay_TurnDecision(false);
    } else if (DoublePayDay || PassedPayDay && _nextTurnDoublePay) {
      this.ToggleDoublePayNextTurn(false);
      this.TogglePayDay(false, false);
      this.ProcessPayDay_TurnDecision(true);
    } else {
      this.callUponCard();
    }
  },
  ZoomCameraOut: function ZoomCameraOut() {
    var _this5 = this;

    setTimeout(function () {
      if (_this5.Camera.zoomRatio >= 1) {
        _this5.isCameraZooming = false;
        _this5.Camera.zoomRatio = _this5.Camera.zoomRatio - 0.03;

        _this5.ZoomCameraOut();
      } else {
        _this5.CameraNode.position = cc.Vec2(0, 0);
        _this5.Camera.zoomRatio = 1;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(0);

        if (!isGameOver) {
          if (_this5.PlayerGameInfo[_this5.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) _this5.CheckPayDayConditions();else _this5.callUponCard();
        }
      }
    }, 10);
  },
  TweenPlayer: function TweenPlayer(Node, ToPos) {
    var _this6 = this;

    cc.tween(Node).to(0.4, {
      position: cc.v2(ToPos.x, ToPos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (DiceTemp < DiceRoll) {
        if (!isGameOver) {
          if (_this6.PlayerGameInfo[_this6.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
            if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
          }
        }

        if (RollCounter == 12) RollCounter = RollCounter + 21;else RollCounter = RollCounter + 1; //DiceTemp=DiceTemp+1; 

        console.log(DiceTemp + " " + RollCounter);

        _this6.StartDiceRoll(); //this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=RollCounter;

      } else {
        var _newpos = cc.Vec2(0, 0);

        _this6.TweenCamera(_newpos, false, 0.6); //zoomout

      }
    }).start();
  },
  //rules implmentation during turn (turn decisions)
  TogglePayDay: function TogglePayDay(_st1, _St2) {
    PassedPayDay = _st1;
    DoublePayDay = _St2;
  },
  ExpandBusiness_TurnDecision: function ExpandBusiness_TurnDecision(amount, _index, _locationName) {
    if (this.PlayerGameInfo[this.TurnNumber].Cash >= amount) {
      this.PlayerGameInfo[this.TurnNumber].Cash = this.PlayerGameInfo[this.TurnNumber].Cash - amount;
      this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount = this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount + 1;

      this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[_index].LocationsName.push(_locationName);

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully expanded your business.", 1000);
      setTimeout(function () {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().OnExpandButtonExitClicked_TurnDecision();
      }, 1200);
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash to expand this business, cash needed $ " + amount);
    }
  },
  GenerateExpandBusiness_Prefabs_TurnDecision: function GenerateExpandBusiness_Prefabs_TurnDecision() {
    BusinessLocationNodes = [];
    console.log(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness);

    for (var i = 0; i < this.PlayerGameInfo[this.TurnNumber].NoOfBusiness.length; i++) {
      if (parseInt(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessType) == 2) //this means there is brick and mortar in list
        {
          var node = cc.instantiate(GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessPrefab);
          node.parent = GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessScrollContent;
          node.getComponent('ExpandBusinessHandler').SetBusinessIndex(i);
          node.getComponent('ExpandBusinessHandler').SetName(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessName);
          node.getComponent('ExpandBusinessHandler').ResetEditBox();
          BusinessLocationNodes.push(node);
        }
    }

    console.log(BusinessLocationNodes);
    return BusinessLocationNodes.length;
  },
  DestroyGeneratedNodes: function DestroyGeneratedNodes() {
    for (var index = 0; index < BusinessLocationNodes.length; index++) {
      BusinessLocationNodes[index].destroy();
    }

    BusinessLocationNodes = [];
  },
  UpdateStocks_TurnDecision: function UpdateStocks_TurnDecision(_name, _ShareAmount, _isAdding) {
    if (_isAdding) {
      var _stock = new StockInfo();

      _stock.BusinessName = _name;
      _stock.ShareAmount = _ShareAmount;
      this.PlayerGameInfo[this.TurnNumber].NoOfStocks.push(_stock);
    }
  },
  ProcessPayDay_TurnDecision: function ProcessPayDay_TurnDecision(_isDoublePayDay) {
    var _this7 = this;

    if (_isDoublePayDay === void 0) {
      _isDoublePayDay = false;
    }

    _skipNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextPayday;
    _skipHMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipHMNextPayday;
    _skipBMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipBMNextPayday;

    if (_skipNextPayday) //if previously skip payday was stored by any card
      {
        this.ToggleSkipPayDay_Whole(false);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping PayDay.", 1600);
        setTimeout(function () {
          _this7.callUponCard();
        }, 1650);
      } else {
      var _title = "";
      if (_isDoublePayDay) _title = "DoublePayDay";else _title = "PayDay";
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, _isDoublePayDay, _skipHMNextPayday, _skipBMNextPayday);
    }
  },
  //#endregion
  //#region Cards Rules
  ToggleDoublePayNextTurn: function ToggleDoublePayNextTurn(_state) {
    _nextTurnDoublePay = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnDoublePay = _nextTurnDoublePay;
  },
  ToggleSkipNextTurn: function ToggleSkipNextTurn(_state) {
    _skipNextTurn = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn = _skipNextTurn;
  },
  ToggleSkipPayDay_Whole: function ToggleSkipPayDay_Whole(_state) {
    _skipNextPayday = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextPayday = _skipNextPayday;
  },
  ToggleSkipPayDay_HomeBased: function ToggleSkipPayDay_HomeBased(_state) {
    _skipHMNextPayday = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipHMNextPayday = _skipHMNextPayday;
  },
  ToggleSkipPayDay_BrickAndMortar: function ToggleSkipPayDay_BrickAndMortar(_state) {
    _skipBMNextPayday = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipBMNextPayday = _skipBMNextPayday;
  },
  ToggleTurnProgress: function ToggleTurnProgress(_state) {
    TurnInProgress = _state;
  },
  ReturnTurnProgress: function ReturnTurnProgress() {
    return TurnInProgress;
  },
  LoseAllMarketingMoney: function LoseAllMarketingMoney() {
    var _loseAmount = -1;

    if (this.PlayerGameInfo[this.TurnNumber].MarketingAmount > 0) {
      _loseAmount = this.PlayerGameInfo[this.TurnNumber].MarketingAmount;
      this.PlayerGameInfo[this.TurnNumber].MarketingAmount = 0;
    } else {
      _loseAmount = 0;
    }

    return _loseAmount;
  },
  MultiplyMarketingMoney: function MultiplyMarketingMoney(_multiplier) {
    var _amountIncreased = -1;

    if (this.PlayerGameInfo[this.TurnNumber].MarketingAmount > 0) {
      _amountIncreased = this.PlayerGameInfo[this.TurnNumber].MarketingAmount *= _multiplier;
    } else {
      _amountIncreased = 0;
    }

    return _amountIncreased;
  },
  GetMarketingMoney: function GetMarketingMoney(_profit) {
    var _amount = -1;

    if (this.PlayerGameInfo[this.TurnNumber].MarketingAmount > 0) {
      _profit = _profit / 100;
      _amount = this.PlayerGameInfo[this.TurnNumber].MarketingAmount *= _profit;
      this.PlayerGameInfo[this.TurnNumber].MarketingAmount = 0;
      this.PlayerGameInfo[this.TurnNumber].Cash += _amount;
    } else {
      _amount = 0;
    }

    return _amount;
  } //#endregion
  //#endregion

}); //module.exports  = PlayerData; //when imports in another script only reference of playerdata class would be able to accessed from Gamemanager import

module.exports = GameManager; //#endregion

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiY3RvciIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIk5leHRUdXJuRG91YmxlUGF5IiwiU2tpcE5leHRUdXJuIiwiU2tpcE5leHRQYXlkYXkiLCJTa2lwSE1OZXh0UGF5ZGF5IiwiU2tpcEJNTmV4dFBheWRheSIsIlN0b2NrSW5mbyIsIlNoYXJlQW1vdW50IiwiUGxheWVyRGF0YSIsIlBsYXllck5hbWUiLCJQbGF5ZXJVSUQiLCJBdmF0YXJJRCIsIklzQm90IiwiTm9PZkJ1c2luZXNzIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJIb21lQmFzZWRBbW91bnQiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiTm9PZlN0b2NrcyIsIkNhc2giLCJHb2xkQ291bnQiLCJTdG9ja0NvdW50IiwiTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyU3RhdHVzIiwiSXNCYW5rcnVwdCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBsYXllclJvbGxDb3VudGVyIiwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZCIsImlzR2FtZUZpbmlzaGVkIiwiVG90YWxTY29yZSIsIkdhbWVPdmVyIiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiaXNHYW1lT3ZlciIsIkdhbWVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiUGxheWVyR2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwic3RhdGljcyIsIkluc3RhbmNlIiwib25Mb2FkIiwiVHVybk51bWJlciIsIlR1cm5Db21wbGV0ZWQiLCJDaGVja1JlZmVyZW5jZXMiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDaGVja1NwZWN0YXRlIiwiY29uc29sZSIsImxvZyIsImdldFBob3RvblJlZiIsIm15Um9vbSIsImdldEN1c3RvbVByb3BlcnR5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiQWxsRGF0YSIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlciIsIlVwZGF0ZUdhbWVVSSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiR2V0VHVybk51bWJlciIsIkFzc2lnblBsYXllckdhbWVVSSIsImluZGV4IiwibGVuZ3RoIiwiX3RvUG9zIiwiVmVjMiIsIkdldF9TcGFjZU1hbmFnZXIiLCJEYXRhIiwiUmVmZXJlbmNlTG9jYXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwic2V0UG9zaXRpb24iLCJNYXhQbGF5ZXJzIiwiYWN0aXZlIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIlRvdGFsQ29ubmVjdGVkUGxheWVycyIsIm15Um9vbUFjdG9yQ291bnQiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJ1c2VySUQiLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNoYW5nZVR1cm4iLCJSYWlzZUV2ZW50Rm9yQ2FyZCIsIl9kYXRhIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJSYWlzZUV2ZW50IiwiRGlzcGxheUNhcmRPbk90aGVycyIsImVycm9yIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiX3VpZCIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJUdXJuSGFuZGxlciIsIl90dXJuIiwiX3BsYXllck1hdGNoZWQiLCJUb2dnbGVUdXJuUHJvZ3Jlc3MiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJSZXNldFR1cm5WYXJpYWJsZSIsIlBsYXllckluZm8iLCJSb29tQWN0b3JzIiwiU2hvd1RvYXN0IiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiX2luZCIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJTdGFydFR1cm4iLCJFbmFibGVQbGF5ZXJOb2RlcyIsIlNldE5hbWUiLCJfdG9nZ2xlSGlnaGxpZ2h0IiwiX2luZGV4IiwiVG9nZ2xlQkdIaWdobGlnaHRlciIsIlRvZ2dsZVRleHRpZ2hsaWdodGVyIiwiU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcyIsInRhcmdldFBvcyIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInBhcmVudCIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwicmF0aW8iLCJ3aW5TaXplIiwiaGVpZ2h0Iiwiem9vbVJhdGlvIiwibGF0ZVVwZGF0ZSIsInN5bmNEaWNlUm9sbCIsIl9yb2xsIiwibXlSb29tQWN0b3JzQXJyYXkiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIlJvbGxEaWNlIiwiRGljZTEiLCJnZXRSYW5kb20iLCJEaWNlMiIsIlJvbGxPbmVEaWNlIiwiUm9sbFR3b0RpY2VzIiwiY2FsbFVwb25DYXJkIiwiX3NwYWNlSUQiLCJ2YWx1ZUluZGV4IiwiU2VuZGluZ0RhdGEiLCJjb21wbGV0ZUNhcmRUdXJuIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9wbGF5ZXJJbmRleCIsIl9jYXNoIiwiSE1BbW91bnQiLCJHZXRfR2FtZU1hbmFnZXIiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwibG9hbkFtb3VudCIsIkJNQ2FzaCIsIkhNQ2FzaCIsIlRvdGFsQXNzZXRzIiwiUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZSIsIlN5bmNHYW1lT3ZlciIsIl9VSUQiLCJSZXN0YXJ0R2FtZSIsIlN0YXJ0RGljZVJvbGwiLCJab29tQ2FtZXJhT3V0IiwicGxheWVyY29tcGxldGVkIiwibWF4IiwiU2VsZWN0ZWRJbmQiLCJTZXNzaW9uRGF0YSIsIl92YWx1ZSIsIlR3ZWVuUGxheWVyIiwibWluIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNab29tIiwidGltZSIsInR3ZWVuIiwidG8iLCJ2MiIsImVhc2luZyIsImNhbGwiLCJab29tQ2FtZXJhSW4iLCJzdGFydCIsIkNoZWNrUGF5RGF5Q29uZGl0aW9ucyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiVG9nZ2xlUGF5RGF5IiwiUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24iLCJUb1BvcyIsIl9uZXdwb3MiLCJfc3QxIiwiX1N0MiIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJpIiwibm9kZSIsImluc3RhbnRpYXRlIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiU2V0QnVzaW5lc3NJbmRleCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiX3RpdGxlIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfc3RhdGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJSZXR1cm5UdXJuUHJvZ3Jlc3MiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbG9zZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfbXVsdGlwbGllciIsIl9hbW91bnRJbmNyZWFzZWQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJfYW1vdW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsSUFBSUEsZ0JBQWdCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUMsQ0FEc0I7QUFFM0JDLEVBQUFBLFNBQVMsRUFBRSxDQUZnQjtBQUVLO0FBQ2hDQyxFQUFBQSxjQUFjLEVBQUUsQ0FIVyxDQUdLOztBQUhMLENBQVIsQ0FBdkIsRUFNQTs7QUFDQSxJQUFJQyxZQUFZLEdBQUdMLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsY0FEa0I7QUFFNUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUUsY0FERTtBQUVSQyxJQUFBQSxZQUFZLEVBQ2I7QUFDSUMsTUFBQUEsV0FBVyxFQUFDLE1BRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRWIsZ0JBRlY7QUFHSSxpQkFBU0EsZ0JBQWdCLENBQUNHLElBSDlCO0FBSUlXLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQUhTO0FBU1JDLElBQUFBLHVCQUF1QixFQUN4QjtBQUNJSixNQUFBQSxXQUFXLEVBQUUsTUFEakI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FWUztBQWdCUkcsSUFBQUEsWUFBWSxFQUNiO0FBQ0lOLE1BQUFBLFdBQVcsRUFBRSxNQURqQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmI7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7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RUEwbkNyQjtBQUNJLFFBQUlDLE9BQU8sR0FBQyxDQUFDLENBQWI7O0FBQ0EsUUFBRyxLQUFLek4sY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3RDLGVBQXJDLEdBQXFELENBQXhELEVBQ0E7QUFDSW9QLE1BQUFBLE9BQU8sR0FBRUEsT0FBTyxHQUFDLEdBQWpCO0FBQ0FDLE1BQUFBLE9BQU8sR0FBQyxLQUFLek4sY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3RDLGVBQXJDLElBQXNEb1AsT0FBOUQ7QUFDQSxXQUFLeE4sY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3RDLGVBQXJDLEdBQXFELENBQXJEO0FBQ0EsV0FBSzRCLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUN6QyxJQUFyQyxJQUEyQ3dQLE9BQTNDO0FBQ0gsS0FORCxNQVFBO0FBQ0lBLE1BQUFBLE9BQU8sR0FBQyxDQUFSO0FBQ0g7O0FBRUQsV0FBT0EsT0FBUDtBQUNILEdBem9Db0IsQ0E0b0NyQjtBQUNBOztBQTdvQ3FCLENBQVQsQ0FBaEIsRUErb0NBOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBa0I3TixXQUFsQixFQUNBIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyNyZWdpb24gc3VwZXJjbGFzc2VzIGFuZCBlbnVtZXJhdGlvbnNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1CdXNpbmVzc1R5cGUgPSBjYy5FbnVtKHtcclxuICAgIE5vbmU6MCxcclxuICAgIEhvbWVCYXNlZDogMSwgICAgICAgICAgICAgICAgICAgLy9hIGJ1c2luZXNzIHRoYXQgeW91IG9wZXJhdGUgb3V0IG9mIHlvdXIgaG9tZVxyXG4gICAgYnJpY2tBbmRtb3J0YXI6IDIgICAgICAgICAgICAgICAvL2Egc3RvcmUgZnJvbnQgYnVzaW5lc3NcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIkJ1c2luZXNzSW5mb1wiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmFtZTogXCJCdXNpbmVzc0RhdGFcIixcclxuICAgIEJ1c2luZXNzVHlwZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJNb2RlXCIsXHJcbiAgICAgICB0eXBlOiBFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICAgZGVmYXVsdDogRW51bUJ1c2luZXNzVHlwZS5Ob25lLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIkJ1c2luZXNzIGNhdG9nb3J5IGZvciBwbGF5ZXJzXCIsfSwgXHJcbiAgICBCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbjpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIlR5cGUgKGJ5IG5hbWUpIG9mIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsfSxcclxuICAgIEJ1c2luZXNzTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIk5hbWUgb2YgdGhlIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsfSxcclxuICAgICBBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiYmFsYW5jZSBvZiBidXNpbmVzc1wiLH0sXHJcbiAgICAgIElzUGFydG5lcnNoaXA6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNQYXJ0bmVyc2hpcFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cHc6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGRvbmUgcGFydG5lcnNoaXAgd2l0aCBzb21lb25lIHdpdGggY3VycmVudCBidXNpbmVzc1wiLH0sXHJcbiAgICAgICBQYXJ0bmVySUQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlBhcnRuZXJJRFwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJJRCBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIix9LFxyXG4gICAgICAgIExvY2F0aW9uc05hbWU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvY2F0aW9uc05hbWVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogW2NjLlRleHRdLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICB0b29sdGlwOlwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIix9LFxyXG4gICAgICAgIExvYW5UYWtlbjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblRha2VuXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBMb2FuQW1vdW50OlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG5cclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIENhcmREYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YUZ1bmN0aW9uYWxpdHkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIkNhcmREYXRhRnVuY3Rpb25hbGl0eVwiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmV4dFR1cm5Eb3VibGVQYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTmV4dFR1cm5Eb3VibGVQYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIGl0cyBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcE5leHRUdXJuOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBOZXh0VHVyblwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgdHVybiBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgdHVybiBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcE5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcE5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwSE1OZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBITU5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgaG9tZSBiYXNlZCBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sXHJcbiAgICBTa2lwQk1OZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBCTU5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgYnJpY2thIGFuZCBtbW9ydGFyIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0b2NrSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3RvY2tJbmZvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJTdG9ja0luZm9cIixcclxucHJvcGVydGllczogeyBcclxuICAgIE5hbWU6IFwiU3RvY2tEYXRhXCIsXHJcbiAgICBCdXNpbmVzc05hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJuYW1lIG9mIHRoZSBidXNpbmVzcyBpbiB3aGljaCBzdG9ja3Mgd2lsbCBiZSBoZWxkXCIsfSwgXHJcbiAgICBTaGFyZUFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiU2hhcmVBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDogXCJTaGFyZSBhbW91bnQgb2YgdGhlIHN0b2NrXCIsfSxcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yICBQbGF5ZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQbGF5ZXJEYXRhXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBQbGF5ZXJOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllck5hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIHBsYXllclwiLH0sXHJcbiAgICBQbGF5ZXJVSUQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyVUlEXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJJRCBvZiB0aGUgcGxheWVyXCIsfSxcclxuICAgIEF2YXRhcklEOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhcklEXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaWQgcmVmZXJlbmNlIGZvciBwbGF5ZXIgYXZhdGFyIHNlbGVjdGlvblwiLH0sXHJcbiAgICBJc0JvdDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc0JvdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cHc6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBjdXJyZW50IHBsYXllciBpcyBib3RcIix9LCBcclxuICAgIE5vT2ZCdXNpbmVzczpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1wiLFxyXG4gICAgICAgdHlwZTogW0J1c2luZXNzSW5mb10sXHJcbiAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJOdW1iZXIgb2YgYnVzaW5lc3MgYSBwbGF5ZXIgY2FuIG93blwiLH0sIFxyXG4gICAgQ2FyZEZ1bmN0aW9uYWxpdHk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FyZEZ1bmN0aW9uYWxpdHlcIixcclxuICAgICAgIHR5cGU6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImNhcmQgZnVuY3Rpb25hbGl0eSBzdG9yZWQgYnkgcGxheWVyXCIsfSwgXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLH0sIFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIix9LCBcclxuICAgIE5vT2ZTdG9ja3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU3RvY2tzXCIsXHJcbiAgICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBDYXNoOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBHb2xkQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIFN0b2NrQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExvYW5UYWtlbjpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIix9LFxyXG4gICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIix9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsfSxcclxuICAgIElzQmFua3J1cHQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIix9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHNraXBwZWQgbG9hbiBwYXltZW50XCIsfSxcclxuICAgIFBsYXllclJvbGxDb3VudGVyOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclJvbGxDb3VudGVyXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLH0sXHJcbiAgICBJbml0aWFsQ291bnRlckFzc2lnbmVkOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkluaXRpYWxDb3VudGVyQXNzaWduZWRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgaXNHYW1lRmluaXNoZWQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBUb3RhbFNjb3JlOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgR2FtZU92ZXI6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdhbWVPdmVyXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxufSxcclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxuXHJcbn0pO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBHYW1lIE1hbmFnZXIgQ2xhc3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1haW4gY2xhc3MpIGNsYXNzIGZvciBHYW1lIE1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvbGxDb3VudGVyPTA7XHJcbnZhciBEaWNlVGVtcD0wO1xyXG52YXIgRGljZVJvbGw9MDtcclxudmFyIElzVHdlZW5pbmc9ZmFsc2U7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5PVtdO1xyXG52YXIgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxudmFyIFBhc3NlZFBheURheT1mYWxzZTtcclxudmFyIERvdWJsZVBheURheT1mYWxzZTtcclxuXHJcbi8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG52YXIgX25leHRUdXJuRG91YmxlUGF5PWZhbHNlO1xyXG52YXIgX3NraXBOZXh0VHVybj1mYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxudmFyIF9za2lwSE1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBfc2tpcEJNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG52YXIgVHVybkluUHJvZ3Jlc3M9ZmFsc2U7XHJcblxyXG52YXIgaXNHYW1lT3Zlcj1mYWxzZTtcclxuXHJcbnZhciBHYW1lTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiR2FtZU1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBwbGF5ZXIncyBkYXRhXCJ9LFxyXG4gICAgICAgIFBsYXllck5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIHBsYXllclwiLH0sICAgIFxyXG4gICAgICAgIENhbWVyYU5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIGNhbWVyYVwiLH0sICAgIFxyXG4gICAgICAgIEFsbFBsYXllclVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIHVpIG9mIGFsbCBwbGF5ZXJzXCIsfSwgICAgICBcclxuICAgICAgICBBbGxQbGF5ZXJOb2Rlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiBub2RlIG9mIGFsbCBwbGF5ZXJzIGluc2lkZSBnYW1lcGxheVwiLH0sICAgXHJcbiAgICAgICAgU3RhcnRMb2NhdGlvbk5vZGVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIGF0dGF5IG9mIGxvY2F0aW9uc1wiLH0sICAgXHJcbiAgICB9LFxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIFBsYXllckRhdGE6IFBsYXllckRhdGEsXHJcbiAgICAgICAgQnVzaW5lc3NJbmZvOkJ1c2luZXNzSW5mbyxcclxuICAgICAgICBFbnVtQnVzaW5lc3NUeXBlOkVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgICAgSW5zdGFuY2U6bnVsbFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gQWxsIEZ1bmN0aW9ucyBvZiBHYW1lTWFuYWdlclxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgIEBtZXRob2Qgb25Mb2FkXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkluc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgdGhpcy5UdXJuTnVtYmVyPTA7XHJcbiAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPWZhbHNlO1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0X0dhbWVNYW5hZ2VyKCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9MDtcclxuICAgICAgICB0aGlzLkNhcmRDb3VudGVyPTA7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gICAgICAgIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGluaXRpYWwgZ2FtZW1hbmFnZXIgZXNzZXRpYWxzXHJcbiAgICBAbWV0aG9kIEluaXRfR2FtZU1hbmFnZXJcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRfR2FtZU1hbmFnZXIgKCkge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhPXRoaXMuQ2FtZXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvPVtdO1xyXG4gICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBEaWNlUm9sbD0wOyAgXHJcblxyXG4gICAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuICAgICAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHZhciBBbGxEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm89QWxsRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBwdWJsaWMgZnVuY3Rpb25zIHRvIGdldCBkYXRhIChhY2Nlc3NpYmxlIGZyb20gb3RoZXIgY2xhc3NlcylcclxuICAgIEdldFR1cm5OdW1iZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlR1cm5OdW1iZXI7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIFNwZWN0YXRlTW9kZSBDb2RlXHJcblxyXG4gICAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCxfdG9Qb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBwbGF5ZXJub2Rlc1wiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKVxyXG4gICAge1xyXG4gICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAge1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGZ1bmN0aW9ucyByZWxhdGVkIHRvIFR1cm4gTWVjaGFuaXNtIGFuZCBjYXJkIG1lY2hhbmlzbVxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgIEBtZXRob2QgUmFpc2VFdmVudEZvckNhcmRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg1LF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKClcclxuICB7XHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuICAgIGlmKENhcmRFdmVudFJlY2VpdmVkPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5DYXJkQ291bnRlcik7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbiAgICAgICAgaWYoIXRoaXMuQ2FyZERpc3BsYXllZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD10cnVlO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5DYXJkQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsdGhpcy5SYW5kb21DYXJkSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy9jaGVjayBhZnRlciBldmVyeSAwLjUgc2Vjb25kc1xyXG4gICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0Q2FyZERpc3BsYXkoKVxyXG4gIHtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRGb3JDYXJkKF9kYXRhKVxyXG4gIHtcclxuXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG5cclxuICAgIHZhciBSYW5kb21DYXJkPV9kYXRhLnJhbmRvbUNhcmQ7XHJcbiAgICB2YXIgY291bnRlcj1fZGF0YS5jb3VudGVyO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4PVJhbmRvbUNhcmQ7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyPWNvdW50ZXI7XHJcblxyXG4gICBcclxuICAgIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9dHJ1ZTtcclxuICAgICAgICAvLyBpZihJc1R3ZWVuaW5nPT1mYWxzZSAmJiB0aGlzLkNhcmREaXNwbGF5ZWQ9PWZhbHNlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKGZhbHNlLFJhbmRvbUNhcmQpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9dHJ1ZTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcblxyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSBwYXJ0aWN1bGFyIHBsYXllciBoYXMgY29tcGxldGUgdGhlaXIgbW92ZVxyXG4gICAgQG1ldGhvZCBSYWlzZUV2ZW50VHVybkNvbXBsZXRlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpXHJcbiAge1xyXG4gICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcblxyXG4gIFN5bmNBbGxEYXRhKClcclxuICB7XHJcbiAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgfSAgXHJcbn0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIG9uIGFsbCBwbGF5ZXJzIHRvIHZhbGlkYXRlIGlmIG1vdmUgaXMgY29tcGxldGVkIG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50c1xyXG4gICAgQG1ldGhvZCBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGVcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX3VpZClcclxuICB7XHJcbiAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTsgXHJcblxyXG4gICAgICAgIHZhciBBcnJheUxlbmd0aD1UdXJuQ2hlY2tBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIElERm91bmQ9ZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFycmF5TGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihUdXJuQ2hlY2tBcnJheVtpbmRleF09PV91aWQpXHJcbiAgICAgICAgICAgICAgICBJREZvdW5kPXRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighSURGb3VuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT1Ub3RhbENvbm5lY3RlZFBsYXllcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPXRydWU7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAgQG1ldGhvZCBDaGFuZ2VUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGFuZ2VUdXJuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlN5bmNBbGxEYXRhKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuVHVybk51bWJlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9dGhpcy5UdXJuTnVtYmVyKzE7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAgQG1ldGhvZCBUdXJuSGFuZGxlclxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgVHVybkhhbmRsZXIoX3R1cm4pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJNYXRjaGVkPWZhbHNlO1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49ZmFsc2U7XHJcbiAgICAgICAgaWYoSXNUd2VlbmluZykgLy9jaGVjayBpZiBhbmltYXRpb24gb2YgdHVybiBiZWluZyBwbGF5ZWQgb24gb3RoZXIgcGxheWVycyBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9X3R1cm47XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBfc2tpcE5leHRUdXJuPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICAgICAgICBpZighX3NraXBOZXh0VHVybilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbFBsYXllclVJW3RoaXMuVHVybk51bWJlcl0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm8pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJNYXRjaGVkICYmIF9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVNraXBOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZClcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgIHZhciBNeURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgICAgIHZhciBfY291bnRlcj1faW5kO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQhPU15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkgLy9kb250IHVwZGF0ZSBteSBvd24gZGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQ9PU1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LCAgXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTdGFydFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgICAgICAvL3NlbmRpbmcgaW5pdGlhbCB0dXJuIG51bWJlciBvdmVyIHRoZSBuZXR3b3JrIHRvIHN0YXJ0IHR1cm4gc2ltdWx0YW5vdXNseSBvbiBhbGwgY29ubmVjdGVkIHBsYXllcidzIGRldmljZXNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEFzc2lnblBsYXllckdhbWVVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGlmKF90b2dnbGVIaWdobGlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW19pbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoX2luZGV4PT1pbmRleClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBlbmJhbGUgcmVzcGVjdGl2ZSBwbGF5ZXJzIG5vZGVzIGluc2lkZSBnYW1hcGxheVxyXG4gICAgQG1ldGhvZCBFbmFibGVQbGF5ZXJOb2Rlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRW5hYmxlUGxheWVyTm9kZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgIFxyXG4gICAgICAgIGxldCByYXRpbz10YXJnZXRQb3MueS9jYy53aW5TaXplLmhlaWdodDtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgIH0sXHJcblxyXG4gICAgbGF0ZVVwZGF0ZSAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5pc0NhbWVyYVpvb21pbmcpICAgIFxyXG4gICAgICAgICAgICB0aGlzLlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3luY0RpY2VSb2xsKF9yb2xsKVxyXG4gICAge1xyXG4gICAgICAgIElzVHdlZW5pbmc9dHJ1ZTtcclxuICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPT0wICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPTEzO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPT0xMilcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIrMjE7ICBcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgRGljZVJvbGw9X3JvbGw7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKERpY2VSb2xsKTtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBUZW1wQ2hlY2tTcGFjZShfcm9sbGluZylcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtcGNvdW50ZXI9MDtcclxuICAgICAgICB2YXIgdGVtcGNvdW50ZXIyPTA7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEPT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGVtcGNvdW50ZXIyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IodGVtcGNvdW50ZXIyK1wiIFwiK19yb2xsKTtcclxuICAgICAgICAvLyBpZigodGVtcGNvdW50ZXIyK19yb2xsKTwzMylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlPT0xKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0ZW1wY291bnRlcj0wK19yb2xsLTE7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBlbHNlXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRlbXBjb3VudGVyPTEzK19yb2xsLTE7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyMitcIiBcIitfcm9sbCk7XHJcbiAgICAgICAgLy8gICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICBpZih0ZW1wY291bnRlcjItMTwwKVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInN0YXJ0aW5nIGZyb20gb2JsaXZpb25cIik7XHJcbiAgICAgICAgdGVtcGNvdW50ZXI9dGVtcGNvdW50ZXIyK19yb2xsaW5nLTE7XHJcbiAgICAgICAgdmFyIGRpY2V0b2JlPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIitkaWNldG9iZSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGNvdW50ZXI9dGVtcGNvdW50ZXIyK19yb2xsaW5nO1xyXG4gICAgICAgIHZhciBkaWNldG9iZT1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIrZGljZXRvYmUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsRGljZTpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcblxyXG4gICAgICAgIC8vIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSg4LDI1KTtcclxuICAgICAgICAvLyB2YXIgRGljZTI9dGhpcy5nZXRSYW5kb20oOCwyNSk7XHJcblxyXG4gICAgICAgIERpY2VSb2xsPURpY2UxK0RpY2UyO1xyXG4gICAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgICAgLy90aGlzLlRlbXBDaGVja1NwYWNlKERpY2VSb2xsKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpY2UgbnVtYmVyOiBcIitEaWNlUm9sbCk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMyxEaWNlUm9sbCk7IFxyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsT25lRGljZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgcmV0dXJuIERpY2UxO1xyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsVHdvRGljZXMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHZhciBEaWNlMj10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHJldHVybiAoRGljZTErRGljZTIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjYWxsVXBvbkNhcmQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRD1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGlmKF9zcGFjZUlEIT02ICYmIF9zcGFjZUlEIT03KSAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIFJhbmRvbUNhcmQ9dGhpcy5nZXRSYW5kb20oMCwxNSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2ZvciB0ZXN0aW5nIG9ubHlcclxuICAgICAgICAgICAgaWYoX3NwYWNlSUQ9PTIpIC8vbGFuZGVkIG9uIHNvbWUgYmlnIGJ1c2VpbnNzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNywxMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKF9zcGFjZUlEPT01KSAvL2xhbmRlZCBvbiBzb21lIGxvc3NlcyBjYXJkc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCw1LDYsMl07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihfc3BhY2VJRD09MykgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXg9WzAsNywzLDgsMTMsOV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw2KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NwYWNlSUQ9PTEpIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNiwxMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIFNlbmRpbmdEYXRhPXtcInJhbmRvbUNhcmRcIjpSYW5kb21DYXJkLFwiY291bnRlclwiOlJvbGxDb3VudGVyfTsgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBsZXRlQ2FyZFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENhbGxHYW1lQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD09ZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfY2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaDtcclxuICAgICAgICAgICAgICAgIHZhciBITUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FuQW1vdW50Kz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBITUNhc2g9MDtcclxuICAgICAgICAgICAgICAgIGlmKEhNQW1vdW50PT0xKVxyXG4gICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTIpXHJcbiAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzYwMDAwO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArMjUwMDArNjAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIFRvdGFsQXNzZXRzPV9jYXNoK0JNQ2FzaCtITUNhc2gtbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0cztcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg2LF9kYXRhKTtcclxuICAgfSxcclxuXHJcbiAgIFN5bmNHYW1lT3ZlcihfVUlEKVxyXG4gICB7XHJcbiAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgIGNvbnNvbGUubG9nKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgIGlmKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRD09X1VJRClcclxuICAgIHtcclxuICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIlRvdGFsIENhc2g6IFwiK015RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUrXCJcXG5cIisnXFxuJytcclxuICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICBcInVuZm9ydHVuYXRlbHkgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gICAgfSwgMTUwNjApO1xyXG5cclxuICAgfSxcclxuXHJcbiAgICBTdGFydERpY2VSb2xsOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZihSb2xsQ291bnRlcj49R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZW92ZXJcIik7XHJcbiAgICAgICAgICAgIGlzR2FtZU92ZXI9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT1mYWxzZSlcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihwbGF5ZXJjb21wbGV0ZWQ9PXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXg9MDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQ9MDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF92YWx1ZSA+IG1heClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQ9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9X3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIrU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGljZVRlbXA9RGljZVRlbXArMTsgXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlblBsYXllcih0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRvbTpmdW5jdGlvbihtaW4sbWF4KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlbkNhbWVyYTogZnVuY3Rpb24gKF9wb3MsIGlzWm9vbSx0aW1lKSB7ICAgXHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5DYW1lcmFOb2RlKVxyXG4gICAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKGlzWm9vbSlcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFJbiAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW88MilcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8rMC4wMztcclxuICAgICAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIDEwKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tQYXlEYXlDb25kaXRpb25zKClcclxuICAgIHtcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpPT02KVxyXG4gICAgICAgICAgICBQYXNzZWRQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpPT03KVxyXG4gICAgICAgICAgICBEb3VibGVQYXlEYXk9dHJ1ZTtcclxuXHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheTtcclxuICAgICAgICBpZihQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSAmJiAhX25leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoKERvdWJsZVBheURheSkgfHwgKFBhc3NlZFBheURheSAmJiBfbmV4dFR1cm5Eb3VibGVQYXkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFPdXQgKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW8+PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8tMC4wMztcclxuICAgICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249Y2MuVmVjMigwLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTE7XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuUGxheWVyOiBmdW5jdGlvbiAoTm9kZSxUb1Bvcykge1xyXG4gICAgICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgICAgLnRvKDAuNCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKERpY2VUZW1wPERpY2VSb2xsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxOyBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRGljZVRlbXArXCIgXCIrUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX25ld3Bvcz1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcyxmYWxzZSwwLjYpOyAvL3pvb21vdXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vcnVsZXMgaW1wbG1lbnRhdGlvbiBkdXJpbmcgdHVybiAodHVybiBkZWNpc2lvbnMpXHJcblxyXG4gICAgVG9nZ2xlUGF5RGF5KF9zdDEsX1N0MilcclxuICAgIHtcclxuICAgICAgICBQYXNzZWRQYXlEYXk9X3N0MTtcclxuICAgICAgICBEb3VibGVQYXlEYXk9X1N0MjtcclxuICAgIH0sXHJcblxyXG4gICAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCxfaW5kZXgsX2xvY2F0aW9uTmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaD49YW1vdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2gtYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50KzE7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwxMDAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIithbW91bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NUeXBlKT09MikgLy90aGlzIG1lYW5zIHRoZXJlIGlzIGJyaWNrIGFuZCBtb3J0YXIgaW4gbGlzdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldEJ1c2luZXNzSW5kZXgoaSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuUmVzZXRFZGl0Qm94KCk7XHJcbiAgICAgICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coQnVzaW5lc3NMb2NhdGlvbk5vZGVzKTtcclxuICAgICAgICByZXR1cm4gQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSxfU2hhcmVBbW91bnQsX2lzQWRkaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0FkZGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3RvY2s9bmV3IFN0b2NrSW5mbygpO1xyXG4gICAgICAgICAgICBfc3RvY2suQnVzaW5lc3NOYW1lPV9uYW1lO1xyXG4gICAgICAgICAgICBfc3RvY2suU2hhcmVBbW91bnQ9X1NoYXJlQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZTdG9ja3MucHVzaChfc3RvY2spO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFBheWRheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgICAgX3NraXBCTU5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICAgIGlmKF9za2lwTmV4dFBheWRheSkgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBQYXlEYXkuXCIsMTYwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgfSwgMTY1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfdGl0bGU9XCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmKF9pc0RvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIF90aXRsZT1cIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBfdGl0bGU9XCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Bc3NpZ25EYXRhX1BheURheShfdGl0bGUsX2lzRG91YmxlUGF5RGF5LF9za2lwSE1OZXh0UGF5ZGF5LF9za2lwQk1OZXh0UGF5ZGF5KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuLy8jZW5kcmVnaW9uXHJcbiAgIFxyXG4gICAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk9X25leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm49X3NraXBOZXh0VHVybjtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk9X3NraXBOZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5PV9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk9X3NraXBCTU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgVHVybkluUHJvZ3Jlc3M9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICAgIH0sXHJcbiAgICBMb3NlQWxsTWFya2V0aW5nTW9uZXkoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9sb3NlQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2xvc2VBbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcilcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudEluY3JlYXNlZD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQqPV9tdWx0aXBsaWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudEluY3JlYXNlZFxyXG4gICAgfSxcclxuXHJcbiAgICBHZXRNYXJrZXRpbmdNb25leShfcHJvZml0KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfYW1vdW50PS0xO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9wcm9maXQ9KF9wcm9maXQvMTAwKTtcclxuICAgICAgICAgICAgX2Ftb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fcHJvZml0O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoKz1fYW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICAvLyNlbmRyZWdpb25cclxufSk7XHJcbi8vbW9kdWxlLmV4cG9ydHMgID0gUGxheWVyRGF0YTsgLy93aGVuIGltcG9ydHMgaW4gYW5vdGhlciBzY3JpcHQgb25seSByZWZlcmVuY2Ugb2YgcGxheWVyZGF0YSBjbGFzcyB3b3VsZCBiZSBhYmxlIHRvIGFjY2Vzc2VkIGZyb20gR2FtZW1hbmFnZXIgaW1wb3J0XHJcbm1vZHVsZS5leHBvcnRzICA9IEdhbWVNYW5hZ2VyO1xyXG4vLyNlbmRyZWdpb24iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameplayUIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80e5dJMhAJM0b0RW9xz0opK', 'GameplayUIManager');
// Script/GameplayUIManager.js

"use strict";

var GameManager = null;
var GamePlayReferenceManager = null;
var businessDetailNodes = []; //-------------------------------------------enumeration for amount of loan-------------------------//

var LoanAmountEnum = cc.Enum({
  None: 0,
  TenThousand: 10000,
  TentyThousand: 20000,
  ThirtyThousand: 30000,
  FortyThousand: 40000,
  FiftyThousand: 50000,
  Other: 6
}); //-------------------------------------------class for Business Setup UI-------------------------//

var BusinessSetupUI = cc.Class({
  name: "BusinessSetupUI",
  properties: {
    PlayerNameUI: {
      displayName: "PlayerNameUI",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label for player name"
    },
    PlayerCashUI: {
      displayName: "PlayerCashUI",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label for player cash"
    },
    BusinessTypeTextUI: {
      displayName: "BusinessTypeTextUI",
      type: cc.Text,
      "default": "",
      serializable: false,
      tooltip: "var to store text for business type"
    },
    BusinessNameTextUI: {
      displayName: "BusinessTypeTextUI",
      type: cc.Text,
      "default": "",
      serializable: false,
      tooltip: "var to store text for business name"
    },
    BusinessTypeLabel: {
      displayName: "BusinessTypeLabel",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "reference for business type editbox"
    },
    BusinessNameLabel: {
      displayName: "BusinessNameLabel",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "referece for business name editbox"
    },
    HomeBasedNodeUI: {
      displayName: "HomeBasedNodeUI",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the node for home based business"
    },
    BrickAndMortarNodeUI: {
      displayName: "BrickAndMortarNodeUI",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the node for brick and mortar business"
    },
    TimerUI: {
      displayName: "TimerUI",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the label for timer"
    },
    TimerNode: {
      displayName: "TimerNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for timer node in business setup"
    },
    BusinessSetupNode: {
      displayName: "BusinessSetupNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the node for business setup"
    },
    LoanSetupNode: {
      displayName: "LoanSetupNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the node for loan setup"
    },
    LoanAmount: {
      displayName: "LoanAmount",
      type: LoanAmountEnum,
      "default": LoanAmountEnum.None,
      serializable: true,
      tooltip: "loan amount taken by player (state machine)"
    },
    LoanAmountLabel: {
      displayName: "LoanAmountLabel",
      type: [cc.Node],
      "default": [],
      serializable: true,
      tooltip: "Reference for all labels of amounts in loan UI"
    },
    WaitingStatusNode: {
      displayName: "WaitingStatusNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for waiting status screen on initial business setup"
    },
    ExitButtonNode: {
      displayName: "ExitButtonNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for exit button node in business setup"
    }
  },
  ctor: function ctor() {//constructor//
  },
  ChangeName_BusinessSetup: function ChangeName_BusinessSetup(name) {
    this.PlayerNameUI.string = name;
  }
}); //-------------------------------------------class for Business Setup UI-------------------------//

var TurnDecisionSetupUI = cc.Class({
  name: "TurnDecisionSetupUI",
  properties: {
    MarketingEditBox: {
      displayName: "MarketingEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the editbox of marketing node"
    },
    GoldEditBox: {
      displayName: "GoldEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the editbox of invest gold node"
    },
    StockEditBox: {
      displayName: "StockEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the editbox of invest stock node"
    },
    CashAmountLabel: {
      displayName: "Cash",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to cash node"
    },
    ExpandBusinessNode: {
      displayName: "ExpandBusinessNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for expnad business node"
    },
    ExpandBusinessScrollContent: {
      displayName: "ExpandBusinessScrollContent",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for content node of scroll view of expand business node"
    },
    ExpandBusinessPrefab: {
      displayName: "ExpandBusinessPrefab",
      type: cc.Prefab,
      "default": null,
      serializable: true,
      tooltip: "Reference for prefab of expand business node"
    }
  },
  ctor: function ctor() {//constructor
  },
  ChangeName_BusinessSetup: function ChangeName_BusinessSetup(name) {
    this.PlayerNameUI.string = name;
  }
}); //-------------------------------------------enumeration for investment/buy and sell-------------------------//

var InvestEnum = cc.Enum({
  None: 0,
  StockInvest: 1,
  GoldInvest: 2,
  StockSell: 3,
  GoldSell: 4,
  Other: 5
}); //-------------------------------------------class for InvestSellUI-------------------------//

var InvestSellUI = cc.Class({
  name: "InvestSellUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of invest&sell node"
    },
    DiceResultLabel: {
      displayName: "DiceResult",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of Dice Result of invest&sell node"
    },
    PriceTitleLabel: {
      displayName: "PriceTitle",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of Price Title of invest&sell node"
    },
    PriceValueLabel: {
      displayName: "PriceValue",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of Price value of invest&sell node"
    },
    BuyOrSellTitleLabel: {
      displayName: "BuyOrSellTitle",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BuyOrSell Title of invest&sell node"
    },
    TotalAmountTitleLabel: {
      displayName: "TotalAmountTitle",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of TotalAmount Title of invest&sell node"
    },
    TotalAmountValueLabel: {
      displayName: "TotalAmountValue",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of TotalAmount Value of invest&sell node"
    },
    ButtonNameLabel: {
      displayName: "ButtonName",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of button name of invest&sell node"
    },
    InvestState: {
      displayName: "InvestState",
      type: InvestEnum,
      "default": InvestEnum.None,
      serializable: true
    },
    AmountEditBox: {
      displayName: "AmountEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for SellBusinessUI-------------------------//

var SellBusinessUI = cc.Class({
  name: "SellBusinessUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of Sell node"
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of cash of Sell node"
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player name of Sell node"
    },
    BusinessCountLabel: {
      displayName: "BusinessCount",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BusinessCount of Sell node"
    },
    ScrollContentNode: {
      displayName: "ScrollContentNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of ScrollContentNode of Sell node"
    },
    BusinessSellPrefab: {
      displayName: "BusinessSellPrefab",
      type: cc.Prefab,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of BusinessSellPrefab of Sell node"
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of Sell node"
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of TurnOverExitButton of Sell node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for PayDayUI-------------------------//

var PayDayUI = cc.Class({
  name: "PayDayUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of PayDay node"
    },
    HomeBasedNumberLabel: {
      displayName: "HomeBasedNumber",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of HomeBasedNumber node"
    },
    BMNumberLabel: {
      displayName: "BrickMortarNumber",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BrickMortarNumber node"
    },
    BMNumberLocationLabel: {
      displayName: "BrickMortarLocations",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BrickMortarLocations node"
    },
    HomeBasedBtn: {
      displayName: "HomeBasedBtn",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of HomeBasedBtn node"
    },
    BMBtn: {
      displayName: "BrickMortarBtn",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BrickMortarBtn node"
    },
    LoanBtn: {
      displayName: "LoanBtn",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of LoanBtn node"
    },
    MainPanelNode: {
      displayName: "MainPanelNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of MainPanel node"
    },
    ResultPanelNode: {
      displayName: "ResultPanelNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of ResultPanel node"
    },
    LoanResultPanelNode: {
      displayName: "LoanResultPanelNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of LoanResultPanelNode node"
    },
    ResultScreenTitleLabel: {
      displayName: "ResultScreenTitle",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of ResultScreenTitle node"
    },
    DiceResultLabel: {
      displayName: "DiceResult",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of DiceResult node"
    },
    TotalBusinessLabel: {
      displayName: "TotalBusinessLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of TotalBusiness node"
    },
    TotalAmountLabel: {
      displayName: "TotalAmountLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of TotalAmount node"
    },
    SkipLoanButton: {
      displayName: "SkipLoanButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of SkipLoanButton node"
    },
    LoanFotterLabel: {
      displayName: "LoanFotterLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of LoanFotterLabel node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for InvestUI-------------------------//

var InvestUI = cc.Class({
  name: "InvestUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of Invest node"
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of cash of Invest node"
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player name of Invest node"
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of Invest node"
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of TurnOverExitButton of Invest node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for BuyOrSellUI-------------------------//

var BuyOrSellUI = cc.Class({
  name: "BuyOrSellUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of BuyOrSell node"
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of cash of BuyOrSell node"
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player name of BuyOrSell node"
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of BuyOrSell node"
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of TurnOverExitButton of BuyOrSell node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for GameplayUIManager-------------------------//

var PlayerDataIntance;
var PlayerBusinessDataIntance;
var RequiredCash;
var InsideGameBusinessSetup = -1; //-1 means new business is not instantialted from inside game , if it has any other value it means its been instantiated from inside game and its value represents index of player
//turn decisions

var TempMarketingAmount = "";
var TempHiringLawyer; //buyorsell

var GoldCashAmount = "";
var EnterBuySellAmount = "";
var StockBusinessName = "";
var DiceResult;
var OnceOrShare;
var LocationName = "";
var HomeBasedPaymentCompleted = false;
var BrickMortarPaymentCompleted = false;
var LoanPayed = false;
var TotalPayDayAmount = 0;
var DoublePayDay = false;
var GameplayUIManager = cc.Class({
  name: "GameplayUIManager",
  "extends": cc.Component,
  properties: {
    BusinessSetupData: {
      "default": null,
      type: BusinessSetupUI,
      serializable: true,
      tooltip: "reference of BusinessSetupUI class"
    },
    TurnDecisionSetupUI: {
      "default": null,
      type: TurnDecisionSetupUI,
      serializable: true,
      tooltip: "reference of TurnDecisionSetupUI class"
    },
    InvestSellSetupUI: {
      "default": null,
      type: InvestSellUI,
      serializable: true,
      tooltip: "reference of InvestSellUI class"
    },
    PayDaySetupUI: {
      "default": null,
      type: PayDayUI,
      serializable: true,
      tooltip: "reference of InvestSellUI class"
    },
    SellBusinessSetupUI: {
      "default": {},
      type: SellBusinessUI,
      serializable: true,
      tooltip: "reference of SellBusinessUI class"
    },
    InvestSetupUI: {
      "default": {},
      type: InvestUI,
      serializable: true,
      tooltip: "reference of InvestUI class"
    },
    BuyOrSellSetupUI: {
      "default": {},
      type: BuyOrSellUI,
      serializable: true,
      tooltip: "reference of BuyOrSellUI class"
    },
    PopUpUI: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for pop up screen"
    },
    BusinessSetupNode: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for business setup screen"
    },
    GameplayUIScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for gameplay ui screen"
    },
    DecisionScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for Decision screen"
    },
    InvestSellScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for Invest & sell screen"
    },
    PayDayScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for PayDay screen"
    },
    SellBusinessScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SellBusiness screen"
    },
    InvestScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for Invest screen"
    },
    BuyOrSellScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for BuyOrSell screen"
    },
    TempDiceText: {
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "label reference for dice"
    },
    LeaveRoomButton: {
      "default": null,
      type: cc.Node,
      serializable: true
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.CheckReferences(); //local variables

    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
  },
  ResetTurnVariable: function ResetTurnVariable() {
    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
    if (!GameManager || GameManager == null) GameManager = require('GameManager');
  },
  onEnable: function onEnable() {
    //events subscription to be called 
    cc.systemEvent.on('SyncData', this.SyncData, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off('SyncData', this.SyncData, this);
  },
  start: function start() {},
  //#region Spectate UI Setup
  InitialScreen_SpectateMode: function InitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = true;
  },
  ToggleLeaveRoomButton_SpectateModeUI: function ToggleLeaveRoomButton_SpectateModeUI(_state) {
    this.LeaveRoomButton.active = _state;
  },
  OnLeaveButtonClicked_SpectateModeUI: function OnLeaveButtonClicked_SpectateModeUI() {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(true);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
      GamePlayReferenceManager.Instance.RemovePersistNode();
      cc.director.loadScene("Splash");
    }, 500);
  },
  //#endregion
  //#region BusinessSetup with loan
  //Business setup ui//------------------------
  StartNewBusiness_BusinessSetup: function StartNewBusiness_BusinessSetup(isFirstTime, insideGame) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;
    this.Init_BusinessSetup(isFirstTime, insideGame);
  },
  Init_BusinessSetup: function Init_BusinessSetup(isFirstTime, insideGame) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    PlayerDataIntance = new GameManager.PlayerData();
    PlayerBusinessDataIntance = new GameManager.BusinessInfo();

    if (isFirstTime) {
      this.BusinessSetupData.ExitButtonNode.active = false;
      this.BusinessSetupData.TimerNode.active = true;
      PlayerDataIntance.Cash = 20000;
    }

    this.ResetButtonStates_BusinessSetup();

    if (insideGame) {
      this.BusinessSetupData.ExitButtonNode.active = true;
      this.BusinessSetupData.TimerNode.active = false;

      for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length; index++) {
        if (GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID == GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID) {
          InsideGameBusinessSetup = index;
          PlayerDataIntance = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index];
          this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerName);
          this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID);
          this.OnChangeCash_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].Cash);
        }
      }
    } else {
      InsideGameBusinessSetup = -1;
      this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name);
      this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);
      this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
    }
  },
  GetObj_BusinessSetup: function GetObj_BusinessSetup() {
    return this.BusinessSetupData;
  },
  OnChangeName_BusinessSetup: function OnChangeName_BusinessSetup(name) {
    this.BusinessSetupData.ChangeName_BusinessSetup(name);
    PlayerDataIntance.PlayerName = name;
  },
  OnChangeUID_BusinessSetup: function OnChangeUID_BusinessSetup(UID) {
    PlayerDataIntance.PlayerUID = UID;
  },
  OnBusinessTypeTextChanged_BusinessSetup: function OnBusinessTypeTextChanged_BusinessSetup(name) {
    this.BusinessSetupData.BusinessTypeTextUI = name;
    PlayerBusinessDataIntance.BusinessTypeDescription = name;
  },
  OnBusinessNameTextChanged_BusinessSetup: function OnBusinessNameTextChanged_BusinessSetup(name) {
    this.BusinessSetupData.BusinessNameTextUI = name;
    PlayerBusinessDataIntance.BusinessName = name;
  },
  ResetButtonStates_BusinessSetup: function ResetButtonStates_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[0].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[0].active = false;
    this.BusinessSetupData.BusinessTypeLabel.string = "";
    this.BusinessSetupData.BusinessNameLabel.string = "";
    this.BusinessSetupData.BusinessNameTextUI = "";
    this.BusinessSetupData.BusinessTypeTextUI = "";
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.none;
  },
  OnHomeBasedSelected_BusinessSetup: function OnHomeBasedSelected_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[0].active = true;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[0].active = false;
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.HomeBased;
  },
  OnBrickMortarSelected_BusinessSetup: function OnBrickMortarSelected_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[0].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[0].active = true;
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.brickAndmortar;
  },
  OnChangeCash_BusinessSetup: function OnChangeCash_BusinessSetup(amount) {
    this.BusinessSetupData.PlayerCashUI.string = "$" + amount;
    PlayerDataIntance.Cash = amount;
  },
  CalculateLoan_BusinessSetup: function CalculateLoan_BusinessSetup(amount) {
    var _loanTaken = false;
    var _businessIndex = 0;

    for (var index = 0; index < PlayerDataIntance.NoOfBusiness.length; index++) {
      if (PlayerDataIntance.NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    if (_loanTaken) {
      this.ShowToast("You have already taken loan of $" + PlayerDataIntance.NoOfBusiness[_businessIndex].LoanAmount);
    } else {
      if (PlayerDataIntance.Cash >= amount) {
        this.ShowToast("You do not need loan, you have enough cash to buy current selected business.");
      } else {
        this.BusinessSetupData.LoanSetupNode.active = true;
        RequiredCash = Math.abs(parseInt(PlayerDataIntance.Cash) - amount);
        this.BusinessSetupData.LoanAmountLabel[0].children[1].children[0].getComponent(cc.Label).string = "$" + RequiredCash;
      }
    }
  },
  OnLoanButtonClicked_BusinessSetup: function OnLoanButtonClicked_BusinessSetup(event) {
    if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.brickAndmortar) {
      this.CalculateLoan_BusinessSetup(50000);
    } else if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.HomeBased) {
      this.CalculateLoan_BusinessSetup(10000);
    } else {
      this.ShowToast("please select business between Home Based and brick & mortar. ");
    }
  },
  OnLoanBackButtonClicked_BusinessSetup: function OnLoanBackButtonClicked_BusinessSetup(event) {
    this.BusinessSetupData.LoanSetupNode.active = false;
  },
  HighLightLoanSelection_BusinessSetup: function HighLightLoanSelection_BusinessSetup(index) {
    for (var i = 0; i < this.BusinessSetupData.LoanAmountLabel.length; i++) {
      if (index == i) this.BusinessSetupData.LoanAmountLabel[i].children[0].active = true;else this.BusinessSetupData.LoanAmountLabel[i].children[0].active = false;
    }
  },
  OnLoanAmountChoosed_01_BusinessSetup: function OnLoanAmountChoosed_01_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.Other;
    this.HighLightLoanSelection_BusinessSetup(0);
  },
  OnLoanAmountChoosed_02_BusinessSetup: function OnLoanAmountChoosed_02_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.TenThousand;
    this.HighLightLoanSelection_BusinessSetup(1);
  },
  OnLoanAmountChoosed_03_BusinessSetup: function OnLoanAmountChoosed_03_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.TentyThousand;
    this.HighLightLoanSelection_BusinessSetup(2);
  },
  OnLoanAmountChoosed_04_BusinessSetup: function OnLoanAmountChoosed_04_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.ThirtyThousand;
    this.HighLightLoanSelection_BusinessSetup(3);
  },
  OnLoanAmountChoosed_05_BusinessSetup: function OnLoanAmountChoosed_05_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.FortyThousand;
    this.HighLightLoanSelection_BusinessSetup(4);
  },
  OnLoanAmountChoosed_06_BusinessSetup: function OnLoanAmountChoosed_06_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.FiftyThousand;
    this.HighLightLoanSelection_BusinessSetup(5);
  },
  OnTakenLoanClicked_BusinessSetup: function OnTakenLoanClicked_BusinessSetup(event) {
    if (this.BusinessSetupData.LoanAmount == LoanAmountEnum.Other) PlayerBusinessDataIntance.LoanAmount = RequiredCash;else PlayerBusinessDataIntance.LoanAmount = parseInt(this.BusinessSetupData.LoanAmount);
    PlayerBusinessDataIntance.LoanTaken = true;
    this.OnLoanBackButtonClicked_BusinessSetup();
    PlayerDataIntance.Cash = PlayerDataIntance.Cash + PlayerBusinessDataIntance.LoanAmount;
    this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
  },
  SyncData: function SyncData(_data, _ID) {
    if (_ID != GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().actorNr) GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(_data);
    console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo);

    if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length >= GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers) {
      //setting room property to declare initial setup has been
      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("InitialSetup", true, true);
      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("PlayerGameInfo", GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo, true);
      this.BusinessSetupData.WaitingStatusNode.active = false;
      this.BusinessSetupNode.active = false;
      this.GameplayUIScreen.active = true;
      GamePlayReferenceManager.Instance.Get_GameManager().StartTurn();
      console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo);
    }
  },
  PurchaseBusiness: function PurchaseBusiness(_amount, _businessName, _isHomeBased) {
    if (PlayerDataIntance.Cash < _amount) {
      this.ShowToast("You have not enough cash to buy this " + _businessName + " business.");
    } else {
      if (_isHomeBased) {
        if (PlayerDataIntance.HomeBasedAmount < 3) {
          PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
          this.BusinessSetupData.PlayerCashUI.string = "$" + PlayerDataIntance.Cash;
          this.StartGame = true;
          PlayerDataIntance.HomeBasedAmount++;
        } else {
          this.StartGame = false;
          this.ShowToast("You cannot own more than three Home based businesses");
        }
      } else {
        PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
        this.BusinessSetupData.PlayerCashUI.string = "$" + PlayerDataIntance.Cash;
        this.StartGame = true;
        PlayerDataIntance.BrickAndMortarAmount++;
      }
    }
  },
  Exit_BusinessSetup: function Exit_BusinessSetup() {
    this.BusinessSetupNode.active = false;

    if (PlayerBusinessDataIntance.LoanTaken) {
      PlayerBusinessDataIntance.LoanTaken = false;
      PlayerDataIntance.Cash = PlayerDataIntance.Cash - PlayerBusinessDataIntance.LoanAmount;
      PlayerBusinessDataIntance.LoanAmount = 0;
      this.ShowToast("Reverting back loan amount.", 500);
    }
  },
  InitialSetup_BusinessSetup: function InitialSetup_BusinessSetup() {
    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(PlayerDataIntance); //setting player current data in custom properties when his/her turn overs

    GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", PlayerDataIntance);
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(1, PlayerDataIntance);
    this.BusinessSetupData.WaitingStatusNode.active = true;
  },
  StartNewSetup_DuringGame_BusinessSetup: function StartNewSetup_DuringGame_BusinessSetup() {
    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[InsideGameBusinessSetup] = PlayerDataIntance;
    this.BusinessSetupNode.active = false;
    InsideGameBusinessSetup = -1;
    this.ToggleDecision_TurnDecision(true);
  },
  PayAmountToPlayGame: function PayAmountToPlayGame() {
    this.StartGame = false;
    if (PlayerBusinessDataIntance.BusinessTypeDescription == "") this.ShowToast("please write a business type.");else if (PlayerBusinessDataIntance.BusinessName == "") this.ShowToast("please write a business name.");else {
      if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.HomeBased) //if selected business is homebassed
        this.PurchaseBusiness(10000, "home", true);else if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.brickAndmortar) //if selected business is brick and mortar
        this.PurchaseBusiness(50000, "brick and mortar", false);

      if (this.StartGame == true) {
        PlayerDataIntance.NoOfBusiness.push(PlayerBusinessDataIntance);
        if (InsideGameBusinessSetup != -1) //if start new business has not been called from inside game
          this.StartNewSetup_DuringGame_BusinessSetup();else //if start new business has been called at start of game as initial setup
          this.InitialSetup_BusinessSetup(); //prtinting all values to console

        for (var i = 0; i < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length; i++) {
          console.log("player name: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].PlayerName);
          console.log("player ID: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].PlayerUID);
          console.log("Is player bot: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].IsBot);
          console.log("no of business of player (see below): ");
          console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].NoOfBusiness);
          console.log("player cash: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].Cash);
          console.log("player taken loan: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].LoanTaken);
          console.log("taken loan amount: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].LoanAmount);
        }
      }
    }
  },
  //#endregion
  //#region TurnDecisionSetupUI
  //TurnDecisionSetupUI//------------------------
  ToggleDecision_TurnDecision: function ToggleDecision_TurnDecision(isactive) {
    this.DecisionScreen.active = isactive;
    this.UpdateCash_TurnDecision();
  },
  UpdateCash_TurnDecision: function UpdateCash_TurnDecision() {
    this.TurnDecisionSetupUI.CashAmountLabel.string = "$ " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber()].Cash;
  },
  OnMarketingAmountChanged_TurnDecision: function OnMarketingAmountChanged_TurnDecision(amount) {
    //console.log(amount);
    TempMarketingAmount = amount;
  },
  OnMarketingAmountSelected_TurnDecision: function OnMarketingAmountSelected_TurnDecision() {
    if (TempMarketingAmount == "" || TempMarketingAmount == null) {
      this.ShowToast("Please enter an amount.");
    } else {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      this.marketingAmount = parseInt(TempMarketingAmount);
      console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash); //if player entered amount is greater than total cash he owns

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= this.marketingAmount) {
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - this.marketingAmount;
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount + this.marketingAmount;
        this.ShowToast("you successfully marketed amount of $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount + " , remaining cash is $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + ".");
        this.UpdateCash_TurnDecision(); //reseting marketing label and its holding variable

        this.TurnDecisionSetupUI.MarketingEditBox.string = "";
        TempMarketingAmount = "";
      } else {
        this.ShowToast("you don't have enough money."); //reseting marketing label and its holding variable

        this.TurnDecisionSetupUI.MarketingEditBox.string = "";
        TempMarketingAmount = "";
      }
    }
  },
  OnHiringLawyerButtonClicked_TurnDecision: function OnHiringLawyerButtonClicked_TurnDecision() {
    // if player has more than 5000$
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].LawyerStatus) {
      this.ShowToast("you have already hired a lawyer.");
    } else {
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= 5000) {
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].LawyerStatus = true;
        TempHiringLawyer = true;
        console.log(TempHiringLawyer);
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - 5000;
        this.ShowToast("you have successfully hired a lawyer, remaining cash is $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + ".");
        this.UpdateCash_TurnDecision();
      } else {
        this.ShowToast("sorry, you dont have enough money to hire a lawyer.");
      }
    }
  },
  onLocationNameChanged_ExpandBusiness_TurnDecision: function onLocationNameChanged_ExpandBusiness_TurnDecision(_name) {
    LocationName = _name;
  },
  OnExpandButtonClicked_TurnDecision: function OnExpandButtonClicked_TurnDecision() {
    var _this = this;

    //if player has brick and mortar business he could expand it
    console.log("expand business");
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = true;
    var generatedLength = GamePlayReferenceManager.Instance.Get_GameManager().GenerateExpandBusiness_Prefabs_TurnDecision();

    if (generatedLength == 0) {
      this.ShowToast("You have no brick and mortar business to expand.", 1500);
      setTimeout(function () {
        _this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
      }, 1600);
    }
  },
  OnExpandButtonExitClicked_TurnDecision: function OnExpandButtonExitClicked_TurnDecision() {
    this.UpdateCash_TurnDecision();
    this.CheckReferences();
    LocationName = "";
    console.log("expand business exit called");
    GamePlayReferenceManager.Instance.Get_GameManager().DestroyGeneratedNodes();
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
  },
  OnNewBusinessButtonClicked_TurnDecision: function OnNewBusinessButtonClicked_TurnDecision() {
    console.log("starting new business");
    this.StartNewBusiness_BusinessSetup(false, true);
  },
  OnGoldAmountChanged_TurnDecision: function OnGoldAmountChanged_TurnDecision(amount) {
    //console.log(amount);
    GoldCashAmount = amount;
  },
  OnGoldDiceClicked_TurnDecision: function OnGoldDiceClicked_TurnDecision() {
    if (!this.GoldInvested) {
      this.GoldInvested = true;
      EnterBuySellAmount = "";
      this.ToggleInvestSellScreen_InvestSell(true);
      this.InvestSellSetupUI.InvestState = InvestEnum.GoldInvest;
      DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
      OnceOrShare = DiceResult * 1000;
      this.AssignData_InvestSell("Invest In GOLD", DiceResult, "Each Ounce of GOLD price is:", OnceOrShare + "/ounce", "Enter the number of ounce of GOLD you want to BUY", "Total Buying Amount:", OnceOrShare + "*0=0", "BUY", this.InvestSellSetupUI.InvestState);
    } else {
      this.ShowToast("You can invest in gold one time during turn.", 800);
    }
  },
  OnStockBusinessNameChanged_TurnDecision: function OnStockBusinessNameChanged_TurnDecision(name) {
    StockBusinessName = name;
  },
  OnStockDiceClicked_TurnDecision: function OnStockDiceClicked_TurnDecision() {
    if (!this.StockInvested) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (StockBusinessName == "") {
        this.ResetStockBusinessNameInput();
        this.ShowToast("Please enter a business name to invest.");
      } else {
        this.StockInvested = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.StockInvest;
        DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        OnceOrShare = DiceResult * 1000;
        this.AssignData_InvestSell("Invest in Stock", DiceResult, "Each Share of stock price is:", OnceOrShare + "/share", "Enter the number of shares of stock you want to BUY", "Total Buying Amount:", OnceOrShare + "*0=0", "BUY", this.InvestSellSetupUI.InvestState);
      }
    } else {
      this.ShowToast("You can invest in stocks one time during turn.", 800);
    }
  },
  OnSellGoldClicked_TurnDecision: function OnSellGoldClicked_TurnDecision() {
    if (!this.GoldSold) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount > 0) {
        this.GoldSold = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.GoldSell;
        DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        OnceOrShare = DiceResult * 1000;
        this.AssignData_InvestSell("Sell GOLD", DiceResult, "Each Ounce of GOLD price is:", OnceOrShare + "/ounce", "Enter the number of ounce of GOLD you want to SELL", "Total Selling Amount:", OnceOrShare + "*0=0", "SELL", this.InvestSellSetupUI.InvestState);
      } else {
        this.ShowToast("you have not purchased any GOLD ounces, please buy them.");
      }
    } else {
      this.ShowToast("You can sell gold one time during turn.", 800);
    }
  },
  OnSellStockClicked_TurnDecision: function OnSellStockClicked_TurnDecision() {
    if (!this.StockSold) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount > 0) {
        this.StockSold = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.StockSell;
        DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        OnceOrShare = DiceResult * 1000;
        this.AssignData_InvestSell("Sell STOCK", DiceResult, "Each share of stock price is:", OnceOrShare + "/share", "Enter the number of shares of stock you want to SELL", "Total Selling Amount:", OnceOrShare + "*0=0", "SELL", this.InvestSellSetupUI.InvestState);
      } else {
        this.ShowToast("you have not purchased any shares, please buy them.");
      }
    } else {
      this.ShowToast("You can sell stocks one time during turn.", 800);
    }
  },
  OnPartnershipClicked_TurnDecision: function OnPartnershipClicked_TurnDecision() {
    console.log("go into partner ship");
    this.ShowToast("work in progress, coming soon...");
  },
  OnRollDiceClicked_TurnDecision: function OnRollDiceClicked_TurnDecision() {
    console.log("roll the dice");
    this.ToggleDecision_TurnDecision(false);
    GamePlayReferenceManager.Instance.Get_GameManager().RollDice();
  },
  PrintDiceValue_TurnDecision: function PrintDiceValue_TurnDecision(value) {
    this.TempDiceText.string = value;
  },
  //#endregion
  //#region Invest and sell moddule
  ResetGoldInput: function ResetGoldInput() {
    this.TurnDecisionSetupUI.GoldEditBox.string = "";
    GoldCashAmount = "";
  },
  ResetStockBusinessNameInput: function ResetStockBusinessNameInput() {
    this.TurnDecisionSetupUI.StockEditBox.string = "";
    StockBusinessName = "";
  },
  onAmountChanged_InvestSell: function onAmountChanged_InvestSell(_amount) {
    EnterBuySellAmount = _amount;

    if (EnterBuySellAmount == "") {
      this.UpdateData_InvestSell(OnceOrShare + "*0=0");
    } else {
      var _amount = parseInt(EnterBuySellAmount);

      var _amount = OnceOrShare * _amount;

      this.UpdateData_InvestSell(OnceOrShare + "*" + EnterBuySellAmount + "=" + _amount);
    }
  },
  ToggleInvestSellScreen_InvestSell: function ToggleInvestSellScreen_InvestSell(_state) {
    this.InvestSellScreen.active = _state;
    this.UpdateCash_TurnDecision();
    this.ResetGoldInput();
    this.ResetStockBusinessNameInput();
  },
  AssignData_InvestSell: function AssignData_InvestSell(_title, _diceResult, _priceTitle, _priceValue, _buyOrSellTitle, _totalAmountTitle, _totalAmountValue, _buttonName, _state) {
    this.CheckReferences();
    this.InvestSellSetupUI.AmountEditBox.string = "";
    this.InvestSellSetupUI.TitleLabel.string = _title;
    this.InvestSellSetupUI.DiceResultLabel.string = _diceResult;
    this.InvestSellSetupUI.PriceTitleLabel.string = _priceTitle;
    this.InvestSellSetupUI.PriceValueLabel.string = _priceValue;
    this.InvestSellSetupUI.BuyOrSellTitleLabel.string = _buyOrSellTitle;
    this.InvestSellSetupUI.TotalAmountTitleLabel.string = _totalAmountTitle;
    this.InvestSellSetupUI.TotalAmountValueLabel.string = _totalAmountValue;
    this.InvestSellSetupUI.ButtonNameLabel.string = _buttonName;
  },
  UpdateData_InvestSell: function UpdateData_InvestSell(_totalAmountValue) {
    this.InvestSellSetupUI.TotalAmountValueLabel.string = _totalAmountValue;
  },
  ApplyButton_InvestSell: function ApplyButton_InvestSell() {
    var _this2 = this;

    if (EnterBuySellAmount == "") {
      this.ShowToast("Please enter an amount.");
    } else {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (this.InvestSellSetupUI.InvestState == InvestEnum.GoldInvest) {
        var _amount = parseInt(EnterBuySellAmount);

        var _TotalAmount = OnceOrShare * _amount;

        if (_TotalAmount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount + _amount;
          this.ShowToast("You have successfully bought " + _amount + " ounces of GOLD", 1400);
          setTimeout(function () {
            _this2.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("You don't have enough cash.");
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.GoldSell) {
        var _amount = parseInt(EnterBuySellAmount);

        if (_amount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount) {
          var _TotalAmount = OnceOrShare * _amount;

          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount - _amount;
          this.ShowToast("You have successfully sold " + _amount + " ounces of GOLD for  $" + _TotalAmount, 1400);
          setTimeout(function () {
            _this2.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("you don't have enough GOLD ounces, you own " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount + " of GOLD ounces");
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.StockInvest) {
        var _amount = parseInt(EnterBuySellAmount);

        var _TotalAmount = OnceOrShare * _amount;

        if (_TotalAmount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount + _amount; //can add multiple stocks with business name in object if required

          this.ShowToast("You have successfully bought " + _amount + " shares of business " + StockBusinessName, 1400);
          setTimeout(function () {
            _this2.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("You don't have enough cash.");
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.StockSell) {
        var _amount = parseInt(EnterBuySellAmount);

        if (_amount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount) {
          var _TotalAmount = OnceOrShare * _amount;

          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount - _amount;
          this.ShowToast("You have successfully sold " + _amount + " shares of stock for  $" + _TotalAmount, 1400);
          setTimeout(function () {
            _this2.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("you don't have enough stocks shares, you own " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount + " of stock shares");
        }
      }
    }
  },
  ExitButton_InvestSell: function ExitButton_InvestSell() {
    this.ToggleInvestSellScreen_InvestSell(false);
  },
  //#endregion
  //#region Payday or Double pay Day
  TogglePayDayScreen_PayDay: function TogglePayDayScreen_PayDay(_state) {
    this.PayDayScreen.active = _state;
  },
  ToggleResultPanelScreen_PayDay: function ToggleResultPanelScreen_PayDay(_state) {
    this.PayDaySetupUI.ResultPanelNode.active = _state;
  },
  UpdateButtons_PayDay: function UpdateButtons_PayDay(HMAmount, BMAmount, loanTaken) {
    if (HMAmount == 0) {
      HomeBasedPaymentCompleted = true;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = false;
    } else {
      HomeBasedPaymentCompleted = false;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = true;
    }

    if (BMAmount == 0) {
      BrickMortarPaymentCompleted = true;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = false;
    } else {
      BrickMortarPaymentCompleted = false;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = true;
    }

    if (!loanTaken) {
      LoanPayed = true;
      this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;
    } else {
      LoanPayed = false;
      this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = true;
    }
  },
  GetLoanAmount_PayDay: function GetLoanAmount_PayDay() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _loan = 0;

    for (var index = 0; index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loan = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount;
        break;
      }
    }

    return _loan;
  },
  AssignData_PayDay: function AssignData_PayDay(_title, _isDoublePayDay, _skipHM, _skipBM) {
    var _this3 = this;

    if (_isDoublePayDay === void 0) {
      _isDoublePayDay = false;
    }

    if (_skipHM === void 0) {
      _skipHM = false;
    }

    if (_skipBM === void 0) {
      _skipBM = false;
    }

    DoublePayDay = _isDoublePayDay;
    this.TogglePayDayScreen_PayDay(true);
    this.PayDaySetupUI.TitleLabel.string = _title;
    var _time = 1800; //check skip payday variables

    if (_skipHM && _skipBM) this.ShowToast("your payday on home based and brick & mortar businessess will be skipped.", _time);else if (_skipHM) this.ShowToast("your payday on home based businessess will be skipped.", _time);else if (_skipBM) this.ShowToast("your payday on brick & mortar businessess will be skipped.", _time);

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

    var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

    var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

    var _loanTaken = false;
    var _businessIndex = 0;

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    var loanTaken = _loanTaken;
    this.PayDaySetupUI.HomeBasedNumberLabel.string = HMAmount;
    this.PayDaySetupUI.BMNumberLabel.string = BMAmount;
    this.PayDaySetupUI.BMNumberLocationLabel.string = BMLocations;

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber(); //check if loan was skipped previously


    if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) {
      var _loan = this.GetLoanAmount_PayDay();

      this.PayDaySetupUI.LoanFotterLabel.string = "*pay $" + _loan;
    } else {
      this.PayDaySetupUI.LoanFotterLabel.string = "*pay $5000";
    } //check skip payday variables


    if (_skipHM && _skipBM) this.UpdateButtons_PayDay(0, 0, loanTaken);else if (_skipHM) this.UpdateButtons_PayDay(0, BMAmount, loanTaken);else if (_skipBM) this.UpdateButtons_PayDay(HMAmount, 0, loanTaken);else this.UpdateButtons_PayDay(HMAmount, BMAmount, loanTaken);

    if (_skipBM || _skipHM) {
      setTimeout(function () {
        _this3.PayDayCompleted();
      }, _time + 200);
    }
  },
  OnHomeBasedPaymentClicked_PayDay: function OnHomeBasedPaymentClicked_PayDay() {
    if (!HomeBasedPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);
      if (!DoublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      HomeBasedPaymentCompleted = true;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = false;

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollOneDice();

      if (!DoublePayDay) TotalPayDayAmount = HMAmount * _dice * 1000;else TotalPayDayAmount = 2 * (HMAmount * _dice) * 1000;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;
      if (!DoublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + HMAmount + "*" + "1000=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + HMAmount + "*" + "1000*2=" + TotalPayDayAmount;
    }
  },
  OnBMPaymentClicked_PayDay: function OnBMPaymentClicked_PayDay() //brick and mortar
  {
    if (!BrickMortarPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);
      if (!DoublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      BrickMortarPaymentCompleted = true;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = false;

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

      var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

      var _amount = BMAmount + BMLocations;

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();

      if (!DoublePayDay) TotalPayDayAmount = _amount * _dice * 2000;else TotalPayDayAmount = 2 * (_amount * _dice) * 2000;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;
      if (!DoublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + _amount + "*" + "2000=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + _amount + "*" + "2000*2=" + TotalPayDayAmount;
    }
  },
  OnLoanPaymentClicked_PayDay: function OnLoanPaymentClicked_PayDay() //brick and mortar
  {
    if (!LoanPayed) {
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var _EstimateLoan = 0;
      if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) _EstimateLoan = this.GetLoanAmount_PayDay();else _EstimateLoan = 5000;

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= _EstimateLoan) {
        LoanPayed = true;
        this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _EstimateLoan;
        var _loanTaken = false;
        var _businessIndex = 0;

        for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
          if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
            _loanTaken = true;
            _businessIndex = index;
            break;
          }
        }

        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount - _EstimateLoan;

        if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount <= 0) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = 0;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanTaken = false;
        }

        if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) _manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment = false;
        this.PayDayCompleted();
      } else {
        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = false;else this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = true;
        this.PayDaySetupUI.LoanResultPanelNode.active = true;
      }
    }
  },
  ReceivePayment_PayDay: function ReceivePayment_PayDay() //all
  {
    var _this4 = this;

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + TotalPayDayAmount;
    this.ShowToast("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash, 1500);
    setTimeout(function () {
      _this4.ToggleResultPanelScreen_PayDay(false);

      _this4.PayDayCompleted();
    }, 1550);
  },
  SkipLoanOneTime_PayDay: function SkipLoanOneTime_PayDay() {
    this.ShowToast("You have skipped the loan payment, bank will call upon complete loan amount on next payday", 2000);

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    _manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment = true;
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
    LoanPayed = true;
    this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;
    this.PayDayCompleted();
    LoanPayed = true;
  },
  SellBusiness_PayDay: function SellBusiness_PayDay() {
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
    this.EnableSellScreen__SellBusinessUISetup(false);
  },
  ExitLoanScreen_PayDay: function ExitLoanScreen_PayDay() {
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
  },
  PayDayCompleted: function PayDayCompleted() {
    if (HomeBasedPaymentCompleted && BrickMortarPaymentCompleted && LoanPayed) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      console.log("all payday done");
      this.TogglePayDayScreen_PayDay(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false, false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().callUponCard();
    }
  },
  //#endregion
  //#region Sell Business UI
  ToggleSellBusinessScreen_SellBusinessUISetup: function ToggleSellBusinessScreen_SellBusinessUISetup(_state) {
    this.SellBusinessScreen.active = _state;
  },
  SetBusinessUI_SellBusinessUISetup: function SetBusinessUI_SellBusinessUISetup() {
    this.Reset_SellBusinessUISetup();

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = _manager.PlayerGameInfo[_playerIndex];
    this.SellBusinessSetupUI.TitleLabel.string = "SELL";
    this.SellBusinessSetupUI.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.SellBusinessSetupUI.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;
    this.SellBusinessSetupUI.BusinessCountLabel.string = "No of Businesses : " + _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.SellBusinessSetupUI.BusinessSellPrefab);
      node.parent = this.SellBusinessSetupUI.ScrollContentNode;
      node.getComponent('BusinessDetail').CheckReferences();
      node.getComponent('BusinessDetail').SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent('BusinessDetail').SetBusinessIndex(index);

      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) {
        node.getComponent('BusinessDetail').SetBusinessMode(1);
        node.getComponent('BusinessDetail').SetMode("Home Based");
      } else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) {
        node.getComponent('BusinessDetail').SetBusinessMode(2);
        node.getComponent('BusinessDetail').SetMode("Brick & Mortar");
      }

      node.getComponent('BusinessDetail').SetBalance(_tempData.NoOfBusiness[index].Amount);
      node.getComponent('BusinessDetail').SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);
      if (_tempData.NoOfBusiness[index].LocationsName.length == 0) node.getComponent('BusinessDetail').ToggleSellLocationButton(false);else node.getComponent('BusinessDetail').ToggleSellLocationButton(true);
      businessDetailNodes.push(node);
    }
  },
  Reset_SellBusinessUISetup: function Reset_SellBusinessUISetup() {
    for (var index = 0; index < businessDetailNodes.length; index++) {
      businessDetailNodes[index].destroy();
    }

    businessDetailNodes = [];
  },
  EnableSellScreen__SellBusinessUISetup: function EnableSellScreen__SellBusinessUISetup(_isTurnover) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    if (_isTurnover) {
      this.SellBusinessSetupUI.ExitButton.active = false;
      this.SellBusinessSetupUI.TurnOverExitButton.active = true;
    } else {
      this.SellBusinessSetupUI.ExitButton.active = true;
      this.SellBusinessSetupUI.TurnOverExitButton.active = false;
    }

    this.ToggleSellBusinessScreen_SellBusinessUISetup(true);
    this.SetBusinessUI_SellBusinessUISetup();
  },
  ExitSellScreen__SellBusinessUISetup: function ExitSellScreen__SellBusinessUISetup() {
    this.Reset_SellBusinessUISetup();
    this.ToggleSellBusinessScreen_SellBusinessUISetup(false);
  },
  ExitSellScreenAlongTurnOver__SellBusinessUISetup: function ExitSellScreenAlongTurnOver__SellBusinessUISetup() {
    this.Reset_SellBusinessUISetup();
    this.ToggleSellBusinessScreen_SellBusinessUISetup(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  //#region Invest UI
  ToggleInvestScreen_InvestSetupUI: function ToggleInvestScreen_InvestSetupUI(_state) {
    this.InvestScreen.active = _state;
  },
  EnableInvest_InvestSetupUI: function EnableInvest_InvestSetupUI(_isTurnover) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    this.ResetTurnVariable();
    this.ToggleInvestScreen_InvestSetupUI(true);
    this.SetInvestUI_InvestSetupUI(_isTurnover);
  },
  SetInvestUI_InvestSetupUI: function SetInvestUI_InvestSetupUI(_isTurnover) {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    this.InvestSetupUI.TitleLabel.string = "INVEST";
    this.InvestSetupUI.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.InvestSetupUI.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;

    if (_isTurnover) {
      this.InvestSetupUI.ExitButton.active = false;
      this.InvestSetupUI.TurnOverExitButton.active = true;
    } else {
      this.InvestSetupUI.ExitButton.active = true;
      this.InvestSetupUI.TurnOverExitButton.active = false;
    }
  },
  ExitInvest_InvestSetupUI: function ExitInvest_InvestSetupUI() {
    this.ToggleInvestScreen_InvestSetupUI(false);
  },
  ExitInvestAlongTurnOver_InvestSetupUI: function ExitInvestAlongTurnOver_InvestSetupUI() {
    this.ToggleInvestScreen_InvestSetupUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  //#region BuyORSell UI
  ToggleBuyOrSellScreen_BuyOrSellSetupUI: function ToggleBuyOrSellScreen_BuyOrSellSetupUI(_state) {
    this.BuyOrSellScreen.active = _state;
  },
  EnableBuyOrSell_BuyOrSellSetupUI: function EnableBuyOrSell_BuyOrSellSetupUI(_isTurnover) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    this.ResetTurnVariable();
    this.ToggleBuyOrSellScreen_BuyOrSellSetupUI(true);
    this.SetBuyOrSellUI_BuyOrSellSetupUI(_isTurnover);
  },
  SetBuyOrSellUI_BuyOrSellSetupUI: function SetBuyOrSellUI_BuyOrSellSetupUI(_isTurnover) {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    this.BuyOrSellSetupUI.TitleLabel.string = "BUY OR SELL";
    this.BuyOrSellSetupUI.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.BuyOrSellSetupUI.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;

    if (_isTurnover) {
      this.BuyOrSellSetupUI.ExitButton.active = false;
      this.BuyOrSellSetupUI.TurnOverExitButton.active = true;
    } else {
      this.BuyOrSellSetupUI.ExitButton.active = true;
      this.BuyOrSellSetupUI.TurnOverExitButton.active = false;
    }
  },
  ExitSellOrBuy_BuyOrSellSetupUI: function ExitSellOrBuy_BuyOrSellSetupUI() {
    this.ToggleBuyOrSellScreen_BuyOrSellSetupUI(false);
  },
  ExitSellOrBuyAlongTurnOver_BuyOrSellSetupUI: function ExitSellOrBuyAlongTurnOver_BuyOrSellSetupUI() {
    this.ToggleBuyOrSellScreen_BuyOrSellSetupUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  ShowToast: function ShowToast(message, time) {
    if (time === void 0) {
      time = 2250;
    }

    this.PopUpUI.active = true;
    this.PopUpUI.children[2].children[1].getComponent(cc.Label).string = message;
    var SelfToast = this;
    setTimeout(function () {
      SelfToast.PopUpUI.active = false;
    }, time);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJMb2FuQW1vdW50RW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJUZW5UaG91c2FuZCIsIlRlbnR5VGhvdXNhbmQiLCJUaGlydHlUaG91c2FuZCIsIkZvcnR5VGhvdXNhbmQiLCJGaWZ0eVRob3VzYW5kIiwiT3RoZXIiLCJCdXNpbmVzc1NldHVwVUkiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZVVJIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUGxheWVyQ2FzaFVJIiwiQnVzaW5lc3NUeXBlVGV4dFVJIiwiVGV4dCIsIkJ1c2luZXNzTmFtZVRleHRVSSIsIkJ1c2luZXNzVHlwZUxhYmVsIiwiRWRpdEJveCIsIkJ1c2luZXNzTmFtZUxhYmVsIiwiSG9tZUJhc2VkTm9kZVVJIiwiTm9kZSIsIkJyaWNrQW5kTW9ydGFyTm9kZVVJIiwiVGltZXJVSSIsIlRpbWVyTm9kZSIsIkJ1c2luZXNzU2V0dXBOb2RlIiwiTG9hblNldHVwTm9kZSIsIkxvYW5BbW91bnQiLCJMb2FuQW1vdW50TGFiZWwiLCJXYWl0aW5nU3RhdHVzTm9kZSIsIkV4aXRCdXR0b25Ob2RlIiwiY3RvciIsIkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cCIsInN0cmluZyIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJNYXJrZXRpbmdFZGl0Qm94IiwiR29sZEVkaXRCb3giLCJTdG9ja0VkaXRCb3giLCJDYXNoQW1vdW50TGFiZWwiLCJFeHBhbmRCdXNpbmVzc05vZGUiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIlByZWZhYiIsIkludmVzdEVudW0iLCJTdG9ja0ludmVzdCIsIkdvbGRJbnZlc3QiLCJTdG9ja1NlbGwiLCJHb2xkU2VsbCIsIkludmVzdFNlbGxVSSIsIlRpdGxlTGFiZWwiLCJEaWNlUmVzdWx0TGFiZWwiLCJQcmljZVRpdGxlTGFiZWwiLCJQcmljZVZhbHVlTGFiZWwiLCJCdXlPclNlbGxUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRWYWx1ZUxhYmVsIiwiQnV0dG9uTmFtZUxhYmVsIiwiSW52ZXN0U3RhdGUiLCJBbW91bnRFZGl0Qm94IiwiU2VsbEJ1c2luZXNzVUkiLCJDYXNoTGFiZWwiLCJQbGF5ZXJOYW1lTGFiZWwiLCJCdXNpbmVzc0NvdW50TGFiZWwiLCJTY3JvbGxDb250ZW50Tm9kZSIsIkJ1c2luZXNzU2VsbFByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJQbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllckJ1c2luZXNzRGF0YUludGFuY2UiLCJSZXF1aXJlZENhc2giLCJJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCIsIlRlbXBNYXJrZXRpbmdBbW91bnQiLCJUZW1wSGlyaW5nTGF3eWVyIiwiR29sZENhc2hBbW91bnQiLCJFbnRlckJ1eVNlbGxBbW91bnQiLCJTdG9ja0J1c2luZXNzTmFtZSIsIkRpY2VSZXN1bHQiLCJPbmNlT3JTaGFyZSIsIkxvY2F0aW9uTmFtZSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJQb3BVcFVJIiwiR2FtZXBsYXlVSVNjcmVlbiIsIkRlY2lzaW9uU2NyZWVuIiwiSW52ZXN0U2VsbFNjcmVlbiIsIlBheURheVNjcmVlbiIsIlNlbGxCdXNpbmVzc1NjcmVlbiIsIkludmVzdFNjcmVlbiIsIkJ1eU9yU2VsbFNjcmVlbiIsIlRlbXBEaWNlVGV4dCIsIkxlYXZlUm9vbUJ1dHRvbiIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdvbGRJbnZlc3RlZCIsIkdvbGRTb2xkIiwiU3RvY2tJbnZlc3RlZCIsIlN0b2NrU29sZCIsIlJlc2V0VHVyblZhcmlhYmxlIiwicmVxdWlyZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlN5bmNEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwic3RhcnQiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsImFjdGl2ZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIl9zdGF0ZSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiaXNGaXJzdFRpbWUiLCJpbnNpZGVHYW1lIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkJ1c2luZXNzSW5mbyIsIkNhc2giLCJSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwIiwiaW5kZXgiLCJHZXRfR2FtZU1hbmFnZXIiLCJQbGF5ZXJHYW1lSW5mbyIsImxlbmd0aCIsIlN0dWRlbnREYXRhIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJQbGF5ZXJOYW1lIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIm5vbmUiLCJPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJIb21lQmFzZWQiLCJPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsImJyaWNrQW5kbW9ydGFyIiwiYW1vdW50IiwiQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiTm9PZkJ1c2luZXNzIiwiTG9hblRha2VuIiwiU2hvd1RvYXN0IiwiTWF0aCIsImFicyIsInBhcnNlSW50IiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiX2RhdGEiLCJfSUQiLCJQaG90b25BY3RvciIsImFjdG9yTnIiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYW1vdW50IiwiX2J1c2luZXNzTmFtZSIsIl9pc0hvbWVCYXNlZCIsIkhvbWVCYXNlZEFtb3VudCIsIlN0YXJ0R2FtZSIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiRXhpdF9CdXNpbmVzc1NldHVwIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJSYWlzZUV2ZW50IiwiU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJQYXlBbW91bnRUb1BsYXlHYW1lIiwiSXNCb3QiLCJpc2FjdGl2ZSIsIlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uIiwiR2V0VHVybk51bWJlciIsIk9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbiIsIl9wbGF5ZXJJbmRleCIsIm1hcmtldGluZ0Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIk9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJMYXd5ZXJTdGF0dXMiLCJvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiZ2VuZXJhdGVkTGVuZ3RoIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGREaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwiLCJSb2xsVHdvRGljZXMiLCJBc3NpZ25EYXRhX0ludmVzdFNlbGwiLCJPblN0b2NrQnVzaW5lc3NOYW1lQ2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR29sZENvdW50IiwiT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlN0b2NrQ291bnQiLCJPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiUmVzZXRHb2xkSW5wdXQiLCJvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbCIsIlVwZGF0ZURhdGFfSW52ZXN0U2VsbCIsIl90aXRsZSIsIl9kaWNlUmVzdWx0IiwiX3ByaWNlVGl0bGUiLCJfcHJpY2VWYWx1ZSIsIl9idXlPclNlbGxUaXRsZSIsIl90b3RhbEFtb3VudFRpdGxlIiwiX3RvdGFsQW1vdW50VmFsdWUiLCJfYnV0dG9uTmFtZSIsIkFwcGx5QnV0dG9uX0ludmVzdFNlbGwiLCJfVG90YWxBbW91bnQiLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJITUFtb3VudCIsIkJNQW1vdW50IiwibG9hblRha2VuIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwiR2V0TG9hbkFtb3VudF9QYXlEYXkiLCJfbWFuYWdlciIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl90aW1lIiwiQk1Mb2NhdGlvbnMiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBheURheUNvbXBsZXRlZCIsIk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RpY2UiLCJSb2xsT25lRGljZSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfRXN0aW1hdGVMb2FuIiwiUmVjZWl2ZVBheW1lbnRfUGF5RGF5IiwiU2tpcExvYW5PbmVUaW1lX1BheURheSIsIlNlbGxCdXNpbmVzc19QYXlEYXkiLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdExvYW5TY3JlZW5fUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlRvZ2dsZVBheURheSIsImNhbGxVcG9uQ2FyZCIsIlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwIiwiU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwIiwiUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIl90ZW1wRGF0YSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldE5hbWUiLCJTZXRUeXBlIiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldEJ1c2luZXNzTW9kZSIsIlNldE1vZGUiLCJTZXRCYWxhbmNlIiwiQW1vdW50IiwiU2V0TG9jYXRpb25zIiwiTG9jYXRpb25zTmFtZSIsIlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbiIsImRlc3Ryb3kiLCJfaXNUdXJub3ZlciIsIkV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiY29tcGxldGVDYXJkVHVybiIsIlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJIiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSIsIlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSIsIm1lc3NhZ2UiLCJ0aW1lIiwiU2VsZlRvYXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUMsRUFBeEIsRUFDQTs7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0Ms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LEtBQTVDO0FBQ0gsR0FsNEMwQjtBQW80QzNCSSxFQUFBQSwyQ0FwNEMyQix5REFxNEMzQjtBQUNJLFNBQUtKLHNDQUFMLENBQTRDLEtBQTVDO0FBQ0FoVyxJQUFBQSx3QkFBd0IsQ0FBQ29KLFFBQXpCLENBQWtDbUIsZUFBbEMsR0FBb0RtTCxnQkFBcEQ7QUFDSCxHQXg0QzBCO0FBeTRDM0I7QUFFQXJKLEVBQUFBLFNBQVMsRUFBQyxtQkFBU2dLLE9BQVQsRUFBaUJDLElBQWpCLEVBQ1Y7QUFBQSxRQUQyQkEsSUFDM0I7QUFEMkJBLE1BQUFBLElBQzNCLEdBRGdDLElBQ2hDO0FBQUE7O0FBQ0ksU0FBS2hQLE9BQUwsQ0FBYTBCLE1BQWIsR0FBb0IsSUFBcEI7QUFDQSxTQUFLMUIsT0FBTCxDQUFhaUUsUUFBYixDQUFzQixDQUF0QixFQUF5QkEsUUFBekIsQ0FBa0MsQ0FBbEMsRUFBcUNrQixZQUFyQyxDQUFrRHRNLEVBQUUsQ0FBQ2dCLEtBQXJELEVBQTREdUIsTUFBNUQsR0FBbUUyVCxPQUFuRTtBQUNBLFFBQUlFLFNBQVMsR0FBQyxJQUFkO0FBQ0EvTSxJQUFBQSxVQUFVLENBQUMsWUFBVTtBQUFHK00sTUFBQUEsU0FBUyxDQUFDalAsT0FBVixDQUFrQjBCLE1BQWxCLEdBQXlCLEtBQXpCO0FBQWlDLEtBQS9DLEVBQWlEc04sSUFBakQsQ0FBVjtBQUNIO0FBajVDMEIsQ0FBVCxDQUF0QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxOb2Rlcz1bXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGFtb3VudCBvZiBsb2FuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBMb2FuQW1vdW50RW51bSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgVGVuVGhvdXNhbmQ6IDEwMDAwLCAgICAgICAgICAgICAgICAgIFxyXG4gICAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgICBUaGlydHlUaG91c2FuZDogMzAwMDAsXHJcbiAgICBGb3J0eVRob3VzYW5kOiA0MDAwMCxcclxuICAgIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gICAgT3RoZXI6NlxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkJ1c2luZXNzU2V0dXBVSVwiLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWVVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZVVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIG5hbWVcIix9LFxyXG4gICAgUGxheWVyQ2FzaFVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJDYXNoVUlcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgY2FzaFwiLH0sXHJcbiAgICBCdXNpbmVzc1R5cGVUZXh0VUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgdG9vbHRpcDpcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsfSxcclxuICAgIEJ1c2luZXNzTmFtZVRleHRVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgICB0b29sdGlwOlwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIG5hbWVcIix9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzVHlwZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHR5cGUgZWRpdGJveFwiLH0sXHJcbiAgICBCdXNpbmVzc05hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIix9LFxyXG4gICAgSG9tZUJhc2VkTm9kZVVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJIb21lQmFzZWROb2RlVUlcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc1wiLH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tBbmRNb3J0YXJOb2RlVUlcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc1wiLH0sXHJcbiAgICBUaW1lclVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaW1lclVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIix9LFxyXG4gICAgVGltZXJOb2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUaW1lck5vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciB0aW1lciBub2RlIGluIGJ1c2luZXNzIHNldHVwXCJ9LCBcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLH0sXHJcbiAgICBMb2FuU2V0dXBOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJMb2FuU2V0dXBOb2RlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGxvYW4gc2V0dXBcIix9LFxyXG4gICAgTG9hbkFtb3VudDpcclxuICAgIHtcclxuICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRcIixcclxuICAgICAgICB0eXBlOiBMb2FuQW1vdW50RW51bSxcclxuICAgICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOlwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwifSwgXHJcbiAgICBMb2FuQW1vdW50TGFiZWw6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRMYWJlbFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIGFsbCBsYWJlbHMgb2YgYW1vdW50cyBpbiBsb2FuIFVJXCJ9LCBcclxuICAgIFdhaXRpbmdTdGF0dXNOb2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIHdhaXRpbmcgc3RhdHVzIHNjcmVlbiBvbiBpbml0aWFsIGJ1c2luZXNzIHNldHVwXCJ9LCBcclxuICAgIEV4aXRCdXR0b25Ob2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uTm9kZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIn0sIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3IvL1xyXG4gICAgfSxcclxuXHJcbiAgICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nPW5hbWU7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHVybkRlY2lzaW9uU2V0dXBVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiVHVybkRlY2lzaW9uU2V0dXBVSVwiLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1hcmtldGluZ0VkaXRCb3hcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBtYXJrZXRpbmcgbm9kZVwiLH0sXHJcbiAgICBHb2xkRWRpdEJveDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiR29sZEVkaXRCb3hcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsfSwgXHJcbiAgICBTdG9ja0VkaXRCb3g6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsfSxcclxuICAgIENhc2hBbW91bnRMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byBjYXNoIG5vZGVcIix9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeHBhbmRCdXNpbmVzc05vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwifSwgXHJcbiAgICBFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIGNvbnRlbnQgbm9kZSBvZiBzY3JvbGwgdmlldyBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwifSwgICBcclxuICAgIEV4cGFuZEJ1c2luZXNzUHJlZmFiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSBmb3IgcHJlZmFiIG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCJ9LCAgICAgICAgICAgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmc9bmFtZTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBTdG9ja0ludmVzdDogMSwgICAgICAgICAgICAgICAgICBcclxuICAgIEdvbGRJbnZlc3Q6IDIsXHJcbiAgICBTdG9ja1NlbGw6IDMsXHJcbiAgICBHb2xkU2VsbDogNCxcclxuICAgIE90aGVyOjVcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0U2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RTZWxsVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkludmVzdFNlbGxVSVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkRpY2VSZXN1bHRcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2UgUmVzdWx0IG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBQcmljZVRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlByaWNlVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBQcmljZVZhbHVlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlByaWNlVmFsdWVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIHZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBCdXlPclNlbGxUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXlPclNlbGxUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnV5T3JTZWxsIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBUb3RhbEFtb3VudFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsQW1vdW50VGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBCdXR0b25OYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGJ1dHRvbiBuYW1lIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICAgSW52ZXN0U3RhdGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkludmVzdFN0YXRlXCIsXHJcbiAgICAgICB0eXBlOiBJbnZlc3RFbnVtLFxyXG4gICAgICAgZGVmYXVsdDogSW52ZXN0RW51bS5Ob25lLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlfSxcclxuICAgICBBbW91bnRFZGl0Qm94OlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJBbW91bnRFZGl0Qm94XCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxsQnVzaW5lc3NVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsbEJ1c2luZXNzVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlNlbGxCdXNpbmVzc1VJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgU2VsbCBub2RlXCJ9LCAgIFxyXG4gICAgQ2FzaExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJDYXNoTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCJ9LCAgIFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwifSwgXHJcbiAgICBCdXNpbmVzc0NvdW50TGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCJ9LCAgXHJcbiAgICBTY3JvbGxDb250ZW50Tm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCJ9LCAgXHJcbiAgICBCdXNpbmVzc1NlbGxQcmVmYWI6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzU2VsbFByZWZhYlwiLFxyXG4gICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc1NlbGxQcmVmYWIgb2YgU2VsbCBub2RlXCJ9LCAgICBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwifSwgIFxyXG4gICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCJ9LCAgXHJcbn0sXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7Ly9jb25zdHJ1Y3RvclxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQYXlEYXlVSVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFBheURheSBub2RlXCJ9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkhvbWVCYXNlZE51bWJlclwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkTnVtYmVyIG5vZGVcIn0sXHJcbiAgICAgQk1OdW1iZXJMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIn0sXHJcbiAgICAgQk1OdW1iZXJMb2NhdGlvbkxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja01vcnRhckxvY2F0aW9uc1wiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJMb2NhdGlvbnMgbm9kZVwifSxcclxuICAgIEhvbWVCYXNlZEJ0bjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCJ9LFxyXG4gICAgQk1CdG46XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrTW9ydGFyQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyQnRuIG5vZGVcIn0sXHJcbiAgICBMb2FuQnRuOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwifSxcclxuICAgIE1haW5QYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIn0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRQYW5lbCBub2RlXCJ9LFxyXG4gICAgTG9hblJlc3VsdFBhbmVsTm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuUmVzdWx0UGFuZWxOb2RlIG5vZGVcIn0sXHJcbiAgICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUmVzdWx0U2NyZWVuVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFNjcmVlblRpdGxlIG5vZGVcIn0sXHJcbiAgICAgRGljZVJlc3VsdExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIn0sXHJcbiAgIFRvdGFsQnVzaW5lc3NMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIn0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEFtb3VudExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBub2RlXCJ9LFxyXG4gICAgU2tpcExvYW5CdXR0b246XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBMb2FuQnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNraXBMb2FuQnV0dG9uIG5vZGVcIn0sXHJcbiAgIExvYW5Gb3R0ZXJMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hbkZvdHRlckxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuRm90dGVyTGFiZWwgbm9kZVwifSxcclxuICAgICAgICAgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiSW52ZXN0VUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEludmVzdCBub2RlXCJ9LCAgIFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEludmVzdCBub2RlXCJ9LCBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCJ9LCAgXHJcbiAgICAgVHVybk92ZXJFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwifSwgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiQnV5T3JTZWxsVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBCdXlPclNlbGwgbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCJ9LCAgIFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCJ9LCBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCJ9LCAgXHJcbiAgICAgVHVybk92ZXJFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwifSwgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD0tMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuLy90dXJuIGRlY2lzaW9uc1xyXG52YXIgVGVtcE1hcmtldGluZ0Ftb3VudD1cIlwiO1xyXG52YXIgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbi8vYnV5b3JzZWxsXHJcbnZhciBHb2xkQ2FzaEFtb3VudD1cIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbnZhciBTdG9ja0J1c2luZXNzTmFtZT1cIlwiO1xyXG52YXIgRGljZVJlc3VsdDtcclxudmFyIE9uY2VPclNoYXJlO1xyXG52YXIgTG9jYXRpb25OYW1lPVwiXCI7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxudmFyIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxudmFyIExvYW5QYXllZD1mYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50PTA7XHJcbnZhciBEb3VibGVQYXlEYXk9ZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkdhbWVwbGF5VUlNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCJ9LFxyXG4gICAgICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIn0sXHJcbiAgICAgICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsfSwgIFxyXG4gICAgICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIix9LCAgXHJcbiAgICAgICAgU2VsbEJ1c2luZXNzU2V0dXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Ont9LCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFNlbGxCdXNpbmVzc1VJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgU2VsbEJ1c2luZXNzVUkgY2xhc3NcIix9LCAgXHJcbiAgICAgICAgSW52ZXN0U2V0dXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Ont9LCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEludmVzdFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgSW52ZXN0VUkgY2xhc3NcIix9LCAgICBcclxuICAgICAgICBCdXlPclNlbGxTZXR1cFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6e30sICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogQnV5T3JTZWxsVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBCdXlPclNlbGxVSSBjbGFzc1wiLH0sICAgICAgICAgICBcclxuICAgICAgICBQb3BVcFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsfSwgICBcclxuICAgICAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgYnVzaW5lc3Mgc2V0dXAgc2NyZWVuXCIsfSwgIFxyXG4gICAgICAgIEdhbWVwbGF5VUlTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIGdhbWVwbGF5IHVpIHNjcmVlblwiLH0sICAgXHJcbiAgICAgICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIERlY2lzaW9uIHNjcmVlblwiLH0sICAgIFxyXG4gICAgICAgIEludmVzdFNlbGxTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCAmIHNlbGwgc2NyZWVuXCIsfSwgICAgXHJcbiAgICAgICAgUGF5RGF5U2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsfSwgICAgXHJcbiAgICAgICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxsQnVzaW5lc3Mgc2NyZWVuXCIsfSwgIFxyXG4gICAgICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0IHNjcmVlblwiLH0sICBcclxuICAgICAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIEJ1eU9yU2VsbCBzY3JlZW5cIix9LCAgXHJcbiAgICAgICAgIFRlbXBEaWNlVGV4dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsfSwgICBcclxuICAgICAgICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LCAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7IFxyXG5cclxuICAgICAgICAgLy9sb2NhbCB2YXJpYWJsZXNcclxuICAgICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgIHRoaXMuR29sZFNvbGQ9ZmFsc2U7XHJcbiAgICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZD1mYWxzZTtcclxuICAgICAgICAgdGhpcy5TdG9ja1NvbGQ9ZmFsc2U7XHJcblxyXG4gICAgIH0sXHJcblxyXG4gICAgIFJlc2V0VHVyblZhcmlhYmxlKClcclxuICAgICB7XHJcbiAgICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZD1mYWxzZTtcclxuICAgICAgICB0aGlzLlN0b2NrSW52ZXN0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQ9ZmFsc2U7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG5cclxuICAgICAgICBpZighR2FtZU1hbmFnZXIgfHwgR2FtZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkIFxyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdTeW5jRGF0YScsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoJ1N5bmNEYXRhJywgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gICAgSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb21CdXR0b24uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIlNwbGFzaFwiKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gQnVzaW5lc3NTZXR1cCB3aXRoIGxvYW5cclxuICAgIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsaW5zaWRlR2FtZT1mYWxzZSkgeyAvL2NhbGxlZCBmaXJzdCB0aW1lIGZvcm0gR2FtZU1hbmFnZXIgb25sb2FkIGZ1bmN0aW9uXHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLGluc2lkZUdhbWUpO1xyXG4gICAgfSxcclxuICAgIEluaXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGlzRmlyc3RUaW1lLGluc2lkZUdhbWU9ZmFsc2UpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZT1uZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U9bmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYoaXNGaXJzdFRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9MjAwMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAoKTtcclxuXHJcbiAgICAgICAgaWYoaW5zaWRlR2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwPWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gpOyAgXHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD0tMTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7IFxyXG4gICAgICAgIH0gXHJcbiAgICB9LCBcclxuICAgIEdldE9ial9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQnVzaW5lc3NTZXR1cERhdGE7XHJcbiAgICB9LFxyXG4gICAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAobmFtZSk7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZT1uYW1lO1xyXG4gICAgfSxcclxuICAgIE9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJVSUQ9VUlEO1xyXG4gICAgfSxcclxuICAgIE9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVST1uYW1lO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb249bmFtZTtcclxuICAgICAgIFxyXG4gICAgfSxcclxuICAgIE9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVST1uYW1lO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lPW5hbWU7XHJcbiAgICB9LFxyXG4gICAgUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlTGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVST1cIlwiO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJPVwiXCI7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5ub25lO1xyXG4gICAgfSxcclxuICAgIE9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gICAgfSxcclxuICAgIE9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcjtcclxuICAgIH0sXHJcbiAgICBPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihhbW91bnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nPVwiJFwiK2Ftb3VudDtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPWFtb3VudDtcclxuICAgIH0sXHJcbiAgICBDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oYW1vdW50KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgIF9idXNpbmVzc0luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihfbG9hblRha2VuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbHJlYWR5IHRha2VuIGxvYW4gb2YgJFwiK1BsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPj1hbW91bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG8gbm90IG5lZWQgbG9hbiwgeW91IGhhdmUgZW5vdWdoIGNhc2ggdG8gYnV5IGN1cnJlbnQgc2VsZWN0ZWQgYnVzaW5lc3MuXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlcXVpcmVkQ2FzaD1NYXRoLmFicyhwYXJzZUludChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKS1hbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiJFwiK1JlcXVpcmVkQ2FzaDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoNTAwMDApO1xyXG4gICAgICAgIH1lbHNlIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDEwMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGJ1c2luZXNzIGJldHdlZW4gSG9tZSBCYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIuIFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlPWZhbHNlOyAgXHJcbiAgICB9LFxyXG4gICAgSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGluZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWwubGVuZ3RoO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGluZGV4PT1pKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMV9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5PdGhlcjtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuXHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMl9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgxKTtcclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMik7XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgzKTtcclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNCk7XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNl9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDUpO1xyXG4gICAgfSxcclxuICAgIE9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD09TG9hbkFtb3VudEVudW0uT3RoZXIpXHJcbiAgICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudD1SZXF1aXJlZENhc2g7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ9cGFyc2VJbnQodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50KTtcclxuXHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICB0aGlzLk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPVBsYXllckRhdGFJbnRhbmNlLkNhc2grUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaClcclxuICAgIH0sXHJcblxyXG4gICAgU3luY0RhdGE6ZnVuY3Rpb24oX2RhdGEsX0lEKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9JRCE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmFjdG9yTnIpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKF9kYXRhKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aD49R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9zZXR0aW5nIHJvb20gcHJvcGVydHkgdG8gZGVjbGFyZSBpbml0aWFsIHNldHVwIGhhcyBiZWVuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIix0cnVlLHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIixHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8sdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZT10cnVlO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFB1cmNoYXNlQnVzaW5lc3M6ZnVuY3Rpb24oX2Ftb3VudCxfYnVzaW5lc3NOYW1lLF9pc0hvbWVCYXNlZClcclxuICAgIHtcclxuICAgICAgICBpZihQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPF9hbW91bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiK19idXNpbmVzc05hbWUrXCIgYnVzaW5lc3MuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKF9pc0hvbWVCYXNlZClcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgaWYoUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50PDMpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaC1fYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmc9XCIkXCIrUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFydEdhbWU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0R2FtZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IG93biBtb3JlIHRoYW4gdGhyZWUgSG9tZSBiYXNlZCBidXNpbmVzc2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaC1fYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZz1cIiRcIitQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRHYW1lPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQnJpY2tBbmRNb3J0YXJBbW91bnQrKztcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRXhpdF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1QbGF5ZXJEYXRhSW50YW5jZS5DYXNoLVBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUmV2ZXJ0aW5nIGJhY2sgbG9hbiBhbW91bnQuXCIsNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vc2V0dGluZyBwbGF5ZXIgY3VycmVudCBkYXRhIGluIGN1c3RvbSBwcm9wZXJ0aWVzIHdoZW4gaGlzL2hlciB0dXJuIG92ZXJzXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMSxQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF09UGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXA9LTE7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFBheUFtb3VudFRvUGxheUdhbWU6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lPWZhbHNlO1xyXG5cclxuICAgICAgICBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uPT1cIlwiKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIHR5cGUuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWU9PVwiXCIpXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKSAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGhvbWViYXNzZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCxcImhvbWVcIix0cnVlKTtcclxuICAgICAgICAgICAgZWxzZSBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT09R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcikgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBicmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoNTAwMDAsXCJicmljayBhbmQgbW9ydGFyXCIsZmFsc2UpO1xyXG5cclxuICAgICAgICBpZih0aGlzLlN0YXJ0R2FtZT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgaWYoSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAhPS0xKSAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICAgICAgZWxzZSAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgYmVlbiBjYWxsZWQgYXQgc3RhcnQgb2YgZ2FtZSBhcyBpbml0aWFsIHNldHVwXHJcbiAgICAgICAgICAgICAgICB0aGlzLkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgICAgICAgICAvL3BydGludGluZyBhbGwgdmFsdWVzIHRvIGNvbnNvbGVcclxuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO2krKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbmFtZTogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgSUQ6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJcyBwbGF5ZXIgYm90OiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uSXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyBvZiBidXNpbmVzcyBvZiBwbGF5ZXIgKHNlZSBiZWxvdyk6IFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY2FzaDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkNhc2gpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgdGFrZW4gbG9hbjogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5UYWtlbik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2VuIGxvYW4gYW1vdW50OiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgICAvL1R1cm5EZWNpc2lvblNldHVwVUkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoaXNhY3RpdmUpIHtcclxuICAgICAgICB0aGlzLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZT1pc2FjdGl2ZTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQ2FzaEFtb3VudExhYmVsLnN0cmluZz1cIiQgXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLkNhc2g7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudD1hbW91bnQ7XHJcbiAgICB9LCBcclxuXHJcbiAgICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKFRlbXBNYXJrZXRpbmdBbW91bnQ9PVwiXCIgfHwgVGVtcE1hcmtldGluZ0Ftb3VudD09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXRpbmdBbW91bnQ9cGFyc2VJbnQoVGVtcE1hcmtldGluZ0Ftb3VudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9pZiBwbGF5ZXIgZW50ZXJlZCBhbW91bnQgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIGNhc2ggaGUgb3duc1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj0gdGhpcy5tYXJrZXRpbmdBbW91bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC0gdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50K3RoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50K1wiICwgcmVtYWluaW5nIGNhc2ggaXMgJFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIE9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBpZiBwbGF5ZXIgaGFzIG1vcmUgdGhhbiA1MDAwJFxyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PTUwMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM9dHJ1ZTtcclxuICAgICAgICAgICAgVGVtcEhpcmluZ0xhd3llcj10cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wSGlyaW5nTGF3eWVyKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLTUwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLCByZW1haW5pbmcgY2FzaCBpcyAkXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtcIi5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJzb3JyeSwgeW91IGRvbnQgaGF2ZSBlbm91Z2ggbW9uZXkgdG8gaGlyZSBhIGxhd3llci5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSlcclxuICAgIHtcclxuICAgICAgICBMb2NhdGlvbk5hbWU9X25hbWU7XHJcbiAgICB9LFxyXG4gICAgT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhcyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGhlIGNvdWxkIGV4cGFuZCBpdFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdmFyIGdlbmVyYXRlZExlbmd0aD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICBpZihnZW5lcmF0ZWRMZW5ndGg9PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgdG8gZXhwYW5kLlwiLDE1MDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxNjAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgTG9jYXRpb25OYW1lPVwiXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgICAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSx0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICAgICAgR29sZENhc2hBbW91bnQ9YW1vdW50O1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuR29sZEludmVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPUludmVzdEVudW0uR29sZEludmVzdDtcclxuICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgIE9uY2VPclNoYXJlPShEaWNlUmVzdWx0KjEwMDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICAgICAgICBcIkludmVzdCBJbiBHT0xEXCIsXHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIi9vdW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIiw4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sIFxyXG5cclxuICAgIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBTdG9ja0J1c2luZXNzTmFtZT1uYW1lO1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZighdGhpcy5TdG9ja0ludmVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBpZihTdG9ja0J1c2luZXNzTmFtZT09XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLlN0b2NrSW52ZXN0O1xyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgICAgICAgICAgICBcIkludmVzdCBpbiBTdG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiL3NoYXJlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBCVVlcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIqMD0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJCVVlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuR29sZFNvbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdvbGRTb2xkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgICAgICAgICAgICBcIlNlbGwgR09MRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIvb3VuY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLlN0b2NrU29sZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b2NrU29sZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9SW52ZXN0RW51bS5TdG9ja1NlbGw7XHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlPShEaWNlUmVzdWx0KjEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiU2VsbCBTVE9DS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFYWNoIHNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiL3NoYXJlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBzaGFyZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIndvcmsgaW4gcHJvZ3Jlc3MsIGNvbWluZyBzb29uLi4uXCIpO1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyb2xsIHRoZSBkaWNlXCIpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbERpY2UoKTtcclxuICAgIH0sIFxyXG5cclxuICAgIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5UZW1wRGljZVRleHQuc3RyaW5nPXZhbHVlO1xyXG4gICAgfSwgXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG5cclxuICAgIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICAgIFJlc2V0R29sZElucHV0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuR29sZEVkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgR29sZENhc2hBbW91bnQ9XCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuU3RvY2tFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgIFN0b2NrQnVzaW5lc3NOYW1lPVwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsKF9hbW91bnQpXHJcbiAgICB7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PV9hbW91bnQ7XHJcblxyXG4gICAgICAgIGlmKEVudGVyQnV5U2VsbEFtb3VudD09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlK1wiKjA9MFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQ9T25jZU9yU2hhcmUqX2Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqXCIrRW50ZXJCdXlTZWxsQW1vdW50K1wiPVwiK19hbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgdGhpcy5SZXNldEdvbGRJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChfdGl0bGUsX2RpY2VSZXN1bHQsX3ByaWNlVGl0bGUsX3ByaWNlVmFsdWUsX2J1eU9yU2VsbFRpdGxlLF90b3RhbEFtb3VudFRpdGxlLF90b3RhbEFtb3VudFZhbHVlLF9idXR0b25OYW1lLF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nPV90aXRsZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmc9X2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVRpdGxlTGFiZWwuc3RyaW5nPV9wcmljZVRpdGxlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZz1fcHJpY2VWYWx1ZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1eU9yU2VsbFRpdGxlTGFiZWwuc3RyaW5nPV9idXlPclNlbGxUaXRsZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VGl0bGVMYWJlbC5zdHJpbmc9X3RvdGFsQW1vdW50VGl0bGU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nPV90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV0dG9uTmFtZUxhYmVsLnN0cmluZz1fYnV0dG9uTmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlRGF0YV9JbnZlc3RTZWxsKF90b3RhbEFtb3VudFZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZz1fdG90YWxBbW91bnRWYWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgQXBwbHlCdXR0b25fSW52ZXN0U2VsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoRW50ZXJCdXlTZWxsQW1vdW50PT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5Hb2xkSW52ZXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD1wYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgaWYoX1RvdGFsQW1vdW50PD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50K19hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiK19hbW91bnQrXCIgb3VuY2VzIG9mIEdPTERcIiwxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5Hb2xkU2VsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgICAgIGlmKF9hbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoK19Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50LV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIitfYW1vdW50K1wiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiK19Ub3RhbEFtb3VudCwxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIEdPTEQgb3VuY2VzLCB5b3Ugb3duIFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCtcIiBvZiBHT0xEIG91bmNlc1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9PUludmVzdEVudW0uU3RvY2tJbnZlc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBpZihfVG90YWxBbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC1fVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCtfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2FuIGFkZCBtdWx0aXBsZSBzdG9ja3Mgd2l0aCBidXNpbmVzcyBuYW1lIGluIG9iamVjdCBpZiByZXF1aXJlZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIrX2Ftb3VudCtcIiBzaGFyZXMgb2YgYnVzaW5lc3MgXCIrU3RvY2tCdXNpbmVzc05hbWUsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5TdG9ja1NlbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKF9hbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQtX2Ftb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIitfYW1vdW50K1wiIHNoYXJlcyBvZiBzdG9jayBmb3IgICRcIitfVG90YWxBbW91bnQsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIHN0b2NrcyBzaGFyZXMsIHlvdSBvd24gXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCtcIiBvZiBzdG9jayBzaGFyZXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRCdXR0b25fSW52ZXN0U2VsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gUGF5ZGF5IG9yIERvdWJsZSBwYXkgRGF5XHJcbiAgICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsQk1BbW91bnQsbG9hblRha2VuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEhNQW1vdW50PT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKEJNQW1vdW50PT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIWxvYW5UYWtlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvYW5QYXllZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvYW5QYXllZD1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZXRMb2FuQW1vdW50X1BheURheSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBfbG9hbj0wO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW49X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2xvYW47XHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSxfaXNEb3VibGVQYXlEYXk9ZmFsc2UsX3NraXBITT1mYWxzZSxfc2tpcEJNPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIERvdWJsZVBheURheT1faXNEb3VibGVQYXlEYXk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1fdGl0bGU7XHJcblxyXG4gICAgICAgIHZhciBfdGltZT0xODAwO1xyXG5cclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYoX3NraXBITSlcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZihfc2tpcEJNKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcblxyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgdmFyIEhNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgdmFyIEJNTG9jYXRpb25zPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgIF9idXNpbmVzc0luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbG9hblRha2VuPV9sb2FuVGFrZW47XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZE51bWJlckxhYmVsLnN0cmluZz1ITUFtb3VudDtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMYWJlbC5zdHJpbmc9Qk1BbW91bnQ7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmc9Qk1Mb2NhdGlvbnM7XHJcblxyXG4gICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIGxvYW4gd2FzIHNraXBwZWQgcHJldmlvdXNseVxyXG4gICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9sb2FuPXRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmc9XCIqcGF5ICRcIitfbG9hbjtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmc9XCIqcGF5ICQ1MDAwXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLDAsbG9hblRha2VuKTtcclxuICAgICAgICBlbHNlIGlmKF9za2lwSE0pXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCxCTUFtb3VudCxsb2FuVGFrZW4pO1xyXG4gICAgICAgIGVsc2UgaWYoX3NraXBCTSlcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwwLGxvYW5UYWtlbik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LEJNQW1vdW50LGxvYW5UYWtlbik7XHJcblxyXG4gICAgICAgIGlmKF9za2lwQk0gfHwgX3NraXBITSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgfSwgKF90aW1lKzIwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIlBheURheVwiO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIkRvdWJsZVBheURheVwiO1xyXG5cclxuICAgICAgICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcblxyXG4gICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICB2YXIgSE1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgIHZhciBfZGljZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PShITUFtb3VudCpfZGljZSkqMTAwMDtcclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBUb3RhbFBheURheUFtb3VudD0yKihITUFtb3VudCpfZGljZSkqMTAwMDtcclxuXHJcblxyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nPUhNQW1vdW50O1xyXG5cclxuICAgICAgICAgICBpZighRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK0hNQW1vdW50K1wiKlwiK1wiMTAwMD1cIitUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrSE1BbW91bnQrXCIqXCIrXCIxMDAwKjI9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIlBheURheVwiO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgIHZhciBfYW1vdW50PUJNQW1vdW50K0JNTG9jYXRpb25zO1xyXG4gICAgICAgICAgIHZhciBfZGljZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PShfYW1vdW50Kl9kaWNlKSoyMDAwO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PTIqKF9hbW91bnQqX2RpY2UpKjIwMDA7XHJcblxyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nPV9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrX2Ftb3VudCtcIipcIitcIjIwMDA9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK19hbW91bnQrXCIqXCIrXCIyMDAwKjI9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIHtcclxuICAgICAgICBpZighTG9hblBheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdmFyICBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTsgICBcclxuICAgICAgICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW49MDtcclxuXHJcbiAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgX0VzdGltYXRlTG9hbj10aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF9Fc3RpbWF0ZUxvYW49NTAwMDtcclxuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PV9Fc3RpbWF0ZUxvYW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExvYW5QYXllZD10cnVlOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC1fRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4PTA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudC1fRXN0aW1hdGVMb2FuO1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PD0wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50PWZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCkgLy9hbGxcclxuICAgIHtcclxuICAgICAgICB2YXIgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIkFtb3VudCAkXCIrVG90YWxQYXlEYXlBbW91bnQrXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDE1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgfSwgMTU1MCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNraXBMb2FuT25lVGltZV9QYXlEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc2tpcHBlZCB0aGUgbG9hbiBwYXltZW50LCBiYW5rIHdpbGwgY2FsbCB1cG9uIGNvbXBsZXRlIGxvYW4gYW1vdW50IG9uIG5leHQgcGF5ZGF5XCIsMjAwMCk7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgTG9hblBheWVkPXRydWU7IFxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICAgIExvYW5QYXllZD10cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsQnVzaW5lc3NfUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdExvYW5TY3JlZW5fUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIFBheURheUNvbXBsZXRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCAmJiBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgJiYgTG9hblBheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBwYXlkYXkgZG9uZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBTZWxsIEJ1c2luZXNzIFVJXHJcbiAgICBUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YT1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmc9XCJTRUxMXCI7XHJcbiAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZz1cIk5vIG9mIEJ1c2luZXNzZXMgOiBcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBpZihfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aD09MClcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxufSxcclxuXHJcbiAgICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNUdXJub3ZlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgfSwgIFxyXG4gICAgXHJcbiAgICBFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LCBcclxuICAgICAgICBcclxuXHJcbiAgXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIEludmVzdCBVSVxyXG4gICAgVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIEVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgICB9LFxyXG4gICAgU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nPVwiSU5WRVNUXCI7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICAgICAgaWYoX2lzVHVybm92ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICAgIFRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1eU9yU2VsbFNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gICAgfSxcclxuICAgIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1cIkJVWSBPUiBTRUxMXCI7XHJcbiAgICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICAgICAgaWYoX2lzVHVybm92ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgU2hvd1RvYXN0OmZ1bmN0aW9uKG1lc3NhZ2UsdGltZT0yMjUwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLlBvcFVwVUkuY2hpbGRyZW5bMl0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bWVzc2FnZTtcclxuICAgICAgICB2YXIgU2VsZlRvYXN0PXRoaXM7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlPWZhbHNlOyB9LCB0aW1lKTtcclxuICAgIH0sXHJcblxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------
