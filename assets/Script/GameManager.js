var _isTest = false;
var _diceinput1 = "";
var _diceinput2 = "";
var PreviousDiceRoll1 = -1;
var PreviousDiceRoll2 = -1;

var PreviousDiceRoll3 = -1;
var PreviousDiceRoll4 = -1;

var PreviousDiceRoll5 = -1;

var userGameOver = false;
var BotGameOver = false;
var TotalCounterReached = false;

//#region superclasses and enumerations
//-------------------------------------------enumeration for type of business-------------------------//
var EnumBusinessType = cc.Enum({
    None:0,
    HomeBased: 1,                   //a business that you operate out of your home
    brickAndmortar: 2               //a store front business
});

//-------------------------------------------class for BusinessInfo-------------------------//
var BusinessInfo = cc.Class({
    name: "BusinessInfo",
properties: { 
    Name: "BusinessData",
    BusinessType:
   {
       displayName:"Mode",
       type: EnumBusinessType,
       default: EnumBusinessType.None,
       serializable: true,
       tooltip:"Business catogory for players",}, 
    BusinessTypeDescription:
   {
       displayName: "Type",
       type: cc.Text,
       default: "",
       serializable: true,
       tooltip: "Type (by name) of business player is opening",},
    BusinessName:
   {
       displayName: "Name",
       type: cc.Text,
       default: "",
       serializable: true,
       tooltip: "Name of the business player is opening",},
     Amount:
       {
           displayName: "Amount",
           default: 0,
           type:cc.Integer,
           serializable: true,
           tooltip: "balance of business",},
      IsPartnership:
       {
           displayName: "IsPartnership",
           default: false,
           typw:cc.Boolean,
           serializable: true,
           tooltip: "Check if player has done partnership with someone with current business",},
       PartnerID:
           {
               displayName:"PartnerID",
               type: cc.Text,
               default: "",
               serializable: true,
        tooltip: "ID of the partner with whom player has formed partnership",},
       PartnerName:
           {
               displayName:"PartnerName",
               type: cc.Text,
               default: "",
               serializable: true,
               tooltip:"name of the partner with whom player has formed partnership",},
        LocationsName:
           {
               displayName:"LocationsName",
               type: [cc.Text],
               default: [],
               serializable: true,
               tooltip:"if player owns brick and mortar he/she can expand to new location",},
        LoanTaken:
           {
               displayName:"LoanTaken",
               type: cc.Boolean,
               default: false,
               serializable: true,},
        LoanAmount:
           {
               displayName:"LoanAmount",
               type: cc.Integer,
               default: 0,
               serializable: true,},

},

ctor: function () { //constructor
}
});
//-------------------------------------------class for CardData-------------------------//
var CardDataFunctionality = cc.Class({
    name: "CardDataFunctionality",
properties: { 
    NextTurnDoublePay:
   {
       displayName:"NextTurnDoublePay",
       type: cc.Boolean,
       default: false,
       serializable: true,
       tooltip:"keep track if its going to be double pay day on next payday for current player"}, 
    SkipNextTurn:
   {
       displayName:"SkipNextTurn",
       type: cc.Boolean,
       default: false,
       serializable: true,
       tooltip:"keep track if turn is going to skipped on next turn for current player"}, 
    SkipNextPayday:
   {
       displayName:"SkipNextPayday",
       type: cc.Boolean,
       default: false,
       serializable: true,
       tooltip:"keep track if payday is going to skipped on next payday for current player"}, 
    SkipHMNextPayday:
   {
       displayName:"SkipHMNextPayday",
       type: cc.Boolean,
       default: false,
       serializable: true,
       tooltip:"keep track if payday for home based buisiness is going to skipped on next payday for current player"},
    SkipBMNextPayday:
   {
       displayName:"SkipBMNextPayday",
       type: cc.Boolean,
       default: false,
       serializable: true,
       tooltip:"keep track if payday for bricka and mmortar buisiness is going to skipped on next payday for current player"}, 
},

ctor: function () { //constructor
}
});
//-------------------------------------------class for StockInfo-------------------------//
var StockInfo = cc.Class({
    name: "StockInfo",
properties: { 
    Name: "StockData",
    BusinessName:
   {
       displayName:"BusinessName",
       type: cc.Text,
       default: "",
       serializable: true,
       tooltip:"name of the business in which stocks will be held",}, 
    ShareAmount:
   {
       displayName: "ShareAmount",
       type: cc.Integer,
       default: 0,
       serializable: true,
       tooltip: "Share amount of the stock",},
},

ctor: function () { //constructor
}
});

//-------------------------------------------class for  Player Data-------------------------//
var PlayerData = cc.Class({
    name:"PlayerData",
properties: { 
    PlayerName:
   {
       displayName:"PlayerName",
       type: cc.Text,
       default: "",
       serializable: true,
       tooltip:"name of the player",},
    PlayerUID:
   {
       displayName:"PlayerUID",
       type: cc.Text,
       default: "",
       serializable: true,
       tooltip:"ID of the player",},
    AvatarID:
       {
           displayName: "AvatarID",
           default: 0,
           type:cc.Integer,
           serializable: true,
           tooltip: "id reference for player avatar selection",},
    IsBot:
       {
           displayName: "IsBot",
           default: false,
           typw:cc.Boolean,
           serializable: true,
           tooltip: "Check if current player is bot",}, 
    NoOfBusiness:
   {
       displayName:"Business",
       type: [BusinessInfo],
       default: [],
       serializable: true,
       tooltip:"Number of business a player can own",}, 
    CardFunctionality:
   {
       displayName:"CardFunctionality",
       type: CardDataFunctionality,
       default: null,
       serializable: true,
       tooltip:"card functionality stored by player",}, 
    HomeBasedAmount:
   {
       displayName:"HomeBasedAmount",
       type: cc.Integer,
       default: 0,
       serializable: true,
       tooltip:"number of home based business a player owns",}, 
    BrickAndMortarAmount:
   {
       displayName:"BrickAndMortarAmount",
       type: cc.Integer,
       default: 0,
       serializable: true,
       tooltip:"number of brick and mortar business a player owns",}, 
    TotalLocationsAmount:
   {
       displayName:"TotalLocationsAmount",
       type: cc.Integer,
       default: 0,
       serializable: true,
       tooltip:"number of locations of all brick and mortar businessess",}, 
    NoOfStocks:
   {
       displayName:"Stocks",
       type: [StockInfo],
       default: [],
       serializable: true,
       tooltip:"Number of stock a player owns",}, 
    Cash:
       {
           displayName: "PlayerCash",
           default: 0,
           type:cc.Integer,
           serializable: true,
           tooltip: "Amount of cash player owns",},
    GoldCount:
       {
           displayName: "GoldCount",
           default: 0,
           type:cc.Integer,
           serializable: true,
           tooltip: "count of gold a player owns",},
    StockCount:
       {
           displayName: "StockCount",
           default: 0,
           type:cc.Integer,
           serializable: true,
           tooltip: "count of stocks a player owns",},
    LoanTaken:
       {
           displayName: "LoanTaken",
           default: false,
           type:cc.Boolean,
           serializable: true,
           tooltip: "Check if player has taken loan from bank or not",},
     LoanAmount:
       {
           displayName: "LoanAmount",
           default: 0,
           type:cc.Integer,
           serializable: true,
           tooltip: "Amount of loan taken from the bank",},
    MarketingAmount:
       {
           displayName: "MarketingAmount",
           default: 0,
           type:cc.Integer,
           serializable: true,
           tooltip: "marketing amount a player owns",},
    LawyerStatus:
       {
           displayName: "LawyerStatus",
           default: false,
           type:cc.Boolean,
           serializable: true,
           tooltip: "Check if player has hired a lawyer or not",},
    IsBankrupt:
       {
           displayName: "IsBankrupt",
           default: false,
           type:cc.Boolean,
           serializable: true,
           tooltip: "Check if player has been Bankrupted or not",},
    BankruptAmount:
       {
           displayName: "BankruptAmount",
           default: 0,
           type:cc.Integer,
           serializable: true,
           tooltip: "keep track how much time player has been bankrupted",},
    SkippedLoanPayment:
       {
           displayName: "SkippedLoanPayment",
           default: false,
           type:cc.Boolean,
           serializable: true,
           tooltip: "Check if player has skipped loan payment",},
    PlayerRollCounter:
       {
           displayName: "PlayerRollCounter",
           default: 0,
           type:cc.Integer,
           serializable: true,
           tooltip: "integer to store roll countor for player",},
    InitialCounterAssigned:
       {
           displayName: "InitialCounterAssigned",
           default: false,
           type:cc.Boolean,
           serializable: true,},
     isGameFinished:
           {
               displayName:"isGameFinished",
               type: cc.Boolean,
               default: false,
               serializable: true,},
     TotalScore:
           {
               displayName:"TotalScore",
               type: cc.Integer,
               default: 0,
        serializable: true,
    },
    TotalHBCash:
           {
               displayName:"TotalHBCash",
               type: cc.Integer,
               default: 0,
        serializable: true,
    },
    TotalBMCash:
           {
               displayName:"TotalBMCash",
               type: cc.Integer,
               default: 0,
        serializable: true,
    },
    TotalGoldCash:
           {
               displayName:"TotalGoldCash",
               type: cc.Integer,
               default: 0,
        serializable: true,
    },
    TotalLoanBalance:
           {
               displayName:"TotalLoanBalance",
               type: cc.Integer,
               default: 0,
        serializable: true,
    },
    TotalStocksCash:
           {
               displayName:"TotalStocksCash",
               type: cc.Integer,
               default: 0,
               serializable: true,},
    GameOver:
           {
               displayName:"GameOver",
               type: cc.Boolean,
               default: false,
               serializable: true,},
},
ctor: function () { //constructor
}

});
//#endregion

