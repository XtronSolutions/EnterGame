
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
    userID: "",
    avatarId: "",
    district: "",
    roleType: ""
  },
  //Deafault and Parametrized constructor
  ctor: function ctor(_name, _dob, _gradeLevel, _emailAddress, _teacherName, _facebookPage, _gamesWon, _testsTaken, _testingAverage, _gameCash, _avatarId, _district, _roleType) {
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

    if (_avatarId === void 0) {
      _avatarId = "";
    }

    if (_district === void 0) {
      _district = "";
    }

    if (_roleType === void 0) {
      _roleType = "";
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
    this.avatarId = _avatarId;
    this.district = _district;
    this.roleType = _roleType;
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
    userID: "",
    avatarId: "",
    district: "",
    roleType: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _school, _classTaught, _emailAddress, _contactNumber, _accessToken, _updatedAt, _userID, _avatarId, _district, _roleType) {
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

    if (_avatarId === void 0) {
      _avatarId = "";
    }

    if (_district === void 0) {
      _district = "";
    }

    if (_roleType === void 0) {
      _roleType = "";
    }

    this.name = _name;
    this.school = _school;
    this.classTaught = _classTaught;
    this.emailAddress = _emailAddress;
    this.contactNumber = _contactNumber;
    this.AccessToken = _accessToken;
    this.UpdatedAt = _updatedAt;
    this.userID = _userID;
    this.avatarId = _avatarId;
    this.district = _district;
    this.roleType = _roleType;
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
    userID: "",
    avatarId: "",
    district: "",
    roleType: ""
  },
  //Deafult and Parametrized constructor
  ctor: function ctor(_name, _emailAddress, _contactNumber, _address, _accessToken, _updatedAt, _userID, _avatarId, _district, _roleType) {
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

    if (_avatarId === void 0) {
      _avatarId = "";
    }

    if (_district === void 0) {
      _district = "";
    }

    if (_roleType === void 0) {
      _roleType = "";
    }

    this.name = _name;
    this.emailAddress = _emailAddress;
    this.contactNumber = _contactNumber;
    this.address = _address;
    this.AccessToken = _accessToken;
    this.UpdatedAt = _updatedAt;
    this.userID = _userID;
    this.avatarId = _avatarId;
    this.district = _district;
    this.roleType = _roleType;
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
    userID: "",
    avatarId: "",
    district: "",
    roleType: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _schoolName, _emailAddress, _contactNumber, _accessToken, _updatedAt, _userID, _avatarId, _district, _roleType) {
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

    if (_avatarId === void 0) {
      _avatarId = "";
    }

    if (_district === void 0) {
      _district = "";
    }

    if (_roleType === void 0) {
      _roleType = "";
    }

    this.name = _name;
    this.schoolName = _schoolName;
    this.contactNumber = _contactNumber;
    this.emailAddress = _emailAddress;
    this.AccessToken = _accessToken;
    this.UpdatedAt = _updatedAt;
    this.userID = _userID;
    this.avatarId = _avatarId;
    this.district = _district;
    this.roleType = _roleType;
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
    this.loginUserAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/loginUser";
    this.UpdateUserDataAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/updateUser"; // this.GetUserData("xtrondev@gmail.com","Student");
  },
  GetUserData: function GetUserData(_email, _role, _accessToken, _subType) {
    if (_subType === void 0) {
      _subType = -1;
    }

    var payload = new UserPayload(_email, _role);
    var header = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: _accessToken
    };
    this.CallRESTAPI(this.getUserAPI, "POST", payload, 1, header, _subType);
  },
  LoginUser: function LoginUser(_email, _password, _role) {
    var payload = new UserLoginPayload(_email, _password, _role, "79be6824-fae7-40cf-816f-ae0be1ab1ff4");
    this.CallRESTAPI(this.loginUserAPI, "POST", payload, 2, null, -1);
  },
  UpdateUserData: function UpdateUserData(_cash, _gameWon, _avatarID) {
    if (_cash === void 0) {
      _cash = -1;
    }

    if (_gameWon === void 0) {
      _gameWon = -1;
    }

    if (_avatarID === void 0) {
      _avatarID = -1;
    }

    var _mainData = JSON.parse(cc.sys.localStorage.getItem("userData"));

    if (_mainData != null) {
      var SendingPayload = new UserDataUpdatePayload(_mainData.data.SK, _mainData.data.password, _mainData.data.name, _mainData.data.role, _mainData.data.doB, _mainData.data.gradeLevel, _mainData.data.teacherName, _mainData.data.fbPage, _mainData.data.gamesWon, _mainData.data.testTaken, _mainData.data.district, _mainData.data.testingAverage, _mainData.data.inGameCash, "mubeenali@gmail.com", "SchoolAdmin", _mainData.data.addedByEmail, _mainData.data.schoolName, _mainData.data.avatarId);

      if (_cash != -1) {
        SendingPayload.inGameCash = _cash;
      }

      if (_gameWon != -1) {
        SendingPayload.gamesWon = _gameWon;
      }

      if (_avatarID != -1) {
        SendingPayload.avatarId = _avatarID.toString();
      }

      console.log(SendingPayload);
      var payload = SendingPayload;
      var header = {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: _mainData.data.userToken
      };
      this.CallRESTAPI(this.UpdateUserDataAPI, "PUT", payload, 3, header, -1);
    } else {
      console.error("cannot update data as stored data is null");
    }
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

                if (_type == 1) {
                  //getting user data
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
                } else if (_type == 2) {
                  //login user
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
                } else if (_type == 3) {
                  MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
                  console.log(TempData);
                }

                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);

                if (_type == 2) {
                  //login user error
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
    this.StudentData.avatarId = DataResponse.data.avatarId;
    this.StudentData.district = DataResponse.data.district;
    this.StudentData.roleType = DataResponse.data.roleType;

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
    this.TeacherData.avatarId = DataResponse.data.avatarId;
    this.TeacherData.district = DataResponse.data.district;
    this.TeacherData.roleType = DataResponse.data.roleType;

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
    this.MentorData.avatarId = DataResponse.data.avatarId;
    this.MentorData.district = DataResponse.data.district;
    this.MentorData.roleType = DataResponse.data.roleType;

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
    this.AdminData.avatarId = DataResponse.data.avatarId;
    this.AdminData.district = DataResponse.data.district;
    this.AdminData.roleType = DataResponse.data.roleType;

    if (isLoggedIn) {
      this.AdminData.AccessToken = DataResponse.data.userToken;
      this.AdminData.UpdatedAt = DataResponse.data.updatedAt;
    }

    console.log(this.AdminData);
  },
  AssignDirectorData: function AssignDirectorData(DataResponse, isLoggedIn) {
    this.DirectorData.name = DataResponse.data.name;
    this.DirectorData.emailAddress = DataResponse.data.SK;
    this.DirectorData.avatarId = DataResponse.data.avatarId;
    this.DirectorData.district = DataResponse.data.district;
    this.DirectorData.roleType = DataResponse.data.roleType;

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
      _email = "none";
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
    address: "",
    avatarId: "",
    addedByEmail: "",
    district: "",
    role: "",
    email: "",
    UniqueKey: ""
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
    role: "",
    license: ""
  },
  //Deafault and Parametrized constructor
  ctor: function ctor(_email, _password, _role, _license) {
    if (_email === void 0) {
      _email = "none";
    }

    if (_password === void 0) {
      _password = "none";
    }

    if (_role === void 0) {
      _role = "none";
    }

    if (_license === void 0) {
      _license = "none";
    }

    this.email = _email;
    this.password = _password;
    this.role = _role;
    this.license = _license;
  }
}); //-------------------------------------------class for UserDataUpdatePayload-------------------------------//

