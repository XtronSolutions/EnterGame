//for web make: IsMobile=false and IsWeb=true
//for mobile make: IsMobile=true and IsWeb=false
var IsWeb = false;
var IsMobile=true;
var OnMobile=false;
//-------------------------------------------enumeration for type of business-------------------------//
var ResponseTypeEnum = cc.Enum({
  None: 0,
  Successful: 1,
  UserNotFound: 2,
  InvalidEmailPassword: 3,
  WentWrong: 4,
  LicenseInvalid: 5,
});

//-------------------------------------------class for Student Data-------------------------//
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
    roleType: "",
  },
  //Deafault and Parametrized constructor
  ctor: function (_name = "none", _dob = "none", _gradeLevel = "none", _emailAddress = "none", _teacherName = "none", _facebookPage = "none", _gamesWon = 0, _testsTaken = 0, _testingAverage = 0, _gameCash = 0, _avatarId = "", _district = "", _roleType = "") {
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
  },
});

//-------------------------------------------class for Teacher Data-------------------------////
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
    roleType: "",
  },
  //Default and Parametrized constructor
  ctor: function (_name = "none", _school = "none", _classTaught = 0, _emailAddress = "none", _contactNumber = "none", _accessToken = "", _updatedAt = 0, _userID = "", _avatarId = "", _district = "", _roleType = "") {
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
  },
});

//-------------------------------------------class for Program Ambassadors Data-------------------------////
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
    roleType: "",
  },
  //Deafult and Parametrized constructor
  ctor: function (_name = "none", _emailAddress = "none", _contactNumber = "none", _address = "none", _accessToken = "", _updatedAt = 0, _userID = "", _avatarId = "", _district = "", _roleType = "") {
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
  },
});

//-------------------------------------------class for School Administrators Data-------------------------////
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
    roleType: "",
  },
  //Default and Parametrized constructor
  ctor: function (_name = "none", _schoolName = "none", _emailAddress = "none", _contactNumber = "none", _accessToken = "", _updatedAt = 0, _userID = "", _avatarId = "", _district = "", _roleType = "") {
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
  },
});

//-------------------------------------------class for Program Directors Data-------------------------////
var ProgramDirectors = cc.Class({
  name: "ProgramDirectors",
  properties: {
    name: "",
    emailAddress: "",
    AccessToken: "",
    UpdatedAt: 0,
    userID: "",
  },
  //Default and Parametrized constructor
  ctor: function (_name = "none", _emailAddress = "none", _accessToken = "", _updatedAt = 0, _userID = "") {
    this.name = _name;
    this.emailAddress = _emailAddress;
    this.AccessToken = _accessToken;
    this.UpdatedAt = _updatedAt;
    this.userID = _userID;
  },
});

