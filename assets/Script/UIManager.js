import Tweeen from 'TweenManager';
var GamePlayReferenceManager=null;
var TweenRef;
var TotalRoom=[];
//-------------------------------------------class for Profile UI-------------------------//
var ProfileUI=cc.Class({
    name:"ProfileUI",
    properties: {   
        NameLabel: {
            displayName:"Name",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to name label of profile",},
         EmailAddressLabel: {
            displayName:"EmailAddress",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference for email address label of profile ", },
         DOBLabel: {
            displayName:"DOB",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to DOB label of profile",},
         GradeLevelLabel: {
            displayName:"GradeLevel",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to Grade Level label of profile",},
         TeacherNameLabel: {
            displayName:"TeacherName",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to Teacher Name label of profile",},
         GamesWonLabel: {
            displayName:"GamesWon",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to games won label of profile",},
         FBPageLabel: {
            displayName:"FBPage",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to facebook page label of profile",},
         TestTakenLabel: {
            displayName:"TestTaken",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to test taken label of profile",},
         TestingAvgLabel: {
            displayName:"TestingAverage",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to Testing Average label of profile",},
        CashLabel: {
            displayName:"Cash",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to cash label of profile",},
        StatusNode: {
            displayName:"StatusScreen",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "reference to Status Screen of profile",},
        PlayButtonNode: {
            displayName:"PlayButton",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "reference to play button of profile",},
        StatusLabel: {
            displayName:"StatusText",
            default: null,
            type: cc.Label,
            serializable: true,
            tooltip: "reference to Status label of profile",},
        PlayerCountInput: {
            displayName:"PlayerCountInput",
            default: null,
            type: cc.EditBox,
            serializable: true,
            tooltip: "reference to PlayerCountInput of profile",},
    },
});

//-------------------------------------------class for SpectateUI-------------------------//
var SpectateUI=cc.Class({
    name:"SpectateUI",
    properties: {   
        RoomScreenNode: {
            displayName:"RoomScreen",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "Reference to the node of room screen",},
        ScrollBarContent: {
            displayName:"ScrollBarContent",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "Reference to the node of ScrollBarContent of room screen",},
        ProfileScreenNode: {
            displayName:"ProfileScreen",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "Reference to the node of profile screen",},
        RoomPrefab: {
            displayName:"RoomPrefab",
            default: null,
            type: cc.Prefab,
            serializable: true,
            tooltip: "Reference to the prefab of Room on room screen",},
    },
});

//-------------------------------------------class for UIManager-------------------------//
var UIManager=cc.Class({
    name:"UIManager",
    extends: cc.Component,

    properties: { 
        UIProfile: {
            displayName:"UIProfile",
            default: null,
            type: ProfileUI,
            serializable: true,
            tooltip: "reference to ProfileUI class intance",},  
        ScreenNodes: {
            displayName:"ScreenNodes",
            default: [],
            type: [cc.Node],
            serializable: true,
            tooltip: "reference to login screen node",},
         TweenManagerRef: {
            displayName:"TweenManagerRef",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "reference for Tween Manager Script ", },
         Logo: {
            displayName:"LogoNode",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "reference for the logo node",},
         ToastNode: {
            displayName:"ToastNode",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "reference for the toast node",},
         LoadingNode: {
            displayName:"LoadingNode",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "reference for the Loading Node",},   
        ReferenceManagerRef: {
            displayName:"ReferenceManagerRef",
            default: null,
            type: cc.Node,
            serializable: true,
            tooltip: "reference for the reference manager node",},  
        UISpectate: {
            displayName:"UISpectate",
            default: null,
            type: SpectateUI,
            serializable: true,
            tooltip: "reference to SpectateUI class intance",},   
    },

    statics: { //creating static instance of the class
        Instance: null,
    },

    onEnable: function () {
        //events subscription to be called 
        cc.systemEvent.on('AssignProfileData', this.AssignProfileData, this);
        cc.systemEvent.on('UpdateStatusWindow', this.UpdateStatusWindow, this);
        cc.systemEvent.on('ChangePanelScreen', this.ChangePanelScreen, this);
      },
    
    onDisable: function () {
        cc.systemEvent.off('AssignProfileData', this.AssignProfileData, this);
        cc.systemEvent.off('UpdateStatusWindow', this.UpdateStatusWindow, this);
        cc.systemEvent.off('ChangePanelScreen', this.ChangePanelScreen, this);
      },

    onLoad () {
        this.ReferenceManagerRef=this.ReferenceManagerRef.getComponent("GamePlayReferenceManager");

        UIManager.Instance=this;
        TotalRoom=[];
        //Private Variables
        this.EmailText="";
        this.PasswordText="";
        this.nodeCounter=0;
        this.StatusText="";
        this.TotalPlayers="";
        this.ResetPlayerCountInput();

        this.GetTweenManagerReference();
        this.SlideInLoginComponents();
        this.RepeatLogoAnimation();
        this.CheckReferences();
    },

    CheckReferences()
     {
        if(!GamePlayReferenceManager || GamePlayReferenceManager==null)
            GamePlayReferenceManager=require('GamePlayReferenceManager');
     },

    start () {

    },

    ChangePanelScreen: function (isNext,changeScreen,sceneName) {
        TweenRef.FadeNodeInOut(this.ScreenNodes[this.nodeCounter],0.55,255,0,"quadInOut");

    if(changeScreen==false)
    {
        if(isNext==true)
        {
            if(this.nodeCounter<this.ScreenNodes.length)
                this.nodeCounter=this.nodeCounter+1;
        }else
        {
            if(this.nodeCounter>0)
                this.nodeCounter=this.nodeCounter-1;
        }
        setTimeout(() => {this.ManipulateNodes(this.nodeCounter);}, 600);
    }else
    {
        setTimeout(() => {cc.director.loadScene(sceneName);}, 600);
    }},

    ManipulateNodes: function (counter) {
        for (let index = 0; index < this.ScreenNodes.length; index++) {
            if(counter==index)
            {
                this.ScreenNodes[index].active=true;
                console.log("seting it true");
                TweenRef.FadeNodeInOut(this.ScreenNodes[index],1.5,0,255,"quadInOut"); 
            }
            else
            {
                this.ScreenNodes[index].active=false; 
            }         
        }
    },

    SlideInLoginComponents: function () {
        TweenRef.LoginScreenTween(this.ScreenNodes[this.nodeCounter].children[1],-1000);
    },

    RepeatLogoAnimation: function () {
        TweenRef.RepeatTweenScale(this.Logo,1.1,1,0.8);
    },

    GetTweenManagerReference: function () {
        TweenRef=this.TweenManagerRef.getComponent("TweenManager");
    },

    ResetPlayerCountInput()
    {
        this.UIProfile.PlayerCountInput.string="";
        this.TotalPlayers="";
    },

    OnplayerNumberChanged(_number)
    {
        this.TotalPlayers=_number;
    },

    PlayGame:function()
    {  
        if(this.TotalPlayers=="")
        {
            this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.",3500);
        }
        else
        {
            var _players=parseInt(this.TotalPlayers);
            if(_players>=2 && _players<=6)
            {
                GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleShowRoom_Bool(false);
                this.UIProfile.StatusNode.active=true;
                //this.UIProfile.PlayButtonNode.active=false;
                this.UIProfile.StatusLabel.string="";
                GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers=_players;
                
                if(GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isConnectedToMaster() || GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isInLobby())
                {
                    cc.systemEvent.emit("UpdateStatusWindow","waiting for other players...");
                    GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinRandomRoom();
                }
                else
                {
                    GamePlayReferenceManager.Instance.Get_MultiplayerController().RequestConnection();
                }
            }
            else
            {
                this.ResetPlayerCountInput();
                this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.",3500);
            }
        }
    },

    UpdateStatusWindow:function(msg)
    {  
        this.StatusText=this.StatusText+msg+"\n";
        this.UIProfile.StatusLabel.string=this.StatusText;
    },

    ExitConnecting:function()
    {  
        this.UIProfile.StatusNode.active=false;
        this.UIProfile.PlayButtonNode.active=true;
        this.UIProfile.StatusLabel.string="";
        this.EmailText="";
        this.PasswordText="";
        this.StatusText="";
        this.TotalPlayers="";
        this.ResetPlayerCountInput();
        GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    },

    ToggleLoadingNode(state)
    {
        this.LoadingNode.active=state;
    },

    LoginUser:function()
    {
        if(this.EmailText!="" && this.PasswordText!="")
        {
            this.ToggleLoadingNode(true);
            var anim = this.LoadingNode.children[0].children[1].getComponent(cc.Animation);
            anim.play('loading');
            GamePlayReferenceManager.Instance.Get_ServerBackend().LoginUser(this.EmailText,this.PasswordText,"Student");
        }
        else
        {
            this.ToggleLoadingNode(false);
            this.ShowToast("Email or password invalid or empty.");
        }
    },

    SetEmailText:function(text)
    {
        this.EmailText=text;
    },

    SetPasswordText:function(text)
    {
        this.PasswordText=text;
    },

    AssignProfileData:function()
    {
        if(parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType)==1) //means successful
        {
            this.ChangePanelScreen(true,false,"");

            console.log(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
            this.UIProfile.NameLabel.string=GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
            this.UIProfile.EmailAddressLabel.string=GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.emailAddress;
            this.UIProfile.DOBLabel.string=GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.dOB;
            this.UIProfile.GradeLevelLabel.string=GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gradeLevel;
            this.UIProfile.TeacherNameLabel.string=GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.teacherName;
            this.UIProfile.GamesWonLabel.string=GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gamesWon;
            this.UIProfile.FBPageLabel.string=GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.facebookPage;
            this.UIProfile.TestTakenLabel.string=GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.testsTaken;
            this.UIProfile.TestingAvgLabel.string=GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.testingAverage;
            this.UIProfile.CashLabel.string="$ "+GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash;

            this.ToggleLoadingNode(false);
        }
        else if(parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType)==2) //user not found
        {
            this.ToggleLoadingNode(false);
            this.ShowToast("no user registered with entered email.");
        }
        else if(parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType)==3) //pass/email invalid
        {
            this.ToggleLoadingNode(false);
            this.ShowToast("user email or password is wrong");
        }
        else if(parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType)==4) //something went wrong
        {
            this.ToggleLoadingNode(false);
            this.ShowToast("something went wrong please try again.");
        }
    },


    //#region Spectate Ui Work
    ToggleRoomScreen_SpectateUI(_state)
    {
        if(_state)
            this.UIProfile.StatusNode.active=false;

        this.UISpectate.RoomScreenNode.active=_state;
    },

    ToggleProfileScreen_SpectateUI(_state)
    {
        this.UISpectate.ProfileScreenNode.active=_state;
    },

    ShowAvailableRooms_SpectateUI()
    {
     
        if(GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isConnectedToMaster() || GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isInLobby())
        {
            this.ToggleProfileScreen_SpectateUI(false);
            this.ToggleRoomScreen_SpectateUI(true);
        }
        else
        {
            this.UIProfile.StatusNode.active=true;
            this.UIProfile.StatusLabel.string="";
            GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleShowRoom_Bool(true);
            GamePlayReferenceManager.Instance.Get_MultiplayerController().RequestConnection();
        }
    },

    UpdateRoomsList_SpectateUI(_name,_players)
    {
        var node = cc.instantiate(this.UISpectate.RoomPrefab);
        node.parent = this.UISpectate.ScrollBarContent;
        node.getComponent('RoomListHandler').SetRoomName(_name);
        node.getComponent('RoomListHandler').SetPlayerCount(_players);
        TotalRoom.push(node);
    },

    ResetRoomList()
    {
        for (let index = 0; index < TotalRoom.length; index++) {
            TotalRoom[index].destroy();
        }

        TotalRoom=[];
    },

    Exit_SpectateUI()
    {
        this.ToggleProfileScreen_SpectateUI(true);
        this.ToggleRoomScreen_SpectateUI(false);
        this.ExitConnecting();
    },
    //#endregion

    ShowToast:function(msg,_time=2000)
    {
        this.ToastNode.active=true;
        this.ToastNode.children[0].children[0].getComponent(cc.Label).string=msg;
        var SelfToast=this;
        setTimeout(function(){  SelfToast.ToastNode.active=false; }, _time);
    },
});

module.exports= UIManager;
