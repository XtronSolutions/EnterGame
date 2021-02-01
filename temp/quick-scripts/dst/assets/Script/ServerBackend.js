
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

    var _mainData = JSON.parse(window.AllData);

    if (_mainData != null) {
      var SendingPayload = new UserDataUpdatePayload(_mainData.SK, _mainData.password, _mainData.name, _mainData.role, _mainData.doB, _mainData.gradeLevel, _mainData.teacherName, _mainData.fbPage, _mainData.gamesWon, _mainData.testTaken, _mainData.district, _mainData.testingAverage, _mainData.inGameCash, "mubeenali@gmail.com", "SchoolAdmin", _mainData.addedByEmail, _mainData.schoolName, _mainData.avatarId);

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
        Authorization: _mainData.userToken
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

                      cc.systemEvent.emit("WriteData", MainData.data);
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
                    cc.systemEvent.emit("WriteData", MainData.data);
                    console.log("user logged in successfully");
                    console.log(MainData);

                    if (MainData.data.roleType.includes("Student")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                      ServerBackend.Instance.AssignStudentData(MainData.data, true);
                      cc.systemEvent.emit("AssignProfileData", true, false, false, false, false);
                    } else if (MainData.data.roleType.includes("Teacher")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                      ServerBackend.Instance.AssignTeacherData(MainData.data, true);
                      cc.systemEvent.emit("AssignProfileData", false, true, false, false, false);
                    } else if (MainData.data.roleType.includes("ProgramAmbassador")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                      ServerBackend.Instance.AssignMentorData(MainData.data, true);
                      cc.systemEvent.emit("AssignProfileData", false, false, true, false, false);
                    } else if (MainData.data.roleType.includes("SchoolAdmin")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                      ServerBackend.Instance.AssignAdminData(MainData.data, true);
                      cc.systemEvent.emit("AssignProfileData", false, false, false, true, false);
                    } else if (MainData.data.roleType.includes("ProgramDirector")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                      ServerBackend.Instance.AssignDirectorData(MainData.data, true);
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
    //console.error(DataResponse);
    this.StudentData.name = DataResponse.name;
    this.StudentData.dOB = DataResponse.doB;
    this.StudentData.gradeLevel = DataResponse.gradeLevel;
    this.StudentData.emailAddress = DataResponse.SK;
    this.StudentData.teacherName = DataResponse.teacherName;
    this.StudentData.facebookPage = DataResponse.fbPage;
    this.StudentData.gamesWon = DataResponse.gamesWon;
    this.StudentData.testsTaken = DataResponse.testTaken;
    this.StudentData.testingAverage = DataResponse.testingAverage;
    this.StudentData.gameCash = DataResponse.inGameCash;
    this.StudentData.userID = DataResponse.userID;
    this.StudentData.avatarId = DataResponse.avatarId;
    this.StudentData.district = DataResponse.district;
    this.StudentData.roleType = DataResponse.roleType;

    if (isLoggedIn) {
      this.StudentData.AccessToken = DataResponse.userToken;
      this.StudentData.UpdatedAt = DataResponse.updatedAt;
    }

    console.log(this.StudentData);
  },
  AssignTeacherData: function AssignTeacherData(DataResponse, isLoggedIn) {
    this.TeacherData.name = DataResponse.name;
    this.TeacherData.school = DataResponse.schoolName;
    this.TeacherData.classTaught = DataResponse.classTaught;
    this.TeacherData.emailAddress = DataResponse.SK;
    this.TeacherData.contactNumber = DataResponse.contactNumber;
    this.TeacherData.userID = DataResponse.userID;
    this.TeacherData.avatarId = DataResponse.avatarId;
    this.TeacherData.district = DataResponse.district;
    this.TeacherData.roleType = DataResponse.roleType;

    if (isLoggedIn) {
      this.TeacherData.AccessToken = DataResponse.userToken;
      this.TeacherData.UpdatedAt = DataResponse.updatedAt;
    }

    console.log(this.TeacherData);
  },
  AssignMentorData: function AssignMentorData(DataResponse, isLoggedIn) {
    this.MentorData.name = DataResponse.name;
    this.MentorData.emailAddress = DataResponse.SK;
    this.MentorData.contactNumber = DataResponse.contactNumber;
    this.MentorData.userID = DataResponse.userID;
    this.MentorData.address = DataResponse.address;
    this.MentorData.avatarId = DataResponse.avatarId;
    this.MentorData.district = DataResponse.district;
    this.MentorData.roleType = DataResponse.roleType;

    if (isLoggedIn) {
      this.MentorData.AccessToken = DataResponse.userToken;
      this.MentorData.UpdatedAt = DataResponse.updatedAt;
    }

    console.log(this.MentorData);
  },
  AssignAdminData: function AssignAdminData(DataResponse, isLoggedIn) {
    this.AdminData.name = DataResponse.name;
    this.AdminData.emailAddress = DataResponse.SK;
    this.AdminData.contactNumber = DataResponse.contactNumber;
    this.AdminData.userID = DataResponse.userID;
    this.AdminData.schoolName = DataResponse.schoolName;
    this.AdminData.avatarId = DataResponse.avatarId;
    this.AdminData.district = DataResponse.district;
    this.AdminData.roleType = DataResponse.roleType;

    if (isLoggedIn) {
      this.AdminData.AccessToken = DataResponse.userToken;
      this.AdminData.UpdatedAt = DataResponse.updatedAt;
    }

    console.log(this.AdminData);
  },
  AssignDirectorData: function AssignDirectorData(DataResponse, isLoggedIn) {
    this.DirectorData.name = DataResponse.name;
    this.DirectorData.emailAddress = DataResponse.SK;
    this.DirectorData.avatarId = DataResponse.avatarId;
    this.DirectorData.district = DataResponse.district;
    this.DirectorData.roleType = DataResponse.roleType;

    if (isLoggedIn) {
      this.DirectorData.AccessToken = DataResponse.userToken;
      this.DirectorData.UpdatedAt = DataResponse.updatedAt;
    }

    console.log(this.DirectorData);
  },
  start: function start() {},
  ReloginFromStorage: function ReloginFromStorage(MainData) {
    console.log("user logged in successfully automatically");
    console.log(MainData);

    if (MainData.roleType.includes("Student")) {
      ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
      ServerBackend.Instance.AssignStudentData(MainData, true);
      cc.systemEvent.emit("AssignProfileData", true, false, false, false, false);
    } else if (MainData.roleType.includes("Teacher")) {
      ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
      ServerBackend.Instance.AssignTeacherData(MainData, true);
      cc.systemEvent.emit("AssignProfileData", false, true, false, false, false);
    } else if (MainData.roleType.includes("ProgramAmbassador")) {
      ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
      ServerBackend.Instance.AssignMentorData(MainData, true);
      cc.systemEvent.emit("AssignProfileData", false, false, true, false, false);
    } else if (MainData.roleType.includes("SchoolAdmin")) {
      ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
      ServerBackend.Instance.AssignAdminData(MainData, true);
      cc.systemEvent.emit("AssignProfileData", false, false, false, true, false);
    } else if (MainData.roleType.includes("ProgramDirector")) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlVHlwZUVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiU3VjY2Vzc2Z1bCIsIlVzZXJOb3RGb3VuZCIsIkludmFsaWRFbWFpbFBhc3N3b3JkIiwiV2VudFdyb25nIiwiTGljZW5zZUludmFsaWQiLCJTdHVkZW50IiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsImRPQiIsImdyYWRlTGV2ZWwiLCJlbWFpbEFkZHJlc3MiLCJ0ZWFjaGVyTmFtZSIsImZhY2Vib29rUGFnZSIsImdhbWVzV29uIiwidGVzdHNUYWtlbiIsInRlc3RpbmdBdmVyYWdlIiwiZ2FtZUNhc2giLCJBY2Nlc3NUb2tlbiIsIlVwZGF0ZWRBdCIsInVzZXJJRCIsImF2YXRhcklkIiwiZGlzdHJpY3QiLCJyb2xlVHlwZSIsImN0b3IiLCJfbmFtZSIsIl9kb2IiLCJfZ3JhZGVMZXZlbCIsIl9lbWFpbEFkZHJlc3MiLCJfdGVhY2hlck5hbWUiLCJfZmFjZWJvb2tQYWdlIiwiX2dhbWVzV29uIiwiX3Rlc3RzVGFrZW4iLCJfdGVzdGluZ0F2ZXJhZ2UiLCJfZ2FtZUNhc2giLCJfYXZhdGFySWQiLCJfZGlzdHJpY3QiLCJfcm9sZVR5cGUiLCJUZWFjaGVyIiwic2Nob29sIiwiY2xhc3NUYXVnaHQiLCJjb250YWN0TnVtYmVyIiwiX3NjaG9vbCIsIl9jbGFzc1RhdWdodCIsIl9jb250YWN0TnVtYmVyIiwiX2FjY2Vzc1Rva2VuIiwiX3VwZGF0ZWRBdCIsIl91c2VySUQiLCJQcm9ncmFtQW1iYXNzYWRvcnMiLCJhZGRyZXNzIiwiX2FkZHJlc3MiLCJTY2hvb2xBZG1pbmlzdHJhdG9ycyIsInNjaG9vbE5hbWUiLCJfc2Nob29sTmFtZSIsIlByb2dyYW1EaXJlY3RvcnMiLCJTZXJ2ZXJCYWNrZW5kIiwiQ29tcG9uZW50IiwiU3R1ZGVudERhdGEiLCJ0eXBlIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlRlYWNoZXJEYXRhIiwiTWVudG9yRGF0YSIsIkFkbWluRGF0YSIsIkRpcmVjdG9yRGF0YSIsIlJlc3BvbnNlVHlwZSIsImRpc3BsYXlOYW1lIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJnYW1lIiwicmVtb3ZlUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIm9uTG9hZCIsImFkZFBlcnNpc3RSb290Tm9kZSIsImdldFVzZXJBUEkiLCJsb2dpblVzZXJBUEkiLCJVcGRhdGVVc2VyRGF0YUFQSSIsIkdldFVzZXJEYXRhIiwiX2VtYWlsIiwiX3JvbGUiLCJfc3ViVHlwZSIsInBheWxvYWQiLCJVc2VyUGF5bG9hZCIsImhlYWRlciIsIkF1dGhvcml6YXRpb24iLCJDYWxsUkVTVEFQSSIsIkxvZ2luVXNlciIsIl9wYXNzd29yZCIsIl9saWNlbnNlIiwiVXNlckxvZ2luUGF5bG9hZCIsIlVwZGF0ZVVzZXJEYXRhIiwiX2Nhc2giLCJfZ2FtZVdvbiIsIl9hdmF0YXJJRCIsIl9tYWluRGF0YSIsIkpTT04iLCJwYXJzZSIsIndpbmRvdyIsIkFsbERhdGEiLCJTZW5kaW5nUGF5bG9hZCIsIlVzZXJEYXRhVXBkYXRlUGF5bG9hZCIsIlNLIiwicGFzc3dvcmQiLCJyb2xlIiwiZG9CIiwiZmJQYWdlIiwidGVzdFRha2VuIiwiaW5HYW1lQ2FzaCIsImFkZGVkQnlFbWFpbCIsInRvU3RyaW5nIiwiY29uc29sZSIsImxvZyIsInVzZXJUb2tlbiIsImVycm9yIiwiRmV0Y2giLCJfdXJsIiwiX21ldGhvZCIsIl9yZXF1ZXN0Qm9keSIsIl9oZWFkZXJzIiwiZmV0Y2giLCJoZWFkZXJzIiwibWV0aG9kIiwiYm9keSIsInN0cmluZ2lmeSIsIl90eXBlIiwiRmV0Y2hfUHJvbWlzZSIsIlJlc3BvbnNlIiwianNvbiIsIlRlbXBEYXRhIiwiTWFpbkRhdGEiLCJVc2VyRGF0YVJlc3BvbnNlIiwic3RhdHVzQ29kZSIsIm1lc3NhZ2UiLCJkYXRhIiwiaW5jbHVkZXMiLCJzeXN0ZW1FdmVudCIsImVtaXQiLCJBc3NpZ25TdHVkZW50RGF0YSIsIkFzc2lnblRlYWNoZXJEYXRhIiwiQXNzaWduTWVudG9yRGF0YSIsIkFzc2lnbkFkbWluRGF0YSIsIkFzc2lnbkRpcmVjdG9yRGF0YSIsIkRhdGFSZXNwb25zZSIsImlzTG9nZ2VkSW4iLCJ1cGRhdGVkQXQiLCJzdGFydCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsImVtYWlsIiwiRGF0YSIsIkxTSyIsImNyZWF0ZWRBdCIsImlzRGVsZXRlZCIsIlRhYmxlTmFtZSIsIlBLIiwiVW5pcXVlS2V5IiwiX3N0YXR1c0NvZGUiLCJfbWVzc2FnZSIsIl9kYXRhIiwibGljZW5zZSIsImFkbWluRW1haWwiLCJhZG1pblJvbGUiLCJfZmJQYWdlIiwiX3Rlc3RUYWtlbiIsIl9pbkdhbWVDYXNoIiwiX2FkbWluRW1haWwiLCJfYWRtaW5Sb2xlIiwiX2FkZGVkQnlFbWFpbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsZ0JBQWdCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzdCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEdUI7QUFFN0JDLEVBQUFBLFVBQVUsRUFBRSxDQUZpQjtBQUc3QkMsRUFBQUEsWUFBWSxFQUFFLENBSGU7QUFJN0JDLEVBQUFBLG9CQUFvQixFQUFFLENBSk87QUFLN0JDLEVBQUFBLFNBQVMsRUFBRSxDQUxrQjtBQU03QkMsRUFBQUEsY0FBYyxFQUFFO0FBTmEsQ0FBUixDQUF2QixFQVFBOztBQUNBLElBQUlDLE9BQU8sR0FBR1IsRUFBRSxDQUFDUyxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxTQURlO0FBRXJCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkQsSUFBQUEsSUFBSSxFQUFFLEVBREk7QUFFVkUsSUFBQUEsR0FBRyxFQUFFLEVBRks7QUFHVkMsSUFBQUEsVUFBVSxFQUFFLEVBSEY7QUFJVkMsSUFBQUEsWUFBWSxFQUFFLEVBSko7QUFLVkMsSUFBQUEsV0FBVyxF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QUFBLFFBSkFDLFVBSUE7QUFKQUEsTUFBQUEsVUFJQSxHQUphLEVBSWI7QUFBQTs7QUFBQSxRQUhBQyxhQUdBO0FBSEFBLE1BQUFBLGFBR0EsR0FIZ0IsRUFHaEI7QUFBQTs7QUFBQSxRQUZBbEgsV0FFQTtBQUZBQSxNQUFBQSxXQUVBLEdBRmMsRUFFZDtBQUFBOztBQUFBLFFBREF5QyxTQUNBO0FBREFBLE1BQUFBLFNBQ0EsR0FEWSxFQUNaO0FBQUE7O0FBQ0EsU0FBS3NELEtBQUwsR0FBYXJFLE1BQWI7QUFDQSxTQUFLd0IsUUFBTCxHQUFnQmYsU0FBaEI7QUFDQSxTQUFLakYsSUFBTCxHQUFZa0IsS0FBWjtBQUNBLFNBQUsrRSxJQUFMLEdBQVl4QixLQUFaO0FBQ0EsU0FBS3lCLEdBQUwsR0FBVy9FLElBQVg7QUFDQSxTQUFLaEIsVUFBTCxHQUFrQmlCLFdBQWxCO0FBQ0EsU0FBS2YsV0FBTCxHQUFtQmlCLFlBQW5CO0FBQ0EsU0FBSzZFLE1BQUwsR0FBY3dELE9BQWQ7QUFDQSxTQUFLcEosUUFBTCxHQUFnQmlCLFNBQWhCO0FBQ0EsU0FBSzRFLFNBQUwsR0FBaUJ3RCxVQUFqQjtBQUNBLFNBQUs3SSxRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtwQixjQUFMLEdBQXNCaUIsZUFBdEI7QUFDQSxTQUFLMkUsVUFBTCxHQUFrQndELFdBQWxCO0FBQ0EsU0FBS0osVUFBTCxHQUFrQkssV0FBbEI7QUFDQSxTQUFLSixTQUFMLEdBQWlCSyxVQUFqQjtBQUNBLFNBQUt6RCxZQUFMLEdBQW9CMEQsYUFBcEI7QUFDQSxTQUFLbkgsVUFBTCxHQUFrQkMsV0FBbEI7QUFDQSxTQUFLaEMsUUFBTCxHQUFnQnlFLFNBQWhCO0FBQ0Q7QUE3RGtDLENBQVQsQ0FBNUI7QUFnRUEwRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJsSCxhQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJlc3BvbnNlVHlwZUVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFN1Y2Nlc3NmdWw6IDEsXHJcbiAgVXNlck5vdEZvdW5kOiAyLFxyXG4gIEludmFsaWRFbWFpbFBhc3N3b3JkOiAzLFxyXG4gIFdlbnRXcm9uZzogNCxcclxuICBMaWNlbnNlSW52YWxpZDogNSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdHVkZW50IERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0dWRlbnQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdHVkZW50XCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGRPQjogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGZhY2Vib29rUGFnZTogXCJcIixcclxuICAgIGdhbWVzV29uOiAwLFxyXG4gICAgdGVzdHNUYWtlbjogMCxcclxuICAgIHRlc3RpbmdBdmVyYWdlOiAwLFxyXG4gICAgZ2FtZUNhc2g6IDAsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZG9iID0gXCJub25lXCIsIF9ncmFkZUxldmVsID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX3RlYWNoZXJOYW1lID0gXCJub25lXCIsIF9mYWNlYm9va1BhZ2UgPSBcIm5vbmVcIiwgX2dhbWVzV29uID0gMCwgX3Rlc3RzVGFrZW4gPSAwLCBfdGVzdGluZ0F2ZXJhZ2UgPSAwLCBfZ2FtZUNhc2ggPSAwLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuZE9CID0gX2RvYjtcclxuICAgIHRoaXMuZ3JhZGVMZXZlbCA9IF9ncmFkZUxldmVsO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy50ZWFjaGVyTmFtZSA9IF90ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuZmFjZWJvb2tQYWdlID0gX2ZhY2Vib29rUGFnZTtcclxuICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICB0aGlzLnRlc3RzVGFrZW4gPSBfdGVzdHNUYWtlbjtcclxuICAgIHRoaXMudGVzdGluZ0F2ZXJhZ2UgPSBfdGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLmdhbWVDYXNoID0gX2dhbWVDYXNoO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFRlYWNoZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBUZWFjaGVyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVGVhY2hlclwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBzY2hvb2w6IFwiXCIsXHJcbiAgICBjbGFzc1RhdWdodDogMCxcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9zY2hvb2wgPSBcIm5vbmVcIiwgX2NsYXNzVGF1Z2h0ID0gMCwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5zY2hvb2wgPSBfc2Nob29sO1xyXG4gICAgdGhpcy5jbGFzc1RhdWdodCA9IF9jbGFzc1RhdWdodDtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIEFtYmFzc2Fkb3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgUHJvZ3JhbUFtYmFzc2Fkb3JzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUHJvZ3JhbUFtYmFzc2Fkb3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZ1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hZGRyZXNzID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuYWRkcmVzcyA9IF9hZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTY2hvb2wgQWRtaW5pc3RyYXRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBTY2hvb2xBZG1pbmlzdHJhdG9ycyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNjaG9vbEFkbWluaXN0cmF0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfc2Nob29sTmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnNjaG9vbE5hbWUgPSBfc2Nob29sTmFtZTtcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIERpcmVjdG9ycyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFByb2dyYW1EaXJlY3RvcnMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQcm9ncmFtRGlyZWN0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZXJ2ZXJCYWNrZW5kLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZXJ2ZXJCYWNrZW5kID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VydmVyQmFja2VuZFwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBTdHVkZW50RGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBTdHVkZW50LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gc3R1ZGVudCBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgVGVhY2hlckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVGVhY2hlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHRlYWNoZXIgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIE1lbnRvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbUFtYmFzc2Fkb3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gTWVudG9yIC8gUHJvZ3JhbUFtYmFzc2Fkb3JzICBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgQWRtaW5EYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFNjaG9vbEFkbWluaXN0cmF0b3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gU2Nob29sQWRtaW5pc3RyYXRvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBEaXJlY3RvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbURpcmVjdG9ycyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIFByb2dyYW1EaXJlY3RvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBSZXNwb25zZVR5cGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzcG9uc2VcIixcclxuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlRW51bSxcclxuICAgICAgZGVmYXVsdDogUmVzcG9uc2VUeXBlRW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVzcG9uc2VUeXBlIGNhdG9nb3J5IGZvciBhcGknc1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGlmICghU2VydmVyQmFja2VuZC5JbnN0YW5jZSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlID0gdGhpcztcclxuICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YSA9IG5ldyBTdHVkZW50KCk7XHJcbiAgICAgIC8vICBjb25zb2xlLmVycm9yKFwiY3JlYXRpbmcgaW5zdGFuY2UgXCIgKyB0aGlzLm5vZGUubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9wcml2YXRlIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5nZXRVc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2dldFVzZXJcIjtcclxuICAgIHRoaXMubG9naW5Vc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2xvZ2luVXNlclwiO1xyXG4gICAgdGhpcy5VcGRhdGVVc2VyRGF0YUFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi91cGRhdGVVc2VyXCI7XHJcbiAgICAvL1VDSzJTUjRZTUc3SlxyXG4gICAgLy8gdGhpcy5HZXRVc2VyRGF0YShcInh0cm9uZGV2QGdtYWlsLmNvbVwiLFwiU3R1ZGVudFwiKTtcclxuICB9LFxyXG5cclxuICBHZXRVc2VyRGF0YShfZW1haWwsIF9yb2xlLCBfYWNjZXNzVG9rZW4sIF9zdWJUeXBlID0gLTEpIHtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJQYXlsb2FkKF9lbWFpbCwgX3JvbGUpO1xyXG4gICAgdmFyIGhlYWRlciA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsIEF1dGhvcml6YXRpb246IF9hY2Nlc3NUb2tlbiB9O1xyXG4gICAgdGhpcy5DYWxsUkVTVEFQSSh0aGlzLmdldFVzZXJBUEksIFwiUE9TVFwiLCBwYXlsb2FkLCAxLCBoZWFkZXIsIF9zdWJUeXBlKTtcclxuICB9LFxyXG5cclxuICBMb2dpblVzZXIoX2VtYWlsLCBfcGFzc3dvcmQsIF9yb2xlLCBfbGljZW5zZSkge1xyXG4gICAgdmFyIHBheWxvYWQgPSBuZXcgVXNlckxvZ2luUGF5bG9hZChfZW1haWwsIF9wYXNzd29yZCwgX3JvbGUsIF9saWNlbnNlKTtcclxuICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5sb2dpblVzZXJBUEksIFwiUE9TVFwiLCBwYXlsb2FkLCAyLCBudWxsLCAtMSk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVXNlckRhdGEoX2Nhc2ggPSAtMSwgX2dhbWVXb24gPSAtMSwgX2F2YXRhcklEID0gLTEpIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSBKU09OLnBhcnNlKHdpbmRvdy5BbGxEYXRhKTtcclxuXHJcbiAgICBpZiAoX21haW5EYXRhICE9IG51bGwpIHtcclxuICAgICAgdmFyIFNlbmRpbmdQYXlsb2FkID0gbmV3IFVzZXJEYXRhVXBkYXRlUGF5bG9hZChcclxuICAgICAgICBfbWFpbkRhdGEuU0ssXHJcbiAgICAgICAgX21haW5EYXRhLnBhc3N3b3JkLFxyXG4gICAgICAgIF9tYWluRGF0YS5uYW1lLFxyXG4gICAgICAgIF9tYWluRGF0YS5yb2xlLFxyXG4gICAgICAgIF9tYWluRGF0YS5kb0IsXHJcbiAgICAgICAgX21haW5EYXRhLmdyYWRlTGV2ZWwsXHJcbiAgICAgICAgX21haW5EYXRhLnRlYWNoZXJOYW1lLFxyXG4gICAgICAgIF9tYWluRGF0YS5mYlBhZ2UsXHJcbiAgICAgICAgX21haW5EYXRhLmdhbWVzV29uLFxyXG4gICAgICAgIF9tYWluRGF0YS50ZXN0VGFrZW4sXHJcbiAgICAgICAgX21haW5EYXRhLmRpc3RyaWN0LFxyXG4gICAgICAgIF9tYWluRGF0YS50ZXN0aW5nQXZlcmFnZSxcclxuICAgICAgICBfbWFpbkRhdGEuaW5HYW1lQ2FzaCxcclxuICAgICAgICBcIm11YmVlbmFsaUBnbWFpbC5jb21cIixcclxuICAgICAgICBcIlNjaG9vbEFkbWluXCIsXHJcbiAgICAgICAgX21haW5EYXRhLmFkZGVkQnlFbWFpbCxcclxuICAgICAgICBfbWFpbkRhdGEuc2Nob29sTmFtZSxcclxuICAgICAgICBfbWFpbkRhdGEuYXZhdGFySWRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChfY2FzaCAhPSAtMSkge1xyXG4gICAgICAgIFNlbmRpbmdQYXlsb2FkLmluR2FtZUNhc2ggPSBfY2FzaDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoX2dhbWVXb24gIT0gLTEpIHtcclxuICAgICAgICBTZW5kaW5nUGF5bG9hZC5nYW1lc1dvbiA9IF9nYW1lV29uO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChfYXZhdGFySUQgIT0gLTEpIHtcclxuICAgICAgICBTZW5kaW5nUGF5bG9hZC5hdmF0YXJJZCA9IF9hdmF0YXJJRC50b1N0cmluZygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhTZW5kaW5nUGF5bG9hZCk7XHJcbiAgICAgIHZhciBwYXlsb2FkID0gU2VuZGluZ1BheWxvYWQ7XHJcbiAgICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfbWFpbkRhdGEudXNlclRva2VuIH07XHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5VcGRhdGVVc2VyRGF0YUFQSSwgXCJQVVRcIiwgcGF5bG9hZCwgMywgaGVhZGVyLCAtMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiY2Fubm90IHVwZGF0ZSBkYXRhIGFzIHN0b3JlZCBkYXRhIGlzIG51bGxcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRmV0Y2goX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyA9IG51bGwpIHtcclxuICAgIGlmIChfbWV0aG9kID09IFwiR0VUXCIpIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJoZWFkZXIgaXMgbnVsbFwiKTtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoX3JlcXVlc3RCb2R5KTtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogX2hlYWRlcnMsXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FsbFJFU1RBUEkoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfdHlwZSwgX2hlYWRlcnMgPSBudWxsLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICBGZXRjaF9Qcm9taXNlKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMpO1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gRmV0Y2hfUHJvbWlzZShfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzID0gbnVsbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciBSZXNwb25zZSA9IGF3YWl0IFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuRmV0Y2goX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICAgICAgdmFyIFRlbXBEYXRhID0gYXdhaXQgUmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAoX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgLy9nZXR0aW5nIHVzZXIgZGF0YVxyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgICBpZiAoX3N1YlR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAvL3JldHVybiBkYXRhIHRvIHN0b3JhZ2UgY2xhc3NcclxuICAgICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJTVUNDRVNTXCIpIHx8IE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IGRhdGEgc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgLy9ib3RoIGJlbG93IGNhbGxzIGFyZSB3cml0dGVuIGluc2lkZSBzdG9yZ2FlbWFuYWdlclxyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJXcml0ZURhdGFcIiwgTWFpbkRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJSZWZyZXNoRGF0YVwiLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgLy9sb2dpbiB1c2VyXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwic3VjZXNzZnVsbHlcIikpIHtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuICAgICAgICAgICAgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25TdHVkZW50RGF0YShNYWluRGF0YS5kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJUZWFjaGVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25UZWFjaGVyRGF0YShNYWluRGF0YS5kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtQW1iYXNzYWRvclwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduTWVudG9yRGF0YShNYWluRGF0YS5kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTY2hvb2xBZG1pblwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduQWRtaW5EYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1EaXJlY3RvclwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduRGlyZWN0b3JEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIndyb25nXCIpIHx8IE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJjaGFyYWN0ZXJzXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5JbnZhbGlkRW1haWxQYXNzd29yZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiRGF0YSBub3QgRm91bmQhXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5Vc2VyTm90Rm91bmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlBhc3N3b3JkIHNob3VsZCBjb250YWluIGF0bGVhc3Qgb25lIEludGVnZXJcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJTY2hvb2wgTGljZW5zZSBpcyBub3QgdmFsaWQgY29udGFjdCBBZG1pbiFcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkxpY2Vuc2VJbnZhbGlkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgLy9sb2dpbiB1c2VyIGVycm9yXHJcbiAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uV2VudFdyb25nO1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnV2UgZG8gY2xlYW51cCBoZXJlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vI3JlZ2lvbiBDb21tZW50ZWRcclxuICAgIC8vIGZldGNoKFxyXG4gICAgLy8gICAgIF91cmwsXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAvLyAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgIC8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgKVxyXG4gICAgLy8gICAudGhlbihyZXNwb25zZT0+e1xyXG4gICAgLy8gICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YT0+e1xyXG4gICAgLy8gICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgLy8gICAgICAgICAvL3JldHVybiBkYXRhO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9KVxyXG4gICAgLy8gICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuICB9LFxyXG5cclxuICBBc3NpZ25TdHVkZW50RGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIC8vY29uc29sZS5lcnJvcihEYXRhUmVzcG9uc2UpO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmRPQiA9IERhdGFSZXNwb25zZS5kb0I7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmdyYWRlTGV2ZWwgPSBEYXRhUmVzcG9uc2UuZ3JhZGVMZXZlbDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS50ZWFjaGVyTmFtZSA9IERhdGFSZXNwb25zZS50ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZmFjZWJvb2tQYWdlID0gRGF0YVJlc3BvbnNlLmZiUGFnZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBEYXRhUmVzcG9uc2UuZ2FtZXNXb247XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnRlc3RzVGFrZW4gPSBEYXRhUmVzcG9uc2UudGVzdFRha2VuO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS50ZXN0aW5nQXZlcmFnZSA9IERhdGFSZXNwb25zZS50ZXN0aW5nQXZlcmFnZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBEYXRhUmVzcG9uc2UuaW5HYW1lQ2FzaDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLnVzZXJJRDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLlN0dWRlbnREYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuU3R1ZGVudERhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnblRlYWNoZXJEYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLnNjaG9vbCA9IERhdGFSZXNwb25zZS5zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5jbGFzc1RhdWdodCA9IERhdGFSZXNwb25zZS5jbGFzc1RhdWdodDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5jb250YWN0TnVtYmVyID0gRGF0YVJlc3BvbnNlLmNvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS51c2VySUQ7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5UZWFjaGVyRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuVGVhY2hlckRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlRlYWNoZXJEYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25NZW50b3JEYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS51c2VySUQ7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuYWRkcmVzcyA9IERhdGFSZXNwb25zZS5hZGRyZXNzO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuTWVudG9yRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuTWVudG9yRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuTWVudG9yRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduQWRtaW5EYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5BZG1pbkRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLnVzZXJJRDtcclxuICAgIHRoaXMuQWRtaW5EYXRhLnNjaG9vbE5hbWUgPSBEYXRhUmVzcG9uc2Uuc2Nob29sTmFtZTtcclxuICAgIHRoaXMuQWRtaW5EYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLkFkbWluRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuQWRtaW5EYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5BZG1pbkRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRpcmVjdG9yRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLkRpcmVjdG9yRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5EaXJlY3RvckRhdGEpO1xyXG4gIH0sXHJcbiAgc3RhcnQoKSB7fSxcclxuXHJcbiAgUmVsb2dpbkZyb21TdG9yYWdlKE1haW5EYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseSBhdXRvbWF0aWNhbGx5XCIpO1xyXG4gICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiU3R1ZGVudFwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25TdHVkZW50RGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiVGVhY2hlclwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25UZWFjaGVyRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbUFtYmFzc2Fkb3JcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduTWVudG9yRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiU2Nob29sQWRtaW5cIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduQWRtaW5EYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtRGlyZWN0b3JcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduRGlyZWN0b3JEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBzZW5kaW5nIHBheWxvYWQgdG8gcmVjZWl2ZSBkYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJQYXlsb2FkXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9lbWFpbCA9IFwibm9uZVwiLCBfcm9sZSA9IFwibm9uZVwiKSB7XHJcbiAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgdGhpcy5yb2xlID0gX3JvbGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVXNlciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiRGF0YVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGluR2FtZUNhc2g6IFwiXCIsXHJcbiAgICBMU0s6IFwiXCIsXHJcbiAgICB1c2VyVG9rZW46IFwiXCIsXHJcbiAgICBjbGFzc1RhdWdodDogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBzY2hvb2xOYW1lOiBcIlwiLFxyXG4gICAgZ2FtZXNXb246IFwiXCIsXHJcbiAgICBjcmVhdGVkQXQ6IDAsXHJcbiAgICBpc0RlbGV0ZWQ6IGZhbHNlLFxyXG4gICAgVGFibGVOYW1lOiBcIlwiLFxyXG4gICAgZ3JhZGVMZXZlbDogXCJcIixcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgZmJQYWdlOiBcIlwiLFxyXG4gICAgdXBkYXRlZEF0OiAwLFxyXG4gICAgdGVhY2hlck5hbWU6IFwiXCIsXHJcbiAgICBkb0I6IFwiXCIsXHJcbiAgICBTSzogXCJcIixcclxuICAgIHRlc3RUYWtlbjogXCJcIixcclxuICAgIFBLOiBcIlwiLFxyXG4gICAgdGVzdGluZ0F2ZXJhZ2U6IFwiXCIsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBhZGRlZEJ5RW1haWw6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIFVuaXF1ZUtleTogXCJcIixcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXJvb3QgY2xhc3Mgb2YgcmVzcG9uc2UgcmVjZWl2ZWQgd2hlbiBnZXR0aW5nIHVzZXIgYXBpIGlzIGhpdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckRhdGFSZXNwb25zZSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJEYXRhUmVzcG9uc2VcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBzdGF0dXNDb2RlOiBcIlwiLFxyXG4gICAgbWVzc2FnZTogXCJcIixcclxuICAgIGRhdGE6IERhdGEsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX3N0YXR1c0NvZGUgPSBcIm5vbmVcIiwgX21lc3NhZ2UgPSBcIm5vbmVcIiwgX2RhdGEgPSBudWxsKSB7XHJcbiAgICB0aGlzLnN0YXR1c0NvZGUgPSBfc3RhdHVzQ29kZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IF9tZXNzYWdlO1xyXG4gICAgdGhpcy5kYXRhID0gX2RhdGE7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3Igc2VuZGluZyBwYXlsb2FkIHRvIGxvZ2luIHVzZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJMb2dpblBheWxvYWQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyTG9naW5QYXlsb2FkXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICBwYXNzd29yZDogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgICBsaWNlbnNlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9lbWFpbCA9IFwibm9uZVwiLCBfcGFzc3dvcmQgPSBcIm5vbmVcIiwgX3JvbGUgPSBcIm5vbmVcIiwgX2xpY2Vuc2UgPSBcIm5vbmVcIikge1xyXG4gICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBfcGFzc3dvcmQ7XHJcbiAgICB0aGlzLnJvbGUgPSBfcm9sZTtcclxuICAgIHRoaXMubGljZW5zZSA9IF9saWNlbnNlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFVzZXJEYXRhVXBkYXRlUGF5bG9hZC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckRhdGFVcGRhdGVQYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlckRhdGFVcGRhdGVQYXlsb2FkXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICBwYXNzd29yZDogXCJcIixcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gICAgZG9COiBcIlwiLFxyXG4gICAgZ3JhZGVMZXZlbDogXCJcIixcclxuICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgZmJQYWdlOiBcIlwiLFxyXG4gICAgZ2FtZXNXb246IFwiXCIsXHJcbiAgICB0ZXN0VGFrZW46IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHRlc3RpbmdBdmVyYWdlOiBcIlwiLFxyXG4gICAgaW5HYW1lQ2FzaDogXCJcIixcclxuICAgIGFkbWluRW1haWw6IFwiXCIsXHJcbiAgICBhZG1pblJvbGU6IFwiXCIsXHJcbiAgICBhZGRlZEJ5RW1haWw6IFwiXCIsXHJcbiAgICBzY2hvb2xOYW1lOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoXHJcbiAgICBfZW1haWwgPSBcIm5vbmVcIixcclxuICAgIF9wYXNzd29yZCA9IFwibm9uZVwiLFxyXG4gICAgX25hbWUgPSBcIlwiLFxyXG4gICAgX3JvbGUgPSBcIm5vbmVcIixcclxuICAgIF9kb2IgPSBcIlwiLFxyXG4gICAgX2dyYWRlTGV2ZWwgPSBcIlwiLFxyXG4gICAgX3RlYWNoZXJOYW1lID0gXCJcIixcclxuICAgIF9mYlBhZ2UgPSBcIlwiLFxyXG4gICAgX2dhbWVzV29uID0gXCJcIixcclxuICAgIF90ZXN0VGFrZW4gPSBcIlwiLFxyXG4gICAgX2Rpc3RyaWN0ID0gXCJcIixcclxuICAgIF90ZXN0aW5nQXZlcmFnZSA9IFwiXCIsXHJcbiAgICBfaW5HYW1lQ2FzaCA9IFwiXCIsXHJcbiAgICBfYWRtaW5FbWFpbCA9IFwiXCIsXHJcbiAgICBfYWRtaW5Sb2xlID0gXCJcIixcclxuICAgIF9hZGRlZEJ5RW1haWwgPSBcIlwiLFxyXG4gICAgX3NjaG9vbE5hbWUgPSBcIlwiLFxyXG4gICAgX2F2YXRhcklEID0gXCJcIlxyXG4gICkge1xyXG4gICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBfcGFzc3dvcmQ7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMucm9sZSA9IF9yb2xlO1xyXG4gICAgdGhpcy5kb0IgPSBfZG9iO1xyXG4gICAgdGhpcy5ncmFkZUxldmVsID0gX2dyYWRlTGV2ZWw7XHJcbiAgICB0aGlzLnRlYWNoZXJOYW1lID0gX3RlYWNoZXJOYW1lO1xyXG4gICAgdGhpcy5mYlBhZ2UgPSBfZmJQYWdlO1xyXG4gICAgdGhpcy5nYW1lc1dvbiA9IF9nYW1lc1dvbjtcclxuICAgIHRoaXMudGVzdFRha2VuID0gX3Rlc3RUYWtlbjtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnRlc3RpbmdBdmVyYWdlID0gX3Rlc3RpbmdBdmVyYWdlO1xyXG4gICAgdGhpcy5pbkdhbWVDYXNoID0gX2luR2FtZUNhc2g7XHJcbiAgICB0aGlzLmFkbWluRW1haWwgPSBfYWRtaW5FbWFpbDtcclxuICAgIHRoaXMuYWRtaW5Sb2xlID0gX2FkbWluUm9sZTtcclxuICAgIHRoaXMuYWRkZWRCeUVtYWlsID0gX2FkZGVkQnlFbWFpbDtcclxuICAgIHRoaXMuc2Nob29sTmFtZSA9IF9zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJRDtcclxuICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2VydmVyQmFja2VuZDtcclxuIl19