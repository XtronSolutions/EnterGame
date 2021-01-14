var GamePlayReferenceManager=null;
var ExpandBusinessHandler=cc.Class({
    name:"ExpandBusinessHandler",
    extends: cc.Component,

    properties: {
        BusinessIndex: {
            default: -1,
            type: cc.integer, 
            serializable: true,
        },

        NameLabel: {
            default: null,
            type: cc.Label, 
            serializable: true,
        },

        LocationEditBox: {
            default: null,
            type: cc.EditBox, 
            serializable: true,
        },

        IsCardFunctionality: {
            default: false,
            type: cc.Boolean, 
            serializable: true,
        },
        GivenCash: {
            default: 0,
            type: cc.integer, 
            serializable: true,
        },
        StartAnyBusinessWithoutCash: {
            default: false,
            type: cc.Boolean, 
            serializable: true,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    CheckReferences()
     {
        if(!GamePlayReferenceManager || GamePlayReferenceManager==null)
            GamePlayReferenceManager = require('GamePlayReferenceManager');
     },
    onLoad () {
        this.LocationText="";
        this.CheckReferences();
    },

    onLocationTextChanged(txt)
    {
        this.LocationText=txt;
    },

    SetName(name)
    {
        this.NameLabel.string=name;
    },

    SetBusinessIndex(_index)
    {
        this.BusinessIndex=_index;
    },

    SetCardFunctionality(_state)
    {
        this.IsCardFunctionality = _state;
    },

    SetGivenCash(_amount)
    {
        this.GivenCash = _amount;
    },

    SetStartAnyBusinessWithoutCash(_state)
    {
        this.StartAnyBusinessWithoutCash = _state;
    },

    ResetEditBox()
    {
        this.LocationEditBox.string="";
    },

    OnExpandButtonClicked()
    {
        if(!GamePlayReferenceManager || GamePlayReferenceManager==null)
            this.CheckReferences();

        if(this.LocationText=="")
        {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("please enter new location name for this business.",2000);
        }
        else
        {
            if (this.IsCardFunctionality) {
                if (this.StartAnyBusinessWithoutCash)
                {
                    
                }
                else
                {
                    GamePlayReferenceManager.Instance.Get_GameplayUIManager().onLocationNameChanged_ExpandBusiness_TurnDecision(this.LocationText);
                    GamePlayReferenceManager.Instance.Get_GameManager().ExpandBusiness_TurnDecision(25000, this.BusinessIndex, this.LocationText,this.IsCardFunctionality,this.GivenCash,this.StartAnyBusinessWithoutCash); 
                }
            }
            else {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().onLocationNameChanged_ExpandBusiness_TurnDecision(this.LocationText);
                GamePlayReferenceManager.Instance.Get_GameManager().ExpandBusiness_TurnDecision(25000, this.BusinessIndex, this.LocationText);
            }
        }
    },

    // update (dt) {},
});
