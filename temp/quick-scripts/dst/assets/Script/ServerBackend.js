
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
  GetUserData: function GetUserData(_email, _role, _accessToken, _subType) {
    if (_subType === void 0) {
      _subType = -1;
    }

    var payload = new UserPayload(_email, _role);
    var header = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": _accessToken
    };
    this.CallRESTAPI(this.getUserAPI, "POST", payload, 1, header, _subType);
  },
  LoginUser: function LoginUser(_email, _password, _role) {
    var payload = new UserLoginPayload(_email, _password, _role);
    this.CallRESTAPI(this.loginUserAPI, "POST", payload, 2, null, -1);
  },
  Fetch: function Fetch(_url, _method, _requestBody, _headers) {
    if (_headers === void 0) {
      _headers = null;
    }

    if (_method == "GET") {
      if (_headers == null) {
        return fetch(_url, {
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          method: _method
        });
      } else {
        return fetch(_url, {
          headers: _headers,
          method: _method
        });
      }
    } else {
      if (_headers == null) {
        //console.error("header is null");
        //console.error(_requestBody);
        return fetch(_url, {
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          method: _method,
          body: JSON.stringify(_requestBody)
        });
      } else {
        return fetch(_url, {
          headers: _headers,
          method: _method,
          body: JSON.stringify(_requestBody)
        });
      }
    }
  },
  CallRESTAPI: function CallRESTAPI(_url, _method, _requestBody, _type, _headers, _subType) {
    if (_headers === void 0) {
      _headers = null;
    }

    if (_subType === void 0) {
      _subType = -1;
    }

    Fetch_Promise(_url, _method, _requestBody, _headers);

    function Fetch_Promise(_x, _x2, _x3, _x4) {
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
      _Fetch_Promise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_url, _method, _requestBody, _headers) {
        var Response, TempData, MainData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_headers === void 0) {
                  _headers = null;
                }

                _context.prev = 1;
                _context.next = 4;
                return ServerBackend.Instance.Fetch(_url, _method, _requestBody, _headers);

              case 4:
                Response = _context.sent;
                _context.next = 7;
                return Response.json();

              case 7:
                TempData = _context.sent;

                if (_type == 1) //getting user data
                  {
                    MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
                    console.log(TempData);

                    if (_subType == 0) {
                      //return data to storage class
                      if (MainData.message.includes("SUCCESS") || MainData.message.includes("sucessfully")) {
                        console.log("got data successfully");
                        console.log(MainData); //both below calls are written inside storgaemanager

                        cc.systemEvent.emit("WriteData", MainData);
                        cc.systemEvent.emit("RefreshData", 0);
                      } else {
                        cc.systemEvent.emit("RefreshData", 1);
                      }
                    }
                  } else if (_type == 2) //login user
                  {
                    MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
                    console.log(TempData);

                    if (MainData.message.includes("sucessfully")) {
                      cc.systemEvent.emit("WriteData", MainData);
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

                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);

                if (_type == 2) //login user error
                  {
                    ServerBackend.Instance.ResponseType = ResponseTypeEnum.WentWrong;
                    cc.systemEvent.emit("AssignProfileData");
                  }

                console.error(_context.t0);

              case 15:
                _context.prev = 15;
                return _context.finish(15);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 11, 15, 17]]);
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
  start: function start() {},
  ReloginFromStorage: function ReloginFromStorage(MainData) {
    console.log("user logged in successfully automatically");
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
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlVHlwZUVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiU3VjY2Vzc2Z1bCIsIlVzZXJOb3RGb3VuZCIsIkludmFsaWRFbWFpbFBhc3N3b3JkIiwiV2VudFdyb25nIiwiU3R1ZGVudCIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJkT0IiLCJncmFkZUxldmVsIiwiZW1haWxBZGRyZXNzIiwidGVhY2hlck5hbWUiLCJmYWNlYm9va1BhZ2UiLCJnYW1lc1dvbiIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiQWNjZXNzVG9rZW4iLCJVcGRhdGVkQXQiLCJ1c2VySUQiLCJjdG9yIiwiX25hbWUiLCJfZG9iIiwiX2dyYWRlTGV2ZWwiLCJfZW1haWxBZGRyZXNzIiwiX3RlYWNoZXJOYW1lIiwiX2ZhY2Vib29rUGFnZSIsIl9nYW1lc1dvbiIsIl90ZXN0c1Rha2VuIiwiX3Rlc3RpbmdBdmVyYWdlIiwiX2dhbWVDYXNoIiwiVGVhY2hlciIsInNjaG9vbCIsImNsYXNzVGF1Z2h0IiwiY29udGFjdE51bWJlciIsIl9zY2hvb2wiLCJfY2xhc3NUYXVnaHQiLCJfY29udGFjdE51bWJlciIsIl9hY2Nlc3NUb2tlbiIsIl91cGRhdGVkQXQiLCJfdXNlcklEIiwiUHJvZ3JhbUFtYmFzc2Fkb3JzIiwiYWRkcmVzcyIsIl9hZGRyZXNzIiwiU2Nob29sQWRtaW5pc3RyYXRvcnMiLCJzY2hvb2xOYW1lIiwiX3NjaG9vbE5hbWUiLCJQcm9ncmFtRGlyZWN0b3JzIiwiU2VydmVyQmFja2VuZCIsIkNvbXBvbmVudCIsIlN0dWRlbnREYXRhIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJUZWFjaGVyRGF0YSIsIk1lbnRvckRhdGEiLCJBZG1pbkRhdGEiLCJEaXJlY3RvckRhdGEiLCJSZXNwb25zZVR5cGUiLCJkaXNwbGF5TmFtZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiZ2FtZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJvbkxvYWQiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJjb25zb2xlIiwiZXJyb3IiLCJnZXRVc2VyQVBJIiwibG9naW5Vc2VyQVBJIiwiR2V0VXNlckRhdGEiLCJfZW1haWwiLCJfcm9sZSIsIl9zdWJUeXBlIiwicGF5bG9hZCIsIlVzZXJQYXlsb2FkIiwiaGVhZGVyIiwiQ2FsbFJFU1RBUEkiLCJMb2dpblVzZXIiLCJfcGFzc3dvcmQiLCJVc2VyTG9naW5QYXlsb2FkIiwiRmV0Y2giLCJfdXJsIiwiX21ldGhvZCIsIl9yZXF1ZXN0Qm9keSIsIl9oZWFkZXJzIiwiZmV0Y2giLCJoZWFkZXJzIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJfdHlwZSIsIkZldGNoX1Byb21pc2UiLCJSZXNwb25zZSIsImpzb24iLCJUZW1wRGF0YSIsIk1haW5EYXRhIiwiVXNlckRhdGFSZXNwb25zZSIsInN0YXR1c0NvZGUiLCJtZXNzYWdlIiwiZGF0YSIsImxvZyIsImluY2x1ZGVzIiwic3lzdGVtRXZlbnQiLCJlbWl0Iiwicm9sZVR5cGUiLCJBc3NpZ25TdHVkZW50RGF0YSIsIkFzc2lnblRlYWNoZXJEYXRhIiwiQXNzaWduTWVudG9yRGF0YSIsIkFzc2lnbkFkbWluRGF0YSIsIkFzc2lnbkRpcmVjdG9yRGF0YSIsIkRhdGFSZXNwb25zZSIsImlzTG9nZ2VkSW4iLCJkb0IiLCJTSyIsImZiUGFnZSIsInRlc3RUYWtlbiIsImluR2FtZUNhc2giLCJ1c2VyVG9rZW4iLCJ1cGRhdGVkQXQiLCJzdGFydCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsImVtYWlsIiwicm9sZSIsIkRhdGEiLCJMU0siLCJjcmVhdGVkQXQiLCJpc0RlbGV0ZWQiLCJUYWJsZU5hbWUiLCJwYXNzd29yZCIsIlBLIiwiX3N0YXR1c0NvZGUiLCJfbWVzc2FnZSIsIl9kYXRhIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxnQkFBZ0IsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDM0JDLEVBQUFBLElBQUksRUFBQyxDQURzQjtBQUUzQkMsRUFBQUEsVUFBVSxFQUFFLENBRmU7QUFHM0JDLEVBQUFBLFlBQVksRUFBRSxDQUhhO0FBSTNCQyxFQUFBQSxvQkFBb0IsRUFBRSxDQUpLO0FBSzNCQyxFQUFBQSxTQUFTLEVBQUM7QUFMaUIsQ0FBUixDQUF2QixFQU9BOztBQUNBLElBQUlDLE9BQU8sR0FBR1AsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDbkJDLEVBQUFBLElBQUksRUFBQyxTQURjO0FBRW5CQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkQsSUFBQUEsSUFBSSxFQUFFLEVBREU7QUFFUkUsSUFBQUEsR0FBRyxFQUFFLEVBRkc7QUFHUkMsSUFBQUEsVUFBVSxFQUFFLEVBSEo7QUFJUkMsSUFBQUEsWUFBWSxFQUFFLEVBSk47QUFLUkMsSUFBQUEsV0FBVyxFQUFFLEVBTEw7QUFNUkMsSUFBQUEsWUFBWSxFQUFFLEVBTk47QUFPUkMsSUFBQUEsUUFBUSxFQUFFLENBUEY7QUFRUkMsSUFBQUEsVUFBVSxFQUFFLENBUko7QUFTUkMsSUFBQUEsY0FBYyxFQUFFLENBVFI7QUFVUkMsSUFBQUEsUUFBUSxFQUFFLENBVkY7QUFXUkMsSUFBQUEsV0FBVyxFQUFDLEVBWEo7QUFZUkMsSUFBQUEsU0FBUyxFQUFDLENBWkY7QUFhUkMsSUFBQUEsTUFBTSxFQUFDO0FBYkMsR0FGTztBQWlCdkI7QUFDSUMsRUFBQUEsSUFBSSxFQUFFLGNBRUVDLEtBRkYsRUFHRUMsSUFIRixFQUlFQyxXQUpGLEVBS0VDLGFBTEYsRUFNRUMsWUFORixFQU9FQyxhQVBGLEVBUUVDLFNBUkYsRUFTRUMsV0FURixFQVVFQyxlQVZGLEVBV0VDLFNBWEYsRUFZQTtBQUFBLFFBVkVULEtBVUY7QUFWRUEsTUFBQUEsS0FVRixHQVZVLE1BVVY7QUFBQTs7QUFBQSxRQVRFQyxJQVNGO0FBVEVBLE1BQUFBLElBU0YsR0FUUyxNQVNUO0FBQUE7O0FBQUEsUUFSRUMsV0FRRjtBQVJFQSxNQUFBQSxXQVFGLEdBUmdCLE1BUWhCO0FBQUE7O0FBQUEsUUFQRUMsYUFPRjtBQVBFQSxNQUFBQSxhQU9GLEdBUGtCLE1BT2xCO0FBQUE7O0FBQUEsUUFORUMsWUFNRjtBQU5FQSxNQUFBQSxZQU1GLEdBTmlCLE1BTWpCO0FBQUE7O0FBQUEsUUFMRUMsYUFLRjtBQUxFQSxNQUFBQSxhQUtGLEdBTGtCLE1BS2xCO0FBQUE7O0FBQUEsUUFKRUMsU0FJRjtBQUpFQSxNQUFBQSxTQUlGLEdBSmMsQ0FJZDtBQUFBOztBQUFBLFFBSEVDLFdBR0Y7QUFIRUEsTUFBQUEsV0FHRixHQUhnQixDQUdoQjtBQUFBOztBQUFBLFFBRkVDLGVBRUY7QUFGRUEsTUFBQUEsZUFFRixHQUZvQixDQUVwQjtBQUFBOztBQUFBLFFBREVDLFNBQ0Y7QUFERUEsTUFBQUEsU0FDRixHQURjLENBQ2Q7QUFBQTs7QUFDRixTQUFLeEIsSUFBTCxHQUFZZSxLQUFaO0FBQ0EsU0FBS2IsR0FBTCxHQUFXYyxJQUFYO0FBQ0EsU0FBS2IsVUFBTCxHQUFrQmMsV0FBbEI7QUFDQSxTQUFLYixZQUFMLEdBQW9CYyxhQUFwQjtBQUNBLFNBQUtiLFdBQUwsR0FBbUJjLFlBQW5CO0FBQ0EsU0FBS2IsWUFBTCxHQUFvQmMsYUFBcEI7QUFDQSxTQUFLYixRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtiLFVBQUwsR0FBa0JjLFdBQWxCO0FBQ0EsU0FBS2IsY0FBTCxHQUFzQmMsZUFBdEI7QUFDQSxTQUFLYixRQUFMLEdBQWdCYyxTQUFoQjtBQUNIO0FBekNrQixDQUFULENBQWQsRUE0Q0E7O0FBQ0EsSUFBSUMsT0FBTyxHQUFHbEMsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDbkJDLEVBQUFBLElBQUksRUFBRSxTQURhO0FBRW5CQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkQsSUFBQUEsSUFBSSxFQUFFLEVBREU7QUFFUjBCLElBQUFBLE1BQU0sRUFBRSxFQUZBO0FBR1JDLElBQUFBLFdBQVcsRUFBRSxDQUhMO0FBSVJ2QixJQUFBQSxZQUFZLEVBQUUsRUFKTjtBQUtSd0IsSUFBQUEsYUFBYSxFQUFFLEVBTFA7QUFNUmpCLElBQUFBLFdBQVcsRUFBQyxFQU5KO0FBT1JDLElBQUFBLFNBQVMsRUFBRSxDQVBIO0FBUVJDLElBQUFBLE1BQU0sRUFBQztBQVJDLEdBRk87QUFZbkI7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGNBQ0RDLEtBREMsRUFFRWMsT0FGRixFQUdFQyxZQUhGLEVBSUVaLGFBSkYsRUFLRWEsY0FMRixFQU1FQyxZQU5GLEVBT0VDLFVBUEYsRUFRRUMsT0FSRixFQVNBO0FBQUEsUUFSRG5CLEtBUUM7QUFSREEsTUFBQUEsS0FRQyxHQVJPLE1BUVA7QUFBQTs7QUFBQSxRQVBFYyxPQU9GO0FBUEVBLE1BQUFBLE9BT0YsR0FQWSxNQU9aO0FBQUE7O0FBQUEsUUFORUMsWUFNRjtBQU5FQSxNQUFBQSxZQU1GLEdBTmlCLENBTWpCO0FBQUE7O0FBQUEsUUFMRVosYUFLRjtBQUxFQSxNQUFBQSxhQUtGLEdBTGtCLE1BS2xCO0FBQUE7O0FBQUEsUUFKRWEsY0FJRjtBQUpFQSxNQUFBQSxjQUlGLEdBSm1CLE1BSW5CO0FBQUE7O0FBQUEsUUFIRUMsWUFHRjtBQUhFQSxNQUFBQSxZQUdGLEdBSGlCLEVBR2pCO0FBQUE7O0FBQUEsUUFGRUMsVUFFRjtBQUZFQSxNQUFBQSxVQUVGLEdBRmUsQ0FFZjtBQUFBOztBQUFBLFFBREVDLE9BQ0Y7QUFERUEsTUFBQUEsT0FDRixHQURVLEVBQ1Y7QUFBQTs7QUFDRixTQUFLbEMsSUFBTCxHQUFZZSxLQUFaO0FBQ0EsU0FBS1csTUFBTCxHQUFjRyxPQUFkO0FBQ0EsU0FBS0YsV0FBTCxHQUFtQkcsWUFBbkI7QUFDQSxTQUFLMUIsWUFBTCxHQUFvQmMsYUFBcEI7QUFDQSxTQUFLVSxhQUFMLEdBQXFCRyxjQUFyQjtBQUNBLFNBQUtwQixXQUFMLEdBQW1CcUIsWUFBbkI7QUFDQSxTQUFLcEIsU0FBTCxHQUFpQnFCLFVBQWpCO0FBQ0EsU0FBS3BCLE1BQUwsR0FBY3FCLE9BQWQ7QUFDSDtBQS9Ca0IsQ0FBVCxDQUFkLEVBa0NBOztBQUNBLElBQUlDLGtCQUFrQixHQUFHNUMsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDOUJDLEVBQUFBLElBQUksRUFBRSxvQkFEd0I7QUFFOUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSRCxJQUFBQSxJQUFJLEVBQUUsRUFERTtBQUVSSSxJQUFBQSxZQUFZLEVBQUUsRUFGTjtBQUdSd0IsSUFBQUEsYUFBYSxFQUFFLEVBSFA7QUFJUlEsSUFBQUEsT0FBTyxFQUFFLEVBSkQ7QUFLUnpCLElBQUFBLFdBQVcsRUFBQyxFQUxKO0FBTVJDLElBQUFBLFNBQVMsRUFBRSxDQU5IO0FBT1JDLElBQUFBLE1BQU0sRUFBQztBQVBDLEdBRmtCO0FBVzlCO0FBQ0FDLEVBQUFBLElBQUksRUFBRSxjQUNEQyxLQURDLEVBRUVHLGFBRkYsRUFHRWEsY0FIRixFQUlFTSxRQUpGLEVBS0VMLFlBTEYsRUFNRUMsVUFORixFQU9FQyxPQVBGLEVBUUE7QUFBQSxRQVBEbkIsS0FPQztBQVBEQSxNQUFBQSxLQU9DLEdBUE8sTUFPUDtBQUFBOztBQUFBLFFBTkVHLGFBTUY7QUFORUEsTUFBQUEsYUFNRixHQU5rQixNQU1sQjtBQUFBOztBQUFBLFFBTEVhLGNBS0Y7QUFMRUEsTUFBQUEsY0FLRixHQUxtQixNQUtuQjtBQUFBOztBQUFBLFFBSkVNLFFBSUY7QUFKRUEsTUFBQUEsUUFJRixHQUphLE1BSWI7QUFBQTs7QUFBQSxRQUhFTCxZQUdGO0FBSEVBLE1BQUFBLFlBR0YsR0FIaUIsRUFHakI7QUFBQTs7QUFBQSxRQUZFQyxVQUVGO0FBRkVBLE1BQUFBLFVBRUYsR0FGZSxDQUVmO0FBQUE7O0FBQUEsUUFERUMsT0FDRjtBQURFQSxNQUFBQSxPQUNGLEdBRFUsRUFDVjtBQUFBOztBQUNGLFNBQUtsQyxJQUFMLEdBQVllLEtBQVo7QUFDQSxTQUFLWCxZQUFMLEdBQW9CYyxhQUFwQjtBQUNBLFNBQUtVLGFBQUwsR0FBcUJHLGNBQXJCO0FBQ0EsU0FBS0ssT0FBTCxHQUFlQyxRQUFmO0FBQ0EsU0FBSzFCLFdBQUwsR0FBbUJxQixZQUFuQjtBQUNBLFNBQUtwQixTQUFMLEdBQWlCcUIsVUFBakI7QUFDQSxTQUFLcEIsTUFBTCxHQUFjcUIsT0FBZDtBQUNIO0FBNUI2QixDQUFULENBQXpCLEVBK0JBOztBQUNBLElBQUlJLG9CQUFvQixHQUFHL0MsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDaENDLEVBQUFBLElBQUksRUFBRSxzQkFEMEI7QUFFaENDLEVBQUFBLFVBQVUsRUFBRTtBQUNSRCxJQUFBQSxJQUFJLEVBQUUsRUFERTtBQUVSdUMsSUFBQUEsVUFBVSxFQUFFLEVBRko7QUFHUlgsSUFBQUEsYUFBYSxFQUFFLEVBSFA7QUFJUnhCLElBQUFBLFlBQVksRUFBRSxFQUpOO0FBS1JPLElBQUFBLFdBQVcsRUFBQyxFQUxKO0FBTVJDLElBQUFBLFNBQVMsRUFBRSxDQU5IO0FBT1JDLElBQUFBLE1BQU0sRUFBQztBQVBDLEdBRm9CO0FBV2hDO0FBQ0FDLEVBQUFBLElBQUksRUFBRSxjQUNEQyxLQURDLEVBRUV5QixXQUZGLEVBR0V0QixhQUhGLEVBSUVhLGNBSkYsRUFLRUMsWUFMRixFQU1FQyxVQU5GLEVBT0VDLE9BUEYsRUFRQTtBQUFBLFFBUERuQixLQU9DO0FBUERBLE1BQUFBLEtBT0MsR0FQTyxNQU9QO0FBQUE7O0FBQUEsUUFORXlCLFdBTUY7QUFORUEsTUFBQUEsV0FNRixHQU5nQixNQU1oQjtBQUFBOztBQUFBLFFBTEV0QixhQUtGO0FBTEVBLE1BQUFBLGFBS0YsR0FMa0IsTUFLbEI7QUFBQTs7QUFBQSxRQUpFYSxjQUlGO0FBSkVBLE1BQUFBLGNBSUYsR0FKbUIsTUFJbkI7QUFBQTs7QUFBQSxRQUhFQyxZQUdGO0FBSEVBLE1BQUFBLFlBR0YsR0FIaUIsRUFHakI7QUFBQTs7QUFBQSxRQUZFQyxVQUVGO0FBRkVBLE1BQUFBLFVBRUYsR0FGZSxDQUVmO0FBQUE7O0FBQUEsUUFERUMsT0FDRjtBQURFQSxNQUFBQSxPQUNGLEdBRFUsRUFDVjtBQUFBOztBQUNGLFNBQUtsQyxJQUFMLEdBQVllLEtBQVo7QUFDQSxTQUFLd0IsVUFBTCxHQUFrQkMsV0FBbEI7QUFDQSxTQUFLWixhQUFMLEdBQXFCRyxjQUFyQjtBQUNBLFNBQUszQixZQUFMLEdBQW9CYyxhQUFwQjtBQUNBLFNBQUtQLFdBQUwsR0FBbUJxQixZQUFuQjtBQUNBLFNBQUtwQixTQUFMLEdBQWlCcUIsVUFBakI7QUFDQSxTQUFLcEIsTUFBTCxHQUFjcUIsT0FBZDtBQUNIO0FBNUIrQixDQUFULENBQTNCLEVBK0JBOztBQUNBLElBQUlPLGdCQUFnQixHQUFHbEQsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDNUJDLEVBQUFBLElBQUksRUFBRSxrQkFEc0I7QUFFNUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSRCxJQUFBQSxJQUFJLEVBQUUsRUFERTtBQUVSSSxJQUFBQSxZQUFZLEVBQUUsRUFGTjtBQUdSTyxJQUFBQSxXQUFXLEVBQUMsRUFISjtBQUlSQyxJQUFBQSxTQUFTLEVBQUUsQ0FKSDtBQUtSQyxJQUFBQSxNQUFNLEVBQUM7QUFMQyxHQUZnQjtBQVM1QjtBQUNBQyxFQUFBQSxJQUFJLEVBQUUsY0FDRUMsS0FERixFQUVFRyxhQUZGLEVBR0VjLFlBSEYsRUFJRUMsVUFKRixFQUtFQyxPQUxGLEVBT047QUFBQSxRQU5RbkIsS0FNUjtBQU5RQSxNQUFBQSxLQU1SLEdBTmdCLE1BTWhCO0FBQUE7O0FBQUEsUUFMUUcsYUFLUjtBQUxRQSxNQUFBQSxhQUtSLEdBTHdCLE1BS3hCO0FBQUE7O0FBQUEsUUFKUWMsWUFJUjtBQUpRQSxNQUFBQSxZQUlSLEdBSnVCLEVBSXZCO0FBQUE7O0FBQUEsUUFIUUMsVUFHUjtBQUhRQSxNQUFBQSxVQUdSLEdBSHFCLENBR3JCO0FBQUE7O0FBQUEsUUFGUUMsT0FFUjtBQUZRQSxNQUFBQSxPQUVSLEdBRmdCLEVBRWhCO0FBQUE7O0FBQ0ksU0FBS2xDLElBQUwsR0FBWWUsS0FBWjtBQUNBLFNBQUtYLFlBQUwsR0FBb0JjLGFBQXBCO0FBQ0EsU0FBS1AsV0FBTCxHQUFtQnFCLFlBQW5CO0FBQ0EsU0FBS3BCLFNBQUwsR0FBaUJxQixVQUFqQjtBQUNBLFNBQUtwQixNQUFMLEdBQWNxQixPQUFkO0FBQ0g7QUF2QjJCLENBQVQsQ0FBdkIsRUEwQkE7O0FBQ0EsSUFBSVEsYUFBYSxHQUFDbkQsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDdkJDLEVBQUFBLElBQUksRUFBQyxlQURrQjtBQUV2QixhQUFTVCxFQUFFLENBQUNvRCxTQUZXO0FBR3ZCMUMsRUFBQUEsVUFBVSxFQUFFO0FBQ1IyQyxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVRDLE1BQUFBLElBQUksRUFBRS9DLE9BRkc7QUFHVGdELE1BQUFBLFlBQVksRUFBRSxJQUhMO0FBSVRDLE1BQUFBLE9BQU8sRUFBRTtBQUpBLEtBREw7QUFPUkMsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVUSCxNQUFBQSxJQUFJLEVBQUVwQixPQUZHO0FBR1RxQixNQUFBQSxZQUFZLEVBQUUsSUFITDtBQUlUQyxNQUFBQSxPQUFPLEVBQUU7QUFKQSxLQVBMO0FBYVJFLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkosTUFBQUEsSUFBSSxFQUFFVixrQkFGRTtBQUdSVyxNQUFBQSxZQUFZLEVBQUUsSUFITjtBQUlSQyxNQUFBQSxPQUFPLEVBQUU7QUFKRCxLQWJKO0FBbUJSRyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBMLE1BQUFBLElBQUksRUFBRVAsb0JBRkM7QUFHUFEsTUFBQUEsWUFBWSxFQUFFLElBSFA7QUFJUEMsTUFBQUEsT0FBTyxFQUFFO0FBSkYsS0FuQkg7QUF5QlJJLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVk4sTUFBQUEsSUFBSSxFQUFFSixnQkFGSTtBQUdWSyxNQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxNQUFBQSxPQUFPLEVBQUU7QUFKQyxLQXpCTjtBQStCUkssSUFBQUEsWUFBWSxFQUFDO0FBQ1RDLE1BQUFBLFdBQVcsRUFBQyxVQURIO0FBRVRSLE1BQUFBLElBQUksRUFBRXZELGdCQUZHO0FBR1QsaUJBQVNBLGdCQUFnQixDQUFDRyxJQUhqQjtBQUlUcUQsTUFBQUEsWUFBWSxFQUFFLElBSkw7QUFLVEMsTUFBQUEsT0FBTyxFQUFFO0FBTEE7QUEvQkwsR0FIVztBQTJDdkJPLEVBQUFBLE9BQU8sRUFBRTtBQUFFO0FBQ1BDLElBQUFBLFFBQVEsRUFBRTtBQURMLEdBM0NjO0FBK0N2QkMsRUFBQUEsaUJBL0N1QiwrQkFnRHZCO0FBQ0lkLElBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxHQUF1QixJQUF2QjtBQUNBaEUsSUFBQUEsRUFBRSxDQUFDa0UsSUFBSCxDQUFRQyxxQkFBUixDQUE4QixLQUFLQyxJQUFuQztBQUNILEdBbkRzQjtBQXFEdkJDLEVBQUFBLE1BckR1QixvQkFxRGQ7QUFDTCxRQUFHLENBQUNsQixhQUFhLENBQUNhLFFBQWxCLEVBQ0E7QUFDSWIsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLEdBQXVCLElBQXZCO0FBQ0FoRSxNQUFBQSxFQUFFLENBQUNrRSxJQUFILENBQVFJLGtCQUFSLENBQTJCLEtBQUtGLElBQWhDO0FBQ0EsV0FBS2YsV0FBTCxHQUFpQixJQUFJOUMsT0FBSixFQUFqQjtBQUNBZ0UsTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsdUJBQXFCLEtBQUtKLElBQUwsQ0FBVTNELElBQTdDO0FBQ0gsS0FQSSxDQVNMOzs7QUFDQSxTQUFLZ0UsVUFBTCxHQUFnQixvRUFBaEI7QUFDQSxTQUFLQyxZQUFMLEdBQWtCLHNFQUFsQixDQVhLLENBYU47QUFDRixHQW5Fc0I7QUFxRXZCQyxFQUFBQSxXQXJFdUIsdUJBcUVYQyxNQXJFVyxFQXFFSkMsS0FyRUksRUFxRUVwQyxZQXJFRixFQXFFZXFDLFFBckVmLEVBc0V2QjtBQUFBLFFBRHNDQSxRQUN0QztBQURzQ0EsTUFBQUEsUUFDdEMsR0FEK0MsQ0FBQyxDQUNoRDtBQUFBOztBQUNJLFFBQUlDLE9BQU8sR0FBRyxJQUFJQyxXQUFKLENBQWdCSixNQUFoQixFQUF3QkMsS0FBeEIsQ0FBZDtBQUNBLFFBQUlJLE1BQU0sR0FBRztBQUFFLHNCQUFnQixpQ0FBbEI7QUFBcUQsdUJBQWlCeEM7QUFBdEUsS0FBYjtBQUNBLFNBQUt5QyxXQUFMLENBQWtCLEtBQUtULFVBQXZCLEVBQWtDLE1BQWxDLEVBQXlDTSxPQUF6QyxFQUFpRCxDQUFqRCxFQUFtREUsTUFBbkQsRUFBMERILFFBQTFEO0FBQ0gsR0ExRXNCO0FBNEV2QkssRUFBQUEsU0E1RXVCLHFCQTRFYlAsTUE1RWEsRUE0RU5RLFNBNUVNLEVBNEVJUCxLQTVFSixFQTZFdkI7QUFDSSxRQUFJRSxPQUFPLEdBQUMsSUFBSU0sZ0JBQUosQ0FBcUJULE1BQXJCLEVBQTRCUSxTQUE1QixFQUFzQ1AsS0FBdEMsQ0FBWjtBQUNBLFNBQUtLLFdBQUwsQ0FBa0IsS0FBS1IsWUFBdkIsRUFBb0MsTUFBcEMsRUFBMkNLLE9BQTNDLEVBQW1ELENBQW5ELEVBQXFELElBQXJELEVBQTBELENBQUMsQ0FBM0Q7QUFDSCxHQWhGc0I7QUFrRnZCTyxFQUFBQSxLQWxGdUIsaUJBa0ZqQkMsSUFsRmlCLEVBa0ZaQyxPQWxGWSxFQWtGSkMsWUFsRkksRUFrRlNDLFFBbEZULEVBbUZ2QjtBQUFBLFFBRGdDQSxRQUNoQztBQURnQ0EsTUFBQUEsUUFDaEMsR0FEeUMsSUFDekM7QUFBQTs7QUFDSSxRQUFHRixPQUFPLElBQUUsS0FBWixFQUNBO0FBQ0ksVUFBSUUsUUFBUSxJQUFHLElBQWYsRUFBcUI7QUFDakIsZUFBT0MsS0FBSyxDQUNSSixJQURRLEVBRVI7QUFDSUssVUFBQUEsT0FBTyxFQUFFO0FBQUUsNEJBQWdCO0FBQWxCLFdBRGI7QUFFSUMsVUFBQUEsTUFBTSxFQUFFTDtBQUZaLFNBRlEsQ0FBWjtBQU9ILE9BUkQsTUFTQTtBQUNJLGVBQU9HLEtBQUssQ0FDUkosSUFEUSxFQUVSO0FBQ0lLLFVBQUFBLE9BQU8sRUFBRUYsUUFEYjtBQUVJRyxVQUFBQSxNQUFNLEVBQUVMO0FBRlosU0FGUSxDQUFaO0FBT0g7QUFDSixLQXBCRCxNQXNCQTtBQUNJLFVBQUlFLFFBQVEsSUFBSSxJQUFoQixFQUFzQjtBQUNsQjtBQUNBO0FBQ0EsZUFBT0MsS0FBSyxDQUNSSixJQURRLEVBRVI7QUFDSUssVUFBQUEsT0FBTyxFQUFFO0FBQUUsNEJBQWdCO0FBQWxCLFdBRGI7QUFFSUMsVUFBQUEsTUFBTSxFQUFFTCxPQUZaO0FBR0lNLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVQLFlBQWY7QUFIVixTQUZRLENBQVo7QUFRSCxPQVhELE1BWUE7QUFDSSxlQUFPRSxLQUFLLENBQ1JKLElBRFEsRUFFUjtBQUNJSyxVQUFBQSxPQUFPLEVBQUdGLFFBRGQ7QUFFSUcsVUFBQUEsTUFBTSxFQUFFTCxPQUZaO0FBR0lNLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVQLFlBQWY7QUFIVixTQUZRLENBQVo7QUFRSDtBQUNKO0FBQ0osR0FsSXNCO0FBb0l2QlAsRUFBQUEsV0FwSXVCLHVCQW9JWEssSUFwSVcsRUFvSU5DLE9BcElNLEVBb0lFQyxZQXBJRixFQW9JZVEsS0FwSWYsRUFvSXFCUCxRQXBJckIsRUFvSW1DWixRQXBJbkMsRUFvSWdEO0FBQUEsUUFBM0JZLFFBQTJCO0FBQTNCQSxNQUFBQSxRQUEyQixHQUFsQixJQUFrQjtBQUFBOztBQUFBLFFBQWJaLFFBQWE7QUFBYkEsTUFBQUEsUUFBYSxHQUFKLENBQUMsQ0FBRztBQUFBOztBQUNuRW9CLElBQUFBLGFBQWEsQ0FBQ1gsSUFBRCxFQUFNQyxPQUFOLEVBQWNDLFlBQWQsRUFBMkJDLFFBQTNCLENBQWI7O0FBRG1FLGFBRXBEUSxhQUZvRDtBQUFBO0FBQUEsTUEyRm5FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUE3R21FO0FBQUEsK0VBRW5FLGlCQUE2QlgsSUFBN0IsRUFBa0NDLE9BQWxDLEVBQTBDQyxZQUExQyxFQUF1REMsUUFBdkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBQXVEQSxRQUF2RDtBQUF1REEsa0JBQUFBLFFBQXZELEdBQWdFLElBQWhFO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHVCQUUyQnZDLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QnNCLEtBQXZCLENBQTZCQyxJQUE3QixFQUFrQ0MsT0FBbEMsRUFBMENDLFlBQTFDLEVBQXVEQyxRQUF2RCxDQUYzQjs7QUFBQTtBQUVZUyxnQkFBQUEsUUFGWjtBQUFBO0FBQUEsdUJBRzJCQSxRQUFRLENBQUNDLElBQVQsRUFIM0I7O0FBQUE7QUFHWUMsZ0JBQUFBLFFBSFo7O0FBS1Esb0JBQUdKLEtBQUssSUFBRSxDQUFWLEVBQWE7QUFDYjtBQUNRSyxvQkFBQUEsUUFEUixHQUNpQixJQUFJQyxnQkFBSixDQUFxQkYsUUFBUSxDQUFDRyxVQUE5QixFQUF5Q0gsUUFBUSxDQUFDSSxPQUFsRCxFQUEwREosUUFBUSxDQUFDSyxJQUFuRSxDQURqQjtBQUVJbkMsb0JBQUFBLE9BQU8sQ0FBQ29DLEdBQVIsQ0FBWU4sUUFBWjs7QUFDQSx3QkFBSXZCLFFBQVEsSUFBSSxDQUFoQixFQUFtQjtBQUFFO0FBQ2pCLDBCQUFJd0IsUUFBUSxDQUFDRyxPQUFULENBQWlCRyxRQUFqQixDQUEwQixTQUExQixLQUF3Q04sUUFBUSxDQUFDRyxPQUFULENBQWlCRyxRQUFqQixDQUEwQixhQUExQixDQUE1QyxFQUFzRjtBQUNsRnJDLHdCQUFBQSxPQUFPLENBQUNvQyxHQUFSLENBQVksdUJBQVo7QUFDQXBDLHdCQUFBQSxPQUFPLENBQUNvQyxHQUFSLENBQVlMLFFBQVosRUFGa0YsQ0FJbEY7O0FBQ0F0Ryx3QkFBQUEsRUFBRSxDQUFDNkcsV0FBSCxDQUFlQyxJQUFmLENBQW9CLFdBQXBCLEVBQWlDUixRQUFqQztBQUNBdEcsd0JBQUFBLEVBQUUsQ0FBQzZHLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixhQUFwQixFQUFtQyxDQUFuQztBQUNILHVCQVBELE1BUUE7QUFDSTlHLHdCQUFBQSxFQUFFLENBQUM2RyxXQUFILENBQWVDLElBQWYsQ0FBb0IsYUFBcEIsRUFBbUMsQ0FBbkM7QUFDSDtBQUNKO0FBQ0osbUJBakJELE1Ba0JLLElBQUdiLEtBQUssSUFBRSxDQUFWLEVBQWE7QUFDbEI7QUFDUUssb0JBQUFBLFFBRFIsR0FDaUIsSUFBSUMsZ0JBQUosQ0FBcUJGLFFBQVEsQ0FBQ0csVUFBOUIsRUFBeUNILFFBQVEsQ0FBQ0ksT0FBbEQsRUFBMERKLFFBQVEsQ0FBQ0ssSUFBbkUsQ0FEakI7QUFFSW5DLG9CQUFBQSxPQUFPLENBQUNvQyxHQUFSLENBQVlOLFFBQVo7O0FBQ0Esd0JBQUdDLFFBQVEsQ0FBQ0csT0FBVCxDQUFpQkcsUUFBakIsQ0FBMEIsYUFBMUIsQ0FBSCxFQUNBO0FBQ0k1RyxzQkFBQUEsRUFBRSxDQUFDNkcsV0FBSCxDQUFlQyxJQUFmLENBQW9CLFdBQXBCLEVBQWdDUixRQUFoQztBQUNBL0Isc0JBQUFBLE9BQU8sQ0FBQ29DLEdBQVIsQ0FBWSw2QkFBWjtBQUNBcEMsc0JBQUFBLE9BQU8sQ0FBQ29DLEdBQVIsQ0FBWUwsUUFBWjs7QUFDQSwwQkFBR0EsUUFBUSxDQUFDSSxJQUFULENBQWNLLFFBQWQsQ0FBdUJILFFBQXZCLENBQWdDLFNBQWhDLENBQUgsRUFDQTtBQUNJekQsd0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBb0M5RCxnQkFBZ0IsQ0FBQ0ksVUFBckQ7QUFDQWdELHdCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJnRCxpQkFBdkIsQ0FBeUNWLFFBQXpDLEVBQWtELElBQWxEO0FBQ0F0Ryx3QkFBQUEsRUFBRSxDQUFDNkcsV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF3QyxJQUF4QyxFQUE2QyxLQUE3QyxFQUFtRCxLQUFuRCxFQUF5RCxLQUF6RCxFQUErRCxLQUEvRDtBQUNILHVCQUxELE1BTUssSUFBR1IsUUFBUSxDQUFDSSxJQUFULENBQWNLLFFBQWQsQ0FBdUJILFFBQXZCLENBQWdDLFNBQWhDLENBQUgsRUFDTDtBQUNJekQsd0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBb0M5RCxnQkFBZ0IsQ0FBQ0ksVUFBckQ7QUFDQWdELHdCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJpRCxpQkFBdkIsQ0FBeUNYLFFBQXpDLEVBQWtELElBQWxEO0FBQ0F0Ryx3QkFBQUEsRUFBRSxDQUFDNkcsV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF3QyxLQUF4QyxFQUE4QyxJQUE5QyxFQUFtRCxLQUFuRCxFQUF5RCxLQUF6RCxFQUErRCxLQUEvRDtBQUNILHVCQUxJLE1BTUEsSUFBR1IsUUFBUSxDQUFDSSxJQUFULENBQWNLLFFBQWQsQ0FBdUJILFFBQXZCLENBQWdDLG1CQUFoQyxDQUFILEVBQ0w7QUFDSXpELHdCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQW9DOUQsZ0JBQWdCLENBQUNJLFVBQXJEO0FBQ0FnRCx3QkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCa0QsZ0JBQXZCLENBQXdDWixRQUF4QyxFQUFpRCxJQUFqRDtBQUNBdEcsd0JBQUFBLEVBQUUsQ0FBQzZHLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBd0MsS0FBeEMsRUFBOEMsS0FBOUMsRUFBb0QsSUFBcEQsRUFBeUQsS0FBekQsRUFBK0QsS0FBL0Q7QUFDSCx1QkFMSSxNQU1BLElBQUdSLFFBQVEsQ0FBQ0ksSUFBVCxDQUFjSyxRQUFkLENBQXVCSCxRQUF2QixDQUFnQyxhQUFoQyxDQUFILEVBQ0w7QUFDSXpELHdCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQW9DOUQsZ0JBQWdCLENBQUNJLFVBQXJEO0FBQ0FnRCx3QkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCbUQsZUFBdkIsQ0FBdUNiLFFBQXZDLEVBQWdELElBQWhEO0FBQ0F0Ryx3QkFBQUEsRUFBRSxDQUFDNkcsV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF3QyxLQUF4QyxFQUE4QyxLQUE5QyxFQUFvRCxLQUFwRCxFQUEwRCxJQUExRCxFQUErRCxLQUEvRDtBQUNILHVCQUxJLE1BTUEsSUFBR1IsUUFBUSxDQUFDSSxJQUFULENBQWNLLFFBQWQsQ0FBdUJILFFBQXZCLENBQWdDLGlCQUFoQyxDQUFILEVBQ0w7QUFDSXpELHdCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQW9DOUQsZ0JBQWdCLENBQUNJLFVBQXJEO0FBQ0FnRCx3QkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCb0Qsa0JBQXZCLENBQTBDZCxRQUExQyxFQUFtRCxJQUFuRDtBQUNBdEcsd0JBQUFBLEVBQUUsQ0FBQzZHLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBd0MsS0FBeEMsRUFBOEMsS0FBOUMsRUFBb0QsS0FBcEQsRUFBMEQsS0FBMUQsRUFBZ0UsSUFBaEU7QUFDSDtBQUNKLHFCQW5DRCxNQW9DTSxJQUFHUixRQUFRLENBQUNHLE9BQVQsQ0FBaUJHLFFBQWpCLENBQTBCLE9BQTFCLEtBQXFDTixRQUFRLENBQUNHLE9BQVQsQ0FBaUJHLFFBQWpCLENBQTBCLFlBQTFCLENBQXhDLEVBQ047QUFDSXpELHNCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQW9DOUQsZ0JBQWdCLENBQUNNLG9CQUFyRDtBQUNBTCxzQkFBQUEsRUFBRSxDQUFDNkcsV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQjtBQUNILHFCQUpLLE1BS0QsSUFBR1IsUUFBUSxDQUFDRyxPQUFULENBQWlCRyxRQUFqQixDQUEwQixpQkFBMUIsQ0FBSCxFQUNMO0FBQ0l6RCxzQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFvQzlELGdCQUFnQixDQUFDSyxZQUFyRDtBQUNBSixzQkFBQUEsRUFBRSxDQUFDNkcsV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQjtBQUNILHFCQUpJLE1BSUMsSUFBR1IsUUFBUSxDQUFDRyxPQUFULENBQWlCRyxRQUFqQixDQUEwQiw2Q0FBMUIsQ0FBSCxFQUNOO0FBQ0l6RCxzQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFvQzlELGdCQUFnQixDQUFDTSxvQkFBckQ7QUFDQUwsc0JBQUFBLEVBQUUsQ0FBQzZHLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEI7QUFDSDtBQUNKOztBQTdFVDtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUErRVEsb0JBQUdiLEtBQUssSUFBRSxDQUFWLEVBQWE7QUFDYjtBQUNJOUMsb0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBb0M5RCxnQkFBZ0IsQ0FBQ08sU0FBckQ7QUFDQU4sb0JBQUFBLEVBQUUsQ0FBQzZHLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEI7QUFDSDs7QUFDRHZDLGdCQUFBQSxPQUFPLENBQUNDLEtBQVI7O0FBcEZSO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUZtRTtBQUFBO0FBQUE7QUE4R3RFLEdBbFBzQjtBQW9QdkJ3QyxFQUFBQSxpQkFwUHVCLDZCQW9QTEssWUFwUEssRUFvUFFDLFVBcFBSLEVBcVB2QjtBQUNJLFNBQUtqRSxXQUFMLENBQWlCNUMsSUFBakIsR0FBc0I0RyxZQUFZLENBQUNYLElBQWIsQ0FBa0JqRyxJQUF4QztBQUNBLFNBQUs0QyxXQUFMLENBQWlCMUMsR0FBakIsR0FBcUIwRyxZQUFZLENBQUNYLElBQWIsQ0FBa0JhLEdBQXZDO0FBQ0EsU0FBS2xFLFdBQUwsQ0FBaUJ6QyxVQUFqQixHQUE0QnlHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQjlGLFVBQTlDO0FBQ0EsU0FBS3lDLFdBQUwsQ0FBaUJ4QyxZQUFqQixHQUE4QndHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmMsRUFBaEQ7QUFDQSxTQUFLbkUsV0FBTCxDQUFpQnZDLFdBQWpCLEdBQTZCdUcsWUFBWSxDQUFDWCxJQUFiLENBQWtCNUYsV0FBL0M7QUFDQSxTQUFLdUMsV0FBTCxDQUFpQnRDLFlBQWpCLEdBQThCc0csWUFBWSxDQUFDWCxJQUFiLENBQWtCZSxNQUFoRDtBQUNBLFNBQUtwRSxXQUFMLENBQWlCckMsUUFBakIsR0FBMEJxRyxZQUFZLENBQUNYLElBQWIsQ0FBa0IxRixRQUE1QztBQUNBLFNBQUtxQyxXQUFMLENBQWlCcEMsVUFBakIsR0FBNEJvRyxZQUFZLENBQUNYLElBQWIsQ0FBa0JnQixTQUE5QztBQUNBLFNBQUtyRSxXQUFMLENBQWlCbkMsY0FBakIsR0FBZ0NtRyxZQUFZLENBQUNYLElBQWIsQ0FBa0J4RixjQUFsRDtBQUNBLFNBQUttQyxXQUFMLENBQWlCbEMsUUFBakIsR0FBMEJrRyxZQUFZLENBQUNYLElBQWIsQ0FBa0JpQixVQUE1QztBQUNBLFNBQUt0RSxXQUFMLENBQWlCL0IsTUFBakIsR0FBd0IrRixZQUFZLENBQUNYLElBQWIsQ0FBa0JwRixNQUExQzs7QUFFQSxRQUFHZ0csVUFBSCxFQUNBO0FBQ0ksV0FBS2pFLFdBQUwsQ0FBaUJqQyxXQUFqQixHQUE2QmlHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmtCLFNBQS9DO0FBQ0EsV0FBS3ZFLFdBQUwsQ0FBaUJoQyxTQUFqQixHQUEyQmdHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQm1CLFNBQTdDO0FBQ0g7O0FBRUR0RCxJQUFBQSxPQUFPLENBQUNvQyxHQUFSLENBQVksS0FBS3RELFdBQWpCO0FBQ0gsR0F6UXNCO0FBMlF2QjRELEVBQUFBLGlCQTNRdUIsNkJBMlFMSSxZQTNRSyxFQTJRUUMsVUEzUVIsRUE0UXZCO0FBQ0ksU0FBSzdELFdBQUwsQ0FBaUJoRCxJQUFqQixHQUFzQjRHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmpHLElBQXhDO0FBQ0EsU0FBS2dELFdBQUwsQ0FBaUJ0QixNQUFqQixHQUF3QmtGLFlBQVksQ0FBQ1gsSUFBYixDQUFrQjFELFVBQTFDO0FBQ0EsU0FBS1MsV0FBTCxDQUFpQnJCLFdBQWpCLEdBQTZCaUYsWUFBWSxDQUFDWCxJQUFiLENBQWtCdEUsV0FBL0M7QUFDQSxTQUFLcUIsV0FBTCxDQUFpQjVDLFlBQWpCLEdBQThCd0csWUFBWSxDQUFDWCxJQUFiLENBQWtCYyxFQUFoRDtBQUNBLFNBQUsvRCxXQUFMLENBQWlCcEIsYUFBakIsR0FBaUNnRixZQUFZLENBQUNYLElBQWIsQ0FBa0JyRSxhQUFuRDtBQUNBLFNBQUtvQixXQUFMLENBQWlCbkMsTUFBakIsR0FBd0IrRixZQUFZLENBQUNYLElBQWIsQ0FBa0JwRixNQUExQzs7QUFFQSxRQUFHZ0csVUFBSCxFQUNBO0FBQ0ksV0FBSzdELFdBQUwsQ0FBaUJyQyxXQUFqQixHQUE2QmlHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmtCLFNBQS9DO0FBQ0EsV0FBS25FLFdBQUwsQ0FBaUJwQyxTQUFqQixHQUEyQmdHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQm1CLFNBQTdDO0FBQ0g7O0FBRUR0RCxJQUFBQSxPQUFPLENBQUNvQyxHQUFSLENBQVksS0FBS2xELFdBQWpCO0FBQ0gsR0EzUnNCO0FBNlJ2QnlELEVBQUFBLGdCQTdSdUIsNEJBNlJORyxZQTdSTSxFQTZST0MsVUE3UlAsRUE4UnZCO0FBQ0ksU0FBSzVELFVBQUwsQ0FBZ0JqRCxJQUFoQixHQUFxQjRHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmpHLElBQXZDO0FBQ0EsU0FBS2lELFVBQUwsQ0FBZ0I3QyxZQUFoQixHQUE2QndHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmMsRUFBL0M7QUFDQSxTQUFLOUQsVUFBTCxDQUFnQnJCLGFBQWhCLEdBQWdDZ0YsWUFBWSxDQUFDWCxJQUFiLENBQWtCckUsYUFBbEQ7QUFDQSxTQUFLcUIsVUFBTCxDQUFnQnBDLE1BQWhCLEdBQXlCK0YsWUFBWSxDQUFDWCxJQUFiLENBQWtCcEYsTUFBM0M7QUFDQSxTQUFLb0MsVUFBTCxDQUFnQmIsT0FBaEIsR0FBd0J3RSxZQUFZLENBQUNYLElBQWIsQ0FBa0I3RCxPQUExQzs7QUFFQSxRQUFHeUUsVUFBSCxFQUNBO0FBQ0ksV0FBSzVELFVBQUwsQ0FBZ0J0QyxXQUFoQixHQUE0QmlHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmtCLFNBQTlDO0FBQ0EsV0FBS2xFLFVBQUwsQ0FBZ0JyQyxTQUFoQixHQUEwQmdHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQm1CLFNBQTVDO0FBQ0g7O0FBRUR0RCxJQUFBQSxPQUFPLENBQUNvQyxHQUFSLENBQVksS0FBS2pELFVBQWpCO0FBQ0gsR0E1U3NCO0FBOFN2QnlELEVBQUFBLGVBOVN1QiwyQkE4U1BFLFlBOVNPLEVBOFNNQyxVQTlTTixFQStTdkI7QUFDSSxTQUFLM0QsU0FBTCxDQUFlbEQsSUFBZixHQUFvQjRHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmpHLElBQXRDO0FBQ0EsU0FBS2tELFNBQUwsQ0FBZTlDLFlBQWYsR0FBNEJ3RyxZQUFZLENBQUNYLElBQWIsQ0FBa0JjLEVBQTlDO0FBQ0EsU0FBSzdELFNBQUwsQ0FBZXRCLGFBQWYsR0FBK0JnRixZQUFZLENBQUNYLElBQWIsQ0FBa0JyRSxhQUFqRDtBQUNBLFNBQUtzQixTQUFMLENBQWVyQyxNQUFmLEdBQXdCK0YsWUFBWSxDQUFDWCxJQUFiLENBQWtCcEYsTUFBMUM7QUFDQSxTQUFLcUMsU0FBTCxDQUFlWCxVQUFmLEdBQTBCcUUsWUFBWSxDQUFDWCxJQUFiLENBQWtCMUQsVUFBNUM7O0FBRUEsUUFBR3NFLFVBQUgsRUFDQTtBQUNJLFdBQUszRCxTQUFMLENBQWV2QyxXQUFmLEdBQTJCaUcsWUFBWSxDQUFDWCxJQUFiLENBQWtCa0IsU0FBN0M7QUFDQSxXQUFLakUsU0FBTCxDQUFldEMsU0FBZixHQUF5QmdHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQm1CLFNBQTNDO0FBQ0g7O0FBRUR0RCxJQUFBQSxPQUFPLENBQUNvQyxHQUFSLENBQVksS0FBS2hELFNBQWpCO0FBQ0gsR0E3VHNCO0FBK1R2QnlELEVBQUFBLGtCQS9UdUIsOEJBK1RKQyxZQS9USSxFQStUU0MsVUEvVFQsRUFnVXZCO0FBQ0ksU0FBSzFELFlBQUwsQ0FBa0JuRCxJQUFsQixHQUF1QjRHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmpHLElBQXpDO0FBQ0EsU0FBS21ELFlBQUwsQ0FBa0IvQyxZQUFsQixHQUErQndHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmMsRUFBakQ7O0FBRUEsUUFBR0YsVUFBSCxFQUNBO0FBQ0ksV0FBSzFELFlBQUwsQ0FBa0J4QyxXQUFsQixHQUE4QmlHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQmtCLFNBQWhEO0FBQ0EsV0FBS2hFLFlBQUwsQ0FBa0J2QyxTQUFsQixHQUE0QmdHLFlBQVksQ0FBQ1gsSUFBYixDQUFrQm1CLFNBQTlDO0FBQ0g7O0FBRUR0RCxJQUFBQSxPQUFPLENBQUNvQyxHQUFSLENBQVksS0FBSy9DLFlBQWpCO0FBQ0gsR0EzVXNCO0FBNFV2QmtFLEVBQUFBLEtBNVV1QixtQkE0VWYsQ0FBRyxDQTVVWTtBQThVdkJDLEVBQUFBLGtCQTlVdUIsOEJBOFVKekIsUUE5VUksRUErVXZCO0FBRVkvQixJQUFBQSxPQUFPLENBQUNvQyxHQUFSLENBQVksMkNBQVo7QUFDQXBDLElBQUFBLE9BQU8sQ0FBQ29DLEdBQVIsQ0FBWUwsUUFBWjs7QUFDQSxRQUFHQSxRQUFRLENBQUNJLElBQVQsQ0FBY0ssUUFBZCxDQUF1QkgsUUFBdkIsQ0FBZ0MsU0FBaEMsQ0FBSCxFQUNBO0FBQ0l6RCxNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQW9DOUQsZ0JBQWdCLENBQUNJLFVBQXJEO0FBQ0FnRCxNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJnRCxpQkFBdkIsQ0FBeUNWLFFBQXpDLEVBQWtELElBQWxEO0FBQ0F0RyxNQUFBQSxFQUFFLENBQUM2RyxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCLEVBQXdDLElBQXhDLEVBQTZDLEtBQTdDLEVBQW1ELEtBQW5ELEVBQXlELEtBQXpELEVBQStELEtBQS9EO0FBQ0gsS0FMRCxNQU1LLElBQUdSLFFBQVEsQ0FBQ0ksSUFBVCxDQUFjSyxRQUFkLENBQXVCSCxRQUF2QixDQUFnQyxTQUFoQyxDQUFILEVBQ0w7QUFDSXpELE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBb0M5RCxnQkFBZ0IsQ0FBQ0ksVUFBckQ7QUFDQWdELE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QmlELGlCQUF2QixDQUF5Q1gsUUFBekMsRUFBa0QsSUFBbEQ7QUFDQXRHLE1BQUFBLEVBQUUsQ0FBQzZHLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBd0MsS0FBeEMsRUFBOEMsSUFBOUMsRUFBbUQsS0FBbkQsRUFBeUQsS0FBekQsRUFBK0QsS0FBL0Q7QUFDSCxLQUxJLE1BTUEsSUFBR1IsUUFBUSxDQUFDSSxJQUFULENBQWNLLFFBQWQsQ0FBdUJILFFBQXZCLENBQWdDLG1CQUFoQyxDQUFILEVBQ0w7QUFDSXpELE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBb0M5RCxnQkFBZ0IsQ0FBQ0ksVUFBckQ7QUFDQWdELE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QmtELGdCQUF2QixDQUF3Q1osUUFBeEMsRUFBaUQsSUFBakQ7QUFDQXRHLE1BQUFBLEVBQUUsQ0FBQzZHLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBd0MsS0FBeEMsRUFBOEMsS0FBOUMsRUFBb0QsSUFBcEQsRUFBeUQsS0FBekQsRUFBK0QsS0FBL0Q7QUFDSCxLQUxJLE1BTUEsSUFBR1IsUUFBUSxDQUFDSSxJQUFULENBQWNLLFFBQWQsQ0FBdUJILFFBQXZCLENBQWdDLGFBQWhDLENBQUgsRUFDTDtBQUNJekQsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFvQzlELGdCQUFnQixDQUFDSSxVQUFyRDtBQUNBZ0QsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCbUQsZUFBdkIsQ0FBdUNiLFFBQXZDLEVBQWdELElBQWhEO0FBQ0F0RyxNQUFBQSxFQUFFLENBQUM2RyxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCLEVBQXdDLEtBQXhDLEVBQThDLEtBQTlDLEVBQW9ELEtBQXBELEVBQTBELElBQTFELEVBQStELEtBQS9EO0FBQ0gsS0FMSSxNQU1BLElBQUdSLFFBQVEsQ0FBQ0ksSUFBVCxDQUFjSyxRQUFkLENBQXVCSCxRQUF2QixDQUFnQyxpQkFBaEMsQ0FBSCxFQUNMO0FBQ0l6RCxNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQW9DOUQsZ0JBQWdCLENBQUNJLFVBQXJEO0FBQ0FnRCxNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJvRCxrQkFBdkIsQ0FBMENkLFFBQTFDLEVBQW1ELElBQW5EO0FBQ0F0RyxNQUFBQSxFQUFFLENBQUM2RyxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCLEVBQXdDLEtBQXhDLEVBQThDLEtBQTlDLEVBQW9ELEtBQXBELEVBQTBELEtBQTFELEVBQWdFLElBQWhFO0FBQ0g7QUFDWjtBQWpYc0IsQ0FBVCxDQUFsQixFQW9YQTs7QUFDQSxJQUFJOUIsV0FBVyxHQUFHaEYsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDdkJDLEVBQUFBLElBQUksRUFBQyxhQURrQjtBQUV2QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JzSCxJQUFBQSxLQUFLLEVBQUUsRUFEQztBQUVSQyxJQUFBQSxJQUFJLEVBQUU7QUFGRSxHQUZXO0FBTTNCO0FBQ0kxRyxFQUFBQSxJQUFJLEVBQUUsY0FFRXFELE1BRkYsRUFHRUMsS0FIRixFQUlBO0FBQUEsUUFGRUQsTUFFRjtBQUZFQSxNQUFBQSxNQUVGLEdBRlUsTUFFVjtBQUFBOztBQUFBLFFBREVDLEtBQ0Y7QUFERUEsTUFBQUEsS0FDRixHQURTLE1BQ1Q7QUFBQTs7QUFDRixTQUFLbUQsS0FBTCxHQUFhcEQsTUFBYjtBQUNBLFNBQUtxRCxJQUFMLEdBQVlwRCxLQUFaO0FBQ0g7QUFkc0IsQ0FBVCxDQUFsQixFQWlCQTs7QUFDQSxJQUFJcUQsSUFBSSxHQUFHbEksRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDaEJDLEVBQUFBLElBQUksRUFBQyxNQURXO0FBRWhCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUmlILElBQUFBLFVBQVUsRUFBRSxFQURKO0FBRVJRLElBQUFBLEdBQUcsRUFBRSxFQUZHO0FBR1JQLElBQUFBLFNBQVMsRUFBQyxFQUhGO0FBSVJ4RixJQUFBQSxXQUFXLEVBQUMsRUFKSjtBQUtSQyxJQUFBQSxhQUFhLEVBQUMsRUFMTjtBQU1SVyxJQUFBQSxVQUFVLEVBQUMsRUFOSDtBQU9SaEMsSUFBQUEsUUFBUSxFQUFDLEVBUEQ7QUFRUm9ILElBQUFBLFNBQVMsRUFBQyxDQVJGO0FBU1JDLElBQUFBLFNBQVMsRUFBQyxLQVRGO0FBVVJDLElBQUFBLFNBQVMsRUFBQyxFQVZGO0FBV1IxSCxJQUFBQSxVQUFVLEVBQUMsRUFYSDtBQVlSSCxJQUFBQSxJQUFJLEVBQUMsRUFaRztBQWFSc0csSUFBQUEsUUFBUSxFQUFDLEVBYkQ7QUFjUndCLElBQUFBLFFBQVEsRUFBQyxFQWREO0FBZVJkLElBQUFBLE1BQU0sRUFBQyxFQWZDO0FBZ0JSSSxJQUFBQSxTQUFTLEVBQUMsQ0FoQkY7QUFpQlIvRyxJQUFBQSxXQUFXLEVBQUMsRUFqQko7QUFrQlJ5RyxJQUFBQSxHQUFHLEVBQUMsRUFsQkk7QUFtQlJDLElBQUFBLEVBQUUsRUFBQyxFQW5CSztBQW9CUkUsSUFBQUEsU0FBUyxFQUFDLEVBcEJGO0FBcUJSYyxJQUFBQSxFQUFFLEVBQUMsRUFyQks7QUFzQlJ0SCxJQUFBQSxjQUFjLEVBQUMsRUF0QlA7QUF1QlJJLElBQUFBLE1BQU0sRUFBRSxFQXZCQTtBQXdCUnVCLElBQUFBLE9BQU8sRUFBQztBQXhCQTtBQUZJLENBQVQsQ0FBWCxFQThCQTs7QUFDQSxJQUFJMEQsZ0JBQWdCLEdBQUd2RyxFQUFFLENBQUNRLEtBQUgsQ0FBUztBQUM1QkMsRUFBQUEsSUFBSSxFQUFDLGtCQUR1QjtBQUU1QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I4RixJQUFBQSxVQUFVLEVBQUUsRUFESjtBQUVSQyxJQUFBQSxPQUFPLEVBQUUsRUFGRDtBQUdSQyxJQUFBQSxJQUFJLEVBQUN3QjtBQUhHLEdBRmdCO0FBT2hDO0FBQ0kzRyxFQUFBQSxJQUFJLEVBQUUsY0FFRWtILFdBRkYsRUFHRUMsUUFIRixFQUlFQyxLQUpGLEVBS0E7QUFBQSxRQUhFRixXQUdGO0FBSEVBLE1BQUFBLFdBR0YsR0FIZSxNQUdmO0FBQUE7O0FBQUEsUUFGRUMsUUFFRjtBQUZFQSxNQUFBQSxRQUVGLEdBRlksTUFFWjtBQUFBOztBQUFBLFFBREVDLEtBQ0Y7QUFERUEsTUFBQUEsS0FDRixHQURRLElBQ1I7QUFBQTs7QUFDRixTQUFLbkMsVUFBTCxHQUFrQmlDLFdBQWxCO0FBQ0EsU0FBS2hDLE9BQUwsR0FBZWlDLFFBQWY7QUFDQSxTQUFLaEMsSUFBTCxHQUFVaUMsS0FBVjtBQUNIO0FBakIyQixDQUFULENBQXZCLEVBb0JBOztBQUNBLElBQUl0RCxnQkFBZ0IsR0FBR3JGLEVBQUUsQ0FBQ1EsS0FBSCxDQUFTO0FBQzVCQyxFQUFBQSxJQUFJLEVBQUMsa0JBRHVCO0FBRTVCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUnNILElBQUFBLEtBQUssRUFBRSxFQURDO0FBRVJPLElBQUFBLFFBQVEsRUFBQyxFQUZEO0FBR1JOLElBQUFBLElBQUksRUFBRTtBQUhFLEdBRmdCO0FBT2hDO0FBQ0kxRyxFQUFBQSxJQUFJLEVBQUUsY0FFRXFELE1BRkYsRUFHRVEsU0FIRixFQUlFUCxLQUpGLEVBS0E7QUFBQSxRQUhFRCxNQUdGO0FBSEVBLE1BQUFBLE1BR0YsR0FIVSxNQUdWO0FBQUE7O0FBQUEsUUFGRVEsU0FFRjtBQUZFQSxNQUFBQSxTQUVGLEdBRlksTUFFWjtBQUFBOztBQUFBLFFBREVQLEtBQ0Y7QUFERUEsTUFBQUEsS0FDRixHQURTLE1BQ1Q7QUFBQTs7QUFDRixTQUFLbUQsS0FBTCxHQUFhcEQsTUFBYjtBQUNBLFNBQUsyRCxRQUFMLEdBQWdCbkQsU0FBaEI7QUFDQSxTQUFLNkMsSUFBTCxHQUFZcEQsS0FBWjtBQUNIO0FBakIyQixDQUFULENBQXZCO0FBc0JBK0QsTUFBTSxDQUFDQyxPQUFQLEdBQWdCMUYsYUFBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciB0eXBlIG9mIGJ1c2luZXNzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSZXNwb25zZVR5cGVFbnVtID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBTdWNjZXNzZnVsOiAxLCAgICAgICAgICAgXHJcbiAgICBVc2VyTm90Rm91bmQ6IDIsXHJcbiAgICBJbnZhbGlkRW1haWxQYXNzd29yZDogMyxcclxuICAgIFdlbnRXcm9uZzo0ICAgICAgICAgICAgICBcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdHVkZW50IERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0dWRlbnQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiU3R1ZGVudFwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgZE9COiBcIlwiLFxyXG4gICAgICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICAgICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgICAgIGZhY2Vib29rUGFnZTogXCJcIixcclxuICAgICAgICBnYW1lc1dvbjogMCxcclxuICAgICAgICB0ZXN0c1Rha2VuOiAwLFxyXG4gICAgICAgIHRlc3RpbmdBdmVyYWdlOiAwLFxyXG4gICAgICAgIGdhbWVDYXNoOiAwLFxyXG4gICAgICAgIEFjY2Vzc1Rva2VuOlwiXCIsXHJcbiAgICAgICAgVXBkYXRlZEF0OjAsXHJcbiAgICAgICAgdXNlcklEOlwiXCJcclxuICAgIH0sXHJcbi8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gICAgY3RvcjogZnVuY3Rpb25cclxuICAgICAgICAoXHJcbiAgICAgICAgICAgIF9uYW1lID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9kb2IgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2dyYWRlTGV2ZWwgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfdGVhY2hlck5hbWUgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2ZhY2Vib29rUGFnZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfZ2FtZXNXb24gPSAwLFxyXG4gICAgICAgICAgICBfdGVzdHNUYWtlbiA9IDAsXHJcbiAgICAgICAgICAgIF90ZXN0aW5nQXZlcmFnZSA9IDAsXHJcbiAgICAgICAgICAgIF9nYW1lQ2FzaCA9IDBcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgICAgICB0aGlzLmRPQiA9IF9kb2I7XHJcbiAgICAgICAgdGhpcy5ncmFkZUxldmVsID0gX2dyYWRlTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMudGVhY2hlck5hbWUgPSBfdGVhY2hlck5hbWU7XHJcbiAgICAgICAgdGhpcy5mYWNlYm9va1BhZ2UgPSBfZmFjZWJvb2tQYWdlO1xyXG4gICAgICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICAgICAgdGhpcy50ZXN0c1Rha2VuID0gX3Rlc3RzVGFrZW47XHJcbiAgICAgICAgdGhpcy50ZXN0aW5nQXZlcmFnZSA9IF90ZXN0aW5nQXZlcmFnZTtcclxuICAgICAgICB0aGlzLmdhbWVDYXNoID0gX2dhbWVDYXNoO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVGVhY2hlciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFRlYWNoZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlRlYWNoZXJcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIHNjaG9vbDogXCJcIixcclxuICAgICAgICBjbGFzc1RhdWdodDogMCxcclxuICAgICAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICAgICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgICAgICBBY2Nlc3NUb2tlbjpcIlwiLFxyXG4gICAgICAgIFVwZGF0ZWRBdDogMCxcclxuICAgICAgICB1c2VySUQ6XCJcIlxyXG4gICAgfSxcclxuICAgIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChfbmFtZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfc2Nob29sID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9jbGFzc1RhdWdodCA9IDAsXHJcbiAgICAgICAgICAgIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2NvbnRhY3ROdW1iZXIgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2FjY2Vzc1Rva2VuID0gXCJcIixcclxuICAgICAgICAgICAgX3VwZGF0ZWRBdCA9IDAsXHJcbiAgICAgICAgICAgIF91c2VySUQ9XCJcIlxyXG4gICAgICAgICkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgICAgIHRoaXMuc2Nob29sID0gX3NjaG9vbDtcclxuICAgICAgICB0aGlzLmNsYXNzVGF1Z2h0ID0gX2NsYXNzVGF1Z2h0O1xyXG4gICAgICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgICAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgICAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2dyYW0gQW1iYXNzYWRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBQcm9ncmFtQW1iYXNzYWRvcnMgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlByb2dyYW1BbWJhc3NhZG9yc1wiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICAgICAgYWRkcmVzczogXCJcIixcclxuICAgICAgICBBY2Nlc3NUb2tlbjpcIlwiLFxyXG4gICAgICAgIFVwZGF0ZWRBdDogMCxcclxuICAgICAgICB1c2VySUQ6XCJcIlxyXG4gICAgfSxcclxuICAgIC8vRGVhZnVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChfbmFtZSA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9hZGRyZXNzID0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9hY2Nlc3NUb2tlbiA9IFwiXCIsXHJcbiAgICAgICAgICAgIF91cGRhdGVkQXQgPSAwLFxyXG4gICAgICAgICAgICBfdXNlcklEPVwiXCJcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgICAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gX2FkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgICAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICAgICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTY2hvb2wgQWRtaW5pc3RyYXRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBTY2hvb2xBZG1pbmlzdHJhdG9ycyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiU2Nob29sQWRtaW5pc3RyYXRvcnNcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICAgICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgICAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICAgICAgQWNjZXNzVG9rZW46XCJcIixcclxuICAgICAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICAgICAgdXNlcklEOlwiXCJcclxuICAgIH0sXHJcbiAgICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gICAgY3RvcjogZnVuY3Rpb25cclxuICAgICAgICAoX25hbWUgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX3NjaG9vbE5hbWUgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfYWNjZXNzVG9rZW4gPSBcIlwiLFxyXG4gICAgICAgICAgICBfdXBkYXRlZEF0ID0gMCxcclxuICAgICAgICAgICAgX3VzZXJJRD1cIlwiXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICAgICAgdGhpcy5zY2hvb2xOYW1lID0gX3NjaG9vbE5hbWU7XHJcbiAgICAgICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICAgICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUHJvZ3JhbSBEaXJlY3RvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBQcm9ncmFtRGlyZWN0b3JzID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJQcm9ncmFtRGlyZWN0b3JzXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICAgICAgQWNjZXNzVG9rZW46XCJcIixcclxuICAgICAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICAgICAgdXNlcklEOlwiXCJcclxuICAgIH0sXHJcbiAgICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gICAgY3RvcjogZnVuY3Rpb25cclxuICAgICAgICAoICAgX25hbWUgPSBcIm5vbmVcIixcclxuICAgICAgICAgICAgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfYWNjZXNzVG9rZW4gPSBcIlwiLFxyXG4gICAgICAgICAgICBfdXBkYXRlZEF0ID0gMCxcclxuICAgICAgICAgICAgX3VzZXJJRD1cIlwiXHJcbiAgICAgICAgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgICAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNlcnZlckJhY2tlbmQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlcnZlckJhY2tlbmQ9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlNlcnZlckJhY2tlbmRcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBTdHVkZW50RGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogU3R1ZGVudCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHN0dWRlbnQgZGF0YVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBUZWFjaGVyRGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogVGVhY2hlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHRlYWNoZXIgZGF0YVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBNZW50b3JEYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBQcm9ncmFtQW1iYXNzYWRvcnMsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBNZW50b3IgLyBQcm9ncmFtQW1iYXNzYWRvcnMgIGRhdGFcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQWRtaW5EYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBTY2hvb2xBZG1pbmlzdHJhdG9ycyxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIFNjaG9vbEFkbWluaXN0cmF0b3JzICBkYXRhXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIERpcmVjdG9yRGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogUHJvZ3JhbURpcmVjdG9ycyxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIFByb2dyYW1EaXJlY3RvcnMgIGRhdGFcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgUmVzcG9uc2VUeXBlOntcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJSZXNwb25zZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBSZXNwb25zZVR5cGVFbnVtLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBSZXNwb25zZVR5cGVFbnVtLk5vbmUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZXNwb25zZVR5cGUgY2F0b2dvcnkgZm9yIGFwaSdzXCIsXHJcbiAgICAgICAgfSwgXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHsgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIFJlbW92ZVBlcnNpc3ROb2RlKClcclxuICAgIHtcclxuICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlPW51bGw7XHJcbiAgICAgICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmKCFTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLlN0dWRlbnREYXRhPW5ldyBTdHVkZW50KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjcmVhdGluZyBpbnN0YW5jZSBcIit0aGlzLm5vZGUubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgdmFyaWFibGVzXHJcbiAgICAgICAgdGhpcy5nZXRVc2VyQVBJPVwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi9nZXRVc2VyXCI7XHJcbiAgICAgICAgdGhpcy5sb2dpblVzZXJBUEk9XCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2xvZ2luVXNlclwiO1xyXG5cclxuICAgICAgIC8vIHRoaXMuR2V0VXNlckRhdGEoXCJ4dHJvbmRldkBnbWFpbC5jb21cIixcIlN0dWRlbnRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIEdldFVzZXJEYXRhKF9lbWFpbCxfcm9sZSxfYWNjZXNzVG9rZW4sX3N1YlR5cGU9LTEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHBheWxvYWQgPSBuZXcgVXNlclBheWxvYWQoX2VtYWlsLCBfcm9sZSk7XHJcbiAgICAgICAgdmFyIGhlYWRlciA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsIFwiQXV0aG9yaXphdGlvblwiOiBfYWNjZXNzVG9rZW4gfTtcclxuICAgICAgICB0aGlzLkNhbGxSRVNUQVBJKCB0aGlzLmdldFVzZXJBUEksXCJQT1NUXCIscGF5bG9hZCwxLGhlYWRlcixfc3ViVHlwZSk7ICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBMb2dpblVzZXIoX2VtYWlsLF9wYXNzd29yZCxfcm9sZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgcGF5bG9hZD1uZXcgVXNlckxvZ2luUGF5bG9hZChfZW1haWwsX3Bhc3N3b3JkLF9yb2xlKTtcclxuICAgICAgICB0aGlzLkNhbGxSRVNUQVBJKCB0aGlzLmxvZ2luVXNlckFQSSxcIlBPU1RcIixwYXlsb2FkLDIsbnVsbCwtMSk7ICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBGZXRjaChfdXJsLF9tZXRob2QsX3JlcXVlc3RCb2R5LF9oZWFkZXJzPW51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX21ldGhvZD09XCJHRVRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfaGVhZGVycyA9PW51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmZXRjaChcclxuICAgICAgICAgICAgICAgICAgICBfdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmZXRjaChcclxuICAgICAgICAgICAgICAgICAgICBfdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogX2hlYWRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfaGVhZGVycyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJoZWFkZXIgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5lcnJvcihfcmVxdWVzdEJvZHkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZldGNoKFxyXG4gICAgICAgICAgICAgICAgICAgIF91cmwsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2goXHJcbiAgICAgICAgICAgICAgICAgICAgX3VybCxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6ICBfaGVhZGVycyAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBDYWxsUkVTVEFQSShfdXJsLF9tZXRob2QsX3JlcXVlc3RCb2R5LF90eXBlLF9oZWFkZXJzPW51bGwsX3N1YlR5cGU9LTEpIHtcclxuICAgICAgICBGZXRjaF9Qcm9taXNlKF91cmwsX21ldGhvZCxfcmVxdWVzdEJvZHksX2hlYWRlcnMpO1xyXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIEZldGNoX1Byb21pc2UoX3VybCxfbWV0aG9kLF9yZXF1ZXN0Qm9keSxfaGVhZGVycz1udWxsKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgUmVzcG9uc2U9YXdhaXQgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5GZXRjaChfdXJsLF9tZXRob2QsX3JlcXVlc3RCb2R5LF9oZWFkZXJzKTtcclxuICAgICAgICAgICAgICAgIHZhciBUZW1wRGF0YT1hd2FpdCBSZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKF90eXBlPT0xKSAvL2dldHRpbmcgdXNlciBkYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIE1haW5EYXRhPW5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsVGVtcERhdGEubWVzc2FnZSxUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9zdWJUeXBlID09IDApIHsgLy9yZXR1cm4gZGF0YSB0byBzdG9yYWdlIGNsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiU1VDQ0VTU1wiKSB8fCBNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwic3VjZXNzZnVsbHlcIikpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvdCBkYXRhIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2JvdGggYmVsb3cgY2FsbHMgYXJlIHdyaXR0ZW4gaW5zaWRlIHN0b3JnYWVtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiV3JpdGVEYXRhXCIsIE1haW5EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJSZWZyZXNoRGF0YVwiLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJSZWZyZXNoRGF0YVwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoX3R5cGU9PTIpIC8vbG9naW4gdXNlclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBNYWluRGF0YT1uZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLFRlbXBEYXRhLm1lc3NhZ2UsVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJXcml0ZURhdGFcIixNYWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhNYWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiVGVhY2hlclwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGU9UmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25UZWFjaGVyRGF0YShNYWluRGF0YSx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbk1lbnRvckRhdGEoTWFpbkRhdGEsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIixmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTY2hvb2xBZG1pblwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGU9UmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIixmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtRGlyZWN0b3JcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlPVJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduRGlyZWN0b3JEYXRhKE1haW5EYXRhLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSAgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIndyb25nXCIpIHx8TWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcImNoYXJhY3RlcnNcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIkRhdGEgbm90IEZvdW5kIVwiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlPVJlc3BvbnNlVHlwZUVudW0uVXNlck5vdEZvdW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlBhc3N3b3JkIHNob3VsZCBjb250YWluIGF0bGVhc3Qgb25lIEludGVnZXJcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfdHlwZT09MikgLy9sb2dpbiB1c2VyIGVycm9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGU9UmVzcG9uc2VUeXBlRW51bS5XZW50V3Jvbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAvLyAgY29uc29sZS5sb2coJ1dlIGRvIGNsZWFudXAgaGVyZScpO1xyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNyZWdpb24gQ29tbWVudGVkXHJcbiAgICAgICAgLy8gZmV0Y2goXHJcbiAgICAgICAgLy8gICAgIF91cmwsIFxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgLy8gICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgIClcclxuICAgICAgICAvLyAgIC50aGVuKHJlc3BvbnNlPT57XHJcbiAgICAgICAgLy8gICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vcmV0dXJuIGRhdGE7IFxyXG4gICAgICAgIC8vICAgICB9KTsgXHJcbiAgICAgICAgLy8gICB9KVxyXG4gICAgICAgIC8vICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIC8vICAgfSk7XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnblN0dWRlbnREYXRhKERhdGFSZXNwb25zZSxpc0xvZ2dlZEluKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEubmFtZT1EYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEuZE9CPURhdGFSZXNwb25zZS5kYXRhLmRvQjtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmdyYWRlTGV2ZWw9RGF0YVJlc3BvbnNlLmRhdGEuZ3JhZGVMZXZlbDtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmVtYWlsQWRkcmVzcz1EYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLnRlYWNoZXJOYW1lPURhdGFSZXNwb25zZS5kYXRhLnRlYWNoZXJOYW1lO1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEuZmFjZWJvb2tQYWdlPURhdGFSZXNwb25zZS5kYXRhLmZiUGFnZTtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVzV29uPURhdGFSZXNwb25zZS5kYXRhLmdhbWVzV29uO1xyXG4gICAgICAgIHRoaXMuU3R1ZGVudERhdGEudGVzdHNUYWtlbj1EYXRhUmVzcG9uc2UuZGF0YS50ZXN0VGFrZW47XHJcbiAgICAgICAgdGhpcy5TdHVkZW50RGF0YS50ZXN0aW5nQXZlcmFnZT1EYXRhUmVzcG9uc2UuZGF0YS50ZXN0aW5nQXZlcmFnZTtcclxuICAgICAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVDYXNoPURhdGFSZXNwb25zZS5kYXRhLmluR2FtZUNhc2g7XHJcbiAgICAgICAgdGhpcy5TdHVkZW50RGF0YS51c2VySUQ9RGF0YVJlc3BvbnNlLmRhdGEudXNlcklEO1xyXG5cclxuICAgICAgICBpZihpc0xvZ2dlZEluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TdHVkZW50RGF0YS5BY2Nlc3NUb2tlbj1EYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgICAgICAgIHRoaXMuU3R1ZGVudERhdGEuVXBkYXRlZEF0PURhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlN0dWRlbnREYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgQXNzaWduVGVhY2hlckRhdGEoRGF0YVJlc3BvbnNlLGlzTG9nZ2VkSW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyRGF0YS5uYW1lPURhdGFSZXNwb25zZS5kYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyRGF0YS5zY2hvb2w9RGF0YVJlc3BvbnNlLmRhdGEuc2Nob29sTmFtZTtcclxuICAgICAgICB0aGlzLlRlYWNoZXJEYXRhLmNsYXNzVGF1Z2h0PURhdGFSZXNwb25zZS5kYXRhLmNsYXNzVGF1Z2h0O1xyXG4gICAgICAgIHRoaXMuVGVhY2hlckRhdGEuZW1haWxBZGRyZXNzPURhdGFSZXNwb25zZS5kYXRhLlNLO1xyXG4gICAgICAgIHRoaXMuVGVhY2hlckRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5kYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyRGF0YS51c2VySUQ9RGF0YVJlc3BvbnNlLmRhdGEudXNlcklEO1xyXG5cclxuICAgICAgICBpZihpc0xvZ2dlZEluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UZWFjaGVyRGF0YS5BY2Nlc3NUb2tlbj1EYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgICAgICAgIHRoaXMuVGVhY2hlckRhdGEuVXBkYXRlZEF0PURhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlRlYWNoZXJEYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgQXNzaWduTWVudG9yRGF0YShEYXRhUmVzcG9uc2UsaXNMb2dnZWRJbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLk1lbnRvckRhdGEubmFtZT1EYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuTWVudG9yRGF0YS5lbWFpbEFkZHJlc3M9RGF0YVJlc3BvbnNlLmRhdGEuU0s7XHJcbiAgICAgICAgdGhpcy5NZW50b3JEYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuZGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgIHRoaXMuTWVudG9yRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VySUQ7XHJcbiAgICAgICAgdGhpcy5NZW50b3JEYXRhLmFkZHJlc3M9RGF0YVJlc3BvbnNlLmRhdGEuYWRkcmVzcztcclxuXHJcbiAgICAgICAgaWYoaXNMb2dnZWRJbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTWVudG9yRGF0YS5BY2Nlc3NUb2tlbj1EYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgICAgICAgIHRoaXMuTWVudG9yRGF0YS5VcGRhdGVkQXQ9RGF0YVJlc3BvbnNlLmRhdGEudXBkYXRlZEF0OyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWVudG9yRGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnbkFkbWluRGF0YShEYXRhUmVzcG9uc2UsaXNMb2dnZWRJbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkFkbWluRGF0YS5uYW1lPURhdGFSZXNwb25zZS5kYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5BZG1pbkRhdGEuZW1haWxBZGRyZXNzPURhdGFSZXNwb25zZS5kYXRhLlNLO1xyXG4gICAgICAgIHRoaXMuQWRtaW5EYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuZGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgIHRoaXMuQWRtaW5EYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJJRDtcclxuICAgICAgICB0aGlzLkFkbWluRGF0YS5zY2hvb2xOYW1lPURhdGFSZXNwb25zZS5kYXRhLnNjaG9vbE5hbWU7XHJcblxyXG4gICAgICAgIGlmKGlzTG9nZ2VkSW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFkbWluRGF0YS5BY2Nlc3NUb2tlbj1EYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgICAgICAgIHRoaXMuQWRtaW5EYXRhLlVwZGF0ZWRBdD1EYXRhUmVzcG9uc2UuZGF0YS51cGRhdGVkQXQ7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BZG1pbkRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBBc3NpZ25EaXJlY3RvckRhdGEoRGF0YVJlc3BvbnNlLGlzTG9nZ2VkSW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5EaXJlY3RvckRhdGEubmFtZT1EYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLmVtYWlsQWRkcmVzcz1EYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuXHJcbiAgICAgICAgaWYoaXNMb2dnZWRJbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLkFjY2Vzc1Rva2VuPURhdGFSZXNwb25zZS5kYXRhLnVzZXJUb2tlbjtcclxuICAgICAgICAgICAgdGhpcy5EaXJlY3RvckRhdGEuVXBkYXRlZEF0PURhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkRpcmVjdG9yRGF0YSk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQoKSB7IH0sXHJcbiAgICBcclxuICAgIFJlbG9naW5Gcm9tU3RvcmFnZShNYWluRGF0YSlcclxuICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseSBhdXRvbWF0aWNhbGx5XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGU9UmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduU3R1ZGVudERhdGEoTWFpbkRhdGEsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJUZWFjaGVyXCIpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlPVJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbUFtYmFzc2Fkb3JcIikpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGU9UmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduTWVudG9yRGF0YShNYWluRGF0YSx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIixmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlPVJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbkFkbWluRGF0YShNYWluRGF0YSx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIixmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1EaXJlY3RvclwiKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZT1SZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBzZW5kaW5nIHBheWxvYWQgdG8gcmVjZWl2ZSBkYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJVc2VyUGF5bG9hZFwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgICAgIHJvbGU6IFwiXCIsXHJcbiAgICB9LFxyXG4vL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICAgIGN0b3I6IGZ1bmN0aW9uXHJcbiAgICAgICAgKFxyXG4gICAgICAgICAgICBfZW1haWw9ICdub25lJyxcclxuICAgICAgICAgICAgX3JvbGU9IFwibm9uZVwiXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgICAgICB0aGlzLnJvbGUgPSBfcm9sZTsgIFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVXNlciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkRhdGFcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpbkdhbWVDYXNoOiBcIlwiLFxyXG4gICAgICAgIExTSzogXCJcIixcclxuICAgICAgICB1c2VyVG9rZW46XCJcIixcclxuICAgICAgICBjbGFzc1RhdWdodDpcIlwiLFxyXG4gICAgICAgIGNvbnRhY3ROdW1iZXI6XCJcIixcclxuICAgICAgICBzY2hvb2xOYW1lOlwiXCIsXHJcbiAgICAgICAgZ2FtZXNXb246XCJcIixcclxuICAgICAgICBjcmVhdGVkQXQ6MCxcclxuICAgICAgICBpc0RlbGV0ZWQ6ZmFsc2UsXHJcbiAgICAgICAgVGFibGVOYW1lOlwiXCIsXHJcbiAgICAgICAgZ3JhZGVMZXZlbDpcIlwiLFxyXG4gICAgICAgIG5hbWU6XCJcIixcclxuICAgICAgICByb2xlVHlwZTpcIlwiLFxyXG4gICAgICAgIHBhc3N3b3JkOlwiXCIsXHJcbiAgICAgICAgZmJQYWdlOlwiXCIsXHJcbiAgICAgICAgdXBkYXRlZEF0OjAsXHJcbiAgICAgICAgdGVhY2hlck5hbWU6XCJcIixcclxuICAgICAgICBkb0I6XCJcIixcclxuICAgICAgICBTSzpcIlwiLFxyXG4gICAgICAgIHRlc3RUYWtlbjpcIlwiLFxyXG4gICAgICAgIFBLOlwiXCIsXHJcbiAgICAgICAgdGVzdGluZ0F2ZXJhZ2U6XCJcIixcclxuICAgICAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICAgICAgYWRkcmVzczpcIlwiXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXJvb3QgY2xhc3Mgb2YgcmVzcG9uc2UgcmVjZWl2ZWQgd2hlbiBnZXR0aW5nIHVzZXIgYXBpIGlzIGhpdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckRhdGFSZXNwb25zZSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJVc2VyRGF0YVJlc3BvbnNlXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3RhdHVzQ29kZTogXCJcIixcclxuICAgICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICAgIGRhdGE6RGF0YVxyXG4gICAgfSxcclxuLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChcclxuICAgICAgICAgICAgX3N0YXR1c0NvZGU9IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBfbWVzc2FnZT0gXCJub25lXCIsXHJcbiAgICAgICAgICAgIF9kYXRhPW51bGxcclxuICAgICAgICApIHtcclxuICAgICAgICB0aGlzLnN0YXR1c0NvZGUgPSBfc3RhdHVzQ29kZTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBfbWVzc2FnZTtcclxuICAgICAgICB0aGlzLmRhdGE9X2RhdGE7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBzZW5kaW5nIHBheWxvYWQgdG8gbG9naW4gdXNlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckxvZ2luUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJVc2VyTG9naW5QYXlsb2FkXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgICAgcGFzc3dvcmQ6XCJcIixcclxuICAgICAgICByb2xlOiBcIlwiLFxyXG4gICAgfSxcclxuLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgICBjdG9yOiBmdW5jdGlvblxyXG4gICAgICAgIChcclxuICAgICAgICAgICAgX2VtYWlsPSAnbm9uZScsXHJcbiAgICAgICAgICAgIF9wYXNzd29yZD1cIm5vbmVcIixcclxuICAgICAgICAgICAgX3JvbGU9IFwibm9uZVwiXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gX3Bhc3N3b3JkO1xyXG4gICAgICAgIHRoaXMucm9sZSA9IF9yb2xlOyAgXHJcbiAgICB9LFxyXG59KTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHM9IFNlcnZlckJhY2tlbmQ7XHJcbiJdfQ==