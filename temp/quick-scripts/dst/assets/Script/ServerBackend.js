
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

//for web make: IsMobile=false and IsWeb=true
//for mobile make: IsMobile=true and IsWeb=false
var IsWeb = false;
var IsMobile = true;
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
    console.log("calling get user data");
    if (!IsMobile) this.CallRESTAPI(this.getUserAPI, "POST", payload, 1, header, _subType);else this.CallRESTAPI_XML(this.getUserAPI, "POST", payload, 1, _accessToken, _subType);
  },
  LoginUser: function LoginUser(_email, _password, _role, _license) {
    var payload = new UserLoginPayload(_email, _password, _role, _license);
    if (!IsMobile) this.CallRESTAPI(this.loginUserAPI, "POST", payload, 2, null, -1);else this.CallRESTAPI_XML(this.loginUserAPI, "POST", payload, 2, null, -1);
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
        if (!IsMobile) this.CallRESTAPI(this.UpdateUserDataAPI, "PUT", payload, 3, header, -1);else this.CallRESTAPI_XML(this.UpdateUserDataAPI, "PUT", payload, 3, _mainData.userToken, -1);
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
  Fetch_XML: function Fetch_XML(_url, _method, _requestBody, _headers) {
    if (_headers === void 0) {
      _headers = null;
    }

    var http = new XMLHttpRequest();
    var request_url = _url;
    var params = "";

    if (_method == "GET") {
      if (_headers == null) {
        return new Promise(function (resolve) {
          http.open("GET", request_url, true);
          http.setRequestHeader("Content-type", "application/json; charset=utf-8");

          http.onreadystatechange = function () {
            var httpStatus = http.statusText;
            var responseJSON = null;

            if (http.responseText) {
              responseJSON = eval("(" + http.responseText + ")");
            } //console.log(http.readyState);


            switch (http.readyState) {
              case 4:
                console.log(responseJSON);
                resolve(responseJSON);
            }
          };

          http.send();
        });
      } else {
        return new Promise(function (resolve) {
          http.open("GET", request_url, true);
          http.setRequestHeader("Content-type", "application/json; charset=utf-8");
          http.setRequestHeader("Authorization", _headers);

          http.onreadystatechange = function () {
            var httpStatus = http.statusText;
            var responseJSON = null;

            if (http.responseText) {
              responseJSON = eval("(" + http.responseText + ")");
            } else {
              responseJSON = null;
            }

            switch (http.readyState) {
              case 4:
                console.log(responseJSON);
                resolve(responseJSON);
            }
          };

          http.send();
        });
      }
    } else {
      if (_headers == null) {
        return new Promise(function (resolve) {
          http.open(_method, request_url, true);
          http.setRequestHeader("Content-type", "application/json; charset=utf-8");

          http.onreadystatechange = function () {
            var httpStatus = http.statusText;
            var responseJSON = null;

            if (http.responseText) {
              responseJSON = eval("(" + http.responseText + ")");
            }

            switch (http.readyState) {
              case 4:
                console.log(responseJSON);
                resolve(responseJSON);
            }
          };

          http.send(JSON.stringify(_requestBody));
        });
      } else {
        return new Promise(function (resolve) {
          http.open(_method, request_url, true);
          http.setRequestHeader("Content-type", "application/json; charset=utf-8");
          http.setRequestHeader("Authorization", _headers);

          http.onreadystatechange = function () {
            var httpStatus = http.statusText;
            var responseJSON = null;

            if (http.responseText) {
              responseJSON = eval("(" + http.responseText + ")");
            }

            switch (http.readyState) {
              case 4:
                console.log(responseJSON);
                resolve(responseJSON);
            }
          };

          http.send(JSON.stringify(_requestBody));
        });
      }
    }
  },
  CallRESTAPI_XML: function CallRESTAPI_XML(_url, _method, _requestBody, _type, _headers, _subType) {
    if (_headers === void 0) {
      _headers = null;
    }

    if (_subType === void 0) {
      _subType = -1;
    }

    Fetch_Promise_XML(_url, _method, _requestBody, _headers);

    function Fetch_Promise_XML(_x5, _x6, _x7, _x8) {
      return _Fetch_Promise_XML.apply(this, arguments);
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


    function _Fetch_Promise_XML() {
      _Fetch_Promise_XML = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_url, _method, _requestBody, _headers) {
        var Response, TempData, MainData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_headers === void 0) {
                  _headers = null;
                }

                _context2.prev = 1;
                console.log("called");
                _context2.next = 5;
                return ServerBackend.Instance.Fetch_XML(_url, _method, _requestBody, _headers);

              case 5:
                Response = _context2.sent;
                TempData = Response;

                if (!(TempData == null || TempData == undefined)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return");

              case 9:
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

                _context2.next = 17;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);

                if (_type == 2) {
                  //login user error
                  ServerBackend.Instance.ResponseType = ResponseTypeEnum.WentWrong;
                  cc.systemEvent.emit("AssignProfileData");
                }

                console.log("something goes bezaar");
                console.error(_context2.t0.toString());

              case 17:
                _context2.prev = 17;
                return _context2.finish(17);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 12, 17, 19]]);
      }));
      return _Fetch_Promise_XML.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIklzV2ViIiwiSXNNb2JpbGUiLCJPbk1vYmlsZSIsIlJlc3BvbnNlVHlwZUVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiU3VjY2Vzc2Z1bCIsIlVzZXJOb3RGb3VuZCIsIkludmFsaWRFbWFpbFBhc3N3b3JkIiwiV2VudFdyb25nIiwiTGljZW5zZUludmFsaWQiLCJTdHVkZW50IiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsImRPQiIsImdyYWRlTGV2ZWwiLCJlbWFpbEFkZHJlc3MiLCJ0ZWFjaGVyTmFtZSIsImZhY2Vib29rUGFnZSIsImdhbWVzV29uIiwidGVzdHNUYWtlbiIsInRlc3RpbmdBdmVyYWdlIiwiZ2FtZUNhc2giLCJBY2Nlc3NUb2tlbiIsIlVwZGF0ZWRBdCIsInVzZXJJRCIsImF2YXRhcklkIiwiZGlzdHJpY3QiLCJyb2xlVHlwZSIsImN0b3IiLCJfbmFtZSIsIl9kb2IiLCJfZ3JhZGVMZXZlbCIsIl9lbWFpbEFkZHJlc3MiLCJfdGVhY2hlck5hbWUiLCJfZmFjZWJvb2tQYWdlIiwiX2dhbWVzV29uIiwiX3Rlc3RzVGFrZW4iLCJfdGVzdGluZ0F2ZXJhZ2UiLCJfZ2FtZUNhc2giLCJfYXZhdGFySWQiLCJfZGlzdHJpY3QiLCJfcm9sZVR5cGUiLCJUZWFjaGVyIiwic2Nob29sIiwiY2xhc3NUYXVnaHQiLCJjb250YWN0TnVtYmVyIiwiX3NjaG9vbCIsIl9jbGFzc1RhdWdodCIsIl9jb250YWN0TnVtYmVyIiwiX2FjY2Vzc1Rva2VuIiwiX3VwZGF0ZWRBdCIsIl91c2VySUQiLCJQcm9ncmFtQW1iYXNzYWRvcnMiLCJhZGRyZXNzIiwiX2FkZHJlc3MiLCJTY2hvb2xBZG1pbmlzdHJhdG9ycyIsInNjaG9vbE5hbWUiLCJfc2Nob29sTmFtZSIsIlByb2dyYW1EaXJlY3RvcnMiLCJTZXJ2ZXJCYWNrZW5kIiwiQ29tcG9uZW50IiwiU3R1ZGVudERhdGEiLCJ0eXBlIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlRlYWNoZXJEYXRhIiwiTWVudG9yRGF0YSIsIkFkbWluRGF0YSIsIkRpcmVjdG9yRGF0YSIsIlJlc3BvbnNlVHlwZSIsImRpc3BsYXlOYW1lIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJnYW1lIiwicmVtb3ZlUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIm9uTG9hZCIsImFkZFBlcnNpc3RSb290Tm9kZSIsImdldFVzZXJBUEkiLCJsb2dpblVzZXJBUEkiLCJVcGRhdGVVc2VyRGF0YUFQSSIsInNlbmRQb3N0UmVxdWVzdCIsImh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsInJlcXVlc3RfdXJsIiwicGFyYW1zIiwicGF5bG9hZCIsIlVzZXJMb2dpblBheWxvYWQiLCJfanNvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsImh0dHBTdGF0dXMiLCJzdGF0dXNUZXh0IiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VKU09OIiwiZXZhbCIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXNDb2RlIiwibWVzc2FnZSIsImRhdGEiLCJyZWFkeVN0YXRlIiwiX2RhdGEiLCJzZW5kIiwiR2V0VXNlckRhdGEiLCJfZW1haWwiLCJfcm9sZSIsIl9zdWJUeXBlIiwiVXNlclBheWxvYWQiLCJoZWFkZXIiLCJBdXRob3JpemF0aW9uIiwiQ2FsbFJFU1RBUEkiLCJDYWxsUkVTVEFQSV9YTUwiLCJMb2dpblVzZXIiLCJfcGFzc3dvcmQiLCJfbGljZW5zZSIsIlVwZGF0ZVVzZXJEYXRhIiwiX2Nhc2giLCJfZ2FtZVdvbiIsIl9hdmF0YXJJRCIsIl9tYWluRGF0YSIsInBhcnNlIiwid2luZG93IiwiQWxsRGF0YSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJTZW5kaW5nUGF5bG9hZCIsIlVzZXJEYXRhVXBkYXRlUGF5bG9hZCIsIlNLIiwicGFzc3dvcmQiLCJkb0IiLCJmYlBhZ2UiLCJ0ZXN0VGFrZW4iLCJpbkdhbWVDYXNoIiwiYWRkZWRCeUVtYWlsIiwidG9TdHJpbmciLCJ1c2VyVG9rZW4iLCJlcnJvciIsIkZldGNoIiwiX3VybCIsIl9tZXRob2QiLCJfcmVxdWVzdEJvZHkiLCJfaGVhZGVycyIsImZldGNoIiwiaGVhZGVycyIsIm1ldGhvZCIsImJvZHkiLCJfdHlwZSIsIkZldGNoX1Byb21pc2UiLCJSZXNwb25zZSIsImpzb24iLCJUZW1wRGF0YSIsIk1haW5EYXRhIiwiVXNlckRhdGFSZXNwb25zZSIsImluY2x1ZGVzIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiQXNzaWduU3R1ZGVudERhdGEiLCJBc3NpZ25UZWFjaGVyRGF0YSIsIkFzc2lnbk1lbnRvckRhdGEiLCJBc3NpZ25BZG1pbkRhdGEiLCJBc3NpZ25EaXJlY3RvckRhdGEiLCJGZXRjaF9YTUwiLCJQcm9taXNlIiwicmVzb2x2ZSIsIkZldGNoX1Byb21pc2VfWE1MIiwidW5kZWZpbmVkIiwiRGF0YVJlc3BvbnNlIiwiaXNMb2dnZWRJbiIsInVwZGF0ZWRBdCIsInN0YXJ0IiwiUmVsb2dpbkZyb21TdG9yYWdlIiwiZW1haWwiLCJyb2xlIiwiRGF0YSIsIkxTSyIsImNyZWF0ZWRBdCIsImlzRGVsZXRlZCIsIlRhYmxlTmFtZSIsIlBLIiwiVW5pcXVlS2V5IiwiX3N0YXR1c0NvZGUiLCJfbWVzc2FnZSIsImxpY2Vuc2UiLCJhZG1pbkVtYWlsIiwiYWRtaW5Sb2xlIiwiX2ZiUGFnZSIsIl90ZXN0VGFrZW4iLCJfaW5HYW1lQ2FzaCIsIl9hZG1pbkVtYWlsIiwiX2FkbWluUm9sZSIsIl9hZGRlZEJ5RW1haWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxJQUFJQSxLQUFLLEdBQUcsS0FBWjtBQUNBLElBQUlDLFFBQVEsR0FBQyxJQUFiO0FBQ0EsSUFBSUMsUUFBUSxHQUFDLEtBQWIsRUFDQTs7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBR0MsRUFBRSxDQUFDQyxJ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LEVBR2hCO0FBQUE7O0FBQUEsUUFGQTNJLFdBRUE7QUFGQUEsTUFBQUEsV0FFQSxHQUZjLEVBRWQ7QUFBQTs7QUFBQSxRQURBa0UsU0FDQTtBQURBQSxNQUFBQSxTQUNBLEdBRFksRUFDWjtBQUFBOztBQUNBLFNBQUtzRCxLQUFMLEdBQWFwRSxNQUFiO0FBQ0EsU0FBS3lCLFFBQUwsR0FBZ0JoQixTQUFoQjtBQUNBLFNBQUszRyxJQUFMLEdBQVlrQixLQUFaO0FBQ0EsU0FBS3FKLElBQUwsR0FBWXBFLEtBQVo7QUFDQSxTQUFLeUIsR0FBTCxHQUFXekcsSUFBWDtBQUNBLFNBQUtoQixVQUFMLEdBQWtCaUIsV0FBbEI7QUFDQSxTQUFLZixXQUFMLEdBQW1CaUIsWUFBbkI7QUFDQSxTQUFLdUcsTUFBTCxHQUFjdUQsT0FBZDtBQUNBLFNBQUs3SyxRQUFMLEdBQWdCaUIsU0FBaEI7QUFDQSxTQUFLc0csU0FBTCxHQUFpQnVELFVBQWpCO0FBQ0EsU0FBS3RLLFFBQUwsR0FBZ0JjLFNBQWhCO0FBQ0EsU0FBS3BCLGNBQUwsR0FBc0JpQixlQUF0QjtBQUNBLFNBQUtxRyxVQUFMLEdBQWtCdUQsV0FBbEI7QUFDQSxTQUFLSixVQUFMLEdBQWtCSyxXQUFsQjtBQUNBLFNBQUtKLFNBQUwsR0FBaUJLLFVBQWpCO0FBQ0EsU0FBS3hELFlBQUwsR0FBb0J5RCxhQUFwQjtBQUNBLFNBQUs1SSxVQUFMLEdBQWtCQyxXQUFsQjtBQUNBLFNBQUtoQyxRQUFMLEdBQWdCa0csU0FBaEI7QUFDRDtBQTdEa0MsQ0FBVCxDQUE1QjtlQWdFZWhFIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL2ZvciB3ZWIgbWFrZTogSXNNb2JpbGU9ZmFsc2UgYW5kIElzV2ViPXRydWVcclxuLy9mb3IgbW9iaWxlIG1ha2U6IElzTW9iaWxlPXRydWUgYW5kIElzV2ViPWZhbHNlXHJcbnZhciBJc1dlYiA9IGZhbHNlO1xyXG52YXIgSXNNb2JpbGU9dHJ1ZTtcclxudmFyIE9uTW9iaWxlPWZhbHNlO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUmVzcG9uc2VUeXBlRW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgU3VjY2Vzc2Z1bDogMSxcclxuICBVc2VyTm90Rm91bmQ6IDIsXHJcbiAgSW52YWxpZEVtYWlsUGFzc3dvcmQ6IDMsXHJcbiAgV2VudFdyb25nOiA0LFxyXG4gIExpY2Vuc2VJbnZhbGlkOiA1LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdHVkZW50IERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0dWRlbnQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdHVkZW50XCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGRPQjogXCJcIixcclxuICAgIGdyYWRlTGV2ZWw6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGZhY2Vib29rUGFnZTogXCJcIixcclxuICAgIGdhbWVzV29uOiAwLFxyXG4gICAgdGVzdHNUYWtlbjogMCxcclxuICAgIHRlc3RpbmdBdmVyYWdlOiAwLFxyXG4gICAgZ2FtZUNhc2g6IDAsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZG9iID0gXCJub25lXCIsIF9ncmFkZUxldmVsID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX3RlYWNoZXJOYW1lID0gXCJub25lXCIsIF9mYWNlYm9va1BhZ2UgPSBcIm5vbmVcIiwgX2dhbWVzV29uID0gMCwgX3Rlc3RzVGFrZW4gPSAwLCBfdGVzdGluZ0F2ZXJhZ2UgPSAwLCBfZ2FtZUNhc2ggPSAwLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuZE9CID0gX2RvYjtcclxuICAgIHRoaXMuZ3JhZGVMZXZlbCA9IF9ncmFkZUxldmVsO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy50ZWFjaGVyTmFtZSA9IF90ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuZmFjZWJvb2tQYWdlID0gX2ZhY2Vib29rUGFnZTtcclxuICAgIHRoaXMuZ2FtZXNXb24gPSBfZ2FtZXNXb247XHJcbiAgICB0aGlzLnRlc3RzVGFrZW4gPSBfdGVzdHNUYWtlbjtcclxuICAgIHRoaXMudGVzdGluZ0F2ZXJhZ2UgPSBfdGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLmdhbWVDYXNoID0gX2dhbWVDYXNoO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFRlYWNoZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBUZWFjaGVyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVGVhY2hlclwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICBzY2hvb2w6IFwiXCIsXHJcbiAgICBjbGFzc1RhdWdodDogMCxcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9zY2hvb2wgPSBcIm5vbmVcIiwgX2NsYXNzVGF1Z2h0ID0gMCwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfY29udGFjdE51bWJlciA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5zY2hvb2wgPSBfc2Nob29sO1xyXG4gICAgdGhpcy5jbGFzc1RhdWdodCA9IF9jbGFzc1RhdWdodDtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIEFtYmFzc2Fkb3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgUHJvZ3JhbUFtYmFzc2Fkb3JzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUHJvZ3JhbUFtYmFzc2Fkb3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZ1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hZGRyZXNzID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLmNvbnRhY3ROdW1iZXIgPSBfY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuYWRkcmVzcyA9IF9hZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTY2hvb2wgQWRtaW5pc3RyYXRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBTY2hvb2xBZG1pbmlzdHJhdG9ycyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNjaG9vbEFkbWluaXN0cmF0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBjb250YWN0TnVtYmVyOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZVR5cGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfc2Nob29sTmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnNjaG9vbE5hbWUgPSBfc2Nob29sTmFtZTtcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICAgIHRoaXMuYXZhdGFySWQgPSBfYXZhdGFySWQ7XHJcbiAgICB0aGlzLmRpc3RyaWN0ID0gX2Rpc3RyaWN0O1xyXG4gICAgdGhpcy5yb2xlVHlwZSA9IF9yb2xlVHlwZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9ncmFtIERpcmVjdG9ycyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFByb2dyYW1EaXJlY3RvcnMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQcm9ncmFtRGlyZWN0b3JzXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfYWNjZXNzVG9rZW4gPSBcIlwiLCBfdXBkYXRlZEF0ID0gMCwgX3VzZXJJRCA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5BY2Nlc3NUb2tlbiA9IF9hY2Nlc3NUb2tlbjtcclxuICAgIHRoaXMuVXBkYXRlZEF0ID0gX3VwZGF0ZWRBdDtcclxuICAgIHRoaXMudXNlcklEID0gX3VzZXJJRDtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZXJ2ZXJCYWNrZW5kLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZXJ2ZXJCYWNrZW5kID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2VydmVyQmFja2VuZFwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBTdHVkZW50RGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBTdHVkZW50LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gc3R1ZGVudCBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgVGVhY2hlckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVGVhY2hlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIHRlYWNoZXIgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIE1lbnRvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbUFtYmFzc2Fkb3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gTWVudG9yIC8gUHJvZ3JhbUFtYmFzc2Fkb3JzICBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgQWRtaW5EYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFNjaG9vbEFkbWluaXN0cmF0b3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gU2Nob29sQWRtaW5pc3RyYXRvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBEaXJlY3RvckRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZ3JhbURpcmVjdG9ycyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImN1cnJlbnQgbG9nZ2VkIGluIFByb2dyYW1EaXJlY3RvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBSZXNwb25zZVR5cGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzcG9uc2VcIixcclxuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlRW51bSxcclxuICAgICAgZGVmYXVsdDogUmVzcG9uc2VUeXBlRW51bS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVzcG9uc2VUeXBlIGNhdG9nb3J5IGZvciBhcGknc1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGlmICghU2VydmVyQmFja2VuZC5JbnN0YW5jZSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlID0gdGhpcztcclxuICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YSA9IG5ldyBTdHVkZW50KCk7XHJcbiAgICAgIC8vICBjb25zb2xlLmVycm9yKFwiY3JlYXRpbmcgaW5zdGFuY2UgXCIgKyB0aGlzLm5vZGUubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9wcml2YXRlIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5nZXRVc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2dldFVzZXJcIjtcclxuICAgIHRoaXMubG9naW5Vc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2xvZ2luVXNlclwiO1xyXG4gICAgdGhpcy5VcGRhdGVVc2VyRGF0YUFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi91cGRhdGVVc2VyXCI7XHJcbiAgICAvL1VDSzJTUjRZTUc3SlxyXG4gICAgLy8gdGhpcy5HZXRVc2VyRGF0YShcInh0cm9uZGV2QGdtYWlsLmNvbVwiLFwiU3R1ZGVudFwiKTtcclxuICAgIC8vXHJcbiAgICAvL2ZldGNoKHRoaXMuZ2V0VXNlckFQSSk7XHJcblxyXG4gICAgLy92YXIgX29wdGlvbnMgPSB7IHBhcmFtczogbnVsbCwgdXJsOiBcIlwiIH07XHJcbiAgICAvLyB0aGlzLnNlbmRQb3N0UmVxdWVzdCgpO1xyXG4gIH0sXHJcblxyXG4gIHNlbmRQb3N0UmVxdWVzdCgpIHtcclxuICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgcmVxdWVzdF91cmwgPSB0aGlzLmxvZ2luVXNlckFQSTtcclxuXHJcbiAgICB2YXIgcGFyYW1zID0gXCJcIjtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJMb2dpblBheWxvYWQoXCJ4dHJvbmRldkBnbWFpbC5jb21cIiwgXCIxMjM0NTY3OFwiLCBcIlN0dWRlbnRcIiwgXCJVQ0syU1I0WU1HN0pcIik7XHJcbiAgICB2YXIgX2pzb24gPSBKU09OLnN0cmluZ2lmeShwYXlsb2FkKTtcclxuICAgIGh0dHAub3BlbihcIlBPU1RcIiwgcmVxdWVzdF91cmwsIHRydWUpO1xyXG4gICAgLy8gIGh0dHAuc2V0QihfanNvbik7XHJcbiAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xyXG5cclxuICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaHR0cFN0YXR1cyA9IGh0dHAuc3RhdHVzVGV4dDtcclxuICAgICAgLy8gY29uc29sZS5sb2coaHR0cFN0YXR1cyk7XHJcbiAgICAgIGlmIChodHRwLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT04gPSBldmFsKFwiKFwiICsgaHR0cC5yZXNwb25zZVRleHQgKyBcIilcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlSlNPTiA9IHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcInJlY1wiKTtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VKU09OLnN0YXR1c0NvZGUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04ubWVzc2FnZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlSlNPTi5kYXRhKTtcclxuICAgICAgc3dpdGNoIChodHRwLnJlYWR5U3RhdGUpIHtcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04pO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGh0dHAuc2VuZChfanNvbik7XHJcbiAgfSxcclxuXHJcbiAgR2V0VXNlckRhdGEoX2VtYWlsLCBfcm9sZSwgX2FjY2Vzc1Rva2VuLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICB2YXIgcGF5bG9hZCA9IG5ldyBVc2VyUGF5bG9hZChfZW1haWwsIF9yb2xlKTtcclxuICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfYWNjZXNzVG9rZW4gfTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcImNhbGxpbmcgZ2V0IHVzZXIgZGF0YVwiKTtcclxuXHJcbiAgICBpZighSXNNb2JpbGUpXHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5nZXRVc2VyQVBJLCBcIlBPU1RcIiwgcGF5bG9hZCwgMSwgaGVhZGVyLCBfc3ViVHlwZSk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUElfWE1MKHRoaXMuZ2V0VXNlckFQSSwgXCJQT1NUXCIsIHBheWxvYWQsIDEsIF9hY2Nlc3NUb2tlbiwgX3N1YlR5cGUpO1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgTG9naW5Vc2VyKF9lbWFpbCwgX3Bhc3N3b3JkLCBfcm9sZSwgX2xpY2Vuc2UpIHtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJMb2dpblBheWxvYWQoX2VtYWlsLCBfcGFzc3dvcmQsIF9yb2xlLCBfbGljZW5zZSk7XHJcbiAgICBpZighSXNNb2JpbGUpXHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5sb2dpblVzZXJBUEksIFwiUE9TVFwiLCBwYXlsb2FkLCAyLCBudWxsLCAtMSk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUElfWE1MKHRoaXMubG9naW5Vc2VyQVBJLCBcIlBPU1RcIiwgcGF5bG9hZCwgMiwgbnVsbCwgLTEpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVVzZXJEYXRhKF9jYXNoID0gLTEsIF9nYW1lV29uID0gLTEsIF9hdmF0YXJJRCA9IC0xKSB7XHJcbiAgICB2YXIgX21haW5EYXRhO1xyXG4gICAgaWYgKElzV2ViKSB7XHJcbiAgICAgIF9tYWluRGF0YSA9IEpTT04ucGFyc2Uod2luZG93LkFsbERhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX21haW5EYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9tYWluRGF0YS5yb2xlVHlwZSA9PSBcIlN0dWRlbnRcIikge1xyXG4gICAgICBpZiAoX21haW5EYXRhICE9IG51bGwpIHtcclxuICAgICAgICB2YXIgU2VuZGluZ1BheWxvYWQgPSBuZXcgVXNlckRhdGFVcGRhdGVQYXlsb2FkKFxyXG4gICAgICAgICAgX21haW5EYXRhLlNLLFxyXG4gICAgICAgICAgX21haW5EYXRhLnBhc3N3b3JkLFxyXG4gICAgICAgICAgX21haW5EYXRhLm5hbWUsXHJcbiAgICAgICAgICBfbWFpbkRhdGEucm9sZVR5cGUsXHJcbiAgICAgICAgICBfbWFpbkRhdGEuZG9CLFxyXG4gICAgICAgICAgX21haW5EYXRhLmdyYWRlTGV2ZWwsXHJcbiAgICAgICAgICBfbWFpbkRhdGEudGVhY2hlck5hbWUsXHJcbiAgICAgICAgICBfbWFpbkRhdGEuZmJQYWdlLFxyXG4gICAgICAgICAgX21haW5EYXRhLmdhbWVzV29uLFxyXG4gICAgICAgICAgX21haW5EYXRhLnRlc3RUYWtlbixcclxuICAgICAgICAgIF9tYWluRGF0YS5kaXN0cmljdCxcclxuICAgICAgICAgIF9tYWluRGF0YS50ZXN0aW5nQXZlcmFnZSxcclxuICAgICAgICAgIF9tYWluRGF0YS5pbkdhbWVDYXNoLFxyXG4gICAgICAgICAgXCJwcm9ncmFtZGlyZWN0b3JAZ21haWwuY29tXCIsXHJcbiAgICAgICAgICBcIlByb2dyYW1EaXJlY3RvclwiLFxyXG4gICAgICAgICAgX21haW5EYXRhLmFkZGVkQnlFbWFpbCxcclxuICAgICAgICAgIF9tYWluRGF0YS5zY2hvb2xOYW1lLFxyXG4gICAgICAgICAgX21haW5EYXRhLmF2YXRhcklkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKF9jYXNoICE9IC0xKSB7XHJcbiAgICAgICAgICBTZW5kaW5nUGF5bG9hZC5pbkdhbWVDYXNoID0gX2Nhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfZ2FtZVdvbiAhPSAtMSkge1xyXG4gICAgICAgICAgU2VuZGluZ1BheWxvYWQuZ2FtZXNXb24gPSBfZ2FtZVdvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF9hdmF0YXJJRCAhPSAtMSkge1xyXG4gICAgICAgICAgU2VuZGluZ1BheWxvYWQuYXZhdGFySWQgPSBfYXZhdGFySUQudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFNlbmRpbmdQYXlsb2FkKTtcclxuICAgICAgICB2YXIgcGF5bG9hZCA9IFNlbmRpbmdQYXlsb2FkO1xyXG4gICAgICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfbWFpbkRhdGEudXNlclRva2VuIH07XHJcblxyXG4gICAgICAgIGlmKCFJc01vYmlsZSlcclxuICAgICAgICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5VcGRhdGVVc2VyRGF0YUFQSSwgXCJQVVRcIiwgcGF5bG9hZCwgMywgaGVhZGVyLCAtMSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgdGhpcy5DYWxsUkVTVEFQSV9YTUwodGhpcy5VcGRhdGVVc2VyRGF0YUFQSSwgXCJQVVRcIiwgcGF5bG9hZCwgMywgX21haW5EYXRhLnVzZXJUb2tlbiwgLTEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYW5ub3QgdXBkYXRlIGRhdGEgYXMgc3RvcmVkIGRhdGEgaXMgbnVsbFwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJub3Qgc3R1ZGVudFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBGZXRjaChfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzID0gbnVsbCkge1xyXG4gICAgaWYgKF9tZXRob2QgPT0gXCJHRVRcIikge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKF91cmwsIHtcclxuICAgICAgICAgIGhlYWRlcnM6IF9oZWFkZXJzLFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihcImhlYWRlciBpcyBudWxsXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihfcmVxdWVzdEJvZHkpO1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KF9yZXF1ZXN0Qm9keSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDYWxsUkVTVEFQSShfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF90eXBlLCBfaGVhZGVycyA9IG51bGwsIF9zdWJUeXBlID0gLTEpIHtcclxuICAgIEZldGNoX1Byb21pc2UoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICBhc3luYyBmdW5jdGlvbiBGZXRjaF9Qcm9taXNlKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMgPSBudWxsKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIFJlc3BvbnNlID0gYXdhaXQgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5GZXRjaChfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzKTtcclxuICAgICAgICB2YXIgVGVtcERhdGEgPSBhd2FpdCBSZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAvL2dldHRpbmcgdXNlciBkYXRhXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChfc3ViVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGRhdGEgdG8gc3RvcmFnZSBjbGFzc1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNVQ0NFU1NcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcInN1Y2Vzc2Z1bGx5XCIpKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb3QgZGF0YSBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAvL2JvdGggYmVsb3cgY2FsbHMgYXJlIHdyaXR0ZW4gaW5zaWRlIHN0b3JnYWVtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiUmVmcmVzaERhdGFcIiwgMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2xvZ2luIHVzZXJcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiV3JpdGVEYXRhXCIsIE1haW5EYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25NZW50b3JEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbURpcmVjdG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwid3JvbmdcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcImNoYXJhY3RlcnNcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJEYXRhIG5vdCBGb3VuZCFcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlVzZXJOb3RGb3VuZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiUGFzc3dvcmQgc2hvdWxkIGNvbnRhaW4gYXRsZWFzdCBvbmUgSW50ZWdlclwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uSW52YWxpZEVtYWlsUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNjaG9vbCBMaWNlbnNlIGlzIG5vdCB2YWxpZCBjb250YWN0IEFkbWluIVwiKSB8fCBNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiU2Nob29sIExpY2Vuc2UgRG9lcyBub3QgZXhpc3QhXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5MaWNlbnNlSW52YWxpZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMykge1xyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKF90eXBlID09IDIpIHtcclxuICAgICAgICAgIC8vbG9naW4gdXNlciBlcnJvclxyXG4gICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLldlbnRXcm9uZztcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzb21ldGhpbmcgZ29lcyBiZXphYXJcIik7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnV2UgZG8gY2xlYW51cCBoZXJlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vI3JlZ2lvbiBDb21tZW50ZWRcclxuICAgIC8vIGZldGNoKFxyXG4gICAgLy8gICAgIF91cmwsXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAvLyAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgIC8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgKVxyXG4gICAgLy8gICAudGhlbihyZXNwb25zZT0+e1xyXG4gICAgLy8gICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YT0+e1xyXG4gICAgLy8gICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgLy8gICAgICAgICAvL3JldHVybiBkYXRhO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9KVxyXG4gICAgLy8gICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuICB9LFxyXG5cclxuICBGZXRjaF9YTUwoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyA9IG51bGwpIHtcclxuICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgcmVxdWVzdF91cmwgPSBfdXJsO1xyXG4gICAgdmFyIHBhcmFtcyA9IFwiXCI7XHJcblxyXG4gICAgaWYgKF9tZXRob2QgPT0gXCJHRVRcIikge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgaHR0cC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RfdXJsLCB0cnVlKTtcclxuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xyXG4gICAgICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBodHRwU3RhdHVzID0gaHR0cC5zdGF0dXNUZXh0O1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT049bnVsbDtcclxuICAgICAgICBpZiAoaHR0cC5yZXNwb25zZVRleHQpIHtcclxuICAgICAgICAgIHJlc3BvbnNlSlNPTiA9IGV2YWwoXCIoXCIgKyBodHRwLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coaHR0cC5yZWFkeVN0YXRlKTtcclxuICAgICAgICBzd2l0Y2ggKGh0dHAucmVhZHlTdGF0ZSkge1xyXG4gICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04pO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGh0dHAuc2VuZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgaHR0cC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RfdXJsLCB0cnVlKTtcclxuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xyXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgX2hlYWRlcnMpO1xyXG4gICAgICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBodHRwU3RhdHVzID0gaHR0cC5zdGF0dXNUZXh0O1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT049bnVsbDtcclxuICAgICAgICBpZiAoaHR0cC5yZXNwb25zZVRleHQpIHtcclxuICAgICAgICAgIHJlc3BvbnNlSlNPTiA9IGV2YWwoXCIoXCIgKyBodHRwLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzcG9uc2VKU09OID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAoaHR0cC5yZWFkeVN0YXRlKSB7XHJcbiAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VKU09OKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaHR0cC5zZW5kKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBodHRwLm9wZW4oX21ldGhvZCwgcmVxdWVzdF91cmwsIHRydWUpO1xyXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIik7XHJcbiAgICAgICAgaHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGh0dHBTdGF0dXMgPSBodHRwLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlSlNPTj1udWxsO1xyXG4gICAgICAgIGlmIChodHRwLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgICAgcmVzcG9uc2VKU09OID0gZXZhbChcIihcIiArIGh0dHAucmVzcG9uc2VUZXh0ICsgXCIpXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChodHRwLnJlYWR5U3RhdGUpIHtcclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZUpTT04pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgeyBcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgaHR0cC5vcGVuKF9tZXRob2QsIHJlcXVlc3RfdXJsLCB0cnVlKTtcclxuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xyXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgX2hlYWRlcnMpO1xyXG4gICAgICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBodHRwU3RhdHVzID0gaHR0cC5zdGF0dXNUZXh0O1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT049bnVsbDtcclxuICAgICAgICBpZiAoaHR0cC5yZXNwb25zZVRleHQpIHtcclxuICAgICAgICAgIHJlc3BvbnNlSlNPTiA9IGV2YWwoXCIoXCIgKyBodHRwLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBzd2l0Y2ggKGh0dHAucmVhZHlTdGF0ZSkge1xyXG4gICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04pO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDYWxsUkVTVEFQSV9YTUwoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfdHlwZSwgX2hlYWRlcnMgPSBudWxsLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICBGZXRjaF9Qcm9taXNlX1hNTChfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzKTtcclxuICAgIGFzeW5jIGZ1bmN0aW9uIEZldGNoX1Byb21pc2VfWE1MKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMgPSBudWxsKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsZWRcIik7XHJcbiAgICAgICAgdmFyIFJlc3BvbnNlID0gYXdhaXQgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5GZXRjaF9YTUwoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICAgICAgdmFyIFRlbXBEYXRhID0gUmVzcG9uc2U7XHJcblxyXG4gICAgICAgIGlmKFRlbXBEYXRhPT1udWxsIHx8IFRlbXBEYXRhPT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLy8gU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLldlbnRXcm9uZztcclxuICAgICAgICAgIC8vIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAvL2dldHRpbmcgdXNlciBkYXRhXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChfc3ViVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGRhdGEgdG8gc3RvcmFnZSBjbGFzc1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNVQ0NFU1NcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcInN1Y2Vzc2Z1bGx5XCIpKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb3QgZGF0YSBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAvL2JvdGggYmVsb3cgY2FsbHMgYXJlIHdyaXR0ZW4gaW5zaWRlIHN0b3JnYWVtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiUmVmcmVzaERhdGFcIiwgMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2xvZ2luIHVzZXJcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiV3JpdGVEYXRhXCIsIE1haW5EYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25NZW50b3JEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbURpcmVjdG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwid3JvbmdcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcImNoYXJhY3RlcnNcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJEYXRhIG5vdCBGb3VuZCFcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlVzZXJOb3RGb3VuZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiUGFzc3dvcmQgc2hvdWxkIGNvbnRhaW4gYXRsZWFzdCBvbmUgSW50ZWdlclwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uSW52YWxpZEVtYWlsUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNjaG9vbCBMaWNlbnNlIGlzIG5vdCB2YWxpZCBjb250YWN0IEFkbWluIVwiKSB8fCBNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiU2Nob29sIExpY2Vuc2UgRG9lcyBub3QgZXhpc3QhXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5MaWNlbnNlSW52YWxpZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMykge1xyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKF90eXBlID09IDIpIHtcclxuICAgICAgICAgIC8vbG9naW4gdXNlciBlcnJvclxyXG4gICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLldlbnRXcm9uZztcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzb21ldGhpbmcgZ29lcyBiZXphYXJcIik7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnV2UgZG8gY2xlYW51cCBoZXJlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vI3JlZ2lvbiBDb21tZW50ZWRcclxuICAgIC8vIGZldGNoKFxyXG4gICAgLy8gICAgIF91cmwsXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAvLyAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgIC8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgKVxyXG4gICAgLy8gICAudGhlbihyZXNwb25zZT0+e1xyXG4gICAgLy8gICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YT0+e1xyXG4gICAgLy8gICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgLy8gICAgICAgICAvL3JldHVybiBkYXRhO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9KVxyXG4gICAgLy8gICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuICB9LFxyXG5cclxuICBBc3NpZ25TdHVkZW50RGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIC8vY29uc29sZS5lcnJvcihEYXRhUmVzcG9uc2UpO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmRPQiA9IERhdGFSZXNwb25zZS5kb0I7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmdyYWRlTGV2ZWwgPSBEYXRhUmVzcG9uc2UuZ3JhZGVMZXZlbDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS50ZWFjaGVyTmFtZSA9IERhdGFSZXNwb25zZS50ZWFjaGVyTmFtZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZmFjZWJvb2tQYWdlID0gRGF0YVJlc3BvbnNlLmZiUGFnZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBEYXRhUmVzcG9uc2UuZ2FtZXNXb247XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnRlc3RzVGFrZW4gPSBEYXRhUmVzcG9uc2UudGVzdFRha2VuO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS50ZXN0aW5nQXZlcmFnZSA9IERhdGFSZXNwb25zZS50ZXN0aW5nQXZlcmFnZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBEYXRhUmVzcG9uc2UuaW5HYW1lQ2FzaDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLnVzZXJJRDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLlN0dWRlbnREYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5TdHVkZW50RGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuU3R1ZGVudERhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnblRlYWNoZXJEYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLnNjaG9vbCA9IERhdGFSZXNwb25zZS5zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5jbGFzc1RhdWdodCA9IERhdGFSZXNwb25zZS5jbGFzc1RhdWdodDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5jb250YWN0TnVtYmVyID0gRGF0YVJlc3BvbnNlLmNvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS51c2VySUQ7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5UZWFjaGVyRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuVGVhY2hlckRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlRlYWNoZXJEYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25NZW50b3JEYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLnVzZXJJRCA9IERhdGFSZXNwb25zZS51c2VySUQ7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuYWRkcmVzcyA9IERhdGFSZXNwb25zZS5hZGRyZXNzO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuTWVudG9yRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuTWVudG9yRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuTWVudG9yRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduQWRtaW5EYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5BZG1pbkRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuY29udGFjdE51bWJlciA9IERhdGFSZXNwb25zZS5jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLnVzZXJJRDtcclxuICAgIHRoaXMuQWRtaW5EYXRhLnNjaG9vbE5hbWUgPSBEYXRhUmVzcG9uc2Uuc2Nob29sTmFtZTtcclxuICAgIHRoaXMuQWRtaW5EYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLkFkbWluRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuQWRtaW5EYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5BZG1pbkRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRpcmVjdG9yRGF0YShEYXRhUmVzcG9uc2UsIGlzTG9nZ2VkSW4pIHtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLmF2YXRhcklkID0gRGF0YVJlc3BvbnNlLmF2YXRhcklkO1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLkRpcmVjdG9yRGF0YS5BY2Nlc3NUb2tlbiA9IERhdGFSZXNwb25zZS51c2VyVG9rZW47XHJcbiAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5EaXJlY3RvckRhdGEpO1xyXG4gIH0sXHJcbiAgc3RhcnQoKSB7fSxcclxuXHJcbiAgUmVsb2dpbkZyb21TdG9yYWdlKE1haW5EYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseSBhdXRvbWF0aWNhbGx5XCIpO1xyXG4gICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiU3R1ZGVudFwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25TdHVkZW50RGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiVGVhY2hlclwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25UZWFjaGVyRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbUFtYmFzc2Fkb3JcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduTWVudG9yRGF0YShNYWluRGF0YSwgdHJ1ZSk7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKE1haW5EYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiU2Nob29sQWRtaW5cIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduQWRtaW5EYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtRGlyZWN0b3JcIikpIHtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuQXNzaWduRGlyZWN0b3JEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBzZW5kaW5nIHBheWxvYWQgdG8gcmVjZWl2ZSBkYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJQYXlsb2FkXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9lbWFpbCA9IFwibm9uZVwiLCBfcm9sZSA9IFwibm9uZVwiKSB7XHJcbiAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgdGhpcy5yb2xlID0gX3JvbGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVXNlciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiRGF0YVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGluR2FtZUNhc2g6IFwiXCIsXHJcbiAgICBMU0s6IFwiXCIsXHJcbiAgICB1c2VyVG9rZW46IFwiXCIsXHJcbiAgICBjbGFzc1RhdWdodDogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBzY2hvb2xOYW1lOiBcIlwiLFxyXG4gICAgZ2FtZXNXb246IFwiXCIsXHJcbiAgICBjcmVhdGVkQXQ6IDAsXHJcbiAgICBpc0RlbGV0ZWQ6IGZhbHNlLFxyXG4gICAgVGFibGVOYW1lOiBcIlwiLFxyXG4gICAgZ3JhZGVMZXZlbDogXCJcIixcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgZmJQYWdlOiBcIlwiLFxyXG4gICAgdXBkYXRlZEF0OiAwLFxyXG4gICAgdGVhY2hlck5hbWU6IFwiXCIsXHJcbiAgICBkb0I6IFwiXCIsXHJcbiAgICBTSzogXCJcIixcclxuICAgIHRlc3RUYWtlbjogXCJcIixcclxuICAgIFBLOiBcIlwiLFxyXG4gICAgdGVzdGluZ0F2ZXJhZ2U6IFwiXCIsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBhZGRlZEJ5RW1haWw6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIFVuaXF1ZUtleTogXCJcIixcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXJvb3QgY2xhc3Mgb2YgcmVzcG9uc2UgcmVjZWl2ZWQgd2hlbiBnZXR0aW5nIHVzZXIgYXBpIGlzIGhpdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckRhdGFSZXNwb25zZSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJEYXRhUmVzcG9uc2VcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBzdGF0dXNDb2RlOiBcIlwiLFxyXG4gICAgbWVzc2FnZTogXCJcIixcclxuICAgIGRhdGE6IERhdGEsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX3N0YXR1c0NvZGUgPSBcIm5vbmVcIiwgX21lc3NhZ2UgPSBcIm5vbmVcIiwgX2RhdGEgPSBudWxsKSB7XHJcbiAgICB0aGlzLnN0YXR1c0NvZGUgPSBfc3RhdHVzQ29kZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IF9tZXNzYWdlO1xyXG4gICAgdGhpcy5kYXRhID0gX2RhdGE7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3Igc2VuZGluZyBwYXlsb2FkIHRvIGxvZ2luIHVzZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJMb2dpblBheWxvYWQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyTG9naW5QYXlsb2FkXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICBwYXNzd29yZDogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgICBsaWNlbnNlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9lbWFpbCA9IFwibm9uZVwiLCBfcGFzc3dvcmQgPSBcIm5vbmVcIiwgX3JvbGUgPSBcIm5vbmVcIiwgX2xpY2Vuc2UgPSBcIm5vbmVcIikge1xyXG4gICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBfcGFzc3dvcmQ7XHJcbiAgICB0aGlzLnJvbGUgPSBfcm9sZTtcclxuICAgIHRoaXMubGljZW5zZSA9IF9saWNlbnNlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFVzZXJEYXRhVXBkYXRlUGF5bG9hZC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckRhdGFVcGRhdGVQYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlckRhdGFVcGRhdGVQYXlsb2FkXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZW1haWw6IFwiXCIsXHJcbiAgICBwYXNzd29yZDogXCJcIixcclxuICAgIG5hbWU6IFwiXCIsXHJcbiAgICByb2xlOiBcIlwiLFxyXG4gICAgZG9COiBcIlwiLFxyXG4gICAgZ3JhZGVMZXZlbDogXCJcIixcclxuICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgZmJQYWdlOiBcIlwiLFxyXG4gICAgZ2FtZXNXb246IFwiXCIsXHJcbiAgICB0ZXN0VGFrZW46IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHRlc3RpbmdBdmVyYWdlOiBcIlwiLFxyXG4gICAgaW5HYW1lQ2FzaDogXCJcIixcclxuICAgIGFkbWluRW1haWw6IFwiXCIsXHJcbiAgICBhZG1pblJvbGU6IFwiXCIsXHJcbiAgICBhZGRlZEJ5RW1haWw6IFwiXCIsXHJcbiAgICBzY2hvb2xOYW1lOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoXHJcbiAgICBfZW1haWwgPSBcIm5vbmVcIixcclxuICAgIF9wYXNzd29yZCA9IFwibm9uZVwiLFxyXG4gICAgX25hbWUgPSBcIlwiLFxyXG4gICAgX3JvbGUgPSBcIm5vbmVcIixcclxuICAgIF9kb2IgPSBcIlwiLFxyXG4gICAgX2dyYWRlTGV2ZWwgPSBcIlwiLFxyXG4gICAgX3RlYWNoZXJOYW1lID0gXCJcIixcclxuICAgIF9mYlBhZ2UgPSBcIlwiLFxyXG4gICAgX2dhbWVzV29uID0gXCJcIixcclxuICAgIF90ZXN0VGFrZW4gPSBcIlwiLFxyXG4gICAgX2Rpc3RyaWN0ID0gXCJcIixcclxuICAgIF90ZXN0aW5nQXZlcmFnZSA9IFwiXCIsXHJcbiAgICBfaW5HYW1lQ2FzaCA9IFwiXCIsXHJcbiAgICBfYWRtaW5FbWFpbCA9IFwiXCIsXHJcbiAgICBfYWRtaW5Sb2xlID0gXCJcIixcclxuICAgIF9hZGRlZEJ5RW1haWwgPSBcIlwiLFxyXG4gICAgX3NjaG9vbE5hbWUgPSBcIlwiLFxyXG4gICAgX2F2YXRhcklEID0gXCJcIlxyXG4gICkge1xyXG4gICAgdGhpcy5lbWFpbCA9IF9lbWFpbDtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBfcGFzc3dvcmQ7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMucm9sZSA9IF9yb2xlO1xyXG4gICAgdGhpcy5kb0IgPSBfZG9iO1xyXG4gICAgdGhpcy5ncmFkZUxldmVsID0gX2dyYWRlTGV2ZWw7XHJcbiAgICB0aGlzLnRlYWNoZXJOYW1lID0gX3RlYWNoZXJOYW1lO1xyXG4gICAgdGhpcy5mYlBhZ2UgPSBfZmJQYWdlO1xyXG4gICAgdGhpcy5nYW1lc1dvbiA9IF9nYW1lc1dvbjtcclxuICAgIHRoaXMudGVzdFRha2VuID0gX3Rlc3RUYWtlbjtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnRlc3RpbmdBdmVyYWdlID0gX3Rlc3RpbmdBdmVyYWdlO1xyXG4gICAgdGhpcy5pbkdhbWVDYXNoID0gX2luR2FtZUNhc2g7XHJcbiAgICB0aGlzLmFkbWluRW1haWwgPSBfYWRtaW5FbWFpbDtcclxuICAgIHRoaXMuYWRtaW5Sb2xlID0gX2FkbWluUm9sZTtcclxuICAgIHRoaXMuYWRkZWRCeUVtYWlsID0gX2FkZGVkQnlFbWFpbDtcclxuICAgIHRoaXMuc2Nob29sTmFtZSA9IF9zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJRDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlcnZlckJhY2tlbmQ7XHJcbiJdfQ==