//#region Game Manager Class
//-------------------------------------------(main class) class for Game Manager-------------------------//
var RollCounter=0;
var DiceTemp=0;
var DiceRoll=0;
var IsTweening=false;
var GamePlayReferenceManager=null;
var TurnCheckArray=[];
var BusinessLocationNodes=[];

var PassedPayDay=false;
var DoublePayDay=false;

//cards functionality
var _nextTurnDoublePay=false;
var _skipNextTurn=false;
var _skipNextPayday=false; //skip whole pay day
var _skipHMNextPayday=false; //skip pay day for home based businessess only
var _skipBMNextPayday=false; //skip pay day for brick & mortar businessess only
var CardEventReceived=false;
var TurnInProgress=false;

var Backspaces=3;
var isGameOver=false;
var OneQuestionIndex=-1;
var OneQuestions=
[
    "you have skipped loan previous payday?",
    "you have taken any loan?",
    "you have bankrupted ever?",
    "your next turn is going to be skipped?",
    "your next payday is going to be double payday?"
];

var CardDisplaySetTimout=null;

var GameManager=cc.Class({
    name:"GameManager",
    extends: cc.Component,
    properties: {
        PlayerGameInfo: {
            default: [],                
            type: [PlayerData],
            serializable: true,
            tooltip: "all player's data"},
        BotGameInfo: {
            default: [],                
            type: [PlayerData],
            serializable: true,
            tooltip: "all bot's data"},
        PlayerNode: {
            default:null,                
            type: cc.Node,
            serializable: true,
            tooltip:"Node reference for player",},    
        CameraNode: {
            default:null,                
            type: cc.Node,
            serializable: true,
            tooltip:"Node reference for camera",},    
        AllPlayerUI: {
            default:[],                
            type: [cc.Node],
            serializable: true,
            tooltip:"Node reference of ui of all players",},      
        AllPlayerNodes: {
            default:[],                
            type: [cc.Node],
            serializable: true,
            tooltip:"Node reference of node of all players inside gameplay",},   
        StartLocationNodes: {
            default:[],                
            type: [cc.Node],
            serializable: true,
            tooltip:"Node reference of attay of locations",},   
         SelectedMode: {
            default:0,                
            type: cc.Integer,
            serializable: true,
            tooltip: "integer reference for game mode 1 means bot and 2 means real players",
        },  
    },

    statics: {
        PlayerData: PlayerData,
        BusinessInfo:BusinessInfo,
        CardDataFunctionality:CardDataFunctionality,
        EnumBusinessType:EnumBusinessType,
        Instance:null
    },

    ResetAllVariables()
    {
        _diceinput1 = "";
        _diceinput2 = "";
        PreviousDiceRoll1 = -1;
        PreviousDiceRoll2 = -1;

        PreviousDiceRoll3 = -1;
        PreviousDiceRoll4 = -1;

        PreviousDiceRoll5 = -1;

        userGameOver = false;
        BotGameOver = false;

        RollCounter=0;
        DiceTemp=0;
        DiceRoll=0;
        IsTweening=false;
        GamePlayReferenceManager=null;
        TurnCheckArray=[];
        BusinessLocationNodes=[];

        PassedPayDay=false;
        DoublePayDay=false;

        //cards functionality
        _nextTurnDoublePay=false;
        _skipNextTurn=false;
        _skipNextPayday=false; //skip whole pay day
        _skipHMNextPayday=false; //skip pay day for home based businessess only
        _skipBMNextPayday=false; //skip pay day for brick & mortar businessess only
        CardEventReceived=false;
        TurnInProgress=false;

        Backspaces=3;
        isGameOver=false;
        OneQuestionIndex=-1;
        OneQuestions=
        [
            "you have skipped loan previous payday?",
            "you have taken any loan?",
            "you have bankrupted ever?",
            "your next turn is going to be skipped?",
            "your next payday is going to be double payday?"
        ];
                
        CardDisplaySetTimout=null;
        TotalCounterReached = false;

    },

    InputTestDice1(_val)
    {
        if (_isTest) {
            _diceinput1 = _val;
        }
    },

    InputTestDice2(_val)
    {
        if (_isTest) {
            _diceinput2 = _val;
        }
    },
    //#region All Functions of GameManager
    
    /**
    @summary called when instance of class is created
    @method onLoad
    @param {string} none
    @returns {boolean} no return
   **/ 
    onLoad() {
        this.ResetAllVariables();
        GameManager.Instance=this;
        this.TurnNumber=0;
        this.TurnCompleted=false;
        TurnCheckArray=[];
        this.CheckReferences();
        this.SelectedMode=GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();
        this.Init_GameManager();   
        
        this.RandomCardIndex=0;
        this.CardCounter=0;
        this.CardDisplayed=false;
        CardEventReceived=false;
    },

    /**
    @summary called to assign reference of required classes
    @method CheckReferences
    @param {string} none
    @returns {boolean} no return
   **/ 
    CheckReferences()
     {
        if(!GamePlayReferenceManager || GamePlayReferenceManager==null)
        GamePlayReferenceManager=require('GamePlayReferenceManager');
     },

    /**
    @summary initial gamemanager essetials
    @method Init_GameManager
    @param {string} none
    @returns {boolean} no return
   **/ 
    Init_GameManager () {
        this.Camera=this.CameraNode.getComponent(cc.Camera);
        this.isCameraZooming=false;
        this.PlayerGameInfo=[];
        RollCounter=0;
        DiceTemp=0;
        DiceRoll=0;  

        console.error(this.SelectedMode);
        if(this.SelectedMode==2) //game is being played by real players
        {
            //if joined player is spectate
            if(GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate()==true)
            {
                console.log("status of initial business setp: "+GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup"));
                //if inital setup has been done and game is under way
                if(GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup")==true)
                {
                    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
                    var AllData=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("PlayerGameInfo");
                    this.PlayerGameInfo=AllData;

                    console.log(this.PlayerGameInfo);

                    GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers=this.PlayerGameInfo.length;
                    //this.SyncDataToPlayerGameInfo(0);
                    this.SyncAllData_SpectateManager();
                    this.TurnNumber=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("TurnNumber");
                    this.UpdateGameUI(true,this.TurnNumber);            
                }
                else
                {
                    //this.EnablePlayerNodes();
                    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
                    GamePlayReferenceManager.Instance.Get_GameplayUIManager().InitialScreen_SpectateMode();
                }
            }
            else
            {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true,false,this.SelectedMode);
            }
        }else if(this.SelectedMode==1) //game is being played by bot along with one player
        {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true,false,this.SelectedMode);
        }
    },

    //#region public functions to get data (accessible from other classes)
    GetTurnNumber () {
        return this.TurnNumber;
    },

    GetMyIndex()
    {
        var myIndex = 0;
        var _actor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
        var _allActors = this.PlayerGameInfo;

        for (let index = 0; index < _allActors.length; index++) {
          if (_actor.PlayerUID == _allActors[index].PlayerUID)
          {
              myIndex = index;
              break;
          }
        }

        return myIndex;
    },
    //#endregion

    //#region SpectateMode Code

    SyncAllData_SpectateManager()
    {
        var AllData=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("PlayerGameInfo");
        console.error(AllData);
        this.PlayerGameInfo = AllData;
        this.SyncDataToPlayerGameInfo(0);
        GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers=this.PlayerGameInfo.length;
        this.AssignPlayerGameUI();
        this.EnablePlayerNodes();
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().CloseInitialScreen_SpectateMode();


        for (let index = 0; index < this.PlayerGameInfo.length; index++) {
            if (this.PlayerGameInfo[index].PlayerRollCounter > 0 && this.PlayerGameInfo[index].InitialCounterAssigned==true && !this.PlayerGameInfo[index].isGameFinished) {
                var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.y);
                this.AllPlayerNodes[index].setPosition(_toPos.x, _toPos.y);
            }

            if (this.PlayerGameInfo[index].isGameFinished)
            {
                var _lastIndex = GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length - 1;
                var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[_lastIndex].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[_lastIndex].ReferenceLocation.position.y);
                this.AllPlayerNodes[index].setPosition(_toPos.x, _toPos.y);
            }
        }

        console.log("synced playernodes");

        for (let index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
            this.AllPlayerNodes[index].active=true;
        }
    },

    CheckTurnOnSpectateLeave_SpectateManager()
    {
      var TotalConnectedPlayers=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorCount();
      if(TurnCheckArray.length==TotalConnectedPlayers)
      {
        TurnCheckArray=[];
        this.TurnCompleted=true;

        if(this.PlayerGameInfo[this.TurnNumber].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
        {
            this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=RollCounter;
            GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
            this.ChangeTurn();
            console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
            console.log("Change Turn is called by: "+this.PlayerGameInfo[this.TurnNumber].PlayerName);
        }
      }

    },

    //#endregion


    //#region functions related to Turn Mechanism and card mechanism

   /**
    @summary raised event on all connected clients to let others know a what card has been selected by player
    @method RaiseEventForCard
    @param {string} none
    @returns {boolean} no return
   **/ 
  RaiseEventForCard(_data)
  {
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(5,_data);
  },

  ClearDisplayTimeout()
  {
    clearTimeout(CardDisplaySetTimout);
  },

  DisplayCardOnOthers()
  {
      if(this.SelectedMode==2) //for real players
      {
        console.error(CardEventReceived);
        if(CardEventReceived==true)
        {
            clearTimeout(CardDisplaySetTimout);
            console.error(this.CardCounter);
            CardEventReceived=false;
            if(!this.CardDisplayed)
            {
                this.CardDisplayed=true;
                GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.CardCounter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false,this.RandomCardIndex);
            }
        }
        else
        {
            CardDisplaySetTimout=setTimeout(() => { //check after every 0.5 seconds
                this.DisplayCardOnOthers();
            }, 500);
        }
      }
  },

  ResetCardDisplay()
  {
    this.CardDisplayed=false;
  },

  ReceiveEventForCard(_data)
  {

    this.CheckReferences();
    console.log(_data);

    var RandomCard=_data.randomCard;
    var counter=_data.counter;

    this.RandomCardIndex=RandomCard;
    this.CardCounter=counter;

   
    console.error(CardEventReceived);

    if(this.SelectedMode==2)
    {
        if(this.PlayerGameInfo[this.TurnNumber].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
            GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(true,RandomCard);
        else
            CardEventReceived=true;
    }else if(this.SelectedMode==1)
    {
        if(this.PlayerGameInfo[this.TurnNumber].IsBot==false)
            GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(true,RandomCard);
        else
            GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false,RandomCard,true);
    }

    console.error(CardEventReceived);

    
  },

   /**
    @summary raised event on all connected clients to let others know a particular player has complete their move
    @method RaiseEventTurnComplete
    @param {string} none
    @returns {boolean} no return
   **/ 
  RaiseEventTurnComplete()
  {
      if(this.SelectedMode==2)
      {
        if(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate==false)
        {
            GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(4,GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID);
        }
      }else if(this.SelectedMode==1)
      {
          console.error("reaised for turn complete");
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(4,this.PlayerGameInfo[this.TurnNumber].PlayerUID);
      }
  },


  SyncAllData()
  {
    if(this.PlayerGameInfo[this.TurnNumber].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
    {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
    }  
},

  /**
    @summary called on all players to validate if move is completed on all connected clients
    @method ReceiveEventTurnComplete
    @param {string} none
    @returns {boolean} no return
   **/ 
  ReceiveEventTurnComplete(_uid)
  {
      if(this.SelectedMode==2)//real players
      {
        if(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate==false)
        {
            console.log(TurnCheckArray.length);

            if(TurnCheckArray.length==0)
                    TurnCheckArray.push(_uid); 

            var ArrayLength=TurnCheckArray.length;
            var IDFound=false;
            for (let index = 0; index < ArrayLength; index++) {
                    if(TurnCheckArray[index]==_uid)
                    IDFound=true;
            }

            if(!IDFound)
            {
                TurnCheckArray.push(_uid);
            }
            console.log(TurnCheckArray);
            console.log(TurnCheckArray.length);

            // var TotalConnectedPlayers=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorCount();
            var TotalConnectedPlayers=this.PlayerGameInfo.length;
            if(TurnCheckArray.length==TotalConnectedPlayers)
            {
                TurnCheckArray=[];
                this.TurnCompleted=true;

                if(this.PlayerGameInfo[this.TurnNumber].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
                {
                    this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=RollCounter;
                    //this.SyncAllData();
                    this.ChangeTurn();
                    console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
                    console.log("Change Turn is called by: "+this.PlayerGameInfo[this.TurnNumber].PlayerName);
                }
            }
        }
        }else if(this.SelectedMode==1)
        {
            this.TurnCompleted=true;
            this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=RollCounter;
            this.ChangeTurn();
        }
  },

   /**
    @summary called when dice animation is played on all players
    @method ChangeTurn
    @param {string} none
    @returns {boolean} no return
   **/ 
    ChangeTurn()
    {
        if(this.SelectedMode==2)
        {
            this.SyncAllData();
        }

        if(this.TurnNumber<this.PlayerGameInfo.length-1)
            this.TurnNumber=this.TurnNumber+1;
        else
            this.TurnNumber=0;

        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(2,this.TurnNumber);
    },

    UpdateVisualData()
    {
        for (let index = 0; index < this.AllPlayerUI.length; index++) {
            this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
        }
    },

    /**
    @summary called from raise on event (from function "StartTurn" and "ChangeTurn" of this same class) to handle turn
    @method TurnHandler
    @param {string} none
    @returns {boolean} no return
   **/ 
    TurnHandler(_turn)
    {
        this.UpdateVisualData();
        console.error("Turn: "+_turn);
        var _playerMatched=false;
        _skipNextTurn=false;
        if(IsTweening) //check if animation of turn being played on other players 
        {
            if(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate==true)
            {
                IsTweening = false;
            }
                
            console.log("here");
            setTimeout(() => {
                this.TurnHandler(_turn);
            }, 800);
        }
        else
        {
            this.TurnNumber=_turn;
            if(this.SelectedMode==2)
            {
                if(this.PlayerGameInfo[this.TurnNumber].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
                {    
                    _playerMatched=true;
                    _skipNextTurn=this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;
                    if (!this.PlayerGameInfo[this.TurnNumber].isGameFinished) {
                        this.ToggleTurnProgress(true);
                        if (!_skipNextTurn) {
                            setTimeout(() => {
                                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
                                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
                            }, 1000);
                            console.log("its your turn " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
                        }
                    }
                }
                else
                {
                    this.ToggleTurnProgress(false);
                }
                    
            }else if(this.SelectedMode==1)
            {
                console.log(this.PlayerGameInfo[this.TurnNumber].IsBot);
                console.log(this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn);
                console.log(userGameOver);
                if(this.PlayerGameInfo[this.TurnNumber].IsBot==false)
                {
                    _playerMatched = true;
                    _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;
                    if (!userGameOver) {
                        this.ToggleTurnProgress(true);
                        if (!_skipNextTurn) {
                            setTimeout(() => {
                                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
                                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
                            }, 1000);
                            console.log("its your turn " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
                        }
                    }
                }
                else//turn decisions for bot
                {
                    _playerMatched = true;
                    _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;
                    if (!BotGameOver) {
                        this.ToggleTurnProgress(false);
                        if (!_skipNextTurn) {
                            setTimeout(() => {
                                this.RollDice();
                            }, 1000);
                        }
                    }
                }
            }

            this.UpdateGameUI(true,this.TurnNumber);

            for (let index = 0; index < this.AllPlayerUI.length; index++) {
                this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.active=false;
                this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
            }


            if(this.SelectedMode==2)//for real players
            {
                GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber",this.TurnNumber,true);
                console.log("Turn Of: "+this.PlayerGameInfo[this.TurnNumber].PlayerName);
                console.log(this.AllPlayerUI[this.TurnNumber].getComponent('PlayerProfileManager').PlayerInfo);
                console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
                console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors());
                this.SyncDataToPlayerGameInfo(0);


                //force sync spectator after completion of each turn
                if(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate==true)
                    this.SyncAllData_SpectateManager();
            }

            //skip this turn as skip turn has been called before
            if(_playerMatched && _skipNextTurn)
            {
                IsTweening=false;
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping current turn",1200);
                this.ToggleSkipNextTurn(false);
                this.ChangeTurn();
                this.ToggleTurnProgress(false);
            }

            if(_playerMatched && this.PlayerGameInfo[this.TurnNumber].isGameFinished)
            {
                setTimeout(() => {
                    IsTweening=false;
                    this.ChangeTurn();
                    this.ToggleTurnProgress(false);   
                }, 500);
               
            }

        }
    },

    SyncDataToPlayerGameInfo(_ind)
    {
        var MainSessionData=GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
        var MyData=GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
        var _counter=_ind;
        console.log(this.PlayerGameInfo[_counter].PlayerUID);
        console.log(MyData.customProperties.PlayerSessionData.PlayerUID);
        //if(this.PlayerGameInfo[_counter].PlayerUID!=MyData.customProperties.PlayerSessionData.PlayerUID) //dont update my own data
       // {
            for (let index = 0; index < MainSessionData.length; index++) {
                    if(this.PlayerGameInfo[_counter].PlayerUID==MainSessionData[index].customProperties.PlayerSessionData.PlayerUID)
                    {
                        this.PlayerGameInfo[_counter]=MainSessionData[index].customProperties.PlayerSessionData;
                        
                        if(_counter<this.PlayerGameInfo.length-1)
                        {
                            _counter++;
                            console.log("adding counter: "+_counter);
                            this.SyncDataToPlayerGameInfo(_counter);
                        }
                        else{
                            console.log(this.PlayerGameInfo);
                        }
                    }
                }
        //}
       // else
            // {
            //     if(_counter<this.PlayerGameInfo.length-1)
            //         {
            //             _counter++;
            //             console.log("adding counter: "+_counter);
            //             this.SyncDataToPlayerGameInfo(_counter);
            //         }
            //     else{
            //             console.log(this.PlayerGameInfo);
            //         }
            // }
    },  

    /**
    @summary called when all players have done their initial setup and first turn starts
    @method StartTurn
    @param {string} none
    @returns {boolean} no return
   **/ 
    StartTurn()
    {
        console.log(this.PlayerGameInfo);
        this.AssignPlayerGameUI();
        this.EnablePlayerNodes();
        this.TurnNumber=0; //reseting the turn number on start of the game

        //sending initial turn number over the network to start turn simultanously on all connected player's devices
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(2,this.TurnNumber);
        
      
        
    },

    ReceiveBankruptData(_data)
    {
        //other player has been bankrupted
        var _isBankrupted=_data.Data.bankrupted;
        var _turn=_data.Data.turn;
        var _playerData=_data.Data.PlayerDataMain;

        console.log(_data);
        // console.log(_isBankrupted);
        // console.log(_turn);
        // console.log(_playerData);

        this.PlayerGameInfo[_turn]=_playerData;

        this.AssignPlayerGameUI(true);
        this.EnablePlayerNodes(true);

        this.UpdateGameUI(true,this.TurnNumber);

        for (let index = 0; index < this.AllPlayerUI.length; index++) {
            this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.active = false;
            this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
        }
        
        if(this.SelectedMode==2)//for real players
        {
            GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber",this.TurnNumber,true);
            this.SyncDataToPlayerGameInfo(0);

            //force sync spectator after completion of each turn
            if(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate==true)
                this.SyncAllData_SpectateManager();
        }
    },

    StartTurnAfterBankrupt()
    {
        this.AssignPlayerGameUI(true);
        this.EnablePlayerNodes(true);
        setTimeout(() => {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
        }, 1000);

        this.UpdateGameUI(true,this.TurnNumber);

        for (let index = 0; index < this.AllPlayerUI.length; index++) {
            this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.active = false;
            this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
        }
        
        if(this.SelectedMode==2)//for real players
        {
            GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber",this.TurnNumber,true);
            this.SyncDataToPlayerGameInfo(0);

            //force sync spectator after completion of each turn
            if(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate==true)
                this.SyncAllData_SpectateManager();
        }
    },
    //#endregion


    //#region Function for gameplay
     /**
    @summary called to assign player UI (name/icons/number of players that to be active etc)
    @method AssignPlayerGameUI
    @param {string} none
    @returns {boolean} no return
   **/ 
    AssignPlayerGameUI(_isBankrupted=false)
    {
        if(this.SelectedMode==1) //for bot
        {
            if(!_isBankrupted)
            {
                var _randomIndex=this.getRandom(0,this.BotGameInfo.length)
                this.PlayerGameInfo.push(this.BotGameInfo[_randomIndex]);
                GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers=2;
            }
        }

        for (let index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
            this.AllPlayerUI[index].active=true;
            this.AllPlayerUI[index].getComponent('PlayerProfileManager').PlayerInfo=this.PlayerGameInfo[index];
            this.AllPlayerUI[index].getComponent('PlayerProfileManager').SetName(this.PlayerGameInfo[index].PlayerName);
            this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
        }
    },

    UpdateGameUI(_toggleHighlight,_index)
    {
        if(_toggleHighlight)
        {
            this.AllPlayerUI[_index].getComponent('PlayerProfileManager').PlayerInfo=this.PlayerGameInfo[_index];

            for (let index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
                if(_index==index)
                {
                    this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleBGHighlighter(true);
                    this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleTextighlighter(true);
                    this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
                }
                else
                {
                    this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
                    this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleBGHighlighter(false);
                    this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleTextighlighter(false);
                }
            }
        }
    },

     /**
    @summary called to enbale respective players nodes inside gamaplay
    @method EnablePlayerNodes
    @param {string} none
    @returns {boolean} no return
   **/ 
    EnablePlayerNodes(_isBankrupted=false)
    {
        if(!_isBankrupted)
        {
            for (let index = 0; index < this.PlayerGameInfo.length; index++) {
                if(this.PlayerGameInfo[index].HomeBasedAmount==1 && !this.PlayerGameInfo[index].InitialCounterAssigned)   
                    this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[0].position.x,this.StartLocationNodes[0].position.y);
                else if(this.PlayerGameInfo[index].BrickAndMortarAmount==1 && !this.PlayerGameInfo[index].InitialCounterAssigned)   
                    this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[1].position.x,this.StartLocationNodes[1].position.y);
            }
        }else
        {
            if(this.PlayerGameInfo[this.TurnNumber].HomeBasedAmount==1)   
                this.AllPlayerNodes[this.TurnNumber].setPosition(this.StartLocationNodes[0].position.x,this.StartLocationNodes[0].position.y);
            else if(this.PlayerGameInfo[this.TurnNumber].BrickAndMortarAmount==1)   
                this.AllPlayerNodes[this.TurnNumber].setPosition(this.StartLocationNodes[1].position.x,this.StartLocationNodes[1].position.y);
        }

        for (let index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
            this.AllPlayerNodes[index].active=true;
        }
    },

    SetFollowCameraProperties()
    {
        let targetPos=this.AllPlayerNodes[this.TurnNumber].convertToWorldSpaceAR(cc.Vec2(0,120));
        this.CameraNode.position=this.CameraNode.parent.convertToNodeSpaceAR(targetPos);
   
        let ratio=targetPos.y/cc.winSize.height;
        this.Camera.zoomRatio=2;
    },

    lateUpdate () {
        if(this.isCameraZooming)    
            this.SetFollowCameraProperties();
    },

    syncDiceRoll(_roll)
    {
        var _dice1=_roll.dice1;
        var _dice2=_roll.dice2;
        var _result=_dice1+_dice2;

        IsTweening=true;
        this.CardDisplayed=false;

        if(this.SelectedMode==2)//for real players
        {
            for (let index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray().length; index++) {
                if(GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.Data.userID==this.PlayerGameInfo[this.TurnNumber].PlayerUID)
                {
                    console.log("player matched:"+this.PlayerGameInfo[this.TurnNumber].PlayerName);
                    this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.PlayerSessionData.PlayerRollCounter;
                } 
            }
        }

        if(this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter==0 && !this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned)
        {
            if(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[0].BusinessType==2)
            {
                RollCounter=0;
                this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned=true;
                console.error(RollCounter);
            }
            else
            {
                this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned=true;
                RollCounter=13;
                console.error(RollCounter);
            }
        }
        else
        {
            if(this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter==12)
                this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter+21;  
            else
                this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter+1;

            RollCounter=this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter;
            console.error(RollCounter-1);
        }
        

        DiceRoll=_result;
        DiceTemp=0;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(DiceRoll);

        for (let index = 0; index < this.AllPlayerUI.length; index++) {
            if(this.TurnNumber==index)
            {
                this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.active=true;
                this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.getComponent("DiceController").AnimateDice(_dice1, _dice2);
                this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
            }
            else
            {
                this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.active = false;
                this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
            }  
        }

        // let targetPos=this.AllPlayerNodes[this.TurnNumber].convertToWorldSpaceAR(cc.Vec2(0,120));
        // var _pos=this.CameraNode.parent.convertToNodeSpaceAR(targetPos);
        // this.TweenCamera(_pos,true,0.4);   
    },

    DiceFuntionality()
    {
        let targetPos=this.AllPlayerNodes[this.TurnNumber].convertToWorldSpaceAR(cc.Vec2(0,120));
        var _pos=this.CameraNode.parent.convertToNodeSpaceAR(targetPos);
        this.TweenCamera(_pos,true,0.4);  
    },

    TempCheckSpace(_rolling)
    {
        var tempcounter=0;
        var tempcounter2=0;
        for (let index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray().length; index++) {
            if(GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.Data.userID==this.PlayerGameInfo[this.TurnNumber].PlayerUID)
            {
                //console.log("player matched:"+this.PlayerGameInfo[this.TurnNumber].PlayerName);
                tempcounter2=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.PlayerSessionData.PlayerRollCounter;
            } 
        }

      if(tempcounter2-1<0)
      {
        console.error("starting from oblivion");
        tempcounter=tempcounter2+_rolling-1;
        var dicetobe=parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);
        console.error("to be: "+dicetobe);
      }
      else
      {
        tempcounter=tempcounter2+_rolling;
        var dicetobe=parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);
        console.error("to be: "+dicetobe);
      }

    },

    RollDice:function()
    {
        if (!isGameOver) {
            var Dice1;
            var Dice2;
            if (_isTest && this.PlayerGameInfo[this.TurnNumber].IsBot == false) {
                Dice1 = parseInt(_diceinput1);
                Dice2 = parseInt(_diceinput2);
            }
            else if (this.PlayerGameInfo[this.TurnNumber].IsBot == true && _isTest) {
                Dice1 = 10;
                Dice2 = 10;
            }
            else {
                Dice1 = this.getRandom(1, 7);
                Dice2 = this.getRandom(1, 7);
            
                if (PreviousDiceRoll1 == Dice1)
                    Dice1 = this.getRandom(1, 7);

                if (PreviousDiceRoll2 == Dice2)
                    Dice2 = this.getRandom(1, 7);
                
                PreviousDiceRoll1 = Dice1;
                PreviousDiceRoll2 = Dice2;
            }
         

            // var Dice1=20;
            // var Dice2=1;

            DiceRoll = Dice1 + Dice2;
            var _newRoll = { dice1: Dice1, dice2: Dice2 }
            //DiceRoll=23;
            //this.TempCheckSpace(DiceRoll);
            console.log("dice number: " + DiceRoll + ", Dice1:" + Dice1 + ", Dice2:" + Dice2);

            GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(3, _newRoll);
        }
    },

    RollOneDice()
    {
        var Dice1 = this.getRandom(1, 7);
        
        if (PreviousDiceRoll5 == Dice1)
            Dice1=this.getRandom(1,7);   
                
            PreviousDiceRoll5 = Dice1;

        return Dice1;
    },

    RollTwoDices()
    {
        var Dice1=this.getRandom(1,7);
        var Dice2 = this.getRandom(1, 7);
        
        if (PreviousDiceRoll3 == Dice1)
            Dice1=this.getRandom(1,7);   

        if (PreviousDiceRoll4 == Dice2)
            Dice2 = this.getRandom(1, 7);   
                
            PreviousDiceRoll3 = Dice1;
            PreviousDiceRoll4 = Dice2;

        return (Dice1+Dice2);
    },

    callUponCard()
    {
        if (!isGameOver) {
            if (RollCounter < GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
                var _spaceID = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);
                this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter;
                if (_spaceID != 6 && _spaceID != 7) //6 means payday and 7 means double payday, 9 menas sell space
                {
                    var RandomCard = this.getRandom(0, 15);
            
                    //for testing only
                    if (_spaceID == 2) //landed on some big business
                    {
                        // var valueIndex=[0,1,7,10,2,3,4,5,6,8];
                        // var index=this.getRandom(0,10);
                        // RandomCard=valueIndex[index];
                        RandomCard = 1;
                    } else if (_spaceID == 5) //landed on some losses cards
                    {
                        var valueIndex = [0, 1, 5, 6, 2, 7, 3, 4, 8, 9];
                        var index = this.getRandom(0, 10);
                        RandomCard = valueIndex[index];
                        //RandomCard = 9;
                    }
                    else if (_spaceID == 3) //landed on some marketing cards
                    {
                        var valueIndex = [0, 7, 3, 8, 13, 9, 1, 2, 4, 5];
                        var index = this.getRandom(0, 10);
                        RandomCard = valueIndex[index];
                        //RandomCard = 5;
                    }

                    else if (_spaceID == 1) //landed on some wild cards
                    {
                        var valueIndex = [0, 1, 6, 10, 2, 3, 4];
                        var index = this.getRandom(0, 7);
                        RandomCard = valueIndex[index];
                        //RandomCard = 4;
                    }
            

                    IsTweening = false;
                    console.error(_spaceID);

                    if (this.SelectedMode == 2) //for real player
                    {
                        if (_spaceID==12) // if player landed on finish space
                        {
                            RollCounter = RollCounter + 5;
                            this.StartDiceRoll();
                        }
                        else
                            {
                            if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
                                var SendingData = { "randomCard": RandomCard, "counter": RollCounter };
                                this.RaiseEventForCard(SendingData);
                            }
                            else {
                                this.DisplayCardOnOthers();
                            }
                        }
                    } else if (this.SelectedMode == 1) //for bot
                    {
                        if (_spaceID==12) // if player landed on finish space
                        {
                            RollCounter = RollCounter + 5;
                            this.StartDiceRoll();
                        }
                        else
                        {
                            var SendingData = { "randomCard": RandomCard, "counter": RollCounter };
                            this.RaiseEventForCard(SendingData);
                        }
                    }
                }
                else {
                    IsTweening = false;
                    console.log("landed on pay day or double pay day and work is done so changing turn");
                    this.RaiseEventTurnComplete();
                }
            }
            else {
                if (this.SelectedMode == 1) {
                    if (!isGameOver) {
                        if (this.PlayerGameInfo[this.TurnNumber].isBot && BotGameOver)
                            this.completeCardTurn();
                
                        if (!this.PlayerGameInfo[this.TurnNumber].isBot && userGameOver)
                            this.completeCardTurn();
                    }
                }
                else if (this.SelectedMode == 2) {
                    if (!isGameOver) {
                        if (this.PlayerGameInfo[this.TurnNumber].isGameFinished)
                            this.completeCardTurn();
                    }
                }
            }
        }
        else
        {
            this.AllPlayersGameCompleted();
        }
    },

    completeCardTurn()
    {
        IsTweening=false;
        console.log("landed on pay day or double pay day and work is done so changing turn");
        this.RaiseEventTurnComplete();
    },

    CallGameComplete(_isBot=false)
    {
        if(_isBot==false)
        {
            if(this.PlayerGameInfo[this.TurnNumber].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
            {
                var _playerIndex=this.TurnNumber;
                if(this.PlayerGameInfo[_playerIndex].isGameFinished==false)
                {
                    this.PlayerGameInfo[_playerIndex].isGameFinished=true;

                    var _cash=this.PlayerGameInfo[this.TurnNumber].Cash;
                    var HMAmount=GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;
                    var BMAmount=GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
                    var BMLocations=GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

                    var loanAmount=0;
                    for (let index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
                        if(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken)
                        {
                            loanAmount+=GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount;
                        } 
                    }

                    var _gold = this.PlayerGameInfo[_playerIndex].GoldCount;
                    var _stocks = this.PlayerGameInfo[_playerIndex].StockCount;

                    var _diceRandom = this.RollTwoDices();
                    var OnceOrShare = _diceRandom * 1000;

                    var GoldCash = OnceOrShare * _gold;
                    var StockCash = OnceOrShare * _stocks;


                    var BMCash=(BMAmount+BMLocations)*150000;

                    var HMCash=0;
                    if(HMAmount==1)
                        HMCash=60000;
                    else if(HMAmount==2)
                        HMCash=25000+60000;
                    else if(HMAmount==3)
                        HMCash=25000+25000+60000;

                    var TotalAssets=_cash+BMCash+HMCash+GoldCash+StockCash-loanAmount;

                    this.PlayerGameInfo[_playerIndex].TotalScore = TotalAssets;
                    this.PlayerGameInfo[_playerIndex].TotalHBCash = HMCash;
                    this.PlayerGameInfo[_playerIndex].TotalBMCash = BMCash;
                    this.PlayerGameInfo[_playerIndex].TotalGoldCash = GoldCash;
                    this.PlayerGameInfo[_playerIndex].TotalStocksCash = StockCash;
                    this.PlayerGameInfo[_playerIndex].TotalLoanBalance = loanAmount;
                    GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
                    
                }
            }
        }
        else
        {
            var _playerIndex=this.TurnNumber;
            if(this.PlayerGameInfo[_playerIndex].isGameFinished==false)
            {
                this.PlayerGameInfo[_playerIndex].isGameFinished=true;

                var _cash=this.PlayerGameInfo[this.TurnNumber].Cash;
                var HMAmount=this.PlayerGameInfo[_playerIndex].HomeBasedAmount;
                var BMAmount=this.PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
                var BMLocations=this.PlayerGameInfo[_playerIndex].TotalLocationsAmount;

                var loanAmount=0;
                for (let index = 0; index < this.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
                    if(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken)
                    {
                        loanAmount+=GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount;
                    } 
                }

                    var _gold = this.PlayerGameInfo[_playerIndex].GoldCount;
                    var _stocks = this.PlayerGameInfo[_playerIndex].StockCount;

                    var _diceRandom = this.RollTwoDices();
                    var OnceOrShare = _diceRandom * 1000;

                    var GoldCash = OnceOrShare * _gold;
                    var StockCash = OnceOrShare * _stocks;


                    var BMCash=(BMAmount+BMLocations)*150000;

                    var HMCash=0;
                    if(HMAmount==1)
                        HMCash=60000;
                    else if(HMAmount==2)
                        HMCash=25000+60000;
                    else if(HMAmount==3)
                        HMCash=25000+25000+60000;

                    var TotalAssets=_cash+BMCash+HMCash+GoldCash+StockCash-loanAmount;
                
                    this.PlayerGameInfo[_playerIndex].TotalScore = TotalAssets;
                    this.PlayerGameInfo[_playerIndex].TotalHBCash = HMCash;
                    this.PlayerGameInfo[_playerIndex].TotalBMCash = BMCash;
                    this.PlayerGameInfo[_playerIndex].TotalGoldCash = GoldCash;
                    this.PlayerGameInfo[_playerIndex].TotalStocksCash = StockCash;
                    this.PlayerGameInfo[_playerIndex].TotalLoanBalance = loanAmount;
                }
        }
    },

   RaiseEventForGameComplete(_data)
   {
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(6,_data);
   },

   SyncGameOver(_UID)
   {
       var infoText = "";
       var statusText = "";
    if(this.SelectedMode==2)//for real players
    {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectData();
        isGameOver = true;
        var MainSessionData=GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
        var MyData=GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
        console.log(_UID);
        console.log(MyData.customProperties.PlayerSessionData.PlayerUID);
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData.GameOver=true;

        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) {
            
            var _index = -1;
            for (let index = 0; index < MainSessionData.length; index++) {
                if (MainSessionData[index].customProperties.PlayerSessionData.PlayerUID == _UID)
                {
                    _index = index;
                    break;
                }
            }
            
            statusText = "Game won by "+MainSessionData[_index].customProperties.PlayerSessionData.PlayerName; 
            infoText =
                "Current Cash : $" + MainSessionData[_index].customProperties.PlayerSessionData.Cash + "\n" +
                "Home Based Businesses Value : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalHBCash + "\n" +
                "Brick And Mortar Businesses Value : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalBMCash + "\n" +
                "Gold Value : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalGoldCash + "\n" +
                "Stocks Value : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalStocksCash + "\n" +
                "Loan Balance : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalLoanBalance + "\n" +
                "Total Cash Earned : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalScore + "\n";
            
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);

            // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            //     "Highest Cash: " + MainSessionData[_index].customProperties.PlayerSessionData.TotalScore + "\n" + '\n' +
            //     "Game won by "+  MainSessionData[_index].customProperties.PlayerSessionData.PlayerName+ "\n" + '\n' + "\n" +
            //     "Game will be restarted automatcally after 15 seconds",
            //     15000, false
            // );

            // setTimeout(() => {
            //     GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
            // }, 15060);
        }
        else {
            if (MyData.customProperties.PlayerSessionData.PlayerUID == _UID) {
                
                //you won
                statusText = "Congrats! you have won the game."; 
                infoText =
                    "Current Cash : $" + MyData.customProperties.PlayerSessionData.Cash + "\n" +
                    "Home Based Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalHBCash + "\n" +
                    "Brick And Mortar Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalBMCash + "\n" +
                    "Gold Value : $" + MyData.customProperties.PlayerSessionData.TotalGoldCash + "\n" +
                    "Stocks Value : $" + MyData.customProperties.PlayerSessionData.TotalStocksCash + "\n" +
                    "Loan Balance : $" + MyData.customProperties.PlayerSessionData.TotalLoanBalance + "\n" +
                    "Total Cash Earned : $" + MyData.customProperties.PlayerSessionData.TotalScore + "\n";
                
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);
                // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
                //     "Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' +
                //     "Congrats! your cash is highest, you have won the game." + "\n" + '\n' + "\n" +
                //     "Game will be restarted automatcally after 15 seconds",
                //     15000, false
                // );
            }
            else {

                //you lose
                statusText = "Unfortunately! you have lost the game."; 
                infoText =
                    "Current Cash : $" + MyData.customProperties.PlayerSessionData.Cash + "\n" +
                    "Home Based Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalHBCash + "\n" +
                    "Brick And Mortar Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalBMCash + "\n" +
                    "Gold Value : $" + MyData.customProperties.PlayerSessionData.TotalGoldCash + "\n" +
                    "Stocks Value : $" + MyData.customProperties.PlayerSessionData.TotalStocksCash + "\n" +
                    "Loan Balance : $" + MyData.customProperties.PlayerSessionData.TotalLoanBalance + "\n" +
                    "Total Cash Earned : $" + MyData.customProperties.PlayerSessionData.TotalScore + "\n";

                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);

                // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
                //     "Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' +
                //     "unfortunately you have lost the game." + "\n" + '\n' + "\n" +
                //     "Game will be restarted automatcally after 15 seconds",
                //     15000, false
                // );
            }

            // setTimeout(() => {
            //     GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
            // }, 15060);
        }
    }
    else if(this.SelectedMode==1)//with bot
    {
        isGameOver = true;
        var MainSessionData=this.PlayerGameInfo;
        var MyData=this.PlayerGameInfo[0];
        console.log(_UID);
        console.log(MyData.PlayerUID);
        this.PlayerGameInfo[0].GameOver=true;

        if(MyData.PlayerUID==_UID)
        {
            //you won
            statusText = "Congrats! you have won the game."; 
            infoText =
                    "Current Cash : $" + MyData.Cash + "\n" +
                    "Home Based Businesses Value : $" + MyData.TotalHBCash + "\n" +
                    "Brick And Mortar Businesses Value : $" + MyData.TotalBMCash + "\n" +
                    "Gold Value : $" + MyData.TotalGoldCash + "\n" +
                    "Stocks Value : $" + MyData.TotalStocksCash + "\n" +
                    "Loan Balance : $" + MyData.TotalLoanBalance + "\n" +
                    "Total Cash Earned : $" + MyData.TotalScore + "\n" +
                    "Other Player Earned Cash : $" + this.PlayerGameInfo[1].TotalScore + "\n";
                
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);

       
            // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            //     "Total Cash: "+MyData.TotalScore+"\n"+'\n'+
            //     "Congrats! your cash is highest, you have won the game."+"\n"+'\n'+"\n"+
            //     "Game will be restarted automatcally after 15 seconds",
            //     15000,false
            // );
        }
        else
        {
            //you lose

            statusText = "Unfortunately! you have lost the game."; 
            infoText =
                    "Current Cash : $" + MyData.Cash + "\n" +
                    "Home Based Businesses Value : $" + MyData.TotalHBCash + "\n" +
                    "Brick And Mortar Businesses Value : $" + MyData.TotalBMCash + "\n" +
                    "Gold Value : $" + MyData.TotalGoldCash + "\n" +
                    "Stocks Value : $" + MyData.TotalStocksCash + "\n" +
                    "Loan Balance : $" + MyData.TotalLoanBalance + "\n" +
                    "Total Cash Earned : $" + MyData.TotalScore + "\n" +
                    "Other Player Earned Cash : $" + this.PlayerGameInfo[1].TotalScore + "\n";
                
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);


            // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            //     "Total Cash: "+MyData.TotalScore+"\n"+'\n'+
            //     "unfortunately you have lost the game."+"\n"+'\n'+"\n"+
            //     "Game will be restarted automatcally after 15 seconds",
            //     15000,false
            // );
        }

        // setTimeout(() => {
        //     GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
        // }, 15060);

    }

   },

    AllPlayersGameCompleted()
    {
            var max = 0;
            var SelectedInd = 0;
            var SessionData = this.PlayerGameInfo;
            for (let index = 0; index < SessionData.length; index++) {
                var _value = SessionData[index].TotalScore;

                if (_value > max) {
                    SelectedInd = index;
                    max = _value;
                }
            }

            for (let index = 0; index < SessionData.length; index++) {
                var _value = SessionData[index].TotalScore;
                console.log(_value);
        }
        
            console.log("game won by player id: " + SessionData[SelectedInd].PlayerUID);
            this.RaiseEventForGameComplete(SessionData[SelectedInd].PlayerUID);
    },
    StartDiceRoll:function()
    {
        if(RollCounter>=GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length)
        {
            console.log("Gameover"); 
            this.ZoomCameraOut();

            setTimeout(() => {
                if(this.SelectedMode==2)//for real players
                {
                    if(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate==false)
                    {
                        this.CallGameComplete();
                        var playercompleted=0;
    
                        var MainSessionData=GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
                        for (let index = 0; index < MainSessionData.length; index++) {
                            if(MainSessionData[index].customProperties.PlayerSessionData.isGameFinished)
                            {
                                playercompleted++;
                            }
                        }
                
                        if(playercompleted==this.PlayerGameInfo.length) //game completed on all system
                        {
                            isGameOver=true;
                            if (!PassedPayDay && !DoublePayDay) {
                                this.AllPlayersGameCompleted();
                            }

                        }else
                        {
                            if (!isGameOver) {
                                if (!PassedPayDay && !DoublePayDay) {
                                    IsTweening = false;
                                    this.completeCardTurn();
                                }
                            }
                        }
                    }
                }
                else if(this.SelectedMode==1)//for bot
                {
                    if (this.PlayerGameInfo[this.TurnNumber].IsBot) 
                        BotGameOver = true;
                    else
                        userGameOver = true;
                    
                    console.log("usergameover: " + userGameOver);
                    console.log("botgameover: " + BotGameOver);
                    this.CallGameComplete(true);
                    var playercompleted=0;
    
                    var MainSessionData=this.PlayerGameInfo;
                    for (let index = 0; index < MainSessionData.length; index++) {
                        if(MainSessionData[index].isGameFinished)
                            playercompleted++;
                    }
                
                    if(playercompleted==this.PlayerGameInfo.length) //gamecompleted on all systems
                    {
                            BotGameOver = true;
                            userGameOver = true;
                            isGameOver = true;
                        
                        if (!PassedPayDay && !DoublePayDay) {
                            this.AllPlayersGameCompleted();
                        }
                    }else
                    {
                        if (!isGameOver) {
                            if (!PassedPayDay && !DoublePayDay) {
                                IsTweening = false;
                                this.completeCardTurn();
                            }
                        }
                    }
                } 
            }, 1500);
        }
        else
        {
            if (!isGameOver) {
                DiceTemp = DiceTemp + 1;
                var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);
                this.TweenPlayer(this.AllPlayerNodes[this.TurnNumber], _toPos);
            }
        }
    },

    getRandom:function(min,max)
    {
        return Math.floor(Math.random() * (max - min) ) + min; // min included and max excluded
    },

    TweenCamera: function (_pos, isZoom,time) {   
        cc.tween(this.CameraNode)
        .to(time, { position: cc.v2(_pos.x, _pos.y)},{easing:"quadInOut"})
        .call(() => {
        if(isZoom)
            this.ZoomCameraIn();
        else
            this.ZoomCameraOut();
        })
        .start();
    },

    ZoomCameraIn () {
        setTimeout(() => {
             if(this.Camera.zoomRatio<2)
             {
                this.Camera.zoomRatio=this.Camera.zoomRatio+0.03;
                this.ZoomCameraIn();
             }
             else
             {
                this.Camera.zoomRatio=2;
                this.isCameraZooming=true;
                this.StartDiceRoll();
             }
          }, 10);
    },

    CheckPayDayConditions(_isBot=false)
    {
        if (RollCounter < GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
            if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6)
                PassedPayDay = true;
                    
            if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7)
                DoublePayDay = true;
        }

        _nextTurnDoublePay=this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnDoublePay;
        if(PassedPayDay && !DoublePayDay && !_nextTurnDoublePay)
        {
            //this.ToggleDoublePayNextTurn(false);
            //this.TogglePayDay(false,false);
            this.ProcessPayDay_TurnDecision(false,_isBot);
        }
        else if((DoublePayDay) || (PassedPayDay && _nextTurnDoublePay))
        {
            //this.ToggleDoublePayNextTurn(false);
            //this.TogglePayDay(false,false);
            this.ProcessPayDay_TurnDecision(true,_isBot);
        }
        else
        {
            this.callUponCard();
        }
    },

    ZoomCameraOut () {
        setTimeout(() => {
            if(this.Camera.zoomRatio>=1)
            {
               this.isCameraZooming=false;
               this.Camera.zoomRatio=this.Camera.zoomRatio-0.03;
               this.ZoomCameraOut();
            }
            else
            {
                this.CameraNode.position=cc.Vec2(0,0);
                this.Camera.zoomRatio=1;

                GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(0);
                
                if (this.SelectedMode == 1)
                {
                    if (this.PlayerGameInfo[this.TurnNumber].IsBot && !BotGameOver) {
                            this.CheckPayDayConditions(this.PlayerGameInfo[this.TurnNumber].IsBot);
                    } else {
                        if (!this.PlayerGameInfo[this.TurnNumber].IsBot && !userGameOver) {
                                this.CheckPayDayConditions(this.PlayerGameInfo[this.TurnNumber].IsBot);
                        }
                    }  
                }

                if(this.SelectedMode==2) //real player
                {
                    if(this.PlayerGameInfo[this.TurnNumber].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
                        this.CheckPayDayConditions();
                    else
                        this.callUponCard();
                }
                
            }
         }, 10);
         
    },

    TweenPlayer: function (Node,ToPos) {
        cc.tween(Node) //0.4
        .to(0.004, { position: cc.v2(ToPos.x, ToPos.y)},{easing:"quadInOut"})
        .call(() => {
        if(DiceTemp<DiceRoll)
        {
            console.log(DiceTemp + " " + RollCounter);
            
            if (this.SelectedMode == 1) //for bot
            {
                if (this.PlayerGameInfo[this.TurnNumber].IsBot) {
                    
                    if (!BotGameOver) {
                        if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6)
                            PassedPayDay = true;
                    } else
                    {
                        console.log("bot game is over");
                    }
                }
                else
                {
                    if (!userGameOver) {
                        if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6)
                            PassedPayDay = true;
                    } else
                    {
                        console.log("user game is over skipping");
                    }
                }

               // console.log(PassedPayDay);
            }

            if(this.SelectedMode==2)
            {
                if(this.PlayerGameInfo[this.TurnNumber].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
                {
                    if (!this.PlayerGameInfo[this.TurnNumber].isGameFinished) {
                        if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6)
                            PassedPayDay = true;
                    } else
                    {
                        console.log("Game finished for: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
                    }
                }
            }

            if (RollCounter < GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
                if (RollCounter == 12)
                    RollCounter = RollCounter + 21;
                else
                    RollCounter = RollCounter + 1;
            } else {
                    RollCounter = RollCounter + 1;
                    DiceTemp = DiceRoll;
            }

            //DiceTemp=DiceTemp+1; 
            console.log(DiceTemp+" "+RollCounter);
            
            this.StartDiceRoll();
            //this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=RollCounter;
           
        }
        else
        {
            var _newpos=cc.Vec2(0,0);
            this.TweenCamera(_newpos, false, 0.6); //zoomout
        }

        })
        .start();
    },

    //rules implmentation during turn (turn decisions)

    TogglePayDay(_st1,_St2)
    {
        PassedPayDay=_st1;
        DoublePayDay=_St2;
    },

    ExpandBusiness_TurnDecision(amount,_index,_locationName,_isCardFunctionality = false,_GivenCash = 0,_StartAnyBusinessWithoutCash=false)
    {
        if (this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[_index].LocationsName.length < 3) {
            if (!_isCardFunctionality) {
                if (this.PlayerGameInfo[this.TurnNumber].Cash >= amount) {
                    this.PlayerGameInfo[this.TurnNumber].Cash = this.PlayerGameInfo[this.TurnNumber].Cash - amount;
                    this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount = this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount + 1;
                    this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[_index].LocationsName.push(_locationName);
                    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully expanded your business.", 1000);
                    setTimeout(() => {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().OnExpandButtonExitClicked_TurnDecision();
                    }, 1200);
                }
                else {
                    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash to expand this business, cash needed $ " + amount);
                }
            }
            else {
                if (_GivenCash >= amount) {
                    _GivenCash = _GivenCash - amount;
                    this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount = this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount + 1;
                    this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[_index].LocationsName.push(_locationName);
                    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully expanded your business.", 1000);
                    setTimeout(() => {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().OnExpandButtonExitClicked_TurnDecision();
                    }, 1200);
                }
                else {
                    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash to expand this business, cash needed $ " + amount + ", Cash Given $" + _GivenCash);
                }
            }
        } else
        {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You cannot own more than three brick and mortar business locations");
        }

    },

    GenerateExpandBusiness_Prefabs_TurnDecision(_isCardFunctionality = false,_GivenCash = 0,_StartAnyBusinessWithoutCash=false)
    {
        BusinessLocationNodes=[];

        console.log(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness);
        for (let i = 0; i < this.PlayerGameInfo[this.TurnNumber].NoOfBusiness.length; i++) {
            if(parseInt(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessType)==2) //this means there is brick and mortar in list
            {
                var node = cc.instantiate(GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessPrefab);
                node.parent = GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessScrollContent;
                node.getComponent('ExpandBusinessHandler').SetBusinessIndex(i);
                node.getComponent('ExpandBusinessHandler').SetName(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessName);
                node.getComponent('ExpandBusinessHandler').SetCardFunctionality(_isCardFunctionality);
                node.getComponent('ExpandBusinessHandler').SetGivenCash(_GivenCash);
                node.getComponent('ExpandBusinessHandler').SetStartAnyBusinessWithoutCash(_StartAnyBusinessWithoutCash);
                node.getComponent('ExpandBusinessHandler').ResetEditBox();
                BusinessLocationNodes.push(node);
            } 
        }
        console.log(BusinessLocationNodes);
        return BusinessLocationNodes.length;
    },

    DestroyGeneratedNodes()
    {
        for (let index = 0; index < BusinessLocationNodes.length; index++) {
            BusinessLocationNodes[index].destroy();
        }

        BusinessLocationNodes=[];
    },

    UpdateStocks_TurnDecision(_name,_ShareAmount,_isAdding)
    {
        if(_isAdding)
        {
            var _stock=new StockInfo();
            _stock.BusinessName=_name;
            _stock.ShareAmount=_ShareAmount;

            this.PlayerGameInfo[this.TurnNumber].NoOfStocks.push(_stock);
        }
    },

    ProcessPayDay_TurnDecision(_isDoublePayDay=false,_isBot=false,_forSelectedBusiness=false,_SelectedBusinessIndex=0,HBAmount=0,BMAmount=0,BMLocations=0)
    {
        if (_forSelectedBusiness) {
            var _title = "PayDay";
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title,false, false, false, _isBot,_forSelectedBusiness,_SelectedBusinessIndex,HBAmount,BMAmount,BMLocations);
        }
        else {
            _skipNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextPayday;
            _skipHMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipHMNextPayday;
            _skipBMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipBMNextPayday;

            if (_skipNextPayday) //if previously skip payday was stored by any card
            {
                this.ToggleSkipPayDay_Whole(false);

                if (!_isBot) {
                    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping PayDay.", 1600);
                    setTimeout(() => {
                        this.callUponCard();
                    }, 1650);
                } else {
                    console.log("Skipping PayDay.");
                    setTimeout(() => {
                        this.callUponCard();
                    }, 800);
                }
            }
            else {
                var _title = "";

                if (_isDoublePayDay)
                    _title = "DoublePayDay";
                else
                    _title = "PayDay";

                GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, _isDoublePayDay, _skipHMNextPayday, _skipBMNextPayday, _isBot);
            }
        }
    },

    Bankrupt_TurnDecision()
    {
        this.PlayerGameInfo[this.TurnNumber].IsBankrupt=true;
        this.PlayerGameInfo[this.TurnNumber].BankruptAmount+=1;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true,false,this.SelectedMode,this.PlayerGameInfo[this.TurnNumber].IsBankrupt,this.PlayerGameInfo[this.TurnNumber].BankruptAmount);
    },

    SendProfit_Partner_TurnDecision(_amount,_uID)
    {
        var _data = { Data: { Cash: _amount, ID: _uID } };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(13, _data);
    },

    ReceiveProfit_Partner_TurnDecision(_data)
    {
        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false)
        {
            var _amount = _data.Data.Cash;
            var _iD=_data.Data.ID;
           
            var _myIndex = this.GetMyIndex();
            
            if (this.PlayerGameInfo[_myIndex].PlayerUID == _iD) {

                if (this.PlayerGameInfo[_myIndex].isGameFinished == true) { 
                    this.PlayerGameInfo[_myIndex].TotalScore+=_amount;
                }

                this.PlayerGameInfo[_myIndex].Cash += _amount;
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have received profit of $" + _amount + " from your partner.",2800);
                GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_myIndex]);
            }
        }
    },

