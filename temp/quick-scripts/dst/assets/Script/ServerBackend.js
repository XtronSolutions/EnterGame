
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

var IsWeb = true; //-------------------------------------------enumeration for type of business-------------------------//

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIklzV2ViIiwiUmVzcG9uc2VUeXBlRW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJTdWNjZXNzZnVsIiwiVXNlck5vdEZvdW5kIiwiSW52YWxpZEVtYWlsUGFzc3dvcmQiLCJXZW50V3JvbmciLCJMaWNlbnNlSW52YWxpZCIsIlN0dWRlbnQiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiZE9CIiwiZ3JhZGVMZXZlbCIsImVtYWlsQWRkcmVzcyIsInRlYWNoZXJOYW1lIiwiZmFjZWJvb2tQYWdlIiwiZ2FtZXNXb24iLCJ0ZXN0c1Rha2VuIiwidGVzdGluZ0F2ZXJhZ2UiLCJnYW1lQ2FzaCIsIkFjY2Vzc1Rva2VuIiwiVXBkYXRlZEF0IiwidXNlcklEIiwiYXZhdGFySWQiLCJkaXN0cmljdCIsInJvbGVUeXBlIiwiY3RvciIsIl9uYW1lIiwiX2RvYiIsIl9ncmFkZUxldmVsIiwiX2VtYWlsQWRkcmVzcyIsIl90ZWFjaGVyTmFtZSIsIl9mYWNlYm9va1BhZ2UiLCJfZ2FtZXNXb24iLCJfdGVzdHNUYWtlbiIsIl90ZXN0aW5nQXZlcmFnZSIsIl9nYW1lQ2FzaCIsIl9hdmF0YXJJZCIsIl9kaXN0cmljdCIsIl9yb2xlVHlwZSIsIlRlYWNoZXIiLCJzY2hvb2wiLCJjbGFzc1RhdWdodCIsImNvbnRhY3ROdW1iZXIiLCJfc2Nob29sIiwiX2NsYXNzVGF1Z2h0IiwiX2NvbnRhY3ROdW1iZXIiLCJfYWNjZXNzVG9rZW4iLCJfdXBkYXRlZEF0IiwiX3VzZXJJRCIsIlByb2dyYW1BbWJhc3NhZG9ycyIsImFkZHJlc3MiLCJfYWRkcmVzcyIsIlNjaG9vbEFkbWluaXN0cmF0b3JzIiwic2Nob29sTmFtZSIsIl9zY2hvb2xOYW1lIiwiUHJvZ3JhbURpcmVjdG9ycyIsIlNlcnZlckJhY2tlbmQiLCJDb21wb25lbnQiLCJTdHVkZW50RGF0YSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiVGVhY2hlckRhdGEiLCJNZW50b3JEYXRhIiwiQWRtaW5EYXRhIiwiRGlyZWN0b3JEYXRhIiwiUmVzcG9uc2VUeXBlIiwiZGlzcGxheU5hbWUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiZ2V0VXNlckFQSSIsImxvZ2luVXNlckFQSSIsIlVwZGF0ZVVzZXJEYXRhQVBJIiwic2VuZFBvc3RSZXF1ZXN0IiwiaHR0cCIsIlhNTEh0dHBSZXF1ZXN0IiwicmVxdWVzdF91cmwiLCJwYXJhbXMiLCJwYXlsb2FkIiwiVXNlckxvZ2luUGF5bG9hZCIsIl9qc29uIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiaHR0cFN0YXR1cyIsInN0YXR1c1RleHQiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZUpTT04iLCJldmFsIiwiY29uc29sZSIsImxvZyIsInN0YXR1c0NvZGUiLCJtZXNzYWdlIiwiZGF0YSIsInJlYWR5U3RhdGUiLCJfZGF0YSIsInNlbmQiLCJHZXRVc2VyRGF0YSIsIl9lbWFpbCIsIl9yb2xlIiwiX3N1YlR5cGUiLCJVc2VyUGF5bG9hZCIsImhlYWRlciIsIkF1dGhvcml6YXRpb24iLCJDYWxsUkVTVEFQSSIsIkxvZ2luVXNlciIsIl9wYXNzd29yZCIsIl9saWNlbnNlIiwiVXBkYXRlVXNlckRhdGEiLCJfY2FzaCIsIl9nYW1lV29uIiwiX2F2YXRhcklEIiwiX21haW5EYXRhIiwicGFyc2UiLCJ3aW5kb3ciLCJBbGxEYXRhIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIlNlbmRpbmdQYXlsb2FkIiwiVXNlckRhdGFVcGRhdGVQYXlsb2FkIiwiU0siLCJwYXNzd29yZCIsInJvbGUiLCJkb0IiLCJmYlBhZ2UiLCJ0ZXN0VGFrZW4iLCJpbkdhbWVDYXNoIiwiYWRkZWRCeUVtYWlsIiwidG9TdHJpbmciLCJ1c2VyVG9rZW4iLCJlcnJvciIsIkZldGNoIiwiX3VybCIsIl9tZXRob2QiLCJfcmVxdWVzdEJvZHkiLCJfaGVhZGVycyIsImZldGNoIiwiaGVhZGVycyIsIm1ldGhvZCIsImJvZHkiLCJfdHlwZSIsIkZldGNoX1Byb21pc2UiLCJSZXNwb25zZSIsImpzb24iLCJUZW1wRGF0YSIsIk1haW5EYXRhIiwiVXNlckRhdGFSZXNwb25zZSIsImluY2x1ZGVzIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiQXNzaWduU3R1ZGVudERhdGEiLCJBc3NpZ25UZWFjaGVyRGF0YSIsIkFzc2lnbk1lbnRvckRhdGEiLCJBc3NpZ25BZG1pbkRhdGEiLCJBc3NpZ25EaXJlY3RvckRhdGEiLCJEYXRhUmVzcG9uc2UiLCJpc0xvZ2dlZEluIiwidXBkYXRlZEF0Iiwic3RhcnQiLCJSZWxvZ2luRnJvbVN0b3JhZ2UiLCJlbWFpbCIsIkRhdGEiLCJMU0siLCJjcmVhdGVkQXQiLCJpc0RlbGV0ZWQiLCJUYWJsZU5hbWUiLCJQSyIsIlVuaXF1ZUtleSIsIl9zdGF0dXNDb2RlIiwiX21lc3NhZ2UiLCJsaWNlbnNlIiwiYWRtaW5FbWFpbCIsImFkbWluUm9sZSIsIl9mYlBhZ2UiLCJfdGVzdFRha2VuIiwiX2luR2FtZUNhc2giLCJfYWRtaW5FbWFpbCIsIl9hZG1pblJvbGUiLCJfYWRkZWRCeUVtYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxLQUFLLEdBQUcsSUFBWixFQUNBOztBQUNBLElBQUlDLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUM3QkMsRUFBQUEsSUFBSSxFQUFFLENBRHVCO0FBRTdCQyxFQUFBQSxVQUFVLEVBQUUsQ0FGaUI7QUFHN0JDLEVBQUFBLFlBQVksRUFBRSxDQUhlO0FBSTdCQyxFQUFBQSxvQkFBb0IsRUFBRSxDQUpPO0FBSzdCQyxFQUFBQSxTQUFTLEVBQUUsQ0FMa0I7QUFNN0JDLEVBQUFB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RUE7QUFGQUEsTUFBQUEsV0FFQSxHQUZjLEVBRWQ7QUFBQTs7QUFBQSxRQURBaUUsU0FDQTtBQURBQSxNQUFBQSxTQUNBLEdBRFksRUFDWjtBQUFBOztBQUNBLFNBQUtrRCxLQUFMLEdBQWEvRCxNQUFiO0FBQ0EsU0FBS3dCLFFBQUwsR0FBZ0JoQixTQUFoQjtBQUNBLFNBQUsxRyxJQUFMLEdBQVlrQixLQUFaO0FBQ0EsU0FBS3lHLElBQUwsR0FBWXhCLEtBQVo7QUFDQSxTQUFLeUIsR0FBTCxHQUFXekcsSUFBWDtBQUNBLFNBQUtoQixVQUFMLEdBQWtCaUIsV0FBbEI7QUFDQSxTQUFLZixXQUFMLEdBQW1CaUIsWUFBbkI7QUFDQSxTQUFLdUcsTUFBTCxHQUFjaUQsT0FBZDtBQUNBLFNBQUt2SyxRQUFMLEdBQWdCaUIsU0FBaEI7QUFDQSxTQUFLc0csU0FBTCxHQUFpQmlELFVBQWpCO0FBQ0EsU0FBS2hLLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS3BCLGNBQUwsR0FBc0JpQixlQUF0QjtBQUNBLFNBQUtxRyxVQUFMLEdBQWtCaUQsV0FBbEI7QUFDQSxTQUFLSixVQUFMLEdBQWtCSyxXQUFsQjtBQUNBLFNBQUtKLFNBQUwsR0FBaUJLLFVBQWpCO0FBQ0EsU0FBS2xELFlBQUwsR0FBb0JtRCxhQUFwQjtBQUNBLFNBQUt0SSxVQUFMLEdBQWtCQyxXQUFsQjtBQUNBLFNBQUtoQyxRQUFMLEdBQWdCaUcsU0FBaEI7QUFDRDtBQTdEa0MsQ0FBVCxDQUE1QjtlQWdFZS9EIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgSXNXZWIgPSB0cnVlO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUmVzcG9uc2VUeXBlRW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgU3VjY2Vzc2Z1bDogMSxcclxuICBVc2VyTm90Rm91bmQ6IDIsXHJcbiAgSW52YWxpZEVtYWlsUGFzc3dvcmQ6IDMsXHJcbiAgV2VudFdyb25nOiA0LFxyXG4gIExpY2Vuc2VJbnZhbGlkOiA1LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdHVkZW50IERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0dWRlbnQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdHVkZW50XCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGRPQjogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGZhY2Vib29rUGFnZTogXCJcIixcclxuICAgIGdhbWVzV29uOiAwLFxyXG4gICAgdGVzdHNUYWtlbjogMCxcclxuICAgIHRlc3RpbmdBdmVyYWdlOiAwLFxyXG4gICAgZ2FtZUNhc2g6IDAsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZG9iID0gXCJub25lXCIsIF9ncmFkZUxldmVsID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX3RlYWNoZXJOYW1lID0gXCJub25lXCIsIF9mYWNlYm9va1BhZ2UgPSBcIm5vbmVcIiwgX2dhbWVzV29uID0gMCwgX3Rlc3RzVGFrZW4gPSAwLCBfdGVzdGluZ0F2ZXJhZ2UgPSAwLCBfZ2FtZUNhc2ggPSAwLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuZE9CID0gX2RvYjtcclxuICAgIHRoaXMuZ3JhZGVMZXZlbCA9IF9ncmFkZUxldmVsO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy50ZWFjaGVyTmFtZSA9IF90ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuZmFjZWJvb2tQYWdlID0gX2ZhY2Vib29rUGFnZTtcclxuICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICB0aGlzLnRlc3RzVGFrZW4gPSBfdGVzdHNUYWtlbjtcclxuICAgIHRoaXMudGVzdGluZ0F2ZXJhZ2UgPSBfdGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLmdhbWVDYXNoID0gX2dhbWVDYXNoO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFRlYWNoZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBUZWFjaGVyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVGVhY2hlclwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBzY2hvb2w6IFwiXCIsXHJcbiAgICBjbGFzc1RhdWdodDogMCxcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9zY2hvb2wgPSBcIm5vbmVcIiwgX2NsYXNzVGF1Z2h0ID0gMCwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5zY2hvb2wgPSBfc2Nob29sO1xyXG4gICAgdGhpcy5jbGFzc1RhdWdodCA9IF9jbGFzc1RhdWdodDtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIEFtYmFzc2Fkb3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgUHJvZ3JhbUFtYmFzc2Fkb3JzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUHJvZ3JhbUFtYmFzc2Fkb3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZ1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hZGRyZXNzID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuYWRkcmVzcyA9IF9hZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTY2hvb2wgQWRtaW5pc3RyYXRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBTY2hvb2xBZG1pbmlzdHJhdG9ycyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNjaG9vbEFkbWluaXN0cmF0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfc2Nob29sTmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnNjaG9vbE5hbWUgPSBfc2Nob29sTmFtZTtcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIERpcmVjdG9ycyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFByb2dyYW1EaXJlY3RvcnMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQcm9ncmFtRGlyZWN0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZXJ2ZXJCYWNrZW5kLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZXJ2ZXJCYWNrZW5kID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VydmVyQmFja2VuZFwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBTdHVkZW50RGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBTdHVkZW50LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gc3R1ZGVudCBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgVGVhY2hlckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVGVhY2hlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHRlYWNoZXIgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIE1lbnRvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbUFtYmFzc2Fkb3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gTWVudG9yIC8gUHJvZ3JhbUFtYmFzc2Fkb3JzICBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgQWRtaW5EYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFNjaG9vbEFkbWluaXN0cmF0b3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gU2Nob29sQWRtaW5pc3RyYXRvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBEaXJlY3RvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbURpcmVjdG9ycyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIFByb2dyYW1EaXJlY3RvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBSZXNwb25zZVR5cGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzcG9uc2VcIixcclxuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlRW51bSxcclxuICAgICAgZGVmYXVsdDogUmVzcG9uc2VUeXBlRW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVzcG9uc2VUeXBlIGNhdG9nb3J5IGZvciBhcGknc1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGlmICghU2VydmVyQmFja2VuZC5JbnN0YW5jZSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlID0gdGhpcztcclxuICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YSA9IG5ldyBTdHVkZW50KCk7XHJcbiAgICAgIC8vICBjb25zb2xlLmVycm9yKFwiY3JlYXRpbmcgaW5zdGFuY2UgXCIgKyB0aGlzLm5vZGUubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9wcml2YXRlIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5nZXRVc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2dldFVzZXJcIjtcclxuICAgIHRoaXMubG9naW5Vc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2xvZ2luVXNlclwiO1xyXG4gICAgdGhpcy5VcGRhdGVVc2VyRGF0YUFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi91cGRhdGVVc2VyXCI7XHJcbiAgICAvL1VDSzJTUjRZTUc3SlxyXG4gICAgLy8gdGhpcy5HZXRVc2VyRGF0YShcInh0cm9uZGV2QGdtYWlsLmNvbVwiLFwiU3R1ZGVudFwiKTtcclxuICAgIC8vXHJcbiAgICAvL2ZldGNoKHRoaXMuZ2V0VXNlckFQSSk7XHJcblxyXG4gICAgLy92YXIgX29wdGlvbnMgPSB7IHBhcmFtczogbnVsbCwgdXJsOiBcIlwiIH07XHJcbiAgICAvLyB0aGlzLnNlbmRQb3N0UmVxdWVzdCgpO1xyXG4gIH0sXHJcblxyXG4gIHNlbmRQb3N0UmVxdWVzdCgpIHtcclxuICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgcmVxdWVzdF91cmwgPSB0aGlzLmxvZ2luVXNlckFQSTtcclxuXHJcbiAgICB2YXIgcGFyYW1zID0gXCJcIjtcclxuICAgIC8vIGlmIChvcHRpb25zLnBhcmFtcykge1xyXG4gICAgLy8gICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucy5wYXJhbXMpIHtcclxuICAgIC8vICAgICBwYXJhbXMgKz0gXCImXCIgKyBrZXkgKyBcIj1cIiArIG9wdGlvbnMucGFyYW1zW2tleV07XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICB2YXIgcGF5bG9hZCA9IG5ldyBVc2VyTG9naW5QYXlsb2FkKFwieHRyb25kZXZAZ21haWwuY29tXCIsIFwiMTIzNDU2NzhcIiwgXCJTdHVkZW50XCIsIFwiVUNLMlNSNFlNRzdKXCIpO1xyXG4gICAgdmFyIF9qc29uID0gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCk7XHJcbiAgICBodHRwLm9wZW4oXCJQT1NUXCIsIHJlcXVlc3RfdXJsLCB0cnVlKTtcclxuICAgIC8vICBodHRwLnNldEIoX2pzb24pO1xyXG4gICAgaHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKTtcclxuXHJcbiAgICBodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGh0dHBTdGF0dXMgPSBodHRwLnN0YXR1c1RleHQ7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGh0dHBTdGF0dXMpO1xyXG4gICAgICBpZiAoaHR0cC5yZXNwb25zZVRleHQpIHtcclxuICAgICAgICB2YXIgcmVzcG9uc2VKU09OID0gZXZhbChcIihcIiArIGh0dHAucmVzcG9uc2VUZXh0ICsgXCIpXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT04gPSB7fTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJyZWNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlSlNPTi5zdGF0dXNDb2RlKTtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VKU09OLm1lc3NhZ2UpO1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04uZGF0YSk7XHJcbiAgICAgIHN3aXRjaCAoaHR0cC5yZWFkeVN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBodHRwLnNlbmQoX2pzb24pO1xyXG4gIH0sXHJcblxyXG4gIEdldFVzZXJEYXRhKF9lbWFpbCwgX3JvbGUsIF9hY2Nlc3NUb2tlbiwgX3N1YlR5cGUgPSAtMSkge1xyXG4gICAgdmFyIHBheWxvYWQgPSBuZXcgVXNlclBheWxvYWQoX2VtYWlsLCBfcm9sZSk7XHJcbiAgICB2YXIgaGVhZGVyID0geyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiwgQXV0aG9yaXphdGlvbjogX2FjY2Vzc1Rva2VuIH07XHJcbiAgICB0aGlzLkNhbGxSRVNUQVBJKHRoaXMuZ2V0VXNlckFQSSwgXCJQT1NUXCIsIHBheWxvYWQsIDEsIGhlYWRlciwgX3N1YlR5cGUpO1xyXG4gIH0sXHJcblxyXG4gIExvZ2luVXNlcihfZW1haWwsIF9wYXNzd29yZCwgX3JvbGUsIF9saWNlbnNlKSB7XHJcbiAgICB2YXIgcGF5bG9hZCA9IG5ldyBVc2VyTG9naW5QYXlsb2FkKF9lbWFpbCwgX3Bhc3N3b3JkLCBfcm9sZSwgX2xpY2Vuc2UpO1xyXG4gICAgdGhpcy5DYWxsUkVTVEFQSSh0aGlzLmxvZ2luVXNlckFQSSwgXCJQT1NUXCIsIHBheWxvYWQsIDIsIG51bGwsIC0xKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVVc2VyRGF0YShfY2FzaCA9IC0xLCBfZ2FtZVdvbiA9IC0xLCBfYXZhdGFySUQgPSAtMSkge1xyXG4gICAgdmFyIF9tYWluRGF0YTtcclxuICAgIGlmIChJc1dlYikge1xyXG4gICAgICBfbWFpbkRhdGEgPSBKU09OLnBhcnNlKHdpbmRvdy5BbGxEYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9tYWluRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfbWFpbkRhdGEgIT0gbnVsbCkge1xyXG4gICAgICB2YXIgU2VuZGluZ1BheWxvYWQgPSBuZXcgVXNlckRhdGFVcGRhdGVQYXlsb2FkKFxyXG4gICAgICAgIF9tYWluRGF0YS5TSyxcclxuICAgICAgICBfbWFpbkRhdGEucGFzc3dvcmQsXHJcbiAgICAgICAgX21haW5EYXRhLm5hbWUsXHJcbiAgICAgICAgX21haW5EYXRhLnJvbGUsXHJcbiAgICAgICAgX21haW5EYXRhLmRvQixcclxuICAgICAgICBfbWFpbkRhdGEuZ3JhZGVMZXZlbCxcclxuICAgICAgICBfbWFpbkRhdGEudGVhY2hlck5hbWUsXHJcbiAgICAgICAgX21haW5EYXRhLmZiUGFnZSxcclxuICAgICAgICBfbWFpbkRhdGEuZ2FtZXNXb24sXHJcbiAgICAgICAgX21haW5EYXRhLnRlc3RUYWtlbixcclxuICAgICAgICBfbWFpbkRhdGEuZGlzdHJpY3QsXHJcbiAgICAgICAgX21haW5EYXRhLnRlc3RpbmdBdmVyYWdlLFxyXG4gICAgICAgIF9tYWluRGF0YS5pbkdhbWVDYXNoLFxyXG4gICAgICAgIFwibXViZWVuYWxpQGdtYWlsLmNvbVwiLFxyXG4gICAgICAgIFwiU2Nob29sQWRtaW5cIixcclxuICAgICAgICBfbWFpbkRhdGEuYWRkZWRCeUVtYWlsLFxyXG4gICAgICAgIF9tYWluRGF0YS5zY2hvb2xOYW1lLFxyXG4gICAgICAgIF9tYWluRGF0YS5hdmF0YXJJZFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKF9jYXNoICE9IC0xKSB7XHJcbiAgICAgICAgU2VuZGluZ1BheWxvYWQuaW5HYW1lQ2FzaCA9IF9jYXNoO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChfZ2FtZVdvbiAhPSAtMSkge1xyXG4gICAgICAgIFNlbmRpbmdQYXlsb2FkLmdhbWVzV29uID0gX2dhbWVXb247XHJcbiAgICAgIH1cclxuICAgICAgaWYgKF9hdmF0YXJJRCAhPSAtMSkge1xyXG4gICAgICAgIFNlbmRpbmdQYXlsb2FkLmF2YXRhcklkID0gX2F2YXRhcklELnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFNlbmRpbmdQYXlsb2FkKTtcclxuICAgICAgdmFyIHBheWxvYWQgPSBTZW5kaW5nUGF5bG9hZDtcclxuICAgICAgdmFyIGhlYWRlciA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsIEF1dGhvcml6YXRpb246IF9tYWluRGF0YS51c2VyVG9rZW4gfTtcclxuICAgICAgdGhpcy5DYWxsUkVTVEFQSSh0aGlzLlVwZGF0ZVVzZXJEYXRhQVBJLCBcIlBVVFwiLCBwYXlsb2FkLCAzLCBoZWFkZXIsIC0xKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYW5ub3QgdXBkYXRlIGRhdGEgYXMgc3RvcmVkIGRhdGEgaXMgbnVsbFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBGZXRjaChfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzID0gbnVsbCkge1xyXG4gICAgaWYgKF9tZXRob2QgPT0gXCJHRVRcIikge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKF91cmwsIHtcclxuICAgICAgICAgIGhlYWRlcnM6IF9oZWFkZXJzLFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihcImhlYWRlciBpcyBudWxsXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihfcmVxdWVzdEJvZHkpO1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KF9yZXF1ZXN0Qm9keSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDYWxsUkVTVEFQSShfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF90eXBlLCBfaGVhZGVycyA9IG51bGwsIF9zdWJUeXBlID0gLTEpIHtcclxuICAgIEZldGNoX1Byb21pc2UoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICBhc3luYyBmdW5jdGlvbiBGZXRjaF9Qcm9taXNlKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMgPSBudWxsKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIFJlc3BvbnNlID0gYXdhaXQgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5GZXRjaChfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzKTtcclxuICAgICAgICB2YXIgVGVtcERhdGEgPSBhd2FpdCBSZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAvL2dldHRpbmcgdXNlciBkYXRhXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChfc3ViVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGRhdGEgdG8gc3RvcmFnZSBjbGFzc1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNVQ0NFU1NcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcInN1Y2Vzc2Z1bGx5XCIpKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb3QgZGF0YSBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAvL2JvdGggYmVsb3cgY2FsbHMgYXJlIHdyaXR0ZW4gaW5zaWRlIHN0b3JnYWVtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiUmVmcmVzaERhdGFcIiwgMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2xvZ2luIHVzZXJcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiV3JpdGVEYXRhXCIsIE1haW5EYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25NZW50b3JEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbURpcmVjdG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwid3JvbmdcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcImNoYXJhY3RlcnNcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJEYXRhIG5vdCBGb3VuZCFcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlVzZXJOb3RGb3VuZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiUGFzc3dvcmQgc2hvdWxkIGNvbnRhaW4gYXRsZWFzdCBvbmUgSW50ZWdlclwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uSW52YWxpZEVtYWlsUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNjaG9vbCBMaWNlbnNlIGlzIG5vdCB2YWxpZCBjb250YWN0IEFkbWluIVwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uTGljZW5zZUludmFsaWQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKF90eXBlID09IDMpIHtcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmIChfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2xvZ2luIHVzZXIgZXJyb3JcclxuICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5XZW50V3Jvbmc7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic29tZXRoaW5nIGdvZXMgYmV6YWFyXCIpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS50b1N0cmluZygpKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAvLyAgY29uc29sZS5sb2coJ1dlIGRvIGNsZWFudXAgaGVyZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyNyZWdpb24gQ29tbWVudGVkXHJcbiAgICAvLyBmZXRjaChcclxuICAgIC8vICAgICBfdXJsLFxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgLy8gICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAvLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KF9yZXF1ZXN0Qm9keSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIClcclxuICAgIC8vICAgLnRoZW4ocmVzcG9uc2U9PntcclxuICAgIC8vICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGRhdGE9PntcclxuICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIC8vICAgICAgICAgLy9yZXR1cm4gZGF0YTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfSlcclxuICAgIC8vICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgfSxcclxuXHJcbiAgQXNzaWduU3R1ZGVudERhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoRGF0YVJlc3BvbnNlKTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5kT0IgPSBEYXRhUmVzcG9uc2UuZG9CO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5ncmFkZUxldmVsID0gRGF0YVJlc3BvbnNlLmdyYWRlTGV2ZWw7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudGVhY2hlck5hbWUgPSBEYXRhUmVzcG9uc2UudGVhY2hlck5hbWU7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmZhY2Vib29rUGFnZSA9IERhdGFSZXNwb25zZS5mYlBhZ2U7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVzV29uID0gRGF0YVJlc3BvbnNlLmdhbWVzV29uO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS50ZXN0c1Rha2VuID0gRGF0YVJlc3BvbnNlLnRlc3RUYWtlbjtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudGVzdGluZ0F2ZXJhZ2UgPSBEYXRhUmVzcG9uc2UudGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gRGF0YVJlc3BvbnNlLmluR2FtZUNhc2g7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS51c2VySUQ7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuU3R1ZGVudERhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlN0dWRlbnREYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25UZWFjaGVyRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5zY2hvb2wgPSBEYXRhUmVzcG9uc2Uuc2Nob29sTmFtZTtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuY2xhc3NUYXVnaHQgPSBEYXRhUmVzcG9uc2UuY2xhc3NUYXVnaHQ7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UudXNlcklEO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuVGVhY2hlckRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLlRlYWNoZXJEYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5UZWFjaGVyRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduTWVudG9yRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuTWVudG9yRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UudXNlcklEO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuYWRkcmVzcztcclxuICAgIHRoaXMuTWVudG9yRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLk1lbnRvckRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLk1lbnRvckRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLk1lbnRvckRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkFkbWluRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuQWRtaW5EYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuQWRtaW5EYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuQWRtaW5EYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuQWRtaW5EYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS51c2VySUQ7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5zY2hvb2xOYW1lID0gRGF0YVJlc3BvbnNlLnNjaG9vbE5hbWU7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuQWRtaW5EYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5BZG1pbkRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5BZG1pbkRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLkFkbWluRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuQWRtaW5EYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EaXJlY3RvckRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5EaXJlY3RvckRhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLkRpcmVjdG9yRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuRGlyZWN0b3JEYXRhKTtcclxuICB9LFxyXG4gIHN0YXJ0KCkge30sXHJcblxyXG4gIFJlbG9naW5Gcm9tU3RvcmFnZShNYWluRGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coXCJ1c2VyIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHkgYXV0b21hdGljYWxseVwiKTtcclxuICAgIGNvbnNvbGUubG9nKE1haW5EYXRhKTtcclxuICAgIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduU3R1ZGVudERhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduVGVhY2hlckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbk1lbnRvckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbkFkbWluRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbURpcmVjdG9yXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnbkRpcmVjdG9yRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3Igc2VuZGluZyBwYXlsb2FkIHRvIHJlY2VpdmUgZGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlclBheWxvYWQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyUGF5bG9hZFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfZW1haWwgPSBcIm5vbmVcIiwgX3JvbGUgPSBcIm5vbmVcIikge1xyXG4gICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgIHRoaXMucm9sZSA9IF9yb2xlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFVzZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkRhdGFcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBpbkdhbWVDYXNoOiBcIlwiLFxyXG4gICAgTFNLOiBcIlwiLFxyXG4gICAgdXNlclRva2VuOiBcIlwiLFxyXG4gICAgY2xhc3NUYXVnaHQ6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgc2Nob29sTmFtZTogXCJcIixcclxuICAgIGdhbWVzV29uOiBcIlwiLFxyXG4gICAgY3JlYXRlZEF0OiAwLFxyXG4gICAgaXNEZWxldGVkOiBmYWxzZSxcclxuICAgIFRhYmxlTmFtZTogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgICBwYXNzd29yZDogXCJcIixcclxuICAgIGZiUGFnZTogXCJcIixcclxuICAgIHVwZGF0ZWRBdDogMCxcclxuICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgZG9COiBcIlwiLFxyXG4gICAgU0s6IFwiXCIsXHJcbiAgICB0ZXN0VGFrZW46IFwiXCIsXHJcbiAgICBQSzogXCJcIixcclxuICAgIHRlc3RpbmdBdmVyYWdlOiBcIlwiLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYWRkcmVzczogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgYWRkZWRCeUVtYWlsOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICBVbmlxdWVLZXk6IFwiXCIsXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1yb290IGNsYXNzIG9mIHJlc3BvbnNlIHJlY2VpdmVkIHdoZW4gZ2V0dGluZyB1c2VyIGFwaSBpcyBoaXQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJEYXRhUmVzcG9uc2UgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyRGF0YVJlc3BvbnNlXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgc3RhdHVzQ29kZTogXCJcIixcclxuICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICBkYXRhOiBEYXRhLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9zdGF0dXNDb2RlID0gXCJub25lXCIsIF9tZXNzYWdlID0gXCJub25lXCIsIF9kYXRhID0gbnVsbCkge1xyXG4gICAgdGhpcy5zdGF0dXNDb2RlID0gX3N0YXR1c0NvZGU7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBfbWVzc2FnZTtcclxuICAgIHRoaXMuZGF0YSA9IF9kYXRhO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHNlbmRpbmcgcGF5bG9hZCB0byBsb2dpbiB1c2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyTG9naW5QYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlckxvZ2luUGF5bG9hZFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gICAgbGljZW5zZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfZW1haWwgPSBcIm5vbmVcIiwgX3Bhc3N3b3JkID0gXCJub25lXCIsIF9yb2xlID0gXCJub25lXCIsIF9saWNlbnNlID0gXCJub25lXCIpIHtcclxuICAgIHRoaXMuZW1haWwgPSBfZW1haWw7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gX3Bhc3N3b3JkO1xyXG4gICAgdGhpcy5yb2xlID0gX3JvbGU7XHJcbiAgICB0aGlzLmxpY2Vuc2UgPSBfbGljZW5zZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVc2VyRGF0YVVwZGF0ZVBheWxvYWQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJEYXRhVXBkYXRlUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJEYXRhVXBkYXRlUGF5bG9hZFwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICAgIGRvQjogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGZiUGFnZTogXCJcIixcclxuICAgIGdhbWVzV29uOiBcIlwiLFxyXG4gICAgdGVzdFRha2VuOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICB0ZXN0aW5nQXZlcmFnZTogXCJcIixcclxuICAgIGluR2FtZUNhc2g6IFwiXCIsXHJcbiAgICBhZG1pbkVtYWlsOiBcIlwiLFxyXG4gICAgYWRtaW5Sb2xlOiBcIlwiLFxyXG4gICAgYWRkZWRCeUVtYWlsOiBcIlwiLFxyXG4gICAgc2Nob29sTmFtZTogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKFxyXG4gICAgX2VtYWlsID0gXCJub25lXCIsXHJcbiAgICBfcGFzc3dvcmQgPSBcIm5vbmVcIixcclxuICAgIF9uYW1lID0gXCJcIixcclxuICAgIF9yb2xlID0gXCJub25lXCIsXHJcbiAgICBfZG9iID0gXCJcIixcclxuICAgIF9ncmFkZUxldmVsID0gXCJcIixcclxuICAgIF90ZWFjaGVyTmFtZSA9IFwiXCIsXHJcbiAgICBfZmJQYWdlID0gXCJcIixcclxuICAgIF9nYW1lc1dvbiA9IFwiXCIsXHJcbiAgICBfdGVzdFRha2VuID0gXCJcIixcclxuICAgIF9kaXN0cmljdCA9IFwiXCIsXHJcbiAgICBfdGVzdGluZ0F2ZXJhZ2UgPSBcIlwiLFxyXG4gICAgX2luR2FtZUNhc2ggPSBcIlwiLFxyXG4gICAgX2FkbWluRW1haWwgPSBcIlwiLFxyXG4gICAgX2FkbWluUm9sZSA9IFwiXCIsXHJcbiAgICBfYWRkZWRCeUVtYWlsID0gXCJcIixcclxuICAgIF9zY2hvb2xOYW1lID0gXCJcIixcclxuICAgIF9hdmF0YXJJRCA9IFwiXCJcclxuICApIHtcclxuICAgIHRoaXMuZW1haWwgPSBfZW1haWw7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gX3Bhc3N3b3JkO1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnJvbGUgPSBfcm9sZTtcclxuICAgIHRoaXMuZG9CID0gX2RvYjtcclxuICAgIHRoaXMuZ3JhZGVMZXZlbCA9IF9ncmFkZUxldmVsO1xyXG4gICAgdGhpcy50ZWFjaGVyTmFtZSA9IF90ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuZmJQYWdlID0gX2ZiUGFnZTtcclxuICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICB0aGlzLnRlc3RUYWtlbiA9IF90ZXN0VGFrZW47XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy50ZXN0aW5nQXZlcmFnZSA9IF90ZXN0aW5nQXZlcmFnZTtcclxuICAgIHRoaXMuaW5HYW1lQ2FzaCA9IF9pbkdhbWVDYXNoO1xyXG4gICAgdGhpcy5hZG1pbkVtYWlsID0gX2FkbWluRW1haWw7XHJcbiAgICB0aGlzLmFkbWluUm9sZSA9IF9hZG1pblJvbGU7XHJcbiAgICB0aGlzLmFkZGVkQnlFbWFpbCA9IF9hZGRlZEJ5RW1haWw7XHJcbiAgICB0aGlzLnNjaG9vbE5hbWUgPSBfc2Nob29sTmFtZTtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySUQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXJ2ZXJCYWNrZW5kO1xyXG4iXX0=