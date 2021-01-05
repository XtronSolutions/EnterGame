
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
    contactNumber: "",
    AccessToken: "",
    UpdatedAt: 0,
    userID: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _school, _classTaught, _emailAddress, _contactNumber, _accessToken, _updatedAt, _userID) {
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

    if (_accessToken === void 0) {
      _accessToken = "";
    }

    if (_updatedAt === void 0) {
      _updatedAt = 0;
    }

    if (_userID === void 0) {
      _userID = "";
    }

    this.name = _name;
    this.school = _school;
    this.classTaught = _classTaught;
    this.emailAddress = _emailAddress;
    this.contactNumber = _contactNumber;
    this.AccessToken = _accessToken;
    this.UpdatedAt = _updatedAt;
    this.userID = _userID;
  }
}); //-------------------------------------------class for Program Ambassadors Data-------------------------////

var ProgramAmbassadors = cc.Class({
  name: "ProgramAmbassadors",
  properties: {
    name: "",
    emailAddress: "",
    contactNumber: "",
    address: "",
    AccessToken: "",
    UpdatedAt: 0,
    userID: ""
  },
  //Deafult and Parametrized constructor
  ctor: function ctor(_name, _emailAddress, _contactNumber, _address, _accessToken, _updatedAt, _userID) {
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

    if (_accessToken === void 0) {
      _accessToken = "";
    }

    if (_updatedAt === void 0) {
      _updatedAt = 0;
    }

    if (_userID === void 0) {
      _userID = "";
    }

    this.name = _name;
    this.emailAddress = _emailAddress;
    this.contactNumber = _contactNumber;
    this.address = _address;
    this.AccessToken = _accessToken;
    this.UpdatedAt = _updatedAt;
    this.userID = _userID;
  }
}); //-------------------------------------------class for School Administrators Data-------------------------////

var SchoolAdministrators = cc.Class({
  name: "SchoolAdministrators",
  properties: {
    name: "",
    schoolName: "",
    contactNumber: "",
    emailAddress: "",
    AccessToken: "",
    UpdatedAt: 0,
    userID: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _schoolName, _emailAddress, _contactNumber, _accessToken, _updatedAt, _userID) {
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

    if (_accessToken === void 0) {
      _accessToken = "";
    }

    if (_updatedAt === void 0) {
      _updatedAt = 0;
    }

    if (_userID === void 0) {
      _userID = "";
    }

    this.name = _name;
    this.schoolName = _schoolName;
    this.contactNumber = _contactNumber;
    this.emailAddress = _emailAddress;
    this.AccessToken = _accessToken;
    this.UpdatedAt = _updatedAt;
    this.userID = _userID;
  }
}); //-------------------------------------------class for Program Directors Data-------------------------////

