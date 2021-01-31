
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
  WentWrong: 4,
  LicenseInvalid: 5
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
      this.StudentData = new Student(); //  console.error("creating instance " + this.node.name);
    } //private variables


    this.getUserAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/getUser";
    this.loginUserAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/loginUser";
    this.UpdateUserDataAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/updateUser"; //UCK2SR4YMG7J
    // this.GetUserData("xtrondev@gmail.com","Student");
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
  LoginUser: function LoginUser(_email, _password, _role, _license) {
    var payload = new UserLoginPayload(_email, _password, _role, _license);
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
                  } else if (MainData.message.includes("School License is not valid contact Admin!")) {
                    ServerBackend.Instance.ResponseType = ResponseTypeEnum.LicenseInvalid;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlVHlwZUVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiU3VjY2Vzc2Z1bCIsIlVzZXJOb3RGb3VuZCIsIkludmFsaWRFbWFpbFBhc3N3b3JkIiwiV2VudFdyb25nIiwiTGljZW5zZUludmFsaWQiLCJTdHVkZW50IiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsImRPQiIsImdyYWRlTGV2ZWwiLCJlbWFpbEFkZHJlc3MiLCJ0ZWFjaGVyTmFtZSIsImZhY2Vib29rUGFnZSIsImdhbWVzV29uIiwidGVzdHNUYWtlbiIsInRlc3RpbmdBdmVyYWdlIiwiZ2FtZUNhc2giLCJBY2Nlc3NUb2tlbiIsIlVwZGF0ZWRBdCIsInVzZXJJRCIsImF2YXRhcklkIiwiZGlzdHJpY3QiLCJyb2xlVHlwZSIsImN0b3IiLCJfbmFtZSIsIl9kb2IiLCJfZ3JhZGVMZXZlbCIsIl9lbWFpbEFkZHJlc3MiLCJfdGVhY2hlck5hbWUiLCJfZmFjZWJvb2tQYWdlIiwiX2dhbWVzV29uIiwiX3Rlc3RzVGFrZW4iLCJfdGVzdGluZ0F2ZXJhZ2UiLCJfZ2FtZUNhc2giLCJfYXZhdGFySWQiLCJfZGlzdHJpY3QiLCJfcm9sZVR5cGUiLCJUZWFjaGVyIiwic2Nob29sIiwiY2xhc3NUYXVnaHQiLCJjb250YWN0TnVtYmVyIiwiX3NjaG9vbCIsIl9jbGFzc1RhdWdodCIsIl9jb250YWN0TnVtYmVyIiwiX2FjY2Vzc1Rva2VuIiwiX3VwZGF0ZWRBdCIsIl91c2VySUQiLCJQcm9ncmFtQW1iYXNzYWRvcnMiLCJhZGRyZXNzIiwiX2FkZHJlc3MiLCJTY2hvb2xBZG1pbmlzdHJhdG9ycyIsInNjaG9vbE5hbWUiLCJfc2Nob29sTmFtZSIsIlByb2dyYW1EaXJlY3RvcnMiLCJTZXJ2ZXJCYWNrZW5kIiwiQ29tcG9uZW50IiwiU3R1ZGVudERhdGEiLCJ0eXBlIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlRlYWNoZXJEYXRhIiwiTWVudG9yRGF0YSIsIkFkbWluRGF0YSIsIkRpcmVjdG9yRGF0YSIsIlJlc3BvbnNlVHlwZSIsImRpc3BsYXlOYW1lIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJnYW1lIiwicmVtb3ZlUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIm9uTG9hZCIsImFkZFBlcnNpc3RSb290Tm9kZSIsImdldFVzZXJBUEkiLCJsb2dpblVzZXJBUEkiLCJVcGRhdGVVc2VyRGF0YUFQSSIsIkdldFVzZXJEYXRhIiwiX2VtYWlsIiwiX3JvbGUiLCJfc3ViVHlwZSIsInBheWxvYWQiLCJVc2VyUGF5bG9hZCIsImhlYWRlciIsIkF1dGhvcml6YXRpb24iLCJDYWxsUkVTVEFQSSIsIkxvZ2luVXNlciIsIl9wYXNzd29yZCIsIl9saWNlbnNlIiwiVXNlckxvZ2luUGF5bG9hZCIsIlVwZGF0ZVVzZXJEYXRhIiwiX2Nhc2giLCJfZ2FtZVdvbiIsIl9hdmF0YXJJRCIsIl9tYWluRGF0YSIsIkpTT04iLCJwYXJzZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJTZW5kaW5nUGF5bG9hZCIsIlVzZXJEYXRhVXBkYXRlUGF5bG9hZCIsImRhdGEiLCJTSyIsInBhc3N3b3JkIiwicm9sZSIsImRvQiIsImZiUGFnZSIsInRlc3RUYWtlbiIsImluR2FtZUNhc2giLCJhZGRlZEJ5RW1haWwiLCJ0b1N0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyVG9rZW4iLCJlcnJvciIsIkZldGNoIiwiX3VybCIsIl9tZXRob2QiLCJfcmVxdWVzdEJvZHkiLCJfaGVhZGVycyIsImZldGNoIiwiaGVhZGVycyIsIm1ldGhvZCIsImJvZHkiLCJzdHJpbmdpZnkiLCJfdHlwZSIsIkZldGNoX1Byb21pc2UiLCJSZXNwb25zZSIsImpzb24iLCJUZW1wRGF0YSIsIk1haW5EYXRhIiwiVXNlckRhdGFSZXNwb25zZSIsInN0YXR1c0NvZGUiLCJtZXNzYWdlIiwiaW5jbHVkZXMiLCJzeXN0ZW1FdmVudCIsImVtaXQiLCJBc3NpZ25TdHVkZW50RGF0YSIsIkFzc2lnblRlYWNoZXJEYXRhIiwiQXNzaWduTWVudG9yRGF0YSIsIkFzc2lnbkFkbWluRGF0YSIsIkFzc2lnbkRpcmVjdG9yRGF0YSIsIkRhdGFSZXNwb25zZSIsImlzTG9nZ2VkSW4iLCJ1cGRhdGVkQXQiLCJzdGFydCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsImVtYWlsIiwiRGF0YSIsIkxTSyIsImNyZWF0ZWRBdCIsImlzRGVsZXRlZCIsIlRhYmxlTmFtZSIsIlBLIiwiVW5pcXVlS2V5IiwiX3N0YXR1c0NvZGUiLCJfbWVzc2FnZSIsIl9kYXRhIiwibGljZW5zZSIsImFkbWluRW1haWwiLCJhZG1pblJvbGUiLCJfZmJQYWdlIiwiX3Rlc3RUYWtlbiIsIl9pbkdhbWVDYXNoIiwiX2FkbWluRW1haWwiLCJfYWRtaW5Sb2xlIiwiX2FkZGVkQnlFbWFpbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsZ0JBQWdCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzdCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEdUI7QUFFN0JDLEVBQUFBLFVBQVUsRUFBRSxDQUZpQjtBQUc3QkMsRUFBQUEsWUFBWSxFQUFFLENBSGU7QUFJN0JDLEVBQUFBLG9CQUFvQixFQUFFLENBSk87QUFLN0JDLEVBQUFBLFNBQVMsRUFBRSxDQUxrQjtBQU03QkMsRUFBQUEsY0FBYyxFQUFFO0FBTmEsQ0FBUixDQUF2QixFQVFBOztBQUNBLElBQUlDLE9BQU8sR0FBR1IsRUFBRSxDQUFDUyxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxTQURlO0FBRXJCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkQsSUFBQUEsSUFBSSxFQUFFLEVBREk7QUFFVkUsSUFBQUEsR0FBRyxFQUFFLEVBRks7QUFHVkMsSUFBQUEsVUFBVSxFQUFFLEVBSEY7QUFJVkMsSUFBQUEsWUFBWSxFQUFFLEVBSko7QUFLVkMs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S0EsR0FMYyxFQUtkO0FBQUE7O0FBQUEsUUFKQUMsVUFJQTtBQUpBQSxNQUFBQSxVQUlBLEdBSmEsRUFJYjtBQUFBOztBQUFBLFFBSEFDLGFBR0E7QUFIQUEsTUFBQUEsYUFHQSxHQUhnQixFQUdoQjtBQUFBOztBQUFBLFFBRkFuSCxXQUVBO0FBRkFBLE1BQUFBLFdBRUEsR0FGYyxFQUVkO0FBQUE7O0FBQUEsUUFEQXlDLFNBQ0E7QUFEQUEsTUFBQUEsU0FDQSxHQURZLEVBQ1o7QUFBQTs7QUFDQSxTQUFLdUQsS0FBTCxHQUFhdEUsTUFBYjtBQUNBLFNBQUswQixRQUFMLEdBQWdCakIsU0FBaEI7QUFDQSxTQUFLakYsSUFBTCxHQUFZa0IsS0FBWjtBQUNBLFNBQUtpRixJQUFMLEdBQVkxQixLQUFaO0FBQ0EsU0FBSzJCLEdBQUwsR0FBV2pGLElBQVg7QUFDQSxTQUFLaEIsVUFBTCxHQUFrQmlCLFdBQWxCO0FBQ0EsU0FBS2YsV0FBTCxHQUFtQmlCLFlBQW5CO0FBQ0EsU0FBSytFLE1BQUwsR0FBY3VELE9BQWQ7QUFDQSxTQUFLckosUUFBTCxHQUFnQmlCLFNBQWhCO0FBQ0EsU0FBSzhFLFNBQUwsR0FBaUJ1RCxVQUFqQjtBQUNBLFNBQUs5SSxRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtwQixjQUFMLEdBQXNCaUIsZUFBdEI7QUFDQSxTQUFLNkUsVUFBTCxHQUFrQnVELFdBQWxCO0FBQ0EsU0FBS0osVUFBTCxHQUFrQkssV0FBbEI7QUFDQSxTQUFLSixTQUFMLEdBQWlCSyxVQUFqQjtBQUNBLFNBQUt4RCxZQUFMLEdBQW9CeUQsYUFBcEI7QUFDQSxTQUFLcEgsVUFBTCxHQUFrQkMsV0FBbEI7QUFDQSxTQUFLaEMsUUFBTCxHQUFnQnlFLFNBQWhCO0FBQ0Q7QUE3RGtDLENBQVQsQ0FBNUI7QUFnRUEyRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJuSCxhQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJlc3BvbnNlVHlwZUVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFN1Y2Nlc3NmdWw6IDEsXHJcbiAgVXNlck5vdEZvdW5kOiAyLFxyXG4gIEludmFsaWRFbWFpbFBhc3N3b3JkOiAzLFxyXG4gIFdlbnRXcm9uZzogNCxcclxuICBMaWNlbnNlSW52YWxpZDogNSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdHVkZW50IERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0dWRlbnQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdHVkZW50XCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGRPQjogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGZhY2Vib29rUGFnZTogXCJcIixcclxuICAgIGdhbWVzV29uOiAwLFxyXG4gICAgdGVzdHNUYWtlbjogMCxcclxuICAgIHRlc3RpbmdBdmVyYWdlOiAwLFxyXG4gICAgZ2FtZUNhc2g6IDAsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZG9iID0gXCJub25lXCIsIF9ncmFkZUxldmVsID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX3RlYWNoZXJOYW1lID0gXCJub25lXCIsIF9mYWNlYm9va1BhZ2UgPSBcIm5vbmVcIiwgX2dhbWVzV29uID0gMCwgX3Rlc3RzVGFrZW4gPSAwLCBfdGVzdGluZ0F2ZXJhZ2UgPSAwLCBfZ2FtZUNhc2ggPSAwLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuZE9CID0gX2RvYjtcclxuICAgIHRoaXMuZ3JhZGVMZXZlbCA9IF9ncmFkZUxldmVsO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy50ZWFjaGVyTmFtZSA9IF90ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuZmFjZWJvb2tQYWdlID0gX2ZhY2Vib29rUGFnZTtcclxuICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICB0aGlzLnRlc3RzVGFrZW4gPSBfdGVzdHNUYWtlbjtcclxuICAgIHRoaXMudGVzdGluZ0F2ZXJhZ2UgPSBfdGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLmdhbWVDYXNoID0gX2dhbWVDYXNoO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFRlYWNoZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBUZWFjaGVyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVGVhY2hlclwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBzY2hvb2w6IFwiXCIsXHJcbiAgICBjbGFzc1RhdWdodDogMCxcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9zY2hvb2wgPSBcIm5vbmVcIiwgX2NsYXNzVGF1Z2h0ID0gMCwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5zY2hvb2wgPSBfc2Nob29sO1xyXG4gICAgdGhpcy5jbGFzc1RhdWdodCA9IF9jbGFzc1RhdWdodDtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIEFtYmFzc2Fkb3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgUHJvZ3JhbUFtYmFzc2Fkb3JzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUHJvZ3JhbUFtYmFzc2Fkb3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZ1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hZGRyZXNzID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuYWRkcmVzcyA9IF9hZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTY2hvb2wgQWRtaW5pc3RyYXRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBTY2hvb2xBZG1pbmlzdHJhdG9ycyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNjaG9vbEFkbWluaXN0cmF0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfc2Nob29sTmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnNjaG9vbE5hbWUgPSBfc2Nob29sTmFtZTtcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIERpcmVjdG9ycyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFByb2dyYW1EaXJlY3RvcnMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQcm9ncmFtRGlyZWN0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZXJ2ZXJCYWNrZW5kLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZXJ2ZXJCYWNrZW5kID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VydmVyQmFja2VuZFwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBTdHVkZW50RGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBTdHVkZW50LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gc3R1ZGVudCBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgVGVhY2hlckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVGVhY2hlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHRlYWNoZXIgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIE1lbnRvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbUFtYmFzc2Fkb3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gTWVudG9yIC8gUHJvZ3JhbUFtYmFzc2Fkb3JzICBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgQWRtaW5EYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFNjaG9vbEFkbWluaXN0cmF0b3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gU2Nob29sQWRtaW5pc3RyYXRvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBEaXJlY3RvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbURpcmVjdG9ycyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIFByb2dyYW1EaXJlY3RvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBSZXNwb25zZVR5cGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzcG9uc2VcIixcclxuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlRW51bSxcclxuICAgICAgZGVmYXVsdDogUmVzcG9uc2VUeXBlRW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVzcG9uc2VUeXBlIGNhdG9nb3J5IGZvciBhcGknc1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGlmICghU2VydmVyQmFja2VuZC5JbnN0YW5jZSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlID0gdGhpcztcclxuICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YSA9IG5ldyBTdHVkZW50KCk7XHJcbiAgICAgIC8vICBjb25zb2xlLmVycm9yKFwiY3JlYXRpbmcgaW5zdGFuY2UgXCIgKyB0aGlzLm5vZGUubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9wcml2YXRlIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5nZXRVc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2dldFVzZXJcIjtcclxuICAgIHRoaXMubG9naW5Vc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2xvZ2luVXNlclwiO1xyXG4gICAgdGhpcy5VcGRhdGVVc2VyRGF0YUFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi91cGRhdGVVc2VyXCI7XHJcbiAgICAvL1VDSzJTUjRZTUc3SlxyXG4gICAgLy8gdGhpcy5HZXRVc2VyRGF0YShcInh0cm9uZGV2QGdtYWlsLmNvbVwiLFwiU3R1ZGVudFwiKTtcclxuICB9LFxyXG5cclxuICBHZXRVc2VyRGF0YShfZW1haWwsIF9yb2xlLCBfYWNjZXNzVG9rZW4sIF9zdWJUeXBlID0gLTEpIHtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJQYXlsb2FkKF9lbWFpbCwgX3JvbGUpO1xyXG4gICAgdmFyIGhlYWRlciA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsIEF1dGhvcml6YXRpb246IF9hY2Nlc3NUb2tlbiB9O1xyXG4gICAgdGhpcy5DYWxsUkVTVEFQSSh0aGlzLmdldFVzZXJBUEksIFwiUE9TVFwiLCBwYXlsb2FkLCAxLCBoZWFkZXIsIF9zdWJUeXBlKTtcclxuICB9LFxyXG5cclxuICBMb2dpblVzZXIoX2VtYWlsLCBfcGFzc3dvcmQsIF9yb2xlLCBfbGljZW5zZSkge1xyXG4gICAgdmFyIHBheWxvYWQgPSBuZXcgVXNlckxvZ2luUGF5bG9hZChfZW1haWwsIF9wYXNzd29yZCwgX3JvbGUsIF9saWNlbnNlKTtcclxuICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5sb2dpblVzZXJBUEksIFwiUE9TVFwiLCBwYXlsb2FkLCAyLCBudWxsLCAtMSk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVXNlckRhdGEoX2Nhc2ggPSAtMSwgX2dhbWVXb24gPSAtMSwgX2F2YXRhcklEID0gLTEpIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSBKU09OLnBhcnNlKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJEYXRhXCIpKTtcclxuXHJcbiAgICBpZiAoX21haW5EYXRhICE9IG51bGwpIHtcclxuICAgICAgdmFyIFNlbmRpbmdQYXlsb2FkID0gbmV3IFVzZXJEYXRhVXBkYXRlUGF5bG9hZChcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5TSyxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5wYXNzd29yZCxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5uYW1lLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLnJvbGUsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuZG9CLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLmdyYWRlTGV2ZWwsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEudGVhY2hlck5hbWUsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuZmJQYWdlLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLmdhbWVzV29uLFxyXG4gICAgICAgIF9tYWluRGF0YS5kYXRhLnRlc3RUYWtlbixcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5kaXN0cmljdCxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS50ZXN0aW5nQXZlcmFnZSxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5pbkdhbWVDYXNoLFxyXG4gICAgICAgIFwibXViZWVuYWxpQGdtYWlsLmNvbVwiLFxyXG4gICAgICAgIFwiU2Nob29sQWRtaW5cIixcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5hZGRlZEJ5RW1haWwsXHJcbiAgICAgICAgX21haW5EYXRhLmRhdGEuc2Nob29sTmFtZSxcclxuICAgICAgICBfbWFpbkRhdGEuZGF0YS5hdmF0YXJJZFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKF9jYXNoICE9IC0xKSB7XHJcbiAgICAgICAgU2VuZGluZ1BheWxvYWQuaW5HYW1lQ2FzaCA9IF9jYXNoO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChfZ2FtZVdvbiAhPSAtMSkge1xyXG4gICAgICAgIFNlbmRpbmdQYXlsb2FkLmdhbWVzV29uID0gX2dhbWVXb247XHJcbiAgICAgIH1cclxuICAgICAgaWYgKF9hdmF0YXJJRCAhPSAtMSkge1xyXG4gICAgICAgIFNlbmRpbmdQYXlsb2FkLmF2YXRhcklkID0gX2F2YXRhcklELnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFNlbmRpbmdQYXlsb2FkKTtcclxuICAgICAgdmFyIHBheWxvYWQgPSBTZW5kaW5nUGF5bG9hZDtcclxuICAgICAgdmFyIGhlYWRlciA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsIEF1dGhvcml6YXRpb246IF9tYWluRGF0YS5kYXRhLnVzZXJUb2tlbiB9O1xyXG4gICAgICB0aGlzLkNhbGxSRVNUQVBJKHRoaXMuVXBkYXRlVXNlckRhdGFBUEksIFwiUFVUXCIsIHBheWxvYWQsIDMsIGhlYWRlciwgLTEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcImNhbm5vdCB1cGRhdGUgZGF0YSBhcyBzdG9yZWQgZGF0YSBpcyBudWxsXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEZldGNoKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMgPSBudWxsKSB7XHJcbiAgICBpZiAoX21ldGhvZCA9PSBcIkdFVFwiKSB7XHJcbiAgICAgIGlmIChfaGVhZGVycyA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKF91cmwsIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgfSxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogX2hlYWRlcnMsXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChfaGVhZGVycyA9PSBudWxsKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmVycm9yKFwiaGVhZGVyIGlzIG51bGxcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmVycm9yKF9yZXF1ZXN0Qm9keSk7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKF91cmwsIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgfSxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KF9yZXF1ZXN0Qm9keSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKF91cmwsIHtcclxuICAgICAgICAgIGhlYWRlcnM6IF9oZWFkZXJzLFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENhbGxSRVNUQVBJKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX3R5cGUsIF9oZWFkZXJzID0gbnVsbCwgX3N1YlR5cGUgPSAtMSkge1xyXG4gICAgRmV0Y2hfUHJvbWlzZShfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzKTtcclxuICAgIGFzeW5jIGZ1bmN0aW9uIEZldGNoX1Byb21pc2UoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyA9IG51bGwpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgUmVzcG9uc2UgPSBhd2FpdCBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkZldGNoKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMpO1xyXG4gICAgICAgIHZhciBUZW1wRGF0YSA9IGF3YWl0IFJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgaWYgKF90eXBlID09IDEpIHtcclxuICAgICAgICAgIC8vZ2V0dGluZyB1c2VyIGRhdGFcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgICAgaWYgKF9zdWJUeXBlID09IDApIHtcclxuICAgICAgICAgICAgLy9yZXR1cm4gZGF0YSB0byBzdG9yYWdlIGNsYXNzXHJcbiAgICAgICAgICAgIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiU1VDQ0VTU1wiKSB8fCBNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwic3VjZXNzZnVsbHlcIikpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvdCBkYXRhIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhNYWluRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vYm90aCBiZWxvdyBjYWxscyBhcmUgd3JpdHRlbiBpbnNpZGUgc3RvcmdhZW1hbmFnZXJcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiV3JpdGVEYXRhXCIsIE1haW5EYXRhKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiUmVmcmVzaERhdGFcIiwgMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2xvZ2luIHVzZXJcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiV3JpdGVEYXRhXCIsIE1haW5EYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuICAgICAgICAgICAgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25TdHVkZW50RGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiVGVhY2hlclwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduVGVhY2hlckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25NZW50b3JEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTY2hvb2xBZG1pblwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduQWRtaW5EYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtRGlyZWN0b3JcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbkRpcmVjdG9yRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwid3JvbmdcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcImNoYXJhY3RlcnNcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJEYXRhIG5vdCBGb3VuZCFcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlVzZXJOb3RGb3VuZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiUGFzc3dvcmQgc2hvdWxkIGNvbnRhaW4gYXRsZWFzdCBvbmUgSW50ZWdlclwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uSW52YWxpZEVtYWlsUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNjaG9vbCBMaWNlbnNlIGlzIG5vdCB2YWxpZCBjb250YWN0IEFkbWluIVwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uTGljZW5zZUludmFsaWQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDMpIHtcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmIChfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2xvZ2luIHVzZXIgZXJyb3JcclxuICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5XZW50V3Jvbmc7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKCdXZSBkbyBjbGVhbnVwIGhlcmUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8jcmVnaW9uIENvbW1lbnRlZFxyXG4gICAgLy8gZmV0Y2goXHJcbiAgICAvLyAgICAgX3VybCxcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgfSxcclxuICAgIC8vICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICApXHJcbiAgICAvLyAgIC50aGVuKHJlc3BvbnNlPT57XHJcbiAgICAvLyAgICAgICByZXNwb25zZS5qc29uKCkudGhlbihkYXRhPT57XHJcbiAgICAvLyAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAvLyAgICAgICAgIC8vcmV0dXJuIGRhdGE7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH0pXHJcbiAgICAvLyAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgLy8gICB9KTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gIH0sXHJcblxyXG4gIEFzc2lnblN0dWRlbnREYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLmRhdGEubmFtZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZE9CID0gRGF0YVJlc3BvbnNlLmRhdGEuZG9CO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5ncmFkZUxldmVsID0gRGF0YVJlc3BvbnNlLmRhdGEuZ3JhZGVMZXZlbDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLmRhdGEuU0s7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnRlYWNoZXJOYW1lID0gRGF0YVJlc3BvbnNlLmRhdGEudGVhY2hlck5hbWU7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmZhY2Vib29rUGFnZSA9IERhdGFSZXNwb25zZS5kYXRhLmZiUGFnZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBEYXRhUmVzcG9uc2UuZGF0YS5nYW1lc1dvbjtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudGVzdHNUYWtlbiA9IERhdGFSZXNwb25zZS5kYXRhLnRlc3RUYWtlbjtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudGVzdGluZ0F2ZXJhZ2UgPSBEYXRhUmVzcG9uc2UuZGF0YS50ZXN0aW5nQXZlcmFnZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBEYXRhUmVzcG9uc2UuZGF0YS5pbkdhbWVDYXNoO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VySUQ7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmRhdGEuYXZhdGFySWQ7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRhdGEuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLmRhdGEucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UuZGF0YS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5TdHVkZW50RGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduVGVhY2hlckRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5zY2hvb2wgPSBEYXRhUmVzcG9uc2UuZGF0YS5zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5jbGFzc1RhdWdodCA9IERhdGFSZXNwb25zZS5kYXRhLmNsYXNzVGF1Z2h0O1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuZGF0YS5TSztcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5kYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJJRDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuZGF0YS5hdmF0YXJJZDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGF0YS5kaXN0cmljdDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2UuZGF0YS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLlRlYWNoZXJEYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLmRhdGEudXNlclRva2VuO1xyXG4gICAgICB0aGlzLlRlYWNoZXJEYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS5kYXRhLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlRlYWNoZXJEYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25NZW50b3JEYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UuZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5kYXRhLlNLO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuZGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJJRDtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5hZGRyZXNzID0gRGF0YVJlc3BvbnNlLmRhdGEuYWRkcmVzcztcclxuICAgIHRoaXMuTWVudG9yRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5kYXRhLmF2YXRhcklkO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRhdGEuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2UuZGF0YS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLk1lbnRvckRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuTWVudG9yRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UuZGF0YS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5NZW50b3JEYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25BZG1pbkRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLmRhdGEubmFtZTtcclxuICAgIHRoaXMuQWRtaW5EYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5kYXRhLlNLO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5kYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLkFkbWluRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UuZGF0YS51c2VySUQ7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5zY2hvb2xOYW1lID0gRGF0YVJlc3BvbnNlLmRhdGEuc2Nob29sTmFtZTtcclxuICAgIHRoaXMuQWRtaW5EYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmRhdGEuYXZhdGFySWQ7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kYXRhLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5BZG1pbkRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2UuZGF0YS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLkFkbWluRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS5kYXRhLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5BZG1pbkRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLmRhdGEudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuQWRtaW5EYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EaXJlY3RvckRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLmRhdGEubmFtZTtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5kYXRhLlNLO1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuZGF0YS5hdmF0YXJJZDtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRhdGEuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5kYXRhLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLmRhdGEudXNlclRva2VuO1xyXG4gICAgICB0aGlzLkRpcmVjdG9yRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UuZGF0YS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5EaXJlY3RvckRhdGEpO1xyXG4gIH0sXHJcbiAgc3RhcnQoKSB7fSxcclxuXHJcbiAgUmVsb2dpbkZyb21TdG9yYWdlKE1haW5EYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseSBhdXRvbWF0aWNhbGx5XCIpO1xyXG4gICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduVGVhY2hlckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbUFtYmFzc2Fkb3JcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduTWVudG9yRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTY2hvb2xBZG1pblwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbURpcmVjdG9yXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbkRpcmVjdG9yRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3Igc2VuZGluZyBwYXlsb2FkIHRvIHJlY2VpdmUgZGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlclBheWxvYWQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyUGF5bG9hZFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfZW1haWwgPSBcIm5vbmVcIiwgX3JvbGUgPSBcIm5vbmVcIikge1xyXG4gICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgIHRoaXMucm9sZSA9IF9yb2xlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFVzZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkRhdGFcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBpbkdhbWVDYXNoOiBcIlwiLFxyXG4gICAgTFNLOiBcIlwiLFxyXG4gICAgdXNlclRva2VuOiBcIlwiLFxyXG4gICAgY2xhc3NUYXVnaHQ6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgc2Nob29sTmFtZTogXCJcIixcclxuICAgIGdhbWVzV29uOiBcIlwiLFxyXG4gICAgY3JlYXRlZEF0OiAwLFxyXG4gICAgaXNEZWxldGVkOiBmYWxzZSxcclxuICAgIFRhYmxlTmFtZTogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgICBwYXNzd29yZDogXCJcIixcclxuICAgIGZiUGFnZTogXCJcIixcclxuICAgIHVwZGF0ZWRBdDogMCxcclxuICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgZG9COiBcIlwiLFxyXG4gICAgU0s6IFwiXCIsXHJcbiAgICB0ZXN0VGFrZW46IFwiXCIsXHJcbiAgICBQSzogXCJcIixcclxuICAgIHRlc3RpbmdBdmVyYWdlOiBcIlwiLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYWRkcmVzczogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgYWRkZWRCeUVtYWlsOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICBVbmlxdWVLZXk6IFwiXCIsXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1yb290IGNsYXNzIG9mIHJlc3BvbnNlIHJlY2VpdmVkIHdoZW4gZ2V0dGluZyB1c2VyIGFwaSBpcyBoaXQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJEYXRhUmVzcG9uc2UgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyRGF0YVJlc3BvbnNlXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgc3RhdHVzQ29kZTogXCJcIixcclxuICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICBkYXRhOiBEYXRhLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9zdGF0dXNDb2RlID0gXCJub25lXCIsIF9tZXNzYWdlID0gXCJub25lXCIsIF9kYXRhID0gbnVsbCkge1xyXG4gICAgdGhpcy5zdGF0dXNDb2RlID0gX3N0YXR1c0NvZGU7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBfbWVzc2FnZTtcclxuICAgIHRoaXMuZGF0YSA9IF9kYXRhO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHNlbmRpbmcgcGF5bG9hZCB0byBsb2dpbiB1c2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyTG9naW5QYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlckxvZ2luUGF5bG9hZFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gICAgbGljZW5zZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfZW1haWwgPSBcIm5vbmVcIiwgX3Bhc3N3b3JkID0gXCJub25lXCIsIF9yb2xlID0gXCJub25lXCIsIF9saWNlbnNlID0gXCJub25lXCIpIHtcclxuICAgIHRoaXMuZW1haWwgPSBfZW1haWw7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gX3Bhc3N3b3JkO1xyXG4gICAgdGhpcy5yb2xlID0gX3JvbGU7XHJcbiAgICB0aGlzLmxpY2Vuc2UgPSBfbGljZW5zZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVc2VyRGF0YVVwZGF0ZVBheWxvYWQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJEYXRhVXBkYXRlUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJEYXRhVXBkYXRlUGF5bG9hZFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICAgIGRvQjogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGZiUGFnZTogXCJcIixcclxuICAgIGdhbWVzV29uOiBcIlwiLFxyXG4gICAgdGVzdFRha2VuOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICB0ZXN0aW5nQXZlcmFnZTogXCJcIixcclxuICAgIGluR2FtZUNhc2g6IFwiXCIsXHJcbiAgICBhZG1pbkVtYWlsOiBcIlwiLFxyXG4gICAgYWRtaW5Sb2xlOiBcIlwiLFxyXG4gICAgYWRkZWRCeUVtYWlsOiBcIlwiLFxyXG4gICAgc2Nob29sTmFtZTogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKFxyXG4gICAgX2VtYWlsID0gXCJub25lXCIsXHJcbiAgICBfcGFzc3dvcmQgPSBcIm5vbmVcIixcclxuICAgIF9uYW1lID0gXCJcIixcclxuICAgIF9yb2xlID0gXCJub25lXCIsXHJcbiAgICBfZG9iID0gXCJcIixcclxuICAgIF9ncmFkZUxldmVsID0gXCJcIixcclxuICAgIF90ZWFjaGVyTmFtZSA9IFwiXCIsXHJcbiAgICBfZmJQYWdlID0gXCJcIixcclxuICAgIF9nYW1lc1dvbiA9IFwiXCIsXHJcbiAgICBfdGVzdFRha2VuID0gXCJcIixcclxuICAgIF9kaXN0cmljdCA9IFwiXCIsXHJcbiAgICBfdGVzdGluZ0F2ZXJhZ2UgPSBcIlwiLFxyXG4gICAgX2luR2FtZUNhc2ggPSBcIlwiLFxyXG4gICAgX2FkbWluRW1haWwgPSBcIlwiLFxyXG4gICAgX2FkbWluUm9sZSA9IFwiXCIsXHJcbiAgICBfYWRkZWRCeUVtYWlsID0gXCJcIixcclxuICAgIF9zY2hvb2xOYW1lID0gXCJcIixcclxuICAgIF9hdmF0YXJJRCA9IFwiXCJcclxuICApIHtcclxuICAgIHRoaXMuZW1haWwgPSBfZW1haWw7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gX3Bhc3N3b3JkO1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnJvbGUgPSBfcm9sZTtcclxuICAgIHRoaXMuZG9CID0gX2RvYjtcclxuICAgIHRoaXMuZ3JhZGVMZXZlbCA9IF9ncmFkZUxldmVsO1xyXG4gICAgdGhpcy50ZWFjaGVyTmFtZSA9IF90ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuZmJQYWdlID0gX2ZiUGFnZTtcclxuICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICB0aGlzLnRlc3RUYWtlbiA9IF90ZXN0VGFrZW47XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy50ZXN0aW5nQXZlcmFnZSA9IF90ZXN0aW5nQXZlcmFnZTtcclxuICAgIHRoaXMuaW5HYW1lQ2FzaCA9IF9pbkdhbWVDYXNoO1xyXG4gICAgdGhpcy5hZG1pbkVtYWlsID0gX2FkbWluRW1haWw7XHJcbiAgICB0aGlzLmFkbWluUm9sZSA9IF9hZG1pblJvbGU7XHJcbiAgICB0aGlzLmFkZGVkQnlFbWFpbCA9IF9hZGRlZEJ5RW1haWw7XHJcbiAgICB0aGlzLnNjaG9vbE5hbWUgPSBfc2Nob29sTmFtZTtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySUQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZlckJhY2tlbmQ7XHJcbiJdfQ==