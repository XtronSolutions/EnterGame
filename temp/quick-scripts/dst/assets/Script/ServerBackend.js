
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

var IsWeb = false; //-------------------------------------------enumeration for type of business-------------------------//

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
    var params = ""; // if (options.params) {
    //   for (var key in options.params) {
    //     params += "&" + key + "=" + options.params[key];
    //   }
    // }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIklzV2ViIiwiUmVzcG9uc2VUeXBlRW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJTdWNjZXNzZnVsIiwiVXNlck5vdEZvdW5kIiwiSW52YWxpZEVtYWlsUGFzc3dvcmQiLCJXZW50V3JvbmciLCJMaWNlbnNlSW52YWxpZCIsIlN0dWRlbnQiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiZE9CIiwiZ3JhZGVMZXZlbCIsImVtYWlsQWRkcmVzcyIsInRlYWNoZXJOYW1lIiwiZmFjZWJvb2tQYWdlIiwiZ2FtZXNXb24iLCJ0ZXN0c1Rha2VuIiwidGVzdGluZ0F2ZXJhZ2UiLCJnYW1lQ2FzaCIsIkFjY2Vzc1Rva2VuIiwiVXBkYXRlZEF0IiwidXNlcklEIiwiYXZhdGFySWQiLCJkaXN0cmljdCIsInJvbGVUeXBlIiwiY3RvciIsIl9uYW1lIiwiX2RvYiIsIl9ncmFkZUxldmVsIiwiX2VtYWlsQWRkcmVzcyIsIl90ZWFjaGVyTmFtZSIsIl9mYWNlYm9va1BhZ2UiLCJfZ2FtZXNXb24iLCJfdGVzdHNUYWtlbiIsIl90ZXN0aW5nQXZlcmFnZSIsIl9nYW1lQ2FzaCIsIl9hdmF0YXJJZCIsIl9kaXN0cmljdCIsIl9yb2xlVHlwZSIsIlRlYWNoZXIiLCJzY2hvb2wiLCJjbGFzc1RhdWdodCIsImNvbnRhY3ROdW1iZXIiLCJfc2Nob29sIiwiX2NsYXNzVGF1Z2h0IiwiX2NvbnRhY3ROdW1iZXIiLCJfYWNjZXNzVG9rZW4iLCJfdXBkYXRlZEF0IiwiX3VzZXJJRCIsIlByb2dyYW1BbWJhc3NhZG9ycyIsImFkZHJlc3MiLCJfYWRkcmVzcyIsIlNjaG9vbEFkbWluaXN0cmF0b3JzIiwic2Nob29sTmFtZSIsIl9zY2hvb2xOYW1lIiwiUHJvZ3JhbURpcmVjdG9ycyIsIlNlcnZlckJhY2tlbmQiLCJDb21wb25lbnQiLCJTdHVkZW50RGF0YSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiVGVhY2hlckRhdGEiLCJNZW50b3JEYXRhIiwiQWRtaW5EYXRhIiwiRGlyZWN0b3JEYXRhIiwiUmVzcG9uc2VUeXBlIiwiZGlzcGxheU5hbWUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiZ2V0VXNlckFQSSIsImxvZ2luVXNlckFQSSIsIlVwZGF0ZVVzZXJEYXRhQVBJIiwic2VuZFBvc3RSZXF1ZXN0IiwiaHR0cCIsIlhNTEh0dHBSZXF1ZXN0IiwicmVxdWVzdF91cmwiLCJwYXJhbXMiLCJwYXlsb2FkIiwiVXNlckxvZ2luUGF5bG9hZCIsIl9qc29uIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiaHR0cFN0YXR1cyIsInN0YXR1c1RleHQiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZUpTT04iLCJldmFsIiwiY29uc29sZSIsImxvZyIsInN0YXR1c0NvZGUiLCJtZXNzYWdlIiwiZGF0YSIsInJlYWR5U3RhdGUiLCJfZGF0YSIsInNlbmQiLCJHZXRVc2VyRGF0YSIsIl9lbWFpbCIsIl9yb2xlIiwiX3N1YlR5cGUiLCJVc2VyUGF5bG9hZCIsImhlYWRlciIsIkF1dGhvcml6YXRpb24iLCJDYWxsUkVTVEFQSSIsIkxvZ2luVXNlciIsIl9wYXNzd29yZCIsIl9saWNlbnNlIiwiVXBkYXRlVXNlckRhdGEiLCJfY2FzaCIsIl9nYW1lV29uIiwiX2F2YXRhcklEIiwiX21haW5EYXRhIiwicGFyc2UiLCJ3aW5kb3ciLCJBbGxEYXRhIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIlNlbmRpbmdQYXlsb2FkIiwiVXNlckRhdGFVcGRhdGVQYXlsb2FkIiwiU0siLCJwYXNzd29yZCIsInJvbGUiLCJkb0IiLCJmYlBhZ2UiLCJ0ZXN0VGFrZW4iLCJpbkdhbWVDYXNoIiwiYWRkZWRCeUVtYWlsIiwidG9TdHJpbmciLCJ1c2VyVG9rZW4iLCJlcnJvciIsIkZldGNoIiwiX3VybCIsIl9tZXRob2QiLCJfcmVxdWVzdEJvZHkiLCJfaGVhZGVycyIsImZldGNoIiwiaGVhZGVycyIsIm1ldGhvZCIsImJvZHkiLCJfdHlwZSIsIkZldGNoX1Byb21pc2UiLCJSZXNwb25zZSIsImpzb24iLCJUZW1wRGF0YSIsIk1haW5EYXRhIiwiVXNlckRhdGFSZXNwb25zZSIsImluY2x1ZGVzIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiQXNzaWduU3R1ZGVudERhdGEiLCJBc3NpZ25UZWFjaGVyRGF0YSIsIkFzc2lnbk1lbnRvckRhdGEiLCJBc3NpZ25BZG1pbkRhdGEiLCJBc3NpZ25EaXJlY3RvckRhdGEiLCJEYXRhUmVzcG9uc2UiLCJpc0xvZ2dlZEluIiwidXBkYXRlZEF0Iiwic3RhcnQiLCJSZWxvZ2luRnJvbVN0b3JhZ2UiLCJlbWFpbCIsIkRhdGEiLCJMU0siLCJjcmVhdGVkQXQiLCJpc0RlbGV0ZWQiLCJUYWJsZU5hbWUiLCJQSyIsIlVuaXF1ZUtleSIsIl9zdGF0dXNDb2RlIiwiX21lc3NhZ2UiLCJsaWNlbnNlIiwiYWRtaW5FbWFpbCIsImFkbWluUm9sZSIsIl9mYlBhZ2UiLCJfdGVzdFRha2VuIiwiX2luR2FtZUNhc2giLCJfYWRtaW5FbWFpbCIsIl9hZG1pblJvbGUiLCJfYWRkZWRCeUVtYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxLQUFLLEdBQUcsS0FBWixFQUNBOztBQUNBLElBQUlDLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUM3QkMsRUFBQUEsSUFBSSxFQUFFLENBRHVCO0FBRTdCQyxFQUFBQSxVQUFVLEVBQUUsQ0FGaUI7QUFHN0JDLEVBQUFBLFlBQVksRUFBRSxDQUhlO0FBSTdCQyxFQUFBQSxvQkFBb0IsRUFBRSxDQUpPO0FBSzdCQyxFQUFBQSxTQUFTLEVBQUUsQ0FMa0I7QUFNN0JDLEVBQUFBLGNBQWMsRUFBRTtBQU5hLENBQVIsQ0FBdkIsRUFTQTs7QUFDQSxJQUFJQyxPQUFPLEdBQUdSLEVBQUUsQ0FBQ1MsS0FBSCxDQUFTO0FBQ3JCQyxFQUFBQSxJQUFJLEVBQUUsU0FEZTtBQUVyQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZELElBQUFBLElBQUksRUFBRSxFQURJO0FBRVZFLElBQUFBLEdBQUcsRUFBRSxFQUZLO0FBR1ZDLElBQUFBLFVBQVUsRUFBRSxFQUhGO0FBSVZDLElBQUFBLFlBQVksRUFBRSxFQUpKO0FBS1ZDLElBQUFBLFdBQVcsRUFBRSxFQUxIO0FBTVZDLElBQUFBLFlBQVksRUFBRSxFQU5KO0FBT1ZDLElBQUFBLFFBQVEsRUFBRSxDQVBBO0FBUVZDLElBQUFBLFVBQVUsRUFBRSxDQVJGO0FBU1ZDLElBQUFBLGNBQWMsRUFBRSxDQVROO0FBVVZDLElBQUFBLFFBQVEsRUFBRSxDQVZBO0FBV1ZDLElBQUFBLFdBQVcsRUFBRSxFQVhIO0FBWVZDLElBQUFBLFNBQVMsRUFBRSxDQVpEO0FBYVZDLElBQUFBLE1BQU0sRUFBRSxFQWJFO0FBY1ZDLElBQUFBLFFBQVEsRUFBRSxFQWRBO0FBZVZDLElBQUFBLFFBQVEsRUFBRSxFQWZBO0FBZ0JWQyxJQUFBQSxRQUFRLEVBQUU7QUFoQkEsR0FGUztBQW9CckI7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGNBQVVDLEtBQVYsRUFBMEJDLElBQTFCLEVBQXlDQyxXQUF6QyxFQUErREMsYUFBL0QsRUFBdUZDLFlBQXZGLEVBQThHQyxhQUE5RyxFQUFzSUMsU0FBdEksRUFBcUpDLFdBQXJKLEVBQXNLQyxlQUF0SyxFQUEyTEMsU0FBM0wsRUFBME1DLFNBQTFNLEVBQTBOQyxTQUExTixFQUEwT0MsU0FBMU8sRUFBMFA7QUFBQSxRQUFoUFosS0FBZ1A7QUFBaFBBLE1BQUFBLEtBQWdQLEdBQXhPLE1BQXdPO0FBQUE7O0FBQUEsUUFBaE9DLElBQWdPO0FBQWhPQSxNQUFBQSxJQUFnTyxHQUF6TixNQUF5TjtBQUFBOztBQUFBLFFBQWpOQyxXQUFpTjtBQUFqTkEsTUFBQUEsV0FBaU4sR0FBbk0sTUFBbU07QUFBQTs7QUFBQSxRQUEzTEMsYUFBMkw7QUFBM0xBLE1BQUFBLGFBQTJMLEdBQTNLLE1BQTJLO0FBQUE7O0FBQUEsUUFBbktDLFlBQW1LO0FBQW5LQSxNQUFBQSxZQUFtSyxHQUFwSixNQUFvSjtBQUFBOztBQUFBLFFBQTVJQyxhQUE0STtBQUE1SUEsTUFBQUEsYUFBNEksR0FBNUgsTUFBNEg7QUFBQTs7QUFBQSxRQUFwSEMsU0FBb0g7QUFBcEhBLE1BQUFBLFNBQW9ILEdBQXhHLENBQXdHO0FBQUE7O0FBQUEsUUFBckdDLFdBQXFHO0FBQXJHQSxNQUFBQSxXQUFxRyxHQUF2RixDQUF1RjtBQUFBOztBQUFBLFFBQXBGQyxlQUFvRjtBQUFwRkEsTUFBQUEsZUFBb0YsR0FBbEUsQ0FBa0U7QUFBQTs7QUFBQSxRQUEvREMsU0FBK0Q7QUFBL0RBLE1BQUFBLFNBQStELEdBQW5ELENBQW1EO0FBQUE7O0FBQUEsUUFBaERDLFNBQWdEO0FBQWhEQSxNQUFBQSxTQUFnRCxHQUFwQyxFQUFvQztBQUFBOztBQUFBLFFBQWhDQyxTQUFnQztBQUFoQ0EsTUFBQUEsU0FBZ0MsR0FBcEIsRUFBb0I7QUFBQTs7QUFBQSxRQUFoQkMsU0FBZ0I7QUFBaEJBLE1BQUFBLFNBQWdCLEdBQUosRUFBSTtBQUFBOztBQUM5UCxTQUFLOUIsSUFBTCxHQUFZa0IsS0FBWjtBQUNBLFNBQUtoQixHQUFMLEdBQVdpQixJQUFYO0FBQ0EsU0FBS2hCLFVBQUwsR0FBa0JpQixXQUFsQjtBQUNBLFNBQUtoQixZQUFMLEdBQW9CaUIsYUFBcEI7QUFDQSxTQUFLaEIsV0FBTCxHQUFtQmlCLFlBQW5CO0FBQ0EsU0FBS2hCLFlBQUwsR0FBb0JpQixhQUFwQjtBQUNBLFNBQUtoQixRQUFMLEdBQWdCaUIsU0FBaEI7QUFDQSxTQUFLaEIsVUFBTCxHQUFrQmlCLFdBQWxCO0FBQ0EsU0FBS2hCLGNBQUwsR0FBc0JpQixlQUF0QjtBQUNBLFNBQUtoQixRQUFMLEdBQWdCaUIsU0FBaEI7QUFDQSxTQUFLYixRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtiLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS2IsUUFBTCxHQUFnQmMsU0FBaEI7QUFDRDtBQW5Db0IsQ0FBVCxDQUFkLEVBc0NBOztBQUNBLElBQUlDLE9BQU8sR0FBR3pDLEVBQUUsQ0FBQ1MsS0FBSCxDQUFTO0FBQ3JCQyxFQUFBQSxJQUFJLEVBQUUsU0FEZTtBQUVyQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZELElBQUFBLElBQUksRUFBRSxFQURJO0FBRVZnQyxJQUFBQSxNQUFNLEVBQUUsRUFGRTtBQUdWQyxJQUFBQSxXQUFXLEVBQUUsQ0FISDtBQUlWN0IsSUFBQUEsWUFBWSxFQUFFLEVBSko7QUFLVjhCLElBQUFBLGFBQWEsRUFBRSxFQUxMO0FBTVZ2QixJQUFBQSxXQUFXLEVBQUUsRUFOSDtBQU9WQyxJQUFBQSxTQUFTLEVBQUUsQ0FQRDtBQVFWQyxJQUFBQSxNQUFNLEVBQUUsRUFSRTtBQVNWQyxJQUFBQSxRQUFRLEVBQUUsRUFUQTtBQVVWQyxJQUFBQSxRQUFRLEVBQUUsRUFWQTtBQVdWQyxJQUFBQSxRQUFRLEVBQUU7QUFYQSxHQUZTO0FBZXJCO0FBQ0FDLEVBQUFBLElBQUksRUFBRSxjQUFVQyxLQUFWLEVBQTBCaUIsT0FBMUIsRUFBNENDLFlBQTVDLEVBQThEZixhQUE5RCxFQUFzRmdCLGNBQXRGLEVBQStHQyxZQUEvRyxFQUFrSUMsVUFBbEksRUFBa0pDLE9BQWxKLEVBQWdLWixTQUFoSyxFQUFnTEMsU0FBaEwsRUFBZ01DLFNBQWhNLEVBQWdOO0FBQUEsUUFBdE1aLEtBQXNNO0FBQXRNQSxNQUFBQSxLQUFzTSxHQUE5TCxNQUE4TDtBQUFBOztBQUFBLFFBQXRMaUIsT0FBc0w7QUFBdExBLE1BQUFBLE9BQXNMLEdBQTVLLE1BQTRLO0FBQUE7O0FBQUEsUUFBcEtDLFlBQW9LO0FBQXBLQSxNQUFBQSxZQUFvSyxHQUFySixDQUFxSjtBQUFBOztBQUFBLFFBQWxKZixhQUFrSjtBQUFsSkEsTUFBQUEsYUFBa0osR0FBbEksTUFBa0k7QUFBQTs7QUFBQSxRQUExSGdCLGNBQTBIO0FBQTFIQSxNQUFBQSxjQUEwSCxHQUF6RyxNQUF5RztBQUFBOztBQUFBLFFBQWpHQyxZQUFpRztBQUFqR0EsTUFBQUEsWUFBaUcsR0FBbEYsRUFBa0Y7QUFBQTs7QUFBQSxRQUE5RUMsVUFBOEU7QUFBOUVBLE1BQUFBLFVBQThFLEdBQWpFLENBQWlFO0FBQUE7O0FBQUEsUUFBOURDLE9BQThEO0FBQTlEQSxNQUFBQSxPQUE4RCxHQUFwRCxFQUFvRDtBQUFBOztBQUFBLFFBQWhEWixTQUFnRDtBQUFoREEsTUFBQUEsU0FBZ0QsR0FBcEMsRUFBb0M7QUFBQTs7QUFBQSxRQUFoQ0MsU0FBZ0M7QUFBaENBLE1BQUFBLFNBQWdDLEdBQXBCLEVBQW9CO0FBQUE7O0FBQUEsUUFBaEJDLFNBQWdCO0FBQWhCQSxNQUFBQSxTQUFnQixHQUFKLEVBQUk7QUFBQTs7QUFDcE4sU0FBSzlCLElBQUwsR0FBWWtCLEtBQVo7QUFDQSxTQUFLYyxNQUFMLEdBQWNHLE9BQWQ7QUFDQSxTQUFLRixXQUFMLEdBQW1CRyxZQUFuQjtBQUNBLFNBQUtoQyxZQUFMLEdBQW9CaUIsYUFBcEI7QUFDQSxTQUFLYSxhQUFMLEdBQXFCRyxjQUFyQjtBQUNBLFNBQUsxQixXQUFMLEdBQW1CMkIsWUFBbkI7QUFDQSxTQUFLMUIsU0FBTCxHQUFpQjJCLFVBQWpCO0FBQ0EsU0FBSzFCLE1BQUwsR0FBYzJCLE9BQWQ7QUFDQSxTQUFLMUIsUUFBTCxHQUFnQmMsU0FBaEI7QUFDQSxTQUFLYixRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtiLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0Q7QUE1Qm9CLENBQVQsQ0FBZCxFQStCQTs7QUFDQSxJQUFJVyxrQkFBa0IsR0FBR25ELEVBQUUsQ0FBQ1MsS0FBSCxDQUFTO0FBQ2hDQyxFQUFBQSxJQUFJLEVBQUUsb0JBRDBCO0FBRWhDQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkQsSUFBQUEsSUFBSSxFQUFFLEVBREk7QUFFVkksSUFBQUEsWUFBWSxFQUFFLEVBRko7QUFHVjhCLElBQUFBLGFBQWEsRUFBRSxFQUhMO0FBSVZRLElBQUFBLE9BQU8sRUFBRSxFQUpDO0FBS1YvQixJQUFBQSxXQUFXLEVBQUUsRUFMSDtBQU1WQyxJQUFBQSxTQUFTLEVBQUUsQ0FORDtBQU9WQyxJQUFBQSxNQUFNLEVBQUUsRUFQRTtBQVFWQyxJQUFBQSxRQUFRLEVBQUUsRUFSQTtBQVNWQyxJQUFBQSxRQUFRLEVBQUUsRUFUQTtBQVVWQyxJQUFBQSxRQUFRLEVBQUU7QUFWQSxHQUZvQjtBQWNoQztBQUNBQyxFQUFBQSxJQUFJLEVBQUUsY0FBVUMsS0FBVixFQUEwQkcsYUFBMUIsRUFBa0RnQixjQUFsRCxFQUEyRU0sUUFBM0UsRUFBOEZMLFlBQTlGLEVBQWlIQyxVQUFqSCxFQUFpSUMsT0FBakksRUFBK0laLFNBQS9JLEVBQStKQyxTQUEvSixFQUErS0MsU0FBL0ssRUFBK0w7QUFBQSxRQUFyTFosS0FBcUw7QUFBckxBLE1BQUFBLEtBQXFMLEdBQTdLLE1BQTZLO0FBQUE7O0FBQUEsUUFBcktHLGFBQXFLO0FBQXJLQSxNQUFBQSxhQUFxSyxHQUFySixNQUFxSjtBQUFBOztBQUFBLFFBQTdJZ0IsY0FBNkk7QUFBN0lBLE1BQUFBLGNBQTZJLEdBQTVILE1BQTRIO0FBQUE7O0FBQUEsUUFBcEhNLFFBQW9IO0FBQXBIQSxNQUFBQSxRQUFvSCxHQUF6RyxNQUF5RztBQUFBOztBQUFBLFFBQWpHTCxZQUFpRztBQUFqR0EsTUFBQUEsWUFBaUcsR0FBbEYsRUFBa0Y7QUFBQTs7QUFBQSxRQUE5RUMsVUFBOEU7QUFBOUVBLE1BQUFBLFVBQThFLEdBQWpFLENBQWlFO0FBQUE7O0FBQUEsUUFBOURDLE9BQThEO0FBQTlEQSxNQUFBQSxPQUE4RCxHQUFwRCxFQUFvRDtBQUFBOztBQUFBLFFBQWhEWixTQUFnRDtBQUFoREEsTUFBQUEsU0FBZ0QsR0FBcEMsRUFBb0M7QUFBQTs7QUFBQSxRQUFoQ0MsU0FBZ0M7QUFBaENBLE1BQUFBLFNBQWdDLEdBQXBCLEVBQW9CO0FBQUE7O0FBQUEsUUFBaEJDLFNBQWdCO0FBQWhCQSxNQUFBQSxTQUFnQixHQUFKLEVBQUk7QUFBQTs7QUFDbk0sU0FBSzlCLElBQUwsR0FBWWtCLEtBQVo7QUFDQSxTQUFLZCxZQUFMLEdBQW9CaUIsYUFBcEI7QUFDQSxTQUFLYSxhQUFMLEdBQXFCRyxjQUFyQjtBQUNBLFNBQUtLLE9BQUwsR0FBZUMsUUFBZjtBQUNBLFNBQUtoQyxXQUFMLEdBQW1CMkIsWUFBbkI7QUFDQSxTQUFLMUIsU0FBTCxHQUFpQjJCLFVBQWpCO0FBQ0EsU0FBSzFCLE1BQUwsR0FBYzJCLE9BQWQ7QUFDQSxTQUFLMUIsUUFBTCxHQUFnQmMsU0FBaEI7QUFDQSxTQUFLYixRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtiLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0Q7QUExQitCLENBQVQsQ0FBekIsRUE2QkE7O0FBQ0EsSUFBSWMsb0JBQW9CLEdBQUd0RCxFQUFFLENBQUNTLEtBQUgsQ0FBUztBQUNsQ0MsRUFBQUEsSUFBSSxFQUFFLHNCQUQ0QjtBQUVsQ0MsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZELElBQUFBLElBQUksRUFBRSxFQURJO0FBRVY2QyxJQUFBQSxVQUFVLEVBQUUsRUFGRjtBQUdWWCxJQUFBQSxhQUFhLEVBQUUsRUFITDtBQUlWOUIsSUFBQUEsWUFBWSxFQUFFLEVBSko7QUFLVk8sSUFBQUEsV0FBVyxFQUFFLEVBTEg7QUFNVkMsSUFBQUEsU0FBUyxFQUFFLENBTkQ7QUFPVkMsSUFBQUEsTUFBTSxFQUFFLEVBUEU7QUFRVkMsSUFBQUEsUUFBUSxFQUFFLEVBUkE7QUFTVkMsSUFBQUEsUUFBUSxFQUFFLEVBVEE7QUFVVkMsSUFBQUEsUUFBUSxFQUFFO0FBVkEsR0FGc0I7QUFjbEM7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGNBQVVDLEtBQVYsRUFBMEI0QixXQUExQixFQUFnRHpCLGFBQWhELEVBQXdFZ0IsY0FBeEUsRUFBaUdDLFlBQWpHLEVBQW9IQyxVQUFwSCxFQUFvSUMsT0FBcEksRUFBa0paLFNBQWxKLEVBQWtLQyxTQUFsSyxFQUFrTEMsU0FBbEwsRUFBa007QUFBQSxRQUF4TFosS0FBd0w7QUFBeExBLE1BQUFBLEtBQXdMLEdBQWhMLE1BQWdMO0FBQUE7O0FBQUEsUUFBeEs0QixXQUF3SztBQUF4S0EsTUFBQUEsV0FBd0ssR0FBMUosTUFBMEo7QUFBQTs7QUFBQSxRQUFsSnpCLGFBQWtKO0FBQWxKQSxNQUFBQSxhQUFrSixHQUFsSSxNQUFrSTtBQUFBOztBQUFBLFFBQTFIZ0IsY0FBMEg7QUFBMUhBLE1BQUFBLGNBQTBILEdBQXpHLE1BQXlHO0FBQUE7O0FBQUEsUUFBakdDLFlBQWlHO0FBQWpHQSxNQUFBQSxZQUFpRyxHQUFsRixFQUFrRjtBQUFBOztBQUFBLFFBQTlFQyxVQUE4RTtBQUE5RUEsTUFBQUEsVUFBOEUsR0FBakUsQ0FBaUU7QUFBQTs7QUFBQSxRQUE5REMsT0FBOEQ7QUFBOURBLE1BQUFBLE9BQThELEdBQXBELEVBQW9EO0FBQUE7O0FBQUEsUUFBaERaLFNBQWdEO0FBQWhEQSxNQUFBQSxTQUFnRCxHQUFwQyxFQUFvQztBQUFBOztBQUFBLFFBQWhDQyxTQUFnQztBQUFoQ0EsTUFBQUEsU0FBZ0MsR0FBcEIsRUFBb0I7QUFBQTs7QUFBQSxRQUFoQkMsU0FBZ0I7QUFBaEJBLE1BQUFBLFNBQWdCLEdBQUosRUFBSTtBQUFBOztBQUN0TSxTQUFLOUIsSUFBTCxHQUFZa0IsS0FBWjtBQUNBLFNBQUsyQixVQUFMLEdBQWtCQyxXQUFsQjtBQUNBLFNBQUtaLGFBQUwsR0FBcUJHLGNBQXJCO0FBQ0EsU0FBS2pDLFlBQUwsR0FBb0JpQixhQUFwQjtBQUNBLFNBQUtWLFdBQUwsR0FBbUIyQixZQUFuQjtBQUNBLFNBQUsxQixTQUFMLEdBQWlCMkIsVUFBakI7QUFDQSxTQUFLMUIsTUFBTCxHQUFjMkIsT0FBZDtBQUNBLFNBQUsxQixRQUFMLEdBQWdCYyxTQUFoQjtBQUNBLFNBQUtiLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS2IsUUFBTCxHQUFnQmMsU0FBaEI7QUFDRDtBQTFCaUMsQ0FBVCxDQUEzQixFQTZCQTs7QUFDQSxJQUFJaUIsZ0JBQWdCLEdBQUd6RCxFQUFFLENBQUNTLEtBQUgsQ0FBUztBQUM5QkMsRUFBQUEsSUFBSSxFQUFFLGtCQUR3QjtBQUU5QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZELElBQUFBLElBQUksRUFBRSxFQURJO0FBRVZJLElBQUFBLFlBQVksRUFBRSxFQUZKO0FBR1ZPLElBQUFBLFdBQVcsRUFBRSxFQUhIO0FBSVZDLElBQUFBLFNBQVMsRUFBRSxDQUpEO0FBS1ZDLElBQUFBLE1BQU0sRUFBRTtBQUxFLEdBRmtCO0FBUzlCO0FBQ0FJLEVBQUFBLElBQUksRUFBRSxjQUFVQyxLQUFWLEVBQTBCRyxhQUExQixFQUFrRGlCLFlBQWxELEVBQXFFQyxVQUFyRSxFQUFxRkMsT0FBckYsRUFBbUc7QUFBQSxRQUF6RnRCLEtBQXlGO0FBQXpGQSxNQUFBQSxLQUF5RixHQUFqRixNQUFpRjtBQUFBOztBQUFBLFFBQXpFRyxhQUF5RTtBQUF6RUEsTUFBQUEsYUFBeUUsR0FBekQsTUFBeUQ7QUFBQTs7QUFBQSxRQUFqRGlCLFlBQWlEO0FBQWpEQSxNQUFBQSxZQUFpRCxHQUFsQyxFQUFrQztBQUFBOztBQUFBLFFBQTlCQyxVQUE4QjtBQUE5QkEsTUFBQUEsVUFBOEIsR0FBakIsQ0FBaUI7QUFBQTs7QUFBQSxRQUFkQyxPQUFjO0FBQWRBLE1BQUFBLE9BQWMsR0FBSixFQUFJO0FBQUE7O0FBQ3ZHLFNBQUt4QyxJQUFMLEdBQVlrQixLQUFaO0FBQ0EsU0FBS2QsWUFBTCxHQUFvQmlCLGFBQXBCO0FBQ0EsU0FBS1YsV0FBTCxHQUFtQjJCLFlBQW5CO0FBQ0EsU0FBSzFCLFNBQUwsR0FBaUIyQixVQUFqQjtBQUNBLFNBQUsxQixNQUFMLEdBQWMyQixPQUFkO0FBQ0Q7QUFoQjZCLENBQVQsQ0FBdkIsRUFtQkE7O0FBQ0EsSUFBSVEsYUFBYSxHQUFHMUQsRUFBRSxDQUFDUyxLQUFILENBQVM7QUFDM0JDLEVBQUFBLElBQUksRUFBRSxlQURxQjtBQUUzQixhQUFTVixFQUFFLENBQUMyRCxTQUZlO0FBRzNCaEQsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZpRCxJQUFBQSxXQUFXLEVBQUU7QUFDWCxpQkFBUyxJQURFO0FBRVhDLE1BQUFBLElBQUksRUFBRXJELE9BRks7QUFHWHNELE1BQUFBLFlBQVksRUFBRSxJQUhIO0FBSVhDLE1BQUFBLE9BQU8sRUFBRTtBQUpFLEtBREg7QUFPVkMsSUFBQUEsV0FBVyxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYSCxNQUFBQSxJQUFJLEVBQUVwQixPQUZLO0FBR1hxQixNQUFBQSxZQUFZLEVBQUUsSUFISDtBQUlYQyxNQUFBQSxPQUFPLEVBQUU7QUFKRSxLQVBIO0FBYVZFLElBQUFBLFVBQVUsRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVkosTUFBQUEsSUFBSSxFQUFFVixrQkFGSTtBQUdWVyxNQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxNQUFBQSxPQUFPLEVBQUU7QUFKQyxLQWJGO0FBbUJWRyxJQUFBQSxTQUFTLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVRMLE1BQUFBLElBQUksRUFBRVAsb0JBRkc7QUFHVFEsTUFBQUEsWUFBWSxFQUFFLElBSEw7QUFJVEMsTUFBQUEsT0FBTyxFQUFFO0FBSkEsS0FuQkQ7QUF5QlZJLElBQUFBLFlBQVksRUFBRTtBQUNaLGlCQUFTLElBREc7QUFFWk4sTUFBQUEsSUFBSSxFQUFFSixnQkFGTTtBQUdaSyxNQUFBQSxZQUFZLEVBQUUsSUFIRjtBQUlaQyxNQUFBQSxPQUFPLEVBQUU7QUFKRyxLQXpCSjtBQStCVkssSUFBQUEsWUFBWSxFQUFFO0FBQ1pDLE1BQUFBLFdBQVcsRUFBRSxVQUREO0FBRVpSLE1BQUFBLElBQUksRUFBRTlELGdCQUZNO0FBR1osaUJBQVNBLGdCQUFnQixDQUFDRyxJQUhkO0FBSVo0RCxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRztBQS9CSixHQUhlO0FBMkMzQk8sRUFBQUEsT0FBTyxFQUFFO0FBQ1A7QUFDQUMsSUFBQUEsUUFBUSxFQUFFO0FBRkgsR0EzQ2tCO0FBZ0QzQkMsRUFBQUEsaUJBaEQyQiwrQkFnRFA7QUFDbEJkLElBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxHQUF5QixJQUF6QjtBQUNBdkUsSUFBQUEsRUFBRSxDQUFDeUUsSUFBSCxDQUFRQyxxQkFBUixDQUE4QixLQUFLQyxJQUFuQztBQUNELEdBbkQwQjtBQXFEM0JDLEVBQUFBLE1BckQyQixvQkFxRGxCO0FBQ1AsUUFBSSxDQUFDbEIsYUFBYSxDQUFDYSxRQUFuQixFQUE2QjtBQUMzQmIsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLEdBQXlCLElBQXpCO0FBQ0F2RSxNQUFBQSxFQUFFLENBQUN5RSxJQUFILENBQVFJLGtCQUFSLENBQTJCLEtBQUtGLElBQWhDO0FBQ0EsV0FBS2YsV0FBTCxHQUFtQixJQUFJcEQsT0FBSixFQUFuQixDQUgyQixDQUkzQjtBQUNELEtBTk0sQ0FRUDs7O0FBQ0EsU0FBS3NFLFVBQUwsR0FBa0Isb0VBQWxCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixzRUFBcEI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5Qix1RUFBekIsQ0FYTyxDQVlQO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNELEdBeEUwQjtBQTBFM0JDLEVBQUFBLGVBMUUyQiw2QkEwRVQ7QUFDaEIsUUFBSUMsSUFBSSxHQUFHLElBQUlDLGNBQUosRUFBWDtBQUNBLFFBQUlDLFdBQVcsR0FBRyxLQUFLTCxZQUF2QjtBQUVBLFFBQUlNLE1BQU0sR0FBRyxFQUFiLENBSmdCLENBS2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBSUMsT0FBTyxHQUFHLElBQUlDLGdCQUFKLENBQXFCLG9CQUFyQixFQUEyQyxVQUEzQyxFQUF1RCxTQUF2RCxFQUFrRSxjQUFsRSxDQUFkOztBQUNBLFFBQUlDLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxTQUFMLENBQWVKLE9BQWYsQ0FBWjs7QUFDQUosSUFBQUEsSUFBSSxDQUFDUyxJQUFMLENBQVUsTUFBVixFQUFrQlAsV0FBbEIsRUFBK0IsSUFBL0IsRUFiZ0IsQ0FjaEI7O0FBQ0FGLElBQUFBLElBQUksQ0FBQ1UsZ0JBQUwsQ0FBc0IsY0FBdEIsRUFBc0MsaUNBQXRDOztBQUVBVixJQUFBQSxJQUFJLENBQUNXLGtCQUFMLEdBQTBCLFlBQVk7QUFDcEMsVUFBSUMsVUFBVSxHQUFHWixJQUFJLENBQUNhLFVBQXRCLENBRG9DLENBRXBDOztBQUNBLFVBQUliLElBQUksQ0FBQ2MsWUFBVCxFQUF1QjtBQUNyQixZQUFJQyxZQUFZLEdBQUdDLElBQUksQ0FBQyxNQUFNaEIsSUFBSSxDQUFDYyxZQUFYLEdBQTBCLEdBQTNCLENBQXZCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSUMsWUFBWSxHQUFHLEVBQW5CO0FBQ0Q7O0FBRURFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVo7QUFDQUQsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlILFlBQVksQ0FBQ0ksVUFBekI7QUFDQUYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlILFlBQVksQ0FBQ0ssT0FBekI7QUFDQUgsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlILFlBQVksQ0FBQ00sSUFBekI7O0FBQ0EsY0FBUXJCLElBQUksQ0FBQ3NCLFVBQWI7QUFDRSxhQUFLLENBQUw7QUFDRUwsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlILFlBQVo7O0FBQ0EsY0FBSVEsS0FBSyxHQUFHaEIsSUFBSSxDQUFDQyxTQUFMLENBQWVPLFlBQWYsQ0FBWjs7QUFDQUUsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlLLEtBQVo7QUFKSjtBQU1ELEtBbkJEOztBQW9CQXZCLElBQUFBLElBQUksQ0FBQ3dCLElBQUwsQ0FBVWxCLEtBQVY7QUFDRCxHQWhIMEI7QUFrSDNCbUIsRUFBQUEsV0FsSDJCLHVCQWtIZkMsTUFsSGUsRUFrSFBDLEtBbEhPLEVBa0hBN0QsWUFsSEEsRUFrSGM4RCxRQWxIZCxFQWtINkI7QUFBQSxRQUFmQSxRQUFlO0FBQWZBLE1BQUFBLFFBQWUsR0FBSixDQUFDLENBQUc7QUFBQTs7QUFDdEQsUUFBSXhCLE9BQU8sR0FBRyxJQUFJeUIsV0FBSixDQUFnQkgsTUFBaEIsRUFBd0JDLEtBQXhCLENBQWQ7QUFDQSxRQUFJRyxNQUFNLEdBQUc7QUFBRSxzQkFBZ0IsaUNBQWxCO0FBQXFEQyxNQUFBQSxhQUFhLEVBQUVqRTtBQUFwRSxLQUFiO0FBQ0EsU0FBS2tFLFdBQUwsQ0FBaUIsS0FBS3BDLFVBQXRCLEVBQWtDLE1BQWxDLEVBQTBDUSxPQUExQyxFQUFtRCxDQUFuRCxFQUFzRDBCLE1BQXRELEVBQThERixRQUE5RDtBQUNELEdBdEgwQjtBQXdIM0JLLEVBQUFBLFNBeEgyQixxQkF3SGpCUCxNQXhIaUIsRUF3SFRRLFNBeEhTLEVBd0hFUCxLQXhIRixFQXdIU1EsUUF4SFQsRUF3SG1CO0FBQzVDLFFBQUkvQixPQUFPLEdBQUcsSUFBSUMsZ0JBQUosQ0FBcUJxQixNQUFyQixFQUE2QlEsU0FBN0IsRUFBd0NQLEtBQXhDLEVBQStDUSxRQUEvQyxDQUFkO0FBQ0EsU0FBS0gsV0FBTCxDQUFpQixLQUFLbkMsWUFBdEIsRUFBb0MsTUFBcEMsRUFBNENPLE9BQTVDLEVBQXFELENBQXJELEVBQXdELElBQXhELEVBQThELENBQUMsQ0FBL0Q7QUFDRCxHQTNIMEI7QUE2SDNCZ0MsRUFBQUEsY0E3SDJCLDBCQTZIWkMsS0E3SFksRUE2SEFDLFFBN0hBLEVBNkhlQyxTQTdIZixFQTZIK0I7QUFBQSxRQUEzQ0YsS0FBMkM7QUFBM0NBLE1BQUFBLEtBQTJDLEdBQW5DLENBQUMsQ0FBa0M7QUFBQTs7QUFBQSxRQUEvQkMsUUFBK0I7QUFBL0JBLE1BQUFBLFFBQStCLEdBQXBCLENBQUMsQ0FBbUI7QUFBQTs7QUFBQSxRQUFoQkMsU0FBZ0I7QUFBaEJBLE1BQUFBLFNBQWdCLEdBQUosQ0FBQyxDQUFHO0FBQUE7O0FBQ3hELFFBQUlDLFNBQUo7O0FBQ0EsUUFBSTVILEtBQUosRUFBVztBQUNUNEgsTUFBQUEsU0FBUyxHQUFHakMsSUFBSSxDQUFDa0MsS0FBTCxDQUFXQyxNQUFNLENBQUNDLE9BQWxCLENBQVo7QUFDRCxLQUZELE1BRU87QUFDTEgsTUFBQUEsU0FBUyxHQUFHakMsSUFBSSxDQUFDa0MsS0FBTCxDQUFXM0gsRUFBRSxDQUFDOEgsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixDQUFYLENBQVo7QUFDRDs7QUFFRCxRQUFJTixTQUFTLElBQUksSUFBakIsRUFBdUI7QUFDckIsVUFBSU8sY0FBYyxHQUFHLElBQUlDLHFCQUFKLENBQ25CUixTQUFTLENBQUNTLEVBRFMsRUFFbkJULFNBQVMsQ0FBQ1UsUUFGUyxFQUduQlYsU0FBUyxDQUFDaEgsSUFIUyxFQUluQmdILFNBQVMsQ0FBQ1csSUFKUyxFQUtuQlgsU0FBUyxDQUFDWSxHQUxTLEVBTW5CWixTQUFTLENBQUM3RyxVQU5TLEVBT25CNkcsU0FBUyxDQUFDM0csV0FQUyxFQVFuQjJHLFNBQVMsQ0FBQ2EsTUFSUyxFQVNuQmIsU0FBUyxDQUFDekcsUUFUUyxFQVVuQnlHLFNBQVMsQ0FBQ2MsU0FWUyxFQVduQmQsU0FBUyxDQUFDakcsUUFYUyxFQVluQmlHLFNBQVMsQ0FBQ3ZHLGNBWlMsRUFhbkJ1RyxTQUFTLENBQUNlLFVBYlMsRUFjbkIscUJBZG1CLEVBZW5CLGFBZm1CLEVBZ0JuQmYsU0FBUyxDQUFDZ0IsWUFoQlMsRUFpQm5CaEIsU0FBUyxDQUFDbkUsVUFqQlMsRUFrQm5CbUUsU0FBUyxDQUFDbEcsUUFsQlMsQ0FBckI7O0FBcUJBLFVBQUkrRixLQUFLLElBQUksQ0FBQyxDQUFkLEVBQWlCO0FBQ2ZVLFFBQUFBLGNBQWMsQ0FBQ1EsVUFBZixHQUE0QmxCLEtBQTVCO0FBQ0Q7O0FBQ0QsVUFBSUMsUUFBUSxJQUFJLENBQUMsQ0FBakIsRUFBb0I7QUFDbEJTLFFBQUFBLGNBQWMsQ0FBQ2hILFFBQWYsR0FBMEJ1RyxRQUExQjtBQUNEOztBQUNELFVBQUlDLFNBQVMsSUFBSSxDQUFDLENBQWxCLEVBQXFCO0FBQ25CUSxRQUFBQSxjQUFjLENBQUN6RyxRQUFmLEdBQTBCaUcsU0FBUyxDQUFDa0IsUUFBVixFQUExQjtBQUNEOztBQUVEeEMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk2QixjQUFaO0FBQ0EsVUFBSTNDLE9BQU8sR0FBRzJDLGNBQWQ7QUFDQSxVQUFJakIsTUFBTSxHQUFHO0FBQUUsd0JBQWdCLGlDQUFsQjtBQUFxREMsUUFBQUEsYUFBYSxFQUFFUyxTQUFTLENBQUNrQjtBQUE5RSxPQUFiO0FBQ0EsV0FBSzFCLFdBQUwsQ0FBaUIsS0FBS2xDLGlCQUF0QixFQUF5QyxLQUF6QyxFQUFnRE0sT0FBaEQsRUFBeUQsQ0FBekQsRUFBNEQwQixNQUE1RCxFQUFvRSxDQUFDLENBQXJFO0FBQ0QsS0FwQ0QsTUFvQ087QUFDTGIsTUFBQUEsT0FBTyxDQUFDMEMsS0FBUixDQUFjLDJDQUFkO0FBQ0Q7QUFDRixHQTVLMEI7QUE4SzNCQyxFQUFBQSxLQTlLMkIsaUJBOEtyQkMsSUE5S3FCLEVBOEtmQyxPQTlLZSxFQThLTkMsWUE5S00sRUE4S1FDLFFBOUtSLEVBOEt5QjtBQUFBLFFBQWpCQSxRQUFpQjtBQUFqQkEsTUFBQUEsUUFBaUIsR0FBTixJQUFNO0FBQUE7O0FBQ2xELFFBQUlGLE9BQU8sSUFBSSxLQUFmLEVBQXNCO0FBQ3BCLFVBQUlFLFFBQVEsSUFBSSxJQUFoQixFQUFzQjtBQUNwQixlQUFPQyxLQUFLLENBQUNKLElBQUQsRUFBTztBQUNqQkssVUFBQUEsT0FBTyxFQUFFO0FBQUUsNEJBQWdCO0FBQWxCLFdBRFE7QUFFakJDLFVBQUFBLE1BQU0sRUFBRUw7QUFGUyxTQUFQLENBQVo7QUFJRCxPQUxELE1BS087QUFDTCxlQUFPRyxLQUFLLENBQUNKLElBQUQsRUFBTztBQUNqQkssVUFBQUEsT0FBTyxFQUFFRixRQURRO0FBRWpCRyxVQUFBQSxNQUFNLEVBQUVMO0FBRlMsU0FBUCxDQUFaO0FBSUQ7QUFDRixLQVpELE1BWU87QUFDTCxVQUFJRSxRQUFRLElBQUksSUFBaEIsRUFBc0I7QUFDcEI7QUFDQTtBQUNBLGVBQU9DLEtBQUssQ0FBQ0osSUFBRCxFQUFPO0FBQ2pCSyxVQUFBQSxPQUFPLEVBQUU7QUFBRSw0QkFBZ0I7QUFBbEIsV0FEUTtBQUVqQkMsVUFBQUEsTUFBTSxFQUFFTCxPQUZTO0FBR2pCTSxVQUFBQSxJQUFJLEVBQUU3RCxJQUFJLENBQUNDLFNBQUwsQ0FBZXVELFlBQWY7QUFIVyxTQUFQLENBQVo7QUFLRCxPQVJELE1BUU87QUFDTCxlQUFPRSxLQUFLLENBQUNKLElBQUQsRUFBTztBQUNqQkssVUFBQUEsT0FBTyxFQUFFRixRQURRO0FBRWpCRyxVQUFBQSxNQUFNLEVBQUVMLE9BRlM7QUFHakJNLFVBQUFBLElBQUksRUFBRTdELElBQUksQ0FBQ0MsU0FBTCxDQUFldUQsWUFBZjtBQUhXLFNBQVAsQ0FBWjtBQUtEO0FBQ0Y7QUFDRixHQTVNMEI7QUE4TTNCL0IsRUFBQUEsV0E5TTJCLHVCQThNZjZCLElBOU1lLEVBOE1UQyxPQTlNUyxFQThNQUMsWUE5TUEsRUE4TWNNLEtBOU1kLEVBOE1xQkwsUUE5TXJCLEVBOE1zQ3BDLFFBOU10QyxFQThNcUQ7QUFBQSxRQUFoQ29DLFFBQWdDO0FBQWhDQSxNQUFBQSxRQUFnQyxHQUFyQixJQUFxQjtBQUFBOztBQUFBLFFBQWZwQyxRQUFlO0FBQWZBLE1BQUFBLFFBQWUsR0FBSixDQUFDLENBQUc7QUFBQTs7QUFDOUUwQyxJQUFBQSxhQUFhLENBQUNULElBQUQsRUFBT0MsT0FBUCxFQUFnQkMsWUFBaEIsRUFBOEJDLFFBQTlCLENBQWI7O0FBRDhFLGFBRS9ETSxhQUYrRDtBQUFBO0FBQUEsTUFrRjlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFwRzhFO0FBQUEsK0VBRTlFLGlCQUE2QlQsSUFBN0IsRUFBbUNDLE9BQW5DLEVBQTRDQyxZQUE1QyxFQUEwREMsUUFBMUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBQTBEQSxRQUExRDtBQUEwREEsa0JBQUFBLFFBQTFELEdBQXFFLElBQXJFO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHVCQUV5QnhGLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QnVFLEtBQXZCLENBQTZCQyxJQUE3QixFQUFtQ0MsT0FBbkMsRUFBNENDLFlBQTVDLEVBQTBEQyxRQUExRCxDQUZ6Qjs7QUFBQTtBQUVRTyxnQkFBQUEsUUFGUjtBQUFBO0FBQUEsdUJBR3lCQSxRQUFRLENBQUNDLElBQVQsRUFIekI7O0FBQUE7QUFHUUMsZ0JBQUFBLFFBSFI7O0FBS0ksb0JBQUlKLEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ2Q7QUFDSUssa0JBQUFBLFFBRlUsR0FFQyxJQUFJQyxnQkFBSixDQUFxQkYsUUFBUSxDQUFDdEQsVUFBOUIsRUFBMENzRCxRQUFRLENBQUNyRCxPQUFuRCxFQUE0RHFELFFBQVEsQ0FBQ3BELElBQXJFLENBRkQ7QUFHZEosa0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdUQsUUFBWjs7QUFDQSxzQkFBSTdDLFFBQVEsSUFBSSxDQUFoQixFQUFtQjtBQUNqQjtBQUNBLHdCQUFJOEMsUUFBUSxDQUFDdEQsT0FBVCxDQUFpQndELFFBQWpCLENBQTBCLFNBQTFCLEtBQXdDRixRQUFRLENBQUN0RCxPQUFULENBQWlCd0QsUUFBakIsQ0FBMEIsYUFBMUIsQ0FBNUMsRUFBc0Y7QUFDcEYzRCxzQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksdUJBQVo7QUFDQUQsc0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZd0QsUUFBWixFQUZvRixDQUlwRjs7QUFDQTVKLHNCQUFBQSxFQUFFLENBQUMrSixXQUFILENBQWVDLElBQWYsQ0FBb0IsV0FBcEIsRUFBaUNKLFFBQVEsQ0FBQ3JELElBQTFDO0FBQ0F2RyxzQkFBQUEsRUFBRSxDQUFDK0osV0FBSCxDQUFlQyxJQUFmLENBQW9CLGFBQXBCLEVBQW1DLENBQW5DO0FBQ0QscUJBUEQsTUFPTztBQUNMaEssc0JBQUFBLEVBQUUsQ0FBQytKLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixhQUFwQixFQUFtQyxDQUFuQztBQUNEO0FBQ0Y7QUFDRixpQkFqQkQsTUFpQk8sSUFBSVQsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDckI7QUFDSUssa0JBQUFBLFFBRmlCLEdBRU4sSUFBSUMsZ0JBQUosQ0FBcUJGLFFBQVEsQ0FBQ3RELFVBQTlCLEVBQTBDc0QsUUFBUSxDQUFDckQsT0FBbkQsRUFBNERxRCxRQUFRLENBQUNwRCxJQUFyRSxDQUZNO0FBR3JCSixrQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl1RCxRQUFaOztBQUNBLHNCQUFJQyxRQUFRLENBQUN0RCxPQUFULENBQWlCd0QsUUFBakIsQ0FBMEIsYUFBMUIsQ0FBSixFQUE4QztBQUM1QzlKLG9CQUFBQSxFQUFFLENBQUMrSixXQUFILENBQWVDLElBQWYsQ0FBb0IsV0FBcEIsRUFBaUNKLFFBQVEsQ0FBQ3JELElBQTFDO0FBQ0FKLG9CQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBWjtBQUNBRCxvQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl3RCxRQUFaOztBQUNBLHdCQUFJQSxRQUFRLENBQUNyRCxJQUFULENBQWM3RSxRQUFkLENBQXVCb0ksUUFBdkIsQ0FBZ0MsU0FBaEMsQ0FBSixFQUFnRDtBQUM5Q3BHLHNCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDckUsZ0JBQWdCLENBQUNJLFVBQXZEO0FBQ0F1RCxzQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCMEYsaUJBQXZCLENBQXlDTCxRQUFRLENBQUNyRCxJQUFsRCxFQUF3RCxJQUF4RDtBQUNBdkcsc0JBQUFBLEVBQUUsQ0FBQytKLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsSUFBekMsRUFBK0MsS0FBL0MsRUFBc0QsS0FBdEQsRUFBNkQsS0FBN0QsRUFBb0UsS0FBcEU7QUFDRCxxQkFKRCxNQUlPLElBQUlKLFFBQVEsQ0FBQ3JELElBQVQsQ0FBYzdFLFFBQWQsQ0FBdUJvSSxRQUF2QixDQUFnQyxTQUFoQyxDQUFKLEVBQWdEO0FBQ3JEcEcsc0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NyRSxnQkFBZ0IsQ0FBQ0ksVUFBdkQ7QUFDQXVELHNCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUIyRixpQkFBdkIsQ0FBeUNOLFFBQVEsQ0FBQ3JELElBQWxELEVBQXdELElBQXhEO0FBQ0F2RyxzQkFBQUEsRUFBRSxDQUFDK0osV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF5QyxLQUF6QyxFQUFnRCxJQUFoRCxFQUFzRCxLQUF0RCxFQUE2RCxLQUE3RCxFQUFvRSxLQUFwRTtBQUNELHFCQUpNLE1BSUEsSUFBSUosUUFBUSxDQUFDckQsSUFBVCxDQUFjN0UsUUFBZCxDQUF1Qm9JLFFBQXZCLENBQWdDLG1CQUFoQyxDQUFKLEVBQTBEO0FBQy9EcEcsc0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NyRSxnQkFBZ0IsQ0FBQ0ksVUFBdkQ7QUFDQXVELHNCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUI0RixnQkFBdkIsQ0FBd0NQLFFBQVEsQ0FBQ3JELElBQWpELEVBQXVELElBQXZEO0FBQ0F2RyxzQkFBQUEsRUFBRSxDQUFDK0osV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxFQUF1RCxJQUF2RCxFQUE2RCxLQUE3RCxFQUFvRSxLQUFwRTtBQUNELHFCQUpNLE1BSUEsSUFBSUosUUFBUSxDQUFDckQsSUFBVCxDQUFjN0UsUUFBZCxDQUF1Qm9JLFFBQXZCLENBQWdDLGFBQWhDLENBQUosRUFBb0Q7QUFDekRwRyxzQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFzQ3JFLGdCQUFnQixDQUFDSSxVQUF2RDtBQUNBdUQsc0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QjZGLGVBQXZCLENBQXVDUixRQUFRLENBQUNyRCxJQUFoRCxFQUFzRCxJQUF0RDtBQUNBdkcsc0JBQUFBLEVBQUUsQ0FBQytKLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsS0FBekMsRUFBZ0QsS0FBaEQsRUFBdUQsS0FBdkQsRUFBOEQsSUFBOUQsRUFBb0UsS0FBcEU7QUFDRCxxQkFKTSxNQUlBLElBQUlKLFFBQVEsQ0FBQ3JELElBQVQsQ0FBYzdFLFFBQWQsQ0FBdUJvSSxRQUF2QixDQUFnQyxpQkFBaEMsQ0FBSixFQUF3RDtBQUM3RHBHLHNCQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDckUsZ0JBQWdCLENBQUNJLFVBQXZEO0FBQ0F1RCxzQkFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCOEYsa0JBQXZCLENBQTBDVCxRQUFRLENBQUNyRCxJQUFuRCxFQUF5RCxJQUF6RDtBQUNBdkcsc0JBQUFBLEVBQUUsQ0FBQytKLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsS0FBekMsRUFBZ0QsS0FBaEQsRUFBdUQsS0FBdkQsRUFBOEQsS0FBOUQsRUFBcUUsSUFBckU7QUFDRDtBQUNGLG1CQXpCRCxNQXlCTyxJQUFJSixRQUFRLENBQUN0RCxPQUFULENBQWlCd0QsUUFBakIsQ0FBMEIsT0FBMUIsS0FBc0NGLFFBQVEsQ0FBQ3RELE9BQVQsQ0FBaUJ3RCxRQUFqQixDQUEwQixZQUExQixDQUExQyxFQUFtRjtBQUN4RnBHLG9CQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDckUsZ0JBQWdCLENBQUNNLG9CQUF2RDtBQUNBTCxvQkFBQUEsRUFBRSxDQUFDK0osV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQjtBQUNELG1CQUhNLE1BR0EsSUFBSUosUUFBUSxDQUFDdEQsT0FBVCxDQUFpQndELFFBQWpCLENBQTBCLGlCQUExQixDQUFKLEVBQWtEO0FBQ3ZEcEcsb0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NyRSxnQkFBZ0IsQ0FBQ0ssWUFBdkQ7QUFDQUosb0JBQUFBLEVBQUUsQ0FBQytKLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEI7QUFDRCxtQkFITSxNQUdBLElBQUlKLFFBQVEsQ0FBQ3RELE9BQVQsQ0FBaUJ3RCxRQUFqQixDQUEwQiw2Q0FBMUIsQ0FBSixFQUE4RTtBQUNuRnBHLG9CQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDckUsZ0JBQWdCLENBQUNNLG9CQUF2RDtBQUNBTCxvQkFBQUEsRUFBRSxDQUFDK0osV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQjtBQUNELG1CQUhNLE1BR0EsSUFBSUosUUFBUSxDQUFDdEQsT0FBVCxDQUFpQndELFFBQWpCLENBQTBCLDRDQUExQixDQUFKLEVBQTZFO0FBQ2xGcEcsb0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NyRSxnQkFBZ0IsQ0FBQ1EsY0FBdkQ7QUFDQVAsb0JBQUFBLEVBQUUsQ0FBQytKLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEI7QUFDRDtBQUNGLGlCQTFDTSxNQTBDQSxJQUFJVCxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNqQkssa0JBQUFBLFFBRGlCLEdBQ04sSUFBSUMsZ0JBQUosQ0FBcUJGLFFBQVEsQ0FBQ3RELFVBQTlCLEVBQTBDc0QsUUFBUSxDQUFDckQsT0FBbkQsRUFBNERxRCxRQUFRLENBQUNwRCxJQUFyRSxDQURNO0FBRXJCSixrQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl1RCxRQUFaO0FBQ0Q7O0FBbkVMO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQXFFSSxvQkFBSUosS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDZDtBQUNBN0Ysa0JBQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NyRSxnQkFBZ0IsQ0FBQ08sU0FBdkQ7QUFDQU4sa0JBQUFBLEVBQUUsQ0FBQytKLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEI7QUFDRDs7QUFDRDdELGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx1QkFBWjtBQUNBRCxnQkFBQUEsT0FBTyxDQUFDMEMsS0FBUixDQUFjLFlBQUVGLFFBQUYsRUFBZDs7QUEzRUo7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRjhFO0FBQUE7QUFBQTtBQXFHL0UsR0FuVDBCO0FBcVQzQnNCLEVBQUFBLGlCQXJUMkIsNkJBcVRUSyxZQXJUUyxFQXFUS0MsVUFyVEwsRUFxVGlCO0FBQzFDO0FBQ0EsU0FBSzNHLFdBQUwsQ0FBaUJsRCxJQUFqQixHQUF3QjRKLFlBQVksQ0FBQzVKLElBQXJDO0FBQ0EsU0FBS2tELFdBQUwsQ0FBaUJoRCxHQUFqQixHQUF1QjBKLFlBQVksQ0FBQ2hDLEdBQXBDO0FBQ0EsU0FBSzFFLFdBQUwsQ0FBaUIvQyxVQUFqQixHQUE4QnlKLFlBQVksQ0FBQ3pKLFVBQTNDO0FBQ0EsU0FBSytDLFdBQUwsQ0FBaUI5QyxZQUFqQixHQUFnQ3dKLFlBQVksQ0FBQ25DLEVBQTdDO0FBQ0EsU0FBS3ZFLFdBQUwsQ0FBaUI3QyxXQUFqQixHQUErQnVKLFlBQVksQ0FBQ3ZKLFdBQTVDO0FBQ0EsU0FBSzZDLFdBQUwsQ0FBaUI1QyxZQUFqQixHQUFnQ3NKLFlBQVksQ0FBQy9CLE1BQTdDO0FBQ0EsU0FBSzNFLFdBQUwsQ0FBaUIzQyxRQUFqQixHQUE0QnFKLFlBQVksQ0FBQ3JKLFFBQXpDO0FBQ0EsU0FBSzJDLFdBQUwsQ0FBaUIxQyxVQUFqQixHQUE4Qm9KLFlBQVksQ0FBQzlCLFNBQTNDO0FBQ0EsU0FBSzVFLFdBQUwsQ0FBaUJ6QyxjQUFqQixHQUFrQ21KLFlBQVksQ0FBQ25KLGNBQS9DO0FBQ0EsU0FBS3lDLFdBQUwsQ0FBaUJ4QyxRQUFqQixHQUE0QmtKLFlBQVksQ0FBQzdCLFVBQXpDO0FBQ0EsU0FBSzdFLFdBQUwsQ0FBaUJyQyxNQUFqQixHQUEwQitJLFlBQVksQ0FBQy9JLE1BQXZDO0FBQ0EsU0FBS3FDLFdBQUwsQ0FBaUJwQyxRQUFqQixHQUE0QjhJLFlBQVksQ0FBQzlJLFFBQXpDO0FBQ0EsU0FBS29DLFdBQUwsQ0FBaUJuQyxRQUFqQixHQUE0QjZJLFlBQVksQ0FBQzdJLFFBQXpDO0FBQ0EsU0FBS21DLFdBQUwsQ0FBaUJsQyxRQUFqQixHQUE0QjRJLFlBQVksQ0FBQzVJLFFBQXpDOztBQUVBLFFBQUk2SSxVQUFKLEVBQWdCO0FBQ2QsV0FBSzNHLFdBQUwsQ0FBaUJ2QyxXQUFqQixHQUErQmlKLFlBQVksQ0FBQzFCLFNBQTVDO0FBQ0EsV0FBS2hGLFdBQUwsQ0FBaUJ0QyxTQUFqQixHQUE2QmdKLFlBQVksQ0FBQ0UsU0FBMUM7QUFDRDs7QUFFRHJFLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUt4QyxXQUFqQjtBQUNELEdBNVUwQjtBQThVM0JzRyxFQUFBQSxpQkE5VTJCLDZCQThVVEksWUE5VVMsRUE4VUtDLFVBOVVMLEVBOFVpQjtBQUMxQyxTQUFLdkcsV0FBTCxDQUFpQnRELElBQWpCLEdBQXdCNEosWUFBWSxDQUFDNUosSUFBckM7QUFDQSxTQUFLc0QsV0FBTCxDQUFpQnRCLE1BQWpCLEdBQTBCNEgsWUFBWSxDQUFDL0csVUFBdkM7QUFDQSxTQUFLUyxXQUFMLENBQWlCckIsV0FBakIsR0FBK0IySCxZQUFZLENBQUMzSCxXQUE1QztBQUNBLFNBQUtxQixXQUFMLENBQWlCbEQsWUFBakIsR0FBZ0N3SixZQUFZLENBQUNuQyxFQUE3QztBQUNBLFNBQUtuRSxXQUFMLENBQWlCcEIsYUFBakIsR0FBaUMwSCxZQUFZLENBQUMxSCxhQUE5QztBQUNBLFNBQUtvQixXQUFMLENBQWlCekMsTUFBakIsR0FBMEIrSSxZQUFZLENBQUMvSSxNQUF2QztBQUNBLFNBQUt5QyxXQUFMLENBQWlCeEMsUUFBakIsR0FBNEI4SSxZQUFZLENBQUM5SSxRQUF6QztBQUNBLFNBQUt3QyxXQUFMLENBQWlCdkMsUUFBakIsR0FBNEI2SSxZQUFZLENBQUM3SSxRQUF6QztBQUNBLFNBQUt1QyxXQUFMLENBQWlCdEMsUUFBakIsR0FBNEI0SSxZQUFZLENBQUM1SSxRQUF6Qzs7QUFFQSxRQUFJNkksVUFBSixFQUFnQjtBQUNkLFdBQUt2RyxXQUFMLENBQWlCM0MsV0FBakIsR0FBK0JpSixZQUFZLENBQUMxQixTQUE1QztBQUNBLFdBQUs1RSxXQUFMLENBQWlCMUMsU0FBakIsR0FBNkJnSixZQUFZLENBQUNFLFNBQTFDO0FBQ0Q7O0FBRURyRSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLcEMsV0FBakI7QUFDRCxHQS9WMEI7QUFpVzNCbUcsRUFBQUEsZ0JBalcyQiw0QkFpV1ZHLFlBaldVLEVBaVdJQyxVQWpXSixFQWlXZ0I7QUFDekMsU0FBS3RHLFVBQUwsQ0FBZ0J2RCxJQUFoQixHQUF1QjRKLFlBQVksQ0FBQzVKLElBQXBDO0FBQ0EsU0FBS3VELFVBQUwsQ0FBZ0JuRCxZQUFoQixHQUErQndKLFlBQVksQ0FBQ25DLEVBQTVDO0FBQ0EsU0FBS2xFLFVBQUwsQ0FBZ0JyQixhQUFoQixHQUFnQzBILFlBQVksQ0FBQzFILGFBQTdDO0FBQ0EsU0FBS3FCLFVBQUwsQ0FBZ0IxQyxNQUFoQixHQUF5QitJLFlBQVksQ0FBQy9JLE1BQXRDO0FBQ0EsU0FBSzBDLFVBQUwsQ0FBZ0JiLE9BQWhCLEdBQTBCa0gsWUFBWSxDQUFDbEgsT0FBdkM7QUFDQSxTQUFLYSxVQUFMLENBQWdCekMsUUFBaEIsR0FBMkI4SSxZQUFZLENBQUM5SSxRQUF4QztBQUNBLFNBQUt5QyxVQUFMLENBQWdCeEMsUUFBaEIsR0FBMkI2SSxZQUFZLENBQUM3SSxRQUF4QztBQUNBLFNBQUt3QyxVQUFMLENBQWdCdkMsUUFBaEIsR0FBMkI0SSxZQUFZLENBQUM1SSxRQUF4Qzs7QUFFQSxRQUFJNkksVUFBSixFQUFnQjtBQUNkLFdBQUt0RyxVQUFMLENBQWdCNUMsV0FBaEIsR0FBOEJpSixZQUFZLENBQUMxQixTQUEzQztBQUNBLFdBQUszRSxVQUFMLENBQWdCM0MsU0FBaEIsR0FBNEJnSixZQUFZLENBQUNFLFNBQXpDO0FBQ0Q7O0FBRURyRSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLbkMsVUFBakI7QUFDRCxHQWpYMEI7QUFtWDNCbUcsRUFBQUEsZUFuWDJCLDJCQW1YWEUsWUFuWFcsRUFtWEdDLFVBblhILEVBbVhlO0FBQ3hDLFNBQUtyRyxTQUFMLENBQWV4RCxJQUFmLEdBQXNCNEosWUFBWSxDQUFDNUosSUFBbkM7QUFDQSxTQUFLd0QsU0FBTCxDQUFlcEQsWUFBZixHQUE4QndKLFlBQVksQ0FBQ25DLEVBQTNDO0FBQ0EsU0FBS2pFLFNBQUwsQ0FBZXRCLGFBQWYsR0FBK0IwSCxZQUFZLENBQUMxSCxhQUE1QztBQUNBLFNBQUtzQixTQUFMLENBQWUzQyxNQUFmLEdBQXdCK0ksWUFBWSxDQUFDL0ksTUFBckM7QUFDQSxTQUFLMkMsU0FBTCxDQUFlWCxVQUFmLEdBQTRCK0csWUFBWSxDQUFDL0csVUFBekM7QUFDQSxTQUFLVyxTQUFMLENBQWUxQyxRQUFmLEdBQTBCOEksWUFBWSxDQUFDOUksUUFBdkM7QUFDQSxTQUFLMEMsU0FBTCxDQUFlekMsUUFBZixHQUEwQjZJLFlBQVksQ0FBQzdJLFFBQXZDO0FBQ0EsU0FBS3lDLFNBQUwsQ0FBZXhDLFFBQWYsR0FBMEI0SSxZQUFZLENBQUM1SSxRQUF2Qzs7QUFFQSxRQUFJNkksVUFBSixFQUFnQjtBQUNkLFdBQUtyRyxTQUFMLENBQWU3QyxXQUFmLEdBQTZCaUosWUFBWSxDQUFDMUIsU0FBMUM7QUFDQSxXQUFLMUUsU0FBTCxDQUFlNUMsU0FBZixHQUEyQmdKLFlBQVksQ0FBQ0UsU0FBeEM7QUFDRDs7QUFFRHJFLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtsQyxTQUFqQjtBQUNELEdBblkwQjtBQXFZM0JtRyxFQUFBQSxrQkFyWTJCLDhCQXFZUkMsWUFyWVEsRUFxWU1DLFVBcllOLEVBcVlrQjtBQUMzQyxTQUFLcEcsWUFBTCxDQUFrQnpELElBQWxCLEdBQXlCNEosWUFBWSxDQUFDNUosSUFBdEM7QUFDQSxTQUFLeUQsWUFBTCxDQUFrQnJELFlBQWxCLEdBQWlDd0osWUFBWSxDQUFDbkMsRUFBOUM7QUFDQSxTQUFLaEUsWUFBTCxDQUFrQjNDLFFBQWxCLEdBQTZCOEksWUFBWSxDQUFDOUksUUFBMUM7QUFDQSxTQUFLMkMsWUFBTCxDQUFrQjFDLFFBQWxCLEdBQTZCNkksWUFBWSxDQUFDN0ksUUFBMUM7QUFDQSxTQUFLMEMsWUFBTCxDQUFrQnpDLFFBQWxCLEdBQTZCNEksWUFBWSxDQUFDNUksUUFBMUM7O0FBRUEsUUFBSTZJLFVBQUosRUFBZ0I7QUFDZCxXQUFLcEcsWUFBTCxDQUFrQjlDLFdBQWxCLEdBQWdDaUosWUFBWSxDQUFDMUIsU0FBN0M7QUFDQSxXQUFLekUsWUFBTCxDQUFrQjdDLFNBQWxCLEdBQThCZ0osWUFBWSxDQUFDRSxTQUEzQztBQUNEOztBQUVEckUsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS2pDLFlBQWpCO0FBQ0QsR0FsWjBCO0FBbVozQnNHLEVBQUFBLEtBbloyQixtQkFtWm5CLENBQUUsQ0FuWmlCO0FBcVozQkMsRUFBQUEsa0JBcloyQiw4QkFxWlJkLFFBclpRLEVBcVpFO0FBQzNCekQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMkNBQVo7QUFDQUQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl3RCxRQUFaOztBQUNBLFFBQUlBLFFBQVEsQ0FBQ2xJLFFBQVQsQ0FBa0JvSSxRQUFsQixDQUEyQixTQUEzQixDQUFKLEVBQTJDO0FBQ3pDcEcsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFzQ3JFLGdCQUFnQixDQUFDSSxVQUF2RDtBQUNBdUQsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCMEYsaUJBQXZCLENBQXlDTCxRQUF6QyxFQUFtRCxJQUFuRDtBQUNBNUosTUFBQUEsRUFBRSxDQUFDK0osV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF5QyxJQUF6QyxFQUErQyxLQUEvQyxFQUFzRCxLQUF0RCxFQUE2RCxLQUE3RCxFQUFvRSxLQUFwRTtBQUNELEtBSkQsTUFJTyxJQUFJSixRQUFRLENBQUNsSSxRQUFULENBQWtCb0ksUUFBbEIsQ0FBMkIsU0FBM0IsQ0FBSixFQUEyQztBQUNoRHBHLE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NyRSxnQkFBZ0IsQ0FBQ0ksVUFBdkQ7QUFDQXVELE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QjJGLGlCQUF2QixDQUF5Q04sUUFBekMsRUFBbUQsSUFBbkQ7QUFDQTVKLE1BQUFBLEVBQUUsQ0FBQytKLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsS0FBekMsRUFBZ0QsSUFBaEQsRUFBc0QsS0FBdEQsRUFBNkQsS0FBN0QsRUFBb0UsS0FBcEU7QUFDRCxLQUpNLE1BSUEsSUFBSUosUUFBUSxDQUFDbEksUUFBVCxDQUFrQm9JLFFBQWxCLENBQTJCLG1CQUEzQixDQUFKLEVBQXFEO0FBQzFEcEcsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCSCxZQUF2QixHQUFzQ3JFLGdCQUFnQixDQUFDSSxVQUF2RDtBQUNBdUQsTUFBQUEsYUFBYSxDQUFDYSxRQUFkLENBQXVCNEYsZ0JBQXZCLENBQXdDUCxRQUF4QyxFQUFrRCxJQUFsRDtBQUNBNUosTUFBQUEsRUFBRSxDQUFDK0osV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxFQUF1RCxJQUF2RCxFQUE2RCxLQUE3RCxFQUFvRSxLQUFwRTtBQUNELEtBSk0sTUFJQSxJQUFJSixRQUFRLENBQUNsSSxRQUFULENBQWtCb0ksUUFBbEIsQ0FBMkIsYUFBM0IsQ0FBSixFQUErQztBQUNwRHBHLE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QkgsWUFBdkIsR0FBc0NyRSxnQkFBZ0IsQ0FBQ0ksVUFBdkQ7QUFDQXVELE1BQUFBLGFBQWEsQ0FBQ2EsUUFBZCxDQUF1QjZGLGVBQXZCLENBQXVDUixRQUF2QyxFQUFpRCxJQUFqRDtBQUNBNUosTUFBQUEsRUFBRSxDQUFDK0osV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxFQUF1RCxLQUF2RCxFQUE4RCxJQUE5RCxFQUFvRSxLQUFwRTtBQUNELEtBSk0sTUFJQSxJQUFJSixRQUFRLENBQUNsSSxRQUFULENBQWtCb0ksUUFBbEIsQ0FBMkIsaUJBQTNCLENBQUosRUFBbUQ7QUFDeERwRyxNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUJILFlBQXZCLEdBQXNDckUsZ0JBQWdCLENBQUNJLFVBQXZEO0FBQ0F1RCxNQUFBQSxhQUFhLENBQUNhLFFBQWQsQ0FBdUI4RixrQkFBdkIsQ0FBMENULFFBQTFDLEVBQW9ELElBQXBEO0FBQ0E1SixNQUFBQSxFQUFFLENBQUMrSixXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCLEVBQXlDLEtBQXpDLEVBQWdELEtBQWhELEVBQXVELEtBQXZELEVBQThELEtBQTlELEVBQXFFLElBQXJFO0FBQ0Q7QUFDRjtBQTdhMEIsQ0FBVCxDQUFwQixFQWdiQTs7QUFDQSxJQUFJakQsV0FBVyxHQUFHL0csRUFBRSxDQUFDUyxLQUFILENBQVM7QUFDekJDLEVBQUFBLElBQUksRUFBRSxhQURtQjtBQUV6QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZnSyxJQUFBQSxLQUFLLEVBQUUsRUFERztBQUVWdEMsSUFBQUEsSUFBSSxFQUFFO0FBRkksR0FGYTtBQU16QjtBQUNBMUcsRUFBQUEsSUFBSSxFQUFFLGNBQVVpRixNQUFWLEVBQTJCQyxLQUEzQixFQUEyQztBQUFBLFFBQWpDRCxNQUFpQztBQUFqQ0EsTUFBQUEsTUFBaUMsR0FBeEIsTUFBd0I7QUFBQTs7QUFBQSxRQUFoQkMsS0FBZ0I7QUFBaEJBLE1BQUFBLEtBQWdCLEdBQVIsTUFBUTtBQUFBOztBQUMvQyxTQUFLOEQsS0FBTCxHQUFhL0QsTUFBYjtBQUNBLFNBQUt5QixJQUFMLEdBQVl4QixLQUFaO0FBQ0Q7QUFWd0IsQ0FBVCxDQUFsQixFQWFBOztBQUNBLElBQUkrRCxJQUFJLEdBQUc1SyxFQUFFLENBQUNTLEtBQUgsQ0FBUztBQUNsQkMsRUFBQUEsSUFBSSxFQUFFLE1BRFk7QUFFbEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWOEgsSUFBQUEsVUFBVSxFQUFFLEVBREY7QUFFVm9DLElBQUFBLEdBQUcsRUFBRSxFQUZLO0FBR1ZqQyxJQUFBQSxTQUFTLEVBQUUsRUFIRDtBQUlWakcsSUFBQUEsV0FBVyxFQUFFLEVBSkg7QUFLVkMsSUFBQUEsYUFBYSxFQUFFLEVBTEw7QUFNVlcsSUFBQUEsVUFBVSxFQUFFLEVBTkY7QUFPVnRDLElBQUFBLFFBQVEsRUFBRSxFQVBBO0FBUVY2SixJQUFBQSxTQUFTLEVBQUUsQ0FSRDtBQVNWQyxJQUFBQSxTQUFTLEVBQUUsS0FURDtBQVVWQyxJQUFBQSxTQUFTLEVBQUUsRUFWRDtBQVdWbkssSUFBQUEsVUFBVSxFQUFFLEVBWEY7QUFZVkgsSUFBQUEsSUFBSSxFQUFFLEVBWkk7QUFhVmdCLElBQUFBLFFBQVEsRUFBRSxFQWJBO0FBY1YwRyxJQUFBQSxRQUFRLEVBQUUsRUFkQTtBQWVWRyxJQUFBQSxNQUFNLEVBQUUsRUFmRTtBQWdCVmlDLElBQUFBLFNBQVMsRUFBRSxDQWhCRDtBQWlCVnpKLElBQUFBLFdBQVcsRUFBRSxFQWpCSDtBQWtCVnVILElBQUFBLEdBQUcsRUFBRSxFQWxCSztBQW1CVkgsSUFBQUEsRUFBRSxFQUFFLEVBbkJNO0FBb0JWSyxJQUFBQSxTQUFTLEVBQUUsRUFwQkQ7QUFxQlZ5QyxJQUFBQSxFQUFFLEVBQUUsRUFyQk07QUFzQlY5SixJQUFBQSxjQUFjLEVBQUUsRUF0Qk47QUF1QlZJLElBQUFBLE1BQU0sRUFBRSxFQXZCRTtBQXdCVjZCLElBQUFBLE9BQU8sRUFBRSxFQXhCQztBQXlCVjVCLElBQUFBLFFBQVEsRUFBRSxFQXpCQTtBQTBCVmtILElBQUFBLFlBQVksRUFBRSxFQTFCSjtBQTJCVmpILElBQUFBLFFBQVEsRUFBRSxFQTNCQTtBQTRCVjRHLElBQUFBLElBQUksRUFBRSxFQTVCSTtBQTZCVnNDLElBQUFBLEtBQUssRUFBRSxFQTdCRztBQThCVk8sSUFBQUEsU0FBUyxFQUFFO0FBOUJEO0FBRk0sQ0FBVCxDQUFYLEVBb0NBOztBQUNBLElBQUlyQixnQkFBZ0IsR0FBRzdKLEVBQUUsQ0FBQ1MsS0FBSCxDQUFTO0FBQzlCQyxFQUFBQSxJQUFJLEVBQUUsa0JBRHdCO0FBRTlCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVjBGLElBQUFBLFVBQVUsRUFBRSxFQURGO0FBRVZDLElBQUFBLE9BQU8sRUFBRSxFQUZDO0FBR1ZDLElBQUFBLElBQUksRUFBRXFFO0FBSEksR0FGa0I7QUFPOUI7QUFDQWpKLEVBQUFBLElBQUksRUFBRSxjQUFVd0osV0FBVixFQUFnQ0MsUUFBaEMsRUFBbUQzRSxLQUFuRCxFQUFpRTtBQUFBLFFBQXZEMEUsV0FBdUQ7QUFBdkRBLE1BQUFBLFdBQXVELEdBQXpDLE1BQXlDO0FBQUE7O0FBQUEsUUFBakNDLFFBQWlDO0FBQWpDQSxNQUFBQSxRQUFpQyxHQUF0QixNQUFzQjtBQUFBOztBQUFBLFFBQWQzRSxLQUFjO0FBQWRBLE1BQUFBLEtBQWMsR0FBTixJQUFNO0FBQUE7O0FBQ3JFLFNBQUtKLFVBQUwsR0FBa0I4RSxXQUFsQjtBQUNBLFNBQUs3RSxPQUFMLEdBQWU4RSxRQUFmO0FBQ0EsU0FBSzdFLElBQUwsR0FBWUUsS0FBWjtBQUNEO0FBWjZCLENBQVQsQ0FBdkIsRUFlQTs7QUFDQSxJQUFJbEIsZ0JBQWdCLEdBQUd2RixFQUFFLENBQUNTLEtBQUgsQ0FBUztBQUM5QkMsRUFBQUEsSUFBSSxFQUFFLGtCQUR3QjtBQUU5QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZnSyxJQUFBQSxLQUFLLEVBQUUsRUFERztBQUVWdkMsSUFBQUEsUUFBUSxFQUFFLEVBRkE7QUFHVkMsSUFBQUEsSUFBSSxFQUFFLEVBSEk7QUFJVmdELElBQUFBLE9BQU8sRUFBRTtBQUpDLEdBRmtCO0FBUTlCO0FBQ0ExSixFQUFBQSxJQUFJLEVBQUUsY0FBVWlGLE1BQVYsRUFBMkJRLFNBQTNCLEVBQStDUCxLQUEvQyxFQUErRFEsUUFBL0QsRUFBa0Y7QUFBQSxRQUF4RVQsTUFBd0U7QUFBeEVBLE1BQUFBLE1BQXdFLEdBQS9ELE1BQStEO0FBQUE7O0FBQUEsUUFBdkRRLFNBQXVEO0FBQXZEQSxNQUFBQSxTQUF1RCxHQUEzQyxNQUEyQztBQUFBOztBQUFBLFFBQW5DUCxLQUFtQztBQUFuQ0EsTUFBQUEsS0FBbUMsR0FBM0IsTUFBMkI7QUFBQTs7QUFBQSxRQUFuQlEsUUFBbUI7QUFBbkJBLE1BQUFBLFFBQW1CLEdBQVIsTUFBUTtBQUFBOztBQUN0RixTQUFLc0QsS0FBTCxHQUFhL0QsTUFBYjtBQUNBLFNBQUt3QixRQUFMLEdBQWdCaEIsU0FBaEI7QUFDQSxTQUFLaUIsSUFBTCxHQUFZeEIsS0FBWjtBQUNBLFNBQUt3RSxPQUFMLEdBQWVoRSxRQUFmO0FBQ0Q7QUFkNkIsQ0FBVCxDQUF2QixFQWlCQTs7QUFDQSxJQUFJYSxxQkFBcUIsR0FBR2xJLEVBQUUsQ0FBQ1MsS0FBSCxDQUFTO0FBQ25DQyxFQUFBQSxJQUFJLEVBQUUsdUJBRDZCO0FBRW5DQyxFQUFBQSxVQUFVLEVBQUU7QUFDVmdLLElBQUFBLEtBQUssRUFBRSxFQURHO0FBRVZ2QyxJQUFBQSxRQUFRLEVBQUUsRUFGQTtBQUdWMUgsSUFBQUEsSUFBSSxFQUFFLEVBSEk7QUFJVjJILElBQUFBLElBQUksRUFBRSxFQUpJO0FBS1ZDLElBQUFBLEdBQUcsRUFBRSxFQUxLO0FBTVZ6SCxJQUFBQSxVQUFVLEVBQUUsRUFORjtBQU9WRSxJQUFBQSxXQUFXLEVBQUUsRUFQSDtBQVFWd0gsSUFBQUEsTUFBTSxFQUFFLEVBUkU7QUFTVnRILElBQUFBLFFBQVEsRUFBRSxFQVRBO0FBVVZ1SCxJQUFBQSxTQUFTLEVBQUUsRUFWRDtBQVdWL0csSUFBQUEsUUFBUSxFQUFFLEVBWEE7QUFZVk4sSUFBQUEsY0FBYyxFQUFFLEVBWk47QUFhVnNILElBQUFBLFVBQVUsRUFBRSxFQWJGO0FBY1Y2QyxJQUFBQSxVQUFVLEVBQUUsRUFkRjtBQWVWQyxJQUFBQSxTQUFTLEVBQUUsRUFmRDtBQWdCVjdDLElBQUFBLFlBQVksRUFBRSxFQWhCSjtBQWlCVm5GLElBQUFBLFVBQVUsRUFBRSxFQWpCRjtBQWtCVi9CLElBQUFBLFFBQVEsRUFBRTtBQWxCQSxHQUZ1QjtBQXNCbkM7QUFDQUcsRUFBQUEsSUFBSSxFQUFFLGNBQ0ppRixNQURJLEVBRUpRLFNBRkksRUFHSnhGLEtBSEksRUFJSmlGLEtBSkksRUFLSmhGLElBTEksRUFNSkMsV0FOSSxFQU9KRSxZQVBJLEVBUUp3SixPQVJJLEVBU0p0SixTQVRJLEVBVUp1SixVQVZJLEVBV0psSixTQVhJLEVBWUpILGVBWkksRUFhSnNKLFdBYkksRUFjSkMsV0FkSSxFQWVKQyxVQWZJLEVBZ0JKQyxhQWhCSSxFQWlCSnJJLFdBakJJLEVBa0JKaUUsU0FsQkksRUFtQko7QUFBQSxRQWxCQWIsTUFrQkE7QUFsQkFBLE1BQUFBLE1Ba0JBLEdBbEJTLE1Ba0JUO0FBQUE7O0FBQUEsUUFqQkFRLFNBaUJBO0FBakJBQSxNQUFBQSxTQWlCQSxHQWpCWSxNQWlCWjtBQUFBOztBQUFBLFFBaEJBeEYsS0FnQkE7QUFoQkFBLE1BQUFBLEtBZ0JBLEdBaEJRLEVBZ0JSO0FBQUE7O0FBQUEsUUFmQWlGLEtBZUE7QUFmQUEsTUFBQUEsS0FlQSxHQWZRLE1BZVI7QUFBQTs7QUFBQSxRQWRBaEYsSUFjQTtBQWRBQSxNQUFBQSxJQWNBLEdBZE8sRUFjUDtBQUFBOztBQUFBLFFBYkFDLFdBYUE7QUFiQUEsTUFBQUEsV0FhQSxHQWJjLEVBYWQ7QUFBQTs7QUFBQSxRQVpBRSxZQVlBO0FBWkFBLE1BQUFBLFlBWUEsR0FaZSxFQVlmO0FBQUE7O0FBQUEsUUFYQXdKLE9BV0E7QUFYQUEsTUFBQUEsT0FXQSxHQVhVLEVBV1Y7QUFBQTs7QUFBQSxRQVZBdEosU0FVQTtBQVZBQSxNQUFBQSxTQVVBLEdBVlksRUFVWjtBQUFBOztBQUFBLFFBVEF1SixVQVNBO0FBVEFBLE1BQUFBLFVBU0EsR0FUYSxFQVNiO0FBQUE7O0FBQUEsUUFSQWxKLFNBUUE7QUFSQUEsTUFBQUEsU0FRQSxHQVJZLEVBUVo7QUFBQTs7QUFBQSxRQVBBSCxlQU9BO0FBUEFBLE1BQUFBLGVBT0EsR0FQa0IsRUFPbEI7QUFBQTs7QUFBQSxRQU5Bc0osV0FNQTtBQU5BQSxNQUFBQSxXQU1BLEdBTmMsRUFNZDtBQUFBOztBQUFBLFFBTEFDLFdBS0E7QUFMQUEsTUFBQUEsV0FLQSxHQUxjLEVBS2Q7QUFBQTs7QUFBQSxRQUpBQyxVQUlBO0FBSkFBLE1BQUFBLFVBSUEsR0FKYSxFQUliO0FBQUE7O0FBQUEsUUFIQUMsYUFHQTtBQUhBQSxNQUFBQSxhQUdBLEdBSGdCLEVBR2hCO0FBQUE7O0FBQUEsUUFGQXJJLFdBRUE7QUFGQUEsTUFBQUEsV0FFQSxHQUZjLEVBRWQ7QUFBQTs7QUFBQSxRQURBaUUsU0FDQTtBQURBQSxNQUFBQSxTQUNBLEdBRFksRUFDWjtBQUFBOztBQUNBLFNBQUtrRCxLQUFMLEdBQWEvRCxNQUFiO0FBQ0EsU0FBS3dCLFFBQUwsR0FBZ0JoQixTQUFoQjtBQUNBLFNBQUsxRyxJQUFMLEdBQVlrQixLQUFaO0FBQ0EsU0FBS3lHLElBQUwsR0FBWXhCLEtBQVo7QUFDQSxTQUFLeUIsR0FBTCxHQUFXekcsSUFBWDtBQUNBLFNBQUtoQixVQUFMLEdBQWtCaUIsV0FBbEI7QUFDQSxTQUFLZixXQUFMLEdBQW1CaUIsWUFBbkI7QUFDQSxTQUFLdUcsTUFBTCxHQUFjaUQsT0FBZDtBQUNBLFNBQUt2SyxRQUFMLEdBQWdCaUIsU0FBaEI7QUFDQSxTQUFLc0csU0FBTCxHQUFpQmlELFVBQWpCO0FBQ0EsU0FBS2hLLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS3BCLGNBQUwsR0FBc0JpQixlQUF0QjtBQUNBLFNBQUtxRyxVQUFMLEdBQWtCaUQsV0FBbEI7QUFDQSxTQUFLSixVQUFMLEdBQWtCSyxXQUFsQjtBQUNBLFNBQUtKLFNBQUwsR0FBaUJLLFVBQWpCO0FBQ0EsU0FBS2xELFlBQUwsR0FBb0JtRCxhQUFwQjtBQUNBLFNBQUt0SSxVQUFMLEdBQWtCQyxXQUFsQjtBQUNBLFNBQUtoQyxRQUFMLEdBQWdCaUcsU0FBaEI7QUFDRDtBQTdEa0MsQ0FBVCxDQUE1QjtlQWdFZS9EIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgSXNXZWIgPSBmYWxzZTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJlc3BvbnNlVHlwZUVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFN1Y2Nlc3NmdWw6IDEsXHJcbiAgVXNlck5vdEZvdW5kOiAyLFxyXG4gIEludmFsaWRFbWFpbFBhc3N3b3JkOiAzLFxyXG4gIFdlbnRXcm9uZzogNCxcclxuICBMaWNlbnNlSW52YWxpZDogNSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3R1ZGVudCBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdHVkZW50ID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3R1ZGVudFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBkT0I6IFwiXCIsXHJcbiAgICBncmFkZUxldmVsOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgdGVhY2hlck5hbWU6IFwiXCIsXHJcbiAgICBmYWNlYm9va1BhZ2U6IFwiXCIsXHJcbiAgICBnYW1lc1dvbjogMCxcclxuICAgIHRlc3RzVGFrZW46IDAsXHJcbiAgICB0ZXN0aW5nQXZlcmFnZTogMCxcclxuICAgIGdhbWVDYXNoOiAwLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX2RvYiA9IFwibm9uZVwiLCBfZ3JhZGVMZXZlbCA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF90ZWFjaGVyTmFtZSA9IFwibm9uZVwiLCBfZmFjZWJvb2tQYWdlID0gXCJub25lXCIsIF9nYW1lc1dvbiA9IDAsIF90ZXN0c1Rha2VuID0gMCwgX3Rlc3RpbmdBdmVyYWdlID0gMCwgX2dhbWVDYXNoID0gMCwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLmRPQiA9IF9kb2I7XHJcbiAgICB0aGlzLmdyYWRlTGV2ZWwgPSBfZ3JhZGVMZXZlbDtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMudGVhY2hlck5hbWUgPSBfdGVhY2hlck5hbWU7XHJcbiAgICB0aGlzLmZhY2Vib29rUGFnZSA9IF9mYWNlYm9va1BhZ2U7XHJcbiAgICB0aGlzLmdhbWVzV29uID0gX2dhbWVzV29uO1xyXG4gICAgdGhpcy50ZXN0c1Rha2VuID0gX3Rlc3RzVGFrZW47XHJcbiAgICB0aGlzLnRlc3RpbmdBdmVyYWdlID0gX3Rlc3RpbmdBdmVyYWdlO1xyXG4gICAgdGhpcy5nYW1lQ2FzaCA9IF9nYW1lQ2FzaDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBUZWFjaGVyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgVGVhY2hlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlRlYWNoZXJcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgc2Nob29sOiBcIlwiLFxyXG4gICAgY2xhc3NUYXVnaHQ6IDAsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfc2Nob29sID0gXCJub25lXCIsIF9jbGFzc1RhdWdodCA9IDAsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX2NvbnRhY3ROdW1iZXIgPSBcIm5vbmVcIiwgX2FjY2Vzc1Rva2VuID0gXCJcIiwgX3VwZGF0ZWRBdCA9IDAsIF91c2VySUQgPSBcIlwiLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuc2Nob29sID0gX3NjaG9vbDtcclxuICAgIHRoaXMuY2xhc3NUYXVnaHQgPSBfY2xhc3NUYXVnaHQ7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklkO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMucm9sZVR5cGUgPSBfcm9sZVR5cGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUHJvZ3JhbSBBbWJhc3NhZG9ycyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFByb2dyYW1BbWJhc3NhZG9ycyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlByb2dyYW1BbWJhc3NhZG9yc1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgYWRkcmVzczogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLCBfYWRkcmVzcyA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLmFkZHJlc3MgPSBfYWRkcmVzcztcclxuICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklkO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMucm9sZVR5cGUgPSBfcm9sZVR5cGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2Nob29sIEFkbWluaXN0cmF0b3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgU2Nob29sQWRtaW5pc3RyYXRvcnMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTY2hvb2xBZG1pbmlzdHJhdG9yc1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBzY2hvb2xOYW1lOiBcIlwiLFxyXG4gICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX3NjaG9vbE5hbWUgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5zY2hvb2xOYW1lID0gX3NjaG9vbE5hbWU7XHJcbiAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklkO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMucm9sZVR5cGUgPSBfcm9sZVR5cGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUHJvZ3JhbSBEaXJlY3RvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBQcm9ncmFtRGlyZWN0b3JzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUHJvZ3JhbURpcmVjdG9yc1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICB9LFxyXG4gIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX2FjY2Vzc1Rva2VuID0gXCJcIiwgX3VwZGF0ZWRBdCA9IDAsIF91c2VySUQgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuQWNjZXNzVG9rZW4gPSBfYWNjZXNzVG9rZW47XHJcbiAgICB0aGlzLlVwZGF0ZWRBdCA9IF91cGRhdGVkQXQ7XHJcbiAgICB0aGlzLnVzZXJJRCA9IF91c2VySUQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU2VydmVyQmFja2VuZC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VydmVyQmFja2VuZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNlcnZlckJhY2tlbmRcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgU3R1ZGVudERhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogU3R1ZGVudCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHN0dWRlbnQgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIFRlYWNoZXJEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFRlYWNoZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiB0ZWFjaGVyIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBNZW50b3JEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFByb2dyYW1BbWJhc3NhZG9ycyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIE1lbnRvciAvIFByb2dyYW1BbWJhc3NhZG9ycyAgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIEFkbWluRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBTY2hvb2xBZG1pbmlzdHJhdG9ycyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIFNjaG9vbEFkbWluaXN0cmF0b3JzICBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgRGlyZWN0b3JEYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFByb2dyYW1EaXJlY3RvcnMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBQcm9ncmFtRGlyZWN0b3JzICBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzcG9uc2VUeXBlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3BvbnNlXCIsXHJcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZUVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IFJlc3BvbnNlVHlwZUVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlc3BvbnNlVHlwZSBjYXRvZ29yeSBmb3IgYXBpJ3NcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBSZW1vdmVQZXJzaXN0Tm9kZSgpIHtcclxuICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICB9LFxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBpZiAoIVNlcnZlckJhY2tlbmQuSW5zdGFuY2UpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgIHRoaXMuU3R1ZGVudERhdGEgPSBuZXcgU3R1ZGVudCgpO1xyXG4gICAgICAvLyAgY29uc29sZS5lcnJvcihcImNyZWF0aW5nIGluc3RhbmNlIFwiICsgdGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcHJpdmF0ZSB2YXJpYWJsZXNcclxuICAgIHRoaXMuZ2V0VXNlckFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi9nZXRVc2VyXCI7XHJcbiAgICB0aGlzLmxvZ2luVXNlckFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi9sb2dpblVzZXJcIjtcclxuICAgIHRoaXMuVXBkYXRlVXNlckRhdGFBUEkgPSBcImh0dHBzOi8vaWEzbnFrcDZ0aC5leGVjdXRlLWFwaS51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9kZXYvdXBkYXRlVXNlclwiO1xyXG4gICAgLy9VQ0syU1I0WU1HN0pcclxuICAgIC8vIHRoaXMuR2V0VXNlckRhdGEoXCJ4dHJvbmRldkBnbWFpbC5jb21cIixcIlN0dWRlbnRcIik7XHJcbiAgICAvL1xyXG4gICAgLy9mZXRjaCh0aGlzLmdldFVzZXJBUEkpO1xyXG5cclxuICAgIC8vdmFyIF9vcHRpb25zID0geyBwYXJhbXM6IG51bGwsIHVybDogXCJcIiB9O1xyXG4gICAgLy8gdGhpcy5zZW5kUG9zdFJlcXVlc3QoKTtcclxuICB9LFxyXG5cclxuICBzZW5kUG9zdFJlcXVlc3QoKSB7XHJcbiAgICB2YXIgaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgdmFyIHJlcXVlc3RfdXJsID0gdGhpcy5sb2dpblVzZXJBUEk7XHJcblxyXG4gICAgdmFyIHBhcmFtcyA9IFwiXCI7XHJcbiAgICAvLyBpZiAob3B0aW9ucy5wYXJhbXMpIHtcclxuICAgIC8vICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMucGFyYW1zKSB7XHJcbiAgICAvLyAgICAgcGFyYW1zICs9IFwiJlwiICsga2V5ICsgXCI9XCIgKyBvcHRpb25zLnBhcmFtc1trZXldO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgdmFyIHBheWxvYWQgPSBuZXcgVXNlckxvZ2luUGF5bG9hZChcInh0cm9uZGV2QGdtYWlsLmNvbVwiLCBcIjEyMzQ1Njc4XCIsIFwiU3R1ZGVudFwiLCBcIlVDSzJTUjRZTUc3SlwiKTtcclxuICAgIHZhciBfanNvbiA9IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpO1xyXG4gICAgaHR0cC5vcGVuKFwiUE9TVFwiLCByZXF1ZXN0X3VybCwgdHJ1ZSk7XHJcbiAgICAvLyAgaHR0cC5zZXRCKF9qc29uKTtcclxuICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIik7XHJcblxyXG4gICAgaHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBodHRwU3RhdHVzID0gaHR0cC5zdGF0dXNUZXh0O1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhodHRwU3RhdHVzKTtcclxuICAgICAgaWYgKGh0dHAucmVzcG9uc2VUZXh0KSB7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlSlNPTiA9IGV2YWwoXCIoXCIgKyBodHRwLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgcmVzcG9uc2VKU09OID0ge307XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmVjXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04uc3RhdHVzQ29kZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlSlNPTi5tZXNzYWdlKTtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VKU09OLmRhdGEpO1xyXG4gICAgICBzd2l0Y2ggKGh0dHAucmVhZHlTdGF0ZSkge1xyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZUpTT04pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgaHR0cC5zZW5kKF9qc29uKTtcclxuICB9LFxyXG5cclxuICBHZXRVc2VyRGF0YShfZW1haWwsIF9yb2xlLCBfYWNjZXNzVG9rZW4sIF9zdWJUeXBlID0gLTEpIHtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJQYXlsb2FkKF9lbWFpbCwgX3JvbGUpO1xyXG4gICAgdmFyIGhlYWRlciA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsIEF1dGhvcml6YXRpb246IF9hY2Nlc3NUb2tlbiB9O1xyXG4gICAgdGhpcy5DYWxsUkVTVEFQSSh0aGlzLmdldFVzZXJBUEksIFwiUE9TVFwiLCBwYXlsb2FkLCAxLCBoZWFkZXIsIF9zdWJUeXBlKTtcclxuICB9LFxyXG5cclxuICBMb2dpblVzZXIoX2VtYWlsLCBfcGFzc3dvcmQsIF9yb2xlLCBfbGljZW5zZSkge1xyXG4gICAgdmFyIHBheWxvYWQgPSBuZXcgVXNlckxvZ2luUGF5bG9hZChfZW1haWwsIF9wYXNzd29yZCwgX3JvbGUsIF9saWNlbnNlKTtcclxuICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5sb2dpblVzZXJBUEksIFwiUE9TVFwiLCBwYXlsb2FkLCAyLCBudWxsLCAtMSk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVXNlckRhdGEoX2Nhc2ggPSAtMSwgX2dhbWVXb24gPSAtMSwgX2F2YXRhcklEID0gLTEpIHtcclxuICAgIHZhciBfbWFpbkRhdGE7XHJcbiAgICBpZiAoSXNXZWIpIHtcclxuICAgICAgX21haW5EYXRhID0gSlNPTi5wYXJzZSh3aW5kb3cuQWxsRGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfbWFpbkRhdGEgPSBKU09OLnBhcnNlKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJEYXRhXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX21haW5EYXRhICE9IG51bGwpIHtcclxuICAgICAgdmFyIFNlbmRpbmdQYXlsb2FkID0gbmV3IFVzZXJEYXRhVXBkYXRlUGF5bG9hZChcclxuICAgICAgICBfbWFpbkRhdGEuU0ssXHJcbiAgICAgICAgX21haW5EYXRhLnBhc3N3b3JkLFxyXG4gICAgICAgIF9tYWluRGF0YS5uYW1lLFxyXG4gICAgICAgIF9tYWluRGF0YS5yb2xlLFxyXG4gICAgICAgIF9tYWluRGF0YS5kb0IsXHJcbiAgICAgICAgX21haW5EYXRhLmdyYWRlTGV2ZWwsXHJcbiAgICAgICAgX21haW5EYXRhLnRlYWNoZXJOYW1lLFxyXG4gICAgICAgIF9tYWluRGF0YS5mYlBhZ2UsXHJcbiAgICAgICAgX21haW5EYXRhLmdhbWVzV29uLFxyXG4gICAgICAgIF9tYWluRGF0YS50ZXN0VGFrZW4sXHJcbiAgICAgICAgX21haW5EYXRhLmRpc3RyaWN0LFxyXG4gICAgICAgIF9tYWluRGF0YS50ZXN0aW5nQXZlcmFnZSxcclxuICAgICAgICBfbWFpbkRhdGEuaW5HYW1lQ2FzaCxcclxuICAgICAgICBcIm11YmVlbmFsaUBnbWFpbC5jb21cIixcclxuICAgICAgICBcIlNjaG9vbEFkbWluXCIsXHJcbiAgICAgICAgX21haW5EYXRhLmFkZGVkQnlFbWFpbCxcclxuICAgICAgICBfbWFpbkRhdGEuc2Nob29sTmFtZSxcclxuICAgICAgICBfbWFpbkRhdGEuYXZhdGFySWRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChfY2FzaCAhPSAtMSkge1xyXG4gICAgICAgIFNlbmRpbmdQYXlsb2FkLmluR2FtZUNhc2ggPSBfY2FzaDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoX2dhbWVXb24gIT0gLTEpIHtcclxuICAgICAgICBTZW5kaW5nUGF5bG9hZC5nYW1lc1dvbiA9IF9nYW1lV29uO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChfYXZhdGFySUQgIT0gLTEpIHtcclxuICAgICAgICBTZW5kaW5nUGF5bG9hZC5hdmF0YXJJZCA9IF9hdmF0YXJJRC50b1N0cmluZygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhTZW5kaW5nUGF5bG9hZCk7XHJcbiAgICAgIHZhciBwYXlsb2FkID0gU2VuZGluZ1BheWxvYWQ7XHJcbiAgICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfbWFpbkRhdGEudXNlclRva2VuIH07XHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5VcGRhdGVVc2VyRGF0YUFQSSwgXCJQVVRcIiwgcGF5bG9hZCwgMywgaGVhZGVyLCAtMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiY2Fubm90IHVwZGF0ZSBkYXRhIGFzIHN0b3JlZCBkYXRhIGlzIG51bGxcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRmV0Y2goX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyA9IG51bGwpIHtcclxuICAgIGlmIChfbWV0aG9kID09IFwiR0VUXCIpIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJoZWFkZXIgaXMgbnVsbFwiKTtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoX3JlcXVlc3RCb2R5KTtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogX2hlYWRlcnMsXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FsbFJFU1RBUEkoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfdHlwZSwgX2hlYWRlcnMgPSBudWxsLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICBGZXRjaF9Qcm9taXNlKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMpO1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gRmV0Y2hfUHJvbWlzZShfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzID0gbnVsbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHZhciBSZXNwb25zZSA9IGF3YWl0IFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuRmV0Y2goX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICAgICAgdmFyIFRlbXBEYXRhID0gYXdhaXQgUmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAoX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgLy9nZXR0aW5nIHVzZXIgZGF0YVxyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgICBpZiAoX3N1YlR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAvL3JldHVybiBkYXRhIHRvIHN0b3JhZ2UgY2xhc3NcclxuICAgICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJTVUNDRVNTXCIpIHx8IE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IGRhdGEgc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgLy9ib3RoIGJlbG93IGNhbGxzIGFyZSB3cml0dGVuIGluc2lkZSBzdG9yZ2FlbWFuYWdlclxyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJXcml0ZURhdGFcIiwgTWFpbkRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJSZWZyZXNoRGF0YVwiLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgLy9sb2dpbiB1c2VyXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwic3VjZXNzZnVsbHlcIikpIHtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuICAgICAgICAgICAgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25TdHVkZW50RGF0YShNYWluRGF0YS5kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJUZWFjaGVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25UZWFjaGVyRGF0YShNYWluRGF0YS5kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtQW1iYXNzYWRvclwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduTWVudG9yRGF0YShNYWluRGF0YS5kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLmRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTY2hvb2xBZG1pblwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduQWRtaW5EYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1EaXJlY3RvclwiKSkge1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduRGlyZWN0b3JEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIndyb25nXCIpIHx8IE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJjaGFyYWN0ZXJzXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5JbnZhbGlkRW1haWxQYXNzd29yZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiRGF0YSBub3QgRm91bmQhXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5Vc2VyTm90Rm91bmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlBhc3N3b3JkIHNob3VsZCBjb250YWluIGF0bGVhc3Qgb25lIEludGVnZXJcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJTY2hvb2wgTGljZW5zZSBpcyBub3QgdmFsaWQgY29udGFjdCBBZG1pbiFcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkxpY2Vuc2VJbnZhbGlkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgLy9sb2dpbiB1c2VyIGVycm9yXHJcbiAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uV2VudFdyb25nO1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcInNvbWV0aGluZyBnb2VzIGJlemFhclwiKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKCdXZSBkbyBjbGVhbnVwIGhlcmUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8jcmVnaW9uIENvbW1lbnRlZFxyXG4gICAgLy8gZmV0Y2goXHJcbiAgICAvLyAgICAgX3VybCxcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgfSxcclxuICAgIC8vICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICApXHJcbiAgICAvLyAgIC50aGVuKHJlc3BvbnNlPT57XHJcbiAgICAvLyAgICAgICByZXNwb25zZS5qc29uKCkudGhlbihkYXRhPT57XHJcbiAgICAvLyAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAvLyAgICAgICAgIC8vcmV0dXJuIGRhdGE7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH0pXHJcbiAgICAvLyAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgLy8gICB9KTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gIH0sXHJcblxyXG4gIEFzc2lnblN0dWRlbnREYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgLy9jb25zb2xlLmVycm9yKERhdGFSZXNwb25zZSk7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZE9CID0gRGF0YVJlc3BvbnNlLmRvQjtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZ3JhZGVMZXZlbCA9IERhdGFSZXNwb25zZS5ncmFkZUxldmVsO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnRlYWNoZXJOYW1lID0gRGF0YVJlc3BvbnNlLnRlYWNoZXJOYW1lO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5mYWNlYm9va1BhZ2UgPSBEYXRhUmVzcG9uc2UuZmJQYWdlO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IERhdGFSZXNwb25zZS5nYW1lc1dvbjtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudGVzdHNUYWtlbiA9IERhdGFSZXNwb25zZS50ZXN0VGFrZW47XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnRlc3RpbmdBdmVyYWdlID0gRGF0YVJlc3BvbnNlLnRlc3RpbmdBdmVyYWdlO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IERhdGFSZXNwb25zZS5pbkdhbWVDYXNoO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UudXNlcklEO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuU3R1ZGVudERhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLlN0dWRlbnREYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5TdHVkZW50RGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduVGVhY2hlckRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuc2Nob29sID0gRGF0YVJlc3BvbnNlLnNjaG9vbE5hbWU7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmNsYXNzVGF1Z2h0ID0gRGF0YVJlc3BvbnNlLmNsYXNzVGF1Z2h0O1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLnVzZXJJRDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLlRlYWNoZXJEYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5UZWFjaGVyRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuVGVhY2hlckRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbk1lbnRvckRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuTWVudG9yRGF0YS5jb250YWN0TnVtYmVyID0gRGF0YVJlc3BvbnNlLmNvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLnVzZXJJRDtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5hZGRyZXNzID0gRGF0YVJlc3BvbnNlLmFkZHJlc3M7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5NZW50b3JEYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5NZW50b3JEYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5NZW50b3JEYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25BZG1pbkRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5jb250YWN0TnVtYmVyID0gRGF0YVJlc3BvbnNlLmNvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLkFkbWluRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UudXNlcklEO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuc2Nob29sTmFtZSA9IERhdGFSZXNwb25zZS5zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuQWRtaW5EYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuQWRtaW5EYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5BZG1pbkRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLkFkbWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGlyZWN0b3JEYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5EaXJlY3RvckRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLkRpcmVjdG9yRGF0YSk7XHJcbiAgfSxcclxuICBzdGFydCgpIHt9LFxyXG5cclxuICBSZWxvZ2luRnJvbVN0b3JhZ2UoTWFpbkRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidXNlciBsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5IGF1dG9tYXRpY2FsbHlcIik7XHJcbiAgICBjb25zb2xlLmxvZyhNYWluRGF0YSk7XHJcbiAgICBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJUZWFjaGVyXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtQW1iYXNzYWRvclwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25NZW50b3JEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTY2hvb2xBZG1pblwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1EaXJlY3RvclwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHNlbmRpbmcgcGF5bG9hZCB0byByZWNlaXZlIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJQYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlclBheWxvYWRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX2VtYWlsID0gXCJub25lXCIsIF9yb2xlID0gXCJub25lXCIpIHtcclxuICAgIHRoaXMuZW1haWwgPSBfZW1haWw7XHJcbiAgICB0aGlzLnJvbGUgPSBfcm9sZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVc2VyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERhdGEgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJEYXRhXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgaW5HYW1lQ2FzaDogXCJcIixcclxuICAgIExTSzogXCJcIixcclxuICAgIHVzZXJUb2tlbjogXCJcIixcclxuICAgIGNsYXNzVGF1Z2h0OiBcIlwiLFxyXG4gICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBnYW1lc1dvbjogXCJcIixcclxuICAgIGNyZWF0ZWRBdDogMCxcclxuICAgIGlzRGVsZXRlZDogZmFsc2UsXHJcbiAgICBUYWJsZU5hbWU6IFwiXCIsXHJcbiAgICBncmFkZUxldmVsOiBcIlwiLFxyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICBmYlBhZ2U6IFwiXCIsXHJcbiAgICB1cGRhdGVkQXQ6IDAsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGRvQjogXCJcIixcclxuICAgIFNLOiBcIlwiLFxyXG4gICAgdGVzdFRha2VuOiBcIlwiLFxyXG4gICAgUEs6IFwiXCIsXHJcbiAgICB0ZXN0aW5nQXZlcmFnZTogXCJcIixcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGFkZHJlc3M6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGFkZGVkQnlFbWFpbDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgVW5pcXVlS2V5OiBcIlwiLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcm9vdCBjbGFzcyBvZiByZXNwb25zZSByZWNlaXZlZCB3aGVuIGdldHRpbmcgdXNlciBhcGkgaXMgaGl0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyRGF0YVJlc3BvbnNlID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlckRhdGFSZXNwb25zZVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIHN0YXR1c0NvZGU6IFwiXCIsXHJcbiAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgZGF0YTogRGF0YSxcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfc3RhdHVzQ29kZSA9IFwibm9uZVwiLCBfbWVzc2FnZSA9IFwibm9uZVwiLCBfZGF0YSA9IG51bGwpIHtcclxuICAgIHRoaXMuc3RhdHVzQ29kZSA9IF9zdGF0dXNDb2RlO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gX21lc3NhZ2U7XHJcbiAgICB0aGlzLmRhdGEgPSBfZGF0YTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBzZW5kaW5nIHBheWxvYWQgdG8gbG9naW4gdXNlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckxvZ2luUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJMb2dpblBheWxvYWRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICAgIGxpY2Vuc2U6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX2VtYWlsID0gXCJub25lXCIsIF9wYXNzd29yZCA9IFwibm9uZVwiLCBfcm9sZSA9IFwibm9uZVwiLCBfbGljZW5zZSA9IFwibm9uZVwiKSB7XHJcbiAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgdGhpcy5wYXNzd29yZCA9IF9wYXNzd29yZDtcclxuICAgIHRoaXMucm9sZSA9IF9yb2xlO1xyXG4gICAgdGhpcy5saWNlbnNlID0gX2xpY2Vuc2U7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVXNlckRhdGFVcGRhdGVQYXlsb2FkLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyRGF0YVVwZGF0ZVBheWxvYWQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyRGF0YVVwZGF0ZVBheWxvYWRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgICBkb0I6IFwiXCIsXHJcbiAgICBncmFkZUxldmVsOiBcIlwiLFxyXG4gICAgdGVhY2hlck5hbWU6IFwiXCIsXHJcbiAgICBmYlBhZ2U6IFwiXCIsXHJcbiAgICBnYW1lc1dvbjogXCJcIixcclxuICAgIHRlc3RUYWtlbjogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgdGVzdGluZ0F2ZXJhZ2U6IFwiXCIsXHJcbiAgICBpbkdhbWVDYXNoOiBcIlwiLFxyXG4gICAgYWRtaW5FbWFpbDogXCJcIixcclxuICAgIGFkbWluUm9sZTogXCJcIixcclxuICAgIGFkZGVkQnlFbWFpbDogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChcclxuICAgIF9lbWFpbCA9IFwibm9uZVwiLFxyXG4gICAgX3Bhc3N3b3JkID0gXCJub25lXCIsXHJcbiAgICBfbmFtZSA9IFwiXCIsXHJcbiAgICBfcm9sZSA9IFwibm9uZVwiLFxyXG4gICAgX2RvYiA9IFwiXCIsXHJcbiAgICBfZ3JhZGVMZXZlbCA9IFwiXCIsXHJcbiAgICBfdGVhY2hlck5hbWUgPSBcIlwiLFxyXG4gICAgX2ZiUGFnZSA9IFwiXCIsXHJcbiAgICBfZ2FtZXNXb24gPSBcIlwiLFxyXG4gICAgX3Rlc3RUYWtlbiA9IFwiXCIsXHJcbiAgICBfZGlzdHJpY3QgPSBcIlwiLFxyXG4gICAgX3Rlc3RpbmdBdmVyYWdlID0gXCJcIixcclxuICAgIF9pbkdhbWVDYXNoID0gXCJcIixcclxuICAgIF9hZG1pbkVtYWlsID0gXCJcIixcclxuICAgIF9hZG1pblJvbGUgPSBcIlwiLFxyXG4gICAgX2FkZGVkQnlFbWFpbCA9IFwiXCIsXHJcbiAgICBfc2Nob29sTmFtZSA9IFwiXCIsXHJcbiAgICBfYXZhdGFySUQgPSBcIlwiXHJcbiAgKSB7XHJcbiAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgdGhpcy5wYXNzd29yZCA9IF9wYXNzd29yZDtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5yb2xlID0gX3JvbGU7XHJcbiAgICB0aGlzLmRvQiA9IF9kb2I7XHJcbiAgICB0aGlzLmdyYWRlTGV2ZWwgPSBfZ3JhZGVMZXZlbDtcclxuICAgIHRoaXMudGVhY2hlck5hbWUgPSBfdGVhY2hlck5hbWU7XHJcbiAgICB0aGlzLmZiUGFnZSA9IF9mYlBhZ2U7XHJcbiAgICB0aGlzLmdhbWVzV29uID0gX2dhbWVzV29uO1xyXG4gICAgdGhpcy50ZXN0VGFrZW4gPSBfdGVzdFRha2VuO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMudGVzdGluZ0F2ZXJhZ2UgPSBfdGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLmluR2FtZUNhc2ggPSBfaW5HYW1lQ2FzaDtcclxuICAgIHRoaXMuYWRtaW5FbWFpbCA9IF9hZG1pbkVtYWlsO1xyXG4gICAgdGhpcy5hZG1pblJvbGUgPSBfYWRtaW5Sb2xlO1xyXG4gICAgdGhpcy5hZGRlZEJ5RW1haWwgPSBfYWRkZWRCeUVtYWlsO1xyXG4gICAgdGhpcy5zY2hvb2xOYW1lID0gX3NjaG9vbE5hbWU7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklEO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VydmVyQmFja2VuZDtcclxuIl19