var ProgramDirectors = cc.Class({
  name: "ProgramDirectors",
  properties: {
    name: "",
    emailAddress: "",
    AccessToken: "",
    UpdatedAt: 0,
    userID: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _emailAddress, _accessToken, _updatedAt, _userID) {
    if (_name === void 0) {
      _name = "none";
    }

    if (_emailAddress === void 0) {
      _emailAddress = "none";
    }

    if (_accessToken === void 0) {
      _accessToken = "";
    }

    if (_updatedAt === void 0) {
      _updatedAt = 0;
    }

    if (_userID === void 0) {
      _userID = "";
    }

    this.name = _name;
    this.emailAddress = _emailAddress;
    this.AccessToken = _accessToken;
    this.UpdatedAt = _updatedAt;
    this.userID = _userID;
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
    TeacherData: {
      "default": null,
      type: Teacher,
      serializable: true,
      tooltip: "current logged in teacher data"
    },
    MentorData: {
      "default": null,
      type: ProgramAmbassadors,
      serializable: true,
      tooltip: "current logged in Mentor / ProgramAmbassadors  data"
    },
    AdminData: {
      "default": null,
      type: SchoolAdministrators,
      serializable: true,
      tooltip: "current logged in SchoolAdministrators  data"
    },
    DirectorData: {
      "default": null,
      type: ProgramDirectors,
      serializable: true,
      tooltip: "current logged in ProgramDirectors  data"
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
                        cc.systemEvent.emit("AssignProfileData", true, false, false, false, false);
                      } else if (MainData.data.roleType.includes("Teacher")) {
                        ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                        ServerBackend.Instance.AssignTeacherData(MainData, true);
                        cc.systemEvent.emit("AssignProfileData", false, true, false, false, false);
                      } else if (MainData.data.roleType.includes("ProgramAmbassador")) {
                        ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                        ServerBackend.Instance.AssignMentorData(MainData, true);
                        cc.systemEvent.emit("AssignProfileData", false, false, true, false, false);
                      } else if (MainData.data.roleType.includes("SchoolAdmin")) {
                        ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                        ServerBackend.Instance.AssignAdminData(MainData, true);
                        cc.systemEvent.emit("AssignProfileData", false, false, false, true, false);
                      } else if (MainData.data.roleType.includes("ProgramDirector")) {
                        ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                        ServerBackend.Instance.AssignDirectorData(MainData, true);
                        cc.systemEvent.emit("AssignProfileData", false, false, false, false, true);
                      }
                    } else if (MainData.message.includes("wrong") || MainData.message.includes("characters")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.InvalidEmailPassword;
                      cc.systemEvent.emit("AssignProfileData");
                    } else if (MainData.message.includes("Data not Found!")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.UserNotFound;
                      cc.systemEvent.emit("AssignProfileData");
                    } else if (MainData.message.includes("Password should contain atleast one Integer")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.InvalidEmailPassword;
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
  AssignTeacherData: function AssignTeacherData(DataResponse, isLoggedIn) {
    this.TeacherData.name = DataResponse.data.name;
    this.TeacherData.school = DataResponse.data.schoolName;
    this.TeacherData.classTaught = DataResponse.data.classTaught;
    this.TeacherData.emailAddress = DataResponse.data.SK;
    this.TeacherData.contactNumber = DataResponse.data.contactNumber;
    this.TeacherData.userID = DataResponse.data.userID;

    if (isLoggedIn) {
      this.TeacherData.AccessToken = DataResponse.data.userToken;
      this.TeacherData.UpdatedAt = DataResponse.data.updatedAt;
    }

    console.log(this.TeacherData);
  },
  AssignMentorData: function AssignMentorData(DataResponse, isLoggedIn) {
    this.MentorData.name = DataResponse.data.name;
    this.MentorData.emailAddress = DataResponse.data.SK;
    this.MentorData.contactNumber = DataResponse.data.contactNumber;
    this.MentorData.userID = DataResponse.data.userID;
    this.MentorData.address = DataResponse.data.address;

    if (isLoggedIn) {
      this.MentorData.AccessToken = DataResponse.data.userToken;
      this.MentorData.UpdatedAt = DataResponse.data.updatedAt;
    }

    console.log(this.MentorData);
  },
  AssignAdminData: function AssignAdminData(DataResponse, isLoggedIn) {
    this.AdminData.name = DataResponse.data.name;
    this.AdminData.emailAddress = DataResponse.data.SK;
    this.AdminData.contactNumber = DataResponse.data.contactNumber;
    this.AdminData.userID = DataResponse.data.userID;
    this.AdminData.schoolName = DataResponse.data.schoolName;

    if (isLoggedIn) {
      this.AdminData.AccessToken = DataResponse.data.userToken;
      this.AdminData.UpdatedAt = DataResponse.data.updatedAt;
    }

    console.log(this.AdminData);
  },
  AssignDirectorData: function AssignDirectorData(DataResponse, isLoggedIn) {
    this.DirectorData.name = DataResponse.data.name;
    this.DirectorData.emailAddress = DataResponse.data.SK;

    if (isLoggedIn) {
      this.DirectorData.AccessToken = DataResponse.data.userToken;
      this.DirectorData.UpdatedAt = DataResponse.data.updatedAt;
    }

    console.log(this.DirectorData);
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
    userID: "",
    address: ""
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlVHlwZUVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiU3VjY2Vzc2Z1bCIsIlVzZXJOb3RGb3VuZCIsIkludmFsaWRFbWFpbFBhc3N3b3JkIiwiV2VudFdyb25nIiwiU3R1ZGVudCIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJkT0IiLCJncmFkZUxldmVsIiwiZW1haWxBZGRyZXNzIiwidGVhY2hlck5hbWUiLCJmYWNlYm9va1BhZ2UiLCJnYW1lc1dvbiIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiQWNjZXNzVG9rZW4iLCJVcGRhdGVkQXQiLCJ1c2VySUQiLCJjdG9yIiwiX25hbWUiLCJfZG9iIiwiX2dyYWRlTGV2ZWwiLCJfZW1haWxBZGRyZXNzIiwiX3RlYWNoZXJOYW1lIiwiX2ZhY2Vib29rUGFnZSIsIl9nYW1lc1dvbiIsIl90ZXN0c1Rha2VuIiwiX3Rlc3RpbmdBdmVyYWdlIiwiX2dhbWVDYXNoIiwiVGVhY2hlciIsInNjaG9vbCIsImNsYXNzVGF1Z2h0IiwiY29udGFjdE51bWJlciIsIl9zY2hvb2wiLCJfY2xhc3NUYXVnaHQiLCJfY29udGFjdE51bWJlciIsIl9hY2Nlc3NUb2tlbiIsIl91cGRhdGVkQXQiLCJfdXNlcklEIiwiUHJvZ3JhbUFtYmFzc2Fkb3JzIiwiYWRkcmVzcyIsIl9hZGRyZXNzIiwiU2Nob29sQWRtaW5pc3RyYXRvcnMiLCJzY2hvb2xOYW1lIiwiX3NjaG9vbE5hbWUiLCJQcm9ncmFtRGlyZWN0b3JzIiwiU2VydmVyQmFja2VuZCIsIkNvbXBvbmVudCIsIlN0dWRlbnREYXRhIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJUZWFjaGVyRGF0YSIsIk1lbnRvckRhdGEiLCJBZG1pbkRhdGEiLCJEaXJlY3RvckRhdGEiLCJSZXNwb25zZVR5cGUiLCJkaXNwbGF5TmFtZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiZ2FtZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJvbkxvYWQiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJjb25zb2xlIiwiZXJyb3IiLCJnZXRVc2VyQVBJIiwibG9naW5Vc2VyQVBJIiwiR2V0VXNlckRhdGEiLCJfZW1haWwiLCJfcm9sZSIsInBheWxvYWQiLCJVc2VyUGF5bG9hZCIsIkNhbGxSRVNUQVBJIiwiTG9naW5Vc2VyIiwiX3Bhc3N3b3JkIiwiVXNlckxvZ2luUGF5bG9hZCIsIkZldGNoIiwiX3VybCIsIl9tZXRob2QiLCJfcmVxdWVzdEJvZHkiLCJmZXRjaCIsImhlYWRlcnMiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIl90eXBlIiwiRmV0Y2hfUHJvbWlzZSIsIlJlc3BvbnNlIiwianNvbiIsIlRlbXBEYXRhIiwiTWFpbkRhdGEiLCJVc2VyRGF0YVJlc3BvbnNlIiwic3RhdHVzQ29kZSIsIm1lc3NhZ2UiLCJkYXRhIiwibG9nIiwiaW5jbHVkZXMiLCJyb2xlVHlwZSIsIkFzc2lnblN0dWRlbnREYXRhIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiQXNzaWduVGVhY2hlckRhdGEiLCJBc3NpZ25NZW50b3JEYXRhIiwiQXNzaWduQWRtaW5EYXRhIiwiQXNzaWduRGlyZWN0b3JEYXRhIiwiRGF0YVJlc3BvbnNlIiwiaXNMb2dnZWRJbiIsImRvQiIsIlNLIiwiZmJQYWdlIiwidGVzdFRha2VuIiwiaW5HYW1lQ2FzaCIsInVzZXJUb2tlbiIsInVwZGF0ZWRBdCIsInN0YXJ0IiwiZW1haWwiLCJyb2xlIiwiRGF0YSIsIkxTSyIsImNyZWF0ZWRBdCIsImlzRGVsZXRlZCIsIlRhYmxlTmFtZSIsInBhc3N3b3JkIiwiUEsiLCJfc3RhdHVzQ29kZSIsIl9tZXNzYWdlIiwiX2RhdGEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlB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S0FBVjtBQUNIO0FBakIyQixDQUFULENBQXZCLEVBb0JBOztBQUNBLElBQUlwRCxnQkFBZ0IsR0FBR25GLEVBQUUsQ0FBQ1EsS0FBSCxDQUFTO0FBQzVCQyxFQUFBQSxJQUFJLEVBQUMsa0JBRHVCO0FBRTVCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUmtILElBQUFBLEtBQUssRUFBRSxFQURDO0FBRVJPLElBQUFBLFFBQVEsRUFBQyxFQUZEO0FBR1JOLElBQUFBLElBQUksRUFBRTtBQUhFLEdBRmdCO0FBT2hDO0FBQ0l0RyxFQUFBQSxJQUFJLEVBQUUsY0FFRXFELE1BRkYsRUFHRU0sU0FIRixFQUlFTCxLQUpGLEVBS0E7QUFBQSxRQUhFRCxNQUdGO0FBSEVBLE1BQUFBLE1BR0YsR0FIVSxNQUdWO0FBQUE7O0FBQUEsUUFGRU0sU0FFRjtBQUZFQSxNQUFBQSxTQUVGLEdBRlksTUFFWjtBQUFBOztBQUFBLFFBREVMLEtBQ0Y7QUFERUEsTUFBQUEsS0FDRixHQURTLE1BQ1Q7QUFBQTs7QUFDRixTQUFLK0MsS0FBTCxHQUFhaEQsTUFBYjtBQUNBLFNBQUt1RCxRQUFMLEdBQWdCakQsU0FBaEI7QUFDQSxTQUFLMkMsSUFBTCxHQUFZaEQsS0FBWjtBQUNIO0FBakIyQixDQUFULENBQXZCO0FBb0JBMkQsTUFBTSxDQUFDQyxPQUFQLEdBQWdCdEYsYUFBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciB0eXBlIG9mIGJ1c2luZXNzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSZXNwb25zZVR5cGVFbnVtID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBTdWNjZXNzZnVsOiAxLCAgICAgICAgICAgXHJcbiAgICBVc2VyTm90Rm91bmQ6IDIsXHJcbiAgICBJbnZhbGlkRW1haWxQYXNzd29yZDogMyxcclxuICAgIFdlbnRXcm9uZzo0ICAgICAgICAgICAgICBcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdHVkZW50IERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0dWRlbnQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiU3R1ZGVudFwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgZE9COiBcIlwiLFxyXG4gICAgICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICAgICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgICAgIGZhY2Vib29rUGFnZTogXCJcIixcclxuICAgICAgICBnYW1lc1dvbjogMCxcclxuICAgICAgICB0ZXN0c1Rha2VuOiAwLFxyXG4gICAgICAgIHRlc3RpbmdBdmVyYWdlOiAwLFxyXG4gICAgICAgIGdhbWVDYXNoOiAwLFxyXG4gICAgICAgIEFjY2Vzc1Rva2VuOlwiXCIsXHJcbiAgICAgICAgVXBkYXRlZEF0OjAsXHJcbiAgICAgICAgdXNlcklEOlwiXCJcclxuICAgIH0sXHJcbi8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gICAgY3RvcjogZnVuY3Rpb25cclxuICAgICAgICAoXHJcbiAgICAgICAgICAgIF9uYW1lID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9kb2IgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2dyYWRlTGV2ZWwgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfdGVhY2hlck5hbWUgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2ZhY2Vib29rUGFnZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfZ2FtZXNXb24gPSAwLFxyXG4gICAgICAgICAgICBfdGVzdHNUYWtlbiA9IDAsXHJcbiAgICAgICAgICAgIF90ZXN0aW5nQXZlcmFnZSA9IDAsXHJcbiAgICAgICAgICAgIF9nYW1lQ2FzaCA9IDBcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgICAgICB0aGlzLmRPQiA9IF9kb2I7XHJcbiAgICAgICAgdGhpcy5ncmFkZUxldmVsID0gX2dyYWRlTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMudGVhY2hlck5hbWUgPSBfdGVhY2hlck5hbWU7XHJcbiAgICAgICAgdGhpcy5mYWNlYm9va1BhZ2UgPSBfZmFjZWJvb2tQYWdlO1xyXG4gICAgICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICAgICAgdGhpcy50ZXN0c1Rha2VuID0gX3Rlc3RzVGFrZW47XHJcbiAgICAgICAgdGhpcy50ZXN0aW5nQXZlcmFnZSA9IF90ZXN0aW5nQXZlcmFnZTtcclxuICAgICAgICB0aGlzLmdhbWVDYXNoID0gX2dhbWVDYXNoO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVGVhY2hlciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFRlYWNoZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlRlYWNoZXJcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIHNjaG9vbDogXCJcIixcclxuICAgICAgICBjbGFzc1RhdWdodDogMCxcclxuICAgICAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICAgICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgICAgICBBY2Nlc3NUb2tlbjpcIlwiLFxyXG4gICAgICAgIFVwZGF0ZWRBdDogMCxcclxuICAgICAgICB1c2VySUQ6XCJcIlxyXG4gICAgfSxcclxuICAgIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChfbmFtZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfc2Nob29sID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9jbGFzc1RhdWdodCA9IDAsXHJcbiAgICAgICAgICAgIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2NvbnRhY3ROdW1iZXIgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2FjY2Vzc1Rva2VuID0gXCJcIixcclxuICAgICAgICAgICAgX3VwZGF0ZWRBdCA9IDAsXHJcbiAgICAgICAgICAgIF91c2VySUQ9XCJcIlxyXG4gICAgICAgICkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgICAgIHRoaXMuc2Nob29sID0gX3NjaG9vbDtcclxuICAgICAgICB0aGlzLmNsYXNzVGF1Z2h0ID0gX2NsYXNzVGF1Z2h0O1xyXG4gICAgICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgICAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgICAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2dyYW0gQW1iYXNzYWRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBQcm9ncmFtQW1iYXNzYWRvcnMgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlByb2dyYW1BbWJhc3NhZG9yc1wiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICAgICAgYWRkcmVzczogXCJcIixcclxuICAgICAgICBBY2Nlc3NUb2tlbjpcIlwiLFxyXG4gICAgICAgIFVwZGF0ZWRBdDogMCxcclxuICAgICAgICB1c2VySUQ6XCJcIlxyXG4gICAgfSxcclxuICAgIC8vRGVhZnVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChfbmFtZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9hZGRyZXNzID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9hY2Nlc3NUb2tlbiA9IFwiXCIsXHJcbiAgICAgICAgICAgIF91cGRhdGVkQXQgPSAwLFxyXG4gICAgICAgICAgICBfdXNlcklEPVwiXCJcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgICAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gX2FkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgICAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICAgICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTY2hvb2wgQWRtaW5pc3RyYXRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBTY2hvb2xBZG1pbmlzdHJhdG9ycyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiU2Nob29sQWRtaW5pc3RyYXRvcnNcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICAgICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgICAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICAgICAgQWNjZXNzVG9rZW46XCJcIixcclxuICAgICAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICAgICAgdXNlcklEOlwiXCJcclxuICAgIH0sXHJcbiAgICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gICAgY3RvcjogZnVuY3Rpb25cclxuICAgICAgICAoX25hbWUgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX3NjaG9vbE5hbWUgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfYWNjZXNzVG9rZW4gPSBcIlwiLFxyXG4gICAgICAgICAgICBfdXBkYXRlZEF0ID0gMCxcclxuICAgICAgICAgICAgX3VzZXJJRD1cIlwiXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICAgICAgdGhpcy5zY2hvb2xOYW1lID0gX3NjaG9vbE5hbWU7XHJcbiAgICAgICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICAgICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUHJvZ3JhbSBEaXJlY3RvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBQcm9ncmFtRGlyZWN0b3JzID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJQcm9ncmFtRGlyZWN0b3JzXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICAgICAgQWNjZXNzVG9rZW46XCJcIixcclxuICAgICAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICAgICAgdXNlcklEOlwiXCJcclxuICAgIH0sXHJcbiAgICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gICAgY3RvcjogZnVuY3Rpb25cclxuICAgICAgICAoICAgX25hbWUgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfYWNjZXNzVG9rZW4gPSBcIlwiLFxyXG4gICAgICAgICAgICBfdXBkYXRlZEF0ID0gMCxcclxuICAgICAgICAgICAgX3VzZXJJRD1cIlwiXHJcbiAgICAgICAgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgICAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNlcnZlckJhY2tlbmQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlcnZlckJhY2tlbmQ9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlNlcnZlckJhY2tlbmRcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBTdHVkZW50RGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogU3R1ZGVudCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHN0dWRlbnQgZGF0YVwiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVGVhY2hlckRhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFRlYWNoZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiB0ZWFjaGVyIGRhdGFcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTWVudG9yRGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogUHJvZ3JhbUFtYmFzc2Fkb3JzLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gTWVudG9yIC8gUHJvZ3JhbUFtYmFzc2Fkb3JzICBkYXRhXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEFkbWluRGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogU2Nob29sQWRtaW5pc3RyYXRvcnMsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBTY2hvb2xBZG1pbmlzdHJhdG9ycyAgZGF0YVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBEaXJlY3RvckRhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFByb2dyYW1EaXJlY3RvcnMsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBQcm9ncmFtRGlyZWN0b3JzICBkYXRhXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFJlc3BvbnNlVHlwZTp7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUmVzcG9uc2VcIixcclxuICAgICAgICAgICAgdHlwZTogUmVzcG9uc2VUeXBlRW51bSxcclxuICAgICAgICAgICAgZGVmYXVsdDogUmVzcG9uc2VUeXBlRW51bS5Ob25lLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZXNwb25zZVR5cGUgY2F0b2dvcnkgZm9yIGFwaSdzXCIsfSwgXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHsgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIFJlbW92ZVBlcnNpc3ROb2RlKClcclxuICAgIHtcclxuICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlPW51bGw7XHJcbiAgICAgICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmKCFTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLlN0dWRlbnREYXRhPW5ldyBTdHVkZW50KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjcmVhdGluZyBpbnN0YW5jZSBcIit0aGlzLm5vZGUubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgdmFyaWFibGVzXHJcbiAgICAgICAgdGhpcy5nZXRVc2VyQVBJPVwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi9nZXRVc2VyXCI7XHJcbiAgICAgICAgdGhpcy5sb2dpblVzZXJBUEk9XCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2xvZ2luVXNlclwiO1xyXG5cclxuICAgICAgIC8vIHRoaXMuR2V0VXNlckRhdGEoXCJ4dHJvbmRldkBnbWFpbC5jb21cIixcIlN0dWRlbnRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIEdldFVzZXJEYXRhKF9lbWFpbCxfcm9sZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgcGF5bG9hZD1uZXcgVXNlclBheWxvYWQoX2VtYWlsLF9yb2xlKTtcclxuICAgICAgICB0aGlzLkNhbGxSRVNUQVBJKCB0aGlzLmdldFVzZXJBUEksXCJQT1NUXCIscGF5bG9hZCwxKTsgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIExvZ2luVXNlcihfZW1haWwsX3Bhc3N3b3JkLF9yb2xlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBwYXlsb2FkPW5ldyBVc2VyTG9naW5QYXlsb2FkKF9lbWFpbCxfcGFzc3dvcmQsX3JvbGUpO1xyXG4gICAgICAgIHRoaXMuQ2FsbFJFU1RBUEkoIHRoaXMubG9naW5Vc2VyQVBJLFwiUE9TVFwiLHBheWxvYWQsMik7ICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBGZXRjaChfdXJsLF9tZXRob2QsX3JlcXVlc3RCb2R5KVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9tZXRob2Q9PVwiR0VUXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2goXHJcbiAgICAgICAgICAgICAgICBfdXJsLCBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChcclxuICAgICAgICAgICAgICAgIF91cmwsIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgQ2FsbFJFU1RBUEkoX3VybCxfbWV0aG9kLF9yZXF1ZXN0Qm9keSxfdHlwZSkge1xyXG4gICAgICAgIEZldGNoX1Byb21pc2UoX3VybCxfbWV0aG9kLF9yZXF1ZXN0Qm9keSk7XHJcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gRmV0Y2hfUHJvbWlzZShfdXJsLF9tZXRob2QsX3JlcXVlc3RCb2R5KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgUmVzcG9uc2U9YXdhaXQgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5GZXRjaChfdXJsLF9tZXRob2QsX3JlcXVlc3RCb2R5KTtcclxuICAgICAgICAgICAgICAgIHZhciBUZW1wRGF0YT1hd2FpdCBSZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKF90eXBlPT0xKSAvL2dldHRpbmcgdXNlciBkYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIE1haW5EYXRhPW5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsVGVtcERhdGEubWVzc2FnZSxUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNVQ0NFU1NcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvdCBkYXRhIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiU3R1ZGVudFwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25TdHVkZW50RGF0YShNYWluRGF0YSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJUZWFjaGVyXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoX3R5cGU9PTIpIC8vbG9naW4gdXNlclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBNYWluRGF0YT1uZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLFRlbXBEYXRhLm1lc3NhZ2UsVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhNYWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiVGVhY2hlclwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGU9UmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25UZWFjaGVyRGF0YShNYWluRGF0YSx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbk1lbnRvckRhdGEoTWFpbkRhdGEsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIixmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTY2hvb2xBZG1pblwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGU9UmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIixmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtRGlyZWN0b3JcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlPVJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduRGlyZWN0b3JEYXRhKE1haW5EYXRhLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSAgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIndyb25nXCIpIHx8TWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcImNoYXJhY3RlcnNcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIkRhdGEgbm90IEZvdW5kIVwiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlPVJlc3BvbnNlVHlwZUVudW0uVXNlck5vdEZvdW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlBhc3N3b3JkIHNob3VsZCBjb250YWluIGF0bGVhc3Qgb25lIEludGVnZXJcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfdHlwZT09MikgLy9sb2dpbiB1c2VyIGVycm9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGU9UmVzcG9uc2VUeXBlRW51bS5XZW50V3Jvbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAvLyAgY29uc29sZS5sb2coJ1dlIGRvIGNsZWFudXAgaGVyZScpO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNyZWdpb24gQ29tbWVudGVkXHJcbiAgICAgICAgLy8gZmV0Y2goXHJcbiAgICAgICAgLy8gICAgIF91cmwsIFxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgLy8gICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgIClcclxuICAgICAgICAvLyAgIC50aGVuKHJlc3BvbnNlPT57XHJcbiAgICAgICAgLy8gICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vcmV0dXJuIGRhdGE7IFxyXG4gICAgICAgIC8vICAgICB9KTsgXHJcbiAgICAgICAgLy8gICB9KVxyXG4gICAgICAgIC8vICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIC8vICAgfSk7XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnblN0dWRlbnREYXRhKERhdGFSZXNwb25zZSxpc0xvZ2dlZEluKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEubmFtZT1EYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEuZE9CPURhdGFSZXNwb25zZS5kYXRhLmRvQjtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmdyYWRlTGV2ZWw9RGF0YVJlc3BvbnNlLmRhdGEuZ3JhZGVMZXZlbDtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmVtYWlsQWRkcmVzcz1EYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLnRlYWNoZXJOYW1lPURhdGFSZXNwb25zZS5kYXRhLnRlYWNoZXJOYW1lO1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEuZmFjZWJvb2tQYWdlPURhdGFSZXNwb25zZS5kYXRhLmZiUGFnZTtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVzV29uPURhdGFSZXNwb25zZS5kYXRhLmdhbWVzV29uO1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEudGVzdHNUYWtlbj1EYXRhUmVzcG9uc2UuZGF0YS50ZXN0VGFrZW47XHJcbiAgICAgICAgdGhpcy5TdHVkZW50RGF0YS50ZXN0aW5nQXZlcmFnZT1EYXRhUmVzcG9uc2UuZGF0YS50ZXN0aW5nQXZlcmFnZTtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVDYXNoPURhdGFSZXNwb25zZS5kYXRhLmluR2FtZUNhc2g7XHJcbiAgICAgICAgdGhpcy5TdHVkZW50RGF0YS51c2VySUQ9RGF0YVJlc3BvbnNlLmRhdGEudXNlcklEO1xyXG5cclxuICAgICAgICBpZihpc0xvZ2dlZEluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TdHVkZW50RGF0YS5BY2Nlc3NUb2tlbj1EYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgICAgICAgIHRoaXMuU3R1ZGVudERhdGEuVXBkYXRlZEF0PURhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlN0dWRlbnREYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgQXNzaWduVGVhY2hlckRhdGEoRGF0YVJlc3BvbnNlLGlzTG9nZ2VkSW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyRGF0YS5uYW1lPURhdGFSZXNwb25zZS5kYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyRGF0YS5zY2hvb2w9RGF0YVJlc3BvbnNlLmRhdGEuc2Nob29sTmFtZTtcclxuICAgICAgICB0aGlzLlRlYWNoZXJEYXRhLmNsYXNzVGF1Z2h0PURhdGFSZXNwb25zZS5kYXRhLmNsYXNzVGF1Z2h0O1xyXG4gICAgICAgIHRoaXMuVGVhY2hlckRhdGEuZW1haWxBZGRyZXNzPURhdGFSZXNwb25zZS5kYXRhLlNLO1xyXG4gICAgICAgIHRoaXMuVGVhY2hlckRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5kYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyRGF0YS51c2VySUQ9RGF0YVJlc3BvbnNlLmRhdGEudXNlcklEO1xyXG5cclxuICAgICAgICBpZihpc0xvZ2dlZEluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UZWFjaGVyRGF0YS5BY2Nlc3NUb2tlbj1EYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgICAgICAgIHRoaXMuVGVhY2hlckRhdGEuVXBkYXRlZEF0PURhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlRlYWNoZXJEYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgQXNzaWduTWVudG9yRGF0YShEYXRhUmVzcG9uc2UsaXNMb2dnZWRJbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLk1lbnRvckRhdGEubmFtZT1EYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuTWVudG9yRGF0YS5lbWFpbEFkZHJlc3M9RGF0YVJlc3BvbnNlLmRhdGEuU0s7XHJcbiAgICAgICAgdGhpcy5NZW50b3JEYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuZGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgIHRoaXMuTWVudG9yRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VySUQ7XHJcbiAgICAgICAgdGhpcy5NZW50b3JEYXRhLmFkZHJlc3M9RGF0YVJlc3BvbnNlLmRhdGEuYWRkcmVzcztcclxuXHJcbiAgICAgICAgaWYoaXNMb2dnZWRJbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTWVudG9yRGF0YS5BY2Nlc3NUb2tlbj1EYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgICAgICAgIHRoaXMuTWVudG9yRGF0YS5VcGRhdGVkQXQ9RGF0YVJlc3BvbnNlLmRhdGEudXBkYXRlZEF0OyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWVudG9yRGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnbkFkbWluRGF0YShEYXRhUmVzcG9uc2UsaXNMb2dnZWRJbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkFkbWluRGF0YS5uYW1lPURhdGFSZXNwb25zZS5kYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5BZG1pbkRhdGEuZW1haWxBZGRyZXNzPURhdGFSZXNwb25zZS5kYXRhLlNLO1xyXG4gICAgICAgIHRoaXMuQWRtaW5EYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuZGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgIHRoaXMuQWRtaW5EYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJJRDtcclxuICAgICAgICB0aGlzLkFkbWluRGF0YS5zY2hvb2xOYW1lPURhdGFSZXNwb25zZS5kYXRhLnNjaG9vbE5hbWU7XHJcblxyXG4gICAgICAgIGlmKGlzTG9nZ2VkSW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFkbWluRGF0YS5BY2Nlc3NUb2tlbj1EYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgICAgICAgIHRoaXMuQWRtaW5EYXRhLlVwZGF0ZWRBdD1EYXRhUmVzcG9uc2UuZGF0YS51cGRhdGVkQXQ7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BZG1pbkRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBBc3NpZ25EaXJlY3RvckRhdGEoRGF0YVJlc3BvbnNlLGlzTG9nZ2VkSW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5EaXJlY3RvckRhdGEubmFtZT1EYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLmVtYWlsQWRkcmVzcz1EYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuXHJcbiAgICAgICAgaWYoaXNMb2dnZWRJbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLkFjY2Vzc1Rva2VuPURhdGFSZXNwb25zZS5kYXRhLnVzZXJUb2tlbjtcclxuICAgICAgICAgICAgdGhpcy5EaXJlY3RvckRhdGEuVXBkYXRlZEF0PURhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkRpcmVjdG9yRGF0YSk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQgKCkge30sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHNlbmRpbmcgcGF5bG9hZCB0byByZWNlaXZlIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJQYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlVzZXJQYXlsb2FkXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgICAgcm9sZTogXCJcIixcclxuICAgIH0sXHJcbi8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gICAgY3RvcjogZnVuY3Rpb25cclxuICAgICAgICAoXHJcbiAgICAgICAgICAgIF9lbWFpbD0gJ25vbmUnLFxyXG4gICAgICAgICAgICBfcm9sZT0gXCJub25lXCJcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgICAgIHRoaXMucm9sZSA9IF9yb2xlOyAgXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVc2VyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERhdGEgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiRGF0YVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGluR2FtZUNhc2g6IFwiXCIsXHJcbiAgICAgICAgTFNLOiBcIlwiLFxyXG4gICAgICAgIHVzZXJUb2tlbjpcIlwiLFxyXG4gICAgICAgIGNsYXNzVGF1Z2h0OlwiXCIsXHJcbiAgICAgICAgY29udGFjdE51bWJlcjpcIlwiLFxyXG4gICAgICAgIHNjaG9vbE5hbWU6XCJcIixcclxuICAgICAgICBnYW1lc1dvbjpcIlwiLFxyXG4gICAgICAgIGNyZWF0ZWRBdDowLFxyXG4gICAgICAgIGlzRGVsZXRlZDpmYWxzZSxcclxuICAgICAgICBUYWJsZU5hbWU6XCJcIixcclxuICAgICAgICBncmFkZUxldmVsOlwiXCIsXHJcbiAgICAgICAgbmFtZTpcIlwiLFxyXG4gICAgICAgIHJvbGVUeXBlOlwiXCIsXHJcbiAgICAgICAgcGFzc3dvcmQ6XCJcIixcclxuICAgICAgICBmYlBhZ2U6XCJcIixcclxuICAgICAgICB1cGRhdGVkQXQ6MCxcclxuICAgICAgICB0ZWFjaGVyTmFtZTpcIlwiLFxyXG4gICAgICAgIGRvQjpcIlwiLFxyXG4gICAgICAgIFNLOlwiXCIsXHJcbiAgICAgICAgdGVzdFRha2VuOlwiXCIsXHJcbiAgICAgICAgUEs6XCJcIixcclxuICAgICAgICB0ZXN0aW5nQXZlcmFnZTpcIlwiLFxyXG4gICAgICAgIHVzZXJJRDogXCJcIixcclxuICAgICAgICBhZGRyZXNzOlwiXCJcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcm9vdCBjbGFzcyBvZiByZXNwb25zZSByZWNlaXZlZCB3aGVuIGdldHRpbmcgdXNlciBhcGkgaXMgaGl0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyRGF0YVJlc3BvbnNlID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlVzZXJEYXRhUmVzcG9uc2VcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiBcIlwiLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICAgICAgZGF0YTpEYXRhXHJcbiAgICB9LFxyXG4vL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICAgIGN0b3I6IGZ1bmN0aW9uXHJcbiAgICAgICAgKFxyXG4gICAgICAgICAgICBfc3RhdHVzQ29kZT0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9tZXNzYWdlPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2RhdGE9bnVsbFxyXG4gICAgICAgICkge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzQ29kZSA9IF9zdGF0dXNDb2RlO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IF9tZXNzYWdlO1xyXG4gICAgICAgIHRoaXMuZGF0YT1fZGF0YTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHNlbmRpbmcgcGF5bG9hZCB0byBsb2dpbiB1c2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyTG9naW5QYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlVzZXJMb2dpblBheWxvYWRcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBlbWFpbDogXCJcIixcclxuICAgICAgICBwYXNzd29yZDpcIlwiLFxyXG4gICAgICAgIHJvbGU6IFwiXCIsXHJcbiAgICB9LFxyXG4vL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICAgIGN0b3I6IGZ1bmN0aW9uXHJcbiAgICAgICAgKFxyXG4gICAgICAgICAgICBfZW1haWw9ICdub25lJyxcclxuICAgICAgICAgICAgX3Bhc3N3b3JkPVwibm9uZVwiLFxyXG4gICAgICAgICAgICBfcm9sZT0gXCJub25lXCJcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBfcGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5yb2xlID0gX3JvbGU7ICBcclxuICAgIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHM9IFNlcnZlckJhY2tlbmQ7XHJcbiJdfQ==