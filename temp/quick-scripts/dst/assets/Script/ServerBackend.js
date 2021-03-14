
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

exports.__esModule = true;
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var IsWeb = true;
var OnMobile = false; //-------------------------------------------enumeration for type of business-------------------------//

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
    //
    //fetch(this.getUserAPI);
    //var _options = { params: null, url: "" };
    // this.sendPostRequest();
  },
  sendPostRequest: function sendPostRequest() {
    var http = new XMLHttpRequest();
    var request_url = this.loginUserAPI;
    var params = "";
    var payload = new UserLoginPayload("xtrondev@gmail.com", "12345678", "Student", "UCK2SR4YMG7J");

    var _json = JSON.stringify(payload);

    http.open("POST", request_url, true); //  http.setB(_json);

    http.setRequestHeader("Content-type", "application/json; charset=utf-8");

    http.onreadystatechange = function () {
      var httpStatus = http.statusText; // console.log(httpStatus);

      if (http.responseText) {
        var responseJSON = eval("(" + http.responseText + ")");
      } else {
        var responseJSON = {};
      }

      console.log("rec");
      console.log(responseJSON.statusCode);
      console.log(responseJSON.message);
      console.log(responseJSON.data);

      switch (http.readyState) {
        case 4:
          console.log(responseJSON);

          var _data = JSON.stringify(responseJSON);

          console.log(_data);
      }
    };

    http.send(_json);
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

    var _mainData;

    if (IsWeb) {
      _mainData = JSON.parse(window.AllData);
    } else {
      _mainData = JSON.parse(cc.sys.localStorage.getItem("userData"));
    }

    if (_mainData.roleType == "Student") {
      if (_mainData != null) {
        var SendingPayload = new UserDataUpdatePayload(_mainData.SK, _mainData.password, _mainData.name, _mainData.roleType, _mainData.doB, _mainData.gradeLevel, _mainData.teacherName, _mainData.fbPage, _mainData.gamesWon, _mainData.testTaken, _mainData.district, _mainData.testingAverage, _mainData.inGameCash, "programdirector@gmail.com", "ProgramDirector", _mainData.addedByEmail, _mainData.schoolName, _mainData.avatarId);

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
    } else {
      console.log("not student");
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
                  } else if (MainData.message.includes("School License is not valid contact Admin!") || MainData.message.includes("School License Does not exist!")) {
                    ServerBackend.Instance.ResponseType = ResponseTypeEnum.LicenseInvalid;
                    cc.systemEvent.emit("AssignProfileData");
                  }
                } else if (_type == 3) {
                  MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
                  console.log(TempData);
                }

                _context.next = 16;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);

                if (_type == 2) {
                  //login user error
                  ServerBackend.Instance.ResponseType = ResponseTypeEnum.WentWrong;
                  cc.systemEvent.emit("AssignProfileData");
                }

                console.log("something goes bezaar");
                console.error(_context.t0.toString());

              case 16:
                _context.prev = 16;
                return _context.finish(16);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 11, 16, 18]]);
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
var _default = ServerBackend;
exports["default"] = _default;
module.exports = exports["default"];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIklzV2ViIiwiT25Nb2JpbGUiLCJSZXNwb25zZVR5cGVFbnVtIiwiY2MiLCJFbnVtIiwiTm9uZSIsIlN1Y2Nlc3NmdWwiLCJVc2VyTm90Rm91bmQiLCJJbnZhbGlkRW1haWxQYXNzd29yZCIsIldlbnRXcm9uZyIsIkxpY2Vuc2VJbnZhbGlkIiwiU3R1ZGVudCIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJkT0IiLCJncmFkZUxldmVsIiwiZW1haWxBZGRyZXNzIiwidGVhY2hlck5hbWUiLCJmYWNlYm9va1BhZ2UiLCJnYW1lc1dvbiIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiQWNjZXNzVG9rZW4iLCJVcGRhdGVkQXQiLCJ1c2VySUQiLCJhdmF0YXJJZCIsImRpc3RyaWN0Iiwicm9sZVR5cGUiLCJjdG9yIiwiX25hbWUiLCJfZG9iIiwiX2dyYWRlTGV2ZWwiLCJfZW1haWxBZGRyZXNzIiwiX3RlYWNoZXJOYW1lIiwiX2ZhY2Vib29rUGFnZSIsIl9nYW1lc1dvbiIsIl90ZXN0c1Rha2VuIiwiX3Rlc3RpbmdBdmVyYWdlIiwiX2dhbWVDYXNoIiwiX2F2YXRhcklkIiwiX2Rpc3RyaWN0IiwiX3JvbGVUeXBlIiwiVGVhY2hlciIsInNjaG9vbCIsImNsYXNzVGF1Z2h0IiwiY29udGFjdE51bWJlciIsIl9zY2hvb2wiLCJfY2xhc3NUYXVnaHQiLCJfY29udGFjdE51bWJlciIsIl9hY2Nlc3NUb2tlbiIsIl91cGRhdGVkQXQiLCJfdXNlcklEIiwiUHJvZ3JhbUFtYmFzc2Fkb3JzIiwiYWRkcmVzcyIsIl9hZGRyZXNzIiwiU2Nob29sQWRtaW5pc3RyYXRvcnMiLCJzY2hvb2xOYW1lIiwiX3NjaG9vbE5hbWUiLCJQcm9ncmFtRGlyZWN0b3JzIiwiU2VydmVyQmFja2VuZCIsIkNvbXBvbmVudCIsIlN0dWRlbnREYXRhIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJUZWFjaGVyRGF0YSIsIk1lbnRvckRhdGEiLCJBZG1pbkRhdGEiLCJEaXJlY3RvckRhdGEiLCJSZXNwb25zZVR5cGUiLCJkaXNwbGF5TmFtZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiZ2FtZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJvbkxvYWQiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJnZXRVc2VyQVBJIiwibG9naW5Vc2VyQVBJIiwiVXBkYXRlVXNlckRhdGFBUEkiLCJzZW5kUG9zdFJlcXVlc3QiLCJodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJyZXF1ZXN0X3VybCIsInBhcmFtcyIsInBheWxvYWQiLCJVc2VyTG9naW5QYXlsb2FkIiwiX2pzb24iLCJKU09OIiwic3RyaW5naWZ5Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJodHRwU3RhdHVzIiwic3RhdHVzVGV4dCIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlSlNPTiIsImV2YWwiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzQ29kZSIsIm1lc3NhZ2UiLCJkYXRhIiwicmVhZHlTdGF0ZSIsIl9kYXRhIiwic2VuZCIsIkdldFVzZXJEYXRhIiwiX2VtYWlsIiwiX3JvbGUiLCJfc3ViVHlwZSIsIlVzZXJQYXlsb2FkIiwiaGVhZGVyIiwiQXV0aG9yaXphdGlvbiIsIkNhbGxSRVNUQVBJIiwiTG9naW5Vc2VyIiwiX3Bhc3N3b3JkIiwiX2xpY2Vuc2UiLCJVcGRhdGVVc2VyRGF0YSIsIl9jYXNoIiwiX2dhbWVXb24iLCJfYXZhdGFySUQiLCJfbWFpbkRhdGEiLCJwYXJzZSIsIndpbmRvdyIsIkFsbERhdGEiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiU2VuZGluZ1BheWxvYWQiLCJVc2VyRGF0YVVwZGF0ZVBheWxvYWQiLCJTSyIsInBhc3N3b3JkIiwiZG9CIiwiZmJQYWdlIiwidGVzdFRha2VuIiwiaW5HYW1lQ2FzaCIsImFkZGVkQnlFbWFpbCIsInRvU3RyaW5nIiwidXNlclRva2VuIiwiZXJyb3IiLCJGZXRjaCIsIl91cmwiLCJfbWV0aG9kIiwiX3JlcXVlc3RCb2R5IiwiX2hlYWRlcnMiLCJmZXRjaCIsImhlYWRlcnMiLCJtZXRob2QiLCJib2R5IiwiX3R5cGUiLCJGZXRjaF9Qcm9taXNlIiwiUmVzcG9uc2UiLCJqc29uIiwiVGVtcERhdGEiLCJNYWluRGF0YSIsIlVzZXJEYXRhUmVzcG9uc2UiLCJpbmNsdWRlcyIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIkFzc2lnblN0dWRlbnREYXRhIiwiQXNzaWduVGVhY2hlckRhdGEiLCJBc3NpZ25NZW50b3JEYXRhIiwiQXNzaWduQWRtaW5EYXRhIiwiQXNzaWduRGlyZWN0b3JEYXRhIiwiRGF0YVJlc3BvbnNlIiwiaXNMb2dnZWRJbiIsInVwZGF0ZWRBdCIsInN0YXJ0IiwiUmVsb2dpbkZyb21TdG9yYWdlIiwiZW1haWwiLCJyb2xlIiwiRGF0YSIsIkxTSyIsImNyZWF0ZWRBdCIsImlzRGVsZXRlZCIsIlRhYmxlTmFtZSIsIlBLIiwiVW5pcXVlS2V5IiwiX3N0YXR1c0NvZGUiLCJfbWVzc2FnZSIsImxpY2Vuc2UiLCJhZG1pbkVtYWlsIiwiYWRtaW5Sb2xlIiwiX2ZiUGFnZSIsIl90ZXN0VGFrZW4iLCJfaW5HYW1lQ2FzaCIsIl9hZG1pbkVtYWlsIiwiX2FkbWluUm9sZSIsIl9hZGRlZEJ5RW1haWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEtBQUssR0FBRyxJQUFaO0FBQ0EsSUFBSUMsUUFBUSxHQUFDLEtBQWIsRUFDQTs7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDN0JDLEVBQUFBLElBQUksRUFBRSxDQUR1QjtBQUU3QkMsRUFBQUEsVUFBVSxFQUFFLENBRmlCO0FBRzdCQyxFQUFBQSxZQUFZLEVBQUUsQ0FIZTtBQUk3QkMsRUFBQUEsb0JBQW9CLEVBQUUsQ0FKTztBQUs3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QTs7QUFBQSxRQUxBQyxXQUtBO0FBTEFBLE1BQUFBLFdBS0EsR0FMYyxFQUtkO0FBQUE7O0FBQUEsUUFKQUMsVUFJQTtBQUpBQSxNQUFBQSxVQUlBLEdBSmEsRUFJYjtBQUFBOztBQUFBLFFBSEFDLGFBR0E7QUFIQUEsTUFBQUEsYUFHQSxHQUhnQixFQUdoQjtBQUFBOztBQUFBLFFBRkFySSxXQUVBO0FBRkFBLE1BQUFBLFdBRUEsR0FGYyxFQUVkO0FBQUE7O0FBQUEsUUFEQWlFLFNBQ0E7QUFEQUEsTUFBQUEsU0FDQSxHQURZLEVBQ1o7QUFBQTs7QUFDQSxTQUFLaUQsS0FBTCxHQUFhOUQsTUFBYjtBQUNBLFNBQUt3QixRQUFMLEdBQWdCaEIsU0FBaEI7QUFDQSxTQUFLMUcsSUFBTCxHQUFZa0IsS0FBWjtBQUNBLFNBQUsrSSxJQUFMLEdBQVk5RCxLQUFaO0FBQ0EsU0FBS3dCLEdBQUwsR0FBV3hHLElBQVg7QUFDQSxTQUFLaEIsVUFBTCxHQUFrQmlCLFdBQWxCO0FBQ0EsU0FBS2YsV0FBTCxHQUFtQmlCLFlBQW5CO0FBQ0EsU0FBS3NHLE1BQUwsR0FBY2tELE9BQWQ7QUFDQSxTQUFLdkssUUFBTCxHQUFnQmlCLFNBQWhCO0FBQ0EsU0FBS3FHLFNBQUwsR0FBaUJrRCxVQUFqQjtBQUNBLFNBQUtoSyxRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtwQixjQUFMLEdBQXNCaUIsZUFBdEI7QUFDQSxTQUFLb0csVUFBTCxHQUFrQmtELFdBQWxCO0FBQ0EsU0FBS0osVUFBTCxHQUFrQkssV0FBbEI7QUFDQSxTQUFLSixTQUFMLEdBQWlCSyxVQUFqQjtBQUNBLFNBQUtuRCxZQUFMLEdBQW9Cb0QsYUFBcEI7QUFDQSxTQUFLdEksVUFBTCxHQUFrQkMsV0FBbEI7QUFDQSxTQUFLaEMsUUFBTCxHQUFnQmlHLFNBQWhCO0FBQ0Q7QUE3RGtDLENBQVQsQ0FBNUI7ZUFnRWUvRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIElzV2ViID0gdHJ1ZTtcclxudmFyIE9uTW9iaWxlPWZhbHNlO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUmVzcG9uc2VUeXBlRW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgU3VjY2Vzc2Z1bDogMSxcclxuICBVc2VyTm90Rm91bmQ6IDIsXHJcbiAgSW52YWxpZEVtYWlsUGFzc3dvcmQ6IDMsXHJcbiAgV2VudFdyb25nOiA0LFxyXG4gIExpY2Vuc2VJbnZhbGlkOiA1LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdHVkZW50IERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0dWRlbnQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdHVkZW50XCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGRPQjogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGZhY2Vib29rUGFnZTogXCJcIixcclxuICAgIGdhbWVzV29uOiAwLFxyXG4gICAgdGVzdHNUYWtlbjogMCxcclxuICAgIHRlc3RpbmdBdmVyYWdlOiAwLFxyXG4gICAgZ2FtZUNhc2g6IDAsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZG9iID0gXCJub25lXCIsIF9ncmFkZUxldmVsID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX3RlYWNoZXJOYW1lID0gXCJub25lXCIsIF9mYWNlYm9va1BhZ2UgPSBcIm5vbmVcIiwgX2dhbWVzV29uID0gMCwgX3Rlc3RzVGFrZW4gPSAwLCBfdGVzdGluZ0F2ZXJhZ2UgPSAwLCBfZ2FtZUNhc2ggPSAwLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuZE9CID0gX2RvYjtcclxuICAgIHRoaXMuZ3JhZGVMZXZlbCA9IF9ncmFkZUxldmVsO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy50ZWFjaGVyTmFtZSA9IF90ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuZmFjZWJvb2tQYWdlID0gX2ZhY2Vib29rUGFnZTtcclxuICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICB0aGlzLnRlc3RzVGFrZW4gPSBfdGVzdHNUYWtlbjtcclxuICAgIHRoaXMudGVzdGluZ0F2ZXJhZ2UgPSBfdGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLmdhbWVDYXNoID0gX2dhbWVDYXNoO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFRlYWNoZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBUZWFjaGVyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVGVhY2hlclwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBzY2hvb2w6IFwiXCIsXHJcbiAgICBjbGFzc1RhdWdodDogMCxcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9zY2hvb2wgPSBcIm5vbmVcIiwgX2NsYXNzVGF1Z2h0ID0gMCwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5zY2hvb2wgPSBfc2Nob29sO1xyXG4gICAgdGhpcy5jbGFzc1RhdWdodCA9IF9jbGFzc1RhdWdodDtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIEFtYmFzc2Fkb3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgUHJvZ3JhbUFtYmFzc2Fkb3JzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUHJvZ3JhbUFtYmFzc2Fkb3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZ1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hZGRyZXNzID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuYWRkcmVzcyA9IF9hZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTY2hvb2wgQWRtaW5pc3RyYXRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBTY2hvb2xBZG1pbmlzdHJhdG9ycyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNjaG9vbEFkbWluaXN0cmF0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfc2Nob29sTmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnNjaG9vbE5hbWUgPSBfc2Nob29sTmFtZTtcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIERpcmVjdG9ycyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFByb2dyYW1EaXJlY3RvcnMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQcm9ncmFtRGlyZWN0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZXJ2ZXJCYWNrZW5kLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZXJ2ZXJCYWNrZW5kID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VydmVyQmFja2VuZFwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBTdHVkZW50RGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBTdHVkZW50LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gc3R1ZGVudCBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgVGVhY2hlckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVGVhY2hlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHRlYWNoZXIgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIE1lbnRvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbUFtYmFzc2Fkb3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gTWVudG9yIC8gUHJvZ3JhbUFtYmFzc2Fkb3JzICBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgQWRtaW5EYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFNjaG9vbEFkbWluaXN0cmF0b3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gU2Nob29sQWRtaW5pc3RyYXRvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBEaXJlY3RvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbURpcmVjdG9ycyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIFByb2dyYW1EaXJlY3RvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBSZXNwb25zZVR5cGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzcG9uc2VcIixcclxuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlRW51bSxcclxuICAgICAgZGVmYXVsdDogUmVzcG9uc2VUeXBlRW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVzcG9uc2VUeXBlIGNhdG9nb3J5IGZvciBhcGknc1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGlmICghU2VydmVyQmFja2VuZC5JbnN0YW5jZSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlID0gdGhpcztcclxuICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YSA9IG5ldyBTdHVkZW50KCk7XHJcbiAgICAgIC8vICBjb25zb2xlLmVycm9yKFwiY3JlYXRpbmcgaW5zdGFuY2UgXCIgKyB0aGlzLm5vZGUubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9wcml2YXRlIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5nZXRVc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2dldFVzZXJcIjtcclxuICAgIHRoaXMubG9naW5Vc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2xvZ2luVXNlclwiO1xyXG4gICAgdGhpcy5VcGRhdGVVc2VyRGF0YUFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi91cGRhdGVVc2VyXCI7XHJcbiAgICAvL1VDSzJTUjRZTUc3SlxyXG4gICAgLy8gdGhpcy5HZXRVc2VyRGF0YShcInh0cm9uZGV2QGdtYWlsLmNvbVwiLFwiU3R1ZGVudFwiKTtcclxuICAgIC8vXHJcbiAgICAvL2ZldGNoKHRoaXMuZ2V0VXNlckFQSSk7XHJcblxyXG4gICAgLy92YXIgX29wdGlvbnMgPSB7IHBhcmFtczogbnVsbCwgdXJsOiBcIlwiIH07XHJcbiAgICAvLyB0aGlzLnNlbmRQb3N0UmVxdWVzdCgpO1xyXG4gIH0sXHJcblxyXG4gIHNlbmRQb3N0UmVxdWVzdCgpIHtcclxuICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgcmVxdWVzdF91cmwgPSB0aGlzLmxvZ2luVXNlckFQSTtcclxuXHJcbiAgICB2YXIgcGFyYW1zID0gXCJcIjtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJMb2dpblBheWxvYWQoXCJ4dHJvbmRldkBnbWFpbC5jb21cIiwgXCIxMjM0NTY3OFwiLCBcIlN0dWRlbnRcIiwgXCJVQ0syU1I0WU1HN0pcIik7XHJcbiAgICB2YXIgX2pzb24gPSBKU09OLnN0cmluZ2lmeShwYXlsb2FkKTtcclxuICAgIGh0dHAub3BlbihcIlBPU1RcIiwgcmVxdWVzdF91cmwsIHRydWUpO1xyXG4gICAgLy8gIGh0dHAuc2V0QihfanNvbik7XHJcbiAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xyXG5cclxuICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaHR0cFN0YXR1cyA9IGh0dHAuc3RhdHVzVGV4dDtcclxuICAgICAgLy8gY29uc29sZS5sb2coaHR0cFN0YXR1cyk7XHJcbiAgICAgIGlmIChodHRwLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT04gPSBldmFsKFwiKFwiICsgaHR0cC5yZXNwb25zZVRleHQgKyBcIilcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlSlNPTiA9IHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcInJlY1wiKTtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VKU09OLnN0YXR1c0NvZGUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04ubWVzc2FnZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlSlNPTi5kYXRhKTtcclxuICAgICAgc3dpdGNoIChodHRwLnJlYWR5U3RhdGUpIHtcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04pO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGh0dHAuc2VuZChfanNvbik7XHJcbiAgfSxcclxuXHJcbiAgR2V0VXNlckRhdGEoX2VtYWlsLCBfcm9sZSwgX2FjY2Vzc1Rva2VuLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICB2YXIgcGF5bG9hZCA9IG5ldyBVc2VyUGF5bG9hZChfZW1haWwsIF9yb2xlKTtcclxuICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfYWNjZXNzVG9rZW4gfTtcclxuICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5nZXRVc2VyQVBJLCBcIlBPU1RcIiwgcGF5bG9hZCwgMSwgaGVhZGVyLCBfc3ViVHlwZSk7XHJcbiAgfSxcclxuXHJcbiAgTG9naW5Vc2VyKF9lbWFpbCwgX3Bhc3N3b3JkLCBfcm9sZSwgX2xpY2Vuc2UpIHtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJMb2dpblBheWxvYWQoX2VtYWlsLCBfcGFzc3dvcmQsIF9yb2xlLCBfbGljZW5zZSk7XHJcbiAgICB0aGlzLkNhbGxSRVNUQVBJKHRoaXMubG9naW5Vc2VyQVBJLCBcIlBPU1RcIiwgcGF5bG9hZCwgMiwgbnVsbCwgLTEpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVVzZXJEYXRhKF9jYXNoID0gLTEsIF9nYW1lV29uID0gLTEsIF9hdmF0YXJJRCA9IC0xKSB7XHJcbiAgICB2YXIgX21haW5EYXRhO1xyXG4gICAgaWYgKElzV2ViKSB7XHJcbiAgICAgIF9tYWluRGF0YSA9IEpTT04ucGFyc2Uod2luZG93LkFsbERhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX21haW5EYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9tYWluRGF0YS5yb2xlVHlwZSA9PSBcIlN0dWRlbnRcIikge1xyXG4gICAgICBpZiAoX21haW5EYXRhICE9IG51bGwpIHtcclxuICAgICAgICB2YXIgU2VuZGluZ1BheWxvYWQgPSBuZXcgVXNlckRhdGFVcGRhdGVQYXlsb2FkKFxyXG4gICAgICAgICAgX21haW5EYXRhLlNLLFxyXG4gICAgICAgICAgX21haW5EYXRhLnBhc3N3b3JkLFxyXG4gICAgICAgICAgX21haW5EYXRhLm5hbWUsXHJcbiAgICAgICAgICBfbWFpbkRhdGEucm9sZVR5cGUsXHJcbiAgICAgICAgICBfbWFpbkRhdGEuZG9CLFxyXG4gICAgICAgICAgX21haW5EYXRhLmdyYWRlTGV2ZWwsXHJcbiAgICAgICAgICBfbWFpbkRhdGEudGVhY2hlck5hbWUsXHJcbiAgICAgICAgICBfbWFpbkRhdGEuZmJQYWdlLFxyXG4gICAgICAgICAgX21haW5EYXRhLmdhbWVzV29uLFxyXG4gICAgICAgICAgX21haW5EYXRhLnRlc3RUYWtlbixcclxuICAgICAgICAgIF9tYWluRGF0YS5kaXN0cmljdCxcclxuICAgICAgICAgIF9tYWluRGF0YS50ZXN0aW5nQXZlcmFnZSxcclxuICAgICAgICAgIF9tYWluRGF0YS5pbkdhbWVDYXNoLFxyXG4gICAgICAgICAgXCJwcm9ncmFtZGlyZWN0b3JAZ21haWwuY29tXCIsXHJcbiAgICAgICAgICBcIlByb2dyYW1EaXJlY3RvclwiLFxyXG4gICAgICAgICAgX21haW5EYXRhLmFkZGVkQnlFbWFpbCxcclxuICAgICAgICAgIF9tYWluRGF0YS5zY2hvb2xOYW1lLFxyXG4gICAgICAgICAgX21haW5EYXRhLmF2YXRhcklkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKF9jYXNoICE9IC0xKSB7XHJcbiAgICAgICAgICBTZW5kaW5nUGF5bG9hZC5pbkdhbWVDYXNoID0gX2Nhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfZ2FtZVdvbiAhPSAtMSkge1xyXG4gICAgICAgICAgU2VuZGluZ1BheWxvYWQuZ2FtZXNXb24gPSBfZ2FtZVdvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF9hdmF0YXJJRCAhPSAtMSkge1xyXG4gICAgICAgICAgU2VuZGluZ1BheWxvYWQuYXZhdGFySWQgPSBfYXZhdGFySUQudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFNlbmRpbmdQYXlsb2FkKTtcclxuICAgICAgICB2YXIgcGF5bG9hZCA9IFNlbmRpbmdQYXlsb2FkO1xyXG4gICAgICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfbWFpbkRhdGEudXNlclRva2VuIH07XHJcbiAgICAgICAgdGhpcy5DYWxsUkVTVEFQSSh0aGlzLlVwZGF0ZVVzZXJEYXRhQVBJLCBcIlBVVFwiLCBwYXlsb2FkLCAzLCBoZWFkZXIsIC0xKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiY2Fubm90IHVwZGF0ZSBkYXRhIGFzIHN0b3JlZCBkYXRhIGlzIG51bGxcIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm90IHN0dWRlbnRcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRmV0Y2goX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyA9IG51bGwpIHtcclxuICAgIGlmIChfbWV0aG9kID09IFwiR0VUXCIpIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJoZWFkZXIgaXMgbnVsbFwiKTtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoX3JlcXVlc3RCb2R5KTtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogX2hlYWRlcnMsXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FsbFJFU1RBUEkoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfdHlwZSwgX2hlYWRlcnMgPSBudWxsLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICBGZXRjaF9Qcm9taXNlKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMpO1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gRmV0Y2hfUHJvbWlzZShfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzID0gbnVsbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciBSZXNwb25zZSA9IGF3YWl0IFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuRmV0Y2goX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICAgICAgdmFyIFRlbXBEYXRhID0gYXdhaXQgUmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAoX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgLy9nZXR0aW5nIHVzZXIgZGF0YVxyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgICBpZiAoX3N1YlR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAvL3JldHVybiBkYXRhIHRvIHN0b3JhZ2UgY2xhc3NcclxuICAgICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJTVUNDRVNTXCIpIHx8IE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IGRhdGEgc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgLy9ib3RoIGJlbG93IGNhbGxzIGFyZSB3cml0dGVuIGluc2lkZSBzdG9yZ2FlbWFuYWdlclxyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJXcml0ZURhdGFcIiwgTWFpbkRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJSZWZyZXNoRGF0YVwiLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgLy9sb2dpbiB1c2VyXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwic3VjZXNzZnVsbHlcIikpIHtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuICAgICAgICAgICAgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25TdHVkZW50RGF0YShNYWluRGF0YS5kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJUZWFjaGVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25UZWFjaGVyRGF0YShNYWluRGF0YS5kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtQW1iYXNzYWRvclwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduTWVudG9yRGF0YShNYWluRGF0YS5kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTY2hvb2xBZG1pblwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduQWRtaW5EYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1EaXJlY3RvclwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduRGlyZWN0b3JEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIndyb25nXCIpIHx8IE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJjaGFyYWN0ZXJzXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5JbnZhbGlkRW1haWxQYXNzd29yZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiRGF0YSBub3QgRm91bmQhXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5Vc2VyTm90Rm91bmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlBhc3N3b3JkIHNob3VsZCBjb250YWluIGF0bGVhc3Qgb25lIEludGVnZXJcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJTY2hvb2wgTGljZW5zZSBpcyBub3QgdmFsaWQgY29udGFjdCBBZG1pbiFcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNjaG9vbCBMaWNlbnNlIERvZXMgbm90IGV4aXN0IVwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uTGljZW5zZUludmFsaWQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDMpIHtcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmIChfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2xvZ2luIHVzZXIgZXJyb3JcclxuICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5XZW50V3Jvbmc7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic29tZXRoaW5nIGdvZXMgYmV6YWFyXCIpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS50b1N0cmluZygpKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAvLyAgY29uc29sZS5sb2coJ1dlIGRvIGNsZWFudXAgaGVyZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyNyZWdpb24gQ29tbWVudGVkXHJcbiAgICAvLyBmZXRjaChcclxuICAgIC8vICAgICBfdXJsLFxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgLy8gICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAvLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KF9yZXF1ZXN0Qm9keSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIClcclxuICAgIC8vICAgLnRoZW4ocmVzcG9uc2U9PntcclxuICAgIC8vICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGRhdGE9PntcclxuICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIC8vICAgICAgICAgLy9yZXR1cm4gZGF0YTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfSlcclxuICAgIC8vICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgfSxcclxuXHJcbiAgQXNzaWduU3R1ZGVudERhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoRGF0YVJlc3BvbnNlKTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5kT0IgPSBEYXRhUmVzcG9uc2UuZG9CO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5ncmFkZUxldmVsID0gRGF0YVJlc3BvbnNlLmdyYWRlTGV2ZWw7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudGVhY2hlck5hbWUgPSBEYXRhUmVzcG9uc2UudGVhY2hlck5hbWU7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmZhY2Vib29rUGFnZSA9IERhdGFSZXNwb25zZS5mYlBhZ2U7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVzV29uID0gRGF0YVJlc3BvbnNlLmdhbWVzV29uO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS50ZXN0c1Rha2VuID0gRGF0YVJlc3BvbnNlLnRlc3RUYWtlbjtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudGVzdGluZ0F2ZXJhZ2UgPSBEYXRhUmVzcG9uc2UudGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gRGF0YVJlc3BvbnNlLmluR2FtZUNhc2g7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS51c2VySUQ7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuU3R1ZGVudERhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlN0dWRlbnREYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25UZWFjaGVyRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5zY2hvb2wgPSBEYXRhUmVzcG9uc2Uuc2Nob29sTmFtZTtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuY2xhc3NUYXVnaHQgPSBEYXRhUmVzcG9uc2UuY2xhc3NUYXVnaHQ7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UudXNlcklEO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuVGVhY2hlckRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLlRlYWNoZXJEYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5UZWFjaGVyRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduTWVudG9yRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuTWVudG9yRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UudXNlcklEO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuYWRkcmVzcztcclxuICAgIHRoaXMuTWVudG9yRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLk1lbnRvckRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLk1lbnRvckRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLk1lbnRvckRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkFkbWluRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuQWRtaW5EYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuQWRtaW5EYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuQWRtaW5EYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuQWRtaW5EYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS51c2VySUQ7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5zY2hvb2xOYW1lID0gRGF0YVJlc3BvbnNlLnNjaG9vbE5hbWU7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuQWRtaW5EYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5BZG1pbkRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5BZG1pbkRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLkFkbWluRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuQWRtaW5EYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EaXJlY3RvckRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5EaXJlY3RvckRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLkRpcmVjdG9yRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuRGlyZWN0b3JEYXRhKTtcclxuICB9LFxyXG4gIHN0YXJ0KCkge30sXHJcblxyXG4gIFJlbG9naW5Gcm9tU3RvcmFnZShNYWluRGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHkgYXV0b21hdGljYWxseVwiKTtcclxuICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuICAgIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduU3R1ZGVudERhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduVGVhY2hlckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbk1lbnRvckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbkFkbWluRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbURpcmVjdG9yXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbkRpcmVjdG9yRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3Igc2VuZGluZyBwYXlsb2FkIHRvIHJlY2VpdmUgZGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlclBheWxvYWQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyUGF5bG9hZFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfZW1haWwgPSBcIm5vbmVcIiwgX3JvbGUgPSBcIm5vbmVcIikge1xyXG4gICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgIHRoaXMucm9sZSA9IF9yb2xlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFVzZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkRhdGFcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBpbkdhbWVDYXNoOiBcIlwiLFxyXG4gICAgTFNLOiBcIlwiLFxyXG4gICAgdXNlclRva2VuOiBcIlwiLFxyXG4gICAgY2xhc3NUYXVnaHQ6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgc2Nob29sTmFtZTogXCJcIixcclxuICAgIGdhbWVzV29uOiBcIlwiLFxyXG4gICAgY3JlYXRlZEF0OiAwLFxyXG4gICAgaXNEZWxldGVkOiBmYWxzZSxcclxuICAgIFRhYmxlTmFtZTogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgICBwYXNzd29yZDogXCJcIixcclxuICAgIGZiUGFnZTogXCJcIixcclxuICAgIHVwZGF0ZWRBdDogMCxcclxuICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgZG9COiBcIlwiLFxyXG4gICAgU0s6IFwiXCIsXHJcbiAgICB0ZXN0VGFrZW46IFwiXCIsXHJcbiAgICBQSzogXCJcIixcclxuICAgIHRlc3RpbmdBdmVyYWdlOiBcIlwiLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYWRkcmVzczogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgYWRkZWRCeUVtYWlsOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICBVbmlxdWVLZXk6IFwiXCIsXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1yb290IGNsYXNzIG9mIHJlc3BvbnNlIHJlY2VpdmVkIHdoZW4gZ2V0dGluZyB1c2VyIGFwaSBpcyBoaXQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJEYXRhUmVzcG9uc2UgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyRGF0YVJlc3BvbnNlXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgc3RhdHVzQ29kZTogXCJcIixcclxuICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICBkYXRhOiBEYXRhLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9zdGF0dXNDb2RlID0gXCJub25lXCIsIF9tZXNzYWdlID0gXCJub25lXCIsIF9kYXRhID0gbnVsbCkge1xyXG4gICAgdGhpcy5zdGF0dXNDb2RlID0gX3N0YXR1c0NvZGU7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBfbWVzc2FnZTtcclxuICAgIHRoaXMuZGF0YSA9IF9kYXRhO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHNlbmRpbmcgcGF5bG9hZCB0byBsb2dpbiB1c2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyTG9naW5QYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlckxvZ2luUGF5bG9hZFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gICAgbGljZW5zZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfZW1haWwgPSBcIm5vbmVcIiwgX3Bhc3N3b3JkID0gXCJub25lXCIsIF9yb2xlID0gXCJub25lXCIsIF9saWNlbnNlID0gXCJub25lXCIpIHtcclxuICAgIHRoaXMuZW1haWwgPSBfZW1haWw7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gX3Bhc3N3b3JkO1xyXG4gICAgdGhpcy5yb2xlID0gX3JvbGU7XHJcbiAgICB0aGlzLmxpY2Vuc2UgPSBfbGljZW5zZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVc2VyRGF0YVVwZGF0ZVBheWxvYWQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJEYXRhVXBkYXRlUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJEYXRhVXBkYXRlUGF5bG9hZFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICAgIGRvQjogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGZiUGFnZTogXCJcIixcclxuICAgIGdhbWVzV29uOiBcIlwiLFxyXG4gICAgdGVzdFRha2VuOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICB0ZXN0aW5nQXZlcmFnZTogXCJcIixcclxuICAgIGluR2FtZUNhc2g6IFwiXCIsXHJcbiAgICBhZG1pbkVtYWlsOiBcIlwiLFxyXG4gICAgYWRtaW5Sb2xlOiBcIlwiLFxyXG4gICAgYWRkZWRCeUVtYWlsOiBcIlwiLFxyXG4gICAgc2Nob29sTmFtZTogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKFxyXG4gICAgX2VtYWlsID0gXCJub25lXCIsXHJcbiAgICBfcGFzc3dvcmQgPSBcIm5vbmVcIixcclxuICAgIF9uYW1lID0gXCJcIixcclxuICAgIF9yb2xlID0gXCJub25lXCIsXHJcbiAgICBfZG9iID0gXCJcIixcclxuICAgIF9ncmFkZUxldmVsID0gXCJcIixcclxuICAgIF90ZWFjaGVyTmFtZSA9IFwiXCIsXHJcbiAgICBfZmJQYWdlID0gXCJcIixcclxuICAgIF9nYW1lc1dvbiA9IFwiXCIsXHJcbiAgICBfdGVzdFRha2VuID0gXCJcIixcclxuICAgIF9kaXN0cmljdCA9IFwiXCIsXHJcbiAgICBfdGVzdGluZ0F2ZXJhZ2UgPSBcIlwiLFxyXG4gICAgX2luR2FtZUNhc2ggPSBcIlwiLFxyXG4gICAgX2FkbWluRW1haWwgPSBcIlwiLFxyXG4gICAgX2FkbWluUm9sZSA9IFwiXCIsXHJcbiAgICBfYWRkZWRCeUVtYWlsID0gXCJcIixcclxuICAgIF9zY2hvb2xOYW1lID0gXCJcIixcclxuICAgIF9hdmF0YXJJRCA9IFwiXCJcclxuICApIHtcclxuICAgIHRoaXMuZW1haWwgPSBfZW1haWw7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gX3Bhc3N3b3JkO1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnJvbGUgPSBfcm9sZTtcclxuICAgIHRoaXMuZG9CID0gX2RvYjtcclxuICAgIHRoaXMuZ3JhZGVMZXZlbCA9IF9ncmFkZUxldmVsO1xyXG4gICAgdGhpcy50ZWFjaGVyTmFtZSA9IF90ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuZmJQYWdlID0gX2ZiUGFnZTtcclxuICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICB0aGlzLnRlc3RUYWtlbiA9IF90ZXN0VGFrZW47XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy50ZXN0aW5nQXZlcmFnZSA9IF90ZXN0aW5nQXZlcmFnZTtcclxuICAgIHRoaXMuaW5HYW1lQ2FzaCA9IF9pbkdhbWVDYXNoO1xyXG4gICAgdGhpcy5hZG1pbkVtYWlsID0gX2FkbWluRW1haWw7XHJcbiAgICB0aGlzLmFkbWluUm9sZSA9IF9hZG1pblJvbGU7XHJcbiAgICB0aGlzLmFkZGVkQnlFbWFpbCA9IF9hZGRlZEJ5RW1haWw7XHJcbiAgICB0aGlzLnNjaG9vbE5hbWUgPSBfc2Nob29sTmFtZTtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySUQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXJ2ZXJCYWNrZW5kO1xyXG4iXX0=