
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
    var payload = new UserLoginPayload(_email, _password, _role, "UCK2SR4YMG7J");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlVHlwZUVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiU3VjY2Vzc2Z1bCIsIlVzZXJOb3RGb3VuZCIsIkludmFsaWRFbWFpbFBhc3N3b3JkIiwiV2VudFdyb25nIiwiU3R1ZGVudCIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJkT0IiLCJncmFkZUxldmVsIiwiZW1haWxBZGRyZXNzIiwidGVhY2hlck5hbWUiLCJmYWNlYm9va1BhZ2UiLCJnYW1lc1dvbiIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiQWNjZXNzVG9rZW4iLCJVcGRhdGVkQXQiLCJ1c2VySUQiLCJhdmF0YXJJZCIsImRpc3RyaWN0Iiwicm9sZVR5cGUiLCJjdG9yIiwiX25hbWUiLCJfZG9iIiwiX2dyYWRlTGV2ZWwiLCJfZW1haWxBZGRyZXNzIiwiX3RlYWNoZXJOYW1lIiwiX2ZhY2Vib29rUGFnZSIsIl9nYW1lc1dvbiIsIl90ZXN0c1Rha2VuIiwiX3Rlc3RpbmdBdmVyYWdlIiwiX2dhbWVDYXNoIiwiX2F2YXRhcklkIiwiX2Rpc3RyaWN0IiwiX3JvbGVUeXBlIiwiVGVhY2hlciIsInNjaG9vbCIsImNsYXNzVGF1Z2h0IiwiY29udGFjdE51bWJlciIsIl9zY2hvb2wiLCJfY2xhc3NUYXVnaHQiLCJfY29udGFjdE51bWJlciIsIl9hY2Nlc3NUb2tlbiIsIl91cGRhdGVkQXQiLCJfdXNlcklEIiwiUHJvZ3JhbUFtYmFzc2Fkb3JzIiwiYWRkcmVzcyIsIl9hZGRyZXNzIiwiU2Nob29sQWRtaW5pc3RyYXRvcnMiLCJzY2hvb2xOYW1lIiwiX3NjaG9vbE5hbWUiLCJQcm9ncmFtRGlyZWN0b3JzIiwiU2VydmVyQmFja2VuZCIsIkNvbXBvbmVudCIsIlN0dWRlbnREYXRhIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJUZWFjaGVyRGF0YSIsIk1lbnRvckRhdGEiLCJBZG1pbkRhdGEiLCJEaXJlY3RvckRhdGEiLCJSZXNwb25zZVR5cGUiLCJkaXNwbGF5TmFtZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiZ2FtZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJvbkxvYWQiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJjb25zb2xlIiwiZXJyb3IiLCJnZXRVc2VyQVBJIiwibG9naW5Vc2VyQVBJIiwiVXBkYXRlVXNlckRhdGFBUEkiLCJHZXRVc2VyRGF0YSIsIl9lbWFpbCIsIl9yb2xlIiwiX3N1YlR5cGUiLCJwYXlsb2FkIiwiVXNlclBheWxvYWQiLCJoZWFkZXIiLCJBdXRob3JpemF0aW9uIiwiQ2FsbFJFU1RBUEkiLCJMb2dpblVzZXIiLCJfcGFzc3dvcmQiLCJVc2VyTG9naW5QYXlsb2FkIiwiVXBkYXRlVXNlckRhdGEiLCJfY2FzaCIsIl9nYW1lV29uIiwiX2F2YXRhcklEIiwiX21haW5EYXRhIiwiSlNPTiIsInBhcnNlIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIlNlbmRpbmdQYXlsb2FkIiwiVXNlckRhdGFVcGRhdGVQYXlsb2FkIiwiZGF0YSIsIlNLIiwicGFzc3dvcmQiLCJyb2xlIiwiZG9CIiwiZmJQYWdlIiwidGVzdFRha2VuIiwiaW5HYW1lQ2FzaCIsImFkZGVkQnlFbWFpbCIsInRvU3RyaW5nIiwibG9nIiwidXNlclRva2VuIiwiRmV0Y2giLCJfdXJsIiwiX21ldGhvZCIsIl9yZXF1ZXN0Qm9keSIsIl9oZWFkZXJzIiwiZmV0Y2giLCJoZWFkZXJzIiwibWV0aG9kIiwiYm9keSIsInN0cmluZ2lmeSIsIl90eXBlIiwiRmV0Y2hfUHJvbWlzZSIsIlJlc3BvbnNlIiwianNvbiIsIlRlbXBEYXRhIiwiTWFpbkRhdGEiLCJVc2VyRGF0YVJlc3BvbnNlIiwic3RhdHVzQ29kZSIsIm1lc3NhZ2UiLCJpbmNsdWRlcyIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIkFzc2lnblN0dWRlbnREYXRhIiwiQXNzaWduVGVhY2hlckRhdGEiLCJBc3NpZ25NZW50b3JEYXRhIiwiQXNzaWduQWRtaW5EYXRhIiwiQXNzaWduRGlyZWN0b3JEYXRhIiwiRGF0YVJlc3BvbnNlIiwiaXNMb2dnZWRJbiIsInVwZGF0ZWRBdCIsInN0YXJ0IiwiUmVsb2dpbkZyb21TdG9yYWdlIiwiZW1haWwiLCJEYXRhIiwiTFNLIiwiY3JlYXRlZEF0IiwiaXNEZWxldGVkIiwiVGFibGVOYW1lIiwiUEsiLCJVbmlxdWVLZXkiLCJfc3RhdHVzQ29kZSIsIl9tZXNzYWdlIiwiX2RhdGEiLCJsaWNlbnNlIiwiX2xpY2Vuc2UiLCJhZG1pbkVtYWlsIiwiYWRtaW5Sb2xlIiwiX2ZiUGFnZSIsIl90ZXN0VGFrZW4iLCJfaW5HYW1lQ2FzaCIsIl9hZG1pbkVtYWlsIiwiX2FkbWluUm9sZSIsIl9hZGRlZEJ5RW1haWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUM3QkMsRUFBQUEsSUFBSSxFQUFFLENBRHVCO0FBRTdCQyxFQUFBQSxVQUFVLEVBQUUsQ0FGaUI7QUFHN0JDLEVBQUFBLFlBQVksRUFBRSxDQUhlO0FBSTdCQyxFQUFBQSxvQkFBb0IsRUFBRSxDQUpPO0FBSzdCQyxFQUFBQSxTQUFTLEVBQUU7QUFMa0IsQ0FBUixDQUF2QixFQU9BOztBQUNBLElBQUlDLE9BQU8sR0FBR1AsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxTQURlO0FBRXJCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkQsSUFBQUEsSUFBSSxFQUFFLEVBREk7QUFFVkUsSUFBQUEsR0FBRyxFQUFFLEVBRks7QUFHVkMsSUFBQUEsVUFBVSxFQUFFLEVBSEY7QUFJVkMsSUFBQUEsWUFBWSxFQUFFLEVBSko7QUFLVkMsSUFBQUEsV0FBVyxFQUFFLEVBTEg7QUFNVkMsSUFBQUEsWUFBWSxFQUFFLEVB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REFBLE1BQUFBLFNBQ0EsR0FEWSxFQUNaO0FBQUE7O0FBQ0EsU0FBS3FELEtBQUwsR0FBYW5FLE1BQWI7QUFDQSxTQUFLeUIsUUFBTCxHQUFnQmhCLFNBQWhCO0FBQ0EsU0FBS25GLElBQUwsR0FBWWtCLEtBQVo7QUFDQSxTQUFLa0YsSUFBTCxHQUFZekIsS0FBWjtBQUNBLFNBQUswQixHQUFMLEdBQVdsRixJQUFYO0FBQ0EsU0FBS2hCLFVBQUwsR0FBa0JpQixXQUFsQjtBQUNBLFNBQUtmLFdBQUwsR0FBbUJpQixZQUFuQjtBQUNBLFNBQUtnRixNQUFMLEdBQWNzRCxPQUFkO0FBQ0EsU0FBS3JKLFFBQUwsR0FBZ0JpQixTQUFoQjtBQUNBLFNBQUsrRSxTQUFMLEdBQWlCc0QsVUFBakI7QUFDQSxTQUFLOUksUUFBTCxHQUFnQmMsU0FBaEI7QUFDQSxTQUFLcEIsY0FBTCxHQUFzQmlCLGVBQXRCO0FBQ0EsU0FBSzhFLFVBQUwsR0FBa0JzRCxXQUFsQjtBQUNBLFNBQUtKLFVBQUwsR0FBa0JLLFdBQWxCO0FBQ0EsU0FBS0osU0FBTCxHQUFpQkssVUFBakI7QUFDQSxTQUFLdkQsWUFBTCxHQUFvQndELGFBQXBCO0FBQ0EsU0FBS3BILFVBQUwsR0FBa0JDLFdBQWxCO0FBQ0EsU0FBS2hDLFFBQUwsR0FBZ0IwRSxTQUFoQjtBQUNEO0FBN0RrQyxDQUFULENBQTVCO0FBZ0VBMEUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbkgsYUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciB0eXBlIG9mIGJ1c2luZXNzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSZXNwb25zZVR5cGVFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdWNjZXNzZnVsOiAxLFxyXG4gIFVzZXJOb3RGb3VuZDogMixcclxuICBJbnZhbGlkRW1haWxQYXNzd29yZDogMyxcclxuICBXZW50V3Jvbmc6IDQsXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3R1ZGVudCBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdHVkZW50ID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3R1ZGVudFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBkT0I6IFwiXCIsXHJcbiAgICBncmFkZUxldmVsOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgdGVhY2hlck5hbWU6IFwiXCIsXHJcbiAgICBmYWNlYm9va1BhZ2U6IFwiXCIsXHJcbiAgICBnYW1lc1dvbjogMCxcclxuICAgIHRlc3RzVGFrZW46IDAsXHJcbiAgICB0ZXN0aW5nQXZlcmFnZTogMCxcclxuICAgIGdhbWVDYXNoOiAwLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX2RvYiA9IFwibm9uZVwiLCBfZ3JhZGVMZXZlbCA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF90ZWFjaGVyTmFtZSA9IFwibm9uZVwiLCBfZmFjZWJvb2tQYWdlID0gXCJub25lXCIsIF9nYW1lc1dvbiA9IDAsIF90ZXN0c1Rha2VuID0gMCwgX3Rlc3RpbmdBdmVyYWdlID0gMCwgX2dhbWVDYXNoID0gMCwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLmRPQiA9IF9kb2I7XHJcbiAgICB0aGlzLmdyYWRlTGV2ZWwgPSBfZ3JhZGVMZXZlbDtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMudGVhY2hlck5hbWUgPSBfdGVhY2hlck5hbWU7XHJcbiAgICB0aGlzLmZhY2Vib29rUGFnZSA9IF9mYWNlYm9va1BhZ2U7XHJcbiAgICB0aGlzLmdhbWVzV29uID0gX2dhbWVzV29uO1xyXG4gICAgdGhpcy50ZXN0c1Rha2VuID0gX3Rlc3RzVGFrZW47XHJcbiAgICB0aGlzLnRlc3RpbmdBdmVyYWdlID0gX3Rlc3RpbmdBdmVyYWdlO1xyXG4gICAgdGhpcy5nYW1lQ2FzaCA9IF9nYW1lQ2FzaDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBUZWFjaGVyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgVGVhY2hlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlRlYWNoZXJcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgc2Nob29sOiBcIlwiLFxyXG4gICAgY2xhc3NUYXVnaHQ6IDAsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfc2Nob29sID0gXCJub25lXCIsIF9jbGFzc1RhdWdodCA9IDAsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX2NvbnRhY3ROdW1iZXIgPSBcIm5vbmVcIiwgX2FjY2Vzc1Rva2VuID0gXCJcIiwgX3VwZGF0ZWRBdCA9IDAsIF91c2VySUQgPSBcIlwiLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuc2Nob29sID0gX3NjaG9vbDtcclxuICAgIHRoaXMuY2xhc3NUYXVnaHQgPSBfY2xhc3NUYXVnaHQ7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklkO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMucm9sZVR5cGUgPSBfcm9sZVR5cGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUHJvZ3JhbSBBbWJhc3NhZG9ycyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFByb2dyYW1BbWJhc3NhZG9ycyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlByb2dyYW1BbWJhc3NhZG9yc1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgYWRkcmVzczogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLCBfYWRkcmVzcyA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLmFkZHJlc3MgPSBfYWRkcmVzcztcclxuICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklkO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMucm9sZVR5cGUgPSBfcm9sZVR5cGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2Nob29sIEFkbWluaXN0cmF0b3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgU2Nob29sQWRtaW5pc3RyYXRvcnMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTY2hvb2xBZG1pbmlzdHJhdG9yc1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBzY2hvb2xOYW1lOiBcIlwiLFxyXG4gICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX3NjaG9vbE5hbWUgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5zY2hvb2xOYW1lID0gX3NjaG9vbE5hbWU7XHJcbiAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklkO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMucm9sZVR5cGUgPSBfcm9sZVR5cGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUHJvZ3JhbSBEaXJlY3RvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBQcm9ncmFtRGlyZWN0b3JzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUHJvZ3JhbURpcmVjdG9yc1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICB9LFxyXG4gIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX2FjY2Vzc1Rva2VuID0gXCJcIiwgX3VwZGF0ZWRBdCA9IDAsIF91c2VySUQgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VydmVyQmFja2VuZC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VydmVyQmFja2VuZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNlcnZlckJhY2tlbmRcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgU3R1ZGVudERhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogU3R1ZGVudCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHN0dWRlbnQgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIFRlYWNoZXJEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFRlYWNoZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiB0ZWFjaGVyIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBNZW50b3JEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFByb2dyYW1BbWJhc3NhZG9ycyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIE1lbnRvciAvIFByb2dyYW1BbWJhc3NhZG9ycyAgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIEFkbWluRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBTY2hvb2xBZG1pbmlzdHJhdG9ycyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIFNjaG9vbEFkbWluaXN0cmF0b3JzICBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgRGlyZWN0b3JEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFByb2dyYW1EaXJlY3RvcnMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBQcm9ncmFtRGlyZWN0b3JzICBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzcG9uc2VUeXBlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3BvbnNlXCIsXHJcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZUVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IFJlc3BvbnNlVHlwZUVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlc3BvbnNlVHlwZSBjYXRvZ29yeSBmb3IgYXBpJ3NcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBSZW1vdmVQZXJzaXN0Tm9kZSgpIHtcclxuICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICB9LFxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBpZiAoIVNlcnZlckJhY2tlbmQuSW5zdGFuY2UpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgIHRoaXMuU3R1ZGVudERhdGEgPSBuZXcgU3R1ZGVudCgpO1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiY3JlYXRpbmcgaW5zdGFuY2UgXCIgKyB0aGlzLm5vZGUubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9wcml2YXRlIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5nZXRVc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2dldFVzZXJcIjtcclxuICAgIHRoaXMubG9naW5Vc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2xvZ2luVXNlclwiO1xyXG4gICAgdGhpcy5VcGRhdGVVc2VyRGF0YUFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi91cGRhdGVVc2VyXCI7XHJcblxyXG4gICAgLy8gdGhpcy5HZXRVc2VyRGF0YShcInh0cm9uZGV2QGdtYWlsLmNvbVwiLFwiU3R1ZGVudFwiKTtcclxuICB9LFxyXG5cclxuICBHZXRVc2VyRGF0YShfZW1haWwsIF9yb2xlLCBfYWNjZXNzVG9rZW4sIF9zdWJUeXBlID0gLTEpIHtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJQYXlsb2FkKF9lbWFpbCwgX3JvbGUpO1xyXG4gICAgdmFyIGhlYWRlciA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsIEF1dGhvcml6YXRpb246IF9hY2Nlc3NUb2tlbiB9O1xyXG4gICAgdGhpcy5DYWxsUkVTVEFQSSh0aGlzLmdldFVzZXJBUEksIFwiUE9TVFwiLCBwYXlsb2FkLCAxLCBoZWFkZXIsIF9zdWJUeXBlKTtcclxuICB9LFxyXG5cclxuICBMb2dpblVzZXIoX2VtYWlsLCBfcGFzc3dvcmQsIF9yb2xlKSB7XHJcbiAgICB2YXIgcGF5bG9hZCA9IG5ldyBVc2VyTG9naW5QYXlsb2FkKF9lbWFpbCwgX3Bhc3N3b3JkLCBfcm9sZSwgXCJVQ0syU1I0WU1HN0pcIik7XHJcbiAgICB0aGlzLkNhbGxSRVNUQVBJKHRoaXMubG9naW5Vc2VyQVBJLCBcIlBPU1RcIiwgcGF5bG9hZCwgMiwgbnVsbCwgLTEpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVVzZXJEYXRhKF9jYXNoID0gLTEsIF9nYW1lV29uID0gLTEsIF9hdmF0YXJJRCA9IC0xKSB7XHJcbiAgICB2YXIgX21haW5EYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcblxyXG4gICAgaWYgKF9tYWluRGF0YSAhPSBudWxsKSB7XHJcbiAgICAgIHZhciBTZW5kaW5nUGF5bG9hZCA9IG5ldyBVc2VyRGF0YVVwZGF0ZVBheWxvYWQoXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuU0ssXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEucGFzc3dvcmQsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEubmFtZSxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5yb2xlLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLmRvQixcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5ncmFkZUxldmVsLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLnRlYWNoZXJOYW1lLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLmZiUGFnZSxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5nYW1lc1dvbixcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS50ZXN0VGFrZW4sXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuZGlzdHJpY3QsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEudGVzdGluZ0F2ZXJhZ2UsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuaW5HYW1lQ2FzaCxcclxuICAgICAgICBcIm11YmVlbmFsaUBnbWFpbC5jb21cIixcclxuICAgICAgICBcIlNjaG9vbEFkbWluXCIsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuYWRkZWRCeUVtYWlsLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLnNjaG9vbE5hbWUsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuYXZhdGFySWRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChfY2FzaCAhPSAtMSkge1xyXG4gICAgICAgIFNlbmRpbmdQYXlsb2FkLmluR2FtZUNhc2ggPSBfY2FzaDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoX2dhbWVXb24gIT0gLTEpIHtcclxuICAgICAgICBTZW5kaW5nUGF5bG9hZC5nYW1lc1dvbiA9IF9nYW1lV29uO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChfYXZhdGFySUQgIT0gLTEpIHtcclxuICAgICAgICBTZW5kaW5nUGF5bG9hZC5hdmF0YXJJZCA9IF9hdmF0YXJJRC50b1N0cmluZygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhTZW5kaW5nUGF5bG9hZCk7XHJcbiAgICAgIHZhciBwYXlsb2FkID0gU2VuZGluZ1BheWxvYWQ7XHJcbiAgICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfbWFpbkRhdGEuZGF0YS51c2VyVG9rZW4gfTtcclxuICAgICAgdGhpcy5DYWxsUkVTVEFQSSh0aGlzLlVwZGF0ZVVzZXJEYXRhQVBJLCBcIlBVVFwiLCBwYXlsb2FkLCAzLCBoZWFkZXIsIC0xKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYW5ub3QgdXBkYXRlIGRhdGEgYXMgc3RvcmVkIGRhdGEgaXMgbnVsbFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBGZXRjaChfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzID0gbnVsbCkge1xyXG4gICAgaWYgKF9tZXRob2QgPT0gXCJHRVRcIikge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKF91cmwsIHtcclxuICAgICAgICAgIGhlYWRlcnM6IF9oZWFkZXJzLFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihcImhlYWRlciBpcyBudWxsXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihfcmVxdWVzdEJvZHkpO1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KF9yZXF1ZXN0Qm9keSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDYWxsUkVTVEFQSShfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF90eXBlLCBfaGVhZGVycyA9IG51bGwsIF9zdWJUeXBlID0gLTEpIHtcclxuICAgIEZldGNoX1Byb21pc2UoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICBhc3luYyBmdW5jdGlvbiBGZXRjaF9Qcm9taXNlKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMgPSBudWxsKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIFJlc3BvbnNlID0gYXdhaXQgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5GZXRjaChfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzKTtcclxuICAgICAgICB2YXIgVGVtcERhdGEgPSBhd2FpdCBSZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAvL2dldHRpbmcgdXNlciBkYXRhXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChfc3ViVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGRhdGEgdG8gc3RvcmFnZSBjbGFzc1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNVQ0NFU1NcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcInN1Y2Vzc2Z1bGx5XCIpKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb3QgZGF0YSBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAvL2JvdGggYmVsb3cgY2FsbHMgYXJlIHdyaXR0ZW4gaW5zaWRlIHN0b3JnYWVtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJSZWZyZXNoRGF0YVwiLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgLy9sb2dpbiB1c2VyXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwic3VjZXNzZnVsbHlcIikpIHtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhNYWluRGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiU3R1ZGVudFwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduU3R1ZGVudERhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtQW1iYXNzYWRvclwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduTWVudG9yRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiU2Nob29sQWRtaW5cIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbkFkbWluRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbURpcmVjdG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIndyb25nXCIpIHx8IE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJjaGFyYWN0ZXJzXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5JbnZhbGlkRW1haWxQYXNzd29yZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiRGF0YSBub3QgRm91bmQhXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5Vc2VyTm90Rm91bmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlBhc3N3b3JkIHNob3VsZCBjb250YWluIGF0bGVhc3Qgb25lIEludGVnZXJcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgLy9sb2dpbiB1c2VyIGVycm9yXHJcbiAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uV2VudFdyb25nO1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnV2UgZG8gY2xlYW51cCBoZXJlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vI3JlZ2lvbiBDb21tZW50ZWRcclxuICAgIC8vIGZldGNoKFxyXG4gICAgLy8gICAgIF91cmwsXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAvLyAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgIC8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgKVxyXG4gICAgLy8gICAudGhlbihyZXNwb25zZT0+e1xyXG4gICAgLy8gICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YT0+e1xyXG4gICAgLy8gICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgLy8gICAgICAgICAvL3JldHVybiBkYXRhO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9KVxyXG4gICAgLy8gICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuICB9LFxyXG5cclxuICBBc3NpZ25TdHVkZW50RGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEubmFtZSA9IERhdGFSZXNwb25zZS5kYXRhLm5hbWU7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmRPQiA9IERhdGFSZXNwb25zZS5kYXRhLmRvQjtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZ3JhZGVMZXZlbCA9IERhdGFSZXNwb25zZS5kYXRhLmdyYWRlTGV2ZWw7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5kYXRhLlNLO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS50ZWFjaGVyTmFtZSA9IERhdGFSZXNwb25zZS5kYXRhLnRlYWNoZXJOYW1lO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5mYWNlYm9va1BhZ2UgPSBEYXRhUmVzcG9uc2UuZGF0YS5mYlBhZ2U7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVzV29uID0gRGF0YVJlc3BvbnNlLmRhdGEuZ2FtZXNXb247XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnRlc3RzVGFrZW4gPSBEYXRhUmVzcG9uc2UuZGF0YS50ZXN0VGFrZW47XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnRlc3RpbmdBdmVyYWdlID0gRGF0YVJlc3BvbnNlLmRhdGEudGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gRGF0YVJlc3BvbnNlLmRhdGEuaW5HYW1lQ2FzaDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLmRhdGEudXNlcklEO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5kYXRhLmF2YXRhcklkO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kYXRhLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5kYXRhLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuU3R1ZGVudERhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuU3R1ZGVudERhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLmRhdGEudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuU3R1ZGVudERhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnblRlYWNoZXJEYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLmRhdGEubmFtZTtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuc2Nob29sID0gRGF0YVJlc3BvbnNlLmRhdGEuc2Nob29sTmFtZTtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuY2xhc3NUYXVnaHQgPSBEYXRhUmVzcG9uc2UuZGF0YS5jbGFzc1RhdWdodDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLmRhdGEuU0s7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuZGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VySUQ7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmRhdGEuYXZhdGFySWQ7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRhdGEuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLmRhdGEucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5UZWFjaGVyRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5UZWFjaGVyRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UuZGF0YS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5UZWFjaGVyRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduTWVudG9yRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLmRhdGEubmFtZTtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuICAgIHRoaXMuTWVudG9yRGF0YS5jb250YWN0TnVtYmVyID0gRGF0YVJlc3BvbnNlLmRhdGEuY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuTWVudG9yRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VySUQ7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuYWRkcmVzcyA9IERhdGFSZXNwb25zZS5kYXRhLmFkZHJlc3M7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuZGF0YS5hdmF0YXJJZDtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kYXRhLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLmRhdGEucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5NZW50b3JEYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLmRhdGEudXNlclRva2VuO1xyXG4gICAgICB0aGlzLk1lbnRvckRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLmRhdGEudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuTWVudG9yRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduQWRtaW5EYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5BZG1pbkRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5kYXRhLm5hbWU7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuICAgIHRoaXMuQWRtaW5EYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuZGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLmRhdGEudXNlcklEO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuc2Nob29sTmFtZSA9IERhdGFSZXNwb25zZS5kYXRhLnNjaG9vbE5hbWU7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5kYXRhLmF2YXRhcklkO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGF0YS5kaXN0cmljdDtcclxuICAgIHRoaXMuQWRtaW5EYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLmRhdGEucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5BZG1pbkRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuQWRtaW5EYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLkFkbWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGlyZWN0b3JEYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5kYXRhLm5hbWU7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmRhdGEuYXZhdGFySWQ7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kYXRhLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2UuZGF0YS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLkRpcmVjdG9yRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5EaXJlY3RvckRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLmRhdGEudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuRGlyZWN0b3JEYXRhKTtcclxuICB9LFxyXG4gIHN0YXJ0KCkge30sXHJcblxyXG4gIFJlbG9naW5Gcm9tU3RvcmFnZShNYWluRGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHkgYXV0b21hdGljYWxseVwiKTtcclxuICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuICAgIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiU3R1ZGVudFwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25TdHVkZW50RGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJUZWFjaGVyXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbk1lbnRvckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiU2Nob29sQWRtaW5cIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduQWRtaW5EYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1EaXJlY3RvclwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHNlbmRpbmcgcGF5bG9hZCB0byByZWNlaXZlIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJQYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlclBheWxvYWRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX2VtYWlsID0gXCJub25lXCIsIF9yb2xlID0gXCJub25lXCIpIHtcclxuICAgIHRoaXMuZW1haWwgPSBfZW1haWw7XHJcbiAgICB0aGlzLnJvbGUgPSBfcm9sZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVc2VyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERhdGEgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJEYXRhXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgaW5HYW1lQ2FzaDogXCJcIixcclxuICAgIExTSzogXCJcIixcclxuICAgIHVzZXJUb2tlbjogXCJcIixcclxuICAgIGNsYXNzVGF1Z2h0OiBcIlwiLFxyXG4gICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBnYW1lc1dvbjogXCJcIixcclxuICAgIGNyZWF0ZWRBdDogMCxcclxuICAgIGlzRGVsZXRlZDogZmFsc2UsXHJcbiAgICBUYWJsZU5hbWU6IFwiXCIsXHJcbiAgICBncmFkZUxldmVsOiBcIlwiLFxyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICBmYlBhZ2U6IFwiXCIsXHJcbiAgICB1cGRhdGVkQXQ6IDAsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGRvQjogXCJcIixcclxuICAgIFNLOiBcIlwiLFxyXG4gICAgdGVzdFRha2VuOiBcIlwiLFxyXG4gICAgUEs6IFwiXCIsXHJcbiAgICB0ZXN0aW5nQXZlcmFnZTogXCJcIixcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGFkZHJlc3M6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGFkZGVkQnlFbWFpbDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgVW5pcXVlS2V5OiBcIlwiLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcm9vdCBjbGFzcyBvZiByZXNwb25zZSByZWNlaXZlZCB3aGVuIGdldHRpbmcgdXNlciBhcGkgaXMgaGl0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyRGF0YVJlc3BvbnNlID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlckRhdGFSZXNwb25zZVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIHN0YXR1c0NvZGU6IFwiXCIsXHJcbiAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgZGF0YTogRGF0YSxcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfc3RhdHVzQ29kZSA9IFwibm9uZVwiLCBfbWVzc2FnZSA9IFwibm9uZVwiLCBfZGF0YSA9IG51bGwpIHtcclxuICAgIHRoaXMuc3RhdHVzQ29kZSA9IF9zdGF0dXNDb2RlO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gX21lc3NhZ2U7XHJcbiAgICB0aGlzLmRhdGEgPSBfZGF0YTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBzZW5kaW5nIHBheWxvYWQgdG8gbG9naW4gdXNlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckxvZ2luUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJMb2dpblBheWxvYWRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICAgIGxpY2Vuc2U6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX2VtYWlsID0gXCJub25lXCIsIF9wYXNzd29yZCA9IFwibm9uZVwiLCBfcm9sZSA9IFwibm9uZVwiLCBfbGljZW5zZSA9IFwibm9uZVwiKSB7XHJcbiAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgdGhpcy5wYXNzd29yZCA9IF9wYXNzd29yZDtcclxuICAgIHRoaXMucm9sZSA9IF9yb2xlO1xyXG4gICAgdGhpcy5saWNlbnNlID0gX2xpY2Vuc2U7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVXNlckRhdGFVcGRhdGVQYXlsb2FkLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyRGF0YVVwZGF0ZVBheWxvYWQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyRGF0YVVwZGF0ZVBheWxvYWRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgICBkb0I6IFwiXCIsXHJcbiAgICBncmFkZUxldmVsOiBcIlwiLFxyXG4gICAgdGVhY2hlck5hbWU6IFwiXCIsXHJcbiAgICBmYlBhZ2U6IFwiXCIsXHJcbiAgICBnYW1lc1dvbjogXCJcIixcclxuICAgIHRlc3RUYWtlbjogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgdGVzdGluZ0F2ZXJhZ2U6IFwiXCIsXHJcbiAgICBpbkdhbWVDYXNoOiBcIlwiLFxyXG4gICAgYWRtaW5FbWFpbDogXCJcIixcclxuICAgIGFkbWluUm9sZTogXCJcIixcclxuICAgIGFkZGVkQnlFbWFpbDogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChcclxuICAgIF9lbWFpbCA9IFwibm9uZVwiLFxyXG4gICAgX3Bhc3N3b3JkID0gXCJub25lXCIsXHJcbiAgICBfbmFtZSA9IFwiXCIsXHJcbiAgICBfcm9sZSA9IFwibm9uZVwiLFxyXG4gICAgX2RvYiA9IFwiXCIsXHJcbiAgICBfZ3JhZGVMZXZlbCA9IFwiXCIsXHJcbiAgICBfdGVhY2hlck5hbWUgPSBcIlwiLFxyXG4gICAgX2ZiUGFnZSA9IFwiXCIsXHJcbiAgICBfZ2FtZXNXb24gPSBcIlwiLFxyXG4gICAgX3Rlc3RUYWtlbiA9IFwiXCIsXHJcbiAgICBfZGlzdHJpY3QgPSBcIlwiLFxyXG4gICAgX3Rlc3RpbmdBdmVyYWdlID0gXCJcIixcclxuICAgIF9pbkdhbWVDYXNoID0gXCJcIixcclxuICAgIF9hZG1pbkVtYWlsID0gXCJcIixcclxuICAgIF9hZG1pblJvbGUgPSBcIlwiLFxyXG4gICAgX2FkZGVkQnlFbWFpbCA9IFwiXCIsXHJcbiAgICBfc2Nob29sTmFtZSA9IFwiXCIsXHJcbiAgICBfYXZhdGFySUQgPSBcIlwiXHJcbiAgKSB7XHJcbiAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgdGhpcy5wYXNzd29yZCA9IF9wYXNzd29yZDtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5yb2xlID0gX3JvbGU7XHJcbiAgICB0aGlzLmRvQiA9IF9kb2I7XHJcbiAgICB0aGlzLmdyYWRlTGV2ZWwgPSBfZ3JhZGVMZXZlbDtcclxuICAgIHRoaXMudGVhY2hlck5hbWUgPSBfdGVhY2hlck5hbWU7XHJcbiAgICB0aGlzLmZiUGFnZSA9IF9mYlBhZ2U7XHJcbiAgICB0aGlzLmdhbWVzV29uID0gX2dhbWVzV29uO1xyXG4gICAgdGhpcy50ZXN0VGFrZW4gPSBfdGVzdFRha2VuO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMudGVzdGluZ0F2ZXJhZ2UgPSBfdGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLmluR2FtZUNhc2ggPSBfaW5HYW1lQ2FzaDtcclxuICAgIHRoaXMuYWRtaW5FbWFpbCA9IF9hZG1pbkVtYWlsO1xyXG4gICAgdGhpcy5hZG1pblJvbGUgPSBfYWRtaW5Sb2xlO1xyXG4gICAgdGhpcy5hZGRlZEJ5RW1haWwgPSBfYWRkZWRCeUVtYWlsO1xyXG4gICAgdGhpcy5zY2hvb2xOYW1lID0gX3NjaG9vbE5hbWU7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklEO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2ZXJCYWNrZW5kO1xyXG4iXX0=