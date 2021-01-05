//-------------------------------------------enumeration for type of business-------------------------//
var ResponseTypeEnum = cc.Enum({
    None:0,
    Successful: 1,           
    UserNotFound: 2,
    InvalidEmailPassword: 3,
    WentWrong:4              
});
//-------------------------------------------class for Student Data-------------------------//
var Student = cc.Class({
    name:"Student",
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
        AccessToken:"",
        UpdatedAt:0,
        userID:""
    },
//Deafault and Parametrized constructor
    ctor: function
        (
            _name = "none",
            _dob = "none",
            _gradeLevel = "none",
            _emailAddress = "none",
            _teacherName = "none",
            _facebookPage = "none",
            _gamesWon = 0,
            _testsTaken = 0,
            _testingAverage = 0,
            _gameCash = 0
        ) {
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
        AccessToken:"",
        UpdatedAt: 0,
        userID:""
    },
    //Default and Parametrized constructor
    ctor: function
        (_name = "none",
            _school = "none",
            _classTaught = 0,
            _emailAddress = "none",
            _contactNumber = "none",
            _accessToken = "",
            _updatedAt = 0,
            _userID=""
        ) {
        this.name = _name;
        this.school = _school;
        this.classTaught = _classTaught;
        this.emailAddress = _emailAddress;
        this.contactNumber = _contactNumber;
        this.AccessToken = _accessToken;
        this.UpdatedAt = _updatedAt;
        this.userID = _userID;
    }
});

//-------------------------------------------class for Program Ambassadors Data-------------------------////
var ProgramAmbassadors = cc.Class({
    name: "ProgramAmbassadors",
    properties: {
        name: "",
        emailAddress: "",
        contactNumber: "",
        address: "",
        AccessToken:"",
        UpdatedAt: 0,
        userID:""
    },
    //Deafult and Parametrized constructor
    ctor: function
        (_name = "none",
            _emailAddress = "none",
            _contactNumber = "none",
            _address = "none",
            _accessToken = "",
            _updatedAt = 0,
            _userID=""
        ) {
        this.name = _name;
        this.emailAddress = _emailAddress;
        this.contactNumber = _contactNumber;
        this.address = _address;
        this.AccessToken = _accessToken;
        this.UpdatedAt = _updatedAt;
        this.userID = _userID;
    }
});

//-------------------------------------------class for School Administrators Data-------------------------////
var SchoolAdministrators = cc.Class({
    name: "SchoolAdministrators",
    properties: {
        name: "",
        schoolName: "",
        contactNumber: "",
        emailAddress: "",
        AccessToken:"",
        UpdatedAt: 0,
        userID:""
    },
    //Default and Parametrized constructor
    ctor: function
        (_name = "none",
            _schoolName = "none",
            _emailAddress = "none",
            _contactNumber = "none",
            _accessToken = "",
            _updatedAt = 0,
            _userID=""
        ) {
        this.name = _name;
        this.schoolName = _schoolName;
        this.contactNumber = _contactNumber;
        this.emailAddress = _emailAddress;
        this.AccessToken = _accessToken;
        this.UpdatedAt = _updatedAt;
        this.userID = _userID;
    }
});

//-------------------------------------------class for Program Directors Data-------------------------////
var ProgramDirectors = cc.Class({
    name: "ProgramDirectors",
    properties: {
        name: "",
        emailAddress: "",
        AccessToken:"",
        UpdatedAt: 0,
        userID:""
    },
    //Default and Parametrized constructor
    ctor: function
        (   _name = "none",
            _emailAddress = "none",
            _accessToken = "",
            _updatedAt = 0,
            _userID=""
        )
    {
        this.name = _name;
        this.emailAddress = _emailAddress;
        this.AccessToken = _accessToken;
        this.UpdatedAt = _updatedAt;
        this.userID = _userID;
    }
});

