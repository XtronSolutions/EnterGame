
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