//#endregion
   
    //#region Cards Rules
    ToggleDoublePayNextTurn(_state)
    {
        _nextTurnDoublePay=_state;
        this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnDoublePay=_nextTurnDoublePay;
    },

    ToggleSkipNextTurn(_state)
    {
        _skipNextTurn=_state;
        this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn=_skipNextTurn;
    },

    ToggleSkipPayDay_Whole(_state)
    {
        _skipNextPayday=_state;
        this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextPayday=_skipNextPayday;
    },

    ToggleSkipPayDay_HomeBased(_state)
    {
        _skipHMNextPayday=_state;
        this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipHMNextPayday=_skipHMNextPayday;
    },

    ToggleSkipPayDay_BrickAndMortar(_state)
    {
        _skipBMNextPayday=_state;
        this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipBMNextPayday=_skipBMNextPayday;
    },

    ToggleTurnProgress(_state)
    {
        TurnInProgress=_state;
    },

    ReturnTurnProgress()
    {
        return TurnInProgress;
    },

    LoseAllMarketingMoney()
    {
        var _loseAmount=-1;
        if(this.PlayerGameInfo[this.TurnNumber].MarketingAmount>0)
        {
            _loseAmount=this.PlayerGameInfo[this.TurnNumber].MarketingAmount;
            this.PlayerGameInfo[this.TurnNumber].MarketingAmount=0;
        }
        else
        {
            _loseAmount=0;
        }

        return _loseAmount
    },

    MultiplyMarketingMoney(_multiplier)
    {
        var _amountIncreased=-1;
        if(this.PlayerGameInfo[this.TurnNumber].MarketingAmount>0)
        {
            _amountIncreased=this.PlayerGameInfo[this.TurnNumber].MarketingAmount*=_multiplier;
        }
        else
        {
            _amountIncreased=0;
        }

        return _amountIncreased
    },

    GetMarketingMoney(_profit)
    {
        var _amount=-1;
        if(this.PlayerGameInfo[this.TurnNumber].MarketingAmount>0)
        {
            _profit=(_profit/100);
            _amount=this.PlayerGameInfo[this.TurnNumber].MarketingAmount*=_profit;
            this.PlayerGameInfo[this.TurnNumber].MarketingAmount=0;
            this.PlayerGameInfo[this.TurnNumber].Cash+=_amount;
        }
        else
        {
            _amount=0;
        }

        return _amount
    },

    QuestionPopUp_OtherUser_OneQuestion(_data)
    {
        var _userID=_data.UserID;
        var _questionIndex=_data.Question;
        var _playerIndex=_data.UserIndex;
        var _gameplayUIManager=GamePlayReferenceManager.Instance.Get_GameplayUIManager();
        
        if(_userID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData.PlayerUID)
        {
            console.log("ID matched");

            _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(true);

            OneQuestionIndex=_questionIndex;
            var _questionAsked=OneQuestions[_questionIndex-1];
            _gameplayUIManager.SetUpDecisionScreen_OneQuestionSetupUI(_questionAsked);
        }
    },

    OneQuestionScreen_Space_OneQuestion(_isTurnOver=false)
    {
        var _gameplayUIManager=GamePlayReferenceManager.Instance.Get_GameplayUIManager();
        var _myData;
        var _roomData;
        if(this.SelectedMode==2) //for real players
        {
            _roomData=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();
            _myData=GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
        }
        else if(this.SelectedMode==1)//for bot
        {
            _myData=this.PlayerGameInfo[0];
            _roomData=this.PlayerGameInfo;
        }
        _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(true);
        _gameplayUIManager.ResetSpaceScreen_OneQuestionSetupUI();
        _gameplayUIManager.SetUpSpaceScreen_OneQuestionSetupUI(_myData,_roomData,_isTurnOver,this.SelectedMode)
    
    },

    OneQuestionDecision_PayAmount_OneQuestion()
    {
        var _myData=GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
        var _gameplayUIManager=GamePlayReferenceManager.Instance.Get_GameplayUIManager();

        if(_myData.Cash>=5000)
        {
            for (let index = 0; index < this.PlayerGameInfo.length; index++) {
                if(_myData.PlayerUID==this.PlayerGameInfo[index].PlayerUID)
                {
                    this.PlayerGameInfo[index].Cash-=5000;
                    GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[index]);                
                    break;
                }
            }

            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully paid cash amount to player.",1200);
            _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);
            this.RaiseEventDecision_OneQuestion(true,false,-1,_myData.PlayerUID);
        }
        else
        {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash.");
        }
    },

    OneQuestionDecision_AnswerQuestion_OneQuestion()
    {
        var _gameplayUIManager=GamePlayReferenceManager.Instance.Get_GameplayUIManager();
        var _myData=GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully answered the question.",1200);
        _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);
        this.RaiseEventDecision_OneQuestion(false,true,OneQuestionIndex,_myData.PlayerUID);
    },

    RaiseEventDecision_OneQuestion(_hasDonePayment,_hasAnsweredQuestion,_questionIndex,_UserID)
    {
        var _data={PaymentDone:_hasDonePayment,QuestionAnswered:_hasAnsweredQuestion,QuestionIndex:_questionIndex,ID:_UserID};
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(8,_data);
    },

    ReceiveEventDecision_OneQuestion(_data)
    {
        var _gameplayUIManager=GamePlayReferenceManager.Instance.Get_GameplayUIManager();
        if(this.PlayerGameInfo[this.TurnNumber].PlayerUID==GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID)
        {
            var _hasDonePayment=_data.PaymentDone;
            var _hasAnsweredQuestion=_data.QuestionAnswered;
            var _questionIndex=_data.QuestionIndex;
            var _uID=_data.ID;
            
            if(_hasDonePayment)
            {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(false);
                this.PlayerGameInfo[this.TurnNumber].Cash+=5000;
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has refused to answer the question instead payed the cash amount, $5000 added to your cash amount",2100);
                _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(false);
                this.completeCardTurn();

            }else if(_hasAnsweredQuestion)
            {
                var _selectedPlayerIndex=0;
                var _actorsData=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

                for (let index = 0; index < _actorsData.length; index++) {
                    if(_uID==_actorsData[index].customProperties.PlayerSessionData.PlayerUID)
                    {
                        _selectedPlayerIndex=index;
                        break;
                    }
                }

                if(_questionIndex==1)//have you skipped loan previous payday?
                {
                    if(_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.SkippedLoanPayment)
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered to have skipped loan payement in previous payday",2100);
                    }else
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered not to have skipped loan payement in previous payday",2100);
                    }
                }else if(_questionIndex==2)//Have you taken any loan?
                {
                    var _loanTaken=false;
                    for (let index = 0; index < _actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness.length; index++) {
                        if(_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness[index].LoanTaken)
                        {
                            _loanTaken=true;
                            break;
                        } 
                    }

                    if(_loanTaken)
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered to have taken some loan",2100);
                    }else
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered not to have taken any loan",2100);
                    }
                }else if(_questionIndex==3)//Are you bankrupted? if more than once, tell me the amount?
                {
                    if(_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.IsBankrupt)
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered to have been bankrupted "+_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.BankruptAmount+" time/es.",2100);
                    }else
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered not to have been bankrupted",2100);
                    }
                }else if(_questionIndex==4)//Is your turn going to be skipped next time?
                {
                    if(_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.CardFunctionality.SkipNextTurn)
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered, next turn will be skipped.",2100);
                    }else
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered, next turn will not be skipped.",2100);
                    }
                }
                else if(_questionIndex==5)//Is it going to be double pay day your next payday?
                {
                    if(_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.CardFunctionality.NextTurnDoublePay)
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered, next payday will be double payday",2100);
                    }else
                    {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast
                        ("Player has answered, next payday will not be double payday",2100);
                    }
                }

                setTimeout(() => {
                    _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(false);
                    this.completeCardTurn();
                }, 2150);
            }
        }
    },

    ReceiveGoBackSpacesData_spaceFunctionality(_data)
    {
        if(IsTweening==true)
        {
            setTimeout(() => {
                this.ReceiveGoBackSpacesData_spaceFunctionality(_data);
            }, 800);
        }
        else
        {
            var _spaces=_data.Data.backspaces;
            var _counter=_data.Data.Counter;

            var _toPos=cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[_counter+Backspaces].ReferenceLocation.position.x,GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);
            this.TweenPlayer_GoBackSpaces(this.AllPlayerNodes[this.TurnNumber],_toPos,0.1);

            RollCounter=_counter;
            var _toPos=cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.x,GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);
            this.TweenPlayer_GoBackSpaces(this.AllPlayerNodes[this.TurnNumber],_toPos);
        }
    },

    TweenPlayer_GoBackSpaces: function (Node,ToPos,speed=0.6) {
        cc.tween(Node)
        .to(speed, { position: cc.v2(ToPos.x, ToPos.y)},{easing:"quadInOut"})
        .call(() => {
        })
        .start();
    },

    GoBackSpaces_spaceFunctionality()
    {
        RollCounter-=Backspaces;
        
        if(this.SelectedMode==2)
        {
            var _data={Data:{backspaces:Backspaces,Counter:RollCounter}};
            GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(10,_data);
        }
        
        var _toPos=cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.x,GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);
        this.TweenPlayer_GoBackSpaces(this.AllPlayerNodes[this.TurnNumber],_toPos);
        this.completeCardTurn();
    },


    //#endregion
    //#endregion
});
//module.exports  = PlayerData; //when imports in another script only reference of playerdata class would be able to accessed from Gamemanager import
module.exports  = GameManager;
//#endregion