//-------------------------------------------class for ServerBackend-------------------------//
var ServerBackend=cc.Class({
    name:"ServerBackend",
    extends: cc.Component,
    properties: {
        StudentData: {
            default: null,                
            type: Student,
            serializable: true,
            tooltip: "current logged in student data"
        },

        TeacherData: {
            default: null,                
            type: Teacher,
            serializable: true,
            tooltip: "current logged in teacher data"
        },
        MentorData: {
            default: null,                
            type: ProgramAmbassadors,
            serializable: true,
            tooltip: "current logged in Mentor / ProgramAmbassadors  data"
        },
        AdminData: {
            default: null,                
            type: SchoolAdministrators,
            serializable: true,
            tooltip: "current logged in SchoolAdministrators  data"
        },
        DirectorData: {
            default: null,                
            type: ProgramDirectors,
            serializable: true,
            tooltip: "current logged in ProgramDirectors  data"
        },
        ResponseType:{
            displayName:"Response",
            type: ResponseTypeEnum,
            default: ResponseTypeEnum.None,
            serializable: true,
            tooltip:"ResponseType catogory for api's",}, 
    },

    statics: { //creating static instance of the class
        Instance: null,
    },

    RemovePersistNode()
    {
        ServerBackend.Instance=null;
        cc.game.removePersistRootNode(this.node);
    },

    onLoad() {
        if(!ServerBackend.Instance)
        {
            ServerBackend.Instance=this;
            cc.game.addPersistRootNode(this.node);
            this.StudentData=new Student();
            console.error("creating instance "+this.node.name);
        }

        //private variables
        this.getUserAPI="https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/getUser";
        this.loginUserAPI="https://ia3nqkp6th.execute-api.us-east-2.amazonaws.com/dev/loginUser";

       // this.GetUserData("xtrondev@gmail.com","Student");
    },

    GetUserData(_email,_role)
    {
        var payload=new UserPayload(_email,_role);
        this.CallRESTAPI( this.getUserAPI,"POST",payload,1);    
    },

    LoginUser(_email,_password,_role)
    {
        var payload=new UserLoginPayload(_email,_password,_role);
        this.CallRESTAPI( this.loginUserAPI,"POST",payload,2);    
    },

    Fetch(_url,_method,_requestBody)
    {
        if(_method=="GET")
        {
            return fetch(
                _url, 
                {
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    method: _method,
                }
              );
        }
        else
        {
            return fetch(
                _url, 
                {
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    method: _method,
                    body: JSON.stringify(_requestBody)
                }
              );
        }
    },
    
    CallRESTAPI(_url,_method,_requestBody,_type) {
        Fetch_Promise(_url,_method,_requestBody);
        async function Fetch_Promise(_url,_method,_requestBody) {
            try {
                var Response=await ServerBackend.Instance.Fetch(_url,_method,_requestBody);
                var TempData=await Response.json();
                
                if(_type==1) //getting user data
                {
                    var MainData=new UserDataResponse(TempData.statusCode,TempData.message,TempData.data);
                    console.log(TempData);
                    if(MainData.message.includes("SUCCESS"))
                    {
                        console.log("got data successfully");
                        console.log(MainData);
                        if(MainData.data.roleType.includes("Student"))
                        {
                            ServerBackend.Instance.AssignStudentData(MainData,false);
                            //cc.systemEvent.emit("AssignProfileData");
                        }
                        else if(MainData.data.roleType.includes("Teacher"))
                        {
                            
                        }
                    }
                }
                else if(_type==2) //login user
                {
                    var MainData=new UserDataResponse(TempData.statusCode,TempData.message,TempData.data);
                    console.log(TempData);
                    if(MainData.message.includes("sucessfully"))
                    {
                        console.log("user logged in successfully");
                        console.log(MainData);
                        if(MainData.data.roleType.includes("Student"))
                        {
                            ServerBackend.Instance.ResponseType=ResponseTypeEnum.Successful;
                            ServerBackend.Instance.AssignStudentData(MainData,true);
                            cc.systemEvent.emit("AssignProfileData",true,false,false,false,false);
                        }
                        else if(MainData.data.roleType.includes("Teacher"))
                        {
                            ServerBackend.Instance.ResponseType=ResponseTypeEnum.Successful;
                            ServerBackend.Instance.AssignTeacherData(MainData,true);
                            cc.systemEvent.emit("AssignProfileData",false,true,false,false,false);
                        }
                        else if(MainData.data.roleType.includes("ProgramAmbassador"))
                        {
                            ServerBackend.Instance.ResponseType=ResponseTypeEnum.Successful;
                            ServerBackend.Instance.AssignMentorData(MainData,true);
                            cc.systemEvent.emit("AssignProfileData",false,false,true,false,false);
                        }
                        else if(MainData.data.roleType.includes("SchoolAdmin"))
                        {
                            ServerBackend.Instance.ResponseType=ResponseTypeEnum.Successful;
                            ServerBackend.Instance.AssignAdminData(MainData,true);
                            cc.systemEvent.emit("AssignProfileData",false,false,false,true,false);
                        }
                        else if(MainData.data.roleType.includes("ProgramDirector"))
                        {
                            ServerBackend.Instance.ResponseType=ResponseTypeEnum.Successful;
                            ServerBackend.Instance.AssignDirectorData(MainData,true);
                            cc.systemEvent.emit("AssignProfileData",false,false,false,false,true);
                        }
                    }
                    else  if(MainData.message.includes("wrong") ||MainData.message.includes("characters"))
                    {
                        ServerBackend.Instance.ResponseType=ResponseTypeEnum.InvalidEmailPassword;
                        cc.systemEvent.emit("AssignProfileData");
                    }
                    else if(MainData.message.includes("Data not Found!"))
                    {
                        ServerBackend.Instance.ResponseType=ResponseTypeEnum.UserNotFound;
                        cc.systemEvent.emit("AssignProfileData");
                    }else if(MainData.message.includes("Password should contain atleast one Integer"))
                    {
                        ServerBackend.Instance.ResponseType=ResponseTypeEnum.InvalidEmailPassword;
                        cc.systemEvent.emit("AssignProfileData");
                    }
                }
            } catch (e) {
                if(_type==2) //login user error
                {
                    ServerBackend.Instance.ResponseType=ResponseTypeEnum.WentWrong;
                    cc.systemEvent.emit("AssignProfileData");
                }
                console.error(e);
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

    AssignStudentData(DataResponse,isLoggedIn)
    {
        this.StudentData.name=DataResponse.data.name;
        this.StudentData.dOB=DataResponse.data.doB;
        this.StudentData.gradeLevel=DataResponse.data.gradeLevel;
        this.StudentData.emailAddress=DataResponse.data.SK;
        this.StudentData.teacherName=DataResponse.data.teacherName;
        this.StudentData.facebookPage=DataResponse.data.fbPage;
        this.StudentData.gamesWon=DataResponse.data.gamesWon;
        this.StudentData.testsTaken=DataResponse.data.testTaken;
        this.StudentData.testingAverage=DataResponse.data.testingAverage;
        this.StudentData.gameCash=DataResponse.data.inGameCash;
        this.StudentData.userID=DataResponse.data.userID;

        if(isLoggedIn)
        {
            this.StudentData.AccessToken=DataResponse.data.userToken;
            this.StudentData.UpdatedAt=DataResponse.data.updatedAt; 
        }

        console.log(this.StudentData);
    },

    AssignTeacherData(DataResponse,isLoggedIn)
    {
        this.TeacherData.name=DataResponse.data.name;
        this.TeacherData.school=DataResponse.data.schoolName;
        this.TeacherData.classTaught=DataResponse.data.classTaught;
        this.TeacherData.emailAddress=DataResponse.data.SK;
        this.TeacherData.contactNumber = DataResponse.data.contactNumber;
        this.TeacherData.userID=DataResponse.data.userID;

        if(isLoggedIn)
        {
            this.TeacherData.AccessToken=DataResponse.data.userToken;
            this.TeacherData.UpdatedAt=DataResponse.data.updatedAt; 
        }

        console.log(this.TeacherData);
    },

    AssignMentorData(DataResponse,isLoggedIn)
    {
        this.MentorData.name=DataResponse.data.name;
        this.MentorData.emailAddress=DataResponse.data.SK;
        this.MentorData.contactNumber = DataResponse.data.contactNumber;
        this.MentorData.userID = DataResponse.data.userID;
        this.MentorData.address=DataResponse.data.address;

        if(isLoggedIn)
        {
            this.MentorData.AccessToken=DataResponse.data.userToken;
            this.MentorData.UpdatedAt=DataResponse.data.updatedAt; 
        }

        console.log(this.MentorData);
    },

    AssignAdminData(DataResponse,isLoggedIn)
    {
        this.AdminData.name=DataResponse.data.name;
        this.AdminData.emailAddress=DataResponse.data.SK;
        this.AdminData.contactNumber = DataResponse.data.contactNumber;
        this.AdminData.userID = DataResponse.data.userID;
        this.AdminData.schoolName=DataResponse.data.schoolName;

        if(isLoggedIn)
        {
            this.AdminData.AccessToken=DataResponse.data.userToken;
            this.AdminData.UpdatedAt=DataResponse.data.updatedAt; 
        }

        console.log(this.AdminData);
    },

    AssignDirectorData(DataResponse,isLoggedIn)
    {
        this.DirectorData.name=DataResponse.data.name;
        this.DirectorData.emailAddress=DataResponse.data.SK;

        if(isLoggedIn)
        {
            this.DirectorData.AccessToken=DataResponse.data.userToken;
            this.DirectorData.UpdatedAt=DataResponse.data.updatedAt; 
        }

        console.log(this.DirectorData);
    },
    start () {},
});

//-------------------------------------------class for sending payload to receive data-------------------------//
var UserPayload = cc.Class({
    name:"UserPayload",
    properties: {
        email: "",
        role: "",
    },
//Deafault and Parametrized constructor
    ctor: function
        (
            _email= 'none',
            _role= "none"
        ) {
        this.email = _email;
        this.role = _role;  
    },
});

//-------------------------------------------class for User Data-------------------------//
var Data = cc.Class({
    name:"Data",
    properties: {
        inGameCash: "",
        LSK: "",
        userToken:"",
        classTaught:"",
        contactNumber:"",
        schoolName:"",
        gamesWon:"",
        createdAt:0,
        isDeleted:false,
        TableName:"",
        gradeLevel:"",
        name:"",
        roleType:"",
        password:"",
        fbPage:"",
        updatedAt:0,
        teacherName:"",
        doB:"",
        SK:"",
        testTaken:"",
        PK:"",
        testingAverage:"",
        userID: "",
        address:""
    },
});

//-------------------------------------------root class of response received when getting user api is hit-------------------------//
var UserDataResponse = cc.Class({
    name:"UserDataResponse",
    properties: {
        statusCode: "",
        message: "",
        data:Data
    },
//Deafault and Parametrized constructor
    ctor: function
        (
            _statusCode= "none",
            _message= "none",
            _data=null
        ) {
        this.statusCode = _statusCode;
        this.message = _message;
        this.data=_data;
    },
});

//-------------------------------------------class for sending payload to login user-------------------------------//
var UserLoginPayload = cc.Class({
    name:"UserLoginPayload",
    properties: {
        email: "",
        password:"",
        role: "",
    },
//Deafault and Parametrized constructor
    ctor: function
        (
            _email= 'none',
            _password="none",
            _role= "none"
        ) {
        this.email = _email;
        this.password = _password;
        this.role = _role;  
    },
});

module.exports= ServerBackend;
