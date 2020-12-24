"use strict";
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
    contactNumber: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _school, _classTaught, _emailAddress, _contactNumber) {
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

    this.name = _name;
    this.school = _school;
    this.classTaught = _classTaught;
    this.emailAddress = _emailAddress;
    this.contactNumber = _contactNumber;
  }
}); //-------------------------------------------class for Program Ambassadors Data-------------------------////

var ProgramAmbassadors = cc.Class({
  name: "ProgramAmbassadors",
  properties: {
    name: "",
    emailAddress: "",
    contactNumber: "",
    address: ""
  },
  //Deafult and Parametrized constructor
  ctor: function ctor(_name, _emailAddress, _contactNumber, _address) {
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

    this.name = _name;
    this.emailAddress = _emailAddress;
    this.contactNumber = _contactNumber;
    this.address = _address;
  }
}); //-------------------------------------------class for School Administrators Data-------------------------////

var SchoolAdministrators = cc.Class({
  name: "SchoolAdministrators",
  properties: {
    name: "",
    schoolName: "",
    contactNumber: "",
    emailAddress: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _schoolName, _emailAddress, _contactNumber) {
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

    this.name = _name;
    this.schoolName = _schoolName;
    this.contactNumber = _contactNumber;
    this.emailAddress = _emailAddress;
  }
}); //-------------------------------------------class for Program Directors Data-------------------------////

var ProgramDirectors = cc.Class({
  name: "ProgramDirectors",
  properties: {
    name: "",
    emailAddress: ""
  },
  //Default and Parametrized constructor
  ctor: function ctor(_name, _emailAddress) {
    if (_name === void 0) {
      _name = "none";
    }

    if (_emailAddress === void 0) {
      _emailAddress = "none";
    }

    this.name = _name;
    this.emailAddress = _emailAddress;
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
  GetUserData: function GetUserData(_email, _role) {
    var payload = new UserPayload(_email, _role);
    this.CallRESTAPI(this.getUserAPI, "POST", payload, 1);
  },
  LoginUser: function LoginUser(_email, _password, _role) {
    var payload = new UserLoginPayload(_email, _password, _role);
    this.CallRESTAPI(this.loginUserAPI, "POST", payload, 2);
  },
  Fetch: function Fetch(_url, _method, _requestBody) {
    if (_method == "GET") {
      return fetch(_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        method: _method
      });
    } else {
      return fetch(_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        method: _method,
        body: JSON.stringify(_requestBody)
      });
    }
  },
  CallRESTAPI: function CallRESTAPI(_url, _method, _requestBody, _type) {
    Fetch_Promise(_url, _method, _requestBody);

    function Fetch_Promise(_x, _x2, _x3) {
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
      _Fetch_Promise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_url, _method, _requestBody) {
        var Response, TempData, MainData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return ServerBackend.Instance.Fetch(_url, _method, _requestBody);

              case 3:
                Response = _context.sent;
                _context.next = 6;
                return Response.json();

              case 6:
                TempData = _context.sent;

                if (_type == 1) //getting user data
                  {
                    MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
                    console.log(TempData);

                    if (MainData.message.includes("SUCCESS")) {
                      console.log("got data successfully");
                      console.log(MainData);

                      if (MainData.data.roleType.includes("Student")) {
                        ServerBackend.Instance.AssignStudentData(MainData, false); //cc.systemEvent.emit("AssignProfileData");
                      } else if (MainData.data.roleType.includes("Teacher")) {}
                    }
                  } else if (_type == 2) //login user
                  {
                    MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
                    console.log(TempData);

                    if (MainData.message.includes("sucessfully")) {
                      console.log("user logged in successfully");
                      console.log(MainData);

                      if (MainData.data.roleType.includes("Student")) {
                        ServerBackend.Instance.ResponseType = ResponseTypeEnum.Successful;
                        ServerBackend.Instance.AssignStudentData(MainData, true);
                        cc.systemEvent.emit("AssignProfileData");
                      } else if (MainData.data.roleType.includes("Teacher")) {}
                    } else if (MainData.message.includes("wrong") || MainData.message.includes("characters")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.InvalidEmailPassword;
                      cc.systemEvent.emit("AssignProfileData");
                    } else if (MainData.message.includes("Data not Found!")) {
                      ServerBackend.Instance.ResponseType = ResponseTypeEnum.UserNotFound;
                      cc.systemEvent.emit("AssignProfileData");
                    }
                  }

                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                if (_type == 2) //login user error
                  {
                    ServerBackend.Instance.ResponseType = ResponseTypeEnum.WentWrong;
                    cc.systemEvent.emit("AssignProfileData");
                  }

                console.error(_context.t0);

              case 14:
                _context.prev = 14;
                return _context.finish(14);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10, 14, 16]]);
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
  start: function start() {}
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
    userID: ""
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