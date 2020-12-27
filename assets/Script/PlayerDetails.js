var GamePlayReferenceManager=null;
var PlayerDetails=cc.Class({
    name:"PlayerDetails",
    extends: cc.Component,

    properties: {
        PlayerNameLabel: {
            default: null,
            type: cc.Label,
            serializable: true},
        IsOneQuestion: {
            default: false,
            type: cc.Boolean,
            serializable: true,
            toolTip:"Is current node can be selected as one question functionality"},
        SelectedPlayerIndex: {
            default: 0,
            type: cc.Integer,
            serializable: true},
        SelectedPlayerUserID: {
            default: "",
            type: cc.Text,
            serializable: true},
        QuestionID: {
            default: 0,
            type: cc.Integer,
            serializable: true},
        
    },

    onEnable()
    {
        this.CheckReferences();
    },

    CheckReferences()
     {
        if(!GamePlayReferenceManager || GamePlayReferenceManager==null)
        GamePlayReferenceManager=require('GamePlayReferenceManager');
     },

    //#region One Question space funtionality

    //Question 1: have you skipped loan previous payday?
    //Question 2: Have you taken any loan?
    //Question 3: Are you bankrupted? if more than once, tell me the amount?
    //Question 4: Is your turn going to be skipped next time?
    //Question 5: Is it going to be double pay day your next payday?
    setPlayerIndex(_index)
    {
        this.SelectedPlayerIndex=_index;
    },

    setPlayerName(_name)
    {
        this.PlayerNameLabel.string=_name;
    },

    setPlayerUID(_uID)
    {
        this.SelectedPlayerUserID=_uID;
    },

    RaiseEventOneQuestion()
    {
        var _data={Question:this.QuestionID,UserID:this.SelectedPlayerUserID,UserIndex:this.SelectedPlayerIndex};
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(7,_data);

        //wait for other player
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);
    },

    SkippedLoan()
    {
        if(this.IsOneQuestion)
        {
            this.QuestionID=1;
            this.RaiseEventOneQuestion();
        }
    },

    TakenLoan()
    {
        if(this.IsOneQuestion)
        {
            this.QuestionID=2;
            this.RaiseEventOneQuestion();
        }
    },

    IsBankrupt()
    {
        if(this.IsOneQuestion)
        {
            this.QuestionID=3;
            this.RaiseEventOneQuestion();
        }
    },

    IsTurnSkip()
    {
        if(this.IsOneQuestion)
        {
            this.QuestionID=4;
            this.RaiseEventOneQuestion();
        }
    },

    IsDoublePayDay()
    {
        if(this.IsOneQuestion)
        {
            this.QuestionID=5;
            this.RaiseEventOneQuestion();
        }
    },
    // LIFE-CYCLE CALLBACKS:

 

    // start () {

    // },

    // update (dt) {},
});