//-------------------------------------------class for ServerBackend-------------------------//
var ServerBackend = cc.Class({
  name: "ServerBackend",
  extends: cc.Component,
  properties: {
    StudentData: {
      default: null,
      type: Student,
      serializable: true,
      tooltip: "current logged in student data",
    },
    TeacherData: {
      default: null,
      type: Teacher,
      serializable: true,
      tooltip: "current logged in teacher data",
    },
    MentorData: {
      default: null,
      type: ProgramAmbassadors,
      serializable: true,
      tooltip: "current logged in Mentor / ProgramAmbassadors  data",
    },
    AdminData: {
      default: null,
      type: SchoolAdministrators,
      serializable: true,
      tooltip: "current logged in SchoolAdministrators  data",
    },
    DirectorData: {
      default: null,
      type: ProgramDirectors,
      serializable: true,
      tooltip: "current logged in ProgramDirectors  data",
    },
    ResponseType: {
      displayName: "Response",
      type: ResponseTypeEnum,
      default: ResponseTypeEnum.None,
      serializable: true,
      tooltip: "ResponseType catogory for api's",
    },
  },

  statics: {
    //creating static instance of the class
    Instance: null,
  },

  RemovePersistNode() {
    ServerBackend.Instance = null;
    cc.game.removePersistRootNode(this.node);
  },

  onLoad() {
    if (!ServerBackend.Instance) {
      ServerBackend.Instance = this;
      cc.game.addPersistRootNode(this.node);
      this.StudentData = new Student();
      //  console.log("creating instance " + this.node.name);
    }

    //private variables
    this.getUserAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/getUser";
    this.loginUserAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/loginUser";
    this.UpdateUserDataAPI = "https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/updateUser";
    //UCK2SR4YMG7J
    // this.GetUserData("xtrondev@gmail.com","Student");
    //
    //fetch(this.getUserAPI);

    //var _options = { params: null, url: "" };
    // this.sendPostRequest();
  },

  sendPostRequest() {
    var http = new XMLHttpRequest();
    var request_url = this.loginUserAPI;

    var params = "";
    var payload = new UserLoginPayload("xtrondev@gmail.com", "12345678", "Student", "UCK2SR4YMG7J");
    var _json = JSON.stringify(payload);
    http.open("POST", request_url, true);
    //  http.setB(_json);
    http.setRequestHeader("Content-type", "application/json; charset=utf-8");

    http.onreadystatechange = function () {
      var httpStatus = http.statusText;
      // console.log(httpStatus);
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

  GetUserData(_email, _role, _accessToken, _subType = -1) {
    var payload = new UserPayload(_email, _role);
    var header = { "Content-Type": "application/json; charset=utf-8", Authorization: _accessToken };

    console.log("calling get user data");

    if(!IsMobile)
      this.CallRESTAPI(this.getUserAPI, "POST", payload, 1, header, _subType);
    else
      this.CallRESTAPI_XML(this.getUserAPI, "POST", payload, 1, _accessToken, _subType);
    
  },

  LoginUser(_email, _password, _role, _license) {
    var payload = new UserLoginPayload(_email, _password, _role, _license);
    if(!IsMobile)
      this.CallRESTAPI(this.loginUserAPI, "POST", payload, 2, null, -1);
    else
      this.CallRESTAPI_XML(this.loginUserAPI, "POST", payload, 2, null, -1);
  },

  UpdateUserData(_cash = -1, _gameWon = -1, _avatarID = -1) {
    var _mainData;
    if (IsWeb) {
      _mainData = JSON.parse(window.AllData);
    } else {
      _mainData = JSON.parse(cc.sys.localStorage.getItem("userData"));
    }

    if (_mainData.roleType == "Student") {
      if (_mainData != null) {
        var SendingPayload = new UserDataUpdatePayload(
          _mainData.SK,
          _mainData.password,
          _mainData.name,
          _mainData.roleType,
          _mainData.doB,
          _mainData.gradeLevel,
          _mainData.teacherName,
          _mainData.fbPage,
          _mainData.gamesWon,
          _mainData.testTaken,
          _mainData.district,
          _mainData.testingAverage,
          _mainData.inGameCash,
          "programdirector@gmail.com",
          "ProgramDirector",
          _mainData.addedByEmail,
          _mainData.schoolName,
          _mainData.avatarId
        );

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
        var header = { "Content-Type": "application/json; charset=utf-8", Authorization: _mainData.userToken };

        if(!IsMobile)
          this.CallRESTAPI(this.UpdateUserDataAPI, "PUT", payload, 3, header, -1);
        else
          this.CallRESTAPI_XML(this.UpdateUserDataAPI, "PUT", payload, 3, _mainData.userToken, -1);
      } else {
        console.log("cannot update data as stored data is null");
      }
    } else {
      console.log("not student");
    }
  },

  Fetch(_url, _method, _requestBody, _headers = null) {
    if (_method == "GET") {
      if (_headers == null) {
        return fetch(_url, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: _method,
        });
      } else {
        return fetch(_url, {
          headers: _headers,
          method: _method,
        });
      }
    } else {
      if (_headers == null) {
        //console.log("header is null");
        //console.log(_requestBody);
        return fetch(_url, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: _method,
          body: JSON.stringify(_requestBody),
        });
      } else {
        return fetch(_url, {
          headers: _headers,
          method: _method,
          body: JSON.stringify(_requestBody),
        });
      }
    }
  },

  CallRESTAPI(_url, _method, _requestBody, _type, _headers = null, _subType = -1) {
    Fetch_Promise(_url, _method, _requestBody, _headers);
    async function Fetch_Promise(_url, _method, _requestBody, _headers = null) {
      try {
        var Response = await ServerBackend.Instance.Fetch(_url, _method, _requestBody, _headers);
        var TempData = await Response.json();

        if (_type == 1) {
          //getting user data
          var MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
          console.log(TempData);
          if (_subType == 0) {
            //return data to storage class
            if (MainData.message.includes("SUCCESS") || MainData.message.includes("sucessfully")) {
              console.log("got data successfully");
              console.log(MainData);

              //both below calls are written inside storgaemanager
              cc.systemEvent.emit("WriteData", MainData.data);
              cc.systemEvent.emit("RefreshData", 0);
            } else {
              cc.systemEvent.emit("RefreshData", 1);
            }
          }
        } else if (_type == 2) {
          //login user
          var MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
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
          var MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
          console.log(TempData);
        }
      } catch (e) {
        if (_type == 2) {
          //login user error
          ServerBackend.Instance.ResponseType = ResponseTypeEnum.WentWrong;
          cc.systemEvent.emit("AssignProfileData");
        }
        console.log("something goes wrong");
        console.log(e.toString());
      } finally {
        //  console.log('We do cleanup here');
      }
    }
    //#region Commented
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
  },

  Fetch_XML(_url, _method, _requestBody, _headers = null) {
    var http = new XMLHttpRequest();
    var request_url = _url;
    var params = "";

    if (_method == "GET") {
      if (_headers == null) {

        return new Promise(resolve => {
        http.open("GET", request_url, true);
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        http.onreadystatechange = function () {
        var httpStatus = http.statusText;
        var responseJSON=null;
        if (http.responseText) {
          responseJSON = eval("(" + http.responseText + ")");
        }

        //console.log(http.readyState);
        switch (http.readyState) {
          case 4:
            console.log(responseJSON);
            resolve(responseJSON);
        }
        };

        http.send();
        });

        
      } else {
        return new Promise(resolve => {
        http.open("GET", request_url, true);
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        http.setRequestHeader("Authorization", _headers);
        http.onreadystatechange = function () {
        var httpStatus = http.statusText;
        var responseJSON=null;
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
        return new Promise(resolve => {
        http.open(_method, request_url, true);
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        http.onreadystatechange = function () {
        var httpStatus = http.statusText;
        var responseJSON=null;
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
        return new Promise(resolve => {
        http.open(_method, request_url, true);
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        http.setRequestHeader("Authorization", _headers);
        http.onreadystatechange = function () {
        var httpStatus = http.statusText;
        var responseJSON=null;
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

  CallRESTAPI_XML(_url, _method, _requestBody, _type, _headers = null, _subType = -1) {
    Fetch_Promise_XML(_url, _method, _requestBody, _headers);
    async function Fetch_Promise_XML(_url, _method, _requestBody, _headers = null) {
      try {
        console.log("called");
        var Response = await ServerBackend.Instance.Fetch_XML(_url, _method, _requestBody, _headers);
        var TempData = Response;

        if(TempData==null || TempData==undefined)
        {
          // ServerBackend.Instance.ResponseType = ResponseTypeEnum.WentWrong;
          // cc.systemEvent.emit("AssignProfileData");
          return;
        }

        if (_type == 1) {
          //getting user data
          var MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
          console.log(TempData);
          if (_subType == 0) {
            //return data to storage class
            if (MainData.message.includes("SUCCESS") || MainData.message.includes("sucessfully")) {
              console.log("got data successfully");
              console.log(MainData);

              //both below calls are written inside storgaemanager
              cc.systemEvent.emit("WriteData", MainData.data);
              cc.systemEvent.emit("RefreshData", 0);
            } else {
              cc.systemEvent.emit("RefreshData", 1);
            }
          }
        } else if (_type == 2) {
          //login user
          var MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
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
          var MainData = new UserDataResponse(TempData.statusCode, TempData.message, TempData.data);
          console.log(TempData);
        }
      } catch (e) {
        if (_type == 2) {
          //login user error
          ServerBackend.Instance.ResponseType = ResponseTypeEnum.WentWrong;
          cc.systemEvent.emit("AssignProfileData");
        }
        console.log("something goes bezaar");
        console.log(e.toString());
      } finally {
        //  console.log('We do cleanup here');
      }
    }
    //#region Commented
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
  },

  AssignStudentData(DataResponse, isLoggedIn) {
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

  AssignTeacherData(DataResponse, isLoggedIn) {
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

  AssignMentorData(DataResponse, isLoggedIn) {
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

  AssignAdminData(DataResponse, isLoggedIn) {
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

  AssignDirectorData(DataResponse, isLoggedIn) {
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
  start() {},

  ReloginFromStorage(MainData) {
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
  },
});

//-------------------------------------------class for sending payload to receive data-------------------------//
var UserPayload = cc.Class({
  name: "UserPayload",
  properties: {
    email: "",
    role: "",
  },
  //Deafault and Parametrized constructor
  ctor: function (_email = "none", _role = "none") {
    this.email = _email;
    this.role = _role;
  },
});

//-------------------------------------------class for User Data-------------------------//
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
    UniqueKey: "",
  },
});

//-------------------------------------------root class of response received when getting user api is hit-------------------------//
var UserDataResponse = cc.Class({
  name: "UserDataResponse",
  properties: {
    statusCode: "",
    message: "",
    data: Data,
  },
  //Deafault and Parametrized constructor
  ctor: function (_statusCode = "none", _message = "none", _data = null) {
    this.statusCode = _statusCode;
    this.message = _message;
    this.data = _data;
  },
});

//-------------------------------------------class for sending payload to login user-------------------------------//
var UserLoginPayload = cc.Class({
  name: "UserLoginPayload",
  properties: {
    email: "",
    password: "",
    role: "",
    license: "",
  },
  //Deafault and Parametrized constructor
  ctor: function (_email = "none", _password = "none", _role = "none", _license = "none") {
    this.email = _email;
    this.password = _password;
    this.role = _role;
    this.license = _license;
  },
});

//-------------------------------------------class for UserDataUpdatePayload-------------------------------//
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
    avatarId: "",
  },
  //Deafault and Parametrized constructor
  ctor: function (
    _email = "none",
    _password = "none",
    _name = "",
    _role = "none",
    _dob = "",
    _gradeLevel = "",
    _teacherName = "",
    _fbPage = "",
    _gamesWon = "",
    _testTaken = "",
    _district = "",
    _testingAverage = "",
    _inGameCash = "",
    _adminEmail = "",
    _adminRole = "",
    _addedByEmail = "",
    _schoolName = "",
    _avatarID = ""
  ) {
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
  },
});

export default ServerBackend;
