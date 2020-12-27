var GamePlayReferenceManager=null;
var DiceData=cc.Class({
    name:"DiceData",
    properties: {
        BGSprite: {
            default: null,
            type: cc.Sprite,
            serializable: true,
        },
        DiceNodes: {
            default: [],
            type: [cc.Node],
            serializable: true,
        },
    },

    ctor: function () {//constructor//
    },
});
var DiceController=cc.Class({
    name:"DiceController",
    extends: cc.Component,

    properties: {
        HasOneDice: {
            default: false,
            type: cc.Boolean,
            serializable: true,
        },
        HasTwoDices: {
            default: false,
            type: cc.Boolean,
            serializable: true,
        },
        DiceOneData: {
            default: {},
            type: DiceData,
            serializable: true,
        },
        DiceTwoData: {
            default: {},
            type: DiceData,
            serializable: true,
        },
    },

    CheckReferences()
    {
        if(!GamePlayReferenceManager || GamePlayReferenceManager==null)
        GamePlayReferenceManager=require('GamePlayReferenceManager');
    },

    onEnable()
    {
        this.CheckReferences();
        this.ResetDice();
        this.DiceCounter=0;
        this.MaxCounter=this.getRandom(12,21);
        this.DiceSpeed=150;
        //this.AnimateDice(4,5);
    },

    start () {

    },

    IterateDice(_dice,_index)
    {
        for (let index = 0; index < _dice.length; index++) {
            if(_index==index)
                _dice[index].active=true;
            else
                _dice[index].active=false;
        }
    },

    AnimateDice(_dice1Value=0,_dice2Value=0)
    {
        if(this.DiceCounter<this.MaxCounter)
        {
            if(this.HasOneDice)
            {
                var _displayIndex=this.getRandom(0,6)
                this.IterateDice(this.DiceOneData.DiceNodes,_displayIndex);
            }

            if(this.HasTwoDices)
            {
                var _displayIndex2=this.getRandom(0,6)
                this.IterateDice(this.DiceTwoData.DiceNodes,_displayIndex2);
            }

            setTimeout(() => {
                this.DiceCounter++;
                this.AnimateDice(_dice1Value,_dice2Value);
             },this.DiceSpeed);
        }
        else
        {
            this.DiceCounter=0;
            
            if(this.HasOneDice)
                this.IterateDice(this.DiceOneData.DiceNodes,(_dice1Value-1));

            if(this.HasTwoDices)
                this.IterateDice(this.DiceTwoData.DiceNodes,(_dice2Value-1));
             
           setTimeout(() => {
                GamePlayReferenceManager.Instance.Get_GameManager().DiceFuntionality();
           }, 1000); 
        }
    },

    getRandom:function(min,max)
    {
        return Math.floor(Math.random() * (max - min) ) + min; // min included and max excluded
    },

    ResetDice()
    {
        this.IterateDice(this.DiceOneData.DiceNodes,0);
        this.IterateDice(this.DiceTwoData.DiceNodes,0);
    },
});