var UserDataUpdatePayload = cc.Class({
  name: "UserDataUpdatePayload",
  properties: {
    email: "",
    password: "",
    name: "",
    role: "",
    doB: "",
    gradeLevel: "",
    teacherName: "",
    fbPage: "",
    gamesWon: "",
    testTaken: "",
    district: "",
    testingAverage: "",
    inGameCash: "",
    adminEmail: "",
    adminRole: "",
    addedByEmail: "",
    schoolName: "",
    avatarId: ""
  },
  //Deafault and Parametrized constructor
  ctor: function ctor(_email, _password, _name, _role, _dob, _gradeLevel, _teacherName, _fbPage, _gamesWon, _testTaken, _district, _testingAverage, _inGameCash, _adminEmail, _adminRole, _addedByEmail, _schoolName, _avatarID) {
    if (_email === void 0) {
      _email = "none";
    }

    if (_password === void 0) {
      _password = "none";
    }

    if (_name === void 0) {
      _name = "";
    }

    if (_role === void 0) {
      _role = "none";
    }

    if (_dob === void 0) {
      _dob = "";
    }

    if (_gradeLevel === void 0) {
      _gradeLevel = "";
    }

    if (_teacherName === void 0) {
      _teacherName = "";
    }

    if (_fbPage === void 0) {
      _fbPage = "";
    }

    if (_gamesWon === void 0) {
      _gamesWon = "";
    }

    if (_testTaken === void 0) {
      _testTaken = "";
    }

    if (_district === void 0) {
      _district = "";
    }

    if (_testingAverage === void 0) {
      _testingAverage = "";
    }

    if (_inGameCash === void 0) {
      _inGameCash = "";
    }

    if (_adminEmail === void 0) {
      _adminEmail = "";
    }

    if (_adminRole === void 0) {
      _adminRole = "";
    }

    if (_addedByEmail === void 0) {
      _addedByEmail = "";
    }

    if (_schoolName === void 0) {
      _schoolName = "";
    }

    if (_avatarID === void 0) {
      _avatarID = "";
    }

    this.email = _email;
    this.password = _password;
    this.name = _name;
    this.role = _role;
    this.doB = _dob;
    this.gradeLevel = _gradeLevel;
    this.teacherName = _teacherName;
    this.fbPage = _fbPage;
    this.gamesWon = _gamesWon;
    this.testTaken = _testTaken;
    this.district = _district;
    this.testingAverage = _testingAverage;
    this.inGameCash = _inGameCash;
    this.adminEmail = _adminEmail;
    this.adminRole = _adminRole;
    this.addedByEmail = _addedByEmail;
    this.schoolName = _schoolName;
    this.avatarId = _avatarID;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlVHlwZUVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiU3VjY2Vzc2Z1bCIsIlVzZXJOb3RGb3VuZCIsIkludmFsaWRFbWFpbFBhc3N3b3JkIiwiV2VudFdyb25nIiwiU3R1ZGVudCIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJkT0IiLCJncmFkZUxldmVsIiwiZW1haWxBZGRyZXNzIiwidGVhY2hlck5hbWUiLCJmYWNlYm9va1BhZ2UiLCJnYW1lc1dvbiIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiQWNjZXNzVG9rZW4iLCJVcGRhdGVkQXQiLCJ1c2VySUQiLCJhdmF0YXJJZCIsImRpc3RyaWN0Iiwicm9sZVR5cGUiLCJjdG9yIiwiX25hbWUiLCJfZG9iIiwiX2dyYWRlTGV2ZWwiLCJfZW1haWxBZGRyZXNzIiwiX3RlYWNoZXJOYW1lIiwiX2ZhY2Vib29rUGFnZSIsIl9nYW1lc1dvbiIsIl90ZXN0c1Rha2VuIiwiX3Rlc3RpbmdBdmVyYWdlIiwiX2dhbWVDYXNoIiwiX2F2YXRhcklkIiwiX2Rpc3RyaWN0IiwiX3JvbGVUeXBlIiwiVGVhY2hlciIsInNjaG9vbCIsImNsYXNzVGF1Z2h0IiwiY29udGFjdE51bWJlciIsIl9zY2hvb2wiLCJfY2xhc3NUYXVnaHQiLCJfY29udGFjdE51bWJlciIsIl9hY2Nlc3NUb2tlbiIsIl91cGRhdGVkQXQiLCJfdXNlcklEIiwiUHJvZ3JhbUFtYmFzc2Fkb3JzIiwiYWRkcmVzcyIsIl9hZGRyZXNzIiwiU2Nob29sQWRtaW5pc3RyYXRvcnMiLCJzY2hvb2xOYW1lIiwiX3NjaG9vbE5hbWUiLCJQcm9ncmFtRGlyZWN0b3JzIiwiU2VydmVyQmFja2VuZCIsIkNvbXBvbmVudCIsIlN0dWRlbnREYXRhIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJUZWFjaGVyRGF0YSIsIk1lbnRvckRhdGEiLCJBZG1pbkRhdGEiLCJEaXJlY3RvckRhdGEiLCJSZXNwb25zZVR5cGUiLCJkaXNwbGF5TmFtZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiZ2FtZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJvbkxvYWQiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJjb25zb2xlIiwiZXJyb3IiLCJnZXRVc2VyQVBJIiwibG9naW5Vc2VyQVBJIiwiVXBkYXRlVXNlckRhdGFBUEkiLCJHZXRVc2VyRGF0YSIsIl9lbWFpbCIsIl9yb2xlIiwiX3N1YlR5cGUiLCJwYXlsb2FkIiwiVXNlclBheWxvYWQiLCJoZWFkZXIiLCJBdXRob3JpemF0aW9uIiwiQ2FsbFJFU1RBUEkiLCJMb2dpblVzZXIiLCJfcGFzc3dvcmQiLCJVc2VyTG9naW5QYXlsb2FkIiwiVXBkYXRlVXNlckRhdGEiLCJfY2FzaCIsIl9nYW1lV29uIiwiX2F2YXRhcklEIiwiX21haW5EYXRhIiwiSlNPTiIsInBhcnNlIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIlNlbmRpbmdQYXlsb2FkIiwiVXNlckRhdGFVcGRhdGVQYXlsb2FkIiwiZGF0YSIsIlNLIiwicGFzc3dvcmQiLCJyb2xlIiwiZG9CIiwiZmJQYWdlIiwidGVzdFRha2VuIiwiaW5HYW1lQ2FzaCIsImFkZGVkQnlFbWFpbCIsInRvU3RyaW5nIiwibG9nIiwidXNlclRva2VuIiwiRmV0Y2giLCJfdXJsIiwiX21ldGhvZCIsIl9yZXF1ZXN0Qm9keSIsIl9oZWFkZXJzIiwiZmV0Y2giLCJoZWFkZXJzIiwibWV0aG9kIiwiYm9keSIsInN0cmluZ2lmeSIsIl90eXBlIiwiRmV0Y2hfUHJvbWlzZSIsIlJlc3BvbnNlIiwianNvbiIsIlRlbXBEYXRhIiwiTWFpbkRhdGEiLCJVc2VyRGF0YVJlc3BvbnNlIiwic3RhdHVzQ29kZSIsIm1lc3NhZ2UiLCJpbmNsdWRlcyIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIkFzc2lnblN0dWRlbnREYXRhIiwiQXNzaWduVGVhY2hlckRhdGEiLCJBc3NpZ25NZW50b3JEYXRhIiwiQXNzaWduQWRtaW5EYXRhIiwiQXNzaWduRGlyZWN0b3JEYXRhIiwiRGF0YVJlc3BvbnNlIiwiaXNMb2dnZWRJbiIsInVwZGF0ZWRBdCIsInN0YXJ0IiwiUmVsb2dpbkZyb21TdG9yYWdlIiwiZW1haWwiLCJEYXRhIiwiTFNLIiwiY3JlYXRlZEF0IiwiaXNEZWxldGVkIiwiVGFibGVOYW1lIiwiUEsiLCJVbmlxdWVLZXkiLCJfc3RhdHVzQ29kZSIsIl9tZXNzYWdlIiwiX2RhdGEiLCJsaWNlbnNlIiwiX2xpY2Vuc2UiLCJhZG1pbkVtYWlsIiwiYWRtaW5Sb2xlIiwiX2ZiUGFnZSIsIl90ZXN0VGFrZW4iLCJfaW5HYW1lQ2FzaCIsIl9hZG1pbkVtYWlsIiwiX2FkbWluUm9sZSIsIl9hZGRlZEJ5RW1haWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUM3QkMsRUFBQUEsSUFBSSxFQUFFLENBRHVCO0FBRTdCQyxFQUFBQSxVQUFVLEVBQUUsQ0FGaUI7QUFHN0JDLEVBQUFBLFlBQVksRUFBRSxDQUhlO0FBSTdCQyxFQUFBQSxvQkFBb0IsRUFBRSxDQUpPO0FBSzdCQyxFQUFBQSxTQUFTLEVBQUU7QUFMa0IsQ0FBUixDQUF2QixFQU9BOztBQUNBLElBQUlDLE9BQU8sR0FBR1AsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxTQURlO0FBRXJCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkQsSUFBQUEsSUFBSSxFQUFFLEVBREk7QUFFVkUsSUFBQUEsR0FBRyxFQUFFLEVBRks7QUFHVkMsSUFBQUEsVUFBVSxFQUFFLEVBSEY7QUFJVkMsSUFBQUEsWUFBWSxFQUFFLEVBSko7QUFLVkMsSUFBQUEsV0FBVyxFQUFFLEVBTEg7QUFNVkMsSUFBQUEsWUFBWSxFQUFFLEVBTko7QUFPVkMsSUFBQUEsUUFBUSxFQUFFLENBUEE7QUFRVkMsSUFBQUEsVUFBVSxFQUFFLENBUkY7QUFTVkMsSUFBQUEsY0FBYyxFQUFFLENBVE47QUFVVkMsSUFBQUEsUUFBUSxFQUFFLENBVkE7QUFXVkMsSUFBQUEsV0FBVyxFQUFFLEVBWEg7QUFZVkMsSUFBQUEsU0FBUyxFQUFFLENBWkQ7QUFhVkMsSUFBQUEsTUFBTSxFQUFFLEVBYkU7QUFjVkMsSUFBQUEsUUFBUSxFQUFFLEVBZEE7QUFlVkMsSUFBQUEsUUFBUSxFQUFFLEVBZkE7QUFnQlZDLElBQUFBLFFBQVEsRUFBRTtBQWhCQSxHQUZTO0FBb0JyQjtBQUNBQyxFQUFBQSxJQUFJLEVBQUUsY0FBVUMsS0FBVixFQUEwQkMsSUFBMUIsRUFBeUNDLFdBQXpDLEVBQStEQyxhQUEvRCxFQUF1RkMsWUFBdkYsRUFBOEdDLGFBQTlHLEVBQXNJQyxTQUF0SSxFQUFxSkMsV0FBckosRUFBc0tDLGVBQXRLLEVBQTJMQyxTQUEzTCxFQUEwTUMsU0FBMU0sRUFBME5DLFNBQTFOLEVBQTBPQyxTQUExTyxFQUEwUDtBQUFBLFFBQWhQWixLQUFnUDtBQUFoUEEsTUFBQUEsS0FBZ1AsR0FBeE8sTUFBd087QUFBQTs7QUFBQSxRQUFoT0MsSUFBZ087QUFBaE9BLE1BQUFBLElBQWdPLEdBQXpOLE1BQXlOO0FBQUE7O0FBQUEsUUFBak5DLFdBQWlOO0FBQWpOQSxNQUFBQSxXQUFpTixHQUFuTSxNQUFtTTtBQUFBOztBQUFBLFFBQTNMQyxhQUEyTDtBQUEzTEEsTUFBQUEsYUFBMkwsR0FBM0ssTUFBMks7QUFBQTs7QUFBQSxRQUFuS0MsWUFBbUs7QUFBbktBLE1BQUFBLFlBQW1LLEdBQXBKLE1BQW9KO0FBQUE7O0FBQUEsUUFBNUlDLGFBQTRJO0FBQTVJQSxNQUFBQSxhQUE0SSxHQUE1SCxNQUE0SDtBQUFBOztBQUFBLFFBQXBIQyxTQUFvSDtBQUFwSEEsTUFBQUEsU0FBb0gsR0FBeEcsQ0FBd0c7QUFBQTs7QUFBQSxRQUFyR0MsV0FBcUc7QUFBckdBLE1BQUFBLFdBQXFHLEdBQXZGLENBQXVGO0FBQUE7O0FBQUEsUUFBcEZDLGVBQW9GO0FBQXBGQSxNQUFBQSxlQUFvRixHQUFsRSxDQUFrRTtBQUFBOztBQUFBLFFBQS9EQyxTQUErRDtBQUEvREEsTUFBQUEsU0FBK0QsR0FBbkQsQ0FBbUQ7QUFBQTs7QUFBQSxRQUFoREMsU0FBZ0Q7QUFBaERBLE1BQUFBLFNBQWdELEdBQXBDLEVBQW9DO0FBQUE7O0FBQUEsUUFBaENDLFNBQWdDO0FBQWhDQSxNQUFBQSxTQUFnQyxHQUFwQixFQUFvQjtBQUFBOztBQUFBLFFBQWhCQyxTQUFnQjtBQUFoQkEsTUFBQUEsU0FBZ0IsR0FBSixFQUFJO0FBQUE7O0FBQzlQLFNBQUs5QixJQUFMLEdBQVlrQixLQUFaO0FBQ0EsU0FBS2hCLEdBQUwsR0FBV2lCLElBQVg7QUFDQSxTQUFLaEIsVUFBTCxHQUFrQmlCLFdBQWxCO0FBQ0EsU0FBS2hCLFlBQUwsR0FBb0JpQixhQUFwQjtBQUNBLFNBQUtoQixXQUFMLEdBQW1CaUIsWUFBbkI7QUFDQSxTQUFLaEIsWUFBTCxHQUFvQmlCLGFBQXBCO0FBQ0EsU0FBS2hCLFFBQUwsR0FBZ0JpQixTQUFoQjtBQUNBLFNBQUtoQixVQUFMLEdBQWtCaUIsV0FBbEI7QUFDQSxTQUFLaEIsY0FBTCxHQUFzQmlCLGVBQXRCO0FBQ0EsU0FBS2hCLFFBQUwsR0FBZ0JpQixTQUFoQjtBQUNBLFNBQUtiLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS2IsUUFBTCxHQUFnQmMsU0FBaEI7QUFDQSxTQUFLYixRQUFMLEdBQWdCYyxTQUFoQjtBQUNEO0FBbkNvQixDQUFULENBQWQsRUFzQ0E7O0FBQ0EsSUFBSUMsT0FBTyxHQUFHeEMsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxTQURlO0FBRXJCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkQsSUFBQUEsSUFBSSxFQUFFLEVBREk7QUFFVmdDLElBQUFBLE1BQU0sRUFBRSxFQUZFO0FBR1ZDLElBQUFBLFdBQVcsRUFBRSxDQUhIO0FBSVY3QixJQUFBQSxZQUFZLEVBQUUsRUFKSjtBQUtWOEIsSUFBQUEsYUFBYSxFQUFFLEVBTEw7QUFNVnZCLElBQUFBLFdBQVcsRUFBRSxFQU5IO0FBT1ZDLElBQUFBLFNBQVMsRUFBRSxDQVBEO0FBUVZDLElBQUFBLE1BQU0sRUFBRSxFQVJFO0FBU1ZDLElBQUFBLFFBQVEsRUFBRSxFQVRBO0FBVVZDLElBQUFBLFFBQVEsRUFBRSxFQVZBO0FBV1ZDLElBQUFBLFFBQVEsRUFBRTtBQVhBLEdBRlM7QUFlckI7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGNBQVVDLEtBQVYsRUFBMEJpQixPQUExQixFQUE0Q0MsWUFBNUMsRUFBOERmLGFBQTlELEVBQXNGZ0IsY0FBdEYsRUFBK0dDLFlBQS9HLEVBQWtJQyxVQUFsSSxFQUFrSkMsT0FBbEosRUFBZ0taLFNBQWhLLEVBQWdMQyxTQUFoTCxFQUFnTUMsU0FBaE0sRUFBZ047QUFBQSxRQUF0TVosS0FBc007QUFBdE1BLE1BQUFBLEtBQXNNLEdBQTlMLE1BQThMO0FBQUE7O0FBQUEsUUFBdExpQixPQUFzTDtBQUF0TEEsTUFBQUEsT0FBc0wsR0FBNUssTUFBNEs7QUFBQTs7QUFBQSxRQUFwS0MsWUFBb0s7QUFBcEtBLE1BQUFBLFlBQW9LLEdBQXJKLENBQXFKO0FBQUE7O0FBQUEsUUFBbEpmLGFBQWtKO0FBQWxKQSxNQUFBQSxhQUFrSixHQUFsSSxNQUFrSTtBQUFBOztBQUFBLFFBQTFIZ0IsY0FBMEg7QUFBMUhBLE1BQUFBLGNBQTBILEdBQXpHLE1BQXlHO0FBQUE7O0FBQUEsUUFBakdDLFlBQWlHO0FBQWpHQSxNQUFBQSxZQUFpRyxHQUFsRixFQUFrRjtBQUFBOztBQUFBLFFBQTlFQyxVQUE4RTtBQUE5RUEsTUFBQUEsVUFBOEUsR0FBakUsQ0FBaUU7QUFBQTs7QUFBQSxRQUE5REMsT0FBOEQ7QUFBOURBLE1BQUFBLE9BQThELEdBQXBELEVBQW9EO0FBQUE7O0FBQUEsUUFBaERaLFNBQWdEO0FBQWhEQSxNQUFBQSxTQUFnRCxHQUFwQyxFQUFvQztBQUFBOztBQUFBLFFBQWhDQyxTQUFnQztBQUFoQ0EsTUFBQUEsU0FBZ0MsR0FBcEIsRUFBb0I7QUFBQTs7QUFBQSxRQUFoQkMsU0FBZ0I7QUFBaEJBLE1BQUFBLFNBQWdCLEdBQUosRUFBSTtBQUFBOztBQUNwTixTQUFLOUIsSUFBTCxHQUFZa0IsS0FBWjtBQUNBLFNBQUtjLE1BQUwsR0FBY0csT0FBZDtBQUNBLFNBQUtGLFdBQUwsR0FBbUJHLFlBQW5CO0FBQ0EsU0FBS2hDLFlBQUwsR0FBb0JpQixhQUFwQjtBQUNBLFNBQUthLGFBQUwsR0FBcUJHLGNBQXJCO0FBQ0EsU0FBSzFCLFdBQUwsR0FBbUIyQixZQUFuQjtBQUNBLFNBQUsxQixTQUFMLEdBQWlCMkIsVUFBakI7QUFDQSxTQUFLMUIsTUFBTCxHQUFjMkIsT0FBZDtBQUNBLFNBQUsxQixRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtiLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS2IsUUFBTCxHQUFnQmMsU0FBaEI7QUFDRDtBQTVCb0IsQ0FBVCxDQUFkLEVBK0JBOztBQUNBLElBQUlXLGtCQUFrQixHQUFHbEQsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDaENDLEVBQUFBLElBQUksRUFBRSxvQkFEMEI7QUFFaENDLEVBQUFBLFVBQVUsRUFBRTtBQUNWRCxJQUFBQSxJQUFJLEVBQUUsRUFESTtBQUVWSSxJQUFBQSxZQUFZLEVBQUUsRUFGSjtBQUdWOEIsSUFBQUEsYUFBYSxFQUFFLEVBSEw7QUFJVlEsSUFBQUEsT0FBTyxFQUFFLEVBSkM7QUFLVi9CLElBQUFBLFdBQVcsRUFBRSxFQUxIO0FBTVZDLElBQUFBLFNBQVMsRUFBRSxDQU5EO0FBT1ZDLElBQUFBLE1BQU0sRUFBRSxFQVBFO0FBUVZDLElBQUFBLFFBQVEsRUFBRSxFQVJBO0FBU1ZDLElBQUFBLFFBQVEsRUFBRSxFQVRBO0FBVVZDLElBQUFBLFFBQVEsRUFBRTtBQVZBLEdBRm9CO0FBY2hDO0FBQ0FDLEVBQUFBLElBQUksRUFBRSxjQUFVQyxLQUFWLEVBQTBCRyxhQUExQixFQUFrRGdCLGNBQWxELEVBQTJFTSxRQUEzRSxFQUE4RkwsWUFBOUYsRUFBaUhDLFVBQWpILEVBQWlJQyxPQUFqSSxFQUErSVosU0FBL0ksRUFBK0pDLFNBQS9KLEVBQStLQyxTQUEvSyxFQUErTDtBQUFBLFFBQXJMWixLQUFxTDtBQUFyTEEsTUFBQUEsS0FBcUwsR0FBN0ssTUFBNks7QUFBQTs7QUFBQSxRQUFyS0csYUFBcUs7QUFBcktBLE1BQUFBLGFBQXFLLEdBQXJKLE1BQXFKO0FBQUE7O0FBQUEsUUFBN0lnQixjQUE2STtBQUE3SUEsTUFBQUEsY0FBNkksR0FBNUgsTUFBNEg7QUFBQTs7QUFBQSxRQUFwSE0sUUFBb0g7QUFBcEhBLE1BQUFBLFFBQW9ILEdBQXpHLE1BQXlHO0FBQUE7O0FBQUEsUUFBakdMLFlBQWlHO0FBQWpHQSxNQUFBQSxZQUFpRyxHQUFsRixFQUFrRjtBQUFBOztBQUFBLFFBQTlFQyxVQUE4RTtBQUE5RUEsTUFBQUEsVUFBOEUsR0FBakUsQ0FBaUU7QUFBQTs7QUFBQSxRQUE5REMsT0FBOEQ7QUFBOURBLE1BQUFBLE9BQThELEdBQXBELEVBQW9EO0FBQUE7O0FBQUEsUUFBaERaLFNBQWdEO0FBQWhEQSxNQUFBQSxTQUFnRCxHQUFwQyxFQUFvQztBQUFBOztBQUFBLFFBQWhDQyxTQUFnQztBQUFoQ0EsTUFBQUEsU0FBZ0MsR0FBcEIsRUFBb0I7QUFBQTs7QUFBQSxRQUFoQkMsU0FBZ0I7QUFBaEJBLE1BQUFBLFNBQWdCLEdBQUosRUFBSTtBQUFBOztBQUNuTSxTQUFLOUIsSUFBTCxHQUFZa0IsS0FBWjtBQUNBLFNBQUtkLFlBQUwsR0FBb0JpQixhQUFwQjtBQUNBLFNBQUthLGFBQUwsR0FBcUJHLGNBQXJCO0FBQ0EsU0FBS0ssT0FBTCxHQUFlQyxRQUFmO0FBQ0EsU0FBS2hDLFdBQUwsR0FBbUIyQixZQUFuQjtBQUNBLFNBQUsxQixTQUFMLEdBQWlCMkIsVUFBakI7QUFDQSxTQUFLMUIsTUFBTCxHQUFjMkIsT0FBZDtBQUNBLFNBQUsxQixRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtiLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS2IsUUFBTCxHQUFnQmMsU0FBaEI7QUFDRDtBQTFCK0IsQ0FBVCxDQUF6QixFQTZCQTs7QUFDQSxJQUFJYyxvQkFBb0IsR0FBR3JELEVBQUUsQ0FBQ1EsS0FBSCxDQUFTO0FBQ2xDQyxFQUFBQSxJQUFJLEVBQUUsc0JBRDRCO0FBRWxDQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkQsSUFBQUEsSUFBSSxFQUFFLEVBREk7QUFFVjZDLElBQUFBLFVBQVUsRUFBRSxFQUZGO0FBR1ZYLElBQUFBLGFBQWEsRUFBRSxFQUhMO0FBSVY5QixJQUFBQSxZQUFZLEVBQUUsRUFKSjtBQUtWTyxJQUFBQSxXQUFXLEVBQUUsRUFMSDtBQU1WQyxJQUFBQSxTQUFTLEVBQUUsQ0FORDtBQU9WQyxJQUFBQSxNQUFNLEVBQUUsRUFQRTtBQVFWQyxJQUFBQSxRQUFRLEVBQUUsRUFSQTtBQVNWQyxJQUFBQSxRQUFRLEVBQUUsRUFUQTtBQVVWQyxJQUFBQSxRQUFRLEVBQUU7QUFWQSxHQUZzQjtBQWNsQztBQUNBQyxFQUFBQSxJQUFJLEVBQUUsY0FBVUMsS0FBVixFQUEwQjRCLFdBQTFCLEVBQWdEekIsYUFBaEQsRUFBd0VnQixjQUF4RSxFQUFpR0MsWUFBakcsRUFBb0hDLFVBQXBILEVBQW9JQyxPQUFwSSxFQUFrSlosU0FBbEosRUFBa0tDLFNBQWxLLEVBQWtMQyxTQUFsTCxFQUFrTTtBQUFBLFFBQXhMWixLQUF3TDtBQUF4TEEsTUFBQUEsS0FBd0wsR0FBaEwsTUFBZ0w7QUFBQTs7QUFBQSxRQUF4SzRCLFdBQXdLO0FBQXhLQSxNQUFBQSxXQUF3SyxHQUExSixNQUEwSjtBQUFBOztBQUFBLFFBQWxKekIsYUFBa0o7QUFBbEpBLE1BQUFBLGFBQWtKLEdBQWxJLE1BQWtJO0FBQUE7O0FBQUEsUUFBMUhnQixjQUEwSDtBQUExSEEsTUFBQUEsY0FBMEgsR0FBekcsTUFBeUc7QUFBQTs7QUFBQSxRQUFqR0MsWUFBaUc7QUFBakdBLE1BQUFBLFlBQWlHLEdBQWxGLEVBQWtGO0FBQUE7O0FBQUEsUUFBOUVDLFVBQThFO0FBQTlFQSxNQUFBQSxVQUE4RSxHQUFqRSxDQUFpRTtBQUFBOztBQUFBLFFBQTlEQyxPQUE4RDtBQUE5REEsTUFBQUEsT0FBOEQsR0FBcEQsRUFBb0Q7QUFBQTs7QUFBQSxRQUFoRFosU0FBZ0Q7QUFBaERBLE1BQUFBLFNBQWdELEdBQXBDLEVBQW9DO0FBQUE7O0FBQUEsUUFBaENDLFNBQWdDO0FBQWhDQSxNQUFBQSxTQUFnQyxHQUFwQixFQUFvQjtBQUFBOztBQUFBLFFBQWhCQyxTQUFnQjtBQUFoQkEsTUFBQUEsU0FBZ0IsR0FBSixFQUFJO0FBQUE7O0FBQ3RNLFNBQUs5QixJQUFMLEdBQVlrQixLQUFaO0FBQ0EsU0FBSzJCLFVBQUwsR0FBa0JDLFdBQWxCO0FBQ0EsU0FBS1osYUFBTCxHQUFxQkcsY0FBckI7QUFDQSxTQUFLakMsWUFBTCxHQUFvQmlCLGFBQXBCO0FBQ0EsU0FBS1YsV0FBTCxHQUFtQjJCLFlBQW5CO0FBQ0EsU0FBSzFCLFNBQUwsR0FBaUIyQixVQUFqQjtBQUNBLFNBQUsxQixNQUFMLEdBQWMyQixPQUFkO0FBQ0EsU0FBSzFCLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS2IsUUFBTCxHQUFnQmMsU0FBaEI7QUFDQSxTQUFLYixRQUFMLEdBQWdCYyxTQUFoQjtBQUNEO0FBMUJpQyxDQUFULENBQTNCLEVBNkJBOztBQUNBLElBQUlpQixnQkFBZ0IsR0FBR3hELEVBQUUsQ0FBQ1EsS0FBSCxDQUFTO0FBQzlCQyxFQUFBQSxJQUFJLEVBQUUsa0JBRHdCO0FBRTlCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkQsSUFBQUEsSUFBSSxFQUFFLEVBREk7QUFFVkksSUFBQUEsWUFBWSxFQUFFLEVBRko7QUFHVk8sSUFBQUEsV0FBVyxFQUFFLEVBSEg7QUFJVkMsSUFBQUEsU0FBUyxFQUFFLENBSkQ7QUFLVkMsSUFBQUEsTUFBTSxFQUFFO0FBTEUsR0FGa0I7QUFTOUI7QUFDQUksRUFBQUEsSUFBSSxFQUFFLGNBQVVDLEtBQVYsRUFBMEJHLGFBQTFCLEVBQWtEaUIsWUFBbEQsRUFBcUVDLFVBQXJFLEVBQXFGQyxPQUFyRixFQUFtRztBQUFBLFFBQXpGdEIsS0FBeUY7QUFBekZBLE1BQUFBLEtBQXlGLEdBQWpGLE1BQWlGO0FBQUE7O0FBQUEsUUFBekVHLGFBQXlFO0FBQXpFQSxNQUFBQSxhQUF5RSxHQUF6RCxNQUF5RDtBQUFBOztBQUFBLFFBQWpEaUIsWUFBaUQ7QUFBakRBLE1BQUFBLFlBQWlELEdBQWxDLEVBQWtDO0FBQUE7O0FBQUEsUUFBOUJDLFVBQThCO0FBQTlCQSxNQUFBQSxVQUE4QixHQUFqQixDQUFpQjtBQUFBOztBQUFBLFFBQWRDLE9BQWM7QUFBZEEsTUFBQUEsT0FBYyxHQUFKLEVBQUk7QUFBQTs7QUFDdkcsU0FBS3hDLElBQUwsR0FBWWtCLEtBQVo7QUFDQSxTQUFLZCxZQUFMLEdBQW9CaUIsYUFBcEI7QUFDQSxTQUFLVixXQUFMLEdBQW1CMkIsWUFBbkI7QUFDQSxTQUFLMUIsU0FBTCxHQUFpQjJCLFVBQWpCO0FBQ0EsU0FBSzFCLE1BQUwsR0FBYzJCLE9BQWQ7QUFDRDtBQWhCNkIsQ0FBVCxDQUF2QixFQW1CQTs7QUFDQSxJQUFJUSxhQUFhLEdBQUd6RCxFQUFFLENBQUNRLEtBQUgsQ0FBUztBQUMzQkMsRUFBQUEsSUFBSSxFQUFFLGVBRHFCO0FBRTNCLGFBQVNULEVBQUUsQ0FBQzBELFNBRmU7QUFHM0JoRCxFQUFBQSxVQUFVLEVBQUU7QUFDVmlELElBQUFBLFdBQVcsRUFBRTtBQUNYLGlCQUFTLElBREU7QUFFWEMsTUFBQUEsSUFBSSxFQUFFckQsT0FGSztBQUdYc0QsTUFBQUEsWUFBWSxFQUFFLElBSEg7QUFJWEMsTUFBQUEsT0FBTyxFQUFFO0FBSkUsS0FESDtBQU9WQyxJQUFBQSxXQUFXLEVBQUU7QUFDWCxpQkFBUyxJQURFO0FBRVhILE1BQUFBLElBQUksRUFBRXBCLE9BRks7QUFHWHFCLE1BQUFBLFlBQVksRUFBRSxJQUhIO0FBSVhDLE1BQUFBLE9BQU8sRUFBRTtBQUpFLEtBUEg7QUFhVkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWSixNQUFBQSxJQUFJLEVBQUVWLGtCQUZJO0FBR1ZXLE1BQUFBLFlBQVksRUFBRSxJQUhKO0FBSVZDLE1BQUFBLE9BQU8sRUFBRTtBQUpDLEtBYkY7QUFtQlZHLElBQUFBLFNBQVMsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEwsTUFBQUEsSUFBSSxFQUFFUCxvQkFGRztBQUdUUSxNQUFBQSxZQUFZLEVBQUUsSUFITDtBQUlUQyxNQUFBQSxPQUFPLEVBQUU7QUFKQSxLQW5CRDtBQXlCVkksSUFBQUEsWUFBWSxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVaTixNQUFBQSxJQUFJLEVBQUVKLGdCQUZNO0FBR1pLLE1BQUFBLFlBQVksRUFBRSxJQUhGO0FBSVpDLE1BQUFBLE9BQU8sRUFBRTtBQUpHLEtBekJKO0FBK0JWSyxJQUFBQSxZQUFZLEVBQUU7QUFDWkMsTUFBQUEsV0FBVyxFQUFFLFVBREQ7QUFFWlIsTUFBQUEsSUFBSSxFQUFFN0QsZ0JBRk07QUFHWixpQkFBU0EsZ0JBQWdCLENBQUNHLElBSGQ7QUFJWjJELE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHO0FBL0JKLEdBSGU7QUEyQzNCTyxFQUFBQSxPQUFPLEVBQUU7QUFDUDtBQUNBQyxJQUFBQSxRQUFRLEVBQUU7QUFGSCxHQTNDa0I7QUFnRDNCQyxFQUFBQSxpQkFoRDJCLCtCQWdEUDtBQUNsQmQsSUFBQUEsYUFBYSxDQUFDYSxRQUFkLEdBQXlCLElBQXpCO0FBQ0F0RSxJQUFBQSxFQUFFLENBQUN3RSxJQUFILENBQVFDLHFCQUFSLENBQThCLEtBQUtDLElBQW5DO0FBQ0QsR0FuRDBCO0FBcUQzQkMsRUFBQUEsTUFyRDJCLG9CQXFEbEI7QUFDUCxRQUFJLENBQUNsQixhQUFhLENBQUNhLFFBQW5CLEVBQTZCO0FBQzNCYixNQUFBQSxhQUFhLENBQUNhLFFBQWQsR0FBeUIsSUFBekI7QUFDQXRFLE1BQUFBLEVBQUUsQ0FBQ3dFLElBQUgsQ0FBUUksa0JBQVIsQ0FBMkIsS0FBS0YsSUFBaEM7QUFDQSxXQUFLZixXQUFMLEdBQW1CLElBQUlwRCxPQUFKLEVBQW5CO0FBQ0FzRSxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyx1QkFBdUIsS0FBS0osSUFBTCxDQUFVakUsSUFBL0M7QUFDRCxLQU5NLENBUVA7OztBQUNBLFNBQUtzRSxVQUFMLEdBQWtCLG9FQUFsQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0Isc0VBQXBCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUIsdUVBQXpCLENBWE8sQ0FhUDtBQUNELEdBbkUwQjtBQXFFM0JDLEVBQUFBLFdBckUyQix1QkFxRWZDLE1BckVlLEVBcUVQQyxLQXJFTyxFQXFFQXJDLFlBckVBLEVBcUVjc0MsUUFyRWQsRUFxRTZCO0FBQUEsUUFBZkEsUUFBZTtBQUFmQSxNQUFBQSxRQUFlLEdBQUosQ0FBQyxDQUFHO0FBQUE7O0FBQ3RELFFBQUlDLE9BQU8sR0FBRyxJQUFJQyxXQUFKLENBQWdCSixNQUFoQixFQUF3QkMsS0FBeEIsQ0FBZDtBQUNBLFFBQUlJLE1BQU0sR0FBRztBQUFFLHNCQUFnQixpQ0FBbEI7QUFBcURDLE1BQUFBLGFBQWEsRUFBRTFDO0FBQXBFLEtBQWI7QUFDQSxTQUFLMkMsV0FBTCxDQUFpQixLQUFLWCxVQUF0QixFQUFrQyxNQUFsQyxFQUEwQ08sT0FBMUMsRUFBbUQsQ0FBbkQsRUFBc0RFLE1BQXRELEVBQThESCxRQUE5RDtBQUNELEdBekUwQjtBQTJFM0JNLEVBQUFBLFNBM0UyQixxQkEyRWpCUixNQTNFaUIsRUEyRVRTLFNBM0VTLEVBMkVFUixLQTNFRixFQTJFUztBQUNsQyxRQUFJRSxPQUFPLEdBQUcsSUFBSU8sZ0JBQUosQ0FBcUJWLE1BQXJCLEVBQTZCUyxTQUE3QixFQUF3Q1IsS0FBeEMsRUFBK0Msc0NBQS9DLENBQWQ7QUFDQSxTQUFLTSxXQUFMLENBQWlCLEtBQUtWLFlBQXRCLEVBQW9DLE1BQXBDLEVBQTRDTSxPQUE1QyxFQUFxRCxDQUFyRCxFQUF3RCxJQUF4RCxFQUE4RCxDQUFDLENBQS9EO0FBQ0QsR0E5RTBCO0FBZ0YzQlEsRUFBQUEsY0FoRjJCLDBCQWdGWkMsS0FoRlksRUFnRkFDLFFBaEZBLEVBZ0ZlQyxTQWhGZixFQWdGK0I7QUFBQSxRQUEzQ0YsS0FBMkM7QUFBM0NBLE1BQUFBLEtBQTJDLEdBQW5DLENBQUMsQ0FBa0M7QUFBQTs7QUFBQSxRQUEvQkMsUUFBK0I7QUFBL0JBLE1BQUFBLFFBQStCLEdBQXBCLENBQUMsQ0FBbUI7QUFBQTs7QUFBQSxRQUFoQkMsU0FBZ0I7QUFBaEJBLE1BQUFBLFNBQWdCLEdBQUosQ0FBQyxDQUFHO0FBQUE7O0FBQ3hELFFBQUlDLFNBQVMsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdwRyxFQUFFLENBQUNxRyxHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLENBQVgsQ0FBaEI7O0FBRUEsUUFBSUwsU0FBUyxJQUFJLElBQWpCLEVBQXVCO0FBQ3JCLFVBQUlNLGNBQWMsR0FBRyxJQUFJQyxxQkFBSixDQUNuQlAsU0FBUyxDQUFDUSxJQUFWLENBQWVDLEVBREksRUFFbkJULFNBQVMsQ0FBQ1EsSUFBVixDQUFlRSxRQUZJLEVBR25CVixTQUFTLENBQUNRLElBQVYsQ0FBZWpHLElBSEksRUFJbkJ5RixTQUFTLENBQUNRLElBQVYsQ0FBZUcsSUFKSSxFQUtuQlgsU0FBUyxDQUFDUSxJQUFWLENBQWVJLEdBTEksRUFNbkJaLFNBQVMsQ0FBQ1EsSUFBVixDQUFlOUYsVUFOSSxFQU9uQnNGLFNBQVMsQ0FBQ1EsSUFBVixDQUFlNUYsV0FQSSxFQVFuQm9GLFNBQVMsQ0FBQ1EsSUFBVixDQUFlSyxNQVJJLEVBU25CYixTQUFTLENBQUNRLElBQVYsQ0FBZTFGLFFBVEksRUFVbkJrRixTQUFTLENBQUNRLElBQVYsQ0FBZU0sU0FWSSxFQVduQmQsU0FBUyxDQUFDUSxJQUFWLENBQWVsRixRQVhJLEVBWW5CMEUsU0FBUyxDQUFDUSxJQUFWLENBQWV4RixjQVpJLEVBYW5CZ0YsU0FBUyxDQUFDUSxJQUFWLENBQWVPLFVBYkksRUFjbkIscUJBZG1CLEVBZW5CLGFBZm1CLEVBZ0JuQmYsU0FBUyxDQUFDUSxJQUFWLENBQWVRLFlBaEJJLEVBaUJuQmhCLFNBQVMsQ0FBQ1EsSUFBVixDQUFlcEQsVUFqQkksRUFrQm5CNEMsU0FBUyxDQUFDUSxJQUFWLENBQWVuRixRQWxCSSxDQUFyQjs7QUFxQkEsVUFBSXdFLEtBQUssSUFBSSxDQUFDLENBQWQsRUFBaUI7QUFDZlMsUUFBQUEsY0FBYyxDQUFDUyxVQUFmLEdBQTRCbEIsS0FBNUI7QUFDRDs7QUFDRCxVQUFJQyxRQUFRLElBQUksQ0FBQyxDQUFqQixFQUFvQjtBQUNsQlEsUUFBQUEsY0FBYyxDQUFDeEYsUUFBZixHQUEwQmdGLFFBQTFCO0FBQ0Q7O0FBQ0QsVUFBSUMsU0FBUyxJQUFJLENBQUMsQ0FBbEIsRUFBcUI7QUFDbkJPLFFBQUFBLGNBQWMsQ0FBQ2pGLFFBQWYsR0FBMEIwRSxTQUFTLENBQUNrQixRQUFWLEVBQTFCO0FBQ0Q7O0FBRUR0QyxNQUFBQSxPQUFPLENBQUN1QyxHQUFSLENBQVlaLGNBQVo7QUFDQSxVQUFJbEIsT0FBTyxHQUFHa0IsY0FBZDtBQUNBLFVBQUloQixNQUFNLEdBQUc7QUFBRSx3QkFBZ0IsaUNBQWxCO0FBQXFEQyxRQUFBQSxhQUFhLEVBQUVTLFNBQVMsQ0FBQ1EsSUFBVixDQUFlVztBQUFuRixPQUFiO0FBQ0EsV0FBSzNCLFdBQUwsQ0FBaUIsS0FBS1QsaUJBQXRCLEVBQXlDLEtBQXpDLEVBQWdESyxPQUFoRCxFQUF5RCxDQUF6RCxFQUE0REUsTUFBNUQsRUFBb0UsQ0FBQyxDQUFyRTtBQUNELEtBcENELE1Bb0NPO0FBQ0xYLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJDQUFkO0FBQ0Q7QUFDRixHQTFIMEI7QUE0SDNCd0MsRUFBQUEsS0E1SDJCLGlCQTRIckJDLElBNUhxQixFQTRIZkMsT0E1SGUsRUE0SE5DLFlBNUhNLEVBNEhRQyxRQTVIUixFQTRIeUI7QUFBQSxRQUFqQkEsUUFBaUI7QUFBakJBLE1BQUFBLFFBQWlCLEdBQU4sSUFBTTtBQUFBOztBQUNsRCxRQUFJRixPQUFPLElBQUksS0FBZixFQUFzQjtBQUNwQixVQUFJRSxRQUFRLElBQUksSUFBaEIsRUFBc0I7QUFDcEIsZUFBT0MsS0FBSyxDQUFDSixJQUFELEVBQU87QUFDakJLLFVBQUFBLE9BQU8sRUFBRTtBQUFFLDRCQUFnQjtBQUFsQixXQURRO0FBRWpCQyxVQUFBQSxNQUFNLEVBQUVMO0FBRlMsU0FBUCxDQUFaO0FBSUQsT0FMRCxNQUtPO0FBQ0wsZUFBT0csS0FBSyxDQUFDSixJQUFELEVBQU87QUFDakJLLFVBQUFBLE9BQU8sRUFBRUYsUUFEUTtBQUVqQkcsVUFBQUEsTUFBTSxFQUFFTDtBQUZTLFNBQVAsQ0FBWjtBQUlEO0FBQ0YsS0FaRCxNQVlPO0FBQ0wsVUFBSUUsUUFBUSxJQUFJLElBQWhCLEVBQXNCO0FBQ3BCO0FBQ0E7QUFDQSxlQUFPQyxLQUFLLENBQUNKLElBQUQsRUFBTztBQUNqQkssVUFBQUEsT0FBTyxFQUFFO0FBQUUsNEJBQWdCO0FBQWxCLFdBRFE7QUFFakJDLFVBQUFBLE1BQU0sRUFBRUwsT0FGUztBQUdqQk0sVUFBQUEsSUFBSSxFQUFFM0IsSUFBSSxDQUFDNEIsU0FBTCxDQUFlTixZQUFmO0FBSFcsU0FBUCxDQUFaO0FBS0QsT0FSRCxNQVFPO0FBQ0wsZUFBT0UsS0FBSyxDQUFDSixJQUFELEVBQU87QUFDakJLLFVBQUFBLE9BQU8sRUFBRUYsUUFEUTtBQUVqQkcsVUFBQUEsTUFBTSxFQUFFTCxPQUZTO0FBR2pCTSxVQUFBQSxJQUFJLEVBQUUzQixJQUFJLENBQUM0QixTQUFMLENBQWVOLFlBQWY7QUFIVyxTQUFQLENBQVo7QUFLRDtBQUNGO0FBQ0YsR0ExSjBCO0FBNEozQi9CLEVBQUFBLFdBNUoyQix1QkE0SmY2QixJQTVKZSxFQTRKVEMsT0E1SlMsRUE0SkFDLFlBNUpBLEVBNEpjTyxLQTVKZCxFQTRKcUJOLFFBNUpyQixFQTRKc0NyQyxRQTVKdEMsRUE0SnFEO0FBQUEsUUFBaENxQyxRQUFnQztBQUFoQ0EsTUFBQUEsUUFBZ0MsR0FBckIsSUFBcUI7QUFBQTs7QUFBQSxRQUFmckMsUUFBZTtBQUFmQSxNQUFBQSxRQUFlLEdBQUosQ0FBQyxDQUFHO0FBQUE7O0FBQzlFNEMsSUFBQUEsYUFBYSxDQUFDVixJQUFELEVBQU9DLE9BQVAsRUFBZ0JDLFlBQWhCLEVBQThCQyxRQUE5QixDQUFiOztBQUQ4RSxhQUUvRE8sYUFGK0Q7QUFBQTtBQUFBLE1BOEU5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBaEc4RTtBQUFBLCtFQUU5RSxpQkFBNkJWLElBQTdCLEVBQW1DQyxPQUFuQyxFQUE0Q0MsWUFBNUMsRUFBMERDLFFBQTFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUEwREEsUUFBMUQ7QUFBMERBLGtCQUFBQSxRQUExRCxHQUFxRSxJQUFyRTtBQUFBOztBQUFBO0FBQUE7QUFBQSx1QkFFeUJqRSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJnRCxLQUF2QixDQUE2QkMsSUFBN0IsRUFBbUNDLE9BQW5DLEVBQTRDQyxZQUE1QyxFQUEwREMsUUFBMUQsQ0FGekI7O0FBQUE7QUFFUVEsZ0JBQUFBLFFBRlI7QUFBQTtBQUFBLHVCQUd5QkEsUUFBUSxDQUFDQyxJQUFULEVBSHpCOztBQUFBO0FBR1FDLGdCQUFBQSxRQUhSOztBQUtJLG9CQUFJSixLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNkO0FBQ0lLLGtCQUFBQSxRQUZVLEdBRUMsSUFBSUMsZ0JBQUosQ0FBcUJGLFFBQVEsQ0FBQ0csVUFBOUIsRUFBMENILFFBQVEsQ0FBQ0ksT0FBbkQsRUFBNERKLFFBQVEsQ0FBQzFCLElBQXJFLENBRkQ7QUFHZDdCLGtCQUFBQSxPQUFPLENBQUN1QyxHQUFSLENBQVlnQixRQUFaOztBQUNBLHNCQUFJL0MsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ2pCO0FBQ0Esd0JBQUlnRCxRQUFRLENBQUNHLE9BQVQsQ0FBaUJDLFFBQWpCLENBQTBCLFNBQTFCLEtBQXdDSixRQUFRLENBQUNHLE9BQVQsQ0FBaUJDLFFBQWpCLENBQTBCLGFBQTFCLENBQTVDLEVBQXNGO0FBQ3BGNUQsc0JBQUFBLE9BQU8sQ0FBQ3VDLEdBQVIsQ0FBWSx1QkFBWjtBQUNBdkMsc0JBQUFBLE9BQU8sQ0FBQ3VDLEdBQVIsQ0FBWWlCLFFBQVosRUFGb0YsQ0FJcEY7O0FBQ0FySSxzQkFBQUEsRUFBRSxDQUFDMEksV0FBSCxDQUFlQyxJQUFmLENBQW9CLFdBQXBCLEVBQWlDTixRQUFqQztBQUNBckksc0JBQUFBLEVBQUUsQ0FBQzBJLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixhQUFwQixFQUFtQyxDQUFuQztBQUNELHFCQVBELE1BT087QUFDTDNJLHNCQUFBQSxFQUFFLENBQUMwSSxXQUFILENBQWVDLElBQWYsQ0FBb0IsYUFBcEIsRUFBbUMsQ0FBbkM7QUFDRDtBQUNGO0FBQ0YsaUJBakJELE1BaUJPLElBQUlYLEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ3JCO0FBQ0lLLGtCQUFBQSxRQUZpQixHQUVOLElBQUlDLGdCQUFKLENBQXFCRixRQUFRLENBQUNHLFVBQTlCLEVBQTBDSCxRQUFRLENBQUNJLE9BQW5ELEVBQTRESixRQUFRLENBQUMxQixJQUFyRSxDQUZNO0FBR3JCN0Isa0JBQUFBLE9BQU8sQ0FBQ3VDLEdBQVIsQ0FBWWdCLFFBQVo7O0FBQ0Esc0JBQUlDLFFBQVEsQ0FBQ0csT0FBVCxDQUFpQkMsUUFBakIsQ0FBMEIsYUFBMUIsQ0FBSixFQUE4QztBQUM1Q3pJLG9CQUFBQSxFQUFFLENBQUMwSSxXQUFILENBQWVDLElBQWYsQ0FBb0IsV0FBcEIsRUFBaUNOLFFBQWpDO0FBQ0F4RCxvQkFBQUEsT0FBTyxDQUFDdUMsR0FBUixDQUFZLDZCQUFaO0FBQ0F2QyxvQkFBQUEsT0FBTyxDQUFDdUMsR0FBUixDQUFZaUIsUUFBWjs7QUFDQSx3QkFBSUEsUUFBUSxDQUFDM0IsSUFBVCxDQUFjakYsUUFBZCxDQUF1QmdILFFBQXZCLENBQWdDLFNBQWhDLENBQUosRUFBZ0Q7QUFDOUNoRixzQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFzQ3BFLGdCQUFnQixDQUFDSSxVQUF2RDtBQUNBc0Qsc0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QnNFLGlCQUF2QixDQUF5Q1AsUUFBekMsRUFBbUQsSUFBbkQ7QUFDQXJJLHNCQUFBQSxFQUFFLENBQUMwSSxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCLEVBQXlDLElBQXpDLEVBQStDLEtBQS9DLEVBQXNELEtBQXRELEVBQTZELEtBQTdELEVBQW9FLEtBQXBFO0FBQ0QscUJBSkQsTUFJTyxJQUFJTixRQUFRLENBQUMzQixJQUFULENBQWNqRixRQUFkLENBQXVCZ0gsUUFBdkIsQ0FBZ0MsU0FBaEMsQ0FBSixFQUFnRDtBQUNyRGhGLHNCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDcEUsZ0JBQWdCLENBQUNJLFVBQXZEO0FBQ0FzRCxzQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCdUUsaUJBQXZCLENBQXlDUixRQUF6QyxFQUFtRCxJQUFuRDtBQUNBckksc0JBQUFBLEVBQUUsQ0FBQzBJLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsS0FBekMsRUFBZ0QsSUFBaEQsRUFBc0QsS0FBdEQsRUFBNkQsS0FBN0QsRUFBb0UsS0FBcEU7QUFDRCxxQkFKTSxNQUlBLElBQUlOLFFBQVEsQ0FBQzNCLElBQVQsQ0FBY2pGLFFBQWQsQ0FBdUJnSCxRQUF2QixDQUFnQyxtQkFBaEMsQ0FBSixFQUEwRDtBQUMvRGhGLHNCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDcEUsZ0JBQWdCLENBQUNJLFVBQXZEO0FBQ0FzRCxzQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCd0UsZ0JBQXZCLENBQXdDVCxRQUF4QyxFQUFrRCxJQUFsRDtBQUNBckksc0JBQUFBLEVBQUUsQ0FBQzBJLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsS0FBekMsRUFBZ0QsS0FBaEQsRUFBdUQsSUFBdkQsRUFBNkQsS0FBN0QsRUFBb0UsS0FBcEU7QUFDRCxxQkFKTSxNQUlBLElBQUlOLFFBQVEsQ0FBQzNCLElBQVQsQ0FBY2pGLFFBQWQsQ0FBdUJnSCxRQUF2QixDQUFnQyxhQUFoQyxDQUFKLEVBQW9EO0FBQ3pEaEYsc0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NwRSxnQkFBZ0IsQ0FBQ0ksVUFBdkQ7QUFDQXNELHNCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJ5RSxlQUF2QixDQUF1Q1YsUUFBdkMsRUFBaUQsSUFBakQ7QUFDQXJJLHNCQUFBQSxFQUFFLENBQUMwSSxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCLEVBQXlDLEtBQXpDLEVBQWdELEtBQWhELEVBQXVELEtBQXZELEVBQThELElBQTlELEVBQW9FLEtBQXBFO0FBQ0QscUJBSk0sTUFJQSxJQUFJTixRQUFRLENBQUMzQixJQUFULENBQWNqRixRQUFkLENBQXVCZ0gsUUFBdkIsQ0FBZ0MsaUJBQWhDLENBQUosRUFBd0Q7QUFDN0RoRixzQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFzQ3BFLGdCQUFnQixDQUFDSSxVQUF2RDtBQUNBc0Qsc0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QjBFLGtCQUF2QixDQUEwQ1gsUUFBMUMsRUFBb0QsSUFBcEQ7QUFDQXJJLHNCQUFBQSxFQUFFLENBQUMwSSxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCLEVBQXlDLEtBQXpDLEVBQWdELEtBQWhELEVBQXVELEtBQXZELEVBQThELEtBQTlELEVBQXFFLElBQXJFO0FBQ0Q7QUFDRixtQkF6QkQsTUF5Qk8sSUFBSU4sUUFBUSxDQUFDRyxPQUFULENBQWlCQyxRQUFqQixDQUEwQixPQUExQixLQUFzQ0osUUFBUSxDQUFDRyxPQUFULENBQWlCQyxRQUFqQixDQUEwQixZQUExQixDQUExQyxFQUFtRjtBQUN4RmhGLG9CQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDcEUsZ0JBQWdCLENBQUNNLG9CQUF2RDtBQUNBTCxvQkFBQUEsRUFBRSxDQUFDMEksV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQjtBQUNELG1CQUhNLE1BR0EsSUFBSU4sUUFBUSxDQUFDRyxPQUFULENBQWlCQyxRQUFqQixDQUEwQixpQkFBMUIsQ0FBSixFQUFrRDtBQUN2RGhGLG9CQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDcEUsZ0JBQWdCLENBQUNLLFlBQXZEO0FBQ0FKLG9CQUFBQSxFQUFFLENBQUMwSSxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCO0FBQ0QsbUJBSE0sTUFHQSxJQUFJTixRQUFRLENBQUNHLE9BQVQsQ0FBaUJDLFFBQWpCLENBQTBCLDZDQUExQixDQUFKLEVBQThFO0FBQ25GaEYsb0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NwRSxnQkFBZ0IsQ0FBQ00sb0JBQXZEO0FBQ0FMLG9CQUFBQSxFQUFFLENBQUMwSSxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCO0FBQ0Q7QUFDRixpQkF2Q00sTUF1Q0EsSUFBSVgsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDakJLLGtCQUFBQSxRQURpQixHQUNOLElBQUlDLGdCQUFKLENBQXFCRixRQUFRLENBQUNHLFVBQTlCLEVBQTBDSCxRQUFRLENBQUNJLE9BQW5ELEVBQTRESixRQUFRLENBQUMxQixJQUFyRSxDQURNO0FBRXJCN0Isa0JBQUFBLE9BQU8sQ0FBQ3VDLEdBQVIsQ0FBWWdCLFFBQVo7QUFDRDs7QUFoRUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBa0VJLG9CQUFJSixLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNkO0FBQ0F2RSxrQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFzQ3BFLGdCQUFnQixDQUFDTyxTQUF2RDtBQUNBTixrQkFBQUEsRUFBRSxDQUFDMEksV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQjtBQUNEOztBQUNEOUQsZ0JBQUFBLE9BQU8sQ0FBQ0MsS0FBUjs7QUF2RUo7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRjhFO0FBQUE7QUFBQTtBQWlHL0UsR0E3UDBCO0FBK1AzQjhELEVBQUFBLGlCQS9QMkIsNkJBK1BUSyxZQS9QUyxFQStQS0MsVUEvUEwsRUErUGlCO0FBQzFDLFNBQUt2RixXQUFMLENBQWlCbEQsSUFBakIsR0FBd0J3SSxZQUFZLENBQUN2QyxJQUFiLENBQWtCakcsSUFBMUM7QUFDQSxTQUFLa0QsV0FBTCxDQUFpQmhELEdBQWpCLEdBQXVCc0ksWUFBWSxDQUFDdkMsSUFBYixDQUFrQkksR0FBekM7QUFDQSxTQUFLbkQsV0FBTCxDQUFpQi9DLFVBQWpCLEdBQThCcUksWUFBWSxDQUFDdkMsSUFBYixDQUFrQjlGLFVBQWhEO0FBQ0EsU0FBSytDLFdBQUwsQ0FBaUI5QyxZQUFqQixHQUFnQ29JLFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JDLEVBQWxEO0FBQ0EsU0FBS2hELFdBQUwsQ0FBaUI3QyxXQUFqQixHQUErQm1JLFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0I1RixXQUFqRDtBQUNBLFNBQUs2QyxXQUFMLENBQWlCNUMsWUFBakIsR0FBZ0NrSSxZQUFZLENBQUN2QyxJQUFiLENBQWtCSyxNQUFsRDtBQUNBLFNBQUtwRCxXQUFMLENBQWlCM0MsUUFBakIsR0FBNEJpSSxZQUFZLENBQUN2QyxJQUFiLENBQWtCMUYsUUFBOUM7QUFDQSxTQUFLMkMsV0FBTCxDQUFpQjFDLFVBQWpCLEdBQThCZ0ksWUFBWSxDQUFDdkMsSUFBYixDQUFrQk0sU0FBaEQ7QUFDQSxTQUFLckQsV0FBTCxDQUFpQnpDLGNBQWpCLEdBQWtDK0gsWUFBWSxDQUFDdkMsSUFBYixDQUFrQnhGLGNBQXBEO0FBQ0EsU0FBS3lDLFdBQUwsQ0FBaUJ4QyxRQUFqQixHQUE0QjhILFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JPLFVBQTlDO0FBQ0EsU0FBS3RELFdBQUwsQ0FBaUJyQyxNQUFqQixHQUEwQjJILFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JwRixNQUE1QztBQUNBLFNBQUtxQyxXQUFMLENBQWlCcEMsUUFBakIsR0FBNEIwSCxZQUFZLENBQUN2QyxJQUFiLENBQWtCbkYsUUFBOUM7QUFDQSxTQUFLb0MsV0FBTCxDQUFpQm5DLFFBQWpCLEdBQTRCeUgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQmxGLFFBQTlDO0FBQ0EsU0FBS21DLFdBQUwsQ0FBaUJsQyxRQUFqQixHQUE0QndILFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JqRixRQUE5Qzs7QUFFQSxRQUFJeUgsVUFBSixFQUFnQjtBQUNkLFdBQUt2RixXQUFMLENBQWlCdkMsV0FBakIsR0FBK0I2SCxZQUFZLENBQUN2QyxJQUFiLENBQWtCVyxTQUFqRDtBQUNBLFdBQUsxRCxXQUFMLENBQWlCdEMsU0FBakIsR0FBNkI0SCxZQUFZLENBQUN2QyxJQUFiLENBQWtCeUMsU0FBL0M7QUFDRDs7QUFFRHRFLElBQUFBLE9BQU8sQ0FBQ3VDLEdBQVIsQ0FBWSxLQUFLekQsV0FBakI7QUFDRCxHQXJSMEI7QUF1UjNCa0YsRUFBQUEsaUJBdlIyQiw2QkF1UlRJLFlBdlJTLEVBdVJLQyxVQXZSTCxFQXVSaUI7QUFDMUMsU0FBS25GLFdBQUwsQ0FBaUJ0RCxJQUFqQixHQUF3QndJLFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JqRyxJQUExQztBQUNBLFNBQUtzRCxXQUFMLENBQWlCdEIsTUFBakIsR0FBMEJ3RyxZQUFZLENBQUN2QyxJQUFiLENBQWtCcEQsVUFBNUM7QUFDQSxTQUFLUyxXQUFMLENBQWlCckIsV0FBakIsR0FBK0J1RyxZQUFZLENBQUN2QyxJQUFiLENBQWtCaEUsV0FBakQ7QUFDQSxTQUFLcUIsV0FBTCxDQUFpQmxELFlBQWpCLEdBQWdDb0ksWUFBWSxDQUFDdkMsSUFBYixDQUFrQkMsRUFBbEQ7QUFDQSxTQUFLNUMsV0FBTCxDQUFpQnBCLGFBQWpCLEdBQWlDc0csWUFBWSxDQUFDdkMsSUFBYixDQUFrQi9ELGFBQW5EO0FBQ0EsU0FBS29CLFdBQUwsQ0FBaUJ6QyxNQUFqQixHQUEwQjJILFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JwRixNQUE1QztBQUNBLFNBQUt5QyxXQUFMLENBQWlCeEMsUUFBakIsR0FBNEIwSCxZQUFZLENBQUN2QyxJQUFiLENBQWtCbkYsUUFBOUM7QUFDQSxTQUFLd0MsV0FBTCxDQUFpQnZDLFFBQWpCLEdBQTRCeUgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQmxGLFFBQTlDO0FBQ0EsU0FBS3VDLFdBQUwsQ0FBaUJ0QyxRQUFqQixHQUE0QndILFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JqRixRQUE5Qzs7QUFFQSxRQUFJeUgsVUFBSixFQUFnQjtBQUNkLFdBQUtuRixXQUFMLENBQWlCM0MsV0FBakIsR0FBK0I2SCxZQUFZLENBQUN2QyxJQUFiLENBQWtCVyxTQUFqRDtBQUNBLFdBQUt0RCxXQUFMLENBQWlCMUMsU0FBakIsR0FBNkI0SCxZQUFZLENBQUN2QyxJQUFiLENBQWtCeUMsU0FBL0M7QUFDRDs7QUFFRHRFLElBQUFBLE9BQU8sQ0FBQ3VDLEdBQVIsQ0FBWSxLQUFLckQsV0FBakI7QUFDRCxHQXhTMEI7QUEwUzNCK0UsRUFBQUEsZ0JBMVMyQiw0QkEwU1ZHLFlBMVNVLEVBMFNJQyxVQTFTSixFQTBTZ0I7QUFDekMsU0FBS2xGLFVBQUwsQ0FBZ0J2RCxJQUFoQixHQUF1QndJLFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JqRyxJQUF6QztBQUNBLFNBQUt1RCxVQUFMLENBQWdCbkQsWUFBaEIsR0FBK0JvSSxZQUFZLENBQUN2QyxJQUFiLENBQWtCQyxFQUFqRDtBQUNBLFNBQUszQyxVQUFMLENBQWdCckIsYUFBaEIsR0FBZ0NzRyxZQUFZLENBQUN2QyxJQUFiLENBQWtCL0QsYUFBbEQ7QUFDQSxTQUFLcUIsVUFBTCxDQUFnQjFDLE1BQWhCLEdBQXlCMkgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQnBGLE1BQTNDO0FBQ0EsU0FBSzBDLFVBQUwsQ0FBZ0JiLE9BQWhCLEdBQTBCOEYsWUFBWSxDQUFDdkMsSUFBYixDQUFrQnZELE9BQTVDO0FBQ0EsU0FBS2EsVUFBTCxDQUFnQnpDLFFBQWhCLEdBQTJCMEgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQm5GLFFBQTdDO0FBQ0EsU0FBS3lDLFVBQUwsQ0FBZ0J4QyxRQUFoQixHQUEyQnlILFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JsRixRQUE3QztBQUNBLFNBQUt3QyxVQUFMLENBQWdCdkMsUUFBaEIsR0FBMkJ3SCxZQUFZLENBQUN2QyxJQUFiLENBQWtCakYsUUFBN0M7O0FBRUEsUUFBSXlILFVBQUosRUFBZ0I7QUFDZCxXQUFLbEYsVUFBTCxDQUFnQjVDLFdBQWhCLEdBQThCNkgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQlcsU0FBaEQ7QUFDQSxXQUFLckQsVUFBTCxDQUFnQjNDLFNBQWhCLEdBQTRCNEgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQnlDLFNBQTlDO0FBQ0Q7O0FBRUR0RSxJQUFBQSxPQUFPLENBQUN1QyxHQUFSLENBQVksS0FBS3BELFVBQWpCO0FBQ0QsR0ExVDBCO0FBNFQzQitFLEVBQUFBLGVBNVQyQiwyQkE0VFhFLFlBNVRXLEVBNFRHQyxVQTVUSCxFQTRUZTtBQUN4QyxTQUFLakYsU0FBTCxDQUFleEQsSUFBZixHQUFzQndJLFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JqRyxJQUF4QztBQUNBLFNBQUt3RCxTQUFMLENBQWVwRCxZQUFmLEdBQThCb0ksWUFBWSxDQUFDdkMsSUFBYixDQUFrQkMsRUFBaEQ7QUFDQSxTQUFLMUMsU0FBTCxDQUFldEIsYUFBZixHQUErQnNHLFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0IvRCxhQUFqRDtBQUNBLFNBQUtzQixTQUFMLENBQWUzQyxNQUFmLEdBQXdCMkgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQnBGLE1BQTFDO0FBQ0EsU0FBSzJDLFNBQUwsQ0FBZVgsVUFBZixHQUE0QjJGLFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JwRCxVQUE5QztBQUNBLFNBQUtXLFNBQUwsQ0FBZTFDLFFBQWYsR0FBMEIwSCxZQUFZLENBQUN2QyxJQUFiLENBQWtCbkYsUUFBNUM7QUFDQSxTQUFLMEMsU0FBTCxDQUFlekMsUUFBZixHQUEwQnlILFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JsRixRQUE1QztBQUNBLFNBQUt5QyxTQUFMLENBQWV4QyxRQUFmLEdBQTBCd0gsWUFBWSxDQUFDdkMsSUFBYixDQUFrQmpGLFFBQTVDOztBQUVBLFFBQUl5SCxVQUFKLEVBQWdCO0FBQ2QsV0FBS2pGLFNBQUwsQ0FBZTdDLFdBQWYsR0FBNkI2SCxZQUFZLENBQUN2QyxJQUFiLENBQWtCVyxTQUEvQztBQUNBLFdBQUtwRCxTQUFMLENBQWU1QyxTQUFmLEdBQTJCNEgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQnlDLFNBQTdDO0FBQ0Q7O0FBRUR0RSxJQUFBQSxPQUFPLENBQUN1QyxHQUFSLENBQVksS0FBS25ELFNBQWpCO0FBQ0QsR0E1VTBCO0FBOFUzQitFLEVBQUFBLGtCQTlVMkIsOEJBOFVSQyxZQTlVUSxFQThVTUMsVUE5VU4sRUE4VWtCO0FBQzNDLFNBQUtoRixZQUFMLENBQWtCekQsSUFBbEIsR0FBeUJ3SSxZQUFZLENBQUN2QyxJQUFiLENBQWtCakcsSUFBM0M7QUFDQSxTQUFLeUQsWUFBTCxDQUFrQnJELFlBQWxCLEdBQWlDb0ksWUFBWSxDQUFDdkMsSUFBYixDQUFrQkMsRUFBbkQ7QUFDQSxTQUFLekMsWUFBTCxDQUFrQjNDLFFBQWxCLEdBQTZCMEgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQm5GLFFBQS9DO0FBQ0EsU0FBSzJDLFlBQUwsQ0FBa0IxQyxRQUFsQixHQUE2QnlILFlBQVksQ0FBQ3ZDLElBQWIsQ0FBa0JsRixRQUEvQztBQUNBLFNBQUswQyxZQUFMLENBQWtCekMsUUFBbEIsR0FBNkJ3SCxZQUFZLENBQUN2QyxJQUFiLENBQWtCakYsUUFBL0M7O0FBRUEsUUFBSXlILFVBQUosRUFBZ0I7QUFDZCxXQUFLaEYsWUFBTCxDQUFrQjlDLFdBQWxCLEdBQWdDNkgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQlcsU0FBbEQ7QUFDQSxXQUFLbkQsWUFBTCxDQUFrQjdDLFNBQWxCLEdBQThCNEgsWUFBWSxDQUFDdkMsSUFBYixDQUFrQnlDLFNBQWhEO0FBQ0Q7O0FBRUR0RSxJQUFBQSxPQUFPLENBQUN1QyxHQUFSLENBQVksS0FBS2xELFlBQWpCO0FBQ0QsR0EzVjBCO0FBNFYzQmtGLEVBQUFBLEtBNVYyQixtQkE0Vm5CLENBQUUsQ0E1VmlCO0FBOFYzQkMsRUFBQUEsa0JBOVYyQiw4QkE4VlJoQixRQTlWUSxFQThWRTtBQUMzQnhELElBQUFBLE9BQU8sQ0FBQ3VDLEdBQVIsQ0FBWSwyQ0FBWjtBQUNBdkMsSUFBQUEsT0FBTyxDQUFDdUMsR0FBUixDQUFZaUIsUUFBWjs7QUFDQSxRQUFJQSxRQUFRLENBQUMzQixJQUFULENBQWNqRixRQUFkLENBQXVCZ0gsUUFBdkIsQ0FBZ0MsU0FBaEMsQ0FBSixFQUFnRDtBQUM5Q2hGLE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NwRSxnQkFBZ0IsQ0FBQ0ksVUFBdkQ7QUFDQXNELE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QnNFLGlCQUF2QixDQUF5Q1AsUUFBekMsRUFBbUQsSUFBbkQ7QUFDQXJJLE1BQUFBLEVBQUUsQ0FBQzBJLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsSUFBekMsRUFBK0MsS0FBL0MsRUFBc0QsS0FBdEQsRUFBNkQsS0FBN0QsRUFBb0UsS0FBcEU7QUFDRCxLQUpELE1BSU8sSUFBSU4sUUFBUSxDQUFDM0IsSUFBVCxDQUFjakYsUUFBZCxDQUF1QmdILFFBQXZCLENBQWdDLFNBQWhDLENBQUosRUFBZ0Q7QUFDckRoRixNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDcEUsZ0JBQWdCLENBQUNJLFVBQXZEO0FBQ0FzRCxNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJ1RSxpQkFBdkIsQ0FBeUNSLFFBQXpDLEVBQW1ELElBQW5EO0FBQ0FySSxNQUFBQSxFQUFFLENBQUMwSSxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCLEVBQXlDLEtBQXpDLEVBQWdELElBQWhELEVBQXNELEtBQXRELEVBQTZELEtBQTdELEVBQW9FLEtBQXBFO0FBQ0QsS0FKTSxNQUlBLElBQUlOLFFBQVEsQ0FBQzNCLElBQVQsQ0FBY2pGLFFBQWQsQ0FBdUJnSCxRQUF2QixDQUFnQyxtQkFBaEMsQ0FBSixFQUEwRDtBQUMvRGhGLE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NwRSxnQkFBZ0IsQ0FBQ0ksVUFBdkQ7QUFDQXNELE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QndFLGdCQUF2QixDQUF3Q1QsUUFBeEMsRUFBa0QsSUFBbEQ7QUFDQXJJLE1BQUFBLEVBQUUsQ0FBQzBJLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsS0FBekMsRUFBZ0QsS0FBaEQsRUFBdUQsSUFBdkQsRUFBNkQsS0FBN0QsRUFBb0UsS0FBcEU7QUFDRCxLQUpNLE1BSUEsSUFBSU4sUUFBUSxDQUFDM0IsSUFBVCxDQUFjakYsUUFBZCxDQUF1QmdILFFBQXZCLENBQWdDLGFBQWhDLENBQUosRUFBb0Q7QUFDekRoRixNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDcEUsZ0JBQWdCLENBQUNJLFVBQXZEO0FBQ0FzRCxNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJ5RSxlQUF2QixDQUF1Q1YsUUFBdkMsRUFBaUQsSUFBakQ7QUFDQXJJLE1BQUFBLEVBQUUsQ0FBQzBJLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsS0FBekMsRUFBZ0QsS0FBaEQsRUFBdUQsS0FBdkQsRUFBOEQsSUFBOUQsRUFBb0UsS0FBcEU7QUFDRCxLQUpNLE1BSUEsSUFBSU4sUUFBUSxDQUFDM0IsSUFBVCxDQUFjakYsUUFBZCxDQUF1QmdILFFBQXZCLENBQWdDLGlCQUFoQyxDQUFKLEVBQXdEO0FBQzdEaEYsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFzQ3BFLGdCQUFnQixDQUFDSSxVQUF2RDtBQUNBc0QsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCMEUsa0JBQXZCLENBQTBDWCxRQUExQyxFQUFvRCxJQUFwRDtBQUNBckksTUFBQUEsRUFBRSxDQUFDMEksV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxFQUF1RCxLQUF2RCxFQUE4RCxLQUE5RCxFQUFxRSxJQUFyRTtBQUNEO0FBQ0Y7QUF0WDBCLENBQVQsQ0FBcEIsRUF5WEE7O0FBQ0EsSUFBSXBELFdBQVcsR0FBR3ZGLEVBQUUsQ0FBQ1EsS0FBSCxDQUFTO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUUsYUFEbUI7QUFFekJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWNEksSUFBQUEsS0FBSyxFQUFFLEVBREc7QUFFVnpDLElBQUFBLElBQUksRUFBRTtBQUZJLEdBRmE7QUFNekI7QUFDQW5GLEVBQUFBLElBQUksRUFBRSxjQUFVeUQsTUFBVixFQUEyQkMsS0FBM0IsRUFBMkM7QUFBQSxRQUFqQ0QsTUFBaUM7QUFBakNBLE1BQUFBLE1BQWlDLEdBQXhCLE1BQXdCO0FBQUE7O0FBQUEsUUFBaEJDLEtBQWdCO0FBQWhCQSxNQUFBQSxLQUFnQixHQUFSLE1BQVE7QUFBQTs7QUFDL0MsU0FBS2tFLEtBQUwsR0FBYW5FLE1BQWI7QUFDQSxTQUFLMEIsSUFBTCxHQUFZekIsS0FBWjtBQUNEO0FBVndCLENBQVQsQ0FBbEIsRUFhQTs7QUFDQSxJQUFJbUUsSUFBSSxHQUFHdkosRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDbEJDLEVBQUFBLElBQUksRUFBRSxNQURZO0FBRWxCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVnVHLElBQUFBLFVBQVUsRUFBRSxFQURGO0FBRVZ1QyxJQUFBQSxHQUFHLEVBQUUsRUFGSztBQUdWbkMsSUFBQUEsU0FBUyxFQUFFLEVBSEQ7QUFJVjNFLElBQUFBLFdBQVcsRUFBRSxFQUpIO0FBS1ZDLElBQUFBLGFBQWEsRUFBRSxFQUxMO0FBTVZXLElBQUFBLFVBQVUsRUFBRSxFQU5GO0FBT1Z0QyxJQUFBQSxRQUFRLEVBQUUsRUFQQTtBQVFWeUksSUFBQUEsU0FBUyxFQUFFLENBUkQ7QUFTVkMsSUFBQUEsU0FBUyxFQUFFLEtBVEQ7QUFVVkMsSUFBQUEsU0FBUyxFQUFFLEVBVkQ7QUFXVi9JLElBQUFBLFVBQVUsRUFBRSxFQVhGO0FBWVZILElBQUFBLElBQUksRUFBRSxFQVpJO0FBYVZnQixJQUFBQSxRQUFRLEVBQUUsRUFiQTtBQWNWbUYsSUFBQUEsUUFBUSxFQUFFLEVBZEE7QUFlVkcsSUFBQUEsTUFBTSxFQUFFLEVBZkU7QUFnQlZvQyxJQUFBQSxTQUFTLEVBQUUsQ0FoQkQ7QUFpQlZySSxJQUFBQSxXQUFXLEVBQUUsRUFqQkg7QUFrQlZnRyxJQUFBQSxHQUFHLEVBQUUsRUFsQks7QUFtQlZILElBQUFBLEVBQUUsRUFBRSxFQW5CTTtBQW9CVkssSUFBQUEsU0FBUyxFQUFFLEVBcEJEO0FBcUJWNEMsSUFBQUEsRUFBRSxFQUFFLEVBckJNO0FBc0JWMUksSUFBQUEsY0FBYyxFQUFFLEVBdEJOO0FBdUJWSSxJQUFBQSxNQUFNLEVBQUUsRUF2QkU7QUF3QlY2QixJQUFBQSxPQUFPLEVBQUUsRUF4QkM7QUF5QlY1QixJQUFBQSxRQUFRLEVBQUUsRUF6QkE7QUEwQlYyRixJQUFBQSxZQUFZLEVBQUUsRUExQko7QUEyQlYxRixJQUFBQSxRQUFRLEVBQUUsRUEzQkE7QUE0QlZxRixJQUFBQSxJQUFJLEVBQUUsRUE1Qkk7QUE2QlZ5QyxJQUFBQSxLQUFLLEVBQUUsRUE3Qkc7QUE4QlZPLElBQUFBLFNBQVMsRUFBRTtBQTlCRDtBQUZNLENBQVQsQ0FBWCxFQW9DQTs7QUFDQSxJQUFJdkIsZ0JBQWdCLEdBQUd0SSxFQUFFLENBQUNRLEtBQUgsQ0FBUztBQUM5QkMsRUFBQUEsSUFBSSxFQUFFLGtCQUR3QjtBQUU5QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1Y2SCxJQUFBQSxVQUFVLEVBQUUsRUFERjtBQUVWQyxJQUFBQSxPQUFPLEVBQUUsRUFGQztBQUdWOUIsSUFBQUEsSUFBSSxFQUFFNkM7QUFISSxHQUZrQjtBQU85QjtBQUNBN0gsRUFBQUEsSUFBSSxFQUFFLGNBQVVvSSxXQUFWLEVBQWdDQyxRQUFoQyxFQUFtREMsS0FBbkQsRUFBaUU7QUFBQSxRQUF2REYsV0FBdUQ7QUFBdkRBLE1BQUFBLFdBQXVELEdBQXpDLE1BQXlDO0FBQUE7O0FBQUEsUUFBakNDLFFBQWlDO0FBQWpDQSxNQUFBQSxRQUFpQyxHQUF0QixNQUFzQjtBQUFBOztBQUFBLFFBQWRDLEtBQWM7QUFBZEEsTUFBQUEsS0FBYyxHQUFOLElBQU07QUFBQTs7QUFDckUsU0FBS3pCLFVBQUwsR0FBa0J1QixXQUFsQjtBQUNBLFNBQUt0QixPQUFMLEdBQWV1QixRQUFmO0FBQ0EsU0FBS3JELElBQUwsR0FBWXNELEtBQVo7QUFDRDtBQVo2QixDQUFULENBQXZCLEVBZUE7O0FBQ0EsSUFBSW5FLGdCQUFnQixHQUFHN0YsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDOUJDLEVBQUFBLElBQUksRUFBRSxrQkFEd0I7QUFFOUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWNEksSUFBQUEsS0FBSyxFQUFFLEVBREc7QUFFVjFDLElBQUFBLFFBQVEsRUFBRSxFQUZBO0FBR1ZDLElBQUFBLElBQUksRUFBRSxFQUhJO0FBSVZvRCxJQUFBQSxPQUFPLEVBQUU7QUFKQyxHQUZrQjtBQVE5QjtBQUNBdkksRUFBQUEsSUFBSSxFQUFFLGNBQVV5RCxNQUFWLEVBQTJCUyxTQUEzQixFQUErQ1IsS0FBL0MsRUFBK0Q4RSxRQUEvRCxFQUFrRjtBQUFBLFFBQXhFL0UsTUFBd0U7QUFBeEVBLE1BQUFBLE1BQXdFLEdBQS9ELE1BQStEO0FBQUE7O0FBQUEsUUFBdkRTLFNBQXVEO0FBQXZEQSxNQUFBQSxTQUF1RCxHQUEzQyxNQUEyQztBQUFBOztBQUFBLFFBQW5DUixLQUFtQztBQUFuQ0EsTUFBQUEsS0FBbUMsR0FBM0IsTUFBMkI7QUFBQTs7QUFBQSxRQUFuQjhFLFFBQW1CO0FBQW5CQSxNQUFBQSxRQUFtQixHQUFSLE1BQVE7QUFBQTs7QUFDdEYsU0FBS1osS0FBTCxHQUFhbkUsTUFBYjtBQUNBLFNBQUt5QixRQUFMLEdBQWdCaEIsU0FBaEI7QUFDQSxTQUFLaUIsSUFBTCxHQUFZekIsS0FBWjtBQUNBLFNBQUs2RSxPQUFMLEdBQWVDLFFBQWY7QUFDRDtBQWQ2QixDQUFULENBQXZCLEVBaUJBOztBQUNBLElBQUl6RCxxQkFBcUIsR0FBR3pHLEVBQUUsQ0FBQ1EsS0FBSCxDQUFTO0FBQ25DQyxFQUFBQSxJQUFJLEVBQUUsdUJBRDZCO0FBRW5DQyxFQUFBQSxVQUFVLEVBQUU7QUFDVjRJLElBQUFBLEtBQUssRUFBRSxFQURHO0FBRVYxQyxJQUFBQSxRQUFRLEVBQUUsRUFGQTtBQUdWbkcsSUFBQUEsSUFBSSxFQUFFLEVBSEk7QUFJVm9HLElBQUFBLElBQUksRUFBRSxFQUpJO0FBS1ZDLElBQUFBLEdBQUcsRUFBRSxFQUxLO0FBTVZsRyxJQUFBQSxVQUFVLEVBQUUsRUFORjtBQU9WRSxJQUFBQSxXQUFXLEVBQUUsRUFQSDtBQVFWaUcsSUFBQUEsTUFBTSxFQUFFLEVBUkU7QUFTVi9GLElBQUFBLFFBQVEsRUFBRSxFQVRBO0FBVVZnRyxJQUFBQSxTQUFTLEVBQUUsRUFWRDtBQVdWeEYsSUFBQUEsUUFBUSxFQUFFLEVBWEE7QUFZVk4sSUFBQUEsY0FBYyxFQUFFLEVBWk47QUFhVitGLElBQUFBLFVBQVUsRUFBRSxFQWJGO0FBY1ZrRCxJQUFBQSxVQUFVLEVBQUUsRUFkRjtBQWVWQyxJQUFBQSxTQUFTLEVBQUUsRUFmRDtBQWdCVmxELElBQUFBLFlBQVksRUFBRSxFQWhCSjtBQWlCVjVELElBQUFBLFVBQVUsRUFBRSxFQWpCRjtBQWtCVi9CLElBQUFBLFFBQVEsRUFBRTtBQWxCQSxHQUZ1QjtBQXNCbkM7QUFDQUcsRUFBQUEsSUFBSSxFQUFFLGNBQ0p5RCxNQURJLEVBRUpTLFNBRkksRUFHSmpFLEtBSEksRUFJSnlELEtBSkksRUFLSnhELElBTEksRUFNSkMsV0FOSSxFQU9KRSxZQVBJLEVBUUpzSSxPQVJJLEVBU0pwSSxTQVRJLEVBVUpxSSxVQVZJLEVBV0poSSxTQVhJLEVBWUpILGVBWkksRUFhSm9JLFdBYkksRUFjSkMsV0FkSSxFQWVKQyxVQWZJLEVBZ0JKQyxhQWhCSSxFQWlCSm5ILFdBakJJLEVBa0JKMEMsU0FsQkksRUFtQko7QUFBQSxRQWxCQWQsTUFrQkE7QUFsQkFBLE1BQUFBLE1Ba0JBLEdBbEJTLE1Ba0JUO0FBQUE7O0FBQUEsUUFqQkFTLFNBaUJBO0FBakJBQSxNQUFBQSxTQWlCQSxHQWpCWSxNQWlCWjtBQUFBOztBQUFBLFFBaEJBakUsS0FnQkE7QUFoQkFBLE1BQUFBLEtBZ0JBLEdBaEJRLEVBZ0JSO0FBQUE7O0FBQUEsUUFmQXlELEtBZUE7QUFmQUEsTUFBQUEsS0FlQSxHQWZRLE1BZVI7QUFBQTs7QUFBQSxRQWRBeEQsSUFjQTtBQWRBQSxNQUFBQSxJQWNBLEdBZE8sRUFjUDtBQUFBOztBQUFBLFFBYkFDLFdBYUE7QUFiQUEsTUFBQUEsV0FhQSxHQWJjLEVBYWQ7QUFBQTs7QUFBQSxRQVpBRSxZQVlBO0FBWkFBLE1BQUFBLFlBWUEsR0FaZSxFQVlmO0FBQUE7O0FBQUEsUUFYQXNJLE9BV0E7QUFYQUEsTUFBQUEsT0FXQSxHQVhVLEVBV1Y7QUFBQTs7QUFBQSxRQVZBcEksU0FVQTtBQVZBQSxNQUFBQSxTQVVBLEdBVlksRUFVWjtBQUFBOztBQUFBLFFBVEFxSSxVQVNBO0FBVEFBLE1BQUFBLFVBU0EsR0FUYSxFQVNiO0FBQUE7O0FBQUEsUUFSQWhJLFNBUUE7QUFSQUEsTUFBQUEsU0FRQSxHQVJZLEVBUVo7QUFBQTs7QUFBQSxRQVBBSCxlQU9BO0FBUEFBLE1BQUFBLGVBT0EsR0FQa0IsRUFPbEI7QUFBQTs7QUFBQSxRQU5Bb0ksV0FNQTtBQU5BQSxNQUFBQSxXQU1BLEdBTmMsRUFNZDtBQUFBOztBQUFBLFFBTEFDLFdBS0E7QUFMQUEsTUFBQUEsV0FLQSxHQUxjLEVBS2Q7QUFBQTs7QUFBQSxRQUpBQyxVQUlBO0FBSkFBLE1BQUFBLFVBSUEsR0FKYSxFQUliO0FBQUE7O0FBQUEsUUFIQUMsYUFHQTtBQUhBQSxNQUFBQSxhQUdBLEdBSGdCLEVBR2hCO0FBQUE7O0FBQUEsUUFGQW5ILFdBRUE7QUFGQUEsTUFBQUEsV0FFQSxHQUZjLEVBRWQ7QUFBQTs7QUFBQSxRQURBMEMsU0FDQTtBQURBQSxNQUFBQSxTQUNBLEdBRFksRUFDWjtBQUFBOztBQUNBLFNBQUtxRCxLQUFMLEdBQWFuRSxNQUFiO0FBQ0EsU0FBS3lCLFFBQUwsR0FBZ0JoQixTQUFoQjtBQUNBLFNBQUtuRixJQUFMLEdBQVlrQixLQUFaO0FBQ0EsU0FBS2tGLElBQUwsR0FBWXpCLEtBQVo7QUFDQSxTQUFLMEIsR0FBTCxHQUFXbEYsSUFBWDtBQUNBLFNBQUtoQixVQUFMLEdBQWtCaUIsV0FBbEI7QUFDQSxTQUFLZixXQUFMLEdBQW1CaUIsWUFBbkI7QUFDQSxTQUFLZ0YsTUFBTCxHQUFjc0QsT0FBZDtBQUNBLFNBQUtySixRQUFMLEdBQWdCaUIsU0FBaEI7QUFDQSxTQUFLK0UsU0FBTCxHQUFpQnNELFVBQWpCO0FBQ0EsU0FBSzlJLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS3BCLGNBQUwsR0FBc0JpQixlQUF0QjtBQUNBLFNBQUs4RSxVQUFMLEdBQWtCc0QsV0FBbEI7QUFDQSxTQUFLSixVQUFMLEdBQWtCSyxXQUFsQjtBQUNBLFNBQUtKLFNBQUwsR0FBaUJLLFVBQWpCO0FBQ0EsU0FBS3ZELFlBQUwsR0FBb0J3RCxhQUFwQjtBQUNBLFNBQUtwSCxVQUFMLEdBQWtCQyxXQUFsQjtBQUNBLFNBQUtoQyxRQUFMLEdBQWdCMEUsU0FBaEI7QUFDRDtBQTdEa0MsQ0FBVCxDQUE1QjtBQWdFQTBFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5ILGFBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUmVzcG9uc2VUeXBlRW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgU3VjY2Vzc2Z1bDogMSxcclxuICBVc2VyTm90Rm91bmQ6IDIsXHJcbiAgSW52YWxpZEVtYWlsUGFzc3dvcmQ6IDMsXHJcbiAgV2VudFdyb25nOiA0LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0dWRlbnQgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3R1ZGVudCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlN0dWRlbnRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgZE9COiBcIlwiLFxyXG4gICAgZ3JhZGVMZXZlbDogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgZmFjZWJvb2tQYWdlOiBcIlwiLFxyXG4gICAgZ2FtZXNXb246IDAsXHJcbiAgICB0ZXN0c1Rha2VuOiAwLFxyXG4gICAgdGVzdGluZ0F2ZXJhZ2U6IDAsXHJcbiAgICBnYW1lQ2FzaDogMCxcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9kb2IgPSBcIm5vbmVcIiwgX2dyYWRlTGV2ZWwgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfdGVhY2hlck5hbWUgPSBcIm5vbmVcIiwgX2ZhY2Vib29rUGFnZSA9IFwibm9uZVwiLCBfZ2FtZXNXb24gPSAwLCBfdGVzdHNUYWtlbiA9IDAsIF90ZXN0aW5nQXZlcmFnZSA9IDAsIF9nYW1lQ2FzaCA9IDAsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5kT0IgPSBfZG9iO1xyXG4gICAgdGhpcy5ncmFkZUxldmVsID0gX2dyYWRlTGV2ZWw7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLnRlYWNoZXJOYW1lID0gX3RlYWNoZXJOYW1lO1xyXG4gICAgdGhpcy5mYWNlYm9va1BhZ2UgPSBfZmFjZWJvb2tQYWdlO1xyXG4gICAgdGhpcy5nYW1lc1dvbiA9IF9nYW1lc1dvbjtcclxuICAgIHRoaXMudGVzdHNUYWtlbiA9IF90ZXN0c1Rha2VuO1xyXG4gICAgdGhpcy50ZXN0aW5nQXZlcmFnZSA9IF90ZXN0aW5nQXZlcmFnZTtcclxuICAgIHRoaXMuZ2FtZUNhc2ggPSBfZ2FtZUNhc2g7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklkO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMucm9sZVR5cGUgPSBfcm9sZVR5cGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVGVhY2hlciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFRlYWNoZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUZWFjaGVyXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHNjaG9vbDogXCJcIixcclxuICAgIGNsYXNzVGF1Z2h0OiAwLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX3NjaG9vbCA9IFwibm9uZVwiLCBfY2xhc3NUYXVnaHQgPSAwLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnNjaG9vbCA9IF9zY2hvb2w7XHJcbiAgICB0aGlzLmNsYXNzVGF1Z2h0ID0gX2NsYXNzVGF1Z2h0O1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2dyYW0gQW1iYXNzYWRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBQcm9ncmFtQW1iYXNzYWRvcnMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQcm9ncmFtQW1iYXNzYWRvcnNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgIGFkZHJlc3M6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZnVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX2NvbnRhY3ROdW1iZXIgPSBcIm5vbmVcIiwgX2FkZHJlc3MgPSBcIm5vbmVcIiwgX2FjY2Vzc1Rva2VuID0gXCJcIiwgX3VwZGF0ZWRBdCA9IDAsIF91c2VySUQgPSBcIlwiLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5hZGRyZXNzID0gX2FkZHJlc3M7XHJcbiAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNjaG9vbCBBZG1pbmlzdHJhdG9ycyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFNjaG9vbEFkbWluaXN0cmF0b3JzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2Nob29sQWRtaW5pc3RyYXRvcnNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgc2Nob29sTmFtZTogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9zY2hvb2xOYW1lID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX2NvbnRhY3ROdW1iZXIgPSBcIm5vbmVcIiwgX2FjY2Vzc1Rva2VuID0gXCJcIiwgX3VwZGF0ZWRBdCA9IDAsIF91c2VySUQgPSBcIlwiLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuc2Nob29sTmFtZSA9IF9zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2dyYW0gRGlyZWN0b3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgUHJvZ3JhbURpcmVjdG9ycyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlByb2dyYW1EaXJlY3RvcnNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNlcnZlckJhY2tlbmQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlcnZlckJhY2tlbmQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZXJ2ZXJCYWNrZW5kXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFN0dWRlbnREYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFN0dWRlbnQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBzdHVkZW50IGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBUZWFjaGVyRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBUZWFjaGVyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gdGVhY2hlciBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgTWVudG9yRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQcm9ncmFtQW1iYXNzYWRvcnMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBNZW50b3IgLyBQcm9ncmFtQW1iYXNzYWRvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBBZG1pbkRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogU2Nob29sQWRtaW5pc3RyYXRvcnMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBTY2hvb2xBZG1pbmlzdHJhdG9ycyAgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIERpcmVjdG9yRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQcm9ncmFtRGlyZWN0b3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gUHJvZ3JhbURpcmVjdG9ycyAgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3BvbnNlVHlwZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXNwb25zZVwiLFxyXG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGVFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBSZXNwb25zZVR5cGVFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZXNwb25zZVR5cGUgY2F0b2dvcnkgZm9yIGFwaSdzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVtb3ZlUGVyc2lzdE5vZGUoKSB7XHJcbiAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlID0gbnVsbDtcclxuICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgaWYgKCFTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICB0aGlzLlN0dWRlbnREYXRhID0gbmV3IFN0dWRlbnQoKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcImNyZWF0aW5nIGluc3RhbmNlIFwiICsgdGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcHJpdmF0ZSB2YXJpYWJsZXNcclxuICAgIHRoaXMuZ2V0VXNlckFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi9nZXRVc2VyXCI7XHJcbiAgICB0aGlzLmxvZ2luVXNlckFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi9sb2dpblVzZXJcIjtcclxuICAgIHRoaXMuVXBkYXRlVXNlckRhdGFBUEkgPSBcImh0dHBzOi8vaWEzbnFrcDZ0aC5leGVjdXRlLWFwaS51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9kZXYvdXBkYXRlVXNlclwiO1xyXG5cclxuICAgIC8vIHRoaXMuR2V0VXNlckRhdGEoXCJ4dHJvbmRldkBnbWFpbC5jb21cIixcIlN0dWRlbnRcIik7XHJcbiAgfSxcclxuXHJcbiAgR2V0VXNlckRhdGEoX2VtYWlsLCBfcm9sZSwgX2FjY2Vzc1Rva2VuLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICB2YXIgcGF5bG9hZCA9IG5ldyBVc2VyUGF5bG9hZChfZW1haWwsIF9yb2xlKTtcclxuICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfYWNjZXNzVG9rZW4gfTtcclxuICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5nZXRVc2VyQVBJLCBcIlBPU1RcIiwgcGF5bG9hZCwgMSwgaGVhZGVyLCBfc3ViVHlwZSk7XHJcbiAgfSxcclxuXHJcbiAgTG9naW5Vc2VyKF9lbWFpbCwgX3Bhc3N3b3JkLCBfcm9sZSkge1xyXG4gICAgdmFyIHBheWxvYWQgPSBuZXcgVXNlckxvZ2luUGF5bG9hZChfZW1haWwsIF9wYXNzd29yZCwgX3JvbGUsIFwiNzliZTY4MjQtZmFlNy00MGNmLTgxNmYtYWUwYmUxYWIxZmY0XCIpO1xyXG4gICAgdGhpcy5DYWxsUkVTVEFQSSh0aGlzLmxvZ2luVXNlckFQSSwgXCJQT1NUXCIsIHBheWxvYWQsIDIsIG51bGwsIC0xKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVVc2VyRGF0YShfY2FzaCA9IC0xLCBfZ2FtZVdvbiA9IC0xLCBfYXZhdGFySUQgPSAtMSkge1xyXG4gICAgdmFyIF9tYWluRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG5cclxuICAgIGlmIChfbWFpbkRhdGEgIT0gbnVsbCkge1xyXG4gICAgICB2YXIgU2VuZGluZ1BheWxvYWQgPSBuZXcgVXNlckRhdGFVcGRhdGVQYXlsb2FkKFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLlNLLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLnBhc3N3b3JkLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLm5hbWUsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEucm9sZSxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5kb0IsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuZ3JhZGVMZXZlbCxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS50ZWFjaGVyTmFtZSxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5mYlBhZ2UsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuZ2FtZXNXb24sXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEudGVzdFRha2VuLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLmRpc3RyaWN0LFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLnRlc3RpbmdBdmVyYWdlLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLmluR2FtZUNhc2gsXHJcbiAgICAgICAgXCJtdWJlZW5hbGlAZ21haWwuY29tXCIsXHJcbiAgICAgICAgXCJTY2hvb2xBZG1pblwiLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLmFkZGVkQnlFbWFpbCxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5zY2hvb2xOYW1lLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLmF2YXRhcklkXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoX2Nhc2ggIT0gLTEpIHtcclxuICAgICAgICBTZW5kaW5nUGF5bG9hZC5pbkdhbWVDYXNoID0gX2Nhc2g7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKF9nYW1lV29uICE9IC0xKSB7XHJcbiAgICAgICAgU2VuZGluZ1BheWxvYWQuZ2FtZXNXb24gPSBfZ2FtZVdvbjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoX2F2YXRhcklEICE9IC0xKSB7XHJcbiAgICAgICAgU2VuZGluZ1BheWxvYWQuYXZhdGFySWQgPSBfYXZhdGFySUQudG9TdHJpbmcoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coU2VuZGluZ1BheWxvYWQpO1xyXG4gICAgICB2YXIgcGF5bG9hZCA9IFNlbmRpbmdQYXlsb2FkO1xyXG4gICAgICB2YXIgaGVhZGVyID0geyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiwgQXV0aG9yaXphdGlvbjogX21haW5EYXRhLmRhdGEudXNlclRva2VuIH07XHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5VcGRhdGVVc2VyRGF0YUFQSSwgXCJQVVRcIiwgcGF5bG9hZCwgMywgaGVhZGVyLCAtMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiY2Fubm90IHVwZGF0ZSBkYXRhIGFzIHN0b3JlZCBkYXRhIGlzIG51bGxcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRmV0Y2goX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyA9IG51bGwpIHtcclxuICAgIGlmIChfbWV0aG9kID09IFwiR0VUXCIpIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJoZWFkZXIgaXMgbnVsbFwiKTtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoX3JlcXVlc3RCb2R5KTtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogX2hlYWRlcnMsXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FsbFJFU1RBUEkoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfdHlwZSwgX2hlYWRlcnMgPSBudWxsLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICBGZXRjaF9Qcm9taXNlKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMpO1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gRmV0Y2hfUHJvbWlzZShfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzID0gbnVsbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciBSZXNwb25zZSA9IGF3YWl0IFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuRmV0Y2goX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICAgICAgdmFyIFRlbXBEYXRhID0gYXdhaXQgUmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAoX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgLy9nZXR0aW5nIHVzZXIgZGF0YVxyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgICBpZiAoX3N1YlR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAvL3JldHVybiBkYXRhIHRvIHN0b3JhZ2UgY2xhc3NcclxuICAgICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJTVUNDRVNTXCIpIHx8IE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IGRhdGEgc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgLy9ib3RoIGJlbG93IGNhbGxzIGFyZSB3cml0dGVuIGluc2lkZSBzdG9yZ2FlbWFuYWdlclxyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJXcml0ZURhdGFcIiwgTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJSZWZyZXNoRGF0YVwiLCAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiUmVmcmVzaERhdGFcIiwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDIpIHtcclxuICAgICAgICAgIC8vbG9naW4gdXNlclxyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgICBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcInN1Y2Vzc2Z1bGx5XCIpKSB7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJXcml0ZURhdGFcIiwgTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJUZWFjaGVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25UZWFjaGVyRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbUFtYmFzc2Fkb3JcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbk1lbnRvckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1EaXJlY3RvclwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduRGlyZWN0b3JEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJ3cm9uZ1wiKSB8fCBNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiY2hhcmFjdGVyc1wiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uSW52YWxpZEVtYWlsUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIkRhdGEgbm90IEZvdW5kIVwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uVXNlck5vdEZvdW5kO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJQYXNzd29yZCBzaG91bGQgY29udGFpbiBhdGxlYXN0IG9uZSBJbnRlZ2VyXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5JbnZhbGlkRW1haWxQYXNzd29yZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMykge1xyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKF90eXBlID09IDIpIHtcclxuICAgICAgICAgIC8vbG9naW4gdXNlciBlcnJvclxyXG4gICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLldlbnRXcm9uZztcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAvLyAgY29uc29sZS5sb2coJ1dlIGRvIGNsZWFudXAgaGVyZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyNyZWdpb24gQ29tbWVudGVkXHJcbiAgICAvLyBmZXRjaChcclxuICAgIC8vICAgICBfdXJsLFxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgLy8gICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAvLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KF9yZXF1ZXN0Qm9keSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIClcclxuICAgIC8vICAgLnRoZW4ocmVzcG9uc2U9PntcclxuICAgIC8vICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGRhdGE9PntcclxuICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIC8vICAgICAgICAgLy9yZXR1cm4gZGF0YTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfSlcclxuICAgIC8vICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgfSxcclxuXHJcbiAgQXNzaWduU3R1ZGVudERhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5kT0IgPSBEYXRhUmVzcG9uc2UuZGF0YS5kb0I7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmdyYWRlTGV2ZWwgPSBEYXRhUmVzcG9uc2UuZGF0YS5ncmFkZUxldmVsO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudGVhY2hlck5hbWUgPSBEYXRhUmVzcG9uc2UuZGF0YS50ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZmFjZWJvb2tQYWdlID0gRGF0YVJlc3BvbnNlLmRhdGEuZmJQYWdlO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IERhdGFSZXNwb25zZS5kYXRhLmdhbWVzV29uO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS50ZXN0c1Rha2VuID0gRGF0YVJlc3BvbnNlLmRhdGEudGVzdFRha2VuO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS50ZXN0aW5nQXZlcmFnZSA9IERhdGFSZXNwb25zZS5kYXRhLnRlc3RpbmdBdmVyYWdlO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IERhdGFSZXNwb25zZS5kYXRhLmluR2FtZUNhc2g7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJJRDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuZGF0YS5hdmF0YXJJZDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGF0YS5kaXN0cmljdDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2UuZGF0YS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLlN0dWRlbnREYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLmRhdGEudXNlclRva2VuO1xyXG4gICAgICB0aGlzLlN0dWRlbnREYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlN0dWRlbnREYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25UZWFjaGVyRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5kYXRhLm5hbWU7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLnNjaG9vbCA9IERhdGFSZXNwb25zZS5kYXRhLnNjaG9vbE5hbWU7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmNsYXNzVGF1Z2h0ID0gRGF0YVJlc3BvbnNlLmRhdGEuY2xhc3NUYXVnaHQ7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5kYXRhLlNLO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5jb250YWN0TnVtYmVyID0gRGF0YVJlc3BvbnNlLmRhdGEuY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLmRhdGEudXNlcklEO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5kYXRhLmF2YXRhcklkO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kYXRhLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5kYXRhLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuVGVhY2hlckRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuVGVhY2hlckRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLmRhdGEudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuVGVhY2hlckRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbk1lbnRvckRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5kYXRhLm5hbWU7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLmRhdGEuU0s7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5kYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLmRhdGEudXNlcklEO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuZGF0YS5hZGRyZXNzO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmRhdGEuYXZhdGFySWQ7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGF0YS5kaXN0cmljdDtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5kYXRhLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuTWVudG9yRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5NZW50b3JEYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLk1lbnRvckRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkFkbWluRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuQWRtaW5EYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLmRhdGEuU0s7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5jb250YWN0TnVtYmVyID0gRGF0YVJlc3BvbnNlLmRhdGEuY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuQWRtaW5EYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJJRDtcclxuICAgIHRoaXMuQWRtaW5EYXRhLnNjaG9vbE5hbWUgPSBEYXRhUmVzcG9uc2UuZGF0YS5zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuZGF0YS5hdmF0YXJJZDtcclxuICAgIHRoaXMuQWRtaW5EYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRhdGEuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5kYXRhLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuQWRtaW5EYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLmRhdGEudXNlclRva2VuO1xyXG4gICAgICB0aGlzLkFkbWluRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UuZGF0YS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5BZG1pbkRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRpcmVjdG9yRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLmRhdGEuU0s7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5kYXRhLmF2YXRhcklkO1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGF0YS5kaXN0cmljdDtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLmRhdGEucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5EaXJlY3RvckRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLkRpcmVjdG9yRGF0YSk7XHJcbiAgfSxcclxuICBzdGFydCgpIHt9LFxyXG5cclxuICBSZWxvZ2luRnJvbVN0b3JhZ2UoTWFpbkRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidXNlciBsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5IGF1dG9tYXRpY2FsbHlcIik7XHJcbiAgICBjb25zb2xlLmxvZyhNYWluRGF0YSk7XHJcbiAgICBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduU3R1ZGVudERhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiVGVhY2hlclwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25UZWFjaGVyRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtQW1iYXNzYWRvclwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25NZW50b3JEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbkFkbWluRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtRGlyZWN0b3JcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduRGlyZWN0b3JEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBzZW5kaW5nIHBheWxvYWQgdG8gcmVjZWl2ZSBkYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJQYXlsb2FkXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9lbWFpbCA9IFwibm9uZVwiLCBfcm9sZSA9IFwibm9uZVwiKSB7XHJcbiAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgdGhpcy5yb2xlID0gX3JvbGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVXNlciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiRGF0YVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGluR2FtZUNhc2g6IFwiXCIsXHJcbiAgICBMU0s6IFwiXCIsXHJcbiAgICB1c2VyVG9rZW46IFwiXCIsXHJcbiAgICBjbGFzc1RhdWdodDogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBzY2hvb2xOYW1lOiBcIlwiLFxyXG4gICAgZ2FtZXNXb246IFwiXCIsXHJcbiAgICBjcmVhdGVkQXQ6IDAsXHJcbiAgICBpc0RlbGV0ZWQ6IGZhbHNlLFxyXG4gICAgVGFibGVOYW1lOiBcIlwiLFxyXG4gICAgZ3JhZGVMZXZlbDogXCJcIixcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgZmJQYWdlOiBcIlwiLFxyXG4gICAgdXBkYXRlZEF0OiAwLFxyXG4gICAgdGVhY2hlck5hbWU6IFwiXCIsXHJcbiAgICBkb0I6IFwiXCIsXHJcbiAgICBTSzogXCJcIixcclxuICAgIHRlc3RUYWtlbjogXCJcIixcclxuICAgIFBLOiBcIlwiLFxyXG4gICAgdGVzdGluZ0F2ZXJhZ2U6IFwiXCIsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBhZGRlZEJ5RW1haWw6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIFVuaXF1ZUtleTogXCJcIixcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXJvb3QgY2xhc3Mgb2YgcmVzcG9uc2UgcmVjZWl2ZWQgd2hlbiBnZXR0aW5nIHVzZXIgYXBpIGlzIGhpdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckRhdGFSZXNwb25zZSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJEYXRhUmVzcG9uc2VcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBzdGF0dXNDb2RlOiBcIlwiLFxyXG4gICAgbWVzc2FnZTogXCJcIixcclxuICAgIGRhdGE6IERhdGEsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX3N0YXR1c0NvZGUgPSBcIm5vbmVcIiwgX21lc3NhZ2UgPSBcIm5vbmVcIiwgX2RhdGEgPSBudWxsKSB7XHJcbiAgICB0aGlzLnN0YXR1c0NvZGUgPSBfc3RhdHVzQ29kZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IF9tZXNzYWdlO1xyXG4gICAgdGhpcy5kYXRhID0gX2RhdGE7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3Igc2VuZGluZyBwYXlsb2FkIHRvIGxvZ2luIHVzZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJMb2dpblBheWxvYWQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyTG9naW5QYXlsb2FkXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICBwYXNzd29yZDogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgICBsaWNlbnNlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9lbWFpbCA9IFwibm9uZVwiLCBfcGFzc3dvcmQgPSBcIm5vbmVcIiwgX3JvbGUgPSBcIm5vbmVcIiwgX2xpY2Vuc2UgPSBcIm5vbmVcIikge1xyXG4gICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBfcGFzc3dvcmQ7XHJcbiAgICB0aGlzLnJvbGUgPSBfcm9sZTtcclxuICAgIHRoaXMubGljZW5zZSA9IF9saWNlbnNlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFVzZXJEYXRhVXBkYXRlUGF5bG9hZC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckRhdGFVcGRhdGVQYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlckRhdGFVcGRhdGVQYXlsb2FkXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICBwYXNzd29yZDogXCJcIixcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gICAgZG9COiBcIlwiLFxyXG4gICAgZ3JhZGVMZXZlbDogXCJcIixcclxuICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgZmJQYWdlOiBcIlwiLFxyXG4gICAgZ2FtZXNXb246IFwiXCIsXHJcbiAgICB0ZXN0VGFrZW46IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHRlc3RpbmdBdmVyYWdlOiBcIlwiLFxyXG4gICAgaW5HYW1lQ2FzaDogXCJcIixcclxuICAgIGFkbWluRW1haWw6IFwiXCIsXHJcbiAgICBhZG1pblJvbGU6IFwiXCIsXHJcbiAgICBhZGRlZEJ5RW1haWw6IFwiXCIsXHJcbiAgICBzY2hvb2xOYW1lOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoXHJcbiAgICBfZW1haWwgPSBcIm5vbmVcIixcclxuICAgIF9wYXNzd29yZCA9IFwibm9uZVwiLFxyXG4gICAgX25hbWUgPSBcIlwiLFxyXG4gICAgX3JvbGUgPSBcIm5vbmVcIixcclxuICAgIF9kb2IgPSBcIlwiLFxyXG4gICAgX2dyYWRlTGV2ZWwgPSBcIlwiLFxyXG4gICAgX3RlYWNoZXJOYW1lID0gXCJcIixcclxuICAgIF9mYlBhZ2UgPSBcIlwiLFxyXG4gICAgX2dhbWVzV29uID0gXCJcIixcclxuICAgIF90ZXN0VGFrZW4gPSBcIlwiLFxyXG4gICAgX2Rpc3RyaWN0ID0gXCJcIixcclxuICAgIF90ZXN0aW5nQXZlcmFnZSA9IFwiXCIsXHJcbiAgICBfaW5HYW1lQ2FzaCA9IFwiXCIsXHJcbiAgICBfYWRtaW5FbWFpbCA9IFwiXCIsXHJcbiAgICBfYWRtaW5Sb2xlID0gXCJcIixcclxuICAgIF9hZGRlZEJ5RW1haWwgPSBcIlwiLFxyXG4gICAgX3NjaG9vbE5hbWUgPSBcIlwiLFxyXG4gICAgX2F2YXRhcklEID0gXCJcIlxyXG4gICkge1xyXG4gICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBfcGFzc3dvcmQ7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMucm9sZSA9IF9yb2xlO1xyXG4gICAgdGhpcy5kb0IgPSBfZG9iO1xyXG4gICAgdGhpcy5ncmFkZUxldmVsID0gX2dyYWRlTGV2ZWw7XHJcbiAgICB0aGlzLnRlYWNoZXJOYW1lID0gX3RlYWNoZXJOYW1lO1xyXG4gICAgdGhpcy5mYlBhZ2UgPSBfZmJQYWdlO1xyXG4gICAgdGhpcy5nYW1lc1dvbiA9IF9nYW1lc1dvbjtcclxuICAgIHRoaXMudGVzdFRha2VuID0gX3Rlc3RUYWtlbjtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnRlc3RpbmdBdmVyYWdlID0gX3Rlc3RpbmdBdmVyYWdlO1xyXG4gICAgdGhpcy5pbkdhbWVDYXNoID0gX2luR2FtZUNhc2g7XHJcbiAgICB0aGlzLmFkbWluRW1haWwgPSBfYWRtaW5FbWFpbDtcclxuICAgIHRoaXMuYWRtaW5Sb2xlID0gX2FkbWluUm9sZTtcclxuICAgIHRoaXMuYWRkZWRCeUVtYWlsID0gX2FkZGVkQnlFbWFpbDtcclxuICAgIHRoaXMuc2Nob29sTmFtZSA9IF9zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJRDtcclxuICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2VydmVyQmFja2VuZDtcclxuIl19