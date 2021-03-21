
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
      this.StudentData = new Student(); //  console.log("creating instance " + this.node.name);
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
        console.log("cannot update data as stored data is null");
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
        //console.log("header is null");
        //console.log(_requestBody);
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

                console.log("something goes wrong");
                console.log(_context.t0.toString());

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
                console.log(_context2.t0.toString());

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
    //console.log(DataResponse);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTZXJ2ZXJCYWNrZW5kLmpzIl0sIm5hbWVzIjpbIklzV2ViIiwiSXNNb2JpbGUiLCJPbk1vYmlsZSIsIlJlc3BvbnNlVHlwZUVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiU3VjY2Vzc2Z1bCIsIlVzZXJOb3RGb3VuZCIsIkludmFsaWRFbWFpbFBhc3N3b3JkIiwiV2VudFdyb25nIiwiTGljZW5zZUludmFsaWQiLCJTdHVkZW50IiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsImRPQiIsImdyYWRlTGV2ZWwiLCJlbWFpbEFkZHJlc3MiLCJ0ZWFjaGVyTmFtZSIsImZhY2Vib29rUGFnZSIsImdhbWVzV29uIiwidGVzdHNUYWtlbiIsInRlc3RpbmdBdmVyYWdlIiwiZ2FtZUNhc2giLCJBY2Nlc3NUb2tlbiIsIlVwZGF0ZWRBdCIsInVzZXJJRCIsImF2YXRhcklkIiwiZGlzdHJpY3QiLCJyb2xlVHlwZSIsImN0b3IiLCJfbmFtZSIsIl9kb2IiLCJfZ3JhZGVMZXZlbCIsIl9lbWFpbEFkZHJlc3MiLCJfdGVhY2hlck5hbWUiLCJfZmFjZWJvb2tQYWdlIiwiX2dhbWVzV29uIiwiX3Rlc3RzVGFrZW4iLCJfdGVzdGluZ0F2ZXJhZ2UiLCJfZ2FtZUNhc2giLCJfYXZhdGFySWQiLCJfZGlzdHJpY3QiLCJfcm9sZVR5cGUiLCJUZWFjaGVyIiwic2Nob29sIiwiY2xhc3NUYXVnaHQiLCJjb250YWN0TnVtYmVyIiwiX3NjaG9vbCIsIl9jbGFzc1RhdWdodCIsIl9jb250YWN0TnVtYmVyIiwiX2FjY2Vzc1Rva2VuIiwiX3VwZGF0ZWRBdCIsIl91c2VySUQiLCJQcm9ncmFtQW1iYXNzYWRvcnMiLCJhZGRyZXNzIiwiX2FkZHJlc3MiLCJTY2hvb2xBZG1pbmlzdHJhdG9ycyIsInNjaG9vbE5hbWUiLCJfc2Nob29sTmFtZSIsIlByb2dyYW1EaXJlY3RvcnMiLCJTZXJ2ZXJCYWNrZW5kIiwiQ29tcG9uZW50IiwiU3R1ZGVudERhdGEiLCJ0eXBlIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlRlYWNoZXJEYXRhIiwiTWVudG9yRGF0YSIsIkFkbWluRGF0YSIsIkRpcmVjdG9yRGF0YSIsIlJlc3BvbnNlVHlwZSIsImRpc3BsYXlOYW1lIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJnYW1lIiwicmVtb3ZlUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIm9uTG9hZCIsImFkZFBlcnNpc3RSb290Tm9kZSIsImdldFVzZXJBUEkiLCJsb2dpblVzZXJBUEkiLCJVcGRhdGVVc2VyRGF0YUFQSSIsInNlbmRQb3N0UmVxdWVzdCIsImh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsInJlcXVlc3RfdXJsIiwicGFyYW1zIiwicGF5bG9hZCIsIlVzZXJMb2dpblBheWxvYWQiLCJfanNvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsImh0dHBTdGF0dXMiLCJzdGF0dXNUZXh0IiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VKU09OIiwiZXZhbCIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXNDb2RlIiwibWVzc2FnZSIsImRhdGEiLCJyZWFkeVN0YXRlIiwiX2RhdGEiLCJzZW5kIiwiR2V0VXNlckRhdGEiLCJfZW1haWwiLCJfcm9sZSIsIl9zdWJUeXBlIiwiVXNlclBheWxvYWQiLCJoZWFkZXIiLCJBdXRob3JpemF0aW9uIiwiQ2FsbFJFU1RBUEkiLCJDYWxsUkVTVEFQSV9YTUwiLCJMb2dpblVzZXIiLCJfcGFzc3dvcmQiLCJfbGljZW5zZSIsIlVwZGF0ZVVzZXJEYXRhIiwiX2Nhc2giLCJfZ2FtZVdvbiIsIl9hdmF0YXJJRCIsIl9tYWluRGF0YSIsInBhcnNlIiwid2luZG93IiwiQWxsRGF0YSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJTZW5kaW5nUGF5bG9hZCIsIlVzZXJEYXRhVXBkYXRlUGF5bG9hZCIsIlNLIiwicGFzc3dvcmQiLCJkb0IiLCJmYlBhZ2UiLCJ0ZXN0VGFrZW4iLCJpbkdhbWVDYXNoIiwiYWRkZWRCeUVtYWlsIiwidG9TdHJpbmciLCJ1c2VyVG9rZW4iLCJGZXRjaCIsIl91cmwiLCJfbWV0aG9kIiwiX3JlcXVlc3RCb2R5IiwiX2hlYWRlcnMiLCJmZXRjaCIsImhlYWRlcnMiLCJtZXRob2QiLCJib2R5IiwiX3R5cGUiLCJGZXRjaF9Qcm9taXNlIiwiUmVzcG9uc2UiLCJqc29uIiwiVGVtcERhdGEiLCJNYWluRGF0YSIsIlVzZXJEYXRhUmVzcG9uc2UiLCJpbmNsdWRlcyIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIkFzc2lnblN0dWRlbnREYXRhIiwiQXNzaWduVGVhY2hlckRhdGEiLCJBc3NpZ25NZW50b3JEYXRhIiwiQXNzaWduQWRtaW5EYXRhIiwiQXNzaWduRGlyZWN0b3JEYXRhIiwiRmV0Y2hfWE1MIiwiUHJvbWlzZSIsInJlc29sdmUiLCJGZXRjaF9Qcm9taXNlX1hNTCIsInVuZGVmaW5lZCIsIkRhdGFSZXNwb25zZSIsImlzTG9nZ2VkSW4iLCJ1cGRhdGVkQXQiLCJzdGFydCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsImVtYWlsIiwicm9sZSIsIkRhdGEiLCJMU0siLCJjcmVhdGVkQXQiLCJpc0RlbGV0ZWQiLCJUYWJsZU5hbWUiLCJQSyIsIlVuaXF1ZUtleSIsIl9zdGF0dXNDb2RlIiwiX21lc3NhZ2UiLCJsaWNlbnNlIiwiYWRtaW5FbWFpbCIsImFkbWluUm9sZSIsIl9mYlBhZ2UiLCJfdGVzdFRha2VuIiwiX2luR2FtZUNhc2giLCJfYWRtaW5FbWFpbCIsIl9hZG1pblJvbGUiLCJfYWRkZWRCeUVtYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsSUFBSUEsS0FBSyxHQUFHLEtBQVo7QUFDQSxJQUFJQyxRQUFRLEdBQUMsSUFBYjtBQUNBLElBQUlDLFFBQVEsR0FBQyxLQUFiLEVBQ0E7O0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFR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QTs7QUFBQSxRQUZBMUksV0FFQTtBQUZBQSxNQUFBQSxXQUVBLEdBRmMsRUFFZDtBQUFBOztBQUFBLFFBREFrRSxTQUNBO0FBREFBLE1BQUFBLFNBQ0EsR0FEWSxFQUNaO0FBQUE7O0FBQ0EsU0FBS3FELEtBQUwsR0FBYW5FLE1BQWI7QUFDQSxTQUFLeUIsUUFBTCxHQUFnQmhCLFNBQWhCO0FBQ0EsU0FBSzNHLElBQUwsR0FBWWtCLEtBQVo7QUFDQSxTQUFLb0osSUFBTCxHQUFZbkUsS0FBWjtBQUNBLFNBQUt5QixHQUFMLEdBQVd6RyxJQUFYO0FBQ0EsU0FBS2hCLFVBQUwsR0FBa0JpQixXQUFsQjtBQUNBLFNBQUtmLFdBQUwsR0FBbUJpQixZQUFuQjtBQUNBLFNBQUt1RyxNQUFMLEdBQWNzRCxPQUFkO0FBQ0EsU0FBSzVLLFFBQUwsR0FBZ0JpQixTQUFoQjtBQUNBLFNBQUtzRyxTQUFMLEdBQWlCc0QsVUFBakI7QUFDQSxTQUFLckssUUFBTCxHQUFnQmMsU0FBaEI7QUFDQSxTQUFLcEIsY0FBTCxHQUFzQmlCLGVBQXRCO0FBQ0EsU0FBS3FHLFVBQUwsR0FBa0JzRCxXQUFsQjtBQUNBLFNBQUtKLFVBQUwsR0FBa0JLLFdBQWxCO0FBQ0EsU0FBS0osU0FBTCxHQUFpQkssVUFBakI7QUFDQSxTQUFLdkQsWUFBTCxHQUFvQndELGFBQXBCO0FBQ0EsU0FBSzNJLFVBQUwsR0FBa0JDLFdBQWxCO0FBQ0EsU0FBS2hDLFFBQUwsR0FBZ0JrRyxTQUFoQjtBQUNEO0FBN0RrQyxDQUFULENBQTVCO2VBZ0VlaEUiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vZm9yIHdlYiBtYWtlOiBJc01vYmlsZT1mYWxzZSBhbmQgSXNXZWI9dHJ1ZVxyXG4vL2ZvciBtb2JpbGUgbWFrZTogSXNNb2JpbGU9dHJ1ZSBhbmQgSXNXZWI9ZmFsc2VcclxudmFyIElzV2ViID0gZmFsc2U7XHJcbnZhciBJc01vYmlsZT10cnVlO1xyXG52YXIgT25Nb2JpbGU9ZmFsc2U7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciB0eXBlIG9mIGJ1c2luZXNzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSZXNwb25zZVR5cGVFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdWNjZXNzZnVsOiAxLFxyXG4gIFVzZXJOb3RGb3VuZDogMixcclxuICBJbnZhbGlkRW1haWxQYXNzd29yZDogMyxcclxuICBXZW50V3Jvbmc6IDQsXHJcbiAgTGljZW5zZUludmFsaWQ6IDUsXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0dWRlbnQgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3R1ZGVudCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlN0dWRlbnRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgZE9COiBcIlwiLFxyXG4gICAgZ3JhZGVMZXZlbDogXCJcIixcclxuICAgIGVtYWlsQWRkcmVzczogXCJcIixcclxuICAgIHRlYWNoZXJOYW1lOiBcIlwiLFxyXG4gICAgZmFjZWJvb2tQYWdlOiBcIlwiLFxyXG4gICAgZ2FtZXNXb246IDAsXHJcbiAgICB0ZXN0c1Rha2VuOiAwLFxyXG4gICAgdGVzdGluZ0F2ZXJhZ2U6IDAsXHJcbiAgICBnYW1lQ2FzaDogMCxcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWFmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9kb2IgPSBcIm5vbmVcIiwgX2dyYWRlTGV2ZWwgPSBcIm5vbmVcIiwgX2VtYWlsQWRkcmVzcyA9IFwibm9uZVwiLCBfdGVhY2hlck5hbWUgPSBcIm5vbmVcIiwgX2ZhY2Vib29rUGFnZSA9IFwibm9uZVwiLCBfZ2FtZXNXb24gPSAwLCBfdGVzdHNUYWtlbiA9IDAsIF90ZXN0aW5nQXZlcmFnZSA9IDAsIF9nYW1lQ2FzaCA9IDAsIF9hdmF0YXJJZCA9IFwiXCIsIF9kaXN0cmljdCA9IFwiXCIsIF9yb2xlVHlwZSA9IFwiXCIpIHtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5kT0IgPSBfZG9iO1xyXG4gICAgdGhpcy5ncmFkZUxldmVsID0gX2dyYWRlTGV2ZWw7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLnRlYWNoZXJOYW1lID0gX3RlYWNoZXJOYW1lO1xyXG4gICAgdGhpcy5mYWNlYm9va1BhZ2UgPSBfZmFjZWJvb2tQYWdlO1xyXG4gICAgdGhpcy5nYW1lc1dvbiA9IF9nYW1lc1dvbjtcclxuICAgIHRoaXMudGVzdHNUYWtlbiA9IF90ZXN0c1Rha2VuO1xyXG4gICAgdGhpcy50ZXN0aW5nQXZlcmFnZSA9IF90ZXN0aW5nQXZlcmFnZTtcclxuICAgIHRoaXMuZ2FtZUNhc2ggPSBfZ2FtZUNhc2g7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklkO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMucm9sZVR5cGUgPSBfcm9sZVR5cGU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVGVhY2hlciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFRlYWNoZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUZWFjaGVyXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHNjaG9vbDogXCJcIixcclxuICAgIGNsYXNzVGF1Z2h0OiAwLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgIEFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgVXBkYXRlZEF0OiAwLFxyXG4gICAgdXNlcklEOiBcIlwiLFxyXG4gICAgYXZhdGFySWQ6IFwiXCIsXHJcbiAgICBkaXN0cmljdDogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gIH0sXHJcbiAgLy9EZWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX25hbWUgPSBcIm5vbmVcIiwgX3NjaG9vbCA9IFwibm9uZVwiLCBfY2xhc3NUYXVnaHQgPSAwLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9jb250YWN0TnVtYmVyID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIiwgX2F2YXRhcklkID0gXCJcIiwgX2Rpc3RyaWN0ID0gXCJcIiwgX3JvbGVUeXBlID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLnNjaG9vbCA9IF9zY2hvb2w7XHJcbiAgICB0aGlzLmNsYXNzVGF1Z2h0ID0gX2NsYXNzVGF1Z2h0O1xyXG4gICAgdGhpcy5lbWFpbEFkZHJlc3MgPSBfZW1haWxBZGRyZXNzO1xyXG4gICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2dyYW0gQW1iYXNzYWRvcnMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vLy8vXHJcbnZhciBQcm9ncmFtQW1iYXNzYWRvcnMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQcm9ncmFtQW1iYXNzYWRvcnNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgIGFkZHJlc3M6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZnVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX2NvbnRhY3ROdW1iZXIgPSBcIm5vbmVcIiwgX2FkZHJlc3MgPSBcIm5vbmVcIiwgX2FjY2Vzc1Rva2VuID0gXCJcIiwgX3VwZGF0ZWRBdCA9IDAsIF91c2VySUQgPSBcIlwiLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuZW1haWxBZGRyZXNzID0gX2VtYWlsQWRkcmVzcztcclxuICAgIHRoaXMuY29udGFjdE51bWJlciA9IF9jb250YWN0TnVtYmVyO1xyXG4gICAgdGhpcy5hZGRyZXNzID0gX2FkZHJlc3M7XHJcbiAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNjaG9vbCBBZG1pbmlzdHJhdG9ycyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vLy9cclxudmFyIFNjaG9vbEFkbWluaXN0cmF0b3JzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU2Nob29sQWRtaW5pc3RyYXRvcnNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgc2Nob29sTmFtZTogXCJcIixcclxuICAgIGNvbnRhY3ROdW1iZXI6IFwiXCIsXHJcbiAgICBlbWFpbEFkZHJlc3M6IFwiXCIsXHJcbiAgICBBY2Nlc3NUb2tlbjogXCJcIixcclxuICAgIFVwZGF0ZWRBdDogMCxcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGF2YXRhcklkOiBcIlwiLFxyXG4gICAgZGlzdHJpY3Q6IFwiXCIsXHJcbiAgICByb2xlVHlwZTogXCJcIixcclxuICB9LFxyXG4gIC8vRGVmYXVsdCBhbmQgUGFyYW1ldHJpemVkIGNvbnN0cnVjdG9yXHJcbiAgY3RvcjogZnVuY3Rpb24gKF9uYW1lID0gXCJub25lXCIsIF9zY2hvb2xOYW1lID0gXCJub25lXCIsIF9lbWFpbEFkZHJlc3MgPSBcIm5vbmVcIiwgX2NvbnRhY3ROdW1iZXIgPSBcIm5vbmVcIiwgX2FjY2Vzc1Rva2VuID0gXCJcIiwgX3VwZGF0ZWRBdCA9IDAsIF91c2VySUQgPSBcIlwiLCBfYXZhdGFySWQgPSBcIlwiLCBfZGlzdHJpY3QgPSBcIlwiLCBfcm9sZVR5cGUgPSBcIlwiKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBfbmFtZTtcclxuICAgIHRoaXMuc2Nob29sTmFtZSA9IF9zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5jb250YWN0TnVtYmVyID0gX2NvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gICAgdGhpcy5hdmF0YXJJZCA9IF9hdmF0YXJJZDtcclxuICAgIHRoaXMuZGlzdHJpY3QgPSBfZGlzdHJpY3Q7XHJcbiAgICB0aGlzLnJvbGVUeXBlID0gX3JvbGVUeXBlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2dyYW0gRGlyZWN0b3JzIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy8vL1xyXG52YXIgUHJvZ3JhbURpcmVjdG9ycyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlByb2dyYW1EaXJlY3RvcnNcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBuYW1lOiBcIlwiLFxyXG4gICAgZW1haWxBZGRyZXNzOiBcIlwiLFxyXG4gICAgQWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICBVcGRhdGVkQXQ6IDAsXHJcbiAgICB1c2VySUQ6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfbmFtZSA9IFwibm9uZVwiLCBfZW1haWxBZGRyZXNzID0gXCJub25lXCIsIF9hY2Nlc3NUb2tlbiA9IFwiXCIsIF91cGRhdGVkQXQgPSAwLCBfdXNlcklEID0gXCJcIikge1xyXG4gICAgdGhpcy5uYW1lID0gX25hbWU7XHJcbiAgICB0aGlzLmVtYWlsQWRkcmVzcyA9IF9lbWFpbEFkZHJlc3M7XHJcbiAgICB0aGlzLkFjY2Vzc1Rva2VuID0gX2FjY2Vzc1Rva2VuO1xyXG4gICAgdGhpcy5VcGRhdGVkQXQgPSBfdXBkYXRlZEF0O1xyXG4gICAgdGhpcy51c2VySUQgPSBfdXNlcklEO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNlcnZlckJhY2tlbmQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNlcnZlckJhY2tlbmQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZXJ2ZXJCYWNrZW5kXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFN0dWRlbnREYXRhOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFN0dWRlbnQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBzdHVkZW50IGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBUZWFjaGVyRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBUZWFjaGVyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gdGVhY2hlciBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgTWVudG9yRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQcm9ncmFtQW1iYXNzYWRvcnMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBNZW50b3IgLyBQcm9ncmFtQW1iYXNzYWRvcnMgIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBBZG1pbkRhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogU2Nob29sQWRtaW5pc3RyYXRvcnMsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjdXJyZW50IGxvZ2dlZCBpbiBTY2hvb2xBZG1pbmlzdHJhdG9ycyAgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIERpcmVjdG9yRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQcm9ncmFtRGlyZWN0b3JzLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY3VycmVudCBsb2dnZWQgaW4gUHJvZ3JhbURpcmVjdG9ycyAgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3BvbnNlVHlwZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXNwb25zZVwiLFxyXG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGVFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBSZXNwb25zZVR5cGVFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZXNwb25zZVR5cGUgY2F0b2dvcnkgZm9yIGFwaSdzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVtb3ZlUGVyc2lzdE5vZGUoKSB7XHJcbiAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlID0gbnVsbDtcclxuICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgaWYgKCFTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICB0aGlzLlN0dWRlbnREYXRhID0gbmV3IFN0dWRlbnQoKTtcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKFwiY3JlYXRpbmcgaW5zdGFuY2UgXCIgKyB0aGlzLm5vZGUubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9wcml2YXRlIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5nZXRVc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2dldFVzZXJcIjtcclxuICAgIHRoaXMubG9naW5Vc2VyQVBJID0gXCJodHRwczovL2lhM25xa3A2dGguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZGV2L2xvZ2luVXNlclwiO1xyXG4gICAgdGhpcy5VcGRhdGVVc2VyRGF0YUFQSSA9IFwiaHR0cHM6Ly9pYTNucWtwNnRoLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL2Rldi91cGRhdGVVc2VyXCI7XHJcbiAgICAvL1VDSzJTUjRZTUc3SlxyXG4gICAgLy8gdGhpcy5HZXRVc2VyRGF0YShcInh0cm9uZGV2QGdtYWlsLmNvbVwiLFwiU3R1ZGVudFwiKTtcclxuICAgIC8vXHJcbiAgICAvL2ZldGNoKHRoaXMuZ2V0VXNlckFQSSk7XHJcblxyXG4gICAgLy92YXIgX29wdGlvbnMgPSB7IHBhcmFtczogbnVsbCwgdXJsOiBcIlwiIH07XHJcbiAgICAvLyB0aGlzLnNlbmRQb3N0UmVxdWVzdCgpO1xyXG4gIH0sXHJcblxyXG4gIHNlbmRQb3N0UmVxdWVzdCgpIHtcclxuICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgcmVxdWVzdF91cmwgPSB0aGlzLmxvZ2luVXNlckFQSTtcclxuXHJcbiAgICB2YXIgcGFyYW1zID0gXCJcIjtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJMb2dpblBheWxvYWQoXCJ4dHJvbmRldkBnbWFpbC5jb21cIiwgXCIxMjM0NTY3OFwiLCBcIlN0dWRlbnRcIiwgXCJVQ0syU1I0WU1HN0pcIik7XHJcbiAgICB2YXIgX2pzb24gPSBKU09OLnN0cmluZ2lmeShwYXlsb2FkKTtcclxuICAgIGh0dHAub3BlbihcIlBPU1RcIiwgcmVxdWVzdF91cmwsIHRydWUpO1xyXG4gICAgLy8gIGh0dHAuc2V0QihfanNvbik7XHJcbiAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xyXG5cclxuICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaHR0cFN0YXR1cyA9IGh0dHAuc3RhdHVzVGV4dDtcclxuICAgICAgLy8gY29uc29sZS5sb2coaHR0cFN0YXR1cyk7XHJcbiAgICAgIGlmIChodHRwLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT04gPSBldmFsKFwiKFwiICsgaHR0cC5yZXNwb25zZVRleHQgKyBcIilcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlSlNPTiA9IHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcInJlY1wiKTtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VKU09OLnN0YXR1c0NvZGUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04ubWVzc2FnZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlSlNPTi5kYXRhKTtcclxuICAgICAgc3dpdGNoIChodHRwLnJlYWR5U3RhdGUpIHtcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04pO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGh0dHAuc2VuZChfanNvbik7XHJcbiAgfSxcclxuXHJcbiAgR2V0VXNlckRhdGEoX2VtYWlsLCBfcm9sZSwgX2FjY2Vzc1Rva2VuLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICB2YXIgcGF5bG9hZCA9IG5ldyBVc2VyUGF5bG9hZChfZW1haWwsIF9yb2xlKTtcclxuICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfYWNjZXNzVG9rZW4gfTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcImNhbGxpbmcgZ2V0IHVzZXIgZGF0YVwiKTtcclxuXHJcbiAgICBpZighSXNNb2JpbGUpXHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5nZXRVc2VyQVBJLCBcIlBPU1RcIiwgcGF5bG9hZCwgMSwgaGVhZGVyLCBfc3ViVHlwZSk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUElfWE1MKHRoaXMuZ2V0VXNlckFQSSwgXCJQT1NUXCIsIHBheWxvYWQsIDEsIF9hY2Nlc3NUb2tlbiwgX3N1YlR5cGUpO1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgTG9naW5Vc2VyKF9lbWFpbCwgX3Bhc3N3b3JkLCBfcm9sZSwgX2xpY2Vuc2UpIHtcclxuICAgIHZhciBwYXlsb2FkID0gbmV3IFVzZXJMb2dpblBheWxvYWQoX2VtYWlsLCBfcGFzc3dvcmQsIF9yb2xlLCBfbGljZW5zZSk7XHJcbiAgICBpZighSXNNb2JpbGUpXHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5sb2dpblVzZXJBUEksIFwiUE9TVFwiLCBwYXlsb2FkLCAyLCBudWxsLCAtMSk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMuQ2FsbFJFU1RBUElfWE1MKHRoaXMubG9naW5Vc2VyQVBJLCBcIlBPU1RcIiwgcGF5bG9hZCwgMiwgbnVsbCwgLTEpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVVzZXJEYXRhKF9jYXNoID0gLTEsIF9nYW1lV29uID0gLTEsIF9hdmF0YXJJRCA9IC0xKSB7XHJcbiAgICB2YXIgX21haW5EYXRhO1xyXG4gICAgaWYgKElzV2ViKSB7XHJcbiAgICAgIF9tYWluRGF0YSA9IEpTT04ucGFyc2Uod2luZG93LkFsbERhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX21haW5EYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9tYWluRGF0YS5yb2xlVHlwZSA9PSBcIlN0dWRlbnRcIikge1xyXG4gICAgICBpZiAoX21haW5EYXRhICE9IG51bGwpIHtcclxuICAgICAgICB2YXIgU2VuZGluZ1BheWxvYWQgPSBuZXcgVXNlckRhdGFVcGRhdGVQYXlsb2FkKFxyXG4gICAgICAgICAgX21haW5EYXRhLlNLLFxyXG4gICAgICAgICAgX21haW5EYXRhLnBhc3N3b3JkLFxyXG4gICAgICAgICAgX21haW5EYXRhLm5hbWUsXHJcbiAgICAgICAgICBfbWFpbkRhdGEucm9sZVR5cGUsXHJcbiAgICAgICAgICBfbWFpbkRhdGEuZG9CLFxyXG4gICAgICAgICAgX21haW5EYXRhLmdyYWRlTGV2ZWwsXHJcbiAgICAgICAgICBfbWFpbkRhdGEudGVhY2hlck5hbWUsXHJcbiAgICAgICAgICBfbWFpbkRhdGEuZmJQYWdlLFxyXG4gICAgICAgICAgX21haW5EYXRhLmdhbWVzV29uLFxyXG4gICAgICAgICAgX21haW5EYXRhLnRlc3RUYWtlbixcclxuICAgICAgICAgIF9tYWluRGF0YS5kaXN0cmljdCxcclxuICAgICAgICAgIF9tYWluRGF0YS50ZXN0aW5nQXZlcmFnZSxcclxuICAgICAgICAgIF9tYWluRGF0YS5pbkdhbWVDYXNoLFxyXG4gICAgICAgICAgXCJwcm9ncmFtZGlyZWN0b3JAZ21haWwuY29tXCIsXHJcbiAgICAgICAgICBcIlByb2dyYW1EaXJlY3RvclwiLFxyXG4gICAgICAgICAgX21haW5EYXRhLmFkZGVkQnlFbWFpbCxcclxuICAgICAgICAgIF9tYWluRGF0YS5zY2hvb2xOYW1lLFxyXG4gICAgICAgICAgX21haW5EYXRhLmF2YXRhcklkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKF9jYXNoICE9IC0xKSB7XHJcbiAgICAgICAgICBTZW5kaW5nUGF5bG9hZC5pbkdhbWVDYXNoID0gX2Nhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfZ2FtZVdvbiAhPSAtMSkge1xyXG4gICAgICAgICAgU2VuZGluZ1BheWxvYWQuZ2FtZXNXb24gPSBfZ2FtZVdvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF9hdmF0YXJJRCAhPSAtMSkge1xyXG4gICAgICAgICAgU2VuZGluZ1BheWxvYWQuYXZhdGFySWQgPSBfYXZhdGFySUQudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFNlbmRpbmdQYXlsb2FkKTtcclxuICAgICAgICB2YXIgcGF5bG9hZCA9IFNlbmRpbmdQYXlsb2FkO1xyXG4gICAgICAgIHZhciBoZWFkZXIgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLCBBdXRob3JpemF0aW9uOiBfbWFpbkRhdGEudXNlclRva2VuIH07XHJcblxyXG4gICAgICAgIGlmKCFJc01vYmlsZSlcclxuICAgICAgICAgIHRoaXMuQ2FsbFJFU1RBUEkodGhpcy5VcGRhdGVVc2VyRGF0YUFQSSwgXCJQVVRcIiwgcGF5bG9hZCwgMywgaGVhZGVyLCAtMSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgdGhpcy5DYWxsUkVTVEFQSV9YTUwodGhpcy5VcGRhdGVVc2VyRGF0YUFQSSwgXCJQVVRcIiwgcGF5bG9hZCwgMywgX21haW5EYXRhLnVzZXJUb2tlbiwgLTEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2Fubm90IHVwZGF0ZSBkYXRhIGFzIHN0b3JlZCBkYXRhIGlzIG51bGxcIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm90IHN0dWRlbnRcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRmV0Y2goX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyA9IG51bGwpIHtcclxuICAgIGlmIChfbWV0aG9kID09IFwiR0VUXCIpIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goX3VybCwge1xyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgICAgICAgbWV0aG9kOiBfbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9oZWFkZXJzID09IG51bGwpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiaGVhZGVyIGlzIG51bGxcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhfcmVxdWVzdEJvZHkpO1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChfdXJsLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBfaGVhZGVycyxcclxuICAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KF9yZXF1ZXN0Qm9keSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDYWxsUkVTVEFQSShfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF90eXBlLCBfaGVhZGVycyA9IG51bGwsIF9zdWJUeXBlID0gLTEpIHtcclxuICAgIEZldGNoX1Byb21pc2UoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICBhc3luYyBmdW5jdGlvbiBGZXRjaF9Qcm9taXNlKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMgPSBudWxsKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIFJlc3BvbnNlID0gYXdhaXQgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5GZXRjaChfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzKTtcclxuICAgICAgICB2YXIgVGVtcERhdGEgPSBhd2FpdCBSZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAvL2dldHRpbmcgdXNlciBkYXRhXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChfc3ViVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGRhdGEgdG8gc3RvcmFnZSBjbGFzc1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNVQ0NFU1NcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcInN1Y2Vzc2Z1bGx5XCIpKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb3QgZGF0YSBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAvL2JvdGggYmVsb3cgY2FsbHMgYXJlIHdyaXR0ZW4gaW5zaWRlIHN0b3JnYWVtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiUmVmcmVzaERhdGFcIiwgMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2xvZ2luIHVzZXJcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiV3JpdGVEYXRhXCIsIE1haW5EYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25NZW50b3JEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbURpcmVjdG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwid3JvbmdcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcImNoYXJhY3RlcnNcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJEYXRhIG5vdCBGb3VuZCFcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlVzZXJOb3RGb3VuZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiUGFzc3dvcmQgc2hvdWxkIGNvbnRhaW4gYXRsZWFzdCBvbmUgSW50ZWdlclwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uSW52YWxpZEVtYWlsUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNjaG9vbCBMaWNlbnNlIGlzIG5vdCB2YWxpZCBjb250YWN0IEFkbWluIVwiKSB8fCBNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiU2Nob29sIExpY2Vuc2UgRG9lcyBub3QgZXhpc3QhXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5MaWNlbnNlSW52YWxpZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMykge1xyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKF90eXBlID09IDIpIHtcclxuICAgICAgICAgIC8vbG9naW4gdXNlciBlcnJvclxyXG4gICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLldlbnRXcm9uZztcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzb21ldGhpbmcgZ29lcyB3cm9uZ1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnV2UgZG8gY2xlYW51cCBoZXJlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vI3JlZ2lvbiBDb21tZW50ZWRcclxuICAgIC8vIGZldGNoKFxyXG4gICAgLy8gICAgIF91cmwsXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAvLyAgICAgICAgIG1ldGhvZDogX21ldGhvZCxcclxuICAgIC8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgKVxyXG4gICAgLy8gICAudGhlbihyZXNwb25zZT0+e1xyXG4gICAgLy8gICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YT0+e1xyXG4gICAgLy8gICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgLy8gICAgICAgICAvL3JldHVybiBkYXRhO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9KVxyXG4gICAgLy8gICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuICB9LFxyXG5cclxuICBGZXRjaF9YTUwoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyA9IG51bGwpIHtcclxuICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgcmVxdWVzdF91cmwgPSBfdXJsO1xyXG4gICAgdmFyIHBhcmFtcyA9IFwiXCI7XHJcblxyXG4gICAgaWYgKF9tZXRob2QgPT0gXCJHRVRcIikge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgaHR0cC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RfdXJsLCB0cnVlKTtcclxuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xyXG4gICAgICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBodHRwU3RhdHVzID0gaHR0cC5zdGF0dXNUZXh0O1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT049bnVsbDtcclxuICAgICAgICBpZiAoaHR0cC5yZXNwb25zZVRleHQpIHtcclxuICAgICAgICAgIHJlc3BvbnNlSlNPTiA9IGV2YWwoXCIoXCIgKyBodHRwLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coaHR0cC5yZWFkeVN0YXRlKTtcclxuICAgICAgICBzd2l0Y2ggKGh0dHAucmVhZHlTdGF0ZSkge1xyXG4gICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04pO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGh0dHAuc2VuZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgaHR0cC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RfdXJsLCB0cnVlKTtcclxuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xyXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgX2hlYWRlcnMpO1xyXG4gICAgICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBodHRwU3RhdHVzID0gaHR0cC5zdGF0dXNUZXh0O1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT049bnVsbDtcclxuICAgICAgICBpZiAoaHR0cC5yZXNwb25zZVRleHQpIHtcclxuICAgICAgICAgIHJlc3BvbnNlSlNPTiA9IGV2YWwoXCIoXCIgKyBodHRwLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzcG9uc2VKU09OID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAoaHR0cC5yZWFkeVN0YXRlKSB7XHJcbiAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VKU09OKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaHR0cC5zZW5kKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2hlYWRlcnMgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBodHRwLm9wZW4oX21ldGhvZCwgcmVxdWVzdF91cmwsIHRydWUpO1xyXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIik7XHJcbiAgICAgICAgaHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGh0dHBTdGF0dXMgPSBodHRwLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlSlNPTj1udWxsO1xyXG4gICAgICAgIGlmIChodHRwLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgICAgcmVzcG9uc2VKU09OID0gZXZhbChcIihcIiArIGh0dHAucmVzcG9uc2VUZXh0ICsgXCIpXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChodHRwLnJlYWR5U3RhdGUpIHtcclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZUpTT04pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkoX3JlcXVlc3RCb2R5KSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgeyBcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgaHR0cC5vcGVuKF9tZXRob2QsIHJlcXVlc3RfdXJsLCB0cnVlKTtcclxuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xyXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgX2hlYWRlcnMpO1xyXG4gICAgICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBodHRwU3RhdHVzID0gaHR0cC5zdGF0dXNUZXh0O1xyXG4gICAgICAgIHZhciByZXNwb25zZUpTT049bnVsbDtcclxuICAgICAgICBpZiAoaHR0cC5yZXNwb25zZVRleHQpIHtcclxuICAgICAgICAgIHJlc3BvbnNlSlNPTiA9IGV2YWwoXCIoXCIgKyBodHRwLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBzd2l0Y2ggKGh0dHAucmVhZHlTdGF0ZSkge1xyXG4gICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUpTT04pO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShfcmVxdWVzdEJvZHkpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDYWxsUkVTVEFQSV9YTUwoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfdHlwZSwgX2hlYWRlcnMgPSBudWxsLCBfc3ViVHlwZSA9IC0xKSB7XHJcbiAgICBGZXRjaF9Qcm9taXNlX1hNTChfdXJsLCBfbWV0aG9kLCBfcmVxdWVzdEJvZHksIF9oZWFkZXJzKTtcclxuICAgIGFzeW5jIGZ1bmN0aW9uIEZldGNoX1Byb21pc2VfWE1MKF91cmwsIF9tZXRob2QsIF9yZXF1ZXN0Qm9keSwgX2hlYWRlcnMgPSBudWxsKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsZWRcIik7XHJcbiAgICAgICAgdmFyIFJlc3BvbnNlID0gYXdhaXQgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5GZXRjaF9YTUwoX3VybCwgX21ldGhvZCwgX3JlcXVlc3RCb2R5LCBfaGVhZGVycyk7XHJcbiAgICAgICAgdmFyIFRlbXBEYXRhID0gUmVzcG9uc2U7XHJcblxyXG4gICAgICAgIGlmKFRlbXBEYXRhPT1udWxsIHx8IFRlbXBEYXRhPT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLy8gU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLldlbnRXcm9uZztcclxuICAgICAgICAgIC8vIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAvL2dldHRpbmcgdXNlciBkYXRhXHJcbiAgICAgICAgICB2YXIgTWFpbkRhdGEgPSBuZXcgVXNlckRhdGFSZXNwb25zZShUZW1wRGF0YS5zdGF0dXNDb2RlLCBUZW1wRGF0YS5tZXNzYWdlLCBUZW1wRGF0YS5kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFRlbXBEYXRhKTtcclxuICAgICAgICAgIGlmIChfc3ViVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGRhdGEgdG8gc3RvcmFnZSBjbGFzc1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNVQ0NFU1NcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcInN1Y2Vzc2Z1bGx5XCIpKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb3QgZGF0YSBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAvL2JvdGggYmVsb3cgY2FsbHMgYXJlIHdyaXR0ZW4gaW5zaWRlIHN0b3JnYWVtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIldyaXRlRGF0YVwiLCBNYWluRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiUmVmcmVzaERhdGFcIiwgMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlJlZnJlc2hEYXRhXCIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL2xvZ2luIHVzZXJcclxuICAgICAgICAgIHZhciBNYWluRGF0YSA9IG5ldyBVc2VyRGF0YVJlc3BvbnNlKFRlbXBEYXRhLnN0YXR1c0NvZGUsIFRlbXBEYXRhLm1lc3NhZ2UsIFRlbXBEYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coVGVtcERhdGEpO1xyXG4gICAgICAgICAgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJzdWNlc3NmdWxseVwiKSkge1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiV3JpdGVEYXRhXCIsIE1haW5EYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbG9nZ2VkIGluIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coTWFpbkRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlN0dWRlbnRcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlRlYWNoZXJcIikpIHtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1BbWJhc3NhZG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25NZW50b3JEYXRhKE1haW5EYXRhLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEuZGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlNjaG9vbEFkbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5kYXRhLnJvbGVUeXBlLmluY2x1ZGVzKFwiUHJvZ3JhbURpcmVjdG9yXCIpKSB7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlN1Y2Nlc3NmdWw7XHJcbiAgICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwid3JvbmdcIikgfHwgTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcImNoYXJhY3RlcnNcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLkludmFsaWRFbWFpbFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKE1haW5EYXRhLm1lc3NhZ2UuaW5jbHVkZXMoXCJEYXRhIG5vdCBGb3VuZCFcIikpIHtcclxuICAgICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLlVzZXJOb3RGb3VuZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiUGFzc3dvcmQgc2hvdWxkIGNvbnRhaW4gYXRsZWFzdCBvbmUgSW50ZWdlclwiKSkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uSW52YWxpZEVtYWlsUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEubWVzc2FnZS5pbmNsdWRlcyhcIlNjaG9vbCBMaWNlbnNlIGlzIG5vdCB2YWxpZCBjb250YWN0IEFkbWluIVwiKSB8fCBNYWluRGF0YS5tZXNzYWdlLmluY2x1ZGVzKFwiU2Nob29sIExpY2Vuc2UgRG9lcyBub3QgZXhpc3QhXCIpKSB7XHJcbiAgICAgICAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5MaWNlbnNlSW52YWxpZDtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGUgPT0gMykge1xyXG4gICAgICAgICAgdmFyIE1haW5EYXRhID0gbmV3IFVzZXJEYXRhUmVzcG9uc2UoVGVtcERhdGEuc3RhdHVzQ29kZSwgVGVtcERhdGEubWVzc2FnZSwgVGVtcERhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKF90eXBlID09IDIpIHtcclxuICAgICAgICAgIC8vbG9naW4gdXNlciBlcnJvclxyXG4gICAgICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5SZXNwb25zZVR5cGUgPSBSZXNwb25zZVR5cGVFbnVtLldlbnRXcm9uZztcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJBc3NpZ25Qcm9maWxlRGF0YVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzb21ldGhpbmcgZ29lcyBiZXphYXJcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS50b1N0cmluZygpKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAvLyAgY29uc29sZS5sb2coJ1dlIGRvIGNsZWFudXAgaGVyZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyNyZWdpb24gQ29tbWVudGVkXHJcbiAgICAvLyBmZXRjaChcclxuICAgIC8vICAgICBfdXJsLFxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiB9LFxyXG4gICAgLy8gICAgICAgICBtZXRob2Q6IF9tZXRob2QsXHJcbiAgICAvLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KF9yZXF1ZXN0Qm9keSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIClcclxuICAgIC8vICAgLnRoZW4ocmVzcG9uc2U9PntcclxuICAgIC8vICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGRhdGE9PntcclxuICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIC8vICAgICAgICAgLy9yZXR1cm4gZGF0YTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfSlcclxuICAgIC8vICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgfSxcclxuXHJcbiAgQXNzaWduU3R1ZGVudERhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKERhdGFSZXNwb25zZSk7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZE9CID0gRGF0YVJlc3BvbnNlLmRvQjtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZ3JhZGVMZXZlbCA9IERhdGFSZXNwb25zZS5ncmFkZUxldmVsO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnRlYWNoZXJOYW1lID0gRGF0YVJlc3BvbnNlLnRlYWNoZXJOYW1lO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5mYWNlYm9va1BhZ2UgPSBEYXRhUmVzcG9uc2UuZmJQYWdlO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IERhdGFSZXNwb25zZS5nYW1lc1dvbjtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEudGVzdHNUYWtlbiA9IERhdGFSZXNwb25zZS50ZXN0VGFrZW47XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnRlc3RpbmdBdmVyYWdlID0gRGF0YVJlc3BvbnNlLnRlc3RpbmdBdmVyYWdlO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IERhdGFSZXNwb25zZS5pbkdhbWVDYXNoO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UudXNlcklEO1xyXG4gICAgdGhpcy5TdHVkZW50RGF0YS5hdmF0YXJJZCA9IERhdGFSZXNwb25zZS5hdmF0YXJJZDtcclxuICAgIHRoaXMuU3R1ZGVudERhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLlN0dWRlbnREYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuU3R1ZGVudERhdGEuQWNjZXNzVG9rZW4gPSBEYXRhUmVzcG9uc2UudXNlclRva2VuO1xyXG4gICAgICB0aGlzLlN0dWRlbnREYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5TdHVkZW50RGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduVGVhY2hlckRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLm5hbWUgPSBEYXRhUmVzcG9uc2UubmFtZTtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuc2Nob29sID0gRGF0YVJlc3BvbnNlLnNjaG9vbE5hbWU7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmNsYXNzVGF1Z2h0ID0gRGF0YVJlc3BvbnNlLmNsYXNzVGF1Z2h0O1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmNvbnRhY3ROdW1iZXIgPSBEYXRhUmVzcG9uc2UuY29udGFjdE51bWJlcjtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLnVzZXJJRDtcclxuICAgIHRoaXMuVGVhY2hlckRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLlRlYWNoZXJEYXRhLmRpc3RyaWN0ID0gRGF0YVJlc3BvbnNlLmRpc3RyaWN0O1xyXG4gICAgdGhpcy5UZWFjaGVyRGF0YS5yb2xlVHlwZSA9IERhdGFSZXNwb25zZS5yb2xlVHlwZTtcclxuXHJcbiAgICBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICB0aGlzLlRlYWNoZXJEYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5UZWFjaGVyRGF0YS5VcGRhdGVkQXQgPSBEYXRhUmVzcG9uc2UudXBkYXRlZEF0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuVGVhY2hlckRhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbk1lbnRvckRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5NZW50b3JEYXRhLmVtYWlsQWRkcmVzcyA9IERhdGFSZXNwb25zZS5TSztcclxuICAgIHRoaXMuTWVudG9yRGF0YS5jb250YWN0TnVtYmVyID0gRGF0YVJlc3BvbnNlLmNvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEudXNlcklEID0gRGF0YVJlc3BvbnNlLnVzZXJJRDtcclxuICAgIHRoaXMuTWVudG9yRGF0YS5hZGRyZXNzID0gRGF0YVJlc3BvbnNlLmFkZHJlc3M7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEuZGlzdHJpY3QgPSBEYXRhUmVzcG9uc2UuZGlzdHJpY3Q7XHJcbiAgICB0aGlzLk1lbnRvckRhdGEucm9sZVR5cGUgPSBEYXRhUmVzcG9uc2Uucm9sZVR5cGU7XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4pIHtcclxuICAgICAgdGhpcy5NZW50b3JEYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5NZW50b3JEYXRhLlVwZGF0ZWRBdCA9IERhdGFSZXNwb25zZS51cGRhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5NZW50b3JEYXRhKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25BZG1pbkRhdGEoRGF0YVJlc3BvbnNlLCBpc0xvZ2dlZEluKSB7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5uYW1lID0gRGF0YVJlc3BvbnNlLm5hbWU7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5lbWFpbEFkZHJlc3MgPSBEYXRhUmVzcG9uc2UuU0s7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5jb250YWN0TnVtYmVyID0gRGF0YVJlc3BvbnNlLmNvbnRhY3ROdW1iZXI7XHJcbiAgICB0aGlzLkFkbWluRGF0YS51c2VySUQgPSBEYXRhUmVzcG9uc2UudXNlcklEO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuc2Nob29sTmFtZSA9IERhdGFSZXNwb25zZS5zY2hvb2xOYW1lO1xyXG4gICAgdGhpcy5BZG1pbkRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLkFkbWluRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuQWRtaW5EYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuQWRtaW5EYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5BZG1pbkRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLkFkbWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGlyZWN0b3JEYXRhKERhdGFSZXNwb25zZSwgaXNMb2dnZWRJbikge1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEubmFtZSA9IERhdGFSZXNwb25zZS5uYW1lO1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEuZW1haWxBZGRyZXNzID0gRGF0YVJlc3BvbnNlLlNLO1xyXG4gICAgdGhpcy5EaXJlY3RvckRhdGEuYXZhdGFySWQgPSBEYXRhUmVzcG9uc2UuYXZhdGFySWQ7XHJcbiAgICB0aGlzLkRpcmVjdG9yRGF0YS5kaXN0cmljdCA9IERhdGFSZXNwb25zZS5kaXN0cmljdDtcclxuICAgIHRoaXMuRGlyZWN0b3JEYXRhLnJvbGVUeXBlID0gRGF0YVJlc3BvbnNlLnJvbGVUeXBlO1xyXG5cclxuICAgIGlmIChpc0xvZ2dlZEluKSB7XHJcbiAgICAgIHRoaXMuRGlyZWN0b3JEYXRhLkFjY2Vzc1Rva2VuID0gRGF0YVJlc3BvbnNlLnVzZXJUb2tlbjtcclxuICAgICAgdGhpcy5EaXJlY3RvckRhdGEuVXBkYXRlZEF0ID0gRGF0YVJlc3BvbnNlLnVwZGF0ZWRBdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLkRpcmVjdG9yRGF0YSk7XHJcbiAgfSxcclxuICBzdGFydCgpIHt9LFxyXG5cclxuICBSZWxvZ2luRnJvbVN0b3JhZ2UoTWFpbkRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidXNlciBsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5IGF1dG9tYXRpY2FsbHlcIik7XHJcbiAgICBjb25zb2xlLmxvZyhNYWluRGF0YSk7XHJcbiAgICBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTdHVkZW50XCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblN0dWRlbnREYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJUZWFjaGVyXCIpKSB7XHJcbiAgICAgIFNlcnZlckJhY2tlbmQuSW5zdGFuY2UuUmVzcG9uc2VUeXBlID0gUmVzcG9uc2VUeXBlRW51bS5TdWNjZXNzZnVsO1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLkFzc2lnblRlYWNoZXJEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJQcm9ncmFtQW1iYXNzYWRvclwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25NZW50b3JEYXRhKE1haW5EYXRhLCB0cnVlKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkFzc2lnblByb2ZpbGVEYXRhXCIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoTWFpbkRhdGEucm9sZVR5cGUuaW5jbHVkZXMoXCJTY2hvb2xBZG1pblwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25BZG1pbkRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChNYWluRGF0YS5yb2xlVHlwZS5pbmNsdWRlcyhcIlByb2dyYW1EaXJlY3RvclwiKSkge1xyXG4gICAgICBTZXJ2ZXJCYWNrZW5kLkluc3RhbmNlLlJlc3BvbnNlVHlwZSA9IFJlc3BvbnNlVHlwZUVudW0uU3VjY2Vzc2Z1bDtcclxuICAgICAgU2VydmVyQmFja2VuZC5JbnN0YW5jZS5Bc3NpZ25EaXJlY3RvckRhdGEoTWFpbkRhdGEsIHRydWUpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQXNzaWduUHJvZmlsZURhdGFcIiwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHNlbmRpbmcgcGF5bG9hZCB0byByZWNlaXZlIGRhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVzZXJQYXlsb2FkID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlclBheWxvYWRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX2VtYWlsID0gXCJub25lXCIsIF9yb2xlID0gXCJub25lXCIpIHtcclxuICAgIHRoaXMuZW1haWwgPSBfZW1haWw7XHJcbiAgICB0aGlzLnJvbGUgPSBfcm9sZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVc2VyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERhdGEgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJEYXRhXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgaW5HYW1lQ2FzaDogXCJcIixcclxuICAgIExTSzogXCJcIixcclxuICAgIHVzZXJUb2tlbjogXCJcIixcclxuICAgIGNsYXNzVGF1Z2h0OiBcIlwiLFxyXG4gICAgY29udGFjdE51bWJlcjogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBnYW1lc1dvbjogXCJcIixcclxuICAgIGNyZWF0ZWRBdDogMCxcclxuICAgIGlzRGVsZXRlZDogZmFsc2UsXHJcbiAgICBUYWJsZU5hbWU6IFwiXCIsXHJcbiAgICBncmFkZUxldmVsOiBcIlwiLFxyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHJvbGVUeXBlOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICBmYlBhZ2U6IFwiXCIsXHJcbiAgICB1cGRhdGVkQXQ6IDAsXHJcbiAgICB0ZWFjaGVyTmFtZTogXCJcIixcclxuICAgIGRvQjogXCJcIixcclxuICAgIFNLOiBcIlwiLFxyXG4gICAgdGVzdFRha2VuOiBcIlwiLFxyXG4gICAgUEs6IFwiXCIsXHJcbiAgICB0ZXN0aW5nQXZlcmFnZTogXCJcIixcclxuICAgIHVzZXJJRDogXCJcIixcclxuICAgIGFkZHJlc3M6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICAgIGFkZGVkQnlFbWFpbDogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgVW5pcXVlS2V5OiBcIlwiLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcm9vdCBjbGFzcyBvZiByZXNwb25zZSByZWNlaXZlZCB3aGVuIGdldHRpbmcgdXNlciBhcGkgaXMgaGl0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyRGF0YVJlc3BvbnNlID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVXNlckRhdGFSZXNwb25zZVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIHN0YXR1c0NvZGU6IFwiXCIsXHJcbiAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgZGF0YTogRGF0YSxcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChfc3RhdHVzQ29kZSA9IFwibm9uZVwiLCBfbWVzc2FnZSA9IFwibm9uZVwiLCBfZGF0YSA9IG51bGwpIHtcclxuICAgIHRoaXMuc3RhdHVzQ29kZSA9IF9zdGF0dXNDb2RlO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gX21lc3NhZ2U7XHJcbiAgICB0aGlzLmRhdGEgPSBfZGF0YTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBzZW5kaW5nIHBheWxvYWQgdG8gbG9naW4gdXNlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVXNlckxvZ2luUGF5bG9hZCA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVzZXJMb2dpblBheWxvYWRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgcm9sZTogXCJcIixcclxuICAgIGxpY2Vuc2U6IFwiXCIsXHJcbiAgfSxcclxuICAvL0RlYWZhdWx0IGFuZCBQYXJhbWV0cml6ZWQgY29uc3RydWN0b3JcclxuICBjdG9yOiBmdW5jdGlvbiAoX2VtYWlsID0gXCJub25lXCIsIF9wYXNzd29yZCA9IFwibm9uZVwiLCBfcm9sZSA9IFwibm9uZVwiLCBfbGljZW5zZSA9IFwibm9uZVwiKSB7XHJcbiAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgdGhpcy5wYXNzd29yZCA9IF9wYXNzd29yZDtcclxuICAgIHRoaXMucm9sZSA9IF9yb2xlO1xyXG4gICAgdGhpcy5saWNlbnNlID0gX2xpY2Vuc2U7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVXNlckRhdGFVcGRhdGVQYXlsb2FkLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVc2VyRGF0YVVwZGF0ZVBheWxvYWQgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVc2VyRGF0YVVwZGF0ZVBheWxvYWRcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBlbWFpbDogXCJcIixcclxuICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgbmFtZTogXCJcIixcclxuICAgIHJvbGU6IFwiXCIsXHJcbiAgICBkb0I6IFwiXCIsXHJcbiAgICBncmFkZUxldmVsOiBcIlwiLFxyXG4gICAgdGVhY2hlck5hbWU6IFwiXCIsXHJcbiAgICBmYlBhZ2U6IFwiXCIsXHJcbiAgICBnYW1lc1dvbjogXCJcIixcclxuICAgIHRlc3RUYWtlbjogXCJcIixcclxuICAgIGRpc3RyaWN0OiBcIlwiLFxyXG4gICAgdGVzdGluZ0F2ZXJhZ2U6IFwiXCIsXHJcbiAgICBpbkdhbWVDYXNoOiBcIlwiLFxyXG4gICAgYWRtaW5FbWFpbDogXCJcIixcclxuICAgIGFkbWluUm9sZTogXCJcIixcclxuICAgIGFkZGVkQnlFbWFpbDogXCJcIixcclxuICAgIHNjaG9vbE5hbWU6IFwiXCIsXHJcbiAgICBhdmF0YXJJZDogXCJcIixcclxuICB9LFxyXG4gIC8vRGVhZmF1bHQgYW5kIFBhcmFtZXRyaXplZCBjb25zdHJ1Y3RvclxyXG4gIGN0b3I6IGZ1bmN0aW9uIChcclxuICAgIF9lbWFpbCA9IFwibm9uZVwiLFxyXG4gICAgX3Bhc3N3b3JkID0gXCJub25lXCIsXHJcbiAgICBfbmFtZSA9IFwiXCIsXHJcbiAgICBfcm9sZSA9IFwibm9uZVwiLFxyXG4gICAgX2RvYiA9IFwiXCIsXHJcbiAgICBfZ3JhZGVMZXZlbCA9IFwiXCIsXHJcbiAgICBfdGVhY2hlck5hbWUgPSBcIlwiLFxyXG4gICAgX2ZiUGFnZSA9IFwiXCIsXHJcbiAgICBfZ2FtZXNXb24gPSBcIlwiLFxyXG4gICAgX3Rlc3RUYWtlbiA9IFwiXCIsXHJcbiAgICBfZGlzdHJpY3QgPSBcIlwiLFxyXG4gICAgX3Rlc3RpbmdBdmVyYWdlID0gXCJcIixcclxuICAgIF9pbkdhbWVDYXNoID0gXCJcIixcclxuICAgIF9hZG1pbkVtYWlsID0gXCJcIixcclxuICAgIF9hZG1pblJvbGUgPSBcIlwiLFxyXG4gICAgX2FkZGVkQnlFbWFpbCA9IFwiXCIsXHJcbiAgICBfc2Nob29sTmFtZSA9IFwiXCIsXHJcbiAgICBfYXZhdGFySUQgPSBcIlwiXHJcbiAgKSB7XHJcbiAgICB0aGlzLmVtYWlsID0gX2VtYWlsO1xyXG4gICAgdGhpcy5wYXNzd29yZCA9IF9wYXNzd29yZDtcclxuICAgIHRoaXMubmFtZSA9IF9uYW1lO1xyXG4gICAgdGhpcy5yb2xlID0gX3JvbGU7XHJcbiAgICB0aGlzLmRvQiA9IF9kb2I7XHJcbiAgICB0aGlzLmdyYWRlTGV2ZWwgPSBfZ3JhZGVMZXZlbDtcclxuICAgIHRoaXMudGVhY2hlck5hbWUgPSBfdGVhY2hlck5hbWU7XHJcbiAgICB0aGlzLmZiUGFnZSA9IF9mYlBhZ2U7XHJcbiAgICB0aGlzLmdhbWVzV29uID0gX2dhbWVzV29uO1xyXG4gICAgdGhpcy50ZXN0VGFrZW4gPSBfdGVzdFRha2VuO1xyXG4gICAgdGhpcy5kaXN0cmljdCA9IF9kaXN0cmljdDtcclxuICAgIHRoaXMudGVzdGluZ0F2ZXJhZ2UgPSBfdGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICB0aGlzLmluR2FtZUNhc2ggPSBfaW5HYW1lQ2FzaDtcclxuICAgIHRoaXMuYWRtaW5FbWFpbCA9IF9hZG1pbkVtYWlsO1xyXG4gICAgdGhpcy5hZG1pblJvbGUgPSBfYWRtaW5Sb2xlO1xyXG4gICAgdGhpcy5hZGRlZEJ5RW1haWwgPSBfYWRkZWRCeUVtYWlsO1xyXG4gICAgdGhpcy5zY2hvb2xOYW1lID0gX3NjaG9vbE5hbWU7XHJcbiAgICB0aGlzLmF2YXRhcklkID0gX2F2YXRhcklEO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VydmVyQmFja2VuZDtcclxuIl19